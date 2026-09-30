```js
// ═══════════════════════════════════════════
// Synchroniseert de thuiswedstrijden van MHV vanuit de openbare LISA-feed
// naar de Firestore-collectie 'matches' van MHVwork.
//
// Draait via GitHub Actions, niet vanuit de browser.
// ═══════════════════════════════════════════

import admin from 'firebase-admin';

const LISA_BASE =
  'https://www.meppelerhv.nl/rts/collections/public/32c872e6/runtime/collection';

const PAGE_SIZE = 100;
const MAX_PAGES = 30;

const MHV_CLUB_NAMES = new Set([
  'Meppeler H.V.',
  'Meppeler HV',
  'Meppeler Hockey Vereniging',
  'M.H.V.',
]);

function log(...args) {
  console.log(new Date().toISOString(), ...args);
}

async function lisaGet(collectionName, pageNumber) {
  const url =
    `${LISA_BASE}/${encodeURIComponent(collectionName)}/query-data` +
    `?pageSize=${PAGE_SIZE}&pageNumber=${pageNumber}&query=()&language=ENGLISH`;

  const res = await fetch(url, {
    headers: {
      Accept: 'application/json, text/plain, */*',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36',
      Referer: 'https://www.meppelerhv.nl/',
      Origin: 'https://www.meppelerhv.nl',
    },
  });

  if (!res.ok) {
    let responseText = '';

    try {
      responseText = await res.text();
    } catch {
      // Geen response-body beschikbaar.
    }

    const details = responseText
      ? ` — ${responseText.slice(0, 500).replace(/\s+/g, ' ')}`
      : '';

    throw new Error(
      `LISA HTTP ${res.status} voor ${collectionName} (pagina ${pageNumber})${details}`
    );
  }

  return res.json();
}

async function lisaGetAllPages(collectionName) {
  const values = [];
  const seenIds = new Set();

  for (let page = 0; page < MAX_PAGES; page++) {
    const result = await lisaGet(collectionName, page);
    const batch = result.values || [];

    let newCount = 0;

    for (const item of batch) {
      const id = item?.data?.id;

      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        values.push(item);
        newCount++;
      }
    }

    if (batch.length < PAGE_SIZE) {
      break;
    }

    if (newCount === 0) {
      break;
    }
  }

  return values;
}

async function discoverMatchCollections() {
  const items = await lisaGetAllPages('Toekomstige_wedstrijden');
  const names = new Set();

  for (const item of items) {
    const name = item?.data?.collectionname;

    if (
      typeof name === 'string' &&
      name.startsWith('matches_')
    ) {
      names.add(name);
    }
  }

  return [...names];
}

function normalizeDate(ddmmyyyy) {
  if (!ddmmyyyy) return null;

  const [d, m, y] = String(ddmmyyyy).split('-');

  if (!d || !m || !y) return null;

  return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`;
}

function normalizeTime(raw) {
  if (!raw) return null;

  const match = String(raw).match(/^(\d{1,2}):(\d{2})/);

  if (!match) return null;

  return `${match[1].padStart(2, '0')}:${match[2]}`;
}

function buildStartMs(date, time) {
  if (!date) return null;

  const [y, m, d] = date.split('-').map(Number);

  if (time) {
    const [h, mi] = time.split(':').map(Number);

    return new Date(y, m - 1, d, h, mi).getTime();
  }

  return new Date(y, m - 1, d, 0, 0).getTime();
}

function formatAddress(addr) {
  if (!addr) return null;

  const parts = [
    [addr.street, addr.house_number]
      .filter(Boolean)
      .join(' '),

    [addr.zip_code, addr.city]
      .filter(Boolean)
      .join(' '),
  ].filter(Boolean);

  return parts.length ? parts.join(', ') : null;
}

function isMhvHomeMatch(raw) {
  return (
    raw?.is_home_match === true &&
    MHV_CLUB_NAMES.has(
      String(raw?.home_team_club_name || '').trim()
    )
  );
}

function normalizeMatch(raw, collectionName) {
  const date = normalizeDate(raw.date);
  const startTime = normalizeTime(raw.time);

  const payload = {
    source: 'lisa',
    lisaId: raw.id,
    lisaCollection: collectionName,

    date,
    startTime,
    startMs: buildStartMs(date, startTime),

    homeTeam: raw.home_team_name || null,
    awayTeam: raw.away_team_name || null,

    field:
      raw.field ||
      raw.location?.name ||
      null,

    locationName:
      raw.location?.name ||
      null,

    address:
      formatAddress(raw.location?.address),

    category:
      raw.sub_category ||
      raw.category ||
      null,

    homeLogo:
      raw.home_team_club_logo_url ||
      null,

    awayLogo:
      raw.away_team_club_logo_url ||
      null,

    updatedAt: Date.now(),
    updatedBy: 'lisa-sync',
  };

  if (raw.is_cancelled === true) {
    payload.status = 'canceled';
  }

  return payload;
}

async function main() {
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT;

  if (!svcJson) {
    throw new Error(
      'FIREBASE_SERVICE_ACCOUNT secret ontbreekt'
    );
  }

  const serviceAccount = JSON.parse(svcJson);

  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });

  const db = admin.firestore();

  log('LISA synchronisatie gestart');

  let collections;

  try {
    collections = await discoverMatchCollections();
  } catch (e) {
    log(
      'KON GEEN COLLECTIES ONTDEKKEN, stoppen:',
      e.message
    );

    process.exitCode = 1;
    return;
  }

  log(
    `${collections.length} maandcollecties gevonden:`,
    collections.join(', ')
  );

  let found = 0;
  let written = 0;
  let skipped = 0;
  let failedCollections = 0;

  for (const collectionName of collections) {
    try {
      const records =
        await lisaGetAllPages(collectionName);

      log(
        `LISA collection ${collectionName}: ${records.length} records (alle clubs)`
      );

      let batch = db.batch();
      let batchCount = 0;

      for (const item of records) {
        const raw = item?.data;

        if (!raw || !isMhvHomeMatch(raw)) {
          skipped++;
          continue;
        }

        if (!raw.id) {
          log(
            '  overgeslagen: record zonder id',
            raw.home_team_name,
            raw.away_team_name
          );
          continue;
        }

        found++;

        const normalized =
          normalizeMatch(
            raw,
            collectionName
          );

        log(
          `  MHV thuiswedstrijd: ${normalized.date} ${
            normalized.startTime || '(tijd volgt)'
          } — ${normalized.homeTeam} vs ${normalized.awayTeam}`
        );

        const ref = db
          .collection('matches')
          .doc(raw.id);

        batch.set(
          ref,
          normalized,
          { merge: true }
        );

        batchCount++;
        written++;

        // Veilig onder de Firestore-limiet van 500 writes blijven.
        if (batchCount >= 400) {
          await batch.commit();

          batch = db.batch();
          batchCount = 0;
        }
      }

      if (batchCount > 0) {
        await batch.commit();
      }
    } catch (e) {
      failedCollections++;

      log(
        `FOUT bij collection ${collectionName}, ga door met de rest:`,
        e.message
      );
    }
  }

  log(
    `LISA synchronisatie klaar — ` +
    `${found} MHV-thuiswedstrijden gevonden, ` +
    `${written} weggeschreven, ` +
    `${skipped} niet-MHV/uit overgeslagen, ` +
    `${failedCollections} collecties mislukt`
  );

  if (
    failedCollections > 0 &&
    written === 0
  ) {
    process.exitCode = 1;
  }
}

main().catch((e) => {
  console.error(
    'Onverwachte fout:',
    e
  );

  process.exitCode = 1;
});
```

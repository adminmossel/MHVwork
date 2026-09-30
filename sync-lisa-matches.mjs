// ═══════════════════════════════════════════
// Synchroniseert de thuiswedstrijden van MHV vanuit de openbare LISA-feed van meppelerhv.nl
// naar de Firestore-collectie 'matches' die MHVwork zelf al gebruikt.
//
// Draait via GitHub Actions (zie .github/workflows/sync-matches.yml), NIET vanuit de browser —
// dat voorkomt eventuele CORS-problemen en heeft geen Cloud Functions (Blaze-plan) nodig.
//
// Belangrijk, expres zo gekozen:
// - Dit is geen officieel gedocumenteerde API. Alles staat defensief: ontbrekende velden,
//   onverwachte responses en een falende maandcollectie mogen de rest nooit laten crashen.
// - We slaan bewust NIET de volledige LISA-data op (die sleept een complete standenlijst met
//   logo's per wedstrijd mee) — alleen de velden die de app ook echt gebruikt.
// - We overschrijven nooit een handmatig ingevoerde uitslag/status. Alleen bij een wedstrijd die
//   de bron zelf als afgelast meldt, zetten we status:'canceled'. Voor de rest laten we het
//   status-veld met rust (Firestore's merge:true behoudt dan gewoon wat er al stond).
// ═══════════════════════════════════════════

import admin from 'firebase-admin';

const LISA_BASE = 'https://www.meppelerhv.nl/rts/collections/public/32c872e6/runtime/collection';
const PAGE_SIZE = 100;
const MAX_PAGES = 30; // veiligheidsgrens, voorkomt een oneindige lus bij een onverwachte response

// Kleine variaties op de clubnaam opvangen, voor de zekerheid.
const MHV_CLUB_NAMES = new Set(['Meppeler H.V.', 'Meppeler HV', 'Meppeler Hockey Vereniging', 'M.H.V.']);

function log(...args) { console.log(new Date().toISOString(), ...args); }

async function lisaGet(collectionName, pageNumber) {
  const url = `${LISA_BASE}/${encodeURIComponent(collectionName)}/query-data` +
    `?pageSize=${PAGE_SIZE}&pageNumber=${pageNumber}&query=()&language=ENGLISH`;
  const res = await fetch(url, { headers: { 'Accept': 'application/json' } });
  if (!res.ok) throw new Error(`LISA HTTP ${res.status} voor ${collectionName} (pagina ${pageNumber})`);
  return res.json();
}

async function lisaGetAllPages(collectionName) {
  // Let op: bij handmatig testen leek pageNumber soms genegeerd te worden (twee opeenvolgende
  // pagina's gaven identieke eerste records). Onduidelijk of dat aan de bron ligt of aan
  // caching onderweg. Onschadelijk hier: elke wedstrijd wordt opgeslagen onder zijn eigen LISA-id,
  // dus dubbele/overbodige reads geven nooit dubbele Firestore-documenten — in het ergste geval
  // mist een run wedstrijden voorbij de honderdste. Dat aantal staat gewoon in de log hieronder.
  const values = [];
  const seenIds = new Set();
  for (let page = 0; page < MAX_PAGES; page++) {
    const result = await lisaGet(collectionName, page);
    const batch = result.values || [];
    let newCount = 0;
    for (const item of batch) {
      const id = item?.data?.id;
      if (id && !seenIds.has(id)) { seenIds.add(id); values.push(item); newCount++; }
    }
    if (batch.length < PAGE_SIZE) break; // laatste pagina bereikt
    if (newCount === 0) break; // pagina gaf niets nieuws — voorkomt een oneindige lus bij genegeerde paginering
  }
  return values;
}

async function discoverMatchCollections() {
  const items = await lisaGetAllPages('Toekomstige_wedstrijden');
  const names = new Set();
  for (const item of items) {
    const name = item?.data?.collectionname;
    if (typeof name === 'string' && name.startsWith('matches_')) names.add(name);
  }
  return [...names];
}

function normalizeDate(ddmmyyyy) {
  // LISA levert 'DD-MM-YYYY', MHVwork gebruikt 'YYYY-MM-DD'
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
  // Geen bekende tijd: middernacht als sorteer-/query-anker. De UI toont hierbij expliciet
  // 'tijd volgt' in plaats van dit tijdstip — zie matchPhase()/matchCardHtml() in app.html.
  return new Date(y, m - 1, d, 0, 0).getTime();
}

function formatAddress(addr) {
  if (!addr) return null;
  const parts = [
    [addr.street, addr.house_number].filter(Boolean).join(' '),
    [addr.zip_code, addr.city].filter(Boolean).join(' '),
  ].filter(Boolean);
  return parts.length ? parts.join(', ') : null;
}

function isMhvHomeMatch(raw) {
  return raw?.is_home_match === true && MHV_CLUB_NAMES.has(String(raw?.home_team_club_name || '').trim());
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
    field: raw.field || raw.location?.name || null,
    locationName: raw.location?.name || null,
    address: formatAddress(raw.location?.address),
    category: raw.sub_category || raw.category || null,
    // Alleen de linkjes — het KNHB-beeldarchief (images.knltb.club) serveert de afbeelding zelf,
    // hier wordt niets gedownload of opgeslagen.
    homeLogo: raw.home_team_club_logo_url || null,
    awayLogo: raw.away_team_club_logo_url || null,
    updatedAt: Date.now(),
    updatedBy: 'lisa-sync',
  };
  // Alleen expliciet afgelast overschrijven — een handmatig ingevulde uitslag/status voor een
  // wedstrijd die (nog) niet is afgelast, laten we door merge:true gewoon met rust.
  if (raw.is_cancelled === true) payload.status = 'canceled';
  return payload;
}

async function main() {
  const svcJson = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!svcJson) throw new Error('FIREBASE_SERVICE_ACCOUNT secret ontbreekt');
  const serviceAccount = JSON.parse(svcJson);
  admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
  const db = admin.firestore();

  log('LISA synchronisatie gestart');

  let collections;
  try {
    collections = await discoverMatchCollections();
  } catch (e) {
    log('KON GEEN COLLECTIES ONTDEKKEN, stoppen:', e.message);
    process.exitCode = 1;
    return;
  }
  log(`${collections.length} maandcollecties gevonden:`, collections.join(', '));

  let found = 0, written = 0, skipped = 0, failedCollections = 0;

  for (const collectionName of collections) {
    try {
      const records = await lisaGetAllPages(collectionName);
      log(`LISA collection ${collectionName}: ${records.length} records (alle clubs)`);

      const batch = db.batch();
      let batchCount = 0;

      for (const item of records) {
        const raw = item?.data;
        if (!raw || !isMhvHomeMatch(raw)) { skipped++; continue; }
        if (!raw.id) { log('  overgeslagen: record zonder id', raw.home_team_name, raw.away_team_name); continue; }

        found++;
        const normalized = normalizeMatch(raw, collectionName);
        log(`  MHV thuiswedstrijd: ${normalized.date} ${normalized.startTime || '(tijd volgt)'} — ${normalized.homeTeam} vs ${normalized.awayTeam}`);

        const ref = db.collection('matches').doc(raw.id); // LISA-id als document-id => idempotent
        batch.set(ref, normalized, { merge: true });
        batchCount++;
        written++;

        // Firestore batches zijn gelimiteerd tot 500 writes; hier ruim binnen, maar defensief.
        if (batchCount >= 400) { await batch.commit(); batchCount = 0; }
      }
      if (batchCount > 0) await batch.commit();
    } catch (e) {
      failedCollections++;
      log(`FOUT bij collection ${collectionName}, ga door met de rest:`, e.message);
    }
  }

  log(`LISA synchronisatie klaar — ${found} MHV-thuiswedstrijden gevonden, ${written} weggeschreven, ${skipped} niet-MHV/uit overgeslagen, ${failedCollections} collecties mislukt`);
  if (failedCollections > 0 && written === 0) process.exitCode = 1; // alles mislukt: laat de Action falen
}

main().catch(e => { console.error('Onverwachte fout:', e); process.exitCode = 1; });

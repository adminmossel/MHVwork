// ═══════════════════════════════════════════
// Synchroniseert de thuiswedstrijden van MHV vanuit de openbare LISA-feed van meppelerhv.nl
// naar de Firestore-collectie 'matches' die MHVwork zelf al gebruikt.
//
// BELANGRIJK — waarom dit Playwright gebruikt in plaats van een kale fetch():
// meppelerhv.nl staat achter Cloudflare, en de API-routes staan achter Cloudflare's Turnstile/
// 'Managed Challenge' (de "Just a moment..."-pagina, te zien aan challenges.cloudflare.com in de
// Content-Security-Policy van de foutmelding). Dat is geen gewone bot-herkenning op basis van een
// User-Agent-header — het vereist dat er daadwerkelijk JavaScript wordt uitgevoerd zoals een
// echte browser dat doet. Een kale fetch()/curl/axios-aanroep kan dat principieel nooit omzeilen,
// ongeacht welke headers je meestuurt (dat is al geprobeerd en faalde voorspelbaar). Playwright
// start daarom een echte (headless) Chromium. De hoofdpagina zelf bleek niet beschermd, maar het
// API-pad onder /rts/collections/ wél — dus elke aanroep daarheen gebeurt via een echte
// paginanavigatie (page.goto), niet via een los verzoek dat alleen cookies leent van de
// browsersessie (context.request). Dat laatste leek logisch maar gaf zelf ook een 403: Cloudflare
// controleert hier kennelijk mee of het verzoek ook echt via de render-/netwerkmotor van de
// browser loopt, niet alleen of het de juiste cookie heeft.
//
// Draait via GitHub Actions, NIET vanuit de browser van de gebruiker — dat voorkomt CORS-
// problemen en heeft geen Cloud Functions (Blaze-plan) nodig.
//
// Geen garantie: dit is geen officieel gedocumenteerde API, en Cloudflare kan de beveiliging op
// elk moment aanscherpen tot een niveau waar zelfs een echte headless browser niet meer
// doorheen komt. Als dat gebeurt, faalt dit script met een duidelijke logregel in de Actions-tab
// — de rest van de app blijft gewoon werken, en de handmatige invoer bij Beheer → Instellingen
// blijft als terugvaloptie altijd beschikbaar.
// ═══════════════════════════════════════════

import admin from 'firebase-admin';
import { chromium } from 'playwright';

const SITE_ORIGIN = 'https://www.meppelerhv.nl';
const LISA_BASE = `${SITE_ORIGIN}/rts/collections/public/32c872e6/runtime/collection`;
const PAGE_SIZE = 100;
const MAX_PAGES = 30; // veiligheidsgrens, voorkomt een oneindige lus bij een onverwachte response

const MHV_CLUB_NAMES = new Set(['Meppeler H.V.', 'Meppeler HV', 'Meppeler Hockey Vereniging', 'M.H.V.']);

function log(...args) { console.log(new Date().toISOString(), ...args); }

let browser, context;

async function openBrowserSession() {
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36',
    viewport: { width: 1280, height: 800 },
    locale: 'nl-NL',
  });
  const page = await context.newPage();
  log('Open de site om een sessie/cookies op te bouwen…');
  await page.goto(SITE_ORIGIN, { waitUntil: 'domcontentloaded', timeout: 45000 });
  await waitOutChallenge(page);
  await page.close();
  log('Hoofdpagina geladen.');
}

async function waitOutChallenge(page) {
  // De 'Just a moment...'-pagina lost zichzelf na een paar seconden op en herlaadt de pagina.
  for (let i = 0; i < 20; i++) {
    const title = await page.title().catch(() => '');
    if (!/just a moment/i.test(title)) return;
    await page.waitForTimeout(1000);
  }
}

function looksLikeChallenge(text) {
  return /just a moment/i.test(text) || /<html/i.test(String(text).slice(0, 200));
}

async function lisaGet(collectionName, pageNumber) {
  const url = `${LISA_BASE}/${encodeURIComponent(collectionName)}/query-data` +
    `?pageSize=${PAGE_SIZE}&pageNumber=${pageNumber}&query=()&language=ENGLISH`;
  // BELANGRIJK: dit gaat via page.goto() (een echte paginanavigatie), niet via context.request —
  // dat laatste gaf zelf nog een 403 (zie commit-geschiedenis). Maar de JSON-tekst lezen we nu
  // rechtstreeks van het netwerkantwoord (response.text()), NIET uit de weergegeven pagina
  // (document.querySelector('pre')): Chrome rendert een JSON-respons als een interactieve,
  // inklapbare boomstructuur met meerdere losse <pre>-elementen — het eerste dat querySelector
  // oppikt is vrijwel leeg, wat parste als geldige maar lege JSON (vandaar '0 collecties
  // gevonden' zonder enige foutmelding). response.text() geeft altijd de exacte ruwe tekst die
  // binnenkwam, ongeacht hoe Chrome die daarna toont.
  const page = await context.newPage();
  try {
    let response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
    let bodyText = response ? await response.text() : '';
    if (looksLikeChallenge(bodyText)) {
      // Cloudflare's 'Just a moment'-pagina lost zichzelf intern op en herlaadt — ons eerder
      // vastgelegde 'response' is dan nog de uitdagingspagina zelf. Wachten en opnieuw navigeren
      // om de respons ná de controle te pakken.
      await waitOutChallenge(page);
      await page.waitForTimeout(1500);
      response = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      bodyText = response ? await response.text() : '';
    }
    const status = response ? response.status() : 0;
    if (status >= 400 || looksLikeChallenge(bodyText)) {
      throw new Error(`LISA HTTP ${status} voor ${collectionName} (pagina ${pageNumber}) - ${bodyText.slice(0, 300).replace(/\s+/g, ' ')}`);
    }
    try {
      return JSON.parse(bodyText);
    } catch (e) {
      throw new Error(`Kon de respons niet als JSON lezen voor ${collectionName} (pagina ${pageNumber}), lengte ${bodyText.length}: ${bodyText.slice(0, 200).replace(/\s+/g, ' ')}`);
    }
  } finally {
    await page.close();
  }
}

async function lisaGetAllPages(collectionName) {
  // Bij eerder handmatig testen leek pageNumber soms genegeerd te worden. Onschadelijk hier —
  // elke wedstrijd wordt opgeslagen onder zijn eigen LISA-id, dus dubbele/overbodige reads geven
  // nooit dubbele documenten.
  const values = [];
  const seenIds = new Set();
  for (let page = 0; page < MAX_PAGES; page++) {
    const result = await lisaGet(collectionName, page);
    const batch = Array.isArray(result.values) ? result.values : [];
    let newCount = 0;
    for (const item of batch) {
      const id = item?.data?.id;
      if (id && !seenIds.has(id)) { seenIds.add(id); values.push(item); newCount++; }
    }
    if (batch.length < PAGE_SIZE) break;
    if (newCount === 0) break;
  }
  return values;
}

async function discoverMatchCollections() {
  const items = await lisaGetAllPages('Toekomstige_wedstrijden');
  log(`Toekomstige_wedstrijden: ${items.length} ruwe items ontvangen`);
  const names = new Set();
  for (const item of items) {
    const name = item?.data?.collectionname;
    if (typeof name === 'string' && name.startsWith('matches_')) names.add(name);
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
    homeLogo: raw.home_team_club_logo_url || null,
    awayLogo: raw.away_team_club_logo_url || null,
    updatedAt: Date.now(),
    updatedBy: 'lisa-sync',
  };
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
  await openBrowserSession();

  let collections;
  try {
    collections = await discoverMatchCollections();
  } catch (e) {
    log('KON GEEN COLLECTIES ONTDEKKEN, stoppen:', e.message);
    process.exitCode = 1;
    await browser?.close();
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

        const ref = db.collection('matches').doc(raw.id);
        batch.set(ref, normalized, { merge: true });
        batchCount++;
        written++;

        if (batchCount >= 400) { await batch.commit(); batchCount = 0; }
      }
      if (batchCount > 0) await batch.commit();
    } catch (e) {
      failedCollections++;
      log(`FOUT bij collection ${collectionName}, ga door met de rest:`, e.message);
    }
  }

  log(`LISA synchronisatie klaar — ${found} MHV-thuiswedstrijden gevonden, ${written} weggeschreven, ${skipped} niet-MHV/uit overgeslagen, ${failedCollections} collecties mislukt`);
  await browser?.close();
  if (failedCollections > 0 && written === 0) process.exitCode = 1;
}

main().catch(async (e) => {
  console.error('Onverwachte fout:', e);
  await browser?.close().catch(() => {});
  process.exitCode = 1;
});

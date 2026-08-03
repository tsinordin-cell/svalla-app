/**
 * build-land-mask.mjs — bygger en land-mask som faktiskt innehåller fastlandet
 *
 * BAKGRUND
 * Nuvarande src/lib/data/swedish-coastline.json innehåller 500 polygoner som
 * täcker 1 679 km² — 0,38 % av Sveriges landyta. Det är småöar; fastlandet
 * saknas helt. Följden är att produktionens validatePathLand godkänner en rak
 * linje Stockholm–Göteborg som "vattenväg", eftersom masken inte vet att
 * fastlandet är land.
 *
 * Orsaken är sannolikt att förra generationen bara behöll SLUTNA coastline-
 * ways. En ö är en sluten ring i OSM. Fastlandet är det inte — dess kustlinje
 * är en öppen kedja som löper ut ur vilken bbox man än hämtar. Behåller man
 * bara slutna ringar får man exakt öarna och inget annat.
 *
 * VAD SKRIPTET GÖR
 * 1. Hämtar way["natural"="coastline"] från Overpass för angiven bbox.
 * 2. Kedjar ihop ways ände-mot-ände till längre linjer.
 * 3. Slutna kedjor  -> öar, blir polygoner direkt.
 * 4. Öppna kedjor   -> fastland/utanför-bbox. Stängs längs bbox-kanten åt det
 *    håll som gör att LAND hamnar innanför. OSM:s konvention är att kustlinjen
 *    är riktad med land till VÄNSTER om färdriktningen — det är den regeln vi
 *    använder för att välja håll.
 * 5. Sanity-test mot kända land- och vattenpunkter. SKRIVER INTE FILEN om
 *    testet fallerar — det var precis så här den nuvarande masken kunde
 *    hamna i produktion utan att någon märkte något.
 *
 * KÖR
 *   node scripts/build-land-mask.mjs                 # Stockholms skärgård
 *   node scripts/build-land-mask.mjs --bbox=sweden   # hela Sverige (stor, långsam)
 *   node scripts/build-land-mask.mjs --out=src/lib/data/land-mask.json
 *
 * Overpass har rate limits. Vid 429/504: vänta någon minut och kör om.
 */

import { writeFileSync, mkdirSync, readFileSync } from 'node:fs'
import { dirname } from 'node:path'

// ── Bboxar ────────────────────────────────────────────────────────────────
// [syd, väst, nord, öst] — Overpass ordning.
const BBOXES = {
  // Stockholms skärgård + Mälaren + en bit kust norr och söder.
  stockholm: [58.70, 17.20, 60.10, 19.40],
  // Hela svenska kusten inkl. Vänern/Vättern-regionen. Tung: räkna med
  // flera hundra MB rå-JSON och lång körtid.
  sweden: [55.00, 10.50, 66.00, 24.50],
  // Liten ruta för snabb rökttest av pipelinen.
  test: [59.28, 18.00, 59.40, 18.30],
}

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)
const bboxName = typeof args.bbox === 'string' ? args.bbox : 'stockholm'
const BBOX = BBOXES[bboxName]
if (!BBOX) {
  console.error(`Okänd bbox "${bboxName}". Välj: ${Object.keys(BBOXES).join(', ')}`)
  process.exit(1)
}
const OUT = typeof args.out === 'string' ? args.out : 'src/lib/data/land-mask.json'

// ── 1. Hämta coastline från Overpass ──────────────────────────────────────
//
// Overpass svarar 406 på anrop utan identifierande User-Agent — deras policy
// kräver att man säger vem man är. Node skickar ingen UA av sig själv, vilket
// är varför första försöket misslyckades. 429 betyder att spegeln rate-limitar;
// den vill ha en paus, inte ett nytt anrop direkt.
const ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
  'https://overpass.osm.jp/api/interpreter',
  'https://overpass.private.coffee/api/interpreter',
]

const UA = 'Svalla-LandMask/1.0 (+https://svalla.se; info@svalla.se)'

const sleep = ms => new Promise(r => setTimeout(r, ms))

function buildQuery([s, w, n, e]) {
  return `[out:json][timeout:600];way["natural"="coastline"](${s},${w},${n},${e});out geom;`
}

async function tryEndpoint(url, query) {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'user-agent': UA,
      accept: 'application/json',
    },
    body: 'data=' + encodeURIComponent(query),
  })
  if (res.status === 429 || res.status === 504) {
    const retryAfter = Number(res.headers.get('retry-after')) || null
    const err = new Error(`HTTP ${res.status} (upptagen)`)
    err.retryable = true
    err.retryAfter = retryAfter
    throw err
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}`)
  const json = await res.json()
  const ways = (json.elements || []).filter(el => el.type === 'way' && el.geometry)
  if (!ways.length) throw new Error('inga coastline-ways i svaret')
  return ways
}

async function fetchCoastline(bbox) {
  const query = buildQuery(bbox)
  const ROUNDS = 3
  let lastErr

  for (let round = 1; round <= ROUNDS; round++) {
    for (const url of ENDPOINTS) {
      const host = new URL(url).host
      try {
        process.stdout.write(`Hämtar från ${host} (försök ${round}/${ROUNDS}) … `)
        const ways = await tryEndpoint(url, query)
        console.log(`✓ ${ways.length} ways`)
        return ways
      } catch (err) {
        console.log(`✗ ${err.message}`)
        lastErr = err
        if (err.retryable) {
          const wait = err.retryAfter ?? Math.min(30, 5 * round)
          console.log(`  väntar ${wait}s innan nästa försök …`)
          await sleep(wait * 1000)
        }
      }
    }
  }

  // Alla speglar sa nej. Ge en väg framåt i stället för att bara dö —
  // webbläsaren har en riktig User-Agent och brukar släppas igenom.
  const manuellUrl =
    'https://overpass-api.de/api/interpreter?data=' + encodeURIComponent(query)
  console.error('\nAlla Overpass-speglar nekade. Det är nästan alltid tillfälligt.')
  console.error('\nTvå vägar framåt:')
  console.error('  1) Vänta 5–10 minuter och kör om — rate limits nollställs.')
  console.error('  2) Hämta manuellt via webbläsaren och kör skriptet mot filen:')
  console.error('\n     Öppna denna URL, spara svaret som coastline.json:')
  console.error('     ' + manuellUrl)
  console.error('\n     Kör sedan:')
  console.error('     node scripts/build-land-mask.mjs --from-file=coastline.json\n')
  throw lastErr ?? new Error('alla Overpass-endpoints misslyckades')
}

/** Läs ett redan nedladdat Overpass-svar från disk. */
function readCoastlineFile(path) {
  console.log(`Läser ${path} …`)
  const json = JSON.parse(readFileSync(path, 'utf8'))
  const ways = (json.elements || []).filter(el => el.type === 'way' && el.geometry)
  if (!ways.length) throw new Error('filen innehåller inga coastline-ways')
  console.log(`  ✓ ${ways.length} ways`)
  return ways
}

// ── 2. Kedja ihop ways ────────────────────────────────────────────────────
// OSM delar upp kustlinjen i många ways. Vi limmar ihop dem där en ways slut
// är nästa ways början. Riktningen bevaras — den behövs i steg 4.
const key = p => `${p.lat.toFixed(7)},${p.lon.toFixed(7)}`

function chainWays(ways) {
  const startIndex = new Map()
  for (const w of ways) {
    const k = key(w.geometry[0])
    if (!startIndex.has(k)) startIndex.set(k, [])
    startIndex.get(k).push(w)
  }

  const used = new Set()
  const chains = []

  for (const w of ways) {
    if (used.has(w.id)) continue
    used.add(w.id)
    const pts = [...w.geometry]

    // Följ kedjan framåt så långt det går
    for (;;) {
      const tail = key(pts[pts.length - 1])
      const cands = (startIndex.get(tail) || []).filter(c => !used.has(c.id))
      if (!cands.length) break
      const next = cands[0]
      used.add(next.id)
      pts.push(...next.geometry.slice(1))
      if (key(pts[0]) === key(pts[pts.length - 1])) break // slöt sig
    }
    chains.push(pts)
  }
  return chains
}

// ── 3/4. Segment i stället för polygoner ──────────────────────────────────
//
// FÖRSTA FÖRSÖKET byggde polygoner. Det kraschade mot verkligheten: Overpass
// returnerar hela ways, inte klippta mot bboxen, så fastlandskedjornas
// ändpunkter ligger långt utanför rutan. De gick inte att stänga mot
// bbox-kanten och kastades — 23 942 öar, 0 fastland, 8 kasserade. De åtta
// kasserade var fastlandet.
//
// Att laga polygonstängningen går, men den har flera sätt att bli subtilt fel
// på: man måste avgöra vilken sida av den stängda ringen som är land, och en
// ring som råkar omsluta havet i stället ser lika korrekt ut i data.
//
// I stället utnyttjar vi att vi bara behöver svara på EN fråga: ligger den här
// punkten på land? Skjut en stråle rakt österut från punkten och räkna hur
// många kustlinjesegment den korsar. Långt österut ligger öppen Östersjö =
// vatten. Varje korsning växlar mellan vatten och land. Udda antal = land.
//
// Det kräver ingen sluten geometri alls — bara att kustlinjen är komplett
// längs strålens väg. Därav BEGRÄNSNINGEN: bboxen måste sträcka sig österut
// till öppet hav. Det gäller Stockholms skärgård och hela ostkusten. För
// västkusten måste strålen gå åt andra hållet.
const isClosed = pts => key(pts[0]) === key(pts[pts.length - 1])

/** Plocka ut alla kustlinjesegment som [lng1, lat1, lng2, lat2]. */
function extractSegments(chains) {
  const segs = []
  for (const pts of chains) {
    for (let i = 0; i < pts.length - 1; i++) {
      segs.push([pts[i].lon, pts[i].lat, pts[i + 1].lon, pts[i + 1].lat])
    }
  }
  return segs
}

/**
 * Even-odd med stråle österut. Segmenten läggs i latitud-hinkar så att bara de
 * som faktiskt kan korsa strålen behöver testas.
 */
function makeOnLandFromSegments(segs) {
  const BUCKET = 0.01 // grader latitud
  const buckets = new Map()
  let minLat = Infinity, maxLat = -Infinity
  for (const s of segs) {
    const lo = Math.min(s[1], s[3]), hi = Math.max(s[1], s[3])
    if (lo < minLat) minLat = lo
    if (hi > maxLat) maxLat = hi
    for (let b = Math.floor(lo / BUCKET); b <= Math.floor(hi / BUCKET); b++) {
      if (!buckets.has(b)) buckets.set(b, [])
      buckets.get(b).push(s)
    }
  }
  return (lat, lng) => {
    // Utanför datans latitudspann kan vi inte uttala oss — anta vatten hellre
    // än att gissa land, och låt sanity-testet fånga om spannet är fel.
    if (lat < minLat || lat > maxLat) return false
    const cand = buckets.get(Math.floor(lat / BUCKET))
    if (!cand) return false
    let crossings = 0
    for (const [x1, y1, x2, y2] of cand) {
      if ((y1 > lat) !== (y2 > lat)) {
        const xInt = x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1)
        if (xInt > lng) crossings++
      }
    }
    return crossings % 2 === 1
  }
}

// ── 5. Sanity-test ────────────────────────────────────────────────────────
// Utan det här steget kan en trasig mask gå rakt i produktion — vilket är
// precis vad som hände förra gången.
const SANITY = [
  ['Gamla stan, Stockholm',      59.3251, 18.0711, true],
  ['Sergels torg',               59.3326, 18.0649, true],
  ['Södermalm',                  59.3130, 18.0700, true],
  ['Nacka',                      59.3100, 18.1600, true],
  ['Strömmen (vatten)',          59.3238, 18.0776, false],
  ['Trälhavet (vatten)',         59.4200, 18.3500, false],
  ['Kanholmsfjärden (vatten)',   59.3400, 18.6500, false],
  ['Öppet hav ö. Sandhamn',      59.2900, 19.0000, false],
]

// ── Kör ───────────────────────────────────────────────────────────────────
const ways = typeof args['from-file'] === 'string'
  ? readCoastlineFile(args['from-file'])
  : await fetchCoastline(BBOX)
const chains = chainWays(ways)
const slutna = chains.filter(isClosed).length
console.log(`Kedjor: ${chains.length}  (slutna ${slutna}, öppna ${chains.length - slutna})`)

// Alla segment räknas — både öar och fastland. Inget kastas.
const segments = extractSegments(chains)
console.log(`Kustlinjesegment: ${segments.length.toLocaleString('sv-SE')}`)

const onLand = makeOnLandFromSegments(segments)
console.log('\nSanity-test:')
let fel = 0
for (const [namn, lat, lng, vantat] of SANITY) {
  const fick = onLand(lat, lng)
  const ok = fick === vantat
  if (!ok) fel++
  console.log(`  ${ok ? '✓' : '✗'} ${namn.padEnd(26)} förväntat ${vantat ? 'LAND  ' : 'vatten'} fick ${fick ? 'LAND' : 'vatten'}`)
}

if (fel > 0) {
  console.error(`\n${fel} sanity-test misslyckades — filen skrivs INTE.`)
  console.error('En mask som inte klarar de här punkterna är värre än ingen mask alls,')
  console.error('eftersom den ser ut att fungera. Felsök innan du kör om.')
  process.exit(1)
}

// 5 decimaler ≈ 1 m. Mer precision än så är bortkastade bytes i en fil som
// ska skickas till en lambda vid varje kallstart.
const r5 = n => Math.round(n * 1e5) / 1e5
const utdata = {
  format: 'coastline-segments-v1',
  _meta: {
    genererad: new Date().toISOString(),
    bbox: bboxName,
    bboxKoordinater: BBOX,
    kalla: 'OpenStreetMap via Overpass, natural=coastline',
    licens: 'ODbL — OpenStreetMap contributors',
    segment: segments.length,
    metod: 'even-odd, stråle österut. Kräver att bboxen når öppet hav i öster.',
  },
  segments: segments.map(s => [r5(s[0]), r5(s[1]), r5(s[2]), r5(s[3])]),
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify(utdata))
const mb = (Buffer.byteLength(JSON.stringify(utdata)) / 1024 / 1024).toFixed(1)
console.log(`\n✓ Alla sanity-test gick igenom.`)
console.log(`✓ Skrev ${OUT} — ${segments.length.toLocaleString('sv-SE')} segment, ${mb} MB`)
console.log(`\nStorleken avgör nästa steg:`)
console.log(`  under ~10 MB  → kan buntas med appen som i dag`)
console.log(`  över det      → flytta land-kontrollen till PostGIS i Supabase`)
console.log(`\nSedan: kör om ruttverifieringen innan något byts ut i appen.`)

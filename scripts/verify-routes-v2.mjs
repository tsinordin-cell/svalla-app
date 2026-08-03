/**
 * verify-routes-v2.mjs — hur många av våra rutter håller mot en mask som ser land?
 *
 * Den gamla verifieringen (scripts/verify-routes.ts) använder
 * swedish-coastline.json, som saknar fastlandet. Den kunde alltså aldrig
 * upptäcka en rutt som går över land — vilket är varför den aldrig larmade.
 *
 * Det här skriptet kör samma kontroll som produktionens validatePathLand,
 * men mot den nya masken från build-land-mask.mjs:
 *   - för varje segment i rutten, sampla 19 mellanpunkter (samma
 *     SAMPLES_PER_SEGMENT = 20 som landMask.ts)
 *   - ändpunkter räknas inte, eftersom hamnar ligger på kustlinjen
 *   - en enda mellanpunkt på land underkänner rutten
 *
 * KÖR
 *   node scripts/verify-routes-v2.mjs
 *   node scripts/verify-routes-v2.mjs --mask=src/lib/data/land-mask.json
 *   node scripts/verify-routes-v2.mjs --lista        # skriv ut varje underkänd rutt
 */

import { readFileSync } from 'node:fs'

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)
const MASK = typeof args.mask === 'string' ? args.mask : 'src/lib/data/land-mask.json'
const RUTTER = 'src/lib/data/precomputed-routes.json'

console.log(`Mask:   ${MASK}`)
console.log(`Rutter: ${RUTTER}\n`)

const mask = JSON.parse(readFileSync(MASK, 'utf8'))
if (mask.format !== 'coastline-segments-v1') {
  console.error(`Oväntat maskformat: ${mask.format ?? '(saknas)'}`)
  console.error('Kör scripts/build-land-mask.mjs först.')
  process.exit(1)
}
const segs = mask.segments
console.log(`Kustlinjesegment: ${segs.length.toLocaleString('sv-SE')}`)

// Latitud-hinkar, samma som i build-land-mask.mjs
const BUCKET = 0.01
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

function onLand(lat, lng) {
  if (lat < minLat || lat > maxLat) return false
  const cand = buckets.get(Math.floor(lat / BUCKET))
  if (!cand) return false
  let c = 0
  for (const [x1, y1, x2, y2] of cand) {
    if ((y1 > lat) !== (y2 > lat)) {
      const xInt = x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1)
      if (xInt > lng) c++
    }
  }
  return c % 2 === 1
}

// Produktionens regel, plus en hamnmarginal.
//
// Diagnosen visade att 67 % av landträffarna låg under 100 m från en hamn och
// att 459 rutter hade sin STARTPUNKT på land enligt masken. Det är väntat:
// en gästhamn är en kaj, den ligger på kustlinjen och därmed innanför
// landpolygonen. Att underkänna en rutt för att de första hundra metrarna ut
// från kajen går genom "land" mäter kajen, inte rutten.
//
// landMask.ts hoppar redan över de exakta ändpunkterna av samma skäl, men bara
// dem — inte sampelpunkterna strax intill. Här utökas det till en marginal i
// meter från start och mål.
//
// Marginalen är en MÄTPARAMETER, inte en säkerhetsinställning. Den döljer
// medvetet fel nära hamnen för att kunna se felen längre ut. Vad produktionen
// ska göra vid kajen är en separat fråga — troligen snappa hamnkoordinaten
// till närmaste vatten i stället för att blunda för en sträcka.
const N = 20
const HAMN_MARGINAL_M = Number(args.marginal ?? 250)

const R_KM = 6371
const rad = d => (d * Math.PI) / 180
function avstandM(lat1, lng1, lat2, lng2) {
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R_KM * Math.asin(Math.sqrt(a)) * 1000
}

/** Ligger punkten inom marginalen från rutten start eller mål? */
function naraHamn(lat, lng, start, mal) {
  return avstandM(lat, lng, start[0], start[1]) < HAMN_MARGINAL_M ||
         avstandM(lat, lng, mal[0], mal[1]) < HAMN_MARGINAL_M
}

function segmentCrossesLand(lat1, lng1, lat2, lng2, start, mal) {
  for (let i = 1; i < N; i++) {
    const t = i / N
    const la = lat1 + (lat2 - lat1) * t
    const ln = lng1 + (lng2 - lng1) * t
    if (naraHamn(la, ln, start, mal)) continue
    if (onLand(la, ln)) return true
  }
  return false
}

const routes = JSON.parse(readFileSync(RUTTER, 'utf8')).routes
console.log(`Rutter att kontrollera: ${routes.length}\n`)

// Bara rutter som ligger inom maskens täckning kan bedömas. Ligger en rutt
// utanför vet vi ingenting — och att kalla det "godkänd" vore att upprepa
// exakt det fel vi just grävt fram.
const inomTackning = ([lat, lng]) =>
  lat >= minLat && lat <= maxLat &&
  lng >= mask._meta.bboxKoordinater[1] && lng <= mask._meta.bboxKoordinater[3]

let ok = 0, underkanda = 0, utanfor = 0
const lista = []

for (const r of routes) {
  const w = r.waypoints
  if (!w.every(inomTackning)) { utanfor++; continue }

  const start = w[0], mal = w[w.length - 1]
  let trasig = null
  for (let i = 0; i < w.length - 1; i++) {
    if (segmentCrossesLand(w[i][0], w[i][1], w[i + 1][0], w[i + 1][1], start, mal)) { trasig = i; break }
  }
  if (trasig === null) ok++
  else {
    underkanda++
    // Hur långt ut ligger felet? En träff långt från hamn är ett riktigt
    // problem; en nära hamn är sannolikt fortfarande kajeffekt.
    let d = Infinity
    const [la1, ln1] = w[trasig], [la2, ln2] = w[trasig + 1]
    for (let i = 1; i < N; i++) {
      const t = i / N
      const la = la1 + (la2 - la1) * t, ln = ln1 + (ln2 - ln1) * t
      if (naraHamn(la, ln, start, mal)) continue
      if (onLand(la, ln)) {
        d = Math.min(avstandM(la, ln, start[0], start[1]), avstandM(la, ln, mal[0], mal[1]))
        break
      }
    }
    lista.push({ text: `${r.from.name} → ${r.to.name}  (segment ${trasig}, ${r.distanceKm} km, ${Math.round(d)} m från hamn)`, d })
  }
}

const bedomda = ok + underkanda
console.log('══════════════════════════════════════')
console.log(`Bedömda rutter:   ${bedomda}`)
console.log(`  godkända:       ${ok}${bedomda ? `  (${(ok / bedomda * 100).toFixed(1)} %)` : ''}`)
console.log(`  underkända:     ${underkanda}${bedomda ? `  (${(underkanda / bedomda * 100).toFixed(1)} %)` : ''}`)
console.log(`Utanför maskens täckning: ${utanfor}  (kan inte bedömas)`)
console.log('══════════════════════════════════════')

if (lista.length) {
  // Värst först — de längst från hamn är de verkliga problemen, inte de
  // som ligger kvar precis utanför marginalen.
  lista.sort((a, b) => b.d - a.d)
  console.log(`\nHamnmarginal: ${HAMN_MARGINAL_M} m (ändra med --marginal=N)`)
  const langtUt = lista.filter(l => l.d > 5000).length
  const medel = lista.filter(l => l.d > 1000 && l.d <= 5000).length
  console.log(`  över 5 km från hamn: ${langtUt}   1–5 km: ${medel}   under 1 km: ${lista.length - langtUt - medel}`)

  if (args.lista) {
    console.log('\nAlla underkända, värst först:')
    for (const l of lista) console.log('  -', l.text)
  } else {
    console.log('\nDe 10 värsta (längst från hamn — börja felsöka här):')
    for (const l of lista.slice(0, 10)) console.log('  -', l.text)
    console.log(`  … kör med --lista för alla ${lista.length}`)
  }
}

console.log('\nTolkning:')
console.log('  "godkända" = ingen mellanpunkt på land enligt den nya masken.')
console.log('  Det säger inget om att rutten är sjövärdig — bara att den inte')
console.log('  går över land. Djup, grund och farled är en annan fråga.')

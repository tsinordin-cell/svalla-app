/**
 * diagnose-route-failures.mjs — VARFÖR underkänns rutterna?
 *
 * verify-routes-v2 sa 610 av 612 underkända. Innan någon rör rutterna måste vi
 * veta vilket av två helt olika problem vi har. De leder åt motsatta håll:
 *
 *   A) RUTTERNA ÄR FEL. Vägen går verkligen över land. Då ska rutterna byggas om.
 *
 *   B) KONTROLLEN ÄR FÖR HÅRD VID HAMNEN. Hamnar ligger per definition på
 *      kustlinjen — alltså innanför land-polygonen. Med den gamla masken
 *      (0,38 %, inget fastland) märktes det knappt. Med en mask som faktiskt
 *      innehåller fastlandet ligger varje fastlandshamn i land, och då
 *      underkänns sträckan de första hundra metrarna ut från kajen.
 *      Då är rutterna oskyldiga och det är regeln som ska justeras.
 *
 * landMask.ts känner redan till problemet — kommentaren där beskriver hur V1
 * "rejekterade ALLA harbor-rutter eftersom harbors per definition ligger PÅ
 * kustlinjen". Lösningen var att hoppa över ändpunkterna. Men bara ändpunkterna,
 * inte sampelpunkterna strax intill.
 *
 * SÅ HÄR SKILJER VI DEM ÅT
 * För varje underkänd rutt: var längs vägen ligger den första landträffen, och
 * hur långt från närmaste hamn? Ligger träffarna tätt intill start/mål är det B.
 * Ligger de mitt ute på sträckan är det A.
 *
 * KÖR
 *   node scripts/diagnose-route-failures.mjs
 */

import { readFileSync } from 'node:fs'

const mask = JSON.parse(readFileSync('src/lib/data/land-mask.json', 'utf8'))
const routes = JSON.parse(readFileSync('src/lib/data/precomputed-routes.json', 'utf8')).routes
const segs = mask.segments

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
      const xi = x1 + ((lat - y1) * (x2 - x1)) / (y2 - y1)
      if (xi > lng) c++
    }
  }
  return c % 2 === 1
}

const R = 6371
const rad = d => (d * Math.PI) / 180
function km(lat1, lng1, lat2, lng2) {
  const dLat = rad(lat2 - lat1), dLng = rad(lng2 - lng1)
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(rad(lat1)) * Math.cos(rad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

const N = 20
const hinkar = { 'under 100 m': 0, '100–300 m': 0, '300 m–1 km': 0, '1–5 km': 0, 'över 5 km': 0 }
let underkanda = 0, startpunktPaLand = 0, malpunktPaLand = 0
const exempel = []

for (const r of routes) {
  const w = r.waypoints
  if (!w.every(([la, ln]) => la >= minLat && la <= maxLat &&
      ln >= mask._meta.bboxKoordinater[1] && ln <= mask._meta.bboxKoordinater[3])) continue

  // Ligger själva hamnarna på land enligt masken?
  if (onLand(w[0][0], w[0][1])) startpunktPaLand++
  if (onLand(w[w.length - 1][0], w[w.length - 1][1])) malpunktPaLand++

  // Första landträffen längs vägen
  let hit = null
  for (let i = 0; i < w.length - 1 && !hit; i++) {
    const [la1, ln1] = w[i], [la2, ln2] = w[i + 1]
    for (let k = 1; k < N; k++) {
      const t = k / N
      const la = la1 + (la2 - la1) * t, ln = ln1 + (ln2 - ln1) * t
      if (onLand(la, ln)) { hit = { i, t, la, ln }; break }
    }
  }
  if (!hit) continue
  underkanda++

  const dStart = km(hit.la, hit.ln, w[0][0], w[0][1])
  const dMal = km(hit.la, hit.ln, w[w.length - 1][0], w[w.length - 1][1])
  const d = Math.min(dStart, dMal)

  if (d < 0.1) hinkar['under 100 m']++
  else if (d < 0.3) hinkar['100–300 m']++
  else if (d < 1) hinkar['300 m–1 km']++
  else if (d < 5) hinkar['1–5 km']++
  else hinkar['över 5 km']++

  if (exempel.length < 8) {
    exempel.push(`${r.from.name} → ${r.to.name}: träff i segment ${hit.i} vid t=${hit.t.toFixed(2)}, ` +
      `${(d * 1000).toFixed(0)} m från närmaste hamn  [${hit.la.toFixed(4)}, ${hit.ln.toFixed(4)}]`)
  }
}

console.log('═══════════════════════════════════════════════')
console.log(`Underkända rutter: ${underkanda}`)
console.log(`Rutter vars STARTPUNKT ligger på land enligt masken: ${startpunktPaLand}`)
console.log(`Rutter vars MÅLPUNKT ligger på land enligt masken:   ${malpunktPaLand}`)
console.log('═══════════════════════════════════════════════')
console.log('\nAvstånd från första landträffen till närmaste hamn:')
for (const [k, v] of Object.entries(hinkar)) {
  const andel = underkanda ? ((v / underkanda) * 100).toFixed(1) : '0.0'
  console.log(`  ${k.padEnd(14)} ${String(v).padStart(4)}  (${andel} %)`)
}

console.log('\nExempel:')
for (const e of exempel) console.log('  -', e)

const nara = hinkar['under 100 m'] + hinkar['100–300 m']
const andelNara = underkanda ? (nara / underkanda) * 100 : 0
console.log('\n═══════════════════════════════════════════════')
if (andelNara > 70) {
  console.log('SLUTSATS: sannolikt B — kontrollen är för hård vid hamnen.')
  console.log(`${andelNara.toFixed(0)} % av träffarna ligger inom 300 m från en hamn.`)
  console.log('Rutterna är då i huvudsak oskyldiga. Regeln behöver en')
  console.log('hamn-marginal: hoppa över de första och sista ~200 m av vägen,')
  console.log('inte bara den exakta ändpunkten.')
} else if (andelNara < 30) {
  console.log('SLUTSATS: sannolikt A — rutterna går verkligen över land.')
  console.log(`Bara ${andelNara.toFixed(0)} % av träffarna är nära en hamn;`)
  console.log('resten ligger ute på sträckan. Rutterna måste byggas om.')
} else {
  console.log('SLUTSATS: blandat. Bådadera förekommer — titta på exemplen')
  console.log('ovan i sjökort innan något beslut tas.')
}
console.log('═══════════════════════════════════════════════')

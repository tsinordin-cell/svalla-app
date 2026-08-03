/**
 * inspect-route.mjs — plocka isär EN rutt så en människa kan döma
 *
 * 610 av 612 rutter underkänns. Så extrema tal har lurat oss en gång redan
 * i det här arbetet. Innan någon rör rutterna eller masken måste vi veta
 * vilket av två saker som gäller:
 *
 *   A) Rutterna är för glesa. Raka linjer mellan waypoints som ligger
 *      kilometer isär klipper öar i skärgården. Då är underkänt korrekt och
 *      det ritas verkligen linjer över land i appen.
 *
 *   B) Masken säger fel på just de här punkterna. Då är underkänt brus.
 *
 * Ingen av oss kan avgöra det genom att stirra på procent. Skriptet skriver
 * ut koordinater som går att klistra rakt in i en karta. Ögat avgör.
 *
 * KÖR
 *   node scripts/inspect-route.mjs                       # 5 av de värsta
 *   node scripts/inspect-route.mjs --rutt=sandhamn_to_dalaro
 *   node scripts/inspect-route.mjs --sok="Sandhamn"
 */

import { readFileSync } from 'node:fs'

const args = Object.fromEntries(
  process.argv.slice(2).map(a => {
    const [k, v] = a.replace(/^--/, '').split('=')
    return [k, v ?? true]
  })
)

const mask = JSON.parse(readFileSync('src/lib/data/land-mask.json', 'utf8'))
const routes = JSON.parse(readFileSync('src/lib/data/precomputed-routes.json', 'utf8')).routes

const BUCKET = 0.01
const buckets = new Map()
let minLat = Infinity, maxLat = -Infinity
for (const s of mask.segments) {
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
const km = (a, b, c, d) => {
  const dLat = rad(c - a), dLng = rad(d - b)
  const x = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a)) * Math.cos(rad(c)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(x))
}

let valda
if (typeof args.rutt === 'string') {
  valda = routes.filter(r => r.id === args.rutt)
} else if (typeof args.sok === 'string') {
  const q = args.sok.toLowerCase()
  valda = routes.filter(r => r.from.name.toLowerCase().includes(q) || r.to.name.toLowerCase().includes(q)).slice(0, 5)
} else {
  valda = routes.filter(r => /Husarö|Sandhamn/.test(r.from.name)).slice(0, 5)
}
if (!valda.length) { console.error('Hittade ingen matchande rutt.'); process.exit(1) }

for (const r of valda) {
  const w = r.waypoints
  console.log('\n═══════════════════════════════════════════════════')
  console.log(`${r.from.name} → ${r.to.name}   (${r.distanceKm} km, ${w.length} waypoints)`)
  console.log(`id: ${r.id}   validated-flagga i datan: ${r.validated}`)
  console.log('═══════════════════════════════════════════════════')

  console.log('\nWAYPOINTS — ligger de i vatten?')
  w.forEach((p, i) => {
    const land = onLand(p[0], p[1])
    const avst = i > 0 ? km(w[i - 1][0], w[i - 1][1], p[0], p[1]).toFixed(1) + ' km' : '—'
    const märk = i === 0 ? '(start)' : i === w.length - 1 ? '(mål)' : ''
    console.log(`  ${String(i).padStart(2)}  ${p[0].toFixed(4)}, ${p[1].toFixed(4)}  ${land ? 'LAND  ' : 'vatten'}  hopp: ${avst.padStart(8)} ${märk}`)
  })

  console.log('\nSEGMENT — var korsas land?')
  const N = 20
  let hittade = 0
  for (let i = 0; i < w.length - 1; i++) {
    const [la1, ln1] = w[i], [la2, ln2] = w[i + 1]
    const träffar = []
    for (let k = 1; k < N; k++) {
      const t = k / N
      const la = la1 + (la2 - la1) * t, ln = ln1 + (ln2 - ln1) * t
      if (onLand(la, ln)) träffar.push({ t, la, ln })
    }
    if (!träffar.length) continue
    hittade++
    const f = träffar[0], sist = träffar[träffar.length - 1]
    const langd = km(la1, ln1, la2, ln2)
    console.log(`  segment ${i} (${langd.toFixed(1)} km): ${träffar.length}/${N - 1} sampel på land`)
    console.log(`      första: ${f.la.toFixed(5)}, ${f.ln.toFixed(5)}`)
    if (träffar.length > 1) console.log(`      sista:  ${sist.la.toFixed(5)}, ${sist.ln.toFixed(5)}`)
  }
  if (!hittade) console.log('  (inga — rutten är ren)')
}

console.log('\n\n═══════════════════════════════════════════════════')
console.log('SÅ HÄR AVGÖR DU')
console.log('═══════════════════════════════════════════════════')
console.log('Klistra in en koordinat i Google Maps eller sjökort, t.ex.')
console.log('  59.3204, 18.0742')
console.log('')
console.log('Ligger punkten på en ö eller på fastlandet -> masken har rätt,')
console.log('rutten är för gles och ritar en linje över land. Riktigt fel.')
console.log('')
console.log('Ligger punkten i öppet vatten -> masken har fel på just den')
console.log('platsen, och underkännandet är brus. Då ska vi inte röra rutterna.')
console.log('')
console.log('Kolla gärna tre–fyra stycken innan du drar en slutsats. Ett')
console.log('enskilt stickprov kan råka vara det ovanliga fallet.')

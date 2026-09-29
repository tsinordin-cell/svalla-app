/**
 * lagg-till-precompute.ts — lägger till precomputed-rutter för hamnpar som
 * saknas i precomputed-routes.json, räknade mot DET RASTER SOM LIGGER I REPOT.
 *
 * VARFÖR (2026-09-29, kort d986cb85): de fem hamnarna i norra Mälarbassängen
 * (Sigtuna, Steninge, Flottvik, Skokloster, Stäket) lades till 2026-08-15 men
 * inget par därifrån fanns i precompute. Varje kall lambda fick därför köra
 * raster-A* (uppmätt i produktion 2026-09-29: Sigtuna→Stadshuskajen 2,8 s,
 * Skokloster→Birka 1,0 s) i stället för en uppslagning (Strömkajen→Vaxholm:
 * 0 ms beräkning).
 *
 * REGLER (samma som regenerera-precompute-mot-raster.ts)
 *   - Samma sökning som produktionen (findRasterPath i landMask.ts), samma
 *     raster. Ingen egen matematik.
 *   - Befintliga rutter rörs aldrig. Bara par som saknas (i båda riktningarna,
 *     samma 80 m-tolerans som lookupPrecomputed) läggs till.
 *   - Varje ny rutt måste klara validatePathLand (produktionens spärr). Faller
 *     en enda skrivs INGENTING.
 *   - Saknar rastret väg för ett par skrivs det ut som fynd — det är inte
 *     något att tysta. Ett sådant par får ingen rutt.
 *   - Ändpunkterna: rastersökningen snappar start/mål till närmaste vatten-
 *     cell. Hamnens exakta punkt läggs till bara om den ligger i vatten
 *     (samma regel som findPathViaGrid i seaPathfinder.ts).
 *
 * KÖR
 *   npx tsx scripts/lagg-till-precompute.ts --fran=sigtuna,steninge,flottvik,skokloster,staket --till=malaren
 *   npx tsx scripts/lagg-till-precompute.ts --fran=... --till=... --torr    # bara rapport
 *
 *   --fran  hamn-id:n ur DEPARTURES (planner-client.ts), kommaseparerade
 *   --till  hamn-id:n, eller ett vattensystem ('malaren' | 'saltsjon') = alla
 *           hamnar i det systemet. Par som kräver sluss hoppas över.
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { findRasterPath, pointOnLand, validatePathLand } from '../src/lib/landMask'
import { calculatePathDistanceKm } from '../src/lib/seaPathfinder'
import { DEPARTURES, requiresLock, waterOf, type Departure } from '../src/lib/planner-client'

type Route = {
  id: string
  from: { name: string; lat: number; lng: number }
  to: { name: string; lat: number; lng: number }
  validated: boolean
  distanceKm: number
  waypoints?: number[][]
  omraknad?: string
  tillagd?: string
}

const FIL = 'src/lib/data/precomputed-routes.json'
const TORR = process.argv.includes('--torr')
const arg = (n: string) => process.argv.find(a => a.startsWith(`--${n}=`))?.slice(n.length + 3) ?? ''

const byId = new Map(DEPARTURES.map(d => [d.id, d]))
const fran = arg('fran').split(',').filter(Boolean).map(id => {
  const d = byId.get(id)
  if (!d) { console.error(`okänd hamn i --fran: ${id}`); process.exit(1) }
  return d
})
const tillArg = arg('till')
const till: Departure[] = tillArg === 'malaren' || tillArg === 'saltsjon'
  ? DEPARTURES.filter(d => waterOf(d) === tillArg)
  : tillArg.split(',').filter(Boolean).map(id => {
    const d = byId.get(id)
    if (!d) { console.error(`okänd hamn i --till: ${id}`); process.exit(1) }
    return d
  })
if (fran.length === 0 || till.length === 0) { console.error('ange --fran och --till'); process.exit(1) }

const data = JSON.parse(readFileSync(FIL, 'utf8')) as { routes: Route[]; _meta?: unknown }
const raster = JSON.parse(readFileSync('src/lib/data/land-raster.json', 'utf8')) as { _meta: { byggd: string } }

const TOL = 0.0008 // samma som lookupPrecomputed
const nara = (a: { lat: number; lng: number }, b: { lat: number; lng: number }) =>
  Math.abs(a.lat - b.lat) < TOL && Math.abs(a.lng - b.lng) < TOL
const finns = (a: Departure, b: Departure) =>
  data.routes.some(r => (nara(r.from, a) && nara(r.to, b)) || (nara(r.from, b) && nara(r.to, a)))

const gcKm = (a: Departure, b: Departure) => {
  const R = 6371.0088, toR = (x: number) => x * Math.PI / 180
  const dLat = toR(b.lat - a.lat), dLng = toR(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.lat)) * Math.cos(toR(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

let tillagda = 0, fannsRedan = 0, saknas = 0, ogiltiga = 0, sluss = 0
const nya: Route[] = []
const klara = new Set<string>()
const idag = new Date().toISOString().slice(0, 10)

for (const a of fran) {
  for (const b of till) {
    if (a.id === b.id) continue
    const nyckel = [a.id, b.id].sort().join('|')
    if (klara.has(nyckel)) continue
    klara.add(nyckel)
    if (requiresLock(a, b)) { sluss++; continue }
    if (finns(a, b)) { fannsRedan++; continue }
    const t0 = Date.now()
    const p = findRasterPath(a.lat, a.lng, b.lat, b.lng)
    const ms = Date.now() - t0
    if (!p || p.length < 2) { saknas++; console.log(`  SAKNAS  ${a.id} → ${b.id}: ingen väg i rastret (${ms} ms) — FYND, ingen rutt skrivs`); continue }
    const path: Array<[number, number]> = []
    if (!pointOnLand(a.lat, a.lng)) path.push([a.lat, a.lng])
    path.push(...p)
    if (!pointOnLand(b.lat, b.lng)) path.push([b.lat, b.lng])
    const v = validatePathLand(path)
    if (!v.ok) { ogiltiga++; console.log(`  OGILTIG ${a.id} → ${b.id}: vägen korsar land vid ${v.crossesAt}`); continue }
    const km = Math.round(calculatePathDistanceKm(path) * 10) / 10
    const fagel = gcKm(a, b)
    tillagda++
    console.log(`  NY      ${(a.id + '_to_' + b.id).padEnd(34)} ${String(km).padStart(6)} km  (fågel ${fagel.toFixed(1)}, kvot ${(km / fagel).toFixed(1)}x, ${path.length} pkt, ${ms} ms)`)
    nya.push({
      id: `${a.id}_to_${b.id}`,
      from: { name: a.name, lat: a.lat, lng: a.lng },
      to: { name: b.name, lat: b.lat, lng: b.lng },
      validated: true,
      distanceKm: km,
      waypoints: path.map(([x, y]) => [Math.round(x * 1e5) / 1e5, Math.round(y * 1e5) / 1e5]),
      tillagd: `raster ${raster._meta.byggd}, ${idag}`,
    })
  }
}

console.log(`\npar: ${klara.size}  nya: ${tillagda}  fanns redan: ${fannsRedan}  sluss (hoppade): ${sluss}  saknas väg: ${saknas}  ogiltiga: ${ogiltiga}`)
if (ogiltiga > 0) { console.error('AVBRYTER: en ny väg korsade land — inget skrivet.'); process.exit(1) }
if (TORR) { console.log('TORRKÖRNING — inget skrivet.'); process.exit(0) }
if (tillagda === 0) { console.log('Inget att skriva.'); process.exit(0) }

// Sista spärren före skrivning: varenda ny rutt måste klara produktionens validering (avrundade koordinater).
let underkanda = 0
for (const r of nya) {
  const v = validatePathLand(r.waypoints as Array<[number, number]>)
  if (!v.ok) { underkanda++; console.error(`  UNDERKÄND vid skrivning: ${r.id} korsar land vid ${v.crossesAt}`) }
}
if (underkanda) { console.error(`AVBRYTER: ${underkanda} rutter underkända — inget skrivet.`); process.exit(1) }

writeFileSync(FIL, JSON.stringify({ ...data, routes: [...data.routes, ...nya] }))
console.log('skrivet:', FIL, `(${data.routes.length} → ${data.routes.length + nya.length} rutter)`)

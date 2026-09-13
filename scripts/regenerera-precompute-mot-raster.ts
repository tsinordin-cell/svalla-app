/**
 * regenerera-precompute-mot-raster.ts — räknar om precomputed-routes mot
 * DET RASTER SOM LIGGER I REPOT och byter ut rutter som blivit kortare.
 *
 * VARFÖR (2026-09-13): rutterna i precomputed-routes.json var A*-sökta mot
 * ett raster där Skurusundet och Baggensstäket var avskurna från havet.
 * Passagerna öppnades i rastret (farbara-passager.json, Tom 2026-08-14), men
 * precompute räknades aldrig om — så /planera fortsatte leverera
 * Strömkajen→Gustavsberg som 87 km "verifierad sjöled" när sjövägen genom
 * Skurusundet är 21 km. 26 av 645 rutter hade omvägskvot > 2,5.
 *
 * REGLER
 *   - Samma sökning som produktionen (findRasterPath i landMask.ts), samma
 *     raster. Ingen egen matematik.
 *   - En rutt byts BARA om den nya är kortare än den gamla. Blir den längre
 *     eller saknas väg behålls den gamla och det skrivs ut — det är ett fynd,
 *     inte något att tysta.
 *   - Varje ny rutt måste klara validatePathLand (produktionens spärr) innan
 *     den skrivs. Faller en enda skrivs INGENTING.
 *   - Ändpunkterna: rastersökningen snappar start/mål till närmaste vatten-
 *     cell. Anroparens exakta punkt läggs till bara om den ligger i vatten
 *     (samma regel som findPathViaGrid i seaPathfinder.ts).
 *
 * KÖR
 *   npx tsx scripts/regenerera-precompute-mot-raster.ts           # skriver
 *   npx tsx scripts/regenerera-precompute-mot-raster.ts --torr    # bara rapport
 *   npx tsx scripts/regenerera-precompute-mot-raster.ts --bara=stromkajen_to_gustavsberg
 */
import { readFileSync, writeFileSync } from 'node:fs'
import { findRasterPath, pointOnLand, validatePathLand } from '../src/lib/landMask'
import { calculatePathDistanceKm } from '../src/lib/seaPathfinder'

type Route = {
  id: string
  from: { name: string; lat: number; lng: number }
  to: { name: string; lat: number; lng: number }
  validated: boolean
  distanceKm: number
  waypoints?: number[][]
  omraknad?: string
}

const FIL = 'src/lib/data/precomputed-routes.json'
const TORR = process.argv.includes('--torr')
const BARA = process.argv.find(a => a.startsWith('--bara='))?.slice(7)

const data = JSON.parse(readFileSync(FIL, 'utf8')) as { routes: Route[]; _meta?: unknown }
const raster = JSON.parse(readFileSync('src/lib/data/land-raster.json', 'utf8')) as { _meta: { byggd: string } }

const gcKm = (a: [number, number], b: [number, number]) => {
  const R = 6371.0088, toR = (x: number) => x * Math.PI / 180
  const dLat = toR(b[0] - a[0]), dLng = toR(b[1] - a[1])
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a[0])) * Math.cos(toR(b[0])) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

let bytta = 0, langre = 0, saknas = 0, oforandrade = 0, ogiltiga = 0
const rader: string[] = []
const nya: Route[] = []

for (const r of data.routes) {
  if (BARA && r.id !== BARA) { nya.push(r); continue }
  const p = findRasterPath(r.from.lat, r.from.lng, r.to.lat, r.to.lng)
  if (!p || p.length < 2) { saknas++; rader.push(`  SAKNAS  ${r.id}: ingen väg i rastret — gammal behålls (${r.distanceKm} km)`); nya.push(r); continue }
  const path: Array<[number, number]> = []
  if (!pointOnLand(r.from.lat, r.from.lng)) path.push([r.from.lat, r.from.lng])
  path.push(...p)
  if (!pointOnLand(r.to.lat, r.to.lng)) path.push([r.to.lat, r.to.lng])
  const v = validatePathLand(path)
  if (!v.ok) { ogiltiga++; rader.push(`  OGILTIG ${r.id}: ny väg korsar land vid ${v.crossesAt} — gammal behålls`); nya.push(r); continue }
  const km = Math.round(calculatePathDistanceKm(path) * 10) / 10
  const fagel = gcKm([r.from.lat, r.from.lng], [r.to.lat, r.to.lng])
  // Byt bara vid > 2 % kortare. Torrkörning 2026-09-13: 147 av 645 blev
  // 0–2 % kortare — det är rasterbrus, inte en bättre väg, och en manuellt
  // godkänd rutt ska inte bytas mot en ny som kramar landkanten för 50 m.
  if (km < r.distanceKm * 0.98) {
    bytta++
    rader.push(`  BYTT    ${r.id.padEnd(36)} ${String(r.distanceKm).padStart(6)} → ${String(km).padStart(6)} km  (fågel ${fagel.toFixed(1)}, kvot ${(r.distanceKm / fagel).toFixed(1)}x → ${(km / fagel).toFixed(1)}x)`)
    nya.push({ ...r, validated: true, distanceKm: km, waypoints: path.map(([a, b]) => [Math.round(a * 1e5) / 1e5, Math.round(b * 1e5) / 1e5]), omraknad: `raster ${raster._meta.byggd}, ${new Date().toISOString().slice(0, 10)}` })
  } else if (km > r.distanceKm * 1.02) {
    langre++
    rader.push(`  LÄNGRE  ${r.id.padEnd(36)} ${String(r.distanceKm).padStart(6)} → ${String(km).padStart(6)} km — gammal behålls, KOLLA`)
    nya.push(r)
  } else { oforandrade++; nya.push(r) }
}

console.log(rader.join('\n'))
console.log(`\nrutter: ${data.routes.length}  bytta: ${bytta}  längre (behållna): ${langre}  oförändrade: ${oforandrade}  saknas: ${saknas}  ogiltiga: ${ogiltiga}`)

if (ogiltiga > 0) { console.error('AVBRYTER: en ny väg korsade land — inget skrivet.'); process.exit(1) }
if (TORR) { console.log('TORRKÖRNING — inget skrivet.'); process.exit(0) }

// Sista spärren före skrivning: varenda rutt i filen måste klara produktionens validering.
let underkanda = 0
for (const r of nya) {
  if (!r.waypoints || r.waypoints.length < 2) continue
  const v = validatePathLand(r.waypoints as Array<[number, number]>)
  if (!v.ok) { underkanda++; console.error(`  UNDERKÄND vid skrivning: ${r.id} korsar land vid ${v.crossesAt}`) }
}
if (underkanda) { console.error(`AVBRYTER: ${underkanda} rutter underkända — inget skrivet.`); process.exit(1) }

writeFileSync(FIL, JSON.stringify({ ...data, routes: nya }))
console.log('skrivet:', FIL)

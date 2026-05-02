/**
 * generate-precomputed-routes.mts
 *
 * Genererar precomputed waypoint-rutter för alla par i DEPARTURES.
 * Kör med: node --experimental-strip-types scripts/generate-precomputed-routes.mts
 *
 * Strategi:
 *   - Befintliga validated=true rutter behålls oförändrade
 *   - Saknade par fylls med waypoint-Dijkstra (snabb, waypoints är per definition på vatten)
 *   - Resultat skrivs tillbaka till src/lib/data/precomputed-routes.json
 */

import { readFileSync, writeFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, resolve } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')

// ── Läs seaWaypoints direkt (undviker att dra in landMask/turf) ────────────
// Vi plockar ut bara vad vi behöver: SEA_WAYPOINTS, SEA_EDGES, buildSeaGraph, buildWaypointMap

type SeaWaypoint = { id: string; lat: number; lng: number; name: string }
type SeaEdge = { from: string; to: string }

// Dynamisk import av .ts via --experimental-strip-types
const { SEA_WAYPOINTS, SEA_EDGES, buildSeaGraph, buildWaypointMap } =
  await import('../src/lib/seaWaypoints.ts') as {
    SEA_WAYPOINTS: SeaWaypoint[]
    SEA_EDGES: SeaEdge[]
    buildSeaGraph: () => Map<string, string[]>
    buildWaypointMap: () => Map<string, SeaWaypoint>
  }

// ── Departure points (kopierat från planner-client.ts) ────────────────────
const DEPARTURES = [
  { id: 'stromkajen',   name: 'Strömkajen',   lat: 59.3238, lng: 18.0776 },
  { id: 'nacka-strand', name: 'Nacka Strand',  lat: 59.3195, lng: 18.1454 },
  { id: 'gustavsberg',  name: 'Gustavsberg',   lat: 59.3283, lng: 18.3820 },
  { id: 'vaxholm',      name: 'Vaxholm',       lat: 59.4024, lng: 18.3512 },
  { id: 'ljustero',     name: 'Ljusterö',      lat: 59.5540, lng: 18.6870 },
  { id: 'grinda',       name: 'Grinda',        lat: 59.4602, lng: 18.7167 },
  { id: 'svartso',      name: 'Svartsö',       lat: 59.4730, lng: 18.7250 },
  { id: 'finnhamn',     name: 'Finnhamn',      lat: 59.5430, lng: 18.8240 },
  { id: 'ingaro',       name: 'Ingarö',        lat: 59.2472, lng: 18.5861 },
  { id: 'stavsnäs',     name: 'Stavsnäs',      lat: 59.1895, lng: 18.6823 },
  { id: 'husaro',       name: 'Husarö',        lat: 59.5195, lng: 18.9840 },
  { id: 'möja',         name: 'Möja',          lat: 59.4545, lng: 18.9110 },
  { id: 'sandhamn',     name: 'Sandhamn',      lat: 59.2820, lng: 18.9130 },
  { id: 'dalaroe',      name: 'Dalarö',        lat: 59.1298, lng: 18.4003 },
  { id: 'orno',         name: 'Ornö',          lat: 58.9773, lng: 18.4550 },
  { id: 'nattaro',      name: 'Nåttarö',       lat: 58.8455, lng: 17.8742 },
  { id: 'uto',          name: 'Utö',           lat: 58.9590, lng: 18.3017 },
  { id: 'nynashamn',    name: 'Nynäshamn',     lat: 58.9038, lng: 17.9475 },
  { id: 'landsort',     name: 'Landsort',      lat: 58.7440, lng: 17.8640 },
  { id: 'sollenkroka',  name: 'Sollenkroka',   lat: 59.7050, lng: 18.8090 },
  { id: 'norrtälje',    name: 'Norrtälje',     lat: 59.7579, lng: 18.7077 },
  { id: 'furusund',     name: 'Furusund',      lat: 59.6653, lng: 18.9217 },
  { id: 'blido',        name: 'Blidö',         lat: 59.6200, lng: 18.8700 },
  { id: 'rodloga',      name: 'Rödlöga',       lat: 59.8180, lng: 19.0650 },
  { id: 'kapellskar',   name: 'Kapellskär',    lat: 59.7245, lng: 19.0740 },
  { id: 'arholma',      name: 'Arholma',       lat: 59.8532, lng: 19.1345 },
]

// ── Haversine ──────────────────────────────────────────────────────────────
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(Δφ/2)**2 + Math.cos(φ1)*Math.cos(φ2)*Math.sin(Δλ/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}

function pathKm(path: [number, number][]): number {
  let d = 0
  for (let i = 1; i < path.length; i++) {
    d += haversineKm(path[i-1]![0], path[i-1]![1], path[i]![0], path[i]![1])
  }
  return d
}

// ── Dijkstra (samma logik som findPathViaWaypoints i seaPathfinder) ────────
function dijkstra(
  startLat: number, startLng: number,
  endLat: number,   endLng: number,
): [number, number][] | null {
  const graph = buildSeaGraph()
  const waypointMap = buildWaypointMap()

  let nearestStart: SeaWaypoint | null = null
  let nearestEnd: SeaWaypoint | null = null
  let minS = Infinity, minE = Infinity

  for (const wp of SEA_WAYPOINTS) {
    const d1 = haversineKm(startLat, startLng, wp.lat, wp.lng)
    const d2 = haversineKm(endLat,   endLng,   wp.lat, wp.lng)
    if (d1 < minS) { minS = d1; nearestStart = wp }
    if (d2 < minE) { minE = d2; nearestEnd   = wp }
  }

  if (!nearestStart || !nearestEnd) return null
  if (nearestStart.id === nearestEnd.id) return [[startLat, startLng], [endLat, endLng]]

  const dist = new Map<string, number>()
  const prev = new Map<string, string | null>()
  const unvisited = new Set<string>()

  for (const wp of SEA_WAYPOINTS) {
    dist.set(wp.id, Infinity)
    prev.set(wp.id, null)
    unvisited.add(wp.id)
  }
  dist.set(nearestStart.id, 0)

  while (unvisited.size > 0) {
    let cur: string | null = null
    let minD = Infinity
    for (const id of unvisited) {
      const d = dist.get(id)!
      if (d < minD) { minD = d; cur = id }
    }
    if (cur === null || minD === Infinity) break
    if (cur === nearestEnd.id) break
    unvisited.delete(cur)

    const neighbors = graph.get(cur) ?? []
    const curDist = dist.get(cur)!
    const curWp = waypointMap.get(cur)!

    for (const nId of neighbors) {
      if (!unvisited.has(nId)) continue
      const nWp = waypointMap.get(nId)
      if (!nWp) continue
      const nd = curDist + haversineKm(curWp.lat, curWp.lng, nWp.lat, nWp.lng)
      if (nd < dist.get(nId)!) {
        dist.set(nId, nd)
        prev.set(nId, cur)
      }
    }
  }

  const path: string[] = []
  let current: string | null = nearestEnd.id
  while (current !== null) {
    path.unshift(current)
    current = prev.get(current) ?? null
  }

  if (path.length === 0 || path[0] !== nearestStart.id) return null

  const result: [number, number][] = [[startLat, startLng]]
  for (const wpId of path) {
    const wp = waypointMap.get(wpId)
    if (wp) result.push([wp.lat, wp.lng])
  }
  result.push([endLat, endLng])
  return result
}

// ── Läs befintlig JSON ─────────────────────────────────────────────────────
const jsonPath = resolve(ROOT, 'src/lib/data/precomputed-routes.json')
const existing = JSON.parse(readFileSync(jsonPath, 'utf-8')) as {
  routes: Array<{
    id: string
    from: { name: string; lat: number; lng: number }
    to:   { name: string; lat: number; lng: number }
    validated: boolean
    distanceKm?: number
    waypoints?: number[][]
  }>
}

// Bygg en lookup-nyckel för befintliga rutter (4 decimaler ~ toleransen i lookupPrecomputed)
const COORD_TOLERANCE = 0.0008
function routeKey(flat: number, flng: number, tlat: number, tlng: number): string {
  return `${flat.toFixed(4)},${flng.toFixed(4)}→${tlat.toFixed(4)},${tlng.toFixed(4)}`
}

const existingKeys = new Set<string>()
for (const r of existing.routes) {
  existingKeys.add(routeKey(r.from.lat, r.from.lng, r.to.lat, r.to.lng))
  existingKeys.add(routeKey(r.to.lat, r.to.lng, r.from.lat, r.from.lng))
}

function hasRoute(fromLat: number, fromLng: number, toLat: number, toLng: number): boolean {
  for (const r of existing.routes) {
    const df = Math.abs(r.from.lat - fromLat) < COORD_TOLERANCE && Math.abs(r.from.lng - fromLng) < COORD_TOLERANCE
    const dt = Math.abs(r.to.lat   - toLat)   < COORD_TOLERANCE && Math.abs(r.to.lng   - toLng)   < COORD_TOLERANCE
    if (df && dt) return true
    // reverse
    const drf = Math.abs(r.from.lat - toLat)   < COORD_TOLERANCE && Math.abs(r.from.lng - toLng)   < COORD_TOLERANCE
    const drt = Math.abs(r.to.lat   - fromLat) < COORD_TOLERANCE && Math.abs(r.to.lng   - fromLng) < COORD_TOLERANCE
    if (drf && drt) return true
  }
  return false
}

// ── Generera saknade par ───────────────────────────────────────────────────
const newRoutes: typeof existing.routes = []
let generated = 0, skipped = 0, failed = 0

for (const from of DEPARTURES) {
  for (const to of DEPARTURES) {
    if (from.id === to.id) continue
    if (hasRoute(from.lat, from.lng, to.lat, to.lng)) {
      skipped++
      continue
    }

    const path = dijkstra(from.lat, from.lng, to.lat, to.lng)
    if (!path) {
      console.warn(`  ✗ ingen väg: ${from.name} → ${to.name}`)
      failed++
      continue
    }

    const distKm = Math.round(pathKm(path) * 10) / 10

    newRoutes.push({
      id: `${from.id}_to_${to.id}`,
      from: { name: from.name, lat: from.lat, lng: from.lng },
      to:   { name: to.name,   lat: to.lat,   lng: to.lng   },
      validated: true,  // waypoints är per definition på vatten
      distanceKm: distKm,
      waypoints: path.map(p => [p[0], p[1]]),
    })
    generated++

    // Markera även reverse-riktningen som täckt (adderas explicit nedan)
    // for the pair (to→from) we add separately in next iteration
  }
}

// ── Slå ihop + skriv ut ────────────────────────────────────────────────────
const merged = {
  routes: [...existing.routes, ...newRoutes],
}

writeFileSync(jsonPath, JSON.stringify(merged, null, 2), 'utf-8')

console.log(`\n✅ Klart!`)
console.log(`   Befintliga rutter: ${existing.routes.length}`)
console.log(`   Genererade nya:    ${generated}`)
console.log(`   Hoppade över:      ${skipped} (redan finns)`)
console.log(`   Misslyckades:      ${failed}`)
console.log(`   Totalt i JSON:     ${merged.routes.length}`)

/**
 * seaPathfinder.ts — Dijkstra-baserad sjöleds-navigation
 *
 * Hittar den kortaste vägen längs sjölederna mellan två godtyckliga lat/lng-koordinater.
 * Utgång:
 * 1. Snap start/end till närmaste havet-waypoint (haversine)
 * 2. Kör Dijkstra mellan waypoints
 * 3. Returnera [[startLat, startLng], ...waypoints, [endLat, endLng]]
 *
 * Om ingen väg finns fallback till rät linje med warning.
 */

import { SEA_WAYPOINTS, SEA_EDGES, buildSeaGraph, buildWaypointMap, SeaWaypoint } from './seaWaypoints'

const DEG_TO_RAD = Math.PI / 180
const EARTH_R_KM = 6371

/**
 * Haversine-distans mellan två lat/lng, i km
 */
function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => deg * DEG_TO_RAD
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_R_KM * Math.asin(Math.sqrt(a))
}

/**
 * Hitta närmaste waypoint till en godtycklig lat/lng.
 */
function findNearestWaypoint(lat: number, lng: number): SeaWaypoint {
  if (SEA_WAYPOINTS.length === 0) {
    throw new Error('Inga waypoints definierade')
  }
  
  let nearestWp: SeaWaypoint = SEA_WAYPOINTS[0]!
  let minDist = haversineKm(lat, lng, nearestWp.lat, nearestWp.lng)

  for (const wp of SEA_WAYPOINTS) {
    const dist = haversineKm(lat, lng, wp.lat, wp.lng)
    if (dist < minDist) {
      minDist = dist
      nearestWp = wp
    }
  }

  return nearestWp
}

/**
 * Dijkstra — hittar kortaste vägen mellan två waypoint-IDn
 * Returnerar array av waypoint-IDs (eller tom array om ingen väg)
 */
function dijkstra(startId: string, endId: string): string[] {
  const graph = buildSeaGraph()
  const waypointMap = buildWaypointMap()

  // Initialisera distances
  const distances = new Map<string, number>()
  const previous = new Map<string, string | null>()
  const unvisited = new Set<string>()

  for (const wp of SEA_WAYPOINTS) {
    distances.set(wp.id, Infinity)
    previous.set(wp.id, null)
    unvisited.add(wp.id)
  }

  distances.set(startId, 0)

  while (unvisited.size > 0) {
    // Hitta obesökt nod med minsta distans
    let currentId: string | null = null
    let minDist = Infinity

    for (const id of unvisited) {
      const d = distances.get(id) || Infinity
      if (d < minDist) {
        minDist = d
        currentId = id
      }
    }

    if (currentId === null || minDist === Infinity) break
    if (currentId === endId) break

    unvisited.delete(currentId)

    const neighbors = graph.get(currentId) || []
    const currentDist = distances.get(currentId) || Infinity

    for (const neighborId of neighbors) {
      if (!unvisited.has(neighborId)) continue

      const neighbor = waypointMap.get(neighborId)
      if (!neighbor) continue

      const current = waypointMap.get(currentId)
      if (!current) continue

      const edgeDist = haversineKm(current.lat, current.lng, neighbor.lat, neighbor.lng)
      const newDist = currentDist + edgeDist

      const neighborDist = distances.get(neighborId) || Infinity
      if (newDist < neighborDist) {
        distances.set(neighborId, newDist)
        previous.set(neighborId, currentId)
      }
    }
  }

  // Rekonstruera vägen
  const path: string[] = []
  let current: string | null = endId

  while (current !== null) {
    path.unshift(current)
    current = previous.get(current) || null
  }

  // Verifiera att vi hittar vägen
  if (path.length === 0 || path[0] !== startId) {
    return []
  }

  return path
}

/**
 * Huvudfunktion: hittar en sjöleds-path från startpunkt till slutpunkt
 * Returnerar en array av [lat, lng] som följer sjölederna
 */
export function findSeaPath(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> {
  // 1. Hitta närmaste waypoints
  const startWp = findNearestWaypoint(startLat, startLng)
  const endWp = findNearestWaypoint(endLat, endLng)

  // 2. Kör Dijkstra
  const waypointPath = dijkstra(startWp.id, endWp.id)

  // 3. Om ingen väg hittas, fallback till rät linje
  if (waypointPath.length === 0) {
    console.warn(
      `[seaPathfinder] Ingen väg mellan ${startWp.id} och ${endWp.id}, använder rät linje`,
    )
    return [[startLat, startLng], [endLat, endLng]]
  }

  // 4. Konvertera waypoint-IDn till lat/lng
  const waypointMap = buildWaypointMap()
  const result: Array<[number, number]> = [[startLat, startLng]]

  for (const wpId of waypointPath) {
    const wp = waypointMap.get(wpId)
    if (wp) {
      result.push([wp.lat, wp.lng])
    }
  }

  result.push([endLat, endLng])

  return result
}

/**
 * Beräkna total distans längs en path (för planner.ts)
 */
export function calculatePathDistance(path: Array<[number, number]>): number {
  let totalKm = 0
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]!
    const [lat2, lng2] = path[i + 1]!
    totalKm += haversineKm(lat1, lng1, lat2, lng2)
  }
  return totalKm
}

/**
 * Beräkna vinkelrätt avstånd (cross-track) från en punkt till en path
 * (denna kan användas senare för planera-sten-positionen längs vägen)
 */
export function crossTrackDistanceToPath(
  pointLat: number,
  pointLng: number,
  path: Array<[number, number]>,
): { distKm: number; tAlongPath: number } {
  let minDist = Infinity
  let minT = 0
  let totalLengthBefore = 0
  let totalPathLength = 0

  // Först räkna total väglängd
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]!
    const [lat2, lng2] = path[i + 1]!
    totalPathLength += haversineKm(lat1, lng1, lat2, lng2)
  }

  // Sedan hitta närmaste punkt på vägen
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]!
    const [lat2, lng2] = path[i + 1]!

    // Enkel projektion (använd samma ekvidistanta approximation som planner.ts)
    const scale = Math.cos(((lat1 + lat2) / 2) * DEG_TO_RAD)
    const ax = lng1 * scale,
      ay = lat1
    const bx = lng2 * scale,
      by = lat2
    const px = pointLng * scale,
      py = pointLat

    const dx = bx - ax,
      dy = by - ay
    const lenSq = dx * dx + dy * dy

    let t = 0
    if (lenSq > 0) {
      t = ((px - ax) * dx + (py - ay) * dy) / lenSq
      t = Math.max(0, Math.min(1, t))
    }

    const closestX = ax + t * dx
    const closestY = ay + t * dy

    const dLat = (py - closestY) * (Math.PI / 180) * EARTH_R_KM
    const dLng = (px - closestX) * (Math.PI / 180) * EARTH_R_KM
    const segDist = Math.sqrt(dLat * dLat + dLng * dLng)

    if (segDist < minDist) {
      minDist = segDist
      const segmentLength = haversineKm(lat1, lng1, lat2, lng2)
      minT = (totalLengthBefore + t * segmentLength) / totalPathLength
    }

    totalLengthBefore += haversineKm(lat1, lng1, lat2, lng2)
  }

  return { distKm: minDist, tAlongPath: minT }
}

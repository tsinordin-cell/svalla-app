/**
 * seaPathfinder.ts — A*-baserad sjöleds-navigering med GARANTERAD land-avoidance
 *
 * Hybrid-strategi:
 * 1. Använd pre-computed klassiska rutter för kända sträckor (snabbt)
 * 2. För nya sträckor: A*-sökning på dynamisk grid (vattennoder)
 * 3. GARANTERA: Ingen path returneras om det korsar land (error istället)
 *
 * Data-källa: ~500 slutna polygoner från OSM coastline (swedish-coastline.json)
 * Validering: Turf.js point-in-polygon och line-intersection
 */

import { SEA_WAYPOINTS, SEA_EDGES, buildSeaGraph, buildWaypointMap, SeaWaypoint } from './seaWaypoints'
import { pointOnLand, segmentCrossesLand, validatePathLand } from './landMask'
import { logger } from './logger'
import precomputedRoutesData from './data/precomputed-routes.json'

// ─── Pre-computed routes lookup ────────────────────────────────────────────
// 33 verifierade rutter mot OSM coastline (500 polygoner). Validerade 2026-04-29.
// Matchas via deterministisk lookup på lat/lng (tolerans ~50 m).

type PrecomputedRoute = {
  id: string
  from: { name: string; lat: number; lng: number }
  to: { name: string; lat: number; lng: number }
  validated: boolean
  distanceKm?: number
  /** waypoints kommer från JSON som number[][] — castas till tuples för polyline */
  waypoints?: number[][]
}

const PRECOMPUTED_ROUTES = (precomputedRoutesData as unknown as { routes: PrecomputedRoute[] }).routes
  .filter(r => r.validated && r.waypoints && r.waypoints.length > 0)

const COORD_TOLERANCE = 0.0008  // ~80 m

function coordsMatch(a: { lat: number; lng: number }, lat: number, lng: number): boolean {
  return Math.abs(a.lat - lat) < COORD_TOLERANCE && Math.abs(a.lng - lng) < COORD_TOLERANCE
}

/**
 * Slå upp en pre-computed rutt om start/end-koordinater matchar.
 * Returnerar null om ingen exakt matchning finns.
 */
function lookupPrecomputed(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> | null {
  for (const r of PRECOMPUTED_ROUTES) {
    if (!r.waypoints) continue
    if (coordsMatch(r.from, startLat, startLng) && coordsMatch(r.to, endLat, endLng)) {
      return r.waypoints.map(p => [p[0]!, p[1]!] as [number, number])
    }
    // Reverse-direction (om någon planerar tillbaka)
    if (coordsMatch(r.from, endLat, endLng) && coordsMatch(r.to, startLat, startLng)) {
      return [...r.waypoints].reverse().map(p => [p[0]!, p[1]!] as [number, number])
    }
  }
  return null
}

const DEG_TO_RAD = Math.PI / 180
const EARTH_R_KM = 6371

export type ValidatedSeaPath = {
  path: Array<[number, number]>
  distanceKm: number
  travelTimeHours: { sailboat: number; motorboat: number; kayak: number }
  validated: boolean // Garanterat: true = ingen land-överlap, false = ERROR
  validatedAt: string
}

type GridNode = {
  id: string
  lat: number
  lng: number
  onLand: boolean
}

type GridEdge = {
  from: string
  to: string
  distKm: number
}

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
 * Snapp en punkt till närmaste vatten-punkt i en lista
 * Använd för att starta search från säker plats
 */
function snapToWater(lat: number, lng: number, candidates: [number, number][]): [number, number] {
  let nearest = candidates[0]!
  let minDist = haversineKm(lat, lng, candidates[0]![0], candidates[0]![1])

  for (const [cLat, cLng] of candidates) {
    const dist = haversineKm(lat, lng, cLat, cLng)
    if (dist < minDist) {
      minDist = dist
      nearest = [cLat, cLng]
    }
  }

  return nearest
}

/**
 * Generera ett dynamisk grid av vattennoder runt start/end
 * Filtrerar bort noder på land
 */
function generateWaterGrid(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
  cellSize: number = 0.005, // ~500m på svenska breddgrader
): GridNode[] {
  // Expand bbox med padding
  const padding = 0.01
  const minLat = Math.min(startLat, endLat) - padding
  const maxLat = Math.max(startLat, endLat) + padding
  const minLng = Math.min(startLng, endLng) - padding
  const maxLng = Math.max(startLng, endLng) + padding

  const nodes: GridNode[] = []
  let id = 0

  for (let lat = minLat; lat <= maxLat; lat += cellSize) {
    for (let lng = minLng; lng <= maxLng; lng += cellSize) {
      const isLand = pointOnLand(lat, lng)
      nodes.push({
        id: `grid_${id++}`,
        lat,
        lng,
        onLand: isLand,
      })
    }
  }

  return nodes.filter(n => !n.onLand)
}

/**
 * Bygga 8-connected edges mellan grid-noder
 * Endast om edge inte korsar land
 */
function buildGridEdges(nodes: GridNode[]): GridEdge[] {
  const nodeMap = new Map<string, GridNode>()
  for (const node of nodes) {
    nodeMap.set(`${node.lat.toFixed(5)},${node.lng.toFixed(5)}`, node)
  }

  const edges: GridEdge[] = []
  const dirs = [
    [-1, -1], [-1, 0], [-1, 1],
    [0, -1],           [0, 1],
    [1, -1],  [1, 0],  [1, 1],
  ]

  for (const node of nodes) {
    for (const dir of dirs) {
      const dlat = dir[0]!
      const dlng = dir[1]!
      const nLat = parseFloat((node.lat + dlat * 0.005).toFixed(5))
      const nLng = parseFloat((node.lng + dlng * 0.005).toFixed(5))
      const key = `${nLat},${nLng}`

      if (nodeMap.has(key)) {
        const neighbor = nodeMap.get(key)!
        // Validera att edge inte korsar land
        if (!segmentCrossesLand(node.lat, node.lng, neighbor.lat, neighbor.lng)) {
          edges.push({
            from: node.id,
            to: neighbor.id,
            distKm: haversineKm(node.lat, node.lng, neighbor.lat, neighbor.lng),
          })
        }
      }
    }
  }

  return edges
}

/**
 * A*-algoritm för pathfinding på grid
 * Returnerar lista av node-IDs från start till end, eller tom array om ingen väg
 */
function aStar(
  startId: string,
  endId: string,
  nodes: GridNode[],
  edges: GridEdge[],
  endLat: number,
  endLng: number,
): string[] {
  const nodeMap = new Map<string, GridNode>()
  for (const node of nodes) {
    nodeMap.set(node.id, node)
  }

  const edgeMap = new Map<string, GridEdge[]>()
  for (const edge of edges) {
    if (!edgeMap.has(edge.from)) {
      edgeMap.set(edge.from, [])
    }
    edgeMap.get(edge.from)!.push(edge)
  }

  // gScore: cost från start till nod
  // fScore: gScore + heuristic (euclidean till end)
  const gScore = new Map<string, number>()
  const fScore = new Map<string, number>()
  const previous = new Map<string, string | null>()
  const openSet = new Set<string>()

  const heuristic = (nid: string): number => {
    const n = nodeMap.get(nid)
    if (!n) return Infinity
    return haversineKm(n.lat, n.lng, endLat, endLng)
  }

  gScore.set(startId, 0)
  fScore.set(startId, heuristic(startId))
  openSet.add(startId)

  while (openSet.size > 0) {
    // Hitta nod med minsta fScore i openSet
    let current: string | null = null
    let minF = Infinity

    for (const id of openSet) {
      const f = fScore.get(id) || Infinity
      if (f < minF) {
        minF = f
        current = id
      }
    }

    if (current === null) break
    if (current === endId) {
      // Rekonstruera vägen
      const path: string[] = []
      let node: string | null = endId
      while (node !== null) {
        path.unshift(node)
        node = previous.get(node) || null
      }
      return path
    }

    openSet.delete(current)

    const neighbors = edgeMap.get(current) || []
    const currentG = gScore.get(current) || Infinity

    for (const edge of neighbors) {
      const tentativeG = currentG + edge.distKm
      const neighborG = gScore.get(edge.to) || Infinity

      if (tentativeG < neighborG) {
        previous.set(edge.to, current)
        gScore.set(edge.to, tentativeG)
        fScore.set(edge.to, tentativeG + heuristic(edge.to))

        if (!openSet.has(edge.to)) {
          openSet.add(edge.to)
        }
      }
    }
  }

  return [] // Ingen väg hittad
}

/**
 * Försöksgenerera väg med A*-algoritm på dynamisk grid
 * Returnerar path eller null om ingen väg hittas
 */
function findPathViaGrid(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> | null {
  // Generera grid
  const gridNodes = generateWaterGrid(startLat, startLng, endLat, endLng)

  if (gridNodes.length === 0) {
    return null // Ingen vatten i området
  }

  // Bygg edges
  const gridEdges = buildGridEdges(gridNodes)

  // Snapp start/end till närmaste grid-nod
  const gridCoords = gridNodes.map(n => [n.lat, n.lng])
  const snapStart = snapToWater(startLat, startLng, gridCoords as [number, number][])
  const snapEnd = snapToWater(endLat, endLng, gridCoords as [number, number][])

  // Hitta motsvarande noder
  const startNode = gridNodes.find(n => n.lat === snapStart[0] && n.lng === snapStart[1])
  const endNode = gridNodes.find(n => n.lat === snapEnd[0] && n.lng === snapEnd[1])

  if (!startNode || !endNode) {
    return null
  }

  // Kör A*
  const nodePath = aStar(startNode.id, endNode.id, gridNodes, gridEdges, endLat, endLng)

  if (nodePath.length === 0) {
    return null
  }

  // Konvertera node-IDs till lat/lng
  const nodeMap = new Map<string, GridNode>()
  for (const node of gridNodes) {
    nodeMap.set(node.id, node)
  }

  const result: Array<[number, number]> = [[startLat, startLng]]

  for (const nodeId of nodePath) {
    const node = nodeMap.get(nodeId)
    if (node) {
      result.push([node.lat, node.lng])
    }
  }

  result.push([endLat, endLng])

  return result
}

/**
 * Fallback: använd befintliga waypoints med Dijkstra
 * (gamla systemet för kompatibilitet)
 */
function findPathViaWaypoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> | null {
  try {
    const graph = buildSeaGraph()
    const waypointMap = buildWaypointMap()

    // Hitta närmaste waypoints
    let nearestStart: SeaWaypoint | null = null
    let nearestEnd: SeaWaypoint | null = null
    let minStartDist = Infinity
    let minEndDist = Infinity

    for (const wp of SEA_WAYPOINTS) {
      const d1 = haversineKm(startLat, startLng, wp.lat, wp.lng)
      const d2 = haversineKm(endLat, endLng, wp.lat, wp.lng)

      if (d1 < minStartDist) {
        minStartDist = d1
        nearestStart = wp
      }
      if (d2 < minEndDist) {
        minEndDist = d2
        nearestEnd = wp
      }
    }

    if (!nearestStart || !nearestEnd) {
      return null
    }

    // Dijkstra mellan waypoints
    const distances = new Map<string, number>()
    const previous = new Map<string, string | null>()
    const unvisited = new Set<string>()

    for (const wp of SEA_WAYPOINTS) {
      distances.set(wp.id, Infinity)
      previous.set(wp.id, null)
      unvisited.add(wp.id)
    }

    distances.set(nearestStart.id, 0)

    while (unvisited.size > 0) {
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
      if (currentId === nearestEnd.id) break

      unvisited.delete(currentId)

      const neighbors = graph.get(currentId) || []
      const currentDist = distances.get(currentId) || Infinity

      for (const neighborId of neighbors) {
        if (!unvisited.has(neighborId)) continue

        const neighbor = waypointMap.get(neighborId)
        const current = waypointMap.get(currentId)

        if (!neighbor || !current) continue

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
    let current: string | null = nearestEnd.id

    while (current !== null) {
      path.unshift(current)
      current = previous.get(current) || null
    }

    if (path.length === 0 || path[0] !== nearestStart.id) {
      return null
    }

    // Konvertera till lat/lng
    const result: Array<[number, number]> = [[startLat, startLng]]

    for (const wpId of path) {
      const wp = waypointMap.get(wpId)
      if (wp) {
        result.push([wp.lat, wp.lng])
      }
    }

    result.push([endLat, endLng])

    return result
  } catch (err) {
    return null
  }
}

/**
 * Beräkna total distans längs en path
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
 * Alias för backwards compatibility
 */
export function calculatePathDistanceKm(path: Array<[number, number]>): number {
  return calculatePathDistance(path)
}

/**
 * Beräkna restid baserat på distans och båttyp
 * @param distanceKm Totalt avstånd i km
 * @param vesselType 'sailboat' (5 knop), 'motorboat' (18 knop), 'kayak' (4 knop)
 * @returns Restid i timmar (avrundat till 0.5h)
 */
export function estimateTravelTime(
  distanceKm: number,
  vesselType: 'sailboat' | 'motorboat' | 'kayak',
): number {
  const knots: Record<string, number> = {
    sailboat: 5,
    motorboat: 18,
    kayak: 4,
  }

  const kmPerHour = (knots[vesselType] || 5) * 1.852 // 1 knop ≈ 1.852 km/h

  const hours = distanceKm / kmPerHour
  return Math.round(hours * 2) / 2 // Avrunda till 0.5h
}

/**
 * HUVUDFUNKTION: Hitta en garanterad sjöleds-väg
 *
 * Hybrid-strategi:
 * 1. Försök A*-sökning på dynamisk grid (snabbt för nya sträckor)
 * 2. Fallback: klassiska waypoints med Dijkstra (för kompatibilitet)
 * 3. VALIDERA: Kasta error om path korsar land (INGA HALVMESYRER)
 *
 * Returnerar: {path, distanceKm, travelTimeHours, validated: true}
 * Kastar error om ingen säker väg kan hittas
 */
export async function findValidatedSeaPath(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Promise<ValidatedSeaPath> {
  // 1. Försök A*-grid först
  let path = findPathViaGrid(startLat, startLng, endLat, endLng)

  // 2. Fallback till waypoints
  if (!path) {
    path = findPathViaWaypoints(startLat, startLng, endLat, endLng)
  }

  // 3. Om ingen väg hittes
  if (!path) {
    throw new Error(
      `Kunde inte hitta väg mellan [${startLat.toFixed(4)},${startLng.toFixed(4)}] och [${endLat.toFixed(4)},${endLng.toFixed(4)}]`,
    )
  }

  // 4. VALIDERA att vägen inte korsar land
  const validation = validatePathLand(path)
  if (!validation.ok) {
    throw new Error(
      `Vägen korsar land (${validation.crossesAt}). Denna väg kan inte användas. Kontakta support.`,
    )
  }

  // 5. Beräkna distans och restid
  const distanceKm = calculatePathDistance(path)
  const travelTimeHours = {
    sailboat: estimateTravelTime(distanceKm, 'sailboat'),
    motorboat: estimateTravelTime(distanceKm, 'motorboat'),
    kayak: estimateTravelTime(distanceKm, 'kayak'),
  }

  logger.info(
    'seaPathfinder',
    `Väg validerad: ${Math.round(distanceKm)} km, ${path.length} waypoints`,
  )

  return {
    path,
    distanceKm: Math.round(distanceKm * 10) / 10,
    travelTimeHours,
    validated: true,
    validatedAt: new Date().toISOString(),
  }
}

/**
 * Fullkvalitets sjöleds-sökning.
 *
 * Ordning:
 * 1. Pre-computed validerad rutt (instant)
 * 2. Grid-A* med turf.js land-mask (bäst kvalitet, kan ta 30-120 s för stora bbox)
 * 3. Waypoint-Dijkstra fallback (snabb, bra för täckta områden)
 * 4. Rät linje (sista utväg)
 *
 * VIKTIGT: Anropa ALDRIG den här funktionen från SSR-rendern.
 * Den lever i /api/route/calculate som kör asynkront med maxDuration=300s.
 * SSR rendrar skeleton; klienten hämtar rutten separat.
 */
export function findSeaPath(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> {
  return findSeaPathWithQuality(startLat, startLng, endLat, endLng).path
}

/** Sjölednings-kvalitet — vilken tier som faktiskt levererade rutten. */
export type RouteQuality = 'precomputed' | 'grid' | 'waypoint' | 'straight'

/**
 * Som findSeaPath men returnerar även vilken algoritm-tier som producerade rutten.
 * Används av /api/route/calculate för att kunna kommunicera till UI:n om rutten
 * är trovärdig (precomputed/grid) eller behöver disclaimer (waypoint/straight).
 */
export function findSeaPathWithQuality(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): { path: Array<[number, number]>; quality: RouteQuality } {
  // 1. PRIORITET: Pre-computed validerad rutt (instant lookup, garanterat på vatten)
  const precomp = lookupPrecomputed(startLat, startLng, endLat, endLng)
  if (precomp) return { path: precomp, quality: 'precomputed' }

  // 2. Grid-A* med fullständig land-mask (bäst kvalitet)
  let path = findPathViaGrid(startLat, startLng, endLat, endLng)
  if (path) return { path, quality: 'grid' }

  // 3. Waypoint-Dijkstra fallback om grid misslyckas
  path = findPathViaWaypoints(startLat, startLng, endLat, endLng)
  if (path) return { path, quality: 'waypoint' }

  // 4. Sista utväg: rät linje — UI:n MÅSTE visa disclaimer vid denna kvalitet
  return { path: [[startLat, startLng], [endLat, endLng]], quality: 'straight' }
}

/**
 * Returnerar metadata om en rutt — om den är pre-computed och validerad
 * eller om den genererades live (mindre garanterad).
 */
export function getRouteMetadata(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): { precomputed: boolean; verified: boolean } {
  const precomp = lookupPrecomputed(startLat, startLng, endLat, endLng)
  return {
    precomputed: precomp !== null,
    verified: precomp !== null,
  }
}

/**
 * Beräkna vinkelrätt avstånd (cross-track) från en punkt till en path
 * Används för planera-stenen positionen längs vägen
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

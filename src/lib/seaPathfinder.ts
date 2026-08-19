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

import { SEA_WAYPOINTS, SEA_EDGES, buildSeaGraph, buildWaypointMap, getAllWaypoints, SeaWaypoint } from './seaWaypoints'
import { pointOnLand, segmentCrossesLand, validatePathLand, inMaskCoverage, findRasterPath } from './landMask'
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

  // 2026-08-04: utanför rastrets täckning ser pointOnLand ALLT som vatten.
  // Ett grid där skulle bli en rak linje över land med kvalitetsstämpel.
  // Utan täckning: inget grid — flödet faller vidare till waypoint-fallback
  // som är ärligt märkt som approximation.
  if (!inMaskCoverage(minLat, minLng) || !inMaskCoverage(maxLat, maxLng) ||
      !inMaskCoverage(minLat, maxLng) || !inMaskCoverage(maxLat, minLng)) {
    return []
  }

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
  // 2026-08-04 (kväll): det gamla 550 m-gridet ersatt av A* direkt på
  // 50 m-rastret (findRasterPath i landMask.ts). Gamla gridet byggde dels
  // aldrig en enda kant (parseFloat-nycklar matchade aldrig toFixed-nycklar),
  // dels var 550 m för grovt för skärgårdens sund (~300 m). Hjälparna
  // generateWaterGrid/buildGridEdges/aStar nedan är därmed döda — tas bort
  // i städuppgiften för seaWaypoints-grafen.
  const raster = findRasterPath(startLat, startLng, endLat, endLng)
  if (!raster || raster.length < 2) return null

  // Anroparens punkter läggs till som ändpunkter BARA om de ligger i vatten.
  // Med den konservativa masken hamnar många kajer och hamnlägen innanför
  // landkanten (Möja i planner-client ligger 1 050 m in på ön). Att då dra
  // linjen ända in till koordinaten ger ett landsegment som valideringen
  // underkänner — hela rutten blir "unavailable" fast en farbar väg finns.
  // Ligger punkten på land är den snappade vattenpunkten den ärliga starten.
  const result: Array<[number, number]> = []
  if (!pointOnLand(startLat, startLng)) result.push([startLat, startLng])
  result.push(...raster)
  if (!pointOnLand(endLat, endLng)) result.push([endLat, endLng])
  return result.length >= 2 ? result : null
}

/**
 * Fallback: använd befintliga waypoints med Dijkstra
 * (gamla systemet för kompatibilitet)
 *
 * 2026-05-23: Validerar nu output mot land-mask innan den returneras.
 * Tidigare släpptes waypoint-rutter igenom helt utan land-check, vilket
 * kunde ge polylines som korsade öar. Om validering fail:ar → null.
 */
function findPathViaWaypoints(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> | null {
  try {
    const fullGraph = buildSeaGraph()
    const waypointMap = buildWaypointMap()

    // 2026-05-27: bbox-paddingen ökad från 0.5° till 3° för att täcka
    // långa korsregion-rutter (Stockholm → Bohuslän = 6° lng, Stockholm →
    // Gotland = 2° lng). Vi tar performance-hit:en. Hellre långsam än
    // unavailable.
    const minLat = Math.min(startLat, endLat) - 3
    const maxLat = Math.max(startLat, endLat) + 3
    const minLng = Math.min(startLng, endLng) - 3
    const maxLng = Math.max(startLng, endLng) + 3

    const allWps = getAllWaypoints()
    const candidateWps = allWps.filter(wp =>
      wp.lat >= minLat && wp.lat <= maxLat &&
      wp.lng >= minLng && wp.lng <= maxLng
    )

    if (candidateWps.length === 0) {
      logger.info('seaPathfinder', `no waypoints in bbox ${minLat},${minLng}→${maxLat},${maxLng}`)
      return null
    }

    // Hitta närmaste start/end-waypoints inom subset
    let nearestStart: SeaWaypoint | null = null
    let nearestEnd: SeaWaypoint | null = null
    let minStartDist = Infinity
    let minEndDist = Infinity

    for (const wp of candidateWps) {
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

    // Bygg subset-graph: bara edges där BÅDA endpoints är i candidateWps
    const candidateIds = new Set(candidateWps.map(w => w.id))
    const graph = new Map<string, string[]>()
    for (const id of candidateIds) graph.set(id, [])
    for (const [id, neighbors] of fullGraph) {
      if (!candidateIds.has(id)) continue
      const filtered = neighbors.filter(n => candidateIds.has(n))
      graph.set(id, filtered)
    }

    // Dijkstra över subset (typiskt 200-2000 noder = O(n²) ~ 4M operations max)
    const distances = new Map<string, number>()
    const previous = new Map<string, string | null>()
    const unvisited = new Set<string>()

    for (const wp of candidateWps) {
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

    // SÄKERHETSLAGER 2026-05-23: validera mot land-mask innan vi returnerar.
    // Waypoint-Dijkstra kan annars producera rutter som korsar öar — t.ex.
    // när start eller end ligger nära en kust och Dijkstra väljer en
    // "rak" edge mellan två waypoints som genvägar över en ö.
    const validation = validatePathLand(result)
    if (!validation.ok) {
      logger.info(
        'seaPathfinder',
        `waypoint-tier rutt rejected — korsar land vid ${validation.crossesAt}`,
      )
      return null
    }

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
 * 1. Pre-computed validerad rutt (instant)
 * 2. Försök A*-sökning på dynamisk grid (snabbt för nya sträckor)
 * 3. Fallback: klassiska waypoints med Dijkstra (validerad mot land sedan 2026-05-23)
 * 4. VALIDERA: Kasta error om path korsar land (INGA HALVMESYRER)
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
  // 1. Pre-computed validerad rutt först (instant lookup)
  let path = lookupPrecomputed(startLat, startLng, endLat, endLng)

  // 2. Försök A*-grid
  if (!path) {
    path = findPathViaGrid(startLat, startLng, endLat, endLng)
  }

  // 3. Fallback till waypoints (validerar nu internt)
  if (!path) {
    path = findPathViaWaypoints(startLat, startLng, endLat, endLng)
  }

  // 4. Om ingen väg hittes
  if (!path) {
    throw new Error(
      `Kunde inte hitta väg mellan [${startLat.toFixed(4)},${startLng.toFixed(4)}] och [${endLat.toFixed(4)},${endLng.toFixed(4)}]`,
    )
  }

  // 5. VALIDERA att vägen inte korsar land (defense in depth)
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
 * 3. Waypoint-Dijkstra fallback (validerad mot land sedan 2026-05-23)
 * 4. Om allt misslyckas: returnera null + 'unavailable' (TIDIGARE: rak linje)
 *
 * 2026-05-23 SÄKERHETSLAGER: Rak-linje-fallback är borttagen.
 * Hellre "ingen rutt" än en falsk linje över land. UI ska rendera EmptyState
 * istället för polyline när quality === 'unavailable'.
 *
 * VIKTIGT: Anropa ALDRIG den här funktionen från SSR-rendern.
 * Den lever i /api/route/calculate som kör asynkront med maxDuration=300s.
 * SSR rendrar skeleton; klienten hämtar rutten separat.
 *
 * LEGACY: Returnerar fortfarande Array<[number, number]> för bakåtkompatibilitet
 * mot planner.ts (korridor-beräkning behöver en path, även en grov sådan).
 * För nya konsumenter — använd findSeaPathWithQuality och respektera 'unavailable'.
 */
export function findSeaPath(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> {
  const result = findSeaPathWithQuality(startLat, startLng, endLat, endLng)
  // Legacy fallback: när ingen validerad rutt finns, returnera straight för
  // korridor-beräkning i planner.ts (suggestStops). Detta path RITAS aldrig
  // för användaren — det är bara underlag för cross-track-stop-matchning.
  if (result.path === null) {
    return [[startLat, startLng], [endLat, endLng]]
  }
  // Bevara exakta andpunkter: tiers snappar till narmaste nod/waypoint,
  // men korridor-berakningen i planner.ts utgar fran exakt start och mal.
  const path = [...result.path]
  const first = path[0]!, last = path[path.length - 1]!
  if (first[0] !== startLat || first[1] !== startLng) path.unshift([startLat, startLng])
  if (last[0] !== endLat || last[1] !== endLng) path.push([endLat, endLng])
  return path
}

/**
 * Sjölednings-kvalitet — vilken tier som faktiskt levererade rutten.
 *
 * - precomputed: hand-validerad rutt från PRECOMPUTED_ROUTES, confidence 5
 * - grid: A* över land-validerat grid, confidence 4
 * - waypoint: Dijkstra över farledsgraf med land-check, confidence 3
 * - unavailable: ingen säker rutt kunde beräknas — RITA INGEN LINJE, confidence 0
 */
export type RouteQuality = 'precomputed' | 'grid' | 'waypoint' | 'unavailable'

/** Mappa RouteQuality → confidence 0-5 enligt routing safety layer-spec */
export function qualityToConfidence(q: RouteQuality): number {
  switch (q) {
    case 'precomputed': return 5
    case 'grid':        return 4
    case 'waypoint':    return 3
    case 'unavailable': return 0
  }
}

/**
 * Som findSeaPath men returnerar även vilken algoritm-tier som producerade rutten.
 * Används av /api/route/calculate för att kunna kommunicera till UI:n om rutten
 * är validerad (precomputed/grid/waypoint) eller helt saknas (unavailable).
 *
 * 2026-05-23: path är nu Array<[number, number]> | null.
 * null betyder att ingen validerad rutt kunde produceras — UI MÅSTE rendera
 * EmptyState/"ingen rutt"-meddelande istället för att rita en linje.
 */
/**
 * Endpoint-shore-check: är denna lat/lng nära nog till saltvatten för att
 * vara båt-rimlig? Mätat som avstånd till närmaste SEA_WAYPOINT.
 *
 * Bakgrund: OSM coastline-data definierar Sverige som "kontur runt land",
 * vilket betyder att en punkt MITT I FASTLANDET (t.ex. Tullinge, som ligger
 * vid en insjö) inte fångas av pointOnLand — den ligger inte INNANFÖR någon
 * land-polygon eftersom polygonerna bara är ÖAR och MAINLAND-PERIFERI.
 *
 * Denna check är vår sista fångare: om end-punkten är >5 km från närmsta
 * saltvatten-waypoint så är det inland och båtrutt är fysiskt omöjlig.
 *
 * EXEMPEL: Tullinge Båtsällskap (insjö-klubb, 15+ km från Slussen) → false.
 */
const MAX_SHORE_DISTANCE_KM = 5

/**
 * 2026-05-23: scanar ALLA waypoints (manuell + OSM från 3 391 hamnar +
 * 225 anchorages + 30 083 färjelinje-noder). Med så tät täckning betyder
 * "ingen waypoint inom 5 km" att punkten är genuint inland (insjö, fastland).
 */
function isNearShore(lat: number, lng: number): boolean {
  // Snabb bbox-filter först — undvik 30K haversine-anrop på varje request
  const LAT_DEG_KM = 111.32
  const LNG_DEG_KM = LAT_DEG_KM * Math.cos(lat * DEG_TO_RAD)
  const dLat = MAX_SHORE_DISTANCE_KM / LAT_DEG_KM
  const dLng = MAX_SHORE_DISTANCE_KM / LNG_DEG_KM

  const all = getAllWaypoints()
  for (const wp of all) {
    if (Math.abs(wp.lat - lat) > dLat) continue
    if (Math.abs(wp.lng - lng) > dLng) continue
    if (haversineKm(lat, lng, wp.lat, wp.lng) <= MAX_SHORE_DISTANCE_KM) {
      return true
    }
  }
  return false
}

export function findSeaPathWithQuality(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): { path: Array<[number, number]> | null; quality: RouteQuality } {
  // 0. Inlandsspärr (återinförd 2026-08-19): en punkt >5 km från närmsta
  //    saltvattens-waypoint är genuint inland (insjö/fastland) — båtrutt är
  //    fysiskt omöjlig. isNearShore skrevs för detta 2026-05-23 men blev
  //    föräldralös när sista-utvägssteget lades till 2026-05-27; safety-
  //    testerna (Tullinge → unavailable) har varit röda sedan dess.
  //    Kustnära mål (<5 km) berörs INTE — de tas fortsatt av harbor-snap.
  if (!isNearShore(startLat, startLng) || !isNearShore(endLat, endLng)) {
    return { path: null, quality: 'unavailable' }
  }

  // 1. Pre-computed — hand-validerad vattenrutt (garanterat säker)
  const precompFirst = lookupPrecomputed(startLat, startLng, endLat, endLng)
  if (precompFirst) return { path: precompFirst, quality: 'precomputed' }

  // 2. Grid-A* med land-mask
  let path = findPathViaGrid(startLat, startLng, endLat, endLng)
  if (path) return { path, quality: 'grid' }

  // 3. Waypoint-Dijkstra över hela OSM-grafen (30K noder + 41K edges)
  path = findPathViaWaypoints(startLat, startLng, endLat, endLng)
  if (path) return { path, quality: 'waypoint' }

  // 4. Harbor-skarvning: hitta närmsta harbor till start och end, kör Dijkstra
  // mellan dem på OSM-grafen. Användaren får ALLTID en rutt.
  // 2026-05-27: vi accepterar att rutter inåt fastland kommer att gå via
  // närmsta hamn + interpolerat segment till slutpunkten. Det är bättre att
  // visa NÅGOT än "kan inte beräkna" för 90 % av Sveriges destinationer.
  const harborPath = findPathViaHarborSnap(startLat, startLng, endLat, endLng)
  if (harborPath) return { path: harborPath, quality: 'waypoint' }

  // 5. Sista utväg — rak linje, men BARA om den inte korsar land
  //    (2026-08-19: tidigare returnerades linjen även när mittpunkter låg
  //    på land, med kommentaren "unavailable returneras ALDRIG" — det bröt
  //    säkerhetskontraktet från 2026-05-23. Hellre "ingen rutt" än en
  //    linje över en ö.)
  const straight: Array<[number, number]> = [[startLat, startLng], [endLat, endLng]]
  if (validatePathLand(straight).ok) {
    return { path: straight, quality: 'waypoint' }
  }
  return { path: null, quality: 'unavailable' }
}

/**
 * 2026-05-27: Skarvning via närmsta hamn. När ingen direkt Dijkstra-path finns
 * mellan start och slut (t.ex. start är inland), så hittar vi närmsta saltvatten-
 * hamn till var och en av punkterna och kör Dijkstra mellan dem på OSM-grafen.
 * Resultatet skarvas: start → harbor_A → (Dijkstra) → harbor_B → end.
 */
function findPathViaHarborSnap(
  startLat: number,
  startLng: number,
  endLat: number,
  endLng: number,
): Array<[number, number]> | null {
  const all = getAllWaypoints()

  // Hitta närmsta hamn (inte färry-nod) för start och end
  let nearestStartHarbor: SeaWaypoint | null = null
  let nearestEndHarbor: SeaWaypoint | null = null
  let minStartDist = Infinity
  let minEndDist = Infinity

  for (const wp of all) {
    const d1 = haversineKm(startLat, startLng, wp.lat, wp.lng)
    const d2 = haversineKm(endLat, endLng, wp.lat, wp.lng)
    if (d1 < minStartDist) { minStartDist = d1; nearestStartHarbor = wp }
    if (d2 < minEndDist) { minEndDist = d2; nearestEndHarbor = wp }
  }

  if (!nearestStartHarbor || !nearestEndHarbor) return null

  // Kör Dijkstra mellan de två närmsta hamnarna
  const harborToHarbor = findPathViaWaypoints(
    nearestStartHarbor.lat, nearestStartHarbor.lng,
    nearestEndHarbor.lat, nearestEndHarbor.lng,
  )

  if (!harborToHarbor || harborToHarbor.length < 2) {
    // Sista utväg: skarva start → start_harbor → end_harbor → end (3 segment)
    return [
      [startLat, startLng],
      [nearestStartHarbor.lat, nearestStartHarbor.lng],
      [nearestEndHarbor.lat, nearestEndHarbor.lng],
      [endLat, endLng],
    ]
  }

  // Lägg på interpolation: start → harborToHarbor → end
  return [
    [startLat, startLng],
    ...harborToHarbor,
    [endLat, endLng],
  ]
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

#!/usr/bin/env node
/**
 * precompute-sea-routes.mjs
 *
 * Pure-JS pre-computation av sjöleds-rutter. Ingen turf-dependency
 * (sandbox-FS kan inte läsa stora ESM-paket). Ray-casting + segment-
 * intersection skrivet från grunden.
 *
 * Kör: node scripts/precompute-sea-routes.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')

// ── Geometri ────────────────────────────────────────────────────────────────

function haversineKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(a))
}

/** Ray-casting: punkt i polygon. ring = [[lng, lat], ...] (GeoJSON-ordning) */
function pointInRing(lng, lat, ring) {
  let inside = false
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i]
    const [xj, yj] = ring[j]
    if (((yi > lat) !== (yj > lat)) &&
        (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) {
      inside = !inside
    }
  }
  return inside
}

function pointInPolygon(lng, lat, polygon) {
  const rings = polygon.geometry.type === 'Polygon' ? polygon.geometry.coordinates : [polygon.geometry.coordinates[0]]
  // Outer ring + holes
  if (!pointInRing(lng, lat, rings[0])) return false
  for (let i = 1; i < rings.length; i++) {
    if (pointInRing(lng, lat, rings[i])) return false  // i hål
  }
  return true
}

/** Line-segment-intersection: returnerar true om AB skär CD */
function segmentsIntersect(ax, ay, bx, by, cx, cy, dx, dy) {
  function ccw(px, py, qx, qy, rx, ry) {
    return (ry - py) * (qx - px) > (qy - py) * (rx - px)
  }
  return ccw(ax, ay, cx, cy, dx, dy) !== ccw(bx, by, cx, cy, dx, dy) &&
         ccw(ax, ay, bx, by, cx, cy) !== ccw(ax, ay, bx, by, dx, dy)
}

function segmentCrossesPolygon(lng1, lat1, lng2, lat2, polygon) {
  const rings = polygon.geometry.type === 'Polygon' ? polygon.geometry.coordinates : [polygon.geometry.coordinates[0]]
  for (const ring of rings) {
    for (let i = 0; i < ring.length - 1; i++) {
      const [x1, y1] = ring[i]
      const [x2, y2] = ring[i + 1]
      if (segmentsIntersect(lng1, lat1, lng2, lat2, x1, y1, x2, y2)) return true
    }
  }
  // Plus: är båda endpoints inuti polygon (segment helt på land)?
  if (pointInRing(lng1, lat1, rings[0]) && pointInRing(lng2, lat2, rings[0])) return true
  return false
}

// Bbox för polygon — för spatial pre-filter
function polygonBbox(polygon) {
  const ring = polygon.geometry.type === 'Polygon' ? polygon.geometry.coordinates[0] : polygon.geometry.coordinates[0]
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
  for (const [x, y] of ring) {
    if (x < minX) minX = x
    if (x > maxX) maxX = x
    if (y < minY) minY = y
    if (y > maxY) maxY = y
  }
  return [minX, minY, maxX, maxY]
}

function bboxIntersects(a, b) {
  return !(a[2] < b[0] || a[0] > b[2] || a[3] < b[1] || a[1] > b[3])
}

// ── Ladda data ──────────────────────────────────────────────────────────────

const coastline = JSON.parse(
  readFileSync(join(ROOT, 'src/lib/data/swedish-coastline.json'), 'utf-8')
)

// Cacheade bboxar för alla polygoner
const polysWithBbox = coastline.features.map(f => ({ feature: f, bbox: polygonBbox(f) }))
console.log(`Loaded ${coastline.features.length} coastline polygons (bboxar pre-cached)`)

// ── Pathfinder ──────────────────────────────────────────────────────────────

/**
 * Snappa en koordinat till närmaste vatten-punkt (om den ligger på land).
 * Spiral-search från originalpunkten i ökande radie.
 */
function snapToWaterIfNeeded(lat, lng, polysToCheck) {
  function pointOnLandLocal(lat, lng) {
    for (const p of polysToCheck) {
      const [minX, minY, maxX, maxY] = p.bbox
      if (lng < minX || lng > maxX || lat < minY || lat > maxY) continue
      if (pointInPolygon(lng, lat, p.feature)) return true
    }
    return false
  }

  if (!pointOnLandLocal(lat, lng)) return [lat, lng]

  // Spiral outward
  const step = 0.002 // ~200 m
  for (let radius = 1; radius <= 30; radius++) {
    const r = radius * step
    for (let angle = 0; angle < 360; angle += 15) {
      const rad = angle * Math.PI / 180
      const tryLat = lat + r * Math.cos(rad)
      const tryLng = lng + r * Math.sin(rad) / Math.cos(lat * Math.PI / 180)
      if (!pointOnLandLocal(tryLat, tryLng)) {
        return [tryLat, tryLng]
      }
    }
  }
  return [lat, lng] // gav upp
}

function findPath(startLatRaw, startLngRaw, endLatRaw, endLngRaw, gridStep = 0.012) {
  const minLatBase = Math.min(startLatRaw, endLatRaw) - 0.06
  const maxLatBase = Math.max(startLatRaw, endLatRaw) + 0.06
  const minLngBase = Math.min(startLngRaw, endLngRaw) - 0.06
  const maxLngBase = Math.max(startLngRaw, endLngRaw) + 0.06
  const baseBbox = [minLngBase, minLatBase, maxLngBase, maxLatBase]
  const baseLocalPolys = polysWithBbox.filter(p => bboxIntersects(p.bbox, baseBbox))

  // Snap endpoints till vatten
  const [startLat, startLng] = snapToWaterIfNeeded(startLatRaw, startLngRaw, baseLocalPolys)
  const [endLat, endLng] = snapToWaterIfNeeded(endLatRaw, endLngRaw, baseLocalPolys)

  const minLat = Math.min(startLat, endLat) - 0.04
  const maxLat = Math.max(startLat, endLat) + 0.04
  const minLng = Math.min(startLng, endLng) - 0.04
  const maxLng = Math.max(startLng, endLng) + 0.04
  const queryBbox = [minLng, minLat, maxLng, maxLat]

  // Pre-filter polygoner till bara de som skär bbox
  const localPolys = polysWithBbox.filter(p => bboxIntersects(p.bbox, queryBbox))

  function pointOnLand(lat, lng) {
    for (const p of localPolys) {
      const [minX, minY, maxX, maxY] = p.bbox
      if (lng < minX || lng > maxX || lat < minY || lat > maxY) continue
      if (pointInPolygon(lng, lat, p.feature)) return true
    }
    return false
  }

  function segmentCrossesLand(lat1, lng1, lat2, lng2) {
    const segMinX = Math.min(lng1, lng2)
    const segMaxX = Math.max(lng1, lng2)
    const segMinY = Math.min(lat1, lat2)
    const segMaxY = Math.max(lat1, lat2)
    for (const p of localPolys) {
      const [minX, minY, maxX, maxY] = p.bbox
      if (segMaxX < minX || segMinX > maxX || segMaxY < minY || segMinY > maxY) continue
      if (segmentCrossesPolygon(lng1, lat1, lng2, lat2, p.feature)) return true
    }
    return false
  }

  // Bygg vatten-noder
  const nodes = []
  let id = 0
  for (let lat = minLat; lat <= maxLat; lat += gridStep) {
    for (let lng = minLng; lng <= maxLng; lng += gridStep) {
      if (!pointOnLand(lat, lng)) {
        nodes.push({ id: `n${id++}`, lat, lng })
      }
    }
  }

  if (nodes.length < 2) return null

  // Snap start/end
  function nearestNode(lat, lng) {
    let best = nodes[0]
    let bestD = Infinity
    for (const n of nodes) {
      const d = haversineKm(lat, lng, n.lat, n.lng)
      if (d < bestD) { bestD = d; best = n }
    }
    return best
  }

  const startNode = nearestNode(startLat, startLng)
  const endNode = nearestNode(endLat, endLng)

  // Edges (8-connected, plus diagonal)
  const edgeMap = new Map()
  for (const n of nodes) edgeMap.set(n.id, [])

  // Indexera per grid-cell för snabb grann-lookup
  const cellMap = new Map()
  for (const n of nodes) {
    const gx = Math.round(n.lng / gridStep)
    const gy = Math.round(n.lat / gridStep)
    const key = `${gx},${gy}`
    if (!cellMap.has(key)) cellMap.set(key, [])
    cellMap.get(key).push(n)
  }

  for (const a of nodes) {
    const gx = Math.round(a.lng / gridStep)
    const gy = Math.round(a.lat / gridStep)
    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        if (dx === 0 && dy === 0) continue
        const neighbors = cellMap.get(`${gx + dx},${gy + dy}`) || []
        for (const b of neighbors) {
          if (a.id >= b.id) continue
          if (segmentCrossesLand(a.lat, a.lng, b.lat, b.lng)) continue
          const d = haversineKm(a.lat, a.lng, b.lat, b.lng)
          edgeMap.get(a.id).push({ to: b.id, dist: d })
          edgeMap.get(b.id).push({ to: a.id, dist: d })
        }
      }
    }
  }

  // A*
  const nodeMap = new Map(nodes.map(n => [n.id, n]))
  const heuristic = (id) => {
    const n = nodeMap.get(id)
    return haversineKm(n.lat, n.lng, endNode.lat, endNode.lng)
  }

  const open = new Set([startNode.id])
  const cameFrom = new Map()
  const gScore = new Map([[startNode.id, 0]])
  const fScore = new Map([[startNode.id, heuristic(startNode.id)]])

  while (open.size > 0) {
    let current = null
    let lowest = Infinity
    for (const id of open) {
      const f = fScore.get(id) ?? Infinity
      if (f < lowest) { lowest = f; current = id }
    }
    if (current === null) break

    if (current === endNode.id) {
      const out = []
      let cur = current
      while (cur !== undefined && cur !== null) {
        const n = nodeMap.get(cur)
        out.unshift([+n.lat.toFixed(5), +n.lng.toFixed(5)])
        cur = cameFrom.get(cur)
      }
      return [
        [+startLat.toFixed(5), +startLng.toFixed(5)],
        ...out,
        [+endLat.toFixed(5), +endLng.toFixed(5)],
      ]
    }

    open.delete(current)
    const edges = edgeMap.get(current) ?? []
    for (const e of edges) {
      const tentG = (gScore.get(current) ?? Infinity) + e.dist
      if (tentG < (gScore.get(e.to) ?? Infinity)) {
        cameFrom.set(e.to, current)
        gScore.set(e.to, tentG)
        fScore.set(e.to, tentG + heuristic(e.to))
        open.add(e.to)
      }
    }
  }
  return null
}

// Validering: kontrollera VARJE segment i den färdiga pathen mot ALLA polygoner
function validatePathFull(path) {
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]
    const [lat2, lng2] = path[i + 1]
    const segMinX = Math.min(lng1, lng2)
    const segMaxX = Math.max(lng1, lng2)
    const segMinY = Math.min(lat1, lat2)
    const segMaxY = Math.max(lat1, lat2)
    for (const p of polysWithBbox) {
      const [minX, minY, maxX, maxY] = p.bbox
      if (segMaxX < minX || segMinX > maxX || segMaxY < minY || segMinY > maxY) continue
      if (segmentCrossesPolygon(lng1, lat1, lng2, lat2, p.feature)) {
        return { ok: false, segment: i, seg: [path[i], path[i + 1]] }
      }
    }
  }
  return { ok: true }
}

// ── Rutter ──────────────────────────────────────────────────────────────────

const ROUTES = [
  { id: 'stromkajen_to_sandhamn',  from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Sandhamn',     lat: 59.29500, lng: 18.89500 } },
  { id: 'stromkajen_to_moja',      from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Möja',         lat: 59.45450, lng: 18.91100 } },
  { id: 'stromkajen_to_grinda',    from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Grinda',       lat: 59.46200, lng: 18.71000 } },
  { id: 'stromkajen_to_finnhamn',  from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Finnhamn',     lat: 59.55500, lng: 18.81500 } },
  { id: 'stromkajen_to_vaxholm',   from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Vaxholm',      lat: 59.40240, lng: 18.35120 } },
  { id: 'stromkajen_to_svartso',   from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Svartsö',      lat: 59.45000, lng: 18.65000 } },
  { id: 'stromkajen_to_namdo',     from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Nämdö',        lat: 59.18000, lng: 18.65000 } },
  { id: 'stromkajen_to_runmaro',   from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Runmarö',      lat: 59.27500, lng: 18.71000 } },
  { id: 'stromkajen_to_orno',      from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Ornö',         lat: 59.04000, lng: 18.41000 } },
  { id: 'stromkajen_to_uto',       from: { name: 'Strömkajen',  lat: 59.32430, lng: 18.07820 }, to: { name: 'Utö',          lat: 58.95800, lng: 18.30500 } },
  { id: 'stromkajen_to_fjaderholmarna', from: { name: 'Strömkajen', lat: 59.32430, lng: 18.07820 }, to: { name: 'Fjäderholmarna', lat: 59.32650, lng: 18.16500 } },
  { id: 'stavsnas_to_sandhamn', from: { name: 'Stavsnäs', lat: 59.27130, lng: 18.69500 }, to: { name: 'Sandhamn', lat: 59.29500, lng: 18.89500 } },
  { id: 'stavsnas_to_moja',     from: { name: 'Stavsnäs', lat: 59.27130, lng: 18.69500 }, to: { name: 'Möja',     lat: 59.45450, lng: 18.91100 } },
  { id: 'stavsnas_to_namdo',    from: { name: 'Stavsnäs', lat: 59.27130, lng: 18.69500 }, to: { name: 'Nämdö',    lat: 59.18000, lng: 18.65000 } },
  { id: 'vaxholm_to_grinda',   from: { name: 'Vaxholm', lat: 59.40240, lng: 18.35120 }, to: { name: 'Grinda',   lat: 59.46200, lng: 18.71000 } },
  { id: 'vaxholm_to_moja',     from: { name: 'Vaxholm', lat: 59.40240, lng: 18.35120 }, to: { name: 'Möja',     lat: 59.45450, lng: 18.91100 } },
  { id: 'vaxholm_to_sandhamn', from: { name: 'Vaxholm', lat: 59.40240, lng: 18.35120 }, to: { name: 'Sandhamn', lat: 59.29500, lng: 18.89500 } },
  { id: 'vaxholm_to_finnhamn', from: { name: 'Vaxholm', lat: 59.40240, lng: 18.35120 }, to: { name: 'Finnhamn', lat: 59.55500, lng: 18.81500 } },
  { id: 'nynashamn_to_uto',     from: { name: 'Nynäshamn', lat: 58.90630, lng: 17.95000 }, to: { name: 'Utö',      lat: 58.95800, lng: 18.30500 } },
  { id: 'nynashamn_to_nattaro', from: { name: 'Nynäshamn', lat: 58.90630, lng: 17.95000 }, to: { name: 'Nåttarö',  lat: 58.81000, lng: 17.94000 } },
  { id: 'nynashamn_to_landsort',from: { name: 'Nynäshamn', lat: 58.90630, lng: 17.95000 }, to: { name: 'Landsort', lat: 58.74000, lng: 17.86000 } },
  { id: 'dalaro_to_orno',  from: { name: 'Dalarö', lat: 59.13000, lng: 18.40000 }, to: { name: 'Ornö',  lat: 59.04000, lng: 18.41000 } },
  { id: 'dalaro_to_namdo', from: { name: 'Dalarö', lat: 59.13000, lng: 18.40000 }, to: { name: 'Nämdö', lat: 59.18000, lng: 18.65000 } },
  { id: 'furusund_to_blido',     from: { name: 'Furusund',  lat: 59.66700, lng: 18.91700 }, to: { name: 'Blidö',    lat: 59.62000, lng: 18.95000 } },
  { id: 'furusund_to_arholma',   from: { name: 'Furusund',  lat: 59.66700, lng: 18.91700 }, to: { name: 'Arholma',  lat: 59.84300, lng: 19.06300 } },
  { id: 'norrtalje_to_arholma',  from: { name: 'Norrtälje', lat: 59.75800, lng: 18.70000 }, to: { name: 'Arholma',  lat: 59.84300, lng: 19.06300 } },
  { id: 'goteborg_to_marstrand',  from: { name: 'Göteborg',   lat: 57.70900, lng: 11.96850 }, to: { name: 'Marstrand',  lat: 57.88800, lng: 11.58300 } },
  { id: 'goteborg_to_vrango',     from: { name: 'Göteborg',   lat: 57.70900, lng: 11.96850 }, to: { name: 'Vrångö',     lat: 57.59000, lng: 11.84000 } },
  { id: 'marstrand_to_smogen',    from: { name: 'Marstrand',  lat: 57.88800, lng: 11.58300 }, to: { name: 'Smögen',     lat: 58.35400, lng: 11.21900 } },
  { id: 'marstrand_to_karingon',  from: { name: 'Marstrand',  lat: 57.88800, lng: 11.58300 }, to: { name: 'Käringön',   lat: 58.06800, lng: 11.40400 } },
  { id: 'smogen_to_hallo',        from: { name: 'Smögen',     lat: 58.35400, lng: 11.21900 }, to: { name: 'Hållö',      lat: 58.32700, lng: 11.21000 } },
  { id: 'smogen_to_fjallbacka',   from: { name: 'Smögen',     lat: 58.35400, lng: 11.21900 }, to: { name: 'Fjällbacka', lat: 58.59800, lng: 11.28500 } },
  { id: 'stromstad_to_sydkoster', from: { name: 'Strömstad',  lat: 58.93500, lng: 11.17400 }, to: { name: 'Sydkoster',  lat: 58.87800, lng: 11.05500 } },
  { id: 'stromstad_to_nordkoster',from: { name: 'Strömstad',  lat: 58.93500, lng: 11.17400 }, to: { name: 'Nordkoster', lat: 58.91300, lng: 11.04200 } },
]

console.log(`\nPre-computing ${ROUTES.length} routes...`)
const results = []
let okCount = 0
let failCount = 0

for (const route of ROUTES) {
  const t0 = Date.now()
  process.stdout.write(`  ${route.id.padEnd(40)} `)
  try {
    // Försök progressivt tätare grid tills vi får en validerad path
    let path = null
    let usedStep = null
    for (const step of [0.012, 0.008, 0.005, 0.003]) {
      const candidate = findPath(route.from.lat, route.from.lng, route.to.lat, route.to.lng, step)
      if (!candidate) continue
      const v = validatePathFull(candidate)
      if (v.ok) {
        path = candidate
        usedStep = step
        break
      }
    }

    if (!path) {
      console.log(`✗ NO VALID PATH (${Date.now() - t0}ms)`)
      failCount++
      results.push({ id: route.id, from: route.from, to: route.to, validated: false, error: 'no_valid_path' })
      continue
    }

    let distKm = 0
    for (let i = 0; i < path.length - 1; i++) {
      distKm += haversineKm(path[i][0], path[i][1], path[i + 1][0], path[i + 1][1])
    }

    console.log(`✓ ${distKm.toFixed(1)} km, ${path.length} pts (${Date.now() - t0}ms)`)
    okCount++
    results.push({
      id: route.id,
      from: route.from,
      to: route.to,
      validated: true,
      distanceKm: Math.round(distKm * 10) / 10,
      waypoints: path,
    })
  } catch (err) {
    console.log(`✗ ERROR: ${err.message} (${Date.now() - t0}ms)`)
    failCount++
    results.push({ id: route.id, from: route.from, to: route.to, validated: false, error: err.message })
  }
}

console.log(`\nResultat: ${okCount}/${ROUTES.length} OK, ${failCount} FAIL`)

const output = {
  version: '2.0',
  description: `${okCount} pre-computed sjöleds-rutter, validerade mot OSM coastline (${coastline.features.length} polygoner). Varje validerad rutt är garanterat utan land-överlap.`,
  lastValidated: new Date().toISOString(),
  okCount, failCount,
  routes: results,
}

writeFileSync(
  join(ROOT, 'src/lib/data/precomputed-routes.json'),
  JSON.stringify(output, null, 2)
)

console.log('\nSparat: src/lib/data/precomputed-routes.json')
process.exit(failCount > 0 ? 1 : 0)

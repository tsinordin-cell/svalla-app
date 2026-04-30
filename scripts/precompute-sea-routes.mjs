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

// Toms exakta DEPARTURES-koordinater (från src/lib/planner.ts) — sanning för Stockholm
const P = {
  // Stockholm / Innerskärgård
  stromkajen:    { name: 'Strömkajen',    lat: 59.3238, lng: 18.0776 },
  nacka_strand:  { name: 'Nacka Strand',  lat: 59.3195, lng: 18.1454 },
  fjaderholmarna:{ name: 'Fjäderholmarna',lat: 59.3265, lng: 18.1650 },
  gustavsberg:   { name: 'Gustavsberg',   lat: 59.3283, lng: 18.3820 },
  vaxholm:       { name: 'Vaxholm',       lat: 59.4024, lng: 18.3512 },
  ljustero:      { name: 'Ljusterö',      lat: 59.5540, lng: 18.6870 },
  grinda:        { name: 'Grinda',        lat: 59.4602, lng: 18.7167 },
  svartso:       { name: 'Svartsö',       lat: 59.4730, lng: 18.7250 },
  finnhamn:      { name: 'Finnhamn',      lat: 59.5430, lng: 18.8240 },
  // Mellan
  ingaro:        { name: 'Ingarö',        lat: 59.2472, lng: 18.5861 },
  stavsnas:      { name: 'Stavsnäs',      lat: 59.1895, lng: 18.6823 },
  husaro:        { name: 'Husarö',        lat: 59.5195, lng: 18.9840 },
  moja:          { name: 'Möja',          lat: 59.4545, lng: 18.9110 },
  sandhamn:      { name: 'Sandhamn',      lat: 59.2820, lng: 18.9130 },
  runmaro:       { name: 'Runmarö',       lat: 59.2750, lng: 18.7100 },
  namdo:         { name: 'Nämdö',         lat: 59.1800, lng: 18.6500 },
  bullero:       { name: 'Bullerö',       lat: 59.2120, lng: 18.8420 },
  // Södra
  dalaro:        { name: 'Dalarö',        lat: 59.1298, lng: 18.4003 },
  orno:          { name: 'Ornö',          lat: 58.9773, lng: 18.4550 },
  nattaro:       { name: 'Nåttarö',       lat: 58.8455, lng: 17.8742 },
  uto:           { name: 'Utö',           lat: 58.9590, lng: 18.3017 },
  nynashamn:     { name: 'Nynäshamn',     lat: 58.9038, lng: 17.9475 },
  landsort:      { name: 'Landsort',      lat: 58.7440, lng: 17.8640 },
  huvudskar:     { name: 'Huvudskär',     lat: 58.9580, lng: 18.6870 },
  // Norra
  sollenkroka:   { name: 'Sollenkroka',   lat: 59.7050, lng: 18.8090 },
  norrtalje:     { name: 'Norrtälje',     lat: 59.7579, lng: 18.7077 },
  furusund:      { name: 'Furusund',      lat: 59.6653, lng: 18.9217 },
  blido:         { name: 'Blidö',         lat: 59.6200, lng: 18.8700 },
  rodloga:       { name: 'Rödlöga',       lat: 59.8180, lng: 19.0650 },
  kapellskar:    { name: 'Kapellskär',    lat: 59.7245, lng: 19.0740 },
  arholma:       { name: 'Arholma',       lat: 59.8532, lng: 19.1345 },
  // Bohuslän — Göteborgs skärgård (södra)
  goteborg:      { name: 'Göteborg',      lat: 57.7090, lng: 11.9685 },
  hono:          { name: 'Hönö',          lat: 57.6800, lng: 11.6650 },
  ockero:        { name: 'Öckerö',        lat: 57.7100, lng: 11.6480 },
  vrango:        { name: 'Vrångö',        lat: 57.5900, lng: 11.8400 },
  brando:        { name: 'Brännö',        lat: 57.6420, lng: 11.7460 },
  styrso:        { name: 'Styrsö',        lat: 57.6300, lng: 11.7800 },
  donso:         { name: 'Donsö',         lat: 57.6260, lng: 11.7860 },
  // Bohuslän — mellan + norra
  marstrand:     { name: 'Marstrand',     lat: 57.8880, lng: 11.5830 },
  kladesholmen:  { name: 'Klädesholmen',  lat: 58.0530, lng: 11.6640 },
  skarhamn:      { name: 'Skärhamn',      lat: 58.0270, lng: 11.5530 },
  mollosund:     { name: 'Mollösund',     lat: 58.0660, lng: 11.4960 },
  haron:         { name: 'Härön',         lat: 58.1200, lng: 11.5180 },
  karingon:      { name: 'Käringön',      lat: 58.0680, lng: 11.4040 },
  lysekil:       { name: 'Lysekil',       lat: 58.2740, lng: 11.4360 },
  smogen:        { name: 'Smögen',        lat: 58.3540, lng: 11.2190 },
  hallo:         { name: 'Hållö',         lat: 58.3270, lng: 11.2100 },
  hamburgsund:   { name: 'Hamburgsund',   lat: 58.5200, lng: 11.2790 },
  fjallbacka:    { name: 'Fjällbacka',    lat: 58.5980, lng: 11.2850 },
  grebbestad:    { name: 'Grebbestad',    lat: 58.6960, lng: 11.2480 },
  reso:          { name: 'Resö',          lat: 58.7770, lng: 11.1880 },
  stromstad:     { name: 'Strömstad',     lat: 58.9350, lng: 11.1740 },
  sydkoster:     { name: 'Sydkoster',     lat: 58.8780, lng: 11.0550 },
  nordkoster:    { name: 'Nordkoster',    lat: 58.9130, lng: 11.0420 },
}

function R(fromKey, toKey) {
  return { id: `${fromKey}_to_${toKey}`, from: P[fromKey], to: P[toKey] }
}

/**
 * Manuella farleds-waypoints för rutter där A*-grid fail:ar
 * pga snäva sund eller polygonöverlapp. Pathen valideras
 * fortfarande mot land-mask innan den accepteras.
 *
 * Detta är NORMAL praxis i navigeringssystem — auto-routing
 * + handcurerade overrides för komplicerade farleder.
 */
const MANUAL_OVERRIDES = {
  // Dalarö → Ornö: söder genom Dalaröströmmen, ut på Mysingen, förbi Aspö-västsida
  dalaro_to_orno: {
    from: P.dalaro,
    to: P.orno,
    waypoints: [
      [59.1298, 18.4003], // Dalarö
      [59.1100, 18.4250], // Dalaröströmmen söder
      [59.0850, 18.4500], // Mysingen norra
      [59.0550, 18.4700], // Aspö-väster
      [59.0150, 18.4650], // Ornö-norra inlopp
      [58.9773, 18.4550], // Ornö
    ],
  },
  // Sollenkroka → Finnhamn: glesa anchors i bred vatten — A* fyller i
  sollenkroka_to_finnhamn: {
    from: P.sollenkroka,
    to: P.finnhamn,
    waypoints: [
      [59.7050, 18.8090], // Sollenkroka (snappas till vatten)
      [59.6800, 18.8800], // Möjafjärden norra (öppen vatten)
      [59.6300, 18.9100], // Öster om Möja (öppen vatten)
      [59.5800, 18.8800], // Söder om Möja-Finnhamn-passagen
      [59.5430, 18.8240], // Finnhamn
    ],
  },
  // Vrångö → Brännö: norrut genom Donsö-Asperö-sundet (täta waypoints)
  vrango_to_brando: {
    from: P.vrango,
    to: P.brando,
    waypoints: [
      [57.5970, 11.8460], // Vrångö hamninlopp (östra)
      [57.6020, 11.8350], // Norrut
      [57.6080, 11.8200], // Donsö-syd öst
      [57.6140, 11.8050], // Donsö-mitt
      [57.6200, 11.7900], // Donsö-norr
      [57.6260, 11.7800], // Asperö-sund syd
      [57.6320, 11.7700], // Asperö-sund mitten
      [57.6370, 11.7600], // Brännö-syd öst
      [57.6420, 11.7530], // Brännö hamn östra
    ],
  },
}

const ROUTES = [
  // ── Strömkajen / Stockholm ut (12) ──
  R('stromkajen', 'fjaderholmarna'),
  R('stromkajen', 'vaxholm'),
  R('stromkajen', 'grinda'),
  R('stromkajen', 'svartso'),
  R('stromkajen', 'finnhamn'),
  R('stromkajen', 'sandhamn'),
  R('stromkajen', 'moja'),
  R('stromkajen', 'runmaro'),
  R('stromkajen', 'namdo'),
  R('stromkajen', 'orno'),
  R('stromkajen', 'uto'),
  R('stromkajen', 'husaro'),

  // ── Vaxholm hub (8) ──
  R('vaxholm', 'grinda'),
  R('vaxholm', 'svartso'),
  R('vaxholm', 'moja'),
  R('vaxholm', 'sandhamn'),
  R('vaxholm', 'finnhamn'),
  R('vaxholm', 'husaro'),
  R('vaxholm', 'ljustero'),
  R('vaxholm', 'ingaro'),

  // ── Mellanskärgård parvis (10) ──
  R('grinda', 'finnhamn'),
  R('grinda', 'svartso'),
  R('grinda', 'moja'),
  R('grinda', 'husaro'),
  R('moja', 'finnhamn'),
  R('moja', 'svartso'),
  R('moja', 'husaro'),
  R('moja', 'sandhamn'),
  R('finnhamn', 'husaro'),
  R('runmaro', 'sandhamn'),

  // ── Stavsnäs ut (5) ──
  R('stavsnas', 'sandhamn'),
  R('stavsnas', 'moja'),
  R('stavsnas', 'namdo'),
  R('stavsnas', 'runmaro'),
  R('stavsnas', 'bullero'),

  // ── Ingarö ut (4) ──
  R('ingaro', 'sandhamn'),
  R('ingaro', 'grinda'),
  R('ingaro', 'moja'),
  R('ingaro', 'bullero'),

  // ── Sollenkroka / Ljusterö (3) ──
  R('sollenkroka', 'moja'),
  R('sollenkroka', 'finnhamn'),
  R('ljustero', 'finnhamn'),

  // ── Södra (10) ──
  R('nynashamn', 'uto'),
  R('nynashamn', 'nattaro'),
  R('nynashamn', 'landsort'),
  R('nynashamn', 'orno'),
  R('dalaro', 'orno'),
  R('dalaro', 'namdo'),
  R('dalaro', 'uto'),
  R('uto', 'orno'),
  R('orno', 'namdo'),
  R('namdo', 'runmaro'),

  // ── Norra (8) ──
  R('furusund', 'blido'),
  R('furusund', 'arholma'),
  R('furusund', 'rodloga'),
  R('blido', 'arholma'),
  R('norrtalje', 'arholma'),
  R('norrtalje', 'furusund'),
  R('arholma', 'rodloga'),
  R('kapellskar', 'arholma'),

  // ── Bohuslän — Göteborgs skärgård (8) ──
  R('goteborg', 'marstrand'),
  R('goteborg', 'vrango'),
  R('goteborg', 'styrso'),
  R('goteborg', 'brando'),
  R('goteborg', 'donso'),
  R('goteborg', 'hono'),
  R('hono', 'ockero'),
  R('vrango', 'brando'),

  // ── Bohuslän — Marstrand-axeln (6) ──
  R('marstrand', 'kladesholmen'),
  R('marstrand', 'skarhamn'),
  R('marstrand', 'karingon'),
  R('marstrand', 'mollosund'),
  R('marstrand', 'smogen'),
  R('marstrand', 'hono'),

  // ── Bohuslän — Tjörn/Orust (6) ──
  R('kladesholmen', 'skarhamn'),
  R('skarhamn', 'mollosund'),
  R('mollosund', 'karingon'),
  R('mollosund', 'haron'),
  R('haron', 'karingon'),
  R('lysekil', 'karingon'),

  // ── Bohuslän — Smögen/Norra (8) ──
  R('smogen', 'hallo'),
  R('smogen', 'karingon'),
  R('smogen', 'hamburgsund'),
  R('smogen', 'fjallbacka'),
  R('lysekil', 'smogen'),
  R('hamburgsund', 'fjallbacka'),
  R('fjallbacka', 'grebbestad'),
  R('grebbestad', 'reso'),

  // ── Bohuslän — Strömstad/Koster (5) ──
  R('reso', 'stromstad'),
  R('grebbestad', 'stromstad'),
  R('stromstad', 'sydkoster'),
  R('stromstad', 'nordkoster'),
  R('sydkoster', 'nordkoster'),
]

console.log(`\nPre-computing ${ROUTES.length} routes...`)
const results = []
let okCount = 0
let failCount = 0

for (const route of ROUTES) {
  const t0 = Date.now()
  process.stdout.write(`  ${route.id.padEnd(40)} `)
  try {
    let path = null

    // 1. Manuell override för svåra rutter
    const manual = MANUAL_OVERRIDES[route.id]
    if (manual && manual.waypoints) {
      // Strategi A: Direkt manual waypoints (om tätt nog att inga segment korsar land)
      const directWp = manual.waypoints.map(p => [p[0], p[1]])
      const directV = validatePathFull(directWp)
      if (directV.ok) {
        path = directWp
      } else {
        // Strategi B: A* mellan varje par av manuella waypoints
        const segments = []
        let allOk = true
        for (let i = 0; i < manual.waypoints.length - 1; i++) {
          const [lat1, lng1] = manual.waypoints[i]
          const [lat2, lng2] = manual.waypoints[i + 1]
          let micro = null
          for (const step of [0.005, 0.003, 0.002, 0.0015]) {
            const candidate = findPath(lat1, lng1, lat2, lng2, step)
            if (!candidate) continue
            const v = validatePathFull(candidate)
            if (v.ok) { micro = candidate; break }
          }
          if (!micro) {
            // Sista utväg: rät linje (men bara om det INTE korsar land)
            const straightV = validatePathFull([[lat1, lng1], [lat2, lng2]])
            if (straightV.ok) {
              micro = [[lat1, lng1], [lat2, lng2]]
            } else {
              console.log(`  (manual override ${route.id}: leg ${i} kan inte länkas)`)
              allOk = false
              break
            }
          }
          if (segments.length === 0) {
            segments.push(...micro)
          } else {
            segments.push(...micro.slice(1))
          }
        }
        if (allOk && segments.length > 0) {
          const v = validatePathFull(segments)
          if (v.ok) {
            path = segments
          } else {
            console.log(`  (manual override ${route.id} ihopslagen path korsar land seg ${v.segment})`)
          }
        }
      }
    }

    // 2. Auto-A* med progressivt tätare grid
    if (!path) {
      for (const step of [0.012, 0.008, 0.005, 0.003]) {
        const candidate = findPath(route.from.lat, route.from.lng, route.to.lat, route.to.lng, step)
        if (!candidate) continue
        const v = validatePathFull(candidate)
        if (v.ok) {
          path = candidate
          break
        }
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

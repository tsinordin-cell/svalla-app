#!/usr/bin/env node
/**
 * add-proximity-edges.mjs — lägg till proximity-edges till befintlig OSM-edge-graph
 *
 * Problem: harbors/anchorages (3 616 noder) har INGA edges till sig — bara
 * ferry-noderna har edges sinsemellan. Dijkstra-snap till en harbor → ingen
 * path → unavailable för alla riktiga destinationer.
 *
 * Fix: för varje icke-ferry-waypoint (harbor/anchorage), anslut till de
 * 5 närmsta waypointsen inom 8 km. Detta kopplar hamn-nätet till ferry-nätet
 * och skapar en sammanhängande graf.
 *
 * Körning: node scripts/add-proximity-edges.mjs
 */

import { readFileSync, writeFileSync } from 'node:fs'

const IN_WAYPOINTS  = 'src/lib/data/osm-waypoints.json'
const IN_EDGES      = 'src/lib/data/osm-edges.json'
const OUT_EDGES     = 'src/lib/data/osm-edges.json'

const PROXIMITY_RADIUS_KM = 8
const MAX_NEIGHBORS = 5

const waypoints = JSON.parse(readFileSync(IN_WAYPOINTS, 'utf-8')).waypoints
const edgesData = JSON.parse(readFileSync(IN_EDGES, 'utf-8'))
const existingEdges = edgesData.edges

console.log(`Loaded: ${waypoints.length} waypoints, ${existingEdges.length} existing edges`)

// Räkna source-fördelning
const sources = {}
for (const w of waypoints) sources[w.source] = (sources[w.source] || 0) + 1
console.log('Source-fördelning:', sources)

function haversine(a, b) {
  const r = Math.PI / 180
  const dLat = (b.lat - a.lat) * r
  const dLng = (b.lng - a.lng) * r
  const h = Math.sin(dLat/2)**2 + Math.cos(a.lat*r)*Math.cos(b.lat*r)*Math.sin(dLng/2)**2
  return 2 * 6371 * Math.asin(Math.sqrt(h))
}

// Bucket per ~0.1° (≈ 11 km) för O(n) snabbsök
console.log('Bygger spatial bucket-index...')
const buckets = new Map()
function bkey(lat, lng) { return `${Math.floor(lat*10)}_${Math.floor(lng*10)}` }
for (const wp of waypoints) {
  const k = bkey(wp.lat, wp.lng)
  if (!buckets.has(k)) buckets.set(k, [])
  buckets.get(k).push(wp)
}
console.log(`  → ${buckets.size} buckets`)

// Bygg edge-set från existerande för dedupe
const existingEdgeKeys = new Set()
for (const e of existingEdges) {
  existingEdgeKeys.add(`${e.from}|${e.to}`)
  existingEdgeKeys.add(`${e.to}|${e.from}`)
}

console.log(`Bygger proximity-edges (radius ${PROXIMITY_RADIUS_KM} km, max ${MAX_NEIGHBORS} grannar per nod)...`)

const proximityEdges = []
let processed = 0
const startTime = Date.now()

for (const wp of waypoints) {
  // Vi vill ansluta HARBORS och ANCHORAGES till nätet.
  // Ferry-noder har redan edges (route=ferry).
  if (wp.source === 'ferry') {
    processed++
    continue
  }

  const candidates = []
  const latBucket = Math.floor(wp.lat * 10)
  const lngBucket = Math.floor(wp.lng * 10)

  // Sök i 3x3-grannrutor (innehåller alla punkter inom ~11 km)
  for (let dl = -1; dl <= 1; dl++) {
    for (let dn = -1; dn <= 1; dn++) {
      const b = buckets.get(`${latBucket+dl}_${lngBucket+dn}`)
      if (!b) continue
      for (const other of b) {
        if (other.id === wp.id) continue
        const d = haversine(wp, other)
        if (d <= PROXIMITY_RADIUS_KM) candidates.push({ id: other.id, d })
      }
    }
  }

  candidates.sort((a, b) => a.d - b.d)
  for (const c of candidates.slice(0, MAX_NEIGHBORS)) {
    const key = `${wp.id}|${c.id}`
    if (!existingEdgeKeys.has(key)) {
      proximityEdges.push({ from: wp.id, to: c.id, source: 'proximity' })
      existingEdgeKeys.add(key)
      existingEdgeKeys.add(`${c.id}|${wp.id}`)
    }
  }

  processed++
  if (processed % 5000 === 0) {
    console.log(`  ${processed}/${waypoints.length} (${Math.round(processed/waypoints.length*100)}%) — ${proximityEdges.length} proximity-edges hittills`)
  }
}

const elapsed = ((Date.now() - startTime) / 1000).toFixed(1)
console.log(`\nKlart på ${elapsed}s. ${proximityEdges.length} nya proximity-edges.`)

const allEdges = [...existingEdges, ...proximityEdges]

writeFileSync(OUT_EDGES, JSON.stringify({
  generated_at: new Date().toISOString(),
  source: 'OSM ferry routes + proximity-graph (2026-05-25 retrofit)',
  count: allEdges.length,
  ferry_count: existingEdges.length,
  proximity_count: proximityEdges.length,
  proximity_radius_km: PROXIMITY_RADIUS_KM,
  max_neighbors: MAX_NEIGHBORS,
  edges: allEdges,
}, null, 2))

console.log(`✓ Wrote ${OUT_EDGES}`)
console.log(`Final: ${allEdges.length} edges total (${existingEdges.length} ferry + ${proximityEdges.length} proximity)`)

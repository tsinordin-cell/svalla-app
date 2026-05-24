#!/usr/bin/env node
/**
 * generate-osm-waypoints.mjs — bygg en massiv sea-waypoints-graph från OSM
 *
 * Hämtar från Overpass API:
 *   - alla harbor=* (hamnar)
 *   - alla seamark:type=harbour
 *   - alla seamark:type=anchorage (naturhamnar)
 *   - alla leisure=marina
 *   - alla route=ferry (färjerutter, GIVER OSS VALIDERADE VATTEN-EDGES)
 *
 * Output:
 *   - src/lib/data/osm-waypoints.json — alla waypoints med id/lat/lng/name/source
 *   - src/lib/data/osm-edges.json — alla edges från ferry-routes (validerade vatten)
 *
 * Varje edge från en ferry-route är garanterat vattenfarbar — vi behöver inte
 * land-validera dem. Det är detta som gör skillnaden mot manuellt edited graph.
 *
 * Körning:
 *   node scripts/generate-osm-waypoints.mjs
 *
 * Tar ~2-5 minuter (Overpass-rate-limit).
 */

import { writeFileSync, mkdirSync, existsSync } from 'node:fs'
import { dirname } from 'node:path'

const OUT_WAYPOINTS = 'src/lib/data/osm-waypoints.json'
const OUT_EDGES     = 'src/lib/data/osm-edges.json'

// Sveriges bounding box
const BBOX = '55.0,10.5,69.1,24.2'  // syd,väst,nord,öst

const OVERPASS_URL = 'https://overpass-api.de/api/interpreter'

// ── Overpass-queries ────────────────────────────────────────────────────────

const Q_HARBORS = `
[out:json][timeout:90];
(
  node["harbour"="yes"](${BBOX});
  node["seamark:type"="harbour"](${BBOX});
  node["leisure"="marina"](${BBOX});
  node["amenity"="ferry_terminal"](${BBOX});
);
out body;
`

const Q_ANCHORAGES = `
[out:json][timeout:90];
(
  node["seamark:type"="anchorage"](${BBOX});
  node["natural"="bay"]["anchorage"="yes"](${BBOX});
);
out body;
`

const Q_FERRY_ROUTES = `
[out:json][timeout:180];
(
  way["route"="ferry"](${BBOX});
);
out body;
>;
out skel qt;
`

// ── Fetch helpers ───────────────────────────────────────────────────────────

async function fetchOverpass(query) {
  console.log(`[overpass] querying ${query.length} bytes...`)
  const res = await fetch(OVERPASS_URL, {
    method: 'POST',
    body: 'data=' + encodeURIComponent(query),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept': 'application/json',
      'user-agent': 'Svalla-Routing-Generator/1.0 (https://svalla.se; tsinordin@gmail.com)',
    },
  })
  if (!res.ok) throw new Error(`Overpass ${res.status}: ${await res.text()}`)
  const json = await res.json()
  console.log(`[overpass] got ${json.elements?.length ?? 0} elements`)
  return json
}

function slugify(s) {
  return (s ?? '').toLowerCase()
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, 40)
}

// ── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== OSM SEA WAYPOINTS GENERATOR ===\n')

  // 1. Harbors / marinas / ferry terminals (POINT waypoints)
  const harborsData = await fetchOverpass(Q_HARBORS)
  const harbors = harborsData.elements
    .filter(e => e.type === 'node' && typeof e.lat === 'number')
    .map(e => ({
      id: `osm_${e.id}`,
      lat: e.lat,
      lng: e.lon,
      name: e.tags?.name ?? e.tags?.['name:sv'] ?? `OSM_${e.id}`,
      source: 'harbor',
      tags: {
        harbour: e.tags?.harbour,
        marina:  e.tags?.leisure === 'marina' ? 'yes' : undefined,
        ferry_terminal: e.tags?.amenity === 'ferry_terminal' ? 'yes' : undefined,
      },
    }))
  console.log(`  → ${harbors.length} harbors / marinas / terminals`)

  // 2. Anchorages (naturhamnar)
  const anchData = await fetchOverpass(Q_ANCHORAGES)
  const anchorages = anchData.elements
    .filter(e => e.type === 'node' && typeof e.lat === 'number')
    .map(e => ({
      id: `osm_${e.id}`,
      lat: e.lat,
      lng: e.lon,
      name: e.tags?.name ?? `Anchorage_${e.id}`,
      source: 'anchorage',
      tags: { anchorage: 'yes' },
    }))
  console.log(`  → ${anchorages.length} anchorages`)

  // 3. Ferry routes (waypoints + edges)
  const ferryData = await fetchOverpass(Q_FERRY_ROUTES)
  const ferryNodes = new Map() // node_id → {lat, lng}
  for (const el of ferryData.elements) {
    if (el.type === 'node') {
      ferryNodes.set(el.id, { lat: el.lat, lng: el.lon })
    }
  }
  const ferryWays = ferryData.elements.filter(e => e.type === 'way' && e.tags?.route === 'ferry')

  const ferryWaypoints = []
  const ferryEdges = []

  for (const way of ferryWays) {
    const wayName = way.tags?.name ?? `ferry_${way.id}`
    const nodes = way.nodes ?? []
    let prevId = null
    for (const nid of nodes) {
      const pos = ferryNodes.get(nid)
      if (!pos) continue
      const wpId = `ferry_${nid}`
      ferryWaypoints.push({
        id: wpId,
        lat: pos.lat,
        lng: pos.lng,
        name: `${wayName} pt`,
        source: 'ferry',
        tags: { ferry_route: wayName },
      })
      if (prevId) {
        ferryEdges.push({ from: prevId, to: wpId, source: 'ferry' })
      }
      prevId = wpId
    }
  }
  console.log(`  → ${ferryWaypoints.length} ferry-route nodes, ${ferryEdges.length} ferry-edges`)

  // 4. Dedupe by lat/lng (round to 5 decimals ≈ 1 m)
  const all = [...harbors, ...anchorages, ...ferryWaypoints]
  const seen = new Map() // key → first one
  const deduped = []
  for (const wp of all) {
    const key = `${wp.lat.toFixed(5)},${wp.lng.toFixed(5)}`
    if (!seen.has(key)) {
      seen.set(key, wp.id)
      deduped.push(wp)
    }
  }
  console.log(`\n=== TOTAL: ${deduped.length} unique waypoints (${all.length - deduped.length} duplicates removed) ===`)
  console.log(`=== EDGES: ${ferryEdges.length} ferry-edges (validated water) ===\n`)

  // 5. Write output
  for (const path of [OUT_WAYPOINTS, OUT_EDGES]) {
    const dir = dirname(path)
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  }

  writeFileSync(OUT_WAYPOINTS, JSON.stringify({
    generated_at: new Date().toISOString(),
    source: 'OSM Overpass API',
    bbox: BBOX,
    count: deduped.length,
    waypoints: deduped,
  }, null, 2))
  console.log(`✓ Wrote ${OUT_WAYPOINTS}`)

  writeFileSync(OUT_EDGES, JSON.stringify({
    generated_at: new Date().toISOString(),
    source: 'OSM ferry routes',
    count: ferryEdges.length,
    edges: ferryEdges,
  }, null, 2))
  console.log(`✓ Wrote ${OUT_EDGES}`)

  console.log('\n=== DONE — verifiera output med:')
  console.log(`  head -50 ${OUT_WAYPOINTS}`)
  console.log(`  jq '.waypoints | group_by(.source) | map({source: .[0].source, count: length})' ${OUT_WAYPOINTS}`)
}

main().catch(err => {
  console.error('ERROR:', err)
  process.exit(1)
})

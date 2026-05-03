// OSM POI-import för Svalla.
//
// Användning:
//   node scripts/import-osm-pois.mjs sauna           # dry-run, visar bara vad som hittas
//   node scripts/import-osm-pois.mjs sauna --insert  # faktisk insert i restaurants
//
// Tillgängliga preset: sauna, marina, fuel, beach
// Bbox = Stockholm + Bohuslän skärgård (lat 58.0-60.0, lng 11.0-19.5)
//
// Dedupliceras mot existerande restaurants på namn + 200m radie.

import { config } from 'dotenv'
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_KEY) { console.error('saknar env'); process.exit(1) }

const ARGS = process.argv.slice(2)
const PRESET = ARGS[0]
const INSERT = ARGS.includes('--insert')

// OSM-tagg → Svallas type/tags
const PRESETS = {
  sauna:  { osm: '["leisure"="sauna"]',                     type: 'sauna',         tags: ['bastu', 'sauna'] },
  marina: { osm: '["leisure"="marina"]',                    type: 'marina',        tags: ['hamn', 'marina', 'gästhamn'] },
  fuel:   { osm: '["seamark:type"="small_craft_facility"]', type: 'fuel',          tags: ['bensin', 'sjömack'] },
  beach:  { osm: '["natural"="beach"]',                     type: 'beach',         tags: ['bad', 'badplats', 'strand'] },
  harbour: { osm: '["harbour"="yes"]',                      type: 'harbor',        tags: ['hamn', 'brygga'] },
}

if (!PRESET || !PRESETS[PRESET]) {
  console.error(`Användning: node ${process.argv[1]} <preset> [--insert]`)
  console.error(`Tillgängliga preset: ${Object.keys(PRESETS).join(', ')}`)
  process.exit(1)
}

const cfg = PRESETS[PRESET]
// Tre bboxar för svenska skärgården, undviker Stockholms innerstad:
//   Stockholm skärgård (öst om innerstan)
//   Sydskärgård (Utö/Nynäshamn-området)
//   Bohuslän
const BBOXES = [
  '59.0,18.3,60.2,19.7',  // Stockholm yttre
  '58.6,17.5,59.2,18.6',  // Sydskärgård
  '57.5,11.0,58.9,12.2',  // Bohuslän
]
// Skippa namn som bara är generiska ord — för låg datakvalitet
const GENERIC = new Set(['bastu', 'sauna', 'bastun', 'badet', 'badplats', 'marina', 'hamn'])

// ── 1. Hämta från OSM Overpass (tre bboxar) ────────────────────────────────
console.log(`\nHämtar ${PRESET} från OpenStreetMap (3 bboxar för svenska skärgården)...`)
const allElements = []
for (const bbox of BBOXES) {
  const query = `
[out:json][timeout:60];
(
  node${cfg.osm}(${bbox});
  way${cfg.osm}(${bbox});
  relation${cfg.osm}(${bbox});
);
out center tags;
`
  const r = await fetch('https://overpass-api.de/api/interpreter', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Svalla-POI-import/1.0 (kontakt@svalla.se)',
      'Accept': 'application/json',
    },
    body: 'data=' + encodeURIComponent(query),
  })
  if (!r.ok) {
    const t = await r.text()
    console.error(`Overpass error i bbox ${bbox}: ${r.status}`)
    console.error(t.slice(0, 300))
    continue
  }
  const { elements } = await r.json()
  console.log(`  bbox ${bbox.padEnd(25)} ${elements.length} element`)
  allElements.push(...elements)
}
const elements = allElements
console.log(`  ${elements.length} totalt från OSM`)

// ── 2. Normalisera till Svalla-format ──────────────────────────────────────
const candidates = []
for (const el of elements) {
  const lat = el.lat ?? el.center?.lat
  const lng = el.lon ?? el.center?.lon
  const name = el.tags?.name ?? el.tags?.['name:sv']
  if (!lat || !lng || !name) continue
  // Hoppa över generiska/anonyma namn — för låg datakvalitet
  if (GENERIC.has(name.toLowerCase().trim())) continue

  candidates.push({
    osm_id:   `${el.type}/${el.id}`,
    name:     name,
    latitude: lat,
    longitude: lng,
    type:     cfg.type,
    tags:     cfg.tags,
    description: el.tags?.description ?? null,
    website:  el.tags?.website ?? el.tags?.['contact:website'] ?? null,
  })
}
console.log(`  ${candidates.length} har namn + koordinater`)

// ── 3. Hämta existerande restaurants för dedup ─────────────────────────────
console.log('\nHämtar existerande restaurants för dedup...')
const existingRes = await fetch(`${SUPABASE_URL}/rest/v1/restaurants?select=name,latitude,longitude`, {
  headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
})
const existing = await existingRes.json()
console.log(`  ${existing.length} existerande platser`)

function nearKm(lat1, lng1, lat2, lng2) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
}
function isDup(c) {
  return existing.some(e => {
    if (!e.latitude || !e.longitude) return false
    const sameName = e.name?.toLowerCase() === c.name.toLowerCase()
    const closeBy = nearKm(e.latitude, e.longitude, c.latitude, c.longitude) < 0.2 // 200m
    return sameName || closeBy
  })
}

const fresh = candidates.filter(c => !isDup(c))
const dups  = candidates.length - fresh.length
console.log(`  ${dups} dubletter filtrerade, ${fresh.length} kvar att importera`)

// ── 4. Visa preview ────────────────────────────────────────────────────────
console.log('\n=== Preview (första 20) ===')
for (const c of fresh.slice(0, 20)) {
  console.log(`  ${c.name.padEnd(40)} ${c.latitude.toFixed(4)},${c.longitude.toFixed(4)}`)
}
if (fresh.length > 20) console.log(`  ... och ${fresh.length - 20} till`)

// ── 5. Insert (bara med --insert) ──────────────────────────────────────────
if (!INSERT) {
  console.log(`\nDry-run. Kör med --insert för att faktiskt skriva till restaurants.`)
  process.exit(0)
}

if (fresh.length === 0) {
  console.log('\nInget att importera.')
  process.exit(0)
}

console.log(`\nImporterar ${fresh.length} rader...`)
const rows = fresh.map(c => ({
  name:        c.name,
  latitude:    c.latitude,
  longitude:   c.longitude,
  type:        c.type,
  tags:        [...c.tags, 'osm'], // 'osm' = spårbar import
  description: c.description,
  website:     c.website,
}))

// Dedupe by name within OSM-candidaterna (samma namn kan finnas flera bboxar)
const seen = new Set()
const uniqueRows = []
for (const row of rows) {
  const key = row.name.toLowerCase().trim()
  if (seen.has(key)) continue
  seen.add(key)
  uniqueRows.push(row)
}
console.log(`  ${uniqueRows.length} unika namn (${rows.length - uniqueRows.length} interna dubletter borttagna)`)

let inserted = 0
let skipped = 0
let errors = 0
for (const row of uniqueRows) {
  const ins = await fetch(`${SUPABASE_URL}/rest/v1/restaurants`, {
    method: 'POST',
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(row),
  })
  if (ins.status === 409) { skipped++; continue }     // namn-kollision
  if (!ins.ok) { errors++; continue }
  inserted++
  if (inserted % 10 === 0) console.log(`  ${inserted}/${uniqueRows.length}`)
}
console.log(`\nFärdig. ${inserted} importerade, ${skipped} hoppade över (dubletter), ${errors} fel.`)

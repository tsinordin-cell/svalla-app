/**
 * Dublett-rapport: hittar nära duplicates i restaurants-tabellen.
 *
 * Letar efter rader där:
 *   - Avstånd <= 200m
 *   - Namn-likhet >= 0.20 (trigram) ELLER samma första ord
 *   - Inte exakt samma rad
 *
 * Outputten skrivs till scripts/oneoffs/dubletter.csv så Tom kan öppna i
 * Excel/Sheets och manuellt välja vilka som ska mergas.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

function distanceMeters(a, b) {
  const R = 6_371_000, toRad = d => d * Math.PI / 180
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}
function trigrams(s) {
  const padded = '  ' + s.toLowerCase() + '  '
  const set = new Set()
  for (let i = 0; i < padded.length - 2; i++) set.add(padded.slice(i, i + 3))
  return set
}
function nameSim(a, b) {
  if (!a || !b) return 0
  if (a === b) return 1
  const A = trigrams(a), B = trigrams(b)
  let intersect = 0
  A.forEach(t => { if (B.has(t)) intersect++ })
  const union = A.size + B.size - intersect
  return union === 0 ? 0 : intersect / union
}
function csvEscape(s) {
  if (s == null) return ''
  const str = String(s)
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

const { data: places } = await sb
  .from('restaurants')
  .select('id, name, slug, latitude, longitude, island, type, categories, google_place_id, google_rating')
  .not('latitude', 'is', null)
  .not('longitude', 'is', null)
  .order('name')

console.log(`Söker dubletter bland ${places.length} platser...`)

// Bygg ruts-grid (10km celler) för effektiv närhet-sökning
const grid = new Map()
function gridKey(lat, lng) {
  return `${Math.floor(lat * 100)},${Math.floor(lng * 100)}`  // ~1km celler
}
for (const p of places) {
  const key = gridKey(p.latitude, p.longitude)
  const arr = grid.get(key) ?? []
  arr.push(p)
  grid.set(key, arr)
}

const seen = new Set()
const pairs = []

for (const a of places) {
  // Kolla 9 angränsande celler
  const gx = Math.floor(a.latitude * 100), gy = Math.floor(a.longitude * 100)
  for (let dx = -1; dx <= 1; dx++) for (let dy = -1; dy <= 1; dy++) {
    const cell = grid.get(`${gx + dx},${gy + dy}`) ?? []
    for (const b of cell) {
      if (a.id === b.id) continue
      const pairKey = [a.id, b.id].sort().join('|')
      if (seen.has(pairKey)) continue

      const dist = distanceMeters(
        { lat: a.latitude, lng: a.longitude },
        { lat: b.latitude, lng: b.longitude },
      )
      if (dist > 200) continue

      const sim = nameSim(a.name.toLowerCase(), b.name.toLowerCase())
      const firstWordA = a.name.split(/\s+/)[0]?.toLowerCase()
      const firstWordB = b.name.split(/\s+/)[0]?.toLowerCase()
      const sameFirstWord = firstWordA && firstWordA === firstWordB

      if (sim >= 0.30 || sameFirstWord) {
        seen.add(pairKey)
        pairs.push({ a, b, dist, sim })
      }
    }
  }
}

// Sortera efter likhet (mest sannolika dubletter först)
pairs.sort((x, y) => y.sim - x.sim)

console.log(`\nHittade ${pairs.length} potentiella dublett-par.`)

// Skriv CSV
const headers = [
  'similarity', 'distance_m',
  'a_id', 'a_name', 'a_slug', 'a_island', 'a_type', 'a_categories', 'a_google_id', 'a_rating',
  'b_id', 'b_name', 'b_slug', 'b_island', 'b_type', 'b_categories', 'b_google_id', 'b_rating',
  'recommended_action',
]
const rows = [headers.join(',')]
for (const { a, b, dist, sim } of pairs) {
  // Rekommenderad action: behåll den med google_place_id om en har och inte den andra
  let action = 'manuell granskning'
  if (a.google_place_id && !b.google_place_id) action = `behåll A (${a.id.slice(0,8)}…), radera B`
  else if (b.google_place_id && !a.google_place_id) action = `behåll B (${b.id.slice(0,8)}…), radera A`
  else if (a.google_place_id === b.google_place_id && a.google_place_id) action = 'samma Google ID — säker dublett'

  rows.push([
    sim.toFixed(2), dist.toFixed(0),
    a.id, csvEscape(a.name), csvEscape(a.slug), csvEscape(a.island), csvEscape(a.type),
    csvEscape((a.categories ?? []).join('|')), csvEscape(a.google_place_id), a.google_rating ?? '',
    b.id, csvEscape(b.name), csvEscape(b.slug), csvEscape(b.island), csvEscape(b.type),
    csvEscape((b.categories ?? []).join('|')), csvEscape(b.google_place_id), b.google_rating ?? '',
    csvEscape(action),
  ].join(','))
}

const outPath = path.join(__dirname, 'dubletter.csv')
await fs.writeFile(outPath, rows.join('\n'), 'utf-8')
console.log(`\n✓ CSV skriven: ${outPath}`)
console.log(`\nTopp 10 mest sannolika dubletter:`)
pairs.slice(0, 10).forEach(({ a, b, dist, sim }) => {
  console.log(`  sim ${sim.toFixed(2)} | ${dist.toFixed(0)}m | "${a.name}" ↔ "${b.name}"`)
})

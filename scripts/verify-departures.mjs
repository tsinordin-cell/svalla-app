/**
 * Verifierar alla DEPARTURES-koordinater mot Google Places.
 *
 * För varje hamn:
 *   1. Sök Google på namnet + ", Sverige"
 *   2. Hämta Google's koord
 *   3. Räkna avstånd till vår koord
 *   4. Flagga om >2km off (möjligt fel)
 */
import { DEPARTURES } from '../src/lib/planner-client.ts'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const KEY = process.env.GOOGLE_PLACES_API_KEY
if (!KEY) { console.error('Saknar GOOGLE_PLACES_API_KEY'); process.exit(1) }

function distanceMeters(a, b) {
  const R = 6_371_000, toRad = d => d * Math.PI / 180
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

async function searchGoogle(query) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress',
    },
    body: JSON.stringify({ textQuery: query, languageCode: 'sv', regionCode: 'se', maxResultCount: 1 }),
  })
  if (!r.ok) return null
  const data = await r.json()
  return data.places?.[0] ?? null
}

console.log(`Verifierar ${DEPARTURES.length} hamnar...\n`)
console.log(`${'Hamn'.padEnd(32)} ${'Region'.padEnd(16)} Status`)
console.log(`${'─'.repeat(32)} ${'─'.repeat(16)} ─────`)

let ok = 0, warn = 0, fail = 0
const issues = []

for (const d of DEPARTURES) {
  const g = await searchGoogle(`${d.name}, Sverige`)
  if (!g || !g.location) {
    console.log(`${d.name.padEnd(32)} ${d.region.padEnd(16)} ⊘ Google hittade inget`)
    warn++
    issues.push({ ...d, status: 'no-google-match' })
    await new Promise(r => setTimeout(r, 130))
    continue
  }
  const dist = distanceMeters(
    { lat: d.lat, lng: d.lng },
    { lat: g.location.latitude, lng: g.location.longitude },
  )
  if (dist <= 1000) {
    console.log(`${d.name.padEnd(32)} ${d.region.padEnd(16)} ✓ ${dist.toFixed(0)}m`)
    ok++
  } else if (dist <= 5000) {
    console.log(`${d.name.padEnd(32)} ${d.region.padEnd(16)} ⚠ ${(dist/1000).toFixed(1)}km off → ${g.displayName?.text}`)
    warn++
    issues.push({ ...d, status: 'mid-off', dist, googleName: g.displayName?.text, googleLat: g.location.latitude, googleLng: g.location.longitude })
  } else {
    console.log(`${d.name.padEnd(32)} ${d.region.padEnd(16)} ✗ ${(dist/1000).toFixed(1)}km off → ${g.displayName?.text}`)
    fail++
    issues.push({ ...d, status: 'far-off', dist, googleName: g.displayName?.text, googleLat: g.location.latitude, googleLng: g.location.longitude })
  }
  await new Promise(r => setTimeout(r, 130))
}

console.log(`\n══ Sammanfattning ══`)
console.log(`  OK (≤1km):  ${ok}`)
console.log(`  Warn (1-5km): ${warn}`)
console.log(`  Fail (>5km):  ${fail}`)

if (fail > 0) {
  console.log(`\n══ FAILS — ska fixas ══`)
  issues.filter(i => i.status === 'far-off').forEach(i => {
    console.log(`  ${i.name}: vår (${i.lat}, ${i.lng}) → Google (${i.googleLat}, ${i.googleLng}) — ${(i.dist/1000).toFixed(1)}km`)
    console.log(`    Google säger: "${i.googleName}"`)
  })
}

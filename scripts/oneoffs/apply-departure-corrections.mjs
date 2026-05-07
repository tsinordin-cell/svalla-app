/**
 * Auto-fix DEPARTURES — kör correct-departures + skriver tillbaka till
 * planner-client.ts.
 *
 * Säker att köra: ändrar bara `lat:` och `lng:` värden för matchande id:n.
 */
import { DEPARTURES } from '../src/lib/planner-client.ts'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import fs from 'fs/promises'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })
const KEY = process.env.GOOGLE_PLACES_API_KEY
const FILE = path.join(__dirname, '../src/lib/planner-client.ts')

function distanceMeters(a, b) {
  const R = 6_371_000, toRad = d => d * Math.PI / 180
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

async function searchWithBias(query, lat, lng, radius = 50000) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.displayName,places.location',
    },
    body: JSON.stringify({
      textQuery: query, languageCode: 'sv', regionCode: 'se', maxResultCount: 3,
      locationBias: { circle: { center: { latitude: lat, longitude: lng }, radius } },
    }),
  })
  if (!r.ok) return []
  const data = await r.json()
  return data.places ?? []
}

console.log(`Kollar ${DEPARTURES.length} hamnar mot Google...\n`)

const corrections = new Map()  // id -> { newLat, newLng }

for (const d of DEPARTURES) {
  let results = await searchWithBias(d.name, d.lat, d.lng, 50000)
  results = results.filter(r => {
    const name = (r.displayName?.text ?? '').toLowerCase()
    const ours = d.name.toLowerCase()
    return name.includes(ours.split(' ')[0]) || ours.includes(name.split(' ')[0])
  })
  if (results.length === 0) continue

  const g = results[0]
  const dist = distanceMeters(
    { lat: d.lat, lng: d.lng },
    { lat: g.location.latitude, lng: g.location.longitude },
  )

  // Korrigera om >500m bort men <50km (annars är det troligen helt fel match)
  if (dist > 500 && dist <= 50000) {
    const newLat = Math.round(g.location.latitude * 10000) / 10000
    const newLng = Math.round(g.location.longitude * 10000) / 10000
    corrections.set(d.id, { newLat, newLng })
    console.log(`  ${d.id.padEnd(22)} ${d.lat},${d.lng} → ${newLat},${newLng}  (${dist.toFixed(0)}m)`)
  }
  await new Promise(r => setTimeout(r, 130))
}

if (corrections.size === 0) {
  console.log('\nInga ändringar.')
  process.exit(0)
}

console.log(`\n${corrections.size} korrigeringar att applicera. Skriver till planner-client.ts...\n`)

let content = await fs.readFile(FILE, 'utf-8')
let applied = 0

for (const [id, { newLat, newLng }] of corrections) {
  // Match: { id: 'X', name: '...', lat: NUM, lng: NUM, ... }
  // Ersätt bara lat/lng på raden där id matchar
  const re = new RegExp(`(\\{ id: '${id.replace(/'/g, "\\'")}',[^}]*?lat:\\s*)[\\-0-9.]+(,\\s*lng:\\s*)[\\-0-9.]+`, 'g')
  const before = content
  content = content.replace(re, `$1${newLat}$2${newLng}`)
  if (content !== before) {
    applied++
  } else {
    console.log(`  ⚠ kunde inte hitta rad för id="${id}"`)
  }
}

await fs.writeFile(FILE, content, 'utf-8')
console.log(`✓ Applicerade ${applied}/${corrections.size} korrigeringar i planner-client.ts`)

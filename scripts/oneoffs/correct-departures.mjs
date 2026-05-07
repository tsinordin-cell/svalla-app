/**
 * Auto-korrigerar DEPARTURES-koordinater mot Google Places.
 *
 * Skillnad mot verify-departures: använder locationBias kring Stockholms-
 * regionen så Google inte matchar likanamniga platser i Göteborg/Skåne.
 *
 * Outputten är en TypeScript-snippet som kan klistras in i planner-client.ts.
 */
import { DEPARTURES } from '../src/lib/planner-client.ts'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const KEY = process.env.GOOGLE_PLACES_API_KEY

function distanceMeters(a, b) {
  const R = 6_371_000, toRad = d => d * Math.PI / 180
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

/** Söker Google MED locationBias kring vår koord, så Google prioriterar
 *  matchningar i samma område. */
async function searchWithBias(query, lat, lng, radius = 50000) {
  const r = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': KEY,
      'X-Goog-FieldMask': 'places.displayName,places.location,places.formattedAddress',
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'sv',
      regionCode: 'se',
      maxResultCount: 3,
      locationBias: { circle: { center: { latitude: lat, longitude: lng }, radius } },
    }),
  })
  if (!r.ok) return []
  const data = await r.json()
  return data.places ?? []
}

console.log(`Korrigerar ${DEPARTURES.length} hamnar...\n`)

const corrections = []
let unchanged = 0, corrected = 0, manual = 0

for (const d of DEPARTURES) {
  // Steg 1: sök med locationBias (50km radius runt vår koord)
  let results = await searchWithBias(d.name, d.lat, d.lng, 50000)

  // Filtrera bort träffar som har helt annat namn (Göteborg-Frihamnen etc)
  results = results.filter(r => {
    const name = (r.displayName?.text ?? '').toLowerCase()
    const ours = d.name.toLowerCase()
    return name.includes(ours.split(' ')[0]) || ours.includes(name.split(' ')[0])
  })

  if (results.length === 0) {
    console.log(`${d.id.padEnd(22)} ⊘ ingen träff i 50km radie — behåll vår koord`)
    manual++
    await new Promise(r => setTimeout(r, 130))
    continue
  }

  const g = results[0]
  const dist = distanceMeters(
    { lat: d.lat, lng: d.lng },
    { lat: g.location.latitude, lng: g.location.longitude },
  )

  if (dist <= 500) {
    console.log(`${d.id.padEnd(22)} ✓ OK (${dist.toFixed(0)}m)`)
    unchanged++
  } else if (dist <= 50000) {
    // Uppdatera till Google's koord
    const newLat = Math.round(g.location.latitude * 10000) / 10000
    const newLng = Math.round(g.location.longitude * 10000) / 10000
    console.log(`${d.id.padEnd(22)} ✎ ${dist.toFixed(0)}m → uppdaterar (${newLat}, ${newLng}) [${g.displayName?.text}]`)
    corrections.push({ id: d.id, name: d.name, oldLat: d.lat, oldLng: d.lng, newLat, newLng, googleName: g.displayName?.text })
    corrected++
  } else {
    console.log(`${d.id.padEnd(22)} ⚠ ${(dist/1000).toFixed(1)}km bort — för långt, manual review`)
    manual++
  }

  await new Promise(r => setTimeout(r, 130))
}

console.log(`\n══ Sammanfattning ══`)
console.log(`  Oförändrade: ${unchanged}`)
console.log(`  Korrigerade: ${corrected}`)
console.log(`  Manual:      ${manual}`)

console.log(`\n══ TS-snippet med korrigerade koordinater ══\n`)
for (const c of corrections) {
  console.log(`  '${c.id}': { lat: ${c.newLat}, lng: ${c.newLng} },  // var ${c.oldLat}, ${c.oldLng} — Google: ${c.googleName}`)
}

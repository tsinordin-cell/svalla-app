/**
 * Berikar restaurants från OpenStreetMap via Overpass API.
 * Hämtar opening_hours, phone, website om OSM har dem för matchande POI.
 *
 * Match-strategi: koordinater (50m radius) + namn-similarity.
 * Bara updates där befintligt fält är NULL — överskriver aldrig manuellt data.
 *
 * Kör: node scripts/enrich-places-osm.mjs
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const OVERPASS = 'https://overpass-api.de/api/interpreter'

function normalizeName(s) {
  return s.toLowerCase()
    .replaceAll('å', 'a').replaceAll('ä', 'a').replaceAll('ö', 'o')
    .replace(/[^a-z0-9]/g, '')
}

async function queryOSM(lat, lng) {
  // Hämta alla amenity/leisure-pois inom 100m radius
  const radius = 100
  const query = `[out:json][timeout:15];
(
  node(around:${radius},${lat},${lng})[name];
  way(around:${radius},${lat},${lng})[name];
);
out tags;`
  const res = await fetch(OVERPASS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'User-Agent': 'Svalla-Enrich/1.0 (info@svalla.se)',
      'Accept': 'application/json',
    },
    body: 'data=' + encodeURIComponent(query),
  })
  if (!res.ok) {
    console.error(`  OSM ${res.status}: ${await res.text().then(t => t.substring(0, 80))}`)
    return null
  }
  const data = await res.json()
  return data.elements ?? []
}

function findBestMatch(elements, restaurantName) {
  const target = normalizeName(restaurantName)
  let best = null
  let bestScore = 0
  for (const el of elements) {
    if (!el.tags?.name) continue
    const candidate = normalizeName(el.tags.name)
    // Exakt match eller substring båda hållen
    let score = 0
    if (candidate === target) score = 100
    else if (candidate.includes(target) || target.includes(candidate)) score = 70
    else {
      // Jaccard på 3-grams
      const a = new Set()
      const b = new Set()
      for (let i = 0; i < target.length - 2; i++) a.add(target.substring(i, i + 3))
      for (let i = 0; i < candidate.length - 2; i++) b.add(candidate.substring(i, i + 3))
      const inter = [...a].filter(x => b.has(x)).length
      const union = new Set([...a, ...b]).size
      score = union > 0 ? Math.round(100 * inter / union) : 0
    }
    if (score > bestScore) {
      bestScore = score
      best = el
    }
  }
  return bestScore >= 50 ? best : null
}

async function main() {
  // Bara restauranger som saknar opening_hours, phone eller website
  const { data: places } = await sb
    .from('restaurants')
    .select('id, name, latitude, longitude, opening_hours, contact_phone, website')
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .order('name')

  console.log(`Granskar ${places.length} platser med koordinater...`)

  let processed = 0
  let enriched = 0
  let skipped = 0
  let failed = 0
  const updates = []

  for (const place of places) {
    processed++
    // Skip om redan berikad
    if (place.opening_hours && place.contact_phone && place.website) {
      skipped++
      continue
    }
    try {
      const elements = await queryOSM(place.latitude, place.longitude)
      if (!elements) { failed++; continue }
      const match = findBestMatch(elements, place.name)
      if (!match) {
        if (processed <= 20) console.log(`  · ${place.name}: ingen OSM-match`)
        continue
      }
      const tags = match.tags
      const update = {}
      if (!place.opening_hours && tags.opening_hours) update.opening_hours = tags.opening_hours
      if (!place.contact_phone && (tags.phone || tags['contact:phone'])) {
        update.contact_phone = tags.phone || tags['contact:phone']
      }
      if (!place.website && (tags.website || tags['contact:website'])) {
        update.website = tags.website || tags['contact:website']
      }
      if (Object.keys(update).length > 0) {
        updates.push({ id: place.id, name: place.name, ...update })
        const { error } = await sb.from('restaurants').update(update).eq('id', place.id)
        if (error) { console.error(`  ✗ ${place.name}: ${error.message}`); failed++; continue }
        console.log(`  ✓ ${place.name}: ${Object.keys(update).join(', ')}`)
        enriched++
      }
      // Rate-limit Overpass — 1 req/sec
      await new Promise(r => setTimeout(r, 1100))
    } catch (err) {
      console.error(`  ✗ ${place.name}: ${err.message}`)
      failed++
    }
    if (processed % 20 === 0) console.log(`  Progress: ${processed}/${places.length}, berikade: ${enriched}`)
  }

  console.log(`\nKlart: ${enriched} berikade, ${skipped} redan kompletta, ${failed} fel av ${processed} totalt.`)
}

main().catch(err => { console.error(err); process.exit(1) })

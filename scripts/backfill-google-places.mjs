/**
 * Backfill Google Places-data för alla befintliga platser.
 *
 * Vad scriptet gör:
 *   1. Loopar genom alla restaurants som saknar google_place_id
 *   2. För varje plats: searchText med name + befintlig lat/lng som locationBias
 *   3. Sparar Place ID, telefon, hemsida, formaterad adress, rating, photo refs
 *   4. Om Google-koord skiljer >50m från vår: flaggar för manuell review
 *      (sparar BÅDA — vi byter inte tyst)
 *
 * Kör så här (efter att GOOGLE_PLACES_API_KEY satt i .env.local):
 *   node scripts/backfill-google-places.mjs
 *
 * Med --dry-run flagga: kör utan att skriva till DB:n (för att se vad som
 * skulle ändras).
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY
const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY

if (!SUPABASE_URL || !SERVICE_KEY) {
  console.error('Saknar SUPABASE-env. Kör från svalla-app-roten.')
  process.exit(1)
}
if (!GOOGLE_KEY) {
  console.error('Saknar GOOGLE_PLACES_API_KEY i .env.local. Skaffa från Google Cloud Console.')
  process.exit(1)
}

const DRY_RUN = process.argv.includes('--dry-run')
const sb = createClient(SUPABASE_URL, SERVICE_KEY)

const PLACES_BASE = 'https://places.googleapis.com/v1'
const PLACE_FIELDS = [
  'id', 'displayName', 'formattedAddress', 'location',
  'internationalPhoneNumber', 'nationalPhoneNumber', 'websiteUri',
  'regularOpeningHours', 'rating', 'userRatingCount', 'priceLevel',
  'photos', 'types',
].join(',')

async function findPlaceByText(query, lat, lng) {
  const r = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_KEY,
      'X-Goog-FieldMask': `places.${PLACE_FIELDS.split(',').join(',places.')}`,
    },
    body: JSON.stringify({
      textQuery: query,
      languageCode: 'sv',
      regionCode: 'se',
      locationBias: { circle: { center: { latitude: lat, longitude: lng }, radius: 500 } },
      maxResultCount: 1,
    }),
  })
  if (!r.ok) throw new Error(`Google ${r.status}: ${await r.text()}`)
  const data = await r.json()
  return data.places?.[0] ?? null
}

function distanceMeters(a, b) {
  const R = 6_371_000
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

async function main() {
  console.log(`═══ Google Places backfill${DRY_RUN ? ' (DRY-RUN)' : ''} ═══\n`)

  const { data: places, error } = await sb
    .from('restaurants')
    .select('id, name, latitude, longitude, google_place_id')
    .is('google_place_id', null)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .order('name')
  if (error) { console.error(error); process.exit(1) }

  console.log(`${places.length} platser saknar google_place_id\n`)

  const flagged = []
  let updated = 0, notFound = 0

  for (const p of places) {
    process.stdout.write(`  ${p.name.padEnd(40)} `)
    try {
      const g = await findPlaceByText(p.name, p.latitude, p.longitude)
      if (!g) { console.log('⊘ ej hittad'); notFound++; continue }

      const dist = g.location
        ? distanceMeters({ lat: p.latitude, lng: p.longitude }, { lat: g.location.latitude, lng: g.location.longitude })
        : 0
      const flagForReview = dist > 50

      const update = {
        google_place_id: g.id,
        place_data_source: 'google',
        formatted_address: g.formattedAddress ?? null,
        phone: g.internationalPhoneNumber ?? g.nationalPhoneNumber ?? null,
        website: g.websiteUri ?? null,
        google_rating: g.rating ?? null,
        google_ratings_total: g.userRatingCount ?? null,
        google_rating_updated: new Date().toISOString(),
        google_photo_refs: g.photos?.slice(0, 6).map(ph => ({
          reference: ph.name,
          width: ph.widthPx,
          height: ph.heightPx,
          attribution: ph.authorAttributions?.[0]?.displayName ?? null,
        })) ?? null,
      }
      // Bara byt koord om <50m diff (annars kan det vara fel match)
      if (g.location && dist <= 50) {
        update.latitude = g.location.latitude
        update.longitude = g.location.longitude
      }

      if (DRY_RUN) {
        console.log(`✓ ${dist.toFixed(0)}m diff${flagForReview ? ' ⚠ REVIEW' : ''} (dry-run)`)
      } else {
        const { error: upErr } = await sb.from('restaurants').update(update).eq('id', p.id)
        if (upErr) console.log(`✗ ${upErr.message}`)
        else {
          console.log(`✓ rating ${g.rating ?? '–'} ${dist.toFixed(0)}m diff${flagForReview ? ' ⚠' : ''}`)
          updated++
        }
      }
      if (flagForReview) flagged.push({ id: p.id, name: p.name, ourCoord: [p.latitude, p.longitude], googleCoord: [g.location.latitude, g.location.longitude], dist })
    } catch (e) {
      console.log(`✗ ${e.message?.slice(0, 80)}`)
    }
    await new Promise(r => setTimeout(r, 100)) // throttle 10 req/s
  }

  console.log(`\n═══ Klart ═══`)
  console.log(`  Uppdaterade: ${updated}`)
  console.log(`  Ej hittade: ${notFound}`)
  console.log(`  Flaggade för review (>50m): ${flagged.length}`)
  if (flagged.length > 0) {
    console.log(`\n⚠ Manuell granskning behövs för:`)
    flagged.slice(0, 20).forEach(f => console.log(`    ${f.name} (${f.dist.toFixed(0)}m off)`))
    if (flagged.length > 20) console.log(`    + ${flagged.length - 20} fler`)
  }
}

main().catch(e => { console.error(e); process.exit(1) })

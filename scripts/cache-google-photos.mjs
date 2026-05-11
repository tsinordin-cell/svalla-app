/**
 * Cacha Google-foton till Supabase Storage.
 * Permanent — Googles photo refs roterar var ~7:e dag, så vi måste äga bilderna.
 *
 * Pipeline per plats:
 *   1. Hämta restaurants där google_photo_refs ≠ [] och place_photos saknas
 *   2. För varje photo_ref (max 3): fetch Google Photo Media → få binär
 *   3. Upload till bucket 'images' under prefix 'places/{place_id}/{index}.jpg'
 *   4. Insert place_photos-rad med public-URL, source='google', is_hero på första
 *
 * Kostnad: ~$7 per 1000 photo media calls. 163 platser × 3 foton = $3.42.
 *
 * Kör med:
 *   node scripts/cache-google-photos.mjs
 *   node scripts/cache-google-photos.mjs --limit=20  # begränsa till 20 platser per kör
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const API_KEY = process.env.GOOGLE_PLACES_API_KEY

const limitArg = process.argv.find(a => a.startsWith('--limit='))
const LIMIT = limitArg ? parseInt(limitArg.split('=')[1], 10) : 1000

const BUCKET = 'images'
const PHOTO_PREFIX = 'places'
const MAX_PHOTOS_PER_PLACE = 3
const MAX_WIDTH_PX = 1600

async function fetchGooglePhoto(photoName) {
  // Google Photo Media endpoint returnerar 302 → vi följer redirect och får binär
  const url = `https://places.googleapis.com/v1/${photoName}/media?maxWidthPx=${MAX_WIDTH_PX}&key=${API_KEY}`
  const r = await fetch(url, { redirect: 'follow' })
  if (!r.ok) throw new Error(`Google photo fetch failed ${r.status}`)
  const buffer = await r.arrayBuffer()
  return Buffer.from(buffer)
}

async function uploadToStorage(placeId, index, buffer) {
  const filePath = `${PHOTO_PREFIX}/${placeId}/${index}.jpg`
  const { error } = await sb.storage.from(BUCKET).upload(filePath, buffer, {
    contentType: 'image/jpeg',
    upsert: true,
  })
  if (error) throw new Error(`Storage upload failed: ${error.message}`)
  const { data } = sb.storage.from(BUCKET).getPublicUrl(filePath)
  return data.publicUrl
}

async function main() {
  // Steg 1: hämta alla place_id:n som redan har place_photos
  const { data: existingPhotoRows } = await sb
    .from('place_photos')
    .select('place_id')
  const placesWithPhotos = new Set((existingPhotoRows || []).map(r => r.place_id))

  // Steg 2: hämta restaurants med photo_refs, FILTRERA bort de som redan har place_photos
  const { data: candidates } = await sb
    .from('restaurants')
    .select('id, name, google_photo_refs, archipelago_region')
    .eq('place_data_source', 'google')
    .not('google_photo_refs', 'is', null)

  const places = (candidates || [])
    .filter(p => !placesWithPhotos.has(p.id))
    .slice(0, LIMIT)

  console.log(`Hittade ${places?.length ?? 0} platser med photo refs att cacha.`)
  let cached = 0, skipped = 0, failed = 0, totalPhotos = 0

  for (const p of places || []) {
    // Skip om plats redan har place_photos
    const { data: existingPhotos } = await sb
      .from('place_photos')
      .select('id')
      .eq('place_id', p.id)
      .limit(1)
    if (existingPhotos?.length) {
      skipped++
      continue
    }

    const refs = (p.google_photo_refs || []).slice(0, MAX_PHOTOS_PER_PLACE)
    if (refs.length === 0) { skipped++; continue }

    console.log(`📸 ${p.name} → ${refs.length} foton`)
    let success = 0
    for (let i = 0; i < refs.length; i++) {
      const refObj = refs[i]
      const photoName = typeof refObj === 'string' ? refObj : refObj.reference
      if (!photoName) continue
      try {
        const buffer = await fetchGooglePhoto(photoName)
        const publicUrl = await uploadToStorage(p.id, i, buffer)
        const { error } = await sb.from('place_photos').insert({
          place_id: p.id,
          url: publicUrl,
          source: 'google',
          source_ref: photoName,
          sort_order: i,
          is_hero: i === 0,
          width: MAX_WIDTH_PX,
        })
        if (error) {
          console.error(`  ✗ db insert ${i}: ${error.message}`)
        } else {
          success++
          totalPhotos++
        }
      } catch (e) {
        console.error(`  ✗ photo ${i}: ${e.message}`)
      }
      await new Promise(r => setTimeout(r, 100))
    }
    if (success > 0) {
      cached++
      // Sätt också image_url på restaurants som hero (för bakåtkompatibilitet)
      const { data: hero } = await sb.from('place_photos').select('url').eq('place_id', p.id).eq('is_hero', true).maybeSingle()
      if (hero?.url) {
        await sb.from('restaurants').update({ image_url: hero.url }).eq('id', p.id)
      }
    } else {
      failed++
    }
  }

  console.log(`\n=== KLART ===`)
  console.log(`Platser cachade: ${cached}`)
  console.log(`Foton sparade:   ${totalPhotos}`)
  console.log(`Skippade:        ${skipped} (redan cachade)`)
  console.log(`Misslyckades:    ${failed}`)
}
main().catch(err => { console.error(err); process.exit(1) })

/**
 * Seedar Göteborg + Bohuslän från /tmp/discovered-places.json (Google-verifierade).
 *
 * Pipeline:
 *   1. node /tmp/discover-v2.mjs    → genererar /tmp/discovered-places.json
 *   2. node scripts/seed-goteborg-bohuslan-from-google.mjs (denna fil)
 *
 * Skip om google_place_id redan finns. Inga manuella koord — endast Google-data.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const DISCOVERY_PATH = process.env.DISCOVERY_PATH || '/tmp/discovered-places.json'
if (!fs.existsSync(DISCOVERY_PATH)) {
  console.error(`Saknar ${DISCOVERY_PATH}. Kör discover-script först.`)
  process.exit(1)
}
const data = JSON.parse(fs.readFileSync(DISCOVERY_PATH, 'utf8'))

function slugify(s) {
  return s.toLowerCase()
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Mappa kategori-key till Svallas type + categories[]
const TYPE_MAP = {
  restaurant: { type: 'restaurant', categories: ['hamnkrog'] },
  harbor:     { type: 'harbor',     categories: ['gasthamn'] },
  fuel:       { type: 'fuel',       categories: ['bensin'] },
  sauna:      { type: 'sauna',      categories: ['bastu'] },
}

// Plocka foton: spara photo refs som array av { reference, attribution }
function buildPhotoRefs(googlePhotoRefs) {
  if (!Array.isArray(googlePhotoRefs)) return []
  return googlePhotoRefs.slice(0, 3).map(ref => ({ reference: ref }))
}

async function main() {
  // Plocka ihop alla 122 platser från by_category
  const all = []
  for (const [catKey, list] of Object.entries(data.by_category)) {
    for (const p of list) all.push({ ...p, _catKey: catKey })
  }
  console.log(`Seedar ${all.length} platser från Google-discovery...`)

  let inserted = 0, skipped = 0, failed = 0
  const usedSlugs = new Set()

  for (const p of all) {
    // Skip om google_place_id redan finns
    const { data: existing } = await sb
      .from('restaurants')
      .select('id, name')
      .eq('google_place_id', p.google_place_id)
      .maybeSingle()
    if (existing) {
      console.log(`⊘ ${p.name} → finns redan (id=${existing.id})`)
      skipped++
      continue
    }

    // Generera unik slug
    let slug = slugify(p.name)
    let attempt = 1
    while (true) {
      const { data: collision } = await sb.from('restaurants').select('id').eq('slug', slug).maybeSingle()
      if (!collision && !usedSlugs.has(slug)) break
      attempt++
      slug = `${slugify(p.name)}-${slugify(p.area)}${attempt > 2 ? '-' + attempt : ''}`
    }
    usedSlugs.add(slug)

    const map = TYPE_MAP[p._catKey]
    const insert = {
      name: p.name,
      slug,
      latitude: p.lat,                       // Direkt från Google
      longitude: p.lng,                      // Direkt från Google
      island: p.area,
      type: map.type,
      categories: map.categories,
      archipelago_region: p.archipelago_region,
      city: p.city,
      google_place_id: p.google_place_id,
      formatted_address: p.address || null,
      phone: p.phone || null,
      website: p.website || null,
      google_rating: p.rating || null,
      google_ratings_total: p.ratings_count || null,
      google_rating_updated: new Date().toISOString(),
      google_photo_refs: buildPhotoRefs(p.photo_refs),
      place_data_source: 'google',
      verified_at: new Date().toISOString(),
      seasonality: 'summer_only',
      source_confidence: 'high',             // verifierad av Google
    }

    const { error } = await sb.from('restaurants').insert(insert)
    if (error) {
      console.error(`✗ ${p.name}: ${error.message}`)
      failed++
      continue
    }
    console.log(`✓ ${p.name} (${p.area}) → ${slug}`)
    inserted++
  }

  console.log(`\n=== KLART ===`)
  console.log(`Insatta:      ${inserted}`)
  console.log(`Skippade:     ${skipped} (redan i db)`)
  console.log(`Misslyckades: ${failed}`)
  console.log(`\nNästa steg: ladda ner foton till Supabase Storage`)
  console.log(`  node scripts/cache-google-photos.mjs`)
}
main().catch(err => { console.error(err); process.exit(1) })

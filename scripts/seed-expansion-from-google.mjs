/**
 * Seed expansion (Åland, Öland, Bohuslän, Gotland) från /tmp/expansion-to-seed.json.
 * Skip om google_place_id redan finns. All data direkt från Google.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const SOURCE = process.env.SEED_SOURCE || '/tmp/expansion-to-seed.json'
const data = JSON.parse(fs.readFileSync(SOURCE, 'utf8'))

function slugify(s) {
  return s.toLowerCase()
    // Svenska + romansk diakritik
    .replace(/[åäáàâ]/g, 'a').replace(/[öóòô]/g, 'o').replace(/[éèêë]/g, 'e').replace(/[íìî]/g, 'i').replace(/[úùû]/g, 'u').replace(/ç/g, 'c').replace(/ñ/g, 'n')
    .replace(/&/g, 'och')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

// Mappa kategori → restaurants.type + Svalla-kategorier
const CAT_MAP = {
  krog:       { type: 'restaurant', categories: ['krog'] },
  restaurang: { type: 'restaurant', categories: ['restaurang'] },
  vardshus:   { type: 'restaurant', categories: ['vardshus', 'hotell'] },
  hotell:     { type: 'restaurant', categories: ['hotell'] },  // type=restaurant pga schema (inte 'lodging' som type)
  cafe:       { type: 'restaurant', categories: ['cafe'] },
  gasthamn:   { type: 'harbor',     categories: ['gasthamn'] },
}

const REGION_LABEL = {
  aland: 'Åland',
  oland: 'Öland',
  bohuslan: 'Bohuslän',
  gotland: 'Gotland',
}

async function main() {
  const places = data.places || []
  console.log(`Seedar ${places.length} expansionsplatser...`)
  let inserted = 0, skipped = 0, failed = 0
  const usedSlugs = new Set()

  for (const p of places) {
    const map = CAT_MAP[p.input_cat] || CAT_MAP.restaurang

    // Skip om google_place_id redan finns
    const { data: existing } = await sb
      .from('restaurants')
      .select('id, name')
      .eq('google_place_id', p.google_place_id)
      .maybeSingle()
    if (existing) {
      console.log(`⊘ ${p.google_name} → finns redan`)
      skipped++
      continue
    }

    // Generera unik slug
    let slug = slugify(p.google_name) + '-' + p.input_region
    let attempt = 1
    while (true) {
      const { data: collision } = await sb.from('restaurants').select('id').eq('slug', slug).maybeSingle()
      if (!collision && !usedSlugs.has(slug)) break
      attempt++
      slug = slugify(p.google_name) + '-' + p.input_region + '-' + attempt
    }
    usedSlugs.add(slug)

    const insert = {
      name: p.google_name,
      slug,
      latitude: p.lat,
      longitude: p.lng,
      type: map.type,
      categories: map.categories,
      archipelago_region: p.input_region,
      city: REGION_LABEL[p.input_region] || p.input_region,
      google_place_id: p.google_place_id,
      formatted_address: p.address || null,
      phone: p.phone || null,
      website: p.website || null,
      google_rating: p.rating || null,
      google_ratings_total: p.ratings_count || null,
      google_rating_updated: new Date().toISOString(),
      google_photo_refs: (p.photo_refs || []).slice(0, 3).map(ref => ({ reference: ref })),
      place_data_source: 'google',
      verified_at: new Date().toISOString(),
      seasonality: 'summer_only',
      source_confidence: 'high',
    }

    const { error } = await sb.from('restaurants').insert(insert)
    if (error) { console.error(`✗ ${p.google_name}: ${error.message}`); failed++; continue }
    console.log(`✓ ${p.google_name} (${p.input_region}/${p.input_cat}) → ${slug}`)
    inserted++
  }
  console.log(`\n=== KLART ===`)
  console.log(`Insatta: ${inserted}, Skippade: ${skipped}, Misslyckades: ${failed}`)
}
main().catch(err => { console.error(err); process.exit(1) })

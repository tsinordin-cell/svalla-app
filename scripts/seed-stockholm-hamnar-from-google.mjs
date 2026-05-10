/**
 * Seedar Stockholm-hamnar från /tmp/stockholm-harbors.json (Google-verifierade).
 *
 * Pipeline:
 *   1. node scripts/fetch-stockholm-hamnar.mjs
 *      → /tmp/stockholm-harbors.json
 *   2. node scripts/seed-stockholm-hamnar-from-google.mjs (denna fil)
 *
 * Skip om google_place_id redan finns i restaurants-tabellen.
 * INGA manuella koord — endast Google-data.
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

const SOURCE = process.env.SOURCE_PATH || '/tmp/stockholm-harbors.json'
if (!fs.existsSync(SOURCE)) {
  console.error(`Saknar ${SOURCE}. Kör fetch-script först:`)
  console.error(`  node scripts/fetch-stockholm-hamnar.mjs`)
  process.exit(1)
}
const data = JSON.parse(fs.readFileSync(SOURCE, 'utf8'))

function slugify(s) {
  return s.toLowerCase()
    .replace(/[åäáàâ]/g, 'a').replace(/[öóòô]/g, 'o').replace(/[éèêë]/g, 'e')
    .replace(/[íìî]/g, 'i').replace(/[úùû]/g, 'u').replace(/ç/g, 'c').replace(/ñ/g, 'n')
    .replace(/&/g, 'och')
    .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function buildPhotoRefs(refs) {
  if (!Array.isArray(refs)) return []
  return refs.slice(0, 3).map(r => ({ reference: r }))
}

async function main() {
  const all = data.by_category?.harbor || []
  console.log(`Seedar ${all.length} hamn-kandidater från Google...`)

  let inserted = 0, skipped = 0, failed = 0
  const usedSlugs = new Set()

  for (const p of all) {
    // Sanity-check: måste ha google_place_id, namn och koord
    if (!p.google_place_id || !p.name || p.lat == null || p.lng == null) {
      console.error(`✗ Skipping incomplete record: ${JSON.stringify(p).slice(0, 100)}`)
      failed++
      continue
    }

    // Skip om google_place_id redan finns i restaurants-tabellen
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
    if (!slug) slug = `hamn-${p.google_place_id.slice(-8)}`
    let attempt = 1
    while (true) {
      const { data: collision } = await sb.from('restaurants').select('id').eq('slug', slug).maybeSingle()
      if (!collision && !usedSlugs.has(slug)) break
      attempt++
      slug = `${slugify(p.name)}-${slugify(p.area || 'stockholm')}${attempt > 2 ? '-' + attempt : ''}`
    }
    usedSlugs.add(slug)

    const insert = {
      name: p.name,
      slug,
      latitude: p.lat,
      longitude: p.lng,
      island: p.area,
      type: 'harbor',
      categories: ['gasthamn'],
      archipelago_region: p.archipelago_region || 'stockholm',
      city: p.city || 'Stockholm',
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
      source_confidence: 'high',
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
  if (inserted > 0) {
    console.log(`\nNästa steg: cacha Google-foton till Supabase Storage`)
    console.log(`  node scripts/cache-google-photos.mjs`)
  }
}
main().catch(err => { console.error(err); process.exit(1) })

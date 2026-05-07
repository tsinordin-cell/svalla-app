/**
 * Seed expansion-platser från OSM (saknar Google-profil).
 * Kör när /tmp/expansion-osm-found.json finns.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const data = JSON.parse(fs.readFileSync('/tmp/expansion-osm-found.json', 'utf8'))

const CAT_MAP = {
  krog: { type:'restaurant', cats:['krog'] },
  restaurang: { type:'restaurant', cats:['restaurang'] },
  vardshus: { type:'restaurant', cats:['vardshus','hotell'] },
  hotell: { type:'restaurant', cats:['hotell'] },
  cafe: { type:'restaurant', cats:['cafe'] },
  gasthamn: { type:'harbor', cats:['gasthamn'] },
}
const REGION_LABEL = { aland:'Åland', oland:'Öland', bohuslan:'Bohuslän', gotland:'Gotland' }

function slugify(s) {
  return s.toLowerCase().replace(/å/g,'a').replace(/ä/g,'a').replace(/ö/g,'o').replace(/é/g,'e')
    .replace(/&/g,'och').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'')
}

let inserted = 0, skipped = 0
for (const p of data.places) {
  const map = CAT_MAP[p.input_cat] || CAT_MAP.restaurang
  const slug = slugify(p.input_name) + '-' + p.input_region

  // Skip om slug eller namn finns
  const { data: existing } = await sb.from('restaurants').select('id').or(`slug.eq.${slug},name.eq.${p.input_name}`).maybeSingle()
  if (existing) { console.log(`⊘ ${p.input_name}`); skipped++; continue }

  const { error } = await sb.from('restaurants').insert({
    name: p.input_name,
    slug,
    latitude: p.lat,
    longitude: p.lng,
    type: map.type,
    categories: map.cats,
    archipelago_region: p.input_region,
    city: REGION_LABEL[p.input_region],
    formatted_address: p.address,
    place_data_source: 'osm',
    verified_at: new Date().toISOString(),
    seasonality: 'summer_only',
    source_confidence: 'medium',
  })
  if (error) { console.error(`✗ ${p.input_name}: ${error.message}`); continue }
  console.log(`✓ ${p.input_name} (${p.input_region}) → ${slug}`)
  inserted++
}
console.log(`\nInsatta: ${inserted}, Skippade: ${skipped}`)

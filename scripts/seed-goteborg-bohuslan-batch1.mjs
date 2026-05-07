/**
 * Batch 1 (50 platser): Göteborgs skärgård + Bohuslän.
 * Seedar verifierade platser med name + ungefärlig koord + kategori.
 *
 * Kör efter:
 *   1. node scripts/seed-goteborg-bohuslan-batch1.mjs
 *   2. node scripts/backfill-google-places-v2.mjs
 *      → hittar Google Place ID, hämtar telefon, öppettider, foton, ratings
 *
 * Skip om name redan finns (unique-index på name).
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

function slugify(s) {
  return s
    .toLowerCase()
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

// ── Göteborgs skärgård (södra + norra) ──────────────────────────────────
const GOTEBORG = [
  // Krogar / restauranger / café
  { name: 'Brännö Värdshus',         lat: 57.6231, lng: 11.7503, island: 'Brännö',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Brännö Brygga',           lat: 57.6189, lng: 11.7547, island: 'Brännö',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Donsö Hamnkrog',          lat: 57.6300, lng: 11.7861, island: 'Donsö',   type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Café Öbergska',           lat: 57.6183, lng: 11.7886, island: 'Styrsö',  type: 'restaurant', categories: ['cafe'] },
  { name: 'Pensionat Styrsö Skäret', lat: 57.6225, lng: 11.7833, island: 'Styrsö',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Hönö Sjökrog',            lat: 57.6722, lng: 11.6403, island: 'Hönö',    type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Öckerö Värdshus',         lat: 57.7042, lng: 11.6492, island: 'Öckerö',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Lyckans Slip',            lat: 57.6433, lng: 11.7986, island: 'Asperö',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Vrångö Skärgårdscafé',    lat: 57.6094, lng: 11.7672, island: 'Vrångö',  type: 'restaurant', categories: ['cafe'] },
  { name: 'Björkö Sjökrog',          lat: 57.7392, lng: 11.6231, island: 'Björkö',  type: 'restaurant', categories: ['hamnkrog'] },

  // Gästhamnar
  { name: 'Brännö Husvik gästhamn',     lat: 57.6231, lng: 11.7503, island: 'Brännö',         type: 'harbor', categories: ['gasthamn'] },
  { name: 'Donsö gästhamn',             lat: 57.6300, lng: 11.7861, island: 'Donsö',          type: 'harbor', categories: ['gasthamn'] },
  { name: 'Vrångö gästhamn',            lat: 57.6094, lng: 11.7672, island: 'Vrångö',         type: 'harbor', categories: ['gasthamn'] },
  { name: 'Styrsö Tången gästhamn',     lat: 57.6183, lng: 11.7886, island: 'Styrsö',         type: 'harbor', categories: ['gasthamn'] },
  { name: 'Hönö Klåva gästhamn',        lat: 57.6722, lng: 11.6403, island: 'Hönö',           type: 'harbor', categories: ['gasthamn'] },
  { name: 'Öckerö gästhamn',            lat: 57.7042, lng: 11.6492, island: 'Öckerö',         type: 'harbor', categories: ['gasthamn'] },
  { name: 'Källö-Knippla gästhamn',     lat: 57.7478, lng: 11.6172, island: 'Källö-Knippla',  type: 'harbor', categories: ['gasthamn'] },
  { name: 'Saltholmen marina',          lat: 57.6394, lng: 11.7944, island: null,             type: 'harbor', categories: ['marina'] },

  // Bensin / drivmedel
  { name: 'Hönö Klåva drivmedel',       lat: 57.6720, lng: 11.6400, island: 'Hönö',   type: 'fuel', categories: ['bensin'] },
  { name: 'Öckerö hamn drivmedel',      lat: 57.7042, lng: 11.6492, island: 'Öckerö', type: 'fuel', categories: ['bensin'] },
  { name: 'Långedrag bränsle',          lat: 57.6628, lng: 11.8231, island: null,     type: 'fuel', categories: ['bensin'] },

  // Bastu
  { name: 'Brännö Bastubad',            lat: 57.6231, lng: 11.7503, island: 'Brännö',  type: 'sauna', categories: ['bastu'] },
  { name: 'Saltholmens Bastusällskap',  lat: 57.6394, lng: 11.7944, island: null,      type: 'sauna', categories: ['bastu'] },
  { name: 'Styrsö Bratten Bastu',       lat: 57.6183, lng: 11.7886, island: 'Styrsö',  type: 'sauna', categories: ['bastu'] },
  { name: 'Hönö Bastuförening',         lat: 57.6722, lng: 11.6403, island: 'Hönö',    type: 'sauna', categories: ['bastu'] },
]

// ── Bohuslän (Marstrand → Strömstad) ────────────────────────────────────
const BOHUSLAN = [
  // Krogar / restauranger
  { name: 'Marstrands Värdshus',        lat: 57.8867, lng: 11.5853, island: 'Marstrand',     type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Tenan Marstrand',            lat: 57.8867, lng: 11.5853, island: 'Marstrand',     type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Salt & Sill',                lat: 57.9772, lng: 11.5731, island: 'Klädesholmen',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Lasses Krog',                lat: 57.9772, lng: 11.5731, island: 'Klädesholmen',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Käringön Pensionat',         lat: 58.2467, lng: 11.4044, island: 'Käringön',      type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Lyckans restaurang Mollösund', lat: 58.0717, lng: 11.4925, island: 'Mollösund',  type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Smögens Hafvshotell',        lat: 58.3517, lng: 11.2222, island: 'Smögen',        type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Stora Hotellet Fjällbacka',  lat: 58.5942, lng: 11.2842, island: 'Fjällbacka',    type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Grebys Restaurang',          lat: 58.6936, lng: 11.2547, island: 'Grebbestad',    type: 'restaurant', categories: ['hamnkrog'] },
  { name: 'Strömstads Stadshotell',     lat: 58.9417, lng: 11.1711, island: 'Strömstad',     type: 'restaurant', categories: ['hamnkrog'] },

  // Gästhamnar
  { name: 'Marstrand gästhamn',         lat: 57.8867, lng: 11.5853, island: 'Marstrand',     type: 'harbor', categories: ['gasthamn'] },
  { name: 'Klädesholmen gästhamn',      lat: 57.9772, lng: 11.5731, island: 'Klädesholmen',  type: 'harbor', categories: ['gasthamn'] },
  { name: 'Käringön gästhamn',          lat: 58.2467, lng: 11.4044, island: 'Käringön',      type: 'harbor', categories: ['gasthamn'] },
  { name: 'Mollösund gästhamn',         lat: 58.0717, lng: 11.4925, island: 'Mollösund',     type: 'harbor', categories: ['gasthamn'] },
  { name: 'Smögen gästhamn',            lat: 58.3517, lng: 11.2222, island: 'Smögen',        type: 'harbor', categories: ['gasthamn'] },
  { name: 'Hamburgsund gästhamn',       lat: 58.5217, lng: 11.2694, island: 'Hamburgsund',   type: 'harbor', categories: ['gasthamn'] },
  { name: 'Fjällbacka gästhamn',        lat: 58.5942, lng: 11.2842, island: 'Fjällbacka',    type: 'harbor', categories: ['gasthamn'] },
  { name: 'Grebbestad gästhamn',        lat: 58.6936, lng: 11.2547, island: 'Grebbestad',    type: 'harbor', categories: ['gasthamn'] },

  // Bensin
  { name: 'Smögen drivmedel',           lat: 58.3517, lng: 11.2222, island: 'Smögen',     type: 'fuel', categories: ['bensin'] },
  { name: 'Marstrand drivmedel',        lat: 57.8867, lng: 11.5853, island: 'Marstrand',  type: 'fuel', categories: ['bensin'] },
  { name: 'Strömstad gästhamn drivmedel', lat: 58.9417, lng: 11.1711, island: 'Strömstad', type: 'fuel', categories: ['bensin'] },

  // Bastu / kallbadhus
  { name: 'Smögens kallbadhus',         lat: 58.3517, lng: 11.2222, island: 'Smögen',        type: 'sauna', categories: ['bastu', 'kallbad'] },
  { name: 'Marstrands kallbadhus',      lat: 57.8867, lng: 11.5853, island: 'Marstrand',     type: 'sauna', categories: ['bastu', 'kallbad'] },
  { name: 'Fjällbacka Bastuförening',   lat: 58.5942, lng: 11.2842, island: 'Fjällbacka',    type: 'sauna', categories: ['bastu'] },
  { name: 'Strömstads Bastusällskap',   lat: 58.9417, lng: 11.1711, island: 'Strömstad',     type: 'sauna', categories: ['bastu'] },
]

const ALL = [
  ...GOTEBORG.map(p => ({ ...p, archipelago_region: 'goteborg', city: 'Göteborg' })),
  ...BOHUSLAN.map(p => ({ ...p, archipelago_region: 'bohuslan', city: 'Bohuslän' })),
]

async function main() {
  console.log(`Seedar ${ALL.length} platser (Göteborg + Bohuslän) — Batch 1`)
  let inserted = 0, skipped = 0, failed = 0
  for (const p of ALL) {
    const slug = slugify(p.name)
    // Skip om slug eller name finns
    const { data: existing } = await sb
      .from('restaurants')
      .select('id')
      .or(`name.eq.${p.name},slug.eq.${slug}`)
      .maybeSingle()
    if (existing) {
      console.log(`⊘ ${p.name} finns redan — skip`)
      skipped++
      continue
    }
    const { error } = await sb.from('restaurants').insert({
      name: p.name,
      slug,
      latitude: p.lat,
      longitude: p.lng,
      island: p.island,
      type: p.type,
      categories: p.categories,
      archipelago_region: p.archipelago_region,
      city: p.city,
      place_data_source: 'manual',
      seasonality: 'summer_only',
      source_confidence: 'medium',
    })
    if (error) {
      console.error(`✗ ${p.name}: ${error.message}`)
      failed++
      continue
    }
    console.log(`✓ ${p.name}`)
    inserted++
  }
  console.log(`\nKlart: ${inserted} insatta, ${skipped} skippade, ${failed} misslyckades.`)
  console.log(`\nNästa steg: kör Google Places-berikning:`)
  console.log(`  node scripts/backfill-google-places-v2.mjs`)
}
main().catch(err => { console.error(err); process.exit(1) })

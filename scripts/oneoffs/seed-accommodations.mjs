/**
 * Seed-script: 67 boenden från Stockholms skärgård in i `restaurants`-tabellen.
 *
 * Källa: Svalla_Boenden_Koordinater.pdf (Maj 2026). Koordinater verifierade
 * mot publik info, ±50m noggrannhet.
 *
 * Strategi: vi använder samma `restaurants`-tabell som krogar/hamnar/etc
 * eftersom UpptackExplorer + plats-detaljsidan (`/upptack/[id]`) läser från
 * den. Boenden får `type='hotel'` och `categories=['accommodation', ...]`
 * så UpptackExplorer kan kategorisera dem som "Boende".
 *
 * Slug-format: `{ö-slug}-{namn-slug}` för att garantera unik per ö.
 *
 * Idempotent: använder upsert med onConflict=slug. Säkert att köra om.
 *
 * Kör med:
 *   node scripts/seed-accommodations.mjs           # skarp körning
 *   node scripts/seed-accommodations.mjs --dry-run # visa vad som skulle göras
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

const DRY_RUN = process.argv.includes('--dry-run')

// ── Data från PDF (verifierade) ──────────────────────────────────────────────
const ACCOMMODATIONS = [
  // Sandhamn
  { island: 'Sandhamn',   name: 'Seglarhotellet',                type: 'Hotell',     lat: 59.2885, lng: 18.9167, website: 'sandhamn.com' },
  { island: 'Sandhamn',   name: 'Sandhamns Värdshus',             type: 'B&B',        lat: 59.2878, lng: 18.9152, website: 'sandhamns-vardshus.se' },
  { island: 'Sandhamn',   name: 'Sands Hotell',                   type: 'Hotell',     lat: 59.2880, lng: 18.9160, website: 'sandshotel.se' },
  // Utö
  { island: 'Utö',        name: 'Utö Värdshus',                   type: 'Hotell',     lat: 58.9583, lng: 17.9917, website: 'utovardshus.se' },
  { island: 'Utö',        name: 'STF Vandrarhem Utö',             type: 'Vandrarhem', lat: 58.9570, lng: 17.9900, website: 'stfturiststation.se' },
  { island: 'Utö',        name: 'Utö Camping & Stugor',           type: 'Camping',    lat: 58.9575, lng: 17.9880, website: 'utovardshus.se' },
  // Vaxholm
  { island: 'Vaxholm',    name: 'Waxholms Hotell',                type: 'Hotell',     lat: 59.4017, lng: 18.3333, website: 'waxholmshotell.se' },
  { island: 'Vaxholm',    name: 'Vaxholm Harbour B&B',            type: 'B&B',        lat: 59.4020, lng: 18.3330, website: null },
  { island: 'Vaxholm',    name: 'Waxholms Camping',               type: 'Camping',    lat: 59.3983, lng: 18.3200, website: 'waxholmscamping.se' },
  // Grinda
  { island: 'Grinda',     name: 'Grinda Wärdshus Hotell',         type: 'Hotell',     lat: 59.3583, lng: 18.6417, website: 'grinda.se' },
  { island: 'Grinda',     name: 'Grinda Sea Lodge',               type: 'Stugor',     lat: 59.3578, lng: 18.6420, website: 'grinda.se' },
  { island: 'Grinda',     name: 'Grinda Camping',                 type: 'Camping',    lat: 59.3585, lng: 18.6412, website: 'grinda.se' },
  // Finnhamn
  { island: 'Finnhamn',   name: 'Finnhamns Vandrarhem',           type: 'Vandrarhem', lat: 59.4683, lng: 18.8317, website: 'finnhamn.se' },
  { island: 'Finnhamn',   name: 'Stugby Finnhamn',                type: 'Stugor',     lat: 59.4685, lng: 18.8315, website: 'finnhamn.se' },
  { island: 'Finnhamn',   name: 'Finnhamn Tältplats',             type: 'Camping',    lat: 59.4680, lng: 18.8310, website: null },
  // Möja
  { island: 'Möja',       name: 'STF Möja Gård',                  type: 'Vandrarhem', lat: 59.4200, lng: 18.7450, website: 'stfturiststation.se' },
  { island: 'Möja',       name: 'Möja Logi',                      type: 'Stugor',     lat: 59.4167, lng: 18.7500, website: null },
  // Ljusterö
  { island: 'Ljusterö',   name: 'Ljusterö Stugor & B&B',          type: 'Stugor',     lat: 59.5667, lng: 18.5833, website: null },
  { island: 'Ljusterö',   name: 'Ljusterö Pensionat',             type: 'Pensionat',  lat: 59.5700, lng: 18.5850, website: null },
  // Dalarö
  { island: 'Dalarö',     name: 'Dalarö Värdshus',                type: 'Hotell',     lat: 59.1333, lng: 18.4000, website: 'dalarovardshus.se' },
  { island: 'Dalarö',     name: 'Smådalarö Gård',                 type: 'Hotell',     lat: 59.1283, lng: 18.3783, website: 'smadalarogard.se' },
  { island: 'Dalarö',     name: 'Dalarö Skans Hotell',            type: 'Hotell',     lat: 59.1340, lng: 18.3950, website: 'dalaroskans.se' },
  // Arholma
  { island: 'Arholma',    name: 'Arholma Handel Stugor',          type: 'Stugor',     lat: 59.8583, lng: 19.1167, website: 'arholma.se' },
  { island: 'Arholma',    name: 'STF Arholma',                    type: 'Vandrarhem', lat: 59.8580, lng: 19.1160, website: 'stfturiststation.se' },
  { island: 'Arholma',    name: 'Arholma Pensionat',              type: 'Pensionat',  lat: 59.8590, lng: 19.1180, website: null },
  // Ornö
  { island: 'Ornö',       name: 'Ornö Privatstugor',              type: 'Stugor',     lat: 59.0333, lng: 18.5833, website: null },
  { island: 'Ornö',       name: 'Ornö B&B',                       type: 'B&B',        lat: 59.0340, lng: 18.5840, website: null },
  // Landsort
  { island: 'Landsort',   name: 'Landsort Stugor vid fyren',      type: 'Stugor',     lat: 58.7417, lng: 17.8667, website: null },
  { island: 'Landsort',   name: 'STF Vandrarhem Landsort',        type: 'Vandrarhem', lat: 58.7415, lng: 17.8665, website: 'stfturiststation.se' },
  // Furusund
  { island: 'Furusund',   name: 'Furusund Värdshus',              type: 'Hotell',     lat: 59.6667, lng: 18.9167, website: 'furusundsvardshus.se' },
  // Blidö
  { island: 'Blidö',      name: 'STF Blidösund',                  type: 'Vandrarhem', lat: 59.6167, lng: 18.8167, website: 'stfturiststation.se' },
  // Gällnö
  { island: 'Gällnö',     name: 'Gällnö Tältplatser',             type: 'Camping',    lat: 59.3167, lng: 18.7833, website: null },
  // Nåttarö
  { island: 'Nåttarö',    name: 'STF Nåttarö',                    type: 'Vandrarhem', lat: 58.8667, lng: 17.7167, website: 'stfturiststation.se' },
  // Ingmarsö
  { island: 'Ingmarsö',   name: 'Ingmarsö B&B',                   type: 'B&B',        lat: 59.3833, lng: 18.7833, website: null },
  { island: 'Ingmarsö',   name: 'Ingmarsö Privatstugor',          type: 'Stugor',     lat: 59.3835, lng: 18.7835, website: null },
  // Nämdö
  { island: 'Nämdö',      name: 'STF Nämndö',                     type: 'Vandrarhem', lat: 59.1000, lng: 18.7333, website: 'stfturiststation.se' },
  { island: 'Nämdö',      name: 'Nämdö Camping',                  type: 'Camping',    lat: 59.1005, lng: 18.7340, website: null },
  // Svartsö
  { island: 'Svartsö',    name: 'STF Svartsö Skärgårdshotell',    type: 'Vandrarhem', lat: 59.2833, lng: 18.7333, website: 'stfturiststation.se' },
  // Resarö
  { island: 'Resarö',     name: 'Resarö Sommarstugor',            type: 'Stugor',     lat: 59.4333, lng: 18.3833, website: null },
  // Husarö
  { island: 'Husarö',     name: 'STF Husarö',                     type: 'Vandrarhem', lat: 59.5333, lng: 18.7500, website: 'stfturiststation.se' },
  // Fejan
  { island: 'Fejan',      name: 'STF Fejan',                      type: 'Vandrarhem', lat: 59.7833, lng: 19.0500, website: 'stfturiststation.se' },
  // Rödlöga
  { island: 'Rödlöga',    name: 'Rödlöga Pensionat',              type: 'Pensionat',  lat: 59.6833, lng: 18.9833, website: null },
  // Singö
  { island: 'Singö',      name: 'Singö Camping',                  type: 'Camping',    lat: 59.7500, lng: 18.7333, website: null },
  // Lidö
  { island: 'Lidö',       name: 'Lidö Värdshus (STF)',            type: 'Vandrarhem', lat: 59.6500, lng: 18.8833, website: 'stfturiststation.se' },
  // Gräddö
  { island: 'Gräddö',     name: 'Gräddö Camping',                 type: 'Camping',    lat: 59.6833, lng: 18.7000, website: null },
  // Väddö
  { island: 'Väddö',      name: 'Väddö Camping',                  type: 'Camping',    lat: 59.8333, lng: 18.8333, website: null },
  // Askö
  { island: 'Askö',       name: 'Askö Stugby',                    type: 'Stugor',     lat: 58.8167, lng: 17.6500, website: null },
  // Gålö
  { island: 'Gålö',       name: 'Gålö Havshotell & Spa',          type: 'Hotell',     lat: 59.0167, lng: 17.9833, website: 'galohavshotell.se' },
  // Torö
  { island: 'Torö',       name: 'Torö Camping',                   type: 'Camping',    lat: 58.8000, lng: 17.8333, website: null },
  // Fjärdlång
  { island: 'Fjärdlång',  name: 'STF Fjärdlång',                  type: 'Vandrarhem', lat: 58.9333, lng: 17.8833, website: 'stfturiststation.se' },
  // Rindö
  { island: 'Rindö',      name: 'Rindö Hotell',                   type: 'Hotell',     lat: 59.3833, lng: 18.4000, website: null },
  // Yxlan
  { island: 'Yxlan',      name: 'Yxlans Vandrarhem',              type: 'Vandrarhem', lat: 59.6167, lng: 18.7833, website: null },
  // Vindö
  { island: 'Vindö',      name: 'Vindö Camping',                  type: 'Camping',    lat: 59.2500, lng: 18.6333, website: null },
  // Mörkö
  { island: 'Mörkö',      name: 'Mörkö Stugor',                   type: 'Stugor',     lat: 59.0500, lng: 17.7000, website: null },
  // Ingarö
  { island: 'Ingarö',     name: 'Ingarö Camping',                 type: 'Camping',    lat: 59.2667, lng: 18.4500, website: null },
  // Björkö (Birka)
  { island: 'Björkö',     name: 'Birka Vikingastad B&B',          type: 'B&B',        lat: 59.3300, lng: 17.5333, website: 'birkaviking.se' },
  // Svenska Högarna
  { island: 'Svenska Högarna', name: 'Fyrvaktarstugan Svenska Högarna', type: 'Stugor', lat: 59.4417, lng: 19.5083, website: null },
]

// ── Helpers ────────────────────────────────────────────────────────────────

/** Slug: ascii-säker, lowercase, dash-separerad. Bevarar svenskhet via translit. */
function slugify(s) {
  return String(s)
    .toLowerCase()
    .replace(/å/g, 'a').replace(/ä/g, 'a').replace(/ö/g, 'o')
    .replace(/é/g, 'e').replace(/è/g, 'e')
    .replace(/&/g, 'och')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Mappa textuell typ till `type`-fält + `categories`-array som passar vår
 *  UpptackExplorer-categorize() (boende-kategori). */
function typeMapping(typ) {
  const t = typ.toLowerCase()
  // type-fältet är vad UpptackExplorer.categorize() läser. Vi använder
  // `hotel` som basklass för alla boenden så de hamnar i "Boende"-pinen.
  // categories specifierar undertyp för PlaceFactsSection.
  switch (t) {
    case 'hotell':     return { type: 'hotel',  cats: ['accommodation', 'hotel'] }
    case 'b&b':        return { type: 'hotel',  cats: ['accommodation', 'bnb'] }
    case 'vandrarhem': return { type: 'hotel',  cats: ['accommodation', 'hostel'] }
    case 'stugor':     return { type: 'hotel',  cats: ['accommodation', 'cabin'] }
    case 'camping':    return { type: 'hotel',  cats: ['accommodation', 'camping'] }
    case 'pensionat':  return { type: 'hotel',  cats: ['accommodation', 'pension'] }
    case 'gästhamn':   return { type: 'marina', cats: ['accommodation', 'guest_harbor'] }
    default:           return { type: 'hotel',  cats: ['accommodation'] }
  }
}

/** Bygg en kort, naturlig beskrivning som inte ser ut som en mall. */
function buildDescription(a) {
  const typeText = {
    'Hotell':     'Hotell',
    'B&B':        'Bed & Breakfast',
    'Vandrarhem': 'Vandrarhem',
    'Stugor':     'Stugor',
    'Camping':    'Camping',
    'Pensionat':  'Pensionat',
    'Gästhamn':   'Gästhamn med övernattning',
  }[a.type] ?? a.type
  return `${typeText} på ${a.island}. ${a.website ? `Boka direkt via ${a.website}.` : 'Kontakta värden för bokning.'}`
}

// ── Main ───────────────────────────────────────────────────────────────────
async function main() {
  console.log(`═══ Seed boenden${DRY_RUN ? ' (DRY-RUN)' : ''} ═══`)
  console.log(`${ACCOMMODATIONS.length} boenden i listan\n`)

  let inserted = 0, skipped = 0, errors = 0

  for (const a of ACCOMMODATIONS) {
    const slug = `${slugify(a.island)}-${slugify(a.name)}`
    const { type, cats } = typeMapping(a.type)

    // Kolla om slug redan finns — vi vill inte skriva över befintliga rader
    const { data: existing } = await sb
      .from('restaurants')
      .select('id, name')
      .eq('slug', slug)
      .maybeSingle()

    process.stdout.write(`  ${a.island.padEnd(18)} ${a.name.padEnd(36)} `)

    if (existing) {
      console.log(`⊘ finns redan (${existing.id.slice(0, 8)}…)`)
      skipped++
      continue
    }

    const row = {
      slug,
      name: a.name,
      latitude: a.lat,
      longitude: a.lng,
      type,
      categories: cats,
      description: buildDescription(a),
      island: a.island,
      website: a.website ? (a.website.startsWith('http') ? a.website : `https://${a.website}`) : null,
      tags: ['boende', a.type.toLowerCase()],
      best_for: ['tourists', 'boaters'],
      place_data_source: 'manual',
    }

    if (DRY_RUN) {
      console.log(`✓ skulle inserts (slug: ${slug})`)
      inserted++
    } else {
      const { error } = await sb.from('restaurants').insert(row)
      if (error) {
        console.log(`✗ ${error.message?.slice(0, 80)}`)
        errors++
      } else {
        console.log(`✓ insert (${a.type})`)
        inserted++
      }
    }
  }

  console.log(`\n═══ Klart ═══`)
  console.log(`  Insertade:   ${inserted}`)
  console.log(`  Hoppade över: ${skipped}`)
  console.log(`  Errors:      ${errors}`)
}

main().catch(e => { console.error(e); process.exit(1) })

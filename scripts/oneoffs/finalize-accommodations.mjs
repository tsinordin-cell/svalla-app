/**
 * Finalize accommodations — hand-curated backfill för de obskyra fallen.
 *
 * För varje boende som FORTFARANDE saknar google_place_id:
 *   1. MANUAL_OVERRIDE-tabellen mappar namnet till en bättre sökterm
 *      ELLER null (som radering — platsen är inte en riktig plats)
 *   2. Söker Google med override-term + använder Google's koord/foton/rating
 *   3. Acceptans-regler: lättare nu eftersom vi vet att vi söker rätt sak
 *
 * Detta körs EFTER backfill-google-places-v2.mjs.
 *
 * Kör:
 *   node scripts/finalize-accommodations.mjs --dry-run
 *   node scripts/finalize-accommodations.mjs
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const GOOGLE_KEY = process.env.GOOGLE_PLACES_API_KEY
const DRY_RUN = process.argv.includes('--dry-run')

// ── MANUAL OVERRIDES ───────────────────────────────────────────────────────
// Mapping: vårt boende-namn → bättre Google-sökterm
//   String   → använd istället för auto-byggd term
//   null     → RADERA raden (inte en riktig identifierbar plats)
//   undefined → använd default (boende-namn + ö + Sverige)
const MANUAL_OVERRIDES = {
  // STF-anläggningar — Google kallar dem ofta annorlunda
  'STF Möja Gård':                  'Möja Vandrarhem STF',
  'STF Husarö':                     'Husarö Vandrarhem STF',
  'STF Fjärdlång':                  'Fjärdlångs Vandrarhem',
  'STF Fejan':                      'Fejan Outdoor Vandrarhem',
  'STF Blidösund':                  'Blidösund Vandrarhem STF',
  'STF Nämndö':                     'Nämdö Vandrarhem STF',

  // Mer specifika sökord för svåra fall
  'Möja Logi':                      'Berg Stugby Möja',
  'Stugby Finnhamn':                'Finnhamns Stugby',
  'Ljusterö Stugor & B&B':          'Ljusterö Skärgårdsstugor',
  'Ornö B&B':                       'Sundby Bed Breakfast Ornö',
  'Rödlöga Pensionat':              'Pensionat Lugnet Rödlöga',
  'Yxlans Vandrarhem':              'Yxlans Vandrarhem Norrtälje',
  'Gräddö Camping':                 'Gräddö Marina Camping',
  'Grinda Camping':                 'Grinda Stugby Camping',
  'Singö Camping':                  'Singö Camping Norrtälje',
  'Vindö Camping':                  'Vindö Värmdö camping',
  'Torö Camping':                   'Torö Naturreservat Nynäshamn',
  'Väddö Camping':                  'Väddö Sandvikens Camping',
  'Askö Stugby':                    'Askö Stugby Trosa',
  'Nämdö Camping':                  'Nämdö Camping Värmdö',
  'Arholma Pensionat':              'Arholma Bed Breakfast',
  'Landsort Stugor vid fyren':      'Landsorts Gästhamn Stugor',
  'Smådalarö Gård':                 'Smådalarö Gård Hotell Spa',
  'Gålö Havshotell & Spa':          'Gålö havshotell',
  'Rindö Hotell':                   'Rindö Hamn Vaxholm',
  'Utö Värdshus':                   'Utö Värdshus Hotell Konferens',

  // GENERIC platser som inte är riktiga ställen — RADERA
  'Ornö Privatstugor':              null,
  'Ingmarsö Privatstugor':          null,
  'Resarö Sommarstugor':            null,
  'Mörkö Stugor':                   null,
  'Ljusterö Pensionat':             null,
  'Fyrvaktarstugan Svenska Högarna': null,
  // Dessa "boenden" finns inte som separata enheter på Google — radera
  // (PDF:en hade uppskattade koord, men ingen riktig anläggning):
  'Askö Stugby':                    null,
  'Nämdö Camping':                  null,
  'Vindö Camping':                  null,
  'Torö Camping':                   null,
  'STF Husarö':                     null,
  'STF Nämndö':                     null,
  'Yxlans Vandrarhem':              null,
  'Gräddö Camping':                 null,
  'STF Blidösund':                  null,
  'STF Fjärdlång':                  null,
  'Singö Camping':                  null,
  'Ljusterö Stugor & B&B':          null,
  'Stugby Finnhamn':                null,  // dublett av Finnhamns Vandrarhem
  'Möja Logi':                      null,  // dublett — STF Möja Gård är samma plats
  'Ornö B&B':                       null,  // ingen tydlig identifierbar plats
  'Grinda Camping':                 null,  // Grinda Stugby är samma plats — bättre matchar redan
}

// ── Helpers ────────────────────────────────────────────────────────────────

function trigrams(s) {
  const padded = '  ' + s.toLowerCase() + '  '
  const set = new Set()
  for (let i = 0; i < padded.length - 2; i++) set.add(padded.slice(i, i + 3))
  return set
}
function nameSimilarity(a, b) {
  if (!a || !b) return 0
  if (a === b) return 1
  const A = trigrams(a), B = trigrams(b)
  let intersect = 0
  A.forEach(t => { if (B.has(t)) intersect++ })
  const union = A.size + B.size - intersect
  return union === 0 ? 0 : intersect / union
}
function distanceMeters(a, b) {
  const R = 6_371_000
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat), dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

const PLACES_BASE = 'https://places.googleapis.com/v1'
const PLACE_FIELDS = [
  'id', 'displayName', 'formattedAddress', 'location',
  'internationalPhoneNumber', 'nationalPhoneNumber', 'websiteUri',
  'rating', 'userRatingCount', 'photos',
].join(',')

async function searchGlobal(query) {
  const r = await fetch(`${PLACES_BASE}/places:searchText`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': GOOGLE_KEY,
      'X-Goog-FieldMask': `places.${PLACE_FIELDS.split(',').join(',places.')}`,
    },
    body: JSON.stringify({
      textQuery: query, languageCode: 'sv', regionCode: 'se', maxResultCount: 3,
    }),
  })
  if (!r.ok) throw new Error(`Google ${r.status}`)
  const data = await r.json()
  return data.places ?? []
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`═══ Finalize accommodations${DRY_RUN ? ' (DRY-RUN)' : ''} ═══\n`)

  const { data: targets } = await sb
    .from('restaurants')
    .select('id, name, slug, latitude, longitude, island, categories')
    .contains('categories', ['accommodation'])
    .is('google_place_id', null)
    .order('name')

  console.log(`${targets.length} boenden utan Google-data\n`)

  let updated = 0, deleted = 0, skipped = 0, conflictResolved = 0, errors = 0

  for (const p of targets) {
    process.stdout.write(`  ${p.name.padEnd(38)} `)

    const override = MANUAL_OVERRIDES[p.name]

    // Markerad för radering
    if (override === null) {
      if (DRY_RUN) {
        console.log(`✗ skulle RADERA (ej riktig plats)`)
        deleted++
      } else {
        const { error } = await sb.from('restaurants').delete().eq('id', p.id)
        if (error) { console.log(`✗ delete failed: ${error.message}`); errors++ }
        else { console.log(`✗ RADERAD`); deleted++ }
      }
      continue
    }

    // Använd override-term om finns, annars default
    const term = override ?? `${p.name}${p.island && !p.name.toLowerCase().includes(p.island.toLowerCase()) ? ' ' + p.island : ''} Sverige`

    try {
      const results = await searchGlobal(term)
      if (results.length === 0) {
        console.log(`⊘ inga träffar för "${term.slice(0, 40)}…"`)
        skipped++
        continue
      }

      const match = results[0]
      const matchName = match.displayName?.text ?? ''
      if (!match.location) { console.log(`⊘ ingen location`); skipped++; continue }

      const dist = distanceMeters(
        { lat: p.latitude, lng: p.longitude },
        { lat: match.location.latitude, lng: match.location.longitude },
      )
      const sim = nameSimilarity(p.name.toLowerCase(), matchName.toLowerCase())

      // Hand-curated terms — men vi VÄGRAR ändå om matchen är uppenbart fel:
      //   - >30km bort + sim < 0.40 = troligen fel plats, skip
      //   - sim < 0.15 (helt olika namn) = skip oavsett dist
      if (dist > 30000 && sim < 0.40) {
        console.log(`⊘ skip (${(dist/1000).toFixed(1)}km bort, sim ${sim.toFixed(2)}) → "${matchName}"`)
        skipped++
        continue
      }
      if (sim < 0.15) {
        console.log(`⊘ skip (sim ${sim.toFixed(2)}, helt olika namn) → "${matchName}"`)
        skipped++
        continue
      }

      const update = {
        google_place_id: match.id,
        place_data_source: 'google',
        formatted_address: match.formattedAddress ?? null,
        phone: match.internationalPhoneNumber ?? match.nationalPhoneNumber ?? null,
        website: match.websiteUri ?? null,
        google_rating: match.rating ?? null,
        google_ratings_total: match.userRatingCount ?? null,
        google_rating_updated: new Date().toISOString(),
        google_photo_refs: match.photos?.slice(0, 6).map(ph => ({
          reference: ph.name, width: ph.widthPx, height: ph.heightPx,
          attribution: ph.authorAttributions?.[0]?.displayName ?? null,
        })) ?? null,
        latitude: match.location.latitude,
        longitude: match.location.longitude,
      }

      if (DRY_RUN) {
        console.log(`✓ skulle update sim ${sim.toFixed(2)} ${dist.toFixed(0)}m → ${matchName}`)
        updated++
        continue
      }

      const { error: upErr } = await sb.from('restaurants').update(update).eq('id', p.id)
      if (!upErr) {
        console.log(`✓ ${match.rating ?? '–'}★ → ${matchName}`)
        updated++
        continue
      }

      // Conflict resolution
      if (upErr.message?.includes('google_place_id_key')) {
        const { data: blocker } = await sb
          .from('restaurants').select('id, name').eq('google_place_id', match.id).maybeSingle()
        if (blocker) {
          const blockerSim = nameSimilarity(p.name.toLowerCase(), blocker.name.toLowerCase())
          if (sim > blockerSim) {
            await sb.from('restaurants').update({
              google_place_id: null, google_photo_refs: null, google_rating: null,
              google_ratings_total: null, google_rating_updated: null,
              place_data_source: 'manual',
            }).eq('id', blocker.id)
            const { error: retryErr } = await sb.from('restaurants').update(update).eq('id', p.id)
            if (!retryErr) {
              console.log(`✓ resolved conflict (vann mot "${blocker.name}")`)
              conflictResolved++
              continue
            }
          }
          console.log(`⊘ blockerad av "${blocker.name}"`)
          skipped++
        } else {
          console.log(`✗ conflict utan blocker`)
          errors++
        }
      } else {
        console.log(`✗ ${upErr.message?.slice(0, 60)}`)
        errors++
      }
    } catch (e) {
      console.log(`✗ ${e.message?.slice(0, 60)}`)
      errors++
    }

    await new Promise(r => setTimeout(r, 130))
  }

  console.log(`\n═══ Klart ═══`)
  console.log(`  Uppdaterade:        ${updated}`)
  console.log(`  Conflict-resolved:  ${conflictResolved}`)
  console.log(`  Raderade:           ${deleted}`)
  console.log(`  Skippade:           ${skipped}`)
  console.log(`  Errors:             ${errors}`)
}

main().catch(e => { console.error(e); process.exit(1) })

/**
 * Backfill v2: aggressiv, namn-verifierande Google-matchning.
 *
 * Skillnader mot v1:
 *   1. Söker Google GLOBALT (utan locationBias) — så indexerade platser
 *      hittas även om vår koord är grov
 *   2. Verifierar matchen via trigram-likhet på namn (>= 0.45)
 *   3. Använder GOOGLE'S koordinat (vår är ofta ±50-500m off)
 *   4. Hanterar duplicate-key på google_place_id:
 *      - Slår upp den blockerande raden
 *      - Jämför namn-likhet mellan vår vs blockerare
 *      - Vinnaren får place_id:n, förloraren får sitt gpid rensat
 *   5. Verifierar koordinat-rimlighet: Google's träff måste ligga inom
 *      Sverige (54-70°N, 5-25°E) — annars skip
 *
 * Kör med:
 *   node scripts/backfill-google-places-v2.mjs --dry-run
 *   node scripts/backfill-google-places-v2.mjs
 *   node scripts/backfill-google-places-v2.mjs --only=accommodation  # bara boenden
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
if (!SUPABASE_URL || !SERVICE_KEY || !GOOGLE_KEY) {
  console.error('Saknar env: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY / GOOGLE_PLACES_API_KEY')
  process.exit(1)
}

const sb = createClient(SUPABASE_URL, SERVICE_KEY)
const DRY_RUN = process.argv.includes('--dry-run')
const ONLY_ACCOMMODATION = process.argv.includes('--only=accommodation')

const PLACES_BASE = 'https://places.googleapis.com/v1'
const PLACE_FIELDS = [
  'id', 'displayName', 'formattedAddress', 'location',
  'internationalPhoneNumber', 'nationalPhoneNumber', 'websiteUri',
  'rating', 'userRatingCount', 'photos',
].join(',')

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
function isInSweden(lat, lng) {
  return typeof lat === 'number' && typeof lng === 'number' &&
    lat > 54 && lat < 70 && lng > 5 && lng < 25
}

/** Sök Google Places — utan locationBias, region SE.
 *  Returnerar upp till 3 träffar, sorterade efter Google's egen relevans. */
async function searchGlobal(query) {
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
      maxResultCount: 3,
    }),
  })
  if (!r.ok) throw new Error(`Google ${r.status}: ${(await r.text()).slice(0, 200)}`)
  const data = await r.json()
  return data.places ?? []
}

/** Bygg sökterm: "{namn}, {ö}, Sverige" om ön finns och inte redan i namnet. */
function buildSearchTerm(p) {
  const parts = [p.name]
  if (p.island && !p.name.toLowerCase().includes(p.island.toLowerCase())) {
    parts.push(p.island)
  }
  parts.push('Sverige')
  return parts.join(', ')
}

/** Välj bästa Google-träff baserat på namn-likhet. */
function pickBestMatch(googleResults, ourName) {
  const ourNorm = ourName.toLowerCase()
  let best = null, bestSim = 0
  for (const g of googleResults) {
    const gName = g.displayName?.text ?? ''
    const sim = nameSimilarity(ourNorm, gName.toLowerCase())
    if (sim > bestSim) { bestSim = sim; best = g }
  }
  return { match: best, sim: bestSim }
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`═══ Backfill v2${DRY_RUN ? ' (DRY-RUN)' : ''}${ONLY_ACCOMMODATION ? ' [accommodations only]' : ''} ═══\n`)

  let q = sb.from('restaurants')
    .select('id, name, slug, latitude, longitude, island, categories')
    .is('google_place_id', null)
    .not('latitude', 'is', null)
    .not('longitude', 'is', null)
    .order('name')

  const { data: places, error } = await q
  if (error) { console.error(error); process.exit(1) }

  // Filtrera till boenden om flagga satt
  const targets = ONLY_ACCOMMODATION
    ? places.filter(p => Array.isArray(p.categories) && p.categories.includes('accommodation'))
    : places

  console.log(`Targets: ${targets.length} platser utan google_place_id\n`)

  let updated = 0, conflictResolved = 0, skipped = 0, errors = 0

  for (const p of targets) {
    process.stdout.write(`  ${p.name.padEnd(40)} `)

    try {
      const term = buildSearchTerm(p)
      const results = await searchGlobal(term)
      if (results.length === 0) {
        console.log(`⊘ Google returnerade 0 träffar för "${term}"`)
        skipped++
        continue
      }

      const { match, sim } = pickBestMatch(results, p.name)
      if (!match) {
        console.log(`⊘ ingen rimlig match (sim 0)`)
        skipped++
        continue
      }

      // Verifiera att Google's koord är i Sverige
      if (!match.location || !isInSweden(match.location.latitude, match.location.longitude)) {
        console.log(`⊘ Google-koord utanför Sverige (${match.location?.latitude}, ${match.location?.longitude})`)
        skipped++
        continue
      }

      // Kombinerad accept-check: namn-likhet + koord-närhet + special-cases.
      //
      // VIKTIGT: Många av VÅRA koordinater är grova (±50-500m enligt PDF) eller
      // direkt felaktiga (Utö Värdshus seedad 19km från riktig plats). Vi måste
      // därför LITA PÅ GOOGLE'S KOORD så fort namnet matchar tillräckligt.
      //
      // Regler (i prioritetsordning):
      //   1. sim >= 0.50               → accept oavsett dist (starkt namn-match)
      //   2. dist <= 500m + sim >= 0.20 → accept (nära + svagt namn-stöd)
      //   3. sim >= 0.30 + dist <= 30km → accept (samma region, hyfsat namn)
      //   4. STF-special: båda har "STF" + dist <= 3km → accept (STF byter
      //      ofta namn — "STF Möja Gård" = "Möja Vandrarhem (STF)")
      //   5. Adress-prefix-match: Google's adress nämner ön + dist <= 30km
      //      → accept (geografisk verifiering kompenserar för låg namn-sim)
      const dist = distanceMeters(
        { lat: p.latitude, lng: p.longitude },
        { lat: match.location.latitude, lng: match.location.longitude },
      )
      const matchName = match.displayName?.text ?? ''
      const ourLow = p.name.toLowerCase()
      const matchLow = matchName.toLowerCase()
      const isSTF = /\bstf\b/i.test(p.name) && /\bstf\b/i.test(matchName)
      const addressMentionsIsland = p.island
        && match.formattedAddress
        && match.formattedAddress.toLowerCase().includes(p.island.toLowerCase())

      // KRITISK FILTER: Typ-keyword måste matcha mellan vår + Google's namn.
      // Om vår plats heter "X Camping" och Google's match är "X Krog", är det
      // INTE samma plats även om sim är hög. Förhindrar fel-data i DB:n.
      // BARA tydliga, inkompatibla typer. "Gård" / "skans" / "hotell" är OFTA
      // varianter av samma plats (Smådalarö Gård = ett hotell). Här listar
      // vi bara typer som GARANTERAT inte är samma sak.
      const TYPE_KEYWORDS = [
        ['camping', 'camping'],   // camping ≠ vandrarhem ≠ hotell
        ['vandrarhem', 'vandrarhem'],
        ['stugor', 'stug'], ['stugby', 'stug'],   // stug-boende
        ['krog', 'krog'],         // krog ≠ vandrarhem
        ['café', 'café'], ['cafe', 'café'],
      ]
      // ABSOLUT MAX-DISTANCE: 50km är hard cap. Längre = annan plats helt
      // (t.ex. "Torö Camping" → "Torsö Camping" 233km bort är annan kommun).
      if (dist > 50000) {
        console.log(`⊘ skip (>50km bort: ${(dist/1000).toFixed(1)}km) → "${matchName}"`)
        skipped++
        continue
      }

      // Hitta vårt typ-keyword + Google's typ-keyword
      const ourTypeKw = TYPE_KEYWORDS.find(([ours]) => ourLow.includes(ours))
      const matchTypeKw = TYPE_KEYWORDS.find(([ours]) => matchLow.includes(ours))

      // Typ-konflikt = vi har typ X, Google har typ Y, X ≠ Y
      // (Detta filtrerar bort "Camping → Stugby", "Hotell → Bad" etc)
      // Tolerans: STF-platser kan byta typ (gård→vandrarhem)
      // Tolerans: Google's namn har OFTA ingen typ alls (bara "Arholma Handel"
      // för "Arholma Handel Stugor"), då tillåter vi det.
      let typeConflict = false
      if (ourTypeKw && matchTypeKw && ourTypeKw[1] !== matchTypeKw[1]) {
        // Har båda typ-keyword men olika → konflikt
        // Specialfall: stf+vandrarhem är OK
        if (!(isSTF && matchTypeKw[1] === 'vandrarhem')) {
          typeConflict = true
        }
      }

      let accepted = false
      let acceptReason = ''
      if (typeConflict) {
        // Vid konflikt: bara accept om sim >= 0.70 (nästan identiska namn)
        if (sim >= 0.70) { accepted = true; acceptReason = 'nästan identisk trots typ-skillnad' }
      } else {
        if (sim >= 0.50) { accepted = true; acceptReason = 'starkt namn' }
        else if (dist <= 500 && sim >= 0.20) { accepted = true; acceptReason = 'nära + namn' }
        else if (sim >= 0.35 && dist <= 5000) { accepted = true; acceptReason = 'samma trakt' }
        else if (isSTF && dist <= 3000) { accepted = true; acceptReason = 'STF-match' }
        // "ö i adress": kräv högre sim eftersom adress-match är svag indikator
        else if (addressMentionsIsland && sim >= 0.40) { accepted = true; acceptReason = 'ö i adress' }
      }

      if (!accepted) {
        const why = typeConflict ? `typ-konflikt (${ourTypeKw?.[1]}≠${matchTypeKw?.[1]})` : `sim ${sim.toFixed(2)}, ${dist.toFixed(0)}m`
        console.log(`⊘ skip (${why}) → "${matchName}"`)
        skipped++
        continue
      }

      // Bygg update-objekt — vi LITAR PÅ GOOGLE'S KOORD
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
          reference: ph.name,
          width: ph.widthPx,
          height: ph.heightPx,
          attribution: ph.authorAttributions?.[0]?.displayName ?? null,
        })) ?? null,
        latitude: match.location.latitude,
        longitude: match.location.longitude,
      }

      if (DRY_RUN) {
        console.log(`✓ skulle update [${acceptReason}] sim ${sim.toFixed(2)} ${dist.toFixed(0)}m → ${match.displayName?.text}`)
        updated++
        continue
      }

      // Försök UPDATE
      const { error: upErr } = await sb.from('restaurants').update(update).eq('id', p.id)

      if (!upErr) {
        console.log(`✓ ${match.rating ?? '–'}★ (sim ${sim.toFixed(2)})`)
        updated++
        continue
      }

      // Om unique-key conflict på google_place_id — försök resolva
      if (upErr.message?.includes('google_place_id_key')) {
        // Hitta blockerande rad
        const { data: blocker } = await sb
          .from('restaurants')
          .select('id, name, slug, island')
          .eq('google_place_id', match.id)
          .maybeSingle()

        if (!blocker) {
          console.log(`✗ unique-conflict men ingen blockerare hittad`)
          errors++
          continue
        }

        // Jämför namn-likhet — vinnaren får gpid:n
        const blockerSim = nameSimilarity(p.name.toLowerCase(), blocker.name.toLowerCase())
        const wonByUs = sim > blockerSim + 0.05  // krav: vi är tydligt bättre

        if (wonByUs) {
          // Rensa blockerarens gpid + alla derived fält
          const { error: clearErr } = await sb.from('restaurants').update({
            google_place_id: null,
            google_photo_refs: null,
            google_rating: null,
            google_ratings_total: null,
            google_rating_updated: null,
            place_data_source: 'manual',
          }).eq('id', blocker.id)

          if (clearErr) {
            console.log(`✗ kunde inte rensa blockerare ${blocker.name}: ${clearErr.message}`)
            errors++
            continue
          }
          // Retry update på vår rad
          const { error: retryErr } = await sb.from('restaurants').update(update).eq('id', p.id)
          if (retryErr) {
            console.log(`✗ retry failed: ${retryErr.message}`)
            errors++
            continue
          }
          console.log(`✓ resolved conflict (vi vann mot "${blocker.name}", sim ${sim.toFixed(2)} > ${blockerSim.toFixed(2)})`)
          conflictResolved++
        } else {
          console.log(`⊘ blockerad av "${blocker.name}" (deras sim ${blockerSim.toFixed(2)} >= vår ${sim.toFixed(2)})`)
          skipped++
        }
      } else {
        console.log(`✗ ${upErr.message?.slice(0, 80)}`)
        errors++
      }
    } catch (e) {
      console.log(`✗ ${e.message?.slice(0, 80)}`)
      errors++
    }

    // Throttle 8 req/s för säkerhet
    await new Promise(r => setTimeout(r, 130))
  }

  console.log(`\n═══ Klart ═══`)
  console.log(`  Uppdaterade:        ${updated}`)
  console.log(`  Conflict-resolved:  ${conflictResolved}`)
  console.log(`  Skippade:           ${skipped}`)
  console.log(`  Errors:             ${errors}`)
}

main().catch(e => { console.error(e); process.exit(1) })

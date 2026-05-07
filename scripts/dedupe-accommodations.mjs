/**
 * Dedupe-script: hittar dubletter där en boende-rad är samma fysiska plats
 * som en befintlig restaurang. Mergar dem genom att:
 *
 *   1. Behålla den BEFINTLIGA restaurangen (har Google-data, recensioner,
 *      check-ins osv)
 *   2. Lägga till 'accommodation' + boende-undertyp i dess `categories`
 *      så den visas BÅDE i krog-filtret OCH i boende-filtret
 *   3. Lägga till 'boende' i `tags` om det saknas
 *   4. RADERA den dubblerade boende-raden vi seedade
 *
 * Matchnings-strategi:
 *   - Slug-namn-likhet (efter ö-prefix bortskalat) ELLER
 *   - Inom 80 meter + namn delar minst 3 tecken
 *
 * Kör med:
 *   node scripts/dedupe-accommodations.mjs --dry-run    # visa lista, ingen ändring
 *   node scripts/dedupe-accommodations.mjs              # skarp körning
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const DRY_RUN = process.argv.includes('--dry-run')

// ── Helpers ────────────────────────────────────────────────────────────────

function distanceMeters(a, b) {
  const R = 6_371_000
  const toRad = d => (d * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat), lat2 = toRad(b.lat)
  const x = Math.sin(dLat/2)**2 + Math.sin(dLng/2)**2 * Math.cos(lat1) * Math.cos(lat2)
  return 2 * R * Math.asin(Math.sqrt(x))
}

/** Normalisera namn för matchning: lowercase, ta bort ö-namn och vanliga
 *  ord som "stf", "vandrarhem", "&", "hotell", parenteser. */
function normalizeName(name, island) {
  let s = String(name).toLowerCase()
  // Ta bort ö-namnet om det finns med
  if (island) s = s.replace(island.toLowerCase(), '')
  // Ta bort vanliga ord/symboler
  s = s
    .replace(/\(stf\)|\bstf\b/g, '')
    .replace(/[()&]/g, '')
    .replace(/\b(vandrarhem|hotell|värdshus|vardshus|värdhus|stugor|camping|pensionat|b&b|bb|gård|gard|krog|kafé|cafe|kafe|bistro|restaurang)\b/g, '')
    .replace(/\s+/g, ' ')
    .trim()
  return s
}

/** Mät namn-likhet: andel gemensamma karaktärer (Jaccard på 3-grams). */
function nameSimilarity(a, b) {
  if (!a || !b) return 0
  if (a === b) return 1
  if (a.length < 2 || b.length < 2) return a === b ? 1 : 0
  function trigrams(s) {
    const padded = '  ' + s + '  '
    const tris = new Set()
    for (let i = 0; i < padded.length - 2; i++) tris.add(padded.slice(i, i + 3))
    return tris
  }
  const A = trigrams(a), B = trigrams(b)
  let intersect = 0
  A.forEach(t => { if (B.has(t)) intersect++ })
  const union = A.size + B.size - intersect
  return union === 0 ? 0 : intersect / union
}

// ── Main ───────────────────────────────────────────────────────────────────

async function main() {
  console.log(`═══ Boende-dedupe${DRY_RUN ? ' (DRY-RUN)' : ''} ═══\n`)

  // Hämta alla boenden vi seedade (har 'accommodation' i categories)
  const { data: accommodations } = await sb
    .from('restaurants')
    .select('id, name, slug, latitude, longitude, island, categories, tags')
    .contains('categories', ['accommodation'])

  // Hämta alla rader med google_place_id (de "riktiga" anläggningarna)
  const { data: anchored } = await sb
    .from('restaurants')
    .select('id, name, slug, latitude, longitude, island, categories, tags, type, google_place_id')
    .not('google_place_id', 'is', null)

  console.log(`Boenden: ${accommodations.length}, Befintliga med Google-id: ${anchored.length}\n`)

  const matches = []

  for (const acc of accommodations) {
    if (!acc.latitude || !acc.longitude) continue
    const accNorm = normalizeName(acc.name, acc.island)

    for (const ex of anchored) {
      if (!ex.latitude || !ex.longitude) continue
      if (ex.id === acc.id) continue   // samma rad

      const dist = distanceMeters(
        { lat: acc.latitude, lng: acc.longitude },
        { lat: ex.latitude, lng: ex.longitude },
      )
      if (dist > 200) continue

      const exNorm = normalizeName(ex.name, ex.island)
      const sim = nameSimilarity(accNorm, exNorm)

      // Match-villkor:
      //   - <80m + 3-grams-likhet >= 0.30
      //   - 80-200m + 3-grams-likhet >= 0.55
      const matched = (dist <= 80 && sim >= 0.30) || (dist > 80 && sim >= 0.55)
      if (matched) {
        matches.push({ acc, ex, dist, sim })
        break  // ta första match per boende
      }
    }
  }

  console.log(`Hittade ${matches.length} dubletter:\n`)
  matches.forEach((m, i) => {
    console.log(`  ${(i+1).toString().padStart(2)}. RADERA: ${m.acc.name.padEnd(36)} (${m.acc.island})`)
    console.log(`      → MERGAR med: ${m.ex.name.padEnd(36)} (${m.ex.island ?? '–'})  [${m.dist.toFixed(0)}m, sim ${m.sim.toFixed(2)}]`)
  })

  if (DRY_RUN || matches.length === 0) {
    console.log(`\n${DRY_RUN ? 'Dry-run klar.' : 'Inget att göra.'}`)
    return
  }

  console.log(`\nKör skarp merge…`)
  let merged = 0, errors = 0

  for (const m of matches) {
    // Slå ihop categories: behåll restaurangens befintliga + lägg till boende-kategorier
    const exCats = new Set(m.ex.categories ?? [])
    for (const c of (m.acc.categories ?? [])) exCats.add(c)
    const exTags = new Set(m.ex.tags ?? [])
    for (const t of (m.acc.tags ?? [])) exTags.add(t)

    // 1) Uppdatera den BEFINTLIGA raden
    const { error: upErr } = await sb
      .from('restaurants')
      .update({
        categories: Array.from(exCats),
        tags: Array.from(exTags),
      })
      .eq('id', m.ex.id)

    if (upErr) {
      console.log(`  ✗ ${m.acc.name}: ${upErr.message}`)
      errors++
      continue
    }

    // 2) Radera den dubblerade boende-raden
    const { error: delErr } = await sb.from('restaurants').delete().eq('id', m.acc.id)
    if (delErr) {
      console.log(`  ✗ ${m.acc.name}: kunde inte radera — ${delErr.message}`)
      errors++
      continue
    }

    console.log(`  ✓ ${m.acc.name} → mergad till ${m.ex.name}`)
    merged++
  }

  console.log(`\n═══ Klart ═══`)
  console.log(`  Mergade: ${merged}`)
  console.log(`  Errors:  ${errors}`)
}

main().catch(e => { console.error(e); process.exit(1) })

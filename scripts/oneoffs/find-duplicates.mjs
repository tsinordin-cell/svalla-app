/**
 * Hitta dubletter: platser där två rader pekar på samma fysiska plats.
 * Vi söker på google_place_id (om vi har) eller väldigt nära koord + liknande namn.
 */
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env.local') })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

// Hämta alla med google_place_id satt
const { data: withGpid } = await sb
  .from('restaurants')
  .select('id, name, google_place_id, latitude, longitude, slug, image_url')
  .not('google_place_id', 'is', null)

// Gruppera på google_place_id
const groups = {}
for (const r of withGpid) {
  if (!groups[r.google_place_id]) groups[r.google_place_id] = []
  groups[r.google_place_id].push(r)
}

const dupGroups = Object.values(groups).filter(g => g.length > 1)
console.log(`\n═══ Dubletter på google_place_id: ${dupGroups.length} grupper ═══`)
for (const grp of dupGroups) {
  console.log(`\n  Google Place: ${grp[0].google_place_id}`)
  for (const r of grp) {
    console.log(`    ${r.id}  ${r.name}  (slug: ${r.slug})`)
  }
}

// För 33-listan vi inte hittade google för: slå upp om någon ANNAN rad
// med google_place_id ligger nära dessa
const { data: missing } = await sb
  .from('restaurants')
  .select('id, name, latitude, longitude, slug')
  .is('google_place_id', null)

console.log('\n\n═══ Saknade Google Place ID — möjliga matchningar i DB ═══')
for (const m of missing) {
  if (!m.latitude || !m.longitude) continue
  const candidates = withGpid.filter(o => {
    if (!o.latitude || !o.longitude) return false
    const d = Math.sqrt(Math.pow((o.latitude - m.latitude) * 111000, 2) + Math.pow((o.longitude - m.longitude) * 56000, 2))
    return d < 200 // inom 200m
  })
  if (candidates.length) {
    console.log(`\n  ${m.name} (id=${m.id})`)
    candidates.forEach(c => console.log(`    ↳ inom 200m: ${c.name}  (${c.id})`))
  }
}

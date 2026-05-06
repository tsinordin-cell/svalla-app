import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
// Hitta en känd plats med Google-foton + bra rating
const { data } = await sb
  .from('restaurants')
  .select('id, slug, name, google_photo_refs, google_rating, google_ratings_total, formatted_address')
  .not('google_photo_refs', 'is', null)
  .not('google_rating', 'is', null)
  .gte('google_rating', 4.0)
  .order('google_ratings_total', { ascending: false })
  .limit(5)
data.forEach(p => {
  const refs = p.google_photo_refs || []
  console.log(`\n  ${p.name}  (slug: ${p.slug})`)
  console.log(`    rating: ${p.google_rating} (${p.google_ratings_total} omdömen)`)
  console.log(`    address: ${p.formatted_address}`)
  console.log(`    foton: ${refs.length}`)
  console.log(`    URL: https://svalla.se/platser/${p.slug || p.id}`)
})

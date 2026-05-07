import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { data } = await sb
  .from('restaurants')
  .select('name, island, google_place_id, google_photo_refs, type, categories')
  .contains('categories', ['accommodation'])
  .order('island')
let with_google = 0, without = []
for (const p of data) {
  if (p.google_place_id) with_google++
  else without.push(p.name + ' (' + p.island + ')')
}
console.log(`Boenden totalt: ${data.length}`)
console.log(`Med Google-data: ${with_google}`)
console.log(`Utan: ${without.length}`)
console.log('\nUtan Google-data:')
without.forEach(n => console.log(`  ${n}`))

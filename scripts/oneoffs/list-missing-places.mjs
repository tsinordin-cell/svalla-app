import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env.local') })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { data } = await sb
  .from('restaurants')
  .select('id, name, type, categories, island, latitude, longitude')
  .is('google_place_id', null)
  .order('name')
console.log(`${data.length} platser saknar Google Place ID:\n`)
for (const p of data) {
  const cats = (p.categories || []).join(',') || p.type || '-'
  console.log(`  ${p.name.padEnd(38)} [${cats}] ${p.island || ''}`)
}

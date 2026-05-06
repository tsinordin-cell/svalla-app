import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { data } = await sb.from('restaurants').select('name, google_photo_refs').eq('slug', 'artipelag').maybeSingle()
console.log(`Plats: ${data.name}`)
console.log(`Antal foto-refs: ${data.google_photo_refs?.length ?? 0}`)
data.google_photo_refs?.slice(0, 3).forEach((p, i) => {
  console.log(`\n  [${i+1}] reference: "${p.reference}"`)
  console.log(`      längd: ${p.reference?.length ?? 0} tecken`)
  console.log(`      width: ${p.width}, height: ${p.height}`)
})

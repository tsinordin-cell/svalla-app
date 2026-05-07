import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const names = ['Seglarhotellet', 'Sands Hotell', 'Sandhamns Värdshus', 'Waxholms Hotell']
for (const n of names) {
  const { data } = await sb.from('restaurants').select('name, google_place_id, google_rating, google_photo_refs, place_data_source, slug').eq('name', n).maybeSingle()
  console.log(`${n}: gpid=${data?.google_place_id ? 'YES' : 'NO'}, rating=${data?.google_rating}, photos=${data?.google_photo_refs?.length || 0}, slug=${data?.slug}`)
}

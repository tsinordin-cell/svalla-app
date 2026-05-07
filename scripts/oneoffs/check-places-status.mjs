import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env.local') })

const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const { count: total } = await sb.from('restaurants').select('*', { count: 'exact', head: true })
const { count: withGoogle } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('google_place_id', 'is', null)
const { count: withPhotos } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('google_photo_refs', 'is', null)
const { count: withPhone } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('phone', 'is', null)
const { count: withWebsite } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('website', 'is', null)
const { count: withRating } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('google_rating', 'is', null)
const { count: withFormatted } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('formatted_address', 'is', null)
const { count: missingCoords } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).or('latitude.is.null,longitude.is.null')

console.log('═══ Plats-status ═══')
console.log(`  Totalt platser:           ${total}`)
console.log(`  Med google_place_id:      ${withGoogle}  (${Math.round(100*withGoogle/total)}%)`)
console.log(`  Med google-foton:         ${withPhotos}  (${Math.round(100*withPhotos/total)}%)`)
console.log(`  Med google-rating:        ${withRating}  (${Math.round(100*withRating/total)}%)`)
console.log(`  Med telefon:              ${withPhone}`)
console.log(`  Med hemsida:              ${withWebsite}`)
console.log(`  Med formatted_address:    ${withFormatted}`)
console.log(`  Saknar koord (lat/lng):   ${missingCoords}`)

const { data: missing } = await sb.from('restaurants').select('id, name').is('google_place_id', null).limit(20)
if (missing && missing.length) {
  console.log('\n⊘ Exempel platser SAKNAR Google Place ID:')
  missing.forEach(p => console.log(`    ${p.name}`))
}

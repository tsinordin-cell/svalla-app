import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env.local') })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const { count: ratingUpdated } = await sb.from('restaurants').select('*', { count: 'exact', head: true }).not('google_rating_updated', 'is', null)
const { count: total } = await sb.from('restaurants').select('*', { count: 'exact', head: true })

console.log(`google_rating_updated satt: ${ratingUpdated}/${total}`)
console.log('(Dessa har antingen behållit ursprungskoord eller fått ny från Google om <50m diff)')

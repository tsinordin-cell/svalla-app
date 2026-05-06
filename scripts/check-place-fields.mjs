import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
// Hämta en plats och visa alla kolumner som finns
const { data } = await sb.from('restaurants').select('*').limit(1).maybeSingle()
console.log('Tillgängliga kolumner i restaurants:')
console.log(Object.keys(data).sort().join(', '))

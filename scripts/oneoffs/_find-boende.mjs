import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
const { data } = await sb.from('restaurants').select('name, slug, type, categories').contains('categories', ['accommodation']).limit(5)
data.forEach(p => console.log(`  ${p.name.padEnd(36)} → /upptack/${p.slug} (type: ${p.type}, cats: ${p.categories?.join(',')})`))

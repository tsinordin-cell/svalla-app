import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
dotenv.config({ path: process.cwd() + '/.env.local' })
const sb = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)

const { data: ours } = await sb.from('restaurants').select('id, name, categories, tags').eq('slug', 'grinda-grinda-wardshus-hotell').maybeSingle()
const { data: existing } = await sb.from('restaurants').select('id, name, categories, tags').eq('name', 'Grinda Wärdshus').maybeSingle()

if (!ours || !existing) { console.log('not found'); process.exit(0) }
console.log('Vår:', ours.id, ours.name, '→ kategorier:', ours.categories)
console.log('Befintlig:', existing.id, existing.name, '→ kategorier:', existing.categories)

// Merga categories + tags
const cats = new Set([...(existing.categories || []), ...(ours.categories || [])])
const tags = new Set([...(existing.tags || []), ...(ours.tags || [])])

await sb.from('restaurants').update({
  categories: Array.from(cats),
  tags: Array.from(tags),
}).eq('id', existing.id)
console.log('  ✓ mergat categories+tags på existing')

await sb.from('restaurants').delete().eq('id', ours.id)
console.log('  ✓ raderat vår dublett-rad')

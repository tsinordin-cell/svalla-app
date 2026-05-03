// One-off: hur ser POI-datat ut i prod?
// Körs lokalt med .env.local. Read-only counts, ingen mutation.
import { config } from 'dotenv'
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY
if (!SUPABASE_URL || !SERVICE_KEY) { console.error('saknar env'); process.exit(1) }

async function rpc(table, params = '') {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}${params}`, {
    headers: {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
      Prefer: 'count=exact',
      Range: '0-0',
    },
  })
  const range = r.headers.get('content-range')
  const total = range?.split('/')[1] ?? '?'
  return { status: r.status, total }
}

async function selectAll(table, query) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${table}?${query}`, {
    headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
  })
  return r.ok ? r.json() : { error: r.status }
}

console.log('\n=== Tabellstorlekar ===')
for (const t of ['harbors', 'restaurants']) {
  const { status, total } = await rpc(t)
  console.log(`  ${t.padEnd(15)} ${status === 200 ? `${total} rader` : `(status ${status})`}`)
}

console.log('\n=== restaurants.type fördelning ===')
const types = await selectAll('restaurants', 'select=type')
if (Array.isArray(types)) {
  const counts = {}
  for (const r of types) counts[r.type ?? '(null)'] = (counts[r.type ?? '(null)'] ?? 0) + 1
  for (const [k, v] of Object.entries(counts).sort((a, b) => b[1] - a[1])) {
    console.log(`  ${String(k).padEnd(20)} ${v}`)
  }
} else {
  console.log('  fel:', types)
}

console.log('\n=== restaurants.tags-sökningar ===')
for (const tag of ['bad', 'bastu', 'natur', 'hamn', 'brygga', 'bensin', 'sauna']) {
  const r = await rpc('restaurants', `?tags=cs.{${tag}}`)
  console.log(`  tags has '${tag}'`.padEnd(28), `${r.total} rader`)
}

console.log('\n=== harbors-tabellen, första rad ===')
const sample = await selectAll('harbors', 'select=*&limit=1')
console.log(' ', JSON.stringify(sample, null, 2).split('\n').slice(0, 30).join('\n'))

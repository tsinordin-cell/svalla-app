// One-off: rensa suggested_stops på alla planerade rutter
// så de räknas om med nya algoritmen vid nästa visning.
import { config } from 'dotenv'
config({ path: '.env.local' })

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SERVICE_KEY  = process.env.SUPABASE_SERVICE_ROLE_KEY

const r = await fetch(`${SUPABASE_URL}/rest/v1/planned_routes?id=neq.00000000-0000-0000-0000-000000000000`, {
  method: 'PATCH',
  headers: {
    apikey: SERVICE_KEY,
    Authorization: `Bearer ${SERVICE_KEY}`,
    'Content-Type': 'application/json',
    Prefer: 'return=representation',
  },
  body: JSON.stringify({ suggested_stops: [] }),
})
const txt = await r.text()
console.log(`Status: ${r.status}`)
console.log(`Body length: ${txt.length}`)
if (r.ok) {
  const arr = JSON.parse(txt)
  console.log(`Cleared suggested_stops on ${arr.length} planned_routes`)
} else {
  console.log('Body:', txt.slice(0, 300))
}

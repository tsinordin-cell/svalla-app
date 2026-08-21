// Kör: npm run tasks:lista
// Sparar tasks till tasks-output.json i repo-roten.
//
// Nyckeln läses ur miljön (.env.local) — aldrig hårdkodad. Den låg tidigare i
// klartext här; filen var ospårad så den nådde aldrig GitHub, men mönstret
// gjorde att samma nyckel råkade följa med in i ett annat skript som blockerades
// av push protection 2026-08-21.

import { writeFileSync } from 'fs'

const SB = process.env.SUPABASE_URL ?? 'https://oiklttwylndesewauytj.supabase.co'
const KEY = process.env.SUPABASE_SERVICE_KEY
if (!KEY) {
  console.error('✗ SUPABASE_SERVICE_KEY saknas. Lägg den i .env.local och kör: npm run tasks:lista')
  process.exit(1)
}

const res = await fetch(
  `${SB}/rest/v1/team_tasks?select=id,title,status,priority,description,assignee_id,due_date&order=created_at.desc`,
  { headers: { apikey: KEY, Authorization: `Bearer ${KEY}` } }
)
const tasks = await res.json()
if (!Array.isArray(tasks)) {
  console.error('✗ Supabase svarade inte med en lista — trolig orsak: fel eller utgången nyckel.')
  console.error('  Svar:', JSON.stringify(tasks).slice(0, 300))
  process.exit(1)
}
writeFileSync('tasks-output.json', JSON.stringify(tasks, null, 2))

const per = {}
for (const t of tasks) per[t.status] = (per[t.status] ?? 0) + 1
console.log(`✓ ${tasks.length} tasks sparade i tasks-output.json`)
console.log('  ' + Object.entries(per).map(([k, v]) => `${k}: ${v}`).join(' · '))

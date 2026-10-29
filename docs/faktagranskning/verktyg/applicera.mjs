// Lägger in Skribentens ersättningar i repot. Användning:
//   node applicera.mjs <repo> <edits.json> [--torr]
// Varje "gammal" måste finnas exakt en gång i filen när den läggs in, annars
// stoppas allt för den filen och felet skrivs ut. --torr ändrar inget.
import { readFileSync, writeFileSync } from 'node:fs'
const [repo, fil, flagga] = process.argv.slice(2)
const torr = flagga === '--torr'
const edits = JSON.parse(readFileSync(fil, 'utf8'))
const cache = {}
let ok = 0, fel = 0
for (const [i, e] of edits.entries()) {
  const p = `${repo}/${e.fil}`
  cache[p] ??= readFileSync(p, 'utf8')
  const n = cache[p].split(e.gammal).length - 1
  if (n !== 1) { console.log(`FEL #${i} (${(e.rader || []).join(',')}): "gammal" finns ${n} gånger i ${e.fil}: ${e.gammal.slice(0, 120).replace(/\n/g, '⏎')}`); fel++; continue }
  cache[p] = cache[p].replace(e.gammal, () => e.ny)
  ok++
}
if (!torr && fel === 0) for (const [p, t] of Object.entries(cache)) writeFileSync(p, t)
console.log(`${ok} ersättningar ok, ${fel} fel${torr ? ' (torrkörning)' : fel ? ' — inget skrivet' : ' — skrivet'}`)
process.exit(fel ? 1 : 0)

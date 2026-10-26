#!/usr/bin/env node
/**
 * utgangna-datum.mjs: hittar datum i guidernas synliga text som redan har passerat.
 *
 * Varför: säsongsguiderna (oktober till april) räknar upp evenemang, öppettider
 * och tidtabeller med datum. När datumet har passerat står texten kvar som om
 * det vore framtid ("fredag 9 oktober 2026 är det Kulturnatt"). Det här skriptet
 * listar sådana meningar per guide så att någon kan skriva om dem i tid.
 *
 * Bara datum MED år räknas (9 oktober 2026, 2026-10-09). Datum utan år går inte
 * att avgöra automatiskt. Kommentarer (<!-- KÄLLA ... -->) räknas inte, bara text
 * som besökaren ser. Meningar som redan står i dåtid ("var", "hölls", "har redan
 * varit") hoppas över.
 *
 *   node scripts/utgangna-datum.mjs              # rapport, alla guider
 *   node scripts/utgangna-datum.mjs --dagar=30   # även datum som passerar inom 30 dagar
 *   node scripts/utgangna-datum.mjs --idag=2027-01-15
 */
import { readFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const arg = (n) => (process.argv.find(a => a.startsWith(`--${n}=`)) || '').split('=')[1]
const idag = arg('idag') ? new Date(`${arg('idag')}T00:00:00Z`) : new Date()
const marginal = Number(arg('dagar') || 0) * 86400000
const grans = new Date(idag.getTime() + marginal)

const MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']
// I ett spann ("1–17 oktober 2026") är det slutdagen som avgör om det har passerat.
const DATUM = new RegExp(`(?:\\d{1,2}\\s*[–-]\\s*)?(\\d{1,2})\\s+(${MANADER.join('|')})\\s+(20\\d\\d)|(20\\d\\d)-(\\d{2})-(\\d{2})`, 'gi')
// \b fungerar inte runt å, ä och ö i JavaScript, därför bokstavsgränser med \p{L}.
const ord = (lista) => new RegExp(`(?<!\\p{L})(${lista.join('|')})(?!\\p{L})`, 'iu')
const DATID = ord(['var', 'hölls', 'pågick', 'invigdes', 'har redan varit', 'har varit', 'avslutat', 'avslutade', 'gick av stapeln', 'gällde', 'kostade', 'gick', 'öppnade', 'stod', 'hade', 'började', 'lyfte', 'slutade', 'fick', 'körde', 'avvecklade', 'ställdes', 'besökte', 'bodde', 'stängde', 'hyrdes', 'blev'])
// Datum som beskriver när vi läste en källa, eller något som gäller sedan dess.
const INTE_HANDELSE = ord(['läst', 'lästa', 'lästes', 'läste', 'läsning', 'genomgång', 'sedan', 'kontrollera', 'kontrollerat', 'hämtade', 'hämtad', 'invånare', 'gäller från'])

const kalla = readFileSync(resolve(ROT, 'src/app/guider/[slug]/guide-content.ts'), 'utf8')
const starter = [...kalla.matchAll(/\n {2}'([a-z0-9-]+)': `/g)].map(m => ({ slug: m[1], start: m.index }))

const rapport = []
for (let i = 0; i < starter.length; i++) {
  const { slug, start } = starter[i]
  const slut = i + 1 < starter.length ? starter[i + 1].start : kalla.length
  const synlig = kalla.slice(start, slut)
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
  const meningar = synlig.split(/(?<=[.!?])\s+/)
  for (const m of meningar) {
    if (DATID.test(m) || INTE_HANDELSE.test(m) || m.includes('`')) continue
    const datumen = [...m.matchAll(DATUM)].map(d => d[3]
      ? new Date(Date.UTC(Number(d[3]), MANADER.indexOf(d[2].toLowerCase()), Number(d[1])))
      : new Date(Date.UTC(Number(d[4]), Number(d[5]) - 1, Number(d[6]))))
    if (datumen.length === 0) continue
    // Ett spann som slutar i framtiden ("från 14 september 2026 till 29 april 2027")
    // gäller fortfarande. Bara meningar där ALLA datum har passerat räknas.
    if (datumen.some(d => d >= grans)) continue
    const senast = new Date(Math.max(...datumen.map(d => d.getTime())))
    rapport.push({ slug, datum: senast.toISOString().slice(0, 10), mening: m.trim().slice(0, 200) })
  }
}

const perGuide = new Map()
for (const r of rapport) (perGuide.get(r.slug) ?? perGuide.set(r.slug, []).get(r.slug)).push(r)

console.log(`Datum före ${grans.toISOString().slice(0, 10)} i synlig guidetext, skrivna som om de låg framåt:\n`)
for (const [slug, rader] of [...perGuide.entries()].sort()) {
  console.log(`${slug} (${rader.length})`)
  for (const r of rader) console.log(`  ${r.datum}  ${r.mening}`)
}
console.log(`\n${rapport.length} meningar i ${perGuide.size} guider.`)

#!/usr/bin/env node
/**
 * generera-uppskattningar.mjs — gör UPPSKATTNING-markörerna synliga för läsaren.
 *
 * Bakgrunden: verify-claims tillåter ett pris utan källa om det är märkt
 *
 *     UPPSKATTNING: <vad den bygger på> (åååå-mm)
 *
 * och spärrens egen text säger att det då ska "sägas rakt ut för besökaren i
 * gränssnittet". Den andra halvan har aldrig byggts. I september 2026 fanns
 * 173 sådana markörer i guiderna och noll av dem syntes på sidan. Läsaren såg
 * "ca 300–600 kr/pers" som om det vore hämtat ur en prislista.
 *
 * En markering som bara finns i koden blir aldrig omprövad — det var samma
 * mekanism som gjorde att 29 procent av KÄLLA-raderna kunde vara fel utan att
 * någon märkte det. Det här skriptet ger markörerna en konsument.
 *
 *   node scripts/generera-uppskattningar.mjs            # skriver filen
 *   node scripts/generera-uppskattningar.mjs --kontroll # faller om den är inaktuell
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const KONTROLL = process.argv.includes('--kontroll')

const GUIDE_CONTENT = 'src/app/guider/[slug]/guide-content.ts'
const UTFIL = 'src/app/guider/uppskattningar.generated.ts'

/** Samma mönster som verify-claims kräver. Datumet är inte valfritt. */
const UPPSKATTNING = /uppskattning:\s*(.+?)\s*\((\d{4}-\d{2})\)/i

/**
 * Guiderna ligger som en Record<string, string> med en mallsträng per slug.
 * Vi följer nyckelraderna och räknar markörer fram till nästa nyckel.
 */
function lasGuider() {
  const rader = readFileSync(resolve(ROT, GUIDE_CONTENT), 'utf8').split('\n')
  const per = new Map()
  let slug = null

  for (const rad of rader) {
    const m = rad.match(/^\s{4}'([a-z0-9-]+)':\s*`/)
    if (m) {
      slug = m[1]
      if (!per.has(slug)) per.set(slug, { slug, antal: 0, datum: null, vad: null })
      continue
    }
    if (!slug) continue

    const u = rad.match(UPPSKATTNING)
    if (!u) continue

    const post = per.get(slug)
    post.antal++
    const [, vad, datum] = u
    // Äldsta datumet är det som avgör hur inaktuell sidan är i värsta fall.
    if (!post.datum || datum < post.datum) post.datum = datum
    if (!post.vad) post.vad = vad.replace(/\s*-->\s*$/, '').trim()
  }
  return [...per.values()].filter(p => p.antal > 0)
}

const guider = lasGuider()
const perSlug = {}
for (const g of guider) perSlug[g.slug] = { antal: g.antal, datum: g.datum, vad: g.vad }

const innehall = `// GENERERAD AV scripts/generera-uppskattningar.mjs — REDIGERA INTE FÖR HAND.
//
// Vilka guider som innehåller prisnivåer vi uppskattat i stället för hämtat.
// Kommer från UPPSKATTNING-markörerna i guide-content.ts. Ändra markören där
// och kör om skriptet.
//
// Poängen: en uppskattning som bara är märkt i koden blir aldrig omprövad.
// Syns den på sidan blir den det — av oss eller av en läsare som vet bättre.

export type Uppskattning = {
  /** Hur många prisnivåer i guiden som är uppskattade */
  antal: number
  /** Äldsta månaden bland markörerna — hur inaktuell sidan är i värsta fall */
  datum: string
  /** Vad uppskattningen bygger på, som markören formulerar det */
  vad: string
}

export const UPPSKATTNINGAR_PER_GUIDE: Record<string, Uppskattning> = ${JSON.stringify(perSlug, null, 2)}

/** Antal guider som innehåller minst en uppskattad prisnivå. */
export const GUIDER_MED_UPPSKATTNING = ${Object.keys(perSlug).length}
`

const utvag = resolve(ROT, UTFIL)

if (KONTROLL) {
  let nuvarande = ''
  try { nuvarande = readFileSync(utvag, 'utf8') } catch { /* saknas */ }
  if (nuvarande !== innehall) {
    console.error('✗ uppskattningar.generated.ts är inaktuell. Kör: node scripts/generera-uppskattningar.mjs')
    process.exit(1)
  }
} else {
  writeFileSync(utvag, innehall)
  console.log(`✓ skrev ${UTFIL}`)
}

const totalt = guider.reduce((s, g) => s + g.antal, 0)
const datum = guider.map(g => g.datum).filter(Boolean).sort()
console.log(`✓ uppskattningar: ${guider.length} guider, ${totalt} markörer`)

if (datum.length) {
  const aldst = datum[0]
  const manaderSedan = (() => {
    const [a, m] = aldst.split('-').map(Number)
    const nu = new Date()
    return (nu.getFullYear() - a) * 12 + (nu.getMonth() + 1 - m)
  })()
  console.log(`  äldsta markör: ${aldst} (${manaderSedan} månader sedan)`)
  if (manaderSedan >= 12) {
    console.log('')
    console.log('  ! Uppskattningar ska omprövas varje säsong. Den äldsta är över ett år.')
    console.log('    En uppskattning som aldrig omprövas är en gissning med datum på.')
  }
}

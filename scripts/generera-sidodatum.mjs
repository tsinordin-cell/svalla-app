#!/usr/bin/env node
/**
 * generera-sidodatum.mjs — riktiga "senast ändrad"-datum till sitemap.xml.
 *
 * Bakgrund (2026-10-10): sitemap.ts gav 85 statiska sidor och alla ö-, guide-
 * och aktivitetssidor lastModified = new Date(), alltså "ändrad i dag" vid varje
 * hämtning. Google lär sig att ett sådant datum ljuger och slutar läsa det —
 * då vet Google inte vilka av guiderna som faktiskt skrevs om (168 st i sept).
 *
 * Det här skriptet läser git-historiken och skriver det senaste datum då
 * innehållet faktiskt ändrades:
 *   - guide:<slug>  senaste ändring i guidens block i guides-data.ts och
 *                   guide-content.ts (git blame per rad, största datumet)
 *   - o:<slug>      senaste ändring i öns block i island-data.ts/bohuslan-data.ts
 *   - sida:<route>  senaste commit som rörde filerna direkt i sidans mapp
 *                   (dynamiska mappar som /jamfor/[pair] ingår)
 *
 * Kräver full git-historik, så det körs lokalt och resultatet checkas in.
 * Vercel klonar grunt och får aldrig köra det. Glöms en omkörning blir datumet
 * för gammalt, aldrig för nytt — det är det ofarliga hållet.
 *
 *   node scripts/generera-sidodatum.mjs
 */

import { execFileSync } from 'node:child_process'
import { readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { resolve, dirname, relative, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const UTFIL = 'src/app/sidodatum.generated.ts'

const git = (...args) => execFileSync('git', args, { cwd: ROT, encoding: 'utf8', maxBuffer: 512 * 1024 * 1024 })

const grund = git('rev-parse', '--is-shallow-repository').trim()
if (grund === 'true') {
  console.error('✗ generera-sidodatum: grund klon — kör i en klon med full historik.')
  process.exit(1)
}

/** git blame → committer-datum (YYYY-MM-DD) per rad, 0-indexerat. */
function blameDatum(fil) {
  const ut = git('blame', '--line-porcelain', '--', fil).split('\n')
  const datum = []
  let tid = 0
  for (const rad of ut) {
    if (rad.startsWith('committer-time ')) tid = Number(rad.slice(15))
    else if (rad.startsWith('\t')) datum.push(new Date(tid * 1000).toISOString().slice(0, 10))
  }
  return datum
}

/** Delar filen i block som börjar på rader som matchar `start` och ger max-datum per nyckel. */
function blockDatum(fil, start) {
  const rader = execFileSync('cat', [fil], { cwd: ROT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 }).split('\n')
  const datum = blameDatum(fil)
  const starter = []
  rader.forEach((r, i) => { const m = r.match(start); if (m) starter.push([i, m[1]]) })
  const ut = {}
  starter.forEach(([i, nyckel], k) => {
    const slut = k + 1 < starter.length ? starter[k + 1][0] : rader.length
    // Objektet börjar en rad före slug-raden ("  {") — ta med den.
    let max = ''
    for (let j = Math.max(0, i - 1); j < slut; j++) if (datum[j] && datum[j] > max) max = datum[j]
    if (!ut[nyckel] || max > ut[nyckel]) ut[nyckel] = max
  })
  return ut
}

const SLUG_RAD = /^\s{4}slug:\s*['"]([a-z0-9-]+)['"],?\s*$/
const INNEHALL_RAD = /^\s{2,4}['"]([a-z0-9-]+)['"]:\s*`/

const guideData = blockDatum('src/app/guider/guides-data.ts', SLUG_RAD)
const guideInnehall = blockDatum('src/app/guider/[slug]/guide-content.ts', INNEHALL_RAD)
const oar = { ...blockDatum('src/app/o/island-data.ts', SLUG_RAD), ...blockDatum('src/app/o/bohuslan-data.ts', SLUG_RAD) }

const ut = {}
for (const slug of new Set([...Object.keys(guideData), ...Object.keys(guideInnehall)])) {
  const d = [guideData[slug], guideInnehall[slug]].filter(Boolean).sort().pop()
  if (d) ut[`guide:${slug}`] = d
}
for (const [slug, d] of Object.entries(oar)) if (d) ut[`o:${slug}`] = d

// Sidmappar: varje mapp under src/app med en page.tsx. Route-grupper "(x)" tas bort.
function* sidmappar(mapp) {
  for (const namn of readdirSync(mapp)) {
    const full = join(mapp, namn)
    if (statSync(full).isDirectory()) {
      if (namn === 'api' || namn.startsWith('_')) continue
      yield* sidmappar(full)
    }
  }
  if (existsSync(join(mapp, 'page.tsx'))) yield mapp
}
const APP = resolve(ROT, 'src/app')
for (const mapp of sidmappar(APP)) {
  const filer = readdirSync(mapp).filter(f => statSync(join(mapp, f)).isFile()).map(f => relative(ROT, join(mapp, f)))
  const d = git('log', '-1', '--format=%cs', '--', ...filer).trim()
  const route = '/' + relative(APP, mapp).split('/').filter(s => s && !/^\(.*\)$/.test(s)).join('/')
  if (d) ut[`sida:${route === '/' ? '/' : route.replace(/\/$/, '')}`] = d
}

const sorterad = Object.fromEntries(Object.entries(ut).sort(([a], [b]) => a.localeCompare(b)))
const text = `// GENERERAD av scripts/generera-sidodatum.mjs — redigera inte för hand.
// Senaste datum då innehållet ändrades enligt git. Används av sitemap.ts.
// Kör om skriptet efter större innehållsändringar (kräver full git-historik).
export const SIDODATUM: Record<string, string> = ${JSON.stringify(sorterad, null, 2)}
`
writeFileSync(resolve(ROT, UTFIL), text)
const antal = (p) => Object.keys(sorterad).filter(k => k.startsWith(p)).length
console.log(`✓ ${UTFIL}: ${antal('guide:')} guider, ${antal('o:')} öar, ${antal('sida:')} sidmappar`)

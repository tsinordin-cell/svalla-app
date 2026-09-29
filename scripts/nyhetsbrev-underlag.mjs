#!/usr/bin/env node
/**
 * nyhetsbrev-underlag.mjs, bygger råmaterialet till ett nyhetsbrev.
 *
 * VARFÖR DET HÄR FINNS
 *
 * I augusti 2026 skrevs fyra veckobrev av Claude. Inget av dem skickades, och
 * inget av dem hade en enda källa. De innehöll påståenden som ser ut som fakta
 * men var gissningar: när ett bageri får slut på kanelbullar, vilket århundrade
 * en gruva öppnade. Filerna ligger kvar i Drive, numera märkta ANVÄND INTE.
 *
 * Felet var inte tonen. Felet var att brevet började med ett tomt papper. Ett
 * tomt papper fylls med det som låter rimligt.
 *
 * Det här skriptet vänder på det. Brevet börjar i stället med det vi faktiskt
 * vet: vad som är nytt på sajten sedan förra utskicket. Den delen går inte att
 * hitta på, för den läses ur datafilerna. Resten av brevet skrivs av en
 * människa ovanpå, och varje påstående som inte kommer härifrån ska ha en
 * källa precis som på sajten.
 *
 *   node scripts/nyhetsbrev-underlag.mjs             # skriver ut underlaget
 *   node scripts/nyhetsbrev-underlag.mjs --spara     # + låser läget som "skickat"
 *
 * Ögonblicksbilden ligger i data/nyhetsbrev-lage.json. Kör med --spara FÖRST
 * när brevet är skickat, annars räknas samma nyheter två gånger.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const SPARA = process.argv.includes('--spara')
const LAGE_FIL = resolve(ROT, 'data/nyhetsbrev-lage.json')

const las = p => readFileSync(resolve(ROT, p), 'utf8')

/* ── Plocka ut det vi publicerat ─────────────────────────────────────────
   Vi läser datafilerna som text i stället för att importera dem. Filerna är
   TypeScript och skriptet körs utan byggsteg; regexen är trubbig men stabil
   så länge fälten skrivs på en rad, vilket de gör. */

function guider() {
  const s = las('src/app/guider/guides-data.ts')
  const ut = []
  const re = /slug:\s*"([^"]+)"[\s\S]{0,400}?title:\s*"([^"]+)"/g
  let m
  while ((m = re.exec(s))) ut.push({ slug: m[1], titel: m[2] })
  return ut
}

function oar() {
  const s = las('src/app/o/island-data.ts') + las('src/app/o/bohuslan-data.ts')
  const ut = []
  const re = /slug:\s*'([a-z0-9-]+)',\s*\n\s*name:\s*'([^']+)'/g
  let m
  while ((m = re.exec(s))) ut.push({ slug: m[1], titel: m[2] })
  return ut
}

function hantverkare() {
  const s = las('src/app/o/hantverkare-data.ts')
  const ut = []
  const re = /slug:\s*'([a-z0-9-]+)',\s*\n\s*namn:\s*'([^']+)'/g
  let m
  while ((m = re.exec(s))) ut.push({ slug: m[1], titel: m[2] })
  return ut
}

/* ── Jämför mot förra utskicket ──────────────────────────────────────── */

const nu = { guider: guider(), oar: oar(), hantverkare: hantverkare() }

let forra = { guider: [], oar: [], hantverkare: [], datum: null }
if (existsSync(LAGE_FIL)) forra = JSON.parse(readFileSync(LAGE_FIL, 'utf8'))

const nytt = {}
for (const nyckel of ['guider', 'oar', 'hantverkare']) {
  const kanda = new Set((forra[nyckel] ?? []).map(x => x.slug ?? x))
  nytt[nyckel] = nu[nyckel].filter(x => !kanda.has(x.slug))
}

/* ── Öförslag: den ö som legat längst utan att lyftas ─────────────────── */

const lyfta = forra.lyfta ?? []
const kandidat = nu.oar.find(o => !lyfta.includes(o.slug)) ?? nu.oar[0]

/* ── Skriv ut ─────────────────────────────────────────────────────────── */

const idag = new Date().toISOString().slice(0, 10)
const manad = new Date().toLocaleDateString('sv-SE', { month: 'long' })
const rad = x => `- ${x.titel}`

const forsta = !forra.datum

console.log(`
=========================================================
UNDERLAG TILL NYHETSBREV, ${idag}
${forsta
  ? 'Första körningen. Ingen ögonblicksbild finns, så allt räknas som nytt.\n  Kör med --spara nu för att sätta nollpunkten, och läs listan som en\n  inventering i stället för som nyheter.'
  : `Förra utskicket: ${forra.datum}`}
=========================================================

BLOCK 1. NYTT PÅ SVALLA  (hämtat ur datan, går inte att hitta på)

  Nya guider: ${nytt.guider.length}
${nytt.guider.slice(0, 15).map(rad).join('\n') || '  (inga)'}

  Nya öar: ${nytt.oar.length}
${nytt.oar.slice(0, 15).map(rad).join('\n') || '  (inga)'}

  Nya företag i hantverkarregistret: ${nytt.hantverkare.length}
${nytt.hantverkare.slice(0, 15).map(rad).join('\n') || '  (inga)'}

---------------------------------------------------------

BLOCK 2. DET HÄR ÄNDRAS NU  (fylls av människa, KRÄVER KÄLLA)

  Kontrollera innan du skriver, och skriv bara det du läst i dag:
    waxholmsbolaget.se          tidtabellsbyten, istrafik, inställda turer
    respektive kommuns sida     färjor, vägfärjor, avstängningar
    lansstyrelsen.se            eldningsförbud, beträdnadsförbud
    verksamheternas egna sidor  öppnar eller stänger för säsongen

  Skriv datum och källa på varje rad, som på sajten. Hittar du inget som
  ändrats är blocket tomt och brevet blir kortare. Det är helt i sin ordning.

---------------------------------------------------------

BLOCK 3. MÅNADENS FRÅGA  (från Thorkel-loggen)

  Ta den fråga som kommit flest gånger sedan förra brevet och svara på den.
  Det här är det enda innehållet ingen konkurrent kan kopiera, eftersom det
  kommer från våra egna användare.

---------------------------------------------------------

BLOCK 4. EN Ö  (bara belagda uppgifter)

  Förslag: ${kandidat?.titel ?? '(ingen ö hittad)'}  ->  svalla.se/o/${kandidat?.slug ?? ''}

  Öppna ösidan och använd det som står under Källor. Skriv ingenting om
  öppettider, priser, årtal eller historia som inte står där.

=========================================================
RÖST: läs 02_Strategi/nyhetsbrev-rostregler.md innan du skriver.
      Inga tankstreck. Inga tomma superlativ. En åsikt per brev.
=========================================================
`)

if (SPARA) {
  mkdirSync(dirname(LAGE_FIL), { recursive: true })
  writeFileSync(LAGE_FIL, JSON.stringify({
    datum: idag,
    manad,
    lyfta: [...lyfta, kandidat?.slug].filter(Boolean),
    guider: nu.guider.map(x => ({ slug: x.slug })),
    oar: nu.oar.map(x => ({ slug: x.slug })),
    hantverkare: nu.hantverkare.map(x => ({ slug: x.slug })),
  }, null, 2) + '\n')
  console.log(`Sparade läget i data/nyhetsbrev-lage.json. Nästa körning jämför mot ${idag}.\n`)
} else {
  console.log('Inget sparat. Kör med --spara när brevet ÄR skickat.\n')
}

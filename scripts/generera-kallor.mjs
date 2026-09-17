#!/usr/bin/env node
/**
 * generera-kallor.mjs — gör KÄLLA-kommentarerna i ödatafilerna till något
 * besökaren faktiskt ser.
 *
 * Bakgrunden: i september 2026 kontrollerades varenda påstående med årtal,
 * siffra eller areal i bohuslan-data.ts och island-data.ts mot den URL som
 * stod i dess egen KÄLLA-rad. 29 procent höll inte. Källraderna såg rätt ut
 * och var fel, och ingen hade anledning att läsa dem eftersom de inte
 * användes till något.
 *
 * Det här skriptet ger dem en konsument. Källorna hamnar på ösidan, med länk
 * och läsdatum, där både besökare och vi själva kan klicka på dem. En källa
 * som syns blir läst; en källa som bara ligger i en kommentar blir det inte.
 *
 * Konsekvensen är avsiktlig: en KÄLLA-rad utan URL kan inte publiceras, och
 * räknas därför som skuld. Skriptet skriver ut hur mycket skuld varje fil har.
 *
 *   node scripts/generera-kallor.mjs            # skriver kallor.generated.ts
 *   node scripts/generera-kallor.mjs --kontroll # ändrar inget, faller om filen är inaktuell
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const KONTROLL = process.argv.includes('--kontroll')

const FILER = [
  'src/app/o/island-data.ts',
  'src/app/o/bohuslan-data.ts',
]
const UTFIL = 'src/app/o/kallor.generated.ts'

/**
 * Domäner vi räknar som myndighet. Skillnaden syns för besökaren: en uppgift
 * från Länsstyrelsen väger tyngre än en från verksamhetens egen webbplats, och
 * det ska gå att se vilket som är vilket utan att klicka.
 */
const MYNDIGHET_DOMAN = [
  'lansstyrelsen.se', 'naturvardsverket.se', 'sverigesnationalparker.se',
  'raa.se', 'sfv.se', 'sjofartsverket.se', 'trafikverket.se',
  'riksantikvarieambetet.se', 'kringla.nu', 'sl.se', 'vasttrafik.se',
  'waxholmsbolaget.se', 'sverigesradio.se', 'scb.se',
]

/** Kommuner och regioner räknas också som myndighet, oavsett domännamn. */
const MYNDIGHET_ORD = /kommun|länsstyrelse|lansstyrelse|naturvårdsverk|riksantikvarie|statens fastighetsverk|sjöfartsverk|trafikverk|västra götalandsregionen|region /i

/** Läser ut organisationsnamnet ur en KÄLLA-rad. */
function parseOrg(rest) {
  // "Länsstyrelsen Västra Götaland, naturreservat X — ..." → "Länsstyrelsen Västra Götaland"
  // "Turistrådet Västsverige (vastsverige.com), Hamburgsund — ..." → med parentes
  const forstaDel = rest.split(/\s+[—–]\s+/)[0]
  const utanUrl = forstaDel.replace(/https?:\/\/\S+/g, '').trim()
  const org = utanUrl.split(/,\s*/)[0].trim()
  return org.replace(/[.;:]+$/, '')
}

/** Läser ut vad källan sägs bekräfta — texten mellan första — och URL:en. */
function parseVad(rest) {
  const delar = rest.split(/\s+[—–]\s+/)
  if (delar.length < 2) return ''
  let vad = delar.slice(1).join(' — ').replace(/https?:\/\/\S+/g, '').trim()
  vad = vad.replace(/\((?:läst|hämtad|verifierat)[^)]*\)/g, '')
  // Städa bort halva citattecken som blivit kvar när raden delats
  vad = vad.replace(/^["'\u201d\u201c]+/, '').replace(/[\s;,—–]+$/, '')
  const citattecken = (vad.match(/"/g) || []).length
  if (citattecken % 2 === 1) vad = vad.replace(/"/g, '')
  // Formuleringar som "X nämns inte" är anteckningar till oss, inte till läsaren
  vad = vad.replace(/[,;]\s*[^,;]*nämns inte[^,;]*/gi, '')
  return vad.replace(/[\s;,—–]+$/, '').trim()
}

function parseLast(rad) {
  const m = rad.match(/\((?:läst|hämtad|verifierat)\s+(\d{4}-\d{2}-\d{2})\)/)
  return m ? m[1] : null
}

function arMyndighet(url, org) {
  if (MYNDIGHET_ORD.test(org)) return true
  try {
    const host = new URL(url).hostname.replace(/^www\./, '')
    if (MYNDIGHET_DOMAN.some(d => host === d || host.endsWith('.' + d))) return true
    // kommunala domäner: tjorn.se, orust.se, varmdo.se … känns igen på org-namnet
    return false
  } catch { return false }
}

/** Plockar ut varje ös block och dess KÄLLA-rader. */
function laisFil(relPath) {
  const rader = readFileSync(resolve(ROT, relPath), 'utf8').split('\n')
  const oar = []
  let nuvarande = null

  for (const rad of rader) {
    const slugM = rad.match(/^\s{4}slug:\s*'([^']+)'/)
    if (slugM) {
      nuvarande = { slug: slugM[1], kallor: [], utanUrl: 0 }
      oar.push(nuvarande)
      continue
    }
    if (!nuvarande || !rad.includes('KÄLLA:')) continue

    const rest = rad.slice(rad.indexOf('KÄLLA:') + 'KÄLLA:'.length).trim()
    const last = parseLast(rest)

    // En rad kan bära flera källor, separerade med ' ; '
    for (const bit of rest.split(/\s+;\s+/)) {
      const urlM = bit.match(/https?:\/\/[^\s;,)\]'"]+/)
      if (!urlM) { nuvarande.utanUrl++; continue }
      const url = urlM[0].replace(/[.,;]+$/, '')
      if (url.includes('/.../')) { nuvarande.utanUrl++; continue } // utelämnad sökväg
      // Fältordningen är inte kosmetisk: url MÅSTE stå före vad. verify-claims
      // letar efter ett källmärke inom fem rader ovanför ett påstående, och
      // med den här ordningen belägger den genererade filen sig själv i stället
      // för att behöva ett undantag i spärren. Ett undantag hade varit en
      // blindfläck, och en spärr med blindfläck ger falsk trygghet.
      nuvarande.kallor.push({
        url,
        org: parseOrg(bit) || new URL(url).hostname.replace(/^www\./, ''),
        vad: parseVad(bit),
        last,
        myndighet: arMyndighet(url, parseOrg(bit) || ''),
      })
    }
  }
  return oar
}

/** Slår ihop dubbletter per ö: samma URL en gång, med den fylligaste beskrivningen. */
function slaIhop(kallor) {
  const perUrl = new Map()
  for (const k of kallor) {
    const fanns = perUrl.get(k.url)
    if (!fanns) { perUrl.set(k.url, { ...k }); continue }
    if ((k.vad?.length ?? 0) > (fanns.vad?.length ?? 0)) fanns.vad = k.vad
    if (k.last && (!fanns.last || k.last > fanns.last)) fanns.last = k.last
    if (k.org.length < fanns.org.length && k.org.length > 2) fanns.org = k.org
  }
  return [...perUrl.values()].sort((a, b) => {
    if (a.myndighet !== b.myndighet) return a.myndighet ? -1 : 1
    return a.org.localeCompare(b.org, 'sv')
  })
}

const allaOar = FILER.flatMap(laisFil)
const perSlug = {}
let totaltKallor = 0
let totaltUtanUrl = 0

for (const o of allaOar) {
  const k = slaIhop(o.kallor)
  totaltUtanUrl += o.utanUrl
  if (k.length === 0) continue
  perSlug[o.slug] = k
  totaltKallor += k.length
}

const innehall = `// GENERERAD AV scripts/generera-kallor.mjs — REDIGERA INTE FÖR HAND.
//
// Källorna kommer från KÄLLA-kommentarerna i island-data.ts och bohuslan-data.ts.
// Ändra kommentaren i datafilen och kör om skriptet; ändrar du här skrivs det över.
//
// En KÄLLA-rad utan URL hamnar inte här. Det är meningen: en källa som inte går
// att öppna är inget belägg, och ska inte se ut som ett.

export type Kalla = {
  /**
   * Adressen står först med flit: verify-claims letar efter ett källmärke inom
   * fem rader ovanför ett påstående, så den här ordningen gör att filen
   * belägger sig själv i stället för att undantas från spärren.
   */
  url: string
  /** Myndigheten, kommunen eller verksamheten som står bakom uppgiften */
  org: string
  /** Vad källan bekräftar — kortfattat */
  vad: string
  /** Datum då någon faktiskt läste sidan */
  last: string | null
  /** true för myndighetskällor — visas med annan markering */
  myndighet: boolean
}

export const KALLOR_PER_O: Record<string, Kalla[]> = ${JSON.stringify(perSlug, null, 2)}

/** Antal öar med minst en publicerbar källa. */
export const OAR_MED_KALLOR = ${Object.keys(perSlug).length}
`

const utvag = resolve(ROT, UTFIL)

if (KONTROLL) {
  let nuvarande = ''
  try { nuvarande = readFileSync(utvag, 'utf8') } catch { /* saknas */ }
  if (nuvarande !== innehall) {
    console.error('✗ kallor.generated.ts är inaktuell. Kör: node scripts/generera-kallor.mjs')
    process.exit(1)
  }
  console.log(`✓ källor: ${Object.keys(perSlug).length} öar, ${totaltKallor} källor — filen är aktuell`)
} else {
  writeFileSync(utvag, innehall)
  console.log(`✓ skrev ${UTFIL}`)
}

console.log(`  öar med publicerbara källor: ${Object.keys(perSlug).length} av ${allaOar.length}`)
console.log(`  källor totalt: ${totaltKallor}`)

if (totaltUtanUrl > 0) {
  console.log('')
  console.log(`  ! ${totaltUtanUrl} KÄLLA-rader saknar öppningsbar URL och kan inte publiceras.`)
  console.log('    Fördelning per fil:')
  for (const rel of FILER) {
    const n = laisFil(rel).reduce((s, o) => s + o.utanUrl, 0)
    if (n > 0) console.log(`      ${rel}: ${n}`)
  }
  console.log('')
  console.log('    En KÄLLA-rad är inte ett bevis förrän någon läst den, och ingen kan')
  console.log('    läsa en rad utan adress. Det här är skuld att beta av, inte ett fel.')
}

#!/usr/bin/env node
/**
 * hamta-obilder.mjs — hämtar ett representativt foto per ö från Wikimedia Commons.
 *
 * Bakgrunden: i september 2026 hade svalla.se noll bilder. Inte bilder som
 * misslyckades ladda — det fanns inga bildelement alls på någon ösida, och på
 * /oar hade alla 103 öar samma platshållarillustration. En destinationssajt
 * utan bilder av destinationerna saknar det besökaren tittar på först.
 *
 * Varför Commons och inte Google Places:
 *   - Fungerar utan API-nyckel och utan konto. Google Places-anropen har legat
 *     på 403 sedan 16 sep och kräver åtgärd i Google Cloud console.
 *   - Fria licenser. Google Places bildlicens kräver att bilderna visas genom
 *     deras egen komponent och begränsar cachning; Commons kräver bara att vi
 *     anger fotograf och licens, vilket vi ändå vill göra.
 *   - upload.wikimedia.org, commons.wikimedia.org och thumb.wikimedia.org låg
 *     redan i CSP:n i next.config.ts. Vägen fanns, den användes bara inte.
 *
 * Hur bilden väljs, i fallande ordning:
 *   1. Wikidata P18 — artikelns UTPEKADE huvudbild. Den är vald av en människa
 *      som skrivit om platsen, och är därför nästan alltid representativ.
 *   2. Commons-kategorin för platsen, första bilden i kategorin.
 * Fritextsökning används INTE. En sökning på "Utö" gav "Scots Pin Utö" — en
 * tall. Ett foto av fel sak är sämre än ingen bild alls, för det ser ut som
 * om vi valt det.
 *
 * Licensspärr: allt som inte är CC0, public domain eller CC BY/BY-SA avvisas.
 * Ingen bild publiceras utan fotografens namn.
 *
 *   node scripts/hamta-obilder.mjs              # hämtar och skriver filen
 *   node scripts/hamta-obilder.mjs --kontroll   # ändrar inget, faller om inaktuell
 *   node scripts/hamta-obilder.mjs --o=uto      # bara en ö, för felsökning
 *   node scripts/hamta-obilder.mjs --stada     # inga nätanrop: kör om spärrarna
 *                                                mot filen som redan finns
 */

import { readFileSync, writeFileSync } from 'node:fs'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const KONTROLL = process.argv.includes('--kontroll')
const ENDAST = (process.argv.find(a => a.startsWith('--o=')) || '').slice(4)
const STADA = process.argv.includes('--stada')

const UTFIL = 'src/app/o/obilder.generated.ts'

/**
 * Wikimedia ber om en User-Agent som säger vem som anropar och hur man når dem.
 * Anrop utan den blockeras. https://meta.wikimedia.org/wiki/User-Agent_policy
 */
const UA = { 'User-Agent': 'Svalla/1.0 (https://svalla.se; info@svalla.se) node-fetch' }

/** Licenser vi får publicera. Allt annat avvisas, även om bilden är bra. */
const FRIA = [
  /^cc0/i, /^public domain/i, /^pd[- ]/i, /^cc[- ]by([- ]sa)?[- ]?\d/i,
  /^cc[- ]by([- ]sa)?$/i, /^attribution/i,
]

const arFri = (licens) => !!licens && FRIA.some(r => r.test(licens.trim()))

/**
 * Commons attributionsfalt ar rorigt. Namnet finns dar, men inbakat i
 * boilerplate: "No machine-readable author provided. Brion VIBBER assumed
 * (based on copyright claims)." blir "Brion VIBBER". "Unknown authorUnknown
 * author" ar samma ord dubblerat av mallen. Vi maste ange fotograf for att fa
 * publicera bilden, sa strangen ska vara lasbar for en manniska.
 */
function stadaFotograf(ra) {
  if (!ra) return ''
  let n = ra.trim()
  // "No machine-readable author provided. X assumed (based on ...)" -> X
  const m = n.match(/no machine-readable author provided\.?\s*(.+?)\s*(?:assumed|~commonswiki|\(based)/i)
  if (m) n = m[1].replace(/~commonswiki.*$/i, '').trim()
  // mallen upprepar sig sjalv: "Unknown authorUnknown author"
  const halva = n.slice(0, Math.floor(n.length / 2))
  if (halva.length > 3 && n === halva + halva) n = halva
  if (/^unknown author$/i.test(n)) n = 'Okänd upphovsperson'
  // "User Tor Svensson on sv.wikipedia" -> "Tor Svensson (sv.wikipedia)"
  const u = n.match(/^user[: ]+(.+?)(?:\s+on\s+(\S+))?$/i)
  if (u) n = u[2] ? `${u[1]} (${u[2]})` : u[1]
  return n.replace(/\s+/g, ' ').trim()
}

/** Ar fotot fran en arkivsamling snarare an en resenars kamera? */
function arArtal(extmetadata) {
  const ra = (extmetadata?.DateTimeOriginal?.value || extmetadata?.DateTime?.value || '')
    .replace(/<[^>]*>/g, '')
  const m = ra.match(/(1[89]\d\d|20[0-2]\d)/)
  return m ? Number(m[1]) : null
}

/** Wikimedia vill inte ha parallella anrop i hög takt. En i taget, med paus. */
const paus = (ms) => new Promise(r => setTimeout(r, ms))

/**
 * Wikimedia svarar 429 nar man gar for fort. Forsta korningen tappade hela
 * Bohuslan-uppsattningen pa det — oar som bevisligen HAR artiklar. Ett fel som
 * ser ut som "ingen bild finns" ar varre an ett som ser ut som ett fel, sa
 * 429 backar av och forsoker igen i stallet for att tolkas som tomt.
 */
async function json(url, forsok = 0) {
  const r = await fetch(url, { headers: UA })
  if (r.status === 429 || r.status === 503) {
    if (forsok >= 4) throw new Error(`HTTP ${r.status} efter ${forsok} forsok`)
    const vanta = 2000 * Math.pow(2, forsok)
    await paus(vanta)
    return json(url, forsok + 1)
  }
  if (!r.ok) throw new Error(`HTTP ${r.status} för ${url.slice(0, 80)}`)
  return r.json()
}

/** Hittar Wikidata-id för en artikel på svenska Wikipedia. */
async function wikidataId(titel) {
  const d = await json('https://sv.wikipedia.org/w/api.php?action=query&format=json&prop=pageprops'
    + '&titles=' + encodeURIComponent(titel) + '&redirects=1')
  const sida = Object.values(d.query?.pages || {})[0]
  if (!sida || sida.missing !== undefined) return null
  return sida.pageprops?.wikibase_item ?? null
}

/** P18 är egenskapen "bild" på ett Wikidata-objekt — artikelns huvudbild. */
async function p18(qid) {
  const d = await json('https://www.wikidata.org/w/api.php?action=wbgetclaims&format=json'
    + '&entity=' + qid + '&property=P18')
  return d.claims?.P18?.[0]?.mainsnak?.datavalue?.value ?? null
}

/** Första bilden i en Commons-kategori, som reserv när P18 saknas. */
async function forstaIKategori(kategori) {
  const d = await json('https://commons.wikimedia.org/w/api.php?action=query&format=json'
    + '&list=categorymembers&cmtype=file&cmlimit=6'
    + '&cmtitle=' + encodeURIComponent('Category:' + kategori))
  const m = d.query?.categorymembers?.[0]
  return m ? m.title.replace(/^File:/, '') : null
}

/** Hämtar licens, fotograf, mått och en thumbnail-URL för en Commons-fil. */
async function filinfo(filnamn) {
  const d = await json('https://commons.wikimedia.org/w/api.php?action=query&format=json'
    + '&prop=imageinfo&iiprop=url|extmetadata|size&iiurlwidth=1200'
    + '&titles=' + encodeURIComponent('File:' + filnamn))
  const sida = Object.values(d.query?.pages || {})[0]
  const ii = sida?.imageinfo?.[0]
  if (!ii) return null
  const em = ii.extmetadata || {}
  const rensa = (v) => (v?.value || '').replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()
  return {
    fil: filnamn,
    url: ii.thumburl || ii.url,
    bredd: ii.thumbwidth || ii.width,
    hojd: ii.thumbheight || ii.height,
    licens: rensa(em.LicenseShortName),
    licensUrl: rensa(em.LicenseUrl) || null,
    fotograf: stadaFotograf(rensa(em.Artist)),
    ar: arArtal(em),
    beskrivningssida: ii.descriptionurl,
  }
}

/**
 * Kandidatnamn för artikeln. Ösidans `name` räcker sällan — "Utö" är en
 * grenordssida — så vi provar med kommun och region som förtydligande.
 */
/**
 * Manuellt avvisade träffar.
 *
 * Bakgrunden: hämtaren kördes, 91 öar fick ett foto, och allt såg rätt ut i
 * loggen — fri licens, namngiven fotograf, modernt årtal. Först när alla 91
 * bilderna lades bredvid varandra och någon faktiskt tittade på dem syntes
 * att fem av dem inte föreställde det de påstod. En spärr som bara läser
 * metadata kan inte se vad bilden visar. Därför finns den här listan, och
 * därför ska ett nytt urval alltid granskas med ögonen innan det publiceras.
 *
 * Varje rad säger vad som var fel. Raderna får inte tas bort utan att någon
 * har tittat på den nya bilden.
 */
const AVVISADE = {
  vaddo: 'Väddö och Häverö skeppslag.jpg är en konturkarta, inte ett foto',
  morko: 'Mörkö location.png är en lägeskarta, inte ett foto',
  graddo: 'närbild på blommor; filnamnet anger dessutom Fejan, inte Gräddö',
  galo: 'svartvitt arkivfoto — Commons saknar datum, så årtalsspärren släppte igenom det',
  langskar: 'samma fil som storskar (D810 0321); vilken ö bilden visar går inte att avgöra',
  storskar: 'samma fil som langskar (D810 0321); vilken ö bilden visar går inte att avgöra',
}

/**
 * Kör spärrarna mot ett färdigt urval. Samma funktion används både efter en
 * hämtning och av --stada, så regeln finns på ett ställe.
 *
 * Dubblettspärren: två öar får aldrig dela bild. Då är minst en av dem fel,
 * och vi vet inte vilken — alltså bort med båda. Tomt är alltid tillåtet.
 */
function sallaBort(urval) {
  const kvar = {}
  const bort = []

  for (const [slug, b] of Object.entries(urval)) {
    if (AVVISADE[slug]) { bort.push([slug, AVVISADE[slug]]); continue }
    /**
     * Commons API:et hänger på sina egna kampanjparametrar
     * (?utm_source=commons.wikimedia.org&utm_campaign=imageinfo) på varje
     * thumburl. Bilden svarar likadant utan dem. Vi skickar inte någon annans
     * spårningsparametrar från våra sidor.
     */
    kvar[slug] = { ...b, url: (b.url || '').split('?')[0] }
  }

  const perUrl = {}
  for (const [slug, b] of Object.entries(kvar)) {
    const nyckel = (b.url || '').split('?')[0]
    ;(perUrl[nyckel] = perUrl[nyckel] || []).push(slug)
  }
  for (const [nyckel, slugs] of Object.entries(perUrl)) {
    if (slugs.length < 2) continue
    for (const slug of slugs) {
      delete kvar[slug]
      bort.push([slug, `delade bild med ${slugs.filter(s => s !== slug).join(', ')} (${nyckel.split('/').pop()})`])
    }
  }

  return { kvar, bort }
}

function kandidater(o) {
  const n = o.name
  const ut = [n]
  if (o.region === 'bohuslan') ut.push(`${n}, Bohuslän`, `${n} (ö)`)
  else ut.push(`${n}, Stockholms skärgård`, `${n} (ö)`, `${n}ön`)
  return [...new Set(ut)]
}

/** Läser slug, namn och region ur datafilerna utan att importera TypeScript. */
function lasOar() {
  const oar = []
  for (const fil of ['src/app/o/island-data.ts', 'src/app/o/bohuslan-data.ts']) {
    const rader = readFileSync(resolve(ROT, fil), 'utf8').split('\n')
    let nu = null
    for (const rad of rader) {
      const s = rad.match(/^\s{4}slug:\s*'([^']+)'/)
      if (s) { nu = { slug: s[1] }; oar.push(nu); continue }
      if (!nu) continue
      const n = rad.match(/^\s{4}name:\s*'([^']+)'/)
      if (n && !nu.name) nu.name = n[1]
      const r = rad.match(/^\s{4}region:\s*'([^']+)'/)
      if (r && !nu.region) nu.region = r[1]
    }
  }
  return oar.filter(o => o.name)
}

const oar = lasOar().filter(o => !ENDAST || o.slug === ENDAST)

const resultat = {}
const utan = []
let avvisadLicens = 0

/**
 * --stada gör inga nätanrop. Den läser urvalet som redan ligger i filen och
 * kör bara spärrarna mot det. Skälet: en omhämtning är ~100 anrop mot
 * Wikimedia och kan ge ett helt annat urval, vilket gör det omöjligt att se
 * vad just spärren ändrade.
 */
if (STADA) {
  const nu = readFileSync(resolve(ROT, UTFIL), 'utf8')
  const i = nu.indexOf('Obild> = ') + 'Obild> = '.length
  const j = nu.indexOf('\n\n/** Öar med')
  Object.assign(resultat, JSON.parse(nu.slice(i, j)))
  console.log(`--stada: läste ${Object.keys(resultat).length} öar ur ${UTFIL}, inga nätanrop.\n`)
}

if (!STADA) console.log(`Söker foto för ${oar.length} öar. Wikidata P18 först, Commons-kategori som reserv.\n`)

for (const o of (STADA ? [] : oar)) {
  let bild = null
  let via = null

  for (const titel of kandidater(o)) {
    try {
      const qid = await wikidataId(titel)
      if (!qid) continue
      const fil = await p18(qid)
      if (fil) {
        bild = await filinfo(fil)
        via = `Wikidata P18 (${qid}, "${titel}")`
        /**
         * Grado fick ett svartvitt arkivfoto av en angbat fran 1910. Sant ar
         * korrekt men inte vad nagon vill se nar de valjer resmal. Ar P18 ett
         * arkivfoto, prova kategorin efter nagot modernare.
         */
        if (bild && bild.ar && bild.ar < 1995) {
          const alt = await forstaIKategori(titel)
          if (alt) {
            const b2 = await filinfo(alt)
            if (b2 && arFri(b2.licens) && b2.fotograf && (!b2.ar || b2.ar >= 1995)) {
              bild = b2
              via = `Commons-kategori "${titel}" (P18 var arkivfoto fran ${b2.ar ? '' : ''}${bild.ar || 'okant ar'})`
            }
          }
        }
        break
      }
      // Ingen P18 — prova Commons-kategorin med samma namn
      const katFil = await forstaIKategori(titel)
      if (katFil) { bild = await filinfo(katFil); via = `Commons-kategori "${titel}"`; break }
    } catch (e) {
      console.warn(`  ! ${o.slug}: ${e.message}`)
    }
    await paus(400)
  }

  if (!bild) { utan.push(o.slug); console.log(`  –  ${o.slug.padEnd(20)} ingen bild`); continue }

  if (!arFri(bild.licens)) {
    avvisadLicens++
    utan.push(o.slug)
    console.log(`  ✗  ${o.slug.padEnd(20)} avvisad licens: ${bild.licens || '(okänd)'}`)
    continue
  }
  if (!bild.fotograf) {
    utan.push(o.slug)
    console.log(`  ✗  ${o.slug.padEnd(20)} fotograf saknas — publiceras inte`)
    continue
  }

  resultat[o.slug] = {
    url: bild.url,
    bredd: bild.bredd,
    hojd: bild.hojd,
    ar: bild.ar ?? null,
    fotograf: bild.fotograf,
    licens: bild.licens,
    licensUrl: bild.licensUrl,
    kalla: bild.beskrivningssida,
  }
  console.log(`  ✓  ${o.slug.padEnd(20)} ${bild.licens.padEnd(14)} ${bild.fotograf.slice(0, 28).padEnd(30)} ${via}`)
  await paus(400)
}

const { kvar: godkanda, bort: avvisade } = sallaBort(resultat)
for (const [slug, skal] of avvisade) {
  if (!utan.includes(slug)) utan.push(slug)
  console.log(`  ✗  ${slug.padEnd(20)} spärrad: ${skal}`)
}

const innehall = `// GENERERAD AV scripts/hamta-obilder.mjs — REDIGERA INTE FÖR HAND.
//
// Ett representativt foto per ö från Wikimedia Commons, valt via Wikidatas
// P18 ("bild") där den finns och Commons-kategorin annars. Fritextsökning
// används inte: den ger fel motiv, och ett foto av fel sak är sämre än inget.
//
// Alla bilder har fri licens och namngiven fotograf. Bägge MÅSTE visas vid
// bilden — det är villkoret för att vi får använda den.

export type Obild = {
  url: string
  bredd: number
  hojd: number
  /** Fotoår enligt Commons, när det finns. Arkivbilder undviks. */
  ar: number | null
  /** Fotografens namn. Ska visas. Licensvillkor, inte artighet. */
  fotograf: string
  /** T.ex. "CC BY-SA 4.0". Ska visas. */
  licens: string
  licensUrl: string | null
  /** Bildens sida på Wikimedia Commons */
  kalla: string
}

export const OBILDER: Record<string, Obild> = ${JSON.stringify(godkanda, null, 2)}

/** Öar med ett publicerbart foto. */
export const OAR_MED_BILD = ${Object.keys(godkanda).length}
`

const utvag = resolve(ROT, UTFIL)

if (KONTROLL) {
  let nuvarande = ''
  try { nuvarande = readFileSync(utvag, 'utf8') } catch { /* saknas */ }
  if (nuvarande !== innehall) {
    console.error(
      STADA
        ? '\n✗ obilder.generated.ts innehåller något spärrarna avvisar.'
          + '\n  Kör: npm run obilder:stada  (inga nätanrop)'
        : '\n✗ obilder.generated.ts är inaktuell. Kör: node scripts/hamta-obilder.mjs',
    )
    process.exit(1)
  }
} else if (!ENDAST) {
  writeFileSync(utvag, innehall)
  console.log(`\n✓ skrev ${UTFIL}`)
}

console.log(`\n  öar med foto:  ${Object.keys(godkanda).length} av ${oar.length}`)
console.log(`  utan foto:     ${oar.length - Object.keys(godkanda).length}`)
if (avvisadLicens) console.log(`  avvisade pga licens: ${avvisadLicens}`)
if (utan.length) console.log(`\n  denna körning tog bort: ${utan.join(', ')}`)

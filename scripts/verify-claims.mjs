#!/usr/bin/env node
/**
 * verify-claims.mjs — spärr mot påståenden utan täckning.
 *
 * Bakgrund. Under en kväll i augusti 2026 hittades följande i produktion:
 *
 *   • /farjor visade 07:15, 09:45, 11:15 på VARJE linje. Seed-data som såg ut
 *     som en tidtabell.
 *   • En SEO-sektion publicerade "Strömkajen 10:00, Djurgårdsbryggan ~10:20,
 *     Vaxholm ~11:10" för Cinderellabåtarna. Djurgårdsbryggan är inte ens en
 *     Cinderella-hållplats.
 *   • Samma text satt kvar i FAQ:n och i JSON-LD:n som Google läser, efter att
 *     sektionen rättats.
 *   • Priser "400–500 kr" och Waxholmslinjer "80, 89, 95, 96" utan belägg.
 *
 * Varje enskilt fall gick att laga. Problemet är att det uppstår igen, för det
 * fanns ingenting som hindrade det. Den här spärren gör det svårt att publicera
 * ett konkret påstående utan att säga varifrån det kommer.
 *
 * REGELN: ett klockslag eller ett pris i en användarsynlig sträng måste ha en
 * källhänvisning inom fem rader ovanför. Det räcker med en kommentar som pekar
 * på var siffran kommer ifrån.
 *
 *     // KÄLLA: stromma.com/sv-se/stockholm/cinderellabatarna/ (hämtad 2026-08-05)
 *     const restid = '2 tim 30 min'
 *
 * Godkända källmarkörer står i KALLMARKORER nedan. Uppmätt via API räknas —
 * "uppmätt mot ResRobot 2026-08-05" är en källa. "Ungefär" är det inte.
 *
 * Kör: node scripts/verify-claims.mjs
 * Exit 1 = bygget stoppas.
 */
import fs from 'fs'
import path from 'path'

const ROT = 'src'

/** Filer där konkreta siffror är innehåll, inte kod. Här gäller regeln. */
const OMFANG = [
  // 2026-08-11: utökat från page.tsx + *-data.ts till HELA src efter att
  // guide-content.ts visade sig innehålla 120 osynliga påståenden — inklusive
  // en tredje kopia av Carlstens felaktiga entrépris. En spärr med blindfläck
  // ger falsk trygghet. Tester undantas — de är inte användarsynliga.
  /^src\/.*\.(ts|tsx)$/,
]
/** Undantag: filer där siffrorna bevisligen inte är påståenden om verkligheten. */
const UNDANTAG = [
  /^src\/app\/admin\//,     // interna verktyg, inte publicerat innehåll
  /^src\/app\/api\//,       // API-logik; källkraven gäller datan de läser
  /\.test\.(ts|tsx)$/,      // tester är inte användarsynliga
  /\.spec\.(ts|tsx)$/,
]

const KALLMARKORER = [
  'källa:', 'kalla:', 'source:', 'uppmätt', 'uppmatt', 'mätt ', 'matt ',
  // PRODUKTREGEL: siffran är VÅR egen — ett pris eller villkor vi själva satt
  // (Loppis-boost, push-tider, achievements). Vi är källan. Ändras regeln
  // ändras koden, så den kan inte driva isär från verkligheten.
  'produktregel:',
  'http://', 'https://', 'resrobot', 'trafiklab', 'strömma', 'stromma',
  'waxholmsbolaget', 'openstreetmap', 'osm ', 'open-meteo', 'google places',
]

/**
 * Klockslag kräver KOLON. Punkt som avgränsare fångade varenda CSS-värde:
 * rgba(0,0,0,0.06) läses annars som "0.06" och gav 1 366 falska träffar vid
 * första körningen. Svenska tidtabeller skriver 10:00, inte 10.00.
 */
const KLOCKSLAG = /\b([01]?\d|2[0-3]):[0-5]\d\b/
/**
 * kr kräver att nästa tecken inte är en bokstav (inkl åäö — "60 kräver" är
 * inte ett pris), och SEK matchas SKIFTLÄGESKÄNSLIGT ("15 sek" är sekunder).
 * Båda buggarna gav falska fynd 2026-08-12.
 */
const PRIS = /(\b\d{1,3}(?:[  .]\d{3})*\s*kr(?![a-zA-ZåäöÅÄÖ])|\b\d{2,5}\s*kr(?![a-zA-ZåäöÅÄÖ])|\bSEK\s*\d{2,5}\b|\b\d{2,5}\s*SEK\b)/

/** Stil- och geometristrängar är inte påståenden om verkligheten. */
const ÄR_STIL = /rgba?\(|[\d.]+px|cubic-bezier|translate|linear-gradient|viewBox|stroke|polygon|T\d{2}:\d{2}:\d{2}|^\s*['"`][\d.,\s-]+['"`]\s*$/

function filer(dir, ut = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name)
    if (f.isDirectory()) { if (!/node_modules|\.next/.test(p)) filer(p, ut) }
    else if (/\.(ts|tsx)$/.test(f.name)) ut.push(p)
  }
  return ut
}

const iOmfang = (f) =>
  OMFANG.some(r => r.test(f)) && !UNDANTAG.some(r => r.test(f))

/** Är raden en kommentar? Då är siffran dokumentation, inte ett påstående. */
const ärKommentar = (rad) => /^\s*(\/\/|\*|\/\*)/.test(rad.trim())

/**
 * En marknadsuppskattning är INTE en källa — men den är heller inte en osanning,
 * så länge den är utmärkt som uppskattning OCH datummärkt. Kravet är strikt:
 *   UPPSKATTNING: <vad den bygger på> (åååå-mm)
 * Utan datum gäller den inte. Uppskattningar räknas separat och skrivs ut, så
 * att de förblir synliga i stället för att försvinna in i "godkänt".
 */
const UPPSKATTNING = /uppskattning:.*\(\d{4}-\d{2}\)/i

function harUppskattningNara(rader, i) {
  for (let k = Math.max(0, i - 5); k <= i; k++) {
    if (UPPSKATTNING.test(rader[k] || '')) return true
  }
  return false
}

function harKallaNara(rader, i) {
  for (let k = Math.max(0, i - 5); k <= i; k++) {
    const l = (rader[k] || '').toLowerCase()
    if (KALLMARKORER.some(m => l.includes(m))) return true
  }
  return false
}

const fynd = []
let uppskattningar = 0
for (const f of filer(ROT)) {
  if (!iOmfang(f)) continue
  const rader = fs.readFileSync(f, 'utf8').split('\n')
  /**
   * Flerradiga template-literals (guide-content.ts är en enda jättesträng)
   * har inga citattecken per rad — utan spårningen nedan var 120 påståenden
   * i guiderna OSYNLIGA för spärren, inklusive en tredje kopia av Carlstens
   * felaktiga entrépris. Backtick-paritet räcker: udda antal på en rad
   * växlar läget. HTML-kommentarer <!-- KÄLLA: ... --> räknas som källa
   * eftersom harKallaNara matchar på 'källa:' oavsett kommentarsyntax.
   */
  let iMallstrang = false
  rader.forEach((rad, i) => {
    const borjadeIMallstrang = iMallstrang
    if (((rad.match(/`/g) || []).length) % 2 === 1) iMallstrang = !iMallstrang
    if (ärKommentar(rad)) return
    // strängliteraler på raden — plus hela raden om vi är inne i en mallsträng
    const strangar = rad.match(/'[^']{2,200}'|"[^"]{2,200}"|`[^`]{2,200}`/g) || []
    if (borjadeIMallstrang && rad.trim().length > 0) strangar.push(rad)
    for (const s of strangar) {
      if (ÄR_STIL.test(s)) continue
      const träffKlocka = KLOCKSLAG.test(s)
      const träffPris = PRIS.test(s)
      if (!träffKlocka && !träffPris) continue
      if (harKallaNara(rader, i)) continue
      if (harUppskattningNara(rader, i)) { uppskattningar++; continue }
      fynd.push({
        fil: f, rad: i + 1,
        typ: träffKlocka ? 'klockslag' : 'pris',
        text: s.slice(0, 90),
      })
    }
  })
}

/**
 * Baslinje. Kodbasen hade 244 obelagda påståenden när spärren skrevs — att
 * kräva källa på alla samtidigt hade stoppat varenda deploy tills någon gått
 * igenom 89 restider i island-data.ts. Baslinjen låter spärren blockera NYA
 * påståenden direkt, medan de gamla betas av.
 *
 * Baslinjen är SKULD, inte godkännande. Varje rad i filen är ett påstående vi
 * publicerar utan att kunna peka på varifrån det kommer. Den ska krympa.
 *
 * Skriv om baslinjen med:  node scripts/verify-claims.mjs --uppdatera-baslinje
 */
const BASLINJE = 'scripts/verify-claims.baseline.json'
const VAKT = 'scripts/verify-claims.vakt.json'
const nyckel = (f) => `${f.fil}::${f.typ}::${f.text}`

/**
 * VAKTVÄRDET — lågvattenmärket för skulden.
 *
 * 2026-08-12 återinförde PR #111 de 83 raderade priserna i island-data.ts och
 * KÖRDE OM BASLINJEN så att spärren tystnade. Regeln "baslinjen får aldrig
 * växa" var en konvention, och konventioner överlever inte parallella
 * sessioner. Detta gör den till kod:
 *
 * - Vaktvärdet sänks AUTOMATISKT när skulden krymper.
 * - Är baslinjen STÖRRE än vaktvärdet failar varje bygge, tills någon
 *   medvetet höjer det med --tillat-vaxt="motivering" (t.ex. dokumenterad
 *   omfångsutökning av spärren). Motiveringen sparas i vaktfilen.
 *
 * En session som slentrianmässigt kör --uppdatera-baslinje efter att ha
 * återinfört skuld får alltså rött bygge — högt och tydligt, inte tyst.
 */
const läsVakt = () => {
  try { return JSON.parse(fs.readFileSync(VAKT, 'utf8')) } catch { return null }
}

if (process.argv.includes('--uppdatera-baslinje')) {
  const rader = fynd.map(nyckel).sort()
  const vakt = läsVakt()
  const växtArg = process.argv.find(a => a.startsWith('--tillat-vaxt='))
  if (vakt && rader.length > vakt.lagvattenmarke && !växtArg) {
    console.error(`\n✗ Baslinjen skulle VÄXA: ${vakt.lagvattenmarke} -> ${rader.length}.`)
    console.error(`  Skulden ska krympa. Har du återinfört tidigare rättade påståenden?`)
    console.error(`  Är växten en medveten omfångsutökning av spärren, kör:`)
    console.error(`    node scripts/verify-claims.mjs --uppdatera-baslinje --tillat-vaxt="<motivering>"`)
    process.exit(1)
  }
  const nyttVaktvarde = vakt && rader.length > vakt.lagvattenmarke
    ? { lagvattenmarke: rader.length, hojd: new Date().toISOString().slice(0, 10), motivering: växtArg.slice('--tillat-vaxt='.length) }
    : { lagvattenmarke: rader.length, sankt: new Date().toISOString().slice(0, 10), motivering: vakt?.motivering ?? null }
  fs.writeFileSync(VAKT, JSON.stringify(nyttVaktvarde, null, 2) + '\n')
  fs.writeFileSync(BASLINJE, JSON.stringify({
    beskrivning: 'Kända påståenden utan källa. SKULD — ska krympa. Får bara växa vid dokumenterad omfångsutökning av spärren (senast 2026-08-11: hela src + mallsträngar).',
    skapad: new Date().toISOString().slice(0, 10),
    antal: rader.length,
    poster: rader,
  }, null, 2) + '\n')
  console.log(`Baslinje skriven: ${rader.length} kända poster`)
  process.exit(0)
}

let känd = new Set()
if (fs.existsSync(BASLINJE)) {
  const bas = JSON.parse(fs.readFileSync(BASLINJE, 'utf8'))
  känd = new Set(bas.poster)
  const vakt = läsVakt()
  if (vakt && bas.poster.length > vakt.lagvattenmarke) {
    console.error(`\n✗ verify-claims: baslinjen (${bas.poster.length}) är STÖRRE än vaktvärdet (${vakt.lagvattenmarke}).`)
    console.error(`  Någon har regenererat baslinjen efter att skuld återinförts — det tystade`)
    console.error(`  spärren i PR #111 och får inte ske tyst igen. Ta bort de återinförda`)
    console.error(`  påståendena, eller höj vaktvärdet MEDVETET med --tillat-vaxt="motivering".`)
    process.exit(1)
  }
}
const nya = fynd.filter(f => !känd.has(nyckel(f)))
const kvarAvBaslinjen = fynd.length - nya.length

if (nya.length === 0) {
  console.log(`✓ verify-claims: inga NYA påståenden utan källa`)
  if (kvarAvBaslinjen > 0) {
    console.log(`  (${kvarAvBaslinjen} kända kvar i baslinjen — skuld att beta av)`)
  }
  if (uppskattningar > 0) {
    console.log(`  (${uppskattningar} märkta marknadsuppskattningar — inte källor, ska omprövas varje säsong)`)
  }
  process.exit(0)
}
const fyndAttVisa = nya

console.error(`\n✗ verify-claims: ${fyndAttVisa.length} NYTT påstående utan källa\n`)
for (const f of fyndAttVisa) {
  console.error(`  ${f.fil}:${f.rad}  [${f.typ}]`)
  console.error(`     ${f.text}`)
}
console.error(`
Ett klockslag eller pris i användarsynlig text måste gå att spåra.
Lägg en kommentar inom fem rader ovanför, t.ex.:

    // KÄLLA: stromma.com/.../cinderellabatarna (hämtad 2026-08-05)
    // eller: uppmätt mot ResRobot 2026-08-05

Saknas källa för att ingen operatör publicerar priset — t.ex. ett marknadsspann
över många uthyrare — ska det märkas som uppskattning MED datum, och sägas rakt
ut för besökaren i gränssnittet:

    // UPPSKATTNING: spann över flera uthyrare, ej hämtat per aktör (2026-08)

Går siffran inte att belägga ska den INTE publiceras. Skriv hellre
"se operatörens tidtabell" med en länk än en siffra vi inte kan stå för.
`)
process.exit(1)

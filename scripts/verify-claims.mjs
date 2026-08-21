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
 * ── KÄLLHIERARKI (införd 2026-08-19) ─────────────────────────────────────────
 *
 * Bakgrund: Bullerö. Sidan påstod att ön var ett naturreservat förvaltat av
 * Skärgårdsstiftelsen, att Waxholmsbolaget trafikerade den, och att gästhamnen
 * hade 15 platser. Allt fel. Reservatet hade upphört 2025 och uppgått i
 * Nämdöskärgårdens nationalpark; trafiken sköts av Bullerölinjen; ön har inga
 * gästhamnsplatser alls. Felen upptäcktes inte av oss utan av personal på
 * nationalparken, som hörde av sig via feedbackformuläret.
 *
 * En rättelse gjordes först utifrån destinationens EGEN sida (bullero.se) och
 * hade fortfarande fel om skyddsstatusen. Läxan: för juridisk och administrativ
 * status gäller MYNDIGHETEN, aldrig destinationens egen presentation.
 *
 * NIVÅ 1 — myndighet. Enda giltiga källan för status, föreskrifter, sjökort:
 *   sjofartsverket.se (Ufs), naturvardsverket.se, sverigesnationalparker.se,
 *   lansstyrelsen.se, trafikverket.se, smhi.se, lantmateriet.se, kommuner (.se)
 *
 * NIVÅ 2 — operatör om sig själv. Giltig för egen tidtabell, eget pris,
 *   egna öppettider: waxholmsbolaget.se, sl.se, vasttrafik.se, battaxi.se,
 *   stromma.com, samt varje krogs/gästhamns egen webbplats.
 *
 * NIVÅ 3 — aggregator. Giltig men ska namnges:
 *   gasthamnsguiden.se, svenskagasthamnar.se, destinationssajter.
 *
 * SVAGA KÄLLOR — duger för geometri och koordinater, ALDRIG för påståenden om
 * djup, segelfri höjd, fartgräns, skyddsstatus, pris eller öppettid:
 *   OpenStreetMap, Wikipedia, TripAdvisor, resebloggar.
 *
 * Skurusundet är exemplet: OSM:s maxheight-tagg är en fordonsbegränsning för
 * trafiken PÅ bron, inte segelfri höjd under den. Vi läste den som det senare.
 */
const SVAGA_KALLOR = [
  'openstreetmap', 'osm ', 'osm/', 'osm way', 'wikipedia', 'wikimedia',
  'tripadvisor', 'blogg', 'blogspot', 'wordpress.com',
]

/** Påståendetyper där en svag källa INTE räcker — de kräver nivå 1 eller 2. */
const KRAVER_STARK_KALLA = new Set(['djup', 'segelfri höjd', 'knop', 'skyddsstatus'])

/**
 * SKYDDSSTATUS — ny kategori 2026-08-19, direkt följd av Bullerö.
 *
 * Skyddsstatus ändras genom myndighetsbeslut och vår data blir gammal utan att
 * någon märker det. Nationalparksreformen 2025 gjorde 29 av våra öar potentiellt
 * inaktuella. Varning tills de är genomgångna — att fälla bygget nu hade tvingat
 * fram gissningar, vilket är exakt fel medicin.
 */
const SKYDD_ORD = '(?:naturreservat|nationalpark|fågelskyddsområde|sälskyddsområde|Natura\\s*2000)'
const SKYDDSSTATUS = new RegExp(
  // "Bullerö naturreservat" — namngiven plats + skyddsform = statuspåstående
  `\\b[A-ZÅÄÖ][a-zåäöé]{2,}(?:s|ns)?\\s+${SKYDD_ORD}\\b` +
  // "är ett naturreservat", "ingår i nationalparken", "förvaltas av"
  `|\\b(?:är|ingår\\s+i|del\\s+av|utgör|bildades|förvaltas\\s+av|skyddas\\s+som)\\s+` +
  `(?:ett\\s+|en\\s+|den\\s+|delar\\s+av\\s+)?${SKYDD_ORD}` +
  // "naturreservatets föreskrifter/regler" — påstår att regelverk gäller
  `|${SKYDD_ORD}s(?:\\s+|)(?:föreskrifter|regler|bestämmelser)`,
  'i'
)

/**
 * FÄLTPÅSTÅENDEN — ny kategori 2026-08-19.
 *
 * BLINDFLÄCK 4: spärren läste bara STRÄNGAR. Ett påstående som `spots: 150`
 * är en bar siffra utan citattecken och var därför osynlig. Det lät 90
 * påhittade båtplatssiffror passera — Utö angavs till 150 när verkligheten är
 * omkring 300, Sandhamn till 300 när det är omkring 150. Två av tre stickprov
 * var materiellt fel, i båda riktningarna.
 *
 * Fältet renderas som "150 platser" för besökaren. Att siffran saknar
 * citattecken i koden gör den inte mindre till ett påstående om verkligheten.
 *
 * TOMT ÄR ALLTID TILLÅTET. Ett utelämnat fält påstår ingenting och ska aldrig
 * varna. Hellre kort text än fel text.
 */
const FALTPASTAENDEN = /^\s*(spots|depth_m|height_m|area_km2|population|beds|capacity|length_m|elevation_m)\s*:\s*\d/

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

/**
 * DJUP OCH SEGELFRI HÖJD — tillagt 2026-08-15 efter granskningen.
 *
 * Spärren såg bara klockslag och priser. Ett fel klockslag gör att någon står
 * kvar på bryggan; ett fel djup gör att någon går på grund. Ändå var djupet
 * den enda av de två som ingen kontrollerade.
 *
 * Vad granskningen hittade i produktion, allt osett av spärren:
 *   • Baggensstäket och Knapens hål stod med "max 3 m djupgående". Källan sa
 *     att sundet är tre meter DJUPT och att det är SKYLTAT 2 m. Vi hade läst
 *     ett vattendjup som ett djupgående och struntat i parentesen.
 *   • Skurusundet stod med segelfri höjd 30 m, hämtat ur OSM:s maxheight —
 *     som är en fordonsbegränsning för trafiken PÅ bron. Nautiska taggen på
 *     samma bro säger 29.
 *   • /naturhamnar publicerade ankringsdjup och bottentyp för tolv öar utan
 *     en enda källa.
 *
 * Distans (sjömil) räknas OCKSÅ, men som varning: tio träffar finns kvar och
 * ingen av dem är granskad än. Att fälla bygget på dem nu hade tvingat fram
 * snabba gissningar, vilket är precis fel medicin.
 */
const DJUP = /\b\d{1,2}(?:[.,]\d)?\s*(?:–|-|till)?\s*\d{0,2}(?:[.,]\d)?\s*m(?:eter)?\s+djup|\bdjup(?:et|gående)?\s+(?:är\s+)?\d{1,2}(?:[.,]\d)?\s*m|\b\d{1,2}(?:[.,]\d)?\s*m\s+djupgående|\bdjup\s+\d{1,2}(?:[.,]\d)?\s*[–-]\s*\d{1,2}(?:[.,]\d)?\s*m/i
const HOJD = /segelfri\s+höjd[^.]{0,25}?\d{1,3}(?:[.,]\d)?\s*m|\bbrohöjd[^.]{0,25}?\d{1,3}(?:[.,]\d)?\s*m/i
const DISTANS = /\b\d{1,4}\s*(?:sjömil|distansminuter)\b/i
/**
 * KNOP — varningskategori sedan 2026-08-16. Fart används på två vis i koden:
 * som VÅRT räkneantagande (restider) och som PÅSTÅENDE om världen
 * (fartgränser: "7 knop innanför gul boj", "5 knop inom 300 m"). Det första
 * ska vara märkt UPPSKATTNING/PRODUKTREGEL, det andra kräver källa — och
 * granskningen 16/8 hittade fartgränspåståenden som ingen belagt. Varning,
 * inte fel, tills de är genomgångna.
 */
const KNOP = /\b\d{1,2}(?:[.,]\d)?\s*knops?\b/i

/**
 * Stil- och geometristrängar är inte påståenden om verkligheten.
 *
 * BLINDFLÄCK 3, hittad 2026-08-12: filtret kördes på HELA RADEN. I en
 * HTML-mall med inline-CSS betyder det att all text som råkar dela rad med
 * ett style-attribut blev osynlig. Konkret dolde det påståendet "Wikströms
 * räkmacka stänger 16:00 i maj, 21:00 i juli" i välkomstmailet — två
 * klockslag om en namngiven verksamhet, i ett mail till varje ny användare,
 * som ingen kontrollerat och som spärren aldrig kunde se.
 *
 * Fixen: skala bort style-attributens INNEHÅLL först, granska texten som
 * blir kvar. font-size:15px försvinner, "16:00 i maj" syns.
 */
const ÄR_STIL = /^\s*['"`][\d.,\s-]+['"`]\s*$|cubic-bezier|linear-gradient|viewBox|polygon\s*\(|T\d{2}:\d{2}:\d{2}/

/**
 * Tar bort det som bevisligen är formatering, så att brödtexten på samma rad
 * kan granskas: style="...", class="...", och lösa CSS-deklarationer.
 */
function utanStil(s) {
  return s
    .replace(/\bstyle\s*=\s*(["'])[\s\S]*?\1/gi, ' ')
    .replace(/\bclass(Name)?\s*=\s*(["'])[\s\S]*?\2/gi, ' ')
    .replace(/[a-z-]+\s*:\s*[^;"'`]*(px|em|rem|%|deg|vh|vw)\b[^;"'`]*/gi, ' ')
    .replace(/rgba?\([^)]*\)/gi, ' ')
    .replace(/#[0-9a-f]{3,8}\b/gi, ' ')
}

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

/**
 * Är den närliggande källan SVAG? Används bara för påståendetyper i
 * KRAVER_STARK_KALLA. En rad som citerar OpenStreetMap räknas fortfarande som
 * källa för koordinater — men inte för brohöjd.
 */
function harBaraSvagKalla(rader, i) {
  let sagSvag = false
  for (let k = Math.max(0, i - 5); k <= i; k++) {
    const l = (rader[k] || '').toLowerCase()
    if (!KALLMARKORER.some(m => l.includes(m))) continue
    if (SVAGA_KALLOR.some(m => l.includes(m))) { sagSvag = true; continue }
    return false // hittade en källa som INTE är svag
  }
  return sagSvag
}

const fynd = []
const varningar = []
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

    /**
     * FÄLTPÅSTÅENDEN granskas på RADEN, inte i strängar — `spots: 150` har
     * inga citattecken och var därför osynlig för spärren fram till 2026-08-19.
     * Ett utelämnat fält matchar aldrig: tomt påstår ingenting.
     */
    if (FALTPASTAENDEN.test(rad) && !harKallaNara(rader, i)) {
      varningar.push({ fil: f, rad: i + 1, typ: 'fältpåstående', text: rad.trim().slice(0, 90) })
    }
    // strängliteraler på raden — plus hela raden om vi är inne i en mallsträng
    const strangar = rad.match(/'[^']{2,200}'|"[^"]{2,200}"|`[^`]{2,200}`/g) || []
    if (borjadeIMallstrang && rad.trim().length > 0) strangar.push(rad)
    for (const s of strangar) {
      if (ÄR_STIL.test(s)) continue
      const rent = utanStil(s)
      const träffKlocka = KLOCKSLAG.test(rent)
      const träffPris = PRIS.test(rent)
      const träffDjup = DJUP.test(rent)
      const träffHojd = HOJD.test(rent)
      const träffDistans = DISTANS.test(rent)
      const träffKnop = KNOP.test(rent)
      const träffSkydd = SKYDDSSTATUS.test(rent)
      if (!träffKlocka && !träffPris && !träffDjup && !träffHojd && !träffDistans && !träffKnop && !träffSkydd) continue

      const typ = träffKlocka ? 'klockslag'
        : träffPris ? 'pris'
        : träffDjup ? 'djup'
        : träffHojd ? 'segelfri höjd'
        : träffDistans ? 'distans'
        : träffKnop ? 'knop'
        : 'skyddsstatus'

      /**
       * KÄLLKVALITET. En källa räcker inte alltid — för djup, segelfri höjd,
       * fartgräns och skyddsstatus krävs myndighet eller operatör. OSM duger
       * för koordinater, inte för brohöjd (Skurusundet, 2026-08-15).
       */
      if (harKallaNara(rader, i)) {
        if (KRAVER_STARK_KALLA.has(typ) && harBaraSvagKalla(rader, i)) {
          varningar.push({ fil: f, rad: i + 1, typ: `${typ} — SVAG KÄLLA`, text: s.slice(0, 90) })
        }
        continue
      }
      if (harUppskattningNara(rader, i)) { uppskattningar++; continue }

      // Distans, knop och skyddsstatus varnar men fäller inte — se kommentarerna ovan.
      if (typ === 'distans' || typ === 'knop' || typ === 'skyddsstatus') {
        varningar.push({ fil: f, rad: i + 1, typ, text: s.slice(0, 90) }); continue
      }
      fynd.push({ fil: f, rad: i + 1, typ, text: s.slice(0, 90) })
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

/** Varningar fäller inte bygget, men ska synas. Tystnad blir till glömska. */
function skrivVarningar() {
  if (varningar.length === 0) return
  const grupper = {}
  for (const v of varningar) (grupper[v.typ] ||= []).push(v)

  console.log(`\n! ${varningar.length} påståenden att granska (varning, fäller inte bygget):`)
  for (const [typ, lista] of Object.entries(grupper).sort((a, b) => b[1].length - a[1].length)) {
    console.log(`\n  ── ${typ} (${lista.length}) ──`)
    for (const v of lista.slice(0, 6)) {
      console.log(`    ${v.fil}:${v.rad}  ${v.text.replace(/\s+/g, ' ').slice(0, 88)}`)
    }
    if (lista.length > 6) console.log(`    … och ${lista.length - 6} till`)
  }
  console.log(`
  Att beta av, i prioritetsordning:
    1. SVAG KÄLLA   — källan duger inte för påståendetypen (t.ex. OSM för brohöjd)
    2. skyddsstatus — ändras genom myndighetsbeslut; kontrollera mot
                      naturvardsverket.se / sverigesnationalparker.se / lansstyrelsen.se
    3. fältpåstående — bar siffra i datafil, t.ex. spots: 150 (Bullerö-felet)
    4. knop/distans  — fartgränser och avstånd utan belägg

  Kom ihåg: TOMT ÄR ALLTID TILLÅTET. Går siffran inte att belägga — ta bort den.
  Hellre kort text än fel text.`)
}

if (nya.length === 0) {
  console.log(`✓ verify-claims: inga NYA påståenden utan källa`)
  skrivVarningar()
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

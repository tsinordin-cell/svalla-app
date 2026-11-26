/**
 * Regler som flera sidmallar under /o/[slug] delar, så att ösidan och undersidorna säger samma sak
 * om samma data (faktagranskningen, omarbete 4, 2026-11-07).
 */
import { harKlockslag } from './klockslag.mjs'

export { harKlockslag }

/**
 * En post vars första mening säger att det saknas på ön ("har vi inte kunnat belägga", "ingen badplats")
 * eller pekar till grannön ("Närmast …", "grannön") räknas inte: Vindö (boende och bad på Djurö),
 * Öckerö (hotell på Hönö) (mall-0002 omarbete 3).
 */
export function pekarBort(desc: string): boolean {
  return /^Närmast|grannön|har vi inte kunnat belägga|ingen badplats/i.test(desc.split(/(?<=\.)\s/)[0] ?? '')
}

/**
 * Är posten i restaurants en butik? Lanthandlar och livsmedelsbutiker står i restaurants (Coop Ingmarsö, Tempo Runmarö,
 * Svartsö Lanthandel, Handelsboden på Kymmendö: typ "Handel" eller "Livsmedelsbutik") men är varken restauranger, krogar
 * eller kaféer. En typ som också nämner servering eller kafé ("Café & lanthandel", "Handelsbod, servering & pub") räknas
 * som ställe att äta (Kontrollantens fynd mo01-k040, k055; mallarnas runda 7, 2026-11-17).
 */
export function arButik(typ: string): boolean {
  return /^(?:handel|handelsbod|lanthandel|livsmedelsbutik|butik|dagligvaror)$/i.test(typ.trim())
}

/**
 * Handlar aktiviteten om bad? Badtunnor (Lidö) och en badstege vid bastun (Bullerö) är ingen badplats,
 * och en post som pekar bort räknas inte. Samma regel på ösidan (metabeskrivningens "badplatser") och
 * på badsidan (metabeskrivning, og:description och undertitel) (mall-0002 omarbete 3; mall-0191 och
 * mall-0192 omarbete 4).
 */
export function omBad(a: { name: string; desc: string }): boolean {
  return !pekarBort(a.desc)
    && /bad|simning|sandstr[aä]nd|stenstrand/i.test(`${a.name} ${a.desc}`.replace(/badtunn[a-zåäö]*|badsteg[a-zåäö]*/gi, ''))
}

/**
 * Ordet för boende i ösidans titel och metabeskrivning. "boende" bara för övernattning under tak: hotell, B&B,
 * vandrarhem, pensionat, stugor, rum, uthyrningshus, sjöbodar och glamping, eller en camping eller gästhamn vars
 * text nämner stugor eller villavagnar. Har ön bara tält-, camping- eller ställplatser blir ordet "tältning"
 * (Askö "Tältning i reservatet", Yttre Gården "Tältning (allemansrätten)", Torö "Husvagn, husbil och tält i
 * Örens naturreservat"), annars inget. Poster som pekar bort räknas inte (utanför-2, mall-0003 omarbete 4, 2026-11-07).
 */
export function boendeOrd(boenden: { type: string; desc: string }[]): 'boende' | 'tältning' | '' {
  const riktiga = boenden.filter(a => !pekarBort(a.desc))
  if (riktiga.some(a => /hotell|b&b|vandrarhem|pensionat|stug|\brum\b|uthyrningshus|sjöbod|glamping/i.test(a.type)
    || /\bstugor\b|\bstuga\b|\bvillavagnar\b|\bglamping\b/i.test(a.desc))) return 'boende'
  if (riktiga.some(a => /tält|camping|ställplats/i.test(`${a.type} ${a.desc}`))) return 'tältning'
  return ''
}

/**
 * Restiden utan de led som bär klockslag. facts.travel_time är på Lilla Karlsö "…; båten till ön avgår 09.00"
 * och på Blå Jungfrun "…; avgång 09.00, hemma 15.15 eller 16.15", och mallarna skriver inga klockslag i
 * löptext (ARBETSREGLER). Ett led (mellan semikolon, annars mellan kommatecken) med klockslag stryks;
 * "ca 1,5 tim" delas inte (mall-0166 omarbete 4, 2026-11-07). Klockslag enligt src/lib/klockslag.mjs, samma regel
 * som källistan (mallarnas runda 6, 2026-11-16).
 */
export function utanKlockslag(text: string): string {
  // En parentes med klockslag stryks först, så att ledet står kvar: Rörös turtäthet "Vardagar 26 ordinarie turer Burö till
  // Rörö (05 till 21), därtill kallelseturer nattetid" (Kontrollantens fynd mo01-k046; mallarnas runda 7, 2026-11-17).
  return text
    .replace(/\s*\([^()]*\)/g, p => (harKlockslag(p) ? '' : p))
    .split(/;\s*/)
    .map(led => (harKlockslag(led) ? led.split(/,\s+/).filter(d => !harKlockslag(d)).join(', ') : led))
    .filter(led => led.trim() !== '')
    .join('; ')
    .trim()
}

/**
 * Förkortningar som slutar med punkt utan att meningen slutar ("kl. 08.00", "(t.ex. lördag …)", "bl.a. Singöbron").
 * Delningen vid punkt klippte förut efter dem och lämnade fragment som "…går båten kl." (Kontrollantens fynd ma5011,
 * omkontrollen av runda 5; mallarnas runda 6, 2026-11-16). "min." och "tim." är inte med: i datan slutar de meningar
 * ("ca 45–50 min. Vissa turer …" på Husarö).
 */
const FORKORTNING = /^(?:kl|klockan|t\.ex|bl\.a|m\.fl|m\.m|ca|c:a|s\.k|dvs|d\.v\.s|resp|inkl|exkl|osv|o\.s\.v|etc|jfr|obs|nr|tel|f\.d|p\.g\.a|pga|fr\.o\.m|t\.o\.m|e\.d|o\.d|ev|enl|ang|ung|s:t|ff)\.$/i

/**
 * Texten delad i meningar. En mening slutar med punkt, utrops- eller frågetecken (ev. följt av en slutparentes eller
 * ett citattecken) när nästa tecken är en versal, en siffra, en startparentes eller ett citattecken och ordet före
 * punkten inte är en förkortning. "1–26 juli går båten …" efter "…från Nynäshamn." är alltså en ny mening, men
 * "kl. 08.00" och "(t.ex. lördag …)" delas inte.
 */
export function meningar(text: string): string[] {
  const ut: string[] = []
  let start = 0
  for (const m of text.matchAll(/[.!?]+["'”’)]?\s+/gu)) {
    const slut = (m.index ?? 0) + m[0].length
    const nasta = text.charAt(slut)
    if (!/[\p{Lu}\d("'„”]/u.test(nasta)) continue
    const ord = (text.slice(start, (m.index ?? 0) + 1).match(/(\S+)$/)?.[1] ?? '').replace(/^[("'„”]+/, '')
    if (FORKORTNING.test(ord)) continue
    ut.push(text.slice(start, slut).trim())
    start = slut
  }
  const rest = text.slice(start).trim()
  if (rest) ut.push(rest)
  return ut.filter(Boolean)
}

/**
 * Texten utan klockslag, mening för mening. FAQ-svaren och korten med färdsätt återger getting_there-texterna, som på
 * 23 öar har avgångstider ("Avgång 09.00, tillbaka i Djupvik senast 13.30" på Lilla Karlsö), och mallarna skriver inga
 * klockslag i löptext (ARBETSREGLER; Vaktens lista, mallarnas runda 5, 2026-11-10). Först stryks en parentes med
 * klockslag ("(t.ex. 09.12 → Öckerö färjeläge 10.12)"), så att resten av meningen står kvar; har meningen ändå ett
 * klockslag stryks hela meningen. Klockslag enligt src/lib/klockslag.mjs, också "kl. 08–18" och "vid 21-tiden", och
 * meningarna delas inte vid förkortningar (mallarnas runda 6, 2026-11-16, ma5011).
 */
export function utanKlockslagsmeningar(text: string): string {
  const utanParentes = text.replace(/\s*\([^()]*\)/g, p => (harKlockslag(p) ? '' : p))
  return meningar(utanParentes).filter(m => !harKlockslag(m)).join(' ').trim()
}

/**
 * Ett färdsätt som korten visar det: tiden bara när den inte är ett klockslag (Lilla Karlsö "09.00–13.30" är avgång och
 * återkomst) och texten utan klockslag (utanKlockslagsmeningar). Används av korten på komma-dit, så att de följer samma
 * regel som FAQ-svaren (Kontrollantens fynd utanför-1, mallarnas runda 6, 2026-11-16).
 */
export function fardUtanKlockslag<T extends { time?: string; desc: string }>(t: T): T {
  return { ...t, time: t.time && !harKlockslag(t.time) ? t.time : undefined, desc: utanKlockslagsmeningar(t.desc) }
}

/**
 * Reglerna för klockslag på en sida: de vanliga när sidan stryker klockslag, annars sådana som lämnar texten orörd
 * (Toms beslut 10, C; src/lib/klockslagStrykning.ts; mallarnas runda 7, 2026-11-17).
 */
export function klockslagsregler(stryk: boolean) {
  return stryk
    ? { harKlockslag, utanKlockslag, utanKlockslagsmeningar, fardUtanKlockslag }
    : {
        harKlockslag: (_text: string) => false,
        utanKlockslag: (text: string) => text,
        utanKlockslagsmeningar: (text: string) => text,
        fardUtanKlockslag: <T extends { time?: string; desc: string }>(t: T): T => t,
      }
}

/**
 * from-värden som inte är en ort: "Valfri hamn" (13 färdsätt), "Varierar" (Svenska Högarna), "Egen utgångspunkt"
 * (Trysunda), "Flera svenska städer" (Gotland) och "Runt Mälaren" (Birka). Värdet börjar med ett vanligt ord i stället
 * för ett ortnamn, och "från" skrivs inte (Kontrollantens fynd ma5026; mallarnas runda 6, 2026-11-16). "Lidingö eller
 * valfri brygga" börjar med en ort och står kvar.
 */
const INTE_ORT = /^(?:valfri|valfritt|varierar|egen|eget|flera|runt|olika|alla)(?!\p{L})/iu

/**
 * Färdsättet med avreseorten, utan att orten står två gånger: "Waxholmsbåt från Stavsnäs" med from
 * "Stavsnäs vinterhamn" blev "Waxholmsbåt från Stavsnäs från Stavsnäs vinterhamn" på 13 öar (mallarnas
 * Skribent runda 3; runda 5, 2026-11-10). Står orten redan i färdsättet läggs den inte till; står en annan
 * ort där kommer from inom parentes ("Båt från Värmdö (Lillsved eller Boda)"). Är from ingen ort (INTE_ORT)
 * blir det bara färdsättet: "Egen båt", inte "Egen båt från Valfri hamn" (runda 6). Korten på ösidan, komma-dit och
 * boende skriver "från <from>" bara när arOrt(from) (mallarnas runda 7, 2026-11-17).
 */
export function arOrt(from?: string): boolean {
  return !!from?.trim() && !INTE_ORT.test(from.trim())
}

export function fardsattFran(method: string, from?: string): string {
  const fran = from?.trim()
  if (!fran || INTE_ORT.test(fran)) return method
  const m = method.match(/\bfrån\s+([A-ZÅÄÖ][\p{L}-]*)/u)
  if (!m) return `${method} från ${fran}`
  return fran.toLowerCase().includes(m[1]!.toLowerCase()) ? method : `${method} (${fran})`
}

/**
 * Svårighetsgraden ur öns data (activity_meta.kajak.difficulty), aldrig en fast grad. Förut blev allt som inte var
 * "lätt" eller "medel" till "Svår", också "lätt–medel" på Djurö och Tjärö (MÄTT 2026-11-10). Mallen klarar 'lätt',
 * 'medel', 'svår' och ett spann av två i stigande ordning ('lätt till medel', 'medel till svår', också med – eller -,
 * som datan skrev före main:s PR #540). Spannet skrivs med "till", som main skriver intervall (mallarnas runda 7,
 * 2026-11-17). Annat värde, eller inget värde, ger ingen grad (mallarnas runda 5, 2026-11-10). Har datan fältet
 * difficultyFor står det inom parentes: { difficulty: 'lätt till medel', difficultyFor: 'guidade turer' } blir "Lätt till
 * medel (guidade turer)". Mallen sätter
 * inget sådant värde själv, och i den här patchen har ingen ö fältet; Vaxholms rad får det av öns Skribent (omarbete 4c,
 * ob4043; full-25 k069), inte av mallarna (Kontrollantens anmärkning utanför-2, runda 6, 2026-11-16).
 */
const GRADER = ['lätt', 'medel', 'svår'] as const
const GRAD_FARG: Record<(typeof GRADER)[number], string> = { lätt: '#2e9e5b', medel: '#d9a413', svår: '#c94f3d' }
export function kajakGrad(kajak?: { difficulty?: string; difficultyFor?: string }): { text: string; farg: string } | null {
  const delar = (kajak?.difficulty ?? '').trim().toLowerCase().split(/\s*(?:[–-]|\btill\b)\s*/)
  const index = delar.map(d => (GRADER as readonly string[]).indexOf(d))
  const giltig = (delar.length === 1 || (delar.length === 2 && index[0]! < index[1]!)) && index.every(i => i >= 0)
  if (!giltig || !delar[0]) return null
  const text = delar.join(' till ')
  const fortsattning = kajak?.difficultyFor?.trim() ? ` (${kajak.difficultyFor.trim()})` : ''
  return { text: `${text.charAt(0).toUpperCase()}${text.slice(1)}${fortsattning}`, farg: GRAD_FARG[delar[delar.length - 1] as (typeof GRADER)[number]] }
}

/**
 * Undertiteln på aktivitetssidan, räknad i samma tre lägen som rubrikerna (aktivitetensLage i src/lib/badLage.ts): på ön,
 * på och nära ön, nära ön. Förut räknades "på och nära" som "nära ön", så Utö fick "en till nära ön" medan samma kort stod
 * under "Aktiviteter på och nära Utö" (Kontrollantens fynd sm08-k006; mallarnas runda 10, 2026-11-17).
 */
export function aktivitetsUndertitel(namn: string, antal: { pa: number; bada: number; annan: number }): string {
  const tal = (n: number) => (n === 1 ? 'en' : String(n))
  const delar: string[] = []
  if (antal.pa > 0) delar.push(`${antal.pa === 1 ? 'en aktivitet' : `${antal.pa} aktiviteter och upplevelser`} på ${namn}`)
  for (const [n, ord] of [[antal.bada, 'på och nära ön'], [antal.annan, 'nära ön']] as const) {
    if (n === 0) continue
    delar.push(delar.length > 0 ? `${tal(n)} till ${ord}` : `${n === 1 ? 'en aktivitet' : `${n} aktiviteter`} ${ord}`)
  }
  const text = delar.length <= 1 ? (delar[0] ?? '') : `${delar.slice(0, -1).join(', ')} och ${delar[delar.length - 1]}`
  return text.charAt(0).toUpperCase() + text.slice(1)
}

/**
 * Urvalet "Aktiviteter för barn" på med barn-sidan. Förut räckte det att något av orden barn, familj, bad, strand, cykel,
 * lätt eller nybörjar stod någonstans i namnet eller texten, så Husarös "Fiske" kom med för att texten slutar "tillsammans
 * med vandring och bad", och Pater Nosters sälsafari för "kobbarna" (Kontrollantens fynd sm05-k003; mallarnas runda 10,
 * 2026-11-17). Nu: namnet säger vad aktiviteten är (ordet kan stå inne i namnet, som i "Klippbad"); i texten räknas bara
 * ord som börjar med barn-, familj-, nybörjar-, lätt- eller cykel-, och bad bara som bada, badplats, badstrand, badvik,
 * badklippor, badvänlig, klippbad och sandstrand. "Strand" ensamt (strandängar, Strandgatan) och "bad" ensamt räknas inte i texten.
 */
const BARN_NAMN = /barn|familj|bad|strand|cykel|cykl|lätt|nybörjar/i
const BARN_TEXT = /(?<![a-zåäöéü])(barn|familj|nybörjar|lätt|cykel|bada|badplats|badstrand|badvik|badklipp|badvänlig|klippbad|sandstrand)/i
export function barnAktivitet(a: { name: string; desc: string }): boolean {
  return BARN_NAMN.test(a.name) || BARN_TEXT.test(a.desc)
}

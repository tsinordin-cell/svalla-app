/**
 * Klockslag i Svallas texter: en regel för källistan, FAQ-svaren och korten med färdsätt
 * (faktagranskningen, mallarnas runda 6, 2026-11-16; Kontrollantens fynd ma5011 och ma5029).
 *
 * Arbetsreglerna tillåter inga klockslag, avgångstider eller öppettider i löptext. Regeln används av
 * scripts/generera-kallor.mjs och dess --kontroll (källistans citat), av src/lib/mallRegler.ts (FAQ-svaren
 * och korten med färdsätt på ösidan, komma-dit, boende och med barn) och av testet i src/lib/klockslag.test.ts.
 * Modulen är ren JavaScript så att generatorn kan läsa den utan byggsteg.
 *
 * Ett klockslag är:
 *  - en tid med minuter: 07.05, 7.05, 15:15, 24:00, 10.05b (fotnotsbokstav), 9:00 AM, med eller utan
 *    "kl." eller "klockan" före, också utan mellanslag ("kl.11.30");
 *  - en hel timme efter "kl" eller "klockan": "kl. 11", "kl 18", "kl. 08–18", "klockan 9";
 *  - fyra siffror efter "kl": "kl 1300", "kl 0800 - 2000";
 *  - ett timintervall efter en dag eller "öppet": "alla dagar 11 - 16", "fre 10–16", "Fre - Sönd (25 - 27 sept) 11 - 16";
 *  - "-tiden": "vid 22-tiden";
 *  - ett timintervall som ensamt fyller en parentes: "Burö till Rörö (05 till 21)", "(05–21)", "Toatömning (08 till 18)"
 *    (Kontrollantens fynd mo01-k046; mallarnas runda 7, 2026-11-17). Main skriver sedan PR #540 intervall med "till".
 * Ett timintervall utan "kl" (efter en dag eller i en parentes) räknas bara när det börjar klockan 5 eller senare och
 * spänner minst två timmar, eller går över midnatt från kvällen.
 * Ett intervall (09.00–13.30, kl 0800 - 2000) och flera klockslag i rad blir ett enda "…" i källistan.
 *
 * Inte klockslag: årtal och årtalsintervall (1955, 2025–2026), ett tal med enhet efter (2.46 meter, 12.50 km,
 * 1.15 tim), en fastighetsbeteckning (Fjärdlång 1:18), datum och versionsnummer (10.05.2026, 1.20.3), ett
 * intervall som följs av en månad eller en enhet (25 - 27 sept, 5–6 turer), ett antal efter en dag
 * ("Avgångar från Sollenkroka: måndag–torsdag 6–7, fredag 6, lördag 3, söndag 3–4"; ett timintervall utan "kl"
 * räknas bara när det börjar klockan 5 eller senare och spänner minst två timmar, eller går över midnatt från
 * kvällen), avstånd, priser och andra tal.
 * "m.fl." efter ett klockslag är ingen enhet (08.15–12.00 m.fl.).
 *
 * Gränserna är Unicode-medvetna: \b i JavaScript räknar inte å, ä och ö som bokstäver.
 */

const FORE = String.raw`(?<![\p{L}\d.,:])`
const EFTER = String.raw`(?![\p{L}\d]|[.,:]\d)`
const TID = String.raw`(?:(?:[01]?\d|2[0-3])[.:][0-5]\d|24[.:]00)`
const TIMME = String.raw`(?:[01]?\d|2[0-4])`
const FYRA = String.raw`(?:(?:[01]\d|2[0-3])[0-5]\d|2400)`
const AMPM = String.raw`(?:\s?(?:AM|PM|am|pm)(?!\p{L}))?`
const KL = String.raw`(?<!\p{L})(?:[Kk]l(?:ockan)?\.?\s*)`
const MELLAN = String.raw`\s*(?:[-–—→]|till)\s*`

/** En tid med minuter, ev. med fotnotsbokstav (10.05b) och AM/PM. */
const MED_MINUTER = String.raw`${TID}(?:[a-z](?!\p{L}))?${EFTER}${AMPM}`
/** Tid med minuter, ensam eller i intervall; efter "kl" gäller inte FORE ("kl.11.30"). */
const MINUTER = String.raw`(?:${KL}|${FORE})${MED_MINUTER}(?:${MELLAN}(?:${KL})?${MED_MINUTER})?`
/** Fyra siffror efter "kl": "kl 1300", "kl 0800 - 2000". */
const FYRSIFFRIG = String.raw`${KL}${FYRA}${EFTER}(?:${MELLAN}${FYRA}${EFTER})?`
/** Hel timme efter "kl" eller "klockan", ensam eller i intervall: "kl. 08–18", "kl 9–17.30". */
const BARA_TIMME = String.raw`${KL}${TIMME}${EFTER}(?:${MELLAN}(?:${MED_MINUTER}|${TIMME}${EFTER}))?`
/** "vid 22-tiden", "21-tiden". */
const TIDEN = String.raw`${FORE}${TIMME}(?:[.:][0-5]\d)?-tiden(?!\p{L})`

/** Första bokstaven i valfritt skiftläge: "Alla dagar", "Fre", "Sönd" står med versal i källornas tabeller. */
const versalEllerGemen = (ord) => ord.replace(/^\p{L}/u, c => `[${c.toUpperCase()}${c}]`)
/** Dagar och "öppet" som säger att ett timintervall efter dem är öppettider ("alla dagar 11 - 16"). */
const DAGORD = ['alla dagar', 'dagligen', 'vardagar', 'vardag', 'veckodagar', 'helgdagar', 'helgdag', 'helgen', 'helgerna', 'helger',
  'måndagar', 'måndag', 'tisdagar', 'tisdag', 'onsdagar', 'onsdag', 'torsdagar', 'torsdag', 'fredagar', 'fredag', 'lördagar', 'lördag',
  'söndagar', 'söndag', 'mån', 'tis', 'ons', 'tors', 'tor', 'fre', 'lör', 'sönd', 'sön', 'öppettider', 'öppet', 'öppen'].map(versalEllerGemen).join('|')
/**
 * Ord efter ett intervall som visar att det inte är klockslag: månader (med gemen, som i löptext: "25–27 september";
 * "Juli" med versal är rubriken för nästa månad i en öppettidstabell), enheter och antal.
 */
const EJ_EFTER = String.raw`(?:jan|januari|feb|februari|mars|apr|april|maj|juni|juli|aug|augusti|sep|sept|september|okt|oktober|nov|november|dec|december|år|års|dagar|dygn|veckor|månader|timmar|tim|min|minuter|km|kilometer|m|meter|kr|kronor|st|stycken|personer|platser|turer|gånger|ggr|procent|knop|grader)(?!\p{L})|%|°`
const DAGINTERVALL = String.raw`(?<=(?<!\p{L})(?:${DAGORD})\.?\s*(?:\([^)]{0,40}\)\s*)?)${TIMME}${MELLAN}${TIMME}${EFTER}(?!\s*(?:${EJ_EFTER}))`

/** Ett timintervall som är hela innehållet i en parentes: "(05 till 21)", "(05–21)". */
const PARENTES = String.raw`(?<=\(\s*)${TIMME}${MELLAN}${TIMME}(?=\s*\))`

function monster() {
  return [new RegExp(`${FYRSIFFRIG}|${MINUTER}|${BARA_TIMME}|${TIDEN}`, 'gu'), new RegExp(DAGINTERVALL, 'gu'), new RegExp(PARENTES, 'gu')]
}

/** Är "a–b" efter en dag rimliga öppettider? Antal avgångar ("söndag 3–4", "måndag–torsdag 6–7") är det inte. */
function rimligaTimmar(traff) {
  const [a, b] = (traff.match(/\d+/g) ?? []).map(Number)
  if (a === undefined || b === undefined) return false
  return (a >= 5 && b - a >= 2) || (a >= 18 && b <= 6)
}

const ENHET_EFTER = /^\s?(?:m|meter|km|kilometer|ha|hektar|kr|kronor|knop|procent|%|m²|kvm|tim|timmar|h|min|minuter)(?![\p{L}\d]|\.\p{L})/iu
const BETECKNING_FORE = /(?:fastighet(?:en)?\s+)?\p{Lu}[\p{L}-]*\s$/u

/** Ett tal med enhet efter (2.46 meter) eller en fastighetsbeteckning (Fjärdlång 1:18) är inget klockslag. */
function arInteKlockslag(text, index, traff) {
  if (ENHET_EFTER.test(text.slice(index + traff.length, index + traff.length + 12))) return true
  if (/^\d:\d\d$/.test(traff) && BETECKNING_FORE.test(text.slice(Math.max(0, index - 40), index))) return true
  return false
}

/**
 * Klockslagen i texten som { start, slut, text }, i ordning och utan överlapp.
 * @param {string | null | undefined} text
 * @returns {{ start: number, slut: number, text: string }[]}
 */
export function klockslagsSpann(text) {
  if (!text) return []
  const alla = []
  const [vanliga, dag, parentes] = monster()
  for (const re of [vanliga, dag, parentes]) {
    for (const m of text.matchAll(re)) {
      const start = m.index ?? 0
      if (!m[0] || arInteKlockslag(text, start, m[0]) || (re !== vanliga && !rimligaTimmar(m[0]))) continue
      alla.push({ start, slut: start + m[0].length, text: m[0] })
    }
  }
  alla.sort((a, b) => a.start - b.start || b.slut - a.slut)
  const ut = []
  for (const s of alla) {
    const sista = ut[ut.length - 1]
    if (sista && s.start < sista.slut) {
      if (s.slut > sista.slut) { sista.slut = s.slut; sista.text = text.slice(sista.start, sista.slut) }
      continue
    }
    ut.push({ ...s })
  }
  return ut
}

/**
 * Klockslagen i texten, i ordning (tom lista om inga finns).
 * @param {string | null | undefined} text
 * @returns {string[]}
 */
export function hittaKlockslag(text) {
  return klockslagsSpann(text).map(s => s.text)
}

/**
 * true om texten har minst ett klockslag.
 * @param {string | null | undefined} text
 * @returns {boolean}
 */
export function harKlockslag(text) {
  return klockslagsSpann(text).length > 0
}

/**
 * Texten med varje klockslag (eller intervall, eller flera i rad) ersatt av ett "…" (källistan).
 * @param {string} text
 * @returns {string}
 */
export function ersattKlockslag(text) {
  const spann = klockslagsSpann(text)
  if (spann.length === 0) return text
  let ut = ''
  let pos = 0
  for (const s of spann) { ut += `${text.slice(pos, s.start)}…`; pos = s.slut }
  ut += text.slice(pos)
  return ut
    .replace(/…(?:\s*(?:[-–—→,;/]|och|eller|resp\.|till)?\s*…)+/gu, '…')
    .replace(/[ \t]{2,}/g, ' ')
}

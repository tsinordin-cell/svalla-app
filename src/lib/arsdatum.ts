/**
 * arsdatum — årligen återkommande datum, beräknade på ETT ställe.
 *
 * Bakgrund 2026-09-21: hummerpremiären stod handskriven på sju sidor med sex
 * olika datum, och den mest visade sidan på sajten (13 786 visningar/28 dagar)
 * sa "lördag 26 september" på själva premiärdagen måndag 21 september.
 * Ett datum som skrivs för hand blir fel. Ett datum som räknas fram från
 * regeln blir rätt varje år, och regeln har en källa.
 *
 * Varje funktion returnerar ett Date i lokal tid (UTC-noon för att slippa
 * tidszonsglid) plus färdig svensk text. Regeln och källan står vid varje
 * funktion. verify-claims (scripts/verify-claims.mjs) jämför handskrivna
 * datum i src mot de här funktionerna och faller om de skiljer sig.
 */

export type Arsdatum = {
  /** Datumet, kl 12:00 UTC så att .getUTCDate() alltid är rätt dag */
  datum: Date
  /** "måndag 21 september 2026" */
  text: string
  /** "21 september" */
  kort: string
  /** "2026-09-21" */
  iso: string
  /** Regeln i klartext, för KÄLLA-rader och FAQ */
  regel: string
  /** Öppningsbar adress till myndigheten som slår fast regeln */
  kalla: string
}

const VECKODAG = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag']
const MANAD = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

function utc(ar: number, manad0: number, dag: number): Date {
  return new Date(Date.UTC(ar, manad0, dag, 12))
}

function bygg(datum: Date, regel: string, kalla: string): Arsdatum {
  const d = datum.getUTCDate()
  const m = MANAD[datum.getUTCMonth()]
  const kort = `${d} ${m}`
  return {
    datum,
    kort,
    text: `${VECKODAG[datum.getUTCDay()]} ${kort} ${datum.getUTCFullYear()}`,
    iso: datum.toISOString().slice(0, 10),
    regel,
    kalla,
  }
}

/** Första förekomsten av en viss veckodag (0 = söndag … 6 = lördag) på eller efter ett datum. */
function forstaVeckodagFran(fran: Date, veckodag: number): Date {
  const diff = (veckodag - fran.getUTCDay() + 7) % 7
  return utc(fran.getUTCFullYear(), fran.getUTCMonth(), fran.getUTCDate() + diff)
}

/** N:te förekomsten av en veckodag i en månad (n = 1 första, 2 andra …). */
function nteVeckodagIManad(ar: number, manad0: number, veckodag: number, n: number): Date {
  const forsta = forstaVeckodagFran(utc(ar, manad0, 1), veckodag)
  return utc(ar, manad0, forsta.getUTCDate() + 7 * (n - 1))
}

export const KALLA_HUMMER =
  'https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/arter-regler-for-fiske-och-rapportering/hummerfiske---regler.html'

/**
 * Hummerpremiär: kl 07.00 första måndagen EFTER 20 september.
 * Havs- och vattenmyndigheten, läst i webbläsare 2026-09-21: "Hummerpremiären
 * infaller klockan 07.00 den första måndagen efter 20 september varje år.
 * I år (2026) är det alltså den 21 september … Nästa år (2027) … den 27 september."
 * Fritidsfiskare får fiska t.o.m. 30 november.
 */
export function hummerpremiar(ar: number): Arsdatum {
  // "efter 20 september" = från och med 21 september
  return bygg(
    forstaVeckodagFran(utc(ar, 8, 21), 1),
    'första måndagen efter 20 september, kl 07.00',
    KALLA_HUMMER,
  )
}

export const KALLA_SURSTROMMING =
  'https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/surstrommingspremiar'

/**
 * Surströmmingspremiär: tredje torsdagen i augusti — av hävd, inte lag.
 * Institutet för språk och folkminnen, läst 2026-09-21: "Den tredje torsdagen
 * i augusti är det av hävd premiär för att äta surströmming" och "Den
 * surströmming som numera produceras börjar säljas den tredje torsdagen i augusti."
 * Isof säger inget om någon förordning eller något försäljningsförbud —
 * skriv därför inte det.
 */
export function surstrommingspremiar(ar: number): Arsdatum {
  return bygg(
    nteVeckodagIManad(ar, 7, 4, 3),
    'tredje torsdagen i augusti, av hävd',
    KALLA_SURSTROMMING,
  )
}

export const KALLA_KRAFTOR =
  'https://www.isof.se/utforska/kunskapsbanker/lar-dig-mer-om-arets-namn-och-handelser/handelser/kraftskiva'

/**
 * Kräftpremiär: första onsdagen i augusti — en TRADITION, inget fastställt datum.
 * Isof, läst 2026-09-21: "Från slutet av 1800-talet fram till år 1994 rådde
 * förbud mot kräftfiske från november till början av augusti … 1982 ändrades
 * det till klockan 17 den första onsdagen i augusti … en tradition som lever
 * kvar trots att förbudet upphävdes". Skriv aldrig "alltid" eller "officiell"
 * om den här dagen; skriv "av tradition".
 */
export function kraftpremiar(ar: number): Arsdatum {
  return bygg(
    nteVeckodagIManad(ar, 7, 3, 1),
    'första onsdagen i augusti, av tradition (fiskeförbudet upphävdes 1994)',
    KALLA_KRAFTOR,
  )
}

export const KALLA_HELGDAGAR =
  'https://www.riksdagen.se/sv/dokument-och-lagar/dokument/svensk-forfattningssamling/lag-1989253-om-allmanna-helgdagar_sfs-1989-253/'

/**
 * Midsommardagen: "den lördag som infaller under tiden den 20-26 juni".
 * Lag (1989:253) om allmänna helgdagar, riksdagen.se, läst 2026-09-21.
 */
export function midsommardagen(ar: number): Arsdatum {
  return bygg(
    forstaVeckodagFran(utc(ar, 5, 20), 6),
    'lördagen 20–26 juni (lag 1989:253 om allmänna helgdagar)',
    KALLA_HELGDAGAR,
  )
}

/** Midsommarafton: fredagen före midsommardagen. */
export function midsommarafton(ar: number): Arsdatum {
  const md = midsommardagen(ar).datum
  return bygg(
    utc(ar, 5, md.getUTCDate() - 1),
    'fredagen före midsommardagen, dvs. 19–25 juni',
    KALLA_HELGDAGAR,
  )
}

/**
 * Alla helgons dag: "den lördag som infaller under tiden den 31 oktober-6 november".
 * Samma lag. Med här för att höstguiderna ska slippa räkna själva.
 */
export function allaHelgonsDag(ar: number): Arsdatum {
  return bygg(
    forstaVeckodagFran(utc(ar, 9, 31), 6),
    'lördagen 31 oktober–6 november (lag 1989:253)',
    KALLA_HELGDAGAR,
  )
}

/** Alla regler på ett ställe — det är den här listan verify-claims läser. */
export const ARSDATUM = {
  hummerpremiar,
  surstrommingspremiar,
  kraftpremiar,
  midsommardagen,
  midsommarafton,
  allaHelgonsDag,
} as const

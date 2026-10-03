/**
 * Färjetider — Stockholms skärgård
 *
 * Live-data hämtas från Trafiklab ResRobot v2.1
 *   - Dokumentation: https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/
 *   - Kräver env: TRAFIKLAB_RESROBOT_KEY (sätts i Vercel)
 *
 * revision 2026-10-02: kommentaren här lovade två saker som inte stämde.
 * Det finns ingen seed-fallback med genererade avgångar längre (borttagen
 * 2026-08-05), och koden filtrerar inte på operatörskoderna "WAB" och "CIN"
 * (det gjorde bara en tidig version 2026-04-22). Så här fungerar det nu:
 * hållplats-id är låsta per rutt (HALLPLATS_ID), ResRobot ombeds om bara
 * båtresor (products=256), båtben känns igen på catCode/cls och operatören
 * i datan måste stämma med kortets rubrik. Svaret bär ett `fel`-fält: tom
 * lista + fel = vi vet inte, tom lista utan fel = källan svarade utan
 * båtavgång.
 */

import { logger } from './logger'
// revision 2026-10-02: relativ import (som './logger' ovan) så att vitest,
// som saknar @/-alias, kan ladda modulen i ferries.test.ts.
import {
  fetchTripsResult,
  RESROBOT_PRODUKT_FARJA,
  type TripFel,
  type TripLeg,
  type TripSummary,
} from './trafiklab'

export type FerrySource = 'live' | 'seed'

export type FerryDeparture = {
  time: string             // ISO 8601, lokal tid
  from: string             // avgångsbrygga
  to: string               // slutdestination
  line: string             // linjenummer
  vessel?: string          // fartygsnamn, om känt
  via?: string[]           // bryggor däremellan
  operator: 'Waxholmsbolaget' | 'Cinderella' | 'SL'
  bookingUrl?: string
  source: FerrySource
  /** Ankomsttid HH:MM på destinationsbryggan. */
  arrival?: string
  /** Antal båtbyten på vägen. 0 = direktlinje. */
  changes?: number
}

export type FerryRoute = {
  id: string
  name: string
  from: string
  to: string
  stops: string[]
  operator: FerryDeparture['operator']
  season: string
  infoUrl: string
}

/**
 * revision 2026-10-02: varför listan är tom när den är tom av ett fel.
 * Samma koder som transit-lagret (TripFel), plus 'stopp_saknas' när rutten
 * saknar låsta hållplats-id i HALLPLATS_ID (ett konfigurationsfel hos oss).
 */
export type FerryFel = TripFel | 'stopp_saknas'

export type FerryDeparturesResult = {
  departures: FerryDeparture[]
  /** null = källan svarade. Tom lista + fel: null betyder ÄKTA inga avgångar. */
  fel: FerryFel | null
}

/** Canonical seed-rutter. Metadata (linjer, bryggor, säsong) är alltid seed. */
export const SEED_FERRY_ROUTES: FerryRoute[] = [
  {
    id: 'wxb-vaxholm',
    name: 'Strömkajen – Vaxholm',
    from: 'Strömkajen',
    to: 'Vaxholm',
    stops: ['Strömkajen', 'Nacka strand', 'Gåshaga brygga', 'Ramsö', 'Tynningö', 'Vaxholm'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://waxholmsbolaget.se/reseplanering/tidtabeller',
  },
  {
    id: 'wxb-grinda',
    name: 'Strömkajen – Grinda',
    from: 'Strömkajen',
    to: 'Grinda',
    stops: ['Strömkajen', 'Vaxholm', 'Ramsö', 'Vindö', 'Grinda'],
    operator: 'Waxholmsbolaget',
    season: 'Sommar (maj–sep)',
    infoUrl: 'https://waxholmsbolaget.se/reseplanering/tidtabeller',
  },
  {
    id: 'cinderella-sandhamn',
    name: 'Strandvägen – Sandhamn',
    from: 'Strandvägen',
    to: 'Sandhamn',
    // RÄTTAD 2026-08-05. Kommentaren här sa "Strömkajen och Strandvägen är
    // samma plats — Strömkajen är det vedertagna bryggnamnet". Det stämmer
    // inte. Strömkajen ligger vid Grand Hôtel och är Waxholmsbolagets kaj;
    // Cinderellabåtarna avgår från Strandvägen, ett par hundra meter österut.
    // Strömma skriver själva "Kliv ombord vid Strandvägen".
    //
    // Stoppen är också rättade: Möja trafikeras INTE av Cinderella, och Gällnö
    // saknades. Strömma listar Vaxholm, Grinda, Gällnö och Sandhamn.
    stops: ['Strandvägen', 'Vaxholm', 'Grinda', 'Gällnö', 'Sandhamn'],
    operator: 'Cinderella',
    season: 'Sommar (slutet av april–slutet av september)',
    infoUrl: 'https://www.stromma.com/sv-se/stockholm/cinderellabatarna/',
  },
  {
    id: 'wxb-uto',
    name: 'Årsta Brygga – Utö',
    from: 'Årsta Brygga',
    to: 'Utö',
    stops: ['Årsta Brygga', 'Brandholmen', 'Dalarö', 'Ornö', 'Utö'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://waxholmsbolaget.se/reseplanering/tidtabeller',
  },
  {
    id: 'wxb-finnhamn',
    name: 'Strömkajen – Finnhamn',
    from: 'Strömkajen',
    to: 'Finnhamn',
    stops: ['Strömkajen', 'Vaxholm', 'Ljusterö', 'Husarö', 'Finnhamn'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://waxholmsbolaget.se/reseplanering/tidtabeller',
  },
  {
    id: 'wxb-moja',
    name: 'Sollenkroka – Möja',
    from: 'Sollenkroka',
    to: 'Möja',
    stops: ['Sollenkroka', 'Svartsö', 'Norra Stavsudda', 'Berg (Möja)'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://waxholmsbolaget.se/reseplanering/tidtabeller',
  },
]

// ── LIVE: Trafiklab ResRobot 2.1 ──────────────────────────────────────────

/**
 * revision 2026-10-02: så många resor ResRobot ger per anrop. numF + numB får
 * vara högst 6 (trafiklab.se/api/our-apis/resrobot-v21/route-planner/). Vi
 * frågar alltid efter max: det kostar samma enda anrop och ger marginal för
 * inställda resor och operatörsvakterna nedan.
 */
const RESROBOT_MAX_RESOR = 6

/**
 * revision 2026-10-02: hållplats-id per rutt, LÅSTA. Förut slogs bryggnamnet
 * upp med location.name och första träffen användes. "Strandvägen" gav då
 * Strandvägen i Botkyrka (740069094) och "Sollenkroka" gav Sollenkroka by
 * i stället för bryggan.
 *
 * Uppmätt som i transit-stops.ts: GET https://svalla.se/api/transit/stop-lookup?q=<namn>
 * (ResRobot location.name) 2026-10-03, 03:43–03:44 UTC. För varje id
 * kontrollerades namn, kommun och plats i träfflistan (står per rad nedan).
 * Ö-bryggorna är desamma som i transit-stops.ts, utom för Vaxholm, där
 * transit-stops har busshållplatsen Västerhamnsplan, och för Möja (se nedan).
 *
 * Båt mellan paren finns i data hämtad samma natt via /api/transit/departures:
 * linje 12 Strömkajen–GRINDA och Strömkajen–Finnhamn, och linje 21 Årsta
 * brygga–Utö Gruvbryggan. Någon båtresa till Vaxholm, eller från Strandvägen
 * till Sandhamn, har vi inte sett i data.
 *
 * Möja: Berg brygga, inte Möjaström som i transit-stops.ts. Berg (Möja) är
 * sista stoppet i kortets egen stopplista. Id:t gav plats 1 för
 * q=Berg brygga och plats 2 i nearbystops (lat=59.415&lng=18.89), och en
 * provresa Sollenkroka brygga → Berg brygga gav fyra av fyra resor med
 * linje 14, allt via /api/transit/stop-lookup 2026-10-03 06:04 UTC. Jämfört
 * med granskningens provresa till Möjaström samma morgon (samma fyra turer)
 * nådde tre turer Berg 8 minuter tidigare och den fjärde 7 minuter senare.
 */
export const HALLPLATS_ID: Readonly<Record<string, { fran: string; till: string }>> = {
  // "Stockholm Strömkajen" (plats 1 för q=Strömkajen) → "VAXHOLM" (plats 1 för q=Vaxholm)
  'wxb-vaxholm': { fran: '740020691', till: '740098250' },
  // "Stockholm Strömkajen" → "GRINDA" (plats 1). Resor dit slutar vid både Norra och Södra bryggan.
  'wxb-grinda': { fran: '740020691', till: '740098471' },
  // "Strandvägen (Stockholm kn)" (plats 4 för q=Strandvägen) → "Sandhamn brygga (Värmdö kn)" (plats 1)
  'cinderella-sandhamn': { fran: '740046034', till: '740020694' },
  // "Årsta brygga (Haninge kn)" (plats 1) → "Utö Gruvbryggan brygga (Haninge kn)" (plats 1 för q=Utö Gruvbryggan)
  'wxb-uto': { fran: '740001394', till: '740020695' },
  // "Stockholm Strömkajen" → "Finnhamn brygga (Österåker kn)" (plats 1)
  'wxb-finnhamn': { fran: '740020691', till: '740020693' },
  // "Sollenkroka brygga (Värmdö kn)" (plats 2 för q=Sollenkroka; plats 1 är Sollenkroka by)
  // → "Berg brygga (Värmdö kn)" (plats 1 för q=Berg brygga)
  'wxb-moja': { fran: '740001309', till: '740024316' },
}

/**
 * revision 2026-10-02: ResRobots errorCode avgör fel-fältet.
 * KÄLLA: trafiklab.se/api/our-apis/resrobot-v21/error-codes/ (läst 2026-10-02).
 *   SVC_NO_RESULT (HTTP 200): sökningen gav inga resor → fel null, kortet
 *     visar "Ingen båtavgång hittad". Bara den koden betyder ett äkta tomt svar.
 *   API_QUOTA (400) och API_TOO_MANY_REQUESTS (429) → 'kvot'.
 *   Alla andra koder → 'api_fel', även SVC_FAILED_SEARCH (500, "unsuccessful
 *   search") och SVC_NO_MATCH (422). Med låsta hållplats-id tyder
 *   SVC_NO_MATCH på ett konfigurationsfel, och feltexten på sidan anger
 *   ingen orsak.
 * Utan errorCode gäller transportlagrets egen klassning (ingen_nyckel,
 * timeout, api_fel, kvot vid 429).
 */
const KVOT = new Set(['API_QUOTA', 'API_TOO_MANY_REQUESTS'])

export function felFranResRobot(fel: TripFel | null, errorCode: string | null | undefined): FerryFel | null {
  if (errorCode) {
    if (errorCode === 'SVC_NO_RESULT') return null
    if (KVOT.has(errorCode)) return 'kvot'
    return 'api_fel'
  }
  return fel
}

/**
 * Hämta live-avgångar för en rutt: RIKTIGA resor från route.from till route.to.
 *
 * 2026-08-05 — skriven om. Den gamla versionen anropade `departureBoard` på
 * avgångsbryggan och visade allt som lämnade den bryggan. Följden var att
 * kortet "Strömkajen – Vaxholm" och kortet "Strömkajen – Grinda" listade exakt
 * samma avgångar, med destinationer som "Finnhamn" och "Ålstäket" under en
 * rubrik som lovade något annat. Datan var äkta men rubriken var fel — vilket
 * är sämre än ingen data, eftersom en grön LIVE-flagga får det att se
 * kontrollerat ut.
 *
 * Nu används `/trip` (origin → destination), samma primitiv som transit-lagret.
 * Bara resor där ALLA transportben är båt räknas som färjeavgångar; en resa
 * Strömkajen–Vaxholm med buss 670 är en riktig resa men inte en färjelinje.
 *
 * revision 2026-10-02: båtfiltret ligger nu i FRÅGAN (products=256), inte bara
 * i efterhand. Förut hämtades sex resor av alla trafikslag och allt som inte
 * var båt slängdes. Strömkajen–Vaxholm gav då 0 avgångar, eftersom bussarna
 * går så tätt att alla sex resorna kunde vara bussresor. Uppmätt 2026-10-03
 * (kl 02:36) via /api/transit/departures?dest=vaxholm: fyra av fyra resor var
 * tunnelbana + nattbuss 699. Kontrollen i efterhand (isBoatOnly och
 * operatörsvakterna) ligger kvar.
 *
 * Fel skiljs från tomt, som i transit-lagret: { departures: [], fel: 'kvot' }
 * betyder "vi vet inte", { departures: [], fel: null } betyder att källan
 * svarade utan båtavgång. Vi hittar aldrig på en avgång.
 */
export async function fetchDeparturesResult(route: FerryRoute, count = 4): Promise<FerryDeparturesResult> {
  const id = HALLPLATS_ID[route.id]
  if (!id) {
    logger.warn('ferries', 'route has no locked stop ids', { routeId: route.id })
    return { departures: [], fel: 'stopp_saknas' }
  }

  try {
    const svar = await fetchTripsResult(
      id.fran, id.till, RESROBOT_MAX_RESOR, undefined, { products: RESROBOT_PRODUKT_FARJA },
    )
    const fel = felFranResRobot(svar.fel, svar.errorCode)
    // revision 2026-10-02: errorCode loggas alltid när den finns, även när den
    // ger fel: null (SVC_NO_RESULT). Då syns det i preview-loggen vilken kod
    // varje rutt får, t.ex. Cinderella.
    if (svar.errorCode) {
      console.warn('[ferries] ResRobot errorCode', { routeId: route.id, errorCode: svar.errorCode, fel })
    }
    if (fel !== null) {
      if (!svar.errorCode) logger.warn('ferries', 'live departures failed', { routeId: route.id, fel })
      return { departures: [], fel }
    }
    const departures = valjFarjeavgangar(route, svar.trips, count)
    // revision 2026-10-02: products=256 gav resor, men om inget ben klassas
    // som båt (fel trafikslag eller okänd kod), eller om något ben inte går
    // att klassa alls (catCode och cls saknas), vet vi inte om det går båtar.
    // Blir listan tom är det då ett fel, inte "inga avgångar".
    const batben = svar.trips.some(t => t.legs.some(l => arBatben(l) === true))
    const oklassade = svar.trips.filter(t => t.legs.some(l => arBatben(l) === null)).length
    if (oklassade > 0) logger.warn('ferries', 'trip legs without catCode/cls', { routeId: route.id, oklassade })
    if (departures.length === 0 && svar.trips.length > 0 && (!batben || oklassade > 0)) {
      logger.warn('ferries', 'products=256 gave trips without usable boat legs', { routeId: route.id, resor: svar.trips.length })
      return { departures: [], fel: 'api_fel' }
    }
    return { departures, fel: null }
  } catch (err) {
    logger.warn('ferries', 'live departures failed', { routeId: route.id, error: err })
    return { departures: [], fel: 'api_fel' }
  }
}

/**
 * revision 2026-10-02: urvalet ur ResRobot-svaret, utbrutet så att det går att
 * testa utan nätverk (ferries.test.ts).
 */
export function valjFarjeavgangar(route: FerryRoute, trips: TripSummary[], count: number): FerryDeparture[] {
  const out: FerryDeparture[] = []
  for (const t of trips) {
    if (out.length >= count) break
    if (!isBoatOnly(t)) continue
    if (!operatorStammer(route, t)) continue
    if (t.cancelled) continue
    if (!t.startDate || !t.startTime) continue

    const first = t.legs[0]
    out.push({
      time: `${t.startDate}T${t.startTime}`,
      arrival: t.endTime || undefined,
      from: first?.fromName || route.from,
      to: t.legs[t.legs.length - 1]?.toName || route.to,
      line: first?.line || route.id,
      via: route.stops.slice(1, -1),
      operator: route.operator,
      bookingUrl: route.infoUrl,
      changes: t.changes,
      source: 'live',
    })
  }
  return out
}

/**
 * Sant bara om varje transportben i resan är en båt (promenader räknas inte).
 * revision 2026-10-02: avgörs av kodfälten, inte av kategoritexten (arBatben).
 */
function isBoatOnly(t: TripSummary): boolean {
  if (t.legs.length === 0) return false
  return t.legs.every(l => arBatben(l) === true)
}

/**
 * revision 2026-10-02: båt eller inte, enligt ResRobots egna kodfält.
 * KÄLLA: trafiklab.se/api/our-apis/resrobot-v21/common/ (läst 2026-10-02):
 * Product.catCode 8 = "Ferries"; Product.cls har samma koder som `products`
 * i frågan, och 256 = "Ferries and international ferries".
 * Kategoritexten räcker inte. Länstrafikens båtar har "Länstrafik färja",
 * men Stavsnäs båttaxi har "Färjetrafik - övrigt" (uppmätt 2026-10-03 via
 * /api/transit/departures?dest=sandhamn), och det missade den gamla
 * textmatchningen.
 * null = båda fälten saknas, och benet går inte att klassa.
 */
export function arBatben(l: TripLeg): boolean | null {
  if (l.catCode == null && l.cls == null) return null
  return l.catCode === '8' || l.cls === '256'
}

/**
 * revision 2026-10-02: operatörsvakter. Kortets rubrik säger vem som kör
 * båten, och operatören i datan måste stämma med den.
 *
 * Waxholmsbolagets kort: varje ben ska ha länstrafikens operatörsnamn. I data
 * hämtad 2026-10-03 via /api/transit/departures (grinda, gallno, finnhamn,
 * moja, sandhamn, uto, fjaderholmarna) har båtarna "Waxholmsbolaget" och SL:s
 * bussar, tunnelbana och tåg "Storstockholms Lokaltrafik " med avslutande
 * blanksteg (därav trim). SL:s namn tillåts också: enligt en kommentar i
 * git-historiken (2026-04-22) ligger flera båtlinjer från Strömkajen under
 * SL. "SL" är operatörsnamnet i Trafiklabs exempel
 * (trafiklab.se/api/our-apis/resrobot-v21/common/). Privata båtar, t.ex.
 * "Stavsnäs båttaxi", släpps inte igenom. Namnen jämförs som prefix utan
 * hänsyn till skiftläge, så att t.ex. "Waxholmsbolaget AB" inte döljs.
 *
 * Cinderella-kortet: varje ben ska ha en operatör som innehåller Cinderella
 * eller Strömma. Vilket namn Cinderella har i ResRobot är inte uppmätt,
 * eftersom ingen Cinderella-resa fanns i datan. Utan träff visar kortet
 * "Ingen båtavgång hittad" och knappen till operatörens tidtabell.
 */
const LANSTRAFIKENS_OPERATORER = [/^waxholmsbolaget\b/i, /^storstockholms lokaltrafik\b/i, /^sl$/i]
const CINDERELLA_I_DATA = /cinderella|str[öo]mma/i

function operatorStammer(route: FerryRoute, t: TripSummary): boolean {
  return t.legs.every(l => {
    const op = (l.operator ?? '').trim()
    return route.operator === 'Cinderella'
      ? CINDERELLA_I_DATA.test(op)
      : LANSTRAFIKENS_OPERATORER.some(re => re.test(op))
  })
}

/**
 * Bakåtkompatibel: bara listan, utan felorsak. revision 2026-10-02: nya
 * anropare bör använda fetchDeparturesResult och skilja fel från tomt.
 */
export async function fetchLiveDepartures(route: FerryRoute, count = 6): Promise<FerryDeparture[]> {
  return (await fetchDeparturesResult(route, count)).departures
}

/**
 * Bakåtkompatibel entry-point. revision 2026-10-02: /api/ferries, /farjor och
 * /rutter anropar nu fetchDeparturesResult, som också säger VARFÖR listan är
 * tom. Den här finns kvar för eventuella andra anropare.
 *
 * Returnerar tom lista när ingen verklig avgång kan hämtas. Den tidigare
 * seed-generatorn är borttagen: den producerade klockslag som såg ut som en
 * tidtabell (07:15, 09:45, 11:15 på varenda linje) under en text om
 * "exempeldata". Folk läser tiden, inte disclaimern. Hellre tom ruta.
 */
export async function fetchDepartures(route: FerryRoute, count = 4): Promise<FerryDeparture[]> {
  return (await fetchDeparturesResult(route, count)).departures
}

/**
 * revision 2026-10-02: operatörens webbplats som kort text för felrutan på
 * /farjor och /rutter, t.ex. "waxholmsbolaget.se". Tas ur infoUrl så att
 * texten och knappen under den pekar på samma ställe.
 */
export function operatorWebbplats(route: FerryRoute): string {
  try {
    return new URL(route.infoUrl).hostname.replace(/^www\./, '')
  } catch {
    return route.operator
  }
}

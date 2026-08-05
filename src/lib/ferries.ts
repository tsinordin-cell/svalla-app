/**
 * Färjetider — Stockholms skärgård
 *
 * Live-data hämtas från Trafiklab ResRobot v2.1
 *   - Dokumentation: https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/
 *   - Kräver env: TRAFIKLAB_API_KEY (sätts i Vercel)
 *   - Operatörer vi filtrerar på: Waxholmsbolaget (kod "WAB"), Cinderellabåtarna ("CIN")
 *
 * Om nyckel saknas eller API:t faller → fallback till seed-rutter + genererade avgångar
 * så att /farjor-sidan och /api/ferries aldrig kraschar.
 */

import { logger } from './logger'
import { fetchTrips, type TripSummary } from '@/lib/trafiklab'

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

const TRAFIKLAB_BASE = 'https://api.resrobot.se/v2.1'


// In-memory-cache för stop-ID-lookups (återanvänds inom samma serverinstans)
const stopIdCache = new Map<string, string>()

type ResRobotStopLookup = {
  stopLocationOrCoordLocation?: Array<{
    StopLocation?: { extId?: string; id?: string; name?: string; lon?: number; lat?: number }
  }>
}

async function resolveStopId(name: string, apiKey: string): Promise<string | null> {
  const cached = stopIdCache.get(name)
  if (cached) return cached
  const url = `${TRAFIKLAB_BASE}/location.name?input=${encodeURIComponent(name)}&maxNo=5&format=json&accessId=${apiKey}`
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } })
    if (!res.ok) return null
    const json: ResRobotStopLookup = await res.json()
    const hit = (json.stopLocationOrCoordLocation ?? [])
      .map(entry => entry.StopLocation)
      .find(sl => sl && (sl.extId || sl.id))
    if (!hit) return null
    const id = hit.extId ?? hit.id!
    stopIdCache.set(name, id)
    return id
  } catch (err) {
    logger.warn('ferries', 'stop lookup failed', { name, error: err })
    return null
  }
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
 * Returnerar tom lista om något saknas. Anroparen visar då inga tider alls.
 * Vi hittar aldrig på en avgång.
 */
export async function fetchLiveDepartures(route: FerryRoute, count = 6): Promise<FerryDeparture[]> {
  const apiKey = process.env.TRAFIKLAB_RESROBOT_KEY ?? process.env.TRAFIKLAB_API_KEY
  if (!apiKey) return []

  try {
    const [fromId, toId] = await Promise.all([
      resolveStopId(route.from, apiKey),
      resolveStopId(route.to, apiKey),
    ])
    if (!fromId || !toId || fromId === toId) return []

    // Hämtar med marginal: allt som inte är rena båtresor filtreras bort nedan.
    const trips = await fetchTrips(fromId, toId, Math.min(6, count * 3))

    const out: FerryDeparture[] = []
    for (const t of trips) {
      if (out.length >= count) break
      if (!isBoatOnly(t)) continue
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
  } catch (err) {
    logger.warn('ferries', 'live departures failed', { routeId: route.id, error: err })
    return []
  }
}

/** Sant bara om varje transportben i resan är en båt (promenader räknas inte). */
function isBoatOnly(t: TripSummary): boolean {
  if (t.legs.length === 0) return false
  return t.legs.every(l => {
    const c = (l.category || '').toUpperCase()
    return c.includes('FÄRJA') || c.includes('FARJA') || c.includes('BÅT')
      || c.includes('BAT') || c.includes('FERRY') || c.includes('SHIP')
  })
}

/**
 * Publik entry-point. Anropas från /api/ferries, /farjor och /rutter.
 *
 * Returnerar tom lista när ingen verklig avgång kan hämtas. Den tidigare
 * seed-generatorn är borttagen: den producerade klockslag som såg ut som en
 * tidtabell (07:15, 09:45, 11:15 på varenda linje) under en text om
 * "exempeldata". Folk läser tiden, inte disclaimern. Hellre tom ruta.
 */
export async function fetchDepartures(route: FerryRoute, count = 4): Promise<FerryDeparture[]> {
  return fetchLiveDepartures(route, count)
}

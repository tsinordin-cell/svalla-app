/**
 * trafiklab.ts — server-side wrapper kring ResRobot Journey Planner v2.1.
 *
 * ResRobot är Trafiklabs nationella reseplanerare och täcker SL,
 * Waxholmsbolaget, Pendelbåten, SJ, Västtrafik m.fl. Vi använder
 * `/trip`-endpoint för att hämta hela resor (hem → ö) inklusive byten,
 * eftersom resa till skärgårds-öar nästan alltid kräver buss/t-bana
 * + båt. En ren `/departureBoard` på Strömkajen ger bara t-bana och
 * bussar — inte de båtar vi vill visa.
 *
 * API-nyckeln måste sättas i Vercel:
 *   TRAFIKLAB_RESROBOT_KEY=<din nyckel från trafiklab.se>
 *
 * Detta API:et används bara server-side (API-routes). Nyckeln läcker
 * aldrig till klienten.
 */

const RESROBOT_BASE = 'https://api.resrobot.se/v2.1'
const KEY = process.env.TRAFIKLAB_RESROBOT_KEY

// In-memory cache. Räcker för Vercel serverless: varje warm function
// återanvänder Map:en, kalla starter ger ett extra anrop. För tyngre
// trafik byt mot Vercel KV / Upstash.
type CacheEntry<T> = { data: T; expiresAt: number }
const cache = new Map<string, CacheEntry<unknown>>()
const TTL_MS = 5 * 60 * 1000 // 5 min — tillräckligt fräscht för avgångstavla

function cacheGet<T>(key: string): T | null {
  const hit = cache.get(key)
  if (!hit) return null
  if (hit.expiresAt < Date.now()) {
    cache.delete(key)
    return null
  }
  return hit.data as T
}

function cacheSet<T>(key: string, data: T): void {
  cache.set(key, { data, expiresAt: Date.now() + TTL_MS })
}

// ─── Typer ──────────────────────────────────────────────────────────────────

export interface TripLeg {
  /** "Walk", "Länstrafik - Färja", "Länstrafik - Buss" osv. */
  category: string
  /** Operatör: "Waxholmsbolaget", "SL", "SJ" — null för walk-legs. */
  operator: string | null
  /** Linjenummer eller namn — null för walk-legs. */
  line: string | null
  /** Avgångshållplats (namn). */
  fromName: string
  /** Planerad HH:MM. */
  fromTime: string
  /** Ankomsthållplats (namn). */
  toName: string
  /** Planerad HH:MM. */
  toTime: string
  /** Sant om legen är promenad. Vi visar dem som "byte". */
  isWalk: boolean
  /** Realtid HH:MM (om operatören rapporterar — annars undefined). */
  rtFromTime?: string
  rtToTime?: string
  /** Försening i minuter beräknat från rtFromTime - fromTime (kan vara negativt om tidigare). */
  delayMin?: number
  /** Sant om operatören har markerat resan som inställd. */
  cancelled?: boolean
}

export interface TripSummary {
  /** Total restid i minuter. */
  durationMin: number
  /** Avgångstid HH:MM (första leg). */
  startTime: string
  /** Datum YYYY-MM-DD (för avgång). */
  startDate: string
  /** Ankomsttid HH:MM (sista leg). */
  endTime: string
  /** Antal byten = legs - 1 (förenkling). */
  changes: number
  /** Endast transport-legs (utan walks) — det användaren bryr sig om. */
  legs: TripLeg[]
  /** Alla legs inkl. walks — för debugging. */
  allLegs: TripLeg[]
  /** Sant om någon leg är inställd. */
  cancelled?: boolean
  /** Sant om någon leg har försening >= 1 min. */
  hasDelay?: boolean
  /** Max försening bland alla transport-legs (min). */
  maxDelayMin?: number
}

// ─── ResRobot raw-typer (subset, det vi använder) ───────────────────────────

interface ResRobotProduct {
  operator?: string
  line?: string
  catOutL?: string
  name?: string
}

interface ResRobotPoint {
  name?: string
  time?: string
  date?: string
  /** Realtid om operatören rapporterar — annars undefined. */
  rtTime?: string
  rtDate?: string
}

interface ResRobotLeg {
  type?: string
  /** ResRobot sätter true om leg är inställd. */
  cancelled?: boolean
  Origin?: ResRobotPoint
  Destination?: ResRobotPoint
  Product?: ResRobotProduct[] | ResRobotProduct
}

interface ResRobotTrip {
  duration?: string // ISO 8601: "PT1H45M"
  LegList?: { Leg?: ResRobotLeg[] }
}

interface ResRobotTripResponse {
  Trip?: ResRobotTrip[]
}

// ─── Hjälpare ───────────────────────────────────────────────────────────────

function parseIsoDuration(iso: string | undefined): number {
  if (!iso) return 0
  // "PT1H45M" -> 105 min. Stödjer även "PT45M" och "PT2H".
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?/)
  if (!match) return 0
  const h = match[1] ? parseInt(match[1], 10) : 0
  const m = match[2] ? parseInt(match[2], 10) : 0
  return h * 60 + m
}

function asProduct(p: ResRobotLeg['Product']): ResRobotProduct {
  if (Array.isArray(p)) return p[0] ?? {}
  return p ?? {}
}

/** Beräknar försening i minuter (rtTime - planned). Returnerar undefined om rtTime saknas. */
function calcDelayMin(planned: string, rt: string | undefined): number | undefined {
  if (!rt || !planned) return undefined
  const [ph, pm] = planned.split(':').map(Number)
  const [rh, rm] = rt.split(':').map(Number)
  if ([ph, pm, rh, rm].some(n => Number.isNaN(n))) return undefined
  // Använd minuter sedan midnatt. Hantera dygnsöverlapp grovt (om diff > 12h, anta cross-midnight).
  let diff = (rh! * 60 + rm!) - (ph! * 60 + pm!)
  if (diff > 12 * 60) diff -= 24 * 60
  if (diff < -12 * 60) diff += 24 * 60
  return diff
}

function normalizeLeg(raw: ResRobotLeg): TripLeg {
  const product = asProduct(raw.Product)
  const isWalk = (raw.type ?? '').toUpperCase() === 'WALK' || !product.line
  const fromTime = (raw.Origin?.time ?? '').slice(0, 5)
  const toTime = (raw.Destination?.time ?? '').slice(0, 5)
  const rtFromTime = raw.Origin?.rtTime ? raw.Origin.rtTime.slice(0, 5) : undefined
  const rtToTime = raw.Destination?.rtTime ? raw.Destination.rtTime.slice(0, 5) : undefined
  const delayMin = calcDelayMin(fromTime, rtFromTime)
  return {
    category: product.catOutL ?? (isWalk ? 'Promenad' : 'Okänd'),
    operator: product.operator ?? null,
    line: product.line ?? null,
    fromName: raw.Origin?.name ?? '?',
    fromTime,
    toName: raw.Destination?.name ?? '?',
    toTime,
    isWalk,
    rtFromTime,
    rtToTime,
    delayMin,
    cancelled: raw.cancelled === true || undefined,
  }
}

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Hämtar nästa N resor från `originId` till `destId`.
 *
 * Returnerar [] om nyckel saknas, om API:et är nere, eller om inga resor
 * hittades. Aldrig kasta error — vi vill att widgeten degraderar tyst.
 *
 * Med `departAfter` kan man fråga efter resor som startar EFTER ett specifikt
 * datum/tid — används för "sista båten"-feature: vi pingar sent på dagen.
 */
export async function fetchTrips(
  originId: string,
  destId: string,
  numTrips = 4,
  departAfter?: { date: string; time: string }, // YYYY-MM-DD + HH:MM
): Promise<TripSummary[]> {
  if (!KEY) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[trafiklab] TRAFIKLAB_RESROBOT_KEY saknas — returnerar []')
    }
    return []
  }

  const cacheKey = `trip:${originId}:${destId}:${numTrips}:${departAfter?.date ?? ''}:${departAfter?.time ?? ''}`
  const hit = cacheGet<TripSummary[]>(cacheKey)
  if (hit) return hit

  const url = new URL(`${RESROBOT_BASE}/trip`)
  url.searchParams.set('originId', originId)
  url.searchParams.set('destId', destId)
  url.searchParams.set('numF', String(numTrips))
  url.searchParams.set('format', 'json')
  url.searchParams.set('accessId', KEY)
  if (departAfter) {
    url.searchParams.set('date', departAfter.date)
    url.searchParams.set('time', departAfter.time)
  }

  try {
    const res = await fetch(url.toString(), {
      // ResRobot är inte alltid blixtsnabb — 8 sek timeout via AbortController
      signal: AbortSignal.timeout(8000),
      // Server-side fetch — Next.js cachar inte automatiskt utöver vår egen.
      cache: 'no-store',
    })
    if (!res.ok) return []
    const data = (await res.json()) as ResRobotTripResponse
    const trips = (data.Trip ?? []).map<TripSummary>((t) => {
      const allLegs = (t.LegList?.Leg ?? []).map(normalizeLeg)
      const legs = allLegs.filter((l) => !l.isWalk)
      const first = legs[0] ?? allLegs[0]
      const last = legs[legs.length - 1] ?? allLegs[allLegs.length - 1]
      // Datum kommer från ResRobot's första Origin — det är där resan startar.
      const startDate = (t.LegList?.Leg?.[0]?.Origin?.date ?? '').slice(0, 10)
      const cancelled = legs.some(l => l.cancelled)
      const maxDelayMin = legs.reduce((max, l) => {
        const d = l.delayMin ?? 0
        return d > max ? d : max
      }, 0)
      return {
        durationMin: parseIsoDuration(t.duration),
        startTime: first?.fromTime ?? '',
        startDate,
        endTime: last?.toTime ?? '',
        changes: Math.max(0, legs.length - 1),
        legs,
        allLegs,
        cancelled: cancelled || undefined,
        hasDelay: maxDelayMin >= 1 || undefined,
        maxDelayMin: maxDelayMin >= 1 ? maxDelayMin : undefined,
      }
    }).filter((t) => t.legs.length > 0)
    cacheSet(cacheKey, trips)
    return trips
  } catch {
    return []
  }
}

/**
 * Hämtar dagens SISTA avgång från `originId` till `destId`.
 *
 * Strategi: pinga ResRobot från kl 14:00 idag med numF=15 för att få alla
 * eftermiddags- och kvällsavgångar. Returnera den absolut sista resan vars
 * `startDate` matchar dagens datum.
 *
 * Returnerar null om ingen kvarvarande avgång finns idag (sista båten har
 * redan gått, eller helt enkelt ingen ytterligare båt idag).
 *
 * Used by: /api/transit/last-departure för "sista båten tillbaka"-feature
 * på ösidor och Thorkel guide.
 */
export async function fetchLastTripOfDay(
  originId: string,
  destId: string,
  todayISO?: string, // YYYY-MM-DD — defaultar till idag i Europe/Stockholm
): Promise<TripSummary | null> {
  // Stockholm timezone — Vercel kör i UTC, vi måste explicit konvertera
  const date = todayISO ?? new Date().toLocaleDateString('sv-SE', { timeZone: 'Europe/Stockholm' })
  // Börja runt lunchtid för att fånga alla eftermiddags/kvällsavgångar
  const trips = await fetchTrips(originId, destId, 15, { date, time: '14:00' })
  // Filtrera fram resor som FAKTISKT startar idag (ResRobot ger även resor nästa dag)
  const todaysTrips = trips.filter(t => t.startDate === date)
  if (todaysTrips.length === 0) return null
  // Sortera efter startTime (HH:MM stränger sorterar korrekt) — ta sista
  todaysTrips.sort((a, b) => a.startTime.localeCompare(b.startTime))
  return todaysTrips[todaysTrips.length - 1] ?? null
}

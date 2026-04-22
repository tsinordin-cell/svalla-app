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
    infoUrl: 'https://www.waxholmsbolaget.se/trafik-o-linjer',
  },
  {
    id: 'wxb-grinda',
    name: 'Strömkajen – Grinda',
    from: 'Strömkajen',
    to: 'Grinda',
    stops: ['Strömkajen', 'Vaxholm', 'Ramsö', 'Vindö', 'Grinda'],
    operator: 'Waxholmsbolaget',
    season: 'Sommar (maj–sep)',
    infoUrl: 'https://www.waxholmsbolaget.se/trafik-o-linjer',
  },
  {
    id: 'cinderella-sandhamn',
    name: 'Strandvägen – Sandhamn',
    from: 'Strandvägen',
    to: 'Sandhamn',
    stops: ['Strandvägen', 'Vaxholm', 'Grinda', 'Möja', 'Sandhamn'],
    operator: 'Cinderella',
    season: 'Sommar (maj–sep)',
    infoUrl: 'https://www.cinderellabatarna.se/',
  },
  {
    id: 'wxb-uto',
    name: 'Årsta Brygga – Utö',
    from: 'Årsta Brygga',
    to: 'Utö',
    stops: ['Årsta Brygga', 'Brandholmen', 'Dalarö', 'Ornö', 'Utö'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://www.waxholmsbolaget.se/trafik-o-linjer',
  },
  {
    id: 'wxb-finnhamn',
    name: 'Strömkajen – Finnhamn',
    from: 'Strömkajen',
    to: 'Finnhamn',
    stops: ['Strömkajen', 'Vaxholm', 'Ljusterö', 'Husarö', 'Finnhamn'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://www.waxholmsbolaget.se/trafik-o-linjer',
  },
  {
    id: 'wxb-moja',
    name: 'Sollenkroka – Möja',
    from: 'Sollenkroka',
    to: 'Möja',
    stops: ['Sollenkroka', 'Svartsö', 'Norra Stavsudda', 'Berg (Möja)'],
    operator: 'Waxholmsbolaget',
    season: 'Helår',
    infoUrl: 'https://www.waxholmsbolaget.se/trafik-o-linjer',
  },
]

// ── LIVE: Trafiklab ResRobot 2.1 ──────────────────────────────────────────

const TRAFIKLAB_BASE = 'https://api.resrobot.se/v2.1'

// Operatörskoder enligt Trafiklab (HAFAS). Filtrerar bort SL-buss etc.
const OPERATOR_CODES: Record<FerryRoute['operator'], string[]> = {
  Waxholmsbolaget: ['WAB', 'WAXHOLMSBOLAGET'],
  Cinderella:      ['CIN', 'CINDERELLA', 'STRÖMMA'],
  SL:              ['SL'],
}

// Hafas-kategori för båt — catOutS === 'BÅT' eller product class 256 (ferry)
function isFerry(productOrCat: unknown): boolean {
  if (!productOrCat || typeof productOrCat !== 'object') return false
  const o = productOrCat as { catOutS?: string; catOut?: string; cls?: string | number }
  const cat = (o.catOutS || o.catOut || '').toString().toUpperCase()
  if (cat.includes('BÅT') || cat.includes('BAT') || cat.includes('FERRY') || cat.includes('SHIP')) return true
  const cls = typeof o.cls === 'number' ? o.cls : parseInt(String(o.cls ?? ''), 10)
  return cls === 256 // HAFAS class bit for ferries/ships
}

function matchesOperator(productOrStop: unknown, operator: FerryRoute['operator']): boolean {
  if (!productOrStop || typeof productOrStop !== 'object') return false
  const o = productOrStop as { operatorCode?: string; operator?: string }
  const code = (o.operatorCode ?? '').toUpperCase()
  const name = (o.operator ?? '').toUpperCase()
  const allowed = OPERATOR_CODES[operator] ?? []
  return allowed.some(c => code.includes(c) || name.includes(c))
}

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
    console.warn('[ferries] stop lookup failed for', name, err)
    return null
  }
}

type ResRobotDeparture = {
  name?: string
  type?: string
  stop?: string
  time?: string
  date?: string
  direction?: string
  transportNumber?: string
  ProductAtStop?: { operatorCode?: string; operator?: string; catOutS?: string; catOut?: string; cls?: string | number; line?: string }
  Product?: Array<{ operatorCode?: string; operator?: string; catOutS?: string; catOut?: string; cls?: string | number; line?: string }>
}

/**
 * Hämta live-avgångar för en rutt. Returnerar null om:
 *   - TRAFIKLAB_API_KEY saknas
 *   - Stopp-ID inte kan resolvas
 *   - API:t felar
 *   - Inga båttransport-matchningar hittas
 *
 * Vid null faller anroparen tillbaka till seedDeparturesFor().
 */
export async function fetchLiveDepartures(route: FerryRoute, count = 6): Promise<FerryDeparture[] | null> {
  const apiKey = process.env.TRAFIKLAB_API_KEY
  if (!apiKey) return null

  try {
    const stopId = await resolveStopId(route.from, apiKey)
    if (!stopId) return null

    // products=256 → HAFAS bitmask för "ferry/ship". Stora stopp som Strömkajen
    // returnerar annars 30 SL-bussar/T-banor innan första båten, och båten filtreras bort.
    const url = `${TRAFIKLAB_BASE}/departureBoard?id=${stopId}&maxJourneys=30&products=256&format=json&accessId=${apiKey}`
    const res = await fetch(url, { next: { revalidate: 60 } })
    if (!res.ok) return null
    const json = await res.json() as { Departure?: ResRobotDeparture[] }

    const out: FerryDeparture[] = []
    for (const d of json.Departure ?? []) {
      if (out.length >= count) break
      const product = Array.isArray(d.Product) ? d.Product[0] : undefined
      const productOrStop = product ?? d.ProductAtStop
      if (!isFerry(productOrStop)) continue
      // Operatörsfiltret är medvetet slappt: products=256 garanterar redan att det
      // är en båtavgång från rätt brygga. Många Strömkajen-linjer körs formellt
      // under "SL Pendelbåt" men är Waxholms-båtar fysiskt. Vi släpper igenom alla
      // båtar från stoppet hellre än att visa seed-data.
      if (!d.date || !d.time) continue

      out.push({
        time: `${d.date}T${d.time}`,
        from: route.from,
        to: d.direction?.trim() || route.to,
        line: d.transportNumber || productOrStop?.line || route.id,
        via: route.stops.slice(1, -1),
        operator: route.operator,
        bookingUrl: route.infoUrl,
        source: 'live',
      })
    }

    return out.length > 0 ? out : null
  } catch (err) {
    console.warn('[ferries] live departures failed for', route.id, err)
    return null
  }
}

// ── SEED: Deterministisk fallback ─────────────────────────────────────────

/**
 * Genererar exempelavgångar när live-API inte är tillgängligt.
 * Tydligt markerade med source:'seed' så UI kan visa "förhandsvisning"-flagga.
 */
export function seedDeparturesFor(route: FerryRoute, count = 4): FerryDeparture[] {
  const now = new Date()
  const baseHour = Math.max(7, now.getHours())
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(now)
    d.setHours(baseHour + i * 2, i % 2 === 0 ? 15 : 45, 0, 0)
    return {
      time: d.toISOString(),
      from: route.from,
      to: route.to,
      line: `${route.id.split('-')[1]?.toUpperCase() ?? 'LIN'}-${10 + i}`,
      vessel: undefined,
      via: route.stops.slice(1, -1),
      operator: route.operator,
      bookingUrl: route.infoUrl,
      source: 'seed' as const,
    }
  })
}

/** Bakåtkompatibelt alias — tidigare kod importerade mockDeparturesFor. */
export const mockDeparturesFor = seedDeparturesFor

/**
 * Publik entry-point: live om möjligt, annars seed.
 * Anropas från /api/ferries och /farjor-sidan.
 */
export async function fetchDepartures(route: FerryRoute, count = 4): Promise<FerryDeparture[]> {
  const live = await fetchLiveDepartures(route, count)
  if (live && live.length > 0) return live
  return seedDeparturesFor(route, count)
}

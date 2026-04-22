/**
 * Waxholmsbolaget färjetider — stub
 *
 * TODO: Integrera mot Trafiklab Resrobot v2 eller Waxholmsbolagets GTFS-flöde.
 *   - Trafiklab API: https://www.trafiklab.se/api/trafiklab-apis/resrobot-v21/
 *   - GTFS operator code: "WAXH"
 *
 * För nu exponerar vi en hårdkodad seed-rutt + enkel route-handler så att
 * /farjor-sidan och ev. externa konsumenter kan använda samma interface
 * när vi byter ut datakällan.
 */

export type FerryDeparture = {
  time: string         // ISO 8601, lokal tid
  from: string         // avgångsbrygga
  to: string           // slutdestination
  line: string         // linjenummer (t.ex. "12")
  vessel?: string      // fartygsnamn, om känt
  via?: string[]       // bryggor däremellan
  operator: 'Waxholmsbolaget' | 'Cinderella' | 'SL'
  bookingUrl?: string
}

export type FerryRoute = {
  id: string
  name: string
  from: string
  to: string
  stops: string[]
  operator: FerryDeparture['operator']
  season: string       // 'Helår' | 'Sommar (maj–sep)' | 'Vintertid'
  infoUrl: string
}

/**
 * Populära linjer i Stockholms skärgård. Seed-data för MVP.
 * TODO: ersätt med live-feed från Waxholmsbolaget.
 */
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
    id: 'wxb-utö',
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

/**
 * Genererar en stub av dagens avgångar per rutt.
 * Ersätts av riktig live-data vid nästa iteration.
 */
export function mockDeparturesFor(route: FerryRoute, count = 4): FerryDeparture[] {
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
    }
  })
}

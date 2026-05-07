/**
 * transit-stops.ts — mappning från ö-slug till Trafiklab stop-ID.
 *
 * Verifierade IDs via ResRobot location.name 2026-05-08 mot riktig API.
 * Hämtas på nytt om en ö flyttas eller får ny brygga.
 *
 * Default-origin är Stockholm Strömkajen (740020691) — där de flesta
 * skärgårdsresor börjar för Stockholm-tunnelvärlden. Andra origin kan
 * sättas per ö om den nås bättre från t.ex. Nynäshamn.
 */

export const STROMKAJEN_ID = '740020691' // Stockholm Strömkajen
export const NYNASHAMN_ID = '740000719' // Nynäshamn färjeterminal
export const STAVSNAS_ID = '740001312' // Stavsnäs vinterhamn

export interface IslandTransitConfig {
  /** Verified Trafiklab stop-ID för öns brygga. */
  destStopId: string
  /** Mänskligt läsbart namn för bryggan (visas i widget). */
  destStopName: string
  /** Default-origin från fastlandet. */
  originStopId: string
  originStopName: string
  /** Kort förklarande ton till resenären. */
  note?: string
}

/**
 * Slugs som inte finns här får ingen DepartureWidget. Lägg till efter
 * att ny stop-ID verifierats mot ResRobot location.name.
 */
export const ISLAND_TRANSIT: Record<string, IslandTransitConfig> = {
  sandhamn: {
    destStopId: '740020694', destStopName: 'Sandhamn brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Snabbast via buss 434 till Stavsnäs och Waxholmsbåten därifrån.',
  },
  grinda: {
    destStopId: '740098471', destStopName: 'Grinda',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Direktbåt med Waxholmsbolaget från Strömkajen sommartid.',
  },
  vaxholm: {
    destStopId: '740018045', destStopName: 'Vaxholm Västerhamnsplan',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Båt direkt från Strömkajen — eller buss 670 från Tekniska högskolan.',
  },
  uto: {
    destStopId: '740020695', destStopName: 'Utö Gruvbryggan',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Pendeltåg till Nynäshamn och Waxholmsbolaget därifrån.',
  },
  finnhamn: {
    destStopId: '740020693', destStopName: 'Finnhamn brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
  },
  fjaderholmarna: {
    destStopId: '740034632', destStopName: 'Fjäderholmarna brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Närmaste skärgårdsön — båt direkt från Strömkajen, ca 25 min.',
  },
  moja: {
    destStopId: '740024936', destStopName: 'Möjaström brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Snabbast via Stavsnäs vinterhamn.',
  },
  husaro: {
    destStopId: '740020692', destStopName: 'Husarö brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
  },
  ingmarso: {
    destStopId: '740034607', destStopName: 'Ingmarsö Norra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
  },
  dalaro: {
    destStopId: '740001036', destStopName: 'Dalarö Hotellbryggan',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Buss 839 från Handen pendelstation tar dig till Dalarö.',
  },
}

export function getIslandTransit(slug: string): IslandTransitConfig | null {
  return ISLAND_TRANSIT[slug] ?? null
}

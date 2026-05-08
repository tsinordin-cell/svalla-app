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

  // ── Norra skärgården (nås via Furusund/Räfsnäs eller direktbåt) ───────
  arholma: {
    destStopId: '740024314', destStopName: 'Arholma brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Yttersta ön i norra skärgården — båt från Simpnäs (buss 631 från Norrtälje).',
  },
  blido: {
    destStopId: '740001021', destStopName: 'Blidö Bromskär brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Bilfärja från Furusund — Waxholmsbåt eller buss 626 + 634 från Norrtälje.',
  },
  fejan: {
    destStopId: '740018278', destStopName: 'Fejan brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
  },
  furusund: {
    destStopId: '740025063', destStopName: 'Furusund brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Knutpunkten för norra skärgården — buss 626/634 från Norrtälje.',
  },
  norrora: {
    destStopId: '740034551', destStopName: 'Norröra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Saltkråkan-ön — Waxholmsbåt från Furusund.',
  },
  rodloga: {
    destStopId: '740024879', destStopName: 'Rödlöga brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Yttersta ytterskärgården — direktbåt från Furusund.',
  },
  yxlan: {
    destStopId: '740025023', destStopName: 'Yxlan Vagnsunda brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
  },

  // ── Mellersta skärgården (Stavsnäs/Boda) ─────────────────────────────
  gallno: {
    destStopId: '740024302', destStopName: 'Gällnö brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Båt från Stavsnäs vinterhamn med Waxholmsbolaget.',
  },
  ljustero: {
    destStopId: '740020573', destStopName: 'Åsättra (Ljusterö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Bilfärja från Östanå — buss 626 + bilfärja Östanå–Ljusterö.',
  },
  runmaro: {
    destStopId: '740023240', destStopName: 'Långvik (Runmarö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Båt från Stavsnäs vinterhamn med Waxholmsbolaget.',
  },
  svartso: {
    destStopId: '740024872', destStopName: 'Svartsö Norra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Båt från Stavsnäs vinterhamn med Waxholmsbolaget.',
  },
  resaro: {
    destStopId: '740034517', destStopName: 'Ytterby (Resarö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Bilbro från Vaxholm — buss 670 + 689 från Tekniska högskolan.',
  },

  // ── Södra skärgården (Nynäshamn) ─────────────────────────────────────
  landsort: {
    destStopId: '740024878', destStopName: 'Landsort brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Pendeltåg till Nynäshamn + buss 858 till Ankarudden + båt.',
  },
  nattaro: {
    destStopId: '740024875', destStopName: 'Nåttarö brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Pendeltåg till Nynäshamn + Waxholmsbolaget därifrån.',
  },
  orno: {
    destStopId: '740034475', destStopName: 'Ornö Kyrka brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Bilfärja från Dalarö — pendeltåg till Handen + buss 839 + färja.',
  },
  kymmendo: {
    destStopId: '740018277', destStopName: 'Kymmendö brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Strindbergs ö — Waxholmsbåt från Dalarö eller Nynäshamn.',
  },
  bullero: {
    destStopId: '740076413', destStopName: 'Bullerö brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Naturreservat i ytterskärgården — taxibåt eller charterturer.',
  },
}

export function getIslandTransit(slug: string): IslandTransitConfig | null {
  return ISLAND_TRANSIT[slug] ?? null
}

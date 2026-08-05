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
export const CENTRALEN_ID = '740000001' // Stockholm Centralstation

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

  // ── Tillagda 2026-08-05 ────────────────────────────────────────────────
  // Varje rad nedan är UPPMÄTT, inte hämtad ur specen. Metoden:
  //   1. location.nearbystops runt öns koordinat
  //   2. hållplatsen måste bevisligen tillhöra ön — inuti öns OSM-polygon
  //      (place=island, ytterringar hopsydda) eller högst 300 m från dess
  //      strandlinje, eftersom bryggor ligger på pirar utanför land. Saknar
  //      ön polygon måste hållplatsnamnet bära öns namn.
  //   3. en verklig resa dit måste finnas via /trip, annars ingen rad
  //   4. origin = den av Centralen/Nynäshamn/Strömkajen som gav snabbast
  //      resa — dock aldrig Strömkajen för en resa utan båtben; det är en
  //      kaj, ingen bussterminal.
  // Sifferkommentaren är restiden som faktiskt mättes den dagen.
  namdo: {
    // 107 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740021549', destStopName: 'Östanvik (Nämdö) brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss från Slussen till Stavsnäs vinterhamn, sedan Waxholmsbåt ut till Nämdö.',
  },
  singo: {
    // 315 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740068074', destStopName: 'Åmyran',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Landvägen hela sträckan, buss via Norrtälje. Singö nås över bro — ingen båt behövs.',
  },
  lido: {
    // 160 min, 3 byten, uppmätt 2026-08-05
    destStopId: '740034559', destStopName: 'Lidö brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss till Räfsnäs brygga via Norrtälje, sedan kort båttur över till Lidö.',
  },
  graddo: {
    // 117 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740067876', destStopName: 'Gräddö torg',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss via Norrtälje. Gräddö ligger på fastlandet — härifrån går båtarna vidare ut i Rådmansöskärgården.',
  },
  vaddo: {
    // 140 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740068043', destStopName: 'Edeby torg',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss via Norrtälje. Väddö nås över bro.',
  },
  toro: {
    // 42 min, 0 byten, uppmätt 2026-08-05
    destStopId: '740069724', destStopName: 'Eneby affär',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Buss 852 från Nynäshamn station. Torö nås över bro.',
  },
  fjardlang: {
    // 118 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740020696', destStopName: 'Fjärdlång brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Direkt Waxholmsbåt från Nynäshamn, inga byten.',
  },
  rindo: {
    // 88 min, 3 byten, uppmätt 2026-08-05
    destStopId: '740045830', destStopName: 'Rindö centrum',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss till Vaxholm och vägfärja över till Rindö. Färjan är avgiftsfri och går ofta.',
  },
  vindo: {
    // 82 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740066446', destStopName: 'Fjällsvik',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss från Slussen ända fram. Vindö nås över broar via Värmdö.',
  },
  smaadalaro: {
    // 88 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740020173', destStopName: 'Smådalarö',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Pendeltåg till Handen, sedan buss 839.',
  },
  musko: {
    // 46 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740069684', destStopName: 'Risdalsvägen',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    note: 'Pendeltåg till Ösmo och buss genom Muskötunneln.',
  },
  adelsjo: {
    // 108 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740070750', destStopName: 'Lilla Stenby Norrängsvägen',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss från Brommaplan via Munsö. Vägfärjan över till Adelsö ingår i resan.',
  },
  ingaro: {
    // 54 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740066377', destStopName: 'Södra Evlinge',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss från Slussen, knappt en timme. Ingarö nås över bro.',
  },
  ekno: {
    // 185 min, 3 byten, uppmätt 2026-08-05
    destStopId: '740034482', destStopName: 'Eknö brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss till Stavsnäs och Waxholmsbåt via Sandhamn. Lång resa — planera dagen efter båten.',
  },
}

export function getIslandTransit(slug: string): IslandTransitConfig | null {
  return ISLAND_TRANSIT[slug] ?? null
}

/**
 * Öar där vi har MÄTT att ingen kollektivtrafik når fram — inte öar vi bara
 * saknar data om. Skillnaden är viktig: här kan vi säga något sant till
 * besökaren i stället för att rendera ett tomrum.
 *
 * Mätt 2026-08-05 med /api/transit/stop-lookup. Kontrollera om ny brygga
 * tillkommer; Waxholmsbolaget lägger till och drar in bryggor mellan säsonger.
 */
export const ISLAND_NO_TRANSIT: Record<string, string> = {
  'asko': 'ingen hållplats inom 5 km',
  'galo': 'närmaste hållplats (Nor, 533 m) kunde inte knytas till ön',
  'morko': 'ingen hållplats inom 5 km',
  'bjorko': 'närmaste hållplats (Lökholmen, 1398 m) kunde inte knytas till ön',
  'svenska-hogarna': 'ingen hållplats inom 5 km',
  'huvudskar': 'ingen hållplats inom 5 km',
  'hasselo': 'närmaste hållplats (Lökholmen, 4865 m) kunde inte knytas till ön',
  'ormsko': 'närmaste hållplats (Kalkberget (Nämdö) brygga, 2969 m) kunde inte knytas till ön',
  'kanholmen': 'närmaste hållplats (Arbodaö brygga, 1097 m) kunde inte knytas till ön',
  'norrpada': 'ingen hållplats inom 5 km',
  'graskar': 'ingen hållplats inom 5 km',
  'langviksskaret': 'ingen hållplats inom 5 km',
  'storholmen': 'närmaste hållplats (Långvik (Runmarö) brygga, 2752 m) kunde inte knytas till ön',
  'langskar': 'ingen hållplats inom 5 km',
  'storskar': 'närmaste hållplats (Rödlöga brygga, 4719 m) kunde inte knytas till ön',
}

export function getIslandNoTransitReason(slug: string): string | null {
  return ISLAND_NO_TRANSIT[slug.toLowerCase()] ?? null
}

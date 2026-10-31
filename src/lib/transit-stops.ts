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
export const SALTHOLMEN_ID = '740001206' // Göteborg Saltholmen — södra skärgårdens färjeläge
export const GOTEBORG_C_ID = '740000002' // Göteborg Centralstation
export const KARLSKRONA_C_ID = '740000230' // Karlskrona Centralstation

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
  /**
   * P0 2026-10-29: när turer till eller från ön bara går om de beställts i
   * förväg. ResRobot-svaren som widgetarna visar säger inte det, så en tur
   * som kräver beställning såg ut som en vanlig avgång. Visas i både
   * avgångsrutan och "Sista båten". Måste ha KÄLLA-rad ovanför värdet.
   */
  bestallning?: string
}

/**
 * Slugs som inte finns här får ingen DepartureWidget. Lägg till efter
 * att ny stop-ID verifierats mot ResRobot location.name.
 */
export const ISLAND_TRANSIT: Record<string, IslandTransitConfig> = {
  sandhamn: {
    destStopId: '740020694', destStopName: 'Sandhamn brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h433.pdf — "433 Slussen–Djurö", "Stavsnäs vinterhamn" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h434.pdf — "Stavsnäs vinterhamn 2)", "2) Endast vissa turer." (läst 2026-10-29)
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/sandhamn — "Du kan åka till Sandhamn med båt från Stavsnäs", "Under sommaren så kan du också åka till Sandhamn från Strömkajen." (läst 2026-10-29)
    // P0 2026-10-29: noten pekade på buss 434, som bara vissa turer går till Stavsnäs vinterhamn.
    note: 'Båten från Stavsnäs vinterhamn går året runt. Dit tar du SL-buss 433 från Slussen (även vissa turer med 434). Från Strömkajen går båten bara sommartid.',
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
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Kollektivtrafik: Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan." (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "21A ÅRSTA – UTÖ" (läst 2026-10-29)
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h846.pdf — "846 Västerhaninge station–Årsta (–Årsta slott)", "Årsta brygga", "Giltig 18 mars–18 juni samt 17 augusti–12 december 2026" (läst 2026-10-31)
    note: 'Pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbolagets båt, linje 21, året om till Gruvbryggan.',
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
    // KÄLLA: Värmdö kommun (varmdo.se — Sollenkroka brygga trafikerar Möja) +
    // ResRobot-ben avlästa 2026-08-11: buss 434 Slussen→Sollenkroka, färja 14-1
    // Sollenkroka→Möjaström. Noten sa tidigare Stavsnäs — FEL hamn, 3 mil bort.
    note: 'Båtarna till Möja går från Sollenkroka brygga, inte Stavsnäs.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Beställ resan i SL-appen" (anmärkningarna B, C och b i tabell 14; fristerna skiljer sig mellan turerna, för C-turerna gäller dagen före) (läst 2026-10-29)
    // P0 2026-10-29: kortet "Sista båten från Möja" visade en beställningstur utan att säga att den måste beställas.
    bestallning: 'Flera turer till och från Möja går bara om resan har beställts i förväg, och hur tidigt den måste beställas skiljer sig mellan turerna. För en del turer gäller dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 14 innan du åker.',
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
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ" (läst 2026-10-29)
    // P0 2026-10-29: avgångsrutan räknade från Nynäshamns färjeterminal. Ingen av Waxholmsbolagets tabeller för perioden har båt därifrån till Ornö.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Bilfärja från Dalarö — pendeltåg till Handen + buss 839 + färja.',
  },
  kymmendo: {
    destStopId: '740018277', destStopName: 'Kymmendö brygga',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Kymmendö", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s40.pdf — "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026", "40B NORDSYDLINJEN: NYNÄSHAMN – SANDHAMN – ARHOLMA / NORRTÄLJE", "Kymmendö" (läst 2026-10-29)
    // P0 2026-10-29: noten sa "från Dalarö eller Nynäshamn" utan säsong. Från Nynäshamn går båten bara sommartid.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Waxholmsbolagets linje 19 från Dalarö; enstaka turer går från Strömkajen. Sommartid går också Nordsydlinjen från Nynäshamn (2026: 22 juni–16 augusti).',
    bestallning: 'En del turer till och från Kymmendö går bara om resan har beställts i förväg. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 innan du åker.',
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
    // 118 min, 0 byten, uppmätt 2026-08-05 · ren båtresa (sommartid, Nordsydlinjen)
    destStopId: '740020696', destStopName: 'Fjärdlång brygga',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Fjärdlång", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s40.pdf — "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026", "40B NORDSYDLINJEN: NYNÄSHAMN – SANDHAMN – ARHOLMA / NORRTÄLJE", "Fjärdlång" (läst 2026-10-29)
    // P0 2026-10-29: noten sa "Direkt Waxholmsbåt från Nynäshamn" utan säsong. Den båten går bara sommartid.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Waxholmsbolagets linje 19 från Dalarö; enstaka turer går från Strömkajen. Sommartid går också Nordsydlinjen från Nynäshamn (2026: 22 juni–16 augusti).',
    bestallning: 'En del turer till och från Fjärdlång går bara om resan har beställts i förväg. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 innan du åker.',
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

  // ── Utanför Stockholm, tillagda 2026-08-05 ────────────────────────────
  // Samma beviskrav som ovan. Koordinaterna kom från OSM (place=island,
  // namnmatchning mot ankarpunkt) eftersom islandCoords.ts saknade dem helt.
  // Göteborgs södra skärgård ligger i ResRobot och ger rena båtresor från
  // Saltholmen — Styrsöbåtarna, 14-35 min utan byten.
  branno: {
    // 23 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740024949', destStopName: 'Brännö Rödsten',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    note: 'Direkt Styrsöbåt från Saltholmen — spårvagn 11 dit från Göteborg C. Brännö är bilfri.',
  },
  styrso: {
    // 14 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740001213', destStopName: 'Styrsö Bratten',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    note: 'Direkt Styrsöbåt från Saltholmen, kortast överfarten i södra skärgården.',
  },
  donso: {
    // 26 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740001109', destStopName: 'Donsö',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    note: 'Direkt Styrsöbåt från Saltholmen. Donsö och Styrsö binds ihop av en gångbro.',
  },
  vrango: {
    // 35 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740001382', destStopName: 'Vrångö',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    note: 'Direkt Styrsöbåt från Saltholmen, ytterst i södra skärgården — sista anhalten.',
  },
  asperon: {
    // 19 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740024950', destStopName: 'Asperö norra',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    note: 'Direkt Styrsöbåt från Saltholmen, knappt 20 minuter.',
  },
  tynningo: {
    // 128 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740034529', destStopName: 'Orrlunda (Tynningö) brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss till Vaxholm och båt över. Tynningö har också vägfärja från Bogesund.',
  },
  djuro: {
    // 80 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740066438', destStopName: 'Djurö skola',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss från Slussen ända fram. Djurö nås över broar via Värmdö.',
  },
  graskar: {
    // Uppmätt 2026-09-28 med /api/transit/stop-lookup: Gräskö brygga ligger 564 m från
    // Lantmäteriets ortnamnspunkt. Provresa från Stockholm: buss 676 och 634 via
    // Norrtälje, sista biten med färja linje 28. Tidigare stod ön felaktigt som
    // "ingen hållplats inom 5 km" eftersom koordinaten låg vid Möja.
    destStopId: '740034555', destStopName: 'Gräskö brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss via Norrtälje och Waxholmsbolagets linje 28 sista biten.',
  },
  'aspo-blekinge': {
    // 37 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740071726', destStopName: 'Aspö Djupvik',
    originStopId: KARLSKRONA_C_ID, originStopName: 'Karlskrona Centralstation',
    note: 'Skärgårdsbåt från Karlskrona. Aspö hör till världsarvet Örlogsstaden Karlskrona.',
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
  'lilla-karlso': 'ingen hållplats inom 5 km — ön nås bara med Naturskyddsföreningens turbåt från Klintehamn',

  'asko': 'ingen hållplats inom 5 km',
  'galo': 'närmaste hållplats (Nor, 533 m) kunde inte knytas till ön',
  'morko': 'ingen hållplats inom 5 km',
  'birka': 'närmaste hållplats (Lökholmen, 1398 m) kunde inte knytas till ön', // 2026-10-21: nyckeln hette bjorko
  'svenska-hogarna': 'ingen hållplats inom 5 km',
  'huvudskar': 'ingen hållplats inom 5 km',
  'hasselo': 'närmaste hållplats (Lökholmen, 4865 m) kunde inte knytas till ön',
  'ormsko': 'närmaste hållplats (Kalkberget (Nämdö) brygga, 2969 m) kunde inte knytas till ön',
  'norrpada': 'ingen hållplats inom 5 km',
  'langviksskaret': 'ingen hållplats inom 5 km',
  'storholmen': 'närmaste hållplats (Långvik (Runmarö) brygga, 2752 m) kunde inte knytas till ön',
  // Ommätt 2026-09-28 med rättade koordinater (islandCoords.ts).
  'langskar': 'närmaste hållplats (Bullerö brygga, 1799 m) kunde inte knytas till ön',
  // Ommätt 2026-09-28 med rättade koordinater (islandCoords.ts).
  'storskar': 'närmaste hållplats (Särsö brygga, 3979 m) kunde inte knytas till ön',
}

export function getIslandNoTransitReason(slug: string): string | null {
  return ISLAND_NO_TRANSIT[slug.toLowerCase()] ?? null
}

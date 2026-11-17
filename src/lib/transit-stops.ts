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
  /**
   * P0 2026-11-02: när operatören inte har fast avgångstid vid bryggan
   * (Waxholmsbolagets anmärkning X). Reseplanerarens tider ser då ut som
   * tidtabellens fast de inte är det. Visas i både avgångsrutan och "Sista
   * båten". Måste ha KÄLLA-rad ovanför värdet.
   */
  tidsObs?: string
  /**
   * P0 24 (2026-11-17): var resenären ser om turen i rutan kräver beställning,
   * till exempel "Waxholmsbolagets tabell 16". Rutorna visar den direkt under
   * tiderna. ResRobot-svaret säger inte vilka turer som kräver beställning
   * (trafiklab.ts läser inga anmärkningar), och "Sista båten" pekade därför ut
   * en beställningstur som dagens sista båt. Måste ha KÄLLA-rad ovanför värdet.
   */
  bestallningTabell?: string
  /**
   * P0 24 (2026-11-17): reseplaneraren som rutorna länkar till, när den inte
   * följer av ursprunget (getReseplanerare). Måste ha KÄLLA-rad ovanför värdet.
   */
  reseplanerare?: Reseplanerare
  /**
   * P0 24 (2026-11-17, Kontrollanten): när bryggan i destStopId är avstängd enligt
   * operatörens tabell. Rutorna visar då bara den här texten och inga båttider, så
   * att en stängd brygga inte ser ut som om båtar gick dit. Måste ha KÄLLA-rad ovanför värdet.
   */
  stangd?: string
}

/** P0 24 (2026-11-17): länken i rutorna när en tur är inställd eller tiderna saknas. */
export interface Reseplanerare {
  /** Visas i texten, till exempel "Västtrafiks reseplanerare". */
  namn: string
  url: string
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
    // P0 2026-11-03 (Kontrollanten, sandhamn-k025/k107/k163): avgångsrutan visade
    // turer med anmärkning B och b i tabell 16 som vanliga avgångar.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", "16B HAGEDE – SANDHAMN – STAVSNÄS", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (anmärkningarna B, b och C: B minst två timmar och b minst en timme före avgång, båda senast på eftermiddagen samma dag; C senast tidigt på kvällen dagen före resdagen) (läst 2026-10-29)
    bestallning: 'En del turer till och från Sandhamn går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 16 i god tid innan du åker.',
    // P0 24 (2026-11-17): "Sista båten från Sandhamn idag" visade på torsdagar tur 1612, som har
    // anmärkning B i 16B, fast sista turen utan beställning den dagen är 1630.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16B HAGEDE – SANDHAMN – STAVSNÄS", "ANMÄRKNING TUR", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 16',
  },
  grinda: {
    destStopId: '740098471', destStopName: 'Grinda',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Direktbåt med Waxholmsbolaget från Strömkajen sommartid.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1477 (b) i 11A och 1475 (b) i 13B; inga vid Norra Grinda.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", "Södra Grinda", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Södra Grinda: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13B HUSARÖ – SÖDRA INGMARSÖ – BODA – VAXHOLM – STOCKHOLM", "Södra Grinda", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Södra Grinda: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'Någon tur stannar vid Södra Grinda bara om resan har beställts i förväg. Den ska beställas minst en timme före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 11 eller 13 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 11 eller 13',
  },
  vaxholm: {
    // P0 2026-11-02 (vaxholm-0078): Västerhamnsplan (740018045) är en
    // busshållplats, och "Sista båten" visade därför SL-buss 670 (20:02) när
    // sista båten enligt tabell 2B gick 18.25. Nu samma id som ferries.ts,
    // "VAXHOLM", som enligt Trafiklab är en grupp av hållplatser och inte en
    // brygga (Kontrollanten 2026-11-02; bryggan heter Vaxholm Hotellkajen,
    // 740020991). Kortet räknar bara färjor (trafiklab.ts) och namnger bryggan
    // där båten går. Avgångsrutan visar även buss 670, som noten säger.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h2.pdf — "2B VAXHOLM – HÖGANÄS – STOCKHOLM" (läst 2026-10-31)
    destStopId: '740098250', destStopName: 'Vaxholm',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h2.pdf — "2A STOCKHOLM – HÖGANÄS – VAXHOLM", "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026" (läst 2026-10-31)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h670670x.pdf — "Tekniska högskolan", "Västerhamnsplan", "Giltig 17 augusti–12 december 2026" (läst 2026-10-31)
    note: 'Båt direkt från Strömkajen, eller buss 670 från Tekniska högskolan.',
  },
  uto: {
    destStopId: '740020695', destStopName: 'Utö Gruvbryggan',
    // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Kollektivtrafik: Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan." (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "21A ÅRSTA – UTÖ" (läst 2026-10-29)
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h846.pdf — "846 Västerhaninge station–Årsta (–Årsta slott)", "Årsta brygga", "Giltig 18 mars–18 juni samt 17 augusti–12 december 2026" (läst 2026-10-31)
    note: 'Pendeltåg till Västerhaninge, buss 846 till Årsta brygga och Waxholmsbolagets båt, linje 21, året om till Gruvbryggan.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 18 av 28 turer i 21A har b vid Gruvbryggan, inga i 21B. Tur 1936 (B) i tabell 19 går bara 17 augusti till 13 september och står därför inte med (rättat efter Kontrollanten, k047, k048).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "21A ÅRSTA – UTÖ", "Gruvbryggan (Utö)", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Gruvbryggan (Utö): b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'I Waxholmsbolagets tabell 21, som gäller till 12 december 2026, har en del turer till Gruvbryggan på Utö anmärkning b: de stannar där bara om resan har beställts i förväg. Den ska beställas minst en timme före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 21 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 21',
  },
  finnhamn: {
    destStopId: '740020693', destStopName: 'Finnhamn brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 54 av 106 turer i 10, 12 och 13 har B, b, C eller c; tur 1318 (B) i 13B.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Finnhamn", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Finnhamn: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Finnhamn", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Finnhamn: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13B HUSARÖ – SÖDRA INGMARSÖ – BODA – VAXHOLM – STOCKHOLM", "Finnhamn", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Finnhamn: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), c (bryggan, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En stor del av turerna till och från Finnhamn går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 13 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 10, 12 eller 13',
  },
  fjaderholmarna: {
    destStopId: '740034632', destStopName: 'Fjäderholmarna brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Närmaste skärgårdsön: båt direkt från Strömkajen, ca 25 min.',
    // P0 2026-11-02 (Kontrollanten, fjaderholmarna-k002/k103): Fjäderholmarna är
    // märkt X i tabell 2, så tiderna i rutorna är reseplanerarens, inte tidtabellens.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h2.pdf — "Fjäderholmarna", "X", "Bryggorna trafikeras utan fast avgångstid.", "Sök hela din resa på sl.se för att få tider för både anslutande SL-trafik och skärgårdstrafiken." (läst 2026-11-02)
    tidsObs: 'Waxholmsbolaget angör Fjäderholmarna utan fast avgångstid. Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  moja: {
    destStopId: '740024936', destStopName: 'Möjaström brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: Värmdö kommun (varmdo.se — Sollenkroka brygga trafikerar Möja) +
    // ResRobot-ben avlästa 2026-08-11: buss 434 Slussen→Sollenkroka, färja 14-1
    // Sollenkroka→Möjaström. Noten sa tidigare Stavsnäs — FEL hamn, 3 mil bort.
    note: 'Båtarna till Möja går från Sollenkroka brygga, inte Stavsnäs.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Beställ resan i SL-appen" (anmärkningarna B, b och C i tabell 14: B minst två timmar och b minst en timme före avgång, båda senast på eftermiddagen samma dag; C senast tidigt på kvällen dagen före) (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Långvik", "Dragedet" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Långvik", "Dragedet" (läst 2026-10-29)
    // P0 2026-10-29: kortet "Sista båten från Möja" visade en beställningstur utan att säga att den måste beställas.
    bestallning: 'Flera turer till och från Möja går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 14 i god tid innan du åker. Långvik och Dragedet trafikeras även av tabell 10 och 12.',
    // P0 24 (2026-11-17, Kontrollanten): avgångsrutan visade en resa med tur 1441, som angör
    // Möjaström med Xb (ingen fast tid, bara efter beställning). Rutan visar Möjaström, som bara
    // tabell 14 trafikerar.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "14B MÖJA – SOLLENKROKA – VAXHOLM – STOCKHOLM", "Möjaström (Möja)", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 14',
    // Sista båten 2026-11-07 (Kontrollanten, sb-k007): tur 1414 angör Möjaström
    // utan fast tid (X), och kortet visade reseplanerarens beräknade tid.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Möjaström (Möja)", "X", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-07)
    tidsObs: 'Waxholmsbolaget angör Möjaström på flera turer utan fast avgångstid. Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  husaro: {
    destStopId: '740020692', destStopName: 'Husarö brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // P0 2026-11-02 (husaro-0078–0080): avgångsrutan visade beställningsturer som
    // vanliga avgångar. Samma lindring som för Möja tills koden kan läsa ResRobots
    // anmärkningar.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (anmärkningarna b, B och C; för C-turerna gäller dagen före) (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (anmärkningen C: dagen före) (läst 2026-10-29)
    bestallning: 'Flera turer till och från Husarö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 13 i god tid innan du åker.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 10, 12 eller 13',
  },
  ingmarso: {
    destStopId: '740034607', destStopName: 'Ingmarsö Norra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 16 av 18 turer i 10A, 4 av 19 i 10B och 5 av 15 i 12A; inga i 12B.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Ingmarsö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Norra Ingmarsö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Ingmarsö", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Norra Ingmarsö: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Norra Ingmarsö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10 eller 12 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 10 eller 12',
  },
  dalaro: {
    destStopId: '740001036', destStopName: 'Dalarö Hotellbryggan',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Buss 839 från Handen pendelstation tar dig till Dalarö.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2006, 2022, 2014, 2094 (B) i 20B, 1904, 1926, 1936 (B) i 19B; C på några turer. Tabellerna kallar bryggan Dalarö.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Dalarö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Dalarö: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h20.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "20A DALARÖ – ORNÖ (VÄSTRA SIDAN)", "Dalarö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Dalarö: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Dalarö går bara om resan har beställts i förväg. Beroende på tur ska den beställas minst två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 eller 20 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 19 eller 20',
  },

  // ── Norra skärgården (nås via Furusund/Räfsnäs eller direktbåt) ───────
  arholma: {
    destStopId: '740024314', destStopName: 'Arholma brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Yttersta ön i norra skärgården, båt från Simpnäs (buss 631 från Norrtälje).',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 3014 och 3078 (B) i 30B, 3013 och 3077 (B) i 30A, 3001 och 3002 (C).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "30A SIMPNÄS – ARHOLMA", "Arholma", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Arholma: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'Några turer till och från Arholma går bara om resan har beställts i förväg. Beroende på tur ska den beställas minst två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 30 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 30',
  },
  blido: {
    destStopId: '740001021', destStopName: 'Blidö Bromskär brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h634.pdf — "Norrtälje–Blidö", "Giltig 17 augusti–12 december 2026", "Norrtälje busstation" (läst 2026-11-17)
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/ — "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård.", "Resan med vägfärjan är avgiftsfri." (läst 2026-11-17)
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/ — "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård.", "Resan med vägfärjan är avgiftsfri." (läst 2026-11-17)
    note: 'Buss 634 från Norrtälje busstation, eller bil med Trafikverkets avgiftsfria vägfärjor från Furusund via Yxlan.',
    // P0 24 (2026-11-17, Kontrollanten): rutorna räknade till Bromskär, som i avsnittet 1 oktober till
    // 12 december av tabell 28 har anmärkning r (avstängd). Ingen annan brygga på Blidö står i tabellen,
    // och något annat hållplats-id för Blidö är inte uppmätt, så destStopId står kvar och rutorna visar texten.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Bromskär (Blidö) r)", "Bryggan är avstängd till juni 2027 på grund", "av renoveringsarbeten." (läst 2026-11-17)
    stangd: 'Bryggan Bromskär på Blidö är avstängd till juni 2027 på grund av renoveringsarbeten, enligt Waxholmsbolagets tabell 28.',
  },
  fejan: {
    destStopId: '740018278', destStopName: 'Fejan brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 3108 och 3110 (B) i 31B; 2 av 10 turer i 31A och 8 av 12 i 31B har B, b, C eller c.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "31A RÄFSNÄS – TJOCKÖ – FEJAN", "Fejan", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Fejan: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före), c (bryggan, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Fejan går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 31 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 31',
  },
  furusund: {
    destStopId: '740025063', destStopName: 'Furusund brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Knutpunkten för norra skärgården, buss 626/634 från Norrtälje.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2868, 2820 och 2882 (B) i 28B, 2501 och 2502 (B) i tabell 25; tabell 28 är avsnittet 1 oktober till 12 december i h28.pdf.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h25.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "25A FURUSUND – HÖGMARSÖ – SOLÖ", "Furusund", "Beställ resan i SL-appen, på", "minst 2 timmar innan" (vid Furusund: B (turen går bara efter beställning)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Furusund", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Furusund: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Furusund går bara om resan har beställts i förväg. Beroende på tur ska den beställas minst två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 25 eller 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 25 eller 28',
  },
  norrora: {
    destStopId: '740034551', destStopName: 'Norröra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Saltkråkan-ön, Waxholmsbåt från Furusund.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2868 och 2820 (B) i 28B; B, b eller C på 11 av 14 turer i 28A och 6 av 17 i 28B (avsnittet 1 oktober till 12 december).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Norröra", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Norröra: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Norröra går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 28',
  },
  rodloga: {
    destStopId: '740024879', destStopName: 'Rödlöga brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Yttersta ytterskärgården, direktbåt från Furusund.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): i 28B har 2822, 2852 och 2892 (Y, från 2 november) b; 2872 (S, till 1 november) saknar b; inga turer dit har b (rättat efter Kontrollanten, k080).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Rödlöga", "Beställ resan i SL-appen, på", "Går under perioden 1 oktober - 1 november.", "Går under perioden 2 november - 12", "minst 1 timme innan avgång" (vid Rödlöga: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'I Waxholmsbolagets tabell 28 för 2 november till 12 december 2026 har alla turer från Rödlöga anmärkning b: de stannar där bara om resan har beställts i förväg. Den ska beställas minst en timme före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 28',
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
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 12 av 35 turer i 11A, 3 av 33 i 11B, 1 av 6 i 14A.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", "Gällnö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Gällnö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "Gällnö", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Gällnö: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Gällnö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 11 eller 14 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 11 eller 14',
  },
  ljustero: {
    destStopId: '740020573', destStopName: 'Åsättra (Ljusterö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Bilfärja från Östanå, buss 626 + bilfärja Östanå till Ljusterö.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1011 (B), 1001, 1021, 1002, 1042, 1020 (C).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Åsättra brygga", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Åsättra brygga: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'Några turer till och från Åsättra brygga går bara om resan har beställts i förväg. Beroende på tur ska den beställas minst två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 10',
  },
  runmaro: {
    destStopId: '740023240', destStopName: 'Långvik (Runmarö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Båt från Stavsnäs vinterhamn med Waxholmsbolaget.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1612 (B) i 16B och 23B, 1613 och 1665 (b) i 16A.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16A STAVSNÄS – SANDHAMN – HAGEDE", "Långvik (Runmarö)", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång" (vid Långvik (Runmarö): B (turen går bara efter beställning), b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h23.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "23B RUNMARÖ – STAVSNÄS", "Långvik (Runmarö)", "Beställ resan i SL-appen, på", "minst 2 timmar innan" (vid Långvik (Runmarö): B (turen går bara efter beställning)) (läst 2026-11-17)
    bestallning: 'Några turer till och från Långvik på Runmarö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 16 eller 23 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 16 eller 23',
  },
  svartso: {
    destStopId: '740024872', destStopName: 'Svartsö Norra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Båt från Stavsnäs vinterhamn med Waxholmsbolaget.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 19 av 19 turer i 10B, 14 av 18 i 10A (1073 och 1075 utan anmärkning) och 4 av 14 i 12A; inga i 12B och 13B (rättat efter Kontrollanten, k059).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Svartsö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Norra Svartsö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Svartsö", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Norra Svartsö: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'En stor del av turerna till och från Norra Svartsö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10 eller 12 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 10 eller 12',
  },
  resaro: {
    destStopId: '740034517', destStopName: 'Ytterby (Resarö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Bilbro från Vaxholm, buss 670 + 689 från Tekniska högskolan.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 19 av 27 turer i 5A och 13 av 34 i 5B har b.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG", "Ytterby (Resarö)", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Ytterby (Resarö): b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'Många turer till och från Ytterby på Resarö stannar där bara om resan har beställts i förväg. Den ska beställas minst en timme före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 5 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 5',
  },

  // ── Södra skärgården (Nynäshamn) ─────────────────────────────────────
  landsort: {
    destStopId: '740024878', destStopName: 'Landsort brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    // Rättad 2026-11-09 (P0 21): buss 858 går Grödby–Nynäshamn, inte till Ankarudden. Det är 852 som går dit.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h852.pdf — "Nynäshamns station–Torö", "ANKARUDDEN", "Giltig 17 augusti–12 december 2026" (läst 2026-11-09)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h858.pdf — "Grödby–Nynäshamn (Sandhamn)" (läst 2026-11-09)
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/landsort — "Båtarna till Landsort går från Ankaruddens brygga. Den ligger strax söder om Nynäshamn, och det går SL-trafik mellan Nynäshamn och Ankarudden." (läst 2026-11-09)
    note: 'Pendeltåg till Nynäshamn + buss 852 till Ankarudden + båt.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 2908 (B) i 29B; 2907, 2957, 2977 (B) i 29A.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h29.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "29A ANKARUDDEN – LANDSORT", "Landsort", "Beställ resan i SL-appen, på", "minst 2 timmar innan" (vid Landsort: B (turen går bara efter beställning)) (läst 2026-11-17)
    bestallning: 'Några turer till och från Landsort går bara om resan har beställts i förväg. Den ska beställas minst två timmar före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 29 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 29',
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
    note: 'Bilfärja från Dalarö, pendeltåg till Handen + buss 839 + färja.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 7 av 9 turer i 19A och 9 av 13 i 19B har b eller B.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Ornö Kyrka", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång" (vid Ornö Kyrka: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    bestallning: 'Många turer till och från Ornö kyrka går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 19',
  },
  kymmendo: {
    destStopId: '740018277', destStopName: 'Kymmendö brygga',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Kymmendö", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s40.pdf — "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026", "40B NORDSYDLINJEN: NYNÄSHAMN – SANDHAMN – ARHOLMA / NORRTÄLJE", "Kymmendö" (läst 2026-10-29)
    // P0 2026-10-29: noten sa "från Dalarö eller Nynäshamn" utan säsong. Från Nynäshamn går båten bara sommartid.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Waxholmsbolagets linje 19 från Dalarö; enstaka turer går från Strömkajen. Sommartid går också Nordsydlinjen från Nynäshamn (2026: 22 juni till 16 augusti).',
    bestallning: 'En del turer till och från Kymmendö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 i god tid innan du åker.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Kymmendö", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 19',
  },
  // bullero flyttades 2026-11-09 till ISLAND_NO_TRANSIT (P0 22); se kommentaren där.

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
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1708 (B) i 17B; C på 1711, 1713, 1731, 1712, 1714, 1732; b på 1707, 1727, 1766.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h17.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "17A STAVSNÄS – NÄMDÖ – SALTSJÖBADEN – STOCKHOLM", "Östanvik (Nämdö)", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Östanvik (Nämdö): B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Östanvik på Nämdö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 17 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 17',
  },
  singo: {
    // 315 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740068074', destStopName: 'Åmyran',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Landvägen hela sträckan, buss via Norrtälje. Singö nås över bro, ingen båt behövs.',
  },
  lido: {
    // 160 min, 3 byten, uppmätt 2026-08-05
    destStopId: '740034559', destStopName: 'Lidö brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss till Räfsnäs brygga via Norrtälje, sedan kort båttur över till Lidö.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): alla 7 turer med tid vid Lidö i 31A har b; i 31B tur 3110 (B), 3150 och 3170 (C), 3106 och 3112 (b), men 3152 och 3182 stannar utan anmärkning (rättat efter Kontrollanten, k044).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "31A RÄFSNÄS – TJOCKÖ – FEJAN", "Lidö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Lidö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'Många turer till och från Lidö går eller stannar där bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 31 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 31',
  },
  graddo: {
    // 117 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740067876', destStopName: 'Gräddö torg',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss via Norrtälje. Gräddö ligger på fastlandet, härifrån går båtarna vidare ut i Rådmansöskärgården.',
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
    note: 'Waxholmsbolagets linje 19 från Dalarö; enstaka turer går från Strömkajen. Sommartid går också Nordsydlinjen från Nynäshamn (2026: 22 juni till 16 augusti).',
    bestallning: 'De flesta turer stannar vid Fjärdlång bara om resan har beställts i förväg, och någon tur går bara efter beställning. Beställ minst en eller två timmar före avgång, beroende på tur, och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 i god tid innan du åker.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Fjärdlång", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 19',
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
    note: 'Buss till Stavsnäs och Waxholmsbåt via Sandhamn. Lång resa. Planera dagen efter båten.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1612 (B) i 16B; 8 av 23 turer i 16A har b eller C.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16A STAVSNÄS – SANDHAMN – HAGEDE", "Eknö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Eknö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Eknö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 16 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 16',
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
    note: 'Direkt Styrsöbåt från Saltholmen, spårvagn 11 dit från Göteborg C. Brännö är bilfri.',
  },
  styrso: {
    // 14 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740001213', destStopName: 'Styrsö Bratten',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    // P0 2026-11-02 (styrso-0075, styrso-0079): tiderna i rutorna gäller bryggan
    // Bratten. Tången trafikeras bara av linje 282, och dagens sista båt därifrån
    // går tidigare. "Kortast överfarten i södra skärgården" var obelagt och struket.
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf — "281 Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö", "282 Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Styrsö Tången–Brännö Husvik", "Gäller 24 aug – 12 dec 2026" (läst 2026-10-31)
    note: 'Linje 281 och 282 går från Saltholmen till Styrsö Bratten utan byte, och tiderna här gäller Bratten. Från Tången går bara linje 282, och dagens sista båt därifrån går tidigare än från Bratten.',
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
    note: 'Direkt Styrsöbåt från Saltholmen, ytterst i södra skärgården, sista anhalten.',
    // P0 24 (2026-11-17, Redaktörens tillägg): i tabellen för 281 och 282 har Vrångö anmärkning t på den
    // sista kvällsturen måndag till fredag och söndag och på nattturerna (MÄTT i pdftotext -layout). Lördag
    // har den sista kvällsturen ingen anmärkning. Donsö, Styrsö Bratten (281/282) och Brännö Rödsten och
    // Asperö Norra (283) har ingen anmärkning om föranmälan.
    // KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014528100000/ — "Tidtabell linje 281", "Vrångö - Saltholmen" (sidan länkar till pdf:en nedan) (läst 2026-11-17)
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf — "Gäller 24 aug – 12 dec 2026", "Vrångö–Donsö–Styrsö Bratten–Köpstadsö–Saltholmen–Stenpiren", "Vrångö", "t Anlöps för påstigning efter föranmälan till båtens mobiltelefon", "senast 15 min före avgång." (läst 2026-11-17)
    bestallning: 'Några turer från Vrångö, bland dem den sista på kvällen måndag till fredag och söndag, stannar där för påstigning bara om du har anmält dig i förväg till båtens mobiltelefon, senast 15 minuter före avgång. Numret och anmärkningen för din tur står i Västtrafiks tidtabell för linje 281.',
    bestallningTabell: 'Västtrafiks tidtabell för linje 281',
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
    // P0 2026-11-07 (Kontrollanten, sb2-k004): vägfärjan går från Lagnö på Värmdö, inte från Bogesund.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h670670x.pdf — "670  Stockholm–Vaxholm" (läst 2026-11-07)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Vaxholm avg.", "Norra Tynningö" (läst 2026-11-07)
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/ — "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård." (läst 2026-11-07)
    note: 'Buss till Vaxholm och båt över. Tynningö har också vägfärja från Lagnö på Värmdö.',
    // Sista båten 2026-11-07 (Kontrollanten, sb-k005): kortet visade en tur från
    // Norehill, som i tabell 4 är märkt Xb (ingen fast tid, bara efter beställning).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "Norehill (Tynningö)", "Xb", "Orrlunda (Tynningö)", "Norra Tynningö", "Bryggorna trafikeras utan fast avgångstid.", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (anmärkningarna b och B) (läst 2026-11-07)
    // Kontrollanten (sb2-k002): sista turen från Norra Tynningö är en B-tur (minst två timmar).
    bestallning: 'Flera turer till och från Tynningö går eller stannar vid bryggorna bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 4 i god tid innan du åker.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Orrlunda (Tynningö)", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 4',
    tidsObs: 'Waxholmsbolaget angör Norehill på Tynningö på flera turer utan fast avgångstid. Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
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
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2868 och 2820 (B) i 28B; B, b eller C på 11 av 13 turer i 28A och 5 av 14 i 28B (avsnittet 1 oktober till 12 december).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Gräskö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Gräskö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    bestallning: 'En del turer till och från Gräskö går eller stannar bara om resan har beställts i förväg. Beroende på tur ska den beställas minst en eller två timmar före avgång och senast på eftermiddagen samma dag, eller senast tidigt på kvällen dagen före. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 28',
  },
  'aspo-blekinge': {
    // 37 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740071726', destStopName: 'Aspö Djupvik',
    originStopId: KARLSKRONA_C_ID, originStopName: 'Karlskrona Centralstation',
    note: 'Skärgårdsbåt från Karlskrona. Aspö hör till världsarvet Örlogsstaden Karlskrona.',
    // P0 24 (2026-11-17): rutorna länkade till SL:s reseplanerare. Överfarten Karlskrona–Aspö är
    // Trafikverkets vägfärja Aspöleden. RESONERAT, inte mätt: vilket bolag ResRobot anger för båtbenet
    // kunde inte läsas utan nyckel; sidan nedan gäller överfarten i vilket fall.
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård." (läst 2026-11-17)
    reseplanerare: { namn: 'Trafikverkets sida om Aspöleden', url: 'https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/' },
  },
}

export function getIslandTransit(slug: string): IslandTransitConfig | null {
  return ISLAND_TRANSIT[slug] ?? null
}

// P0 24 (2026-11-17): rutorna länkade till https://sl.se/sv/reseplaneraren, som i dag visar
// "Sidan kunde inte hittas". På sl.se/reseplanering går länken under "Sök din resa med oss" till
// startsidan, där sökrutan finns (MÄTT i Chromium 2026-11-17).
// KÄLLA: https://sl.se/reseplanering — "Sök din resa med oss", "Använd vår reseplanerare för att hitta din resa." (läst 2026-11-17)
// KÄLLA: https://sl.se/ — "Sök resa", "Vart vill du åka?" (läst 2026-11-17)
// KÄLLA: https://kund.printhuset-sthlm.se/wa/h2.pdf — "Sök hela din resa på sl.se för att få tider för både" (läst 2026-11-17)
export const SL_RESEPLANERARE: Reseplanerare = { namn: 'SL:s reseplanerare', url: 'https://sl.se/' }

// P0 24 (2026-11-17): öarna med Saltholmen som ursprung (Brännö, Styrsö, Donsö, Vrångö, Asperö)
// trafikeras av Västtrafik, men rutorna sa "kolla SL.se" och länkade till SL.
// KÄLLA: https://www.vasttrafik.se/reseplanering/reseplaneraren/ — "Här kan du söka en resa från Start till Slut. Du kan söka mellan hållplatser, adresser eller platser." (läst 2026-11-17)
// KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/ — "Här finns Västtrafiks tidtabeller. Du hittat tidtabeller för buss, tåg, spårvagn, båt och förbeställd trafik." (läst 2026-11-17)
// KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf — "Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö", "Brännö Rödsten", "Asperö", "Gäller 24 aug – 12 dec 2026" (läst 2026-11-17)
export const VASTTRAFIK_RESEPLANERARE: Reseplanerare = { namn: 'Västtrafiks reseplanerare', url: 'https://www.vasttrafik.se/reseplanering/reseplaneraren/' }

/**
 * P0 24 (2026-11-17): reseplaneraren för ön. Öns eget värde går först, sedan
 * ursprunget (Saltholmen och Göteborg C är Västtrafiks), annars SL.
 */
export function getReseplanerare(slug: string): Reseplanerare {
  const cfg = getIslandTransit(slug)
  if (cfg?.reseplanerare) return cfg.reseplanerare
  if (cfg && (cfg.originStopId === SALTHOLMEN_ID || cfg.originStopId === GOTEBORG_C_ID)) return VASTTRAFIK_RESEPLANERARE
  return SL_RESEPLANERARE
}

/**
 * Öar där vi har MÄTT att ingen kollektivtrafik når fram — inte öar vi bara
 * saknar data om. Skillnaden är viktig: här kan vi säga något sant till
 * besökaren i stället för att rendera ett tomrum.
 *
 * Mätt 2026-08-05 med /api/transit/stop-lookup. Kontrollera om ny brygga
 * tillkommer; Waxholmsbolaget lägger till och drar in bryggor mellan säsonger.
 *
 * P0 22 (2026-11-09): en ö kan också stå här för att Trafiklab saknar resor dit,
 * fast en turbåt går dit under säsongen (Bullerö). Skälet innehåller då
 * UTAN_RESOR_I_TRAFIKLAB, och rutorna visar texten efter " — " i stället för
 * "ingen kollektivtrafik" (ingen-trafik.ts).
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
  // P0 2026-11-09 (P0 22): Bullerö stod i ISLAND_TRANSIT med Nynäshamns färjeterminal
  // som ursprung och noten "Naturreservat i ytterskärgården — taxibåt eller
  // charterturer.". Turbåten går från Stavsnäs vinterhamn, och ön ingår sedan 2025 i
  // Nämdöskärgårdens nationalpark.
  // Uppmätt 2026-11-09 med /api/transit/stop-lookup: Bullerö brygga (740076413) finns
  // i Trafiklab men gav 0 resor dit från Stavsnäs vinterhamn (740001312), Stavsnäs by
  // (740024823), Nynäshamns färjeterminal, Strömkajen och Centralen, och 0 resor
  // därifrån till Stavsnäs vinterhamn. Kontroll samma dag: Stavsnäs vinterhamn till
  // Sandhamn brygga gav 4 resor. Bullerölinjen går inte i november, så mät om när den
  // går. Har Trafiklab resor från Stavsnäs vinterhamn då, flytta tillbaka ön till
  // ISLAND_TRANSIT med Stavsnäs vinterhamn som ursprung.
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html — "Bullerö är nationalparkens entré.", "Skyddat sedan: 2025", "Skyddsform: Nationalpark", "Under högsäsongen går turbåt till entrén på Bullerö från Stavsnäs vinterhamn på Värmdö.", "Med egen båt, taxibåt eller genom att åka med någon chartrad tur går det att besöka området året om." (läst 2026-11-09)
  // KÄLLA: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/hitta-hit — "Nationalparkens huvudentré ligger på Bullerö. Dit kan du ta dig med egen båt.", "Samtliga båtlinjer utgår från Stavsnäs vinterhamn.", "Du kan resa med Bullerölinjen till nationalparkens huvudentré på Bullerö från maj till en bit in i oktober.", "Stavsnäs båttaxi driver turlinjerna. På deras webbplats finns aktuella tidtabeller. Där kan du också boka plats på båtarna" (läst 2026-11-09)
  'bullero': 'Bullerö brygga har inga resor i Trafiklab — Från maj till en bit in i oktober går turbåten Bullerölinjen från Stavsnäs vinterhamn. Tidtabell och platsbokning finns på Stavsnäs båttaxis webbplats. Med egen båt, taxibåt eller en chartrad tur kan du ta dig dit året om',
}

export function getIslandNoTransitReason(slug: string): string | null {
  return ISLAND_NO_TRANSIT[slug.toLowerCase()] ?? null
}

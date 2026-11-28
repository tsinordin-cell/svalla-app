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
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", "16B HAGEDE – SANDHAMN – STAVSNÄS", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (anmärkningarna B, b och C: B minst två timmar och b minst en timme före avgång, båda senast på eftermiddagen; C senast tidigt på kvällen dagen före resdagen) (läst 2026-10-29)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 3 (2026-11-28, f300a-R301): "samma dag" struket; tabellerna säger bara "dock senast kl. 17.00." (anmärkning b och B).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w16.pdf — "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    bestallning: 'En del turer till och från Sandhamn går eller stannar bara om resan har beställts i förväg. Den ska beställas minst en timme (anmärkning b) eller två timmar (anmärkning B) före avgång från bryggan, dock senast kl. 17.00, eller senast kl. 19.00 dagen före resdagen (anmärkning C). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 16 i god tid innan du åker.',
    // P0 24 (2026-11-17): "Sista båten från Sandhamn idag" visade på torsdagar tur 1612, som har
    // anmärkning B i 16B, fast sista turen utan beställning den dagen är 1630.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16B HAGEDE – SANDHAMN – STAVSNÄS", "ANMÄRKNING TUR", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 16',
  },
  grinda: {
    // Rättad 2026-11-16 (omarbete 4f, slut-04 k074): hållplatsen 740098471 är Grinda Södra brygga – Trafiklab ger "Grinda Södra bryggan (Värmdö kn)" för turerna dit (MÄTT 2026-11-16 i /api/transit/departures?dest=grinda) – och noten sa "sommartid" fast båten går året om.
    destStopId: '740098471', destStopName: 'Grinda Södra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Du kan åka till Grinda från Strömkajen, via Vaxholm."; "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-11-16, i Chromium)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; "Södra Grinda"; "Norra Grinda" (läst 2026-11-16)
    note: 'Waxholmsbolagets båtar går från Strömkajen via Vaxholm till Grinda året om, och under sommaren flera turer varje dag. Avgångarna här gäller Södra Grinda; tabell 11 har också bryggan Norra Grinda.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1477 (b) i 11A och 1475 (b) i 13B; inga vid Norra Grinda.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", "Södra Grinda", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Södra Grinda: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13B HUSARÖ – SÖDRA INGMARSÖ – BODA – VAXHOLM – STOCKHOLM", "Södra Grinda", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Södra Grinda: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0020): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Södra Grinda", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // Faktagranskning fas 3, runda 4 (2026-11-28, a-r3-k034): tabell 11 har redan till 12 december 2026 anmärkning b vid Södra Grinda (tur 1477; klockslagen i h11:s textlager avkodade med kontroll3/k32-verktyg/bbox.py, MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Södra Grinda", "minst 1 timme innan avgång" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w11.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Grinda", "Södra Grinda", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period för linje 14.", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Grinda kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 11 och 13 till 12 december 2026 och tabell 11 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 11 från 13 december 2026), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 11 från 13 december 2026). Från 13 december 2026 går turer med anmärkning H bara under isfri period för linje 14 (tabell 11). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 11 eller 13 i god tid innan du åker.',
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
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R201): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h8.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w2.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm", "senast kl. 19.00 dag före", "Går under isfri period" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w3.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "Går under isfri period" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w4.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w5.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w7.pdf — "7A STOCKHOLM – VAXHOLM – LINDALSSUNDET", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "Går under isfri period för linje 2 eller linje 4.", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w8.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "Går under isfri period för linje 2 eller linje 4." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w9.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "Går under isfri period för linje 2 eller linje 4." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w11.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "minst 2 timmar innan", "Går under isfri period för linje 14.", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "Går under isfri period" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w14.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vaxholm ank.", "Vaxholm avg.", "Går under isfri period" (läst 2026-11-28)
    bestallning: 'Turer till och från Vaxholm kan gå bara om resan har beställts i förväg. Med anmärkning B ska den beställas minst två timmar före avgång från bryggan, dock senast kl. 17.00 (tabell 4, 5 och 8 till 12 december 2026 och tabell 4, 5, 7 och 11 från 13 december 2026). Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 2, 4 och 5 från 13 december 2026). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 2, 3, 4, 5, 13 och 14), i tabell 7, 8 och 9 bara under isfri period för linje 2 eller linje 4 och i tabell 11 bara under isfri period för linje 14. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 2, 4, 5, 7, 8 eller 11 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R202): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 2, 4, 5, 7, 8 eller 11',
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0280): texten nämnde tabellens slutdatum; vintertabellen 21 har också b vid Gruvbryggan (MÄTT), så texten hänvisar nu bara till tabellens nummer.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w21.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "21A ÅRSTA – UTÖ", "Gruvbryggan (Utö)", "minst 1 timme innan avgång" (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0280): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // Runda 3 (2026-11-28, f300a-0280): i tabell 19 har bara tur 1936 anmärkning B vid Gruvbryggan, och den turen har anmärkning T (MÄTT). Tabell 19 är struken ur meningen om B.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gruvbryggan (Utö)", "Går under perioden 17 augusti - 13" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gruvbryggan (Utö)", "Näsudden (Utö)", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w21.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gruvbryggan (Utö)", "Näsudden (Utö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Utö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 21) och med anmärkning B minst två timmar före (tabell 21 från 13 december 2026), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 21 från 13 december 2026). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 eller 21 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0031): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 19 eller 21',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R209): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Näsudden (Utö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w21.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Näsudden (Utö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Näsudden (tabell 21) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },
  finnhamn: {
    destStopId: '740020693', destStopName: 'Finnhamn brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 54 av 106 turer i 10, 12 och 13 har B, b, C eller c; tur 1318 (B) i 13B.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Finnhamn", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Finnhamn: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Finnhamn", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Finnhamn: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13B HUSARÖ – SÖDRA INGMARSÖ – BODA – VAXHOLM – STOCKHOLM", "Finnhamn", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Finnhamn: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), c (bryggan, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan avgång", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; c senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0034): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Finnhamn", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Finnhamn", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Finnhamn", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Finnhamn", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Finnhamn", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "Går under isperiod.", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Finnhamn kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 10, 12 och 13 till 12 december 2026 och tabell 10 och 13 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 10 och 13), i båda fallen senast kl. 17.00. Med anmärkning C eller c ska den beställas senast kl. 19.00 dagen före resdagen (tabell 10 och 13). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 13). Under isperiod gäller de turer som tabell 10 har för isperioden och, från 13 december 2026, turerna med anmärkning I i tabell 13. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 13 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 10, 12 eller 13',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0282): i vintertabellen 10 är Finnhamn märkt X på alla turer i isperioden vid kraftig is (MÄTT med skript/sektion.py, sidorna 5 och 6).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "GÄLLER ISPERIOD (VID KRAFTIG IS)", "Finnhamn", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0282): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Finnhamn", "utan fast avgångstid.", "ISPERIOD" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Finnhamn", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Finnhamn (tabell 10 från 13 december 2026 vid kraftig is och tabell 13 från 13 december 2026) på en del turer utan fast avgångstid (anmärkning X). Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  fjaderholmarna: {
    destStopId: '740034632', destStopName: 'Fjäderholmarna brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, f300a-0038): "Närmaste skärgårdsön" var en superlativ med bara Strömma som källa och är struken. Efter 19 november lägger färre turer till (anmärkning u), men turer utan den anmärkningen finns kvar (MÄTT med skript/kol.py, till exempel tur 1306 i 2B).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h2.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "2A STOCKHOLM – HÖGANÄS – VAXHOLM", "Strömkajen (Stockholm)", "Fjäderholmarna", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0038): anmärkning H vid Fjäderholmarna i tabell 2 från 13 december 2026 (MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w2.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Fjäderholmarna", "Går under isfri period" (läst 2026-11-28)
    note: 'Waxholmsbolagets linje 2 från Strömkajen lägger till på vissa turer, utan fast tid vid bryggan. Från 13 december 2026 går turer med anmärkning H i tabell 2 bara under isfri period.',
    // P0 2026-11-02 (Kontrollanten, fjaderholmarna-k002/k103): Fjäderholmarna är
    // märkt X i tabell 2, så tiderna i rutorna är reseplanerarens, inte tidtabellens.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h2.pdf — "Fjäderholmarna", "X", "Bryggorna trafikeras utan fast avgångstid.", "Sök hela din resa på sl.se för att få tider för både anslutande SL-trafik och skärgårdstrafiken." (läst 2026-11-02)
    tidsObs: 'Waxholmsbolaget angör Fjäderholmarna utan fast avgångstid. Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  moja: {
    destStopId: '740024936', destStopName: 'Möjaström brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "Boda brygga avg." (läst 2026-10-29). Tabell 14 har ingen hållplats i Stavsnäs.
    // KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/moja — "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja." (läst 2026-10-29)
    // Faktagranskning fas 3 (2026-11-28, f300a-0043): tabell 10 går också till Möja, från Åsättra brygga.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "Strömkajen (Stockholm)", "Boda brygga avg." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Åsättra brygga" (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0043): "inte från Stavsnäs" stämde inte sommartid: Nordsydlinjen (tabell 40) gick 22 juni till 16 augusti 2026 från Stavsnäs till Möja (Kontrollanten a-k060). Ledet är struket; resten är belagt av KÄLLA-raderna ovan.
    note: 'Båtarna till Möja går från Strömkajen, Boda brygga och Sollenkroka (tabell 14) och från Åsättra brygga (tabell 10).',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Beställ resan i SL-appen" (anmärkningarna B, b och C i tabell 14: B minst två timmar och b minst en timme före avgång, båda senast på eftermiddagen; C senast tidigt på kvällen dagen före) (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Långvik", "Dragedet" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Långvik", "Dragedet" (läst 2026-10-29)
    // P0 2026-10-29: kortet "Sista båten från Möja" visade en beställningstur utan att säga att den måste beställas.
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan avgång", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen; c senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0044): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Dragedet (Möja)", "Långvik (Möja)", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Dragedet (Möja)", "Långvik (Möja)", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Berg (Möja)", "Dragedet (Möja)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Dragedet (Möja)", "Långvik (Möja)", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w14.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Berg (Möja)", "Dragedet (Möja)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Möja kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 10, 12 och 14 till 12 december 2026 och tabell 10 och 14 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 14), i båda fallen senast kl. 17.00. Med anmärkning C eller c ska den beställas senast kl. 19.00 dagen före resdagen (tabell 14). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 14). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 14 i god tid innan du åker.',
    // P0 24 (2026-11-17, Kontrollanten): avgångsrutan visade en resa med tur 1441, som angör
    // Möjaström med Xb (ingen fast tid, bara efter beställning). Rutan visar Möjaström, som bara
    // tabell 14 trafikerar.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "14B MÖJA – SOLLENKROKA – VAXHOLM – STOCKHOLM", "Möjaström (Möja)", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0045): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 10, 12 eller 14',
    // Sista båten 2026-11-07 (Kontrollanten, sb-k007): tur 1414 angör Möjaström
    // utan fast tid (X), och kortet visade reseplanerarens beräknade tid.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "Möjaström (Möja)", "X", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-07)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0046): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Södermöja", "Möjaström (Möja)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w14.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Södermöja", "Möjaström (Möja)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Löka, Möjaström, Ramsmora och Södermöja (tabell 14) på en del turer utan fast avgångstid (anmärkning X). Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "minst 2 timmar innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00; c senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0049): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Husarö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Husarö", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Husarö", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Husarö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Husarö", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "Går under isperiod.", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Husarö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 10 och 12 till 12 december 2026 och tabell 10 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 10 och 13), i båda fallen senast kl. 17.00. Med anmärkning C eller c ska den beställas senast kl. 19.00 dagen före resdagen (tabell 10 och 13). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 13). Under isperiod gäller de turer som tabell 10 har för isperioden och, från 13 december 2026, turerna med anmärkning I i tabell 13. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 13 i god tid innan du åker.',
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0053): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Norra Ingmarsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Ingmarsö", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Brottö (Ingmarsö)", "Södra Ingmarsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Ingmarsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Brottö (Ingmarsö)", "Södra Ingmarsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "Går under isperiod.", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Ingmarsö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 10, 12 och 13 till 12 december 2026 och tabell 10 och 13 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 10 och 13), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 10 och 13). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 13). Under isperiod gäller de turer som tabell 10 har för isperioden och, från 13 december 2026, turerna med anmärkning I i tabell 13. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 13 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0054): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 10, 12 eller 13',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0283): i vintertabellen 10 är Norra Ingmarsö märkt X på alla turer i isperioden vid kraftig is (MÄTT med skript/sektion.py, sidorna 5 och 6).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "GÄLLER ISPERIOD (VID KRAFTIG IS)", "Norra Ingmarsö", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0283): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Brottö (Ingmarsö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Ingmarsö", "utan fast avgångstid.", "ISPERIOD" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Brottö (Ingmarsö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Brottö (tabell 13) samt Norra Ingmarsö (tabell 10 från 13 december 2026 vid kraftig is) på en del turer utan fast avgångstid (anmärkning X). Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  dalaro: {
    destStopId: '740001036', destStopName: 'Dalarö Hotellbryggan',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h839.pdf — "839 Rudsjöterrassen–Dalarö (–Smådalarö)", "Tidtabellen är anpassad till pendeltåg från Stockholm vid Handens station.", "Giltig 17 augusti–12 december 2026" (läst 2026-11-17)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0057): linje 839 börjar vid Handens station i SL:s tabell från 13 december 2026, inte vid Rudsjöterrassen (MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h839.pdf — "Rudsjöterrassen–Dalarö (–Smådalarö)", "Giltig 17 augusti–12 december 2026", "Handens station." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v839.pdf — "Handens station–Dalarö (–Smådalarö)", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    note: 'Pendeltåg till Handen och buss 839 till Dalarö. Till 12 december 2026 går bussen från Rudsjöterrassen och från 13 december 2026 från Handens station.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2006, 2022, 2014, 2094 (B) i 20B, 1904, 1926, 1936 (B) i 19B; C på några turer. Tabellerna kallar bryggan Dalarö.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Dalarö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Dalarö: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h20.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "20A DALARÖ – ORNÖ (VÄSTRA SIDAN)", "Dalarö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Dalarö: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "minst 2 timmar innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h20.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0058): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Dalarö ank.", "Dalarö avg.", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h20.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Dalarö", "Dalarö Skans", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Dalarö", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w20.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Dalarö", "Dalarö Skans", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Dalarö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 20) och med anmärkning B minst två timmar före (tabell 19 och 20), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 19 och 20). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 19 och 20). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 eller 20 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 19 eller 20',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R203): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h20.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Dalarö Skans", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w20.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Dalarö Skans", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Dalarö Skans (tabell 20) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },

  // ── Norra skärgården (nås via Furusund/Räfsnäs eller direktbåt) ───────
  arholma: {
    destStopId: '740024314', destStopName: 'Arholma brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0062–0052): buss 631 går Norrtälje–Rådmansö och har ingen hållplats i Simpnäs; det har 636. "Yttersta ön" var obelagt.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h631.pdf — "631 Norrtälje–Rådmansö–Norrtälje", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h636.pdf — "636 Norrtälje–Björkö", "NORRTÄLJE BUSSTATION", "Simpnäs brygga", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "30A SIMPNÄS – ARHOLMA" (läst 2026-11-28)
    // Rättelse P0 28 (2026-11-28, k36 och k37): från 13 december 2026 går linje 30 från Simpnäs bara när det är isfritt; under isperioden går 30C från Östersjö till Granö. Buss 636 har tabell också för 13 december 2026 till 20 juni 2027.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w30.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "30A SIMPNÄS – ARHOLMA", "GÄLLER ISFRI PERIOD", "30C ÖSTERSJÖ – GRANÖ (ARHOLMA)", "GÄLLER ISPERIOD", "Simpnäs (Björkö)", "Östersjö (Björkö)", "Granö (Arholma)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v636.pdf — "636 Norrtälje–Björkö", "NORRTÄLJE BUSSTATION", "Simpnäs brygga", "Östersjö brygga", "Alla hållplatser för buss 636 mot Östersjö brygga finns", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    note: 'Till 12 december 2026 går Waxholmsbolagets båt, linje 30, från Simpnäs brygga, och dit går buss 636 från Norrtälje busstation. Från 13 december 2026 till 11 april 2027 går linje 30 från Simpnäs när det är isfritt och från Östersjö till Granö på Arholma under isperioden. Buss 636 från Norrtälje busstation går till både Simpnäs brygga och Östersjö brygga.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 3014 och 3078 (B) i 30B, 3013 och 3077 (B) i 30A, 3001 och 3002 (C).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "30A SIMPNÄS – ARHOLMA", "Arholma", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Arholma: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 3 (2026-11-28, f300a-R302): "samma dag" struket; tabellerna säger bara "dock senast kl. 17.00." (anmärkning b och B).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h30.pdf — "avgång från aktuell brygga, dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w30.pdf — "avgång från aktuell brygga, dock senast kl." (läst 2026-11-28)
    bestallning: 'Några turer till och från Arholma går bara om resan har beställts i förväg. Den ska beställas minst två timmar före avgång från bryggan, dock senast kl. 17.00 (anmärkning B), eller senast kl. 19.00 dagen före resdagen (anmärkning C). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 30 i god tid innan du åker.',
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen; c senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0074): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Fejan", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w31.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Fejan", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Fejan kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 31) och med anmärkning B minst två timmar före (tabell 31), i båda fallen senast kl. 17.00. Med anmärkning C eller c ska den beställas senast kl. 19.00 dagen före resdagen (tabell 31). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 31). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 31 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 31',
  },
  furusund: {
    destStopId: '740025063', destStopName: 'Furusund brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0078–0066): buss 626 går Danderyds sjukhus–Ljusterö och inte från Norrtälje till Furusund. "Knutpunkten" var obelagt.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h626.pdf — "626 Danderyds sjukhus–Ljusterö", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h634.pdf — "634 Norrtälje–Blidö", "NORRTÄLJE BUSSTATION", "Furusunds färjeläge", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h25.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "25A FURUSUND – HÖGMARSÖ – SOLÖ" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA" (läst 2026-11-28)
    // Rättelse P0 28 (2026-11-28, k37 och k38): noten gäller också från 13 december 2026.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v634.pdf — "634 Norrtälje–Blidö", "NORRTÄLJE BUSSTATION", "Furusunds färjeläge", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w25.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "25A FURUSUND – HÖGMARSÖ – HEMMARÖ (SÖDERÄNG)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA" (läst 2026-11-28)
    note: 'Buss 634 från Norrtälje busstation går via Furusund. Härifrån går Waxholmsbolagets båtar i tabell 25 och 28.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2868, 2820 och 2882 (B) i 28B, 2501 och 2502 (B) i tabell 25; tabell 28 är avsnittet 1 oktober till 12 december i h28.pdf.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h25.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "25A FURUSUND – HÖGMARSÖ – SOLÖ", "Furusund", "Beställ resan i SL-appen, på", "minst 2 timmar innan" (vid Furusund: B (turen går bara efter beställning)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Furusund", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Furusund: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h25.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0081): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h25.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Furusund", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026", "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "Furusund", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w25.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Furusund", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Furusund", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period" (läst 2026-11-28)
    bestallning: 'Turer till och från Furusund kan gå bara om resan har beställts i förväg. Med anmärkning B ska den beställas minst två timmar före avgång från bryggan, dock senast kl. 17.00 (tabell 25 och 28). Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 28 till 12 december 2026 och tabell 25 och 28 från 13 december 2026). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 28). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 25 eller 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 25 eller 28',
  },
  norrora: {
    destStopId: '740034551', destStopName: 'Norröra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, f300a-0085): "Saltkråkan-ön" var obelagt och är struket.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Norröra" (läst 2026-11-28)
    note: 'Waxholmsbolagets båt från Furusund, tabell 28.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): turer 2868 och 2820 (B) i 28B; B, b eller C på 11 av 14 turer i 28A och 6 av 17 i 28B (avsnittet 1 oktober till 12 december).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Norröra", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Norröra: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0087): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026", "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "Norröra", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norröra", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period" (läst 2026-11-28)
    bestallning: 'Turer till och från Norröra kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 28) och med anmärkning B minst två timmar före (tabell 28), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 28). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 28). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 28',
  },
  rodloga: {
    destStopId: '740024879', destStopName: 'Rödlöga brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, f300a-0091): "Yttersta ytterskärgården" var obelagt, och båten i 28A angör flera bryggor före Rödlöga, så den är ingen direktbåt.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Rödlöga" (läst 2026-11-28)
    note: 'Waxholmsbolagets båt från Furusund, tabell 28.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): i 28B har 2822, 2852 och 2892 (Y, från 2 november) b; 2872 (S, till 1 november) saknar b; inga turer dit har b (rättat efter Kontrollanten, k080).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Rödlöga", "Beställ resan i SL-appen, på", "Går under perioden 1 oktober - 1 november.", "Går under perioden 2 november - 12", "minst 1 timme innan avgång" (vid Rödlöga: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0285): "alla turer från Rödlöga" gällde bara 2 november till 12 december; i vintertabellen 28 har en del turer b och några h (MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "28B RÖDLÖGA – SÖDERÖRA – ÖSTERNÄS – FURUSUND", "Rödlöga", "Vid kraftig isläggning kan trafiken till och från bryggan komma att ställas in." (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0285): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026", "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "Rödlöga", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Rödlöga", "minst 1 timme innan avgång", "minst 2 timmar innan", "Går under isfri period", "isläggning" (läst 2026-11-28)
    bestallning: 'Turer till och från Rödlöga kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 28) och med anmärkning B minst två timmar före (tabell 28 från 13 december 2026), i båda fallen senast kl. 17.00. Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 28). Vid kraftig isläggning kan trafiken till och från bryggan ställas in (anmärkning h, tabell 28 från 13 december 2026). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 28',
  },
  yxlan: {
    destStopId: '740025023', destStopName: 'Yxlan Vagnsunda brygga',
    // P0 29 (2026-11-28, Redaktörens tillägg, f300a-0096): Vagnsunda står bara i tabell 24, som gällde till 1 november 2026. Ingen av Waxholmsbolagets tabeller h2 till h31 och w2 till w31 har Vagnsunda
    // för perioderna till 12 december 2026 och från 13 december 2026 (MÄTT 2026-11-28; w24 gäller 2024). Rutorna visade ändå reseplanerarens tider dit. Hållplats-id för Köpmanholm är inte uppmätt, så destStopId står kvar och rutorna visar texten.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h24.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026", "24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET", "Vagnsunda (Yxlan)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Köpmanholm (Yxlan)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA", "Köpmanholm (Yxlan)" (Vagnsunda finns inte i tabellen) (läst 2026-11-28)
    stangd: 'Waxholmsbolaget angör inte Vagnsunda på Yxlan nu. Tabell 24, som hade Vagnsunda, gällde till 1 november 2026, och ingen tabell till 12 december 2026 eller från 13 december 2026 har bryggan. Waxholmsbolagets tabell 28 angör Köpmanholm på Yxlan i båda perioderna.',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0096): Vagnsunda finns bara i tabell 24, som gällde till 1 november 2026; ingen av tabellerna 2 till 31 för perioderna till 12 december 2026 och från 13 december 2026 har Vagnsunda (MÄTT). Rutan är en P0-kandidat, se runda2-till-p0.md.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h24.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026", "Vagnsunda (Yxlan)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026", "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "Köpmanholm (Yxlan)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "utan fast avgångstid.", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Köpmanholm (Yxlan)", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period" (läst 2026-11-28)
    note: 'Waxholmsbolagets tabell 24, som angör Vagnsunda på Yxlan, gällde till 1 november 2026. Tabell 28 angör Köpmanholm på Yxlan, både till 12 december 2026 och från 13 december 2026. Där har en del turer anmärkning b, B eller C, och till 12 december 2026 angörs Köpmanholm på en del turer utan fast avgångstid (X). Från 13 december 2026 går turer med anmärkning H bara under isfri period. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28.',
  },

  // ── Mellersta skärgården (Stavsnäs/Boda) ─────────────────────────────
  gallno: {
    destStopId: '740024302', destStopName: 'Gällnö brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0099): noten sa "Båt från Stavsnäs vinterhamn". Gällnö står i tabell 11 och 14, och ingen av dem har Stavsnäs.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", "11B SOLLENKROKA – BODA – GRINDA – VAXHOLM – STOCKHOLM", "Strömkajen (Stockholm)", "Boda brygga avg.", "Gällnö" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "Gällnö" (läst 2026-11-28)
    // Rättelse P0 28 (2026-11-28, k33): tabell 14 för 13 december 2026 till 11 april 2027 har inte Gällnö; tabell 11 har det i båda perioderna.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w11.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "11A STOCKHOLM – VAXHOLM – BODA – SOLLENKROKA", "Strömkajen (Stockholm)", "Boda brygga avg.", "Gällnö", "Sollenkroka" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w14.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA" (Gällnö finns inte i tabellen) (läst 2026-11-28)
    note: 'Waxholmsbolagets båtar till Gällnö går från Strömkajen via Vaxholm, från Boda brygga och från Sollenkroka. Till 12 december 2026 står de i tabell 11 och 14, och från 13 december 2026 till 11 april 2027 i tabell 11.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 12 av 35 turer i 11A, 3 av 33 i 11B, 1 av 6 i 14A.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", "Gällnö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Gällnö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "Gällnö", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Gällnö: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan avgång", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0100): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gällnö", "Gällnönäs (Gällnö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // Runda 3 (2026-11-28, f300a-0100): anmärkning b vid Gällnö finns också i tabell 11 till 12 december 2026 (läst som bild, siffrorna i tabellens typsnitt är kodade).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h14.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gällnö", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w11.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gällnö", "Gällnönäs (Gällnö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period för linje 14.", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Gällnö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 11 och 14 till 12 december 2026 och tabell 11 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 11), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 11). Från 13 december 2026 går turer med anmärkning H bara under isfri period för linje 14 (tabell 11). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 11 eller 14 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 11 eller 14',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R204): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w11.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gällnö", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Gällnö (tabell 11 från 13 december 2026) på en del turer utan fast avgångstid (anmärkning X). Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  ljustero: {
    destStopId: '740020573', destStopName: 'Åsättra (Ljusterö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    note: 'Bilfärja från Östanå, buss 626 + bilfärja Östanå till Ljusterö.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1011 (B), 1001, 1021, 1002, 1042, 1020 (C).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Åsättra brygga", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "resdag." (vid Åsättra brygga: B (turen går bara efter beställning), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0106): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h8.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Grundvik (Ljusterö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h9.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Laggarsvik (Ljusterö)", "Linanäs (Ljusterö)", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Åsättra brygga", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Hummelmora (Ljusterö)", "Staveström (Ljusterö)", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w8.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Grundvik (Ljusterö)", "isläggning" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w9.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Linanäs (Ljusterö)", "Öran (Ljusterö)", "minst 1 timme innan avgång", "isläggning", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Åsättra brygga", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w12.pdf — "GÄLLER 13/12 – 6/1 OCH 25/3 – 11/4 SAMT ISFRI PERIOD 7/1 – 24/3", "Hummelmora (Ljusterö)", "Staveström (Ljusterö)", "minst 1 timme innan avgång", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Ljusterö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 8, 9 och 12 till 12 december 2026 och tabell 9 och 12 från 13 december 2026) och med anmärkning B minst två timmar före (tabell 8 och 10 till 12 december 2026 och tabell 10 från 13 december 2026), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 10 till 12 december 2026 och tabell 10 och 12 från 13 december 2026). Under isperiod gäller de turer som tabell 10 och 12 har för isperioden. Vid kraftig isläggning trafikeras en del bryggor inte (anmärkning h, tabell 8 och 9 från 13 december 2026). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 8, 9, 10 eller 12 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0107): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 8, 9, 10 eller 12',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R205): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h9.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Öran (Ljusterö)", "Laggarsvik (Ljusterö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Stensvik (Ljusterö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w9.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Öran (Ljusterö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w12.pdf — "GÄLLER 13/12 – 6/1 OCH 25/3 – 11/4 SAMT ISFRI PERIOD 7/1 – 24/3", "Stensvik (Ljusterö)", "Hummelmora (Ljusterö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Stensvik (tabell 12), Öran (tabell 9), Laggarsvik och Skuggan (tabell 9 till 12 december 2026) samt Hummelmora (tabell 12 från 13 december 2026) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },
  runmaro: {
    destStopId: '740023240', destStopName: 'Långvik (Runmarö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0110): "Stavsnäs vinterhamn" står inte i Waxholmsbolagets tabeller; de skriver Stavsnäs.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Långvik (Runmarö)", "Stavsnäs" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h23.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Långvik (Runmarö)", "Stavsnäs" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w16.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Långvik (Runmarö)", "Stavsnäs" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w23.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Långvik (Runmarö)", "Stavsnäs" (läst 2026-11-28)
    note: 'Waxholmsbolagets båtar från Stavsnäs, tabell 16 och 23.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1612 (B) i 16B och 23B, 1613 och 1665 (b) i 16A.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16A STAVSNÄS – SANDHAMN – HAGEDE", "Långvik (Runmarö)", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång" (vid Långvik (Runmarö): B (turen går bara efter beställning), b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h23.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "23B RUNMARÖ – STAVSNÄS", "Långvik (Runmarö)", "Beställ resan i SL-appen, på", "minst 2 timmar innan" (vid Långvik (Runmarö): B (turen går bara efter beställning)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h23.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0111): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gatan (Runmarö)", "Långvik (Runmarö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h17.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Styrsvik (Runmarö)", "minst 1 timme innan avgång", "senast kl. 19.00 dag före" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h23.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gatan (Runmarö)", "Långvik (Runmarö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w16.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gatan (Runmarö)", "Långvik (Runmarö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w17.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Styrsvik (Runmarö)", "minst 1 timme innan avgång", "senast kl. 19.00 dag före" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w23.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gatan (Runmarö)", "Långvik (Runmarö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Runmarö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 16, 17 och 23) och med anmärkning B minst två timmar före (tabell 16 och 23), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 17). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 16, 17 eller 23 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0112): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 16, 17 eller 23',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R208): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gatan (Runmarö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h23.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Gatan (Runmarö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w16.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gatan (Runmarö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w23.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gatan (Runmarö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Gatan (tabell 16 och 23) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },
  svartso: {
    destStopId: '740024872', destStopName: 'Svartsö Norra brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0115): noten sa "Båt från Stavsnäs vinterhamn". Norra Svartsö står i tabell 10, 12 och 13, och ingen av dem har Stavsnäs.
    // P0 29 (2026-11-28, Kontrollanten k02, k04, k05): resvägen skrivs som tabellerna. Till 12 december går tabell 12 utan byte från Strömkajen via Vaxholm (tur 1201, 1223, 1227 i 12A, MÄTT).
    // I h13 står Norra Svartsö bara i 13B; tur 1202 (H) gick till Stockholm bara till 13 september, 1346 (I) till 18 juni, och 1010 slutar vid Norra Svartsö (MÄTT med pdftotext -bbox).
    // I w12 slutar Strömkajens turer (1421, 1323, 1351, 1371) i Lillsved; Norra Svartsö har tider på turer från Vaxholm (1201) och från Lillsved (1221, 1251, 1261, 1263, 1281, 1271).
    // Mot Stockholm: 1152 från Lillsved, eller 1376 till Vaxholm och 0476 därifrån. U-turerna vid Norra Svartsö (1261, 1263, 1281, 1260, 1262, 1280, 1282) har alla C (MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Strömkajen (Stockholm)", "Norra Svartsö" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "13B HUSARÖ – SÖDRA INGMARSÖ – BODA – VAXHOLM – STOCKHOLM", "Norra Svartsö", "Går under perioderna 2 april - 18 juni och 17 augusti - 13 september.", "Går under perioden 2 april - 18 juni." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Åsättra brygga", "Norra Svartsö" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "GÄLLER ISFRI PERIOD", "10C ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ", "GÄLLER ISPERIOD (VID LÄTTARE IS)", "10E ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ", "GÄLLER ISPERIOD (VID KRAFTIG IS)", "Åsättra brygga", "Norra Svartsö" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w12.pdf — "12A STOCKHOLM – LILLSVED – NORRA INGMARSÖ", "12B NORRA INGMARSÖ – LILLSVED – STOCKHOLM", "GÄLLER 13/12 – 6/1 OCH 25/3 – 11/4 SAMT ISFRI PERIOD 7/1 – 24/3", "Strömkajen (Stockholm)", "Lillsved ank.", "Lillsved avg.", "Norra Svartsö", "Beställ resan i SL-appen, på", "Waxholmsbolagets webb eller via kundtjänst", "08-600 10 00 senast kl. 19.00 dag före", "resdag.", "Går under isfri period 7 januari - 24 mars.", "12C ÅSÄTTRA – ÖRSÖ", "GÄLLER ISPERIOD 7 JANUARI – 24 MARS" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ" (Norra Svartsö finns inte i tabellen) (läst 2026-11-28)
    note: 'Waxholmsbolagets båtar till Norra Svartsö går från Åsättra brygga (tabell 10) och från Strömkajen (tabell 12). Till 12 december 2026 går båtarna i tabell 12 från Strömkajen via Vaxholm till Norra Svartsö. I tabell 13 till 12 december 2026 står Norra Svartsö bara på turer mot Stockholm (13B), men efter 13 september 2026 går ingen av dem vidare från Norra Svartsö till Stockholm. Från 13 december 2026 till 11 april 2027 går ingen båt i tabell 12 hela vägen mellan Strömkajen och Norra Svartsö: du byter båt i Lillsved, mot Stockholm på en del turer också i Vaxholm. Turerna till och från Norra Svartsö i tabell 12 under isfri period 7 januari till 24 mars har anmärkning C: Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 senast kl. 19.00 dag före resdag. Under isperiod 7 januari till 24 mars har tabell 12 inte Norra Svartsö, men tabell 10 från Åsättra har det också under isperioden. Tabell 13 för 13 december 2026 till 11 april 2027 har inte Norra Svartsö.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 19 av 19 turer i 10B, 14 av 18 i 10A (1073 och 1075 utan anmärkning) och 4 av 14 i 12A; inga i 12B och 13B (rättat efter Kontrollanten, k059).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Svartsö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Norra Svartsö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Svartsö", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Norra Svartsö: b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0116): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h10.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Norra Svartsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Svartsö", "minst 1 timme innan avgång", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Alsvik (Svartsö)", "Norra Svartsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Svartsö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "10E ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ", "10F HUSARÖ – NORRA INGMARSÖ – ÅSÄTTRA", "GÄLLER ISPERIOD (VID KRAFTIG IS)", "Norra Svartsö", "utan fast avgångstid.", "Avgången utförs av svävare. Beställ hos", "Svisch Air på telefon", "kl. 19.00 dag före resdag." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w12.pdf — "GÄLLER 13/12 – 6/1 OCH 25/3 – 11/4 SAMT ISFRI PERIOD 7/1 – 24/3", "Norra Svartsö", "minst 1 timme innan avgång", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Alsvik (Svartsö)", "Skälvik (Svartsö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "Går under isperiod.", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Svartsö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 10, 12 och 13) och med anmärkning B minst två timmar före (tabell 10 och 13), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 10 och 13 till 12 december 2026 och tabell 10, 12 och 13 från 13 december 2026). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 13). Under isperiod gäller de turer som tabell 10 har för isperioden och, från 13 december 2026, turerna med anmärkning I i tabell 13. Från 13 december 2026 angör turerna i tabell 10 för isperiod vid kraftig is (10E och 10F) Norra Svartsö utan fast avgångstid och utförs av svävare (anmärkning K). De beställs hos Svisch Air per telefon senast kl. 19.00 dagen före resdagen. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 10, 12 eller 13 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0117): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 10, 12 eller 13',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0284): i vintertabellen 10 är Norra Svartsö märkt X på alla turer i isperioden vid kraftig is (MÄTT med skript/sektion.py, sidorna 5 och 6).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "GÄLLER ISPERIOD (VID KRAFTIG IS)", "Norra Svartsö", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-28)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0284): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Söderboudd (Svartsö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w10.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Svartsö", "utan fast avgångstid.", "ISPERIOD" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w13.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Söderboudd (Svartsö)", "Skälvik (Svartsö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Söderboudd (tabell 13), Norra Svartsö (tabell 10 från 13 december 2026 vid kraftig is) samt Alsvik och Skälvik (tabell 13 från 13 december 2026) på en del turer utan fast avgångstid (anmärkning X). Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
  },
  resaro: {
    destStopId: '740034517', destStopName: 'Ytterby (Resarö) brygga',
    originStopId: STROMKAJEN_ID, originStopName: 'Stockholm Strömkajen',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0120–0100): buss 689 går Höganäs brygga/Norra Tynningö–Östra Tynningö, inte till Resarö, och bilbron var obelagd. Noten säger nu hur båten till bryggan i rutan går.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h689.pdf — "689 Höganäs brygga/Norra Tynningö–Östra Tynningö (–Gustavsbergs centrum)", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG", "Strömkajen (Stockholm)", "Ytterby (Resarö)" (läst 2026-11-28)
    // Rättelse P0 28 (2026-11-28, k35): tabell 5 för 13 december 2026 till 11 april 2027 har inte Ytterby.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w5.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG", "5B VIKINGSBORG – STEGESUND – VAXHOLM – STOCKHOLM" (varken Ytterby eller Resarö finns i tabellen) (läst 2026-11-28)
    note: 'Till 12 december 2026 går Waxholmsbolagets linje 5 från Strömkajen via Vaxholm till Ytterby på Resarö. I tabell 5 för 13 december 2026 till 11 april 2027 finns inte Ytterby.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 19 av 27 turer i 5A och 13 av 34 i 5B har b.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG", "Ytterby (Resarö)", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång" (vid Ytterby (Resarö): b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Rättelse P0 28 (2026-11-28, k35): från 13 december 2026 finns Ytterby inte i tabell 5; KÄLLA w5.pdf vid noten ovan.
    // Faktagranskning fas 3, runda 3 (2026-11-28, f300a-R303): "samma dag" struket; tabellerna säger bara "dock senast kl. 17.00." (anmärkning b och B).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    bestallning: 'Till 12 december 2026 stannar många turer till och från Ytterby på Resarö där bara om resan har beställts i förväg. Den ska beställas minst en timme före avgång från bryggan, dock senast kl. 17.00. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 5 i god tid innan du åker. I tabell 5 för 13 december 2026 till 11 april 2027 finns inte Ytterby.',
    bestallningTabell: 'Waxholmsbolagets tabell 5',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0125): Ytterby är märkt X på de flesta turer i tabell 5 (MÄTT med skript/scan.py), men rutorna visade reseplanerarens tider som tidtabellens.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h5.pdf — "Ytterby (Resarö)", "X", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w5.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG" (Ytterby finns inte i tabellen) (läst 2026-11-28)
    tidsObs: 'Till 12 december 2026 angör Waxholmsbolaget Ytterby på Resarö på flera turer utan fast avgångstid. Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid. I tabell 5 för 13 december 2026 till 11 april 2027 finns inte Ytterby.',
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h29.pdf — "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00." (anmärkning B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0129): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h29.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Landsort", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w29.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Landsort", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Landsort kan gå bara om resan har beställts i förväg. Med anmärkning B ska den beställas minst två timmar före avgång från bryggan, dock senast kl. 17.00 (tabell 29). Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 29 från 13 december 2026). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 29 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 29',
  },
  nattaro: {
    destStopId: '740024875', destStopName: 'Nåttarö brygga',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    // Faktagranskning fas 3, runda 4 (2026-11-28, f300a-0133, a-r3-k046): pendeltågsledet belagt med SL:s tabell för linje 43 i båda perioderna.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h4343x.pdf — "Bålsta–Nynäshamn", "Pendeltåg", "Giltig från och med 17 augusti till och med 12 december 2026." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v4343x.pdf — "Bålsta–Nynäshamn", "Pendeltåg", "Giltig från och med 13 december 2026 till och med 20 juni 2027." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h22.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w22.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ" (läst 2026-11-28)
    note: 'Pendeltåg till Nynäshamn + Waxholmsbolaget därifrån.',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0287): i vintertabellen 22 har Nåttarö anmärkning b på alla turer i 22A och en del i 22B (MÄTT); tabellen till 12 december har ingen.
    // Andra rättelsen P0 28 (2026-11-28, k40): bestallningTabell är borttagen för Nåttarö. Rutornas allmänna text om beställningsturer visades alla datum, men i tabell 22 till 12 december 2026 har ingen tur och ingen brygga anmärkning om beställning ("Beställ" finns inte i h22, MÄTT).
    // I w22 har alla turer i 22A anmärkning b vid Nåttarö (en timme). I 22B har åtta av tolv turer turanmärkning B (två timmar) och de fyra övriga anmärkning b vid Nåttarö (MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h22.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ", "22B ÅLÖ – NÅTTARÖ – NYNÄSHAMN", "Nåttarö" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w22.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ", "22B ÅLÖ – NÅTTARÖ – NYNÄSHAMN", "Nåttarö", "ANMÄRKNING TUR", "B Beställ resan i SL-appen, på", "08-600 10 00 minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "ANMÄRKNING BRYGGA", "b Beställ resan i SL-appen, på", "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    // P0 29 (2026-11-28, Kontrollanten k23): "samma dag" står inte i w22 och är struket; anmärkningarna b och B står som i tabellen (klockslag i beställningsregler enligt Redaktörens beslut P0 27).
    bestallning: 'Till 12 december 2026 har ingen tur i Waxholmsbolagets tabell 22 någon anmärkning om beställning vid Nåttarö. Från 13 december 2026 till 11 april 2027 har alla turer mot Ålö anmärkning b vid Nåttarö: Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00. Mot Nynäshamn har åtta av tolv turer anmärkning B: Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 2 timmar innan avgång från aktuell brygga, dock senast kl. 17.00. De övriga fyra har anmärkning b vid Nåttarö. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 22 i god tid innan du åker.',
  },
  orno: {
    destStopId: '740034475', destStopName: 'Ornö Kyrka brygga',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ" (läst 2026-10-29)
    // P0 2026-10-29: avgångsrutan räknade från Nynäshamns färjeterminal. Ingen av Waxholmsbolagets tabeller för perioden har båt därifrån till Ornö.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0288): vintertabellen 19 angör inte Ornö kyrka, bryggan i rutan.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "19A DALARÖ – ORNÖ (ÖSTRA SIDAN) – MEFJÄRD", "Söderviken (Ornö)", "Ornöboda (Ornö)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w20.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "20A DALARÖ – ORNÖ (VÄSTRA SIDAN)" (läst 2026-11-28)
    note: 'Bilfärja från Dalarö, pendeltåg till Handen + buss 839 + färja. Waxholmsbolagets tabell 19 från 13 december 2026 angör inte Ornö kyrka utan Söderviken och Ornöboda; tabell 20 går till Ornös västra sida.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): 7 av 9 turer i 19A och 9 av 13 i 19B har b eller B.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Ornö Kyrka", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång" (vid Ornö Kyrka: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan avgång" (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0138): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Ornö Kyrka", "Ornöboda (Ornö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h20.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Björkösund (Ornö)", "Hässelmara (Ornö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Ornöboda (Ornö)", "Söderviken (Ornö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w20.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Björkösund (Ornö)", "Hässelmara (Ornö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "isläggning", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Ornö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 19 och 20) och med anmärkning B minst två timmar före (tabell 19 och 20), i båda fallen senast kl. 17.00. Med anmärkning C eller c ska den beställas senast kl. 19.00 dagen före resdagen (tabell 19 och 20). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 19 och 20). Vid isläggning kan trafiken till och från en del bryggor ställas in (anmärkning h, tabell 20 från 13 december 2026). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 eller 20 i god tid innan du åker.',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0139): tabellerna med beställningsturer vid öns bryggor; KÄLLA-raderna står vid bestallning.
    bestallningTabell: 'Waxholmsbolagets tabell 19 eller 20',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R207): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Ornöboda (Ornö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Ornöboda (Ornö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Ornöboda (tabell 19) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },
  kymmendo: {
    destStopId: '740018277', destStopName: 'Kymmendö brygga',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Kymmendö", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s40.pdf — "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026", "40B NORDSYDLINJEN: NYNÄSHAMN – SANDHAMN – ARHOLMA / NORRTÄLJE", "Kymmendö" (läst 2026-10-29)
    // P0 2026-10-29: noten sa "från Dalarö eller Nynäshamn" utan säsong. Från Nynäshamn går båten bara sommartid.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0289): vintertabellen 19 går Dalarö–Ornö–Mefjärd, utan turer från Strömkajen.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Strömkajen (Stockholm)", "Kymmendö" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "19A DALARÖ – ORNÖ (ÖSTRA SIDAN) – MEFJÄRD", "Kymmendö" (läst 2026-11-28)
    note: 'Waxholmsbolagets linje 19 från Dalarö; tabellen till 12 december 2026 har också enstaka turer från Strömkajen, tabellen från 13 december 2026 inte. Sommartid går också Nordsydlinjen från Nynäshamn (2026: 22 juni till 16 augusti).',
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan avgång", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0144): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Kymmendö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Kymmendö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Kymmendö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 19) och med anmärkning B minst två timmar före (tabell 19), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 19). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 19). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 i god tid innan du åker.',
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h17.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0149): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h17.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Bunkvik (Nämdö)", "Kalkberget (Nämdö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w17.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Bunkvik (Nämdö)", "Nämdöböte (Nämdö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "isläggning", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Nämdö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 17) och med anmärkning B minst två timmar före (tabell 17), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 17). Vid kraftig isläggning kan trafiken till och från en del bryggor ställas in (anmärkning h, tabell 17 från 13 december 2026). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 17 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 17',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-R206): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h17.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Kalkberget (Nämdö)", "Västanvik (Nämdö)", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w17.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Västanvik (Nämdö)", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Kalkberget och Sand (tabell 17 till 12 december 2026) samt Västanvik (tabell 17) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },
  singo: {
    // 315 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740068074', destStopName: 'Åmyran',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0154): "Singö nås över bro, ingen båt behövs" hade ingen källa och är struket; linjen och hållplatsen är belagda.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h637.pdf — "Norrtälje–Singö", "Åmyran", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v637.pdf — "Norrtälje–Singö", "Åmyran", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    note: 'Buss till Norrtälje och vidare med buss 637 från Norrtälje till Åmyran.',
  },
  lido: {
    // 160 min, 3 byten, uppmätt 2026-08-05
    destStopId: '740034559', destStopName: 'Lidö brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss till Räfsnäs brygga via Norrtälje, sedan kort båttur över till Lidö.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): alla 7 turer med tid vid Lidö i 31A har b; i 31B tur 3110 (B), 3150 och 3170 (C), 3106 och 3112 (b), men 3152 och 3182 stannar utan anmärkning (rättat efter Kontrollanten, k044).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "31A RÄFSNÄS – TJOCKÖ – FEJAN", "Lidö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Lidö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0159): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h31.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Lidö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w31.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Lidö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Lidö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 31) och med anmärkning B minst två timmar före (tabell 31), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 31). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 31). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 31 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 31',
  },
  graddo: {
    // 117 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740067876', destStopName: 'Gräddö torg',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0163, f300a-0164): "Gräddö ligger på fastlandet, härifrån går båtarna vidare ut i Rådmansöskärgården" hade ingen källa och är struket.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h631.pdf — "Norrtälje–Rådmansö–Norrtälje", "Gräddö torg", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v631.pdf — "Norrtälje–Rådmansö–Norrtälje", "Gräddö torg", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    note: 'Buss via Norrtälje: buss 631 från Norrtälje stannar vid Gräddö torg.',
  },
  vaddo: {
    // 140 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740068043', destStopName: 'Edeby torg',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0167, f300a-0168): "Väddö nås över bro" hade ingen källa och är struket.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h637.pdf — "Norrtälje–Singö", "Edeby torg", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v637.pdf — "Norrtälje–Singö", "Edeby torg", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    note: 'Buss till Norrtälje och vidare med buss 637 från Norrtälje till Edeby torg.',
  },
  toro: {
    // 42 min, 0 byten, uppmätt 2026-08-05
    destStopId: '740069724', destStopName: 'Eneby affär',
    originStopId: NYNASHAMN_ID, originStopName: 'Nynäshamn färjeterminal',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0171, f300a-0172): "Torö nås över bro" hade ingen källa och är struket.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h852.pdf — "Nynäshamns station–Torö", "Eneby affär", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/v852.pdf — "Nynäshamns station–Torö", "Eneby affär", "Giltig 13 december 2026–20 juni 2027" (läst 2026-11-28)
    note: 'Buss 852 från Nynäshamns station stannar vid Eneby affär.',
  },
  fjardlang: {
    // 118 min, 0 byten, uppmätt 2026-08-05 · ren båtresa (sommartid, Nordsydlinjen)
    destStopId: '740020696', destStopName: 'Fjärdlång brygga',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Fjärdlång", "Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst" (läst 2026-10-29)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/s40.pdf — "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026", "40B NORDSYDLINJEN: NYNÄSHAMN – SANDHAMN – ARHOLMA / NORRTÄLJE", "Fjärdlång" (läst 2026-10-29)
    // P0 2026-10-29: noten sa "Direkt Waxholmsbåt från Nynäshamn" utan säsong. Den båten går bara sommartid.
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0290): vintertabellen 19 har inte Fjärdlång och inga turer från Strömkajen.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Strömkajen (Stockholm)", "Fjärdlång" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w19.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "19A DALARÖ – ORNÖ (ÖSTRA SIDAN) – MEFJÄRD" (läst 2026-11-28)
    note: 'Waxholmsbolagets linje 19 från Dalarö; tabellen till 12 december 2026 har också enstaka turer från Strömkajen. Tabellen från 13 december 2026 angör inte Fjärdlång. Sommartid går också Nordsydlinjen från Nynäshamn (2026: 22 juni till 16 augusti).',
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan avgång" (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0293): vintertabellen 19 angör inte Fjärdlång, så texten gäller nu bara turer som angör bryggan.
    // Faktagranskning fas 3, runda 3 (2026-11-28, f300a-R304): "samma dag" struket; tabellerna säger bara "dock senast kl. 17.00." (anmärkning b och B).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    bestallning: 'När Waxholmsbolagets tabell 19 angör Fjärdlång stannar de flesta turer där bara om resan har beställts i förväg, och någon tur går bara efter beställning. Beställ minst en timme (anmärkning b) eller två timmar (anmärkning B) före avgång från bryggan, dock senast kl. 17.00. Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 19 i god tid innan du åker.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h19.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ", "Fjärdlång", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 19',
  },
  rindo: {
    // 88 min, 3 byten, uppmätt 2026-08-05
    // Faktagranskning fas 3, runda 4 (2026-11-28, f300a-0180, a-r3-k026): "Rindö centrum" är ingen brygga, och namnet och att hållplatsen trafikeras står inte i någon källa (Trafiklab kräver nyckel). Rutan visar öns namn tills Redaktören mätt destStopId. "går ofta" (värdeord, f300a-0182) ersatt med Trafikverkets överfartstid.
    destStopId: '740045830', destStopName: 'Rindö',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h670670x.pdf — "670 Stockholm–Vaxholm", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/ — "Vaxholmsleden går mellan Vaxholm och Rindö i Stockholms skärgård.", "överfartstiden är sex minuter", "Resan med vägfärjan är avgiftsfri." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h3.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "3A STOCKHOLM – VAXHOLM – NORRA LAGNÖ – ÅLSTÄKET", "Grenadjärbryggan (Rindö)" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Grenadjärbryggan (Rindö)", "Rindö västra", "Rindöbaden (Rindö)", "Vegabryggan (Rindö)", "utan fast avgångstid.", "minst 1 timme innan avgång" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w4.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Grenadjärbryggan (Rindö)", "Rindö västra", "Rindöbaden (Rindö)", "Vegabryggan (Rindö)", "utan fast avgångstid.", "minst 1 timme innan avgång" (läst 2026-11-28)
    note: 'Buss till Vaxholm och Trafikverkets vägfärja Vaxholmsleden över till Rindö. Överfarten tar sex minuter och är avgiftsfri. Waxholmsbolagets båtar i tabell 4 angör Grenadjärbryggan, Rindö västra, Rindöbaden och Vegabryggan, och till 12 december 2026 angör tabell 3 Grenadjärbryggan. Vid en del turer har bryggorna ingen fast avgångstid (X) eller kräver beställning (b); se anmärkningen för din tur i tabellen.',
  },
  vindo: {
    // 82 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740066446', destStopName: 'Fjällsvik',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0185): "ända fram" och "Vindö nås över broar via Värmdö" hade ingen källa och är strukna. Ingen tabell 434 för tiden efter 12 december 2026 (MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h434.pdf — "Slussen–Överby", "Fjällsvik", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    note: 'Buss 434 från Slussen stannar vid Fjällsvik enligt SL:s tabell till 12 december 2026.',
  },
  smadalaro: {
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
  adelso: {
    // 108 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740070750', destStopName: 'Lilla Stenby Norrängsvägen',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    note: 'Buss från Brommaplan via Munsö. Vägfärjan över till Adelsö ingår i resan.',
  },
  ingaro: {
    // 54 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740066377', destStopName: 'Södra Evlinge',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0193): "Ingarö nås över bro" hade ingen källa och är struket.
    note: 'Buss från Slussen, knappt en timme.',
  },
  ekno: {
    // 185 min, 3 byten, uppmätt 2026-08-05
    destStopId: '740034482', destStopName: 'Eknö brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3 (2026-11-28, f300a-0205): båten angör Eknö före Sandhamn i 16A, inte via Sandhamn.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h433.pdf — "433 Slussen–Djurö", "Stavsnäs vinterhamn", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16A STAVSNÄS – SANDHAMN – HAGEDE", "Eknö" (läst 2026-11-28)
    note: 'Buss 433 från Slussen till Stavsnäs vinterhamn och Waxholmsbolagets båt, tabell 16. Lång resa. Planera dagen efter båten.',
    // P0 24 (2026-11-17, Redaktörens beslut): samma fel som på Sandhamn. Tabellen har
    // beställningsturer vid bryggan (MÄTT med p0-24/skript/tabell.py): tur 1612 (B) i 16B; 8 av 23 turer i 16A har b eller C.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "16A STAVSNÄS – SANDHAMN – HAGEDE", "Eknö", "Beställ resan i SL-appen, på", "minst 2 timmar innan", "minst 1 timme innan avgång", "resdag." (vid Eknö: B (turen går bara efter beställning), b (bryggan, beställ minst en timme före), C (turen, beställ dagen före)) (läst 2026-11-17)
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 3 (2026-11-28, f300a-R305): "samma dag" struket; tabellerna säger bara "dock senast kl. 17.00." (anmärkning b och B).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w16.pdf — "från aktuell brygga, dock senast kl. 17.00." (läst 2026-11-28)
    bestallning: 'En del turer till och från Eknö går eller stannar bara om resan har beställts i förväg. Den ska beställas minst en timme (anmärkning b) eller två timmar (anmärkning B) före avgång från bryggan, dock senast kl. 17.00, eller senast kl. 19.00 dagen före resdagen (anmärkning C). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 16 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 16',
    // Faktagranskning fas 3 (2026-11-28, P0, f300a-0209): Eknö är märkt X på de flesta turer i tabell 16 (MÄTT med skript/scan.py), men rutorna visade reseplanerarens tider som tidtabellens.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h16.pdf — "Eknö", "X", "Bryggorna trafikeras utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Eknö på de flesta turer utan fast avgångstid. Tiderna här kommer från reseplaneraren och inte från tidtabellen, så var på bryggan i god tid.',
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
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0212, f300a-0213, f300a-0214): "Styrsöbåt", "spårvagn 11 dit från Göteborg C" och "Brännö är bilfri" hade ingen källa och är strukna.
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5283__0__LINE__20260824__20261212__247f5756-c8cb-4894-9e61-df69039cf68b__0,0__.pdf — "Saltholmen–Asperö–Brännö Rödsten och omvänt", "Gäller 24 aug – 12 dec 2026" (läst 2026-11-28)
    // Runda 3 (2026-11-28, f300a-0214): "Brännö är bilfri" återställd med Göteborgs stads förstudie som källa.
    // KÄLLA: https://www4.goteborg.se/prod/intraservice/namndhandlingar/samrumportal.nsf/43772820603D9E81C125899800483B8E/$File/11%20B%20Forstudie_Sodra_skargarden.pdf — "Förstudie: Södra skärgården", "Styrsö, Donsö, Brännö, Asperö, Köpstadsö och Vrångö.", "öarna är bilfria och i övrigt i stort befriade från den" (läst 2026-11-28)
    note: 'Västtrafiks linje 283 går från Saltholmen till Brännö Rödsten. Brännö är bilfri.',
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
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0221, f300a-0222): "Styrsöbåt" och "Donsö och Styrsö binds ihop av en gångbro" hade ingen källa och är strukna.
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf — "Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö", "Gäller 24 aug – 12 dec 2026" (läst 2026-11-28)
    note: 'Västtrafiks linje 281 går från Saltholmen till Donsö.',
  },
  vrango: {
    // 35 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740001382', destStopName: 'Vrångö',
    originStopId: SALTHOLMEN_ID, originStopName: 'Göteborg Saltholmen',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0225, f300a-0226): "Styrsöbåt" och "ytterst i södra skärgården" hade ingen källa och är strukna.
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf — "Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö", "Gäller 24 aug – 12 dec 2026" (läst 2026-11-28)
    note: 'Västtrafiks linje 281 går från Saltholmen till Vrångö, linjens sista anhalt.',
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
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0231): "Styrsöbåt" stod inte i källan; restiden är uppmätt i tabellen (Saltholmen 05:20, Asperö Norra 05:34; Saltholmen 09:24, Asperö Norra 09:43).
    // Runda 3 (2026-11-28, f300a-0231): 51 turer Saltholmen–Asperö Norra, 40 direkt på 14 minuter och 11 via Asperö Östra på 18 till 20 minuter (MÄTT i tabellen).
    // KÄLLA: https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5283__0__LINE__20260824__20261212__247f5756-c8cb-4894-9e61-df69039cf68b__0,0__.pdf — "Saltholmen–Asperö–Brännö Rödsten och omvänt", "Asperö Östra", "Asperö Norra", "Gäller 24 aug – 12 dec 2026" (läst 2026-11-28)
    note: 'Västtrafiks linje 283 går från Saltholmen till Asperö Norra på 14 minuter direkt eller 18 till 20 minuter via Asperö Östra, enligt tidtabellen 24 augusti till 12 december 2026.',
  },
  tynningo: {
    // 128 min, 2 byten, uppmätt 2026-08-05
    destStopId: '740034529', destStopName: 'Orrlunda (Tynningö) brygga',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // P0 2026-11-07 (Kontrollanten, sb2-k004): vägfärjan går från Lagnö på Värmdö, inte från Bogesund.
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h670670x.pdf — "670  Stockholm–Vaxholm" (läst 2026-11-07)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Vaxholm avg.", "Norra Tynningö" (läst 2026-11-07)
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/ — "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård." (läst 2026-11-07)
    // Faktagranskning fas 3, vintertabellerna (2026-11-28, f300a-0291): vintertabellen 4 angör bara Norra Tynningö, inte Orrlunda (bryggan i rutan) eller Norehill.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w4.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Norra Tynningö" (läst 2026-11-28)
    note: 'Buss till Vaxholm och båt över. Tynningö har också vägfärja från Lagnö på Värmdö. Waxholmsbolagets tabell 4 från 13 december 2026 angör bara Norra Tynningö, inte Orrlunda och Norehill.',
    // Sista båten 2026-11-07 (Kontrollanten, sb-k005): kortet visade en tur från
    // Norehill, som i tabell 4 är märkt Xb (ingen fast tid, bara efter beställning).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "Norehill (Tynningö)", "Xb", "Orrlunda (Tynningö)", "Norra Tynningö", "Bryggorna trafikeras utan fast avgångstid.", "Beställ resan i SL-appen, på", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (anmärkningarna b och B) (läst 2026-11-07)
    // Kontrollanten (sb2-k002): sista turen från Norra Tynningö är en B-tur (minst två timmar).
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0236): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Höganäs (Tynningö)", "Norehill (Tynningö)", "minst 1 timme innan avgång", "minst 2 timmar innan", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w2.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Höganäs (Tynningö)", "Går under isfri period" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w4.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Tynningö", "minst 1 timme innan avgång", "minst 2 timmar innan", "Går under isfri period", "dock senast kl." (läst 2026-11-28)
    bestallning: 'Turer till och från Tynningö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 4) och med anmärkning B minst två timmar före (tabell 4), i båda fallen senast kl. 17.00. Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 2 och 4). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 4 i god tid innan du åker.',
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET", "Orrlunda (Tynningö)", "Beställ resan i SL-appen, på" (läst 2026-11-17)
    bestallningTabell: 'Waxholmsbolagets tabell 4',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0292): bryggorna med anmärkning X i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/xbryggor.py).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h4.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "Norehill (Tynningö)", "Norra Tynningö", "utan fast avgångstid." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w4.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Norra Tynningö", "utan fast avgångstid." (läst 2026-11-28)
    tidsObs: 'Waxholmsbolaget angör Norehill (tabell 4 till 12 december 2026) samt Norra Tynningö (tabell 4) på en del turer utan fast avgångstid (anmärkning X). Där kommer reseplanerarens tider inte från tidtabellen, så var på bryggan i god tid.',
  },
  djuro: {
    // 80 min, 1 byten, uppmätt 2026-08-05
    destStopId: '740066438', destStopName: 'Djurö skola',
    originStopId: CENTRALEN_ID, originStopName: 'Stockholm Centralstation',
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0197, f300a-0198): "Djurö nås över broar via Värmdö" hade ingen källa och är struket. SL har ingen tabell 433 eller 434 för tiden efter 12 december 2026 (v433.pdf och v434.pdf gäller till 12 december 2026, MÄTT).
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h433.pdf — "Slussen–Djurö", "Djurö skola", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/sl/h434.pdf — "Slussen–Överby", "Djurö skola", "Giltig 17 augusti–12 december 2026" (läst 2026-11-28)
    note: 'Buss 433 och 434 från Slussen stannar vid Djurö skola enligt SL:s tabeller till 12 december 2026.',
  },
  grasko: {
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
    // P0 27 (2026-11-19, Redaktörens beslut): fristen skrivs med tabellens klockslag; "senast på eftermiddagen" lät en beställning kl. 17.30 se giltig ut.
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "minst 1 timme innan avgång", "från aktuell brygga, dock senast kl. 17.00.", "minst 2 timmar innan", "avgång från aktuell brygga, dock senast kl.", "17.00.", "senast kl. 19.00 dag före", "resdag." (anmärkning b minst en timme före avgång, dock senast kl. 17.00; B minst två timmar före avgång, dock senast kl. 17.00; C senast kl. 19.00 dagen före resdagen) (läst 2026-11-19)
    // Faktagranskning fas 3, runda 2 (2026-11-28, f300a-0242): genomgång av beställningsreglerna vid öns bryggor i tabellerna till 12 december 2026 och från 13 december 2026 (MÄTT med runda2a/skript/genomgang.py, kolumnerna lästa med pdftotext -bbox).
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026", "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "Gräskö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "dock senast kl." (läst 2026-11-28)
    // KÄLLA: https://kund.printhuset-sthlm.se/wa/w28.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Gräskö", "minst 1 timme innan avgång", "minst 2 timmar innan", "senast kl. 19.00 dag före", "Går under isfri period" (läst 2026-11-28)
    bestallning: 'Turer till och från Gräskö kan gå eller stanna bara om resan har beställts i förväg. Med anmärkning b ska den beställas minst en timme före avgång från bryggan (tabell 28) och med anmärkning B minst två timmar före (tabell 28), i båda fallen senast kl. 17.00. Med anmärkning C ska den beställas senast kl. 19.00 dagen före resdagen (tabell 28). Från 13 december 2026 går turer med anmärkning H bara under isfri period (tabell 28). Kontrollera anmärkningen för din tur i Waxholmsbolagets tabell 28 i god tid innan du åker.',
    bestallningTabell: 'Waxholmsbolagets tabell 28',
  },
  'aspo-blekinge': {
    // 37 min, 0 byten, uppmätt 2026-08-05 · ren båtresa
    destStopId: '740071726', destStopName: 'Aspö Djupvik',
    originStopId: KARLSKRONA_C_ID, originStopName: 'Karlskrona Centralstation',
    // Faktagranskning fas 3 (2026-11-28, f300a-0246, f300a-0247): överfarten är Trafikverkets vägfärja; världsarvsuppgiften saknade nivå 1-källa och är struken.
    // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/ — "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård." (läst 2026-11-28)
    note: 'Trafikverkets vägfärja Aspöleden går mellan Karlskrona och Aspö.',
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
// KÄLLA: https://www.vasttrafik.se/reseplanering/tidtabeller/ — "Här finns Västtrafiks tidtabeller. Du hittar tidtabeller för buss, tåg, spårvagn, båt och förbeställd trafik." (läst 2026-11-28)
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
  // Faktagranskning fas 3 (2026-11-28, P0, f300a-0252): "bara med Naturskyddsföreningens turbåt" stämde inte (båten körs av Gotland Sea Guides, och egen båt är tillåten med regler), och rutan sa "nås med egen båt eller taxibåt" utan reservatets regler för landstigning.
  // Rättelse P0 28 (2026-11-28, k16): båten går från Djupvik enligt Naturskyddsföreningen Gotland, inte från Klintehamn.
  // KÄLLA: https://naturskyddsforeningengotland.se/fastigheter/lilla_karlso — "Turlista Lilla Karlsö 2026", "Du kan boka resor under perioden 15 juni 2026 - 15 augusti 2026", "från Djupvik", "Resan erbjuds av Gotland Sea Guides i samarbete med Naturskyddsföreningen Gotland", "Guidad rundvandring ingår i priset", "Under säsongen har vi regelbunden båttrafik till och från ön." (läst 2026-11-28)
  // KÄLLA: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html — "landstiga på annan plats än vid bryggan på öns östra sida utan tillstånd av länsstyrelsen", "under tiden 1/3–31/8 vistas på ön utan tillstånd av länsstyrelsen eller av länsstyrelsen förordnad tillsynsman för reservatet", "Under tiden 1/9–28/2 äger allmänheten rätt att vistas på ön efter skriftlig anmälan.", "Besökare skall därvid göra sådan anmälan omedelbart efter ilandstigning vid bryggan på öns östra sida." (läst 2026-11-28)
  'lilla-karlso': 'ingen hållplats inom 5 km — under säsongen går båten till ön från Djupvik, med Gotland Sea Guides i samarbete med Naturskyddsföreningen Gotland, och en guidad rundvandring ingår. Turlistan för 2026 gällde 15 juni till 15 augusti. Med egen båt får du utan tillstånd bara landstiga vid bryggan på öns östra sida. Den 1 mars till 31 augusti krävs tillstånd från Länsstyrelsen eller reservatets tillsynsman för att vistas på ön, och den 1 september till 28 februari en skriftlig anmälan direkt efter ilandstigningen',

  // Rättelse P0 28 (2026-11-28, k29): rutan sa "nås med egen båt eller taxibåt" och "ingen kollektivtrafik". Länsstyrelsen anger egen båt eller båttaxi; ösidan har sommarbåten från Trosa, men trosa.com gav 403 i dag och är inte läst.
  // KÄLLA: https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/asko.html — "Askö ligger i Trosa skärgård. Hit tar du dig med egen båt eller med båttaxi." (läst 2026-11-28)
  'asko': 'ingen hållplats inom 5 km — enligt Länsstyrelsen tar du dig hit med egen båt eller med båttaxi. Se ösidan för hur du tar dig hit',
  'galo': 'närmaste hållplats (Nor, 533 m) kunde inte knytas till ön',
  // Faktagranskning fas 3 (2026-11-28, f300a-0255): rutan sa "Mörkö nås med egen båt eller taxibåt", men ön har bro och vägfärja.
  // Rättelse P0 28 (2026-11-28, k24): SL-buss 727 går via Hörningsnäs till Skanssundet, så texten säger inte längre "Ingen kollektivtrafik" (ingenTrafikText i ingen-trafik.ts). Mätningen "ingen hållplats inom 5 km" är inte gjord om.
  // KÄLLA: https://www.sodertalje.se/contentassets/801b52a57aed44f592a5d6bf3ff8bb96/1-morko.pdf — "Mörkö har förbindelse med fastlandet via en bro vid Kasholmsundet på öns västra del" (läst 2026-11-28)
  // KÄLLA: https://www.trafikverket.se/resa-och-trafik/farjetrafik/skanssundsleden/ — "Skanssundsleden går mellan Hörningsnäs på Södertörn och Mörkö.", "Resan med vägfärjan är avgiftsfri." (läst 2026-11-28)
  // KÄLLA: https://kund.printhuset-sthlm.se/sl/h727.pdf — "Tumba station–Skanssundet", "Hörningsnäs", "SKANSSUNDET", "Giltig 7 april–18 juni samt 17 augusti–12 december 2026" (läst 2026-11-28)
  // KÄLLA: https://kund.printhuset-sthlm.se/sl/v727.pdf — "Tumba station–Skanssundet", "Hörningsnäs", "SKANSSUNDET", "Giltig 13 december 2026–20 juni 2027 samt 16 augusti–11 december 2027" (läst 2026-11-28)
  'morko': 'ingen hållplats inom 5 km — Mörkö nås med bil över bron vid Kasholmsundet eller med Trafikverkets avgiftsfria vägfärja Skanssundsleden, som går mellan Hörningsnäs och Mörkö. SL-buss 727 går från Tumba station via Hörningsnäs till Skanssundet',
  'birka': 'närmaste hållplats (Lökholmen, 1398 m) kunde inte knytas till ön', // 2026-10-21: nyckeln hette bjorko
  'svenska-hogarna': 'ingen hållplats inom 5 km',
  // Rättelse P0 28 (2026-11-28, k29): Dalarö Sjötransporter körde sommaren 2026 Dalarö till Huvudskär, så "nås med egen båt eller taxibåt" gällde inte hela året.
  // Andra rättelsen P0 28 (2026-11-28, k56): "Andra tider ... egen båt eller taxibåt" var fel, eftersom samma sida listar sex turer till efter 16 augusti. Texten återger nu bolagets plan för 2026 som en plan.
  // KÄLLA: https://skargardsstiftelsen.se/omraden/huvudskar/ — "Hit tar du dig med egen båt eller taxibåt. Under sommaren finns även vissa säsongsanpassade båtturer från Dalarö." (läst 2026-11-28)
  // KÄLLA: https://www.dalarosjotransporter.se/kontakt/ — "Under sommaren 2026 kommer vi återigen att trafikera Dalarö - Huvudskär på torsdagar och söndagar mellan 14 juni-16 augusti", "Vi kommer även att trafikera Huvudskär: 21/8 23/8 28/8 30/8 4/9 6/9" (läst 2026-11-28)
  'huvudskar': 'ingen hållplats inom 5 km — enligt Skärgårdsstiftelsen tar du dig hit med egen båt eller taxibåt, och under sommaren finns även vissa säsongsanpassade båtturer från Dalarö. Dalarö Sjötransporter angav för 2026 turer från Dalarö till Huvudskär på torsdagar och söndagar mellan 14 juni och 16 augusti och den 21, 23, 28 och 30 augusti och den 4 och 6 september',
  'hasselo': 'närmaste hållplats (Lökholmen, 4865 m) kunde inte knytas till ön',
  'ormskar': 'närmaste hållplats (Kalkberget (Nämdö) brygga, 2969 m) kunde inte knytas till ön',
  // Rättelse P0 28 (2026-11-28, k29): rutan sa "nås med egen båt eller taxibåt"; Länsstyrelsen skriver endast egen båt.
  // KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norrpada.html — "Hit kommer du endast med egen båt." (läst 2026-11-28)
  'norrpada': 'ingen hållplats inom 5 km — enligt Länsstyrelsen kommer du hit endast med egen båt',
  'langviksskaret': 'ingen hållplats inom 5 km',
  // 'storholmen' borttagen 2026-10-29: mätningen 2026-08-05 gjordes med fel koordinater (59.2803, 18.8090 vid Runmarö). SL:s pendelbåt 80 angör Storholmen södra, östra och norra. Lägg in ön i ISLAND_TRANSIT när hållplats-ID verifierats mot ResRobot.
  // KÄLLA: https://kund.printhuset-sthlm.se/sl/h80.pdf — "Ropsten–Storholmen", "Pendelbåt", "Storholmen södra", "Storholmen östra", "Storholmen norra", "Giltig 17 augusti–12 december 2026" (läst 2026-11-10)
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

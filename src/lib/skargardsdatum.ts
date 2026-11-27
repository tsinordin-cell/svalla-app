/**
 * Skärgårdens datum: en lista för både /skargardsdatum och startsidans "Just nu i skärgården".
 *
 * Max 2026-11-27: "desto mer bra info desto bättre i kalendern". Raderna togs fram av fyra
 * researchagenter och granskades var för sig av tre oberoende granskare (Truth Pipeline).
 * GUL ändrades enligt granskarna, RÖD ströks (Gotlandsfärjornas nya tider: oklar riktning).
 *
 * Regler:
 *  - Varje rad har en KÄLLA med citat och läsdatum. Inga nya påståenden utan källa.
 *  - iso är första dagen, slut sista dagen (för perioder). Sidan visar rader till och med slut,
 *    startsidan visar de fyra närmaste som inte har börjat än.
 *  - Datum med år skrivs om eller tas bort när året passerat. Regeln står bredvid.
 *  - Inga bindestreck eller tankstreck i publicerad text.
 *  - Bör kontrolleras igen före datumet: evenemang (julmarknader, ÖTILLÖ), Strömmas säsong,
 *    fiskeregler (HaV har en remiss om nya regler från 1 januari 2027).
 */

export type Skargardsdatum = {
  iso: string
  slut?: string
  nar: string
  vad: string
  /** Kortare text i startsidans remsa. Utelämnas när vad är kort nog. */
  kort?: string
  regel: string
  lank: { href: string; text: string }
}

export const SKARGARDSDATUM: Skargardsdatum[] = [
  // KÄLLA: https://www.sandhamn.com/sv/kalender/julmarknad och /en/kalender/julmarknad — "Visit Sandhamn's Christmas market on 28 November 2026.", tid 11.00 till 15.00 (läst 2026-11-27)
  {
    iso: '2026-11-28', nar: '28 november 2026', vad: 'Julmarknad på Sandhamn',
    regel: 'Arrangeras av Sandhamn Seglarhotell. Lördag 11 till 15.',
    lank: { href: '/o/sandhamn', text: 'Sandhamn' },
  },
  // KÄLLA: https://marstrandsmarknad.com/ — "Julmarknad · 28–29 november 2026", "Lördag 28 november kl. 11.00–16.00 och söndag 29 november kl. 11.00–15.00." (läst 2026-11-27)
  {
    iso: '2026-11-28', slut: '2026-11-29', nar: '28 och 29 november 2026', vad: 'Julmarknad inomhus i Strandverket på Marstrand',
    kort: 'Julmarknad i Strandverket på Marstrand',
    regel: 'Lördag 11 till 16 och söndag 11 till 15.',
    lank: { href: '/o/marstrand', text: 'Marstrand' },
  },
  // Befintlig rad: /farjor FAQ (waxholmsbolaget.se och sl.se). Perioden som pågår nu.
  {
    iso: '2026-09-14', slut: '2027-04-29', nar: '14 september 2026 till 29 april 2027', vad: 'SL:s periodbiljetter på 30 dagar eller mer gäller i hela Waxholmsbolagets trafik',
    regel: 'Resten av året gäller biljett från SL bara mellan Strömkajen och Vaxholm med omnejd. Linje 17, 18 och 19 tar inte biljett från SL.',
    lank: { href: '/farjor', text: 'Färjetider' },
  },
  // KÄLLA: HaV fredningstider (se raden för oktober 2027). Perioden som pågår nu.
  {
    iso: '2026-10-01', slut: '2027-03-31', nar: '1 oktober 2026 till 31 mars 2027', vad: 'Lax och öring är fredade i kustvattnet i Skagerrak och Kattegatt',
    regel: 'Återkommande fredningstid enligt HaV:s nuvarande regler.',
    lank: { href: '/blogg/fiske-skargard-guide', text: 'Fiske i skärgården' },
  },
  // Befintlig rad: guides-data.ts hummerpremiar-bohuslan (havochvatten.se)
  {
    iso: '2026-11-30', nar: '30 november 2026', vad: 'Sista dagen för fritidsfiske efter hummer',
    regel: 'Yrkesfiskare får fiska till och med 31 december.',
    lank: { href: '/guider/hummerpremiar-bohuslan', text: 'Hummerpremiär och regler' },
  },
  // KÄLLA: https://www.destinationvaxholm.se/en/sv/julmarknad — "Saturday and Sunday, December 5–6, 2026", "around Rådhustorget" (läst 2026-11-27)
  {
    iso: '2026-12-05', slut: '2026-12-06', nar: '5 och 6 december 2026', vad: 'Julmarknad kring Rådhustorget i Vaxholm',
    kort: 'Julmarknad i Vaxholm',
    regel: 'Vaxholms traditionella julmarknad, lördag och söndag.',
    lank: { href: '/o/vaxholm', text: 'Vaxholm' },
  },
  // KÄLLA: https://artipelag.se/julmarknad-pa-artipelag/ — "12–13 december 2026, inomhus i Artboxen på Artipelag." (läst 2026-11-27)
  {
    iso: '2026-12-12', slut: '2026-12-13', nar: '12 och 13 december 2026', vad: 'Julmarknad på Artipelag',
    regel: 'Inomhus i Artboxen.',
    lank: { href: '/guider/jul-skargarden', text: 'Jul i skärgården' },
  },
  // KÄLLA: http://kund.printhuset-sthlm.se/wa/w16.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Vid jul, nyår, påsk, midsommar samt övriga storhelger förekommer förändringar i trafiken." Linjelistan https://waxholmsbolaget.linjetidtabeller.se/ — "Gäller: 2026-12-13 till 2027-04-11" (läst 2026-11-27)
  {
    iso: '2026-12-13', slut: '2027-04-11', nar: '13 december 2026 till 11 april 2027', vad: 'Waxholmsbolagets vintertidtabell',
    kort: 'Waxholmsbolagets vintertidtabell börjar',
    regel: 'Gäller linjerna som går i vinter. Flera linjer har kortare sträckning än i höst. Vid jul, nyår och påsk förekommer förändringar i trafiken, så kontrollera din linje.',
    lank: { href: '/vintertidtabeller', text: 'Vintertidtabeller' },
  },
  // KÄLLA: https://styrsobolaget.se/kollektivtrafik-till-sjoss-med-vasttrafik/ — "Vintertidtabell L 281-282 20261213-20270606"; https://transdev.se/wp-content/uploads/sites/5/2026/11/L-283-vintertidtabell.pdf — "Vinter- och vårtidtabell: L 283, Södra Skärgården 13/12 2026 - 06/06 2027", "Julafton trafikeras som en söndag men med nattrafik som en lördag natten mot juldagen", "Nyårsafton trafikeras som en lördag" (läst 2026-11-27)
  {
    iso: '2026-12-13', slut: '2027-06-06', nar: '13 december 2026 till 6 juni 2027', vad: 'Styrsöbolagets tidtabell för vinter och vår i Göteborgs södra skärgård',
    kort: 'Styrsöbolagets vintertidtabell börjar',
    regel: 'Linje 281 till 284. Julafton trafikeras som en söndag men med nattrafik som en lördag. Nyårsafton trafikeras som en lördag.',
    lank: { href: '/o/styrso', text: 'Styrsö' },
  },
  // KÄLLA: https://www.trafikverket.se/om-oss/nyheter/nationella-nyheter/2026/september/tagens-tidtabeller-klara-for-2027--battre-forutsagbarhet-starker-sveriges-konkurrenskraft/ — "De nya tidtabellerna för 2027 börjar gälla den 13 december."; https://via.tt.se/pressmeddelande/4432413/vasttrafik-satsar-79-miljoner-kronor-pa-tatare-avgangar?lang=sv — "De flesta trafikförändringar börjar gälla den 13 december 2026 men några genomförs under 2027." (läst 2026-11-27)
  {
    iso: '2026-12-13', nar: '13 december 2026', vad: 'Nya tidtabeller för tåg och för Västtrafik',
    regel: 'Kolla tiderna för resan till bryggan. Några av Västtrafiks ändringar kommer först under 2027.',
    lank: { href: '/farjor', text: 'Färjetider' },
  },
  // KÄLLA: https://grundskola.stockholm/terminer-och-lov/ — "Höstterminens sista dag: 18 december", "Vårterminens första dag: 11 januari"; https://goteborg.se/wps/portal/aktuelltarkiv?id=8c56b66d-3b2e-48a2-87d5-c57380c78409 — "Höstterminen slutar den 18 december", "Vårterminen startar den 11 januari" (läst 2026-11-27)
  {
    iso: '2026-12-18', nar: '18 december 2026', vad: 'Sista dagen på höstterminen i Stockholms och Göteborgs kommunala grundskolor',
    kort: 'Sista skoldagen före jul i Stockholm och Göteborg',
    regel: 'Vårterminen börjar 11 januari 2027. Fristående skolor kan ha andra datum.',
    lank: { href: '/guider/jul-skargarden', text: 'Jul i skärgården' },
  },
  // KÄLLA: https://www.trafikverket.se/om-oss/nyheter/lansnyheter/blekinge/2026/november/ny-tidtabell-okar-tillgangligheten-pa-aspo/ — "Den 1 januari börjar den nya tidtabellen gälla." (publicerad 2026-11-09, läst 2026-11-27)
  {
    iso: '2027-01-01', nar: '1 januari 2027', vad: 'Ny tidtabell för Aspöleden i Blekinge',
    regel: 'Nattrafik införs. Vissa turer sena kvällar och nätter körs bara om någon har beställt dem.',
    lank: { href: '/farjor', text: 'Färjetider' },
  },
  // KÄLLA: https://www.havochvatten.se/fiske-och-handel/regler-och-lagar/fredningstider-minimimatt-och-maximimatt/fredningstider-i-skagerrak-kattegatt-och-ostersjon.html — "Torsk, lyrtorsk (bleka) och kolja | 1 januari - 31 mars | Innanför trålgränsen i Skagerrak och Kattegatt" (läst 2026-11-27)
  {
    iso: '2027-01-01', slut: '2027-03-31', nar: '1 januari till 31 mars 2027', vad: 'Fiske efter torsk, lyrtorsk och kolja är förbjudet innanför trålgränsen i Skagerrak och Kattegatt',
    kort: 'Torskfredning på västkusten börjar',
    regel: 'Återkommande fredningstid enligt HaV:s nuvarande regler.',
    lank: { href: '/blogg/fiske-skargard-guide', text: 'Fiske i skärgården' },
  },
  // KÄLLA: https://www.lulea.se/boende--gator/gator-och-trafik/isvagar.html — "I regel öppnas vägarna i slutet av januari eller i början av februari.", "För att vägarna ska öppnas måste de tåla en belastning på minst 2 ton." (läst 2026-11-27). Inget fast datum, därför ingen plats i startsidans remsa. iso och slut används bara för sortering och för hur länge raden visas.
  {
    iso: '2027-01-25', slut: '2027-02-10', nar: 'Slutet av januari eller början av februari', vad: 'Isvägarna i Luleå skärgård brukar öppna',
    regel: 'Inget fast datum. Isen måste bära minst 2 ton innan vägarna öppnas.',
    lank: { href: '/guider/vinter-i-skargarden', text: 'Vinter i skärgården' },
  },
  // KÄLLA: goteborg.se (som ovan) — "Sportlov den 15 – 19 februari (vecka 7)" (läst 2026-11-27)
  {
    iso: '2027-02-15', slut: '2027-02-19', nar: '15 till 19 februari 2027', vad: 'Sportlov i Göteborgs Stads grundskolor (vecka 7)',
    kort: 'Sportlov i Göteborg',
    regel: 'Fristående skolor kan ha andra datum.',
    lank: { href: '/sasong/vinter', text: 'Skärgården på vintern' },
  },
  // KÄLLA: grundskola.stockholm — "Sportlov, vecka 9: 1–5 mars"; https://www.varmdo.se/barnochutbildning/skolbarn/lovledigheter.4.5108a8bb16e40e092a3e966a.html — "Sportlov (v.9) 1–7 mars"; https://www.norrtalje.se/info/barn-och-skola/grundskola/terminer-ledighet-grundskola/ — "1–5 mars 2027 | Sportlov, vecka 9" (läst 2026-11-27)
  {
    iso: '2027-03-01', slut: '2027-03-05', nar: '1 till 5 mars 2027', vad: 'Sportlov i kommunala grundskolor i Stockholm, Värmdö och Norrtälje (vecka 9)',
    kort: 'Sportlov i Stockholm, Värmdö och Norrtälje',
    regel: 'Fristående skolor kan ha andra datum.',
    lank: { href: '/sasong/vinter', text: 'Skärgården på vintern' },
  },
  // Befintlig rad: guides-data.ts hund-skargarden (jordbruksverket.se, lansstyrelsen.se Stockholm)
  {
    iso: '2027-03-01', slut: '2027-08-20', nar: '1 mars till 20 augusti', vad: 'Hundar får inte springa lösa i naturen',
    kort: 'Hundar får inte springa lösa i naturen, till 20 augusti',
    regel: 'Samma datum varje år, där det kan finnas vilda djur. I många naturreservat ska hunden vara kopplad hela året.',
    lank: { href: '/guider/hund-skargarden', text: 'Skärgård med hund' },
  },
  // KÄLLA: HaV fredningstider (som ovan) — "Abborre och gädda | 1 mars - 31 maj | Kustvattenområdet inom Gotlands län" samt området Torhamns udde, Ölands östkust, Emåns mynning (läst 2026-11-27)
  {
    iso: '2027-03-01', slut: '2027-05-31', nar: '1 mars till 31 maj 2027', vad: 'Fiske efter gädda och abborre är förbjudet i Gotlands kustvatten',
    kort: 'Fredning av gädda och abborre på Gotland börjar',
    regel: 'Återkommande fredningstid enligt HaV:s nuvarande regler. Gäller också ett avgränsat område i Kalmarsund och längs Ölands östkust.',
    lank: { href: '/gotland', text: 'Gotland' },
  },
  // KÄLLA: goteborg.se — "Påsklov den 26 mars – 2 april (vecka 13)"; grundskola.stockholm — "Påsklov, vecka 13: 30 mars–2 april" (läst 2026-11-27). Inget veckonummer publiceras: 26 mars ligger i vecka 12.
  {
    iso: '2027-03-26', slut: '2027-04-02', nar: '26 mars till 2 april 2027', vad: 'Påsklov i Göteborgs och Stockholms kommunala grundskolor',
    kort: 'Påsklov i Göteborg och Stockholm',
    regel: 'Göteborg 26 mars till 2 april, Stockholm 30 mars till 2 april. Fristående skolor kan ha andra datum.',
    lank: { href: '/sasong/var', text: 'Skärgården på våren' },
  },
  // KÄLLA: https://kalender.se/helgdagar/2027/ — "26 mars Långfredagen", "28 mars Påskdagen", "29 mars Annandag påsk"; lag (1989:253) om allmänna helgdagar; förordning (2001:127) om sommartid — "Sommartiden börjar klockan 02.00 normaltid den sista söndagen i mars." (läst 2026-11-27)
  {
    iso: '2027-03-26', slut: '2027-03-29', nar: '26 till 29 mars 2027', vad: 'Påskhelgen',
    regel: 'Långfredag till annandag påsk. Natten mot påskdagen ställs klockan fram en timme.',
    lank: { href: '/sasong/var', text: 'Skärgården på våren' },
  },
  // KÄLLA: https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/djur--och-vaxtskyddsomraden/ — "Den vanligaste förbudsperioden för fågel är 1 april till 15 juli. I norr 1 maj–31 juli.", "För skydd av säl är det en stor variation på skyddstider, men 1 februari–31 augusti är vanligast." (läst 2026-11-27). Ingen egen guide finns, länken går till vårsidan.
  {
    iso: '2027-04-01', slut: '2027-07-15', nar: '1 april till 15 juli', vad: 'Den vanligaste perioden med tillträdesförbud i fågelskyddsområden',
    kort: 'Fågelskyddsområden stänger för besök',
    regel: 'Varje område har eget beslut, så kontrollera hos länsstyrelsen. I norr är 1 maj till 31 juli vanligast. För sälskyddsområden varierar tiderna mycket, men 1 februari till 31 augusti är vanligast.',
    lank: { href: '/sasong/var', text: 'Skärgården på våren' },
  },
  // KÄLLA: https://www.stromma.com/en-se/stockholm/cinderella-boats/ — "Season: 30 Apr - 26 Sep 2027" (läst 2026-11-27)
  {
    iso: '2027-04-30', slut: '2027-09-26', nar: '30 april till 26 september 2027', vad: 'Cinderellabåtarnas säsong',
    kort: 'Cinderellabåtarnas säsong börjar',
    regel: 'Enligt Strömma. Kontrollera tidtabellen för din ö.',
    lank: { href: '/cinderella-baaten', text: 'Cinderellabåten' },
  },
  // KÄLLA: https://kalender.se/helgdagar/2027/ — "6 maj Kristi himmelfärdsdag torsdag"; lag (1989:253); lovdag 7 maj i goteborg.se och grundskola.stockholm (läst 2026-11-27)
  {
    iso: '2027-05-06', nar: '6 maj 2027', vad: 'Kristi himmelsfärdsdag',
    regel: 'Torsdag, sjätte torsdagen efter påskdagen. Fredagen 7 maj är lovdag i Göteborgs och Stockholms kommunala grundskolor.',
    lank: { href: '/sasong/var', text: 'Skärgården på våren' },
  },
  // KÄLLA: grundskola.stockholm — "Läsårets sista dag: 11 juni"; goteborg.se — "Vårterminen slutar den 10 juni" (läst 2026-11-27)
  {
    iso: '2027-06-11', nar: '11 juni 2027', vad: 'Sista skoldagen före sommarlovet i Stockholms kommunala grundskolor',
    kort: 'Sista skoldagen före sommarlovet i Stockholm',
    regel: 'I Göteborg slutar vårterminen 10 juni. Fristående skolor kan ha andra datum.',
    lank: { href: '/sasong/sommar', text: 'Skärgården på sommaren' },
  },
  // KÄLLA: https://otilloswimrun.com/races/uto-sweden/ — "June 12, 2027" (läst 2026-11-27)
  {
    iso: '2027-06-12', nar: '12 juni 2027', vad: 'ÖTILLÖ Swimrun på Utö',
    regel: 'Arrangeras av ÖTILLÖ.',
    lank: { href: '/o/uto', text: 'Utö' },
  },
  // KÄLLA: https://kalender.se/aftnar/2027/ — "25 juni Midsommarafton fredag"; https://kalender.se/helgdagar/2027/ — "26 juni Midsommardagen lördag"; lag (1989:253) (läst 2026-11-27)
  {
    iso: '2027-06-25', nar: '25 juni 2027', vad: 'Midsommarafton',
    regel: 'Fredagen före midsommardagen, som är den lördag som infaller 20 till 26 juni.',
    lank: { href: '/sasong/sommar', text: 'Skärgården på sommaren' },
  },
  // KÄLLA: https://otilloswimrun.com/races/gothenburg-sweden/ — "July 24, 2027", start och mål vid Styrsö Bratten (läst 2026-11-27)
  {
    iso: '2027-07-24', nar: '24 juli 2027', vad: 'ÖTILLÖ Swimrun i Göteborgs skärgård',
    regel: 'Start och mål på Styrsö.',
    lank: { href: '/o/styrso', text: 'Styrsö' },
  },
  // Befintlig rad: guides-data.ts kraftskiva-skargarden (isof.se)
  {
    iso: '2027-08-04', nar: '4 augusti 2027', vad: 'Kräftpremiär enligt traditionen',
    kort: 'Kräftpremiär enligt traditionen, klockan 17',
    regel: 'Första onsdagen i augusti klockan 17. Ingen officiell premiär sedan 1994, men dagen lever kvar.',
    lank: { href: '/guider/kraftskiva-skargarden', text: 'Kräftpremiär och kräftskiva' },
  },
  // Befintlig rad: guides-data.ts surstrommingspremiar (isof.se)
  {
    iso: '2027-08-19', nar: '19 augusti 2027', vad: 'Surströmmingspremiär',
    regel: 'Tredje torsdagen i augusti, sedan 1940.',
    lank: { href: '/guider/surstrommingspremiar', text: 'Surströmmingspremiär' },
  },
  // KÄLLA: https://otilloswimrun.com/races/otillo-swimrun-world-championship-sweden/ — "September 06, 2027", start i Sandhamn, mål vid Utö Värdshus (läst 2026-11-27)
  {
    iso: '2027-09-06', nar: '6 september 2027', vad: 'ÖTILLÖ Swimrun World Championship, från Sandhamn till Utö',
    kort: 'ÖTILLÖ världsmästerskap, Sandhamn till Utö',
    regel: 'Arrangeras av ÖTILLÖ.',
    lank: { href: '/o/sandhamn', text: 'Sandhamn' },
  },
  // Befintlig rad: /farjor FAQ (waxholmsbolaget.se och sl.se)
  {
    iso: '2027-09-14', slut: '2028-04-29', nar: '14 september 2027 till 29 april 2028', vad: 'SL:s periodbiljetter på 30 dagar eller mer gäller i hela Waxholmsbolagets trafik',
    kort: 'SL:s periodbiljett gäller i hela Waxholmsbolagets trafik',
    regel: 'Resten av året gäller biljett från SL bara mellan Strömkajen och Vaxholm med omnejd. Linje 17, 18 och 19 tar inte biljett från SL.',
    lank: { href: '/farjor', text: 'Färjetider' },
  },
  // Befintlig rad: guides-data.ts hummerpremiar-bohuslan (havochvatten.se)
  {
    iso: '2027-09-27', nar: '27 september 2027 klockan 07.00', vad: 'Hummerpremiär',
    kort: 'Hummerpremiär, klockan 07.00',
    regel: 'Första måndagen efter 20 september, enligt HaV, myndigheten som sätter fiskereglerna.',
    lank: { href: '/guider/hummerpremiar-bohuslan', text: 'Hummerpremiär och regler' },
  },
  // KÄLLA: HaV fredningstider (som ovan) — "Lax och öring | 1 oktober - 31 mars | Kustvattenområdet i Skagerrak och Kattegatt" (läst 2026-11-27)
  {
    iso: '2027-10-01', slut: '2028-03-31', nar: '1 oktober 2027 till 31 mars 2028', vad: 'Lax och öring är fredade i kustvattnet i Skagerrak och Kattegatt',
    kort: 'Lax och öring fredade på västkusten',
    regel: 'Återkommande fredningstid enligt HaV:s nuvarande regler.',
    lank: { href: '/blogg/fiske-skargard-guide', text: 'Fiske i skärgården' },
  },
  // KÄLLA: förordning (2001:127) om sommartid — "Sommartiden upphör klockan 03.00 sommartid den sista söndagen i oktober." Sista söndagen i oktober 2027 = 31 oktober (läst 2026-11-27)
  {
    iso: '2027-10-31', nar: '31 oktober 2027', vad: 'Vintertid, klockan ställs tillbaka en timme',
    regel: 'Sista söndagen i oktober.',
    lank: { href: '/sasong/host', text: 'Skärgården på hösten' },
  },
  // KÄLLA: grundskola.stockholm — "Höstlov, vecka 44: 1–5 november" (hösten 2027, läst 2026-11-27)
  {
    iso: '2027-11-01', slut: '2027-11-05', nar: '1 till 5 november 2027', vad: 'Höstlov i Stockholms stads grundskolor (vecka 44)',
    kort: 'Höstlov i Stockholm',
    regel: 'Fristående skolor kan ha andra datum.',
    lank: { href: '/guider/hostlov-vid-havet', text: 'Höstlov vid havet' },
  },
  // KÄLLA: grundskola.stockholm — under "Höstterminen 2027": "Läsårets sista dag: 21 december" (läst 2026-11-27)
  {
    iso: '2027-12-21', nar: '21 december 2027', vad: 'Sista dagen på höstterminen i Stockholms kommunala grundskolor',
    kort: 'Sista skoldagen före jul i Stockholm',
    regel: 'Fristående skolor kan ha andra datum.',
    lank: { href: '/guider/jul-skargarden', text: 'Jul i skärgården' },
  },
]

const MAN_KORT = ['jan', 'feb', 'mars', 'april', 'maj', 'juni', 'juli', 'aug', 'sep', 'okt', 'nov', 'dec']
const MAN_LANG = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli', 'augusti', 'september', 'oktober', 'november', 'december']

/** Rader som inte har passerat (sista dagen är idag eller senare), i tidsordning. */
export function aktuellaDatum(idag: string): Skargardsdatum[] {
  return SKARGARDSDATUM.filter(d => (d.slut ?? d.iso) >= idag).sort((a, b) => a.iso.localeCompare(b.iso))
}

/** Startsidans remsa: de närmaste som inte har börjat än. Isvägarna saknar fast datum och visas inte där. */
export function kommandeDatum(idag: string, antal = 4): Skargardsdatum[] {
  return SKARGARDSDATUM.filter(d => d.iso >= idag && !d.nar.startsWith('Slutet av'))
    .sort((a, b) => a.iso.localeCompare(b.iso)).slice(0, antal)
}

export function datumBricka(iso: string): { dag: string; man: string } {
  return { dag: String(Number(iso.slice(8, 10))), man: MAN_KORT[Number(iso.slice(5, 7)) - 1] }
}

/** Rubrik per månad på /skargardsdatum, till exempel "December 2026". */
export function manadsRubrik(iso: string): string {
  const m = MAN_LANG[Number(iso.slice(5, 7)) - 1]
  return m.charAt(0).toUpperCase() + m.slice(1) + ' ' + iso.slice(0, 4)
}

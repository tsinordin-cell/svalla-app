// GENERERAD AV scripts/generera-kallor.mjs — REDIGERA INTE FÖR HAND.
//
// Källorna kommer från KÄLLA-kommentarerna i island-data.ts och bohuslan-data.ts.
// Ändra kommentaren i datafilen och kör om skriptet; ändrar du här skrivs det över.
//
// En KÄLLA-rad utan URL hamnar inte här. Det är meningen: en källa som inte går
// att öppna är inget belägg, och ska inte se ut som ett.

export type Kalla = {
  /**
   * Adressen står först med flit: verify-claims letar efter ett källmärke inom
   * fem rader ovanför ett påstående, så den här ordningen gör att filen
   * belägger sig själv i stället för att undantas från spärren.
   */
  url: string
  /** Myndigheten, kommunen eller verksamheten som står bakom uppgiften */
  org: string
  /** Vad källan bekräftar — kortfattat */
  vad: string
  /** Datum då någon faktiskt läste sidan */
  last: string | null
  /** true för myndighetskällor — visas med annan markering */
  myndighet: boolean
}

export const KALLOR_PER_O: Record<string, Kalla[]> = {
  "sandhamn": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gronskar.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1965, 1,6 hektar, varav land 1,1 hektar, kommun Värmdö, markägare och förvaltare Skärgårdsstiftelsen; en liten, flack och vegetationsfattig ö i det yttersta kustbandet öster om Sandhamn; den kända Grönskärs fyr som är av stort kulturhistoriskt värde",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "Värmdö kommun",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/sandhamn",
      "org": "Waxholmsbolaget",
      "vad": "Ut till Sandhamn går det turer året runt; Du kan åka till Sandhamn med båt från Stavsnäs och då tar resan drygt en timme. Under sommaren så kan du också åka till Sandhamn från Strömkajen; tabell 15 (endast sommartid) och tabell 16. Nord/Sydlinjens tider hittar du i tabell 40 . Waxholmsbolaget linje 16,  — 16A STAVSNÄS — SANDHAMN — HAGEDE, gäller 2 april–18 juni och 17 augusti–12 december 2026: Stavsnäs 10.40 → Sandhamn 11.20 (40 min), 06.05 → 06.55 (50 min), 09.45 → 10.45 (60 min) . Sandhamn Seglarhotell,  — Take bus 433 from Slussen … Approx. 1 hour by bus; Board line 15 to Sandhamn … Summer — June to September … The journey takes 2–3 hours; avgång Strandvägskajen / Strömkajen, berth 3 at Nybroviken . SL buss 433 Slussen–Djurö,  — hållplats Stavsnäs vinterhamn",
      "last": "2026-09-21",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/",
      "org": "waxholmsbolaget.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://badplats.nu/varmdo/flaskberget/",
      "org": "badplats.nu",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://battaxi.se/sandhamnslinjen-2/",
      "org": "battaxi.se",
      "vad": "Sandhamnslinjen är en direkt reguljär tur som tar dig mellan Stavsnäs och Sandhamn på endast 30 minuter; Bokade biljetter har alltid förtur, men det går även bra att köpa biljett direkt på båten; hösttidtabeller 17/8–20/9 och 21/9–20/12 2026",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.dykarbaren.se/",
      "org": "dykarbaren.se",
      "vad": "DYKARBAREN SANDHAMN, inne- och uteservering, säsongsöppettider 2026",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ksss.se/KSSS/historia/",
      "org": "ksss.se",
      "vad": "KSSS grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet samt aktiv seglingsverksamhet på fjärdarna runt Sandhamn, bidrog till klubbens goda rykte",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ksss.se/en/gotlandrunt/",
      "org": "ksss.se",
      "vad": "since 2024 it starts at Gråskärsfjärden south of Sandön / boats sail south on open water to round Gotland with the finish at Sandhamn",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/hamnar/sandhamn",
      "org": "ksss.se",
      "vad": "Det finns ca 150 gästplatser på Sandhamn, Gästhamnen har 20 st bokningsbara platser som bokas via www.dockspot.com;  — el på brygga B och C, Vatten på bryggorna och servicehusen med dusch",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.naturkartan.se/sv/stockholms-lan/sandon-2",
      "org": "naturkartan.se",
      "vad": "Sandhamn befolkades av lotsar redan på 1700-talet; under 1800-talet växte orten när ångbåtstrafiken etablerades och stockholmare byggde sommarvillor; mot slutet av århundradet blev det ett svenskt centrum för seglare",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/en/hitta-hit",
      "org": "sandhamn.com",
      "vad": "Total travel time from Stockholm: approx. 1.5 hours via buss 433 och båt från Stavsnäs . Tidigare 150 min avsåg den längre sommarbåten från Strömkajen.",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://sandhamns-vardshus.se/",
      "org": "sandhamn.com",
      "vad": "Sandhamns Värdshus anno 1672, Puben … Öppet året runt, Restaurangen Med en magisk utsikt över hamnen",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen",
      "org": "sandhamn.com",
      "vad": "Segelsalen på Seglarhotellet … meny med fokus på säsongens råvaror; hotellets restaurangsida listar Bistro, Segelsalen, Seglarbaren, Orangeriet, Terassen, Hamnbaren",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://sandhamnsbageriet.com/",
      "org": "sandhamnsbageriet.com",
      "vad": "vetesurdegsbröd, kanelbulle, kardemummabulle, \"Seglarbulle\"; säsongsöppet (sista helgen sept 2026)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "Den 26 meter höga fyren har kallats Östersjöns Drottning på grund av sin skönhet. Fyren uppfördes 1770 av granit och sandsten efter ritningar av Carl Fredrik Adelcrantz.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "skargardsstiftelsen.se",
      "vad": "Sjöfartsverket skänker Grönskärs fyr efter renovering (1984); Stiftelsen Stockholms skärgård bildades den 20 mars 1959",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "Spår och leder",
      "vad": "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville och vidare genom den vackra och ljusa tallskogen som är typisk för ön.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/sandhamn/",
      "org": "stockholmslansmuseum.se",
      "vad": "Under slutet av 1600-talet upprättades en lotsstation och de bofasta under 1700- och 1800-talen var främst lotsar, tullare och krögare. / Sandhamn har sedan 1700-talet varit lots- och tullstation",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf",
      "org": "Strömma",
      "vad": "30/4–27/9, \"Strandvägen - kajplats 14\" 10:00 → Sandhamn 12:30 . Waxholmsbolaget linje 15,  — \"GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026\"; Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25 . Seglarhotellets \"2–3 hours\" för linje 15 stämmer inte med Waxholmsbolagets tidtabell och används inte.",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html",
      "org": "Trouville Sandhamn",
      "vad": "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida. / Trouville ligger omkring 20 minuters promenad från hamnen.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/sandhamn",
      "org": "varmdo.se",
      "vad": "Värmdö Hamnar äger fastigheten vid inloppet till Sandhamn; tullhuset är omvandlat till bostäder; Sjöfartsverkets lotsverksamhet och Kustbevakningen finns på platsen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitskargarden.se/boende/hotell/sands-hotell.aspx",
      "org": "visitskargarden.se",
      "vad": "Sands Hotell & Bistro; sandshotell.se — restaurangen med uteterassen",
      "last": null,
      "myndighet": false
    }
  ],
  "uto": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html",
      "org": "lansstyrelsen.se",
      "vad": "Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan ; Waxholmsbolaget linje 21,  — 21A ÅRSTA — UTÖ. Tidigare stod Nynäshamn (Årsta brygga) och pendeltåg till Nynäshamn — Årsta brygga ligger i Haninge och nås via Västerhaninge.",
      "last": "2026-09-21",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html",
      "org": "lansstyrelsen.se",
      "vad": "skyddat sedan 2008, 2 829 hektar varav land 1 063 hektar, Haninge kommun, Skärgårdsstiftelsen markägare och förvaltare, Natura 2000-områdena SE0110017 Ålö och SE0110118 Rånö Ängsholm; naturtyper \"skärgård, marina miljöer, barrskog, odlingslandskap\", främst hällmarkstallskogar med kalkpåverkad berggrund; \"Storsand på Ålö anses vara en av Stockholms skärgårds finaste sandstränder.\"; Ålö har broförbindelse med Utö",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://sl.se/",
      "org": "sl.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/",
      "org": "waxholmsbolaget.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://marinwiki.se/port/661",
      "org": "marinwiki.se",
      "vad": "Stranden ligger på militärens område drygt 7 kilometer från Gruvbyn",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/uto/",
      "org": "skargardsstiftelsen.se",
      "vad": "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens; Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter; Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis; lansstyrelsen.se Utö: Waxholmsbåt året om till Gruvbryggan",
      "last": "2026-09-26",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "Utö kvarn är byggd 1791 och har under lång tid varit både symbol och sjömärke för Utö. / 2001 blev de nio gruvarbetarbostäderna tillsammans med kvarnen byggnadsminne enligt Kulturmiljölagen. / kvarnen restaurerades 1982",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "skargardsstiftelsen.se",
      "vad": "1973: \"Hela norra Utö med gruvbyn köps från Ställbergsbolaget\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/",
      "org": "stockholmslansmuseum.se",
      "vad": "brytning möjligen redan på 1100-talet, nedlagd 1879 (2026-08-24)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/om-uto-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "kyrkan \"uppfördes mellan år 1848 och 1850\", byggd av \"sten som bröts direkt ur gruvorna\"; Utö Gruvbolag betalade 5 000 riksdaler banco och ställde tomten, församlingen bidrog med 11 000 riksdaler banco och dagsverken; \"Utö kyrka är skärgårdens största stenkyrka.\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.uto.se/cykel/",
      "org": "uto.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/gasthamnen/",
      "org": "utogasthamn.se",
      "vad": "plats för ca 300 fritidsbåtar med eluttag … på samtliga platser, dusch, bastu och toaletter, tvättstuga att hyra, fylla på färskvatten, I den norra hamnen finns sjömacken",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/kiosk-cafe/",
      "org": "utogasthamn.se",
      "vad": "Hamnboden … kiosk, café och restaurang i samma byggnad … glass, godis, korv och toast men även sushi samt en bar",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://utoskola.haninge.se/",
      "org": "utoskola.haninge.se",
      "vad": "Elever 22, Årskurs 1–9, Personal 7",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/kontakt/hitta-hit/",
      "org": "utovardshus.se",
      "vad": "Waxholmsbåtar trafikerar linjen Utö — Årsta Brygga dagligen / Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/boende/",
      "org": "utovardshus.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/restaurang/uto-vardshus/",
      "org": "utovardshus.se",
      "vad": "I det gamla gruvkontoret finns Utö Värdshus bar och matsalar … à la carte både lunch och middag … verandan öppen på sommaren",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/restaurang/seglarbaren/",
      "org": "utovardshus.se",
      "vad": "BAREN MITT I HAMNEN, veranda mot hamninloppet, enklare rätter till lunch … kolgrillade rätter till kvällen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/",
      "org": "Utö gruvor",
      "vad": "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer / År 1879 upphörde slutligen gruvdriften helt. 16 000 ton/år och cirka 500 invånare saknade källa och motsade 446; strukna.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitskargarden.se/mat-dryck/restaurang/bakfickan.aspx",
      "org": "visitskargarden.se",
      "vad": "Utös vattenhål och nattklubb, bar/nattklubb i anslutning till Utö Värdshus",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h21.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": null,
      "myndighet": false
    }
  ],
  "vaxholm": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html",
      "org": "lansstyrelsen.se",
      "vad": "Bogesunds slott från mitten av 1600-talet är statligt byggnadsminne och rymmer vandrarhem; anordningar: markerade vandringsleder och ridstigar, badplatser, rastplatser med eldstäder och vindskydd, campingplatser, golfbana; föreskrifterna förbjuder att medföra okopplad hund, att \"tälta mer än två dygn i följd annat än på anvisad plats\", att cykla utanför anvisade stigar och att \"rida annat än på vägar och på anvisade ridstigar\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell",
      "org": "sfv.se",
      "vad": "arkitekter \"Erik Dahlberg, C M Stuart, C F Meijer\"; \"Efter första världskriget flyttades försvarslinjen längre ut i skärgården och Vaxholm förlorade då återigen sin militära betydelse\"; \"1964 invigdes kastellets museum\"; i dag finns \"restaurang, konsertlokaler och en uppskattad äventyrsverksamhet\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/rindo-redutt",
      "org": "sfv.se",
      "vad": "byggd \"1859–1864\" för att komplettera Vaxholms kastell i försvaret av Stockholms inlopp; domineras av en donjon omgiven av vallar, djup grav och fältvall; innehöll två kaponjärer, \"de första som byggdes i landet\"; sten och tegel; statligt byggnadsminne; \"går att besöka på egen hand\"",
      "last": "2026-09-20",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/oscar-fredriksborg",
      "org": "sfv.se",
      "vad": "Byggår: 1867-1877; anlagt vid Oxdjupet sedan en farled öppnats där efter århundraden av stenblockering; modernt bergfort med tunnelsprängning med nitroglycerin, betongen som byggmaterial och pansar som fasadskydd; byggnadsminne 2002 (sidan stavar namnet Oscar Fredriksborg i rubrik och löptext men Oskar-Fredriksborg i just den meningen); Området vid Oscar Fredriksborg är öppet för besök.",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/",
      "org": "Trafikverket",
      "vad": "gratis vägfärja, ca 6 min över 970 m",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://gasthamnsguide.se/omradesindelat/stockholms-mellersta-skargard/item/vaxholms-gasthamn",
      "org": "gasthamnsguide.se",
      "vad": "drivmedel (diesel/bensin/gasol) via Sjömackarna/Gulf",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.hamnkrogenvaxholm.com/",
      "org": "hamnkrogenvaxholm.com",
      "vad": "vaxholmarnas kvarterskrog sedan 1950-talet … ser ut över båtlivet i gästhamnen, Söderhamnen 10, Våra klassiker samsas med husmanskost",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ostmakeriet.se/aterforsaljare/",
      "org": "ostmakeriet.se",
      "vad": "Mathantverkstan i Skärgården; destinationvaxholm.se (Vaxholms turistbyrå) — artisan cheeses, bread, jams, kombucha, coffee, ice cream, Söderhamnsplan 1",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v670.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stockholm–Vaxholm, hållplatser Tekniska högskolan–Västerhamnsplan, Giltig 11 december 2022–22 juni 2023",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/vaxholm/vaxholms-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "År 1760 lades grunden till den nuvarande kyrkan, färdig 1803 och kallad Gustav Adolfkyrkan efter Gustav III och Gustav IV Adolf; ritad av C F Adelcrantz och Olof Tempelman; det planerade tornet byggdes aldrig utan ersattes av en klockstapel i trä med tre klockor; dopfunt i gotländsk sandsten från slutet av 1300-talet, ursprungligen i Riddarholmskyrkan, överförd omkring 1677; modeller av roslagsbåtar i sidokapellen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/",
      "org": "vaxholm.se",
      "vad": "badplatsen på Rindö heter Grönviksbadet/Grönviken, \"liten sandstrand och en brygga\", renoverad 2020",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia",
      "org": "vaxholm.se",
      "vad": "Vaxholm fick sina första stadsprivilegier år 1647, av drottning Kristina; Viss bebyggelse har funnits på Vaxön sedan 1200-talets slut; omkring 1770 ca 800 invånare; början av 1900-talet ca 2 000 invånare; Vaxholm fick sina första reguljära ångbåtsförbindelser c:a 1850",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm",
      "org": "vaxholm.se",
      "vad": "cirka 12 000 fastboende (2024); \"Kommunen omfattar cirka 70 öar, varav 57 bebodda samt den stora gröna halvön Bogesundslandet\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter",
      "org": "Vaxholms stad",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": false
    },
    {
      "url": "https://vaxholmsfastning.se/historik/",
      "org": "vaxholmsfastning.se",
      "vad": "Vaxholms fästnings historia inleddes i början av 1500-talet med ett blockhus på Vaxholmen, byggt av riksföreståndaren Svante Nilsson Sture. / Gustav Vasa 1548 åt ståthållaren på Stockholms slott att uppföra en ny och kraftigare fästning.",
      "last": "2026-08-25",
      "myndighet": false
    },
    {
      "url": "https://vaxholmsfastning.se/",
      "org": "vaxholmsfastning.se",
      "vad": "museet låter besökaren följa \"skärgårdsförsvarets 500-åriga historia\" och täcker \"Sveriges försvarshistoria från Gustav Vasa till nutid\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.waxholmshotell.se/",
      "org": "waxholmshotell.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://www.winbergs.se/",
      "org": "winbergs.se",
      "vad": "WINBERGS KÖK & BAR PÅ KAJEN I VAXHOLM … sommarkrog … Krogen är grundad 1961",
      "last": null,
      "myndighet": false
    }
  ],
  "grinda": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html",
      "org": "lansstyrelsen.se",
      "vad": "föreskrifterna förbjuder bland annat att förankra båt längre än två dygn, att framföra motordrivna fordon på vägar utanför anvisade, att landa luftfarkost på annat än anvisad plats och att använda musikanläggning på störande sätt",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/",
      "org": "waxholmsbolaget.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "waxholmsbolaget.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://grinda.se/",
      "org": "grinda.se",
      "vad": "Grinda Wärdshus driver boendet på ön. \"Hotellrum i fyra hus\", \"håller hög standard\" och säsongsangivelsen var obelagda och togs bort 2026-09-14.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://grinda.se/en/accommodation/",
      "org": "grinda.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/gasthamn/",
      "org": "grinda.se",
      "vad": "gästhamn för 100 båtar, el, dusch, toalett, 28 st bokningsbara platser; /sakerhet-service — Färskvatten … i dunk; /sjomack — Bensin 98, Diesel, Gasol",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://grinda.se/mat-fest/wardshuset/",
      "org": "grinda.se",
      "vad": "Grinda Wärdshus klassisk skärgårdsmat & stämning sedan 1906, blickat ut över Saxarfjärden; skargardsstiftelsen.se/omraden/grinda — Mitt på ön ligger Grinda Wärdshus",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://grinda.se/mat-fest/framfickan/",
      "org": "grinda.se",
      "vad": "hamnkrog, pizza & lättare rätter, Gästhamnen ligger bara tio simtag bort, endast drop-in",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://grinda.se/mat-fest/lanthandel-cafe/",
      "org": "grinda.se",
      "vad": "Nedanför Grinda Wärdshus ligger vår … Lanthandel med tillhörande cafédel … frukost och enklare luncher",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/grinda/",
      "org": "skargardsstiftelsen.se",
      "vad": "natur- och kulturstig som förbinder norra och södra bryggan; \"Stockholm Archipelago Trail på Grinda\" bjuder på \"en varierad vandring genom skogar, öppna ängar\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/jordbruken-och-angarna/",
      "org": "skargardsstiftelsen.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "Den vackra jugendvillan i sten är ritad av Ernst Stenhammar och stod klar 1908. / Efter 1944 fungerade huset under en tid som behandlingshem och barnkoloni.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/aktuellt/vara-hus-grinda/",
      "org": "skargardsstiftelsen.se",
      "vad": "Henrik Santesson, Nobelstiftelsens första vd, 1906 uppförde den stora sommarvillan",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "Stiftelsen Stockholms skärgård bildas den 20 mars 1959; 1998 skänkte Stockholms stad sina skärgårdsmarker och stiftelsens innehav ökade från ca 7 000 ha till ca 14 000 ha mark; stiftelsen är Stockholms läns tredje största markägare. KÄLLA:  — cirka tvåtusen byggnader i Stockholms skärgård",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/",
      "org": "svenskaturistforeningen.se",
      "vad": "Hotellet erbjuder 28 moderna dubbelrum och två King Size rum / På öns södra sida hittar ni Grinda Sea Lodge, som är ett lite enklare men minst lika charmigt boende. / Frukost ingår i rumspriset eller finns att köpa mot tillägg.",
      "last": null,
      "myndighet": false
    }
  ],
  "finnhamn": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html",
      "org": "lansstyrelsen.se",
      "vad": "föreskrifterna kräver kopplad hund, tillåter eldning endast på anvisade platser, förbjuder tältning längre än två dygn i följd och hänvisar tältning på Idholmen, Stora och Lilla Jolpan till anvisade platser, förbjuder att förtöja båt \"längre tid än två dygn i följd\" på samma plats, att landa luftfarkost utanför anvisad plats och att använda musikanläggning störande",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1974, 103 hektar varav land 100 hektar, Österåkers kommun, Skärgårdsstiftelsen markägare och förvaltare, naturtyper skärgård, ängs- och betesmark, barrskog; omfattar merparten av Kålgårdsön som är östligaste delen av Ingmarsö, Bockholmen söder därom samt ytterligare ett par öar; syftet är att säkra ett område av stort värde för allmänhetens rörliga friluftsliv",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://sl.se/aktuellt/nyheter/sl-biljetter-i-en-del-av-waxholmsbolagets-trafik",
      "org": "sl.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/angso-nationalpark/fakta-om-parken",
      "org": "sverigesnationalparker.se",
      "vad": "Ängsö nationalpark inrättades 1909 (24 maj 1909), ligger i Norrtälje kommun, syfte \"Bevara ett äldre odlingslandskap i väsentligen oförändrat skick\", naturtyp \"Skärgård, ängs- och hagmarker, blandskog\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "waxholmsbolaget.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://finnhamn.se/en/guestharbor/",
      "org": "finnhamn.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://finnhamn.se/ata/",
      "org": "finnhamn.se",
      "vad": "Finnhamns krog är belägen nere vid ångbåtsbryggan … klassisk inriktning på lunchen och en á la carte meny som varierar under säsongen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://finnhamn.se/en/eat/",
      "org": "finnhamn.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/finnhamn/",
      "org": "skargardsstiftelsen.se",
      "vad": "Skärgårdsstiftelsen beskriver Finnhamn som \"ett av de mest välbesökta utflyktsmålen i Stockholms skärgård\"; området har vandrarhem, stugby, tältplatser, flera gästhamnar, bastu, badstrand, kafé och restaurang med takbar, och nås året runt via reguljär skärgårdstrafik",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "På 1910-talet lät kolhandlare Wilhelm Rönström uppföra ett pampigt sommarhus på ön Stora Jolpan. (vandrarhemmet Utsikten, ritat av Ernst Stenhammar)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-finnhamn/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "ingen källa för exakt 12 km, justerat till belagd slinglängd.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Vandrarhemmet och de tillhörande stugorna har totalt 87 bäddar fördelade på 28 rum. / Det vackra, gula huset, står högt och syns långväga.",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": null,
      "myndighet": false
    }
  ],
  "moja": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storo-bocko-lokao.html",
      "org": "lansstyrelsen.se",
      "vad": "skyddat sedan 1972; \"6 045 hektar varav land 1 892 hektar\"; Värmdö kommun; förvaltare Skärgårdsstiftelsen; syfte att \"säkra ett för allmänhetens friluftsliv värdefullt skärgårdsområde samt att skydda och bibehålla områdets värdefulla växt- och djurvärld\"; björk dominerar yttersta öarna, hällmarkstallskog i övrigt; arter svärta, vigg, ejder, roskarl, labb, tobisgrissla",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/moja-bjorndalen.html",
      "org": "lansstyrelsen.se",
      "vad": "skyddat sedan 1992, utvidgat 1998; 143 hektar; Värmdö; förvaltare Skärgårdsstiftelsen; syfte \"bevara och vårda ett för faunan värdefullt skogsområde samt att låta delar av skogsmarken utvecklas mot naturskog\"; hällmarkstallskog, barr- och blandskog, myrmarker; anordningar rast-/övernattningsstuga och torrdass; tältning och eldning förbjuden",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/granholmen.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1978, utvidgat 2018; Storlek: 39 hektar varav land 18 hektar; Värmdö; Skärgårdsstiftelsen; arter blodnäva, småborre, darrgräs, jungfrulin, vildlin och tvåblad; naturhamnen Munkhamnen; tältning högst två dygn per plats",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "Värmdö kommun",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": true
    },
    {
      "url": "https://www.gasthamnsguide.se/",
      "org": "gasthamnsguide.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://konsummoja.se/",
      "org": "konsummoja.se",
      "vad": "Möja Konsumtionsförening driver Coop Berg, \"Den stora butiken på Möja och som har öppet året runt\", samt en obemannad automatbutik i Långvik",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://mojavardshusochbageri.se/",
      "org": "mojavardshusochbageri.se",
      "vad": "genuin och hemtrevlig skärgårdsrestaurang med fullskaligt bageri, Möja bageris historia tar sin början 1951, Bergs by",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.rolandsvenssonmuseet.se/",
      "org": "rolandsvenssonmuseet.se",
      "vad": "Roland Svensson (1910-2003);  — målar- och skrivarhörnorna. Dessa har sedan Rolands bortgång 2003 bevarats i hans gamla ateljé på Tornö och allt är nu flyttat till det nybyggda museet vid Ramsmora ångbåtsbrygga, där även en glasad vägg ger ett vidunderligt perspektiv; Museet öppnade 2014",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/",
      "org": "stockholmslansmuseum.se",
      "vad": "Längs Möjas och Södermöjas östra kust har det funnits skyddade hamnvikar som lockat till sig bebyggelse ända sedan medeltiden; Vid 1800-talets mitt fanns där 74 gårdar; Det goda fisket var basen för försörjningen; jordgubbsodlingen blomstrade från sekelskiftet 1900 och en bit in på 1970-talet; Möja fick fast ångbåtsförbindelse 1906",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/djuro-moja-namdo/moja-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Möja kyrka är från 1768 och uppfördes av byggmästare Carl Örn; Tornet är från 1885; Ingången till tornet har dörrar som är från 1924; renovering påbörjad 1924; altartavla föreställande Kristus på korset med ram från 1700-talets senare hälft; Kyrkogården anlades omkring 1755; nuvarande orgel byggd 1982 av Walter Thür",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "inget boende där",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf",
      "org": "varmdo.se",
      "vad": "klippbad i Långvik, Ramsmora, Löka och Berg; vid Saltvik finns \"både badklippor och sandstrand\"; \"Det finns ett fåtal badplatser... men inga anlagda badplatser\"; gästhamnar i Långvik, Ramsmora, Löka och Kyrkviken; \"Möjaborna är mångsysslare, här finns runt 60 företag\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Möja.pdf",
      "org": "varmdo.se",
      "vad": "Det var troligen under vikingatiden som Möja fick bofast befolkning; Möja nämns som Myghi i Kung Valdemars seglingsbeskrivning från 1200-talet; ön är cirka 6 km lång och 4 km bred; Här finns tre insjöar; landhöjningen 30 - 40 centimeter per hundra år",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/",
      "org": "varmdo.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/",
      "org": "visitmoja.se",
      "vad": "Möja värdshus, Hamnbaren, Les Poissonniers de Möja, Jeppes, Hamncafét, Möja bageri; Hamncafét: \"Café med glass och bullar samt cykeluthyrning\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/vandra/",
      "org": "visitmoja.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitskargarden.se/se-goera/kultur-musik/roland-svensson-museet-paa-moeja.aspx",
      "org": "visitskargarden.se",
      "vad": "museet ligger vid Ramsmora brygga",
      "last": null,
      "myndighet": false
    }
  ],
  "fjaderholmarna": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/kungliga-nationalstadsparken.html",
      "org": "lansstyrelsen.se",
      "vad": "parken inrättades 1995, omfattar 27 kvadratkilometer, sträcker sig \"från Sörentorp och Ulriksdal i norr till Djurgården och Fjäderholmarna i söder\" och \"spänner över tre kommuner: Solna, Stockholm och Lidingö\"; \"Länsstyrelsen samordnar arbetet med parkens förvaltning och utveckling. Kungliga Djurgårdens förvaltning sköter runt 80 procent av marken.\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.explorearchipelago.com/",
      "org": "explorearchipelago.com",
      "vad": "klippbad med utsikt över Stockholms inlopp samt mindre sandstränder;  — klipphällar för sol",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarna.se/",
      "org": "fjaderholmarna.se",
      "vad": "Fjäderholmarnas Krog, Restaurang Rökeriet och Fjäderholmarnas Bryggeri anges som verksamheter på ön, liksom hantverkare (trä, textil, keramik, glas)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://fjaderholmarnasbryggeri.se/",
      "org": "fjaderholmarnasbryggeri.se",
      "vad": "brewpub på Stora Fjäderholmen där ölen serveras direkt från tankarna, pubmeny och ölprovning; huvudproduktionen sker i Bro",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarnaskrog.se/",
      "org": "fjaderholmarnaskrog.se",
      "vad": "Krogen, Hamnbaren och Loftet, bordsbokning online;  — \"modern mat med tydlig anknytning till skärgård och svensk mattradition\", läge vid gästhamnen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.kungligaslotten.se/",
      "org": "kungligaslotten.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/",
      "org": "lidingo.se",
      "vad": "Röda stugan (förr kallad Grå stugan) från 1700-talet. Det är den enda återstående byggnaden från Stora Fjäderholmens äldre sjöfartsepok. / Det faluröda panelade lilla timmerhuset har bland annat fyrspröjsade fönster och karaktäristiska korta taksprång. / I väster ligger Röda villan, förr kallad Gröna villan, i dag den enda återstående av de byggnader som uppförts på 1890-talet.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "lidingo.se",
      "vad": "Fjäderholmarna, som består av de fyra öarna Fjäderholmen, Ängsholmen, Libertas och Rövarns holme; öarna ligger inom Lidingö stads område och ingår i Kungliga nationalstadsparken",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguide.se/",
      "org": "maringuiden.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.naturkartan.se/sv",
      "org": "naturkartan.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.stadtillstrand.se/",
      "org": "stadtillstrand.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/",
      "org": "Strömma",
      "vad": "Avgår från: Strandvägen & Nacka Strand; Strandvägen - Kajplatsområde 13; Enkel resa: 170 kr | Tur och retur: 205 kr; Endast 30 minuters båtresa från city; ÅTER MAJ 2027; När du har bokat en viss avgång har du förtur på den; hundar måste hållas kopplade … enligt Lidingö kommuns lokala ordningsföreskrifter",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/se/",
      "org": "svenskagasthamnar.se",
      "vad": "toalett, eluttag och färskvatten är obockade);  (\"Dusch | Färskvatten | Restaurang | Lokaltrafik | Drivmedel\", utan WC);  (Sjömacken & Gästhamnskontor)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget linje 2",
      "vad": "2A STOCKHOLM — HÖGANÄS — VAXHOLM, gäller 2 april–18 juni och 17 augusti–12 december 2026; Fjäderholmarna angörs på vissa turer med X = trafikeras utan fast avgångstid . Waxholmsbolaget, Alla SL-biljetter gäller mellan 44 bryggor,  — Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd; SL-biljetter gäller endast på de linjer som går via Vaxholm . Tidigare källa ResRobot är ingen operatör och är struken.",
      "last": "2026-09-21",
      "myndighet": false
    }
  ],
  "ljustero": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html",
      "org": "lansstyrelsen.se",
      "vad": "Brännholmen är udden vid nordöstra spetsen av reservatet och här kan du bada, tälta och fiska. Klipporna mot havet är mjukt slipade av inlandsisen och randiga av bergarterna svart diabas och ljusröd fältspat. / På Brännholmen finns ett gammalt självföryngrande idegransbestånd.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.osteraker.se/download/18.367d658917909e8fc2b5172/1628586891118/Ljusterö_planprogram_Hela_Lågupplöst.pdf",
      "org": "osteraker.se",
      "vad": "Det finns två geologiska skyddsobjekt på Ljusterö, nämligen ett stråk av urkalksten längs norra stranden av Östra Lagnö och ett mindre åsparti vid Skogshult, där utsiktspunkten Ljusterö Huvud ligger. De dominerande bergarterna i kommunen utgörs av gnejser och gnejsgraniter. Till de äldsta formationerna hör leptitgnejserna som bland annat är särskilt framträdande på Västra och Östra Lagnö.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/",
      "org": "Trafikverket",
      "vad": "Ljusteröleden går mellan Östanå och Ljusterö; Överfartstiden är sju minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-08-24",
      "myndighet": true
    },
    {
      "url": "https://badplats.nu/osteraker/linanasbadet/",
      "org": "badplats.nu",
      "vad": "badplatsen heter Linanäsbadet (Dyviksrundan), ej Linanäsbryggan",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/",
      "org": "explorearchipelago.com",
      "vad": "varken öppettider eller säsong gick att läsa. Adressen Långsjöängen 20 bekräftas av  priser publiceras inte.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://klintsundetmarina.se/",
      "org": "klintsundetmarina.se",
      "vad": "juni \"Alla dagar 10 - 18\", juli \"Alla dagar 10 - 18\", augusti \"alla dagar 11 - 16\", september helger 11–16. Kajak från 370 kr/halvdag (2026).",
      "last": "2026-08-24",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/",
      "org": "linanasbryggan.se",
      "vad": "varmrätter 255–285 kr (2026); \"RESTAURANGEN … Open everyday from 11.00-21.00\"; \"Vi kommer hålla öppet fredag till söndag fram till 29e september. Kom och var med oss till slutet. Så ses vi igen i april.\"; huvudmenyn har \"Julbord 2026\".",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/meny-4",
      "org": "linanasbryggan.se",
      "vad": "varmrätter 255–285 kr",
      "last": "2026-08-24",
      "myndighet": false
    },
    {
      "url": "https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html",
      "org": "osteraker.se",
      "vad": "Ljusterö är en av de största öarna i den mellersta delen av Stockholms skärgård; sommartid vistas det nästan 20 000 personer på ön",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.osteraker.se/subsitegrundskolor/ljusteroskola.html",
      "org": "osteraker.se",
      "vad": "Ljusterö skola, kommunal grundskola på ön",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://restaurangljusterotorg.se/",
      "org": "restaurangljusterotorg.se",
      "vad": "priser publiceras inte online, därför ingen siffra",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/ostra-lagno/",
      "org": "skargardsstiftelsen.se",
      "vad": "Östra Lagnö är ett lättillgängligt naturreservat på Ljusterös östra sida där släta havsklippor, strandängar och skogsstigar möter utsikten över Svartlögafjärden. / Hit tar du dig med bil eller SL-buss via färjan till Ljusterö. Från Lagnö by är det en kort promenad till reservatet.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/osteraker/ljustero-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Norra Ljusterö fick sitt första kapell under 1600 talet, möjligen redan på 1500 talet; Mot slutet av 1800 talet ... omgestaltades kapellet helt till dagens kyrka; vit åttkantig träkyrka vid Mellansjö, ca 3 km från färjeläget",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vandrarhemskartan.se/",
      "org": "vandrarhemskartan.se",
      "vad": "",
      "last": null,
      "myndighet": false
    }
  ],
  "dalaro": [
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus",
      "org": "sfv.se",
      "vad": "uppfört \"under åren 1787–88\" efter Erik Palmstedts ritningar; \"ett av en handfull tullhus som är statligt byggnadsminne\"; Haninge kommun använder det som turistbyrå och skärgårdsmuseum",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/dalaro-skans",
      "org": "sfv.se",
      "vad": "man beslöt 1656 att på Stockskäret anlägga en skans; 1683 ritade generalkvartermästaren Erik Dahlbergh ett förslag; Först 1698 påbörjades arbeten ... ända till 1724 innan skansen var försvarsduglig; 1854 upphörde den att räknas till rikets fasta försvar",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/",
      "org": "sfv.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.dalaro.se/",
      "org": "dalaro.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.dalarohembygd.se/Aretvarx/Aret%20var%20kronologi.pdf",
      "org": "dalarohembygd.se",
      "vad": "1675 Per Eriksson utses till Sveriges första lotsåldersman, med placering på Dalarö; 1770 Kungligt postkontor, med egen postmästare, Lars Filéen inrättas på Dalarö den 14 mars; 1858 Elektrisk telegraflinje mellan Stockholm - Dalarö invigs; 1844 Inrättades den första skolan i hyrd lokal",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguiden.se/sv/",
      "org": "gasthamnsguiden.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/",
      "org": "haninge.se",
      "vad": "Dalarö är lots- och tullsamhället som sedan blev badortsidyll; snirkliga gator, gränder och villor med snickarglädje i schweizisk anda; Strindberg kallade det porten till paradiset",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/besok-och-upplev-haninge/sevardheter/dalaro-skeppsvraksomrade/",
      "org": "haninge.se",
      "vad": "omkring 30 registrerade fartygslämningar från 1600- till 1900-talet, varav tre gjorts tillgängliga för dykning; all dykning måste ske från båt; tillstånd krävs från Dalarö Dykpark före varje dyk; dykguide håller en kulturhistorisk genomgång före dyket; förbjudet att dyka över skrovet; minst en meters säkerhetsavstånd till fartygslämningen",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/",
      "org": "haninge.se",
      "vad": "all dykning ska ske från båt, tillstånd krävs före varje dyk, dykguide håller kulturhistorisk genomgång, förbjudet att dyka över skrovet",
      "last": "2026-09-20",
      "myndighet": false
    },
    {
      "url": "https://vandrarhemmetlotsen.se",
      "org": "smadalarogard.se",
      "vad": "",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/",
      "org": "stockholmslansmuseum.se",
      "vad": "ångbåtstrafik till Stockholm 1852; \"Vid slutet av 1800-talet och början av 1900-talet blev det populärt bland stockholmare som hade råd att bygga sommarhus\"; \"Kända konstnärer som Anders Zorn arbetade och kopplade av på Dalarö\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/historik-dalaro-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "kyrkan uppfördes 1649–1652 som kapell; \"Fram till 1780-talet behöll kapellet sin form, en rektangulär knuttimrad byggnad med sadeltak och sakristia i norr\"; ombyggnad 1786–1787 då \"väggarna höjdes och brädfodrades, taket fick sin brutna form\"; restaurering 1936 av arkitekt Einar Lundberg; kyrkan och Sandemar var de enda byggnader som inte brändes av ryssarna 1719",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vrak.se/utforska/vrak-och-lamningar/1600-talet/riksapplet",
      "org": "vrak.se",
      "vad": "Fartyget byggdes på flottans varv vid Stigberget i Göteborg och var färdigt 1663; längd 48 meter, bredd 12 meter; i storm 5 juni (1676) slet sig skeppet från sina förtöjningar, grundstötte och sjönk på 16 meters djup; djup 7–16 meter",
      "last": null,
      "myndighet": false
    }
  ],
  "arholma": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html",
      "org": "lansstyrelsen.se",
      "vad": "förvaltare Skärgårdsstiftelsen, markägare Skärgårdsstiftelsen, staten och privata; \"lek- och uppväxtplatser för fisk\"; mjuka lerbottnar, skärgårdsgrund och sandbottnar; öarna hyser flera häckande rovfåglar; lundmiljöer med rik kärlväxt- och svampflora",
      "last": "2026-08-23",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/arholma-nord",
      "org": "sfv.se",
      "vad": "anläggningen stod färdig 1968; bergrum \"i fyra nivåer\" med \"stridsledningscentral, kraftaggregatsrum, verkstäder, logement, kök med kantin, sjukvårdrum och operationssal\"; ca 110 man; 10,5 cm kustartilleripjäs; sista kanonskottet 1992; statligt byggnadsminne våren 2007; SFV tog över förvaltningen 2008",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://sfv.se/upptack-mer/kulturvarden/sok-innehall/kulturvarden-2-2020/en-hallbar-utpost",
      "org": "sfv.se",
      "vad": "vattenbristen 2018; vattnet tas \"direkt från Östersjön och filtreras, avsaltas, renas och mineraliseras\", anläggningen placerad i bergrum; Arholma Nord har \"totalt 75 bäddar, utspridda på sex hus\"; \"Större delen av ön är naturreservat\"; cirka 50 personer bor permanent på ön",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/arholma-bak/",
      "org": "sjofartsverket.se",
      "vad": "byggdes 1768 av hovjunkaren Pehr Ridderstad från Rådmansö; ett runt, 12,5 meter högt stentorn med koniskt tak; ritad av Carl Johan Cronstedt (1709–1777), som även konstruerade den svenska kakelugnen; Den är en så kallad känningsbåk och har aldrig haft fyrljus. Sjömärket syns cirka 15 nautiska mil; fungerade också som lotsutkik fram till 1875; Under kriget mot Ryssland 1809 fungerade båken som en av många optiska telegrafstationer; Under andra världskriget 1939-45 inrymde båken också en signalstation med en underliggande stridsledningscentral; statligt byggnadsminne sedan 1935",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/arholma/",
      "org": "stockholmslansmuseum.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.arholma.nu/resa-hit",
      "org": "arholma.nu",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/",
      "org": "arholmahandel.se",
      "vad": "åretruntöppen butik; livsmedel, nybakat bröd och produkter från lokala producenter; bensin, diesel, gasol och kemtekniska varor; ombud för apotek och Systembolaget, postservice, cykeluthyrning, stuguthyrning; bryggcafé sommartid",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/cykeluthyrning/",
      "org": "arholmahandel.se",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": false
    },
    {
      "url": "https://arholmanord.se/",
      "org": "arholmanord.se",
      "vad": "Vandrarhem, restaurang, guidade turer och aktiviteter i egen havsvik på Arholma i Stockholms norra skärgård",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://blidosundsbolaget.se/norra-batlinjen/",
      "org": "blidosundsbolaget.se",
      "vad": "avgång från \"Norrtälje hamn, längst bort på Norrtälje hamnpromenad, vid bron Havslänken\"; destinationer Lidö och Arholma; fartyget M/S Rex; sommarsäsong",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguide.se/",
      "org": "gasthamnsguide.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/",
      "org": "norrtalje.se",
      "vad": "Anläggningen byggdes för Kalla kriget och stod klar 1968; På ön Arholmas norra spets och gömd i berget; Den visas av säkerhetsskäl endast genom guidade turer",
      "last": "2026-09-20",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/arholma/",
      "org": "skargardsstiftelsen.se",
      "vad": "landskapet brukats i hundratals år; åkrar, strandängar, hagmarker och skogspartier; på Arholma är kor våra bästa naturvårdsarbetare, de hjälper till att hålla markerna öppna; Bull-Augusts gård är en klassisk roslagsgård som idag fungerar som vandrarhem",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.smhi.se/",
      "org": "smhi.se",
      "vad": "kontrollera prognos före sjöresa",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-arholma/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Arholma markerar den nordligaste punkten på den 270 km långa Stockholm Archipelago Trail; etappen anges som Medel 13.4 km; start vid kajen på Arholma; leden passerar Bull-Augusts gård, kyrkan och båken",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-arholma-bull-august-gard/",
      "org": "svenskaturistforeningen.se",
      "vad": "Arholma Handel-Stuguthyrning maj–september; roslagen.se — Arholma Nord",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "orno": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html",
      "org": "lansstyrelsen.se",
      "vad": "reservatet på norra Ornö i Haninge kommun, skyddat 2024, 389 ha varav 360 ha land; \"långsamväxande hällmarkstallskog, kala bergspartier, grövre barrblandskog, sumpskogar och våtmarkspartier\"; \"Stor del av Nybysjön med god vattenkvalitet ligger i reservatet\"",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html",
      "org": "lansstyrelsen.se",
      "vad": "Med start vid Sundby gård finns en drygt sex kilometer lång, lättvandrad rundslinga. På grusvägar och stigar går du igenom naturreservatets uråldriga odlingslandskap. Slingan är till stora delar tillgänglig för barnvagn eller rullstol, men tyvärr inte hela vägen runt. Här har marken brukats sedan 1400-talet.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade",
      "org": "lansstyrelsen.se",
      "vad": "De största gruvorna var Härsbacka i Österåkers kommun och Lugnet på Ornö i Haninge kommun. / Ornö, Lugnets fältspatsbrott ... Ett av länets största fältspatsbrott.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-och-lilla-sandbote.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1938 Storlek: 21 hektar ... Markägare: Skärgårdsstiftelsen / En av de gamla stugorna är ett fiskartorp från 1700-talet som byggts upp efter en brand 2001 efter originalritningar och med gamla metoder och ställts i ordning som museum. Invid hamnen visas även ett båtbyggarmuseum. / Öarna donerades till Naturskyddsföreningen 1941 av Anna Lindhagen ... Anna hade fått området naturminnesförklarat redan 1938.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/",
      "org": "haninge.se",
      "vad": "Kyrkviken är \"Ornös nav\" med \"museum, bibliotek, gästbryggor och cykeluthyrning\"; utställning i Sockenstugan; cykeluthyrning även i Brunnsviken",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/",
      "org": "haninge.se",
      "vad": "sevärdheter: \"orkidéerna vid Mane äng\", \"gravfält från bronsåldern vid Hässelmara\", \"ruinerna efter öns första säteriet\", \"bergarter på Ornöhuvud\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ornosjotrafik.se/",
      "org": "ornosjotrafik.se",
      "vad": "Avgår från Hässelmara brygga på Ornö och Hotellbryggan på Dalarö, Överfarten tar ca 30 minuter; publicerad turlista gäller 27/4–13/9 2026 och ingen vintertidtabell hittades vid granskningen. KÄLLA: stockholmarchipelagotrail.com/sv/section/etapp-orno — Du åker till Hässelmara på Ornö från Dalarö året om.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ornosjotrafik.se/turlista-fran-dalaro/",
      "org": "ornosjotrafik.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ornoskargardshotell.se/",
      "org": "ornoskargardshotell.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-orno/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Det är en ö med ungefär 300 bofasta året om. / Ornö har vackra skogar, klipphällar, orkidéer, tolv injöar och två naturreservat. / Under 1500-talet fanns ett 30-tal gårdar och torp, under 1800-talet hade dessa mer än fördubblats. 1719 brändes mer eller mindre hela Ornö ner under Rysshärjningarna. / Under tidigt 1900-tal styckade och sålde Sundby Säteri mark för fritidsboende.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/orno-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Det första kapellet på ön uppfördes troligen redan vid 1300-talets slut; En större kyrka uppfördes 1652 i för dåtiden modern stil; en vacker träkyrka med spännande historia",
      "last": null,
      "myndighet": false
    }
  ],
  "landsort": [
    {
      "url": "https://www.landsort.com/:s",
      "org": "landsort.com",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html",
      "org": "lansstyrelsen.se",
      "vad": "Bybebyggelsen som äger betydande kulturhistoriska och miljömässiga värden är koncentrerad till Storhamn på öns södra del, där även lotsplatsen och fyren ligger; förbjudet med okopplad hund, att tälta och elda annat än på anvisade platser, att skada fasta naturföremål och att plocka blomman nattviol; anordningar: informationstavla, rast-/övernattningsstuga, stig, toalett, tältplats och vandringsled",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard",
      "org": "sfv.se",
      "vad": "lotsningen har \"gamla anor och kan vara en av de äldsta i landet\"; Gustav Vasa lär ha anlitat lotsen Anders Bertilsson på 1530-talet; de flesta yrkesverksamma var \"lotsar, fyrtjänstemän, tullare och telegrafister\" (2026-09-14)",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/",
      "org": "sjofartsverket.se",
      "vad": "the oldest Swedish-built lighthouse; Electrified in 1938; Automated and demanned in 1963 (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/",
      "org": "sjofartsverket.se",
      "vad": "The present lighthouse was built in 1686; metre-thick walls; The Russians turned up in 1719 and set fire to Landsort; Landsort is located on the island of Öja, some 90 km south of Stockholm; beskrivs som one of the most substantial lighthouses that we have in Sweden",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/landsort",
      "org": "waxholmsbolaget.se",
      "vad": "Landsort är Waxholmsbolagets sydligaste destination. Här hittar du vacker natur, badklippor och Sveriges allra äldsta fyr. (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.gasthamnsguide.se/",
      "org": "gasthamnsguide.se",
      "vad": "Landsorts Gästhamn, Stockholms södra skärgård (2026-09-03)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://landsort-birds.se/pages/skada-pa-landsort.php",
      "org": "landsort-birds.se",
      "vad": "över 300 fågelarter noterade; sibiriska felflyttare som tajgasångare och kungsfågelsångare; \"Nuförtiden besöks ön nästan dagligen av fågelskådare\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://landsort-birds.se/pages/foreningen.php",
      "org": "landsort-birds.se",
      "vad": "fågelstationen bedriver ringmärkning och har guidningar och program för besökare (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://landsort.com/saltboden/",
      "org": "landsort.com",
      "vad": "Här kan du handla livsmedel, ta en kopp kaffe med dopp, äta en god bit mat eller dricka något svalkande från vår mysiga pub; ligger i den södra delen av Landsort, mitt i byn (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "http://www.landsort.com/?page_id=138",
      "org": "landsort.com",
      "vad": "1820 övergång till rovoljelampor med försilvrade speglar; 1839 staten inlöser fyren och Mauritz Enegren blir första fyrmästare; 1844 antas Sofia Charlotta Löfström som kvinnligt biträde; 1870 påbörjas ombyggnad med konisk fyr ovanpå stenfyren; 1909 monteras Lux-brännare",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/landsort",
      "org": "nynashamn.se",
      "vad": "20 bofasta på ön, men sommartid mångdubblas ofta befolkningen; ön har tre hamnar — Österhamn, Västerhamn och Norrhamn; Batteri Landsort är en underjordisk försvarsanläggning från kalla kriget, nu ett museum; Hela ön är naturskyddsområde; På Landsorts fågelstation dokumenteras och ringmärks över 12 000 fåglar varje år",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitlandsort.se/resa-till-landsort/",
      "org": "visitlandsort.se",
      "vad": "Buss 852 till Torö, sista hållplatsen Ankarudden. Alla båtturer passar bussen; Waxholmsbolaget/Landsortstrafiken AB trafikerar Landsort . Båtbenet ~30 min uppmätt mot ResRobot 2026-08-05: färja 29-1 Ankarudden 07:20 → Landsort 07:50 (inte ~1 h som stod här tidigare).",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://visitskargarden.se/",
      "org": "visitskargarden.se",
      "vad": "Landsorts Stugor AB (1–4 pers, året runt;  Landsorts Vandrarhem (4 hus, 26 bäddar, året runt; landsortsvandrarhem.se), Lotstornet (6 dubbelrum, restaurang Svedtiljas",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "furusund": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/furusundsfjarden.html",
      "org": "lansstyrelsen.se",
      "vad": "reservatet omfattar öarna Stor-Asken, Lill-Asken och Stumpen \"belägna tre kilometer nordost om Furusund\"; skyddat sedan 1974; \"373 hektar varav land 24 hektar\"; förvaltare Länsstyrelsen; syftet är att \"bevara ett oexploaterat område av innerskärgården av värde för friluftslivet\"; Natura 2000-område (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård; Färjeledens längd är 600 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/furusundsleden",
      "org": "trafikverket.se",
      "vad": "vägfärja mellan Furusund och Yxlan, 600 meter (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://furusund.se/hamnen/",
      "org": "Furusund Hamn",
      "vad": "I vår gästhamn finns plats för upp till hundra båtar, med toaletter, duschar, bastu, el, vatten och tvätt",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.furusund.se/hamnen/",
      "org": "furusund.se",
      "vad": "gästhamnen har \"Gästplatser: 100\" och grunddjupet anges till 2–3 meter enligt sjökort 111 SW; elanslutningen är 10 ampere (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://furusundshamnkrog.se/gasthamn",
      "org": "furusundshamnkrog.se",
      "vad": "ingen bränsleförsäljning listad",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/historia/",
      "org": "Hotell Furusund",
      "vad": "August Strindberg kom till Furusund sommaren 1899, hitlockad av sin syster och svåger; På Furusund kom Strindberg även att vistas med tid med Harriet Bosse i villan Isola Bella; Strindbergs verk från 1902 kallade Furusund Fagervik och grannön Köpmanholm Skamsund (2026-09-14)",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/kontakt/",
      "org": "hotellfurusund.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/",
      "org": "hotellfurusund.se",
      "vad": "boutiquehotell med 16 rum, restaurang, året runt; visitskargarden.se/boende/hotell/hotell-furusund",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "etappen \"Furusund\" anges som \"Medium, 7.2 km\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/furusund/",
      "org": "stockholmslansmuseum.se",
      "vad": "Furusund blev på 1800-talet en populär badort som lockade dåtidens kändisar; Den förmögne juveleraren Christian Hammer köpte Furusund 1883. Här skapade han en modern badort. Han lät bygga sommarvillor som fick romantiska namn och ett varmbadhus; Kanske förknippas Furusund mest med August Strindberg. Han hyrde en villa här under sitt äktenskap med Harriet Bosse. Strindberg hämtade många motiv från Furusund. I 'Fagervik och Skamsund' stod Fagervik för Furusund och Skamsund för grannorten Köpmanholm på Yxlan; Telegrafstationen från 1837 är den enda bevarade i Sverige",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/",
      "org": "Översiktsplan 2050",
      "vad": "Furusund representerar en tidstypisk sommarnöjesort. Många byggnader är bevarade från storhetstiden från 1880 fram till första världskriget. (2026-09-14)",
      "last": null,
      "myndighet": false
    }
  ],
  "blido": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html",
      "org": "lansstyrelsen.se",
      "vad": "karakteristiska arter: \"rosettjungfrulin, liten blåklocka, vildlin\", \"hundratals Adam och Eva\", \"låsbräken, solvända, darrgräs, ormtunga, majviva och kärrspira\"; hällmarkstallskog i östra och västra delarna, blandskog med ek, asp och hassel mellan bergsryggarna; \"Fågellivet är rikt med bland annat häckande sjöfågel\" (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/salskaren.html",
      "org": "lansstyrelsen.se",
      "vad": "reservatet ligger mellan Blidö och Svartlöga i Norrtälje kommun; \"Skyddat sedan: 1973\"; \"Storlek: 76 hektar varav land 5\"; förvaltare Skärgårdsstiftelsen; syftet är att \"trygga en ögrupp för allmänhetens friluftsliv samt skydda en värdefull häckningsbiotop för sjöfågel\"; \"Vegetationen på öarna skall i princip lämnas för fri utveckling\" (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batsmanstorpet--blido-sockens-hembygdsforening/",
      "org": "Norrtälje kommun",
      "vad": "Båtsmanstorpet från 1730-talet på Blidö är inrett som det såg ut på den siste båtsmannens tid; Bromskärsvägen 2, Oxhalsö; Hösten 2021 invigs en Bagarstuga samt Silversmedens hus med utställningar och aktiviteter kopplade till Yngve Bergers konstnärskap; Sommartid arrangeras aktiviteter som byavandringar, utställningar m m.",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000444777",
      "org": "Riksantikvarieämbetet",
      "vad": "En ny kyrka började uppföras år 1856 runt det gamla kapellet som revs först ett år senare. Invigningen förrättades år 1859. Den nya kyrkan ritades av arkitekten Ludvig Hedin.; salkyrka med enskeppigt långhus av sten och tegel; Fasaderna är putsade och gult avfärgade, tidigare vita; Sadeltaket täcks av skiffer (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård; Färjeledens längd är 600 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/",
      "org": "Trafikverket",
      "vad": "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård; Färjeledens längd är 530 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.hembygd.se/blido/about",
      "org": "Blidö sockens hembygdsförening",
      "vad": "Hembygdsgården består alltså av fyra hus: Båtsmanstorpet, fähuset, Silversmedens hus och Bagarstugan; fähuset är en så kallad 'en ko-ladugård', som var avsedd just för en ko",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguide.se/",
      "org": "gasthamnsguide.se",
      "vad": "gästhamnen kunde inte bekräftas",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.havochvatten.se/",
      "org": "havochvatten.se",
      "vad": "EU-bad; \"Sandstrand samt långgrunt badvatten\"; \"Dass på badplatsen, Lekutrustning samt grillplats\"; två flytbryggor; badvattenklassificering 2025 \"Utmärkt kvalitet\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/",
      "org": "Köpmanholms skola",
      "vad": "Här går cirka 35 elever; skolan är en F–6-skola på adressen Lilltorpsvägen 33, 760 18 Yxlan, och beskrivs som omgiven av öarna Furusund och Blidö med närhet till både skog och hav (2026-09-14)",
      "last": null,
      "myndighet": false
    }
  ],
  "gallno": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html",
      "org": "lansstyrelsen.se",
      "vad": "Skyddat sedan: 1978, utvidgat 2017 och 2024; syftet är att bevara ett skärgårdsområde av stor betydelse för allmänhetens friluftsliv med ett skyddsvärt, kulturpräglat skärgårdslandskap; genuin skärgårdsmiljö med levande jordbruk (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/karklo.html",
      "org": "lansstyrelsen.se",
      "vad": "Karklö naturreservat bildat 2017, \"123 hektar varav land 59 hektar\", förvaltare Skärgårdsstiftelsen; \"Vid Vambö och Kolfatet gränsar reservatet till Gällnö naturreservat i sydost\"; i reservatet står \"en grov döende ek, troligen upp emot 300 år gammal\"; anordningar: bad/badplats och stig (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/gallno",
      "org": "waxholmsbolaget.se",
      "vad": "Gällnö är ett av Waxholmsbolagets resmål med egen bryggsida (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/",
      "org": "waxholmsbolaget.se",
      "vad": "prislistan renderas med JavaScript och kunde inte hämtas; inget belopp",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://gallno.se/",
      "org": "gallno.se",
      "vad": "på ön finns Gällnö krog (\"Till vår sommaröppna krog kommer man för att äta en bit mat, sippa på ett glas vin\"), Handelsboden, vandrarhem (STF) och Hotell Frans August (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gallno.se/oppettider/",
      "org": "gallno.se",
      "vad": "öppettider för krog och handelsbod varierar kraftigt utanför högsäsong. Kontrollerad 2026-09-03.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gallno.se/gallno-krog/",
      "org": "gallno.se",
      "vad": "verksamheten heter Gällnö krog (bar ingår); ingen publicerad prislista. Kontrollerad 2026-09-03.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gallno.se/handelsboden/",
      "org": "gallno.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/gallno-karklo/",
      "org": "skargardsstiftelsen.se",
      "vad": "Gällnö by beskrivs med \"rödmålade hus, båthus och bodar under knotiga äppelträd, med utsikt över Hemfladen\"; ön ligger i mellersta skärgården mellan Värmdö och Möja (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "tältplats vid Torsviken",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "norrora": [
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora",
      "org": "Waxholmsbolaget",
      "vad": "ligger i den vackra Svartlögafjärden, precis utanför Furusund; Saltkråkan är framför allt inspelat på Norröra. Där ligger till exempel det bostadshus som i tv-serien kallades Snickargården, det hus som farbror Melker först hyrde och sedan köpte; Från Norröra kan du även enkelt ta dig över till Söderöra — båtturen tar bara 10 minuter … Framför allt vinterscenerna spelades in på ön",
      "last": "2026-09-21",
      "myndighet": true
    },
    {
      "url": "https://www.norrora.se/saltkrakan/",
      "org": "Norröra samfällighetsförening",
      "vad": "Sommaren 1963 förverkligades Astrid Lindgrens manuskript för TV; Det var Artfilms producent Olle Nordemar och regissör Olle Hellbom som fann att Norröra och Söderöra bäst motsvarade idén om Saltkråkan; ångbåten hette egentligen 'Valkyrian' och var byggd 1909 och skulle just huggas upp; filmfolket bodde på 'Panget', klippte film i 'Stallet'; de 6 timmar och 15 minuter som de 13 avsnitten kom att ta i TV; fick 7 000 svar; Premiären var i januari 1964",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.norrora.se/historia/",
      "org": "Norröra samfällighetsförening",
      "vad": "Numera finns cirka 130 hushåll på ön sommartid, men endast ett par familjer bor här året runt; byn brändes den 11 juli 1719 när ryssarna härjade Roslagen . Norröra samfällighetsförening, Grönområden, vägar och brygga,  — Syftet är också att stränderna ska vara allmänt tillgängliga; 4 km grusvägar … totalt på ön ca 7 km stigar som är röjda … (för gående, ej rullstolar eller barnvagnar) . Waxholmsbolaget: Det finns varken livsmedelsbutiker eller restauranger på öarna",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget linje 26",
      "vad": "26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA, gäller 2 april–18 juni och 17 augusti–1 november 2026; Strömkajen 08.45 → Norröra 12.15 (3 h 30), 10.00 → 13.10 (3 h 10) . Waxholmsbolaget: Under våren, sommaren och hösten kommer du till Norröra och Söderöra genom att åka från Strömkajen … Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget linje 28",
      "vad": "28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA, gäller 2 april–18 juni och 17 augusti–30 september 2026; Furusund 10.05 → Köpmanholm (Yxlan) 10.07 → Norröra 10.45 (b = beställs) . SL buss 632 Norrtälje–Yxlan,  — hållplatser Furusunds färjeläge och Köpmanholm",
      "last": "2026-09-21",
      "myndighet": false
    }
  ],
  "nattaro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html",
      "org": "lansstyrelsen.se",
      "vad": "Nåttaröfladen har med sina många små kobbar och skär ett rikt fågelliv ... För att skydda fågellivet råder tillträdesförbud mellan 1 februari och 15 augusti. / föreskrifterna räknar upp bland annat Östra Rödko, Långholmen, Grönborgen, Båten, Vittskär, Gjusskär, Brandholmen, Björkskär, Boskär, Rönnkobben, Tärnkobben och Grenkullen",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/",
      "org": "haninge.se",
      "vad": "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig / Runt berget finns ryssugnar från härjningarna 1719 / På ön strövar även dovhjortar vilt.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/",
      "org": "nattaro.se",
      "vad": "exakt trafikperiod ej bekräftad hos Waxholmsbolaget)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/boende/praktisk-information-om-vistelsen-pa-nattaro/",
      "org": "nattaro.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/boende/vandrarhemmet/",
      "org": "nattaro.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/boende/",
      "org": "nattaro.se",
      "vad": "vandrarhemmet fyra hus (Röda Villan, Annexet, Västan, Östan) 32 bäddar, ca 50 stugor, dygnscamping på anvisad plats; skargardsstiftelsen.se/omraden/nattaro",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/gasthamn/",
      "org": "nattaro.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/nattaro/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Nåttarö ligger i Stockholms södra skärgård mellan Utö och Landsort. / Nåttarö är också en perfekt plats för höstsurfing.",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Är du äventyrlig och stark kan du ta dig längs grusvägen norrut (1,5 km) förbi Drottninggrottan till Nåttarö Storsand. En fin plats att upptäcka och där det är långgrunt. / Vid Ångbåtsbryggan möter du skärgårdsidyllen direkt. Vid kajkanten är det en fin badstrand.",
      "last": null,
      "myndighet": false
    }
  ],
  "ingmarso": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html",
      "org": "lansstyrelsen.se",
      "vad": "reservatet utgörs till största delen av Kålgårdsön, \"den östligaste delen av Ingmarsö\", jämte Bockholmen i söder och ytterligare några öar i Österåkers kommun; bildat 1974; 103 hektar varav 100 hektar land; Skärgårdsstiftelsen är både markägare och förvaltare; \"Ändamålet med reservatet är att säkra ett område av stort värde för allmänhetens rörliga friluftsliv\" (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.ingmarso.se/",
      "org": "ingmarso.se",
      "vad": "runt 180 bofasta; Coop Ingmarsö med året runt-öppet ligger vid södra bryggan; gästhamnen är Centralt belägen på Södra Ingmarsö med gångavstånd till krog, affär och bageri",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/hittahit",
      "org": "ingmarso.se",
      "vad": "Båt hela vägen från stan tar mellan två och cirka tre timmar; Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda; Till bryggan på norra Ingmarsö går reguljära turer från Åsättra på Ljusterö",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/kultur",
      "org": "ingmarso.se",
      "vad": "Ingmarsö Brottö Hembygdsmuseum presenterar en tidslinje från vikingatiden till nutid, inklusive skola, missionshus, jordgubbsodlingar och pensionat; jordbrukslandskapet präglas av \"små, flikiga betesmarkerna och vallarna\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/vi-p%C3%A5-%C3%B6n",
      "org": "ingmarso.se",
      "vad": "Ingmarsö har ett väl fungerande räddningsvärn med 9 frivilliga brandmän; skolverksamhet har bedrivits på ön i över hundra år, skolan är för närvarande inte i full drift medan förskolan tar omkring fem barn och äldre elever går på Svartsö och Ljusterö (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/:",
      "org": "ingmarso.se",
      "vad": "Deli — Restaurang — Catering, öppet morgon till sen kväll, serverar frukost/lunch/middag/pizza/fika; ingmarsogasthamn.se: bageriet ligger ca 1,5 km från södra bryggan",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/att-g%C3%B6ra:",
      "org": "ingmarso.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.ingmarsobnb.se/",
      "org": "ingmarsobnb.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://ingmarsogasthamn.se/:",
      "org": "ingmarsogasthamn.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ingmarsokrog.com/:",
      "org": "ingmarsokrog.com",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/roddbatar-finnhamn-ingmarso/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "sträckan anges som \"Lätt 0.4 km\"; \"Det måste alltid finnas en roddbåt på varje sida.\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "etappen anges som \"Medel 9.8 km\" och förbinder bryggorna Ingmarsö Norra och Ingmarsö Södra via stigar och grusvägar, genom öppna ängar och skog och förbi flera insjöar samt Femsundsbadet; delar av leden beskrivs som tekniska och rekommenderas inte för den med begränsad rörlighet (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/news/ingmarso-rowboats-finnhamn/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": null,
      "myndighet": false
    }
  ],
  "namdo": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "lansstyrelsen.se",
      "vad": "I nationalparken finns 1 353 öar, kobbar och skär och ett större havsområde längst österut; förvaltare Länsstyrelsen i Stockholms län; markägare Staten genom Naturvårdsverket; tre större bebyggda öar — Bullerö, Rågskär och Långviksskär — har vandringsleder, rastplatser och tältplatser (2026-09-14)",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/namdo.html",
      "org": "lansstyrelsen.se",
      "vad": "ön ligger i \"södra skärgårdens urkalkstensbälte\", vilket ger en flora rik på ormbunkar och orkidéer; kalkbergen vid Östanvik och skogarna på Nämdö Böte och Skabban är botaniskt värdefulla och hyser signalarter och rödlistade arter (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/",
      "org": "Naturvårdsverket",
      "vad": "Nämdöskärgården blir Sveriges 31:a nationalpark (nyhet 2025-06-23); Den omfattar en areal på 25 300 hektar varav 97 procent är hav; drygt 1 300 öar, kobbar och skär; landets andra nationalpark med marint fokus och den första i Östersjön",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278",
      "org": "Riksantikvarieämbetet",
      "vad": "knuttimrat kapell på Nämdö efter 1607, nytt kapell 1701–1702, kapell vid Östanvik färdigt 1798; \"Nämdö kyrka invigdes hösten 1876\"; stilen är nygotisk med hög takresning, torn och spetsbågade fönster; \"Trästomme, granitsockel samt svartmålat plåttak\"; \"Numera är kyrkan enhetligt vitmålad\"",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/byggabomiljo/skargardnaturochparker/namdoskargardensnationalpark.4.18c983316e0536cb189c3ba.html",
      "org": "Värmdö kommun",
      "vad": "Den 17 juni 2025 röstade riksdagen i frågan, kort därefter beslutade regeringen att Nämdöskärgården blir Sveriges 31:a nationalpark; Nationalparksområdet ligger öster om ön Nämdö; Nationalparken omfattar det som tidigare var Bullerö och Långviksskärs naturreservat samt ett stort område hav utanför",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/namdo",
      "org": "waxholmsbolaget.se",
      "vad": "Nämdö är en av skärgårdens större öar. Ön är promenadvänlig året om; den är både bilfri och till viss del ett naturreservat; Waxholmsbolagets fartyg lägger till vid flera bryggor på ön",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://visitskargarden.se/",
      "org": "Mellersta skärgården/Nämdö",
      "vad": "Tempo Nämdö Livs, livsmedelsbutik, Solvik 201, öppen året runt.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/",
      "org": "Nämdö",
      "vad": "café/restaurangverksamhet i Solvik under sommarsäsongen;  anger att livsmedelsbutiken (Tempo Nämdö Livs) är öppen året runt.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/namdo/",
      "org": "skargardsstiftelsen.se",
      "vad": "Reguljär båttrafik går året runt från Stavsnäs med Waxholmsbolaget. Under sommaren finns även förbindelser från Stockholm och Saltsjöbaden. Sidan nämner varken linjenummer, restid eller Möja.",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-namdo/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "etappen anges som \"Medel 13.1 km\"; rekommenderad start vid Solvik medsols, söderut förbi kyrkan till Sand, västerut längs grusvägen in i skogen till en insjö, vidare till Långvik och norrut till utkiksberget vid Nämdö Böte och Östanvik gård; längs vägen Kyrknäset med \"vackra lämningar\", Skärgårdsmuseet, biblioteket, hembygdsgården och gårdsbutiken; \"ett litet utsiktsberg där du har milsvid utsikt\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.xn--nmdhbf-bua0m.se/hembygdsgard-bibliotek/",
      "org": "xn--nmdhbf-bua0m.se",
      "vad": "Sigfrid Jonsson (1895–1983) var föreningens grundare; \"1977 gav Sigfrid sina två fastigheter till Nämdö Hembygdsförening vilket ledde till att Nämdö hembygdsgård kunde börja byggas\"; hembygdsgården har \"en sal med plats för upp till 80 personer plus ett professionellt utrustat kök\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.xn--nmdhbf-bua0m.se/service-information/",
      "org": "xn--nmdhbf-bua0m.se",
      "vad": "Handlarn i Solvik anges som \"Livsmedelsaffär, bensinstation\"; sjukvårdsbåt från Djurö vårdcentral besöker ön en gång i månaden efter bokning; grovsopfärjan går juni–augusti; återvinningscontainrar finns vid Sand, Solvik och hembygdsgården (2026-09-14)",
      "last": null,
      "myndighet": false
    }
  ],
  "svartso": [
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f79/1649062024749/Svartsö.pdf",
      "org": "varmdo.se",
      "vad": "Svartsö är en av de större öarna i Stockholms skärgård och befolkades troligen under medeltiden. Vid 1500-talets mitt fanns skattegårdar vid Ahlsvik, Skälvik och Svartsö; Ett av de äldsta husen på ön är det vackra stenhuset i Ahlsviks by, som bankokommissarie Johan Söderling lät bygga 1732; Ahlsvik köptes på 1720-talet av bankokommissarien Johan Söderling som lät uppföra en herrgård här 1732. Byggnadsmaterialet togs från tegelbruket på ön Hästnacken vilket han anlagt några år tidigare; Det f d missionshuset är ett av de äldsta missionshusen i skärgården, invigt 1880; Skolan byggdes 1897",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/",
      "org": "waxholmsbolaget.se",
      "vad": "",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "etappen är 17,9 km, \"en liggande åtta\", nås från bryggorna Norra Svartsö, Alsvik, Skälvik och Söderboudd; svårighetsgrad \"Lätt\", \"De knappt arton kilometrarna är för det mesta på vacker grusväg\" (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://svartso.se/",
      "org": "svartso.se",
      "vad": "Svartsö ligger \"cirka 2 distansminuter ost om södra Ljusterö, strax söder om Ingmarsö\", i Värmdö kommun; ön är 8 km lång och 1,5 km bred (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svartso.se/att-gora",
      "org": "svartso.se",
      "vad": "14 km långa grusvägar; Cykel kan du antingen hyra på Svartsö lanthandel (Alsviks brygga) eller Svartsö hotell och vandrarhem",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/hitta-hit/",
      "org": "svartsokrog.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/oppettider/",
      "org": "svartsokrog.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/meny/",
      "org": "svartsokrog.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/om-svartso",
      "org": "svartsolanthandel.se",
      "vad": "omkring 65 personer permanent på Svartsö; på ön finns förskola, skola, lanthandel, krog, Bistro och hotell&vandrarhem (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/gasthamn",
      "org": "svartsolanthandel.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/",
      "org": "svartsolanthandel.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/cykeluthyrning",
      "org": "svartsolanthandel.se",
      "vad": "lanthandeln hyr ut cyklar",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.svartsolanthandel.se/cykeluthyrning",
      "org": "Svartsö Lanthandel",
      "vad": "Vid Ahlsviks brygga väntar Svartsö Lanthandel med cykel och karta över ön; Cykla sedan längs öns 14 km långa, vackra grusvägar",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-svartso-skargardshotell-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "STF-anslutet, ägs och drivs av fyra Svartsöfamiljer (inte av STF); svartsolanthandel.se/sjobodarna — 4 stugor, 8 bäddar vid Alsviks brygga",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "runmaro": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/Förorenade",
      "org": "lansstyrelsen.se",
      "vad": "Sulfidmineralen zinkblände och blyglans bröts på Runmarö i Stockholms skärgård. En mängd av 4 771 ton zinkmalm utvanns i början av 1900-talet. / Värmdös gruvor är med få undantag belägna på Runmarö. Här finns cirka sju sulfidmalmsbrott eller större skärpningar. De tre gruvorna Kilagruvorna, Söderbygruvorna och Vånögruvorna, alla belägna på Runmarö",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf",
      "org": "Natur",
      "vad": "Strax sydväst om Gatan finns ett område som kallas Ryssflykten efter att ryska soldater slagit läger här under rysshärjningarna sommaren 1719 ... Ett hundratal fartyg och tusentals man övernattade ett par nätter på Runmarö i sluttningen mot fjärden. Här finns än i dag ett tiotal ryssugnar",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://runmaro.se/om",
      "org": "runmaro.se",
      "vad": "buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://runmaro.se/",
      "org": "runmaro.se",
      "vad": "F.d. Runmarö Krog är nedlagd; aktiva: Svängen, Krog och restaurang och Tempo Runmarö. Inga öppettider anges där.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://runmarobatvarv.se/",
      "org": "runmarobatvarv.se",
      "vad": "gästbrygga med båtplatser, inga stugor;  Runmarö Krog är nedlagd (\"F.d. Runmarö Krog\")",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://www.runmaro.se/om",
      "org": "Runmarö",
      "vad": "Från Stavsnäs Vinterhamn finns det gott om reguljära förbindelser till Runmarö med Waxholmsbolaget eller andra båtbolag; Utgår du från Stockholm tar du buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/",
      "org": "Stockholm Archipelago Trail",
      "vad": "Grusvägar genom öppna beteslandskap tar dig till skogsvägar genom gles bebyggelse; stigar genom trolsk skog",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v16.pdf",
      "org": "Waxholmsbolaget linje 16",
      "vad": "16A STAVSNÄS — SANDHAMN — HAGEDE, gäller 2 april–18 juni och 17 augusti–12 december 2026; Stavsnäs 07.00 → Styrsvik (Runmarö) 07.05, 09.45 → 09.50, 14.45 → 14.50, alltså ca 5 minuter",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/forfattare/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "Tomas Tranströmer (1931–2015): \"Morfadern var lots och det blev många sommarlov hos mormor och morfar i Gatan\"; Nobelpriset i litteratur 2011; \"Dikter från Runmarö\" (2001); sidan avslutas \"Vänligen respektera att här nämnda boenden ej är utflyktsmål!\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/kulturstigar/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "Vi har gjort en karta som visar intressanta stigar och platser på Runmarö. … Kartans röda stigar är märkta med hänvisningsskyltar av trä på plats. På några ställen finns informationsskyltar om kultur och natur. Etapperna har litterära stopp, bl.a. Vägen mot Silverträsk — August Strindberg och Bemärkta sommargäster i Långvik.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/kalkhallar/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "Där det finns urkalksten på Runmarö ser man en särpräglad och färgsprakande blomsterprakt och en stor rikedom på orkidéer; apollofjärilen finns bara på platser med kalkberggrund",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/lotsbyar/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "år 1703 kom \"nio av nitton Stockholmslotsar\" från Runmarö; år 1797 var \"49 av 68 Stockholmslotsar\" bosatta på ön; lotsstationen Berghamn mellan Värmdö och Runmarö etablerades 1741 och upphörde i början av 1900-talet; då byggdes \"den lilla lotsutkiken på berget i Styrsvik\"",
      "last": null,
      "myndighet": false
    }
  ],
  "resaro": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h682.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "husaro": [
    {
      "url": "https://www.explorearchipelago.com/",
      "org": "explorearchipelago.com",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguide.se/",
      "org": "gasthamnsguide.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/",
      "org": "husaro.se",
      "vad": "Ca 300 m från gästhamnen finns Husarö Lanthandel som har övriga livsmedel, fika och enklare förtäring, Macken är S T Ä N G D … Macken är stängd då vi väntar på tillstånd, Gästhamnen är obemannad för tillfället då macken för närvarande är stängd. ( svarade inte vid kontrollen — HTTP 500.)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/",
      "org": "stockholmslansmuseum.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.visitroslagen.se/",
      "org": "visitroslagen.se",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": null,
      "myndighet": false
    }
  ],
  "fejan": [
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "När koleran svepte över Europa 1892 uppfördes i en hast en karantänstation på ön Fejan. Ett monteringsfärdigt trähus som skulle skeppas till Kongo som missionsstation exproprierades vid utskeppningskajen och sattes upp som doktorsvilla på Fejan",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/fejan/",
      "org": "Skärgårdsstiftelsen",
      "vad": "I slutet av 1800-talet anlades här en karantänstation för fartyg som misstänktes bära smittsamma sjukdomar, och de välbevarade byggnaderna berättar än idag om öns unika förflutna. Under senare perioder har Fejan även fungerat som flyktingförläggning och lotsmiljö / fliken Äta och bo: Under 2026 håller vandrarhemmet stängt . 1892, Wasa och 1930-talet saknar tillåten källa; strukna.",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "rodloga": [
    {
      "url": "https://rodlogaboden.se/",
      "org": "rodlogaboden.se",
      "vad": "naturhamn \"i alla vindar\"; \"ny gästbrygga … inne i byviken … Ej nattförtöjning … max 3 ton\"; /om-oss — \"sjömack med bensin, diesel, fotogen och gasol\", \"På ön finns ingen fast el\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/pages/cafe-truten",
      "org": "rodlogaboden.se",
      "vad": "kaffe eller the … hembakade pajer och kakor, en god smörgås - eller kanske en hamburgare som du grillar själv; öppnar midsommardagen. Ingen Rödlöga Krog hos tillåten källa.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "singo": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "lido": [
    {
      "url": "https://lidovardshus.com/gsthamnen",
      "org": "lidovardshus.com",
      "vad": "Eluttag finns på bryggan, vid separat brygga finns station att fylla dricksvatten, Vid Oasen finns toaletter, dusch",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/restaurangen",
      "org": "lidovardshus.com",
      "vad": "klassisk och skärgårdsinspirerad mat med tydliga, svenska smaker där lokala råvaror står i fokus",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "31A RÄFSNÄS — TJOCKÖ — FEJAN, gäller 2 april–18 juni och 17 augusti–12 december 2026; turer som angör Lidö: Räfsnäs 07.55 → Lidö 08.05 (10 min), 10.05 → 10.15 (10 min), 09.45 → 10.00 (15 min), 17.35 → 17.50 (15 min); turen 06.40 angör inte Lidö (07.05 är Fejan); ingen bilfärja till ön",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "graddo": [
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/bjorkooren/",
      "org": "Norrtälje kommun",
      "vad": "sandstrand ca 85 m i norrläge, beachvolleyplan ja, kiosk/kafé ja, parkering ja, toalett ja, brygga nej, hund nej 15 maj–15 september",
      "last": "2026-09-21",
      "myndighet": true
    },
    {
      "url": "https://caravanclub.se/camping/bjorko-orn/",
      "org": "Caravan Club Björkö Örn",
      "vad": "Allmän Camping — Året runt, husvagns- och husbilstomter med el, 9 stugor, tälttomter, servicehus, vedeldad bastu vid havet, 9-håls minigolf, lekplats, ca 7,5 km från färjeterminalen i Kapellskär",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.graddosjomack.se/",
      "org": "graddosjomack.se",
      "vad": "gästplatser med el, färskvatten, dusch; bensin och diesel . Caravan Club Björkö Örn,  — \"havscamping\", \"långgrund sandstrand\", \"9 stugor och tomter för tält\", \"vedeldad bastu\", \"restaurang med fulla rättigheter\" . Norrtälje kommun,  — \"sandstrand med cirka 85 meter strandlinje i norrläge\", \"väster om Gräddö\"",
      "last": "2026-08-24",
      "myndighet": false
    },
    {
      "url": "https://www.graddosparla.se/",
      "org": "graddosparla.se",
      "vad": "Gräddös Pärla — Bar & Restaurang, I Gräddö utanför Norrtälje ligger Gräddös pärla … bar & restaurang naturnära med närheten till havet och Kapellskär ; Caravan Club Björkö Örn: restaurang med fulla rättigheter som har öppet året om men endast på helger under vintersäsongen",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h631.pdf",
      "org": "SL buss 631",
      "vad": "Norrtälje busstation → … Gräddö torg → … Räfsnäs brygga; SL buss 676 Tekniska högskolan–Norrtälje busstation",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://visitskargarden.se/resmaal/norra-skaergaarden/graeddoe.aspx",
      "org": "Visit Skärgården",
      "vad": "Kajak och Uteliv … utgår från våra två kajakbaser i Stockholms norra skärgård, Gräddö och Furusund, adress Gräddö Brygga; butik för kajak och SUP . Caravan Club Björkö Örn: kanoter och stand up paddle-boards för uthyrning",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "Räfsnäs 10.05, Tjockö 10.10, Fejan 11.00; Lidö \"b\" = beställ resan",
      "last": "2026-09-21",
      "myndighet": false
    }
  ],
  "vaddo": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL buss 637 Norrtälje–Singö",
      "vad": "går från Norrtälje via Väddö kyrka, Älmsta och Grisslehamn till ändhållplatsen Ellans vändplan",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL buss 676 Stockholm–Norrtälje",
      "vad": "Tekniska högskolan–Norrtälje busstation",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "asko": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/asko.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "bildat 2001, utökat 2007, 5 849 ha varav 624 ha land",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "galo": [
    {
      "url": "https://galohavsbad.se/ata/",
      "org": "galohavsbad.se",
      "vad": "vår charmiga Bistro, matbit, fika, smarriga smörgåsar; skargardsstiftelsen.se/omraden/galo — Vid Gålö havsbad finns restaurang, café och camping med stugor",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "fel linje.",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "toro": [
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/toro",
      "org": "nynashamn.se",
      "vad": "Restaurang Sjöboden, sommaröppen vid Ankarudden; sjobodentoro.se — Restaurang Sjöboden Torö Ankarudden, à la carte",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "fjardlang": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/fjardlang.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "skyddat sedan 1986, förvaltas av Skärgårdsstiftelsen och USF-Ö Fastighet AB",
      "last": "2026-09-14",
      "myndighet": true
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/fjardlang/",
      "org": "skargardsstiftelsen.se",
      "vad": "Det finns en liten gästhamn samt gott om fina naturhamnar i naturreservatet. Ingen service nämnd.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "rindo": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/",
      "org": "Trafikverket",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "yxlan": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "bad/badplats, fiske, tältplats, torrdass, stig; \"tälta mer än två dygn i följd på samma plats\" förbjudet; hund kopplad; öppen eld förbjuden",
      "last": "2026-09-21",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusund–Yxlan, 600 m, fyra minuter, avgiftsfri; Blidöleden ( — Yxlan–Blidö, 530 m, 4 minuter, avgiftsfri (båda lästa 2026-09-21). SL buss 632 Norrtälje–Yxlan,  — hållplatser i ordning: Norrtälje busstation … Furusunds färjeläge, Köpmanholm, Köpmanholms skola … Yxlö brygga … Yxlövik … Alsvik … Vagnsunda",
      "last": "2026-09-21",
      "myndighet": true
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "etapp över Yxlan, 24 km. Länsstyrelsen Stockholm, Själbottna-Östra Lagnö naturreservat,  — skyddat sedan 1977, 532 ha, markägare och förvaltare Skärgårdsstiftelsen, \"bra tältplats\", \"strövvänliga skogarna är rika på bär och svamp\", \"Till Själbottna går reguljär Waxholmsbåt sommartid\" ; linje 24: Själbottna 11.00, Vagnsunda 11.01",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-21",
      "myndighet": false
    }
  ],
  "kymmendo": [
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "bullero": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "lansstyrelsen.se",
      "vad": "en varm raststuga och vedeldad bastu som är öppna året om. På ön finns vandringsleder av olika svårighetsgrad, en informationsplats, en badstrand, en tältplats och ett litet museum i konstnären Bruno Liljefors före detta jaktstuga. Delar av ön är tillgänglighetsanpassade så att det går att ta sig runt med rullstol, barnvagn eller rullator",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark",
      "org": "sverigesnationalparker.se",
      "vad": "Huvudentrén finns på ön Bullerö, bildades 2025",
      "last": "2026-08-19",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv",
      "org": "sverigesnationalparker.se",
      "vad": "Jaktstugan, Bastun på Bullerö (\"öppen för alla och går inte att boka\"), Brunos slinga",
      "last": "2026-08-19",
      "myndighet": true
    },
    {
      "url": "https://bullero.se/sv/turtrafiken/",
      "org": "bullero.se",
      "vad": "För att komma till Bullerö res med Bullerölinjen (uppdaterad 2026-02-12, hämtad 2026-08-19)",
      "last": null,
      "myndighet": false
    }
  ],
  "vindo": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v433_434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "bussen går dock hela vägen utan färja.",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "smaadalaro": [
    {
      "url": "https://www.smadalarogard.se/",
      "org": "smadalarogard.se",
      "vad": "sjökaptenen Carl Peter Blom, köp 1802 (Brita Bonde), klart 1810; hotellets egen sida: 110 rum, 2 000 m² spa (2026-08-24)",
      "last": null,
      "myndighet": false
    }
  ],
  "morko": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/skanssundsleden/",
      "org": "Trafikverket",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "musko": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v849.pdf",
      "org": "Trafikverket (Muskötunneln 2 910 m",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "bjorko": [
    {
      "url": "https://www.birkavikingastaden.se/resa-hit/",
      "org": "birkavikingastaden.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "adelsjo": [
    {
      "url": "https://www.birkavikingastaden.se/:",
      "org": "Trafikverket",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "svenska-hogarna": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html",
      "org": "lansstyrelsen.se",
      "vad": "cirka 35 kilometer (cirka 19 nautiska mil) öster om Möja / sedan gammalt en fyrplats. På Storön finns flera stigar runt Ytterhamnen, Innerhamnen, fyren och öns anläggningar . Heidenstam, 1855, 1874, 1966, 1968 står inte på sidan; strukna.",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbra/21320000029574",
      "org": "Riksantikvarieämbetet",
      "vad": "På Svenska Högarna (Storön) i den yttersta delen av Stockholms norra skärgård uppsattes på 1700-talet tre stenkummel. År 1855 byggdes där en cirka 12 meter hög träbåk, ritad av Carl Sandell. Planerna på en fyr på Svenska Högarna aktualiserades på 1860-talet men resulterade istället i att ett fyrfartyg, Svenska Björn, lades ut i farvattnen år 1868. Men mot bakgrund av att sjöfarten genom Ålands hav hela tiden ökade föreslog Lotsstyrelsen att en fyr ändå måste uppföras",
      "last": "2026-09-19",
      "myndighet": true
    }
  ],
  "storholmen": [
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "Lidingö stad",
      "vad": "Med skärgårdsbåt tar du dig lätt till Storholmen eller Fjäderholmarna … Bägge två är bebyggda, har restaurang och stigar att promenera på; dagsverkstorp under Frösviks säteri från 1780-talet; Villa Kassman (Slottet) 1917; cirka 250 fastigheter för sommarboende 1925–1935; i dag finns cirka 80 permanenta hushåll; överflyttades från Vaxholm kommun till Lidingö stad 2011",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h80.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://storholmensjokrog.se/",
      "org": "storholmensjokrog.se",
      "vad": "skärgårdsrestaurang på ön Storholmen utanför Lidingö. Njut av nyfångad fisk och klassisk skärgårdsmat vid vattnet, © 2026",
      "last": null,
      "myndighet": false
    }
  ],
  "storskar": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "södra delen av ön, 8,9 ha, skyddat sedan 1968, förvaltas av Länsstyrelsen; ön ligger i Svartlögafjärden ca 4 km norr om Möja, Österåkers kommun",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "ulvon": [
    {
      "url": "https://www.hogakusten.com/sv/gasthamn-ulvo-hotell",
      "org": "hogakusten.com",
      "vad": "Gästhamn Ulvö Hotell, färskvatten och el, toaletter, duschar, kök och tvättstuga, diesel, och bensin",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://ulvohotell.se/sv/restaurang",
      "org": "ulvohotell.se",
      "vad": "förkärlek till det lokala … twist på redan klassiska rätter, Surströmmingens mekka, höstmeny 2026; hogakusten.com — Ulvö Hotell Restaurang",
      "last": null,
      "myndighet": false
    }
  ],
  "gotland": [
    {
      "url": "https://gotland.com/companies/visby-gasthamn/",
      "org": "gotland.com",
      "vad": "Platser finns både i inre hamnen, i fiskehamnen samt på norra vågbrytaren … 250 platser … hamndjupet är 3-6 m; gotland.se listar Visby gästhamn. Service anges inte av Region Gotland.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/klintehamn-gasthamn/",
      "org": "gotland.com",
      "vad": "10 gästplatser, djup 1,8–2,5 m; gotland.se (hamnar för fritidsbåt) — \"tillgång till toalett, dusch och tvättstuga\", \"Hamncaféet ligger i anslutning\"",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/bakfickan/",
      "org": "gotland.com",
      "vad": "en fisk- och skaldjursrestaurang, Stora Torget 1, Året runt; bakfickanvisby.se",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/krakas-krog/",
      "org": "gotland.com",
      "vad": "Restaurang i gamla bankhuset i Kräklingbo, Fine dining, menyn följer … säsongerna; krakas.se — säsong 2026",
      "last": null,
      "myndighet": false
    }
  ],
  "oland": [
    {
      "url": "https://www.borgholm.se/borgholms-hamn",
      "org": "borgholm.se",
      "vad": "Drivs av: Strand Öland, Duschar: 3, Tvättstuga: Ja, Tanka: Diesel och bensin, Wifi: Ja, El: Ja (redigerad 2026-06-29)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.borgholmsslott.se/slottscafe/",
      "org": "borgholmsslott.se",
      "vad": "Slottscafé, pannkakor, bullar, kakor och glass. Namnet Källarporten finns inte.",
      "last": null,
      "myndighet": false
    }
  ],
  "branno": [
    {
      "url": "https://www.goteborg.com/platser/branno-vardshus-pensionat-baggen",
      "org": "goteborg.com",
      "vad": "mitt på den södra ön Brännö, Mat med inspiration från havet, byggt 1900; brannovardshus.se/oppettider — 14 februari–31 maj och 10 augusti–13 december torsdag–söndag, 24 juni–9 augusti Öppet alla dagar 12.00-23.00, Rumsuthyrning på Pensionat Baggen och Värdshusets Gästrum är möjlig året runt",
      "last": null,
      "myndighet": false
    }
  ],
  "styrso": [
    {
      "url": "https://www.goteborg.com/",
      "org": "goteborg.com",
      "vad": "Brattens Wärdshus — vid färjelägret Styrsö Bratten. Tidigare text om en av Göteborgs mest hyllade saknade källa och togs bort 2026-09-14.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "Brattens Wärdshus — vid färjelägret Styrsö Bratten; brattenswardshus.se",
      "last": null,
      "myndighet": false
    }
  ],
  "vrango": [
    {
      "url": "https://www.goteborg.com/platser/vrango",
      "org": "goteborg.com",
      "vad": "fina sandstränder; både områdena norr och söder om bebyggelsen är skyddade naturreservat; lotsutkiken med panoramavy över bland annat Vinga fyr . Södra skärgårdens yttersta punkt hade ingen källa.",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "Göteborg & Co",
      "vad": "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter; Buss 114, Ö-snabben, restid cirka 25 minuter; 281, Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; för resor till öarna i södra skärgården räcker en biljett för zon A; Linje 281 och 282 trafikerar sträckan Stenpiren–Styrsö–Donsö–Vrångö, med en total restid på cirka 1 timme och 35 minuter … två turer per dag måndag till fredag, samt även lördag och söndag under sommaren; parkering i områdena Talattagatan och Vikebacken i Långedrag, samt sommartid vid Hinsholmskilen. På Saltholmen finns endast parkering för rörelsehindrade . Västtrafik, tidtabell linje 281 Vrångö–Saltholmen 2026-08-24–2026-12-12,  — Saltholmen 05:09 → Vrångö 05:27, 09:25 → 10:03, 10:53 → 11:28 . Tidigare stod linje 283 (går till Asperö och Brännö Rödsten, inte Vrångö).",
      "last": "2026-09-21",
      "myndighet": false
    }
  ],
  "donso": [
    {
      "url": "https://donsohamn.se/",
      "org": "donsohamn.se",
      "vad": "inklusive el, vatten, dusch och toalett, internet via hamnens wifi, tvättmaskin, Istappen, sjömack, Restaurang Isbolaget, säsong 1 maj–30 sept",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/isbolaget-donso",
      "org": "goteborg.com",
      "vad": "längst ut på piren i Donsö hamn, gammalt ismagasin; isbolaget.com — öppettider v 37–38 2026",
      "last": null,
      "myndighet": false
    }
  ],
  "tynningo": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/",
      "org": "Trafikverket",
      "vad": "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård; Färjeledens längd är 1000 meter lång; Resan med vägfärjan är avgiftsfri",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/download/18.5dda784b16d6ccd6b031b3f3/1569999357738/Mark_och_vandringsleder_pa_Tynningo_2011.pdf",
      "org": "Kulturmiljöunderlag Tynningö 2020",
      "vad": "Ca 300 tomtägare äger genom TGEF, Tynningö Gård Ekonomisk Förening, runt 100 hektar skogsmark på ön",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "vaxholm.se",
      "vad": "Badet Myrholmsmaren ligger vid sjön Stora Maren … sköts av Tynningö Idrottsförening",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-vaxholms-stad/tynningo-myrholmsmaren.html",
      "org": "Vaxholms stad",
      "vad": "provsvar 2026-07-20 Tjänligt, Ingen blomning",
      "last": "2026-09-21",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h4.pdf",
      "org": "Waxholmsbolaget linje 4",
      "vad": "4A STOCKHOLM — VAXHOLM — RAMSÖSUND — ÅLSTÄKET, gäller 2 april–18 juni och 17 augusti–12 december 2026; angör Norra Tynningö, Norehill (Tynningö) och Orrlunda (Tynningö): Strömkajen 07.45 → Norra Tynningö 08.59 (1 h 14 min), 11.00 → 12.23 (1 h 23 min); Vaxholm avg. 08.52 → Norra Tynningö 08.59 (7 min), 12.15 → 12.23 (8 min); Norehill och Orrlunda Xb = utan fast tid, beställs",
      "last": null,
      "myndighet": false
    }
  ],
  "djuro": [
    {
      "url": "https://www.varmdo.se/",
      "org": "varmdo.se",
      "vad": "Djurö nås via väg 222 och Djuröbron; Hamnskogen-Eriksbergs",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.djuronaset.com/",
      "org": "djuronaset.com",
      "vad": "hotell, spa och konferens i Djurhamn, 273 rum, egen gästhamn för hotellgäster.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/hotell/gasthamn",
      "org": "djuronaset.com",
      "vad": "Djurönäset Gästhamn Folkparken, ca 25 gästplatser beroende på båtarnas storlek, wc, laddström 10A, wi-fi, vatten 20/L per dygn, bokning via dockspot.com; servicen gäller bemannad period 18 juni–17 augusti, därefter är hamnen öppen utan servicefunktioner",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/restaurang-bar",
      "org": "djuronaset.com",
      "vad": "Matsalen (middag, lunch, brunch), Sjöboden — Skärgårdskrog öppet sommartid, © 2026",
      "last": null,
      "myndighet": false
    }
  ],
  "birka": [
    {
      "url": "https://www.birkavikingastaden.se/hitta-pa-birka/gasthamnen/",
      "org": "birkavikingastaden.se",
      "vad": "Birkas gästhamn, vatten ja, Toalett/Dusch: Ja/Ja, el vid platsen nej men Tillgång till el mot avgift, bränsle nej (uppdaterad 2026-06-16)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/en/attraction/restaurant-cafe/",
      "org": "birkavikingastaden.se",
      "vad": "Café Eldrimner, Coffee, ice cream and light lunch, sandwiches and freshly baked pastries, säsong 22 juni–9 augusti 2026",
      "last": null,
      "myndighet": false
    }
  ],
  "lilla-karlso": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "gotska-sandon": [
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon",
      "org": "sverigesnationalparker.se",
      "vad": "bildad 1910, utvidgad 1963 och 1988",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "aspo-blekinge": [
    {
      "url": "https://www.karlskrona.se:443/",
      "org": "karlskrona.se",
      "vad": "Aspö, Lökanabben;  — just beside the citadel of Drottningskär, Shower/wc, 6 gästplatser;  — dusch, wifi, tvättmaskin",
      "last": null,
      "myndighet": false
    }
  ],
  "sturko": [
    {
      "url": "https://www.karlskrona.se:443/",
      "org": "karlskrona.se",
      "vad": "Sturkö, Ekenabben, eluttag på gästbryggan;  — Guest harbour/Fishing harbor at Djupasund on the west side of Sturkö to the south of Tjurkö bridge",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.visitblekinge.se/en/sturko-a-picturesque-island",
      "org": "visitblekinge.se",
      "vad": "Kvarnmagasinet (pizza i kvarntornet); visitkarlskrona.se/en/sturko-kvarncafe-kvarnmagasinets-pizzeria",
      "last": null,
      "myndighet": false
    }
  ],
  "bla-jungfrun": [
    {
      "url": "https://www.sverigesnationalparker.se/sv",
      "org": "sverigesnationalparker.se",
      "vad": "Blå Jungfrun nationalpark sedan 1926",
      "last": "2026-09-14",
      "myndighet": true
    }
  ],
  "hemson": [
    {
      "url": "https://mittharnosand.se/",
      "org": "mittharnosand.se",
      "vad": "Hultoms brygga … northern Hemsön … a jetty … a toilet and sauna. Ingen Hemsö Gästhamn hos kommunen.",
      "last": null,
      "myndighet": true
    }
  ],
  "faro": [
    {
      "url": "https://gotland.com/companies/faro-strandcafe/",
      "org": "gotland.com",
      "vad": "frukost, lunch, afterbeach och middag … Pizza, pasta, sallad, smårätter samt … kött & fiskrätter, säsong 2026; farostrandcafe.se — Vid Sudersand resort",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://verktygsladan.gotland.com/companies/broa-kiosken-faro/",
      "org": "verktygsladan.gotland.com",
      "vad": "Broa Kiosken Fårö, glass, take away-kaffe, kylda drycker, snabbmat",
      "last": null,
      "myndighet": false
    }
  ],
  "trysunda": [
    {
      "url": "https://www.hogakusten.com/en/trysunda-guest-harbour",
      "org": "hogakusten.com",
      "vad": "Trysunda guest harbour, Hamndjup: 3-7 m, bastu/dusch/toalett, bojförtöjning ca 25 platser",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/en/trysunda-vandrarhem-skargardscafe",
      "org": "hogakusten.com",
      "vad": "homemade refreshments (fika) and meals, and a small grocery store",
      "last": null,
      "myndighet": false
    }
  ],
  "hano": [
    {
      "url": "https://www.visitblekinge.se/en/guest-harbour-hano",
      "org": "visitblekinge.se",
      "vad": "Guest harbor with 74 berths in Hanö Harbor, WIFI is available in the harbor as well as shower and laundry facilities for boat guests. There is a sauna to rent a short distance from the harbor office. hano.nu/hamnen är blockerad av robots.txt och gick inte att läsa; 75 platser, byalaget, el, vatten och drivmedelsuppgiften är därför obelagda och borttagna.",
      "last": null,
      "myndighet": false
    }
  ],
  "svartloga": [
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    }
  ],
  "visingo": [
    {
      "url": "https://www.jonkoping.se/",
      "org": "jonkoping.se",
      "vad": "Gästhamn på Visingsö … Färskvatten, Toalett, Dusch, Eluttag, Latrintömning … Från 0,6 m till 1 m; jkpg.com/gasthamnar — nedanför Visingsborgs slottsruin",
      "last": null,
      "myndighet": false
    }
  ],
  "tjaro": [
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tjaro.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "skyddat 1976, förvaltas av Länsstyrelsen",
      "last": "2026-09-14",
      "myndighet": true
    },
    {
      "url": "https://www.visitblekinge.se/gasthamn-tjaro",
      "org": "visitblekinge.se",
      "vad": "Cirka 70 stycken båtplatser totalt … Maren vid restaurangen … Seglarbryggan, el och vatten vid gästplatser",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.visitblekinge.se/en/tjaro-cafe",
      "org": "visitblekinge.se",
      "vad": "Tjärö Cafe; tjaro.com/restaurant-cafe — sandwiches, salads, Tjärös räksmörgås, Tjärö waffle, soft ice cream, säsong 2026",
      "last": null,
      "myndighet": false
    }
  ],
  "ockero": [
    {
      "url": "https://ockerohamn.se/gasthamn-o-camping",
      "org": "ockerohamn.se",
      "vad": "sydvästra delen av fiskehamnen, moderna duschar och toaletter … inkluderat, Trådlös bredbandsuppkoppling, diesel, tvättmaskiner, öppen 30 april–30 september",
      "last": null,
      "myndighet": false
    }
  ],
  "roro": [
    {
      "url": "https://www.vastsverige.com:443/visitockero/produkter/gasthamn-roro/",
      "org": "vastsverige.com",
      "vad": "vid farleden Göteborg och Marstrand … Serviceanläggning och spolplatta och septitankstömning. Drivmedel nämns inte av kommunen.",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/platser/roro",
      "org": "goteborg.com",
      "vad": "Rörö Fiskeboa & Krog … rätter med tydlig förankring i havet; rorofiskeboakrog.se — nykokta kräftor, räkor och fisk, fish & chips",
      "last": null,
      "myndighet": false
    }
  ],
  "holmon": [
    {
      "url": "https://www.lansstyrelsen.se/vasterbotten/besoksmal/naturreservat/holmoarna.html",
      "org": "Länsstyrelsen Västerbotten",
      "vad": "bildat 1980 och 1995, ca 25 000 ha",
      "last": "2026-09-14",
      "myndighet": true
    },
    {
      "url": "https://www.holmon.se/hamnforeningen/gasthamn/",
      "org": "holmon.se",
      "vad": "Gästhamn … Byviken … Hamnföreningen Byviken Holmön Ekonomisk förening … boj-förtöjning … en flytbrygga",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://visitumea.se/en/novas-holmon",
      "org": "visitumea.se",
      "vad": "Novas Holmön … directly adjacent to where the ferry docks … BBQ, meat, fish, seafood and vegetarian food",
      "last": null,
      "myndighet": false
    }
  ],
  "marstrand": [
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/",
      "org": "Kungälvs kommun",
      "vad": "bekräftar att färjan mellan Koön och Marstrand drivs av kommunen och att biljetter och dispensansökningar hanteras där",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.marstrandsgasthamn.se/sv/",
      "org": "marstrandsgasthamn.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand",
      "org": "Statens fastighetsverk",
      "vad": "bekräftar provisorisk skans efter freden i Roskilde 1658, mindre stenfästning från 1660, bygget 1682 under Erik Dahlberg, färdig 1860, \"en av Europas starkaste fästningar\", statligt byggnadsminne förvaltat av SFV sedan hösten 1993",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/",
      "org": "Besöksparkering i Marstrand",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/en/carlsten-waffle-cafe/",
      "org": "Carlstens fästning",
      "vad": "bekräftar caféet vid fästningens entré, utbudet av våfflor, pajer, baguetter och sallader samt att fästningsbiljett inte krävs",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguide.se/omradesindelat/vastkusten/item/marstrands-gasthamn",
      "org": "gasthamnsguide.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://grandmarstrand.se/restaurang-tenan/",
      "org": "Grand Hotel Marstrand",
      "vad": "bekräftar Restaurang Tenan med \"vällagad à la carte, fisk och skaldjur samt klassiska rätter\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.hamnkrogenmarstrand.se/",
      "org": "Hamnkrogen Marstrand",
      "vad": "bekräftar namn, adressen Lilla Varvsgatan 20 samt rubrikerna KÖK & BAR och Butik",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/samlastning/",
      "org": "Samlastning Marstrand",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/marstrand/",
      "org": "vastsverige.com",
      "vad": "bekräftar att orten grundades på 1200-talet av Håkon Håkonsson, blev svensk 1658 och på 1500-talet var centrum för sillhandeln i Europa",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/marstrand/",
      "org": "vastsverige.com",
      "vad": "bekräftar \"Sommarens seglingshöjdpunkt är när Match Cup Sweden avgörs första veckan i juli\" och \"Sveriges största gästhamn\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/",
      "org": "vastsverige.com",
      "vad": "bekräftar kommunal gästhamn på sydöstra Marstrandsön, el och vatten som ingår i gästhamnsavgiften samt dusch och WC",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/grand-hotel-marstrand/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, Rådhusgatan 2 på Marstrandsön och matsalarna Grand Tenan och Bakfickan",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/marstrands-havshotell/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget på Koön intill färjeläget, spa, 144 rum och restaurangen Otto\\'s Vardagsrum & Kök",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/kungalv/products/marstrands-kurhotell/",
      "org": "vastsverige.com",
      "vad": "bekräftar byggnaden som på 1800-talet inrymde kall- och varmbad, 39 rum, Kungsplanen på Marstrandsön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/restaurang-tenan/",
      "org": "vastsverige.com",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/marstands-wardshus/",
      "org": "vastsverige.com",
      "vad": "bekräftar skaldjursplatåer och grillmat samt adressen \"Mitt på kajen\" på Marstrandsön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/johans-krog-marstrand/",
      "org": "vastsverige.com",
      "vad": "bekräftar \"fransk bistro\" och adressen Kungsgatan 12",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "smogen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar bildat 1975, ca 292 hektar, förvaltas av Västkuststiftelsen, Bohusläns äldsta fyr på plats sedan 1842 med vit blixt var tolfte sekund, byggnadsminne 1935, Marmorbassängen och regelbundna badturer från Kungshamn sommartid",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn",
      "org": "Sotenäs kommun",
      "vad": "bekräftar kommunal drift, ca 120 gästplatser, fastförtöjning, vattendjup 3–5 meter, servicen WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch, hamnkontor öppet vecka 25–33 samt bokning via Dockspot",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html",
      "org": "Sotenäs kommun",
      "vad": "bekräftar de tre badplatserna Sandö, Vallevik samt Herr- och dambadet i Makrillviken med angiven service",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/batarochhamnar/gasthamnar/smogensgasthamn.4.15eba9af15b0a9219ba328a8.html",
      "org": "Sotenäs kommun",
      "vad": "bekräftar kommunal drift och servicen \"WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.smogenshafvsbad.se/restaurang/",
      "org": "Smögens Hafvsbad",
      "vad": "bekräftar hotell med spa och restaurang på Smögen med utsikt över havet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/smogenbryggan/",
      "org": "vastsverige.com",
      "vad": "bekräftar \"1 km långt\", \"Sveriges mest besökta brygga\", caféer, krogar och butiker, båtturer till Hållö och Kungshamn samt hamnen använd av fiskare redan under mitten av 1500-talet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/smogen/",
      "org": "vastsverige.com",
      "vad": "bekräftar att Hotell Smögens Hafvsbad stod klart 1900 och tog emot sommargäster som kom för att bada tångbad och roa sig",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/sea-lodge-smogen/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, adressen Nordmanshuvudet 1, 15 rum och restaurang med servering på bryggan",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/pensionat-bryggan/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget på Smögenbryggan, rum mot hamnen och bistro i sjöboden nedanför huset",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/",
      "org": "vastsverige.com",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/glasscafet/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, adressen Smögenbryggan och servering av glass och lunch inne och ute med utsikt över hamnen, säsongsöppet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/skarets-krog/",
      "org": "vastsverige.com",
      "vad": "bekräftar krog och pianobar vid Smögenbryggan med café och bistro, \"Allt här är bakat och tillagat från grunden, med lokala råvaror som utgångspunkt\", Hamnen 1",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/gostas-fiskekrog/",
      "org": "vastsverige.com",
      "vad": "bekräftar fisk och skaldjur direkt från kajen samt adressen Fiskhamnsgatan 32",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "lysekil": [
    {
      "url": "https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "Lysekils kommun",
      "vad": "bekräftar \"salta och friska bad från klippor till sandstränder med lättillgängliga parkeringar, toaletter samt kiosk\" och att Pinnevik i Lysekil och Bökevik i Fiskebäckskil namnges",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar ca 48 hektar, bildat 1983, förvaltas av Lysekils kommun tillsammans med Kungliga Vetenskapsakademien som skänkte marken under stenindustrins glansdagar, rundhällar med isräfflor och pegmatitgångar, Galleberget lämnat orört av kulturhistoriska skäl, stigar med trappor och broar samt bad och fiske längs västsidan",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/gullmarn.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar \"en äkta tröskelfjord\", största djup cirka 125 meter nära Alsbäck en mil från mynningen, tröskel på omkring 45 meters djup, djurarter i djupbassängen som saknas i fjorden i övrigt, bildat 1983, ca 16 499 hektar, förvaltas av Västkuststiftelsen",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.bohuslansmuseum.se/samlingar-och-historia/gamla-historiska-artiklar/badorten-lysekil/",
      "org": "Bohusläns museum",
      "vad": "bekräftar badinrättning 1847, första varmbadhuset som däckshus från ett fartyg, första egentliga badhuset 1849, Carl Curman som badläkare, nytt varmbadhus och kallbadhus 1864, Havsbadrestaurangen 1869, Societetshuset 1872 utbyggt 1882, Curmans villor som byggnadsminnen, gångbryggan Trampen och kallbadhuset från 1911",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/en/akvariet/about-the-aquarium/",
      "org": "Havets Hus",
      "vad": "bekräftar att akvariet visar arter från Gullmarsfjorden och Västerhavet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/akvariet/om-akvariet/",
      "org": "Havets Hus",
      "vad": "bekräftar 25 akvarier, hälleflundror, rockor och havsaborrar i tunnelakvariet samt det grunda strandområdet med alger och sand; omkring 100 arter från Gullmarsfjorden och Västerhavet enligt sidans meta-beskrivning",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.lysekil.se/uppleva-och-gora/kultur/kulturhistoria-och-kulturarv/industrihistoria.html",
      "org": "lysekil.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/strandflickornas-havshotell/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, Turistgatan 13 i Lysekil, sekelskifteshotell vid vattnet med spa, restaurang och privat brygga",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/hotell-lysekil/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, Rosvikstorg 1 i Lysekils södra hamn, anor från 1952 och restaurangen My Italian Friend i huset",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/siviks-camping-eng/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget 4 km norr om Lysekils centrum, havsnära, med campingplatser och stugor",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/grand-hotel-lysekil/",
      "org": "vastsverige.com",
      "vad": "bekräftar drift sedan 1878 och adressen Kungsgatan 36 i centrala Lysekil",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/kommunala-gasthamnar/",
      "org": "vastsverige.com",
      "vad": "bekräftar att Lysekils kommun driver fem gästhamnar och att Fiskhamnens ligger mitt i Lysekil med gångavstånd till butiker och restauranger samt café och sjömack",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/brygghuset/",
      "org": "vastsverige.com",
      "vad": "bekräftar fisk- och skaldjursrestaurang med säsongsmeny i Fiskebäckskil på Skaftö, knuten till Slipens Hotell",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/norra-hamnen-5/",
      "org": "vastsverige.com",
      "vad": "bekräftar adressen Norra Hamngatan 5 i Lysekil och menyn med skaldjur, fiskrätter, inlagd sill och moules frites",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "kosterhavet": [
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv",
      "org": "Djurliv",
      "vad": "Djurliv — bekräftar \"omkring 6 000 olika arter\", \"Närmare 300 av dem finns inte någon annanstans i Sverige\", Kosterfjordens djupränna, \"Västerhavets största bestånd av knubbsälar\" och \"ett av Sveriges två kända växtplatser för revbildande korall, ögonkorall\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://sverigesnationalparker.se/park/kosterhavets-nationalpark/nationalparksfakta",
      "org": "Fakta om parken",
      "vad": "bekräftar bildad 9 september 2009, \"38 900 hektar, varav 860 hektar land\", kommunerna Strömstad och Tanum samt Länsstyrelsen Västra Götaland som förvaltare",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark",
      "org": "sverigesnationalparker.se",
      "vad": "bekräftar \"Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet",
      "org": "sverigesnationalparker.se",
      "vad": "bekräftar utställningar, filmer och bildspel, klappakvarium, guidningar, föredrag, visningar och turer samt kartor",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/info/kosterbatarna/",
      "org": "Västtrafik",
      "vad": "bekräftar linje 899, cykel ombord i mån av plats och biljett via Västtrafik To Go eller av däcksman ombord",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ekenashavshotell.se/en",
      "org": "ekenashavshotell.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/articles/faq-koster/",
      "org": "vastsverige.com",
      "vad": "bekräftar \"both are virtually car-free\", Sydkoster 8 kvadratkilometer och Nordkoster 4 kvadratkilometer, \"it is only biking on South Koster. North Koster is not bike friendly\", stränderna Rörvik, Kilesand, Västra Bryggan, Basteviken och Norrvikarna samt linfärjan Västra Bryggan–Långegärde bemannad sommartid",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, läget på Sydkoster i Kosterhavets marina nationalpark samt rum och lägenheter med havsutsikt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/reservatet-nordkoster/",
      "org": "vastsverige.com",
      "vad": "bekräftar \"Kosteröarnas enda campingplats för tält samt sju ekologiska stugor\", läget på Nordkosters nordöstra kust och att tältplatserna måste förbokas",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/produkter/klapphagen-koster/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget vid Ekenäs på Sydkoster, sex sviter med terrass, glampingtält, Gårdshuset och restaurang med mat över öppen eld",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/produkter/kostergarden/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget vid sandstranden Kilesand på Sydkoster, stugor, lägenheter och sviter samt restaurang med två uteserveringar",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/gasthamn-ekenas/",
      "org": "vastsverige.com",
      "vad": "Ekenäs gästhamn — bekräftar namnet och läget på Sydkoster, restauranger, hotell och cykeluthyrning vid bryggan, besökscenter för Kosterhavets nationalpark intill samt ICA ca 1,5 km bort öppet året runt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/gasthamn-nordkoster/",
      "org": "vastsverige.com",
      "vad": "bekräftar lägena Bopallen (Västra Bryggan) och Vettnet, restauranger vid Västra Bryggan och livsmedelsaffären \"Affärn på Nord\" sommartid",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-stromstadkoster/",
      "org": "vastsverige.com",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/strandkanten/",
      "org": "vastsverige.com",
      "vad": "bekräftar familjerestaurang i renoverad sjöbod vid stranden på Nordkoster, Kalkemyrsvägen 4, rätter från havet, utsikt över Kostersundet och presentbutik intill",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/kosters-rokeri/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget vid Ekenäs brygga på Sydkoster bredvid naturum samt färsk och rökt fisk med tillhörande fiskaffär",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/sundets-skaldjurscafe/",
      "org": "vastsverige.com",
      "vad": "bekräftar läget vid Långegärde brygga på Sydkoster, färska skaldjur och säsongsöppet",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "grebbestad": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bekräftar bildat 1968, ca 499 hektar, förvaltas av Västkuststiftelsen, öppet och kargt landskap med branta klippstränder och ljunghed samt vandring i flera längder",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1967, ca 629 hektar, Västkuststiftelsen, ett av de mest välbesökta reservaten bland Bohusläns öar, stigar, naturhamnar, orkidéer, lövskog, bronsåldersrös, en kopia av en runsten med den längsta urnordiska runskrift som påträffats och taxibåt från Grebbestad",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html",
      "org": "Tanums kommun",
      "vad": "bekräftar Ostronakademien bildad 2004, NM i ostronöppning i maj, Ostronets dag i september, Kalvö Ostron handplockat sedan 1600-talet, Grebbestads Ostron med EU-skyddad ursprungsbeteckning sedan maj 2023 och 50 000–60 000 ostron per år samt Havstenssunds Ostron som enda kommersiella odlingen i Skandinavien med säsong september–maj",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vitlyckemuseum.se/",
      "org": "vitlyckemuseum.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145",
      "org": "vastsverige.com",
      "vad": "bekräftar första moderna omnämnandet i början av 1600-talet, utvecklingen under 1800-talet, stenhuggarna i slutet av 1800-talet, gästhamnen som fullserviceanläggning med gott om båtplatser samt att Evert Taube skrev \"Så länge skutan kan gå\" på Otterön sommaren 1954",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/tanumstrand/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet TanumStrand, postadress 457 95 Grebbestad, hotellrum och stugor med havsutsikt, nordiskt spa samt restaurangen Latitud 58°",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/rosenhill-bb/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, Sövallsvägen 5 i Grebbestad, Grebbestads gamla skolbyggnad renoverad och öppnad 2009 samt ca 500 m från centrum",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/grebys-hotell-o-restaurang/",
      "org": "vastsverige.com",
      "vad": "bekräftar Strandvägen 1 i Grebbestad, nio individuellt inredda rum och restaurang med fisk och skaldjur från lokala vatten",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "vastsverige.com",
      "vad": "bekräftar ordagrant \"Grebbestad Seaport Guest Harbour. 30 berths. WC, shower, waste disposal, water and fuel refill.\" samt \"TanumStrand Guest Harbour. Just south of Grebbestad. 250 berths directly adjacent to TanumStrand SPA & Resort. Toilet, shower, washing machine, dryer, shore power, and WiFi.\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/everts-sjobod/",
      "org": "vastsverige.com",
      "vad": "bekräftar namn och läge Grönemadsvägen 61 i Grebbestad, ostronsafari och skaldjursupplevelser med servering i en fiskebod från 1800-talet samt sex dubbelrum",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/restaurant-telegrafen/",
      "org": "vastsverige.com",
      "vad": "bekräftar namnet, Nedre Långgatan 28 i Grebbestad, husmanskost och à la carte med kött och fisk samt drift sedan 2002 i en gammal telegrafstation",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/cafe-skafferiet-grebbestad/",
      "org": "vastsverige.com",
      "vad": "bekräftar Nedre Långgatan 40 i Grebbestad och att stället fungerar både som café och restaurang",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "fjallbacka": [
    {
      "url": "https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/fjallbacka-guest-harbour/",
      "org": "gasthamnsbolaget.se",
      "vad": "adress Ingrid Bergmanstorg 457 40 Fjällbacka, toaletter, duschar och el; drivmedel anges inte",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 2011, cirka 18 300 hektar, 365 öar och skär, turbåtar från bland annat Fjällbacka och Hamburgsund, ett av Sveriges mest värdefulla marina områden tillsammans med Kosterhavets nationalpark",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html",
      "org": "Tanums kommun",
      "vad": "sillfiskeperioderna, spannmålsfrakt till England, ansjovisen uppfanns i Fjällbacka på 1860–1880-talen och fick utmärkelser på internationella utställningar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.brygganfjallbacka.se/",
      "org": "Bryggan Fjällbacka",
      "vad": "listar Bryggan Café & Bistro, Restaurant Matilda, Everts Tapasbar och The Harbour House på Ingrid Bergmans Torg",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://fjallbackagk.se/sandbunkern-bistro-deli/",
      "org": "Fjällbacka Golfklubb",
      "vad": "Sandbunkern Bistro & Deli i klubbhuset, Långö Rörvikarna 1",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://shfjallbacka.se/en/restaurants/",
      "org": "Stora Hotellet Fjällbacka",
      "vad": "Restaurant Mamsell är hotellets restaurang, Galärbacken 2, Fjällbacka",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/",
      "org": "vastsverige.com",
      "vad": "trappor från Ingrid Bergmans Torg, Stora och Lilla Vetteberget, fastkilat klippblock som tak, namnet efter Oscar II:s besök 1887 och hans signatur på bergväggen, filmscener från Ronja Rövardotter, utsikt över både övärld och fastland",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/",
      "org": "vastsverige.com",
      "vad": "guidade turer om Bergmans arv och Läckbergs mordvandring, arrangörer Fjällbackaguiderna och Kustguiden, start vid Ingrid Bergmans torg",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/aktiviteter/paddling/paddla-fjallbacka/",
      "org": "vastsverige.com",
      "vad": "rutten namnger Kråkholmen, Köttöarna, Porsholmen, Valö, Dannholmen och Hjärterön i skyddat vatten",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "vastsverige.com",
      "vad": "Fjällbacka Guest Harbour ligger intill Ingrid Bergmans torg och har toalett, dusch och landström",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/vettebergsleden/?site=145",
      "org": "vastsverige.com",
      "vad": "tätortsnära rundslinga med blå markering, del av Kuststigen, start lämpligen vid Ingrid Bergmans torg, varierad terräng, svårighetsgrad och längd",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/stora-hotellet-fjallbacka/",
      "org": "vastsverige.com",
      "vad": "Galärbacken 2, 457 40 Fjällbacka; hotellets egen webbplats shfjallbacka.se anger Restaurant Mamsell i huset",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/badholmens-vandrarhem/",
      "org": "vastsverige.com",
      "vad": "adress Badholmen, 45741 Fjällbacka, rum med våningssängar",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "grundsund": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 2003, cirka 121 hektar i Lysekils kommun, kuperat med blockrika sluttningar och lodräta klippor, ek och bok, krattekskog, gräsarten råglosta, känt för sina blåsippor, förvaltas av Västkuststiftelsen",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/",
      "org": "Trafikverket",
      "vad": "mellan Finnsbo i Lysekils kommun och Skår i Uddevalla kommun, 1 850 meter, överfarten tar tio minuter, resan med vägfärjan är avgiftsfri",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.grundenshotell.se/",
      "org": "Grundéns hotell",
      "vad": "adress Furtofta 204, 451 79 Grundsund, hotell vid infarten till Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto/",
      "org": "vastsverige.com",
      "vad": "Grundsund beskrivs som en aktiv fiskehamn med en lång hamnkanal som byn är byggd kring",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/",
      "org": "vastsverige.com",
      "vad": "sillperioden på 1700-talet, byn förblev i allt väsentligt en fiskehamn medan andra fiskelägen blev badorter i slutet av 1800-talet, fisket fortfarande ekonomiskt viktigt, stora delar av tv-serien Saltön inspelade i Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/",
      "org": "vastsverige.com",
      "vad": "kapell 1799, torn 1818, ombyggnad 1893 av Fredrik Falkenberg med förlängning åt öster och nytt tresidigt avslutat kor, breda korsarmar, 400 platser, gospelkonserter i juli och julkonserter i december",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/",
      "org": "vastsverige.com",
      "vad": "Västtrafiks linje 847 Lysekil–Fiskebäckskil–Östersidan på Skaftö, året runt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/",
      "org": "vastsverige.com",
      "vad": "2,4 km, följer delvis den blåmarkerade Kuststigen, gamla landsvägen, bok- och ekskog, bäver i Edsvattnet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/skafto/bo/rum--och-stugformedling/",
      "org": "vastsverige.com",
      "vad": "Skaftö Vandrarhem förmedlar rum, stugor och kaptenshus på Skaftö, läge Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto-gasthamn-grundsund/",
      "org": "vastsverige.com",
      "vad": "läge på sydvästra Skaftö i en gammal fiskeby, förtöjning längs Östra kaj och med akterlinor vid Västra kaj, service; drivmedel anges inte",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/skafto/artiklar/premiar-for-krogens-fisk--krog/",
      "org": "vastsverige.com",
      "vad": "ligger vid torget i Grundsund, fisk och skaldjur kombinerat med fiskbutik",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/pelles-rokeri/",
      "org": "vastsverige.com",
      "vad": "adress Östra kajen 20, 451 79 Grundsund, restaurang med havsutsikt samt Terrassen Pizza & Loungebar; på samma sida Hugos Bu, Bar & Café i en genuin sjöbod från 1905",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/skafto---eng/food--beverage/eat-on-skafto/",
      "org": "vastsverige.com",
      "vad": "listar Smultron & Tång bland Skaftös serveringar med orten Grundsund",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "hamburgsund": [
    {
      "url": "https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/",
      "org": "gasthamnsbolaget.se",
      "vad": "Skolvägen 5, 457 45 Hamburgsund, platser vid två huvudkajer samt Hjalmars Kaj, tvättstuga på fastlandet, sugtömning av porta potti på Hamburgö; drivmedel anges inte",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bohusläns största gravfält strax norr om Grebbestad, cirka 200 gravar, 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar, 200 till 600 år efter vår tideräknings början, 28 resta stenar upp till 4,5 meter, fynd från undersökningarna 1873 av brända ben, glaspärlor, benkammar och sländtrissor",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html",
      "org": "Tanums kommun",
      "vad": "traditionen säger att tingsplatsen för Viken under medeltiden låg vid sundets södra del, Viken det administrativa område som bestod av norra Bohuslän och det nu norska området runt Oslofjorden, namnet av öns medeltida namn Hornbora, den hornförsedda, utan koppling till tyska Hamburg, sillfiske och trankokerier 1500–1700-tal, stenhuggeri och fraktsegling 1800–1900-tal, ett av Bohusläns största skutsamhällen i början av 1900-talet, hemmahamn för stor del av fiskeflottan",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/",
      "org": "Trafikverket",
      "vad": "linfärja Hamburgsund–Hamburgö —  och Länsstyrelsen Västra Götaland, Greby gravfält",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hamburgsund/",
      "org": "vastsverige.com",
      "vad": "Hornborgs borgruin med storhetstid enligt fynden omkring 1450–1530, utgrävd i början av 1900-talet med fynd av bakstycket till en kanon, kanonkulor och andra vapen, vikingamarknaden Hornbore Ting varje sommar, konstskolan Gerlesborgsskolan",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "vastsverige.com",
      "vad": "50 platser i Hamburgsund och på Hamburgö i sundet, toalett, dusch, tvättmaskin, torktumlare och landström",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hamburgsund-bed-and-breakfast/",
      "org": "vastsverige.com",
      "vad": "adress Udden 1, 45745 Hamburgsund, intill färjestationen, tio dubbelrum",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/kustnara-bb-och-konferens/",
      "org": "vastsverige.com",
      "vad": "adress Heestrand Rådalen 10, 45747 Hamburgsund, drivs av Gästhamnsbolaget Väst AB, cirka 5 km från Hamburgsund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/rorvik-family-camping/",
      "org": "vastsverige.com",
      "vad": "adress Rörviksängen 15, 45747 Hamburgsund, 1,5 km söder om Hamburgsund, stugor, rum, husvagns- och tältplatser",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hjalmars/",
      "org": "vastsverige.com",
      "vad": "adress Strandvägen 8, 45745 Hamburgsund, läge vid kajen, mat med lokala råvaror",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "karingon": [
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn",
      "org": "Orust kommun",
      "vad": "125 platser, djup cirka 4 meter, servicehus med toalett, dusch, tvättmaskin och torktumlare, sugtömningsstation 1 april–31 oktober",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer",
      "org": "Orust kommun",
      "vad": "Käringön ligger inom riksintresse för kulturmiljövården, de flesta byggnaderna är q-märkta i detaljplan, varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta, och bygglov kan krävas för annars lovbefriade åtgärder som staket, altaner, trädäck, attefallsåtgärder och solceller",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.karingon.se/",
      "org": "Hotell Käringön",
      "vad": "21 rum (enkelrum, dubbelrum, trebäddsrum, familjerum och juniorsviter) samt restaurang och bar, Käringöns Brygga",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.petersonskrog.se/",
      "org": "Petersons Krog",
      "vad": "krog på Käringön med lunch, à la carte och sällskapsmenyer",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/karingon/",
      "org": "vastsverige.com",
      "vad": "bilfri, smala gator med vita trähus, kyrkan omgiven av gräsmattor och planteringar, permanent bebodd 1596 av fiskarfamiljer, över 300 invånare under 1700-talets sillperiod, fördubblad folkmängd på 1800-talet, namnet av käring som benämning på ett litet stentorn eller kummel använt som sjömärke",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "vastsverige.com",
      "vad": "Västtrafiks personfärja linje 381 går till Gullholmen, Härmanö och Käringön, 5 minuter till Härmanö/Gullholmen och cirka 35 minuter till Käringön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/karingon/",
      "org": "vastsverige.com",
      "vad": "båtresan mellan klippor och kobbar tar inte mer än 40 minuter, ön är bilfri",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/karingon-gullholmen/eat-and-drink/",
      "org": "vastsverige.com",
      "vad": "listar Skafferiet, Creperiet och Karingo bland Käringöns serveringar",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "orust": [
    {
      "url": "https://www.orust.se/kommun-och-politik/kommunfakta",
      "org": "Orust kommun",
      "vad": "drygt 15 000 invånare och cirka 40 000 sommartid, cirka 2,8 mil i väst-östlig och cirka 2,5 mil i nord-sydlig riktning, västkustens största ö",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer",
      "org": "Orust kommun",
      "vad": "Käringön, Mollösund, Gullholmen och Härmanö är exempel på platser som ligger inom riksintresse för kulturmiljövården, de flesta byggnaderna q-märkta med strikta detaljplaneregler, varsamhetskrav och förvanskningsförbud enligt plan- och bygglagen även utanför de orter där byggnaderna är skyddsmärkta",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser",
      "org": "Orust kommun",
      "vad": "nio badplatser: Småholmarna i Henån, Sörkilen i Ellös, Hälleviksstrand, Kungsviken, Kattevik i Mollösund, Nösund, Svanesund, Slussen och Hagen i Stocken; simskola sommartid vid Småholmarna och flera badplatser som sköts av föreningar med kommunalt stöd",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/amnesomrade/upplevaochgora/gasthamnar/henansgasthamn.4.2f8c9bd513dca025875ec3.html",
      "org": "Orust kommun",
      "vad": "10 gästplatser, djup cirka 1–2,5 meter, el, dusch, toalett, ramp och sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i orten Henån",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn",
      "org": "Orust kommun",
      "vad": "sydvästspetsen av Orust, 100 platser, djup cirka 4 meter, el, dusch, toalett, tvättmaskin och torktumlare i servicehuset, sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i samhället Mollösund",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.hallberg-rassy.com/sv/varvet/varvets-historia",
      "org": "Hallberg-Rassy",
      "vad": "Harry Hallberg öppnade eget varv i Kungsviken på Orust 1943, nya lokaler byggdes i Ellös i mitten av 1960-talet, samgående med Christoph Rassys varv 1972 till Hallberg-Rassy Varvs AB, omkring 9 800 levererade båtar",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://najad.se/najad-yachts-moves-production-back-to-orust-following-the-acquisition-of-orust-yacht-service/",
      "org": "Najad Yachts",
      "vad": "produktionen flyttad tillbaka till Henån på Orust efter förvärvet av Orust Yacht Service, meddelat 2 november 2022",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/mollosund/",
      "org": "vastsverige.com",
      "vad": "sydvästra spetsen av Orust, sillfisket från 1500-talet och Bohusläns främsta fiskecentrum inom hundra år, fyren på Gallebergs udde, träskulpturen av fiskarkvinna med barn vid Klockeberget, kyrkan färdig 1866, väderkvarnen från 1700-talet i bruk till 1929, hamnen byggd under andra världskriget",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "vastsverige.com",
      "vad": "Västtrafiks personfärja linje 381 till Gullholmen, Härmanö och Käringön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/villa-frideborg/",
      "org": "vastsverige.com",
      "vad": "familjehotell och B&B, Åvägen 1, 473 32 Henån",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/prastgardens-pensionat/",
      "org": "vastsverige.com",
      "vad": "Kyrkvägen 1, 47470 Mollösund, i en byggnad från 1893",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/kobbar-skar/",
      "org": "vastsverige.com",
      "vad": "stugförmedlare för Orust och Tjörn, Tyfta 560, 473 98 Henån",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/slussens-pensionat/",
      "org": "vastsverige.com",
      "vad": "Slussen 415, 47392 Henån, pensionat med restaurang och konferens",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/hotel-varvet/",
      "org": "vastsverige.com",
      "vad": "Ravinvägen 2, 474 31 Ellös, lägenhetshotell med restaurang och spa",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/wards-i-mollosund/",
      "org": "vastsverige.com",
      "vad": "hotell och restaurang med cocktailbar, Kyrkvägen 9, 474 70 Mollösund",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/brygghuset-mollosund/",
      "org": "vastsverige.com",
      "vad": "Hamnvägen 4, 47440 Mollösund, restaurang med havsinspirerad mat samt rum med utsikt över hamnen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/restaurang-cafe-bryggvingen/",
      "org": "vastsverige.com",
      "vad": "restaurang och fiskaffär på Lyr, Orust",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "tjorn": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stigfjorden.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1979, cirka 6 714 hektar i Orusts och Tjörns kommuner, näringsplats för tusentals änder, gäss, svanar och vadarfåglar under vår och höst, Ramsarkonventionen, Natura 2000",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "Tjörns kommun",
      "vad": "två holmar, den södra Klädesholmen med den äldsta bebyggelsen och den norra Koholmen, sillperioden 1747–1808 med uppemot 1 000 personer, 40 procent av alla svenska sillkonserver, personfärja från Rönnängs brygga till Åstol, Tjörnekalv och Dyrön medan Härön nås via Kyrkesund",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser",
      "org": "Tjörns kommun",
      "vad": "Tjörnbron som utsiktsplats med utsikt över fjordarna och skärgården, Sankt Olovs valar som \"ett av Bohusläns mest kända sjömärken\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/webbplatser/sundsby-sateri",
      "org": "Tjörns kommun",
      "vad": "säteriet på ön Mjörn med trädgård, park, vandringsleder, köksträdgård, utställningar, kafé och gårdsbutik",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser",
      "org": "Tjörns kommun",
      "vad": "Gråskär, Skärhamn listad med sandstrand och tillgänglighetsanpassning",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag",
      "org": "Tjörns kommun",
      "vad": "expressbussar mot Stenungsund och Göteborg",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014620800000/",
      "org": "Västtrafik",
      "vad": "Buss Tjörn express: Tjörn — Göteborg",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/",
      "org": "Bohusläns museum",
      "vad": "ungefär 80 synliga gravar från järnåldern, 57 runda stensättningar, tio runda högar, sju domarringar och sex resta stenar, inga uppgifter om utgrävning, skulpturen \"Anna\" 14 meter hög av Jaume Plensa",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://digitaltmuseum.se/021015874271/almobron-i-bohuslan-paseglad-av-bulkfartyget-star-clipper-i-januari-198",
      "org": "Bohusläns museum via DigitaltMuseum",
      "vad": "18 januari 1980 klockan 01.30, åtta omkomna, omedelbar planering av provisorisk färjeförbindelse och projektering av ny bro",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "Klädesholmen Västra Hamn",
      "vad": "Klädesholmens gästhamn",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.akvarellmuseet.org/om/historia",
      "org": "Nordiska Akvarellmuseet",
      "vad": "öppnade 16 juni 2000, arkitekttävlingsförslaget \"Mötet\" av de danska arkitekterna Niels Bruun och Henrik Corfitsen, huvudbyggnaden längs strandlinjen delvis ute i vattnet, fem gästateljéer på betongpelare i vattnet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/",
      "org": "Salt & Sill",
      "vad": "Sverige första flytande hotell",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/om-salt-sill/",
      "org": "Salt & Sill",
      "vad": "Sveriges första flytande hotell, adress Rytterholmen 1, Klädesholmen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/",
      "org": "Salt & Sill",
      "vad": "huvudrestaurangen heter Salt & Sill, färska skaldjur från lokala fiskare",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.skarhamnsgasthamn.se/service/",
      "org": "Skärhamns Gästhamn",
      "vad": "wifi, toalett, dusch, tvättmaskin, torktumlare, septitanksugning, grillplats; inget drivmedel anges",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/rovor-rum/",
      "org": "Västsverige/Södra Bohuslän",
      "vad": "Toftenäs 4, Skärhamn, fungerar även som vandrarhem utanför sommaren",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/",
      "org": "Västsverige/Tjörn",
      "vad": "1546 öar och skär att uppleva året om",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmen/",
      "org": "Västsverige/Tjörn",
      "vad": "25 konservfabriker och cirka 150 yrkesfiskare år 1950",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/hotel-nordevik/",
      "org": "Västsverige/Tjörn",
      "vad": "a charming boutique hotel in the heart of Skärhamn, Hamngatan 60, Skärhamn",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/",
      "org": "Västsverige/Tjörn",
      "vad": "centralt läge, toaletter, duschar, wifi och tvättmaskin, inget bränsle",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "Västsverige/Tjörn",
      "vad": "den \"omtalade sillön\", grytformad hamn där vinden inte stör, fasta förtöjningslinor",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/",
      "org": "Västsverige/Tjörn",
      "vad": "Södra Hamnen 6, Skärhamn, certifierad av A Taste of West Sweden, fisk och skaldjur som favoritråvaror",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/bistro-port-sud/",
      "org": "Västsverige/Tjörn",
      "vad": "Södra Hamnen 8, Skärhamn, meny som blandar västkust och provensalskt",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "kungshamn": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1975, cirka 292 hektar, Bohusläns äldsta fyr rest 1842 på Hållös högsta punkt med vit blixt var tolfte sekund, byggnadsminne 1935, turbåtar från Kungshamn, badplatser, eldplatser, toalett och vandrarhem i gamla radiopejlstationen",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn",
      "org": "Sotenäs kommun",
      "vad": "cirka 100 platser, vattendjup 2,5–5 m, dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor; inget drivmedel anges; centralt läge med butiker, restauranger och banker nära",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn",
      "org": "Sotenäs kommun",
      "vad": "Fisketången (klippbad med sandstrand, bryggor med badstegar, handikappramp, omklädningsrum och toaletter), Stenbogen (klippbad med badstegar, hopptorn och trampolin), Ramnerer (klippbad)",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen",
      "org": "Sotenäs kommun",
      "vad": "digitala kartor och etappförslag",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://nordensark.se/om-oss/",
      "org": "Nordens Ark",
      "vad": "ideell stiftelse för hotade djur sedan 1989, totalt 383 hektar mark, nationellt uppfödningsansvar, adress Åby säteri, Hunnebostrand",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://fyrenkungshamn.se/",
      "org": "Restaurang Fyren",
      "vad": "Bäckeviksgatan 3D, Kungshamn, \"precis vid havet och strandpromenaden\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/kungshamn/",
      "org": "Västsverige/Sotenäs",
      "vad": "Gravarne, Bäckevik och Fisketången slogs ihop för drygt fyrtio år sedan och de gamla ortnamnen används fortfarande lokalt",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/smogen/",
      "org": "Västsverige/Sotenäs",
      "vad": "möjlighet att följa med lokala fiskare och delta i räkfisketurer",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/hotell-kungshamn/",
      "org": "Västsverige/Sotenäs",
      "vad": "namnet, adress Hotellgatan 6, Kungshamn, lägenhetssviter och egen restaurang med utsikt över Kungshamnsinloppet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/artiklar-se--gora/krogar-och-cafeer-aret-om/",
      "org": "Västsverige/Sotenäs",
      "vad": "Calmars Veranda, Hamnbageriet och Coza Café & Mat listade under Kungshamn",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "pater-noster": [
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "tjorn.se",
      "vad": "Pater Noster släcktes 1977, fyren togs iland för omfattande renovering och fördes tillbaka sommaren 2007, statligt byggnadsminne med högt kulturhistoriskt värde 2015",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://paternoster.se/",
      "org": "Pater Noster",
      "vad": "150 dagsgäster, Vi använder lokala råvaror utifrån säsong, Fisk och skaldjur från Kattegatt och Skagerrak står i fokus, utmärkelserna Världens bästa hotellkoncept, Stora Turismpriset och The Special One",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://en.paternoster.se/faq",
      "org": "Pater Noster",
      "vad": "hotellgäster med egen båt anmäler minst tre timmar i förväg, dagsbesökare med egen båt i mån av plats max två timmar, platser kan inte förbokas —  och",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/pater-noster/",
      "org": "Västsverige/Tjörn",
      "vad": "nio väldesignade rum för 18 gäster, sovplatser på klipporna sommartid, renovering av designbyrån Stylt Trampoli",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/",
      "org": "Västsverige/Tjörn",
      "vad": "Tjörn Island of Art med Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/pater-noster/",
      "org": "Västsverige/Tjörn",
      "vad": "nio rum i de restaurerade fyrvaktarbostäderna",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "vinga": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1987, cirka 559 hektar, \"Klipphällar möter buskiga snår av slån, björnbär, nypon och vinbär\", sparris, västkustarv, strandkål och marviol, gök och näktergal, Koholmen som häckningsplats",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/vinga--goteborgarnas-fyr/",
      "org": "Sjöfartsverket",
      "vad": "Göteborgarnas fyr — tornet 29 meter högt och ritat av fyringenjör Emil Karlsson, mittdelen göts i betong av Skånska Cementgjuteriet och \"Tornet kläddes med porfyrit bruten på Vinga\", automatisering 1975 och avbemannad fyrplats, kvarvarande lotsning, utställningen \"Fyrplats Vinga\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "Göteborg & Co",
      "vad": "Vinga i Göteborgs yttre skärgård",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/",
      "org": "Strömma",
      "vad": "avgång Lilla Bommens hamn, cirka 1 timme 15 minuter enkel väg, två timmar på Vinga",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/produkter/on-vinga/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "cirka fyra timmar på ön med turbåten från Hönö Klåva, kiosk och grillplatsen \"Brända Fläsket\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/",
      "org": "Winga Vänner",
      "vad": "Evert Taube tillbringade sin barndom här på Vinga eftersom pappan, Carl Gunnar Taube var fyrvaktare mellan 1889 och 1905",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/turbatar/",
      "org": "Winga Vänner",
      "vad": "Strömma från Lilla Bommen, Kungsö från Stenpiren, Silvana, Hönö Båtturer och Kastor från Hönö Klåva, Emma från Fotö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/uthyrning-av-stugor/",
      "org": "Winga Vänner",
      "vad": "Biskopsgården och Fyrmästarbostaden hyrs ut av föreningen medan \"Båken hyres ut endast för ceremonier som bröllop och dop\", Fyrfolkets By drivs av Vinga Event",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/uthyrning/",
      "org": "Winga Vänner",
      "vad": "Biskopsgården med 7 rum och 10 bäddar plus 2 extrabäddar, Fyrmästarbostaden med 3 rum och 7 bäddar, uthyrning till föreningens medlemmar; Fyrfolkets By sköts av Vinga Event",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/gasthamn/",
      "org": "Winga Vänner",
      "vad": "plats för cirka 30 båtar av normalstorlek, max 40 fot och max djup 2,5 meter, \"du är alltid välkommen med egen båt till Vinga, året runt\", toaletter, el, soprum, grillplatsen \"Brända Fläsket\" och kiosk",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "hono": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1999, cirka 529 hektar på nordvästra Hönö i Öckerö kommun, \"Strandlinjen är sönderskuren i vikar och uddar och här finns ett rikt fågelliv\", hedar och lavklädda hällar, skalrik jord, grusade stigar, klippformationen Kröckle Kyrka, Kråkudden med fågelskådarskydd, grillplats, torrdass, bad, informationstavla och cykelled",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/kommun-och-politik/kommunfakta",
      "org": "Öckerö kommun",
      "vad": "Öckerö kommun ligger i Göteborgs skärgård och består av cirka 1000 öar och skär. På våra tio bebodda öar bor det nästan 13 000 personer, högsta punkten på Röseberget på norra Björkö cirka 50 meter över havet",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser",
      "org": "Öckerö kommun",
      "vad": "tretton kommunala badplatser, bland dem Gula skäret, Jungfruviken, Lapposand och Knöten",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/naturomraden-och-naturreservat",
      "org": "Öckerö kommun",
      "vad": "Rörö naturreservat, Grötö Knötens naturreservat, Björkö naturområde samt naturområden och motionsspår på Hälsö, Källö-Knippla och Öckerö",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.gasthamnsguide.se/omradesindelat/vastkusten/item/hono-klava-gasthamn",
      "org": "gasthamnsguide.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "Göteborg & Co",
      "vad": "väg 155 till färjeläget vid Lilla Varholmen, den avgiftsfria vägfärjan, buss 290 från Järntorget hela vägen inklusive färjeöverfarten och buss X6 från Centralstationen till Lilla Varholmen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/hono",
      "org": "Göteborg & Co",
      "vad": "en populär gästhamn, ett tjugotal butiker samt restauranger, kaféer och pizzerior, Klipporna breder ut sig längs kusterna, badplatserna Hästen, Lappesand, Jungfruviken och Halse Långe",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://honoklavahamn.se/",
      "org": "Hönö Klåva Hamn",
      "vad": "privatägd båt- och fiskehamn, nyrenoverat servicehus vid gästhamnen med duschar, toaletter, tvättmaskin och torktumlare",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://skargardshotellethono.se/en/home/",
      "org": "Skärgårdshotellet Hönö",
      "vad": "Västra vägen 17, Hönö Klåva, 16 rum varav hälften med havsutsikt, restaurang, konferens och festvåning",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.tullhuset.se/",
      "org": "Tullhuset",
      "vad": "Västra Vägen 3, Hönö, fisk- och skaldjursrestaurang med à la carte, smakmeny och skaldjursbuffé",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/",
      "org": "Visit Öckerö",
      "vad": "Hela året går färjorna från Lilla Varholmens färjeläge ... avgiftsfria turer ut till Öckeröarna",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/centrum-for-fiske/",
      "org": "Visit Öckerö",
      "vad": "cirka 300 yrkesfiskare i kommunen, \"var tionde svensk yrkesfiskare\", \"tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige\", fiskebåtar längs kajerna i Hönö Klåva, Öckerö och Rörö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/",
      "org": "Visit Öckerö",
      "vad": "Hönö Sjöbodar som ett av boendena på ön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/eat-drink/eat-klava/",
      "org": "Visit Öckerö",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/produkter/havskatten/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "namnet \"Havskatten Hotell & Vandrarhem\", läge i Hönö Röds hamn, 12 hotelldubbelrum och 9 sovrum med eget badrum, bastu och konferens",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/produkter/honoklavahamn/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "gästplatser och ställplatser för husbil, restauranger i hamnen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/produkter/restaurang-kroken/",
      "org": "Västsverige/Visit Öckerö",
      "vad": "namnet \"Klova Hamnkrog\" (även kallad Nya Kroken), Hönö Klåva hamn väg 15, uteservering i lä, mat lagad från grunden, hummermiddagar och à la carte",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "gullholmen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Det finns fina uppmärkta stigar på Härmanö, och ett par av dem är anpassade för rullstol, stigen leder till Härmanö huvud med badplats och utkiksplats",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn",
      "org": "Orust kommun",
      "vad": "50 platser, el, servicebyggnad med toalett, dusch och tvättmaskin, sugtömningsstation, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/",
      "org": "Bohusläns museum",
      "vad": "bekräftar äldsta säkra belägg 1588, ca 100 hus och ca 400 invånare år 1800 samt drygt 800 invånare 1910",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://gullholmenshamnkrog.se/",
      "org": "Gullholmens Hamnkrog",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/",
      "org": "Gullholmsbaden",
      "vad": "69 fullt utrustade stugor, egen restaurang, konferenslokaler och minigolf",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/?page_id=19",
      "org": "Gullholmsbaden",
      "vad": "Restaurangen — Sommarterrass med havsutsikt, a la carte samt hantverkarlunch",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.gasthamnsguiden.se/en/harbor/gullholmen-gasthamn-2/",
      "org": "Gästhamnsguiden",
      "vad": "Harbour Depth 2 - 7 m Spots 50, bekräftar färskvatten, el, dusch, toalett och tvättstuga, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5",
      "org": "Västsverige",
      "vad": "bekräftar att samhällshalvan brukar kallas Sveriges mest tätbebyggda ö och att andra halvan ligger på Härmanö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/trails/harmano-hiking-trails/",
      "org": "Västsverige",
      "vad": "bekräftar leder från färjeläget hela vägen till Härmanö huvud, ca 8 km uppdelat i etapper",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "Västsverige",
      "vad": "Gullholmen — Käringön — Västtrafiks linje 381 avgår från Tuvesvik, tio minuter till Gullholmen, cykel kan tas med",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/",
      "org": "Västsverige/Orust",
      "vad": "bekräftar att Gullholmen är bilfri och har butik, kyrka, bibliotek och biograf",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/gullholmens-hamnkrog/",
      "org": "Västsverige/Orust",
      "vad": "mötesplats ett stenkast från hamnen",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "kladesholmen": [
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen",
      "org": "Tjörns kommun",
      "vad": "sillhandel sedan 1500-talet, den stora sillperioden på 1700-talet, nästa sillperiod runt 1870, 26 fabriker 1967, tre kvar vid millennieskiftet som gick samman",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "Tjörns kommun",
      "vad": "ordagrant \"Under den stora sillperioden 1747-1808 bodde uppemot 1 000 personer på Klädesholmen\"",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "Tjörns kommun",
      "vad": "Sjöboden på Salt och Sill — Restaurang på Salt & Sill som specialiserar sig på pizza",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar",
      "org": "Tjörns kommun",
      "vad": "listar Klädesholmen bland kommunens gästhamnar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "Klädesholmen Västra Hamn",
      "vad": "el (6 A ingår), färskvatten, dusch och toalett samt grillplats, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://kladesholmen.com/",
      "org": "Klädesholmens Samhällsförening",
      "vad": "beskriver ön som \"Klädesholmen, solens & sillens ö\"",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://kladesholmen.com/att-gora/museum/",
      "org": "Klädesholmens Samhällsförening",
      "vad": "Sillebua — öppnade 1995 i en gammal konservfabrik, flyttade 2020 till Sillens hus på Strandgatan 12B, visar fisk- och sillberedning från ca 1860, dokumentationsavdelning",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/om-salt-sill/var-historia/",
      "org": "Salt & Sill",
      "vad": "Sveriges första flytande hotell, sex moduler bogserade till Klädesholmen i juli 2008 på specialtillverkade pontoner, 300 m² konferens- och eventlokaler våren 2013",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/hotell/",
      "org": "Salt & Sill",
      "vad": "Sveriges första flytande hotell, fyra serveringar och konferens på anläggningen, bastubåt —  och",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/",
      "org": "Salt & Sill",
      "vad": "listar Saltbaren som en av fyra serveringar på anläggningen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/sjoboden/",
      "org": "Salt & Sill",
      "vad": "neapolitansk pizza och skaldjur från lokala fiskare",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/holmens-kiosk/",
      "org": "Salt & Sill",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/kladesholmen/",
      "org": "Västsverige/Tjörn",
      "vad": "bebodd redan på 1200-talet, norsk biskop passerade 1594 och beskrev ön som ett gammalt fiskeläge, drygt 400 invånare 1830, nästan tusen i början av 1900-talet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/",
      "org": "Västsverige/Tjörn",
      "vad": "ligger i Jungfruviken, drivs av Klädesholmens Bastuförening, havsvatten kan pumpas in i badtunnan, bokning via bastuföreningen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/house-of-herrings/",
      "org": "Västsverige/Tjörn",
      "vad": "sillbutik på Klädesholmen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "Västsverige/Tjörn",
      "vad": "35 platser, dusch, el, livsmedel, restaurang, toalett, sugtömning och miljöstation",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "astol": [
    {
      "url": "https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf",
      "org": "Riksantikvarieämbetet",
      "vad": "Åstol [O 62] (Rönnäng sn)",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar",
      "org": "Tjörns kommun",
      "vad": "listar Åstol bland kommunens gästhamnar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "Tjörns kommun",
      "vad": "Åstols Café — Kafé på Åstol, dit du kommer med personfärja från Rönnäng",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/astol/",
      "org": "Västsverige/Tjörn",
      "vad": "vita trähus mot kala klippor, smala bilfria gator, befolkades vid mitten av 1700-talet under en av de stora sillperioderna, mer än tjugo stora ståltrålare med hemmahamn på Åstol på 1960-talet, fiskeindustri fram till 1970-talet",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/",
      "org": "Västsverige/Tjörn",
      "vad": "en bilfri klippö, smala gränder mellan vitmålade trähus",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/",
      "org": "Västsverige/Tjörn",
      "vad": "Tjörnekalv — Dyrön — Åstol — Västtrafiks linje 361 från Rönnängs brygga, cirka en kvart till Åstol, biljettautomat vid färjeläget, cykel kan tas med",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/astols-rokeri/",
      "org": "Västsverige/Tjörn",
      "vad": "fiskrestaurang med eget rökeri och en liten butik, adress Hamnen 4, 471 44 Åstol",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/astols-gasthamn/",
      "org": "Västsverige/Tjörn",
      "vad": "80 platser, el, wifi, färskvatten, båtkran, miljöstation, septisug, dusch, tvättmaskin, torktumlare, WC",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.astolshamn.se/gasthamn/",
      "org": "Åstols hamn",
      "vad": "vatten april–oktober, el 220 V, dusch och toalett, tvättmaskin och torktumlare, wifi, inget drivmedel",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "http://www.astolsrokeri.se",
      "org": "Åstols Rökeri",
      "vad": "mat och musik mitt i havet, adress Hamnen 4, 471 44 Åstol, havsrätter och pizza, regelbundna musikframträdanden",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://astol.se/besok-astol/",
      "org": "Åstols Samhällsförening",
      "vad": "hamnen väl skyddad från de flesta vindar, gästhamnsplatser på norra och södra sidan",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "dyron": [
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder",
      "org": "Tjörns kommun",
      "vad": "gula leden 5 km och medelsvår, gula brickor på trästolpar, delen Sydhamnen–bastun framkomlig med rullstol och barnvagn, blå leden 1,6 km över bergen från norr till söder, rastplatser, utsikt mot Marstrand, Åstol och Pater Noster, sandstrand på östra sidan",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "Tjörns kommun",
      "vad": "Dyrön Cafe & Kiosk med uteservering i Sydhamnen under sommaren",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/batliv-och-hamnar",
      "org": "Tjörns kommun",
      "vad": "listar både Nordhamnen och Sydhamnen som gästhamnar",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.dyron.se/om-dyron/",
      "org": "Dyrön",
      "vad": "Ett speciellt inslag är de inplanterade vilda bergsfåren s k mufflonfår, varierat och dramatiskt landskap",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://dyronsvardshus.se/",
      "org": "Dyröns Värdshus",
      "vad": "upp till 12 sjöbodar, plats för upp till 6 personer per bod, pentry, badrum, tvättmaskin, vardagsrum och uteplats",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://linasbrygga.se/",
      "org": "Linas Brygga",
      "vad": "kafé i Södra Hamnen, 47114 Dyrön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/",
      "org": "Västsverige/Tjörn",
      "vad": "Dyrön som grönskande ö känd för sin storslagna natur, dramatisk skärgårdsmiljö, vilda mufflonfår",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/",
      "org": "Västsverige/Tjörn",
      "vad": "Nordhamnen 20 platser långsides på norra sidan och akterförtöjning i inloppet, Sydhamnen 55 platser med fast akterförtöjning och långsides, båda med sjömack/diesel och sugtömning, nära till mataffär, färjetrafik från Nordhamnen",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/",
      "org": "Västsverige/Tjörn",
      "vad": "restaurang med skaldjur, fisk, kött, grönsaker och svamp samt övernattning i sjöbodar vid vattnet, adress Hamnvägen, 471 43 Dyrön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/",
      "org": "Västsverige/Tjörn",
      "vad": "Tjörnekalv — Dyrön — Åstol — Västtrafiks linje 361 utgår från Rönnängs brygga, 20 minuter till Dyröns norra hamn, biljettautomat vid färjeläget i Rönnäng",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/dyron/",
      "org": "Västsverige/Tjörn",
      "vad": "södra hamnen har förbindelse till Rökan, därifrån buss",
      "last": "2026-09-16",
      "myndighet": false
    }
  ]
}

/** Antal öar med minst en publicerbar källa. */
export const OAR_MED_KALLOR = 90

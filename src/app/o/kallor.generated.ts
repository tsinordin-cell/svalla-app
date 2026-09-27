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
      "vad": "Skyddat sedan: 1965, Storlek: 1,6 hektar varav land 1,1 hektar, en liten, flack och vegetationsfattig ö i det yttersta kustbandet öster om Sandhamn, den kända Grönskärs fyr som är av stort kulturhistoriskt värde",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf",
      "org": "lansstyrelsen.se",
      "vad": "näbbgädda: \"Våren och sommaren\", \"I Stockholms yttre skärgård från Sandhamn och söderut\", \"Grönskär, Horsten, Långviksskär, Ålö, Torö\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "naturvardsverket.se",
      "vad": "Mellan 1 mars och 20 augusti måste du ha extra uppsikt över din hund i naturen. Under den tiden får hunden inte springa lös., Ha alltid koppel på hunden när ni vistas i nationalparker eller naturreservat ;  — Här får man ha hund (stugan Friggan)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/sandhamn",
      "org": "waxholmsbolaget.se",
      "vad": "och då tar resan drygt en timme, Det går flera turer varje dag till Sandhamn, tabell 16 ;  — Year round — including winter, Take bus 433 from Slussen or drive to Stavsnäs Vinterhamn ;  — Stavsnäs vinterhamn, Slussen 10.15 → Stavsnäs vinterhamn 11.06",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://battaxi.se/sandhamnslinjen-2/",
      "org": "battaxi.se",
      "vad": "Sandhamnslinjen är en direkt reguljär tur som tar dig mellan Stavsnäs och Sandhamn på endast 30 minuter, Höst 2 2026 (21/9-20/12) ;  — GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, STAVSNÄS — SANDHAMN — HAGEDE: Stavsnäs 09.45 → Sandhamn 10.45, 07.00 → 08.05, 20.12 → 20.50 ;  — Year round — including winter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dykarbaren.se/",
      "org": "dykarbaren.se",
      "vad": "Öppet 2026 säsong maj — september ;  — servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september ;  — året runt ;  — Puben, Öppet året runt",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/hamnar/sandhamn/aktuellt",
      "org": "ksss.se",
      "vad": "26 juni-2 juli, Gotland Runt. Hela hamnen abbonerad.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/hamnar/sandhamn",
      "org": "ksss.se",
      "vad": "Det finns ca 150 gästplatser på Sandhamn, Gästhamnen har 20 st bokningsbara platser, Hamnen är öppen från sista helgen i april till sista helgen i oktober ;  — Vatten på bryggorna och servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.naturkartan.se/sv/stockholms-lan/sandon-2",
      "org": "naturkartan.se",
      "vad": "Den naturtyp som man ser över större delen av Sandön är trädklädda sanddynor, måste du åka till Gotska Sandön eller Fårö, Öns växtlighet består till stor del av vindpinade och små tallar, även om de tallar som är över 200 år är ofta smala stammar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/sv/restauranger-och-barer/segelsalen",
      "org": "sandhamn.com",
      "vad": "Vi serverar en särskilt framtagen meny med fokus på säsongens råvaror, Boka gärna bord i förväg",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/sv/spa",
      "org": "sandhamn.com",
      "vad": "Här kan ni simma i den tempererade poolen, sjunka ner i jacuzzin, Här finns också bastu, gym, Spa och gym har öppet dagligen mellan 08.00–20.00, Icke hotellgäster är välkomna i mån av plats, Värmen från den vedeldade bastun, Bokningar av bastuflotten sker via receptionen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/",
      "org": "sandhamn.com",
      "vad": "Hit kommer människor för att vila, fira, mötas och njuta av skärgården — året runt, Frukost ingår, och som hotellgäst har du fri tillgång till spa och gym under hela vistelsen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/en/hitta-hit",
      "org": "sandhamn.com",
      "vad": "including winter),  (Öppet året runt, Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger),  (året runt),  (Öppet 2026 säsong maj — september),  (servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september) . Cinderella 30/4–27/9 2026 enligt Strömmas tidtabell (se getting_there).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://sandhamns-vardshus.se/boende",
      "org": "sandhamns-vardshus.se",
      "vad": "På Missionshuset finns det 5 dubbelrum med gemensamma badrum, På gården finns en stuga med eget badrum som vi kallar för Friggan. Här får man ha hund., I alla våra priser ingår frukost, lakan och handdukar, Missionshuset är öppet året runt för bokning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://sandhamns-vardshus.se/",
      "org": "sandhamns-vardshus.se",
      "vad": "Sandhamns Värdshus anno 1672, Puben Här är hjärtat på Värdshuset! Öppet året runt., Restaurangen Med en magisk utsikt över hamnen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamnsbageriet.com/",
      "org": "sandhamnsbageriet.com",
      "vad": "Vetesurdegsbröd, Kanelbulle, Kardemummabulle, Seglarbulle, TÅRTOR, Ost & Skinkmacka, SISTA HELGEN -26",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://sandshotell.se/",
      "org": "sandshotell.se",
      "vad": "Sands Hotell erbjuder boende i lägenheter och rum, Hotellet har 15 dubbelrum, 3 enkelrum så totalt 33 bäddar, relaxavdelning med bastu",
      "last": "2026-09-27",
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
      "url": "https://stockholmarchipelagotrail.com/section/section-sandhamn/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Sandhamn, Easy 8.1 km (ledens egen webbplats)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/sandhamn/",
      "org": "stockholmslansmuseum.se",
      "vad": "Det pampiga gula tullhuset av sten som dominerar hamnen ritades av slottsarkitekten Carl Hårleman och byggdes 1752, I de små 1700-talshusen Bryggstugan och Tullvaktstugan finns ett museum, Den tre kilometer långa och en kilometer breda ön består av sand och åter sand",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf",
      "org": "Strömma",
      "vad": "Strandvägen - kajplats 14, 7/9 - 27/9, Strandvägen 10:00 → Sandhamn 12:30",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html",
      "org": "varmdo.se",
      "vad": "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida, omkring 20 minuters promenad från hamnen, Toaletter sommartid, Badet ägs och sköts av Eknö hemman, Ingen provtagning av badvatten utförs av Värmdö kommun. Stod ca 10 min, barnvänligt djup, vind och namnets ursprung utan källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "varmdo.se",
      "vad": "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville och vidare genom den vackra och ljusa tallskogen som är typisk för ön.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/sandhamn",
      "org": "varmdo.se",
      "vad": "Värmdö Hamnar äger fastigheten vid inloppet till Sandhamn, Tullhuset som idag innehåller hyreslägenheter, På fastigheten finns Sjöfartsverkets lotsverksamhet samt Kustbevakningen etablerade",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/flaskberget.4.18c983316e0536cb189a2c1.html",
      "org": "varmdo.se",
      "vad": "Ett fint klippbad alldeles vid Sandhamns by, Badet fick sitt namn efter en skuta lastad med fläsk gick på grund och sjönk där för länge sedan, Toaletter sommartid, Badet ägs och sköts av Eknö hemman, Ingen provtagning av badvatten utförs av Värmdö kommun",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "varmdo.se",
      "vad": "Ska du parkera max 3 timmar så är det gratis om du använder p-skiva, Du betalar din besöksparkering med app, Parkit Sweden AB ansvarar, I Stavsnäs vinterhamn finns cirka 1300 parkeringsplatser. Cirka hälften är till för besökare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "STAVSNÄS — SANDHAMN — HAGEDE (året runt, tabellen gäller till 12 december 2026) ;  — GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026 (linje 15 Strömkajen–Sandhamn) ;  — Departures run several times daily . Sandhamnslinjen Stavsnäs–Sandhamn drivs av Stavsnäs Båttaxi, inte Waxholmsbolaget.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s15.pdf",
      "org": "Waxholmsbolaget linje 15",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25 . Seglarhotellets uppgift om 2–3 timmar för linje 15 stämmer inte med tidtabellen och används inte.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "uto": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html",
      "org": "lansstyrelsen.se",
      "vad": "inom hela reservatet med undantag av Persholmen medföra hund som ej är kopplad. För Persholmen skall hund vara kopplad under tiden 1 mars - 20 augusti och under övrig tid hållas under uppsikt, tälta eller ställa upp husvagn annat än på anvisad plats, för längre tid än två dygn förtöja eller förankra båt vid samma strand, göra upp eld annat än på härför iordningställda och anvisade platser, Tillträdesförbud på Utö skjutfält vissa tider.",
      "last": "2026-09-27",
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
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf",
      "org": "lansstyrelsen.se",
      "vad": "Andra bra ställen är, Baggensfjärden, Ingarö, Ornö, Utö och Torö, Fritt handredskapsfiske gäller på enskilt vatten i Mälaren och skärgården",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "naturvardsverket.se",
      "vad": "Koppla hunden när vilda djur har ungar, 1 mars–20 augusti.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar",
      "org": "sl.se",
      "vad": "Under lågsäsongen, från 14 september till 29 april, gäller alla SL:s periodbiljetter som har en giltighetstid på 30 dagar eller längre för resor på Waxholmsbolagets båtar. . Priset 104/64 kr struket: ingen daterad prislista kunde läsas.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/hembygdsmuseer/",
      "org": "haninge.se",
      "vad": "Utö gruvmuseum, Museet ligger alldeles intill gruvschakten och berättar historien om Utös gruvor.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/uto/",
      "org": "skargardsstiftelsen.se",
      "vad": "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens; Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter; Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis; lansstyrelsen.se Utö: Waxholmsbåt året om till Gruvbryggan",
      "last": "2026-09-27",
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
      "url": "https://kund.printhuset-sthlm.se/sl/v846.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Västerhaninge station–Årsta (–Årsta slott), Tidtabellen är anpassad till pendeltåg från Stockholm vid, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; Västerhaninge station–Årsta brygga 14–17 min enligt tabellen",
      "last": "2026-09-27",
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
      "url": "https://stockholmarchipelagotrail.com/section/uto-alo-connector-2/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "A gravel road takes you through an active military firing range that connects the trail sections on Utö and Ålö., The distance is 4.6 km along the gravel road, It takes about 90 minutes to walk between the sections., Never leave the gravel road until you reach the next section.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-uto-sv/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Etapp Utö är en utmanande etapp som har allt. Denna 18,4 km långa etapp, Från Gruvbryggan kan du ta dig norrut längs grusvägen. Antingen hela vägen till Kroka eller till Barnens bad.",
      "last": "2026-09-27",
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
      "url": "https://www.utogasthamn.se/uto-cykeluthyrning/",
      "org": "utogasthamn.se",
      "vad": "I Cykelboden har vi över 300 cyklar från Skeppshult, Här finns även barnstolar, sulkys och cykelkärror, Under högsäsong kan du även hyra din cykel på, Du kan välja att lämna tillbaka din cykel på Utö i Cykelboden eller på Ålö vid restaurangen Båtshaket.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/hitta-hit/",
      "org": "utogasthamn.se",
      "vad": "Under sommarmånaderna går det att ta sig till Utö med färja från Strömkajen i centrala Stockholm.",
      "last": "2026-09-27",
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
      "url": "https://www.utogasthamn.se/att-gora/",
      "org": "utogasthamn.se",
      "vad": "Persholmen som ligger över den lilla bron nere i hamnen har klippbad, en fin och långgrund sandstrand i en liten vik (om Barnens bad), Storsand, som är just en stor sandstrand och ligger på skjutfältets mark några kilometer från Gruvbyn. Glöm bara inte att fråga oss i Hamnboden om skjutfältet är öppet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/camping/",
      "org": "utogasthamn.se",
      "vad": "Campingen är av så kallad friluftsmodell och har inga numrerade platser, På campingen finns en servicestuga med toaletter, duschar och ett enklare kök, Du anmäler dig och betalar i Hamnboden",
      "last": "2026-09-27",
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
      "vad": "Kvarnvillan är vår nyaste hotellbyggnad med 8 dubbelrum, Byggnaden är en varsamt renoverad 1700-talsbyggnad med totalt 10 rum, Våra faluröda hotellstugor ligger i sluttningen ner mot hamnen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/boende/vandrarhemmet/",
      "org": "utovardshus.se",
      "vad": "Utö Vandrarhem Skärgården, Vandrarhemmet är i tre plan och har 73 bäddar",
      "last": "2026-09-27",
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
      "url": "https://www.utovardshus.se/bakfickan/",
      "org": "utovardshus.se",
      "vad": "DANSA IN SOMMARNATTEN, musik, dans och trevligt umgänge, Bakfickan stänger för säsongen 31 augusti 2026.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kulturarvstockholm.se/industrihistoria/artiklar-om-industrihistoria/uto-gruvor/",
      "org": "Utö gruvor",
      "vad": "under 1840-talet uppnådde befolkningstalet sitt maximum, 446 personer / År 1879 upphörde slutligen gruvdriften helt. «16 000 ton/år» och «cirka 500 invånare» saknade källa och motsade 446; strukna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h21.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 21A ÅRSTA — UTÖ, minst 1 timme innan avgång; Årsta brygga–Gruvbryggan 40 min på de flesta turer (t.ex. 11.00–11.40), 55–75 min när båten går via Spränga först, kortast 35 min (20.35–21.10)",
      "last": "2026-09-27",
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
      "url": "https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf",
      "org": "assets.ctfassets.net",
      "vad": "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor ;  (renderad med webbläsare, laddar inte med curl) — Inom Waxholmsbolagets SL-område kan du året runt resa på alla SL-biljetter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://catchrelax.se/",
      "org": "catchrelax.se",
      "vad": "Guidade fisketurer och aktiviteter i Stockholms skärgård & Mälaren sedan 2005, Villa HelleBo 5 minuter från Vaxholm",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationvaxholm.se/events/vaxholms-julmarknad-2025",
      "org": "destinationvaxholm.se",
      "vad": "Den andra helgen i advent, 6 — 7 december, är det åter dags för Vaxholms traditionsenliga julmarknad. Med brända mandlar, hantverk, glögg och granar, plats Rådhustorget",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationvaxholm.se/skargardens-kanotcenter",
      "org": "destinationvaxholm.se",
      "vad": "Skärgårdens Kanotcenter och Adventure Hub erbjuder guidade turer, kajak-och cykeluthyrning, gruppaktiviteter och friluftsäventyr året runt, Ingen tidigare paddlingserfarenhet behövs när du paddlar med guide, Resarövägen 10 ; verksamheten aktiv hösten 2026 enligt",
      "last": "2026-09-27",
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
      "url": "https://kund.printhuset-sthlm.se/sl/v670_670x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "670 Stockholm–Vaxholm, Giltig 14 december 2025–18 juni 2026 ;  — SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor, med Strömkajen och Vaxholm i listan ;  (renderad med webbläsare, laddar inte med curl) — Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd. Det här gäller året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/vaxholm/",
      "org": "stockholmslansmuseum.se",
      "vad": "Kastellet är byggt i granit med mer än två meter tjocka murar och kaserner för över tusen man. Beväpningen utgjordes av 156 kanoner., kastellet genom artilleriets utveckling blivit omodernt redan när det stod klart, man tar sig dit med en linfärja",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/",
      "org": "svenskagasthamnar.se",
      "vad": "Gästhamnen är placerad mitt i centrum, I Gästhamnen finner du restaurang, bar, café och glasskiosk, flera sjöbodar med kläder, skor, inredning, leksaker och souvenirer, service hus med duschar och toaletter, 110 gästplatser",
      "last": "2026-09-27",
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
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia",
      "org": "vaxholm.se",
      "vad": "Vaxholm fick sina första stadsprivilegier år 1647, av drottning Kristina; Viss bebyggelse har funnits på Vaxön sedan 1200-talets slut; omkring 1770 ca 800 invånare; början av 1900-talet ca 2 000 invånare; Vaxholm fick sina första reguljära ångbåtsförbindelser c:a 1850",
      "last": "2026-09-27",
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
      "url": "https://www.vaxholm.se/",
      "org": "vaxholm.se",
      "vad": "badplatsen på Rindö heter Grönviksbadet/Grönviken, \"liten sandstrand och en brygga\", renoverad 2020",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "vaxholm.se",
      "vad": "Beläget på södra Rindö i slutet på Grönviksvägen finns detta lilla lokala bad, Sandstrand, Badbrygga, Grillplats, Baja-maja under badsäsong",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vaxholm.se/allanyheter/nyhetsarkiv/vadgallernarskahundarvarakopplade.5.117b327517db288a7c818059.html",
      "org": "vaxholm.se",
      "vad": "Vaxholms föreskrifter anger att hundar ska hållas kopplade på offentliga platser i hela kommunen och att hundar inte får vistas på begravningsplatser eller lekplats som är offentlig plats, det är förbjudet att medföra okopplad hund i reservatet",
      "last": "2026-09-27",
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
      "url": "https://vaxholmsfastning.se/besoksinfo/index.php",
      "org": "vaxholmsfastning.se",
      "vad": "BESÖKSINFO 2026, Hos oss kan du ta del av historien om skärgårdens försvar under 500 år, Visningar med guide ingår i entréavgiften och utgår från museet fr.o.m. 27 juni t.o.m. 16 augusti, cirka 45 minuter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA, bryggorna Nacka strand, Hasseludden, Gåshaga brygga . Restiden Strömkajen → Vaxholm ank. är 55–82 min på de 34 turerna i tabellen (siffrorna ligger i ett kodat typsnitt i PDF:en och är avkodade och räknade kolumn för kolumn).",
      "last": "2026-09-27",
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
      "vad": "för längre tid än två dygn i följd förankra båt vid samma strand; förankra båt längs de strandsträckor som markerats med heldragen linje på karta; framföra motordrivet motorfordon annat än på anvisade vägar; landa med luftfarkost på annat än anvisad plats; på ett för andra störande sätt använda musikanläggning eller musikinstrument.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/grinda",
      "org": "waxholmsbolaget.se",
      "vad": "Resan från Strömkajen tar ungefär en och en halv timme.; Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om.; tabell 11",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "waxholmsbolaget.se",
      "vad": "Om du till exempel ska resa från Strömkajen till Grinda kan du resa på SL-biljett mellan Strömkajen och Vaxholm och sedan resa på en Waxhomsbolaget-biljett för sträckan mellan Vaxholm och Grinda.; Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april; Om din SL-biljett gäller i 30 dagar eller mer kan du resa på den i hela Waxholmsbolagets trafik när det är lågsäsong.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://grinda.se/en/accommodation/sea-lodge/",
      "org": "grinda.se",
      "vad": "Grinda Sea Lodge is located in a scenic seaside location on the southern part of the island; a total of 44 beds in 4- and 2-bed rooms; Open for individuals and/or families during the high season, from midsummer starting Thursday to mid-August.; Breakfast is included for those staying overnight",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/en/accommodation/",
      "org": "grinda.se",
      "vad": "We have 27 different cottages in our charming cottage village.; Bring your own tent and pitch it in our large camping area. No need to book a pitch here.; Company registration number: 556251-4272",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/mat-fest/wardshuset/",
      "org": "grinda.se",
      "vad": "Grinda Wärdshus klassisk skärgårdsmat & stämning sedan 1906; Det anrika huset har blickat ut över Saxarfjärden sedan 1906; Gör din bordsreservation på Grinda Wärdshus",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/mat-fest/framfickan/",
      "org": "grinda.se",
      "vad": "hamnkrog, pizza & lättare rätter, Gästhamnen ligger bara tio simtag bort, endast drop-in",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/mat-fest/lanthandel-cafe/",
      "org": "grinda.se",
      "vad": "Vi är stolta att kunna erbjuda nybakat bröd och ljuvliga bullar varje dag under högsäsong, fr o m Midsommarveckan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/",
      "org": "grinda.se",
      "vad": "Tredje helgen i oktober har vi vårt återkommande tema och event Eld!; När löven börjar falla och färgerna skiftar i rostrött och violett.; tänder vi öppna brasan i Wärdshuset stora salong",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/gasthamn/",
      "org": "grinda.se",
      "vad": "En trygg gästhamn för 100 båtar; Som övernattande gäst har du tillgång till el, dusch, toalett; Det finns det 28 st bokningsbara platser i gästhamnen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/sakerhet-service/",
      "org": "grinda.se",
      "vad": "El finns på alla bryggor, eftersom vi befinner oss på en ö så är tillgången begränsad 24 uttag / båtar kan använda elen samtidigt.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/en/accommodation/camping/",
      "org": "grinda.se",
      "vad": "beautifully located on Norra Grinda; No reservation is needed; the fee includes access to waste disposal, dry toilets and shower facilities",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/sjomack/",
      "org": "grinda.se",
      "vad": "Bensin 98, Diesel, Gasol; Vår sjömack har öppet året om",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/grinda/",
      "org": "skargardsstiftelsen.se",
      "vad": "Följ stigarna mellan norra och södra bryggan; bland annat natur- och kulturstigen och; som leder genom skogar, öppna marker och historiska miljöer; bjuder på en varierad vandring genom skogar, öppna ängar och havsnära klipplandskap",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/jordbruken-och-angarna/",
      "org": "skargardsstiftelsen.se",
      "vad": "Grinda lantbruk",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "Den vackra jugendvillan i sten är ritad av Ernst Stenhammar och stod klar 1908.; Efter 1944 fungerade huset under en tid som behandlingshem och barnkoloni.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/aktuellt/vara-hus-grinda/",
      "org": "skargardsstiftelsen.se",
      "vad": "Resan börjar genom Lindalssundet; Kring förra sekelskiftet uppfördes här några av skärgårdens mest påkostade sommarnöjen; Mitt i denna idyll lät Henrik Santesson, Nobelstiftelsens första vd, 1906 uppföra den stora sommarvillan som i dag är Grinda Wärdshus.; med pensionatsverksamhet, badgäster, ridläger, barnkollo och dagens värdshus",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "skargardsstiftelsen.se",
      "vad": "Stiftelsen Stockholms skärgård bildas den 20 mars 1959.; Samma år skänker Stockholm stad alla sina skärgårdsmarker till Skärgårdsstiftelsen och vårt markinnehav fördubblas från ca 7 000 ha till ca 14 000 ha mark.; idag är vi Stockholms läns tredje största markägare (årtalet 1998 står som rubrik närmast ovanför)",
      "last": "2026-09-27",
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
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/grinda/",
      "org": "stromma.com",
      "vad": "1,5 timmes båttur från Stockholm till Grinda genom skärgården; Avgår från Strandvägen, Nacka Strand, Vaxholm och fler stopp",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/",
      "org": "svenskaturistforeningen.se",
      "vad": "Till hotellet och Wärdshuset är det ungefär lika nära från Södra Bryggan som från Norra bryggan, en knapp kilometers promenad (15 min).; Har du större eller tungt bagage kan transport ordnas på förfrågan.; Till Grinda Sea Lodge är Södra bryggan närmast.; Från Norra bryggan till Grinda Sea Lodge är det 30 minuters promenad tvärs över ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; 11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA — måndag–torsdag t.ex. tur 1402 Strömkajen 07.45, Södra Grinda 09.15 (1 h 30 min); tur 1203 10.40–12.50; tur 1313 13.00–14.45 (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; 11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA — från 14 september måndag–torsdag tur 1341 08.15–10.10 Södra Grinda, tur 1201 10.00–12.40 Norra Grinda, tur 1303 14.45–17.00 Södra Grinda (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s14.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "14A STOCKHOLM — VAXHOLM — SOLLENKROKA — MÖJA; Södra Grinda",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "finnhamn": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html",
      "org": "lansstyrelsen.se",
      "vad": "föreskrifterna kräver kopplad hund, tillåter eldning endast på anvisade platser, förbjuder tältning längre än två dygn i följd och hänvisar tältning på Idholmen, Stora och Lilla Jolpan till anvisade platser, förbjuder att förtöja båt \"längre tid än två dygn i följd\" på samma plats, att landa luftfarkost utanför anvisad plats och att använda musikanläggning störande",
      "last": "2026-09-27",
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
      "url": "https://finnhamn.se/",
      "org": "finnhamn.se",
      "vad": "flytbryggan på Söder Långholm som ligger avskilt på ön mittemot Finnhamn till öster ;  — På Söderlångholm har vi en flytbrygga, Här finns sopmaja och mulltoa., Endast stäv- och akterförtöjning. ;  — Söder Långholm passar dig som söker ett lugnare och mer naturnära läge",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://finnhamn.se/boende",
      "org": "finnhamn.se",
      "vad": "består idag av 30 stugor, Stugorna är belägna på Idholmen, De 30 stugorna är fördelade på två och fyrbäddsstugor., Torrdass och dusch i separata hus, Njut av vattnet, båtlivet och skärgården i en av sex små lägenheter.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://finnhamn.se/aktiviteter",
      "org": "finnhamn.se",
      "vad": "Vi har 11 nybörjarkajaker som är enkla och stabila., Kajakerna finns nere vid Ragnars kiosk., lär dig paddla i den skyddade Paradisviken, Vi har nio brädor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://finnhamn.se/hamnar",
      "org": "finnhamn.se",
      "vad": "Glassbar och cafe. Uthyrning av SUP, kajak och roddbåt., Hamnavgift betalas i Ragnars kiosk, Lanthandeln eller Vandrarhemmet. ;  — Vandrarhemsviken, den mindre hamnen med ett 20 tal platser med närhet till krog och lanthandel ;  — Proviant och i vissa fall friluftsutrustning finns till försäljning. Sortiment varierar.",
      "last": "2026-09-27",
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
      "vad": "Finnhamn är ett av de mest välbesökta utflyktsmålen i Stockholms skärgård, Finnhamn nås med reguljär båttrafik från Stockholm, året runt, café och kiosk, vandrarhem, stugor och tältplatser på anvisade områden, badplatser med både sandstrand och klippor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "skargardsstiftelsen.se",
      "vad": "Arkitekt var Ernst Stenhammar som ritat många ståtliga hus i skärgården, till exempel den stora jugendvillan på Grinda, Idag är Utsikten vandrarhem. ;  — Vandrarhemmet renoverades mellan åren 2014-2017",
      "last": "2026-09-27",
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
      "vad": "Juni till augusti är allt öppet på Finnhamn och Waxholmsbolaget trafikerar bryggan med flera turer varje dag. Övriga tider är det en begränsad öppethållning. ;  — ett av de mest välbesökta utflyktsmålen i Stockholms skärgård",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget linje 10",
      "vad": "10A ÅSÄTTRA — NORRA INGMARSÖ — HUSARÖ — MÖJA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Åsättra brygga → Finnhamn 30–55 min (t.ex. 08.30–09.25, 14.05–14.55). Tabell 10 går från Åsättra på Ljusterö, inte från Strömkajen som den gamla källraden påstod.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget linje 12",
      "vad": "12A STOCKHOLM — VAXHOLM — LILLSVED — NORRA INGMARSÖ — HUSARÖ — MÖJA ; linje 13,  — 13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Strömkajen → Finnhamn: 09.00–12.40, 14.55–18.50, 08.30–11.35, 08.15–12.00 m.fl., dvs. ca 3–4 h.",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
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
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/moja",
      "org": "waxholmsbolaget.se",
      "vad": "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja, Vissa turer går också direkt från Strömkajen ut till Möja utan byte, De mest trafikerade bryggorna på Möja är Möjaström och Berg, som båda ligger på öns sydligaste del",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://konsummoja.se/",
      "org": "konsummoja.se",
      "vad": "Coop Långvik är en obemannad butik. För att kunna handla krävs Coops app samt ett svenskt bank-id, använd vårt fria wi-fi, Coop_Free när du handlar, Måndag-Söndag 5.00-22.00 ;  — utlämningsställe för, (alkohol), Post och Apotek.",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v433_434.pdf",
      "org": "SL buss 434",
      "vad": "434 Slussen–Vindö, Sollenkroka brygga (Slussen 07.48 → Sollenkroka brygga 09.00, måndag–fredag); SL buss 438,  — 438 Slussen–Boda (Slussen 09.20 → Boda brygga 10.10)",
      "last": "2026-09-27",
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
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/",
      "org": "svenskagasthamnar.se",
      "vad": "Liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, Gästhamnen ligger nära Berg, ankare, Restaurang, 500 m",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/djuro-moja-namdo/moja-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Möja kyrka är från 1768 och uppfördes av byggmästare Carl Örn; Tornet är från 1885; Ingången till tornet har dörrar som är från 1924; renovering påbörjad 1924; altartavla föreställande Kristus på korset med ram från 1700-talets senare hälft; Kyrkogården anlades omkring 1755; nuvarande orgel byggd 1982 av Walter Thür",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Öppet April - December, Vandrarhemmet ligger i Berg som är huvudbyn på Möja, två- eller fyrabäddsrum med delad dusch och wc, Vandrarhemmet erbjuder även cyklar för uthyrning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf",
      "org": "varmdo.se",
      "vad": "klippbad i Långvik, Ramsmora, Löka och Berg; vid Saltvik finns \"både badklippor och sandstrand\"; \"Det finns ett fåtal badplatser... men inga anlagda badplatser\"; gästhamnar i Långvik, Ramsmora, Löka och Kyrkviken; \"Möjaborna är mångsysslare, här finns runt 60 företag\"",
      "last": "2026-09-27",
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
      "url": "https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/",
      "org": "visitmoja.se",
      "vad": "Möja värdshus, Möja bageri;  — Med sina fina landsvägar är Möja en utmärkt ö att cykla på . Bilfri och äkta skärgård saknade källa: ön har landsvägar, bilar och sommartid PerMobilen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/g%C3%A4sthamnar/",
      "org": "visitmoja.se",
      "vad": "det kan vara trångt i juli, det går inte att förboka plats ;  — under högsommaren blir det ofta fullbokat tidigt på året. Men vår, sensommar och höst är det ofta lugnt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/",
      "org": "visitmoja.se",
      "vad": "det finns ingen officiell badplats och alla platser nyttjas enl. . Barnvänlighet, djup och vägbeskrivningar saknade källa och är strukna; Coop Långvik är obemannad, så tipset att fråga där var fel.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/boende-p%C3%A5-m%C3%B6ja/",
      "org": "visitmoja.se",
      "vad": "På Möja finns ett fåtal boenden för besökare så under högsommaren blir det ofta fullbokat tidigt på året, Många privatpersoner hyr ut stugor och det finns några organiserade boenden.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/om-m%C3%B6ja/",
      "org": "visitmoja.se",
      "vad": "Nya Vi på Saltkråkan spelades in på Möja, Matbutiken Grankvists livs är Coop Långvik som byggts om., angör vid Löka på Möja",
      "last": "2026-09-27",
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
      "url": "https://kund.printhuset-sthlm.se/wa/h14.pdf",
      "org": "Waxholmsbolaget linje 14",
      "vad": "14A STOCKHOLM — VAXHOLM — SOLLENKROKA — MÖJA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Strömkajen → Berg utan byte, tio turer: 190–250 min, median 220. Sollenkroka → Berg 40–75 min, median ca 60. Avgångar från Sollenkroka: måndag–torsdag 6–7, fredag 6, lördag 3, söndag 3–4; flera markerade B/b = beställs i förväg. Sommartabellen (19 juni–16 augusti) är inte publicerad nu och är inte kontrollerad.",
      "last": "2026-09-27",
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
      "url": "https://www.fjaderholmarna.se/",
      "org": "fjaderholmarna.se",
      "vad": "Fjäderholmarna har nu säsongsöppet till och med 13 september. ;  — 19 juni — 16 augusti, Varje halvtimme 10:30–17:00 ;  — 1 Maj-13 Sep, 20 Nov-20 Dec ;  — NU SERVERA JULBORD MELLAN 20/11 - 22/12 ;  — The brewpub opens on 1 May and closes for the season on 13 September.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea",
      "org": "fjaderholmarnasbryggeri.se",
      "vad": "offering a wide variety of our beers served directly from the Brite Beer Tanks, You can also grab a bite from our pub menu, We offer Beer Flights, We only accept drop-ins",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fjaderholmarnasbryggeri.se/about",
      "org": "fjaderholmarnasbryggeri.se",
      "vad": "in 2014 we were finally ready for take-off and opened our own brewpub at Fjäderholmarna, we opened our bigger production brewery in Bro",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarnaskrog.se/",
      "org": "fjaderholmarnaskrog.se",
      "vad": "Hamnbaren, Loftet, FESTVÅNING MAGASINET, FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027, NU SERVERA JULBORD MELLAN 20/11 - 22/12",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.fjaderholmslinjen.se/valkommen/index.asp",
      "org": "fjaderholmslinjen.se",
      "vad": "under perioden 1 maj, till 13 september 2026, Resan tar ca 25 minuter., inte att reservera platser, Vi accepterar Visa/Mastercard, ej kontanter., hundar i koppel",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "lidingo.se",
      "vad": "Fjäderholmarna, som består av de fyra öarna Fjäderholmen, Ängsholmen, Libertas och Rövarns holme; öarna ligger inom Lidingö stads område och ingår i Kungliga nationalstadsparken",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/",
      "org": "lidingo.se",
      "vad": "Röda stugan (förr kallad Grå stugan) från 1700-talet. Det är den enda återstående byggnaden från Stora Fjäderholmens äldre sjöfartsepok. / Det faluröda panelade lilla timmerhuset har bland annat fyrspröjsade fönster och karaktäristiska korta taksprång. / I väster ligger Röda villan, förr kallad Gröna villan, i dag den enda återstående av de byggnader som uppförts på 1890-talet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.naturkartan.se/sv/stockholms-lan/libertas-fagelskyddsomrade",
      "org": "naturkartan.se",
      "vad": "Libertas och Rövarns holme är ett fågelskyddsområde där det är landstigningsförbud under fåglarnas häckningstid från 1 april till 15 juli, Stockholms största koloni av silltrut, På Libertas står en fyr som är förklarad som byggnadsminne",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna",
      "org": "rokeriet-fjaderholmarna.se",
      "vad": "fokus på våra egna rökta produkter, tillagade på plats, under sommarmånaderna även besöka vår deli och glasskiosk, Rökeriets uteservering bjuder på sol hela dagen och en fantastisk utsikt över Stockholms inlopp",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.rokeriet-fjaderholmarna.se/",
      "org": "rokeriet-fjaderholmarna.se",
      "vad": "1 Maj-13 Sep, 11:30-22:30, 20 Nov-20 Dec ;  — vår deli och glasskiosk",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/",
      "org": "Strömma",
      "vad": "Avgår från: Strandvägen & Nacka Strand; Strandvägen - Kajplatsområde 13; Enkel resa: 170 kr | Tur och retur: 205 kr; Endast 30 minuters båtresa från city; ÅTER MAJ 2027; När du har bokat en viss avgång har du förtur på den; hundar måste hållas kopplade … enligt Lidingö kommuns lokala ordningsföreskrifter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/",
      "org": "svenskagasthamnar.se",
      "vad": "35 (1/5-31/9), boj, 1-8 m, Dusch, ingår, Hamnvärd: Sjöstation Fjäderholmarna . Eluttag, färskvatten och toalett är inte markerade. Priserna står bara hos Svenska Gästhamnar, inte i en prislista hos hamnen, och är strukna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitstockholm.se/o/fjaderholmarnas-bad/",
      "org": "visitstockholm.se",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget linje 2",
      "vad": "2A STOCKHOLM — HÖGANÄS — VAXHOLM, gäller 2 april–18 juni och 17 augusti–12 december 2026; Fjäderholmarna angörs på vissa turer med X = trafikeras utan fast avgångstid . Waxholmsbolaget, Alla SL-biljetter gäller mellan 44 bryggor,  — Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd; SL-biljetter gäller endast på de linjer som går via Vaxholm . Tidigare källa ResRobot är ingen operatör och är struken.",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/",
      "org": "trafikverket.se",
      "vad": "Färjeledens längd är 1100 meter och överfartstiden är sju minuter, Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://klintsundetmarina.se/",
      "org": "klintsundetmarina.se",
      "vad": "Våra öppettider 2026 Juni Alla dagar 10 - 18 Juli Alla dagar 10 - 18 Augusti alla dagar 11 - 16, Vi har öppet nu i helgen Fre - Sönd (25 - 27 sept) 11 - 16, Vi försöker att ha öppet i helgerna ;  — Våra priser 2026, Halvdag K1: 370 kr",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://klintsundetmarina.se/kajak-1/",
      "org": "klintsundetmarina.se",
      "vad": "Vi har 4 st enkel (K1) och en dubbelkajak (K2) till uthyrning, Kajakerna är beläget vid Klintsundet, sundet mellan Västra och Östra Lagnö ;  — Lagnö sticker ut som en 1,2 mil lång arm från Ljusterö i ett av Stockholms skärgårds allra vackraste paddelvatten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/faq",
      "org": "linanasbryggan.se",
      "vad": "LINANÄS GÄSTHAMN Hur många båtplatser har ni? 20+ Finns det toalett? Ja. 3 st. Inklusive 1 handikapptoalett ;  — Hamnvärd VHF, kanal L1 eller 16",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/meny-4",
      "org": "linanasbryggan.se",
      "vad": "285 KR MOULES FRITES, 255 KR HAMBURGARE ;  — RESTAURANGEN August Open everyday from 11.00-21.00, BUTIK & DELI August Open everyday from 9.30-19.00 ;  — Datum 2026: 27–28 november · 4–5 december · 11–12 december, 19 december . Den tidigare citerade texten om öppet till 29 september och åter i april finns inte längre på sajten.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ljusterologi.se/",
      "org": "ljusterologi.se",
      "vad": "31 sovplatser i Stockholms Skärgård, Skärgårdsboende med historiskt arv och plats för evenemang & tillställningar sedan 1910-talet, Vi har 15 smakfullt inredda rum, Det finns en stor pool med terrass och en bastu ;  — Ljusterö Logi ligger cirka 150 meter bort (julbord 2026)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html",
      "org": "osteraker.se",
      "vad": "En bilfärja går från Östanå färjeläge året runt, Under sommarsäsongen vistas det nästan 20 000 personer på ön ;  — Våra öppettider 2026 Juni Alla dagar 10 - 18 ;  — Under badsäsongen finns en flyttbar utomhustoalett ;  — RESTAURANGEN August Open everyday from 11.00-21.00",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.osteraker.se/subsitegrundskolor/ljusteroskola.html",
      "org": "osteraker.se",
      "vad": "Ljusterö skola är en trygg skola för för elever från förskoleklass till årskurs 9",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html",
      "org": "osteraker.se",
      "vad": "Linanäsbadet, som har en barnvänlig strand och flytbryggor med en storslagen utsikt över Saxarfjärden, flyttbar utomhustoalett som är tillgänglighetsanpassad, Här tar kommunen prover på badvattnet",
      "last": "2026-09-27",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h626.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Danderyds sjukhus–Ljusterö, Linanäs brygga: Danderyds sjukhus 09.25 → Östanå färjeläge 10.25 → Ljusterö färjeläge 10.37 → Linanäs brygga 11.03; lördag 07.31 → Ljusterö färjeläge 08.37 . Färjan avgiftsfri enligt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/osteraker/ljustero-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Norra Ljusterö fick sitt första kapell under 1600 talet, möjligen redan på 1500 talet, Ett nytt kapell ersatte det äldre under 1750 talet, Mot slutet av 1800 talet fattades beslut om ombyggnad och kapellet omgestaltades helt till dagens kyrka",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h9.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, STOCKHOLM — VAXHOLM — LJUSTERÖ: söndag Strömkajen 17.20 → Linanäs 18.55 (14 september–1 november), söndag 09.00 → 11.05, lördag 09.00 → 11.15, tisdag 10.00 → 12.50",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "Åsättra brygga ;  — Ta bussen från Åkersberga station till Åsättra brygga på Ljusterö. Därifrån tar du färjan vidare till Husarö och våra andra öar.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "dalaro": [
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/oevrigt/dalaro-tullhus",
      "org": "sfv.se",
      "vad": "uppfört \"under åren 1787–88\" efter Erik Palmstedts ritningar; \"ett av en handfull tullhus som är statligt byggnadsminne\"; Haninge kommun använder det som turistbyrå och skärgårdsmuseum",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/dalaro-skans",
      "org": "sfv.se",
      "vad": "man beslöt 1656 att på Stockskäret anlägga en skans; 1683 ritade generalkvartermästaren Erik Dahlbergh ett förslag; Först 1698 påbörjades arbeten ... ända till 1724 innan skansen var försvarsduglig; 1854 upphörde den att räknas till rikets fasta försvar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.dalarobageri.se/",
      "org": "dalarobageri.se",
      "vad": "Odinsvägen 15, Veckans lunch, Cafémeny, Kvällsöppet",
      "last": "2026-09-27",
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
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/",
      "org": "haninge.se",
      "vad": "Dalarö är lots- och tullsamhället som sedan blev badortsidyll; snirkliga gator, gränder och villor med snickarglädje i schweizisk anda; Strindberg kallade det porten till paradiset",
      "last": "2026-09-27",
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
      "vad": "I Dalaröområdet finns ett 30-tal registrerade fartygslämningar från 1600- till 1900-talet, All dykning inom Dalarö skeppsvraksområde ska ske från en båt, detta sker via Dalarö Dykpark",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/",
      "org": "haninge.se",
      "vad": "Stort bad vid havet med strand. Schweizerbadet är känt för att vara väldigt långgrunt., Grillplats:, Stor parkering., Närmaste busshållplats Schweizerparken., Ja, vid Vadviken. (hundbad)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/havsbadet-schweizerbadet-dalaro.html",
      "org": "havochvatten.se",
      "vad": "Havsbadet Schweizerbadet, Dalarö är ett EU-bad, 10 Bajamajor + 1 Handikapp finns 1 juni - 15 september, Foodtruck, Dalarö Mat och Glasskiosk; klassificering 2025: utmärkt kvalitet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "839 Handens station–Dalarö (–Smådalarö), Tidtabellen är anpassad till pendeltåg från Stockholm vid Handens station, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; Handens station → Hotellbryggan 33–40 min ;  — 869 Globen–Dalarö, Ingen trafik lördag, söndag och helgdag; 46–50 min . Pendeltågets restid Stockholm C–Handen är inte belagd (ingen aktuell tryckt tabell för linje 43 hittades).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v869.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "869 Globen–Dalarö, Lördag, söndag och helgdag, Ingen trafik; Slakthuset (Globen) → Hotellbryggan 46–50 min, fyra turer vardagar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://smadalarogard.se/",
      "org": "smadalarogard.se",
      "vad": "Smådalarö Gård Hotell & Spa, Ett av Sveriges största spahotell i Stockholms skärgård, Spa, aktiviteter, närodlad mat och personlig service ;  — 839 Handens station–Dalarö (–Smådalarö), Endast vissa turer",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/",
      "org": "stockholmslansmuseum.se",
      "vad": "Dalarö blev 1636 platsen för den så kallade stora sjötullen och landets viktigaste tullstation ;  — Inloppsstation för Stockholm blev Dalarö, I samband med att systemet avskaffades 1928 drogs även tullstationen in, Byggår: 1787–88",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/",
      "org": "svenskagasthamnar.se",
      "vad": "Klubbhamn vid Dalarö kanals södra mynning, Centrum 500 m - gångstig över Askfatsberget, gästplatser 40 (15/5-15/9); färskvatten, toalett (kodlås), dusch och eluttag (50 kr/dygn) finns; diesel och bensin 1 km bort",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-hotellbryggan/",
      "org": "svenskagasthamnar.se",
      "vad": "På Dalarös östra sida nära centrum, ca 25, Fri tilläggning under dagen, Restaurang även kafé",
      "last": "2026-09-27",
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
      "url": "https://www.tullhuset.nu/",
      "org": "tullhuset.nu",
      "vad": "Tullhuset Restaurant & Bar är en skärgårdskrog som huserar i anrika Dalarö Tullhus, Från och med måndagen den 17 augusti välkomnar vi er följande tider (17 augusti är en måndag 2026) ;  — här finns också Tullhuset Restaurant & Bar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vandrarhemmetlotsen.se/",
      "org": "vandrarhemmetlotsen.se",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vrak.se/utforska/vrak-och-lamningar/1600-talet/riksapplet",
      "org": "vrak.se",
      "vad": "Fartyget byggdes på flottans varv vid Stigberget i Göteborg och var färdigt 1663; längd 48 meter, bredd 12 meter; i storm 5 juni (1676) slet sig skeppet från sina förtöjningar, grundstötte och sjönk på 16 meters djup; djup 7–16 meter",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "19A STOCKHOLM — DALARÖ — ORNÖ (ÖSTRA SIDAN) — UTÖ;  — 20A DALARÖ — ORNÖ (VÄSTRA SIDAN), Gruvbryggan (Utö), Spränga (Utö); båda GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "arholma": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html",
      "org": "lansstyrelsen.se",
      "vad": "medföra okopplad hund; för längre tid än två dygn i följd förtöja, dra upp eller förankra båt eller annan farkost vid samma plats (gäller ej brygga); för längre tid än två dygn i följd tälta på samma plats, annat än inom anlagd tältplats; elda annat än på anvisad plats; under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb; ankra båt eller framföra motordriven båt i inre delen av Idöfladen",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/arholma-nord",
      "org": "sfv.se",
      "vad": "anläggningen stod färdig 1968; bergrum \"i fyra nivåer\" med \"stridsledningscentral, kraftaggregatsrum, verkstäder, logement, kök med kantin, sjukvårdrum och operationssal\"; ca 110 man; 10,5 cm kustartilleripjäs; sista kanonskottet 1992; statligt byggnadsminne våren 2007; SFV tog över förvaltningen 2008",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://sfv.se/upptack-mer/kulturvarden/sok-innehall/kulturvarden-2-2020/en-hallbar-utpost",
      "org": "sfv.se",
      "vad": "Det var vattenbristen 2018 som gjorde att vi började diskutera den här lösningen; Här hämtas vattnet direkt från Östersjön och filtreras, avsaltas, renas och mineraliseras; Systemet täcker hela vandrarhemmets vattenbehov",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/arholma-bak/",
      "org": "sjofartsverket.se",
      "vad": "byggdes 1768 av hovjunkaren Pehr Ridderstad från Rådmansö; ett runt, 12,5 meter högt stentorn med koniskt tak; ritad av Carl Johan Cronstedt (1709–1777), som även konstruerade den svenska kakelugnen; Den är en så kallad känningsbåk och har aldrig haft fyrljus. Sjömärket syns cirka 15 nautiska mil; fungerade också som lotsutkik fram till 1875; Under kriget mot Ryssland 1809 fungerade båken som en av många optiska telegrafstationer; Under andra världskriget 1939-45 inrymde båken också en signalstation med en underliggande stridsledningscentral; statligt byggnadsminne sedan 1935",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.arholma.nu/resa-hit",
      "org": "arholma.nu",
      "vad": "Med bil från Stockholm tar det drygt två timmar; På Simpnäs finns en stor parkeringsplats",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.arholma.nu/mat-dryck/dansbanan",
      "org": "arholma.nu",
      "vad": "På Arholma har det funnits en dansbana sedan beredskapstiden i början av 1940-talet; Idag är det en charmig restaurang med stort kök, trevlig bar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmadansbana.se/index.html",
      "org": "arholmadansbana.se",
      "vad": "Tack för i år, vi ses 2027",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/",
      "org": "arholmahandel.se",
      "vad": "åretruntöppen butik; livsmedel, nybakat bröd och produkter från lokala producenter; bensin, diesel, gasol och kemtekniska varor; ombud för apotek och Systembolaget, postservice, cykeluthyrning, stuguthyrning; bryggcafé sommartid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/cykeluthyrning/",
      "org": "arholmahandel.se",
      "vad": "Halvdag; (4h) — 100kr; (8h) — 150kr; (24h) — 200kr; (7 dagar) — 1000kr; Hyr din cykel och hämta direkt på bryggan där båten lägger till; på grund av högt tryck rekommenderar vi att du bokar i god tid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/stuguthyrning/",
      "org": "arholmahandel.se",
      "vad": "Stugan ligger vid Norra bryggan där båtarna från fastlandet lägger till; upp till fyra bäddar och uthyres per dygn från maj till och med september månad samt under höstlovsveckan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/diesel-och-bensin/",
      "org": "arholmahandel.se",
      "vad": "Vi har en sjömack där du själv kan tanka bensin och diesel",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/sommarens-avslutande-veckor-och-bryggcafeets-sista-helg/",
      "org": "arholmahandel.se",
      "vad": "Därefter blir det lågsäsongstider (måndag, onsdag, fredag och lördag)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://arholmahandel.se/sommartider-2/",
      "org": "arholmahandel.se",
      "vad": "Vi öppnar även vårt Bryggcafe´ på torsdagen 18 juni",
      "last": "2026-09-27",
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
      "url": "https://arholmanord.se/mat",
      "org": "arholmanord.se",
      "vad": "Öppnar midsommarafton och stänger 9 augusti; här bjuder vi på godsaker från röken — sidan renderas med JavaScript, citatet kontrollerat i headless Chrome",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://blidosundsbolaget.se/norra-batlinjen/",
      "org": "blidosundsbolaget.se",
      "vad": "I sommar erbjuder vi dagliga avgångar mellan den 6 juli och 9 augusti; 09:30 Norrtälje, längst bort på Norrtälje hamnpromenad, vid bron Havslänken; M/S Rex",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/",
      "org": "norrtalje.se",
      "vad": "Anläggningen byggdes för Kalla kriget och stod klar 1968; På ön Arholmas norra spets och gömd i berget; Den visas av säkerhetsskäl endast genom guidade turer",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/arholma/",
      "org": "skargardsstiftelsen.se",
      "vad": "landskapet brukats i hundratals år; åkrar, strandängar, hagmarker och skogspartier; på Arholma är kor våra bästa naturvårdsarbetare, de hjälper till att hålla markerna öppna; Bull-Augusts gård är en klassisk roslagsgård som idag fungerar som vandrarhem",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h636.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje busstation 08.23 10.21 12.21; Simpnäs brygga 10.05b 11.42 13.31; Giltig 17 augusti–12 december 2026",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/arholma/",
      "org": "stockholmslansmuseum.se",
      "vad": "Arholma nämns redan på 1200-talet i en beskrivning av segelleden längs den svenska kusten; Arholma och Arholma by omtalas 1547 i Gustav Vasas räkenskaper; År 1719 anföll ryssarna Stockholms skärgård och brände alla hus på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-arholma-bull-august-gard/",
      "org": "svenskaturistforeningen.se",
      "vad": "På Bull-August gård finns 14 rum med totalt 32 bäddar; Boningshuset, som är öppet året runt, har 10 bäddar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-arholma-nord/",
      "org": "svenskaturistforeningen.se",
      "vad": "Rummen är fördelade i flera mindre byggnader; från enkelrum till familjerum med plats för upp till fem personer; bäddade sängar och frukostbuffé ingår alltid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h30.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; 30A SIMPNÄS — ARHOLMA; Simpnäs (Björkö) 07.05 08.00 10.10 13.35; Arholma 07.20 08.15 10.25 13.50",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h27.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "27A STOCKHOLM — VAXHOLM — NORRSUND — ARHOLMA; GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026; Strömkajen (Stockholm) 08.45 08.45 08.45 16.30 16.30 08.45 10.00 10.30; Arholma 20.55 14.30. Lördagstur 2651: Strömkajen 08.45 → Arholma 14.30",
      "last": "2026-09-27",
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
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html",
      "org": "lansstyrelsen.se",
      "vad": "Bybebyggelsen som äger betydande kulturhistoriska och miljömässiga värden är koncentrerad till Storhamn på öns södra del, där även lotsplatsen och fyren ligger; förbjudet med okopplad hund, att tälta och elda annat än på anvisade platser, att skada fasta naturföremål och att plocka blomman nattviol; anordningar: informationstavla, rast-/övernattningsstuga, stig, toalett, tältplats och vandringsled",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/landsortoeja-stockholms-skargard",
      "org": "sfv.se",
      "vad": "Under 1930-talet anlades ett kustartilleribatteri på Landsort för att kontrollera sjöfarten in mot Nynäshamn; Det är ett fyravåningshus av stål inuti berget, dimensionerat för ett underjordiskt samhälle; Batteriet på Landsort är ett av de 26 fasta batterier som byggdes mellan 1960 till 1983; Idag finns fyra av dessa batterier kvar varav batteriet på Landsort är ett; 150 ton tung Boforskanon; står i ett 18 meter djupt schakt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/en/about-us/fyrar-och-kulturfastigheter/visningsfyrar/landsort--the-oldest-swedish-built-lighthouse/",
      "org": "sjofartsverket.se",
      "vad": "The present lighthouse was built in 1686; metre-thick walls; The Russians turned up in 1719 and set fire to Landsort; Landsort is located on the island of Öja, some 90 km south of Stockholm; beskrivs som one of the most substantial lighthouses that we have in Sweden",
      "last": "2026-09-27",
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
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/landsort",
      "org": "waxholmsbolaget.se",
      "vad": "Landsort är Waxholmsbolagets sydligaste destination. Här hittar du vacker natur, badklippor och Sveriges allra äldsta fyr. (2026-09-14)",
      "last": null,
      "myndighet": true
    },
    {
      "url": "https://www.g-mo.se/fyren/",
      "org": "g-mo.se",
      "vad": "Fyren visas tre gånger per dag, 11.00, 13.00 och 15.00 från mitten av juli tills mitten av augusti; Övriga tider på året efter överenskommelse; Lysvidd 22 nautiska mil",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.g-mo.se/ersta-batteriet/",
      "org": "g-mo.se",
      "vad": "Mellan mitten av juli till mitten av augusti klockan 13:00 och 16:00 — platser bokas i förväg",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.g-mo.se/hotell/",
      "org": "g-mo.se",
      "vad": "vi har nu sex stycken dubbelrum i modern design",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.g-mo.se/home-2/kontakt/",
      "org": "g-mo.se",
      "vad": "Från Valborg till början av juli har vi öppet fredagar; Från mitten av augusti till sista november har vi öppet på helger; Under perioden december till slutet av april har vi stängt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://landsort-birds.se/pages/skada-pa-landsort.php",
      "org": "landsort-birds.se",
      "vad": "över 300 fågelarter noterade; sibiriska felflyttare som tajgasångare och kungsfågelsångare; \"Nuförtiden besöks ön nästan dagligen av fågelskådare\" (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://landsort-birds.se/pages/guidningar.php",
      "org": "landsort-birds.se",
      "vad": "början av april-slutet av juni, mitten av augusti-början av november; öppna guidningar varje lördag 11:00; Fågelstationen nås via promenad på ca 10 minuter norrut från byn",
      "last": "2026-09-27",
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
      "vad": "Saltboden är en kombinerad handelsbod, servering och pub som ligger på den södra delen av Landsort, mitt i den lilla byn; Vi har öppet dagligen juni-augusti; samt helger i maj och september",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.landsort.com/?page_id=138",
      "org": "landsort.com",
      "vad": "1820 övergång till rovoljelampor med försilvrade speglar; 1839 staten inlöser fyren och Mauritz Enegren blir första fyrmästare; 1844 antas Sofia Charlotta Löfström som kvinnligt biträde; 1870 påbörjas ombyggnad med konisk fyr ovanpå stenfyren; 1909 monteras Lux-brännare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://landsortsstuguthyrning.se/stugorna.html",
      "org": "landsortsstuguthyrning.se",
      "vad": "Våra sex idylliska små stugor ligger på öns norra spets i anslutning till Gästhamnen; ner till byn och fyren i söder (ca 3km)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.landsortsvandrarhem.se/",
      "org": "landsortsvandrarhem.se",
      "vad": "har 26 bäddplatser fördelade på olika hus; Vandrarhemmet är öppet året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/landsort",
      "org": "nynashamn.se",
      "vad": "20 bofasta på ön, men sommartid mångdubblas ofta befolkningen; ön har tre hamnar — Österhamn, Västerhamn och Norrhamn; Batteri Landsort är en underjordisk försvarsanläggning från kalla kriget, nu ett museum; Hela ön är naturskyddsområde; På Landsorts fågelstation dokumenteras och ringmärks över 12 000 fåglar varje år",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Nynäshamns station 06.26 09.11 11.08; Ankarudden 07.05 09.51 11.49; Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026",
      "last": "2026-09-27",
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
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-landsort/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Du åker till Landsort från Ankarudden på Torö året om;  — Vandrarhemmet är öppet året runt;  — Vi har öppet dagligen juni-augusti",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitlandsort.se/resa-till-landsort/",
      "org": "visitlandsort.se",
      "vad": "gästhamn i norr (Skravleviken eller Norrhamn); utrymmet är i praktiken begränsat till storleksordningen 2-3 segelbåtar; Västerhamn (lotsbåtshamnen) får besökare inte gå in i",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h29.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; ANKARUDDEN — LANDSORT; Ankarudden 07.10 09.55 16.40 19.40; Landsort 07.40 10.25 17.10 20.10",
      "last": "2026-09-27",
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
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/",
      "org": "Trafikverket",
      "vad": "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård, Resan med vägfärjan är avgiftsfri ;  — Blidö, Rådmansholmen är ett EU-bad ; Blidö kyrka invigd 1859 enligt RAÄ:s bebyggelseregister (se description)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård, Färjeledens längd är 600 meter och överfartstiden är fyra minuter, Resan med vägfärjan är avgiftsfri ;  — Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.blidorestaurang.se/",
      "org": "blidorestaurang.se",
      "vad": "Vi har två längor med vandrarhem och totalt ca 50 sängar, I varje vandrarhem finns även kök, toaletter och duschar, Vi har nu stängt för säsongen, sidans titel Blidö Brygga & Bistro ;  — Rummen har 2, 3 eller 4 sängar . blidobryggabistro.se löser inte längre upp (DNS), verksamheten har bytt till blidorestaurang.se.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hembygd.se/blido/about",
      "org": "Blidö sockens hembygdsförening",
      "vad": "Hembygdsgården består alltså av fyra hus: Båtsmanstorpet, fähuset, Silversmedens hus och Bagarstugan; fähuset är en så kallad 'en ko-ladugård', som var avsedd just för en ko",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/blido-radmansholmen.html",
      "org": "havochvatten.se",
      "vad": "Blidö, Rådmansholmen är ett EU-bad, Dass på badplatsen, Lekutrustning samt grillplats, klassificering 2025 utmärkt kvalitet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/",
      "org": "Köpmanholms skola",
      "vad": "Här går cirka 35 elever; skolan är en F–6-skola på adressen Lilltorpsvägen 33, 760 18 Yxlan, och beskrivs som omgiven av öarna Furusund och Blidö med närhet till både skog och hav (2026-09-14)",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.moomin.com/en/tove-jansson-6/",
      "org": "moomin.com",
      "vad": "As a child Tove spent summers with her relatives in the Stockholm archipelago. It was from the summer house in Blidö and the area surrounding it that Tove drew her inspiration for Moominvalley and the Moominhouse with its terrace and slender tower.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/radmansholmen/",
      "org": "norrtalje.se",
      "vad": "ligger vid södra kusten på Oxhalsö, Här hittar du cirka 25 meter strandlinje som består av sand, Runt om badplatsen finns lövskog, Ytterligare en badflotte närmare strandkanten, på grundare vatten, Hund tillåtet: Nej, inte mellan 15 maj och 15 september",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/blido/",
      "org": "svenskagasthamnar.se",
      "vad": "Hamn i skyddat läge vid restaurang Blidö Brygga, 50 gästplatser, Boj/ mooringlina/ långsides, Blidö Brygga & Bistro, diesel och bensin 3 dist. bort ;  — Det går INTE att boka bryggplats hos oss, Behöver du fylla dunkar kan du göra det här, El finns tyvärr inte nere på bryggan, Vi har flera duschar och toaletter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tovejansson.com/story/tove-jansson-family-studio/",
      "org": "tovejansson.com",
      "vad": "She also makes lengthy visits to her grandparents, who live on the Swedish island of Blidö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "24A STOCKHOLM — VAXHOLM — BLIDÖSUNDET, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026, Stämmarsund (Blidö) ;  — 26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA, Norrsund (Blidö)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA, Bromskär (Blidö)",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrora.se/gronomraden/",
      "org": "norrora.se",
      "vad": "Grönområdena är enligt byggnadsplanen från 1974, Syftet är också att stränderna ska vara allmänt tillgängliga, utlagda som parkmark i planen, med ett fåtal undantag, Norröras vägnät på 4 km grusvägar, totalt på ön ca 7 km stigar som är röjda",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrora.se/saltkrakan/",
      "org": "norrora.se",
      "vad": "Sommaren 1963 förverkligades Astrid Lindgrens manuskript för TV; Det var Artfilms producent Olle Nordemar och regissör Olle Hellbom som fann att Norröra och Söderöra bäst motsvarade idén om Saltkråkan; ångbåten hette egentligen 'Valkyrian' och var byggd 1909 och skulle just huggas upp; filmfolket bodde på 'Panget', klippte film i 'Stallet'; de 6 timmar och 15 minuter som de 13 avsnitten kom att ta i TV; fick 7 000 svar; Premiären var i januari 1964",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrora.se/historia/",
      "org": "norrora.se",
      "vad": "Numera finns cirka 130 hushåll på ön sommartid, men endast ett par familjer bor här året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrora.se/kapellet/",
      "org": "norrora.se",
      "vad": "tidigare ägaren Blidö missionsförsamling, Överlåtelsen fullbordades våren 2009, Det drygt 100-åriga Kapellet, efter kontakt med Stockholms läns museum under 2011 fått byggnadsvårdsmässiga råd, Under våren och sommaren 2012 restaurerades de gamla fönstren, Under 2014 målades östra sidan samt entrén om",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrora.se/regler/",
      "org": "norrora.se",
      "vad": "Hundar ska vara kopplade vilket gäller alla öar utan vägförbindelse",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h632.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje–Yxlan, Furusunds färjeläge, Köpmanholm",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026, Går under perioderna 8 maj - 18 juni och 17, Går under perioden 17 augusti - 30 augusti. Måndag–torsdag går turerna 2601 (8 maj–18 juni) och 2611 (17–30 augusti), fredag 2621 och 2623, lördag 08.45 → Norröra 12.15, söndag 10.00 → 13.10",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "två avgångar om dagen från Strömkajen 19 juni–16 augusti;  — vår och höst lördag 08.45, söndag 10.00, fredag 08.45 och (till 13 september) 16.30, måndag–torsdag bara 8 maj–18 juni och 17–30 augusti .  skriver \"det går ofta två turer om dagen\", vilket bara stämmer med sommartabellen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 30 SEPTEMBER 2026, Beställ resan i SL-appen; Furusund 07.50 → Köpmanholm 07.52 → Norröra 08.30, 10.05 → 10.45b .  — 17 AUGUSTI 2026 — 12 DECEMBER 2026, samma tider Furusund–Norröra",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ingmarso.se/",
      "org": "ingmarso.se",
      "vad": "runt 180 bofasta; Coop Ingmarsö med året runt-öppet ligger vid södra bryggan; gästhamnen är Centralt belägen på Södra Ingmarsö med gångavstånd till krog, affär och bageri",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/hittahit",
      "org": "ingmarso.se",
      "vad": "Båt hela vägen från stan tar mellan två och cirka tre timmar; Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda; Till bryggan på norra Ingmarsö går reguljära turer från Åsättra på Ljusterö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/kultur",
      "org": "ingmarso.se",
      "vad": "Ingmarsö Brottö Hembygdsmuseum presenterar en tidslinje från vikingatiden till nutid, inklusive skola, missionshus, jordgubbsodlingar och pensionat; jordbrukslandskapet präglas av \"små, flikiga betesmarkerna och vallarna\" (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/vi-p%C3%A5-%C3%B6n",
      "org": "ingmarso.se",
      "vad": "Ingmarsö har ett väl fungerande räddningsvärn med 9 frivilliga brandmän; skolverksamhet har bedrivits på ön i över hundra år, skolan är för närvarande inte i full drift medan förskolan tar omkring fem barn och äldre elever går på Svartsö och Ljusterö (2026-09-14)",
      "last": "2026-09-27",
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
      "url": "https://www.ingmarso.se/%C3%A4ta-och-sova",
      "org": "ingmarso.se",
      "vad": "Affären är ombud för Systembolaget, Apoteket och Posten. Dessutom har de bensinmacken som har kortautomat som alltid är öppen.",
      "last": "2026-09-27",
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
      "url": "https://ingmarsokrog.com/",
      "org": "ingmarsokrog.com",
      "vad": "Ingmarsö Krog ligger precis invid havet, ett stenkast från södra ångbåtsbryggan., Hos oss kan ni nyttja våra bryggor under er sittningstid. ;  — ta en drink på badflotten innan middagen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.konsummoja.se/",
      "org": "konsummoja.se",
      "vad": "Vissa tider är butiken obemannad. Då använder du Coop-appen med Scan & Pay för entrè och betalning. Butiken är öppen året runt.",
      "last": "2026-09-27",
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
      "vad": "Du kan ta dig mellan etapperna på Finnhamn och Ingmarsö med hjälp av roddbåtar som är utplacerade av Skärgårdsstiftelsen., Det är totalt 400 meter att ro åt ett håll.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-ingmarso/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "etappen anges som \"Medel 9.8 km\" och förbinder bryggorna Ingmarsö Norra och Ingmarsö Södra via stigar och grusvägar, genom öppna ängar och skog och förbi flera insjöar samt Femsundsbadet; delar av leden beskrivs som tekniska och rekommenderas inte för den med begränsad rörlighet (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "12A STOCKHOLM — VAXHOLM — LILLSVED — NORRA INGMARSÖ — HUSARÖ — MÖJA . Strömkajen–Norra Ingmarsö: söndag 08.40–11.17 = 2 tim 37 min, lördag 08.30–11.17 och vardag 17.30–20.17 = 2 tim 47 min.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Strömkajen–Södra Ingmarsö via Boda: 15.30–18.45 = 3 tim 15 min, 08.15–11.40 = 3 tim 25 min, 14.45–18.25 = 3 tim 40 min.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "10A ÅSÄTTRA — NORRA INGMARSÖ — HUSARÖ — MÖJA . Åsättra–Norra Ingmarsö 30 min (t.ex. 08.30–09.00, 16.10–16.40). Sommartidtabellen finns inte publicerad nu, så den tidigare uppgiften 2,5 h sommartid kunde inte kontrolleras.",
      "last": "2026-09-27",
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
      "last": "2026-09-27",
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
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svartso.se/att-gora",
      "org": "svartso.se",
      "vad": "Cykel kan du antingen hyra på Svartsö lanthandel (Alsviks brygga) eller Svartsö hotell och vandrarhem (Norra svartsö brygga).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartso.se/",
      "org": "svartso.se",
      "vad": "Svartsö är tillgängligt året runt med dagliga skärgårdsbåtar.;  — Välkommen ut till lugnet — öppet året runt!;  — Öppettider café, STÄNGT FÖR SÄSONGEN",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/hitta-hit/",
      "org": "svartsokrog.se",
      "vad": "Svartsö Krog finns i Alsvik på öns södra del, strax öster om Alsviks brygga.;  — Förändringarna i menyn sker ständigt, Välj mellan 4-rättersmenyerna eller från à la carte-menyn., tel. 08-54247255 . Öppettider och priser borttagna: öppettidssidan listar bara enskilda datum i september–oktober och menyn saknar datum.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/meny/",
      "org": "svartsokrog.se",
      "vad": "menyn saknar datum, så inget pris anges",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/",
      "org": "svartsokrog.se",
      "vad": "Boka bord, tel. 08-54247255",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/oppettider/",
      "org": "svartsokrog.se",
      "vad": "Pizzasöndag 11.30-15.00, Lammlördag 5-rätters meny; öppetdagarna 2026 är fredag–söndag i september och lördag–söndag i oktober",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/om-svartso",
      "org": "svartsolanthandel.se",
      "vad": "Idag bor omkring 65 personer permanent på Svartsö, och här finns bl.a. förskola, skola, lanthandel, krog , Bistro och hotell&vandrarhem.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/",
      "org": "svartsolanthandel.se",
      "vad": "Svartsö Lanthandel är en välsorterad butik med fräscha grönsaker och butiksbageri., Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket. . Öppettider och Helår borttagna (inga handskrivna öppettider).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/cykeluthyrning",
      "org": "svartsolanthandel.se",
      "vad": "Vid Ahlsviks brygga väntar Svartsö Lanthandel med cykel och karta över ön. Cykla sedan längs öns 14 km långa, vackra grusvägar genom en levande skärgårdsbygd med öppna ängar och hagar, betande kor och får",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svartsolanthandel.se/sjobodarna",
      "org": "svartsolanthandel.se",
      "vad": "Vi har fyra sjöbodar med enkel standard och sammanlagt åtta bäddar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/gasthamn",
      "org": "svartsolanthandel.se",
      "vad": "Hamnen drivs av oss i Svartsö Lanthandel, Hamnplats är gratis i, I hamnen finns ett servicehus innehållandes toalett & dusch, El:",
      "last": "2026-09-27",
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
      "vad": "Svartsö Skärgårdshotell & Vandrarhem ägs av fyra familjer på Svartsö, Vi håller öppet och välkomnar gäster året runt., Boendet har möjlighet att arrangera möten / konferens.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.varmdo.se/barnochutbildning/skolbarn/alltomgrundskolan/grundskolorivarmdokommun/varmdoskargardsskolor.4.2d09c46d1850f82301f9103.html",
      "org": "varmdo.se",
      "vad": "Svartsö skola är en liten F–9-skola med närhet till natur och vatten., Årskurs 6–9 vilande läsåret 2026/2027.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, Alsvik (Svartsö); Strömkajen–Alsvik t.ex. mån–tor 08.15–10.50, lör 08.35–10.50, sön 08.15–10.35, vardag 14.45–17.45",
      "last": "2026-09-27",
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
      "url": "https://www.husaro.se/om-husaro/",
      "org": "husaro.se",
      "vad": "Husarö, som ligger i Österåkers kommun, är ungefär 2,5 km lång., Kulturlandskap med ängar och lövträd, som skiftar under vandringen till vacker tallskog och släta klippor.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/att-se-och-gora/",
      "org": "husaro.se",
      "vad": "Sista lördagen i juli varje år firas Husarödagen med bl.a Husarömaran … skärgårdsmarknad och visning av … i Sundströmska lotsgården.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/lankar/",
      "org": "husaro.se",
      "vad": "Husarös egna lanthandel som drivs av Henkan och Kattis. Under sommarperioden serveras även lättare maträtter och du kan njuta av en öl eller ett glas vin.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://husarohandel.se/husar-handel---om-oss",
      "org": "husarohandel.se",
      "vad": "Vid Husarö ångbåtsbrygga ligger den nyrenoverade sjömacken med gästhamn.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://husarohandel.se/",
      "org": "husarohandel.se",
      "vad": "Gästhamnen är en lång pontonbrygga med Y-bommar och mooringlinor och bojar., Då vi inte är på plats har vi av säkerhetsskäl stängt av elen, Det finns nya toaletter i kommunens regi, Tyvärr finns inget färskvatten., Macken är stängd då vi väntar på tillstånd., Boka gästhamnsplats via Dockspot",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html",
      "org": "osteraker.se",
      "vad": "På ön finns också Elsa Beskows hus där hon hämtat inspiration till boken Puttes äventyr i Blåbärsskogen. ;  — Husarö bedöms vara av riksintresse för kulturmiljövården. . OBS: Skärgårdsstiftelsens Lilla Husarn är en annan ö vid Nämdö.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/husaro/",
      "org": "stockholmslansmuseum.se",
      "vad": "I den så kallade kung Valdemars jordebok från 1200-talet som är den äldsta seglingsbeskrivningen genom skärgården, finns Husarö med under namnet Husarn., Mellan 1740 och 1912 var Husarö officiell lotsplats och under segelsjöfartens storhetstid vid slutet av 1800-talet arbetade ett 20-tal lotsar på Husarö.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "12A STOCKHOLM — VAXHOLM — LILLSVED — NORRA INGMARSÖ — HUSARÖ — MÖJA, Går under perioden 14 september - 12 december. . Restider Strömkajen–Husarö i tabellen (vår/höst 2026): söndag 08.40–11.45 och vardag 17.30–20.35 = 3 tim 5 min; lördag 08.30–11.45 = 3 tim 15 min; måndag–torsdag 08.15–12.10 = 3 tim 55 min.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Via Boda: 08.15–12.10 (3 tim 55 min), 15.30–19.10 (3 tim 40 min), 14.45–18.50 (4 tim 5 min).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "10A ÅSÄTTRA — NORRA INGMARSÖ — HUSARÖ — MÖJA . Åsättra–Husarö t.ex. 14.05–14.50 och 16.10–16.55 = 45 min, 10.50–11.40 = 50 min.",
      "last": "2026-09-27",
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
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/rodloga",
      "org": "waxholmsbolaget.se",
      "vad": "Under våren, sommaren och hösten kan du åka ut till Rödlöga från Strömkajen utan byten. Resan tar fyra timmar.; Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan för att ta dig till Rödlöga.; Heldagsutflykt till Rödlöga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://cafetruten.se/pages/var-historia",
      "org": "cafetruten.se",
      "vad": "Rödlögabodens skapare, entreprenören Gösta Söderman; I delen mot Gammelstugan, som idag inrymmer Café Truten, fanns en nätbod för fiskenät och utrustning.; När skötbåten sjösattes 1954, riggade Gösta sjöboden till affär.; Ångbåtsbryggan stod klar 1957, och i samband med det byggdes affären där den ligger idag.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://cafetruten.se/",
      "org": "cafetruten.se",
      "vad": "Ett sommaröppet café där vårt fokus är hembakat och handgjort; Vi bakar vårt surdegsbröd med nymalet ekologiskt mjöl; vi öppnar på midsommardagen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf",
      "org": "norrtalje.se",
      "vad": "På 1700-talet gavs ett kungligt dekret som ålade byborna på Kudoxa och Rödlöga att hålla lots på Svenska Högarna. Den första permanenta lotsstationen byggdes 1793.; Mellan åren 1910 och 1927 skulle antalet personer på ön komma att öka från 50 till nästan 400 personer.; År 1954 infördes daglig förbindelse med båttrafik under sommarhalvåret från Furusund. Trots det upphörde man med jordbruk två år senare på ön.; I mitten av 1960-talet bodde det sju personer på ön. (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/",
      "org": "rodlogaboden.se",
      "vad": "Gästbryggan ligger inne i byviken, nedanför Café Truten.; Ej nattförtöjning (gäller ej fartyg med särskilt tillstånd), endast stävtillägg och båtvikt max 3 ton gäller för bryggan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/pages/om-oss",
      "org": "rodlogaboden.se",
      "vad": "Totalt finns under sommaren omkring 300 personer fördelade på drygt 100 hushåll på ön.; På ön finns ingen fast el, men många öbor har alternativa energikällor, exempelvis vindkraftverk och solceller.; Färskvatten till butiken produceras från havsvatten, med omvänd osmos.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/pages/historia",
      "org": "rodlogaboden.se",
      "vad": "Här finns ett litet museum inrymt och här ställer konstnärer, från framför allt skärgården, ut under vissa sommarveckor.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/pages/att-gora",
      "org": "rodlogaboden.se",
      "vad": "Om du vill ha tak över huvudet är det kanske ledigt i den lilla Kammaren i Gammelstugan mitt i byn.; två bäddar, liten gasolspis, vatten i pump och utedass; 350 kr per person/natt, du bokar via Rödlögaboden; Ta med dig ett tält och följ blå stigen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/pages/hitta-hit",
      "org": "rodlogaboden.se",
      "vad": "Båtturen från Furusund till Rödlöga tar drygt två timmar.; Om du kommer med bil finns parkering strax innan Furusunds värdshus.; Det är tidtabellerna 26 och 28 som gäller för Rödlöga.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rodlogaboden.se/pages/cafe-truten",
      "org": "rodlogaboden.se",
      "vad": "Här kan du njuta av en kopp kaffe eller the, saft och läsk, hembakade pajer och kakor, en god smörgås - eller kanske en hamburgare som du grillar själv!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; 26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA — måndag–torsdag tur 2601 Strömkajen 09.00, Rödlöga 13.00; tur 2602 Rödlöga 15.00, Strömkajen 19.00",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026 — tur 2621 Strömkajen 08.45, Rödlöga 13.00 (mån–tors); tur 2671 söndag Strömkajen 10.00, Rödlöga 14.00",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 30 SEPTEMBER 2026; 28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA — lördag tur 2851 och söndag tur 2871: Furusund 10.05, Rödlöga 12.20",
      "last": "2026-09-27",
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
      "vad": "SEDAN 2018, Vår terrass sträcker sig ut mot vattnet, rätter med säsongens bästa råvaror, meny med bl.a. Stekt strömming, Fish and Chips, Moules Frites, För barnen, skräddarsydd catering, Hyr hela restaurangen",
      "last": "2026-09-26",
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
      "url": "https://www.aroniagarden.se/",
      "org": "aroniagarden.se",
      "vad": "Eller varför inte hyra en cykel av oss under de dagar du gästar vår ö?, I vår verkstad erbjuder vi service och reparationer av cyklar, elcyklar och elektriska flakmopeder",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/",
      "org": "brannoforeningen.se",
      "vad": "Brännö Brygga är vackert belägen i Brännö Husvik med utblick mot västerhavet och Vinga fyr, Torsdag 25 juni kl 19.30 — 22.00, Torsdag 30 juli kl 19.30 — 22.00, Lördag 8 aug kl 19.30 — 22.00",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://brannoforeningen.se/kulturevenemang/kafe-husvik/",
      "org": "brannoforeningen.se",
      "vad": "Brännöföreningen har inför säsongen 2026 återigen arrenderat ut kiosk/kaféet i Husvik till Sebastian Pilups som här driver Le Shack, Kaféet ligger i direkt anslutning till färjelägret Brännö Husvik",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://brannovardshus.se/oppettider",
      "org": "brannovardshus.se",
      "vad": "14 Februari — 31 maj 2026, 1 JUNI — 23 JUNI 2026, Onsdag kl. 12-18/20, 24 JUNI — 9 AUGUSTI 2026, Öppet alla dagar 12.00-23.00, 10 AUGUSTI — 13 DECEMBER 2026, Rumsuthyrning på Pensionat Baggen och Värdshusets Gästrum är möjlig året runt . 1–23 juni är restaurangen öppen även onsdagar, så den tidigare texten (torsdag–söndag utanför högsäsongen) var inte helt rätt; klockslag struket (sidan anger att stängningstiden varierar).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/branno",
      "org": "goteborg.com",
      "vad": "Vill du uppleva den klassiska dansen på Brännö brygga tar du båten till Husvik på sydvästra sidan, De’ ä’ dans på Brännö brygga . Samma sida har en bildtext som säger dans vid Rödstens brygga — den motsägs av arrangören, Styrsöbolaget och sidans egen brödtext.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "nås enkelt året runt ;  — Rumsuthyrning på Pensionat Baggen och Värdshusets Gästrum är möjlig året runt, 14 Februari — 31 maj 2026, 10 AUGUSTI — 13 DECEMBER 2026 .",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/branno-vardshus-pensionat-baggen",
      "org": "goteborg.com",
      "vad": "mitt på den södra ön Brännö, Mat med inspiration från havet, byggt 1900",
      "last": "2026-09-26",
      "myndighet": false
    },
    {
      "url": "https://www.styrsobolaget.se/dans-pa-branno-brygga/",
      "org": "styrsobolaget.se",
      "vad": "M/S Kungsö avgår på torsdagar från Stenpiren kl 19:10, avgång från Brännö 22.30 ;  — STENPIREN — BRÄNNÖ HUSVIK , framme i Husvik 20.15 enligt samma tabell",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/03/25-056-Annons-Ockero-Tidning-252x370-3.pdf",
      "org": "transdev.se",
      "vad": "STENPIREN — BRÄNNÖ HUSVIK",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf",
      "org": "transdev.se",
      "vad": "282 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Styrsö Tången-Brännö Husvik och omvänt, Hösttidtabell 20260823 - 20261212 . Raden Brännö Husvik har måndag–fredag ankomsterna 07:34, 10:41, 15:19, 16:09, 17:12 och 18:19, lördag 10:36 och 15:25, söndag 10:08 och 15:33.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-283-Liggande-A4.pdf",
      "org": "transdev.se",
      "vad": "283 Hösttidtabell 20260824 - 20261212, Saltholmen-Asperö-Brännö Rödsten . Restiden räknad ur tabellen, måndag–fredag: Saltholmen 05:20 → Brännö Rödsten 05:38 (18 min), 09:24 → 09:47 (23 min via Asperö Östra).",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "styrso": [
    {
      "url": "http://www.batebacken.se/",
      "org": "batebacken.se",
      "vad": "Båtebackens Caferestaurang ligger på Styrsö Tången intill Snobbrännan på Nordvästra Styrsö; När solen går ner bakom Känsö Torn då vet vi att nu är det högsommar; bortom farleden ser du bl.a. öarna Brännö och Känsö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.brattenswardshus.se/historia/",
      "org": "brattenswardshus.se",
      "vad": "Styrsö Bratten är centralpunkten i Södra Skärgården. Här finns vårdcentral, folktandvård, äldreboendet Styrsö Hemmet, samt ett stycke upp på ön högstadieskola med centralbibliotek",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.brattenswardshus.se/restaurang/",
      "org": "brattenswardshus.se",
      "vad": "Vi har även glutenfri pizza; Rödspätta, pommes, remouladsås, sallad",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.brattenswardshus.se/kontakta-oss/",
      "org": "brattenswardshus.se",
      "vad": "Bratten’s Wärdhus ligger bara några meter från hållplatsen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/styrso",
      "org": "goteborg.com",
      "vad": "Det äldsta är Byn med kyrkan från 1752, gårdar och gammal odlingsmark. Tången är det traditionella fiskeläget med tät bebyggelse och slingrande smala vägar. I Halsvik satte de välbeställda skutskepparna sin prägel på bebyggelsen och Bratten fick de fina sommargästerna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/",
      "org": "goteborg.com",
      "vad": "Brattens Wärdshus — vid färjelägret Styrsö Bratten. Tidigare text om en av Göteborgs mest hyllade saknade källa och togs bort 2026-09-14.",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter; Buss 114, Ö-snabben, restid cirka 25 minuter; 281, Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; 283, Saltholmen–Asperö–Brännö Rödsten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "Kusthotellet Styrsös restaurang Astri serverar frukost, lunch och middag",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/styrso-brattenbadet/",
      "org": "goteborg.com",
      "vad": "Badet ligger cirka 300 meter från färjeläget Styrsö Bratten; Vid badplatsen finns en mindre sandstrand, brygga med badstegar, klippor och en gräsyta; vattnet kan vara strömt i farleden utanför badplatsen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/kusthotellet-styrso",
      "org": "goteborg.com",
      "vad": "med 50 rum, varav 10 sviter, restaurang, wellness-område, uppvärmd utomhuspool och gym",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/styrso-tangen-bed-breakfast/",
      "org": "goteborg.com",
      "vad": "inrymt i en vacker jugendvilla från 1904",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/tangbaren-styrso/",
      "org": "goteborg.com",
      "vad": "Tångbaren har öppet under sommarsäsongen och arbetar med drop-in",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/goteborg/ica-tangen-1003744/",
      "org": "ica.se",
      "vad": "ICA Tången; Styrsö Hamnväg 30, Styrsö; Butiken öppet: Söndag 10 till 18",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kusthotelletstyrso.se/historia/",
      "org": "kusthotelletstyrso.se",
      "vad": "År 1893 invigdes Styrsö Havsbad; I början av 1900-talet spelade Styrsö även en viktig roll i vården av tuberkulossjuka barn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kusthotelletstyrso.se/",
      "org": "kusthotelletstyrso.se",
      "vad": "Hos oss finns plats för både avkoppling och gemenskap — året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stbnb.se/",
      "org": "stbnb.se",
      "vad": "We are open for bookings for the summer season June — August 2026; four bedrooms, kitchen and a bathroom. We can accommodate up to 10 guests; a six minute walk from the ferry station Tången",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://styrsohamn.se/styrs%C3%B6-t%C3%A5ngen/",
      "org": "styrsohamn.se",
      "vad": "Tångens Gästhamn; Som båtgäst i Tången får du tillgång till toaletter samt dusch vid Båtebacken och betalning sker inne på restaurangen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tangbaren.se/batplatser/",
      "org": "tangbaren.se",
      "vad": "Hos Tångbaren hittar du 12 stycken gästplatser med akterförtöjning; nere i Styrsö Sandvik, en kort promenad ifrån oss",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tangbaren.se/",
      "org": "tangbaren.se",
      "vad": "Belägen på en brygga över havet; Flera gånger i veckan lägger fiskebåtar till vid vår brygga; Just nu tar vi inga bokningar utan endast drop in",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf",
      "org": "transdev.se",
      "vad": "23/08 2026 - 12/12 2026; 281 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Donsö-Vrångö och omvänt; 282 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Styrsö Tången-Brännö Husvik och omvänt; Styrsö Bratten - 05:34 - - 06:26 07:16 - 08:11 08:59 09:39 10:17. Vardagar enligt tabellen (avläst): Saltholmen 06:09→Bratten 06:26, 07:54→08:11, 09:25→09:39, 11:20→11:44; Saltholmen 07:24→Skäret 07:39; Saltholmen 05:47→Tången 06:12, 08:35→09:09, 09:53→10:28",
      "last": "2026-09-27",
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
  "yttre-garden": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/samhalle/sakerhet-och-beredskap/skyddsobjekt.html",
      "org": "lansstyrelsen.se",
      "vad": "Ett beslut om skyddsobjekt innebär att obehöriga inte har tillträde till skyddsobjektet; Ett skyddsobjekt är vanligtvis utmärkt med gula skyltar.; förbud mot att bada, dyka, ankra eller fiska",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/natur-och-landsbygd/om-eldningsforbud.html",
      "org": "lansstyrelsen.se",
      "vad": "Länsstyrelsen har rätt att besluta om eldningsförbud utifrån lagen om skydd mot olyckor när det råder stor risk för brand i skog och mark.; Beslut om lokala eldningsförbud hittar du på din kommuns webbplats.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf",
      "org": "naturvardsverket.se",
      "vad": "Ett parti med lövskog sträcker sig från den västra stranden, ungefär mitt på ön, nedanför en brant, i nordostlig riktning in mot mitten av ön.; I den sydvästra delen består lövskogen av gamla ekar med inslag av eklågor samt död ved av främst gran.; Av karta från 1800-talets slut framgår att denna del även då var lövträdsdominerad.; I den nordöstra delen övergår lövskogen till en ungskog dominerad av björk och asp.; en del mindre avverkningar har gjorts i anslutning till militära anläggningar som numer är rivna; Rödlistade arter noterade för området är stor klipptuss och mindre hackspett. (PDF, s. 1)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/skyddsvarda-statliga-skogar/",
      "org": "naturvardsverket.se",
      "vad": "Det pågår ett arbete att ge skyddsvärda statliga ägda skogar formellt skydd.; inventeringar som Naturvårdsverket och länsstyrelserna redovisade 2004",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/",
      "org": "naturvardsverket.se",
      "vad": "Förtöj och övernatta något dygn i din båt.; Ta med dig en påse som du kan samla skräp och matrester i för att ta med hem eller slänga i en papperskorg.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/",
      "org": "naturvardsverket.se",
      "vad": "Du får tälta något enstaka dygn i naturen; allemansrätten ger dig ingen självklar rätt att elda. Du har ansvar för att elda på ett säkert sätt, utan att riskera att elden sprider sig",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "naturvardsverket.se",
      "vad": "Koppla hunden när vilda djur har ungar, 1 mars–20 augusti.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/sv/om-oss/nyheter-och-press/nyheter/sjosakerhetstips/",
      "org": "sjofartsverket.se",
      "vad": "112 från mobilen, kanal 16 på VHF-radion. Skydda mobilen från vatten.; Se därför alltid till att ha uppdaterade sjökort, både i pappersformat och digitalt.; Meddela anhöriga dina planer och håll dem underrättade om förändringar i din planerade rutt.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.fortifikationsverket.se/om-oss/vart-uppdrag",
      "org": "fortifikationsverket.se",
      "vad": "Det gör vi genom att äga, utveckla och förvalta landets försvarsfastigheter.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kayakomat.com/sv/location/62b4ecb11cfae6aacec5e0ef",
      "org": "kayakomat.com",
      "vad": "KAYAKOMAT Nynäshamn Nickstabadet; Kajak och SUP-uthyrning via self service; Flytväst ingår; Uthyrning för korta utflykter på två timmar, upp till flera dagars äventyr.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/turbatar",
      "org": "nynashamn.se",
      "vad": "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort); Vid Fiskehamnen i Nynäshamn, nära parkeringsplatser och kollektivtrafik, finner du Waxholmsbolagets båtar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/surfa-och-paddla",
      "org": "nynashamn.se",
      "vad": "Hyr en egen kajak eller kom med på en guidad tur. Glöm inte flytvästen bara!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/batliv",
      "org": "nynashamn.se",
      "vad": "De cirka 300 båtplatserna ligger väl skyddade; Nynäshamns Gästhamn ligger centralt belägen i stadens fiskehamn; I fiskehamnen kan du även enkelt tanka din båt på Nynäshamns enda sjömack; I Nynäshamns gästhamn finns möjlighet att hyra mindre motorbåtar",
      "last": "2026-09-27",
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
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/digerhuvud.html",
      "org": "lansstyrelsen.se",
      "vad": "Den gotländska berggrunden är till stor del uppbyggd av korallrev som bildades i ett tropiskt hav för cirka 430 miljoner år sedan, kunde de stå kvar som isolerade stenpelare — raukar, förstöra eller skada fast naturföremål eller ytbildning genom att exempelvis knacka fossil ur raukar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html",
      "org": "lansstyrelsen.se",
      "vad": "De ståtliga raukarna på stranden vid Klajvika är utan tvekan de mest fotograferade raukarna på Gotland. Raukarna finns även avbildade på baksidan av den svenska 200 kronorssedeln., Det 480 hektar stora naturreservatet, På strandsluttningen ovanför Klajvika står ett drygt 50-tal raukar, av vilka några är mer än 8 meter höga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/gamla-hamn.html",
      "org": "lansstyrelsen.se",
      "vad": "är namn på den så karaktäristiska rauken som står i reservatet, Naturreservatet Gamla hamn omfattar dels en mot nordväst utskjutande klippudde vid den södra änden av Lautervik, ligger ett 15-tal gravar som sannolikt är från vikingatid, Den brukar kallas S:t Olofs kyrka, Gamla hamn ligger drygt 4 km nordväst om Fårö k:a.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/",
      "org": "trafikverket.se",
      "vad": "Fårösundsleden går mellan Fårösund på norra Gotland och Broa på Fårö. Färjeledens längd är 1300 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri., Utöver dessa kategorier gäller rätt till förtur mellan 1 juni och 15 augusti för fast bosatta på Fårö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://bergmancenter.se/besok-oss/utstallningar/",
      "org": "bergmancenter.se",
      "vad": "2009 blev Bergmans fastigheter på ön ett konstnärsresidens, Bergmangårdarna, och är inte tillgängligt för allmänheten., Men i Bergmancenters VR-vandring kan du ändå besöka Bergmans hus!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationgotland.se/resa/",
      "org": "destinationgotland.se",
      "vad": "På omkring tre timmar är du framme i Visby;  — Ordinarie tidtabell 2026/2027. Giltig 2026-08-16–2027-06-12, Visby busstation–Fårösund färjeläge 60 min (t.ex. 08.35–09.35);  — överfartstiden är sex minuter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/faro/",
      "org": "gotland.com",
      "vad": "På Fårö är landskapet ännu lite kargare och sanden ännu finkornigare., Digerhuvud är ett flera kilometer långt naturreservat och Gotlands största raukområde.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/article/bergman-and-faro/",
      "org": "gotland.com",
      "vad": "Ingmar Bergman first came to Fårö on a stormy April day in 1960., as a possible location for Through a Glass Darkly, He had his house built not far from where Persona was filmed. He came to live and work there for almost 40 years., Ingmar Bergman died at the age of 89 at his home on Fårö and is buried in Fårö Church Cemetery., The meeting with the barren island on Gotland’s northern point was overwhelming. ;  — Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/besoka-uppleva/upptack-norra-gotland/",
      "org": "gotland.com",
      "vad": "Färjan till Fårö går varje hel och halv timme från Fårösund året runt, Det går endast bussar på Fårö under sommartid, från mitten av juni till mitten av augusti.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/sudersand/",
      "org": "gotland.com",
      "vad": "En av Gotlands absolut vackraste och längsta sandstränder är Sudersand som ligger på Fårö. Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten. Restaurang, café, kiosk osv finns i närheten.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/bergmancenter/",
      "org": "gotland.com",
      "vad": "Bergmancenter är ett kulturcentrum med utställningar, skaparverkstad, kafé och biograf., Varje sommar, veckan efter midsommar, arrangerar Bergmancenter Bergmanveckan;  — 2009 blev Bergmans fastigheter på ön ett konstnärsresidens, Bergmangårdarna, och är inte tillgängligt för allmänheten., Men i Bergmancenters VR-vandring kan du ändå besöka Bergmans hus!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/sudersand-resort/",
      "org": "gotland.com",
      "vad": "caféer, restauranger, pool, äventyrsgolf, padelbanor, lekplats, hembageri och lanthandel på gångavstånd, Bo i stuga, hus, villa, hotellrum eller på camping",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/farogarden-bb-och-vandrarhem/",
      "org": "gotland.com",
      "vad": "I vackra Fårö östra skola från 1850 huserar Fårögårdens mysiga B&B.;  — boende på vandrarhemmet, Vi har lunchöppet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/stallplats-lauterhorn/",
      "org": "gotland.com",
      "vad": "Naturskön ställplats vid Lauters gästhamn på Fårö. Elplatser, toalett, latrintömning., Öppet året runt. Tillgång till dusch endast sommarsäsong maj-september.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/farofarjan-tidtabell/",
      "org": "gotland.com",
      "vad": "Turer utöver ordinarie avgångar (även nattetid) kan beställas per telefon.;  — Färjan till Fårö går varje hel och halv timme från Fårösund året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/gotland-convention-bureau/resa-till-och-fran-on/",
      "org": "gotland.com",
      "vad": "Till Gotland flyger du dagligen från Arlanda med SAS, med en restid på cirka 40–45 minuter., Brommaflyg trafikerar även Visby från Bromma (ca 35 minuter)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/faro-strandcafe/",
      "org": "gotland.com",
      "vad": "frukost, lunch, afterbeach och middag … Pizza, pasta, sallad, smårätter samt … kött & fiskrätter, säsong 2026; farostrandcafe.se — Vid Sudersand resort",
      "last": null,
      "myndighet": false
    },
    {
      "url": "https://gotland.com/activities/daglig-guidning/",
      "org": "gotland.com",
      "vad": "Kafé Smultronstället på Fårö är Bergmancenters kafé och restaurang där du kan ta en fika, hemlagad lunch eller njuta av en glass i solen. Allt med utsikt över vackra Kyrkviken.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar",
      "org": "gotland.se",
      "vad": "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand, Skyltning mot badplatsen saknas, men badplatsen nås till fots från Fårö fyr.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://verktygsladan.gotland.com/companies/broa-kiosken-faro/",
      "org": "verktygsladan.gotland.com",
      "vad": "Vid Broa Kiosken hittar du Fårö cykeluthyrning.;   — Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand.;  — Badplatsen Norsta Aurar",
      "last": "2026-09-27",
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
      "url": "https://carlsten.se/oppettider-och-priser/",
      "org": "carlsten.se",
      "vad": "3 april — 31 maj 2026, Öppet helger:, 1 juni — 30 juni 2026, Öppet alla dagar:, Ordinarie guidade turer nedan ges på svenska och ingår i, En guidad tur tar ca 45 minuter, Alla hundar är välkomna och har fri entré på fästningen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/carlstens-vaffelcafe/",
      "org": "carlsten.se",
      "vad": "Du hittar oss vid fästningens entré och du behöver inte köpa entré till fästningen för att komma till oss, Våfflor, Sallader, Pajer, Smörgåsar, Tack för säsongen 2026, Vi öppnar igen till påsken 2027",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026",
      "org": "gkss.se",
      "vad": "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand ;  — Inga enkelbiljetter som är köpta hos Västtrafik gäller på marstrandsfärjan ;  — Ordinarie guidade turer nedan ges på svenska och ingår i",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grandmarstrand.se/restaurang-tenan/",
      "org": "grandmarstrand.se",
      "vad": "bekräftar Restaurang Tenan med \"vällagad à la carte, fisk och skaldjur samt klassiska rätter\"",
      "last": "2026-09-27",
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
      "url": "https://www.johanskrogmarstrand.se/",
      "org": "johanskrogmarstrand.se",
      "vad": "Fransk bistro möter Västkusten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/",
      "org": "kungalv.se",
      "vad": "Färjan mellan Koön och Marstrand kallas för Marstrandsfärjan, Endast fordon i nyttotrafik får färjas över till Marstrandsön, Inga enkelbiljetter som är köpta hos Västtrafik gäller på marstrandsfärjan, Alla biljetter gäller tur och retur till och från Marstrandsön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://marstrands.se/en/about-us",
      "org": "marstrands.se",
      "vad": "a warm spa, 144 rooms, Otto's Vardagsrum & Kök",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandsgasthamn.se/sv/",
      "org": "marstrandsgasthamn.se",
      "vad": "Marstrands gästhamn och dess bryggor är beläget på den sydöstra delen av ön med 275 gästplatser varav 98 bokningsbara",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandsgasthamn.se/sv/Gasthamn",
      "org": "marstrandsgasthamn.se",
      "vad": "El och vatten ingår i serviceavgiften och finns på alla bryggor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandsgasthamn.se/sv/Kontakt",
      "org": "marstrandsgasthamn.se",
      "vad": "Högsäsong (15 juni - 30 juni och 1 augusti - 15 augusti), Högsäsong (1 juli - 31 juli), 1 maj - 14 juni och 16 augusti - 30 september, Fredag - Söndag . Tidigare stod att hamnkontoret är bemannat dagligen maj–september (vastsverige.com); gästhamnens egen sida anger dagligen bara 15 juni–15 augusti.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandskurhotell.se/",
      "org": "marstrandskurhotell.se",
      "vad": "Välkommen till Marstrands Kurhotell",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandswardshus.se/",
      "org": "marstrandswardshus.se",
      "vad": "skaldjur-, och grillrestaurang mitt på kajen på Marstrand, Vi har cirka 120 sittplatser på uteserveringen och 30 inomhus",
      "last": "2026-09-27",
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
      "vad": "walk around the whole of Marstrandsön, or take a shorter walk through Smugglarrännan, Take a break out by Skallens lighthouse and admire the enchanting area where the Skagerrak and Kattegatt meet, On Koön there are well-marked footpaths, with three levels of difficulty",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/marstrand/",
      "org": "vastsverige.com",
      "vad": "Sommarens seglingshöjdpunkt är när Match Cup Sweden avgörs första veckan i juli, Längs bryggorna i Sveriges största gästhamn ligger båtarna tätt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/produkter/marstrands-gasthamn/",
      "org": "vastsverige.com",
      "vad": "Bryggorna G, H, D och E är för gästande båtar, Kajen är förtöjningsplats för gästande båtar över 15 m skrovlängd, Minsta djup är 3,5 m",
      "last": "2026-09-27",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6302__0__LINE__20251214__20261212__25ea94b6-c06e-4190-822d-a22d774d80ee__1%2C0__2635889.pdf",
      "org": "vtstorage002.blob.core.windows.net",
      "vad": "302 Kungälv–Ytterby–Marstrand, Marstrands färjeläge, Gäller 14 dec 2025 - 12 dec 2026, C Går endast 19 juni - 16 aug. . Restider räknade ur tabellen (Ytterby station → Marstrands färjeläge 29 min, Kungälv resecentrum → 42 min); måndag–fredag dagtid avgång från Kungälv varje timme (08.55, 09.55, 10.55 …), lördag–söndag 19 juni–16 augusti extra turer så att bussen går varje halvtimme. Linjen går inte från Göteborg, vilket den tidigare texten påstod.",
      "last": "2026-09-27",
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
      "url": "http://www.fiskemuseet.se/",
      "org": "fiskemuseet.se",
      "vad": "Fiskemuseet drivs av Föreningen Kusttraditioner",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/hono",
      "org": "goteborg.com",
      "vad": "fina badvikar och ett stort utbud av aktiviteter som klättring och kajakpaddling ;  — Längst ut på Kråkudden finns ett vindskydd för fågelskådning ;  — renodlad fisk- och skaldjursrestaurang",
      "last": "2026-09-27",
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
      "url": "https://www.havskatten.com/",
      "org": "havskatten.com",
      "vad": "Vi har 12 rum, alla med bara få meter från bryggkanten, Rum med 2 + 2 enkelsängar gemensam wc/dusch, Här har ni bubbelpool, bastu & relaxutrymme för er själva, Rödvägen 73, 475 41 Hönö, Bjud vännerna på kalas i vår festlokal eller ha företagets konferens här",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://honoklavahamn.se/",
      "org": "honoklavahamn.se",
      "vad": "Hönö Klåva Hamn är en stor båt- och fiskehamn på Hönö i Göteborgs norra skärgård ;  — Från färjeläget Lilla Varholmen går avgiftsfria vägfärjor till Hönö och Björkö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://honoklavahamn.se/om-oss/",
      "org": "honoklavahamn.se",
      "vad": "Hönö Klåva Fiskehamn ägs av Hönö Klåva Fiskehamn ekonomisk förening",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://honoklavahamn.se/gasthamn/",
      "org": "honoklavahamn.se",
      "vad": "I Hönö Klåva hamn finns miljöstation, septisug, vatten, diesel (sjömack) och mastkran, Här finns duschar, toaletter, tvättmaskin och torktumlare, Mellan 1 april och 31 oktober är vårt servicehus vid hamnkontoret öppet, I vår gästhamn tillämpas ingen förbokning av platser, I lågsäsong 1 december — 1 april finns inte vatten att tillgå vid kajerna, Kod till vårt wi-fi för gäster finns på din biljett, Varje båt ansvarar för att ha rätt kablar och uttag med sig . Drivmedel var tidigare bara belagt via en gästhamnsguide som inte är tillåten; nu belagt av hamnens egen sida.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.honosjobodar.se/",
      "org": "honosjobodar.se",
      "vad": "Här bor du i en av våra 6 sjöbodar, som har allt du behöver i form av fullutrustat kök, badrum, i denna sjöbod är det tillåtet att ha med hund, Öppet året om",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardshotellethono.se/",
      "org": "skargardshotellethono.se",
      "vad": "Vi har 16 härliga rum på andra våningen där hälften av dem har en uteplats mot havet och hamninloppet, fest för upp till 80 personer i sittning ;  — Skärgårdshotellet Hönö is open all year round for hotel guests, diners, conferences and meetings",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardshotellethono.se/en/home/",
      "org": "Skärgårdshotellet Hönö",
      "vad": "Skafferiet Restaurant, Skärgårdshotellet Hönö is open all year round for hotel guests, diners, conferences and meetings ;  — Varmt välkomna på frukost, lunch, middag, lokala och i säsong",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tullhuset.se/",
      "org": "Tullhuset",
      "vad": "Á la carte, Skärgårdslunch, Smakmeny, Skaldjursbuffé, Tullhuset håller öppet dagligen!, Vi ses på Hönö Klåva!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/",
      "org": "Visit Öckerö",
      "vad": "Hela året går färjorna från Lilla Varholmens färjeläge ;  — Högsäsong, 1 april- 30 september, Mellan 1 april och 31 oktober är vårt servicehus vid hamnkontoret öppet ;  — open all year round",
      "last": "2026-09-27",
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
    }
  ],
  "gullholmen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html",
      "org": "lansstyrelsen.se",
      "vad": "Husen står tätt tillsammans, vilket beror på att Gullholmen fram till 1999 var en så kallad kronoholme., På öns norra del ligger Stenstugan, som är ett av de äldsta husen på ön. Det är idag museum.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/",
      "org": "Bohusläns museum",
      "vad": "bekräftar äldsta säkra belägg 1588, ca 100 hus och ca 400 invånare år 1800 samt drygt 800 invånare 1910",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gullholmenshamnkrog.se/",
      "org": "gullholmenshamnkrog.se",
      "vad": "Torget 105, Gullholmen, Kom och njut av en unik matupplevelse vid vattnet!, Vare sig om du kommer för en lunch i solen eller en middag med vänner, Hör av er till oss för att boka bord eller take away., Öppettider Sep - Dec 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/?page_id=6253",
      "org": "gullholmsbaden.se",
      "vad": "Gullholmsbaden är en unik destination belägen vid strandkanten på vackra Gullholmen, Anläggningen erbjuder 69 fullt utrustade stugor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/?page_id=360",
      "org": "gullholmsbaden.se",
      "vad": "I receptionen kan man hyra klubbor för att spela minigolf på vår bana., Bastun bokas i vår reception ;  — Här finns utmärkta konferensmöjligheter året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/?page_id=19",
      "org": "gullholmsbaden.se",
      "vad": "Sommarterrass med havsutsikt, Njut av mat lagad från grunden, missa inte vår legendariska Räksmörgås, Hantverkarlunch kl. 12.00 — 14.00",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn",
      "org": "orust.se",
      "vad": "Gullholmens hamn är öppen 1 april till 30 september., 50 platser. Djup cirka 1,5-3,5 meter., Servicebyggnad med toalett, dusch, tvättmaskin, torktumlare., Sugtömningsstation där fritidsbåtar kan tömma sin latrintank, mellan 1 april och 31 oktober., Förhandsbokning av gästplats sker via Dockspot. Hamnen är kontantfri.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/",
      "org": "vastsverige.com",
      "vad": "line 381, operate every day all year round, You can bring a bicycle . OBS: samma sida anger tio minuter, men Västtrafiks tidtabell och  (5 minuter till Härmanö/Gullholmen) säger fem.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf",
      "org": "vtstorage002.blob.core.windows.net",
      "vad": "Tuvesvik–Gullholmen–Käringön, Gäller 15 sept - 31 okt 2026 . Tuvesvik–Gullholmen tar 5 min i varje tur (t.ex. 08.30–08.35 hamnen, 12.30–12.35 piren); båten lägger till vid Gullholmen hamnen eller Gullholmen piren beroende på tur.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5",
      "org": "Västsverige",
      "vad": "Gullholmen är ett av Bohusläns äldsta fiskelägen, Mycket av öns gamla karaktär finns bevarad än idag med sjöbodar, bryggor och en välbesökt gästhamn. ;  — Väl intrampade prång och gränder mellan husen leder ner mot vattnet.",
      "last": "2026-09-27",
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
      "vad": "Gullholmen — Käringön — parkering vid Tuvesvik betalas med kort eller SMS, kontanter tas inte emot",
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
export const OAR_MED_KALLOR = 91

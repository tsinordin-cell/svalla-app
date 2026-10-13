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
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen",
      "vad": "näbbgädda: \"Våren och sommaren\", \"I Stockholms yttre skärgård från Sandhamn och söderut\", \"Grönskär, Horsten, Långviksskär, Ålö, Torö\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gronskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1965, Storlek: 1,6 hektar varav land 1,1 hektar, en liten, flack och vegetationsfattig ö i det yttersta kustbandet öster om Sandhamn, den kända Grönskärs fyr som är av stort kulturhistoriskt värde",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "Naturvårdsverket",
      "vad": "Mellan 1 mars och 20 augusti måste du ha extra uppsikt över din hund i naturen. Under den tiden får hunden inte springa lös., Ha alltid koppel på hunden när ni vistas i nationalparker eller naturreservat ;  — Här får man ha hund (stugan Friggan)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html",
      "org": "varmdo.se",
      "vad": "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida, omkring 20 minuters promenad från hamnen, Toaletter sommartid, Badet ägs och sköts av Eknö hemman, Ingen provtagning av badvatten utförs av Värmdö kommun. Stod ca 10 min, barnvänligt djup, vind och namnets ursprung utan källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "varmdo.se",
      "vad": "Den cirka 8 km stigen går runt hela Sandön. Stigen utgår från Sandhamn, passerar sandstranden Trouville och vidare genom den vackra och ljusa tallskogen som är typisk för ön.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/sandhamn",
      "org": "varmdo.se",
      "vad": "Värmdö Hamnar äger fastigheten vid inloppet till Sandhamn, Tullhuset som idag innehåller hyreslägenheter, På fastigheten finns Sjöfartsverkets lotsverksamhet samt Kustbevakningen etablerade",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/flaskberget.4.18c983316e0536cb189a2c1.html",
      "org": "varmdo.se",
      "vad": "Ett fint klippbad alldeles vid Sandhamns by, Badet fick sitt namn efter en skuta lastad med fläsk gick på grund och sjönk där för länge sedan, Toaletter sommartid, Badet ägs och sköts av Eknö hemman, Ingen provtagning av badvatten utförs av Värmdö kommun",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "varmdo.se",
      "vad": "Ska du parkera max 3 timmar så är det gratis om du använder p-skiva, Du betalar din besöksparkering med app, Parkit Sweden AB ansvarar, I Stavsnäs vinterhamn finns cirka 1300 parkeringsplatser. Cirka hälften är till för besökare",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/sandhamn",
      "org": "Waxholmsbolaget",
      "vad": "och då tar resan drygt en timme, Det går flera turer varje dag till Sandhamn, tabell 16 ;  — Year round — including winter, Take bus 433 from Slussen or drive to Stavsnäs Vinterhamn ;  — Stavsnäs vinterhamn, Slussen 10.15 → Stavsnäs vinterhamn 11.06",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "STAVSNÄS — SANDHAMN — HAGEDE (året runt, tabellen gäller till 12 december 2026) ;  — GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026 (linje 15 Strömkajen–Sandhamn) ;  — Departures run several times daily . Sandhamnslinjen Stavsnäs–Sandhamn drivs av Stavsnäs Båttaxi, inte Waxholmsbolaget.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s15.pdf",
      "org": "Waxholmsbolaget linje 15",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; Strömkajen 10.00 → Sandhamn 13.45, 08.30 → 13.25 . Seglarhotellets uppgift om 2–3 timmar för linje 15 stämmer inte med tidtabellen och används inte.",
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
      "last": "2026-09-30",
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
      "org": "Skärgårdsstiftelsen",
      "vad": "Den 26 meter höga fyren har kallats Östersjöns Drottning på grund av sin skönhet. Fyren uppfördes 1770 av granit och sandsten efter ritningar av Carl Fredrik Adelcrantz.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Sjöfartsverket skänker Grönskärs fyr efter renovering (1984); Stiftelsen Stockholms skärgård bildades den 20 mars 1959",
      "last": "2026-09-30",
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
    }
  ],
  "uto": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/hembygdsmuseer/",
      "org": "haninge.se",
      "vad": "Utö gruvmuseum, Museet ligger alldeles intill gruvschakten och berättar historien om Utös gruvor.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen",
      "vad": "Andra bra ställen är, Baggensfjärden, Ingarö, Ornö, Utö och Torö, Fritt handredskapsfiske gäller på enskilt vatten i Mälaren och skärgården",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "inom hela reservatet med undantag av Persholmen medföra hund som ej är kopplad. För Persholmen skall hund vara kopplad under tiden 1 mars - 20 augusti och under övrig tid hållas under uppsikt, tälta eller ställa upp husvagn annat än på anvisad plats, för längre tid än två dygn förtöja eller förankra båt vid samma strand, göra upp eld annat än på härför iordningställda och anvisade platser, Tillträdesförbud på Utö skjutfält vissa tider.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "skyddat sedan 2008, 2 829 hektar varav land 1 063 hektar, Haninge kommun, Skärgårdsstiftelsen markägare och förvaltare, Natura 2000-områdena SE0110017 Ålö och SE0110118 Rånö Ängsholm; naturtyper \"skärgård, marina miljöer, barrskog, odlingslandskap\", främst hällmarkstallskogar med kalkpåverkad berggrund; \"Storsand på Ålö anses vara en av Stockholms skärgårds finaste sandstränder.\"; Ålö har broförbindelse med Utö",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "Naturvårdsverket",
      "vad": "Koppla hunden när vilda djur har ungar, 1 mars–20 augusti.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v846.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Västerhaninge station–Årsta (–Årsta slott), Tidtabellen är anpassad till pendeltåg från Stockholm vid, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; Västerhaninge station–Årsta brygga 14–17 min enligt tabellen",
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
      "url": "https://utoskola.haninge.se/",
      "org": "utoskola.haninge.se",
      "vad": "Elever 22, Årskurs 1–9, Personal 7",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h21.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 21A ÅRSTA — UTÖ, minst 1 timme innan avgång; Årsta brygga–Gruvbryggan 40 min på de flesta turer (t.ex. 11.00–11.40), 55–75 min när båten går via Spränga först, kortast 35 min (20.35–21.10)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/uto/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens; Sommartid sjuder ön av liv med restauranger, caféer, butiker och aktiviteter; Skärgårdsstiftelsen flera stugor och hus som hyrs ut veckovis; lansstyrelsen.se Utö: Waxholmsbåt året om till Gruvbryggan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Utö kvarn är byggd 1791 och har under lång tid varit både symbol och sjömärke för Utö. / 2001 blev de nio gruvarbetarbostäderna tillsammans med kvarnen byggnadsminne enligt Kulturmiljölagen. / kvarnen restaurerades 1982",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "Skärgårdsstiftelsen",
      "vad": "1973: \"Hela norra Utö med gruvbyn köps från Ställbergsbolaget\"",
      "last": "2026-09-30",
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
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Utö, Challenging 18.4 km; Utö — Ålö Connector, Easy 4.6 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/om-uto-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "kyrkan \"uppfördes mellan år 1848 och 1850\", byggd av \"sten som bröts direkt ur gruvorna\"; Utö Gruvbolag betalade 5 000 riksdaler banco och ställde tomten, församlingen bidrog med 11 000 riksdaler banco och dagsverken; \"Utö kyrka är skärgårdens största stenkyrka.\"",
      "last": "2026-09-30",
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
      "last": "2026-09-30",
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
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/kontakt/hitta-hit/",
      "org": "utovardshus.se",
      "vad": "Waxholmsbåtar trafikerar linjen Utö — Årsta Brygga dagligen / Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö",
      "last": "2026-09-30",
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
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/restaurang/seglarbaren/",
      "org": "utovardshus.se",
      "vad": "BAREN MITT I HAMNEN, veranda mot hamninloppet, enklare rätter till lunch … kolgrillade rätter till kvällen",
      "last": "2026-09-30",
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
    }
  ],
  "vaxholm": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Bogesunds slott, med anor från mitten av 1600-talet, ligger som ett slags centrum på Bogesundslandet. Själva slottet ingår inte i reservatet, men utgör istället ett statligt byggnadsminne. Vid slottsparken finns ett vandrarhem; markerade vandringsleder och ridstigar, badplatser, rastplatser med eldstäder och vindskydd; I anslutning till området finns två campingplatser och en golfbana; föreskrifterna förbjuder att medföra okopplad hund, att tälta mer än två dygn i följd annat än på anvisad plats, att cykla utanför anvisade stigar och att rida annat än på vägar och på anvisade ridstigar",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell",
      "org": "sfv.se",
      "vad": "arkitekter \"Erik Dahlberg, C M Stuart, C F Meijer\"; \"Efter första världskriget flyttades försvarslinjen längre ut i skärgården och Vaxholm förlorade då återigen sin militära betydelse\"; \"1964 invigdes kastellets museum\"; i dag finns \"restaurang, konsertlokaler och en uppskattad äventyrsverksamhet\"",
      "last": "2026-09-30",
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
      "url": "https://kund.printhuset-sthlm.se/sl/v670_670x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "670 Stockholm–Vaxholm, Giltig 14 december 2025–18 juni 2026 ;  — SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor, med Strömkajen och Vaxholm i listan ;  (renderad med webbläsare, laddar inte med curl) — Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd. Det här gäller året runt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/",
      "org": "Trafikverket",
      "vad": "gratis vägfärja, ca 6 min över 970 m",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia",
      "org": "vaxholm.se",
      "vad": "Vaxholm fick sina första stadsprivilegier år 1647, av drottning Kristina; Viss bebyggelse har funnits på Vaxön sedan 1200-talets slut; omkring 1770 ca 800 invånare; början av 1900-talet ca 2 000 invånare; Vaxholm fick sina första reguljära ångbåtsförbindelser c:a 1850",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm",
      "org": "vaxholm.se",
      "vad": "cirka 12 000 fastboende (2024); \"Kommunen omfattar cirka 70 öar, varav 57 bebodda samt den stora gröna halvön Bogesundslandet\"",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "vaxholm.se",
      "vad": "Beläget på södra Rindö i slutet på Grönviksvägen finns detta lilla lokala bad, Sandstrand, Badbrygga, Grillplats, Baja-maja under badsäsong",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/allanyheter/nyhetsarkiv/vadgallernarskahundarvarakopplade.5.117b327517db288a7c818059.html",
      "org": "vaxholm.se",
      "vad": "Vaxholms föreskrifter anger att hundar ska hållas kopplade på offentliga platser i hela kommunen och att hundar inte får vistas på begravningsplatser eller lekplats som är offentlig plats, det är förbjudet att medföra okopplad hund i reservatet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter",
      "org": "Vaxholms stad",
      "vad": "",
      "last": "2026-08-06",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA, bryggorna Nacka strand, Hasseludden, Gåshaga brygga . Restiden Strömkajen → Vaxholm ank. är 55–82 min på de 34 turerna i tabellen (siffrorna ligger i ett kodat typsnitt i PDF:en och är avkodade och räknade kolumn för kolumn).",
      "last": "2026-09-27",
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
      "url": "https://www.destinationvaxholm.se/en/mathantverkstan",
      "org": "destinationvaxholm.se",
      "vad": "artisan cheeses, bread, jams, kombucha, coffee, ice cream, Söderhamnsplan 1, Shop with handcrafted products, Café with local treats",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://www.hamnkrogenvaxholm.com/",
      "org": "hamnkrogenvaxholm.com",
      "vad": "Hamnkrogen har varit vaxholmarnas kvarterskrog sedan 1950-talet. Här är du alltid välkommen för att äta lunch, middag eller ta något att dricka medan du ser ut över båtlivet i gästhamnen., Söderhamnen 10",
      "last": "2026-10-01",
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
      "last": "2026-09-30",
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
      "last": "2026-09-30",
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
      "last": "2026-10-01",
      "myndighet": false
    }
  ],
  "grinda": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "för längre tid än två dygn i följd förankra båt vid samma strand; förankra båt längs de strandsträckor som markerats med heldragen linje på karta; framföra motordrivet motorfordon annat än på anvisade vägar; landa med luftfarkost på annat än anvisad plats; på ett för andra störande sätt använda musikanläggning eller musikinstrument.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/grinda",
      "org": "Waxholmsbolaget",
      "vad": "Resan från Strömkajen tar ungefär en och en halv timme.; Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om.; tabell 11",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "Waxholmsbolaget",
      "vad": "Om du till exempel ska resa från Strömkajen till Grinda kan du resa på SL-biljett mellan Strömkajen och Vaxholm och sedan resa på en Waxhomsbolaget-biljett för sträckan mellan Vaxholm och Grinda.; Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april; Om din SL-biljett gäller i 30 dagar eller mer kan du resa på den i hela Waxholmsbolagets trafik när det är lågsäsong.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; 11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA — måndag–torsdag t.ex. tur 1402 Strömkajen 07.45, Södra Grinda 09.15 (1 h 30 min); tur 1203 10.40–12.50; tur 1313 13.00–14.45 (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; 11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA — från 14 september måndag–torsdag tur 1341 08.15–10.10 Södra Grinda, tur 1201 10.00–12.40 Norra Grinda, tur 1303 14.45–17.00 Södra Grinda (tidtabellens siffror är satta i ett eget typsnitt som pdftotext inte avkodar; tiderna är avlästa med teckenmappning, se grinda.md)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s14.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "14A STOCKHOLM — VAXHOLM — SOLLENKROKA — MÖJA; Södra Grinda",
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
      "org": "Skärgårdsstiftelsen",
      "vad": "Följ stigarna mellan norra och södra bryggan; bland annat natur- och kulturstigen och; som leder genom skogar, öppna marker och historiska miljöer; bjuder på en varierad vandring genom skogar, öppna ängar och havsnära klipplandskap",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/jordbruken-och-angarna/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Grinda lantbruk",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Den vackra jugendvillan i sten är ritad av Ernst Stenhammar och stod klar 1908.; Efter 1944 fungerade huset under en tid som behandlingshem och barnkoloni.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/aktuellt/vara-hus-grinda/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Resan börjar genom Lindalssundet; Kring förra sekelskiftet uppfördes här några av skärgårdens mest påkostade sommarnöjen; Mitt i denna idyll lät Henrik Santesson, Nobelstiftelsens första vd, 1906 uppföra den stora sommarvillan som i dag är Grinda Wärdshus.; med pensionatsverksamhet, badgäster, ridläger, barnkollo och dagens värdshus",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Stiftelsen Stockholms skärgård bildas den 20 mars 1959.; Samma år skänker Stockholm stad alla sina skärgårdsmarker till Skärgårdsstiftelsen och vårt markinnehav fördubblas från ca 7 000 ha till ca 14 000 ha mark.; idag är vi Stockholms läns tredje största markägare (årtalet 1998 står som rubrik närmast ovanför)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Grinda, Moderate 9.8 km.",
      "last": "2026-09-30",
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
    }
  ],
  "finnhamn": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "föreskrifterna kräver kopplad hund, tillåter eldning endast på anvisade platser, förbjuder tältning längre än två dygn i följd och hänvisar tältning på Idholmen, Stora och Lilla Jolpan till anvisade platser, förbjuder att förtöja båt \"längre tid än två dygn i följd\" på samma plats, att landa luftfarkost utanför anvisad plats och att använda musikanläggning störande",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1974, 103 hektar varav land 100 hektar, Österåkers kommun, Skärgårdsstiftelsen markägare och förvaltare, naturtyper skärgård, ängs- och betesmark, barrskog; omfattar merparten av Kålgårdsön som är östligaste delen av Ingmarsö, Bockholmen söder därom samt ytterligare ett par öar; syftet är att säkra ett område av stort värde för allmänhetens rörliga friluftsliv",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://sl.se/aktuellt/nyheter/sl-biljetter-i-en-del-av-waxholmsbolagets-trafik",
      "org": "sl.se",
      "vad": "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/angso-nationalpark/fakta-om-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Ängsö nationalpark inrättades 1909 (24 maj 1909), ligger i Norrtälje kommun, syfte \"Bevara ett äldre odlingslandskap i väsentligen oförändrat skick\", naturtyp \"Skärgård, ängs- och hagmarker, blandskog\"",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/sa-galler-sl-biljetten-pa-baten",
      "org": "Waxholmsbolaget",
      "vad": "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april, SL:s periodbiljetter som gäller för 30 dagar eller längre",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "Waxholmsbolaget",
      "vad": "",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget linje 10",
      "vad": "10A ÅSÄTTRA — NORRA INGMARSÖ — HUSARÖ — MÖJA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Åsättra brygga → Finnhamn 30–55 min (t.ex. 08.30–09.25, 14.05–14.55). Tabell 10 går från Åsättra på Ljusterö, inte från Strömkajen som den gamla källraden påstod.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget linje 12",
      "vad": "12A STOCKHOLM — VAXHOLM — LILLSVED — NORRA INGMARSÖ — HUSARÖ — MÖJA ; linje 13,  — 13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Strömkajen → Finnhamn: 09.00–12.40, 14.55–18.50, 08.30–11.35, 08.15–12.00 m.fl., dvs. ca 3–4 h.",
      "last": "2026-09-27",
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
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/finnhamn/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Finnhamn är ett av de mest välbesökta utflyktsmålen i Stockholms skärgård, Finnhamn nås med reguljär båttrafik från Stockholm, året runt, café och kiosk, vandrarhem, stugor och tältplatser på anvisade områden, badplatser med både sandstrand och klippor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Arkitekt var Ernst Stenhammar som ritat många ståtliga hus i skärgården, till exempel den stora jugendvillan på Grinda, Idag är Utsikten vandrarhem. ;  — Vandrarhemmet renoverades mellan åren 2014-2017",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Finnhamn, Moderate 10.1 km; Rowboats Finnhamn — Ingmarsö, Easy 0.4 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Juni till augusti är allt öppet på Finnhamn och Waxholmsbolaget trafikerar bryggan med flera turer varje dag. Övriga tider är det en begränsad öppethållning. ;  — ett av de mest välbesökta utflyktsmålen i Stockholms skärgård",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "moja": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storo-bocko-lokao.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "skyddat sedan 1972; \"6 045 hektar varav land 1 892 hektar\"; Värmdö kommun; förvaltare Skärgårdsstiftelsen; syfte att \"säkra ett för allmänhetens friluftsliv värdefullt skärgårdsområde samt att skydda och bibehålla områdets värdefulla växt- och djurvärld\"; björk dominerar yttersta öarna, hällmarkstallskog i övrigt; arter svärta, vigg, ejder, roskarl, labb, tobisgrissla",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/moja-bjorndalen.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "skyddat sedan 1992, utvidgat 1998; 143 hektar; Värmdö; förvaltare Skärgårdsstiftelsen; syfte \"bevara och vårda ett för faunan värdefullt skogsområde samt att låta delar av skogsmarken utvecklas mot naturskog\"; hällmarkstallskog, barr- och blandskog, myrmarker; anordningar rast-/övernattningsstuga och torrdass; tältning och eldning förbjuden",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/granholmen.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1978, utvidgat 2018; Storlek: 39 hektar varav land 18 hektar; Värmdö; Skärgårdsstiftelsen; arter blodnäva, småborre, darrgräs, jungfrulin, vildlin och tvåblad; naturhamnen Munkhamnen; tältning högst två dygn per plats",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v433_434.pdf",
      "org": "SL buss 434",
      "vad": "434 Slussen–Vindö, Sollenkroka brygga (Slussen 07.48 → Sollenkroka brygga 09.00, måndag–fredag); SL buss 438,  — 438 Slussen–Boda (Slussen 09.20 → Boda brygga 10.10)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf",
      "org": "varmdo.se",
      "vad": "klippbad i Långvik, Ramsmora, Löka och Berg; vid Saltvik finns \"både badklippor och sandstrand\"; \"Det finns ett fåtal badplatser... men inga anlagda badplatser\"; gästhamnar i Långvik, Ramsmora, Löka och Kyrkviken; \"Möjaborna är mångsysslare, här finns runt 60 företag\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Möja.pdf",
      "org": "varmdo.se",
      "vad": "Det var troligen under vikingatiden som Möja fick bofast befolkning; Möja nämns som Myghi i Kung Valdemars seglingsbeskrivning från 1200-talet; ön är cirka 6 km lång och 4 km bred; Här finns tre insjöar; landhöjningen 30 - 40 centimeter per hundra år",
      "last": "2026-10-10",
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
      "org": "Waxholmsbolaget",
      "vad": "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja, Vissa turer går också direkt från Strömkajen ut till Möja utan byte, De mest trafikerade bryggorna på Möja är Möjaström och Berg, som båda ligger på öns sydligaste del",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h14.pdf",
      "org": "Waxholmsbolaget linje 14",
      "vad": "14A STOCKHOLM — VAXHOLM — SOLLENKROKA — MÖJA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Strömkajen → Berg utan byte, tio turer: 190–250 min, median 220. Sollenkroka → Berg 40–75 min, median ca 60. Avgångar från Sollenkroka: måndag–torsdag 6–7, fredag 6, lördag 3, söndag 3–4; flera markerade B/b = beställs i förväg. Sommartabellen (19 juni–16 augusti) är inte publicerad nu och är inte kontrollerad.",
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
      "url": "https://mojavardshusochbageri.se/v%C3%A4rdshuset.php",
      "org": "mojavardshusochbageri.se",
      "vad": "en genuin och hemtrevlig skärgårdsrestaurang med fullskaligt bageri, Bergs by 600, Möja",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://mojavardshusochbageri.se/",
      "org": "mojavardshusochbageri.se",
      "vad": "Möja bageris historia tar sin början 1951",
      "last": "2026-09-30",
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
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Möja, Easy 13.8 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/",
      "org": "stockholmslansmuseum.se",
      "vad": "Längs Möjas och Södermöjas östra kust har det funnits skyddade hamnvikar som lockat till sig bebyggelse ända sedan medeltiden; Vid 1800-talets mitt fanns där 74 gårdar; Det goda fisket var basen för försörjningen; jordgubbsodlingen blomstrade från sekelskiftet 1900 och en bit in på 1970-talet; Möja fick fast ångbåtsförbindelse 1906",
      "last": "2026-09-30",
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
      "last": "2026-09-30",
      "myndighet": false
    }
  ],
  "fjaderholmarna": [
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "lidingo.se",
      "vad": "Fjäderholmarna, som består av de fyra öarna Fjäderholmen, Ängsholmen, Libertas och Rövarns holme; öarna ligger inom Lidingö stads område och ingår i Kungliga nationalstadsparken",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/",
      "org": "lidingo.se",
      "vad": "Röda stugan (förr kallad Grå stugan) från 1700-talet. Det är den enda återstående byggnaden från Stora Fjäderholmens äldre sjöfartsepok. / Det faluröda panelade lilla timmerhuset har bland annat fyrspröjsade fönster och karaktäristiska korta taksprång. / I väster ligger Röda villan, förr kallad Gröna villan, i dag den enda återstående av de byggnader som uppförts på 1890-talet.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/kungliga-nationalstadsparken.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "parken inrättades 1995, omfattar 27 kvadratkilometer, sträcker sig \"från Sörentorp och Ulriksdal i norr till Djurgården och Fjäderholmarna i söder\" och \"spänner över tre kommuner: Solna, Stockholm och Lidingö\"; \"Länsstyrelsen samordnar arbetet med parkens förvaltning och utveckling. Kungliga Djurgårdens förvaltning sköter runt 80 procent av marken.\"",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget linje 2",
      "vad": "2A STOCKHOLM — HÖGANÄS — VAXHOLM, gäller 2 april–18 juni och 17 augusti–12 december 2026; Fjäderholmarna angörs på vissa turer med X = trafikeras utan fast avgångstid . Waxholmsbolaget, Alla SL-biljetter gäller mellan 44 bryggor,  — Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd; SL-biljetter gäller endast på de linjer som går via Vaxholm . Tidigare källa ResRobot är ingen operatör och är struken.",
      "last": "2026-09-27",
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
    }
  ],
  "ljustero": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Brännholmen är udden vid nordöstra spetsen av reservatet och här kan du bada, tälta och fiska. Klipporna mot havet är mjukt slipade av inlandsisen och randiga av bergarterna svart diabas och ljusröd fältspat. / På Brännholmen finns ett gammalt självföryngrande idegransbestånd.",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html",
      "org": "osteraker.se",
      "vad": "En bilfärja går från Östanå färjeläge året runt, Under sommarsäsongen vistas det nästan 20 000 personer på ön ;  — Våra öppettider 2026 Juni Alla dagar 10 - 18 ;  — Under badsäsongen finns en flyttbar utomhustoalett ;  — RESTAURANGEN August Open everyday from 11.00-21.00",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.osteraker.se/subsitegrundskolor/ljusteroskola.html",
      "org": "osteraker.se",
      "vad": "Ljusterö skola är en trygg skola för för elever från förskoleklass till årskurs 9",
      "last": "2026-09-27",
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
      "url": "https://www.osteraker.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.367d658917909e8fc2b985.html",
      "org": "osteraker.se",
      "vad": "Linanäsbadet, som har en barnvänlig strand och flytbryggor med en storslagen utsikt över Saxarfjärden, flyttbar utomhustoalett som är tillgänglighetsanpassad, Här tar kommunen prover på badvattnet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h626.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Danderyds sjukhus–Ljusterö, Linanäs brygga: Danderyds sjukhus 09.25 → Östanå färjeläge 10.25 → Ljusterö färjeläge 10.37 → Linanäs brygga 11.03; lördag 07.31 → Ljusterö färjeläge 08.37 . Färjan avgiftsfri enligt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/",
      "org": "Trafikverket",
      "vad": "Färjeledens längd är 1100 meter och överfartstiden är sju minuter, Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h9.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, STOCKHOLM — VAXHOLM — LJUSTERÖ: söndag Strömkajen 17.20 → Linanäs 18.55 (14 september–1 november), söndag 09.00 → 11.05, lördag 09.00 → 11.15, tisdag 10.00 → 12.50",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "Åsättra brygga ;  — Ta bussen från Åkersberga station till Åsättra brygga på Ljusterö. Därifrån tar du färjan vidare till Husarö och våra andra öar.",
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
      "url": "https://skargardsstiftelsen.se/omraden/ostra-lagno/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Östra Lagnö är ett lättillgängligt naturreservat på Ljusterös östra sida där släta havsklippor, strandängar och skogsstigar möter utsikten över Svartlögafjärden. / Hit tar du dig med bil eller SL-buss via färjan till Ljusterö. Från Lagnö by är det en kort promenad till reservatet.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/osteraker/ljustero-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Norra Ljusterö fick sitt första kapell under 1600 talet, möjligen redan på 1500 talet, Ett nytt kapell ersatte det äldre under 1750 talet, Mot slutet av 1800 talet fattades beslut om ombyggnad och kapellet omgestaltades helt till dagens kyrka",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "dalaro": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/",
      "org": "haninge.se",
      "vad": "Dalarö är lots- och tullsamhället som sedan blev badortsidyll; snirkliga gator, gränder och villor med snickarglädje i schweizisk anda; Strindberg kallade det porten till paradiset",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/",
      "org": "haninge.se",
      "vad": "omkring 30 registrerade fartygslämningar från 1600- till 1900-talet, varav tre gjorts tillgängliga för dykning; all dykning måste ske från båt; tillstånd krävs från Dalarö Dykpark före varje dyk; dykguide håller en kulturhistorisk genomgång före dyket; förbjudet att dyka över skrovet; minst en meters säkerhetsavstånd till fartygslämningen",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/",
      "org": "haninge.se",
      "vad": "Stort bad vid havet med strand. Schweizerbadet är känt för att vara väldigt långgrunt., Grillplats:, Stor parkering., Närmaste busshållplats Schweizerparken., Ja, vid Vadviken. (hundbad)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/havsbadet-schweizerbadet-dalaro.html",
      "org": "havochvatten.se",
      "vad": "Havsbadet Schweizerbadet, Dalarö är ett EU-bad, 10 Bajamajor + 1 Handikapp finns 1 juni - 15 september, Foodtruck, Dalarö Mat och Glasskiosk; klassificering 2025: utmärkt kvalitet",
      "last": "2026-09-27",
      "myndighet": true
    },
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
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "839 Handens station–Dalarö (–Smådalarö), Tidtabellen är anpassad till pendeltåg från Stockholm vid Handens station, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; Handens station → Hotellbryggan 33–40 min ;  — 869 Globen–Dalarö, Ingen trafik lördag, söndag och helgdag; 46–50 min . Pendeltågets restid Stockholm C–Handen är inte belagd (ingen aktuell tryckt tabell för linje 43 hittades).",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v869.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "869 Globen–Dalarö, Lördag, söndag och helgdag, Ingen trafik; Slakthuset (Globen) → Hotellbryggan 46–50 min, fyra turer vardagar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "19A STOCKHOLM — DALARÖ — ORNÖ (ÖSTRA SIDAN) — UTÖ;  — 20A DALARÖ — ORNÖ (VÄSTRA SIDAN), Gruvbryggan (Utö), Spränga (Utö); båda GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026",
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
      "last": "2026-10-10",
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
      "last": "2026-09-30",
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
      "last": "2026-10-01",
      "myndighet": false
    }
  ],
  "arholma": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "medföra okopplad hund; för längre tid än två dygn i följd förtöja, dra upp eller förankra båt eller annan farkost vid samma plats (gäller ej brygga); för längre tid än två dygn i följd tälta på samma plats, annat än inom anlagd tältplats; elda annat än på anvisad plats; under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb; ankra båt eller framföra motordriven båt i inre delen av Idöfladen",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/",
      "org": "norrtalje.se",
      "vad": "Anläggningen byggdes för Kalla kriget och stod klar 1968; På ön Arholmas norra spets och gömd i berget; Den visas av säkerhetsskäl endast genom guidade turer",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h636.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje busstation 08.23 10.21 12.21; Simpnäs brygga 10.05b 11.42 13.31; Giltig 17 augusti–12 december 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h30.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; 30A SIMPNÄS — ARHOLMA; Simpnäs (Björkö) 07.05 08.00 10.10 13.35; Arholma 07.20 08.15 10.25 13.50",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h27.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "27A STOCKHOLM — VAXHOLM — NORRSUND — ARHOLMA; GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026; Strömkajen (Stockholm) 08.45 08.45 08.45 16.30 16.30 08.45 10.00 10.30; Arholma 20.55 14.30. Lördagstur 2651: Strömkajen 08.45 → Arholma 14.30",
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
      "last": "2026-10-01",
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
      "url": "https://skargardsstiftelsen.se/omraden/arholma/",
      "org": "Skärgårdsstiftelsen",
      "vad": "landskapet brukats i hundratals år; åkrar, strandängar, hagmarker och skogspartier; på Arholma är kor våra bästa naturvårdsarbetare, de hjälper till att hålla markerna öppna; Bull-Augusts gård är en klassisk roslagsgård som idag fungerar som vandrarhem",
      "last": "2026-09-27",
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
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Arholma, Moderate 13.4 km.",
      "last": "2026-09-30",
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
    }
  ],
  "orno": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/",
      "org": "haninge.se",
      "vad": "Bästa sättet att upptäcka ön är på cykel. Kyrkviken är Ornös nav med museum, bibliotek, gästbryggor och cykeluthyrning. / Brunnsviken med café, cykeluthyrning och stugor",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/orno/",
      "org": "haninge.se",
      "vad": "sevärdheter: \"orkidéerna vid Mane äng\", \"gravfält från bronsåldern vid Hässelmara\", \"ruinerna efter öns första säteriet\", \"bergarter på Ornöhuvud\"",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/F%C3%B6rorenade%20omr%C3%A5den%20-%20inventering%20av%20gruvbranschen%20i%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen",
      "vad": "De största gruvorna var Härsbacka i Österåkers kommun och Lugnet på Ornö i Haninge kommun. / Ornö, Lugnets fältspatsbrott ... Ett av länets största fältspatsbrott.",
      "last": "2026-10-10",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norra-skogen.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "I området har det under lång tid inte bedrivits något storskaligt skogsbruk. / Det är kala och glest tallbevuxna hällmarker och däremellan liggande marker med barrblandskog och i huvudsak odikade våtmarker. / tallmossar med skvattram / Från Nybysjöberget på cirka 45 meters höjd över havet på Nybysjöns östra sida kan man se ut över sjön.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sundby.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Med start vid Sundby gård finns en drygt sex kilometer lång, lättvandrad rundslinga. På grusvägar och stigar går du igenom naturreservatets uråldriga odlingslandskap. Slingan är till stora delar tillgänglig för barnvagn eller rullstol, men tyvärr inte hela vägen runt. Här har marken brukats sedan 1400-talet.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/stora-och-lilla-sandbote.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1938 Storlek: 21 hektar ... Markägare: Skärgårdsstiftelsen / En av de gamla stugorna är ett fiskartorp från 1700-talet som byggts upp efter en brand 2001 efter originalritningar och med gamla metoder och ställts i ordning som museum. Invid hamnen visas även ett båtbyggarmuseum. / Öarna donerades till Naturskyddsföreningen 1941 av Anna Lindhagen ... Anna hade fått området naturminnesförklarat redan 1938.",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h20.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; Avgången körs av Ornö Bilfärja, särskild; Dalarö 06.30 08.30 12.30 15.30 16.30 18.30 / Hässelmara (Ornö) 06.55 08.55 12.55 15.55 16.55 18.55; åter Hässelmara (Ornö) 07.00 08.00 12.00 16.00 17.00 20.15 / Dalarö 07.25 08.25 12.25 16.25 17.25 20.40",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget",
      "vad": "19A STOCKHOLM — DALARÖ — ORNÖ (ÖSTRA SIDAN) — UTÖ; bryggorna Ornöboda (Ornö), Söderviken (Ornö) och Ornö Kyrka",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://orno.se/ata-bo/resturang-cafe/",
      "org": "orno.se",
      "vad": "",
      "last": "2026-09-24",
      "myndighet": false
    },
    {
      "url": "https://www.ornobatvarv.se/gasthamn/",
      "org": "ornobatvarv.se",
      "vad": "Vi erbjuder en trevlig, annorlunda, liten och mycket familjär gästhamn med ca 20 platser. / Hamnen som ligger längst in i Brunnsviken / I hela hamnen är det inte tillåtet att använda eget ankare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ornobatvarv.se/stuguthyrning/",
      "org": "ornobatvarv.se",
      "vad": "Vi har sju stugor för uthyrning, två till fyra bäddar, total 18 bäddar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ornobatvarv.se/",
      "org": "ornobatvarv.se",
      "vad": "Förtöjning långsides och boj, 3 m djup. Bryggor med el. / WC dusch tvättmaskin",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ornobatvarv.se/cafe-och-microlivs/",
      "org": "ornobatvarv.se",
      "vad": "Vi har en microlivs med självbetjäning som är öppen dygnet runt. / Vi  rekommenderar våra gäster att handla mat på fastlandet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ornosjotrafik.se/",
      "org": "ornosjotrafik.se",
      "vad": "Avgår från Hässelmara brygga på Ornö och Hotellbryggan på Dalarö. / Alla fordon ska bokas i båda riktningarna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ornoskargardshotell.se/",
      "org": "ornoskargardshotell.se",
      "vad": "Vi har öppet varje dag året runt / öppnar Restaurang Sågverket för säsongen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ornoskargardshotell.se/boende",
      "org": "ornoskargardshotell.se",
      "vad": "ljusa och ombonade dubbelrum samt flera välplanerade lägenheter / I alla rums/lägenhetspriser ingår frukostbuffé varje dag året om. / precis vid vattenbrynet / Vi har öppet varje dag året runt . Adress Brunnsviken, 130 55 Ornö.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-orno/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Det är en ö med ungefär 300 bofasta året om. / Ornö har vackra skogar, klipphällar, orkidéer, tolv injöar och två naturreservat. / Under 1500-talet fanns ett 30-tal gårdar och torp, under 1800-talet hade dessa mer än fördubblats. 1719 brändes mer eller mindre hela Ornö ner under Rysshärjningarna. / Under tidigt 1900-tal styckade och sålde Sundby Säteri mark för fritidsboende.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Ornö, Moderate 34.1 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://sundbyorno.se/sv/bb-i-flygeln/",
      "org": "sundbyorno.se",
      "vad": "Det finns fem dubbelrum och de har delat eller eget badrum.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/orno-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Det första kapellet på ön uppfördes troligen redan vid 1300-talets slut. År 1652 byggdes en större kyrka i för dåtiden modern stil. / Ornö kyrka är en vacker träkyrka med spännande historia.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "landsort": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oja-landsort.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Bybebyggelsen som äger betydande kulturhistoriska och miljömässiga värden är koncentrerad till Storhamn på öns södra del, där även lotsplatsen och fyren ligger; förbjudet med okopplad hund, att tälta och elda annat än på anvisade platser, att skada fasta naturföremål och att plocka blomman nattviol; anordningar: informationstavla, rast-/övernattningsstuga, stig, toalett, tältplats och vandringsled",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/landsort",
      "org": "nynashamn.se",
      "vad": "20 bofasta på ön, men sommartid mångdubblas ofta befolkningen; ön har tre hamnar — Österhamn, Västerhamn och Norrhamn; Batteri Landsort är en underjordisk försvarsanläggning från kalla kriget, nu ett museum; Hela ön är naturskyddsområde; På Landsorts fågelstation dokumenteras och ringmärks över 12 000 fåglar varje år",
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
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Nynäshamns station 06.26 09.11 11.08; Ankarudden 07.05 09.51 11.49; Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/landsort",
      "org": "Waxholmsbolaget",
      "vad": "Landsort är Waxholmsbolagets sydligaste destination. Här hittar du vacker natur, badklippor och Sveriges allra äldsta fyr. (2026-09-14)",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h29.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; ANKARUDDEN — LANDSORT; Ankarudden 07.10 09.55 16.40 19.40; Landsort 07.40 10.25 17.10 20.10",
      "last": "2026-09-27",
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
      "vad": "föreningen \"bedriver ringmärkning, sträckräkning och andra fågelrelaterade undersökningar\", menyn för besökare listar \"Guidningar\"",
      "last": "2026-09-30",
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
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-landsort/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Du åker till Landsort från Ankarudden på Torö året om;  — Vandrarhemmet är öppet året runt;  — Vi har öppet dagligen juni-augusti",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Landsort, Moderate 10.7 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://visitlandsort.se/resa-till-landsort/",
      "org": "visitlandsort.se",
      "vad": "gästhamn i norr (Skravleviken eller Norrhamn); utrymmet är i praktiken begränsat till storleksordningen 2-3 segelbåtar; Västerhamn (lotsbåtshamnen) får besökare inte gå in i",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "furusund": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/furusundsfjarden.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "reservatet omfattar öarna Stor-Asken, Lill-Asken och Stumpen \"belägna tre kilometer nordost om Furusund\"; skyddat sedan 1974; \"373 hektar varav land 24 hektar\"; förvaltare Länsstyrelsen; syftet är att \"bevara ett oexploaterat område av innerskärgården av värde för friluftslivet\"; Natura 2000-område (2026-09-14)",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/bygga-bo-miljo/norrtalje-vaxer/samhallsplanering/oversiktsplanering/oversiktsplan2050/allmanna-intressen/kulturmiljo/kulturmiljoer-i-norrtalje-kommun/kulturmiljoer-av-lokalt-intresse/",
      "org": "norrtalje.se",
      "vad": "Furusund representerar en tidstypisk sommarnöjesort. Många byggnader är bevarade från storhetstiden från 1880 fram till första världskriget.",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h632.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje busstation; Furusunds hotellplan; Furusunds färjeläge; Giltig 17 augusti–12 december 2026. Fyra turer mån–fre (09.14, 14.36, 16.43, 18.44), tre lördag och tre söndag",
      "last": "2026-09-27",
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
      "org": "Trafikverket",
      "vad": "vägfärja mellan Furusund och Yxlan, 600 meter (2026-09-14)",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA; GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 30 SEPTEMBER 2026; GÄLLER 1 OKTOBER 2026 — 12 DECEMBER 2026",
      "last": "2026-09-27",
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
      "vad": "Dagbesök i Furusunds gästhamn är kostnadsfritt; i mån av plats",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://furusundshamnkrog.se/gasthamn/hamnguide/",
      "org": "furusundshamnkrog.se",
      "vad": "Y-bommar: 2,5 — 3,5 meter; Långsida: 3,0 — 4,0 meter; Bojplatser: 2,0 — 3,0 meter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://furusundshamnkrog.se/gasthamn",
      "org": "furusundshamnkrog.se",
      "vad": "Service i hamnen; Landström finns tillgängligt vid samtliga bryggor med 16A-uttag. 32A finns vid långsideplatserna; Latrintömning och spillolja finns",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://furusundshamnkrog.se/",
      "org": "furusundshamnkrog.se",
      "vad": "Hamnkrogen är Furusunds vardagsrum — en plats för luncher, middagar och sommarkvällar vid vattnet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/historia/",
      "org": "Hotell Furusund",
      "vad": "August Strindberg kom till Furusund sommaren 1899, hitlockad av sin syster och svåger; På Furusund kom Strindberg även att vistas med tid med Harriet Bosse i villan Isola Bella; Strindbergs verk från 1902 kallade Furusund Fagervik och grannön Köpmanholm Skamsund (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/hotellet/",
      "org": "hotellfurusund.se",
      "vad": "I närheten av vårt hotell finns två större betalparkeringar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/aktiviteter-och-att-gora-pa-furusund/",
      "org": "hotellfurusund.se",
      "vad": "Upptäck Furusunds historia längs en ca 3 km lång promenad med QR-koder och frågor vid varje stopp. Start vid Ångbåtsbryggan. För den som vill fortsätta finns skogsstigar runt hela ön, totalt ca 7 km. Följ de röda markeringarna på träden.",
      "last": "2026-09-27",
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
      "url": "https://hotellfurusund.se/kontakt/",
      "org": "hotellfurusund.se",
      "vad": "sista bussen går vid 22-tiden på fredagar från Furusunds hotellplan som ligger 400 meter från hotellet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://roslagen.se/oar/furusund/",
      "org": "roslagen.se",
      "vad": "",
      "last": "2026-09-28",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Furusund, Moderate 7.2 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/furusund/",
      "org": "stockholmslansmuseum.se",
      "vad": "Furusund blev på 1800-talet en populär badort som lockade dåtidens kändisar; Den förmögne juveleraren Christian Hammer köpte Furusund 1883. Här skapade han en modern badort. Han lät bygga sommarvillor som fick romantiska namn och ett varmbadhus; Kanske förknippas Furusund mest med August Strindberg. Han hyrde en villa här under sitt äktenskap med Harriet Bosse. Strindberg hämtade många motiv från Furusund. I 'Fagervik och Skamsund' stod Fagervik för Furusund och Skamsund för grannorten Köpmanholm på Yxlan; Telegrafstationen från 1837 är den enda bevarade i Sverige",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "blido": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/blido-radmansholmen.html",
      "org": "havochvatten.se",
      "vad": "Blidö, Rådmansholmen är ett EU-bad, Dass på badplatsen, Lekutrustning samt grillplats, klassificering 2025 utmärkt kvalitet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/linkudden.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "föreskrifterna förbjuder att \"medföra hund eller katt som inte är kopplad\", \"tälta, ställa upp husvagn eller lägga upp båt\", \"för längre tid än två dygn i följd förankra båt vid samma strand\", \"göra upp öppen eld\" och \"framföra motordrivet fordon\"",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/salskaren.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "reservatet ligger mellan Blidö och Svartlöga i Norrtälje kommun; \"Skyddat sedan: 1973\"; \"Storlek: 76 hektar varav land 5\"; förvaltare Skärgårdsstiftelsen; syftet är att \"trygga en ögrupp för allmänhetens friluftsliv samt skydda en värdefull häckningsbiotop för sjöfågel\"; \"Vegetationen på öarna skall i princip lämnas för fri utveckling\" (2026-09-14)",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/bygga-bo-miljo/klimat-och-natur/naturreservat-och-annan-skyddad-natur/linkudden/",
      "org": "norrtalje.se",
      "vad": "Reservatets östra och västra delar består av två stora hällmarksområden. Mellan dessa två bergsryggar växer blandskog med hög lövandel; Fågellivet är även det rikt med bland annat häckande sjöfågel.; rosettjungfrulin, darrgräs, vildlin, Adam och Eva, solvända, ormrot, älväxing, svartkämpar, liten blåklocka, bockrot och småborre; I söder och öster finns badvänliga klippstränder.",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/radmansholmen/",
      "org": "norrtalje.se",
      "vad": "ligger vid södra kusten på Oxhalsö, Här hittar du cirka 25 meter strandlinje som består av sand, Runt om badplatsen finns lövskog, Ytterligare en badflotte närmare strandkanten, på grundare vatten, Hund tillåtet: Nej, inte mellan 15 maj och 15 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/barn-och-skola/grundskola/grundskolor/kopmanholms-skola/",
      "org": "norrtalje.se",
      "vad": "Köpmanholms skola ligger på ön Yxlan, omgiven av öarna Furusund och Blidö, Här går cirka 35 elever, Lilltorpsvägen 33, 760 18 Yxlan",
      "last": "2026-10-01",
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
      "last": "2026-09-30",
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
      "url": "https://kund.printhuset-sthlm.se/wa/h24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "24A STOCKHOLM — VAXHOLM — BLIDÖSUNDET, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026, Stämmarsund (Blidö) ;  — 26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA, Norrsund (Blidö)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA, Bromskär (Blidö)",
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
      "org": "hembygd.se",
      "vad": "Socknen bildades före 1650 och omfattar, förutom huvudöarna Blidö och Yxlan; Furusund, Granö, Själbottna, Svartlöga, Söderöra, Norröra, Gräskö, Kudoxa, Kallskär, Stora Ängskär, Rödlöga, Gillöga, Svenska Högarna, Ut-Fredel, In-Fredel, Söderskärgården, Röder samt Svenska Björns naturvårdsområde; 1862 övergick socknen till att kallas Blidö kommun.; 1971 uppgick den i Norrtälje kommun.; Blidö socken ligger sydost om Norrtälje i skärgården vid Svartlögafjärden.",
      "last": "2026-09-19",
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
      "url": "https://roslagen.se/oar/blido/",
      "org": "roslagen.se",
      "vad": "",
      "last": "2026-09-28",
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
    }
  ],
  "gallno": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "På ön finns bland annat handelsbod, rast- och informationstuga, allmän båtplats och vandrarhem, I reservatet finns informationstavla, cykelled, rast- och övernattningsstuga och båtluffarled ;  — Från Brännholmen kan du också ta båtluffarledens roddbåt över till Karklö ;  — Båtluffarled finns på Brännholmen mot Karklö för vidare färd mot Svartsö eller Finnhamn",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/karklo.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 2017, Storlek: 123 hektar varav land 59 hektar, Förvaltare: Skärgårdsstiftelsen, Vid Vambö och Kolfatet gränsar reservatet till Gällnö naturreservat i sydost, Den lilla ön Kolfatet, På ön finns en grov döende ek, troligen upp emot 300 år gammal, Det finns en markerad strövstig på Karklö som hör samman med båtluffarleden, Badplats finns utanför reservatet, i närheten av ångbåtsbryggan, På Karklö-Vambö bedrivs ett aktivt jordbruk med boskapsskötsel ;  — Ett smalt sund skiljer Gällnö från grannön Karklö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/gallno",
      "org": "Waxholmsbolaget",
      "vad": "Du kan åka till Gällnö från Strömkajen, vissa turer går direkt utan byte. ;  — GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, Gällnönäs (Gällnö), Ängsholmen (vid Gällnö): t.ex. lördag Strömkajen 08.00 → Gällnö 09.55, måndag–torsdag 09.00 → 11.30, Boda brygga 10.25 → Gällnö 10.30 ;  — GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026: Strömkajen 07.45 → Gällnö 09.30 ;  — Med Cinderella tar resan till Gällnö ca 1 tim och 45 min., Säsongen löper från slutet av april till slutet av september. ;  — Waxholmsbolaget kör båt till Gällnö Söderby",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "11A STOCKHOLM — VAXHOLM — GRINDA — BODA — SOLLENKROKA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, Gällnönäs (Gällnö), Ängsholmen (vid Gällnö) ;  — GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026;  — Resa med Waxholmsbolaget går inte att förboka.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gallno.se/om-gallno/",
      "org": "gallno.se",
      "vad": "Grusvägarna är bilfria och badklipporna varma. ;  — Här finns ingen biltrafik.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/gallno-krog/",
      "org": "gallno.se",
      "vad": "Vår meny erbjuder en mångfald av smårätter som är perfekta att dela på och större rätter med grillade inslag och fokus på grönsaker, Inspirationen till vår mat hämtar vi från Medelhavsländerna, De flesta borden finns under äppelträden i trädgården, Vi tar ej bordsbokningar ;  — Öppettider 2026, 14 maj - 17 maj (Kristi him), 27 JUNI - 9 augusti, 18 AUGUSTI - 23 AUGUSTI . Handskrivna öppettider borttagna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/oppettider/",
      "org": "gallno.se",
      "vad": "Öppettider 2026, 14 maj - 17 maj (Kristi him), 27 JUNI - 9 augusti, 29 augusti - 30 augusti ;  — Vandrarhemmet har öppet från början av maj till slutet av september.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/bra-att-veta/",
      "org": "gallno.se",
      "vad": "Vi har några cyklar till uthyrning, Utbudet är begränsat och går inte att förboka. Vi har havskajaker för både en och två personer. Kajakerna går att förboka",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/handelsboden/",
      "org": "gallno.se",
      "vad": "omfattande sortiment av kolonialvaror, mejeriprodukter, frysvaror, färsk frukt, kött, fisk, konfektyr och dryck, Varje vardag levereras färskt bröd från bageri Vivels i Stockholm, Vi tar tex gärna upp beställningar av färsk fisk och skaldjur. ;  — 14 maj - 17 maj (Kristi him), 13 juni - 12 juli, 13 juli - 9 augusti, 10 augusti - 16 augusti, 29 augusti - 30 augusti",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/hotell-frans-august/",
      "org": "gallno.se",
      "vad": "Herr Frans August Jakobsson som 1902 skänkte den mark där vandrarhemmet idag står till förmån för att ön skulle få sin egen skola ;  — huserade öns gamla skola fram till 1960 ;  — öns gamla skola som blev vandrarhem 1981",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/gallno-karklo/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Torsviken är särskilt uppskattad med naturhamn, sandstrand och tältplats. Här finns också en välbevarad jättegryta som bildades av inlandsisen för omkring 10 000 år sedan. ;  — Det finns en fin och gratis tältplats vid Torsviken cirka 20 minuter promenad från Gällnö By. Där finns förutom färskvatten och torrdass också en fin sandstrand.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/cinderellabatarna/",
      "org": "stromma.com",
      "vad": "Med Cinderella tar resan till Gällnö ca 1 tim och 45 min., Kliv ombord vid Strandvägen, Säsongen löper från slutet av april till slutet av september. ;  — med Cinderellabåtarna där biljett kan bokas online",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Det stora röda huset är öns gamla skola som blev vandrarhem 1981, Här bor du i tvåbäddstugor, familjestugor eller i rum i huvudbyggnaden ;  — Vandrarhemmet har öppet från början av maj till slutet av september. ;  — Skärgårdens minsta hotell!, Frukost ingår alltid till alla våra hotellgäster, Med direkt anslutning till vandrarhemmet kan man även använda alla de gemensamma utrymmena där, så som kök och matsal, dusch samt bastu på vandrarhemmet ;  — För den som föredrar att bo nära naturen finns tältplats och naturhamn vid Torsviken.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "norrora": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h632.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje–Yxlan, Furusunds färjeläge, Köpmanholm",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora",
      "org": "Waxholmsbolaget",
      "vad": "ligger i den vackra Svartlögafjärden, precis utanför Furusund; Saltkråkan är framför allt inspelat på Norröra. Där ligger till exempel det bostadshus som i tv-serien kallades Snickargården, det hus som farbror Melker först hyrde och sedan köpte; Från Norröra kan du även enkelt ta dig över till Söderöra — båtturen tar bara 10 minuter … Framför allt vinterscenerna spelades in på ön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026, Går under perioderna 8 maj - 18 juni och 17, Går under perioden 17 augusti - 30 augusti. Måndag–torsdag går turerna 2601 (8 maj–18 juni) och 2611 (17–30 augusti), fredag 2621 och 2623, lördag 08.45 → Norröra 12.15, söndag 10.00 → 13.10",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "två avgångar om dagen från Strömkajen 19 juni–16 augusti;  — vår och höst lördag 08.45, söndag 10.00, fredag 08.45 och (till 13 september) 16.30, måndag–torsdag bara 8 maj–18 juni och 17–30 augusti .  skriver \"det går ofta två turer om dagen\", vilket bara stämmer med sommartabellen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 30 SEPTEMBER 2026, Beställ resan i SL-appen; Furusund 07.50 → Köpmanholm 07.52 → Norröra 08.30, 10.05 → 10.45b .  — 17 AUGUSTI 2026 — 12 DECEMBER 2026, samma tider Furusund–Norröra",
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
      "last": "2026-09-29",
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
    }
  ],
  "nattaro": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/",
      "org": "haninge.se",
      "vad": "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig / Runt berget finns ryssugnar från härjningarna 1719 / På ön strövar även dovhjortar vilt.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Nåttaröfladen har med sina många små kobbar och skär ett rikt fågelliv ... För att skydda fågellivet råder tillträdesförbud mellan 1 februari och 15 augusti. / föreskrifterna räknar upp bland annat Östra Rödko, Långholmen, Grönborgen, Båten, Vittskär, Gjusskär, Brandholmen, Björkskär, Boskär, Rönnkobben, Tärnkobben och Grenkullen",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h22.pdf",
      "org": "Waxholmsbolaget",
      "vad": "22A NYNÄSHAMN — NÅTTARÖ — ÅLÖ; ONSDAG TORSDAG FREDAG LÖRDAG SÖNDAG; 10.10 15.35 10.10 14.05 18.10 / Nåttarö 10.40 16.05 10.40 14.35 18.40; åter Nåttarö 12.00 17.00 15.30 / Nynäshamn 12.35 17.35 16.05",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nattaro.se/",
      "org": "nattaro.se",
      "vad": "En trerätters på Krogen eller pizza på Sixtens bodega?",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/boende/praktisk-information-om-vistelsen-pa-nattaro/",
      "org": "nattaro.se",
      "vad": "Öppen hela säsongen (valborg till sista helgen i september) (om dygnscampingen)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/aktiviteter/sol-och-bad/",
      "org": "nattaro.se",
      "vad": "Vidare norrut finns en lika fin men något mindre strand vid namn Skarsand. / För den som uppskattar klippor finns öns södra del med Vänsviken och Vålasand",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/aktiviteter/kajak/",
      "org": "nattaro.se",
      "vad": "Kajakerna finns att hyra i hamnkontoret i gästhamnen. Där finns även kartor att låna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/boende/vandrarhemmet/",
      "org": "nattaro.se",
      "vad": "Vandrarhemmet består av 4 hus med totalt 32 bäddar.; husen heter Hus Röda Villan, Hus Annexet:, Hus Västan: och Östan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/boende/",
      "org": "nattaro.se",
      "vad": "På Nåttarö har vi 50 stycken semesterstugor / dygnscamping à 60:-/natt, max sju nätter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/ta-er-till-on/",
      "org": "nattaro.se",
      "vad": "Vi har en taxibåt för upp till 12 personer.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/gasthamn/",
      "org": "nattaro.se",
      "vad": "Vår gästhamn ligger vid Kvarnviken. Den nya flytbryggan med elstolpar, (230 volt) har 45 platser / Här finner ni toaletter, duschar och bastu. / Bastu bokas separat",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nattaro.se/mat-pa-on/",
      "org": "nattaro.se",
      "vad": "Krogen hittar du intill ångbåtsbryggan och gästhamnen. / (Vi tar inte bordsbokningar) / (se öppettider under respektive restaurang.)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/nattaro/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Nåttarö ligger i Stockholms södra skärgård mellan Utö och Landsort. / Nåttarö är också en perfekt plats för höstsurfing.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-nattaro/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "På Nåttarö finns bra möjligheter om du har med barnvagn, om du har begränsad rörlighet eller om du sitter i rullstol. Vid Ångbåtsbryggan möter du skärgårdsidyllen direkt. Vid kajkanten är det en fin badstrand. / Är du äventyrlig och stark kan du ta dig längs grusvägen norrut (1,5 km) förbi Drottninggrottan till Nåttarö Storsand.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Nåttarö, Challenging 9.5 km.",
      "last": "2026-09-30",
      "myndighet": false
    }
  ],
  "ingmarso": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalgardson.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "reservatet utgörs till största delen av Kålgårdsön, \"den östligaste delen av Ingmarsö\", jämte Bockholmen i söder och ytterligare några öar i Österåkers kommun; bildat 1974; 103 hektar varav 100 hektar land; Skärgårdsstiftelsen är både markägare och förvaltare; \"Ändamålet med reservatet är att säkra ett område av stort värde för allmänhetens rörliga friluftsliv\" (2026-09-14)",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "12A STOCKHOLM — VAXHOLM — LILLSVED — NORRA INGMARSÖ — HUSARÖ — MÖJA . Strömkajen–Norra Ingmarsö: söndag 08.40–11.17 = 2 tim 37 min, lördag 08.30–11.17 och vardag 17.30–20.17 = 2 tim 47 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Strömkajen–Södra Ingmarsö via Boda: 15.30–18.45 = 3 tim 15 min, 08.15–11.40 = 3 tim 25 min, 14.45–18.25 = 3 tim 40 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "10A ÅSÄTTRA — NORRA INGMARSÖ — HUSARÖ — MÖJA . Åsättra–Norra Ingmarsö 30 min (t.ex. 08.30–09.00, 16.10–16.40). Sommartidtabellen finns inte publicerad nu, så den tidigare uppgiften 2,5 h sommartid kunde inte kontrolleras.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ingmarso.se/",
      "org": "ingmarso.se",
      "vad": "Längst in i Femsundsviken finns en badplats med brygga och sandstrand. Man kan även bada på ”Badberget” vid Norra bryggan.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/%C3%A4ta-och-sova",
      "org": "ingmarso.se",
      "vad": "Café — Deli — Restaurang — Catering, öppet från tidig morgon till sen kväll, frukost, lunch, middag, pizza och fika, På uteserveringen, i trädgården",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/hittahit",
      "org": "ingmarso.se",
      "vad": "Båt hela vägen från stan tar mellan två och cirka tre timmar; Du till vissa turer ta SL-buss 438 från Slussen i Stockholm och stiga på båten i Boda; Till bryggan på norra Ingmarsö går reguljära turer från Åsättra på Ljusterö",
      "last": "2026-10-01",
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
      "url": "https://www.ingmarsobnb.se/",
      "org": "ingmarsobnb.se",
      "vad": "",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://ingmarsogasthamn.se/",
      "org": "ingmarsogasthamn.se",
      "vad": "ca 30 platser, landström, färskvatten, dusch/wc, bränsle (bensinmack + sjömack året runt, kortbetalning)",
      "last": "2026-10-01",
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
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Ingmarsö, Moderate 9.8 km.",
      "last": "2026-09-30",
      "myndighet": false
    }
  ],
  "namdo": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "I nationalparken finns 1 353 öar, kobbar och skär och ett större havsområde längst österut; förvaltare Länsstyrelsen i Stockholms län; markägare Staten genom Naturvårdsverket; tre större bebyggda öar — Bullerö, Rågskär och Långviksskär — har vandringsleder, rastplatser och tältplatser (2026-09-14)",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/namdo.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Nämdös naturreservat ingår i södra skärgårdens urkalkstensbälte vilket medför att floran är mycket särpräglad och artrik på ormbunkar och orkidéer inom naturreservatet. ;  — Kalkhällarna vid Östanvik hör till de botaniskt mest värdefulla miljöerna i hela Stockholms skärgård. . «Ovanligt rik» och «annorlunda än i resten av skärgården» stod inte i källorna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/",
      "org": "Naturvårdsverket",
      "vad": "Nämdöskärgården blir Sveriges 31:a nationalpark (nyhet 2025-06-23); Den omfattar en areal på 25 300 hektar varav 97 procent är hav; drygt 1 300 öar, kobbar och skär; landets andra nationalpark med marint fokus och den första i Östersjön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278",
      "org": "Riksantikvarieämbetet",
      "vad": "Nämdö kyrka invigdes hösten 1876; Stilen är nygotisk som framförallt uttrycks genom den höga takresningen, tornet samt de spetsbågade fönstren; utförd med trästomme, granitsockel samt svartmålat plåttak",
      "last": "2026-09-30",
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
      "org": "Waxholmsbolaget",
      "vad": "den är både bilfri och till viss del ett naturreservat ;  — floran är mycket särpräglad och artrik på ormbunkar och orkidéer ;  — Det är en levande skärgårdsbygd med flera byar; Nämdö erbjuder ett rikt och varierat friluftsliv året om.; I Solvik finns service och under sommaren erbjuds både mat, aktiviteter och boende för besökare. . «Genuint» och «välskyddat» var omdömen utan källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h17.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "Waxholmsbolaget linje 17, \"GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026\": Stavsnäs 13.12 → Nämdöböte 13.35, Östanvik 13.47, Solvik 14.00, Bunkvik 14.10; lördag Stavsnäs 07.35 → Nämdöböte 08.00, Östanvik 08.10, Solvik 08.25, Bunkvik 08.35 = ca 25–60 min beroende på brygga .  — \"tabell 17\" ;  — \"Reguljär båttrafik går året runt från Stavsnäs med Waxholmsbolaget.\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://battaxi.se/nämdölinjen/",
      "org": "battaxi.se",
      "vad": "Till skillnad från traditionella turer är både Nämdölinjen och Runmarölinjen unika då vi även lägger till vid privata bryggor.; Samtliga avgångar måste förbokas! ;  — Stavsnäs Båttaxi: Regelbunden tidtabell med Nämdölinjen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/namdo/skargardsstiftelsens-bastu-pa-namdo",
      "org": "explorearchipelago.com",
      "vad": "Skärgårdsstiftelsens bastu öppen för allmänheten. Avgift betalas med Swish.; Bastun är öppen från 30 april till och med 31 oktober. ;  — Från sjön fortsätter du till Långvik, där finns bastu.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/namdo/skargardsmuseets-namdofilial",
      "org": "explorearchipelago.com",
      "vad": "Museet har säsongsöppet med olika utställningar, en museibutik och ett kafé.; Gamla Skolan, Sand",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/namdo",
      "org": "explorearchipelago.com",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/namdo/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Reguljär båttrafik går året runt från Stavsnäs med Waxholmsbolaget. Under sommaren finns även förbindelser från Stockholm och Saltsjöbaden. ;  — Sommartid går det turer till Nämdö tre eller fyra gånger om dagen från Stavsnäs. Under sommaren går även Nord/Sydlinjen via bryggorna Solvik och Östanvik. ;  — linje 17 med bryggorna Nämdöböte, Östanvik, Kalkberget, Västanvik, Solvik, Sand och Bunkvik; Stavsnäs 13.12 → Nämdöböte 13.35 … Bunkvik 14.10 .",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-namdo/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "13,1 km skärgårdsupplevelse; Vi har valt att börja etappen vid Solvik och vi rekommenderar att du vandrar medsols; Därifrån följer du den smala vägen söderut förbi kyrkan.; där följer du stigen tills du når en förtrollad insjö; Från sjön fortsätter du till Långvik, där finns bastu.; utkiksberget vid Nämdö Böte; ett utsiktsberg där du har milsvid utsikt; Missa inte lugnet och utsikten vid Kyrknäset. . Tidigare citat «ett litet utsiktsberg» fanns inte på sidan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Nämdö, Moderate 13.1 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/djuro-moja-namdo/namdo-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Nämdö kyrka är byggd i trä i enkel nygotik och invigdes hösten 1876.; Kyrkans exteriör med sin tidstypiska panel, med omväxlande liggande och stående bräder, är numera vitmålad.; altarskåpet som visar Kristus som Smärtornas man och är från 1400-talets slut . Tidigare uppgifter om åttakantig gustaviansk kyrka 1768/1798 var fel; «en av skärgårdens mest distinkta» var ett omdöme.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.xn--nmdhbf-bua0m.se/hembygdsgard-bibliotek/",
      "org": "xn--nmdhbf-bua0m.se",
      "vad": "Sigfrid Jonsson (1895–1983) var föreningens grundare; \"1977 gav Sigfrid sina två fastigheter till Nämdö Hembygdsförening vilket ledde till att Nämdö hembygdsgård kunde börja byggas\"; hembygdsgården har \"en sal med plats för upp till 80 personer plus ett professionellt utrustat kök\" (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.xn--nmdhbf-bua0m.se/service-information/",
      "org": "xn--nmdhbf-bua0m.se",
      "vad": "Handlarn, Solvik: \"Livsmedelsaffär, bensinstation\"; \"Läkarbåten besöker Nämdö skärgård minst en gång i månaden, men måste bokas i förväg på Djurö Vårdcentral.\"; grovsopfärjan \"kommer till Nämdö skärgård i juni, juli och augusti\"; \"Vid Nämdö hembygdsdgård, Sand brygga och i Solvik finns behållare där vi samlar in pet-flaskor och burkar.\" . Stod «en gång i månaden» — sidan säger minst en gång.",
      "last": "2026-09-27",
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
      "url": "https://www.varmdo.se/barnochutbildning/skolbarn/alltomgrundskolan/grundskolorivarmdokommun/varmdoskargardsskolor.4.2d09c46d1850f82301f9103.html",
      "org": "varmdo.se",
      "vad": "Svartsö skola är en liten F–9-skola med närhet till natur och vatten., Årskurs 6–9 vilande läsåret 2026/2027.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, Alsvik (Svartsö); Strömkajen–Alsvik t.ex. mån–tor 08.15–10.50, lör 08.35–10.50, sön 08.15–10.35, vardag 14.45–17.45",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-svartso/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "etappen är 17,9 km, \"en liggande åtta\", nås från bryggorna Norra Svartsö, Alsvik, Skälvik och Söderboudd; svårighetsgrad \"Lätt\", \"De knappt arton kilometrarna är för det mesta på vacker grusväg\" (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Svartsö, Easy 17.9 km.",
      "last": "2026-09-30",
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
    }
  ],
  "runmaro": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/F%C3%B6rorenade%20omr%C3%A5den%20-%20inventering%20av%20gruvbranschen%20i%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen",
      "vad": "Sulfidmineralen zinkblände och blyglans bröts på Runmarö i Stockholms skärgård. En mängd av 4 771 ton zinkmalm utvanns i början av 1900-talet. / Värmdös gruvor är med få undantag belägna på Runmarö. Här finns cirka sju sulfidmalmsbrott eller större skärpningar. De tre gruvorna Kilagruvorna, Söderbygruvorna och Vånögruvorna, alla belägna på Runmarö",
      "last": "2026-10-10",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f78/1649062024310/Runmarö.pdf",
      "org": "Natur",
      "vad": "Strax sydväst om Gatan finns ett område som kallas Ryssflykten efter att ryska soldater slagit läger här under rysshärjningarna sommaren 1719 ... Ett hundratal fartyg och tusentals man övernattade ett par nätter på Runmarö i sluttningen mot fjärden. Här finns än i dag ett tiotal ryssugnar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget linje 16",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; Stavsnäs 07.00 → Styrsvik (Runmarö) 07.05, 09.45 → 09.50, 14.45 → 14.50, alltså ca 5 minuter . Tidigare länk (v16.pdf) finns inte längre.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://runmaro.se/handla",
      "org": "runmaro.se",
      "vad": "Tempo Runmarö, Apoteksombud, Systemombud",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://runmaro.se/matologi",
      "org": "runmaro.se",
      "vad": "under Krog & restaurang listas bara \"Svängen Runmarö AB\"",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://runmaro.se/om",
      "org": "runmaro.se",
      "vad": "buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://runmarobatvarv.se/",
      "org": "runmarobatvarv.se",
      "vad": "gästbrygga med båtplatser, inga stugor;  — Krog & restaurang listar bara \"Svängen Runmarö AB\"",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://runmarobatvarv.se/tj%C3%A4nster/g%C3%A4sthamn-marina-29942252",
      "org": "runmarobatvarv.se",
      "vad": "Gästbrygga, Anslutning Landström, Runmarö Båtvarv AB | Solberga, 614; 130 38 Runmarö . Ingen källa för bränsle, vatten eller dusch.",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://www.runmarolanthandel.se/",
      "org": "runmarolanthandel.se",
      "vad": "Ny öppettider igen, vi kommer från och med 31/8 börja med följande tider; Vi har öppet med appen som vanligt ända fram till 22.00 ;  — Butiken är öppen för självscanning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.runmaro.se/om",
      "org": "Runmarö",
      "vad": "Från Stavsnäs Vinterhamn finns det gott om reguljära förbindelser till Runmarö med Waxholmsbolaget eller andra båtbolag; Utgår du från Stockholm tar du buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/",
      "org": "Stockholm Archipelago Trail",
      "vad": "Du åker till Runmarö flera gånger om dagen från Stavsnäs eller Sandhamn, året om.; Runmarö har ca 300 bofasta som bor året om, på sommaren är det ungefär 3 — 4000 personer som håller till på ön. ; Värmdö kommun anger cirka 250 bofasta (se description)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Runmarö, Moderate 16.6 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://svangenrunmaro.se/",
      "org": "svangenrunmaro.se",
      "vad": "Restaurangen i kurvan; Glasskiosken i trädgården med lekplats; Boka bord kväll; *Inga bokningar på lunch; *Husdjur välkomna; SÖDERSUNDA 421 . Sidan är uppdaterad 2026.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://sxk.se/bojar-hamnar-och-farleder/hamnar/uthamnar",
      "org": "sxk.se",
      "vad": "Norrviken, Runmarö; Uthamn med fem blå svajbojar och sex akterbojar (röda) för bryggförtöjning. Brygga, toa och sopmaja.; Uthamnarna är tillgängliga för alla båtturister, även för icke SXK-medlemmar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/forfattare/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "Tomas Tranströmer (1931–2015): \"Morfadern var lots och det blev många sommarlov hos mormor och morfar i Gatan\"; Nobelpriset i litteratur 2011; \"Dikter från Runmarö\" (2001); sidan avslutas \"Vänligen respektera att här nämnda boenden ej är utflyktsmål!\"",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/kulturstigar/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "Vi har gjort en karta som visar intressanta stigar och platser på Runmarö. … Kartans röda stigar är märkta med hänvisningsskyltar av trä på plats. På några ställen finns informationsskyltar om kultur och natur. Etapperna har litterära stopp, bl.a. Vägen mot Silverträsk — August Strindberg och Bemärkta sommargäster i Långvik.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/kalkhallar/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "Där det finns urkalksten på Runmarö ser man en särpräglad och färgsprakande blomsterprakt och en stor rikedom på orkidéer; apollofjärilen finns bara på platser med kalkberggrund",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://xn--runmarhembygdsfrening-mecj.se/lotsbyar/",
      "org": "xn--runmarhembygdsfrening-mecj.se",
      "vad": "år 1703 kom \"nio av nitton Stockholmslotsar\" från Runmarö; år 1797 var \"49 av 68 Stockholmslotsar\" bosatta på ön; lotsstationen Berghamn mellan Värmdö och Runmarö etablerades 1741 och upphörde i början av 1900-talet; då byggdes \"den lilla lotsutkiken på berget i Styrsvik\"",
      "last": "2026-10-01",
      "myndighet": false
    }
  ],
  "resaro": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h680.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stockholm–Resarö, Tekniska högskolan, Överby, Giltig 17 augusti–12 december 2026; måndag–fredag Tekniska högskolan 14.37 → Överby 15.30 (53 min), Överby 06.02 → Tekniska högskolan 06.51 (49 min); Lördag, söndag oh helgdag, Ingen trafik",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h682.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Engarn–Resarö, Resarö–Engarn (–Vaxholm), Giltig 17 augusti–12 december 2026; vardagar dagtid avgår 682 från Engarn 09.04, 09.34, 10.04 … (varje halvtimme), Engarn → Överby 9–11 min",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v682.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 14 december 2025–18 juni 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/bygga-bo--miljo/stadsplanering/detaljplanering/pagaende-planarbeten/resaro",
      "org": "vaxholm.se",
      "vad": "Resarö har genomgått en långsiktig omvandling från fritidsområde till ett område för permanentboende.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/alla-nyheter/nyhetsarkiv/2023-11-01-grundamnen-pa-repslagaregatan",
      "org": "vaxholm.se",
      "vad": "Upptäckterna gjordes från 1794 och under cirka hundra år framåt och namnen är alla gjorda som en variant på ordet Ytterby.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/gronomraden",
      "org": "vaxholm.se",
      "vad": "Killingen består av ett cirka 100 hektar stort barrskogsområde på västra Resarö, Området används för idrottslektioner, motionering, bär- och svampplockning samt hundrastning., Det är möjligt att cykla och gå med barnvagn på de större stigarna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "vaxholm.se",
      "vad": "På Överby finns denna fina familjevänliga badplats som ligger utefter Badviksvägen., Sandstrand, Badryggor med stege, Omklädningshytt, Grillplats med fasta bänkar och lösa bord, Beachvolleybollplan",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/alla-nyheter/nyhetsarkiv/2026-07-02-avtal-klart-med-stiftelsen-ytterby-gruva",
      "org": "vaxholm.se",
      "vad": "23 nya grundämnen upptäcktes under en kort period och åtta av dem hittades i mineral från Ytterby gruva. Flera av ämnena har fått namn efter platsen i Ytterby, som Yttrium, Ytterbium, Terbium och Erbium.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/alla-nyheter/nyhetsarkiv/2019-05-03-ytterby-gruva-uppmarksammades",
      "org": "vaxholm.se",
      "vad": "European Chemical Society (EuChemS) att välja platsen som en av två mottagare av priset ’Historical landmark’",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h5.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 5A STOCKHOLM — VAXHOLM — STEGESUND — VIKINGSBORG, Ytterby (Resarö), Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.destinationvaxholm.se/sv/vaxholms-oar",
      "org": "destinationvaxholm.se",
      "vad": "Engarn och Resarö beboddes redan på vikingatiden. Vid den tiden var de två olika öar men är nu sammanvuxna till en och samma ö.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationvaxholm.se/sv/resa-till-vaxholm",
      "org": "destinationvaxholm.se",
      "vad": "går buss 670 från Tekniska högskolan flera gånger i timman",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/vaxholm/ica-resaro-1003742/",
      "org": "ica.se",
      "vad": "Överbyvägen 4, 18594 Vaxholm",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kanotcenter.com/sv/",
      "org": "kanotcenter.com",
      "vad": "vårt ursprungliga kajakcenter vid vattnet på Resarö, Kajakturer, kajak-/kanot-/SUP-uthyrning, självguidade turer, campingpaket, bastuupplevelser och gruppevenemang.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ytterbygruva.se/eget-besok/",
      "org": "ytterbygruva.se",
      "vad": "installerade vi i samarbete med Stiftelsen för Strategisk Forskning ett antal skyltar i och kring dagbrottet, Du kan därför med fördel vandra här på egen hand.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ytterbygruva.se/hitta-hit/",
      "org": "ytterbygruva.se",
      "vad": "Med SL-buss till hpl Ytterby (3). Gå sedan drygt 1km längs med Ytterbyvägen (ca 15min)., Med Waxholmsbåt till Ytterby brygga (2), gå sedan 200m till Ytterbyvägen 65.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ytterbygruva.se/",
      "org": "ytterbygruva.se",
      "vad": "Lördag 5 september kl 10.30, Observera att visningar kan bli fullbokade och att visningarna inte inkluderar underjordsanläggningen.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "husaro": [
    {
      "url": "https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html",
      "org": "osteraker.se",
      "vad": "På ön finns också Elsa Beskows hus där hon hämtat inspiration till boken Puttes äventyr i Blåbärsskogen. ;  — Husarö bedöms vara av riksintresse för kulturmiljövården. . OBS: Skärgårdsstiftelsens Lilla Husarn är en annan ö vid Nämdö.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "12A STOCKHOLM — VAXHOLM — LILLSVED — NORRA INGMARSÖ — HUSARÖ — MÖJA, Går under perioden 14 september - 12 december. . Restider Strömkajen–Husarö i tabellen (vår/höst 2026): söndag 08.40–11.45 och vardag 17.30–20.35 = 3 tim 5 min; lördag 08.30–11.45 = 3 tim 15 min; måndag–torsdag 08.15–12.10 = 3 tim 55 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "13A STOCKHOLM — VAXHOLM — BODA — SÖDRA INGMARSÖ — HUSARÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Via Boda: 08.15–12.10 (3 tim 55 min), 15.30–19.10 (3 tim 40 min), 14.45–18.50 (4 tim 5 min).",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "10A ÅSÄTTRA — NORRA INGMARSÖ — HUSARÖ — MÖJA . Åsättra–Husarö t.ex. 14.05–14.50 och 16.10–16.55 = 45 min, 10.50–11.40 = 50 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
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
      "url": "https://stockholmslansmuseum.se/besoksmal/husaro/",
      "org": "stockholmslansmuseum.se",
      "vad": "I den så kallade kung Valdemars jordebok från 1200-talet som är den äldsta seglingsbeskrivningen genom skärgården, finns Husarö med under namnet Husarn., Mellan 1740 och 1912 var Husarö officiell lotsplats och under segelsjöfartens storhetstid vid slutet av 1800-talet arbetade ett 20-tal lotsar på Husarö.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "fejan": [
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "31A RÄFSNÄS — TJOCKÖ — FEJAN, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00 . Räknat: må–fr 5–6 turer Räfsnäs → Fejan (tur 3103 07.55 bara t.o.m. 13 sep), lör 2, sön 2; restid 25–65 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "http://www.bfsf.se/files/Fejan.pdf",
      "org": "bfsf.se",
      "vad": "1894 års koleraepedemin var inte den första, Det var knappt 200 fartyg med närmare 5 000 passagerare som gjorde ett, för många oönskat, uppehåll . Stod «yttersta bebodda», «bofast historia sedan 1856», sjukhuset «Wasa» i drift till 1930-talet — ingen tillåten källa, struket.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejan.com/hitta-hit",
      "org": "fejan.com",
      "vad": "BIL/BUSS E18 från Stockholm norrut ca en timme, kör mot Kapellskär, sväng vänster mot Räfsnäs brygga efter ca 2 mil. Besöksparkering finns ca 200 meter innan Räfsnäs brygga.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejan.com/gasthamn",
      "org": "fejan.com",
      "vad": "Vår gästhamn är stängd för säsongen ;  — Vi har stängt och öppnar igen sommaren 2027 ;  — Under 2026 håller vandrarhemmet stängt . Stod «ingen service finns på ön» (fel: krog, café, gästhamn) och «naturhamnen fylls kvällar i juli» (obelagt).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejan.com/",
      "org": "fejan.com",
      "vad": "Vi är en cash-free restaurang",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejanoutdoor.se/",
      "org": "fejanoutdoor.se",
      "vad": "Hos oss kan du hyra stabila singel- och dubbelkajaker, Utrustning, paddelteknik och tips på rutter ingår ;  — utskärgårdens kobbar, skär och paddelvatten strax utanför ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/fejan/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Fejan ligger i norra skärgården, strax öster om Räfsnäs, I slutet av 1800-talet anlades här en karantänstation för fartyg som misstänktes bära smittsamma sjukdomar, och de välbevarade byggnaderna berättar än idag om öns unika förflutna, Under senare perioder har Fejan även fungerat som flyktingförläggning och lotsmiljö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "Skärgårdsstiftelsen",
      "vad": "När koleran svepte över Europa 1892 uppfördes i en hast en karantänstation på ön Fejan. Ett monteringsfärdigt trähus som skulle skeppas till Kongo som missionsstation exproprierades vid utskeppningskajen och sattes upp som doktorsvilla på Fejan . «Därav namnet Kongohuset» står inte i källan — struket.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "rodloga": [
    {
      "url": "https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf",
      "org": "norrtalje.se",
      "vad": "På 1700-talet gavs ett kungligt dekret som ålade byborna på Kudoxa och Rödlöga att hålla lots på Svenska Högarna. Den första permanenta lotsstationen byggdes 1793.; Mellan åren 1910 och 1927 skulle antalet personer på ön komma att öka från 50 till nästan 400 personer.; År 1954 infördes daglig förbindelse med båttrafik under sommarhalvåret från Furusund. Trots det upphörde man med jordbruk två år senare på ön.; I mitten av 1960-talet bodde det sju personer på ön. (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/rodloga",
      "org": "Waxholmsbolaget",
      "vad": "Under våren, sommaren och hösten kan du åka ut till Rödlöga från Strömkajen utan byten. Resan tar fyra timmar.; Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan för att ta dig till Rödlöga.; Heldagsutflykt till Rödlöga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; 26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA — måndag–torsdag tur 2601 Strömkajen 09.00, Rödlöga 13.00; tur 2602 Rödlöga 15.00, Strömkajen 19.00",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026 — tur 2621 Strömkajen 08.45, Rödlöga 13.00 (mån–tors); tur 2671 söndag Strömkajen 10.00, Rödlöga 14.00",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 30 SEPTEMBER 2026; 28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — BROMSKÄR / RÖDLÖGA — lördag tur 2851 och söndag tur 2871: Furusund 10.05, Rödlöga 12.20",
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
    }
  ],
  "singo": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/singo-backbyn.html",
      "org": "havochvatten.se",
      "vad": "badplats i Norrtälje kommun; Tjänligt — kommunens prover 1 juni–24 augusti 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/singo-soderby.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Den sällsynta vedsvampen stor aspticka kan du se på de grova asparna; den lilla orkidén knärot",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/backbyn.pdf",
      "org": "norrtalje.se",
      "vad": "Backbyn har störst antal bevarade sjöbodar i hela länet; Lämningar av malm-, marmor- och kalkbrytning samt fyr- och lotsverksamhet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/idrott-motion-friluftsliv/friluftsomraden/vandringsleder-pa-singo-och-fogdo/",
      "org": "norrtalje.se",
      "vad": "Föreningen Levande roslagsbygd har märkt ut vandringsleder och stigar på Singö och Fogdö; Ett tips är att ta bussen till någon av hållplatserna längs leden och sedan gå tillbaka; från Ellan i norr till södra Fogdö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/mattsgarden--singo-hembygdsforening/",
      "org": "norrtalje.se",
      "vad": "Verksamheten utgår från Mattsgården (1700–1800-talet); Mattsgården, Backbyvägen 85, Singö; guidade visningar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "637 Norrtälje–Singö; Singöbron södra; Singö camping; Singö kyrka; Ellans vändplan; Giltig 17 augusti–12 december 2026. Räknat: till Singö kyrka 65–77 min, till Ellans vändplan 77–90 min; 7 turer mån–fre och 5 lör–sön når Singö. Broåret 1955: singo-fogdo.se (se description)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.grisslehamnsmarina.se/singo-camping/",
      "org": "grisslehamnsmarina.se",
      "vad": "Här finns det idag ca. 20 bokningsbara platser och 20 året runt campare samt 5 fyrbäddsstugor; Det finns även en liten småbåtshamn och badbrygga samt bastu; Campingen har öppet under sommaren 15 maj till 15 sept.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.grisslehamnsmarina.se/singo-sjokrog/",
      "org": "grisslehamnsmarina.se",
      "vad": "Krogen är just nu stängd i väntan på beviljat serveringstillstånd",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://roslagen.se/oar/singo-och-fogdo-lattillganglig-kulturmiljo/",
      "org": "roslagen.se",
      "vad": "",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://singo-fogdo.se/SHBf/lankar_v_sidan/gamla_nyheter.html",
      "org": "singo-fogdo.se",
      "vad": "Den 16 nov 1955 kl 1300 klipptes bandet; blev klara 1955 — sidan anger också att broarna gick från Väddö-Byholma över Kolskär, Fogdö och Riddarskär till Singö och att telefon kom 1905 och elektricitet 1945",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.singoaffaren.se/",
      "org": "singoaffaren.se",
      "vad": "Butiken har ett fullsortiment av dagligvaror och är även apoteksombud och ombud för Systembolaget",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/roslagens-ostra-pastorat/singo-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Nuvarande kyrkobyggnad uppfördes 1753 och är en korskyrka i knuttimrat liggtimmer med polygonalt kor och västtorn; Altarskåpet; är tillverkat i Lübeck på 1490-talet. Skåpet har tidigare suttit i Hargs kyrka och församlingen fick skåpet 1761; Skeppet tros vara ett av de äldsta i Stockholms län och är en gåva till församlingen från Norrtäljeborgaren Eric Brant och hans hustru Maria Tillman år 1752",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "lido": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/lido.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Storlek: 1212 hektar varav land 322 hektar, huvudsakligen bevuxna av barrskog, Inslag av ädellövskog finns, ett odlingslandskap med åker- och betesmarker;  — Gästhamnen i Båthusviken erbjuder service för båtburna besökare medan Österhamn är ett populärt val för den som söker en naturnära hamn, Runt ön finns flera fina badplatser med både klippbad och mindre sandstränder, På Lidö gård driver Magnus Atte med familj ett skärgårdsjordbruk;  — Gästhamnen hittar ni på öns sydvästra sida, i Båthusviken, På öns nordöstra sida finner ni Österhamn",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h631.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Norrtälje busstation 07.23 12.28 14.30 15.49 16.50 17.57 19.00 21.15, Räfsnäs brygga 08.16 13.13 15.15 16.28 17.29 18.36 19.36 22.05  — vardagar 36–53 min Norrtälje busstation–Räfsnäs brygga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s40.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 22 JUNI 2026 — 16 AUGUSTI 2026, 40A NORDSYDLINJEN: NORRTÄLJE / ARHOLMA — SANDHAMN — NYNÄSHAMN, Norrtälje hamn 08.30, Lidö 09.12 09.30;  — Under sommaren går det även båtturer från Stockholm med byte vid Fejan",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "31A RÄFSNÄS — TJOCKÖ — FEJAN, gäller 2 april–18 juni och 17 augusti–12 december 2026; turer som angör Lidö: Räfsnäs 07.55 → Lidö 08.05 (10 min), 10.05 → 10.15 (10 min), 09.45 → 10.00 (15 min), 17.35 → 17.50 (15 min); turen 06.40 angör inte Lidö (07.05 är Fejan); ingen bilfärja till ön",
      "last": "2026-09-19",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "31A RÄFSNÄS — TJOCKÖ — FEJAN, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, minst 1 timme innan avgång",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://lidovardshus.com/se-gra",
      "org": "lidovardshus.com",
      "vad": "Bastu & vedeldade badtunnor, Ett par hundra meter från värdshuset hittar ni vår bastu och två stycken badtunnor, alldeles i närheten av havet, Bokas senast dagen innan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/stockholm-archipelago-trail",
      "org": "lidovardshus.com",
      "vad": "Etappen är två havsnära loopar och en fram och tillbaka stig, Du har möjlighet att se en välbevarad Ryssugn, batteriet som är kvar sedan andra världskriget, Leden utgår från Ångbåtsbryggan och från Värdshuset",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/vrdshuset",
      "org": "lidovardshus.com",
      "vad": "Består av boende i tre byggnader och ligger närmast värdshuset, Här finns 16 rum med totalt 34 sängplatser;  — ligger fyra stugor med separat duschstuga, Alla stugorna har sjöutsikt;  — Glamping tält;  — Frukostbuffé ingår i allt vårt boende, Boende går att boka från midsommar till mitten av augusti, I våra stugor har man möjlighet att ha med sig husdjur mot en avgift;  — Boende & restaurang öppnar åter till midsommar 2027 den 25 juni",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/gsthamnen",
      "org": "lidovardshus.com",
      "vad": "Gästhamnen hittar ni på öns sydvästra sida, i Båthusviken, Här finns ett 50-tal båtplatser för stävförtöjning med ankare, Djupet ligger mellan 1,7–2,7 meter, I vår hamn kan man inte boka platser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/restaurangen",
      "org": "lidovardshus.com",
      "vad": "Vecka 28,29,30 & 31, Dagligen, frukost 08-30-10.00, Lunch från 12.00 och middag från 17.00;  — Boende går att boka från midsommar till mitten av augusti;  — Hit tar du dig med reguljär skärgårdsbåt från Räfsnäs året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/oasen",
      "org": "lidovardshus.com",
      "vad": "Vår framficka Oasen, som ni hittar vid gästhamnen, äta nygräddad pizza från vår egen pizzaugn, Här hittar ni även glass, På Oasen löser ni även hamnavgiften, hittar dusch/toalett samt kan hyra kajak och SUP, Här tar vi ingen bordsbokning utan drop in som gäller;  — Oasen, vår framficka vid gästhamnen 26 juni",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/lido/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Lidö passar lika bra för barnfamiljer som för paddlare, seglare och vandrare;  — Boende går att boka från midsommar till mitten av augusti;  — Vi har nu öppet för grupper, konferenser, fester och bröllop, Boende & restaurang öppnar åter till midsommar 2027 den 25 juni",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Den nuvarande herrgårdsliknande byggnaden uppfördes 1769 av Mattias Holmers, född på Simesgården på Arholma, Säteriet byggdes på grunden av ett stenhus, raserat av ryssarna 1719, ”Resare-Bengt” Oxenstierna och Otto Wilhelm Königsmark, general över Venedigs trupper vid belägringen av Aten 1687, Byggnaderna som utgör värdshus på exempelvis Lidö, Grinda och Utö, ägs av Skärgårdsstiftelsen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Lidö, Moderate 11.9 km.",
      "last": "2026-09-30",
      "myndighet": false
    }
  ],
  "graddo": [
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/bjorkooren/",
      "org": "Norrtälje kommun",
      "vad": "Badplatsen ligger vid Norrtäljeviken södra strand, väster om Gräddö, Beachvolleyplan: Ja, Brygga: Nej, Kiosk/kafé: Ja, Hund tillåtet: Nej, inte mellan 15 maj och 15 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h631.pdf",
      "org": "SL buss 631",
      "vad": "Norrtälje–Rådmansö–Norrtälje, Giltig 17 augusti–12 december 2026, Norrtälje busstation, Gräddö torg, Räfsnäs brygga . Räknat: Norrtälje busstation → Räfsnäs brygga må–fr 07.23–08.16, 12.28–13.13, 14.30–15.15, 15.49–16.28, 16.50–17.29, 17.57–18.36, 19.00–19.36, 21.15–22.05; lör 08.46–09.39, 12.40–13.17, 16.40–17.33, 21.21–22.09; sön 08.46–09.39, 21.21–22.09 = 36–53 min. «En av få platser … dit du kör bil hela vägen» saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 31A RÄFSNÄS — TJOCKÖ — FEJAN, Tjockö ångbåtsbrygga, minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00 . Räknat Räfsnäs → Fejan: 06.40–07.05, 07.55–08.35, 10.05–11.00, 15.20–15.50, 17.35–18.20, 19.40–20.35, lör/sön 09.45–10.50, lör 17.40–18.20, sön 15.35–16.10 = 25–65 min. «Hela vägen till Fejan på under timmen» stämde inte för helgmorgnarnas turer (65 min). «Räfsnäs, strax intill» saknade källa — Räfsnäs brygga ligger sex hållplatser efter Gräddö torg på buss 631.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://caravanclub.se/camping/bjorko-orn/",
      "org": "caravanclub.se",
      "vad": "Allmän Camping - Året runt, restaurang med fulla rättigheter som har öppet året om men endast på helger under vintersäsongen ;  — Bränsle kan tankas även under lågsäsong. ;  — GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . «April–Oktober» stämde inte: campingen, krogen och sjömacken har öppet året runt och linje 31 har tabell april–december.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://digitaltmuseum.org/021166009529/graddo-batvarv-varv",
      "org": "DigitaltMuseum",
      "vad": "Båtvarv som drevs av bröderna Ericksson från 1924. Sammanlagt har 54 båtar byggts vid varvet, varav 11-12 motorbåtar. Den sista båten byggdes 1965. . Tidigare källrad saknade URL; «lades ner» står inte i källan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.graddosjomack.se/",
      "org": "graddosjomack.se",
      "vad": "Här hittar du gästhamn med elplatser, drivmedel direkt vid bryggan samt tillgång till toalett och dusch, Bensin 98 oktan, Diesel (B0, blankdiesel), Latrintömning .  — havscamping, 9 stugor och tomter för tält, vedeldad bastu, restaurang med fulla rättigheter . Norrtälje kommun,  — sandstrand med cirka 85 meter strandlinje i norrläge, väster om Gräddö .  — På vår kajakbas på Gräddö har vi en välsorterad kajakbutik",
      "last": "2026-09-27",
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
      "url": "https://www.kajak-uteliv.com/",
      "org": "Kajak & Uteliv",
      "vad": "Vi utgår från våra två kajakbaser i Stockholms norra skärgård, Gräddö och Furusund, På vår kajakbas på Gräddö har vi en välsorterad kajakbutik ;  — Vi hyr ut havskajaker i olika storlekar, Stand Up paddlebrädor och kanadensare, här har vi verksamhet året runt för bokade uthyrningar och guidade turer och kurser ;  — Bokning är nödvändig minst 24 timmar innan avfärd. .  — kanoter och stand up paddle-boards för uthyrning . Tidigare källa visitskargarden.se ersatt med företagets egen sida.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kajak-uteliv.com/kajakbasen-graddo/",
      "org": "kajak-uteliv.com",
      "vad": "Bokning är nödvändig minst 24 timmar innan avfärd., Vi har några parkeringsplatser vi hyr ut till våra kunder som är ute över natten",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "vaddo": [
    {
      "url": "https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/vaddo-kanal.pdf",
      "org": "norrtalje.se",
      "vad": "Arbetet med att anlägga nuvarande Väddö kanal påbörjades år 1819, Under perioden 1820-1831 arbetade 2930 man från Hälsinge, Upplands, Värmlands och Västmanlands regementen med grävandet av Väddö kanal, Kanalen öppnades för trafik 1835, och 1840 invigdes den officiellt av Karl XIV Johan, omkring 22 000 passerande båtar per år, I anslutning till Älmstabron ligger tätorten Älmsta (eller Elmsta) som är Väddös största samhälle. Den större delen av Älmsta ligger på fastlandet . «Slussen vid Älmsta» saknar källa — kanalen beskrivs utan sluss av både kommunen och Destination Roslagen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL 676",
      "vad": "676 Stockholm–Norrtälje, Giltig 17 augusti–12 december 2026 (t.ex. Tekniska högskolan 09.50 → Norrtälje busstation 11.01); SL 637,  — 637 Norrtälje–Singö, Giltig 17 augusti–12 december 2026 (Norrtälje busstation 11.11 → Älmsta busstation 11.47) ;  — en halvtimmes bilfärd från Norrtälje . «ca 90 min med bil från Stockholm» saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL buss 637",
      "vad": "637 Norrtälje–Singö, Giltig 17 augusti–12 december 2026, Norrtälje busstation, Älmsta busstation, Grisslehamns färjeläge . Räknat: Norrtälje busstation → Älmsta 36–38 min; må–fr 22 turer (varav en natt mot lördag), lör/sön/helgdag 13.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.grisslehamnsmarina.se/",
      "org": "grisslehamnsmarina.se",
      "vad": "Öppet året runt ;  — 3 — 31 JULY 2027 ;  — Each summer dancers and jazz lovers from over 70 countries gather here ;  — Lördag, söndag och helgdag (13 turer mot 22 må–fr) . «Fullt boende i hela Väddöområdet» och «kanalens sluss är stängd» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.herrang.com/about/about-hdc",
      "org": "herrang.com",
      "vad": "HDC first saw the light of day in the summer of 1982, taking place in the small seaside village of Herräng in Sweden ;  — Folketshusvägen 5, 763 71 Herräng, Norrtälje kommun . «Herräng på östra Väddö» och «världens mest kända centrum» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.herrang.com/",
      "org": "herrang.com",
      "vad": "3 — 31 JULY 2027, Registration opens in December . «Herrängs Dansbana» är inte lägrets namn.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://roslagen.se/oar/vaddo-roslagens-storsta-o/",
      "org": "roslagen.se",
      "vad": "Du hittar minst ett 30-tal olika typer av restauranger, barer och kaféer på Väddö, golfbana, badplatser, restauranger, kanot- och cykeluthyrning, Från Grisslehamn går Eckerölinjens båtar till Eckerö på Åland, Från 1756 gick vägen över nuvarande Grisslehamn",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "asko": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/asko.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "Askö är länets första marina naturreservat., Här finns värdefulla undervattensängar av ålgräs och stora bälten av blåstång., Askölaboratoriet samordnar svensk marin forskning och miljöövervakning inom Östersjön och tar emot studenter och forskare från hela världen. Mycket av den kunskap vi idag har om Östersjön härstammar från Askölaboratoriet., tack vare det är undervattensmiljöerna väl dokumenterade",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://su.se/stockholms-universitets-ostersjocentrum/infrastruktur/ask%C3%B6laboratoriet",
      "org": "su.se",
      "vad": "Som första fältstation på svenska ostkusten, på ön Askö i Trosa-Landsorts skärgård, anlades Askölaboratoriet 1961 av professor Lars Silén, prefekt för zoologiska institutionen vid Stockholms universitet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.su.se/enheter/stockholms-universitets-ostersjocentrum/kalender/kalenderartiklar/2025-06-09-oppet-hus-vid-askolaboratoriet",
      "org": "su.se",
      "vad": "lördag 14 juni 2025, Arrangemanget vänder sig till allmänheten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trosa.com/asko-i-trosa-skargard/",
      "org": "trosa.com",
      "vad": "Området fungerar sedan 1970-talet som referensområde för miljöövervakning och har stor internationell betydelse.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trosa.com/skargardstrafik-i-trosa/",
      "org": "trosa.com",
      "vad": "Skärgårdstrafik trafikerar Trosa skärgård från 11 juni till 2 augusti + 6 till 9 augusti 2026., Trosa Gästhamn — Trosa Havsbad, 10:45 — 11:05 Kråmö — Askö, 11:05 — 11:30 Askö — Kråmö, 14:45 — 15:05 Kråmö — Askö, 15:05 — 15:30 Askö — Kråmö, Restid tur och retur ca 2 h för första och tredje turen.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "galo": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/galo/",
      "org": "haninge.se",
      "vad": "I närheten ligger även Stegsholms gård med café, bageri och försäljning av kött från gården. ;  — Helgöppet med start 1/5, Öppet Onsdag — Söndag 24/6 — 9/8 ;  — Området passar också för paddling, cykling, fiske och fågelskådning.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/",
      "org": "haninge.se",
      "vad": "Stort bad vid havet med lång strandremsa., Ja, och minigolfbana., Stor parkering., Gålö havsbad är inte ett kommunalt bad. ;  — finns en populär anläggning med camping, skärgårdskrog, äventyrsgolf och kajakuthyrning, Gålö är ett naturreservat som förvaltas av ;  — Storlek: 3834 hektar varav land 1756 hektar, Flera vandringsleder utgår från Skälåker och Stegsholm, Vid Nor på mellersta Gålö kan du se en fornborg och flera jättegrytor",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/galo.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Vandringsleden mot Havtornsudd från Skälåker går till stora delar längs stranden., Det är småskaligt med en mosaik av åkermarker, ekhagar, lundar och betade havsstrandängar, gärna längs stigen som börjar vid Stegsholms parkering",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v845.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Västerhaninge station–Gålö, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026, Tidtabellen är anpassad till pendeltåg från Stockholm vid . Lördag, söndag: Västerhaninge station 09.18 → Skälåker 09.42 och 11.18 → 11.43; måndag–fredag når bara 18.05-turen Skälåker (18.31). Sommartabellen 19/6–16/8 fanns inte som PDF.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station–Dalarö (–Smådalarö), Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; måndag–fredag Handens station 09.14 → Gålövägen 09.32 (18 min) .  — Alla bussar till Dalarö stannar vid Gålö handel, strax utanför reservatet i norr.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://galohavsbad.se/",
      "org": "galohavsbad.se",
      "vad": "Hyr kajaker, kanoter, trampbåtar, SUP m.m!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://galohavsbad.se/bo/camping/",
      "org": "galohavsbad.se",
      "vad": "För dig med husvagn, husbil eller tält, På campingområdet har du tillgång till tre servicehus, dom flesta har el 16A och vatten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://galohavsbad.se/bo/stugor/",
      "org": "galohavsbad.se",
      "vad": "Vi har stugor från 2-16 bäddar med varierande standard och olika prisklasser, Husdjur är självklart välkomna men då i ett urval av våra stugor. ;  — stugor som går att hyra veckovis från vår till höst",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://galohavsbad.se/ata/",
      "org": "galohavsbad.se",
      "vad": "Välkomna till vår charmiga Bistro, matbit, fika, smarriga smörgåsar, Minilivs, Camping för dig och din familj",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://galohavsbad.se/om-oss/kontakta-oss/",
      "org": "galohavsbad.se",
      "vad": "Som dagsbesökare får man endast parkera på den stora parkeringen., Man kan betala sin parkering via parkster, mobill eller via smsparkering.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/galo/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Gålö är ett lättillgängligt fastlandsområde på Södertörn där du enkelt kan kombinera bad, vandring och naturupplevelser året runt., Området passar också för paddling, cykling, fiske och fågelskådning.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stegsholmsgard.se/",
      "org": "stegsholmsgard.se",
      "vad": "vi finns på Gålö i Haninge som är en halvö i Stockholms södra skärgård ;  — Med bil från Nynäsvägen (väg 73), avfart mot Dalarö. Efter 10 km avfart mot Gålö. ;  — Endast 35 km söder om Stockholm",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "toro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oren.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Naturreservatet utgörs av tallhedar och stränder med klappersten; Ören är också en känd sträckfågellokal",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/surfa-och-paddla",
      "org": "nynashamn.se",
      "vad": "Torö Stenstrand är östkustens självklara surfstrand med en etablerad surfingkultur; Så fort vinden tillåter trivs här både vind-, våg- och kitesurfare, året om!",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/orens-naturreservat",
      "org": "nynashamn.se",
      "vad": "Ören består av en stor, flack isälvsavlagring och är en del av den mellansvenska israndzonen, som troligen bildades mellan 8900 och 8300 år före Kristus; När vågorna sköljde bort grus och sand blev de större stenarna kvar och bildade klapperstensfält; Vid stor vindstyrka blir vågorna flera meter höga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/toro",
      "org": "nynashamn.se",
      "vad": "Fortsätter du på vägen så långt det går, kommer du fram till Ankarudden; Här finns både sommaröppna restaurangen; Från Ankarudden på Torö avgår Waxholmsbolagets dagliga turbåt till Landsort",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/natur--aventyr/fiska",
      "org": "nynashamn.se",
      "vad": "Havsöring fiskas främst under vår och höst; på Torö stenstrand och Yxlöviken under mars-maj och oktober-november",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sjofartsverket.se/sv/tjanster/kanaler-slussar-broar/tottnasbron/",
      "org": "sjofartsverket.se",
      "vad": "1 juni - 31 augusti; Broöppning kan erhållas dagligen varje hel timme kl 0800 - 2000",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "852 Nynäshamns station–Torö; Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; Nynäshamns station 06.26 09.11 11.08; Ankarudden 07.05 09.51 11.49; Tidtabellen är anpassad till pendeltåg från Stockholm",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/om-oss/nyheter/lansnyheter/stockholm/20262/2026-04/vi-bygger-om-och-forbattrar-tottnasbron/",
      "org": "Trafikverket",
      "vad": "Tottnäsbron är en vridbro över Tottnässundet på väg 528 mellan Södertörn och Oxnö där vägtrafiken går i en riktning i taget; Mellan den 1 september till 31 december arbetar vi med installationer av teknisk utrustning på bron; hastigheten över bron att sänkas från 50 km/h till 30 km/h",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://arcadventure.se/kajakuthyrning-tor%C3%B6",
      "org": "arcadventure.se",
      "vad": "Kajak & SUP uthyrning med självbetjäning på Torö; Vår kajakuthyrning ligger på Ankarudden längst ut på Torö; Paddla till Landsort med sin kända fyr; Besök naturreservatet Järflotta",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://sjobodentoro.se/om-oss/",
      "org": "sjobodentoro.se",
      "vad": "På Sjöboden serverar vi en utvald A´ la Carte meny med inslag av svensk husmans; Sjöboden Torö med egen brygga; i väntan på Landsorts färjan smita in för en snabb öl eller en go fika",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://sjobodentoro.se/oppettider/",
      "org": "sjobodentoro.se",
      "vad": "Efter den 16 August har vi öppet på helgerna; Lördag den 12 September kl 11.00 till 22.00",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "fjardlang": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/besok-och-upplev-haninge/platser-att-besoka/fjardlang/",
      "org": "haninge.se",
      "vad": "Haninge kommun har sålt fastigheten Fjärdlång 1:18 till Seglarskolan Ungdomsförbundet Sveriges Flotta Östra Distriktet, Kommunfullmäktige fattade beslutet den 17 februari 2025. ;  — Vandrarhem och korttidsuthyrning på Fjärdlång, Vandrarhemet och stuguthyrningen är öppen under hela sommaren ;  — Camping finns i anslutning till vandrarhemmet ;  — Skärgårdsstiftelsen hyr ut det pittoreska torpet Norrötorpet som går att hyra veckovis från maj till september . «Vandrarhem, stuguthyrning och campingplats» stod utan källa och drivs inte längre av kommunen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/fjardlang.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Beslut och skötselplan Fjärdlångs naturreservat 1986, Storlek: 5 089 hektar, varav 557 hektar land, de stora öarna Fjärdlång, Ängsön-Marskär, Långholmen-Bockholmen och ett antal mindre öar, kobbar och skär, Förvaltare: Skärgårdsstiftelsen och USF-Ö Fastighet AB, I reservatet finns skogar som varit orörda länge, På Fjärdlång har delar av det gamla odlingslandskapet restaurerats och sköts genom betesdrift. Kobbar, skär och mellanliggande vatten är värdefulla för sjöfågel. . «Förvaltas av Skärgårdsstiftelsen» var ofullständigt, «öster om Dalarö» och «ett tag av … finaste» saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h839.pdf",
      "org": "SL buss 839",
      "vad": "Rudsjöterrassen–Dalarö (–Smådalarö), Giltig 17 augusti–12 december 2026, Haninge centrum, Tidtabellen är anpassad till pendeltåg från Stockholm vid",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget linje 19",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 19A STOCKHOLM — DALARÖ — ORNÖ (ÖSTRA SIDAN) — UTÖ, Dalarö avg., Fjärdlång, Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst . Räknat Dalarö avg. → Fjärdlång: ons 09.00–10.35, fre 12.00–13.22, 16.05–17.15, 19.00–20.10, lör 09.55–11.05, 13.55–15.00 (2/4–18/6), 14.45–15.45 (17/8–12/12), 17.10–18.00 (2/4–18/6), sön 10.40/10.55–11.45, 15.00–15.50 = 50 min–1 h 35 min; tis 09.00–10.35 bara 8/5–18/6 och 17/8–13/9. Fredag från Strömkajen 16.25 → Fjärdlång 20.10. Turerna ons 09.00, lör 17.10 (2/4–7/5), sön 10.40 och 15.00 (2/4–7/5 och 14/9–12/12) samt fre 19.00 (17/8–13/9) angör Fjärdlång bara efter beställning (b). Tidigare källrad pekade på v19.pdf; h19.pdf är den tabell Waxholmsbolaget länkar för perioden.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://orno.se/om-orno/orno-oar/fjallang/",
      "org": "orno.se",
      "vad": "på södra delen av Fjärdlång har det sedan 1940-talet funnits möjlighet till camping och stuguthyrning först i regi av Stockholms stads Fritidsförvaltning, Haninge kommun tog över verksamheten på 1980-talet och öppnade även vandrarhem i Thielska villan där Stockholms stad tidigare drivit seglarläger. Haninge kommun sålde sin verksamhet år 2025., Från och med sommaren 2026 kommer Ungdomsförbundet Sveriges Flotta som tidigare bedrivit Vitsgarn Seglarskola att flytta sin verksamhet till Fjärdlång. . Tidigare text om vandrarhemmets 32 bäddar och «en av få platser» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/fjardlang/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Fjärdlång nås med reguljär skärgårdstrafik från Stockholm under sommarsäsong ;  — En av dem leder dig upp till utkikspunkten Tysta Klint, 36 meter över havet. ;  — Stockholms Archipelago Trail sträcker sig över Fjärdlång med en etapp som är totalt 11,7 kilometer. . «En av södra skärgårdens bästa platser» var ett omdöme.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/boka-boende/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Stugan Norrötorpet är öppet under perioden 8 maj-20 september., torp på 33 kvm med ett rum, kök och sovloft, Här bor du enkelt utan el, med vatten i gårdspump, utedass och bastu vid egen brygga. Du tar med egen mat och hit kommer man med reguljär Waxholmsbåt eller med egen båt. ;  — går att hyra veckovis från maj till september",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vitsgarn.se/om-vitsgarn/fjardlang",
      "org": "vitsgarn.se",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "rindo": [
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h688.pdf",
      "org": "SL buss 688",
      "vad": "Vaxholm–Rindö, Giltig 17 augusti–12 december 2026, Västerhamnsplan, Rindö smedja, Oskar-Fredriksborg . Räknat: Rindö smedja → Oskar-Fredriksborg 10–12 min, 29 turer må–fr och 23 lör–sön; några turer startar vid Västerhamnsplan i Vaxholm.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/",
      "org": "Trafikverket",
      "vad": "Färjeledens längd är 970 meter och överfartstiden är sex minuter. ;  — Färjeledens längd är 500 meter och överfartstiden är tre minuter. ;  — GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 4A STOCKHOLM — VAXHOLM — RAMSÖSUND — ÅLSTÄKET, Rindö västra, Vegabryggan (Rindö), Grenadjärbryggan (Rindö) ;  — Vaxholm–Rindö, Västerhamnsplan, Rindö smedja, Oskar-Fredriksborg ;  — Rindö Hamn erbjuder 13 gästhamnsplatser, Vid gästhamnen ligger restaurang Syrran & Jag",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/download/18.5dda784b16d6ccd6b031b3c8/1569999167884/Kulturmiljoinventering_av_fd_Kustartilleriregemente_KA_1_vid_Oscar-Fredriksborg_pa_Rindo_2007.pdf",
      "org": "vaxholm.se",
      "vad": "byggnaderna stod klara 1906 efter Erik Josephsons typritningar för infanteriet, merparten av bebyggelsen från 1906 - 07 finns kvar ;  — omvandling av området till en levande skärgårdsmiljö med bostäder, verksamheter och skola ;  — 1987 fick områdena runt Rindö Redutt och Oskar Fredriksborg status av Riksintresse för kulturmiljön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/download/18.5dda784b16d6ccd6b031b3c7/1569999166864/Kulturhistoriska_miljoer_pa_Rindo_2004.pdf",
      "org": "vaxholm.se",
      "vad": "1839-1863 byggdes Rindö redutt på den västra delen av ön., anläggningarna är klassade som byggnadsminne, Rindö Redutt sedan 1935 . «Stigar längs öns klippkust» saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h4.pdf",
      "org": "Waxholmsbolaget linje 4",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, 4A STOCKHOLM — VAXHOLM — RAMSÖSUND — ÅLSTÄKET, Rindö västra, Vegabryggan (Rindö), Grenadjärbryggan (Rindö), Vaxholm avg. . Räknat: Vaxholm avg. → Rindö västra 05.45–05.47, 06.24–06.27, 08.52–08.54, 12.15–12.18 = 2–3 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://rindohamn.se/",
      "org": "rindohamn.se",
      "vad": "Rindö Hamn erbjuder 13 gästhamnsplatser som är bokningsbara genom Dockspot, man kan även droppa in och betala om platsen inte redan är bokad via Dockspot, finns någon plats upp till 12 meters längd, Utanför hamnen finns en kaj där större båtar kan långsidesförtöja. . «Liten gästbrygga med begränsat antal platser» var oprecist.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/oscar-fredriksborgs-fastning/",
      "org": "stockholmslansmuseum.se",
      "vad": "Oskar-Fredriksborgs fästning byggdes på östra Rindö 1870-1877 för att ersätta Vaxholms kastell, Fästningen består av ett övre och ett nedre verk förbundna med en i berget utsprängd förbindelsetunnel., Oscar-Fredriksborgs fästning är ett statligt byggnadsminne och ägs av Statens fastighetsverk. Ibland ordnas visningar av både fästningen och kraftstationen via Vaxholms fästnings museum. . «Sent 1800-tal/tidigt 1900-tal» var oprecist.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://upplevvaxholm.se/mat-och-dryck/",
      "org": "upplevvaxholm.se",
      "vad": "",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://www.vaxholmsfastning.se/",
      "org": "vaxholmsfastning.se",
      "vad": "Vaxholms Fästnings Museum, Vaxholms Kastell, Här får du följa skärgårdsförsvarets 500-åriga historia, endast öppet i samband med särskilda evenemang och lovaktiviteter . «Vaxholmen-sidan» var oklart — museet ligger på Vaxholms kastell.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "yxlan": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Bad/badplats, Fiske, Torrdass, Tältplats, På ön Själbottna har landhöjningen förvandlat havsvikar till vackra strandängar., tälta mer än två dygn i följd på samma plats, medföra hund som inte är kopplad, göra upp öppen eld ;  — Själbottna 11.00, Vagnsunda (Yxlan) 11.01",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård. Färjeledens längd är 600 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri. ;  — Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård. Färjeledens längd är 530 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri. ;  — Parking on Yxlan can be tricky and even hazardous. You can not park in the small housing communities. ;  — Giltig 17 augusti–12 december 2026, Norrtälje busstation 09.14 14.36 16.43 18.44, Vagnsunda 10.29 16.00 18.00 19.59b, Fortsätter efter Köpmanholms skola endast om resenärer . Restid Norrtälje–Vagnsunda 1 h 15 min (09.14 → 10.29) till 1 h 24 min (14.36 → 16.00).  — Strömkajen (Stockholm) 08.45, Vagnsunda (Yxlan) 11.01, Kolsvik (Yxlan) 13.02, utan fast avgångstid, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026, Strömkajen (Stockholm) 08.45, Vagnsunda (Yxlan) 11.01 11.21 11.01, Kolsvik (Yxlan) 13.02 13.45, utan fast avgångstid, Går under perioden 2 april - 18 juni. . Utåt (24A) har Vagnsunda fast tid och övriga Yxlanbryggor X; hemåt (24B) har Kolsvik fast tid och Vagnsunda X. Yxlö och Köpmanholm finns bara på söndagsturerna märkta I (2 april–18 juni). Strömkajen 08.45 → Vagnsunda 11.01 = 2 h 16 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://roslagen.se/oar/yxlan/",
      "org": "roslagen.se",
      "vad": "",
      "last": "2026-09-28",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Yxlan, 24 km ;  — The Yxlan hike is best started from the ferry terminal in Köpmanholm, On Yxlan, the trail is not physically marked. ;  — skyddat sedan: 1977, Förvaltare: Skärgårdsstiftelsen, Njut av blankslipade klippor och mäktig utsikt., bra tältplats, De strövvänliga skogarna är rika på bär och svamp., Till Själbottna går reguljär Waxholmsbåt sommartid. ;  — Själbottna 11.00 11.20 11.00, Vagnsunda (Yxlan) 11.01 11.21 11.01",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/section-yxlan/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "offering a 24 km hike close to the sea, The lake Träsket, the lighthouse and Stortallen, an old pine tree are all worth a visit in their own right., it follows the local printed tourist map, Plan your hike based on when you can catch the bus back from the furthest southern point you reach.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "kymmendo": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/kymmendo/",
      "org": "haninge.se",
      "vad": "August Strindberg bodde här flera somrar och lät romanen Hemsöborna utspela sig på ön. Kymmendö är privatägd och har funnits i samma släkt sedan 1802., Kymmendö är ett levande jordbruk med hästar och får som betar i hagarna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station 06.14 07.14 07.44 08.14 09.14, Hotellbryggan 05.46 06.50 07.50 08.23 08.50 09.51, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://sok.riksarkivet.se/sbl/Presentation.aspx?id=34518&forceOrdinarySite=true",
      "org": "sok.riksarkivet.se",
      "vad": "Vid denna tid skrev S också vad som skulle bli hans mest populära roman, Hemsöborna (1887).",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, Strömkajen (Stockholm) 16.25 16.25, Dalarö avg. 07.00 16.35 09.00 09.00 12.00 16.05 19.00 19.00 09.55 13.55 14.45 17.10 17.10 10.40 10.55 15.00 15.00, Kymmendö 07.12a 16.50 09.45b 09.45b 12.25 16.22 19.15 19.15 10.12 14.10 15.00 17.25 17.25 11.10b 11.10b 15.15b 15.15b",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/kymmendo",
      "org": "explorearchipelago.com",
      "vad": "På sommaren sjuder ön av liv för att på hösten slå över till ett lite lugnare tempo.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kymendo.se/oppettider/",
      "org": "kymendo.se",
      "vad": "AFFÄREN & BENSINSTATIONEN 2026, 1 Maj - 14 Juni, 22 Aug - 27 Sept",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kymendo.se/battaxi/",
      "org": "kymendo.se",
      "vad": "Vi har en småbåtstaxi som tar 9 personer.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kymendo.se/restaurang-bar/",
      "org": "kymendo.se",
      "vad": "Restaurangen & Baren ligger mitt i Kymendö sund alldeles intill Waxholmsbryggan, bensinstationen & affären., Krogen har fullständiga rättigheter och även en Bar i Kymendö paviljongen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/kymendo-historia/",
      "org": "ny.kymendo.com",
      "vad": "Här på Kymendö bodde August Strindberg under sju somrar i slutet av 1800-talet, Hemsöbornas huvudpersoner, … Susanna Elisabet Berg och sonen … Albert Berg, är släktingar till de nuvarande öborna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/upplev/",
      "org": "ny.kymendo.com",
      "vad": "Den ena på Kymendös västra udde Persholmen mot Jungfrufjärden och den andra Kymendö sunds södra inlopp vid Rävskärsudd, Maren. Välj vilken som är bäst beroende på vinden, Ett fåtal gästplatser för övernattning finns vid bensinstationen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/strindberg/",
      "org": "ny.kymendo.com",
      "vad": "August Strindberg byggde sin skrivarstuga med hjälp av en pojke från Gården.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/guidning/",
      "org": "ny.kymendo.com",
      "vad": "Du kan beställa en guidad tur där du kan få höra mer om Strindberg som sommargäst på Kymendö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/hitta_hit/",
      "org": "ny.kymendo.com",
      "vad": "tar du Waxholmsbåten från Dalarö Hotellbryggan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/affaren/",
      "org": "ny.kymendo.com",
      "vad": "Livsmedelsbutiken ligger mitt i Kymendösund, alldeles intill Waxholmsbolagets brygga, Kymendö Service HB driver affären på ön och den är öppen på sommarhalvåret.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ny.kymendo.com/kymendo/",
      "org": "ny.kymendo.com",
      "vad": "Djuren betar över hela ön så håll hundarna kopplade. Stäng de grindar ni öppnar och elda inte öppna eldar pga av bränder kan uppkomma, det tar lång tid innan vi kan få ut brandkåren hit.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "bullero": [
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031975",
      "org": "geodata.naturvardsverket.se",
      "vad": "Särskilt under högsäsongen, som sträcker sig från midsommar till mitten av augusti, ligger båtarna tätt. Under för- och eftersäsong är sannolikheten större att kunna ha en plats för sig själv. ;  — fågelliv är rikt, framför allt under våren ;  — Bullerölinjen från maj till en bit in i oktober ;  — gästhemmet öppet för bokning mellan den 1 maj–2 november ;  — Det finns ingen matservering eller butik i nationalparken. . Stod «alltid lugnt» — obelagt.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "en varm raststuga och vedeldad bastu som är öppna året om. På ön finns vandringsleder av olika svårighetsgrad, en informationsplats, en badstrand, en tältplats och ett litet museum i konstnären Bruno Liljefors före detta jaktstuga. Delar av ön är tillgänglighetsanpassade så att det går att ta sig runt med rullstol, barnvagn eller rullator",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark",
      "org": "Sveriges Nationalparker",
      "vad": "Nämdöskärgårdens nationalpark är Sveriges första marina nationalpark i Östersjön i Stockholms skärgård. Nationalparkens yta är uppdelad på ett tusental öar, kobbar och skär. Huvudentrén finns på ön Bullerö.; 97 procent av nationalparkens yta är hav. ;  — Nämdöskärgården blir Sveriges 31:a nationalpark (nyhet 2025-06-23) . Stod «den första marina nationalparken i Östersjön» — källan säger Sveriges första.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "aktiviteterna \"Bastun på Bullerö\", \"Bullerö runt\", \"Fågelskådning\" och sevärdheten \"Jaktstugan\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/sevardheter/jaktstugan",
      "org": "Sveriges Nationalparker",
      "vad": "På Bullerö, vid Rävängen, hittar du konstnären Bruno Liljefors före detta jaktstuga. I jaktstugan finns en utställning om Nämdöskärgårdens nationalpark, om förutsättningarna för Östersjön och om djurlivet ovan och under ytan. ;  — Liljefors lät år 1909 bygga den jaktstuga som än idag står kvar på Bullerö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bastun-pa-bullero",
      "org": "Sveriges Nationalparker",
      "vad": "Bastun är öppen för alla och går inte att boka.; I närheten av båtbryggan och byn på Bullerö finns en bastu som är öppen för allmänheten.; Ved finns invid bastun. Här finns också en badstege om du vill ta ett dopp i havet.; Det är inte tillåtet att förtöja båtar, SUP-brädor eller liknande vid bastuns brygga.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/brunos-slinga",
      "org": "Sveriges Nationalparker",
      "vad": "Brunos slinga är en kort men kuperad vandringsled där du får smakprov på hur det var att leva på ön förr.; Längd: 0,9 kilometer",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/bullero-runt",
      "org": "Sveriges Nationalparker",
      "vad": "Leden tar dig runt Bullerön och följer i stort sett kustlinjen.; Längd: 3 kilometer; Terrängen är kuperad och det kan vara halt.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/sevardheter/utsikt-fran-bullero",
      "org": "Sveriges Nationalparker",
      "vad": "På Bullerö finns flera iordninggjorda utkiksplatser att besöka. Ormbranten, Kikarberget och Dromudden",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/att-gora-i-parken/aktiviteter/fagelskadning",
      "org": "Sveriges Nationalparker",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/overnatta-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "På nationalparkens huvudö Bullerö finns Gästhemmet som består av Parstugan och Sjögrenska villan. Parstugan har egen ingång, eget kök och fem bäddar.; Gästhemmet är öppet för bokning mellan den 1 maj–2 november.; Bokning av Gästhemmet på Bullerö och torpen på öarna hanteras av By Nordiq.; På Bullerö finns en anvisad plats för tältning — tältängen. Det kostar ingenting att tälta där; servicehus med dricksvatten, toalett och dusch, grill och utekök ;  — tält högst sju dygn i följd på samma plats inom område markerat på karta i bilaga 3:5 . Stod tomt trots att gästhem finns.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Du kan resa med Bullerölinjen till nationalparkens huvudentré på Bullerö från maj till en bit in i oktober.; Stavsnäs båttaxi driver turlinjerna.; Buss 434 går från Slussen i centrala Stockholm hela vägen fram till hamnen. ;  — period 17/8 - 11/10; Stavsnäs 10:50 → Bullerö 11:20; Samtliga avgångar måste förbokas! ;  — trafikerar vi på uppdrag av Länsstyrelsen . Den tidigare källan bullero.se gick inte att nå (anslutningen bröts 2026-09-27).",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/ata-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Det finns ingen matservering eller butik i nationalparken. ;  — Samtliga avgångar måste förbokas!",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://battaxi.se/ws/media-library/7b372fb2cec21735246ff04363d12e1f/bullerolinjen-tidtabell-ht-26-inkl-5-sept.pdf",
      "org": "battaxi.se",
      "vad": "Bullerölinjen höst 2026 period \"17/8 - 11/10\": Stavsnäs 10:50 → Bullerö 11:20, 14:30 → 15:00, 15:30 → 16:00 (30 min); \"Samtliga avgångar måste förbokas!\" ;  — \"Du kan resa med Bullerölinjen till nationalparkens huvudentré på Bullerö från maj till en bit in i oktober.\" ;  — \"en varm raststuga och vedeldad bastu som är öppna året om\" . Stod «3–4 h med segelbåt från Stavsnäs» (obelagt) och «Maj–september».",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/bullero",
      "org": "explorearchipelago.com",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "vindo": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3748572/1732515661464/Landsbygdsutveckling%20p%C3%A5%20Djur%C3%B6%20genom%20projektet%20Bygd%20f%C3%B6r%20Bygd.pdf",
      "org": "Länsstyrelsen",
      "vad": "På Vindö bor omkring 400 personer permanent, Norrut på Vindö finns utspridda villaområden och ett stort antal fritidshus, Särskilt hög koncentration av områden med stor betydelse för den biologiska mångfalden finns på Djurö och Vindö, stora sammanhängande barrskogsområden;  — liksom Djurö och Vindö bebyggts med stora fritidshusområden",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "434 Slussen–Överby, Giltig 17 augusti–12 december 2026, Vindö skola, Sollenkroka brygga 07.12 … 08.16 09.00 09.59 10.59, Överby brygga 07.24 08.29 10.13 12.02 14.09 14.48, Endast vissa turer  — Slussen–Sollenkroka brygga 64–78 min, Slussen–Överby brygga 71–87 min (alla dagtyper). Tidigare källa v433_434.pdf finns inte längre.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 14 december 2025–18 juni 2026;  — Giltig 19 juni–16 augusti 2026;  — Giltig 17 augusti–12 december 2026;  — Öppettider 2026, 1 Maj - 31 Maj, 8 Juni - 9 Aug., 10 Aug.- 27 Sept.;  — Från Sollenkroka Brygga går båttrafik till bland annat Norra och Södra Stavsudda samt Möja",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/sollenkrokabrygga.4.1524f1c618a8d1d9fee45d62.html",
      "org": "varmdo.se",
      "vad": "Följ väg 222 från Stockholm mot Stavsnäs, Där vägen delar sig vid Djuröbron, följ Sollenkrokavägen till Sollenkroka Brygga, Avstånd från Stockholm (Slussen) 50 km, Här finns 400 parkeringsplatser för kort och lång tid;  — Mellan Stockholms innerstad och Djurö tar resan 40–50 minuter med bil, buss eller skärgårdsbåt, Mellan Djurö och Vindö tar resan 14 minuter med bil",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.79379661188ba20c6714e030/1688990516415/25%20ha%CC%88rliga%20utflyktsma%CC%8Al-1.rev%20230710.pdf",
      "org": "varmdo.se",
      "vad": "Med cykel tar du dig fortare fram, Skarpö är en smal halvö och från, grusvägen är det aldrig långt till vattnet;  — Mellan Djurö och Vindö tar resan 14 minuter med bil och 28 minuter för den som cyklar, Sträckan mellan Strömma och Djuröbron saknar belyst gång- och cykelväg",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo.4.18c983316e0536cb189a176.html",
      "org": "varmdo.se",
      "vad": "Vita grindarna, Djurö Havsbad;  — Bad i anslutning till en campingplats med sandstrand och gräsytor vid Bruksfladen i Djurhamn på Djurö  — kommunens badplatslista har ingen badplats på Vindö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/kommunochpolitik/kartorochkommunfakta/historia.4.3251048d16e2a7e784837027.html",
      "org": "varmdo.se",
      "vad": "Värmdö finns skriftligt omnämnt första gången 1314, Troligen har namnet ett samband med Vindö ström, som var en av de viktigaste farlederna i äldre tider, Vindö ström var känd för att ligga öppen utan is länge vintertid, vilket ordet värmd skulle kunna syfta på",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://alstensmacken.com/sollenkroka-marina",
      "org": "alstensmacken.com",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/",
      "org": "djuronaset.com",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "smaadalaro": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/utomhusaktiviteter/",
      "org": "haninge.se",
      "vad": "Smådalarö golf, 9-hålsbana i skärgårdsmiljö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station–Dalarö (–Smådalarö), 1) Endast vissa turer., Tidtabellen är anpassad till pendeltåg från Stockholm vid, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026  — 14 ankomster till Smådalarö måndag–fredag och 9 lördag–söndag i tabellen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "STOCKHOLM — DALARÖ — ORNÖ (ÖSTRA SIDAN) — UTÖ, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/om-oss/var-historia/",
      "org": "smadalarogard.se",
      "vad": "Grunden till den stora rörelsen på Smådalarö Gård lades av löjtnanten Carl Christian Gyldener, som tillsammans med tullinspektören Nils Sondell arrenderade halva Smådalarö i 20 år, tillsammans startade herrarna produktion av både öl och brännvin, därför fick han 1750 ett eget arrendekontrakt på livstid, År 1802 förvärvade Blom, endast 40 år gammal, den stora egendomen ”Tyresö skärgårdsdel” från grevinnan Brita Bonde för 12.000 riksdaler banco, Kofferdikaptenen Carl Peter Blom, som stod färdigt år 1810",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/kontakt-hitta-hit/",
      "org": "smadalarogard.se",
      "vad": "Smådalarö Gård Hotell & Spa ligger idylliskt i Hemviken i Stockholms skärgård, Med bil når du Smådalarö Gård Hotell & Spa på 50 min från Stockholm city, som går från Haninge Centrum hela vägen till vår grind",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/om-oss/",
      "org": "smadalarogard.se",
      "vad": "Sedan 2011 ägs och drivs hotellet av det familjeägda företaget, och sommaren 2021 nylanserades Smådalarö Gård, 110 Hotellrum inkl. Kapten Bloms Svit, 2000 kvm spa, ute & inne, 10 Event- och möteslokaler, 2 Restauranger & 2 barer, 2 Padelbanor & 2 Tennisbanor, 9-håls Golfbana, Haninge arkitekturpris 2022",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/spa/dagspa/",
      "org": "smadalarogard.se",
      "vad": "I dagspa ingår entré till vårt spa inklusive gym under en slottid på 3 timmar, Det är möjligt att boka entré för upp till 10 personer direkt via vår",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/aktiviteter/se-gora/",
      "org": "smadalarogard.se",
      "vad": "Förutom vår egna brygga där du kan njuta av ett svalkande dopp i Hemviken, Schweizerbadets barnvänliga sandstrand och härliga klippor på Gålö havsbad ;  — Schweizerbadet på Dalarö ;  — Hyr vår lilla eller stora bastu med egen brygga, under sommarmånaderna erbjuder vi aktiviteter som att paddla kajak eller SUP ;  — Hyr vedeldad bastu",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/spa/",
      "org": "smadalarogard.se",
      "vad": "Smådalarö Spa är 2000 kvm stort, 4 pooler, 2 inne & 2 ute, 3 olika bastur - ångbastu, torrbastu & ett sanarium, infinity-poolen som sträcker ut sig mot Hemviken, Spabehandlingar signerat Kerstin Florian ;  — behöver du inte vara en övernattande gäst",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/restauranger/",
      "org": "smadalarogard.se",
      "vad": "Här serveras mat från morgon till kväll, specialkomponerad drinkmeny inspirerad av Kapten Bloms resor runt världen, Här frossar du i utvalda viner från hela världen och goda ostar, sallader samt glass, godis och noga utvalda matvaror",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/vara-rum/",
      "org": "smadalarogard.se",
      "vad": "erbjuder 110 unika hotellrum och sviter, belägna ovanför Bloms Bar i hjärtat av hotellet, familjerum och superiorrum till exklusiva hotellsviter ;  — Sedan 2011 ägs och drivs hotellet av det familjeägda företaget, 2000 kvm spa, ute & inne",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/gasthamn/",
      "org": "smadalarogard.se",
      "vad": "Här finns 30 gästplatser vid bryggan, Priserna inkluderar el, sopstation samt elbastu och tvättstuga, vattnet mellan Rosenön och Smådalarö har ett djup på 2.46 meter, åk därför mitt i sundet, Inseglingsvägen är i kanalen mellan Söderviken och Hemviken eller under Rosenöns bro, Förboka din plats i gästhamnen via ;  — Vi har bussförbindelse (buss 839) i anslutning till hotellet. ;  — I hamnen kan du tanka båten (om Dalarö)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/restauranger/brasserie-branneri/",
      "org": "smadalarogard.se",
      "vad": "Här serveras mat från morgon till kväll, Vi använder oss av säsongens råvaror och hämtar många av dessa från närliggande gårdar, Ät frukost, lunch eller sen middag, slå dig ner vid ett bord ute på terrassen med utsikt över Hemviken ;  — specialkomponerad drinkmeny inspirerad av Kapten Bloms resor runt världen, klassiker som Toast Skagen och Caesarsallad",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "morko": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/slessberget.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Slessbergets naturreservat ligger på södra Mörkö, 4 kilometer söder om Mörkö kyrka., En liten skogsstig tar dig till fornborgen och utsiktspunkten., utsikten över Kålsöfjärden och Mörkö är magnifik, På grund av granbarkborreangrepp underhåller vi inte stigar och leder just nu.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/erikso.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Längs bägge sidor av ön finns vackra, betade strandängar och sköna badklippor. Slingrande grusvägar och ett myller av skogsstigar gör det lätt att upptäcka Eriksö till fots eller på cykel., Promenera till Grönvik med en enkel grillplats",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalkberget.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Berget, som till stor del består av urbergskalksten, är cirka 1,2 kilometer långt. I nordöstra änden av berget finns ett gammalt övergivet kalkbrott., ovanligt artrik och för trakten unik flora och fauna",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/kalso.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Kålsö är en vacker halvö som tidigare varit en fristående ö. Här finns fin skog, hagar och strandängar., Under våren är fågelsången stark och fylld med liv., Har du tur kan du också se en havsörn",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v727.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Tumba station 05.26 06.10 08.18 10.48 12.48, Skanssundet 06.03 06.50 08.58 11.30 13.29, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sodertalje.se/kommun-och-politik/om-kommunen/sodertaljes-kommundelar/holo-morko/se-och-gora-i-holo-morko/",
      "org": "sodertalje.se",
      "vad": "På Mörkö ligger Skansholmens skärgårdskrog med gästhamn och camping. På ön finns även Idala lanthandel som har både café och konstutställningar.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sodertalje.se/kommun-och-politik/om-kommunen/sodertaljes-kommundelar/holo-morko/",
      "org": "sodertalje.se",
      "vad": "Kommundelen utgörs av Hölö tätort samt öarna Mörkö och Oaxen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sodertalje.se/contentassets/801b52a57aed44f592a5d6bf3ff8bb96/1-morko.pdf",
      "org": "sodertalje.se",
      "vad": "Mörkö har förbindelse med fastlandet via en bro vid Kasholmsundet på öns västra del och via en färjelinje från Skanssundet på östra sidan till Grödinge. Oaxen mellan Mörkö och Grödinge nås via en färjeförbindelse från Söräng på Mörkös östra sida., År 1912 byggdes en öppningsbar bro vid Kasholmen och färjelinjen vid Pålsundet lades ned. Nuvarande bro är från år 1972.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/skanssundsleden/",
      "org": "Trafikverket",
      "vad": "Skanssundsleden går mellan Hörningsnäs på Södertörn och Mörkö. Färjeledens längd är 330 meter lång och överfartstiden är tre minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://holomorkohbf.se/hbf/?page_id=144",
      "org": "holomorkohbf.se",
      "vad": "Mörkö socken omfattar den nästan 2½ mil långa ön Mörkö längs sjöfartsleden in mot Södertälje, I norr ser vi öppen jordbruksbygd, uppbruten av bergknallar och partier med barrträdsdominerad blandskog. Södra delen av ön är en mera typisk skärgårdsnatur med djupa vikar, höjdryggar och smala tegar med brukad jord., Huvuddelen av Mörkö ägs av Hörningsholms Godsförvaltning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.idala.nu/",
      "org": "idala.nu",
      "vad": "Idala cafe och lanthandel, konserter på trädgårdsscenen, Adress: Idala 3, 153 93 Mörkö ; sidan senast ändrad 29 augusti 2026 enligt servern.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skansholmen.com/gasthamn/",
      "org": "skansholmen.com",
      "vad": "Över 100 gästplatser med el och färskvatten., öppen dygnet runt, året om, kortautomat, Sugtömning och septiktankstömningsstation, Toaletter, duschar, soprum, litet gästkök samt bastu och tvättstuga som kan hyras, Naturnära och skyddat läge vid Skanssundets färjeläge på Mörkö, för båtar upp till 52 fot",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skansholmen.com/boende/",
      "org": "skansholmen.com",
      "vad": "Mysiga små stugor med plats för upp till 3 personer, Vandrarhem med delade utrymmen, Camping för husbil eller husvagn, med elplatser och servicehus, Camping i tält, med elplatser och servicehus, Tältplatsen erbjuder en naturnära upplevelse med sjöutsikt, öppet året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skansholmen.com/hitta-hit/",
      "org": "skansholmen.com",
      "vad": "Från Stockholm åker ni E4:an mot Helsingborg och svänger av mot Hölö.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skansholmen.com/",
      "org": "skansholmen.com",
      "vad": "På Skansholmen väljer du mellan Bistrons luftiga terrass med vy över fjärden och Skanssundet eller Sjökrogen vid marinan., Vår glassbuffé är ett måste för hela familjen!",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "musko": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/musko/",
      "org": "haninge.se",
      "vad": "Med bil tar resan ungefär 1 timme från Stockholm via Muskötunneln. ;  — Ösmo centrum–Muskö, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026 (buss året runt; lördag Ösmo centrum 10.04 → Hyttan 10.43) ;  — Grytholmens friluftsmuseum har öppet under sommaren. ;  — I Arbottna hittar du våtmarken Maren som är ett paradis för fåglar.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/siteassets/uppleva-och-gora/sevardheter-och-besoksmal/musko-kulturmiljoer-rapport.pdf",
      "org": "haninge.se",
      "vad": "in i Djupskåraberget på sydvästra delen av ön, arbetet med att spränga ut anläggningen hade dock inletts redan 1950, invigdes 1969, efter att 1,5 miljoner kubikmeter berg sprängts ut, täcker en yta stor som Monte Carlo, med ett vägsystem på cirka två mil ;  — I mars 1964 öppnades tunneln för allmän trafik., ligger cirka 65 meter under vattenytan",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v849.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Ösmo centrum–Muskö, Tidtabellen är anpassad till pendeltåg från Stockholm, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026 . Restid räknad ur tabellen: lördag Ösmo station 10.07 → Hyttan 10.43 (36 min), lördag Ösmo centrum 10.04 → Hyttan 10.43 (39 min), måndag–fredag Ösmo centrum 13.53 → Hyttan 14.36 (43 min). Sommartabellen 19/6–16/8 fanns inte som PDF.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/om-oss/nyheter/lansnyheter/stockholm/2025/2025-09/arbeten-i-muskotunneln-nattetid/",
      "org": "Trafikverket",
      "vad": "Muskötunneln är 2 910 meter lång och ligger cirka 65 meter under vattenytan. Den fria höjden är 3,9 meter i den dubbelriktade tunneln., I mars 1964 öppnades tunneln för allmän trafik., Tunneln stängs cirka sex nätter per år för planerat underhållsarbete ;  — Kör mot Muskötunneln, skyltat från väg 73.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/musko",
      "org": "explorearchipelago.com",
      "vad": "Muskö ligger söder om Haninge i Stockholms södra skärgård. Det är ett lättillgängligt resmål som nås via en vägtunnel ;  — Bussar trafikerar Muskö med anslutning till pendeltågen i Ösmo. ;  — flera sommarstugeområden etablerade under 1940-talet och framåt (Haninge kommun, kulturmiljöinventering 2015)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://mickrumsbrygga.se/hitta-hit",
      "org": "mickrumsbrygga.se",
      "vad": "Anlöp vid Mickrums brygga i Norrviken. Plats för gästbåtar., Parkering finns vid bryggan. ;  — Mickrums brygga (hållplats på linje 849)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://mickrumsbrygga.se/",
      "org": "mickrumsbrygga.se",
      "vad": "Italienska smaker, svenska råvaror. Dagens fångst, och citron från södern., DJ:s på terrassen, saxofon vid solnedgången, Stängt för säsongen. Tack för i sommar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/grytholmens-friluftsmuseum/",
      "org": "stockholmslansmuseum.se",
      "vad": "Grytholmens friluftsmuseum på Muskö visar ett bevarat torp från 1800-talet, Grytholmens friluftsmuseum har öppet under sommaren. För öppettider och bokning av visning se Muskö hembygdsförenings hemsida ;  — Grytholmen har ett sevärt friluftsmuseum med torp, smedja, sjöbod, båtar och undantagsstuga. Varje sommar arrangeras Grytholmsdagen",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "bjorko": [
    {
      "url": "https://historiska.se/birka/vad-ar-birka-hovgarden/birka-varldsarvet/",
      "org": "historiska.se",
      "vad": "Historiska museet i Stockholm har mer än 100 000 fynd från Birka",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bjorko.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Reservatet, som inte är större än 1,6 hektar, ligger på Björkö i Mälaren. I området växer gammal barrskog.; Många av träden är äldre än 200 år.; ha okopplad hund, katt eller annat husdjur; elda",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/birka-och-hovgarden/",
      "org": "raa.se",
      "vad": "Tack vare skriftliga källor vet vi att Ansgar, en ung benediktinermunk, kom till Birka år 830; Här predikade han under ett och ett halvt år",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/app/uploads/2023/06/Beslut-Adels%C3%B6-Bj%C3%B6rk%C3%B6-Birka-AB21-RA%C3%84-2021-1675.pdf",
      "org": "raa.se",
      "vad": "omgärdat av fornborgen på Borgberget i söder och stadsvallen i nordöst; ett av landets största gravfält med minst 1600 … gravar (PDF)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/adelsoleden/",
      "org": "Trafikverket",
      "vad": "Adelsöleden går mellan Munsö och Adelsö på Mälaröarna. Färjeledens längd är 1 000 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.birkavikingastaden.se/om-birka/",
      "org": "birkavikingastaden.se",
      "vad": "Fornlämningsområdet Birka på Björkö och Hovgården på Adelsö utgör tillsammans ett av Sveriges 15 världsarv. Området blev upptaget på Unescos världsarvslista år 1993.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/resa-hit/",
      "org": "birkavikingastaden.se",
      "vad": "Båten går från centrala Stockholm (Klara Mälarstrand) och stannar vid bryggorna Nya Kungshatt, Vårby brygga, Jungfrusund och Hovgården (Adelsö).; för att garantera din plats ombord på båten rekommenderar vi att du förbokar din biljett",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/hitta-pa-birka/",
      "org": "birkavikingastaden.se",
      "vad": "Han brukar kallas för Nordens apostel eftersom det var han som tog hit kristendomen. På Birka hittar du det berömda Ansgarsmonumentet; Ansgarskapellet byggdes cirka år 1930 till minne av missionären Ansgar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/hitta-pa-birka/gasthamnen/",
      "org": "birkavikingastaden.se",
      "vad": "Vattnet runt Björkö räknas som ett fornlämningsområde och därför råder det ankringsförbud i viken samt 50 meter ifrån strandkanten.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/2026/birka_tidtabell_stockholm_webb.pdf",
      "org": "stromma.com",
      "vad": "7 MAJ — 25 OKTOBER, 2026; Klara Mälarstrand; Hovgården*; Björkö/Birka — Klara Mälarstrand 09:30 → 11:45, 10:00 → 12:00, 10:00 → 12:15; Hovgården 11:50 → Birka 12:15",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/birka-vikingastaden/",
      "org": "stromma.com",
      "vad": "Den tar dig genom ett gravfält med klassiska vikingatida gravhögar, Birkas fornborg och avslutas nära eller intill Ansgarskorset.; Guidningen tar ungefär 45-60 minuter och är en promenad på cirka 1-1,5 kilometer.; Kommer du med egen privat båt? Då kan du köpa guidning och entrébiljett till museet separat.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "adelsjo": [
    {
      "url": "https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/birka-och-hovgarden/",
      "org": "raa.se",
      "vad": "På Adelsö, på andra sidan fjärden, ligger Hovgården där kungen bodde. ;  — Adelsö kyrka från 1100-talet och ruinen av Alsnö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v312.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "(Sjöängen-) Adelsö (-Sjöängen - Ekerö centrum), Av- och påstigning på Adelsöfärjan, Giltig 14 december 2025 - 18 juni 2026 . Restid ur tabellen: måndag–fredag 311 Brommaplan 09.38 → Adelsö kyrka 10.53, lördag 09.37 → 10.52 (1 h 15 min). Nyare PDF för hösten 2026 fanns inte på adressen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/adelsoleden/",
      "org": "Trafikverket",
      "vad": "Adelsöleden går mellan Munsö och Adelsö på Mälaröarna. Färjeledens längd är 1 000 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri. ;  — Öppet alla dagar mellan kl. 11–16. Öppet även jul och nyår. (Hovgårdens informationscenter, året runt) ;  — Under lågsäsong (november–april) är museet och restaurangen stängda och det finns ingen ordinarie båttrafik till ön. (Birka)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.birkavikingastaden.se/resa-hit/",
      "org": "birkavikingastaden.se",
      "vad": "Under lågsäsong (november–april) är museet och restaurangen stängda och det finns ingen ordinarie båttrafik till ön. ;  — Varje år på Kristi himmelsfärdsdag invigs Adelsö vandringsled ;  — Öppet alla dagar mellan kl. 11–16. Öppet även jul och nyår.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.cafehovgarden.se/",
      "org": "cafehovgarden.se",
      "vad": "Mitt i världsarvet, kom & njut av gott kaffe, bakverk, kulglass mjukglass och en bit mat!, Våra öppettider varierar över säsongen likaså menyn!, Tack alla för 2026!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/hovgarden/",
      "org": "stockholmslansmuseum.se",
      "vad": "Här bodde kungen som härskade över Birka. Sedan 1993 har Hovgården tillsammans med Birka status som världsarv., Under medeltiden låg kung Magnus Ladulås sommarpalats Alsnöhus här, Den blev byggd redan i slutet 1100-talet med långhus och smalare kor. ;  — Vid medeltidskyrkan finns flera större gravhögar. De tre största kallas Kungshögarna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/ekero/adelso-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Adelsö kyrka ligger drygt 40 kilometer från Stockholm ;  — Buss eller bil från Brommaplan mot färjeläget Sjöängen och en gratis bilfärja över till Adelsö ;  — Båten går från centrala Stockholm (Klara Mälarstrand) och stannar vid bryggorna Nya Kungshatt, Vårby brygga, Jungfrusund och Hovgården (Adelsö).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.upplevekero.se/se--gora/natur--friluftsliv/vandringsleder/adelso-vandringsled",
      "org": "upplevekero.se",
      "vad": "Leden är utmärkt med blå färgmarkeringar på träd och stenar och är lätt att följa., På kullen bakom den 500 meter långa stenmuren vid Stenby finns Skansbergets fornborg, Varje år på Kristi himmelsfärdsdag invigs Adelsö vandringsled",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.upplevekero.se/se--gora/vara-varldsarv/birka--hovgarden/6-saker-att-gora-pa-hovgarden",
      "org": "upplevekero.se",
      "vad": "Adelsö Hembygdsgård, Adelsö Ringväg 112. ;  — Ringlinje. (buss 312 på Adelsö) ;  — Resan med vägfärjan är avgiftsfri. ;  — Den visuella kontakten över vattnet mellan Hovgården och Birka",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ingaro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bjorno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1983, Storlek: 948 hektar, varav land 316 hektar, den fina sandstranden vid Torpesand med utblick mot Nämdöfjärden, Halvön genomkorsas av ett nätverk av stigar och grusvägar, Vackra och värdefulla betesmarker finns på Näset, där Adam och Eva blommar på försommaren ;  — På försommaren blommar orkidéer som Adam och Eva i de gamla betesmarkerna",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besok-och-upptack/naturreservat/langvikstrask.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Myren ingår i den nationella myrskyddsplanen liksom i nätverket Natura 2000, hör till de största och mest orörda i regionen, I slutet av sommaren lyser hjortronen som gula juveler i myrkanten",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/velamsund.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Länsstyrelsen Stockholm, naturreservatet Velamsund i Nacka kommun .",
      "last": "2026-09-14",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h428x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Björkvik, Giltig 17 augusti–12 december 2026 ;  — Slussen–Idalen ;  — Slussen–Eknäs brygga ;  — Giltig 19 juni–16 augusti 2026  — 428X: Slussen–Björkviks brygga 52–61 min; 10 turer mån–fre och 5 lör–sön på 428X, 10/6 på 429X, 11/6 på 430X.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "varmdo.se",
      "vad": "Stigen går längs Farleden Kolström och passerar delvis genom Ingarö gamla Sockencentrum som Riksantikvarieämbetet definierat som en miljö av rikshistoriskt intresse, Stigen är 1,7 km lång och går från Ingarö Kyrka till Dyviken ;  — Ingarö Golfklubb har två vackra och omväxlande 18-hålsbanor ;  — Ingarö havscamping, Södersved, Björkviks badplats, Återvalls träsk",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/storaochlillasand.4.18c983316e0536cb189a30d.html",
      "org": "varmdo.se",
      "vad": "Stora sandstränder längst ut på Ingarö, vid Klacknäset ;  — Strand och klippbad längst ut på Ingarö. ;  — Vid Återvalls träsk finns en sandstrand som ägs och sköts av Värmdö kommun. ;  — Strandbad med stora gräsytor. ;  — Vid stranden Torpesand har Skärgårdsstiftelsen en tillgänglighetsanpassad snorkelled",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.igk.se/banor/",
      "org": "igk.se",
      "vad": "Ingarö Golfklubb har två vackra och omväxlande 18-hålsbanor, Banan i sin nuvarande form invigdes 2012, Skogsbanan är breddad, ombyggd och nyinvigdes 2020",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.igk.se/restaurang/",
      "org": "igk.se",
      "vad": "där både golfare och gäster kan koppla av före rundan, efter spelet eller bara njuta av god mat, Fågelviksvägen 1, 134 64 Ingarö ;  — Vi har öppet för pizza och à la carte i restaurangen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingarohavscamping.se/kontakt-oppettider-contact-hours-of-operation/",
      "org": "ingarohavscamping.se",
      "vad": "Väg 222 mot Gustavsberg — ta av mot Värmdö Marknad och Ingarö, Ingarö Havscamping ligger ca 30 km öster om Stockholm ;  — Med bil från Värmdöleden, ta av mot Ingarö, Parkeringen är avgiftsbelagd",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingarohavscamping.se/korttidscamping-short-term-camping/",
      "org": "ingarohavscamping.se",
      "vad": "Vi har nio stycken korttidsplatser placerade på Bäverängen tillgängliga för husvagn, husbil och tält ;  — Campingen har fem stugor på 16 kvm/styck och som ligger med utsikt över kolströms kanal ;  — Vi har två servicehus på området, med wc/duschutrymmen, samt tvättstuga ;  — Ingarö havscamping, Södersved",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/besoksmal/bjorno/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Björnö är också ett uppskattat område för paddling och båtliv, med naturhamnar, skyddade vikar, tältplatser och rastplatser med eldstäder ;  — för längre tid än två dygn förankra båt vid samma strand, framföra eller förankra båt eller annan farkost närmare än 50 meter från sandstränder, på vattenområdet Slängen framföra motorbåt eller annan motordriven farkost",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "svenska-hogarna": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/svenska-hogarna.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Begränsade hamnmöjligheter finns på östra delen av Storön, vid Ytterhamnen. Här finns en brygga och sopmaja samt torrdass för besökare. Mellan ön Skrubban och Ytterhamnen finns angöringsbojar som ägs och sköts av Svenska Kryssarklubben, allmänheten kan mot betalning angöra vid bojarna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturkartan.se/sv/stockholms-lan/fyren-storon",
      "org": "Länsstyrelsen Stockholm på Naturkartan",
      "vad": "Dagens fyr ägs och förvaltas numera av Edward Sjöbloms stiftelse.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbra/21320000029574",
      "org": "Riksantikvarieämbetet",
      "vad": "På Svenska Högarna (Storön) i den yttersta delen av Stockholms norra skärgård uppsattes på 1700-talet tre stenkummel. År 1855 byggdes där en cirka 12 meter hög träbåk, ritad av Carl Sandell. / ett fyrfartyg, Svenska Bjön, lades ut i farvattnen år 1868 / föreslog Lotsstyrelsen att en fyr ändå måste uppföras på Svenska Högarna",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbrb/21420000027821",
      "org": "Riksantikvarieämbetet",
      "vad": "uppfördes ett öppet pelartorn av järn, ca 18,5 meter högt, med en linsapparat av andra ordningen / Fyren ritades av fyringenjör Gustaf Emil Höjer, som även ledde byggnadsarbetet. / Fyrplatsen anlades år 1874 och fyren tändes den 1 november samma år.",
      "last": "2026-09-27",
      "myndighet": true
    }
  ],
  "huvudskar": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Fågellivet är rikt i Huvudskärs naturreservat med många häckande sjöfågelarter som ejder, svärta, tobisgrissla, labb, skrak och vigg samt olika arter av vitfågel, I angränsande områden häckar tordmule;  — Området är också populärt för fågelskådning och naturfotografering",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.dalarosjotransporter.se/kontakt/",
      "org": "dalarosjotransporter.se",
      "vad": "Under sommaren 2026 kommer vi återigen att trafikera Dalarö - Huvudskär på torsdagar och söndagar mellan 14 juni-16 augusti, På söndagar ligger båten kvar c:a tre timmar Huvudskär, Avg från Dalarö Hotellbrygga tors/sön kl 11:30, Retur från Huvudskär torsdag kl 12:30, söndag kl 15:30, Boka via mail, Om rederiet ställer in turen pga av hårda vindar;  — Under sommaren finns även vissa säsongsanpassade båtturer från Dalarö;  — Dalarö sjötransport sträckan Dalarö-Huvudskär",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/huvudskar/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Huvudskär ligger längst ut i Haninges ytterskärgård, sydost om Ornö;  — Reservatet omfattar hela Huvudskärsarkipelagen utom huvudön Ålandsskär, och ligger tio kilometer sydost om Ornö, Huvudskärs naturreservat omfattar ett skärgårdsområde med omkring 200 öar och skär, Öarna består oftast av kala klippor med sparsam vegetation, mest enbuskar, ljung och kråkris, På Ålandskär finns fyr och byggnader, Skyddat sedan: 1974",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/huvudskar/",
      "org": "stockholmslansmuseum.se",
      "vad": "En så kallad skråstadga skrevs på uppdrag av kungen år 1450 av riksrådet Erengisle Nilsson, Den är den äldsta kända i sitt slag, eftersom hundratals fiskare samlades här varje år fanns behov av regler, För att se till att fiskarna lydde reglerna utsågs en hamnfogde, På söndagarna var det obligatorisk gudstjänst i öns kapell",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ekno": [
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "16A STAVSNÄS — SANDHAMN — HAGEDE, 16B HAGEDE — SANDHAMN — STAVSNÄS, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026, Eknö, utan fast avgångstid . Stavsnäs 16.40 → Eknö 17.10 (30 min), Eknö 08.14 → Stavsnäs 09.05 (51 min).  — Men inledningsvis bodde lotsarna inte på ön utan istället på Eknö där de hade sina bostäder och ibland mindre jordbruk., Det medförde att lotsarna lämnade Eknö och flyttade till Sandhamn",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.eknohemman.se/om-oss/om-oss",
      "org": "eknohemman.se",
      "vad": "Eknö Hemman var beteckningen för stamhemmanet, från ungefär 1500-talet eller tidigare, som omfattade öarna Eknö, Vindalsö, Skarprunmarn, Getholmen, Sandön, Kroksö-Björkö, Lökholmen och Korsö mfl öar och skär. ;  — En stor del av mark- och vattenområdena på Sandhamn ägs och förvaltas av Eknö Hemman Samfällighetsförening., Samfälligheten ägs av 145 fastigheter, föreningen har funnits sedan 1850-talet och hette tidigare Bystyrelsen for Eknö Hemman Nr 1",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.eknohemman.se/om-sandhamn/om-sandhamn",
      "org": "eknohemman.se",
      "vad": "Men inledningsvis bodde lotsarna inte på ön utan istället på Eknö där de hade sina bostäder och ibland mindre jordbruk., Det medförde att lotsarna lämnade Eknö och flyttade till Sandhamn ;  — Eknö Hemman var beteckningen för stamhemmanet, från ungefär 1500-talet eller tidigare, som omfattade öarna Eknö, Vindalsö, Skarprunmarn, Getholmen, Sandön, Kroksö-Björkö, Lökholmen och Korsö mfl öar och skär.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "hasselo": [
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "16A STAVSNÄS — SANDHAMN — HAGEDE, GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026 . Restid ur tabellen: måndag–torsdag Stavsnäs 09.45 → Hasselö 10.20 och 14.45 → 15.20 (35 min), 07.00 → 07.40 (40 min); söndag 09.40 → 10.05 och 13.10 → 13.35 (25 min).  — Haröskärgården trafikeras året runt av skärgårdstrafiken.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://hhif.se/oar/",
      "org": "hhif.se",
      "vad": "Öarna präglas av läget i ytterskärgården., Förutom i planlagda områden på Storö, Hasselö och Dämpluckskobben är befintlig bebyggelse främst koncentrerad till Hasselkobben och norra Harö. ;  — Hasselö brygga (Värmdö kommuns grovsopfärja) ;  — Långvik (Runmarö), Hasselö, Sandhamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/om-oss/",
      "org": "hhif.se",
      "vad": "1948 bildades Föreningen Hasselö Ångbåtsbrygga, Kärnan i verksamheten är och har alltid varit våra tre trafikbryggor som gör det möjligt för Waxholmsbolaget att reguljärt trafikera våra öar. ;  — Haröskärgården trafikeras året runt av skärgårdstrafiken., Det finns däremot inga anläggningar för friluftsliv och turism i området.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/uppdrag/bryggor/",
      "org": "hhif.se",
      "vad": "Hasselö brygga är den senast byggda bryggan och byggdes 1985 av Stockholms Hamn. ;  — Under 2019 har Hasselö brygga vänthus fått ny rödfärg, det blev problem för småbåtarna vid varierande vattenstånd",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/uppdrag/bryggor/hasselo/",
      "org": "hhif.se",
      "vad": "1984–85 var det dags för föreningens tredje bryggbygge., Man projekterade en brygga som vilar på ett ”rör” med ett jättestort ”lock” som spänts fast med wirar., Locket/bryggdäcket lyftes på plats av jättekranen Lodbrok. ;  — Året när föreningen Hasselö Ångbåtsbrygga bildades uppgick antalet medlemmar till 23",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ormsko": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Det finns idag ingen reguljärtrafik mellan öarna. Med egen båt, taxibåt eller genom att åka med någon chartrad tur går det att besöka området året om.; Ta med egen mat och dryck — inget sådant finns att köpa i nationalparken. ;  — förbjudet att ankra eller förtöja farkost på samma plats mer än två dygn i följd och att ta med okopplad hund eller annat husdjur som inte är kopplat",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031975",
      "org": "Naturvårdsverket",
      "vad": "Lagunerna är talrika kring de större öarna Koskären, Brunskär, Ormskär, Braka, Söderö och Långviksskär i den sydvästra delen av nationalparken; De större öarna i västra delen av nationalparken är i stor utsträckning tallskogsbevuxna; Grunda hårdbottnar och rev finns kring, och öster om, bland annat Långviksskär och Koskären-Ormskär; dominerande arter på de grunda reven är blåstång, rödalger och blåmusslor",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": true
    }
  ],
  "norrpada": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norrpada.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "vackert glacialslipade hällarna med tydliga isräfflor; På en del öar finns dalsänkor med al, ask, asp och idegran; På Hallskär och Idskär finns ett stort bestånd av idegran. Reservatet är värdefullt för häckande sjöfågel.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/norrpada/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Norrpada ligger cirka 15 kilometer sydost om Kapellskär och består av ett trettiotal öar, kobbar och skär som tillsammans bildar ett av norra skärgårdens mest omtyckta båtområden; Här finns inga större anläggningar, ingen bebyggelse och få spår av modern utveckling",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "graskar": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c37487ba/1732515932045/Sk%C3%A4rg%C3%A5rdsfakta%20%E2%80%93%20Grafiska%20kartor%202019.pdf",
      "org": "Länsstyrelsen",
      "vad": "I Stockholms skärgård finns omkring 30 000 öar, varav cirka 200 är bebodda.; Region Stockholm har i den regionala utvecklingsplanen för Stockholmsregionen — RUFS 2050 pekat ut kärnöar.; Landsort och Gräskö är utpekade som kärnöar; 21 (27); Den första siffran visar antalet folkbokförda på huvudön.; Det reella befolkningsantalet är regelmässigt högre. (Länsstyrelsen Stockholm, Skärgårdsfakta 2019, siffror för 2018)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/bygga-bo-miljo/norrtalje-vaxer/samhallsplanering/detaljplanering/gallande-detaljplaner/grasko-grasken-171-grasko-112-vastra-delen-av-grasko-och-grasken-1199/",
      "org": "norrtalje.se",
      "vad": "Tilläggen till byggnadsplanerna syftar till att utöka byggrätten till 200 m2 för befintliga bostadsfastigheter inom de aktuella planområdena efter att Gräskö fått kommunalt vatten och avlopp (VA).; Tilläggen till byggnadsplanerna vann laga kraft den 27 juni 2014. (Norrtälje kommun)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/osternas",
      "org": "norrtalje.se",
      "vad": "På Östernäs finns passbåtstrafik till linje 28 till bland annat Gräskö, Norröra, Söderöra, Svartlöga och Rödlöga.; Godslinje 60 F utgår från Östernäs och går till Gräskö, Norröra, Söderöra, Svartlöga och Rödlöga. (Norrtälje kommun)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 30 SEPTEMBER 2026; Furusund 07.50 10.05 10.05 10.05; Gräskö 08.15 10.30b 10.30b 10.30b; GÄLLER 1 OKTOBER 2026 — 12 DECEMBER 2026 — Furusund 07.50/10.05, Gräskö 08.15/10.30 = 25 min; Gräskö finns även i höst-/vintertabellen 1 oktober–12 december",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h27.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026; Strömkajen (Stockholm) 08.45 08.45 08.45; Gräskö 12.05 12.20 12.05 — Strömkajen 08.45, Gräskö 12.05 resp. 12.20 = 3 h 20–35 min",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://roslagen.se/oar/grasko-en-badvanlig-o-i-fjarden/",
      "org": "roslagen.se",
      "vad": "",
      "last": "2026-09-29",
      "myndighet": false
    }
  ],
  "langviksskaret": [
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031975",
      "org": "geodata.naturvardsverket.se",
      "vad": "läge \"I Stockholms skärgårds yttre delar strax öster om Nämdö\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/langviksskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Långviksskärs naturreservat ligger i Värmdö kommuns ytterskärgård; När Nämdöskärgårdens nationalpark bildades år 2025 övergick huvuddelen av det som tidigare var Långviksskärs naturreservat till att bli nationalpark, men en mindre del kvarstår som reservat; Storlek: 9,6 hektar varav land 8,1 hektar . Den tidigare kommentaren (ca 300 öar, 3 897 ha) gällde reservatet före 2025. Ortnamnet är Långviksskär, inte Långviksskäret. Stod 'södra' med Landsort/Nåttarö som grannar — det är Nämdö/Bullerö-området. Inte samma plats som Långskär.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/langviksskar",
      "org": "explorearchipelago.com",
      "vad": "Långviksskär ligger öster om Nämdö i ytterskärgården; Hit kommer båtfolk för att lägga till i de fina naturhamnarna och njuta av naturen med blankslipade hällar, lövskog och strandängar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/langviksskar/langviksskar-hallskar",
      "org": "explorearchipelago.com",
      "vad": "Långviksskär, Hallskär listas som Naturhamn ;  — förbjudet att ankra eller förtöja farkost vid brygga och ankra eller förtöja farkost på samma plats mer än två dygn i följd",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitvarmdo.com/utbud/langviksskars-naturreservat/",
      "org": "visitvarmdo.com",
      "vad": "Han skaffade hus och ateljé på ön och skildrade i nästan 40 år i text, måleri och fotografi livet på ön. ;  — Inom skötselområde 3 låg under en lång period Axel Sjöbergs ateljé. Numer återfinns endast spår av grunden till ateljén.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "storholmen": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-lidingo-stad.html",
      "org": "havochvatten.se",
      "vad": "Lidingö stads registrerade badplatser: \"Fågelöudde\", \"Kottlasjön, badviken\", \"Käppalabadet\", \"Sticklinge udde, Sandviksbadet\", \"Södergarn\"; ingen på Storholmen.  — \"Lidingö har fina friluftsbad, mest känt är badet vid Fågelöudde\", \"Två gånger varje sommar besiktar vi botten vid våra badplatser\" .",
      "last": "2026-09-26",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "lidingo.se",
      "vad": "Med skärgårdsbåt tar du dig lätt till Storholmen eller Fjäderholmarna, Bägge två är bebyggda, har restaurang och stigar att promenera på ;  — Ropsten–Storholmen, Giltig 17 augusti–12 december 2026: Ropsten 07.05 → Storholmen södra 07.33, lördag 08.10 → 08.38 (28 min) . Stod «vandringsleder och havsbad» tidigare: Lidingö stad nämner inga, och Storholmen finns inte bland stadens badplatser hos Havs- och vattenmyndigheten.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/trafik-infrastruktur/ta-dig-fram/batpendla/",
      "org": "lidingo.se",
      "vad": "Vissa avgångar fortsätter från Ropsten till Storholmen, Båten åker inte till Storholmen östra, Frösvik och Storholmen norra under vintertid om det ligger is, de som kör mellan Ropsten och Storholmen har plats för 15 cyklar, Köpa biljett, SL:s webbplats . Stod tidigare «Waxholmsbolaget från Strömkajen/Nybrokajen sommartid, 40 min» — fel avgångsplats och säsong.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h80.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Ropsten 07.05 → Storholmen södra 07.33, 11.15 → Storholmen östra 11.52; lördag 08.10 → södra 08.38, östra 08.47 ;  — \"Båten åker inte till Storholmen östra, Frösvik och Storholmen norra under vintertid om det ligger is\" ;  — öppettider till \"31 Lördag\" i oktober, julbord \"Lördagar 28 nov, 5 dec, 12 dec och 19 dec\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://storholmensjokrog.se/",
      "org": "storholmensjokrog.se",
      "vad": "SEDAN 2018, Vår terrass sträcker sig ut mot vattnet, rätter med säsongens bästa råvaror, meny med bl.a. Stekt strömming, Fish and Chips, Moules Frites, För barnen, skräddarsydd catering, Hyr hela restaurangen",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "langskar": [
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031975",
      "org": "geodata.naturvardsverket.se",
      "vad": "1995 beslutades området omfattande Bullerö, Långskär, Långviksskär samt Biskopsö naturreservat som Natura 2000-område Bullerö-Bytta (SE0110088). (Naturvårdsverket/Länsstyrelsen, skötselplan för Nämdöskärgårdens nationalpark)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/langskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Öarna är kuperade med hällmarker, sänkor och en växtlighet typisk för den yttre skärgården.; I reservatet finns ett utomordentligt rikt och särpräglat fågelliv med senhäckande och störningskänsliga arter.; Under tiden 1 februari–15 augusti beträda utpekat fågelskyddsområde (se karta i föreskrifterna)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/langviksskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Ta med egen mat och dryck — inget sådant finns att köpa i nationalparken. Det finns också begränsat med dricksvatten. Du kan fylla din vattenflaska på Bullerön",
      "last": "2026-09-27",
      "myndighet": true
    }
  ],
  "storskar": [
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/296458",
      "org": "geodata.naturvardsverket.se",
      "vad": "att återkalla förordnandet för Skärgårdsstiftelsen som förvaltare för naturreservat och naturminne; Storskär Naturreservat Österåker 0117-02-001; 2020-02-05; Länsstyrelsen har i beslut överlåtit förvaltningen till Skärgårdsstiftelsen för dessa områden. (Länsstyrelsen Stockholm, beslut 511-5414-2020)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/storskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Naturen i Storskärs naturreservat är typisk och representativ för mellanskärgården.; Det här är ett litet reservat som omfattar södra delen av ön Storskär. Ön ligger i Svartlögafjärden 4 kilometer norr om Möja.; Skyddat sedan: 1968; Storlek: 8,9 hektar; Naturtyp: barrskog, blandskog, skärgård; Kommun: Österåker; Markägare: privat",
      "last": "2026-09-27",
      "myndighet": true
    }
  ],
  "ulvon": [
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/naturreservat/stormyran-pa-ulvon.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Här hittar du blomsterrika våtmarker nära havet på Norra Ulvön; Området nås via stig från Sandvikssjön där en informationstavla är placerad. Du kan också nå området från Norrsand",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/varldsarvet-hoga-kusten.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Höga Kusten blev utsedd till världsarv år 2000; sedan dess har landet höjts 286 meter i förhållande till havsytan",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/naturreservat/ulvo-havet.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Här bröts titan- och vanadinhaltig järnmalm av och till mellan 1690 och 1959; Södra Ulvön har därför också haft namnet; 100 meter söder om Marviksgrunnan kan du studera resterna av en nedlagd gruva med flera gruvhål och gamla gruvgångar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Ulv%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Ulvön\" → Ulvön | Örnsköldsvik | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://smakasverige.jordbruksverket.se/produkter/produktarkiv/surstromming.413.html",
      "org": "smakasverige.jordbruksverket.se",
      "vad": "Ulvö Gamla Salteri var först att konsumentförpacka surströmming i plåtburkar. Detta skedde ca. 1890; På burkarna stod det Surströmming från Ulvön; Idag finns endast ett salteri kvar på Ulvön, Ulvö Lilla Salteri",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://bistroruben.se/",
      "org": "bistroruben.se",
      "vad": "Restaurangen mitt i Ulvöhamn; Hos oss kan ni dagtid njuta av en matigare lunch med god dryck. På kvällen förvandlas vi till en mysig och personlig á la carte-bistro; Vår restaurang består av flera rum i form av byggnader",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://bistroruben.se/oppet/",
      "org": "bistroruben.se",
      "vad": "18:e juni — 8:e augusti 2026; Tisdag–Söndag",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hkship.se/",
      "org": "hkship.se",
      "vad": "Under sommarmånaderna juni-augusti kör vi reguljära dagliga turer till de populära öarna Ulvön och Högbonden; m/s KUSTTRAFIK (byggd 1908)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/stader-platser/ulvon",
      "org": "hogakusten.com",
      "vad": "Ulvöarna ligger 30 km söder om Örnsköldsvik; Ulvön är vår skärgårds största turistiska besöksmål med stora kulturella värden tack vare välbevarade sjöbodar, bostadshus och gistvallar; kallas ibland för Bottenhavets pärla eller Norrlands Sandhamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/ulvo-museum",
      "org": "hogakusten.com",
      "vad": "Museet härmar ett fiskarboställe från 1900 med sjöbod, boningshus och gistvall; digitala sökstationer med fördjupad information om strömmingsfisket och salterierna; Möjlighet till daglig guidetur under sommaren; Gratis/ingen avgift",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/gasthamn-ulvo-hotell",
      "org": "hogakusten.com",
      "vad": "har i dag cirka 70 gästplatser alla med tillgång till färskvatten och el; ett djup på fyra meter och en nyrenoverad servicebyggnad med toaletter, duschar, kök och tvättstuga; Ett stenkast bort finns även handelsbod och sjömack med diesel, och bensin; Bastu",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/mf-ulvon",
      "org": "hogakusten.com",
      "vad": "Färjan avgår året runt och extra frekvent under sommarmånaderna från kajen i Köpmanholmen; Sväng av E4 vid Bjästa 18 km S om Örnsköldsvik och följ skyltningen mot Köpmanholmen och Ulvön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/planera-resan/resa-hit-har",
      "org": "hogakusten.com",
      "vad": "Y-buss går via flera hållplatser på sträckan Örnsköldsvik-Stockholm; vid hpl Docksta finns FriluftsByn samt närhet till Ulvöns båtar; Om du reser till Höga Kusten söderifrån åker du oftast med SJ; kan du resa nästan överallt med kollektivtrafikföretaget DinTur",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/skargard/farja-till-ulvon",
      "org": "hogakusten.com",
      "vad": "Ingen av färjorna är bilfärjor så det är inte möjligt att ta med bilen till Ulvön; Parkeringen i Köpmanholmen är avgiftsbelagd. Parkeringarna i Ullånger och Docksta är gratis",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/ulvo-kapell",
      "org": "hogakusten.com",
      "vad": "byggt på 1600-talet av fiskare från Gävle; Ulvö gamla kapell byggdes 1622 och anses vara Ångermanlands äldsta säkert daterade träbyggnad; signerade Roland Johansson Öberg 1719",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/ulvoleden-vandra-pa-ulvon-i-hoga-kusten",
      "org": "hogakusten.com",
      "vad": "Ulvöleden är inte en ny etapp på Höga Kustenleden, utan en fristående led som passar bra att lägga in mellan etapp 6 och 7",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://mfulvon.se/turlistor",
      "org": "mfulvon.se",
      "vad": "Turlista 14 sep - 31 okt 2026; Köpmanholmen 08.15 16.00 *08.15 10.00 16.00; Ulvöhamn 09.45 17.30 11.30 17.30",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://mfulvon.se/",
      "org": "mfulvon.se",
      "vad": "Avgång 10.00 från Köpmanholmen till Ulvöhamn (via Strängöarna och Fjären)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://mfulvon.se/bra-att-veta",
      "org": "mfulvon.se",
      "vad": "Alla våra turer till Strängöarna, Trysunda och Ulvön utgår från Köpmanholmens färjeläge. Här finns flera stora parkeringar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ulvohotell.se/sv/vanliga-fragor",
      "org": "ulvohotell.se",
      "vad": "Vi öppnar för säsongen under valborgshelgen; 15 juni startar högsäsongen, som pågår fram till den 15 augusti; har vi åter öppet fredag-lördag fram till sista oktober; ett stort gym och en mycket trevlig bastu med havsutsikt som är gratis att använda för våra hotellgäster",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ulvohotell.se/sv/upptack-ulvon",
      "org": "ulvohotell.se",
      "vad": "vandra 2,3 mil längs långa vackra röda hällor, fina sandstränder på Norra Ulvöns östra sida; passera vackra Fiskeläget Sandviken",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ulvohotell.se/sv/restaurang",
      "org": "ulvohotell.se",
      "vad": "Ulvö Hotells kök har en förkärlek till det lokala; Och ja, självklart serverar vi även surströmming!; Skärgårdsbuffé; Endast öppet under Juli månad",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ulvomuseum.com/surstromming/",
      "org": "ulvomuseum.com",
      "vad": "alltsedan samhällets etablering från slutet av 1500-talet",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "gotland": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Gotland",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Gotland\" → Gotland | Gotland | Natur- och terrängnamn (mittpunkt av tre), SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.smhi.se/kunskapsbanken/klimat/klimatet-i-sveriges-landskap/gotlands-klimat",
      "org": "smhi.se",
      "vad": "Visby och Hoburg på Gotland som har lite drygt 2000 soltimmar per år; I juli är medeltemperaturen strax över 17°; Eftermiddagstemperaturerna är dock sommartid ett par grader högre och nattemperaturerna ett par grader lägre i de centrala delarna av ön än vid kusten",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.destinationgotland.se/",
      "org": "destinationgotland.se",
      "vad": "Gotland Taste Festival den 25–27 september; Gotlands tryffelmånad 10 okt–16 nov",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationgotland.se/allt-om-resan/infor-resan/anslutningstrafik-till-gotlandsfarjan/",
      "org": "destinationgotland.se",
      "vad": "rekommenderar vi att du planerar att anlända till Nynäshamn minst en timme före din färjeavgång",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationgotland.se/allt-om-resan/infor-resan/batbuss/",
      "org": "destinationgotland.se",
      "vad": "Linjen Nynäshamn–Stockholm–Arlanda–Uppsala trafikeras året runt; Båtbussen anländer till hamnterminalen ungefär en timme före båtens avgång",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationgotland.se/allt-om-resan/infor-resan/batbussen-hallplatser/",
      "org": "destinationgotland.se",
      "vad": "Linköping-Norrköping-Västervik-Oskarshamn; Jönköping-Nässjö-Vetlanda-Oskarshamn; Växjö-Lessebo-Kalmar-Oskarshamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationgotland.se/allt-om-resan/farjeterminaler/",
      "org": "destinationgotland.se",
      "vad": "Cirka 500 meter från terminalen finns en inhägnad långtidsparkering som är öppen 06:00–24:00 (övrig tid låst); parkeringen som har cirka 165 platser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/hansestaden/",
      "org": "gotland.com",
      "vad": "Upptäck världsarvet med guide; Turistbyrån ligger på Donners plats i hjärtat av Visby",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/besoka-uppleva/friluftsliv-natur/tio-raukomraden-pa-gotland/",
      "org": "gotland.com",
      "vad": "Digerhuvud är Sveriges största raukområde och sträcker sig 3500 meter längs Fårös västra kust; Här finns Gotlands högsta rauk ”Jungfrun” som är hela 12 meter hög; Här hittar du den kände ”Hoburgsgubben”",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/visby-ringmur/",
      "org": "gotland.com",
      "vad": "Visby Ringmur är ca 3,5 km lång och är den bäst bevarade stadsmuren i hela norra Europa; Den är 11m hög, byggdes i olika etapper och stod färdig år 1288; Ursprungligen hade den 29 marktorn och 22 sadeltorn. Nu finns 27 marktorn kvar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/de-hundra-kyrkornas-o/",
      "org": "gotland.com",
      "vad": "Gotlands 92 medeltida kyrkor är *alla öppna dagtid; Med reservation för kyrkor som repareras och enstaka med andra öppettider",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/besoka-uppleva/mat-dryck/",
      "org": "gotland.com",
      "vad": "Visste du att Gotland är bryggeritätast i Sverige?",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/resa-hit-runt/",
      "org": "gotland.com",
      "vad": "Det finns bilfri cykelväg längs med länsväg 140 från Visby till Klintehamn och längs länsväg 149 från Visby till Lummelunda; Gotlandsleden tar dig runt ön på mindre vägar; Det finns möjlighet att hyra cykel i Visby och flera andra platser på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/besoka-uppleva/friluftsliv-natur/strandhang-och-bad-gotland/",
      "org": "gotland.com",
      "vad": "En av Gotlands populäraste badstränder; Bra bussförbindelse med buss 10 från Visby; Flera kilometer lång sandstrand; Idealisk för barnfamiljer med mjuk len sand och långgrunt vatten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/visby-gasthamn/",
      "org": "gotland.com",
      "vad": "Platser finns både i inre hamnen, i fiskehamnen samt på norra vågbrytaren … 250 platser … hamndjupet är 3-6 m; gotland.se listar Visby gästhamn. Service anges inte av Region Gotland.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/klintehamn-gasthamn/",
      "org": "gotland.com",
      "vad": "10 gästplatser, djup 1,8–2,5 m; gotland.se (hamnar för fritidsbåt) — \"tillgång till toalett, dusch och tvättstuga\", \"Hamncaféet ligger i anslutning\"",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/bakfickan/",
      "org": "gotland.com",
      "vad": "en fisk- och skaldjursrestaurang, Stora Torget 1, Året runt; bakfickanvisby.se",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/krakas-krog/",
      "org": "gotland.com",
      "vad": "Restaurang i gamla bankhuset i Kräklingbo, Fine dining, menyn följer … säsongerna; krakas.se — säsong 2026",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/almedalsveckan/",
      "org": "gotland.com",
      "vad": "Almedalsveckan 2026 genomförs i Visby och inleds den 22 juni; Det blir snabbt fullbokat så kontakta företaget för att se tillgänglighet och var ute i god tid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/medeltidsveckan/",
      "org": "gotland.com",
      "vad": "Välkommen till Medeltidsveckan 2026, 2-9 augusti!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotlandsboenden.se/stugor/farosunds-semesterby/",
      "org": "gotlandsboenden.se",
      "vad": "Den mysiga semesterbyn ligger vid havet i samhället Fårösund med endast 2 km till livsmedel; Vi erbjuder även 10 stycken campingplatser med el och 4 tältplatser utan el",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.krakas.se/",
      "org": "krakas.se",
      "vad": "Vi har öppet till den 20 september 2026; Hos oss serveras samtliga gäster en avsmakningsmeny; Hos oss på Krakas finns fem dubbelrum avsedda för restaurangens gäster",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.strawberryhotels.com/hotels/sweden/visby/clarion-hotel-wisby/",
      "org": "strawberryhotels.com",
      "vad": "conveniently situated within Visby's medieval city wall; The 212 hotel rooms; Pool entrance is not included in the room rate; Friheten Bistro & Bar, Kaptenshuset and Vinterträdgården",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://toftastrand.se/hotell/",
      "org": "toftastrand.se",
      "vad": "Hos oss bor du bara meter från den vidsträckta Tofta strand; Samtliga rum ligger i fristående enplanslängor i skogsbrynet vid sanddynorna",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "oland": [
    {
      "url": "https://www.borgholm.se/borgholms-hamn",
      "org": "borgholm.se",
      "vad": "Drivs av: Strand Öland, Duschar: 3, Tvättstuga: Ja, Tanka: Diesel och bensin, Wifi: Ja, El: Ja (redigerad 2026-06-29)",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/varldsarvet-sodra-olands-odlingslandskap.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "I den medeltida Östgötalagen från 1200-talet, finns regler för hur bönderna skulle lägga ut en radbytomt, Ju bredare tomten var desto större andel hade gården i byns inägojord, Gårdstypen kallas götisk . Stod tidigare «fler soltimmar än nästan hela övriga Sverige» utan källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/trollskogen.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "Reservatet ligger på Ölands nordostligaste udde, gammal tallskog med stormvridna träd, mäktiga ekar klädda i murgröna, klapperstenstränder, Trollskogen är ett av Ölands mest besökta naturområden ;  — Här finns Ölands längsta sandstrand, tio meter höga sanddyner, De äldsta tallarna är upp emot 200 år gamla",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/ottenby.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "På Ölands södra udde, en av Sveriges bästa fågellokaler, ligger naturreservatet Ottenby. Reservatet är ett av de största i Kalmar län och omfattar 995 hektar., Vid Ottenby fyrby, längs ner på udden finns en fågelstation som drivs av Sveriges Ornitologiska förening. Här ringmärks årligen tusentals fåglar, Fyren Långe Jan är ett av Ölands mest kända landmärken. Den byggdes på 1780-talet och är med sina 42 meter Sveriges högsta fyr., de äldsta har en stamomkrets på över 400 cm och är drygt 400 år gamla, På 1690-talet lät Karl XI bygga muren runt Ottenby lund",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "Dynområdet med flygsand är ett av Sveriges största, Från Fagerrör till Trollskogen går en järnväg som anlades i början av 1900-talet för att forsla ut timmer från kronoparken. Järnvägen används idag som museijärnväg med turisttrafik under sommaren. ;  — I Trollskogen finns fyra färgmarkerade vandringsleder, Samtliga leder startar och avslutas vid naturum",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%96land",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Öland\" → Öland | Borgholm | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/aktuellt-i-lanet/kalmar/pa-gang/vi-forbattrar-i-kalmar-lan/broarbeten-i-kalmar-lan/",
      "org": "Trafikverket",
      "vad": "Från augusti 2026 till 31 mars 2027, Trafiken påverkas genom att vi stänger ett körfält i vardera riktning och sänker hastigheten, Tänk också på att restiden kan bli längre ;  — 6 april till 15 juni och 16 augusti till 21 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.borgholmsslott.se/",
      "org": "borgholmsslott.se",
      "vad": "I 900 år har Borgholms slott stått på sin klippkant och blickat ut över Kalmarsund, innan palatset förstördes vid en brand i början av 1800-talet, Guidade turer ;  — 28 mars — 30 april: Dagligen kl. 10-16, 1 oktober — 1 november: Dagligen kl. 10-16, Hundar är välkomna till Borgholms Slott. ;  — Öppet dagligen 7 maj - 27 september 2026, Det byggdes av min farfars mor, Drottning Victoria, och stod färdigt 1906",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.borgholmsslott.se/slottscafe/",
      "org": "borgholmsslott.se",
      "vad": "Välkommen till vårt sommarcafé., På yttre borggården kan du sitta ner och ta en fika, äta en lättare lunch eller njuta av en svalkande glass., Öppnar återigen sommaren 2027.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.oland.se/",
      "org": "oland.se",
      "vad": "Solens och vindarnas ö, Välkommen till Ölands officiella besöksguide. ;  — Här finns Ölands längsta sandstrand ;  — År 2000 skrevs Södra Ölands odlingslandskap in på Unesco:s världsarvslista ;  — Trollskogen gör verkligen skäl för sitt namn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.oland.se/varldsarvet",
      "org": "oland.se",
      "vad": "Hela södra Öland är ett världsarv. Från Karlevi i väster till Gårdby i öster och sedan hela vägen söderut sträcker sig ett underskönt landskap och en unik kulturbygd. ;  — Sjömarker, alvarmarker, odlingsmarker och radbyarna på södra Öland utgör världsarvet, Genom det karga och vackra världsarvet löper Mörbylångaleden, som är en av Svenska Turistföreningens tolv signaturleder. Upplev hela leden från Färjestaden ner till Ottenby",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.oland.se/en/travel/bus-tag-taxi",
      "org": "oland.se",
      "vad": "several daily departures to Kalmar from Stockholm, Gothenburg and Malmö/Copenhagen, Direct bus in both directions all year round, From Kalmar and on to Öland, you can travel with the local bus company KLT, lines 101, 102, 103, 104, 105, 106, 107, 112, you can bring a bicycle . Restider, BRA-flyg och «kostnads- och tullfri bro» stod tidigare utan källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.oland.se/skordefest",
      "org": "oland.se",
      "vad": "Sista helgen i september anordnas, lockar tusentals",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sollidensslott.se/",
      "org": "sollidensslott.se",
      "vad": "Öppet dagligen 7 maj - 27 september 2026, Kungafamiljens privata foton från Solliden, deras privata miljö på Solliden, På natursköna Kaffetorpet njuter du av mat, smörgåsar och härliga bakverk från eget bageri",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "branno": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Br%C3%A4nn%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Brännö\" → Brännö | Göteborg | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
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
      "vad": "levande skärgårdsö i södra delen av Göteborgs skärgård med cirka 900 bofasta invånare, Sommargästerna började inta ön på 1930-talet och numera är pendlarna i klar majoritet, jordbruket, lots-historien, tullarna och sjöfarten, Viskompositören Lasse Dahlqvist har gjort ön känd genom sina visor, Från berget vid den gamla lotsutkiken, på öns högsta punkt, har du utsikt från Vinga till inloppet till Göteborg, hembygdsmuseet mitt på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "De södra öarna är bilfria och nås enkelt året runt med Styrsöbolagets båtar, 283, Saltholmen–Asperö–Brännö Rödsten, 282, Saltholmen–Köpstadsö–Styrsö Bratten–Styrsö Tången–Brännö Husvik, Båtarna avgår som regel en gång i timmen, räcker en biljett för zon A",
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
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "",
      "last": "2026-09-29",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Styrs%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Styrsö\" → Styrsö | Göteborg | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
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
      "url": "https://www.goteborg.com/en/guides/guide-eat-and-fika-in-gothenburgs-archipelago",
      "org": "goteborg.com",
      "vad": "If you instead head to the ferry terminal at Styrsö Bratten, you will find Brattens Wärdshus where you can stop for food or fika",
      "last": "2026-10-01",
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
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vrangoskargarden-vrango-arkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Ta dig förbi Brevik, Bingen och Vättnena i norr, via de lummiga busk- och skogspartierna längs en markerad promenadslinga. Eller gå söderut, förbi Nötholmsviken över den öppna hällmarksljungheden och förbi Store rös, det gamla bronsåldersröset; Det finns en fin sandstrand söder om färjeläget; Det bästa fisket sägs vara på öns södra sida vid Kungsnabbe och vid Kungsö sund. Stod ca 6 km runt hela Vrångö och klippbad på östra och norra sidan utan källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Vr%C3%A5ng%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Vrångö\" → Vrångö | Göteborg | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "281 Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; Gäller 24 aug — 12 dec 2026; Linje 283 från Stenpiren och Lindholmspiren. Båtbyte på Saltholmen. . Restid räknad ur tabellen måndag–fredag: Saltholmen 05:09 → Vrångö 05:27 (18 min), 09:25 → 10:03 (38 min), 11:20 → 12:22 (62 min). Från Stenpiren 08:44 med byte på Saltholmen, framme 10:03 (1 h 19 min); 16:55 med byte till 17:35, framme 18:05 (1 h 10 min). Stod 'ca 1 h 35 min direkt från Stenpiren' — i höst- och vintertidtabellen byter man båt på Saltholmen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/platser/vrango",
      "org": "goteborg.com",
      "vad": "Bebyggelsen sträcker sig som ett bälte tvärs över ön och både områdena norr och söder om bebyggelsen är skyddade naturreservat; Skärgårdsbåten lägger till i Mittvik; Tvärs över ön, en knapp kilometer från båtens tilläggsplats, finns en stor modern gästhamn med fiskekaj, livsmedelsbutiken Tempo; Besökare hittar post, affär, kiosk, bangolfsbana med mera",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter; Buss 114, Ö-snabben, restid cirka 25 minuter; 281, Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; för resor till öarna i södra skärgården räcker en biljett för zon A; Linje 281 och 282 trafikerar sträckan Stenpiren–Styrsö–Donsö–Vrångö, med en total restid på cirka 1 timme och 35 minuter … två turer per dag måndag till fredag, samt även lördag och söndag under sommaren; parkering i områdena Talattagatan och Vikebacken i Långedrag, samt sommartid vid Hinsholmskilen. På Saltholmen finns endast parkering för rörelsehindrade . Västtrafik, tidtabell linje 281 Vrångö–Saltholmen 2026-08-24–2026-12-12,  — Saltholmen 05:09 → Vrångö 05:27, 09:25 → 10:03, 10:53 → 11:28 . Tidigare stod linje 283 (går till Asperö och Brännö Rödsten, inte Vrångö).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hamnkrogenlotsen.se/",
      "org": "hamnkrogenlotsen.se",
      "vad": "Hos oss kör vi DROP IN till våra bord för mindre sällskap; Vi älskar skaldjur! Skaldjur utan krusiduller!; Fiskeboa på Vrångö har öppet samma tider som Hamnkrogen Lotsen och ligger också under samma tak",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hamnkrogenlotsen.se/aktuellt/",
      "org": "hamnkrogenlotsen.se",
      "vad": "HUMMERAFTON 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kajkantenvrango.se/boende-pa-kajkanten/",
      "org": "kajkantenvrango.se",
      "vad": "Kajkanten är öppet året runt och erbjuder boende i elva moderna sjöbodslägenheter; Sjöbodarna har eget badrum med dusch och toalett samt pentry med full köksutrustning; Kajkanten har ingen egen restaurang, men året runt kan du beställa frukostkorg och Fiskarn´s skaldjurslåda eller något annat gott levererat från Hamnkrogen Lotsen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kajkantenvrango.se/",
      "org": "kajkantenvrango.se",
      "vad": "På Vrångö i Göteborgs södra skärgård ligger lägenhetshotellet Kajkanten, längst ut på västsidan innan havet tar vid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kajkantenvrango.se/hummerfeber-pa-vrango/",
      "org": "kajkantenvrango.se",
      "vad": "september 18, 2026 (inlägg om hummerpremiären, visar att verksamheten är igång 2026)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kajkantenvrango.se/hitta-hit/",
      "org": "kajkantenvrango.se",
      "vad": "När du går av färjan på Vrångö är det 15 minuters promenad över ön till Kajkantens hotell och relaxflotte. Hotellet ligger i fiskehamnen på andra sidan av ön.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/goteborgs-skargard/vrango/",
      "org": "svenskagasthamnar.se",
      "vad": "Vrångö hamn är en mycket populär och välbesökt gästhamn; Gästplatser 130; Det finns även en nyutlagd dagbrygga för kortare besök; I gästhamnen finns toaletter, duschar, tvättmaskin, sopkärl, miljöstation och septictank sugtömning; 600kr/dygn inkl el; Det finns mataffär och matställen i hamnen; Hamnen håller öppet mellan 17 april och 15 oktober . I sidans servicetabell är Färskvatten markerat, Diesel och Bensin inte (fuel: false stämmer).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tempo.se/butiker/tempo-goteborg-vrango/",
      "org": "tempo.se",
      "vad": "TEMPO GÖTEBORG VRÅNGÖ; VRÅNGÖ HAMN",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "donso": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Dons%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Donsö\" → Donsö | Göteborg | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://donsohamn.se/",
      "org": "donsohamn.se",
      "vad": "Alla priser är inklusive el, vatten, dusch och toalett.; Tillgång till internet via hamnens wifi.; Även tillgång till tvättmaskin; Istappen, sjömack; Gästhamnen är öppen året runt.; Cirka 100 st på insidan av västra piren i hamnen.; Grillplatser finns på den yttersta piren.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://donsohamn.se/pdf/donso_se.pdf",
      "org": "donsohamn.se",
      "vad": "Nere i hamnen pryds många av fiskebodarna av skyltar som bär namn av gamla fiskebåtar.; informationstavlan på kajen; Skärgårdsfiskare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/donso",
      "org": "goteborg.com",
      "vad": "Donsö och grannen Styrsö är de två största öarna i södra delen av Göteborgs skärgård. På Donsö bor cirka 1 500 bofasta invånare. Här spelar fiske och rederinäring störst roll och ön är Sveriges tredje största redarort efter Göteborg och Stockholm.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/styrso",
      "org": "goteborg.com",
      "vad": "Det finns en broförbindelse mellan Styrsö och Donsö så du kan promenera och cykla emellan de två öarna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter; En Västtrafikbiljett för zon A gäller hela vägen på spårvagn, buss och färja.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/isbolaget-donso",
      "org": "goteborg.com",
      "vad": "Längst upp i huset ligger 14 hotellrum, där du får en fantastisk utsikt över havet och fiskebåtshamnen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/goteborg/yngves-livs-1003574/",
      "org": "ica.se",
      "vad": "ICA Nära Yngves Livs; Donsö-Backe 3, Donsö; Titta in och handla prisvärt alla dagar i veckan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://isbolaget.com/",
      "org": "isbolaget.com",
      "vad": "HOTELL; Donsö Hamnväg 45",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://istappen.com/",
      "org": "istappen.com",
      "vad": "Hos oss på Istappen kan du tanka Diesel utan RME, Färgad diesel, Bensin 98 och nu HVO100.; Vill du tanka när stationen är stängd går det bra att göra via vår självbetjäningsautomat på utsidan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://manshamnkafe.se/",
      "org": "manshamnkafe.se",
      "vad": "Vi är en liten familjerestaurang i Donsö hamn.; Nybakad pizza, gott från grillen och något kallt att dricka - mitt i Donsö hamn.; Uppdaterad 30 augusti 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf",
      "org": "transdev.se",
      "vad": "23/08 2026 - 12/12 2026; 281 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Donsö-Vrångö och omvänt . Vardagar enligt tabellen (avläst ur den renderade PDF:en, textlagret är sammanblandat): Saltholmen 06:09→Donsö 06:37, 07:24→07:44, 09:25→09:51, 11:20→12:00, 13:25→14:02, 14:23→14:41, 15:28→15:46, 16:30→16:48, 22:36→22:53 — 17–40 min, cirka 20 avgångar per vardag.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "asperon": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/aspero.html",
      "org": "havochvatten.se",
      "vad": "Här ser du det senaste resultatet från kommunens provtagning; Provtagning sker huvudsakligen under den officiella badsäsongen som sträcker sig mellan 2026-06-21 och 2026-08-20.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Asper%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Asperö\" → Asperö | Göteborg | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.asperobyalag.se/",
      "org": "asperobyalag.se",
      "vad": "Den här gången var det backen från Östra upp mot synpunkten som var i fokus.; vackra promenader runt vattnet; Med gemensamma krafter kan vi hålla Musta öppet och trivsamt året runt.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.asperofritid.se/",
      "org": "asperofritid.se",
      "vad": "Lokalt går öborna under namnet ”krabbor”.; Asperö ingår i Styrsö socken.; På ön finns ett hembygdsmuseum som visar ett unikt material från livet på Asperö från 1700-1900 talet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/aspero/",
      "org": "goteborg.com",
      "vad": "Här bor cirka 400 invånare året runt, vilket gör Asperö till den minsta av de bofasta öarna i den södra delen av Göteborgs skärgård. Ön nämns första gången på 1200-talet och namnet Asperö härstammar från trädet asp som fortfarande växer i stort antal på ön.; Asperö i Göteborgs södra skärgård är en bilfri ö. Till transporter används bland annat flakmopeder.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/knutssons-tradgardscafe-aspero/",
      "org": "goteborg.com",
      "vad": "Asperös första kafé öppnade lagom till påsken 2025 och håller öppet hela sommaren.; smörgåsar med räkor, fisk och grönsaker som går att förbeställa via sms; Gålebergsvägen 29",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter; Buss 114, Ö-snabben, restid cirka 25 minuter; 283, Saltholmen–Asperö–Brännö Rödsten; En Västtrafikbiljett för zon A gäller hela vägen på spårvagn, buss och färja.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://knutssonsskafferi.se/index.php/cafe/",
      "org": "knutssonsskafferi.se",
      "vad": "Vi är familjen Knutsson som förra året öppnade café i vår trädgård! Vi serverar allt från kaffe och glass till räksmörgåsar och baskisk cheesecake.; Vi är belägna på Asperö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-283-Liggande-A4.pdf",
      "org": "transdev.se",
      "vad": "283 Hösttidtabell 20260824 - 20261212; 283 Stenpiren- Saltholmen-Asperö-Brännö Rödsten och omvänt — Asperö Norra på alla turer, Asperö Östra på vissa; Asperö Norra 05:34 → Brännö Rödsten 05:38 (4 min)",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "yttre-garden": [
    {
      "url": "https://www.fortifikationsverket.se/om-oss/vart-uppdrag",
      "org": "fortifikationsverket.se",
      "vad": "Det gör vi genom att äga, utveckla och förvalta landets försvarsfastigheter.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/samhalle/sakerhet-och-beredskap/skyddsobjekt.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Ett beslut om skyddsobjekt innebär att obehöriga inte har tillträde till skyddsobjektet; Ett skyddsobjekt är vanligtvis utmärkt med gula skyltar.; förbud mot att bada, dyka, ankra eller fiska",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/natur-och-landsbygd/om-eldningsforbud.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Länsstyrelsen har rätt att besluta om eldningsförbud utifrån lagen om skydd mot olyckor när det råder stor risk för brand i skog och mark.; Beslut om lokala eldningsförbud hittar du på din kommuns webbplats.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/4a622a/contentassets/66a1a996e37b4ecd872d9df8b73a4387/statlig-skog-skyddsvarda-stockholm-objekt.pdf",
      "org": "Naturvårdsverket",
      "vad": "Ett parti med lövskog sträcker sig från den västra stranden, ungefär mitt på ön, nedanför en brant, i nordostlig riktning in mot mitten av ön.; I den sydvästra delen består lövskogen av gamla ekar med inslag av eklågor samt död ved av främst gran.; Av karta från 1800-talets slut framgår att denna del även då var lövträdsdominerad.; I den nordöstra delen övergår lövskogen till en ungskog dominerad av björk och asp.; en del mindre avverkningar har gjorts i anslutning till militära anläggningar som numer är rivna; Rödlistade arter noterade för området är stor klipptuss och mindre hackspett. (PDF, s. 1)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/vagledning-och-stod/skyddad-natur/skyddsvarda-statliga-skogar/",
      "org": "Naturvårdsverket",
      "vad": "Det pågår ett arbete att ge skyddsvärda statliga ägda skogar formellt skydd.; inventeringar som Naturvårdsverket och länsstyrelserna redovisade 2004",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/",
      "org": "Naturvårdsverket",
      "vad": "Förtöj och övernatta något dygn i din båt.; Ta med dig en påse som du kan samla skräp och matrester i för att ta med hem eller slänga i en papperskorg.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/",
      "org": "Naturvårdsverket",
      "vad": "Du får tälta något enstaka dygn i naturen; allemansrätten ger dig ingen självklar rätt att elda. Du har ansvar för att elda på ett säkert sätt, utan att riskera att elden sprider sig",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "Naturvårdsverket",
      "vad": "Koppla hunden när vilda djur har ungar, 1 mars–20 augusti.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/turbatar",
      "org": "nynashamn.se",
      "vad": "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort); Vid Fiskehamnen i Nynäshamn, nära parkeringsplatser och kollektivtrafik, finner du Waxholmsbolagets båtar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/surfa-och-paddla",
      "org": "nynashamn.se",
      "vad": "Hyr en egen kajak eller kom med på en guidad tur. Glöm inte flytvästen bara!",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://nynashamn.se/uppleva/skargard--batliv/batliv",
      "org": "nynashamn.se",
      "vad": "De cirka 300 båtplatserna ligger väl skyddade; Nynäshamns Gästhamn ligger centralt belägen i stadens fiskehamn; I fiskehamnen kan du även enkelt tanka din båt på Nynäshamns enda sjömack; I Nynäshamns gästhamn finns möjlighet att hyra mindre motorbåtar",
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
      "url": "https://www.kayakomat.com/sv/location/62b4ecb11cfae6aacec5e0ef",
      "org": "kayakomat.com",
      "vad": "KAYAKOMAT Nynäshamn Nickstabadet; Kajak och SUP-uthyrning via self service; Flytväst ingår; Uthyrning för korta utflykter på två timmar, upp till flera dagars äventyr.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "tynningo": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-vaxholms-stad/tynningo-myrholmsmaren.html",
      "org": "havochvatten.se",
      "vad": "Här ser du det senaste resultatet från kommunens provtagning av bakterier i vattnet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Tynning%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Tynningö\" → Tynningö | Vaxholm | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v689.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Höganäs brygga/Norra Tynningö–Östra Tynningö (–Gustavsbergs centrum); Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026 — måndag–fredag Norra Lagnö 10.07 → Gustavsbergs centrum 10.21 och 13.27 → 13.41",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/tynningoleden/",
      "org": "Trafikverket",
      "vad": "Tynningöleden går mellan Lagnö på Värmdö och Tynningö i Stockholms skärgård. Färjeledens längd är 1000 meter lång. Resan med vägfärjan är avgiftsfri.; Du kan även kalla på färjan direkt i appen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/download/18.7540ce651827e350272a8e08/1661434105419/Bilaga%203%20-%20Kulturmilj%C3%B6underlag%20o%20.pdf",
      "org": "vaxholm.se",
      "vad": "snickarmästare Munthe förvärvade Höganäs, den så kallade Fyrkanten år 1874. Han började per omgående arrendera ut mark och sälja avstyckade tomter för sommarhus. Försäljningen ökade efter att ångbåtstrafiken till Höganäs etablerades år 1877.; Som mest hade Tynningö ett tjugotal samtidigt trafikerade bryggor.; Här finns en rik uppsättning av sommarvillor uppförda 1870–1920 i välexponerade lägen på klippor och tomter utmed vattnet till vilka man tog sig med ångbåt.; Tynningö norra delar ligger inom riksintresse för kulturmiljövården (PDF, kap. 02, 03 och 06)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "vaxholm.se",
      "vad": "Badet Myrholmsmaren ligger vid sjön Stora Maren. Badplatsen sköts av Tynningö Idrottsförening som också anordnar simskola varje sommar.; Grillplats med fasta bänkar och lösa bord; Omklädningshytt; Under badsäsongen sker vattenprovtagningar var tredje vecka och detta görs mellan 20 juni och 15 augusti i Stockholms län",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "2A STOCKHOLM — HÖGANÄS — VAXHOLM; GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; Höganäs (Tynningö) — måndag–torsdag Strömkajen 07.45 → Höganäs 08.40, 11.00 → 12.00; lördag 08.30 → 09.20",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h4.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "4A STOCKHOLM — VAXHOLM — RAMSÖSUND — ÅLSTÄKET; GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 12 DECEMBER 2026; Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång — Strömkajen 07.45 → Norra Tynningö 08.59, 11.00 → 12.23; Vaxholm 08.52 → Norra Tynningö 08.59, 12.15 → 12.23",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tynningo.se/information-2/farjeinformation/",
      "org": "tynningo.se",
      "vad": "K–Kallelsetur — turen kallas tidigast 30 minuter före och senast 10 minuter före avgångstid; Räkna med köer på sommaren, speciellt vid storhelger och inför längre ledigheter.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tynningo.se/tynningos-historia/",
      "org": "tynningo.se",
      "vad": "Tynningö klack är en av skärgårdens s k bötesberg; Vårdkasarna bemannades ännu så sent som 1854 under Krimkriget.; Det är möjligt att den delvis stensatta stigen upp till berget användes av bötesvakten.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tynningo.se/foreningar/",
      "org": "tynningo.se",
      "vad": "förvaltar Tynningös stamfastighet; där vi tillsammans bevarar och utvecklar Tynningös kulturlandskap genom miljövänlig fastighetsförvaltning, jord- och skogsbruk",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tynningo.se/information-2/tidtabell-for-buss-och-batar/",
      "org": "tynningo.se",
      "vad": "Tidtabell för buss Norra Lagnö — Gustavsberg 424V och 424H",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "djuro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/hamnskogen-eriksberg.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Hamnskogen-Eriksbergs naturreservat är ett kommunalt reservat som omfattar cirka 35 hektar skärgårdsnatur, i huvudsak skog.; Områdets variation med tät och öppnare skog och vida utblickar över fjärdar ger stora upplevelsevärden.; Bad/badplats; Vandringsled; De som besöker reservatet med bil kan parkera i Björkås eller på två mindre parkeringar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Djur%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Djurö\" → Djurö | Värmdö | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h433.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Djurö; Giltig 17 augusti–12 december 2026; Stavsnäs vinterhamn; Djurönäset; Djurö södra; Djurö kyrka; Djurö skola; Björkås; BYNS GÅRD — måndag–fredag Slussen 08.18, Byns gård 09.20; lördag och söndag dagtid slutar 433 vid Stavsnäs vinterhamn",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Överby; Giltig 17 augusti–12 december 2026 — måndag–fredag Slussen 08.47, Byns gård 09.46; lördag, söndag och helgdag Slussen 09.45, Byns gård 10.44, därefter varje timme",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/kommunochpolitik/kartorochkommunfakta/historia.4.3251048d16e2a7e784837027.html",
      "org": "varmdo.se",
      "vad": "Flottan hade en ankringshamn vid Djurhamn på Djurö redan under Vasatiden.; Under 1600-talet började en uppdelning av den vidsträckta socknen eftersom det var en lång väg för skärgårdsborna att färdas till socknens medeltidskyrka på centrala Värmdölandet. Då bildades Möja och Djurö som annexförsamlingar.; Därefter återstod tre kommuner inom Värmdös område: Värmdö, Gustavsberg och Djurö. År 1974 skedde en sammanslagning av dessa till dagens Värmdö kommun.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/alltomnaturochfriluftsliv/badplatserivarmdo/vitagrindarnadjurohavsbad.4.18c983316e0536cb189a2ae.html",
      "org": "varmdo.se",
      "vad": "Bad i anslutning till en campingplats med sandstrand och gräsytor vid Bruksfladen i Djurhamn på Djurö.; Buss: Hållplats Djurö kyrka. Omkring 200 meters gångväg ner till vattnet.; WC sommartid",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/djurohamn.4.6e5e3cc318a8d4dc3f636190.html",
      "org": "varmdo.se",
      "vad": "Vid Djurö hamn hyr vi ut lokaler och båtplatser till myndigheter som Kustbevakningen, Storstockholms Brandförsvar samt Sjöpolisen; Hamnen är ej tillgänglig för allmänheten.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/byggabomiljo/skargardnaturochparker/natur/hamnskogeneriksberg.4.18c983316e0536cb189c3d6.html",
      "org": "varmdo.se",
      "vad": "Inom området finns flera kulturhistoriska lämningar, fornlämningar och landskapselement",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.djuronaset.com/",
      "org": "djuronaset.com",
      "vad": "25 m Inomhuspool; 37° C Infinitypool; T re olika sorters bastu att välja på, klassisk, ångbastu och ett sanarium",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/hotell/gasthamn/",
      "org": "djuronaset.com",
      "vad": "Gästhamnen på Djurönäset går att lägga till vid året runt.; Gästhamnen har ca 25 platser beroende på storlek på båtarna.; Gästhamnen är bokningsbar på www.dockspot.com; Hamnen är öppen med servicefunktioner som wc, laddström 10A, wi-fi, vatten 20/L per dygn (ta med egen dunk) och bemannad dagtid, tisdag -lördag från den 18:e juni till den 17:e augusti.; fortfarande öppen och bokningsbar på www.dockspot.com fast utan servicefunktioner som wc, vatten, laddström och Wi-Fi; Hamndjup: 2-6 meter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/hotell/kajaker-och-cyklar/",
      "org": "djuronaset.com",
      "vad": "Uthyrningen är öppen under sommaren; Bokning sker via WeXplores hemsida.; Du får karta med tydliga zoner som visar var det är säkert att paddla utifrån din erfarenhet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/restaurang-bar/",
      "org": "djuronaset.com",
      "vad": "Matsalen; Middag, lunch, brunch, hotellfrukost; Sjöboden; Skärgårdskrog öppet sommartid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/varmdo/ica-nara-djuro-1004680/",
      "org": "ica.se",
      "vad": "ICA Nära Djurö Gransbergsvägen 2-4, Djurhamn; Alla dagar 9 - 20; Postombud",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/djuro-moja-namdo/kyrkor",
      "org": "svenskakyrkan.se",
      "vad": "Kyrkan invigdes år 1683; Kyrkan är byggd av liggande timmer på putsad stenfot.; Kyrkan rymmer 150 personer.; Altaruppsatsen är lika gammal som kyrkan, d v s från 1683.; Djurö kyrka är ovanligt rik på oljemålningar.; Votivskeppet som hänger i långhuset, ”Nordstiern”, utfördes 1706.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/platser/3429-djuro-moja-och-namdo-forsamling-djuro-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Kyrkan tillkom under Vasatiden, då Djurhamn var en viktig örlogsbas.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "birka": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bjorko.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Reservatet, som inte är större än 1,6 hektar, ligger på Björkö i Mälaren. I området växer gammal barrskog., Många av träden är äldre än 200 år., I reservat är det förbjudet att, ha okopplad hund, katt eller annat husdjur",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Bj%C3%B6rk%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Björkö\" → Björkö | Ekerö | Trakt (Birka ligger på Björkö), SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/birka-och-hovgarden/",
      "org": "raa.se",
      "vad": "Tack vare skriftliga källor vet vi att Ansgar, en ung benediktinermunk, kom till Birka år 830, Här predikade han under ett och ett halvt år och flera av stadens invånare lät döpa sig. Men Birka blev trots det aldrig ett kristet samhälle, levde stadens hedningar och kristna sida vid sida fram till slutet av 900-talet ;  — Historiska museet i Stockholm har mer än 100 000 fynd från Birka . «Skandinaviens mest livliga handelscentrum» och fyndlistan (England, Frankerriket, Bysans) saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/app/uploads/2023/06/Beslut-Adels%C3%B6-Bj%C3%B6rk%C3%B6-Birka-AB21-RA%C3%84-2021-1675.pdf",
      "org": "raa.se",
      "vad": "ett av landets största gravfält med minst 1600 … gravar (om Hemlanden) ;  — Den tar dig genom ett gravfält med klassiska vikingatida gravhögar, Birkas fornborg och avslutas nära eller intill Ansgarskorset, Guidningen tar ungefär 45-60 minuter och är en promenad på cirka 1-1,5 kilometer . «Tusentals gravar synliga på marken» saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/adelsoleden/",
      "org": "Trafikverket",
      "vad": "Adelsöleden går mellan Munsö och Adelsö på Mälaröarna. Färjeledens längd är 1 000 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.birkavikingastaden.se/om-birka/",
      "org": "birkavikingastaden.se",
      "vad": "Till Birka kom köpmän och hantverkare med varor från hela Europa och andra delar av världen, arabiskt silver, östeuropeiska pärlor, vackra glasbägare, keramik och exklusiva tyger, Under 200 år var Birka en blomstrande tätort, När Birka var som störst hade staden omkring 700-1000 invånare . «Frankiska vapen» och «sidenstoffer» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/hitta-pa-birka/",
      "org": "birkavikingastaden.se",
      "vad": "Välkommen till vår Vikingakrog vid Mälarens strand! Vi använder närproducerade råvaror så mycket det går ;  — Inomhus i restaurangen finns 80 sittplatser och ungefär lika på uteserveringen, Ingen förbokning behövs förutom för grupper på över 20 personer, Barnmeny med köttbullar och pannkakor finns alltid ;  — Under lågsäsong (november–april) är museet och restaurangen stängda",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/resa-hit/",
      "org": "birkavikingastaden.se",
      "vad": "för att garantera din plats ombord på båten rekommenderar vi att du förbokar din biljett ;  — vi säljer enbart paket som inkluderar båtresa tur och retur, guidad visning i fornlämningsområdet och entrébiljett till museet, Kommer du med egen privat båt? Då kan du köpa guidning och entrébiljett till museet separat.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/hitta-pa-birka/gasthamnen/",
      "org": "birkavikingastaden.se",
      "vad": "Under sommarsäsongen finns det både färskvatten, sophantering, dusch och toalett, Tillgång till el: 80 kr, Diesel/Bensin/Gasol: Nej/Nej/Nej, Hamnavgiften betalas till restaraung Särimner ;  — Här finns 40 båtplatser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/2026/birka_tidtabell_stockholm_webb.pdf",
      "org": "stromma.com",
      "vad": "7 MAJ — 25 OKTOBER, 2026, 22 JUN — 9 AUG, 10 — 28 AUG, 21 SEP — 25 OKT, Klara Mälarstrand, Tid på Birka: ;  — TIPS! Under högsommaren är Birka ett populärt utflyktsmål — för att garantera din plats ombord på båten rekommenderar vi att du förbokar din biljett. . Räknat: en tur per trafikdag, dagligen 22 juni–28 augusti, från 21 september bara lördag–söndag; 3 h 15 min på ön (4 h 45 min 29–30 augusti).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/birka-vikingastaden/",
      "org": "stromma.com",
      "vad": "Resa från/till Hovgården måste alltid förbokas, Parkeringsplatser finns vid Hembyggdsgården, sedan är det ca 10 minuters bilresa ner till Hovgårdens Hembyggdsgård ;  — Hovgårdens brygga ligger vid Adelsö kyrka, Särimner båttaxi erbjuder båtresa till Birka från bland annat Lindby brygga, Sandviken, Södertälje och Rastaholm, Minst 3 betalande personer per tur krävs . «Liten lokalbåt, ca 5 min» och «ca 30 min från Stockholm, väg 261» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "lilla-karlso": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.2c30d6f167c5e8e7c0179a/1545313306910/Lilla%20Karls%C3%B6%20SE0340025.pdf",
      "org": "Länsstyrelsen",
      "vad": "i äldre tider kallades Karlsöarna för, Fågelholmarna, då Linné besökte ön sommaren 1741 betade får där ;  — räddades från att försvinna av bankdirektören, Konrad Hellsing år 1943",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "tälta, göra upp öppen eld, föra iland hund, katt eller annat sällskapsdjur, Det har sannolikt aldrig funnits bofasta människor på Lilla Karlsö, Ön har istället utnyttjats säsongsvis för fiske, säljakt och fårbete ;  — Avgång kl. 09.00 från, Återresa och ankomst till Djupvik senast kl. 13.30",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Lilla%20Karls%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Lilla Karlsö\" → Lilla Karlsö | Gotland | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.destinationgotland.se/resa/",
      "org": "destinationgotland.se",
      "vad": "På omkring tre timmar är du framme i Visby ;  — Avgång kl. 09.00 från, Djupvik",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://naturskyddsforeningengotland.se/fastigheter/lilla_karlso",
      "org": "naturskyddsforeningengotland.se",
      "vad": "Turlista Lilla Karlsö 2026, Avgång kl. 09.00 från, Återresa och ankomst till Djupvik senast kl. 13.30, Pris 890 kr / person (minst 4 betalande) - max 6 personer., Förbokning och betalning krävs minst 4 dagar i förväg, Resan erbjuds av Gotland Sea Guides i samarbete med Naturskyddsföreningen Gotland",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://storakarlso.se/resa-till-stora-karlso/turlista-och-priser/",
      "org": "storakarlso.se",
      "vad": "Båten till Stora Karlsö avgår från Klintehamn och båtresan tar ungefär 35 minuter, I priset ingår båtresa t/r samt guidad tur på ön",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "gotska-sandon": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/nationalparker/gotska-sandons-nationalpark.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Sanden täcker hela Gotska Sandön, med undantag av klapperstränder främst i sydväst, Öns högsta punkt, krönet av sanddynen Höga åsen, ligger 42 meter över havet, närmast havet finns de vandrande vita dynerna som förflyttar sig upp till sex meter per år;  — Under Gotska Sandön ligger det fasta berget ungefär 70 meter ner",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/om-oss/nyheter-och-press/nyheter---gotland/2026-01-23-bokning-till-gotska-sandon-ar-oppen.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Båten går onsdagar, fredagar och söndar förutom under midsommarveckan då båten går tisdag, torsdag och söndag;  — Du kan göra dagsturer till Gotska Sandön från Nynäshamn under perioden mellan den 29 maj–21 juni och den 29 juli–30 augusti, Bokning av dagsbesök från Nynäshamn kan göras tidigast sju dagar innan avgångsdagen, 50 platser per avgång är möjliga att boka för dagsturer, Du behöver köpa biljett till turbåten i förväg;  — Du tar dig ut dit med turbåten, M/S Gotska Sandön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Gotska%20Sand%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Gotska Sandön\" → Gotska Sandön | Gotland | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon",
      "org": "Sveriges Nationalparker",
      "vad": "Här finns exempelvis havsörn, lärkfalk och större korsnäbb;  — Sammanlagt har närmare 250 fågelarter setts på ön, Skogshare och nordisk fladdermus är de enda däggdjuren på ön. I vattnet runt ön lever gråsälar, några har också sin enda kända nordiska förekomst här;  — Innanför Säludden finns ett gömsle",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken/tips-och-guider/turbat-och-boende-pa-gotska-sandon",
      "org": "Sveriges Nationalparker",
      "vad": "Turbåten till Gotska Sandön går tre dagar per vecka under sommaren, mellan den 29 maj till den 30 augusti, från Nynäshamn och Fårösund, Resan till Gotska Sandön tar ungefär 3 timmar och 30 minuter från Nynäshamn och 2 timmar och 15 minuter från Fårösund;  — På Gotska Sandön finns ingen hamn",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Det finns alltid två tillsynsmän på plats året runt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/aktiviteter",
      "org": "Sveriges Nationalparker",
      "vad": "Bredsandsslingan tar dig till öns nordvästra del, Leden tar dig hela vägen ner till Tärnudden på öns södra del;  — På Höga Åsen kan vandringen vara krävande i lös sand och stark kupering;  — Myggor, bromsar och knott är däremot fåtaliga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/sevardheter/fyren",
      "org": "Sveriges Nationalparker",
      "vad": "Den norra fyren som invigdes 1859 är ännu i drift och i dag är fyrplatsen statligt byggnadsminne. I fyren finns utställningen Fyrliv., Fyren återinvigdes i juni 2026 efter en renovering;  — I den gamla skolsalen på bottenvåningen finns en utställning om hur Gotska Sandöns bildats och om djurlivet på ön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Det går givetvis bra att besöka Gotska Sandön med egen båt året runt, Det finns ingen hamn så du får ankra utanför på en läsida, Det är ankringsförbud vid Tärnudden",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken/tips-och-guider/tips-for-att-packa-ratt-infor-ditt-besok",
      "org": "Sveriges Nationalparker",
      "vad": "Kom ihåg att ta med mat för en extra dag. Då det finns en risk att turbåten kan bli inställd vid hårt väder., packa max 15 kilo per väska, Tänk på att packa i en väska som tål väta",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/aktiviteter/besok-salarna",
      "org": "Sveriges Nationalparker",
      "vad": "Som mest har över 180 sälar setts samtidigt men normalt ligger tre till fem stycken på stenarna. De går bara upp på stenarna om vågorna inte är för höga. Därför har du bäst förutsättningar att se säl när vädret är stilla., Tänk på att det är tillträdesförbud utanför repen",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/aktiviteter/hoga-asenslingan",
      "org": "Sveriges Nationalparker",
      "vad": "Passa på att bada vid Las Palmas;  — Sanden täcker hela Gotska Sandön, med undantag av klapperstränder främst i sydväst; fiske förbjudet:  — på ett störande sätt orsaka ljud, fiska.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gotland.com/companies/bat-till-gotska-sandon/",
      "org": "gotland.com",
      "vad": "Du tar dig ut dit med turbåten, M/S Gotska Sandön;  — Gotska Sandöns nationalpark förvaltas av Länsstyrelsen Gotland",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "aspo-blekinge": [
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlskrona/",
      "org": "blekingetrafiken.se",
      "vad": "22 juni - 16 augusti, Aspö Djupvik; måndag–fredag Handelshamnen 09.40 → Aspö Djupvik 10.05 ;  — Skärgårdstrafikens båtar trafikerar skärgårdsöarna Hasslö och Aspö under sommaren.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.karlskrona.se/hitta-verksamheter/badplatser/aspo-havsbad",
      "org": "karlskrona.se",
      "vad": "Långgrund sandstrand i skärgårdsmiljö. Stor gräsyta samt lekplats., Ta färjan till badplatsen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Asp%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Aspö\" → Aspö | Karlskrona | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.scb.se/contentassets/7edbcfbb3a87470387d8c95868ecaf04/mi0812_2020a01_sm_mi50sm2301.pdf",
      "org": "scb.se",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/aspoleden/",
      "org": "Trafikverket",
      "vad": "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård. Färjeledens längd är 6700 meter och överfartstiden är cirka 25 minuter. Resan med vägfärjan är avgiftsfri., Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. ;  — Aspöleden går mellan Karlskrona handelshamn och Aspö ;  — Till Drottningskärs kastell kommer man dagligen året runt genom vägfärjan till Aspö.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.aspofolketshus.se/",
      "org": "aspofolketshus.se",
      "vad": "Vår camping är belägen inne på fastigheten och säsongen startar den 1/6 och varar till 31/8. ;  — Ställplatsen ligger beläget mitt på ön Aspö i Karlskrona skärgård för husvagnar och husbilar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.dragso.se/aktiviteter/uthyrning/",
      "org": "dragso.se",
      "vad": "Uthyrning av SUP, Kajak, Kanot, cykel eller motorbåt ;  — består av flera ”nav” som är mötes-, informations- och serviceplatser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lotstornet.se/",
      "org": "lotstornet.se",
      "vad": "Fem hotellrum i det gamla lotstornet och tre rymliga stugor med uteplats, öppet hela året, Tre rymliga stugor på 45 m² med 6 bäddar, kök, dusch/wc och privat uteplats med grill., Hund välkommen i alla stugor!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/drottningskarskastell",
      "org": "visitkarlskrona.se",
      "vad": "Följ med på guidning ;  — På ön finns mataffär, samt restaurang och café sommartid. ;  — 22 juni - 16 augusti ;  — säsongen startar den 1/6 och varar till 31/8",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/drottningskars-kastells-historia",
      "org": "visitkarlskrona.se",
      "vad": "För de stora örlogsskeppen är inloppet mellan Aspö och Tjurkö det enda sättet att nå Karlskrona. ;  — Drottningskärs kastell är en del av världsarvet Örlogsstaden Karlskrona, Själva fastigheten förvaltas av Statens fastighetsverk ;  — Aspö kyrka stod färdig 1891., Aspö kyrka är uppförd i nygotisk stil.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/drottningskars-kastell-aspo",
      "org": "visitkarlskrona.se",
      "vad": "uppfördes i huvudsak under 1600-talets sista årtionden och anses vara en av den svenska fortifikationens främsta skapelser ;  — Följ med på guidning, känn 1600-talets vingslag",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/ark56-leder-vandring-cykel-paddling-och-segling",
      "org": "visitkarlskrona.se",
      "vad": "I Karlskrona finns följande åtta nav längs arkipelagrutten: Hasslö (Garpahamnen), Aspö (Lökanabben), Du väljer själv om du vill uppleva natur och kultur till fots, med cykel, i kajak eller med båt.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/gasthamn-lokanabben-aspo",
      "org": "visitkarlskrona.se",
      "vad": "På ön finns mataffär, samt restaurang och café sommartid. ;  — Till Drottningskärs kastell kommer man dagligen året runt genom vägfärjan till Aspö.",
      "last": "2026-10-10",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/bat-hasslo-aspo-trosso",
      "org": "visitkarlskrona.se",
      "vad": "Turerna utgår från Trossö, Handelshamnen i centrala Karlskrona. Därefter går turen till Djupavik, på ön Aspös västra sida, och sen vidare till Horns brygga på ön Hasslös östra sida.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "sturko": [
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlskrona-skargard/",
      "org": "blekingetrafiken.se",
      "vad": "Handelshamnen–Sturkö; Sturköpendeln har juluppehåll 21 december - 6 januari. Vi hänvisar resenärer till buss linje 123. . Tidtabellsdata på sidan: 17 aug–20 dec 2026 måndag–fredag 5 turer Handelshamnen→Bredavik (06.40, 07.40, 14.40, 15.40, 16.50), 20 min; 22 juni–16 aug 2026 även helger (11.20, 14.40, 16.40, 19.30), 20–25 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.karlskrona.se/globalassets/kommun-och-politik/det-har-ar-karlskrona/dokument/folkmangd-2024.pdf",
      "org": "karlskrona.se",
      "vad": "Folkmängd 2024-12-31; Före detta Sturkö församling; Sturkö + 26 + 13 754 741 1 495",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.karlskrona.se/hitta-verksamheter/badplatser/sturko/",
      "org": "karlskrona.se",
      "vad": "Långgrunt i kustbandet. ;  — The beach at Stensvik, however, is maintained by a nonprofit association and is a lovely swimming beach.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/uttorp.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "Närmast havet och ett stycke inåt land utgörs området av blockiga strandängar och berghällar, enbuskrik utmark, hedmarker och öppna sandfält.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Sturk%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Sturkö\" → Sturkö | Karlskrona | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://caravanclub.se/camping/sturko/",
      "org": "caravanclub.se",
      "vad": "Sturkö camping har en barnvänlig badstrand och stora grönområde för lek och avkoppling. Vill du aktivera dig finns cyklar för uthyrning samt kajak och sup",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/karlskrona/ica-nara-sturkohallen-1003743/",
      "org": "ica.se",
      "vad": "Butiken öppet: Alla dagar 9 till 19 ;  — Open all year round in the mill warehouse ;  — The bakery is open on Saturdays year-round",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitblekinge.se/en/sturko-a-picturesque-island",
      "org": "visitblekinge.se",
      "vad": "Between the Ekenabben pier and the island of Tjurkö, the remains of six deliberately scuttled ships from the seventeenth and eighteenth centuries rest on the bed of Djupasund.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/en/caferunda-pa-sturko-blekinges-storsta-o",
      "org": "visitkarlskrona.se",
      "vad": "The second nature reserve is located at Uttorp and is significantly larger and more popular. It features marked hiking trails, wind shelters, outhouses, and picnic areas.; Beautiful bike paths are marked with signs all around the island, including the Bredavik Loop, Uttorp Loop, Svärmhall Loop, and others.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/en/guest-harbour-ekenabben-sturko",
      "org": "visitkarlskrona.se",
      "vad": "It takes about 25 minutes by car to Karlskrona, about 30 kilometers from Karlskrona.",
      "last": "2026-10-10",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/en/sturko-camping",
      "org": "visitkarlskrona.se",
      "vad": "on the south of Sturkö, in a sheltered bay lies Sturkö campground",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/en/sturko-kvarncafe-kvarnmagasinets-pizzeria",
      "org": "visitkarlskrona.se",
      "vad": "Open all year round in the mill warehouse, the mill itself, with café, is only open during the summer.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "bla-jungfrun": [
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/nationalparker/bla-jungfrun.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "I den frodiga ädellövskogen söder om toppen växer en ymnig flora och sällsynta lavar. Lövskogen är hem för en rad ovanliga skalbaggar. Ön har också ett rikt fågelliv med arter som havsörn, skärpiplärka och tobisgrissla. ;  — På Blå Jungfruns västra sida finns en klapperstrand med rundslipad sandsten och granit",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Bl%C3%A5%20Jungfrun",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Blå Jungfrun\" → Blå Jungfrun | Oskarshamn | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/4ac67d/globalassets/nfs/2014/nfs-2014-8.pdf",
      "org": "Naturvårdsverket",
      "vad": "Tillstånd krävs dock inte för övernattning högst en natt i följd på, anvisad plats under perioden 20 juni–20 augusti, uppföra enklare anläggning för övernattning vid Sikhamn, sätta upp tält, vindskydd eller liknande anordning ;  — Mellan 27 juni och 16 augusti kan ni övernatta en natt i vindskydd på Blå Jungfrun. Det finns plats för 8 personer, fördelat på 2 vindskydd., Vindskydd: Ingen kostnad för att övernatta.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/att-gora-i-parken/sevardheter/labyrinten-trojeborg",
      "org": "Sveriges Nationalparker",
      "vad": "Hur länge labyrinten har legat där på klippan är det ingen som vet, inte heller vem som lagt den eller varför, Labyrinten fanns på plats när Carl on Linné besökte ön 1741, Ofta gick man i dem som en rit — för fruktbarhet, god fiskelycka eller ett stilla hav på hemvägen, nära entrén Nedre Västra Stenbrottet ;  — skada labyrinten",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark",
      "org": "Sveriges Nationalparker",
      "vad": "Blå Jungfruns nationalpark är en isolerad ö i Kalmarsund med branta klippor, blockterräng och höjder som reser sig över havet, Öns har fått sin runda form av inlandsisen, Under istiden bildades också öns många jättegrytor ;  — Redan på 1400-talet omgavs ön Blå Jungfrun med magiska föreställningar om häxor och trolldom, Själva urberget är anledningen till att ön blivit skyddad som nationalpark. Graniten dominerar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Turerna arrangeras av Solkustturer. Båtresan tar cirka 1,5 timme. ;  — Högsäsong: 27 juni-27 augusti, kl 9-15.15 (3 tim och 15 min på Blå Jungfrun), kl 9-16.15 (4 tim och 15 min på Blå Jungfrun) ;  — är det färre än 20 bokade ställs turen in ;  — ca 15% av turerna får ställas in",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/att-gora-i-parken/aktiviteter/bla-jungfrun-runt",
      "org": "Sveriges Nationalparker",
      "vad": "Den här vandringsleden tar dig runt hela Blå jungfrun. Du passerar sevärdheter som Jättegrytan, Stensliperiet, labyrinten Trojeborg, grottan Kyrkan och upp på toppen. Du kan starta din vandring från alla tre entréerna. ;  — Lervik, som är den vanligaste platsen, Sikhamn och Nedre västra stenbrottet ;  — Vandringen är 3,5 km och går över toppen som ligger 86m över vattenytan",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.jungfruturer.se/",
      "org": "jungfruturer.se",
      "vad": "Lör den 6 Juni startar officiellt säsongen 2026 från Byxelkrok på Öland., Dagliga turer Juli - Aug, Ordinarie avgång kl 8.45-14.00, Är det färre än 15 bokade ställs turen in., officiellt årets säsong avslutad",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/kopia-på-när-ställs-turen-in",
      "org": "solkustturer.se",
      "vad": "Historia om de nordiska folken, från 1555 talar ärkebiskopen och kartografen Olaus Magnus om ön Jungfrun som en plats där nordiska häxor under vissa tider av året lär hålla möten, Blå Jungfrun finns även inritad i Olaus Magnus sjökort Carta Marina från år 1539",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/_files/ugd/046547_2f4115c8d26147979f40538cdd1e2a95.pdf",
      "org": "solkustturer.se",
      "vad": "fyller 100 år som nationalpark ;  — Båten avgår från Ölandskajen i Oskarshamns hamn på fastlandet och från Södra piren i Byxelkroks hamn på Öland, Landstigning sker direkt mot klipporna, eftersom det inte finns några bryggor på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/viktigt-att-veta",
      "org": "solkustturer.se",
      "vad": "Turer till Blå Jungfrun bör man förboka eftersom de alltid är fullsatta vid bra väder ;  — Avvikelser från Turlista informeras på hemsida eller mejl kvällen innan avsedd tur innan kl 18 undantagsvis samma morgon",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/kopia-på-mytologi",
      "org": "solkustturer.se",
      "vad": "går över toppen som ligger 86m över vattenytan, det är starkt rekommenderat att använda bra vandringsskor och ta med vatten att dricka ;  — stora delar av ön är oskyddad från sol",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/kopia-på-labryrinten",
      "org": "solkustturer.se",
      "vad": "Det finns plats för 8 personer, fördelat på 2 vindskydd, Av säkerhetsskäl ska mat för ett extra dygn alltid tas med",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/general-8",
      "org": "solkustturer.se",
      "vad": "Hundar är varmt välkomna både ombord (dock ej under däck) och ute på Blå Jungfrun ;  — medföra okopplad hund",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/general-4",
      "org": "solkustturer.se",
      "vad": "tar parkvakter emot er och hänvisar er till plats för information på Svenska eller Engelska, Den obligatorista informationen fokuserar på säkerhet ;  — för en kostnad av 100 kr/person!, Då förlängs vistelsen på ön till hela 5h 15min!",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "hemson": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Hems%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hemsön\" → Hemsön | Härnösand | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://mittharnosand.se/en/experience/boating/natural-harbors-and-beaches",
      "org": "mittharnosand.se",
      "vad": "Hultoms brygga is located on northern Hemsön and, as the name suggests, there is a jetty here. There is also a toilet and sauna.",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/hemsoleden/",
      "org": "Trafikverket",
      "vad": "Hemsöleden går mellan Strinningen och Hemsön vid Höga kusten i Västernorrlands län. Färjeledens längd är 540 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri. ;  — Till Hemsön går det bilfärja varje dag. Under sommaren går den mer frekvent, en gång varje hel- och halvtimme. Färjan är avgiftsfri och avgår från Strinningen. ;  — ca 20 min från vardera",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/skargard/farja",
      "org": "hogakusten.com",
      "vad": "Hemsön är en stor ö i södra delen av Höga Kusten. Det mest populära besöksmålet på ön är ;  — Hemsön ligger mittemellan Härnösand och Höga Kusten bron, ca 20 min från vardera. ;  — Åren 1953-1957 uppfördes batteriet vid Storråberget ;  — Sedan 2009 drivs Hemsö fästning av oss, I dag får vi varje år välkomna över 30 000 besökare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/hemso-fastning",
      "org": "hogakusten.com",
      "vad": "Hemsön ligger mittemellan Härnösand och Höga Kusten bron, ca 20 min från vardera. ;  — Till Hemsön går det bilfärja varje dag. Under sommaren går den mer frekvent, en gång varje hel- och halvtimme. Färjan är avgiftsfri och avgår från Strinningen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/hultomsberget",
      "org": "hogakusten.com",
      "vad": "där det finns en övernattningsstuga. Stugan har en kamin, en våningssäng och en solcellspanel. Utanför finns en fin eldplats med ved på plats. . Ingen camping på Hemsön gick att belägga; Hemsö fästnings boendetips listar bara campingar på fastlandet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/naturupplevelse/",
      "org": "se.hemsofastning.se",
      "vad": "stiger kusten 100 cm på 100 år ;  — från platsen breder havet och Ångermanälvens utlopp ut sig nedanför ;  — Från toppen är det utsikt hela vägen från Högbonden till Högakustenbron.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/guidade-turer/",
      "org": "se.hemsofastning.se",
      "vad": "En tur nere i anläggningen tar drygt en timme, de gigantiska 15,2 cm torndubbel pjäser(kanoner) som kröner bergets topp, ett helt litet samhälle nere i berget på 5000 kvm, verkstäder, storkök, sjukvårdsavdelning, logement ;  — Sveriges bäst bevarade kustförsvarsanläggning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/bad/",
      "org": "se.hemsofastning.se",
      "vad": "Sågsand, En trevlig badplats på Hemsön endast 9 km från Hemsö fästning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/",
      "org": "se.hemsofastning.se",
      "vad": "Därför driver vi hela verksamheten med både guidningar och restaurang ;  — Våra öppettider är från och med måndagen den 17 augusti, vår buffé serveras 11.00 til 16.00 ;  — avslutas direkt på den nybyggda restaurangens farstukvist",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/hur-gor-jag/",
      "org": "se.hemsofastning.se",
      "vad": "Biljett till guidad tur köper du i entrén som du hittar i direkt anslutning till parkeringen., Parkering, Den är fri och det finns plats även för husbilar och husvagnar. ;  — förbokade grupper året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/omradet/",
      "org": "se.hemsofastning.se",
      "vad": "Pjäserna tillverkades av Bofors på beställning av Kungen av Siam (nuvarande Thailand), pga andra världskrigets export restriktioner så stannade pjäserna i Sverige, tre av dem landade på Bungenäs (Gotland) och tre hos oss på Hemsön, Pjäserna användes från 1956 till anläggningen stängdes. ;  — Värnpliktiga vid KA 5 i Härnösand gjorde 5 månader av sin militärtjänstgöring på Hemsön ända fram till 1989, 1992 stängdes Hemsö Fästning för gott.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "faro": [
    {
      "url": "https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar",
      "org": "gotland.se",
      "vad": "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand, Skyltning mot badplatsen saknas, men badplatsen nås till fots från Fårö fyr.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/digerhuvud.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Den gotländska berggrunden är till stor del uppbyggd av korallrev som bildades i ett tropiskt hav för cirka 430 miljoner år sedan, kunde de stå kvar som isolerade stenpelare — raukar, förstöra eller skada fast naturföremål eller ytbildning genom att exempelvis knacka fossil ur raukar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/langhammars.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "De ståtliga raukarna på stranden vid Klajvika är utan tvekan de mest fotograferade raukarna på Gotland. Raukarna finns även avbildade på baksidan av den svenska 200 kronorssedeln., Det 480 hektar stora naturreservatet, På strandsluttningen ovanför Klajvika står ett drygt 50-tal raukar, av vilka några är mer än 8 meter höga",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/gamla-hamn.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "är namn på den så karaktäristiska rauken som står i reservatet, Naturreservatet Gamla hamn omfattar dels en mot nordväst utskjutande klippudde vid den södra änden av Lautervik, ligger ett 15-tal gravar som sannolikt är från vikingatid, Den brukar kallas S:t Olofs kyrka, Gamla hamn ligger drygt 4 km nordväst om Fårö k:a.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=F%C3%A5r%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Fårö\" → Fårö | Gotland | Natur- och terrängnamn (mittpunkt), SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/",
      "org": "Trafikverket",
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
      "last": "2026-09-30",
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
      "url": "https://verktygsladan.gotland.com/companies/broa-kiosken-faro/",
      "org": "verktygsladan.gotland.com",
      "vad": "Vid Broa Kiosken hittar du Fårö cykeluthyrning.;   — Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand.;  — Badplatsen Norsta Aurar",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "trysunda": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.8cd5a1b19362fb4fc22cdc/1732538244407/Trysunda.pdf",
      "org": "Länsstyrelsen",
      "vad": "Till Trysunda kan du åka med passagerarbåten M/F Ulvön, från Köpmanholmen, 30 km söder om Örnsköldsvik, Sommartid går den varje dag, under vintern är det färre, Naturreservatet Trysunda är 1052 hektar stort, varav, 378 hektar är land;  — Köra motordrivet fordon på land. Nyttotrafik av boende på Trysunda samt statliga eller kommunala tjänstemän är dock tillåten, Nuförtiden bor bara några personer året om på ön, men sommartid kommer det många sommargäster och turister",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/naturreservat/trysunda.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Här finns flera fina stigslingor som passerar mysiga vikar, klippstränder och utsiktspunkter, Rundan till Björnviken är ganska lättgången, Stigrundan på västra delen av ön är mer kuperad och utmanande;  — Från fiskeläget går en stig upp till Kapellberget",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/varldsarvet-hoga-kusten.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Landet i Höga Kusten/Kvarkens skärgård stiger med 8-8,5 millimeter per år, Så den landhöjning som vi märker av är numera bara 5 millimeter per år, Höga Kusten blev isfritt för ungefär 10 500 år sedan;  — Trysunda hette från början Trijzundsön genom att tre öppna sund gick ihop. Genom landhöjningen är numera bara ett sund öppet.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Trysunda",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Trysunda\" → Trysunda | Örnsköldsvik | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.hogakusten.com/en/experiences/nature-outdoor/archipelago/ferry-ulvon",
      "org": "hogakusten.com",
      "vad": "If you're going to Trysunda island you will have to travel with;  — Turlista 14 sep - 31 okt 2026, * Turen går endast vid förbokade biljetter; Köpmanholmen 08.15 → Trysunda 08.50, 15.40 → 16.15, 11.30 → 12.10, 16.15 → 16.50;  — Alla våra turer till Strängöarna, Trysunda och Ulvön utgår från Köpmanholmens färjeläge",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/en/trysunda-guest-harbour",
      "org": "hogakusten.com",
      "vad": "Trysunda guest harbour, Hamndjup: 3-7 m, bastu/dusch/toalett, bojförtöjning ca 25 platser",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/en/trysunda-vandrarhem-skargardscafe",
      "org": "hogakusten.com",
      "vad": "homemade refreshments (fika) and meals, and a small grocery store",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/trysunda",
      "org": "hogakusten.com",
      "vad": "Från fiskeläget går en stig upp till Kapellberget där du kan skåda kontrasterna;  — Vid Trappberget och i Kapellbergets norra brant går, sandsten i dagen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.mfulvon.se/turlistor",
      "org": "mfulvon.se",
      "vad": "Turlista 14 sep - 31 okt 2026; turerna till Trysunda går fram och tillbaka från Köpmanholmen, medan Ulvöturerna går via Strängöarna och Fjären",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.mfulvon.se/om-oss",
      "org": "mfulvon.se",
      "vad": "Örnsköldsviks Hamn & Logistik bedriver skärgårdstrafik i Örnsköldsviks kommun och trafikerar öarna Ulvön, Trysunda och Strängöarna, Våra båtar ut i skärgården är m/f Ulvön och m/f Minerva",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.mfulvon.se/bra-att-veta",
      "org": "mfulvon.se",
      "vad": "Boka gärna din biljett i förväg, När biljetten är köpt är din plats ombord garanterad;  — 3 stycken 4-bäddsrum, 4 stycken 2-bäddsrum",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/ornskoldsvikssodra/natra-sidensjo/trysunda-kapell",
      "org": "svenskakyrkan.se",
      "vad": "Kapellet är byggt av liggande timmer, Målningarna i kapellet är utförda av Olof Gåhlin, År 1711 då målningarna gjordes, Västra väggen skildrar S:t Göran som bekämpar draken;  — Nyckeln hänger på sidan, välkommen in.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trysunda.se/upplev-pa-on/fiskemuseum/",
      "org": "trysunda.se",
      "vad": "Nyckeln hänger på sidan, välkommen in.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trysundavandrarhem.se/",
      "org": "trysundavandrarhem.se",
      "vad": "Säsong öppet, 8 Maj - 13 Sept 2026, I butiken kan du köpa allt, från enklare basvaror till glass",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trysundavandrarhem.se/bo",
      "org": "trysundavandrarhem.se",
      "vad": "Tältplats intill vandrarhemmet kostar 150kr/natt därmed har man tillgång till vandrarhemmets faciliteter så som kök och toaletter;  — Det är fint att tälta vid Björnviken och på norra sidan av ön. Men tänk på att det är förbjudet att göra upp eld på andra platser än i iordninggjorda eldstäder",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trysundavandrarhem.se/bat",
      "org": "trysundavandrarhem.se",
      "vad": "Här finns bastu, grillplatser, dusch, elektricitet, färskvatten, café, butik, sopmaja, turistinformation, tvättmaskin och WC",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trysundavandrarhem.se/sk%C3%A4rg%C3%A5rdscaf%C3%A9t/",
      "org": "trysundavandrarhem.se",
      "vad": "Vi erbjuder mat och fika i vårt skärgårdscafé, Frukost måste, förbokas;  — I butiken kan du köpa allt, från enklare basvaror till glass, 8 Maj - 13 Sept 2026",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "hano": [
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/solvesborg-skargard/nogersund-hano/",
      "org": "blekingetrafiken.se",
      "vad": "Hanö är ett mycket populärt utflyktsmål med cirka 30 000 besökare årligen, Gå ombord på M/F Vitaskär i Nogersund och 25 minuter senare;  — Skyddsår: 2017, utvidgning 2024, sedan 1830-talet har ön haft en fast befolkning, Ön är ett restberg, som formades i ett tropiskt klimat för ett par hundra miljoner år sedan;  — Skyddet omfattar hela ön förutom Hanö läge och fyrområdet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/",
      "org": "blekingetrafiken.se",
      "vad": "Mellan Nogersund och Hanö finns skärgårdstrafik året runt;  — Öppet dagligen under sommaren, Glasskiosken i hamnen håller öppet under högsäsong;  — Gästhamn är bemannad 1 april till 30 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hano.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "Idag finns en av Sveriges största avenbokskogar på Hanös södra delar. Mot norr tar öppna gräsmarker, buskmarker och hällmarker vid, Det finns också dovhjortar på ön;  — På Hanös högsta berghäll (60 meters stigning från havet) står det 16 meter höga fyrtornet, som restes mellan 1904 och 1906, Det är en av de ljusstarkaste fyrarna i Östersjön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Han%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hanö\" → Hanö | Sölvesborg | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://fiskybusiness.nu/vandrarhemmet-hanouml.html",
      "org": "fiskybusiness.nu",
      "vad": "är ett litet vandrarhem med totalt 20 st bäddar fördelat på fem rum och två stugor, Sängkläder, handduk och städning av rummet ingår i priset, augusti 2026 -Maj 2027, bokningsförfrågan via mail",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fiskybusiness.nu/hanouml-hamnkrog.html",
      "org": "fiskybusiness.nu",
      "vad": "stängt för säsongen 2026, vi är Hanös enda restaurang, Fisk n Chips, Krögarspätta, Vi har  fullständiga rättigheter;  — Öppet dagligen under sommaren",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/g%C3%B6ra/sev%C3%A4rdheter-33705523",
      "org": "hano.nu",
      "vad": "15 sjömän ur flottan fick sina gravar William Miller och Clifford Williams är två av dem, Det stora träkorset restes först 1973 i samband med att en engelsk fregatt besökte ön;  — På den norra delen finns en handikappvänlig stig som tar dig till Bönsäcken och",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/g%C3%B6ra/vandra-33709369",
      "org": "hano.nu",
      "vad": "Vandra på de väl utmärkta vandringslederna runt hela Hanö, På den södra sidan vandrar du på lite mer krävande stigar genom trolsk avenbokskog;  — Den geologiska stigen är en av flera leder på Hanö. Den tar dig från hamnen upp på bergets topp",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/g%C3%B6ra/bada-33709445",
      "org": "hano.nu",
      "vad": "I hamnen finns möjlighet att ta ett dopp från Giselas brygga och simma ut till flotten, Ca 5 minuters promenad norrut från hamnen finns en liten badstrand med brygga. Rekommenderas för barnfamiljer, På öns östra sida, hittar du klippbadet Vindhalla. Det tar ca 30 minuter att promenera dit",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/bo-33719234",
      "org": "hano.nu",
      "vad": "Fyrvaktarbostaden ägs numera av Hanö Hamn- och Byalag, Där finns två lägenheter att hyra med två rum och kök. I varje lägenhet finns 4 bäddar, Lägenheterna hyrs ut veckovis, långhelg eller kortvecka",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/hamnen-33705539",
      "org": "hano.nu",
      "vad": "Gästplatser: 75 i hela hamnen utom i färjeläget dagtid. Det går inte att boka båtplatser, Hamndjup: 2-4 m, Gästhamn är bemannad 1 april till 30 september. Servicebyggnad med bastu, duschar, toaletter och tvättmaskin. Latrintömning erbjudes. Ingen försäljning av bensin eller diesel., Förtöjning: Fast akterförtöjning, Hamnen drivs av Hanö Hamn- och Byalag;  — WIFI is available in the harbor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/%C3%A4ta-33688902",
      "org": "hano.nu",
      "vad": "I hamnen finns en liten lanthandel som har öppet under högsäsong, Här kan man köpa basala livsmedel och hushållprodukter samt nybakade frallor på morgonen;  — Man får inte samla döda grenar att elda, så ta med dig egen ved eller kol om du vill grilla",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "svartloga": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Svartl%C3%B6ga",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Svartlöga\" → Svartlöga | Norrtälje | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/svartloga---rodloga.pdf",
      "org": "norrtalje.se",
      "vad": "Den första noteringen om fast bosättning på Svartlöga är från år 1576.; Bebyggelsen har varit belägen på samma plats sedan ön koloniserades, på den sydöstra sidan av ön.; Det står dock klart att det var strömmingsfisket ute på fiskeskärden, säljakten och sjöfågel och dess ägg som var huvudnäring.; Den sista turen ut till havsbandet var år 1928.; År 1928 fick ön en regelbunden ångbåtstrafik (Norrtälje kommun, Kulturmiljöutredning nr 4, 2016)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 — 16 AUGUSTI 2026; 26A STOCKHOLM — VAXHOLM — NORRSUND — RÖDLÖGA; Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00. — tur 2601 måndag–torsdag Strömkajen 09.00, Svartlöga 12.40b; tur 2602 Svartlöga 15.15, Strömkajen 19.00",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 1 OKTOBER 2026 — 12 DECEMBER 2026; 28A FURUSUND — ÖSTERNÄS — SÖDERÖRA — RÖDLÖGA — onsdag tur 2819 Furusund 14.10, Svartlöga 14.55; fredag, lördag och söndag Furusund 10.05, Svartlöga 11.50; lördag retur tur 2852 Svartlöga 13.10, Furusund 15.00",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 — 18 JUNI 2026 OCH 17 AUGUSTI 2026 — 1 NOVEMBER 2026 — tur 2621 måndag–torsdag Strömkajen 08.45, Svartlöga 12.40b; lördag tur 2651 08.45–12.40b, retur tur 2652 Svartlöga 14.15, Strömkajen 18.15",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.explorearchipelago.com/sthlm/outer-archipelago/svartloga",
      "org": "explorearchipelago.com",
      "vad": "offers over a 10 km of marked trails; On the island there is a small shallow sandy beach and several rocky beaches, both on the north side and by the village harbour.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lassashagar.se/lassas-hagar/",
      "org": "lassashagar.se",
      "vad": "Numera finns det bara 1 bofast öbo men drygt 100-talet fritidsfastigheter, främst koncentrerade till Svartlöga by.; Med undantag av en och idegran trivs inte barrträden på ön.; Den är lummig med omväxlande lövskog och ängar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lassashagar.se/",
      "org": "lassashagar.se",
      "vad": "Det 5 hektar stora arboretet, som ligger i en skyddad sänka, hyser dels en samling av cirka 2500 exotiska träd, dels en vattenträdgård baserad på ett tiotal grävda dammar. Tonvikten ligger på släkterna ekar, magnolior, lönnar och rhododendron.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lassashagar.se/hitta-hit/",
      "org": "lassashagar.se",
      "vad": "Att ta sig från Ångbåtsbryggan på Svartlöga där Waxholmsbåtarna angör är det sedan en promenad om ca 15 minuter, 1,3km plan och fin väg att gå till Lassas Hagar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lassashagar.se/pa-gang-pa-lassas-hagar/",
      "org": "lassashagar.se",
      "vad": "Vi öppnar igen 15 maj 2027!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lassashagar.se/uthyrning/",
      "org": "lassashagar.se",
      "vad": "ALEVIK Uthyres v 26-32 2027; Huset är 15 kvm med en nästan lika stor veranda i söderläge.; Fullt utrustat hus med bland annat köksutrustning, gasolspis, gasolkylskåp och gasolvärme.; Uthyres lördag-lördag med incheckning kl 14.00 och utcheckning kl 12.00. Kostnad: 5500kr/vecka inkl gasol.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/svartloga/",
      "org": "stockholmslansmuseum.se",
      "vad": "Svartlöga var en av få skärgårdsöar som klarade sig från ryssarnas härjningar 1719. Grunden runt ön är förrädiska och enligt traditionen skrämde öns säljägare bort inkräktarna med sina bössor.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "visingo": [
    {
      "url": "https://www.jonkoping.se/trafik--stadsplanering/planarbete-och-samhallsbyggnad/kommundelsutveckling/visingso-kommundelsutveckling",
      "org": "jonkoping.se",
      "vad": "Visingsö är Vätterns största ö med en längd av 14 km och en största bredd på 3 km. Den ligger 3 mil norr om Jönköping och 6 km väster om Gränna; Visingsö är tillsammans med Gränna, Jönköpings kommuns främsta turistattraktion med över 100 000 besökare per år",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.jonkoping.se/trafik--stadsplanering/resa-och-kollektivtrafik/visingsotrafiken-farja-mellan-granna-och-visingso/turlista-tidtabell-farjan-granna---visingso",
      "org": "jonkoping.se",
      "vad": "8/6–30/8 körs turerna dagligen; Vinterturlista 2026; Gäller från 2026-09-21 till 2026-12-31. Räknat ur tabellerna: 14 turer från Gränna varje dag året runt plus 8 stjärnmarkerade turer (dagligen 8/6–30/8, fre–sön 1/5–7/6 och 4/9–20/9) samt tidiga vardagsturer och kvällsturer",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.jonkoping.se/trafik--stadsplanering/resa-och-kollektivtrafik/visingsotrafiken-farja-mellan-granna-och-visingso",
      "org": "jonkoping.se",
      "vad": "Här hittar du information om färjan mellan Gränna och Visingsö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.jonkoping.se/fritid-kultur--natur/friluftsliv-natur-och-parker/friluftsliv/batplatser-hamnar-och-gasthamnar",
      "org": "jonkoping.se",
      "vad": "Gästhamn på Visingsö, Djupet vid gästplatserna är just nu grunt. Från 0,6 m till 1 m., Färskvatten Toalett Dusch Eluttag Latrintömning Trailerramp",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Visings%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Visingsö\" → Visingsö | Jönköping | Natur- och terrängnamn (mittpunkt), SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/jonkopings-lan/ekskogen-pa-visingso",
      "org": "sfv.se",
      "vad": "1975 var ekarna redo att avverkas, marinchefen erbjöds ekarna men avböjde; Statens fastighetsverk har bland annat lagt trägolv från Visingsö i Östra stallet i Riksantikvarieämbetets lokaler i Stockholm och i ambassaden i Pretoria; Eken återfinns också i de tunnor där Mackmyra lagrar sin whisky",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/visingsoleden/",
      "org": "Trafikverket",
      "vad": "Visingsöleden går mellan Gränna och Visingsö i Vättern i Jönköpings län och är en betalled. Färjeledens längd är 6200 meter",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://jkpg.com/upplevelser/visingsborg",
      "org": "jkpg.com",
      "vad": "Redan från färjan kan du urskilja Visingsös slottsruin Visingsborg; på grund av rasrisk är det inte tillåtet att gå in i ruinen; Under sommarhalvåret anordnas det bland annat teaterföreställningar och konserter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://jkpg.com/upplevelser/remmalag-pa-visingso",
      "org": "jkpg.com",
      "vad": "Remmalagen är Visingsös populära hästdroskor som har skjutsat besökare runt den vackra ön i över 100 år",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://jkpg.com/upplevelser/visingso-borg-i-nas",
      "org": "jkpg.com",
      "vad": "Borgen dateras till 1100-talets första hälft; Ruinen anses vara en av Sveriges äldsta icke-kyrkliga stenbyggnader; Flera av landets kungar dog också på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://jkpg.com/farja-fran-granna-till-visingso",
      "org": "jkpg.com",
      "vad": "trafikeras med två olika färjor; Braheborg och Ebba Brahe; Platsbeställt fordon måste vara vid färjan minst 5 minuter före avgång; Närheten till E4:an gör att det är lätt att ta sig till Gränna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://jkpg.com/hitta-hit",
      "org": "jkpg.com",
      "vad": "till andra platser i kommunen såsom Huskvarna, Gränna och Taberg",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vattern.org/om-vattern/",
      "org": "vattern.org",
      "vad": "sjön är en näringsfattig klarvattensjö med ett för svenska sjöar enormt siktdjup (15-16 m) (Vätternvårdsförbundet, kansli hos Länsstyrelsen Jönköpings län)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visingsopensionat.se/",
      "org": "visingsopensionat.se",
      "vad": "Pensionatet är öppet för boende året runt; Husdjur är hjärtligt välkomna till oss",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitvisingso.com/bada",
      "org": "visitvisingso.com",
      "vad": "Sandudden; Rökinge brygga ligger, precis som det låter, nedanför Rökinge på öns västra sida; Badplatsen i Näs ligger allra längst ned på Visingsös södra udde",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitvisingso.com/faq",
      "org": "visitvisingso.com",
      "vad": "Remmalagen utgår från Remmalagsplattan, som du hittar strax ovanför färjeläget när du kliver iland på Visingsö. Granne med Visingsö Cykeluthyrning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitvisingso.com/wisings-hotell-konferens",
      "org": "visitvisingso.com",
      "vad": "Wisingsö Hotell & Konferens är Visingsös enda hotell och ligger mitt på Visingsö, 3 km från hamnen norrut",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitvisingso.com/ta-dricka",
      "org": "visitvisingso.com",
      "vad": "Wisingsborgs Trädgård. Härligt prunkande trädgård med anor från 1600-talet. Mitt inne i den härliga trädgården ligger ett Trädgårdscafé och i den anrika ladan i anslutning till trädgården serveras dagens lunch.",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://www.visitvisingso.com/aktiviteter",
      "org": "visitvisingso.com",
      "vad": "I hamnen hittar du uthyrarna som erbjuder mängder av alternativ",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.wisingso.se/vandrarhem",
      "org": "wisingso.se",
      "vad": "Visingsö Vandrarhem ägs & drivs av Wisingsö Hotell & Konferens; Vi har 12 stugor med fyra privata rum i varje stuga; I de två servicebyggnaderna finns två gemensamma kök",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.wisingso.se/restaurang",
      "org": "wisingso.se",
      "vad": "Restaurang Framnäs på Visingsö är en restaurang; i en unik miljö med fullständiga rättigheter",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ven": [
    {
      "url": "https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/landskrona/vens-backafall.html",
      "org": "Länsstyrelsen Skåne",
      "vad": "Det öppna åkerlandskapet avslutas med branta sluttningar ned i havet, så kallade backafall. De är på sina ställen upp till 30–40 meter höga.; Här har du dessutom en fin utsikt över havet med Danmark och svenska fastlandet i fjärran.; Här på Ven har man en av Sveriges största populationer av sandödla.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Ven",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Ven\" → Ven | Landskrona | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/",
      "org": "statistikdatabasen.scb.se",
      "vad": "SCB-tabellen OarEjBro01 (Befolkning och bebyggelse, per ö): Ven 372 folkbokförda år 2020 (hämtat via SCB:s API, sidan är dynamisk)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://backafallsbyn.se/",
      "org": "backafallsbyn.se",
      "vad": "Bo på destilleriet och upplev närheten till havet, promenadstråken och naturen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.houseofven.com/",
      "org": "houseofven.com",
      "vad": "njut den omnämnt goda maten i vår restaurang; Ven Terroir Dining Experience ger er en 7-rätters avsmakningsmeny",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/tips-pa-vad-du-kan-uppleva-pa-ven/",
      "org": "ilandskrona.se",
      "vad": "Backafallsbyn är en av världens minsta familjeägda Pot Still destilleri där allt från mäskning till jäsning, destillering samt ekfatslagring och buteljering sker under samma tak. Destilleriet erbjuder både guidade visningar, whiskyprovningar och destillatprovningar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/tychobrahe-museet/tycho-och-vetenskapen/",
      "org": "ilandskrona.se",
      "vad": "Tycho förlänades ön Hven i Öresund mellan Danmark och Skåne; På Ven anlade Tycho en av Europas första forskningsinstitutioner där man använde sig av empirisk forskning. Anläggningen på ön bestod bland annat av det spektakulära slottet Uraniborg, det underjordiska observatoriet Stjerneborg och en fantastisk renässansträdgård.; Det uppstod dock meningsskiljaktigheter mellan Tycho och det danska hovet år 1597 och Tycho tvingades lämna Danmark.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/mat-och-dryck-pa-ven-2/",
      "org": "ilandskrona.se",
      "vad": "På Ven böljar fält av raps och durum. Klimat och jordmån har lockat till produktion av både rapsolja och whisky.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/",
      "org": "ilandskrona.se",
      "vad": "Ventrafikens färja från Landskrona går året om och tar endast 30 minuter.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/planera-din-resa-till-ven/",
      "org": "ilandskrona.se",
      "vad": "då det är begränsat med övernattningsmöjligheter så rekommenderar vi dig att förboka. Stora delar av Ven är naturreservat och det är därför endast tillåtet att tälta på campingen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/ven-on-for-hela-familjen/",
      "org": "ilandskrona.se",
      "vad": "Nedanför kyrkan hittar ni Kyrkbacken med hamn och sandstrand. Här tar man gärna ett dopp i havet; Här finns också grillplats.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/tychobrahe-museet/besoka-museet/",
      "org": "ilandskrona.se",
      "vad": "September, lördagar och söndagar klockan 09.30 — 14.00; Tillägg för entré till observatoriet Stjärneborg: 20 kr; I visningen ingår inte föreställningen i det underjordiska observatoriet Stjärneborg.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/planera-din-resa-till-landskrona/",
      "org": "ilandskrona.se",
      "vad": "Tågstationen ligger på Östervångsplan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/besok-ven-under-hosten/",
      "org": "ilandskrona.se",
      "vad": "Du kan hyra cykel via Vens cykeluthyrning under hela året.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norreborgshamn.se/",
      "org": "norreborgshamn.se",
      "vad": "Norreborgs Hamn — Gästundersökning 2026; Hamnen är öppen hela året.; Från och med den 1 maj gäller taxa för högsäsong.; Även i år kommer det att finnas en kioskvagn; El finns, men kommer att stängas av på piren.; Dusch och toalett finns i reducerad omfattning.; Vattenposter stängs av när temperaturen medför risk för frysning.; den 39:e i ordningen i gästhamnens historia",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://venshamnkrog.se/",
      "org": "venshamnkrog.se",
      "vad": "Vens Hamnkrog i Kyrkbacken; Nu går Hamnkrogen ner i lite lugnare tempo för säsongen, men vi stänger inte helt dörren.; Vi har öppet året om för arrangemang, event och smakprovningar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ventrafiken.se/tidtabell/",
      "org": "ventrafiken.se",
      "vad": "Överfarten tar cirka 30 minuter; Skeppsbron — Bäckviken; Gäller fr.o.m. 2022-01-01 t.o.m. 2026-12-31; Gäller fr.o.m. 2026-06-27 t.o.m. 2026-08-16 . Tabellen: Landskrona→Ven 06:05 (ej helg), 08:20, 10:00, 11:30, 14:15, 16:00, 17:35, 20:15, 21:30; Ven→Landskrona 05:30 (ej helg), 06:50, 09:10, 10:40, 12:40, 15:00, 16:45, 18:15, 20:55; sommaren 27/6–16/8 sex extra turer i vardera riktningen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ventrafiken.se/",
      "org": "ventrafiken.se",
      "vad": "resenärer med obokade biljetter kan få vänta mycket länge innan de kommer med en båt till eller från Ven",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ventrafiken.se/kontaktuppgifter/",
      "org": "ventrafiken.se",
      "vad": "Åk tåg eller buss till oss! Bussarna stannar precis utanför terminalen och hållplatsen heter Skeppsbron.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "tjaro": [
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlshamn/",
      "org": "blekingetrafiken.se",
      "vad": "Karlshamn–Tjärö, 19 juni - 16 augusti, Karlshamn–Tärnö–Tjärö, 17 augusti - 6 september; Karlshamn 09.45 → Matvik 10.25 → Tjärö 11.05 (80 min), 13.00 → 14.20, 15.50 → 16.55",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tjaro.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "Kommun: Karlshamn, Ön Tjärö ligger i Hällaryds skärgård, Skyddsår: 1976, Areal: 306 hektar, varav 83 hektar land, Ön är inte större än att du kan vandra runt den på några timmar., Just de branta rundslipade hällarna längs kusten är utmärkande för Tjärö., Ekhagar och ädellövskog blandas med enbuskar, hällmarker och klippstränder samt mindre strandängar och gräsmarker.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Tj%C3%A4r%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Tjärö\" → Tjärö | Karlshamn | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://tjaro.com/hotell-vandrarhem/",
      "org": "tjaro.com",
      "vad": "Vi har 125 bäddar fördelat på 48 rum i 9 olika hus., Vi har även två mindre stugor som ligger vackert nära vattnet där man kan bo 4 eller 5 personer.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tjaro.com/farjeavgangar/",
      "org": "tjaro.com",
      "vad": "Färjan tar 15 minuter enkel väg. Färjan går inte att förboka och åker fram och tillbaka tills alla kommit över., Biljett köpes på Tjärö och visas upp på hemvägen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tjaro.com/",
      "org": "tjaro.com",
      "vad": "Tjärö håller öppet mellan den 30 april - 20 september 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tjaro.com/aktiviteter/",
      "org": "tjaro.com",
      "vad": "Långa sandstränder kan vi inte erbjuda, men små fina vikar med sandbotten hittar man allt både i norr, söder och mitt i mellan., I norr har vi Ällingaviken, Pellakrok, på västra sidan av ön har stora gräsytor, Korpaberget där det finns en lång brygga som kallas Korpabryggan, För barnfamiljer är nabben ett populärt ställe där man badar ifrån låga klippor med långgrunt utanför.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tjaro.com/faq/",
      "org": "tjaro.com",
      "vad": "Vi har tio hotellrum. Övriga rum har vandrarhemsstandard., Ja, det finns tältplats på Tjärö. Den ligger vid Korpaberget, centralt på ön., Hundar måste alltid hållas kopplade då Tjärö är ett naturreservat., Meddela oss när ni bokar så vi kan boka in er i hundvänliga rum.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tjaro.com/omtjaro/",
      "org": "tjaro.com",
      "vad": "Alla tre bryggorna ligger vackert i viken Maren. Den största bryggan har 70 markerade platser, och samtliga är med el och vatten. Seglarbryggan består av 10 platser, samtliga med el och vatten., Hamndjup: 1-5m., Förtöjning: Boj / Ankare., Service: Bastu, Dusch, Elektricitet, Färskvatten, Restaurang, Café, Kiosk, WC.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tjaro.com/restaurang-cafe-2/",
      "org": "tjaro.com",
      "vad": "I vår restaurang nere vid vattenbrynet serveras frukost, lunch och på kvällen buffé eller à la carte., är restaurangen helt öppen för frukost, lunch och middag., Det går enbart att boka bord på kvällen hos oss på Tjärö.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ockero": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%96cker%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Öckerö\" → Öckerö | Öckerö | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/naturomraden-och-naturreservat/ockero-naturomrade-och-motionsspar",
      "org": "ockero.se",
      "vad": "Rördammen (1), en av kommunens största våtmarker, enkelbeckasin, näktergal, vattenrall och rörhöna, Vid dammen finns högt uppsatta holkar och i dessa brukar det häcka tornfalk, I vikarna finns vidsträckta klapperstensfält, här växer den sällsynta strandvallmon, Motionsspåret har grusunderlag och är 4600 meter långt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/kommun-och-politik/statistik",
      "org": "ockero.se",
      "vad": "Folkmängd per 2025-12-31, Befolkning per ö, 3569 3498 3559, 12771 12865",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/hjalviks-badplats",
      "org": "ockero.se",
      "vad": "Hjälviks badplats ligger på Öckerö, Sandstrand, gräs och klippor, Toalett (WC och för funktionshindrade), Volleybollplan, Hundförbud från 1 maj till 30 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/honoleden/",
      "org": "Trafikverket",
      "vad": "Hönöleden turlista 2024-10-21 ;  — Röda dagar körs som söndag (tabellen: vardagar 06–18 avgång var 10:e minut, nattetid var 30:e minut) ;  — dygnet runt med täta avgiftsfria turer",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6290__0__LINE__20260817__20261212__392b5cc8-4462-460d-b9ed-07c70df4464b__0%2C0__2808493.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "290 Burö–Göteborg, Gäller 17 aug - 12 dec 2026, Linjen trafikeras av Connect Bus. ; tabellen måndag–fredag: Nils Ericson Terminalen 06.37 → Öckerö färjeläge 07.34, 09.12 → 10.12, 16.21 → 17.20; inga helgturer i tabellen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5206__0__LINE__20260817__20261212__f9ebc54c-e160-4a9f-80a3-948f860fcbd6__0%2C0__2796081.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Landvetter–Göteborg–Lilla Varholmen, Gäller 17 aug - 12 dec 2026; vardagar dagtid t.ex. Drottningtorget 09.28 → Lilla Varholmen 10.06, därefter var 15:e minut ;  — Färjeledens längd är 2500 meter och överfartstiden är 13 minuter. Resan med vägfärjan är avgiftsfri. ;  — Buss 1 tar dig från Hönö färjeläge till Öckerö och Hälsö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Norra skärgården består av tio bebodda öar, Björkö, Fotö, Grötö, Hälsö, Hyppeln, Hönö, Kalvsund, Källö-Knippla, Rörö och Öckerö, Kostnadsfria bilfärjor går från Lilla Varholmen till Hönö och Björkö. Från Hönö kan du fortsätta över broarna till Fotö, Öckerö och Hälsö ;  — Befolkning per ö, 3569 3498 3559 ;  — Hönöleden går mellan Lilla Varholmen och Hönö/Öckerö, Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://ockerohamn.se/gasthamn-o-camping",
      "org": "ockerohamn.se",
      "vad": "Gästhamnen är belägen i sydvästra delen av fiskehamnen, Plats finns för ett 30 tal båtar med ett djupgående upp till 5 meter, Öppen tider 30 april - 30 September med full service, övrig tid med begränsad service, hamnen är bemannad året runt, moderna duschar och toaletter är inkluderat i hamnavgiften, Trådlös bredbandsuppkoppling, Diesel, Mastkran, Badbrygga och bastu vid hamninlopp, öppet alla dagar med öl och, Öckerö Hamn & Fiskareförening",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardshotellethono.se/",
      "org": "skargardshotellethono.se",
      "vad": "Vi har 16 härliga rum på andra våningen där hälften av dem har en uteplats mot havet och hamninloppet ;  — Från Hönö kan du fortsätta över broarna till Fotö, Öckerö och Hälsö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/centrum-for-fiske/",
      "org": "vastsverige.com",
      "vad": "Var tionde svensk yrkesfiskare är bosatt i kommunen, Längs kajerna i Hönö klåva, Öckerö, Rörö och andra hamnar ser man fortfarande en hel del större och mindre fiskebåtar, fiske- och sjöfarttekniskt program, Stora Varv som Ö-varvet, Öckerö båtvarv, Hönö marinservice och Caterpillar ligger i Kommunen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/",
      "org": "vastsverige.com",
      "vad": "Hela året går färjorna från Lilla Varholmens färjeläge dygnet runt med täta avgiftsfria turer ut till Öckeröarna ;  — Öppen tider 30 april - 30 September med full service, övrig tid med begränsad service",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/goteborgsskargardsled/",
      "org": "vastsverige.com",
      "vad": "Leden är 35,3 km och uppdelad i tre olika etapper och två rundslingor, Efter Öckeröbron håller man vänster mot Kanndalen, Leden går över klipporna till Saltas badplats med toa sommartid, Förbi Hummerviken mot Hjälviks badplats med sommaröppen toa, Naturens krafter möter man på Hälsöbron",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "roro": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=R%C3%B6r%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Rörö\" → Rörö | Öckerö | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/naturomraden-och-naturreservat/roro-naturreservat",
      "org": "ockero.se",
      "vad": "Rörö naturreservat breder ut sig över större delen av ön Rörö, Ön karaktäriseras av nästan helt trädlösa hedmarker samt ljung- och gräshedar, På vägen kan du stöta på både får och hästar, som hjälper till att hålla markerna öppna, två dammar, Stora och Lilla Ers vatten, Den hotade stinkpaddan håller också till i dammarna, I blickfånget finns lämningar från, istiden som vidsträckta klapperstensfält ;  — klapperstensfält, rullstenar och jättegrytor som formats under istiden",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/kommun-och-politik/statistik",
      "org": "ockero.se",
      "vad": "Befolkning per ö, Rörö 248 243 244 240 250 250 245 253 252 254 ;  — Under sommarmånaderna fylls området av båtgäster, dagsbesökare och boende, Ön är välbesökt av vandrare, ornitologer och naturälskare",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/gula-skarens-badplats",
      "org": "ockero.se",
      "vad": "För att komma dit tar du dig först till Hälsö. Du kör sedan rakt fram efter Hälsöbron, tills vägen tar slut vid Burö. Ta färjan mot Nordöarna. ;  — Från färjeläget kör mot nordöarna till Burö färjeläge, där bilen ;  — Fordon till/från Rörö lastas i mån av plats",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/nordoleden/",
      "org": "Trafikverket",
      "vad": "Nordöleden går mellan Burö, Knippla, Hyppeln och Rörö i Bohusläns skärgård, längd 3500 meter, restid cirka 18 minuter ;  — Vill du vidare kan du ta en färja från Hälsö (Burö färjeläge) till öarna, Det är möjligt att ta bilen över men en rekommendation är att parkera den vid färjeläget då öarna är små och parkeringsplatserna begränsade",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6290__0__LINE__20260817__20261212__392b5cc8-4462-460d-b9ed-07c70df4464b__0%2C0__2808493.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "290 Burö–Göteborg och omvänt, Gäller 17 aug - 12 dec 2026 ;  — Burö–Rörö, längd 3500 meter, restid cirka 18 minuter ;  — Ordinarie tidtabell, Gäller från 2026-05-25, Burö, Källö-Knippla, Hyppeln och Rörö, Kallelsetur: Beställning av kallelseturer sker till telefonsvararen  — from_city_min: Nils Ericson Terminalen 10.12 → Burö 11.20 → färja 11.35 → Rörö 11.53 = 101 min. 26 ordinarie ankomster till Rörö måndag–fredag 04.53–21.12.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6281__0__LINE__20251214__20261212__1b7d89b9-d2d4-4151-a903-70a45274103d__0%2C0__2628605.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Burö–Öckerö–Hönö och omvänt, Hönö färjeläge, Gäller 14 dec 2025 - 12 dec 2026  — Hönö färjeläge–Burö färjeläge 20–21 min, måndag–fredag varje halvtimme dagtid.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/platser/roro",
      "org": "goteborg.com",
      "vad": "På Rörö Fiskeboa & Krog serveras rätter med tydlig förankring i havet ;  — I Fiskeboa kan ni köpa nykokta kräftor, räkor och fisk av olika slag, Vi har både lunch och middagsservering, På Wilmas så serverar vi fish & chips, Vi använder oss av Kolja, Kommer ni med båt är vi precis vid gästhamnen, Copyright © 2026 Rörö Fiskeboa & Krog",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "hamburgare och gelato",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "en rekommendation är att parkera den vid färjeläget då öarna är små och parkeringsplatserna begränsade ;  — Fordon till/från Rörö lastas i mån av plats",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://rorofiskeboakrog.se/",
      "org": "rorofiskeboakrog.se",
      "vad": "I Fiskeboa kan ni köpa nykokta kräftor, räkor och fisk av olika slag",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/produkter/gasthamn-roro/",
      "org": "vastsverige.com",
      "vad": "I hamnen ligger Ica butik med en café del, Sjöräddningsstationen finns i hamnen och de stora fiskebåtarna har sin hemmahamn på Rörö, I parken finns 4 boulebanor och 1 Beach Volleyplan ;  — Under sommarmånaderna fylls området av båtgäster, dagsbesökare och boende, Tennisbana och boulebana bidrar till ett aktivt sommarliv",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "holmon": [
    {
      "url": "https://www.lansstyrelsen.se/vasterbotten/besoksmal/naturreservat/holmoarna.html",
      "org": "Länsstyrelsen Västerbotten",
      "vad": "Storlek: 25 000 hektar; Mer än något annat är det landhöjningen som orsakar variationsrikedomen. Efterhand som nytt land höjer sig ur havet blir avskilda havsvikar till grunda sjöar, som växer igen och blir våtmarker, kantade av lövträd. Så småningom gör granen entré.; Livet i havet runt Holmöarna präglas av att vattnet varken är salt eller sött.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Holm%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Holmön\" → Holmön | Umeå | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.smhi.se/kunskapsbanken/klimat/vattenstand-och-klimat/landhojning-och-vattenstand",
      "org": "smhi.se",
      "vad": "Längs Bottniska vikens kust, där istäcket var tjockast, är också landhöjningen snabbast, med ett maximum på knappt 10 mm/år i Norra Kvarkenområdet.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/holmoleden/",
      "org": "Trafikverket",
      "vad": "Holmöleden går mellan Norrfjärden och Holmön i Kvarken norr om Umeå.; överfartstiden är 45 minuter; Resan med vägfärjan är avgiftsfri.; bokar du dina kallelseturer via appen Trafikinfo Färjerederiet eller via talsvar på 0771-65 65 65; Fordonsplatser bokas som tidigare på 070-346 48 19.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.umea.se/kommunochpolitik/kommunfakta/umeashistoria/50aravgemensamutveckling/orternaochderashistoria.4.174670ac18f90cfab9a1666a.html",
      "org": "umea.se",
      "vad": "Holmön bröts ut ur Umeå socken 1802; Holmön var en kapellförsamling i Sävar socken men blev en egen landskommun 1925.; Holmöns landskommun var Sveriges till invånarantalet minsta kommun från 1952 fram till sammanslagningen med Umeå kommun 1974",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.umea.se/upplevaochgora/idrottmotionochfriluftsliv/friluftslivochmotion/naturomradenfriluftsomraden/holmon.4.27a2de8b172da059ace20f5.html",
      "org": "umea.se",
      "vad": "Holmön är huvudön i ögruppen Holmöarna, belägen en mil ut i havet i norra Kvarken.; Idag är Holmön den enda ön i Västerbotten med en året runt-befolkning.; på sommaren ökar befolkningen avsevärt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.holmon.se/hamnforeningen/gasthamn/",
      "org": "holmon.se",
      "vad": "I Byviken finns gästhamn med boj-förtöjning direkt till vänster på östra sidan och en flytbrygga på västra sidan.; Besök under dagtid är gratis.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://holmonsbatmuseum.se/om-oss/",
      "org": "holmonsbatmuseum.se",
      "vad": "I december 2021 beslutade Unescos kommitté för tryggande av det immateriella kulturarvet att uppta den nordiska klinkbåtstraditionen på Unescos lista över mänsklighetens immateriella kulturarv.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://holmonsbatmuseum.se/hyr-atervunnen-retrocykel/",
      "org": "holmonsbatmuseum.se",
      "vad": "Cyklarna hyr du via museet under de sommarmånader vi håller öppet. Under den snöfria tiden på vår och höst finns möjlighet att hyra cykel via självbetjäning/lanthandeln.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://holmonslanthandel.se/",
      "org": "holmonslanthandel.se",
      "vad": "Förutom att vara en välsorterad dagligvarubutik fungerar butiken som ombud för Apoteket, Systembolaget, Bussgods och Posten. Vi håller öppet varje dag, året om.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-holmons-prastgard/",
      "org": "svenskaturistforeningen.se",
      "vad": "STF Holmöns Prästgård ligger mitt i den historiska bykärnan på Holmön.; ligger på gångavstånd från färjeläget (1,5 kilometer), är fullt utrustat med dusch, toaletter, bastu och modernt kök",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-stora-fjaderagg-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Transport till Stora Fjäderägg sker dagligen med passbåten Fabella och bokas som ett tillval i samband med att du bokar ditt boende.; Stora Fjäderägg ligger nästan två mil ut i havet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-berguddens-fyrvaktarbostader/",
      "org": "svenskaturistforeningen.se",
      "vad": "I fyrvaktarbostäderna finns varken uppkoppling eller rinnande vatten. Toaletten är utedass, i köken råder självhushåll",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/gora/cykla-2/",
      "org": "visitholmon.com",
      "vad": "Att cykla är det ideala sättet att ta sig runt på Holmön, med dess ca 30 km vägnät.; Det finns möjlighet att ta med egen cykel på Holmöfärjan i mån av plats.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/transport-2/",
      "org": "visitholmon.com",
      "vad": "Hon avgår 5 gånger dagligen på somaren och 4 gånger dagligen övrig tid på året. Om vinterisen blir för tjock tas svävaren Vintergatan i tjänst; Det blir ofta kö till färjan sommartid.; Vid Sävar svänger du av vid den norra avfarten och följer skyltningen mot Norrfjärden/Passbåt Holmön. Restiden från Umeå är 30-40 minuter med bil. Sträckan trafikeras även av busslinje 118/171.; Om parkeringen är full",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/gora/vandra-2/",
      "org": "visitholmon.com",
      "vad": "Holmörundan — 13km — 3,5 tim; Trappudden — 7km — 2 tim; Kammen — 6km — 2 tim; Vedaögern — 4km — 1 tim; Ängesön — 15km — 5,5 tim; Ved brukar finnas vid följande rastställen: Trappudden, Kammen, Kontviken, Klubbsand, Klintviken, Rössgrundbastun, Sikskär och Munkhällan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/gora/damina/",
      "org": "visitholmon.com",
      "vad": "Damina anordnar olika typer av upplevelseutflykter, till exempel besök en väderstation, sälspaning, Holmön Grand Tour",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/sevardheter-2/holmons-batmuseum-2/",
      "org": "visitholmon.com",
      "vad": "Holmöns Båtmuseum håller öppet varje dag under sommaren.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/sevardheter-2/berguddens-fyr-2/",
      "org": "visitholmon.com",
      "vad": "Bergudden ligger vackert placerat på Holmöns västkust och är öns västligaste utpost. Från färjeläget och Byviken är det 3 km ner till fyren.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/bo-2/prastgardens-bed-breakfast-2/",
      "org": "visitholmon.com",
      "vad": "Här finns fem rum med sammanlagt 25 bäddar.; Prästgården Holmön är öppen året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/bo-2/holmons-fiskebastur-2/",
      "org": "visitholmon.com",
      "vad": "Under vårvintern 2017 färdigställdes stugorna på Gåsflötaögern, Sikskär och Västra Rössgrundet, vilka alla nu går bra att övernatta i. Dessa fiskebastur kan nås landvägen.; Det går inte att boka utan först till kvarn gäller. Nyckel finns att hämta på affären i Byviken.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/bo-2/holmons-camping/",
      "org": "visitholmon.com",
      "vad": "Det finns ingen iordningställd campingplats på Holmön längre.; Där är det inte tillåtet att tälta mellan vägen till gästhamnen och vattnet; Lämpliga ställen att tälta på är Lillhälla och Baskäret (norr och väster om hamnen); Det ligger vid Trappsand på östra sidan av Trappudden.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/bo-2/holmons-gasthamn/",
      "org": "visitholmon.com",
      "vad": "Byviken Holmön ekonomisk förening (Hamnföreningen) äger hela hamnen och hamnområdet på Holmön.; Det finns ett 20-tal gästbåtsplatser längs yttre delen av östra piren. Det finns fasta bojar för angöring med för/akter mot piren.; Farledsprickar (gula prickar i bilden nedan) markerar 2 m linjen mot sandbanken i söder.; På piren finns stolpar med landström och ett tappställe för färskvatten. Där finns även en servicebyggnad med toaletter och duschar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/novas-hamnkrog-andrar-oppettider/",
      "org": "visitholmon.com",
      "vad": "Från och med nästa vecka övergår Novas Hamnkrog till enbart helgöppet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/",
      "org": "visitholmon.com",
      "vad": "Restaurangen Novas Inn finns också som fint matställe som har öppet hela sommaren samt på helgerna en stor del av året.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/ata-2/holmons-lanthandel-2/",
      "org": "visitholmon.com",
      "vad": "Holmöns Lanthandel ligger i Byviken, ett stenkast från färjeläget.; Det finns även en liten kaféhörna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/gora/bad-2/",
      "org": "visitholmon.com",
      "vad": "Även vid bron till Ängesön, vid södra sidan av brofästet på Ängesön finns en mindre långgrund badplats. Den är lämplig för småbarn. Passa då också på att pröva fiskelyckan vid bron. Där går det bra med både mete och spinnfiske.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitholmon.com/gora/paddla-2/",
      "org": "visitholmon.com",
      "vad": "Det finns ingen kajakuthyrning på Holmön.; Tänk på att vissa skär är fågelskyddsområden där det är landstigningsförbud under sommaren.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitumea.se/en/novas-holmon",
      "org": "visitumea.se",
      "vad": "directly adjacent to where the ferry docks, you will find Novas Holmön, which is a restaurant, bar and a café; They have a menu with BBQ, meat, fish, seafood and vegetarian food",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "marstrand": [
    {
      "url": "https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/",
      "org": "Besöksparkering i Marstrand",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/",
      "org": "kungalv.se",
      "vad": "Färjan mellan Koön och Marstrand kallas för Marstrandsfärjan, Endast fordon i nyttotrafik får färjas över till Marstrandsön, Inga enkelbiljetter som är köpta hos Västtrafik gäller på marstrandsfärjan, Alla biljetter gäller tur och retur till och från Marstrandsön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Marstrand",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Marstrand\" → Marstrand | Kungälv | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/samlastning/",
      "org": "Samlastning Marstrand",
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
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6302__0__LINE__20251214__20261212__25ea94b6-c06e-4190-822d-a22d774d80ee__1%2C0__2635889.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "302 Kungälv–Ytterby–Marstrand, Marstrands färjeläge, Gäller 14 dec 2025 - 12 dec 2026, C Går endast 19 juni - 16 aug. . Restider räknade ur tabellen (Ytterby station → Marstrands färjeläge 29 min, Kungälv resecentrum → 42 min); måndag–fredag dagtid avgång från Kungälv varje timme (08.55, 09.55, 10.55 …), lördag–söndag 19 juni–16 augusti extra turer så att bussen går varje halvtimme. Linjen går inte från Göteborg, vilket den tidigare texten påstod.",
      "last": "2026-09-27",
      "myndighet": true
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
    }
  ],
  "smogen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bildat: 1975, Areal: cirka 292 hektar, Naturvårdsförvaltare: Västkuststiftelsen, Med en vit blixt var tolfte sekund gör sig Bohusläns äldsta fyr påmind., Här har den stått sedan 1842 på Hållös högsta punkt., Fyren förklarades som byggnadsminne 1935., Släta klippavsatser lockar ner dig i det klara, blåa vattnet vid Marmorbassängen på Hållös västsida., Det finns ett fyrtiotal jättegrytor på Hållö, Sommartid utgår regelbundna badturer från Kungshamn.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Sm%C3%B6gen%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Smögenön\" → Smögenön | Sotenäs | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/smogens-gasthamn",
      "org": "sotenas.se",
      "vad": "Gästhamnen ligger vid den berömda Smögenbryggan och drivs av Sotenäs kommun., Antal platser: ca 120 st, Förtöjning: Fastförtöjning, Vattendjup: 3-5 m, WC, färskvatten, el, wifi, tvättmaskin/torktumlare, sopor och dusch, Hamnkontoret är beläget i början på bryggan/Ringareskäret, Öppet alla dagar under perioden v25-33., Bokning sker via Dockspot.se",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatserhundbad/smogen.4.15eba9af15b0a9219ba31966.html",
      "org": "sotenas.se",
      "vad": "Sandstrand med bryggor, badstegar och handikapptrappa. Omklädningsrum, toalett och handikapptoalett. Där finns också gillplats och parkering., Klippbad med badstegar och hopptorn. Stor gräsplan, grillplats och parkering., Klippor med bryggor och badstegar. Omklädningsrum och toalett i vandrarhemmet.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Smögen–Kungshamn–Uddevalla–Trollhättan, Linjen trafikeras av Vy Buss., Gäller 14 dec 2025 - 12 dec 2026, Smögen busstation 08.47 10.47 12.47 14.47 16.47 18.47 20.47 23.07, 09.19 11.19 13.19 15.19 17.19 19.19 21.39 — t.ex. lör/sön Uddevalla central 09.19 → Smögen busstation 10.47 (88 min); Torp Terminalen 09.35 → Smögen 10.47 (72 min)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gostasfiskekrog.se/",
      "org": "gostasfiskekrog.se",
      "vad": "fisk som ofta passerat Smögens fiskauktion bara några timmar tidigare, blicka ut över Smögens hamn, en restaurang på Smögen där havet alltid spelar huvudrollen, året om",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.makrillviken.se/",
      "org": "makrillviken.se",
      "vad": "alldeles vid vattenbrynet på öns västsida, Vi erbjuder 25 olika rum samt en sjöbod, med totalt 80 sängplatser., 14 av rummen har egen toalett och dusch., koppla av i vår bastu, alkoholfri miljö, Sedan 1993 drivs Makrillvikens Vandrarhem av familjen Strand.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sealodge.se/",
      "org": "sealodge.se",
      "vad": "Restaurang UMI, Råvaror från havet utanför, kryddade med Tokyo, Bangkok och Seoul., Lunch, middag och drinkar på bryggan., 50 platser direkt vid vattnet, med utsikt mot Hållö fyr.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skaretskrog.se/",
      "org": "skaretskrog.se",
      "vad": "Restaurang på Smögen · Hamnen 1, I början av Smögenbryggan, i samma lokaler där räkmackan såg dagens ljus 1931, lagas och bakas fortfarande allt från grunden., Klassiska västkustsmaker med modern twist., Sveriges pianistelit på scen, Café & Bistro",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smogenshafvsbad.se/",
      "org": "smogenshafvsbad.se",
      "vad": "Hotell, Spa & Konferens på Smögen, Hotellet bestod då av den vackra matsalen, åtta rum",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smogenshafvsbad.se/restaurang/",
      "org": "smogenshafvsbad.se",
      "vad": "Från restaurangen ser du ut över Smögen, havet, klipporna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/smogenbryggan/",
      "org": "vastsverige.com",
      "vad": "Smögenbryggan är sommartid ett av Sveriges mest besökta turistmål., 1 km långa, Här finns ett antal caféer, krogar och mängder av butiker., Flera båtturer utgår från Smögenbryggan., Du kan ta dig till Hållö, Kungshamn, I hamnområdet finns även hembygdsmuseum, användes av fiskare redan under mitten av 1500-talet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/smogen/",
      "org": "vastsverige.com",
      "vad": "Landets näst största fiskauktion ligger på Smögen., Här landar fiskebåtarna sina fångster av färsk fisk och skaldjur, Fiskarstugan, en inredd fiskarbostad från ca 1850, Du hittar stugan bakom Smögenbryggan, Sommartid visas stugan fasta tider, övriga året får man kontakta Smögens Hembygdsförening för visning.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/produkter/gasthamn-smogen/",
      "org": "vastsverige.com",
      "vad": "Västkustens mest välbesökta hamn, Under lågsäsong (före 1 april och efter 31 oktober) är anläggningen stängd.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/smogen/",
      "org": "vastsverige.com",
      "vad": "Soteleden/Kungsstigen, The path meanders along the west coast through Smögen, Kungshamn, Bohus-Malmön, Ramsvik, Hunnebostrand and Bovallstrand., You can walk it easily by dividing it into sections.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/gostas-fiskekrog/",
      "org": "vastsverige.com",
      "vad": "Göstas Fiskekrog is located next to the fish shop, Göstas Fiskbutik",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "lysekil": [
    {
      "url": "https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "lysekil.se",
      "vad": "Allt ifrån salta och friska bad från klippor till sandstränder med lättillgängliga parkeringar, toaletter samt kiosk; Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti; På flera av badplatserna finns vinterstegar för den som vill bada även under årets kallare månader; Lysekils tätort Pinnevik Norra Hamnen Rinkenäs Fridhem Stångholmesund Kallbadhuset och Trampen; Lysekil har tre kommunala badplatser där våra fyrfotade kompisar får bada",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lysekil.se/bygga-bo-och-miljo/flytta-hit/res-och-pendla",
      "org": "lysekil.se",
      "vad": "den elektrifierade passagerarfärjan Elise som varje dag, året runt, trafikerar sträckan Fiskebäckskil och Lysekils stad",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stangehuvud.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Stångehuvud utgör den sydligaste utlöparen av det bohuslänska granitområdet; former och tydliga isräfflor är karaktäristiska för området; Här och var randas granitklipporna av pegmatitgångar; Flera stigpassager går genom smala klyftor och förbi grottliknande bildningar; fina möjligheter till bad och fritidsfiske utefter klippstranden i väster; promenader på stigar som gjorts lättgångna med prydligt anordnade trappor och spänger; Området utgör donationsmark som ägs av Kungliga Vetenskapsakademin; Donationen tillkom i en tid då stenindustrin stod på sin höjdpunkt och huvudsyftet var att undanta ett naturskönt område från stentäkt; detta parti ligger kvar nästan exakt som det lämnades när täktverksamheten upphörde; Bildat: 1983 Areal: cirka 48 hektar Naturvårdsförvaltare: Lysekils kommun och Kungliga Vetenskapsakademin",
      "last": "2026-09-27",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Lysekil",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Lysekil\" → Lysekil | Lysekil | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4841__0__LINE__20260817__20261212__dab04179-6e0d-43b0-a0e6-a6dfd3d216d6__0%2C0__2824773.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "841 Lysekil–Torp–Göteborg och omvänt; Gäller 20 aug - 12 dec 2026; Linjen trafikeras av Vy Buss. . Måndag–fredag går bussen från Nils Ericson Terminalen ungefär en gång i timmen (05.23, 06.23, 07.21, 08.21 …), lördag och söndag varannan timme; 05.23 → Lysekil södra hamnen 07.22.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "847 Lysekil–Skaftö; Ångbåtsbryggan; Fiskebäckskil brygga; Turen måste förbeställas; Gäller 1 jan - 12 dec 2026 utom 15 juni - 16 aug . Restid ur tabellen: Ångbåtsbryggan 07.40 → Fiskebäckskil brygga 07.55, 05.30 → 05.48.",
      "last": "2026-09-27",
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
      "url": "https://www.brygghusetkrog.se/",
      "org": "brygghusetkrog.se",
      "vad": "Fiskebäckskilsvägen 28; Julbord 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.grandhotellysekil.se/",
      "org": "grandhotellysekil.se",
      "vad": "har varit hotell ända sedan huset uppfördes 1878",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/en/akvariet/about-the-aquarium/",
      "org": "Havets Hus",
      "vad": "Some prefer the eelgrass meadows while others like soft sand bottoms or to stay around ship wrecks",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/om-havets-hus/",
      "org": "havetshus.se",
      "vad": "Havets Hus grundades 1993; Varje år stiftar närmare 80 000 besökare bekantskap med hundratals fascinerande arter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/akvariet/om-akvariet/",
      "org": "havetshus.se",
      "vad": "När du stiger in i Havets Hus omges du snart av 25 akvarier; Se hälleflundror, rockor och havsaborrar simma ovanför ditt huvud i tunnelakvariet; Våra akvarier förses hela tiden med kallt, färskt havsvatten från 32 meters djup",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/akvariet/djuren/",
      "org": "havetshus.se",
      "vad": "Alla djur, alger och växter i våra akvarier lever också i det salta Västerhavet utanför Havets Hus; Några är så färgstarka att man skulle kunna tro att de lever i tropiska vatten långt söderut, som blågyltan och den röda sjögurkan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/projektknaggrocka/",
      "org": "havetshus.se",
      "vad": "I januari 2016 föddes den första knaggrockan på Havets Hus och sommaren 2021 släpptes de första egenuppfödda knaggrockorna ut; Hittills har 13 märkta knaggrockor släppts ut",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/besok-oss/oppettider/",
      "org": "havetshus.se",
      "vad": "15/6 — 16/8 Dagligen kl 10-18 ;  — Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti . Havets Hus håller öppet dagligen 2/1–30/12 utom några helgdagar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/att-gora/salsafari/",
      "org": "havetshus.se",
      "vad": "Det blir ofta fullt på parkeringarna i centrum och det blir köer till bilfärjorna över Gullmaren; Kollektivtrafiken åker före köerna så det är ett bra tips",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/besok-oss/hitta-hit/",
      "org": "havetshus.se",
      "vad": "Från E6 söder, efter Uddevallabron, ta av vid trafikmotet Torp och välj väg 161. Ta sedan bilfärja (kostnadsfri) över Gullmarsfjorden mot Lysekil.; Från E6 norr, du når Lysekil via väg 162.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.norrahamnen5.se/",
      "org": "norrahamnen5.se",
      "vad": "Förstklassig mat och utsikt över västerhavet ; sidan uppdaterad 2026-05-05 enligt metadata.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.sivikscampinglysekil.se/",
      "org": "sivikscampinglysekil.se",
      "vad": "Bara 4 km till Lysekil; Välj campingtomt för husvagn, husbil eller tält — eller bo bekvämt i villavagn med kök, dusch och WC; Säsong: 15 april–15 september; Varmt välkomna till säsong 2026!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://strandflickorna.com/",
      "org": "strandflickorna.com",
      "vad": "Vi erbjuder tre charmiga sekelskifteshotell och två unika hideaways - hotellrum som vilar på pålar i havet; Havshotellet är vårt genuina skärgårdshotell med egen havstomt; I vår lilla bistro-restaurang",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/lysekil/",
      "org": "vastsverige.com",
      "vad": "hans fru Calla Curman har blivit känd som Stångehuvuds räddare efter att ha köpt och donerat området, som numera är naturreservat",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/strandflickornas-havshotell/",
      "org": "vastsverige.com",
      "vad": "Badpaviljongen gives you a combination of outdoor spa bath with a relaxation room and sauna; you have access to a private pier",
      "last": "2026-09-27",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kosterhavet",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kosterhavet\" → Kosterhavet | Strömstad | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/upptack-nationalparkerna/kosterhavets-nationalpark",
      "org": "Sveriges Nationalparker",
      "vad": "Kosterhavets nationalpark är Sveriges första marina nationalpark och består främst av vatten och undervattensmiljöer, Nationalparken bevarar ett särpräglat och artrikt havs- och skärgårdsområde med djupa lerbottnar, rev, grunda vikar och tallskog i oförändrat skick",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken",
      "org": "Sveriges Nationalparker",
      "vad": "38 900 hektar, varav 860 hektar land, Strömstad, Tanum, Länsstyrelsen Västra Götaland, Markägare Naturvårdsverket",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/fakta-om-parken/djurliv",
      "org": "Sveriges Nationalparker",
      "vad": "I de långgrunda vikarna, på de klippiga stränderna, och i alla de miljöer vi förknippar med Bohuskusten lever omkring 6 000 olika arter. Närmare 300 av dem finns inte någon annanstans i Sverige, De djupa och brant sluttande klippväggarna i Kosterfjordens djupränna liknar dessutom miljöerna långt ute i Atlanten, Runt grynnor och holmar simmar Västerhavets största bestånd av knubbsälar, Rev av ögonkorall är en värdefull livsmiljö för hundratals arter, här häckar ejder, tobisgrissla, labb och den ovanliga silvertärnan",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/kosterhavets-nationalpark/att-gora-i-parken/sevardheter/naturum-kosterhavet",
      "org": "Sveriges Nationalparker",
      "vad": "På naturum Kosterhavet finns utställningar, filmer och bildspel om nationalparken och naturen i området. Här finns också ett klappakvarium där du kan titta och känna på Kosterhavet, Naturum ordnar guidningar och föredrag, visningar och turer på stränderna i närområdet, 23 februari–26 april, 26 oktober-1 november (Höstlov)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/info/kosterbatarna/",
      "org": "Västtrafik",
      "vad": "Kosterbåtarna - linje 899, Köp biljett i appen Västtrafik To Go, Köp biljett av däcksman ombord på båten, Du kan ta med dig cykel ombord i mån av plats, Från januari 2027 kommer Kosteröarna istället ingå i zon C",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4899__1__LINE__20260927__20261212__d2244526-47e2-4e6f-9db3-0febd05bdb81__2%2C0__2719851.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "899 Strömstad–Kosteröarna–Strömstad, Gäller 27 sept - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ekenashavshotell.se/",
      "org": "ekenashavshotell.se",
      "vad": "Längst västerut i Sverige, mitt i Kosterhavets marina nationalpark, ligger Ekenäs Havshotell, 15 Juli 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.klapphagen.se/",
      "org": "klapphagen.se",
      "vad": "Utvalda söndagar våren & hösten 2026, Boutique Hotel - Glamping - Restaurang & Bar - Gårdsbutik - Bryggeri",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kostergarden.se/",
      "org": "kostergarden.se",
      "vad": "SYDKOSTER · KILESAND, Restaurang, takterrass, kiosk, minigolf och stugby, © 2026 Kostergården",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://kostersundet.se/",
      "org": "kostersundet.se",
      "vad": "Sundets Skaldjurscafé har ett fantastiskt läge vid Långagärde Brygga på Sydkoster, På vår soliga bryggservering kan du njuta av färska skaldjur, välja mellan kött, fisk och diverse smårätter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://kostersundet.se/makrill-race",
      "org": "kostersundet.se",
      "vad": "Den 1augusti avgörs Sundets Makrillrace 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lyths.se/",
      "org": "lyths.se",
      "vad": "VÄLKOMMEN TILL LYTHS TÄLTPLATS OCH EKOSTUGOR PÅ NORDKOSTER, Sju ekostugor byggdes -97, det är endast tillåtet att tälta på Nordkosters tältplats när den är öppen på sommaren, Förbokning krävs",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://strandkanten.se/",
      "org": "strandkanten.se",
      "vad": "Restaurang Strandkanten på Nordkoster erbjuder mat och dryck i en fantastisk miljö med utomhusservering på bryggan eller inomhus i den mysiga sjöboden, Säsongen startar vid påsk och sträcker sig till och med hummerfisket i oktober",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/articles/faq-koster/",
      "org": "vastsverige.com",
      "vad": "South Koster has an area of 8 square km and North Koster an area of 4 square km, Tiny North Koster is hilly and has good beaches, Larger South Koster is flatter and better for cycling, with bike-rental facilities, restaurants and two large beaches at Rörvik and Kilesand, the kilometer long sandy beach at Kilesand, On North Koster you can go swimming near Västra bryggan, Basteviken and Norrvikarna up north, Between North and South Koster (Västra Bryggan-Långegärde) there is a small cable ferry that is manned summertime, These two main islands have 300 year-round inhabitants (240 of them at South Koster) and since both are virtually car-free",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/ekenas-havshotell/",
      "org": "vastsverige.com",
      "vad": "Ekenäs Havshotell på Sydkoster erbjuder havsnära boende mitt i Kosterhavets marina nationalpark, charmiga rum och lägenheter, Många boenden erbjuder egen balkong eller altan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/reservatet-nordkoster/",
      "org": "vastsverige.com",
      "vad": "Alldeles vid havet på Nordkosters nordöstra sida ligger Kosteröarnas enda campingplats för tält samt sju ekologiska stugor för uthyrning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/produkter/klapphagen-koster/",
      "org": "vastsverige.com",
      "vad": "At Kläpphagen Koster by Ekenäs on Sydkoster you can enjoy food cooked over an open fire, 6 premium suites, each with their own terrace, a luxurious glamping tent, Gårdshuset, a separate building",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/stromstad/produkter/kostergarden/",
      "org": "vastsverige.com",
      "vad": "only a stone's throw from the long sandy beach at Kilesand, At Kostergården you can stay in a cottage, an apartment or a suite with sea views",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/gasthamn-ekenas/",
      "org": "vastsverige.com",
      "vad": "Gästhamnen ligger vid Ekenäs på natursköna Kosteröarna, vid bryggan finns restauranger, hotell, cykeluthyrning och här ligger även besökscenter för Kosterhavets nationalpark, ca 1,5 km från gästhamnen ligger helårsöppna ICA-butiken",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/gasthamn-nordkoster/",
      "org": "vastsverige.com",
      "vad": "Gästhamnarna är hittar du vid Bopallen (Västra Bryggan) och vid Vettnet på ön, I anslutning till gästhamnen vid Västra Bryggan finns restauranger och under sommaren finns en livsmedelaffär",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/stromstad/produkter/strandkanten/",
      "org": "vastsverige.com",
      "vad": "Restaurangen ligger alldeles vid havet i en ombyggd gammal sjöbod vid Västra Bryggan på Nordkoster, Menyn består till stor del av rätter från havet",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "grebbestad": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/tjurpanneomradet.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bildat: 1968, Areal: cirka 499 hektar, Naturvårdsförvaltare: Västkuststiftelsen, Området ligger på den västra delen av Havstenssundshalvön., Branta klippstränder stupar ner i havet och här och där går det in vikar med stränder av sand, grus eller stenblock., Kala hällar och ljunghedar dominerar, och enstaka träd som tall och rönn kryper längs bergssidorna, Flera olika längder på vandring erbjuds., Den som vill bada här gör klokt i att invänta stiltje.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/otteron.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bildat: 1967, Areal: cirka 629 hektar, är kanske ett av de mest välbesökta reservaten bland Bohusläns öar, Många stigar genomkorsar ön, flera skyddade naturhamnar, På ön finns åtskilliga orkidéarter, Rika lövskogsområden, ett stort bronsåldersröse, en kopia av en märklig runsten med den längsta urnordiska runskrift som påträffats, Otterön ligger sydväst om Grebbestad och är den största ön i det skärgårdsområdet., Till ön kommer man enklast med taxibåt från Grebbestad",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Grebbestad",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Grebbestad\" → Grebbestad | Tanum | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/upplevagora/ostronmeckat.4.2f5857cf188b9cbe7f0aa484.html",
      "org": "tanum.se",
      "vad": "Ostronakademien, en ideell förening som bildades 2004, Akademin arrangerar varje år Nordiska Mästerskapen i Ostron öppning i maj och Ostronets dag i september., Kalvö Ostron är Ostrea edulis som lever fritt utanför Fjällbackas kust, sedan 1600 talet, Grebbestadostron är varumärket för det europeiska ostronet Ostrea edulis som lever fritt i Grebbestads norra och södra skärgårdar., Sedan maj 2023 är dessa ostron också ursprungsskyddade av EU, begränsas fisket av Grebbestadostron till 50 000-60 000 per år, Havstenssunds Ostron är för närvarande den enda kommersiella odlingen i Skandinavien., som sträcker sig från september till och med maj månad",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4877__0__LINE__20260817__20261212__9d26ba47-e7c4-4a38-b1c9-09f2b69a0feb__2%2C0__2767448.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Havstenssund–Tanumshede och omvänt, Gäller 17 aug - 12 dec 2026, Tanumshede centrum 06.55 13.30 15.50, Grebbestad busstation 07.09 07.46 13.40 16.00 — 13.30 → 13.40 = 10 min, 06.55 → 07.09 = 14 min",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4878__0__LINE__20260817__20261212__77a1bfb5-4966-45e6-89b6-e487842a0851__1%2C0__2767487.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tanumshede–Grebbestad–Sportshopen och omvänt — Tanumshede centrum 09.05 → Grebbestad busstation 09.23 = 18 min",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://bistroskafferiet.se/",
      "org": "bistroskafferiet.se",
      "vad": "Nedre Långgatan 40, sedan 2005 har vi haft vår verksamhet, fantastisk utsikt över hamnen och den lilla parken",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.evertssjobod.se/",
      "org": "evertssjobod.se",
      "vad": "Everts Sjöbod är ett litet familjeföretag med fast förankring i trakten, Vårt B&B ligger i direkt anslutning till vår gamla sjöbod där alla aktiviteter utgår ifrån., hummersafari, ostronprovningar och fisketurer, Njut av det bästa från havet i vår gamla charmiga sjöbod med utsikt över havet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grebys.se/hotell",
      "org": "grebys.se",
      "vad": "Hotellet med totalt 9 unika rum stod klart sommaren 2013., Vi har ett dubbelrum med eget badrum samt ett famliljerum med gemensam wc/dusch där hundar är tillåtna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://grebys.se/",
      "org": "grebys.se",
      "vad": "Här serverar vi färsk fisk och skaldjur från lokala vatten, utsikt över hamnen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.rosenhillbedandbreakfast.se/",
      "org": "rosenhillbedandbreakfast.se",
      "vad": "I utkanten av västkustpärlan Grebbestad, i byns gamla skola från 1800-talet, hittar ni Villa Rosenhill B&B., Hos oss finns det fyra standard dubbelrum med dubbelsängar och tre mindre dubbelrum med enkelsängar., Vi har delade badrum, Trädgården är stor och lummig, Sövallsvägen 5",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tanumstrand.se/",
      "org": "tanumstrand.se",
      "vad": "TanumStrand SPA & Resort - Hotell, SPA och konferens i Norra Bohuslän, Boka rum/stuga",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://tanumstrand.se/gasthamn/",
      "org": "tanumstrand.se",
      "vad": "Strax söder om Grebbestad ligger vår gästhamn med 250 båtplatser vid bryggan i direkt anslutning till hotellområdet., Här finns fräscha toaletter, duschar, tvättmaskiner och torktumlare. Du har också tillgång till landström och WiFi., Hamnservicen är bemannad 19+20+21 juni samt 26 juni till 9 augusti kl 09.00 till kl 17.00 år 2026., Under perioden sommarperioden kan du boka din båtplats via Dockspot",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.telegrafen.info/",
      "org": "telegrafen.info",
      "vad": "Den lilla restaurangen i Grebbestad med det stora hjärtat. Känd för sina goda fiskrätter.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tanum/produkter/grebbestad/?site=145",
      "org": "vastsverige.com",
      "vad": "första gången orten nämns i modern skrift är i början av 1600-talet, Samhället utvecklades sedan mycket under 1800-talet, många stenhuggare flyttade till samhället i slutet av 1800-talet, blev Grebbestad också en framstående badort, med både kall- och varmbadhus, När du närmar dig Grebbestad möts du av ortens nygotiska kyrka, Hamnområdet kantas av fiskebåtar, pittoreska sjöbodar, caféer, butiker och restauranger., den populära bryggpromenaden med flera restauranger som serverar färsk fisk, räkor, ostron, hummer, krabba och havskräftor, krogar som under tidigt 1900-tal huserade konservfabrik och telegrafstation, en fullserviceanläggning med gott om båtplatser, Evert Taube skrev sommaren 1954, när han vistades på just Otterön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/everts-sjobod/",
      "org": "vastsverige.com",
      "vad": "Enjoy delicious seafood in a traditional boathouse from the 19th century., you can rent one of the six double rooms beside the boathouse, go on an oyster safari",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "vastsverige.com",
      "vad": "Grebbestad Bryggan Guest Harbour, 160 guest berths. Washing machine, dryer, toilet, shower, and shore power., Operated by Gästhamnsbolaget. Harbour office open during summer.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/grebys-hotell-o-restaurang/",
      "org": "vastsverige.com",
      "vad": "Strandvägen 1",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/restaurant-telegrafen/",
      "org": "vastsverige.com",
      "vad": "Nedre Långgatan 28, well-made traditional Swedish fare and á la carte, both meat and fish, the Restaurang Telegrafen in what once used to be a telegraph station in Grebbestad",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/cafe-skafferiet-grebbestad/",
      "org": "vastsverige.com",
      "vad": "Café Skafferiet serves as both a café and restaurant, Nedre Långgatan 40",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vitlyckemuseum.se/",
      "org": "vitlyckemuseum.se",
      "vad": "Vitlycke museum - porten till världsarvet, Vi är en del av Västra Götalandsregionens kulturförvaltning",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "fjallbacka": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 2011, cirka 18 300 hektar, 365 öar och skär, turbåtar från bland annat Fjällbacka och Hamburgsund, ett av Sveriges mest värdefulla marina områden tillsammans med Kosterhavets nationalpark",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Fj%C3%A4llbacka",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Fjällbacka\" → Fjällbacka | Tanum | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/fjallbacka.4.7664b4813898b7df98459f8.html",
      "org": "tanum.se",
      "vad": "Samhällets historia är intimt förknippad med de stora sillfiskeperioderna under 1700- och 1800-talen; speciellt under 1800-talets senare del då sill fraktades och inte minst havre som skeppades ut från Fjällbacka till England; Han gav produkten namnet; På utställningar runt om i världen., bl a vid fiskeriutställningen i Bergen 1865, erhöll Fjällbacka-ansjovis utmärkelser; Det fanns fiskkonservindustri i Fjällbacka ända fram till 1978",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "875 Tanumshede–Fjällbacka–Dingle–Håby; Gäller 19 aug - 12 dec 2026 . Restid ur tabellen: Tanumshede centrum 06.25 → Fjällbacka 06.54 (29 min), 08.44 → 09.10 (26 min), lördag 10.20 → 10.48 (28 min).",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.brygganfjallbacka.se/",
      "org": "Bryggan Fjällbacka",
      "vad": "Höstens stora händelse längs med kusten är hummersäsongen, vars premiär äger rum varje år den första måndagen efter 20 september; Restaurang Matilda: Öppnar åter under hummerfisket",
      "last": "2026-09-27",
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
      "url": "https://gasthamnsbolaget.se/boende-i-bohuslan/badholmens-vandrarhem/",
      "org": "gasthamnsbolaget.se",
      "vad": "Öppet året runt; 3 fyrbäddsrum och 1 tvåbäddsrum; Gemensamt kök, dusch, WC och bastu; Köket är nyrenoverat 2025; Vandrarhemmets café är öppet hela sommaren",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gasthamnsbolaget.se/gasthamnar-i-bohuslan/fjallbacka-gasthamn/",
      "org": "gasthamnsbolaget.se",
      "vad": "Cirka 29 förbokningsbara platser; Servicebyggnaden med 6 toaletter och 6 duschar renoverades inför säsongen 2023; I gästhamnen kan du sortera glas, matavfall",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://shfjallbacka.se/en/restaurants/",
      "org": "shfjallbacka.se",
      "vad": "Restaurant Mamsell är hotellets restaurang, Galärbacken 2, Fjällbacka",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tanum/fjallbacka/",
      "org": "vastsverige.com",
      "vad": "Hitta platserna från Camilla Läckbergs böcker i verkligheten. Ladda ned vår karta och gå din Läckberg-vandring när det passar dig.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tanum/produkter/vettebergetkungsklyftan/",
      "org": "vastsverige.com",
      "vad": "trappor från Ingrid Bergmans Torg, Stora och Lilla Vetteberget, fastkilat klippblock som tak, namnet efter Oscar II:s besök 1887 och hans signatur på bergväggen, filmscener från Ronja Rövardotter, utsikt över både övärld och fastland",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/fjallbacka/guided-tours-in-fjallbacka/",
      "org": "vastsverige.com",
      "vad": "guidade turer om Bergmans arv och Läckbergs mordvandring, arrangörer Fjällbackaguiderna och Kustguiden, start vid Ingrid Bergmans torg",
      "last": "2026-09-27",
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
      "vad": "160 guest berths, next to Ingrid Bergman Square. Toilet, shower, and shore power. Washing machine and dryer available at Badholmen Hostel. Operated by Gästhamnsbolaget. Harbour office open during summer.",
      "last": "2026-09-27",
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
      "vad": "Stora Hotellet in Fjällbacka has attracted guests from near and far since 1834; Restaurant Mamsell serves well-crafted à la carte dining",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/service/travel-tanum/",
      "org": "vastsverige.com",
      "vad": "a fee is charged from June 15 to August 15 between 9:00 AM and 6:00 PM. The first hour is free; You can park for a maximum of 3 consecutive hours; Free long-term parking in the city's of Grebbestad, Fjällbacka, and Hamburgsund is about a 10-minute walk from the center",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "grundsund": [
    {
      "url": "https://hamn.lysekil.se/sv/GastServicePriser",
      "org": "hamn.lysekil.se",
      "vad": "Priser och service 2026, Tvättmaskin: Havsbadet Grundsund Norra hamnen, Sugtömningsstation: Fiskehamnen Grundsund, Västra Kajen",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vagerod.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bildat: 2003, Areal: cirka 121 hektar, Allra mest känt är området för sina blåsippor, De blommar här i stora mängder under våren innan lövträdens krontak sluter sig i ek- och bokskog, Området är kuperat med gott om block och lodräta stup, På flera platser finns så kallad krattekskog, hävdade kulturmarker, Du hittar det sällsynta och hotade gräset råglosta i reservatet, Här vittnar fällda träd och stubbar om att det finns bäver i området, En av lederna följer den gamla landsvägen, som var i bruk ännu under 1930-talet, Naturvårdsförvaltare: Västkuststiftelsen, Området ingår i EU:s ekologiska nätverk av skyddade områden, Natura 2000",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Grundsund",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Grundsund\" → Grundsund | Lysekil | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/gullmarsleden/",
      "org": "Trafikverket",
      "vad": "Gullmarsleden går mellan Finnsbo, Lysekil och Skår, Uddevalla i Gullmarsfjorden, Färjeledens längd är 1850 meter och överfartstiden är tio minuter, Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "847 Lysekil–Skaftö, Gäller 1 jan - 12 dec 2026 utom 15 juni - 16 aug",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla, Torp Terminalen, Gäller 17 aug - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.grundenshotell.se/",
      "org": "grundenshotell.se",
      "vad": "Grundéns hotell, Furtofta 204 451 79 Grundsund, vid infarten till det charmiga lilla fiskesamhället Grundsund, Gäster erbjuds fri parkering direkt vid hotellet samt gratis utlåning av cyklar, Vår egen Restaurang Pelles",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.pellesrokeri.com/",
      "org": "pellesrokeri.com",
      "vad": "Pelles rökeri i Grundsund, Tack för sommaren 2026 - Vi ses den 30 april 2027, Hugos bu, Bar & café, Terrassen pizza & lounge, Här serveras mat inspirerad av havet — lagad från grunden, både till lunch och middag",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smultrontang.se/",
      "org": "smultrontang.se",
      "vad": "En pub & restaurang, Västkust - Klassiskt - Medelhav, Nu har vi stängt för i år och vi tackar er alla för säsongen 2026, Västra Kajen 11",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto/",
      "org": "vastsverige.com",
      "vad": "has always been an active fishing port and has a long harbour canal around which the village is built",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto-grundsund/",
      "org": "vastsverige.com",
      "vad": "is on the westernmost point of Skaftö, The long, narrow village is divided by a canal which separates Skaftö from the small island of Ösö, You can buy fresh fish, shrimps and crabs directly from the commercial fishing boats when they dock, The canal that divides the village into two parts, east and west, was dug out during the first world war to allow fishing boats and small cargo boats to pass more easily and make a larger, more protected harbour, A new sea-front promenade has been constructed by the eastern quay, long pier to Skäddhålan which then continues to connect with a footpath to Vigerna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/skafto-grundsunds-kyrka/",
      "org": "vastsverige.com",
      "vad": "Ursprungliga kyrkobyggnaden var ett kapell som uppfördes 1799, Ett kyrktorn byggdes till 1818, En större ombyggnad genomfördes 1893 efter ritningar av arkitekt Fredrik Falkenberg, Kyrkan förlängdes åt öster och fick ett nytt tresidigt avslutat kor, De breda korsarmarna uppfördes och kyrkan fick sin nuvarande planform som korskyrka, gospelkonserterna i juli och julkonserter i december är mycket välbesökta, Kyrkan rymmer 400 besökare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/things-to-do/explore-the-west-coast-by-boat/ferry-lines/route-map-lysekiluddevallaljungskile/",
      "org": "vastsverige.com",
      "vad": "Lysekil — Fiskebäckskil, Skaftö - Östersidan, Skaftö, all year round",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/leder/skafto---vagerod/",
      "org": "vastsverige.com",
      "vad": "2.4 km, Partly the blue-marked coastal trail Kuststigen, There is also the bus stop Vägeröd (Västtrafik 845)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/lysekil/produkter/skafto-vandrarhem/",
      "org": "vastsverige.com",
      "vad": "Skaftö Vandrarhem och B & B är öppet året runt, och förmedlar även veckovisprivatboende, 30 bäddar i 10 individuellt inredda rum — inga sovsalar, Gemensamma duschar och WC, Hemtrevligt boende i hjärtat av Grundsund",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/lysekil/produkter/skafto-gasthamn-grundsund/",
      "org": "vastsverige.com",
      "vad": "lies on the Southwestern part of Skaftö, mooring along the Eastern berth and mooring with aft lines by the Western berth, Fresh water, Electricity, Laundry (on the Western pier), Recycling station and septic tank emptying, Toilet (Code is on the receipt), Shower (Code is on the receipt), Payment on website: www.hamn.lysekil.se",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/skafto---eng/food--beverage/eat-on-skafto/",
      "org": "vastsverige.com",
      "vad": "Östra kajen 20, 45179 Grundsund",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "hamburgsund": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/kulturmiljoer/greby-gravfalt.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Strax norr om Grebbestad ligger Greby gravfält, Greby gravfält ligger väster om Tanumshede i norra Bohuslän, Det är Bohusläns största gravfält med nästan 200 gravar som ligger tätt, nästan på varandra, Tvåhundra gravar ligger tätt, tätt i en ljungbevuxen västerslänt, Gravarna består av 68 runda högar, 54 långhögar samt 47 runda och 12 ovala stensättningar, Det finns 28 resta stenar på krönet av gravar, Stenhällarna kan vara upp till fyra och en halv meter höga, Ett tiotal av gravarna undersöktes 1873 av den blivande riksantikvarien Oscar Montelius, Förutom gravurnor med brända ben fann man sländtrissor, glaspärlor och benkammar, Fynden tyder på att Greby använts som begravningsplats på järnåldern, under tiden 200 till 600 år efter vår tideräknings början",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vaderoarna.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Det går turbåtar till Väderöarna från bland annat Fjällbacka och Hamburgsund",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Hamburgsund",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hamburgsund\" → Hamburgsund | Tanum | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.tanum.se/kommunpolitik/kommunfakta/kommunenshistoria/ortsinformation/hamburgsund.4.7664b4813898b7df9844de1.html",
      "org": "tanum.se",
      "vad": "Förledet kommer från önamnet Hornbora, som syftar på Hamburgös utskjutande uddar i söder och väster, Namnet Hamburgsund har ingen koppling till den tyska staden Hamburg, Traditionen säger att under medeltiden fanns tingsplatsen för Viken vid södra delen Hamburgsundet, Viken var det administrativa område som bestod av norra Bohuslän och det nu norska området runt Oslofjorden, Hamburgsund omtalas redan 1585 som tullstation, Under 1700-taletets sillperiod inbjöd det skyddade läget längs sundet till att bygga ett flertal trankokerier, tog fart när befolkningen började bedriva fraktfart, Under senare delen av 1800-talet fanns två stenhuggerier i Hamburgsund, Hamburgsund var i början av 1900-talet ett av Bohusläns största skutsamhällen, Hamburgsund är hemmahamn för en stor del av kommunens fiskeflotta, Husen ligger i enkla rader på båda sidor om sundet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/hamburgsundsleden/",
      "org": "Trafikverket",
      "vad": "Hamburgsundsleden går mellan Hamburgsund och Hamburgö i Norra Bohuslän, Färjeledens längd är 130 meter och överfartstiden är tre minuter, Resan är avgiftsfri",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tanumshede–Fjällbacka–Dingle–Håby, Tanumshede centrum, Hamburgsund centrum, Dingle station, Gäller 19 aug - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gasthamnsbolaget.se/en/guest-harbours-in-bohuslan/hamburgsund-guest-harbour/",
      "org": "gasthamnsbolaget.se",
      "vad": "one on the mainland south of the ferry between the fishing harbor and the marina, and one on Hamburgö right by the ferry landing, There are also guest berths at Hjalmars Kaj, on the mainland side there is a laundry room",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hamburgsundbedandbreakfast.se/",
      "org": "hamburgsundbedandbreakfast.se",
      "vad": "I Hamburgsunds centrum, granne med färjeläget, ligger vårt boende, 4 st lite större dubbelrum, och 6 st dubbelrum, har alla egen liten balkong, dusch och toalett, wi-fi och tv",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hjalmars.se/",
      "org": "hjalmars.se",
      "vad": "Välkommen till Hjalmars i Hamburgsund, Med en fantastisk utsikt över sundet, Smaker från havet i en oslagbar miljö, Strandvägen 8, 457 45 Hamburgsund, sista öppetdagen sön 27 sept",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.rorvikscamping.se/",
      "org": "rorvikscamping.se",
      "vad": "Campingen ligger 1.5 km söder om kustsamhället Hamburgsund, Vi erbjuder campingtomter för husvagn/husbil/tält, stugor, rum/vandrarhem med 24 bäddar samt säsongs- och båtplatser, barnvänlig sandstrand",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hamburgsund/",
      "org": "vastsverige.com",
      "vad": "was excavated at the beginning of the last century and among the findings the back of cannon, cannonballs, bullets and other weapons, The findins show that the period of greatness of the castle was around 1450-1530, Today, low grassy embankments are the only remains of what was once the Hornborg Castle, Gerlesborgsskolan right next to the sea engaged in artistic education, short courses, open cultural activities, concerts, lectures and open art workshops for children",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/accomodation/marinas/",
      "org": "vastsverige.com",
      "vad": "50 berths in Hamburgsund and on Hamburgö in the strait. Toilet, shower, washing machine, dryer, and shore power, Operated by Gästhamnsbolaget",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tanum/produkter/hamburgsund-bed-and-breakfast/",
      "org": "vastsverige.com",
      "vad": "Udden 1",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "karingon": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=K%C3%A4ring%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Käringön\" → Käringön | Orust | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/karingons-gasthamn",
      "org": "orust.se",
      "vad": "125 platser., Djup cirka 4 meter., Käringöns hamn är öppen 1 april - 30 september., Servicebyggnad med toalett, dusch, tvättmaskin och torktumlare., Sugtömningsstation där fritidsbåtar kan tömma sina latrintankar, mellan 1 april och 31 oktober., Hamnen är kontantfri., Förhandsbokning av gästplatser sker via Dockspot., El - undvik att använda alla elapparater i båten samtidigt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/bygga-bo-och-miljo/bygga-nytt-andra-eller-riva/kulturhistoriska-byggnader-kulturmiljoer",
      "org": "orust.se",
      "vad": "Käringön, Mollösund, Gullholmen och Härmanö är exempel på platser som ligger inom riksintresse för kulturmiljövården, De flesta byggnader i dessa områden är q-märkta och detaljplanen innehåller strikta regler för hur byggnationer får utföras, Generella varsamhetskrav och förvanskningsförbud enligt Plan- och bygglagen gäller även utanför de orter där byggnaderna är skyddsmärkta, I de skyddade miljöerna kan bygglov krävas för åtgärder som i normala fall inte är bygglovspliktiga, Till exempel staket, altaner, trädäck, Attefallsåtgärder eller solceller.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/",
      "org": "Västtrafik",
      "vad": "Ha djuret i koppel, bur eller väska, Vid resa med båt ska husdjur vara på styrbord",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tuvesvik–Gullholmen–Käringön, Gäller 15 sept - 31 okt 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.destinationkaringon.online/upplev",
      "org": "destinationkaringon.online",
      "vad": "Käringöns gästhamn ligger mitt i samhället",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationkaringon.online/",
      "org": "destinationkaringon.online",
      "vad": "Det finns därför inga bilar, mopeder eller cyklar, Nästan alla öns 280 hus är byggda före år 1920, det finns knappt 70 personer som är bosatta här",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationkaringon.online/planera-ditt-bes%C3%B6k",
      "org": "destinationkaringon.online",
      "vad": "Under sommaren erbjuds även fasta avgångar mellan Hälleviksstrand och Käringön. Överfarten tar cirka 10–15 minuter, För dig som vill komma fram snabbare eller boka din resa i förväg finns möjlighet att resa med båttaxi från fastlandet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.destinationkaringon.online/%C3%A4ta-dricka",
      "org": "destinationkaringon.online",
      "vad": "Längst ut i havsbandet, med utsikt mot Måseskärs fyr, ligger Karingo — en unik ostronbar, Karingo erbjuder även uppvärmda havsvattenbad, Anläggningen har egen brygga och kan nås med båt, eller via transport från Käringön med båt eller helikopter, Säsongsöppet från mitten av mars till juni samt från mitten av augusti till december",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.karingo.com/",
      "org": "karingo.com",
      "vad": "pinfärska ostron, kall champagne, varm badtunna och underbar utsikt till Måseskärs fyr",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.karingon.se/om-k%C3%A4ring%C3%B6n",
      "org": "karingon.se",
      "vad": "Ön fick fast bosättning redan 1596, då några unga fiskarfamiljer från Orust, år 1912 nåddes toppnoteringen med hela 662 personer kyrkobokförda här, Öborna kunde nu bygga en egen kyrka som invigdes 1796",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.karingon.se/",
      "org": "karingon.se",
      "vad": "Våra 21 rum, två enkelrum, fyra dubbelrum, sju dubbelrum med balkong, två dubbelrum deluxe med balkong, två trebäddsrum samt fyra familjerum/juniorsviter med stora terrasser, Alla rum har dusch och toalett och frukost ingår alltid i priset, Adress: Skeppersholme 127",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.karingon.se/hundv%C3%A4nlig-destination",
      "org": "karingon.se",
      "vad": "Vi erbjuder möjligheten att ta med hunden i alla våra rumskategorier, För din hunds vistelse tillkommer en avgift, flera av öns restauranger och uteserveringar välkomnar hundar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.karingon.se/restaurang",
      "org": "karingon.se",
      "vad": "på vår stora, härliga uteservering, Restaurangen är öppen varje dag under sommaren, Övriga året har vi öppet på förfrågan för gruppbokningar samt de flesta fredagarna, Restaurangen kan ta cirka 70 sittande gäster",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lotshotellet.com/",
      "org": "lotshotellet.com",
      "vad": "Lotshotellet har fått sitt namn från den lotsstation som funnits på Käringön i över 300 år, Alla våra fina rum har eget badrum med golvvärme, fri tillgång till vår egen badbrygga och bastu med utsikt över havet, Under vintern håller vi stängt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.lotshotellet.com/creperiet",
      "org": "lotshotellet.com",
      "vad": "På Crêperiet på Lotshotellet erbjuder vi läckra crêpes och galetter, Vi har också ett stort urval av fransk kvalitetscider, goda viner, i eftermiddagssolen i bästa hamnläge, STÄNGT FÖR SÄSONGEN 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.petersonskrog.se/boende",
      "org": "petersonskrog.se",
      "vad": "Under vår, höst och vinter finns det möjlighet att bo i vårt vandrarhem som ligger i direkt anslutning till krogen, Boendet har totalt 10 bäddar, uppdelat på 5 rum, Ni delar dusch, toalett och kök, Under juni, juli och augusti kan ni inte bo hos oss",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.petersonskrog.se/",
      "org": "petersonskrog.se",
      "vad": "Är ni ett större sällskap, d.v.s. 12 personer eller fler, man kan äta både hummersupé i oktober och julbord från sent november hos oss",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.petersonskrog.se/hummerfest",
      "org": "petersonskrog.se",
      "vad": "3 lördagskvällar i oktober serverar vi en 4-rättersmeny med fokus på svensk hummer, Datum för hummersupén 2026 är",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/products/karingon/",
      "org": "vastsverige.com",
      "vad": "Öviken, which is closest to the harbour, has pontoon piers and a trampoline for older children, The south side of the island has a traditional bathing house with small piers, steps into the sea, Barnbadet is also on the south coast and offers child-friendly swimming with its shallow cove and soft sandy beach, Friluftsbadet, lies on the south-west tip of the island and has separate bathing times for men and women",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/",
      "org": "vastsverige.com",
      "vad": "line 381, operate every day all year round, there is a bicycle ban on Käringön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/farja-tuvesvik-gullholmen-karingon/",
      "org": "vastsverige.com",
      "vad": "Du betalar parkeringen med kort eller sms. Det finns ingen kontantbetalning., Kom i god tid då parkering för besökare ligger längre bort från färjan.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/orust/produkter/karingon/",
      "org": "vastsverige.com",
      "vad": "På Käringön föddes fiskarsonen Olof Knape år 1664, Olof gick till sjöss åtta år gammal, År 1700 blev han handplockad som amiralitetskapten av kung Karl XII, främst var han involverad i kaparverksamheten som pågick, Olof blev så småningom adlad till Olof Strömstierna, och namnet återfinns idag på flera platser på Käringön",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "orust": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Orust",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Orust\" → Orust | Orust | Natur- och terrängnamn (mittpunkt), SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
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
      "url": "https://www.orust.se/kommun-och-politik/kommunfakta",
      "org": "orust.se",
      "vad": "Sommartid när de flesta fritidshusen är bebodda och campingplatser, gästhamnar, hotell och vandrarhemmet mera är fyllda av besökare, kanske antalet människor i kommunen närmar sig 40 000 personer.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/jobb-och-foretagande/foretag-stod-och-radgivning/fakta-om-naringslivet",
      "org": "orust.se",
      "vad": "är Sveriges tredje största ö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/mollosunds-gasthamn",
      "org": "orust.se",
      "vad": "sydvästspetsen av Orust, 100 platser, djup cirka 4 meter, el, dusch, toalett, tvättmaskin och torktumlare i servicehuset, sugtömningsstation 1 april–31 oktober; bensin och diesel anges som tillgångar i samhället Mollösund",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.scb.se/contentassets/7edbcfbb3a87470387d8c95868ecaf04/mi0812_2020a01_sm_mi50sm2301.pdf",
      "org": "scb.se",
      "vad": "Tio-i-topp. Statistiska öar i Sverige, efter areal i hektar., Gotland Gotlands län 296 800, Öland Kalmar län 134 300, Södertörn Stockholms län 120 700, Orust Västra Götalands län 34 400",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/svanesundsleden/",
      "org": "Trafikverket",
      "vad": "Svanesundsleden går mellan Svanesund på Orust och Kolhättan i Halsefjorden Bohuslän. Färjeledens längd är 830 meter och överfartstiden är fem minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "http://www.bryggvingen.se",
      "org": "bryggvingen.se",
      "vad": "Varmt välkommen till ön Lyr på sydvästra Orust, där vi har vår fisk- & skaldjursrestaurang och fiskaffär., Kom med båt eller ta färjan som går dagligen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hallberg-rassy.com/sv/varvet/varvets-historia",
      "org": "Hallberg-Rassy",
      "vad": "Harry Hallberg öppnade eget varv i Kungsviken på Orust 1943, nya lokaler byggdes i Ellös i mitten av 1960-talet, samgående med Christoph Rassys varv 1972 till Hallberg-Rassy Varvs AB, omkring 9 800 levererade båtar",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.hallberg-rassy.com/sv/nyheter/oeppet-varv",
      "org": "hallberg-rassy.com",
      "vad": "Öppet Varv i Ellös på Orust kommer 2026 att gå den 21-23 augusti. ;  — Hallberg Rassy anordnar varje år Öppet Varv, Skandinaviens största Segelbåtmässa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.hotellvarvet.se",
      "org": "hotellvarvet.se",
      "vad": "nyrenoverat lägenhetshotell med en populär lunchrestaurang och perfekt läge vid havet i Ellös på Orust, är enkelt och i gammaldags stil med sina 14 rum",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kobbaroskar.com/",
      "org": "kobbaroskar.com",
      "vad": "Vi hyr ut charmiga stugor på Orust & Tjörn",
      "last": "2026-09-27",
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
      "url": "http://www.prastgardens.se/",
      "org": "prastgardens.se",
      "vad": "I det gamla fiskeläget Mollösund på Orust ligger den anrika Prästgården som restes 1893. Idag fungerar gården som hotell. ; sidan senast ändrad 11 augusti 2026 enligt servern.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.slussenspensionat.se/",
      "org": "slussenspensionat.se",
      "vad": "På norra Orust, i innerskärgården, ligger en plats, Sedan 1987 har det här lilla stället funnits här",
      "last": "2026-09-27",
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
      "url": "https://www.vastsverige.com/en/orust/products/restaurang-cafe-bryggvingen/",
      "org": "vastsverige.com",
      "vad": "restaurang och fiskaffär på Lyr, Orust",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://wards.se/",
      "org": "wards.se",
      "vad": "Sedan 1860 har Mollösunds Wärdshus stått stolt i en av Sveriges äldsta fiskebyar., Vi öppnar ibland ad hoc — hör gärna av dig, så berättar vi mer., För bordsbokning ring",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "tjorn": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/stigfjorden.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Stigfjorden utgör ett innanhav i miniatyr mellan Orust och Tjörn, Bildat: 1979, Areal: cirka 6714 hektar, Naturvårdsförvaltare: Västkuststiftelsen, Under vår och höst gör den rika produktionen i vattnet och på strandängarna området till näringsplats för tusentals änder, gäss, svanar och vadarfåglar, Stigfjorden har upptagits på listan över våtmarker som anses ha stor internationell betydelse enligt den så kallade Ramsarkonventionen, Området ingår i EU:s ekologiska nätverk av skyddade områden, Natura 2000, Det skyddade läget gör att Stigfjordenområdet är rikt på natthamnar, exempelvis vid Smögholmarna längst i väster, Kalven, Bockholmarna, Kälkerön och Hälsön",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Tj%C3%B6rn",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Tjörn\" → Tjörn | Tjörn | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "tjorn.se",
      "vad": "Klädesholmen är egentligen två holmar — den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen, Ta höger i Bleket, mot bron som leder över till Klädesholmen, till Klädesholmen och Lilla Askerön kan du åka bil eller buss, Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer på Klädesholmen, idag kommer 40 procent av alla svenska sillkonserver från Klädesholmen, Från Rönnängs brygga går personfärja till Dyrön, Färjan går från Rönnäng cirka en gång i timman, Färjan går även till Tjörnekalv och Åstol, Till exempelvis Dyrön, Åstol, Härön och Tjörnekalv går regelbunden färjetrafik",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser",
      "org": "tjorn.se",
      "vad": "Den 15 juni 1960 invigdes Tjörnbroleden — en fast förbindelse mellan Stenungsund på fastlandet och Almön på Tjörn, Tjörnbron är en del av länsväg 160 som går förbi Stenungsund och norrut över Tjörn och Orust, När man åker mot Tjörn och kommer ur tunneln öppnar sig landskapet med en storslagen utsikt över fjordarna och skärgården, Vetteberget, Tjörns högsta berg, bjuder på en magnifik utsikt över havet mot horisonten i väst, Vid bra väder syns Danmark och Skagen, På toppen av Vetteberget ligger ett bronsåldersröse daterat till cirka 1 000 år f.Kr, Med 19 meter i diameter är det ett av de största i Bohuslän",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser",
      "org": "tjorn.se",
      "vad": "Badplatsen intill Nordiska Akvarellmuseet har stora gräsytor, sandstrand, klippor, badbrygga, hopptorn, volleybollplan och toaletter, Badplatsen är delvis tillgänglighetsanpassad med handikapptoalett",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/webbplatser/sundsby-sateri",
      "org": "tjorn.se",
      "vad": "Sundsby Säteri ligger på ön Mjörn i Tjörn kommun i Bohuslän, flera naturstigar och ett vackert parklandskap, Parken, vandringsleder och området har öppet året runt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag",
      "org": "tjorn.se",
      "vad": "Inom Tjörn kan du åka linjebuss eller åka med expressbussarna som fortsätter till Stenungsund och Göteborg, Närmaste tågstation ligger i Stenungsund",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tjörn–Stenungsund/Göteborg, Skärhamn torg, Stenungsunds station, Nils Ericson Terminalen, Gäller 14 dec 2025 - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.akvarellmuseet.org/om/historia",
      "org": "akvarellmuseet.org",
      "vad": "År 2000 stod ett centrum för akvarell klart och 16 juni invigdes Nordiska Akvarellmuseet, utlystes vad som kom att bli Nordens dittills största arkitekttävling, 386 arkitektförslag lämnades in och vann gjorde slutligen Niels Bruun och Henrik Corfitsen från Danmark med sitt förslag Mötet, Byggnaden har placerats längs strandlinjen, delvis ute i vattnet, fem gästateljéer uppförda på betongpelare i vattnet, gästateljéerna på Bockholmen, År 2012 byggdes museet ut med en ny konsthall, Sedan dess har museet haft mer än tre miljoner besök",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.bistroportsud.se/",
      "org": "bistroportsud.se",
      "vad": "Södra Hamnen 8, 471 32 Skärhamn, Mat, Dryck & Logi vid bryggkanten i Skärhamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/pilane-gravfalt/",
      "org": "bohuslansmuseum.se",
      "vad": "Det har ungefär 80 synliga gravar från järnåldern, Gravmarkeringarna består av 57 runda stensättningar, tio runda högar, sju domarringar och enstaka sex resta stenar, Det finns inga uppgifter om att det har gjorts någon utgrävning på gravfältet, Skulpturen Anna är 14 meter hög och skapad av den spanske konstnären Jaume Plensa",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://digitaltmuseum.se/021015874271/almobron-i-bohuslan-paseglad-av-bulkfartyget-star-clipper-i-januari-198",
      "org": "digitaltmuseum.se",
      "vad": "Almöbron rasade klockan 01.30 den 18 januari 1980 då brospannet blev påkört av bulkfartyget Star Clipper, Det ena fästet till den största av Tjörnbroarna, Almöbron, Sju bilar körde ut i intet och störtade i havet varvid åtta människor omkom, Dock startade omedelbart planering för provisorisk färjeförbindelse, samt även projekteringen av en ny bro",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "kladesholmenvh.se",
      "vad": "Djupet i gästhamnen är 3-4 meter, El 6 Ampere ingår i alla priser, Förhandsbokning endast Dockspot — 5 platser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://restaurangvatten.se/",
      "org": "restaurangvatten.se",
      "vad": "belägen strax intill Nordiska Akvarellmuseet, Med havet som närmsta granne präglas menyn förstås av fisk och skaldjur, men där finns även alternativ för den som föredrar kött eller vegetariskt, Copyright 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.skarhamnsgasthamn.se/service/",
      "org": "skarhamnsgasthamn.se",
      "vad": "I hamnavgiften ingår bland annat wifi, toalett, dusch, familjedusch, tvättmaskin, torktumlare, Septitanksugen är gratis, Skärhamns gästhamn drivs av Skärhamns Båtförening",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/skarhamn-guest-marina/",
      "org": "vastsverige.com",
      "vad": "located in the middle of Skärhamn on western Tjörn, proximity to shops, restaurants, food stores, During the first weekend of June each year, Skärhamn harbour is home to the wooden boat festival Träbåtsfestivalen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/skulptur-i-pilane/",
      "org": "vastsverige.com",
      "vad": "arrangeras varje sommar en skulpturutställning med världsledande konstnärer, Sedan 2007 har Skulptur i Pilane visat konst av bland annat, är ingen traditionell park utan ett levande beteslandskap, funnit sin permanenta placering i Pilane",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmen/",
      "org": "vastsverige.com",
      "vad": "1950 fanns det 25 konservfabriker på ön och cirka 150 yrkesfiskare, Här finns sillfabrik, sillmuseum och restaurangen Salt & Sill, stoltserar med Sveriges första flytande hotell, På Sveriges nationaldag, den 6 juni, firas också Sillens dag, Då utses också Årets Sill av en namnkunnig jury",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/",
      "org": "vastsverige.com",
      "vad": "Tjörn är en hel övärld — från huvudön till de bilfria öarna Åstol, Dyrön, Tjörnekalv, Härön och Lilla Brattön, tre internationellt kända besöksmål: Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/vatten-restaurang-kafe/",
      "org": "vastsverige.com",
      "vad": "Södra Hamnen 6, The restaurant is certified by A Taste of West Sweden, Eat and drink well at Vatten all year round",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/hotel-nordevik/",
      "org": "vastsverige.com",
      "vad": "boutique hotel in the heart of Skärhamn, individually decorated rooms in a range of sizes, from cosy double rooms to spacious family rooms, Bohuslän-style egg cheese, Hamngatan 60",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/rovor-rum/",
      "org": "vastsverige.com",
      "vad": "mitt i Toftenäs vackra naturreservat, Gårdens gamla ekonomibyggnad med anor från 1700-talet är idag omgjord till två stora lägenheter, Under sommaren, från midsommar och till skolstart, hyrs lägenheterna ut veckovis men resten av året fungerar de även som vandrarhem",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "vastsverige.com",
      "vad": "belägen på västsidan av den omtalade sillön, Gästhamnen har formen av en gryta vilket gör att vinden inte stör, fasta linor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/bistro-port-sud/",
      "org": "vastsverige.com",
      "vad": "Menyn är inspirerad av Västkusten med fräscha råvaror från såväl land som hav och av södra Frankrike med sina Provencalska smaker",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "kungshamn": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/halloarkipelagen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Bildat: 1975, Areal: cirka 292 hektar, Öarna är flacka och mycket utsatta för väder och vind, buskar som slån, nypon och vide är förvisade till små sänkor och sprickdalar, Från öarna kan du studera sträck av änder, lommar och alkor, Till häckfåglarna hör tofsvipa, enkelbeckasin, kustlabb och rödbena, Med en vit blixt var tolfte sekund gör sig Bohusläns äldsta fyr påmind, Här har den stått sedan 1842 på Hållös högsta punkt, Fyren förklarades som byggnadsminne 1935, radiopejlingsstationen fungerar idag som vandrarhem, Sommartid utgår regelbundna badturer från Kungshamn, Det finns ett fyrtiotal jättegrytor på Hållö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kungshamn",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kungshamn\" → Kungshamn | Sotenäs | Tätort, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/batar-och-hamnar/gasthamnar/kungshamns-gasthamn",
      "org": "sotenas.se",
      "vad": "Antal platser: ca 100st, Vattendjup: 2,5-5m, Dusch, WC, tvättstuga, färskvatten, eluttag, wifi, sopor och mycket centralt placerad, Det finns ett bra shoppingsutbud, livsmedel, systembolag, restauranger, nattklubbar och banker, Personal finns på plats alla dagar under högsäsong v25-33",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn",
      "org": "sotenas.se",
      "vad": "Klippbad med sandstrand. Bryggor med badstegar. Handikappramp, omklädningsrum, toalett och handikapptoalett, Klippbad med badstegar, hopptorn och trampolin, Ramnerer",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/vandringsleder/soteleden-och-kuststigen",
      "org": "sotenas.se",
      "vad": "Planera din vandring med de digitala kartorna över Soteleden och Kuststigen i Kartportalen. Här finns etappförslag",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/taxorochavgifter/bussbatochtag.4.5d92f42815befa72d8ea31ef.html",
      "org": "sotenas.se",
      "vad": "Avstånd Göteborg: 130 km, Vid Gläborgmotet, norr om Munkedal, tag höger på väg 162 mot Kungshamn/Smögen. Efter ca 6 km , vid Hallinden, tag höger på väg 171 mot Kungshamn/Smögen, Direktbussar till Sotenäs går från bland annat Kampenhof, Uddevalla och Nils Ericson-terminalen, Göteborg",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Smögen–Kungshamn–Uddevalla–Trollhättan, Kungshamns busstation, Uddevalla central, Gäller 14 dec 2025 - 12 dec 2026, Linjen trafikeras av Vy Buss",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://fyrenkungshamn.se/",
      "org": "fyrenkungshamn.se",
      "vad": "Med det mest centrala läget du kan hitta i Kungshamn, precis vid havet och strandpromenaden, Längst in i hamnen i Kungshamn finner du oss, Hemlagad husmanskost till ett bra pris, Ett stort lass med räkor, serveras på tekaka, Tagliatelle, kycklingfilé, pesto, grädde, Vi har även pizza för avhämtning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hamnbageriet.se/",
      "org": "hamnbageriet.se",
      "vad": "Bagerihuset är själva hjärtat i Hamnbageriet, Huset är öppet året om, Glass och mathuset öppnar vi upp under sommarmånaderna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hotellkungshamn.se/",
      "org": "hotellkungshamn.se",
      "vad": "Högst upp på en klippa i hjärtat av Kungshamn solar sig vårt unika boende, Hotellgatan 6, 456 31 Kungshamn, under 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://nordensark.se/om-oss/",
      "org": "nordensark.se",
      "vad": "Nordens Ark är en ideell stiftelse som arbetar för att ge hotade djur en framtid, Nordens Ark har funnits sedan 1989 och den zoologiska parken är öppen för besökare, Åby säteri omfattar totalt 383 hektar mark, Nordens Ark har ett nationellt ansvar för uppfödning och utplantering av flera svenska arter, Åby säteri, 456 93 Hunnebostrand",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://shop.hamnbageriet.se/",
      "org": "shop.hamnbageriet.se",
      "vad": "ett härligt bageri och café i hjärtat av Kungshamn, 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/made-in-sotenas/",
      "org": "vastsverige.com",
      "vad": "Här finns flera stora företag inom fiskberedning och mat från havet, I Kungshamn tillverkar man, och det har man gjort sedan 1954, Sill, ansjovis och mycket annat som ställs på borden tillverkas också av Orkla i Kungshamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/kungshamn/",
      "org": "vastsverige.com",
      "vad": "Strax innan den södra infarten till Kungshamn ligger det lilla samhället Hovenäset, Hovenäsbron som förbinder Hovenäset med Kungshamn byggdes i början av 1900-talet, den sägs vara unik pga att den är Sveriges största valvbro av granit",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sotenas/artiklar/smogen/",
      "org": "vastsverige.com",
      "vad": "Landets näst största fiskauktion ligger på Smögen, Här landar fiskebåtarna sina fångster av färsk fisk och skaldjur, som du lite senare kan köpa i fiskaffärerna om hörnet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/sotenas/produkter/hotell-kungshamn/",
      "org": "vastsverige.com",
      "vad": "most of them having a balcony or terrace with fantastic views over the coast of Bohuslän, The hotel's renowned restaurant is well situated, with a great view of the Kungshamn inlet",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "pater-noster": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Pater%20Noster",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Pater Noster\" → Pater Noster | Tjörn | Anläggning (fyren på Hamneskär), SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/hamneskar-och-pater-noster",
      "org": "sfv.se",
      "vad": "Arbetet med att binda ihop landets kuster med fyrar leddes av fyringenjör Gustav von Heidenstam vid Lotsverket, Pater Noster började lysa den 1 november 1868, Pater Nosterskären består av 97 öar som breder ut sig från Tjörns sydvästra udde och ner i höjd med Marstrand",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/pater-noster---ett-hem-vid-horisonten",
      "org": "tjorn.se",
      "vad": "Fyren Pater Noster är 32 meter hög och konstruerades av Nils Gustav von Heidenstam, Pater Noster är latin för Fader vår, Det sägs att sjömännen bad bönen när de siktade skären, Starka havsströmmar och förrädiska grund har fått många fartyg att förlisa där.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.head4waves.se/",
      "org": "head4waves.se",
      "vad": "Under högsäsongen erbjuder vi fasta dagsturer till den fantastiska fyrplatsen Pater Noster",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandtransport.se/",
      "org": "marstrandtransport.se",
      "vad": "från Marstrandsön med omnejd ända ut till Pater Noster, Hamneskär med RIB",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/om-pater-noster",
      "org": "paternoster.se",
      "vad": "År 2020 omvandlade designer på Stylt den gamla bostaden för generationer av fyrvaktare till ett unikt och personligt boutiquehotell",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/fragor-svar",
      "org": "paternoster.se",
      "vad": "Om du inte är hotellgäst är du välkommen att besöka fyren och den tillhörande utställningen, där entré betalas på plats, Övriga byggnader på ön är reserverade för vår verksamhet och våra hotellgäster, Nej, det går ingen reguljär färja till Pater Noster, Alla våra boendepaket på Pater Noster inkluderar RIB-transport tur och retur från Marstrand eller Rönnäng",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/",
      "org": "paternoster.se",
      "vad": "Vi använder lokala råvaror utifrån säsong och i fyrträdgården odlas grönsaker och örter, Fisk och skaldjur från Kattegatt och Skagerrak står i fokus, fått utmärkelser som Världens bästa hotellkoncept, Stora Turismpriset samt The Special One",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/ta-dig-hit",
      "org": "paternoster.se",
      "vad": "Restid ca 20 min från både Marstrand söder ifrån och Rönnäng norr ifrån., Hemresa är kl 10.30 till samma hamn som vid utresa., Bakom Marstrands färjeläge, nedanför Coop på Koön, Stansvikstappen, sjötapp i Rönnäng",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/aktiviteter",
      "org": "paternoster.se",
      "vad": "Paddla ca 2h med guide i havskajak bland kobbar och skär runt Pater Noster, Vår sälsafari-tur ger dig en unik möjlighet att lära dig mer om dessa fascinerande djur",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/sommarcafet",
      "org": "paternoster.se",
      "vad": "Under sommaren 2026 driver vi ett sommarcafé på Pater Noster med fika, kaffe, hembakat samt ett urval av kalla rätter inspirerade av havet och säsongen, Öppna dagar och tider styrs av vädret och kan variera",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://paternoster.se/besok-oss",
      "org": "paternoster.se",
      "vad": "Pater Noster är ett prisbelönt fyrhotell på en avskild ö längst ut i Bohusläns skärgård",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/pater-noster/",
      "org": "vastsverige.com",
      "vad": "tack vare designbyrån, Stylt Trampoli, Sommartid går det även bra att boka sovplats där den sköna sängen placerats på klipporna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/",
      "org": "vastsverige.com",
      "vad": "Här väntar tre internationellt kända besöksmål: Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster",
      "last": "2026-09-27",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Vinga",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Vinga\" → Vinga | Göteborg | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=H%C3%B6n%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hönö\" → Hönö | Öckerö | Natur- och terrängnamn, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
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
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "",
      "last": "2026-09-29",
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
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Husen står tätt tillsammans, vilket beror på att Gullholmen fram till 1999 var en så kallad kronoholme., På öns norra del ligger Stenstugan, som är ett av de äldsta husen på ön. Det är idag museum.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Gullholmen",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Gullholmen\" → Gullholmen | Orust | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/uppleva-och-gora/gasthamnar/gullholmens-gasthamn",
      "org": "orust.se",
      "vad": "Gullholmens hamn är öppen 1 april till 30 september., 50 platser. Djup cirka 1,5-3,5 meter., Servicebyggnad med toalett, dusch, tvättmaskin, torktumlare., Sugtömningsstation där fritidsbåtar kan tömma sin latrintank, mellan 1 april och 31 oktober., Förhandsbokning av gästplats sker via Dockspot. Hamnen är kontantfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tuvesvik–Gullholmen–Käringön, Gäller 15 sept - 31 okt 2026 . Tuvesvik–Gullholmen tar 5 min i varje tur (t.ex. 08.30–08.35 hamnen, 12.30–12.35 piren); båten lägger till vid Gullholmen hamnen eller Gullholmen piren beroende på tur.",
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
      "url": "https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/",
      "org": "vastsverige.com",
      "vad": "line 381, operate every day all year round, You can bring a bicycle . OBS: samma sida anger tio minuter, men Västtrafiks tidtabell och  (5 minuter till Härmanö/Gullholmen) säger fem.",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kl%C3%A4desholmen",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Klädesholmen\" → Klädesholmen | Tjörn | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/tjorn-pa-hosten-och-vintern/tjorn-och-sillen",
      "org": "tjorn.se",
      "vad": "Ända sedan 1500-talet har Klädesholmen varit en viktig plats för sillhandeln., Riktig fart tog det under den stora sillperioden på 1700-talet, Nästa sillperiod kom runt 1870., 1967 fanns det 26 fabriker på Klädesholmen., Vid millennieskiftet var det tre fabriker kvar som bestämde sig för att gå samman., Sill som räckte både till föda och till gatlyktorna i Paris, som lär ha spridit sitt sken med hjälp av sillolja från Bohuslän.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/oar-runt-tjorn",
      "org": "tjorn.se",
      "vad": "Klädesholmen är egentligen två holmar — den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen., så skrev biskop Jens Nilsson från Oslo i sin resa genom Bohuslän 1594, En gissning som mycket väl kan stämma är att de första bosättarna kom hit på 1200-talet.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "tjorn.se",
      "vad": "Flytande hotell vid Klädesholmen, en ö med broförbindelse.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/bygga-bo-miljo-och-trafik/trafik-och-resor/buss-bat-och-tag",
      "org": "tjorn.se",
      "vad": "Närmaste tågstation ligger i Stenungsund., Inom Tjörn kan du åka linjebuss eller åka med expressbussarna som fortsätter till Stenungsund och Göteborg.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tjörn–Stenungsund/Göteborg, Gäller 14 dec 2025 - 12 dec 2026, Klädesholmen östra 08.33 09.33 10.33 11.33 12.33 13.33 14.33 15.33 16.33 17.33 18.33 19.33 20.33 21.33 22.33, Stenungsunds station 09.28 10.28 11.28 12.28 13.28 14.28 15.28 16.28 17.28 18.28 19.28 20.28 21.28 22.28 23.28, Klädesholmen östra 05.03 06.03 06.33 07.03 07.33 08.33, Nils Ericson Terminalen 06.02 06.35 07.05 07.20 07.32 07.35 08.05 — lör/sön Klädesholmen östra 08.33 → Stenungsunds station 09.28 (55 min); vardagar Klädesholmen östra 06.03 → Nils Ericson Terminalen 07.35 (92 min)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kladesholmen.com/",
      "org": "kladesholmen.com",
      "vad": "trånga gränder, med tät bebyggelse",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kladesholmen.com/att-gora/museum/",
      "org": "kladesholmen.com",
      "vad": "fisk- och sillberedning från ca 1860 fram till dagens moderna industri — öppnade 1995 i en tidigare konservfabrik, flyttade 2020 till Sillens hus på Strandgatan 12B, drivs ideellt, dokumentationsavdelning med bild, film och intervjuer",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kladesholmensbastu.se/",
      "org": "kladesholmensbastu.se",
      "vad": "magnifika utsikten mot väst, med Flatholmen och havet i blickfånget — bokning via boka.kladesholmensbastu.se",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "kladesholmenvh.se",
      "vad": "Djupet i gästhamnen är 3-4 meter, El 6 Ampere ingår i alla priser, Ja, el och färskvatten finns tillgängligt vid bryggorna., Ja, dusch och toalett finns för gästande båtar., Förhandsbokning endast Dockspot — 5 platser., Högsäsong Vecka 25-33, 8.Grillplats",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/om-salt-sill/var-historia/",
      "org": "saltosill.se",
      "vad": "Restaurangens specialitet blev sill, Sveriges första flytande hotell, Hotellet byggdes på flytande pontoner, som specialtillverkades av, i juli 2008, bogserades de sex hotellmodulerna från Wallhamn, Våren 2013 stod de 300 kvadratmeter nya lokalerna klara, Destination Salt & Sill har idag fyra olika restauranger. Salt & Sill, Sjöboden, Saltbaren och Holmens kiosk.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/houseofherrings/",
      "org": "saltosill.se",
      "vad": "en butik fylld av sill, tradition och smakupplevelser — drivs av Salt & Sill, Strandgatan 12, sill från Klädesholmen Seafood",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/hotell/",
      "org": "saltosill.se",
      "vad": "Sveriges första flytande hotell, Enkelrum och dubbelrum med havsutsikt, vår enda svit, Villa stora Salt är en separat villa, Villa lilla Salt är en separat villa",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/aktiviteter/bad-och-bastubaten/",
      "org": "saltosill.se",
      "vad": "Förtöjd vid Salt & Sills brygga ligger S/S Silla — vår bad- och bastubåt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/sjoboden/",
      "org": "saltosill.se",
      "vad": "napolitanska pizzor med krispiga bottnar, färska skaldjur fiskade i Västerhavet, fräscha sallader — sommaröppet, lokalen kan hyras resten av året",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/holmens-kiosk/",
      "org": "saltosill.se",
      "vad": "glass, havsbris och sommar på riktigt — kulglass, fish n chips, grillkorv, wraps, sallader och toast, allt som takeaway; stängd för säsongen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/restauranger/",
      "org": "saltosill.se",
      "vad": "Saltbaren är en plats där du kan koppla av och njuta av utsikten över havet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.saltosill.se/fragor-svar/",
      "org": "saltosill.se",
      "vad": "Kopplade, Nära sin ägare, Under uppsikt — hundrum kan förbokas, hundar tillåtna i restaurangens övre del men inte inomhus under julbord, påsk- och midsommarbuffé; hundar kan läggas längs uteserveringen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/kladesholmens-sauna/",
      "org": "vastsverige.com",
      "vad": "In the beautiful Jungfruviken on Klädesholmen, there's a clever solution where you can pump seawater into the hot tub, In addition to piers and ladders, there is a spacious relaxation area, a kitchen, changing rooms, showers, and toilets., It can accommodate groups of up to 12 people., The facility is accessible for all., The sauna is operated by the Klädesholmen Sauna Association.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/kladesholmen/",
      "org": "vastsverige.com",
      "vad": "linked by a bridge that was built in 1983, traditional white wooden houses that are typical of fishing communities along the coast, Skomakaregatan (Shoemaker Street), Kustroddarvägen (Coastguard Road), Fiskargränd, granite sculpture: Faith, Hope and Love",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/house-of-herrings/",
      "org": "vastsverige.com",
      "vad": "House of Herrings — världens första och enda sillbutik — hittar du mitt på Klädesholmen i Bohuslän, precis intill Sillmuseet., samt köpa tillbehör för egna inläggningar, Du hittar också lokala delikatesser från Bohuslän och fina souvenirer att ta med hem",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "vastsverige.com",
      "vad": "Platser: 35, Gästhamnen har formen av en gryta vilket gör att vinden inte stör., Båtkran, dusch, el, livsmedel, mastkran, restaurang, toalett och båtramp. Sugtömning av latrin. Miljöstation. Nära till mataffär.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "astol": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%85stol",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Åstol\" → Åstol | Tjörn | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/app/uploads/2022/11/V%C3%A4stra-G%C3%B6taland-O_riksintressen.pdf",
      "org": "raa.se",
      "vad": "Fiskeläge från 1700-talets sillperiod, på en kal minimal ö, som genom en intensiv bebyggelsefas under 1920-1950-talet utvecklats till ett av västkustens mest tättbebyggda kustsamhällen",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/turism-och-sevardheter/ata-och-bo",
      "org": "tjorn.se",
      "vad": "Åstols Rökeri, Restaurang på Åstol",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/batliv-och-hamnar",
      "org": "tjorn.se",
      "vad": "Åstol",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/hund-i-naturen",
      "org": "tjorn.se",
      "vad": "under vistelse utomhus på offentlig plats där folksamlingar förekommer, eller kan antas förekomma, ska hundar alltid hållas kopplade, 1 mars och 20 augusti",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/",
      "org": "Västtrafik",
      "vad": "Ha djuret i koppel, bur eller väska, Vid resa med båt ska husdjur vara på styrbord",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng, Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tjörn–Stenungsund/Göteborg, Nils Ericson Terminalen, J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och, Gäller 14 dec 2025 - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://astol.se/besok-astol/",
      "org": "astol.se",
      "vad": "Till Åstol tar du Västtrafiks linje 361 och personfärjan Ellenor från hållplatsen Rönnängs brygga, överfarten tar mellan 10 och 20 minuter, Långtidsparkering (upp till sju dygn) finns vid Tjörns ishall i Stansvik. Härifrån tar det cirka 20 minuter att promenera till färjeläget, Har du svårt att promenera har bussen en hållplats vid ishallen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://astol.se/bo-ata/",
      "org": "astol.se",
      "vad": "Åstols café ligger väl skyddat inne i hamnen och drivs av Elimförsamlingen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.astolshamn.se/gasthamn/",
      "org": "astolshamn.se",
      "vad": "I avgiften ingår: toalett, dusch, wifi, tvättmaskin, torktumlare, Vatten är också avstängt fr.o.m. början november till början april, Under högsäsong från mitten juni till mitten augusti är hamnkontoret (som ligger på norra piren) bemannat dagligen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://astolsrokeri.se/",
      "org": "astolsrokeri.se",
      "vad": "Hamnen 4, fantastiskt tillagade rätter från havet, en enorm bredd på musikaliska framträdanden",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/astol/",
      "org": "vastsverige.com",
      "vad": "surrounded by rugged rocks rising from the sea, The narrow, car-free streets meander between the houses, Åstol was first inhabited in the mid-18th century in connection with one of the great herring periods, More than 20 large steel trawlers had their home port on Åstol in the 1960s, The fishing industry declined during the 1970s",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/",
      "org": "vastsverige.com",
      "vad": "en bilfri klippö, Här slingrar sig smala gränder mellan vitmålade trähus",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/",
      "org": "vastsverige.com",
      "vad": "Västtrafiks kontoladdning eller köp enkelbiljett ombord, Biljettautomat finns vid färjeläget i Rönnäng, Cykel kan tas med",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/astols-gasthamn/",
      "org": "vastsverige.com",
      "vad": "Här finns plats för ca. 80 gästande båtar, med stävförtöjning samt långsidesförtöjning, Det finns 75 st elanslutningar mot avgift, Elektricitet, Wifi, Färskvatten, Båtkran, Miljöstation, Sopmaja, Septisug",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/astols-rokeri/",
      "org": "vastsverige.com",
      "vad": "The restaurant is booming with activity from April to September, In summertime, the hotel’s musicians gather in the afternoons at the very end of the northern pier",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "dyron": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Stora%20Dyr%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Stora Dyrön\" → Stora Dyrön | Tjörn | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/vandra/dyrons-vandringsleder",
      "org": "tjorn.se",
      "vad": "Den gula leden går runt hela ön och är cirka 5 kilometer, Den blå leden går över bergen från norr till söder och är 1,6 kilometer, Medelsvår, Från Sydhamnen går det att med rullstol och barnvagn ta sig västerut en bit längs leden fram till bastun, Längs med leden finns en rad olika rastplatser med bord och bänkar, en fantastisk utsikt över havet med öarna Marstrand och Åstol och fyren Pater Noster, På öns östra sida finns det längs vandringen en fin sandstrand där man kan rasta och bada",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/hund-i-naturen",
      "org": "tjorn.se",
      "vad": "Hundar ska alltid hållas kopplade utomhus på offentliga platser där människor samlas, Här får hundar inte vistas, 1 mars och 20 augusti",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/",
      "org": "Västtrafik",
      "vad": "Ha djuret i koppel, bur eller väska, Vid resa med båt ska husdjur vara på styrbord",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng, Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug, C Turen måste förbeställas på tel: 0304-601242",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Nils Ericson Terminalen, J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och, Gäller 14 dec 2025 - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6326__0__LINE__20260817__20260930__3f059e68-c41c-44bf-bb36-b0b087de0549__1%2C0__2778882.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Dyrön — Rökan — Rörtången, Gäller 17 aug - 30 sept 2026",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6326__0__LINE__20261001__20261031__5c843cab-c0f3-4630-88cc-c2a33e730dbc__1%2C0__2778908.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Gäller 1 okt - 31 okt 2026, Resan måste förbeställas senast tre timmar före avgång",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.dyron.se/om-dyron/",
      "org": "dyron.se",
      "vad": "Dyrön strax norr om Marstrand är en av Tjörns kommuns sex skärgårdsöar med boende året runt, Bebyggelsen ligger samlad i en dalgång som sträcker sig mellan Nord- och Sydhamnen, På ömse sidor dalgången är det berg- och klippterräng med hällmarker och sänkor. Raviner genomkorsar landskapet på flera ställen., Berggrunden domineras av mörka mineral, Bergarten kallas för metabasit, På nordöstra sidan av ön finns kuddlavastruktur, ett för landet unikt inslag i berggrunden, området ingår i riksintresse för naturvården (NO 17b), Ett speciellt inslag är de inplanterade vilda bergsfåren s k mufflonfår",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/se-gora/mufflonfar/",
      "org": "dyron.se",
      "vad": "Det bor cirka 50 — 60 stycken på Dyrön som lever fritt bland skog och berg",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/ata-bo/pizzeria/",
      "org": "dyron.se",
      "vad": "Öns egen ICA-butik Dyröboden erbjuder inte bara ett mycket bra sortiment och öppet året runt. De bakar även pizza i egen pizzaugn., i caféet finns microugn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/ata-bo/dyrons-vardshus-restaurang/",
      "org": "dyron.se",
      "vad": "Välkommen till vår restaurang i Nordhamnen mittemot färjeläget, där vi serverar lunch och middag",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/ata-bo/cafe-kiosk/",
      "org": "dyron.se",
      "vad": "I Sydhamnen finns under sommaren kiosk och café med uteservering, I anslutning till caféet ligger också minigolfen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/ata-bo/vaffelcafe/",
      "org": "dyron.se",
      "vad": "När Kiosk och Café stänger för sommaren öppnar Våffelcafé i samma lokal. Våffelcaféet är obemannat",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/se-gora/vandra/",
      "org": "dyron.se",
      "vad": "Lederna är delvis bergiga och kan vara hala om det regnat, Trappor, broar och räcken förenklar dock vandringen på de svåra ställena, Gula leden är 5 km lång runt hela ön, men det finns 6 ingångar/utgångar så du kan välja kortare väg, Den byggdes av ett gäng pensionärer, helt ideellt, under åren 2000–2008",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/se-gora/badplatser/",
      "org": "dyron.se",
      "vad": "I Nordhamnen ligger en badplats med pontonbrygga och sandstrand, Badplatsen är mycket populär bland barnfamiljer, Sydhamnens badplats heter Hala, Här finns också en liten sandstrand och brygga, hoppa och dyka från trampolin, klippor och 3-meterstornet, Här finns också en lättillgänglig badbrygga med stege",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/hamnar/nordhamnen/",
      "org": "dyron.se",
      "vad": "I Nordhamnen finns plats för ca 40 båtar, 10 förtöjningar vid boj i yttre bassängen och 30 långsides mot kajen i inre bassängen, Dessutom tillfälligt lediga grönmarkerade privata platser, I hamnen finns toalett, dusch, sophantering, el och vatten samt tvättstuga med tvättmaskin, Möjlighet för tömning av septiktank finns i yttre bassängen på piren bredvid färjans tilläggningsplats, Nordhamnen ligger 50 m från handikappanpassad badplats med bryggor och sandstrand",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/hamnar/sydhamnen/",
      "org": "dyron.se",
      "vad": "I sydhamnen finns plats 50 gästbåtar, 20 vid bommar väster om inloppet och 30 långsides vid norra kajen, tvättstuga med tvättmaskin och torktumlare. Ingen extra avgift tas ut för tvättstugan, I hamnen finns kran för lyft på max 5 ton, Vid Linas Brygga kan du också tanka diesel och byta dina gasolflaskor",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/se-gora/bastu/",
      "org": "dyron.se",
      "vad": "Dyröns bastu, som drivs av Dyröns Samhällsförening, utnämndes år 2008 till Sveriges finaste eluppvärmda bastu av finska Sisuradion på Sveriges Radio, Bastu, som är handikappanpassad, ligger på öns sydsida, Bastun rymmer 12 personer, Efter bastubadet kan du bada från bryggan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/ta-dig-hit/",
      "org": "dyron.se",
      "vad": "Sommartid parkerar du vid Rönnängs Ishall, varifrån du har en promenad på cirka 15 minuter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/ata-bo/linas-brygga/",
      "org": "dyron.se",
      "vad": "I Sydhamnen hittar du Linas Brygga med café och butik med glassmenyer, hembakt och smårätter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/om-dyron/historia/",
      "org": "dyron.se",
      "vad": "Oscar II invigde den efterlängtade Nordhamnen, som är den första hamnen i Sverige som byggts med statsunderstöd, den 2 september 1902, Dyrön hade emellertid ingen hamn utan jordbruk och boskapsskötsel var fortfarande huvudnäring på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://dyronsvardshus.se/",
      "org": "dyronsvardshus.se",
      "vad": "På Dyröns Värdshus lagar vi mat inspirerad av havet och säsongen runt oss, Här möts lokala råvaror, skärgårdsmiljö och en meny som förändras efter vad Bohuslän har att erbjuda, Vilka fantastiska artistkvällar vi har fått uppleva tillsammans på Dyröns Värdshus, Höstens höjdpunkt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/tjorn/ica-nara-dyroboden-1634/start/",
      "org": "ica.se",
      "vad": "Postombud, Apoteksombud, Systembolagsombud, Månadens pizza",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://linasbrygga.se/",
      "org": "linasbrygga.se",
      "vad": "Räksmörgåsar, glasskreationer, hembakat, äggost och annat gott., Förutom caféverksamheten, erbjuder vi också boende och sjömack., Hamnvägen 80, Södra hamnen, Tack för sommaren 2026. Välkomna åter våren 2027",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/se-och-gora/bilfria-oar/",
      "org": "vastsverige.com",
      "vad": "Ta färjan till en av Tjörns bilfria öar, Håll utkik — med lite tur får du syn på de vilda mufflonfåren",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/dyron/",
      "org": "vastsverige.com",
      "vad": "you can book it all year round",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/tjorn/products/dyrons-vardshus/",
      "org": "vastsverige.com",
      "vad": "shellfish and fish to meat, vegetables, and mushrooms",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/personfarja-ronnang-tjornekalv-dyron-astol/",
      "org": "vastsverige.com",
      "vad": "linje 361 alla dagar året runt, Västtrafiks kontoladdning eller köp enkelbiljett ombord, Biljettautomat finns vid färjeläget i Rönnäng, Cykel kan tas med",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/dyrons-gasthamn-nord-sydhamnen/",
      "org": "vastsverige.com",
      "vad": "Sugtömning av latrin",
      "last": "2026-09-27",
      "myndighet": false
    }
  ]
}

/** Antal öar med minst en publicerbar källa. */
export const OAR_MED_KALLOR = 102

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
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaHistorik.raa?page=historik&visaHistorik=true&byggnadId=21400000691324",
      "org": "bebyggelseregistret.raa.se",
      "vad": "Grönskärs fyr, som ligger vid inseglingsleden till Sandhamn, är en av den svenska östersjökustens äldsta fyrar., Den uppfördes 1769-70., Ritningar till fyr och fyrvaktarbostad uppgjordes av en av dåtidens främste arkitekter Carl Fredrik Adelcrantz., år 1770 tändes fyren (Riksantikvarieämbetets bebyggelseregister; texten ur Länsstyrelsens byggnadsminnesförklaring 1994)",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaBeskrivning.raa?byggnadId=21400000691324&page=beskrivning&visaBeskrivningar=true",
      "org": "bebyggelseregistret.raa.se",
      "vad": "GRÖNSKÄRS FYR, Angöringsfyr, Stomme, Murverk - Natursten (Riksantikvarieämbetets bebyggelseregister, inventering 2000)",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaHistorikText.raa?byggnadBeskrivningId=21720000042759&byggnadId=21400000691324&historikId=21000001847091",
      "org": "bebyggelseregistret.raa.se",
      "vad": "åren 1786-1787 byggdes den på till en höjd av cirka 26 meter, 1844-1845 ersattes den öppna stenkolselden av en linsapparat, Linsapparaten levererades av firman Lepaute i Paris., När Revengegrundets kassunfyr togs i bruk släcktes Grönskärs fyr och fyrplatsen avbemannades 1961., en ny lins har installerats och år 2000 tändes fyren igen. (Riksantikvarieämbetets bebyggelseregister, inventering 2000)",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/anlaggning/visaLagskydd.raa?anlaggningId=21300000013611&page=lagskydd",
      "org": "bebyggelseregistret.raa.se",
      "vad": "GRÖNSKÄRS FYRPLATS, Aktuella lagskydd, 1994-03-17, Byggnadsminne (BM) 3 kap. KML (Riksantikvarieämbetets bebyggelseregister)",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen Stockholm",
      "vad": "näbbgädda: \"Våren och sommaren\", \"I Stockholms yttre skärgård från Sandhamn och söderut\", \"Grönskär, Horsten, Långviksskär, Ålö, Torö\"",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.2887c5dd16488fe880d65fa4/1538494858083/01FS%202018%20048%20L%C3%A4nsstyrelsen%20i%20Stockholms%20l%C3%A4ns%20f%C3%B6reskrifter%20%2801FS%202001138%29%20om%20sj%C3%B6trafiken%20m.m.%2C%20utom%20vissa%20ankringsf%C3%B6rbud%2C%20inom%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen Stockholm",
      "vad": "135. Sandhamn, Förbud mot högre fart än fem knop vid Sandhamn inom ett område begränsat västerut av longituden genom Telegrafholmens västligaste udde och öster ut av en rät linje Dansbergets västra sida (Herrbadet) – Ringgrundet – Ostkobben på Kroksö., I norr avgränsas området dels av smalaste delen av sundet mellan Telegrafholmen och Lökholmen, smalaste sundet vid Marudden mellan Lökholmen och Kroksö",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gronskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Grönskär ligger i det yttersta kustbandet 5 kilometer öster om Sandhamn., Grönskär är en liten, flack och vegetationsfattig ö i det yttersta kustbandet öster om Sandhamn., Reservatet omfattar endast en mindre del av ön., Skyddat sedan: 1965, Storlek: 1,6 hektar varav land 1,1 hektar, Markägare: Skärgårdsstiftelsen, Förvaltare: Skärgårdsstiftelsen",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/hundar-i-naturen/",
      "org": "Naturvårdsverket",
      "vad": "Mellan 1 mars och 20 augusti måste du ha extra uppsikt över din hund i naturen. Under den tiden får hunden inte springa lös., Ha alltid koppel på hunden när ni vistas i nationalparker eller naturreservat",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html",
      "org": "varmdo.se",
      "vad": "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida., Trouville ligger omkring 20 minuters promenad från hamnen., Toaletter sommartid, Badet ägs och sköts av Eknö hemman., Ingen provtagning av badvatten utförs av Värmdö kommun.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/flaskberget.4.18c983316e0536cb189a2c1.html",
      "org": "varmdo.se",
      "vad": "Ett fint klippbad alldeles vid Sandhamns by., Badet fick sitt namn efter en skuta lastad med fläsk gick på grund och sjönk där för länge sedan., Toaletter sommartid, Badet ägs och sköts av Eknö hemman., Ingen provtagning av badvatten utförs av Värmdö kommun",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "varmdo.se",
      "vad": "Den cirka 8 km stigen går runt hela Sandön., Stigen utgår från Sandhamn, passerar sandstranden Trouville och vidare genom den vackra och ljusa tallskogen som är typisk för ön.",
      "last": "2026-11-09",
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
      "url": "https://www.varmdo.se/varmdohamnar/stavsnasvinterhamn.4.1524f1c618a8d1d9fee45c6d.html",
      "org": "varmdo.se",
      "vad": "Stavsnäs vinterhamn är den viktigaste knutpunkten mellan fastlandet och skärgårdsöar som Sandhamn, Runmarö, Harö och Eknö., Med bil Följ väg 222 från Stockholm. Vägen slutar vid Stavsnäs vinterhamn., Rederier, Waxholmsbolaget (Värmdö kommun, Värmdö Hamnar)",
      "last": "2026-11-09",
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
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo.4.18c983316e0536cb189a176.html",
      "org": "varmdo.se",
      "vad": "Badplatser i Värmdö kommun, Trouville, Sandhamn, Fläskberget",
      "last": "2026-11-10",
      "myndighet": true
    },
    {
      "url": "https://api.openstreetmap.org/api/0.6/map?bbox=18.9050,59.2860,18.9200,59.2920",
      "org": "api.openstreetmap.org",
      "vad": "ferry_terminal, Sandhamn, toilets; uppmätt: färjeterminalen Sandhamn (nod 476790748) ligger 521 m fågelvägen öster om kommunens punkt för Fläskberget, och hamnens toalett (nod 2495934893) 107 m öster om färjeterminalen",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://battaxi.se/sandhamnslinjen-2/",
      "org": "battaxi.se",
      "vad": "Sandhamnslinjen är en direkt reguljär tur som tar dig mellan Stavsnäs och Sandhamn på endast 30 minuter!, Bokade biljetter har alltid förtur, men det går även bra att köpa biljett direkt på båten., Höst 2 2026 (21/9-20/12) (Stavsnäs Båttaxi)",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://battaxi.se/ws/media-library/064f8aced20361f244b2b24e67733021/sandhamn-host-2--26.pdf",
      "org": "battaxi.se",
      "vad": "Buss 433 / 434 från Stockholm, Höst 2, 2026, 21/9- 20/12; uppmätt i tabellen: Slussen–Sandhamn med anslutande buss och Sandhamnslinjen 82–90 min på de flesta turer",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.dykarbaren.se/",
      "org": "dykarbaren.se",
      "vad": "DYKARBAREN SANDHAMN, Vi erbjuder endast bordsbokning inomhus då vår uteservering inte helt går att vädersäkra, Öppet 2026, säsong maj – september",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://ksss.se/en/gotlandrunt/",
      "org": "ksss.se",
      "vad": "Gotland Runt Offshore Race was first sailed in 1937., since 2024 it starts at Gråskärsfjärden south of Sandön, The race course then goes north along the outer archipelago to the Svenska Högarna, before the boats sail south on open water to round Gotland with the finish at Sandhamn",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://ksss.se/KSSS/historia/",
      "org": "ksss.se",
      "vad": "KSSS grundades i Stockholm 1830 under namnet Svenska Segel Sällskapet",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/hamnar/lokholmen",
      "org": "ksss.se",
      "vad": "I mer än 100 år har Sandhamn och Lökholmen varit basen för KSSS kappseglingsverksamhet., Lökholmens gästhamn är belägen strax nordost om Sandhamns gästhamn.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/hamnar/sandhamn/aktuellt",
      "org": "ksss.se",
      "vad": "Vatten på bryggorna och servicehusen med dusch, toalett och tvättstuga är endast öppna maj till september., Service under lågsäsong och vinter, I nuläget finns ström endast tillgängigt på brygga A (Längst västerut), Här på Sandhamn har vi en enorm vattenbrist., Vi har satt en maxgräns på 100L vatten per båt för att se till att våra tankar inte ska ta slut.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/hamnar/sandhamn",
      "org": "ksss.se",
      "vad": "Gästhamnen på Sandhamn består av tre pontonbryggor med mellanliggande kajer framför Seglarhotellet., Det finns ca 150 gästplatser på Sandhamn., Hamnen är öppen från sista helgen i april till sista helgen i oktober., Gästhamnen har 20 st bokningsbara platser som bokas via www.dockspot.com",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.ksss.se/en/gotlandrunt/",
      "org": "ksss.se",
      "vad": "since 2024 it starts at Gråskärsfjärden south of Sandön, with the finish at Sandhamn",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.naturkartan.se/sv/stockholms-lan/sandon-2",
      "org": "naturkartan.se",
      "vad": "Den naturtyp som man ser över större delen av Sandön är trädklädda sanddynor, för att hitta någon liknande i samma storleksordning i Mellansverige måste du åka till Gotska Sandön eller Fårö., Öns växtlighet består till stor del av vindpinade och små tallar, även om de tallar som är över 200 år är ofta smala stammar. (Naturkartan, sidan om Sandön med Kultur & Fritid på Värmdö kommun som kontakt)",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://naturkartan.se/sv/varmdokommun/stig-sandhamn-ca-8-km",
      "org": "naturkartan.se",
      "vad": "Stig Sandhamn, ca 8 km, Längd, 6.1 km, Markeringarna är bitvis svåra att se, men ön är inte stor och det finns gott om stigar som bildar ett nät över hela ön, det är lätt att själv välja hur man vill gå. (Värmdö kommuns post i Naturkartan)",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/",
      "org": "sandhamn.com",
      "vad": "Hit kommer människor för att vila, fira, mötas och njuta av skärgården – året runt, Frukost ingår, och som hotellgäst har du fri tillgång till spa och gym under hela vistelsen",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamn.com/sv/spa",
      "org": "sandhamn.com",
      "vad": "Här kan ni simma i den tempererade poolen, sjunka ner i jacuzzin, Här finns också bastu, gym, Gym: 16-årsgräns, Icke hotellgäster är välkomna i mån av plats., Bastuflottar vid havet, Värmen från den vedeldade bastun, Bokningar av bastuflotten sker via receptionen.",
      "last": "2026-10-29",
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
      "url": "https://www.sandhamn.com/en/hitta-hit",
      "org": "sandhamn.com",
      "vad": "Departures run several times daily . Sandhamnslinjen Stavsnäs–Sandhamn drivs av Stavsnäs Båttaxi, inte Waxholmsbolaget.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://sandhamns-vardshus.se/",
      "org": "sandhamns-vardshus.se",
      "vad": "Puben, Öppet året runt., Öppet varje dag från mitten av juni till mitten på september. Annan tid på året är restaurangen främst öppen helger.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://sandhamns-vardshus.se/boende",
      "org": "sandhamns-vardshus.se",
      "vad": "På Missionshuset finns det 5 dubbelrum med gemensamma badrum., På gården finns en stuga med eget badrum som vi kallar för Friggan. Här får man ha hund., I alla våra priser ingår frukost, lakan och handdukar., Missionshuset är öppet året runt för bokning, Villa Västbanken Tillgänglig för bokning 8/10 - 30/4, Här finns 4 dubbelrum med stort kök",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://sandhamns-vardshus.se/english/",
      "org": "sandhamns-vardshus.se",
      "vad": "We will be closed for renovations on January 12th and welcome you back on March 6th! (utan år)",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.sandhamnsbageriet.com/",
      "org": "sandhamnsbageriet.com",
      "vad": "Vetesurdegsbröd, Kanelbulle, Kardemummabulle, Seglarbulle, TÅRTOR, Ost & Skinkmacka, SISTA HELGEN -26",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://sandshotell.se/",
      "org": "sandshotell.se",
      "vad": "Sands Hotell är ett konferens- och weekend-hotell i Sandhamn i Stockholms ytterskärgård., Sands Hotell erbjuder boende i lägenheter och rum – från 1 person upp till 8 personer., Hotellet har 15 dubbelrum, 3 enkelrum så totalt 33 bäddar, relaxavdelning med bastu, uterum och terrasser med utsikt över hamninloppet.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/var-verksamhet/drift-och-forvaltning/vara-byggnader/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Grönskärs fyr, 1961 släcktes fyren, Det blev kasunfyren Revengegrundet som fick ta över., I mitten av 90-talet genomgick fyren en renovering och kunde åter tändas hösten 2000 och då med grönt sken runt om.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "Skärgårdsstiftelsen",
      "vad": "1984 Sjöfartsverket skänker Grönskärs fyr efter renovering till Stiftelsen Stockholms skärgård., Stiftelsen Stockholms skärgård bildas den 20 mars 1959., 2000 Grönskärs fyr återinvigs och tänds efter 39 år i släckt läge.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/gronskar/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Grönskär ligger öster om Sandhamn och nås med egen båt., Det finns varken servering eller boende på Grönskär., På Grönskär kan du promenera bland klipporna, njuta av utsikten över havet och besöka den historiska fyrplatsen.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h433.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, 433 Slussen–Djurö, Stavsnäs vinterhamn; uppmätt i tabellen: Slussen–Stavsnäs vinterhamn 46–56 min",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "På sommaren är hamnen full med båtgäster. (Stockholm Archipelago Trail, regional vandringsled)",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/section-sandhamn/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Easy, 8.1 km, The section starts from the quay where the public ferries arrive., On Sandhamn, the trail is sparsely marked to be in harmony with the many landowners.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/steg-for-steg-vandringsguide-for-etapp-sandhamn/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Toaletter och vatten finns i hamnen ca 100 meter öster om ångbåtsbryggan.",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/sandhamn/",
      "org": "stockholmslansmuseum.se",
      "vad": "När Sandhamn redovisas i skattehandlingar från 1500-talet var ön troligen obebodd och endast använd som betesholme., Under slutet av 1600-talet upprättades en lotsstation och de bofasta under 1700- och 1800-talen var främst lotsar, tullare och krögare., Sandhamn har sedan 1700-talet varit lots- och tullstation, Området kring hamnen har en blandad bebyggelse med ålderdomliga tull- och lotsstugor och sommarvillor från sekelskiftet 1900.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf",
      "org": "stromma.com",
      "vad": "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN, 30/4 - 4/6 a, 7/9 - 27/9, Strandvägen - kajplats 14; uppmätt i tabellen: Strandvägen–Sandhamn 2 h 30 min",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.tempo.se/butiker/tempo-sandhamn-westerberg/",
      "org": "tempo.se",
      "vad": "TEMPO SANDHAMN WESTERBERG, SANDHAMNS BRYGGA",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/sandhamn",
      "org": "Waxholmsbolaget",
      "vad": "Ut till Sandhamn går det turer året runt., Det går flera turer varje dag till Sandhamn., tabell 15 (endast sommartid) och tabell 16",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 16A STAVSNÄS – SANDHAMN – HAGEDE; uppmätt i tabellen: 25 turer Stavsnäs–Sandhamn tar 38–87 minuter, snabbast en torsdagstur och längst en söndagstur",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s15.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, 15A STOCKHOLM – VAXHOLM – SANDHAMN, Strömkajen (Stockholm), Vaxholm ank., Södra Grinda, Sollenkroka, Finnhamn, NordSydlinjen: Går endast 22 juni - 16 augusti.; uppmätt i tabellen: lördag och söndag en tur utan byte (3 h 45 min), alla dagar en tur med byte i Finnhamn (4 h 55 min)",
      "last": "2026-11-09",
      "myndighet": false
    }
  ],
  "uto": [
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/anlaggning/visaHelaHistoriken.raa?anlaggningId=21300000013154&historikId=21000001850399",
      "org": "bebyggelseregistret.raa.se",
      "vad": "De fyra knuttimrade låga parstugorna kring Lurgatans övre del och de tre som ligger i terrasserat läge vid Lurgatans norra sida samt de båda vid Lurgatans nederdel uppfördes under sent 1700-tal och tidigt 1800-tal som bostäder för gruvarbetare vid Utö järnmalmsgruvor., Utö kvarn som byggdes år 1792, Beslut - Byggnadsminnesförklaring, Länsstyrelsen i Stockholms län, 2001-03-14",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/anlaggning/visaLagskydd.raa?anlaggningId=21300000013154&page=lagskydd",
      "org": "bebyggelseregistret.raa.se",
      "vad": "UTÖ KVARN OCH LURGATAN, Aktuella lagskydd 2001-03-14 Byggnadsminne (BM) 3 kap. KML",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/anlaggning/visaHelaHistoriken.raa?anlaggningId=21300000004357&historikId=21000001935941",
      "org": "bebyggelseregistret.raa.se",
      "vad": "Utö kyrka uppfördes av gruvsten efter ritningar av Johan Fredrik Åbom, mellan 1848 och 1849, Den för skärgården resliga kyrkan invigdes i november 1850., Sten till bygget togs direkt ur gruvorna och kyrkotomten skänktes av bolaget., Av den totala byggnadskostnaden svarade församlingen för 11 000 riksdaler Banco plus alla dagsverken, gruvbolaget betalade 5 000 riksdaler Banco och stod för tomten.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaVardering.raa?byggnadId=21400000445166&page=vardering&varderingParent=BYGGNAD",
      "org": "bebyggelseregistret.raa.se",
      "vad": "Utö kyrka står som ett monument över öns blomstringstid vid 1800-talets mitt då gruvdriften på ön var i full gång.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/48f8f0/contentassets/a0ac2055bd474a83a51e4fbe339913fe/uto6201016-tillganglig.pdf",
      "org": "haninge.se",
      "vad": "Kvarnen byggdes år 1791 och har sedan länge varit sjömärke och symbol för Utö., Utö kvarn som byggdes år 1792, År 1982 efter att Skärgårdsstiftelsen köpt upp den norra delen av ön restaurerades slutligen den, År 2001 byggnadsminnesförklarades kvarnen, Parstugorna vid Lurgatan och Utö kvarn har sådant kulturhistoriskt värde att de uppfyller de villkor som uppställs för byggnadsminne enligt kulturminneslagen., Byggnadsminnet regleras enligt Kulturmiljölagens 3 kap.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/hembygdsmuseer/",
      "org": "haninge.se",
      "vad": "Utö gruvmuseum, Museet ligger alldeles intill gruvschakten och berättar historien om Utös gruvor.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://utoskola.haninge.se/",
      "org": "haninge.se",
      "vad": "Elever 22, Årskurs 1–9, Personal 7",
      "last": "2026-09-30",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "För att skydda Utös naturreservat finns regler du måste följa., inom hela reservatet med undantag av Persholmen medföra hund som ej är kopplad. För Persholmen skall hund vara kopplad under tiden 1 mars - 20 augusti och under övrig tid hållas under uppsikt, tälta eller ställa upp husvagn annat än på anvisad plats., göra upp eld annat än på härför iordningställda och anvisade platser, för längre tid än två dygn förtöja eller förankra båt vid samma strand på sådant sätt att andras möjlighet att utnyttja värdefull båt- eller badplats hindras eller försvåras, inom särskilt med bojar markerade badområden åka eller förtöja båt, Den största delen av södra Utö har varit militärt skjutfält sedan 1940-talet., Tillträdesförbud på Utö skjutfält vissa tider.",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Naturreservatet omfattar öarna Ålö och Rånö med omgivande öar och marina miljöer., Ålö har broförbindelse med Utö medan Rånö nås med reguljär Waxholmsbåt., Skyddat sedan: 2008, Storlek: 2 829 hektar varav land 1 063, Markägare: Skärgårdsstiftelsen, Förvaltare: Skärgårdsstiftelsen, Övrigt: Natura 2000-område SE0110017 Ålö, SE0110118 Rånö Ängsholm",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Andra bra ställen är; Baggensfjärden, Ingarö, Ornö, Utö och Torö; Fritt handredskapsfiske gäller på enskilt vatten i Mälaren och skärgården.; Fiske får bedrivas av alla med metspö, spinnspö och liknande redskap med lina med max 10 krokar.; Fiskemetoden får inte vara angeldonsfiske eller kräva användande av båt, exempelvis dragrodd eller trolling.; Trolling, dragrodd och angel får endast bedrivas med fiskerättsägarens tillstånd (exv TDA-kortet, sid 47) eller på allmänt vatten; Tänk på att trolling, dragrodd, angel, kastnät och ismete inte räknas som handredskap.; I nedanstående vikar är det förbjudet att fiska under perioden 1 april – 15 juni.; Utöfladen (Utös utsida); Ryssundet (mellan Ålö och Utö)",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.6395bf21784b0add951a655/1712068330571/Kartor%20%C3%B6ver%20v%C3%A5rfredningsomr%C3%A5den%20f%C3%B6r%20fisk%20i%20Stockholms%20sk%C3%A4rg%C3%A5rd.pdf",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Fredningsområden 2024 för fisk (vårlekande arter) i Stockholms skärgård.; Fiskeförbud på våren.; I områden med röd text är det fiskeförbud året runt; Ängsholmen",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/djur/fiske.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "I havet längs kusten och i de fem stora sjöarna får du fiska fritt med handredskap utan fiskekort.; Därför finns det 62 vikar i Stockholms skärgård där fiskeförbud råder under våren. Nio av dessa områden har fiskeförbud året runt.",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/291627",
      "org": "Naturvårdsverket",
      "vad": "Beslut om bildande av Ålö-Rånö naturreservat i Haninge, Det går dock ett stråk av urkalksten och kalkblandad bergrund genom ön.",
      "last": "2026-11-09",
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
      "url": "https://api.scb.se/OV0104/v1/doris/sv/ssd/MI/MI0812/MI0812A/OarEjBro01",
      "org": "scb.se",
      "vad": "{key:[0136Q102,2020],values:[191,1286,485]}; POST med Oar=0136Q102, kolumnerna folkbokförda, byggnader, bostadsbyggnader",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/",
      "org": "scb.se",
      "vad": "31 december respektive år",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://www.forsvarsmakten.se/regler-och-tillstand/skjutfalt-och-forbud/",
      "org": "forsvarsmakten.se",
      "vad": "Skjutfält och förbud, När vi gör det är skjutfältet avlyst, alltså stängt för allmänheten., Observera att verksamheten kan ändras med kort varsel. Det är alltid informationstavlorna på plats som gäller i första hand., Utö skjutfält",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://kulturarvsdata.se/raa/bbr/rdf/21400000445166",
      "org": "kulturarvsdata.se",
      "vad": "Orgeln, som är belägen på en läktare i väster, anses vara den äldsta bevarade i Södermanland. Den byggdes av Olof Hedlund för Holländska reformerta kyrkan i Stockholm 1745 och kom till Utö 1838.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/uto/",
      "org": "Skärgårdsstiftelsen",
      "vad": "I den historiska Gruvbyn finns spår av järnbrytning som påbörjades redan under medeltiden, Cykla längs grusvägarna, Ålö Storsand, som nås med båt eller via vandringsled, räknas som en av Stockholms skärgårds mest omtyckta sandstränder",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/om-skargardsstiftelsen/var-historia/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Hela norra Utö med gruvbyn köps från Ställbergsbolaget., får Stiftelsen Stockholms skärgård sitt nuvarande namn Skärgårdsstiftelsen, Utö Värdshus utarrenderas till krögarparet, Härmed inleds en ny epok där all kommersiell verksamhet successivt kommer att drivas av privatägda skärgårdsföretag.; årtalen 1973, 1998 och 1986 står först på respektive rad",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/app/uploads/2024/07/Uto-Skargardsstiftelsen-20240724.pdf",
      "org": "Skärgårdsstiftelsen",
      "vad": "Här i Gruvbyn finns turistbyrå, gästhamn, bensinmack, livsmedel, bageri, cykeluthyrning, restauranger och shopping.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h846.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Västerhaninge station–Årsta (–Årsta slott), Tidtabellen är anpassad till pendeltåg från Stockholm vid, Giltig 18 mars–18 juni samt 17 augusti–12 december 2026; uppmätt i tabellen: Västerhaninge station–Årsta brygga 14–17 min på alla 48 turer",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v846.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Västerhaninge station–Årsta (–Årsta slott), Tidtabellen är anpassad till pendeltåg från Stockholm vid; uppmätt Västerhaninge station–Årsta brygga 14–17 min",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-uto-sv/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Etapp Utö är en utmanande etapp som har allt. Denna 18,4 km långa etapp, Från Gruvbryggan kan du ta dig norrut längs grusvägen. Antingen hela vägen till Kroka eller till Barnens bad.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/uto-alo-connector-2/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "A gravel road takes you through an active military firing range that connects the trail sections on Utö and Ålö., The distance is 4.6 km along the gravel road, It takes about 90 minutes to walk between the sections., Never leave the gravel road until you reach the next section.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Utö, Challenging, 18.4 km, Utö – Ålö Connector, 4.6 km ; trails räknar de två sträckor av Stockholm Archipelago Trail som har Utö i namnet (Section Utö och Utö – Ålö Connector), inte alla vandringsleder på ön (rättad 2026-11-09, uto-0475).",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/uto/",
      "org": "stockholmslansmuseum.se",
      "vad": "Här började malmbrytningen redan under medeltiden och fortsatte fram till slutet på 1800-talet., Kanske började brytningen av järnmalm redan under 1100-talet, Spåren av gruvbrytningen är fortfarande tydliga i form av dagbrott och stora varpstenshögar., De gamla gruvarbetarbostäderna ligger fortfarande längs Lurgatan.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/om-uto-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Utö Kyrka är skärgårdens största stenkyrka",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/haninge/kontakt-uto-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Närmaste hållplats är Spränga brygga, därifrån är det fem minuters promenad till kyrkan.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/att-gora/",
      "org": "utogasthamn.se",
      "vad": "Persholmen som ligger över den lilla bron nere i hamnen har klippbad., Ytterligare en bit från hamnen finns Barnens bad, en fin och långgrund sandstrand i en liten vik.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/uto-cykeluthyrning/",
      "org": "utogasthamn.se",
      "vad": "I Cykelboden har vi över 300 cyklar från Skeppshult, Här finns även barnstolar, sulkys och cykelkärror, Under högsäsong kan du även hyra din cykel på Båtshaket på Ålö., Du kan välja att lämna tillbaka din cykel på Utö i Cykelboden eller på Ålö vid restaurangen Båtshaket., Cykelhyran gäller per dag, inte 24 timmar.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/gasthamnen/",
      "org": "utogasthamn.se",
      "vad": "plats för ca 300 fritidsbåtar med eluttag … på samtliga platser, dusch, bastu och toaletter, tvättstuga att hyra, fylla på färskvatten, I den norra hamnen finns sjömacken",
      "last": "2026-10-29",
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
      "url": "https://www.utogasthamn.se/hitta-hit/",
      "org": "utogasthamn.se",
      "vad": "Väl vid bryggan finns en parkeringsplats som betalas via appen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.utogasthamn.se/kiosk-cafe/",
      "org": "utogasthamn.se",
      "vad": "Här finns kiosk, café och restaurang i samma byggnad. Självklart har vi glass, godis, korv och toast men även sushi samt en bar",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/kontakt/hitta-hit/",
      "org": "utovardshus.se",
      "vad": "Waxholmsbåtar trafikerar linjen Utö – Årsta Brygga dagligen. / Båt utgår även från Nynäshamn till grannön Ålö som har broförbindelse till Utö.",
      "last": "2026-11-08",
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
      "vad": "Utö Vandrarhem Skärgården, Vandrarhemmet är i tre plan och har 73 bäddar, tillreder sina egna måltider i de gemensamma köken., som håller öppet under sommarhalvåret (april-oktober).",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/restaurang/uto-vardshus/",
      "org": "utovardshus.se",
      "vad": "I det gamla gruvkontoret finns Utö Värdshus bar och matsalar med marin och hemtrevlig atmosfär., Här kan du äta à la carte både lunch och middag, På sommaren är den soliga verandan öppen från morgon till kväll",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/restaurang/seglarbaren/",
      "org": "utovardshus.se",
      "vad": "BAREN MITT I HAMNEN, veranda har du första parkett till hela hamninloppet., Här kan du äta enklare rätter till lunch eller njuta av kolgrillade rätter till kvällen.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.utovardshus.se/oppettider/",
      "org": "utovardshus.se",
      "vad": "Bakfickan; Från 5 Juni 2027 * Lördagar … . Klockslaget är utelämnat ur citatet (omarbete 4b).",
      "last": "2026-11-09",
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
      "url": "https://kund.printhuset-sthlm.se/wa/h22.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h21.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 21A ÅRSTA – UTÖ, minst 1 timme innan avgång från aktuell brygga; b står vid avgångar från bryggorna på Utö (Gruvbryggan, Näsudden, Spränga); uppmätt Årsta brygga–Gruvbryggan 40 min på 17 av 28 turer, 55–75 min när båten går via Spränga först, kortast 35 min",
      "last": "2026-11-16",
      "myndighet": false
    }
  ],
  "vaxholm": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bogesundslandet.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Bogesunds slott, med anor från mitten av 1600-talet, ligger som ett slags centrum på Bogesundslandet. Själva slottet ingår inte i reservatet, men utgör istället ett statligt byggnadsminne. Vid slottsparken finns ett vandrarhem, det nät av vandringsleder och ridstigar som finns markerade, Inom reservatet finns det också flera iordningställda badplatser och en rad rastplatser med eldstäder och vindskydd., I anslutning till området finns två campingplatser och en golfbana.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://pub.raa.se/dokumentation/9181fdb5-bc4d-4625-9b6a-291def30a8e6/visning",
      "org": "raa.se",
      "vad": "Riksantikvarieämbetet, L2014:2913: \"Den första kända försvarsanordningen i Vaxholmssundet var den skans som 1549-58 uppfördes på den lilla Vaxholmen mellan Vaxön och Rindö.\", \"Den har under tidernas förlopp haft olika benämningar såsom Vaxholms fästning, Vaxholms fort och sedan 1920 Vaxholms kastell.\"",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaHistorik.raa?page=historik&visaHistorik=true&byggnadId=21400000444853",
      "org": "raa.se",
      "vad": "VAXHOLMS KYRKA (GUSTAV ADOLFSKYRKAN), Vaxholms kyrka är uppförd efter ritningar av Olof Tempelman (1745–1816) och Carl Fredrik Adelcrantz (1716–1796)., 1760 Kyrkan grundläggs. Klockstapeln uppförs. 1803 Kyrkan färdigställs efter ritningar av Adelcrantz, dock fullbordade av O S Tempelman.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaHistorikText.raa?byggnadBeskrivningId=21720000114454&byggnadId=21400000444853&historikId=21000001904441",
      "org": "raa.se",
      "vad": "Redan 1896 genomfördes en restaurering som förändrade kyrkobyggnaden, framförallt interiört., Sannolikt fanns en kyrka i Vaxholm redan under 1500-talet. Det var en mindre träbyggnad som låg nere vid fästningssundet, ungefär där tullhuset ligger idag. 1644 ersattes den äldsta kyrkan av en ny träkyrka, Petrikyrkan, som låg strax väster om den nuvarande.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/byggnad/visaBeskrivning.raa?byggnadId=21400000444853&page=beskrivning&visaBeskrivningar=true",
      "org": "raa.se",
      "vad": "Vaxholms kyrka är en enskeppig salkyrka med kort korsarm och fullbrett korparti., Kyrkan är uppförd i nyklassicistisk stil med putsade fasader, avfärgade i vitt.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell",
      "org": "sfv.se",
      "vad": "1833-1863 på uppdrag av Karl XIV Johan, När så Finland i början av 1800-talet blev ryskt ökade försvarsbehovet i Vaxholm ytterligare, varför beslut togs om upprustning och ombyggnad., Arkitekten C.F. Meijer rev stora delar av fästningen och byggde också nytt, vilket resulterade i kastellets nuvarande utseende., som en gång kallades ”Stockholms lås”",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/rindo-redutt",
      "org": "sfv.se",
      "vad": "Rindö redutt, belägen på Rindös norra udde, byggdes 1859–1864 för att komplettera Vaxholms kastell i försvaret av Stockholms inlopp. Anläggningen domineras av en donjon och omges av vallar och en djup grav., Den domineras av donjonen, dvs ett logement som också är inrättat för strid.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/oscar-fredriksborg",
      "org": "sfv.se",
      "vad": "Byggår: 1867-1877, Oskar-Fredriksborg byggdes 1867-77 för att stärka det fasta försvaret vid Oxdjupet utanför Vaxholm sedan en segelled öppnats genom försänkningen., Genom att på 1500-talet börja spärra det djupare Oxdjupet med sten, Man blev därför tvungen att börja plocka upp all sten ur Oxdjupet igen så att sjötrafiken kunde komma fram.",
      "last": "2026-10-31",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/",
      "org": "Trafikverket",
      "vad": "Vaxholmsleden går mellan Vaxholm och Rindö i Stockholms skärgård., Färjeledens längd är 970 meter och överfartstiden är sex minuter., Resan med vägfärjan är avgiftsfri.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm",
      "org": "vaxholm.se",
      "vad": "Fastboende i kommunen är ca 12 000 personer (2024), Kommunen omfattar cirka 70 öar, varav 57 bebodda samt den stora gröna halvön Bogesundslandet.",
      "last": "2026-10-31",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/fakta-om-vaxholm/historia",
      "org": "vaxholm.se",
      "vad": "Stadskärnans bebyggelse består till övervägande del av trähus, först 1912 blev det tillåtet att uppföra byggnader i annat material. Skälet till det var att staten var markägare och kunde besluta om en snabb rivning av staden om det militära läget så krävde.",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser",
      "org": "vaxholm.se",
      "vad": "I Vaxholm finns det en centralt belägen gästhamn, I gästhamnen finns resturang, kiosk, butiksförsäljning i sjöbodar",
      "last": "2026-11-09",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter",
      "org": "vaxholm.se",
      "vad": "Taxa A, Halva Kronängsskolans parkeringsområde",
      "last": "2026-10-31",
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
      "url": "https://www.vaxholm.se/download/18.5c921dcc189206be14ab91a7/1689755817286/Lokala%20ordningsfo%CC%88reskrifter.pdf",
      "org": "vaxholm.se",
      "vad": "Hundar skall hållas kopplade på offentlig plats inom hela kommunen., Hund, som vistas på offentlig plats, skall dessutom vara försedd med uppgifter om ägarens namn, adress och telefonnummer., Hundar får inte vistas på begravningsplatser och inte heller på anlagd badplats upplåten till allmänt begagnande, eller lekplats (gäller även bollplan), som är offentlig plats., gäller dock inte för ledarhund till synskadad person eller för polishund i tjänst",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/kommun--politik/forfattningssamling-och--styrande-dokument/lokala-ordningsregler",
      "org": "vaxholm.se",
      "vad": "I Vaxholms stads lokala ordningsstadga och de lokala föreskrifterna för att skydda människors hälsa och miljö hittar du information om lokala regler som gäller i kommunen.; Ändring av Vaxholms stads lokala ordningsföreskrifter",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/allanyheter/nyhetsarkiv/vadgallernarskahundarvarakopplade.5.117b327517db288a7c818059.html",
      "org": "vaxholm.se",
      "vad": "det är förbjudet att medföra okopplad hund i reservatet",
      "last": "2026-11-02",
      "myndighet": true
    },
    {
      "url": "https://assets.ctfassets.net/4l7cjdaypzcu/1WCfe56Z2KZwgDq26t7IO3/9320e22bd9562098960f572bc7b3615f/SLomradet-2026-04-02.pdf",
      "org": "assets.ctfassets.net",
      "vad": "SL-biljett gäller alltid för resor med Waxholmsbolaget mellan dessa bryggor, listan omfattar Strömkajen och Vaxholm",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://catchrelax.se/",
      "org": "catchrelax.se",
      "vad": "Guidade fisketurer och aktiviteter i Stockholms skärgård & Mälaren sedan 2005, Privata möten, luncher och middagar i skärgårdsmiljö i unik villa vid vattnet i underbart västerläge, 5 minuter från Vaxholm.",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.destinationvaxholm.se/events/vaxholms-julmarknad-2025",
      "org": "destinationvaxholm.se",
      "vad": "lördag 6 december 2025, söndag 7 december 2025, Den andra helgen i advent, 6 – 7 december, är det åter dags för Vaxholms traditionsenliga julmarknad., Med brända mandlar, hantverk, glögg och granar, Rådhustorget",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.destinationvaxholm.se/skargardens-kanotcenter",
      "org": "destinationvaxholm.se",
      "vad": "Ingen tidigare paddlingserfarenhet behövs när du paddlar med guide",
      "last": "2026-11-09",
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
      "url": "https://kanotcenter.com/",
      "org": "kanotcenter.com",
      "vad": "Beginners are welcome on our guided tours and can also rent kayaks to explore independently., Before you set off, we’ll provide a paddling introduction, safety briefing and local route suggestions based on your experience and the weather.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kanotcenter.com/tours/",
      "org": "kanotcenter.com",
      "vad": "Vaxholm Kayaking & Fika, Easy, Archipelago Kayaking & Island Lunch, Moderate, 3-Day Guided Island-Hopping & Wild Camp ; uppmätt på sidan: 10 av 12 paddelturer Easy och 2 Moderate.",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://kanotcenter.com/tours/full-day-kayaking-adventure/",
      "org": "kanotcenter.com",
      "vad": "While this tour is beginner-friendly, we recommend some prior kayaking experience, especially for windier days or if using a single kayak.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kastelletvaxholm.se/",
      "org": "kastelletvaxholm.se",
      "vad": "Waxholmsbolaget är vårt rekommenderade alternativ; Du kan även boka taxibåt direkt till Kastellet; Kastellet ligger på en egen ö mitt i Vaxholm och nås enkelt med reguljära båtar från Vaxholm eller med taxibåt direkt till ön.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h670670x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Stockholm–Vaxholm, Tekniska högskolan, Västerhamnsplan  Tekniska högskolan → Västerhamnsplan uppmätt tur för tur i dag: 45 till 58 min (117 turer). Runda 11 (sr03-k019): tabellen h670670x.pdf gäller 17 augusti till 12 december 2026; h670.pdf (2022) är inte källan.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s670670x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 19 juni–16 augusti 2026, Lördag, söndag och helgdag  Med v670_670x.pdf och h670670x.pdf täcker SL:s tabeller 14 december 2025–12 december 2026.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v670_670x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stockholm–Vaxholm, Giltig 14 december 2025–18 juni 2026, Måndag–fredag, Lördag, söndag och helgdag",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/vaxholms-fastning/",
      "org": "stockholmslansmuseum.se",
      "vad": "Den första befästningen i Vaxholm var den skans som Gustav Vasa lät bygga på Vaxholmen 1549-58., Första gången var 1612 när danskarna under ledning av Kristian IV försökte tränga in till Stockholm, den andra 1719 när ryssarna var ute i samma ärende., Det nuvarande Vaxholms kastell på Vaxholmen utanför Vaxholms samhälle byggdes 1833-1863., Arkitekten C.F. Meijer rev stora delar av den befintliga fästningen och byggde nytt",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/vaxholm/",
      "org": "stockholmslansmuseum.se",
      "vad": "Kastellet är byggt i granit med mer än två meter tjocka murar och kaserner för över tusen man. Beväpningen utgjordes av 156 kanoner., Olyckligtvis visade det sig att kastellet, genom artilleriets utveckling, hade blivit omodernt redan när det stod klart.",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/waxholm-vaxholm/",
      "org": "svenskagasthamnar.se",
      "vad": "Gästhamnen är placerad mitt i centrum, I Gästhamnen finner du restaurang, bar, café och glasskiosk, flera sjöbodar med kläder, skor, inredning, leksaker och souvenirer, service hus med duschar och toaletter, 110 gästplatser",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/vaxholm/vaxholms-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Istället för torn finns en klockstapel i trä med kyrktupp och tre klockor., I glasmontrar i sidoskeppen finns modeller av två roslagsbåtar, en skötbåt och en storöka.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-vaxholm-bogesund-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "STF Bogesund Vandrarhem Vaxholm, Omgiven av hästhagar bor du i dubbel- eller flerbäddsrum i de gedigna husen runt Bogesunds Slott., Bogesunds slottsvandrarhem ligger i en härlig slottsmiljö i ett naturreservat, 4 km utanför Vaxholm.",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://www.vaxholmsbedandbreakfast.se/",
      "org": "vaxholmsbedandbreakfast.se",
      "vad": "Vaxholms Bed & Breakfast – a small hotel in our home, Välkommen hem till oss",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://vaxholmsfastning.se/besoksinfo/index.php",
      "org": "vaxholmsfastning.se",
      "vad": "BESÖKSINFO 2026, Hos oss kan du ta del av historien om skärgårdens försvar under 500 år, Visningar med guide ingår i entréavgiften och utgår från museet fr.o.m. 27 juni t.o.m. 16 augusti, cirka 45 minuter",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://vaxholmsfastning.se/",
      "org": "vaxholmsfastning.se",
      "vad": "skärgårdsförsvarets 500-åriga historia, Sveriges försvarshistoria från Gustav Vasa till nutid",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/vaxholm",
      "org": "Waxholmsbolaget",
      "vad": "Båtresan från Strömkajen tar bara en timme, under sommaren går det turer många gånger om dagen, och övrig tid på året går det flera per dag, De flesta av Waxholmsbolagets båtar med destinationer i mellersta och norra skärgården passerar Vaxholm",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 2A STOCKHOLM – HÖGANÄS – VAXHOLM, Nacka strand, Hasseludden, Gåshaga brygga . Restid Strömkajen → Vaxholm uppmätt tur för tur i tabell 2A (pdfplumber, 2026-11-09): 87 av 89 turer tar 50–90 min, median 70 min; tur 0389, som angör Vaxholm i omvänd ordning, tar 145 min.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "Waxholmsbolaget",
      "vad": "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd. Det här gäller året runt, Mellan dessa bryggor kan du året runt resa med Waxholmsbolaget på alla sorters SL-biljetter:",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA  Strömkajen → Vaxholm ank. uppmätt tur för tur i tabell 11A: 55–82 min (siffrorna ligger i ett kodat typsnitt i PDF:en och är avkodade).",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget",
      "vad": "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ med bryggan Finnhamn",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget",
      "vad": "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA; Staveström (Ljusterö); Stensvik (Ljusterö); Hummelmora (Ljusterö) ; GÄLLER-raden läst i bild: 2 april–18 juni och 17 augusti–12 december 2026.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://waxholmscamping.com/",
      "org": "waxholmscamping.com",
      "vad": "Mitt i naturen, på Eriksö i Vaxholm, hittar du oss, Stugor, camping, tält & glamping 1 maj–30 september., Hos oss kan du parkera din husbil året runt på våra ställplatser",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://waxholmshamn.se/info-tips/",
      "org": "waxholmshamn.se",
      "vad": "Toilets and showers are situated in the big red building, Use our grey/black water station to empty your tank.",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://waxholmshamn.se/",
      "org": "waxholmshamn.se",
      "vad": "Book a bottom wash",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://waxholmshamn.se/prices/",
      "org": "waxholmshamn.se",
      "vad": "Electricity",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.waxholmshotell.se/",
      "org": "waxholmshotell.se",
      "vad": "Waxholms Hotell har varit hjärtat i skärgårdens huvudstad sedan 1902, Hamngatan 2, 185 32 Vaxholm, Upplev vårt fantastiska skärgårdsbrasseri, Verandan och ta en drink eller två i Nyckelbaren., Konferensvåningen med inspirerande utsikt över havet",
      "last": "2026-11-09",
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
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/280826",
      "org": "geodata.naturvardsverket.se",
      "vad": "BESLUT OM BILDANDE AV GRINDA NATURRESERVAT, VÄRMDÖ KOMMUN; Bebyggelsen på Grinda har anor från början av 1600-talet.; Vid 1900-talets början fanns sju bebyggelseenheter på Grinda.; i söder nära den nuvarande ångbåtsbryggan fanns en krog.; 1907 uppfördes en stor sommarvilla efter ritning av arkitekten Ernst Stenhammar.; Byggnaden har använts bl.a. som sommarvilla, pensionat, förläggning för ridlägret och dagverksamhet för pensionärer.; I kommunens översiktsplan antagen den 29 april 1992; Vidare anges att bebyggelsen på Grinda, såväl den gamla sommarvillan som uthyrningsstugorna, utgörs av kulturhistorisk värdefull bebyggelse. (Länsstyrelsens beslut 26.10.2000, s. 6; skannad PDF, läst som sidbild)",
      "last": "2026-11-08",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "för längre tid än två dygn i följd förankra båt vid samma strand; förankra båt längs de strandsträckor som markerats med heldragen linje på karta; framföra motordrivet motorfordon annat än på anvisade vägar; landa med luftfarkost på annat än anvisad plats; på ett för andra störande sätt använda musikanläggning eller musikinstrument.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/",
      "org": "statistikdatabasen.scb.se",
      "vad": "Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö; 0120Q115 Grinda",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://grinda.se/mat-fest/wardshuset/",
      "org": "grinda.se",
      "vad": "Vi gav arkitekten Jonas Bohlin fria händer i Wärdshusets olika salonger och rum; Ingen som passerar genom Foajén missar den klassiska öppna spisen.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/gasthamn/",
      "org": "grinda.se",
      "vad": "En trygg gästhamn för 100 båtar; Som övernattande gäst har du tillgång till el, dusch, toalett och hushållssop- och septitank-tömning.; Förtöjning sker på boj eller mooringlina.; Det finns det 28 st bokningsbara platser i gästhamnen.; I naturhamnen, eller vid Grinda Sea Lodge, kan du även ligga på svaj.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/en/accommodation/sea-lodge/",
      "org": "grinda.se",
      "vad": "For those who want to swim, there are wonderful sandy beaches, rock pools, saunas for rent directly by the water where we also have the practice dock",
      "last": "2026-10-29",
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
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/evenemang/",
      "org": "grinda.se",
      "vad": "Oktober 2026; Vilt & Jakt på Wärdshuset; 17 okt 2026; Eld-helg; Oktoberfest ; i wärdshusets evenemangslista står datumet närmast före evenemanget: 17 okt 2026 Eld-helg.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/events/eld-helg/",
      "org": "grinda.se",
      "vad": "Tredje helgen i oktober har vi vårt återkommande tema och event Eld!; På Grinda Wärdshus serverar vi en eldig middagsbuffé och lyser upp höstmörkret med fackeltåg, stor höst brasa och eldshow!",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/",
      "org": "grinda.se",
      "vad": "Det anrika Wärdshuset erbjuder klassisk skärgårdsmat",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/skargardens-hjarta-ska-fa-lite-karlek-tillbaka/",
      "org": "grinda.se",
      "vad": "Med start i månadsskiftet augusti och september inleder vi tillsammans med; Skärgårds-stiftelsen en efterlängtad renovering av Wärdhusets exteriör.; glans, med omfattande arbeten på både tak och fasad.; Det kommer innebära att huset täcks med byggställningar, men inuti fortsätter vi; efter bästa förmåga att erbjuda det Grinda blivit känt för; I maj 2027 räknar vi med att kunna avtäcka vår klenod och bjuda in till nypremiär; Grinda, augusti 2026",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/oppettider/",
      "org": "grinda.se",
      "vad": "Hotell/Wärdshuset öppettider; Grinda stugby har öppet med start strax innan månadssskiftet april / maj till 3.e helgen i oktober; Öppet på beställning för förbokade större grupper och bröllop; Sjömacken är obemannad men öppen och utrustad med kortautomat. — legenden per dag uppmätt i kalendrarna i Chromium 2026-11-08",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/sjomack/",
      "org": "grinda.se",
      "vad": "Vår sjömack har öppet året om; i direkt anslutning till vår gästhamn; Bensin 98, Diesel, Gasol",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/hamn-mack/sakerhet-service/",
      "org": "grinda.se",
      "vad": "El finns på alla bryggor, eftersom vi befinner oss på en ö så är tillgången begränsad 24 uttag / båtar kan använda elen samtidigt.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/boende/hotell/",
      "org": "grinda.se",
      "vad": "Hotell på Grinda – skärgårdsidyll med sjöutsikt (sidans titel); Hotellet i Skärgårdens Hjärta",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/boende/sealodge/",
      "org": "grinda.se",
      "vad": "Grinda Sea Lodge – enkel logi vid havet; Grinda Sea Lodge ligger naturskönt vid havet på södra delen av ön; Boendet är fördelat på 4 längor med totalt 44 bäddar i 4- och 2-bädds rum.; Öppet för dig som privatperson och/eller familjen under högsäsong, från midsommar med start torsdagen till slutet av augusti.; Under för- och sensommar perioden endast öppet för större grupper och bröllop.; Frukost ingår för dig som bor över här",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://grinda.se/aktiviteter/",
      "org": "grinda.se",
      "vad": "I vårt nya pensionat Grinda Sea Lodge",
      "last": "2026-10-29",
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
      "url": "https://skargardsstiftelsen.se/omraden/grinda/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Följ stigarna mellan norra och södra bryggan; bland annat natur- och kulturstigen och; som leder genom skogar, öppna marker och historiska miljöer; bjuder på en varierad vandring genom skogar, öppna ängar och havsnära klipplandskap",
      "last": "2026-11-08",
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
      "vad": "Skärgårdsstiftelsen äger cirka tvåtusen byggnader i Stockholms skärgård.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/aktuellt/vara-hus-grinda/",
      "org": "Skärgårdsstiftelsen",
      "vad": "den stora sommarvillan som i dag är Grinda Wärdshus",
      "last": "2026-11-08",
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
      "url": "https://sl.se/biljetter/sortiment-och-regler/biljetter-for-resor-med-waxholmsbolagets-skargardsbatar",
      "org": "SL",
      "vad": "Under lågsäsongen, från 14 september till 29 april, gäller alla SL:s periodbiljetter som har en giltighetstid på 30 dagar eller längre för resor på Waxholmsbolagets båtar.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h437.pdf",
      "org": "SL",
      "vad": "437 Slussen–Lillsved; Giltig 17 augusti–12 december 2026",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h438.pdf",
      "org": "SL",
      "vad": "438 Slussen–Boda; Giltig 17 augusti–12 december 2026",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.stockholmarchipelagotrail.com/section/section-grinda/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Grinda; Moderate; 9.8 km",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/grinda/",
      "org": "stromma.com",
      "vad": "Åter april 2027; 1,5 timmes båttur från Stockholm till Grinda genom skärgården; Avgår från Strandvägen, Nacka Strand, Vaxholm och fler stopp",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf",
      "org": "stromma.com",
      "vad": "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN; Södra Grinda; perioderna 30/4 - 4/6 till 7/9 - 27/9",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/",
      "org": "svenskaturistforeningen.se",
      "vad": "Till hotellet och Wärdshuset är det ungefär lika nära från Södra Bryggan som från Norra bryggan, en knapp kilometers promenad (15 min).; Har du större eller tungt bagage kan transport ordnas på förfrågan.; Till Grinda Sea Lodge är Södra bryggan närmast.; Från Norra bryggan till Grinda Sea Lodge är det 30 minuters promenad tvärs över ön",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/grinda",
      "org": "Waxholmsbolaget",
      "vad": "Resan från Strömkajen tar ungefär en och en halv timme.; titta i tabell 11; Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s11.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026; 11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA — kortaste restid Strömkajen–Södra eller Norra Grinda 1 h 30 min, uppmätt i tabellens avgångs- och ankomsttider 2026-10-29 (siffrorna är satta i ett eget typsnitt och avlästa med teckenmappning)",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; 11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA — längsta restid Strömkajen–Norra Grinda 2 h 40 min, uppmätt i tabellens tider 2026-10-29",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s14.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026; 14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA; Södra Grinda",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "Waxholmsbolaget",
      "vad": "Om du till exempel ska resa från Strömkajen till Grinda kan du resa på SL-biljett mellan Strömkajen och Vaxholm och sedan resa på en Waxhomsbolaget-biljett för sträckan mellan Vaxholm och Grinda.; Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april",
      "last": "2026-10-29",
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
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/angso-nationalpark/fakta-om-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Ängsö nationalpark inrättades 1909 (24 maj 1909), ligger i Norrtälje kommun, syfte \"Bevara ett äldre odlingslandskap i väsentligen oförändrat skick\", naturtyp \"Skärgård, ängs- och hagmarker, blandskog\"",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://finnhamn.se/",
      "org": "finnhamn.se",
      "vad": "Välj mellan klassiska gästhamnen Paradisviken med dryga hundra platser, flytbryggan på Söder Långholm",
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
      "vad": "PARADISVIKEN – den stora gästhamnen, här har du tillgång till vatten, el och gratis WiFi, Närhet till Ragnars kiosk, bad, fotbollsplan m.m. 10 minuters promenad till Lanthandel och Krog., Sopmaja, Mulltoa",
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
      "vad": "På 1910-talet lät kolhandlare Wilhelm Rönström uppföra ett pampigt sommarhus på ön Stora Jolpan. (vandrarhemmet Utsikten, ritat av Ernst Stenhammar)",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://sl.se/aktuellt/nyheter/sl-biljetter-i-en-del-av-waxholmsbolagets-trafik",
      "org": "sl.se",
      "vad": "Du kan resa med SL-biljett i skärgårdstrafiken mellan Strömkajen i innerstan och Vaxholm med omnejd",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Finnhamn, Moderate 10.1 km; Rowboats Finnhamn – Ingmarsö, Easy 0.4 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-finnhamns-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Lilla Jolpan har en urskogsliknande skog med över 100 år på nacken. Unikt för ön är mängden ekar och den gömda ängen med den vackra och sällsynta men giftiga blomman Tbast., Det finns hela fem olika arter av hackspett",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget",
      "vad": "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA ; linje 13, — 13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026 . Strömkajen → Finnhamn: … m.fl., dvs. ca 3–4 h.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget",
      "vad": "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026 . Åsättra brygga → Finnhamn 30–55 min (t.ex. …). Tabell 10 går från Åsättra på Ljusterö, inte från Strömkajen som den gamla källraden påstod.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/sa-galler-sl-biljetten-pa-baten",
      "org": "Waxholmsbolaget",
      "vad": "Lågsäsong: Vissa SL-biljetter gäller i hela trafiken 14 september–29 april, SL:s periodbiljetter som gäller för 30 dagar eller längre",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "Waxholmsbolaget",
      "vad": "",
      "last": "2026-09-19",
      "myndighet": false
    }
  ],
  "moja": [
    {
      "url": "https://bebyggelseregistret.raa.se/bbr2/anlaggning/visaHelaHistoriken.raa?anlaggningId=21300000005465&historikId=21000000531174",
      "org": "bebyggelseregistret.raa.se",
      "vad": "Möja kyrka uppfördes av fortifikationsbyggmästare Carl Öhrn på uppdrag av Möja kapellförsamling., Nuvarande kyrka, som uppfördes 1768-1769 efter fortifikationsbyggmästaren Carl Örns ritningar, Tornet tillfogades 1839-1840 till långhuset., som 1885 ersattes av dagens goticerande tornspira, kyrkplatsen är belägen på Kyrkvikens västra sida, Möja kyrka ligger vid en vik på södra delen av Stora Möja.",
      "last": "2026-11-09",
      "myndighet": true
    },
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
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/granholmen.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1978, utvidgat 2018, Storlek: 39 hektar varav land 18 hektar, Reservatet ligger på nordvästra delen av Granholmen, 2,5 kilometer söder om Möja., På kulturmarkerna som betats hittar du bland annat blodnäva, småborre, darrgräs, jungfrulin, vildlin och tvåblad., Munkhamnen är en utmärkt och välbesökt naturhamn., man får bara tälta två dygn på samma plats",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/",
      "org": "statistikdatabasen.scb.se",
      "vad": "Befolkning och bebyggelse på öar utan fastlandsförbindelse med bro, per ö , i tabellen Möja 203 och Södermöja 17 folkbokförda den 31 december 2020",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.4538958818bf5eff9019e85/1701423490127/Inbjudan%20Markanvisning%20Mo%CC%88ja%201.PDF",
      "org": "varmdo.se",
      "vad": "Möja skola ligger cirka 1 kilometer från markanvisningsområdet, men, är i dagsläget pausad på grund av för få barn. Barnen på Möja går idag, på Djurö skola, dit de tar sig med skolskjuts via båt och buss., Dnr: 2023KS/0452 anbud Markanvisning Möja",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf",
      "org": "varmdo.se",
      "vad": "I juli 1719 anföll den ryska flottan den svenska ostkusten i syfte att inta Stockholm.; Även Möja drabbades och all bebyggelse blev nedbränd förutom det lilla kapellet i Berg.; Copyright 2018 © Värmdö kommun.  Runda 11 (sb02-k010): branden och kapellet beläggs av kommunens folder; länsmuseet belägger ryssugnarna.",
      "last": "2026-11-25",
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
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "varmdo.se",
      "vad": "På Möja finns en naturstig som tar dig tvärs över ön, hela sträckan är 12 km, varv sträckan i skogen är cirka 4 km, resterande går på grusvägar genom kulturlandskapet.",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html",
      "org": "varmdo.se",
      "vad": "Parkit Sweden AB ansvarar för drift och hantering av parkeringen i Stavsnäs, Sollenkroka och Boda., Här finns 400 parkeringsplatser för kort och lång tid., 3 timmar fri parkering med p-skiva, därefter avgift., Det finns 6 laddplatser för besökare, I Stavsnäs vinterhamn finns cirka 1300 parkeringsplatser.",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://api.openstreetmap.org/api/0.6/relation/19268630/full",
      "org": "api.openstreetmap.org",
      "vad": "Möja naturstig Hamn - Ramsmora ; uppmätt i OpenStreetMap: 4 857 m. Samma dag uppmätt i kartdata för hela Möja: ingen annan namngiven stig är längre, så SAT-etappen är den längsta leden.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://arken.kb.se/SE-S-HS-Acc2010-65",
      "org": "arken.kb.se",
      "vad": "Svensson, Roland (1910-2003)",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://collection.nationalmuseum.se/en/artists/artist/3475",
      "org": "collection.nationalmuseum.se",
      "vad": "Roland Svensson (1910 - 2003)",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.facebook.com/MojaUppOchNer/",
      "org": "facebook.com",
      "vad": "PerMobilen - Möja Upp & Ner; Hop on/hop off på Möja. Berg-Långvik-Berg tur och retur; Vi tackar alla nästan 1 500 passagerare för i år och hoppas att vi ses nästa sommar.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://konsummoja.se/",
      "org": "konsummoja.se",
      "vad": "Coop Långvik är en obemannad butik., För att kunna handla krävs Coops app samt ett svenskt bank-id, Då mobiltäckningen varierar använd vårt fria wi-fi, Coop_Free när du handlar., du får ett sms eller mail när din beställning finns att hämta hos oss på Coop Berg eller på Coop Ingmarsö.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://mojadansbana.se/om-moja-bio/",
      "org": "mojadansbana.se",
      "vad": "Bion är en av verksamheterna som drivs året om genom den lokala föreningen Möja Kulturella Ungdomsrörelse, MKU",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://mojafisk.se",
      "org": "mojafisk.se",
      "vad": "Les Poissonniers de Möja ligger i hjärtat av Berg By, Möja, Vi tar enbart drop in i Bistron",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://mojaoutdoor.se/",
      "org": "mojaoutdoor.se",
      "vad": "Hos oss på Möja Outdoor kan du hyra kajak, roddbåt, SUP, vattenskoter eller cyklar, Vi åker med egna båtar på sälsafari där vi spanar efter både säl och havsörn, eller så åker vi till en ö utanför Möja och badar bastu.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://mojavandrarhem.se/",
      "org": "mojavandrarhem.se",
      "vad": "Vandrarhemmet har öppet från april till december",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://mojavardshusochbageri.se/v%C3%A4rdshuset.php",
      "org": "mojavardshusochbageri.se",
      "vad": "en genuin och hemtrevlig skärgårdsrestaurang med fullskaligt bageri, Bergs by 600, Möja",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://mojavardshusochbageri.se/",
      "org": "mojavardshusochbageri.se",
      "vad": "I samband med nya ägare 2005 utökar man även verksamheten med Bed & Breakfast.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://mojavardshusochbageri.se/boka-bord.php",
      "org": "mojavardshusochbageri.se",
      "vad": "Det går att boka boende hos oss via Booking.com mellan den 18e juni till den 15e augusti., Stängt för säsongen alla andra samtliga datum.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.rolandsvenssonmuseet.se/",
      "org": "rolandsvenssonmuseet.se",
      "vad": "Under sommarsäsong är det öppet varje dag fr o m midsommardagen till början av augusti., Museet är öppet året runt mot bokning, Adress: Ramsmora brygga Möja",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.rolandsvenssonmuseet.se/roland-svensson-museet/",
      "org": "rolandsvenssonmuseet.se",
      "vad": "I museet speglas Rolands obändiga arbetslust ända ned till de konkreta arbetsplatserna i form av målar- och skrivarhörnorna., Museet öppnade 2014, en glasad vägg ger ett vidunderligt perspektiv ut mot den skärgård, Nassa och Gillöga, som låg Roland varmast om hjärtat.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Överby, Sollenkroka brygga 2), 2) Endast vissa turer., Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026 ; uppmätt 2026-10-29: Slussen → Sollenkroka brygga 71–78 min",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v438.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Boda, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026, Boda brygga ank , uppmätt Slussen → Boda brygga 49–57 min",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.stockholmarchipelagotrail.com/sv/section/etapp-moja/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "De 13,8 km på grusväg runt den östra och södra kusten, rekommenderar vi att du går från Långvik, till Ramsmora, till Löka, till Berg och slutligen till Hamn., Lätt, På Möja har du många möjligheter om du har barnvagn",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Möja",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/moja-bockon-och-lokaon/",
      "org": "stockholmslansmuseum.se",
      "vad": "Längs Möjas och Södermöjas östra kust har det funnits skyddade hamnvikar som lockat till sig bebyggelse ända sedan medeltiden., Vid 1800-talets mitt fanns där 74 gårdar., Det goda fisket var basen för försörjningen., Det var också där och på öarna norr om Långvik som jordgubbsodlingarna fanns när denna näring var som störst från sekelskiftet 1900 och en bit in på 1970-talet., Möja fick fast ångbåtsförbindelse 1906",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/moja-kyrkviken/",
      "org": "svenskagasthamnar.se",
      "vad": "Liten fiskehamn på Möjas sydöstra sida med gästbrygga längst in i hamnen, Gästhamnen ligger nära Berg, Restaurang, 500 m . Läst med curl; Chromium fick 502 från arbetsytans proxy.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/djuro-moja-namdo/moja-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Ovanför altaret hänger en tavla som föreställer Kristus på korset, Den omfattar tio stämmor fördelade på två manualer och pedal med mekanisk traktur. . Dörrarna från 1924, ramens ålder och orgelns byggår har ingen nivå 1-källa och är strukna.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-moja-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Följ landsvägen förbi Konsum till T-korsningen vid Värdshuset, ta höger så ligger vandrarhemmet på vänster sida, Öppet April - December . Avståndet i STF:s vägbeskrivning står inte i texten, eftersom det inte stämmer med Kontrollantens mätning i OpenStreetMap (omkontroll 4; Redaktörens beslut mo4071).",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Cykeluthyrning, Cykel finns att hyra.",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/%c3%a4ta-och-handla-p%c3%a5-m%c3%b6ja/",
      "org": "visitmoja.se",
      "vad": "sommartid dubbleras antalet matställen, då finns även pizzeria, glasskiosk, bageri och fiskbod. . Wikströms Fisk stängde 13 juni 2024 (se boendekommentaren ovan) och är struken.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/vandra/",
      "org": "visitmoja.se",
      "vad": "där det går en vacker naturstig genom naturreservatet Björndalen",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/g%C3%A4sthamnar/",
      "org": "visitmoja.se",
      "vad": "Långviks inre gästhamn, Ramsmora gästhamn, Löka gästhamn, Kyrkviken, Möjaström, det kan vara trångt i juli, det går inte att förboka plats",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/aktiviteter-p%C3%A5-m%C3%B6ja/",
      "org": "visitmoja.se",
      "vad": "Möjas dansbana är skärgårdens äldsta ännu i drift och varje år ordnas musikspelningar, dans, bio och marknader. . Fiskeaktiviteten (abborre, gädda, havsöring) saknade källa och är ersatt.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://visitmoja.se/boende-p%C3%A5-m%C3%B6ja/",
      "org": "visitmoja.se",
      "vad": "På Möja finns ett fåtal boenden för besökare så under högsommaren blir det ofta fullbokat tidigt på året, Många privatpersoner hyr ut stugor och det finns några organiserade boenden.",
      "last": "2026-11-09",
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
      "url": "https://visitmoja.se/",
      "org": "visitmoja.se",
      "vad": "Brunströms bod i Berg, Öppet under juni - augusti!, Boden drivs sommartid ideellt av Möja Turistförening",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/moja",
      "org": "Waxholmsbolaget",
      "vad": "Båtar går året runt från Boda brygga på Värmdö till flera bryggor på Möja., Vissa turer går också direkt från Strömkajen ut till Möja utan byte., De mest trafikerade bryggorna på Möja är Möjaström och Berg, som båda ligger på öns sydligaste del.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h14.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA, Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00, M Går under perioderna 8 maj - 18 juni och 17 augusti - 13 september. . Uppmätt i tabell 14A: 2–7 avgångar per dag från Sollenkroka mot Möja (flest på onsdagar; lördagar 2 april–7 maj och 14 september–12 december bara 2, eftersom tur 1461 har anmärkning M).",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s14.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, Berg (Möja) . Uppmätt: Berg angörs på 50 av 53 turer som angör Möja.",
      "last": "2026-11-09",
      "myndighet": false
    }
  ],
  "fjaderholmarna": [
    {
      "url": "https://app.raa.se/open/fornsok/lamning/406b40b1-23eb-44a6-bb00-3a52626226d0",
      "org": "app.raa.se",
      "vad": "Fjäderholmarnas namn har förmodligen från början varit Fjärdholmarna.; 1661 skrevs det Fierholmarne.; Den finns utmärkt 1699 års kartor över Lidingö socken.; Innan ångbåtarna, då skärgårsborna själva forslade in strömming till Stockholm, var sjökrogen en vanlig rast- och mötesplats för bl.a. Möjaborna, där man stannade över natten innan man fortsatte till Fiskarhamnen i Slussen.",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1045298",
      "org": "geodata.naturvardsverket.se",
      "vad": "Syftet med fågelskyddsområdet är att skydda fågelfauna under häckningstid.; under tiden 1 april - 15 juli landstiga eller uppehålla sig på Libertus och skären nordost därom samt Lillholmen",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://geodata.naturvardsverket.se/naturvardsregistret/rest/v3/omrade/2003075/G%C3%A4llande/foreskriftsomraden",
      "org": "geodata.naturvardsverket.se",
      "vad": "Gällande; Tillträdesförbud; Fågel; 1/4; 15/7 ; värdena i fälten beslutsstatus, foreskriftstyp, foreskriftssubtyp, franDatum och tillDatum.",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://geodata.naturvardsverket.se/naturvardsregistret/rest/v3/omrade/2003075/G%C3%A4llande/wkt",
      "org": "geodata.naturvardsverket.se",
      "vad": "680708.003 6581247.9379 ; uppmätt 2026-11-08: gränsen omsluter OpenStreetMaps Libertas (way 4761600) och Rövarns holme (way 23196312) helt och ingen del av Stora Fjäderholmen. Rövarns holme ligger där beslutets karta har Lillholmen.",
      "last": "2026-11-16",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "lidingo.se",
      "vad": "Lidingös skärgård utgörs av spridda holmar och småöar som omger Lidingö; samt Fjäderholmarna in mot Stockholm i söder .  — Fjäderholmarna ligger i Lidingö stad",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/bygga-bo/bygglov/kulturmiljoprogram/",
      "org": "lidingo.se",
      "vad": "har vi inventerat hela Lidingö; under Kulturmiljöer på öarna: Stora Fjäderholmen (pdf, 1.3 MB), Ängsholmen och Libertas (pdf, 1.3 MB)",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/kungliga-nationalstadsparken.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "parken inrättades 1995, omfattar 27 kvadratkilometer, sträcker sig \"från Sörentorp och Ulriksdal i norr till Djurgården och Fjäderholmarna i söder\" och \"spänner över tre kommuner: Solna, Stockholm och Lidingö\"; \"Länsstyrelsen samordnar arbetet med parkens förvaltning och utveckling. Kungliga Djurgårdens förvaltning sköter runt 80 procent av marken.\"",
      "last": "2026-10-29",
      "myndighet": true
    },
    {
      "url": "https://catalog.lansstyrelsen.se/store/39/resource/2010__22",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Libertus; Tillträdesförbud: 1/4 - 15/7",
      "last": "2026-11-08",
      "myndighet": true
    },
    {
      "url": "https://www.fjaderholmarna.se/",
      "org": "fjaderholmarna.se",
      "vad": "Tamano Specialsnickeri, Textiltrycket, Krukmakeriet, Garage by the Sea, (Glashytta), The Forge, (Smedja), Fjäderholmarnas Choklad, Flertalet hantverkare har ateljéer och butiker på Fjäderholmarna, Öns hantverkare inbjuder till sommarkurser och workshops.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarna.se/artiklar-film-360/kungliga-parker/2025-06-09-fjaderholmarnas-historia.html",
      "org": "fjaderholmarna.se",
      "vad": "De Kungliga Slotten; Fjäderholmarna kan besökas säsongen maj till mitten av september.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://fjaderholmarnasbryggeri.se/fjaderholmarnas-bryggeri-at-sea",
      "org": "fjaderholmarnasbryggeri.se",
      "vad": "offering a wide variety of our beers served directly from the Brite Beer Tanks; You can also grab a bite from our pub menu; we offer Beer Flights; featuring 4–5 of our own brews; We only accept drop-ins.; For parties of 10 people or more, please see the booking link below.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://fjaderholmarnasbryggeri.se/about",
      "org": "fjaderholmarnasbryggeri.se",
      "vad": "in 2014 we were finally ready for take-off and opened our own brewpub at Fjäderholmarna; At the very peak of Covid-19 we opened our bigger production brewery in Bro, located in a peaceful environment just one hour drive from Fjäderholmarna",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarnaskrog.se/",
      "org": "fjaderholmarnaskrog.se",
      "vad": "Hamnbaren, FESTVÅNING MAGASINET, Fjäderholmarnas Krog & Magasin, FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027. .  — Loftet är en del av vår restaurang och kan abonneras för större sällskap.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarnaskrog.se/ppettider-mellanssong",
      "org": "fjaderholmarnaskrog.se",
      "vad": "ÖPPETTIDER 2026, Vi har nu stängt och öppnar åter för julbord 20 november till och med 20 december.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarnaskrog.se/batar-till-och-fran",
      "org": "fjaderholmarnaskrog.se",
      "vad": "Båtarna till och från ön under det att vi serverar vår julbord går endast i samband med de olika sittningar.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.fjaderholmarnaskrog.se/menyforslag-krogen",
      "org": "fjaderholmarnaskrog.se",
      "vad": "MENYER KROGEN, A´LA CARTE MENY .  — Hamnbaren, FESTVÅNING MAGASINET, FÖR KOMMANDE SOMMAREN ÖPPNAR VI UPP DEN 1 MAJ 2027.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "http://www.fjaderholmslinjen.se/valkommen/index.asp",
      "org": "fjaderholmslinjen.se",
      "vad": "Fjäderholmslinjen går under perioden 1 maj till 13 september 2026.; Resan tar ca 25 minuter.; Det går inte att reservera platser.; Vi accepterar Visa/Mastercard, ej kontanter.; Snälla hundar i koppel är välkomna.",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://www.naturkartan.se/sv/stockholms-lan/libertas-fagelskyddsomrade",
      "org": "naturkartan.se",
      "vad": "Libertas och Rövarns holme är ett fågelskyddsområde där det är landstigningsförbud under fåglarnas häckningstid från 1 april till 15 juli.; Här finns bland annat Stockholms största koloni av silltrut.; Med en bra kikare kan man titta på holmarnas fågelliv från Stora Fjäderholmen.; På Libertas står en fyr som är förklarad som byggnadsminne.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.rokeriet-fjaderholmarna.se/om-rokeriet-fjaderholmarna",
      "org": "rokeriet-fjaderholmarna.se",
      "vad": "fokus på våra egna rökta produkter, tillagade på plats, under sommarmånaderna även besöka vår deli och glasskiosk, där ni kan ta med er något gott hem eller njuta av en skärgårdsfika under ert besök på ön., Rökeriets uteservering bjuder på sol hela dagen och en fantastisk utsikt över Stockholms inlopp",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.rokeriet-fjaderholmarna.se/",
      "org": "rokeriet-fjaderholmarna.se",
      "vad": "1 Maj-13 Sep, 20 Nov-20 Dec, Julbordet serveras från 20 november till 20 december 2026., BOKA BORD",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://share.mediaflow.com/sv/?K7CCE1YEFB",
      "org": "share.mediaflow.com",
      "vad": "Det rådde brännvinsmonopol i Stockholm; fritt kunde sälja billigt brännvin på ön i och med att Stora Fjäderholmen låg utanför stadens gräns.; Ångbåtsturerna avgick från Stockholm varje halvtimme; Redan 1884 hade ett utsiktstorn uppförts, kallat Belvederen. År 1894 byggdes detta om till restaurangpaviljong för 500–600 personer.; År 1905 ombyggdes restaurangpaviljongen till en större anläggning; ”Grand Restaurant Bellevue” och 1910 tillkom en utedansbana.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://share.mediaflow.com/sv/?QMCC914E6X",
      "org": "share.mediaflow.com",
      "vad": "Efter första världskrigets slut 1918, blev Fjäderholmarna efterhand utbyggt för ammunitionstillverkning i det svenska försvarets regi.; Sedan 1995 ingår Fjäderholmarna i Kungliga nationalstadsparken.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://stockholmskallan.stockholm.se/post/9943",
      "org": "stockholmskallan.stockholm.se",
      "vad": "transporterades till Fjäderholmarna, som staden hade köpt 1849.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://stockholmskallan.stockholm.se/post/10177",
      "org": "stockholmskallan.stockholm.se",
      "vad": "som i slutet av 1870-talet rasade mellan Utskänkningsbolaget och brännvinstillverkaren L O Smith; Smith lockade köpare genom att erbjuda fri resa för passagerare till Fjäderholmarna med uppvärmda båtar som avgick minst två gånger i timmen.; Den fick namnet ”Grand Restaurant Bellevue” . Lidingö stad daterar brännvinsförsäljningen till 1880-talet och Stockholmskällan brännvinskriget till slutet av 1870-talet, därför står i slutet av 1800-talet.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/fjaderholmarna/",
      "org": "Strömma",
      "vad": "Att ta båt till Fjäderholmarna är ett enkelt och uppskattat sätt att uppleva skärgården på nära håll.; Strandvägen - Kajplatsområde 13; Endast 30 minuters båtresa från city; 1 maj – 17 juni & 16 augusti – 12 september:",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/julbord/battransport-till-julbordet/",
      "org": "Strömma",
      "vad": "20 november – 20 december, 2026:, Dagliga avgångar (fliken Tidtabell); Strandvägen - kajplatsområde 14; Båttransport via Nacka Strand till Fjäderholmarna; för dig som bokat julbord på någon av restaurangerna på ön; Vänligen notera att båtbiljett till Fjäderholmarna numera måste bokas och betalas i förväg",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/stockholm-fjaderholmarna/",
      "org": "svenskagasthamnar.se",
      "vad": "Gästplatser 35 (1/5-31/9); Förtöjning boj; Dusch ingår; Hamnvärd Sjöstation Fjäderholmarna; Eluttag, Färskvatten och Toalett är markerade med bock (ikon i sidans HTML) . Runda 11 (sb01-k043): säsongen för gästplatserna står som källan anger den. Priserna står bara hos Svenska Gästhamnar, inte i en prislista hos hamnen, och är strukna.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.visitstockholm.se/o/fjaderholmarnas-bad/",
      "org": "visitstockholm.se",
      "vad": "Fjäderholmarnas bad; Åk till badvänliga klippor på Stockholms närmaste skärgårdsö",
      "last": "2026-11-08",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget",
      "vad": "2A STOCKHOLM – HÖGANÄS – VAXHOLM, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; Fjäderholmarna angörs på vissa turer med X = Bryggorna trafikeras utan fast avgångstid.; Sök hela din resa på sl.se för att få tider för både anslutande SL-trafik och skärgårdstrafiken. . Tidigare källa ResRobot är ingen operatör och är struken.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor",
      "org": "Waxholmsbolaget",
      "vad": "Det här gäller året runt ombord på Waxholmsbolagets fartyg i området och för alla sorters SL-biljetter.; Mellan dessa bryggor kan du året runt resa med Waxholmsbolaget på alla sorters SL-biljetter:; i listan: Fjäderholmarna, Strömkajen (här stannar även SL:s pendelbåtslinje 84)",
      "last": "2026-11-07",
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
      "vad": "Ljusterö har under flera decennier varit en konstnärs-ö, många kända konstnärer som Carl Larsson, Bruno Liljefors och J.A.G Acke har besökt och inspirerats av Ljusterö genom åren. Idag kan du se konstsamlingen på Ljusterö Hembygdsgård",
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
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/ljusteroleden/",
      "org": "Trafikverket",
      "vad": "Färjeledens längd är 1100 meter och överfartstiden är sju minuter, Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://klintsundetmarina.se/",
      "org": "klintsundetmarina.se",
      "vad": "Vår marina har ca 60 st permanenta båtplatser vid Y-bommar. Utöver dessa så erbjuder vi ett fåtal för korttidsuthyrning och som gästhamnsplatser, Vi har Blyfri 98, RME-fri diesel",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://klintsundetmarina.se/kajak-1/",
      "org": "klintsundetmarina.se",
      "vad": "Vi har 4 st enkel (K1) och en dubbelkajak (K2) till uthyrning, Kajakerna är beläget vid Klintsundet, sundet mellan Västra och Östra Lagnö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/julbord",
      "org": "linanasbryggan.se",
      "vad": "Ljusterö Logi ligger cirka 150 meter bort (julbord 2026)",
      "last": "2026-10-22",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/faq",
      "org": "linanasbryggan.se",
      "vad": "LINANÄS GÄSTHAMN Hur många båtplatser har ni? 20+ Finns det toalett? Ja. 3 st. Inklusive 1 handikapptoalett",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/gsthamn",
      "org": "linanasbryggan.se",
      "vad": "Hamnvärd VHF, kanal L1 eller 16",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/",
      "org": "linanasbryggan.se",
      "vad": "RESTAURANGEN Stängt för säsongen Vi öppnar igen till påsk 2027",
      "last": "2026-10-22",
      "myndighet": false
    },
    {
      "url": "https://www.linanasbryggan.se/meny-4",
      "org": "linanasbryggan.se",
      "vad": "",
      "last": "2026-10-22",
      "myndighet": false
    },
    {
      "url": "https://ljusterologi.se/",
      "org": "ljusterologi.se",
      "vad": "31 sovplatser i Stockholms Skärgård, Skärgårdsboende med historiskt arv och plats för evenemang & tillställningar sedan 1910-talet, Vi har 15 smakfullt inredda rum, Det finns en stor pool med terrass och en bastu",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h626.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Danderyds sjukhus–Ljusterö, Linanäs brygga: Danderyds sjukhus … → Östanå färjeläge … → Ljusterö färjeläge … → Linanäs brygga …; lördag … → Ljusterö färjeläge … . Färjan avgiftsfri enligt",
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
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, STOCKHOLM – VAXHOLM – LJUSTERÖ: söndag Strömkajen … → Linanäs … (14 september–1 november), söndag …, lördag …, tisdag …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "Åsättra brygga",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "dalaro": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/dalaro/",
      "org": "haninge.se",
      "vad": "Dalarö är lots- och tullsamhället som sedan blev badortsidyll; snirkliga gator, gränder och villor med snickarglädje i schweizisk anda; Strindberg kallade det porten till paradiset",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/sevardheter/dalaro-skeppsvraksomrade/",
      "org": "haninge.se",
      "vad": "I Dalaröområdet finns ett 30-tal registrerade fartygslämningar från 1600- till 1900-talet.; Tre vrak, representativa för sin tid, har tillgängliggjort under konceptet Dalarö skeppsvraksområden.; All dykning inom Dalarö skeppsvraksområde ska ske från en båt. Inför varje dyktillfälle görs en ansökan om tillstånd att få förtöja vid bojen av en dykarrangör, detta sker via Dalarö Dykpark.; På plats genomför behörig dykguide en kulturhistorisk genomgång innan dyk; Till exempel är dykning över skrovet inte tillåten; ett minsta säkerhetsavstånd till fartyget och kringliggande botten är en meter",
      "last": "2026-11-17",
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
      "url": "https://www.lansstyrelsen.se/stockholm/om-oss/om-lansstyrelsen-stockholm/lanets-forfattningssamling/forfattningar-2023/forfattningssamling-2023/2023-06-16-01fs-202315.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Förbud gäller mot att dyka, ankra och nyttja undervattensfarkoster inom ett vattenområde; vid vraket efter Anna Maria; Länsstyrelsen kan meddela undantag från föreskrifterna genom beviljande av tillstånd; Denna föreskrift träder i kraft den 27 juni 2023.",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/om-oss/om-lansstyrelsen-stockholm/lanets-forfattningssamling/forfattningar-2023/forfattningssamling-2023/2023-06-16-01fs-202314.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Förbud gäller mot att dyka, ankra och nyttja undervattensfarkoster inom ett vattenområde; vid vraket efter Jutholmsvraket; Länsstyrelsen kan meddela undantag från föreskrifterna genom beviljande av tillstånd; Denna föreskrift träder i kraft den 27 juni 2023.",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sandemar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Med bil tar man avfarten mot Dalarö från motorvägen (väg 73). Fortsätt cirka 15 km ut mot Dalarö och ta till höger in på parkeringen vid skylten; naturreservat Sandemar",
      "last": "2026-11-17",
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
      "url": "https://www.dalarobageri.se/",
      "org": "dalarobageri.se",
      "vad": "Odinsvägen 15, Veckans lunch, Cafémeny, Kvällsöppet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dalarodykpark.com/",
      "org": "dalarodykpark.com",
      "vad": "Dalarövraket, Anna-Maria och Jutholmsvraket; vilket gjort det möjligt att besöka vraken under ledning av en specialutbildad dykguide; Dykutfärder i Stockholms skärgård",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://dalarogasthamn.se/",
      "org": "dalarogasthamn.se",
      "vad": "Vi har ca 40 gästplatser för båt med bom; Vi har öppet dagligen 15 maj till 15 september.; Vår hamn ägs av Dalarö båtklubb",
      "last": "2026-11-25",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Rudsjöterrassen–Dalarö (–Smådalarö), Haninge centrum, Alla hållplatser för buss 839 mot Smådalarö finns ovan., Tidtabellen är anpassad till pendeltåg från Stockholm vid, Handens station., Måndag–fredag, Lördag, söndag helgdag, Giltig 17 augusti–12 december 2026 ; Rudsjöterrassen → Hotellbryggan 33 till 39 min (MÄTT i tabellen: måndag till fredag 34 till 39, lördag, söndag och helgdag 33 till 37). Handens station finns inte bland hållplatserna.",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station–Dalarö (–Smådalarö), Haninge centrum, Alla hållplatser för buss 839 mot Smådalarö finns ovan., Tidtabellen är anpassad till pendeltåg från Stockholm vid, Handens station., Måndag–fredag, Lördag, söndag helgdag, Giltig 13 december 2026–20 juni 2027 samt 16 augusti–11 december 2027 ; Handens station → Hotellbryggan 33 till 39 min (MÄTT i tabellen: måndag till fredag 34 till 39, lördag, söndag och helgdag 33 till 37)",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h869.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "869 Globen–Dalarö, SLAKTHUSET (GLOBEN), Ingen trafik, Giltig 18 mars–18 juni samt 17 augusti–12 december 2026 ; Slakthuset (Globen) → Hotellbryggan 46 till 50 min. Pendeltågets restid Stockholm C till Handen är inte belagd (ingen aktuell tryckt tabell för linje 43 hittades).",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "839 Rudsjöterrassen–Dalarö (–Smådalarö), Giltig 19 juni–16 augusti 2026, Måndag–fredag, Lördag, Söndag och helgdag",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://smadalarogard.se/",
      "org": "smadalarogard.se",
      "vad": "Smådalarö Gård Hotell & Spa, Ett av Sveriges största spahotell i Stockholms skärgård, Spa, aktiviteter, närodlad mat och personlig service",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/dalaro-och-dalaro-skans/",
      "org": "stockholmslansmuseum.se",
      "vad": "ångbåtstrafik till Stockholm 1852; \"Vid slutet av 1800-talet och början av 1900-talet blev det populärt bland stockholmare som hade råd att bygga sommarhus\"; \"Kända konstnärer som Anders Zorn arbetade och kopplade av på Dalarö\"",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/dalaro-askfatshamnen/",
      "org": "svenskagasthamnar.se",
      "vad": "Klubbhamn vid Dalarö kanals södra mynning, Centrum 500 m - gångstig över Askfatsberget, Schweizerbadet 500 m, gästplatser 40 (15/5-15/9)",
      "last": "2026-11-17",
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
      "vad": "Tullhuset Restaurant & Bar är en skärgårdskrog som huserar i anrika Dalarö Tullhus, Från och med måndagen den 17 augusti välkomnar vi er följande tider (17 augusti är en måndag 2026)",
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h20.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "20A DALARÖ – ORNÖ (VÄSTRA SIDAN), Gruvbryggan (Utö), Spränga (Utö); båda GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "arholma": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/arholma-ido.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "medföra okopplad hund; för längre tid än två dygn i följd förtöja, dra upp eller förankra båt eller annan farkost vid samma plats (gäller ej brygga); för längre tid än två dygn i följd tälta på samma plats, annat än inom anlagd tältplats; elda annat än på anvisad plats; under tiden 1 april till 31 juli landstiga på öarna Rödkobben och Nollekobb; ankra båt eller framföra motordriven båt i inre delen av Idöfladen",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/kultur-och-konst/norrtalje-museerkulturarv-och-stadsarkiv/museer-hembygds--och-kulturforeningar/batteri-arholma--upplevelsemuseum/",
      "org": "norrtalje.se",
      "vad": "Anläggningen byggdes för Kalla kriget och stod klar 1968; På ön Arholmas norra spets och gömd i berget; Den visas av säkerhetsskäl endast genom guidade turer",
      "last": "2026-09-20",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/",
      "org": "norrtalje.se",
      "vad": "Norrtälje kommun har 31 badplatser (listan på sidan: ingen av dem ligger på Arholma)",
      "last": "2026-11-17",
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
      "last": "2026-10-20",
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
      "vad": "Hyr din cykel och hämta direkt på bryggan där båten lägger till.; på grund av högt tryck rekommenderar vi att du bokar i god tid innan du kommer till Arholma",
      "last": "2026-10-19",
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
      "url": "https://blidosundsbolaget.se/norra-batlinjen/",
      "org": "blidosundsbolaget.se",
      "vad": "I sommar erbjuder vi dagliga avgångar mellan den 6 juli och 9 augusti; … Norrtälje, längst bort på Norrtälje hamnpromenad, vid bron Havslänken; M/S Rex",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/arholma/",
      "org": "Skärgårdsstiftelsen",
      "vad": "landskapet brukats i hundratals år; åkrar, strandängar, hagmarker och skogspartier; på Arholma är kor våra bästa naturvårdsarbetare, de hjälper till att hålla markerna öppna; Bull-Augusts gård är en klassisk roslagsgård som idag fungerar som vandrarhem",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h636.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje busstation …; Simpnäs brygga …; Giltig 17 augusti–12 december 2026",
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h30.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; 30A SIMPNÄS – ARHOLMA; Simpnäs (Björkö) …; Arholma …",
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
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3749289/1732517028266/F%C3%B6rorenade%20omr%C3%A5den%20-%20inventering%20av%20gruvbranschen%20i%20Stockholms%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen Stockholm",
      "vad": "De största gruvorna var Härsbacka i Österåkers kommun och Lugnet på Ornö i Haninge kommun. / Ornö, Lugnets fältspatsbrott ... Ett av länets största fältspatsbrott.",
      "last": "2026-10-10",
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h20.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; Avgången körs av Ornö Bilfärja, särskild; Dalarö … / Hässelmara (Ornö) …; åter Hässelmara (Ornö) … / Dalarö …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget",
      "vad": "19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ; bryggorna Ornöboda (Ornö), Söderviken (Ornö) och Ornö Kyrka",
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
      "vad": "20 bofasta på ön, men sommartid mångdubblas ofta befolkningen; ön har tre hamnar – Österhamn, Västerhamn och Norrhamn; Batteri Landsort är en underjordisk försvarsanläggning från kalla kriget, nu ett museum; Hela ön är naturskyddsområde; På Landsorts fågelstation dokumenteras och ringmärks över 12 000 fåglar varje år",
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
      "url": "https://www.g-mo.se/fyren/",
      "org": "g-mo.se",
      "vad": "Fyren visas tre gånger per dag, … från mitten av juli tills mitten av augusti; Övriga tider på året efter överenskommelse; Lysvidd 22 nautiska mil",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.g-mo.se/ersta-batteriet/",
      "org": "g-mo.se",
      "vad": "Mellan mitten av juli till mitten av augusti … – platser bokas i förväg",
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
      "vad": "början av april-slutet av juni, mitten av augusti-början av november; öppna guidningar varje lördag …; Fågelstationen nås via promenad på ca 10 minuter norrut från byn",
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
      "url": "https://kund.printhuset-sthlm.se/sl/v852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Nynäshamns station …; Ankarudden …; Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-landsort/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Du åker till Landsort från Ankarudden på Torö året om",
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
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/landsort",
      "org": "Waxholmsbolaget",
      "vad": "Landsort är Waxholmsbolagets sydligaste destination. Här hittar du vacker natur, badklippor och Sveriges allra äldsta fyr. (2026-09-14)",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h29.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; ANKARUDDEN – LANDSORT; Ankarudden …; Landsort …",
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
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård. Färjeledens längd är 600 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri.; Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen.",
      "last": "2026-11-17",
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
      "url": "https://furusund.se/hamnen/",
      "org": "Furusund Hamn",
      "vad": "I vår gästhamn finns plats för upp till hundra båtar, med toaletter, duschar, bastu, el, vatten och tvätt",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://www.furusund.se/hamnen/",
      "org": "Furusund Hamn",
      "vad": "Dagbesök i Furusunds gästhamn är kostnadsfritt; i mån av plats",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://furusundshamnkrog.se/gasthamn/hamnguide/",
      "org": "furusundshamnkrog.se",
      "vad": "Y-bommar: 2,5 – 3,5 meter; Långsida: 3,0 – 4,0 meter; Bojplatser: 2,0 – 3,0 meter",
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
      "vad": "Hamnkrogen är Furusunds vardagsrum – en plats för luncher, middagar och sommarkvällar vid vattnet",
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
      "org": "Hotell Furusund",
      "vad": "I närheten av vårt hotell finns två större betalparkeringar; De två större betalparkeringar som är belägna strax innan du når hotellet  Runda 11 (sr01-k008, sr01-k029): «Med bil kör man via Norrtälje» struket (ingen källa); parkeringen tillskriven hotellet.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/aktiviteter-och-att-gora-pa-furusund/",
      "org": "Hotell Furusund",
      "vad": "Upptäck Furusunds historia längs en ca 3 km lång promenad med QR-koder och frågor vid varje stopp. Start vid Ångbåtsbryggan. För den som vill fortsätta finns skogsstigar runt hela ön, totalt ca 7 km. Följ de röda markeringarna på träden.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/",
      "org": "Hotell Furusund",
      "vad": "boutiquehotell med 16 rum, restaurang, året runt; visitskargarden.se/boende/hotell/hotell-furusund",
      "last": "2026-09-14",
      "myndighet": false
    },
    {
      "url": "https://hotellfurusund.se/kontakt/",
      "org": "Hotell Furusund",
      "vad": "sista bussen går vid … på fredagar från Furusunds hotellplan som ligger 400 meter från hotellet",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h632.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje–Yxlan; NORRTÄLJE BUSSTATION; Furusundsbron; Furusunds hotellplan; Furusunds färjeläge; Campus Roslagen; Vreta västra; Solö brygga; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: fyra turer måndag till fredag, tre lördag och tre söndag; Norrtälje busstation till Furusunds färjeläge 43 till 52 min.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stockholm–Norrtälje; Tekniska högskolan; Norrtälje busstation; Giltig 17 augusti–12 december 2026",
      "last": "2026-11-17",
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA; GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026; GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026",
      "last": "2026-09-27",
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
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000444777",
      "org": "kringla.nu",
      "vad": "En ny kyrka började uppföras år 1856 runt det gamla kapellet som revs först ett år senare. Invigningen förrättades år 1859. Den nya kyrkan ritades av arkitekten Ludvig Hedin.; salkyrka med enskeppigt långhus av sten och tegel; Fasaderna är putsade och gult avfärgade, tidigare vita; Sadeltaket täcks av skiffer (2026-09-14)",
      "last": "2026-09-30",
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
      "org": "Norrtälje kommun",
      "vad": "Reservatets östra och västra delar består av två stora hällmarksområden. Mellan dessa två bergsryggar växer blandskog med hög lövandel; Fågellivet är även det rikt med bland annat häckande sjöfågel.; rosettjungfrulin, darrgräs, vildlin, Adam och Eva, solvända, ormrot, älväxing, svartkämpar, liten blåklocka, bockrot och småborre; I söder och öster finns badvänliga klippstränder.",
      "last": "2026-09-30",
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
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/radmansholmen/",
      "org": "Norrtälje kommun",
      "vad": "ligger vid södra kusten på Oxhalsö, Här hittar du cirka 25 meter strandlinje som består av sand, Runt om badplatsen finns lövskog, Ytterligare en badflotte närmare strandkanten, på grundare vatten, Hund tillåtet: Nej, inte mellan 15 maj och 15 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/barn-och-skola/grundskola/grundskolor/kopmanholms-skola/",
      "org": "Norrtälje kommun",
      "vad": "Köpmanholms skola ligger på ön Yxlan, omgiven av öarna Furusund och Blidö, Här går cirka 35 elever, Lilltorpsvägen 33, 760 18 Yxlan",
      "last": "2026-10-01",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/",
      "org": "Trafikverket",
      "vad": "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård; Färjeledens längd är 530 meter; överfartstiden är fyra minuter; Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård, Färjeledens längd är 600 meter och överfartstiden är fyra minuter, Resan med vägfärjan är avgiftsfri",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.blidorestaurang.se/",
      "org": "blidorestaurang.se",
      "vad": "Från början av juni till mitten av augusti har vi öppet för lunch och middag, Onsdagar förgyller vi med trubadur, Man kan inte boka bord hos oss, Vi har nu stängt för säsongen ; adress Stämmarsundsbacken 7 enligt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://blidorestaurang.se/v-hem/",
      "org": "blidorestaurang.se",
      "vad": "Rummen har 2, 3 eller 4 sängar . blidobryggabistro.se löser inte längre upp (DNS), verksamheten har bytt till blidorestaurang.se.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://blidorestaurang.se/bryggan/",
      "org": "blidorestaurang.se",
      "vad": "Det går INTE att boka bryggplats hos oss, Behöver du fylla dunkar kan du göra det här, El finns tyvärr inte nere på bryggan, Vi har flera duschar och toaletter",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h634.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje–Blidö, Giltig 17 augusti–12 december 2026, Norrtälje busstation, Furusunds färjeläge, Norrsund (Blidö färjeläge), Stämmarsund, Bromskärs brygga",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/blido/",
      "org": "svenskagasthamnar.se",
      "vad": "Hamn i skyddat läge vid restaurang Blidö Brygga, 50 gästplatser, Boj/ mooringlina/ långsides, Blidö Brygga & Bistro, diesel och bensin 3 dist. bort",
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
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, 24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET, Stämmarsund (Blidö), Norrsund (Blidö)",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, 24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET, Stämmarsund (Blidö), Norrsund (Blidö)",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA, Strömkajen (Stockholm), Norrsund (Blidö), Svartlöga, Rödlöga",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA, Norrsund (Blidö), Svartlöga, Rödlöga",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026, 28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA, Bromskär (Blidö), Bryggan är avstängd till juni 2027 på grund av renoveringsarbeten.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.linjetidtabeller.se/",
      "org": "waxholmsbolaget.linjetidtabeller.se",
      "vad": "Beställ tryckta tidtabeller, Furusund - Östernäs - Söderöra - Bromskär / Rödlöga, Furusund - Högmarsö - Solö; listan har ingen tabell för linje 24 eller 26",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "gallno": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/gallno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Norrviken, på östra sidan om Brännholmen, är ett skyddsvärt grundområde som har mycket höga naturvärden, grunda havsvikar med vass, kärlväxtängar och kransalger, Inom reservatet finns också blåstångsbälten, viktiga lek och uppväxtmiljöer för kustlevande rovfisk som gädda och abborre, framföra motorbåt eller vattenskoter i Norrviken",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/karklo.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 2017, Storlek: 123 hektar varav land 59 hektar, Förvaltare: Skärgårdsstiftelsen, Vid Vambö och Kolfatet gränsar reservatet till Gällnö naturreservat i sydost, Den lilla ön Kolfatet, På ön finns en grov döende ek, troligen upp emot 300 år gammal, Det finns en markerad strövstig på Karklö som hör samman med båtluffarleden, Badplats finns utanför reservatet, i närheten av ångbåtsbryggan, På Karklö-Vambö bedrivs ett aktivt jordbruk med boskapsskötsel",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gallno.se/gallno-krog/",
      "org": "gallno.se",
      "vad": "Vår meny erbjuder en mångfald av smårätter som är perfekta att dela på och större rätter med grillade inslag och fokus på grönsaker, Inspirationen till vår mat hämtar vi från Medelhavsländerna, De flesta borden finns under äppelträden i trädgården, Vi tar ej bordsbokningar",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/om-gallno/",
      "org": "gallno.se",
      "vad": "Grusvägarna är bilfria och badklipporna varma.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/hotell-frans-august/",
      "org": "gallno.se",
      "vad": "Skärgårdens minsta hotell!, Frukost ingår alltid till alla våra hotellgäster, Med direkt anslutning till vandrarhemmet kan man även använda alla de gemensamma utrymmena där, så som kök och matsal, dusch samt bastu på vandrarhemmet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/talta/",
      "org": "gallno.se",
      "vad": "Det finns en fin och gratis tältplats vid Torsviken cirka 20 minuter promenad från Gällnö By. Där finns förutom färskvatten och torrdass också en fin sandstrand.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/oppettider/",
      "org": "gallno.se",
      "vad": "Öppettider 2026, 14 maj - 17 maj (Kristi him), 27 JUNI - 9 augusti, 18 AUGUSTI - 23 AUGUSTI . Handskrivna öppettider borttagna.",
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
      "url": "https://gallno.se/dagsutflykt/",
      "org": "gallno.se",
      "vad": "gå från Gällnönäs till Gällnö by och stanna för lunch på krogen. Efter maten kan du fortsätta till Gällnö brygga för hemresa",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gallno.se/handelsboden/",
      "org": "gallno.se",
      "vad": "omfattande sortiment av kolonialvaror, mejeriprodukter, frysvaror, färsk frukt, kött, fisk, konfektyr och dryck, Varje vardag levereras färskt bröd från bageri Vivels i Stockholm, Vi tar tex gärna upp beställningar av färsk fisk och skaldjur.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/gallno-karklo/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Gällnö by beskrivs med \"rödmålade hus, båthus och bodar under knotiga äppelträd, med utsikt över Hemfladen\"; ön ligger i mellersta skärgården mellan Värmdö och Möja (2026-09-14)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/cinderellabatarna/",
      "org": "stromma.com",
      "vad": "Med Cinderella tar resan till Gällnö ca 1 tim och 45 min., Kliv ombord vid Strandvägen, Säsongen löper från slutet av april till slutet av september.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskaturistforeningen.se/boende/stf-gallno-vandrarhem/",
      "org": "svenskaturistforeningen.se",
      "vad": "Skärgårdsbåten lägger till vid Gällnö brygga. Därifrån slingrar en grusväg mot Gällnöby. Vandrarhemmet ligger ca 1,2 km från bryggan. Vid bryggan finns ett par dragkärror att låna för bagaget., Väl framme vid ångbåtsbryggan på Gällnö väntar en 15 minuters vacker promenad till Gällnö By",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h11.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, Gällnönäs (Gällnö), Ängsholmen (vid Gällnö): t.ex. lördag Strömkajen … → Gällnö …, måndag–torsdag …, Boda brygga … → Gällnö …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/gallno",
      "org": "Waxholmsbolaget",
      "vad": "Du kan åka till Gällnö från Strömkajen, vissa turer går direkt utan byte.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s11.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026: Strömkajen … → Gällnö …",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "norrora": [
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h632.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje–Yxlan, Furusunds färjeläge, Köpmanholm",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/norrora-och-soderora",
      "org": "Waxholmsbolaget",
      "vad": "ligger i den vackra Svartlögafjärden, precis utanför Furusund; Saltkråkan är framför allt inspelat på Norröra. Där ligger till exempel det bostadshus som i tv-serien kallades Snickargården, det hus som farbror Melker först hyrde och sedan köpte; Från Norröra kan du även enkelt ta dig över till Söderöra – båtturen tar bara 10 minuter … Framför allt vinterscenerna spelades in på ön",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget",
      "vad": "26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, Går under perioderna 8 maj - 18 juni och 17, Går under perioden 17 augusti - 30 augusti. Måndag–torsdag går turerna 2601 (8 maj–18 juni) och 2611 (17–30 augusti), fredag 2621 och 2623, lördag … → Norröra …, söndag …",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA, Norrsund (Blidö), Svartlöga, Rödlöga",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget",
      "vad": "FURUSUND – ÖSTERNÄS – SÖDERÖRA – BROMSKÄR / RÖDLÖGA, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026, Beställ resan i SL-appen; Furusund … → Köpmanholm … → Norröra … . — 17 AUGUSTI 2026 – 12 DECEMBER 2026, samma tider Furusund–Norröra",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.linjetidtabeller.se/",
      "org": "waxholmsbolaget.linjetidtabeller.se",
      "vad": "Beställ tryckta tidtabeller, Furusund - Östernäs - Söderöra - Bromskär / Rödlöga, Furusund - Högmarsö - Solö; listan har ingen tabell för linje 24 eller 26",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "nattaro": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/nattaro/",
      "org": "haninge.se",
      "vad": "På ön ligger Drottninggrottan, där drottning Maria Eleonora gömde sig / Runt berget finns ryssugnar från härjningarna 1719 / På ön strövar även dovhjortar vilt.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/nattaro.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Nåttaröfladen har med sina många små kobbar och skär ett rikt fågelliv ... För att skydda fågellivet råder tillträdesförbud mellan 1 februari och 15 augusti. / föreskrifterna räknar upp bland annat Östra Rödko, Långholmen, Grönborgen, Båten, Vittskär, Gjusskär, Brandholmen, Björkskär, Boskär, Rönnkobben, Tärnkobben och Grenkullen",
      "last": "2026-11-17",
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
    },
    {
      "url": "https://www.stockholmarchipelagotrail.com/sv/section/etapp-nattaro/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Tillgänglighet på leden; Är du äventyrlig och stark kan du ta dig längs grusvägen norrut (1,5 km) förbi Drottninggrottan till Nåttarö Storsand. En fin plats att upptäcka och där det är långgrunt.; Den östra kusten är väldigt teknisk på smal stig med mycket sten och rötter; den rekommenderar vi inte.; I Östermarviken, vid Skarsand, vid Nåttarö storsand och i Vänsviken finns grillplatser.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h22.pdf",
      "org": "Waxholmsbolaget",
      "vad": "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ; … (från Nynäshamn); Nåttarö … (gäller 2 april–18 juni och 17 augusti–12 december 2026)",
      "last": "2026-09-27",
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
      "url": "https://www.ingmarso.se/",
      "org": "ingmarso.se",
      "vad": "Längst in i Femsundsviken finns en badplats med brygga och sandstrand. Man kan även bada på ”Badberget” vid Norra bryggan.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://www.ingmarso.se/%C3%A4ta-och-sova",
      "org": "ingmarso.se",
      "vad": "Café – Deli – Restaurang – Catering, öppet från tidig morgon till sen kväll, frukost, lunch, middag, pizza och fika, På uteserveringen, i trädgården",
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
      "url": "https://www.ingmarso.se/att-g%C3%B6ra",
      "org": "ingmarso.se",
      "vad": "Längst in i Femsundsviken finns en badplats med brygga och sandstrand.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingmarsobageri.com/hander-i-bageriet/",
      "org": "ingmarsobageri.com",
      "vad": "RÄKAN ÄR STÄNGD FÖR SÄSONGEN 2026",
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
      "vad": "Ingmarsö Krog ligger precis invid havet, ett stenkast från södra ångbåtsbryggan., Hos oss kan ni nyttja våra bryggor under er sittningstid.",
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
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Ingmarsö, Moderate 9.8 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA . Strömkajen–Norra Ingmarsö: söndag … = 2 tim 37 min, lördag … och vardag … = 2 tim 47 min.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026 . Strömkajen–Södra Ingmarsö via Boda: … = 3 tim 15 min, … = 3 tim 25 min, … = 3 tim 40 min.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA . Åsättra–Norra Ingmarsö 30 min (t.ex. …). Sommartidtabellen finns inte publicerad nu, så den tidigare uppgiften 2,5 h sommartid kunde inte kontrolleras.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "namdo": [
    {
      "url": "https://www.kringla.nu/kringla/objekt?referens=raa/bbr/21400000445278",
      "org": "kringla.nu",
      "vad": "Nämdö kyrka invigdes hösten 1876; Stilen är nygotisk som framförallt uttrycks genom den höga takresningen, tornet samt de spetsbågade fönstren; utförd med trästomme, granitsockel samt svartmålat plåttak",
      "last": "2026-09-30",
      "myndighet": true
    },
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
      "vad": "ön ligger i \"södra skärgårdens urkalkstensbälte\", vilket ger en flora rik på ormbunkar och orkidéer; kalkbergen vid Östanvik och skogarna på Nämdö Böte och Skabban är botaniskt värdefulla och hyser signalarter och rödlistade arter (2026-09-14)",
      "last": "2026-11-17",
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
      "url": "https://www.varmdo.se/byggabomiljo/skargardnaturochparker/namdoskargardensnationalpark.4.18c983316e0536cb189c3ba.html",
      "org": "varmdo.se",
      "vad": "Den 17 juni 2025 röstade riksdagen i frågan, kort därefter beslutade regeringen att Nämdöskärgården blir Sveriges 31:a nationalpark; Nationalparksområdet ligger öster om ön Nämdö; Nationalparken omfattar det som tidigare var Bullerö och Långviksskärs naturreservat samt ett stort område hav utanför",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://battaxi.se/nämdölinjen/",
      "org": "battaxi.se",
      "vad": "Till skillnad från traditionella turer är både Nämdölinjen och Runmarölinjen unika då vi även lägger till vid privata bryggor.; Samtliga avgångar måste förbokas!",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/namdo",
      "org": "explorearchipelago.com",
      "vad": "Nämdö, Boskapsön / Naturhamn; Nämdö Macken / Bensinmack",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/namdo/skargardsstiftelsens-bastu-pa-namdo",
      "org": "explorearchipelago.com",
      "vad": "Skärgårdsstiftelsens bastu öppen för allmänheten. Avgift betalas med Swish.; Bastun är öppen från 30 april till och med 31 oktober.",
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
      "url": "https://skargardsstiftelsen.se/omraden/namdo/",
      "org": "Skärgårdsstiftelsen",
      "vad": "I Solvik finns livsmedelsbutik, café och service. Här finns också boendealternativ, bland annat glamping och restaurangverksamhet under sommarsäsongen.; På Nämdö hittar du gårdsbutik, kafé, turistinformation, gästbrygga och tältplatser. . visitskargarden.se (tidigare källa) svarade inte. Solviks egen domän namdosolvik.se visar i dag orelaterat innehåll, så inget företagsnamn anges.",
      "last": "2026-11-17",
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
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/namdo",
      "org": "Waxholmsbolaget",
      "vad": "Nämdö är en av skärgårdens större öar. Ön är promenadvänlig året om; den är både bilfri och till viss del ett naturreservat; Waxholmsbolagets fartyg lägger till vid flera bryggor på ön",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h17.pdf",
      "org": "Waxholmsbolaget",
      "vad": "Waxholmsbolaget linje 17, \"GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026\": Stavsnäs … → Nämdöböte …, Östanvik …, Solvik …, Bunkvik …; lördag Stavsnäs … → Nämdöböte …, Östanvik …, Solvik …, Bunkvik … = ca 25–60 min beroende på brygga . — \"tabell 17\"",
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
      "vad": "Handlarn, Solvik: \"Livsmedelsaffär, bensinstation\"; \"Läkarbåten besöker Nämdö skärgård minst en gång i månaden, men måste bokas i förväg på Djurö Vårdcentral.\"; grovsopfärjan \"kommer till Nämdö skärgård i juni, juli och augusti\"; \"Vid Nämdö hembygdsdgård, Sand brygga och i Solvik finns behållare där vi samlar in pet-flaskor och burkar.\" . Stod «en gång i månaden» – sidan säger minst en gång.",
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
      "vad": "ligger cirka 2 distansminuter ost om södra Ljusterö, strax söder om Ingmarsö, Svartsö är 8 km lång och 1,5 km bred, Svartsö tillhör Värmdö kommun",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/hitta-hit/",
      "org": "svartsokrog.se",
      "vad": "Det går också att åka SL-buss från Slussen. Då stiger du av vid Boda brygga eller Lillsved på Värmdö. Därifrån tar du Waxholmsbåten sista biten till Svartsö och Alsviks brygga.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://svartsokrog.se/",
      "org": "svartsokrog.se",
      "vad": "Förändringarna i menyn sker ständigt, Välj mellan 4-rättersmenyerna eller från à la carte-menyn., tel. 08-54247255 . Öppettider och priser borttagna: öppettidssidan listar bara enskilda datum i september–oktober och menyn saknar datum.",
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
      "url": "http://svartsokrog.se/oppettider/",
      "org": "svartsokrog.se",
      "vad": "Pizzasöndag …, Lammlördag 5-rätters meny; öppetdagarna 2026 är fredag–söndag i september och lördag–söndag i oktober",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/om-svartso",
      "org": "Svartsö Lanthandel",
      "vad": "Idag bor omkring 65 personer permanent på Svartsö, och här finns bl.a. förskola, skola, lanthandel, krog , Bistro och hotell&vandrarhem.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/",
      "org": "Svartsö Lanthandel",
      "vad": "Svartsö Lanthandel är en välsorterad butik med fräscha grönsaker och butiksbageri., Butiken är ombud för PostNord, DHL, Schenker och UPS. Systembolaget och Apoteket. . Öppettider och Helår borttagna (inga handskrivna öppettider).",
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
      "url": "https://svartsolanthandel.se/cykeluthyrning",
      "org": "Svartsö Lanthandel",
      "vad": "Vid Ahlsviks brygga väntar Svartsö Lanthandel med cykel och karta över ön. Cykla sedan längs öns 14 km långa, vackra grusvägar genom en levande skärgårdsbygd med öppna ängar och hagar, betande kor och får",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svartsolanthandel.se/sjobodarna",
      "org": "Svartsö Lanthandel",
      "vad": "Vi har fyra sjöbodar med enkel standard och sammanlagt åtta bäddar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://svartsolanthandel.se/gasthamn",
      "org": "Svartsö Lanthandel",
      "vad": "Hamnen drivs av oss i Svartsö Lanthandel, Hamnplats är gratis i, I hamnen finns ett servicehus innehållandes toalett & dusch, El:",
      "last": "2026-09-27",
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
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ, Alsvik (Svartsö); Strömkajen–Alsvik t.ex. mån–tor …, lör …, sön …, vardag …",
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
      "url": "https://runmarobatvarv.se/",
      "org": "runmarobatvarv.se",
      "vad": "gästbrygga med båtplatser, inga stugor",
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
      "vad": "Runmarö Lanthandel; Apoteksombud; Systembolagsombud; Paketombud; Hösttider (inlägg 31 augusti 2026); menyn Cyklar / Bike rentals",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.runmarolanthandel.se/oppettider/",
      "org": "runmarolanthandel.se",
      "vad": "Butiken är öppen för självscanning",
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
      "url": "https://runmaro.se/handla",
      "org": "Runmarö",
      "vad": "Tempo Runmarö, Apoteksombud, Systemombud",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://runmaro.se/matologi",
      "org": "Runmarö",
      "vad": "under Krog & restaurang listas bara \"Svängen Runmarö AB\"",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://runmaro.se/om",
      "org": "Runmarö",
      "vad": "buss 433 eller 434 från Slussen. Bussresan till Stavsnäs tar ca 50 minuter",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/sv/section/etapp-runmaro/",
      "org": "Stockholm Archipelago Trail",
      "vad": "Du åker till Runmarö flera gånger om dagen från Stavsnäs eller Sandhamn, året om.; Runmarö har ca 300 bofasta som bor året om, på sommaren är det ungefär 3 – 4000 personer som håller till på ön. ; Värmdö kommun anger cirka 250 bofasta (se description)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "Stockholm Archipelago Trail",
      "vad": "Section Runmarö, Moderate 16.6 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/section-runmaro/",
      "org": "Stockholm Archipelago Trail",
      "vad": "Moderate 16.6 km, a 16,6 km stretch of archipelago magic",
      "last": "2026-09-27",
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
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget linje 16",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; Stavsnäs … → Styrsvik (Runmarö) …, alltså ca 5 minuter . Tidigare länk (v16.pdf) finns inte längre.",
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
      "last": "2026-10-19",
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
      "vad": "Skärgårdens Outdoor – Kayak Center; Resarövägen 10, Resarö, Stockholms län; Följ med på våra guidade kajakturer året runt, eller besök oss under sommaren för att hyra kajak, kanot och SUP.; Uthyrning öppet maj-september; Vår vedeldade bastu vid vattnet på Resarö, nära Vaxholm i Stockholms skärgård, är tillgänglig för privata bokningar året runt.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h680.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stockholm–Resarö, Tekniska högskolan, Överby, Giltig 17 augusti–12 december 2026; måndag–fredag Tekniska högskolan … → Överby … (53 min), Överby … → Tekniska högskolan … (49 min); Lördag, söndag oh helgdag, Ingen trafik",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h682.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "682 Engarn–Resarö, Resarö–Engarn (–Vaxholm), Giltig 17 augusti–12 december 2026, Lördag, söndag och helgdag; Engarn …, Ytterby …, Överby …; Engarn …, Överby …",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v682.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 14 december 2025–18 juni 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h5.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG, Ytterby (Resarö), Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast ….",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ytterbygruva.se/eget-besok/",
      "org": "ytterbygruva.se",
      "vad": "Under hösten 2025 installerade vi i samarbete med Stiftelsen för Strategisk Forskning ett antal skyltar i och kring dagbrottet med information om gruvans historia. Du kan därför med fördel vandra här på egen hand.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://ytterbygruva.se/hitta-hit/",
      "org": "ytterbygruva.se",
      "vad": "Med SL-buss till hpl Ytterby (3). Gå sedan drygt 1km längs med Ytterbyvägen (ca 15min)., Med Waxholmsbåt till Ytterby brygga (2), gå sedan 200m till Ytterbyvägen 65.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://ytterbygruva.se/",
      "org": "ytterbygruva.se",
      "vad": "Lördag 5 september …, Observera att visningar kan bli fullbokade och att visningarna inte inkluderar underjordsanläggningen.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "husaro": [
    {
      "url": "https://api.scb.se/OV0104/v1/doris/sv/ssd/MI/MI0812/MI0812A/OarEjBro01",
      "org": "api.scb.se",
      "vad": "0117Q104 Husarö; 2020; 27; 409; 146",
      "last": "2026-11-02",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Husar%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Husarö brygga 1, Österåker | Ljusterö ; adresspunkten SWEREF 99 TM 6602244,5, 717555,56.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Djupfladen",
      "org": "minkarta.lantmateriet.se",
      "vad": "Djupfladen, Österåker | Vattendelsområde ; uppmätt 2026-11-17: ortnamnspunkten Djupfladen (SWEREF 99 TM 6599410, 715578) ligger 3,45 km fågelvägen från adresspunkten Husarö brygga 1, i riktning 218 grader (sydväst); omräknat till WGS 84, haversine.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.osteraker.se/upplevagora/sevardheter/oariosterakersskargard.html",
      "org": "osteraker.se",
      "vad": "Sista lördagen i juli varje år firas Husarödagen med bland annat Husarömaran, skärgårdsmarknad och visning av lotsmuseet i Sundströmska Lotsgården., Husarömaran är ett återkommande motionslopp där deltagarna springer runt ön.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.osteraker.se/download/18.5f4ce35f18ecbde71802569/1715001988339/Bilaga%202.%20L%C3%A4nsstyrelsens%20underlag,%20daterad%20220124.pdf",
      "org": "osteraker.se",
      "vad": "Följande riksintressen har tagits bort: Husarö-Ingmarsö-Svartsö . Länsstyrelsen i Stockholms läns underlag till Österåkers kommun 2022-01-24; hela namnet är Husarö-Ingmarsö-Svartsö-Gällna-Hjälmö.",
      "last": "2026-11-02",
      "myndighet": true
    },
    {
      "url": "https://finnhamn.se/hamnar/",
      "org": "finnhamn.se",
      "vad": "Paradisviken (Djupfladen i sjökortet), den stora gästhamnen, här har du tillgång till vatten, el och gratis WiFi",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/om-husaro/",
      "org": "husaro.se",
      "vad": "Kulturlandskap med ängar och lövträd, som skiftar under vandringen till vacker tallskog och släta klippor., Västra delen av ön är i stort sett obebyggd, medan den östra delen är mer bebyggd., Husarö, som ligger i Österåkers kommun, är ungefär 2,5 km lång., Till fots kan man gå på upptäcktsfärd på ön.",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/lankar/",
      "org": "husaro.se",
      "vad": "Husarös egna lanthandel som drivs av Henkan och Kattis. Under sommarperioden serveras även lättare maträtter och du kan njuta av en öl eller ett glas vin.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/att-se-och-gora/",
      "org": "husaro.se",
      "vad": "På Husarö kan du bl.a vandra, bada, fiska., simskola, seglarskola och simtävlingen",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://www.husaro.se/",
      "org": "husaro.se",
      "vad": "Hyr stuga.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://husarohandel.se/husar-handel---om-oss",
      "org": "husarohandel.se",
      "vad": "I gästhamnen på Husarö finns båtplatser längs med en betongbrygga eller vid enstaka Y-bommar., I anslutning till land finns ett trädäck där du kan äta din egna middag., Under högsommaren har vi mycket ekologiska matvaror och andra förnödenheter., Vi har mycket begränsat utrymme men vi kan hämta mer eller andra varor från vårt andra ställe på Ljusterö, vid Klintsundet., Det är en ekologisk lanthandel, sjöstation och gästhamn som kallas, Klintan",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "http://husarohandel.se/",
      "org": "husarohandel.se",
      "vad": "Gästhamnen är en lång pontonbrygga med Y-bommar och mooringlinor och bojar., rekommenderas inte för segelbåtar, vi gör dagliga tillsyner för att se till att allt är i sin ordning, Då vi inte är på plats har vi av säkerhetsskäl stängt av elen, Det finns nya toaletter i kommunens regi och kan nyttjas genom, i betalning via SMS, Tyvärr finns inget färskvatten., Det finns däremot på vår andra mack vid Klintsundet som ligger tvärs över Gälnan., Ca 300 m från gästhamnen finns Husarö Lanthandel som har övriga livsmedel, fika och enklare förtäring., Macken är stängd då vi väntar på tillstånd., Boka gästhamnsplats via Dockspot, Avgift är beroende av säsong",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/husaro/",
      "org": "stockholmslansmuseum.se",
      "vad": "I den så kallade kung Valdemars jordebok från 1200-talet, den äldsta seglingsbeskrivningen genom skärgården, finns Husarö med under namnet Husarn., Mellan 1740 och 1912 var Husarö officiell lotsplats och under segelsjöfartens storhetstid vid slutet av 1800-talet arbetade ett 20-tal lotsar på Husarö.",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h12.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA, Går under perioden 2 april - 18 juni. . Tabellhuvudet är inte sökbar text i PDF:en; avläst i sidbilden gäller tabellen 2 april–18 juni och 17 augusti–12 december 2026. Restid Strömkajen–Husarö uppmätt tur för tur: söndag 2 tim 20 min (tur 1273, anmärkning I, bara 2 april–18 juni), lördag 2 tim 50 min (tur 1263, anmärkning T) och 3 tim (tur 1253, I); utan periodanmärkning söndag förmiddag 3 tim 5 min (tur 1271), fredag kväll 3 tim 5 min (tur 1227), lördag förmiddag 3 tim 15 min (tur 1251), måndag–torsdag förmiddag 3 tim 55 min (tur 1301) och onsdag 5 tim (tur 1201, gods ombord). 2 november–12 december alltså 3 tim 5 min–5 tim.",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, Går under perioden 17 augusti - 13 september., Går under perioden 17 augusti - 1 november., Gods ombord, förseningar på upp till 30 minuter kan förekomma. . Anmärkning T gäller 17 augusti–13 september och S 17 augusti–1 november. Via Boda uppmätt: måndag–torsdag förmiddag 3 tim 55 min (tur 1341), lördag eftermiddag 3 tim 40 min (tur 1353), måndag och tisdag eftermiddag 4 tim 5 min (tur 1303); söndag 2 tim 30 min med byte i Vaxholm (tur 1373 och 1283, anmärkning S).",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, Beställ resan i SL-appen, på . Åsättra–Husarö uppmätt tur för tur: 35–60 min, 16 av 19 turer 45–55 min; de kortaste (C-turerna 1001 och 1021) och den längsta (B-turen 1011) går bara efter beställning.",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/w10.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027, Husarö, minst 1 timme innan avgång, minst 2 timmar innan, från aktuell brygga, dock senast …., senast … dag före",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/w13.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027, Husarö, minst 1 timme innan avgång, senast … dag före",
      "last": "2026-11-28",
      "myndighet": false
    }
  ],
  "fejan": [
    {
      "url": "http://www.bfsf.se/files/Fejan.pdf",
      "org": "bfsf.se",
      "vad": "1894 års koleraepedemin var inte den första, Det var knappt 200 fartyg med närmare 5 000 passagerare som gjorde ett, för många oönskat, uppehåll . Stod «yttersta bebodda», «bofast historia sedan 1856», sjukhuset «Wasa» i drift till 1930-talet – ingen tillåten källa, struket.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejan.com/",
      "org": "fejan.com",
      "vad": "Vi är en cash-free restaurang, Nu har vi stängt för sommaren",
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
      "vad": "Här ligger ni på mooringlinor förutom på den östra bryggan, vilken framförallt är avsedd för >55 fot . «Från Furusund 30–60 min» och «Furusundsleden» saknade källa – strukna.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejanoutdoor.se/",
      "org": "fejanoutdoor.se",
      "vad": "Hos oss kan du hyra stabila singel- och dubbelkajaker, Utrustning, paddelteknik och tips på rutter ingår",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://fejanoutdoor.se/om-fejan-outdoor/oppettider/",
      "org": "fejanoutdoor.se",
      "vad": "Öppettider burgarbaren, 25 juni – 16 augusti",
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
      "vad": "När koleran svepte över Europa 1892 uppfördes i en hast en karantänstation på ön Fejan. Ett monteringsfärdigt trähus som skulle skeppas till Kongo som missionsstation exproprierades vid utskeppningskajen och sattes upp som doktorsvilla på Fejan . «Därav namnet Kongohuset» står inte i källan – struket.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "31A RÄFSNÄS – TJOCKÖ – FEJAN, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast … . Räknat: må–fr 5–6 turer Räfsnäs → Fejan (tur 3103 … bara t.o.m. 13 sep), lör 2, sön 2; restid 25–65 min.",
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
      "vad": "Vill du upptäcka ön, ta en promenad på någon av våra uppmärkta stigar. Ta ett dopp från klipporna på öns ostsida, och låt ögonen vila mot den fria horisonten från någon av utsiktsplatserna där.",
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
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/rodloga",
      "org": "Waxholmsbolaget",
      "vad": "Under våren, sommaren och hösten kan du åka ut till Rödlöga från Strömkajen utan byten., Resan tar fyra timmar., Under vintern och början av våren behöver du åka från Köpmanholm på Yxlan för att ta dig till Rödlöga.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA, Strömkajen (Stockholm), Norrsund (Blidö), Svartlöga, Rödlöga",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026; 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA — måndag–torsdag tur 2601 Strömkajen …, Rödlöga …; tur 2602 Rödlöga …, Strömkajen …",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026, 28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA, Furusund, Rödlöga; restiden Furusund till Rödlöga, 2 h 15 min, är uppmätt i 28A",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.linjetidtabeller.se/",
      "org": "waxholmsbolaget.linjetidtabeller.se",
      "vad": "Beställ tryckta tidtabeller, Furusund - Östernäs - Söderöra - Bromskär / Rödlöga, Furusund - Högmarsö - Solö; listan har ingen tabell för linje 24 eller 26",
      "last": "2026-11-17",
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
      "vad": "Den 16 nov 1955 … klipptes bandet; blev klara 1955 — sidan anger också att broarna gick från Väddö-Byholma över Kolskär, Fogdö och Riddarskär till Singö och att telefon kom 1905 och elektricitet 1945",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Norrtälje–Singö; Svanberga affär; Älmsta busstation; Grisslehamns skola; Grisslehamns kapell; Grisslehamns färjeläge; Grisslehamns centrum; Byholma södra; Fogdö södra; Fogdö by vägskäl; Fogdö brygga vägskäl; Blåsargårdsvägen; Fogdö norra; Singöbron södra; Singö camping; Tranviks vägskäl; Backby; Digrudan; Hörnängen; Singö kyrka; Singö prästgård; Singö bussgarage; Norrvreta vägskäl; Åmyran; Boda; Nyvärna; Råsvärna; Dalviken; Ellans kiosk; ELLANS VÄNDPLAN; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Norrtälje busstation till Singö kyrka 65 till 77 min och till Ellans vändplan 77 till 90 min, Grisslehamns färjeläge till Singö kyrka 12 till 15 min; 7 turer måndag till fredag och 5 lördag till söndag når Singö. Broåret 1955: singo-fogdo.se (se description).",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stockholm–Norrtälje; Tekniska högskolan; Norrtälje busstation; Giltig 17 augusti–12 december 2026",
      "last": "2026-11-17",
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
      "vad": "Storlek: 1212 hektar varav land 322 hektar, huvudsakligen bevuxna av barrskog, Inslag av ädellövskog finns, ett odlingslandskap med åker- och betesmarker",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://lidovardshus.com/gsthamnen",
      "org": "lidovardshus.com",
      "vad": "Gästhamnen hittar ni på öns sydvästra sida, i Båthusviken, Här finns ett 50-tal båtplatser för stävförtöjning med ankare, Djupet ligger mellan 1,7–2,7 meter, I vår hamn kan man inte boka platser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/olle-hugo",
      "org": "lidovardshus.com",
      "vad": "Olle Tejle & Hugo Olofsson heter vi som driver Lidö Värdshus sedan 2011",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/boende-1",
      "org": "lidovardshus.com",
      "vad": "Frukostbuffé ingår i allt vårt boende, Boende går att boka från midsommar till mitten av augusti, I våra stugor har man möjlighet att ha med sig husdjur mot en avgift",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/",
      "org": "lidovardshus.com",
      "vad": "Vi har nu öppet för grupper, konferenser, fester och bröllop, Boende & restaurang öppnar åter till midsommar 2027 den 25 juni",
      "last": "2026-09-27",
      "myndighet": false
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
      "vad": "Består av boende i tre byggnader och ligger närmast värdshuset, Här finns 16 rum med totalt 34 sängplatser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/stugorna",
      "org": "lidovardshus.com",
      "vad": "ligger fyra stugor med separat duschstuga, Alla stugorna har sjöutsikt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/glamping",
      "org": "lidovardshus.com",
      "vad": "Glamping tält",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/restaurangen",
      "org": "lidovardshus.com",
      "vad": "Restaurangen har öppet sommartid mellan midsommar till mitten av augusti, Andra tider på året har vi öppet mot förfrågan för grupper",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://lidovardshus.com/oasen",
      "org": "lidovardshus.com",
      "vad": "Vår framficka Oasen, som ni hittar vid gästhamnen, äta nygräddad pizza från vår egen pizzaugn, Här hittar ni även glass, På Oasen löser ni även hamnavgiften, hittar dusch/toalett samt kan hyra kajak och SUP, Här tar vi ingen bordsbokning utan drop in som gäller",
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
      "url": "https://skargardsstiftelsen.se/omraden/lido/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Gästhamnen i Båthusviken erbjuder service för båtburna besökare medan Österhamn är ett populärt val för den som söker en naturnära hamn, Runt ön finns flera fina badplatser med både klippbad och mindre sandstränder, På Lidö gård driver Magnus Atte med familj ett skärgårdsjordbruk",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h631.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Norrtälje busstation …, Räfsnäs brygga … — vardagar 36–53 min Norrtälje busstation–Räfsnäs brygga",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Lidö, Moderate 11.9 km.",
      "last": "2026-09-30",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/v31.pdf",
      "org": "Waxholmsbolaget",
      "vad": "31A RÄFSNÄS – TJOCKÖ – FEJAN, gäller 2 april–18 juni och 17 augusti–12 december 2026; turer som angör Lidö: Räfsnäs … → Lidö … (10 min), … (10 min), … (15 min), … (15 min); turen … angör inte Lidö (… är Fejan); ingen bilfärja till ön",
      "last": "2026-09-19",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s40.pdf",
      "org": "Waxholmsbolaget",
      "vad": "GÄLLER 22 JUNI 2026 – 16 AUGUSTI 2026, 40A NORDSYDLINJEN: NORRTÄLJE / ARHOLMA – SANDHAMN – NYNÄSHAMN, Norrtälje hamn …, Lidö …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget",
      "vad": "31A RÄFSNÄS – TJOCKÖ – FEJAN, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, minst 1 timme innan avgång",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "graddo": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-norrtalje-kommun/graddo-bjorko-orn.html",
      "org": "havochvatten.se",
      "vad": "Gräddö, Björkö Örn är ett EU-bad.; I anslutning till Björkö-örn camping; Kommunen registrerar badplatser som EU-bad om det finns ett stort antal badande. Med ett stort antal badande avses ungefär 200 personer i genomsnitt per dag.; Vid EU-bad görs provtagningar för bakterier minst 3-4 gånger under badsäsongen.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/bjorkooren/",
      "org": "norrtalje.se",
      "vad": "Badplatsen ligger vid Norrtäljeviken södra strand, väster om Gräddö, Beachvolleyplan: Ja, Brygga: Nej, Kiosk/kafé: Ja, Hund tillåtet: Nej, inte mellan 15 maj och 15 september",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.norrtalje.se/info/kultur-och-fritid/bad/badplatser/",
      "org": "norrtalje.se",
      "vad": "Badplatserna sköts om och underhålls under sommarsäsongen, 15 maj; 15 september.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://caravanclub.se/camping/bjorko-orn/",
      "org": "caravanclub.se",
      "vad": "Allmän Camping - Året runt, husvagns- och husbilstomter med el, 9 stugor och tomter för tält, ca 7,5 km från färjeterminalen i Kapellskär . «En av få platser i norra skärgården» och «båtarna … inom promenadavstånd» saknade källa.",
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
      "vad": "Gräddös Pärla – Bar & Restaurang, I Gräddö utanför Norrtälje ligger Gräddös pärla … bar & restaurang naturnära med närheten till havet och Kapellskär ; Caravan Club Björkö Örn: restaurang med fulla rättigheter som har öppet året om men endast på helger under vintersäsongen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kajak-uteliv.com/",
      "org": "Kajak & Uteliv",
      "vad": "Vi utgår från våra två kajakbaser i Stockholms norra skärgård, Gräddö och Furusund, På vår kajakbas på Gräddö har vi en välsorterad kajakbutik",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kajak-uteliv.com/hyra-kajak/",
      "org": "Kajak & Uteliv",
      "vad": "Vi hyr ut havskajaker i olika storlekar, Stand Up paddlebrädor och kanadensare, här har vi verksamhet året runt för bokade uthyrningar och guidade turer och kurser",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.kajak-uteliv.com/kajakbasen-graddo/",
      "org": "Kajak & Uteliv",
      "vad": "Bokning är nödvändig minst 24 timmar innan avfärd. .  — kanoter och stand up paddle-boards för uthyrning . Tidigare källa visitskargarden.se ersatt med företagets egen sida.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h631.pdf",
      "org": "SL",
      "vad": "Norrtälje–Rådmansö–Norrtälje; Campus Roslagen; Södersviks affär; Spillersboda brygga; 3) Trafikeras endast av turer via Spillersboda brygga.; Åkerö affär; Infjärden; Nabbo; Björkö örn; Gräddö torg; Nyängsvägen; Gräddö gamla skola; Fagervik; Räfsnäs norra; Räfsnäs vägskäl; Räfsnäs brygga; Räfsnäs garage; Räfsnäs södra; Räfsnäs såg; Kapellskär; Giltig 17 augusti–12 december 2026",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL",
      "vad": "Stockholm–Norrtälje; Tekniska högskolan; Norrtälje busstation; Giltig 17 augusti–12 december 2026  Runda 11 (sr03-k013): buss 676 belagd med tabellen som gäller i dag (h676.pdf gällde 2022).",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h31.pdf",
      "org": "Waxholmsbolaget linje 31",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 31A RÄFSNÄS – TJOCKÖ – FEJAN, Tjockö ångbåtsbrygga, minst 1 timme innan avgång från aktuell brygga, dock senast … . Räknat Räfsnäs → Fejan: …, lör/sön …, lör …, sön … = 25–65 min. «Hela vägen till Fejan på under timmen» stämde inte för helgmorgnarnas turer (65 min). «Räfsnäs, strax intill» saknade källa – Räfsnäs brygga ligger sex hållplatser efter Gräddö torg på buss 631.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "vaddo": [
    {
      "url": "https://www.norrtalje.se/globalassets/dokument/dokument-kultur--fritid/dokument-kultur/dokument-riksintressen-i-norrtalje-kommun/vaddo-kanal.pdf",
      "org": "norrtalje.se",
      "vad": "Arbetet med att anlägga nuvarande Väddö kanal påbörjades år 1819, Under perioden 1820-1831 arbetade 2930 man från Hälsinge, Upplands, Värmlands och Västmanlands regementen med grävandet av Väddö kanal, Kanalen öppnades för trafik 1835, och 1840 invigdes den officiellt av Karl XIV Johan, omkring 22 000 passerande båtar per år, I anslutning till Älmstabron ligger tätorten Älmsta (eller Elmsta) som är Väddös största samhälle. Den större delen av Älmsta ligger på fastlandet . «Slussen vid Älmsta» saknar källa – kanalen beskrivs utan sluss av både kommunen och Destination Roslagen.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.grisslehamnsmarina.se/",
      "org": "grisslehamnsmarina.se",
      "vad": "Gästplatser med el & service, Förtöjning vid brygga eller boj, Servicehus & bastu, Tvätt, vatten & WiFi, Sjömack med diesel & bensin – öppet dygnet runt med kortbetalning",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.herrang.com/about/about-hdc",
      "org": "herrang.com",
      "vad": "HDC first saw the light of day in the summer of 1982, Each summer dancers and jazz lovers from over 70 countries gather here",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.herrang.com/your-visit/travel",
      "org": "herrang.com",
      "vad": "Folketshusvägen 5, 763 71 Herräng, Norrtälje kommun . «Herräng på östra Väddö» och «världens mest kända centrum» saknade källa.",
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h676676x.pdf",
      "org": "SL",
      "vad": "676 Stockholm–Norrtälje, Giltig 17 augusti–12 december 2026 (t.ex. Tekniska högskolan … → Norrtälje busstation …); SL 637, — 637 Norrtälje–Singö, Giltig 17 augusti–12 december 2026 (Norrtälje busstation … → Älmsta busstation …)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h637.pdf",
      "org": "SL",
      "vad": "Norrtälje–Singö; Norrtälje busstation; Älmsta busstation; Väddö folkhögskola; Väddö kyrka; Grisslehamns färjeläge; Grisslehamns centrum; b Trafikeras natt mot lördag.; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Norrtälje busstation till Älmsta busstation 33 till 43 min måndag till fredag och 35 min lördag, söndag och helgdag, till Grisslehamns färjeläge 53 till 66 min; måndag till fredag 22 turer till Älmsta (varav en natt mot lördag), lördag, söndag och helgdag 13.",
      "last": "2026-11-25",
      "myndighet": false
    }
  ],
  "graso": [
    {
      "url": "https://www.lansstyrelsen.se/uppsala/besoksmal/naturreservat/graso-gard.html",
      "org": "Länsstyrelsen Uppsala län",
      "vad": "föreskrift 4 \"Medföra hund som inte är kopplad\"; 5 \"Göra upp eld annat än på särskilt anvisade platser\"; 6 \"Tälta eller förtöja båt utanför anvisade platser mer än ett dygn i följd\"",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/uppsala/besoksmal/naturreservat/graso-ostra-skargard.html",
      "org": "Länsstyrelsen Uppsala län",
      "vad": "medföra ej kopplad hund under tiden 1 mars - 20 augusti; ett flertal djurskyddsområden med landstigningsförbud",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Gr%C3%A4s%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Gräsö\" → Gräsö | Östhammar | Trakt, SWEREF 99 TM 694391/6694384 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.scb.se/contentassets/7edbcfbb3a87470387d8c95868ecaf04/mi0812_2020a01_sm_mi50sm2301.pdf",
      "org": "scb.se",
      "vad": "Bottenhavets största ö är Gräsö.; tabell 5.1 Gräsö Östhammar 705 636 -69; vid utgången av 2020",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/grasoleden/",
      "org": "Trafikverket",
      "vad": "Gräsöleden går mellan Öregrund och Gräsö; Färjeledens längd är 1000 meter och överfartstiden är fem minuter. Resan med vägfärjan är avgiftsfri.; Vecka 25–33 Två färjor trafikerar leden alla dagar; Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://grasobadenscamping.se/",
      "org": "grasobadenscamping.se",
      "vad": "Vi har ca 400 platser för husvagn, husbil eller tält; Vi har stängt för säsongen och öppnar åter i slutet av april -27.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.orskarsfyr.se/hitta-hit.html",
      "org": "orskarsfyr.se",
      "vad": "På Gräsö kör du mot Örskärssund, 22 km till vägs ände.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.osthammar.se/sv/roslagen/oregrund/badplatser-i-oregrund/",
      "org": "osthammar.se",
      "vad": "Kattskär ingår i Gräsö gårds naturreservat; Här finns en eldstad med vedförråd … Det är inte tillåtet att elda på andra platser i reservatet.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ul.se/globalassets/tidtabeller/nya/Regionbuss/260817_261212/Regionbuss_811_260817_261212.pdf",
      "org": "ul.se",
      "vad": "811 Uppsala - Alunda - Gimo - Östhammar - Öregrund; 17 augusti - 12 december 2026; ändhållplats Öregrund färjeläget",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ul.se/globalassets/tidtabeller/nya/Regionbuss/260817_261212/Regionbuss_854_260817_261212.pdf",
      "org": "ul.se",
      "vad": "854 Öregrund - Norra Gräsö; Helgfri måndag - fredag; A Turen körs endast skoldagar; U … Turen måste förbeställas på tel. 018-617 57 02 senast 3 tim. före avresa",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.upplandsstiftelsen.se/orskar/",
      "org": "upplandsstiftelsen.se",
      "vad": "Örskär ligger norr om Gräsö och nås med båt från Örskärssund.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "orskar": [
    {
      "url": "https://www.lansstyrelsen.se/uppsala/besoksmal/naturreservat/orskar.html",
      "org": "Länsstyrelsen Uppsala län",
      "vad": "föreskrift 5 \"Utan markägares tillstånd tälta mer än två dygn\"; 6 \"förtöja eller förankra båt vid samma strand för längre tid än två dygn\"",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%96rsk%C3%A4r",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Örskär\" → Örskär | Östhammar | Natur- och terrängnamn, SWEREF 99 TM 686419/6714367 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://sjofartsverket.se/sv/om-oss/fyrar-och-kulturfastigheter/visningsfyrar/orskar/",
      "org": "sjofartsverket.se",
      "vad": "den nuvarande fyren som tändes 1740 … Den är 36,5 meter hög och ritades av den kände arkitekten Carl Hårleman. Fyren är unik eftersom den helt saknar trappor; Fyren automatiserades 1978 och avbemannades året därpå.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.orskarsfyr.se/dagsturer/",
      "org": "orskarsfyr.se",
      "vad": "DAGSTURERNA har slutat gå för denna säsong! Välkomna åter till Maj 2027",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.orskarsfyr.se/l-genheter-stugor/",
      "org": "orskarsfyr.se",
      "vad": "På fyrplatsen finns fyra boenden att hyra under perioden 6/5-26/9; fasta vistelser på två till sju dagar",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.orskarsfyr.se/hitta-hit.html",
      "org": "orskarsfyr.se",
      "vad": "På Gräsö kör du mot Örskärssund, 22 km till vägs ände.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.orskarsfyr.se/restaurang-och-kiosk.html",
      "org": "orskarsfyr.se",
      "vad": "Restaurangen ligger i den gamla fyrmästarbostaden; STÄNGT för säsongen. Öppnar igen i maj 2027.; För att äta oss hos måste man alltid boka.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ul.se/globalassets/tidtabeller/nya/Regionbuss/260817_261212/Regionbuss_854_260817_261212.pdf",
      "org": "ul.se",
      "vad": "Helgfri måndag - fredag",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.upplandsstiftelsen.se/orskar/",
      "org": "upplandsstiftelsen.se",
      "vad": "du kan åka med någon av de fasta båtturer som körs av Örskärs fyr … I andra hand går det att boka båttransport med Tommy Mattson som kör turer i mån av tid",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.upplandsstiftelsen.se/orskar-english/",
      "org": "upplandsstiftelsen.se",
      "vad": "Nature and Culture Trail, 2.5 km; All destinations: … about 8 km; The trails are marked with blue and yellow ribbons around the trees.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "amto": [
    {
      "url": "https://www.lansstyrelsen.se/ostergotland/besoksmal/naturreservat/amto-naturreservat.html",
      "org": "Länsstyrelsen Östergötland",
      "vad": "sammanlagt finns över 9 kilometer välskyltad vandringsled i reservatet; flera grillplatser och rastbord och gott om naturliga badmöjligheter",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%84mt%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Ämtö\" → Ämtö | Valdemarsvik | Trakt, SWEREF 99 TM 610063/6458464 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.ostgotatrafiken.se/download/18.7cd05f241a1632e36852546/1793351407739/linje776-011126-130627b.pdf",
      "org": "ostgotatrafiken.se",
      "vad": "Från Getterö mot Ämtö; Gäller från 1 november 2026 till 13 juni 2027.; Avgångar lördag: Inga avgångar.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ostgotatrafiken.se/res-med-oss/bestallningstrafik/skargardstrafik/resa-med-skargardstrafik",
      "org": "ostgotatrafiken.se",
      "vad": "Beställ senast … dagen innan; Skärgårdstrafiken är öppen för alla, men i första hand för dig som bor på öarna.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "harstena": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Harstena",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Harstena\" → Harstena | Valdemarsvik | Trakt, SWEREF 99 TM 617759/6458610 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.ostgotatrafiken.se/download/18.7cd05f241a1632e36852546/1793351407739/linje776-011126-130627b.pdf",
      "org": "ostgotatrafiken.se",
      "vad": "Från Fyrudden mot Harstena; Gäller från 1 november 2026 till 13 juni 2027.; Avgångar lördag: Inga avgångar.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ostgotatrafiken.se/res-med-oss/bestallningstrafik/skargardstrafik/resa-med-skargardstrafik",
      "org": "ostgotatrafiken.se",
      "vad": "Beställ senast … dagen innan; Skärgårdstrafiken är öppen för alla, men i första hand för dig som bor på öarna.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ostgotatrafiken.se/res-med-oss/bestallningstrafik/skargardstrafik/bryggor-som-baten-gar-till",
      "org": "ostgotatrafiken.se",
      "vad": "Harstena, postbryggan (Turistbrygga) 3; Harstena södra 68; Harstena, Hundhålet 109",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.valdemarsvik.se/visit/se-gora/upplev-skargarden/harstena/",
      "org": "valdemarsvik.se",
      "vad": "Harstena består av en arkipelag med ett 70-tal öar. Huvudön är drygt 150 hektar stor.; Harstena ligger nästan 13 km (7 M) nordost om Fyrudden. (publicerad 2022-01-20 )",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "kopparholmarna": [
    {
      "url": "https://lansstyrelsen.se/download/18.6ae610001636c9c68e5981/1526553838599/F%C3%B6reskrifter%20om%20bildande%20av%20naturreservatet%20Kopparholmarna%20i%20Norrk%C3%B6pings%20kommun%202012.11.pdf",
      "org": "Länsstyrelsen",
      "vad": "C3 \"medföra okopplad hund eller annat lösgående husdjur\"; C6 \"göra upp eld annat än på anvisad plats\"; C2 \"tälta eller förtöja båt längre tid än två dygn i följd på samma plats\"",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kopparholmarnas%20naturreservat",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kopparholmarnas naturreservat\" → Norrköping | Naturvårdsområde, SWEREF 99 TM 613212/6482448 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.norrkoping.se/se-och-gora/friluftsomraden/naturreservat/kopparholmarna-naturreservat",
      "org": "norrkoping.se",
      "vad": "Ett drygt tiotal öar ingår i reservatet varav Kopparholmarna är de två största.; Från piren går sommartid turbåtar till Kopparholmarna.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://norrkoping.se/se-och-gora/fritid-och-aktiviteter/badplatser",
      "org": "norrkoping.se",
      "vad": "här tas inte badvattenprov då badplatsen är belägen på en ö vilket medför logistiska hinder",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "arkosund": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Ark%C3%B6sund",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Arkösund\" → Arkösund | Norrköping | Bebyggelse, SWEREF 99 TM 613239/6485251 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://norrkoping.se/se-och-gora/fritid-och-aktiviteter/badplatser",
      "org": "norrkoping.se",
      "vad": "Tillgång till toaletter i servicebyggnad 400 meter från badet. Affär och restaurang inom gångavstånd.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.norrkoping.se/nyheter/nyheter/2026-07-02-har-ar-badplatser-du-nar-med-buss-eller-cykel",
      "org": "norrkoping.se",
      "vad": "Badholmarna ligger strax utanför Arkösund och består av fyra små öar som förbinds med broar.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ostgotatrafiken.se/download/18.1ed171de1a12f87018c1b99/1792069972364/Linje781-170826-130627.pdf",
      "org": "ostgotatrafiken.se",
      "vad": "Från Arkösund mot Birkö via Aspöja; Gäller från 17 augusti 2026 till 13 juni 2027.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.ostgotatrafiken.se/res-med-oss/bestallningstrafik/skargardstrafik/resa-med-skargardstrafik",
      "org": "ostgotatrafiken.se",
      "vad": "Beställ senast … dagen innan",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "hartso": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/hartso.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "förtöja eller ankra upp båt mer än två dygn i följd vid samma plats, med följande undantag: Detta gäller inte dem som hyr övernattningsstugor inom reservatet och har sina båtar förankrade vid särskilt iordningsställd båtplats.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Harts%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hartsö\" → Hartsö | Nyköping | Trakt, SWEREF 99 TM 643882/6511396 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "ringso": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/ringso.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "På södra Ringsö finns sandstränder och möjlighet att bada från klippor.; Vid djupsundet ligger Österbodarna, gamla fiskebodar, som har restaurerats; Skyddsår: 1980 / Areal: 2044,5 hektar",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Rings%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Ringsö\" → Ringsö | Nyköping | Trakt, SWEREF 99 TM 641390/6512305 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "savo": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/savo.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "De före detta lotsbostäderna används idag som vandrarhem; Eftersom får och kor går fria på ön är det bäst att använda tältplatserna som ligger innanför staket.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=S%C3%A4v%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Sävö\" → Sävö | Nyköping | Trakt, SWEREF 99 TM 643223/6516933 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "stendorren": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/stendorren.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "Övernattning är förbjudet i området innanför den röda linjen på kartan, förutom i båt.; Nej, du får inte använda drönare i naturreservatet … Om du vill använda drönare behöver du söka dispens",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Stend%C3%B6rren",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Stendörren\" → Stendörren | Nyköping | Bebyggelse, SWEREF 99 TM 638935/6513976 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "kramo": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/kramo.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "Kommun: Trosa; Trosa kommun har bildat och förvaltar naturreservatet.; På ön Grytan finns flera jättegrytor från senaste istiden.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kr%C3%A5m%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kråmö\" → Kråmö | Trosa | Natur- och terrängnamn, SWEREF 99 TM 652647/6525074 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://kramoskargardsby.se/general-6",
      "org": "kramoskargardsby.se",
      "vad": "Skärgårdstrafik i Trosa 2026; 2026 trafikerar vi 11 juni till 2 augusti samt 6 - 9 augusti.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "fagelskar": [
    {
      "url": "https://www.lansstyrelsen.se/sodermanland/besoksmal/naturreservat/fagelskar.html",
      "org": "Länsstyrelsen Södermanland",
      "vad": "Fågelskär är en ö som ligger cirka tre kilometer utanför Oxelösund.; en populär tältplats. Här finns soptunnor och utedass.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=F%C3%A5gelsk%C3%A4r",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Fågelskär\" → Fågelskär | Oxelösund | Natur- och terrängnamn, SWEREF 99 TM 627149/6504161 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "rago": [
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/rago.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "Norra Rågöslingan (blå) 1 km och Södra Rågöslingan (röd) 3 kilometer; Tillgänglighetsanpassad toalett finns i anslutning till Rågö by och torrdass finns vid gästhamnen i Alviken och vid tältplatsen.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=R%C3%A5g%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Rågö\" → Rågö | Västervik | Natur- och terrängnamn, SWEREF 99 TM 603056/6415211 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.kalmarlanstrafik.se/globalassets/skargardstrafik/till_fran_granso_fr17aug2026-13juni-2027.pdf",
      "org": "kalmarlanstrafik.se",
      "vad": "Bokningsbar Skärgårdstrafik till/från Gränsö kanal (gäller 17 augusti 2026 - 13 juni 2027); hållplats Rågö; resa måste bokas måndag-fredag mellan … på 0490-91019 senast vardag före avresa",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "granso": [
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/granso.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "naturreservat på 328 hektar cirka 5 kilometer från Västerviks stadskärna",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Gr%C3%A4ns%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Gränsö\" → Gränsö | Västervik | Natur- och terrängnamn, SWEREF 99 TM 600919/6402880 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.vastervik.se/Bygga-bo-och-miljo/Naturvard-parker/Naturomraden-naturreservat/granso-naturreservat/",
      "org": "vastervik.se",
      "vad": "Halvön skiljer sig från fastlandet genom den 700 meter långa Gränsö kanal.; ett naturreservat på 328 hektar cirka 5 kilometer från Västerviks stadskärna",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "runno": [
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/runno.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "färdas eller uppehålla sig på Lång- och Lövgrund samt på Runnö Rödskär eller komma närmare stranden av dessa öar än 100 m; omfattas av tillträdesförbud under tiden 1 april-10 juli",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Runn%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Runnö\" → Runnö | Oskarshamn | Natur- och terrängnamn, SWEREF 99 TM 593261/6336501 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "furon": [
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/furon.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "Furön ligger utslängd i havet, 1 mil rakt österut från Oskarshamn.; Furön hade tidigare en lotsplats. Den var i bruk fram till 1965",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Fur%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Furö\" → Furö | Oskarshamn | Natur- och terrängnamn, SWEREF 99 TM 597723/6350008 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "misterhult": [
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/misterhults-skargard.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "Under tiden 1 april till 10 juli inom områden markerade med röd raster på bifogad beslutskarta ... uppehålla sig på eller färdas på närmare avstånd än 100 meter från öar och skär.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Misterhults%20sk%C3%A4rg%C3%A5rd",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Misterhults skärgård\" → Misterhults skärgårds naturreservat | Oskarshamn | Naturvårdsområde, SWEREF 99 TM 602350/6375385 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "limon": [
    {
      "url": "https://www.lansstyrelsen.se/gavleborg/besoksmal/naturreservat/limon.html",
      "org": "Länsstyrelsen",
      "vad": "Limön är en ö i Gävlebukten som på sin högsta punkt reser sig drygt 20 meter över Bottenhavet.; Areal: 205,3 hektar; Skyddsår: 2020; Limöns naturreservat förvaltas av Gävle kommun.; Skyddsområde: naturreservat, Natura 2000",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Lim%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Limön\" → Limön | Gävle | Natur- och terrängnamn, SWEREF 99 TM 628243/6733344 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.gavle.se/kultur-och-fritid/natur-och-friluftsliv/kusten-batar-och-oar/utflyktsmal-vid-gavlekusten/limon/",
      "org": "gavle.se",
      "vad": "Sjövägen, runt fyrar och genom farleder; Gävle Strand 5,5 Nm; Du lägger till din båt mot brygga. Hamnen är skyddad för alla vindar.; Djup 1,7 meter.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "agon": [
    {
      "url": "https://www.lansstyrelsen.se/gavleborg/besoksmal/naturreservat/agon-krakon.html",
      "org": "Länsstyrelsen",
      "vad": "Agön och Kråkön är två stora skärgårdsöar med gamla fiskelägen och ligger 2 landmil sydost om Hudiksvall.; kapellen i Agö och Kråkö hamn, byggda 1660 respektive 1736",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.8cd5a1b19362fb4fc22724/1732537537502/Ag%C3%B6n-Kr%C3%A5k%C3%B6n%20-%20Naturreservat%20i%20G%C3%A4vleborgs%20l%C3%A4n.pdf",
      "org": "Länsstyrelsen",
      "vad": "I reservatet finns en av kustens största kolonier med gråsäl.; Delar av naturreservatet ingår i … Natura 2000.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gavleborg/om-oss/om-lansstyrelsen-i-gavleborgs-lan/lanets-forfattningssamling/forfattningar-2024/forfattningssamling-2024/2024-03-08-21fs-20247.html",
      "org": "Länsstyrelsen",
      "vad": "elda, annat än på iordningställda eld- och grillplatser. Eldning får endast ske med utlagd ved; Dessa föreskrifter träder i kraft den 30 mars 2024",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Ag%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Agön\" → Agön | Hudiksvall | Natur- och terrängnamn, SWEREF 99 TM 628655/6826232 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "storjungfrun": [
    {
      "url": "https://www.lansstyrelsen.se/gavleborg/besoksmal/naturreservat/storjungfrun.html",
      "org": "Länsstyrelsen",
      "vad": "Storjungfrun är den största av de 500 öarna i Söderhamns kommun.; Storjungfruns naturreservat ägs och förvaltas av Söderhamns kommun.; Areal: 1280 hektar; Skyddsår: 2014",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gavleborg/besoksmal/kulturmiljoer/storjungfruns-fyrplats.html",
      "org": "Länsstyrelsen",
      "vad": "Storjungfruns fyr byggdes 1839; Den var den sista stenkolseldade fyren som byggdes i Sverige; Det putsade fyrtornet av sten, som fortfarande är i bruk, byggdes 1923.; Statligt byggnadsminne: 1935",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Storjungfrun",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Storjungfrun\" → Storjungfrun | Söderhamn | Natur- och terrängnamn, SWEREF 99 TM 624579/6782504 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.visitsoderhamn.se/sv/storjungfrun",
      "org": "visitsoderhamn.se",
      "vad": "Medtag mat och dryck – affär finns inte; Medtag dricksvatten! Vatten till matlagning, disk och städ finns att hämta vid gårdspump/brunn",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "kuggorarna": [
    {
      "url": "https://www.lansstyrelsen.se/gavleborg/besoksmal/naturreservat/kuggorarna.html",
      "org": "Länsstyrelsen",
      "vad": "ett kapell, uppfört åren 1776–1777; I den nordvästra delen finns en labyrint och på öns sydvästra del finns ett gravfält från sen järnålder.; Areal: 51 hektar; Skyddsår: 1996",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kugg%C3%B6rarna",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kuggörarna\" → Kuggörarna | Hudiksvall | Natur- och terrängnamn, SWEREF 99 TM 633051/6843473 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "kluntarna": [
    {
      "url": "https://www.lansstyrelsen.se/norrbotten/besoksmal/naturreservat/kluntarna.html",
      "org": "Länsstyrelsen Norrbotten",
      "vad": "Det är inte tillåtet att köra snöskoter på öarna; göra upp eld, men inte direkt på klipphällar. Kom ihåg att ta med egen ved!",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Kluntarna",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kluntarna\" → Kluntarna | Luleå | Natur- och terrängnamn, SWEREF 99 TM 852359/7280587 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/oar-i-lulea-skargard/kluntarna.html",
      "org": "lulea.se",
      "vad": "fem stenlagda labyrinter som troligen härstammar från 1300- eller 1400-talet",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/turbatstrafik-i-lulea-skargard.html",
      "org": "lulea.se",
      "vad": "Turbåtarna avgår från Södra hamnplan och angör Klubbviken havsbad på Sandön, Hindersön, Brändöskär, Småskär, Kluntarna och Junkön.; Högsäsong 19 juni – 16 augusti",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/gasthamnar-i-lulea-skargard.html",
      "org": "lulea.se",
      "vad": "Gästplatser: 20 stycken; Turbåtsangöring",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "junkon": [
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Junk%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Junkön\" → Junkön | Luleå | Natur- och terrängnamn, SWEREF 99 TM 842683/7278326 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/oar-i-lulea-skargard/junkon.html",
      "org": "lulea.se",
      "vad": "På Junkön finns ett skärgårdsmuseum, ett mindre antal bofasta och ett levande yrkesfiske.; den över 200 år gamla hattkvarnen",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/turbatstrafik-i-lulea-skargard.html",
      "org": "lulea.se",
      "vad": "Turbåtarna avgår från Södra hamnplan och angör Klubbviken havsbad på Sandön, Hindersön, Brändöskär, Småskär, Kluntarna och Junkön.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "smaskar": [
    {
      "url": "https://www.lansstyrelsen.se/norrbotten/besoksmal/naturreservat/smaskarens-klippor.html",
      "org": "Länsstyrelsen Norrbotten",
      "vad": "tio obebyggda öar och hällar söder och öster om ön Småskär; På vissa öar råder landstigningsförbud under period med öppet vatten. Det är även förbjudet att uppehålla sig inom 200 meter från öarna.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Sm%C3%A5sk%C3%A4ren",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Småskären\" → Småskären | Luleå | Natur- och terrängnamn, SWEREF 99 TM 857223/7284103 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/oar-i-lulea-skargard/smaskar.html",
      "org": "lulea.se",
      "vad": "Med hela 120 fritidshus är Småskär ön som stoltserar med högsta antalet fritidshus i hela Luleå ytterskärgård.; Småskär är ett kommunalt naturreservat",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/turbatstrafik-i-lulea-skargard.html",
      "org": "lulea.se",
      "vad": "Turbåtarna avgår från Södra hamnplan och angör Klubbviken havsbad på Sandön, Hindersön, Brändöskär, Småskär, Kluntarna och Junkön.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "rodkallen": [
    {
      "url": "https://www.lansstyrelsen.se/norrbotten/besoksmal/naturreservat/rodkallen-soraspen.html",
      "org": "Länsstyrelsen Norrbotten",
      "vad": "I vissa delar av reservatet råder landstigningsförbud mellan 1 maj och 31 juli. Det är även förbjudet att uppehålla sig inom 200 meter från öarna. Läs mer i beslutet.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=R%C3%B6dkallen",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Rödkallen\" → Rödkallen | Luleå | Natur- och terrängnamn, SWEREF 99 TM 842626/7263977 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/oar-i-lulea-skargard/rodkallen.html",
      "org": "lulea.se",
      "vad": "Den ståtliga fyren från 1872 … Med sin 21,4 meter höga stålkonstruktion",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/turbatstrafik-i-lulea-skargard.html",
      "org": "lulea.se",
      "vad": "Turbåtarna avgår från Södra hamnplan och angör Klubbviken havsbad på Sandön, Hindersön, Brändöskär, Småskär, Kluntarna och Junkön.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.lulea.se/uppleva--gora/lulea-skargard/gasthamnar-i-lulea-skargard.html",
      "org": "lulea.se",
      "vad": "Privata hamnar med gästplats … Rödkallen",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "sandskar": [
    {
      "url": "https://www.lansstyrelsen.se/norrbotten/besoksmal/nationalparker/haparanda-skargard.html",
      "org": "Länsstyrelsen Norrbotten",
      "vad": "Storlek: 6600 hektar (66 kvadratkilometer); Bildat år: 1995; På ön har man sett 251 olika fågelarter.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Sandsk%C3%A4r",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Sandskär\" → Sandskär | Haparanda | Natur- och terrängnamn, SWEREF 99 TM 903069/7300276 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/haparanda-skargards-nationalpark/besok-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Under sommaren (juli–augusti) går det en turbåt några dagar i veckan till den största ön, Sandskär.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/haparanda-skargards-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "på öarna är det skoterförbud. Stugägare får dock köra närmaste väg till huset.",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "maloren": [
    {
      "url": "https://www.lansstyrelsen.se/norrbotten/besoksmal/naturreservat/maloren.html",
      "org": "Länsstyrelsen Norrbotten",
      "vad": "från 1800-talet fram till 1967 fanns det lots på ön. Fyren från 1850 ger tillsammans med kyrkan från 1770",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Mal%C3%B6ren",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Malören\" → Malören | Kalix | Natur- och terrängnamn, SWEREF 99 TM 894665/7293978 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "hallands-vadero": [
    {
      "url": "https://www.lansstyrelsen.se/skane/besoksmal/naturreservat/bastad/hallands-vadero.html",
      "org": "Länsstyrelsen Skåne",
      "vad": "vara i sälskyddsområdet (gäller hela året); vara i fågelskyddsområdena mellan 1 april och 15 juli.; Det är tillåtet att ankra längs kusten, med undantag för Sandhamn och i områden som har tillträdesförbud",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.1e9f682716e44cbf6f5cb7d/1618590550398/folder_Hallands%20V%C3%A4der%C3%B6_NR_BushLife_tgh.pdf",
      "org": "Länsstyrelsen Skåne",
      "vad": "sandstränder vid Sandhamn och Kappelhamn  Runda 11 (sr04-k034): stränderna beläggs av foldern; webbsidan och foldern värderar antalet olika, så texten säger inget om det.",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Hallands%20V%C3%A4der%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hallands Väderö\" → Hallands Väderö | Båstad | Natur- och terrängnamn, SWEREF 99 TM 350297/6257682 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "nidingen": [
    {
      "url": "https://www.lansstyrelsen.se/halland/besoksmal/naturreservat/nidingen.html",
      "org": "Länsstyrelsen Halland",
      "vad": "under tiden den 1 april till den 15 juli årligen landa med båt eller vistas på Nidingen eller inom det omgivande vattenområdet intill ett avstånd av 100 meter från stranden med undantag av öns sydvästra del och intilliggande vattenområde",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Nidingen",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Nidingen\" → Nidingen | Kungsbacka | Natur- och terrängnamn, SWEREF 99 TM 313373/6355451 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "vendelso": [
    {
      "url": "https://www.lansstyrelsen.se/halland/besoksmal/naturreservat/vendelsoarna.html",
      "org": "Länsstyrelsen Halland",
      "vad": "under tiden 1 april; 31 juli årligen färdas eller uppehålla sig i vattenområdet i Älmö sund och på stränderna kring Älmö sund samt landstiga på del av Knarrskär eller befara vattenområdet inom 100 meter från ön, enligt markeringar på beslutskartan",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Vendels%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Vendelsö\" → Vendelsö | Varberg | Natur- och terrängnamn, SWEREF 99 TM 326187/6354678 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.fjordexpress.se/?lang=sv",
      "org": "fjordexpress.se",
      "vad": "Stenudden (Åsa) ⇄ Vendelsö; Gottskär ⇄ Vendelsö; Bua ⇄ Vendelsö",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "balgo": [
    {
      "url": "https://www.lansstyrelsen.se/halland/besoksmal/naturreservat/balgo.html",
      "org": "Länsstyrelsen Halland",
      "vad": "I Balgöfjorden finns ett bestånd av knubbsäl; Även gråsäl förekommer i området.; Hallands viktigaste lokal för strandpadda",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Balg%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Balgö\" → Balgö | Varberg | Natur- och terrängnamn, SWEREF 99 TM 328824/6339216 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "malon": [
    {
      "url": "https://www.lansstyrelsen.se/halland/besoksmal/naturreservat/malon.html",
      "org": "Länsstyrelsen Halland",
      "vad": "Malön i Kungsbacka kommun är en karg, flack ö som består av gräshedar och stora klapperstensfält.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Mal%C3%B6n",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Malön\" → Malön | Kungsbacka | Natur- och terrängnamn, SWEREF 99 TM 317061/6359586 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "djuro-nationalpark": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/nationalparker/djuro-nationalpark.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "förtöja båt längre tid än två dygn i följd vid samma plats; tälta eller sätta upp vindskydd eller liknande anordning; inom det område på gräsmarken mitt på Djurö som har markerats på karta; i övrigt inom nationalparken fler än två nätter i följd på samma plats",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Djur%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Djurö\" → Djurö | Mariestad | Natur- och terrängnamn, SWEREF 99 TM 411864/6525690 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/djuro-nationalpark/",
      "org": "Sveriges Nationalparker",
      "vad": "Djurö skärgård ligger i Vänern och består av ett trettiotal öar och skär.; Ön var bebodd från 1600-talet ända fram till 1969 då den siste fyrvaktaren lämnade ön.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/djuro-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Malbergs hamn är nationalparkens huvudentré; Nationalparken östra sidan är grund och är därför inte lämplig att lägga till vid.; Båtfärden till nationalparken är väldigt väderberoende.",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "brommo": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/brommo-skargard.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Brommö ligger utanför Torsö, norr om Mariestad.; På norra ön finns härliga sandstränder.; Öarna har flera stigar och markerade leder som utgår från Brommös färjeläge.; Västra Brommö, grannöarna Hovden, Bockön, Lindökroken och Klypholmen bildar tillsammans Brommö skärgårds naturreservat.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Bromm%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Brommö\" → Brommö | Mariestad | Natur- och terrängnamn, SWEREF 99 TM 424077/6520497 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "luro": [
    {
      "url": "https://www.lansstyrelsen.se/varmland/besoksmal/naturreservat/luro-skargard.html",
      "org": "Länsstyrelsen",
      "vad": "tälta mer än två (2) dygn i sträck på samma plats; förtöja båt eller husbåt mer än två (2) dygn i sträck på samma plats; göra upp öppen eld annat än på av reservatsförvaltaren anvisad och särskilt iordningställd plats; Medhavda grillar och friluftskök får dock användas även på annan plats.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Lur%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Lurö\" → Lurön | Säffle | Natur- och terrängnamn, SWEREF 99 TM 398477/6518156 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://saffle.se/uppleva-och-gora/visit-saffle/inspiration/destinationsguide/ekenas-luro.html",
      "org": "saffle.se",
      "vad": "Resan till Lurö startar vid Ekenäs gästhamn, belägen på Värmlandsnäs.; Luröbåten lägger till på västra sidan av Husön vid gården Stenstaka; Därefter går båten vidare till Basteviken, Lurös huvudbrygga.; Luröbåten tar cirka 1 timme.; Tänk på att boka din resa i förväg!",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "kallandso": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/kallands-skargardar.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Cirka 15 områden som är särskilt känsliga för störningar är avsatta som fågelskyddsområden.; färdas eller uppehålla sig inom det område som angivits på bifogad karta årligen under tiden 1 april; 31juli.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=K%C3%A5llands%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Kållandsö\" → Kållandsö | Lidköping | Natur- och terrängnamn, SWEREF 99 TM 393785/6503936 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://lidkoping.se/download/18.66fe5e7b19e975a9fd9751e/1781522932700/F%C3%96P%20k%C3%A5llands%C3%B6_HELA.pdf",
      "org": "lidkoping.se",
      "vad": "Området trafikeras av linje 132 som kör från Lidköping; med sluthållplatserna Spikens fiskeläge och Läckö slott",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "onso": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/onso.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "med fina naturhamnar och platser för bad och avkoppling; På Onsöns södra del finns också fantastiskt vackra och vidsträckta hagmarker och öppna strandängar.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Ons%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Onsö\" → Onsö | Mariestad | Natur- och terrängnamn, SWEREF 99 TM 423731/6511151 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "utklippan": [
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/utklippan.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "På Södraskär finns Utklippans fyr och de forna fyrvaktarbostäderna.; Fyren, fyrvaktarsamhället och miljön på Södraskär och Norraskär är statliga byggnadsminnen.; Numera används byggnaderna bland annat av Utklippans fågelstation och Svenska Kryssarklubben.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Utklippan",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Utklippan\" → Utklippan | Karlskrona | Trakt, SWEREF 99 TM 543816/6201041 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "tarno": [
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/tarno-yttre-eko.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "cykla annat än på befintliga vägar och stigar, och då endast på sätt som inte ger förslitningsskador på markerna, verkar störande på naturen eller på övrigt friluftsliv i området",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=T%C3%A4rn%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Tärnö\" → Tärnö | Karlshamn | Natur- och terrängnamn, SWEREF 99 TM 497780/6219319 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlshamn-skargard/",
      "org": "blekingetrafiken.se",
      "vad": "Vid gästhamnen i centrala Karlshamn hittar du skärgårdsterminalen.; Cirka 30 minuter från skärgårdsterminalen i Karlshamn ligger Tärnö.; Du köper din biljett när du går ombord; Det går bra att ta med djur ombord på våra båtar.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/",
      "org": "blekingetrafiken.se",
      "vad": "Från maj till september reser du ut till öar som Tjärö, Tärnö och Kastellet.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "hastholmen-ytteron": [
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hastholmen-ytteron.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "ankra, lägga till eller dra upp båt eller annan vattenfarkost annat än vid tillfällig vistelse (högst två dygn) i området; Förbudet gäller inte befintliga enskilda bryggor eller andra iordningställda båtplatser; ankra båt eller annan vattenfarkost inom områden med Ankringsförbud enligt beslutsbilaga 2a",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=H%C3%A4stholmen",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Hästholmen\" → Hästholmen | Karlskrona | Natur- och terrängnamn, SWEREF 99 TM 546627/6215417 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "stora-karlso": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/stora-karlso.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "under tiden 15 mars; 31 augusti stiga iland på ön utan tillstånd av Länsstyrelsen eller av länsstyrelsen förordnad tillsynsman för reservatet.; landstiga på annan plats än Norderhamn utan tillstånd av länsstyrelsen eller av länsstyrelsen förordnad tillsynsman för reservatet",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Stora%20Karls%C3%B6",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Stora Karlsö\" → Stora Karlsö | Gotland | Natur- och terrängnamn, SWEREF 99 TM 679283/6353065 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://storakarlso.se/resa-till-stora-karlso/turlista-och-priser/",
      "org": "storakarlso.se",
      "vad": "Båten till Stora Karlsö avgår från Klintehamn; Turer kan ställas in vid dåligt väder.; Resenärer skall vara på kaj senast 30 minuter före avgång.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://storakarlso.se/resa-till-stora-karlso/bra-att-veta/",
      "org": "storakarlso.se",
      "vad": "Runt hela ön finns ett fågelskyddsområde där det råder tillträdesförbud mellan 15/3 och 15/8, undantaget stranden i Norderhamn och Hien. Fågelskyddsområdet är markerat med gula skyltar.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://storakarlso.se/ovriga-resor/egen-bat-till-on/",
      "org": "storakarlso.se",
      "vad": "Man får endast lägga till i Norderhamn på den västra sidan av bryggan eftersom den östra sidan används av Karlsöbåten.; Ta kontakt med tillsynsmannen, när du närmar dig eller kommit iland",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "furilden": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/furilden.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Furilden naturreservat ligger på den nordligaste delen av ön Furilden, cirka 8 km sydost om Rute kyrka.; Socken: Rute; Från fågeltornet har man god utsikt över de fågelrika strandängarna innanför Fitudden.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/slite-skargard.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Den södra udden av Furilden ingår i reservatet; medföra hund som inte är kopplad eller annat lösgående sällskapsdjur under perioden 1 mars; 31 oktober",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Furilden",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Furilden\" → Furilden | Gotland | Natur- och terrängnamn, SWEREF 99 TM 739469/6410632 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
    }
  ],
  "asunden": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/slite-skargard.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "borra, hacka, spränga, rista, gräva, måla eller på något sätt skada berg, block, raukar, jord, sten eller bottensediment; förflytta eller bortföra block, sten eller fossil exempelvis genom att bygga höga stentorn",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Asunden",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Asunden\" → Asunden | Gotland | Natur- och terrängnamn, SWEREF 99 TM 729251/6402619 omräknat till WGS 84",
      "last": "2026-11-17",
      "myndighet": true
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
      "vad": "Skärgårdstrafik trafikerar Trosa skärgård från 11 juni till 2 augusti + 6 till 9 augusti 2026.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "galo": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/galo/",
      "org": "haninge.se",
      "vad": "Under andra världskriget hade försvaret en hemlig sälstation i Långgarnsviken där sälar tränades för att spåra ubåtar och minor. Sälarnas gamla bassäng finns kvar, och i dag erbjuder området både boende och konferensmöjligheter.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/",
      "org": "haninge.se",
      "vad": "Gålö havsbad, Om badet: Stort bad vid havet med lång strandremsa., Toalett: Ja., Kiosk sommartid: Ja, och minigolfbana., Grillplats: Ja., Parkering: Stor parkering., Kollektivtrafik: Närmaste busshållplats Skälåker., Hundbad: Ja., Drift: Gålö havsbad är inte ett kommunalt bad.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/galo-skalaker.html",
      "org": "havochvatten.se",
      "vad": "Gålö, Skälåker är en badplats i Haninge kommun, 2025: ★★★ Utmärkt kvalitet, 2024: ★★★ Utmärkt kvalitet, 2023: ★★★ Utmärkt kvalitet",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/galo.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Vandringsleden mot Havtornsudd från Skälåker går till stora delar längs stranden., Det är småskaligt med en mosaik av åkermarker, ekhagar, lundar och betade havsstrandängar, gärna längs stigen som börjar vid Stegsholms parkering",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://galohavsbad.se/om-oss/oppettider-och-omradeskarta/",
      "org": "galohavsbad.se",
      "vad": "Endast 35 km söder om Stockholm",
      "last": "2026-09-27",
      "myndighet": false
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
      "vad": "Vi har stugor från 2-16 bäddar med varierande standard och olika prisklasser, Husdjur är självklart välkomna men då i ett urval av våra stugor.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://galohavsbad.se/om-oss/kontakta-oss/",
      "org": "galohavsbad.se",
      "vad": "För att åka hela vägen rekommenderas att ni tar buss 845 från Västerhaninge., Stationen ni vill åka till är Skälåker., mellan Gålö Havsbad och Västerhaninge station",
      "last": "2026-11-25",
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
      "url": "https://skargardsstiftelsen.se/omraden/galo/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Gålö är ett lättillgängligt fastlandsområde på Södertörn där du enkelt kan kombinera bad, vandring och naturupplevelser året runt., Området passar också för paddling, cykling, fiske och fågelskådning.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h845.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Västerhaninge station–Gålö; Gålövägen; Björnövägen; Vilan; Stegsholm; Skälåkersvägen 1); Nor 1); Morarna 1); Nedre Bihagen 1); Skälåker 1); Apelviksudd 1); Ljushagen 1); Tomta 1); Hasslinge; Frönäsvägen; Liåker; Sunnansund; Dyvik; Östra Bondäng; Oxnö; VÄSTRA BONDÄNG; 1) Endast vissa turer.; Tidtabellen är anpassad till pendeltåg från Stockholm vid; Giltig 18 mars–18 juni samt 17 augusti–12 december 2026  Räknat ur tabellen: fyra turer mot Gålö måndag till fredag och fyra lördag, söndag och helgdag; Västerhaninge station till Skälåker 24 till 26 min.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Rudsjöterrassen–Dalarö (–Smådalarö), Gålövägen, Tidtabellen är anpassad till pendeltåg från Stockholm vid, Handens station., Måndag–fredag, Lördag, söndag helgdag, Giltig 17 augusti–12 december 2026 ; Rudsjöterrassen → Gålövägen 16 till 19 min (MÄTT i tabellen: måndag till fredag 18 till 19, lördag, söndag och helgdag …)",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station–Dalarö (–Smådalarö), Gålövägen, Tidtabellen är anpassad till pendeltåg från Stockholm vid, Handens station., Måndag–fredag, Lördag, söndag helgdag, Giltig 13 december 2026–20 juni 2027 samt 16 augusti–11 december 2027 ; Handens station → Gålövägen 16 till 19 min (MÄTT i tabellen: måndag till fredag 18 till 19, lördag, söndag och helgdag …)",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "839 Rudsjöterrassen–Dalarö (–Smådalarö), Gålövägen, Giltig 19 juni–16 augusti 2026",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.stegsholmsgard.se/",
      "org": "stegsholmsgard.se",
      "vad": "vi finns på Gålö i Haninge som är en halvö i Stockholms södra skärgård",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "toro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/oren.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Fortsätt hela Torövägen förbi butiken Torö Livs, ut mot Ankarudden. Efter bokskogen vid Herrhamra är det skyltat Naturreservat till höger.; Gå av vid hållplatsen Herrhamra som ligger strax söder om grusvägen som leder till reservatet. Härifrån är det cirka 1 kilometer till reservatet.",
      "last": "2026-11-17",
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
      "vad": "Bara den vackra vägen hit, över öarna Oxnö och Svärdsö, är värt utflykten.; I naturreservatet finns cirka 60 parkeringsplatser; Det är endast tillåtet att parkera på anvisade parkeringsplatser.",
      "last": "2026-11-17",
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
      "vad": "1 juni - 31 augusti; Broöppning kan erhållas dagligen varje hel timme …",
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
      "vad": "Efter den 16 August har vi öppet på helgerna; Lördag den 12 September …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026; Nynäshamns station …; Ankarudden …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h852.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Nynäshamns station–Torö; Torö kyrka; Storuddsvägen; Sågstensvägen; Eneby affär; Torö skola; Torö bygdegård; Treviksvägen; Herrhamra grindar; Herrhamra; Lotskyrkogården; ANKARUDDEN; f   Endast helgfri fredag.; n Endast kväll/natt mot lördag, söndag och helgdag.; Tidtabellen är anpassad till pendeltåg från Stockholm vid; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Nynäshamns station till Ankarudden 37 till 43 min måndag till fredag och 35 till 40 min helger; 9 turer måndag till fredag och en på helgfria fredagar, 5 lördag, 5 söndag och helgdag och en kvällstur före helgdag.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "fjardlang": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/besok-och-upplev-haninge/platser-att-besoka/fjardlang/",
      "org": "haninge.se",
      "vad": "Haninge kommun har sålt fastigheten Fjärdlång 1:18 till Seglarskolan Ungdomsförbundet Sveriges Flotta Östra Distriktet, Kommunfullmäktige fattade beslutet den 17 februari 2025.",
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
      "url": "https://orno.se/om-orno/orno-oar/fjallang/",
      "org": "orno.se",
      "vad": "på södra delen av Fjärdlång har det sedan 1940-talet funnits möjlighet till camping och stuguthyrning först i regi av Stockholms stads Fritidsförvaltning, Haninge kommun tog över verksamheten på 1980-talet och öppnade även vandrarhem i Thielska villan där Stockholms stad tidigare drivit seglarläger. Haninge kommun sålde sin verksamhet år 2025., Från och med sommaren 2026 kommer Ungdomsförbundet Sveriges Flotta som tidigare bedrivit Vitsgarn Seglarskola att flytta sin verksamhet till Fjärdlång. . Tidigare text om vandrarhemmets 32 bäddar och «en av få platser» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/fjardlang/",
      "org": "Skärgårdsstiftelsen",
      "vad": "där du belönas med vidsträckt utsikt över öar och hav, Stockholms Archipelago Trail sträcker sig över Fjärdlång med en etapp som är totalt 11,7 kilometer. . «Vandra längs östkusten för dramatiska havsvyer» saknade källa.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/boka-boende/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Stugan Norrötorpet är öppet under perioden 8 maj-20 september., torp på 33 kvm med ett rum, kök och sovloft, Här bor du enkelt utan el, med vatten i gårdspump, utedass och bastu vid egen brygga. Du tar med egen mat och hit kommer man med reguljär Waxholmsbåt eller med egen båt.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h839.pdf",
      "org": "SL buss 839",
      "vad": "Rudsjöterrassen–Dalarö (–Smådalarö), Giltig 17 augusti–12 december 2026, Haninge centrum, Tidtabellen är anpassad till pendeltåg från Stockholm vid",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitfjardlang.se/about-us",
      "org": "visitfjardlang.se",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vitsgarn.se/om-vitsgarn/fjardlang",
      "org": "vitsgarn.se",
      "vad": "Vandrarhem och korttidsuthyrning på Fjärdlång, Vandrarhemet och stuguthyrningen är öppen under hela sommaren och vi har samlat information om den verksamheten på www.visitfjardlang.se",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget linje 19",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 19A STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ, Dalarö avg., Fjärdlång, Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst . Räknat Dalarö avg. → Fjärdlång: ons …, fre …, lör … (2/4–18/6), … (17/8–12/12), … (2/4–18/6), sön … = 50 min–1 h 35 min; tis … bara 8/5–18/6 och 17/8–13/9. Fredag från Strömkajen … → Fjärdlång …. Turerna ons …, lör … (2/4–7/5), sön … (2/4–7/5 och 14/9–12/12) samt fre … (17/8–13/9) angör Fjärdlång bara efter beställning (b). Tidigare källrad pekade på v19.pdf; h19.pdf är den tabell Waxholmsbolaget länkar för perioden.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "rindo": [
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/vaxholmsleden/",
      "org": "Trafikverket",
      "vad": "Färjeledens längd är 970 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri. och Oxdjupsleden ( — Färjeledens längd är 500 meter och överfartstiden är tre minuter.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/oxdjupsleden/",
      "org": "Trafikverket",
      "vad": "Färjeledens längd är 500 meter och överfartstiden är tre minuter.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/download/18.5dda784b16d6ccd6b031b3c7/1569999166864/Kulturhistoriska_miljoer_pa_Rindo_2004.pdf",
      "org": "vaxholm.se",
      "vad": "1839-1863 byggdes Rindö redutt på den västra delen av ön., 1870-1877 byggdes fästningen Oskar Fredriksborg på den östra delen vid Oxdjupet. . «Omvandlad till bostadsö» var för långtgående – omvandlingen pågår enligt kommunens planer.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/download/18.5dda784b16d6ccd6b031b3c8/1569999167884/Kulturmiljoinventering_av_fd_Kustartilleriregemente_KA_1_vid_Oscar-Fredriksborg_pa_Rindo_2007.pdf",
      "org": "vaxholm.se",
      "vad": "byggnaderna stod klara 1906 efter Erik Josephsons typritningar för infanteriet, merparten av bebyggelsen från 1906 - 07 finns kvar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/bygga-bo--miljo/stadsplanering/godkanda-planprogram/rindo-hamn",
      "org": "vaxholm.se",
      "vad": "omvandling av området till en levande skärgårdsmiljö med bostäder, verksamheter och skola",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h688.pdf",
      "org": "SL buss 688",
      "vad": "Vaxholm–Rindö, Giltig 17 augusti–12 december 2026, Västerhamnsplan, Rindö smedja, Oskar-Fredriksborg . Räknat: Rindö smedja → Oskar-Fredriksborg 10–12 min, 29 turer må–fr och 23 lör–sön; några turer startar vid Västerhamnsplan i Vaxholm.",
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
      "vad": "Vaxholms Fästnings Museum, Vaxholms Kastell, Här får du följa skärgårdsförsvarets 500-åriga historia, endast öppet i samband med särskilda evenemang och lovaktiviteter . «Vaxholmen-sidan» var oklart – museet ligger på Vaxholms kastell.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h4.pdf",
      "org": "Waxholmsbolaget linje 4",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, 4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET, Rindö västra, Vegabryggan (Rindö), Grenadjärbryggan (Rindö), Vaxholm avg. . Räknat: Vaxholm avg. → Rindö västra … = 2–3 min.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "yxlan": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/sjalbottna-ostra-lagno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Bad/badplats, Fiske, Torrdass, Tältplats, På ön Själbottna har landhöjningen förvandlat havsvikar till vackra strandängar., tälta mer än två dygn i följd på samma plats, medföra hund som inte är kopplad, göra upp öppen eld",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/furusundsleden/",
      "org": "Trafikverket",
      "vad": "Furusundsleden går mellan Furusund och Yxlan i Stockholms skärgård. Färjeledens längd är 600 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/blidoleden/",
      "org": "Trafikverket",
      "vad": "Blidöleden går mellan Yxlan och Blidö i Stockholms skärgård. Färjeledens längd är 530 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri.",
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
      "url": "https://kund.printhuset-sthlm.se/sl/h632.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 17 augusti–12 december 2026, Norrtälje busstation …, Vagnsunda …, Fortsätter efter Köpmanholms skola endast om resenärer . Restid Norrtälje–Vagnsunda 1 h 15 min (…) till 1 h 24 min (…). — Strömkajen (Stockholm) …, Vagnsunda (Yxlan) …, Kolsvik (Yxlan) …, utan fast avgångstid, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "Section Yxlan, Moderate, 24 km",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://stockholmarchipelagotrail.com/section/section-yxlan/",
      "org": "stockholmarchipelagotrail.com",
      "vad": "offering a 24 km hike close to the sea, The lake Träsket, the lighthouse and Stortallen, an old pine tree are all worth a visit in their own right., it follows the local printed tourist map, Plan your hike based on when you can catch the bus back from the furthest southern point you reach.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, Strömkajen (Stockholm) …, Vagnsunda (Yxlan) …, Kolsvik (Yxlan) …, utan fast avgångstid, Går under perioden 2 april - 18 juni. . Utåt (24A) har Vagnsunda fast tid och övriga Yxlanbryggor X; hemåt (24B) har Kolsvik fast tid och Vagnsunda X. Yxlö och Köpmanholm finns bara på söndagsturerna märkta I (2 april–18 juni). Strömkajen … → Vagnsunda … = 2 h 16 min.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s24.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, 24A STOCKHOLM – VAXHOLM – BLIDÖSUNDET, Stämmarsund (Blidö), Norrsund (Blidö)",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026, 28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA, Furusund, Köpmanholm (Yxlan)",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.linjetidtabeller.se/",
      "org": "waxholmsbolaget.linjetidtabeller.se",
      "vad": "Beställ tryckta tidtabeller, Furusund - Östernäs - Söderöra - Bromskär / Rödlöga, Furusund - Högmarsö - Solö; listan har ingen tabell för linje 24 eller 26",
      "last": "2026-11-17",
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
      "url": "https://sok.riksarkivet.se/sbl/Presentation.aspx?id=34518&forceOrdinarySite=true",
      "org": "sok.riksarkivet.se",
      "vad": "Vid denna tid skrev S också vad som skulle bli hans mest populära roman, Hemsöborna (1887).",
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
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Rudsjöterrassen–Dalarö (–Smådalarö), Hotellbryggan, Tidtabellen är anpassad till pendeltåg från Stockholm vid, Handens station., Giltig 17 augusti–12 december 2026 ; Rudsjöterrassen → Hotellbryggan 33 till 39 min (MÄTT i tabellen: måndag till fredag 34 till 39, lördag, söndag och helgdag 33 till 37)",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station–Dalarö (–Smådalarö), Hotellbryggan, Tidtabellen är anpassad till pendeltåg från Stockholm vid, Handens station., Giltig 13 december 2026–20 juni 2027 samt 16 augusti–11 december 2027 ; Handens station → Hotellbryggan 33 till 39 min (MÄTT i tabellen: måndag till fredag 34 till 39, lördag, söndag och helgdag 33 till 37)",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "Dalarö avg. …, Kymmendö …, Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst, minst 1 timme innan avgång från aktuell brygga",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "bullero": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "en varm raststuga och vedeldad bastu som är öppna året om. På ön finns vandringsleder av olika svårighetsgrad, en informationsplats, en badstrand, en tältplats och ett litet museum i konstnären Bruno Liljefors före detta jaktstuga. Delar av ön är tillgänglighetsanpassade så att det går att ta sig runt med rullstol, barnvagn eller rullator",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031975",
      "org": "Naturvårdsverket",
      "vad": "Särskilt under högsäsongen, som sträcker sig från midsommar till mitten av augusti, ligger båtarna tätt. Under för- och eftersäsong är sannolikheten större att kunna ha en plats för sig själv.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/om-oss/aktuellt/nyheter-och-pressmeddelanden/2025/juni/namdoskargarden-blir-sveriges-31a-nationalpark/",
      "org": "Naturvårdsverket",
      "vad": "Nämdöskärgården blir Sveriges 31:a nationalpark (nyhet 2025-06-23) . Stod «den första marina nationalparken i Östersjön» – källan säger Sveriges första.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.naturvardsverket.se/4a47fc/globalassets/nfs/2025/nfs-2025-3.pdf",
      "org": "Naturvårdsverket",
      "vad": "tält högst \"sju dygn i följd på samma plats inom område markerat på karta i bilaga 3:5\" . Stod tomt trots att gästhem finns.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark",
      "org": "Sveriges Nationalparker",
      "vad": "Nämdöskärgårdens nationalpark är Sveriges första marina nationalpark i Östersjön i Stockholms skärgård. Nationalparkens yta är uppdelad på ett tusental öar, kobbar och skär. Huvudentrén finns på ön Bullerö.; 97 procent av nationalparkens yta är hav.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Du kan resa med Bullerölinjen till nationalparkens huvudentré på Bullerö från maj till en bit in i oktober.; Stavsnäs båttaxi driver turlinjerna.; Buss 434 går från Slussen i centrala Stockholm hela vägen fram till hamnen.",
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
      "vad": "På Bullerö, vid Rävängen, hittar du konstnären Bruno Liljefors före detta jaktstuga. I jaktstugan finns en utställning om Nämdöskärgårdens nationalpark, om förutsättningarna för Östersjön och om djurlivet ovan och under ytan.",
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
      "vad": "fågelliv är rikt, framför allt under våren",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/overnatta-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "På nationalparkens huvudö Bullerö finns Gästhemmet som består av Parstugan och Sjögrenska villan. Parstugan har egen ingång, eget kök och fem bäddar.; Gästhemmet är öppet för bokning mellan den 1 maj–2 november.; Bokning av Gästhemmet på Bullerö och torpen på öarna hanteras av By Nordiq.; På Bullerö finns en anvisad plats för tältning – tältängen. Det kostar ingenting att tälta där; servicehus med dricksvatten, toalett och dusch, grill och utekök",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/ata-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Det finns ingen matservering eller butik i nationalparken. Om du har med dig egen matsäck kan du äta den vid någon av de i ordningsgjorda rastplatserna eller i raststugan vid bryggan på Bullerö.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/service-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://battaxi.se/ws/media-library/7b372fb2cec21735246ff04363d12e1f/bullerolinjen-tidtabell-ht-26-inkl-5-sept.pdf",
      "org": "battaxi.se",
      "vad": "Bullerölinjen höst 2026 period \"17/8 - 11/10\": Stavsnäs … → Bullerö … (30 min); \"Samtliga avgångar måste förbokas!\"",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://battaxi.se/bullerölinjen/",
      "org": "battaxi.se",
      "vad": "trafikerar vi på uppdrag av Länsstyrelsen . Den tidigare källan bullero.se gick inte att nå (anslutningen bröts 2026-09-27).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/mellersta-skargarden/bullero",
      "org": "explorearchipelago.com",
      "vad": "naturhamnar \"Bullerön, Bodkobbshålet\", \"Bullerön, Rävängsviken\", \"Bullerön, Storbåtsviken\"",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "vindo": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c3748572/1732515661464/Landsbygdsutveckling%20p%C3%A5%20Djur%C3%B6%20genom%20projektet%20Bygd%20f%C3%B6r%20Bygd.pdf",
      "org": "Länsstyrelsen",
      "vad": "På Vindö bor omkring 400 personer permanent, Norrut på Vindö finns utspridda villaområden och ett stort antal fritidshus, Särskilt hög koncentration av områden med stor betydelse för den biologiska mångfalden finns på Djurö och Vindö, stora sammanhängande barrskogsområden",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/varmdohamnar/sollenkrokabrygga.4.1524f1c618a8d1d9fee45d62.html",
      "org": "varmdo.se",
      "vad": "Från Sollenkroka Brygga går båttrafik till bland annat Norra och Södra Stavsudda samt Möja.; en sommaröppen sjömack med café och servicebutik; Trafikverket har en allmän brygga för tillfällig lastning och lossning av fartyg.; I Sollenkroka (till vänster om Trafikverkets brygga) finns en ramp för sjösättning och upptagning av fritidsbåtar.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/download/18.79379661188ba20c6714e030/1688990516415/25%20ha%CC%88rliga%20utflyktsma%CC%8Al-1.rev%20230710.pdf",
      "org": "varmdo.se",
      "vad": "Längs en knastrande grusväg tar du dig genom hällmarkstallskogen, lång grusvägspromenad framför dig, till halvöns norra udde, Kanholmsfjärden, skyddad intill sundet mellan Skarpö och, Vindö, ligger Skarpö by, Vindö Prästgårdsväg, Busshållplats Djurö gamla prästgård",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo.4.18c983316e0536cb189a176.html",
      "org": "varmdo.se",
      "vad": "Vita grindarna, Djurö Havsbad",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/alltomnaturochfriluftsliv/badplatserivarmdo/vitagrindarnadjurohavsbad.4.18c983316e0536cb189a2ae.html",
      "org": "varmdo.se",
      "vad": "Bad i anslutning till en campingplats med sandstrand och gräsytor vid Bruksfladen i Djurhamn på Djurö  — kommunens badplatslista har ingen badplats på Vindö",
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
      "vad": "Vi serverar kaffe, fikabröd och så varmkorv, I kiosen finns naturligtvis även glass, godis, läsk, Öppettider 2026, 1 Maj - 31 Maj, 10 Aug.- 27 Sept.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.djuronaset.com/",
      "org": "djuronaset.com",
      "vad": "273 Rum, 25 m Inomhuspool",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Överby; Byns gård; Pålsudden; Prästmaren; Kallviken; Djurö gamla prästgård; Prästgårdsmossen; Skarpösund; Lövtorpsträsket; Fjällsvik; Djurögaraget; Vindö skola; Skaft 2); Sollenkroka by 2); Grundmaren 2); Sollenkroka brygga 2); Argboda; Vämlingen; Löknäsvägen; Jessens backe; Eksjövägen; Långsjövägen; Tammtorpsvägen; Abborrkroksvägen; Överby gård; ÖVERBY BRYGGA; 2) Endast vissa turer.; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Slussen till Sollenkroka brygga 64 till 78 min och till Överby brygga 71 till 87 min, alla dagtyper. Ersätter KÄLLA-raden från 2026-09-27, vars citat hade klockslag.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 14 december 2025–18 juni 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 19 juni–16 augusti 2026",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "smadalaro": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/utomhusaktiviteter/",
      "org": "haninge.se",
      "vad": "Smådalarö golf, 9-hålsbana i skärgårdsmiljö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/idrott-och-friluftsliv/friluft-och-natur/bad/",
      "org": "haninge.se",
      "vad": "Schweizerbadet på Dalarö",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Rudsjöterrassen–Dalarö (–Smådalarö); Hotellbryggan; Dalarö torg 1); Kanalbron 1); Friggavägen 1); Skärkarlshöjden 1); Bryggerivägen 1); Holmdal 1); Djupviksvägen 1); Vadviksvarv 1); Långuddsvägen 1); Almedalsvägen 1); Borgvik 1); Söderviken 1); SMÅDALARÖ 1); 1) Endast vissa turer.; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Hotellbryggan till Smådalarö 13 till 15 min måndag till fredag och 12 till 13 min lördag, söndag och helgdag; 14 turer till Smådalarö måndag till fredag och 9 lördag, söndag och helgdag.",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v839.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Handens station–Dalarö (–Smådalarö), Haninge centrum, 1) Endast vissa turer., Giltig 13 december 2026–20 juni 2027 samt 16 augusti–11 december 2027",
      "last": "2026-11-28",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/om-oss/var-historia/",
      "org": "smadalarogard.se",
      "vad": "Grunden till den stora rörelsen på Smådalarö Gård lades av löjtnanten Carl Christian Gyldener, som tillsammans med tullinspektören Nils Sondell arrenderade halva Smådalarö i 20 år, tillsammans startade herrarna produktion av både öl och brännvin, därför fick han 1750 ett eget arrendekontrakt på livstid, År 1802 förvärvade Blom, endast 40 år gammal, den stora egendomen ”Tyresö skärgårdsdel” från grevinnan Brita Bonde för 12.000 riksdaler banco, Kofferdikaptenen Carl Peter Blom, som stod färdigt år 1810",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/spa/",
      "org": "smadalarogard.se",
      "vad": "Smådalarö Spa är 2000 kvm stort, 4 pooler, 2 inne & 2 ute, 3 olika bastur - ångbastu, torrbastu & ett sanarium, infinity-poolen som sträcker ut sig mot Hemviken, Spabehandlingar signerat Kerstin Florian",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/gasthamn/",
      "org": "smadalarogard.se",
      "vad": "Här finns 30 gästplatser vid bryggan, Priserna inkluderar el, sopstation samt elbastu och tvättstuga, vattnet mellan Rosenön och Smådalarö har ett djup på 2.46 meter, åk därför mitt i sundet, Inseglingsvägen är i kanalen mellan Söderviken och Hemviken eller under Rosenöns bro, Förboka din plats i gästhamnen via",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/kontakt-hitta-hit/",
      "org": "smadalarogard.se",
      "vad": "Smådalarö Gård Hotell & Spa ligger idylliskt i Hemviken i Stockholms skärgård, Med bil når du Smådalarö Gård Hotell & Spa på 50 min från Stockholm city, som går från Haninge Centrum hela vägen till vår grind",
      "last": "2026-11-17",
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
      "vad": "Med Waxholmsbolaget kan ni enkelt ta er från Dalarö vidare, till andra vackra ö:ar till exempel, Kymmendö, Ornö och Fjärdlång, Gålö är en halvö och naturreservat med hela fem mil strandlinje",
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
      "url": "https://www.smadalarogard.se/hotellet/aktiviteter/pa-land/",
      "org": "smadalarogard.se",
      "vad": "Spela en runda golf på vår 9-hålsbana",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/aktiviteter/i-vatten/",
      "org": "smadalarogard.se",
      "vad": "Hyr vår lilla eller stora bastu med egen brygga, under sommarmånaderna erbjuder vi aktiviteter som att paddla kajak eller SUP",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/hotellet/vara-rum/",
      "org": "smadalarogard.se",
      "vad": "erbjuder 110 unika hotellrum och sviter, belägna ovanför Bloms Bar i hjärtat av hotellet, familjerum och superiorrum till exklusiva hotellsviter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.smadalarogard.se/restauranger/brasserie-branneri/",
      "org": "smadalarogard.se",
      "vad": "Här serveras mat från morgon till kväll, Vi använder oss av säsongens råvaror och hämtar många av dessa från närliggande gårdar, Ät frukost, lunch eller sen middag, slå dig ner vid ett bord ute på terrassen med utsikt över Hemviken",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.svenskagasthamnar.se/stockholms-skargard/smadalarogard/",
      "org": "svenskagasthamnar.se",
      "vad": "Vi har bussförbindelse (buss 839) i anslutning till hotellet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h19.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "STOCKHOLM – DALARÖ – ORNÖ (ÖSTRA SIDAN) – UTÖ, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026",
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
      "vad": "Längs bägge sidor av ön finns vackra, betade strandängar och sköna badklippor., Eriksö ligger på sydvästra Mörkö, 6 kilometer nordost om Trosa., Kommun: Södertälje, Förvaltare: Länsstyrelsen, Skyddsform: naturreservat, I reservatet är det förbjudet att:, medföra hund, katt eller annat husdjur som inte är kopplat, för längre tid än två dygn i följd förankra båt vid samma plats, för längre tid än två dygn i följd tälta på samma plats, tag av söderut vid Idala, Parkering, Det är långt till närmaste busshållplats, som heter Idala. Därifrån är det 7 km promenad söderut till reservatet.",
      "last": "2026-11-03",
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
      "vad": "Skanssundsleden går mellan Hörningsnäs på Södertörn och Mörkö. Färjeledens längd är 330 meter lång och överfartstiden är tre minuter. Resan med vägfärjan är avgiftsfri.; Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation. Du kan även kalla på färjan direkt i appen.",
      "last": "2026-11-17",
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
      "url": "https://skansholmen.com/",
      "org": "skansholmen.com",
      "vad": "På Skansholmen väljer du mellan Bistrons luftiga terrass med vy över fjärden och Skanssundet eller Sjökrogen vid marinan., Vår glassbuffé är ett måste för hela familjen!",
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
      "vad": "Vi finns precis intill färjeläget.; Parkering finns på vänster sida ca 150 meter från Skansholmen.; P-avgift",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v727.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Tumba station …, Skanssundet …, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h727.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Tumba station–Skanssundet; Häradsgränsen; Hörningsnäs; Sandviksbadet; SKANSSUNDET; n Endast natt mot lördag, söndag och helgdag.; Tidtabellen är anpassad till pendeltåg från Stockholm vid; Giltig 7 april–18 juni samt 17 augusti–12 december 2026  Räknat ur tabellen: Tumba station till Skanssundet 36 till 43 min måndag till fredag och 36 till 38 min lördag, söndag och helgdag; 12 turer måndag till fredag och 7 lördag, söndag och helgdag, och en nattur.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "musko": [
    {
      "url": "https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/musko/",
      "org": "haninge.se",
      "vad": "Redan sedan 1500-talet har flottan haft sin bas här. Under rysshärjningarna 1719 blev galärsoldaterna belägrade av svenskarna och grävde en kanal för att fly. En passage som idag är en uppskattad sjöväg.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/siteassets/uppleva-och-gora/sevardheter-och-besoksmal/musko-kulturmiljoer-rapport.pdf",
      "org": "haninge.se",
      "vad": "in i Djupskåraberget på sydvästra delen av ön, arbetet med att spränga ut anläggningen hade dock inletts redan 1950, invigdes 1969, efter att 1,5 miljoner kubikmeter berg sprängts ut, täcker en yta stor som Monte Carlo, med ett vägsystem på cirka två mil",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/",
      "org": "haninge.se",
      "vad": "Björkholmen på Muskö, Om badet: Litet bad med bryggor vid havet., Toalett: Ja, vid campingen., Kiosk: Nej., Grillplats: Ja., Parkering: Liten parkering., Kollektivtrafik: Närmaste busshållplats Muskö kyrka., Hundbad: Nej.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/bjorkholmen-musko.html",
      "org": "havochvatten.se",
      "vad": "Björkholmen, Muskö är en badplats i Haninge kommun, 2025: ★★★ Utmärkt kvalitet, 2024: ★★★ Utmärkt kvalitet, 2023: ★★★ Utmärkt kvalitet",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/om-oss/nyheter/lansnyheter/stockholm/2025/2025-09/arbeten-i-muskotunneln-nattetid/",
      "org": "Trafikverket",
      "vad": "Muskötunneln är 2 910 meter lång och ligger cirka 65 meter under vattenytan. Den fria höjden är 3,9 meter i den dubbelriktade tunneln., I mars 1964 öppnades tunneln för allmän trafik., Tunneln stängs cirka sex nätter per år för planerat underhållsarbete",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.explorearchipelago.com/sv/sthlm/sodra-skargarden/musko",
      "org": "explorearchipelago.com",
      "vad": "Ut mot havet och Mysingen reser sig strandklipporna höga, medan de inre delarna av ön är lummiga med slåtterängar och björkhagar., I Arbottna hittar du våtmarken Maren som är ett paradis för fåglar., Brukets stenstrand och klippor lockar till bad.",
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
      "url": "https://mickrumsbrygga.se/hitta-hit",
      "org": "mickrumsbrygga.se",
      "vad": "Parkering finns vid bryggan.; Anlöp vid Mickrums brygga i Norrviken. Plats för gästbåtar.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v849.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Ösmo centrum–Muskö, Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026 (buss året runt; lördag Ösmo centrum … → Hyttan …)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h849.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Ösmo centrum–Muskö; Himmelsöbron; Yxlö kanal; Guldbodavakten 1); Tunneln; Södra Muskö; Guldbodasjön; Arbottnavägen; Risdalsvägen; Mälby; Valingevägen; Muskö kyrka 1); Mickrums brygga; Kanalbron; Nässelviken; Torpa skog; Ropudden; Muskö såg; HYTTAN; Tidtabellen är anpassad till pendeltåg från Stockholm samt till; pendeltåg från Nynäshamn vid Ösmo station.; n Endast natt mot lördag, söndag och helgdag.; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Ösmo centrum till Hyttan 36 till 43 min; 15 turer till Hyttan måndag till fredag, 8 lördag och 7 söndag och helgdag, nattbussen inräknad på helgerna. Texten citerade tidigare v849.pdf (14 december 2025 till 18 juni och 17 augusti till 12 december 2026).",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/grytholmens-friluftsmuseum/",
      "org": "stockholmslansmuseum.se",
      "vad": "Grytholmens friluftsmuseum på Muskö visar ett bevarat torp från 1800-talet, Grytholmens friluftsmuseum har öppet under sommaren. För öppettider och bokning av visning se Muskö hembygdsförenings hemsida",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "adelso": [
    {
      "url": "https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/birka-och-hovgarden/",
      "org": "raa.se",
      "vad": "Det var här riddarståndet inrättades 1279., Birka och Hovgården upptogs på världsarvslistan 1993.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/app/uploads/2023/06/Beslut-Adels%C3%B6-Bj%C3%B6rk%C3%B6-Birka-AB21-RA%C3%84-2021-1675.pdf",
      "org": "raa.se",
      "vad": "Den visuella kontakten över vattnet mellan Hovgården och Birka",
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
      "url": "https://www.birkavikingastaden.se/resa-hit/",
      "org": "birkavikingastaden.se",
      "vad": "Båten går från centrala Stockholm (Klara Mälarstrand) och stannar vid bryggorna Nya Kungshatt, Vårby brygga, Jungfrusund och Hovgården (Adelsö).; Hovgårdens brygga ligger vid Adelsö kyrka. Vägen ner är stängd för fordonstrafik",
      "last": "2026-11-25",
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
      "url": "https://kund.printhuset-sthlm.se/sl/v312.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Ringlinje. (buss 312 på Adelsö)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h312.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "(Sjöängen-) Adelsö (-Sjöängen - Ekerö centrum); Av- och påstigning på Adelsöfärjan; är inte tillåten.; 1) Vinkområde på hela Adelsö. Ringlinje.; Motsolsvarv. Turen går Färjeläget–Sättravägen–; Hanmora–Adelsö Kyrka.; Resan mellan Sjöängen och Adelsö färjeläge sker med Adelsöleden.; Giltig 17 augusti 2026 - 12 december 2026  Räknat ur tabellen: med direkt anslutning tar resan från Brommaplan (311) till Adelsö kyrka 1 h 13 min till 1 h 15 min; motsolsvarven tar längre tid till kyrkan.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/hovgarden/",
      "org": "stockholmslansmuseum.se",
      "vad": "Här bodde kungen som härskade över Birka. Sedan 1993 har Hovgården tillsammans med Birka status som världsarv., Under medeltiden låg kung Magnus Ladulås sommarpalats Alsnöhus här, Den blev byggd redan i slutet 1100-talet med långhus och smalare kor.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/birka-vikingastaden/",
      "org": "stromma.com",
      "vad": "Resa från/till Hovgården måste alltid förbokas; Välj avgång från Hovgården om du vill ha en kort båtresa till Birka (ca 15 min).; Parkeringsplatser finns vid Hembyggdsgården. Gångavstånd till avgångsplats är minst 15 minuter på grusväg genom en kohage. Rekommenderas ej för personer med rörelsehinder.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/2027/v44_birka_tidtabell_stockholm_a3s.pdf",
      "org": "stromma.com",
      "vad": "TIDTABELL M/S MÄLAR VICTORIA; Hovgården*; * Stannar endast vid förbokning; Lördag - söndag; Dagligen; 14 - 23 juni; 28 juni - 8 aug; 9 - 29 aug; 20 sep - 24 okt  Räknat ur tabellen: Hovgården har tider bara i kolumnen för lördag, söndag och dagliga turer; Hovgården till Birka 30 min, Birka till Hovgården 15 min; inga rader för 24 till 27 juni och 30 augusti till 19 september; tabellen gäller 5 maj till 24 oktober 2027. Runda 11 (sb04-k023, sb05-k008): Strömmas «ca 15 min» gäller bara Birka till Hovgården.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.svenskakyrkan.se/ekero/adelso-kyrka",
      "org": "svenskakyrkan.se",
      "vad": "Adelsö kyrka har rötter från tidigt 1100-tal., Denna absid upptäcktes och blottades först 1957 i samband med en renovering.",
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
      "vad": "Öppet alla dagar mellan …. Öppet även jul och nyår. (Hovgårdens informationscenter, året runt)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.xn--sttragrd-0zap.se/b%C3%A5tklubben-17456658",
      "org": "xn--sttragrd-0zap.se",
      "vad": "Välkommen till Piren och Byviken, Piren drivs och sköts av Sättra Gårds Båtklubb",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ingaro": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/bjorno.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Skyddat sedan: 1983, Storlek: 948 hektar, varav land 316 hektar, den fina sandstranden vid Torpesand med utblick mot Nämdöfjärden, Halvön genomkorsas av ett nätverk av stigar och grusvägar, Vackra och värdefulla betesmarker finns på Näset, där Adam och Eva blommar på försommaren",
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
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/sparochleder.4.18c983316e0536cb189a419.html",
      "org": "varmdo.se",
      "vad": "Går man stora slingan enligt kartan nedan blir det ca 7,1 km, längs med leden finns det torrklosett, dricksvatten, raststuga och tältplats, Stigen är lättgången och fungerar även bra för rullstolar, Ett 2,7 km belyst motionsspår som startar vid Brunns skola, Leden är ett naturspår som utgår från parkeringen i reservatets södra del, följ de gula markeringarna",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo.4.18c983316e0536cb189a176.html",
      "org": "varmdo.se",
      "vad": "Ingarö havscamping, Södersved, Björkviks badplats, Återvalls träsk",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/storaochlillasand.4.18c983316e0536cb189a30d.html",
      "org": "varmdo.se",
      "vad": "Stora sandstränder längst ut på Ingarö, vid Klacknäset",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/bjorkviksbadplats.4.18c983316e0536cb189a23d.html",
      "org": "varmdo.se",
      "vad": "Strand och klippbad längst ut på Ingarö.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/atervallstrask.4.18c983316e0536cb189a263.html",
      "org": "varmdo.se",
      "vad": "Vid Återvalls träsk finns en sandstrand som ägs och sköts av Värmdö kommun.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/ingarohavscampingsodersved.4.18c983316e0536cb189a250.html",
      "org": "varmdo.se",
      "vad": "Strandbad med stora gräsytor.",
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
      "vad": "där både golfare och gäster kan koppla av före rundan, efter spelet eller bara njuta av god mat, Fågelviksvägen 1, 134 64 Ingarö",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.igk.se/pizza-a-la-carte-i-restaurangen/",
      "org": "igk.se",
      "vad": "Vi har öppet för pizza och à la carte i restaurangen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingarohavscamping.se/kontakt-oppettider-contact-hours-of-operation/",
      "org": "ingarohavscamping.se",
      "vad": "Väg 222 mot Gustavsberg – ta av mot Värmdö Marknad och Ingarö, Ingarö Havscamping ligger ca 30 km öster om Stockholm",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingarohavscamping.se/korttidscamping-short-term-camping/",
      "org": "ingarohavscamping.se",
      "vad": "Vi har nio stycken korttidsplatser placerade på Bäverängen tillgängliga för husvagn, husbil och tält",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingarohavscamping.se/stugor-cabins/",
      "org": "ingarohavscamping.se",
      "vad": "Campingen har fem stugor på 16 kvm/styck och som ligger med utsikt över kolströms kanal",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://ingarohavscamping.se/vara-servicehus-our-service-houses/",
      "org": "ingarohavscamping.se",
      "vad": "Vi har två servicehus på området, med wc/duschutrymmen, samt tvättstuga",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/besoksmal/bjorno/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Parkering finns vid reservatets entré. Det går även buss från Slussen till hållplats Björnö naturreservat, varifrån det är promenadavstånd till området.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h428x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Björkvik; Ingarö kyrka; Brunn; Mörtvikens brygga; Klacknäset; Stora Sand; Björnö Sandarna; Björnö naturreservat; BJÖRKVIKS BRYGGA; 1) Endast påstigning.; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Slussen till Björkviks brygga 54 till 62 min måndag till fredag och 52 min lördag, söndag och helgdag.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h429x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Idalen; Återvall; Björnö gård; Stora Sand; IDALENS VÄNDPLAN; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Slussen till Idalens vändplan 46 till 52 min måndag till fredag och 42 min lördag, söndag och helgdag.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h430x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Eknäs brygga; Fågelviks gård; Återvall; Säbyviken; EKNÄS BRYGGA; Giltig 17 augusti–12 december 2026  Räknat ur tabellen: Slussen till Eknäs brygga 48 till 52 min måndag till fredag och 49 min lördag, söndag och helgdag.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s428x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Giltig 19 juni–16 augusti 2026  — 428X: Slussen–Björkviks brygga 52–61 min; 10 turer mån–fre och 5 lör–sön på 428X, 10/6 på 429X, 11/6 på 430X.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s429x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "429X Slussen–Idalen; Giltig 19 juni–16 augusti 2026",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/s430x.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "430X Slussen–Eknäs brygga; Giltig 19 juni–16 augusti 2026",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h428.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Gustavsbergs centrum–Björkvik  — 428 utan X har 3 turer mån–fre och 4 lör–sön i tabellen för 17 augusti–12 december 2026.",
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
      "url": "https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/",
      "org": "haninge.se",
      "vad": "listan \"Badplatser i Haninge\" har ingen badplats på Huvudskär",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun.html",
      "org": "havochvatten.se",
      "vad": "Här ser du badplatserna som kommunen har registrerat.; listan har ingen badplats på Huvudskär",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Reservatet omfattar hela Huvudskärsarkipelagen utom huvudön Ålandsskär, och ligger tio kilometer sydost om Ornö.; Andra tider på året trafikerar bland annat Dalarö sjötransport sträckan Dalarö-Huvudskär och Gålö sjötaxi sträckan Morarna (Gålö)-Huvudskär.; Huvudskärs naturreservat omfattar ett skärgårdsområde med omkring 200 öar och skär; På Ålandskär finns fyr och byggnader.; Flera torrdass och sopmajor finns i området.; medföra hund eller annat husdjur som inte är kopplat; tälta mer än två dygn i följd på samma plats; göra upp öppen eld",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.dalarosjotransporter.se/kontakt/",
      "org": "dalarosjotransporter.se",
      "vad": "Under sommaren 2026 kommer vi återigen att trafikera Dalarö - Huvudskär på torsdagar och söndagar mellan 14 juni-16 augusti i samband med att vandrarhemmet byter gäster.; På söndagar ligger båten kvar c:a tre timmar Huvudskär, på torsdagar vänder båten direkt åter mot Dalarö.; Avg från Dalarö Hotellbrygga tors/sön; Boka via mail; samtidigt som ni betalar via swish.; Om rederiet ställer in turen pga av hårda vindar",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/huvudskar/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Hit tar du dig med egen båt eller taxibåt.; För den som kommer med egen båt finns också naturhamnar och gästbryggor i området.; i fladen mellan Ålandsskär och Lökskär blir det ibland fullt med båtar; Eftersom den ligger långt ut i havsbandet råder här ett sällsamt lugn.  Runda 11 (sr02-k017): «längst ut» rättat till källans «långt ut».",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h845.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Morarna 1); 1) Endast vissa turer.",
      "last": "2026-11-17",
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
      "url": "https://www.varmdo.se/byggabomiljo/avfallochatervinning/alltomavfallochatervinning/atervinningscentraler/grovsopfarjaiskargarden.4.32d25aee16de5374fdc53f00.html",
      "org": "varmdo.se",
      "vad": "Färjan besöker öar som inte har permanent återvinningscentral i närheten, Eknö brygga . Restid ur tabellen: fredag Stavsnäs … → Eknö … (30 min); måndag–fredag Eknö … → Stavsnäs … (51 min); Sandhamn … → Eknö … (9 min).",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.eknohemman.se/om-sandhamn/om-sandhamn",
      "org": "eknohemman.se",
      "vad": "Men inledningsvis bodde lotsarna inte på ön utan istället på Eknö där de hade sina bostäder och ibland mindre jordbruk., Det medförde att lotsarna lämnade Eknö och flyttade till Sandhamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.eknohemman.se/om-oss/om-oss",
      "org": "eknohemman.se",
      "vad": "En stor del av mark- och vattenområdena på Sandhamn ägs och förvaltas av Eknö Hemman Samfällighetsförening., Samfälligheten ägs av 145 fastigheter, föreningen har funnits sedan 1850-talet och hette tidigare Bystyrelsen for Eknö Hemman Nr 1",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "16A STAVSNÄS – SANDHAMN – HAGEDE, 16B HAGEDE – SANDHAMN – STAVSNÄS, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026, Eknö, utan fast avgångstid . Stavsnäs … → Eknö … (30 min), Eknö … → Stavsnäs … (51 min). — Men inledningsvis bodde lotsarna inte på ön utan istället på Eknö där de hade sina bostäder och ibland mindre jordbruk., Det medförde att lotsarna lämnade Eknö och flyttade till Sandhamn",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "hasselo": [
    {
      "url": "https://www.varmdo.se/byggabomiljo/avfallochatervinning/alltomavfallochatervinning/atervinningscentraler/grovsopfarjaiskargarden.4.32d25aee16de5374fdc53f00.html",
      "org": "varmdo.se",
      "vad": "Hasselö brygga (Värmdö kommuns grovsopfärja)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://hhif.se/oar/",
      "org": "hhif.se",
      "vad": "Haröskärgården ingår i riksintresset för naturvården och hyser flera nyckelbiotoper., Storö naturreservat och Dävelsöfjärdens naturreservat har inrättats för friluftslivet, Kring Norrsundet finns skyddade naturhamnar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/om-oss/",
      "org": "hhif.se",
      "vad": "1948 bildades Föreningen Hasselö Ångbåtsbrygga, Kärnan i verksamheten är och har alltid varit våra tre trafikbryggor som gör det möjligt för Waxholmsbolaget att reguljärt trafikera våra öar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/uppdrag/bryggor/",
      "org": "hhif.se",
      "vad": "Hasselö brygga är den senast byggda bryggan och byggdes 1985 av Stockholms Hamn.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/uppdrag/bryggor/hasselo/",
      "org": "hhif.se",
      "vad": "1984–85 var det dags för föreningens tredje bryggbygge., Man projekterade en brygga som vilar på ett ”rör” med ett jättestort ”lock” som spänts fast med wirar., Locket/bryggdäcket lyftes på plats av jättekranen Lodbrok.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://hhif.se/arkiv/2023/fran-23-till-473-medlemmar-pa-75-ar/",
      "org": "hhif.se",
      "vad": "Året när föreningen Hasselö Ångbåtsbrygga bildades uppgick antalet medlemmar till 23",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h16.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "16A STAVSNÄS – SANDHAMN – HAGEDE, GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026 . Restid ur tabellen: måndag–torsdag Stavsnäs … → Hasselö … (35 min), … (40 min); söndag … (25 min). — Haröskärgården trafikeras året runt av skärgårdstrafiken.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "ormskar": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/nationalparker/namdoskargardens-nationalpark.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Du får endast elda på anvisade platser eller i grill på ben. Du får också använda friluftskök.; Din hund ska alltid vara kopplad.; Du får inte starta eller landa med luftfartyg, drönare eller liknande.; Ta med egen mat och dryck – inget sådant finns att köpa i nationalparken.",
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
      "url": "https://www.naturvardsverket.se/4a47fc/globalassets/nfs/2025/nfs-2025-3.pdf",
      "org": "Naturvårdsverket",
      "vad": "förbjudet att \"ankra eller förtöja farkost på samma plats mer än två dygn i följd\" och att \"ta med okopplad hund eller annat husdjur som inte är kopplat\"",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Samtliga båtlinjer utgår från Stavsnäs vinterhamn. Där ifrån utgår också taxibåtarna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark/besok-parken/service-i-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Det finns inget dricksvatten på någon av de andra öarna i nationalparken.",
      "last": "2026-09-27",
      "myndighet": true
    }
  ],
  "norrpada": [
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/norrpada.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Norrpada naturreservatet ligger i Norrpada skärgård, som ligger i ytterskärgården 15 kilometer sydost om Kapellskär. Hit kommer du endast med egen båt.; Reservatet omfattar Skärgårdsstiftelsens markinnehav inom Norrpada skärgård; Naturhamnar finns i hela Norrpada arkipelagen. Bland annat vid Idskär, Hallskär och Gummaskär. Torrdass och sopbod finns på Gummaskär.; medföra hund eller annat husdjur som inte är kopplat; för längre tid än två dygn i följd tälta på samma plats; göra upp eld.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://skargardsstiftelsen.se/omraden/norrpada/",
      "org": "Skärgårdsstiftelsen",
      "vad": "Norrpada ligger cirka 15 kilometer sydost om Kapellskär och består av ett trettiotal öar, kobbar och skär som tillsammans bildar ett av norra skärgårdens mest omtyckta båtområden; Här finns inga större anläggningar, ingen bebyggelse och få spår av modern utveckling",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "grasko": [
    {
      "url": "https://www.lansstyrelsen.se/download/18.1b1d393819324610c37487ba/1732515932045/Sk%C3%A4rg%C3%A5rdsfakta%20%E2%80%93%20Grafiska%20kartor%202019.pdf",
      "org": "Länsstyrelsen",
      "vad": "I Stockholms skärgård finns omkring 30 000 öar, varav cirka 200 är bebodda.; Region Stockholm har i den regionala utvecklingsplanen för Stockholmsregionen – RUFS 2050 pekat ut kärnöar.; Landsort och Gräskö är utpekade som kärnöar; 21 (27); Den första siffran visar antalet folkbokförda på huvudön.; Det reella befolkningsantalet är regelmässigt högre. (Länsstyrelsen Stockholm, Skärgårdsfakta 2019, siffror för 2018)",
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
      "url": "https://roslagen.se/oar/grasko-en-badvanlig-o-i-fjarden/",
      "org": "roslagen.se",
      "vad": "",
      "last": "2026-09-29",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 30 SEPTEMBER 2026; Furusund …; Gräskö …; GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026 — Furusund …, Gräskö … = 25 min; Gräskö finns även i höst-/vintertabellen 1 oktober–12 december",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h27.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, 27A STOCKHOLM – VAXHOLM – NORRSUND – ARHOLMA, Strömkajen (Stockholm), Gräskö; restiden Strömkajen till Gräskö, 3 h 00 till 3 h 35 min, är uppmätt i 27A",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s27.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026, 27A STOCKHOLM – VAXHOLM – NORRSUND – ARHOLMA / NORRTÄLJE, Gräskö",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.linjetidtabeller.se/",
      "org": "waxholmsbolaget.linjetidtabeller.se",
      "vad": "Beställ tryckta tidtabeller, Furusund - Östernäs - Söderöra - Bromskär / Rödlöga, Furusund - Högmarsö - Solö; listan har ingen tabell för linje 24 eller 26",
      "last": "2026-11-17",
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
      "url": "https://geodata.naturvardsverket.se/handlingar/rest/dokument/1031976",
      "org": "geodata.naturvardsverket.se",
      "vad": "Inom skötselområde 3 låg under en lång period Axel Sjöbergs ateljé. Numer återfinns endast spår av grunden till ateljén.",
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
      "vad": "Långviksskär, Hallskär listas som Naturhamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://visitvarmdo.com/utbud/langviksskars-naturreservat/",
      "org": "visitvarmdo.com",
      "vad": "Han skaffade hus och ateljé på ön och skildrade i nästan 40 år i text, måleri och fotografi livet på ön.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "storholmen": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-lidingo-stad.html",
      "org": "havochvatten.se",
      "vad": "Här ser du badplatserna som kommunen har registrerat., Fågelöudde, Kottlasjön, badviken, Käppalabadet, Sticklinge udde, Sandviksbadet, Södergarn ; ingen av dem ligger på Storholmen.",
      "last": "2026-11-02",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/stad-politik/om-lidingo/lidingo-skargard/",
      "org": "lidingo.se",
      "vad": "dagsverkstorp under Frösviks säteri från 1780-talet, under 1800-talets senare del, byggdes flera sommarvillor på bland annat Duvholmen, Stora Fjäderholmen, Stora Höggarn och Storholmen, Villa Kassman (”Slottet”) på Storholmen som dock tog form först 1917, Efter bankir Kassmans förvärv av Storholmen 1917 byggdes den då befintliga sommarvillan från 1909 om, Kassmans konkurs vid 1920-talets början då försäljningen av tomter på Storholmen och grannholmarna påbörjades, mellan cirka 1925 och 1935, Sammanlagt bildades cirka 250 fastigheter för sommarboende., i dag finns cirka 80 permanenta hushåll",
      "last": "2026-11-02",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/trafik-infrastruktur/ta-dig-fram/batpendla/",
      "org": "lidingo.se",
      "vad": "Vissa avgångar fortsätter från Ropsten till Storholmen. Dessa turer går Ropsten – Tranholmen – Ekudden – Sticklinge brygga – Storholmen södra, Storholmen södra – Mor Annas brygga – Storholmen södra – Storholmen östra – Frösvik – Storholmen norra – Sticklinge brygga – Ekudden – Tranholmen – Ropsten, Båten åker inte till Storholmen östra, Frösvik och Storholmen norra under vintertid om det ligger is., Vid isläggning så kommer det finnas information om det här på sl.se och på hållplatserna., Pendelbåtslinjen 80 trafikerar sträckan Ropsten-Nybroplan, bryggor: Ropsten Frihamnen Lidingö/Dalénum Nacka Strand Blockhusudden Kvarnholmen (Nacka) Finnboda (Nacka) Saltsjöqvarn (Nacka) Allmänna gränd (Djurgården) Nybroplan, Båtarna som kör mellan Nybroplan och Ropsten har plats för 30 cyklar ombord, och de som kör mellan Ropsten och Storholmen har plats för 15 cyklar., Köpa biljett, SL:s webbplats.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://lidingo.se/kultur-fritid/idrott-och-friluftsliv/bad-och-simhallar/",
      "org": "lidingo.se",
      "vad": "Sticklinge/Sandvik, Sticklingebadet ligger längst ut på norra Sticklinge och har en fin sandstrand. Här finns en beachvolleybollplan och torrtoalett., På grusytan vänster om Sticklingebadet vid bryggan finns p-platser för rörelsehindrade.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://api.openstreetmap.org/api/0.6/map?bbox=18.100,59.384,18.124,59.395",
      "org": "api.openstreetmap.org",
      "vad": "Sticklinge brygga (nod 3672291814, amenity=ferry_terminal), Sandviksbadet (nod 12839993890, leisure=bathing_place); uppmätt i OpenStreetMap 2026-11-03: 150 m fågelvägen mellan noderna, strandens polygon (relation 15014999, natural=beach) 120 m från bryggan",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h80.pdf",
      "org": "SL",
      "vad": "Ropsten–Storholmen, Giltig 17 augusti–12 december 2026, Storholmen södra, Storholmen östra, Storholmen norra ; uppmätt i tidtabellen: restid från Ropsten 28 min till Storholmen södra, 37 min till Storholmen östra och 50 min till Storholmen norra; måndag–fredag fortsätter 5 av 12 turer från Ropsten till Storholmen östra, Frösvik och Storholmen norra, lördag, söndag och helgdag alla 8.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://sl.se/biljetter/sa-koper-du-biljetten",
      "org": "SL",
      "vad": "Om du ska åka buss, pendelbåt eller någon annan spårvagn/lokalbana kan du inte använda kontanter.",
      "last": "2026-10-29",
      "myndighet": false
    },
    {
      "url": "https://storholmensjokrog.se/",
      "org": "storholmensjokrog.se",
      "vad": "Skärgårdsrestaurang utanför Lidingö (sidans titel), Vår meny, Boka bord, Storholmen Sjökrog ligger på den östra sidan av Storholmen., Välj gärna Östra Storholmens brygga, därifrån är det bara någon minuts promenad till restaurangen., För aktuella öppettider och event, följ oss gärna på våra sociala medier eller kontakta oss direkt.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/tidtabeller",
      "org": "Waxholmsbolaget",
      "vad": "Anslutningar med SL-trafiken finns inte längre i tidtabellerna, med bara Waxholmsbolagets trafik, Du hittar all SL-trafik på sl.se",
      "last": "2026-10-29",
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
      "vad": "Långskärs naturreservat ligger i ytterskärgården, omgivet av Nämdöskärgårdens nationalpark. Hit tar du dig lättast med egen båt.; Reservatet omfattar ett femtiotal öar; Markägare: privat; Förvaltare: Markägaren efter samråd med Länsstyrelsen; ha okopplad hund eller katt eller annat husdjur; tälta mer än två dygn; elda",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/langviksskar.html",
      "org": "Länsstyrelsen Stockholm",
      "vad": "Ta med egen mat och dryck – inget sådant finns att köpa i nationalparken. Det finns också begränsat med dricksvatten. Du kan fylla din vattenflaska på Bullerön",
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
      "vad": "Hit tar du dig lättast med egen båt.; Det här är ett litet reservat som omfattar södra delen av ön Storskär. Ön ligger i Svartlögafjärden 4 kilometer norr om Möja.; ha okopplad hund; tälta mer än ett dygn i följd; göra upp eld.; Informationstavla; Markägare: privat; Förvaltare: Länsstyrelsen; Läs de fullständiga föreskrifterna i beslutet för Storskärs naturreservat; Beslut och skötselplan Storskärs naturreservat 1968; Skyddat sedan: 1968; Storlek: 8,9 hektar; Kommun: Österåker",
      "last": "2026-11-17",
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
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/kulturmiljoer/sandvikens-fiskelage.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Sandvikens fiskeläge är beläget på den nordligaste delen av norra Ulvön. Fiskeläget ligger vid en öppen vik med sandstrand; Stugorna hyrs ut sommartid och området är öppet för allmänheten.",
      "last": "2026-10-20",
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
      "vad": "Vi håller öppet under sommarsäsongen runt mitten av juni till mitten av augusti.; 18:e juni – 8:e augusti 2026; Sommaren 2027 startar om …",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://hkship.se/pdf/turlista.pdf",
      "org": "hkship.se",
      "vad": "Fri parkering i Ullånger, Docksta och Barsta; ULVÖN 2026; Dagliga turer med m/s Kusttrafik; 15 juni – 16 augusti; … Ullånger; … Mjällomslandet; … Ulvöhamn",
      "last": "2026-10-20",
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
      "url": "https://www.hkship.se/pdf/turlista.pdf",
      "org": "hkship.se",
      "vad": "ULVÖN; 2026; Dagliga turer med m/s Kusttrafik; 15 juni – 16 augusti; Avgång; Pris",
      "last": "2026-11-07",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/stader-platser/ulvon",
      "org": "hogakusten.com",
      "vad": "Ulvöarna ligger 30 km söder om Örnsköldsvik; Ulvön är vår skärgårds största turistiska besöksmål med stora kulturella värden tack vare välbevarade sjöbodar, bostadshus och gistvallar; kallas ibland för Bottenhavets pärla eller Norrlands Sandhamn",
      "last": "2026-10-20",
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
      "url": "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/skargard/farja-till-ulvon",
      "org": "hogakusten.com",
      "vad": "Ingen av färjorna är bilfärjor så det är inte möjligt att ta med bilen till Ulvön; Parkeringen i Köpmanholmen är avgiftsbelagd. Parkeringarna i Ullånger och Docksta är gratis",
      "last": "2026-10-20",
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
      "vad": "Turlista 14 sep - 31 okt 2026; Köpmanholmen …, Ulvöhamn …; Köpmanholmen …, Ulvöhamn …; Turlista 1 nov - 23 dec 2026",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://mfulvon.se/",
      "org": "mfulvon.se",
      "vad": "Avgång … från Köpmanholmen till Ulvöhamn (via Strängöarna och Fjären)",
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
      "url": "https://www.sandvikens-fiskelage-ulvon.se/boende/",
      "org": "sandvikens-fiskelage-ulvon.se",
      "vad": "Här finns 28 stugor för uthyrning enligt följande:; 15 fiskestugor i angränsning till stranden.; Åtta sjöbodar direkt vid stranden.; Fem stugor ligger vid skogsbrynet med utsikt över viken.; Alla stugor har kyl/frys samt spis och mikrovågsugn.; Det finns två servicehus på området med dusch, toalett samt diskmöjligheter. Ett flertal vattenposter finns i angränsning till stugorna då det ej finns rinnande vatten i stugorna. Kom ihåg att ta med sänglinne och handdukar.; Denna stuga är dessutom den enda stuga som det finns rinnande vatten i diskhon",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://www.sandvikens-fiskelage-ulvon.se/",
      "org": "sandvikens-fiskelage-ulvon.se",
      "vad": "Fiskeläget är ett kulturreservat sedan 2005.; Här har du tillgång till en fantastisk sandstrand; Den transfer som ingår i stugpriset gäller t/r Fjären-Sandviken för din ordinarie ankomst/avresedag, lördag eller onsdag under perioden 27/6 - 8/8 2026.",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://www.sandvikens-fiskelage-ulvon.se/tjanster/",
      "org": "sandvikens-fiskelage-ulvon.se",
      "vad": "Transfer t/r Fjären-Sandviken enbart MF Ulvöns turer.; Sandvikens Fiskeläge är ett kulturreservat och därav råder det tältningsförbud i hela området",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://ulvohamnkrog.se/",
      "org": "ulvohamnkrog.se",
      "vad": "Du hittar oss direkt på bryggan i skärgårdsidyllen Ulvöhamn. Här kan du äta, dricka gott och umgås till ljudet av vågorna som skvalpar under vår gamla sjöbod. Vissa kvällar har vi lite extra trevligt då vi bjuder på musikunderhållning.; Därför serverar vi enkel och god mat med en touch av hav & land; På vår trevliga uteservering sitter du på första parkett direkt vid havet; Vår restaurang har öppet varje dag från …, fram till 31 augusti.; Vi har öppet alla helger i september, sen stänger vi för säsongen.",
      "last": "2026-10-20",
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
    },
    {
      "url": "https://www.ulvon.info/mat-logi/almagrand/",
      "org": "ulvon.info",
      "vad": "Almagränd är döpt efter surströmmingskungen Fridolf Nordqvists hustru Alma och är inrymt i Fridolfs gamla sjöbod, där den berömda surströmmingen tillverkades fram till 1960-talet. Idag är Almagränd restaurang med blandad mat, bland annat husmanskost och pizza. Telefon till Almagränd: 0660-224132.",
      "last": "2026-10-20",
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
      "vad": "Cirka 500 meter från terminalen finns en inhägnad långtidsparkering som är öppen … (övrig tid låst); parkeringen som har cirka 165 platser",
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
      "url": "https://www.borgholm.se/uppleva-och-gora/badplatser/",
      "org": "borgholm.se",
      "vad": "Här ansvarar kommunen för renhållningen; Dovreviken; Sandvik; Köpingsvik; Sjöstugan; Böda hamn; Klinta Bodar; Kommunen tar som rutin tre vattenprover per sommar och strandbad. Ett prov tas på försäsong i början av juni och två prover under själva badsäsongen i juli-augusti.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.borgholm.se/wp-content/uploads/2020/01/Allm%C3%A4nna-lokala-ordningsf%C3%B6reskrifter-KF191118_221.pdf",
      "org": "borgholm.se",
      "vad": "Antagen av kommunfullmäktige 2019-11-18 §221; Under tiden 1 juni – 31 augusti får hundar inte vistas på EU-klassade; badplatser på kommunens mark, undantaget där det särskilt anslås att det; är en hundbadplats.  Runda 11 (sr02-k005): texten säger nu det föreskriften säger.",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.borgholm.se/badplatser/",
      "org": "borgholm.se",
      "vad": "Här ansvarar kommunen för renhållningen, Klinta Bodar, Klinta bodar, strax norr om badet i Köpingsvik., Vid badplatserna Klinta Bodar och Sjöstugan finns parkering för rörelsehindrade samt ramp i anslutning till bryggan för att ta sig ned i och upp ur vattnet., Du får inte ha med dig hund till allmänna badplatser mellan 1 juni och 31 augusti, enligt kommunens lokala ordningsföreskrifter.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/naturreservat/bodakustens-ostra.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "Dynområdet med flygsand är ett av Sveriges största, Från Fagerrör till Trollskogen går en järnväg som anlades i början av 1900-talet för att forsla ut timmer från kronoparken. Järnvägen används idag som museijärnväg med turisttrafik under sommaren.",
      "last": "2026-09-27",
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
      "vad": "Reservatet ligger på Ölands nordostligaste udde, gammal tallskog med stormvridna träd, mäktiga ekar klädda i murgröna, klapperstenstränder, Trollskogen är ett av Ölands mest besökta naturområden",
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
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%96land",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min Karta, sökning \"Öland\" → Öland | Borgholm | Trakt, SWEREF 99 TM omräknat till WGS 84",
      "last": "2026-09-29",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/evenemang-och-upplevelser/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/sodra-olands-odlingslandskap/",
      "org": "raa.se",
      "vad": "består av flacka hällmarker på hård kalkberggrund, Stora Alvaret dominerar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/aktuellt-i-lanet/kalmar/pa-gang/vi-forbattrar-i-kalmar-lan/broarbeten-i-kalmar-lan/",
      "org": "Trafikverket",
      "vad": "Från augusti 2026 till 31 mars 2027, Trafiken påverkas genom att vi stänger ett körfält i vardera riktning och sänker hastigheten, Tänk också på att restiden kan bli längre",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/om-oss/nyheter/lansnyheter/kalmar/2026/underhallsarbeten-pa-olandsbron--risk-for-koer/",
      "org": "Trafikverket",
      "vad": "6 april till 15 juni och 16 augusti till 21 september",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.borgholmsslott.se/",
      "org": "borgholmsslott.se",
      "vad": "I 900 år har Borgholms slott stått på sin klippkant och blickat ut över Kalmarsund, innan palatset förstördes vid en brand i början av 1800-talet, Guidade turer",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.borgholmsslott.se/oppettider/",
      "org": "borgholmsslott.se",
      "vad": "28 mars – 30 april: Dagligen …, 1 oktober – 1 november: Dagligen …, Hundar är välkomna till Borgholms Slott.",
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
      "vad": "Sjömarker, alvarmarker, odlingsmarker och radbyarna på södra Öland utgör världsarvet, Genom det karga och vackra världsarvet löper Mörbylångaleden, som är en av Svenska Turistföreningens tolv signaturleder. Upplev hela leden från Färjestaden ner till Ottenby",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.oland.se/varldsarvet",
      "org": "oland.se",
      "vad": "Den 4 - 6 september går flera arrangörer samman och genomför en helg med extra många världsarvsaktiviteter, Öppna kyrkor, vandringar, konserter, utställningar och familjeaktiviteter",
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
      "vad": "Sista helgen i september anordnas, som omfattar hela",
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
  "vinga": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/vinga.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1987, cirka 559 hektar, \"Klipphällar möter buskiga snår av slån, björnbär, nypon och vinbär\", sparris, västkustarv, strandkål och marviol, gök och näktergal, Koholmen som häckningsplats",
      "last": "2026-10-19",
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
      "url": "https://www.stromma.com/sv-se/goteborg/utflykter/guidad-batutflykt-till-vinga/",
      "org": "Strömma",
      "vad": "Fyrön Vinga ligger i den yttre skärgården i Kattegatt och är Göteborgs västligaste punkt.",
      "last": "2026-10-19",
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
      "vad": "Vår och hösthelger 2026; 17 april – 21 juni och 24 aug – 15 okt; Kiosken öppen lördag och söndag; Sommarsäsong 2026; 22 juni – 23 augusti; Kiosken öppen varje dag",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://vinga.nu/turbatar/",
      "org": "Winga Vänner",
      "vad": "Kastor Boat trips, Hönö Klåva; Skärgårdsturer (3,5 tim) från Hönö Klåva med sälstopp och makrillfiske och stopp på Vinga 2 tim.",
      "last": "2026-10-20",
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
      "url": "https://vinga.nu/museum/",
      "org": "Winga Vänner",
      "vad": "När man kommer in i museet och träder in i det första rummet till höger, möts men av Evert Taube som sitter på en gammal kökssoffa.; förvärvade Winga Vänner från Liseberg",
      "last": "2026-10-19",
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
      "last": "2026-10-19",
      "myndighet": false
    }
  ],
  "branno": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-goteborgs-stad/branno-ramsdal.html",
      "org": "havochvatten.se",
      "vad": "Brännö Ramsdal är ett EU-bad.; Sandstrand och bryggor omgärdade av skyddande klippor. Badplatsen är i Brännöföreningens regi. I badvikens mynning finns ålgräs, som utgör viktiga uppväxt- och födosöksområden för många fiskarter.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/galtero.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Den västra delen; som inte ingår i naturreservatet; är övningsområde för Försvarsmakten. Innan man besöker Galterö kan det därför vara bra att kolla om det pågår skjutövningar i Göteborgs skärgårdsskjutfält på Försvarsmaktens webbplats",
      "last": "2026-11-17",
      "myndighet": true
    },
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
      "vad": "Brännö Brygga är vackert belägen i Brännö Husvik; Torsdag 25 juni; Torsdag 30 juli; Lördag 8 aug; Brännö Rödsten (gångavstånd cirka 30 minuter till Brännö Brygga); Le Shack har som vanligt öppet under danserna",
      "last": "2026-11-17",
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
      "url": "https://brannoforeningen.se/kulturevenemang/dans-pa-branno-brygga/",
      "org": "brannoforeningen.se",
      "vad": "Dans på Brännö Brygga 2026; Vi är beroende av våra funktionärer för att kunna hålla i danserna.; belägen i Brännö Husvik med utblick mot västerhavet och Vinga fyr.; Torsdag 25 juni; Band: Brännöpojkarna; Lördag 8 aug; Le Shack har som vanligt öppet under danserna och erbjuder ett varierat utbud av mat och dryck, glass och godis.; Brännö Rödsten (gångavstånd cirka 30 minuter till Brännö Brygga)",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://brannovardshus.se/oppettider",
      "org": "brannovardshus.se",
      "vad": "14 Februari – 31 maj 2026, 1 JUNI – 23 JUNI 2026, Onsdag …/20, 24 JUNI – 9 AUGUSTI 2026, Öppet alla dagar …, 10 AUGUSTI – 13 DECEMBER 2026, Rumsuthyrning på Pensionat Baggen och Värdshusets Gästrum är möjlig året runt . 1–23 juni är restaurangen öppen även onsdagar, så den tidigare texten (torsdag–söndag utanför högsäsongen) var inte helt rätt; klockslag struket (sidan anger att stängningstiden varierar).",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/branno",
      "org": "goteborg.com",
      "vad": "levande skärgårdsö i södra delen av Göteborgs skärgård med cirka 900 bofasta invånare, Sommargästerna började inta ön på 1930-talet och numera är pendlarna i klar majoritet, jordbruket, lots-historien, tullarna och sjöfarten, Från berget vid den gamla lotsutkiken, på öns högsta punkt, har du utsikt från Vinga till inloppet till Göteborg, hembygdsmuseet mitt på ön",
      "last": "2026-11-17",
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
      "url": "https://www.goteborg.com/guider/en-guide-till-skargarden-sodra-oar",
      "org": "goteborg.com",
      "vad": "obebodda grannön Galterö",
      "last": null,
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
      "url": "https://styrsobolaget.se/dans-pa-branno-brygga/",
      "org": "styrsobolaget.se",
      "vad": "M/S Kungsö avgår på torsdagar från Stenpiren; Båten ligger vid kajen under hela kvällen; När musiken tonat ut är det dags att ta sig hem igen; Observera att finaldansen är på en lördag, 8/8.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/03/25-056-Annons-Ockero-Tidning-252x370-3.pdf",
      "org": "transdev.se",
      "vad": "BRÄNNÖ HUSVIK; Eriksbergs färjeläge; Klippan; Köpstadsö; Styrsö Tången; 25/6 – 30/7; TORSDAGAR; OBS! Tidtabellen är preliminär  Runda 11 (sr03-k007): mellanstoppen och perioden står bara i den preliminära tabellen, och det står i texten.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-281-282-Liggande-A3.pdf",
      "org": "transdev.se",
      "vad": "282 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Styrsö Tången-Brännö Husvik och omvänt, Hösttidtabell 20260823 - 20261212 . Raden Brännö Husvik har måndag–fredag ankomsterna …, lördag …, söndag ….",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://transdev.se/wp-content/uploads/sites/5/2026/07/Hosttidtabell-283-Liggande-A4.pdf",
      "org": "transdev.se",
      "vad": "283 Hösttidtabell 20260824 - 20261212, Saltholmen-Asperö-Brännö Rödsten . Restiden räknad ur tabellen, måndag–fredag: Saltholmen … → Brännö Rödsten … (18 min), … (23 min via Asperö Östra).",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vasttrafik.se/om-vasttrafik/blogg/upptack-zon-a/",
      "org": "Västtrafik",
      "vad": "tar du dig dit med en biljett för zon A; Upptäck charmen på de bilfria öarna och ta dig dit med våra båtlinjer från Saltholmen. Från Brännö i norr",
      "last": "2026-11-25",
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
      "url": "https://www.raa.se/app/uploads/2024/04/Vastra-Gotaland-O_riksintressen.pdf",
      "org": "raa.se",
      "vad": "Den senare utvecklingen för fisket med tätare bebyggelse och koncentrationen kring hamnen framträder särskilt väl vid Styrsö Tången. (Riksantikvarieämbetet, riksintresse för kulturmiljövården Styrsö [O 7])",
      "last": "2026-11-10",
      "myndighet": true
    },
    {
      "url": "https://api.scb.se/OV0104/v1/doris/sv/ssd/MI/MI0812/MI0812A/OarEjBro01",
      "org": "scb.se",
      "vad": "Befolkning, antal folkbokförda; 1480Q102; 2020; 1341 (värden i svaret på en fråga med Oar=1480Q102 Styrsö och Tid=2020; 2020 är tabellens senaste år)",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.statistikdatabasen.scb.se/pxweb/sv/ssd/START__MI__MI0812__MI0812A/OarEjBro01/",
      "org": "scb.se",
      "vad": "Befolkning, antal folkbokförda:; 31 december respektive år (referenstiden)",
      "last": "2026-11-07",
      "myndighet": true
    },
    {
      "url": "https://www.1177.se/hitta-vard/kontaktkort/Narhalsan-Styrso-vardcentral-Styrso/",
      "org": "1177.se",
      "vad": "Brattenvägen 13, 43084, Styrsö; Båt till Styrsö Bratten. Följ Brattenvägen cirka 150 m. På höger sida ligger vårdcentralen.",
      "last": "2026-11-07",
      "myndighet": false
    },
    {
      "url": "https://www.1177.se/hitta-vard/kontaktkort/Folktandvarden-Styrso-Goteborg-Styrso/",
      "org": "1177.se",
      "vad": "Folktandvården Styrsö Göteborg, Styrsö; Brattenvägen 13, 430 84, Styrsö",
      "last": "2026-11-07",
      "myndighet": false
    },
    {
      "url": "https://api.openstreetmap.org/api/0.6/map?bbox=11.7570,57.6150,11.7700,57.6225",
      "org": "api.openstreetmap.org",
      "vad": "Styrsö Sandvikshamn; Styrsö Tången ; uppmätt (haversine): marinan Styrsö Sandvikshamn (node 1484105382) ligger 557 m fågelvägen sydväst om marinan Styrsö Tången (node 3711149062).",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "http://www.batebacken.se/",
      "org": "batebacken.se",
      "vad": "Tätt inpå kajkanten, omgivet av det gamla fiskarsamhället hittar du vår lilla skärgårdskrog på Styrsö Tången; Båtebackens Caferestaurang ligger på Styrsö Tången intill Snobbrännan; bortom farleden ser du bl.a. öarna Brännö och Känsö; När solen går ner bakom Känsö Torn då vet vi att nu är det högsommar",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://batebacken.se/",
      "org": "batebacken.se",
      "vad": "Tätt inpå kajkanten, omgivet av det gamla fiskarsamhället hittar du vår lilla skärgårdskrog på Styrsö Tången, som drivs av Börjessons sjötaxi & charterbåtar, framförallt skaldjur, kanske vill du ha något hembakat till, Lokalen har plats för drygt 40 personer, uteservering med plats för ytterligare cirka 40 personer, Snobbrännan, går utanför vårt fönster och bortom farleden ser du bl.a. öarna Brännö och Känsö",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.brattenswardshus.se/restaurang/",
      "org": "brattenswardshus.se",
      "vad": "Färska handskalade räkor, ägg, majonäs; Rödspätta, pommes, remouladsås, sallad; Vi har även glutenfri pizza; Hamburgartallrik",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.brattenswardshus.se/kontakta-oss/",
      "org": "brattenswardshus.se",
      "vad": "Bratten’s Wärdhus ligger bara några meter från hållplatsen",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/styrso",
      "org": "goteborg.com",
      "vad": "Från öns högsta punkt, Stora Rös, kan du njuta av en storslagen utsikt över hela skärgården. Härifrån kan du vandra på naturstigarna till Brännholmsviken och Styrsö Skäret; Det finns en broförbindelse mellan Styrsö och Donsö så du kan promenera och cykla emellan de två öarna",
      "last": "2026-11-10",
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
      "vad": "Buss 114, Ö-snabben, restid cirka 25 minuter (Göteborg & Co, nivå 3; bara namnet Ö-snabben)",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/guide-ata-och-fika-i-goteborgs-skargard",
      "org": "goteborg.com",
      "vad": "Beger du dig istället till färjeläget Styrsö Bratten hittar du Brattens Wärdshus där du kan kila om för både mat och fika",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/styrso-brattenbadet/",
      "org": "goteborg.com",
      "vad": "Badet ligger cirka 300 meter från färjeläget Styrsö Bratten; Vid badplatsen finns en mindre sandstrand, brygga med badstegar, klippor och en gräsyta",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/kusthotellet-styrso",
      "org": "goteborg.com",
      "vad": "med 50 rum, varav 10 sviter, restaurang, wellness-område, uppvärmd utomhuspool och gym",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/tangbaren-styrso/",
      "org": "goteborg.com",
      "vad": "Vägg i vägg med restaurangen ligger även Tångbarens deli",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://www5.goteborg.se/prod/fastighetskontoret/etjanst/planobygg.nsf/vyFiler/Styrs%C3%B6%20-%20Bost%C3%A4der%20och%20teknisk%20anl%C3%A4ggning%20vid%20Styrs%C3%B6%20T%C3%A5ngenv%C3%A4g-Plan%20standardf%C3%B6rfarande%20-%20granskning-Mobilitets-%20och%20parkeringsutredning/$File/Mobilitets-%20och%20parkeringutredning.pdf",
      "org": "goteborg.se",
      "vad": "Eftersom biltrafik inte är tillåten på ön måste parkering för bil anordnas på fastlandet (Göteborgs Stad, mobilitets- och parkeringsutredning 2019-04-29)",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://goteborg.se/wps/portal/start/omsorg-och-stod/aldre/boenden-for-aldre/vard-och-omsorgsboende/hitta-vard--och-omsorgsboende?id=2371",
      "org": "goteborg.se",
      "vad": "Södra Skärgårdens Vård- och omsorgsboende ligger på Styrsö i Göteborgs södra skärgård och drivs av Göteborgs Stad; det lugn som bara kan uppstå på en bilfri ö; Södra Skärgården ligger fem minuters promenad från färjeläget Styrsö Bratten där färjorna 281 och 282 lägger till.; Boenden för äldre",
      "last": "2026-11-07",
      "myndighet": false
    },
    {
      "url": "https://goteborg.se/wps/portal/enheter/styrsoskolan",
      "org": "goteborg.se",
      "vad": "Styrsöskolan F-9",
      "last": "2026-11-07",
      "myndighet": false
    },
    {
      "url": "https://goteborg.se/sodraskargardensbibliotek",
      "org": "goteborg.se",
      "vad": "Södra Skärgårdens bibliotek på Styrsö är en mötesplats för barn och vuxna; Brattenvägen 48",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://www5.goteborg.se/prod/fastighetskontoret/etjanst/planobygg.nsf/vyFiler/Styrs%C3%B6%20-%20Bost%C3%A4der%20och%20teknisk%20anl%C3%A4ggning%20vid%20Styrs%C3%B6%20T%C3%A5ngenv%C3%A4g-Plan%20standardf%C3%B6rfarande%20-%20granskning-Planbeskrivning/$File/Planbeskrivning.pdf",
      "org": "goteborg.se",
      "vad": "Till Bratten kom de första sommargästerna redan 1845 och badbassäng anlades på 1850-talet.; Badorten vid Bratten avvecklades succesivt under denna period och den stora badrestaurangen förstördes vid en brand 1960.; Den ersattes med en ny av sten 1751 (Göteborgs Stad, planbeskrivning för Styrsö Tångenväg, granskning december 2019)",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://goteborg.se/wps/portal/start/uppleva-och-gora/idrott-motion-och-friluftsliv/simma-och-bada/badplatser/hitta-badplatser-utomhusbad?id=3700",
      "org": "goteborg.se",
      "vad": "Vid Styrsö Bratten kan du bada från strand eller brygga, cirka 300 meter från färjeläget; Var försiktig - vattnet är strömt i farleden!; Toalett öppen under badsäsong; Hund tillåtet Ja",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://goteborg.se/wps/portal/start/uppleva-och-gora/idrott-motion-och-friluftsliv/simma-och-bada/badplatser/hitta-badplatser-utomhusbad?id=3701",
      "org": "goteborg.se",
      "vad": "en liten strand för de minsta och en badholme med bryggdäck och badstegar för de större; Friluftstoalett öppen 15 maj-15 september; Närmaste hållplats: Styrsö Tången. Från hållplatsen är det 1,2 kilometer till badplatsen; Hund tillåtet Ja",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://goteborgsstadsmuseum.se/uploads/2021/05/bevarandeprogram_gbg_vol_2_del_2.pdf",
      "org": "goteborgsstadsmuseum.se",
      "vad": "Inom norra delen finns fyra bebyggelsegrupper som har olika karaktär: jordbruksbyn med kyrkan mitt på ön, strandområdet vid Halsvik, fiskeläget i Tången och f d badortsområdet kring Bratten.; På 1500-talet var Styrsös invånare fiskarbönder.; Ön var delad mellan tre gårdar; Bebyggelsen låg i huvudsak inom nuvarande Kyrkbyn; Den ersattes med en ny av sten 1751; Kyrkbyn eller Styrsö by ligger ungefär mitt på ön intill Styrsö gärde med f d åkermarken.; Halsviksområdet ligger sydväst om byn vid stranden och härifrån bedrevs byns fiske.; en grupp sjöbodar vid vattnet; I Halsvik bosatte sig flera skeppare och där uppfördes relativt stora bostadshus.; Under 1800-talet blev Tången ett tätt bebyggt fiskeläge med flera bryggor längs stranden.; Bebyggelsen ligger tätt längs smala krokiga vägar.; Styrsö Bratten med sina relativt stora och påkostade sommarvillor är en värdefull miljö som visar att detta var södra skärgårdens viktigaste badort och mest fashionabla sommargästområde. (Göteborgs Stad, Kulturhistoriskt värdefull bebyggelse i Göteborg – ett program för bevarande, del II)",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://guesthouse-styrso.se/",
      "org": "guesthouse-styrso.se",
      "vad": "Guesthouse Styrsö Tången; We are open for bookings for the summer season June – August 2026; Our guesthouse is located upstairs in an old art noveau villa and has a private entrance, four bedrooms, kitchen and a bathroom. We can accommodate up to 10 guests; We are situated a six minute walk from the ferry station Tången",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.ica.se/butiker/nara/goteborg/ica-tangen-1003744/",
      "org": "ica.se",
      "vad": "ICA Tången Styrsö Hamnväg 30, Styrsö; Butiken öppet: Måndag-fredag; Butiken öppet: Lördag; Butiken öppet: Söndag; Apoteksombud",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://kusthotelletstyrso.se/hitta-till-oss/",
      "org": "kusthotelletstyrso.se",
      "vad": "Kusthotellet ligger på nära gångavstånd från hållplatsen Styrsö Skäret.",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://kusthotelletstyrso.se/",
      "org": "kusthotelletstyrso.se",
      "vad": "Skärgårdshotell med spa, restaurang och havet runt knuten; Hos oss finns plats för både avkoppling och gemenskap - året runt",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://kusthotelletstyrso.se/restaurangen/",
      "org": "kusthotelletstyrso.se",
      "vad": "Astri Bar & Matsal, njut i restaurangen, vid baren eller, när vädret tillåter, ute på vår terrass, Du behöver inte vara hotellgäst för att besöka oss., Alla är varmt välkomna att njuta av vår frukostbuffé",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://styrsobolaget.se/tidtabeller/",
      "org": "styrsobolaget.se",
      "vad": "För södra skärgårdstrafiken är sommarturlistan förlängd och startar därför tidigare och slutar senare än övrig kollektivtrafik.",
      "last": "2026-11-09",
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
      "url": "https://styrsohamn.se/",
      "org": "styrsohamn.se",
      "vad": "Styrsö Sandvikshamnen; Sandvikshamnen erbjuder ett 50 tal båtplatser designerade till gästbåtar.; I Sandvikshamnen får båtgäster tillgång till toaletter, duschar, el, färskvatten, sugtömmning samt en miljöstation.",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://tangbaren.se/batplatser/",
      "org": "tangbaren.se",
      "vad": "Hos Tångbaren hittar du 12 stycken gästplatser med akterförtöjning",
      "last": "2026-11-09",
      "myndighet": false
    },
    {
      "url": "https://tangbaren.se/",
      "org": "tangbaren.se",
      "vad": "Under lågsäsong (vår fram till midsommar) tar vi emot bordsbokningar för alla sällskapsstorlekar; Under högsäsong (från midsommar till 23 augusti) har vi ett högre tryck i restaurangen och tar därför endast emot bokningar för sällskap om 10 personer eller fler; Mindre sällskap hänvisas till drop in",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf",
      "org": "Västtrafik",
      "vad": "281 Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; 282 Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Styrsö Tången–Brännö Husvik; Gäller 24 aug – 12 dec 2026; ( ) Anlöps i omvänd riktning. . Restiden är uppmätt i tabellen som skillnaden mellan avgång Saltholmen och ankomst vid bryggan för samtliga turer måndag–söndag; spridningen beror på om turen går via Asperö Östra och Köpstadsö. Längsta resan till Skäret, 36 min, är en tidig lördagstur på linje 281 som går till Vrångö först och angör Skäret i omvänd riktning.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20261213__20270606__95d872ec-b99b-40c5-b0db-6cda6c7d2b17__1,0__2871349.html",
      "org": "Västtrafik",
      "vad": "Gäller 13 dec 2026 – 6 jun 2027; Linjen trafikeras av Styrsöbolaget.",
      "last": "2026-11-10",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5011__0__LINE__20260817__20261212__b12f79f1-93d4-4a88-b34d-85ab15ce566e__0%2C0__2777978.pdf",
      "org": "Västtrafik",
      "vad": "11 Saltholmen–Ekedal–Centrum–Bergsjön och omvänt; Gäller 17 aug - 12 dec 2026",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5114__0__LINE__20251214__20261212__58f1a45c-85a0-4090-a8fc-de0115454495__1%2C0__2662665.pdf",
      "org": "Västtrafik",
      "vad": "114 Saltholmen–Brunnsparken och omvänt; Gäller 14 dec 2025 - 12 dec 2026 utom 1 juni - 23 aug",
      "last": "2026-10-31",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5009__0__LINE__20260817__20261212__3fffaf75-342e-46b2-8a7f-ce413298e50d__0,0__2777903.pdf",
      "org": "Västtrafik",
      "vad": "Kungssten–Centrum–Angered och omvänt, Gäller 17 aug - 12 dec 2026",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014510900000/",
      "org": "Västtrafik",
      "vad": "Saltholmen - Centrum - Angered, Vi har tyvärr ingen tidtabell för linjen.",
      "last": "2026-11-16",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5283__0__LINE__20260824__20261212__247f5756-c8cb-4894-9e61-df69039cf68b__0%2C0__.pdf",
      "org": "Västtrafik",
      "vad": "Saltholmen–Asperö–Brännö Rödsten och omvänt",
      "last": "2026-10-31",
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
      "url": "https://www.goteborg.com/platser/vrango",
      "org": "goteborg.com",
      "vad": "Bebyggelsen sträcker sig som ett bälte tvärs över ön och både områdena norr och söder om bebyggelsen är skyddade naturreservat; Skärgårdsbåten lägger till i Mittvik; Tvärs över ön, en knapp kilometer från båtens tilläggsplats, finns en stor modern gästhamn med fiskekaj, livsmedelsbutiken Tempo; Besökare hittar post, affär, kiosk, bangolfsbana med mera",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Spårvagn 11, samt linje 9 under sommaren, restid cirka 35 minuter; Buss 114, Ö-snabben, restid cirka 25 minuter; 281, Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; för resor till öarna i södra skärgården räcker en biljett för zon A; Linje 281 och 282 trafikerar sträckan Stenpiren–Styrsö–Donsö–Vrångö, med en total restid på cirka 1 timme och 35 minuter … två turer per dag måndag till fredag, samt även lördag och söndag under sommaren; parkering i områdena Talattagatan och Vikebacken i Långedrag, samt sommartid vid Hinsholmskilen. På Saltholmen finns endast parkering för rörelsehindrade . Västtrafik, tidtabell linje 281 Vrångö–Saltholmen 2026-08-24–2026-12-12, — Saltholmen … → Vrångö … . Tidigare stod linje 283 (går till Asperö och Brännö Rödsten, inte Vrångö).",
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
      "vad": "Hamnen håller öppet mellan 17 april och 15 oktober, variationer kan förekomma",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tempo.se/butiker/tempo-goteborg-vrango/",
      "org": "tempo.se",
      "vad": "TEMPO GÖTEBORG VRÅNGÖ; VRÅNGÖ HAMN",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5281__0__LINE__20260824__20261212__1c833ee0-201d-4ad4-b4c7-07f379ae2238__0%2C0__.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "281 Stenpiren–Saltholmen–Köpstadsö–Styrsö Bratten–Donsö–Vrångö; Gäller 24 aug – 12 dec 2026; Linje 283 från Stenpiren och Lindholmspiren. Båtbyte på Saltholmen. . Restid räknad ur tabellen måndag–fredag: Saltholmen … → Vrångö … (18 min), … (38 min), … (62 min). Från Stenpiren … med byte på Saltholmen, framme … (1 h 19 min); … med byte till …, framme … (1 h 10 min). Stod 'ca 1 h 35 min direkt från Stenpiren' – i höst- och vintertidtabellen byter man båt på Saltholmen.",
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
      "vad": "23/08 2026 - 12/12 2026; 281 Stenpiren-Saltholmen-Köpstadsö-Styrsö Bratten-Donsö-Vrångö och omvänt . Vardagar enligt tabellen (avläst ur den renderade PDF:en, textlagret är sammanblandat): Saltholmen …→Donsö … – 17–40 min, cirka 20 avgångar per vardag.",
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
      "vad": "283 Hösttidtabell 20260824 - 20261212; 283 Stenpiren- Saltholmen-Asperö-Brännö Rödsten och omvänt — Asperö Norra på alla turer, Asperö Östra på vissa; Asperö Norra … → Brännö Rödsten … (4 min)",
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
      "last": "2026-11-25",
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
      "vad": "Waxholmsbolaget (båt till Nåttarö, Aspö, Rånö, Ålö och Landsort), Vid Fiskehamnen i Nynäshamn, nära parkeringsplatser och kollektivtrafik, finner du Waxholmsbolagets båtar som tar dig direkt till öar som Nåttarö, Aspö, Rånö och Ålö., I södra Nynäshamn finns Ankarudden, där du kan ta båten till Landsort, den sydligaste utposten av vår skärgård. Ankarudden är enkelt att nå med buss eller egen bil.",
      "last": "2026-11-17",
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
      "vad": "De cirka 300 båtplatserna ligger väl skyddade innanför norra Europas största flytande vågbrytare. Stadens centrum och station ligger ett stenkast bort. Här finns all tänkbar service som båtbottentvätt, pump out och möjlighet att lämna avfall.; Nynäshamns Gästhamn ligger centralt belägen i stadens fiskehamn, tillsammans med Nynäshamns Besökscenter.; I fiskehamnen kan du även enkelt tanka din båt på Nynäshamns enda sjömack; I Nynäshamns gästhamn finns möjlighet att hyra mindre motorbåtar",
      "last": "2026-11-25",
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
    },
    {
      "url": "https://waxholmsbolaget.se/reseplanering/resmal/landsort",
      "org": "Waxholmsbolaget",
      "vad": "Båtarna till Landsort går från Ankaruddens brygga. Den ligger strax söder om Nynäshamn, och det går SL-trafik mellan Nynäshamn och Ankarudden.",
      "last": "2026-11-09",
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
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "vaxholm.se",
      "vad": "Badet Myrholmsmaren ligger vid sjön Stora Maren. Badplatsen sköts av Tynningö Idrottsförening som också anordnar simskola varje sommar.; Grillplats med fasta bänkar och lösa bord; Omklädningshytt; Under badsäsongen sker vattenprovtagningar var tredje vecka och detta görs mellan 20 juni och 15 augusti i Stockholms län",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/v689.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Höganäs brygga/Norra Tynningö–Östra Tynningö (–Gustavsbergs centrum); Giltig 14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026 — måndag–fredag Norra Lagnö … → Gustavsbergs centrum …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.tynningo.se/information-2/farjeinformation/",
      "org": "tynningo.se",
      "vad": "K–Kallelsetur – turen kallas tidigast 30 minuter före och senast 10 minuter före avgångstid; Räkna med köer på sommaren, speciellt vid storhelger och inför längre ledigheter.",
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
      "vad": "Tidtabell för buss Norra Lagnö – Gustavsberg 424V och 424H",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h2.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "2A STOCKHOLM – HÖGANÄS – VAXHOLM; GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; Höganäs (Tynningö) — måndag–torsdag Strömkajen … → Höganäs …; lördag …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h4.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "4A STOCKHOLM – VAXHOLM – RAMSÖSUND – ÅLSTÄKET; GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026; Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång — Strömkajen … → Norra Tynningö …; Vaxholm … → Norra Tynningö …",
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
      "url": "https://www.varmdo.se/kommunochpolitik/kartorochkommunfakta/historia.4.3251048d16e2a7e784837027.html",
      "org": "varmdo.se",
      "vad": "Flottan hade en ankringshamn vid Djurhamn på Djurö redan under Vasatiden.; Under 1600-talet började en uppdelning av den vidsträckta socknen eftersom det var en lång väg för skärgårdsborna att färdas till socknens medeltidskyrka på centrala Värmdölandet. Då bildades Möja och Djurö som annexförsamlingar.; Därefter återstod tre kommuner inom Värmdös område: Värmdö, Gustavsberg och Djurö. År 1974 skedde en sammanslagning av dessa till dagens Värmdö kommun.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/alltomnaturochfriluftsliv/badplatserivarmdo/vitagrindarnadjurohavsbad.4.18c983316e0536cb189a2ae.html",
      "org": "varmdo.se",
      "vad": "Buss: Hållplats Djurö kyrka. Omkring 200 meters gångväg ner till vattnet.; Omkring 2 km efter Djuröbron, strax före ICA-affären, ligger Vita grindarna på vänster sida av vägen. Parkering finns på området.",
      "last": "2026-11-17",
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
      "vad": "Nämnde vi förresten att det bara tar 43 minuter att ta sig hit från Stockholm?; Ingen färja, bara broar hela vägen ut.",
      "last": "2026-11-17",
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
      "vad": "ICA Nära Djurö Gransbergsvägen 2-4, Djurhamn; Alla dagar …; Postombud",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h433.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Slussen–Djurö; Stavsnäs vinterhamn; Djurönäset; Djurö södra; Djurö kyrka; Djurö skola; Björkås; BYNS GÅRD; 1) Endast påstigning.; n Endast natt mot lördag, söndag och helgdag.; Giltig 17 augusti–12 december 2026  Ur tabellen: lördag och söndag dagtid slutar 433 vid Stavsnäs vinterhamn; nattbussen går till Byns gård.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/sl/h434.pdf",
      "org": "SL (tryckt tidtabell)",
      "vad": "Stavsnäs vinterhamn 2); 2) Endast vissa turer.; Djuröbron 2); Giltig 17 augusti–12 december 2026  Räknat ur tabellen: måndag till fredag går en del turer från Djuröbron direkt in på Djurö utan att stanna vid Stavsnäs vinterhamn (runda 11, sr02-k009, sr02-k027, sb05-k002).",
      "last": "2026-11-25",
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
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-ekero-kommun.html",
      "org": "havochvatten.se",
      "vad": "Här ser du badplatserna som kommunen har registrerat.; listan har ingen badplats på Björkö",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://historiska.se/birka/vad-ar-birka-hovgarden/birka-varldsarvet/",
      "org": "historiska.se",
      "vad": "Historiska museet i Stockholm har mer än 100 000 fynd från Birka . «Skandinaviens mest livliga handelscentrum» och fyndlistan (England, Frankerriket, Bysans) saknade källa.",
      "last": "2026-09-27",
      "myndighet": true
    },
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
      "vad": "Tack vare skriftliga källor vet vi att Ansgar, en ung benediktinermunk, kom till Birka år 830, Här predikade han under ett och ett halvt år och flera av stadens invånare lät döpa sig. Men Birka blev trots det aldrig ett kristet samhälle, levde stadens hedningar och kristna sida vid sida fram till slutet av 900-talet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.raa.se/app/uploads/2023/06/Beslut-Adels%C3%B6-Bj%C3%B6rk%C3%B6-Birka-AB21-RA%C3%84-2021-1675.pdf",
      "org": "raa.se",
      "vad": "På Björkö det forna stadsområdet, omgärdat av fornborgen på Borgberget i söder och stadsvallen i nordöst, ett av landets största gravfält med minst 1600 … gravar (om Hemlanden)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/adelsoleden/",
      "org": "Trafikverket",
      "vad": "Adelsöleden går mellan Munsö och Adelsö på Mälaröarna. Färjeledens längd är 1 000 meter och överfartstiden är sex minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-11-17",
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
      "vad": "Under sommaren (juni-september) kan du övernatta på Birka i ett av våra fina glampingtält. Här sover du bekvämt i ordentliga sängar av hotellstandard. Logi, middag, frukost, musei-entré och guidning ingår. Bokas via stromma.com.",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/resa-hit/",
      "org": "birkavikingastaden.se",
      "vad": "Bryggan ligger vid kolonilotterna och Vikingalekparken; cirka 10 minuters promenad från tunnelbanestationen Vårby gård.; Jungfrusunds brygga ligger vid Jungfrusunds Marina. Bakom Restaurang Jungfrusunds minigolf finns en brygga med en liten bro till ytterligare en brygga; där stannar båten till Birka.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://www.birkavikingastaden.se/hitta-pa-birka/gasthamnen/",
      "org": "birkavikingastaden.se",
      "vad": "Vattnet runt Björkö räknas som ett fornlämningsområde och därför råder det ankringsförbud i viken samt 50 meter ifrån strandkanten",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/birka-vikingastaden/",
      "org": "stromma.com",
      "vad": "Parkeringsplatser finns vid Hembyggdsgården. Gångavstånd till avgångsplats är minst 15 minuter på grusväg genom en kohage. Rekommenderas ej för personer med rörelsehinder.; sedan är det ca 10 minuters bilresa ner till Hovgårdens Hembyggdsgård.; Resa från/till Hovgården måste alltid förbokas; Välj avgång från Hovgården om du vill ha en kort båtresa till Birka (ca 15 min).",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/2027/v44_birka_tidtabell_stockholm_a3s.pdf",
      "org": "stromma.com",
      "vad": "TIDTABELL M/S MÄLAR VICTORIA; 5 MAJ; 24 OKTOBER, 2027; 14 - 23 juni; 28 juni - 8 aug; 20 sep - 24 okt; Dagligen; Lördag - söndag . Räknat ur tabellen: turer varje dag 14 till 23 juni och 28 juni till 8 augusti, bara lördag och söndag 20 september till 24 oktober; 24 till 27 juni och 30 augusti till 19 september har tabellen inga turer. Strömmas sida och tabellen säger olika om veckodagarna 9 till 29 augusti, så de skrivs inte ut.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/2026/birka_tidtabell_stockholm_webb.pdf",
      "org": "stromma.com",
      "vad": "Klara Mälarstrand → Björkö/Birka 2 h–2 h 15 min (…), Vårby → Birka …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.upplevekero.se/se--gora/natur--friluftsliv/badplatser",
      "org": "upplevekero.se",
      "vad": "Här har vi samlat de kommunala badplatserna., Titta därför alltid på vattnet innan du badar. Det är badgästen själv som behöver bedöma om det finns algblomning.; listan har ingen badplats på Björkö",
      "last": "2026-11-03",
      "myndighet": false
    }
  ],
  "lilla-karlso": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Lilla Karlsö är en ö med fågelberg och fårbetade kalkhedar, Lilla Karlsö ligger ca 3,5 km väster om Djupviks fiskeläge i Eksta, Drygt 70 arter fåglar häckar på ön, I Öster- och Västerbergets branter bor tusentals sillgrisslor, tordmular och storskarvar",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.2c30d6f167c5e8e7c0179a/1545313306910/Lilla%20Karls%C3%B6%20SE0340025.pdf",
      "org": "Länsstyrelsen Gotland",
      "vad": "på de båda Karlsöarna finns Sveriges enda fågelberg, Talrikaste häckfåglar är sillgrissla, tordmule med omkring 3000 par vardera",
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
      "vad": "På omkring tre timmar är du framme i Visby",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://naturskyddsforeningengotland.se/fastigheter/lilla_karlso",
      "org": "naturskyddsforeningengotland.se",
      "vad": "Du kan boka resor under perioden, 15 juni 2026, 15 augusti 2026, Guidad rundvandring ingår i priset, max 6 personer, Resan erbjuds av Gotland Sea Guides i samarbete med Naturskyddsföreningen Gotland, Varmt välkommen, att besöka Lilla Karlsö med egen båt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://storakarlso.se/faglarna/",
      "org": "storakarlso.se",
      "vad": "en stor del på Lilla Karlsö (ca 2000-3000 par)",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://storakarlso.se/resa-till-stora-karlso/turlista-och-priser/",
      "org": "storakarlso.se",
      "vad": "Båten till Stora Karlsö avgår från Klintehamn",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://storakarlso.se/resa-till-stora-karlso/bra-att-veta/",
      "org": "storakarlso.se",
      "vad": "En guidad tur med våra kunniga guider erbjuds till alla våra besökare och ingår i priset för resan.",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "gotska-sandon": [
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/nationalparker/gotska-sandons-nationalpark.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Sanden täcker hela Gotska Sandön, med undantag av klapperstränder främst i sydväst, Öns högsta punkt, krönet av sanddynen Höga åsen, ligger 42 meter över havet, närmast havet finns de vandrande vita dynerna som förflyttar sig upp till sex meter per år",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/om-oss/nyheter-och-press/nyheter---gotland/2026-01-23-bokning-till-gotska-sandon-ar-oppen.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Båten går onsdagar, fredagar och söndar förutom under midsommarveckan då båten går tisdag, torsdag och söndag",
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
      "vad": "Gotska Sandöns nationalpark är Östersjöns ensligaste ö, Större delen av ön är täckt av tallskog, med träd så gamla som 500 år, I nationalparken kan du också få se sälar på nära håll",
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
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken/tips-och-guider/turbat-och-boende-pa-gotska-sandon",
      "org": "Sveriges Nationalparker",
      "vad": "Du kan göra dagsturer till Gotska Sandön från Nynäshamn under perioden mellan den 29 maj–21 juni och den 29 juli–30 augusti, Bokning av dagsbesök från Nynäshamn kan göras tidigast sju dagar innan avgångsdagen, 50 platser per avgång är möjliga att boka för dagsturer, Du behöver köpa biljett till turbåten i förväg",
      "last": "2026-11-02",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/besok-parken",
      "org": "Sveriges Nationalparker",
      "vad": "Hösten är en bra tid för fågelskådning på Gotska Sandön",
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
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/aktiviteter",
      "org": "Sveriges Nationalparker",
      "vad": "Bredsandsslingan tar dig till öns nordvästra del, Leden tar dig hela vägen ner till Tärnudden på öns södra del",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/aktiviteter/hoga-asenslingan",
      "org": "Sveriges Nationalparker",
      "vad": "På Höga Åsen kan vandringen vara krävande i lös sand och stark kupering",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/sevardheter/fyren",
      "org": "Sveriges Nationalparker",
      "vad": "Den norra fyren som invigdes 1859 är ännu i drift och i dag är fyrplatsen statligt byggnadsminne. I fyren finns utställningen Fyrliv., Fyren återinvigdes i juni 2026 efter en renovering",
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
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/gotska-sandon/att-gora-i-parken/sevardheter/bourgstroms-stuga-vid-st-anna",
      "org": "Sveriges Nationalparker",
      "vad": "Stugan, som ligger på södra delen av ön, är inte öppen men det finns ett bord och bänkar utanför",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gotland.com/companies/bat-till-gotska-sandon/",
      "org": "gotland.com",
      "vad": "Det är också en av Sveriges första Nationalparker, vilken instiftades 1909 (del av ön). 1963 utökades den till hela ön och sen 1988 innefattas även vattenområdet runt den.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "aspo-blekinge": [
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
      "vad": "Aspöleden går mellan Karlskrona och Aspö i Karlskrona skärgård. Färjeledens längd är 6700 meter och överfartstiden är cirka 25 minuter. Resan med vägfärjan är avgiftsfri., Med vår app Trafikinfo Färjerederiet får du tillgång till tidtabeller och trafikinformation.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://aspobatklubb.se/",
      "org": "aspobatklubb.se",
      "vad": "",
      "last": "2026-10-10",
      "myndighet": false
    },
    {
      "url": "https://www.aspofolketshus.se/",
      "org": "aspofolketshus.se",
      "vad": "Vår camping är belägen inne på fastigheten och säsongen startar den 1/6 och varar till 31/8.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlskrona/",
      "org": "blekingetrafiken.se",
      "vad": "22 juni - 16 augusti, Aspö Djupvik; måndag–fredag Handelshamnen … → Aspö Djupvik …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "http://www.dragso.se/aktiviteter/uthyrning/",
      "org": "dragso.se",
      "vad": "Uthyrning av SUP, Kajak, Kanot, cykel eller motorbåt",
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
      "vad": "Drottningskärs kastell är en del av världsarvet Örlogsstaden Karlskrona, Själva fastigheten förvaltas av Statens fastighetsverk",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/aspofarja-aspoleden",
      "org": "visitkarlskrona.se",
      "vad": "Gratis bil- och vägfärja mellan Karlskrona och Aspö.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/drottningskars-kastells-historia",
      "org": "visitkarlskrona.se",
      "vad": "I november 1679 besöker Karl XI skärgårdsöarna Aspö, Tjurkö och Trossö och ger militären och arkitekten Erik Dahlbergh i uppdrag att uppföra skansar på holmar vid Aspö och Tjurkö, 1897 föreslår man att ett nytt fort ska uppföras på Aspö, batteri Ellenabben 1970",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/aspo-kyrka",
      "org": "visitkarlskrona.se",
      "vad": "Aspö kyrka stod färdig 1891., Aspö kyrka är uppförd i nygotisk stil.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/gasthamn-lokanabben-aspo",
      "org": "visitkarlskrona.se",
      "vad": "Gästhamnen ligger granne med Drottningskärs kastell, 6 gästplatser, servicehus med dusch/wc, kontakt abk@aspobatklubb.se",
      "last": "2026-10-10",
      "myndighet": false
    },
    {
      "url": "https://www.visitkarlskrona.se/sv/drottningskars-kastell-aspo",
      "org": "visitkarlskrona.se",
      "vad": "uppfördes i huvudsak under 1600-talets sista årtionden och anses vara en av den svenska fortifikationens främsta skapelser",
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
      "url": "https://www.visitkarlskrona.se/sv/stallplats-aspo-folkets-hus",
      "org": "visitkarlskrona.se",
      "vad": "Ställplatsen ligger beläget mitt på ön Aspö i Karlskrona skärgård för husvagnar och husbilar.",
      "last": "2026-09-27",
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
      "url": "https://www.karlskrona.se/globalassets/kommun-och-politik/det-har-ar-karlskrona/dokument/folkmangd-2024.pdf",
      "org": "karlskrona.se",
      "vad": "Folkmängd 2024-12-31; Före detta Sturkö församling; Sturkö + 26 + 13 754 741 1 495",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.karlskrona.se/hitta-verksamheter/badplatser/sturko/",
      "org": "karlskrona.se",
      "vad": "Långgrunt i kustbandet.; Lekplats och grillmöjligheter. Toaletter finns på campingen.",
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
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlskrona-skargard/",
      "org": "blekingetrafiken.se",
      "vad": "Handelshamnen–Sturkö; Sturköpendeln har juluppehåll 21 december - 6 januari. Vi hänvisar resenärer till buss linje 123. . Tidtabellsdata på sidan: 17 aug–20 dec 2026 måndag–fredag 5 turer Handelshamnen→Bredavik (…), 20 min; 22 juni–16 aug 2026 även helger (…), 20–25 min.",
      "last": "2026-09-27",
      "myndighet": false
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
      "vad": "ICA Nära Sturköhallen; Sturkövägen 81, Sturkö; Titta in och handla prisvärt alla dagar i veckan.",
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
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-oskarshamns-kommun.html",
      "org": "havochvatten.se",
      "vad": "Här ser du badplatserna som kommunen har registrerat.; listan har ingen badplats på Blå Jungfrun",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/kalmar/besoksmal/nationalparker/bla-jungfrun.html",
      "org": "Länsstyrelsen Kalmar län",
      "vad": "I den frodiga ädellövskogen söder om toppen växer en ymnig flora och sällsynta lavar. Lövskogen är hem för en rad ovanliga skalbaggar. Ön har också ett rikt fågelliv med arter som havsörn, skärpiplärka och tobisgrissla.",
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
      "vad": "Tillstånd krävs dock inte för övernattning högst en natt i följd på, anvisad plats under perioden 20 juni–20 augusti, uppföra enklare anläggning för övernattning vid Sikhamn, sätta upp tält, vindskydd eller liknande anordning",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/att-gora-i-parken/sevardheter/labyrinten-trojeborg",
      "org": "Sveriges Nationalparker",
      "vad": "Hur länge labyrinten har legat där på klippan är det ingen som vet, inte heller vem som lagt den eller varför, Labyrinten fanns på plats när Carl on Linné besökte ön 1741, Ofta gick man i dem som en rit – för fruktbarhet, god fiskelycka eller ett stilla hav på hemvägen, nära entrén Nedre Västra Stenbrottet",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark",
      "org": "Sveriges Nationalparker",
      "vad": "Blå Jungfruns nationalpark är en isolerad ö i Kalmarsund med branta klippor, blockterräng och höjder som reser sig över havet, Öns har fått sin runda form av inlandsisen, Under istiden bildades också öns många jättegrytor",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/besok-parken/hitta-hit",
      "org": "Sveriges Nationalparker",
      "vad": "Det finns tre platser på ön där turbåten kan lägga till och som också är parkens tre entréer. Lervik, som är den vanligaste platsen, Sikhamn och Nedre västra stenbrottet.; Landstigning sker direkt mot klipporna, eftersom det inte finns några bryggor på ön. Vindriktningen avgör var och om turbåten kan lägga till; På ön möts du av guider som berättar om ön och vad du bör tänka på under din vistelse.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/att-gora-i-parken/aktiviteter/bla-jungfrun-runt",
      "org": "Sveriges Nationalparker",
      "vad": "Den här vandringsleden tar dig runt hela Blå jungfrun. Du passerar sevärdheter som Jättegrytan, Stensliperiet, labyrinten Trojeborg, grottan Kyrkan och upp på toppen. Du kan starta din vandring från alla tre entréerna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/att-gora-i-parken/sevardheter/stensliperiet",
      "org": "Sveriges Nationalparker",
      "vad": "På Blå Jungfruns västra sida finns en klapperstrand med rundslipad sandsten och granit",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.jungfruturer.se/",
      "org": "jungfruturer.se",
      "vad": "Lör den 6 Juni startar officiellt säsongen 2026 från Byxelkrok på Öland., Dagliga turer Juli - Aug, Ordinarie avgång …, Är det färre än 15 bokade ställs turen in., officiellt årets säsong avslutad",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.oskarshamn.se/kultur-och-fritid/idrott-och-fritid/badplatser/havsbad/",
      "org": "oskarshamn.se",
      "vad": "Karta över kommunens havsbad; kommunens åtta havsbad (Bredviken, Dragskär, Gunnarsö, Havslätt, Nötö, Stångehamn Badvägen, Åsvallesund, Vånevik) omfattar inte Blå Jungfrun",
      "last": "2026-11-03",
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
      "vad": "Program M/S Solkust säsongen 2026; Högsäsong: 27 juni-27 augusti; (3 tim och 15 min på Blå Jungfrun); 4 tim och 15 min på Blå; Försäsong 9, 16, 23 och 31 maj; Eftersäsong: 29 augusti-26 september lördagar",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/kopia-på-labryrinten",
      "org": "solkustturer.se",
      "vad": "Mellan 27 juni och 16 augusti kan ni övernatta en natt i vindskydd på Blå Jungfrun. Det finns plats för 8 personer, fördelat på 2 vindskydd., Vindskydd: Ingen kostnad för att övernatta.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/viktigt-att-veta",
      "org": "solkustturer.se",
      "vad": "Man ska då hålla sig på behörigt avstånd från vattnet eftersom det rullar in stora vågor med risk för att man dras ut i vattnet.",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/kopia-på-mytologi",
      "org": "solkustturer.se",
      "vad": "går över toppen som ligger 86m över vattenytan, det är starkt rekommenderat att använda bra vandringsskor och ta med vatten att dricka",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/general-8",
      "org": "solkustturer.se",
      "vad": "Vecka 25 & 34: Guidning om stenbrytningen., Vecka 26: Guidning om Heidenstams bröllop., Vecka 33: Guidning om öns geologi.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/blåjungfrunnationalpark",
      "org": "solkustturer.se",
      "vad": "Välkomna till Säsongen 2027; Lågsäsong maj till midsommar går dagsturer lördagar eller söndagar; Högsäsong från midsommar till 20 august dagligen; tid på Blå Jungfrun 3,5 timmar",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/kopia-på-viktigt-att-veta",
      "org": "solkustturer.se",
      "vad": "Avvikelser från Turlista informeras på hemsida eller mejl kvällen innan avsedd tur innan … undantagsvis samma morgon",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.solkustturer.se/general-4",
      "org": "solkustturer.se",
      "vad": "tar parkvakter emot er och hänvisar er till plats för information på Svenska eller Engelska, Den obligatorista informationen fokuserar på säkerhet",
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
      "vad": "Hemsöleden går mellan Strinningen och Hemsön vid Höga kusten i Västernorrlands län. Färjeledens längd är 540 meter och överfartstiden är fyra minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/skargard/farja",
      "org": "hogakusten.com",
      "vad": "Till Hemsön går det bilfärja varje dag. Under sommaren går den mer frekvent, en gång varje hel- och halvtimme. Färjan är avgiftsfri och avgår från Strinningen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/hemso-fastning",
      "org": "hogakusten.com",
      "vad": "För turister som har svårt att ta sig ut med kollektivtrafik finns det möjlighet att få hämtning inne i centrala Härnösand och skjutsas ut till Hemsön, även tillbaka. Bokas ett dygn innan via telefon., Hultoms gästhamn & Båthushamns gästhamn",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/hemso-fastning-historia-havsutsikt",
      "org": "hogakusten.com",
      "vad": "från platsen breder havet och Ångermanälvens utlopp ut sig nedanför",
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
      "vad": "Hemsön ligger i världsarvet Höga kusten.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/guidade-turer/",
      "org": "se.hemsofastning.se",
      "vad": "En tur nere i anläggningen tar drygt en timme, de gigantiska 15,2 cm torndubbel pjäser(kanoner) som kröner bergets topp, ett helt litet samhälle nere i berget på 5000 kvm, verkstäder, storkök, sjukvårdsavdelning, logement",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/historia/",
      "org": "se.hemsofastning.se",
      "vad": "Åren 1953-1957 uppfördes batteriet vid Storråberget",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/",
      "org": "se.hemsofastning.se",
      "vad": "Sedan 2009 drivs Hemsö fästning av oss, I dag får vi varje år välkomna över 30 000 besökare",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/oppettider/",
      "org": "se.hemsofastning.se",
      "vad": "Våra öppettider är från och med måndagen den 17 augusti, vår buffé serveras … til …",
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
      "url": "https://se.hemsofastning.se/hur-gor-jag/",
      "org": "se.hemsofastning.se",
      "vad": "Biljett till guidad tur köper du i entrén som du hittar i direkt anslutning till parkeringen., Parkering, Den är fri och det finns plats även för husbilar och husvagnar.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://se.hemsofastning.se/omradet/",
      "org": "se.hemsofastning.se",
      "vad": "Pjäserna tillverkades av Bofors på beställning av Kungen av Siam (nuvarande Thailand), pga andra världskrigets export restriktioner så stannade pjäserna i Sverige, tre av dem landade på Bungenäs (Gotland) och tre hos oss på Hemsön, Pjäserna användes från 1956 till anläggningen stängdes.",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "faro": [
    {
      "url": "https://dokument.gotland.se:443/IntegrationService.svc/doc/content/55284",
      "org": "gotland.se",
      "vad": "Ordinarie tidtabell 2026/2027. Giltig 2026-08-16–2027-06-12, Visby busstation–Fårösund färjeläge 60 min (t.ex. …)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar",
      "org": "gotland.se",
      "vad": "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand som västerut övergår i badplatsen Skär., Slamtoaletter, Soptunna, Livboj, Skyltning mot badplatsen saknas, men badplatsen nås till fots från Fårö fyr.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/allmant-om-region-gotlands-badplatser",
      "org": "gotland.se",
      "vad": "Enligt regionens Allmänna lokala ordningsföreskrifter får hundar under perioden 1 maj – 30 september inte vistas på vissa utpekade badplatser.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/ekeviken",
      "org": "gotland.se",
      "vad": "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand., Slamtoaletter, Soptunnor, Livbojar, Livbåt, Tillgänglighetsanpassad toalett vid västra parkeringen., Skyltning mot badplatsen finns från väg 699, huvudvägen, samt läng väg 702 som ansluter till badplatsen.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser",
      "org": "gotland.se",
      "vad": "Nordöstra Fårö (under både Ekeviken och Norsta Aurar)",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/digerhuvud.html",
      "org": "Länsstyrelsen Gotland",
      "vad": "Den gotländska berggrunden är till stor del uppbyggd av korallrev som bildades i ett tropiskt hav för cirka 430 miljoner år sedan, kunde de stå kvar som isolerade stenpelare – raukar, förstöra eller skada fast naturföremål eller ytbildning genom att exempelvis knacka fossil ur raukar",
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
      "url": "https://bergmancenter.se/",
      "org": "bergmancenter.se",
      "vad": "1 juni – 30 augusti; Alla dagar …; 3 - 27 september har vi öppet torsdag - söndag; I oktober stänger vi utställningen för säsongen och öppnar åter i maj.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://www.destinationgotland.se/resa/",
      "org": "destinationgotland.se",
      "vad": "Res från Nynäshamn eller Oskarshamn, På omkring tre timmar är du framme i Visby",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.faroframtid.se/faronatta",
      "org": "faroframtid.se",
      "vad": "Det startade som ett kvällsevenemang den tredje lördagen i september men har vuxit till att omfatta hela helgen; Hela Fårö håller öppet med gårdsbutiker, loppisar, affärer, caféer, restauranger, konserter, konstutställningar",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://farogarden.se/",
      "org": "farogarden.se",
      "vad": "boende på vandrarhemmet, Vi har lunchöppet",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://farostrandcafe.se/",
      "org": "farostrandcafe.se",
      "vad": "Vi ses nästa säsong - öppnar den 4 juni 2027!",
      "last": "2026-10-20",
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
      "vad": "Ingmar Bergman first came to Fårö on a stormy April day in 1960., as a possible location for Through a Glass Darkly, He had his house built not far from where Persona was filmed. He came to live and work there for almost 40 years., Ingmar Bergman died at the age of 89 at his home on Fårö and is buried in Fårö Church Cemetery., The meeting with the barren island on Gotland’s northern point was overwhelming.",
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
      "url": "https://gotland.com/besoka-uppleva/upptack-norra-gotland/",
      "org": "gotland.com",
      "vad": "Färjan till Fårö går varje hel och halv timme från Fårösund året runt, Det går endast bussar på Fårö under sommartid, från mitten av juni till mitten av augusti.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://gotland.com/companies/bergmancenter/",
      "org": "gotland.com",
      "vad": "Bergmancenter är ett kulturcentrum med utställningar, skaparverkstad, kafé och biograf., Varje sommar, veckan efter midsommar, arrangerar Bergmancenter Bergmanveckan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://verktygsladan.gotland.com/companies/broa-kiosken-faro/",
      "org": "gotland.com",
      "vad": "Broa Kiosken Fårö, glass, take away-kaffe, kylda drycker, snabbmat",
      "last": "2026-10-20",
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
      "vad": "I vackra Fårö östra skola från 1850 huserar Fårögårdens mysiga B&B.",
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
      "vad": "Turer utöver ordinarie avgångar (även nattetid) kan beställas per telefon.",
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
    }
  ],
  "trysunda": [
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/naturreservat/trysunda.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Du med rullstol eller rullator kan men fördel välja M/F Ulvön eftersom den är bättre tillgänglighetsanpassad än Minerva.; Från färjeläget går en bred, grusad gångväg bort till affären och vandrarhemmet. Vid färjekajen, gästhamnen och vandrarhemmet finns det tillgänglighetsanpassade toaletter.",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/download/18.8cd5a1b19362fb4fc22cdc/1732538244407/Trysunda.pdf",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Till Trysunda kan du åka med passagerarbåten M/F Ulvön, från Köpmanholmen, 30 km söder om Örnsköldsvik, Sommartid går den varje dag, under vintern är det färre, Naturreservatet Trysunda är 1052 hektar stort, varav, 378 hektar är land",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.lansstyrelsen.se/vasternorrland/besoksmal/varldsarvet-hoga-kusten.html",
      "org": "Länsstyrelsen Västernorrland",
      "vad": "Landet i Höga Kusten/Kvarkens skärgård stiger med 8-8,5 millimeter per år, Så den landhöjning som vi märker av är numera bara 5 millimeter per år, Höga Kusten blev isfritt för ungefär 10 500 år sedan",
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
      "url": "https://www.hogakusten.com/en/trysunda-vandrarhem-skargardscafe",
      "org": "hogakusten.com",
      "vad": "homemade refreshments (fika) and meals, and a small grocery store",
      "last": "2026-10-01",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/sv/trysunda",
      "org": "hogakusten.com",
      "vad": "Från fiskeläget går en stig upp till Kapellberget där du kan skåda kontrasterna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.hogakusten.com/en/experiences/nature-outdoor/archipelago/ferry-ulvon",
      "org": "hogakusten.com",
      "vad": "If you're going to Trysunda island you will have to travel with",
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
      "url": "https://www.mfulvon.se/turlistor",
      "org": "mfulvon.se",
      "vad": "Turlista 14 sep - 31 okt 2026; turerna till Trysunda går fram och tillbaka från Köpmanholmen, medan Ulvöturerna går via Strängöarna och Fjären",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.mfulvon.se/bra-att-veta",
      "org": "mfulvon.se",
      "vad": "Alla våra turer till Strängöarna, Trysunda och Ulvön utgår från Köpmanholmens färjeläge",
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
      "url": "https://www.svenskakyrkan.se/ornskoldsvikssodra/natra-sidensjo/trysunda-kapell",
      "org": "svenskakyrkan.se",
      "vad": "Kapellet är byggt av liggande timmer; Invändigt har kapellet målningar på väggarna men inte i taket.; Motiven till målningarna på norra väggen är hämtade ur Gamla testamentet, på östra och södra väggarna ur Nya testamentet.; Västra väggen skildrar S:t Göran som bekämpar draken.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://trysunda.se/historia/",
      "org": "trysunda.se",
      "vad": "Trysunda hette från början Trijzundsön genom att tre öppna sund gick ihop. Genom landhöjningen är numera bara ett sund öppet.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://trysunda.se/upplev-pa-on/fiskemuseum/",
      "org": "trysunda.se",
      "vad": "Nyckeln hänger på sidan, välkommen in.",
      "last": "2026-11-17",
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
      "vad": "3 stycken 4-bäddsrum, 4 stycken 2-bäddsrum, Williamstugan 4 bäddar, Juliastugan, 6 bäddar, Avskilt läge 500 m från huvudbyggnaden, Sänglinne ingår ej i priset, men finns att hyra",
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
      "vad": "Vi erbjuder mat och fika i vårt skärgårdscafé, Frukost måste, förbokas",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "hano": [
    {
      "url": "https://www.lansstyrelsen.se/blekinge/besoksmal/naturreservat/hano.html",
      "org": "Länsstyrelsen Blekinge",
      "vad": "Ett antal välmarkerade vandringsstigar leder besökaren runt på ön och minskar risken att gå vilse.; Den geologiska stigen är en av flera leder på Hanö. Den tar dig från hamnen upp på bergets topp.; läs om isräfflor, klapperstensfält och drumliner på skyltar längs vägen. Du får också följa Östersjöns historia",
      "last": "2026-10-20",
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
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/",
      "org": "blekingetrafiken.se",
      "vad": "Mellan Nogersund och Hanö finns skärgårdstrafik året runt. Gå ombord på M/F Vitaskär i Nogersund och 25 minuter senare befinner du dig på sköna Hanö.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/solvesborg-skargard/",
      "org": "blekingetrafiken.se",
      "vad": "Gå ombord på M/F Vitaskär i Nogersund och 25 minuter senare är du framme på sköna Hanö.; Mellan den 1 september och 31 maj körs trafiken mellan Nogersund och Hanö som en båtpendel.; Under sommaren, när biljettkiosken i Nogersund är öppen, köper du alltid din biljett där före avgång.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://fiskybusiness.nu/vandrarhemmet-hanouml.html",
      "org": "fiskybusiness.nu",
      "vad": "Vandrarhemmet Hanö är ett litet vandrarhem med totalt 20 st bäddar fördelat på fem rum och två stugor; I den stora byggnaden (gamla skolan) finns fem rum; Sängkläder, handduk och städning av rummet ingår i priset.; augusti - maj; bokningsförfrågan via mail; Vi hoppas att Vandrarhemmet kan komplettera med Hanös enda och Hanös bästa restaurang",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://fiskybusiness.nu/hanouml-hamnkrog.html",
      "org": "fiskybusiness.nu",
      "vad": "vi är Hanös enda restaurang; Fisk n Chips; Krögarspätta; Fixar du inte fisk har vi även några vegetariska rätter och något för köttätaren.; därför har vi en egen barnmeny; Vi har fullständiga rättigheter",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://www.hano.nu/hamnen-33705539",
      "org": "hano.nu",
      "vad": "hamnens egen sida (Hanö Hamn- och Byalag driver hamnen): \"Gästplatser: 75 i hela hamnen utom i färjeläget dagtid. Det går inte att boka båtplatser.\"",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://solvesborg.se/uppleva-och-gora/turism-att-besoka-solvesborg/sevardheter/hano.html",
      "org": "solvesborg.se",
      "vad": "En barnvänlig strand finner du cirka 5 minuters promenad norrut från hamnen.; Klippbadet Vindhalla finner du på öns östra sida.",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://www.visitblekinge.se/en/guest-harbour-hano",
      "org": "visitblekinge.se",
      "vad": "WIFI is available in the harbor as well as shower and laundry facilities for boat guests.; There is a sauna to rent a short distance from the harbor office.",
      "last": "2026-10-20",
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
      "last": "2026-11-17",
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
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://roslagen.se/oar/svartloga-en-svart-rand-vid-horisonten/",
      "org": "roslagen.se",
      "vad": "Bada – långgrund sandstrand och flera klippbad; Vandra – märkta stigar; Svartlöga ligger öster om södra Blidö.; På håll ser denna stora ö i ytterskärgården ut som en svart rand vid horisonten.; Ön bjuder också på flera klippbad och utmärkta naturstigar.; Sopmaja och toalett finns vid ångbåtsbryggan och vid byhamnen.; Roslagen.se är den officiella webbplatsen för platsvarumärket Roslagen, ett samarbete mellan Östhammars, Norrtälje och Österåkers kommuner. (kommunernas besökssida, nivå 3)",
      "last": "2026-11-25",
      "myndighet": false
    },
    {
      "url": "https://stockholmslansmuseum.se/besoksmal/svartloga/",
      "org": "stockholmslansmuseum.se",
      "vad": "Svartlöga var en av få skärgårdsöar som klarade sig från ryssarnas härjningar 1719. Grunden runt ön är förrädiska och enligt traditionen skrämde öns säljägare bort inkräktarna med sina bössor.",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026, 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA, Strömkajen (Stockholm), Norrsund (Blidö), Svartlöga, Rödlöga; vid Svartlöga har 10 av 12 stopp i h26 anmärkning b",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/s26.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026; 26A STOCKHOLM – VAXHOLM – NORRSUND – RÖDLÖGA; Beställ resan i SL-appen, på Waxholmsbolagets webb eller via kundtjänst 08-600 10 00 minst 1 timme innan avgång från aktuell brygga, dock senast …. — tur 2601 måndag–torsdag Strömkajen …, Svartlöga …; tur 2602 Svartlöga …, Strömkajen …",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://kund.printhuset-sthlm.se/wa/h28.pdf",
      "org": "Waxholmsbolaget (tryckt tidtabell)",
      "vad": "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026; 28A FURUSUND – ÖSTERNÄS – SÖDERÖRA – RÖDLÖGA — onsdag tur 2819 Furusund …, Svartlöga …; fredag, lördag och söndag Furusund …, Svartlöga …; lördag retur tur 2852 Svartlöga …, Furusund …",
      "last": "2026-11-17",
      "myndighet": false
    },
    {
      "url": "https://waxholmsbolaget.linjetidtabeller.se/",
      "org": "waxholmsbolaget.linjetidtabeller.se",
      "vad": "Beställ tryckta tidtabeller, Furusund - Östernäs - Söderöra - Bromskär / Rödlöga, Furusund - Högmarsö - Solö; listan har ingen tabell för linje 24 eller 26",
      "last": "2026-11-17",
      "myndighet": false
    }
  ],
  "visingso": [
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
      "vad": "Hamnkiosken i Bäckviken, Hvens Glassfabrik; 0704-13 28 72; Missa inte heller Hvenglassen som säljs i Bäckvikens hamn.",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/",
      "org": "ilandskrona.se",
      "vad": "Ventrafikens färja från Landskrona går året om och tar endast 30 minuter.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://ilandskrona.se/besoka/ven/planera-din-resa-till-ven/",
      "org": "ilandskrona.se",
      "vad": "då det är begränsat med övernattningsmöjligheter så rekommenderar vi dig att förboka. Stora delar av Ven är naturreservat och det är därför endast tillåtet att tälta på campingen.",
      "last": "2026-10-20",
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
      "vad": "Öppettider 2026; September, lördagar och söndagar …; Tillägg för entré till observatoriet Stjärneborg; I visningen ingår inte föreställningen i det underjordiska observatoriet Stjärneborg.",
      "last": "2026-10-19",
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
      "url": "https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-kyrkbacken/",
      "org": "landskrona.se",
      "vad": "Kyrkbacken har en sandstrand och vattnet är långgrunt., Badplatsen ligger på den nordvästra sidan av Ven i anslutning till Kyrkbackens hamn. Sandstranden är kort och området vid stranden består främst av gräsytor. Stranden är cirka 50-100 meter lång., För din säkerhet finns livboj tillgänglig året om. Badplatsen har inga badvakter., Brygga, Avgiftsfri toalett / HWC, Här finns fyra fasta grillplatser., Få parkeringsmöjligheter. Vi rekommenderas att inte ta bilen med till Ven., Hundar får varken vistas eller bada på allmänna badplatser under badsäsongen, perioden 1 maj – 30 september.",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-norreborg/",
      "org": "landskrona.se",
      "vad": "Norreborg är en av tre badplatser på ön Ven. Badar du här får du uppleva fin sandstrand. Här finns också gott om möjlighet att få skugga., För din säkerhet finns livboj tillgänglig året om. Badplatsen har inga badvakter., Brygga, Avgiftsfri toalett / HWC, Här finns två fasta grillplatser., en strandrullstol till utlåning, Under sommarens badsäsong, 15 juni-15 augusti, kan den lånas, Kontakta Landskrona stads kontaktcenter, Hundar får varken vistas eller bada på allmänna badplatser under badsäsongen, perioden 1 maj – 30 september.",
      "last": "2026-11-03",
      "myndighet": false
    },
    {
      "url": "https://www.norreborgshamn.se/",
      "org": "norreborgshamn.se",
      "vad": "Hamnen är öppen hela året. Under tiden 11 oktober 2025 till 15 april 2026 har vi dock begränsad service; El finns, men kommer att stängas av på piren.; Dusch och toalett finns i reducerad omfattning.; Från och med den 1 maj gäller taxa för högsäsong.; Även i år kommer det att finnas en kioskvagn",
      "last": "2026-10-19",
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
      "vad": "Överfarten tar cirka 30 minuter; Skeppsbron – Bäckviken; Gäller fr.o.m. 2022-01-01 t.o.m. 2026-12-31; Gäller fr.o.m. 2026-06-27 t.o.m. 2026-08-16 . Tabellen: Landskrona→Ven … (ej helg), …; Ven→Landskrona … (ej helg), …; sommaren 27/6–16/8 sex extra turer i vardera riktningen.",
      "last": "2026-10-19",
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
      "url": "https://www.blekingetrafiken.se/reseinformation/skargardstrafik/karlshamn/",
      "org": "blekingetrafiken.se",
      "vad": "Karlshamn–Tjärö, 19 juni - 16 augusti, Karlshamn–Tärnö–Tjärö, 17 augusti - 6 september; Karlshamn … → Matvik … → Tjärö … (80 min), …",
      "last": "2026-09-27",
      "myndighet": false
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
      "vad": "Lantmäteriet Min karta: Öckerö | Öckerö | Trakt, E 300242 N 6401598; Hjälvik ligger 1,7 km väster och 0,9 km norr om traktens punkt, uppmätt i Lantmäteriets Min karta",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Hj%C3%A4lvik",
      "org": "minkarta.lantmateriet.se",
      "vad": "Lantmäteriet Min karta: Hjälvik | Öckerö | Hav och sjö, E 298585 N 6402489 (SWEREF 99 TM)",
      "last": "2026-11-03",
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
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/naturomraden-och-naturreservat/ockero-naturomrade-och-motionsspar",
      "org": "ockero.se",
      "vad": "Rördammen (1), en av kommunens största våtmarker, enkelbeckasin, näktergal, vattenrall och rörhöna, Vid dammen finns högt uppsatta holkar och i dessa brukar det häcka tornfalk, I vikarna finns vidsträckta klapperstensfält, här växer den sällsynta strandvallmon, Motionsspåret har grusunderlag och är 4600 meter långt",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/hjalviks-badplats",
      "org": "ockero.se",
      "vad": "Hjälviks badplats ligger på Öckerö., I området Prästängen finns det fotbollsplaner och en inomhushall Göstahallen, ishall, lekpark, skatepark och motionsspår., Det finns en stor avgiftsbelagd parkering., Hundförbud från 1 maj till 30 september, Eldningsförbud (fast grillplats får användas), Volleybollplan, Toalett (WC och för funktionshindrade), Ramp för funktionshindrade, Sandstrand, gräs och klippor, Räddningsutrustning, Tre parkeringsplatser för funktionshindrade vid badplatsen, Kommunal badplats inom gulmarkerat område",
      "last": "2026-11-25",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser",
      "org": "ockero.se",
      "vad": "Från den 1 maj till den 30 september råder det hundförbud på alla kommunala badplatser i Öckerö kommun. Det gäller även kopplade hundar.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/honoleden/",
      "org": "Trafikverket",
      "vad": "Färjeledens längd är 2500 meter och överfartstiden är 13 minuter. Resan med vägfärjan är avgiftsfri.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/contentassets/518286d389b6448a90fce83f86008db2/honoleden_turlista-20241021.pdf",
      "org": "Trafikverket",
      "vad": "Röda dagar körs som söndag (tabellen: vardagar … avgång var 10:e minut, nattetid var 30:e minut)",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "http://www.fiskemuseet.se/",
      "org": "fiskemuseet.se",
      "vad": "Fiskemuseet Hönö, Fiskemuseet drivs av Föreningen Kusttraditioner",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Norra skärgården består av tio bebodda öar, Björkö, Fotö, Grötö, Hälsö, Hyppeln, Hönö, Kalvsund, Källö-Knippla, Rörö och Öckerö, Kostnadsfria bilfärjor går från Lilla Varholmen till Hönö och Björkö. Från Hönö kan du fortsätta över broarna till Fotö, Öckerö och Hälsö",
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
      "vad": "Vi har 16 härliga rum på andra våningen där hälften av dem har en uteplats mot havet och hamninloppet",
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
      "url": "https://www.vastsverige.com/visitockero/goteborgsskargardsled/",
      "org": "vastsverige.com",
      "vad": "Leden är 35,3 km och uppdelad i tre olika etapper och två rundslingor, Efter Öckeröbron håller man vänster mot Kanndalen, Leden går över klipporna till Saltas badplats med toa sommartid, Förbi Hummerviken mot Hjälviks badplats med sommaröppen toa, Naturens krafter möter man på Hälsöbron",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/",
      "org": "vastsverige.com",
      "vad": "Hela året går färjorna från Lilla Varholmens färjeläge dygnet runt med täta avgiftsfria turer ut till Öckeröarna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6290__0__LINE__20260817__20261212__392b5cc8-4462-460d-b9ed-07c70df4464b__0%2C0__2808493.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "290 Burö–Göteborg, Gäller 17 aug - 12 dec 2026, Linjen trafikeras av Connect Bus. ; tabellen måndag–fredag: Nils Ericson Terminalen … → Öckerö färjeläge …; inga helgturer i tabellen.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/5206__0__LINE__20260817__20261212__f9ebc54c-e160-4a9f-80a3-948f860fcbd6__0%2C0__2796081.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Landvetter–Göteborg–Lilla Varholmen, Gäller 17 aug - 12 dec 2026; vardagar dagtid t.ex. Drottningtorget … → Lilla Varholmen …, därefter var 15:e minut",
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
      "vad": "Rörö naturreservat breder ut sig över större delen av ön Rörö, Ön karaktäriseras av nästan helt trädlösa hedmarker samt ljung- och gräshedar, På vägen kan du stöta på både får och hästar, som hjälper till att hålla markerna öppna, två dammar, Stora och Lilla Ers vatten, Den hotade stinkpaddan håller också till i dammarna, I blickfånget finns lämningar från, istiden som vidsträckta klapperstensfält",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/kommun-och-politik/statistik",
      "org": "ockero.se",
      "vad": "Befolkning per ö, Rörö 248 243 244 240 250 250 245 253 252 254",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/gula-skarens-badplats",
      "org": "ockero.se",
      "vad": "För att komma dit tar du dig först till Hälsö. Du kör sedan rakt fram efter Hälsöbron, tills vägen tar slut vid Burö. Ta färjan mot Nordöarna.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/resa-och-trafik/farjetrafik/nordoleden/",
      "org": "Trafikverket",
      "vad": "längd 3500 meter, restid cirka 18 minuter — restid: buss 290 Nils Ericson Terminalen–Burö färjeläge 67–68 min (t.ex. …), färja … enligt Trafikverkets tidtabell, totalt ca 1 h 40 min.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.trafikverket.se/contentassets/5ff05e77bb514ea8af1ecaf496895324/ordinarie-tidtabell---vardag-och-helg-2026-05-25.pdf",
      "org": "Trafikverket",
      "vad": "Ordinarie tidtabell, Gäller från 2026-05-25, Burö, Källö-Knippla, Hyppeln och Rörö, Kallelsetur: Beställning av kallelseturer sker till telefonsvararen — from_city_min: Nils Ericson Terminalen … → Burö … → färja … → Rörö … = 101 min. 26 ordinarie ankomster till Rörö måndag–fredag ….",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.goteborg.com/platser/roro",
      "org": "goteborg.com",
      "vad": "Cirka 500 meter från gästhamnen ligger Eravik, en barnvänlig badplats med sandstrand och långgrunt vatten, här finns service som mataffär",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "Vill du vidare kan du ta en färja från Hälsö (Burö färjeläge) till öarna, Det är möjligt att ta bilen över men en rekommendation är att parkera den vid färjeläget då öarna är små och parkeringsplatserna begränsade",
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
      "url": "https://rorofiskeboakrog.se/",
      "org": "rorofiskeboakrog.se",
      "vad": "I Fiskeboa kan ni köpa nykokta kräftor, räkor och fisk av olika slag, Vi har både lunch och middagsservering, På Wilmas så serverar vi fish & chips, Vi använder oss av Kolja, Kommer ni med båt är vi precis vid gästhamnen, Copyright © 2026 Rörö Fiskeboa & Krog",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/produkter/gasthamn-roro/",
      "org": "vastsverige.com",
      "vad": "Rörö Gästhamn ligger vid farleden Göteborg och Marstrand, Serviceanläggning och spolplatta och septitankstömning för fritidsbåtar, I hamnen ligger Ica butik med en café del, Sjöräddningsstationen finns i hamnen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6290__0__LINE__20260817__20261212__392b5cc8-4462-460d-b9ed-07c70df4464b__0%2C0__2808493.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "290 Burö–Göteborg och omvänt, Nils Ericson Terminalen, Burö färjeläge, Gäller 17 aug - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6281__0__LINE__20251214__20261212__1b7d89b9-d2d4-4151-a903-70a45274103d__0%2C0__2628605.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Burö–Öckerö–Hönö och omvänt, Hönö färjeläge, Gäller 14 dec 2025 - 12 dec 2026  — Hönö färjeläge–Burö färjeläge 20–21 min, måndag–fredag varje halvtimme dagtid.",
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
      "vad": "Holmörundan – 13km – 3,5 tim; Trappudden – 7km – 2 tim; Kammen – 6km – 2 tim; Vedaögern – 4km – 1 tim; Ängesön – 15km – 5,5 tim; Ved brukar finnas vid följande rastställen: Trappudden, Kammen, Kontviken, Klubbsand, Klintviken, Rössgrundbastun, Sikskär och Munkhällan.",
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
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-kungalvs-kommun/marstrand-strandverket.html",
      "org": "havochvatten.se",
      "vad": "Marstrand strandverket är en badplats i Kungälvs kommun., Badstege, barnbad, hoppmöjlighet",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/marstrandsfarjan/",
      "org": "kungalv.se",
      "vad": "bekräftar att färjan mellan Koön och Marstrand drivs av kommunen och att biljetter och dispensansökningar hanteras där",
      "last": "2026-10-19",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/parkering/parkeringsplatser-i-marstrand/",
      "org": "kungalv.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/trafik--gator/kollektivtrafik/samlastning/",
      "org": "kungalv.se",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/kultur--fritid/bada/marstrands-badplats/",
      "org": "kungalv.se",
      "vad": "Välkommen till Barnbadet på Marstrandsön, Sandstrand: Ja, Badstegar: Ja, Trampolin: Ja, Toalett: Ja, Tillgänglighetsanpassad för personer med funktionsvariation: Nej, Marstrands badplats ligger på sydsidan av Marstrandsön, cirka 400 meter från färjeläget. Det finns parkeringar på Koön, 100-1000 meter från färjan. Tänk på att det ofta är fullt på de närmsta parkeringarna under högsäsongen., Hamngatan, Marstrandsön",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.kungalv.se/kultur--fritid/bada/",
      "org": "kungalv.se",
      "vad": "Marstrands badplats, Tänk på att det inte är tillåtet med hundar, hästar eller andra djur på kommunala badplatser., Vattenprover tas regelbundet på alla kommunala badplatser.",
      "last": "2026-11-03",
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
      "url": "https://www.sfv.se/vara-fastigheter/sverige/vastra-gotalands-lan/carlstens-fastning-marstrand",
      "org": "Statens fastighetsverk",
      "vad": "bekräftar provisorisk skans efter freden i Roskilde 1658, mindre stenfästning från 1660, bygget 1682 under Erik Dahlberg, färdig 1860, \"en av Europas starkaste fästningar\", statligt byggnadsminne förvaltat av SFV sedan hösten 1993",
      "last": "2026-09-16",
      "myndighet": true
    },
    {
      "url": "https://carlsten.se/oppettider-och-priser/",
      "org": "carlsten.se",
      "vad": "3 april – 31 maj 2026, Öppet helger:, 1 juni – 30 juni 2026, Öppet alla dagar:, Ordinarie guidade turer nedan ges på svenska och ingår i, En guidad tur tar ca 45 minuter, Alla hundar är välkomna och har fri entré på fästningen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/carlstens-soldathotell/",
      "org": "carlsten.se",
      "vad": "Bo innaför murarna på Marstrands största sevärdhet; I dessa 1700 & 1800-talsbyggnader övernattar ni; Rummen på Carlstens Soldathotell är alltifrån enbäddsrum till åttabäddsrum i Kommendanthuset och Donjonen; Soldathotellet - Öppet året om!",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/carlstens-vaffelcafe/",
      "org": "carlsten.se",
      "vad": "Du hittar oss vid fästningens entré och du behöver inte köpa entré till fästningen för att komma till oss; Våfflor, Sallader, Pajer, Smörgåsar; Tack för säsongen 2026; Vi öppnar igen till påsken 2027.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/julbord/",
      "org": "carlsten.se",
      "vad": "Marstrands största julbordsbuffe på Carlstens fästning.; fredag 27 nov; lördag 19 dec; söndag 13 dec; Vi möter alla gäster vid färjeläget på Marstrandsön för gemensamt fackeltåg (om vädret tillåter) upp till Kungsporten; upp till Riddarsalen",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://carlsten.se/mat-fest-konferens/",
      "org": "carlsten.se",
      "vad": "Riddarsalen, Kruttornet, Batterisalen, Vapenhuset och Lasse-Majas kök; Konferens- & event öppet året om ; samma sida listar Våffelcaféet under Mat, Fest & Konferens, och caféet skriver Thomas, Nina & Sandra med personal, julbordet Thomas & Nina Berndtsson",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://gkss.se/sv/nyheter/gkss-match-cup-sweden-2026",
      "org": "gkss.se",
      "vad": "GKSS Match Cup Sweden seglas 29 juni till 4 juli på Marstrand",
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
      "url": "https://www.marstrandsfarja.se/fordonstrafik/vad-ar-nyttotrafik",
      "org": "marstrandsfarja.se",
      "vad": "Till Marstrandsön får endast överföras fordon i nyttotrafik.",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandsfarja.se/",
      "org": "marstrandsfarja.se",
      "vad": "Biljetter gäller tur och retur från färjeläget på Koön till Marstrandsön.; Västtrafiks enkelbiljetter gäller INTE på färjan!",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://www.marstrandsfarja.se/start",
      "org": "marstrandsfarja.se",
      "vad": "Västtrafiks enkelbiljetter gäller INTE på färjan!",
      "last": "2026-10-20",
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
      "vad": "El och vatten ingår i serviceavgiften och finns på alla bryggor, Kod till duschar och toalett, Tvättmaskiner och torktumlare finner du i vår tvättstuga på baksidan gästhamnsbyggnaden, Bunkring av bränsle är förbjuden inom området kring gästhamnen, Det är totalt förbjudet att grilla på båten, bryggor och i området kring dessa, Det råder badförbud i hamnområdet",
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
      "vad": "Marstrand was founded in the 13th century by the Norwegian king, Håkon Håkonsson, and did not become Swedish until 1658.; by the 16th century it was the centre of the herring industry in Europe.; the stocks of herring made the difference between prosperity and poverty for the inhabitants of Marstrand",
      "last": "2026-10-19",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/kungalv/marstrand/",
      "org": "vastsverige.com",
      "vad": "Sommarens seglingshöjdpunkt är när Match Cup Sweden avgörs första veckan i juli, Längs bryggorna i Sveriges största gästhamn ligger båtarna tätt",
      "last": "2026-10-19",
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
      "vad": "Fransk krog i hjärtat av Marstrand med uteservering.; Johans Krog är en fransk bistro belägen på vackra Marstrand.; Kungsgatan 12",
      "last": "2026-10-20",
      "myndighet": false
    },
    {
      "url": "https://www.vasttrafik.se/reseplanering/tidtabeller/linje/9011014630200000/",
      "org": "Västtrafik",
      "vad": "Buss 302: Marstrand - Ytterby - Kungälv; Marstrands färjeläge A; Ytterby station B; Kungälv resecentrum 2; 2025-12-14 till 2026-12-12",
      "last": "2026-10-20",
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
      "url": "https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/smogen",
      "org": "sotenas.se",
      "vad": "Badplatsen Sandö på Smögen, Sandstrand med bryggor, badstegar och handikapptrappa. Omklädningsrum, toalett och handikapptoalett. Där finns också gillplats och parkering.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html",
      "org": "sotenas.se",
      "vad": "Det finns cirka 20 större kommunala badplatser., inte får ha hunden med dig när du uppehåller dig på ordnad badplats., Smögen - Sandö, Vallevik och herr- och dambadet vid Makrillviken",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/download/18.4238e10118c6050f88a47254/1703149528362/G%C3%A4llande%20lokala%20ordningsf%C3%B6reskrifter%20KF%202022-03-23%20Lst%202022-05-02.pdf",
      "org": "sotenas.se",
      "vad": "Allmänna lokala ordningsföreskrifter för Sotenäs kommun, Hundar ska hållas kopplade på begravningsplatser och badplatser vilka är angivna i § 3 i, Under tiden f r om 1 maj t o m 30 sept får hundar inte vistas på i § 3 i dessa föreskrifter, Smögen – Sandö, Vallevik och herr- och dambadet vid Makrillviken",
      "last": "2026-11-03",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Smögen–Kungshamn–Uddevalla–Trollhättan, Linjen trafikeras av Vy Buss., Gäller 14 dec 2025 - 12 dec 2026, Smögen busstation … — t.ex. lör/sön Uddevalla central … → Smögen busstation … (88 min); Torp Terminalen … → Smögen … (72 min)",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "lysekil": [
    {
      "url": "https://www.lysekil.se/uppleva-och-gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser",
      "org": "lysekil.se",
      "vad": "Allt ifrån salta och friska bad från klippor till sandstränder med lättillgängliga parkeringar, toaletter samt kiosk; Badplatserna börjar driftsättas i mitten av maj och stängs i slutet av augusti; På flera av badplatserna finns vinterstegar för den som vill bada även under årets kallare månader; Lysekils tätort Pinnevik Norra Hamnen Rinkenäs Fridhem Stångholmesund Kallbadhuset och Trampen; Lysekil har tre kommunala badplatser där våra fyrfotade kompisar får bada",
      "last": "2026-11-17",
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
      "last": "2026-11-25",
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
      "org": "Havets Hus",
      "vad": "Havets Hus grundades 1993; Varje år stiftar närmare 80 000 besökare bekantskap med hundratals fascinerande arter",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/akvariet/om-akvariet/",
      "org": "Havets Hus",
      "vad": "När du stiger in i Havets Hus omges du snart av 25 akvarier; Se hälleflundror, rockor och havsaborrar simma ovanför ditt huvud i tunnelakvariet; Våra akvarier förses hela tiden med kallt, färskt havsvatten från 32 meters djup",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/akvariet/djuren/",
      "org": "Havets Hus",
      "vad": "Alla djur, alger och växter i våra akvarier lever också i det salta Västerhavet utanför Havets Hus; Några är så färgstarka att man skulle kunna tro att de lever i tropiska vatten långt söderut, som blågyltan och den röda sjögurkan",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/projektknaggrocka/",
      "org": "Havets Hus",
      "vad": "I januari 2016 föddes den första knaggrockan på Havets Hus och sommaren 2021 släpptes de första egenuppfödda knaggrockorna ut; Hittills har 13 märkta knaggrockor släppts ut",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/besok-oss/oppettider/",
      "org": "Havets Hus",
      "vad": "2/1 – 14/6 Dagligen …; 15/6 – 16/8 Dagligen …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/att-gora/salsafari/",
      "org": "Havets Hus",
      "vad": "Det blir ofta fullt på parkeringarna i centrum och det blir köer till bilfärjorna över Gullmaren; Kollektivtrafiken åker före köerna så det är ett bra tips",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.havetshus.se/besok-oss/hitta-hit/",
      "org": "Havets Hus",
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
      "vad": "Bara 4 km till Lysekil; Välj campingtomt för husvagn, husbil eller tält – eller bo bekvämt i villavagn med kök, dusch och WC; Säsong: 15 april–15 september; Varmt välkomna till säsong 2026!",
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
      "vad": "där Gullmarsfjorden öppnar upp sig mot havet, ligger den livliga staden Lysekil; samhället utvecklades till en välbesökt badort",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4841__0__LINE__20260817__20261212__dab04179-6e0d-43b0-a0e6-a6dfd3d216d6__0%2C0__2824773.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "841 Lysekil–Torp–Göteborg och omvänt; Gäller 20 aug - 12 dec 2026; Linjen trafikeras av Vy Buss. . Måndag–fredag går bussen från Nils Ericson Terminalen ungefär en gång i timmen (…), lördag och söndag varannan timme; … → Lysekil södra hamnen ….",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "847 Lysekil–Skaftö; Ångbåtsbryggan; Fiskebäckskil brygga; Turen måste förbeställas; Gäller 1 jan - 12 dec 2026 utom 15 juni - 16 aug . Restid ur tabellen: Ångbåtsbryggan … → Fiskebäckskil brygga ….",
      "last": "2026-09-27",
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
    },
    {
      "url": "https://www.vasttrafik.se/info/kosterbatarna/",
      "org": "Västtrafik",
      "vad": "Kosterbåtarna - linje 899, Köp biljett i appen Västtrafik To Go, Köp biljett av däcksman ombord på båten, Du kan ta med dig cykel ombord i mån av plats, Från januari 2027 kommer Kosteröarna istället ingå i zon C",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4899__1__LINE__20260927__20261212__d2244526-47e2-4e6f-9db3-0febd05bdb81__2%2C0__2719851.pdf",
      "org": "Västtrafik",
      "vad": "899 Strömstad–Kosteröarna–Strömstad, Gäller 27 sept - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "grebbestad": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/grebbestad.html",
      "org": "havochvatten.se",
      "vad": "Grebbestad är en badplats i Tanums kommun, 2025: ★★★ Utmärkt kvalitet, 2024: ★★ Bra kvalitet, 2023: ★★ Bra kvalitet, Grus/sandbotten, Stor gräsmatta som klipps mycket regelbundet., Tillsyn två eller fler gånger i veckan under badsäsong., Badbrygga finns vid badplatsen.",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/tanum-strand.html",
      "org": "havochvatten.se",
      "vad": "Tanum Strand är en badplats i Tanums kommun, Berg och grus/sandbotten, Berg och stor gräsmatta som klipps mycket regelbundet., Badbrygga och flyflotte finns vid badplatsen.",
      "last": "2026-11-03",
      "myndighet": true
    },
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
      "url": "https://www.tanum.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.7664b4813898b7df9845725.html",
      "org": "tanum.se",
      "vad": "På badplatserna vid Badberget i Fjällbacka, Tanum Strand strax söder om Grebbestad, Östad samt Edsviksbadet finns handikappramper som underlättar för rörelsehindrade att kunna njuta av sköna bad.",
      "last": "2026-11-17",
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
      "vad": "Strax söder om Grebbestad ligger vår gästhamn med 250 båtplatser vid bryggan i direkt anslutning till hotellområdet., Här finns fräscha toaletter, duschar, tvättmaskiner och torktumlare. Du har också tillgång till landström och WiFi., Hamnservicen är bemannad 19+20+21 juni samt 26 juni till 9 augusti … år 2026., Under perioden sommarperioden kan du boka din båtplats via Dockspot",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4877__0__LINE__20260817__20261212__9d26ba47-e7c4-4a38-b1c9-09f2b69a0feb__2%2C0__2767448.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Havstenssund–Tanumshede och omvänt, Gäller 17 aug - 12 dec 2026, Tanumshede centrum …, Grebbestad busstation … = 10 min, … = 14 min",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4878__0__LINE__20260817__20261212__77a1bfb5-4966-45e6-89b6-e487842a0851__1%2C0__2767487.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tanumshede–Grebbestad–Sportshopen och omvänt — Tanumshede centrum … → Grebbestad busstation … = 18 min",
      "last": "2026-09-27",
      "myndighet": false
    }
  ],
  "fjallbacka": [
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/badberget.html",
      "org": "havochvatten.se",
      "vad": "Badberget är ett EU-bad.; Strax utanför Fjällbacka centrum finns Badbergets badplats. Badplatsen är tillgänglighetsanpassad med ramp och ett stort bord tillgängligt för rullstolar och barnvagnar. Bada ifrån stranden eller bryggan. Här finns wc.; Badbrygga och flyflotte finns vid badplatsen.; Tillsyn två eller fler gånger i veckan under badsäsong.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/badholmen.html",
      "org": "havochvatten.se",
      "vad": "Badholmens badplats finns mitt i centrala Fjällbacka med närheten till Vetteberget och Kungsklyftan.; Du kan välja att bada ifrån klippor, trampolin eller hopptorn. Här finns toaletter. Ingen parkering i närheten.",
      "last": "2026-11-17",
      "myndighet": true
    },
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
      "last": "2026-11-17",
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
      "last": "2026-09-27",
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
      "url": "https://www.vastsverige.com/en/tanum/service/travel-tanum/",
      "org": "vastsverige.com",
      "vad": "a fee is charged from June 15 to August 15 between … and …. The first hour is free; You can park for a maximum of 3 consecutive hours; Free long-term parking in the city's of Grebbestad, Fjällbacka, and Hamburgsund is about a 10-minute walk from the center",
      "last": "2026-09-27",
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
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "875 Tanumshede–Fjällbacka–Dingle–Håby; Gäller 19 aug - 12 dec 2026 . Restid ur tabellen: Tanumshede centrum … → Fjällbacka … (29 min), … (26 min), lördag … (28 min).",
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
      "url": "https://www.grundenshotell.se/",
      "org": "grundenshotell.se",
      "vad": "Grundéns hotell, Furtofta 204 451 79 Grundsund, vid infarten till det charmiga lilla fiskesamhället Grundsund, Gäster erbjuds fri parkering direkt vid hotellet samt gratis utlåning av cyklar, Vår egen Restaurang Pelles",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.pellesrokeri.com/",
      "org": "pellesrokeri.com",
      "vad": "Pelles rökeri i Grundsund, Tack för sommaren 2026 - Vi ses den 30 april 2027, Hugos bu, Bar & café, Terrassen pizza & lounge, Här serveras mat inspirerad av havet – lagad från grunden, både till lunch och middag",
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
      "vad": "Lysekil – Fiskebäckskil, Skaftö - Östersidan, Skaftö, all year round",
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
      "vad": "Skaftö Vandrarhem och B & B är öppet året runt, och förmedlar även veckovisprivatboende, 30 bäddar i 10 individuellt inredda rum – inga sovsalar, Gemensamma duschar och WC, Hemtrevligt boende i hjärtat av Grundsund",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4847__1__LINE__20260101__20261211__e8375385-c9fa-43eb-880d-cff01ed9acbf__1%2C0__2697062.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "847 Lysekil–Skaftö, Gäller 1 jan - 12 dec 2026 utom 15 juni - 16 aug",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4845__0__LINE__20260817__20261212__1fb56a4f-7e7e-4e3c-8b26-b834a4887c8a__1%2C0__2789942.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Grundsund–Fiskebäckskil–Bokenäs–Uddevalla, Torp Terminalen, Gäller 17 aug - 12 dec 2026",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4875__0__LINE__20260817__20261212__83be1ed8-a883-462d-b8ea-6f64e9b6df0c__4%2C0__2768580.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tanumshede–Fjällbacka–Dingle–Håby, Tanumshede centrum, Hamburgsund centrum, Dingle station, Gäller 19 aug - 12 dec 2026",
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
      "vad": "Längst ut i havsbandet, med utsikt mot Måseskärs fyr, ligger Karingo – en unik ostronbar, Karingo erbjuder även uppvärmda havsvattenbad, Anläggningen har egen brygga och kan nås med båt, eller via transport från Käringön med båt eller helikopter, Säsongsöppet från mitten av mars till juni samt från mitten av augusti till december",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf",
      "org": "Västtrafik",
      "vad": "Tuvesvik–Gullholmen–Käringön, Gäller 15 sept - 31 okt 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/",
      "org": "Västtrafik",
      "vad": "Ha djuret i koppel, bur eller väska, Vid resa med båt ska husdjur vara på styrbord",
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
      "url": "https://www.orust.se/kommun-och-politik/kommunfakta",
      "org": "Orust kommun",
      "vad": "Sommartid när de flesta fritidshusen är bebodda och campingplatser, gästhamnar, hotell och vandrarhemmet mera är fyllda av besökare, kanske antalet människor i kommunen närmar sig 40 000 personer.",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.orust.se/jobb-och-foretagande/foretag-stod-och-radgivning/fakta-om-naringslivet",
      "org": "Orust kommun",
      "vad": "Hallberg Rassy anordnar varje år Öppet Varv, Skandinaviens största Segelbåtmässa.",
      "last": "2026-09-27",
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
      "org": "Hallberg-Rassy",
      "vad": "Öppet Varv i Ellös på Orust kommer 2026 att gå den 21-23 augusti.",
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
      "vad": "Klädesholmen är egentligen två holmar – den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen, Ta höger i Bleket, mot bron som leder över till Klädesholmen, till Klädesholmen och Lilla Askerön kan du åka bil eller buss, Under den stora sillperioden 1747–1808 bodde uppemot 1 000 personer på Klädesholmen, idag kommer 40 procent av alla svenska sillkonserver från Klädesholmen, Från Rönnängs brygga går personfärja till Dyrön, Färjan går från Rönnäng cirka en gång i timman, Färjan går även till Tjörnekalv och Åstol, Till exempelvis Dyrön, Åstol, Härön och Tjörnekalv går regelbunden färjetrafik",
      "last": "2026-09-27",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/natur-och-gronomraden/utsiktsplatser",
      "org": "tjorn.se",
      "vad": "Den 15 juni 1960 invigdes Tjörnbroleden – en fast förbindelse mellan Stenungsund på fastlandet och Almön på Tjörn, Tjörnbron är en del av länsväg 160 som går förbi Stenungsund och norrut över Tjörn och Orust, När man åker mot Tjörn och kommer ur tunneln öppnar sig landskapet med en storslagen utsikt över fjordarna och skärgården, Vetteberget, Tjörns högsta berg, bjuder på en magnifik utsikt över havet mot horisonten i väst, Vid bra väder syns Danmark och Skagen, På toppen av Vetteberget ligger ett bronsåldersröse daterat till cirka 1 000 år f.Kr, Med 19 meter i diameter är det ett av de största i Bohuslän",
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
      "vad": "Almöbron rasade … den 18 januari 1980 då brospannet blev påkört av bulkfartyget Star Clipper, Det ena fästet till den största av Tjörnbroarna, Almöbron, Sju bilar körde ut i intet och störtade i havet varvid åtta människor omkom, Dock startade omedelbart planering för provisorisk färjeförbindelse, samt även projekteringen av en ny bro",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://kladesholmenvh.se/",
      "org": "kladesholmenvh.se",
      "vad": "Hamndjup 3–4 meter, El 6 ampere ingår, 30 drop-in · 5 förbokningsbara",
      "last": "2026-11-19",
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
      "vad": "Tjörn är en hel övärld – från huvudön till de bilfria öarna Åstol, Dyrön, Tjörnekalv, Härön och Lilla Brattön, tre internationellt kända besöksmål: Skulptur i Pilane, Nordiska Akvarellmuseet och Pater Noster",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tjörn–Stenungsund/Göteborg, Skärhamn torg, Stenungsunds station, Nils Ericson Terminalen, Gäller 14 dec 2025 - 12 dec 2026",
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
      "vad": "Fisketångens badplats i Kungshamn, Klippbad med sandstrand. Bryggor med badstegar. Handikappramp, omklädningsrum, toalett och handikapptoalett., finns också en liten parkering, Vill du hitta din egen vrå så går du ut på pontonbryggan som leder till, Klövvholmen!",
      "last": "2026-11-03",
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
      "url": "https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html",
      "org": "sotenas.se",
      "vad": "Det finns cirka 20 större kommunala badplatser., inte får ha hunden med dig när du uppehåller dig på ordnad badplats., Kungshamn - Fisketången, Stenbogen och Ramnerer",
      "last": "2026-11-03",
      "myndighet": true
    },
    {
      "url": "https://www.sotenas.se/download/18.4238e10118c6050f88a47254/1703149528362/G%C3%A4llande%20lokala%20ordningsf%C3%B6reskrifter%20KF%202022-03-23%20Lst%202022-05-02.pdf",
      "org": "sotenas.se",
      "vad": "Allmänna lokala ordningsföreskrifter för Sotenäs kommun, Hundar ska hållas kopplade på begravningsplatser och badplatser vilka är angivna i § 3 i, Under tiden f r om 1 maj t o m 30 sept får hundar inte vistas på i § 3 i dessa föreskrifter, Kungshamn – Fisketången, Stenbogen och Ramnerer",
      "last": "2026-11-03",
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
      "url": "https://shop.hamnbageriet.se/",
      "org": "hamnbageriet.se",
      "vad": "ett härligt bageri och café i hjärtat av Kungshamn, 2026",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/4860__0__LINE__20251214__20261212__9f3324f3-f11e-41b4-82f9-35990c574266__1%2C0__2611184.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Smögen–Kungshamn–Uddevalla–Trollhättan, Kungshamns busstation, Uddevalla central, Gäller 14 dec 2025 - 12 dec 2026, Linjen trafikeras av Vy Buss",
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
      "last": "2026-10-19",
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
      "vad": "Under högsäsongen erbjuder vi fasta dagsturer till den fantastiska fyrplatsen Pater Noster.; Tider och upphämtning; 1 Juni - 30 Augusti; Avgång från Marstrand:; Avgång från Skärhamn:",
      "last": "2026-10-19",
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
      "last": "2026-10-19",
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
      "vad": "Restid ca 20 min från både Marstrand söder ifrån och Rönnäng norr ifrån., Hemresa är … till samma hamn som vid utresa., Bakom Marstrands färjeläge, nedanför Coop på Koön, Stansvikstappen, sjötapp i Rönnäng",
      "last": "2026-10-19",
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
  "hono": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/ersdalen.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "bildat 1999, cirka 529 hektar på nordvästra Hönö i Öckerö kommun, \"Strandlinjen är sönderskuren i vikar och uddar och här finns ett rikt fågelliv\", hedar och lavklädda hällar, skalrik jord, grusade stigar, klippformationen Kröckle Kyrka, Kråkudden med fågelskådarskydd, grillplats, torrdass, bad, informationstavla och cykelled",
      "last": "2026-09-27",
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
      "url": "https://www.goteborg.com/guider/ta-dig-till-skargarden",
      "org": "goteborg.com",
      "vad": "väg 155 till färjeläget vid Lilla Varholmen, den avgiftsfria vägfärjan, buss 290 från Järntorget hela vägen inklusive färjeöverfarten och buss X6 från Centralstationen till Lilla Varholmen",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.goteborg.com/platser/hono",
      "org": "goteborg.com",
      "vad": "en populär gästhamn, ett tjugotal butiker samt restauranger, kaféer och pizzerior, Klipporna breder ut sig längs kusterna, badplatserna Hästen, Lappesand, Jungfruviken och Halse Långe",
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
      "url": "https://www.havskatten.com/",
      "org": "havskatten.com",
      "vad": "Vi har 12 rum, alla med bara få meter från bryggkanten, Rum med 2 + 2 enkelsängar gemensam wc/dusch, Här har ni bubbelpool, bastu & relaxutrymme för er själva, Rödvägen 73, 475 41 Hönö, Bjud vännerna på kalas i vår festlokal eller ha företagets konferens här",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://honoklavahamn.se/",
      "org": "honoklavahamn.se",
      "vad": "År 2019 blev Hönö Klåva Hamns ställplats utsedd till Årets Ställplats 2019 av Husbil & Husvagn",
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
      "vad": "I Hönö Klåva hamn finns miljöstation, septisug, vatten, diesel (sjömack) och mastkran, Här finns duschar, toaletter, tvättmaskin och torktumlare, Mellan 1 april och 31 oktober är vårt servicehus vid hamnkontoret öppet, I vår gästhamn tillämpas ingen förbokning av platser, I lågsäsong 1 december – 1 april finns inte vatten att tillgå vid kajerna, Kod till vårt wi-fi för gäster finns på din biljett, Varje båt ansvarar för att ha rätt kablar och uttag med sig . Drivmedel var tidigare bara belagt via en gästhamnsguide som inte är tillåten; nu belagt av hamnens egen sida.",
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
      "url": "https://skargardshotellethono.se/en/home/",
      "org": "Skärgårdshotellet Hönö",
      "vad": "Skafferiet Restaurant, Skärgårdshotellet Hönö is open all year round for hotel guests, diners, conferences and meetings",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://skargardshotellethono.se/",
      "org": "Skärgårdshotellet Hönö",
      "vad": "Vi har 16 härliga rum på andra våningen där hälften av dem har en uteplats mot havet och hamninloppet, fest för upp till 80 personer i sittning",
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
      "org": "vastsverige.com",
      "vad": "Hela året går färjorna från Lilla Varholmens färjeläge ... avgiftsfria turer ut till Öckeröarna",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/centrum-for-fiske/",
      "org": "vastsverige.com",
      "vad": "cirka 300 yrkesfiskare i kommunen, \"var tionde svensk yrkesfiskare\", \"tillsammans med kollegerna i Fiskebäck levererar de 75 procent av all fisk som fångas i Sverige\", fiskebåtar längs kajerna i Hönö Klåva, Öckerö och Rörö",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/visitockero/bo/bourvalhonoklava/",
      "org": "vastsverige.com",
      "vad": "Hönö Sjöbodar som ett av boendena på ön",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/produkter/havskatten/",
      "org": "vastsverige.com",
      "vad": "namnet \"Havskatten Hotell & Vandrarhem\", läge i Hönö Röds hamn, 12 hotelldubbelrum och 9 sovrum med eget badrum, bastu och konferens",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/produkter/honoklavahamn/",
      "org": "vastsverige.com",
      "vad": "",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/visitockero/eat-drink/eat-klava/",
      "org": "vastsverige.com",
      "vad": "",
      "last": "2026-09-16",
      "myndighet": false
    }
  ],
  "gullholmen": [
    {
      "url": "https://www.lansstyrelsen.se/vastra-gotaland/besoksmal/naturreservat/harmano.html",
      "org": "Länsstyrelsen Västra Götaland",
      "vad": "Husen står tätt tillsammans, vilket beror på att Gullholmen fram till 1999 var en så kallad kronoholme., På öns norra del ligger Stenstugan, som är ett av de äldsta husen på ön. Det är idag museum.",
      "last": "2026-11-07",
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
      "url": "https://www.bohuslansmuseum.se/kunskapsbanken_bohuslans_historia/gullholmen/",
      "org": "Bohusläns museum",
      "vad": "bekräftar äldsta säkra belägg 1588, ca 100 hus och ca 400 invånare år 1800 samt drygt 800 invånare 1910",
      "last": "2026-11-07",
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
      "vad": "I receptionen kan man hyra klubbor för att spela minigolf på vår bana., Bastun bokas i vår reception",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/",
      "org": "gullholmsbaden.se",
      "vad": "Här finns utmärkta konferensmöjligheter året runt",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.gullholmsbaden.se/?page_id=19",
      "org": "gullholmsbaden.se",
      "vad": "Sommarterrass med havsutsikt, Njut av mat lagad från grunden, missa inte vår legendariska Räksmörgås, Hantverkarlunch …",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/en/orust/things-to-do/boating/car-less-islands/",
      "org": "Västsverige",
      "vad": "line 381, operate every day all year round, You can bring a bicycle . OBS: samma sida anger tio minuter, men Västtrafiks tidtabell och  (5 minuter till Härmanö/Gullholmen) säger fem.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/sodrabohuslan/produkter/gullholmen-och-harmano/?site=5",
      "org": "Västsverige",
      "vad": "Gullholmen är ett av Bohusläns äldsta fiskelägen, Mycket av öns gamla karaktär finns bevarad än idag med sjöbodar, bryggor och en välbesökt gästhamn.",
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
      "vad": "Gullholmen – Käringön — parkering vid Tuvesvik betalas med kort eller SMS, kontanter tas inte emot",
      "last": "2026-09-16",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6381__0__LINE__20260915__20261031__de9ca77a-74b2-4c80-a07f-0e9d5aafbcd8__0%2C0__2790296.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tuvesvik–Gullholmen–Käringön, Gäller 15 sept - 31 okt 2026 . Från Tuvesvik mån–fre 9 avgångar varav 8 angör Gullholmen (… går direkt till Käringön), lördag 7 och söndag 7 avgångar som alla angör Gullholmen; restid 5 min.",
      "last": "2026-09-27",
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
      "vad": "Klädesholmen är egentligen två holmar – den södra är Klädesholmen med den äldsta bebyggelsen, den norra är Koholmen., så skrev biskop Jens Nilsson från Oslo i sin resa genom Bohuslän 1594, En gissning som mycket väl kan stämma är att de första bosättarna kom hit på 1200-talet.",
      "last": "2026-11-25",
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
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser",
      "org": "tjorn.se",
      "vad": "Badplatsen ligger strax efter bron på Koholmens östra sida., Om Klädesholmens badplats, Badplatsen har betongbrygga, en liten sandstrand, klippor, badbrygga och toaletter., Badplatsen är inte tillgänglighetsanpassad., Badplatsen sköts sommartid av Klädesholmens intresseförening, som också anordnar simskola., Parkeringsplats finns till höger efter bron och härifrån är det 100 meter till badet., Med buss: Hållplats Klädesholmen östra.",
      "last": "2026-11-17",
      "myndighet": true
    },
    {
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada",
      "org": "tjorn.se",
      "vad": "Hund får inte vistas på: Badplats eller lekplats.",
      "last": "2026-11-03",
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
      "url": "https://kladesholmenvh.se/",
      "org": "kladesholmenvh.se",
      "vad": "Hamndjup 3–4 meter, El 6 ampere ingår, El 6 A Färskvatten Dusch & toalett, 30 drop-in · 5 förbokningsbara",
      "last": "2026-11-19",
      "myndighet": false
    },
    {
      "url": "https://kladesholmenvh.se/gasthamn/",
      "org": "kladesholmenvh.se",
      "vad": "– Restaurang och hotell öppet året runt",
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
      "vad": "Förtöjd vid Salt & Sills brygga ligger S/S Silla – vår bad- och bastubåt",
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
      "vad": "House of Herrings – världens första och enda sillbutik – hittar du mitt på Klädesholmen i Bohuslän, precis intill Sillmuseet., samt köpa tillbehör för egna inläggningar, Du hittar också lokala delikatesser från Bohuslän och fina souvenirer att ta med hem",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vastsverige.com/tjorn/produkter/kladesholmens-gasthamn/",
      "org": "vastsverige.com",
      "vad": "Platser: 35, Gästhamnen har formen av en gryta vilket gör att vinden inte stör., Båtkran, dusch, el, livsmedel, mastkran, restaurang, toalett och båtramp. Sugtömning av latrin. Miljöstation. Nära till mataffär.",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik (tidtabell)",
      "vad": "Tjörn–Stenungsund/Göteborg, Gäller 14 dec 2025 - 12 dec 2026, Klädesholmen östra …, Stenungsunds station …, Klädesholmen östra …, Nils Ericson Terminalen … — lör/sön Klädesholmen östra … → Stenungsunds station … (55 min); vardagar Klädesholmen östra … → Nils Ericson Terminalen … (92 min)",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf",
      "org": "Västtrafik",
      "vad": "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng, Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik",
      "vad": "Tjörn–Stenungsund/Göteborg, Nils Ericson Terminalen, J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och, Gäller 14 dec 2025 - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/",
      "org": "Västtrafik",
      "vad": "Ha djuret i koppel, bur eller väska, Vid resa med båt ska husdjur vara på styrbord",
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
      "url": "https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser",
      "org": "tjorn.se",
      "vad": "Dyröns badplats ligger cirka 300 meter österut från färjeläget och Dyröns norra hamn., Dyröns badplats har en liten sandstrand, badbryggor och klippor. Toalett finns vid småbåtshamnen., Badplatsen är delvis tillgänglighetsanpassad med en bred trappa svagt sluttande ner i vattnet., Badplatsen sköts sommartid av Dyröns samhällsförening, som också anordnar simskola., Med buss: Hållplats, Rönnängs brygga – färja vidare till Dyröns norra hamn., Parkeringsmöjligheterna i Rönnäng är begränsade och besökare hänvisas sommartid till parkeringen vid Tjörns ishall (ca 20 min promenad till färjan).",
      "last": "2026-11-17",
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
      "url": "https://www.dyron.se/om-dyron/",
      "org": "dyron.se",
      "vad": "Dyrön strax norr om Marstrand är en av Tjörns kommuns sex skärgårdsöar med boende året runt, Bebyggelsen ligger samlad i en dalgång som sträcker sig mellan Nord- och Sydhamnen, På ömse sidor dalgången är det berg- och klippterräng med hällmarker och sänkor. Raviner genomkorsar landskapet på flera ställen., Berggrunden domineras av mörka mineral, Bergarten kallas för metabasit, På nordöstra sidan av ön finns kuddlavastruktur, ett för landet unikt inslag i berggrunden, området ingår i riksintresse för naturvården (NO 17b), Ett speciellt inslag är de inplanterade vilda bergsfåren s k mufflonfår",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.dyron.se/se-gora/mufflonfar/",
      "org": "dyron.se",
      "vad": "Det bor cirka 50 – 60 stycken på Dyrön som lever fritt bland skog och berg",
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
      "vad": "Ta färjan till en av Tjörns bilfria öar, Håll utkik – med lite tur får du syn på de vilda mufflonfåren",
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
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6361__1__LINE__20251214__20261212__7486a72d-1af2-4dec-a855-76147a8b68fb__0%2C0__2631548.pdf",
      "org": "Västtrafik",
      "vad": "Rönnäng–Tjörnekalv–Dyrön–Åstol–Rönnäng, Gäller 14 dec 2025 - 12 dec 2026 utom 15 juni - 16 aug, C Turen måste förbeställas på tel: 0304-601242",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6208__0__LINE__20251214__20261212__943570e0-dc73-40ba-8902-068c3d54c30d__0%2C0__2597259.pdf",
      "org": "Västtrafik",
      "vad": "Nils Ericson Terminalen, J Efter Aröd fortsätter bussen som ny tur mot Bäckevik, Rönnäng och, Gäller 14 dec 2025 - 12 dec 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6326__0__LINE__20260817__20260930__3f059e68-c41c-44bf-bb36-b0b087de0549__1%2C0__2778882.pdf",
      "org": "Västtrafik",
      "vad": "Dyrön – Rökan – Rörtången, Gäller 17 aug - 30 sept 2026",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://vtstorage002.blob.core.windows.net/vtstoragecontainer01/6326__0__LINE__20261001__20261031__5c843cab-c0f3-4630-88cc-c2a33e730dbc__1%2C0__2778908.pdf",
      "org": "Västtrafik",
      "vad": "Gäller 1 okt - 31 okt 2026, Resan måste förbeställas senast tre timmar före avgång",
      "last": "2026-09-27",
      "myndighet": false
    },
    {
      "url": "https://www.vasttrafik.se/resa-med-oss/under-resan/husdjur/",
      "org": "Västtrafik",
      "vad": "Ha djuret i koppel, bur eller väska, Vid resa med båt ska husdjur vara på styrbord",
      "last": "2026-09-27",
      "myndighet": false
    }
  ]
}

/** Antal öar med minst en publicerbar källa. */
export const OAR_MED_KALLOR = 144

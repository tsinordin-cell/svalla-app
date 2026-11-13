/**
 * Svallas julkalender (2026-11-12, idé från Claes Dahlstrand).
 *
 * Luckorna öppnas en per dag 1–24 december, svensk tid, och bara för inloggade.
 * Innehållet i varje lucka ska vara källkontrollerat innan det läggs in här
 * (samma krav som resten av Svalla: källa och datum, inga priser). Luckor som
 * ännu saknar innehåll visas som "Kommer snart" och avslöjar inget.
 * Partnerluckor med erbjudanden ska ha reklam: true så att de märks som reklam.
 */

export type Kalla = {
  namn: string
  url: string
  /** Datum då sidan lästes och citatet kontrollerades */
  last: string
  /** Ordagrant citat som texten bygger på (visas inte, finns för granskning) */
  citat?: string
}

export type Lucka = {
  dag: number
  titel: string
  text: string
  lank?: string
  lankText?: string
  /** Primärkällor som visas som klickbara länkar under luckan */
  kallor: Kalla[]
  /** true om luckan är ett erbjudande från en partner, märks som reklam */
  reklam?: boolean
}

/**
 * Källkontrollerat 2026-11-13: research med citat från primärkällor, tre oberoende
 * granskare (citat mot källa, aktualitet och motsägelser, regler och språk) och en
 * slutgranskning. Underlaget ligger i Drive: 02_Strategi/04 Innehåll.../Julkalendern.
 * Evenemang ska läsas om på arrangörens sida i början av december.
 */
export const LUCKOR: Lucka[] = [
  {
    dag: 1,
    titel: "Välkommen till Svallas julkalender",
    text: "Varje dag fram till julafton öppnas en ny lucka med tips om skärgården i vinter, från Bottenviken till Bohuslän. Uppgifterna har vi kontrollerat hos arrangörer, kommuner, myndigheter och turistorganisationer, och under varje lucka ser du källan. Hittar du något som inte stämmer, mejla info@svalla.se.",
    lank: "/guider/jul-skargarden",
    lankText: "Läs Svallas guide till jul i skärgården",
    kallor: [],
  },
  {
    dag: 2,
    titel: "Julmarknader vid havet andra advent",
    text: "Andra advent blir det julmarknad i flera kuststäder. I Vaxholm fylls Rådhustorget med brända mandlar, hantverk och granar lördag 5 och söndag 6 december. Samma helg är det julmarknad i Karlskrona, på Blekinge museum och Bergqvistska gården, kl. 10 till 16 båda dagarna.",
    lank: "/o/vaxholm",
    lankText: "Läs mer om Vaxholm",
    kallor: [
      { namn: "Destination Vaxholm", url: "https://www.destinationvaxholm.se/events/vaxholms-julmarknad-2026", last: "2026-11-13", citat: "Den andra helgen i advent, 5 – 6 december, är det åter dags för Vaxholms traditionsenliga julmarknad. Med brända mandlar, hantverk, glögg och granar sätter vi tillsammans fart på julkänslorna. Tomten kommer, kommer du?\" / \"Rådhustorget Torget Vaxholm" },
      { namn: "Karlskrona Julmarknad (Lions Club Jarramas i samarbete med Blekinge Museum)", url: "https://www.karlskronajulmarknad.se/", last: "2026-11-13", citat: "Karlskrona Julmarknad 5-6 december 2026, kl 10-16\" / \"De äldre miljöerna på Blekinge museum och Bergqvistska gården ger den rätta julstämningen" }
    ],
  },
  {
    dag: 3,
    titel: "Julbord ute på öarna",
    text: "Flera restauranger ute på öarna dukar julbord i december. Utö Värdshus serverar julbord 27 november till 19 december, och Waxholmsbåten från Årsta brygga tar cirka 40 minuter till Gruvbryggan. Sandhamn Seglarhotell har julbord vissa dagar i veckan 26 november till 24 december. Rökeriet på Fjäderholmarna har julbord till 20 december, och båtresan dit tar ungefär 25 minuter.",
    lank: "/guider/julbord-skargarden",
    lankText: "Läs Svallas guide till julbord i skärgården",
    kallor: [
      { namn: "Utö Värdshus", url: "https://www.utovardshus.se/julbord/", last: "2026-11-13", citat: "Julbord 2026\" / \"27 november – 19 december\" / \"Till varje sittning finns en ordinarie båt som passar tur och retur.\" / \"Den bekväma Waxholmsbåten lägger till vid Gruvbryggan. Turen genom skärgården tar cirka 40 minuter, och därifrån är det några minuters promenad upp till värdshuset\" / \"Båten går från Årsta Brygga direkt till Utö" },
      { namn: "Sandhamn Seglarhotell", url: "https://www.sandhamn.com/sv/kalender/julbord", last: "2026-11-13", citat: "Julbord 2026: 26 november – 24 december\" / \"Serveras: från kl. 17.00, torsdag–lördag samt julafton\" / \"Ingår: välkomstglögg och kaffebuffé" },
      { namn: "Rökeriet Fjäderholmarna", url: "https://www.rokeriet-fjaderholmarna.se/julbord", last: "2026-11-13", citat: "Julbordet hålls från 20 november till 20 december 2026\" / \"Resan från Strandvägen till Fjäderholmarna tar ca 25 minuter, med stopp vid Nacka Strand.\" / \"Båtbiljetter tur & retur bokas separat via Strömma." }
    ],
  },
  {
    dag: 4,
    titel: "Visste du: havet fryser vid olika temperaturer",
    text: "Saltet i havet gör att isen bildas först när vattnet är under noll grader. I Bottenviken är salthalten bara 3 till 4 gram per kilo havsvatten, och fryspunkten ligger strax under noll. I Skagerack, med en salthalt kring 30 promille, fryser vattnet vid cirka minus 2 grader. Även isen blir olika: längs norrlandskusten hård och glasklar, i Skageracks saltare vatten grynig och porös.",
    lank: "/guider/vinter-i-skargarden",
    lankText: "Läs om vinter i skärgården",
    kallor: [
      { namn: "SMHI kunskapsbanken, Olika typer av is till havs", url: "https://www.smhi.se/kunskapsbanken/oceanografi/is-till-havs/olika-typer-av-is-till-havs", last: "2026-11-13", citat: "Saltet i havet gör att is bildas först när vattentemperaturen är under noll grader. I Bottenvikens bräckta vatten är fryspunkten vid något under noll grader, i Skagerack med salthalten ca 30 promille, vid cirka -2 grader. Isens karaktär varierar med vattnets salthalt. I insjöar och längs norrlandskusten bildas hård och glasklar kärnis. I Skagerraks saltare vatten blir isen inte lika hård. Den får istället en grynig och porös, men ändå fast konsistens." },
      { namn: "SMHI kunskapsbanken, Salt i haven runt Sverige", url: "https://www.smhi.se/kunskapsbanken/oceanografi/haven-runt-sverige/salt-i-haven-runt-sverige-", last: "2026-11-13", citat: "I Bottenviken är salthalten 3–4 gram salt per kilo havsvatten, i Bottenhavet 5–6 gram per kilo, i Egentliga Östersjön 6–9 gram per kilo och i Västerhavet 15–30 gram per kilo." }
    ],
  },
  {
    dag: 5,
    titel: "Fyra öar du når med båt i december",
    text: "Till flera öar går båtarna hela vintern. Till Vaxholm tar båten från Strömkajen en timme, och utanför sommaren går det flera turer per dag. Ut till Sandhamn går det turer året runt. Waxholmsbåten går året om från Årsta brygga till Gruvbryggan på Utö, och till Finnhamn finns reguljär båttrafik året runt med Waxholmsbolaget.",
    lank: "/guider/vinter-i-skargarden",
    lankText: "Läs om vinter i skärgården",
    kallor: [
      { namn: "Waxholmsbolaget, resmål Vaxholm (meta-beskrivning; brödtexten kräver JavaScript)", url: "https://waxholmsbolaget.se/reseplanering/resmal/vaxholm", last: "2026-11-13", citat: "Båtresan från Strömkajen tar bara en timme och under sommaren går det turer många gånger om dagen, och övrig tid på året går det flera per dag." },
      { namn: "Waxholmsbolaget, resmål Sandhamn (meta-beskrivning; brödtexten kräver JavaScript)", url: "https://waxholmsbolaget.se/reseplanering/resmal/sandhamn", last: "2026-11-13", citat: "Ut till Sandhamn går det turer året runt." },
      { namn: "Länsstyrelsen Stockholm, Utö naturreservat", url: "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html", last: "2026-11-13", citat: "Kollektivtrafik: Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan." },
      { namn: "Länsstyrelsen Stockholm, Finnhamn naturreservat", url: "https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html", last: "2026-11-13", citat: "Reguljär båttrafik året runt med Waxholmsbolaget." }
    ],
  },
  {
    dag: 6,
    titel: "Färja till ön, även i vinter",
    text: "Det är inte bara i Stockholms skärgård som båtarna går i december. Ventrafiken kör färja mellan Landskrona och Ven året runt, och överfarten från Skeppsbron tar cirka 30 minuter. I Höga kusten har M/F Ulvön turlistor för hela december, även för 24 till 31 december. Turlistorna gäller med reservation för väder och is, så kolla din avgång innan du åker.",
    lank: "/o/ven",
    lankText: "Läs mer om Ven",
    kallor: [
      { namn: "Ventrafiken (startsida)", url: "https://ventrafiken.se/", last: "2026-11-13", citat: "Vi bedriver färjetrafik mellan Landskrona och Ven året runt.\" (sidans meta-beskrivning) / \"Utflykten tar sin start på Skeppsbron i Landskrona där ni stiger ombord på en av Ventrafikens båtar. Överfarten tar cirka 30 minuter" },
      { namn: "M/F Ulvön (Örnsköldsviks Hamn & Logistik), Turlistor", url: "https://www.mfulvon.se/turlistor", last: "2026-11-13", citat: "Turlistorna gäller med reservation för hinder orsakade av väderförhållanden, is eller andra omständigheter.\" / \"Turlista 1 nov - 23 dec 2026\" / \"Turlista 24 - 31 december 2026" },
      { namn: "M/F Ulvön, startsida", url: "https://www.mfulvon.se/", last: "2026-11-13", citat: "Res med oss till Höga Kustens skärgård" }
    ],
  },
  {
    dag: 7,
    titel: "Kallbad vid havet i vinter",
    text: "Malmö stad skriver att det går att kallbada året om på Ribersborgs och Sibbarps kallbadhus, och på stadens badplatser finns förstärkta vinterbadtrappor vid vissa bryggor under vinterhalvåret. Bada aldrig ensam, och gå inte i vattnet om du är osäker på hur kroppen reagerar på kylan.",
    lank: "https://malmo.se/Uppleva-och-gora/Bada-och-simma/Strander-och-badplatser/Vinterbadbryggor.html",
    lankText: "Se vinterbadbryggorna hos Malmö stad",
    kallor: [
      { namn: "Malmö stad, Vinterbadbryggor (uppdaterad 2026-09-18)", url: "https://malmo.se/Uppleva-och-gora/Bada-och-simma/Strander-och-badplatser/Vinterbadbryggor.html", last: "2026-11-13", citat: "Förutom våra badplatser finns det även möjlighet till kallbad på Ribersborgs och Sibbarps kallbadhus året om. ... Under vinterhalvåret finns det badmöjligheter vid specifika bryggor vid varje badplats via förstärkta vinterbadtrappor." }
    ],
  },
  {
    dag: 8,
    titel: "De som har jour även på julafton",
    text: "Medan vi firar jul finns det frivilliga som är redo att rycka ut. Sjöräddningssällskapets 2 500 frivilliga sjöräddare har jour dygnet runt, året om, och inom 15 minuter är räddningen på väg när larmet går. Sällskapets vd har beskrivit det som att rycka ut \"sommar som vinter, under julafton som på en vanlig tisdag\". Ett varmt tack till alla som står redo.",
    lank: "https://www.sjoraddning.se/om-oss",
    lankText: "Läs mer om Sjöräddningssällskapet",
    kallor: [
      { namn: "Sjöräddningssällskapet, Om oss", url: "https://www.sjoraddning.se/om-oss", last: "2026-11-13", citat: "Vi har 73 räddningsstationer och fler än 270 räddningsenheter längs våra kuster och i våra största sjöar. Och 2 500 frivilliga sjöräddare som är beredda att rycka ut, dygnet runt, året om. Inom 15 minuter är räddningen på väg när larmet går." },
      { namn: "Sjöräddningssällskapet, Årets Sjöräddare (uppdaterad 2026-03-31)", url: "https://www.sjoraddning.se/arets-sjoraddare", last: "2026-11-13", citat: "Sjöräddningssällskapets 2 500 frivilliga sjöräddare har jour dygnet runt, året om." },
      { namn: "Sjöräddningssällskapet, nyhet 'De nomineras till Årets Sjöräddare 2023' (publicerad 1 mar 2024)", url: "https://www.sjoraddning.se/artiklar/de-nomineras-till-arets-sjoraddare-2023", last: "2026-11-13", citat: "Att helt frivilligt ha jour och rycka ut sommar som vinter, under julafton som på en vanlig tisdag, det förtjänar en egen utmärkelse, säger Sjöräddningssällskapets vd Lars Samuelsson." }
    ],
  },
  {
    dag: 9,
    titel: "Julmarknader tredje advent",
    text: "Tredje advent blir det flera julmarknader. På Artipelag i Gustavsberg fylls Artboxen med konsthantverk och design 12 och 13 december. På Skeppsholmen i Stockholm har Skeppsholmsgårdens julmarknad sjö och hantverkstema, lördag och söndag kl. 11 till 17. I Härnösand är det julmarknad bland de historiska byggnaderna på Murberget söndag 13 december.",
    lank: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/",
    lankText: "Läs om julmarknaden på Artipelag",
    kallor: [
      { namn: "Artipelag", url: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/", last: "2026-11-13", citat: "12–13 december 2026, inomhus i Artboxen på Artipelag." },
      { namn: "Artipelag", url: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/", last: "2026-11-13", citat: "Artboxen fylls med konsthantverk, design och julstämning" },
      { namn: "Skeppsholmsgården", url: "https://skeppsholmsgarden.se/skeppsholmsgardens-julmarknad-12-13-december-2026/", last: "2026-11-13", citat: "Helgen den tredje advent (12-13 december) blir det julmarknad på Skeppsholmsgårdens område. Vår julmarknad har sjö- och hantverkstema." },
      { namn: "Skeppsholmsgården", url: "https://skeppsholmsgarden.se/skeppsholmsgardens-julmarknad-12-13-december-2026/", last: "2026-11-13", citat: "Julmarknaden pågår under lördag och söndag mellan 11 och 17." },
      { namn: "Västernorrlands museum", url: "https://www.vnmuseum.se/julmarknad-pa-murberget", last: "2026-11-13", citat: "Upplev magin på Murberget friluftsmuseums årliga julmarknad söndagen den 13 december 2026!" },
      { namn: "Västernorrlands museum", url: "https://www.vnmuseum.se/julmarknad-pa-murberget", last: "2026-11-13", citat: "Traditionsenligt hålls den på tredje advent bland de historiska byggnaderna och miljöerna på området." }
    ],
  },
  {
    dag: 10,
    titel: "Julbord på Carlstens fästning",
    text: "På Marstrand möts julbordsgästerna vid färjeläget för ett gemensamt fackeltåg upp till Carlstens fästning, om vädret tillåter. Där väntar glögg och pepparkaka och sedan julbord i Riddarsalen. I december serveras julbordet även 11, 12, 13, 18 och 19 december, enligt fästningens kalender för 2026.",
    lank: "/o/marstrand",
    lankText: "Läs mer om Marstrand",
    kallor: [
      { namn: "Carlstens fästning, Julbord 2026", url: "http://carlsten.se/julbord/", last: "2026-11-13", citat: "Välkommen på Julbord på Carlstens Fästning 2026 | Vi möter alla gäster vid färjeläget på Marstrandsön för gemensamt fackeltåg (om vädret tillåter) upp till Kungsporten ... med stopp för glögg och pepparkaka innan ni kommer upp till Riddarsalen ... Datum 2026 | ... fredag 11 dec | lördag 12 dec | söndag 13 dec | fredag 18 dec | lördag 19 dec" }
    ],
  },
  {
    dag: 11,
    titel: "Höga Kusten i vinterskrud",
    text: "Höga Kusten är inte bara en sommarplats. På vintern går det att vandra med eller utan snöskor, och vintertid rekommenderas Östra Bergsstigen, som utgår från Naturum Höga Kusten. Snöskor kan hyras bland annat hos FriluftsByn och Skutskepparn i Barsta. Ha extra säkerhetsmarginal: ledmarkeringarna är anlagda för barmark, och mobiltäckningen är dålig i delar av Höga Kusten.",
    lank: "/guider/hoga-kusten-guide",
    lankText: "Läs Svallas guide till Höga Kusten",
    kallor: [
      { namn: "Höga Kusten (hogakusten.com)", url: "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/vinter/snoskovandring", last: "2026-11-13", citat: "Men vandring är inte bara en sommaraktivitet. Vandring med eller utan snöskor på vintern är en upplevelse i sig" },
      { namn: "Höga Kusten (hogakusten.com)", url: "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/vinter/snoskovandring", last: "2026-11-13", citat: "Men vintertid rekommenderar vi Östra Bergsstigen som utgår från Naturum Höga Kusten eller Höga Kusten Stigen som utgår från FriluftsByn." },
      { namn: "Höga Kusten (hogakusten.com)", url: "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/vinter/snoskovandring", last: "2026-11-13", citat: "Här kan du hyra snöskor: Hotell Höga Kusten FriluftsByn Skutskepparn i Barsta" },
      { namn: "Höga Kusten (hogakusten.com)", url: "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/vinter/snoskovandring", last: "2026-11-13", citat: "Ledmarkeringarna är anlagda med barmark i åtanke." },
      { namn: "Höga Kusten (hogakusten.com)", url: "https://www.hogakusten.com/sv/upplevelser/natur-friluftsliv/vinter/snoskovandring", last: "2026-11-13", citat: "1. Ha lite extra säkerhetsmarginaler ... Tänk också på att du inte kan förlita dig på telefonen eftersom mobiltäckningen är dålig i delar av Höga Kusten." }
    ],
  },
  {
    dag: 12,
    titel: "Bastu och vinterdopp på Hyppeln",
    text: "På Hyppeln finns en bastutunna vid Evas brygga i gästhamnen. Den går att boka året runt, men oktober till mars bara helger och lov. Bokning och betalning sker i förväg på Hyppelns webbplats. Barn under 15 år får bara bada tillsammans med vuxna. Bada aldrig ensam i vinterhavet.",
    lank: "https://hyppeln.com/hamnen/bastu-i-hamnen/",
    lankText: "Boka bastun på Hyppeln",
    kallor: [
      { namn: "Hyppeln, Bastu i hamnen", url: "https://hyppeln.com/hamnen/bastu-i-hamnen/", last: "2026-11-13", citat: "Vid Evas brygga i gästhamnen finns vår fina bastutunna. ... Du förbokar och betalar bastun enligt nedan. ... Barn under 15 år får bara bada tillsammans med vuxna. | Bastun går att boka året runt. Oktober till mars dock endast helger och lov." }
    ],
  },
  {
    dag: 13,
    titel: "Luciatåg i skärgården",
    text: "Glad Lucia! På Artipelag på Värmdö går ett traditionellt luciatåg i foajén i dag söndag 13 december, liksom i går, öppet för alla besökare. I Artboxen intill pågår samtidigt julmarknad med konsthantverk, design och julklappar från utvalda utställare.",
    lank: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/",
    lankText: "Läs mer hos Artipelag",
    kallor: [
      { namn: "Artipelag", url: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/", last: "2026-11-13", citat: "Båda dagarna bjuds det på ett stämningsfullt, traditionellt luciatåg i Artipelags foajé, öppet för alla besökare." },
      { namn: "Artipelag", url: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/", last: "2026-11-13", citat: "12–13 december 2026, inomhus i Artboxen på Artipelag." },
      { namn: "Artipelag", url: "https://artipelag.se/", last: "2026-11-13", citat: "Artipelag är en internationell destination för konst, design, mat och event – vackert belägen på Värmdö i Stockholms skärgård" },
      { namn: "Artipelag", url: "https://artipelag.se/pa-gang/aktivitet/julmarknad-pa-artipelag/", last: "2026-11-13", citat: "Bland marknadsstånden hittar du konsthantverk, design, säsongens godsaker och personliga julklappar från noggrant utvalda utställare." }
    ],
  },
  {
    dag: 14,
    titel: "Isvett i skärgården",
    text: "Gå aldrig ut på isen om du inte är säker på att den håller. Issäkerhetsrådet anger att kärnis ska vara minst 10 cm tjock, men i skärgården och på havet är isen mer riskabel: saltis är svagare än insjöis och ger inte ifrån sig tydliga ljud när den tunnar ut. Var aldrig ensam på isen, ha isdubbar med dig och berätta var du ska och när du kommer tillbaka.",
    lank: "https://www.issakerhet.se/isvett/",
    lankText: "Läs Issäkerhetsrådets isvett",
    kallor: [
      { namn: "Issäkerhetsrådet (issakerhet.se)", url: "https://www.issakerhet.se/isvett/", last: "2026-11-13", citat: "Gå aldrig på is om du inte är säker på att den håller. Kärnis ska vara minst 10 cm tjock" },
      { namn: "Issäkerhetsrådet (issakerhet.se)", url: "https://www.issakerhet.se/fakta-om-is/", last: "2026-11-13", citat: "I skärgårdar och hav är isen mer riskabel än på insjöar framförallt på grund av att saltet i vattnet gör isen mindre stark. Saltis kan variera mycket i styrka, men är alltid svagare än insjöis. Den ger inte ifrån sig tydliga ljud när den tunnar ut och den är svårare att bedöma med ispiken." },
      { namn: "Issäkerhetsrådet (issakerhet.se)", url: "https://www.issakerhet.se/isvett/", last: "2026-11-13", citat: "Var aldrig ensam på isen; Ha alltid med dig isdubbar och annan säkerhetsutrustning på isen; Prova alltid isen med en ispik om du är osäker" },
      { namn: "Issäkerhetsrådet (issakerhet.se)", url: "https://www.issakerhet.se/isvett/", last: "2026-11-13", citat: "Meddela alltid var någonstans du ska vara och när du tänker komma tillbaka" },
      { namn: "Issäkerhetsrådet (issakerhet.se)", url: "https://www.issakerhet.se/", last: "2026-11-13", citat: "Issäkerhetsrådet och Issäkerhet.se är ett samarbete mellan Svenska Livräddningssällskapet, Sveriges Snöskoterägares Riksorganisation (SNOFED), Friluftsfrämjandet, Sjöräddningssällskapet, Skridskonätet och Sportfiskarna." }
    ],
  },
  {
    dag: 15,
    titel: "Bil på havet: Luleås isvägar",
    text: "Ett tips att planera för efter jul. När isen utanför Luleå är tillräckligt tjock plogas cirka 30 km isvägar ut till Hindersön, Storbrändön, Sandön och Junkön. Enligt Luleå kommun öppnas vägarna i regel i slutet av januari eller början av februari, och de kan tillfälligt stängas vid kraftigt snöfall, svår dimma eller mycket flödvatten. Max 30 km i timmen, och kolla kommunens statussida innan du kör ut.",
    lank: "https://www.lulea.se/boende--gator/gator-och-trafik/isvagar.html",
    lankText: "Se isvägarnas status hos Luleå kommun",
    kallor: [
      { namn: "Visit Luleå", url: "https://visitlulea.se/destinationer/isvagarna", last: "2026-11-13", citat: "När isarna längs kusten utanför Luleå är tillräckligt tjocka vintertid, plogas cirka 30 km isbilvägar upp till ett par öar i Luleå skärgård. Gör en dagsutflykt med din egen personbil och besök öarna Hindersön, Storbrändön, Sandön och Junkön." },
      { namn: "Luleå kommun", url: "https://www.lulea.se/boende--gator/gator-och-trafik/isvagar.html", last: "2026-11-13", citat: "I regel öppnas vägarna i slutet av januari eller i början av februari." },
      { namn: "Luleå kommun", url: "https://www.lulea.se/boende--gator/gator-och-trafik/isvagar.html", last: "2026-11-13", citat: "Vägarna kan tillfälligt stängas vid kraftigt snöfall, svår dimma eller mycket flödvatten." },
      { namn: "Luleå kommun", url: "https://www.lulea.se/boende--gator/gator-och-trafik/isvagar.html", last: "2026-11-13", citat: "Generellt gäller följande regler: max 30 kilometer/timmen" },
      { namn: "Luleå kommun", url: "https://www.lulea.se/boende--gator/gator-och-trafik/isvagar.html", last: "2026-11-13", citat: "På den här sidan informerar vi fortlöpande om isvägarnas bärighet och när våra isvägar öppnas och stängs för säsongen." }
    ],
  },
  {
    dag: 16,
    titel: "Julbord ombord från Stockholm",
    text: "Julbord med skärgården utanför fönstret. Strömma Kanalbolagets julbordskryssningar avgår från Nybrokajen och Strandvägen i centrala Stockholm, och du väljer mellan lunch på cirka 2,5 timmar och middag på cirka 3 timmar. I år är sex klassiska skärgårdsfartyg med. Kryssningarna går ända till 26 december, och 24 till 26 december avgår lunchen kl. 13 och middagen kl. 18.",
    lank: "https://www.stromma.com/sv-se/stockholm/julbord/julbordskryssningar-i-stockholms-skargard/",
    lankText: "Läs mer hos Strömma",
    kallor: [
      { namn: "Strömma Kanalbolaget", url: "https://www.stromma.com/sv-se/stockholm/julbord/julbordskryssningar-i-stockholms-skargard/", last: "2026-11-13", citat: "Kryssningarna avgår från Nybrokajen/Strandvägen i centrala Stockholm. När du väljer datum i bokningen ser du aktuellt fartyg, exakt avgångsplats och pris." },
      { namn: "Strömma Kanalbolaget", url: "https://www.stromma.com/sv-se/stockholm/julbord/julbordskryssningar-i-stockholms-skargard/", last: "2026-11-13", citat: "Välj mellan en lunchkryssning på cirka 2,5 timmar och en middagskryssning på cirka 3 timmar." },
      { namn: "Strömma Kanalbolaget", url: "https://www.stromma.com/sv-se/stockholm/julbord/julbordskryssningar-i-stockholms-skargard/", last: "2026-11-13", citat: "Här bokar du julbord ombord på sex klassiska skärgårdsfartyg, alla med sin egen karaktär och meny." },
      { namn: "Strömma Kanalbolaget, Julbordsöversikt 2026 (PDF)", url: "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/04_christmas/overview/julbordsoversikt_2026_a4s.pdf", last: "2026-11-13", citat: "Julbordskryssningar 2026 ... (24-26 dec avgår lunchen kl. 13:00 och middagen kl. 18:00) Med reservation för att informationen ändras. Aktuellt schema finns i bokningskalendern." },
      { namn: "Strömma Kanalbolaget, Julbordsöversikt 2026 (PDF)", url: "https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/04_christmas/overview/julbordsoversikt_2026_a4s.pdf", last: "2026-11-13", citat: "VECKA 48 Mån 23 nov ... VECKA 52 Mån 21 dec Tis 22 dec Ons 23 dec Tor 24 dec Fre 25 dec Lör 26 dec" }
    ],
  },
  {
    dag: 17,
    titel: "Gotland i vinter",
    text: "Gotland är en ö att besöka även i vinter, men planera resan i god tid kring jul. Destination Gotlands terminaler i Visby, Nynäshamn och Oskarshamn håller stängt på julafton. Väl på ön tar vägfärjan dig från Fårösund till Broa på Fårö på sex minuter.",
    lank: "/guider/vinter-gotland",
    lankText: "Läs om Gotland i vinter",
    kallor: [
      { namn: "Destination Gotland, Färjeterminaler", url: "https://www.destinationgotland.se/allt-om-resan/farjeterminaler/visby/", last: "2026-11-13", citat: "Här hittar du information om Gotlandsfärjans färjeterminaler i Visby, Nynäshamn och Oskarshamn. ... [Visby] 21 - 27 DECEMBER 2026 ... Julafton, 24 december: Stängt ... [Nynäshamn] 21 - 27 DECEMBER 2026 ... Julafton, 24 december: Stängt ... [Oskarshamn] 21 - 27 DECEMBER 2026 ... Julafton, 24 december: Stängt" },
      { namn: "Trafikverket, Fårösundsleden", url: "https://www.trafikverket.se/resa-och-trafik/farjetrafik/farosundsleden/", last: "2026-11-13", citat: "Fårösundsleden går mellan Fårösund på norra Gotland och Broa på Fårö. Färjeledens längd är 1300 meter och överfartstiden är sex minuter." }
    ],
  },
  {
    dag: 18,
    titel: "Gråsälen i vinterhavet",
    text: "Gråsälen är den största av Sveriges tre sälarter, och en hanne kan bli upp till 3 meter lång. Den kan dyka flera hundra meter och äter mest fisk som strömming. Om några månader är det dags för kutarna: i Östersjön föds de i februari och mars, gärna på isen, med en vit och ullig päls.",
    lank: "https://www.havochvatten.se/arter-och-livsmiljoer/arter-och-naturtyper/grasal.html",
    lankText: "Läs mer om gråsälen hos Havs- och vattenmyndigheten",
    kallor: [
      { namn: "Havs- och vattenmyndigheten, Gråsäl", url: "https://www.havochvatten.se/arter-och-livsmiljoer/arter-och-naturtyper/grasal.html", last: "2026-11-13", citat: "Gråsälen (Halichoerus grypus) är den största av Sveriges tre sälarter. ... En vuxen gråsäl kan bli upp till 3 meter lång och väga drygt 300 kilo. Det gäller hannarna. ... Gråsälar kan dyka till flera hundra meters djup. De livnär sig på fisk, mest stimfisk och bottenlevande arter som strömming, tånglake och flundror. ... I Östersjön föds ungarna (kutarna) mellan februari och mars, gärna på isen. ... En nyfödd gråsäl väger ungefär 12 kilo och är en knapp meter lång. Den har en vit och ullig kutpäls ... Den har en vit och ullig kutpäls" },
      { namn: "Naturhistoriska riksmuseet, Sälar", url: "https://www.nrm.se/fakta-om-naturen/djur/daggdjur/rovdjur/salar", last: "2026-11-13", citat: "Av Sveriges tre sälarter är gråsälen den största. Hanen kan bli som mest cirka 3 meter lång ... Gråsälen föder sina ungar mellan februari och mars, gärna i packisbälten ... Gråsälen äter all slags fisk men strömming dominerar i alla åldersgrupper." }
    ],
  },
  {
    dag: 19,
    titel: "Logga din vintertur",
    text: "Har du varit ute med båten i höst eller vinter? Spara turen i Svalla med Logga tur, så har du den kvar när du planerar nästa säsong.",
    lank: "/logga",
    lankText: "Logga en tur",
    kallor: [],
  },
  {
    dag: 20,
    titel: "Nyår i skärgården",
    text: "Om elva dagar är det nyårsafton, och flera hotell i skärgården har nyårspaket. Sandhamn Seglarhotell firar 31 december med bubbel och en fyrarätters supé. På Marholmen i Roslagens skärgård finns nyårspaket med boende på hotellet, i eget hotellhus eller i villa.",
    lank: "/guider/nyar-skargarden",
    lankText: "Läs Svallas guide till nyår i skärgården",
    kallor: [
      { namn: "Sandhamn Seglarhotell", url: "https://www.sandhamn.com/sv/kalender/nyarafton", last: "2026-11-13", citat: "Nyårsfirande | 31 DECEMBER 2026 ... en nyårsafton med bubbel, en festlig fyrarätters supé och skön stämning hela vägen fram till tolvslaget." },
      { namn: "Marholmen", url: "https://marholmen.se/nyarsfirande/", last: "2026-11-13", citat: "Fira nyår på Marholmen i Roslagens skärgård ... Bo på hotell eller samla familjen och vännerna i ett eget Hotellhus, Skärgårdshus eller villa" }
    ],
  },
  {
    dag: 21,
    titel: "Vintersolståndet",
    text: "I dag, måndag 21 december, är det vintersolstånd och årets kortaste dag. I sydligaste Sverige är solen uppe ungefär sju timmar, och några mil norr om Pajala och Gällivare råder polarnatt. Efter i dag börjar dagarna bli längre igen.",
    lank: "/guider/vinter-i-skargarden",
    lankText: "Läs om vintern i skärgården",
    kallor: [
      { namn: "SMHI, Dagslängdens förändring under året", url: "https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/dagslangdens-forandring-under-aret", last: "2026-11-13", citat: "I sydligaste Sverige varierar dagens längd mellan 7 och 17 timmar. Figuren visar tiden då solen är över horisonten" },
      { namn: "SMHI, Sommarsolstånd och vintersolstånd", url: "https://www.smhi.se/kunskapsbanken/meteorologi/solens-upp--och-nedgang/sommarsolstand-och-vintersolstand", last: "2026-11-13", citat: "Vintersolståndet infaller den 21 december under skottår samt även det andra och det tredje året i skottårscykeln. ... Med dessa reservationer blir det vid vintersolståndet polarnatt först några mil norr om en linje genom Pajala och Gällivare." }
    ],
  },
  {
    dag: 22,
    titel: "Så går båtarna i jul och nyår",
    text: "Ska du ut i skärgården i jul? Waxholmsbolagets båtar går lite annorlunda kring helgerna. Onsdag 23 december går trafiken som en fredag, julafton som en lördag och juldagen och annandag jul som söndagar. Nyårsafton går som en lördag och nyårsdagen som en söndag. Kundtjänst svarar dygnet runt på 08 600 10 00. I Göteborg, Mölndal och Partille kör Västtrafik julafton som en söndag.",
    lank: "https://waxholmsbolaget.se/artikel/helgtrafik",
    lankText: "Se Waxholmsbolagets helgtrafik",
    kallor: [
      { namn: "Waxholmsbolaget, Helgtrafik", url: "https://waxholmsbolaget.se/artikel/helgtrafik", last: "2026-11-13", citat: "Jul- och nyårsveckorna 2026-2027 | ... Onsdag 23 december: trafiken går som en fredag | Julafton torsdag 24 december: trafiken går som en lördag | Juldagen fredag 25 december: trafiken går som en söndag | Annandag jul lördag 26 december: trafiken går som en söndag | ... Nyårsafton torsdag 31 december: trafiken går som en lördag | Nyårsdagen fredag 1 januari 2027: trafiken går som en söndag" },
      { namn: "Waxholmsbolaget, Trafikläget", url: "https://waxholmsbolaget.se/reseplanering/trafiklaget", last: "2026-11-13", citat: "Kundtjänst har öppet alla dagar, dygnet runt Ring 08-600 10 00" },
      { namn: "Västtrafik, helgdagar", url: "https://www.vasttrafik.se/info/helgdagar/", last: "2026-11-13", citat: "Julafton | Lördag men ingen nattrafik. All trafik inom Göteborg, Mölndal och Partille kör som en söndag." }
    ],
  },
  {
    dag: 23,
    titel: "Visste du: julgranen kan bli fiskhem",
    text: "Visste du att gamla julgranar kan bli lekplats för fisk? Buntade till så kallade risvasar och sänkta i vattnet ger de fisken något att leka på och ynglen skydd. Innan du lägger ut en: Sportfiskarna skriver att det krävs tillstånd från markägaren, och att det ska stämmas av med länsstyrelsen och kommunen.",
    lank: "https://www.sportfiskarna.se/om-oss/aktuellt/nyheter/nyhet/sa-bygger-man-en-risvase/",
    lankText: "Läs mer om risvasar hos Sportfiskarna",
    kallor: [
      { namn: "Sportfiskarna, Så bygger man en risvase!", url: "https://www.sportfiskarna.se/om-oss/aktuellt/nyheter/nyhet/sa-bygger-man-en-risvase/", last: "2026-11-13", citat: "En risvase är en större mängd ris eller buskar som på olika sätt buntas ihop och sänks i ett vatten för att ge fisken en struktur att leka på och som även kan ge fiskens yngel skydd och utgöra en uppväxtmiljö. En risvase kan bestå av gamla julgranar ... Risvasar gynnar exempelvis leken för abborre, gös och mört ... Viktigt att tänka på är även att man behöver tillstånd från markägaren och att man i förväg ska stämma av åtgärden med berörd länsstyrelse och kommun." },
      { namn: "SVT Nyheter, Julgranar i vattnet för bättre fiskmiljö (2016)", url: "https://www.svt.se/nyheter/inrikes/julgranar-i-vattnet-for-battre-fiskmiljo", last: "2026-11-13", citat: "Att anlägga så kallade ris- eller julgransvassar på botten av en sjö är en gammal tradition som på senare år börjat dammas av på nytt. ... – Man måste ha vattenägarens tillstånd, sen gäller det ju att använda sunt förnuft så att man inte stör båttrafik, badande och liknande, säger John Kärki." }
    ],
  },
  {
    dag: 24,
    titel: "Julafton på Sandhamn",
    text: "På julafton den 24 december 2026 dukar Sandhamn Seglarhotell upp julbord med klassiska rätter, och kanske dyker tomten upp. Dagen därpå fortsätter firandet med hotellets traditionella kalkonmiddag.",
    lank: "/o/sandhamn",
    lankText: "Läs mer om Sandhamn",
    kallor: [
      { namn: "Sandhamn Seglarhotell", url: "https://www.sandhamn.com/sv/kalender/julafton", last: "2026-11-13", citat: "Fira Julafton med oss 24 december 2026 ... Hos oss väntar ett julbord med guldkant fyllt av klassiska läckerheter, värmen från tända ljus och en stämning som hör högtiden till. Kanske dyker även tomten upp för att sprida extra julglädje… ... Och dagen därpå fortsätter firandet med vår traditionella kalkonmiddag" }
    ],
  }
]

export const AR = 2026

/**
 * Förhandsvisning för t.ex. rådgivare: /julkalender?forhand=<kod> visar alla luckor
 * öppna utan inloggning, som de kommer att se ut i december. Sidan indexeras inte.
 */
export const FORHANDS_KOD = 'dVRwxX6HUOj2'

/** Dagens datum i Sverige som { ar, manad (1–12), dag }. */
export function idagSverige(nu: Date = new Date()): { ar: number; manad: number; dag: number } {
  const delar = new Intl.DateTimeFormat('sv-SE', {
    timeZone: 'Europe/Stockholm', year: 'numeric', month: 'numeric', day: 'numeric',
  }).formatToParts(nu)
  const v = (typ: string) => Number(delar.find(d => d.type === typ)?.value)
  return { ar: v('year'), manad: v('month'), dag: v('day') }
}

/**
 * Hur många luckor som är öppningsbara just nu (0 före 1 december, 24 efter julafton
 * samma år). testdag (1–24) används bara i förhandsvisningar, aldrig i produktion.
 */
export function oppnaLuckor(nu: Date = new Date(), testdag?: number): number {
  if (testdag && testdag >= 1 && testdag <= 24) return testdag
  const { ar, manad, dag } = idagSverige(nu)
  if (ar !== AR) return ar > AR ? 24 : 0
  if (manad < 12) return 0
  return Math.min(dag, 24)
}

/** true när julkalendern ska synas på startsidan (1–24 december). */
export function kalenderPagar(nu: Date = new Date()): boolean {
  const { ar, manad, dag } = idagSverige(nu)
  return ar === AR && manad === 12 && dag >= 1 && dag <= 24
}

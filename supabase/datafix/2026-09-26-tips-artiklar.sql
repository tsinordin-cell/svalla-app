-- 2026-09-26: de fem tipsartiklarna i tabellen articles (/tips/…), omskrivna med källa.
-- Tidigare texter (maj 2026) hade uppgifter utan källa; varje artikels KÄLLA-kommentar ligger först i body_md
-- och visas inte på sidan (renderMarkdown tar bort HTML-kommentarer, se src/lib/articles.ts).

update articles set title = $tips$Barnvänliga öar i Stockholms skärgård – guide för barnfamiljer$tips$, excerpt = $tips$Öar i Stockholms skärgård med barnvänliga bad, lekplats och simskola: Fjäderholmarna, Vaxholm, Tynningö, Grinda, Ljusterö, Möja, Utö och Nåttarö – med resväg och fakta från kommunerna, Länsstyrelsen och Skärgårdsstiftelsen.$tips$, reading_min = 6,
  body_md = $tips$<!-- KÄLLA (lästa 2026-09-24–26; samma källor som bloggen skargard-barnfamilj-sommar-2026 och island-data):
waxholmsbolaget.se/biljetter-och-priser/rabatterat-pris ("Barn som är under 7 år gamla reser utan avgift med annan betalande resenär"); waxholmsbolaget.se/att-resa-med-oss/vad-du-far-ta-med ("Du som reser med barn under 7 år får ta med barnvagn utan kostnad", "Cykelkärra räknas inte som en barnvagn").
Fjäderholmarna: stromma.com Båt till Fjäderholmarna ("Avgår från: Strandvägen & Nacka Strand", "Endast 30 minuters båtresa från city", "ÅTER MAJ 2027"); explorearchipelago.com (klippbad, mindre sandstränder); fjaderholmarna.se (säsongsöppet).
Vaxholm: waxholmsbolaget.se/reseplanering/resmal/vaxholm ("Båtresan från Strömkajen tar bara en timme", "SL:s bussar från Vaxholm till Tekniska högskolan"); vaxholm.se badplatser (Eriksöbadet: "sandstränder och klippbad", "Flytbrygga med hopptorn", EU-bad; Tenöbadet på Bogesund: "Sandstrand", "Grillplats", "Omklädningshytt", "Lekplats", EU-bad; Överbybadet på Resarö: "familjevänliga badplats", "Lekplats").
Tynningö: vaxholm.se badplatser (Myrholmsmaren vid sjön Stora Maren, "Tynningö Idrottsförening som också anordnar simskola varje sommar", sandstrand, bryggor, grillplats, omklädningshytt, Baja-maja); Waxholmsbolaget linje 4 angör Norra Tynningö.
Grinda: lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html ("fina barnvänliga bad både vid den södra och norra ångbåtsbryggan", "Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen", "Torrdass finns vid alla badplatser"); waxholmsbolaget.se/reseplanering/resmal/grinda ("Grindastigen … ungefär 2,5 kilometer lång", "badplatsen i Källviken", "Resan från Strömkajen tar ungefär en och en halv timme", "Grinda har trafik året om"); grinda.se/mat-fest/lanthandel-cafe (frukost och enklare luncher, "Nedanför Grinda Wärdshus"; "Vi har mask och metspö. (från Midsommar)"; "lekskåp").
Ljusterö: osteraker.se Öar i Österåkers skärgård ("ett klippbad med storslagen utsikt över Saxarfjärden, och ett barnbad med sandstrand", "sagostig för barn", "En bilfärja går från Östanå färjeläge året runt").
Möja: waxholmsbolaget.se/reseplanering/resmal/moja ("Båtar går året runt från Boda brygga på Värmdö", "Vissa turer går också direkt från Strömkajen", "Möjaström och Berg"); explorearchipelago.com Möja ("Hyr en cykel och följ öns grusväg för att upptäcka museer, kyrkan, klippbad, sandstrand och insjöar"); visitmoja.se (Hamncafét "Café med glass och bullar samt cykeluthyrning"; Coop i Berg och Långvik); mojavandrarhem.se (familjedrivet STF-vandrarhem, öppet april–december, kajak, SUP och roddbåt via Möja Outdoor).
Utö: skargardsstiftelsen.se/omraden/uto/ (Rävstavik, Barnens bad, "Utö är en riktig cykel-ö med möjlighet att hyra dagsvis"); utovardshus.se/seglarbaren ("Intill Seglarbarens uteservering finns en lekplats"); lansstyrelsen.se Utö ("Pendeltåg till Västerhaninge. Buss till Årsta brygga. Waxholmsbåt året om till Gruvbryggan"); utogasthamn.se/camping (egen sandstrand, "Barn under 12 år tältar gratis i förälders sällskap").
Nåttarö: haninge.se Nåttarö ("endast en halvtimmes båtresa från Nynäshamn", "gott om barnvänliga, långgrunda sandstränder. Mest känd är Stora sand, men den mer avskilda Skarsand"); lansstyrelsen.se Nåttarö (snorkelled vid ångbåtsbryggan med gula bojor och skyltar under ytan; torrdass); stockholmarchipelagotrail.com (Storsand 1,5 km norrut på grusväg); nattaro.se (vandrarhem, 50 stugor, krog, Sixtens bodega).
Tidigare version (från maj 2026, ersatt 2026-09-26) påstod bl.a. att Fjäderholmarna har akvarium och "lekplats med pirat-tema", att Vaxholm har köpcentrum med Lindex och Stadium, att Grindas värdshus har barnmeny, att Möja har djurgård i Berg och fiskrökeri, att Lidö har frilevande hjortar, att Utö Värdshus har familjepaket och att Ornö nås med 30 min bilfärja från Dalarö – utan källa. -->
Här är öar i Stockholms skärgård där kommunen, Länsstyrelsen, Skärgårdsstiftelsen eller verksamheten själv beskriver barnvänliga bad, lekplats, simskola eller saker för barn att göra. Öarna står i ordning efter hur långt ut de ligger – vi rangordnar dem inte. Mer om enskilda bad: [Barnvänliga öar och bad i Stockholms skärgård](/blogg/skargard-barnfamilj-sommar-2026). Om flytväst och säkerhet: [Skärgård med barn](/blogg/barnfamilj-skargard).

## Båtresan med barn
På Waxholmsbolagets båtar reser barn under 7 år utan avgift med en annan betalande resenär, och barnvagnen följer med utan kostnad. En cykelkärra räknas inte som barnvagn.

## Närmast stan

### [Fjäderholmarna](/o/fjaderholmarna)
Cirka 30 minuter med Strömmas båt från Strandvägen eller Nacka Strand. Här badar du från klipporna och vid några mindre sandstränder. Öarna har säsongsöppet på sommaren, och Strömmas båt går igen från maj 2027. Mer: [Dagstur till Fjäderholmarna](/blogg/fjaderholmarna-dagstur).

### [Vaxholm](/o/vaxholm)
Båten från Strömkajen tar ungefär en timme, och SL:s bussar går tillbaka till Tekniska högskolan. Bad för barn i kommunen:
- **Eriksöbadet** på Vaxön – sandstränder och klippbad, flytbrygga med hopptorn. EU-bad.
- **Tenöbadet** på Bogesund – sandstrand, grillplats, omklädningshytt och lekplats. EU-bad.
- **Överbybadet** på Resarö – kommunen kallar det en familjevänlig badplats, med lekplats.

### [Tynningö](/o/tynningo)
Badet Myrholmsmaren ligger vid sjön Stora Maren inne på ön. Tynningö Idrottsförening sköter badet och har simskola varje sommar. Här finns sandstrand, bryggor, grillplats och omklädningshytt. Waxholmsbolagets linje 4 lägger till vid Norra Tynningö.

## Mellersta skärgården

### [Grinda](/o/grinda)
Enligt Länsstyrelsen har Grinda barnvänliga bad vid både den södra och den norra ångbåtsbryggan, med torrdass vid badplatserna och grillplatser vid södra bryggan. Grindastigen är ungefär 2,5 kilometer. Lanthandeln nedanför Grinda Wärdshus serverar frukost och enklare luncher, lånar ut spel och säljer mask och metspö från midsommar. Båten från Strömkajen tar ungefär en och en halv timme, och Grinda har trafik året om.

### [Ljusterö](/o/ljustero)
Österåkers kommun beskriver ett barnbad med sandstrand och ett klippbad mot Saxarfjärden, och en sagostig för barn längs naturstigen. Bilfärjan från Östanå går året runt – bra om ni vill ha med bilen.

### [Möja](/o/moja)
Båtar går året runt från Boda brygga på Värmdö, och vissa turer går direkt från Strömkajen. Möja är en ö att cykla på: följ grusvägen till museer, kyrkan, klippbad, sandstrand och insjöar. Hamncafét hyr ut cyklar och säljer glass och bullar. Möja vandrarhem är familjedrivet och hyr via Möja Outdoor ut kajak, SUP och roddbåt.

## Södra skärgården

### [Utö](/o/uto)
Pendeltåg till Västerhaninge, buss till Årsta brygga och Waxholmsbåt till Gruvbryggan – året om. Skärgårdsstiftelsen nämner badplatserna Rävstavik och Barnens bad, och cyklar hyrs dagsvis. Intill Seglarbarens uteservering i hamnen finns en lekplats. På campingen tältar barn under 12 år gratis i förälders sällskap.

### [Nåttarö](/o/nattaro)
En halvtimme med båt från Nynäshamn. Haninge kommun beskriver gott om barnvänliga, långgrunda sandstränder – Storsand, cirka 1,5 kilometer norrut på grusvägen, och den mer avskilda Skarsand. Vid ångbåtsbryggan finns en snorkelled med gula bojor och skyltar under vattnet om livet där. På ön finns vandrarhem, stugor, krog och pizzeria.

## Vanliga frågor

**Reser barn gratis på Waxholmsbåten?**
Barn under 7 år reser utan avgift med en annan betalande resenär, enligt Waxholmsbolaget.

**Vilken ö har långgrunda sandstränder för små barn?**
Nåttarö. Haninge kommun beskriver gott om barnvänliga, långgrunda sandstränder där, bland annat Storsand.

**Vilka öar har lekplats vid badet eller hamnen?**
Tenöbadet på Bogesund och Överbybadet på Resarö har lekplats enligt Vaxholms stad, och på Utö finns en lekplats intill Seglarbaren i hamnen.

**Kan man ta bilen till en barnvänlig ö?**
Ja, till Ljusterö: bilfärjan från Östanå går året runt.
$tips$,
  updated_at = now() where slug = 'barnvanliga-oar-stockholms-skargard';

update articles set title = $tips$Naturhamnar i Stockholms skärgård – platser och regler$tips$, excerpt = $tips$Naturhamnar som Länsstyrelsen, Skärgårdsstiftelsen och Kryssarklubben pekar ut i Stockholms skärgård – från Grinda och Finnhamn till Huvudskär och Rödlöga – och tvådygnsregeln i naturreservaten.$tips$, reading_min = 5,
  body_md = $tips$<!-- KÄLLA (lästa 2026-09-24; samma källor och citat som bloggen naturhamnar-stockholm-skargard): naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ ("Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat."; "Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn."; "Vid fågel- eller sälskyddsområden får du inte stiga iland under en viss tid av året."). lansstyrelsen.se Grinda ("Gästhamn finns i Hemviken och naturhamn i Hästholmssundet"; två dygn), Granholmen ("Munkhamnen är en utmärkt och välbesökt naturhamn", "2,5 kilometer söder om Möja"; två dygn), Gällnö ("flera fina naturhamnar", motorbåt och vattenskoter förbjudet i Norrviken; två dygn), Finnhamn ("Naturhamnar vid Djupfladen, Söder-Långholm och Korsholm"; två dygn), Nåttarö (Östermarsfladen; två dygn), Fjärdlång ("Fina naturhamnar finns på flera platser på norra delen av Fjärdlång", 7 knop inom 100 m; två dygn), Huvudskär ("gott om fina naturhamnar", "tio kilometer sydost om Ornö"; två dygn), Jungfruskär ("fyra kilometer söder om Nämdö", fågelskydd 1 februari–15 augusti), Biskopsö ("åtta kilometer söder om Nämdö", sälskydd 1 februari–15 augusti), Nämdöskärgårdens nationalpark ("gott om naturhamnar", "upp till två dygn i följd", 5 knop inom 100 m, "I vissa särskilt känsliga områden är det förbjudet att ankra"), Svenska Högarna (SXK:s angöringsbojar mellan Skrubban och Ytterhamnen "mot betalning", ankringsförbud inom markerade områden). skargardsstiftelsen.se Gällnö–Kårklo ("Torsviken är särskilt uppskattad med naturhamn, sandstrand och tältplats"), Nåttarö (bojarna i Östermarsfladen "fria för alla att använda"), Huvudskär ("i fladen mellan Ålandsskär och Lökskär blir det ibland fullt med båtar"). sxk.se naturhamnar och ankarplatser (Jungfruskär, Koxviken på Biskopsön, bergöglor), bojar ("Över 260 bojar", medlemskap krävs, 8 ton), uthamnar (Norrviken på Runmarö, "tillgängliga för alla båtturister"). rodlogaboden.se ("It is possible to find a safe natural harbour in all winds."). Tidigare version (från maj 2026, ersatt 2026-09-26) rangordnade "de 15 bästa" och angav vindskydd, bottenförhållanden och årtal (Bullerö "reservat sedan 1967", Ängsö "tältning tillåten på iordningställda platser", Svenska Högarna "utvidgat 2020", Långviksskär, Kallskär, Tjockö, Mörtö-Bunsö, Skarpö och Älgö) utan källa. -->
Här är naturhamnar i Stockholms skärgård som Länsstyrelsen, Skärgårdsstiftelsen och Svenska Kryssarklubben (SXK) själva pekar ut, sorterade efter område. Vi rangordnar dem inte och anger inte vindskydd eller bottenförhållanden – det avgör du med sjökortet och prognosen. Reglerna i detalj: [Naturhamnar i Stockholms skärgård – regler och platser](/blogg/naturhamnar-stockholm-skargard).

## Tre regler att kunna
- Enligt allemansrätten får du ankra och tillfälligt förtöja vid en strand som inte hör till någon tomt och som inte är skyddad för fågelliv eller annat. Naturvårdsverket skriver att man brukar ligga något enstaka dygn.
- I naturreservaten nedan, och i Nämdöskärgårdens nationalpark, får båten inte ligga förankrad på samma ställe längre än två dygn i följd.
- Vid fågel- och sälskyddsområden får du inte gå i land under delar av året. Förbuden märks ut med gula eller röd/gula skyltar.

## Mellersta skärgården
- **[Grinda](/o/grinda)** – naturhamn i Hästholmssundet. Gästhamnen ligger i Hemviken.
- **Granholmen** – Munkhamnen i Granholmens naturreservat, 2,5 kilometer söder om [Möja](/o/moja). Länsstyrelsen kallar den välbesökt.
- **[Gällnö](/o/gallno)** – flera naturhamnar. Torsviken har naturhamn, sandstrand och tältplats. I Norrviken är motorbåt och vattenskoter förbjudna.
- **[Finnhamn](/o/finnhamn)** – naturhamnar vid Djupfladen, Söder-Långholm och Korsholm.
- **[Runmarö](/o/runmaro)** – SXK:s uthamn i Norrviken, öppen för alla båtturister, med brygga, toalett och sopmaja.

## Runt Nämdö
- **Jungfruskär** – naturreservat fyra kilometer söder om Nämdö, bland SXK:s besöksmål. Fågelskyddsområdet får inte beträdas 1 februari–15 augusti.
- **Koxviken på Biskopsön** – också ett av SXK:s besöksmål. Sälskyddsområdet vid Biskopsö är stängt 1 februari–15 augusti.
- **[Bullerö](/o/bullero) och Nämdöskärgårdens nationalpark** – gott om naturhamnar enligt Länsstyrelsen. Här gäller högst 5 knop inom 100 meter från land, och i vissa känsliga områden är det förbjudet att ankra.

## Södra skärgården
- **[Nåttarö](/o/nattaro)** – Östermarsfladen i norr, där Skärgårdsstiftelsens förtöjningsbojar är fria för alla.
- **[Fjärdlång](/o/fjardlang)** – naturhamnar på flera platser på norra delen av ön. Högst 7 knop inom 100 meter från land.
- **[Huvudskär](/o/huvudskar)** – reservatet tio kilometer sydost om Ornö har gott om naturhamnar. Fladen mellan Ålandsskär och Lökskär blir ibland full.

## Ytterskärgården
- **[Rödlöga](/o/rodloga)** – enligt Rödlögaboden finns en skyddad naturhamn i alla vindar. Sjömacken ligger på ön.
- **[Svenska Högarna](/o/svenska-hogarna)** – SXK:s angöringsbojar mellan Skrubban och Ytterhamnen, där allmänheten förtöjer mot betalning. Inom markerade områden är ankring förbjuden.

## Bojar och bergöglor
SXK har lagt ut över 260 blå bojar längs kusten. De kräver medlemskap i Kryssarklubben, och rekommenderat högsta deplacement är 8 ton. På en del platser har SXK också satt upp bergöglor för landförtöjning.

## Mer att läsa
- [Ankarplatser i Stockholms skärgård](/tips/ankarplatser-stockholms-skargard-guide)
- [Sjömackar och ankring i skärgården](/blogg/bransle-ankring-skargard)
- [Grilla i naturhamnen](/blogg/grilla-naturhamn)
$tips$,
  updated_at = now() where slug = 'basta-naturhamnarna-stockholms-skargard';

update articles set title = $tips$Ankra i Stockholms skärgård – regler, ankarljus och bojar$tips$, excerpt = $tips$Vad allemansrätten säger om att ankra, tvådygnsregeln i naturreservat och nationalpark, ankarljus enligt sjövägsreglerna, toalettavfall och Kryssarklubbens bojar.$tips$, reading_min = 5,
  body_md = $tips$<!-- KÄLLA (lästa 2026-09-24–26): naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ ("Du får gå i land, bada, ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt, eller som är skyddad för fågelliv eller annat."; "Det finns inte heller någon regel för hur länge du får ligga för ankar på samma plats. Man brukar använda sig av samma princip som för tältning, och det är något enstaka dygn."; "Om du har tänkt att ligga för ankar eller förtöja en längre tid vid någon annans strand behöver du fråga markägaren om lov."; "Förbuden märks ofta ut med gula eller röd/gula skyltar."; "Använd en hink med tättslutande lock om båten saknar toalett med avloppstank."). sxk.se/batliv/allemansratten ("Du kan ankra upp något enstaka dygn på samma plats utan att fråga markägaren."). sxk.se/batliv/toalettavfall-och-sjomackar ("Sedan den 1 april 2015 är det förbjudet att släppa ut toalettavfall från fritidsbåtar i hav, sjöar och inre vattendrag."). Transportstyrelsens sjövägsregler TSFS 2009:44, regel 30: "Ett fartyg till ankars ska visa, placerade där de syns bäst, 1) i den främre delen av fartyget: ett vitt, runtlysande ljus eller ett klot"; "b. Ett fartyg med en längd under 50 meter får visa ett vitt, runtlysande ljus, placerat där det syns bäst"; "e. Ett fartyg med en längd under 7 meter som ligger till ankars på en plats som inte ligger i eller nära trånga farleder, farvatten eller ankarplatser eller på en plats där fartyg normalt inte framförs är inte skyldigt att visa de fartygsljus". lansstyrelsen.se (Grinda, Granholmen, Gällnö, Finnhamn, Nåttarö, Fjärdlång, Huvudskär: förbjudet att förankra båt vid samma strand/ställe längre än två dygn i följd; Nämdöskärgårdens nationalpark "upp till två dygn i följd", "I vissa särskilt känsliga områden är det förbjudet att ankra", 5 knop inom 100 m; Svenska Högarna ankringsförbud inom markerat område). sxk.se bojar ("Över 260 bojar", medlemskap krävs, "rekommenderad högsta totala deplacement, som är 8 ton") och uthamnar ("tillgängliga för alla båtturister"). transportstyrelsen.se Förbered dig inför din båttur ("titta på väderleksrapporter både innan och under resan"; "Meddela någon vart du ska och när du planerar att vara framme"). Tidigare version (från maj 2026, ersatt 2026-09-26) angav "tio testade områden" med vindskydd och bottenförhållanden, ankartyper, kättinglängd "4–5 gånger vattendjupet" och råd om VHF och ankarlarm – utan källa. Vindskydd och botten går inte att belägga för enskilda platser och står därför inte här. -->
Den här guiden handlar om det som går att belägga: vad lagen och allemansrätten säger om att ankra, vilka regler som gäller i naturreservaten och vilket ljus båten ska visa på natten. Vindskydd och botten för en viss vik anger vi inte – det avgör du med sjökortet och prognosen på plats. Platserna finns i [Naturhamnar i Stockholms skärgård](/tips/basta-naturhamnarna-stockholms-skargard).

## Får man ankra var som helst?
Enligt Naturvårdsverket ingår det i allemansrätten att ankra och tillfälligt förtöja vid en strand som inte tillhör någon tomt och som inte är skyddad för fågelliv eller annat. Det finns ingen fast regel för hur länge, men man brukar följa samma princip som för tältning – något enstaka dygn. Vill du ligga längre vid någon annans strand ska du fråga markägaren.

Vid fågel- och sälskyddsområden får du inte gå i land under delar av året. Förbuden märks ofta ut med gula eller röd/gula skyltar.

## I naturreservat och nationalpark
- På bland annat Grinda, Granholmen, Gällnö, Finnhamn, Nåttarö, Fjärdlång och Huvudskär får båten inte ligga förankrad på samma ställe längre än två dygn i följd.
- I Nämdöskärgårdens nationalpark gäller också två dygn, högst 5 knop inom 100 meter från land, och i vissa känsliga områden är ankring förbjuden.
- Vid Svenska Högarna är det förbjudet att ankra inom områden som är markerade på reservatets karta.

Föreskrifterna för varje reservat står på Länsstyrelsens sida för reservatet.

## Ankarljus på natten
Enligt Transportstyrelsens sjövägsregler (regel 30) ska en båt till ankars visa ett vitt, runtlysande ljus där det syns bäst. En båt under 7 meter behöver inte visa ljuset om den ligger på en plats som inte är i eller nära en farled, ett trångt farvatten eller en ankarplats, eller där fartyg normalt inte går.

## Toaletten
Sedan 1 april 2015 är det förbjudet att släppa ut toalettavfall från fritidsbåtar. Saknar båten toalett med avloppstank rekommenderar Naturvårdsverket en hink med tättslutande lock.

## Bojar i stället för ankare
- **SXK:s blå bojar:** över 260 längs kusten. De kräver medlemskap i Svenska Kryssarklubben, och rekommenderat högsta deplacement är 8 ton.
- **SXK:s uthamnar**, som Norrviken på Runmarö, är öppna för alla båtturister.
- **Skärgårdsstiftelsens bojar** i Östermarsfladen på Nåttarö är fria för alla.

## Innan du lägger ut
Transportstyrelsen råder dig att kolla väderprognosen både före och under turen och att tala om för någon vart du ska och när du räknar med att vara framme.

## Mer att läsa
- [Naturhamnar i Stockholms skärgård](/tips/basta-naturhamnarna-stockholms-skargard)
- [Sjömackar och ankring i skärgården](/blogg/bransle-ankring-skargard)
- [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide)
$tips$,
  updated_at = now() where slug = 'ankarplatser-stockholms-skargard-guide';

update articles set title = $tips$Krogar i Stockholms skärgård – från Vaxholm till Rödlöga$tips$, excerpt = $tips$Krogar i Stockholms skärgård ö för ö: Vaxholm, Fjäderholmarna, Grinda, Gällnö, Möja, Sandhamn, Utö, Nåttarö och Rödlöga – med det krogarna själva skriver om säsong och bokning.$tips$, reading_min = 5,
  body_md = $tips$<!-- KÄLLA: varje ställe beskrivs med samma uppgifter som dess platssida på Svalla (/upptack/…), där texten bygger på verksamhetens egen webbplats eller Skärgårdsstiftelsens/kommunens sida. Citaten står i supabase/datafix: 2026-09-22-hamnar-beskrivningar-block*.sql, 2026-09-23-sandhamn-platser.sql, 2026-09-23-texter-*.sql, 2026-09-23-vardeord-omgang*.sql och 2026-09-26-platstexter-legacy.sql (lästa 2026-09-22–26). Exempel: sandhamns-vardshus.se (anno 1672, puben "Öppet året runt", restaurangen "Öppet varje dag från mitten av juni till mitten på september"); sandhamn.com (Segelsalen, Bistro, Seglarbaren, Orangeriet, Terassen, Hamnbaren); grinda.se (Wärdshuset sedan 1906, Framfickan "endast drop-in"); gallno.se ("Vi tar ej bordsbokningar"); utovardshus.se/seglarbaren (veranda mot hamninloppet, lekplats); finnhamn.se (krogen nära ångbåtsbryggan, huvudsäsong juni–augusti); cafetruten.se (sommaröppet, hembakat); idoborg.se/restaurang-strandbaren; ingmarsokrog.com; hamnkrogenvaxholm.com (kvarterskrog sedan 1950-talet); lidovardshus.com (säsongen 2026 bara grupper, öppnar igen midsommar 2027). Tidigare version (från maj 2026, ersatt 2026-09-26) rangordnade "de 12 bästa" och innehöll uppgifter utan källa, bland annat Wikströms Fisk på Möja (stängde 2024 enligt wikstromsfisk.com), "Krogen på Huvudskär" med sex bord, "Sjöstugan" på Utö, "Rödlöga Sjöbod", menyer, klädsel och bokningsråd. -->
Här är krogar i Stockholms skärgård, från Vaxholm till Rödlöga, med det som respektive krog eller Skärgårdsstiftelsen själv skriver om sig. Vi rangordnar dem inte. Öppettiderna ändras mellan säsongerna, så kolla krogens egen sida innan du åker – särskilt utanför juni–augusti.

## Vaxholm och innerskärgården
- **[Hamnkrogen Vaxholm](/upptack/hamnkrogen-vaxholm)** – kvarterskrog sedan 1950-talet på Söderhamnen, med utsikt över gästhamnen. Ostar från Ostmakeriet på Rindö och öl från lokala bryggerier.
- **[Winbergs Kök & Bar](/upptack/winbergs-kok-bar)** – på kajen i Vaxholm sedan 1961, med sommarkrog och grill.
- **[Röda Villan](/upptack/roda-villan)**, Fjäderholmarna – sommarrestaurang med mat grillad över öppen eld och utsikt över inloppet till Stockholm.
- **[Rökeriet](/upptack/rokeriet-fjaderholmarna)**, Fjäderholmarna – egna rökta produkter tillagade på plats, och sommartid deli och glasskiosk.

## Mellersta skärgården
- **[Grinda Wärdshus](/upptack/grinda-wardshus)** – skärgårdsmat i ett hus som har sett ut över Saxarfjärden sedan 1906. **[Framfickan](/upptack/framfickan-grinda)** vid gästhamnen har enklare mat och bara drop-in.
- **[Gällnö Krog](/upptack/gallno-krog)** – sommaröppen, med smårätter att dela och grillade rätter med fokus på grönsaker. Tar inte emot bordsbokning.
- **[Finnhamns Krog](/upptack/finnhamns-krog)** – nära ångbåtsbryggan, huvudsäsong juni–augusti.
- **[Ingmarsö Krog](/upptack/ingmarso-krog)** – vid vattnet nära södra ångbåtsbryggan. Matgäster kan lägga till vid krogens bryggor under sittningen.
- **[Svartsö Krog](/upptack/svartso-krog)** – säsongen och råvarorna styr menyn.
- **[Möja Värdshus & Bageri](/upptack/moja-bageri)** – bageri sedan 1951 nära Kyrkviken, med matsal och rum.
- **[Les Poissonniers de Möja](/upptack/les-poissonniers-moja)** – fiskaffär med bistro i Berg, utan bordsbokning.
- **[Svängen](/upptack/svangen-runmaro)**, Runmarö – krog och bar med trädgård, lekplats och scen.
- **[Strandbaren](/upptack/strandbaren-idoborg)**, Idöborg – restaurang vid sandstranden, med gästhamn för cirka 50 båtar.

## Sandhamn
- **[Sandhamns Värdshus](/upptack/sandhamn-sandhamns-vardshus)** – anno 1672. Puben är öppen året runt, och restaurangen varje dag från mitten av juni till mitten av september.
- **[Seglarhotellet](/upptack/seglarhotellet-sandhamn)** – Segelsalen, Bistro, Seglarbaren, Orangeriet, Terassen och Hamnbaren vid gästhamnen.
- **[Dykarbaren](/upptack/dykarbaren)** – bar och restaurang med uteservering vid strandkanten, säsong maj–september.

Fler ställen: [Restauranger på Sandhamn](/blogg/basta-restaurangerna-sandhamn).

## Södra skärgården
- **[Seglarbaren](/upptack/seglarbaren-uto)**, Utö – Utö Värdshus bar och restaurang mitt i hamnen, med veranda mot hamninloppet och lekplats intill.
- **[Hamnboden](/upptack/hamnboden-uto)**, Utö – kiosk, café och restaurang med sushi i gästhamnen.
- **[Utö Bykrog](/upptack/uto-bykrog)** – sommaröppen i Edesnäs, vid vägen mellan Gruvbyn och Ålö.
- **[Nåttarö Krog](/upptack/nattaro-krog)** – intill ångbåtsbryggan och gästhamnen.
- **[Muskö Sjökrog](/upptack/musko-sjokrog)** – på Mickrums brygga vid Horsfjärden, säsongsöppen.

## Norra skärgården och havsbandet
- **[Café Truten](/upptack/cafe-truten-rodloga)**, Rödlöga – sommaröppet kafé längst ut, med hembakat och lantlig svensk mat.
- **[Fejans Sjökrog](/upptack/fejans-sjokrog)** – säsongsöppen, med gästhamn. Tar inte kontanter.
- **[Restaurang Varvet](/upptack/varvet-hogmarso)**, Högmarsö – sommaröppen sedan 2017, med ostron på onsdagar.
- **[Lidö Värdshus](/upptack/lido-vardshus)** – säsongen 2026 bara för grupper; restaurang och boende öppnar igen till midsommar 2027.

## Kommer du med båt?
Flera krogar har egna bryggor eller gästhamn intill – till exempel Ingmarsö Krog, Strandbaren på Idöborg, Grinda och Finnhamn. Se hamnen på respektive platssida. Fler hamnar: [Gästhamnar i Stockholms skärgård](/blogg/gasthamnar-guide).
$tips$,
  updated_at = now() where slug = 'basta-krogarna-skargarden-2026';

update articles set title = $tips$Övernattning i Stockholms skärgård – vandrarhem, hotell, stugor och tält$tips$, excerpt = $tips$Så kan du sova över i Stockholms skärgård: STF-vandrarhem, hotell och värdshus, Skärgårdsstiftelsens stugor, tältplatser och ankring i egen båt – med säsonger och regler från källorna.$tips$, reading_min = 5,
  body_md = $tips$<!-- KÄLLA (lästa 2026-09-24–26; samma källor och citat som bloggen boende-skargard-2026 och platssidorna): svenskaturistforeningen.se/boende/ (STF Finnhamns Vandrarhem "landmärke i Stockholms skärgård i över 100 år"; STF Möja Vandrarhem "Öppet April - December"; STF Gällnö Vandrarhem "bara 90 minuters båtfärd från centrala Stockholm"; STF Svartsö Skärgårdshotell & Vandrarhem "öppet året runt!"; STF Grinda Hotell & Sea Lodge "28 moderna dubbelrum"; STF Kastellet Bed and Breakfast; STF Arholma Nord). finnhamn.se/boende ("12 rum, 2-5 bäddar, två matsalar med kök och en gillestuga", "renoverades mellan åren 2014-2017"). utovardshus.se ("80 rum & hotellstugor (200 bäddar)"); utovardshus.se/boende/vandrarhemmet ("april-oktober", "73 bäddar"). sandhamn.com ("Frukost ingår, och som hotellgäst har du fri tillgång till spa och gym"). sandshotell.se ("15 dubbelrum, 3 enkelrum så totalt 33 bäddar"). sandhamns-vardshus.se ("Boende och frukost i Missionshuset"). waxholmshotell.se ("sedan 1902"). nattaro.se ("50 stycken semesterstugor"; vandrarhem). skargardsstiftelsen.se/boka-boende/ (Utö och Gålö "1 maj-2 november", "enkel standard och utedass"; Huvudskär "15 maj-20 september", "nio olika boenden och 47 bäddar. Här saknas el och värme"; Fjärdlång Norrötorpet "8 maj-20 september"); skargardsstiftelsen.se hotell, stugor och vandrarhem ("drivs till största del av olika entreprenörer och bokas direkt via respektive anläggning"; "Många av boendena nås smidigt med Waxholmsbolagets båtar"); öppna bodar ("högst två nätter"). naturvardsverket.se tältning ("Du får tälta något enstaka dygn i naturen"; "en eller två nätter är en bra tumregel"; "Om ni är flera personer med flera tält krävs markägarens tillstånd"; "I allmänhet är det inte tillåtet att tälta annat än på särskilt angivna platser."). lansstyrelsen.se Grinda ("Tältning är endast tillåten på tältplatsen nära norra bryggan."). utogasthamn.se/camping (friluftsmodell, "enskilda personer behöver därför inte boka plats", "Barn under 12 år tältar gratis i förälders sällskap"). naturvardsverket.se på vatten (ankra "något enstaka dygn"). Tidigare version (från maj 2026, ersatt 2026-09-26) angav priser, rumsantal och anläggningar utan källa, bland annat "Fjäderholmarnas Hotell" med fyra rum, "Möja Stugby" med 22 stugor, "Tjockö Stugor", STF Utö i Gruvbyn med 36 bäddar, STF Möja "i ett gammalt magasin med utsikt över Långviken", "över tvåhundra dokumenterade naturhamnar", tältförbud "runt Bullerön och Stora Nassa" och procentuella prisskillnader mellan månaderna. -->
Så kan du sova över i Stockholms skärgård – på vandrarhem, hotell och värdshus, i en enkel stuga, i tält eller i egen båt. Här är boenden som har en egen sida eller finns hos STF och Skärgårdsstiftelsen. Priser och lediga datum står hos respektive boende. Hela listan: [Boende i skärgården](/blogg/boende-skargard-2026).

## Vandrarhem
- **[Finnhamns Vandrarhem](/upptack/finnhamn-finnhamns-vandrarhem)** – STF-vandrarhem i en villa från början av 1900-talet med 12 rum för två till fem personer och två matsalar med kök.
- **[Möja vandrarhem](/upptack/moja-stf-moja-gard)** – familjedrivet STF-vandrarhem i Berg, öppet april–december.
- **STF Gällnö Vandrarhem** – stugor nära badviken, gästhamnen och handelsboden, 90 minuter med båt från centrala Stockholm.
- **[Svartsö Skärgårdshotell & Vandrarhem](/upptack/svartso-stf-svartso-skargardshotell)** – öppet året runt.
- **[Utö Vandrarhem](/upptack/stf-vandrarhem-uto)** – 73 bäddar i backen upp mot Utö Värdshus, öppet april–oktober.
- **[Nåttarö](/upptack/nattaro-stf-nattaro)** – vandrarhem och 50 semesterstugor.

## Hotell och värdshus
- **[Utö Värdshus](/upptack/uto-vardshus)** – 80 rum och hotellstugor med 200 bäddar.
- **[Sandhamn Seglarhotell](/upptack/seglarhotellet-sandhamn)** – frukost ingår, och hotellgäster har fri tillgång till spa och gym.
- **[Sands Hotell](/upptack/sandhamn-sands-hotell)**, Sandhamn – 15 dubbelrum och 3 enkelrum, totalt 33 bäddar.
- **[Sandhamns Värdshus](/upptack/sandhamn-sandhamns-vardshus)** – boende med frukost i Missionshuset.
- **STF Grinda Hotell & Sea Lodge** – 28 dubbelrum intill Grinda Wärdshus och Sea Lodge på öns södra sida.
- **[Waxholms Hotell](/upptack/vaxholm-waxholms-hotell)** – hotell i Vaxholm sedan 1902.

## Stugor hos Skärgårdsstiftelsen
De flesta boenden på Skärgårdsstiftelsens områden drivs av entreprenörer och bokas direkt hos dem. Stiftelsen hyr själv ut:
- **Utö och Gålö** – stugor och lägenheter med enkel standard och utedass, 1 maj–2 november.
- **Huvudskär** – nio boenden med 47 bäddar, utan el och värme, 15 maj–20 september.
- **Fjärdlång, Norrötorpet** – torp utan el, med bastu vid egen brygga, 8 maj–20 september.

## Tält
Enligt Naturvårdsverket får du tälta något enstaka dygn i naturen – en eller två nätter är en bra tumregel. Är ni flera med flera tält behövs markägarens tillstånd, och i naturreservat får du i allmänhet bara tälta på anvisade platser. På Grinda är tältplatsen nära norra bryggan. På [Utö camping](/upptack/uto-camping-och-stugor) behöver enskilda inte boka, och barn under 12 år tältar gratis i förälders sällskap.

## I egen båt
Enligt allemansrätten får du ankra något enstaka dygn vid en strand som inte hör till någon tomt, och i många naturreservat högst två dygn i följd. Mer: [Naturhamnar i Stockholms skärgård](/tips/basta-naturhamnarna-stockholms-skargard) och [Ankarplatser](/tips/ankarplatser-stockholms-skargard-guide).

## Bra att veta
Många boenden på Skärgårdsstiftelsens områden nås med Waxholmsbolagets båtar. Kolla säsongen innan du bokar: flera vandrarhem och stugor har bara öppet delar av året.
$tips$,
  updated_at = now() where slug = 'overnattning-stockholms-skargard-2026';

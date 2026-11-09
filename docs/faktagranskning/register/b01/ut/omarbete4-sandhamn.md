# Omarbete runda 4 – Sandhamn (Granskaren och Skribenten, 2026-11-09)

Alla källor lästa 2026-11-09: curl, Chromium (las_sida.py), pdftotext, Riksantikvarieämbetets bebyggelseregister och K-samsök, SCB:s API, OpenStreetMaps API med paus mellan anropen. Inget kört mot databasen, inte heller SELECT. Facebook är läst av Redaktören i Toms Chrome (kallcache/facebook-2026-11-09.txt). Ingen verifieringssida, ingen certifikatvarning och ingen P0.
battaxi.se har nytt certifikat (Let's Encrypt, giltigt från 2026-11-08) och gick att läsa i Chromium och curl. sandshotell.se gav "Connection reset" i curl och är läst i Chromium. Riksarkivets SBL spärrade curl (brandvägg) och lästes inte på annat sätt.
Main-kopian är 2a31087 (#514). Sidkopior, OSM-data och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4-sandhamn/ (nya källtexter också i kallcache/ny/, *.2026-11-09*).
Kortnamn: BeBR = Riksantikvarieämbetets bebyggelseregister, Grönskärs fyr (byggnad 21400000691324, anläggning 21300000013611). Fiskeguiden = Länsstyrelsens Fiskeguide Stockholms län. NK = Värmdö kommuns post "Stig Sandhamn, ca 8 km" i Naturkartan. h16 = Waxholmsbolagets tabell 16 (GÄLLER 2 april–18 juni och 17 augusti–12 december 2026).

## Ändrade och nya registerrader (50 ändrade, 14 nya: N024–N037)
Restid och resväg (edits nr 6, 11, 18, 21)
- 0497: FAQ-restiden skriver h16:s period i stället för "året runt". h16 (MÄTT: 25 turer, 38–87 min, median 60), Waxholmsbolagets tidtabellstjänst (bara h16 för linje 16), battaxi.se, Cinderella-PDF.
- 0557: samma restid. Badplatserna blir Trouville, Fläskberget och Stranden vid Västerudden när Stora och Lilla Trouville döljs (Toms beslut 6). Värmdö kommun, SAT, OSM.
- 0027, 0028: travel_time utan "året runt" vid restiden; perioden ur h16. Waxholmsbolaget för att båtarna går året runt.
- 0545 (utanför listan, samma fel): insiderTips[0] skiljer på båtarna året runt och restiden i vår- och hösttabellen. h16, Waxholmsbolaget.
- 0495: Sandhamnslinjen står kvar med battaxi.se och höst 2-tabellen som källa. FAQ-texten följer P0:s method med säsong och får h16:s period.
- N037 (ny): getting_there[0].desc "Restiden 38–87 minuter gäller vår- och hösttabellen 2026 (2 april–18 juni och 17 augusti–12 december)." h16.
Läget och regionen (edits nr 1, 26, 30)
- 0010: KÄLLA-rad ny. sandshotell.se borttagen; Fiskeguiden ("I Stockholms yttre skärgård från Sandhamn och söderut.") för "i Stockholms skärgård", länsmuseet för lots- och tullplatsen.
- 0026: KÄLLA-rad ny. Fiskeguiden i stället för hotellets sida. Texten säger Länsstyrelsens indelning (ytterskärgården), Toms beslut 2.
- 0037: KÄLLA-rad ny för varje led i "Seglarort med gästhamn, hotell och värdshus": länsmuseet, KSSS, Seglarhotellet och Sandhamns Värdshus egen sida ("Sandhamns Värdshus Anno 1672", restaurangen).
- 0051: KÄLLA-rad i generatorns indata (scripts/hamta-scb-oar.mjs, nr 30): länsmuseet "Sandön, där Sandhamn ligger". SCB:s API läst igen (0120Q103 = Sandön).
Grönskär (edits nr 5)
- 0177: FEL → RÄTTA: "uppförd 1770" → "uppfördes 1769–1770 … och tändes 1770". BeBR (texten ur Länsstyrelsens byggnadsminnesförklaring 1994).
- 0179: KÄLLA-rad ny: arkitekten Carl Fredrik Adelcrantz ur BeBR.
- 0185: OBELAGD → STRYK+KOMPENSERA: "efter en renovering" struket; BeBR nämner ingen renovering före 1984. Kompensation N026–N028.
- 0173, 0174: DELVIS → PRECISERA: "Skärgårdsstiftelsen är reservatets markägare och förvaltare"; arean gäller reservatet. Länsstyrelsen.
- 0186: KÄLLA-rad ny: Skärgårdsstiftelsens egna sidor (förvärvet 1984, fyren bland "Våra byggnader").
- N008 (utanför listan, samma stycke): "ökade farter på sjön" struket (bara nivå 2); släckningen 1961 med BeBR och stavningen kassunfyr.
- N009 (utanför listan, samma stycke): renoveringen på 1990-talet och tändningen hösten 2000 tillskrivs stiftelsen (förtydligande 19); 2000 står också i BeBR.
- N024, N025 (nya): "en av den svenska östersjökustens äldsta fyrar" enligt Riksantikvarieämbetet; "tändes 1770". BeBR.
- N026, N027, N028 (nya): påbyggd till omkring 26 meter 1786–1787; linsapparat från Lepaute i Paris 1844–1845; fyrplatsen byggnadsminne sedan 1994. BeBR (historik och lagskydd).
Gotland Runt (edits nr 25, 27)
- 0123: "medan målgången ligger kvar i Sandhamn" struket. Kompensation N029 (ny, tävlingen seglades första gången 1937) och N030 (ny, banan norrut till Svenska Högarna och söderut runt Gotland). KSSS om sin egen tävling.
- N031 (ny): förbehållet i källan, eventuellt lediga platser 28–30 juni 2026, utan klockslag. KSSS aktuellt.
- 0061: did_you_know utan "kvar": "… och går i mål i Sandhamn efter varvet runt Gotland." KSSS.
Stigen runt Sandön (edits nr 4, 8, 13, 19, 28)
- 0144, 0215, 0555 och 0368 (utanför listan, samma uppgift): MOTSTRIDIG → PRECISERA. Kommunen anger ca 8 km i text och rubrik men 6,1 km i faktarutan (NK, MÄTT). Leden går inte att mäta entydigt, eftersom stigarna enligt kommunen bildar ett nät; SAT-etappen mäter 7,3 km i OSM mot SAT:s 8,1 km. Description[7] och aktiviteten anger kommunens båda värden, tipsen 6–8 km.
- N032 (ny): "Markeringarna är bitvis svåra att se, men stigarna bildar ett nät över hela ön, så det är lätt att själv välja väg." NK.
- 0561: trails 1 → 4 (kommunens fyra slingor). 0562: max_km 8,1 → 8 ("den längsta som är 8 km"). Naturkartans Sandönsida, SAT. Fälten visas inte.
Kalendern och faciliteterna (edits nr 29 och 17)
- 0067: FEL → RÄTTA: juni peak → open. 0070: september open står kvar men betyder nu "varje dag halva månaden". 0066: maj open → limited (anm-1). 0078: warning säger att restaurangen har öppet varje dag bara andra halvan av juni till första halvan av september. Värdshusets sida; regeln står i kommentaren ovanför seasonal.
- 0566 och 0567 (utanför listan, samma källa): toilets och shower borttagna ur amenities; toaletter och dusch finns bara sommartid. Fälten visas inte, och säsongen står i badplatsernas och hamnens texter. Värmdö kommun, KSSS.
Med barn
- 0539: OBELAGD. Ingen källa knyter Trouville till barn. Rubriken "Aktiviteter för barn på …" och urvalet efter orden bad och strand ligger i med-barn/page.tsx (rad 70–72 och 177). Ingen ändring i ödatan; förslaget (rubrik eller urval) går till mallarnas Skribent.
Platserna (sandhamn.sql)
- 0585, 0587: OBELAGD → STRYK+KOMPENSERA: husets byggår 1921 och dykutbildningarna 1982 strukna (husets historia; BeBR saknar huset enligt K-samsök). 0586: startåret 1982 tillskrivs Dykarbaren. 0591: "inte helt går att vädersäkra".
- N033, N034, N035 (nya): baren och matplatserna på nedervåningen; samma ägare med familj i mer än 20 år; "på Sandhamn 425 i Värmdö kommun". dykarbaren.se, länsmuseet.
- 0594, 0595: Lökholmen. Beskrivningen säger "på Lökholmen, som ligger i yttre havsbandet intill Sandhamn" (KSSS; MÄTT i OSM: nålen inuti Lökholmen, 507 m från Sandön). Fältet island och nålen står kvar. N036 (ny): passbåten går minst en gång i timmen under högsäsong. KSSS.
- 0439: KÄLLA-rad ny som kommentar utan UPDATE: nålen ligger inuti byggnaden Sandhamn Seglarhotell (OSM way 301302737, 2 m från väggen).
- 0418, 0419, 0421, 0394: Bistro Sands. Namnet står inte på hotellets sidor, och sidan länkar inte till sociala medier. Posten heter Sands Hotells restaurang (sedan runda 1 i sandhamn.sql). 0419 har hotellets sida som källa i stället för Nominatim, och kommunen i beskrivningens KÄLLA-rader kommer från länsmuseet.
- 0428–0435: EJ NÅBAR → OBELAGD. Facebooksidan visar "Det här innehållet är inte tillgängligt just nu". Ingen annan tillåten källa. Posten är inte ändrad; frågan står i sandhamn.tom.md.

## Toms beslut 6 i sandhamn.sql
- Stora Trouvillestranden och Lilla Trouville Stranden döljs med satsen från filmoarna.sql rad 182–183 och en kommentar om beslut 6. Arbetslistans rader om dem (0604, 0607, 0614, 0615, 0616) får ingen textändring. De och resten av posternas rader (0524–0537, 0603–0616) försvinner från sajten när posterna döljs: /upptack-sidorna och "Stora Trouvillestranden" i badplatslistan på /o/sandhamn/med-barn.
- PUB Alma och Sandhamns Glassigaste Ställe: ingen tillåten källa hittad. Satserna står bortkommenterade under raden "-- Körs bara om ingen har bekräftat posten före batch 01:s PR (Toms beslut 6). Redaktören avgör."
- Café Strindbergsgården: frågan till Tom i sandhamn.tom.md punkt 1 (dölja, ersätta eller låta stå). I Strindbergsgården finns i dag Strindberg's Champagne Club (egen sida strindbergs.se, Sandhamn 111), en annan verksamhet.

## Rader i arbetslistan som inte rörts
- 0409, 0416: strykningen står. Toms beslut 2 gör etiketten till Svallas indelning; beskrivningarna är tomma och posterna hör till beslut 6.
- 0442: ingen åtgärd (KSSS belägger "vid gästhamnen"). 0183, 0184, 0187: ingen åtgärd (stiftelsens egna uppgifter).
- 0175, 0176, 0178, 0254: OK enligt Redaktören. Höjden 26 m står också i BeBR ("cirka 26 meter" efter påbyggnaden), men raden är inte ändrad.
- 0380: Vaktens lista (FAQ:n om krogar). 0208, 0204–0207, 0131, 0356: ingen ny åtgärd; åtgärderna finns redan i edits nr 8, 4 och 12.
- anm-1: ingår i kalenderraderna ovan.

## Klockslag i källistan (Redaktörens tillägg)
Raderna i main-kopians kallor.generated.ts kommer från KÄLLA-raderna nedan. Alla ersätts i sandhamn.edits.json med citat utan klockslag; kallor.generated.ts är inte ändrad.
- Rad 52 (h433): island-data.ts:313 → nr 11 ("Giltig 17 augusti–12 december 2026", "433 Slussen–Djurö", "Stavsnäs vinterhamn"; restiden 46–56 min som mätning). Rad 364 ersattes redan av nr 15.
- Rad 101 (h16): :310 → nr 11, :266 → nr 6, :367 → nr 21 och :413 → nr 18 (bara GÄLLER-raden och "16A STAVSNÄS – SANDHAMN – HAGEDE"; restiden som mätning).
- Rad 108 (s15): :320 → nr 11 (inga tider sedan runda 2) och :412 → nr 18 ("GÄLLER 19 JUNI 2026 – 16 AUGUSTI 2026", "15A STOCKHOLM – VAXHOLM – SANDHAMN").
- Rad 199 (spa): :289 → nr 8. Citatet om spaets öppettider är borta sedan runda 1.
- Rad 262 (Cinderella): :319 → nr 11 och :268 → nr 6 ("30/4 - 4/6 a", "7/9 - 27/9", "Strandvägen - kajplats 14"; restiden 2 h 30 min som mätning).
- Ett citat med klockslag inuti förkortas med "…": KSSS "(Eventuellt ledigt mellan sön 28/6 … och tis 30/6 …)" (nr 25).
- MÄTT efter inläggning på kopian: 0 KÄLLA-rader med klockslag i Sandhamnsblocket (134 KÄLLA-rader) och i transit-stops.ts.

## Omprövas i slutomkontrollen
- 0010 (flaggan OMPROVAS): nivå 1-källan för "i Stockholms skärgård".
- 0173 och 0174 (OMPROVAS): reservatet och ön.
- 0495 och Sandhamnslinjen i 0497, 0557, 0027 och 0545: battaxi.se var ej nåbar för Tom 2026-11-07 och är läst i dag efter certifikatbytet.
- Kalendern (0066, 0067, 0070, 0078): en ruta kan bara ha ett värde. Juni och september får samma värde, eftersom källan delar båda på mitten; Redaktören bedömer om Öppet är rätt mellanläge.
- Stigen (0144, 0215, 0555, 0368, 0561, 0562): två värden från samma kommun.
- Grönskär (0177, 0185, N008, N009, N024–N028): BeBR som nivå 1 för fyrens historia.

## Torrkörning och kontroller (MÄTT)
- `applicera.mjs main-kopia sandhamn.edits.json --torr` (2a31087): **31 ersättningar ok, 0 fel**. Varje "gammal" finns exakt en gång i orörd main, och ingen överlappar en annan.
- Borttagen: gamla nr 20 (transit-stops.ts, redan i main enligt Vaktens lista, P0 18). Flyttad "gammal": nr 11 (P0 2026-10-29 ändrade method för Cinderella och linje 15 och lade till en kommentarsrad; "ny" behåller P0:s text). Utökad "gammal": nr 17 (amenities) och nr 19 (KÄLLA-raderna). Ändrade: 1, 4, 5, 6, 8, 11, 13, 17, 18, 19, 21. Nya: 25–30. Gamla nr 21–25 heter nu 20–24.
- TypeScript-parsern: 0 syntaxfel i island-data.ts och hantverkare-data.ts efter inläggning; `node --check` godkänner scripts/hamta-scb-oar.mjs.
- Citat (skript/citatkoll4.py): 65 KÄLLA-rader i edits.json, 15 i sandhamn.sql och 63 registerrader med läst 2026-11-09 ger 336 citat. Alla står ordagrant i dagens sparade källtext, med en URL per KÄLLA-rad och inga klockslag.
- sandhamn.sql: 20 UPDATE, varav 3 nya (dykarbaren.description, ksss-gasthamn-lokholmen-trollsundet.description och Trouville-posterna dolda), 1 kommentar utan UPDATE (0439) och 2 bortkommenterade satser. WHERE-värdena för beskrivningarna är jämförda med de publicerade sidorna svalla.se/upptack/<slug>: alla stämmer ordagrant. Inget är kört.
- Registret: 694 rader, alla med 15 kolumner. kontrollera_register.py: inga formfel, inga grundrader utan motsvarighet. Kolumnen kontrollant är tom.
- Lag 3 (lag3.py, wc -w mot baslinjen): /o/sandhamn 3 726 → 3 819 ord (108,8 %), /komma-dit 940 (123,4 %), /med-barn 831 (122,4 %), /aktiviteter 691 (105,5 %), /restauranger 350 (97,8 %), /hamnar 252 och /bad 496 oförändrade. Ingen sida under 95 %.

## För Redaktören
- Körs satserna för PUB Alma och Sandhamns Glassigaste Ställe blir /o/sandhamn/restauranger omkring 335 av 358 ord (93,6 %, RESONERAT: rubrikerna och länkraderna försvinner). Det är under 95 % och behöver kompensation.
- Sandhamns Värdshus engelska sida (MÄTT): "We will be closed for renovations on January 12th and welcome you back on March 6th!" Den svenska sidan säger fortfarande "Öppet året runt" om puben. Det rör seasonal.open, facts.season och restaurangens text (inte i arbetslistan).
- Waxholmsbolagets vintertabell för linje 16 är inte publicerad. Uppgifterna om året runt-trafik bygger på Waxholmsbolagets Sandhamnssida.
- KÄLLA-raderna för dykarbarens och bistro-sands koordinater i sandhamn.sql citerar fortfarande Nominatim från 2026-10-29 (inte i arbetslistan). Sands Hotells nål ligger inuti byggnaden i OSM (way 329728726, MÄTT).
- facts.season har kvar KÄLLA-rader från september och oktober (inte i arbetslistan).

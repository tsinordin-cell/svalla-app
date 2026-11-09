# Omarbete runda 4 – Styrsö (Granskaren och Skribenten, 2026-11-09)

Alla källor lästa 2026-11-09 med curl, Chromium (las_sida.py), pdftotext och OpenStreetMaps API (paus mellan anropen). Ingen P0. Ingen verifieringssida visades. goteborg.se id=3700 gav 500 i Chromium men 200 med curl; citatet är ur curl-texten.
Databasen gick inte att läsa: SELECT nekades i arbetsytan i dag. WHERE-villkoren i styrso.sql bygger på registret, datafix-filerna och platsexporten 2026-10-29 och är inte kontrollerade mot databasen.
Torrkört mot main-kopian 80c0470 (#510–#512). island-data.ts, islandCoords.ts och transit-stops.ts är oförändrade sedan 2a31087 (git diff).
Arbetsfiler, sidkopior, OSM-data och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4-styrso/ (texterna också i kallcache/ny, *.2026-11-09*).
Kortnamn: BP = Göteborgs Stad, Kulturhistoriskt värdefull bebyggelse i Göteborg – ett program för bevarande, del II, avsnittet Styrsö 87 (goteborgsstadsmuseum.se, nivå 1). PB = Göteborgs Stads planbeskrivning för Styrsö Tångenväg (granskning december 2019, nivå 1), som återger BP. RAÄ = Riksantikvarieämbetet, riksintresse för kulturmiljövården Styrsö [O 7]. Postnumren gäller den nya styrso.edits.json.

## Ändrade och nya registerrader (89 ändrade, 24 nya: N009–N032)
Historia, description[1] (ny post nr 31): BP, PB och RAÄ i stället för Göteborg & Co.
- 0089: DELVIS → PRECISERA: "fyra bebyggelsegrupper med olika karaktär" på norra Styrsö (BP).
- 0090: OBELAGD → PRECISERA: "Äldst är Byn" ersatt med att bebyggelsen på 1500-talet låg i huvudsak i Kyrkbyn (BP).
- 0092: MOTSTRIDIG → PRECISERA: "1752" → "stenkyrkan från 1750-talet". BP och PB: ersatte träkyrkan 1751; församlingen (nivå 2): byggd 1752, beslut 1752, invigd 1754.
- 0098: DELVIS → RÄTTA: "byggde de välbeställda skutskepparna" → "där bosatte sig flera skeppare" (BP).
- 0099: KORREKT, KÄLLA-rad ny: Bratten blev södra skärgårdens viktigaste badort och sommargästområde (BP).
- 0091, 0093–0097: KÄLLA-rad ny (BP, PB, RAÄ); "gårdar" → tre gårdar på 1500-talet, "gammal odlingsmark" → gärdet, "slingrande" → krokiga, som kommunen skriver.
- N009–N012 NY: fiskarbönder på 1500-talet, den gamla vägen, 1700-talsbebyggelsen som står kvar (PB 2019), Halsviks sjöbodar och byns fiske (BP).
Historia, did_you_know (ny post nr 35): BP och PB.
- 0043: OBELAGD → STRYK+KOMPENSERA: trankokeriet finns inte i nivå 1-källorna.
- 0044: DELVIS → PRECISERA: sillsalteri och värdshus vid Bratten "sedan 1700-talet" (BP, PB).
- 0045: OBELAGD → PRECISERA: Madam Öbergs gästgiveri → "ett värdshus, Öbergska värdshuset" (BP, PB).
- 0046: FEL → RÄTTA: "de första turisterna" → de första sommargästerna kom 1845 (BP, PB).
- 0047: OBELAGD → PRECISERA: "1893 invigdes" → kring sekelskiftet 1900 var Styrsö Hafsbad en omfattande rörelse (BP).
- 0048: KORREKT, KÄLLA-rad ny (BP).
- 0049: FEL → RÄTTA (utanför listan, samma mening): krogens 1969 → badrestaurangen förstördes vid en brand 1960 (BP, PB).
- 0050: MOTSTRIDIG → PRECISERA: kyrkan byggd i sten på 1750-talet, som 0092.
- N013–N016 NY: ångbåtslinjen 1869, badorten avvecklad efter 1930-talet, kyrkan av trä före stenkyrkan, park och badhus (BP, PB).
Historia, description[3]–[5] och character (nr 32, 2 och 4)
- 0105: OBELAGD → PRECISERA: "ursprungligen öns fiskhamn" → fiskeläge som vuxit fram kring hamnen (BP, RAÄ). N017 NY: fisket delvis kvar vid nya hamnen i Sandvik (BP, PB 2019).
- 0114: OBELAGD → STRYK+KOMPENSERA och 0115: FEL → PRECISERA: namnet Långesandsbron finns varken hos kommunen eller i Lantmäteriets ortnamn; "bron till Donsö, byggd 1974" (BP). 0116: läst igen.
- 0117: DELVIS → PRECISERA: "syns fortfarande" → bebyggelse som påminner om badortstiden, men anläggningarna 1850–1930 är till stor del borta (BP, RAÄ).
- 0118: OBELAGD → STRYK+KOMPENSERA: 1893 (bara hotellets sida) struket ur stycket.
- 0119 (utanför listan, samma mening) och 0120: OBELAGD → PRECISERA: anstalt för ”skrofulösa barn” på 1890-talet, kustsanatorium med tegelbyggnad 1908 (BP).
- 0122: läst igen (Göteborg & Co).
- N018–N021 NY (kompensation, nr 2): äldsta kyrkoplatsen på södra Styrsö, kapellet vid Brännholmsviken på 1500-talet, lämningar från förhistorisk tid och sillfisket, bron byggd 1974 (BP). N022 NY: anläggningarna 1850–1930 till stor del borta (BP).
- 0023: läst igen (kommunens utredning). 0024–0026: KÄLLA-rad ny (BP); krogens sida struken som källa för badortsvillorna.
Gästhuset (nr 9)
- 0204, 0206–0210: KÄLLA-rad ny: stbnb.se leder till guesthouse-styrso.se. 0204: "gammal jugendvilla".
- 0205: OBELAGD → STRYK+KOMPENSERA: byggåret 1904 (bara nivå 3) struket. N023 NY: med egen entré.
- 0211: läst igen. 0212: INAKTUELL → RÄTTA: websiteUrl https://guesthouse-styrso.se/. Posten finns inte i restaurants.
Hamn, tips och säsong (nr 33, 34 och 16)
- 0238: FEL → RÄTTA: Sandvik beläggs av hamnens egen sida (Styrsö Hamn): ett 50-tal gästplatser, toaletter, duschar, el, färskvatten, sugtömning och miljöstation (N024 NY). N025 NY: 557 m fågelvägen från Tången, uppmätt i OSM.
- 0243: OBELAGD → PRECISERA: "ta en kvällsbåt" om högsommaren → kontrollera sista båten från Styrsö Tången (N026 NY). Sommarens tabell finns inte publicerad.
- 0244: PRECISERA: Båtebacken och Tångbaren ligger vid kajen i Tången. 0242: läst igen.
- 0052: FEL → RÄTTA: peak 'Juli' → 'Sommar' (Styrsöbolagets sommarturlista, gästhusets sommarsäsong). Ingen källa anger öns högsäsong.
- 0065: FEL → RÄTTA: best 'Maj–Juni eller September' → 'Juni–augusti'. 0066–0070: ny bestReason. N030 och N031 NY: gästhuset juni–augusti 2026 och Utterviksbadets toaletter 15 maj–15 september.
- 0056, 0057 och 0061 (OBELAGD/FEL) samt 0059 och 0060 (FEL) → RÄTTA: april, maj och september blir limited, och juli och augusti blir open. 0053–0055, 0058, 0062–0064: KÄLLA-rader lästa i dag.
- 0051: läst igen. 0438: FEL (mallfel): datan säger inte emot sig själv, men /med-barn visar facts.season under etiketten "Bäst säsong". Mallarnas Skribent.
Bibliotek (nr 1): 0086: kommunens sida läst i dag; runda 3:s text knyter inte biblioteket till skolan. KÄLLA-raden har dagens datum.
Radien (ny post nr 36, Toms beslut 3): 0284, 0299, 0309, 0318, 0395, 0409, 0435: RÄTTA med uppmätta avstånd. N032 NY: raden i islandCoords.ts.
Databasen (styrso.sql, 6 nya UPDATE)
- 0306, 0310–0313 → RÄTTA/PRECISERA, 0307, 0308, 0314 KORREKT (Toms beslut 7): Isbolaget Hotell & Restaurang. Namn, text, webbplats https://www.isbolaget.com/ (egen sida, nivå 2) och nål på OSM-noden Isbolaget (node 832457440, Donsö Hamnväg 45, 128 m från den gamla nålen). N027 och N028 NY: rätterna (Västsverige, Isbolaget) och "Hundar är välkomna". "Det gamla ishuset" är byggnadens historia och är inte med.
- 0300: FEL → RÄTTA: Fiskeboas nål flyttas 210 m till OSM:s Fiskeboa Donsö, 42 m från ICA Nära Yngves Livs ("bredvid ICA Yngves Livs").
- 0325: OBELAGD → STRYK+KOMPENSERA: "den gamla lotsbostaden" saknar nivå 1. N029 NY: dagens lunch, skärgårdslunch på lördagar och söndagsmiddag (värdshusets sida).
- 0329: FEL → RÄTTA: bageriet var tillfälligt stängt i november 2026 enligt värdshuset. 0326–0328: lästa igen.
- 0410: OBELAGD, BEHÅLL (ingen UPDATE): hamnen anger bara "i Husvik", och OSM har ingen gästbrygga där.

## Rader i arbetslistan som inte rörts
- styrso-0331 (f15-k048): Toms beslut 4 (typen står kvar till fas 2). Beskrivningen säger redan foodtruck i styrso.sql (styrso-0335); källan läst i dag: "Det är en rosa foodtruck".
- styrso-0473 (f21-k100): Redaktörens beslut OK.
- styrso-0475 (full-25 utanför-2): fas 2 och Vaktens lista.
- styrso-0288 (f26-k037): Vaktens lista. Radien är nu inlagd (nr 36).
- styrso-0038 (f27-k020): mallarnas Skribent och Vaktens lista (IslandFakta.tsx:20).
- full-25 utanför-4: ingen ny åtgärd.
- mallar-omk3 utanför-1 och full-06 utanför-2: redan rättat i styrso-0142, post nr 7 ("1,2 kilometer från bryggan i Tången"). Kommunens sida läst i dag ("Från hållplatsen är det 1,2 kilometer till badplatsen").
- Borttagna poster: inga. Vaktens lista har inga Styrsö-poster att hoppa över, och alla 31 tidigare "gammal" står exakt en gång i main.

## Omprövas i slutomkontrollen
- 0329 (flaggan OMPROVAS): bageriets status läses om före publiceringen.
- 0092 och 0050: "1750-talet". Kommunen (nivå 1) skriver 1751 och församlingen 1752–1754. Redaktören avgör om 1751 ska stå.
- 0049: kommunen anger branden 1960 (badrestaurangen), krogens sida 1969 (hotell, restaurang och annan bebyggelse). Det kan vara två händelser; bara 1960 är belagt.
- 0052, 0056–0061 och 0065: säsongsfälten och Svallas skala. Öppet bara juni–augusti, peak 'Sommar'.
- 0211, N030: gästhusets säsong gäller 2026. 0243 och N026: tipset kan få tillbaka kvällsbåten när sommartabellen 2027 är publicerad.
- Isbolaget (0306–0314, N027, N028), Fiskeboa (0300) och Brännö Värdshus (0325–0329): WHERE är inte kontrollerade mot databasen.
- 0410: gästbryggans läge i Husvik kan bara bryggföreningen ange.

## Torrkörning och kontroller (MÄTT)
- `applicera.mjs main-kopia styrso.edits.json --torr` (80c0470): **37 ersättningar ok, 0 fel**. Varje "gammal" står exakt en gång i orörd main.
- Ändrade poster: nr 1 (bibliotekets KÄLLA-rad), 2, 4, 9 och 16. Nya: nr 31–36. Oförändrade: övriga 26.
- TypeScript-parsern efter inläggning på kopia: 0 syntaxfel i island-data.ts, islandCoords.ts och guide-island-map.ts.
- Källistan: generatorn körd på kopian. Styrsö får 40 källor, ingen med klockslag. Transdev-raden på rad 5847 försvinner, eftersom post nr 3 ersätter KÄLLA-raden ovanför facts.travel_time (island-data.ts:6642) med Västtrafiks tabell utan tider. kallor.generated.ts är inte ändrad.
- Citat (skript/citatkoll.py): 30 KÄLLA-rader i edits.json, 14 i styrso.sql och 113 registerrader med läst 2026-11-09 ger 381 citat, och alla står ordagrant i dagens sparade källtext. Inga klockslag och en URL per KÄLLA-rad.
- styrso.sql: 8 UPDATE (2 tidigare och 6 nya) och en kommentar utan UPDATE (Husvik). Inget är kört.
- Registret: 534 rader (rubrik och 533), alla med 15 kolumner. kontrollera_register.py: inga formfel, 0 grundrader utan motsvarighet. Kolumnen kontrollant är tom.
- Lag 3 (faktaregister.mjs --mat styrso mot baslinjen): ord 710 → 1 094, enheter 97 → 120, med källa 78 → 109 (main 80c0470: 710/97/78): OK.
- Radien (OSM-relation 6429433, 1 423 strandnoder): längsta strandpunkt 1 988 m från nålen, så 2,0 km täcker hela ön. Bryggorna ligger 781–1 548 m bort.
- /oppet-nu (RESONERAT ur data och sidans logik, inte renderat): Styrsö visas fortfarande alla månader. Juni–augusti ligger under Öppet med märket "Bäst: Juni–augusti". April, maj, september och oktober flyttar från Öppet till Begränsad service, och juli–augusti från Högsäsong till Öppet. JSON-LD: "Säsong: Hela året. Bäst tid: Juni–augusti."

## För Redaktören och Vakten
- Radien 2,0 km når också strand på Vargö (1 044 m), Känsö (1 317 m), Donsö (1 544 m), Köpstadsö (1 697 m) och Brännö (1 805 m). Bastubryggan Brännös nål (ö-fältet Brännö, i vattnet vid Vargö) ligger 1 749 m bort och räknas därför som "på Styrsö" i platslistan, eftersom onIsland är ö-fältet eller avståndet ≤ radien. Samma förslag som för Utö: ett ifyllt ö-fält som inte är öns namn ger onIsland = false.
- Generatorn märker goteborgsstadsmuseum.se och www5.goteborg.se (Göteborgs Stads egna dokument) som "myndighet: false".
- Isbolaget kallar sig "Isbolaget" med undertiteln "Hotell & restaurang i Göteborgs skärgård". Namnet "Isbolaget Hotell & Restaurang" är Västsveriges och Toms beslut.
- Styrsöbolagets tidtabellssida har en "Anpassad tidtabell med endast en snabbåt i trafik: L 281-282". Restiden i post nr 3 bygger på den ordinarie hösttabellen. Inte prövat i den här rundan.
- Utanför listan: bevarandeprogrammet säger att Tången ligger på öns norra sida, Båtebacken (description[3]) säger nordvästra. Inte ändrat.

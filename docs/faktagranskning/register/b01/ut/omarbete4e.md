# Omarbete runda 4e – Utö, Styrsö, Fjäderholmarna och Sandhamn (Granskaren och Skribenten, 2026-11-16)

Alla källor lästa 2026-11-16 (curl --http1.1, Chromium, pdftotext, OpenStreetMaps API); databasen bara läst med SELECT. Ingen verifieringssida, ingen P0. Inget committat.
Main-kopian står på ffeb8e1. Arbetsfiler, källtexter, OSM-data, mätningar och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4e/ (säkerhetskopior i fore/).

## Utö (uto.tsv; uto.edits.json nr 8, 13 och 34)
- uto-0143 (od4023): KORREKT, KÄLLA-rad ny. Bebyggelseregistret (byggnadsminnesbeslutet 2001-03-14) räknar upp 4 + 3 + 2 parstugor längs Lurgatan, byggda som gruvarbetarbostäder, alltså nio. Skärgårdsstiftelsens rad (nivå 2) är struken. Källor: BeBR (historik), Haninges inventering.
- uto-0142: DELVIS → PRECISERA: "och 2001 blev …" → "och sedan 2001 är … byggnadsminne enligt kulturmiljölagen". Beslutet 2001 hänvisade till kulturminneslagen; det aktuella lagskyddet är "2001-03-14 Byggnadsminne (BM) 3 kap. KML". Källor: BeBR (lagskydd, historik), Länsstyrelsens byggnadsminneslista, Haninge.
- uto-0363: KORREKT → PRECISERA: källistans post för Skärgårdsstiftelsens byggnadssida utgår för Utö, och BeBR:s citat visas i stället (generatorn körd på kopia).
- uto-0330 (od4004): DELVIS → PRECISERA och uto-0331 (od4034): DELVIS, RÄTTA: tipset börjar "I naturreservatet, som omfattar norra delen av Utö och ett antal öar runt omkring, får du bara tälta … och bara elda …". Källa: Länsstyrelsen (reservatets utbredning och föreskrifterna).
- uto-0332: ny text "Där får båtar inte förtöjas …" (samma föreskrift, samma källa, läst igen). P0 20:s skjutfältstips i nr 8 är orört (MÄTT: raden är tecken för tecken densamma, med tillträdesförbudet, Försvarsmaktens webbplats, telefonen och informationstavlorna).
- uto-0016 (Toms beslut 3c): nålen 58.9482, 18.3006. Källa: OSM-relation 6315443, punkten på land 207 m från närmaste strandnod.
- uto-0017 (3c): radiusKm 5.3; ny text är hela raden i islandCoords.ts. MÄTT i dag: 3 839 strandnoder i ytterringen, minsta omslutande cirkel (Welzl i azimutal ekvidistant projektion, haversine) 58.948236, 18.300524 och 5,254 km. Från den avrundade nålen ligger längsta strandpunkten 5,254 km bort (46 m marginal), Gruvbryggan 2,85, Ålö brygga 7,00, Rånö färjeläge 7,73 och Rånökällan 7,80 km. Det stämmer med Redaktörens mätning; 5,3 km räcker. Metoden står i kommentaren och på KÄLLA-raderna i nr 34. Källor: OSM-relationen och noderna.
- uto-0164 gäller Ålö-Rånö-reservatet och nämner varken nål eller radie. Den är inte ändrad.

## Styrsö (styrso.tsv; styrso.edits.json nr 16)
- styrso-0062: oktober står kvar som limited, nu bara med belägg på nivå 1–2: gästhuset juni–augusti 2026, Utterviksbadets toaletter 15 maj–15 september (Göteborgs Stad), Västtrafiks tabell Saltholmen–Södra Skärgården "Gäller 24 aug – 12 dec 2026" och Kusthotellet "året runt". Tångbaren skriver "Vi välkomnar bokningar året runt" och anger ingen säsong efter 23 augusti. Västsverige (nivå 3) är struken. Kommentaren och KÄLLA-raderna ovanför months är rättade.
- styrso-0053, 0054, 0055, 0056, 0057, 0058, 0059, 0060, 0061, 0063, 0064: Västsverige är struken ur källorna (som för oktober). Värdena är oförändrade, och de fyra källorna på nivå 1–2 är lästa igen.

## Fjäderholmarna (fjaderholmarna.tsv; fjaderholmarna.edits.json, ny post nr 40)
- fjaderholmarna-0017 (od4021): ny text är hela raden i islandCoords.ts med nålen 59.3284, 18.1751, radiusKm 1.5 och platsRadieKm 0.7. MÄTT i dag i OSM-relation 12694237 (563 noder): nålen ligger på Stora Fjäderholmen, 78 m innanför stranden, och längsta avståndet är 0,537 km. Källan är OSM:s API i stället för Nominatim.
- Ny post nr 40 (rader: fjaderholmarna-0016): svalla-oar-sok.test.ts väntar sig 59.3284 i stället för 59.3333. Det är en testrad, ingen sakuppgift.

## Sandhamn (sandhamn.tsv; sandhamn.sql; sandhamn.edits.json oförändrad)
- sandhamn-0561: KORREKT → FEL, RÄTTA "trails: 4" (Värmdö kommuns fyra promenadslingor i Naturkartan; SAT står för sig i sat). Post nr 28 är oförändrad; 0561–0564 fanns redan i dess "rader".
- sandhamn-0562: KORREKT → MOTSTRIDIG, PRECISERA "max_km: 8". Kommunens text anger 8 km, ledens faktaruta 6.1 km och SAT 8.1 km för sin etapp. Koden följer texten och nämner 6,1 km, så den är inte ändrad.
- sandhamn-0428 (namn): RÄTTA "Strindberg's Champagne Club" (Toms beslut 6b). Källa: strindbergs.se.
- sandhamn-0429 (typ): RÄTTA cafe → restaurant. Klubben är "Champagnebar, restaurang och medlemsklubb"; bar finns också bland typerna, medlemsklubb inte. Källa: strindbergs.se.
- sandhamn-0430 (ö): PRECISERA, Sandhamn står kvar ("Restaurangen och klubbhuset ligger i hamnen på Sandhamn."). Källa: strindbergs.se.
- sandhamn-0431 (nål): RÄTTA 59.2890639, 18.9138771, OSM-noden Strindberg's Champagne Club (node 13780498735). Den ligger 101 m öster om den gamla nålen och 10 m från noden Strindbergsgården.
- sandhamn-0432 (webbplats): RÄTTA https://strindbergs.se/ (i stället för kaféets Facebooksida). Källa: strindbergs.se.
- sandhamn-0433, 0434, 0435 (beskrivning): RÄTTA. Den nya texten säger vad klubben är och var den ligger: Strindbergsgården, Sandhamn 111, i hamnen på Sandhamn i Värmdö kommun. Källor: strindbergs.se och länsmuseet ("Kommun: Värmdö").
- sandhamn-N041 (ny): "Klubben skriver att alla är välkomna till restaurangen och att medlemskapet, som är kostnadsfritt, dessutom ger inbjudningar …" (strindbergs.se). endast_medlemmar står kvar som false.
- sandhamn-N042 (ny): stängt efter sommarsäsongen 2026, och inget datum är planerat för 2027 (strindbergs.se). Läses om före publiceringen.
- sandhamn-N043 (ny): formatted_address 'Sandhamn 109, 130 39 Sandhamn' (kaféets) → 'Strindbergsgården, Sandhamn 111, Sandhamn' (strindbergs.se).
- sandhamn-0417 och 0422 (Toms beslut 6c): märkta "Toms beslut 6c 2026-11-16: står kvar som den är", PRECISERA som Bakgården. Satserna för bistro-sands.name och .description är borttagna ur sandhamn.sql, och nålens två satser (0420) står kvar.
- sandhamn-0418, 0419, 0421 och 0394: en not om beslut 6c i "rätt uppgift", eftersom de hänvisade till omdöpningen.
- sandhamn.sql: sex nya UPDATE för cafe-strindbergsgarden (name, type, latitude/longitude, website, description, formatted_address), med FÖRE i WHERE och KÄLLA-rader. SELECT i dag: varje WHERE träffar exakt en rad. Inget är kört.

## Kontroller (MÄTT 2026-11-16)
- Torrkörning mot main-kopian ffeb8e1 (från register/b01/ut): uto 36, styrso 23, fjaderholmarna 41 och sandhamn 31 ersättningar ok, 0 fel. Main-kopian är orörd (git status är tom).
- Torrkopia (git archive ffeb8e1 och de fyra öarnas filer inlagda):
  - npx tsc --noEmit: 1 fel, platsRadieKm i islandCoords.ts:27, eftersom IslandCoord saknar fältet utan mallarnas runda 5. Med mallar-arbetskopia.patch (git apply går rent på ffeb8e1): 0 fel.
  - npx vitest run src/lib/svalla-oar-sok.test.ts: 3 av 3 gröna. Med den gamla testraden faller testet (59.3284 mot 59.3333).
  - npx vitest run src/lib: 67 filer och 729 test gröna. Inget test väntar sig Utös gamla nål (grep och körning).
- Med mallarnas patch: src/lib ger 745 av 746. islandPlaces.test.ts "räknar inte grannöarnas platser …" faller, eftersom testet utgår från att Styrsö saknas i islandCoords (3 km), men styrso.edits.json nr 22 lägger in Styrsö med 2,0 km. Felet finns också med filerna före 4e och syns inte med bara patchen. Det är inte en följd av 4e.
- Citat (skript/kolla_4e.py): 22 KÄLLA-rader (edits och sql) och 33 registerrader med läst 2026-11-16, 161 citat, står ordagrant i dagens sparade text. Inga klockslag, en URL per KÄLLA-rad. kontrollera_register.py: inga formfel; Utös 6 grundrader utan motsvarighet beror som förut på radnumren från 4c.
- Lag 3 (faktaregister.mjs --mat, före → efter 4e): Utö 2 299 → 2 303 ord (227 enheter, 195 med källa). Styrsö 1 106, Fjäderholmarna 1 614 och Sandhamn 2 085 ord är oförändrade. Alla OK.
- generera-kallor.mjs på kopian med patchen: 101 öar och 1 695 källor, --kontroll grön. Styrsö har inte längre Västsverige, och Utö har inte längre Skärgårdsstiftelsens byggnadssida.

## För Redaktören
- Kvar från kaféet i databasen, utan sats (visas på /upptack): menu "Kaffe, te, hembakat, enkel lunch.", opening_hours, categories (cafe, coffee, hidden_gem), facilities (cafe), taggen fika, kaféets Google-uppgifter (google_place_id, betyget 3,4 och bilderna) och image_url.
- sandhamn.tom.md punkt 1 och 4 och register-0563/0564 (citatet "Easy 8.1 km" från 2026-10-29) är inte ändrade. Kommentaren i islandCoords.besokt.test.ts:5 nämner fortfarande Fjäderholmarnas gamla nål, men testet går igenom.

# Omarbete runda 4b – Fjäderholmarna, Grinda, Möja, Vaxholm och Utö (Granskaren och Skribenten, 2026-11-09)

Alla källor lästa 2026-11-09: curl (--http1.1), Chromium (las_sida.py; kanotcenter.com och Facebook utan klick), pdftotext/pdfplumber, sidbilder för skannade PDF:er, OpenStreetMaps API med paus. Facebook (PerMobilen, Jeppes, Svenska Gästhamnar Möja–Löka, Hembygdsgårdens kafé) enligt Redaktörens läsning i Toms Chrome (kallcache/facebook-2026-11-09.txt). Möja Hamncafés Facebooksida gick att läsa utan inloggning. Ingen verifieringssida, inget kört mot databasen, inget committat. Ingen P0.
Arbetsfiler, sidkopior, OSM-data och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4b/ (säkerhetskopior i fore/; källtexterna också i kallcache/ny/omk4b__*).
Kortnamn: K7 och QM = Lidingö stads kulturmiljöprogram (Stora Fjäderholmen; del 2, s. 179). FS = Fornsök L2013:5096. LS-beslutet = Länsstyrelsens beslut om Grinda naturreservat 2000 (skannat, s. 1 och s. 6 lästa som sidbild). SG = svenskagasthamnar.se Möja–Löka (nivå 3).

## Fjäderholmarna (5 registerrader ändrade; edits nr 33, 34, 35, 38 ändrade, 40 poster; sql oförändrad, 4 UPDATE)
- fjaderholmarna-0129 (fo4007): description[10] "Krog har funnits … sedan 1699" → "Det fanns krog på Stora Fjäderholmen redan 1699 och troligen långt tidigare." och sist i stycket "Efter försvarsepoken har krog- och restaurangnäringen återkommit till holmen." K7 (1699; 1940–1976), QM ("återkommit"). Nr 33.
- fjaderholmarna-0041 (fo4021): did_you_know samma rättelse: "Det fanns krog på Stora Fjäderholmen redan 1699. År 1940 … fram till 1976, och sedan dess har krog- och restaurangnäringen återkommit till holmen." K7, FS, QM. Nr 38.
- fjaderholmarna-0137 (fo4013): "År 1918 förvärvade marinen Fjäderholmarna, och efter första världskrigets slut byggdes holmarna efterhand ut för ammunitionstillverkning." K7, QM. Nr 35.
- fjaderholmarna-0039, 0133 (fo4003, fo4006): namnet skrivs som Riksantikvarieämbetet, "Lilla Brittannien". FS. Nr 38 och 34.
- Övriga KÄLLA-rader i nr 33–35 och 38 lästa igen (fjaderholmarna.se, förvaltarens historiesida, Stockholmskällan 9943).
- Inga rader lämnade orörda. Torrkörning: 40 ersättningar ok, 0 fel.

## Grinda (7 registerrader ändrade; edits nr 19 ändrad, 20 poster; sql oförändrad, 8 UPDATE)
- grinda-0209, 0211 (go4008, go4042): åtgärd BEHÅLL → PRECISERA och ny text = meningen som den står i description[15], utan badgäster. Koden har redan ingen "badgäster"; Kontrollantens underlag tar påståendet för BEHÅLL-rader och visade därför den gamla meningen. LS-beslutet s. 6.
- grinda-0168 (go4055): Waxholmsbolagets sida om Grinda ("Grinda har trafik året om", Chromium) först i radens källor. KÄLLA-raden i koden (nr 3) har den redan.
- grinda-0587, 0589 (go4037, go4041): alla källor för varje led i wärdshusets databastext samlade i raden (17 par: Skärgårdsstiftelsen, STF, Länsstyrelsen, LS-beslutet, grinda.se ×6). Samma källor som i grinda.sql.
- grinda-N002 (go4057): alla källor för bestReason samlade (Sea Lodge, lanthandeln, s11, Waxholmsbolaget, sjömacken, öppettider, Eld-helgen).
- grinda-0018 (Redaktörens tillägg, Toms beslut 3): nr 19 sätter radiusKm 2.5 → 1.5; platsRadieKm 1.4 står kvar. Mätningen gjord om i OSM (relation 2663146, 3 887 strandnoder): Grindas längsta punkt 1,319 km (nod 2012398914). En cirkel på 1,5 km når också strand på Viggsö 1,19 km, Södra Ljusterö 1,22 km och Storön 1,43 km (står i kommentaren).
- Källistan: kallor.generated.ts:737 och 744 kommer från island-data.ts:948–949 (s11, h11), som nr 4 redan ersätter utan klockslag. MÄTT: inga klockslag i Grindas KÄLLA-rader efter inläggning. Ingen ny ändring.
- Inga rader lämnade orörda. Torrkörning: 20 ersättningar ok, 0 fel.

## Möja (22 registerrader ändrade, 2 nya: N028, N029; edits nr 7, 19, 20, 30, 31 ändrade och nr 34 ny, 35 poster; sql: 3 UPDATE ändrade och 1 ny, 12 UPDATE)
- moja-0580 (mo4008): ingen källa ger kaféets punkt; kaféets Facebooksida anger bara "Kyrkviken , Möja, Sweden". Gamla nålen låg 22 m från Les Poissonniers de Möja. Ny UPDATE: 59.4064678, 18.8840547 = mittpunkten på bryggan längst in i Kyrkviken (OSM way 528147405), 17 m från gästhamnens nål, 30 m från Möja hamnbar. FEL → RÄTTA.
- moja-0581 (mo4069): website = https://www.facebook.com/profile.php?id=100067003784963 (visitmoja länkar dit, MÄTT i HTML; senaste inlägget 7 augusti 2026). Satsen ändrad, WHERE oförändrad.
- moja-0619 (mo4014, punkt 19): "Enligt värdshuset tog nuvarande fastighetsägare över verksamheten 2019, gjorde då en omfattande renovering för en större matsal och investerade i ny bageriutrustning …"; "Här finns också rum, som bara går att boka 18 juni–15 augusti." mojavardshusochbageri.se, boka-bord.php.
- moja-N027 (mo4011): "Waxholmsbolagets sommartabell för linje 14 till Möja gällde 19 juni–16 augusti 2026." s14. Nr 19.
- moja-0466 (mo4022): källa PerMobilens Facebooksida (inlägg 8 augusti 2026, citat utan klockslag). Nr 31.
- moja-0468, 0469 (mo4062, mo4072): "Sommartid kör PerMobilen hop on/hop off på Möja, med dagliga turer på landsvägen mellan Berg och Långvik, tur och retur." Operatören; "dagliga" och "landsvägen" med visitmoja. Nr 31, där "gammal" är förlängd med textraden.
- moja-0289 (mo4025): visitmoja "Bo ovanpå bageriet, boka via Möja värdshus." i raden och som KÄLLA-rad i nr 7.
- moja-0360 (mo4029): "I Waxholmsbolagets tabell för vår och höst 2026 angör de flesta turerna Berg, en del bara om resan har beställts i förväg". MÄTT kolumn för kolumn: Berg på 51 av 54 turer till Möja (9 märkta b; 1325, 1461, 1462 utan Berg), s14 50 av 53. Nr 30.
- moja-N023 (mo4071) och N029 (ny): "cirka 75 meter bort" struket; kompensation: "STF Möja vandrarhem, som har öppet april–december" (STF). Nr 30.
- moja-0407, N008 (mo4033): SG som källa för fiskehamnen, färskvattnet och miljöstationen. Trafiken: "Waxholmsbolagets linje 14 angör Löka; i tabellerna för 2026 står bryggan på de flesta turer med X, som betyder att den trafikeras utan fast avgångstid." MÄTT: X på 38 av 54 (h14) och 37 av 53 (s14).
- moja-0413, 0414 (mo4s08): "Enligt hamnens uppgift på Svenska Gästhamnar håller man på att installera Y-bommar på gästplatserna, och båtbredden blir då högst 2,75 meter inklusive fendrar." OBELAGD → KORREKT, PRECISERA. Samma UPDATE som 0407.
- moja-0584 (mo4075): källan byts till Jeppes Gästgiveris Facebooksida ("Jeppes Gästgiveri", "Restaurang", inlägg 6 november 2026). Bara kommentar i sql.
- moja-0056–0059, 0066, 0067 och N028 (ny) (utanför-1): månaderna står redan som limited i nr 20 (runda 4); Kontrollanten mätte main. Belägg per månad: Coop i Berg och kommunen (matbutik året runt), Waxholmsbolaget och kommunen (båtar året runt), vandrarhemmet april–december. Kommunens citat om båtarna tillagt i KÄLLA-raden ovanför months. "Restauranger året runt" (nivå 3) används inte. open "Hela året" och warning stämmer.
- moja-0024 (Redaktörens tillägg, Toms beslut 3): ny post nr 34 ändrar bara Möjas rad: radiusKm 3.0 → 3.5. Mätt i dag i OSM från nålen: Berg 3 036 m, Möjaström 3 293 m, Södermöja 3 331 m; Stora Kalholmens brygga 4 211 m och holmens närmaste strand 3 889 m; Möjas längsta punkt 3 584 m (33 av 3 343 strandnoder utanför 3,5 km).
- Källistan: kallor.generated.ts:1035 och 1077 kommer från island-data.ts:1332 och 1509, som nr 1 och 17 redan ersätter utan klockslag (1330 och 1403 i nr 1 och 7 likaså). Ingen ny ändring.
- Orörda: mo4005 (moja-0232) – KÄLLA-raden anger mätmetoden ("uppmätt i OpenStreetMap: relationens två vägar är 4 857 m", relation 19268630, läst 2026-11-09); ingen ändring. mo4041 (moja-N026) – Ingen åtgärd.
- Omprövas i slutomkontrollen: 0619, 0360, 0407/N008 (och 0413, 0414).
- Torrkörning: 35 ersättningar ok, 0 fel.

## Vaxholm (5 registerrader ändrade, 1 ny: N025; edits nr 5, 24, 28 ändrade, 42 poster; sql: 1 ny UPDATE, 12 UPDATE)
- vaxholm-0437 (vo4011): registertexten: platslistan bygger på ö-fält eller en radie på 2,0 km (islandPlaces.ts, islandCoords.ts), inte på polygon. Tenö ligger 1,74 km från Vaxholms mittpunkt och räknas som Vaxholm tills radien per ö finns (mallarnas runda 5, Toms beslut 3, Vaktens lista).
- vaxholm-0615, 0618 (vo4059, vo4111): notes: "Operatören graderar de guidade kajakturerna som lätta (Easy) eller medelsvåra (Moderate). Nybörjare är välkomna på de guidade turerna, men för heldagsturen med lunch på en ö, som är medelsvår, rekommenderar operatören viss tidigare paddlingserfarenhet …". difficulty lätt → medel (sidan visar fältet som märke; bara lätt och medel visas som sådana). Destination Vaxholms KÄLLA-rad borttagen. kanotcenter.com/tours/, heldagsturens sida, startsidan. Nr 28.
- vaxholm-0336 (vo4060): "Båten från Strömkajen tar 50–90 minuter på de flesta turer och längre på enstaka turer – räkna med en dryg timme." MÄTT i 2A: 87 av 89 turer 50–90 min, median 70, tur 0389 145 min. Nr 24.
- vaxholm-0103 (vo4067): Waxholmsbolagets sida om de 44 bryggorna (Chromium) i radens källor; KÄLLA-raden i nr 5 läst igen med listans citat.
- vaxholm-N025 (ny, utanför-1): restaurants.vaxholms-fastning-cafe.formatted_address "Trädgårdsgatan 19, 185 32 Vaxholm" (Hembygdsgårdens adress) → "Kastellet, 185 99 Vaxholm". Museets sida: "Kastellet 185 99 Vaxholm". Ny UPDATE med WHERE på slug och gamla värdet.
- Orörda: utanför-2 (guidernas 1548) – Ingen åtgärd i batch 01, Vaktens lista. verktyg (las_sida.py på kanotcenter.com) – Vaktens lista.
- Omprövas i slutomkontrollen: 0615, 0618.
- Torrkörning: 42 ersättningar ok, 0 fel.

## Utö (4 registerrader ändrade, 1 ny: N032; edits nr 8, 13, 25 ändrade och nr 35 ny, 36 poster; sql oförändrad, 20 UPDATE)
- uto-0332 (uo4010): "I naturreservatet, som omfattar norra delen av Utö och ett antal öar runt omkring, får båtar inte förtöjas eller förankras längre än två dygn vid samma strand om andras möjlighet att använda en värdefull båt- eller badplats hindras eller försvåras." Länsstyrelsen. Nr 8.
- uto-0335 (uo4022) och N032 (ny): ingen av församlingens tre sidor om Utö kyrka säger att kyrkan är öppen för besökare. "Gå in i kyrkan om den är öppen" struket (OBELAGD → STRYK+KOMPENSERA); kompensation: "Till Utö kyrka är det enligt församlingen fem minuters promenad från Spränga brygga, som är närmaste brygga." Orgeln står kvar. Nr 25.
- uto-0017 (uo4046): registertexten säger vad radien 7,0 km täcker, mätt igen: hela Utö (längsta strandpunkt 6,997 km), Gruvbryggan 4,41 km, Ålö brygga 5,09 km, Rånö färjeläge 5,77 km och Rånökällan 5,82 km. Till Toms fråga 3c: minsta omslutande cirkel (egen beräkning) mitt 58.9485, 18.3001, radie 5,24 km; Ålö 6,99 och Rånö 7,72 km därifrån. Radien och nålen orörda.
- uto-0139 (utanför-2): "Väderkvarnen byggdes på 1790-talet" (MOTSTRIDIG → PRECISERA): 1791 enligt Länsstyrelsen och Haninges inventering, 1792 enligt Bebyggelseregistret och byggnadsminnestexten. Nr 13, där "gammal" är förlängd med textraden.
- Källistan (utanför-1): h21-citatet (island-data.ts:521) ersätts redan av nr 5 utan klockslag (MÄTT). Bakfickans citat (main rad 598, i ingen post) hade "Lördagar 22:00 –"; ny post nr 35: "Från 5 Juni 2027 * Lördagar …" (läst i dag).
- Orörda: uo4s01 (uto-0152), uo4s02 (uto-0153) – Ingen åtgärd, strykningen var rätt.
- Omprövas i slutomkontrollen: 0139.
- Torrkörning: 36 ersättningar ok, 0 fel.

## Kontroller (MÄTT)
- Torrkörning mot main-kopian (2a31087): 40, 20, 35, 42 och 36 ersättningar ok, 0 fel. Alla fem i följd i samma kopia: 0 fel. TypeScript-parsern: 0 syntaxfel i island-data.ts, islandCoords.ts, transit-stops.ts och hantverkare-data.ts.
- Citat (skript/citatkoll_4b.py): 47 nya eller ändrade KÄLLA-rader i edits och sql med 101 citat, och 47 ändrade eller nya registerrader med 190 par (URL, citat), står ordagrant i dagens sparade text (NFKC, blanktecken normaliserade, … prövas i delar). Inga klockslag i citat eller ny text. En URL per ny KÄLLA-rad. Varje ändrad sträng har KÄLLA-rad inom fem rader.
- Registren: alla rader har 15 kolumner, inga dubbla id (fem öar).
- Lag 3: ingen ändrad sträng blir kortare (Fjäderholmarna 206 → 223 ord, Möja 346 → 358, Vaxholm 135 → 173, Utö 178 → 200; Möjas SET-texter 57 → 95 och 47 → 61).

## För Redaktören och Vakten
- Ingen SELECT är körd. WHERE i Möjas tre ändrade satser, Hamncaféts nya koordinatsats och fästningskaféets adresssats bygger på registrets och sidans värden. Kör SELECT före.
- Möjas radiusKm 3.5 gäller också platslistan tills platsRadieKm finns, så platser 3,0–3,5 km från nålen räknas då som på Möja.
- Fjäderholmarnas nr 31 sätter fortfarande radiusKm 0.7 (runda 4); Toms beslut 3 säger 1,5 km. Vaktens lista justerar den.
- Grinda: i wärdshusets databastext står "som" närmast "Saxarfjärden" (Kontrollantens anmärkning). Inte ändrad.
- Vaxholm: description[4] (vaxholm-0102, nr 5) säger fortfarande 50–90 minuter för alla turer. Låg inte i arbetslistan.
- Bloggen (blogg/[slug]/page.tsx:700, 713) beskriver PerMobilen som trafik mellan norra och södra Möja, och rad 707 har ett pris i en KÄLLA-not.

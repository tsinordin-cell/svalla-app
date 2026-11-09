-- Faktagranskning batch 01, Utö. Granskare/Skribent 2026-10-29.
-- Kör inte blint: varje UPDATE skriver bara om texten är exakt den som granskades (WHERE ... and <kolumn> = <gammal text>).
-- Dagens text hämtad med SELECT mot projektet oiklttwylndesewauytj 2026-10-29. Inga rader raderas eller döljs.
-- Omarbete runda 4 (2026-11-09): SELECT mot projektet 2026-11-09. Alla satser i filen, också de från 2026-10-29 och 2026-11-03, träffar exakt en rad med dagens värden. Inget är kört.
-- Koordinaterna i runda 4 är uppmätta i OpenStreetMaps API (api.openstreetmap.org, haversine; byggnadens punkt = medelvärdet av hörnpunkterna utan den upprepade slutnoden).
-- WHERE på gamla koordinater avrundar till sju decimaler: två lagrade värden (gruvbryggan, rano-brygga) är inte exakt lika med sina decimaltal som flyttal (SELECT 2026-11-09).

-- uto-bykrog.description — uto-0397 (namnet: Kontrollanten k025), uto-0399 (återställd: Kontrollanten s005), uto-0398, uto-0400, uto-N016
-- Omarbete 2026-11-03: restaurangens eget namn "Utö by Krog"; kommunen belagd med SCB i stället för omvänd geokodning; läget vid vägen mellan Gruvbyn och Ålö återställt.
-- KÄLLA: https://xn--utbykrogen-fcb.se/ — "Utö by Krog — Skärgårdsrestaurang på Utö" (läst 2026-11-03)
-- KÄLLA: https://xn--utbykrogen-fcb.se/kontakt — "Edesnäs Gård 3, Utö, Stockholms skärgård", "Vill du boka bord eller fråga om catering?" (läst 2026-11-03)
-- KÄLLA: https://api.scb.se/OV0104/v1/doris/sv/ssd/MI/MI0812/MI0812A/OarEjBro01 — "0136Q102", "Utö" (läst 2026-11-03); ön Utö har SCB:s regionkod 0136.
-- KÄLLA: https://api.scb.se/OV0104/v1/doris/sv/ssd/BE/BE0101/BE0101A/BefolkningNy — "0136", "Haninge" (läst 2026-11-03); regionkod 0136 är Haninge.
-- KÄLLA: https://stockholmarchipelagotrail.com/section/uto-alo-connector-2/ — "The gravel road can take you all the way south to the ferry quay on Ålö and Båtshaket, or all the way north to Gruvbryggan on Utö", "The section starts either at “Gula Villan” on Utö and heads south along the gravel road" (läst 2026-11-03)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/36363579/full — "Stora Landsvägen", "gravel" (läst 2026-11-03); uppmätt i OpenStreetMap 2026-11-03: platsens nål (58.9546699, 18.2827434) ligger 16 m från Stora Landsvägen, som går mot Ålö i sydväst.
-- KÄLLA: https://skargardsstiftelsen.se/app/uploads/2024/07/Uto-Skargardsstiftelsen-20240724.pdf — "Här i Gruvbyn finns turistbyrå, gästhamn" (läst 2026-11-03)
-- KÄLLA: https://www.utogasthamn.se/ — "Närmsta bryggan till Utö Gästhamn är Gruvbryggan." (läst i webbläsare (Redaktören) 2026-11-02)
-- FÖRE: 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.'
update restaurants set description = 'Utö by Krog är en restaurang i Edesnäs på Utö i Haninge kommun, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3, och restaurangen tar emot bordsbokningar och förfrågningar om catering.', updated_at = now() where slug = 'uto-bykrog' and description = 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.';

-- uto-bykrog.name — uto-0392 (DELVIS: restaurangens egen webbplats skriver "Utö by Krog"; "Utö Bykrog" står inte där)
-- KÄLLA: https://xn--utbykrogen-fcb.se/ — "Utö by Krog — Skärgårdsrestaurang på Utö" (läst 2026-11-03)
-- FÖRE: 'Utö Bykrog'
update restaurants set name = 'Utö by Krog', updated_at = now() where slug = 'uto-bykrog' and name = 'Utö Bykrog';

-- gruvbryggan.description — uto-0447 (Kontrollanten k119: Gruvbryggan är inte Waxholmsbolagets enda brygga på Utö), uto-0448, uto-N019
-- Dagens text: supabase/datafix/2026-10-19-filmoarna.sql rad 225 (datafix-kallor.tsv, matchat med md5 2026-10-29). Databasen är pausad, så WHERE är inte kontrollerat mot den.
-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/uto — "Vi angör flera bryggor på Utö. Den mest trafikerade är Gruvbryggan, men lite längre söderut ligger även Näsudden och Spränga." (läst 2026-11-03, i Chromium)
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h21.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "21A", "ÅRSTA – UTÖ", "Årsta brygga", "Gruvbryggan (Utö)", "Näsudden (Utö)", "Spränga (Utö)" (läst 2026-11-03)
-- KÄLLA: https://api.scb.se/OV0104/v1/doris/sv/ssd/MI/MI0812/MI0812A/OarEjBro01 — "0136Q102", "Utö" (läst 2026-11-03); ön Utö har SCB:s regionkod 0136.
-- KÄLLA: https://api.scb.se/OV0104/v1/doris/sv/ssd/BE/BE0101/BE0101A/BefolkningNy — "0136", "Haninge" (läst 2026-11-03); regionkod 0136 är Haninge.
-- KÄLLA: https://www.utogasthamn.se/gasthamnen/ — "I den norra hamnen finns sjömacken och det är också där de reguljära Waxholmsbåtarna lägger till." (läst i webbläsare (Redaktören) 2026-11-02)
-- FÖRE: 'Gruvbryggan är Waxholmsbolagets brygga på Utö, där båtarna på linje 21 från Årsta brygga lägger till. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.'
update restaurants set description = 'Gruvbryggan är den mest trafikerade av Waxholmsbolagets bryggor på Utö i Haninge kommun, och här lägger båtarna på linje 21 från Årsta brygga till. Längre söderut angör båtarna också Näsudden och Spränga. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.', updated_at = now() where slug = 'gruvbryggan' and description = 'Gruvbryggan är Waxholmsbolagets brygga på Utö, där båtarna på linje 21 från Årsta brygga lägger till. Bryggan ligger i norra delen av Utö gästhamn, där också sjömacken finns.';

-- lilla-haket-ninas-bod.description — uto-0405 (OBELAGD: "kafé" bara i OpenStreetMap); namnet och typen: uto.tom.md
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?lat=58.9698715&lon=18.3247173&format=jsonv2&zoom=18&addressdetails=1&accept-language=sv — ""road":"Bygatan","hamlet":"Gruvbyn","municipality":"Haninge kommun"" (läst 2026-10-29)
-- FÖRE: 'Lilla Haket & Ninas Bod är ett kafé i Gruvbyn på Utö, Haninge kommun.'
update restaurants set description = 'Lilla Haket & Ninas Bod ligger vid Bygatan i Gruvbyn på Utö, Haninge kommun.', updated_at = now() where slug = 'lilla-haket-ninas-bod' and description = 'Lilla Haket & Ninas Bod är ett kafé i Gruvbyn på Utö, Haninge kommun.';

-- bakgarden-uto.description — uto-0420, uto-0421, uto-0422 (OBELAGD: källan explorearchipelago.com omdirigerar till skargardsstiftelsen.se); namnet: uto.tom.md
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?lat=58.9699&lon=18.3255&format=jsonv2&zoom=18&addressdetails=1&accept-language=sv — ""hamlet":"Gruvbyn","municipality":"Haninge kommun"" (läst 2026-10-29)
-- KÄLLA: https://skargardsstiftelsen.se/app/uploads/2024/07/Uto-Skargardsstiftelsen-20240724.pdf — "Här i Gruvbyn finns turistbyrå, gästhamn, bensinmack, livsmedel, bageri, cykeluthyrning, restauranger och shopping." (läst 2026-10-29)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Det går också att köpa nybakat bröd från bageriet." (läst 2026-10-29)
-- FÖRE: 'Bakgården på Bygatan på Utö är ett bageri som säljer bröd och bakverk. Under sommaren finns också ett kafé.'
update restaurants set description = 'Bakgården Utö ligger i Gruvbyn på Utö, Haninge kommun. I Gruvbyn finns ett bageri där det går att köpa nybakat bröd.', updated_at = now() where slug = 'bakgarden-uto' and description = 'Bakgården på Bygatan på Utö är ett bageri som säljer bröd och bakverk. Under sommaren finns också ett kafé.';

-- uto-gasthamn-sjomack.description — uto-0456 (KORREKT men öppettid "dygnet runt", ARBETSREGLER: inga öppettider)
-- KÄLLA: https://www.utogasthamn.se/gasthamnen/ — "I den norra hamnen finns sjömacken och det är också där de reguljära Waxholmsbåtarna lägger till." (läst 2026-10-29)
-- KÄLLA: https://www.brygganscafe.se/ — "UTÖ SJÖMACK" (läst 2026-10-29)
-- KÄLLA: https://www.brygganscafe.se/ — "Tanka dygnet runt" (läst 2026-10-29)
-- KÄLLA: https://www.brygganscafe.se/ — "Mopeduthyrning" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?lat=58.9702425&lon=18.3246747&format=jsonv2&zoom=18&addressdetails=1&accept-language=sv — ""hamlet":"Gruvbyn","municipality":"Haninge kommun"" (läst 2026-10-29)
-- FÖRE: 'Utö Sjömack har tankning dygnet runt och mopeduthyrning.'
update restaurants set description = 'Utö Sjömack är sjömacken i norra delen av Utö gästhamn i Gruvbyn på Utö, Haninge kommun. Här går det att tanka båten och hyra moped.', updated_at = now() where slug = 'uto-gasthamn-sjomack' and description = 'Utö Sjömack har tankning dygnet runt och mopeduthyrning.';

-- uto-vardshus.description — uto-0528, uto-0529 (OBELAGD 80 rum/200 bäddar), uto-0530 (FEL: 14 mötesrum, inte 12)
-- KÄLLA: https://skargardsstiftelsen.se/omraden/uto/ — "Utö Värdshus, som har öppet året runt, erbjuder både restaurang, hotell och konferens" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?lat=58.967417&lon=18.329336&format=jsonv2&zoom=18&addressdetails=1&accept-language=sv — ""hamlet":"Gruvbyn","municipality":"Haninge kommun"" (läst 2026-10-29)
-- KÄLLA: https://www.utovardshus.se/boende/ — "Kvarnvillan är vår nyaste hotellbyggnad med 8 dubbelrum" (läst 2026-10-29)
-- KÄLLA: https://www.utovardshus.se/boende/ — "Stenhotellet ligger på Krögartäppan precis nedanför Societetshuset och Värdshuset." (läst 2026-10-29)
-- KÄLLA: https://www.utovardshus.se/boende/ — "Våra faluröda hotellstugor ligger i sluttningen ner mot hamnen." (läst 2026-10-29)
-- KÄLLA: https://www.utovardshus.se/konferens/ — "14 mötesrum" (läst 2026-10-29)
-- KÄLLA: https://www.utovardshus.se/konferens/ — "2-100 personer" (läst 2026-10-29)
-- KÄLLA: https://www.utovardshus.se/bakfickan/ — "Följ Utö Värdshus och Bakfickan på Facebook och Instagram" (läst 2026-10-29)
-- FÖRE: 'Utö Värdshus är hotell, restaurang och konferensanläggning på Utö, med 80 rum och hotellstugor (200 bäddar) och 12 mötesrum. Till värdshuset hör också Seglarbaren och Bakfickan.'
update restaurants set description = 'Utö Värdshus är hotell, restaurang och konferensanläggning i Gruvbyn på Utö, Haninge kommun. Hotellrummen finns i Kvarnvillan, Stenhotellet och hotellstugorna, och för konferenser finns 14 mötesrum för grupper på 2–100 personer. Till värdshuset hör också Seglarbaren och Bakfickan.', updated_at = now() where slug = 'uto-vardshus' and description = 'Utö Värdshus är hotell, restaurang och konferensanläggning på Utö, med 80 rum och hotellstugor (200 bäddar) och 12 mötesrum. Till värdshuset hör också Seglarbaren och Bakfickan.';

-- bryggans-lilla-kok-uto.name — uto-0408 (FEL: verksamhetens egen sajt heter "Bryggans café och bar")
-- KÄLLA: https://www.brygganscafe.se/ — "Bryggans café och bar" (läst 2026-10-29)
-- FÖRE: 'Bryggans lilla kök'
update restaurants set name = 'Bryggans café och bar', updated_at = now() where slug = 'bryggans-lilla-kok-uto' and name = 'Bryggans lilla kök';

-- stf-vandrarhem-uto.name — uto-0545 (DELVIS: verksamheten heter "Utö Vandrarhem Skärgården")
-- KÄLLA: https://www.utovardshus.se/boende/vandrarhemmet/ — "Utö Vandrarhem Skärgården" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?lat=58.9681232&lon=18.3263577&format=jsonv2&zoom=18&addressdetails=1&accept-language=sv — ""tourism":"Utö Vandrarhem Skärgården","road":"Prästbacken","hamlet":"Gruvbyn"" (läst 2026-10-29)
-- FÖRE: 'Utö Vandrarhem'
update restaurants set name = 'Utö Vandrarhem Skärgården', updated_at = now() where slug = 'stf-vandrarhem-uto' and name = 'Utö Vandrarhem';

-- ===== Omarbete runda 4 (2026-11-09, Granskaren och Skribenten) =====

-- gruvbryggan.latitude/.longitude — uto-0446 (FEL, MÄTT: nålen stod vid Krögarbryggan, 102 m väster om OpenStreetMaps Gruvbryggan)
-- FÖRE: 58.9703736, 18.3234346 (11 m från Krögarbryggan, OSM way 511905313)
-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/uto — "Vi angör flera bryggor på Utö. Den mest trafikerade är Gruvbryggan, men lite längre söderut ligger även Näsudden och Spränga." (läst 2026-11-09), läst i Chromium
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/269395949 — "Gruvbryggan", "ferry_terminal", "stop_position" (läst 2026-11-09); uppmätt: nodens läge 58.9704915, 18.3251962 ligger 102 m från den gamla nålen och 9 m från plattformen Gruvbryggan (node 14075355623). Varken Waxholmsbolaget eller gästhamnen anger någon koordinat för bryggan.
update restaurants set latitude = 58.9704915, longitude = 18.3251962, updated_at = now() where slug = 'gruvbryggan' and round(latitude::numeric, 7) = 58.9703736 and round(longitude::numeric, 7) = 18.3234346;

-- bryggans-lilla-kok-uto.latitude/.longitude — uto-0411 (FEL, MÄTT: nålen stod på OpenStreetMaps nod för Lilla Haket & Ninas Bod)
-- FÖRE: 58.96988, 18.324775 (0,0 m från node 12915366457, Lilla Haket & Ninas Bod)
-- KÄLLA: https://www.brygganscafe.se/kontakt — "Ademic AB", "Gruvbryggan", "130 56 Utö" (läst 2026-11-09)
-- KÄLLA: https://www.brygganscafe.se/ — "Bryggans café och bar", "Servering mitt bland gästande båtar och skärgårdsliv" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/1395293068/full — "Bryggans lilla kök", "www.brygganscafe.se" (läst 2026-11-09); uppmätt: byggnadens punkt 58.9703328, 18.3274586 (fyra hörnpunkter) ligger 162 m från den gamla nålen och 11 m innanför Utös strandlinje (relation 6315443). Byggnaden har samma webbplats som posten.
update restaurants set latitude = 58.9703328, longitude = 18.3274586, updated_at = now() where slug = 'bryggans-lilla-kok-uto' and round(latitude::numeric, 7) = 58.96988 and round(longitude::numeric, 7) = 18.324775;

-- uto-gasthamn-sjomack.latitude/.longitude — uto-0454 (FEL, MÄTT: nålen var samma punkt som Hamnboden)
-- FÖRE: 58.9702425, 18.3246747 (samma punkt som hamnboden-uto, 4 m från OpenStreetMaps kafé Hamnboden, node 424073481)
-- KÄLLA: https://www.brygganscafe.se/ut%C3%B6%20sj%C3%B6mack — "UTÖ SJÖMACK", "mopeduthyrning" (läst 2026-11-09)
-- KÄLLA: https://www.brygganscafe.se/kontakt — "Gruvbryggan", "130 56 Utö" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/1395284190/full — "Cirkel K sjömack", "fuel" (läst 2026-11-09); uppmätt: tankställets punkt 58.9706315, 18.3272322 (fyra hörnpunkter) ligger 153 m från den gamla nålen och 36 m från Bryggans café och bar (way 1395293068). Punkten ligger på bryggan, 19 m utanför Utös strandlinje.
update restaurants set latitude = 58.9706315, longitude = 18.3272322, updated_at = now() where slug = 'uto-gasthamn-sjomack' and round(latitude::numeric, 7) = 58.9702425 and round(longitude::numeric, 7) = 18.3246747;

-- bakgarden-uto.latitude/.longitude — uto-0419 (FEL, MÄTT: nålen låg i gästhamnen, och inget OSM-objekt med namnet fanns nära). Toms beslut 5: posten står kvar.
-- FÖRE: 58.9699, 18.3255 (inne i marinan Utö gästhamn, way 258778160)
-- KÄLLA: https://www.uto.se/bageri/ — "UTÖ BAKGÅRD", "Bygatan, Utö" (läst 2026-11-09); uto.se är öns gemensamma webbplats för medlemsföretagen (nivå 3). Bageriets egen adress utobakgard.se, som sidan länkar till, visar i dag en spelsajt och belägger inget.
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "Det går också att köpa nybakat bröd från bageriet." (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/229110288/full — "Utö Bakgård", "bakery" (läst 2026-11-09); uppmätt: byggnadens punkt 58.9694382, 18.3225705 (sex hörnpunkter) ligger 176 m från den gamla nålen, byggnadens närmaste hörn 4 m från Bygatan (way 511905315), och punkten 29 m innanför Utös strandlinje (relation 6315443).
update restaurants set latitude = 58.9694382, longitude = 18.3225705, updated_at = now() where slug = 'bakgarden-uto' and round(latitude::numeric, 7) = 58.9699 and round(longitude::numeric, 7) = 18.3255;

-- bakgarden-uto.island — uto-0417 (KÄLLA ny: mätning i stället för omvänd geokodning). Ingen UPDATE: ö-fältet Utö står kvar.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/6315443/full — "Utö", "island" (läst 2026-11-09); uppmätt: den gamla nålen ligger 32 m och den nya 29 m innanför Utös strandlinje.

-- uto-vardshus.island — uto-0523 (KÄLLA ny: mätning). Ingen UPDATE: ö-fältet Utö står kvar.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/6315443/full — "Utö", "island" (läst 2026-11-09); uppmätt: nålen 58.967417, 18.329336 ligger 341 m innanför Utös strandlinje.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/229110282/full — "Utö Värdshus Hotell & Konferens" (läst 2026-11-09); uppmätt: nålen ligger 21 m från byggnadens punkt 58.9673193, 18.3296486.

-- bakfickan-uto.latitude/.longitude — uto-0492 (FEL, MÄTT: nålen låg i Utö gästhamn, 365 m från Bakfickan)
-- FÖRE: 58.97, 18.3265 (inne i marinan Utö gästhamn, way 258778160)
-- KÄLLA: https://www.utovardshus.se/bakfickan/ — "Bakfickan - Utö Värdshus", "Följ Utö Värdshus och Bakfickan på Facebook och Instagram" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/229110257/full — "Bakfickan", "bar", "www.utovardshus.se/bakfickan/" (läst 2026-11-09); uppmätt: byggnadens punkt 58.967438, 18.3304686 (fem hörnpunkter) ligger 365 m från den gamla nålen och 49 m från Utö Värdshus (way 229110282).
update restaurants set latitude = 58.967438, longitude = 18.3304686, updated_at = now() where slug = 'bakfickan-uto' and round(latitude::numeric, 7) = 58.97 and round(longitude::numeric, 7) = 18.3265;

-- stf-vandrarhem-uto.description — uto-0551, uto-0552 (FEL: att huset är grosshandlare Levins badhotell från förra sekelskiftet är husets historia och hade bara verksamhetens egen sida som källa), uto-N031 (ny uppgift), uto-0545 (namnet, satsen ovan)
-- KÄLLA: https://www.utovardshus.se/boende/vandrarhemmet/ — "I backen upp mot Utö Värdshus ligger Utö Vandrarhem Skärgården som håller öppet under sommarhalvåret (april-oktober).", "Vandrarhemmet är i tre plan och har 73 bäddar", "gemensamt kök för självhushåll", "Tillgång till gemensam dusch samt wc i korridor", "Husdjur är tyvärr inte tillåtet att ta med i detta boende.", "In- och utcheckning sker i receptionen uppe på Utö Värdshus." (läst 2026-11-09), läst i Chromium
-- KÄLLA: https://www.haninge.se/48f8f0/contentassets/a0ac2055bd474a83a51e4fbe339913fe/uto6201016-tillganglig.pdf — "Hotell skärgården", "Hotellbyggnad i trä, byggt efter 1878 då Utö planerades till badort och är därmed ett av de första hotellen från denna tid.", "Byggnaden är tre våningar hög", "Byggnaden inrymmer idag vandrarhem." (läst 2026-11-09); texten står under Gruvbyns bebyggelse i Haninge kommuns kulturmiljöinventering för Utö och Ålö.
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "I Gruvbyn, där båtarna från Årsta brygga lägger till finns bland annat gästhamn, affär, värdshus, kajak- och cykeluthyrning, konferensanläggning och vandrarhem." (läst 2026-11-09)
-- FÖRE: 'Utö Vandrarhem ligger i backen upp mot Utö Värdshus, i grosshandlare Levins badhotell från förra sekelskiftet. Det har öppet april–oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.'
update restaurants set description = 'Utö Vandrarhem Skärgården är ett vandrarhem i Gruvbyn på Utö i Haninge kommun, i backen upp mot Utö Värdshus. Huset är en hotellbyggnad i trä i tre våningar, som enligt Haninge kommuns kulturmiljöinventering byggdes efter 1878, när Utö planerades som badort, och är ett av de första hotellen från den tiden. Vandrarhemmet har öppet april–oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.', updated_at = now() where slug = 'stf-vandrarhem-uto' and description = 'Utö Vandrarhem ligger i backen upp mot Utö Värdshus, i grosshandlare Levins badhotell från förra sekelskiftet. Det har öppet april–oktober och har 73 bäddar, gemensamma kök för självhushåll och dusch och wc i korridoren. Husdjur är inte tillåtna, och man checkar in i värdshusets reception.';

-- rano-brygga → Rånökällan (Toms beslut 5, 2026-11-08: Rånö Brygga görs om till Restaurang Rånökällan med egen källa, belagd text och uppmätt nål)
-- uto-0559 (namn), uto-0561 (typ restaurant står kvar), uto-0560 (ö-fältet Rånö står kvar), uto-0562 (nål), uto-N026–uto-N030 (text och webbplats).
-- Namnet: restaurangen kallar sig Rånökällan; Länsstyrelsen skriver "Restaurang Rånökällan". Rånö Brygga är bolaget som driver den (rano.se).
-- KÄLLA: https://rano.se/krog/ — "Rånökällan", "God Mat", "Kylda drycker", "Glass", "Färskt bröd", "till ännu en sommar på vår veranda.", "Vi har öppet sista dagen för säsongen lördagen den 8/8.", "Stängt för säsongen.", "Välkomna tillbaka juni 2027." (läst 2026-11-09)
-- KÄLLA: https://rano.se/ — "Här hittar du vår stugby med bastu, skärgårdshandeln Rånö Livs och Rånökällan med servering.", "Vid Ernviken nära Vaxholmsbåten finner ni Rånö Livs, vår välsorterade livsmedelsbutik.", "På Rånökällan njuter du av god mat och kalla drycker på vår uteservering med utsikt över Ernviken.", "© 2026 Rånö Brygga" (läst 2026-11-09)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/alo-rano.html — "Restaurang Rånökällan samt Båtshaket.", "Kommun: Haninge", "Ålö har broförbindelse med Utö medan Rånö nås med reguljär Waxholmsbåt." (läst 2026-11-09), läst i Chromium
-- KÄLLA: https://skargardsstiftelsen.se/karta-alo-och-rano-skargardsstiftelsen/ — "Rånökällan och Livs", "Rånökällan Restaurang och Bar." (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/3053395678 — "Rånö Källan Pub & Café", "restaurant", "rano.se/krog/" (läst 2026-11-09); uppmätt: nodens läge 58.9197616, 18.1763804 ligger på Rånö, 101 m innanför strandlinjen (relation 11678328), 17 m från Rånö Livs (node 1392325247) och 108 m från färjeläget Rånö (node 424093156). Den gamla nålen låg i vattnet, 7 m från stranden och 117 m från den nya punkten.
-- FÖRE: name 'Rånö Brygga', description null, website null, latitude 58.919054, longitude 18.177884
update restaurants set name = 'Rånökällan', updated_at = now() where slug = 'rano-brygga' and name = 'Rånö Brygga';
update restaurants set description = 'Rånökällan är en restaurang på Rånö i Haninge kommun, med uteservering och veranda med utsikt över Ernviken. Den ligger intill livsmedelsbutiken Rånö Livs vid Ernviken, nära Waxholmsbåtens brygga, och drivs av Rånö Brygga, som också har stugbyn på ön. Restaurangen serverar mat, kylda drycker, glass och färskt bröd. Enligt restaurangen var sista dagen för säsongen lördagen den 8 augusti, och den öppnar igen i juni 2027.', updated_at = now() where slug = 'rano-brygga' and description is null;
update restaurants set website = 'https://rano.se/krog/', updated_at = now() where slug = 'rano-brygga' and website is null;
update restaurants set latitude = 58.9197616, longitude = 18.1763804, updated_at = now() where slug = 'rano-brygga' and round(latitude::numeric, 7) = 58.919054 and round(longitude::numeric, 7) = 18.177884;

-- uto-camping-och-stugor.type — uto-0534 (FEL: platsen är en camping, inte ett hotell) och Toms beslut 4 (2026-11-08): typen camping läggs till för Utö camping.
-- KÖR SATSEN FÖRST NÄR KODEN STÖDER TYPEN camping (mallarnas runda 5). Kolumnen type är text utan CHECK-villkor (SELECT 2026-11-09), så satsen går att köra redan nu, men då syns platsen inte på /boende förrän koden känner typen.
-- KÄLLA: https://www.utogasthamn.se/camping/ — "Campingen är av så kallad friluftsmodell och har inga numrerade platser", "På campingen finns en servicestuga med toaletter, duschar och ett enklare kök." (läst 2026-11-09), läst i Chromium
-- FÖRE: 'hotel'
update restaurants set type = 'camping', updated_at = now() where slug = 'uto-camping-och-stugor' and type = 'hotel';

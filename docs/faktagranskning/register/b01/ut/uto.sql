-- Faktagranskning batch 01, Utö. Granskare/Skribent 2026-10-29.
-- Kör inte blint: varje UPDATE skriver bara om texten är exakt den som granskades (WHERE ... and <kolumn> = <gammal text>).
-- Dagens text hämtad med SELECT mot projektet oiklttwylndesewauytj 2026-10-29. Inga rader raderas eller döljs.

-- uto-bykrog.description — uto-0397, uto-0399 (OBELAGD: källan explorearchipelago.com omdirigerar till skargardsstiftelsen.se)
-- KÄLLA: https://xn--utbykrogen-fcb.se/ — "Utö by Krog — Skärgårdsrestaurang på Utö" (läst 2026-10-29)
-- KÄLLA: https://xn--utbykrogen-fcb.se/kontakt — "Edesnäs Gård 3, Utö, Stockholms skärgård" (läst 2026-10-29)
-- KÄLLA: https://xn--utbykrogen-fcb.se/kontakt — "Vill du boka bord eller fråga om catering?" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/reverse?lat=58.9546699&lon=18.2827434&format=jsonv2&zoom=17&addressdetails=1&accept-language=sv — ""hamlet":"Edesnäs","municipality":"Haninge kommun"" (läst 2026-10-29)
-- FÖRE: 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.'
update restaurants set description = 'Utö Bykrog är en restaurang i Edesnäs på Utö i Haninge kommun. Adressen är Edesnäs Gård 3, och restaurangen tar emot bordsbokningar och förfrågningar om catering.', updated_at = now() where slug = 'uto-bykrog' and description = 'Utö Bykrog är en sommaröppen restaurang i Edesnäs på Utö, vid vägen mellan Gruvbyn och Ålö. Adressen är Edesnäs Gård 3.';

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

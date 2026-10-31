-- Faktagranskning batch 01 – Grinda (Granskare/Skribent, 2026-10-29/31).
-- Körs av huvudsessionen. Bara UPDATE. Varje sats skriver över exakt det granskade värdet (gamla värdet i WHERE).
-- Gamla värden kommer från SELECT mot restaurants 2026-10-29 (text och koordinater, md5 i registret).
-- OBS: WHERE-villkoren är INTE kontrollerade mot databasen efteråt – databasen var pausad 2026-10-31.
-- Kör först:  select slug, type, latitude, longitude, description from restaurants where slug in ('grinda-sjomack','framfickan-grinda','grinda-lanthandel-cafe','grinda-wardshus','hemmesta-sjocafe');
-- och kontrollera att varje sats träffar en rad (UPDATE ... RETURNING slug).

-- restaurants.grinda-sjomack.description (grinda-0438; klockslag strider mot ARBETSREGLER; första meningen enligt SEO-regeln)
-- FÖRE: 'Grinda Sjömack ligger i direkt anslutning till gästhamnen och säljer bensin 98, diesel och gasol. Macken har kortautomat och är öppen året om, utom mellan kl. 22 och 05. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'
-- KÄLLA: https://grinda.se/hamn-mack/sjomack/ — "Vår sjömack har öppet året om"; "i direkt anslutning till vår gästhamn"; "Bensin 98, Diesel, Gasol"; "Sjömacken är öppen året om då den är utrustad med kortautomat dom tider som macken är obemannad dock stängd mellan 22.00 – 05.00"; "enklare tillbehör till båtar och motorer & kioskvaror hittar du i vårt Aktivitetshus som ligger precis i anslutning till bryggan / macken." (läst 2026-10-29)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Kommun: Värmdö" (läst 2026-10-29)
update restaurants set description = 'Grinda Sjömack är en sjömack i direkt anslutning till gästhamnen på Grinda i Värmdö kommun och säljer bensin 98, diesel och gasol. Macken har kortautomat för de tider den är obemannad och är öppen året om, utom nattetid. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'
 where slug = 'grinda-sjomack' and description = 'Grinda Sjömack ligger i direkt anslutning till gästhamnen och säljer bensin 98, diesel och gasol. Macken har kortautomat och är öppen året om, utom mellan kl. 22 och 05. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.';

-- restaurants.framfickan-grinda.type (grinda-0528)
-- FÖRE: 'cafe'
-- KÄLLA: https://grinda.se/mat-fest/framfickan/ — "Framfickan – hamnkrog, pizza & lättare rätter"; "Framfickan har fullständiga rättigheter." (läst 2026-10-29)
-- KÄLLA: https://grinda.se/en/accommodation/ — "Bistro Framfickan" (läst 2026-10-29)
-- KÄLLA: https://www.openstreetmap.org/node/863394727 — "amenity=restaurant"; "name=Framfickan" (läst 2026-10-29)
update restaurants set type = 'restaurant'
 where slug = 'framfickan-grinda' and type = 'cafe';

-- restaurants.grinda-lanthandel-cafe.latitude/longitude (grinda-0568)
-- FÖRE: latitude 59.4128, longitude 18.5576 – på ön men 97 m sydväst om butiksbyggnaden, nere vid badstranden
-- KÄLLA: https://www.openstreetmap.org/way/247542038 — "name=Grinda Lanthandel & Café"; "mittpunkt 59.4130702, 18.5592303" (byggnadens mittpunkt, uppmätt i OpenStreetMaps API 2026-10-29) (läst 2026-10-29)
update restaurants set latitude = 59.4130702, longitude = 18.5592303
 where slug = 'grinda-lanthandel-cafe' and latitude = 59.4128 and longitude = 18.5576;

-- restaurants.grinda-wardshus.description (grinda-0587; "vid Södra bryggan" är postadressen, inte läget; första meningen enligt SEO-regeln)
-- FÖRE: 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.'
-- KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Mitt på ön ligger Grinda Wärdshus"; "Grinda Wärdshus har restaurang, hotellrum och vandrarhem"; "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet på öns södra sida." (läst 2026-10-29)
-- KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Till hotellet och Wärdshuset är det ungefär lika nära från Södra Bryggan som från Norra bryggan, en knapp kilometers promenad (15 min)."; "Med egen båt, taxi eller charterbåt anlöper du Grindas gästhamn som ligger i anslutning till Wärdshuset/hotellet."; "Det anrika Grinda Wärdshus erbjuder vällagad klassisk skärgårdsmat." (läst 2026-10-29)
-- KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "Det anrika huset har blickat ut över Saxarfjärden sedan 1906" (läst 2026-10-29)
-- KÄLLA: https://grinda.se/hamn-mack/gasthamn/ — "Som övernattande gäst har du tillgång till el, dusch, toalett och hushållssop- och septitank-tömning." (läst 2026-10-29)
-- KÄLLA: https://grinda.se/hamn-mack/sjomack/ — "Bensin 98, Diesel, Gasol" (läst 2026-10-29)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Kommun: Värmdö" (läst 2026-10-29)
update restaurants set description = 'Grinda Wärdshus är en restaurang med hotell mitt på Grinda i Värmdö kommun, en knapp kilometers promenad från både Södra och Norra bryggan. Huset har blickat ut över Saxarfjärden sedan 1906, och köket serverar klassisk skärgårdsmat. I anslutning till wärdshuset ligger gästhamnen i Hemviken med el, dusch och toalett, och sjömacken säljer bensin 98, diesel och gasol.'
 where slug = 'grinda-wardshus' and description = 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.';

-- restaurants.hemmesta-sjocafe.type (grinda-0610)
-- FÖRE: 'restaurant'
-- KÄLLA: https://visitvarmdo.se/utbud/cafe-sjostugan/ — "I hjärtat av skärgården, vid Lillsved på Norra Värmdö ligger idylliska Cafe Sjöstugan." (Visit Värmdö, nivå 3; kaféets egen webbplats cafesjostugan.se visar ingen text) (läst 2026-10-29)
-- KÄLLA: https://www.openstreetmap.org/way/361356371 — "amenity=cafe"; "name=Café Sjöstugan" (läst 2026-10-29)
update restaurants set type = 'cafe'
 where slug = 'hemmesta-sjocafe' and type = 'restaurant';

-- restaurants.hemmesta-sjocafe.latitude/longitude (grinda-0612)
-- FÖRE: latitude 59.41017, longitude 18.49936 – OSM:s ortnamnspunkt Lillsved, 334 m från kaféets byggnad
-- KÄLLA: https://www.openstreetmap.org/way/361356371 — "name=Café Sjöstugan"; "addr:street=Lillsvedsvägen"; "mittpunkt 59.4127412, 18.4963563" (byggnadens mittpunkt, uppmätt i OpenStreetMaps API 2026-10-29) (läst 2026-10-29)
-- KÄLLA: https://www.openstreetmap.org/node/260121705 — "name=Lillsved; place=hamlet" (nålens nuvarande läge) (läst 2026-10-29)
update restaurants set latitude = 59.4127412, longitude = 18.4963563
 where slug = 'hemmesta-sjocafe' and latitude = 59.41017 and longitude = 18.49936;

-- restaurants.grinda-sodra-bryggan.description (grinda-0421, P0: Cinderella går inte 28 sep 2026–april 2027; även grinda-0417–0426)
-- FÖRE: 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; "Södra Grinda" (läst 2026-10-29)
-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-10-29)
-- KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN"; "Södra Grinda"; perioderna "30/4 - 4/6" till "7/9 - 27/9" (läst 2026-10-29)
-- KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/grinda/ — "Åter april 2027" (läst 2026-10-29)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen."; "Torrdass finns vid alla badplatser och vid södra ångbåtsbryggan och i Källviken finns anpassade ingångar till badet."; "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet." (läst 2026-10-29)
update restaurants set description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras året om av Waxholmsbolaget, och under säsong angör även Strömmas Cinderellabåt Södra Grinda; 2026 gick den 30 april–27 september. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'
 where slug = 'grinda-sodra-bryggan' and description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.';

-- restaurants.grinda-norra-bryggan.description (grinda-0449, P0: Cinderella angör inte Norra Grinda; även grinda-0446–0453)
-- FÖRE: 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.'
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; "Norra Grinda" (läst 2026-10-29)
-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-10-29)
-- KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN"; "Södra Grinda" (Norra Grinda finns inte i tabellen) (läst 2026-10-29)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Tältning är endast tillåten på tältplatsen nära norra bryggan."; "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet." (läst 2026-10-29)
update restaurants set description = 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.'
 where slug = 'grinda-norra-bryggan' and description = 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.';

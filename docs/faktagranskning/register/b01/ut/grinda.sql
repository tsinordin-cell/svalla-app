-- Faktagranskning batch 01 – Grinda (Granskare/Skribent, 2026-10-29/31).
-- Körs av huvudsessionen. Bara UPDATE. Varje sats skriver över exakt det granskade värdet (gamla värdet i WHERE).
-- Gamla värden kommer från SELECT mot restaurants 2026-10-29 (text och koordinater, md5 i registret).
-- OBS: WHERE-villkoren är INTE kontrollerade mot databasen efteråt – databasen var pausad 2026-10-31.
-- Omarbete runda 4 (2026-11-08): SELECT mot restaurants 2026-11-08 (bara SELECT, inget kört). Satserna för grinda-sjomack, framfickan-grinda,
--   grinda-lanthandel-cafe, grinda-wardshus och hemmesta-sjocafe träffar var sin rad (gamla värdena står kvar i databasen); bryggornas två satser
--   är redan körda 2026-11-03 och träffar 0 rader. Ändrat i runda 4: kommentarerna för sjömacken och Café Sjöstugan (lästa igen) och
--   wärdshusets nya text (årtal från Länsstyrelsen, renoveringen).
-- Kör först:  select slug, type, latitude, longitude, description from restaurants where slug in ('grinda-sjomack','framfickan-grinda','grinda-lanthandel-cafe','grinda-wardshus','hemmesta-sjocafe');
-- och kontrollera att varje sats träffar en rad (UPDATE ... RETURNING slug).

-- restaurants.grinda-sjomack.description (grinda-0436, 0437, 0438; klockslag strider mot ARBETSREGLER; första meningen enligt SEO-regeln)
-- Omarbete runda 4 (Kontrollanten full-16 f16-k071, f16-k072; full-06 utanför-3, full-25 utanför-1): texten i databasen och på /o/grinda/hamnar
--   har fortfarande "utom mellan kl. 22 och 05" (SELECT 2026-11-08, md5 dc751f36d307fbe966c8128a68bc9373). Satsen nedan skriver "utom nattetid";
--   sjömackens sida, läst igen 2026-11-08 i Chromium, säger att macken är stängd nattetid (klockslaget står bara i källan, inte i texten).
-- FÖRE: 'Grinda Sjömack ligger i direkt anslutning till gästhamnen och säljer bensin 98, diesel och gasol. Macken har kortautomat och är öppen året om, utom mellan kl. 22 och 05. Enklare båttillbehör och kioskvaror finns i Aktivitetshuset vid bryggan.'
-- KÄLLA: https://grinda.se/hamn-mack/sjomack/ — "Vår sjömack har öppet året om"; "i direkt anslutning till vår gästhamn"; "Bensin 98, Diesel, Gasol"; "Sjömacken är öppen året om då den är utrustad med kortautomat dom tider som macken är obemannad dock stängd mellan 22.00 – 05.00."; "Sjömacken är obemannad men öppen och utrustad med kortautomat."; "enklare tillbehör till båtar och motorer & kioskvaror hittar du i vårt Aktivitetshus som ligger precis i anslutning till bryggan / macken." (läst 2026-11-08, i Chromium)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Kommun: Värmdö" (läst 2026-11-08)
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

-- restaurants.grinda-wardshus.description (grinda-0587 läget, 0588 utsikten, 0589 årtalet, 0590–0597, ny grinda-N017; första meningen enligt SEO-regeln)
-- FÖRE: 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.'
-- Omarbete runda 4 (2026-11-08): "vid Södra bryggan" är bolagets postadress, inte läget (Kontrollanten full-09 utanför-1): läget skrivs som STF anger det.
--   "sedan 1906" är husets historia och belades bara av grinda.se (nivå 2; Kontrollanten full-10 f10-k110). Nivå 1 är Länsstyrelsens beslut om
--   bildande av Grinda naturreservat (26.10.2000), som anger 1907 och arkitekten. grinda.se, STF ("uppfördes 1906") och Skärgårdsstiftelsen
--   (Santesson lät 1906 uppföra villan, "stod klar 1908") belägger inte historia (förtydligande 8); texten följer Länsstyrelsen och anger källan.
--   Startsidan säger nu att wärdshuset renoveras (Kontrollanten full-16 f16-k110); renoveringen och nypremiären står med.
-- KÄLLA: https://skargardsstiftelsen.se/omraden/grinda/ — "Mitt på ön ligger Grinda Wärdshus"; "Grinda Wärdshus har restaurang, hotellrum och vandrarhem"; "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet på öns södra sida." (läst 2026-11-08)
-- KÄLLA: https://www.svenskaturistforeningen.se/boende/stf-grinda-hotell-sea-lodge/ — "Till hotellet och Wärdshuset är det ungefär lika nära från Södra Bryggan som från Norra bryggan, en knapp kilometers promenad (15 min)."; "Med egen båt, taxi eller charterbåt anlöper du Grindas gästhamn som ligger i anslutning till Wärdshuset/hotellet."; "Det anrika Grinda Wärdshus erbjuder vällagad klassisk skärgårdsmat." (läst 2026-11-08)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/map?bbox=18.5400,59.4030,18.5750,59.4230 — uppmätt i OpenStreetMap 2026-11-03: kortaste väg längs vägar och stigar från Södra bryggans nål till Wärdshusets nål 952 m, från Norra bryggans nål 741 m.
-- Källkonflikt löst 2026-11-03 (Redaktörens beslut grinda-k037): Stockholm Archipelago Trail skriver "From Södra Bryggan to Wärdshuset it is about 1500 meters along a gravel road." (https://stockholmarchipelagotrail.com/section/section-grinda/, läst 2026-11-03), STF en knapp kilometer från båda bryggorna. STF driver hotellet intill Wärdshuset (KÄLLREGLER, motstridiga källor 1), och mätningen ovan stöder STF. Texten står kvar.
-- KÄLLA: https://geodata.naturvardsverket.se/handlingar/rest/dokument/280826 — "BESLUT OM BILDANDE AV GRINDA NATURRESERVAT, VÄRMDÖ KOMMUN"; "1907 uppfördes en stor sommarvilla efter ritning av arkitekten Ernst Stenhammar." (Länsstyrelsens beslut 26.10.2000, s. 6; skannad PDF, läst som sidbild) (läst 2026-11-08)
-- KÄLLA: https://grinda.se/mat-fest/wardshuset/ — "en glittrande utsikt över Saxarfjärden" (läst 2026-11-08)
-- KÄLLA: https://grinda.se/ — "Grinda Wärdshus renoveras"; "Det anrika Wärdshuset erbjuder klassisk skärgårdsmat" (läst 2026-11-08)
-- KÄLLA: https://grinda.se/skargardens-hjarta-ska-fa-lite-karlek-tillbaka/ — "Med start i månadsskiftet augusti och september inleder vi tillsammans med"; "Skärgårds-stiftelsen en efterlängtad renovering av Wärdhusets exteriör."; "glans, med omfattande arbeten på både tak och fasad."; "I maj 2027 räknar vi med att kunna avtäcka vår klenod och bjuda in till nypremiär" (läst 2026-11-08)
-- KÄLLA: https://grinda.se/hamn-mack/gasthamn/ — "Som övernattande gäst har du tillgång till el, dusch, toalett och hushållssop- och septitank-tömning." (läst 2026-11-08)
-- KÄLLA: https://grinda.se/hamn-mack/sjomack/ — "Bensin 98, Diesel, Gasol" (läst 2026-11-08)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Kommun: Värmdö" (läst 2026-11-08)
update restaurants set description = 'Grinda Wärdshus är en restaurang med hotell mitt på Grinda i Värmdö kommun, en knapp kilometers promenad från både Södra och Norra bryggan. Wärdshuset ligger i en sommarvilla med utsikt över Saxarfjärden, som enligt Länsstyrelsen uppfördes 1907 efter ritning av arkitekten Ernst Stenhammar, och köket serverar klassisk skärgårdsmat. Från månadsskiftet augusti–september 2026 renoveras husets tak och fasad, och Grinda Wärdshus räknar med nypremiär i maj 2027. I anslutning till wärdshuset ligger gästhamnen i Hemviken med el, dusch och toalett, och sjömacken säljer bensin 98, diesel och gasol.'
 where slug = 'grinda-wardshus' and description = 'Grinda Wärdshus vid Södra bryggan på Grinda ligger i ett hus som har sett ut över Saxarfjärden sedan 1906 och serverar skärgårdsmat. I viken finns gästhamnen med el, dusch och toalett, och sjömacken säljer bensin, diesel och gasol.';

-- restaurants.hemmesta-sjocafe.type (grinda-0610)
-- FÖRE: 'restaurant'
-- KÄLLA: https://visitvarmdo.se/utbud/cafe-sjostugan/ — "I hjärtat av skärgården, vid Lillsved på Norra Värmdö ligger idylliska Cafe Sjöstugan." (Visit Värmdö, nivå 3; kaféets egen webbplats cafesjostugan.se visar ingen text) (läst 2026-10-29)
-- KÄLLA: https://www.openstreetmap.org/way/361356371 — "amenity=cafe"; "name=Café Sjöstugan" (läst 2026-10-29)
update restaurants set type = 'cafe'
 where slug = 'hemmesta-sjocafe' and type = 'restaurant';

-- restaurants.hemmesta-sjocafe.latitude/longitude (grinda-0611, 0612)
-- Omarbete runda 4 (Kontrollanten full-24 f24-k090): nålen står fortfarande på 59.41017, 18.49936 (SELECT 2026-11-08). Uppmätt igen 2026-11-08
--   i OpenStreetMaps API (way 361356371, full): den gamla nålen ligger 338 m från kaféets byggnad; den nya punkten (medelvärdet av byggnadens
--   hörnpunkter) ligger 6 m från byggnadens ytcentroid. Avståndet från Grindas nål (59.4109, 18.5618) blir 3,709 km i stället för 3,534 km;
--   sajten räknar om det själv.
-- FÖRE: latitude 59.41017, longitude 18.49936 – OSM:s ortnamnspunkt Lillsved, 334 m från kaféets byggnad
-- KÄLLA: https://www.openstreetmap.org/way/361356371 — "Sträcka: Café Sjöstugan (361356371)"; "Lillsvedsvägen" — punkten 59.4127412, 18.4963563 är medelvärdet av byggnadens hörnpunkter, uppmätt i OpenStreetMaps API (way 361356371, full) 2026-10-29 och 2026-11-08 (läst 2026-11-08)
-- KÄLLA: https://www.openstreetmap.org/node/260121705 — "name=Lillsved; place=hamlet" (nålens nuvarande läge) (läst 2026-10-29)
update restaurants set latitude = 59.4127412, longitude = 18.4963563
 where slug = 'hemmesta-sjocafe' and latitude = 59.41017 and longitude = 18.49936;

-- restaurants.grinda-sodra-bryggan.description (grinda-0421, P0: Cinderella går inte 28 sep 2026–april 2027; även grinda-0417–0426)
-- FÖRE: 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'
-- Omarbete 2026-11-03 (Kontrollanten grinda-k012, k153): Waxholmsbolaget beläggs med tabell 11 och operatörens egen sida, Cinderella med Strömmas tidtabell. Ingen tabell efter 12 december 2026 är publicerad, så "året om" står som Waxholmsbolagets egen uppgift om Grinda.
-- Omarbete 2026-11-03 (Redaktörens beslut oar-omk, grinda-0420/0421): KÄLLA för "i Grinda naturreservat" (skyddsstatus, nivå 1) tillagd nedan. Texten är redan inlagd: SELECT mot restaurants 2026-11-03 visar den nya beskrivningen (updated_at 2026-11-03 20:39 UTC), så satsen träffar ingen rad om den körs igen. Texten ändras inte.
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda naturreservat med omgivande öar och vatten erbjuder en spännande natur och mycket annat för alla som vill njuta av naturen.", "Skyddsform: naturreservat", "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan." (läst 2026-11-03)
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "11A"; "STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; "Södra Grinda" (läst 2026-11-03)
-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-11-03, i Chromium)
-- KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN"; "Södra Grinda"; perioderna "30/4 - 4/6" till "7/9 - 27/9" (läst 2026-11-03)
-- KÄLLA: https://www.stromma.com/sv-se/stockholm/utflykter/dagsutflykter/grinda/ — "Åter april 2027" (läst 2026-11-03)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Grillplatser finns vid södra ångbåtsbryggan och vid tältplatsen."; "Torrdass finns vid alla badplatser och vid södra ångbåtsbryggan och i Källviken finns anpassade ingångar till badet."; "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet." (läst 2026-10-29)
update restaurants set description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Under säsong angör även Strömmas Cinderellabåt Södra Grinda; 2026 gick den 30 april–27 september. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.'
 where slug = 'grinda-sodra-bryggan' and description = 'Södra ångbåtsbryggan på Grinda, i Grinda naturreservat, trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, grillplatser och torrdass. Gästhamn för fritidsbåtar finns i Hemviken och naturhamn i Hästholmssundet.';

-- restaurants.grinda-norra-bryggan.description (grinda-0449, P0: Cinderella angör inte Norra Grinda; även grinda-0446–0453)
-- FÖRE: 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.'
-- Omarbete 2026-11-03 (Kontrollanten grinda-k154, k021): Cinderella angör bara Södra Grinda (Strömmas tidtabell 2026; operatören vinner över Länsstyrelsens mening). Waxholmsbolaget vid Norra bryggan beläggs med tabell 11; "året om" står som Waxholmsbolagets egen uppgift om Grinda, eftersom ingen tabell efter 12 december 2026 är publicerad.
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h11.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026"; "11A"; "STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA"; "Norra Grinda" (läst 2026-11-03)
-- KÄLLA: https://waxholmsbolaget.se/reseplanering/resmal/grinda — "Under sommaren går det flera turer till Grinda varje dag, men Grinda har trafik året om." (läst 2026-11-03, i Chromium)
-- KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN"; "Södra Grinda" (Norra Grinda finns inte i tabellen) (läst 2026-11-03)
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/grinda.html — "Grinda har fina barnvänliga bad både vid den södra och norra ångbåtsbryggan."; "Tältning är endast tillåten på tältplatsen nära norra bryggan."; "Gästhamn finns i Hemviken och naturhamn i Hästholmssundet." (läst 2026-10-29)
update restaurants set description = 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras av Waxholmsbolaget, som skriver att Grinda har trafik året om. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.'
 where slug = 'grinda-norra-bryggan' and description = 'Norra bryggan är en av Grindas ångbåtsbryggor och trafikeras året om av Waxholmsbolaget och Cinderella. Vid bryggan finns ett barnvänligt bad, och öns tältplats ligger nära norra bryggan. För egen båt finns gästhamn i Hemviken och naturhamn i Hästholmssundet.';

-- Faktagranskningen batch 01, Vaxholm (Granskare/Skribent 2026-10-31).
-- Bara UPDATE. Varje sats skriver över exakt den text som granskats (gamla värdet i WHERE).
-- OBS: databasen (Supabase) var pausad 2026-10-31; de gamla texterna i FÖRE/WHERE är återskapade ur
-- supabase/datafix/*.sql via md5-summorna i in/db-md5.tsv (2026-10-29) och är INTE kontrollerade mot databasen.
-- Träffar en sats 0 rader har texten ändrats sedan dess: kontrollera med SELECT innan den körs om.
-- Läggs in av huvudsessionen. Inga rader raderas eller döljs.

-- restaurants.magasinet-gustavsberg.description (vaxholm-0416, vaxholm-0417, vaxholm-N006)
-- FÖRE: 'Magasinet ligger vid vattnet på Fiskaregatan 1 i Vaxholm.'
-- KÄLLA: https://www.magasinetwaxholm.se/ — "Magasinet i Waxholm, Fiskaregatan 1 , 185 32 Vaxholm", "Idag består Magasinet i Waxholm sav Bistro, Inredningsbutik, festlokal och yogastudio.", "År 1945 köptes huset av herrarna Einar Löfdahl och Svensson, där startade dom en Smedja" (läst 2026-10-31)
-- KÄLLA: https://www.magasinetwaxholm.se/hem/bistro.html — "Vi har nu stängt restaurangen för vintern.", "Öppnar åter våren 2027" (läst 2026-10-31)
-- KÄLLA: https://visitstockholm.com/o/magasinet-i-vaxholm/ — "Magasinet, located on the waterfront in idyllic Vaxholm" (läst 2026-10-31)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.40327&lon=18.35454 — "Ö Vaxön", "Administrativ gräns (nivå 7) Vaxholms kommun" (läst 2026-10-31)
update restaurants set description = 'Magasinet i Waxholm är en bistro vid vattnet på Fiskaregatan 1 i Vaxholm, Vaxholms kommun. I den gamla smedjan finns också inredningsbutik, festlokal och yogastudio. Bistron har stängt för vintern 2026–2027 och öppnar igen våren 2027.' where slug = 'magasinet-gustavsberg' and description = 'Magasinet ligger vid vattnet på Fiskaregatan 1 i Vaxholm.';

-- restaurants.vaxholms-fastning-cafe.island (vaxholm-0420)
-- FÖRE: 'Kastellet'
-- KÄLLA: https://www.sfv.se/vara-fastigheter/sverige/stockholms-lan/fastningar/vaxholms-kastell — "På ön Vaxholmen ett stenkast från skärgårdens huvudstad Vaxholm ligger Vaxholms kastell." (läst 2026-10-31)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.4032&lon=18.3584 — "Fort Vaxholms Kastell", "Kustlinje Vaxholmen" (läst 2026-10-31)
update restaurants set island = 'Vaxholmen' where slug = 'vaxholms-fastning-cafe' and island = 'Kastellet';

-- restaurants.norrhamnen.website (vaxholm-0451)
-- FÖRE: 'https://www.vaxholm.se/'
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser — "Norrhamnen, Fiskaregatan - Norrhamnsplan", "Kommunala småbåtshamnar för privatpersoner" (läst 2026-10-31)
update restaurants set website = 'https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser' where slug = 'norrhamnen' and website = 'https://www.vaxholm.se/';

-- restaurants.norrbergshamnen.website (vaxholm-0459)
-- FÖRE: 'http://www.vaxholm.se/'
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser — "I Norrbergshamnen finns fem gästplatser på utsidan av pontonen." (läst 2026-10-31)
update restaurants set website = 'https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser' where slug = 'norrbergshamnen' and website = 'http://www.vaxholm.se/';

-- restaurants.norrbergshamnen.description (vaxholm-0460, vaxholm-0461, vaxholm-0462, vaxholm-0463, vaxholm-0464, vaxholm-0465, vaxholm-0466, vaxholm-N007)
-- Omarbete 2026-11-03 (Kontrollanten vaxholm-k219): att dusch, toalett och latrintömning saknas i Norrbergshamnen står inte på kommunens sida; texten säger nu bara var de finns.
-- Omarbete 2026-11-03 (Redaktörens beslut oar-omk, vaxholm-0465): läget "vid Badhusgatan och Norrbergsplan" och "kommunala småbåtshamnar" står båda på kommunens sida Kommunala båtplatser (nivå 1), läst i dag; texten ändras inte. WHERE kontrollerat mot databasen med SELECT 2026-11-03.
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser — "I Norrbergshamnen finns fem gästplatser på utsidan av pontonen.", "Gästhamnen drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.", "I gästhamnen finns resturang, kiosk, butiksförsäljning i sjöbodar, dusch, toalett, tvättmaskin, latrintömning samt sophantering med källsortering." (läst 2026-11-03)
-- FÖRE: 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.'
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser — "Kommunala småbåtshamnar för privatpersoner", "Norrbergshamnen, Badhusgatan - Norrbergsplan" (läst 2026-11-03)
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser — "I Norrbergshamnen finns fem gästplatser på utsidan av pontonen.", "Tillfälliga besökare som kommer sjövägen kan nyttja kommunens tidsbestämda platser om max 3 timmar utan avgift.", "Gästhamnen drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.", "I gästhamnen finns resturang, kiosk, butiksförsäljning i sjöbodar, dusch, toalett, tvättmaskin, latrintömning samt sophantering med källsortering." (läst 2026-11-03)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.4062373&lon=18.3494958 — "Marina Norrbergshamnen" (läst 2026-10-31)
update restaurants set description = 'Norrbergshamnen vid Badhusgatan och Norrbergsplan är en av Vaxholms stads kommunala småbåtshamnar i Vaxholm. Här finns fem gästplatser på utsidan av pontonen, och tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Dusch, toalett och latrintömning finns i Vaxholms gästhamn, en egen anläggning som drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.' where slug = 'norrbergshamnen' and description = 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.';

-- restaurants.blynasvikens-batklubb.description (vaxholm-0489, vaxholm-0490, vaxholm-0491, vaxholm-0492, vaxholm-0493, vaxholm-0494)
-- FÖRE: 'Blynäsvikens Båtklubbs klubbhamn har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting. Vid nytillträde gäller båtar upp till 12 m/4 m/8000 kg med ett djupgående på högst 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.'
-- KÄLLA: https://bbk-vaxholm.se/wp/information-om-hamnen/ — "Gula siffror på bilden ovan anger bryggnummer.", "endast ske vid kranbryggan", "Samtliga bojar förankras till bojsten med galvaniserad kätting med en minimidiameter av 10 mm eller med av styrelsen godkänd mooringslina." (läst 2026-10-31)
-- KÄLLA: https://bbk-vaxholm.se/wp/information-om-hamnen/ — "har styrelsen fattat beslut om att inte erbjuda båtplats till båtar som överstiger följande L/B/vikt. 12 m/4m/8000kg, båtens djupgående får ej överstiga 2,20 m.", "Endast BBK-medlemmar kan i mån av utrymme erhålla gästplats för längre eller kortare tid." (läst 2026-10-31)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.4070569&lon=18.3194783 — "Ö Vaxön", "Marina Blynäsvikens båtklubb", "Bukt Blynäsviken" (läst 2026-10-31)
update restaurants set description = 'Blynäsvikens Båtklubbs klubbhamn i Blynäsviken på Vaxön i Vaxholm har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting eller godkänd mooringslina. Klubben erbjuder inte båtplats till båtar som överstiger 12 m/4 m/8000 kg eller har ett djupgående över 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.' where slug = 'blynasvikens-batklubb' and description = 'Blynäsvikens Båtklubbs klubbhamn har numrerade bryggor, en kranbrygga och bojplatser förankrade med kätting. Vid nytillträde gäller båtar upp till 12 m/4 m/8000 kg med ett djupgående på högst 2,20 m. Endast BBK-medlemmar kan i mån av utrymme få gästplats.';

-- restaurants.resaro-marina.description (vaxholm-0513, vaxholm-0514, vaxholm-0515, vaxholm-0516, vaxholm-0517)
-- FÖRE: 'Resarö Marina ligger strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom, el och vatten på samtliga platser, och båtarna får vara högst cirka 33 fot.'
-- KÄLLA: https://resaromarina.se/ — "Resarö Marina ligger strax utanför Vaxholm", "Här möts farlederna in till Stockholm och här är havsbandet inom räckhåll.", "Anläggningen är med pontoner i helbetong med y-bom på samtliga platser och med el och vatten.", "Max storlek på båt är ca 33 fot." (läst 2026-10-31)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.4262909&lon=18.3413135 — "Ö Resarö" (läst 2026-10-31)
update restaurants set description = 'Resarö Marina ligger på Resarö strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom på samtliga platser samt el och vatten, och båtarna får vara högst cirka 33 fot.' where slug = 'resaro-marina' and description = 'Resarö Marina ligger strax utanför Vaxholm, där farlederna in till Stockholm möts. Anläggningen har pontoner i helbetong med y-bom, el och vatten på samtliga platser, och båtarna får vara högst cirka 33 fot.';

-- restaurants.resaro-batklubb.description (vaxholm-0504 STRYK+KOMPENSERA, vaxholm-N008)
-- Omarbete 2026-11-03 (Kontrollanten vaxholm-k123): stenar i farvattnet är en djup- och säkerhetsuppgift som bara Sjöfartsverket får belägga; båtklubbens sida räcker inte. Meningen stryks och texten kompenseras med klubbens egen uppgift om föreningen och hamnarna.
-- Dagens text: supabase/datafix/2026-09-22-hamnar-beskrivningar-block3.sql (datafix-kallor.tsv, matchat med md5 2026-10-29). Databasen är pausad, så WHERE är inte kontrollerat mot den.
-- KÄLLA: https://sites.google.com/resarobatklubb.se/hemsida/v%C3%A5ra-hamnar/dasda — "Ytterbygårds bryggor ligger på Ytterby, på södra Resarö, strax efter Resarö Marina på Sjöviksvägen.", "Du har Tallholmen rakt söderut när du närmar dig hamnen.", "Antal båtplatser:", "120", "Sjösättningsramp, färskvatten, el, förrådscontainer, grillplats" (läst 2026-11-03)
-- KÄLLA: https://www.resarobatklubb.se/ — "Resarö Båtklubb, bildad 1972 och med hemort på Resarö i Vaxholm, är en allmännyttig ideell förening", "i de 4 hamnarna finns totalt 236 båtplatser" (läst 2026-11-03)
-- FÖRE: 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut, och det finns ett par stenar att se upp för mellan Marieskäret och Resarö Marina. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats.'
update restaurants set description = 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats. Bryggorna hör till Resarö Båtklubb, en ideell förening bildad 1972 med hemort på Resarö, som har 236 båtplatser i sina fyra hamnar.' where slug = 'resaro-batklubb' and description = 'Ytterbygårds bryggor ligger på Ytterby på södra Resarö, strax efter Resarö Marina på Sjöviksvägen. Vid inseglingen har man Tallholmen rakt söderut, och det finns ett par stenar att se upp för mellan Marieskäret och Resarö Marina. Hamnen har 120 båtplatser och sjösättningsramp, färskvatten, el och grillplats.';

-- ===== Omarbete runda 4 (Granskare och Skribent, 2026-11-09) =====
-- WHERE-villkoren i alla satser i filen kontrollerade med SELECT 2026-11-09: varje sats träffar exakt en rad. Inget kört.

-- restaurants.gronviksbadet.formatted_address (vaxholm-N024; full-07 utanför-1)
-- FÖRE: 'Ensjövägen 90, 603 66 Norrköping' (Google Places; adressen ligger i Norrköping, inte vid badet)
-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Beläget på södra Rindö i slutet på Grönviksvägen finns detta lilla lokala bad." (läst 2026-11-09)
update restaurants set formatted_address = 'Grönviksvägen, Rindö' where slug = 'gronviksbadet' and formatted_address = 'Ensjövägen 90, 603 66 Norrköping';

-- restaurants.bryggan-teno.latitude/.longitude (vaxholm-0438)
-- FÖRE: 59.39257, 18.33038 (nålen stod på stranden Tenöbadet, OSM way 161248340, 4 m)
-- KÄLLA: https://tenorok.se/om-oss — "Tenö Rök & Brygga är en havsnära restaurang på Bogesundslandet, precis vid Tenöbadet.", "över tidigare Bryggan på Tenö" (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/142454383/full — "amenity=restaurant", "name=Bryggan på Tenö" (läst 2026-11-09) Uppmätt: byggnadens mittpunkt (medelvärdet av wayens noder) 59.392279, 18.328248, 125 m från den gamla nålen.
update restaurants set latitude = 59.392279, longitude = 18.328248 where slug = 'bryggan-teno' and latitude = 59.39257 and longitude = 18.33038;

-- ----- Källor utan ändring i databasen (texten och värdena stämmer; bara källan är ny). Inga satser. -----
-- restaurants.vaxholms-hembygdsgards-cafe: name, type, website, description (vaxholm-0428, vaxholm-0429, vaxholm-0432, vaxholm-0433). Toms beslut 9: Facebooksidan läst av Redaktören i Toms Chrome 2026-11-09, avskrift i kallcache/facebook-2026-11-09.txt, punkt 2. Senaste inlägget är daterat 17 september 2026.
-- KÄLLA: https://www.facebook.com/vaxholmshembygdsgardscafe/ — "Vaxholms Hembygdsgårds Café", "Kafé", "Trädgårdsgatan 19, Vaxholm, Sweden, 185 32", "Öppet helger i maj och dagligen från 1 juni." (läst 2026-11-09)
-- KÄLLA: https://www.vaxholm.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser — "Hembygdsgårdens café som ligger mitt emot badplatsen på andra sidan viken", "Offentlig toalett finns i närheten av hembygdsgården på Trädgårdsgatan" (läst 2026-11-09)
-- restaurants.vaxholms-fastning-cafe.description, "Kastellet nås året runt" (vaxholm-0426)
-- KÄLLA: https://waxholmsbolaget.se/biljetter-och-priser/mer-om-biljetter/alla-sl-biljetter-galler-mellan-44-bryggor — "Mellan dessa bryggor kan du året runt resa med Waxholmsbolaget på alla sorters SL-biljetter:", "Kastellet" (läst 2026-11-09)
-- restaurants.norrhamnen.island (vaxholm-0449), restaurants.norrbergshamnen.island (vaxholm-0457), restaurants.waxholms-gasthamn-och-rent-under-batbotten-tvatt.island (vaxholm-0676)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/relation/4121363/full — "name=Vaxön", "place=island" (läst 2026-11-09) Uppmätt mot Vaxöns strandlinje (relationens yttre ring, 514 noder): Norrhamnens nål ligger i vattnet 29 m från stranden, Norrbergshamnens 23 m och gästhamnens 34 m; Norrhamnens nål ligger 4 m från OSM-noden 364733434 "name=Norrhamnen".
-- restaurants.vaxholm-vaxholm-harbour-bochb.latitude/.longitude (vaxholm-0655)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/10683559020 — "name=Vaxholm Bed&Breakfast", "tourism=guest_house", "addr:street=Drottninggatan", "addr:housenumber=7" (läst 2026-11-09) Uppmätt: noden ligger 0 m från nålen, inne på Vaxön 136 m från stranden.
-- restaurants.frode-marina-ab.latitude/.longitude (vaxholm-0477)
-- KÄLLA: https://www.frode.se/kontaktsida — "Björkstigen 4", "59E24´25.17", "18E19´44.23" (läst 2026-11-09, curl med HTTP/1.1; Chromium fick 502 från proxyn) Uppmätt: nålen ligger på OSM-byggnaden way 161229614 "addr:street=Björkstigen", "addr:housenumber=4" (6 m från dess mittpunkt) och 26 m från verksamhetens egen GPS-angivelse, inne på Vaxön.
-- restaurants.waxholms-gasthamn-och-rent-under-batbotten-tvatt.latitude/.longitude (vaxholm-0677; namnet hör till Toms beslut 8)
-- KÄLLA: https://waxholmshamn.se/ — "Vaxholms Gästhamn", "In the middle of Vaxholm - In the middle of Skärgården", "Västerhamnen" (läst 2026-11-09) Uppmätt: nålen ligger i hamnbassängen 47 m från OSM-noden 282188948 "leisure=marina" (namnet stavat "Västerhammen" i OSM) och 85 m från noden 282186126 "name=Waxholms Gästhamn Café".

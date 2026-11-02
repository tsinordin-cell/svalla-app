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
-- FÖRE: 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.'
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser/kommunala-batplatser — "Norrbergshamnen, Badhusgatan - Norrbergsplan", "Kommunala småbåtshamnar för privatpersoner" (läst 2026-10-31)
-- KÄLLA: https://www.vaxholm.se/trafik--infrastruktur/hamnar-kajer-och-batplatser — "I Norrbergshamnen finns fem gästplatser på utsidan av pontonen.", "Tillfälliga besökare som kommer sjövägen kan nyttja kommunens tidsbestämda platser om max 3 timmar utan avgift.", "Gästhamnen drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.", "I gästhamnen finns resturang, kiosk, butiksförsäljning i sjöbodar, dusch, toalett, tvättmaskin, latrintömning samt sophantering med källsortering." (läst 2026-10-31)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.4062373&lon=18.3494958 — "Marina Norrbergshamnen" (läst 2026-10-31)
update restaurants set description = 'Norrbergshamnen vid Badhusgatan och Norrbergsplan är en av Vaxholms stads kommunala småbåtshamnar i Vaxholm. Här finns fem gästplatser på utsidan av pontonen, och tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Dusch, toalett och latrintömning finns inte här utan i Vaxholms gästhamn, en egen anläggning som drivs av Waxholms hamn AB på uppdrag av Vaxholms stad.' where slug = 'norrbergshamnen' and description = 'I Norrbergshamnen i Vaxholm finns fem gästplatser på utsidan av pontonen. Tillfälliga besökare som kommer sjövägen kan använda kommunens tidsbestämda platser i högst tre timmar utan avgift. Vaxholms centralt belägna gästhamn, med bland annat dusch, toalett och latrintömning, drivs av Waxholms hamn AB.';

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

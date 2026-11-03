-- Faktagranskningen batch 01, Husarö (Granskare/Skribent 2026-11-02).
-- Bara UPDATE. Varje sats skriver över exakt det värde som granskats (gamla värdet i WHERE).
-- Databasen kontrollerad 2026-11-03 (bara SELECT): FÖRE-värdena i WHERE stämmer i dag för husaro-gasthamn-cafe (description, name,
-- website, latitude 59.5064, longitude 18.8475) och soderlangholm (description, name). Träffar en sats ändå 0 rader har värdet
-- ändrats efter 2026-11-03: kontrollera med SELECT först.
-- Läggs in av huvudsessionen. Inga rader raderas eller döljs.

-- P0 (husaro-0252–0254): beskrivningen säger att det går att tanka året runt, men verksamheten skriver att macken är stängd.

-- restaurants.husaro-gasthamn-cafe.description (husaro-0247, 0248, 0249, 0250, 0251, 0252, 0253, 0254)
-- FÖRE: 'Vid Husarö gästhamn fungerar Sjöstationen som minilivs med ekologiska livsmedel, kaffe och grillade paninis. Drivmedel kan köpas med kortautomat året runt.'
-- KÄLLA: http://husarohandel.se/ — "Husarö Handel - lanthandel, sjömack med gasol, bensin och diesel, gästhamn", "Gästhamnen är en lång pontonbrygga med Y-bommar och mooringlinor och bojar.", "Boka gästhamnsplats via Dockspot", "Macken är stängd då vi väntar på tillstånd.", "Gästhamnnen är obemannad för tillfället då macken för närvarande är stängd", "Då vi inte är på plats har vi av säkerhetsskäl stängt av elen", "Tyvärr finns inget färskvatten. Det finns däremot på vår andra mack vid Klintsundet som ligger tvärs över Gälnan." (läst 2026-10-29)
-- KÄLLA: http://husarohandel.se/husar-handel---om-oss — "Vid Husarö ångbåtsbrygga ligger den nyrenoverade sjömacken med gästhamn." (läst 2026-10-29)
-- KÄLLA: https://www.husaro.se/om-husaro/ — "Husarö, som ligger i Österåkers kommun, är ungefär 2,5 km lång." (läst 2026-10-29)
-- KÄLLA: https://www.openstreetmap.org/query?lat=59.5064&lon=18.8475 — "Ö Husarö", "Administrativ gräns (nivå 7) Österåkers kommun" (läst 2026-11-02)
update restaurants set description = 'Husarö Handel gästhamn är gästhamnen vid ångbåtsbryggan på Husarö i Österåkers kommun. Pontonbryggan har Y-bommar, mooringlinor och bojar; plats bokas via Dockspot. Sjömacken är stängd i väntan på tillstånd, så här går det inte att tanka. Gästhamnen är obemannad, elen är avstängd och färskvatten saknas.', updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and description = 'Vid Husarö gästhamn fungerar Sjöstationen som minilivs med ekologiska livsmedel, kaffe och grillade paninis. Drivmedel kan köpas med kortautomat året runt.';

-- restaurants.husaro-gasthamn-cafe.name (husaro-0242)
-- FÖRE: 'Husarö Gästhamn & Café'
-- KÄLLA: http://husarohandel.se/ — "Husarö Handel - lanthandel, sjömack med gasol, bensin och diesel, gästhamn", "Ca 300 m från gästhamnen finns Husarö Lanthandel som har övriga livsmedel, fika och enklare förtäring." (läst 2026-10-29)
-- Obs: /o/husaro/hamnar visar inte databasplatser med samma namn som en hamn i ödatan (hamnar/page.tsx:55–58), så platsen syns där bara som Husarö Handel gästhamn ur ödatan. Sidan /upptack/husaro-gasthamn-cafe finns kvar.
update restaurants set name = 'Husarö Handel gästhamn', updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and name = 'Husarö Gästhamn & Café';

-- restaurants.husaro-gasthamn-cafe.latitude/longitude (husaro-0244)
-- FÖRE: latitude 59.5064, longitude 18.8475 – på ön men cirka 510 m norr om gästhamnen (samma punkt som önålen)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/node/9902846482 — "name=Husarö Gästhamn", "leisure=marina", lat 59.5018917, lon 18.8454895 (läst 2026-11-02)
update restaurants set latitude = 59.5018917, longitude = 18.8454895, updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and latitude = 59.5064 and longitude = 18.8475;

-- restaurants.husaro-gasthamn-cafe.website (husaro-0246)
-- FÖRE: 'https://www.svenskagasthamnar.se/stockholms-skargard/husaro/' (aggregator, nivå 3)
-- KÄLLA: http://husarohandel.se/ — "Husarö Handel - lanthandel, sjömack med gasol, bensin och diesel, gästhamn" (läst 2026-10-29). https://husarohandel.se/ har inget giltigt certifikat (2026-11-02), därför http.
update restaurants set website = 'http://husarohandel.se/', updated_at = now()
 where slug = 'husaro-gasthamn-cafe' and website = 'https://www.svenskagasthamnar.se/stockholms-skargard/husaro/';

-- restaurants.soderlangholm.description (husaro-0281 P0 14: Cinderella struken; övriga uppgifter husaro-0271–0280, 0282 kontrollerade igen 2026-11-03)
-- FÖRE: 'Gästhamnen vid Söder-Långholm i Finnhamn har en 40 meter lång pontonbrygga i viken sydväst om ön, vid farleden, med 30 platser. Här finns dass och sopmaja, medan krog och lanthandel finns på Stora Jolpan. Finnhamn ägs av Skärgårdsstiftelsen och har båttrafik med Cinderella och Waxholmsbåt till Stockholm.'
-- KÄLLA: https://www.svenskagasthamnar.se/stockholms-skargard/finnhamn-med-paradisviken-och-soder-langholm/ — "Söder-Långholm – 30 platser", "Pontonbrygga, 40m, i viken sydväst om Söder-Långholm vid farleden.", "Tillgång till dass, sopmaja.", "Finnhamn ägs sedan 1998 av Skärgårdsstiftelsen" (läst 2026-11-03). Aggregator (nivå 3): Länsstyrelsen, Skärgårdsstiftelsen och Finnhamns Arkipelag anger inte bryggans mått, läge eller antal platser och säger inget emot.
-- KÄLLA: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/finnhamn.html — "Gästhamn finns i Djupfladen, vid Söder-Långholm och nedanför vandrarhemmet.", "på Stora Jolpan finns bland annat vandrarhem, restaurang, tältplats och handelsbod", "Markägare: Skärgårdsstiftelsen" (läst 2026-11-03). Markägaruppgiften gäller Finnhamns naturreservat.
-- KÄLLA: https://finnhamn.se/hamnar/ — "På Söderlångholm har vi en flytbrygga för dig som vill ligga lite avskilt men ändå kunna bekvämt ta sig i land. Här finns sopmaja och mulltoa." (läst 2026-11-03)
-- KÄLLA: https://finnhamn.se/ — "Till sist har vi flytbryggan på Söder Långholm som ligger avskilt på ön mittemot Finnhamn till öster.", "Vandrarhemsviken, den mindre hamnen med ett 20 tal platser med närhet till krog och lanthandel." (läst 2026-11-03)
-- KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=S%C3%B6der-L%C3%A5ngholm — "Söder-Långholm", "Österåker | Natur- och terrängnamn" (läst 2026-11-03)
-- KÄLLA: https://skargardsstiftelsen.se/omraden/finnhamn/ — "Finnhamn nås med reguljär båttrafik från Stockholm, året runt med Waxholmsbolaget." (läst 2026-11-03)
-- KÄLLA: https://kund.printhuset-sthlm.se/wa/h13.pdf — "13A STOCKHOLM – VAXHOLM – BODA – SÖDRA INGMARSÖ – HUSARÖ" (läst 2026-11-03). Tabellen har Finnhamn som brygga.
-- KÄLLA: https://www.stromma.com/globalassets/sweden/stockholm/product_timetables/02_excursions/cinderella/2026/cinderella_stockholm_sandhamn_2026.pdf — "STOCKHOLM - VAXHOLM - GRINDA - SANDHAMN", "Hålltider gäller för Vaxholm, Grinda, Gällnö och Sandhamn." (läst 2026-11-03). Ingen brygga i Finnhamn i Cinderellabåtarnas tidtabell 2026.
-- KÄLLA: https://www.stromma.com/en-se/stockholm/cinderella-boats/ — "Sandhamn, Grinda, Gällnö, and Vaxholm." (läst 2026-11-02)
update restaurants set description = 'Gästhamnen på Söder-Långholm vid Finnhamn i Österåkers kommun är en 40 meter lång pontonbrygga med 30 platser i viken sydväst om ön, vid farleden. Här finns dass och sopmaja, medan krog och lanthandel finns på Stora Jolpan. Finnhamn ägs av Skärgårdsstiftelsen och har båttrafik med Waxholmsbåt till Stockholm.', updated_at = now()
 where slug = 'soderlangholm' and description = 'Gästhamnen vid Söder-Långholm i Finnhamn har en 40 meter lång pontonbrygga i viken sydväst om ön, vid farleden, med 30 platser. Här finns dass och sopmaja, medan krog och lanthandel finns på Stora Jolpan. Finnhamn ägs av Skärgårdsstiftelsen och har båttrafik med Cinderella och Waxholmsbåt till Stockholm.';

-- restaurants.soderlangholm.name (husaro-0266)
-- FÖRE: 'Söderlångholm'
-- KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=S%C3%B6der-L%C3%A5ngholm — "Söder-Långholm", "Österåker | Natur- och terrängnamn" (läst 2026-11-02). Sökningen på Söderlångholm ger ingen träff.
update restaurants set name = 'Söder-Långholm', updated_at = now()
 where slug = 'soderlangholm' and name = 'Söderlångholm';

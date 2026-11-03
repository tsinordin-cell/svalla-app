-- Sandhamn, faktagranskning batch 01 (Granskaren/Skribenten 2026-10-29).
-- Körs av huvudsessionen. Varje UPDATE skriver bara över exakt det granskade värdet (gammalt värde i WHERE).
-- Koordinater: OpenStreetMap via Nominatim (tillåten källa för koordinater). Inga rader raderas eller döljs.

-- dykarbaren.latitude (register: sandhamn-0581)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Dykarbaren, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2885549" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.9143792" (läst 2026-10-29)
-- FÖRE: 59.2888
update restaurants set latitude = 59.2885549, updated_at = now() where slug = 'dykarbaren' and latitude = 59.2888;

-- dykarbaren.longitude (register: sandhamn-0581)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Dykarbaren, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2885549" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.9143792" (läst 2026-10-29)
-- FÖRE: 18.9103
update restaurants set longitude = 18.9143792, updated_at = now() where slug = 'dykarbaren' and longitude = 18.9103;

-- cafe-ankaret.latitude (register: sandhamn-0398)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Ankaret Café, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "ankaretsandhamn" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2893019" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.9141727" (läst 2026-10-29)
-- FÖRE: 59.2875
update restaurants set latitude = 59.2893019, updated_at = now() where slug = 'cafe-ankaret' and latitude = 59.2875;

-- cafe-ankaret.longitude (register: sandhamn-0398)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Ankaret Café, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "ankaretsandhamn" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2893019" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.9141727" (läst 2026-10-29)
-- FÖRE: 18.9108
update restaurants set longitude = 18.9141727, updated_at = now() where slug = 'cafe-ankaret' and longitude = 18.9108;

-- sandhamns-bageriet.latitude (register: sandhamn-0649)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "Sandhamns bageri, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "https://www.sandhamnsbageriet.com/" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "59.2897678" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "18.9141812" (läst 2026-10-29)
-- FÖRE: 59.2884
update restaurants set latitude = 59.2897678, updated_at = now() where slug = 'sandhamns-bageriet' and latitude = 59.2884;

-- sandhamns-bageriet.longitude (register: sandhamn-0649)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "Sandhamns bageri, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "https://www.sandhamnsbageriet.com/" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "59.2897678" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/search?q=bageri&format=jsonv2&limit=5&viewbox=18.88,59.30,18.94,59.27&bounded=1&extratags=1 — "18.9141812" (läst 2026-10-29)
-- FÖRE: 18.9118
update restaurants set longitude = 18.9141812, updated_at = now() where slug = 'sandhamns-bageriet' and longitude = 18.9118;

-- bistro-sands.latitude (register: sandhamn-0420)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Sands Hotell, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2879473" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.9146140" (läst 2026-10-29)
-- KÄLLA: https://sandshotell.se/ — "restaurangen med uteterassen samt ett orangeri" (läst 2026-10-29)
-- FÖRE: 59.2882
update restaurants set latitude = 59.2879473, updated_at = now() where slug = 'bistro-sands' and latitude = 59.2882;

-- bistro-sands.longitude (register: sandhamn-0420)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Sands Hotell, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2879473" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.9146140" (läst 2026-10-29)
-- KÄLLA: https://sandshotell.se/ — "restaurangen med uteterassen samt ett orangeri" (läst 2026-10-29)
-- FÖRE: 18.9115
update restaurants set longitude = 18.914614, updated_at = now() where slug = 'bistro-sands' and longitude = 18.9115;

-- bistro-sands.name (register: sandhamn-0417)
-- KÄLLA: https://sandshotell.se/ — "restaurangen med uteterassen samt ett orangeri" (läst 2026-10-29)
-- KÄLLA: https://sandshotell.se/ — "Sands Hotell är ett konferens- och weekend-hotell i Sandhamn" (läst 2026-10-29)
-- FÖRE: 'Bistro Sands'
update restaurants set name = 'Sands Hotells restaurang', updated_at = now() where slug = 'bistro-sands' and name = 'Bistro Sands';

-- bistro-sands.description (register: sandhamn-0422, sandhamn-0423, sandhamn-0424, sandhamn-0425, sandhamn-0426, sandhamn-0427)
-- KÄLLA: https://sandshotell.se/ — "Sands Hotell är ett konferens- och weekend-hotell i Sandhamn" (läst 2026-10-29)
-- KÄLLA: https://sandshotell.se/ — "33 bäddar" (läst 2026-10-29)
-- KÄLLA: https://sandshotell.se/ — "restaurangen med uteterassen samt ett orangeri" (läst 2026-10-29)
-- KÄLLA: https://sandshotell.se/ — "terrasser med utsikt över hamninloppet" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Sands Hotell, Trovillevägen, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- FÖRE: 'Bistro Sands är restaurangen på Sands Hotell på Sandhamn, ett konferens- och weekendhotell med 33 bäddar. Restaurangen har en uteterrass, och hotellet har terrasser med utsikt över hamninloppet.'
update restaurants set description = 'Sands Hotells restaurang ligger på Sands Hotell i Sandhamn, Värmdö kommun, ett konferens- och weekendhotell med 33 bäddar. Restaurangen har en uteterrass, och hotellet har terrasser med utsikt över hamninloppet.', updated_at = now() where slug = 'bistro-sands' and description = 'Bistro Sands är restaurangen på Sands Hotell på Sandhamn, ett konferens- och weekendhotell med 33 bäddar. Restaurangen har en uteterrass, och hotellet har terrasser med utsikt över hamninloppet.';

-- vasterudde-strand.name (register: sandhamn-0516) – omarbete 2026-11-03
-- Namnet "Västerudde strand" finns bara i OpenStreetMap. Stockholm Archipelago Trail kallar udden Västerudden, och stranden ligger vid Sandöns västligaste punkt.
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/steg-for-steg-vandringsguide-for-etapp-sandhamn/ — "Trouville till Västerudden 3,3 km", "Där kan du gå vänster ut på Västerudd", "Västerudden till ångbåtsbryggan 1,5 km" (Stockholm Archipelago Trail, regional vandringsled) (läst 2026-11-03)
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/ — "När du kommer till den västra udden så går leden tillbaka via kyrkogården in i samhället." (läst 2026-11-03)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/589299279/full — "natural", "beach"; uppmätt: strandens polygon ligger 37 m från Sandöns västligaste kustpunkt (läst 2026-11-03)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/24811650/full — "Sandön"; uppmätt: västligaste punkten 59.29050 N, 18.89565 E (läst 2026-11-03)
-- FÖRE: 'Västerudde strand'
update restaurants set name = 'Stranden vid Västerudden', updated_at = now() where slug = 'vasterudde-strand' and name = 'Västerudde strand';

-- vasterudde-strand.description (register: sandhamn-0521, sandhamn-0522, sandhamn-0523, sandhamn-N021) – omarbetad 2026-11-03: utan det obelagda namnet
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/steg-for-steg-vandringsguide-for-etapp-sandhamn/ — "Trouville till Västerudden 3,3 km", "Där kan du gå vänster ut på Västerudd", "Västerudden till ångbåtsbryggan 1,5 km" (Stockholm Archipelago Trail, regional vandringsled) (läst 2026-11-03)
-- KÄLLA: https://www.stockholmarchipelagotrail.com/sv/section/etapp-sandhamn/ — "När du kommer till den västra udden så går leden tillbaka via kyrkogården in i samhället." (läst 2026-11-03)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/589299279/full — "natural", "beach"; uppmätt: strandens polygon ligger 37 m från Sandöns västligaste kustpunkt (läst 2026-11-03)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/24811650/full — "Sandön"; uppmätt: västligaste punkten 59.29050 N, 18.89565 E (läst 2026-11-03)
-- FÖRE: 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.'
update restaurants set description = 'Stranden vid Västerudden ligger på Sandöns västra udde, på Sandhamn i Värmdö kommun. Från Västerudden är det omkring 1,5 kilometer längs Stockholm Archipelago Trail till ångbåtsbryggan i byn.', updated_at = now() where slug = 'vasterudde-strand' and description = 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.';

-- vasterudde-strand.website (register: sandhamn-0520)
-- KÄLLA: ingen – http://www.varmdo.se/ är Värmdö kommuns startsida och hör inte till stranden; kommunens badplatslista har ingen sida för Västerudde (sökt i cachen 2026-10-29).
-- FÖRE: 'http://www.varmdo.se/'
update restaurants set website = null, updated_at = now() where slug = 'vasterudde-strand' and website = 'http://www.varmdo.se/';

-- restaurants.sandhamns-glassigaste-stalle.description (register: sandhamn-0409) – omarbete 2026-11-03: bara ordet "mellersta" rättas; övriga uppgifter i posten ligger hos Tom (beslut 5b).
-- Dagens text är hämtad ur den renderade sidan /o/sandhamn/restauranger (2026-10-29). Databasen är pausad, så WHERE är inte kontrollerat mot den.
-- KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf — "I Stockholms yttre skärgård från Sandhamn och söderut." (Länsstyrelsen, Fiskeguide Stockholms län) (läst 2026-11-03)
-- FÖRE: 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.'
update restaurants set description = 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms yttre skärgård.', updated_at = now() where slug = 'sandhamns-glassigaste-stalle' and description = 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.';

-- restaurants.pub-alma-sandhamn.description (register: sandhamn-0416) – omarbete 2026-11-03: bara ordet "mellersta" rättas; övriga uppgifter i posten ligger hos Tom (beslut 5b).
-- Dagens text är hämtad ur den renderade sidan /o/sandhamn/restauranger (2026-10-29). Databasen är pausad, så WHERE är inte kontrollerat mot den.
-- KÄLLA: https://www.lansstyrelsen.se/download/18.1b1d393819324610c374853c/1732515630171/Fiskeguide%20Stockholms%20l%C3%A4n.pdf — "I Stockholms yttre skärgård från Sandhamn och söderut." (Länsstyrelsen, Fiskeguide Stockholms län) (läst 2026-11-03)
-- FÖRE: 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.'
update restaurants set description = 'PUB Alma är en pub på Sandhamn i Stockholms yttre skärgård.', updated_at = now() where slug = 'pub-alma-sandhamn' and description = 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.';

-- restaurants.cafe-ankaret.description (sandhamn-0400, sandhamn-0402 STRYK+KOMPENSERA, sandhamn-N018)
-- Dagens text: supabase/datafix/2026-09-23-vardeord-omgang2.sql rad 7 (datafix-kallor.tsv). Databasen är pausad, så WHERE är inte kontrollerat mot den.
-- Adressen "Sandhamn 310" kom från explorearchipelago.com, som inte finns längre; kaféets egen Instagram anger ingen gatuadress.
-- KÄLLA: https://www.instagram.com/ankaretsandhamn/ — "Ankaret ⚓ Sandhamn", "ⒸⒶⒻⒺ • ⓈⒽⓄⓅ • ⒶⓇⓉ ⒼⒶⓁⓁⒺⓇⓎ •", senaste inlägget "den 28 augusti 2026" (läst i webbläsare (Redaktören) 2026-11-02)
-- FÖRE: 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.'
update restaurants set description = 'Café Ankaret är ett kafé i Sandhamn som också har butik och konstgalleri.', updated_at = now() where slug = 'cafe-ankaret' and description = 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.';

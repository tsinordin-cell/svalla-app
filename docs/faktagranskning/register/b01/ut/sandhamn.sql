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

-- vasterudde-strand.description (register: sandhamn-0521, sandhamn-0522, sandhamn-0523)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "Västerudde strand, Sandhamn, Värmdö kommun" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "59.2910655" (läst 2026-10-29)
-- KÄLLA: https://nominatim.openstreetmap.org/lookup?osm_ids=N3053781979,N794630742,W589299279,W422017054,W329728726&format=jsonv2&addressdetails=1&extratags=1&namedetails=1&accept-language=sv — "18.8961905" (läst 2026-10-29)
-- FÖRE: 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.'
update restaurants set description = 'Västerudde strand är en strand på västra delen av Sandön, på Sandhamn i Värmdö kommun.', updated_at = now() where slug = 'vasterudde-strand' and description = 'Västerudde strand är en badplats på Sandhamn i Värmdö kommun.';

-- vasterudde-strand.website (register: sandhamn-0520)
-- KÄLLA: ingen – http://www.varmdo.se/ är Värmdö kommuns startsida och hör inte till stranden; kommunens badplatslista har ingen sida för Västerudde (sökt i cachen 2026-10-29).
-- FÖRE: 'http://www.varmdo.se/'
update restaurants set website = null, updated_at = now() where slug = 'vasterudde-strand' and website = 'http://www.varmdo.se/';

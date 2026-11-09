-- Sandhamn, faktagranskning batch 01 (Granskaren/Skribenten 2026-10-29).
-- Körs av huvudsessionen. Varje UPDATE skriver bara över exakt det granskade värdet (gammalt värde i WHERE).
-- Koordinater: OpenStreetMap via Nominatim (tillåten källa för koordinater). Inga rader raderas.
-- Omarbete 4 (2026-11-09): enligt Toms beslut 6 döljs Stora Trouvillestranden och Lilla Trouville Stranden (hidden_at). Satserna för PUB Alma och
-- Sandhamns Glassigaste Ställe står bortkommenterade. Nya koordinatkällor läses med OpenStreetMaps API (api.openstreetmap.org), inte Nominatim.

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

-- bistro-sands.name (register: sandhamn-0417; omarbete 4: sandhamn-0418, sandhamn-0419, sandhamn-0421, sandhamn-0394)
-- Omarbete 4 (2026-11-09): namnet Bistro Sands står inte på hotellets startsida eller på /hotell/ (Chromium, 0 träffar på "bistro"), och sidan länkar inte till något Instagram- eller Facebookkonto. Hotellet själv skriver bara "restaurangen", så namnet blir Sands Hotells restaurang. Att dölja posten kräver Tom (inte föreslaget).
-- KÄLLA: https://sandshotell.se/ — "restaurangen med uteterassen samt ett orangeri" (läst 2026-11-09)
-- KÄLLA: https://sandshotell.se/ — "Sands Hotell är ett konferens- och weekend-hotell i Sandhamn" (läst 2026-11-09)
-- FÖRE: 'Bistro Sands'
update restaurants set name = 'Sands Hotells restaurang', updated_at = now() where slug = 'bistro-sands' and name = 'Bistro Sands';

-- bistro-sands.description (register: sandhamn-0422, sandhamn-0423, sandhamn-0424, sandhamn-0425, sandhamn-0426, sandhamn-0427)
-- KÄLLA: https://sandshotell.se/ — "Sands Hotell är ett konferens- och weekend-hotell i Sandhamn" (läst 2026-11-09)
-- KÄLLA: https://sandshotell.se/ — "33 bäddar" (läst 2026-11-09)
-- KÄLLA: https://sandshotell.se/ — "restaurangen med uteterassen samt ett orangeri" (läst 2026-11-09)
-- KÄLLA: https://sandshotell.se/ — "terrasser med utsikt över hamninloppet" (läst 2026-11-09)
-- KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Kommun: Värmdö" (Värmdö kommun i stället för Nominatim, omarbete 4) (läst 2026-11-09)
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

-- restaurants.sandhamns-glassigaste-stalle.description (register: sandhamn-0407, sandhamn-0408, sandhamn-0409) – omarbete 2026-11-03 (Redaktörens beslut oar-omk): beskrivningen töms tills Tom svarat (beslut 6), så att ingen obelagd uppgift står kvar. Namnet och posten står kvar. Ingen ny text.
-- Tom sträng, inte NULL: med NULL skriver src/app/upptack/[id]/page.tsx:142–143 en reservbeskrivning av namn, typ, ö och region, alltså ny text.
-- KÄLLA: ingen – posten har ingen tillåten källa (explorearchipelago.com finns inte längre; ingen egen webbplats och inget i OpenStreetMap). WHERE kontrollerat mot databasen med SELECT 2026-11-03.
-- FÖRE: 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.'
update restaurants set description = '', updated_at = now() where slug = 'sandhamns-glassigaste-stalle' and description = 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.';

-- restaurants.pub-alma-sandhamn.description (register: sandhamn-0414, sandhamn-0415, sandhamn-0416) – omarbete 2026-11-03 (Redaktörens beslut oar-omk): beskrivningen töms tills Tom svarat (beslut 6), så att ingen obelagd uppgift står kvar. Namnet och posten står kvar. Ingen ny text.
-- Tom sträng, inte NULL: med NULL skriver src/app/upptack/[id]/page.tsx:142–143 en reservbeskrivning av namn, typ, ö och region, alltså ny text.
-- KÄLLA: ingen – posten har ingen tillåten källa (explorearchipelago.com finns inte längre; ingen egen webbplats och inget i OpenStreetMap). WHERE kontrollerat mot databasen med SELECT 2026-11-03.
-- FÖRE: 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.'
update restaurants set description = '', updated_at = now() where slug = 'pub-alma-sandhamn' and description = 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.';

-- restaurants.cafe-ankaret.name (register: sandhamn-0395) – omarbete 2026-11-03 (Redaktörens beslut oar-omk): profilen kallar sig "Ankaret ⚓ Sandhamn", inte "Café Ankaret", och namnet ska vara verksamhetens eget. Inget annat belägg för "Café Ankaret" (OpenStreetMap är ingen källa för namn). WHERE kontrollerat mot databasen med SELECT 2026-11-03.
-- KÄLLA: https://www.instagram.com/ankaretsandhamn/ — "Ankaret ⚓ Sandhamn", "ⒸⒶⒻⒺ • ⓈⒽⓄⓅ • ⒶⓇⓉ ⒼⒶⓁⓁⒺⓇⓎ •", "sᴀɴᴅʜᴀᴍɴ, sᴛᴏᴄᴋʜᴏʟᴍ ᴀʀᴄʜɪᴘᴇʟᴀɢᴏ, sᴡᴇᴅᴇɴ", senaste inlägget 2026-08-28 (verksamhetens egen Instagram, nivå 2; läst i webbläsare (Redaktören) 2026-11-03, inloggad i Toms Chrome, sidtexten i kontroll/oar-omk2-sidor/)
-- FÖRE: 'Café Ankaret'
update restaurants set name = 'Ankaret', updated_at = now() where slug = 'cafe-ankaret' and name = 'Café Ankaret';

-- restaurants.cafe-ankaret.description (register: sandhamn-0400, sandhamn-0402 STRYK+KOMPENSERA, sandhamn-N018, sandhamn-N022) – omarbetad 2026-11-03: namnet följer sandhamn-0395, och första meningen säger namn, kafé, ort och kommun (SEO-regeln).
-- Dagens text: supabase/datafix/2026-09-23-vardeord-omgang2.sql rad 7 (datafix-kallor.tsv); WHERE kontrollerat mot databasen med SELECT 2026-11-03.
-- Adressen "Sandhamn 310" kom från explorearchipelago.com, som inte finns längre; kaféets egen Instagram anger ingen gatuadress.
-- KÄLLA: https://www.instagram.com/ankaretsandhamn/ — "Ankaret ⚓ Sandhamn", "ⒸⒶⒻⒺ • ⓈⒽⓄⓅ • ⒶⓇⓉ ⒼⒶⓁⓁⒺⓇⓎ •", "sᴀɴᴅʜᴀᴍɴ, sᴛᴏᴄᴋʜᴏʟᴍ ᴀʀᴄʜɪᴘᴇʟᴀɢᴏ, sᴡᴇᴅᴇɴ", senaste inlägget 2026-08-28 (verksamhetens egen Instagram, nivå 2; läst i webbläsare (Redaktören) 2026-11-03, inloggad i Toms Chrome, sidtexten i kontroll/oar-omk2-sidor/)
-- KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Badplatser i Värmdö", "Trouville, Sandhamn" (Värmdö kommun) (läst 2026-11-03)
-- KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Sandön, där Sandhamn ligger", "Kommun: Värmdö" (Stockholms läns museum) (läst 2026-11-03)
-- FÖRE: 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.'
update restaurants set description = 'Ankaret är ett kafé med butik och konstgalleri i Sandhamn i Värmdö kommun.', updated_at = now() where slug = 'cafe-ankaret' and description = 'Café Ankaret är ett kafé i Sandhamn, på adressen Sandhamn 310.';

-- ════════════════════════════════════════════════════════════════════════
-- OMARBETE 4 (Granskaren/Skribenten 2026-11-09)
-- Inget är kört. Den här rundan körs ingenting mot databasen, inte heller SELECT. Dagens värden i WHERE är
-- hämtade ur den publicerade sidan svalla.se/upptack/<slug> (metabeskrivningen) 2026-11-09 och stämmer
-- ordagrant med datafixen som skrev dem (2026-09-23-sandhamn-platser.sql rad 26, 2026-09-22-hamnar-beskrivningar-block2.sql rad 75).
-- ════════════════════════════════════════════════════════════════════════

-- dykarbaren.description (register: sandhamn-0585, sandhamn-0586, sandhamn-0587, sandhamn-0591, sandhamn-N033, sandhamn-N034, sandhamn-N035) – omarbete 4
-- Husets byggår 1921 och att huset användes för dykutbildningar 1982 är husets historia och kräver nivå 1. Bebyggelseregistret har inget objekt
-- för huset (K-samsök, sökt på "Dykarbaren" och "Sandhamn 425" 2026-11-09). Det stryks och kompenseras med Dykarbarens uppgifter om den egna
-- verksamheten (förtydligande 8 och 19): baren och matplatserna på nedervåningen, verksamhetens startår och att samma ägare drivit den i mer än 20 år.
-- "inte helt går att vädersäkra" som på sidan (sandhamn-0591).
-- KÄLLA: https://www.dykarbaren.se/ — "VÄLKOMMEN TILL DYKARBAREN SANDHAMN", "Vi erbjuder endast bordsbokning inomhus då vår uteservering inte helt går att vädersäkra.", "Öppet 2026", "säsong maj – september", "Sandhamn 425" (läst 2026-11-09)
-- KÄLLA: https://www.dykarbaren.se/om-oss/ — "På nedervåningen av Dykarbaren hittar ni både den legendariska baren och matplatserna tätt ihop.", "Mitt emot, precis vid strandkanten, finns en mysig uteservering", "Dykarbaren ägs och drivs sedan mer än 20 år tillbaka av samma ägare med familj", "på nedre botten växte en café- och barverksamhet fram", "1982 höll man dykutbildningar på Sandhamn." (läst 2026-11-09)
-- KÄLLA: https://stockholmslansmuseum.se/besoksmal/sandhamn/ — "Kommun: Värmdö" (läst 2026-11-09)
-- FÖRE: 'Dykarbaren på Sandhamn 425 är bar och restaurang i ett hus som uppfördes 1921. Baren växte fram 1982, när huset användes för dykutbildningar på Sandhamn. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september, och bord bokas bara inomhus eftersom uteserveringen inte går att vädersäkra.'
update restaurants set description = 'Dykarbaren på Sandhamn 425 i Värmdö kommun är bar och restaurang, med baren och matplatserna på nedervåningen. Enligt Dykarbaren växte bar- och caféverksamheten fram 1982, och samma ägare med familj har drivit stället i mer än 20 år. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september, och bord bokas bara inomhus eftersom uteserveringen inte helt går att vädersäkra.', updated_at = now() where slug = 'dykarbaren' and description = 'Dykarbaren på Sandhamn 425 är bar och restaurang i ett hus som uppfördes 1921. Baren växte fram 1982, när huset användes för dykutbildningar på Sandhamn. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september, och bord bokas bara inomhus eftersom uteserveringen inte går att vädersäkra.';

-- ksss-gasthamn-lokholmen-trollsundet.description (register: sandhamn-0594, sandhamn-0595, sandhamn-0596–0602, sandhamn-N036) – omarbete 4
-- Gästhamnen ligger på Lökholmen, intill Sandhamn, inte på Sandön (MÄTT i OSM). Beskrivningen säger det nu. Fältet island står kvar som 'Sandhamn',
-- eftersom det styr vilken ösida platsen listas på; att listan ska visa platsen som nära Sandhamn, med avstånd, är mallarnas punkt (Vaktens lista).
-- Nålen står kvar: den ligger vid Lökholmens hamnkontor.
-- KÄLLA: https://www.ksss.se/hamnar/lokholmen — "I yttre havsbandet intill Sandhamn ligger Lökholmen.", "Den första delen, Trollsundet, som under högsommaren i första hand är reserverad för KSSS medlemmar, rymmer upp till 90 båtar", "Lökholmens gästhamn är belägen strax nordost om Sandhamns gästhamn.", "Under högsäsong avgår passbåten mellan Lökholmen och Sandhamn minst en gång i timmen." (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/64793039/full — "Lökholmen", "islet"; uppmätt: nålen 59.2907276, 18.9280747 ligger inuti Lökholmens kustlinje, 3 m från stranden (läst 2026-11-09)
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/24811650/full — "Sandön", "island"; uppmätt: nålen ligger 507 m från Sandöns kustlinje (läst 2026-11-09)
-- FÖRE: 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, strax nordost om Sandhamns gästhamn, och rymmer upp till 90 båtar med möjlighet till landström. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus.'
update restaurants set description = 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, som ligger i yttre havsbandet intill Sandhamn, strax nordost om Sandhamns gästhamn. Här ryms upp till 90 båtar med möjlighet till landström. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus, och under högsäsong går en passbåt mellan Lökholmen och Sandhamn minst en gång i timmen.', updated_at = now() where slug = 'ksss-gasthamn-lokholmen-trollsundet' and description = 'Trollsundet är den första delen av KSSS gästhamn på Lökholmen, strax nordost om Sandhamns gästhamn, och rymmer upp till 90 båtar med möjlighet till landström. Tilläggning sker med mooringlina, boj eller Y-bom och det är förbjudet att ankra; under högsommaren är platserna i första hand reserverade för KSSS medlemmar. På ön finns toaletter, duschar, bastu och sophus.';

-- seglarhotellet-sandhamn.latitude/.longitude (register: sandhamn-0439) – KÄLLA-rad ny, omarbete 4. Ingen UPDATE: värdet stämmer.
-- Den gamla källan (Nominatims reverse-svar) gällde restaurangen Sandhamns Hotell, inte Seglarhotellet.
-- KÄLLA: https://api.openstreetmap.org/api/0.6/way/301302737/full — "Sandhamn Seglarhotell", "hotel"; uppmätt: nålen 59.2878532, 18.9184827 ligger inuti byggnaden, 2 m från väggen (läst 2026-11-09)

-- Toms beslut 6 (beslut-tom.md, "Beslutat 2026-11-08"): Stora Trouvillestranden och Lilla Trouville Stranden döljs som dubbletter av Trouville.
-- Samma sats som den förberedda i supabase/datafix/2026-10-19-filmoarna.sql rad 182–183. Posternas registerrader (sandhamn-0524–0537 och
-- sandhamn-0603–0616) får ingen textändring; de försvinner från sajten när posterna döljs.
-- KÄLLA: https://www.varmdo.se/upplevaochgora/naturochfriluftsliv/badplatserivarmdo/trouvillesandhamn.4.18c983316e0536cb189a2d4.html — "Badplatser i Värmdö", "Trouville, Sandhamn", "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns södra sida." (kommunen har en badplatssida för Trouville och nämner varken Stora eller Lilla Trouville) (läst 2026-11-09)
update restaurants set hidden_at = now(), hidden_reason = 'Dubblett av Trouville (Toms beslut 6, faktagranskning b01 2026-11-09)'
  where slug in ('stora-trouvillestranden', 'lilla-trouville-stranden') and hidden_at is null;

-- PUB Alma (register: sandhamn-0410–0416) och Sandhamns Glassigaste Ställe (register: sandhamn-0403–0409): ingen tillåten källa hittad
-- 2026-11-09 (sökt efter egen webbplats, Instagram och kommunens sidor; bara restaurangguider, som är förbjudna som källa).
-- Körs bara om ingen har bekräftat posten före batch 01:s PR (Toms beslut 6). Redaktören avgör.
-- update restaurants set hidden_at = now(), hidden_reason = 'Ingen tillåten källa bekräftar att puben finns (Toms beslut 6, faktagranskning b01)'
--   where slug = 'pub-alma-sandhamn' and hidden_at is null;

-- Körs bara om ingen har bekräftat posten före batch 01:s PR (Toms beslut 6). Redaktören avgör.
-- update restaurants set hidden_at = now(), hidden_reason = 'Ingen tillåten källa bekräftar att glasscaféet finns (Toms beslut 6, faktagranskning b01)'
--   where slug = 'sandhamns-glassigaste-stalle' and hidden_at is null;

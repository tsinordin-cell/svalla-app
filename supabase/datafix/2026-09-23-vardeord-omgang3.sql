-- Värdeord omgång 3 (Tom 2026-09-23: "Kör om det gör oss bättre")
-- Sökning efter värdeord i alla synliga platstexter gav 14 träffar. Nio av dem är inga fel:
-- "lugn/lugnare" står i källan (Bovallstrand, Finnhamn, KSSS Sandhamn, Lysekil, Mossholmen,
-- Hönö Röds hamn; se datafix 2026-09-22-hamnar-*), "klassiker" är en maträtt (Gammelgården,
-- Sjögrens) och Saltholmen träffades av "unik" i "kommunikationer". Kvar fanns fem texter utan
-- källa. Två av dem visade sig också ha fel namn, telefon eller läge.
--
-- KÄLLOR (lästa 2026-09-23):
--   svenskagasthamnar.se/norra-vastkusten/fjallbacka/: "Två gästbryggor finns i centrum och ytterligare en vid
--     Brandparken med kort avstånd till duschar, toaletter och Fjällbackas stora utbud av restauranger och butiker.",
--     "På utsidan av bryggan vid Badholmen finns ytterligare gästplatser där man har närhet till badstrand, hopptorn
--     och Badholmens vandrarhem och café.", Hamndjup "1,5-5 m", Gästplatser "180", Förtöjning "Boj, långsides",
--     "Boka via Dockspot", Hamnvärd Gästhamnsbolaget Väst AB mob. 0707-40 36 85
--   systrarnapapiren.se: "Systrarna på Piren", "Mölle Hamn 1Na, 263 77 Mölle", "073 – 201 53 63",
--     "började som en liten Food Truck 2006", "fokus på Fisk & Skaldjur, lokala leverantörer och närodlat",
--     "hamnens största uteservering direkt mot havet", "Bokning samma dag sker via telefon."
--     -> posten hette "Mölle Hamn & Krog" men webbplats och telefon är Systrarna på Pirens.
--   mickrumsbrygga.se och /om-oss: "Muskö Sjökrog", "Mickrums brygga vid Horsfjärden", "Italienska smaker, svenska
--     råvaror", "Kiosken", "DJ:s på terrassen, saxofon vid solnedgången", "Stängt för säsongen", 08-500 45 100,
--     hej@mickrumsbrygga.se. sjokrog.se (gamla adressen): "Vi driver inte längre Muskö Sjökrog".
--   explorearchipelago.com/sv/sthlm/sodra-skargarden/musko/musko-sjokrog: "Mickrumsvägen 22, 148 95 Muskö",
--     "08-500 451 00". Läge: OSM-noden "Mickrums brygga" 59.0172, 18.1328 (gamla punkten låg 2,5 km söderut).
--   klintsundetmarina.se och /kontakta-oss/: "Lagnövägen 157, 184 95 Ljusterö", "N 59º 32 18.8774 / E 18º 44 59.1438",
--     "Blyfri 98, RME-fri diesel för båtar och alkylatbensin från pump och på dunk", gasol "från både AGA och
--     Primagaz", dricksvatten från "avsaltningsanläggning", "ca 60 st permanenta båtplatser", "ett fåtal för
--     korttidsuthyrning och som gästhamnsplatser", EKO-Lanthandel & Café, kajak- och cykeluthyrning.
--     Ingen uppgift om Circle K; telefonnumret 08-542 432 43 finns inte på marinans sida och tas bort.
--   explorearchipelago.com/sthlm/central-archipelago/finnhamn/finnhamns-cafe-restaurant: "located close to the ferry
--     jetty and has a guest harbor", "Open June to August", "Finnhamns brygga, 130 25 Ingmarsö", 08-542 462 12.
--   finnhamn.se: "Vandrarhemsviken, den mindre hamnen med ett 20 tal platser med närhet till krog och lanthandel."

update restaurants set description = 'Fjällbackas gästhamn har två gästbryggor i centrum och en vid Brandparken, nära duschar, toaletter, restauranger och butiker. På utsidan av bryggan vid Badholmen finns fler gästplatser nära badstrand, hopptorn och Badholmens vandrarhem och café. Hamnen har 180 gästplatser, 1,5–5 meters djup och förtöjning vid boj eller långsides, och gästplatsen bokas via Dockspot.',
  updated_at = now() where slug = 'fjallbacka-gasthamn';

update restaurants set name = 'Systrarna på Piren',
  description = 'Systrarna på Piren ligger på Mölle Hamn 1Na i Mölle, med uteservering direkt mot havet. Restaurangen började som en food truck 2006 och har fokus på fisk och skaldjur från lokala leverantörer. Bord bokas per telefon eller mejl, och samma dag bara per telefon.',
  updated_at = now() where slug = 'molle-hamn-krog';

update restaurants set website = 'https://mickrumsbrygga.se/', phone = '08-500 451 00',
  latitude = 59.0172, longitude = 18.1328,
  description = 'Muskö Sjökrog ligger på Mickrums brygga vid Horsfjärden, Mickrumsvägen 22 på Muskö. Köket blandar italienska smaker med svenska råvaror, och vid krogen finns en kiosk. På sommaren spelar DJ:s och musiker på terrassen enligt krogens kalender. Krogen är säsongsöppen.',
  updated_at = now() where slug = 'musko-sjokrog';

update restaurants set name = 'Klintsundet Marina', island = 'Ljusterö', website = 'https://klintsundetmarina.se/', phone = null,
  latitude = 59.53858, longitude = 18.74976,
  description = 'Sjömacken vid Klintsundet Marina, Lagnövägen 157 på Ljusterö, säljer blyfri 98, RME-fri diesel för båtar och alkylatbensin från pump och på dunk, och byter gasolflaskor från AGA och Primagaz. Vid tankning kan båten fyllas med dricksvatten från marinans avsaltningsanläggning. Marinan har lanthandel och café, några gästplatser och uthyrning av kajaker och cyklar.',
  updated_at = now() where slug = 'circle-k-klintsundet';

update restaurants set description = 'Finnhamns Krog ligger nära ångbåtsbryggan på Finnhamn och har gästhamn för den som kommer med egen båt. Vandrarhemsviken, den mindre av Finnhamns gästhamnar med ett tjugotal platser, ligger nära krogen och lanthandeln. Huvudsäsongen är juni–augusti, och aktuella öppettider står på finnhamn.se.',
  updated_at = now() where slug = 'finnhamns-krog';

-- Finnhamns Krog: punkten låg ~400 m österut vid en naturstig (59.4833, 18.8333, avrundad).
-- OSM-noden "Finnhamns café-krog" 59.4825572, 18.8249831 ligger intill färjeläget (59.4828, 18.8267),
-- vilket stämmer med Explore Archipelago: "located close to the ferry jetty".
update restaurants set latitude = 59.4825572, longitude = 18.8249831, updated_at = now() where slug = 'finnhamns-krog';

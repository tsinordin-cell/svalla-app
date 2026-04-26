-- ============================================================
-- SVALLA — Fix: Felaktiga koordinater + saknade Tier 1-platser
-- Kör i Supabase SQL Editor
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- DEL 1: Fixa felaktiga koordinater från schema.sql (4 st)
-- ────────────────────────────────────────────────────────────

-- Grinda Wärdshus: 59.6028,18.7275 → 59.409,18.562
-- (gamla koord hamnade nära Blidö, 45 km för långt norrut)
UPDATE restaurants
SET latitude = 59.409, longitude = 18.562,
    island = 'Grinda', archipelago_region = 'middle'
WHERE name = 'Grinda Wärdshus';

-- Finnhamns Kafé: 59.6325,18.8122 → 59.492,18.785
-- (för långt norrut, ska vara vid Finnhamns hamn)
UPDATE restaurants
SET latitude = 59.492, longitude = 18.785,
    island = 'Finnhamn', archipelago_region = 'middle'
WHERE name = 'Finnhamns Kafé';

-- Utö Värdshus: 58.9603,17.8897 → 58.952,18.318
-- (longitud 17.89 = väster om Södertälje — kritiskt fel)
UPDATE restaurants
SET latitude = 58.952, longitude = 18.318,
    island = 'Utö', archipelago_region = 'south'
WHERE name = 'Utö Värdshus';

-- Arholma Krog: 60.0183,18.8892 → 59.848,19.130
-- (för långt norrut + fel longitud)
UPDATE restaurants
SET latitude = 59.848, longitude = 19.130,
    island = 'Arholma', archipelago_region = 'north'
WHERE name = 'Arholma Krog';

-- ────────────────────────────────────────────────────────────
-- DEL 2: Backfill island-data på de övriga schema.sql-posterna
-- ────────────────────────────────────────────────────────────

UPDATE restaurants
SET island = 'Sandhamn', archipelago_region = 'outer', type = 'restaurant'
WHERE name = 'Sandhamns Värdshus' AND island IS NULL;

UPDATE restaurants
SET island = 'Möja', archipelago_region = 'middle', type = 'restaurant'
WHERE name = 'Möja Krog' AND island IS NULL;

-- ────────────────────────────────────────────────────────────
-- DEL 3: Lägg till saknade Tier 1-platser (7 st)
-- ────────────────────────────────────────────────────────────

INSERT INTO restaurants (
  id, name, island, latitude, longitude,
  description, opening_hours, menu,
  images, image_url, tags, core_experience,
  type, slug, archipelago_region,
  categories, best_for, facilities,
  seasonality, source_confidence
) VALUES

-- SANDHAMN: Seglarrestaurangen
(gen_random_uuid(), 'Seglarrestaurangen', 'Sandhamn', 59.2875, 18.9255,
 'Seglarhotellets klassiska restaurang – en av skärgårdens mest kända. Kök med fokus på svenska råvaror och färsk fisk. Bokning rekommenderas starkt under högsäsong.',
 'Maj–September: dagligen 12–22.',
 'Á la carte, fisk och skaldjur, svenska råvaror, vinlista, dessert.',
 ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
 ARRAY['seglarhotellet','finmiddag','sandhamn','boka i förväg','KSSS'],
 'Seglarhotellets restaurang är kvällen på Sandhamn i sin finaste form – svensk matkvalitet, havsutsikt och ett av skärgårdens mest historiska kroglägen.',
 'restaurant', 'seglarrestaurangen-sandhamn', 'outer',
 ARRAY['restaurant','dinner_stop'],
 ARRAY['couples','sailors','foodies'],
 ARRAY['restaurant','bar','guest_dock'],
 'summer_only', 'high'),

-- VAXHOLM: Hamnkrogen
(gen_random_uuid(), 'Hamnkrogen Vaxholm', 'Vaxholm', 59.4008, 18.3548,
 'Klassisk krog precis vid gästbryggan i Vaxholm. Räkor, fisksoppa och husmanskost i bästa hamntradition. Det självklara stoppet för alla som passerar Vaxholm till sjöss.',
 'Maj–September: dagligen 11–21.',
 'Räkor, fisksoppa, husmanskost, smörgåsbord, öl och vin.',
 ARRAY['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'],
 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
 ARRAY['vaxholm','hamn','räkor','husmanskost','klassisk','bryggläge'],
 'Hamnkrogen är Vaxholms hjärta – direkt bryggläge, räkor och den sortens enkla sommarlycka man åker ut i skärgården för.',
 'restaurant', 'hamnkrogen-vaxholm', 'inner',
 ARRAY['restaurant','harbor_stop','lunch_stop'],
 ARRAY['boaters','family','day_trip'],
 ARRAY['guest_dock','restaurant','toilet'],
 'summer_only', 'high'),

-- FINNHAMN: Finnhamns Krog
(gen_random_uuid(), 'Finnhamns Krog', 'Finnhamn', 59.4915, 18.7835,
 'Krogen vid Finnhamns gästhamn – välkänd samlingsplats för seglare och dagsturister sedan generationer. Enkel, bra mat i avslappnad stämning med hamnen precis utanför fönstret.',
 'Juni–Augusti: dagligen 12–21.',
 'Husman, fisk, räkor, smörgåsar, öl och vin.',
 ARRAY['https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800'],
 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
 ARRAY['finnhamn','seglare','gästhamn','enkel','bryggstämning'],
 'Finnhamns krog är samlingsplatsen som aldrig tröttar – bryggstämning, enkla råvaror och kvällar som sträcker sig längre än planerat.',
 'restaurant', 'finnhamns-krog', 'middle',
 ARRAY['restaurant','harbor_stop'],
 ARRAY['sailors','boaters','family'],
 ARRAY['guest_dock','restaurant'],
 'summer_only', 'high'),

-- FJÄDERHOLMARNA: Fjäderholmarnas Krog
(gen_random_uuid(), 'Fjäderholmarnas Krog', 'Fjäderholmarna', 59.3210, 18.1595,
 'Den stora kroglokalen på Fjäderholmarna – närmaste riktiga skärgårdsupplevelsen från Stockholm. Stor terrass mot vattnet, vällagad mat och direktbåt från Strandvägen på 25 minuter.',
 'Maj–September: dagligen 11–22.',
 'Á la carte, räkor, fisksoppa, skaldjursplåt, husmanskost.',
 ARRAY['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
 ARRAY['fjäderholmarna','terrass','populär','nära stockholm','direktbåt'],
 'Fjäderholmarnas Krog bevisar att skärgårdsupplevelse inte kräver lång båtresa – 25 minuter från stan, och du är i en annan värld.',
 'restaurant', 'fjaderholmarnas-krog', 'inner',
 ARRAY['restaurant','harbor_stop','lunch_stop'],
 ARRAY['family','couples','day_trip','boaters'],
 ARRAY['guest_dock','restaurant','bar','toilet'],
 'summer_only', 'high'),

-- FJÄDERHOLMARNA: Rökeriet
(gen_random_uuid(), 'Rökeriet Fjäderholmarna', 'Fjäderholmarna', 59.3208, 18.1628,
 'Det klassiska rökeriet på Fjäderholmarna sedan 1980-talet. Rökt lax, sill och skaldjur direkt från produktionen på ön. En av Stockholmsskärgårdens mest autentiska matupplevelser.',
 'April–Oktober: dagligen 11–21.',
 'Rökt lax, gravad lax, sill, räkor, smörgåsar och varmrätter.',
 ARRAY['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'],
 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
 ARRAY['rökt fisk','lax','sill','klassisk','autentisk','fjäderholmarna','hantverk'],
 'Rökeriet är skärgårdsmat i ursprungsform – hantverk, rök och råvaror utan kompromiss sedan decennier.',
 'restaurant', 'rokeriet-fjaderholmarna', 'inner',
 ARRAY['restaurant','lunch_stop','provisions'],
 ARRAY['family','day_trip','foodies'],
 ARRAY['restaurant','provisions'],
 'extended_season', 'high'),

-- MÖJA: Möja Bageri
(gen_random_uuid(), 'Möja Bageri', 'Möja', 59.4370, 18.8272,
 'Litet bageri vid hamnen på Möja. Nybakat bröd, bullar och kaffe varje morgon under sommaren. Det självklara morgonstoppet för seglare på väg ut i ytterskärgården.',
 'Juni–Augusti: dagligen 7–14.',
 'Nybakat bröd, bullar, kaffe, enkla smörgåsar.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['bageri','frukost','möja','nybakat','morgon','kaffe'],
 'Morgonkaffet med nybakad bulle vid Möja hamn – en liten ritual som gör varje seglingsdag lite bättre.',
 'cafe', 'moja-bageri', 'middle',
 ARRAY['cafe','bakery','provisions'],
 ARRAY['sailors','boaters','day_trip'],
 ARRAY['cafe'],
 'summer_only', 'medium'),

-- NÅTTARÖ: Nåttarö Krog
(gen_random_uuid(), 'Nåttarö Krog', 'Nåttarö', 58.9178, 18.3628,
 'Klassisk krog på Nåttarö i södra skärgården. Genuint och avskalat, omgivet av ett av Stockholmsskärgårdens vackraste naturreservat. Hit åker man för lugnet, inte lyxen.',
 'Juni–Augusti: dagligen 12–20.',
 'Husmanskost, fisk, räkor, enkel säsongsmat.',
 ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
 ARRAY['nåttarö','sydliga skärgården','naturreservat','genuint','lugnt'],
 'Nåttarö Krog är slutdestinationen för den som vill ha skärgårdens lugn på riktigt – naturreservat, klippor och enkel god mat.',
 'restaurant', 'nattaro-krog', 'south',
 ARRAY['restaurant','harbor_stop'],
 ARRAY['sailors','boaters','nature'],
 ARRAY['guest_dock','restaurant'],
 'summer_only', 'medium')

ON CONFLICT (name) DO NOTHING;

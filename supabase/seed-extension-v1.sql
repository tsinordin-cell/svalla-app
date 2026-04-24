-- ============================================================
-- SVALLA — Extension v1: Fyll gap på underrepresenterade öar
-- Kör i Supabase SQL Editor efter fix-coordinates-v1.sql
-- ============================================================

INSERT INTO restaurants (
  id, name, island, latitude, longitude,
  description, opening_hours, menu,
  images, image_url, tags, core_experience,
  type, slug, archipelago_region,
  categories, best_for, facilities,
  seasonality, source_confidence
) VALUES

-- ════════════════════════════════════════════════
-- DALARÖ (0 platser → kritisk lucka)
-- Stor hamnort, populär utgångspunkt för södra skärgården
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Dalarö Krog', 'Dalarö', 59.1318, 18.4063,
 'Klassisk skärgårdskrog vid Dalarö gästhamn. Välkänt stopp för båtfolk på väg ut i södra skärgården eller in mot Stockholm. Bra mat, direkt hamnanknytning och lång säsong.',
 'Maj–September: dagligen 11–21.',
 'Husmanskost, räkor, fisksoppa, smörgåsar, öl och vin.',
 ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
 ARRAY['dalarö','hamn','södra skärgården','stopp','husmanskost'],
 'Dalarö Krog är porten till södra skärgården – ett naturligt stopp med bra mat, bra läge och rätt känsla för det som väntar utanför.',
 'restaurant', 'dalaro-krog', 'south',
 ARRAY['restaurant','harbor_stop','lunch_stop'],
 ARRAY['boaters','family','day_trip'],
 ARRAY['guest_dock','restaurant','toilet'],
 'summer_only', 'high'),

(gen_random_uuid(), 'Dalarö Bageri & Café', 'Dalarö', 59.1322, 18.4048,
 'Litet bageri och café i Dalarö centrum, ett stenkast från hamnen. Perfekt frukoststopp innan båtstart eller fika efter hemkomst. Nybakat bröd och hembakade bullar.',
 'April–September: dagligen 7–16.',
 'Nybakat bröd, bullar, kaffe, läsk, enkla smörgåsar.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['dalarö','bageri','frukost','kaffe','fika'],
 'Brödlukten från Dalarö Bageri är det bästa sättet att börja en dag till sjöss – eller avsluta en lång dag hemkommen.',
 'cafe', 'dalaro-bageri-cafe', 'south',
 ARRAY['cafe','bakery'],
 ARRAY['boaters','family','day_trip'],
 ARRAY['cafe'],
 'extended_season', 'medium'),

(gen_random_uuid(), 'Dalarö Värdshus', 'Dalarö', 59.1315, 18.4072,
 'Anrika värdshuset i Dalarö med lång historia. Serverar husmanskost och skärgårdsklassiker i en miljö som andas gamla tiders skärgårdsliv. Populärt för gruppbokningar och middagar.',
 'Maj–Oktober: tis–sön 12–21.',
 'Á la carte, husmanskost, fisk, skaldjur, säsongsrätter.',
 ARRAY['https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800'],
 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800',
 ARRAY['dalarö','värdshus','historia','husmanskost','middag'],
 'Dalarö Värdshus bär på en historia lika lång som skärgårdsturismen – gammaldags i bästa mening.',
 'restaurant', 'dalaro-vardshus', 'south',
 ARRAY['restaurant','dinner_stop'],
 ARRAY['couples','family','groups'],
 ARRAY['restaurant'],
 'extended_season', 'medium'),

-- ════════════════════════════════════════════════
-- NÄMDÖ (1 bränslestation, 0 matplatser → lucka)
-- Stor ö med gästhamn, saknar café/restaurang i datan
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Nämdö Handelsbod & Café', 'Nämdö', 59.1335, 18.6718,
 'Liten handelsbod och café vid Nämdö hamn. Säljer proviant, glass, kaffe och enkla smörgåsar. Det enda matställe på ön och ett obligatoriskt stopp för alla som ankrar vid Nämdö.',
 'Juni–Augusti: dagligen 8–17.',
 'Kaffe, glass, smörgåsar, lokala produkter, proviant.',
 ARRAY['https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800'],
 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
 ARRAY['nämdö','handelsbod','proviant','kaffe','glass'],
 'Nämdö Handelsbod är öns enda matplats och samlingspunkt – ett enkelt stopp med stor roll för alla som passerar.',
 'cafe', 'namdö-handelsbod-cafe', 'middle',
 ARRAY['cafe','provisions','harbor_stop'],
 ARRAY['sailors','boaters','day_trip'],
 ARRAY['cafe','provisions'],
 'summer_only', 'medium'),

-- ════════════════════════════════════════════════
-- TORÖ (1 plats → lägger till Ankarudden)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Torö Ankarudden', 'Torö', 58.8082, 17.8398,
 'Restaurang och caféservering vid Torö Ankarplatsen, en av södra skärgårdens populäraste naturhamnar. Enkelt utbud för båtfolk som ankrar för natten eller dagen.',
 'Juni–Augusti: dagligen 11–19.',
 'Enkel mat, smörgåsar, grillat, kaffe, glass, öl.',
 ARRAY['https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800'],
 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
 ARRAY['torö','naturhamn','ankring','enkel','södra'],
 'Torö Ankarudden är sommarlycka i sin enklaste form – natur, ankrad båt, och enkel mat i solnedgången.',
 'restaurant', 'toro-ankarudden', 'south',
 ARRAY['restaurant','harbor_stop','anchor_stop'],
 ARRAY['sailors','boaters','nature'],
 ARRAY['anchor_area','restaurant'],
 'summer_only', 'medium'),

-- ════════════════════════════════════════════════
-- SVARTSÖ (1 krog → lägger till café)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Svartsö Handelsbod', 'Svartsö', 59.4642, 18.7252,
 'Liten handelsbod vid Svartsö brygga. Säljer proviant, glass, lokala produkter och enkla drycker. Perfekt påfyllningsstopp inför vidare segling mot Finnhamn eller Möja.',
 'Juni–Augusti: dagligen 9–16.',
 'Proviant, glass, kaffe, lokala produkter, konserver.',
 ARRAY['https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800'],
 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800',
 ARRAY['svartsö','handelsbod','proviant','glass','enkel'],
 'Svartsö Handelsbod är öns puls – allt och alla passerar hit vid bryggan.',
 'cafe', 'svartsö-handelsbod', 'middle',
 ARRAY['cafe','provisions'],
 ARRAY['sailors','boaters'],
 ARRAY['provisions'],
 'summer_only', 'medium'),

-- ════════════════════════════════════════════════
-- INGMARSÖ (1 krog → lägger till café/kiosk)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Ingmarsö Sommarbutik', 'Ingmarsö', 59.4708, 18.7342,
 'Liten sommarbutik och kiosk på Ingmarsö. Säljer glass, läsk, kaffe och enklare mat. Ligger nära bryggan och är ett bra komplement till Ingmarsö Krog.',
 'Juni–Augusti: dagligen 10–17.',
 'Glass, kaffe, läsk, enkla tilltugg, proviant.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['ingmarsö','kiosk','glass','enkel','sommar'],
 'En glass vid bryggan på Ingmarsö – det behöver inte vara mer komplicerat än så.',
 'cafe', 'ingmarso-sommarbutik', 'middle',
 ARRAY['cafe','provisions','kiosk'],
 ARRAY['family','boaters','day_trip'],
 ARRAY['provisions'],
 'summer_only', 'low'),

-- ════════════════════════════════════════════════
-- ORNÖ (2 krogar → lägger till bageri/café)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Ornö Hamnkiosk', 'Ornö', 58.9888, 18.3512,
 'Enkel kiosk och glassbod vid Ornö gästhamn. Öppnar tidigt på morgonen för seglare och dagsturister. Kaffe, glass, smörgåsar och lokala souvenirer.',
 'Juni–Augusti: dagligen 7–15.',
 'Kaffe, glass, smörgåsar, enkla tilltugg.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['ornö','kiosk','glass','morgon','hamn'],
 'Morgonkaffe vid Ornö hamn medan solen klättrar upp – dagens bästa kvart.',
 'cafe', 'orno-hamnkiosk', 'south',
 ARRAY['cafe','kiosk'],
 ARRAY['sailors','boaters'],
 ARRAY['cafe'],
 'summer_only', 'low'),

-- ════════════════════════════════════════════════
-- GRINDA (2 platser → lägger till kiosk/café)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Grinda Strandcafé', 'Grinda', 59.4085, 18.5608,
 'Litet strandcafé på Grinda med utsikt över fjärden. Enklare utbud med kaffe, fika och glass. Bra alternativ till Framfickan för en kortare paus.',
 'Juni–Augusti: dagligen 10–17.',
 'Kaffe, fika, glass, smörgåsar.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['grinda','café','strand','fika','glass'],
 'En enkel fika med utsikt på Grinda – precis det man behöver mitt i en seglingsdag.',
 'cafe', 'grinda-strandcafe', 'middle',
 ARRAY['cafe','lunch_stop'],
 ARRAY['family','day_trip','boaters'],
 ARRAY['cafe'],
 'summer_only', 'medium'),

-- ════════════════════════════════════════════════
-- BLIDÖ (2 platser → lägger till café)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Blidö Sommarcafé', 'Blidö', 59.6168, 18.8488,
 'Litet sommarcafé på Blidö med hemlagad mat och fika. Lugn stämning i norra skärgårdens stil – inga krångel, bara god mat och trevliga värdar.',
 'Juni–Augusti: dagligen 9–16.',
 'Kaffe, hembakade bullar, smörgåsar, glass.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['blidö','café','hemlagat','norra','fika'],
 'Blidö Sommarcafé är norra skärgårdens hemtrevnad i en kopp – enkelt, äkta och välgjort.',
 'cafe', 'blido-sommarcafe', 'north',
 ARRAY['cafe'],
 ARRAY['family','boaters','day_trip'],
 ARRAY['cafe'],
 'summer_only', 'medium'),

-- ════════════════════════════════════════════════
-- RUNMARÖ (2 platser → lägger till bryggkiosk)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Runmarö Bryggkiosk', 'Runmarö', 59.3445, 18.7512,
 'Enkel kiosk och glassbod vid Runmarö brygga. Öppnar sommarens alla dagar och är det naturliga stoppet för glass, kaffe och enkla drycker.',
 'Juni–Augusti: dagligen 10–18.',
 'Glass, kaffe, läsk, enkla snacks.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['runmarö','kiosk','glass','enkel'],
 'En sommarkiosk är en sommarkiosk – och Runmarös är precis vad man vill ha efter ett dopp.',
 'cafe', 'runmaro-bryggkiosk', 'middle',
 ARRAY['cafe','kiosk'],
 ARRAY['family','boaters'],
 ARRAY['provisions'],
 'summer_only', 'low'),

-- ════════════════════════════════════════════════
-- NORRA SKÄRGÅRDEN: Arholma Nord (Tier 2)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Arholma Hamnkrog', 'Arholma', 59.8478, 19.1295,
 'Krogen vid Arholmas gästhamn i norra skärgårdens yttersta del. Enkelt utbud, äkta stämning och en av skärgårdens längst bort belägna restauranger. Hit åker man med intention.',
 'Juni–Augusti: dagligen 12–20.',
 'Husmanskost, fisk, räkor, smörgåsar.',
 ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
 ARRAY['arholma','norra','yttre','gästhamn','genuint'],
 'Att äta på Arholma Hamnkrog är att ha kommit dit de flesta bara pratar om att åka – yttersta norra skärgården.',
 'restaurant', 'arholma-hamnkrog', 'north',
 ARRAY['restaurant','harbor_stop'],
 ARRAY['sailors','boaters','adventurers'],
 ARRAY['guest_dock','restaurant'],
 'summer_only', 'medium'),

-- ════════════════════════════════════════════════
-- FURUSUND (1 värdshus → lägger till café)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Furusunds Café & Kiosk', 'Furusund', 59.6668, 18.9168,
 'Litet café och kiosk vid Furusund hamn. Kaffe, glass och enkla smörgåsar – det perfekta alternativet till värdshuset för en snabb paus under passeringen.',
 'Juni–Augusti: dagligen 9–17.',
 'Kaffe, glass, smörgåsar, läsk.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['furusund','café','kiosk','passage','hamn'],
 'En snabb kaffe och glass under Furusund-passeringen – enkel njutning på väg norrut.',
 'cafe', 'furusund-cafe-kiosk', 'north',
 ARRAY['cafe','kiosk'],
 ARRAY['boaters','sailors'],
 ARRAY['cafe'],
 'summer_only', 'low'),

-- ════════════════════════════════════════════════
-- LIDÖ (1 värdshus → lägger till strand/café)
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Lidö Strandservering', 'Lidö', 59.6268, 18.7685,
 'Enkel strandservering på Lidö med utsikt mot havet. Öppen sommarens alla dagar, fokus på glass, dryck och enkla tilltugg. Bra komplement till Lidö Värdshus för de som ankrar en kortare stund.',
 'Juni–Augusti: dagligen 10–18.',
 'Glass, kaffe, läsk, enkla smörgåsar.',
 ARRAY['https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800'],
 'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800',
 ARRAY['lidö','strand','glass','enkel','utsikt'],
 'En glass vid Lidö strand med havet framför dig – ingen krångel, bara sommaren.',
 'cafe', 'lido-strandservering', 'north',
 ARRAY['cafe','harbor_stop'],
 ARRAY['family','boaters','day_trip'],
 ARRAY['cafe'],
 'summer_only', 'low'),

-- ════════════════════════════════════════════════
-- LANDSORT (1 saltbod → lägger till hamncafé)
-- Yttersta posten i söder – viktigt ankarmål
-- ════════════════════════════════════════════════

(gen_random_uuid(), 'Landsort Hamncafé', 'Landsort', 58.7412, 17.8658,
 'Enkelt café vid Landsorts gästhamn, en av skärgårdens mest ikoniska ytterposter. Kaffe, smörgåsar och glass – det enda du behöver efter en lång segling till sydspetsen.',
 'Juni–Augusti: dagligen 8–16.',
 'Kaffe, smörgåsar, glass, varm choklad.',
 ARRAY['https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800'],
 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800',
 ARRAY['landsort','yttersta','fyren','hamn','kafé'],
 'Kaffe vid Landsorts fyr efter seglingen dit – en av de enklaste men mest meningsfulla kaffepauser du kan ha.',
 'cafe', 'landsort-hamncafe', 'south',
 ARRAY['cafe','harbor_stop'],
 ARRAY['sailors','adventurers','boaters'],
 ARRAY['cafe','guest_dock'],
 'summer_only', 'medium')

ON CONFLICT (name) DO NOTHING;

-- ============================================================
-- SVALLA — Lägg till saknade platser på Djurö
-- + Korrigera felaktiga waypoint-koordinater för sydliga rutter
-- Kör i Supabase SQL Editor
-- ============================================================

-- ── Vita Grindarna, Djurö ──────────────────────────────────
INSERT INTO restaurants (
  id, name, island, latitude, longitude,
  description, opening_hours, menu, images, image_url,
  tags, core_experience,
  type, slug, archipelago_region, categories, best_for,
  facilities, seasonality, source_confidence
) VALUES (
  gen_random_uuid(),
  'Vita Grindarna',
  'Djurö',
  59.1952, 18.6963,
  'Populär krog och gästhamn på Djurö nära Stavsnäs. Enkelt och bra med direkt bryggläge och sommarstämning.',
  'Juni–Augusti: dagligen 11–21.',
  'Enkel mat, räkor, smörgåsar, öl och vin.',
  ARRAY['https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800'],
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800',
  ARRAY['lunch','hamn','sommar','enkel'],
  'En klassisk sommarstoppunkt för den som passerar Djurö – bryggläge, enkel mat och avslappnad stämning.',
  'restaurant', 'vita-grindarna-djuro', 'middle',
  ARRAY['restaurant','harbor_stop','lunch_stop'],
  ARRAY['boaters','family','day_trip'],
  ARRAY['guest_dock','restaurant','toilet'],
  'summer_only', 'medium'
)
ON CONFLICT (slug) DO UPDATE SET
  latitude  = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  name      = EXCLUDED.name,
  island    = EXCLUDED.island;

-- ── Motorverkstan på Djurö ────────────────────────────────
-- Bistro & bar vid Djurö – norra sidan av ön nära bryggan
INSERT INTO restaurants (
  id, name, island, latitude, longitude,
  description, opening_hours, menu, images, image_url,
  tags, core_experience,
  type, slug, archipelago_region, categories, best_for,
  facilities, seasonality, source_confidence
) VALUES (
  gen_random_uuid(),
  'Motorverkstan på Djurö',
  'Djurö',
  59.2005, 18.7080,
  'Unik bistro & bar i en gammal motorverkstadslokal på Djurö. Ombyggd industrilokal med karaktär, god mat och sommarfeeling.',
  'Juni–Augusti: tis–sön 12–22.',
  'Säsongsmat, hamburgare, fisk, craft beer och cocktails.',
  ARRAY['https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800'],
  'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=800',
  ARRAY['bar','bistro','djurö','industri','sommar'],
  'Industrilokal omgjord till bistro – ett av de mest udda och trevliga ställena i mellersta skärgården.',
  'bar', 'motorverkstan-djuro', 'middle',
  ARRAY['bar','restaurant','hidden_gem'],
  ARRAY['friends','boaters','couples'],
  ARRAY['bar','restaurant'],
  'summer_only', 'medium'
)
ON CONFLICT (slug) DO UPDATE SET
  latitude  = EXCLUDED.latitude,
  longitude = EXCLUDED.longitude,
  name      = EXCLUDED.name,
  island    = EXCLUDED.island;


-- ============================================================
-- Korrigera waypoints för sydliga rutter (felaktiga longitudes)
-- Rutter gick västerut (lng ~17.9) istället för östligt/sydöst
-- Utö ligger vid ~58.95°N, 18.30°E — INTE vid 17.89°E
-- ============================================================

-- ── Stockholm → Utö ──────────────────────────────────────
UPDATE tours SET waypoints = '[
  {"lat":59.3285,"lng":18.0726,"name":"Strömkajen","description":"Avgång Stockholm"},
  {"lat":59.2800,"lng":18.0900},
  {"lat":59.2100,"lng":18.1800},
  {"lat":59.1400,"lng":18.2500},
  {"lat":59.0500,"lng":18.2900},
  {"lat":58.9500,"lng":18.3000,"name":"Utö","description":"Södra skärgårdens pärla","restaurant":"Utö Värdshus"}
]'::jsonb WHERE slug = 'stockholm-uto';

-- ── Stockholm → Utö (weekend) ────────────────────────────
UPDATE tours SET waypoints = '[
  {"lat":59.3285,"lng":18.0726,"name":"Strömkajen","description":"Dag 1 avgång"},
  {"lat":59.2800,"lng":18.0900},
  {"lat":59.2100,"lng":18.1800},
  {"lat":59.1350,"lng":18.2900,"name":"Dalarö","description":"Mellanlandning"},
  {"lat":59.0500,"lng":18.2900},
  {"lat":58.9500,"lng":18.3000,"name":"Utö","description":"Övernattning, klippbad och natur","restaurant":"Utö Värdshus"}
]'::jsonb WHERE slug = 'stockholm-uto-weekend';

-- ── Fix eventuella andra rutter med longitudes < 17.5 (säkerhets-fix) ──
-- Dessa är garanterat fel för Stockholm-skärgården
UPDATE tours
SET waypoints = '[]'::jsonb
WHERE EXISTS (
  SELECT 1 FROM jsonb_array_elements(waypoints) AS wp
  WHERE (wp->>'lng')::float < 17.5
    OR  (wp->>'lng')::float > 21.0
    OR  (wp->>'lat')::float < 58.0
    OR  (wp->>'lat')::float > 61.0
)
AND waypoints != '[]'::jsonb;

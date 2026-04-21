-- ============================================================
-- seed-westcoast-tours.sql
-- 6 seglingsrutter: Bohuslän, Blekinge, Öresund
-- Idempotent: ON CONFLICT (id) DO UPDATE
-- Kör i Supabase SQL Editor
-- ============================================================

INSERT INTO public.routes (
  id, name, description, distance, duration, difficulty,
  boat_types, waypoints, restaurant_ids
) VALUES

-- ── 1. Göteborg → Marstrand ────────────────────────────────
(
  'b2000000-0000-0000-0000-000000000001',
  'Göteborg → Marstrand',
  'Klassisk dagstur ut längs Hisingskanalen och ut i Bohusläns sydliga skärgård. Passera Björkö och Hönö innan du ankrar vid Carlstens fästning i Marstrand. Perfekt som introduktion till västkusten med lugnt vatten och vacker kustlinje.',
  15.0, 90, 'Lätt',
  ARRAY['Motorbåt','Segelbåt','RIB','Katamaran'],
  '[
    {"lat":57.7089,"lng":11.9746,"name":"Göteborg (Lilla Bommen)"},
    {"lat":57.6983,"lng":11.8521,"name":"Hisingskanalen"},
    {"lat":57.6844,"lng":11.6677,"name":"Hönö"},
    {"lat":57.7250,"lng":11.6200,"name":"Brännö passage"},
    {"lat":57.8836,"lng":11.5893,"name":"Marstrand"}
  ]'::jsonb,
  '{}'::uuid[]
),

-- ── 2. Marstrand → Smögen via Gullholmen ──────────────────
(
  'b2000000-0000-0000-0000-000000000002',
  'Marstrand → Smögen via Gullholmen',
  'En av västkustens klassiska etapper — norrut längs Bohuslänskusten med stopp i sagolika Gullholmen och hamnfika i Lysekil. Avslutas i Smögen med räkmacka på bryggan i solnedgången. Plan för 2 dagar med övernattning i Lysekil eller Grundsund.',
  55.0, 360, 'Medel',
  ARRAY['Segelbåt','Motorbåt','Katamaran'],
  '[
    {"lat":57.8836,"lng":11.5893,"name":"Marstrand"},
    {"lat":57.9500,"lng":11.5400,"name":"Tjörn (Rönnäng)"},
    {"lat":58.0178,"lng":11.5489,"name":"Gullholmen"},
    {"lat":58.0800,"lng":11.4900,"name":"Grundsund"},
    {"lat":58.2760,"lng":11.4384,"name":"Lysekil"},
    {"lat":58.3050,"lng":11.3500,"name":"Skaftö passage"},
    {"lat":58.3547,"lng":11.2228,"name":"Smögen"}
  ]'::jsonb,
  '{}'::uuid[]
),

-- ── 3. Smögen → Kosterfjorden ─────────────────────────────
(
  'b2000000-0000-0000-0000-000000000003',
  'Smögen → Kosterfjorden',
  'Nordvästkustens mest dramatiska segleled — öppna horisonter och vildvacker kust. Passera Fjällbacka och Hamburgsund innan du når Nordens enda marina nationalpark: Kosterfjorden. Ta tid för dykning eller kajakpaddling kring Sydkoster. 2 dagars tur rekommenderas.',
  48.0, 330, 'Medel',
  ARRAY['Segelbåt','Motorbåt','Katamaran'],
  '[
    {"lat":58.3547,"lng":11.2228,"name":"Smögen"},
    {"lat":58.4800,"lng":11.2600,"name":"Käringön"},
    {"lat":58.5997,"lng":11.2869,"name":"Fjällbacka"},
    {"lat":58.6865,"lng":11.2727,"name":"Hamburgsund"},
    {"lat":58.7500,"lng":11.1800,"name":"Rossö"},
    {"lat":58.8818,"lng":11.0667,"name":"Sydkoster (Kosterfjorden)"}
  ]'::jsonb,
  '{}'::uuid[]
),

-- ── 4. Kosterfjorden-ringen (avancerad) ───────────────────
(
  'b2000000-0000-0000-0000-000000000004',
  'Kosterfjorden-ringen',
  'Komplett rundtur kring Kosteröarna och Strömstad — en av Sveriges mest spektakulära seglingsupplevelser. Öppet hav, kraftiga tidvattenströmmar och vild kustlinje. Reservera 2–3 dagar och kontrollera väderprognoser noggrant. Krävande navigation men oslagbar vy.',
  80.0, 540, 'Svår',
  ARRAY['Segelbåt','Katamaran'],
  '[
    {"lat":58.9339,"lng":11.1648,"name":"Strömstad"},
    {"lat":58.9200,"lng":11.0900,"name":"Nordkoster"},
    {"lat":58.8818,"lng":11.0667,"name":"Sydkoster"},
    {"lat":58.8200,"lng":11.0200,"name":"Yttre Ursholmen"},
    {"lat":58.7800,"lng":11.1000,"name":"Kosterfjordens ytterkant"},
    {"lat":58.8000,"lng":11.1800,"name":"Rossö"},
    {"lat":58.9339,"lng":11.1648,"name":"Strömstad"}
  ]'::jsonb,
  '{}'::uuid[]
),

-- ── 5. Karlskrona → Hanö runt ─────────────────────────────
(
  'b2000000-0000-0000-0000-000000000005',
  'Karlskrona → Hanö runt',
  'Blekinges klassiska seglelled — ut i Östersjön till den dramatiska ön Hanö och hem via Utlängan och Kristianopels historiska gästhamn. Hanö är obebyggd och naturreservat med vackra klippor och ren Östersjöluft. Planera för övernattning vid naturhamnen. Kräver god väderbedömning ut i Östersjön.',
  62.0, 420, 'Medel',
  ARRAY['Segelbåt','Motorbåt','Katamaran'],
  '[
    {"lat":56.1613,"lng":15.5869,"name":"Karlskrona (Stumholmen)"},
    {"lat":56.1000,"lng":15.7200,"name":"Utlängan fyr"},
    {"lat":56.0175,"lng":14.8456,"name":"Hanö (naturhamn)"},
    {"lat":56.1000,"lng":15.0500,"name":"Åhus passage"},
    {"lat":56.2500,"lng":15.9800,"name":"Kristianopel"},
    {"lat":56.1613,"lng":15.5869,"name":"Karlskrona"}
  ]'::jsonb,
  '{}'::uuid[]
),

-- ── 6. Malmö → Ven → Landskrona (Öresund) ────────────────
(
  'b2000000-0000-0000-0000-000000000006',
  'Malmö → Ven → Landskrona',
  'Öresunds pärlor på en dag — kryss under Öresundsbron och kurs mot den platta ön Ven mitt i sundet. Besök Tycho Brahes gamla observatorieort Uranienborg och ät lunch vid Kyrkbackens hamn. Hem via Landskrona och dess medeltida citadell. Perfekt för nybörjare — öppet vatten men välmärkt led.',
  28.0, 210, 'Lätt',
  ARRAY['Segelbåt','Motorbåt','RIB','Katamaran'],
  '[
    {"lat":55.6050,"lng":13.0038,"name":"Malmö (Limhamn)"},
    {"lat":55.6700,"lng":12.9200,"name":"Under Öresundsbron"},
    {"lat":55.9183,"lng":12.6953,"name":"Ven (Kyrkbacken)"},
    {"lat":55.8704,"lng":12.8308,"name":"Landskrona Marina"}
  ]'::jsonb,
  '{}'::uuid[]
)

ON CONFLICT (id) DO UPDATE SET
  name        = EXCLUDED.name,
  description = EXCLUDED.description,
  distance    = EXCLUDED.distance,
  duration    = EXCLUDED.duration,
  difficulty  = EXCLUDED.difficulty,
  boat_types  = EXCLUDED.boat_types,
  waypoints   = EXCLUDED.waypoints;

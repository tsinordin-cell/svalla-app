-- find-bad-coords.sql — hittar misstänkta koordinater i Supabase
--
-- Körs i Supabase Studio SQL Editor. RÄTTAR INTE — bara identifierar.
-- Tom granskar utdata och fixar manuellt eller via separat UPDATE-script.
--
-- Stockholms skärgård bounding box (samma som validate-coords.ts):
--   58.6–60.0°N, 17.0–19.6°E
--
-- Använder en CTE för att gå igenom alla tabeller med koord och
-- klassificera fel-typen. Kör hela filen — varje resultat kommer i
-- separat table-output i Supabase Studio.

-- ── 1. Restaurants utanför skärgården ───────────────────────────────
SELECT
  'restaurants' AS source,
  id,
  name,
  lat,
  lng,
  CASE
    WHEN lat = 0 AND lng = 0 THEN 'Null Island (saknar koord)'
    WHEN lng > 21 THEN 'Åbolands skärgård (Finland)'
    WHEN lng < 12 AND lat > 58 THEN 'Norge eller västkusten'
    WHEN lat < 58.6 THEN 'För långt söder ut'
    WHEN lat > 60.0 THEN 'För långt norr ut'
    WHEN lng < 17.0 THEN 'För långt väster (inland?)'
    WHEN lng > 19.6 THEN 'För långt öster (öppet hav?)'
    ELSE 'Utanför skärgården'
  END AS reason
FROM restaurants
WHERE lat IS NOT NULL AND lng IS NOT NULL
  AND (
    lat NOT BETWEEN 58.6 AND 60.0
    OR lng NOT BETWEEN 17.0 AND 19.6
  )
ORDER BY reason, name;

-- ── 2. Places utanför skärgården (om kolumnen finns) ────────────────
-- Kommentera ut om tabellen `places` inte har koord-kolumner
SELECT
  'places' AS source,
  id,
  name,
  lat,
  lng,
  CASE
    WHEN lat = 0 AND lng = 0 THEN 'Null Island'
    WHEN lng > 21 THEN 'Åboland'
    WHEN lng < 12 THEN 'Västkusten/Norge'
    ELSE 'Utanför skärgården'
  END AS reason
FROM places
WHERE lat IS NOT NULL AND lng IS NOT NULL
  AND (
    lat NOT BETWEEN 58.6 AND 60.0
    OR lng NOT BETWEEN 17.0 AND 19.6
  )
ORDER BY reason, name;

-- ── 3. Tours med felaktiga waypoints ────────────────────────────────
-- Tours kan ha route_points som JSONB-array. Vi hämtar första punkten
-- och kollar om den ligger i skärgården.
SELECT
  'tours' AS source,
  id,
  title,
  (route_points->0->>'lat')::float AS first_lat,
  (route_points->0->>'lng')::float AS first_lng
FROM tours
WHERE route_points IS NOT NULL
  AND jsonb_array_length(route_points) > 0
  AND (
    (route_points->0->>'lat')::float NOT BETWEEN 58.6 AND 60.0
    OR (route_points->0->>'lng')::float NOT BETWEEN 17.0 AND 19.6
  )
ORDER BY title;

-- ── 4. Trips med felaktig första GPS-punkt ──────────────────────────
SELECT
  'trips' AS source,
  id,
  user_id,
  location_name,
  (route_points->0->>'lat')::float AS first_lat,
  (route_points->0->>'lng')::float AS first_lng,
  created_at
FROM trips
WHERE route_points IS NOT NULL
  AND jsonb_array_length(route_points) > 0
  AND (
    (route_points->0->>'lat')::float NOT BETWEEN 58.6 AND 60.0
    OR (route_points->0->>'lng')::float NOT BETWEEN 17.0 AND 19.6
  )
ORDER BY created_at DESC
LIMIT 100;

-- ── 5. Sammanfattning per tabell ────────────────────────────────────
SELECT
  'restaurants' AS source,
  COUNT(*) AS bad_rows
FROM restaurants
WHERE lat IS NOT NULL AND lng IS NOT NULL
  AND (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
UNION ALL
SELECT 'places', COUNT(*)
FROM places
WHERE lat IS NOT NULL AND lng IS NOT NULL
  AND (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
UNION ALL
SELECT 'tours', COUNT(*)
FROM tours
WHERE route_points IS NOT NULL
  AND jsonb_array_length(route_points) > 0
  AND (
    (route_points->0->>'lat')::float NOT BETWEEN 58.6 AND 60.0
    OR (route_points->0->>'lng')::float NOT BETWEEN 17.0 AND 19.6
  );

-- ── ANTECKNINGAR FÖR FIX ────────────────────────────────────────────
--
-- Trips kommer sannolikt INTE behöva fixas — om en användare loggat en
-- riktig tur i Norge eller Finland är det legitim data. Kolla manuellt.
--
-- Restaurants och Places: granska varje rad. Ofta är felet att en geocoder
-- (eller manuell ifyllning) använt fel koord. Fixa via:
--
--   UPDATE restaurants SET lat = X.XXXX, lng = Y.YYYY WHERE id = '...';
--
-- Tours: om route_points är fel överväg att soft-delete turen istället
-- för att UPDATE:a — det är användarens data.

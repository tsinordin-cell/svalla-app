-- Migration: gps_heat RPC för trips-heatmap
-- Datum: 2026-05-02
--
-- Aggregerar GPS-punkter från trips.route_points till en grid baserat på zoom-nivå.
-- Drivar /upptack heatmap-toggle. Detta är Svallas unika differentiator —
-- community-trip-data ingen annan har för svensk skärgård.
--
-- Cellstorlek per zoom:
--   zoom >= 14:  0.005°  (~500 m)   — gata-nivå
--   zoom >= 12:  0.01°   (~1 km)
--   zoom >= 10:  0.025°  (~2.5 km)  — default upptäck-zoom
--   zoom >=  8:  0.05°   (~5 km)
--   else:        0.1°    (~10 km)   — översikt
--
-- Kallad av /api/discovery?type=heat. Returnerar max 5000 cells.

CREATE OR REPLACE FUNCTION public.gps_heat(
  min_lat double precision,
  min_lng double precision,
  max_lat double precision,
  max_lng double precision,
  zoom    integer
)
RETURNS TABLE (
  cell_lat double precision,
  cell_lng double precision,
  weight   integer
)
LANGUAGE sql
STABLE
AS $$
  WITH cs AS (
    SELECT CASE
      WHEN zoom >= 14 THEN 0.005
      WHEN zoom >= 12 THEN 0.01
      WHEN zoom >= 10 THEN 0.025
      WHEN zoom >=  8 THEN 0.05
      ELSE 0.1
    END AS s
  ),
  pts AS (
    SELECT
      (rp->>'lat')::double precision AS lat,
      (rp->>'lng')::double precision AS lng,
      t.user_id
    FROM public.trips t
    CROSS JOIN LATERAL jsonb_array_elements(t.route_points) rp
    WHERE t.deleted_at IS NULL
      AND t.route_points IS NOT NULL
      AND jsonb_typeof(t.route_points) = 'array'
      AND (rp->>'lat') IS NOT NULL
      AND (rp->>'lng') IS NOT NULL
      AND (rp->>'lat')::double precision BETWEEN min_lat AND max_lat
      AND (rp->>'lng')::double precision BETWEEN min_lng AND max_lng
  )
  SELECT
    floor(lat / (SELECT s FROM cs)) * (SELECT s FROM cs) AS cell_lat,
    floor(lng / (SELECT s FROM cs)) * (SELECT s FROM cs) AS cell_lng,
    count(*)::integer AS weight
  FROM pts
  GROUP BY 1, 2
  ORDER BY 3 DESC
  LIMIT 5000
$$;

GRANT EXECUTE ON FUNCTION public.gps_heat TO anon, authenticated, service_role;

-- Verifiera
SELECT 'gps_heat RPC redo' AS status,
       count(*) AS test_cells_stockholm
FROM public.gps_heat(58.5, 17.5, 60.0, 19.5, 10);

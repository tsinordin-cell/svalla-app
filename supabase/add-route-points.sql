-- ── Lägg till route_points på trips ─────────────────────────────────────────
-- Lagrar en förenklad version av GPS-rutten (max ~80 punkter) direkt på turen.
-- Används för att rendera mini-kartor i feed-kort utan extra joins/fetches.

ALTER TABLE trips
  ADD COLUMN IF NOT EXISTS route_points JSONB DEFAULT NULL;

-- Kommentar
COMMENT ON COLUMN trips.route_points IS
  'Förenklad GPS-rutt [{lat, lng}] för visning i feed. Max ~80 punkter. NULL om turen loggades utan GPS eller är en äldre tur.';

-- Index för framtida geografiska queries (valfritt, inte nödvändigt nu)
-- CREATE INDEX IF NOT EXISTS idx_trips_route_points ON trips USING gin(route_points);

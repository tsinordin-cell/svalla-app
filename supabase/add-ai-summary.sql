-- ── AI-summering på turer ────────────────────────────────────────────────────
ALTER TABLE trips ADD COLUMN IF NOT EXISTS ai_summary TEXT;
COMMENT ON COLUMN trips.ai_summary IS 'AI-genererad turberättelse från Claude';

-- ── Reverse-geocodat platsnamn på stopp ───────────────────────────────────────
ALTER TABLE stops ADD COLUMN IF NOT EXISTS place_name TEXT;
COMMENT ON COLUMN stops.place_name IS 'Platsnamn från Nominatim reverse geocoding (t.ex. Sandhamns gästhamn)';

-- Kör detta i Supabase SQL Editor

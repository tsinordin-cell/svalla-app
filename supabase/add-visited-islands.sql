-- ── Besökta öar ───────────────────────────────────────────────────────────────
-- Spårar vilka öar varje användare har besökt via GPS-spårning

CREATE TABLE IF NOT EXISTS visited_islands (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id     uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  island_slug text NOT NULL,
  trip_id     uuid REFERENCES trips(id) ON DELETE SET NULL,
  visited_at  timestamptz NOT NULL DEFAULT now(),

  UNIQUE (user_id, island_slug)   -- en rad per ö per användare
);

-- Snabb lookup per användare
CREATE INDEX IF NOT EXISTS visited_islands_user_id_idx ON visited_islands (user_id);
CREATE INDEX IF NOT EXISTS visited_islands_island_slug_idx ON visited_islands (island_slug);

-- RLS
ALTER TABLE visited_islands ENABLE ROW LEVEL SECURITY;

-- Alla kan se besöksdata (för att visa "X seglare har besökt" på ö-sidor)
CREATE POLICY "visited_islands_select_all"
  ON visited_islands FOR SELECT
  USING (true);

-- Bara ägaren kan insertera/uppdatera sina egna besök
CREATE POLICY "visited_islands_insert_own"
  ON visited_islands FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "visited_islands_delete_own"
  ON visited_islands FOR DELETE
  USING (auth.uid() = user_id);

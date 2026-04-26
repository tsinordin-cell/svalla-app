-- ============================================================
-- planned_routes — tabell + RLS
-- Kör i Supabase Dashboard → SQL Editor
-- ============================================================

-- Skapa tabellen om den inte finns
CREATE TABLE IF NOT EXISTS public.planned_routes (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  start_name      text NOT NULL,
  end_name        text NOT NULL,
  start_lat       float8 NOT NULL,
  start_lng       float8 NOT NULL,
  end_lat         float8 NOT NULL,
  end_lng         float8 NOT NULL,
  interests       text[] NOT NULL DEFAULT '{}',
  suggested_stops jsonb,
  status          text NOT NULL DEFAULT 'published',
  created_at      timestamptz NOT NULL DEFAULT now()
);

-- Lägg till status-kolumnen om den saknas (idempotent)
ALTER TABLE public.planned_routes
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'published';

-- Row Level Security
ALTER TABLE public.planned_routes ENABLE ROW LEVEL SECURITY;

-- Alla kan läsa publicerade rutter (anonyma + inloggade)
DROP POLICY IF EXISTS "planned_routes_select_published" ON public.planned_routes;
CREATE POLICY "planned_routes_select_published"
  ON public.planned_routes FOR SELECT
  USING (status = 'published');

-- Alla kan skapa rutter (feature är öppen — anonymous + inloggade)
DROP POLICY IF EXISTS "planned_routes_insert_any" ON public.planned_routes;
CREATE POLICY "planned_routes_insert_any"
  ON public.planned_routes FOR INSERT
  WITH CHECK (true);

-- Bara API-servern uppdaterar suggested_stops (via service role / anon key på server)
DROP POLICY IF EXISTS "planned_routes_update_stops" ON public.planned_routes;
CREATE POLICY "planned_routes_update_stops"
  ON public.planned_routes FOR UPDATE
  USING (true)
  WITH CHECK (true);

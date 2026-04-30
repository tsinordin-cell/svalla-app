-- ============================================================
-- SVALLA — Migration: Events-utökning + Articles (redaktionellt innehåll)
-- Bygger vidare på befintlig public.events från migration-social-v2.sql
-- Lägger till redaktionella fält + ny tabell public.articles ("Sthlmare tipsar")
-- Kör i Supabase SQL Editor
-- ============================================================

-- ============================================================
-- 1. EVENTS — lägg till redaktionella fält (tabellen finns sedan v2)
--    Befintliga kolumner: id, slug, title, description, image, starts_at,
--    ends_at, location_name, lat, lng, club_id, created_by, created_at
-- ============================================================
ALTER TABLE public.events
  ADD COLUMN IF NOT EXISTS body_md        text,
  ADD COLUMN IF NOT EXISTS category       text NOT NULL DEFAULT 'other',
  ADD COLUMN IF NOT EXISTS cover_image    text,
  ADD COLUMN IF NOT EXISTS island         text,
  ADD COLUMN IF NOT EXISTS organizer_name text,
  ADD COLUMN IF NOT EXISTS url            text,
  ADD COLUMN IF NOT EXISTS price_info     text,
  ADD COLUMN IF NOT EXISTS tags           text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS published      boolean DEFAULT true,
  ADD COLUMN IF NOT EXISTS updated_at     timestamptz DEFAULT now() NOT NULL;

CREATE INDEX IF NOT EXISTS idx_events_category  ON public.events (category);
CREATE INDEX IF NOT EXISTS idx_events_island    ON public.events (island);
CREATE INDEX IF NOT EXISTS idx_events_published ON public.events (published);


-- ============================================================
-- 2. ARTICLES — redaktionellt innehåll: "Sthlmare tipsar", guider
-- ============================================================
CREATE TABLE IF NOT EXISTS public.articles (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          text UNIQUE NOT NULL,
  title         text NOT NULL CHECK (length(title) BETWEEN 3 AND 200),
  excerpt       text CHECK (length(excerpt) <= 400),
  body_md       text NOT NULL,                       -- markdown
  cover_image   text,
  author_id     uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  author_name   text,                                 -- fallback om ej Svalla-användare
  category      text DEFAULT 'guide',                 -- guide, tips, historia, recept, intervju
  tags          text[]  DEFAULT '{}',
  reading_min   integer,                              -- uppskattad lästid
  published     boolean DEFAULT false,
  published_at  timestamptz,
  created_at    timestamptz DEFAULT now() NOT NULL,
  updated_at    timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_articles_published_at ON public.articles (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category     ON public.articles (category);
CREATE INDEX IF NOT EXISTS idx_articles_published    ON public.articles (published);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Articles public read"         ON public.articles;
DROP POLICY IF EXISTS "Articles author read drafts"  ON public.articles;
DROP POLICY IF EXISTS "Articles author insert"       ON public.articles;
DROP POLICY IF EXISTS "Articles author update"       ON public.articles;
DROP POLICY IF EXISTS "Articles author delete"       ON public.articles;

-- Publikt: alla kan läsa publicerade artiklar
CREATE POLICY "Articles public read"
  ON public.articles FOR SELECT
  USING (published = true);

-- Författare kan läsa sina egna utkast
CREATE POLICY "Articles author read drafts"
  ON public.articles FOR SELECT
  USING (auth.uid() = author_id);

CREATE POLICY "Articles author insert"
  ON public.articles FOR INSERT
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Articles author update"
  ON public.articles FOR UPDATE
  USING (auth.uid() = author_id)
  WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Articles author delete"
  ON public.articles FOR DELETE
  USING (auth.uid() = author_id);


-- ============================================================
-- 3. updated_at trigger (standard i Svalla)
-- ============================================================
CREATE OR REPLACE FUNCTION public.tg_touch_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS events_updated_at   ON public.events;
CREATE TRIGGER events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.tg_touch_updated_at();

DROP TRIGGER IF EXISTS articles_updated_at ON public.articles;
CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON public.articles
  FOR EACH ROW EXECUTE FUNCTION public.tg_touch_updated_at();


-- ============================================================
-- 4. Seed-exempel (borttagbart, visar strukturen)
-- ============================================================
INSERT INTO public.articles (slug, title, excerpt, body_md, category, author_name, reading_min, published, published_at)
VALUES (
  'sandhamn-guide-2026',
  'Helgen på Sandhamn — allt du behöver veta',
  'Var du äter, lägger till, badar och fikar på skärgårdens mest klassiska ö.',
  E'# Sandhamn\n\nEtt av skärgårdens mest älskade resmål. Här är vår guide för en perfekt helg.\n\n## Att äta\n- **Sandhamns Värdshus** — klassikern med utsikt över hamnen.\n- **Seglarhotellet** — lunchbuffé med skärgårdsklassiker.\n\n## Att bo\n- **Sandhamn Seglarhotellet** — centralt vid hamnen.\n\n## Att göra\n- Bada från klipporna vid Trouville.\n- Vandra runt ön (~5 km).',
  'guide',
  'Svalla-redaktionen',
  4,
  true,
  now()
)
ON CONFLICT (slug) DO NOTHING;

-- Befintlig /event-sida hanterar events-inserts via UI.
-- Om du vill seed:a ett redaktionellt event direkt i DB:
INSERT INTO public.events (slug, title, description, category, island, location_name, starts_at, ends_at, organizer_name, price_info, published)
VALUES (
  'midsommar-grinda-2026',
  'Midsommarfirande på Grinda',
  'Traditionellt midsommarfirande med dans kring stången, sillunch och lokal musik.',
  'midsommar',
  'Grinda',
  'Grinda Värdshus',
  '2026-06-19 12:00:00+02',
  '2026-06-19 22:00:00+02',
  'Grinda Värdshus',
  'Gratis entré',
  true
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Klart!
-- ============================================================

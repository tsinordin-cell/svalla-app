-- 2026-05-27 — Polish restaurants-tabellen för plats-sidor (#242)
--
-- Tre saker:
-- 1. Index på slug — sitemap + /upptack/[id] gör full table scan utan det.
-- 2. updated_at-kolumn — sitemap.ts läser den men den finns inte → faller till now.
-- 3. UNIQUE-constraint på slug — annars tystar slug-konflikter i prod.
--
-- Idempotent: säker att köra flera gånger.

-- ── 1. Index ───────────────────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS restaurants_slug_idx
  ON public.restaurants(slug)
  WHERE slug IS NOT NULL;

-- ── 2. updated_at-kolumn + trigger ──────────────────────────────────────────
-- Sitemap.ts:354 läser r.updated_at men kolumnen finns inte → lastModified
-- fallbackar till new Date() vid varje request. Lägg kolumn + auto-update.

ALTER TABLE public.restaurants
  ADD COLUMN IF NOT EXISTS updated_at timestamptz DEFAULT now() NOT NULL;

-- Backfill för existerande rader: använd created_at om det finns, annars now()
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'restaurants' AND column_name = 'created_at'
  ) THEN
    UPDATE public.restaurants SET updated_at = COALESCE(created_at, now()) WHERE updated_at IS NULL OR updated_at = now();
  END IF;
END $$;

-- Trigger: bumpa updated_at automatiskt vid UPDATE
CREATE OR REPLACE FUNCTION public.touch_restaurants_updated_at()
RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS restaurants_touch_updated_at ON public.restaurants;
CREATE TRIGGER restaurants_touch_updated_at
  BEFORE UPDATE ON public.restaurants
  FOR EACH ROW EXECUTE FUNCTION public.touch_restaurants_updated_at();

-- ── 3. UNIQUE på slug ──────────────────────────────────────────────────────
-- Försöker bara om inget duplikat finns. Om duplikat: logga och hoppa över —
-- admin måste lösa innan UNIQUE kan läggas.

DO $$
DECLARE
  dup_count int;
BEGIN
  SELECT count(*) INTO dup_count
  FROM (
    SELECT slug FROM public.restaurants
    WHERE slug IS NOT NULL
    GROUP BY slug HAVING count(*) > 1
  ) AS dups;

  IF dup_count > 0 THEN
    RAISE NOTICE 'restaurants.slug: % duplicates finns — skipping UNIQUE constraint. Kör SELECT slug, count(*) FROM restaurants WHERE slug IS NOT NULL GROUP BY slug HAVING count(*) > 1 för att lösa.', dup_count;
  ELSE
    IF NOT EXISTS (
      SELECT 1 FROM pg_constraint WHERE conname = 'restaurants_slug_unique'
    ) THEN
      ALTER TABLE public.restaurants
        ADD CONSTRAINT restaurants_slug_unique UNIQUE (slug);
    END IF;
  END IF;
END $$;

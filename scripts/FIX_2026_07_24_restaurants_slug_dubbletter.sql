-- ============================================================================
-- FIX: restaurants.slug-dubbletter
-- Kör hela filen i Supabase SQL Editor. Säker: inga DELETE, ingen rad tas bort.
-- ============================================================================
--
-- PROBLEM
--   restaurants.slug har dubbletter. sitemap.ts bygger URL som
--   /upptack/<slug || id>, så två rader med samma slug pekar på samma URL.
--   Det blockerar också UNIQUE-constraintet i migration 20260527000001,
--   som medvetet hoppar över sig självt så länge dubbletter finns.
--
-- VAD SCRIPTET GÖR
--   Äldsta raden per slug behåller sin slug. Övriga får ett numrerat suffix
--   (grebbestad-2, grebbestad-3 ...). Suffixet räknas upp tills det är ledigt,
--   så en redan existerande 'grebbestad-2' krockar inte. Sedan låses tabellen
--   med UNIQUE så problemet inte kan återuppstå.
--
--   Ingen rad raderas. Är två rader i själva verket samma plats kan du slå
--   ihop dem manuellt efteråt — då har du fortfarande båda kvar.
-- ============================================================================


-- ── STEG 1 · DIAGNOS (läser bara) ───────────────────────────────────────────
-- Kör gärna denna ensam först om du vill se vad som kommer ändras.

SELECT
  r.slug,
  count(*) OVER (PARTITION BY r.slug) AS antal_med_denna_slug,
  r.id,
  r.name,
  r.island,
  r.created_at
FROM public.restaurants r
WHERE r.slug IN (
  SELECT slug
  FROM public.restaurants
  WHERE slug IS NOT NULL
  GROUP BY slug
  HAVING count(*) > 1
)
ORDER BY r.slug, r.created_at NULLS LAST, r.id;


-- ── STEG 2 · FIX ────────────────────────────────────────────────────────────

DO $$
DECLARE
  rec        record;
  ny_slug    text;
  raknare    int;
  antal      int := 0;
BEGIN
  FOR rec IN
    SELECT id, slug
    FROM (
      SELECT
        id,
        slug,
        row_number() OVER (
          PARTITION BY slug
          ORDER BY created_at NULLS LAST, id
        ) AS rn
      FROM public.restaurants
      WHERE slug IS NOT NULL
    ) t
    WHERE rn > 1
  LOOP
    raknare := 2;
    LOOP
      ny_slug := rec.slug || '-' || raknare;
      EXIT WHEN NOT EXISTS (
        SELECT 1 FROM public.restaurants WHERE slug = ny_slug
      );
      raknare := raknare + 1;
    END LOOP;

    UPDATE public.restaurants SET slug = ny_slug WHERE id = rec.id;
    antal := antal + 1;
    RAISE NOTICE 'Bytte slug: % -> %  (id %)', rec.slug, ny_slug, rec.id;
  END LOOP;

  RAISE NOTICE 'Klart. % rader fick ny slug.', antal;
END $$;


-- ── STEG 3 · LÅS MED UNIQUE ─────────────────────────────────────────────────

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM public.restaurants
    WHERE slug IS NOT NULL
    GROUP BY slug HAVING count(*) > 1
  ) THEN
    RAISE EXCEPTION 'Dubbletter finns kvar — constraint läggs inte på. Kör steg 1 igen.';
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'restaurants_slug_unique'
  ) THEN
    ALTER TABLE public.restaurants
      ADD CONSTRAINT restaurants_slug_unique UNIQUE (slug);
    RAISE NOTICE 'UNIQUE-constraint tillagt.';
  ELSE
    RAISE NOTICE 'UNIQUE-constraint fanns redan.';
  END IF;
END $$;


-- ── STEG 4 · VERIFIERING ────────────────────────────────────────────────────
-- Ska ge noll rader. Gör den det är allt klart.

SELECT slug, count(*) AS antal
FROM public.restaurants
WHERE slug IS NOT NULL
GROUP BY slug
HAVING count(*) > 1;


-- ============================================================================
-- EFTERÅT
--   sitemap.ts deduplicerar redan på URL (commit b9f5057), så GSC-felet är
--   borta oavsett. När detta script körts är även databasen ren, och varje
--   plats når sin egen unika URL. Trigga en ny Vercel-deploy eller vänta ut
--   revalidate så byggs sitemap om med de nya sluggarna.
-- ============================================================================

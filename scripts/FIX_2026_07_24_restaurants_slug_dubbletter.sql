-- FIX_2026_07_24_restaurants_slug_dubbletter.sql
--
-- PROBLEM
-- restaurants.slug har dubbletter. sitemap.ts:388 bygger URL som
-- `/upptack/${r.slug || r.id}` — två rader med samma slug ger därför samma
-- URL två gånger i sitemap.xml, vilket GSC rapporterar som duplicate.
--
-- Kända dubbletter (per 2026-07-24): grebbestad, fjallbacka, hamburgsund-gasthamn
--
-- Detta blockerar också UNIQUE-constraintet i
-- supabase/migrations/20260527000001_restaurants_slug_polish.sql, som medvetet
-- hoppar över constraintet så länge dubbletter finns (se dess DO-block, steg 3).
--
-- KÖR STEG 1 FÖRST och titta på datan. Valet mellan steg 2A och 2B beror på
-- om raderna är samma plats (2A) eller olika platser med kolliderande slug (2B).


-- ─────────────────────────────────────────────────────────────────────────────
-- STEG 1 — DIAGNOS (läser bara, ändrar inget)
-- ─────────────────────────────────────────────────────────────────────────────

-- 1a. Vilka slugs är dubblerade och hur många rader per slug?
SELECT slug, count(*) AS antal
FROM public.restaurants
WHERE slug IS NOT NULL
GROUP BY slug
HAVING count(*) > 1
ORDER BY antal DESC, slug;

-- 1b. Full rad-data för dubbletterna — jämför namn, ö, koordinater, created_at.
--     Är det samma plats inlagd två gånger, eller två olika platser?
SELECT r.id, r.slug, r.name, r.island, r.type,
       r.latitude, r.longitude, r.website, r.created_at, r.updated_at
FROM public.restaurants r
WHERE r.slug IN (
  SELECT slug FROM public.restaurants
  WHERE slug IS NOT NULL
  GROUP BY slug HAVING count(*) > 1
)
ORDER BY r.slug, r.created_at NULLS LAST, r.id;


-- ─────────────────────────────────────────────────────────────────────────────
-- STEG 2A — OM raderna är SAMMA plats (äkta dubblett)
-- ─────────────────────────────────────────────────────────────────────────────
-- Behåll äldsta raden per slug, nollställ slug på de nyare så de faller
-- tillbaka till UUID-URL i sitemap istället för att kollidera.
-- Icke-destruktivt: ingen rad raderas, bara slug rensas.
--
-- Vill du i stället RADERA de nyare raderna: gör det manuellt efter att du
-- kontrollerat att inget annat (bilder, recensioner, foreign keys) pekar på dem.
-- Radera aldrig utan att ha kollat referenser först.

-- FÖRHANDSGRANSKA vad som skulle ändras:
WITH rankad AS (
  SELECT id, slug, name,
         row_number() OVER (
           PARTITION BY slug
           ORDER BY created_at NULLS LAST, id
         ) AS rn
  FROM public.restaurants
  WHERE slug IS NOT NULL
)
SELECT id, slug, name, rn,
       CASE WHEN rn = 1 THEN 'BEHÅLLS' ELSE 'slug nollställs' END AS atgard
FROM rankad
WHERE slug IN (
  SELECT slug FROM public.restaurants
  WHERE slug IS NOT NULL GROUP BY slug HAVING count(*) > 1
)
ORDER BY slug, rn;

-- KÖR SKARPT (avkommentera när förhandsgranskningen ser rätt ut):
-- WITH rankad AS (
--   SELECT id,
--          row_number() OVER (
--            PARTITION BY slug
--            ORDER BY created_at NULLS LAST, id
--          ) AS rn
--   FROM public.restaurants
--   WHERE slug IS NOT NULL
-- )
-- UPDATE public.restaurants r
-- SET slug = NULL
-- FROM rankad
-- WHERE r.id = rankad.id AND rankad.rn > 1;


-- ─────────────────────────────────────────────────────────────────────────────
-- STEG 2B — OM raderna är OLIKA platser med kolliderande slug
-- ─────────────────────────────────────────────────────────────────────────────
-- Ge de nyare ett unikt slug-suffix i stället för att nollställa, så de
-- behåller sin snygga URL. Justera suffix manuellt efteråt om du vill något
-- mer läsbart än -2 / -3 (t.ex. "grebbestad-gasthamn").

-- FÖRHANDSGRANSKA:
WITH rankad AS (
  SELECT id, slug, name,
         row_number() OVER (
           PARTITION BY slug
           ORDER BY created_at NULLS LAST, id
         ) AS rn
  FROM public.restaurants
  WHERE slug IS NOT NULL
)
SELECT id, name, slug AS slug_nu,
       CASE WHEN rn = 1 THEN slug ELSE slug || '-' || rn END AS slug_efter
FROM rankad
WHERE slug IN (
  SELECT slug FROM public.restaurants
  WHERE slug IS NOT NULL GROUP BY slug HAVING count(*) > 1
)
ORDER BY slug, rn;

-- KÖR SKARPT (avkommentera):
-- WITH rankad AS (
--   SELECT id, slug,
--          row_number() OVER (
--            PARTITION BY slug
--            ORDER BY created_at NULLS LAST, id
--          ) AS rn
--   FROM public.restaurants
--   WHERE slug IS NOT NULL
-- )
-- UPDATE public.restaurants r
-- SET slug = rankad.slug || '-' || rankad.rn
-- FROM rankad
-- WHERE r.id = rankad.id AND rankad.rn > 1;


-- ─────────────────────────────────────────────────────────────────────────────
-- STEG 3 — VERIFIERA och lås med UNIQUE
-- ─────────────────────────────────────────────────────────────────────────────

-- 3a. Ska ge noll rader:
SELECT slug, count(*) FROM public.restaurants
WHERE slug IS NOT NULL
GROUP BY slug HAVING count(*) > 1;

-- 3b. Lägg på constraintet så problemet inte kan återuppstå.
--     (Samma logik som migration 20260527000001 hoppade över.)
ALTER TABLE public.restaurants
  ADD CONSTRAINT restaurants_slug_unique UNIQUE (slug);

-- 3c. EFTERÅT: sitemap cachas — trigga en ny Vercel-deploy eller vänta ut
--     revalidate så sitemap.xml byggs om utan dubbletterna.

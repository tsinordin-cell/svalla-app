-- =====================================================
-- Svalla: Phase 1 — Tags + Core Experience
-- Kör i Supabase SQL Editor
-- =====================================================

-- 1. Lägg till kolumner på restaurants
ALTER TABLE restaurants
  ADD COLUMN IF NOT EXISTS tags           text[]  DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS core_experience text;

-- 2. Lägg till tags på tours (redan best_for & tone_tags, men unified tags för snabba filter)
ALTER TABLE tours
  ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- =====================================================
-- 3. Seed tags på restaurants utifrån befintlig data
-- =====================================================

-- Lunch / mat
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'lunch')
WHERE (description ILIKE '%lunch%' OR description ILIKE '%mat%' OR description ILIKE '%restaurang%' OR description ILIKE '%meny%')
  AND NOT ('lunch' = ANY(COALESCE(tags, '{}')));

-- Fika / kaffe
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'fika')
WHERE (description ILIKE '%fika%' OR description ILIKE '%café%' OR description ILIKE '%kafé%' OR description ILIKE '%kaffe%' OR name ILIKE '%kafé%' OR name ILIKE '%café%')
  AND NOT ('fika' = ANY(COALESCE(tags, '{}')));

-- Bad
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'bad')
WHERE (description ILIKE '%bad%' OR description ILIKE '%simm%' OR description ILIKE '%klippbad%' OR name ILIKE '%bad%')
  AND NOT ('bad' = ANY(COALESCE(tags, '{}')));

-- Familjevänligt
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'familjevänligt')
WHERE (description ILIKE '%familj%' OR description ILIKE '%barn%' OR description ILIKE '%lekplats%')
  AND NOT ('familjevänligt' = ANY(COALESCE(tags, '{}')));

-- Romantiskt / par
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'romantiskt')
WHERE (description ILIKE '%romantisk%' OR description ILIKE '%intim%' OR description ILIKE '%utsikt%' OR description ILIKE '%solnedgång%')
  AND NOT ('romantiskt' = ANY(COALESCE(tags, '{}')));

-- Hamn / brygga
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'hamn')
WHERE (description ILIKE '%hamn%' OR description ILIKE '%brygga%' OR description ILIKE '%kaj%' OR name ILIKE '%hamn%')
  AND NOT ('hamn' = ANY(COALESCE(tags, '{}')));

-- Natur / skärgård
UPDATE restaurants
SET tags = array_append(COALESCE(tags, '{}'), 'natur')
WHERE (description ILIKE '%natur%' OR description ILIKE '%skog%' OR description ILIKE '%klippa%' OR description ILIKE '%ö%')
  AND NOT ('natur' = ANY(COALESCE(tags, '{}')));

-- =====================================================
-- 4. Seed tags på tours utifrån befintliga best_for + tone_tags
-- =====================================================

-- Kopiera best_for-värden till tags om de matchar kända taggar
UPDATE tours
SET tags = (
  SELECT array_agg(DISTINCT t) FROM unnest(
    COALESCE(best_for, '{}') || COALESCE(tone_tags, '{}') || COALESCE(category, '{}')
  ) AS t
  WHERE t IS NOT NULL
)
WHERE (best_for IS NOT NULL AND array_length(best_for, 1) > 0)
   OR (tone_tags IS NOT NULL AND array_length(tone_tags, 1) > 0);

-- =====================================================
-- 5. RLS — inga ändringar av befintliga policies
-- =====================================================
-- tags och core_experience följer automatiskt restaurangernas befintliga RLS.
-- Inget behöver läggas till.

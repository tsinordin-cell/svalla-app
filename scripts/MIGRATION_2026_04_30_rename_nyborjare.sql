-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_04_30_rename_nyborjare.sql
-- ═══════════════════════════════════════════════════════════════════════════
-- Tom: kör i Supabase SQL Editor.
--
-- Byter forum-kategoriernas ID från 'nybörjare' (med ö) till 'nyborjare'
-- (ASCII). Anledning: ö-tecknet URL-kodas till %C3%B6 vilket gör att
-- Google + delade länkar inte fungerar pålitligt.
--
-- Idempotent: kollar om raden finns innan UPDATE, skippar annars.
-- ═══════════════════════════════════════════════════════════════════════════

-- 1. Uppdatera kategori-ID (om raden finns)
UPDATE forum_categories
SET id = 'nyborjare'
WHERE id = 'nybörjare';

-- 2. Uppdatera alla trådar som pekar på gamla ID:t
UPDATE forum_threads
SET category_id = 'nyborjare'
WHERE category_id = 'nybörjare';

-- 3. Verifiera
SELECT 'forum_categories' AS tabell, id, name FROM forum_categories WHERE id IN ('nybörjare', 'nyborjare')
UNION ALL
SELECT 'forum_threads (category_id)' AS tabell, category_id, COUNT(*)::text FROM forum_threads
  WHERE category_id IN ('nybörjare', 'nyborjare')
  GROUP BY category_id;

-- ============================================================
-- SVALLA.SE — FORUM SEARCH PERFORMANCE INDEX
-- Kör i Supabase Dashboard → SQL Editor.
-- Skapar pg_trgm GIN-index på forum_threads.title och .body
-- så att ILIKE '%query%' kan använda index istället för seq scan.
--
-- Tidigare: O(N) full-table scan vid varje sök.
-- Efter:    O(log N) index-lookup, ~50–200x snabbare på 10k+ rader.
-- ============================================================

-- 1. Aktivera pg_trgm-tillägget (idempotent — om det redan finns gör det inget).
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 2. GIN-index på title med trigram-operatorer.
--    gin_trgm_ops gör att ILIKE %xxx% kan accelereras.
CREATE INDEX IF NOT EXISTS forum_threads_title_trgm_idx
  ON forum_threads
  USING gin (title gin_trgm_ops);

-- 3. Samma på body.
CREATE INDEX IF NOT EXISTS forum_threads_body_trgm_idx
  ON forum_threads
  USING gin (body gin_trgm_ops);

-- 4. Optional: composite-filter — vi söker alltid med in_spam_queue=false.
--    Detta är ett vanligt B-tree partial index för att accelerera filtreringen.
CREATE INDEX IF NOT EXISTS forum_threads_not_spam_last_reply_idx
  ON forum_threads (last_reply_at DESC)
  WHERE in_spam_queue = false;

-- 5. Verifiera att indexen byggts:
--    SELECT relname, indexrelid::regclass FROM pg_index
--      WHERE indrelid = 'forum_threads'::regclass;

-- ============================================================
-- ROLLBACK (om något skulle gå fel — säkert att köra):
--   DROP INDEX IF EXISTS forum_threads_title_trgm_idx;
--   DROP INDEX IF EXISTS forum_threads_body_trgm_idx;
--   DROP INDEX IF EXISTS forum_threads_not_spam_last_reply_idx;
-- ============================================================

-- ═══════════════════════════════════════════════════════════════════════════
-- Forum: SET NULL istället för CASCADE vid user-radering
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: Kör i Supabase SQL Editor.
--
-- Problem: forum_threads.user_id och forum_posts.user_id var NOT NULL med
-- ON DELETE CASCADE. Det innebar att när en user raderar sitt konto via
-- /api/account/delete cascade-deletas alla deras tråd-starter och svar.
-- Andra users som svarat i samma tråd förlorar kontexten.
--
-- Den befintliga koden i account/delete/route.ts försökte ANONYMISERA:
--   update({ body: '[Borttaget av användare]', user_id: null })
-- ...men user_id-uppdateringen FAILADE silent på NOT NULL-constraint, så
-- den faktiska beteendet var ren cascade-delete.
--
-- Fix:
--   1. Tillåt user_id = NULL på forum_threads och forum_posts
--   2. Ändra FK från CASCADE → SET NULL
--   3. Uppdaterad kod i account/delete sätter body till placeholder och
--      sedan låter SET NULL trigga vid users-radering
--
-- GDPR: text-content (body, title) maskeras till '[Borttaget av användare]'
-- innan user-raden tas bort. Mentions parsas vid render-tid från body, så
-- de försvinner automatiskt när body byts ut. Inga user-identifierande
-- fält ligger kvar.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

-- ── forum_threads ──────────────────────────────────────────────────────────
ALTER TABLE public.forum_threads
  DROP CONSTRAINT IF EXISTS forum_threads_user_id_fkey;

ALTER TABLE public.forum_threads
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.forum_threads
  ADD CONSTRAINT forum_threads_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- ── forum_posts ────────────────────────────────────────────────────────────
ALTER TABLE public.forum_posts
  DROP CONSTRAINT IF EXISTS forum_posts_user_id_fkey;

ALTER TABLE public.forum_posts
  ALTER COLUMN user_id DROP NOT NULL;

ALTER TABLE public.forum_posts
  ADD CONSTRAINT forum_posts_user_id_fkey
  FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE SET NULL;

-- last_reply_user_id på forum_threads har redan SET NULL — verifiera att
-- inget regrekt har förändrats.
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM information_schema.referential_constraints rc
    JOIN information_schema.key_column_usage kcu
      ON rc.constraint_name = kcu.constraint_name
    WHERE kcu.table_name = 'forum_threads'
      AND kcu.column_name = 'last_reply_user_id'
      AND rc.delete_rule != 'SET NULL'
  ) THEN
    RAISE EXCEPTION 'forum_threads.last_reply_user_id should have ON DELETE SET NULL';
  END IF;
END $$;

COMMIT;

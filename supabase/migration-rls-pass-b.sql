-- ============================================================
-- SVALLA.SE — RLS PASS B: tighten notifications, forum, conversations
-- Kör i Supabase Dashboard → SQL Editor.
--
-- Tre fixar:
--   1. notifications INSERT: hindra spam till godtycklig user
--   2. forum_threads/posts UPDATE: blockera moderation-kolumner från
--      icke-admin (is_locked, is_pinned, in_spam_queue, is_deleted)
--   3. conversations UPDATE: bara created_by får ändra DM-metadata
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. notifications — strängare INSERT
-- ────────────────────────────────────────────────────────────
-- Gammal policy: WITH CHECK (actor_id = auth.uid())
--   → vem som helst kunde skapa notis till godtycklig user_id.
--
-- Ny policy: kräv att user_id finns och inte är samma som actor.
-- Notiser till sig själv (system, "wrapped klar") går via service_role
-- som ändå kringgår RLS.

DROP POLICY IF EXISTS "Authenticated can insert notifications" ON public.notifications;

CREATE POLICY "notifications_insert"
  ON public.notifications FOR INSERT
  WITH CHECK (
    actor_id = auth.uid()
    AND user_id IS NOT NULL
    AND user_id <> actor_id
  );


-- ────────────────────────────────────────────────────────────
-- 2. forum_threads + forum_posts — moderation-kolumner låsta
-- ────────────────────────────────────────────────────────────
-- Problem: UPDATE-policyn `USING (user_id = auth.uid())` tillåter
-- ägaren att flippa is_pinned, is_locked, in_spam_queue, is_deleted.
-- → självmoderation-bypass + spam-flytt till topp av flödet.
--
-- Fix: BEFORE UPDATE-trigger som sätter tillbaka skyddade kolumner
-- till OLD-värdet om användaren inte är admin.
-- service_role kringgår genom att auth.uid() är NULL i den kontexten.

CREATE OR REPLACE FUNCTION public.enforce_forum_mod_columns()
RETURNS TRIGGER AS $$
DECLARE
  v_is_admin BOOLEAN := false;
BEGIN
  -- service_role / cron / migrations: auth.uid() är NULL → tillåt allt
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- Är användaren admin?
  SELECT COALESCE(u.is_admin, false) INTO v_is_admin
    FROM public.users u
    WHERE u.id = auth.uid();

  IF v_is_admin THEN
    RETURN NEW;
  END IF;

  -- Icke-admin: behåll OLD-värdena på moderation-kolumnerna.
  -- (TG_TABLE_NAME används så samma funktion täcker både threads och posts.)
  IF TG_TABLE_NAME = 'forum_threads' THEN
    NEW.is_locked     := OLD.is_locked;
    NEW.is_pinned     := OLD.is_pinned;
    NEW.in_spam_queue := OLD.in_spam_queue;
  ELSIF TG_TABLE_NAME = 'forum_posts' THEN
    NEW.in_spam_queue := OLD.in_spam_queue;
    -- is_deleted får ägaren flippa (soft delete) — vi behåller den lös.
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS forum_threads_mod_columns ON public.forum_threads;
CREATE TRIGGER forum_threads_mod_columns
  BEFORE UPDATE ON public.forum_threads
  FOR EACH ROW EXECUTE FUNCTION public.enforce_forum_mod_columns();

DROP TRIGGER IF EXISTS forum_posts_mod_columns ON public.forum_posts;
CREATE TRIGGER forum_posts_mod_columns
  BEFORE UPDATE ON public.forum_posts
  FOR EACH ROW EXECUTE FUNCTION public.enforce_forum_mod_columns();


-- ────────────────────────────────────────────────────────────
-- 3. conversations — bara skapare får uppdatera metadata
-- ────────────────────────────────────────────────────────────
-- Gammal policy: USING (is_conv_member(id, auth.uid()))
--   → vilken DM-deltagare som helst kunde ändra title, status,
--     club_id. Kunde sätta status='declined' och bryta DM:en.
--
-- Ny: bara created_by får göra UPDATE. (Service_role kringgår.)

DROP POLICY IF EXISTS "update conversations own" ON public.conversations;

CREATE POLICY "conversations_update_creator"
  ON public.conversations FOR UPDATE
  USING (created_by = auth.uid())
  WITH CHECK (created_by = auth.uid());


-- ============================================================
-- VERIFIERING — kör efter migrationen för att se nya policy-listan:
--   SELECT tablename, policyname, cmd, qual, with_check
--   FROM pg_policies
--   WHERE schemaname='public'
--     AND tablename IN ('notifications','conversations')
--   ORDER BY tablename, cmd;
--
-- Triggers:
--   SELECT event_object_table, trigger_name
--   FROM information_schema.triggers
--   WHERE trigger_schema='public'
--     AND event_object_table IN ('forum_threads','forum_posts');
-- ============================================================

-- ============================================================
-- ROLLBACK (om något bryter — säkert att köra):
--
--   DROP TRIGGER IF EXISTS forum_threads_mod_columns ON public.forum_threads;
--   DROP TRIGGER IF EXISTS forum_posts_mod_columns   ON public.forum_posts;
--   DROP FUNCTION IF EXISTS public.enforce_forum_mod_columns();
--
--   DROP POLICY IF EXISTS "conversations_update_creator" ON public.conversations;
--   CREATE POLICY "update conversations own"
--     ON public.conversations FOR UPDATE
--     USING (is_conv_member(id, auth.uid()));
--
--   DROP POLICY IF EXISTS "notifications_insert" ON public.notifications;
--   CREATE POLICY "Authenticated can insert notifications"
--     ON public.notifications FOR INSERT
--     WITH CHECK (actor_id = auth.uid());
-- ============================================================

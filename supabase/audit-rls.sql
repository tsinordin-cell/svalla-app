-- ============================================================
-- SVALLA.SE — RLS-AUDIT-SKRIPT
-- Kör i Supabase Dashboard → SQL Editor.
-- Listar alla publika tabeller, om RLS är aktiverat, och vilka
-- policys som finns. Output används som input till Pass B där vi
-- skriver migration för saknade policys.
-- ============================================================

-- 1. Alla publika tabeller och deras RLS-status:
SELECT
  schemaname,
  tablename,
  rowsecurity AS rls_enabled,
  CASE WHEN rowsecurity THEN '✓ RLS' ELSE '✗ RLS SAKNAS' END AS status
FROM pg_tables
WHERE schemaname = 'public'
ORDER BY rowsecurity ASC, tablename ASC;

-- 2. Alla policys per tabell:
SELECT
  schemaname,
  tablename,
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies
WHERE schemaname = 'public'
ORDER BY tablename, cmd;

-- 3. Tabeller utan policys (även om RLS är aktiverat — då blockerar Postgres ALLT):
SELECT t.tablename
FROM pg_tables t
WHERE t.schemaname = 'public'
  AND t.rowsecurity = true
  AND NOT EXISTS (
    SELECT 1 FROM pg_policies p
    WHERE p.schemaname = t.schemaname
      AND p.tablename  = t.tablename
  );

-- 4. Hjälpvy: hur många rader i varje tabell (för att prioritera)
SELECT
  schemaname,
  relname,
  n_live_tup AS approximate_row_count
FROM pg_stat_user_tables
WHERE schemaname = 'public'
ORDER BY n_live_tup DESC;

-- ============================================================
-- VAD SOM SKA TÄCKAS (förväntade tabeller från koden):
--   Sociala:       follows, likes, comments, reposts, blocks
--   Forum:         forum_threads, forum_posts, forum_likes,
--                  forum_subscriptions, forum_categories
--   DM:            conversations, conversation_participants,
--                  messages, dm_requests
--   Push:          push_subscriptions, notifications
--   Profil/data:   users, trips, gps_points, stops,
--                  planned_routes, place_reviews
--   Klubb/event:   clubs, club_members, events, event_attendees,
--                  check_ins, stories, trip_tags
--   Achievements:  achievements, achievement_events
--   Misc:          subscriptions (Stripe), invites,
--                  reports, follow_prefs, restaurants, routes
--
-- Skicka SELECT-resultaten ovan så skriver jag migrationen
-- för alla som saknar policys.
-- ============================================================

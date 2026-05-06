-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION: Skydda notifications-INSERT mot abuse
-- ═══════════════════════════════════════════════════════════════════════════
--
-- Tom: Kör i Supabase SQL Editor.
--
-- Problem: Tidigare policy var "with check (true)" — vilket betyder att
-- vilken inloggad användare som helst kunde POSTA en notis till vilken
-- annan användare som helst, med valfri actor_id (= förfalska att någon
-- annan triggade notisen).
--
-- Konkret abuse-vektor:
--   curl -X POST https://svalla.se/rest/v1/notifications \
--     -H "apikey: <anon>" -H "Authorization: Bearer <user-jwt>" \
--     -d '{"user_id":"<offer-id>","actor_id":"<other-user>","type":"like","trip_id":"..."}'
--
-- Fix: Endast service_role får skapa notiser (server-side via API-routes
-- som verifierat actor och meningsfullhet). Inga direkt-INSERTs från
-- klient via supabase-anon-key.
--
-- Detta bryter ingen befintlig kod — alla notis-skapanden i kodbasen går
-- via getAdminClient() (service_role) i API-routes:
--   /api/notifications/insert/route.ts
--   /api/notifications/social-visits/route.ts
--   /api/forum/posts/route.ts (via notifyWithRetry)
--   etc.
-- ═══════════════════════════════════════════════════════════════════════════

BEGIN;

DROP POLICY IF EXISTS "Users can insert notifications" ON public.notifications;

-- Inga klient-INSERTs alls. Service-role bypassar RLS och kan fortfarande
-- skapa notiser via API-routes (det är så det ska fungera).
-- Default RLS-deny gäller eftersom RLS är ENABLED och ingen INSERT-policy finns.

COMMIT;

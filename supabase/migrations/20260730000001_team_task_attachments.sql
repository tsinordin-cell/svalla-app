-- 2026-07-30 — Bildbilagor på team-uppgifter
--
-- Tom och Max har hittills skickat buggbilder i en WhatsApp-grupp. Nu ska
-- bilderna kunna ligga direkt på uppgiften istället, så att kontexten
-- (skärmdump av buggen) finns kvar där arbetet faktiskt sker.
--
-- Lagring: PRIVAT bucket. Buggskärmdumpar innehåller ofta användardata —
-- exempelbilden som startade det här visade en användares mejladress och
-- profil. Sajtens övriga buckets (images/trips/forum-images) är publika,
-- vilket vore fel här: vem som helst med länken hade kunnat läsa den.
-- Åtkomst sker istället via tidsbegränsade signerade URL:er.
--
-- Idempotent.

-- ── 1. Kolumn på uppgiften ──────────────────────────────────────────────────
-- jsonb-array istället för egen tabell: /team prenumererar redan på
-- postgres_changes för team_tasks, så realtid mellan Tom och Max fungerar
-- utan extra kanal eller join.
--
-- Varje element: { "path": "<sökväg i bucketen>", "name": "<filnamn>",
--                  "w": <bredd>, "h": <höjd>, "by": "<user-id>", "at": "<iso>" }
ALTER TABLE public.team_tasks
  ADD COLUMN IF NOT EXISTS images jsonb NOT NULL DEFAULT '[]'::jsonb;

-- ── 2. Privat bucket ────────────────────────────────────────────────────────
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'team-attachments',
  'team-attachments',
  false,                                  -- privat: kräver signerad URL
  10485760,                               -- 10 MB, samma tak som 'trips'
  ARRAY['image/jpeg','image/png','image/webp','image/gif']
)
ON CONFLICT (id) DO UPDATE
  SET public             = false,
      file_size_limit    = EXCLUDED.file_size_limit,
      allowed_mime_types = EXCLUDED.allowed_mime_types;

-- ── 3. RLS på bucketen — bara teamet (is_admin) ─────────────────────────────
-- is_team_admin() är samma SECURITY DEFINER-funktion som styr åtkomsten till
-- team_tasks m.fl., så bucketen och tabellen kan aldrig glida isär.
DROP POLICY IF EXISTS "team attachments – admin read"   ON storage.objects;
DROP POLICY IF EXISTS "team attachments – admin insert" ON storage.objects;
DROP POLICY IF EXISTS "team attachments – admin delete" ON storage.objects;

CREATE POLICY "team attachments – admin read"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'team-attachments' AND public.is_team_admin());

CREATE POLICY "team attachments – admin insert"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'team-attachments' AND public.is_team_admin());

CREATE POLICY "team attachments – admin delete"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'team-attachments' AND public.is_team_admin());

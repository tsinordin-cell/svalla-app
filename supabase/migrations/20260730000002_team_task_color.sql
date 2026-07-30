-- 2026-07-30 — Egen färg per uppgift
--
-- Uppgifter ska kunna färgkodas efter vad arbetet gäller (bugg, innehåll,
-- design osv) oberoende av vilket projekt de ligger i. Färgen tar över
-- kortets vänsterkant från projektfärgen när den är satt.
--
-- description-kolumnen finns redan sedan team_dashboard-migrationen men har
-- inte använts i gränssnittet — den blir nu "Anteckningar" på uppgiften.
--
-- Idempotent.

ALTER TABLE public.team_tasks
  ADD COLUMN IF NOT EXISTS color text;

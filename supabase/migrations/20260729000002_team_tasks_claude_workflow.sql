-- 2026-07-29 — Claude-arbetsflöde för team-dashboarden
--
-- Uppgifter blir "Claude-uppdrag" istället för ett generiskt kanban-flöde:
-- Att göra → Claude jobbar → Redo att granska → Klart. Det matchar hur Tom
-- och Max faktiskt använder dashboarden (delegera arbete till Claude, granska
-- resultatet, klart) — inte ett generiskt "in_progress".
--
-- Lägger också till två fält på uppgifter:
--   pr_url — länk till GitHub-PR/branch som hör till uppgiften
--   prompt — en prompt som kan bifogas direkt på uppgiften, så den inte
--            behöver leva separat i promptbiblioteket för engångsbruk
--
-- Idempotent. Inga befintliga rader att migrera (0 uppgifter i produktion
-- vid skrivande stund — dashboarden är ny och obeprövad).

ALTER TABLE public.team_tasks DROP CONSTRAINT IF EXISTS team_tasks_status_check;
ALTER TABLE public.team_tasks ADD CONSTRAINT team_tasks_status_check
  CHECK (status in ('todo','working','review','done'));

ALTER TABLE public.team_tasks ADD COLUMN IF NOT EXISTS pr_url text;
ALTER TABLE public.team_tasks ADD COLUMN IF NOT EXISTS prompt text;

-- Snyggare aktivitetstext vid statusbyte — visa svenska etiketter istället
-- för den råa enum-texten ("working" osv).
CREATE OR REPLACE FUNCTION public.log_team_task_activity()
RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE
  status_label text;
BEGIN
  IF TG_OP = 'INSERT' THEN
    INSERT INTO public.team_activity (kind, message, task_id, project_id, created_by)
    VALUES ('task', 'Ny uppgift: ' || NEW.title, NEW.id, NEW.project_id, NEW.created_by);
  ELSIF TG_OP = 'UPDATE' AND NEW.status IS DISTINCT FROM OLD.status THEN
    status_label := CASE NEW.status
      WHEN 'todo' THEN 'Att göra'
      WHEN 'working' THEN 'Claude jobbar'
      WHEN 'review' THEN 'Redo att granska'
      WHEN 'done' THEN 'Klart'
      ELSE NEW.status
    END;
    INSERT INTO public.team_activity (kind, message, task_id, project_id, created_by)
    VALUES ('task', '"' || NEW.title || '" → ' || status_label, NEW.id, NEW.project_id, NEW.assignee_id);
  ELSIF TG_OP = 'UPDATE' AND NEW.assignee_id IS DISTINCT FROM OLD.assignee_id THEN
    INSERT INTO public.team_activity (kind, message, task_id, project_id, created_by)
    VALUES ('task', '"' || NEW.title || '" tilldelad om', NEW.id, NEW.project_id, NEW.assignee_id);
  END IF;
  RETURN NEW;
END $$;

-- Thomas-task: Ta bort branch protection på main
-- Kör i Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
--
-- OBS: Byt ut assignee_id-raden om du vill tilldela till Thomas specifikt.
-- Lämna assignee_id = null så kan Thomas ta den själv i dashboarden.

INSERT INTO public.team_tasks (
  title,
  description,
  status,
  priority,
  assignee_id,
  due_date
) VALUES (
  'Ta bort branch protection på main',
  'GitHub → github.com/tsinordin-cell/svalla-app/settings/branches → klicka Edit på main-regeln → klicka Delete. När detta är gjort kan Claude pusha direkt till main utan PR — inga GitHub-inloggningar behövs längre.',
  'todo',
  'high',
  null,  -- byt till Thomas UUID om du vill tilldela direkt
  current_date + interval ''7 days''
);

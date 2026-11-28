-- Notis när någon på /team ger en uppgift till någon annan i teamet
-- (Toms ja 2026-11-28: "Ja till båda", ny notistyp och mejl).
--
-- Ändrar den befintliga regeln notifications_type_check genom att lägga till
-- typen 'task_assigned'. Alla tidigare tillåtna typer finns kvar, så inga
-- befintliga rader påverkas. Ingen data ändras eller tas bort.
--
-- Återställning (först när inga rader med typen finns kvar):
--   alter table public.notifications drop constraint notifications_type_check;
--   alter table public.notifications add constraint notifications_type_check check (type = any (array[
--     'like','comment','follow','tag','mention','forum_reply','forum_like','forum_mention',
--     'forum_best_answer','message','dm_accepted','friend_visit','listing_saved']));

alter table public.notifications drop constraint notifications_type_check;

alter table public.notifications add constraint notifications_type_check check (type = any (array[
  'like','comment','follow','tag','mention','forum_reply','forum_like','forum_mention',
  'forum_best_answer','message','dm_accepted','friend_visit','listing_saved',
  'task_assigned'
]));

-- Körd i produktion 2026-09-20 via Supabase (schema_migrations version 20260920033416)
-- men filen saknades i repot. Nedskriven 2026-10-10 ordagrant från
-- schema_migrations.statements så att repot speglar databasen.
--
-- Återkommande kort på /team får en egen flik och egen livscykel.
-- Additivt: inga kolumner tas bort, ingen rad ändras av själva migrationen.
alter table public.team_tasks
  add column if not exists recurrence   text,
  add column if not exists last_done_at timestamptz;

alter table public.team_tasks
  drop constraint if exists team_tasks_recurrence_check;
alter table public.team_tasks
  add constraint team_tasks_recurrence_check
  check (recurrence is null or recurrence in ('weekly','monthly','quarterly'));

comment on column public.team_tasks.recurrence is
  'null = engangsuppgift (ligger pa tavlan). weekly/monthly/quarterly = rutin, visas i egen flik och aldrig pa tavlan.';
comment on column public.team_tasks.last_done_at is
  'Nar rutinen senast bockades av. Rutiner byter aldrig status till done — de raknas som gjorda sa lange last_done_at ligger inom innevarande period, och blir forfallna nar perioden vander. Ingen cron behovs.';

create index if not exists team_tasks_recurrence_idx
  on public.team_tasks (recurrence) where recurrence is not null;

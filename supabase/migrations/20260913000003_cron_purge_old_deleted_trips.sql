-- Kör purge_old_deleted_trips() varje natt — funktionen fanns sedan 20260502000023 men
-- ingenting körde den. Sajten lovar användaren "Den raderas permanent om 30 dagar"
-- (TripActions.tsx), och MÄTT 2026-09-13 låg 8 raderade turer kvar, 2 av dem äldre än
-- 30 dagar. Toms beslut 2026-09-13: "kör".
--
-- pg_cron kör i databasen (jobben ligger i cron.job, utfallet i cron.job_run_details).
-- Turens gps_points, stops, likes, comments, notifications, trip_tags och
-- trip_highlights följer med (on delete cascade); visited_islands och planned_routes
-- får trip_id = null.
create extension if not exists pg_cron with schema pg_catalog;

select cron.schedule(
  'purge-old-deleted-trips',
  '15 3 * * *',              -- 03:15 UTC varje natt
  $$select public.purge_old_deleted_trips()$$
);

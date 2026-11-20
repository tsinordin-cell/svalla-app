-- 2026-11-19 (kördes 21:38 ET, version 20261120023859 i databasen).
-- Ångra: villkoret före var ((status = 'done' and visibility = 'public') or auth.uid() = user_id).
--
-- Raderade turer ska bara gå att läsa för ägaren.
-- Före: en publik tur som raderats (deleted_at satt) gick att läsa för alla
-- via API:t tills den rensades efter 30 dagar.
alter policy trips_select_visible on public.trips
  using (
    ((status = 'done') and (visibility = 'public') and (deleted_at is null))
    or (auth.uid() = user_id)
  );

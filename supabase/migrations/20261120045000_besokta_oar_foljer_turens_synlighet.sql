-- 2026-11-19 (kördes 23:50 ET, version 20261120045000 i databasen).
--
-- Besökta öar följer turens synlighet.
--
-- Före: alla, även utloggade, kunde läsa varje rad i visited_islands. En ö som
-- markerats av en privat tur avslöjade alltså var turen gått.
--
-- Efter: en rad som kommer från en tur syns för andra bara om turen syns för
-- dem. Rader som användaren själv har bockat i (utan tur) är oförändrat
-- publika, och ägaren ser alltid allt sitt.
--
-- fran_tur behövs för att raden ska förbli dold även om turen raderas på
-- riktigt: då nollställer databasen trip_id (ON DELETE SET NULL), och utan
-- märkningen hade ön blivit publik i samma ögonblick.
--
-- Inga borttagningar i den här filen. Ångra: se slutet av filen.

alter table public.visited_islands
  add column if not exists fran_tur boolean not null default false;

comment on column public.visited_islands.fran_tur is
  'Sann när raden skapats av en tur. Står kvar om turen raderas, så att ön inte blir publik då.';

update public.visited_islands
   set fran_tur = true
 where trip_id is not null
   and not fran_tur;

create or replace function public.visited_islands_markera_fran_tur()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if new.trip_id is not null then
    new.fran_tur := true;
  end if;
  return new;
end;
$$;

create trigger visited_islands_fran_tur
  before insert or update on public.visited_islands
  for each row execute function public.visited_islands_markera_fran_tur();

alter policy visited_islands_select_all on public.visited_islands
  using (
    auth.uid() = user_id
    or (not fran_tur)
    or exists (select 1 from public.trips t where t.id = visited_islands.trip_id)
  );

-- ÅNGRA (körs bara om ändringen ska backas):
--   alter policy visited_islands_select_all on public.visited_islands using (true);
--   drop trigger if exists visited_islands_fran_tur on public.visited_islands;
--   drop function if exists public.visited_islands_markera_fran_tur();
--   alter table public.visited_islands drop column if exists fran_tur;

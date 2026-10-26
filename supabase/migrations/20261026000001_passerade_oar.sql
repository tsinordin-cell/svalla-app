-- Passerade öar (2026-10-26). visited_islands fick förut en rad för varje ö inom
-- 1,5–4 km från en GPS-rutt, också öar man körde förbi utan att lägga till.
-- "Besökta öar" i Min skärgård betydde alltså "öar i närheten av rutten".
--
-- Nu: visited_islands = besökta (turen började eller slutade där, ett stopp på
-- minst tio minuter där, "Jag har varit här" eller en snabb-logg till ön).
-- passerade_oar = öar man sett från sjön utan att stanna. Visas för sig i Min
-- skärgård ("Passerade från sjön") och räknas inte i X av 102 eller märkena.
-- Egen tabell, inte en kolumn: visited_islands läses på tolv ställen och ingen
-- av dem ska av misstag räkna en passage som ett besök. Idempotent.

set lock_timeout = '5s';

create table if not exists public.passerade_oar (
  user_id      uuid not null references auth.users(id) on delete cascade,
  island_slug  text not null,
  trip_id      uuid references public.trips(id) on delete set null,
  passerad_at  timestamptz not null default now(),
  primary key (user_id, island_slug)
);
create index if not exists passerade_oar_trip_id_idx on public.passerade_oar (trip_id);

grant select, insert, delete on public.passerade_oar to authenticated;
grant all on public.passerade_oar to service_role;
alter table public.passerade_oar enable row level security;

drop policy if exists passerade_oar_las_egna on public.passerade_oar;
create policy passerade_oar_las_egna on public.passerade_oar
  for select to authenticated using (user_id = auth.uid());
drop policy if exists passerade_oar_skriv_egna on public.passerade_oar;
create policy passerade_oar_skriv_egna on public.passerade_oar
  for insert to authenticated with check (user_id = auth.uid());
drop policy if exists passerade_oar_radera_egna on public.passerade_oar;
create policy passerade_oar_radera_egna on public.passerade_oar
  for delete to authenticated using (user_id = auth.uid());

comment on table public.passerade_oar is 'Öar en användare passerat inom detektionsradien på en GPS-tur utan att stanna. Besökta öar ligger i visited_islands.';

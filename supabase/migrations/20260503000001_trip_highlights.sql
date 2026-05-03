-- trip_highlights — flywheel-loopen kärna
--
-- När en användare avslutat en GPS-tur prompt:as hen att tappa på en av platserna
-- som GPS-rutten passerade. Det skapar en rad här. Andra användare ser raden på
-- plats-sidan ("Senast här: Maja för 3 dagar sedan") + i feeden.
--
-- Användning:
--   - INSERT från /api/trips/[id]/highlight (server-side med RLS)
--   - SELECT från plats-sida ("Senast här"-widget)
--   - SELECT i push-trigger (notifiera följare som sparat platsen)

create table if not exists public.trip_highlights (
  id          uuid primary key default gen_random_uuid(),
  trip_id     uuid not null references public.trips(id) on delete cascade,
  user_id     uuid not null references auth.users(id) on delete cascade,
  place_slug  text not null,
  place_name  text not null,
  place_type  text,                       -- restaurant | anchorage | harbor | island
  island      text,
  lat         double precision,
  lng         double precision,
  note        text,                       -- valfri kort kommentar (max 200 tecken)
  created_at  timestamptz not null default now()
);

-- En höjdpunkt per tur. Användare kan dock ändra (DELETE + INSERT).
create unique index if not exists trip_highlights_one_per_trip_idx
  on public.trip_highlights(trip_id);

-- Snabba uppslag på plats-sidor
create index if not exists trip_highlights_place_slug_idx
  on public.trip_highlights(place_slug, created_at desc);

-- Snabba uppslag per användare (för deras profil)
create index if not exists trip_highlights_user_idx
  on public.trip_highlights(user_id, created_at desc);

-- ── RLS ───────────────────────────────────────────────────────────────────────
alter table public.trip_highlights enable row level security;

-- Alla får läsa offentliga höjdpunkter (de kopplas till offentliga turer ändå)
drop policy if exists "trip_highlights_read_all" on public.trip_highlights;
create policy "trip_highlights_read_all"
  on public.trip_highlights for select
  using (true);

-- Endast ägare får skapa, och bara för egna turer
drop policy if exists "trip_highlights_insert_own" on public.trip_highlights;
create policy "trip_highlights_insert_own"
  on public.trip_highlights for insert
  with check (
    auth.uid() = user_id
    and exists (
      select 1 from public.trips t where t.id = trip_id and t.user_id = auth.uid()
    )
  );

-- Endast ägare får uppdatera/radera
drop policy if exists "trip_highlights_modify_own" on public.trip_highlights;
create policy "trip_highlights_modify_own"
  on public.trip_highlights for update using (auth.uid() = user_id);

drop policy if exists "trip_highlights_delete_own" on public.trip_highlights;
create policy "trip_highlights_delete_own"
  on public.trip_highlights for delete using (auth.uid() = user_id);

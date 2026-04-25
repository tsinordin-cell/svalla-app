-- ============================================================
-- SVALLA — SUPABASE SCHEMA v3
-- Kör detta i Supabase SQL Editor
-- ============================================================

-- 1. USERS
create table if not exists public.users (
  id          uuid primary key references auth.users(id) on delete cascade,
  username    text unique not null,
  email       text not null,
  avatar      text,
  created_at  timestamptz default now()
);
alter table public.users enable row level security;
create policy "Users can read all profiles"       on public.users for select using (true);
create policy "Users can update own profile"      on public.users for update using (auth.uid() = id);
create policy "Users can insert own profile"      on public.users for insert with check (auth.uid() = id);

-- 2. RESTAURANTS
create table if not exists public.restaurants (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  latitude       float,
  longitude      float,
  images         text[] default '{}',
  menu           text,
  opening_hours  text,
  description    text,
  created_at     timestamptz default now()
);
alter table public.restaurants enable row level security;
create policy "Anyone can read restaurants" on public.restaurants for select using (true);

-- 3. ROUTES
create table if not exists public.routes (
  id               uuid primary key default gen_random_uuid(),
  name             text not null,
  description      text,
  distance         float not null,
  duration         integer not null,
  difficulty       text default 'Medel' check (difficulty in ('Lätt','Medel','Svår')),
  boat_types       text[] default '{}',
  waypoints        jsonb default '[]',
  cover_image      text,
  restaurant_ids   uuid[] default '{}',
  created_at       timestamptz default now()
);
alter table public.routes enable row level security;
create policy "Anyone can read routes" on public.routes for select using (true);

-- 4. TRIPS
create table if not exists public.trips (
  id                    uuid primary key default gen_random_uuid(),
  user_id               uuid references public.users(id) on delete cascade not null,
  boat_type             text not null,
  distance              float default 0,
  duration              integer default 0,       -- minutes
  average_speed_knots   float default 0,
  max_speed_knots       float default 0,
  image                 text not null,
  route_id              uuid references public.routes(id) on delete set null,
  started_at            timestamptz,
  ended_at              timestamptz,
  created_at            timestamptz default now()
);
alter table public.trips enable row level security;
create policy "Anyone can read trips"       on public.trips for select using (true);
create policy "Users can insert own trips"  on public.trips for insert with check (auth.uid() = user_id);
create policy "Users can update own trips"  on public.trips for update using (auth.uid() = user_id);
create policy "Users can delete own trips"  on public.trips for delete using (auth.uid() = user_id);

-- 5. GPS POINTS
create table if not exists public.gps_points (
  id           uuid primary key default gen_random_uuid(),
  trip_id      uuid references public.trips(id) on delete cascade not null,
  latitude     float not null,
  longitude    float not null,
  speed_knots  float default 0,
  heading      float,                            -- degrees 0-360
  accuracy     float,                            -- meters
  recorded_at  timestamptz not null default now()
);
alter table public.gps_points enable row level security;
create policy "Anyone can read gps points"
  on public.gps_points for select using (true);
create policy "Users can insert gps points for own trips"
  on public.gps_points for insert
  with check (
    auth.uid() = (select user_id from public.trips where id = trip_id)
  );
-- index for fast trip-based queries
create index if not exists gps_points_trip_id_idx on public.gps_points(trip_id);
create index if not exists gps_points_recorded_at_idx on public.gps_points(trip_id, recorded_at);

-- 6. STOPS (auto-detected or manual)
create table if not exists public.stops (
  id               uuid primary key default gen_random_uuid(),
  trip_id          uuid references public.trips(id) on delete cascade not null,
  latitude         float not null,
  longitude        float not null,
  stop_type        text default 'stop' check (stop_type in ('stop','pause','start','end')),
  started_at       timestamptz not null,
  ended_at         timestamptz,
  duration_seconds integer default 0,
  note             text
);
alter table public.stops enable row level security;
create policy "Anyone can read stops"
  on public.stops for select using (true);
create policy "Users can insert stops for own trips"
  on public.stops for insert
  with check (
    auth.uid() = (select user_id from public.trips where id = trip_id)
  );
create index if not exists stops_trip_id_idx on public.stops(trip_id);

-- ============================================================
-- STORAGE BUCKETS (create via Dashboard → Storage)
--   "trips"   → Public: ON
--   "avatars" → Public: ON
-- ============================================================

-- ============================================================
-- SEED: RESTAURANGER (6 st)
-- ============================================================
insert into public.restaurants (id, name, latitude, longitude, description, opening_hours) values
  ('a1000000-0000-0000-0000-000000000001','Grinda Wärdshus',59.6028,18.7275,'Klassisk skärgårdskrog på Grinda. Husmanskost och färsk fisk.','Maj–sep 11–22'),
  ('a1000000-0000-0000-0000-000000000002','Sandhamns Värdshus',59.2861,18.9143,'Historisk krog i Sandhamn. Seglarfavorit sedan 1672.','Hela sommaren 12–22'),
  ('a1000000-0000-0000-0000-000000000003','Finnhamns Kafé',59.6325,18.8122,'Litet kafé i gästhamnen Finnhamn.','Juni–aug 9–20'),
  ('a1000000-0000-0000-0000-000000000004','Utö Värdshus',58.9603,17.8897,'Känd för räksmörgåsar och havsutsikt.','Maj–sep 11–21'),
  ('a1000000-0000-0000-0000-000000000005','Möja Krog',59.4583,18.8183,'Lokala råvaror och säsongsmat.','Juni–aug 12–21'),
  ('a1000000-0000-0000-0000-000000000006','Arholma Krog',60.0183,18.8892,'Skärgårdens nordliga krog med havsutsikt.','Juni–aug 11–20')
on conflict (id) do nothing;

-- ============================================================
-- SEED: RUTTER (3 st)
-- ============================================================
insert into public.routes (id, name, description, distance, duration, difficulty, boat_types, waypoints, restaurant_ids) values
(
  'b1000000-0000-0000-0000-000000000001',
  'Stockholm → Grinda',
  'Klassisk dagstur ut till Grinda. Perfekt som första tur. Lugnt vatten och en av skärgårdens bästa krogar som mål.',
  18.5, 120, 'Lätt',
  ARRAY['Motorbåt','RIB','Segelbåt'],
  '[{"lat":59.3251,"lng":18.1001,"name":"Stockholm"},{"lat":59.4200,"lng":18.3500},{"lat":59.5200,"lng":18.5800},{"lat":59.6028,"lng":18.7275,"name":"Grinda"}]'::jsonb,
  ARRAY['a1000000-0000-0000-0000-000000000001'::uuid]
),
(
  'b1000000-0000-0000-0000-000000000002',
  'Grinda → Sandhamn',
  'Från Grinda österut mot Sandhamn via Möja. En av de klassiska seglingsrutterna.',
  22.0, 180, 'Medel',
  ARRAY['Segelbåt','Katamaran','Motorbåt'],
  '[{"lat":59.6028,"lng":18.7275,"name":"Grinda"},{"lat":59.5000,"lng":18.7800},{"lat":59.4583,"lng":18.8183,"name":"Möja"},{"lat":59.2861,"lng":18.9143,"name":"Sandhamn"}]'::jsonb,
  ARRAY['a1000000-0000-0000-0000-000000000001'::uuid,'a1000000-0000-0000-0000-000000000005'::uuid,'a1000000-0000-0000-0000-000000000002'::uuid]
),
(
  'b1000000-0000-0000-0000-000000000003',
  'Utö-ringen (ytterskärgård)',
  'Längre tur ut i ytterskärgården till Utö och tillbaka. Öppet hav, starka vindar.',
  48.0, 360, 'Svår',
  ARRAY['Segelbåt','Katamaran'],
  '[{"lat":59.3251,"lng":18.1001,"name":"Stockholm"},{"lat":59.1000,"lng":18.0500,"name":"Dalarö"},{"lat":58.9603,"lng":17.8897,"name":"Utö"},{"lat":59.1000,"lng":18.0500,"name":"Dalarö"},{"lat":59.3251,"lng":18.1001,"name":"Stockholm"}]'::jsonb,
  ARRAY['a1000000-0000-0000-0000-000000000004'::uuid]
)
on conflict (id) do nothing;

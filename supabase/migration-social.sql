-- ============================================================
-- SVALLA — MIGRATION: Social + Kommentarer + Follows
-- Kör i Supabase SQL Editor
-- ============================================================

-- LIKES
create table if not exists public.likes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id) on delete cascade not null,
  trip_id    uuid references public.trips(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, trip_id)
);
alter table public.likes enable row level security;
create policy "Anyone can read likes" on public.likes for select using (true);
create policy "Users can like" on public.likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on public.likes for delete using (auth.uid() = user_id);

-- COMMENTS
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id) on delete cascade not null,
  trip_id    uuid references public.trips(id) on delete cascade not null,
  content    text not null check (char_length(content) <= 500),
  created_at timestamptz default now()
);
alter table public.comments enable row level security;
create policy "Anyone can read comments" on public.comments for select using (true);
create policy "Users can comment" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on public.comments for delete using (auth.uid() = user_id);
create index if not exists comments_trip_id_idx on public.comments(trip_id);

-- FOLLOWS
create table if not exists public.follows (
  id           uuid primary key default gen_random_uuid(),
  follower_id  uuid references public.users(id) on delete cascade not null,
  following_id uuid references public.users(id) on delete cascade not null,
  created_at   timestamptz default now(),
  unique(follower_id, following_id)
);
alter table public.follows enable row level security;
create policy "Anyone can read follows" on public.follows for select using (true);
create policy "Users can follow" on public.follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow" on public.follows for delete using (auth.uid() = follower_id);

-- NOTIFICATIONS
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id) on delete cascade not null,
  actor_id   uuid references public.users(id) on delete cascade,
  type       text not null check (type in ('like','comment','follow','tag')),
  trip_id    uuid references public.trips(id) on delete cascade,
  read       boolean default false,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;
create policy "Users can read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can insert notifications" on public.notifications for insert with check (true);
create policy "Users can mark read" on public.notifications for update using (auth.uid() = user_id);
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_created_at_idx on public.notifications(created_at desc);

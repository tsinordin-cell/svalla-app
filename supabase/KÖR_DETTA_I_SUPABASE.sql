-- ============================================================
-- SVALLA — PENDING MIGRATIONS
-- Run in Supabase SQL Editor
-- ============================================================

-- 1. BOAT TYPE on users
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS boat_type text;
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS website text;

-- 2. LIKES
create table if not exists public.likes (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id) on delete cascade not null,
  trip_id    uuid references public.trips(id) on delete cascade not null,
  created_at timestamptz default now(),
  unique(user_id, trip_id)
);
alter table public.likes enable row level security;
drop policy if exists "Anyone can read likes" on public.likes;
drop policy if exists "Users can like" on public.likes;
drop policy if exists "Users can unlike" on public.likes;
create policy "Anyone can read likes" on public.likes for select using (true);
create policy "Users can like" on public.likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike" on public.likes for delete using (auth.uid() = user_id);

-- 3. COMMENTS
create table if not exists public.comments (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id) on delete cascade not null,
  trip_id    uuid references public.trips(id) on delete cascade not null,
  content    text not null check (char_length(content) <= 500),
  created_at timestamptz default now()
);
alter table public.comments enable row level security;
drop policy if exists "Anyone can read comments" on public.comments;
drop policy if exists "Users can comment" on public.comments;
drop policy if exists "Users can delete own comments" on public.comments;
create policy "Anyone can read comments" on public.comments for select using (true);
create policy "Users can comment" on public.comments for insert with check (auth.uid() = user_id);
create policy "Users can delete own comments" on public.comments for delete using (auth.uid() = user_id);
create index if not exists comments_trip_id_idx on public.comments(trip_id);

-- 4. FOLLOWS
create table if not exists public.follows (
  id           uuid primary key default gen_random_uuid(),
  follower_id  uuid references public.users(id) on delete cascade not null,
  following_id uuid references public.users(id) on delete cascade not null,
  created_at   timestamptz default now(),
  unique(follower_id, following_id)
);
alter table public.follows enable row level security;
drop policy if exists "Anyone can read follows" on public.follows;
drop policy if exists "Users can follow" on public.follows;
drop policy if exists "Users can unfollow" on public.follows;
create policy "Anyone can read follows" on public.follows for select using (true);
create policy "Users can follow" on public.follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow" on public.follows for delete using (auth.uid() = follower_id);

-- 5. NOTIFICATIONS
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid references public.users(id) on delete cascade not null,
  actor_id   uuid references public.users(id) on delete cascade,
  type       text not null check (type in ('like','comment','follow','tag','mention','forum_reply','forum_like')),
  trip_id    uuid references public.trips(id) on delete cascade,
  read       boolean default false,
  created_at timestamptz default now()
);
alter table public.notifications enable row level security;
drop policy if exists "Users can read own notifications" on public.notifications;
drop policy if exists "Users can insert notifications" on public.notifications;
drop policy if exists "Users can mark read" on public.notifications;
create policy "Users can read own notifications" on public.notifications for select using (auth.uid() = user_id);
create policy "Users can insert notifications" on public.notifications for insert with check (true);
create policy "Users can mark read" on public.notifications for update using (auth.uid() = user_id);
create index if not exists notifications_user_id_idx on public.notifications(user_id);
create index if not exists notifications_created_at_idx on public.notifications(created_at desc);

-- 6. REALTIME on notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.comments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.likes;

-- 7. AUTO-CREATE public.users ON SIGNUP
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, username, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1), 'seglare'),
    COALESCE(NEW.email, '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Backfill missing public.users rows
INSERT INTO public.users (id, username, email)
SELECT au.id, COALESCE(au.raw_user_meta_data->>'username', split_part(au.email, '@', 1), 'seglare'), COALESCE(au.email, '')
FROM auth.users au
LEFT JOIN public.users pu ON pu.id = au.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- 8. TRIP_TAGS (taggning av seglare i turer)
create table if not exists public.trip_tags (
  id             uuid primary key default gen_random_uuid(),
  trip_id        uuid references public.trips(id) on delete cascade not null,
  tagged_user_id uuid references public.users(id) on delete cascade not null,
  tagged_by      uuid references public.users(id) on delete cascade not null,
  created_at     timestamptz default now(),
  unique(trip_id, tagged_user_id)
);
alter table public.trip_tags enable row level security;
drop policy if exists "Anyone can read trip_tags" on public.trip_tags;
drop policy if exists "Users can tag" on public.trip_tags;
create policy "Anyone can read trip_tags" on public.trip_tags for select using (true);
create policy "Users can tag" on public.trip_tags for insert with check (auth.uid() = tagged_by);

-- Verify
SELECT 'likes' as tbl, count(*) FROM public.likes
UNION ALL SELECT 'comments', count(*) FROM public.comments
UNION ALL SELECT 'follows', count(*) FROM public.follows
UNION ALL SELECT 'notifications', count(*) FROM public.notifications
UNION ALL SELECT 'trip_tags', count(*) FROM public.trip_tags;

-- 9. ONBOARDED_AT på users (används av onboarding-flow och feed)
ALTER TABLE public.users ADD COLUMN IF NOT EXISTS onboarded_at timestamptz;

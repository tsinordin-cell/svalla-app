-- ============================================================
-- SVALLA — MIGRATION: Soft-delete trips + rate-limit likes/comments
-- Kör i Supabase SQL Editor (efter migration-feed-rpc.sql).
--
-- Syfte:
-- 1. Soft-delete av trips (ångrahängning i 30 dagar, skydd mot
--    dataförlust, enkel admin-undo).
-- 2. Rate-limit på likes (60/min per user) och comments (15/min
--    per user) för att stoppa spam/botar.
--
-- Idempotent: alla DDL använder if not exists / or replace.
-- ============================================================

-- ─────────────────────────────────────────────────────────────
-- 1. SOFT-DELETE TRIPS
-- ─────────────────────────────────────────────────────────────

-- 1a. Lägg till deleted_at (nullable — null = aktiv)
alter table public.trips
  add column if not exists deleted_at timestamptz null;

-- Partial index: bara aktiva trips. Snabbare än full-index eftersom
-- >99% av rader kommer ha deleted_at IS NULL i normalt drift.
create index if not exists trips_active_created_idx
  on public.trips(created_at desc)
  where deleted_at is null;

create index if not exists trips_active_user_created_idx
  on public.trips(user_id, created_at desc)
  where deleted_at is null;

-- 1b. Uppdatera feed_with_counts så soft-deleted trips filtreras
--     på databas-nivå (aldrig returneras till klienten).
create or replace function public.feed_with_counts(
  p_viewer       uuid        default null,
  p_limit        int         default 50,
  p_follow_only  boolean     default false,
  p_before_ts    timestamptz default null
)
returns table (
  id                  uuid,
  user_id             uuid,
  boat_type           text,
  distance            float,
  duration            integer,
  average_speed_knots float,
  max_speed_knots     float,
  image               text,
  route_id            uuid,
  created_at          timestamptz,
  location_name       text,
  caption             text,
  pinnar_rating       integer,
  started_at          timestamptz,
  ended_at            timestamptz,
  route_points        jsonb,
  username            text,
  avatar              text,
  route_name          text,
  likes_count         bigint,
  comments_count      bigint,
  user_liked          boolean
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    t.id,
    t.user_id,
    t.boat_type,
    t.distance,
    t.duration,
    t.average_speed_knots,
    t.max_speed_knots,
    t.image,
    t.route_id,
    t.created_at,
    t.location_name,
    t.caption,
    t.pinnar_rating,
    t.started_at,
    t.ended_at,
    t.route_points,
    u.username,
    u.avatar,
    r.name as route_name,
    coalesce((select count(*) from public.likes    l where l.trip_id = t.id), 0) as likes_count,
    coalesce((select count(*) from public.comments c where c.trip_id = t.id), 0) as comments_count,
    case
      when p_viewer is null then false
      else exists (
        select 1 from public.likes l2
        where l2.trip_id = t.id and l2.user_id = p_viewer
      )
    end as user_liked
  from public.trips t
  left join public.users  u on u.id = t.user_id
  left join public.routes r on r.id = t.route_id
  where t.deleted_at is null
    and (p_before_ts is null or t.created_at < p_before_ts)
    and (
      not p_follow_only
      or (
        p_viewer is not null
        and exists (
          select 1 from public.follows f
          where f.follower_id = p_viewer and f.following_id = t.user_id
        )
      )
    )
  order by t.created_at desc
  limit greatest(1, least(coalesce(p_limit, 50), 100));
$$;

grant execute on function public.feed_with_counts(uuid, int, boolean, timestamptz)
  to anon, authenticated;

-- 1c. Hjälpfunktion: soft-delete eller ångra
create or replace function public.soft_delete_trip(p_trip_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  update public.trips
     set deleted_at = now()
   where id = p_trip_id
     and user_id = auth.uid()       -- ägar-check
     and deleted_at is null;
  if not found then
    raise exception 'Trip not found or not owned by caller';
  end if;
end;
$$;

grant execute on function public.soft_delete_trip(uuid) to authenticated;

create or replace function public.restore_trip(p_trip_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  update public.trips
     set deleted_at = null
   where id = p_trip_id
     and user_id = auth.uid()
     and deleted_at is not null;
  if not found then
    raise exception 'Trip not found, not owned by caller, or not deleted';
  end if;
end;
$$;

grant execute on function public.restore_trip(uuid) to authenticated;

-- 1d. Scheduled hard-delete: ta bort trips som soft-raderats för >30 dagar sen.
--     Kan köras via cron (pg_cron eller GitHub Actions). Bara definition här.
create or replace function public.purge_old_deleted_trips()
returns int
language plpgsql
security definer
set search_path = public
as $$
declare purged int := 0;
begin
  delete from public.trips
  where deleted_at is not null
    and deleted_at < now() - interval '30 days';
  get diagnostics purged = row_count;
  return purged;
end;
$$;

-- Ingen default grant — körs av service_role via cron.

-- ─────────────────────────────────────────────────────────────
-- 2. RATE-LIMIT LIKES (60/min per user)
-- ─────────────────────────────────────────────────────────────

create index if not exists likes_user_created_idx
  on public.likes(user_id, created_at desc);

create or replace function public.rate_limit_likes()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare recent_count int;
begin
  select count(*) into recent_count
    from public.likes
   where user_id = new.user_id
     and created_at > now() - interval '1 minute';
  if recent_count >= 60 then
    raise exception 'Rate limit: max 60 likes per minute'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists rate_limit_likes_trigger on public.likes;
create trigger rate_limit_likes_trigger
  before insert on public.likes
  for each row execute function public.rate_limit_likes();

-- ─────────────────────────────────────────────────────────────
-- 3. RATE-LIMIT COMMENTS (15/min per user)
-- ─────────────────────────────────────────────────────────────

create index if not exists comments_user_created_idx
  on public.comments(user_id, created_at desc);

create or replace function public.rate_limit_comments()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare recent_count int;
begin
  select count(*) into recent_count
    from public.comments
   where user_id = new.user_id
     and created_at > now() - interval '1 minute';
  if recent_count >= 15 then
    raise exception 'Rate limit: max 15 comments per minute'
      using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists rate_limit_comments_trigger on public.comments;
create trigger rate_limit_comments_trigger
  before insert on public.comments
  for each row execute function public.rate_limit_comments();

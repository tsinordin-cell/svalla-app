-- ============================================================
-- SVALLA — MIGRATION: Bulk-query feed RPC
-- Kör i Supabase SQL Editor.
--
-- Syfte: Eliminera N+1 i feed-laddning. Idag gör feed/page.tsx
-- 4-7 separata queries (trips, follows, users, likes, comments,
-- user_liked, achievements). Den här RPC:n returnerar trips +
-- user-info + likes_count + comments_count + user_liked i ETT
-- anrop. Bygger även fundamentet för algoritmiskt flöde (Fas 3).
--
-- Säkerhet: SECURITY INVOKER → RLS-policyerna på trips/likes/
-- comments/users gäller fortsatt. Viewer-id skickas in som
-- parameter (klienten kan inte luras att se andras user_liked
-- eftersom likes är public read ändå).
-- ============================================================

-- 1. Performance-index (no-ops om de redan finns)
create index if not exists trips_created_at_idx     on public.trips(created_at desc);
create index if not exists trips_user_created_idx   on public.trips(user_id, created_at desc);
create index if not exists likes_trip_id_idx        on public.likes(trip_id);
create index if not exists likes_user_trip_idx      on public.likes(user_id, trip_id);
create index if not exists comments_trip_id_idx     on public.comments(trip_id);
create index if not exists follows_follower_idx     on public.follows(follower_id);
create index if not exists notifications_user_unread_idx
  on public.notifications(user_id, read, created_at desc);

-- 2. Bulk feed query — en enda round-trip per fliken
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
  where (p_before_ts is null or t.created_at < p_before_ts)
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

-- 3. Notifikations-aggregering — slå ihop "3 personer gillade din tur"
--    Returnerar gruppera notiser för en user, senaste först.
create or replace function public.notifications_grouped(
  p_user uuid,
  p_limit int default 50
)
returns table (
  type        text,
  trip_id     uuid,
  actor_count bigint,
  actor_ids   uuid[],
  last_actor  uuid,
  last_at     timestamptz,
  any_unread  boolean,
  ids         uuid[]
)
language sql
stable
security invoker
set search_path = public
as $$
  select
    n.type,
    n.trip_id,
    count(distinct n.actor_id)                              as actor_count,
    array_agg(distinct n.actor_id)                          as actor_ids,
    (array_agg(n.actor_id order by n.created_at desc))[1]   as last_actor,
    max(n.created_at)                                       as last_at,
    bool_or(not n.read)                                     as any_unread,
    array_agg(n.id)                                         as ids
  from public.notifications n
  where n.user_id = p_user
  group by n.type, n.trip_id
  order by max(n.created_at) desc
  limit greatest(1, least(coalesce(p_limit, 50), 200));
$$;

grant execute on function public.notifications_grouped(uuid, int)
  to authenticated;

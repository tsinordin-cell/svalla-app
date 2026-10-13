-- Blockering av användare (2026-10-11). Tabellen user_blocks har aldrig funnits,
-- fast koden (lib/blocks.ts, /api/block, Blockera-knappen i profiler och
-- meddelanden) skrivit till den sedan april – varje blockering misslyckades tyst.
--
-- Regeln sitter i databasen, så ingen route eller gammal klient kan gå förbi den:
-- när A blockerat B (eller tvärtom) kan ingen av dem följa, gilla, kommentera,
-- tagga eller skicka meddelanden till den andra; kommentarer mellan dem döljs
-- för båda; feeden visar inte den andras turer; befintliga följningar tas bort.
-- Blockeringar syns bara för den som gjort dem.

set lock_timeout = '5s';

create table if not exists public.user_blocks (
  blocker_id uuid not null references auth.users(id) on delete cascade,
  blocked_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (blocker_id, blocked_id),
  check (blocker_id <> blocked_id)
);
create index if not exists user_blocks_blocked_idx on public.user_blocks (blocked_id);

-- update behövs: appen skriver med upsert (INSERT … ON CONFLICT DO UPDATE).
grant select, insert, update, delete on public.user_blocks to authenticated;
grant all on public.user_blocks to service_role;
alter table public.user_blocks enable row level security;
drop policy if exists "egna blockeringar" on public.user_blocks;
create policy "egna blockeringar" on public.user_blocks
  for all to authenticated
  using (blocker_id = auth.uid()) with check (blocker_id = auth.uid());

-- Sant om någon av de två har blockerat den andra. security definer så att
-- policyer på andra tabeller kan fråga utan att läsa motpartens rader.
-- Svarar bara om den som frågar är en av de två (eller tjänsten); annars
-- kunde vem som helst ta reda på om två andra blockerat varandra.
create or replace function public.ar_blockerad(a uuid, b uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select a is not null and b is not null
    and coalesce(auth.uid() in (a, b) or current_setting('role', true) = 'service_role', false)
    and exists (
      select 1 from public.user_blocks
      where (blocker_id = a and blocked_id = b) or (blocker_id = b and blocked_id = a)
    );
$$;
revoke all on function public.ar_blockerad(uuid, uuid) from public;
-- anon får anropa (feed_with_counts gör det per rad) men får alltid false.
grant execute on function public.ar_blockerad(uuid, uuid) to anon, authenticated, service_role;

-- Blockering tar bort följningar åt båda håll.
create or replace function public.vid_blockering()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  delete from public.follows
   where (follower_id = new.blocker_id and following_id = new.blocked_id)
      or (follower_id = new.blocked_id and following_id = new.blocker_id);
  return new;
end $$;
drop trigger if exists user_blocks_vid_blockering on public.user_blocks;
create trigger user_blocks_vid_blockering after insert on public.user_blocks
  for each row execute function public.vid_blockering();

-- Inga nya relationer mellan blockerade.
drop policy if exists "Users can follow" on public.follows;
create policy "Users can follow" on public.follows for insert
  with check (auth.uid() = follower_id and not public.ar_blockerad(follower_id, following_id));

drop policy if exists "Users can like" on public.likes;
create policy "Users can like" on public.likes for insert
  with check (auth.uid() = user_id and not public.ar_blockerad(user_id,
    (select t.user_id from public.trips t where t.id = likes.trip_id)));

drop policy if exists "Users can comment" on public.comments;
create policy "Users can comment" on public.comments for insert
  with check (auth.uid() = user_id and not public.ar_blockerad(user_id,
    (select t.user_id from public.trips t where t.id = comments.trip_id)));

-- Kommentarer mellan blockerade döljs för båda; alla andra ser dem som förut.
drop policy if exists "Anyone can read comments" on public.comments;
create policy "Anyone can read comments" on public.comments for select
  using (not public.ar_blockerad(auth.uid(), user_id));

drop policy if exists "tag on own trip" on public.trip_tags;
create policy "tag on own trip" on public.trip_tags for insert
  with check (auth.uid() = tagged_by_user_id
    and exists (select 1 from public.trips where trips.id = trip_tags.trip_id and trips.user_id = auth.uid())
    and not public.ar_blockerad(tagged_by_user_id, tagged_user_id));

-- Ingen kan läggas till i en konversation av någon som är blockerad, och inga
-- meddelanden kan skickas i en konversation där någon deltagare är blockerad.
-- Medvetet val: det gäller även gruppkonversationer (en blockerad ska inte
-- kunna nå den andra via en grupp). Profiler och enskilda turer förblir
-- öppna som för alla andra; bara feeden och interaktionerna påverkas.
drop policy if exists "join conversation" on public.conversation_participants;
create policy "join conversation" on public.conversation_participants for insert
  with check (public.ar_konversationens_skapare(conversation_id)
    and not public.ar_blockerad(auth.uid(), user_id));

create or replace function public.blockerad_i_konversation(conv uuid, uid uuid)
returns boolean language sql stable security definer set search_path = public as $$
  select exists (
    select 1 from public.conversation_participants p
    where p.conversation_id = conv and p.user_id <> uid and public.ar_blockerad(uid, p.user_id)
  );
$$;
revoke all on function public.blockerad_i_konversation(uuid, uuid) from public;
grant execute on function public.blockerad_i_konversation(uuid, uuid) to anon, authenticated, service_role;

drop policy if exists "send messages" on public.messages;
create policy "send messages" on public.messages for insert
  with check (auth.uid() = user_id and public.is_conv_member(conversation_id, auth.uid())
    and not public.blockerad_i_konversation(conversation_id, auth.uid()));

-- Feeden visar inte turer från någon man blockerat eller blockerats av.
create or replace function public.feed_with_counts(p_viewer uuid default null, p_limit integer default 50, p_follow_only boolean default false, p_before_ts timestamptz default null)
returns table(id uuid, user_id uuid, boat_type text, distance double precision, duration integer, average_speed_knots double precision, max_speed_knots double precision, image text, route_id uuid, created_at timestamptz, location_name text, caption text, pinnar_rating integer, started_at timestamptz, ended_at timestamptz, route_points jsonb, username text, avatar text, route_name text, likes_count bigint, comments_count bigint, user_liked boolean)
language sql stable set search_path to 'public' as $$
  select
    t.id, t.user_id, t.boat_type, t.distance, t.duration,
    t.average_speed_knots, t.max_speed_knots, t.image, t.route_id,
    t.created_at, t.location_name, t.caption, t.pinnar_rating,
    t.started_at, t.ended_at, t.route_points,
    u.username, u.avatar,
    r.name as route_name,
    coalesce((select count(*) from public.likes    l where l.trip_id = t.id), 0) as likes_count,
    coalesce((select count(*) from public.comments c where c.trip_id = t.id), 0) as comments_count,
    case
      when p_viewer is null then false
      else exists (select 1 from public.likes l2 where l2.trip_id = t.id and l2.user_id = p_viewer)
    end as user_liked
  from public.trips t
  left join public.users  u on u.id = t.user_id
  left join public.routes r on r.id = t.route_id
  where t.deleted_at is null
    and (p_before_ts is null or t.created_at < p_before_ts)
    and not public.ar_blockerad(p_viewer, t.user_id)
    and (
      not p_follow_only
      or (p_viewer is not null and exists (
        select 1 from public.follows f where f.follower_id = p_viewer and f.following_id = t.user_id))
    )
  order by t.created_at desc
  limit greatest(1, least(coalesce(p_limit, 50), 100));
$$;

-- Kontroll
select 'Tabell user_blocks' as kontroll, case when to_regclass('public.user_blocks') is not null then 'OK' else 'FEL' end as resultat
union all select 'Funktionen ar_blockerad', case when to_regprocedure('public.ar_blockerad(uuid,uuid)') is not null then 'OK' else 'FEL' end
union all select 'Policyer med blockering', case when count(*) = 7 then 'OK' else 'FEL: ' || count(*) end
  from pg_policies where schemaname = 'public' and (qual like '%ar_blockerad%' or with_check like '%ar_blockerad%' or with_check like '%blockerad_i_konversation%');

-- ============================================================
-- SVALLA — MIGRATION: SOCIAL v2
-- DM, klubbar, check-ins, events, stories, turtaggning,
-- reposts, platsrecensioner, achievement-feed, follow-prefs,
-- invites. Allt med RLS.
-- Kör i Supabase SQL Editor. Idempotent där möjligt.
-- ============================================================

-- ============================================================
-- 1. DM + KLUBBAR — conversations, participants, messages
-- ============================================================

create table if not exists public.conversations (
  id                      uuid primary key default gen_random_uuid(),
  is_group                boolean not null default false,
  title                   text,                           -- null för 1-till-1
  club_id                 uuid,                           -- FK sätts nedan
  created_by              uuid references public.users(id) on delete set null,
  created_at              timestamptz not null default now(),
  last_message_at         timestamptz not null default now(),
  last_message_preview    text,
  last_message_user_id    uuid references public.users(id) on delete set null
);

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id         uuid not null references public.users(id) on delete cascade,
  role            text not null default 'member' check (role in ('owner','admin','member')),
  joined_at       timestamptz not null default now(),
  last_read_at    timestamptz not null default 'epoch',
  muted           boolean not null default false,
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id         uuid not null references public.users(id) on delete cascade,
  content         text,
  attachment_type text check (attachment_type in ('image','geo','trip')),
  attachment_url  text,
  attachment_meta jsonb,
  created_at      timestamptz not null default now(),
  check (content is not null or attachment_type is not null)
);

create index if not exists messages_conv_created_idx on public.messages(conversation_id, created_at desc);
create index if not exists participants_user_idx     on public.conversation_participants(user_id);
create index if not exists conversations_last_msg_idx on public.conversations(last_message_at desc);

alter table public.conversations              enable row level security;
alter table public.conversation_participants  enable row level security;
alter table public.messages                   enable row level security;

-- Helper-funktion: är användare deltagare i konversation?
create or replace function public.is_conv_member(conv uuid, uid uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from public.conversation_participants
    where conversation_id = conv and user_id = uid
  );
$$;

drop policy if exists "read own conversations"    on public.conversations;
drop policy if exists "create conversations"      on public.conversations;
drop policy if exists "update conversations own"  on public.conversations;
create policy "read own conversations" on public.conversations
  for select using (public.is_conv_member(id, auth.uid()));
create policy "create conversations" on public.conversations
  for insert with check (auth.uid() = created_by);
create policy "update conversations own" on public.conversations
  for update using (public.is_conv_member(id, auth.uid()));

drop policy if exists "read participants"      on public.conversation_participants;
drop policy if exists "join conversation"      on public.conversation_participants;
drop policy if exists "leave conversation"     on public.conversation_participants;
drop policy if exists "update own participant" on public.conversation_participants;
create policy "read participants" on public.conversation_participants
  for select using (public.is_conv_member(conversation_id, auth.uid()));
create policy "join conversation" on public.conversation_participants
  for insert with check (auth.uid() = user_id);
create policy "leave conversation" on public.conversation_participants
  for delete using (auth.uid() = user_id);
create policy "update own participant" on public.conversation_participants
  for update using (auth.uid() = user_id);

drop policy if exists "read messages in conv" on public.messages;
drop policy if exists "send messages" on public.messages;
drop policy if exists "delete own message" on public.messages;
create policy "read messages in conv" on public.messages
  for select using (public.is_conv_member(conversation_id, auth.uid()));
create policy "send messages" on public.messages
  for insert with check (
    auth.uid() = user_id
    and public.is_conv_member(conversation_id, auth.uid())
  );
create policy "delete own message" on public.messages
  for delete using (auth.uid() = user_id);

-- Trigger: uppdatera last_message_* på conversations när nytt meddelande postas
create or replace function public.touch_conversation_last_message()
returns trigger language plpgsql as $$
begin
  update public.conversations
  set
    last_message_at      = new.created_at,
    last_message_preview = coalesce(
      left(new.content, 140),
      case new.attachment_type
        when 'image' then '📷 Bild'
        when 'geo'   then '📍 Position'
        when 'trip'  then '⛵ Tur'
        else null
      end
    ),
    last_message_user_id = new.user_id
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_touch_conv_last on public.messages;
create trigger trg_touch_conv_last
  after insert on public.messages
  for each row execute function public.touch_conversation_last_message();

-- ============================================================
-- 2. KLUBBAR — clubs, club_members
-- ============================================================

create table if not exists public.clubs (
  id          uuid primary key default gen_random_uuid(),
  slug        text unique not null,
  name        text not null,
  description text,
  image       text,
  is_public   boolean not null default true,
  region      text,
  created_by  uuid references public.users(id) on delete set null,
  created_at  timestamptz not null default now()
);

create table if not exists public.club_members (
  club_id   uuid not null references public.clubs(id) on delete cascade,
  user_id   uuid not null references public.users(id) on delete cascade,
  role      text not null default 'member' check (role in ('owner','admin','member')),
  joined_at timestamptz not null default now(),
  primary key (club_id, user_id)
);

create index if not exists club_members_user_idx on public.club_members(user_id);

-- Nu kan vi sätta FK från conversations.club_id → clubs.id
do $$ begin
  if not exists (
    select 1 from information_schema.table_constraints
    where constraint_name = 'conversations_club_id_fkey'
  ) then
    alter table public.conversations
      add constraint conversations_club_id_fkey
      foreign key (club_id) references public.clubs(id) on delete set null;
  end if;
end $$;

alter table public.clubs        enable row level security;
alter table public.club_members enable row level security;

drop policy if exists "read public clubs"    on public.clubs;
drop policy if exists "read member clubs"    on public.clubs;
drop policy if exists "create clubs"         on public.clubs;
drop policy if exists "update own clubs"     on public.clubs;
create policy "read public clubs" on public.clubs
  for select using (is_public = true);
create policy "read member clubs" on public.clubs
  for select using (exists (
    select 1 from public.club_members
    where club_id = id and user_id = auth.uid()
  ));
create policy "create clubs" on public.clubs
  for insert with check (auth.uid() = created_by);
create policy "update own clubs" on public.clubs
  for update using (auth.uid() = created_by);

drop policy if exists "read club members"  on public.club_members;
drop policy if exists "join club"          on public.club_members;
drop policy if exists "leave club"         on public.club_members;
create policy "read club members" on public.club_members
  for select using (true);
create policy "join club" on public.club_members
  for insert with check (auth.uid() = user_id);
create policy "leave club" on public.club_members
  for delete using (auth.uid() = user_id);

-- ============================================================
-- 3. CHECK-INS — snabb positionspost utan full tur
-- ============================================================

create table if not exists public.check_ins (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references public.users(id) on delete cascade,
  place_id     uuid,                                   -- valfri referens till restaurants/platser
  place_name   text,                                   -- fristående textnamn om ingen place
  lat          double precision,
  lng          double precision,
  message      text check (char_length(coalesce(message,'')) <= 280),
  image        text,
  created_at   timestamptz not null default now()
);

create index if not exists check_ins_user_idx    on public.check_ins(user_id);
create index if not exists check_ins_created_idx on public.check_ins(created_at desc);

alter table public.check_ins enable row level security;
drop policy if exists "read check_ins" on public.check_ins;
drop policy if exists "create own check_in" on public.check_ins;
drop policy if exists "delete own check_in" on public.check_ins;
create policy "read check_ins" on public.check_ins for select using (true);
create policy "create own check_in" on public.check_ins for insert with check (auth.uid() = user_id);
create policy "delete own check_in" on public.check_ins for delete using (auth.uid() = user_id);

-- ============================================================
-- 4. EVENTS — regattor, gemensamma seglingar
-- ============================================================

create table if not exists public.events (
  id            uuid primary key default gen_random_uuid(),
  slug          text unique,
  title         text not null,
  description   text,
  image         text,
  starts_at     timestamptz not null,
  ends_at       timestamptz,
  location_name text,
  lat           double precision,
  lng           double precision,
  club_id       uuid references public.clubs(id) on delete set null,
  created_by    uuid references public.users(id) on delete set null,
  created_at    timestamptz not null default now()
);

create table if not exists public.event_attendees (
  event_id   uuid not null references public.events(id) on delete cascade,
  user_id    uuid not null references public.users(id) on delete cascade,
  status     text not null default 'going' check (status in ('going','maybe','no')),
  joined_at  timestamptz not null default now(),
  primary key (event_id, user_id)
);

create index if not exists events_starts_idx on public.events(starts_at desc);
create index if not exists attendees_user_idx on public.event_attendees(user_id);

alter table public.events enable row level security;
alter table public.event_attendees enable row level security;

drop policy if exists "read events" on public.events;
drop policy if exists "create events" on public.events;
drop policy if exists "update own events" on public.events;
drop policy if exists "delete own events" on public.events;
create policy "read events" on public.events for select using (true);
create policy "create events" on public.events for insert with check (auth.uid() = created_by);
create policy "update own events" on public.events for update using (auth.uid() = created_by);
create policy "delete own events" on public.events for delete using (auth.uid() = created_by);

drop policy if exists "read attendees" on public.event_attendees;
drop policy if exists "attend event" on public.event_attendees;
drop policy if exists "leave event" on public.event_attendees;
drop policy if exists "update attendance" on public.event_attendees;
create policy "read attendees" on public.event_attendees for select using (true);
create policy "attend event" on public.event_attendees for insert with check (auth.uid() = user_id);
create policy "leave event" on public.event_attendees for delete using (auth.uid() = user_id);
create policy "update attendance" on public.event_attendees for update using (auth.uid() = user_id);

-- ============================================================
-- 5. TRIP-TAGS — tagga medseglare på turer
-- ============================================================

create table if not exists public.trip_tags (
  trip_id          uuid not null references public.trips(id) on delete cascade,
  tagged_user_id   uuid not null references public.users(id) on delete cascade,
  tagged_by_user_id uuid references public.users(id) on delete set null,
  confirmed        boolean not null default false,
  created_at       timestamptz not null default now(),
  primary key (trip_id, tagged_user_id)
);

create index if not exists trip_tags_user_idx on public.trip_tags(tagged_user_id);

alter table public.trip_tags enable row level security;
drop policy if exists "read trip_tags" on public.trip_tags;
drop policy if exists "tag on own trip" on public.trip_tags;
drop policy if exists "untag own" on public.trip_tags;
drop policy if exists "confirm own tag" on public.trip_tags;
create policy "read trip_tags" on public.trip_tags for select using (true);
create policy "tag on own trip" on public.trip_tags
  for insert with check (
    auth.uid() = tagged_by_user_id
    and exists (select 1 from public.trips where id = trip_id and user_id = auth.uid())
  );
create policy "untag own" on public.trip_tags
  for delete using (auth.uid() = tagged_user_id or auth.uid() = tagged_by_user_id);
create policy "confirm own tag" on public.trip_tags
  for update using (auth.uid() = tagged_user_id);

-- ============================================================
-- 6. STORIES — 24h-highlights
-- ============================================================

create table if not exists public.stories (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  image       text,
  caption     text check (char_length(coalesce(caption,'')) <= 200),
  lat         double precision,
  lng         double precision,
  location_name text,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz not null default (now() + interval '24 hours')
);

create index if not exists stories_user_idx    on public.stories(user_id);
create index if not exists stories_expires_idx on public.stories(expires_at);

alter table public.stories enable row level security;
drop policy if exists "read active stories" on public.stories;
drop policy if exists "post own story" on public.stories;
drop policy if exists "delete own story" on public.stories;
create policy "read active stories" on public.stories
  for select using (expires_at > now());
create policy "post own story" on public.stories
  for insert with check (auth.uid() = user_id);
create policy "delete own story" on public.stories
  for delete using (auth.uid() = user_id);

-- Story-views (räkna visningar)
create table if not exists public.story_views (
  story_id  uuid not null references public.stories(id) on delete cascade,
  user_id   uuid not null references public.users(id) on delete cascade,
  viewed_at timestamptz not null default now(),
  primary key (story_id, user_id)
);
alter table public.story_views enable row level security;
drop policy if exists "read story views owner" on public.story_views;
drop policy if exists "record own view" on public.story_views;
create policy "read story views owner" on public.story_views
  for select using (
    exists (select 1 from public.stories s where s.id = story_id and s.user_id = auth.uid())
    or auth.uid() = user_id
  );
create policy "record own view" on public.story_views
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- 7. REPOSTS — dela någon annans tur med kommentar
-- ============================================================

create table if not exists public.reposts (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  trip_id     uuid not null references public.trips(id) on delete cascade,
  comment     text check (char_length(coalesce(comment,'')) <= 500),
  created_at  timestamptz not null default now(),
  unique (user_id, trip_id)
);

create index if not exists reposts_trip_idx on public.reposts(trip_id);
create index if not exists reposts_user_idx on public.reposts(user_id);

alter table public.reposts enable row level security;
drop policy if exists "read reposts" on public.reposts;
drop policy if exists "create own repost" on public.reposts;
drop policy if exists "delete own repost" on public.reposts;
create policy "read reposts" on public.reposts for select using (true);
create policy "create own repost" on public.reposts for insert with check (auth.uid() = user_id);
create policy "delete own repost" on public.reposts for delete using (auth.uid() = user_id);

-- ============================================================
-- 8. PLACE REVIEWS — recensioner av platser/restauranger
-- ============================================================

create table if not exists public.place_reviews (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  place_id    uuid,                                   -- restaurant/platser/oar id
  place_type  text check (place_type in ('restaurant','island','harbor','generic')),
  rating      smallint check (rating between 1 and 5),
  body        text check (char_length(coalesce(body,'')) <= 1000),
  created_at  timestamptz not null default now(),
  unique (user_id, place_id, place_type)
);

create index if not exists place_reviews_place_idx on public.place_reviews(place_type, place_id);

alter table public.place_reviews enable row level security;
drop policy if exists "read reviews" on public.place_reviews;
drop policy if exists "post own review" on public.place_reviews;
drop policy if exists "edit own review" on public.place_reviews;
drop policy if exists "delete own review" on public.place_reviews;
create policy "read reviews"    on public.place_reviews for select using (true);
create policy "post own review" on public.place_reviews for insert with check (auth.uid() = user_id);
create policy "edit own review" on public.place_reviews for update using (auth.uid() = user_id);
create policy "delete own review" on public.place_reviews for delete using (auth.uid() = user_id);

-- ============================================================
-- 9. ACHIEVEMENT-EVENTS — feed-objekt när nytt märke öppnas
-- ============================================================

create table if not exists public.achievement_events (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references public.users(id) on delete cascade,
  achievement_key text not null,
  awarded_at      timestamptz not null default now(),
  unique (user_id, achievement_key)
);

create index if not exists achv_events_user_idx on public.achievement_events(user_id, awarded_at desc);

alter table public.achievement_events enable row level security;
drop policy if exists "read achievement events" on public.achievement_events;
drop policy if exists "record own achievement" on public.achievement_events;
create policy "read achievement events" on public.achievement_events for select using (true);
create policy "record own achievement" on public.achievement_events
  for insert with check (auth.uid() = user_id);

-- ============================================================
-- 10. FOLLOW-PREFS — granulära notiser per relation
-- ============================================================

create table if not exists public.follow_prefs (
  follower_id   uuid not null references public.users(id) on delete cascade,
  following_id  uuid not null references public.users(id) on delete cascade,
  notify_any    boolean not null default true,   -- helt av/på
  only_magic    boolean not null default false,  -- bara pinnar=3
  min_distance  numeric,                         -- nautiska mil
  updated_at    timestamptz not null default now(),
  primary key (follower_id, following_id)
);

alter table public.follow_prefs enable row level security;
drop policy if exists "read own prefs"  on public.follow_prefs;
drop policy if exists "upsert own prefs" on public.follow_prefs;
drop policy if exists "update own prefs" on public.follow_prefs;
drop policy if exists "delete own prefs" on public.follow_prefs;
create policy "read own prefs"   on public.follow_prefs for select using (auth.uid() = follower_id);
create policy "upsert own prefs" on public.follow_prefs for insert with check (auth.uid() = follower_id);
create policy "update own prefs" on public.follow_prefs for update using (auth.uid() = follower_id);
create policy "delete own prefs" on public.follow_prefs for delete using (auth.uid() = follower_id);

-- ============================================================
-- 11. INVITES — inbjudningslänkar
-- ============================================================

create table if not exists public.invites (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.users(id) on delete cascade,
  code        text unique not null,
  uses        integer not null default 0,
  max_uses    integer,
  created_at  timestamptz not null default now(),
  expires_at  timestamptz
);

create index if not exists invites_user_idx on public.invites(user_id);

alter table public.invites enable row level security;
drop policy if exists "read own invites" on public.invites;
drop policy if exists "read invite by code" on public.invites;
drop policy if exists "create own invite" on public.invites;
drop policy if exists "delete own invite" on public.invites;
create policy "read own invites" on public.invites for select using (auth.uid() = user_id);
create policy "create own invite" on public.invites for insert with check (auth.uid() = user_id);
create policy "delete own invite" on public.invites for delete using (auth.uid() = user_id);

-- Publik tabell för att validera invite-koder (utan att se user_id)
create or replace view public.invite_codes as
  select code, max_uses, uses, expires_at from public.invites;
grant select on public.invite_codes to anon, authenticated;

-- SECURITY DEFINER-funktion: bumpa uses + returnera inviter user_id
-- Används av ny användare direkt efter signup för att lösa in en kod.
create or replace function public.redeem_invite_code(p_code text)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_row record;
begin
  select id, user_id, max_uses, uses, expires_at
    into v_row
    from public.invites
    where code = upper(p_code)
    for update;

  if not found then
    return null;
  end if;

  if v_row.expires_at is not null and v_row.expires_at < now() then
    return null;
  end if;

  if v_row.max_uses is not null and v_row.uses >= v_row.max_uses then
    return null;
  end if;

  if v_row.user_id = auth.uid() then
    -- kan inte lösa in sin egen kod
    return null;
  end if;

  update public.invites set uses = uses + 1 where id = v_row.id;

  return v_row.user_id;
end;
$$;

grant execute on function public.redeem_invite_code(text) to authenticated;

-- ============================================================
-- 12. NOTIFICATIONS — utöka type-enum för nya features
-- ============================================================

-- Ta bort det gamla check-constraintet och lägg till nytt med fler typer
do $$ begin
  if exists (
    select 1 from information_schema.constraint_column_usage
    where table_name = 'notifications' and constraint_name like 'notifications_type_check%'
  ) then
    alter table public.notifications drop constraint if exists notifications_type_check;
  end if;
end $$;

alter table public.notifications
  add constraint notifications_type_check
  check (type in (
    'like','comment','follow','tag',
    'message','mention','event_invite','event_reminder',
    'club_invite','trip_tag','achievement','repost','checkin_near'
  ));

-- ============================================================
-- KLART
-- ============================================================

-- analytics_events: egen lagring så vi kan queryra direkt via SQL.
-- Parallell med PostHog (PostHog är primary, denna är för snabba SQL-frågor
-- och egen dashboard på /admin/insikter).
--
-- Designad för WRITE-tung load (varje page view, klick) och READ-light
-- (admin-queryer någon gång per dag). Index på event_name + created_at
-- räcker för >99% av frågorna.

create table if not exists public.analytics_events (
  id           bigserial primary key,
  event_name   text        not null,
  user_id      uuid        references auth.users(id) on delete set null,
  -- Anonym session-id (cookie eller fallback) för att räkna unika när
  -- user_id saknas (utloggade besökare).
  session_id   text,
  -- Page path där event triggades (för att se "från vilken sida")
  path         text,
  -- Event-specifika properties — JSONB så vi kan lägga in vad som helst
  -- utan schema-ändring. Queries via -> och ->> operatorer.
  props        jsonb       not null default '{}'::jsonb,
  -- Geo + tech (frivilligt)
  country_code text,
  user_agent   text,
  referer      text,
  created_at   timestamptz not null default now()
);

-- Index för de vanligaste frågorna
create index if not exists analytics_events_name_created_idx
  on public.analytics_events (event_name, created_at desc);
create index if not exists analytics_events_created_idx
  on public.analytics_events (created_at desc);
create index if not exists analytics_events_user_idx
  on public.analytics_events (user_id) where user_id is not null;
-- GIN-index på props för att queryra t.ex. props->>'place_id'
create index if not exists analytics_events_props_idx
  on public.analytics_events using gin (props);

-- RLS: ingen direkt skrivning från klient — bara service role via /api/analytics/track
alter table public.analytics_events enable row level security;
create policy "service role can manage events" on public.analytics_events
  for all using (auth.jwt() ->> 'role' = 'service_role');

comment on table public.analytics_events is
  'Egen analytics-lagring parallell med PostHog. Används för admin-dashboard på /admin/insikter.';

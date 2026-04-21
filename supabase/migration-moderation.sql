-- ============================================================
-- SVALLA — MIGRATION: MODERATION v1
-- Tabeller: reports
-- (user_blocks finns redan i migration-social-v2.sql)
-- Kör i Supabase SQL Editor. Idempotent där möjligt.
-- ============================================================

-- ============================================================
-- 1. HELPER: is_admin_user() — för RLS-policies
-- ============================================================

create or replace function public.is_admin_user()
returns boolean
language sql stable
security definer
set search_path = public
as $$
  select coalesce(
    (select is_admin from public.users where id = auth.uid()),
    false
  );
$$;

-- ============================================================
-- 2. REPORTS — anmälningar av innehåll
-- ============================================================

create table if not exists public.reports (
  id            uuid primary key default gen_random_uuid(),
  reporter_id   uuid not null references public.users(id) on delete cascade,
  target_type   text not null
                  check (target_type in ('trip','comment','user','message','review','story','checkin')),
  target_id     uuid not null,
  reason        text not null
                  check (reason in ('spam','harassment','inappropriate','misinformation','underage','other')),
  note          text check (char_length(coalesce(note,'')) <= 500),
  status        text not null default 'open'
                  check (status in ('open','reviewed','actioned','dismissed')),
  auto_flagged  boolean not null default false,   -- satt av ordfilter
  created_at    timestamptz not null default now(),
  reviewed_by   uuid references public.users(id) on delete set null,
  reviewed_at   timestamptz,

  -- En användare kan bara anmäla ett specifikt innehåll en gång
  unique (reporter_id, target_type, target_id)
);

create index if not exists reports_status_created_idx
  on public.reports(status, created_at desc);
create index if not exists reports_target_idx
  on public.reports(target_type, target_id);
create index if not exists reports_reporter_idx
  on public.reports(reporter_id);

alter table public.reports enable row level security;

-- Användare kan se sina egna anmälningar
drop policy if exists "read own reports"   on public.reports;
create policy "read own reports" on public.reports
  for select using (auth.uid() = reporter_id);

-- Admins kan läsa alla
drop policy if exists "admin read reports"  on public.reports;
create policy "admin read reports" on public.reports
  for select using (public.is_admin_user());

-- Inloggad användare kan skapa anmälan
drop policy if exists "create report"       on public.reports;
create policy "create report" on public.reports
  for insert with check (auth.uid() = reporter_id);

-- Admins kan uppdatera status
drop policy if exists "admin update report" on public.reports;
create policy "admin update report" on public.reports
  for update using (public.is_admin_user());

-- ============================================================
-- 3. NOTIFICATIONS: lägg till 'report_actioned' type
-- ============================================================

do $$ begin
  alter table public.notifications drop constraint if exists notifications_type_check;
  alter table public.notifications
    add constraint notifications_type_check
    check (type in (
      'like','comment','follow','tag',
      'message','mention','event_invite','event_reminder',
      'club_invite','trip_tag','achievement','repost','checkin_near',
      'dm_accepted','report_actioned'
    ));
exception when others then null;
end $$;

-- ============================================================
-- 4. RPC: admin_update_report — uppdatera rapportstatus säkert
-- ============================================================

create or replace function public.admin_update_report(
  p_report_id uuid,
  p_status    text,
  p_note      text default null
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin_user() then
    raise exception 'Unauthorized';
  end if;

  if p_status not in ('reviewed','actioned','dismissed') then
    raise exception 'Ogiltigt status';
  end if;

  update public.reports
  set
    status      = p_status,
    reviewed_by = auth.uid(),
    reviewed_at = now(),
    note        = coalesce(p_note, note)
  where id = p_report_id;
end;
$$;

grant execute on function public.admin_update_report(uuid, text, text) to authenticated;

-- ============================================================
-- 5. RPC: get_moderation_queue — admin-vy med aggregerade data
-- ============================================================

create or replace function public.get_moderation_queue(
  p_status text default 'open',
  p_limit  int  default 50,
  p_offset int  default 0
)
returns table(
  id            uuid,
  target_type   text,
  target_id     uuid,
  reason        text,
  note          text,
  status        text,
  auto_flagged  boolean,
  created_at    timestamptz,
  reviewed_at   timestamptz,
  reporter_username text,
  reviewer_username text,
  report_count  bigint
)
language sql stable
security definer
set search_path = public
as $$
  select
    r.id,
    r.target_type,
    r.target_id,
    r.reason,
    r.note,
    r.status,
    r.auto_flagged,
    r.created_at,
    r.reviewed_at,
    u_reporter.username as reporter_username,
    u_reviewer.username as reviewer_username,
    count(*) over (partition by r.target_type, r.target_id) as report_count
  from public.reports r
  left join public.users u_reporter on u_reporter.id = r.reporter_id
  left join public.users u_reviewer on u_reviewer.id = r.reviewed_by
  where
    (p_status = 'all' or r.status = p_status)
    and public.is_admin_user()
  order by r.auto_flagged desc, r.created_at asc
  limit p_limit
  offset p_offset;
$$;

grant execute on function public.get_moderation_queue(text, int, int) to authenticated;

-- ============================================================
-- KLART
-- ============================================================

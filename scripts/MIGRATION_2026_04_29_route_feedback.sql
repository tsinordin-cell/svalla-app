-- ═══════════════════════════════════════════════════════════════════════════
-- MIGRATION_2026_04_29_route_feedback.sql
-- ═══════════════════════════════════════════════════════════════════════════
-- Tom: kör i Supabase SQL Editor.
-- Tabell + RLS för rapporter om felaktiga rutter i /planera.
-- ═══════════════════════════════════════════════════════════════════════════

create table if not exists route_feedback (
  id          uuid        primary key default gen_random_uuid(),
  route_id    text        not null,
  start_name  text,
  end_name    text,
  issue_type  text        not null check (issue_type in ('over-land','wrong-distance','wrong-stop','other')),
  comment     text,
  user_id     uuid        references auth.users(id) on delete set null,
  resolved    boolean     not null default false,
  created_at  timestamptz not null default now()
);

create index if not exists route_feedback_created_at_idx
  on route_feedback (created_at desc);

create index if not exists route_feedback_unresolved_idx
  on route_feedback (resolved, created_at desc) where resolved = false;

alter table route_feedback enable row level security;

drop policy if exists "route_feedback_insert" on route_feedback;
create policy "route_feedback_insert"
  on route_feedback for insert
  with check (true);  -- även anonyma kan rapportera

drop policy if exists "route_feedback_admin_read" on route_feedback;
create policy "route_feedback_admin_read"
  on route_feedback for select
  using (
    auth.uid() in (select id from users where is_admin = true)
  );

drop policy if exists "route_feedback_admin_update" on route_feedback;
create policy "route_feedback_admin_update"
  on route_feedback for update
  using (
    auth.uid() in (select id from users where is_admin = true)
  );

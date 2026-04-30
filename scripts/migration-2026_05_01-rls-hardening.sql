-- migration-2026_05_01-rls-hardening.sql
-- Aktiverar Row Level Security på fyra tabeller som saknat det.
-- Kör en gång i Supabase SQL editor.
--
-- Innan körning: verifiera att kolumnerna `is_public` på users och `is_admin` på users finns.
-- Om de saknas — ta bort de raderna nedan eller justera till matchande kolumnnamn.

-- ─── USERS ──────────────────────────────────────────────────────────────────
alter table users enable row level security;

-- Egen profil är alltid läsbar; andras endast om public.
drop policy if exists "users_select_self_or_public" on users;
create policy "users_select_self_or_public"
  on users for select
  using (
    auth.uid() = id
    OR coalesce(is_public, true) = true
  );

drop policy if exists "users_update_self" on users;
create policy "users_update_self"
  on users for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- Service role bypass (för admin-tools, cron, webhook)
drop policy if exists "users_service_all" on users;
create policy "users_service_all"
  on users for all
  to service_role
  using (true)
  with check (true);

-- ─── SUBSCRIPTIONS ──────────────────────────────────────────────────────────
alter table subscriptions enable row level security;

drop policy if exists "subscriptions_select_own" on subscriptions;
create policy "subscriptions_select_own"
  on subscriptions for select
  using (auth.uid() = user_id);

-- Service role får skriva (Stripe webhook)
drop policy if exists "subscriptions_service_all" on subscriptions;
create policy "subscriptions_service_all"
  on subscriptions for all
  to service_role
  using (true)
  with check (true);

-- ─── PARTNER_INQUIRIES ──────────────────────────────────────────────────────
alter table partner_inquiries enable row level security;

-- Vem som helst får skicka partner-förfrågan (inloggad eller anon)
drop policy if exists "partner_inquiries_insert_anyone" on partner_inquiries;
create policy "partner_inquiries_insert_anyone"
  on partner_inquiries for insert
  with check (true);

-- Endast admin kan läsa
drop policy if exists "partner_inquiries_admin_read" on partner_inquiries;
create policy "partner_inquiries_admin_read"
  on partner_inquiries for select
  using (
    auth.uid() in (select id from users where is_admin = true)
  );

drop policy if exists "partner_inquiries_service_all" on partner_inquiries;
create policy "partner_inquiries_service_all"
  on partner_inquiries for all
  to service_role
  using (true)
  with check (true);

-- ─── PUSH_SUBSCRIPTIONS ─────────────────────────────────────────────────────
alter table push_subscriptions enable row level security;

drop policy if exists "push_subs_select_own" on push_subscriptions;
create policy "push_subs_select_own"
  on push_subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "push_subs_insert_own" on push_subscriptions;
create policy "push_subs_insert_own"
  on push_subscriptions for insert
  with check (auth.uid() = user_id);

drop policy if exists "push_subs_delete_own" on push_subscriptions;
create policy "push_subs_delete_own"
  on push_subscriptions for delete
  using (auth.uid() = user_id);

drop policy if exists "push_subs_service_all" on push_subscriptions;
create policy "push_subs_service_all"
  on push_subscriptions for all
  to service_role
  using (true)
  with check (true);

-- ─── VERIFIERING ────────────────────────────────────────────────────────────
select
  c.relname as table_name,
  c.relrowsecurity as rls_enabled,
  count(p.polname) as policy_count
from pg_class c
left join pg_policy p on p.polrelid = c.oid
where c.relname in ('users', 'subscriptions', 'partner_inquiries', 'push_subscriptions')
group by c.relname, c.relrowsecurity
order by c.relname;

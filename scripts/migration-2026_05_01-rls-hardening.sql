-- migration-2026_05_01-rls-hardening.sql
-- KÖRT i prod 2026-04-30. Aktiverar RLS på users, partner_inquiries, push_subscriptions.
--
-- OBS: subscriptions-tabell finns INTE — Stripe Pro-status hanteras antagligen
-- via flagga på users (kontrollera kolumnen `is_pro` om RLS behöver utökas dit).
-- is_public finns INTE på users, så users.select är "true" (alla profiler är publika).

-- USERS
alter table users enable row level security;

drop policy if exists "users_select_all" on users;
create policy "users_select_all" on users for select using (true);

drop policy if exists "users_update_self" on users;
create policy "users_update_self" on users for update
  using (auth.uid() = id) with check (auth.uid() = id);

drop policy if exists "users_service_all" on users;
create policy "users_service_all" on users for all to service_role
  using (true) with check (true);

-- PARTNER_INQUIRIES
alter table partner_inquiries enable row level security;

drop policy if exists "partner_inquiries_insert_anyone" on partner_inquiries;
create policy "partner_inquiries_insert_anyone" on partner_inquiries for insert
  with check (true);

drop policy if exists "partner_inquiries_admin_read" on partner_inquiries;
create policy "partner_inquiries_admin_read" on partner_inquiries for select
  using (auth.uid() in (select id from users where is_admin = true));

drop policy if exists "partner_inquiries_service_all" on partner_inquiries;
create policy "partner_inquiries_service_all" on partner_inquiries for all to service_role
  using (true) with check (true);

-- PUSH_SUBSCRIPTIONS
alter table push_subscriptions enable row level security;

drop policy if exists "push_subs_select_own" on push_subscriptions;
create policy "push_subs_select_own" on push_subscriptions for select
  using (auth.uid() = user_id);

drop policy if exists "push_subs_insert_own" on push_subscriptions;
create policy "push_subs_insert_own" on push_subscriptions for insert
  with check (auth.uid() = user_id);

drop policy if exists "push_subs_delete_own" on push_subscriptions;
create policy "push_subs_delete_own" on push_subscriptions for delete
  using (auth.uid() = user_id);

drop policy if exists "push_subs_service_all" on push_subscriptions;
create policy "push_subs_service_all" on push_subscriptions for all to service_role
  using (true) with check (true);

-- VERIFIERING (3 rader förväntas, alla med rls=true)
select c.relname as t, c.relrowsecurity as rls, count(p.polname) as policies
from pg_class c left join pg_policy p on p.polrelid = c.oid
where c.relname in ('users','partner_inquiries','push_subscriptions')
group by c.relname, c.relrowsecurity
order by c.relname;

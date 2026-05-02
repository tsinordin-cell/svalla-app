-- migration-account-deletions.sql
-- GDPR audit log — sparar ingen PII, bara en SHA-256-hash av user_id + tidstämpel.
-- Används för att bevisa compliance utan att lagra personuppgifter.

create table if not exists account_deletions (
  id          bigserial    primary key,
  user_id_hash text        not null,         -- SHA-256(user_id), ej reversibelt
  deleted_at  timestamptz  not null default now()
);

-- Index för ev. compliance-queries
create index if not exists account_deletions_deleted_at_idx
  on account_deletions (deleted_at);

-- Ingen RLS behövs — tabellen skrivs enbart via service_role (admin-klient).
-- Blockera all access via anon/authenticated:
alter table account_deletions enable row level security;

-- Neka allt för authenticated + anon (service_role kringgår RLS automatiskt)
create policy "no public access" on account_deletions
  for all
  to anon, authenticated
  using (false);

-- migration-2026_05_01-onboarding.sql
-- Lägger till onboarding-fält på users.

alter table users
  add column if not exists onboarded_at timestamptz,
  add column if not exists vessel_model text,
  add column if not exists vessel_name text,
  add column if not exists home_port text,
  add column if not exists home_port_lat double precision,
  add column if not exists home_port_lng double precision;

-- Partial index för snabb redirect-check (filtrerar bara nya/ej-onboardade users)
create index if not exists idx_users_onboarded_at on users(onboarded_at) where onboarded_at is null;

-- Verifiering
select column_name from information_schema.columns
where table_name = 'users'
  and column_name in ('onboarded_at','vessel_model','vessel_name','home_port','home_port_lat','home_port_lng')
order by column_name;

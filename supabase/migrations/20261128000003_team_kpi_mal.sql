-- Justerbara mål i Roadmap på /team (Toms beslut 2026-11-28: "Gör dessa siffror
-- justerbara", och valet "Målen", inte mätvärdena).
--
-- Tillägg. En ny tabell, inga befintliga tabeller, regler eller data ändras.
-- Målen i src/app/team/roadmap-config.ts (KPIS.targets) är standardvärden. En rad
-- här skriver över målen för ett nyckeltal; finns ingen rad gäller standardvärdet.
-- Mätvärdena (partners, prenumeranter, intäkt osv.) räknas fortfarande live och
-- kan inte skrivas över härifrån.
--
-- Rättigheter: samma som övriga team_-tabeller, bara teamet (is_team_admin()).
-- Ingen DELETE: att gå tillbaka till standardvärdet görs genom att skriva in det.
--
-- Återställning: drop table public.team_kpi_mal;

create table if not exists public.team_kpi_mal (
  kpi         text primary key
              check (kpi in ('partners','subs','sessions','revenue','users','guides','islands')),
  steg1       numeric not null check (steg1 > 0),
  steg2       numeric not null check (steg2 >= steg1),
  steg3       numeric not null check (steg3 >= steg2),
  updated_by  uuid references public.users(id) on delete set null,
  updated_at  timestamptz not null default now()
);

alter table public.team_kpi_mal enable row level security;

create policy "team admins can read kpi mal" on public.team_kpi_mal
  for select to authenticated using (public.is_team_admin());
create policy "team admins can write kpi mal" on public.team_kpi_mal
  for insert to authenticated with check (public.is_team_admin());
create policy "team admins can update kpi mal" on public.team_kpi_mal
  for update to authenticated using (public.is_team_admin()) with check (public.is_team_admin());

revoke all on public.team_kpi_mal from anon;

comment on table public.team_kpi_mal is
  'Mål per nyckeltal och steg (1, 3, 5 MSEK) i Roadmap på /team. Saknas rad gäller standardvärdet i roadmap-config.ts.';

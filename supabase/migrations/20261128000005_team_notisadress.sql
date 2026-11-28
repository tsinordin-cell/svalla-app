-- Egen mejladress för teamets uppgiftsnotiser (Tom 2026-11-28: "Max ska få sina
-- notiser genom max@svalla.se och jag ska få mina notiser genom thomas@svalla.se").
--
-- Tillägg. En ny tabell, inga befintliga tabeller, regler eller data ändras.
-- Finns en rad här skickas uppgiftsmejlet (/api/team/delegera) dit, annars till
-- adressen på kontot. Inloggningen och kontots adress påverkas inte.
--
-- Rättigheter: bara teamet (is_team_admin()) kan läsa och ändra. Routen läser
-- med tjänsteklienten. anon har ingen rätt.
--
-- Återställning: drop table public.team_notisadress;

create table if not exists public.team_notisadress (
  user_id     uuid primary key references public.users(id) on delete cascade,
  epost       text not null check (epost ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  updated_at  timestamptz not null default now()
);

alter table public.team_notisadress enable row level security;

create policy "team admins can read notisadress" on public.team_notisadress
  for select to authenticated using (public.is_team_admin());
create policy "team admins can write notisadress" on public.team_notisadress
  for insert to authenticated with check (public.is_team_admin());
create policy "team admins can update notisadress" on public.team_notisadress
  for update to authenticated using (public.is_team_admin()) with check (public.is_team_admin());

revoke all on public.team_notisadress from anon;

comment on table public.team_notisadress is
  'Mejladress för uppgiftsnotiser på /team, om den ska vara en annan än kontots. Se src/app/api/team/delegera/route.ts.';

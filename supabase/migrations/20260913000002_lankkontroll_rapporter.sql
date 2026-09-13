-- lankkontroll_rapporter — veckorapporterna från scripts/lankkontroll.mjs (kort 64598daf,
-- Toms beslut 2026-09-13: "Schemalägg"). Varje körning sparar sin rapport här så nästa
-- vecka kan jämföra mot förra (--forra=fil.json) utan att något behöver ligga i repot.
--
-- Läses och skrivs bara i SQL (service-role). Inga policies: API:t kan varken läsa eller
-- skriva. Raderas aldrig automatiskt — historiken är poängen.
create table if not exists public.lankkontroll_rapporter (
  id              uuid primary key default gen_random_uuid(),
  kord_at         timestamptz not null default now(),
  status          text not null check (status in ('KOMPLETT','AVBRUTEN')),
  antal_sidor     integer not null default 0,
  akta_404        integer not null default 0,
  soft_404        integer not null default 0,
  atervandsgrand  integer not null default 0,
  obedomda        integer not null default 0,
  rapport_md      text not null,
  json            jsonb not null
);

alter table public.lankkontroll_rapporter enable row level security;
revoke all on public.lankkontroll_rapporter from anon, authenticated;

create index if not exists lankkontroll_rapporter_kord_at_idx on public.lankkontroll_rapporter (kord_at desc);

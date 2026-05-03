-- email_log: idempotent migration
--
-- Loggar varje transaktionsmail som skickats via Resend.
-- Driver två syften:
--   1. Idempotens-check — undvik dubblett-mail om endpoint anropas flera gånger
--   2. Audit — vem fick vad, när, hur (felfrekvens per template)
--
-- Insertas av:
--   - /api/auth/post-signup    (welcome-mail efter signup)
--   - /api/email/welcome       (manuell trigger via CRON_SECRET)
--   - /api/email/cron          (day7, season_open, season_close)
--
-- Kördes mot prod 2026-05-03 via Supabase Studio. Tabellen fanns redan med
-- mindre schema → ALTER TABLE ADD COLUMN IF NOT EXISTS gör migrationen
-- säker att köra igen.

create table if not exists public.email_log (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  template    text not null,
  sent_at     timestamptz not null default now(),
  resend_id   text,
  user_id     uuid references auth.users(id) on delete set null,
  error       text,
  created_at  timestamptz not null default now()
);

-- Lägg till saknade kolumner på befintlig tabell
alter table public.email_log add column if not exists user_id    uuid references auth.users(id) on delete set null;
alter table public.email_log add column if not exists error      text;
alter table public.email_log add column if not exists created_at timestamptz not null default now();

-- Idempotens-index (snabb lookup "har user_id X fått template Y?")
create index if not exists email_log_user_template_idx
  on public.email_log (user_id, template, sent_at desc);

-- Audit-index ("alla mail senaste veckan", "fel-frekvens per template")
create index if not exists email_log_sent_at_idx
  on public.email_log (sent_at desc);
create index if not exists email_log_template_idx
  on public.email_log (template, sent_at desc);

-- RLS: enable utan policy = endast service_role kan läsa
alter table public.email_log enable row level security;

comment on table public.email_log is
  'Audit log för transaktionella mail via Resend. Service-role only.';
comment on column public.email_log.template is
  'Template-nyckel: welcome | day7 | season_open | season_close';
comment on column public.email_log.resend_id is
  'ID från Resend API (https://resend.com/emails/{id}) för delivery-tracking';

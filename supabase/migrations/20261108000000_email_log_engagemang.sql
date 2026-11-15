-- email_log: senaste händelsen från Resend (öppnat, klickat, studsat) per utskick.
-- Fylls av cron-steget engagemang (src/app/api/email/cron/engagemang.ts).
-- Körd i produktion: (fyll i datum när Tom kört den)
alter table public.email_log add column if not exists last_event text;
alter table public.email_log add column if not exists event_at   timestamptz;
create index if not exists email_log_sent_at_idx on public.email_log (sent_at desc);

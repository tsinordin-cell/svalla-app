-- email_unsubscribes
--
-- Användare som klickat "Avregistrera" i transaktionsmail. Före varje
-- sendEmail() ska vi kolla om mottagar-emailen finns här — i så fall
-- skip:a utskick.
--
-- Service-role only (RLS enabled, no policies). Endpoint /api/email/unsubscribe
-- använder service_role-klient för att skriva.

create table if not exists public.email_unsubscribes (
  email           text primary key,
  unsubscribed_at timestamptz not null default now(),
  -- ip + user-agent för audit (CAN-SPAM kräver att vi kan visa när+hur)
  ip              text,
  user_agent      text,
  -- Optional: vilken template triggade unsubscribe (om man vill veta vilken
  -- som irriterar mest)
  source_template text
);

create index if not exists email_unsubscribes_at_idx
  on public.email_unsubscribes (unsubscribed_at desc);

alter table public.email_unsubscribes enable row level security;

comment on table public.email_unsubscribes is
  'Email-adresser som opt-outat från transaktionsmail. Service-role only.';

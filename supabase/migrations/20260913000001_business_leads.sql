-- business_leads — formuläret på /registrera-krog ("Sätt er krog på kartan",
-- länkat från startsidan) skrev till den här tabellen sedan den byggdes, men
-- tabellen fanns aldrig. MÄTT 2026-09-13: PostgREST svarar PGRST205 ("Could
-- not find the table 'public.business_leads'"), sidan visar "Något gick fel"
-- och varje krogägare som fyllt i formuläret har försvunnit spårlöst.
--
-- Skrivbar för anon (formuläret kräver inte inloggning), läsbar för ingen
-- via API — leads läses i SQL/adminvyn med service-role. Inga uppdateringar,
-- inga raderingar via API.
create table if not exists public.business_leads (
  id             uuid primary key default gen_random_uuid(),
  business_name  text not null check (char_length(business_name) between 1 and 200),
  business_type  text not null check (business_type in ('restaurang','kafe','hamn','boende','bar','annat')),
  description    text check (description is null or char_length(description) <= 2000),
  location       text not null check (char_length(location) between 1 and 200),
  contact_name   text not null check (char_length(contact_name) between 1 and 200),
  contact_email  text not null check (contact_email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  contact_phone  text check (contact_phone is null or char_length(contact_phone) <= 40),
  website        text check (website is null or char_length(website) <= 300),
  status         text not null default 'ny' check (status in ('ny','kontaktad','klar','avböjd')),
  created_at     timestamptz not null default now()
);

alter table public.business_leads enable row level security;

-- Vem som helst får lämna in ett lead — och bara det.
create policy "business_leads: anon insert"
  on public.business_leads for insert
  to anon, authenticated
  with check (true);

-- Ingen select/update/delete-policy: API:t kan inte läsa eller ändra leads.
revoke all on public.business_leads from anon, authenticated;
grant insert on public.business_leads to anon, authenticated;

create index if not exists business_leads_created_at_idx on public.business_leads (created_at desc);

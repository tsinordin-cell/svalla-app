-- Business leads table: krogägare som ansöker om att synas på kartan
create table if not exists public.business_leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),

  -- Verksamhet
  business_name text not null,
  business_type text not null,   -- restaurang | kafe | hamn | boende | annat
  description   text,

  -- Plats
  location      text not null,   -- fritext adress / platsnamn
  lat           numeric(10,6),
  lng           numeric(10,6),

  -- Kontakt
  contact_name  text not null,
  contact_email text not null,
  contact_phone text,
  website       text,

  -- Status (för admin-hantering)
  status        text not null default 'pending',  -- pending | approved | rejected
  notes         text
);

-- Enbart admin kan läsa; anyone kan inserta (anonym lead-formulär)
alter table public.business_leads enable row level security;

create policy "Anyone can submit lead"
  on public.business_leads for insert
  with check (true);

create policy "Admins can read leads"
  on public.business_leads for select
  using (
    exists (
      select 1 from public.users
      where id = auth.uid() and is_admin = true
    )
  );

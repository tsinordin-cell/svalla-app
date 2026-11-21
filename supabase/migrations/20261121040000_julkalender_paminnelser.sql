-- 2026-11-21. Tillägg. Tom: ja till påminnelsetabellen (handover 2026-11-20)
-- och ja till mejlpåminnelsen 2026-11-20 22:45 ET.
--
-- En rad = kontot har själv kryssat i "mejla mig när en ny lucka öppnas" på
-- /julkalender. Raden är samtycket (marknadsföringslagen 19 §): utan rad
-- inget mejl. Kontot tar själv bort raden i samma ruta, eller avregistrerar
-- sig via länken i mejlet (email_unsubscribes, som utskicket också läser).
-- Raden försvinner med kontot (cascade från users).
--
-- Bara kontot självt kan läsa, lägga till och ta bort sin rad. Utskicket
-- läser med tjänstenyckeln.
--
-- Återställning: drop table public.julkalender_paminnelser;

create table if not exists public.julkalender_paminnelser (
  user_id uuid primary key references public.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.julkalender_paminnelser enable row level security;

create policy julkalender_paminnelser_las_egen on public.julkalender_paminnelser
  for select to authenticated using (auth.uid() = user_id);
create policy julkalender_paminnelser_lagg_till_egen on public.julkalender_paminnelser
  for insert to authenticated with check (auth.uid() = user_id);
create policy julkalender_paminnelser_ta_bort_egen on public.julkalender_paminnelser
  for delete to authenticated using (auth.uid() = user_id);

revoke all on public.julkalender_paminnelser from anon;
grant select, insert, delete on public.julkalender_paminnelser to authenticated;

-- Wishlist för Loppis-annonser. När en användare sparar en annons
-- läggs en rad här. Många användare → en annons → många rader.

create table if not exists public.loppis_saves (
  user_id    uuid not null references auth.users(id)        on delete cascade,
  thread_id  uuid not null references public.forum_threads(id) on delete cascade,
  saved_at   timestamptz not null default now(),
  primary key (user_id, thread_id)
);

create index if not exists loppis_saves_user_idx
  on public.loppis_saves (user_id, saved_at desc);

create index if not exists loppis_saves_thread_idx
  on public.loppis_saves (thread_id);

-- RLS: bara man själv ser sina sparningar; alla får skapa/radera sina egna.
alter table public.loppis_saves enable row level security;

drop policy if exists loppis_saves_select_own on public.loppis_saves;
create policy loppis_saves_select_own on public.loppis_saves
  for select using (auth.uid() = user_id);

drop policy if exists loppis_saves_insert_own on public.loppis_saves;
create policy loppis_saves_insert_own on public.loppis_saves
  for insert with check (auth.uid() = user_id);

drop policy if exists loppis_saves_delete_own on public.loppis_saves;
create policy loppis_saves_delete_own on public.loppis_saves
  for delete using (auth.uid() = user_id);

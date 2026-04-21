create table if not exists public.user_presence (
  user_id         uuid primary key references public.users(id) on delete cascade,
  current_chat_id uuid references public.conversations(id) on delete set null,
  updated_at      timestamptz not null default now()
);

create index if not exists user_presence_chat_idx on public.user_presence(current_chat_id);

alter table public.user_presence enable row level security;

drop policy if exists "read own presence"   on public.user_presence;
drop policy if exists "upsert own presence" on public.user_presence;
drop policy if exists "update own presence" on public.user_presence;
drop policy if exists "delete own presence" on public.user_presence;

create policy "read own presence"   on public.user_presence for select using (auth.uid() = user_id);
create policy "upsert own presence" on public.user_presence for insert with check (auth.uid() = user_id);
create policy "update own presence" on public.user_presence for update using (auth.uid() = user_id);
create policy "delete own presence" on public.user_presence for delete using (auth.uid() = user_id);

create table if not exists public.push_log (
  target_user_id  uuid not null references public.users(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  last_sent_at    timestamptz not null default now(),
  primary key (target_user_id, conversation_id)
);

alter table public.push_log enable row level security;

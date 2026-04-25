create table if not exists public.conversations (
  id                      uuid primary key default gen_random_uuid(),
  is_group                boolean not null default false,
  title                   text,
  club_id                 uuid,
  created_by              uuid references public.users(id) on delete set null,
  status                  text not null default 'active' check (status in ('active','request','declined')),
  created_at              timestamptz not null default now(),
  last_message_at         timestamptz not null default now(),
  last_message_preview    text,
  last_message_user_id    uuid references public.users(id) on delete set null
);

alter table public.conversations
  add column if not exists status text not null default 'active'
  check (status in ('active','request','declined'));

create table if not exists public.conversation_participants (
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id         uuid not null references public.users(id) on delete cascade,
  role            text not null default 'member' check (role in ('owner','admin','member')),
  joined_at       timestamptz not null default now(),
  last_read_at    timestamptz not null default 'epoch',
  muted           boolean not null default false,
  primary key (conversation_id, user_id)
);

create table if not exists public.messages (
  id              uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id         uuid not null references public.users(id) on delete cascade,
  content         text,
  attachment_type text check (attachment_type in ('image','geo','trip')),
  attachment_url  text,
  attachment_meta jsonb,
  created_at      timestamptz not null default now(),
  check (content is not null or attachment_type is not null)
);

create index if not exists messages_conv_created_idx on public.messages(conversation_id, created_at desc);
create index if not exists participants_user_idx     on public.conversation_participants(user_id);
create index if not exists conversations_last_msg_idx on public.conversations(last_message_at desc);
create index if not exists conversations_status_idx   on public.conversations(status);

alter table public.conversations              enable row level security;
alter table public.conversation_participants  enable row level security;
alter table public.messages                   enable row level security;

create or replace function public.is_conv_member(conv uuid, uid uuid)
returns boolean language sql stable as $$
  select exists(
    select 1 from public.conversation_participants
    where conversation_id = conv and user_id = uid
  );
$$;

drop policy if exists "read own conversations"    on public.conversations;
drop policy if exists "create conversations"      on public.conversations;
drop policy if exists "update conversations own"  on public.conversations;
create policy "read own conversations" on public.conversations
  for select using (public.is_conv_member(id, auth.uid()));
create policy "create conversations" on public.conversations
  for insert with check (auth.uid() = created_by);
create policy "update conversations own" on public.conversations
  for update using (public.is_conv_member(id, auth.uid()));

drop policy if exists "read participants"      on public.conversation_participants;
drop policy if exists "join conversation"      on public.conversation_participants;
drop policy if exists "leave conversation"     on public.conversation_participants;
drop policy if exists "update own participant" on public.conversation_participants;
create policy "read participants" on public.conversation_participants
  for select using (public.is_conv_member(conversation_id, auth.uid()));
create policy "join conversation" on public.conversation_participants
  for insert with check (auth.uid() = user_id);
create policy "leave conversation" on public.conversation_participants
  for delete using (auth.uid() = user_id);
create policy "update own participant" on public.conversation_participants
  for update using (auth.uid() = user_id);

drop policy if exists "read messages in conv" on public.messages;
drop policy if exists "send messages" on public.messages;
drop policy if exists "delete own message" on public.messages;
create policy "read messages in conv" on public.messages
  for select using (public.is_conv_member(conversation_id, auth.uid()));
create policy "send messages" on public.messages
  for insert with check (
    auth.uid() = user_id
    and public.is_conv_member(conversation_id, auth.uid())
  );
create policy "delete own message" on public.messages
  for delete using (auth.uid() = user_id);

create or replace function public.touch_conversation_last_message()
returns trigger language plpgsql as $$
begin
  update public.conversations
  set
    last_message_at      = new.created_at,
    last_message_preview = coalesce(
      left(new.content, 140),
      case new.attachment_type
        when 'image' then 'Bild'
        when 'geo'   then 'Position'
        when 'trip'  then 'Tur'
        else null
      end
    ),
    last_message_user_id = new.user_id
  where id = new.conversation_id;
  return new;
end;
$$;

drop trigger if exists trg_touch_conv_last on public.messages;
create trigger trg_touch_conv_last
  after insert on public.messages
  for each row execute function public.touch_conversation_last_message();

create or replace function public.accept_dm_request(p_conv_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  update public.conversations
     set status = 'active'
   where id = p_conv_id
     and status = 'request'
     and created_by <> auth.uid()
     and public.is_conv_member(p_conv_id, auth.uid());
  if not found then
    raise exception 'Request not found, already handled, or not recipient';
  end if;
end;
$$;

grant execute on function public.accept_dm_request(uuid) to authenticated;

create or replace function public.decline_dm_request(p_conv_id uuid)
returns void
language plpgsql
security invoker
set search_path = public
as $$
begin
  update public.conversations
     set status = 'declined'
   where id = p_conv_id
     and status = 'request'
     and created_by <> auth.uid()
     and public.is_conv_member(p_conv_id, auth.uid());
  if not found then
    raise exception 'Request not found, already handled, or not recipient';
  end if;
end;
$$;

grant execute on function public.decline_dm_request(uuid) to authenticated;

create or replace function public.block_declined_messages()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if (select status from public.conversations where id = new.conversation_id) = 'declined' then
    raise exception 'Conversation is declined' using errcode = 'check_violation';
  end if;
  if (select status from public.conversations where id = new.conversation_id) = 'request'
     and (select created_by from public.conversations where id = new.conversation_id) <> new.user_id then
    raise exception 'Request not yet accepted' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists block_declined_messages_trigger on public.messages;
create trigger block_declined_messages_trigger
  before insert on public.messages
  for each row execute function public.block_declined_messages();

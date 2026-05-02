alter table public.conversations
  add column if not exists status text not null default 'active'
  check (status in ('active', 'request', 'declined'));

create index if not exists conversations_status_idx
  on public.conversations(status);

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

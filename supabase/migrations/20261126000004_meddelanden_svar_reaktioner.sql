-- Meddelanden: svar på ett visst meddelande och reaktioner
--
-- Vad den gör:
-- 1. Ny kolumn messages.reply_to_id: ett meddelande kan vara ett svar på ett
--    annat meddelande i samma samtal. Raderas originalet blir kolumnen tom och
--    citatet försvinner ur svaret (svaret självt ligger kvar).
-- 2. En spärr (trigger) som stoppar svar på ett meddelande i ett annat samtal,
--    så att ingen kan citera ur ett samtal hen inte är med i. Gäller både nya
--    meddelanden och ändringar av reply_to_id.
-- 3. Ny tabell message_reactions: en reaktion per person och meddelande,
--    från en fast lista med sex emoji. Väljer man en annan ersätts den gamla.
-- 4. Regler (RLS) för reaktioner: bara deltagare i samtalet kan se dem, bara
--    deltagare som inte är blockerade kan reagera, och man kan bara ändra och
--    ta bort sin egen. Samtalet som reaktionen hör till sätts alltid av
--    databasen, aldrig av appen.
-- 5. Samma spärrar som för meddelanden: ingen reaktion i ett avvisat samtal,
--    i en obesvarad förfrågan bara från den som skickade den, och högst 60
--    reaktioner i minuten per person.
-- 6. Reaktioner skickas i realtid till samtalet (supabase_realtime).
--
-- Raderar inga data. Rör inte befintliga regler på messages,
-- conversations eller conversation_participants.
--
-- Kontoradering och lagringstid: reaktioner försvinner automatiskt när
-- kontot eller meddelandet raderas (on delete cascade).
--
-- Ångra: supabase/angra/20261126000004_meddelanden_svar_reaktioner.rollback.sql

begin;

-- ── 1. Svar ───────────────────────────────────────────────────────────────
alter table public.messages
  add column if not exists reply_to_id uuid null
  references public.messages(id) on delete set null;

create index if not exists messages_reply_to_idx
  on public.messages(reply_to_id) where reply_to_id is not null;

-- ── 2. Svar bara inom samma samtal ────────────────────────────────────────
create or replace function public.meddelande_svar_samma_samtal()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
begin
  if new.reply_to_id is not null and (
    select m.conversation_id from public.messages m where m.id = new.reply_to_id
  ) is distinct from new.conversation_id then
    raise exception 'Svaret hör inte till samtalet' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists meddelande_svar_samma_samtal_trigger on public.messages;
create trigger meddelande_svar_samma_samtal_trigger
  before insert or update of reply_to_id on public.messages
  for each row execute function public.meddelande_svar_samma_samtal();

-- ── 3. Reaktioner ─────────────────────────────────────────────────────────
create table if not exists public.message_reactions (
  id              uuid primary key default gen_random_uuid(),
  message_id      uuid not null references public.messages(id) on delete cascade,
  conversation_id uuid not null references public.conversations(id) on delete cascade,
  user_id         uuid not null references public.users(id) on delete cascade,
  emoji           text not null check (emoji in ('❤️','👍','😂','😮','🙌','⛵')),
  created_at      timestamptz not null default now(),
  unique (message_id, user_id)
);

create index if not exists message_reactions_conv_idx on public.message_reactions(conversation_id);
create index if not exists message_reactions_user_idx on public.message_reactions(user_id);

-- ── 5. Spärrar: samtal sätts av databasen, status och takt ────────────────
create or replace function public.reaktion_kontroll()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $$
declare
  v_conv uuid;
  v_status text;
  v_skapare uuid;
begin
  select m.conversation_id into v_conv from public.messages m where m.id = new.message_id;
  if v_conv is null then
    raise exception 'Meddelandet finns inte' using errcode = 'check_violation';
  end if;
  new.conversation_id := v_conv;
  new.created_at := now();

  select c.status, c.created_by into v_status, v_skapare from public.conversations c where c.id = v_conv;
  if v_status = 'declined' then
    raise exception 'Conversation is declined' using errcode = 'check_violation';
  end if;
  if v_status = 'request' and v_skapare is distinct from new.user_id then
    raise exception 'Request not yet accepted' using errcode = 'check_violation';
  end if;

  if (select count(*) from public.message_reactions
      where user_id = new.user_id and created_at > now() - interval '1 minute') >= 60 then
    raise exception 'För många reaktioner, vänta en stund' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

drop trigger if exists reaktion_kontroll_trigger on public.message_reactions;
create trigger reaktion_kontroll_trigger
  before insert or update on public.message_reactions
  for each row execute function public.reaktion_kontroll();

-- ── 4. Regler (RLS) ───────────────────────────────────────────────────────
alter table public.message_reactions enable row level security;

revoke all on public.message_reactions from anon;
grant select, insert, update, delete on public.message_reactions to authenticated;

create policy "läs reaktioner i egna samtal" on public.message_reactions
  for select to authenticated
  using (public.is_conv_member(conversation_id, (select auth.uid())));

create policy "reagera i egna samtal" on public.message_reactions
  for insert to authenticated
  with check (
    (select auth.uid()) = user_id
    and public.is_conv_member(conversation_id, (select auth.uid()))
    and not public.blockerad_i_konversation(conversation_id, (select auth.uid()))
  );

create policy "byt egen reaktion" on public.message_reactions
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check (
    (select auth.uid()) = user_id
    and public.is_conv_member(conversation_id, (select auth.uid()))
    and not public.blockerad_i_konversation(conversation_id, (select auth.uid()))
  );

create policy "ta bort egen reaktion" on public.message_reactions
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- ── 6. Realtid ────────────────────────────────────────────────────────────
alter publication supabase_realtime add table public.message_reactions;

commit;

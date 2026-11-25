-- ÅNGRA 20261126000001_meddelanden_sakerhet.sql (körs bara om ändringen ska backas).
-- Återställer reglerna exakt som de var 2026-11-25. Hinken dm-bilder lämnas
-- kvar (den kan bara tas bort när den är tom); utan regler kan ingen
-- inloggad läsa eller ladda upp i den.

drop policy if exists "dm-bilder ladda upp" on storage.objects;
drop policy if exists "dm-bilder läs" on storage.objects;
drop policy if exists "dm-bilder ta bort egna" on storage.objects;
drop function if exists public.kan_ladda_upp_dm_bild(text);
drop function if exists public.ar_dm_bild_deltagare(text);

-- Före migrationen låg varken messages eller conversations i realtidskanalen
-- (MÄTT i produktion 2026-11-25). Tas bara bort om de finns där.
do $$
begin
  if exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages') then
    alter publication supabase_realtime drop table public.messages;
  end if;
  if exists (select 1 from pg_publication_tables where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'conversations') then
    alter publication supabase_realtime drop table public.conversations;
  end if;
end $$;

drop trigger if exists meddelanden_takt_trigger on public.messages;
drop function if exists public.meddelanden_takt();
drop index if exists public.messages_user_created_idx;

drop policy "update own participant" on public.conversation_participants;
create policy "update own participant" on public.conversation_participants
  for update using (auth.uid() = user_id);
grant update on public.conversation_participants to authenticated, anon;

create or replace function public.accept_dm_request(p_conv_id uuid)
returns void language plpgsql security definer set search_path to 'public' as $function$
begin
  if not exists (
    select 1 from public.conversations c
    join public.conversation_participants p on p.conversation_id = c.id
    where c.id = p_conv_id and p.user_id = auth.uid() and c.created_by is distinct from auth.uid()
  ) then
    raise exception 'Bara mottagaren kan svara på förfrågan' using errcode = '42501';
  end if;
  update public.conversations set status = 'active' where id = p_conv_id;
end;
$function$;

create or replace function public.decline_dm_request(p_conv_id uuid)
returns void language plpgsql security definer set search_path to 'public' as $function$
begin
  if not exists (
    select 1 from public.conversations c
    join public.conversation_participants p on p.conversation_id = c.id
    where c.id = p_conv_id and p.user_id = auth.uid() and c.created_by is distinct from auth.uid()
  ) then
    raise exception 'Bara mottagaren kan svara på förfrågan' using errcode = '42501';
  end if;
  update public.conversations set status = 'declined' where id = p_conv_id;
end;
$function$;

create policy "create conversations" on public.conversations
  for insert with check (auth.uid() = created_by);
create policy "join conversation" on public.conversation_participants
  for insert with check (ar_konversationens_skapare(conversation_id) and (not ar_blockerad(auth.uid(), user_id)));

drop function if exists public.starta_dm(uuid);

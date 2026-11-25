-- 2026-11-25. Meddelanden, säkerhets-PR a1 (plan S2, S3, S4, S5, S8).
-- INTE KÖRD. Körs först efter Toms ja, och efter en färsk kopia med
-- select backup.ta_kopia();
--
-- Vad den gör, i ordning:
--  S2  Nya samtal startas bara via funktionen starta_dm. Den kollar
--      blockering, återanvänder befintligt samtal, avgör förfrågan eller
--      aktivt och tillåter högst 20 nya förfrågningar per dygn. Klienten får
--      inte längre skapa samtal eller lägga till deltagare själv (de två
--      INSERT-reglerna tas bort). Svar på förfrågan kräver att samtalet
--      faktiskt är en förfrågan (ett avvisat samtal kan inte återupplivas).
--  S5  En deltagare kan bara ändra last_read_at och muted på sin egen rad,
--      inte flytta raden till ett annat samtal eller byta roll.
--  S8  Högst 30 meddelanden per minut och användare.
--  S4  messages och conversations läggs till i realtidskanalen.
--      Realtid följer läsreglerna, så var och en får bara sina egna samtal.
--  S3  Privat hink dm-bilder för bilder i meddelanden. Bara deltagare kan
--      läsa. Uppladdning bara i egen mapp i ett samtal man får skriva i.
--
-- Inga rader i tabellerna tas bort eller ändras. Ångra: supabase/angra/20261126000001_meddelanden_sakerhet.rollback.sql (ligger utanför migrations så att den aldrig körs av misstag)

begin;

-- ── S2: starta samtal på servern ───────────────────────────────────────────
create or replace function public.starta_dm(p_mottagare uuid)
returns table(conv_id uuid, conv_status text)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_jag uuid := auth.uid();
  v_conv uuid;
  v_status text;
begin
  if v_jag is null then
    raise exception 'Inte inloggad' using errcode = '42501';
  end if;
  if p_mottagare is null or p_mottagare = v_jag
     or not exists (select 1 from public.users where id = p_mottagare) then
    raise exception 'Ogiltig mottagare' using errcode = '22023';
  end if;
  if exists (select 1 from public.user_blocks
             where (blocker_id = v_jag and blocked_id = p_mottagare)
                or (blocker_id = p_mottagare and blocked_id = v_jag)) then
    raise exception 'Blockerad' using errcode = '42501';
  end if;

  -- Ett anrop i taget per par, så att två samtidiga klick inte ger två samtal.
  perform pg_advisory_xact_lock(hashtext(least(v_jag, p_mottagare)::text || greatest(v_jag, p_mottagare)::text));

  -- Befintligt 1:1-samtal där båda är med.
  select c.id, c.status into v_conv, v_status
  from public.conversations c
  where c.is_group = false
    and exists (select 1 from public.conversation_participants p where p.conversation_id = c.id and p.user_id = v_jag)
    and exists (select 1 from public.conversation_participants p where p.conversation_id = c.id and p.user_id = p_mottagare)
  order by c.last_message_at desc nulls last
  limit 1;

  -- Ett avvisat samtal räknas även om avsändaren har lämnat det, så att
  -- ett nej inte kan kringgås genom att lämna och fråga igen.
  if v_conv is null then
    select c.id, c.status into v_conv, v_status
    from public.conversations c
    where c.is_group = false and c.status = 'declined' and c.created_by = v_jag
      and exists (select 1 from public.conversation_participants p where p.conversation_id = c.id and p.user_id = p_mottagare)
    limit 1;
  end if;

  if v_conv is not null then
    -- Avsändaren som lämnat ett avvisat samtal läggs inte tillbaka.
    if not exists (select 1 from public.conversation_participants p where p.conversation_id = v_conv and p.user_id = v_jag) then
      return query select null::uuid, v_status;
      return;
    end if;
    return query select v_conv, v_status;
    return;
  end if;

  -- Aktivt om mottagaren följer avsändaren, annars förfrågan (som förut).
  v_status := case when exists (select 1 from public.follows
                                where follower_id = p_mottagare and following_id = v_jag)
                   then 'active' else 'request' end;

  if v_status = 'request' and (
    select count(*) from public.conversations c
    where c.created_by = v_jag and c.is_group = false
      and c.status in ('request', 'declined')
      and c.created_at > now() - interval '24 hours') >= 20 then
    raise exception 'För många nya förfrågningar idag' using errcode = 'check_violation';
  end if;

  insert into public.conversations (is_group, status, created_by, last_message_at)
  values (false, v_status, v_jag, now())
  returning id into v_conv;

  insert into public.conversation_participants (conversation_id, user_id)
  values (v_conv, v_jag), (v_conv, p_mottagare);

  return query select v_conv, v_status;
end;
$$;

revoke all on function public.starta_dm(uuid) from public, anon;
grant execute on function public.starta_dm(uuid) to authenticated;

drop policy if exists "create conversations" on public.conversations;
drop policy if exists "join conversation" on public.conversation_participants;

create or replace function public.accept_dm_request(p_conv_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not exists (
    select 1
    from public.conversations c
    join public.conversation_participants p on p.conversation_id = c.id
    where c.id = p_conv_id
      and c.status = 'request'
      and p.user_id = auth.uid()
      and c.created_by is distinct from auth.uid()
  ) then
    raise exception 'Bara mottagaren kan svara på förfrågan' using errcode = '42501';
  end if;
  update public.conversations set status = 'active' where id = p_conv_id;
end;
$function$;

create or replace function public.decline_dm_request(p_conv_id uuid)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  if not exists (
    select 1
    from public.conversations c
    join public.conversation_participants p on p.conversation_id = c.id
    where c.id = p_conv_id
      and c.status = 'request'
      and p.user_id = auth.uid()
      and c.created_by is distinct from auth.uid()
  ) then
    raise exception 'Bara mottagaren kan svara på förfrågan' using errcode = '42501';
  end if;
  update public.conversations set status = 'declined' where id = p_conv_id;
end;
$function$;

-- ── S5: deltagarraden kan bara ändras i två kolumner ───────────────────────
revoke update on public.conversation_participants from authenticated, anon;
grant update (last_read_at, muted) on public.conversation_participants to authenticated;

alter policy "update own participant" on public.conversation_participants
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- ── S8: högst 30 meddelanden per minut ─────────────────────────────────────
create index if not exists messages_user_created_idx on public.messages (user_id, created_at desc);

create or replace function public.meddelanden_takt()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Tiden sätts alltid av servern. Annars kunde en klient bakdatera
  -- meddelanden förbi spärren, eller framtidsdatera dem för att ligga
  -- överst och kunna pushas om och om igen.
  new.created_at := now();
  if (select count(*) from public.messages
      where user_id = new.user_id and created_at > now() - interval '1 minute') >= 30 then
    raise exception 'För många meddelanden, vänta en stund' using errcode = 'check_violation';
  end if;
  return new;
end;
$$;

revoke all on function public.meddelanden_takt() from public, anon, authenticated;

drop trigger if exists meddelanden_takt_trigger on public.messages;
create trigger meddelanden_takt_trigger
  before insert on public.messages
  for each row execute function public.meddelanden_takt();

-- ── S4: realtid för meddelanden och samtal ─────────────────────────────────
do $$
begin
  if not exists (select 1 from pg_publication_tables
                 where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'messages') then
    alter publication supabase_realtime add table public.messages;
  end if;
  if not exists (select 1 from pg_publication_tables
                 where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'conversations') then
    alter publication supabase_realtime add table public.conversations;
  end if;
end $$;

commit;

-- Egen transaktion: policyer på storage.objects kräver rätt ägarskap i
-- Supabase (se 20261003000004). Nekas just det här steget ligger resten kvar.
begin;

-- ── S3: privat hink för bilder i meddelanden ───────────────────────────────
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('dm-bilder', 'dm-bilder', false, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

-- Sökväg: <samtal>/<avsändare>/<slumpnamn>.jpg
create or replace function public.kan_ladda_upp_dm_bild(p_namn text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_delar text[] := string_to_array(p_namn, '/');
  v_conv uuid;
  v_status text;
  v_skapare uuid;
begin
  if auth.uid() is null or array_length(v_delar, 1) <> 3
     or v_delar[2] <> auth.uid()::text
     or v_delar[3] !~ '^[0-9a-f-]{36}\.jpg$' then
    return false;
  end if;
  begin
    v_conv := v_delar[1]::uuid;
  exception when others then
    return false;
  end;
  select status, created_by into v_status, v_skapare from public.conversations where id = v_conv;
  if v_status is null or v_status = 'declined' then return false; end if;
  if v_status = 'request' and v_skapare is distinct from auth.uid() then return false; end if;
  if not public.is_conv_member(v_conv, auth.uid()) then return false; end if;
  if public.blockerad_i_konversation(v_conv, auth.uid()) then return false; end if;
  return true;
end;
$$;

create or replace function public.ar_dm_bild_deltagare(p_namn text)
returns boolean
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_conv uuid;
begin
  if auth.uid() is null then return false; end if;
  begin
    v_conv := (string_to_array(p_namn, '/'))[1]::uuid;
  exception when others then
    return false;
  end;
  return public.is_conv_member(v_conv, auth.uid());
end;
$$;

revoke all on function public.kan_ladda_upp_dm_bild(text) from public, anon;
revoke all on function public.ar_dm_bild_deltagare(text) from public, anon;
grant execute on function public.kan_ladda_upp_dm_bild(text) to authenticated;
grant execute on function public.ar_dm_bild_deltagare(text) to authenticated;

drop policy if exists "dm-bilder ladda upp" on storage.objects;
create policy "dm-bilder ladda upp" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'dm-bilder' and public.kan_ladda_upp_dm_bild(name));

drop policy if exists "dm-bilder läs" on storage.objects;
create policy "dm-bilder läs" on storage.objects
  for select to authenticated
  using (bucket_id = 'dm-bilder' and public.ar_dm_bild_deltagare(name));

drop policy if exists "dm-bilder ta bort egna" on storage.objects;
create policy "dm-bilder ta bort egna" on storage.objects
  for delete to authenticated
  using (bucket_id = 'dm-bilder' and (string_to_array(name, '/'))[2] = auth.uid()::text);

commit;

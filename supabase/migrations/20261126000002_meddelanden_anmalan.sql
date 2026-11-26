-- Meddelanden: anmälningar (säkerhetsplanen S7)
--
-- Vad den gör:
-- 1. Ny tabell anmalan_underlag. Vid en anmälan kopieras det anmälda
--    meddelandet plus högst 10 före det hit. Bara admin kan läsa tabellen.
--    Ingen kan skriva i den direkt, bara funktionerna nedan.
-- 2. Funktionen anmal_meddelande: anmäl ett enskilt meddelande. Bara en
--    deltagare i konversationen kan anmäla, och inte sitt eget meddelande.
-- 3. Funktionen anmal_konversation: anmäl den andra personen i en tvåpersons-
--    tråd, med de 10 senaste meddelandena som underlag.
-- 4. En kontroll före varje ny rad i reports: status, granskare och
--    autoflagga sätts alltid av databasen, och meddelanden kan bara anmälas
--    via funktionen (så att underlaget alltid följer med).
-- 5. Admin får läsa en chattbild, men bara om bilden är det anmälda meddelandet.
-- 6. Ett nattligt jobb raderar underlaget 6 månader efter att ärendet avslutats.
--
-- Inga befintliga tabeller, regler eller rader tas bort. Ångra:
-- supabase/angra/20261126000002_meddelanden_anmalan.rollback.sql

begin;

-- ── 1. Underlag ──────────────────────────────────────────────────────────────
create table if not exists public.anmalan_underlag (
  id               uuid primary key default gen_random_uuid(),
  report_id        uuid not null references public.reports(id) on delete cascade,
  message_id       uuid not null,
  conversation_id  uuid not null,
  avsandare_id     uuid,
  innehall         text,
  bilaga_typ       text,
  -- Sökväg och metadata sparas bara för själva det anmälda meddelandet.
  bilaga_sokvag    text,
  bilaga_meta      jsonb,
  skickat_at       timestamptz not null,
  ar_anmalt        boolean not null default false,
  kopierat_at      timestamptz not null default now(),
  unique (report_id, message_id)
);

create index if not exists anmalan_underlag_report_idx on public.anmalan_underlag(report_id);
create index if not exists anmalan_underlag_bild_idx on public.anmalan_underlag(bilaga_sokvag) where bilaga_sokvag is not null;

alter table public.anmalan_underlag enable row level security;
revoke all on public.anmalan_underlag from public, anon, authenticated;
grant select on public.anmalan_underlag to authenticated;

do $$ begin
  if not exists (select 1 from pg_policies where schemaname = 'public'
                 and tablename = 'anmalan_underlag' and policyname = 'admin läser underlag') then
    create policy "admin läser underlag" on public.anmalan_underlag
      for select to authenticated using (public.is_admin_user());
  end if;
end $$;

-- ── 4. Kontroll före ny anmälan ──────────────────────────────────────────────
create or replace function public.reports_fore_ny()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  via_funktion boolean := coalesce(current_setting('svalla.anmalan_via_funktion', true), '') = 'ja';
begin
  if current_user in ('anon', 'authenticated') or via_funktion then
    new.status       := 'open';
    new.reviewed_by  := null;
    new.reviewed_at  := null;
    new.auto_flagged := false;
    new.created_at   := now();
    if new.target_type = 'message' and not via_funktion then
      raise exception 'Meddelanden anmäls via anmal_meddelande' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

create or replace trigger reports_fore_ny
  before insert on public.reports
  for each row execute function public.reports_fore_ny();

-- ── 2. Anmäl ett meddelande ──────────────────────────────────────────────────
create or replace function public.anmal_meddelande(
  p_message_id uuid,
  p_anledning  text,
  p_notering   text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid    uuid := auth.uid();
  v_msg    record;
  v_report uuid;
begin
  if v_uid is null then
    raise exception 'Inte inloggad' using errcode = '42501';
  end if;
  if p_anledning is null or p_anledning not in ('spam','harassment','inappropriate','misinformation','underage','other') then
    raise exception 'Ogiltig anledning' using errcode = '22023';
  end if;
  if char_length(coalesce(p_notering, '')) > 500 then
    raise exception 'Noteringen är för lång' using errcode = '22023';
  end if;

  select m.id, m.conversation_id, m.user_id, m.created_at
    into v_msg
    from public.messages m
   where m.id = p_message_id;

  if not found or not exists (
    select 1 from public.conversation_participants cp
     where cp.conversation_id = v_msg.conversation_id and cp.user_id = v_uid
  ) then
    raise exception 'Meddelandet finns inte' using errcode = 'P0002';
  end if;

  if v_msg.user_id = v_uid then
    raise exception 'Du kan inte anmäla ditt eget meddelande' using errcode = '22023';
  end if;

  -- Högst 20 anmälningar per dygn och konto.
  perform pg_advisory_xact_lock(hashtextextended('anmalan:' || v_uid::text, 0));
  if (select count(*) from public.reports
       where reporter_id = v_uid and created_at > now() - interval '24 hours') >= 20 then
    raise exception 'För många anmälningar i dag' using errcode = '54000';
  end if;

  perform set_config('svalla.anmalan_via_funktion', 'ja', true);
  insert into public.reports (reporter_id, target_type, target_id, reason, note)
  values (v_uid, 'message', p_message_id, p_anledning, nullif(btrim(coalesce(p_notering, '')), ''))
  on conflict (reporter_id, target_type, target_id) do nothing
  returning id into v_report;
  perform set_config('svalla.anmalan_via_funktion', '', true);

  if v_report is null then
    return jsonb_build_object('status', 'redan');
  end if;

  insert into public.anmalan_underlag
    (report_id, message_id, conversation_id, avsandare_id, innehall, bilaga_typ,
     bilaga_sokvag, bilaga_meta, skickat_at, ar_anmalt)
  select v_report, m.id, m.conversation_id, m.user_id, m.content, m.attachment_type,
         case when m.id = v_msg.id and m.attachment_type = 'image'
                   and split_part(m.attachment_url, '/', 1) = m.conversation_id::text
                   and split_part(m.attachment_url, '/', 2) = m.user_id::text
              then m.attachment_url end,
         case when m.id = v_msg.id then m.attachment_meta end,
         m.created_at, m.id = v_msg.id
    from (
      select * from public.messages
       where conversation_id = v_msg.conversation_id
         and (created_at, id) <= (v_msg.created_at, v_msg.id)
       order by created_at desc, id desc
       limit 11
    ) m;

  return jsonb_build_object('status', 'skickad', 'id', v_report);
end;
$$;

-- ── 3. Anmäl personen i en tråd ──────────────────────────────────────────────
create or replace function public.anmal_konversation(
  p_conversation_id uuid,
  p_anledning       text,
  p_notering        text default null
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid    uuid := auth.uid();
  v_andra  uuid;
  v_report uuid;
  v_status text;
begin
  if v_uid is null then
    raise exception 'Inte inloggad' using errcode = '42501';
  end if;
  if p_anledning is null or p_anledning not in ('spam','harassment','inappropriate','misinformation','underage','other') then
    raise exception 'Ogiltig anledning' using errcode = '22023';
  end if;
  if char_length(coalesce(p_notering, '')) > 500 then
    raise exception 'Noteringen är för lång' using errcode = '22023';
  end if;

  if not exists (
    select 1 from public.conversation_participants cp
      join public.conversations c on c.id = cp.conversation_id
     where cp.conversation_id = p_conversation_id and cp.user_id = v_uid and not c.is_group
  ) then
    raise exception 'Konversationen finns inte' using errcode = 'P0002';
  end if;

  select cp.user_id into v_andra
    from public.conversation_participants cp
   where cp.conversation_id = p_conversation_id and cp.user_id <> v_uid
   limit 1;

  if v_andra is null then
    raise exception 'Den andra personen finns inte längre i tråden' using errcode = 'P0002';
  end if;

  perform pg_advisory_xact_lock(hashtextextended('anmalan:' || v_uid::text, 0));
  if (select count(*) from public.reports
       where reporter_id = v_uid and created_at > now() - interval '24 hours') >= 20 then
    raise exception 'För många anmälningar i dag' using errcode = '54000';
  end if;

  perform set_config('svalla.anmalan_via_funktion', 'ja', true);
  insert into public.reports (reporter_id, target_type, target_id, reason, note)
  values (v_uid, 'user', v_andra, p_anledning, nullif(btrim(coalesce(p_notering, '')), ''))
  on conflict (reporter_id, target_type, target_id) do nothing
  returning id into v_report;
  perform set_config('svalla.anmalan_via_funktion', '', true);

  v_status := 'skickad';
  if v_report is null then
    -- Redan anmäld, till exempel från profilen. Lägg till underlaget från
    -- tråden om ärendet är öppet och saknar underlag från den här tråden.
    select r.id into v_report from public.reports r
     where r.reporter_id = v_uid and r.target_type = 'user' and r.target_id = v_andra
       and r.status = 'open'
       and not exists (select 1 from public.anmalan_underlag u
                        where u.report_id = r.id and u.conversation_id = p_conversation_id);
    if v_report is null then
      return jsonb_build_object('status', 'redan');
    end if;
    v_status := 'tillagd';
  end if;

  -- De 10 senaste meddelandena. Bilagor sparas bara som typ, utan sökväg och position.
  insert into public.anmalan_underlag
    (report_id, message_id, conversation_id, avsandare_id, innehall, bilaga_typ, skickat_at, ar_anmalt)
  select v_report, m.id, m.conversation_id, m.user_id, m.content, m.attachment_type, m.created_at, false
    from (
      select * from public.messages
       where conversation_id = p_conversation_id
       order by created_at desc, id desc
       limit 10
    ) m
  on conflict (report_id, message_id) do nothing;

  return jsonb_build_object('status', v_status, 'id', v_report);
end;
$$;

revoke all on function public.anmal_meddelande(uuid, text, text) from public, anon;
revoke all on function public.anmal_konversation(uuid, text, text) from public, anon;
revoke all on function public.reports_fore_ny() from public, anon, authenticated;
grant execute on function public.anmal_meddelande(uuid, text, text) to authenticated;
grant execute on function public.anmal_konversation(uuid, text, text) to authenticated;

-- ── 6. Rensning 6 månader efter avslutat ärende ──────────────────────────────
select cron.schedule(
  'svalla-anmalan-rensning',
  '30 3 * * *',
  $job$
    delete from public.anmalan_underlag u
     using public.reports r
     where r.id = u.report_id
       and r.status <> 'open'
       and r.reviewed_at < now() - interval '6 months'
  $job$
);

commit;

-- ── 5. Chattbilder som är underlag ───────────────────────────────────────────
-- Egen transaktion, som lagringsdelen i förra migrationen. Misslyckas den
-- ligger resten kvar och den här delen kan köras om för sig.
begin;

-- Sant om bilden är underlag i en anmälan. Körs med ägarens rätt, eftersom
-- vanliga användare inte får läsa underlagstabellen.
create or replace function public.ar_anmald_dm_bild(p_namn text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.anmalan_underlag u where u.bilaga_sokvag = p_namn);
$$;
revoke all on function public.ar_anmald_dm_bild(text) from public, anon;
grant execute on function public.ar_anmald_dm_bild(text) to authenticated;

do $$ begin
  -- Admin läser en chattbild bara om den är underlag i en anmälan.
  if not exists (select 1 from pg_policies where schemaname = 'storage'
                 and tablename = 'objects' and policyname = 'dm-bilder admin läser anmäld bild') then
    create policy "dm-bilder admin läser anmäld bild" on storage.objects
      for select to authenticated
      using (
        bucket_id = 'dm-bilder'
        and public.is_admin_user()
        and public.ar_anmald_dm_bild(name)
      );
  end if;
  -- Den anmälde kan inte radera eller byta ut en bild som är underlag.
  -- Begränsande regel: gäller ovanpå den befintliga "ta bort egna".
  if not exists (select 1 from pg_policies where schemaname = 'storage'
                 and tablename = 'objects' and policyname = 'dm-bilder underlag får inte raderas') then
    create policy "dm-bilder underlag får inte raderas" on storage.objects
      as restrictive
      for delete to authenticated
      using (bucket_id <> 'dm-bilder' or not public.ar_anmald_dm_bild(name));
  end if;
end $$;

commit;

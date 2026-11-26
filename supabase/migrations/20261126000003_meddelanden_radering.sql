-- Meddelanden: radering och lagringstid (säkerhetsplanen S6)
--
-- Vad den gör:
-- 1. När ett meddelande raderas räknas samtalets förhandsvisning i inkorgen
--    om från det senaste meddelande som finns kvar. I dag ligger texten från
--    ett raderat meddelande kvar i förhandsvisningen, även när kontot som
--    skrev det är raderat.
-- 2. När sista deltagaren lämnar ett samtal mellan två personer raderas
--    samtalet, och med det dess meddelanden. Ingen kan längre se dem, så de
--    ska inte ligga kvar. Klubbchattar (grupper) rörs inte.
-- 3. En engångsrättning: alla samtals förhandsvisningar räknas om en gång,
--    så att gamla rester från raderade meddelanden försvinner.
--
-- RADERAR DATA: punkt 2 tar bort samtal utan deltagare, både nu (om det finns
-- några) och framåt. Punkt 3 skriver om förhandsvisningen i samtal där den
-- inte stämmer. Underlaget för anmälningar (anmalan_underlag) påverkas inte,
-- eftersom det inte hänger ihop med meddelandena.
--
-- Chattbilder i lagringen tas bort av appen, inte här: databasen får inte
-- radera filer direkt.
--
-- Körs först efter en färsk kopia: select backup.ta_kopia(); (dagens kopia
-- finns redan, så ta i stället en extra kopia av de tre tabellerna, se
-- instruktionen som följer med filen).
--
-- Ångra: supabase/angra/20261126000003_meddelanden_radering.rollback.sql

begin;

-- ── 1. Förhandsvisningen följer det senaste meddelandet som finns kvar ─────
create or replace function public.meddelanden_raknar_om_samtal(p_samtal uuid[])
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if p_samtal is null or cardinality(p_samtal) = 0 then return; end if;
  -- Lås samtalen först (i fast ordning), så att två samtidiga raderingar,
  -- eller en radering och ett nytt meddelande, inte skriver över varandra.
  -- Uppdateringen nedan är en egen sats och ser därför läget efter låset.
  perform 1 from public.conversations
   where id = any(p_samtal)
   order by id
     for update;

  update public.conversations c
     set last_message_at      = coalesce(s.created_at, c2.created_at),
         last_message_preview = s.preview,
         last_message_user_id = s.user_id
    from public.conversations c2
    left join lateral (
      select m.user_id, m.created_at,
             coalesce(left(m.content, 140),
                      case m.attachment_type
                        when 'image' then 'Bild'
                        when 'geo'   then 'Position'
                        when 'trip'  then 'Tur'
                      end) as preview
        from public.messages m
       where m.conversation_id = c2.id
       order by m.created_at desc, m.id desc
       limit 1
    ) s on true
   where c.id = c2.id
     and c2.id = any(p_samtal)
     and (c.last_message_at      is distinct from coalesce(s.created_at, c2.created_at)
       or c.last_message_preview is distinct from s.preview
       or c.last_message_user_id is distinct from s.user_id);
end;
$$;

revoke all on function public.meddelanden_raknar_om_samtal(uuid[]) from public, anon, authenticated;

create or replace function public.meddelande_raderat()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- En gång per sats, även när många meddelanden försvinner samtidigt
  -- (t.ex. när ett konto raderas).
  perform public.meddelanden_raknar_om_samtal(
    array(select distinct conversation_id from borttagna));
  return null;
end;
$$;

revoke all on function public.meddelande_raderat() from public, anon, authenticated;

drop trigger if exists meddelande_raderat_trigger on public.messages;
create trigger meddelande_raderat_trigger
  after delete on public.messages
  referencing old table as borttagna
  for each statement execute function public.meddelande_raderat();

-- ── 2. Samtal mellan två personer raderas när ingen är kvar i dem ──────────
create or replace function public.samtal_utan_deltagare()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  -- Lås samtalen först. Lämnar två personer samtidigt väntar den ena in den
  -- andra, och raderingen nedan ser då att ingen är kvar.
  perform 1 from public.conversations
   where id in (select distinct conversation_id from borttagna)
     and is_group = false
   order by id
     for update;

  delete from public.conversations c
   where c.id in (select distinct conversation_id from borttagna)
     and c.is_group = false
     and not exists (select 1 from public.conversation_participants p
                      where p.conversation_id = c.id);
  return null;
end;
$$;

revoke all on function public.samtal_utan_deltagare() from public, anon, authenticated;

drop trigger if exists samtal_utan_deltagare_trigger on public.conversation_participants;
create trigger samtal_utan_deltagare_trigger
  after delete on public.conversation_participants
  referencing old table as borttagna
  for each statement execute function public.samtal_utan_deltagare();

-- Samtal som redan står utan deltagare (0 st när detta skrevs).
delete from public.conversations c
 where c.is_group = false
   and not exists (select 1 from public.conversation_participants p
                    where p.conversation_id = c.id);

-- ── 3. Engångsrättning av alla förhandsvisningar ───────────────────────────
select public.meddelanden_raknar_om_samtal(array(select id from public.conversations));

commit;

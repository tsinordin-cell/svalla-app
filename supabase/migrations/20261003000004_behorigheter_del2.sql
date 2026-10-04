-- 2026-10-03: databasbehörigheter del 2 (revision P1-7 och P2-7).
-- KÖRS FÖRST EFTER TOMS OK (SQL Editor, i ett svep). Ingen kod behöver ändras
-- först – appen använder redan bara de vägar som finns kvar. Detaljer och
-- skäl: Drive › 04_Rapporter › AUDIT-20261002.md.
--
-- Innehåll:
--  1. DM-förfrågningar: bara mottagaren accepterar eller avvisar.
--  2. find_or_create_dm används inte (lib/dm.ts skapar konversationer själv).
--  3. Deltagare i en konversation läggs bara till av den som skapade den.
--  4. Senaste meddelandet i inkorgen uppdateras även när mottagaren svarar.
--  5. Konversationen kan inte ändras direkt av skaparen (status sätts bara av
--     funktionerna i punkt 1).
--  6. Taggning bara på egna turer.
--  7. Sparade öar: var och en ser bara sin egen lista; antal via funktion.
--  8. Avatarer: bara den egna filen avatars/<användar-id>.<ändelse>.
--  9. Formulärtabeller som redan skrivs via servern: ingen direkt skrivning.
-- 10. Dubblerade policyer bort (samma villkor finns kvar under ett namn).
-- 11. Funktioner som bara triggers eller cron kör: ingen EXECUTE för appens
--     roller. search_path satt på SECURITY DEFINER-funktioner som saknade den.
--
-- Kvar efter detta (egna kort): notiser till andra användare skapas fortfarande
-- direkt från webbläsaren, och formulären för partner, ruttfeedback,
-- sajtfeedback och "registrera krog" skriver med användarens session – båda
-- kräver kodändringar först.

begin;

-- ── 1. DM-förfrågningar: bara mottagaren svarar ─────────────────────────────
create or replace function public.accept_dm_request(p_conv_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.conversations c
    join public.conversation_participants p on p.conversation_id = c.id
    where c.id = p_conv_id
      and p.user_id = auth.uid()
      and c.created_by is distinct from auth.uid()
  ) then
    raise exception 'Bara mottagaren kan svara på förfrågan' using errcode = '42501';
  end if;
  update public.conversations set status = 'active' where id = p_conv_id;
end;
$$;

create or replace function public.decline_dm_request(p_conv_id uuid)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if not exists (
    select 1
    from public.conversations c
    join public.conversation_participants p on p.conversation_id = c.id
    where c.id = p_conv_id
      and p.user_id = auth.uid()
      and c.created_by is distinct from auth.uid()
  ) then
    raise exception 'Bara mottagaren kan svara på förfrågan' using errcode = '42501';
  end if;
  update public.conversations set status = 'declined' where id = p_conv_id;
end;
$$;

revoke execute on function public.accept_dm_request(uuid) from public, anon;
revoke execute on function public.decline_dm_request(uuid) from public, anon;
grant execute on function public.accept_dm_request(uuid) to authenticated;
grant execute on function public.decline_dm_request(uuid) to authenticated;

-- ── 2. find_or_create_dm: oanvänd, stängs ───────────────────────────────────
alter function public.find_or_create_dm(uuid) set search_path = public;
revoke execute on function public.find_or_create_dm(uuid) from public, anon, authenticated;

-- ── 3. Bara skaparen lägger till deltagare ──────────────────────────────────
-- Funktionen behövs eftersom skaparen inte kan läsa konversationen (policyn
-- "read own conversations") förrän hen själv är deltagare.
create or replace function public.ar_konversationens_skapare(p_conv uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.conversations
    where id = p_conv and created_by = auth.uid()
  );
$$;

revoke execute on function public.ar_konversationens_skapare(uuid) from public, anon;
grant execute on function public.ar_konversationens_skapare(uuid) to authenticated;

alter policy "join conversation" on public.conversation_participants
  with check (public.ar_konversationens_skapare(conversation_id));

-- ── 4. Inkorgens "senaste meddelande" även när mottagaren svarar ────────────
-- Triggern körde med avsändarens behörighet, och bara skaparen fick uppdatera
-- konversationen. Nu körs den som ägaren.
create or replace function public.touch_conversation_last_message()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
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

-- ── 5. Skaparen ändrar inte konversationen direkt ───────────────────────────
-- Appen uppdaterar aldrig conversations själv (triggern i punkt 4 och
-- funktionerna i punkt 1 gör det).
drop policy if exists conversations_update_creator on public.conversations;

-- ── 6. Taggning bara på egna turer ──────────────────────────────────────────
-- Kvar: "tag on own trip" (taggaren äger turen).
drop policy if exists "Users can tag" on public.trip_tags;

-- ── 7. Sparade öar ───────────────────────────────────────────────────────────
-- Kvar: "Users can view own saves". Antal per ö via funktionen nedan.
drop policy if exists "Public can count saves" on public.saved_islands;

create or replace function public.saved_count_for_island(slug text)
returns integer
language sql
stable
security definer
set search_path = public
as $$
  select count(*)::integer from public.saved_islands where island_slug = slug;
$$;

alter function public.my_saved_islands() set search_path = public;
revoke execute on function public.my_saved_islands() from public, anon;
grant execute on function public.my_saved_islands() to authenticated;

-- ── 9. Formulärtabeller som redan skrivs med tjänsteklienten ────────────────
-- /api/subscribe, /api/route/calculate och /api/planera/report skriver med
-- tjänsteklienten; policyerna gav bara en väg förbi deras kontroller.
drop policy if exists "Anon can subscribe" on public.email_subscribers;
drop policy if exists rm_service_insert on public.route_metrics;
drop policy if exists rr_insert_anyone on public.route_reports;

-- ── 10. Dubblerade policyer (identiskt villkor finns kvar) ──────────────────
drop policy if exists "Anon can submit inquiry" on public.partner_inquiries;   -- = partner_inquiries_insert_anyone
drop policy if exists "Anyone can read restaurants" on public.restaurants;     -- = restaurants_read_all
drop policy if exists "read trip_tags" on public.trip_tags;                    -- = "Anyone can read trip_tags"
drop policy if exists "Users can delete own trips" on public.trips;            -- = trips_delete_own
drop policy if exists "Users can insert own trips" on public.trips;            -- = trips_insert_own
drop policy if exists "Users can update own trips" on public.trips;            -- = trips_update_own
drop policy if exists "Users can insert own profile" on public.users;          -- = users_insert_own
drop policy if exists "Users can read all profiles" on public.users;           -- = users_select_all
drop policy if exists users_read_all on public.users;                          -- = users_select_all
drop policy if exists "Users can update own profile" on public.users;          -- = users_update_own
drop policy if exists "Users see own notifications" on public.notifications;   -- = "Users can read own notifications"
drop policy if exists "Users mark own as read" on public.notifications;        -- = "Users can mark read"

-- ── 11. Funktioner för triggers och cron ────────────────────────────────────
-- EXECUTE kontrolleras när en trigger skapas, inte när den körs, så
-- triggrarna fungerar som förut. pg_cron kör som ägaren.
revoke execute on function public.purge_old_deleted_trips() from public, anon, authenticated;
revoke execute on function public.block_declined_messages() from public, anon, authenticated;
revoke execute on function public.touch_conversation_last_message() from public, anon, authenticated;
revoke execute on function public.enforce_forum_mod_columns() from public, anon, authenticated;
revoke execute on function public.handle_new_user() from public, anon, authenticated;
revoke execute on function public.rate_limit_comments() from public, anon, authenticated;
revoke execute on function public.rate_limit_likes() from public, anon, authenticated;
revoke execute on function public.skydda_users_is_admin() from public, anon, authenticated;
alter function public.enforce_forum_mod_columns() set search_path = public;

-- Adminfunktionerna kontrollerar själva is_admin_user(); utloggade behöver dem inte.
revoke execute on function public.admin_update_report(uuid, text, text) from public, anon;
revoke execute on function public.get_moderation_queue(text, integer, integer) from public, anon;
grant execute on function public.admin_update_report(uuid, text, text) to authenticated;
grant execute on function public.get_moderation_queue(text, integer, integer) to authenticated;

-- is_admin_user() och is_team_admin() används i policyer som även utloggade
-- passerar, så EXECUTE ligger kvar. search_path sätts.
alter function public.is_team_admin() set search_path = public;

commit;

begin;

-- ── 8. Avatarer: bara den egna filen ────────────────────────────────────────
-- Egen transaktion: policyer på storage.objects kräver rätt ägarskap i
-- Supabase. Skulle just det här steget nekas ligger resten redan kvar.
-- Appen laddar upp till avatars/<användar-id>.<ändelse> (profil/page.tsx).
alter policy "Users can upload their own avatar" on storage.objects
  with check (bucket_id = 'images' and name like 'avatars/' || auth.uid()::text || '.%');
alter policy "Users can update their own avatar" on storage.objects
  using (bucket_id = 'images' and name like 'avatars/' || auth.uid()::text || '.%');
alter policy "Users can delete their own avatar" on storage.objects
  using (bucket_id = 'images' and name like 'avatars/' || auth.uid()::text || '.%');

commit;

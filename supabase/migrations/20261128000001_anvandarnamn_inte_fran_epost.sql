-- Nya konton får inte längre början på sin e-postadress som publikt användarnamn
-- (Toms ja 2026-11-27, "kör efter dina rekommendationer"). ÄNDRAR en befintlig funktion.
--
-- Före: handle_new_user satte username = raw_user_meta_data.username, annars
-- e-postens första del, annars 'seglare'. Google-konton har inget username i
-- metadata, så de fick e-postens första del, som visas publikt (/u/[namn]).
-- Mätt 2026-11-27: 74 av 133 konton hade ett sådant namn. Två personer med
-- samma början på adressen (info@a.se, info@b.se) gav dessutom krock mot
-- users_username_key, och då misslyckades registreringen.
--
-- Efter: namnet från registreringsformuläret används om det klarar reglerna i
-- src/lib/username.ts, inte är e-postens första del och är ledigt (utan skiftläge).
-- Annars 'seglare-' + åtta tecken ur kontots id. Personen väljer sitt namn i
-- onboardingen (namnsteget, 2026-11-28).
--
-- Befintliga konton ändras inte.
--
-- Återställning: kör om funktionen från 20260502000038_fix-missing-users-trigger.sql
-- (insert med coalesce(meta.username, split_part(email,'@',1), 'seglare'))
-- och drop function public.nytt_anvandarnamn(text, text, uuid);

create or replace function public.nytt_anvandarnamn(onskat text, epost text, kontoid uuid)
returns text
language plpgsql
stable
set search_path = public
as $$
declare
  namn text := lower(btrim(coalesce(onskat, '')));
  lokal text := lower(btrim(split_part(coalesce(epost, ''), '@', 1)));
  reserv text := 'seglare-' || substr(replace(kontoid::text, '-', ''), 1, 8);
begin
  if namn ~ '^[a-z0-9_.-]{3,20}$'
     and namn <> lokal
     and not exists (select 1 from public.users u where lower(u.username) = namn and u.id <> kontoid)
  then
    return namn;
  end if;
  if exists (select 1 from public.users u where lower(u.username) = reserv and u.id <> kontoid) then
    return 'seglare-' || substr(replace(kontoid::text, '-', ''), 1, 12);
  end if;
  return reserv;
end;
$$;

revoke all on function public.nytt_anvandarnamn(text, text, uuid) from public, anon, authenticated;

comment on function public.nytt_anvandarnamn(text, text, uuid) is
  'Användarnamn för ett nytt konto: önskat namn om det är giltigt, inte e-postens första del och ledigt, annars seglare-<id>. Används av handle_new_user (2026-11-28).';

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path to 'public'
as $function$
begin
  insert into public.users (id, username, email)
  values (
    new.id,
    public.nytt_anvandarnamn(new.raw_user_meta_data->>'username', new.email, new.id),
    coalesce(new.email, '')
  )
  on conflict (id) do nothing;
  return new;
end;
$function$;

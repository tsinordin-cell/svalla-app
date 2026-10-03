-- 2026-10-03: is_admin kan bara ändras av tjänsten (revision P0-2).
-- Körd i produktion 2026-10-03 03:09 UTC (SQL Editor). Filen finns för
-- historiken och för nya miljöer. Går att köra igen (idempotent).
--
-- Ändring: en BEFORE-trigger för anrop från appens roller (anon/authenticated).
-- Vid INSERT sätts is_admin till false; vid UPDATE stoppas varje ändring av
-- is_admin. Tjänsterollen, SQL Editor och auth-triggern (handle_new_user)
-- påverkas inte. Koden skriver aldrig is_admin.
-- Gör någon till admin med SQL eller tjänsteklienten.

create or replace function public.skydda_users_is_admin()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  if coalesce(auth.role(), '') in ('anon', 'authenticated') then
    if tg_op = 'INSERT' then
      new.is_admin := false;
    elsif new.is_admin is distinct from old.is_admin then
      raise exception 'is_admin kan inte ändras härifrån' using errcode = '42501';
    end if;
  end if;
  return new;
end;
$$;

drop trigger if exists users_skydda_is_admin on public.users;
create trigger users_skydda_is_admin
  before insert or update on public.users
  for each row execute function public.skydda_users_is_admin();

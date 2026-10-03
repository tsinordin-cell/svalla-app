-- 2026-10-03: users.email läses bara av tjänsten (revision P0-1).
-- Körd i produktion 2026-10-03 06:58 UTC (SQL Editor), efter att PR #444
-- var ute. Filen finns för historiken och för nya miljöer.
--
-- Ändring: tabellbehörigheten SELECT för anon/authenticated ersätts med
-- kolumnbehörighet på alla kolumner utom email. Raderna är fortsatt publika
-- (läspolicyn är orörd). E-post läses på servern med tjänsteklienten.
--
-- VIKTIGT för framtida ändringar:
--  * En ny kolumn i users blir INTE läsbar för anon/authenticated förrän den
--    får en egen grant, t.ex.
--      grant select (ny_kolumn) on table public.users to anon, authenticated;
--    Kör aldrig om den här filen efter att nya kolumner fått grant – revoke
--    nedan tar bort dem igen.
--  * select('*') / select=* på users fungerar bara med tjänsteklienten.
--    Med användarens session: lista kolumnerna.
--  * upsert med ignoreDuplicates fungerar (ON CONFLICT DO NOTHING kräver
--    ingen SELECT).

revoke select on table public.users from anon, authenticated;

grant select (
  id, username, avatar, created_at, bio, nationality, experience_years,
  vessel_type, vessel_model, vessel_name, home_port, sailing_region,
  public_fields, is_admin, boat_type, website, onboarded_at,
  home_port_lat, home_port_lng
) on table public.users to anon, authenticated;

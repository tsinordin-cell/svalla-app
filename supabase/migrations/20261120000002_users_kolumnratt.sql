-- Integritet steg 1c (2026-11-20). ÄNDRAR befintliga rättigheter. Körs först när
-- koden som läser via users_publik och min_profil() är i produktion (PR för steg 1b).
--
-- Tar bort anon/authenticated:s läsrätt till de valbara profilfälten och
-- hemmahamnens koordinater direkt i users. Kvar att läsa: id, username, avatar,
-- created_at, public_fields, is_admin (adminsidornas egen kontroll), onboarded_at.
-- service_role påverkas inte.
--
-- Återställning: GRANT SELECT (samma kolumner) ON public.users TO anon, authenticated;

revoke select (
  bio, website, nationality, experience_years, vessel_type, vessel_model, vessel_name,
  home_port, home_port_lat, home_port_lng, sailing_region, boat_type
) on public.users from anon, authenticated;

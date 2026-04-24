-- Onboarding: lägg till boat_type som preferens på users-tabellen
-- Används för att personalisera upplevelsen och Thorkels rekommendationer

ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS boat_type text;

COMMENT ON COLUMN public.users.boat_type IS
  'Användarens föredragna färdsätt: Segelbåt, Motorbåt, Kajak, Charter';

-- Fix: skapa public.users-rad automatiskt när en ny användare registrerar sig
-- Kör i Supabase SQL Editor (kräver service-role / admin)

-- 1. Funktion som körs vid ny auth.users-rad
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.users (id, username, email)
  VALUES (
    NEW.id,
    COALESCE(
      NEW.raw_user_meta_data->>'username',
      split_part(NEW.email, '@', 1),
      'seglare'
    ),
    COALESCE(NEW.email, '')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- 2. Trigger på auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Backfill: skapa rader för befintliga auth-användare som saknar public.users-rad
--    (t.ex. kevin och andra som aldrig loggat en tur)
INSERT INTO public.users (id, username, email)
SELECT
  au.id,
  COALESCE(
    au.raw_user_meta_data->>'username',
    split_part(au.email, '@', 1),
    'seglare'
  ),
  COALESCE(au.email, '')
FROM auth.users au
LEFT JOIN public.users pu ON pu.id = au.id
WHERE pu.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Verifiera: antal auth-användare vs public.users
SELECT
  (SELECT COUNT(*) FROM auth.users)   AS auth_users,
  (SELECT COUNT(*) FROM public.users) AS public_users;

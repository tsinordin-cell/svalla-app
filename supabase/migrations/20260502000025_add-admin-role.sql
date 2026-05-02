-- ============================================================
-- SVALLA — Lägg till admin-roll
-- Kör detta i Supabase SQL Editor
-- ============================================================

-- 1. Lägg till is_admin-kolumn på users-tabellen
ALTER TABLE public.users
  ADD COLUMN IF NOT EXISTS is_admin boolean NOT NULL DEFAULT false;

-- 2. RLS: admin kan läsa alla users (redan möjligt via "Users can read all profiles")
--    Befintliga policies räcker — admin-logik sker i appkoden via is_admin-flaggan.

-- 3. Markera admin-användare (kör EFTER att kontona skapats i Supabase Auth)
UPDATE public.users
   SET is_admin = true
 WHERE email IN ('max@svalla.se', 'thomas@svalla.se');

-- 4. Verifiera
SELECT id, username, email, is_admin, created_at
  FROM public.users
 WHERE is_admin = true;

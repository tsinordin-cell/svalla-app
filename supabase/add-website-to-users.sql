-- Migration: lägg till website-kolumn på users
-- Kör detta i Supabase SQL Editor

ALTER TABLE users ADD COLUMN IF NOT EXISTS website text;

-- Kommentar
COMMENT ON COLUMN users.website IS 'Valfri hemsida-URL för användaren';

-- ============================================================
-- SVALLA — Fix: Platser placerade i vatten istället för på land
-- Bild 1: Ingmarsö/Svartsö-sundet → flytta inåt land
-- Bild 2: Möja hamnområdet → flytta hamncafé/krogplatser inåt
-- Bild 3: Möja Hemviken → flytta kafé-platser bort från viken
-- Kör i Supabase SQL Editor
-- ============================================================

-- ── INGMARSÖ ─────────────────────────────────────────────────
-- 59.4712, 18.7358 hamnar i sundet öster om Svartsö
-- Flytta till Ingmarsö hamn (59.4752, 18.7445)
UPDATE restaurants
SET latitude = 59.4752, longitude = 18.7445
WHERE name = 'Ingmarsö Krog';

UPDATE restaurants
SET latitude = 59.4748, longitude = 18.7438
WHERE name = 'Ingmarsö Sommarbutik';

-- ── SVARTSÖ ──────────────────────────────────────────────────
-- 59.4645, 18.7265 ligger i sundet
-- Flytta till Svartsö hamn (59.4658, 18.7285)
UPDATE restaurants
SET latitude = 59.4658, longitude = 18.7285
WHERE name = 'Svartsö Krog';

UPDATE restaurants
SET latitude = 59.4652, longitude = 18.7278
WHERE name = 'Svartsö Handelsbod';

-- ── MÖJA — Hamncafé/Bar (Bild 2 & 3) ────────────────────────
-- Möja-koordinater 59.4365-59.4382, 18.8278-18.8295
-- ligger i viken vid Hemviken/Möjahamnen
-- Flytta inåt land vid Möja hamn (59.4398, 18.8312)
UPDATE restaurants
SET latitude = 59.4398, longitude = 18.8318
WHERE name = 'Möja Hamnbar';

UPDATE restaurants
SET latitude = 59.4392, longitude = 18.8312
WHERE name = 'Les Poissonniers de Möja';

UPDATE restaurants
SET latitude = 59.4388, longitude = 18.8308
WHERE name = 'Jeppes';

UPDATE restaurants
SET latitude = 59.4402, longitude = 18.8322
WHERE name = 'Hamncafét Möja';

-- ── RUNMARÖ ──────────────────────────────────────────────────
-- Runmarö-platser nära 59.345, 18.750 kan hamna i viken
-- Flytta till Runmarö hamn (59.3482, 18.7548)
UPDATE restaurants
SET latitude = 59.3482, longitude = 18.7548
WHERE name = 'Svängen Runmarö';

UPDATE restaurants
SET latitude = 59.3478, longitude = 18.7542
WHERE name = 'Låttas bageri';

UPDATE restaurants
SET latitude = 59.3475, longitude = 18.7538
WHERE name = 'Runmarö Bryggkiosk';

-- ── SÖDERMÖJA ────────────────────────────────────────────────
-- 59.4102, 18.8794 kan vara i vattnet norr om Möja
-- Flytta till Södermöja (59.4118, 18.8815)
UPDATE restaurants
SET latitude = 59.4118, longitude = 18.8815
WHERE name = 'Södermöja Krog';

-- ── NÄMDÖ ────────────────────────────────────────────────────
-- Dubbla nämdö-poster — säkerställ att de är på land
UPDATE restaurants
SET latitude = 59.1348, longitude = 18.6745
WHERE name = 'Nämdö Handelsbod & Café';

UPDATE restaurants
SET latitude = 59.1342, longitude = 18.6738
WHERE name = 'Nämdö Hamncafé';

-- Verifiera — visa alla platser med uppdaterade koord
-- SELECT name, island, latitude, longitude FROM restaurants
-- WHERE name IN (
--   'Ingmarsö Krog','Svartsö Krog','Möja Hamnbar','Les Poissonniers de Möja',
--   'Jeppes','Hamncafét Möja','Svängen Runmarö','Södermöja Krog'
-- );

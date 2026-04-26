-- ============================================================
-- SVALLA — fix-coordinates-v3.sql
-- DEFINITIV KOMPLETT koordinatfix för alla platser
--
-- Inkluderar ALLT från v1 + v2 + nya fynd.
-- Kör denna istället för v1 och v2 — den täcker alla.
--
-- Kör i Supabase SQL Editor: klistra in, tryck RUN.
-- ============================================================


-- ════════════════════════════════════════════════════════════
-- BLOCK 1 — v1-fixar (gamla seed.sql-fel, 4 platser)
-- ════════════════════════════════════════════════════════════

-- Grinda Wärdshus: 59.6028,18.7275 → 59.409,18.562
-- (hamnade nära Blidö, 45 km för långt norrut)
UPDATE restaurants
SET latitude = 59.409, longitude = 18.562,
    island = 'Grinda', archipelago_region = 'middle'
WHERE name = 'Grinda Wärdshus';

-- Finnhamns Kafé: 59.6325,18.8122 → 59.492,18.785
-- (för långt norrut)
UPDATE restaurants
SET latitude = 59.492, longitude = 18.785,
    island = 'Finnhamn', archipelago_region = 'middle'
WHERE name = 'Finnhamns Kafé';

-- Utö Värdshus: 58.9603,17.8897 → 58.952,18.318
-- (longitud 17.89 = väster om Södertälje — kritiskt fel)
UPDATE restaurants
SET latitude = 58.952, longitude = 18.318,
    island = 'Utö', archipelago_region = 'south'
WHERE name = 'Utö Värdshus';

-- Arholma Krog: 60.0183,18.8892 → 59.848,19.130
-- (för långt norrut + fel longitud)
UPDATE restaurants
SET latitude = 59.848, longitude = 19.130,
    island = 'Arholma', archipelago_region = 'north'
WHERE name = 'Arholma Krog';


-- ════════════════════════════════════════════════════════════
-- BLOCK 2 — v2-fixar (vatten-placeringar, 14 platser)
-- ════════════════════════════════════════════════════════════

-- ── INGMARSÖ ─────────────────────────────────────────────
-- Gamla koord (59.4712, 18.7358) hamnade i sundet öster om Svartsö
UPDATE restaurants
SET latitude = 59.4752, longitude = 18.7445
WHERE name = 'Ingmarsö Krog';

UPDATE restaurants
SET latitude = 59.4748, longitude = 18.7438
WHERE name = 'Ingmarsö Sommarbutik';

-- ── SVARTSÖ ──────────────────────────────────────────────
-- Gamla koord (59.4645, 18.7265) låg i sundet
UPDATE restaurants
SET latitude = 59.4658, longitude = 18.7285
WHERE name = 'Svartsö Krog';

UPDATE restaurants
SET latitude = 59.4652, longitude = 18.7278
WHERE name = 'Svartsö Handelsbod';

-- ── MÖJA — Hamn ──────────────────────────────────────────
-- Koordinater 59.4365-59.4382, 18.8278-18.8295 låg i viken
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

-- ── RUNMARÖ ──────────────────────────────────────────────
-- Gamla koord nära 59.345, 18.750 låg i viken
UPDATE restaurants
SET latitude = 59.3482, longitude = 18.7548
WHERE name = 'Svängen Runmarö';

UPDATE restaurants
SET latitude = 59.3478, longitude = 18.7542
WHERE name = 'Låttas bageri';

UPDATE restaurants
SET latitude = 59.3475, longitude = 18.7538
WHERE name = 'Runmarö Bryggkiosk';

-- ── SÖDERMÖJA ────────────────────────────────────────────
-- 59.4102, 18.8794 kan vara i vattnet norr om Möja
-- OBS: seed-restaurants-batch3.sql har DO UPDATE SET → kan ha åsidosatt v2-fixar!
UPDATE restaurants
SET latitude = 59.4118, longitude = 18.8815
WHERE name = 'Södermöja Krog';

-- ── NÄMDÖ ────────────────────────────────────────────────
UPDATE restaurants
SET latitude = 59.1348, longitude = 18.6745
WHERE name = 'Nämdö Handelsbod & Café';

UPDATE restaurants
SET latitude = 59.1342, longitude = 18.6738
WHERE name = 'Nämdö Hamncafé';


-- ════════════════════════════════════════════════════════════
-- BLOCK 3 — v3-fixar (NYA FEL, ej täckta av v1/v2)
-- ════════════════════════════════════════════════════════════

-- ── RESTAURANG HORSFJÄRDEN ────────────────────────────────
-- Kritiskt fel: island='Muskö' men koord 58.8202,17.8498
-- hamnar vid Torö / södra Ankarudden-området (~25 km fel).
-- Horsfjärden + Muskö = 59.03–59.05°N, 18.06–18.10°E.
-- Korrekt: vid inre Horsfjärden på Muskösidan.
UPDATE restaurants
SET latitude = 59.038, longitude = 18.078,
    island = 'Muskö', archipelago_region = 'south'
WHERE name = 'Restaurang Horsfjärden';

-- ── ARTIPELAG (Gustavsberg / Värmdö) ─────────────────────
-- Seed: 59.3162, 18.3613 — kan ligga i kanten av Baggensfjärden
-- Korrekt GPS för Artipelag kulturhus: 59.3149, 18.3566
UPDATE restaurants
SET latitude = 59.3149, longitude = 18.3566
WHERE name = 'Artipelag';


-- ════════════════════════════════════════════════════════════
-- VERIFIERING — avkommentera och kör för att kontrollera
-- ════════════════════════════════════════════════════════════

SELECT
  name,
  island,
  archipelago_region,
  round(latitude::numeric, 4)  AS lat,
  round(longitude::numeric, 4) AS lng
FROM restaurants
WHERE name IN (
  -- Block 1
  'Grinda Wärdshus',
  'Finnhamns Kafé',
  'Utö Värdshus',
  'Arholma Krog',
  -- Block 2
  'Ingmarsö Krog',
  'Ingmarsö Sommarbutik',
  'Svartsö Krog',
  'Svartsö Handelsbod',
  'Möja Hamnbar',
  'Les Poissonniers de Möja',
  'Jeppes',
  'Hamncafét Möja',
  'Svängen Runmarö',
  'Låttas bageri',
  'Runmarö Bryggkiosk',
  'Södermöja Krog',
  'Nämdö Handelsbod & Café',
  'Nämdö Hamncafé',
  -- Block 3
  'Restaurang Horsfjärden',
  'Artipelag'
)
ORDER BY archipelago_region, island, name;

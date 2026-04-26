-- fix-bad-coords.sql — auto-rätta misstänkta koord i Supabase
--
-- KÖR find-bad-coords.sql FÖRST för att se VAD som ska ändras.
-- Det här scriptet GÖR ändringar — kör i en transaction och rollbacka
-- om resultatet ser fel ut.
--
-- Strategi: matcha rader på `name`/`location_name` mot kända ö-koord
-- och uppdatera lat/lng till verifierade värden.

BEGIN;

-- ── 1. Fixa restaurants baserat på namn-matchning ───────────────────
-- (Bara raderna utanför Stockholms skärgård — säkrar att vi inte
--  rör korrekta koord)

UPDATE restaurants SET lat = 59.2887, lng = 18.9265
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%sandhamn%';

UPDATE restaurants SET lat = 59.3478, lng = 18.6234
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%grinda%';

UPDATE restaurants SET lat = 59.4378, lng = 18.8456
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%finnhamn%';

UPDATE restaurants SET lat = 58.9333, lng = 18.3000
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%utö%';

UPDATE restaurants SET lat = 59.3893, lng = 18.8867
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%möja%';

UPDATE restaurants SET lat = 59.4022, lng = 18.3520
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%vaxholm%';

UPDATE restaurants SET lat = 59.3217, lng = 18.1167
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND (lower(name) LIKE '%fjäderholm%' OR lower(name) LIKE '%fjaderholm%');

UPDATE restaurants SET lat = 59.2167, lng = 18.7167
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND (lower(name) LIKE '%nämdö%' OR lower(name) LIKE '%namdo%');

UPDATE restaurants SET lat = 59.5083, lng = 18.6422
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%ljusterö%';

UPDATE restaurants SET lat = 59.4350, lng = 18.7242
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%svartsö%';

UPDATE restaurants SET lat = 59.4783, lng = 18.9617
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%husarö%';

UPDATE restaurants SET lat = 59.0492, lng = 18.4067
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%ornö%';

UPDATE restaurants SET lat = 59.1342, lng = 18.4081
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%dalarö%';

UPDATE restaurants SET lat = 58.7414, lng = 17.8639
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%landsort%';

-- ── 2. Samma för places-tabellen om den har koord ────────────────────
-- (Kommentera ut blocket om tabellen `places` inte finns eller saknar lat/lng)

UPDATE places SET lat = 59.2887, lng = 18.9265
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%sandhamn%';

UPDATE places SET lat = 59.3478, lng = 18.6234
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%grinda%';

UPDATE places SET lat = 59.4378, lng = 18.8456
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%finnhamn%';

UPDATE places SET lat = 58.9333, lng = 18.3000
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%utö%';

UPDATE places SET lat = 59.3893, lng = 18.8867
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%möja%';

UPDATE places SET lat = 59.4022, lng = 18.3520
WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
  AND lower(name) LIKE '%vaxholm%';

-- ── 3. Sätt återstående felaktiga rader till NULL för manuell granskning ──
-- (Kör detta SIST efter att kända platser fixats. Tom granskar resterande.)

-- UPDATE restaurants SET lat = NULL, lng = NULL
-- WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6);

-- UPDATE places SET lat = NULL, lng = NULL
-- WHERE (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6);

-- ── Verifiering ─────────────────────────────────────────────────────
-- Räkna kvarvarande felaktiga rader

SELECT 'restaurants' AS table_name, COUNT(*) AS still_bad
FROM restaurants
WHERE lat IS NOT NULL AND lng IS NOT NULL
  AND (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6)
UNION ALL
SELECT 'places', COUNT(*)
FROM places
WHERE lat IS NOT NULL AND lng IS NOT NULL
  AND (lat NOT BETWEEN 58.6 AND 60.0 OR lng NOT BETWEEN 17.0 AND 19.6);

-- Om allt ser bra ut:
-- COMMIT;

-- Annars:
-- ROLLBACK;

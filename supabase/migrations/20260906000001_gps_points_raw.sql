-- 2026-09-06 — Rådata i gps_points
--
-- latitude/longitude är sedan PR #248 det UTJÄMNADE läget ur Kalman-filtret,
-- och speed_knots är den rensade farten. Telefonens egen fix sparades inte.
-- Följden: Toms fälttester (2026-09-05, bil, fel distans och fart) gick inte
-- att räkna om när filtret ändrades — det fanns inget att räkna på.
--
-- Tre kolumner, skrivs av /spara vid sidan av det utjämnade läget:
--   raw_latitude / raw_longitude  telefonens fix exakt som den kom
--   device_speed_knots            enhetens Doppler-fart (null om den saknas)
--
-- Visas ingenstans. Läses bara av verktyg som spelar upp turen genom filtret.
-- GPX-import och rader från före migrationen har null.
--
-- Koden (src/lib/gpsRows.ts) klarar sig utan migrationen: saknas kolumnerna
-- skrivs raden om utan dem. Ordningen spelar alltså ingen roll, men rådata
-- sparas först när den här är körd.
--
-- Idempotent. Ingen RLS-ändring — kolumnerna följer tabellens policyer.

ALTER TABLE public.gps_points
  ADD COLUMN IF NOT EXISTS raw_latitude double precision,
  ADD COLUMN IF NOT EXISTS raw_longitude double precision,
  ADD COLUMN IF NOT EXISTS device_speed_knots real;

COMMENT ON COLUMN public.gps_points.raw_latitude IS
  'Telefonens fix, oförändrad. latitude är det Kalman-utjämnade läget.';
COMMENT ON COLUMN public.gps_points.raw_longitude IS
  'Telefonens fix, oförändrad. longitude är det Kalman-utjämnade läget.';
COMMENT ON COLUMN public.gps_points.device_speed_knots IS
  'Enhetens egen (Doppler-) fart i knop. null = enheten gav ingen fart.';

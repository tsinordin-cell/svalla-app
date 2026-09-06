-- 2026-09-06 — Kvalitetssiffror per tur
--
-- trips.gps_quality (jsonb) skrivs av /spara vid Spara med det som
-- src/lib/gpsQuality.ts räknar ut ur punkterna: antal sparade/kastade
-- fixar, accuracy (medel/median/p95), längsta lucka, Kalman-omstarter,
-- andel rådata, toppfart 1 punkt vs 10 s-fönster, distans utjämnad vs rå.
-- Fältlistan och betydelsen står i GpsQuality-typen; "v" är versionen.
--
-- Syfte: kunna se i efterhand VARFÖR en tur blev fel (kastade 40 % av
-- fixarna? 90 s lucka? accuracy 35 m?) i stället för att gissa.
--
-- Skrivningen är best-effort: saknas kolumnen ignoreras felet (turen är
-- redan sparad). Ingen RLS-ändring — kolumnen följer trips-policyerna.
-- Idempotent.

ALTER TABLE public.trips
  ADD COLUMN IF NOT EXISTS gps_quality jsonb;

COMMENT ON COLUMN public.trips.gps_quality IS
  'Kvalitetssiffror för GPS-loggningen, se src/lib/gpsQuality.ts (GpsQuality, fält v = version).';

-- Utloggade (anon) får inte längre läsa users.onboarded_at (Toms ja 2026-11-22, "4 ja").
-- ÄNDRAR en befintlig rättighet.
--
-- Före: vem som helst kunde läsa datumet när varje konto gick igenom
-- introduktionen. Koden läser det bara för den inloggades egen rad (/feed,
-- /onboarding, som authenticated) och i admin (tjänsteklienten). Ingen kod
-- läser kolumnen utloggad, och users_publik innehåller den inte.
-- authenticated behåller läsrätten, eftersom kolumnrätter inte kan begränsas
-- per rad och egna sidor behöver den.
--
-- Återställning: grant select (onboarded_at) on public.users to anon;

revoke select (onboarded_at) on public.users from anon;

-- 2026-11-23 (Toms ja 15:38Z): vyn users_publik kördes med ägarens rätt och var
-- auto-uppdaterbar, och anon/authenticated hade skrivrätt från Supabases standardrätt.
-- Utloggade kunde då ändra och radera rader i users via vyn. Läsrätten behålls.
-- Redan körd i produktion (version 20261123153904); filen finns så att repot
-- och databasen stämmer.
-- Backning: grant insert, update, delete, truncate, references, trigger on public.users_publik to anon, authenticated;
revoke insert, update, delete, truncate, references, trigger on public.users_publik from anon, authenticated;

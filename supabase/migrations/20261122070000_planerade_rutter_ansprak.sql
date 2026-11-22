-- Anspråksnyckel för planerade rutter utan ägare (granskning 2026-11-22, Toms ja 22 nov).
--
-- Före: /api/planera/claim lät vilken inloggad användare som helst som hade
-- länken bli ägare till en rutt med user_id = null. Nu får den som skapar en
-- rutt utloggad en slumpad nyckel (sparas i webbläsaren); bara SHA-256 av
-- nyckeln sparas här. Claim kräver nyckeln och nollställer kolumnen.
--
-- Tillägg, ingen befintlig data eller behörighet ändras. Kolumnen läses och
-- skrivs bara av servern (tjänsteklienten i claim, insert i create).
-- Raderna går inte att läsa för andra än ägaren (policyerna från 2026-11-20).
--
-- Återställning: alter table public.planned_routes drop column ansprak_hash;

alter table public.planned_routes add column if not exists ansprak_hash text;

comment on column public.planned_routes.ansprak_hash is
  'SHA-256 (hex) av nyckeln som krävs för att knyta en rutt utan ägare till ett konto. Null när rutten har ägare eller skapades före 2026-11-22.';

-- 2026-10-06: ingen får längre ändra rutter utan ägare via API:t (kort 8ce07e20).
--
-- Varför: policyn planned_routes_update_stops gav rollen public (även
-- utloggade) rätt att ändra ALLA kolumner på rutter där user_id är null.
-- 2026-10-04 fanns 4 publicerade rutter utan ägare som alltså gick att skriva
-- över (namn, vägpunkter, status) av vem som helst.
--
-- Policyn behövdes bara av /api/planera/claim (en inloggad användare tar
-- över en rutt hen skapade utloggad). Claim skriver sedan
-- 2026-10-06 med tjänsteklienten efter egen kontroll, så policyn behövs inte.
-- suggested_stops och cached_path skrivs redan med tjänsteklienten (#444).
--
-- KÖR FÖRST NÄR KODÄNDRINGEN I /api/planera/claim LIGGER I PRODUKTION.
-- Går att köra igen (idempotent).

drop policy if exists planned_routes_update_stops on public.planned_routes;

-- 2026-10-03: bara ägaren ändrar en planerad rutt (revision P0-3).
-- Körd i produktion 2026-10-03 03:10 UTC (SQL Editor). Filen finns för
-- historiken och för nya miljöer. Går att köra igen (idempotent).
--
-- Ändring:
--  * planned_routes_update_stops gäller bara rutter utan ägare, och en ny
--    ägare måste vara den inloggade (claim-flödet: null -> auth.uid()).
--  * planned_routes_insert_any: en ny rutt skapas utan ägare eller med den
--    inloggade som ägare.
-- Rutter med ägare ändras bara av ägaren (policyn "users update own routes").
-- /api/planera sparar suggested_stops med tjänsteklienten (PR #444).
-- Följd: tur->rutt-länken (trip_id) från /logga/manuell sparas bara på egna
-- eller ägarlösa rutter.

alter policy planned_routes_update_stops on public.planned_routes
  using (user_id is null)
  with check (user_id is null or user_id = auth.uid());

alter policy planned_routes_insert_any on public.planned_routes
  with check (user_id is null or user_id = auth.uid());

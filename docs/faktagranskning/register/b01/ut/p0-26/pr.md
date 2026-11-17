## Varför
P0 i faktagranskningen: fel hållplats för den enda kollektiva förbindelsen. SL:s tabell för buss 839 som gäller nu (h839, 17 augusti till 12 december 2026) börjar vid Rudsjöterrassen via Haninge centrum. Handens station finns inte bland hållplatserna. Sidorna för Dalarö, Gålö, Kymmendö och Smådalarö, en guide och segelkurssidan sa ändå att bussen går från Handens station, med den äldre tabellen v839 som källa.

## Vad
20 ändringar i island-data.ts, guide-content.ts, segelkurs-data.ts och transit-stops.ts, och kallor.generated.ts omgenererad. Restider räknade ur h839 (Rudsjöterrassen till Hotellbryggan 33 till 39 min, Gålövägen 16 till 19, Smådalarö 45 till 54, vissa turer). Källorna för 869 och 845 bytta till tabellerna som gäller nu. Inga klockslag eller priser.

## Kontroll
- Granskare och oberoende Kontrollant (p0-26): 29 påståenden och 14 strukna meningar, efter två omgångar godkända.
- tsc 0 fel, verify-claims ok, generera-kallor --kontroll ok, vitest src/lib 732 gröna.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01RFXn8J6woskdrpFDAas8TM

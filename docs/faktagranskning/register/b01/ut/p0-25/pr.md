## Varför
P0 i faktagranskningen: texter som säger att en båt går som inte går i dag kan stranda någon.
- Bromskär på Blidö är avstängd till juni 2027 enligt Waxholmsbolagets tabell 28, men /o/blido och en guide sa att linje 28 angör bryggan.
- Linje 24, 26 och 27 gick 2026 från 2 april till 1 november och saknas i Waxholmsbolagets lista över dagens tabeller. Texter om Blidö, Svartlöga, Rödlöga, Norröra, Yxlan och Gräskö, faktarutor och guider sa ändå att båtarna går, några med klockslag ur tabeller som inte gäller.

## Vad
41 ändringar i island-data.ts, guide-content.ts, guides-data.ts och transit-stops.ts, och kallor.generated.ts omgenererad. Texterna anger 2026 års period eller att linjen inte finns bland tabellerna till 12 december, och vad som går i dag (till exempel SL-buss 634 till Blidö). Klockslag ur tabeller som inte gäller är borttagna; ingen sida är tunnare.

## Kontroll
- Granskare och oberoende Kontrollant (p0-25): 104 påståenden och 62 strukna meningar, efter fem omgångar alla OK.
- tsc 0 fel, verify-claims ok, generera-kallor --kontroll ok, vitest src/lib 732 gröna.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01RFXn8J6woskdrpFDAas8TM

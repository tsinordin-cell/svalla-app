## Varför
P0 i faktagranskningen: en för vag beställningsfrist kan stranda någon. Noterna om beställningsturer (P0 24, #570) sa till exempel för Utö att turen ska beställas "senast på eftermiddagen samma dag". Waxholmsbolagets tabell 21 säger "minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00", och de sena turerna från Gruvbryggan går efter 18. Den som beställer 17.30 kan bli stående.

## Vad
Bara fristmeningen i 27 noter i src/lib/transit-stops.ts, med anmärkningsbokstäverna och en KÄLLA-rad per tabell: b och B "dock senast kl. 17.00", C och c "senast kl. 19.00 dag före resdag". Vrångö (Västtrafik, "senast 15 minuter före avgång") var redan exakt och är orörd. Inga avgångstider eller priser.

## Kontroll
- Granskare och oberoende Kontrollant (p0-27): 54 rader OK, alla 18 tabeller lästa i dag.
- npm run prebuild ok, tsc 0 fel, vitest src/lib 770 gröna.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01RFXn8J6woskdrpFDAas8TM

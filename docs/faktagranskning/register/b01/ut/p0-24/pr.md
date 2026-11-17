## Varför
P0 i faktagranskningen: ett fel som kan stranda någon. Rutan "Sista båten från Sandhamn idag" visade en kväll 20:50, som är en beställningstur (tabell 16, anmärkning B). Utan beställning gick sista båten 17:35. Bryggan Bromskär på Blidö är avstängd till juni 2027 (tabell 28), men rutorna visade tider dit.

## Vad
- `bestallning` och `bestallningTabell` i transit-stops.ts på 29 öar, belagda med dagens tabeller (Waxholmsbolaget, SL och Västtrafik för Vrångö). Noten står direkt under tiden i Sista båten och under turerna i avgångsrutan.
- `stangd` för Bromskär: inga tider i rutorna, i /api/transit/departures och /last-departure, i utflyktens Battider eller hos Thorkel.
- Reseplaneraren: Göteborgsöarna länkar till Västtrafik, Aspö till Trafikverket, övriga till sl.se (sl.se/sv/reseplaneraren gav "Sidan kunde inte hittas"). Thorkels instruktioner hänvisar till rätt operatör.

## Kontroll
- Granskare och oberoende Kontrollant (p0-24): 86 påståenden, efter tre omgångar alla OK.
- tsc 0 fel, verify-claims ok, generera-kallor --kontroll ok, vitest src/lib 732 gröna.

🤖 Generated with [Claude Code](https://claude.com/claude-code)

https://claude.ai/code/session_01RFXn8J6woskdrpFDAas8TM

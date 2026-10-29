# Faktagranskningen (start 2026-10-29)

Uppdraget: varje sakuppgift som Svalla publicerar ska vara sann och belagd med en
tillåten källa som lästs i den här granskningen. Fel ersätts med rätt uppgift,
och ingen sida blir tunnare. Hela uppdraget: Drive/projektdokumentet
`claude/faktagranskning-prompt-2026-10-28.md` och promptfältet på huvudkortet
på svalla.se/team. Reglerna som gäller för alla: `docs/ARBETSREGLER.md`.

## Filerna här

| Fil | Vad |
|---|---|
| `STATUS.md` | Var arbetet står. Läs först. |
| `baslinje.json` | Mätningen före första ändringen. **Ändras aldrig.** |
| `platser-export-2026-10-29.json` | Platstabellen (restaurants) vid baslinjen: slug, typ, ö, koordinat, antal ord, dold. |
| `batchlista-fas1.json` | Fas 1 i batchar om 9 öar, mest besökta först. |
| `register/batch-NN.tsv` | Registret per batch — beviset enligt Klart-regeln. |
| `beslut-tom.md` | Det som bara Tom kan avgöra, per batch. |

## Arbetsgången per batch

1. **Utvinnaren** bryter ner varje sida i atomära påståenden. Underlaget är
   `node scripts/faktaregister.mjs --register <slugs>` (en rad per mening eller
   datavärde med fil:rad och befintlig KÄLLA) plus platsernas texter ur
   databasen och FAQ, JSON-LD och metatext som byggs ur datan.
2. **Granskaren** öppnar källan för varje rad och dömer KORREKT / FEL /
   INAKTUELL / DELVIS / OBELAGD / MOTSTRIDIG / EJ NÅBAR med ordagrant citat.
3. **Skribenten** ersätter enligt trappan: rätta → precisera → skriv frånvaron
   → stryk och kompensera. Nytt innehåll går tillbaka till Granskaren.
4. **Vakten** letar samma fel i hela repot och databasen.
5. **Kontrollanten** — har aldrig sett researchen — kontrollerar 100 % av
   ändrade rader och av transport, skyddsstatus, föreskrifter och säkerhet,
   plus 30 slumpade KORREKT-rader. Två fynd eller fler: alla KORREKT-rader.
6. **Vakten** mäter mot baslinjen: `node scripts/faktaregister.mjs --mat <slugs>
   --platser <färsk export>` ska vara utan BRIST. Prebuild, tsc och
   HTTP-kontroll av alla KÄLLA-URL:er ska vara gröna.
7. En gren och en PR per batch, pushad en gång. Merge, kontroll i produktion.

## Mätningen (MÄTT, mekanisk)

`faktaregister.mjs` läser ödatan med TypeScript-parsern. En **enhet** är en
mening i en textsträng eller ett datavärde (siffra, flagga, månad, koordinat).
Det är ett mått på volym, inte samma sak som Utvinnarens atomära påståenden —
en mening kan innehålla flera påståenden.

Kända begränsningar:
- En KÄLLA-rad följer bara med fältet eller objektet den står direkt ovanför.
  Står källan ovanför föregående listelement räknas raden som okällad i
  måttet, fast källan finns i filen. Registret räknar den som "befintlig källa
  saknas" och Granskaren läser filen.
- Platserna räknas med samma urval som `src/lib/islandPlaces.ts` (ö-fältet
  eller inom öns radie + 2 km), utan typfilter och utan gränsen 12 per lista.
- Hårdkodad text i sidmallarna mäts per fil under `mallar`, inte per ö.

Baslinjen 2026-10-29 (MÄTT): 101 öar, 86 227 ord, 10 066 enheter varav 8 495
med KÄLLA-rad och 397 med UPPSKATTNING-rad; 699 platser varav 625 med text och
143 dolda.

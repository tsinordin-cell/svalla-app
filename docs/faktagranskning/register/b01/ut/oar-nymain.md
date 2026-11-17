# Batch 01, öarna på nya main (ce275b2), 2026-11-17

Skribenten. Arbetskopia: /home/claude/svalla-oar7 (detached ce275b2, alla nio edits.json inlagda, kallor.generated.ts omgenererad; inte commitad).
Säkerhetskopior av edits.json, sql och tsv före ändringen: scratchpad/b01/oar7/fore/. Skript: scratchpad/b01/oar7/skript/ (sla_ihop.py, bygg.py, sql.py, register.py, lag3.py).

## Metod (MÄTT)
- Poster som inte gick in: tokenvis trevägssammanslagning per post (bas = filen på 1f02b76 med öns tidigare poster, deras = ce275b2, vår = batchens ny). "gammal" är nu main:s text för hela raderna, "ny" har både main:s ändring och batchens rättelse.
- Där main och batchen ändrat samma ställe (31 poster) vinner batchens text, och main:s ändring i det klustret (bara streck, skiljetecken och i ett fall stavning) görs om i stilpasset. Enda undantaget är julbordet, se nedan.
- Stilpasset: intervall blir "till", inskott får komma, fristående satser blir egna meningar, rubriker får kolon. Bara publicerad text; kommentarer, KÄLLA-rader och citat är orörda.
- Kontroll av att bara formen ändrats: ordmängden som varje post lägger till och tar bort är densamma före och efter, bortsett från "till", versal efter ny punkt och fallen nedan (jamfor.py).

## Poster per ö
| ö | poster | gick in direkt | omskrivna (varav samma ställe) | borttagna | poster med stiländring |
|---|---|---|---|---|---|
| fjaderholmarna | 45 | 35 | 10 (2) | 0 | 6 |
| grinda | 22 | 19 | 3 (0) | 0 | 2 |
| husaro | 17 | 8 | 9 (2) | 0 | 4 |
| moja | 35 | 22 | 13 (7) | 0 | 10 |
| sandhamn | 31 | 19 | 12 (5) | 0 | 6 |
| storholmen | 14 | 9 | 5 (0) | 0 | 1 |
| styrso | 23 | 12 | 11 (5) | 0 | 7 |
| uto | 35 | 29 | 6 (2) | 0 | 3 |
| vaxholm | 41 | 19 | 22 (7) | 0 | 11 |
| summa | 263 | 172 | 91 (31) | 0 | 50 |

Main hade i alla 91 fallen bara bytt tankstreck och skiljetecken (PR #540/#543), utom i fjäderholmarna #6 (sakuppgift, nedan) och sandhamn #22 (stavning Trouvillestranden, följd).

## Main ändrade sakuppgift
- fjaderholmarna #6 (fjaderholmarna-0111, 0112, 0115, N007), PR #554: julbordet slutar 20 december, inte 22 december. Main har KÄLLA-rad (fjaderholmarnaskrog.se, "VÅRT JULBORD SERVERAS MELLAN 20/11 - 20/12", läst 2026-11-17). Batchen hade strukit slutdatumet eftersom startsidan (22/12) och öppettidssidan (20/12) inte stämde överens. Nu: "serverar julbord 20 november till 20 december 2026." Main:s KÄLLA-rad är lagd ordagrant som egen rad. Batchens citat "NU SERVERA JULBORD MELLAN 20/11 - 22/12" är struket ur första KÄLLA-raden, och kommentaren om de olika slutdatumen är borttagen. Öppettidssidans citat ("till och med 20 december", läst 2026-10-29) står kvar. Ingen egen uppgift är tillagd.
- PR #557 (höstguiden för Sandhamn, Vaxholm och Grinda) ändrade bara guide-content.ts och guides-data.ts. Ingen post i batch 01 rör de filerna.

## Borttagna poster
Inga. Ingen post var redan gjord av main, och inget stycke var borttaget. Alla 263 poster ändrar något mot ce275b2.

## Stilval att granska (bara form)
- grinda #3 och grinda.sql: "månadsskiftet augusti–september 2026" blir "månadsskiftet mellan augusti och september 2026" (det är ett månadsskifte, inte ett intervall).
- husaro #13: riksintressets namn skrivs med bindestreck som i källan: "Husarö-Ingmarsö-Svartsö-Gällna-Hjälmö".
- vaxholm #1, #26 och #31: "1549–58" blir "1549 till 1558".
- styrso #10: inskottet om buss 114 blir en egen mening efter huvudsatsen. Orden är desamma, men ordningen är ändrad.
- vaxholm #28: kajak difficulty blir 'lätt-medel' (bindestreck). Mallarnas kajakGrad (runda 5) tolkar 'lätt–medel' och 'lätt-medel', men inte 'lätt till medel'. Main skrev 'lätt till medel' på tre andra öar i PR #540, och de får då ingen grad med mallarnas patch. Det hör till mallarnas runda 7.
- vaxholm.sql: "vintern 2026–2027" blir "vintern 2026 till 2027".

## SQL (ut/<ö>.sql)
Bara SET-värden är ändrade: grinda 2, moja 2, sandhamn 1, styrso 1, uto 2 och vaxholm 1 intervall. WHERE-villkor och kommentarer är ordagrant som förut; de streck som finns kvar står bara i WHERE (kontrollerat per sats). fjaderholmarna, husaro och storholmen är oförändrade.

## Registret
- uto-0360, uto-0356, grinda-0400, grinda-0401, vaxholm-0360, vaxholm-0364 och husaro-0206: kolumnen "rätt uppgift" beskriver nu koden med mallarnas runda 5 (mall-0086). Där är sl.se och waxholmsbolaget.se borttagna ur MYNDIGHET_DOMAN, och tryckta tidtabeller räknas inte som myndighet. Posterna har myndighet: false och visas utan MYNDIGHET (MÄTT i /home/claude/svalla-slut). OBS: på main ce275b2 är de fortfarande myndighet: true, eftersom mallarnas patch inte är inlagd. Dom och åtgärd (KORREKT/BEHÅLL) är orörda; Redaktören avgör om de ska ändras.
- fil:rad: verktygen kan inte flytta radnummer. kontrollera_register.py jämför fil:rad med grundregistret, så kolumnen är orörd och följer fortfarande den baslinje registret byggdes mot. kontrollera_register.py: inga formfel i uto, grinda, vaxholm och husaro. De 6 grundraderna utan motsvarighet för uto fanns redan före ändringen.

## Kontroller (MÄTT, i /home/claude/svalla-oar7)
- applicera.mjs: alla nio torrkörda mot ren ce275b2 utan fel (172 + 91 = 263 ok). Sedan skarp körning i följd fjaderholmarna … vaxholm: 263 ok, 0 fel.
- npx tsc --noEmit -p .: 5 fel, alla väntade, eftersom de kräver mallarnas patch: island-data.ts(1033) difficultyFor (Vaxholms kajak), island-data.ts(1779) kajak utan difficulty (Möja) och islandCoords.ts rad 27, 33 och 70 platsRadieKm (fjaderholmarna, grinda, storholmen).
- node scripts/verify-claims.mjs: ok, "inga NYA påståenden utan källa". 14 varningar, samma antal som på ren main.
- node scripts/generera-kallor.mjs: 101 öar och 1637 källor. --kontroll: "filen är aktuell".
- npx vitest run src/lib: 70 filer och 732 tester gick igenom.
- Övriga kontroller i prebuild (schemakontroll, guard-cache-regler, generera-uppskattningar --kontroll, hamta-obilder --stada --kontroll): exit 0.
- Main har ingen egen kontroll för tankstreck i scripts/ eller i testerna. Sökningen gav bara texter som nämner ordet, inga kontroller.
- Tankstreck (— och –) i "ny" utanför kommentarer: 0 i 263 poster (streck.py; före stilpasset 99). I island-data.ts-blocken för de nio öarna i kopian: 0 i publicerad text.

## Lag 3 (ord i strängarna i öns island-data.ts-block utan kommentarer, ce275b2 jämfört med kopian; lag3.py)
| ö | main | kopia | andel |
|---|---|---|---|
| fjaderholmarna | 1 365 | 1 824 | 133,6 % |
| grinda | 1 835 | 2 023 | 110,2 % |
| husaro | 558 | 707 | 126,7 % |
| moja | 1 717 | 2 095 | 122,0 % |
| sandhamn | 1 725 | 2 219 | 128,6 % |
| storholmen | 597 | 687 | 115,1 % |
| styrso | 758 | 1 191 | 157,1 % |
| uto | 2 127 | 2 541 | 119,5 % |
| vaxholm | 1 915 | 2 319 | 121,1 % |
- Guiderna (guide-content.ts, guides-data.ts) ändras inte av någon post: 100 %.
- Andra filer, ord i postens gammal och ny: transit-stops.ts storholmen 13→0 (storholmen-0060, 0061), hantverkare-data.ts sandhamn 6→2 (sandhamn-0260) och moja-0488 3→2. Det är batchens egna, tidigare kontrollerade ändringar; stilpasset gjorde inga ändringar i dem. Övriga filer: lika eller fler ord.
- Ingen sida är under 95 %.

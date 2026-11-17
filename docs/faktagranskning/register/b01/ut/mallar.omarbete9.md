# Sidmallarna, batch 01 – omarbete 9 (2026-11-17): båtrutan och lokala förbud

Arbetskopia: /home/claude/svalla-mallar7 (ce275b2, rundorna 1–9 ocommittade; säkerhetskopia av runda 8: mallar9/runda8.patch). Leverans: ut/mallar-arbetskopia.patch (47 filer, `git apply --check` mot ren ce275b2 går igenom), mallar.tsv mall-N025–N042 (18 nya rader, gamla rader orörda). Kod: src/lib/batregler.ts (ny, med test), komma-dit/page.tsx:12, 127-131, 308, 341-357. Öarnas data inte ändrad.
MÄTT = renderat (mallar8/skript/matt8.tsx, db-riktig.json); källor hämtade 2026-11-17 (curl), sparade i kallcache/ny/; 56 av 56 nya citat sökta ordagrant i dem (mallar9/skript/citat.py).

## Regeln
Varje ö där båtrutan visas (egenBatFard, 19 öar) är genomgången i öns data och hos myndigheten för området: Länsstyrelsens reservats- eller nationalparkssida, nationalparksföreskrifterna och Länsstyrelsen i Stockholms läns föreskrifter om ankringsförbud (01FS 2001:74).
1. Förbud enligt myndigheten (nivå 1): rutan börjar med "Lokala föreskrifter går före allemansrätten, och du är skyldig att följa dem." och öns förbud (KÄLLA-rad per ö i batregler.ts).
2. Förbud bara enligt en verksamhet (nivå 2): rutan visas inte.
3. Inget förbud hittat: rutan visas med förbehållet.
Allemansrätten i rutan: "… vid en strand som inte hör till någon tomt och inte är skyddad för fågelliv eller annat, så länge inga lokala föreskrifter säger något annat. Den som åker båt ska känna till de regler och föreskrifter som gäller för vattnet." (Naturvårdsverket, På vatten; det gamla citatet var kapat före "eller som är skyddad", förtydligande 11). "Det finns ingen regel för hur länge …" blir "Allemansrätten har ingen regel …".

## Tabell (ö, visas rutan, lokalt förbud enligt källa)
| Ö | Rutan | Lokalt förbud (källa) |
|---|---|---|
| Askö | ja, regel 1 | förankra högst 2 dygn vid samma strand; fågelskydd 1/4–15/7 och 1/4–31/7; skjutfält får inte beträdas (Lst Södermanland) |
| Bullerö | ja, 1 | nationalparken: ankra/lägga till högst 2 dygn, 5 knop inom 100 m från land, ankringsförbud i känsliga områden, fågelskydd (Lst Stockholm) |
| Ormskär | ja, 1 | samma nationalpark (skötselplanen, rapport 7202) |
| Långviksskär | ja, 1 | nationalparken som ovan; reservatsdelen: ankra/förtöja vid brygga förbjudet, högst 2 dygn (Lst) |
| Svenska Högarna | ja, 1 | tillträdesförbud A/B/C; område 1C: färdas, över 5 knop och ankra förbjudet; förtöja högst 2 dygn; landstigning över 10 personer efter samråd (Lst) |
| Huvudskär | ja, 1 | förankra högst 2 dygn vid samma strand (Lst) |
| Norrpada | ja, 1 | förtöja högst 2 dygn vid samma plats (Lst) |
| Långskär | ja, 1 | förankra högst 2 dygn; 7 knop utom utpekat område; fågelskydd 1/2–15/8 (Lst) |
| Lilla Karlsö | ja, 1 | landstigning bara vid östra bryggan; tillstånd 1/3–31/8; fågelskydd 1/2–31/8 (Lst Gotland) |
| Gotska Sandön | ja, 1 | ankringsförbud vid Tärnudden (sverigesnationalparker.se); sälskydd vid Säludden; vattenskoter (Lst Gotland) |
| Blå Jungfrun | ja, 1 | högst 8 knop i nationalparken (NFS 2014:8) |
| Storholmen | ja, 1 | ankringsförbud vid kabeln Lidingö–Storholmen (01FS 2001:74 p. 83) |
| Smådalarö | ja, 1 | ankringsförbud 100 m kring kabeln Smådalarö–Edesön (p. 128) |
| Väddö | ja, 1 | ankringsförbud 100 m kring kabeln i Väddö kanal (p. 7), 150 m Grisslehamn–Byholma (p. 3) |
| Birka | nej, regel 2 | ankringsförbud i viken och inom 50 m från strand enligt birkavikingastaden.se (nivå 2); inget hos Lst (Björkö naturreservat) eller i 01FS 2001:74 |
| Storskär | ja, 3 | inget (Lst: bara tältning 1 dygn, eld, hund) |
| Trysunda | ja, 3 | inget (Lst Västernorrland: fordon på land, eld, hund) |
| Hanö | ja, 3 | inget (Lst Blekinge: fordon, tält, eld, hund) |
| Yttre Gården | ja, 3 | inget reservat i Naturvårdsregistret (Nynäshamn), ingen punkt i 01FS 2001:74 |

Inte genomsökt: fartbegränsningarna i Länsstyrelsen i Stockholms läns sjötrafikföreskrifter (01FS 2001:138; omtrycket 01FS 2018:48 hittades inte) och motsvarande i andra län. 01FS 2001:74 är bekräftad gällande 31 december 2018 (01FS 2019:1, ändrad bara i p. 92 och 180); senare ändringar inte kontrollerade.

## Lag 3 (main ce275b2 → ihop runda 9; ihop = patchen + öarnas 266 poster, källistan genererad om)
- Bara de 19 komma-dit-sidorna ändras. 18 ökar (till exempel Långviksskär 202 → 406, Svenska Högarna 251 → 439, Storskär 225 → 303).
- Ny under 95 %: Birka komma-dit 452 → 373 (82,5 %, brist 57), eftersom rutan tas bort (regel 2). Ingen kompensation i öns data (instruktionen).
- Under 95 % totalt: 16 sidor (runda 8: 15 + Birka); batch 01: 0. Bara mallarnas kopia: 20 (runda 8: 19 + Birka).
Förslag för Birka (kompenseras i öns data eller med en källa): belägg ankringsförbudet hos myndigheten (Länsstyrelsen Stockholm eller Ekerö kommun, till exempel ett beslut om fornlämningsområdet i vattnet). Då gäller regel 1 och rutan kan visas med förbudet först; annars en belagd mening om gästhamnen i öns hamnpost.

## Kontroller (2026-11-17)
I /home/claude/svalla-mallar7: `npx tsc --noEmit -p .` 0 fel · `node scripts/verify-claims.mjs` exit 0 (2 kända i baslinjen) · `generera-kallor.mjs --kontroll` aktuell, 101 öar, 1 639 källor · `generera-uppskattningar.mjs --kontroll` grön · `npx vitest run src/lib` 77 filer, 786 test gröna (nytt: batregler.test.ts). kontrollera_register.py (mallar): inga formfel, 295 rader.
Ihop (/home/claude/svalla-mallar9-ihop, worktree på ce275b2 + patchen + applicera.mjs för de nio öarna, 266 poster, 0 fel; källistan 1 751 källor): tsc 0 fel · verify-claims exit 0 · generera-kallor --kontroll grön · uppskattningar grön · vitest 77 filer, 786 test gröna. Kopian borttagen.
Inga tankstreck i tillagd publicerad text (test i batregler.test.ts; renderad ruta sökt). Inget P0: main visar inte båtrutan, och öarnas egna texter om ankring på de 19 öarna stämmer med källorna.

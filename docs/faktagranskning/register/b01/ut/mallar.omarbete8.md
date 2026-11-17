# Sidmallarna, batch 01 – omarbete 8 (2026-11-17)

Arbetskopia: /home/claude/svalla-mallar7 (worktree på origin/main ce275b2, inget committat). Säkerhetskopia av runda 7: mallar8/runda7.patch.
Leverans: register/b01/ut/mallar-arbetskopia.patch (`git diff origin/main`, 45 filer; `git apply --check` mot en ren ce275b2 går igenom), register/b01/mallar.tsv (6 ändrade rader: mall-0174, 0189, 0198, 0215, 0231, N015; 5 nya: mall-N020–N024).
MÄTT = renderat med tsx och react-dom/server, 101 öar × nio sidtyper (909 sidor) plus /aktivitet/kajak. main = ce275b2, r7 = runda 7, r8 = arbetskopian nu, ihop = r8 + öarnas 267 poster i edits.json som de låg 21:47 (applicera.mjs, alla gick in; källistan genererad om). RESONERAT = läst i koden. Läsdatum 2026-11-17.
Mätningar och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/mallar8/ (matt/, skript/matt8.tsx, lag3.py, uppskjut.py, diff.py, villkor.ts).

## Mätdatabasen (punkt 2a)
- `mcp__Supabase__execute_sql`, bara SELECT: `slug, name, island, type, latitude, longitude, hidden_at from restaurants`. 699 rader, 556 synliga, 143 dolda. Sparad som mallar8/data/db-riktig.json (bara de kolumnerna; hidden_at som datum).
- Låtsasdatabasen skilde sig: 395 namn, 52 lägen, en synlig plats saknades (bistro-lillstromma). Låtsasklienten filtrerar nu `hidden_at is null`.
- Ingen description i uttaget (instruktionens kolumner). På sajten visar platskorten upp till 240 tecken text och badsidans läge läses ur texten; här visar korten bara namn. Samma för main och kopian, men andelarna på bad-, restaurang- och hamnsidor kan skilja något mot sajten (RESONERAT).

## Punkt 1: länken till ruttplaneraren
- MÄTT i koden: src/middleware.ts:10 har '/planera' i PROTECTED_ROUTES; rad 195 undantar bara `pathname === '/planera/ny'` och `/planera/<uuid>`. En utloggad besökare på /planera skickas alltså till inloggningen. /planera/ny är publik och /api/planera/create sparar `user_id: session?.user.id ?? null` (rad 43), så texten "Ruttplaneraren fungerar utan konto. Logga in om du vill spara rutten i dina rutter." stämmer för /planera/ny (claim kräver inloggning, mall-0189).
- Rättat: knappen går till /planera/ny i komma-dit/page.tsx:368 (101 öar), bad/page.tsx:345 och med-barn/page.tsx:318 (de 52 öarna utan Thorkels båtdata). Kommentarerna säger varför. Texten är oförändrad.
- Övriga mallar under src/app/o: ingen annan länk till /planera (sökt). Utanför /o pekar PublicFooter.tsx:76 ("Båtruttplanerare") och Nav.tsx:134 på /planera, och PlaneraNyClient.tsx:236 skickar "tillbaka" från första steget till /planera. Inte ändrat (utanför uppdraget).

## Punkt 2: Lag 3 utanför batch 01 (riktig databas, ihop)
Runda 7:s 59 sidor (låtsasdatabasen) blir 43 med den riktiga databasen före runda 8: 18 hamn-, restaurang- och boendesidor låg under 95 % bara på grund av låtsasnamnen (till exempel Fjällbacka, Hamburgsund, Käringön, Marstrand och Svartsö hamnar, Möja, Nåttarö, Landsort och Rödlöga restauranger, Finnhamn och Väddö boende), och två tillkom (Landsort boende, Lysekil bad). Efter runda 8: 15 sidor utanför batch 01; ihop 15 totalt (batch 01: 0), r8 19 (batch 01: 4).
Tabell: main / före (runda 7 + öarnas 263 poster som de låg 21:30) → efter (ihop), andel efter.
- Komma-dit, SL-öar: Djurö 360/278 → 358 (99,4) · Vindö 334/250 → 363 · Ingarö 297/211 → 324 · Torö 314/230 → 343 · Muskö 299/215 → 328 · Gålö 292/208 → 321 · Mörkö 291/207 → 320 · Gräddö 287/203 → 316 · Singö 278/194 → 307 · Dalarö 262/178 → 291 · Furusund 254/170 → 283 · Adelsö 314/238 → 351 · Smådalarö 316/230 → 472 · Väddö 306/222 → 464 · (Storholmen, b01, 300/231 → 547).
- Komma-dit, båtöar: Askö 309/233 → 332 · Huvudskär 308/231 → 340 · Birka 452/373 → 502 · Yttre Gården 361/334 → 404 · Svenska Högarna 251/226 → 296 · Storskär 225/202 → 272 · Bullerö 257/180 → 311 · Ormskär 221/198 → 268 · Norrpada 219/196 → 266 · Långskär 215/192 → 262 · Långviksskär 202/179 → 249.
- Bad, över 95 %: Dalarö 308/280 → 310 · Kosterhavet 273/254 → 280.
- Boende, över 95 %: Landsort 244/218 → 245.
- Kvar under 95 %: Svartlöga bad 353/277 → 277 (78,5) · Gräddö bad 356/284 → 284 (79,8) · Arholma bad 276/226 → 226 (81,9) · Brännö bad 313/267 → 267 (85,3) · Nåttarö bad 282/247 → 247 (87,6) · Fjällbacka bad 254/226 → 226 (89,0) · Gräddö ösidan 1829/1670 → 1670 (91,3) · Trysunda bad 280/258 → 258 (92,1) · Lidö bad 267/247 → 247 (92,5) · Nämdö bad 253/235 → 235 (92,9) · Brännö ösidan 1860/1733 → 1733 (93,2) · Trysunda ösidan 1848/1741 → 1741 (94,2) · Dalarö hamnar 160/151 → 151 (94,4) · Lysekil bad 281/266 → 266 (94,7) · Gällnö ösidan 2494/2367 → 2367 (94,9).

## Orsak och kompensation per sida (punkt 2b, 2c)
- **Komma-dit, 25 öar.** Orsak: Waxholmsbolagets biljett- och beställningstips (cirka 85 ord) stod på main på alla Stockholmsöar; sedan mall-0174 (2026-11-02, förtydligande 5) bara där bolaget trafikerar ön. Thorkel-rutan (mall-0188/0189) gav tillbaka några ord. Kompensation i samma ruta, src/app/o/[slug]/komma-dit/page.tsx:117-125,302,321-341:
  - SL:s egna regler där ön nås med SL men inte med Waxholmsbolaget (`slTrafik`; 15 öar): barn under 7 gratis, upp till sex barn 7 till 11 år gratis med vuxen, rabatt under 20 och över 65, betalkort och 75 minuters giltighet. Inga priser. KÄLLA https://sl.se/biljetter/sortiment-och-regler/rabatter och https://sl.se/biljetter/res-med-betalkort (nivå 2, Chromium). mall-N020, N021.
  - Allemansrätten för båt där egen båt är ett färdsätt och Waxholmsbolaget inte trafikerar ön, och som förut där allmän trafik saknas (`egenBatFard`; 19 öar): hur länge man får ligga för ankar, markägarens lov, skyddade områden och förbudet mot att vara på vattnet nära fågel- och sälskydd. KÄLLA Naturvårdsverket https://www.naturvardsverket.se/amnesomraden/allemansratten/sa-gor-vi-allemansratt/pa-vatten/ (nivå 1, curl). mall-N022, N023.
- **Bad, Dalarö och Kosterhavet.** Orsak: mall-0198 (2026-11-02) tog bort "brygga", "klipp" och "strand" ur urvalet, så "Vrakdykning" och "Snorkling och dykning" föll bort. Kompensation: "dyk" i urvalet (bad/page.tsx:96-101). Korten lästa i dag: Haninge kommun (Dalarö skeppsvraksområde) och sverigesnationalparker.se (två sidor). mall-N024.
- **Landsort boende.** Orsak: strykningen av klockslag (Toms beslut 10) gav 218/244 med den riktiga databasen; runda 7 mätte den över 95 % med låtsasdatabasen. Beslut C: strykningen skjuts upp. Listan UPPSKJUTEN_STRYKNING är mätt om (src/lib/klockslagStrykning.ts): 53 → 44 sidor. Nytt: landsort/boende. Stryks nu (minst 95 % med strykning, tack vare den riktiga databasen eller kompensationen): Arholma, Eknö, Fjärdlång, Kymmendö och Landsort med barn, Askö, Blå Jungfrun, Djurö och Huvudskär komma-dit, Svartsö boende. Klockslag main → r8: ösidan 75 → 23 öar, komma-dit 25 → 6, boende 23 → 19, med barn 26 → 15. mall-N015.
- **Bad, tio sidor kvar.** Orsak: mall-0198 (kort som inte gäller bad: Arboretum, Fiskeläget, Segling, Cykling, Dans på Brännö brygga, Vandring, Vetteberget, Sälsafari, Båt till Tjockö, Gästhamn och sjömack), metabeskrivningen utan "vägbeskrivning" (mall-0191/0192) och Thorkel-rutan (mall-0215). Ingen generell, belagd mening som gäller just badet på ön går att lägga i mallen; sidorna har redan allemansrätten, Badplatsen och hundreglerna. Se listan.
- **Ösidan, fyra sidor kvar.** Orsak: källistan publicerar inte klockslag och priser ur KÄLLA-citaten (förtydligande 14, mall-N009) och fäller ihop källor; Brännö har dessutom sex guider färre (mall-0103: Bohuslänsguider som inte nämner Brännö); Trysunda "från Valfri hamn" (mall-N016). Källistan byggs ur öns data och kan inte kompenseras i mallen.
- **Dalarö hamnar.** Orsak: "Dalarö turistbyrå & gästhamn (Askfatshamnen)" i databasen är samma hamn som öns egen post och tas bort som dubblett (utanDubbletter, runda 6), och "och sjömackar" faller när ingen sjömack listas. Brist 1 ord.

## Lista för punkt 2d (kompenseras i öns data; ö, sida, brist, förslag)
1. Svartlöga, bad, 59: ge "Sandstrand nordost om ångbåtsbryggan" och "Byhamnen" beskrivning och KÄLLA ur Länsstyrelsens sida om Svartlöga naturreservat (i dag bara namn), eller en badnot med reservatets regler vid stränderna om sidan har sådana.
2. Gräddö, bad, 55: fler bad på Rådmansö som beach-objekt ur Norrtälje kommuns badplatssidor (i dag bara Björköörens badplats, "nära").
3. Arholma, bad, 37: Arholmas egna bad ur Länsstyrelsens reservatssida eller Norrtälje kommun (i dag bara Sälviken 3,6 km bort).
4. Brännö, bad, 31: Ramsdal och Gröna Vik som beach-objekt med Göteborgs stads uppgifter (står i dag bara i ett kort).
5. Nåttarö, bad, 21: rätta kortet "Snorkling" efter Länsstyrelsen ("Invid ångbåtsbryggan finns en snorkelled … gula bojor, under ytan befinns skyltar"; inte "Länets första"), sedan kan mallen ta med "snork"; eller Storsand och Skarsand som beach-objekt.
6. Fjällbacka, bad, 16: Tanums kommuns badplatser i Fjällbacka som beach-objekt (i dag bara Rågösand 3,5 km bort).
7. Trysunda, bad, 8: Björnviken och Storviken som beach-objekt med Länsstyrelsen Västernorrlands text (i dag strängar utan beskrivning).
8. Lidö, bad, 7: badplatserna ur Länsstyrelsens sida om Lidö naturreservat (sidan saknar badplatslista).
9. Nämdö, bad, 6: badvikarna och sötvattensbadet vid Tjusvik som beach-objekt med källa.
10. Lysekil, bad, 1: Lysekils kommuns text om Gullmarsbaden som beach-objekt.
11. Gräddö, ösidan, 68: KÄLLA-citat utan klockslag för SL 631 och linje 31 (hållplatser, GÄLLER-raden) och belagda meningar i öns text, till exempel om Kajak & Uteliv och sjömacken, som i dag bara står i källistan.
12. Brännö, ösidan, 34: belagda uppgifter om Husvik, Rödsten och dansbryggan utan klockslag i öns text; guider om Brännö i GUIDE_ISLAND_MAP om sådana finns.
13. Trysunda, ösidan, 15: Länsstyrelsen Västernorrlands uppgifter som i dag bara står i källistan (stigslingorna, Kapellberget, namnet Trijzundsön) i öns text.
14. Gällnö, ösidan, 3: en belagd mening ur källistan (till exempel Länsstyrelsens uppgift om Norrviken) i öns text.
15. Dalarö, hamnar, 1: en belagd uppgift om service i Askfatshamnen (Haninge kommun) i öns hamnpost.
Batch 01 (punkt 2e): ingen sida under 95 % i ihop med öarnas poster som de låg 21:47 (Husarö hamnar och bad lyfts av öarnas kompensation, b2250a0).

## Batch 01:s nio öar (punkt 2e; lägsta andel per ö, ihop, ord nu/main)
Fjäderholmarna bad 228/221 (103 %) · Grinda hantverkare 319/316 (101 %) · Husarö bad 298/306 (97,4 %) · Möja hamnar 152/154 (98,7 %) · Sandhamn hantverkare 227/226 (100 %) · Storholmen hantverkare 91/87 (105 %; komma-dit 547/300, i runda 7 231/300) · Styrsö hantverkare 92/89 (103 %) · Utö restauranger 183/185 (98,9 %) · Vaxholm hantverkare 186/187 (99,5 %).
Bara mallarnas kopia (r8, utan öarnas poster): under 95 % Utö bad 385/471, Möja bad 261/293, Möja hantverkare 656/734, Husarö bad 258/306; öarnas poster lyfter alla fyra.

## Inte gjort, med skäl
- 15 sidor utanför batch 01 ligger kvar under 95 %: kompensationen kräver innehåll om just den ön (listan ovan). Öarnas data är inte ändrad.
- "snork" i badsidans urval: Nåttarös kort är fel (punkt 5 i listan).
- Platsernas description är inte med i mätdatabasen (instruktionens kolumner), se ovan.
- Länkar till /planera utanför /o (PublicFooter, Nav, PlaneraNyClient) är inte ändrade.

## Till Redaktören
1. SL- och båtrutorna lägger till mest där båda gäller: Storholmen komma-dit 300 → 466 (mallarna) och 547 (ihop), Väddö 306 → 464, Smådalarö 316 → 472. Godtar du det, eller ska båtrutan bara visas utan SL-ruta?
2. Birka: båtrutan säger att man enligt allemansrätten får ankra, medan öns eget kort säger att det är ankringsförbud i viken. Förbehållet "andra skyddade områden" står med. Ska Birka undantas?
3. Dalarö "Vrakdykning": kortet säger "med tillstånd via Dalarö Dykpark före varje dyk"; Haninge kommun skriver att dykarrangören söker tillstånd att förtöja vid bojen. Till Vakten om det ska skärpas.
4. Nåttarö "Länets första snorkelled" är FEL (Länsstyrelsen: "ett av länets första marina naturreservat"). Till Vaktens lista.
5. Den uppskjutna listan är omräknad med den riktiga databasen och kompensationen: tio sidor får strykningen nu, en (Landsort boende) skjuts upp.

## Kontroller (2026-11-17)
I /home/claude/svalla-mallar7: `npx tsc --noEmit -p .` 0 fel · `node scripts/verify-claims.mjs` exit 0 (2 kända i baslinjen) · `node scripts/generera-kallor.mjs --kontroll` aktuell, 101 öar, 1 639 källor · `node scripts/generera-uppskattningar.mjs --kontroll` grön · `npx vitest run src/lib` 76 filer, 782 test gröna · kontrollera_register.py (mallar): inga formfel, 277 rader. Nya citat sökta ordagrant i de sparade sidorna (18 av 18); sidorna sparade i kallcache/ny/ (8 nya filer med datum 2026-11-17: sl.se tre, naturvardsverket.se, haninge.se, lansstyrelsen.se Nåttarö, sverigesnationalparker.se två). Inga tankstreck i tillagd publicerad text.
Ihop (/home/claude/svalla-mallar8-ihop på ce275b2, patchen + applicera.mjs för de nio öarna, 267 poster, 0 fel; källistan genererad om, 1 751 källor): tsc 0 fel · verify-claims exit 0 · generera-kallor --kontroll grön · uppskattningar grön · vitest 76 filer, 782 test gröna. Kopian borttagen.

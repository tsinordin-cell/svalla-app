# Sidmallarna, batch 01 – omarbete 7 (2026-11-17)

Arbetskopia: /home/claude/svalla-mallar7 (worktree på origin/main ce275b2, inget committat). Rundorna 1–6 ur den gamla patchen ligger på nya main, med runda 7 ovanpå. Säkerhetskopian /home/claude/svalla-mallar5 är orörd.
Leverans: register/b01/ut/mallar-arbetskopia.patch (`git diff origin/main`, 45 filer; `git apply --check` mot en ren ce275b2 går igenom), register/b01/mallar.tsv (21 ändrade rader, 5 nya: mall-N015–N019).
MÄTT = renderat med tsx och react-dom/server för alla 101 öar och nio sidtyper (ösidan, bad, komma-dit, restauranger, boende, hamnar, med barn, hantverkare, aktiviteter) plus /aktivitet/kajak. main = ce275b2, r6 = main + den gamla patchen (före runda 7), r7 = arbetskopian, ihop = r7 + öarnas 263 poster. Platsdatabasen = låtsasdatabasen i mallar6/data/ (555 synliga platser, namn byggda ur sluggen). Mätfiler och skript: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/mallar7/matt/ och mallar7/skript/. RESONERAT = läst i koden. Läsdatum 2026-11-17.

## Steg 1: krockarna (21 ställen i 12 filer)
- Regel: mallarnas rättelse behölls och main:s stil från PR #540/#543 lades på. Titlar: `Aktiviteter på X, vad göra 2026`, `X 2026: <ämnen>`, `X, <tagline>` (komma, som main), `X med barn: bad, mat och resväg`, `Hur tar man sig till X? <färdsätt> 2026`. Intervall: "7 till 19 år", "30 april till 13 september; 14 september till 29 april", "Waxholmsbolagets biljett" (main:s ord). Fristående sats: "… på ön. Ta med matsäck …". Inskott: "Baserade i X, kör hit med båt". Kommentarer och KÄLLA-citat orörda.
- Filer: aktiviteter (1), bad (2), boende (1), hamnar (1), komma-dit (2), med-barn (4), ösidan (4), restauranger (1), HantverkarKort (1), kommaDitTitlar.ts och .test.ts (1+1). kallor.generated.ts (2) togs från main och genererades om.
- Samma stil i texten från rundorna 1–6 som inte krockade: badkompensationens data (Marstrand "100 till 1 000 meter", Klinta Bodar "1 juni till 31 augusti", Kyrkbacken "50 till 100 meter" och "1 maj till 30 september", Norreborg "15 juni till 15 augusti", Hjälvik "1 maj till 30 september") och kajakgraden ("Lätt till medel"). MÄTT: inga tankstreck kvar i publicerad text bland patchens tillagda rader (kvar finns bara regex och kommentarer). Main har ingen egen kontroll för tankstreck (sökt i scripts/ och src/lib/*.test.ts).

## Steg 2: rättelserna (en rad per beslut)
1. **mo01-k004** (mall-0083) · src/lib/islandFaqs.ts:111-130. Boende-FAQ:n delar posterna med aktivitetensLage. MÄTT: Vindö "På Svalla finns inget boende på själva Vindö. Nära ön finns Djurönäset.", Öckerö samma med Skärgårdshotellet Hönö; Dalarö och Vaxholm "Ja. … Nära ön finns också Smådalarö Gård / STF Bogesunds Vandrarhem". Lägesregeln skärpt i src/lib/badLage.ts:23-29,74-78: "söder om Mörkö kyrka" pekar inte bort, och "på <ön>" i första meningen går före "utanför <ort>" (Slussens Pensionat "på norra Orust, i Slussen utanför Henån").
2. **mo01-k021, k035, k049, k057** (mall-0127, 0128, 0123, 0122) · aktiviteter/page.tsx:18-24,47-49,84-91,118,155-170. Korten grupperas efter läge; titel och ItemList säger "på och nära X" när någon post gäller en annan plats; undertiteln räknar ön för sig ("5 aktiviteter och upplevelser på Utö och en till nära ön."). MÄTT: 8 öar ändras (Utö "på och nära", Dalarö, Norröra, Gräddö, Vindö, Tjörn, Kungshamn, Gullholmen "nära").
3. **mo01-k034, sl05-k004** (mall-0226) · med-barn/page.tsx:175-177. "Cykelleder finns" bara när cykel.notes nämner cykelled/-väg/-stråk/-bana. MÄTT: 1 ö (Birka) → 0.
4. **mo01-k036, k048, sl05-k007, k060** (mall-0215, 0231) · bad/page.tsx:328-348, med-barn/page.tsx:304-324. Båttexten bara på de 49 öarna i ISLAND_TRANSIT, och då leder knappen "Fråga Thorkel →" till /guide?fraga=Hur tar jag mig till X? med "Thorkel kräver ett gratis konto. Han hämtar de tre nästa resorna hit med kollektivtrafik från fastlandet." (route.ts:508,829). Övriga 52: "Välj krog, bad och brygga som stopp längs rutten." och /planera (PlaneraNyClient.tsx:9-12). MÄTT: "båttider" på badsidan 101 → 49, "båt, lunch" på med barn 101 → 49.
5. **mo01-k040, k055** (mall-0136, 0219) · mallRegler.ts:18-26 (`arButik`), restauranger/page.tsx:73-82, med-barn/page.tsx:105-106. Butiker (typ Handel, Livsmedelsbutik) räknas för sig. MÄTT: Ingmarsö "4 restauranger, krogar och kaféer och en butik …", med barn "4 krogar och kaféer"; likaså Runmarö, Svartsö, Kymmendö, Finnhamn, Gällnö.
6. **mo01-k042** (mall-0135) · restauranger/page.tsx:47-60. Utan ställen på ön (ödatan och databasen): "Vi har inga restauranger registrerade på X. Kolla säsong och öppettider innan du åker." MÄTT: sidor med löftet och "inga restauranger registrerade" main 18, r6 20 → 0.
7. **mo01-k046** (mall-N012) · klockslag.mjs:67-71,111-114; mallRegler.ts:61-66. Ett timintervall som ensamt fyller en parentes ("(05–21)", "(05 till 21)") är klockslag när det börjar kl. 5 eller senare och spänner minst två timmar; utanKlockslag stryker parentesen och låter ledet stå. Inte "(vecka 25 till 33)", "(17/8 till 11/10)", "(2 till 4)". MÄTT: Rörö "Vardagar 26 ordinarie turer Burö till Rörö, därtill kallelseturer nattetid"; källistan oförändrad (1 639 källor, 0 klockslag). Test: klockslag.test.ts, mallRegler.test.ts.
8. **Registret** (mall-0155, 0162, 0163, 0239, 0056, 0095, 0212, 0185) beskriver koden som den är, med fil:rad och citat ur koden eller källan: storholmensjokrog.se (Chromium, "Har du egen båt är du varmt välkommen att lägga till vid vår gästbrygga."), Naturvårdsverkets hundsida (alla fem citaten står kvar), tabell 10 (pdftotext: "ANMÄRKNING TUR", "ANMÄRKNING BRYGGA"), hantverkare-data.ts (13 av 13 egen-sajt; Jowa med Elsäkerhetsverket), LastBoatPanel.tsx:213. Alla KORREKT/BEHÅLL.
9. **Runda 6 "Inte gjort" och beslut C** (mall-N015, N016) · ny src/lib/klockslagStrykning.ts; mallRegler.ts:126-139 (`klockslagsregler`), 157-159 (`arOrt`); ösidan page.tsx:432 (restiden),924,946; boende/page.tsx:255,268; med-barn/page.tsx:70-72,249; komma-dit/page.tsx (alla fem anrop); islandFaqs.ts:74-77 (`stryk`). Korten med getting_there (tid och text), ösidans restid, FAQ-svaren och komma-dit-sidans turtäthet och parkering följer samma regel. `stryksKlockslag(slug, sida)`: batch 01 alltid; andra öar bara om sidan inte står i UPPSKJUTEN_STRYKNING. Listan är mätt (STRYK_ALLA och STRYK_INGA i matt7.tsx) med kommentar som hänvisar till Toms beslut 10. MÄTT: strykningen ändrar 94 sidor utanför batch 01; 41 stryks, 53 skjuts upp. Öar med klockslag i sidtexten main → r7: ösidan 75 → 23, komma-dit 24 → 10, boende 23 → 19, med barn 26 → 20 (kvar: uppskjutna sidor och fritext i datan).
   - "från Valfri hamn" m.fl. (N016): ösidan, boende och komma-dit-kortets "Från:" skriver from bara när arOrt. MÄTT: 16 öar → 0 på alla tre.
   - Styrsö med barn: snabbfaktan säger "Se fliken Bad" när listan är tom (runda 5). MÄTT: med barn-sidor med "Ingen badplats" main 59 → r7 0 (Styrsö inräknad).
   - /aktivitet/kajak (mall-N017, N018) · kajak/page.tsx:43-50,61-63. Priserna (två svar) och "Utö har störst utbud med ca 50 kajaker" strukna (ingen källa; ARBETSREGLER). Kompensation: KÄLLA Länsstyrelsen https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/uto.html — "I Gruvbyn, där båtarna från Årsta brygga lägger till finns bland annat gästhamn, affär, värdshus, kajak- och cykeluthyrning"; KÄLLA https://grinda.se/hamn-mack/sakerhet-service/ — "Hamnkontoret är beläget precis till höger när du kommer in till hamnen. Här får du information såsom väderleksrapporter, vad som finns på Grinda att göra samt uthyrning av kajaker"; KÄLLA https://finnhamn.se/aktiviteter/ — "Vi har 11 nybörjarkajaker som är enkla och stabila. Kajakerna finns nere vid Ragnars kiosk." (alla curl, läst 2026-11-17; sparade i kallcache/ny/). MÄTT: 786 ord på main → 787.
   - Vindriktningen (mall-0042, OBELAGD) · IslandWeather.tsx:33-37. Open-Meteo svarade 429 ("Daily API request limit exceeded") 2026-11-17; SMHI:s stationslista gick att hämta, men utan Open-Meteos värde finns ingen jämförelse. Nivå 1 belägger bara SMHI:s konvention, inte att Open-Meteos wind_direction_10m följer den. Riktningen är struken ur ösidans väderwidget (hämtas inte längre); vindhastigheten står kvar.
10. **kajakGrad** (Redaktörens tillägg; mall-N019) · mallRegler.ts:181-189. "–", "-" och "till" tolkas lika; spannet skrivs "Lätt till medel". Main ce275b2 skriver "lätt till medel" på Djurö, Aspö och Tjärö och fick förut ingen grad. MÄTT, alla öar: r7 11 öar med kajakdata: 3 "Lätt till medel", 4 "Lätt", 4 "Medel". Ihop: dessutom Vaxholm "lätt-medel" → "Lätt till medel (guidade turer)", Möja utan grad (difficulty saknas), Grinda och Finnhamn "Lätt". Kajaksidan ihop visar "Lätt till medel (guidade turer)", "Lätt till medel", "Lätt".

## Uppskjutna strykningar (Toms beslut 10; ö: sida, ord på main → med strykning)
53 sidor på 21 öar, i src/lib/klockslagStrykning.ts. "Utan strykning" = sidan som den nu visas. Två sidor ligger under 95 % fast avrundat 95,0 (Fjärdlång ösidan 0,9499, Pater Noster med barn 0,9498).
- Arholma: med-barn 360 → 338 (93,9 %; utan strykning 360)
- Askö: ösidan 1209 → 1125 (93,1 %; 1189); komma-dit 309 → 201 (65,0 %; 233); boende 220 → 189 (85,9 %; 221); med-barn 252 → 230 (91,3 %; 262)
- Asperö: komma-dit 228 → 213 (93,4 %; 247); boende 208 → 175 (84,1 %; 209); med-barn 367 → 329 (89,6 %; 363)
- Blå Jungfrun: ösidan 1897 → 1752 (92,4 %; 1867); komma-dit 319 → 271 (85,0 %; 333); boende 261 → 206 (78,9 %; 259); med-barn 408 → 354 (86,8 %; 416)
- Djurö: komma-dit 360 → 247 (68,6 %; 278); boende 235 → 205 (87,2 %; 236); med-barn 389 → 354 (91,0 %; 385)
- Eknö: ösidan 1058 → 997 (94,2 %; 1041); boende 168 → 147 (87,5 %; 169); med-barn 238 → 216 (90,8 %; 238)
- Fjärdlång: ösidan 1777 → 1688 (95,0 %; 1722); boende 281 → 265 (94,3 %; 282); med-barn 302 → 283 (93,7 %; 300)
- Gotska Sandön: ösidan 1741 → 1631 (93,7 %; 1681); boende 295 → 268 (90,8 %; 293)
- Huvudskär: komma-dit 308 → 209 (67,9 %; 231); boende 208 → 187 (89,9 %; 209)
- Kymmendö: boende 244 → 218 (89,3 %; 242); med-barn 299 → 275 (92,0 %; 299)
- Landsort: med-barn 365 → 338 (92,6 %; 365)
- Lidö: ösidan 1955 → 1816 (92,9 %; 1928); komma-dit 365 → 333 (91,2 %; 389); boende 297 → 242 (81,5 %; 298); med-barn 385 → 327 (84,9 %; 383)
- Lilla Karlsö: boende 208 → 192 (92,3 %; 206)
- Nåttarö: boende 248 → 235 (94,8 %; 249)
- Pater Noster: boende 235 → 210 (89,4 %; 236); med-barn 359 → 341 (95,0 %; 367)
- Resarö: komma-dit 387 → 347 (89,7 %; 403); boende 273 → 218 (79,9 %; 274); med-barn 386 → 328 (85,0 %; 384)
- Rödlöga: ösidan 2006 → 1875 (93,5 %; 2021); komma-dit 353 → 301 (85,3 %; 374); boende 307 → 232 (75,6 %; 305); med-barn 367 → 292 (79,6 %; 365)
- Svartlöga: ösidan 1855 → 1633 (88,0 %; 1809); komma-dit 397 → 333 (83,9 %; 421); boende 306 → 219 (71,6 %; 307); med-barn 410 → 332 (81,0 %; 420)
- Svartsö: boende 238 → 217 (91,2 %; 225)
- Tjärö: komma-dit 327 → 300 (91,7 %; 343); boende 313 → 271 (86,6 %; 314); med-barn 415 → 380 (91,6 %; 423)
- Vrångö: boende 255 → 230 (90,2 %; 256); med-barn 307 → 277 (90,2 %; 303)
Stryks (41 sidor, ≥ 95 %): bland andra Arholma ösidan/komma-dit/boende, Lilla Karlsö ösidan (1 204 mot 1 237 utan licenstexten, 97,3 %), komma-dit och med barn, Rörö komma-dit, Gotland komma-dit, Öckerö, Tynningö. Hela tabellen: mallar7/matt/uppskjutna.tsv.

## Kompensationslista för batch 01:s öar (till öarnas Skribent)
Ihop med öarnas 263 poster (det som publiceras), sidor under 95 % av main ce275b2 (ord nu/main, brist):
- Storholmen komma-dit 231/300, brist 54 (Waxholmsbolagets biljettips och "Ingen egen båt krävs" borta sedan runda 1–5; Storholmen har SL:s pendelbåt).
- Styrsö restauranger 284/340, brist 39 (Donsö- och Brännöställena står nu som "nära" med avstånd eller utanför Styrsös 2,0 km).
- Möja restauranger 133/164, brist 23 (fyra databasposter föll bort som dubbletter; bara låtsasnamn, se nedan).
- Husarö hamnar 117/141, brist 17 (Finnhamn och Söderlångholm utanför Husarös 1,5 km).
- Husarö bad 287/306, brist 4.
Bara mallarnas kopia (utan öarnas poster) ligger dessutom Utö bad (374/471), Möja bad (250/293), Möja hantverkare (656/734) och Fjäderholmarna hamnar (86/101) under; öarnas poster lyfter dem över 95 %.
Klockslag kvar i batch 01:s data (ihop, inte mallarnas strykning): Grinda hamnar "utom mellan kl. 22 och 05" (sjömacken).

## Fynd som bara gäller låtsasnamnen
Möja restauranger (Les Poissonniers, Hamncafét, Möja Bageri, Hamnbaren som dubbletter) och Fjäderholmarna hamnar ("Fjaderholmarnas Gasthamn") bygger på namn ur sluggen. Styrsös och Husarös platser i listorna har riktiga namn (Utvinnarens uttag) men läget kommer från exporten 2026-10-29.

## Lag 3 (MÄTT mot main ce275b2, 909 sidor; Lilla Karlsös licenstext räknas inte)
r6 (gamla patchen på nya main) 75 sidor under 95 %; r7 66 (batch 01: 7); ihop 64 (batch 01: 5). Fördelning r7: komma-dit 26, bad 14, hamnar 10, restauranger 7, ösidan 4, boende 4, hantverkare 1. Runda 7 lyfter 9 sidor över 95 % (uppskjutna strykningar på komma-dit och ösidan) och sänker en: Finnhamn boende 245 → 242 av 257 (94,2 %; "från Valfri hamn" borttaget, punkt 9). Kajaksidan 786 → 787. Ingen sektion blir tom.

## Inte gjort, med skäl
- Klockslag i fritext i öarnas data (tips, insiderTips, hamn- och krogtexter): ösidan 23 öar, med barn 20 (t.ex. Arholma "med avgång 09.30", Eknö "16.40", Ven "20.55", Finnhamn hamn "(08 till 18)"). Det är öarnas text, inte mallarnas kort; till Vaktens lista.
- Andra väderkomponenter utanför /o (MapCornerPills, FeedWeatherRow, WeatherPillServer) visar fortfarande vindriktning ur Open-Meteo.
- Kajak-FAQ:ns övriga obelagda meningar ("boka i förväg, uthyrningen tar slut tidigt", leder och km, "15 till 20 minuter") ligger utanför beslutet och står kvar.
- Högmarsö och Rosholmens sjömack (runda 6) är fortfarande ej avgjorda.

## Till Redaktören
1. Beslut C ordagrant: strykningen skjuts upp också där sidan redan utan strykning ligger under 95 % (Askö komma-dit 233/309, Djurö 278/360, Huvudskär 231/308; orsaken är Waxholmsbolagets tips från runda 1–5). Därför kommer avgångstider tillbaka på 10 komma-dit-sidor som runda 6 hade rensat. Ska regeln läsas så, eller ska de sidorna strykas ändå?
2. Finnhamn boende hamnar under 95 % (−3 ord) av att "från Valfri hamn" försvinner. Beslut C gäller klockslag, så det här är inte uppskjutet. Godtar du det?
3. Thorkel-knappen leder nu till /guide, som kräver inloggning. Sidan läser parametern ?fraga= (guide/page.tsx:156). Kontrollera att flödet för utloggade är rimligt.
4. Aktivitetssidans läge: Tjörn "Sill på Klädesholmen" och Dalarö "Vrakdykning" (vrak utanför Dalarö) står som "nära". Bekräfta.
5. Vindriktningen kan läggas tillbaka när någon jämfört Open-Meteo med SMHI:s observationer (Open-Meteo tillåter arbetsytan igen i morgon).

## Kontroller (2026-11-17)
I /home/claude/svalla-mallar7: `npx tsc --noEmit -p .` 0 fel · `node scripts/verify-claims.mjs` exit 0 (2 kända i baslinjen) · `node scripts/generera-kallor.mjs --kontroll` aktuell, 101 öar, 1 639 källor · `node scripts/generera-uppskattningar.mjs --kontroll` grön · `node scripts/hamta-obilder.mjs --stada --kontroll` grön · `npx vitest run src/lib` 76 filer, 782 test gröna (nytt: islandFaqs.test.ts; tillägg i klockslag-, mallRegler- och badLage-testerna) · eslint på de ändrade filerna: 2 fel som också finns på main (emoji i hamnar/page.tsx och page.tsx), inga nya · kontrollera_register.py (mallar): inga formfel, 272 rader, kontrollant tom.
Ihop (worktree /home/claude/svalla-mallar7-ihop på ce275b2, patchen + applicera.mjs för de nio öarnas edits.json): 263 poster, 0 fel, alla gick in. generera-kallor 1 747 källor, --kontroll grön; tsc 0 fel; vitest 76 filer, 782 test gröna; verify-claims exit 0; uppskattningar grön. Kopian borttagen.

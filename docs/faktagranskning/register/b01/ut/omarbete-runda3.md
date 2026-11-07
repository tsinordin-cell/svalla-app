# Omarbete runda 3 – batch 01 (2026-11-07)

Underlag: kontroll/hs-omk.* och kontroll/full-01.* med Redaktörens beslut (hs-omk.beslut.tsv, full-01.beslut.tsv) och kontroll/runda3-extra.beslut.tsv. En rad per ändrad registerrad. «nr» räknas från 0 i öns edits.json.
Alla källor i den här rundan lästa 2026-11-07: curl och pdftotext, SCB via API-anrop, Waxholmsbolagets två sidor och dykarbaren.se även i Chromium (las_sida.py). Texterna ligger i kallcache/ny/ med suffixet .2026-11-07. Ingen sajt blockerade och ingen källa var EJ NÅBAR (grinda.se/hamn-mack/sjomack återställde anslutningen en gång och svarade 200 vid andra försöket).
Kontroller (MÄTT): 82 par (URL, citat) med läsdatum 2026-11-07 i de ändrade registerraderna och 53 citat i de nya KÄLLA-raderna står ordagrant i dagens källtexter (skript work-omarbete-r3/skript/citatkoll.py och kallakoll.py; OCT-citatet kontrollerat separat). Fem par har äldre läsdatum och lästes inte om: lanthandeln (2026-10-29), h2.pdf och Strömmas julbordssida (2026-11-03).
Torrkörning (applicera.mjs --torr): styrso 31, grinda 17, fjaderholmarna 33, sandhamn 26, husaro 15 och moja 26 ersättningar ok, 0 fel. På en kopia lades alla nio öarnas edits.json in i följd (storholmen, fjaderholmarna, uto, grinda, vaxholm, sandhamn, moja, husaro, styrso): 0 fel, och island-data.ts, hantverkare-data.ts, transit-stops.ts, islandCoords.ts, guide-island-map.ts och kommaDitTitlar.ts har 0 syntaxfel (TypeScript-parser). Alla ändrade och nya «gammal» finns också exakt en gång i motsvarande fil på origin/main.
kontrollera_register.py: inga formfel i styrso, grinda, fjaderholmarna, sandhamn, husaro och moja. Kolumnen kontrollant är tom på alla ändrade rader. mallar.tsv och badkompensation.tsv är inte rörda.
Databasen (bara SELECT 2026-11-07): ingen sql-fil ändrad i den här rundan. Av 37 UPDATE i styrso.sql, grinda.sql, sandhamn.sql, fjaderholmarna.sql och husaro.sql träffar 33 WHERE exakt en rad. Fyra träffar 0 rader för att de redan är körda – databasen har deras nya text: grinda.sql nr 7–8 (bryggorna) och husaro.sql nr 1 och 5 (P0 13–14). Det stämmer med Vaktens lista.

## Styrsö (styrso.edits.json nr 0, 1 och 4, registret)
Nytt stycke i description[0]: «Styrsö är en bilfri ö i Göteborgs södra skärgård och utgör den södra delen av skärgårdens centralort, med 1 341 folkbokförda invånare enligt SCB (31 december 2020). Vid Bratten finns vårdcentral och folktandvård på Brattenvägen 13 och Göteborgs Stads äldreboende Södra Skärgården, fem minuters promenad från färjeläget. Styrsöskolan har förskoleklass till årskurs 9, och Södra Skärgårdens bibliotek finns på Brattenvägen 48. Det är förbjudet att köra bil här — de flesta tar sig fram med lastmoped eller golfbil.» Brattens Wärdshus är struken som källa för stycket. Nio KÄLLA-rader står ovanför stycket, en per URL. Det är fler än fem, som i grinda nr 5 (åtta), eftersom stycket har nio källor.
- styrso-0080 (hs-k038): ny text; SCB-citatet är nu ordagrant ur API-svaret ("key":["1480Q102","2020"],"values":["1341","1892","759"]); SCB och Göteborg & Co lästa igen.
- styrso-0081 (hs-k001): ny text; källa bara Göteborg & Co («den södra delen av skärgårdens centralort»); Brattens Wärdshus struken.
- styrso-0082: KORREKT, KÄLLA-rad ny: 1177 «Brattenvägen 13, 43084, Styrsö» och «Båt till Styrsö Bratten. Följ Brattenvägen cirka 150 m. På höger sida ligger vårdcentralen.»
- styrso-0083: KORREKT, KÄLLA-rad ny: 1177 «Folktandvården Styrsö Göteborg, Styrsö», «Brattenvägen 13, 430 84, Styrsö» (vid Bratten: samma adress som vårdcentralen, RESONERAT).
- styrso-0084: KORREKT, KÄLLA-rad ny: Göteborgs Stads sida om boendet (nivå 1): «… i den kulturminnesmärkta Kungsparken vid Brattens småbåtshamn på Styrsö», «… fem minuters promenad från färjeläget Styrsö Bratten …», «Boenden för äldre». Äldreboendet har alltså tillåten källa och står kvar.
- styrso-0085 (hs-k019): ny text; «en bit upp på ön» struket (bara krogens sida); källa «Styrsöskolan F-9».
- styrso-0086: KORREKT → INAKTUELL, RÄTTA: folkbiblioteket har flyttat från Styrsöskolan (tjänsteutlåtande 2023-05-25: «Styrsö folkbibliotek har sin nuvarande lokal i Styrsöskolan», «Den föreslagna lokalen på 118 kvm ligger i prästgården på Brattenvägen 48»); bibliotekets sida i dag: «Brattenvägen 48». Ny text: «Södra Skärgårdens bibliotek finns på Brattenvägen 48.»
- styrso-0087: KORREKT, KÄLLA-rad ny: kommunens mobilitets- och parkeringsutredning 2019-04-29 «Eftersom biltrafik inte är tillåten på ön måste parkering för bil anordnas på fastlandet» (nivå 1) och kommunens boendesida «en bilfri ö». Göteborg & Co är inte längre källa för bilförbudet.
- styrso-0088: läst igen (Göteborg & Co och kommunens boendesida); oförändrad i övrigt.
- styrso-N007 (ny): «vårdcentral och folktandvård på Brattenvägen 13» (1177 ×2).
- styrso-N008 (ny): «Göteborgs Stads äldreboende Södra Skärgården, fem minuters promenad från färjeläget» (goteborg.se).
- styrso-0010 (taglinen «Bilfri ö») och styrso-0023 (facts.character «Bilfri ö»): samma fynd som hs-k001 punkt 3. Registret hade redan kommunens utredning, men KÄLLA-raderna i koden hade bara Göteborg & Co. Därför har nr 0 och nr 4 fått en KÄLLA-rad för mobilitetsutredningen. Citaten är delade så att vart och ett står ordagrant, och läsdatumet är 2026-11-07. Texten är oförändrad.
- styrso-0011 (taglinen, invånarantalet): SCB-citatet är nu ordagrant ur API-svaret och tabellsidan, i registret och i KÄLLA-raden i nr 0, som Kontrollantens anmärkning i hs-k038. Texten är oförändrad.
- styrso-0020 (hs-k024, bara källa): mobilitetsutredningen struken som källa för restiden; källa nu Västtrafiks tabell 281–282 (281, 282, «Gäller 24 aug – 12 dec 2026»), läst igen 2026-11-07 (samma fil som 2026-11-03, md5). Ingen ändring i edits.json: KÄLLA-raden i nr 3 hade redan bara Västtrafik.

## Grinda (grinda.edits.json nr 6, 8, 12 och ny nr 16, registret)
- grinda-0195 (f01-k040): KORREKT → DELVIS, RÄTTA: «med bitvis ganska stort inslag av lövträd» som Länsstyrelsen («Inslaget av lövträd är bitvis ganska stort.»). Ny edits nr 16 (description[14] och dess KÄLLA-rad, som också fått «Naturen är typisk för mellanskärgården.»).
- grinda-0390 (f01-k059): KORREKT → DELVIS, RÄTTA: tips[5] «Natur- och kulturstigen är cirka 2,5 km och startar vid gården Hemviken.» (källan: «En cirka 2,5 km lång natur- och kulturstig …»). Edits nr 8.
- grinda-0391: läst igen («Stigen startar vid gården Hemviken.»).
- grinda-0078 (f01-k089): KORREKT → OBELAGD, STRYK+KOMPENSERA: «Vill du ha lugnare dagar» struket; Waxholmsbolagets sida (Chromium) säger bara att det går flera turer om dagen på sommaren och att Grinda har trafik året om. Edits nr 12.
- grinda-N002 (ny, kompensation): bestReason «… Båten går året om, och sjömacken vid gästhamnen har också öppet året om. I oktober ordnar wärdshuset höstevent.» Källa grinda.se/hamn-mack/sjomack/ «Vår sjömack har öppet året om», «i direkt anslutning till vår gästhamn». «gammal» i nr 12 börjar nu två rader tidigare (Waxholmsbolagets och sjömackens KÄLLA-rader), som båda är lästa igen.
- grinda-0079: läst igen i Chromium; meningen omformulerad («Båten går året om»).
- grinda-0080: meningen omformulerad («I oktober ordnar wärdshuset höstevent.»); uppgift och källa oförändrade.
- grinda-0023, grinda-0075, grinda-0081, grinda-0313, grinda-0524 (utanför-1, Sea Lodge): texterna i edits nr 6 och 12 säger redan «till slutet av augusti» (sedan 2026-10-29); felet Kontrollanten såg finns bara på den publicerade sidan. Den svenska sidan grinda.se/boende/sealodge/ säger samma sak («… från midsommar med start torsdagen till slutet av augusti.», «Under för- och sensommar perioden endast öppet för större grupper och bröllop.») och är nu källa i KÄLLA-raderna i nr 6 och 12, med den engelska sidan kvar i registret. Ingen källkonflikt.

## Fjäderholmarna (fjaderholmarna.edits.json nr 4 och 17, registret)
Waxholmsbolagets biljettsida läst i Chromium 2026-11-07: «Mellan dessa bryggor kan du året runt resa med Waxholmsbolaget på alla sorters SL-biljetter:» med «Fjäderholmarna» och «Strömkajen (här stannar även SL:s pendelbåtslinje 84)» i listan. Sidan säger det ordagrant, så uppgiften återinförs enligt beslutet.
- fjaderholmarna-N003: STRYK+KOMPENSERA → NY: «SL-biljett gäller året runt på Waxholmsbolagets båtar mellan Strömkajen och Fjäderholmarna.» åter i getting_there[2] (nr 17).
- fjaderholmarna-N014: NY → STRYK+KOMPENSERA: «Fjäderholmarna ingår i SL-området …» struken, eftersom den sa samma sak som N003 (uppgiften är sann; sidan läst igen).
- fjaderholmarna-0310 (FAQ /komma-dit) och fjaderholmarna-0328 (FAQ /med-barn): ny text med N003 i stället för N014; biljettsidans citat och läsdatum 2026-11-07.
- fjaderholmarna-N006 (description[2], samma uppgift med «året runt»): läst igen; biljettsidan har nu en egen KÄLLA-rad i nr 4 (tidigare delade den rad med h2.pdf).

## Sandhamn (sandhamn.edits.json ny nr 25, registret)
- sandhamn-N023 (ny, kompensation för Lag 3 på /o/sandhamn/restauranger): Dykarbarens desc i island-data får «Bord bokas bara inomhus, eftersom uteserveringen inte helt går att vädersäkra.» Källa www.dykarbaren.se «Vi erbjuder endast bordsbokning inomhus då vår uteservering inte helt går att vädersäkra.» (curl och Chromium; texten står på tre rader på sidan). KÄLLA-raden ovanför posten är läst igen.

## Husarö (bara registret)
- husaro-0078 (hs-k030): raden beskriver nu det som gjordes. P0 12 la in fältet bestallning för Husarö i transit-stops.ts, och den godkända texten visas i DepartureWidget och LastBoatPanel. Den ligger i produktion sedan #504 (2026-11-03), och texten är kontrollerad mot origin/main. Etikettförslaget utgår. Grundorsaken, att ResRobots anmärkningar inte visas, är fortfarande öppen. Källor: tabell 10 (b, B, C med fristerna), 12 och 13, lästa igen 2026-11-07 (samma filer som Kontrollantens, md5).

## Lag 3 (MÄTT: wc -w i POSIX-läge, som i runda 2, på baslinjesidan sidor/<sida>.txt med alla rundors ersättningar inlagda som textbyten; skript work-omarbete-r3/skript/lag3.py)
| sida | baslinje | före runda 3 | efter runda 3 | andel |
|---|---|---|---|---|
| /o/styrso | 2 661 | 2 938 | 2 962 | 111,3 % |
| /o/grinda | 3 200 | 3 311 | 3 314 | 103,6 % |
| /o/grinda/aktiviteter | 639 | 650 | 650 | 101,7 % |
| /o/grinda/boende | 452 | 483 | 483 | 106,9 % |
| /o/fjaderholmarna | 2 539 | 2 798 | 2 797 | 110,2 % |
| /o/fjaderholmarna/komma-dit | 661 | 763 | 761 | 115,1 % |
| /o/fjaderholmarna/med-barn | 602 | 701 | 699 | 116,1 % |
| /o/fjaderholmarna/boende | 301 | 348 | 347 | 115,3 % |
| /o/sandhamn | 3 510 | 3 715 | 3 726 | 106,2 % |
| /o/sandhamn/restauranger | 358 | 339 | 350 | 97,8 % |
| /o/moja/hantverkare | 757 | 683 (med mallarnas ändringar) | 795 | 105,0 % (RESONERAT: korten och mallens texter är inte renderade) |
| /o/moja | 3 305 | omkring 3 508 | omkring 3 516 | 106,4 % (RESONERAT: smakprovet byter Möja Snickarna mot OCT, +8 ord) |
Runda 2 räknade /o/sandhamn/restauranger till 336 (93,9 %). Med namnbytet och den nya beskrivningen för Sands Hotells restaurang blir siffran 339 (94,7 %), och med kompensationen 350.

## Möja: /o/moja/hantverkare (moja.edits.json ny nr 25, registret)
Mallarnas Skribent blev klar med runda 3 under rundan (commit 7c80f63, 2026-11-07 11:09). Därför är sidan mätt igen enligt beslutet. Arbetskopian /home/claude/svalla-mallar är bara läst; HantverkarKort.tsx och hantverkare/page.tsx är ändrade 2026-11-03 13:01 (utanDiakrit, registerraden moja 0478).
- MÄTT: tio rader «Baserade i …, Möja — kör hit med båt» försvinner ur baslinjen, 81 ord av 757, vilket ger 676 ord (89,3 %).
- RESONERAT ur mallens diff: metabeskrivningen, og:description och sidfoten ger +7 ord, vilket ger 683 ord (90,2 %). Det är under 95 % (720 ord).
- moja-N015 (ny, kompensation): OCT-Entreprenad Trä & Betong AB (bas Värmdö) läggs till i Möjas lista i hantverkare-data.ts (oar + 'moja'), med KÄLLA-rad. Företagets egen sida oct-entreprenad.com/byggfirma-varmdo/ (curl 2026-11-07): «… oavsett om du bor i Nacka, Gustavsberg, Ingarö, Djurö, Storö eller Möja.» Kortet hamnar i fyra behovsgrupper (Huset, Bryggan och sjösidan, Tomten, Få hit folk och material) med 28 ord vardera. Sidan blir omkring 795 ord (105,0 %, RESONERAT). Kortets övriga uppgifter är granskade i Grindas register. hantverkare-data.ts är densamma i svalla-app och svalla-mallar, och «gammal» finns en gång också på origin/main.
- OBS för Redaktören: OCT står först i datafilen. Det visas därför först i varje grupp och i smakprovet (de tre första korten) på /o/moja, före företagen som har sin bas på Möja. Vill Redaktören inte det kan nr 25 tas bort utan att något annat påverkas; sidan ligger då kvar på 90,2 %.

## För Redaktören och Vakten (inga registerrader ändrade)
- Samma otillåtna källa som i hs-k001 (en krogs webbplats om annat än krogen själv) är enda källa för Styrsös historia i nio rader som står som KORREKT: styrso: 0043, 0044, 0045, 0046, 0048, 0049 (did_you_know), 0105, 0114, 0117 (description[3]–[5]). Inte åtgärdat, eftersom inget beslut finns.
- Sea Lodge «till mitten av augusti» står kvar i src/app/guider/[slug]/guide-content.ts:12998–12999 (glampingguiden, KÄLLA läst 2026-09-27); sidan säger nu «till slutet av augusti».

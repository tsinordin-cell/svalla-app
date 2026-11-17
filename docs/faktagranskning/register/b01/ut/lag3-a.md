# Lag 3, andra omgången, del A (2026-11-17)
Underlag: main 6c4407d + mallar-arbetskopia.patch + de tio filerna + lag3-a.edits.json (27 poster). Register: lag3-a.tsv (38 rader: 17 rättelser, 21 nya). Mätt med mallar10/skript/lag3_10.py (main mot kopian, upplysningstexten bortdragen). Källorna sparade i scratchpad/b01/lag3a/kallor/.

## Komma dit (ord: main, före, efter) och vad som lagts till
- Storskär 225, 143, 215 (95,6 %): Svartlögafjärden, Österåkers kommun, reservatets omfattning och storlek, privat mark, tältning, eld, hund, informationstavla (Länsstyrelsen, Chromium).
- Furusund 254, 172, 247 (97,2 %): hållplatserna och restiden ur h632, buss 676 (h676676x), Furusundsleden och färjeappen (Trafikverket).
- Djurö 360, 247, 344 (95,6 %): nattbussen, vändslingan, hållplatserna efter Byns gård (h433, h434), Vita grindarna (Värmdö kommun), inga färjor (Djurönäset, tillskrivet).
- Dalarö 262, 180, 272 (103,8 %): vägen från väg 73 och Sandemars parkering (Länsstyrelsen), hållplatserna efter Sandemar, nattbussen, 869:s turer (h839, h869).
- Norrpada 219, 154, 215 (98,2 %): ögruppen (Skärgårdsstiftelsen, tillskrivet), naturhamnar, torrdass, föreskrifter (Länsstyrelsen).
- Singö 278, 196, 275 (98,9 %): hållplatserna i Grisslehamn, på Fogdö och Singö, restid från Grisslehamn (h637), buss 676.
- Gräddö 287, 205, 289 (100,7 %): slingan och hållplatserna vid Gräddö och Räfsnäs (h631), Björköörens parkering (Norrtälje kommun).
- Ingarö 297, 213, 298 (100,3 %); med barn 391, 353, 438: hållplatser och restider för 428X, 429X, 430X (höstens tabeller), hållplatsen vid Björnö (Skärgårdsstiftelsen).
- Mörkö 291, 209, 278 (95,5 %): färjeappen (Trafikverket), hållplatser, turer, nattbuss (h727), parkering enligt Skansholmen.
- Gålö 292, 210, 279 (95,5 %): hållplatserna, slingan och turerna (h845), Stegsholms parkering (Länsstyrelsen).
- Muskö 299, 217, 301 (100,7 %): hållplatser, restid, turer och nattbuss (h849), parkering vid Mickrums brygga (krogen).
- Torö 314, 232, 315 (100,3 %): vägen över Oxnö och Svärdsö, Örens 60 p-platser (Nynäshamns kommun), vägen till reservatet (Länsstyrelsen), hållplatser (h852).
- Huvudskär 308, 228, 351; med barn 286, 234, 357: taxibåt från Morarna (Länsstyrelsen, tillskrivet; Morarna i h845), omfattning, fyren, torrdass, föreskrifter, fladen (Skärgårdsstiftelsen), torsdagsturen (operatören).
- Vindö 334, 252, 353 (105,7 %): Sollenkroka brygga (Värmdö kommun), hållplatserna på 434 (h434).
- Yttre Gården 361, 275, 348 (96,4 %): gästhamnens läge och service, parkering vid Fiskehamnen (Nynäshamns kommun), var båtfolk lägger till (Naturvårdsverkets objektblad).
- Adelsö 314, 240, 348 (110,8 %): vinkområde, ringlinje, motsolsvarv, färjan (h312); Strömmas bryggor, parkering, promenad och tabellen för 2027.
- Långskär 215, 178, 219 (101,9 %): läge, omfattning, markägare, föreskrifter (Länsstyrelsen).
- Smådalarö 316, 263, 303 (95,9 %): hållplatserna efter Hotellbryggan och restiden (h839), hotellet om grinden (tillskrivet).
- Väddö 306, 274, 297 (97,1 %): hållplatserna i tabellens ordning, restider, nattbussen (h637).
- Blå Jungfrun 319, 290, 333; med barn 408, 377, 420: tre angöringsplatser och landstigning på klipporna (Sveriges nationalparker, Chromium).

## Rättelser
- Birka (lag3a-0015 till 0017): description, season och travel_time som Strömmas sida (ca 2 timmar), tabellen för 2027 (5 maj till 24 oktober; Hovgården till Birka 30 min, tillbaka 15) och Birkas sida (ingen ordinarie båttrafik november till april). Season hade samma fel som description.
- Adelsö (0010 till 0012): tipset «ca 7 minuters promenad» ersatt med Strömmas minst 15 minuter från parkeringen vid hembygdsgården; KÄLLA-raderna med «7 minuter» och med ett belopp i citatet bytta. Busskortets «senaste tidtabell gällde till 18 juni» ersatt: h312 gäller 17 augusti till 12 december 2026.
- Dalarö (0001, 0002): description och tips säger nu som Haninge kommun: dykarrangören söker inför varje dyktillfälle tillstånd att förtöja vid bojen.
- Fel jag hittade på mina öar och rättade: Furusund 45 till 50 → 43 till 52 min (0003, 0004); Singö 65 till 75 → 65 till 77 min och Ellans vändplan 77 till 90 (0005, 0006); Väddö ordning och 33 till 43 min till Älmsta (0007); Torö nio turer och en på helgfria fredagar (h852, 0008); Mörkö 36 till 43 min (h727, 0009). Huvudskär «avgång 11.30» och Djurös klockslag strukna (0013, 0014, PRECISERA); KÄLLA-rader med klockslag i citaten bytta (Djurö, Vindö, Torö, Mörkö, Muskö).

## Till Redaktören
1. Möjlig P0, inte avgjord: SL:s höstabell h839.pdf (gäller 17 augusti till 12 december 2026) börjar vid Rudsjöterrassen och har inte Handens station i hållplatslistan; v839.pdf för samma period har Handens station, och tiderna är desamma. Dalarö, Smådalarö och Gålö skriver «Pendeltåg till Handens station, sedan SL-buss 839». Jag har inte ändrat det. Behöver läsas i SL:s reseplanerare.
2. Flera öar citerar v-tabellerna (14 december 2025 till 18 juni och 17 augusti till 12 december 2026), men det finns nyare h-tabeller för hösten med andra tider eller turer (h727, h845, h849, h852, h869, h839). Jag har bytt där jag skrev; andra öar kan ha samma sak.
3. Blå Jungfruns Oskarshamnskort har kvar klockslag (avgång och hemkomst) från tidigare; jag lade bara till text efter dem.
4. Facebook och Instagram användes inte.

## Kontroller (kopia /home/claude/svalla-lag3a, borttagen efteråt)
- Patchen: 3way, kallor.generated.ts genererad om; de tio filerna och lag3-a.edits.json med applicera.mjs: 0 fel (27 ersättningar ok).
- Lag 3: alla 23 sidor ≥ 95 % (lägst Mörkö och Gålö 95,5 %). Hela listan: 36 → 13 sidor under 95 %, alla 13 hör till del B eller andra lag. Mot kopian utan mina poster sjunker bara Birka komma dit 521 → 516 och med barn 640 → 635 (114 % och 121 % av main).
- generera-kallor 1 935 källor, --kontroll exit 0 · generera-uppskattningar --kontroll exit 0 · npx tsc --noEmit -p . 0 fel · verify-claims exit 0 (2 kända i baslinjen) · vitest src/lib 78 filer, 795 test gröna.
- Citat: 390 citat i nya KÄLLA-rader, alla ordagrant i de sparade källorna (skript lag3a/skript/citat.py; Naturvårdsverkets objektblad mot pdftotext utan -layout, sidan har två spalter). kontrollera_register.py: inga formfel.
- Inga tankstreck och inga klockslag i ny publicerad text (sökt i posterna).

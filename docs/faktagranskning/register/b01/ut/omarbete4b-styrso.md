# Omarbete runda 4b – Styrsö (Granskaren och Skribenten, 2026-11-10)

Källorna är lästa 2026-11-10 med curl (--http1.1), Chromium (las_sida.py) och pdftotext. Ingen sida visade en verifieringssida, och Styrsöbolagets tidtabell-PDF behövdes inte. Ingen P0. Inget är committat och inget är kört mot databasen.
Arbetsfiler, sidkopior, mätningar och skript finns i /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4b-styrso/ (säkerhetskopior i fore/, texterna också i kallcache/ny/*.2026-11-10.*). BP betyder Göteborgs Stads bevarandeprogram, del II (nivå 1). Posterna numreras från 0, som i runda 4.

## Ändrade registerrader (7 ändrade, inga nya. I edits.json är nr 2, 5, 31 och 32 ändrade, 37 poster. styrso.sql är oförändrad.)
- styrso-0438 (st4001): domen är fortfarande FEL, åtgärden ändrad från BEHÅLL till RÄTTA. facts.season ändras från 'Året runt' till 'Juni–augusti; båtar och Kusthotellet året runt' (nr 5). Det är samma säsong som seasonal.best och kalendern, och värdet stämmer både under "Säsong" (ösidan, /jamfor, /ta-dig-till, /aktivitet) och under "Bäst säsong" (/med-barn). Källor: guesthouse-styrso.se, Västtrafiks tabell för 281 (gäller 13 dec 2026–6 jun 2027), Göteborg & Co och kusthotelletstyrso.se.
- styrso-0027 (utanför listan, samma fält på ösidan): KORREKT. Åtgärden ändrad från BEHÅLL till PRECISERA, med samma värde och samma källor.
- styrso-0062 (st4091): domen ändrad från KORREKT till FEL och åtgärden från BEHÅLL till RÄTTA. Oktober går från open till limited. months[9] var redan 'limited' i nr 16 (runda 4), men raden stod som BEHÅLL och därför fick Kontrollanten det gamla påståendet. De fem källorna är lästa igen.
- styrso-0099 (st4019): sista meningen i description[1] (nr 31) lyder nu "Bratten, med sina relativt stora och påkostade sommarvillor, var enligt Göteborgs Stad södra skärgårdens viktigaste badort och mest fashionabla sommargästområde." Formuleringen följer BP ordagrant.
- styrso-0105 (st4081) och styrso-0104 (utanför listan. Den raden gäller påståendet "nordvästra", och domen ändras från KORREKT till FEL, åtgärden till RÄTTA): "öns nordvästra sida" blir "öns norra sida" (nr 32). Källa BP: "Tången ligger på öns norra sida." Båtebackens KÄLLA-rad ovanför (main rad 6631) ingår nu i nr 32. Den är läst i dag och citerar inte längre "på Nordvästra Styrsö".
- styrso-N022 (st4039): källor för "nära bryggan Styrsö Skäret" är tillagda i registret och i nr 2: kusthotelletstyrso.se/hitta-till-oss/ ("Kusthotellet ligger på nära gångavstånd från hållplatsen Styrsö Skäret.") och Göteborg & Co ("Skärgårdsbåten anlöper vid tre olika bryggor: …"). Texten är oförändrad.

## Inte rörda
- Radien (styrso-0318) är inte ändrad, enligt Redaktörens beslut "Ingen åtgärd".

## Kontroller (MÄTT)
- Torrkörning mot main-kopian (1be6e12): 37 ersättningar ok, 0 fel. Varje "gammal" står exakt en gång i orörd main, och main-kopian är oförändrad (git status är tom).
- TypeScript-parsern efter inläggning på en kopia: 0 syntaxfel i island-data.ts, islandCoords.ts och guide-island-map.ts.
- Citat (skript/citatkoll.py): 12 KÄLLA-rader i edits.json och 7 registerrader har läsdatum 2026-11-10. Tillsammans har de 57 citat, och alla står ordagrant i dagens sparade text. Det finns inga klockslag och bara en URL per KÄLLA-rad. Varje ändrad sträng har en KÄLLA-rad från i dag inom fem rader ovanför.
- Registret: 534 rader, alla med 15 kolumner. kontrollera_register.py hittar inga formfel.
- Lag 3 (faktaregister.mjs --mat styrso): main har 710 ord, 97 enheter och 78 med källa. Efter runda 4 var det 1 094/120/109 och nu är det 1 106/121/110. Strängarna: season går från 2 till 6 ord, description[1] från 90 till 98 och description[3] är oförändrad på 58.
- Källistan (generatorn körd på kopian): Styrsö får 40 källor. Ingen har klockslag och ingen citerar "Nordvästra".

## För Redaktören
- RESONERAT utifrån sasong-data.ts: /sasong/sommar tar nu med Styrsö, eftersom nyckelordet "juni" finns i värdet. På vår-, höst- och vintersidorna står Styrsö kvar som tidigare ("året runt").
- tangbaren.se skriver "Vi välkomnar bokningar året runt" (det stod där också 2026-11-09), medan Västsverige anger "Stängt för säsongen". Oktober står kvar som limited, men kommentaren ovanför months i nr 16 bygger bara på Västsverige.
- I styrso-0123 står fortfarande den gamla description[5] i kolumnen ny text. Koden (nr 2) är rätt. Raden är inte ändrad.
- Omprövas i slutomkontrollen: 0438 och 0027 (nytt värde), 0062, 0099, 0104, 0105 och N022.

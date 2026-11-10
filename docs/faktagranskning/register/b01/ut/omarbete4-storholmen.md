# Omarbete runda 4 – Storholmen (Granskaren och Skribenten, 2026-11-10)

Filer: register/b01/storholmen.tsv (14 rader ändrade, inga nya; 225 rader, alla med 15 kolumner), ut/storholmen.edits.json
(14 poster: nr 13 ny, nr 3, 4, 10 och 11 ändrade), ut/storholmen.sql (tom; ingen ändring i databasen).
Arbetsfiler, sidkopior och skript: scratchpad/b01/omk4-storholmen/. Nya källtexter också i kallcache/ny/ (*2026-11-10*).
Ingen P0. Källor lästa 2026-11-10: storholmensjokrog.se (Chromium; sidans titel med curl), lidingo.se/…/lidingo-skargard/ och
lidingo.se/…/batpendla/ (curl), SL:s tabell 80 (kund.printhuset-sthlm.se/sl/h80.pdf, pdftotext -layout, "Giltig 17 augusti–12 december 2026").

## Ändrade registerrader (dom → åtgärd: ändring; källa; post i edits.json)
- 0113 KORREKT → INAKTUELL, RÄTTA (f10-k070): open_season «2026: helger till och med oktober, …» → «28 november–19 december 2026:
  julbord lördagar, jultallrik söndag 29 november» (visas «Öppet 28 november–19 december 2026: …»). Krogens sida: «Tack för en fantastisk
  säsong! Vi tar nu en liten paus och öppnar igen den 28 november med julbord varje lördag fram till jul.», «Lördagar 28 nov, 5 dec,
  12 dec och 19 dec», «29 Söndag – Jultallrik». Öppettiderna har klockslag och skrivs inte. Nr 13.
- 0038 DELVIS → INAKTUELL, RÄTTA (utanför listan, samma uppgift som 0113 i facts.season): «sjökrogens säsong 2026: helger till och med
  31 oktober och julbord …» → «sjökrogen har julbord lördagar 28 november–19 december 2026 och jultallrik söndag 29 november». Krogens sida. Nr 3.
- 0039 DELVIS, PRECISERA (utanför listan, samma sträng): ny text med året; citaten står kvar på sidan. Krogens sida. Nr 3.
- 0040 DELVIS, PRECISERA (utanför listan): citaten «Oktober» och «31 Lördag» finns inte längre på sidan; nya citat ur batpendla och krogens sida. Nr 3.
- 0042 KORREKT, BEHÅLL (f10-k082): KÄLLA-rad ny. Krogens KÄLLA-rad i nr 3 har sidans titel «Storholmen Sjökrog | Skärgårdsrestaurang
  utanför Lidingö» och «Boka bord» i stället för de citat som försvunnit. Nr 3.
- 0096 KORREKT, BEHÅLL (f10-k079): KÄLLA-rad ny: «Skärgårdsrestaurang utanför Lidingö» (titeln), «Vår meny», «Boka bord». Nr 4.
- 0101 KORREKT, BEHÅLL (utanför listan, samma försvunna citat som 0096): KÄLLA-rad ny: titeln och «Hyr hela restaurangen». Nr 13.
- 0114 KORREKT, BEHÅLL (utanför listan, samma sträng som 0113): läst igen, står kvar i den nya open_season. Nr 13.
- 0163 KORREKT, PRECISERA (f08-k107): KÄLLA-rad ny. Citatet står på lidingo.se 2026-11-10. Klockslagen i källistans lidingo.se-post kommer
  från island-data.ts:5864, där två URL:er stod på samma KÄLLA-rad; nr 0 ersätter den med en rad per URL utan klockslag.
- 0178–0181 KORREKT, PRECISERA (full-08 utanför-3, källistans SL-post): raderna fanns redan för samma klockslag; omkontrollerade. Klockslagen
  kommer från island-data.ts:5879, som nr 3 ersätter. h80.pdf läst igen: samma rubrik och giltighet.
- 0014 FEL, RÄTTA (Toms beslut 3): ny text «radiusKm: 1.5, platsRadieKm: 0.8», se nr 10 nedan. Källan (OSM) är oförändrad.

## Ändrade och nya poster i edits.json
- Nr 3: facts.season (rad 0038–0040) och krogens KÄLLA-rad, läst 2026-11-10.
- Nr 4: KÄLLA-raden ovanför activities[1] (Restaurang), läst 2026-11-10. Texten är oförändrad.
- Nr 10: radiusKm 0.8 → 1.5 och platsRadieKm: 0.8 (Toms beslut 3, 2026-11-08). En kommentarsrad säger att radiusKm styr GPS-taggningen
  och att platsRadieKm är uppmätt: gränsrutans hörn ligger högst 0,75 km från punkten (haversine, beräknat 2026-11-10). Nålrättelsen och
  dess KÄLLA-rader står kvar. Fältet läggs till i IslandCoord av mallarnas runda 5.
- Nr 11 (Vaktens lista, gjord): 'storholmen' tas bort ur ISLAND_NO_TRANSIT ("Hit går ingen kollektivtrafik"). KÄLLA är nu SL:s tabell 80:
  «Ropsten–Storholmen», «Pendelbåt», «Storholmen södra», «Storholmen östra», «Storholmen norra», «Giltig 17 augusti–12 december 2026»
  (läst 2026-11-10). Utan posten visar avgångsrutan ingenting (unknown_destination), och «Ta sig dit» beskriver pendelbåten. Att lägga in
  ön i ISLAND_TRANSIT kräver hållplats-ID från ResRobot och är inte gjort.
- Nr 13 (ny): krogposten (restaurants[0]). open_season enligt rad 0113 och två nya KÄLLA-rader (läst 2026-11-10) i stället för raderna
  från 2026-09-26/27. Beskrivningen är oförändrad. Lagd sist i filen så att numren 0–12 står kvar.
- De 13 tidigare posterna: «gammal» står exakt en gång i main-kopian f7eee24, så ingen behövde rättas. Vaktens lista nämner ingen
  Storholmenpost som redan finns i main, så ingen post är borttagen.

## Källistans klockslag (rad 4984 och 4998 i main-kopians kallor.generated.ts)
- 4984 (lidingo.se, lidingo-skargard) genereras ur KÄLLA-raden vid tagline (island-data.ts:5864). 4998 (SL, h80.pdf) genereras ur KÄLLA-raden
  vid facts (island-data.ts:5879). Båda raderna ersätts helt av nr 0 och nr 3, med en URL per KÄLLA-rad och utan klockslag.
- MÄTT 2026-11-10: generera-kallor.mjs på en kopia av main f7eee24 med öns edits ger 9 källor för Storholmen och 0 klockslag i «vad».
  kallor.generated.ts är inte ändrad.

## Rader som inte rörts, med skäl
- 0154 (f02-k063): generatorn (Vakten) räknar trafikbolagen som myndighet. Mäts om efter inläggningen.
- 0103 (f10-k084, ANM): Redaktörens beslut: krogens startår är verksamheten om sig själv. «SEDAN 2018» står kvar på sidan 2026-11-10.
- 0169 (f24-k015): ingen ny åtgärd. Klockslagen kom från samma KÄLLA-rad som 0163 och tas bort av nr 0.
- f10 utanför-1: Vaktens lista (generatorn). Öns egna KÄLLA-rader saknar redan klockslag (MÄTT ovan).
- 0014 (full-23 och full-24 utanför-1, full-28 utanför-2): ingen ny åtgärd. Nålen rättas redan i nr 10.

## Ska omprövas eller läsas om före slutomkontrollen
- 0113, 0114 och 0038–0040: krogens säsongskalender (julbord 28 november–19 december 2026) läggs till i listan över säsongskalendrar
  som läses om (förtydligande 15).
- 0042, 0096 och 0101: titeln «Skärgårdsrestaurang utanför Lidingö» står i sidans <title> (curl), inte i den synliga texten. «Vår meny»,
  «Boka bord» och «Hyr hela restaurangen» står i den synliga texten (Chromium).

## För Redaktören (inget ändrat)
- Krogens sida skriver «Kommer du med Waxholmsbåt? Välj gärna Östra Storholmens brygga …». Turerna finns i SL:s tabell 80. Tips 1 i nr 7
  säger att turerna finns hos SL och inte i Waxholmsbolagets tidtabeller, vilket fortfarande stämmer.

## Torrkörning och kontroller
- node applicera.mjs main-kopia ut/storholmen.edits.json --torr (main-kopia f7eee24): 14 ersättningar ok, 0 fel.
- Efter inläggning i en kopia: island-data.ts, islandCoords.ts, transit-stops.ts och kommaDitTitlar.ts utan syntaxfel (repots typescript).
- Citat (skript/kolla_citat.py): 33 citat i KÄLLA-rader lästa 2026-11-10 och 29 citat i 13 registerrader lästa 2026-11-10 står ordagrant
  i de sparade källtexterna. Inga klockslag, en URL per KÄLLA-rad, och alla registerrader har 15 kolumner.
- Lag 3 (faktaregister.mjs --mat storholmen): main f7eee24 566 ord, 53 enheter, 48 med källa. Med öns edits 654 ord, 56 enheter och 52
  med källa: OK. De ändrade strängarna (season och open_season) har 33 ord mot 36 före.

## Fjäderholmarna: GPS-radien (Toms beslut 3)
- ut/fjaderholmarna.edits.json nr 31: radiusKm 0.7 → 1.5 och platsRadieKm: 0.7. Kommentaren säger att radiusKm styr GPS-taggningen och står
  kvar enligt beslutet, och att platsRadieKm är uppmätt 2026-10-29 (gränsrutan ryms inom 0,64 km från mittpunkten).
- Registerrad fjaderholmarna-0017: rätt uppgift och ny text säger samma sak («radiusKm: 1.5 (oförändrad, Toms beslut 3), platsRadieKm: 0.7»).
  Dom FEL och åtgärd RÄTTA står kvar. Inget annat i Fjäderholmarnas filer är ändrat.
- Torrkörning mot f7eee24: 40 ersättningar ok, 0 fel. islandCoords.ts utan syntaxfel efter nr 30–31.

# Fas 3, batch 00, del A: hållplatsdata, Sista båten och Avgångar (läst 2026-11-28)

Omfång: src/lib/transit-stops.ts (49 poster i ISLAND_TRANSIT, 14 i ISLAND_NO_TRANSIT, 7 ursprung, reseplanerarlänkar), LastBoatPanel.tsx, DepartureWidget.tsx, src/app/api/transit/*. Main 5e0a08d, orörd.
Register: f3-00/a.tsv, 279 rader. Domar: KORREKT 166, EJ NÅBAR 56, OBELAGD 38, FEL 14, DELVIS 5. Åtgärder: BEHÅLL 164, MÄT 66, PRÖVA 21, RÄTTA 19, STRYK+KOMPENSERA 7, PRECISERA 2.

## Tabellbytet
Alla Waxholmsbolagets och SL:s tabeller som rutorna bygger på gäller till 12 december 2026 (tabell 28: avsnittet 1 oktober till 12 december), Västtrafiks 281 och 283 likaså. Vintertabellerna låg inte på printhuset när jag läste (wa/v16.pdf gav samma höstfil). Alla bestallning-, tidsObs- och note-värden ska läsas om mot tabellerna från 13 december. Dokumenten är "Uppdaterad" senast 8 sept 2026, alltså samma filer som Redaktörens mätningar 2026-11-17 och 2026-11-19.

## Fel (P0 i a-p0.md, alla rättade i a.edits.json)
- Gällnö och Norra Svartsö: noten sa "Båt från Stavsnäs vinterhamn". Ingen av deras tabeller (11, 14 respektive 10, 12, 13) har Stavsnäs.
- Arholma: buss 631 går inte till Simpnäs; det gör 636. "Yttersta ön" struken.
- Furusund: buss 626 går Danderyds sjukhus–Ljusterö. "Knutpunkten" struken.
- Resarö: buss 689 går på Tynningö; "Bilbro från Vaxholm" obelagd. Noten säger nu linje 5 till Ytterby.
- Resarö (Ytterby) och Eknö saknade tidsObs fast bryggorna är X på de flesta turer. tidsObs tillagd för båda.
- Sista båten: "går sista båten utan beställning tidigare" är fel där alla turer har anmärkning (Rödlöga 2 nov till 12 dec). Nu: "tidigare den dagen, eller inte alls".
- Avgångsrutan sa "Hit går ingen kollektivtrafik … nås med egen båt eller taxibåt" för alla öar i ISLAND_NO_TRANSIT. Fel för Hasselö (tabell 16), Gålö (SL 845), Birka (Strömma under säsongen), Mörkö (bro och vägfärja) och Lilla Karlsö (båt under säsongen och regler för landstigning). Nu visar rutan "Båttider till X visas inte här" och "Båttider hit finns inte hos Trafiklab. Se ösidan…" när skälet är "kunde inte knytas", och listans tillägg när det finns. Den gamla texten står kvar bara för öar utan hållplats inom 5 km och utan tillägg.
- Lilla Karlsö: skälet sa "bara med Naturskyddsföreningens turbåt". Nytt tillägg med Länsstyrelsens regler och Gotland Sea Guides (testet i ingen-trafik.test.ts uppdaterat).
- Mörkö: tillägg om bron och Skanssundsleden.

## Rättat utan P0
- Fjäderholmarna: superlativen "Närmaste skärgårdsön" (bara Strömma som källa) struken. Efter 19 november lägger färre turer till (anmärkning u), men tur 1306 och andra utan u finns kvar.
- Möja: noten nämner nu också Åsättra brygga (tabell 10).
- Eknö: "via Sandhamn" var fel ordning; båten angör Eknö före Sandhamn.
- Norröra: "Saltkråkan-ön" obelagd och struken. Rödlöga: "Yttersta ytterskärgården" och "direktbåt" strukna (28A angör flera bryggor).
- Aspö: "Skärgårdsbåt" var Trafikverkets vägfärja Aspöleden; världsarvsuppgiften saknade nivå 1-källa och är struken.
- Västtrafiks KÄLLA-citat: "Du hittat" står "Du hittar" på sidan.

## Kunde inte avgöra
- Alla hållplats-id och de flesta hållplatsnamn (56 EJ NÅBAR, åtgärd MÄT): ResRobot kräver nyckel, och jag läser inga hemligheter. Redaktören mäter med /api/transit/stop-lookup.
- Yxlan: "Yxlan Vagnsunda brygga" står inte i någon av Waxholmsbolagets tabeller 25, 28, 30, 31 eller 40. Tabell 28 har Köpmanholm (Yxlan) med X och b. Rutorna har varken bestallning eller tidsObs. Mät vad 740025023 är innan något skrivs.
- Mörkö: om SL-buss går dit är inte prövat. Dagsplanerarens text "Ingen kollektivtrafik hit: …" står kvar.
- Broar och vägar (Singö, Väddö, Torö, Vindö, Djurö, Ingarö, Muskö), bilfärjan Dalarö–Ornö, bussen till Räfsnäs (Lidö), "Gräddö ligger på fastlandet" (ösidan säger själv Rådmansö), spårvagn 11 och "bilfri" (Brännö), gångbron Donsö–Styrsö, "ytterst i södra skärgården" (Vrångö): ingen källa läst. OBELAGD, åtgärd PRÖVA.
- Askö, Svenska Högarna, Huvudskär, Norrpada, Långviksskär, Långskär, Storskär: rutans "nås med egen båt eller taxibåt" inte prövad. Huvudskär har en privat sommarbåt enligt ösidan.
- Tabell 11 (Grinda, Gällnö): siffrorna är kodade i pdf:en och går inte att läsa med pdftotext. Sidan 1 är granskad som bild. Beställningsuppgifterna från 2026-11-17 står, eftersom filen är oförändrad (RESONERAT).
- Rindö: "går ofta" är ett värdeord (PRECISERA). Ändrades inte, eftersom källan inte anger turtäthet.

## Logiken i Sista båten och avgångsrutan
- En beställningstur visas aldrig utan förbehåll på öar med bestallningTabell: förbehållet står direkt under tiden.
- Öar utan bestallning (Nåttarö, Vaxholm, Brännö, Styrsö, Donsö och Asperö) har ingen b, B eller t vid bryggan i rutan (MÄTT med skript). Asperö Östra har t, men den bryggan visas inte i rutan.
- Vrångö: t på sista kvällsturen måndag till fredag (23.03) och söndag (23.11), inte lördag. Stämmer med texten.
- last-departure frågar inte ISLAND_NO_TRANSIT. Det spelar ingen roll i dag, eftersom LastBoatPanel bara visas för öar i ISLAND_TRANSIT.

## Kontroller
- Torrkörning i main-kopian: 19 ersättningar ok, 0 fel.
- I en egen kopia: applicera (19 ok), generera-kallor (144 av 144 öar, 1943 källor), prebuild ok, vitest src/lib 119 filer och 1043 tester gröna. tsc --noEmit ger två fel i dmBilderRensning.test.ts och kontoRadering.test.ts, två filer som edits inte rör. Kopian är borttagen.
- Citat: alla 441 citat i registret står ordagrant i de sparade källorna (skript/regkoll.py). De nya KÄLLA-raderna i den ändrade koden har också kontrollerats. Fyra äldre citat i PDF:er bryts över rader i -layout och hittades i pdftotext utan -layout.
- Källor och skript: scratchpad/fas3/a/kallor/ och scratchpad/fas3/a/skript/ (scan.py, kol.py, citat.py, regkoll.py, edits.py, register.py).

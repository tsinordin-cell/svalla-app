# Fas 3, batch 00, del A: hållplatsdata, Sista båten och Avgångar (läst 2026-11-28)

Omfång: src/lib/transit-stops.ts (49 poster i ISLAND_TRANSIT, 14 i ISLAND_NO_TRANSIT, 7 ursprung, reseplanerarlänkar), LastBoatPanel.tsx, DepartureWidget.tsx, src/app/api/transit/*. Main 5e0a08d, orörd.
Register: f3-00/a.tsv, 294 rader (f300a-0280–0293 är vinterrader). 143 äldre rader har fått en vinteranteckning med w-tabellen i källkolumnerna.

## Vintertabellerna (13 december 2026 till 11 april 2027)
Alla w-tabeller är lästa (w2, 4, 5, 10–14, 16, 17, 19–23, 25, 28–31). Fristerna (kl. 17.00 och kl. 19.00 dagen före) är oförändrade. Ändringar som gör att rutorna eller texterna blir fel:
- Tabellerna saknar bryggan i rutan: Ytterby (5), Ornö kyrka och Fjärdlång (19) samt Orrlunda och Norehill (4). Tabell 19 går Dalarö–Ornö–Mefjärd, utan Strömkajen.
- Ny beställningsplikt: Nåttarö har b i 22 (P0 från 13 december). Den är rättad som f300a-0287.
- Isperiod i 10: Finnhamn, Norra Ingmarsö och Norra Svartsö är X vid kraftig is. tidsObs är tillagd för alla tre (0282–0284).
- Rödlöga: "alla turer har b" gällde bara 2 november till 12 december. Texten är nu oberoende av period och nämner anmärkning h om isläggning (0285).
- Utö, Möja, Kymmendö, Fjärdlång, Ornö och Tynningö: texterna hänvisar nu till tabellens nummer, eller säger vad som ändras från 13 december (0280, 0281, 0286, 0288–0293).
- Vinterfelen i P0-posterna (Resarö, Gällnö, Svartsö) står i a-p0.md under "Efter 13 december". p0-28-posterna är inte ändrade.
- SL:s busstabeller (433, 434, 634, 636, 839, 845 med flera) gäller till 12 december 2026 och är inte omlästa. Västtrafiks 281 och 283 gäller till 12 december 2026.

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
- Torrkörning av a.edits.json mot main: 33 ok, 0 fel. a.edits.json innehåller de 12 P0-posterna oförändrade, likadana som i p0-28.edits.json. Med p0-28.edits.json först och de 21 övriga posterna efter: 34 ok, 0 fel.
- I en egen kopia med p0-28 och sedan de övriga: generera-kallor (144 av 144 öar, 1943 källor), prebuild ok, vitest src/lib 119 filer och 1043 tester gröna. tsc --noEmit ger två fel i dmBilderRensning.test.ts och kontoRadering.test.ts, två filer som edits inte rör. Kopian är borttagen.
- Citat: alla 838 citat i registret står ordagrant i de sparade källorna (skript/regkoll.py). De nya KÄLLA-raderna i den ändrade koden har också kontrollerats. Fyra äldre citat i PDF:er bryts över rader i -layout och hittades i pdftotext utan -layout.
- Källor och skript: scratchpad/fas3/a/kallor/ (wa_w*.pdf/.txt för vintern) och scratchpad/fas3/a/skript/ (scan.py, kol.py, sektion.py, citat.py, regkoll.py, edits.py, register.py, vinter.py, register_vinter.py).

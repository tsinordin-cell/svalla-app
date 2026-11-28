# Runda 2, f3-00 del A (2026-11-28)

Säkerhetskopior: runda2a/fore/a.tsv och a.edits.json. Källor: runda2a/kallor/ (WA h2–h31, w2–w31, SL h/v, Västtrafik 281/283). Skript: runda2a/skript/.

## Per kid (FEL och SAKNAS i a1–a3)
- a-k005 f300a-0214 Brännö: "bilfri" obelagd, struken; noten nu linje 283 Saltholmen–Brännö Rödsten (VT 283).
- a-k014 f300a-0154 Singö: bron struken; buss 637 till Åmyran (h637, v637).
- a-k022 f300a-0222 Donsö: gångbron struken; linje 281 till Donsö (VT 281).
- a-k027 f300a-0198 Djurö: broarna strukna; 433 och 434 till Djurö skola (h433, h434; bara till 12 dec).
- a-k028 f300a-0172 Torö: bron struken; 852 till Eneby affär (h852, v852).
- a-k033 f300a-0129 Landsort: C från 13 dec tillagd (w29).
- a-k036 f300a-0193 Ingarö: bron struken; resten oförändrat, ingen linje belagd.
- a-k048 f300a-0110 Runmarö: "Stavsnäs vinterhamn" → Stavsnäs, tabell 16 och 23.
- a-k059 f300a-0164 Gräddö: "på fastlandet …" struken; 631 till Gräddö torg (h631, v631).
- a-k060 f300a-0043 Möja: ", inte från Stavsnäs" struken (fel sommartid).
- a-k074 f300a-0180 Rindö: ej rättad; hållplatsnamnet kräver Trafiklab (MÄT, Redaktören).
- a-k078 f300a-0280 Utö: B och C (w21), X vid Näsudden och tabell 19 tillagda. P0 från 13 dec.
- a-k093 f300a-0231 Asperö: "Styrsöbåt" struken; linje 283, 14 till 19 minuter (VT 283, MÄTT).
- a-k117 f300a-0030 Utö: se a-k078.
- a-k125 f300a-0213 Brännö: spårvagn 11 struken (se a-k005).
- a-k142 f300a-0096 Yxlan: Vagnsunda bara i tabell 24 (till 1 nov 2026); not tillagd. P0-kandidat i runda2-till-p0.md.
- a-k150 f300a-0168 Väddö: bron struken; 637 till Edeby torg.
- a-k161 f300a-0226 Vrångö: "ytterst i södra skärgården" struken; linjens sista anhalt (VT 281).
- a-k170 f300a-0133 Nåttarö: P0-post; förslag i runda2-till-p0.md.
- a-k189 f300a-0185 Vindö: "ända fram" och broarna strukna; 434 till Fjällsvik (bara till 12 dec).
- a-k191 f300a-0287 Nåttarö: P0-post (rättad i p0-28/p0-29); H saknas, förslag i runda2-till-p0.md.
- a-k199 f300a-0190 Muskö: noten struken (ingen källa, ingen SL-tabell nämner Risdalsvägen).
- a-k230 f300a-0020 Grinda: B, C, H (w11) tillagda; tabell 12 har Södra Grinda utan anmärkningar. P0 från 13 dec.
- a-k231 f300a-0285 Rödlöga: B (w28) och H tillagda; C fanns inte vid Rödlöga (ny kolumnläsning). P0 från 13 dec.

## Genomgången av beställningsreglerna (ut/bestallning-genomgang.tsv, 140 rader)
- 32 poster med Waxholmsbolagets trafik, 140 par ö och tabell. Kolumnerna lästa med pdftotext -bbox (tur → cell → anmärkning), två avsnitt per sida hanterade; h11/h12 har kodade siffror, avkodade (MÄTT).
- Ändrad bestallning (22): Dalarö, Fejan, Finnhamn, Furusund, Gällnö, Gräskö, Grinda, Husarö, Ingmarsö, Kymmendö, Landsort, Lidö, Ljusterö, Möja, Nämdö, Norröra, Ornö, Rödlöga, Runmarö, Svartsö, Tynningö, Utö; ny för Vaxholm.
- bestallningTabell ändrad där tabeller saknades (till exempel Ingmarsö och Svartsö: 13; Ornö: 20; Runmarö: 17; Utö: 19; Ljusterö: 8, 9, 12).
- tidsObs: ny för Dalarö, Gällnö, Ljusterö, Nämdö, Ornö, Runmarö, Utö; uppdaterad för Finnhamn, Ingmarsö, Svartsö, Möja, Tynningö.
- Oförändrade: Sandhamn, Fjärdlång, Eknö, Arholma (stämmer i båda perioderna); Resarö och Nåttarö är P0-poster; Blidö har redan stangd (Bromskär avstängd, tabell 28).
- Tabell 24, 26 och 27 gällde till 1 november 2026 och är inte med i fälten; w24.pdf och w26.pdf gäller 2024.
- Ny not: Fjäderholmarna (H i w2), Yxlan (Vagnsunda och Köpmanholm), Dalarö (839 från Handens station från 13 dec).

## SL efter 12 december
- Vintertabell finns (Giltig 13 december 2026–…): 626, 631, 634, 636, 637, 689, 727, 839, 845, 846, 852, 858. Inga andra fel än 839 (Dalarö).
- Ingen vintertabell: 433, 434, 474, 440, 428 (v-filerna gäller till 12 december 2026) och 670 (v670.pdf gäller 2022–2023). Inget skrivet för tiden efter 12 december.

## DepartureWidget (Redaktörens tillägg)
f300a-R210: svar med fel visas som "Tidtabellinfo ej tillgänglig just nu". LastBoatPanel döljer sig vid fel; ingen ändring.

## Kontroller (MÄTT)
- Torrkörning mot kopia av main: p0-28.edits.json 19/19, a.edits.json utan P0-poster 81/81. Samma resultat med p0-28a + p0-29 i stället för p0-28.
- generera-kallor 0, prebuild 0 (1044 tester), tsc 2 kända fel (dmBilderRensning.test.ts, kontoRadering.test.ts), vitest src/lib 119/119 filer. Kopiorna borttagna.
- Citat: 701 av 701 ordagrant i sparade källor (runda2a/skript/kollcitat.py). Inga klockslag utom frister som tabellerna anger (kl. 17.00, kl. 19.00).
- Register: 62 rader märkta "runda 2", 10 nya (f300a-R201–R210). a.edits.json: 93 poster (2 borttagna, 60 nya, 2 för DepartureWidget).

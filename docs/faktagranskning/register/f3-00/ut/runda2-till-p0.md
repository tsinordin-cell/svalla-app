# Runda 2, batch 00 del A: till P0-rättelsen (2026-11-28)

Läsdatum för alla källor: 2026-11-28. Sparade källor: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/fas3/runda2a/kallor/ (.txt = pdftotext -layout, ligaturen ﬁ skriven fi, de kodade siffrorna i h11 och h12 avkodade).

## 1. Rättelser som hör till P0-posterna (inte gjorda i a.edits.json)

### Nåttarö, bestallning (f300a-0287, p0-29.edits.json) och note (f300a-0133, a-k170)
- bestallning: b och B stämmer nu med w22 (MÄTT: 22A b vid Nåttarö på alla turer, 22B åtta turer B och fyra b). Det som saknas: tolv turer vid Nåttarö i w22 har turanmärkning H, "Går under isfri period". Förslag, sist före "Kontrollera …": "Från 13 december 2026 går turer med anmärkning H bara under isfri period."
  `// KÄLLA: https://kund.printhuset-sthlm.se/wa/w22.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "Nåttarö", "Går under isfri period" (läst 2026-11-28)`
- note "Pendeltåg till Nynäshamn + Waxholmsbolaget därifrån.": pendeltåget har ingen källa (a-k170). Förslag: "Waxholmsbolagets båt från Nynäshamn, tabell 22."
  `// KÄLLA: https://kund.printhuset-sthlm.se/wa/h22.pdf — "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 12 DECEMBER 2026", "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ" (läst 2026-11-28)`
  `// KÄLLA: https://kund.printhuset-sthlm.se/wa/w22.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ" (läst 2026-11-28)`

### Resarö, Eknö (tidsObs, bestallningTabell) och Arholma
Genomgångna mot h5/w5, h16/w16 och h30/w30. Inget fel: Ytterby saknas i w5; Eknö har X på 39 av 48 celler i h16 och 31 av 31 i w16; Arholma har B och C i båda perioderna, och isperioden står i noten.

### Två poster borttagna ur a.edits.json
f300a-0125 (tidsObs Ytterby) och f300a-0286 (bestallning Ytterby) gick inte att lägga in efter p0-28.edits.json: deras "gammal" finns inte längre, och P0-posterna har redan samma innehåll. De är sparade i runda2a/arb/borttagna-ur-a.json.

## 2. P0-kandidat som inte är rättad

### Yxlan, rutans brygga (f300a-0096, a-k142)
destStopName är "Yxlan Vagnsunda brygga". Vagnsunda står bara i tabell 24, "GÄLLER 2 APRIL 2026 – 18 JUNI 2026 OCH 17 AUGUSTI 2026 – 1 NOVEMBER 2026". Ingen av tabellerna h2–h31 och w2–w31 som går att hämta har Vagnsunda (w24.pdf gäller 2024, MÄTT). Rutan visar alltså reseplanerarens tider till en brygga som Waxholmsbolaget inte angör nu. I a.edits.json har jag bara lagt till en not om det (tabell 24 gällde till 1 november 2026, tabell 28 angör Köpmanholm). Förslag till Redaktören: antingen stangd-text för Vagnsunda, eller byt destStopId till Köpmanholm (Yxlan) efter mätning med /api/transit/stop-lookup.

## 3. P0 från 13 december 2026 som är rättade i a.edits.json (inte P0-poster)
Den som följer den gamla texten beställer för sent eller tror att turen går:
- Grinda (a-k230): w11 har B-turer vid Södra Grinda (1103, 1124) och C-turer vid Norra Grinda. Texten sa bara b, en timme.
- Utö (a-k078, a-k117): w21 har B (2109, 2110) och C (2132, 2134) vid Gruvbryggan och Spränga. Texten sa bara b.
- Rödlöga (a-k231): w28 har B på 2825 och 2828. Texten sa bara b.
- Landsort (a-k033): w29 har C. Texten sa bara B.
- Dalarö, noten: buss 839 börjar vid Handens station från 13 december 2026 ("839 Handens station–Dalarö (–Smådalarö)" i v839), inte vid Rudsjöterrassen.
- Vaxholm: B-turer i tabell 4, 5 och 8 (till 12 december) och 4, 5, 7 och 11 (från 13 december), C i 2, 4 och 5 från 13 december. Vaxholm hade ingen bestallning, så "Sista båten" kan peka ut en B-tur.
- Ljusterö: b i tabell 8, 9 och 12, X vid fem bryggor (tabell 9 och 12), isperiodsturer i tabell 10 och 12 och h i tabell 8 och 9. Texten sa bara B och C i tabell 10.

## 4. Coordinatorns tillägg (DepartureWidget)
Krockar inte med p0-28/p0-28a. Rättelsen står i a.edits.json (f300a-R210): ett svar med fältet fel sätter error, så rutan visar "Tidtabellinfo ej tillgänglig just nu" i stället för "Inga avgångar hittade just nu". LastBoatPanel.tsx: kortet döljs vid fel (`if (!data.return) return null`) och säger aldrig att ingen båt går; ingen ändring.

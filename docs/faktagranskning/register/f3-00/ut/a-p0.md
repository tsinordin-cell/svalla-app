# P0, fas 3 batch 00 del A (hållplatsdata, Sista båten, Avgångar), läst 2026-11-28

Main 5e0a08d. Rättelserna står i ut/a.edits.json (register-id inom parentes).

1. **src/lib/transit-stops.ts:325 (gallno.note), f300a-0099.** Noten säger "Båt från Stavsnäs vinterhamn med Waxholmsbolaget". Gällnö står i tabell 11 och 14, och ingen av dem har Stavsnäs; båtarna går från Strömkajen via Vaxholm, Boda brygga och Sollenkroka.
   Källa: https://kund.printhuset-sthlm.se/wa/h11.pdf — "11A STOCKHOLM – VAXHOLM – GRINDA – BODA – SOLLENKROKA", "Gällnö"; https://kund.printhuset-sthlm.se/wa/h14.pdf — "14A STOCKHOLM – VAXHOLM – SOLLENKROKA – MÖJA", "Gällnö".
2. **src/lib/transit-stops.ts:365 (svartso.note), f300a-0115.** Samma fel för Norra Svartsö: tabell 10, 12 och 13 har ingen Stavsnäs. Båtarna går från Strömkajen via Vaxholm och från Åsättra brygga.
   Källa: https://kund.printhuset-sthlm.se/wa/h12.pdf — "12A STOCKHOLM – VAXHOLM – LILLSVED – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Norra Svartsö"; https://kund.printhuset-sthlm.se/wa/h10.pdf — "10A ÅSÄTTRA – NORRA INGMARSÖ – HUSARÖ – MÖJA", "Åsättra brygga".
3. **src/lib/transit-stops.ts:379 (resaro.note), f300a-0122.** "buss 670 + 689 från Tekniska högskolan": 689 går på Tynningö, inte till Resarö.
   Källa: https://kund.printhuset-sthlm.se/sl/h689.pdf — "689 Höganäs brygga/Norra Tynningö–Östra Tynningö (–Gustavsbergs centrum)".
4. **src/lib/transit-stops.ts:376–387 (resaro, tidsObs saknas), f300a-0125.** Ytterby (Resarö) är märkt X, "Bryggorna trafikeras utan fast avgångstid.", på de flesta turer i tabell 5 (36 X mot 26 tider, MÄTT), men rutorna visar reseplanerarens tider som tidtabellens, även som sista båt.
   Källa: https://kund.printhuset-sthlm.se/wa/h5.pdf — "Ytterby (Resarö)", "Bryggorna trafikeras utan fast avgångstid."
5. **src/lib/transit-stops.ts:552–564 (ekno, tidsObs saknas), f300a-0209.** Eknö är X på de flesta turer i tabell 16 (39 X mot 9 tider, MÄTT). Samma fel som punkt 4.
   Källa: https://kund.printhuset-sthlm.se/wa/h16.pdf — "Eknö", "Bryggorna trafikeras utan fast avgångstid."
6. **src/lib/transit-stops.ts:245 (arholma.note), f300a-0064.** "buss 631 från Norrtälje" till Simpnäs: 631 går Norrtälje–Rådmansö och har ingen hållplats i Simpnäs. Bussen till Simpnäs brygga är 636.
   Källa: https://kund.printhuset-sthlm.se/sl/h631.pdf — "631 Norrtälje–Rådmansö–Norrtälje"; https://kund.printhuset-sthlm.se/sl/h636.pdf — "636 Norrtälje–Björkö", "Simpnäs brygga".
7. **src/lib/transit-stops.ts:281 (furusund.note), f300a-0079.** "buss 626/634 från Norrtälje": 626 går Danderyds sjukhus–Ljusterö. Bara 634 går från Norrtälje via Furusund.
   Källa: https://kund.printhuset-sthlm.se/sl/h626.pdf — "626 Danderyds sjukhus–Ljusterö"; https://kund.printhuset-sthlm.se/sl/h634.pdf — "634 Norrtälje–Blidö", "Furusunds färjeläge".
8. **src/components/LastBoatPanel.tsx:261, f300a-0266.** "Är det så, går sista båten utan beställning tidigare." På bryggor där alla turer har anmärkning finns ingen sådan båt: från Rödlöga har alla turer 2 november till 12 december anmärkning b (28B tur 2822, 2852, 2892).
   Källa: https://kund.printhuset-sthlm.se/wa/h28.pdf — "GÄLLER 1 OKTOBER 2026 – 12 DECEMBER 2026", "28B RÖDLÖGA – SÖDERÖRA – ÖSTERNÄS – FURUSUND", "Går under perioden 2 november - 12".
9. **src/components/DepartureWidget.tsx:158 och 161, f300a-0278, f300a-0279.** Rutan säger "Hit går ingen kollektivtrafik" och "<ö> nås med egen båt eller taxibåt" för alla öar i ISLAND_NO_TRANSIT. Hasselö (transit-stops.ts:720) angörs av Waxholmsbolagets tabell 16 och Gålö (:715) har SL-buss 845; de står i listan för att närmaste hållplats "kunde inte knytas till ön". Mörkö (:716) har bro och vägfärja.
   Källa: https://kund.printhuset-sthlm.se/wa/h16.pdf — "16A STAVSNÄS – SANDHAMN – HAGEDE", "Hasselö"; https://kund.printhuset-sthlm.se/sl/h845.pdf — "845 Västerhaninge station–Gålö"; https://www.trafikverket.se/resa-och-trafik/farjetrafik/skanssundsleden/ — "Skanssundsleden går mellan Hörningsnäs på Södertörn och Mörkö."
10. **src/lib/transit-stops.ts:712 (lilla-karlso) och DepartureWidget.tsx:161, f300a-0252.** Rutan säger "Lilla Karlsö nås med egen båt eller taxibåt" utan reservatets regler: utan tillstånd får man bara landstiga vid bryggan på östra sidan, och 1 mars till 31 augusti krävs tillstånd för att vistas på ön. Skälet "bara med Naturskyddsföreningens turbåt" stämmer inte heller.
    Källa: https://www.lansstyrelsen.se/gotland/besoksmal/naturreservat/lilla-karlso.html — "landstiga på annan plats än vid bryggan på öns östra sida utan tillstånd av länsstyrelsen", "under tiden 1/3–31/8 vistas på ön utan tillstånd av länsstyrelsen eller av länsstyrelsen förordnad tillsynsman för reservatet"; https://naturskyddsforeningengotland.se/fastigheter/lilla_karlso — "Resan erbjuds av Gotland Sea Guides i samarbete med Naturskyddsföreningen Gotland".

## Efter 13 december

Mätt mot Waxholmsbolagets vintertabeller (https://kund.printhuset-sthlm.se/wa/w<tabell>.pdf, "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027"; tabell 12 "GÄLLER 13/12 – 6/1 OCH 25/3 – 11/4 SAMT ISFRI PERIOD 7/1 – 24/3"), läst 2026-11-28. P0-posterna i p0-28.edits.json är inte ändrade. Felen nedan gäller deras text från 13 december:

1. **Resarö (P0-posterna f300a-0120–0122, f300a-0125).** Vintertabellen 5 har inte Ytterby (Resarö). Noten "Waxholmsbolagets linje 5 går från Strömkajen via Vaxholm till Ytterby på Resarö" blir fel från 13 december, och tidsObs gäller en brygga utan turer. Förslag: lägg till "Waxholmsbolagets tabell 5 från 13 december 2026 angör inte Ytterby." Bestallning-texten är rättad så i a.edits.json (f300a-0286).
   Källa: https://kund.printhuset-sthlm.se/wa/w5.pdf — "GÄLLER 13 DECEMBER 2026 – 11 APRIL 2027", "5A STOCKHOLM – VAXHOLM – STEGESUND – VIKINGSBORG" (Ytterby saknas i alla sex tabellsidor).
2. **Gällnö (f300a-0099).** Noten säger "(tabell 11 och 14)". Vintertabellen 14 har inte Gällnö, men vintertabellen 11 har Strömkajen, Boda brygga, Sollenkroka och Gällnö. Förslag: "(tabell 11, och under en del av året tabell 14)".
   Källa: https://kund.printhuset-sthlm.se/wa/w11.pdf — "11A STOCKHOLM – VAXHOLM – BODA – SOLLENKROKA", "Gällnö".
3. **Norra Svartsö (f300a-0115).** Noten säger "(tabell 12 och 13)". Vintertabellen 13 har inte Norra Svartsö, men tabell 12 och tabell 10 (Åsättra) har det. Förslag: "från Strömkajen via Vaxholm (tabell 12, och under en del av året tabell 13)".
   Källa: https://kund.printhuset-sthlm.se/wa/w12.pdf — "12A STOCKHOLM – LILLSVED – NORRA INGMARSÖ", "Norra Svartsö".
4. **Nåttarö (ny P0, rättad i a.edits.json, f300a-0287).** Vintertabellen 22 har anmärkning b vid Nåttarö på alla turer i 22A och 4 av 12 i 22B. Posten hade ingen bestallning, så från 13 december skulle en beställningstur visas som vanlig tur, också som sista båt.
   Källa: https://kund.printhuset-sthlm.se/wa/w22.pdf — "22A NYNÄSHAMN – NÅTTARÖ – ÅLÖ", "Nåttarö", "minst 1 timme innan avgång".
5. **Kommentarer i P0-posterna** (inte sakfel): platshållar-id efter tankstrecket blev inte omskrivna, så "f300a-0120–0100", "f300a-0062–0052" och "f300a-0078–0066" ska vara f300a-0120–0122, f300a-0062–0064 och f300a-0078–0080.

Övriga P0-poster håller efter 13 december: Eknö är X på alla tider i w16, 30A och 31 går, 25 och 28 går från Furusund, Hasselö står i w16 med tider och b, och Rödlöga har b i w28 (LastBoatPanel-texten "eller inte alls" håller).

# Runda 2 B till P0-spåret (2026-11-28)

Inga rättelser i runda 2 B hör till en P0-post. Posten i b.edits.json vars "gammal" finns i p0-28.edits.json och p0-29.edits.json (Färja 941 till Färja 31-1, Lidö, f300b-0060 till f300b-0063) är orörd.

## P0-risk från 13 december: komma-dit länkar till tidtabeller som slutar gälla 12 december
Länkarna "Tidtabell (pdf)" på /o/[ö]/komma-dit kommer från getting_there[].url i island-data.ts (inte del B:s mall). Från 13 december visar de en tabell som inte gäller längre, och den som läser tiderna där kan missa båten eller bussen. MÄTT 2026-11-28 (curl och pdftotext, kopior i scratchpad/fas3/runda2b/kallor/lankar/):
- ingaro: https://kund.printhuset-sthlm.se/sl/h428x.pdf, "Giltig 17 augusti–12 december 2026"
- smadalaro: https://kund.printhuset-sthlm.se/sl/h839.pdf, "Giltig 17 augusti–12 december 2026"
- roro: Västtrafiks pdf 6281 ("Gäller 14 dec 2025 - 12 dec 2026") och 6290 ("Gäller 17 aug - 12 dec 2026") på vtstorage002.blob.core.windows.net
- graso: ul.se Regionbuss_811_260817_261212.pdf och Regionbuss_854_260817_261212.pdf (perioden står i filnamnet; ingen GÄLLER-rad gick att läsa ur pdf:en)

Förslag: byt till tabellerna från 13 december när de finns, annars till operatörens tidtabellssida. Jag har inte letat upp de nya tabellerna.

## Att veta för transit-stops.ts (del A)
"Stavsnäs vinterhamn" står inte i Waxholmsbolagets tabeller 16 och 17 (h16, s16, w16, w17 skriver "Stavsnäs"). Namnet finns i SL:s tabell för buss 433 (sl/h433.pdf, "Giltig 17 augusti–12 december 2026"). Någon tabell för buss 433 från 13 december hittade jag inte (sl/v433.pdf gäller "14 december 2025–18 juni 2026 samt 17 augusti–12 december 2026"). Det är ingen P0, eftersom bryggan är densamma.

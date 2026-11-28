# Runda 4, f3-00 (2026-11-28)

Säkerhetskopior: fas3/runda4/fore/ (a.tsv, b.tsv, a.edits.json, b.edits.json). Källor (curl -sSL --http1.1, pdftotext -layout): fas3/runda4/kallor/ (WA h3, h4, w3, w4, h10, h12, h13, w10, w12, w13, h11, w11, h22, w22; SL h4343x, v4343x, h670670x; Trafikverket Vaxholmsleden). Skript: fas3/runda4/skript/ (ratta4.py, register4.py, kollcitat4.py, torr.py).

## Per kid
- a-r3-k013 f300a-R309 Husarö (island-data, getting_there Waxholmsbåt): "senast på eftermiddagen … tidigt på kvällen dagen före" ersatt med anmärkningarnas ordalydelse: b (tabell 10 och 12 till 12 december 2026, tabell 10 från 13 december 2026) "minst 1 timme innan avgång från aktuell brygga, dock senast kl. 17.00", B (tabell 10 och 13) minst 2 timmar, dock senast kl. 17.00, C och c (tabell 10 och 13) "senast kl. 19.00 dag före resdag". KÄLLA h10, h12, h13, w10, w13. Tabellerna som i f300a-0049; Husarö-raderna i tabellerna kontrollerade (MÄTT).
- a-r3-k026 f300a-0180/0181/0182 + ny R401 Rindö (transit-stops): destStopName "Rindö centrum" blir "Rindö" (ingen källa för namnet; destStopId mäts fortfarande av Redaktören). Noten: buss till Vaxholm och Trafikverkets vägfärja Vaxholmsleden, sex minuters avgiftsfri överfart ("går ofta" borta), bryggorna Grenadjärbryggan, Rindö västra, Rindöbaden och Vegabryggan i tabell 4 (båda perioderna) och Grenadjärbryggan i tabell 3 till 12 december 2026 (w3 har ingen Rindöbrygga, MÄTT), med X och b vid en del turer. Ny post mot main.
- a-r3-k034 f300a-0020 Grinda: b "tabell 11 och 13 till 12 december 2026 och tabell 11 från 13 december 2026". Tur 1477, Södra Grinda 19.25b i h11 (avkodad med kontroll3/k32-verktyg/bbox.py, MÄTT). KÄLLA h11 tillagd.
- a-r3-k046 f300a-0133 Nåttarö: noten oförändrad, KÄLLA SL h4343x ("Giltig från och med 17 augusti till och med 12 december 2026.") och v4343x ("Giltig från och med 13 december 2026 till och med 20 juni 2027.") samt WA h22 och w22 direkt ovanför. Ny post mot main.
- a-r3-k031 f300a-R313 (i f300a-0116) Svartsö: "Från 13 december 2026 angör turerna i tabell 10 för isperiod vid kraftig is (10E och 10F) Norra Svartsö utan fast avgångstid och utförs av svävare (anmärkning K)." KÄLLA w10 fick "utan fast avgångstid.".
- a-r3-k032 f300a-0190 Muskö: struken i registret (ny text tom), ingen kodändring.
- b-r3-k007 f300b-0028 Cinderella: struken i registret (ny text tom), ingen kodändring.

## Kontroller (MÄTT)
- Färsk kopia av origin/main ba07a05b (P0 31 #807 och #808 ingår). a.edits.json 95/95 och b.edits.json 54/54 (utan p0-28-poster) gick in; inga krockar med P0 31, och alla nio P0 31-texter står kvar efter appliceringen.
- generera-kallor: 144 av 144 öar, 1949 källor. prebuild: kod 0. tsc: de 2 kända felen plus "Cannot find module 'supercluster'" (UpptackExplorer.tsx från #803; paketet finns i origin/main:s package.json men inte i den lokala node_modules, alltså miljön, inte batchen). vitest src/lib: 119 filer, 1044 test gröna. Kopiorna borttagna.
- Citat: 69 av 69 i nya och ändrade KÄLLA-rader står ordagrant i runda4/kallor (kollcitat4.py). Inga tankstreck i ny synlig text.
- Register: 10 rader i a.tsv (varav ny f300a-R401) och 1 i b.tsv märkta "runda 4". b.edits.json oförändrad.

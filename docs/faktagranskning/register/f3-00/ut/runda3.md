# Runda 3, f3-00 del A och B (2026-11-28)

Säkerhetskopior: fas3/runda3/fore/ (a.tsv, b.tsv, a.edits.json, b.edits.json). Källor: fas3/runda3/kallor/ (WA h2–h31 och w2–w31, SL h839 och v839, Västtrafik 283, Göteborgs stads förstudie, Waxholmsbolagets SL-biljettsida). Skript: fas3/runda3/skript/ (rätta.py, nya.py, register.py, applicera.py, kollcitat.py).

## Per kid
- a-r2-k001 f300a-0058 Dalarö: "samma dag" struket.
- a-r2-k002 f300a-0081 Furusund: "samma dag" struket.
- a-r2-k004 f300a-0180 Rindö: ingen kodändring; Trafikverkets sida stöder inte "Rindö centrum", källan borttagen ur registret. OBELAGD, Redaktören mäter i Trafiklab.
- a-r2-k006 f300a-0087 Norröra: "samma dag" struket.
- a-r2-k007 f300a-0149 Nämdö: "samma dag" struket.
- a-r2-k009 f300a-0129 Landsort: "samma dag" struket.
- a-r2-k010 f300a-0106 Ljusterö: "samma dag" struket.
- a-r2-k013 f300a-0116 Svartsö: "samma dag" struket; isperioden också I-turer i tabell 13 (w13).
- a-r2-k015 f300a-0159 Lidö: "samma dag" struket (beställningstexten i a.edits.json; Lidös /farjor-text låg i P0 29).
- a-r2-k017 f300a-0133 Nåttarö: inte rättad här, Nåttarö ligger i P0 29 (mergad, f94d840).
- a-r2-k020 f300a-R201/R202 Vaxholm: "samma dag" struket; H i tabell 7, 8, 9 "för linje 2 eller linje 4", i tabell 11 "för linje 14".
- a-r2-k022 f300a-0280 Utö: "samma dag" struket; B i tabell 19 struket (bara tur 1936, T = 17 augusti till 13 september, MÄTT).
- a-r2-k024 f300a-0034 Finnhamn: "samma dag" struket; I-turer i tabell 13.
- a-r2-k026 f300a-0074 Fejan: "samma dag" struket.
- a-r2-k028 f300a-0044 Möja: "samma dag" struket.
- a-r2-k029 f300a-0020 Grinda: "samma dag" struket; H i tabell 11 "för linje 14".
- a-r2-k030 f300a-0053/0054 Ingmarsö: "samma dag" struket; I-turer i tabell 13.
- a-r2-s009 f300a-0214 Brännö: "Brännö är bilfri." återställd, KÄLLA Göteborgs stads förstudie Södra skärgården (nivå 1).
- a-r2-k032 f300a-0231 Asperö: 14 minuter direkt eller 18 till 20 via Asperö Östra (51 turer, MÄTT).
- a-r2-k038 Nåttarö: utanför uppdraget (P0 29).
- a-r2-k042 f300a-0190 Muskö: registerrad rättad (ny text tom, struken); ingen kodändring.
- a-r2-k046 f300a-0111 Runmarö: b i tabell 16, 17 och 23 i båda perioderna.
- a-r2-k056 f300a-0100 Gällnö: b också i tabell 11 till 12 december (h11, läst som bild); H "för linje 14".
- b-r2-k001/k002/k009/k018 f300b-0099/0098/0102/0097: "öar och kustorter" blir "öar och platser" (ALL_ISLANDS 144 = 133 öar, 7 orter, 3 naturreservat, 1 nationalpark, MÄTT).
- b-r2-k005 f300b-0028: Cinderellas sameAs (cinderellabatarna.com) struket; provider.url är Strömmas sida.
- b-r2-k007 f300b-0139: farjor-skargard publiceras inte (se nedan).
- b-r2-k012 f300b-0034: "Resten av året kompletterar du" blir "Annars kompletterar du" (/farjor FAQ och JSON-LD).

## Övriga punkter
- "samma dag": struket i 27 poster i a.edits.json och i 9 nya poster mot main (R301–R309: Sandhamn, Arholma, Resarö, Fjärdlång, Eknö, två KÄLLA-parafraser i transit-stops, Husarö i island-data). Efter torrkörningen står "samma dag" bara kvar i kommentarer (bland annat P0 29:s om Nåttarö) och i texter som inte är beställningsregler. Husarö (f300a-0049) fick samma isperiodsrättelse som k013 utan egen kontrollrad.
- Smådalarö (R310–R312, island-data): beskrivningen, facts.travel_time och komma dit-rutan säger nu Rudsjöterrassen till 12 december och Handens station från 13 december. Restiden 45 till 54 min gäller i båda tabellerna (MÄTT, 22 turer i h839 och v839). OBS: p0-29-lankar-vilande.edits.json (Smådalarö) har hela den gamla raden som "gammal" och går inte in efter detta; den behöver göras om när den väcks.
- Norra Svartsö (R313, Redaktörens tillägg): från 13 december utförs isperiodsturerna i tabell 10 (10E, 10F, "GÄLLER ISPERIOD (VID KRAFTIG IS)") av svävare, anmärkning K, beställs hos Svisch Air per telefon senast kl. 19.00 dagen före (w10). Lagd i a.edits.json-posten f300a-0116 i stället för som egen post mot main: den posten skriver om hela beställningsraden, så en separat post mot mains rad skulle krocka.
- farjor-skargard.md har inget published-fält; published sätts för alla artiklar i scripts/seed-tips-articles.mjs. Där får farjor-skargard nu `published: false` (insert läser `art.published ?? true`). md-filen är oförändrad. Skäl: sakfel (bland annat "M/S Cinderella I går till Möja") och priser från 2023; sidan svarar 404 i dag.
- Utanför uppdraget: Dalarö, Gålö, Kymmendö, guiderna, resetips och segelkurs nämner fortfarande "buss 839 från Rudsjöterrassen" med tabellen till 12 december. Det stämmer till dess, men inte från 13 december.

## Kontroller (MÄTT)
- Kopia av origin/main f94d840 (P0 29 ingår). a.edits.json 93/93 och b.edits.json 54/54 (utan p0-28-poster) gick in.
- generera-kallor: 144 av 144 öar, 1944 källor. prebuild: kod 0. tsc: bara de 2 kända felen (dmBilderRensning.test.ts, kontoRadering.test.ts). vitest src/lib: 119 filer, 1044 test gröna. Kopiorna borttagna.
- Citat: 135 av 135 i nya och ändrade KÄLLA-rader står ordagrant i runda3/kallor (kollcitat.py, blanktecken normaliserade).
- Register: 48 rader i a.tsv och 12 i b.tsv märkta "runda 3", 13 nya (f300a-R301–R313).

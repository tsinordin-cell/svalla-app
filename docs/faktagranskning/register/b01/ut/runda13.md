# Batch 01, runda 13 (2026-11-25): rättelserna efter den fjärde kontrollen

Granskaren och Skribenten. Läsdatum 2026-11-25. Kopia: 0672f0b + mallar-arbetskopia.patch + de tolv edits.json; borttagen efteråt. Säkerhetskopior: scratchpad/b01/runda13/fore/. Källtexter (curl -sSL --http1.1, PDF med pdftotext): scratchpad/b01/runda13/kallor/. Skript: runda13/skript/. I registren står «Runda 13 (kid): …» först i kolumnen rätt uppgift.

## Punkterna
- ur03-k003, k013, k017 (styrso-0178, -0177, -0179): ny text = slutkodens mening «Här serveras helst mat från havet, framför allt skaldjur, och till fikat finns något hembakat.» Åtgärd BEHÅLL → PRECISERA, så att paketbyggaren prövar meningen och inte det gamla ordet. KÄLLA = https://batebacken.se/ «serverar vi dej helst något från havet och då framförallt skaldjur» | «kanske vill du ha något hembakat till». Göteborg & Co:s citat («enklare rätter») borttaget.
- ur03-k028 (uto-0401): raden skriven om till dold post: fält hidden_at/hidden_reason, påståendet = satsens skäl (inget namn belagt av verksamheten eller en myndighet). Namnet står bara som «tidigare påstående». KÄLLA och citat tomma: raden påstår ingen sakuppgift. uto.sql oförändrad.
- ur03-k006 (lag3b-N031, lag3-b.edits.json post 28): meningen om varvsnäringens uppsving under 1900-talet struken, och dess citat borttaget ur KÄLLA-raden och registret (läst 2026-11-25). Värmdö kommuns Möjafolder (PDF).
- ur03-k018 (lag3a-N019, lag3-a.edits.json post 22): «Närmast ligger» → «Enligt Nynäshamns kommun ligger Nynäshamns gästhamn i stadens fiskehamn, …». Runda 11:s kommentar rättad (servicen är inte struken), ny kommentar för runda 13, kommunens KÄLLA-rad omläst (2026-11-25). Registret: + https://nynashamn.se/uppleva/skargard--batliv/batliv med tre citat (fiskehamnen, hyra motorbåtar, sjömacken).

## Sidor (ord, matt10.tsx och db-riktig.json; main = runda 12:s mätning av 0672f0b; före = dagens edits, lika med runda 12:s efter på alla sidor)
| sida | main | före | efter | av main |
|---|---|---|---|---|
| moja hantverkare / ösida | 3 277 / 5 717 | 3 301 / 6 819 | 3 286 / 6 804 | 100,3 / 119,0 % |
| yttre-garden komma-dit / ösida / boende / med barn | 2 903 / 4 454 / 2 846 / 3 045 | 3 084 / 4 764 / 2 954 / 3 139 | 3 086 / 4 768 / 2 956 / 3 141 | 106,3 / 107,0 / 103,9 / 103,2 % |
| trysunda ösida | 4 390 | 4 370 | 4 370 | 99,5 % |
Ingen sida under 95 %, så ingen kompensation. Klockslag: före = efter på alla sidor. Inga tankstreck i den nya texten.

## Kontroller (kopian)
- applicera.mjs, tolv filer i ordning: 351 ok, 0 fel.
- npm run -s prebuild: exit 0 efter generera-kallor (första körningen: «kallor.generated.ts är inaktuell», som väntat); 144 öar, 1 943 källor.
- npx tsc --noEmit -p .: exit 0. verify-claims (utan --uppdatera-baslinje): exit 0, «inga NYA påståenden utan källa». generera-kallor --kontroll: exit 0. vitest src/lib: 112 filer, 997 tester gröna.
- Citat: 33 av 33 (de sex raderna och de omlästa KÄLLA-raderna) står ordagrant i runda13/kallor (citat.py). Den nya texten står ordagrant i kopian.

## Till Redaktören
- bygg_slut.py tar påståendet, inte ny text, för åtgärder utanför RÄTTA/PRECISERA/FRÅNVARO/STRYK+KOMPENSERA/NY. Därför fick styrso-raderna PRECISERA och uto-0401 ett nytt påstående. Åtgärden «DÖLJ (efter Toms ja)» står kvar.
- Facebook och Instagram användes inte. Ingen sida ej nåbar. Inget i databasen, ingen commit.

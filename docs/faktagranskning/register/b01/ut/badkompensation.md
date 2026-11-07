# Badkompensation – batch 01 (2026-11-03, omarbetad 2026-11-03/07 efter omkontrollen)

Granskare och skribent: badsidornas kompensation efter mall-0198 (filtret i `src/app/o/[slug]/bad/page.tsx` tog bort kort som inte handlade om bad). Arbetskopia: /home/claude/svalla-mallar (bara `src/app/o/island-data.ts` och `src/app/o/bohuslan-data.ts` ändrade av mig, inget committat). Register: /home/claude/svalla-app/docs/faktagranskning/register/b01/badkompensation.tsv (67 rader efter omarbetet, dom KORREKT, åtgärd NY).

## Mått

MÄTT med tsx (/tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/work-badkomp/matt.ts), samma mått som work-mallar2/skript/tunnare.ts: ord i badplatserna (namn, beskrivning, vägbeskrivning, insidertips) plus ord i de kort som badsidans filter visar. **A** = det måttet. **B** = A plus ord i notiser (`activity_meta.bad.note`) som är nya i den här kompensationen; Marstrands notis fanns före och räknas inte. Mål = 95 % av siffran före mallen, avrundat uppåt. Den allmänna texten om allemansrätten och platsdatabasens badplatser räknas inte (databasen svarade inte: "Database is possibly not accessible at the moment").

| Ö | före mallen | efter mallen | mål (95 %) | nu A | nu B | |
|---|---:|---:|---:|---:|---:|---|
| Muskö | 78 | 25 | 75 | 89 | 89 | OK |
| Ven | 73 | 18 | 70 | 139 | 139 | OK |
| Birka | 51 | 13 | 49 | 13 | 52 | OK |
| Öland | 66 | 29 | 63 | 134 | 134 | OK |
| Fårö | 63 | 26 | 60 | 110 | 110 | OK |
| Öckerö | 95 | 48 | 91 | 108 | 108 | OK |
| Tynningö | 131 | 83 | 125 | 139 | 139 | OK |
| Gålö | 60 | 33 | 57 | 84 | 84 | OK |
| Dyrön | 119 | 86 | 114 | 158 | 158 | OK |
| Klädesholmen | 72 | 46 | 69 | 103 | 103 | OK |
| Kungshamn | 33 | 12 | 32 | 78 | 78 | OK |
| Smögen | 33 | 11 | 32 | 91 | 91 | OK |
| Mörkö | 42 | 25 | 40 | 93 | 93 | OK |
| Huvudskär | 35 | 0 | 34 | 0 | 70 | OK |
| Blå Jungfrun | 35 | 0 | 34 | 0 | 71 | OK |
| Marstrand | 32 | 0 | 31 | 90 | 90 | OK |
| Grebbestad | 30 | 0 | 29 | 73 | 73 | OK |

Alla 17 når målet. Birka, Huvudskär och Blå Jungfrun når det genom en notis (B), inte genom badplatser (A = 13, 0, 0).

Omarbetet efter omkontrollen (MÄTT med samma skript, work-mallar3/skript/matt.ts, 2026-11-03): Dyrön 127 → 158, Kungshamn 66 → 78, Smögen 79 → 91; Marstrand (90), Muskö (89) och Mörkö (93) oförändrade. Övriga öar oförändrade. Se avsnittet "Omarbete efter omkontrollen" sist.

Kontroller i arbetskopian efter ändringen (MÄTT, 2026-11-03; efter omarbetet se sista avsnittet): `npx tsc --noEmit` utan fel; `node scripts/verify-claims.mjs` "inga NYA påståenden utan källa" (samma 14 varningar i guide-content.ts som före); `node scripts/generera-kallor.mjs` "101 av 101", 1 624 källor (1 599 före). Alla 168 citat i de 46 nya KÄLLA-raderna och alla 202 URL–citat-par i registret står ordagrant i den sparade sidtexten (skript: work-badkomp/bin/kolla_data.py och kolla_register.py).

Sidtexterna är sparade i kallcache/ny/ (curl som domän__sökväg.txt, Chromium som .chromium.txt). Havs- och vattenmyndighetens klassificering och badvattenprofil laddas med JavaScript och syns bara när sidan läses i Chromium (las_sida.py); med curl saknas de ibland.

## Per ö

### Muskö (musko) – 78 → 25 → 89 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (korten "Cykling" och "Strandängar och fågelliv" försvann ur Bad och vattenliv).

- **badkomp-musko-N001** · activity_meta.bad.beaches[0].name + type (ny; badsidan, JSON-LD, med-barn Badmöjligheter) · rad 5303  
  Text: Björkholmen – badplats med bryggor (etikett Badbrygga)  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Björkholmen på Muskö", "Om badet: Litet bad med bryggor vid havet." (läst 2026-11-03)  
- **badkomp-musko-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 5303  
  Text: Badplats vid havet på Muskö i Haninge kommun: ett litet bad med bryggor och grillplats. Toalett finns vid campingen, men det finns ingen kiosk och inget hundbad. Havs- och vattenmyndigheten klassade badvattnet som utmärkt 2023, 2024 och 2025.  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Om badet: Litet bad med bryggor vid havet.", "Grillplats: Ja.", "Toalett: Ja, vid campingen.", "Kiosk: Nej.", "Hundbad: Nej." (läst 2026-11-03)  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/bjorkholmen-musko.html — "Björkholmen, Muskö är en badplats i Haninge kommun", "2025: ★★★ Utmärkt kvalitet", "2024: ★★★ Utmärkt kvalitet", "2023: ★★★ Utmärkt kvalitet" (läst 2026-11-03)  
  Not: HaV-sidans klassificering laddas med JavaScript: läs den i Chromium (las_sida.py).  
- **badkomp-musko-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 5303  
  Text: Närmaste busshållplats är Muskö kyrka. Parkeringen är liten.  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Kollektivtrafik: Närmaste busshållplats Muskö kyrka.", "Parkering: Liten parkering." (läst 2026-11-03)  
- **badkomp-musko-N004** · activity_meta.bad.beaches[1].name + type (ny; etikett Stenstrand) · rad 5305  
  Text: Brukets stenstrand – stenstrand med klippor (etikett Stenstrand)  
  Källa: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/musko/ — "Här finns flera vackra klippbad och en fin stenstrand.", "Ett annat smultronställe är Brukets stenstrand och och de omgivande klipporna." (läst 2026-11-03)  
  Not (omkontroll: FEL): typen var klippbad. Kommunen kallar platsen stenstrand och skiljer den från klippbaden. Ny typ `stenstrand` i IslandBeach (island-data.ts:57) och etiketten Stenstrand i badsidan. Texten (N005) säger inte att platsen är en kommunal badplats.  
- **badkomp-musko-N005** · activity_meta.bad.beaches[1].desc (ny) · rad 5305  
  Text: Stenstrand med omgivande klippor på Muskö i Haninge kommun. Utöver stenstranden har ön flera klippbad.  
  Källa: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/musko/ — "Ett annat smultronställe är Brukets stenstrand och och de omgivande klipporna.", "Här finns flera vackra klippbad och en fin stenstrand." (läst 2026-11-03)  

### Gålö (galo) – 60 → 33 → 84 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Naturreservat" försvann ur Bad och vattenliv).

- **badkomp-galo-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Sandstrand) · rad 4516  
  Text: Gålö havsbad – sandstrand  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Gålö havsbad" (läst 2026-11-03)  
  Källa: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/galo/ — "Gålö havsbad har en av skärgårdens längsta sandstränder" (läst 2026-11-03)  
- **badkomp-galo-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 4516  
  Text: Badplats vid havet vid Skälåker på Gålö i Haninge kommun, ett stort bad med lång sandstrand. Det finns toalett, grillplats och hundbad, och sommartid kiosk och minigolfbana. Badet drivs inte av kommunen. Havs- och vattenmyndigheten klassade badvattnet som utmärkt 2023, 2024 och 2025.  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun/galo-skalaker.html — "Gålö, Skälåker är en badplats i Haninge kommun", "2025: ★★★ Utmärkt kvalitet", "2024: ★★★ Utmärkt kvalitet", "2023: ★★★ Utmärkt kvalitet" (läst 2026-11-03)  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Om badet: Stort bad vid havet med lång strandremsa.", "Toalett: Ja.", "Grillplats: Ja.", "Hundbad: Ja.", "Kiosk sommartid: Ja, och minigolfbana.", "Drift: Gålö havsbad är inte ett kommunalt bad." (läst 2026-11-03)  
  Källa: https://www.haninge.se/uppleva-och-gora/lekplatser-natur-och-sevardheter/platser-att-besoka/galo/ — "Gålö havsbad har en av skärgårdens längsta sandstränder" (läst 2026-11-03)  
  Not: "Skärgårdens längsta" (kommunens ord) är inte återgivet. HaV-sidans klassificering laddas med JavaScript: läs den i Chromium.  
- **badkomp-galo-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 4516  
  Text: Närmaste busshållplats är Skälåker. Stor parkering.  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Kollektivtrafik: Närmaste busshållplats Skälåker.", "Parkering: Stor parkering." (läst 2026-11-03)  

### Mörkö (morko) – 42 → 25 → 93 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Kålsö" försvann ur Bad och vattenliv).

- **badkomp-morko-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Klippbad) · rad 5236  
  Text: Badklipporna på Eriksö – klippbad  
  Källa: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/erikso.html — "Längs bägge sidor av ön finns vackra, betade strandängar och sköna badklippor." (läst 2026-11-03 i Chromium)  
  Not (omkontroll: SAKNAS; Redaktören: Länsstyrelsen räcker för badklippor): texten säger bara badklippor, inte ordnad eller kommunal badplats. Alla citat i KÄLLA-raden står ordagrant på reservatssidan.  
- **badkomp-morko-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 5236  
  Text: Badklippor längs båda sidorna av Eriksö på sydvästra Mörkö, i ett naturreservat i Södertälje kommun som Länsstyrelsen förvaltar. I Eriksö naturreservat ska hunden vara kopplad, och du får inte tälta eller förankra båten på samma plats mer än två dygn i följd.  
  Källa: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/erikso.html — "Längs bägge sidor av ön finns vackra, betade strandängar och sköna badklippor.", "Eriksö ligger på sydvästra Mörkö, 6 kilometer nordost om Trosa.", "Kommun: Södertälje", "Förvaltare: Länsstyrelsen", "Skyddsform: naturreservat", "I reservatet är det förbjudet att:", "medföra hund, katt eller annat husdjur som inte är kopplat", "för längre tid än två dygn i följd förankra båt vid samma plats", "för längre tid än två dygn i följd tälta på samma plats" (läst 2026-11-03 i Chromium)  
  Not: "Skyddsform: naturreservat" och "I reservatet är det förbjudet att:" tillagda i KÄLLA-raden; texten oförändrad.  
- **badkomp-morko-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 5236  
  Text: Med bil: ta av söderut vid Idala mot Eriksö, skyltat Naturreservat. Parkering finns. Från närmaste busshållplats, Idala, är det 7 km att gå.  
  Källa: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/erikso.html — "tag av söderut vid Idala", "Naturreservat", "Parkering", "Det är långt till närmaste busshållplats, som heter Idala. Därifrån är det 7 km promenad söderut till reservatet." (läst 2026-11-03)  

### Huvudskär (huvudskar) – 35 → 0 → 70 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Naturhamnar" försvann ur Bad och vattenliv).

- **badkomp-huvudskar-N001** · activity_meta.bad.note (ny), mening 1 · rad 5591  
  Text: Huvudskär finns inte bland Haninge kommuns badplatser, varken på kommunens webbplats eller hos Havs- och vattenmyndigheten, så det finns inga provsvar för badvattnet här.  
  Källa: https://www.haninge.se/uppleva-och-gora/simhallar-och-bad/badplatser/ — "Badplatser i Haninge" (läst 2026-11-03)  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-haninge-kommun.html — "Här ser du badplatserna som kommunen har registrerat." (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3). Frånvaron: ingen av listorna (15 bad på kommunens sida, 11 badplatser hos HaV) har någon plats på Huvudskär; kontrollera genom att läsa listorna.  
- **badkomp-huvudskar-N002** · activity_meta.bad.note (ny), mening 2 · rad 5591  
  Text: Skärgårdsstiftelsen, som äger och förvaltar naturreservatet, räknar bad till det man kan göra i området, och öarna består mest av kala klippor.  
  Källa: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html — "Markägare: Skärgårdsstiftelsen", "Förvaltare: Skärgårdsstiftelsen", "Öarna består oftast av kala klippor" (läst 2026-11-03)  
  Källa: https://skargardsstiftelsen.se/omraden/huvudskar/ — "Huvudskär erbjuder fantastiska möjligheter till båtliv, paddling, bad, naturupplevelser och kulturhistoriska vandringar." (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3). Värdeordet "fantastiska" är inte återgivet.  
- **badkomp-huvudskar-N003** · activity_meta.bad.note (ny), mening 3 · rad 5591  
  Text: I reservatet, som omfattar alla öar utom huvudön Ålandsskär, ska hunden vara kopplad och öppen eld är förbjuden.  
  Källa: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html — "Reservatet omfattar hela Huvudskärsarkipelagen utom huvudön Ålandsskär", "medföra hund eller annat husdjur som inte är kopplat", "göra upp öppen eld" (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3). Föreskrifter: Länsstyrelsen (läs i Chromium).  
- **badkomp-huvudskar-N004** · activity_meta.bad.note (ny), mening 4 · rad 5591  
  Text: Torrdass och sopmajor finns i området.  
  Källa: https://www.lansstyrelsen.se/stockholm/besoksmal/naturreservat/huvudskar.html — "Flera torrdass och sopmajor finns i området." (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3).  

### Öland (oland) – 66 → 29 → 134 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Ottenby och Långe Jan" försvann ur Bad och vattenliv).

- **badkomp-oland-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Badbrygga) · rad 6407  
  Text: Klinta Bodar – badplats med brygga  
  Källa: https://www.borgholm.se/badplatser/ — "Vid badplatserna Klinta Bodar och Sjöstugan finns parkering för rörelsehindrade samt ramp i anslutning till bryggan för att ta sig ned i och upp ur vattnet." (läst 2026-11-03)  
- **badkomp-oland-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 6407  
  Text: Badplats strax norr om badet i Köpingsvik i Borgholms kommun på Öland. Vid bryggan finns en ramp för att ta sig ned i och upp ur vattnet, och parkering för rörelsehindrade. Kommunen sköter renhållningen, och här finns också ett särskilt hundbad.  
  Källa: https://www.borgholm.se/badplatser/ — "Klinta bodar, strax norr om badet i Köpingsvik.", "Vid badplatserna Klinta Bodar och Sjöstugan finns parkering för rörelsehindrade samt ramp i anslutning till bryggan för att ta sig ned i och upp ur vattnet.", "Här ansvarar kommunen för renhållningen", "Klinta Bodar" (läst 2026-11-03)  
  Not: "Här ansvarar kommunen för renhållningen" följs av listan Dovreviken, Sandvik, Köpingsvik, Sjöstugan, Böda hamn, Klinta Bodar. Hundbadet står under "Särskilda hundbad finns också på följande platser".  
- **badkomp-oland-N003** · activity_meta.bad.beaches[0].insider_tip (ny) · rad 6407  
  Text: Enligt Borgholms kommuns lokala ordningsföreskrifter får hundar inte följa med till allmänna badplatser 1 juni–31 augusti, så hundbadet vid Klinta Bodar är platsen för hunden.  
  Källa: https://www.borgholm.se/badplatser/ — "Du får inte ha med dig hund till allmänna badplatser mellan 1 juni och 31 augusti, enligt kommunens lokala ordningsföreskrifter.", "Klinta bodar, strax norr om badet i Köpingsvik." (läst 2026-11-03)  
- **badkomp-oland-N004** · activity_meta.bad.beaches[1].name + type (ny; etikett Badbrygga) · rad 6409  
  Text: Sjöstugan – badplats med brygga  
  Källa: https://www.borgholm.se/badplatser/ — "Vid badplatserna Klinta Bodar och Sjöstugan finns parkering för rörelsehindrade samt ramp i anslutning till bryggan för att ta sig ned i och upp ur vattnet." (läst 2026-11-03)  
- **badkomp-oland-N005** · activity_meta.bad.beaches[1].desc (ny) · rad 6409  
  Text: Badplats i Borgholm på Öland, Borgholms kommun. Vid bryggan finns en ramp för att ta sig ned i och upp ur vattnet, och parkering för rörelsehindrade. Kommunen sköter renhållningen, och på anvisad plats finns ett hundbad.  
  Källa: https://www.borgholm.se/badplatser/ — "Sjöstugan i Borgholm, på anvisad plats.", "Vid badplatserna Klinta Bodar och Sjöstugan finns parkering för rörelsehindrade samt ramp i anslutning till bryggan för att ta sig ned i och upp ur vattnet.", "Här ansvarar kommunen för renhållningen", "Sjöstugan" (läst 2026-11-03)  

### Fårö (faro) – 63 → 26 → 110 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Langhammars raukar" försvann ur Bad och vattenliv).

- **badkomp-faro-N001** · activity_meta.bad.beaches[1].type (ny; strängen 'Ekeviken' blev badplats med beskrivning) · rad 8228  
  Text: Ekeviken – sandstrand  
  Tidigare KÄLLA-rad: KÄLLA: https://gotland.com/companies/sudersand/; https://gotland.se/.../ekeviken — "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand." (läst 2026-09-27)  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/ekeviken — "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand." (läst 2026-11-03)  
- **badkomp-faro-N002** · activity_meta.bad.beaches[1].desc (ny) · rad 8228  
  Text: Badplats på nordöstra Fårö i Region Gotland: en cirka 900 meter lång sandstrand med långgrunt vatten. Det finns slamtoaletter, soptunnor, livbojar och livbåt, och en tillgänglighetsanpassad toalett vid västra parkeringen.  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Nordöstra Fårö" (läst 2026-11-03)  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/ekeviken — "Badplatsen Ekeviken på Fårö är en cirka 900 meter lång, långgrund, sandstrand.", "Slamtoaletter", "Soptunnor", "Livbojar", "Livbåt", "Tillgänglighetsanpassad toalett vid västra parkeringen." (läst 2026-11-03)  
  Not: "Nordöstra Fårö" står under namnet i listan på regionens badplatssida.  
- **badkomp-faro-N003** · activity_meta.bad.beaches[1].directions (ny) · rad 8228  
  Text: Skyltat från väg 699, huvudvägen, och längs väg 702 som går fram till badplatsen.  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/ekeviken — "Skyltning mot badplatsen finns från väg 699, huvudvägen, samt läng väg 702 som ansluter till badplatsen." (läst 2026-11-03)  
- **badkomp-faro-N004** · activity_meta.bad.beaches[2].type (ny; strängen 'Norsta Aurar' blev badplats med beskrivning) · rad 8230  
  Text: Norsta Aurar – sandstrand  
  Tidigare KÄLLA-rad: KÄLLA: https://gotland.se/.../norsta-aurar — "Badplatsen Norsta Aurar" (läst 2026-09-27)  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar — "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand som västerut övergår i badplatsen Skär." (läst 2026-11-03)  
- **badkomp-faro-N005** · activity_meta.bad.beaches[2].desc (ny) · rad 8230  
  Text: Badplats på nordöstra Fårö i Region Gotland: en cirka fem kilometer lång sandstrand med långgrunt vatten, som västerut övergår i badplatsen Skär. Det finns slamtoaletter, soptunna och livboj.  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser — "Nordöstra Fårö" (läst 2026-11-03)  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar — "Badplatsen Norsta Aurar på Fårö är en cirka fem kilometer lång, långgrund, sandstrand som västerut övergår i badplatsen Skär.", "Slamtoaletter", "Soptunna", "Livboj" (läst 2026-11-03)  
- **badkomp-faro-N006** · activity_meta.bad.beaches[2].directions (ny) · rad 8230  
  Text: Ingen skyltning leder hit, men badplatsen nås till fots från Fårö fyr.  
  Källa: https://gotland.se/kultur-och-fritid/idrott-motion-och-friluftsliv/bad--och-besoksplatser/region-gotlands-badplatser/norsta-aurar — "Skyltning mot badplatsen saknas, men badplatsen nås till fots från Fårö fyr." (läst 2026-11-03)  

### Ven (ven) – 73 → 18 → 139 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Cykla eller vandra runt ön" försvann ur Bad och vattenliv).

- **badkomp-ven-N001** · activity_meta.bad.beaches[0].type (ny; strängen 'Kyrkbackens sandstrand' blev badplats med beskrivning) · rad 8917  
  Text: Kyrkbackens sandstrand – sandstrand  
  Tidigare KÄLLA-rad: KÄLLA: https://ilandskrona.se/besoka/ven/ven-on-for-hela-familjen/ — "Kyrkbacken med hamn och sandstrand" (läst 2026-09-27)  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-kyrkbacken/ — "Kyrkbacken har en sandstrand och vattnet är långgrunt." (läst 2026-11-03)  
  Not: De gamla KÄLLA-raderna (ilandskrona.se, norreborgshamn.se) är ersatta av Landskrona stads sidor.  
- **badkomp-ven-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 8917  
  Text: Badplats på nordvästra Ven i Landskrona stad, vid Kyrkbackens hamn: en kort sandstrand, cirka 50–100 meter, med långgrunt vatten och gräsytor runt om. Det finns brygga, toalett, fyra fasta grillplatser och livboj året om, men inga badvakter.  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-kyrkbacken/ — "Badplatsen ligger på den nordvästra sidan av Ven i anslutning till Kyrkbackens hamn. Sandstranden är kort och området vid stranden består främst av gräsytor. Stranden är cirka 50-100 meter lång.", "Kyrkbacken har en sandstrand och vattnet är långgrunt.", "Brygga", "Avgiftsfri toalett / HWC", "Här finns fyra fasta grillplatser.", "För din säkerhet finns livboj tillgänglig året om. Badplatsen har inga badvakter." (läst 2026-11-03)  
- **badkomp-ven-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 8917  
  Text: Vid Kyrkbackens hamn. Parkeringsplatserna är få, och Landskrona stad rekommenderar att du inte tar bilen till Ven.  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-kyrkbacken/ — "Badplatsen ligger på den nordvästra sidan av Ven i anslutning till Kyrkbackens hamn.", "Få parkeringsmöjligheter. Vi rekommenderas att inte ta bilen med till Ven." (läst 2026-11-03)  
- **badkomp-ven-N004** · activity_meta.bad.beaches[0].insider_tip (ny) · rad 8917  
  Text: Hundar får varken vistas eller bada på badplatsen 1 maj–30 september.  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-kyrkbacken/ — "Hundar får varken vistas eller bada på allmänna badplatser under badsäsongen, perioden 1 maj – 30 september." (läst 2026-11-03)  
- **badkomp-ven-N005** · activity_meta.bad.beaches[1].name + type (ny; strängen 'Norreborgs hamn' bytt mot stadens namn Norreborg) · rad 8919  
  Text: Norreborg – sandstrand  
  Tidigare KÄLLA-rad: KÄLLA: https://www.norreborgshamn.se/ — "Vens trevligaste sandstrand" (läst 2026-09-27)  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-norreborg/ — "Norreborg är en av tre badplatser på ön Ven. Badar du här får du uppleva fin sandstrand. Här finns också gott om möjlighet att få skugga." (läst 2026-11-03)  
  Not: Namnet: staden kallar badplatsen "Badplats Norreborg"; Norreborgs hamn (gästhamnen) är en annan sak. Den gamla KÄLLA-raden (norreborgshamn.se, "Vens trevligaste sandstrand") var en superlativ från hamnens egen sida och är borttagen.  
- **badkomp-ven-N006** · activity_meta.bad.beaches[1].desc (ny) · rad 8919  
  Text: Badplats på Ven i Landskrona stad, en av öns tre badplatser, med sandstrand och gott om skugga. Det finns brygga, toalett, två fasta grillplatser och livboj året om, men inga badvakter.  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-norreborg/ — "Norreborg är en av tre badplatser på ön Ven. Badar du här får du uppleva fin sandstrand. Här finns också gott om möjlighet att få skugga.", "Brygga", "Avgiftsfri toalett / HWC", "Här finns två fasta grillplatser.", "För din säkerhet finns livboj tillgänglig året om. Badplatsen har inga badvakter." (läst 2026-11-03)  
  Not: Värdeordet "fin" är inte återgivet.  
- **badkomp-ven-N007** · activity_meta.bad.beaches[1].insider_tip (ny) · rad 8919  
  Text: Under badsäsongen 15 juni–15 augusti kan du låna en strandrullstol här via Landskrona stads kontaktcenter. Hundar får varken vistas eller bada på badplatsen 1 maj–30 september.  
  Källa: https://www.landskrona.se/uppleva-och-gora/idrott-motion-och-friluftsliv/badplatser/badplats-norreborg/ — "en strandrullstol till utlåning", "Under sommarens badsäsong, 15 juni-15 augusti, kan den lånas", "Kontakta Landskrona stads kontaktcenter", "Hundar får varken vistas eller bada på allmänna badplatser under badsäsongen, perioden 1 maj – 30 september." (läst 2026-11-03)  
  Not: Utlåningstiderna (klockslag) står på sidan men är inte återgivna (ARBETSREGLER).  

### Öckerö (ockero) – 95 → 48 → 108 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Rördammen och hällmarkerna" försvann ur Bad och vattenliv).

- **badkomp-ockero-N001** · activity_meta.bad.beaches[0].name + type (ny; strängen 'Hjälviks badplats (sandstrand och klippor, nordvästra Öckerö)' blev badplats med beskrivning) · rad 9151  
  Text: Hjälviks badplats – sandstrand  
  Tidigare KÄLLA-rad: KÄLLA: https://www.ockero.se/.../hjalviks-badplats — "Hjälviks badplats ligger på Öckerö", "Sandstrand, gräs och klippor" (läst 2026-09-27)  
  Källa: https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/hjalviks-badplats — "Hjälviks badplats ligger på Öckerö.", "Sandstrand, gräs och klippor" (läst 2026-11-03)  
- **badkomp-ockero-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 9151  
  Text: Kommunal badplats på nordvästra Öckerö i Öckerö kommun, med sandstrand, gräs och klippor. Det finns toalett, även för funktionshindrade, ramp för funktionshindrade, volleybollplan och räddningsutrustning.  
  Källa: https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/hjalviks-badplats — "Kommunal badplats inom gulmarkerat område", "Hjälviks badplats ligger på Öckerö.", "Sandstrand, gräs och klippor", "Toalett (WC och för funktionshindrade)", "Ramp för funktionshindrade", "Volleybollplan", "Räddningsutrustning" (läst 2026-11-03)  
  Källa: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=Hj%C3%A4lvik — ""east":298585.0,"north":6402489.0" (läst 2026-11-03)  
  Källa: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=%C3%96cker%C3%B6 — ""east":300242.0,"north":6401598.0" (läst 2026-11-03)  
  Not: "Nordvästra": egen mätning i Lantmäteriets Min karta – Hjälvik (Hav och sjö) E 298585 N 6402489, Öckerö (Trakt) E 300242 N 6401598, alltså 1,7 km väster och 0,9 km norr om traktens punkt.  
- **badkomp-ockero-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 9151  
  Text: I området Prästängen, där det också finns fotbollsplaner, lekpark och skatepark. Stor avgiftsbelagd parkering, varav tre platser för funktionshindrade vid badplatsen.  
  Källa: https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/hjalviks-badplats — "I området Prästängen finns det fotbollsplaner och en inomhushall Göstahallen, ishall, lekpark, skatepark och motionsspår.", "Det finns en stor avgiftsbelagd parkering.", "Tre parkeringsplatser för funktionshindrade vid badplatsen" (läst 2026-11-03)  
- **badkomp-ockero-N004** · activity_meta.bad.beaches[0].insider_tip (ny) · rad 9151  
  Text: Hundförbud 1 maj–30 september, även för kopplade hundar. Det är eldningsförbud på badplatsen, men den fasta grillplatsen får användas.  
  Källa: https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser/hjalviks-badplats — "Hundförbud från 1 maj till 30 september", "Eldningsförbud (fast grillplats får användas)" (läst 2026-11-03)  
  Källa: https://www.ockero.se/fritid-och-kultur/idrott-motion-och-friluftsliv/badplatser — "Från den 1 maj till den 30 september råder det hundförbud på alla kommunala badplatser i Öckerö kommun. Det gäller även kopplade hundar." (läst 2026-11-03)  

### Tynningö (tynningo) – 131 → 83 → 139 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Sommarvillorna" försvann ur Bad och vattenliv).

- **badkomp-tynningo-N001** · activity_meta.bad.beaches[0].desc, ny sista mening · rad 7204  
  Text: Stora Maren var en smal havsvik och snördes av till en insjö först under senmedeltiden.  
  Källa: https://www.vaxholm.se/download/18.7540ce651827e350272a8e08/1661434105419/Bilaga%203%20-%20Kulturmilj%C3%B6underlag%20o%20.pdf — "Dagens sjö Stora Maren var vid denna tid en smal havsvik. Det är först under senmedeltid som viken snörs av och bildar en insjö." (läst 2026-11-03)  
  Not: PDF s. 24; "vid denna tid" = runt år 0 enligt meningen före.  
- **badkomp-tynningo-N002** · activity_meta.bad.beaches[0].directions, ny andra mening · rad 7204  
  Text: Maren, Myrholmsmaren och Lilla Maren bildar en sammanhängande sötvattensjö, cirka 1 500 meter lång och 100 meter bred.  
  Källa: https://www.vaxholm.se/download/18.7540ce651827e350272a8e08/1661434105419/Bilaga%203%20-%20Kulturmilj%C3%B6underlag%20o%20.pdf — "Sammanhängande sötvattensjö (Maren, Myrholmsmaren, Lilla Maren eller även kallad Trollsjön) cirka 1500 m lång och 100 m bred." (läst 2026-11-03)  
  Not: PDF s. 5 (faktarutan).  
- **badkomp-tynningo-N003** · activity_meta.bad.beaches[0].insider_tip (ny) · rad 7204  
  Text: Större delen av strandlinjen runt Tynningö är bebyggd med hus, trädgårdar och bryggor, och det finns få allmänna platser att bada vid havet.  
  Källa: https://www.vaxholm.se/download/18.7540ce651827e350272a8e08/1661434105419/Bilaga%203%20-%20Kulturmilj%C3%B6underlag%20o%20.pdf — "I och med att större delen av strandlinjen är exploaterad med hus, trädgårdar och bryggor", "det finns få allmänna platser att lägga till sin båt eller bada" (läst 2026-11-03)  
  Not: PDF s. 20.  

### Birka (birka) – 51 → 13 → 52 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Dagstur med Strömma" försvann ur Bad och vattenliv).

- **badkomp-birka-N001** · activity_meta.bad.note (ny) · rad 7469  
  Text: Badplatsen på Björkö är inte en av Ekerö kommuns kommunala badplatser och finns inte bland kommunens badplatser hos Havs- och vattenmyndigheten, så det finns inga provsvar för vattnet här, och du får själv titta efter algblomning innan du badar.  
  Källa: https://www.birkavikingastaden.se/hitta-pa-birka/ — "På ön finns även en barnvänlig badplats för ett dopp i Mälaren." (läst 2026-11-03)  
  Källa: https://www.upplevekero.se/se--gora/natur--friluftsliv/badplatser — "Här har vi samlat de kommunala badplatserna.", "Titta därför alltid på vattnet innan du badar. Det är badgästen själv som behöver bedöma om det finns algblomning." (läst 2026-11-03)  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-ekero-kommun.html — "Här ser du badplatserna som kommunen har registrerat." (läst 2026-11-03)  
  Not: Notis i stället för badplats: ingen källa anger badstrandens typ. Frånvaron: kommunens lista (Karlskär, Mörby, Stockby, Södran, Lundhagen, Närlunda, Adelsö) och HaV:s lista (8 platser) har ingen plats på Björkö.  

### Blå Jungfrun (bla-jungfrun) – 35 → 0 → 71 ord

Fil: `src/app/o/island-data.ts`. Kompensation för mall-0198 (kortet "Natur och fåglar" försvann ur Bad och vattenliv).

- **badkomp-bla-jungfrun-N001** · activity_meta.bad.note (ny), mening 1 · rad 7995  
  Text: Varken Oskarshamns kommun eller Havs- och vattenmyndighetens Badplatsen anger någon badplats på Blå Jungfrun, och ön har inga bryggor: båten lägger till direkt mot klipporna.  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-oskarshamns-kommun.html — "Här ser du badplatserna som kommunen har registrerat." (läst 2026-11-03)  
  Källa: https://www.oskarshamn.se/kultur-och-fritid/idrott-och-fritid/badplatser/havsbad/ — "Karta över kommunens havsbad" (läst 2026-11-03)  
  Källa: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/besok-parken/hitta-hit — "Landstigning sker direkt mot klipporna, eftersom det inte finns några bryggor på ön." (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3). Frånvaron: HaV:s lista (18 platser) och kommunens åtta havsbad (Bredviken, Dragskär, Gunnarsö, Havslätt, Nötö, Stångehamn Badvägen, Åsvallesund, Vånevik) omfattar inte ön; nationalparkens sida Att göra i parken har ingen badaktivitet.  
- **badkomp-bla-jungfrun-N002** · activity_meta.bad.note (ny), mening 2 · rad 7995  
  Text: När Gotlandsfärjan passerar kan svallvågorna bli upp till två meter höga, och Solkustturer uppmanar besökare att då hålla avstånd från vattnet eftersom man kan dras ut.  
  Källa: https://www.sverigesnationalparker.se/sv/upptack-nationalparkerna/bla-jungfrun-nationalpark/besok-parken/hitta-hit — "När Gotlandsfärjan passerar ön kan det bli svallvågor på upp till två meter" (läst 2026-11-03)  
  Källa: https://www.solkustturer.se/viktigt-att-veta — "Man ska då hålla sig på behörigt avstånd från vattnet eftersom det rullar in stora vågor med risk för att man dras ut i vattnet." (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3). Säkerhetsuppgift.  
- **badkomp-bla-jungfrun-N003** · activity_meta.bad.note (ny), mening 3 · rad 7995  
  Text: I Blå Jungfruns nationalpark är det förbjudet att elda, även med grill, och att ta med sig sten från ön.  
  Källa: https://www.naturvardsverket.se/4ac67d/globalassets/nfs/2014/nfs-2014-8.pdf — "elda, inklusive att använda grill", "bortföra sten" (läst 2026-11-03)  
  Not: Frånvaro (trappan steg 3). NFS 2014:8, 3 § p. 10 och 3.  

### Marstrand (marstrand) – 32 → 0 → 90 ord

Fil: `src/app/o/bohuslan-data.ts`. Kompensation för mall-0198 (kortet "Promenad runt Marstrandsön" försvann ur Bad och vattenliv).

- **badkomp-marstrand-N001** · activity_meta.bad.beaches[0].name + type + child_friendly (ny; etiketterna Sandstrand och Barnvänlig) · rad 164  
  Text: Barnbadet på Marstrandsön – sandstrand, barnvänlig  
  Källa: https://www.kungalv.se/kultur--fritid/bada/marstrands-badplats/ — "Välkommen till Barnbadet på Marstrandsön", "Sandstrand: Ja" (läst 2026-11-03)  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-kungalvs-kommun/marstrand-strandverket.html — "Marstrand strandverket är en badplats i Kungälvs kommun.", "Badstege, barnbad, hoppmöjlighet" (läst 2026-11-03 i Chromium)  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-kungalvs-kommun.html — "Här ser du badplatserna som kommunen har registrerat.", "Marstrand strandverket" (läst 2026-11-03)  
  Not (omkontroll: FEL): Barnvänlig byggde förut på namnet. Nu belagt av HaV ("barnbad"); Marstrand strandverket är den enda badplatsen på Marstrand bland Kungälvs 10 registrerade, och kommunens sida beskriver samma bad (badstegar, trampolin). Kommunens egen sida säger inget om barn.  
- **badkomp-marstrand-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 164  
  Text: Kommunal badplats med sandstrand på sydsidan av Marstrandsön i Kungälvs kommun, cirka 400 meter från färjeläget. Det finns badstegar, trampolin och toalett, men badplatsen är inte tillgänglighetsanpassad. Hundar och andra djur är inte tillåtna på badplatsen.  
  Källa: https://www.kungalv.se/kultur--fritid/bada/ — "Marstrands badplats", "Vattenprover tas regelbundet på alla kommunala badplatser.", "Tänk på att det inte är tillåtet med hundar, hästar eller andra djur på kommunala badplatser." (läst 2026-11-03)  
  Källa: https://www.kungalv.se/kultur--fritid/bada/marstrands-badplats/ — "Sandstrand: Ja", "Marstrands badplats ligger på sydsidan av Marstrandsön, cirka 400 meter från färjeläget.", "Badstegar: Ja", "Trampolin: Ja", "Toalett: Ja", "Tillgänglighetsanpassad för personer med funktionsvariation: Nej" (läst 2026-11-03)  
- **badkomp-marstrand-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 164  
  Text: Vid Hamngatan på Marstrandsön. Parkering finns på Koön, 100–1 000 meter från färjan; de närmaste platserna är ofta fulla under högsäsongen.  
  Källa: https://www.kungalv.se/kultur--fritid/bada/marstrands-badplats/ — "Hamngatan, Marstrandsön", "Det finns parkeringar på Koön, 100-1000 meter från färjan. Tänk på att det ofta är fullt på de närmsta parkeringarna under högsäsongen." (läst 2026-11-03)  
- **badkomp-marstrand-N004** · activity_meta.bad.beaches[0].insider_tip (ny) · rad 164  
  Text: Badstegarna runt ön sätts ut i mitten av maj, men en på södra och en på norra Marstrandsön ligger kvar året runt, liksom en badtrappa och en badramp på Hedvigsholmen.  
  Källa: https://www.kungalv.se/kultur--fritid/bada/marstrands-badplats/ — "Alla badstegar sätts ut varje år i mitten av maj månad.", "Det finns däremot några stegar utsatta runt Marstrandsön som ligger i året runt.", "1 badstege på södra Marstrandsön", "1 badstege på norra Marstrandsön", "1 badtrappa och 1 badramp på Hedvigsholmen" (läst 2026-11-03)  

### Smögen (smogen) – 33 → 11 → 91 ord

Fil: `src/app/o/bohuslan-data.ts`. Kompensation för mall-0198 (kortet "Soteleden" försvann ur Bad och vattenliv).

- **badkomp-smogen-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Sandstrand) · rad 307  
  Text: Sandö – sandstrand  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/smogen — "Badplatsen Sandö på Smögen", "Sandstrand med bryggor, badstegar och handikapptrappa." (läst 2026-11-03)  
- **badkomp-smogen-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 307  
  Text: Kommunal badplats på Smögen i Sotenäs kommun, med sandstrand, bryggor, badstegar och handikapptrappa. Det finns omklädningsrum, toalett och handikapptoalett, grillplats och parkering.  
  Källa: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html — "Det finns cirka 20 större kommunala badplatser.", "Smögen - Sandö, Vallevik och herr- och dambadet vid Makrillviken" (läst 2026-11-03)  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/smogen — "Sandstrand med bryggor, badstegar och handikapptrappa. Omklädningsrum, toalett och handikapptoalett. Där finns också gillplats och parkering." (läst 2026-11-03)  
  Not: "gillplats" på kommunens sida är skrivfel för grillplats.  
- **badkomp-smogen-N003** · activity_meta.bad.beaches[0].insider_tip (ny, omskriven) · rad 307  
  Text: Enligt Sotenäs kommuns lokala ordningsföreskrifter får hundar inte vistas på Sandö, Vallevik och herr- och dambadet vid Makrillviken från 1 maj till 30 september. Resten av året ska hunden vara kopplad där.  
  Källa: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html — "inte får ha hunden med dig när du uppehåller dig på ordnad badplats.", "Smögen - Sandö, Vallevik och herr- och dambadet vid Makrillviken" (läst 2026-11-03 i Chromium)  
  Källa: https://www.sotenas.se/download/18.4238e10118c6050f88a47254/1703149528362/G%C3%A4llande%20lokala%20ordningsf%C3%B6reskrifter%20KF%202022-03-23%20Lst%202022-05-02.pdf — "Allmänna lokala ordningsföreskrifter för Sotenäs kommun", "Under tiden f r om 1 maj t o m 30 sept får hundar inte vistas på i § 3 i dessa föreskrifter", "Hundar ska hållas kopplade på begravningsplatser och badplatser vilka är angivna i § 3 i", "Smögen – Sandö, Vallevik och herr- och dambadet vid Makrillviken" (läst 2026-11-03)  
  Not (omkontroll: FEL): förut "Hundar får inte bada …", för snävt. Föreskrifterna (KF 2022-03-23 § 33, i kraft 2 maj 2022) är nivå 1. Undantaget för ledarhund och polishund i tjänst (16 §) är inte återgivet.  
- **badkomp-smogen-N004** · activity_meta.bad.beaches[1].name + type (ny; etikett Klippbad) · rad 309  
  Text: Herr- och dambadet vid Makrillviken – klippbad  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/smogen — "Herr- och dambadet, Makrillviken", "Klippor med bryggor och badstegar." (läst 2026-11-03)  
- **badkomp-smogen-N005** · activity_meta.bad.beaches[1].desc (ny) · rad 309  
  Text: Kommunal badplats vid Makrillviken på Smögen i Sotenäs kommun: klippor med bryggor och badstegar. Omklädningsrum och toalett finns i vandrarhemmet.  
  Källa: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html — "Smögen - Sandö, Vallevik och herr- och dambadet vid Makrillviken" (läst 2026-11-03)  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/smogen — "Klippor med bryggor och badstegar. Omklädningsrum och toalett i vandrarhemmet." (läst 2026-11-03)  

### Kungshamn (kungshamn) – 33 → 12 → 78 ord

Fil: `src/app/o/bohuslan-data.ts`. Kompensation för mall-0198 (kortet "Nordens Ark" försvann ur Bad och vattenliv).

- **badkomp-kungshamn-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Klippbad) · rad 1378  
  Text: Fisketången – klippbad  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn — "Fisketångens badplats i Kungshamn", "Klippbad med sandstrand." (läst 2026-11-03)  
- **badkomp-kungshamn-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 1378  
  Text: Kommunal badplats i Kungshamn i Sotenäs kommun: klippbad med sandstrand och bryggor med badstegar. Det finns handikappramp, omklädningsrum, toalett och handikapptoalett, och en liten parkering.  
  Källa: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html — "Det finns cirka 20 större kommunala badplatser.", "Kungshamn - Fisketången, Stenbogen och Ramnerer" (läst 2026-11-03)  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn — "Klippbad med sandstrand. Bryggor med badstegar. Handikappramp, omklädningsrum, toalett och handikapptoalett.", "finns också en liten parkering" (läst 2026-11-03)  
- **badkomp-kungshamn-N003** · activity_meta.bad.beaches[0].insider_tip (ny, omskriven) · rad 1378  
  Text: Pontonbryggan leder ut till Klövvholmen, där du kan hitta en egen vrå. Enligt Sotenäs kommuns lokala ordningsföreskrifter får hundar inte vistas på Fisketången, Stenbogen och Ramnerer från 1 maj till 30 september. Resten av året ska hunden vara kopplad där.  
  Källa: https://www.sotenas.se/uppleva--gora/idrott-motion-och-friluftsliv/friluftsliv-och-motion/badplatser-hundbad/kungshamn — "Vill du hitta din egen vrå så går du ut på pontonbryggan som leder till", "Klövvholmen!" (läst 2026-11-03)  
  Källa: https://www.sotenas.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.6a5776e415ae3419826ea424.html — "inte får ha hunden med dig när du uppehåller dig på ordnad badplats.", "Kungshamn - Fisketången, Stenbogen och Ramnerer" (läst 2026-11-03 i Chromium)  
  Källa: https://www.sotenas.se/download/18.4238e10118c6050f88a47254/1703149528362/G%C3%A4llande%20lokala%20ordningsf%C3%B6reskrifter%20KF%202022-03-23%20Lst%202022-05-02.pdf — "Under tiden f r om 1 maj t o m 30 sept får hundar inte vistas på i § 3 i dessa föreskrifter", "Hundar ska hållas kopplade på begravningsplatser och badplatser vilka är angivna i § 3 i", "Kungshamn – Fisketången, Stenbogen och Ramnerer" (läst 2026-11-03)  
  Not (omkontroll: FEL): samma som Smögen; meningen om Klövvholmen står kvar.  
### Grebbestad (grebbestad) – 30 → 0 → 73 ord

Fil: `src/app/o/bohuslan-data.ts`. Kompensation för mall-0198 (kortet "Gästhamnarna" försvann ur Bad och vattenliv).

- **badkomp-grebbestad-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Badbrygga) · rad 676  
  Text: Grebbestads badplats – badbrygga  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/grebbestad.html — "Grebbestad är en badplats i Tanums kommun", "Badbrygga finns vid badplatsen." (läst 2026-11-03)  
  Not: HaV-sidans badvattenprofil laddas med JavaScript: läs i Chromium.  
- **badkomp-grebbestad-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 676  
  Text: Badplats i Grebbestad i Tanums kommun, med badbrygga, grus- och sandbotten och en stor gräsmatta. Under badsäsongen är det tillsyn två eller fler gånger i veckan. Havs- och vattenmyndigheten klassade badvattnet som utmärkt 2025 och bra 2023 och 2024.  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/grebbestad.html — "Grebbestad är en badplats i Tanums kommun", "Badbrygga finns vid badplatsen.", "Grus/sandbotten", "Stor gräsmatta som klipps mycket regelbundet.", "Tillsyn två eller fler gånger i veckan under badsäsong.", "2025: ★★★ Utmärkt kvalitet", "2024: ★★ Bra kvalitet", "2023: ★★ Bra kvalitet" (läst 2026-11-03)  
  Not: Läs i Chromium.  
- **badkomp-grebbestad-N003** · activity_meta.bad.beaches[1].name + type (ny; etikett Badbrygga) · rad 679  
  Text: Tanum Strand – badbrygga  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/tanum-strand.html — "Tanum Strand är en badplats i Tanums kommun", "Badbrygga och flyflotte finns vid badplatsen." (läst 2026-11-03)  
  Not: Läs i Chromium.  
- **badkomp-grebbestad-N004** · activity_meta.bad.beaches[1].desc (ny) · rad 679  
  Text: Badplats vid Tanum Strand strax söder om Grebbestad i Tanums kommun, med badbrygga, flytflotte och handikappramp. Här finns berg och en stor gräsmatta, och botten är berg, grus och sand.  
  Källa: https://www.tanum.se/upplevagora/idrottmotionochfriluftsliv/friluftslivochmotion/badplatser.4.7664b4813898b7df9845725.html — "På badplatserna vid Badberget i Fjällbacka, Tanum Strand strax söder om Grebbestad, Östad samt Edsviksbadet finns handikappramper" (läst 2026-11-03)  
  Källa: https://www.havochvatten.se/badplatser-och-badvatten/kommuner/badplatser-i-tanums-kommun/tanum-strand.html — "Badbrygga och flyflotte finns vid badplatsen.", "Berg och stor gräsmatta som klipps mycket regelbundet.", "Berg och grus/sandbotten" (läst 2026-11-03)  
  Not: "flyflotte" på HaV-sidan är skrivfel för flytflotte. Läs i Chromium.  

### Klädesholmen (kladesholmen) – 72 → 46 → 103 ord

Fil: `src/app/o/bohuslan-data.ts`. Kompensation för mall-0198 (kortet "Sillebua" försvann ur Bad och vattenliv).

- **badkomp-kladesholmen-N001** · activity_meta.bad.beaches[0].name + type (ny; etikett Sandstrand) · rad 1895  
  Text: Klädesholmens badplats – sandstrand  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Om Klädesholmens badplats", "Badplatsen har betongbrygga, en liten sandstrand, klippor, badbrygga och toaletter." (läst 2026-11-03)  
- **badkomp-kladesholmen-N002** · activity_meta.bad.beaches[0].desc (ny) · rad 1895  
  Text: Badplats på Klädesholmen i Tjörns kommun, strax efter bron på Koholmens östra sida. Här finns betongbrygga, badbrygga, en liten sandstrand, klippor och toaletter. Badplatsen är inte tillgänglighetsanpassad och sköts sommartid av Klädesholmens intresseförening, som också håller simskola.  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Om Klädesholmens badplats", "Badplatsen ligger strax efter bron på Koholmens östra sida.", "Badplatsen har betongbrygga, en liten sandstrand, klippor, badbrygga och toaletter.", "Badplatsen är inte tillgänglighetsanpassad.", "Badplatsen sköts sommartid av Klädesholmens intresseförening, som också anordnar simskola." (läst 2026-11-03)  
- **badkomp-kladesholmen-N003** · activity_meta.bad.beaches[0].directions (ny) · rad 1895  
  Text: Parkering till höger efter bron, 100 meter från badet. Busshållplats: Klädesholmen östra.  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Parkeringsplats finns till höger efter bron och härifrån är det 100 meter till badet.", "Med buss: Hållplats Klädesholmen östra." (läst 2026-11-03)  
- **badkomp-kladesholmen-N004** · activity_meta.bad.beaches[0].insider_tip (ny) · rad 1895  
  Text: Hundar får inte vistas på badplatsen.  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada — "Hund får inte vistas på: Badplats eller lekplats." (läst 2026-11-03)  

### Dyrön (dyron) – 119 → 86 → 158 ord

Fil: `src/app/o/bohuslan-data.ts`. Kompensation för mall-0198 (kortet "Vandring" försvann ur Bad och vattenliv).

- **badkomp-dyron-N001** · activity_meta.bad.beaches[2].name + type (ny; ersätter Hala vid Sydhamnen, etikett Sandstrand) · rad 2154  
  Text: Dyröns badplats – sandstrand  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Dyröns badplats ligger cirka 300 meter österut från färjeläget och Dyröns norra hamn.", "Dyröns badplats har en liten sandstrand, badbryggor och klippor. Toalett finns vid småbåtshamnen." (läst 2026-11-03 i Chromium)  
  Not (omkontroll: SAKNAS): Hala vid Sydhamnen fanns bara hos Dyröns samhällsförening, inte hos kommunen eller HaV; posten är ersatt med kommunens badplats. RESONERAT: den kan vara samma plats som strängen "Nordhamnens badplats med pontonbrygga och sandstrand", men ingen källa säger det, så strängen står kvar.  
- **badkomp-dyron-N002** · activity_meta.bad.beaches[2].desc (ny, omskriven) · rad 2154  
  Text: Badplats i Tjörns kommun, cirka 300 meter öster om färjeläget och Dyröns norra hamn, med en liten sandstrand, badbryggor och klippor. Badplatsen är delvis tillgänglighetsanpassad med en bred trappa som sluttar svagt ner i vattnet, och toalett finns vid småbåtshamnen. Dyröns samhällsförening sköter badplatsen sommartid och håller simskola.  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Dyröns badplats ligger cirka 300 meter österut från färjeläget och Dyröns norra hamn.", "Dyröns badplats har en liten sandstrand, badbryggor och klippor. Toalett finns vid småbåtshamnen.", "Badplatsen är delvis tillgänglighetsanpassad med en bred trappa svagt sluttande ner i vattnet.", "Badplatsen sköts sommartid av Dyröns samhällsförening, som också anordnar simskola." (läst 2026-11-03 i Chromium)  
- **badkomp-dyron-N003** · activity_meta.bad.beaches[2].directions (ny) · rad 2154  
  Text: Färjan från Rönnängs brygga går till Dyröns norra hamn. Parkeringen i Rönnäng är begränsad, och sommartid hänvisas besökare till parkeringen vid Tjörns ishall, cirka 20 minuters promenad från färjan.  
  Källa: https://www.tjorn.se/kultur-fritid-och-turism/natur-och-friluftsliv/bada/badplatser — "Med buss: Hållplats, Rönnängs brygga – färja vidare till Dyröns norra hamn.", "Från Rönnängs brygga går en personfärja till Tjörnekalv, Åstol och Dyrön.", "Parkeringsmöjligheterna i Rönnäng är begränsade och besökare hänvisas sommartid till parkeringen vid Tjörns ishall (ca 20 min promenad till färjan)." (läst 2026-11-03 i Chromium)  
## Ändrat i befintligt innehåll (utöver nya fält)

- **Ven:** strängen `'Norreborgs hamn'` heter nu `Norreborg`, som badplatsen heter hos Landskrona stad ("Badplats Norreborg"); Norreborgs hamn är gästhamnen. KÄLLA-raderna ilandskrona.se ("Kyrkbacken med hamn och sandstrand") och norreborgshamn.se ("Vens trevligaste sandstrand", en superlativ från hamnens egen sida) är borttagna; stadens badplatssidor ersätter dem.
- **Öckerö:** strängen `'Hjälviks badplats (sandstrand och klippor, nordvästra Öckerö)'` blev badplatsen `Hjälviks badplats` med beskrivning. "Nordvästra" är nu belagt med egen mätning i Lantmäteriets Min karta (Hjälvik, Hav och sjö, E 298585 N 6402489; Öckerö, Trakt, E 300242 N 6401598: 1,7 km väster och 0,9 km norr). Den gamla KÄLLA-raden (läst 2026-09-27) är ersatt.
- **Fårö:** strängarna `'Ekeviken'` och `'Norsta Aurar'` blev badplatser med beskrivning, samma namn. `'Sudersandstranden'` står kvar som sträng (Region Gotlands lista har ingen Sudersand).
- **Dyrön:** strängen `'Hala vid Sydhamnen med trampolin och 3-meterstorn'` blev först badplatsen `Hala vid Sydhamnen`; efter omkontrollen är den ersatt med kommunens `Dyröns badplats` (sist i listan). Citaten om Hala är strukna ur KÄLLA-raden ovanför `bad`, som nu bara stöder de två strängarna. Med-barn-sidans "Badmöjligheter" (de två första namnen) visar Nordhamnen och sandstranden på östra sidan. Aktiviteten Bad (bohuslan-data.ts:2075) nämner fortfarande Hala med dyron.se som källa; den hör till Dyröns egen granskning.
- **Tynningö:** Myrholmsmaren fick en sista mening i desc, en andra mening i directions och ett insidertips; resten av posten är oförändrad.
- **Birka:** `activity_meta` fick `bad` bredvid `cykel`, som är oförändrad.

## Iakttagelser

1. **Platsdatabasen gick inte att läsa** (Supabase: "Database is possibly not accessible at the moment"). `utanDubbletter` i badsidan döljer en badplats ur databasen om namnet liknar en badplats i ödatan. Jag har inte kunnat se om något av de nya namnen (t.ex. Björkholmen, Gålö havsbad, Fisketången, Sandö, Klinta Bodar) döljer ett databaskort med egen text. RESONERAT, inte MÄTT. Bör kontrolleras när databasen är i gång.
2. **Grebbestad** saknar `seoDescription`; standardbeskrivningen på /o/grebbestad tar nu med "badplatser", eftersom ön har badplatser i datan (src/app/o/[slug]/page.tsx, harBadData). Det stämmer med det nya innehållet. Marstrand har egen seoDescription och påverkas inte.
3. **Havs- och vattenmyndigheten anger "Vattentyp: Hav" för Myrholmsmaren**, som enligt Vaxholms stad och landskapsanalysen ligger vid sötvattensjön Stora Maren. Jag använde inte HaV-uppgiften för Tynningö. Badvattnet där är "Ej klassificerad" 2023–2025.
4. **Saltasvikens badplats (Öckerö):** kommunens sida (uppdaterad 2025-12-04) säger "Just nu pågår byggnation" av en ny brygga och länkar till nyheter från maj–juni 2024. Läget i dag går inte att avgöra, så platsen är inte tillagd.
5. **Tanums kommun** länkar en tillsynslista från 2021 (tre kommunala badplatser i Grebbestad). Den är inte använd i texten eftersom den är fem år gammal; HaV:s badvattenprofil (2026) är använd i stället.
6. **Birka:** kortet "Bad i Mälaren" (fanns före) säger "barnvänlig badstrand och klippor". Strömmas FAQ ("Ja, det finns en badstrand och klippor att bada ifrån") och Birka Vikingastaden ("barnvänlig badplats") stöder det tillsammans. Ingen källa anger strandens typ, därför blev Birkas tillägg en notis och ingen badplats med typetikett.
7. **Blå Jungfrun:** nationalparkens föreskrifter (NFS 2014:8) förbjuder inte bad, men det står inte heller någonstans att man badar där. Notisen säger därför bara vad som saknas (badplats, bryggor) och vad som gäller (svallvågor från Gotlandsfärjan, eldnings- och stenförbud). Kopplad hund nämns inte: badsidans allmänna ruta säger redan att hunden alltid ska vara kopplad i nationalparker.
8. **Ord som inte är återgivna:** kommunernas värdeord ("vackra", "fin", "fantastiska", "skärgårdens längsta sandstrand") och klockslag (strandrullstolen på Norreborg lånas ut måndag–fredag med angivna tider; toaletternas öppettider på Ven) står inte i texten.
9. **Utfyllnadstestet:** varje ny mening nämner platsen eller en regel som källan knyter till just den badplatsen. Gränsfall för Kontrollanten: Klädesholmens "Hundar får inte vistas på badplatsen." och Marstrands "Hundar och andra djur är inte tillåtna på badplatsen." följer av kommunens regel för alla dess badplatser (Tjörn och Kungälv). Jag bedömer dem som platsuppgifter, inte utfyllnad. RESONERAT.

## Inte gjort

- Inga öar saknade badsida: /o/[slug]/bad byggs för alla öar och länkas från varje ösida ("Mer om …").
- Inga sidmallar, transit-stops.ts, trafiklab.ts, ferries.ts eller islandCoords.ts är ändrade. kallor.generated.ts är omgenererad med scripts/generera-kallor.mjs, som uppdraget säger. (Första rundan. I omarbetet ändrades badsidans mall, se sista avsnittet och mall-N004.)
- Inget committat. Före-kopior av datafilerna ligger i work-badkomp/ (island-data.fore.ts, bohuslan-data.fore.ts).

## Omarbete efter omkontrollen (badkomp.beslut.tsv, Redaktören 2026-11-03)

Gjort 2026-11-03 (läsningar) och slutfört 2026-11-07 (kontroller). Arbetskopia: /home/claude/svalla-mallar, inget committat. Detaljer per registerrad: ut/mallar.omarbete3.md.

| Rad | Fynd | Åtgärd |
|---|---|---|
| badkomp-marstrand-N001 | FEL: Barnvänlig byggde på namnet | Står kvar, nu belagt av HaV: "Badstege, barnbad, hoppmöjlighet" (Marstrand strandverket, enda badplatsen på Marstrand i Kungälvs HaV-lista). KÄLLA-rad till HaV tillagd. |
| badkomp-smogen-N003 | FEL: hundregeln för snäv | Omskriven efter de lokala ordningsföreskrifterna (PDF, nivå 1): hundar får inte vistas på badplatserna 1 maj–30 september, kopplade resten av året. |
| badkomp-kungshamn-N003 | FEL: samma | Samma; Klövvholmen står kvar. |
| badkomp-musko-N004 | FEL: typen klippbad | Typen stenstrand (ny i IslandBeach, etikett Stenstrand). Ingen text om kommunal badplats. |
| badkomp-morko-N001 | SAKNAS (Redaktören: Länsstyrelsen räcker) | Text oförändrad; KÄLLA-raden prövad i Chromium och kompletterad med "Skyddsform: naturreservat" och "I reservatet är det förbjudet att:" (även N002). |
| badkomp-dyron-N001, N002 | SAKNAS, FEL: Hala bara hos samhällsföreningen | Ersatt med kommunens "Dyröns badplats" med kommunens text; ny rad N003 (vägbeskrivning). |

Följdändring i badsidan (MÄTT): dubblettkontrollen gjorde "Dyröns badplats" (och redan förut "Klädesholmens badplats") till "badplats" och tog bort Kåreviks badplats ur listan. Ett sådant namn jämförs nu bara exakt (src/app/o/[slug]/bad/page.tsx, mall-N004), så Dyrön behåller och Klädesholmen får tillbaka "Badplatser nära …: Kåreviks badplats".

Kontroller efter omarbetet (2026-11-07): `npx tsc --noEmit` 0 fel; `node scripts/verify-claims.mjs` exit 0, samma utdata som efter badkompensationen; `node scripts/generera-kallor.mjs` omgenererad, 101 av 101 öar, 1 627 källor (+3: HaV Marstrand strandverket, Sotenäs ordningsföreskrifter för Smögen och Kungshamn), `--kontroll` aktuell; alla 82 URL–citat-par i de ändrade registerraderna står i den sida som lästes (work-mallar3/skript/kolla_citat.py); kontrollera_register.py: inga formfel.

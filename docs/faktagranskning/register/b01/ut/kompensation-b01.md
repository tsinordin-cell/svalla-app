# Lag 3-kompensation, batch 01 (Toms beslut 10, C), 2026-11-17

## Mätning
- Riktiga namn och texter: SELECT i restaurants 2026-11-17 (108 synliga platser inom alla nio öars sökrutor, `left(description, 241)`, kontrollerat med md5 mot databasen). Inget skrevs till databasen.
- Main ce275b2 och kopian (main + mallar-arbetskopia.patch + de nio öarnas edits.json) mätta med samma uttag och matt7-skriptet. "Efter" har också öarnas SQL (ut/*.sql och mallar.sql: namn, text, typ, ö och läge) lagd på uttaget, alltså läget efter inläggningen.
- Låtsasdatabasen gav andra brister: Möja restauranger 23 ord var låtsasnamnen (riktiga namn: 133 av 133, 100 %). Husarö hamnar var i stället mycket större (se nedan).

## Sidorna (ord, riktiga namn; main → före → efter)
| Sida | Main | Före | Efter | Andel |
|---|---|---|---|---|
| /o/husaro/hamnar | 248 | 102 (153 utan öarnas SQL) | 247 | 99,6 % |
| /o/storholmen/komma-dit | 300 | 231 | 305 | 101,7 % |
| /o/styrso/restauranger | 340 | 312 (284 utan SQL) | 359 | 105,6 % |
| /o/husaro/bad | 306 | 287 | 298 | 97,4 % |
| /o/moja/restauranger | 133 | 133 | 133 | 100 % (ingen ändring) |

Orsaken på Husarö hamnar: main listade Finnhamns hamnar (2,9 och 3,0 km) som nära Husarö. Efter Toms beslut 3 (radie 1,5 km) faller de bort, och husaro.sql döper om databasposten till "Husarö Handel gästhamn", så den visas inte två gånger.

## Tillägg (allt i island-data.ts, nya poster sist i edits.json; inga nya SQL-satser)
**Husarö, harbors[0].desc** (husaro.edits.json post 18; husaro-N009–N022): avgiften beror på säsongen, inre delen avråds för segelbåtar, Husarö Handel tittar till hamnen varje dag, toaletterna betalas via sms, trädäck vid land, lanthandeln cirka 300 m bort, färskvatten vid Husarö Handels Klintan vid Klintsundet på Ljusterö (ekologisk lanthandel, sjöstation och gästhamn). Finnhamns tre gästhamnar: Paradisviken (Djupfladen) 3,4 km fågelvägen sydväst om Husarö brygga med vatten, el och wifi, Vandrarhemsviken med ett tjugotal platser med el och vatten och toatömning, var hamnavgiften betalas, och Söder Långholm (flytbrygga, bara stäv- och akterförtöjning).
- Källor: husarohandel.se och /husar-handel---om-oss (nivå 2), finnhamn.se/hamnar/ (Finnhamns Arkipelag AB, nivå 2), Lantmäteriets ortnamn (Djupfladen; adresspunkten Husarö brygga 1). Avståndet är uppmätt (3,45 km, 218 grader, SWEREF 99 TM till WGS 84, haversine); metoden står i KÄLLA-raden.
- Finnhamn skrivs i Husarös hamnpost, inte som egen post: en egen post i `harbors` skulle visas som Husarös hamn i FAQ, jämförelser och /oar.

**Husarö, activities[1] Bad** (post 19; husaro-N023): "Enligt Österåkers kommun finns det många platser att bada på Husarö." Källa: osteraker.se, Öar i Österåkers skärgård (nivå 1).

**Storholmen, getting_there[0].desc** (storholmen.edits.json post 15; storholmen-N009–N013): turerna angör Mor Annas brygga och går tillbaka via Sticklinge brygga, Ekudden och Tranholmen, promenaden till sjökrogen från östra och södra bryggan, information vid isläggning på sl.se och vid hållplatserna, linje 80 också Ropsten–Nybroplan med bryggorna, 30 cyklar på den sträckan. Ingen restid eller avgångstid för Nybroplan. Källor: lidingo.se/…/batpendla/ (nivå 1), storholmensjokrog.se (Chromium, nivå 2). En ny post i getting_there valdes bort, eftersom titeln och /oar-kategorierna läser metoderna och från-orterna.

**Styrsö, restaurants[2] och [3]** (styrso.edits.json post 24; styrso-N035–N040): Båtebacken drivs av Börjessons sjötaxi & charterbåtar, och farleden Snobbrännan går utanför fönstret med Brännö och Känsö bortom. Astri är restaurang och bar, lunch i restaurangen, i baren eller på terrassen när vädret tillåter, och frukostbuffén är öppen även för den som inte bor på hotellet. Källor: batebacken.se och kusthotelletstyrso.se/restaurangen/ (nivå 2). Inga priser eller öppettider.

Alla citat är utan klockslag och belopp. Publicerad text har inga tankstreck. 56 citat i 10 nya KÄLLA-rader står ordagrant i de sparade källtexterna (scratchpad b01/komp/kallor/, lästa 2026-11-17).

## Kontroller (2026-11-17)
- Torrkörning mot origin/main ce275b2 med applicera.mjs --torr: fjaderholmarna 45, grinda 22, husaro 19, moja 35, sandhamn 31, storholmen 15, styrso 24, uto 35, vaxholm 41, alla med 0 fel.
- Ny kopia /home/claude/svalla-komp (ce275b2, patchen och alla nio edits.json, 267 poster inlagda): `npx tsc --noEmit -p .` 0 fel · `node scripts/verify-claims.mjs` exit 0 (2 kända i baslinjen) · `node scripts/generera-kallor.mjs` 101 öar, 1 751 källor, `--kontroll` aktuell · `npx vitest run src/lib` 76 filer, 782 test gröna.
- Lag 3, alla nio öars 81 sidor med riktiga namn: 0 under 95 % med öarnas SQL och 0 utan den. Lägsta andelar: Vaxholm hamnar 96,6 %, Husarö bad 97,4 %, Möja hamnar 97,9 %.
- kontrollera_register.py (husaro, storholmen, styrso): inga formfel, inga grundrader utan motsvarighet. 26 nya rader, alla med dom KORREKT och åtgärden NY. Kolumnen kontrollant är tom.
- Kopian är borttagen. Inget är committat och inget i databasen är ändrat.

## Till Redaktören
1. Husarö hamnar har 247 ord, och Lag 3 kräver 236 (main 248). Hälften av tillägget gäller Finnhamn och motsvarar det som main redan visade som "nära Husarö". Bedöm om det godtas som innehåll för Husarö.
2. Mätningen förutsätter att husaro.sql läggs in. Utan den visas databasposten för Husarö hamn två gånger, och sidan får 298 ord.

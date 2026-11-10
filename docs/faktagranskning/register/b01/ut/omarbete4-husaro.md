# Omarbete runda 4 – Husarö (Granskaren och Skribenten, 2026-11-10)

Filer: register/b01/husaro.tsv (17 rader ändrade, 4 nya: N005–N008; 301 rader, alla med 15 kolumner), ut/husaro.edits.json
(17 poster: nr 15 och 16 nya, nr 3, 4, 7, 10, 11 och 14 ändrade), ut/husaro.sql (samma 6 UPDATE; nya KÄLLA-kommentarer utan UPDATE
för rad 0256 och 0268). Arbetsfiler, sidkopior, OSM-utdrag och skript: scratchpad/b01/omk4-husaro/. Källtexter också i kallcache/ny/ (*2026-11-10*).
Ingen P0. Lästa 2026-11-10: husarohandel.se (startsidan och om oss), husaro.se (om-husaro, lankar), länsmuseet, Österåkers kommun,
Skärgårdsstiftelsen (Finnhamn), Waxholmsbolagets tabell 10, 12 och 13 (pdftotext -layout och -bbox; samma PDF:er som 2026-11-07) och
OpenStreetMaps API (relation 11665504 och två kartutdrag, med paus mellan anropen). Databasen är inte läst.

## Ändrade och nya registerrader (dom → åtgärd: ändring; källa; post i edits.json)
- 0089 KORREKT → DELVIS, STRYK+KOMPENSERA (f21-k053): «i byn» struket ur description[1]. Kompensation N006: «Västra delen av ön är i stort
  sett obebyggd och den östra mer bebyggd». husaro.se/om-husaro. Nr 3 (KÄLLA) och nr 4 (text).
- 0090, 0091 KORREKT → DELVIS, PRECISERA (utanför listan, samma mening): «längre ut» står inte i källan; meningen skrivs som källan:
  «på en vandring skiftar kulturlandskapet med ängar och lövträd till tallskog och släta klippor». Nr 4. 0093: läst igen, ny text. Nr 4.
- 0108 KORREKT → DELVIS, PRECISERA (f21-k053, «också i island-data.ts:3757» = activities[0] Vandring): «i byn» bort. 0107 (utanför listan,
  samma mening): «bara 2,5 km» → «ungefär 2,5 km», som källan. Nr 15 (ny).
- 0127 OBELAGD, PRECISERA → STRYK+KOMPENSERA (full-05 utanför-2): djupuppgiften var redan struken i nr 7, men inget kompenserade. Nu:
  «Gästplats bokas via Dockspot, och avgiften beror på säsongen» (N007, N008). KÄLLA-raden hade två URL:er; nu en per rad, och den citerar inte
  djupet. husarohandel.se, länsmuseet. Nr 7.
- 0190 KORREKT, BEHÅLL → PRECISERA (full-05 utanför-1): «… vid Klintsundet på Ljusterö, tvärs över Gälnan». Startsidan säger «tvärs över
  Gälnan»; om oss-sidan säger «vårt andra ställe på Ljusterö, vid Klintsundet» (Kontrollanten läste bara startsidan). N005. Nr 10.
- 0192 KORREKT, BEHÅLL (f24-k093): KÄLLA-rad ny med tabell 12 och 13. Uppmätt tur för tur i vår- och hösttabellerna: Åsättra 35–60 min (tabell 10),
  Hummelmora på Ljusterö minst 50 min och Lillsved minst 1 tim 22 min (tabell 12, tur 1203), Boda brygga minst 1 tim 15 min (tabell 13, tur 1375),
  Strömkajen minst 2 tim 20 min. Påståendet håller. Nr 11.
- 0073 KORREKT → FEL, RÄTTA (f12-k042): peak 'Juli' → 'Sommar'. Länsmuseet: «sommartid är det desto livligare». Fältet visas inte. Nr 14.
- 0061, 0062 KORREKT → FEL, RÄTTA (f12-k042, månadskalendern): juli och augusti peak → open. Ingen källa anger en högsäsong. Nr 14.
- 0063 KORREKT → FEL, RÄTTA (f24-k095): september open → limited; samma vår- och hösttabell som maj och oktober (tabell 10 och 13). Nr 14.
  Skalan står i en kommentar ovanför months: Öppet juni–augusti (livligare sommartid, lanthandelns lättare maträtter under sommarperioden),
  Begränsad service övriga månader (båten går hela året). April och november var redan Begränsad service i nr 14.
- 0068 KORREKT → OBELAGD, PRECISERA (utanför listan, följer av 0073): bestReason «Försommar före högsäsongen: …» → «Försommar: …». Nr 14.
- 0256 KORREKT, BEHÅLL (f22-k049): KÄLLA-rad ny. Uppmätt i OSM: platsen ligger 14 m från Finnhamns brygga (nod 2927541101) och 2,88 km från
  Husarös nål (sidan visar 2,9 km). Skärgårdsstiftelsen belägger hamnen på Finnhamn. KÄLLA-kommentar i husaro.sql, ingen UPDATE.
- 0268 KORREKT, BEHÅLL (f26-k084): KÄLLA-rad ny. Uppmätt i OSM: 68 m från noden Söder Långholm (4028481185, leisure=marina) och 3,00 km från
  nålen. KÄLLA-kommentar i husaro.sql, ingen UPDATE.
- 0015 KORREKT, BEHÅLL → DELVIS, RÄTTA (Toms beslut 3): radiusKm 2.0 → 1.5. Nr 16 (ny), se nedan.
- N005–N008 NY: tvärs över Gälnan (husarohandel.se), väst och öst (husaro.se/om-husaro), Dockspot och avgiften (husarohandel.se).
- Koordinaterna för 0256 och 0268 kommer ur platsexporten 2026-10-29, eftersom databasen inte fick läsas i den här rundan.

## Toms beslut 3: GPS-radien (nr 16)
- src/lib/islandCoords.ts: bara Husarös rad ändras, radiusKm 2.0 → 1.5. Typen IslandCoord är inte ändrad.
- MÄTT 2026-11-10 i OpenStreetMaps API (haversine) från nålen 59.5064, 18.8475: längsta avstånd till strandlinjen 1,317 km bland 604 noder
  i 31 ytterringar (relation 11665504). Nålen ligger på ön, och ingen strandnod ligger utanför 1,5 km. Särsös brygga (nod 12953540454) ligger
  1,658 km bort. Det är samma värden som i beslutet (1,32 och 1,66 km), och de står i en kommentar ovanför raden.
- Inom 1,5 km ligger också holmen Skeppholm (place=islet, 0,73 km, vid Husarös brygga). Finnhamns platser ligger 2,88 och 3,00 km bort.

## Källistans klockslag (rad 3169, 3176 och 3183 i main-kopians kallor.generated.ts)
- Raderna genereras ur KÄLLA-raderna vid facts: island-data.ts:3783 (tabell 12), 3784 (tabell 13) och 3785 (tabell 10) på main 1be6e12.
  Nr 6 ersätter alla tre med rader utan klockslag, där restiderna står som varaktighet och turnummer.
- MÄTT 2026-11-10: generera-kallor.mjs på en kopia av main 1be6e12 med öns edits ger 13 källor för Husarö och 0 klockslag i «vad». Ingen
  KÄLLA-rad i Husarös block eller i transit-stops.ts har klockslag. kallor.generated.ts är inte ändrad.

## Rader som inte rörts, med skäl
- 0203 (f02-k059): generatorn (Vakten) räknar trafikbolagen som myndighet. Mäts om efter inläggningen.
- 0291 (f12-k061): mallfel (mall-0229 och mall-0224), mallarnas omkontroll.
- 0042 (f28-k002): mallarnas Skribent (runda 5) och Vaktens lista: «Österåkers kommun».
- 0217 (f28-k004): Vaktens lista (generatorn). Klockslagen i posten för tabell 13 kommer från island-data.ts:3784, som nr 6 ersätter (MÄTT ovan).
- Ingen post borttagen: Vaktens lista nämner ingen Husarö-post i edits.json som redan finns i main. husaro.sql P0 13–14 är körda; WHERE skyddar.

## Ska omprövas eller läsas om
- 0061–0063, 0068 och 0073: säsongsfälten och Svallas skala läses om före slutomkontrollen. Sommartabellen 2027 är inte publicerad.
- 0256 och 0268: platsernas koordinater är inte lästa i databasen (platsexporten 2026-10-29).
- För Redaktören: facts.season 'Maj–September' (Vår bedömning, nr 6) skiljer sig nu från kalendern, där maj och september är Begränsad service.
  Raden står inte i arbetslistan. Punkt 1 i husaro.tom.md (radien) är beslutad och gjord i nr 16; tom.md är inte ändrad.

## Torrkörning och kontroller
- node applicera.mjs main-kopia ut/husaro.edits.json --torr (main-kopia 1be6e12, efter #517): 17 ersättningar ok, 0 fel. De 15 tidigare
  posternas «gammal» stod exakt en gång i kopian; nr 4, 7 och 10 har längre «gammal» nu, eftersom de byter hela meningen eller KÄLLA-raden.
- Efter inläggning i en kopia: island-data.ts, islandCoords.ts och transit-stops.ts utan syntaxfel (repots typescript).
- Citat (skript/kolla_citat.py): 69 citat i KÄLLA-rader och i 21 registerrader lästa 2026-11-10, och 5 citat i sql-kommentarerna, står ordagrant
  i de sparade källtexterna. Inga klockslag, en URL per KÄLLA-rad, och alla registerrader har 15 kolumner.
- Lag 3 (faktaregister.mjs --mat husaro): main 507 ord, 68 enheter, 50 med källa. Med edits före runda 4: 613, 74 och 59. Nu 639, 76 och 74: OK.
- /oppet-nu (RESONERAT ur data och sidans logik, inte renderat): Husarö visas i juli och augusti som Öppet (förut Högsäsong) och i september
  som Begränsad service (förut Öppet).

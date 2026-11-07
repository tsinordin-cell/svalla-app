# Vaktens lista – batch 01

Samlad av Redaktören 2026-11-03 ur STATUS.md. Detta är punkterna för Vakten i batch 01:s PR: samma fel i hela repot, mått, HTTP-kontroll och renderade sidor. Bocka av med datum och vad som mättes. Punkter som sidmallarnas Skribent redan har rättat i arbetskopian /home/claude/svalla-mallar kontrolleras där, inte görs om.

## Inläggningsordning (konsolideringen)
- Allt läggs in ovanpå main efter #504, #505 och #506.
- Hoppa över ändringar som redan finns i main:
  - uto.edits.json nr 0
  - sandhamn.edits.json nr 20 (transit-stops.ts, P0 18)
  - grinda.edits.json nr 2 och 7 (P0 7–8)
  - Vaxholms transit (P0 9)
  - mallar.edits.json nr 62–63 (P0 15)
  - parkeringsdelen av vaxholm.edits.json nr 27 (P0 10, #505). Resten av nr 27 läggs in.
- vaxholm.edits.json nr 30 ligger intill P0 17 (dog_notes). Kontrollera att "gammal" fortfarande matchar.
- Platsradien: Storholmens ersättning nr 10 och Fjäderholmarnas nr 31 justeras mot fältet `platsRadieKm`.
- Databasen:
  - grinda.sql bryggorna är redan körda 2026-11-03 21:39. Kör dem inte igen; WHERE skyddar.
  - husaro.sql P0 13–14 är körda 21:22.
  - Övriga UPDATE körs efter batchens merge, med SELECT före och efter.

## Generatorn och källistan
- `scripts/generera-kallor.mjs`:
  - När två URL:er står på samma KÄLLA-rad hamnar hela raden under den första.
  - " – " görs om till " — " i citat.
  - slaIhop parar det längsta citatet med det senaste läsdatumet (104 URL:er).
- Källistan publicerar tider, öppettider och belopp ur KÄLLA-citaten. Arbetskopian för mallarna har en ändring för det; kontrollera den.
- Fjäderholmarna har tre KÄLLA-rader med klockslag. Grindas KÄLLA-rader på main har också klockslag.
- Storholmen: källistan visar avgångstider ur SL-posten ("Ropsten 07.05 → Storholmen södra 07.33 …"), i src/app/o/kallor.generated.ts strax före rad 4949 (MÄTT av Kontrollanterna full-08, f08-k107 och utanför-3, och full-10, 2026-11-08). Dela KÄLLA-raderna per URL och ta bort klockslagen ur citaten.
- Källistans räkning ("N sidor hos M källor, varav K myndighet eller kommun") räknar trafikbolagen som myndighet och delar upp samma organisation på flera källor (vaxholm.se och "Vaxholms stad", Länsstyrelsens varianter, haninge.se med underdomäner). Fem rader i full-02 (k059, k063, k072, k078, k079). Rättas i generatorn; raderna mäts om efter inläggningen ovanpå main.
- Källistan märker operatörer (Waxholmsbolaget, SL) som "Myndighet" (myndighet: true i kallor.generated.ts, MÄTT av Kontrollanten full-01 på /o/grinda). Operatörer är nivå 2.

## Samma fel på andra ställen
- "Sök resan i SL-appen" står i Yxlans data och i blogg/[slug]/page.tsx:902.
- Bloggen cykling-moja-gallno säger "Buss 434 från Slussen till Sollenkroka".
- Sea Lodge "till mitten av augusti" står kvar i guide-content.ts:12998–12999 (grinda.se: slutet av augusti).
- Hantverkarsidan för Möja: OCT Entreprenad (moja-N015, kompensation för Lag 3) står först i datafilen och visas därför före företagen med bas på Möja. Sortera så att företag med bas på ön kommer först, om det går utan att röra fler poster.
- Styrsö: nio KORREKT-rader har Brattens Wärdshus som enda källa för historien (styrso-0043–0046, 0048, 0049, 0105, 0114, 0117). De ligger i den fulla kontrollen och ska få FEL där.
- "Café Ankaret" står kvar i bloggen (blogg/[slug]/page.tsx:67). Verksamheten heter "Ankaret" (Instagram, läst 2026-11-03).
- src/data/guider.ts:358–360: obelagd Strömkajen-text.
- dagsplan.ts: Nynäshamn → Utö.
- bingo-data.ts:26: "havsbastu" på Utö.
- src/app/resetips/trips-data.ts:1034: "mellersta" om Husarö (Toms beslut 2).
- Grindas transit-not "Direktbåt med Waxholmsbolaget från Strömkajen sommartid": linje 11 går året om enligt tabellen.
- Storholmen står i ISLAND_NO_TRANSIT ("Hit går ingen kollektivtrafik"), fast SL:s pendelbåt 80 går dit. Ta bort den.
- Västtrafiks länkar för Göteborgsöarna.
- Andra bryggor än Fjäderholmarna som har X ("utan fast avgångstid") i Waxholmsbolagets tabeller saknar tidsObs.
- Hållplats-id: kontrollera namnen för Fjäderholmarna (740034632) och Utö Centralstation.

## Mallar och komponenter (kontrollera om Skribenten redan rättat dem)
- med-barn/page.tsx:87 jämför exakta namn och visar Stora Trouvillestranden. Toms beslut 6 avgör om posten ska döljas.
- /aktivitet/<typ>/<ö> använder fortfarande ordmatchning.
- komma-dit/page.tsx:84: Waxholmsbolagets "Praktiska tips" visas även där SL kör.
- bad/page.tsx:66: allt som innehåller "brygga" sorteras in som bad.
- page.tsx:203: isAccessibleForFree är en konstant.
- og:description gör regionLabel till gemener; regionLabel i og/twitter är Toms beslut 2.
- validThrough: hårdkodat datum och "Året runt" på 17 öar.
- islandFaqs.ts:56: slice(0, 2) tappar linje 2.
- Hantverkarsidan säger att kontrollerade uppgifter saknas trots att posten har dem.
- HantverkarKort: ö/o-jämförelsen. Skribenten för mallarna, runda 3.

## Från mallarnas Skribent, runda 3 (2026-11-07)
- Komma-dit-FAQ:n visar avgångstider ur öarnas data på 23 öar, ingen av dem i batch 01. Det är klockslag i löptext och ska bort i mallen eller i öarnas batchar.
- Ortnamnet står dubbelt i FAQ-listan på 13 öar ("från Stavsnäs från Stavsnäs vinterhamn").
- Askö och Yttre Gården får fortfarande "boende" (RESONERAT). Radien lägger grannöars platser under "på och nära" utan avstånd (Yttre Gården, Asperö).

## Data som inte visas
- dog_notes läses inte av någon komponent (MÄTT 2026-11-03). Registerrader för dog_notes räknas inte som sidtext i Lag 3-måttet.

## Mått och kontroller (Vaktens egna)
- Lag 3: `faktaregister.mjs --mat` per ö mot baslinjen. Ingen sida under 95 %.
- HTTP-kontroll av alla URL:er i ändrade KÄLLA-rader.
- Renderade sidor: alla ändrade sidor i förhandsversionen, med textsökning efter ändringarna.
- prebuild, tsc och eslint i den samlade grenen.

## Toms beslut som påverkar inläggningen
- Beslut 2 (regioner), 3 (GPS-radier), 4 (camping), 5–8 (enskilda poster) och 9 (Facebook).
- visited_islands: gamla passager räknas som besök. Att flytta dem är en databasändring och kräver Tom.

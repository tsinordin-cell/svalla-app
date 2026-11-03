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
- Källistan märker operatörer (Waxholmsbolaget, SL) som "Myndighet" (myndighet: true i kallor.generated.ts, MÄTT av Kontrollanten full-01 på /o/grinda). Operatörer är nivå 2.

## Samma fel på andra ställen
- "Sök resan i SL-appen" står i Yxlans data och i blogg/[slug]/page.tsx:902.
- Bloggen cykling-moja-gallno säger "Buss 434 från Slussen till Sollenkroka".
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

# Beslut för Tom — faktagranskningen

Bara det som enligt uppdraget (DEL 11) kräver Tom: radering av hela poster,
olösbara källkonflikter som påverkar resan eller säkerheten, uppgifter som bara
verksamheten själv kan ge, och schemaändringar. Ett avsnitt per batch, samma
innehåll som beslutskortet på svalla.se/team.

## Beslutat 2026-10-29 (Tom, i chatten)

1. **Säkerhetskopiering mitt i en batch: ja.** Grenen får pushas när den
   senaste commiten bara rör `docs/`, för då hoppar Vercel över bygget
   (`ignoreCommand` i vercel.json). Datafilerna pushas fortfarande en gång,
   när batchen är grön. Bygger Vercel ändå avbryts bygget direkt.
2. **Takt: högst 4 agenter samtidigt**, löpande, så att kontots
   användningsgräns inte tar slut för annan användning.
3. **De dubbla FAQPage-blocken på ösidorna tas bort i batch 01:s PR.**

## Väntar på Tom — batch 01 (samlas här, beslutskortet på /team skapas när fler öar är granskade)

### 1. Platsen "Runmarö Bryggkiosk" (`runmaro-bryggkiosk`) – mejl och schemaändring
- **Läget:** ingen tillåten källa nämner en verksamhet med det namnet.
  Webbplatsen den länkar till är Runmarö Lanthandels, och butiken ligger enligt
  egen uppgift "ca 200m från Styrsviks brygga", inte vid bryggan Gatan där
  nålen står. Platsen räknades till Storholmen bara för att Storholmens nål
  låg fel. Den hör till Runmarö (batch 02).
- **Förslag:** skicka mejlet i `register/b01/ut/storholmen.tom.md` till
  info@runmarolanthandel.se (adressen från butikens kontaktsida). Raden står
  kvar som den är tills svar finns. Beskrivningen är redan tom.
- **Ja till ersättning (om svaret är nej):** raden görs om till Runmarö
  Lanthandel med butikens egna uppgifter. Det kräver en ny typ för butik i
  `restaurants` (**schemaändring**) och en uppmätt nål.
- **Nej:** raden står kvar utan text, och Runmarös granskning i batch 02 tar
  ärendet vidare.

### 2. Regionetiketterna ("Mellersta skärgården" m.fl.) – Svallas indelning eller sakuppgift?
- **Läget:** ingen tillåten källa placerar Fjäderholmarna i "Mellersta
  skärgården". Det enda belagda är Lidingö stads egen indelning: Lidingös
  skärgård omfattar holmarna "från och med Storholmen mot Vaxholm i norr …
  samt Fjäderholmarna in mot Stockholm i söder" (lidingo.se, läst
  2026-10-29). Storholmens Granskare hittade samma problem. `regionLabel`
  styr också vilka öar som visas i regionlistorna (`RegionOar.tsx`).
- **Förslag:** behandla regionerna som Svallas egen navigationsindelning och
  skriv in det i ARBETSREGLER. Etiketten är då ingen sakuppgift om
  verkligheten. Där en kommun eller myndighet har en egen indelning, till
  exempel Lidingös skärgård, nämns den i texten med källa.
- **Ja:** regel i ARBETSREGLER, etiketterna står kvar, och texten får den
  belagda indelningen där den finns.
- **Nej:** etiketterna byts till belagda namn ö för ö, och regionlistorna
  byggs om. Det är en större ändring av sajtens struktur.

### 3. GPS-radien för Storholmen och Fjäderholmarna (information, inget beslut krävs)
- Granskarna mätte öarnas storlek i OSM: Storholmen cirka 0,8 km och
  Fjäderholmarna cirka 0,7 km i radie, mot 1,5 km i dag. Radien i
  `islandCoords.ts` är GPS-detektionsradien och styr vilka öar som taggas på
  en loggad tur. Platslistorna lånar samma radie, och därför visas platser
  på Lidingö som om de låg på ön.
- **Vad jag gör:** platslistorna får en egen platsradie med de uppmätta
  värdena. GPS-radien rörs inte. Nålarna rättas: Storholmens låg 40 km fel,
  och Fjäderholmarnas låg i vattnet.
- **Om du vill:** säg till om GPS-radien också ska sänkas. Det gör
  turtaggningen striktare.

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

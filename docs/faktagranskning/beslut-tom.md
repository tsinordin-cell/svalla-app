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

## Väntar på Tom

_Inget just nu._

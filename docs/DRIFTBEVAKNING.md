# Driftbevakning för svalla.se

Skrivet 2026-11-02 efter att databasen varit nere i tre dygn utan att någon märkte det.

## Vad som hände
- Supabase-organisationen gick över till Pro i september, efter att gratisnivåns kvot för utgående trafik (egress, 5 GB i månaden) tagit slut och förfrågningar stoppats en dag.
- Kortdragningen för oktoberfakturan misslyckades. Supabase skickade under två veckor mejl om misslyckad betalning, förfallen faktura och "pending shutdown". En del gick till info@svalla.se och nådde aldrig inkorgen; resten hamnade i Gmails flik Uppdateringar och lästes inte.
- 2026-10-30 nedgraderades organisationen till gratisnivån och projektet pausades. Sajtens sidor fortsatte svara 200 ur cache (/rutter "STALE"), /api/stats visade nollor, och inloggning, loggning, flöde och forum gav fel.
- Medan projektet var pausat fanns värdnamnet inte i DNS, så **varje Vercel-bygge föll** (regionsidorna prerenderas mot databasen) och ingen rättelse kunde nå produktion.

## Tre lager bevakning
1. **`/api/health`** (denna rutt): frågar databasen vid varje anrop, ingen cache. 200 `{"ok":true,"db":"ok"}` eller 503 `{"ok":false,"db":"fel"}`, svar inom 4 sekunder. Gå inte via cachade sidor eller /api/stats för att avgöra om databasen lever.
2. **Extern bevakning** (Tom sätter upp, gratis): t.ex. UptimeRobot, var 5:e minut, larm per mejl.
   - HTTP-bevakning: `https://svalla.se/` (fångar att Vercel eller domänen ligger nere).
   - HTTP-bevakning: `https://svalla.se/api/health` (fångar databasen). Tills rutten är ute: nyckelordsbevakning på `https://svalla.se/api/stats` som larmar när texten `"users":0,` finns (svaret cachas upp till en timme, så larmet kommer senare).
3. **Daglig kontroll med Claude** (schemalagd uppgift "Svalla driftkontroll (daglig)", 16:34 svensk tid): Supabase-projektets status, `/api/health`, mejl om betalning eller kvot från Supabase och Vercel de senaste två dygnen, och varningar från kartkorten. Push-notis bara när något är fel. Den körs på Claude-kontots krediter: tar de slut körs den inte, så den externa bevakningen är grunden.

## Fakturor och kvoter
- Fakturor och varningar från Supabase och Vercel ska nå en inkorg som läses. Ett Gmail-filter (från `supabase` eller `vercel`, ord som invoice, payment, overdue, quota, restricted, paused) med "Markera alltid som viktigt" och "Kategorisera som Primär" räcker.
- Gratisnivån pausar och begränsar projekt; sajten har redan gått över dess egress-kvot en gång. Se över användningen (Supabase → Usage) efter varje större ändring av hur sidor hämtar data.

## Kartrutorna (delningskorten)
Kartkortet hämtar rutor från tile.openstreetmap.org i servern. OSM:s regler (operations.osmfoundation.org/policies/tiles) följs: eget User-Agent med kontaktadress, rutorna cachas minst 7 dagar, högst 6 samtidiga hämtningar, erkännandet "Karta © OpenStreetMap-bidragsgivare" syns på kortet. Saknade rutor loggas som `[kartkort] … kartrutor saknas (status …)`. Status 403 eller 429 där betyder att OSM begränsar oss: byt då till en kartleverantör med egen nyckel (sajtens övriga kartor använder också OSM:s rutor).

## Efter ett avbrott
1. Kontrollera `https://svalla.se/api/health` (200), att /api/stats visar användare över noll, inloggning och en tursida.
2. Senaste commit på en gren med bara dokumentation byggs inte av Vercel (`ignoreCommand` i vercel.json). En gren som pushats så under avbrottet behöver en ny commit som rör kod, eller "Update branch" mot main, för att få ett riktigt bygge innan merge.

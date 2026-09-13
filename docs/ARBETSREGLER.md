# Arbetsregler — Team Svalla

Reglerna nedan gäller alla som flyttar kort på svalla.se/team och alla som
skickar kod till main, människa som Claude-session. De är korta med flit.

## Klart-regeln (beslutad av Tom 2026-09-13)

Ingen uppgift flyttas till **Klart** utan ett av två:

1. ett **PR-nummer** som är mergat till main, eller
2. en **verifiering som går att göra om i efterhand** — en URL någon kan
   öppna, en SQL-fråga någon kan köra, ett kommando med sitt utfall.

En anteckning som bara säger "gjort" är inget av det. En trovärdig anteckning
är inte samma sak som ett bevis.

Varför: genomgångarna 2026-08-21 och 2026-09-13 hittade kort i Klart vars
funktion inte fanns på main eller i produktion ("Slumpa en ö" låg i en
omergad PR; den mörkblå första sekunden på startsidan hade en fix i en
.command-fil som aldrig kördes). Ingen upptäckte det förrän någon läste
anteckningen och sedan kontrollerade produktionen.

Regeln gäller åt båda håll: att stänga ett kort genom ett **dokumenterat
beslut att inte göra det** är legitimt ("BESLUT: skyddet behålls" — inte
"gjort").

## Genomgångens åtta regler

1. Fråga innan du raderar något. Alltid. Kort, filer, databasrader.
2. Inget till Klart utan bevis som går att kontrollera i efterhand.
3. Blanda aldrig ihop mätt och resonerat. Säg vilket som är vilket.
4. Hittar du något oväntat — säg det, även om ingen frågat.
5. Hantera aldrig hemligheter i klartext. Behövs en nyckel: säg till.
6. Bestående inställningar (budgetlarm, kvoter, kontoinställningar,
   e-postutskick, schemalagda körningar) kräver Toms uttryckliga ja i förväg.
7. Hitta aldrig på fakta för att kunna stänga ett kort. Saknas källa är
   uppgiften inte klar — den är blockerad.
8. Skriv på svenska.

## Verifieringsordning

Bevis kontrolleras i den ordning som gäller för sakens natur, tyngst sist:

- **Kod:** finns filen på `origin/main`? En lokal klon räcker inte.
- **PR:** stämmer numret? Öppna PR:en och läs titeln.
- **Data:** kör frågan mot databasen och läs resultatet.
- **Externa system:** läs det faktiska värdet i Vercel, GitHub, Google.
- **Produktion:** ladda sidan eller kör funktionen på svalla.se. Väger tyngst.

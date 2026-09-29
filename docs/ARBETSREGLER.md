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

## Läget — läs innan du bedömer siffror (Tom 2026-09-14)

Svalla är **inte lanserat** och ingen marknadsföring har börjat. Lansering
planeras till **sommaren 2027**. Alla besök, sidvisningar och registreringar
fram till dess är bonus — inte ett mått på vad sajten är värd eller vad
användarna vill ha.

Vad det betyder i praktiken:

- Argumentera aldrig "ingen använder X" utifrån trafik före lansering. Det
  säger inget. Frågan är i stället: ska X finnas och fungera vid lansering?
- Mätningar (analytics_events, Vercel Analytics, aktiva användare per vecka)
  är byggverktyg och baslinjer, inte betyg.
- Det som ska bort ska bort för att det inte håller vid lansering — trasigt,
  okällat, halvfärdigt — inte för att det saknar besökare i dag.
- Tidshorisonten är lång: ett beslut som "vänta tills det finns användare"
  betyder i praktiken "vänta till efter sommaren 2027".

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

## Källor i datafilerna (MÄTT 2026-09-14, PR #280–#287)

Konventionen är en `// KÄLLA:`-kommentar inom fem rader ovanför påståendet, med
namngiven källa och citat. I mallsträngar med HTML: `<!-- KÄLLA: … -->`.

**En KÄLLA-rad är inte ett bevis förrän någon läst den.** Under genomgången av
ösidorna hittades fyra befintliga KÄLLA-rader som pekade på `en.wikipedia.org`,
och en som citerade en mening som inte finns på den angivna sidan
(hotellfurusund.se nämner inte Erik XIV). Granska gamla källrader, inte bara
omärkta stycken.

Tillåtna källor: myndighet (Länsstyrelsen, Naturvårdsverket,
sverigesnationalparker.se, Riksantikvarieämbetet, Statens fastighetsverk,
Sjöfartsverket, Trafikverket), operatör (SL, Waxholmsbolaget, Strömma för egna
linjer), kommunen, Skärgårdsstiftelsen, STF, visitskargarden.se, kommunala
destinationsbolag, och verksamhetens egen webbplats. Som reservkälla för
gästhamnar: gasthamnsguide.se — märk den som reservkälla.

Förbjudna: Wikipedia, bloggar, TripAdvisor, Booking/Airbnb, ruttdirekt,
rome2rio, moovit, restaurangguider, bokningsplattformar som ensam källa,
nyhetsartiklar som ensam källa.

Aldrig i datafilerna: priser utan publicerad prislista, öppettider,
avgångstider. Superlativ ("bäst", "finast", "mest hyllade") kräver att en
myndighet eller operatör säger det — annars bort.

TOMT ÄR ALLTID TILLÅTET. Går påståendet inte att belägga, ta bort det.

### Kontrollsteget — så läser man KÄLLA-raderna (MÄTT i Bohuslän 2026-09-16)

Att en KÄLLA-rad finns betyder inte att någon läst källan. I Bohuslän-jobbet
gav ett stickprov på 32 rader 6 fel; den fulla kontrollen gav 52 fel av 187
(28 %). Utan steg 4–7 nedan hade alla 52 gått till produktion med en källrad
ovanför sig. Därför är detta ordningen, inte ett tillval:

1. Research-pass som producerar KÄLLA-rader med URL och citat.
2. Applicera i datafilen.
3. Extrahera varje påstående med årtal, siffra, areal eller pris — plus
   KÄLLA-raden ovanför — till en lista.
4. Stickprov på ~30 mot en oberoende kontrollant som öppnar varje URL i en
   riktig webbläsare och svarar OK / FEL / SAKNAS med citat från sidan.
   Instruera kontrollanten: "Ditt jobb är att hitta fel, inte att bekräfta."
   Den formuleringen gav mätbart fler fynd än en neutral.
5. Mer än ett par fynd på 30 betyder full kontroll av alla rader.
6. Rätta fynden, kör om kontrollen på de rättade.
7. HTTP-kontroll på samtliga URL:er sist (döda länkar, 404, omdirigeringar).

Ett fynd som säger "källan säger inte det" är inte ett fynd förrän någon läst
sidan i en riktig webbläsare — hämtningsbaserade kontroller misslyckas på
JavaScript-tunga sidor (sl.se, waxholmsbolaget.se, naturvardsverket.se) och
raderar då sant innehåll. 2026-09-18 var en fjärdedel av "saknas"-fynden fel
av just det skälet.

En KÄLLA-rad får aldrig peka på svalla.se — det är självcitering, och
verify-claims fäller bygget på det sedan PR #316.

## Platstexter ska vara SEO-anpassade (Tom 2026-09-23)

Varje text om en plats på Svalla skrivs för att hittas, men aldrig på bekostnad av korrekt fakta.

- **Första meningen** säger namn, vad platsen är (badplats, bastu, restaurang, hamn, tankställe …), ort och kommun/region. Det är den meningen som blir metabeskrivning och det folk söker på: "badplats Utö", "bastu Strömstad".
- **Bara belagda fakta.** Ort och kommun får tas från postens egen koordinat (OpenStreetMap, omvänd geokodning). Allt annat kräver tillåten källa med ordagrant citat i datafix-filen.
- **Inga värdeord** (populär, mysig, bästa …), inga priser utan prislista, inga egna öppettider.
- **Titel och reservbeskrivning** byggs i `src/app/upptack/[id]/page.tsx` av namn, typ, ö och region — aldrig fasta ord som "restaurang" eller "Stockholms skärgård" på alla sidor.


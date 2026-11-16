# P0 23 – fisketexten på svalla.se/o/uto (läst 2026-11-16, main 0bb319d)

**Vad som gäller (nivå 1).** Länsstyrelsens fiskeguide: fritt handredskapsfiske på enskilt vatten i skärgården gäller metspö, spinnspö och liknande redskap med högst 10 krokar. Metoden får inte vara angeldonsfiske eller kräva båt (trolling, dragrodd). Trolling, dragrodd och angel kräver fiskerättsägarens tillstånd, utom på allmänt vatten. Enligt guiden räknas kastnät och ismete inte heller som handredskap. HaV:s sida om fiskeregler för fritidsfiske definierar inte handredskap. Där står att allemansrätten inte gäller fiske och att reglerna finns på svenskafiskeregler.se (länsstyrelsernas och HaV:s gemensamma sajt).
**Havsöring vid Utö.** Guiden har ingen fredningstid för öring i skärgården söder om 60° N. HaV anger ingen sådan tid för Stockholmskusten. De 14 höstfredade åmynningarna ligger inte på Utö. Det som gäller vid Utö: Utöfladen (Utös utsida) och Ryssundet (mellan Ålö och Utö) har fiskeförbud 1 april–15 juni. Länsstyrelsens karta från 2024 visar båda med svart text, alltså vårfredning (MÄTT: renderad sida 1). Datumen står i fiskeguiden från 2023. Dessutom gäller minimimått 50 cm i Östersjön (HaV) och en oklippt (vild) öring per person och dag (guiden; HaV: 1 icke fenklippt per dygn).

**Rättat (17 poster, 43 påståenden, 16 strukna):**
- island-data.ts:559 Utö: nytt kort med krokar, båt/trolling/angel, kastnät/ismete, de två fredade vikarna, havsöringsreglerna och svenskafiskeregler.se. Kortet går från cirka 30 till cirka 120 ord.
- aktiviteter/page.tsx:48, 147, 203, 209, 286 och JSON-LD :92. Där stod att saltvattensfiske är fritt eller att man kan fiska fritt "från båt". Där stod också att sjöar alltid kräver fiskekort (FEL för de fem stora sjöarna) och att fiskekort behövs "om du säljer" (FEL: fritidsfiskare får inte sälja fångst från havet). Två priser (100–200 kr) är strukna. Det synliga svaret och JSON-LD har nu samma text.
- api/guide/route.ts:295–297: Thorkels prompt ("INGET fiskekort för sportfiske med spö") har fått förbehållen. KÄLLA-blocket står ovanför SYSTEM_PROMPT, utanför prompttexten, som i P0 20.
- guide-content.ts:7068 (juli), 7932 och 7980 (barn), 18303 (fiske-host). guides-data.ts:2222 och 2226 (barn): "med spö" eller "fiske utan fiskekort" har fått förbehållet eller blivit "med handredskap".

**Står kvar (fil:rad i main):**
- activity-data.ts:87: gäller bara att meta och kasta från klippa. Men "60 fredningsområden, sju året runt" avviker från Länsstyrelsen (62/nio). Det hör till ordinarie granskning.
- guide-content.ts:3888, 3893 och guides-data.ts:1811 (fiske-i-skargarden): samma guide har trolling-förbehållet (3900).
- blogg/[slug]/page.tsx:764, 770, 792: inlägget har trolling-förbehållet (764, 792).
- guides-data.ts:1997 (juli), 2232 (barn), 4404 (fiske-host) och guide-content.ts:17743, 18299: dessa säger "med handredskap", Länsstyrelsens egen formulering. 1997, 2232, 4404 och 18299 står på sidor som nu har förbehållet. 17743 (budget) länkar till fiskeguiden.
- guide-content.ts:4500, island-data.ts:2315: Nybysjön kräver fiskekort, så texten påstår inte att fiske är fritt. aktiviteter/page.tsx:144: nämner fiskekort som tillstånd. guide-content.ts:18312, 20501: kommentar eller sötvatten.

**Sett men inte rättat (inte P0, går åt det strängare hållet):**
- aktiviteter/page.tsx:205: "havsöring … fredad och bör släppas tillbaka".
- aktiviteter/page.tsx:216: "fredad 1 oktober–31 mars i de flesta områden". Enligt HaV gäller den tiden Skagerrak och Kattegatt.
- Meningen om dykning på fredade vrak (:147) är oförändrad i sak och inte granskad.
- Generatorn slår ihop KÄLLA-rader med samma URL. Därför står fiskeguidens citat för Utö på en enda rad.

**Omarbete efter Kontrollanten (Redaktören 2026-11-16):** nu 18 poster, 43 påståenden, 16 strukna (siffrorna ovan gäller första leveransen). k008–k010 strukna som utfyllnad; Utökortet 99 ord (main 28). Nya: p23-k044 Ängsholmen vid Stora Ängsholmen, fiskeförbud året runt (MÄTT på kartan 2024: röd text sidan 1, skylten "ALLT FISKE FÖRBJUDET" sidan 32; bilderna i kallor/); p23-k045 öringmeningen i Vanliga frågor och JSON-LD (HaV "Fredningstiderna varierar …", Länsstyrelsen 14 åmynningar), ersätter s009 som utgår; p23-k046 och s018: rubriken i guide-content.ts:7978 är nu "Fiska med handredskap i havet – utan fiskekort"; p23-s017 ersätter s001 (nytt skäl).
**Kontroller (omarbetet):** Torrkörningen gav 18 ersättningar ok och 0 fel. I torr/ efter inläggningen: generera-kallor gav 101 öar och 1521 källor, tsc --noEmit gav exit 0 och --kontroll sa "filen är aktuell". skript/kontrollera_citat.py hittade 168 av 168 citat ordagrant i kallor/. Nya texter har inga klockslag och inga priser.
Filer: edits.json, underlag.tsv, strukna.tsv, kallor/ (index.tsv), skript/bygg.py, skript/kontrollera_citat.py, torr/.

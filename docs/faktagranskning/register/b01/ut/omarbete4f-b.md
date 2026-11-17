# Omarbete runda 4f, del B – Utö, Möja, Sandhamn, Styrsö (Granskaren och Skribenten, 2026-11-16–17)

Källor lästa 2026-11-16 (curl --http1.1, Chromium, pdftotext, OpenStreetMaps API) och Jowa 2026-11-17. Databasen är inte läst eller ändrad. Ingen verifieringssida, ingen P0. Inget committat.
Källtexter: /tmp/claude-0/-home-claude/dab286cd-d211-5dcf-ae13-8cab8efaa49f/scratchpad/b01/omk4f-b/kallor/, skript i skript/, säkerhetskopior i fore/.

## Gjort först
- slut-09:sl09-k004 och k034 (uto-0300, 0024, N035, N036): förbehållet om sista beställningstid står nu utan klockslag, i travel_time ("… och senast vid tabellens sista beställningstid") och i komma-dit ("… och senast vid den sista beställningstid som står i tabellen … För sena avgångar räcker det alltså inte att beställa en timme i förväg."). Källa: h21.pdf, anmärkning b ("från aktuell brygga, dock senast"; klockslaget citeras inte). MÄTT: b står i 21A också vid kvällsavgångar från Gruvbryggan.
- P0 23 (uto-0223, N002, N003): batchens fiskepost (tidigare nr 7) är borttagen ur uto.edits.json. Main:s text (1f02b76) står kvar orörd. uto.edits.json har nu 35 poster.
- Dykarbaren (slut-08:sl08-k005, k028, k029): uppgifterna står kvar oförändrade, också satsen i sandhamn.sql. Redaktören behöver läsa https://www.facebook.com/DykarbarenSandhamn (länkad från dykarbaren.se i cachen 2026-11-07 och 2026-11-09). Registerraderna är märkta EJ NÅBAR i dag.

## Utö
- slut-04:sl04-k037 (uto-0076, N037): "schakt, varphögar och den gamla gruvbyn" blir "dagbrott och stora varpstenshögar, och de gamla gruvarbetarbostäderna ligger kvar längs Lurgatan". Källa: länsmuseet.
- slut-09:sl09-k003 (uto-0176–0178, N033, N034): meningen om "förhistoria" är struken. Nu står köpet 1973 (Stiftelsen Stockholms skärgård, i dag Skärgårdsstiftelsen), reservatet sedan 1974, utbredningen och markägare/förvaltare var för sig. Källor: Länsstyrelsen, Skärgårdsstiftelsens historia.
- slut-09:sl09-k015 (uto-0325, N040, N041): main:s mening (P0 20) rörs inte. Den är belagd av Stockholm Archipelago Trail ("all the way north to Gruvbryggan", "passes through an active military firing range"), Länsstyrelsen och Försvarsmakten. Registret har nu rader för den.
- slut-10:sl10-k003 (uto-0088, N038): "Sveriges äldsta bevarade väderkvarn" är struket. Nu: "väderkvarnen, som uppfördes på 1790-talet" plus byggnader från 1700- och 1800-talens gruvsamhälle. Källor: Länsstyrelsen, Haninge. Den gamla KÄLLA-raden från Skärgårdsstiftelsen är borttagen. 1790-talet eftersom Haninge anger både 1791 och 1792.
- slut-10:sl10-k016 (uto-0044, N039): did_you_know säger nu att kvarnen enligt Haninge kommun är en holländare med originalmaskineriet och sågen kvar, och som sådan unik i Stockholms län.
- slut-10:sl10-k027 (uto-0485): dog_friendly är borttaget, med en kommentar som för Vaxholm.
- slut-11:sl11-k044 (uto-0401): Toms beslut 5, ingen åtgärd.

## Möja
- slut-01:sl01-k111 (moja-0402): källan är nu OSM-relationen 8346534. MÄTT: punkten ligger på Möja, 5 m från stranden. Bara en kommentar i moja.sql.
- slut-04:sl04-k016 (moja-0619–0622): satsen i moja.sql (4b/4c) tillskriver redan 1951 och 2019 ("Enligt värdshuset …") och är oförändrad. Kontrollanten läste den publicerade texten (FÖRE).
- slut-05:sl05-k056 (moja-0572): radien är 3,5 km (Toms beslut 3). Räckvidden blir 5,5 km och avståndet är 4,0 km.
- slut-05:utanför-2 (Bastuhuset): MÄTT: nålen ligger på Stora Kalholmen (OSM way 222662304, 13 m från stranden). island står kvar som null, och satserna (namn, text, website null) står kvar. "Finnhamn" som adress kommer från formatted_address (Google). Redaktören: SELECT formatted_address och ta bort den eller ändra den.
- slut-05:utanför-3 (Jowa, moja-0521, 0523; läst 2026-11-17): sidan säger inte längre "bas i Upplands Väsby" utan "Vårt fina kontor hittar ni på Kimsta 351, i Rosersberg", och har en andra adress för Roslagen i Herräng. Posten stämmer. Bara citaten i registret är bytta.
- slut-07:sl07-k021 (moja-0073, N030, månadsraderna): varningen säger nu "Utanför sommaren är färre bodar öppna, men enligt Värmdö kommun har ett antal restauranger och krogar på ön öppet större delen av året." Källa: kommunens Markanvisning-PDF. Månaderna är oförändrade.
- slut-07:sl07-k027 (moja-0552): kajakens difficulty är borttaget (graden är okänd). Källa: Möja Outdoor, som inte anger någon grad. Det kräver mallarnas patch (difficulty?), se torrkörningen.
- slut-08:sl08-k030 (moja-0232, N031): stigen anges nu som kommunen anger den, 12 km varav cirka 4 km i skog och resten på grusväg. Källa: varmdo.se Spår och leder. OSM-raden är borttagen.

## Sandhamn
- slut-04:sl04-k036 (sandhamn-0153): Waxholmsbolagets resmålssida är KÄLLA för "där också båtarna lägger till" ("angör en brygga på Sandön och den ligger i Sandhamn").
- slut-08:sl08-k007 (sandhamn-0178, 0180, N044, N045): "granit och sandsten" och "Östersjöns Drottning" är strukna. Kompensation från RAÄ: inseglingsleden till Sandhamn, angöringsfyr, stomme av murverk i natursten. Höjden 26 m står kvar med Skärgårdsstiftelsen som källa (stiftelsen om sin egen byggnad).
- slut-08:sl08-k011 (sandhamn-0599, N046): SET-texten i sandhamn.sql har nu "landström mot avgift" och "från oktober till maj stänger KSSS av all el och vatten … servicehus och bastu". WHERE är samma. Källa: ksss.se/hamnar/lokholmen.
- slut-08:sl08-k012 (sandhamn-0570): atm: false är borttaget (nr 18).
- slut-08:sl08-k024 (sandhamn-0108): nu "Kring hamnen finns en blandad bebyggelse med ålderdomliga tull- och lotsstugor och sommarvillor från sekelskiftet 1900." Källa: länsmuseet.
- slut-08:sl08-k032 (sandhamn-N038): Fläskbergets vägbeskrivning säger nu att Waxholmsbolaget går året runt och att Strömmas båt gick säsongen 2026 från 30 april till 27 september. Källor: Waxholmsbolaget, Strömmas PDF.

## Styrsö
- slut-04:utanför-k038 (styrso-0493): satsen i styrso.sql stryker redan hamndjupet. Ingen ändring.
- slut-09:sl09-k010 och k017 (styrso-0306–0312, N034): posten är Isbolaget (Toms beslut 7); namn, text, webbplats och nål byts redan. Telefonen var Donsö gästhamns nummer. Ny UPDATE: phone '031-97 27 00' där phone = '+46 31 97 17 32'. FÖRE-värdet prövas med SELECT av Redaktören. Källa: isbolaget.com.
- slut-11:sl11-k068 (styrso-0218, N033): "(även 9 på sommaren)" är struket. Nu: "Spårvagn 9 går i tidtabellen 17 augusti–12 december 2026 mellan Kungssten och Angered, inte till Saltholmen." Källor: Västtrafiks PDF för linje 9; sidan för linjevarianten 9 Saltholmen säger "ingen tidtabell".

## Gick inte eller ligger utanför
- slut-05:sl05-k060 (mall-0215, som k007): mallarnas punkt (Thorkel), inte gjord här.
- Dykarbaren: väntar på Facebooksidan (ovan).
- Samma "linje 9 sommartid" står för Donsö (island-data.ts, getting_there) och Brännö, och i kallor.generated. De är utanför batchen och går till Vakten.
- FAQ-texten "ring direkt på +46 31 97 17 32" på /upptack/donso-hamnkrog borde följa med telefonen. Kontrollera efter UPDATE.

## Torrkörning och kontroller (MÄTT)
- applicera.mjs --torr mot main-kopian 1f02b76: uto 35, moja 35, sandhamn 31, styrso 23 ersättningar ok, 0 fel. Main-kopian är orörd.
- Kopia utan mallarnas patch: generera-kallor 101 öar och 1 584 källor, --kontroll grön. vitest src/lib 67 filer och 730 test gröna. tsc ger 1 fel: island-data.ts kajak saknar difficulty (Möja, sl07-k027).
- Kopia med mallar-arbetskopia.patch (utom kallor.generated.ts, som inte går in på 1f02b76 och genereras om): tsc 0 fel, vitest src/lib 72 filer och 769 test gröna, generera-kallor 1 700 källor, --kontroll grön. Patchen måste alltså in före Möjas post nr 16.
- Citat: 158 citat i de nya KÄLLA-raderna och registerraderna (4f) står ordagrant i de sparade källtexterna, och de fyra Jowa-citaten står också där. Inga klockslag i citaten.
- kontrollera_register.py: inga formfel. Utös 6 grundrader utan motsvarighet är desamma som förut.
- Lag 3 (faktaregister.mjs --mat, före 4f → efter): Utö 2 361 → 2 447 ord, Möja 1 955 → 1 994, Sandhamn 2 085 → 2 106, Styrsö 1 106 → 1 118. Utö får "BRIST: sektion dog_friendly tom": fältet visas inte på någon sida (grep i src) och togs bort efter Redaktörens beslut, som för Vaxholm.

## Redaktören 2026-11-17
- SELECT före körning (MÄTT, 1 rad var): donso-hamnkrog.phone '+46 31 97 17 32'; bastuhuset.formatted_address '184 99 Finnhamn'. Telefonsatsen skrivs i tabellens form '+46 31 97 27 00'. En ny sats tar bort Bastuhusets felaktiga adress (sätts till null, ingen ny adress). Se moja.sql och styrso.sql.
- Dykarbaren, läst i Toms Chrome 2026-11-17:
  - dykarbaren.se svarar fortfarande "This site has been temporarily disabled" (MÄTT).
  - facebook.com/DykarbarenSandhamn (nivå 2, senaste inlägget 17 september 2026, alltså inom 12 månader): "Tillfälligt stängt", "Sandhamn 425, Sandhamn, Sweden, 130 39", inlägget "CASINO DYKARN – SÄSONGENS SISTA GIV". Kontaktuppgifter är inte sparade.
  - Verksamhetens egen sida i Wayback Machine: https://web.archive.org/web/20260722235328/https://www.dykarbaren.se/ ("Vi erbjuder endast bordsbokning inomhus då vår uteservering inte helt går att vädersäkra", "säsong maj – september") och https://web.archive.org/web/20260509040134/https://www.dykarbaren.se/om-oss/ ("På nedervåningen av Dykarbaren hittar ni både den legendariska baren och matplatserna", "Mitt emot, precis vid strandkanten, finns en mysig uteservering", "sedan mer än 20 år tillbaka av samma ägare med familj", "på nedre botten växte en café- och barverksamhet fram").
  - Slutsats: sl08-k005, k028 och k029 stöds av verksamhetens egen sida (arkiverad) och av Facebooksidan. Ingen P0: stället är säsongsstängt, inte nedlagt enligt Facebook. Raderna prövas av en oberoende Kontrollant i slutstädningen med arkivlänkarna ovan; Redaktörens läsning räknas inte som kontroll.
- Magasinet: ny sats i vaxholm.sql tar bort taggen 'gustavsberg' (FÖRE prövat med SELECT).

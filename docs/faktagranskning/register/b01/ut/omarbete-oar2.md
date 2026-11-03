# Omarbete av öarna efter omkontrollen – batch 01, runda 2 (2026-11-03)

Underlag: kontroll/oar-omk.kontroll.tsv med Redaktörens beslut i kontroll/oar-omk.beslut.tsv. En rad per ändrad registerrad. «nr» räknas från 0 i öns edits.json.
Alla källor lästa 2026-11-03 (curl, pdftotext eller Chromium via las_sida.py), utom hhmarin.se och Instagram, där Redaktörens läsning i Toms Chrome 2026-11-03 används (kontroll/oar-omk2-sidor/). Nya källtexter ligger i kallcache/ny/ med datumet 2026-11-03.
Torrkörning: alla sju edits.json ger 0 fel. kontrollera_register.py: inga formfel i de sju registren. Databasen: varje WHERE i de ändrade satserna träffar exakt en rad (SELECT 2026-11-03); ingen UPDATE körd.

## Storholmen (edits nr 9)
- storholmen-N002: Återinförd (NY) enligt beslutet: «En av dem, Sticklingebadet längst ut på norra Sticklinge på Lidingö, …». Källa Lidingö stad (badsidan: «Sticklinge/Sandvik», «Sticklingebadet ligger längst ut på norra Sticklinge …»).
- storholmen-N003: Återinförd (NY): «omkring 150 meter fågelvägen från Sticklinge brygga». MÄTT i OpenStreetMap (API:ets kartuttag, inte Nominatim): nod 3672291814 till nod 12839993890 är 150 m; strandpolygonen 120 m.
- storholmen-N004: Återinförd (NY): «där pendelbåten mellan Ropsten och Storholmen lägger till». Källa Lidingö stads båtpendlingssida.
- storholmen-N005: Återinförd (NY): «Där finns sandstrand, beachvolleybollplan och torrtoalett.» Källa Lidingö stads badsida (värdeordet «fin» tas inte med).
- storholmen-0205: Rätt uppgift uppdaterad (N002–N005 återinförda med rätt läge); ingen ändring av dom eller text.

## Fjäderholmarna (edits nr 17)
- fjaderholmarna-N003: STRYK+KOMPENSERA enligt beslutet: «SL-biljett gäller året runt på Waxholmsbolagets båtar mellan Strömkajen och Fjäderholmarna» struken ur getting_there[2]. OBS: Waxholmsbolagets biljettsida (Chromium i dag) stöder uppgiften («Mellan dessa bryggor kan du året runt resa med Waxholmsbolaget på alla sorters SL-biljetter:», Fjäderholmarna i listan). Domen står därför som KORREKT.
- fjaderholmarna-N014 (ny rad): Kompensationen «Fjäderholmarna ingår i SL-området i Waxholmsbolagets trafik, där alla sorters SL-biljetter gäller.» Källa är Waxholmsbolagets biljettsida. Meningen säger inte «året runt», eftersom tabell 2 bara gäller till 12 december 2026.
- fjaderholmarna-0310: FAQ-svaret på /komma-dit byggs av getting_there. Ny text och källor på raden: h2.pdf, Strömmas julbordssida och Waxholmsbolagets biljettsida.
- fjaderholmarna-0328: Samma ändring för /med-barn.
- Ej ändrad: fjaderholmarna-N006 (description[2], edits nr 4) har kvar samma uppgift med «året runt», och dess källa är samma biljettsida. Raden omfattas inte av beslutet. Redaktören avgör om den ska följa N003.

## Utö (edits nr 7)
- uto-N003: STRYK+KOMPENSERA: meningsdelen om trolling och dragrodd struken som utfyllnad. Ingen kompensation behövs: MÄTT, fiskeposten har 40 ord mot 21 i baslinjen och har det Utö-specifika fiskeförbudet (N002).
- uto-0223: Ny text utan trollingdelen: «med metspö eller spinnspö behövs inget fiskekort. I Utöfladen …». Citat och KÄLLA-rad utan trollingcitatet; fiskeguiden lästes igen i dag.

## Grinda (grinda.sql, edits nr 13–14, grinda.tom.md)
- grinda-0420: Källa för «i Grinda naturreservat» tillagd: Länsstyrelsens Grindasida, «Grinda naturreservat med omgivande öar och vatten» och «Skyddsform: naturreservat». Den står i registret och i kommentaren ovanför Södra bryggans UPDATE i grinda.sql. Texten ligger redan i databasen (SELECT i dag) och ändras inte.
- grinda-0421: Samma källa som 0420.
- grinda-0295: Dom KORREKT (KÄLLA-rad ny), BEHÅLL. Uppdrag 2 löst: oct-entreprenad.com/byggfirma-varmdo/ lästes i Chromium. Första försöket gav 502, det andra 200. Sidan säger «Ditt lokala byggföretag på Värmdö» och «med fokus på Värmdö». Edits nr 13–14 behåller nu ort och bas «Värmdö» med KÄLLA-rader, och kalla.last blir 2026-11-03. Kontaktsidan lästes med curl, som också svarade efter två återställda anslutningar. grinda.tom.md punkt 2 är markerad som klar.

## Möja (ingen textändring)
- moja-0496, 0497, 0499, 0500, 0501, 0502, 0503: Raderna prövades mot Redaktörens sidtext från 2026-11-03, och varje citat står ordagrant där. Läsdatum och läsningens fil är uppdaterade. 0500 står kvar som OBELAGD (Möja nämns inte) hos Tom.
- moja-0498: Etiketten «Snickare» prövad och står kvar som KORREKT, RESONERAT. Sidan säger att bröderna «själva bygger stora delar av husen» och anlitar andra bara för el, plåt, murning och plattsättning. Svallas yrkesindelning saknar kategorin bygg. Bedömningen är densamma som för Wallner Marin (moja-0474), som Kontrollanten godkände. Rättas etiketten bort försvinner företaget ur gruppen «Bryggan och sjösidan».
- moja-0478: Raden är omformulerad till dom FEL och åtgärd RÄTTA i koden: HantverkarKort jämför «ö» mot «o». Skribenten för mallarna rättar det. Ingen ändring här. Wallnermarin.se lästes igen över http.

## Vaxholm (edits nr 32, vaxholm.sql)
- vaxholm-0069: OBELAGD, PRECISERA. Ingen SL-källa säger «hela året». Ny text: «SL-buss 670 från Tekniska högskolan går alla dagar enligt SL:s tabell för 17 augusti–12 december 2026». Källa h670670x.pdf.
- vaxholm-0070: KORREKT, BEHÅLL. Uppgiften att båtarna går året runt kommer från Waxholmsbolagets Vaxholmssida (Chromium i dag). Meningen är omformulerad i samma stycke.
- vaxholm-0071: Ny text i bestReason. Museisidan belägger bara museets perioder.
- vaxholm-0465: Kommunens sida «Kommunala båtplatser» står nu på raden: «Kommunala småbåtshamnar för privatpersoner» och «Norrbergshamnen, Badhusgatan - Norrbergsplan». Läget och «kommunala» är därmed belagda av kommunen, och texten är oförändrad, så ingen kompensation behövs. KÄLLA-raderna i vaxholm.sql är lästa i dag.
- vaxholm-N007: Läst igen i dag; båda citaten står på kommunens sida.

## Sandhamn (sandhamn.sql, edits nr 24 ny, sandhamn.tom.md)
- sandhamn-0395: DELVIS, RÄTTA. Namnet blir «Ankaret» enligt profilen «Ankaret ⚓ Sandhamn». Ny UPDATE av name i sandhamn.sql. «Café Ankaret» står också i src/app/blogg/[slug]/page.tsx:67 (Vakten).
- sandhamn-0400: Läsningen uppdaterad. Namnet i meningen följer 0395. Ny beskrivning: «Ankaret är ett kafé med butik och konstgalleri i Sandhamn i Värmdö kommun.»
- sandhamn-0396, sandhamn-0399: Läsningen uppdaterad (Redaktören 2026-11-03); ingen textändring.
- sandhamn-N018: Ny text enligt beskrivningen ovan («med butik och konstgalleri»).
- sandhamn-N022 (ny rad): «i Sandhamn i Värmdö kommun» enligt SEO-regeln. Källor: Värmdö kommuns Trouvillesida («Badplatser i Värmdö», «Trouville, Sandhamn») och Stockholms läns museum («Kommun: Värmdö»).
- sandhamn-0402: Strykningen står. Rätt uppgift och ny text är kompletterade («kompenseras av N018»).
- sandhamn-0409, 0407, 0408: Beskrivningen av Sandhamns Glassigaste Ställe töms med en tom sträng i sandhamn.sql. Med NULL skulle sidmallen skriva en reservtext. Namn och post står kvar, och den tidigare rättelsen av «mellersta» är ersatt.
- sandhamn-0416, 0414, 0415: Samma sak för PUB Alma.
- sandhamn-0538: Källor på raden för alla tre badplatser: Trouville, Fläskberget (Värmdö kommun) och Stranden vid Västerudden (Stockholm Archipelago Trail och OpenStreetMap, MÄTT 37 m till Sandöns västligaste punkt). Fläskbergets KÄLLA-rad där badplatsen står är läst i dag (ny edits nr 24).
- sandhamn-0557: Källor på raden. Waxholmsbolagets Sandhamnssida («Ut till Sandhamn går det turer året runt.», tabell 15 bara sommartid och tabell 16) och h16 belägger «året runt». Badplatserna har samma källor som 0538, och Strömmas Cinderella-PDF ligger på raden. **/bad och /med-barn räknar olika: /bad 3 badplatser, /med-barn 4.** Med-barn-mallen jämför exakta namn, så Stora Trouvillestranden står kvar tills Tom avgjort beslut 6. Listan är inte rörd.
- sandhamn-0497: Källor på raden: Waxholmsbolagets Sandhamnssida och h16 för «året runt», Strömmas Cinderella-PDF för 2 tim 30 min och säsongen.
- sandhamn-0495: Waxholmsbolagets Sandhamnssida och h16 (perioden) tillagda på raden. Att trafiken året runt går på linje 16 följer av att tabell 15 bara gäller sommartid (RESONERAT).

## Sidor som kan bli tunnare (DEL 7)
- /o/sandhamn/restauranger: när beskrivningarna för PUB Alma och Glassigaste Ställe töms försvinner 23 ord. Ankaret blir 1 ord längre. Sidan landar på omkring 336 av 358 ord i baslinjen, det vill säga 93,9 % (MÄTT med wc -w i sidor/sandhamn__restauranger.txt). Det är under gränsen på 95 %. Redaktörens beslut säger «ingen ny text», så kompensationen ligger hos Redaktören eller Tom. Platssidorna /upptack/pub-alma-sandhamn och /upptack/sandhamns-glassigaste-stalle står utan beskrivning.
- /o/moja/hantverkare påverkas inte av den här rundan. Om mallarnas rättelse av HantverkarKort (moja-0478) tar bort raderna «… Möja — kör hit med båt» försvinner 81 ord av 757 (MÄTT: tio rader i baslinjen), vilket ger 89 %. Raderna är felaktiga, så det är en rättelse och ingen förtunning, men måttet slår till.

# Utö — det som kräver Tom (batch 01, 2026-10-29)

Bara det som enligt uppdraget ligger hos Tom: schemaändringar, poster som inte går att belägga (förslag före eventuell borttagning) och uppgifter som bara verksamheten kan ge. Tills beslut finns står den belagda generaliseringen i texten (se uto.sql).

## 1. Radien för Utö (src/lib/islandCoords.ts:72) — förslag, inte ändrat

radiusKm styr också GPS-besöken i appen, så den ändras inte i edits.json. MÄTT i OpenStreetMap 2026-10-29 (relation 6315443, place=island):

- Nålen (58.9375, 18.2562) ligger på ön, men 5,3 km från Gruvbryggan. Med radien 3,0 km räknas den som står i Gruvbyn, där båten lägger till och all service finns, inte som besökare på Utö.
- Från nålen är ön som längst 7,9 km bort. Rånö brygga ligger 4,9 km bort.
- Från OSM:s punkt för ön (58.94759, 18.26230) är ön som längst 7,0 km bort och Gruvbryggan 4,3 km bort.

Förslag (välj ett): (a) radien 5,5 km med nuvarande nål, som täcker Gruvbyn men också når Rånö brygga; eller (b) nålen flyttas till OSM:s punkt för ön och radien sätts till 7,0 km. Badplatsen ravstavik (utan ö-fält, 5,2 km från nålen) syns i dag inte på /o/uto/bad och kommer med i båda fallen.

## 2. Platstyp för Utö camping (schemafråga)

uto-camping-och-stugor har typen hotel. Platstabellen har ingen campingtyp (MÄTT i platsexporten 2026-10-29: restaurant, harbor, beach, cafe, hotel, sauna, fuel, marina, bar, anchorage, fuel_station, nature, attraction, cabin, hostel, nature_harbor). Beslut: ny typ camping (data och kod), eller behålla hotel. Rad uto-0534.

## 3. Platser som inte går att belägga (förslag före eventuell borttagning)

Ingen post har raderats eller dolts. Texterna har skrivits om till det som går att belägga (uto.sql).

- **Bakgården Utö (bakgarden-uto).** Den enda källan, explorearchipelago.com, omdirigerar nu till skargardsstiftelsen.se. Belagt är att det finns ett bageri i Gruvbyn (Skärgårdsstiftelsens Utökarta: "Här i Gruvbyn finns turistbyrå, gästhamn, bensinmack, livsmedel, bageri, …"). Utö gästhamns campingsida nämner "Bageriet" vid Bygatan. Namnet Bakgården och sommarkaféet står inte i någon tillåten källa. Förslag: behåll posten med den nya texten tills någon på ön bekräftar namnet. Byt annars namnet till det bageriet själv använder.
- **Lilla Haket & Ninas Bod (lilla-haket-ninas-bod).** Namnet och kaféet finns bara i OpenStreetMap, som bara får användas för läge. Ingen egen sajt eller kontaktuppgift hittades. Förslag: samma som ovan. Obs: posten Bryggans café och bar (bryggans-lilla-kok-uto) har nästan samma koordinat (cirka 5 m ifrån). Det kan vara samma ställe.
- **Rånö Brygga (rano-brygga).** Typen är restaurang, men posten har ingen text. Ingen tillåten källa nämner en restaurang med det namnet. Länsstyrelsen nämner på Ålö–Rånö bara "Restaurang Rånökällan samt Båtshaket". Punkten ligger 12 m från Rånös strand och är troligen bryggan. Förslag: Tom avgör om posten ska ersättas med en belagd verksamhet, till exempel Rånökällan med egen källa, eller döljas.

## 4. Uppgifter som bara verksamheten kan ge (mejlen är färdiga)

Tills svar finns står den belagda generaliseringen.

**Till:** receptionen@utovardshus.se (från www.utovardshus.se/oppettider/)
**Ämne:** Antal hotellrum och bäddar på Utö Värdshus
**Text:**
Hej! Vi på Svalla beskriver Utö Värdshus på svalla.se och vill bara publicera uppgifter som ni själva står för. Hur många hotellrum och bäddar har värdshuset i dag, räknat på Kvarnvillan, Stenhotellet och hotellstugorna? På er konferenssida står 14 mötesrum och 2–100 personer, och det har vi tagit med. Tack på förhand! Vänliga hälsningar, Tom, Svalla

**Till:** info@utobykrogen.se (från xn--utbykrogen-fcb.se/kontakt)
**Ämne:** Säsong för Utö Bykrog
**Text:**
Hej! Vi på Svalla beskriver Utö Bykrog på svalla.se. Har restaurangen öppet bara under sommaren, eller också andra delar av året? Vi skriver inga öppettider, bara vilken säsong ni har öppet, så att besökare vet när de kan räkna med er. Tack på förhand! Vänliga hälsningar, Tom, Svalla

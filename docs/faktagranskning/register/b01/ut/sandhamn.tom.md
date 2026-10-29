# Sandhamn – det som kräver Tom (faktagranskning b01, 2026-10-29)

## 1. Två källor som inte gick att läsa (blockerar batchen)
Raderna har domen EJ NÅBAR. WebFetch godkändes inte, och plattformarna läses inte via omväg. Läs sidorna i din webbläsare.
- https://instagram.com/ankaretsandhamn – Café Ankaret (rad 0395, 0396, 0399, 0400, 0402). Kolla: att kaféet finns, att det är ett kafé, adressen "Sandhamn 310" och datum för senaste inlägget (högst 12 månader gammalt). OpenStreetMap har "Ankaret Café" vid Trovillevägen. Koordinaten rättas i sandhamn.sql.
- http://www.facebook.com/cafestrindbergsgarden – Café Strindbergsgården (rad 0428–0435). Kolla samma saker, och adressen "Sandhamn 109". OpenStreetMap har inget kafé med det namnet. Närmast ligger "Strindberg's Champagne Club" (59.2890639, 18.9138771). Det kan vara en annan verksamhet.

Den gamla källan för båda (explorearchipelago.com) leder numera till skargardsstiftelsen.se/omraden/ och fungerar inte längre som källa.

## 2. Platser utan tillåten källa (granskaren får inte radera eller dölja dem)
- **PUB Alma** (pub-alma-sandhamn) och **Sandhamns Glassigaste Ställe** (sandhamns-glassigaste-stalle): Platserna har ingen webbplats och finns inte i OpenStreetMap. Den enda källan var explorearchipelago.com, som inte finns längre. Nålarna ligger på bostadsgator. Texterna säger dessutom "Stockholms mellersta skärgård", medan Länsstyrelsen placerar Sandhamn i den yttre skärgården. Förslag: be någon på ön bekräfta att de finns. Annars dölj dem.
- **Stora Trouvillestranden** och **Lilla Trouville Stranden**: Värmdö kommun har bara "Trouville". Lilla Trouville finns som strandnamn i OpenStreetMap (en svag källa), Stora Trouville inte alls. Datafixen 2026-10-19 markerade dem redan med KONTROLLERA som dubbletter av Trouville-stranden. Förslag: dölj båda som dubbletter (färdig sats finns i supabase/datafix/2026-10-19-filmoarna.sql, rad 182–183), eller behåll dem som delar av Trouville. Badplatslistan på /bad räknar i dag Stora Trouvillestranden som en egen badplats.
- **Västerudde strand**: Namnet finns bara i OpenStreetMap, och stranden står inte på kommunens badplatslista. I sandhamn.sql heter den nu "strand" i stället för "badplats", och länken till kommunens startsida tas bort.
- **Bistro Sands**: Namnet kom från bokningssajter. Hotellet skriver bara "restaurangen med uteterassen". Platsen döps i sandhamn.sql om till "Sands Hotells restaurang". Hotellets sida säger inte om restaurangen är öppen för andra än hotell- och konferensgäster, så posten kanske inte ska ligga bland restaurangerna.

## 3. Regionetiketten (förtydligande 6)
Ön har etiketten "Mellersta skärgården". Länsstyrelsens fiskeguide och Waxholmsbolaget placerar däremot Sandhamn i Stockholms yttre skärgård: "I Stockholms yttre skärgård från Sandhamn och söderut" och "en utflykt till den yttre skärgården". Ösidans text säger redan "ytterskärgården" (tagline) och nu också "Stockholms yttre skärgård" (description[3]). Etiketten ändras inte här.

## 4. Fartbegränsningen förbi gästhamnen
Påståendet "högst 5 knop från leden norr om Sandön till söder om Lökholmen" fanns bara på KSSS hamnsida. Jag hittade ingen sjötrafikföreskrift från Länsstyrelsen i länets författningssamling 2026-10-29, och fartbegränsningar får bara beläggas med myndighet. Därför är uppgiften struken ur description[5]. KSSS uppmaning att tänka på svallet står kvar. Vill du ha tillbaka siffran behövs Länsstyrelsens beslut.

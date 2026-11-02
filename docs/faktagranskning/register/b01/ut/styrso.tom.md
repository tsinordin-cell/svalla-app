# Styrsö – det som kräver Tom (Granskare/Skribent 2026-11-02)

Databasen var pausad: WHERE-villkoren i styrso.sql är inte kontrollerade mot Supabase.

## 1. Radie för Styrsö i islandCoords.ts (förtydligande 3) – rad styrso-0284, 0299, 0309, 0318, 0395, 0409, 0435
Styrsö saknas i `src/lib/islandCoords.ts`, så platslistorna använder standardradien 3 km (`islandPlaces.ts:48`).
Därför räknas Fiskeboa Donsö, "Donsö Hamnkrog", Brännö Värdshus, Donsö gästhamn och Brännö Husvik gästhamn som
"på Styrsö" och visas utan avstånd, och /o/styrso/restauranger säger "8 restauranger … på Styrsö" (rätt: 5).

MÄTT 2026-11-02 (haversine från öns nål 57.6152, 11.7757; Styrsös kust ur OSM-relation 6429433, hämtad 2026-10-31):
- Styrsös kust längst bort: 1,99 km (sydspetsen vid Skäret). Kusthotellet 1,22 km, färjeläget Styrsö Skäret 1,55 km.
- Grannarnas platser: Fiskeboa Donsö 2,11 km, Donsö gästhamn 2,12 km, Brännö Husvik 2,30 km, Brännö Värdshus 2,85 km.
- Grannöarnas närmaste strand: Donsö 1,55 km, Köpstadsö 1,70 km, Brännö 1,82 km.

Förslag: `{ slug: 'styrso', name: 'Styrsö', lat: 57.6152, lng: 11.7757, radiusKm: 2.0 },`
Effekt i listorna: bara Styrsös egna platser räknas som på ön. Effekt på besöksdetekteringen: hela Styrsö ryms
(sydspetsen precis innanför), men norra Donsö (från 1,55 km) och västra Köpstadsö (från 1,70 km) räknas också som
Styrsö. Ingen cirkel kring nålen skiljer Styrsö helt från Donsö. Ditt beslut.

## 2. "Donsö Hamnkrog" (restaurants.donso-hamnkrog) – rad styrso-0306–0314: ersättning i stället för radering
Ingen tillåten källa nämner en Donsö Hamnkrog. Donsö hamns egen sida räknar upp "Restaurang Isbolaget Popsicle Café
Fiskeboa Donsö Istappen Grillen Måns Hamncafé Glasskiosk" (https://www.donsohamn.se/, läst 2026-10-31), och
Västsveriges sammanställning (12 oktober 2026) har Isbolaget, Fiskeboa och Popsicle i Donsö hamn. Postens
webbplats (donsohamn.se) är hamnens, och koordinaten är exakt densamma som för Donsö gästhamn.

Förslag: gör om posten till Isbolaget, restaurangen och hotellet i hamnen som båda källorna nämner:
- name: `Isbolaget Hotell & Restaurang`
- description: `Isbolaget Hotell & Restaurang är en restaurang och ett hotell längst ut på kajen i Donsö hamn i Göteborgs södra skärgård, i det gamla ishuset. Här serveras bland annat fisk och skaldjur, dagens lunch, pizza och à la carte.`
  - KÄLLA: https://www.vastsverige.com/visitockero/oppetnu-restaurangguidegoteborgsskargard/ — "Restaurang och hotell längst ut på kajen i Donsö hamn, i det gamla ishuset. Här serveras bland annat fisk och skaldjur, dagens lunch, pizza och à la carte." (läst 2026-10-31)
  - KÄLLA: https://www.donsohamn.se/ — "Restaurang Isbolaget"; "Hotell Isbolaget" (läst 2026-10-31)
- latitude/longitude: 57.5980216, 11.7910826 (OSM node 832457440, "Isbolaget", Donsö Hamnväg 45; läst 2026-11-02)
- website: lämna tom tills Isbolagets egen adress är kontrollerad (inte öppnad i granskningen).
Slugen `donso-hamnkrog` kan stå kvar eller bytas – det är en ändring av vilken verksamhet posten gäller, därför ditt ja.

## 3. Mejl: Bastubryggan Brännö – var ligger bastun? (rad styrso-0468)
Nålen för restaurants.branno-bastubad (57.6231, 11.7503) ligger inte på Brännö utan i vattnet 8 m från Vargös strand
(Vargö naturreservat), 240 m från Känsö (militärt område i OSM). Föreningens sida anger inte var bastun ligger och
OSM saknar den, så nålen kan inte rättas med belägg. Posten visas bara på /upptack/branno-bastubad.

Till: bastubryggan@bastubryggan.nu (adressen från bastubryggan.nu)
Ämne: Var ligger bastun på Brännö?

> Hej!
>
> Svalla är en guide till skärgården och har en sida om Bastubryggan Brännö. Vår kartnål hamnar i dag fel,
> i vattnet vid Vargö, och på er webbplats hittar vi inte var på Brännö bastun ligger.
>
> Kan ni berätta var bastun ligger, till exempel vid vilken brygga eller väg, så att vi kan sätta nålen rätt?
>
> Vi skriver bara det ni själva bekräftar.
>
> Vänliga hälsningar
> Tom, svalla.se

Tills svar finns står nålen kvar (den får inte flyttas till en obelagd plats).

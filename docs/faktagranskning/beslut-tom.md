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

## Väntar på Tom — batch 01 (samlas här, beslutskortet på /team skapas när fler öar är granskade)

### 1. Platsen "Runmarö Bryggkiosk" (`runmaro-bryggkiosk`) – mejl och schemaändring
- **Läget:** ingen tillåten källa nämner en verksamhet med det namnet.
  Webbplatsen den länkar till är Runmarö Lanthandels, och butiken ligger enligt
  egen uppgift "ca 200m från Styrsviks brygga", inte vid bryggan Gatan där
  nålen står. Platsen räknades till Storholmen bara för att Storholmens nål
  låg fel. Den hör till Runmarö (batch 02).
- **Förslag:** skicka mejlet i `register/b01/ut/storholmen.tom.md` till
  info@runmarolanthandel.se (adressen från butikens kontaktsida). Raden står
  kvar som den är tills svar finns. Beskrivningen är redan tom.
- **Ja till ersättning (om svaret är nej):** raden görs om till Runmarö
  Lanthandel med butikens egna uppgifter. Det kräver en ny typ för butik i
  `restaurants` (**schemaändring**) och en uppmätt nål.
- **Nej:** raden står kvar utan text, och Runmarös granskning i batch 02 tar
  ärendet vidare.

### 2. Regionetiketterna ("Mellersta skärgården" m.fl.) – Svallas indelning eller sakuppgift?
- **Läget:** ingen tillåten källa placerar Fjäderholmarna i "Mellersta
  skärgården". Det enda belagda är Lidingö stads egen indelning: Lidingös
  skärgård omfattar holmarna "från och med Storholmen mot Vaxholm i norr …
  samt Fjäderholmarna in mot Stockholm i söder" (lidingo.se, läst
  2026-10-29). Storholmens Granskare hittade samma problem. `regionLabel`
  styr också vilka öar som visas i regionlistorna (`RegionOar.tsx`).
- **Förslag:** behandla regionerna som Svallas egen navigationsindelning och
  skriv in det i ARBETSREGLER. Etiketten är då ingen sakuppgift om
  verkligheten. Där en kommun eller myndighet har en egen indelning, till
  exempel Lidingös skärgård, nämns den i texten med källa.
- **Ja:** regel i ARBETSREGLER, etiketterna står kvar, och texten får den
  belagda indelningen där den finns.
- **Nej:** etiketterna byts till belagda namn ö för ö, och regionlistorna
  byggs om. Det är en större ändring av sajtens struktur.

### 3. GPS-radien: turtaggningen missar delar av Möja och Utö (beslut, rör appen)
- **Läget (MÄTT i OSM och ResRobot 2026-10-29):** radien i `islandCoords.ts`
  är GPS-detektionsradien och styr vilka öar som taggas på en loggad tur.
  - **Möja (3,0 km):** Berg (3 019 m), Möjaström (3 291 m) och Södermöja
    (3 333 m), som är de mest använda bryggorna, ligger utanför. Med 3,5 km
    kommer alla Möjas bryggor med, och Stora Kalholmen (4 208 m) hålls utanför.
  - **Utö (3,0 km):** nålen ligger 5,3 km från Gruvbryggan, så den som står i
    Gruvbyn räknas inte som besökare. Alternativ: (a) 5,5 km med nuvarande
    nål, eller (b) nålen flyttas till OSM:s punkt för ön och radien blir 7,0 km.
  - **Storholmen och Fjäderholmarna (1,5 km):** öarna är cirka 0,8 och 0,7 km
    i radie. Platslistorna lånar radien, så platser på Lidingö visades som om
    de låg på öarna.
- **Vad jag gör utan beslut:** platslistorna får en egen platsradie
  (`platsRadieKm`) med de uppmätta värdena, och nålarna rättas: Storholmens
  låg 40 km fel och Fjäderholmarnas låg i vattnet. GPS-radien rörs inte.
- **Förslag:** höj Möja till 3,5 km och Utö enligt (b). Låt Storholmen och
  Fjäderholmarna stå kvar på 1,5 km tills turtaggningen har prövats.
- **Ja:** GPS-radierna ändras i batch 01:s PR. **Nej:** inget ändras i
  turtaggningen.

### 4. Platstyp för camping (schemaändring)
- Utö camping (`uto-camping-och-stugor`) har typen hotel. Tabellen
  `restaurants` har ingen typ för camping. **Ja:** ny typ camping i data och
  kod. **Nej:** typen hotel står kvar.
- Samma fråga för butiker, se punkt 1.

### 5. Platser på Utö som inte går att belägga (inget raderas utan ditt ja)
- **Bakgården Utö:** det enda belägget, explorearchipelago.com, omdirigeras
  nu. Belagt är att det finns ett bageri i Gruvbyn. Texten säger nu bara
  det. **Förslag:** posten står kvar tills någon på ön bekräftar namnet.
- **Lilla Haket & Ninas Bod:** namnet finns bara i OpenStreetMap, som bara
  får belägga läget. Posten ligger cirka 5 m från Bryggans café och bar,
  så det kan vara samma ställe. **Förslag:** samma som ovan.
- **Rånö Brygga:** typen är restaurang men posten har ingen text.
  Länsstyrelsen nämner på Ålö–Rånö bara "Restaurang Rånökällan samt
  Båtshaket". **Förslag:** ersätt med Rånökällan med egen källa (ja), eller
  dölj posten (nej). Att dölja kräver ditt ja.

### 5b. Platser på Sandhamn utan tillåten källa (inget döljs utan ditt ja)
- **PUB Alma och Sandhamns Glassigaste Ställe:** ingen webbplats, de finns
  inte i OpenStreetMap, och den enda källan (explorearchipelago.com) finns inte
  längre. **Förslag:** be någon på ön bekräfta att de finns, annars dölj dem.
- **Stora Trouvillestranden och Lilla Trouville Stranden:** Värmdö kommun har
  bara "Trouville". Datafixen 2026-10-19 markerade dem redan som möjliga
  dubbletter. **Förslag:** dölj båda som dubbletter av Trouville. En färdig
  sats finns i supabase/datafix/2026-10-19-filmoarna.sql, rad 182–183.
- Västerudde strand och Bistro Sands har fått belagda namn och texter. Det
  kräver inget beslut.
- **Region:** Länsstyrelsen och Waxholmsbolaget placerar Sandhamn i den yttre
  skärgården, men etiketten säger "Mellersta skärgården". Det hör till beslut 2.
- **Fartbegränsningen (information):** "högst 5 knop förbi gästhamnen" fanns
  bara hos KSSS, och ingen sjötrafikföreskrift från Länsstyrelsen hittades.
  Siffran är struken, men KSSS uppmaning att tänka på svallet står kvar.

### 6. Mejl till verksamheter (färdiga, på mejlkortet på /team)
Tills svar finns står den belagda generaliseringen.
- Runmarö Lanthandel: finns "Runmarö Bryggkiosk"? (storholmen.tom.md)
- Utö Värdshus: antal hotellrum och bäddar. Utö Bykrog: säsong. (uto.tom.md)
- Fyra hantverkare som listas under Möja utan att nämna Möja på sina
  webbplatser: Delsholmen Entreprenad, Anderssons Båtvarv, Jowa Elektriska
  och Hellström Marin. Svarar de nej försvinner två av dem helt från Svalla,
  och det är en radering av hela poster. (moja.tom.md)

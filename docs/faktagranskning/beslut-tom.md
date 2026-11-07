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
- **Samma fråga på fler öar:** Sandhamn (Länsstyrelsen och Waxholmsbolaget:
  yttre skärgården) och Husarö (Österåkers kommun: "Långt ut i Österåkers
  yttersta skärgård") har etiketten "Mellersta skärgården".

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
  - **Styrsö (saknas i islandCoords.ts, standardradien 3 km används):**
    platser på Donsö och Brännö räknas som "på Styrsö", och sidan säger 8
    restauranger där rätt antal är 5. MÄTT 2026-11-02: sydspetsen ligger
    1,99 km från nålen, Donsös närmaste strand 1,55 km. Med 2,0 km räknas
    alltså norra Donsö ändå in vid GPS-taggning.
  - **Husarö (2,0 km):** hela ön ryms inom 1,32 km, och 2,0 km tar med
    Särsös brygga (1,66 km).
  - **Grinda (2,5 km):** Grindas längsta punkt ligger 1,32 km från nålen och
    närmaste strand 0,27 km, så 2,5 km-cirkeln tar med annan land, bland
    annat Storön och Västerholmen (MÄTT i OSM 2026-11-08). En besökare där
    taggas alltså som Grindabesökare.
- **Förslag:** höj Möja till 3,5 km och Utö enligt (b), lägg till Styrsö med
  2,0 km och sänk Husarö och Grinda till 1,5 km. Låt Storholmen och Fjäderholmarna stå
  kvar på 1,5 km tills turtaggningen har prövats.
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
- **Fartbegränsningen (löst 2026-11-03, inget beslut behövs):** Kontrollanten
  hittade Länsstyrelsens föreskrift 01FS 2001:138 punkt 135 (omtryck 01FS
  2018:48, ingen senare ändring av punkten). Fem knop vid Sandhamn är
  återinfört med den som källa.

### 5c. Styrsö: "Donsö Hamnkrog" finns inte (ändrar vilken verksamhet posten gäller)
- Ingen tillåten källa nämner en Donsö Hamnkrog. Postens webbplats är Donsö
  hamns, och nålen är densamma som gästhamnens. Donsö hamns egen sida och
  Västsveriges sammanställning (regionalt destinationsbolag, nivå 3) har
  Isbolaget i hamnen.
- **Ja:** posten görs om till Isbolaget Hotell & Restaurang med belagd text
  och uppmätt nål (färdig text i `register/b01/ut/styrso.tom.md`). **Nej:**
  posten står kvar utan belägg.

### 5d. Vaxholm: två platser som hänger på sidor bakom inloggning
- **Vaxholms Hembygdsgårds Café:** enda källan är kaféets Facebooksida.
  Bekräftar den kaféet (senaste inlägget högst 12 månader gammalt) står
  posten kvar. Annars föreslås Hembygdsmuseet i Norrhamnen i stället, vilket
  är en ny post och kräver ditt ja.
- **Waxholms Gästhamn & Rent Under Båtbotten tvätt:** rentunder.se går inte
  att läsa härifrån. Har Rent Under ingen tvätt i Vaxholms gästhamn byts
  namnet till Vaxholms Gästhamn.

### 6. Mejl till verksamheter (färdiga, på mejlkortet på /team)
Tills svar finns står den belagda generaliseringen.
- Runmarö Lanthandel: finns "Runmarö Bryggkiosk"? (storholmen.tom.md)
- Utö Värdshus: antal hotellrum och bäddar. Utö Bykrog: säsong. (uto.tom.md)
- Fyra hantverkare som listas under Möja utan att nämna Möja på sina
  webbplatser: Delsholmen Entreprenad, Anderssons Båtvarv, Jowa Elektriska
  och Hellström Marin. Svarar de nej försvinner två av dem helt från Svalla,
  och det är en radering av hela poster. (moja.tom.md)
- Jowa Elektriska: för Möja behövs ingen fråga längre, eftersom företaget
  skriver "Vi arbetar regelbundet på öar som … Möja"
  (jowael.se/elektriker-skargarden/, Kontrollanten 2026-11-02). Kvar är
  frågan om Vaxholm. Svarar de nej försvinner /o/vaxholm/hantverkare, där
  Jowa är enda posten. (vaxholm.tom.md)
- Bastubryggan Brännö: var ligger bastun? Nålen ligger i vattnet vid Vargö.
  (styrso.tom.md)

### 7. Sidor som bara går att läsa i en inloggad webbläsare (EJ NÅBAR, blockerar batchen)
Uppdaterat 2026-11-03. Lästa av Redaktören i din Chrome 2026-11-02:
hhmarin.se, Café Ankarets Instagram, www.utogasthamn.se och bildens filsida
på Commons. Elsäkerhetsverkets register (Jowa) gick att läsa via en
sökadress, och finnhamn.se lästes av en Granskare. Kvar:
- **Facebook** (Claude-tillägget har inte behörighet för domänen): Café
  Strindbergsgården (Sandhamn) och Vaxholms Hembygdsgårds Café. Ge tillägget
  behörighet för facebook.com, eller läs sidorna själv: namn, att det är ett
  kafé, adress och datum för senaste inlägget.
- **wallnermarin.se och rentunder.se** gav felsida även i din webbläsare.
  Wallner Marin (9 rader under Möja) får söka annan källa. Hittas ingen
  hamnar frågan om posten här.
- **Bolagsverket** (OCT Entreprenads säte, Grinda) är inte läst.
  Generaliseringen "Stockholms skärgård" står tills vidare.

-- Sandhamn: platstexter med källa (Tom 2026-09-23, "Kör" på punkt 3)
-- Ersätter osourcade texter med värdeord ("Känd bar", "levande stämning", "prisvärt",
-- "Klassiker", "ständig kö", "naturliga mötesplatsen") och sätter ö på Sandhamns stränder
-- så att de kommer med på /o/sandhamn och i "I närheten".
--
-- KÄLLOR (lästa 2026-09-23):
--   dykarbaren.se och dykarbaren.se/om-oss: "Sandhamn 425", "säsong maj – september",
--     "Vi erbjuder endast bordsbokning inomhus", "1921 uppfördes huset",
--     "1982 höll man dykutbildningar på Sandhamn ... på nedre botten växte en café- och barverksamhet fram",
--     "Mitt emot, precis vid strandkanten, finns en ... uteservering"
--   sandhamns-vardshus.se: "anno 1672", Puben "Öppet året runt. Här serveras våra klassiska rätter samt lunchmeny.",
--     Restaurangen "Med en magisk utsikt över hamnen. Öppet varje dag från mitten av juni till mitten på september.
--     Annan tid på året är restaurangen främst öppen helger.", Pentaboden "skaldjurslådor/platåer samt fina sallader",
--     "Boende och frukost i Missionshuset"
--   sandhamn.com/sv/restauranger-och-barer/segelsalen: "meny med fokus på säsongens råvaror", listar Bistro,
--     Seglarbaren ("Bar, dansgolv och DJ"), Orangeriet, Terassen ("utsikt över hamnen"),
--     Hamnbaren ("under sommaren där vi då erbjuder After sail")
--   sandshotell.se: "konferens- och weekend-hotell i Sandhamn", "33 bäddar", "restaurangen med uteterassen",
--     "terrasser med utsikt över hamninloppet"
--   explorearchipelago.com/sv/sthlm/mellersta-skargarden/sandhamn (Skärgårdsstiftelsen): PUB Alma "PUB",
--     Sandhamns Glassigaste Ställe "Glass", Sandhamns Värdshus typ Restaurang
--   varmdo.se Trouville, Sandhamn: "Den långsträckta stranden i Trouville, med sin vita sand, ligger på Sandhamns
--     södra sida", "omkring 20 minuters promenad från hamnen", "Toaletter sommartid",
--     "Badet ägs och sköts av Eknö hemman", "Ingen provtagning av badvatten utförs av Värmdö kommun"

update restaurants set description = 'Dykarbaren på Sandhamn 425 är bar och restaurang i ett hus som uppfördes 1921. Baren växte fram 1982, när huset användes för dykutbildningar på Sandhamn. Uteserveringen ligger mitt emot, vid strandkanten. Säsongen är maj–september, och bord bokas bara inomhus eftersom uteserveringen inte går att vädersäkra.',
  updated_at = now() where slug = 'dykarbaren';

update restaurants set type = 'restaurant',
  description = 'Sandhamns Värdshus, anno 1672, har en pub som är öppen året runt med lunchmeny och värdshusets egna rätter, och en restaurang med utsikt över hamnen. Restaurangen har öppet varje dag från mitten av juni till mitten av september och annars främst på helger. På sommaren serverar Pentaboden skaldjur och sallader vid vattnet, och i Missionshuset i byn har värdshuset boende med frukost.',
  updated_at = now() where slug = 'sandhamn-sandhamns-vardshus';

update restaurants set description = 'Sandhamn Seglarhotell har flera restauranger och barer vid gästhamnen: matsalen Segelsalen med en meny som fokuserar på säsongens råvaror, Bistro, Seglarbaren med dansgolv och DJ, Orangeriet, Terassen med utsikt över hamnen och Hamnbaren, som erbjuder after sail på sommaren.',
  updated_at = now() where slug = 'seglarhotellet-sandhamn';

update restaurants set description = 'Bistro Sands är restaurangen på Sands Hotell på Sandhamn, ett konferens- och weekendhotell med 33 bäddar. Restaurangen har en uteterrass, och hotellet har terrasser med utsikt över hamninloppet.',
  updated_at = now() where slug = 'bistro-sands';

update restaurants set description = 'PUB Alma är en pub på Sandhamn i Stockholms mellersta skärgård.',
  updated_at = now() where slug = 'pub-alma-sandhamn';

update restaurants set description = 'Sandhamns Glassigaste Ställe är ett glasscafé på Sandhamn i Stockholms mellersta skärgård.',
  updated_at = now() where slug = 'sandhamns-glassigaste-stalle';

update restaurants set island = 'Sandhamn',
  description = 'Stora Trouville ligger vid Trouville, den långa stranden med vit sand på Sandhamns södra sida, omkring 20 minuters promenad från hamnen. Sommartid finns toaletter. Badet ägs och sköts av Eknö hemman, och Värmdö kommun tar inga badvattenprover här.',
  updated_at = now() where slug = 'stora-trouvillestranden';

update restaurants set island = 'Sandhamn',
  description = 'Lilla Trouville ligger vid Trouville, den långa stranden med vit sand på Sandhamns södra sida, omkring 20 minuters promenad från hamnen. Sommartid finns toaletter vid Trouville. Badet ägs och sköts av Eknö hemman, och Värmdö kommun tar inga badvattenprover här.',
  updated_at = now() where slug = 'lilla-trouville-stranden';

update restaurants set island = 'Sandhamn', updated_at = now()
  where slug in ('flaskbergets-strand', 'vasterudde-strand') and island is null;

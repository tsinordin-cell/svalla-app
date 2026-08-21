/**
 * hike-descriptions.ts
 * Längre beskrivningar per vandring — importeras av [slug]/page.tsx
 * Nyckel = hike.slug från hike-data.ts
 */

export const HIKE_DESCRIPTIONS: Record<string, { body: string; tips?: string[] }> = {

  // ── STOCKHOLMS SKÄRGÅRD ────────────────────────────────────────────────

  uto: {
    body: 'Utö har Stockholms skärgårds mest varierade vandringsstig. De ~8 km passerar järngruvor från 1700-talet, en gammal kvarn, öppna skogspartier och havsklippor mot Östersjön — allt på en och samma ö. En fullständig dag som kombinerar historia, naturreservat och möjligheten att avsluta med middag på Utö Värdshus.',
    tips: [
      'Pendeltåg linje 43 till Nynäshamn, sedan pendelbåt — ingen bil krävs.',
      'Boka bord på Utö Värdshus i förväg under juni–augusti.',
      'Gruvorna är markerade längs leden — ta en paus och läs skyltarna.',
      'Bönsäckan-stranden är ett bra badbetapp halvvägs.',
    ],
  },

  finnhamn: {
    body: 'Finnhamn i mellersta skärgården är den ö folk rekommenderar för vänner som aldrig vandrat i skärgården. De 4 km är välmarkerade, stigarna är tydliga och utsikten mot omgivande öar är svår att slå. STF-vandrarhemskaféet gör att du kan ta det lugnt med lunch utan att behöva planera matsäck.',
    tips: [
      'Waxholmsbolaget linje 10 från Strömkajen — räkna med 2 timmars båtresa.',
      'Klippbadet på öns södra sida passar utmärkt som avslutning.',
      'Hundar är välkomna — kolla STF:s regler för vandrarhemsområdet.',
    ],
  },

  grinda: {
    body: 'Grinda är öen som gör konverteringen — folk som aldrig vandrat i skärgården förstår det direkt när de kliver av färjan. Den 3 km långa leden kombinerar öppen tallskog med havsvy och slutar vid en av de få sandstränder som finns i Stockholms skärgård. STF-gästgården i hamnen är en av de bästa i skärgården.',
    tips: [
      'Waxholmsbolaget från Strömkajen (~1h40) — köp SL-biljett.',
      'Sandstranden är sällsynt i skärgårdssammanhang — passa på att bada.',
      'Boka lunch på STF Grinda Wärdshus i förväg under högsommar.',
    ],
  },

  sandhamn: {
    body: 'Sandhamn i yttre skärgården är lika mycket en plats som en vandring. Rundan runt ön (~5 km) bjuder på färgglada fiskebyggnader, Trouvillestranden och miljöer som inte förändrats sedan segelns guldålder. Avsluta med middag på Sandhamns Värdshus för en dag som sitter kvar länge.',
    tips: [
      'Waxholmsbolaget linje 12 från Strömkajen (~2h30).',
      'Undvik midsommar och första julihelen — ön är då fullpackad.',
      'Trouvillestranden är populär — ta en tidig morgonpromenad dit.',
    ],
  },

  nattaro: {
    body: 'Nåttarö naturreservat är vad Stockholms skärgård var innan den moderniserades. Inget folktoget, ingen bryggrestaurang — bara gammal barrskog, klippor och havet längs en ~8 km led. En av de få öar i Stockholms skärgård som fortfarande ger en känsla av verklig vildmark.',
    tips: [
      'Pendelbåt från Nynäshamn — kontrollera tidtabellen, trafiken är glesare än till de centrala öarna.',
      'Packa med all mat och dryck — ingen service på ön.',
      'Delar av reservatet har restriktioner för hundar — kontrollera Länsstyrelsens webbplats.',
    ],
  },

  moja: {
    body: 'Möja är en av få öar i Stockholms skärgård med ett levande, helårsbebott samhälle. Vandringen längs öns vägar och stigar ger en inblick i ett skärgårdsliv som försvunnit från de flesta turistöar — bakgårdar, fiskebryggor och en gammal skola. En vandring som berättar en historia.',
    tips: [
      'Waxholmsbolaget från Strömkajen (~2h30).',
      'Möja Krog har enklare lunch sommartid.',
      'Leden är mer varierad än på Grinda och Finnhamn — bra bekväma skor rekommenderas.',
    ],
  },

  arholma: {
    body: 'Arholma är norra skärgårdens yttersta ö och en hel dag i sig. Fyren, det gamla lotshuset och havsklipporna mot öppet hav skapar en stämning som är svår att hitta närmre Stockholm. Mot öster möter havet ingen land förrän i Finland.',
    tips: [
      'Räkna med 3–4 timmars restid vardera väg — planera för en tidig start.',
      'Arholma Café håller öppet sommartid — men ta med extra mat.',
      'Kontrollera aktuella reservatsregler för hundar.',
    ],
  },

  ingmarso: {
    body: 'Ingmarsö naturreservat i mellersta skärgården erbjuder välhållen kustnatur utan turistbroschyrer. De ~6 km stigarna tar dig genom omväxlande skog och ut på klipphällar mot havet. En lugn halvdag för den som vill ha skärgårdskaraktär utan folkmassor.',
    tips: [
      'Waxholmsbolaget från Strömkajen (~2h).',
      'Perfekt att kombinera med ett klippbad på öns sydöstra sida.',
      'Bra för familjer med yngre barn — stigarna är tydliga och terrängen hanteras.',
    ],
  },

  gallno: {
    body: 'Gällnö naturreservat har ett tydligt dubbelliv: tät barrskog inåt ön och öppna havsklippor mot yttersidan. Den ~5 km långa leden tar dig igenom båda — en kontrast som är karaktäristisk för mellersta skärgården. Bra kafévagnsdrift vid hamnen sommartid.',
    tips: [
      'Waxholmsbolaget från Strömkajen (~2h).',
      'Reservatets regler är specifika — läs skyltarna vid bryggan.',
      'Leden är lättgången och passar familjer.',
    ],
  },

  landsort: {
    body: 'Landsort är Östersjöns sydligaste punkt och en av Stockholms skärgårds historiskt rikaste öar. Den korta leden (~4 km) tar dig till fyren och ut på klippor där havsbilden öppnar sig åt alla håll. En unik kombination av marinhistoria och dramatisk natur.',
    tips: [
      'Pendelbåt från Nynäshamn — kontrollera tidtabell.',
      'Fyren kan besökas — kolla öppettider.',
      'Bra badplatser längs södra klippkusten.',
    ],
  },

  // ── BOHUSLÄN ──────────────────────────────────────────────────────────

  nordkoster: {
    body: 'Nordkoster är centrum av Sveriges första marina nationalpark och en av landets bästa vandringsöar. De ~8 km längs leden tar dig runt dramatiska klippavsatser mot Västerhavet — ett landskap som ser ut som det är hämtat från en atlantisk nationalpark. Kombineras bäst med ett besök på systerön Sydkoster.',
    tips: [
      'Tåg Göteborg → Strömstad, sedan båt till Koster (~3–4h totalt).',
      'Boka boende i god tid — ön är populär under sommaren.',
      'Ta med alla väder-alternativ — havsvindar kan vara starka.',
    ],
  },

  sydkoster: {
    body: 'Sydkoster är bilfri och har välmarkerade leder längs Kosterhavets nationalparkslandskap. De ~6 km tar dig förbi kvällsdoppsplatser och ut på klippor som fångar Västerhavets kvällsljus. En perfekt komplement till Nordkoster samma dag.',
    tips: [
      'Samma båt som till Nordkoster stannar på Sydkoster.',
      'Kvällsdoppet väster om ön är legendariskt i rätt väder.',
      'Fler restauranger och caféer än på Nordkoster.',
    ],
  },

  fjallbacka: {
    body: 'Fjällbacka och Grötöarkipelagen kombinerar dramatisk bohuslänsklippor med kulturhistoria och skärgårdsatmosfär. Kändisbyns hamn är bara starten — vandringen fortsätter ut mot exponerade havsbranter med vy mot de yttersta kobbarna. En av Bohusläns bästa halvdagar.',
    tips: [
      'Buss 875 från Göteborg (~2h30) eller bil.',
      'Besök Kungsklyftan — en imponerande klippspricka i bykärnan.',
      'Ingrid Bergmans minnesplats vid hamnen är ett välkänt stopp.',
    ],
  },

  marstrand: {
    body: 'Marstrand är en bilfri ö med Carlstens fästning som dominerande landmärke och en av Bohusläns mest välbevarade stadsmiljöer. Rundan runt ön (~3 km) kombinerar fästningshistoria med havsvy och en av de bästa matscenerna i regionen. Nås enkelt med buss och färja.',
    tips: [
      'Buss 302 mot Ytterby, sedan tåg in till Göteborg — eller ta Marstrandsexpressen direkt. Marstrandsfärjan ingår i Västtrafik-biljetten.',
      'Boka bord på restaurang i god tid under midsommar och regattaveckor.',
      'Fästningen kan besökas med guidade turer sommartid.',
    ],
  },

  'vrango-bohuslan': {
    body: 'Vrångö i södra Göteborgs skärgård är ett bilfritt naturreservat med råa klippor som möter Västerhavet direkt. De 4 km är korta men intensiva — strandklippor, havsstrimma och marin natur i varje steg. En av de bäst tillgängliga vilda öarna i Sverige.',
    tips: [
      'Spårvagn linje 11 → Saltholmen, sedan båt linje 281.',
      'Klipporna på öns västra sida är fantastiska vid solnedgång.',
      'Ingen servering på ön — ta med mat och vatten.',
    ],
  },

  kladedsholmen: {
    body: 'Klädesholmen på Tjörn är ett välbevarat fiskebysamhälle med en historia kopplad till sillfiskets guldålder. Kustpromenaden tar dig förbi gamla fabriker, båtvarv och röda sjöbodar längs en charmig hamnmiljö. En annorlunda vandring som berättar om Bohusläns maritima arv.',
    tips: [
      'Buss 870/871 från Göteborg → Tjörn (~1h30), sedan lokalbuss.',
      'Saltö mathantverk i byn är känt för sill och lokala produkter.',
      'Bra att kombinera med Pilane skulpturpark på fastlandet.',
    ],
  },

  mollösund: {
    body: 'Mollösund på Orust är en av Bohusläns bäst bevarade gamla fiskehamnar. De snävt packade trä-husen, de målade sjöbodarna och den lugna hamnen ger en autentisk känsla som är sällsynt längs den annars turistifierade kusten. Vandringen följer kustlinjen med omväxlande vy.',
    tips: [
      'Bil eller lokal buss från Stenungsund.',
      'Restaurang och café i byn — bra matupplevelse.',
      'Inre Kustleden passerar Mollösund om du vill vandra längre.',
    ],
  },

  hamburgsund: {
    body: 'Hamburgsund norrut längs Bohuslän har havsklippor med Norges kust på horisonten och en kustled som följer den exponerade yttersidan av Bohuslän. En av de mer dramatiska halvdagslederna i regionen — känslan av öppet hav är konstant.',
    tips: [
      'Buss 875 från Göteborg (~3h) eller bil.',
      'Café och restaurang i byn.',
      'Kombinera gärna med Fjällbacka på samma tur — de ligger nära.',
    ],
  },

  grebbestad: {
    body: 'Grebbestad är Bohusläns ostroncentrum och kustlederna runt byn kombinerar klipplandskap med havsvy och en stark matkultur. Vandringen längs klipporna ger en känsla av exponerat Västerhav — och det finns gott om ursäkter att avsluta med ostron i byn.',
    tips: [
      'Buss 878 från Göteborg (~3h) eller bil.',
      'Grebbestads ostronodlingar är besöksvärda.',
      'Kustleden norrut mot Tanumshede är välmarkerad.',
    ],
  },

  smogen: {
    body: 'Smögens välkända brygga är utgångspunkten för en kort vandring (~3 km) längs klippor med Västerhavets dramatiska ljus. Välbesökt men med god anledning — utsikten och den bohuslänskaffekultur som väntar i byn rättfärdigar trängsel.',
    tips: [
      'Buss 861 från Göteborg Nils Ericsonterminalen (~2h) eller bil.',
      'Bryggan är störst under midsommar och juli — kom tidigt.',
      'Havsbadsanläggningen Smögens Hafvsbad är ett välkänt stopp.',
    ],
  },

  // ── GÖTEBORGS SKÄRGÅRD ────────────────────────────────────────────────

  'vrango-goteborg': {
    body: 'Vrångö längst söderut i Göteborgs skärgård är ett bilfritt naturreservat med direktkontakt med Västerhavet. Klipporna på öns västra sida är råa och obearbetade — en känsla av vildmark som är svår att tro att den nås med spårvagn och pendelbåt från centrala Göteborg.',
    tips: [
      'Spårvagn linje 11 → Saltholmen, båt linje 281/282.',
      'Ta med mat — ingen servering på ön.',
      'Stranden på öns södra del är populär för bad.',
    ],
  },

  styrso: {
    body: 'Styrsö i södra Göteborgs skärgård har ett välkänt värdshus och badklippor som gör sig bäst i kvällsljuset. Den 3 km långa leden tar dig runt öns mjuka natur — böljande landskap i kontrast mot Vrångös råa klippor. Bra alternativ för en kortare dag.',
    tips: [
      'Spårvagn linje 11 → Saltholmen, båt linje 282.',
      'Styrsö Skäret värdshus är välkänt för mat med havsutsikt.',
      'Bilfri ö — Göteborgsborna tar sig hit för att koppla av.',
    ],
  },

  donso: {
    body: 'Donsö är Göteborgs skärgårds fiskehamn par excellence. Rökeriet, bystigarna och den äkta skärgårdsatmosfären skiljer den från de mer turistifierade öarna. En vandring som lär dig mer om hur Göteborgs skärgård faktiskt lever än om hur den ser ut på Instagram.',
    tips: [
      'Spårvagn linje 11 → Saltholmen, båt linje 281.',
      'Donsö Rökeri säljer lokalt rökt fisk — ett naturligt stopp.',
      'Ön är aktiv med fiskebåtstrafik — en annan stämning än grannöarna.',
    ],
  },

  'asperö': {
    body: 'Asperö är den lugna grannen i södra skärgården — bilfri, enkel och med välvalda badklippor längs den korta leden. Perfekt för en halvdag när du vill ha skärgårdskaraktär utan att planera för en hel dag.',
    tips: [
      'Spårvagn linje 11 → Saltholmen, båt linje 282.',
      'Ingen servering — ta med matsäck.',
      'Lätt att kombinera med Styrsö på samma tur.',
    ],
  },

  brando: {
    body: 'Brändö är en av de minsta bilfria öarna i södra Göteborgs skärgård med en enkel strandpromenad och vy mot Göteborg. En trivsam halvdag för den som vill ha lugn utan att resa långt.',
    tips: [
      'Spårvagn linje 11 → Saltholmen, båt linje 282.',
      'Perfekt att kombinera med Styrsö eller Asperö.',
      'Ingen servering — ta med mat.',
    ],
  },

  hono: {
    body: 'Hönö / Klåva nås med buss och erbjuder en varierad kustlinje med gott om service i byn. En bra halvdagsvandring i norra Göteborgs skärgård som passar dem som inte vill ta sig lika långt söderut.',
    tips: [
      'Buss 301 från Göteborg → Öckerö (~1h).',
      'Bra serviceutbud i byn — restaurang och café.',
      'Kombinera gärna med Öckerö eller Björkö på fastlandet.',
    ],
  },

  'tjorn-pilane': {
    body: 'Tjörns Pilane skulpturpark kombinerar samtidskonst med ett dramatiskt bohuslänslandskap på ett sätt som är unikt i Sverige. Leden tar dig förbi skulpturer placerade direkt i klippterrängen med havsutsikt som bakgrund. En annorlunda vandring som blandar natur och kultur.',
    tips: [
      'Buss 870/871 från Göteborg C (~1h30).',
      'Kontrollera öppettider för skulpturparken innan besöket.',
      'Bra att kombinera med Klädesholmen på Tjörn.',
    ],
  },

  'orust-mollösund-goteborg': {
    body: 'Mollösund på Orust är en välbevarad gammal fiskebyatmosfär längs Bohusläns inre kustled med charm i varje detalj. Vandringen längs kustlinjen ger en inblick i ett bohuslänskt fiskeliv som annars är svårt att hitta.',
    tips: [
      'Buss eller bil från Göteborg.',
      'Restaurang och café i byn.',
      'Inre kustleden passerar här för den som vill vandra längre.',
    ],
  },

  'marstrand-goteborg': {
    body: 'Marstrand med Carlstens fästning är Bohusläns klassiskaste dagsmål och en av de bäst tillgängliga historiska miljöerna i västra Sverige. Rundan runt den bilfria ön (~3 km) kombinerar fästningshistoria med havsvy och ett rikt restaurangutsläpp.',
    tips: [
      'Buss 302/312 från Göteborg C, sedan Marstrandsfärjan (ingår i Västtrafik-biljetten).',
      'Boka restaurang i förväg under sommarsäsongen.',
      'Fästningen erbjuder guidade turer sommartid.',
    ],
  },

  kungsbackafjord: {
    body: 'Kungsbackafjorden vid gränsen Göteborg–Halland erbjuder fjordnatur i en lugn halvdagsled längs vattenlinjen. Nästintill turistfritt och genuint grönt — ett bra alternativ när de mer välkända öarna känns överfulla.',
    tips: [
      'Pendeltåg Göteborg → Kungsbacka (~30 min), sedan vandring mot fjorden.',
      'Bra för tidig vår och höst när skärgårdsöarna är stängda.',
    ],
  },

  // ── GOTLAND ──────────────────────────────────────────────────────────

  'digerhuvud-faro': {
    body: 'Digerhuvud på Fårö har de mest dramatiska raukarna i Sverige — kalkstenskolonner upp till tio meter höga som reser sig ur havet som ett surrealistiskt landskap. Den korta leden (~3 km) tar dig längs strandlinjen förbi formationer som ser ut som skulpturer. En halvdag som stannar kvar länge.',
    tips: [
      'Destination Gotland Nynäshamn → Visby, sedan bil till Fårö (nödvändigt).',
      'Fårösund–Fårö-färjan ingår inte i Destination Gotland-biljetten.',
      'Maj och september är bäst — sommaren är het och torr.',
    ],
  },

  lickershamn: {
    body: 'Vid Lickershamn på Gotlands nordvästkust reser sig Jungfrun — Gotlands mest fotograferade raukar — ensam ur havet som ett landmärke. Den korta leden (~2 km) tar dig längs strandlinjen med kalkstenslandskapet som konstant sällskap. Nås med buss från Visby utan bil.',
    tips: [
      'Buss från Visby (~45 min) eller bil.',
      'Parkeringen vid Lickershamn kan vara full i juli.',
      'Kombinera gärna med Lummelundagrottorna som ligger nära.',
    ],
  },

  lummelunda: {
    body: 'Lummelundagrottorna norr om Visby är en av Gotlands bästa upplevelser och kombineras naturligt med en kort promenad i omgivande naturmark. Grottorna sträcker sig kilometerlångt under marken och guidning ingår i entréavgiften. Perfekt för barn och för kalla eller regniga dagar.',
    tips: [
      'Buss 61 från Visby (~30 min).',
      'Boka entré i förväg under högsommar.',
      'Ta med ett lager extra — grottan håller ca 8°C oavsett utomhustemperatur.',
    ],
  },

  'holmhallar-gotland': {
    body: 'Holmhallar på södra Gotland ger känslan av att befinna sig i världens ände. Ett gammalt fyr, råa stränder och vidsträckt naturmark längs Östersjön skapar en stämning som är svår att hitta på öns mer turistifierade delar. En halvdagsvandring för den som söker ensamhet.',
    tips: [
      'Bil eller cykel från Visby (~1h söderut).',
      'Ingen servering — ta med mat och vatten.',
      'Stranden är bra för bad men nå dit tidigt i juli.',
    ],
  },

  'sudersand-faro': {
    body: 'Sudersand på Fårö är öns bästa strand med ett karaktäristiskt dynlandskap och badvatten som upplevs annorlunda mot fastlandet. Vandringen längs strandlinjen kombinerar badmöjligheter med det öppna, vindpinade fårölandskapet.',
    tips: [
      'Bil krävs för att ta sig till Fårö och Sudersand.',
      'Sommarcaféet vid stranden har öppet under sommarsäsongen.',
      'Sandstormar kan förekomma — ta med solskydd.',
    ],
  },

  'langhammars-faro': {
    body: 'Langhammars på Fårö är öns vildaste rauklandskap — tystare och mer exponerat än Digerhuvud, och nästan alltid folktomt. Raukarna här är lägre men spridda längs en längre strandremsa, vilket ger en annan känsla av vandring i ett unikt landskap.',
    tips: [
      'Bil krävs — Langhammars nås via väg på Fårö.',
      'Kombinera med Digerhuvud och Sudersand för en full Fårö-dag.',
      'Ingen servering — ta med matsäck.',
    ],
  },

  'hellvi-gotland': {
    body: 'Hellvi på norra Gotland är en lugn och välmarkerad kustsida med bra badmöjligheter och enkel tillgänglighet från Visby med buss. Landsbygdskaraktären och det stilla kustlandskapet gör den till en bra halvdag utan turistträngsel.',
    tips: [
      'Buss från Visby norrut (~1h) — kontrollera aktuell linje på gotlandskollektivtrafik.se.',
      'Hellvi kyrka är en av Gotlands välbevarade medeltidskyrkor.',
    ],
  },

  'petesviken-gotland': {
    body: 'Petesviken på Gotlands östkust är ett stilla landskap med fågelrika strandängar och havsvy mot fastlandet. Lite känt och genuint fint — en av de platser på Gotland som ännu inte blivit turistifierade.',
    tips: [
      'Bil (~45 min från Visby).',
      'Bra för fågelskådning under vår och höst.',
      'Ta med kikare.',
    ],
  },

  'gnisvard-gotland': {
    body: 'Gnisvärd söder om Visby är känt för sina kittade sten och raukar längs Gotlands västkust. Den korta vandringen (~3 km) kombineras naturligt med ett kaféstopp i byn och är lätt att nå med cykel från Visby.',
    tips: [
      'Buss från Visby söderut (~30 min) eller cykel — kontrollera linje på gotlandskollektivtrafik.se.',
      'Gnisvärd har ett välkänt café.',
      'Solnedgången över havet är fantastisk härifrån.',
    ],
  },

  'frojel-gotland': {
    body: 'Fröjel / Klintebys kust längs Gotlands västra kustlinje kombinerar en medeltida kyrka med en av öns finare halvdagsleder. Leden går längs kalkstensklippor med havsutsikt och är bra välmarkerad.',
    tips: [
      'Buss (~1h) eller bil från Visby.',
      'Fröjels kyrka är en av Gotlands välbevarade ringmurskyrkor.',
    ],
  },

  // ── HÖGA KUSTEN ───────────────────────────────────────────────────────

  skuleskogen: {
    body: 'Skuleskogen är Höga kustens hjärta och ett av de mest dramatiska naturreservaten i Skandinavien. UNESCO-klassade bergsidor reser sig direkt ur havet — ett landskap format av landisens avsmältning och landets fortsatta landhöjning. Spårnätet på 30 km rymmer allt från korta utflykter till flerdagsvandringar.',
    tips: [
      'SJ/Norrtåg → Härnösand eller Kramfors, sedan lokal buss eller bil.',
      'Slåttdalsskrevan — en 200 m lång klippspricka — är ett måste.',
      'Planera minst en heldag; etapperna längs Höga kustenleden är krävande.',
      'Ta med övernattningsutrustning för ett autentiskt naturupplevelse.',
    ],
  },

  rotsidan: {
    body: 'Rotsidan längs Höga kustenleden är en av ledens finaste delar — strandnära urskog med dramatisk bergskaraktär och havsvy hela vägen. De ~8 km är tekniskt medel men belönar med ett landskap som är unikt i Sverige.',
    tips: [
      'SJ/Norrtåg → Härnösand, sedan lokal buss eller bil.',
      'Del av Höga kustenleden — kan ingå i en längre etappvandring.',
      'Bra skor är viktiga; terrängen är ojämn längs klippkusten.',
    ],
  },

  trysunda: {
    body: 'Trysunda är en liten fiskehamnsö med ett av Sveriges bäst bevarade 1800-talssamhällen, nådd med sommarbåt. Den korta leden (~3 km) ger stor känsla — tyst, välhållen och med en hamnatmosfär som är genuint annorlunda. En av de starkaste upplevelserna längs Höga kusten.',
    tips: [
      'Sommarbåt från Kramfors-hållet — kontrollera aktuella tidtabeller.',
      'Restaurang och café öppet sommartid.',
      'Boka boende i god tid — ön har begränsad kapacitet.',
    ],
  },

  ulvon: {
    body: 'Ulvön är mest känd för surströmming men vandringen runt ön (~6 km) är en av Höga kustens bästa. Leden går längs dramatisk klippkust med vy mot Bottenhavet och passerar det välbevarade fiskeläget Ulvöhamn.',
    tips: [
      'Sommarbåt från Kramfors-hållet — kontrollera tidtabell.',
      'Ulvöhamns kapell är ett av de vackraste i Norrland.',
      'Surströmmingens säsong är i slutet av augusti.',
    ],
  },

  'hoga-kusten-leden': {
    body: 'Höga kustenleden (130 km, UNESCO) är ett av Sveriges mest kompletta vandringsäventyr längs havslinjen. Leden sträcker sig från Härnösand till Örnsköldsvik längs dramatisk kustterräng med extrema höjdskillnader och urskogssektioner.',
    tips: [
      'Dela upp i etapper — de flesta vandrar 2–5 dagar.',
      'Tjockeby, Noraström och Bönhamn är bra basstationer.',
      'Maj och september ger bäst förhållanden.',
    ],
  },

  'norahamn-hoga-kusten': {
    body: 'Norrfällsviken och Norahamn längs Höga kustenleden kombinerar dramatisk kustterräng med välbevarad fiskemiljö. Klipporna reser sig direkt från havet och leden bjuder på kontinuerliga vyer mot Bottenhavet.',
    tips: [
      'Del av Höga kustenleden — kan ingå i etappvandring.',
      'Norahamn är ett pittoreskt fiskeläge med gästbrygga.',
    ],
  },

  'bönhamn-hoga-kusten': {
    body: 'Bönhamn är ett välbevarat fiskeläge vid Höga kustenleden med karaktäristiska röda bodar längs klippbrynet. Vandringen runt halvön är kort men dramatisk med havsutsikt åt båda håll.',
    tips: [
      'Bil rekommenderas eller del av längre etappvandring längs Höga kustenleden.',
      'Rödbodsmiljön fotograferas flitigt — kom tidigt på morgonen.',
    ],
  },

  'forsvik-hoga-kusten': {
    body: 'Forsvik längs Höga kusten ger tillgång till typisk kustterräng med djup skog och havsklippor som omväxlar. En bra halvdagsdel av Höga kustenleden för den som inte vill ta hela etappen.',
    tips: [
      'Del av Höga kustenleden.',
      'Bra för nybörjare som vill prova Höga kustens terräng.',
    ],
  },

  'ornskoldsvik-hoga-kusten': {
    body: 'Örnsköldsvik är norra ändpunkten av Höga kustenleden och har ett tydligt naturreservatsnät runt staden. Skuleskogens södra entré nås härifrån och ger direkttillgång till ledens mest dramatiska sektioner.',
    tips: [
      'Tåg till Örnsköldsvik — bra förbindelser från Stockholm och Umeå.',
      'Skuleskogen börjar precis söder om staden.',
    ],
  },

  // ── BLEKINGE ──────────────────────────────────────────────────────────

  'hano-blekinge': {
    body: 'Hanö är Blekinges mest mytomspunna ö — en unik engelsk kyrkogård från Napoleonskrigen, fågelrika strandängar och råa ankringsplatser längs en orörd kustlinje. Nås med sommarbåt från Nogersund och ger en känsla av att ha kommit till en annan tid.',
    tips: [
      'Sommarbåt från Nogersund — kontrollera aktuell tidtabell.',
      'Den engelska begravningsplatsen är ett unikt historiskt stopp.',
      'Ingen permanent service på ön — ta med matsäck.',
    ],
  },

  'aspö-blekinge': {
    body: 'Aspö är en välbevarad skärgårdsö nära Karlskrona med gästbrygga och byatmosfär som är annorlunda mot Stockholms skärgård. Pendelbåten tar dig dit på kort tid och leden (~4 km) ger en fin genomgång av öns kustlandskap.',
    tips: [
      'Blekingetrafiken pendelbåt från Karlskrona.',
      'Gästbrygga för de som tar sig dit med egen båt.',
    ],
  },

  'tjurko-blekinge': {
    body: 'Tjurkö utanför Karlskrona är lättillgängligt med pendelbåt och har en vacker klippkust längs den korta leden. En bra halvdag för den som är i Karlskrona och vill kombinera UNESCO-världsarvet med en naturupplevelse.',
    tips: [
      'Blekingetrafiken pendelbåt från Karlskrona.',
      'Kombinera med en stadsvandring i Karlskrona.',
    ],
  },

  'hasslo-blekinge': {
    body: 'Hasslö är en bilfri ö nära Karlskrona med välskött natur och byatmosfär. En enkel och lättillgänglig halvdag för den som vill se Blekinges skärgård på ett avslappnat sätt.',
    tips: [
      'Blekingetrafiken pendelbåt från Karlskrona.',
      'Bra för familjer med barn.',
    ],
  },

  'sturko-blekinge': {
    body: 'Sturkö är Blekinges mest varierade skärgårdsö med leder längs en omväxlande kustlinje som ger olika karaktär åt varje etapp. Naturreservat, badplatser och öppen natur längs ~5 km.',
    tips: [
      'Blekingetrafiken pendelbåt från Karlskrona.',
      'Bra badplatser längs ledens södra del.',
    ],
  },

  'ronneby-skargard': {
    body: 'Ronneby skärgård är geologiskt unik med sin serpentinsten — en rödbrun, skimrande bergart som ger kustlandskapet en dramatisk karaktär som saknar motstycke längs den svenska kusten. En sevärdhet för naturintresserade.',
    tips: [
      'SJ → Ronneby, sedan bil eller lokal buss.',
      'Ta med kamera — serpentinstenen är fotogenisk.',
    ],
  },

  'karlskrona-stadsvandring': {
    body: 'Karlskrona är UNESCO-världsarv och en av Europas bäst bevarade örlogsstäder. Stadsvandringen (~3 km) tar dig förbi Amiralitetskyrkan, marinmuseerna och ut mot den yttre skärgårdens siluett. En kulturvandring som är lika informativ som vacker.',
    tips: [
      'Direkt tåg till Karlskrona C (~4h30 från Stockholm).',
      'Marinmuseum och Blekinge museum är bra komplement till vandringen.',
      'Stortorget är ett av Europas största barockstorg.',
    ],
  },

  'solvesborg-kust': {
    body: 'Sölvesborg på Blekinges västra kust är en bra startpunkt för Östersjöleden med en enkel kustpromenad och gott om service. Halvstaden har ett charmigt centrum och strandlinjen ger direkt havsutsikt.',
    tips: [
      'SJ → Sölvesborg (~3h30 från Stockholm).',
      'Östersjöleden startar här — bra för den som vill vandra längre.',
    ],
  },

  'tromto-blekinge': {
    body: 'Tromtö nära Karlskrona är en lugn ö med hamnmiljö och naturreservat som kombineras i en kort vandring. Bra för den som vill ha Blekinges skärgårdskaraktär utan att ta sig till de yttersta öarna.',
    tips: [
      'Bil rekommenderas.',
      'Gästbrygga för båtbesök.',
    ],
  },

  nogersund: {
    body: 'Nogersund är avresehamnen för Hanö-båten och en charmig fiskehamn i sig med en kort promenad längs vattnet. En bra uppvärmning eller avslutning för en Hanö-dag.',
    tips: [
      'SJ → Sölvesborg, sedan buss.',
      'Sommarbåten till Hanö avgår härifrån — kolla tidtabell.',
      'Restaurang och café i byn.',
    ],
  },

  // ── ÖLAND ─────────────────────────────────────────────────────────────

  'trollskogen-oland': {
    body: 'Trollskogen på norra Öland är ett av Sveriges märkligaste naturlandskap — gammal urskog med vridna, vindpinade träd precis vid strandlinjen, som om skogen håller på att trilla ut i havet. Kontrasten mellan den knotiga granskogen och det öppna alvaret utanför är unik i Sverige.',
    tips: [
      'Tåg → Kalmar, sedan buss KLT norrut på Öland.',
      'Tillgängligheten är god — bra för alla åldrar.',
      'Kombinera med ett stopp vid Böda camping-området.',
    ],
  },

  'ottenby-oland': {
    body: 'Ottenby naturreservat på södra Öland är Europas bästa fågelskådningslokal och en av de viktigaste rastplatserna för migrande fåglar i hela Skandinavien. Leden (~5 km) går längs strandängar och kalkstenshällar med Östersjön på ena sidan och alvaret på den andra.',
    tips: [
      'Tåg → Kalmar, sedan buss KLT söderut på Öland.',
      'Ottenby fågelstation har öppet och erbjuder ringmärkning.',
      'Bäst under vår- och höstmigration (april–maj, aug–okt).',
    ],
  },

  'borgholm-oland': {
    body: 'Borgholm och det dramatiska ruinslottet dominerar centrala Ölands kustlinje. Vandringen runt slottsruinen och längs Borgholms strandkant kombinerar kulturhistoria med kustvy mot Kalmarsund och Gotland i fjärran.',
    tips: [
      'Tåg → Kalmar, sedan buss KLT till Borgholm.',
      'Borgholms slott kan besökas — öppet sommarsäsong.',
      'Solliden-palatset (kungafamiljen) ligger intill — kan ses utifrån.',
    ],
  },

  'alvar-oland': {
    body: 'Ölands alvar är UNESCO-klassat och ett av Europas mest unika öppna landskap — ett kalkstensflak utan träd som sträcker sig mil efter mil med vidsträckt himmel och en natur som saknar motstycke i Sverige. Midsommarblomstringen är legendarisk.',
    tips: [
      'Bil rekommenderas för att nå de bästa alvarpartierna.',
      'Bäst i maj–juni under blomsterperioden.',
      'Känslig flora — håll dig till markerade stigar.',
    ],
  },

  'byrum-oland': {
    body: 'Bysrum rassbrant på nordvästra Öland är ett dramatiskt naturlandskap med sandraviner som rasat ut mot havet. En geologisk kuriosa som ger en annorlunda känsla — vind och sand i ett öppet, exponerat landskap.',
    tips: [
      'Bil rekommenderas.',
      'Kombinera med Trollskogen som ligger nära.',
    ],
  },

  'kapelludden-oland': {
    body: 'Kapelludden på sydöstra Öland är ett välkänt fyrlandskap med strandängar och ett av Ölands bästa fågeltorns- och rastplatsskydd. Bra halvdagsvandring längs kalmarsundssidan.',
    tips: [
      'Bil rekommenderas.',
      'Fågeltornet ger bra överblick under migrationstid.',
    ],
  },

  'eketorp-oland': {
    body: 'Eketorps borg på södra Öland är en rekonstruerad fornborg från folkvandringstiden med guidade turer och levande historia. Vandringen runt borgen och det omgivande naturlandskapet kombinerar arkeologi med alvarnatur.',
    tips: [
      'Tåg → Kalmar, sedan buss söderut.',
      'Eketorps borg har guidade visningar sommartid.',
      'Kombinera med Ottenby fågelstation för en full dag.',
    ],
  },

  'grönhögen-oland': {
    body: 'Grönhögen på sydvästra Öland är en liten fiskeby med välbevarad miljö och kalkstenshällar längs kustlinjen. En lugn halvdag bort från Ölands mer välbesökta platser.',
    tips: [
      'Bil rekommenderas.',
      'Kombinera med södra Ölands övriga sevärdheter.',
    ],
  },

  'lerkaka-oland': {
    body: 'Lerkaka på östra Öland är känt för en av öns bäst bevarade väderkvarnsrader — sju vindkvarnar i rad längs alvarkanten med havsvy mot Kalmarsund. Inte en lång vandring men en stark visuell upplevelse.',
    tips: [
      'Bil rekommenderas.',
      'Fotografera i morgon- eller kvällsljus för bäst effekt.',
    ],
  },

  'köpingsvik-oland': {
    body: 'Köpingsvik på nordvästra Öland erbjuder en enkel kustpromenad med havsvy och tillgång till den norra alvarnaturen. Bra för en kortare halvdag.',
    tips: [
      'Tåg → Kalmar, sedan buss KLT norrut.',
    ],
  },

  // ── SKÅNE ─────────────────────────────────────────────────────────────

  kullaberg: {
    body: 'Kullaberg i nordvästra Skåne är ett av Sveriges mest dramatiska kustlandskap — 70 meter höga klippavsatser mot Öresund och Kattegatt, fyrar och en unik geologi som inte finns någon annanstans i Sverige. Naturreservatet är välskött med ett nätverk av markerade leder.',
    tips: [
      'Bil rekommenderas; kollektivtrafik finns men är gles.',
      'Mölle fyren ger en av de bästa utsikterna längs hela Skåneleden.',
      'Kullabergs marina centrum har guidning om platsens geologi.',
    ],
  },

  'hovs-hallar-skane': {
    body: 'Hovs Hallar i nordvästra Skåne är ett dramatiskt klipplandskap längs Skåneleden med klippformationer och havsklippor som ger en oväntad vildmarkskänsla i södra Sverige.',
    tips: [
      'Bil rekommenderas.',
      'Del av Skåneleden — kan kombineras med Kullaberg.',
    ],
  },

  'sandhammaren-skane': {
    body: 'Sandhammaren på sydöstra Skåne är ett dynamiskt dynlandskap med ständigt rörlig sand och ett av Skånes bäst kända havslandskap. Vandringen längs stranden och dynerna ger en vild, exponerad känsla.',
    tips: [
      'Bil eller buss från Ystad.',
      'Bra fågelskådning — Sandhammarens fågelstation är aktiv.',
      'Dynerna förflyttas — håll dig till markerade stigar.',
    ],
  },

  'stenshuvud-skane': {
    body: 'Stenshuvud nationalpark i sydöstra Skåne kombinerar ett av Skånes få bergslandskap med kustnatur. Klättringen upp till toppen (~97 m) belönar med vy över Hanöbukten och östersjölandskapet.',
    tips: [
      'Buss från Simrishamn.',
      'Nationalparkscentrum vid ingången ger information om flora och fauna.',
      'Bra för familjer — lagom svår klättring.',
    ],
  },

  'ales-stenar-skane': {
    body: 'Ales stenar på sydkusten av Skåne är ett av de mest imponerande forntidsminnena i Sverige — ett stenskepp om 67 meter längs krönet av en klippa med panorama mot Östersjön. Kortvandringen dit är enkel men upplevelsen är stark.',
    tips: [
      'Buss från Ystad eller Simrishamn.',
      'Informationscenter nere vid parkeringen.',
      'Soluppgången härifrån är en populär upplevelse.',
    ],
  },

  'österlen-skane': {
    body: 'Österlen i sydöstra Skåne är ett kulturlandskap med välmarkerade kustleder, rapsfält och ett oändligt öppet landskap mot Östersjön. Skåneleden Österlen-rutten tar dig längs kustlinjen med regelbundna stopp i charmerande fiskebyar.',
    tips: [
      'Bil rekommenderas för att nå olika startpunkter.',
      'Bäst i maj under rapssäsongen.',
      'Simrishamn och Kivik är bra baser.',
    ],
  },

  'sofiero-skane': {
    body: 'Sofieros slottspark norr om Helsingborg kombinerar slottsmiljö med kustvy mot Öresund och en dramatisk klipphavsträdgård. En kulturpromenad med stark natur.',
    tips: [
      'Buss från Helsingborg.',
      'Entreavgift till parken sommartid.',
      'Rododendronblomning i maj är spektakulär.',
    ],
  },

  'falsterbo-skane': {
    body: 'Falsterbo halvö i sydvästra Skåne är en av Europas viktigaste fågelstationer under höstmigration. Vandringen längs strandlinjen kombineras naturligt med ett besök vid fågelstationen för den som är intresserad av natur.',
    tips: [
      'Buss från Malmö (~50 min) — linje 100 eller SkåneExpressen 15.',
      'Bäst under september–oktober för fågelskådning.',
      'Ljunghusen och Skanör är charmiga byar längs halvön.',
    ],
  },

  'bjärehalvön-skane': {
    body: 'Bjärehalvön norr om Ängelholm är ett av Skånes bäst bevarade kustlandskap med röda strandklippor och en varierad topografi som ger en annorlunda känsla mot det flackare Skåne.',
    tips: [
      'Bil rekommenderas.',
      'Torekov är en charmig liten by på halvöns västra sida.',
    ],
  },

  'vattenriket-skane': {
    body: 'Kristianstads Vattenrike är ett UNESCO-biosphärsreservat med fågelrika våtmarker längs Helgeån. Vandringen längs ledens träspångar och fågeltorn ger en upplevelse som är olik alla andra i södra Sverige.',
    tips: [
      'Tåg → Kristianstad, sedan cykel eller buss.',
      'Naturum Vattenriket i Kristianstad är besökscentrum.',
      'Bäst vår och höst under fågelflyttningen.',
    ],
  },

  // ── SÖRMLAND ──────────────────────────────────────────────────────────

  stendorren: {
    body: 'Stendörren naturreservat i Sörmland är ett av de mest dramatiska kustlandskapen längs Östersjöns västra kust. En hängbro, klippstränder och hav som omger ett labyrinthiskt ölandskap — känt bland vandrare men ännu inte massbetucket.',
    tips: [
      'Tåg → Nyköping, sedan lokal buss (kontrollera tidtabell).',
      'Hängbron är ett fotograferat landmärke — gå tidigt för lugn.',
      'Bra för mer erfarna vandrare — terrängen är utmanande på delar.',
    ],
  },

  'trosa-skargard': {
    body: 'Trosa är Sörmlands minsta stad och en av de charmigaste hamnarna längs kusten. Strandpromenaden och de korta skärgårdsutflykterna ger en behaglig halvdag i ett landskap som är lättillgängligt utan att vara turistifierat.',
    tips: [
      'Tåg → Vagnhärad, sedan buss till Trosa (~1h20 totalt).',
      'Trosa ström, den lilla kanalen genom bykärnan, är ett mysigt stopp.',
      'Båtturer till skärgårdens öar avgår från Trosa hamn sommartid.',
    ],
  },

  'morko-sormland': {
    body: 'Mörkö nås via bro från fastlandet och har en blandad skog och klippkust som är genuint Sörmlandsk. Lite känt utanför regionen men välkomnande för den som söker lugn vandring utan färjor och planering.',
    tips: [
      'Tåg → Södertälje, sedan buss via bron till ön.',
      'Ingen servering — ta med matsäck.',
    ],
  },

  'asko-sormland': {
    body: 'Askö är Naturvårdsverkets forskningsstation och öppen för besök under sommarhalvåret. En stilla och nästan folktomt ö med välhållen natur och ett unikt läge som en av Östersjöns bäst dokumenterade öar.',
    tips: [
      'Båt från Nyköping-hållet — kontrollera aktuell tidtabell.',
      'Forskarstationen är synlig från leden.',
      'Ta med mat och vatten.',
    ],
  },

  'bergholmen-trosa': {
    body: 'Bergholmen / Trosaön nära Trosa är en lättillgänglig kustpromenad med havsvy och skog som sträcker sig mot strandlinjen. Bra som ett kortare tilläggsalternativ till ett Trosa-besök.',
    tips: [
      'Tåg → Vagnhärad, sedan buss till Trosa.',
    ],
  },

  'sormlandsleden-kust': {
    body: 'Sörmlandsledens kustdel är ett av de mer krävande och belönande vandringsalternativen längs Östersjöns västra sida. De välkarterade etapperna tar dig längs kust och inlandsvatten i en natur som är relativt okänd utanför regionen.',
    tips: [
      'Ta del av Sörmlandsledens kartmaterial.',
      'Planera övernattning — etapperna är långa.',
      'Bäst maj–juni och september.',
    ],
  },

  'halluden-sormland': {
    body: 'Hålludden naturreservat i Sörmland är ett öppet kustlandskap med havsvy och hedsmark som är lite känt men genuint fint. En lagom halvdagsvandring för den som är i Norrköpingstrakten.',
    tips: [
      'Tåg → Norrköping, sedan buss.',
    ],
  },

  'braviken-sormland': {
    body: 'Breviks klint längs Bråviken norra strand erbjuder en karaktäristisk Sörmlandskust med klippstränder och havsutsikt mot fjorden. En kort men givande vandring.',
    tips: [
      'Tåg → Norrköping, sedan buss.',
    ],
  },

  // ── ÖSTERGÖTLAND ──────────────────────────────────────────────────────

  'st-anna-skargard': {
    body: 'S:t Anna skärgård är en av Sveriges vackraste — 6 000 öar och kobbar i ett öppet, vindpinat landskap utan motorvägar och massolyckor. Vandringen längs kusten och på de tillgängliga öarna ger en känsla av äkta skärgård långt från turistflöden.',
    tips: [
      'Bil eller buss till S:t Anna-hållet, sedan sommarbåt.',
      'Boka båt i förväg under sommarsäsong.',
      'Bäst juni och september.',
    ],
  },

  'gryt-skargard': {
    body: 'Gryts skärgård söder om Valdemarsvik är ett genuint och relativt okänt skärgårdslandskap i Östergötland med välhållen kustterräng och sommarbåtar till de yttersta öarna.',
    tips: [
      'Bil rekommenderas till utgångspunkten.',
      'Sommarbåtar avgår från Fyrudden.',
    ],
  },

  'valdemarsviken': {
    body: 'Valdemarsviken är en dramatisk naturhamn djupt inhuggad i Östgötaskärgårdens fastlandskedja. Vandringen runt viken ger kontinuerlig havsvy och en känsla av ett landskap format av istiden.',
    tips: [
      'Bil rekommenderas.',
      'Kombinera med en båttur i S:t Anna skärgård.',
    ],
  },

  'arkösund': {
    body: 'Arkösund vid Bråvikens mynning är en av Östergötlands mest välbesökta kustpunkter med en pittoresk hamnmiljö och vandring längs klippkusten ut mot havet.',
    tips: [
      'Bil rekommenderas.',
      'Café och restaurang i hamnen.',
    ],
  },

  'harstena': {
    body: 'Härstena i S:t Anna skärgård är en kringla-formad ö med välbevarad byatmosfär och leder längs en dramatisk klippkust. En av de mer avlägsna men belönande öar att nå med sommarbåt.',
    tips: [
      'Sommarbåt från Fyrudden.',
      'Byns historia som fiskesamhälle är välbevarad.',
    ],
  },

  'tyrislöt': {
    body: 'Tyrislöt vid S:t Annas inlopp är utgångspunkten för flera skärgårdsutflykter och har en enkel kustled med havsvy och klippstränder.',
    tips: [
      'Bil rekommenderas.',
      'Bra startpunkt för längre paddelutflykter också.',
    ],
  },

  'slatbaken': {
    body: 'Slätbaken är en lång, smal fjord söder om Norrköping med dramatiska klippsidor och en stilla inre vattenyta. Vandringen längs fjordkanten ger en annorlunda östgötsk kustupplevelse.',
    tips: [
      'Bil rekommenderas.',
      'Bra vår- och höstdestination.',
    ],
  },

  'atvidaberg-kust': {
    body: 'Åtvidabergs kust är en östgötsk kustsida med varierat landskap och leder längs Östersjöns västra fjordar. Lugnt och genuint — bra alternativ för den som söker östgötsk natur utan turistbroschyrer.',
    tips: [
      'Bil rekommenderas.',
    ],
  },

  'kattilö': {
    body: 'Kättilö naturreservat i Östgötaskärgården är ett välhållet reservat med kustleder och havsvy som ger äkta skärgårdskaraktär.',
    tips: [
      'Bil eller sommarbåt.',
    ],
  },

  'oxelösund-kust': {
    body: 'Oxelösund på Sörmlandskusten har ett unikt industriellt kustlandskap med järnverkets siluett som kontrast mot havet och en välmarkerad kuststig runt den industriella halvön.',
    tips: [
      'Tåg → Oxelösund.',
      'En annorlunda kombination av industri och natur.',
    ],
  },

  // ── SMÅLAND ───────────────────────────────────────────────────────────

  'västervik-skargard': {
    body: 'Västervik har ett av Sveriges bäst outforskade skärgårdsarkipelag med tusentals öar och kobbar i ett landskap som är lika dramatiskt som Stockholms skärgård men med en bråkdel av besökarantalet. Vandringslederna kring Västervik och på de närmaste öarna ger en äkta skärgårdsupplevelse.',
    tips: [
      'Tåg → Västervik.',
      'Sommarbåtar till de närmaste öarna avgår från Västervik hamn.',
      'Bra fiske- och paddelmöjligheter för den aktive.',
    ],
  },

  'kvaedoefjarden': {
    body: 'Kvädöfjärden i norra Småland är ett stilla och bortglömt kustlandskap med välhållen natur och liten turistaktivitet. En bra halvdag för den som vill utforska Smålandskusten bortom de välkända destinationerna.',
    tips: [
      'Bil rekommenderas.',
      'Kombinera med Gamleby för ett kulturhistoriskt inslag.',
    ],
  },

  'figeholm-skargard': {
    body: 'Figeholm vid Kalmarsund erbjuder skärgårdslandskap med utsikt mot Öland och en kustled som kombinerar skog och kust i ett lättgånget, välmarkerat spår.',
    tips: [
      'Bil rekommenderas.',
      'Tydlig ölandsvy längs hela leden.',
    ],
  },

  'kalmarsund-kust': {
    body: 'Kalmarsundkusten ger havsutsikt mot Öland med varje steg längs leden. Bra markerade leder norrut och söderut från Kalmar kombineras med tillgängligheten av en av Sveriges starkaste kulturstäder.',
    tips: [
      'Tåg → Kalmar.',
      'Kombinera med Kalmar slott för en kulturhistorisk dag.',
      'Bron till Öland syns hela vägen längs kustsidan.',
    ],
  },

  'kristdala-kust': {
    body: 'Kristdala på Smålandskusten är ett lugnt kustlandskap med kortare leder och kustvy mot Kalmarsund. En bra halvdag bortom turistströmmarna.',
    tips: [
      'Bil rekommenderas.',
    ],
  },

  'mörbylånga-kust': {
    body: 'Mörbylånga på västra Öland har ett flackt kustlandskap längs Kalmarsund med alvarnaturen bakom och vattnet framför — en ölandsk kustupplevelse i en mer lättgången terräng.',
    tips: [
      'Tåg → Kalmar, sedan buss på Öland.',
    ],
  },

  'fårbo-kust': {
    body: 'Fårbo på norra Smålandskusten är ett litet fiskesamhälle med kustpromenad och naturmark längs Östersjön. En enkel, trivsam halvdag.',
    tips: [
      'Bil rekommenderas.',
    ],
  },

  'blankaholm': {
    body: 'Blankaholm norr om Västervik är ett litet kustsamhälle med kustled och havsvy i ett typiskt Smålandskaraktärslandskap.',
    tips: [
      'Bil rekommenderas.',
    ],
  },

  'oskarshamn-kust': {
    body: 'Oskarshamn är porten till Blå Jungfrun nationalpark och har kustleder runt hamnen som ger havsutsikt och en tydlig känsla av Kalmarsunds karaktär.',
    tips: [
      'Tåg → Oskarshamn.',
      'Sommarbåt till Blå Jungfrun avgår härifrån.',
    ],
  },

  'blå-jungfrun': {
    body: 'Blå Jungfrun nationalpark i Kalmarsund är en magisk granit-ö med forntida labyrint och dramatiska berghällar. Nås med sommarbåt och ger en stark naturupplevelse i ett unikt ölandskap.',
    tips: [
      'Sommarbåt från Oskarshamn eller Byxelkrok på Öland.',
      'Guidning på ön sommartid.',
      'Begränsad tillgång — kolla antal besökare.',
    ],
  },

  // ── HALLAND ───────────────────────────────────────────────────────────

  'haverdal-halland': {
    body: 'Haverdal naturreservat norr om Halmstad är ett dramatiskt dynlandskap längs Kattegatts kust med vandringsleder genom dynerna och längs den exponerade sandstranden. En av Hallands bästa naturupplevelser.',
    tips: [
      'Tåg → Halmstad, sedan buss norrut (~30 min).',
      'Dynerna är känsliga — håll dig till markerade spår.',
      'Badmöjligheter längs stranden sommartid.',
    ],
  },

  'tylösand-halland': {
    body: 'Tylösand väster om Halmstad är en av Sveriges mest kända sandstränder med kustpromenad längs dynlandskapet och havsvy mot Kattegatt. En välbesökt men vacker halvdag.',
    tips: [
      'Buss från Halmstad (~20 min).',
      'Badmöjligheter är utmärkta sommartid.',
      'Tylösand Hotel är ett välkänt landmärke.',
    ],
  },

  'kungsbacka-kust': {
    body: 'Kungsbackakusten söder om Göteborg har en varierad kustlinje med klippstränder och leder som ansluter till Kattegattleden — en av Sveriges nyare kustleder längs hela Hallands kuststräcka.',
    tips: [
      'Pendeltåg Göteborg → Kungsbacka.',
      'Del av Kattegattleden för den som vill vandra längre.',
    ],
  },

  'fjärås-bräcka': {
    body: 'Fjärås Bräcka söder om Kungsbacka är ett dramatiskt isräfsat backlandskap med havsvy och en känsla av forntid i ett unikt geologiskt landskap längs Hallands kust.',
    tips: [
      'Bil rekommenderas.',
      'Geologiskt intressant — ta med karta.',
    ],
  },

  'varberg-kust': {
    body: 'Varberg har en av Sveriges bäst bevarade kustsoldater i Varbergs fästning och en kustpromenad längs Kattegatt med stråk mot naturreservaten söder om staden.',
    tips: [
      'Tåg → Varberg.',
      'Fästningen och Morokulien kallbadhus är besöksvärda.',
    ],
  },

  'falkenberg-kust': {
    body: 'Falkenbergs kustled längs Kattegatts sandiga strandlinje kombinerar lättvandrad kustterräng med god service i den charmiga kuststaden.',
    tips: [
      'Tåg → Falkenberg.',
      'Laxfiske i Ätran är välkänt — bra komplement till vandringen.',
    ],
  },

  'laholm-kust': {
    body: 'Laholmsbukten söder om Falkenberg är Hallands mest exponerade sandstrandssträcka med kattegattsvindarna som konstant sällskap längs kustleden.',
    tips: [
      'Bil rekommenderas.',
      'Bäst under lågsäsong — populärt sommarområde.',
    ],
  },

  'halmstad-kust': {
    body: 'Halmstad är Hallands kuststad par excellence med kustleder norrut mot Haverdal och söderut mot Tylösand. Kombinationen av stadspromenad och kustled ger ett brett utbud.',
    tips: [
      'Tåg → Halmstad.',
      'Kattegattleden löper längs kusten.',
    ],
  },

  'bastad-kust': {
    body: 'Båstads kust i södra Halland är känd för tennis men kustleden runt halvön Bjäre ger ett av Hallands mest dramatiska kustlandskap med rödlera-klippor och havsvy mot Laholmsbukten.',
    tips: [
      'Tåg → Båstad.',
      'Norrvikens trädgårdar är ett besöksvärt komplement.',
    ],
  },

  'tjolöholm-halland': {
    body: 'Tjolöholms slottspark söder om Kungsbacka kombinerar ett engelskt-gotiskt slott med kustvy mot Kattegatt och välskött parkmark med naturstigar.',
    tips: [
      'Bil eller pendeltåg → Kungsbacka, sedan buss.',
      'Slottet kan besökas under guidade turer.',
    ],
  },
}

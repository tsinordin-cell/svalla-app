/**
 * bohuslan-data.ts — 15 ösidor för Bohuslän-skärgården.
 * Samma struktur som island-data.ts.
 *
 * Tom: detta är en första version. Innehållet är skrivet utifrån allmän kunskap
 * + research-anteckningar. Finputsa copy efterhand när du har lokala kontakter.
 */

import type { Island } from './island-data'

// Vi använder samma `region`-fält men med 'bohuslan' som värde.
// island-data.ts behöver utvidgas så att type Island.region inkluderar 'bohuslan'.
type BohuslanIsland = Omit<Island, 'region'> & {
  region: 'bohuslan'
}

export const BOHUSLAN_ISLANDS: BohuslanIsland[] = [
  {
    slug: 'marstrand',
    name: 'Marstrand',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏰',
    tagline: 'Carlstens fästning, segling och västkustens kungsdestination.',
    description: [
      'Marstrand är Bohusläns mest kända ö och en av Sveriges mest fotograferade kustdestinationer. Den vita Carlstens fästning — påbörjad 1658 och utbyggd från 1682 efter Erik Dahlbergs ritningar — tornar över hamnen och är ett av Nordens bäst bevarade fästningsverk och ett av de mest besökta sevärdheterna i hela Västra Götaland.',
      'Som segeldestination är Marstrand utan motstycke i Sverige. Match Cup Sweden — en av världens mest prestigefyllda match-racing-regattor — lockar världens bästa seglare till Marstrands gästhamn varje juli. Hamnen är med sina 200 platser en av västkustens absolut största och ligger skyddad innanför Koön.',
      'Ön är helt bilfri, vilket ger Marstrand en unik stämning sommartid. En liten passagerarfärja trafikerar sundet till Koön i princip kontinuerligt under högsäsongen. Det gör att man kan parkera på fastlandet och ta sig till ön på under en minut.',
      'Utöver fästningen och seglingen har Marstrand ett rikt restaurangutbud för en så liten ö. Allt från skaldjursrestauranger med havsutsikt till enklare hamnkrogar och glassbarer längs kajkanten. Kallt öl och nykokt hummer i solnedgången är en sommarbild de flesta förknippar med Marstrand.',
      'Marstrand passar både för dagstur och övernattning. Från Göteborg är det 50 minuter med bil till färjan — en av de kortaste resorna till äkta Bohuslän-känsla. Det gör Marstrand till ett av de mest populära utflyktsmålen i hela regionen, men också till en plats som snabbt fylls i juli och augusti.',
    ],
    facts: {
      travel_time: '50 min med bil + färja från Göteborg',
      character: 'Festlig sommardestination, segling, historia',
      season: 'Juni–september högsäsong, helår med begränsat utbud',
      best_for: 'Segling, fästningsbesök, lyxig skärgårdsmiljö',
    },
    activities: [
      { icon: '🏰', name: 'Carlstens fästning', desc: 'Guidade turer, fångpromenader, utsiktstornet, museum.' },
      { icon: '⛵', name: 'Match Cup Sweden', desc: 'Världselit i match-racing varje juli — Marstrands stora event.' },
      { icon: '🏊', name: 'Bad och klippor', desc: 'Norra och södra delarna har klippbad med soluppgång och solnedgång.' },
      { icon: '🚤', name: 'Båtcharter', desc: 'Hyr motorbåt eller segelbåt för dagsutflykter till närliggande öar.' },
    ],
    accommodation: [
      { name: 'Grand Hotell Marstrand', type: 'Hotell', desc: 'Klassiskt hotell vid hamnen med restaurang och spa.' },
      { name: 'Marstrands Havshotell', type: 'Hotell', desc: 'Modernare hotell med utsikt mot fästningen.' },
      { name: 'B&B Marstrand', type: 'B&B', desc: 'Mindre alternativ i öns gamla bymiljö.' },
    ],
    getting_there: [
      { method: 'Bil + färja', from: 'Göteborg', time: '50 min', desc: 'Kör till Koön, ta passagerarfärja över sundet (avgår 4 ggr/h sommartid).', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', time: '1 h 15 min', desc: 'Buss 312 från Nils Ericson Terminalen.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Marstrands Gästhamn', desc: 'Den största gästhamnen i Bohuslän, fyllt under sommaren.', spots: 200, fuel: true, service: ['Vatten', 'El', 'Dusch', 'Tvätt'] },
    ],
    restaurants: [
      { name: 'Tenan', type: 'Restaurang', desc: 'Modern bohuslänsk meny med havsutsikt.' },
      { name: 'Hamnkrogen', type: 'Krog', desc: 'Klassiska skaldjur, ölmeny.' },
      { name: 'Kallbadhusets Kafé', type: 'Café', desc: 'Bad och fika i historisk byggnad.' },
    ],
    tips: ['Boka boende i god tid för Match Cup-veckan i juli.', 'Carlstens guidade aftontur är magisk när solnedgången träffar fästningen.', 'Cykel går utmärkt på ön — uthyrning vid hamnen.'],
    related: ['smogen', 'kungshamn', 'lysekil'],
    tags: ['fästning', 'segling', 'restauranger', 'sommardestination', 'lyx'],
    did_you_know: 'Carlstens fästning började byggas 1658 efter freden i Roskilde när Bohuslän blev svenskt — huvudkonstruktionen tog form från 1682 efter Erik Dahlbergs ritningar. Den var i militär drift till 1882, blev sedan fängelse, och är idag museum.',
  },
  {
    slug: 'smogen',
    name: 'Smögen',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦐',
    tagline: 'Den ikoniska bryggan, räkmackan och Sveriges mest fotograferade fiskeläge.',
    description: [
      'Smögen är ikonisk. Den välkända Smögenbryggan — 600 meter lång med tätt packade röda sjöbodar — är en av Sveriges mest fotograferade vyer och navet i hela Smögens sommarliv. Här promenerar tusentals besökare dagligen under juli och augusti.',
      'Räkan är Smögens symbol och hjärta. Smögen är Sveriges inofficiella räkhuvudstad, och räkfisket har bedrivits i de här vattnen sedan 1800-talet. Färska räkor från Smögen levereras dagligen till restauranger och fiskhandlare i hela landet. Att äta räkmacka på Smögenbryggan med utsikt mot havet är en av de mest klassiska svenska sommarupplevelserna.',
      'Gästhamnen vid Smögen är en av västkustens allra populäraste. Med 400 platser, bensinstation och fullservicehamn är den ett självklart stopp för seglare och motorbåtsentusiaster längs Bohuslän-kusten. Lägg till att restauranger, affärer och glassbarer finns inom gångavstånd — och du förstår varför Smögen brukar ha fullbelagt i hamnen redan i mitten av juni.',
      'För den som vill röra på sig erbjuder Smögen fin klippvandring. Vandringen från Smögenbryggan mot Hasselösund tar 1–2 timmar och bjuder på klassisk bohuslänsk klipplandskap med vid havsutsikt. På vägen passerar man det populära Smögenbadet — ett klippbad på öns västsida med morgonsolläge.',
      'Smögen ligger nära Kungshamn, som fysiskt är sammanlänkat via en bro. Det gör hela området till ett av Bohusläns tätaste utbudskluster. Kungshamn är lugnare och billigare att bo i — ett praktiskt alternativ för den som vill ha Smögens restauranger men inte Smögens hotellpriser.',
    ],
    facts: {
      travel_time: '1 h 30 min med bil från Göteborg',
      character: 'Livlig fiskeby, sommarmagnet, klippvandring',
      season: 'Juni–augusti högsäsong',
      best_for: 'Räkmacka, sommarmiljö, klippvandring',
    },
    activities: [
      { icon: '🦐', name: 'Räkmackan', desc: 'Provsmakning på Smögens Bryggrestaurang — färska räkor direkt från fiskebåten.' },
      { icon: '🥾', name: 'Klippvandring', desc: 'Runt Smögen tar 1–2 timmar, klassisk Bohuslän-vy.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Smögenbadet på västsidan — populärt vid varma sommardagar.' },
      { icon: '🛍', name: 'Smögenbryggan', desc: 'Sjöbodar med konst, hantverk och butiker.' },
    ],
    accommodation: [
      { name: 'Smögens Hafvsbad', type: 'Hotell', desc: 'Spa och hotell med havsutsikt.' },
      { name: 'Smögen Lodge', type: 'Hotell', desc: 'Centralt vid bryggan.' },
      { name: 'Stughyrning', type: 'Stugor', desc: 'Privata stugor via lokala uthyrare — boka 6 mån i förväg.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '1 h 30 min', desc: 'E6 norrut till Munkedal, sedan väg 174 till Smögen.', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', time: '2 h', desc: 'Västtrafik linje 860 till Kungshamn, sen kort buss till Smögen.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Smögens Gästhamn', desc: 'En av västkustens mest älskade gästhamnar.', spots: 400, fuel: true, service: ['Vatten', 'El', 'Dusch', 'Tvätt', 'Restaurang'] },
    ],
    restaurants: [
      { name: 'Smögens Bryggrestaurang', type: 'Restaurang', desc: 'Räkor, fisk, livlig sommarmiljö.' },
      { name: 'Sandklint', type: 'Krog', desc: 'Modern bohuslänsk smaksättning.' },
      { name: 'Smögen Glassgatan', type: 'Glass', desc: 'Köer som ringlar — bästa glassen i Bohuslän.' },
    ],
    tips: ['Kom tidigt på morgonen för bästa bryggvyn utan folkvimmel.', 'Räkfisken kommer in mellan 06–08 — då är räkorna som färskast.', 'Cykel- och promenadleder kan du följa på smogen.se.'],
    related: ['kungshamn', 'grundsund', 'hamburgsund'],
    tags: ['räkor', 'fiskeby', 'sommardestination', 'fotogen'],
    did_you_know: 'Smögenbryggan är 600 meter lång och var ursprungligen byggd för fiskeflottan på 1800-talet — idag är den helt gågata.',
  },
  {
    slug: 'lysekil',
    name: 'Lysekil',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🌊',
    tagline: 'Badortsklassikern med Marine Center och kustnära vandringsleder.',
    description: [
      'Lysekil är en av västkustens mest klassiska badorter. Staden ligger på Stångenäs sydspets och blickar ut över Gullmarsfjorden — Sveriges enda äkta tröskelfjord.',
      'Lysekil har en stark marinbiologisk profil. Havets Hus akvarium och universitetets Marine Center gör staden till en utbildningsdestination såväl som turistdestination.',
      'Sommaren brukar vara packad — fisk, segling, simskola och konstutställningar samtidigt. Lysekil har också varit centrum för svensk valfangst under 1900-talets början, vilket fortfarande syns i hamnen.',
    ],
    facts: {
      travel_time: '1 h 50 min med bil från Göteborg',
      character: 'Badort, marinbiologi, kustnära vandring',
      season: 'Juni–september högsäsong, helår',
      best_for: 'Familjer, akvariebesök, vandring längs kust',
    },
    activities: [
      { icon: '🐠', name: 'Havets Hus', desc: 'Akvarium med svenska Västkust-arter — populärt med barn.' },
      { icon: '🥾', name: 'Stångehuvud naturreservat', desc: 'Klippvandring längs Gullmarsfjorden, soluppgång eller solnedgång.' },
      { icon: '🦐', name: 'Räkfiske-utflykt', desc: 'Boka räkfiskartur — drag upp egna räkor och få dem ångkokta ombord.' },
      { icon: '🏊', name: 'Pinnviks bad', desc: 'Sandstrand i centralt Lysekil, populär bland familjer.' },
    ],
    accommodation: [
      { name: 'Strand Hotell Lysekil', type: 'Hotell', desc: 'Centralt vid hamnen, spa.' },
      { name: 'Hotel Lysekil', type: 'Hotell', desc: 'Modern, närhet till restauranger.' },
      { name: 'Lysekil Camping', type: 'Camping', desc: 'Familjefientligt med havsläge.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '1 h 50 min', desc: 'E6 norrut, avtag mot Lysekil — sista biten via bro över Gullmarsfjorden.', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', time: '2 h 10 min', desc: 'Västtrafik linje 850.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Lysekils Gästhamn', desc: 'Stor gästhamn vid stadens centrum.', spots: 250, fuel: true, service: ['Vatten', 'El', 'Dusch', 'Tvätt'] },
    ],
    restaurants: [
      { name: 'Brygghuset', type: 'Restaurang', desc: 'Skaldjur och fisk i hamnmiljö.' },
      { name: 'Restaurang Pinnvik', type: 'Restaurang', desc: 'Strandnära, sommaröppen.' },
      { name: 'Lysekils Hamnkrog', type: 'Krog', desc: 'Klassisk västkustkrog.' },
    ],
    tips: ['Boka räkfisketur 1–2 dagar i förväg — väldigt populärt.', 'Stångehuvud är magiskt vid soluppgång, undvik mitten av dagen.', 'Pinnviks bad är säkrast för småbarn.'],
    related: ['fiskebackskil', 'grundsund', 'kosterhavet'],
    tags: ['badort', 'akvarium', 'vandring', 'familjer'],
    did_you_know: 'Lysekil var huvudort för svensk valfangst under tidigt 1900-tal — Pacific Whaling Company hade anläggning här fram till 1934.',
  },
  {
    slug: 'kosterhavet',
    name: 'Kosterhavet',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    tagline: 'Sveriges enda marina nationalpark — vild natur, sälar och dykning i världsklass.',
    description: [
      'Kosterhavets nationalpark är Sveriges enda marina nationalpark, etablerad 2009. Området täcker havet och de yttre öarna runt Nord- och Sydkoster utanför Strömstad.',
      'Vattnet är ovanligt salt och kallt och hyser Sveriges rikaste marina liv — omkring 6 000 arter, många unika för Skagerrak. Sälar lever här, valar passerar förbi, och korallrev finns på 80–200 meters djup.',
      'Koster-öarna i sig är två: Nordkoster (cykelparadis, klippvandring) och Sydkoster (lite större, populära strandvägar). Båda är bilfria.',
    ],
    facts: {
      travel_time: '2 h 30 min med bil + 45 min båt från Göteborg',
      character: 'Vild natur, marinbiologi, bilfri ö-trio',
      season: 'Juni–september, vintertid begränsat',
      best_for: 'Cykel, dykning, naturupplevelse, säl-säker',
    },
    activities: [
      { icon: '🚲', name: 'Cykla Kosteröarna', desc: 'Cykelvägar binder Nord- och Sydkoster, ca 25 km totalt.' },
      { icon: '🤿', name: 'Dykning', desc: 'Sveriges bästa kallvattendykning — anemonkoraller, läpp- och spetslippfiskar.' },
      { icon: '🦭', name: 'Sälsafari', desc: 'Båtturer från Strömstad till sälkolonierna — barnvänligt.' },
      { icon: '🚶', name: 'Vandring Nordkoster', desc: 'Norra Kosters klippstigar — vildmarksupplevelse.' },
    ],
    accommodation: [
      { name: 'Ekenäs Värdshus', type: 'Hotell', desc: 'Sydkoster, klassiskt skärgårdsvärdshus.' },
      { name: 'Koster Vandrarhem', type: 'Vandrarhem', desc: 'Enklare, populärt med vandrare.' },
      { name: 'Koster Camping', type: 'Camping', desc: 'Sydkoster — bokas i förväg.' },
    ],
    getting_there: [
      { method: 'Bil + båt', from: 'Strömstad', time: '45 min båt', desc: 'Kör till Strömstad. Kosterbåtar går varje 1–2 timmar sommartid.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Ekenäs (Sydkoster)', desc: 'Centrala gästhamnen, sommaröppen butik och krog.', spots: 50 },
      { name: 'Långegärde (Nordkoster)', desc: 'Mindre gästhamn, mer avskild.', spots: 25 },
    ],
    restaurants: [
      { name: 'Ekenäs Värdshus', type: 'Restaurang', desc: 'Lokala fiskrätter, sjönära.' },
      { name: 'Strandkanten', type: 'Café', desc: 'Sommaröppen sjökant.' },
    ],
    tips: ['Cykla redan första dagen — det är hjärtat av Koster-upplevelsen.', 'Boka sälsafari på morgonen för bästa väder.', 'Ta med vindjacka — det blåser nästan alltid.'],
    related: ['stromstad', 'grebbestad', 'fjallbacka'],
    tags: ['nationalpark', 'dykning', 'cykel', 'marint liv', 'sälar'],
    did_you_know: 'Kosterhavet rymmer Sveriges enda kallvattenkoraller, "Lophelia pertusa", på 80–200 meters djup utanför Säckens fjäll.',
  },
  {
    slug: 'grebbestad',
    name: 'Grebbestad',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦪',
    tagline: '90 % av Sveriges ostron — och Bohusläns kanske mysigaste fiskeläge.',
    description: [
      'Grebbestad är Sveriges ostronshuvudstad. 90 % av Sveriges produktion av äkta ostron kommer härifrån, och flera lokala restauranger erbjuder ostron-safari ut på odlingarna.',
      'Bortsett från ostronen är Grebbestad ett klassiskt bohuslänskt fiskeläge med vita trähus, smala gränder och en stark kustkultur. Hamnen är livlig på sommaren.',
      'Området runt Grebbestad har också Bohusläns kanske mest ikoniska klippformationer, med vandringsleder som sträcker sig från Tjurpannan till Otterön.',
    ],
    facts: {
      travel_time: '1 h 50 min med bil från Göteborg',
      character: 'Mysigt fiskeläge, ostron, klippvandring',
      season: 'Juni–september högsäsong',
      best_for: 'Ostron, segling, klippvandring',
    },
    activities: [
      { icon: '🦪', name: 'Ostron-safari', desc: 'Båt + ostronöppning + provsmakning. Boka via Everts Sjöbod eller Ostronakademien.' },
      { icon: '🥾', name: 'Tjurpannans naturreservat', desc: 'Spektakulära klippvandringar med utsikt över havet.' },
      { icon: '⛵', name: 'Segling', desc: 'Skyddade vatten, perfekt för nybörjare.' },
      { icon: '🏊', name: 'Edsviksbadet', desc: 'Familjevänlig sandstrand strax utanför Grebbestad.' },
    ],
    accommodation: [
      { name: 'Grebbestads Bryggor', type: 'Hotell', desc: 'Centralt i hamnen.' },
      { name: 'Tanumstrand', type: 'Hotell', desc: 'Spa-anläggning utanför Grebbestad.' },
      { name: 'B&B Grebbestad', type: 'B&B', desc: 'Familjedrivna i bymiljön.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '1 h 50 min', desc: 'E6 norrut, avtag mot Grebbestad efter Munkedal.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Grebbestads Gästhamn', desc: 'Mysig gästhamn vid centrum.', spots: 150, fuel: true, service: ['Vatten', 'El', 'Dusch'] },
    ],
    restaurants: [
      { name: 'Everts Sjöbod', type: 'Restaurang', desc: 'Ostron och fisk i bohuslänsk miljö.' },
      { name: 'Restaurang Telegrafen', type: 'Krog', desc: 'Klassisk västkustmeny.' },
      { name: 'Grebbestads Konditori', type: 'Café', desc: 'Färska bullar och kaffe sedan 1923.' },
    ],
    tips: ['Boka ostron-safari en vecka i förväg.', 'Tjurpannan är magiskt vid solnedgång.', 'Tanums hällristningar (UNESCO) ligger 15 min bort med bil.'],
    related: ['fjallbacka', 'kosterhavet', 'hamburgsund'],
    tags: ['ostron', 'fiskeläge', 'klippvandring', 'sommardestination'],
    did_you_know: '90 % av Sveriges produktion av äkta ostron (Ostrea edulis) kommer från vattnen runt Grebbestad — Sveriges enda kommersiellt odlade ostronfarmer ligger här.',
  },
  {
    slug: 'fjallbacka',
    name: 'Fjällbacka',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛰',
    tagline: 'Camilla Läckbergs by, Vetteberget och pittoreska sjöbodar.',
    description: [
      'Fjällbacka är en av Bohusläns mest välkända och omtyckta destinationer — liten och pittoresk med vita trähus, röda sjöbodar och en hamn som fylls av seglare varje sommar. Byn fick internationell uppmärksamhet genom Camilla Läckbergs kriminalromaner, som utspelar sig här, och har sedan dess lockat bokfans och skärgårdsälskare i lika stora skaror.',
      'Vetteberget är Fjällbackas landmärke. Det 74 meter höga berget reser sig dramatiskt direkt bakom bykärnan och nås via en stege i klippspringan som kallas "Kungsklyftan". Klättringen är enkel och tar 20 minuter — men utsikten från toppen är bland de bästa i hela Bohuslän. Du ser ut över skärgårdens öar, sund och vida hav.',
      'Ingrid Bergman — en av 1900-talets största filmstjärnor — bodde sommartid i Fjällbacka i över 30 år och valde att få sin aska spridd i havet utanför byn 1982. Torget vid hamnen bär hennes namn och sommartid arrangeras guidade turer om hennes liv i Fjällbacka.',
      'Fjällbacka är ett utmärkt utgångsläge för skärgårdsutflykter. Därifrån kan man ta båt till Väderöarna — ett av Bohusläns vildaste och mest avlägset belägna naturreservat — eller paddla ut till mindre öar som Sälö. Gästhamnen mitt i byn tar emot seglare på 100 platser och har fullservice.',
      'Till skillnad från Marstrand och Smögen är Fjällbacka fortfarande relativt opåverkad av masstourism. Det gör att charmen är mer autentisk och att det går att hitta bord på restaurang utan att boka veckor i förväg — även om det ändras snabbt under högsäsongen.',
    ],
    facts: {
      travel_time: '2 h med bil från Göteborg',
      character: 'Pittoresk fiskeby, kriminalromanromantik, klippvandring',
      season: 'Juni–september',
      best_for: 'Romantik, vandring, läckbergs-fans',
    },
    activities: [
      { icon: '⛰', name: 'Vettebergets klättring', desc: 'Stegen genom Kungsklyftan upp till toppen — magisk vy.' },
      { icon: '📚', name: 'Läckbergs Fjällbacka', desc: 'Guidade turer till platserna i kriminalromanerna.' },
      { icon: '⛵', name: 'Båtutflykter', desc: 'Skärgårdsturer ut till Väderöarna och Tjurpannan.' },
      { icon: '🏊', name: 'Sälö', desc: 'Närliggande ö med klippbad — kort båttur från Fjällbacka.' },
    ],
    accommodation: [
      { name: 'Stora Hotellet Fjällbacka', type: 'Hotell', desc: 'Klassiskt hotell vid Ingrid Bergmans torg.' },
      { name: 'Fjällbacka Bed & Breakfast', type: 'B&B', desc: 'Mindre, familjedrivet.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '2 h', desc: 'E6 norrut, avtag mot Fjällbacka efter Tanumshede.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Fjällbackas Gästhamn', desc: 'Centralt vid Ingrid Bergmans torg.', spots: 100, fuel: true },
    ],
    restaurants: [
      { name: 'Fjällbacka Bistro', type: 'Restaurang', desc: 'Modern Bohuslän-meny.' },
      { name: 'Restaurang Bryggan', type: 'Krog', desc: 'Klassisk fiskmeny.' },
    ],
    tips: ['Vetteberget tar 30 min upp — kom på morgonen innan turistmassorna.', 'Boka Läckbergs-tur i förväg.', 'Båtturer till Väderöarna kräver bra väder — håll koll dagen innan.'],
    related: ['grebbestad', 'kosterhavet', 'hamburgsund'],
    tags: ['kriminalromaner', 'klippvandring', 'pittoreskt', 'ingrid bergman'],
    did_you_know: 'Ingrid Bergman ägde sommarhuset Dannholmen utanför Fjällbacka i över 30 år. Hennes aska skingrades i havet utanför Fjällbacka 1982.',
  },
  {
    slug: 'grundsund',
    name: 'Grundsund',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    tagline: 'Pittoreskt fiskeläge på Skaftö med levande hamn och konstnärsmiljö.',
    description: [
      'Grundsund ligger på östra sidan av Skaftö, inramat av sin smala men djupa naturhamn. Det är en av Bohusläns mest oförändrade fiskelägena med en stark sjöfartstradition.',
      'Byn är liten — ca 700 åretruntinvånare — men har en stark konstnärsprägling. Flera ateljéer och små gallerier är öppna under sommaren.',
      'Skaftö är ett av de få ställen i Bohuslän där bilfärja kommer fram, och Grundsund kan därmed nås både per båt och bil. Lugnare än Smögen och Marstrand men med samma karaktär.',
    ],
    facts: {
      travel_time: '2 h med bil från Göteborg',
      character: 'Lugnt fiskeläge, konstnärsmiljö',
      season: 'Maj–september',
      best_for: 'Avkoppling, autenticitet, konstutflykt',
    },
    activities: [
      { icon: '🎨', name: 'Konstgallerier', desc: 'Flera lokala konstnärer öppnar studior sommartid.' },
      { icon: '🚣', name: 'Kajakuthyrning', desc: 'Skaftös skyddade vatten är perfekt för kajak.' },
      { icon: '🥾', name: 'Vandring Skaftö', desc: 'Stigar runt hela ön med utsikt mot Lysekil.' },
    ],
    accommodation: [
      { name: 'Grundsund Pensionat', type: 'Pensionat', desc: 'Litet, mysigt med havsutsikt.' },
      { name: 'Stuguthyrning Skaftö', type: 'Stugor', desc: 'Privata sommarhus i Grundsund och näromgivning.' },
    ],
    getting_there: [
      { method: 'Bil + färja', from: 'Göteborg', time: '2 h', desc: 'E6 till Smögen-avtaget, sedan till Skaftö-färjan vid Fiskebäckskil.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Grundsunds Hamn', desc: 'Naturhamn vid bymiljön — populär bland seglare.', spots: 60 },
    ],
    restaurants: [
      { name: 'Grundsunds Krog', type: 'Krog', desc: 'Klassisk fiskmeny i bohuslänsk miljö.' },
      { name: 'Café Hamnkrogen', type: 'Café', desc: 'Lättare lunch.' },
    ],
    tips: ['Kombinera med Fiskebäckskil — kort kustväg mellan dem.', 'Konstgallerierna är som rikast i juli.', 'Ta cykel — Skaftö är perfekt för cykelutflykt.'],
    related: ['fiskebackskil', 'lysekil', 'smogen'],
    tags: ['fiskeläge', 'konst', 'lugnt', 'autentisk'],
    did_you_know: 'Skaftö var länge en av Sveriges mest betydelsefulla skeppsbyggarorter — flera barkar och briggar byggdes här under 1800-talet.',
  },
  {
    slug: 'hamburgsund',
    name: 'Hamburgsund',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '⛵',
    tagline: 'Naturhamnar, segling och en av Bohusläns mest älskade gästhamnar.',
    description: [
      'Hamburgsund ligger längs Bohusläns ostkust, i ett naturskyddat sund mellan fastlandet och Hamburgö. Byn är liten men hamnen är en av de mest besökta för seglare på västkusten.',
      'Ön Hamburgö nås via en 5-minuters färja och erbjuder vandringsleder, badklippor och en av Bohusläns mest ikoniska Bronsåldersrösen — Greby gravfält.',
      'Hamburgsund är ett bra alternativ till mer turistiga orter — atmosfären är lugnare men service och natur är förstklassig.',
    ],
    facts: {
      travel_time: '2 h med bil från Göteborg',
      character: 'Lugn seglardestination, naturhamnar',
      season: 'Maj–september',
      best_for: 'Segling, vandring, lugn',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Skyddat sund, perfekt för nybörjare och familjer.' },
      { icon: '🥾', name: 'Greby gravfält', desc: 'Bronsåldersrösen på Hamburgö — UNESCO-kandidat.' },
      { icon: '🏊', name: 'Klippbad Hamburgö', desc: 'Klippor på västsidan av ön.' },
    ],
    accommodation: [
      { name: 'Hamburgsunds Värdshus', type: 'Hotell', desc: 'Klassiskt värdshus vid hamnen.' },
      { name: 'Stughyrning Hamburgö', type: 'Stugor', desc: 'Sommarstugor på ön.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '2 h', desc: 'E6 till Tanumshede, sedan väg 163 till Hamburgsund.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Hamburgsunds Gästhamn', desc: 'Skyddad gästhamn med klassisk Bohuslänsk miljö.', spots: 150, fuel: true, service: ['Vatten', 'El', 'Dusch'] },
    ],
    restaurants: [
      { name: 'Hamburgsunds Värdshus', type: 'Restaurang', desc: 'Klassisk västkustmeny.' },
    ],
    tips: ['Greby gravfält är magiskt vid solnedgång.', 'Hamburgö-färjan går flera gånger i timmen sommartid.', 'Bra utgångsläge för båtutflykter norrut till Väderöarna.'],
    related: ['fjallbacka', 'grebbestad', 'kosterhavet'],
    tags: ['gästhamn', 'segling', 'lugnt', 'historia'],
    did_you_know: 'Greby gravfält på Hamburgö har över 230 bronsåldersrösen — ett av Bohusläns största sammanhängande forntidsmonument.',
  },
  {
    slug: 'karingon',
    name: 'Käringön',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏘',
    tagline: 'Bilfri pittoresk pärla med trähus från 1800-talet och oförglömlig hamnstämning.',
    description: [
      'Käringön är en av Bohusläns mest välbevarade öar — bilfri, med tätt placerade trähus och smala stigar. Den känns som en tidskapsel från 1800-talet.',
      'Hamnen är navet i bylivet. Klassiska Karingö Värdshus serverar bohuslänsk mat, och de små butikerna säljer hantverk och konst.',
      'Ön är liten — du går runt den på en timme — men intensiteten i miljön gör att besöket sätter sig.',
    ],
    facts: {
      travel_time: '1 h 30 min med bil + 15 min båt från Göteborg',
      character: 'Bilfri, pittoresk, kustkulturell',
      season: 'Juni–september',
      best_for: 'Romantik, fotografi, lugn',
    },
    activities: [
      { icon: '🚶', name: 'Promenad runt ön', desc: '1 timme, smala stigar mellan trähus.' },
      { icon: '⛵', name: 'Båtutflykter', desc: 'Mindre öar runt om — Hermanö, Mollösund.' },
      { icon: '🎨', name: 'Konstutställningar', desc: 'Flera ateljéer öppna sommartid.' },
    ],
    accommodation: [
      { name: 'Käringö Värdshus', type: 'Hotell', desc: 'Klassiskt värdshus vid hamnen.' },
      { name: 'Stughyrning', type: 'Stugor', desc: 'Privata sommarhus i bymiljö.' },
    ],
    getting_there: [
      { method: 'Bil + båt', from: 'Göteborg', time: '1 h 45 min', desc: 'Kör till Mollösund eller Hälleviksstrand, sen passagerarbåt.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Käringö Gästhamn', desc: 'Pittoresk hamn vid bymiljön.', spots: 50 },
    ],
    restaurants: [
      { name: 'Käringö Värdshus', type: 'Restaurang', desc: 'Klassisk bohuslänsk meny.' },
      { name: 'Konditori Käringön', type: 'Café', desc: 'Familjedrivet, hembakat.' },
    ],
    tips: ['Boka övernattning på Värdshuset 6 mån i förväg för sommaren.', 'Solnedgång från västsidan är magisk.', 'Mollösund-färjan tar bara 15 min.'],
    related: ['mollosund', 'orust', 'tjorn'],
    tags: ['bilfri', 'pittoresk', 'fotografi', 'romantik'],
    did_you_know: 'Käringön är skyddad som kulturreservat och får inte ändras byggnadsmässigt — varje hus måste behålla sin 1800-talskaraktär.',
  },
  {
    slug: 'orust',
    name: 'Orust',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🏝',
    tagline: 'Sveriges tredje största ö med båtbyggartradition och breda kustlinjer.',
    description: [
      'Orust är Sveriges tredje största ö (efter Gotland och Öland) och det dolda hjärtat av Bohuslän. Här finns båtbyggartradition (Hallberg-Rassy, Najad och flera klassiker), gott om vandringsleder och en lång kustlinje.',
      'Mollösund i västra Orust är en av öns mest pittoreska byar med klassisk fiskeläge-stämning. På östra sidan ligger Henån — handelscentrum med skydd från Atlantens vindar.',
      'Orust nås via två broar och kan utforskas på cykel eller bil. Ön är ett bra basläge för utflykter till Käringön, Gullholmen och Hermanö.',
    ],
    facts: {
      travel_time: '1 h 15 min med bil från Göteborg',
      character: 'Stort, varierat, båtbyggartradition',
      season: 'Helår',
      best_for: 'Bas för utflykter, vandring, segling',
    },
    activities: [
      { icon: '⛵', name: 'Båtbyggarmuseum Henån', desc: 'Historien om svensk båtbyggartradition.' },
      { icon: '🥾', name: 'Mollösunds klippvandring', desc: 'Utsikt över Bohusläns yttre öar.' },
      { icon: '🏊', name: 'Edshultshallen', desc: 'Sandstrand och inomhusbad.' },
    ],
    accommodation: [
      { name: 'Hotel Orust', type: 'Hotell', desc: 'Centralt i Henån.' },
      { name: 'Mollösunds Pensionat', type: 'Pensionat', desc: 'Mindre, mysigt vid hamnen.' },
      { name: 'Stughyrning Orust', type: 'Stugor', desc: 'Privata sommarhus över hela ön.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '1 h 15 min', desc: 'E6 norrut, sen Tjörnbron till Stenungsund och Orustbron.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Henåns Gästhamn', desc: 'Skyddad gästhamn på östra Orust.', spots: 80, fuel: true },
      { name: 'Mollösunds Gästhamn', desc: 'Pittoresk på västra sidan.', spots: 40 },
    ],
    restaurants: [
      { name: 'Mollösunds Värdshus', type: 'Restaurang', desc: 'Klassisk bohuslänsk meny.' },
      { name: 'Henåns Kök', type: 'Krog', desc: 'Modern svensk meny.' },
    ],
    tips: ['Orust är stort — boka 3+ dagar för att se öns variation.', 'Cykla mellan Henån och Mollösund tar en heldag.', 'Båtbyggarmuseet i Henån är värt 2 timmar regn-eller-sol.'],
    related: ['tjorn', 'karingon', 'gullholmen'],
    tags: ['stor ö', 'båtbyggning', 'mångsidig', 'bas'],
    did_you_know: 'Orust är Sveriges tredje största ö och en av Europas viktigaste båtbyggarregioner — Hallberg-Rassy, Najad och Maxi har sina ursprung här.',
  },
  {
    slug: 'tjorn',
    name: 'Tjörn',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🌉',
    tagline: 'Skuggorubron, akvarellmuseum och porten till Bohuslän.',
    description: [
      'Tjörn är Sveriges sjätte största ö och ofta den första destinationen folk besöker när de söderifrån kör till Bohuslän. Tjörnbron — Sveriges längsta hängbro — är ön symbol.',
      'Skärhamn på västra Tjörn är hjärtat av öns kulturliv med Nordiska Akvarellmuseet — Skandinaviens viktigaste akvarellsamling, byggd vid hamnen i en spektakulär arkitektur.',
      'Tjörn har också flera fiskelägen som Klädesholmen (känd för sina sillinläggningar) och Rönnäng. Ön är 200 km² stor och kräver en hel dag att utforska.',
    ],
    facts: {
      travel_time: '1 h med bil från Göteborg',
      character: 'Stor, varierad, kulturell',
      season: 'Helår',
      best_for: 'Akvarellmuseum, fiskelägen, dagstur',
    },
    activities: [
      { icon: '🎨', name: 'Nordiska Akvarellmuseet', desc: 'Skandinaviens främsta akvarellsamling.' },
      { icon: '🐟', name: 'Klädesholmens Sill', desc: 'Sillmuseum och provsmakning vid hamnen.' },
      { icon: '🏊', name: 'Sumpens hamn', desc: 'Klassisk fiskeläge med klippbad.' },
    ],
    accommodation: [
      { name: 'Salt & Sill Hotell', type: 'Hotell', desc: 'Flytande hotell vid Klädesholmen — Sveriges första.' },
      { name: 'Stughyrning Tjörn', type: 'Stugor', desc: 'Privata sommarhus över hela ön.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '1 h', desc: 'E6 norrut, Tjörnbron från Stenungsund.', icon: '🚗' },
      { method: 'Buss', from: 'Göteborg', time: '1 h 30 min', desc: 'Västtrafik linje 312 eller 850.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Skärhamns Gästhamn', desc: 'Centralt vid Akvarellmuseet.', spots: 100, fuel: true },
      { name: 'Klädesholmens Hamn', desc: 'Pittoresk fiskeläge.', spots: 40 },
    ],
    restaurants: [
      { name: 'Salt & Sill Restaurang', type: 'Restaurang', desc: 'Sillrätter på flytande hotell.' },
      { name: 'Skärhamns Hamnkrog', type: 'Krog', desc: 'Klassisk västkustmeny.' },
    ],
    tips: ['Boka bord på Salt & Sill 2 mån i förväg för helger.', 'Akvarellmuseet är värt 2 timmar.', 'Solnedgång vid Tjörnbron är spektakulär.'],
    related: ['orust', 'marstrand', 'stenungsund'],
    tags: ['akvarellmuseum', 'sill', 'tjörnbron', 'mångsidig'],
    did_you_know: 'Tjörnbron rasade 1980 efter en kollision med ett fartyg — 8 personer dog. Den nya bron är 664 meter lång (huvudspannet 366 m) och en av Sveriges mest fotograferade.',
  },
  {
    slug: 'kungshamn',
    name: 'Kungshamn',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🦐',
    tagline: 'Räknas hjärta — Sveriges räkindustri har sin tyngdpunkt här.',
    description: [
      'Kungshamn är hjärtat av svensk räkindustri. Mer räkor lossas här varje år än någon annanstans i Sverige. Det är en arbetsby — inte en romantisk fiskeläge — men med stark karaktär och bra restauranger.',
      'Tillsammans med Smögen (som är fysiskt sammanlänkat via en bro) bildar Kungshamn ett av Bohusläns mest intensiva sommarkluster. Smögenbryggan är den välkända delen, men Kungshamn där fisken faktiskt landas.',
      'Inte lika fotogen som Smögen, men minst lika bra för räkmacka — och billigare boende.',
    ],
    facts: {
      travel_time: '1 h 30 min med bil från Göteborg',
      character: 'Fiskeindustriell by, räkor, arbetshamn',
      season: 'Juni–september',
      best_for: 'Räkmacka, billigare bas än Smögen, segling',
    },
    activities: [
      { icon: '🦐', name: 'Räkfiskartur', desc: 'Boka tur från Kungshamn — mindre turistig än Smögen.' },
      { icon: '🐟', name: 'Fiskindustri-rundtur', desc: 'Se hur räkorna sorteras (sommartid).' },
      { icon: '🥾', name: 'Promenad till Smögen', desc: 'Bro mellan Kungshamn och Smögen — 15 min.' },
    ],
    accommodation: [
      { name: 'Kungshamns Hotell', type: 'Hotell', desc: 'Centralt, prisvärt alternativ till Smögen.' },
      { name: 'Stughyrning Kungshamn', type: 'Stugor', desc: 'Privata stugor — billigare än Smögen.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Göteborg', time: '1 h 30 min', desc: 'E6 till Munkedal, sen väg 174.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Kungshamns Gästhamn', desc: 'Mindre besökt än Smögen, mer plats sommartid.', spots: 100, fuel: true },
    ],
    restaurants: [
      { name: 'Räkans Vänner', type: 'Restaurang', desc: 'Räkmackor utan turisttillägg.' },
      { name: 'Kungshamns Hamnkrog', type: 'Krog', desc: 'Klassisk västkustmeny.' },
    ],
    tips: ['Bor du i Kungshamn sparar du 30 % vs Smögen.', 'Räkfisken landas tidiga morgnar — kom dit då.', 'Promenera till Smögen för bryggvyn, sov i Kungshamn.'],
    related: ['smogen', 'lysekil', 'grebbestad'],
    tags: ['räkor', 'fiskeindustri', 'prisvärt', 'arbetshamn'],
    did_you_know: 'Kungshamn är en av Sveriges största fiskelandshamnar med över 5 000 ton räkor som landas årligen — det är 80 % av Sveriges räkfiske.',
  },
  {
    slug: 'pater-noster',
    name: 'Pater Noster',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '💡',
    tagline: 'Den förgyllda fyren som blivit ett av världens mest unika hotell.',
    description: [
      'Pater Noster är en fyrö 30 minuter med båt från Marstrand. Fyren från 1868 var Sveriges första järnfyr och har en signaturgul-svart färg som syns långt ut till havs.',
      'Sedan 2007 är fyren ett "boutique hotel" — bara 9 rum totalt och en restaurant. Övernattning kostar från 5 000 kr/natt men upplevelsen är världsunik.',
      'Ön är dramatisk och vild. Vandring runt klipporna tar 30 minuter och ger en känsla av att vara ute i öppna havet — vilket man bokstavligen är.',
    ],
    facts: {
      travel_time: '30 min båt från Marstrand',
      character: 'Världsunik fyr, exklusiv, dramatisk',
      season: 'April–oktober',
      best_for: 'Speciella tillfällen, romantik, lyx',
    },
    activities: [
      { icon: '💡', name: 'Fyrbestigning', desc: 'Klättra upp i den 30 meter höga fyren.' },
      { icon: '🥾', name: 'Klippvandring', desc: '30 min runt ön — havsutsikt 360°.' },
      { icon: '🍽', name: 'Pater Noster Restaurang', desc: 'Bohuslänsk meny i världsklass.' },
    ],
    accommodation: [
      { name: 'Pater Noster', type: 'Hotell', desc: 'Boutique-hotell i fyrvaktarbostaden — 9 rum.' },
    ],
    getting_there: [
      { method: 'Båt', from: 'Marstrand', time: '30 min', desc: 'Båtshuttle bokas via hotellet.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Pater Noster Brygga', desc: 'Endast för båtshuttle och hotellets gäster.', spots: 5 },
    ],
    restaurants: [
      { name: 'Pater Noster Restaurang', type: 'Restaurang', desc: 'Lokala råvaror, världsklass.' },
    ],
    tips: ['Boka 6+ månader i förväg.', 'Lunch är öppen för icke-hotellgäster (bokas i förväg).', 'Vid kraftig vind kan båt ställas in — flexibelt schema krävs.'],
    related: ['marstrand', 'kungshamn', 'smogen'],
    tags: ['fyr', 'lyx', 'unik', 'boutique-hotell'],
    did_you_know: 'Pater Noster ("Fader Vår" på latin) byggdes 1868 av järn och var Sveriges första järnfyr. Den restaurerades och blev hotell 2007.',
  },
  {
    slug: 'vinga',
    name: 'Vinga',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🎵',
    tagline: 'Evert Taubes hemö — fyr, klippor och visans hjärta.',
    description: [
      'Vinga ligger 12 kilometer utanför Göteborg och är hemö för Evert Taube — Sveriges mest kända visdiktare. Hans far var fyrvaktare här och Evert växte upp på ön.',
      'Vinga fyr (1854) är fortfarande aktiv och syns långt ut till sjöss. Ön har också en kapell, en liten museum dedikerad åt Taube och fina klippvandringar.',
      'Inga övernattningsmöjligheter på själva ön. Dagsturer från Göteborg är lätta — båt går 4–6 gånger dagligen sommartid.',
    ],
    facts: {
      travel_time: '1 h 15 min med båt från Göteborg',
      character: 'Vis-historia, fyr, dagsutflykt',
      season: 'Maj–september',
      best_for: 'Dagsutflykt, vis-fans, klippvandring',
    },
    activities: [
      { icon: '🎵', name: 'Taubemuseet', desc: 'Liten utställning om Evert Taubes liv.' },
      { icon: '💡', name: 'Vinga fyr', desc: 'Klättra upp för 360° utsikt.' },
      { icon: '🥾', name: 'Klippvandring', desc: '30 min runt ön — perfekt för en lugn eftermiddag.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Båt', from: 'Göteborg', time: '1 h 15 min', desc: 'Vingaturer från Saltholmen sommartid.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Vinga Brygga', desc: 'Endast för Vingaturer.', spots: 0 },
    ],
    restaurants: [
      { name: 'Vinga Café', type: 'Café', desc: 'Sommaröppet, kaffe och fika.' },
    ],
    tips: ['Stannar 2–3 timmar — perfekt halvdagstur.', 'Inga restauranger för middag — packa egen mat.', 'Vid kraftig vind kan båten ställas in.'],
    related: ['hono', 'styrso', 'donso'],
    tags: ['evert taube', 'fyr', 'dagsutflykt', 'vis-historia'],
    did_you_know: 'Evert Taube (1890–1976) växte upp på Vinga där hans far var fyrvaktare. Visan "Vingaprolog" sjunger om barndomen på ön.',
  },
  {
    slug: 'hono',
    name: 'Hönö',
    region: 'bohuslan',
    regionLabel: 'Bohuslän',
    emoji: '🐟',
    tagline: 'Närmast Göteborg av södra skärgården — livlig, autentisk och tillgänglig.',
    description: [
      'Hönö är en av södra skärgårdens mest populära öar — närmast Göteborg och därför lättast att nå. Bilfärja från Lilla Varholmen ger snabb access (5 min).',
      'Hönö har en stark fiskartradition men har också blivit ett populärt boendealternativ för göteborgare som vill ha skärgårdsläge utan att lämna jobbpendling.',
      'Båtövergången binder ihop Hönö med Öckerö och Hälsö. Tre öar — en upplevelse — och rent geografiskt det närmaste skärgårdsupplevelse du kan få från Göteborg.',
    ],
    facts: {
      travel_time: '40 min från Göteborg (bil + färja)',
      character: 'Tillgänglig, livlig, fiskartradition',
      season: 'Helår',
      best_for: 'Dagsutflykt, lättillgänglig, familjefriendly',
    },
    activities: [
      { icon: '🐟', name: 'Hönö Klåva fiskmarknad', desc: 'Färsk fisk direkt från flottan.' },
      { icon: '🏊', name: 'Hönö Klåva Bad', desc: 'Sandstrand och klippbad.' },
      { icon: '🚲', name: 'Cykla mellan öarna', desc: 'Hönö–Öckerö–Hälsö är 15 km totalt.' },
    ],
    accommodation: [
      { name: 'Öckerö Pensionat', type: 'Pensionat', desc: 'Klassiskt sjönära.' },
      { name: 'Hönö Vandrarhem', type: 'Vandrarhem', desc: 'Enklare alternativ.' },
    ],
    getting_there: [
      { method: 'Bil + färja', from: 'Göteborg', time: '40 min', desc: 'Bil till Lilla Varholmen, sen 5 min färja till Hönö.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Hönö Klåvas Gästhamn', desc: 'Stor gästhamn med restaurang.', spots: 120, fuel: true },
    ],
    restaurants: [
      { name: 'Klåvas Hamnkrog', type: 'Restaurang', desc: 'Färska skaldjur i hamnmiljö.' },
      { name: 'Hönö Konditori', type: 'Café', desc: 'Klassiskt fika.' },
    ],
    tips: ['Hönö är perfekt halvdagstur från Göteborg.', 'Cykla via bron till Öckerö — färjan tar både bilar och cyklar.', 'Hönö Klåvas hamn är livligast på sommarkvällarna.'],
    related: ['styrso', 'donso', 'vrango'],
    tags: ['nära göteborg', 'bilfärja', 'fiskeläge', 'familjer'],
    did_you_know: 'Hönö, Öckerö och Hälsö är sammanbundna med broar och bildar Sveriges minsta kommun räknat i landyta — Öckerö kommun.',
  },
]

// Export region-rad till regionsidan
export const BOHUSLAN_REGION = {
  id: 'bohuslan',
  label: 'Bohuslän',
  description: 'Västkustens skärgård — räkor, klippor och Sveriges mest fotograferade fiskelägen.',
  color: '#a8381e',
  bg: 'rgba(168,56,30,0.07)',
}

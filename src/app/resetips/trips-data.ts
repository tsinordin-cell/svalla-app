export type StopType = 'transport' | 'mat' | 'kultur' | 'natur' | 'bad' | 'aktivitet' | 'boende'

export type TripStop = {
  name: string
  type: StopType
  desc: string
  tip?: string
  bookingUrl?: string   // direktlänk för bokning av just detta stopp
}

export type TripResource = {
  label: string         // t.ex. 'Waxholmsbolagets tidtabell'
  url: string
}

export type TripDifficulty = 'lätt' | 'medel' | 'krävande'

export type Trip = {
  slug: string
  title: string
  tagline: string
  duration: string
  startPoint: string
  transport: string
  season: string
  difficulty: TripDifficulty
  description: string
  stops: TripStop[]
  resources: TripResource[]   // officiella länkar för schema/bokning
  featured?: boolean           // redaktionellt val / veckans tips
  islandSlugs?: string[]
}

export const TRIPS: Trip[] = [
  // ─── FEATURED TURER ────────────────────────────────────────────────────────

  {
    slug: 'djuro-grinda-dagstur',
    title: 'Bil, glass och båt — Djurö till Grinda',
    tagline: 'En av skärgårdens bästa dagsrutter med bil, brygga och lunchstopp på Grinda.',
    duration: 'Heldag (ca 8 timmar)',
    startPoint: 'Stockholm city',
    transport: 'Bil + båt',
    season: 'Maj–September',
    difficulty: 'lätt',
    featured: true,
    description: 'En perfekt skärgårdsdag som kombinerar det bästa av land och vatten. Du kör till Djurö, utforskar bilmuseet, hämtar glass vid Sollenkroka brygga och kliver ombord på båten till Grinda för lunch på wärdshuset.',
    stops: [
      {
        name: 'Djurö bilmuseum',
        type: 'kultur',
        desc: 'Över 60 veteranbilar i en gammal lada mitt i skärgårdslandskapet. Oväntat bra och barnvänligt.',
        tip: 'Öppnar kl 11 — kom inte för tidigt. Beräkna 1–1,5 timme.',
        bookingUrl: 'https://www.djurobil.se',
      },
      {
        name: 'Glassbaren vid Sollenkroka brygga',
        type: 'mat',
        desc: 'Klassisk skärgårdsglass med utsikt mot båttrafiken.',
        tip: 'Köp glassen och sätt dig på bryggan — det är halva upplevelsen.',
      },
      {
        name: 'Båten från Sollenkroka till Grinda',
        type: 'transport',
        desc: 'Lokalbåten går flera gånger om dagen. Turen tar ca 20 minuter.',
        tip: 'Kolla Waxholmsbolagets tidtabell innan du åker hemifrån.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Lunch på Grinda Wärdshus',
        type: 'mat',
        desc: 'Skärgårdskök med fokus på lokala råvaror. Uteservering med utsikt mot vattnet.',
        tip: 'Boka bord i förväg på sommaren.',
        bookingUrl: 'https://grinda.se',
      },
      {
        name: 'Bad vid Grindas naturhamn',
        type: 'bad',
        desc: 'Klippor och klart vatten på östra sidan av ön.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'Grinda Wärdshus', url: 'https://grinda.se' },
    ],
    islandSlugs: ['grinda'],
  },

  {
    slug: 'sandhamn-ytterskargard',
    title: 'Sandhamn — ytterskärgårdens pärla',
    tagline: 'Lång båtresa, fantastisk strand och KSSS-hamnen med segelbåtar.',
    duration: 'Heldag (10 timmar)',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt (Cinderellabåten)',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    featured: true,
    description: 'Sandhamn är målet om du vill känna den riktiga ytterskärgården. Cinderellabåten tar dig dit på 2,5 timmar — resan är en del av upplevelsen. Väl framme väntar Trouville-stranden, KSSS-hamnen och Sandhamns Värdshus.',
    stops: [
      {
        name: 'Cinderellabåten från Strömkajen',
        type: 'transport',
        desc: '2,5 timmar med stopp längs vägen. Servering ombord och magnifik utsikt.',
        tip: 'Boka biljett i förväg under högsäsong — sittplatser på däck tar slut tidigt.',
        bookingUrl: 'https://cinderellabatarna.com',
      },
      {
        name: 'KSSS-hamnen',
        type: 'kultur',
        desc: 'Kungliga Svenska Segel Sällskapets hemmahamn. Hundratals segelbåtar och en levande marina.',
      },
      {
        name: 'Trouville-stranden',
        type: 'bad',
        desc: 'Sandhamns bästa badstrand med vit sand. 10 minuter promenad från hamnen.',
        tip: 'Ta med picknick — stranden är lång och det finns gott om plats.',
      },
      {
        name: 'Lunch på Sandhamns Värdshus',
        type: 'mat',
        desc: 'Skärgårdsrätter och stor uteservering.',
        tip: 'Boka bord — fullsatt nästan varje dag i juli.',
        bookingUrl: 'https://www.sandhamn.com',
      },
    ],
    resources: [
      { label: 'Cinderellabåtarna — tidtabell och biljetter', url: 'https://cinderellabatarna.com' },
      { label: 'Sandhamns Värdshus', url: 'https://www.sandhamn.com' },
    ],
    islandSlugs: ['sandhamn'],
  },

  {
    slug: 'uto-cykeldag',
    title: 'Utö på cykel — gruvan, bastun och havet',
    tagline: 'Cykla runt en av skärgårdens vackraste öar med stopp vid gruvmuseum och havsbastu.',
    duration: 'Heldag (10–12 timmar)',
    startPoint: 'Årsta havsbad (bil) eller Nynäshamn (tåg)',
    transport: 'Bil/tåg + färja + cykel',
    season: 'Maj–September',
    difficulty: 'medel',
    featured: true,
    description: 'Utö är en av de stora skärgårdsöarna med riktigt karaktär — en aktiv järngruva på 1700-talet, cykelleder genom barrskog och havsbastu som håller hög klass.',
    stops: [
      {
        name: 'Färjan till Utö',
        type: 'transport',
        desc: 'Avgår från Årsta havsbad (45 min) eller Nynäshamn (2 tim).',
        tip: 'Från Stockholm: pendeltåg till Nynäshamn, sedan Waxholmsbolagets båt.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Cykelhyra vid bryggan',
        type: 'aktivitet',
        desc: 'Elcyklar och vanliga cyklar vid Utö Värdshus. Boka i förväg på sommaren.',
        bookingUrl: 'https://www.utovardshus.se/aktiviteter',
      },
      {
        name: 'Utö Gruvmuseum',
        type: 'kultur',
        desc: 'Sveriges äldsta järngruva, aktiv 1150–1879. Öppen för besökare sommar.',
        tip: 'Öppettider varierar — verifiera via Utö Värdshus hemsida.',
        bookingUrl: 'https://www.utovardshus.se',
      },
      {
        name: 'Havsbastu på Utö Värdshus',
        type: 'bad',
        desc: 'En av skärgårdens finaste havsbastuupplevelser. Kvällspass med solnedgången är bäst.',
        tip: 'Boka bastutid i förväg — kvällspassen fylls snabbt.',
        bookingUrl: 'https://www.utovardshus.se/aktiviteter',
      },
      {
        name: 'Middag på Utö Värdshus',
        type: 'mat',
        desc: 'Klassiskt värdshus med lokalt skärgårdskök och havsutsikt.',
        bookingUrl: 'https://www.utovardshus.se',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell (Utö)', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'Utö Värdshus — bokning och aktiviteter', url: 'https://www.utovardshus.se' },
    ],
    islandSlugs: ['uto'],
  },

  {
    slug: 'vaxholm-klassiker',
    title: 'Vaxholm på en dag — fästning, hav och lunch',
    tagline: 'Skärgårdens port — en heldagsklassiker med båt från Stockholm.',
    duration: 'Halvdag–heldag (5–8 timmar)',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt',
    season: 'Hela året',
    difficulty: 'lätt',
    description: 'Vaxholm är det närmaste du kommer äkta skärgårdskänsla utan att åka långt. Waxholmsbåten tar dig dit på 75 minuter, fästningen imponerar på alla åldrar och gamla stan bjuder på träkåkar och trevliga kaféer.',
    stops: [
      {
        name: 'Waxholmsbåten från Strömkajen',
        type: 'transport',
        desc: '75 minuter genom den inre skärgården. Avgår varje timme.',
        tip: 'Sitt på däck oavsett väder — utsikten är värd det.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Vaxholms fästning',
        type: 'kultur',
        desc: 'Historisk befästning från 1500-talet med museum. Nås med liten färja från hamnen.',
        tip: 'Guidad tur tar 45 min och är väl värd pengarna.',
        bookingUrl: 'https://www.vaxholmsfastning.se',
      },
      {
        name: 'Lunch på Waxholms Hotell',
        type: 'mat',
        desc: 'Klassiskt skärgårdshotell med uteservering i hamnen. Räkor och svenska klassiker.',
        tip: 'Räksmörgåsen är legendarisk.',
        bookingUrl: 'https://www.waxholmshotell.se',
      },
      {
        name: 'Gamla stan i Vaxholm',
        type: 'kultur',
        desc: 'Välbevarade trävillor och stenläggda gator längs kanalen.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'Vaxholms fästning', url: 'https://www.vaxholmsfastning.se' },
      { label: 'Waxholms Hotell', url: 'https://www.waxholmshotell.se' },
    ],
    islandSlugs: ['vaxholm'],
  },

  // ─── ÖVRIGA TURER ──────────────────────────────────────────────────────────

  {
    slug: 'fjaderholmarna-snabbtur',
    title: 'Fjäderholmarna — skärgård på en timme från stan',
    tagline: 'Närmaste skärgårdsön från city. Perfekt för en spontan eftermiddag.',
    duration: 'Halvdag (3–4 timmar)',
    startPoint: 'Slussen eller Nybroplan, Stockholm',
    transport: 'Båt',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'Fjäderholmarna är Stockholms närmaste skärgårdsö — 25 minuter med båt från Slussen. Hantverksbod, bryggerier, klippbad. Inget behöver bokas i förväg.',
    stops: [
      {
        name: 'Fjäderholmsbåten från Slussen',
        type: 'transport',
        desc: '25 minuter. Avgår varje halvtimme under sommaren.',
        tip: 'Betala ombord med kort — inga förhandsköp nödvändiga.',
        bookingUrl: 'https://stromma.com/stockholm/fjaderholmarna',
      },
      {
        name: 'Fjäderholmarnas glasshytta',
        type: 'kultur',
        desc: 'Se glasblåsare arbeta och köp med dig ett handblåst minne.',
      },
      {
        name: 'Klippbad',
        type: 'bad',
        desc: 'Välbearbetade klippor runt hela ön med stegar ner i havet.',
        tip: 'Ta med handduk och badkläder.',
      },
      {
        name: 'Lunch på Fjäderholmarnas Krog',
        type: 'mat',
        desc: 'Räkor, grillad fisk och skärgårdsklassiker.',
        tip: 'Boka bord — populärt med stockholmare på lunch.',
        bookingUrl: 'https://www.fjaderholmarnas.se',
      },
    ],
    resources: [
      { label: 'Fjäderholmsbåtarna — avgångstider', url: 'https://stromma.com/stockholm/fjaderholmarna' },
      { label: 'Fjäderholmarnas Krog', url: 'https://www.fjaderholmarnas.se' },
    ],
    islandSlugs: ['fjaderholmarna'],
  },

  {
    slug: 'finnhamn-naturdag',
    title: 'Finnhamn — vandring, bad och stillhet',
    tagline: 'En av skärgårdens bästa öar för vandring och naturupplevelser utan folkmassor.',
    duration: 'Heldag eller övernattning',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt',
    season: 'Juni–Augusti',
    difficulty: 'medel',
    description: 'Finnhamn är ett av skärgårdens bästa naturmål — stor nog för en dags vandring, liten nog för att känna att du har ön för dig själv.',
    stops: [
      {
        name: 'Waxholmsbåten till Finnhamn',
        type: 'transport',
        desc: 'Ca 2,5 timmar från Strömkajen. Fantastisk utsikt längs hela rutten.',
        tip: 'Kolla tidtabellen noga — begränsat med avgångar på vardagar.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Vandring runt norra Finnhamn',
        type: 'natur',
        desc: 'Välmarkerade leder genom barrskog och ut på klippor med havsvy. Ca 6 km.',
        tip: 'Ta med karta — sidostigar kan förvirra.',
      },
      {
        name: 'Klippbad på östra udden',
        type: 'bad',
        desc: 'Öppna klippor mot ytterskärgården. Klart och friskt vatten.',
      },
      {
        name: 'Lunch på Finnhamnsgården',
        type: 'mat',
        desc: 'Enkel husmanskost och kaffe i ett gammalt skärgårdslanderi.',
        tip: 'Kom senast 13.00 — de stänger tidigt och har begränsat med mat.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['finnhamn'],
  },

  {
    slug: 'moja-autentisk-skargard',
    title: 'Möja — äkta skärgård utan turistfällan',
    tagline: 'En av de sista öarna med fast befolkning och genuin skärgårdskultur.',
    duration: 'Heldag eller övernattning',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'Möja är en av de få öar i Stockholms skärgård med en levande lokal befolkning året om. Här finns byhandel, vandringsleder och en känsla av att uppleva hur livet faktiskt ser ut i skärgården.',
    stops: [
      {
        name: 'Waxholmsbåten till Möja',
        type: 'transport',
        desc: 'Drygt 3 timmar från Stockholm. Ta morgonbåten för att maximera tid på ön.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Möja byhandel',
        type: 'kultur',
        desc: 'En av skärgårdens sista riktiga lanthandlar. Köp med dig lokala produkter.',
        tip: 'Öppettider varierar — verifiera via telefon eller på plats.',
      },
      {
        name: 'Vandring till Möjas sydspets',
        type: 'natur',
        desc: 'Smal led genom lummig skog ut till klippor med öppen havsutsikt. Ca 4 km tur och retur.',
      },
      {
        name: 'Möja Café',
        type: 'mat',
        desc: 'Hembakade bullar och enkel lunch. Öppen sommarsäsong.',
        tip: 'Kontrollera öppettiderna i förväg — de varierar.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['moja'],
  },

  {
    slug: 'dalaro-sommarklassiker',
    title: 'Dalarö — historia, bad och sommarhäng',
    tagline: 'Pittoresk skärgårdsstad med stockhusvillor, kajakuthyrning och härliga bad.',
    duration: 'Halvdag–heldag (4–8 timmar)',
    startPoint: 'Stockholm (bil via E18)',
    transport: 'Bil',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'Dalarö är en av de mest välbevarade skärgårdssamhällena i Stockholms skärgård. En timmes bilresa och du är framme — utan att behöva ta båt.',
    stops: [
      {
        name: 'Bil till Dalarö',
        type: 'transport',
        desc: 'Ca 1 timme bil från Stockholm via E18/E20. Parkering vid Dalarö hamn.',
        tip: 'Kom tidigt på sommarlördagar — parkering fylls upp.',
      },
      {
        name: 'Dalarö hamn och gamla stan',
        type: 'kultur',
        desc: 'Välbevarade trävillor och charmig hamnmiljö från 1800-talet.',
      },
      {
        name: 'Klippbad',
        type: 'bad',
        desc: 'Klippor och bryggor strax utanför byn. Ta med picknick.',
        tip: 'Litet café vid badplatsen med glass och dryck.',
      },
      {
        name: 'Kajaktur från Dalarö',
        type: 'aktivitet',
        desc: 'Uthyrning vid hamnen. Paddla ut till närmaste holmar.',
        tip: 'Bra för nybörjare — lugnt inre skärgårdsvatten.',
      },
    ],
    resources: [
      { label: 'Dalarö turistinfo', url: 'https://www.haninge.se/uppleva-och-gora/dalaro' },
    ],
    islandSlugs: ['dalaro'],
  },

  {
    slug: 'arholma-norrut',
    title: 'Arholma — norrut till yttersta skärgård',
    tagline: 'Stockholmsskärgårdens nordligaste punkt med fyr, vilt liv och ödslighet.',
    duration: 'Heldag eller övernattning',
    startPoint: 'Norrtälje (bil + båt)',
    transport: 'Bil + färja',
    season: 'Juni–Augusti',
    difficulty: 'krävande',
    description: 'Arholma är yttersta punkten i Stockholms norra skärgård. Färre turister, vildare natur och en känsla av att vara riktigt långt borta.',
    stops: [
      {
        name: 'Bil till Simpnäs + färja',
        type: 'transport',
        desc: 'Ca 1,5 tim bil norr om Stockholm till Simpnäs. Färja till Arholma därifrån.',
        tip: 'Kolla Arholma Båttrafiks tidtabell — avgångarna är begränsade.',
        bookingUrl: 'https://www.arholmabattrafik.se',
      },
      {
        name: 'Arholma fyr',
        type: 'kultur',
        desc: 'En av de äldsta fyrarna i Roslagen, byggd 1769. Klättra upp för havsutsikt.',
        tip: 'Öppen för besökare under sommaren utan föranmälan, men verifiera via lokala turistbyråer.',
      },
      {
        name: 'Klippbad på norra udden',
        type: 'bad',
        desc: 'Öppna klippor mot Ålands hav. Friskt vatten och riktigt vilda vyer.',
      },
      {
        name: 'Vandring runt ön',
        type: 'natur',
        desc: 'Markerade leder runt Arholma, ca 8 km. Passerar fågelkolonier och naturhamnar.',
        tip: 'Häckningssäsong mars–juli — håll dig till lederna.',
      },
      {
        name: 'Arholma Krog',
        type: 'mat',
        desc: 'Enda restaurangen på ön. Enkel mat och lokalt fiske.',
        tip: 'Stänger tidigt — planera för lunch, inte middag.',
      },
    ],
    resources: [
      { label: 'Arholma Båttrafik — tidtabell', url: 'https://www.arholmabattrafik.se' },
      { label: 'Roslagen turistinfo', url: 'https://www.roslagen.se' },
    ],
    islandSlugs: ['arholma'],
  },

  {
    slug: 'nattaro-vild-natur',
    title: 'Nåttarö — naturreservat och sälar',
    tagline: 'Södra skärgårdens vildaste naturreservat med sälar, klippbad och tystnad.',
    duration: 'Heldag',
    startPoint: 'Nynäshamn (bil/tåg)',
    transport: 'Tåg/bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'medel',
    description: 'Nåttarö är ett av de bäst bevarade naturreservaten i Stockholms skärgård. Inga bilar, inga restauranger — bara klippor, barrskog och tystnad.',
    stops: [
      {
        name: 'Tåg till Nynäshamn + båt',
        type: 'transport',
        desc: 'Pendeltåg från Stockholm C (ca 1 tim). Waxholmsbolagets båt till Nåttarö.',
        tip: 'SL-kortet gäller till Nynäshamn. Waxholmsbiljett köps separat.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Sälskådning vid sydspetsen',
        type: 'natur',
        desc: 'Knubbsälar brukar sola på skären söder om ön. Ta med kikare.',
        tip: 'Håll minst 100 meters avstånd så att de inte skräms.',
      },
      {
        name: 'Vandring genom naturreservatet',
        type: 'natur',
        desc: 'Välmarkerade leder genom orörda skogar. Ca 5–7 km.',
      },
      {
        name: 'Picknick med havsutsikt',
        type: 'mat',
        desc: 'Inga restauranger — ta med allt. Köp räkor vid Nynäshamns hamn.',
        tip: 'Eldplatser finns men ta med egen ved.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'SL — pendeltåg till Nynäshamn', url: 'https://sl.se' },
    ],
    islandSlugs: [],
  },

  // ─── 20 NYA DAGSTURER ──────────────────────────────────────────────────────

  {
    slug: 'ljustero-cykel-och-bad',
    title: 'Ljusterö — cykel, bad och värdshus',
    tagline: 'Buss och färja norr om stan — en lugn ö med cykelleder och ett av skärgårdens äldsta värdshus.',
    duration: 'Heldag (8–9 timmar)',
    startPoint: 'Tekniska högskolan, Stockholm',
    transport: 'Buss + färja + cykel',
    season: 'Maj–September',
    difficulty: 'lätt',
    featured: true,
    description: 'Ljusterö når du enkelt med buss 670 från Stockholm utan att behöva bil. Ön är stor och kuperad — perfekt för cykling — med Ljusterö Värdshus som naturliga middag.',
    stops: [
      {
        name: 'Buss 670 från Tekniska högskolan',
        type: 'transport',
        desc: 'Ca 1,5 timme till Ljusterö färjeläge. Bussen avgår regelbundet.',
        tip: 'SL-kort gäller hela vägen. Kolla aktuell tidtabell via SL.',
        bookingUrl: 'https://sl.se',
      },
      {
        name: 'Färja till Ljusterö',
        type: 'transport',
        desc: 'Kort färjetur på ca 5 minuter. Gratis att ta med cykel.',
        tip: 'Schema kan variera — verifiera via Ljusterö Färjerederi.',
        bookingUrl: 'https://www.ljustero.com',
      },
      {
        name: 'Cykla Ljusteröleden',
        type: 'aktivitet',
        desc: 'Välmarkerad cykelled runt södra delen av ön. Ca 20 km, kuperat men hanterbart.',
        tip: 'Hyra cykel finns på ön, men ta gärna med egen.',
      },
      {
        name: 'Bad vid Ljusterö klippor',
        type: 'bad',
        desc: 'Flertalet badplatser längs lederna. Bra klippbad längs östkusten.',
      },
      {
        name: 'Middag på Ljusterö Värdshus',
        type: 'mat',
        desc: 'Klassiskt skärgårdsvärdshus med god husmanskost och trädgårdsservering.',
        tip: 'Boka bord i förväg på helger.',
        bookingUrl: 'https://www.ljusteroviardshus.se',
      },
    ],
    resources: [
      { label: 'SL — buss 670 tidtabell', url: 'https://sl.se' },
      { label: 'Ljusterö Värdshus', url: 'https://www.ljusteroviardshus.se' },
    ],
    islandSlugs: ['ljustero'],
  },

  {
    slug: 'gustavsberg-porslin-och-skargard',
    title: 'Gustavsberg — porslin, design och Hemmesta sjöäng',
    tagline: 'Buss till Värmdö — porslinets hemort och ett av Stockholms bästa friluftsområden.',
    duration: 'Halvdag–heldag (5–8 timmar)',
    startPoint: 'Slussen, Stockholm',
    transport: 'Buss',
    season: 'Hela året',
    difficulty: 'lätt',
    description: 'Gustavsberg är knappt en timme från Stockholm med buss. Porslinsmuseet berättar om ett av Sveriges mest kända varumärken, och Hemmesta sjöäng är ett fantastiskt naturområde med bad och vandring.',
    stops: [
      {
        name: 'Buss 428 från Slussen',
        type: 'transport',
        desc: 'Ca 50 minuter till Gustavsberg centrum. Avgår regelbundet.',
        tip: 'SL-kort gäller hela vägen.',
        bookingUrl: 'https://sl.se',
      },
      {
        name: 'Gustavsbergs Porslinsmuseum',
        type: 'kultur',
        desc: 'Historien om det ikoniska Gustavsberg-porslinet och nutida design. Butik på plats.',
        tip: 'Öppettider varierar — verifiera via museets hemsida.',
        bookingUrl: 'https://www.porslinsmuseet.se',
      },
      {
        name: 'Lunch i Gustavsberg centrum',
        type: 'mat',
        desc: 'Flera caféer och restauranger i närheten av museet.',
      },
      {
        name: 'Hemmesta sjöäng',
        type: 'natur',
        desc: 'Vackert naturreservat med vandringsleder och badmöjligheter. Ca 3 km buss/promenad från centrum.',
        tip: 'Bra för barnfamiljer — grunt och barnvänligt bad.',
      },
    ],
    resources: [
      { label: 'SL — buss 428 tidtabell', url: 'https://sl.se' },
      { label: 'Gustavsbergs Porslinsmuseum', url: 'https://www.porslinsmuseet.se' },
    ],
    islandSlugs: [],
  },

  {
    slug: 'runmaro-obefort-skargard',
    title: 'Runmarö — orörd skärgård och klippbad',
    tagline: 'En av Stockholms skärgårds mest underskattade öar — vacker, lugn och utan folkmassor.',
    duration: 'Heldag',
    startPoint: 'Stavsnäs, Värmdö (bil)',
    transport: 'Bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'medel',
    description: 'Runmarö nås med Waxholmsbåten från Stavsnäs och ger en autentisk skärgårdsupplevelse utan de stora turistflödena. Bra vandringsleder och fantastiska klippbad.',
    stops: [
      {
        name: 'Bil till Stavsnäs + båt',
        type: 'transport',
        desc: 'Ca 1 timme bil till Stavsnäs. Waxholmsbolagets båt avgår därifrån till Runmarö.',
        tip: 'Boka biljett via Waxholmsbolagets app. Schema kan variera — verifiera tidtabell.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Vandring på Runmarö',
        type: 'natur',
        desc: 'Välmarkerade leder genom lummig natur och ut på klippor med havsutsikt.',
      },
      {
        name: 'Klippbad på östra sidan',
        type: 'bad',
        desc: 'Öppna klippor med klart vatten. Solexponerade och bra för längre bad.',
      },
      {
        name: 'Picknick eller Runmarö Butik',
        type: 'mat',
        desc: 'Enkel lanthandel på ön med grundvaror. Ta gärna med egen mat.',
        tip: 'Öppettider kan vara begränsade — verifiera lokalt.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['runmaro'],
  },

  {
    slug: 'orno-stor-och-varierad',
    title: 'Ornö — Stockholms hemliga stora ö',
    tagline: 'Stor, varierad och relativt okänd — perfekt för er som vill ha ön lite för er själva.',
    duration: 'Heldag eller övernattning',
    startPoint: 'Dalarö (bil)',
    transport: 'Bil + färja',
    season: 'Maj–September',
    difficulty: 'medel',
    description: 'Ornö är en av de större öarna i Stockholms södra skärgård och nås med färja från Dalarö. Varierad natur, bra vandringsleder och en handfull lokala ställen.',
    stops: [
      {
        name: 'Bil till Dalarö + färja till Ornö',
        type: 'transport',
        desc: 'Ca 1 timme bil från Stockholm. Färjan till Ornö avgår från Dalarö.',
        tip: 'Schema kan variera — verifiera avgångstider via Waxholmsbolaget.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Vandring längs Ornöleden',
        type: 'natur',
        desc: 'Markerade leder som täcker öns olika biotoper — skog, öppen mark och kust.',
      },
      {
        name: 'Bad vid Ornös östra klippor',
        type: 'bad',
        desc: 'Välbearbetade klippor mot öppet hav. Sällan folksamlingar.',
      },
      {
        name: 'Ornö Lanthandel',
        type: 'mat',
        desc: 'Enkel butik med lokala produkter. Grillkorv och glass sommartid.',
        tip: 'Öppettider varierar — kolla lokalt.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['orno'],
  },

  {
    slug: 'galo-sandstrand-och-sol',
    title: 'Gålö — sandstrand och familjedags-pärlа',
    tagline: 'En av få sandstränder i Stockholms skärgård. Barnvänligt och lättillgängligt med bil.',
    duration: 'Halvdag–heldag (4–7 timmar)',
    startPoint: 'Stockholm (bil via Nynäsvägen)',
    transport: 'Bil',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    description: 'Gålö är ett undantag i klippskärgården — här finns faktisk sandstrand. Nås med bil och kort färja. Perfekt för barnfamiljer och de som vill ha lite mer "strandkänsla".',
    stops: [
      {
        name: 'Bil till Gålö',
        type: 'transport',
        desc: 'Ca 45 minuter söder om Stockholm via Nynäsvägen. Skyltat från Handen.',
        tip: 'Parkering kan ta slut tidiga lördagar i juli — kom före 10.',
      },
      {
        name: 'Gålö Sandstrand',
        type: 'bad',
        desc: 'En av Stockholmsregionens få sandstränder med grunt och barnvänligt vatten.',
        tip: 'Saniteter och enkel kiosk på plats sommar.',
      },
      {
        name: 'Naturvandring på Gålö',
        type: 'natur',
        desc: 'Vandringsleder genom tallskog och ut mot klippkusten.',
      },
      {
        name: 'Picknick eller lunch vid stranden',
        type: 'mat',
        desc: 'Begränsad servering vid stranden — ta med egen mat och dryck.',
      },
    ],
    resources: [
      { label: 'Haninge kommuns info om Gålö', url: 'https://www.haninge.se' },
    ],
    islandSlugs: ['galo'],
  },

  {
    slug: 'kymmendo-strindbergs-o',
    title: 'Kymmendö — Strindbergs ö i skärgården',
    tagline: 'Den lilla ö där August Strindberg hämtade inspiration till Hemsöborna.',
    duration: 'Heldag',
    startPoint: 'Trosa eller Stav (bil + båt)',
    transport: 'Bil + charter/privat båt',
    season: 'Juni–Augusti',
    difficulty: 'krävande',
    description: 'Kymmendö är en liten ö söder om Stockholm med stark litterär koppling — August Strindberg bodde här och hämtade inspiration till Hemsöborna. Nås bäst med privat båt eller chartrad tur.',
    stops: [
      {
        name: 'Charter från Trosa',
        type: 'transport',
        desc: 'Chartertur till Kymmendö avgår från Trosa eller Stav. Boka i förväg.',
        tip: 'Inga reguljära linjer — kolla lokala båtcharterföretag i Södertälje/Trosa-trakten.',
      },
      {
        name: 'Strindbergs Kymmendö',
        type: 'kultur',
        desc: 'Platsen där Hemsöborna utspelar sig. Vandra runt och låt litteraturen möta verkligheten.',
      },
      {
        name: 'Klippbad och stillhet',
        type: 'bad',
        desc: 'Ön är liten men har fina klippor. Förvänta dig tystnad och natur.',
      },
      {
        name: 'Medtagen picknick',
        type: 'mat',
        desc: 'Ingen servering på ön — ta med allt du behöver.',
        tip: 'Köp med dig räkor eller smörgåsar från Trosa innan du åker.',
      },
    ],
    resources: [
      { label: 'Trosa turistbyrå', url: 'https://www.trosa.se/uppleva' },
    ],
    islandSlugs: ['kymmendo'],
  },

  {
    slug: 'svartso-ost-och-lantliv',
    title: 'Svartsö — ostpigan och äkta lantliv',
    tagline: 'En liten ö känd för sin lokala ostproduktion och genuina skärgårdskaraktär.',
    duration: 'Heldag',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'Svartsö är liten, vacker och känd för sin lokala ostproducent. Waxholmsbåten tar dig hit på drygt 2 timmar. En perfekt ö om du vill ha autentisk skärgård utan att ta dig för långt.',
    stops: [
      {
        name: 'Waxholmsbåten till Svartsö',
        type: 'transport',
        desc: 'Drygt 2 timmar från Strömkajen. Begränsat antal avgångar.',
        tip: 'Ta morgonbåten — kvällsbåten kan vara tidig.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Svartsö Lanthandel',
        type: 'mat',
        desc: 'Charmig butik med lokala produkter, ost och delikatessen från ön.',
        tip: 'Öppettider varierar säsongsvis — verifiera i förväg.',
      },
      {
        name: 'Ostpigan — lokal ostproduktion',
        type: 'kultur',
        desc: 'Lokal ostproducent på ön. Köp med dig handgjord ost direkt från producenten.',
        tip: 'Kontakta i förväg om du vill besöka — öppet för besök kan variera.',
      },
      {
        name: 'Vandring och klippbad',
        type: 'natur',
        desc: 'Leder runt ön genom blandad skog och ut mot klippor.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['svartso'],
  },

  {
    slug: 'furusund-klassisk-sommar',
    title: 'Furusund — klassisk sommarskärgård i norr',
    tagline: 'Charmig samhälle i norra Stockholms skärgård med bryggliv och sommarstämning.',
    duration: 'Halvdag–heldag',
    startPoint: 'Norrtälje (bil)',
    transport: 'Bil',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    description: 'Furusund är ett av norra skärgårdens mest levande sommarsamhällen. Bil hela vägen, bra parkering och ett trevligt hamn- och bryggsliv när det är som bäst.',
    stops: [
      {
        name: 'Bil till Furusund',
        type: 'transport',
        desc: 'Ca 1,5 timme norr om Stockholm via E18 och Norrtälje.',
        tip: 'Parkeringen vid hamnen kan vara full på sommarlördagar — kom tidigt.',
      },
      {
        name: 'Furusunds hamn',
        type: 'kultur',
        desc: 'Levande gästhamn med segelYachts och motorbåtar. Flanera längs kajen.',
      },
      {
        name: 'Bad vid Furusund',
        type: 'bad',
        desc: 'Klippbad nära hamnen. Populärt men sällan överfullt.',
      },
      {
        name: 'Lunch eller middag på Furusunds Wärdshus',
        type: 'mat',
        desc: 'Klassiskt skärgårdsvärdshus med uteservering och havsutsikt.',
        tip: 'Boka bord i förväg på helger — populärt lokalt ställe.',
        bookingUrl: 'https://www.furusundswärdshus.se',
      },
    ],
    resources: [
      { label: 'Norrtälje turistinfo', url: 'https://www.norrtalje.se/uppleva' },
    ],
    islandSlugs: ['furusund'],
  },

  {
    slug: 'ingarso-klassisk-skargard',
    title: 'Ingmarsö — klassisk skärgård utan bilar',
    tagline: 'Bilfri ö med cyklar, naturhamnar och ett lugn som är sällsynt nära stan.',
    duration: 'Heldag eller övernattning',
    startPoint: 'Stavsnäs, Värmdö (bil)',
    transport: 'Bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    description: 'Ingmarsö är en bilfri ö i Stockholms skärgård. Hyr cykel vid bryggan och utforska ön på egna villkor — naturhamnar, klippbad och lokalt café.',
    stops: [
      {
        name: 'Bil till Stavsnäs + båt',
        type: 'transport',
        desc: 'Ca 1 timme bil till Stavsnäs. Waxholmsbåten till Ingmarsö.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Cykelhyra vid bryggan',
        type: 'aktivitet',
        desc: 'Cyklar hyrs vid bryggan — perfekt sätt att utforska ön utan bil.',
        tip: 'Begränsat antal cyklar — kom tidigt eller ring i förväg.',
      },
      {
        name: 'Naturhamn och klippbad',
        type: 'bad',
        desc: 'Flera skyddade naturhamnar med klart vatten runt ön.',
      },
      {
        name: 'Ingmarsö Café',
        type: 'mat',
        desc: 'Litet café med hembakat och enkel lunch. Sommaröppet.',
        tip: 'Öppettider varierar — verifiera lokalt.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['ingmarso'],
  },

  {
    slug: 'nando-tradition-och-tystnad',
    title: 'Nämdö — tradition, tystnad och äkta skärgårdsliv',
    tagline: 'En av Stockholms skärgårds mest avskilda öar med fast befolkning och lång historia.',
    duration: 'Heldag',
    startPoint: 'Stavsnäs, Värmdö (bil)',
    transport: 'Bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'medel',
    description: 'Nämdö är en storslagen ö med fast befolkning, gamla fiskelägen och fantastisk natur. En av de öar i Stockholms skärgård som fortfarande känns genuint levande.',
    stops: [
      {
        name: 'Bil till Stavsnäs + båt',
        type: 'transport',
        desc: 'Ca 1 timme bil. Waxholmsbåten till Nämdö.',
        tip: 'Begränsat med avgångar — kolla tidtabellen noga.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Nämdö kyrka och fiskeläget',
        type: 'kultur',
        desc: 'Liten träkyrka och ett bevarat fiskeläge från förra seklet.',
      },
      {
        name: 'Vandring på Nämdö',
        type: 'natur',
        desc: 'Leder genom gammal kulturmark och ut mot klippkusten. Ca 5–8 km.',
      },
      {
        name: 'Bad och picknick',
        type: 'bad',
        desc: 'Ta med mat — begränsad service på ön. Bad från klippor längs sydkusten.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['namdo'],
  },

  {
    slug: 'smaadalaro-sol-och-hav',
    title: 'Smådalarö — det lilla samhällets charm',
    tagline: 'Pittoreskt samhälle söder om Dalarö med gästhamn, krog och klippbad.',
    duration: 'Halvdag–heldag',
    startPoint: 'Stockholm (bil)',
    transport: 'Bil',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    description: 'Smådalarö är en liten pärla i Stockholms södra skärgård. Bil hela vägen, charmig gästhamn och ett av de trevligaste klippbaden i södra skärgården.',
    stops: [
      {
        name: 'Bil till Smådalarö',
        type: 'transport',
        desc: 'Ca 1 timme söder om Stockholm. Skyltat från Handen via Västerhaninge.',
      },
      {
        name: 'Smådalarö Gästgiveri',
        type: 'mat',
        desc: 'Historiskt gästgiveri vid hamnen med skärgårdsmat och uteservering.',
        tip: 'Boka bord i förväg på helger.',
        bookingUrl: 'https://www.smaadalarogastgiveri.se',
      },
      {
        name: 'Klippbad vid Smådalarö',
        type: 'bad',
        desc: 'Tillgängliga klippbad strax utanför samhället. Populärt men hanterbart.',
      },
      {
        name: 'Promenad längs hamnen',
        type: 'kultur',
        desc: 'Kika på gästbåtar och ta in sommarstemningen vid bryggan.',
      },
    ],
    resources: [
      { label: 'Smådalarö Gästgiveri', url: 'https://www.smaadalarogastgiveri.se' },
    ],
    islandSlugs: ['smadalaro'],
  },

  {
    slug: 'vindö-badparadiset',
    title: 'Vindö — skärgårdens badparadis med bro',
    tagline: 'Bilfritt paradis nära Stavsnäs med fantastiska klippbad och sandstränder.',
    duration: 'Halvdag–heldag',
    startPoint: 'Stavsnäs, Värmdö (bil)',
    transport: 'Bil + kort bro/båt',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    description: 'Vindö nås via Stavsnäs och är känt för sina varierade badmöjligheter — klippbad, naturhamnar och en av de bättre "hängplatserna" i skärgårdens inre delar.',
    stops: [
      {
        name: 'Bil till Stavsnäs + bro/färja till Vindö',
        type: 'transport',
        desc: 'Ca 1 timme bil till Stavsnäs. Kort överfart till Vindö.',
        tip: 'Verifiera överfartsmöjligheter lokalt — det finns både privat och kommunal trafik.',
      },
      {
        name: 'Klippbad på Vindö',
        type: 'bad',
        desc: 'Välbearbetade klippor med klart vatten och vackra vyer mot Stavsnäs-sidan.',
      },
      {
        name: 'Vandring på Vindö',
        type: 'natur',
        desc: 'Enkla leder runt ön som passar familjer. Vacker havsutsikt längs delar av sträckan.',
      },
      {
        name: 'Picknick',
        type: 'mat',
        desc: 'Begränsad service på ön — ta med mat. Stavsnäs Värdshus är alternativet.',
        bookingUrl: 'https://www.stavsnaswardshus.se',
      },
    ],
    resources: [
      { label: 'Stavsnäs Värdshus', url: 'https://www.stavsnaswardshus.se' },
    ],
    islandSlugs: ['vindo'],
  },

  {
    slug: 'husaro-avskild-pärla',
    title: 'Husarö — en av skärgårdens mest avskilda öar',
    tagline: 'Liten, tyst och vacker — Husarö kräver lite mer planering men ger det tillbaka dubbelt.',
    duration: 'Heldag',
    startPoint: 'Norrtälje (bil + båt)',
    transport: 'Bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'krävande',
    description: 'Husarö är en liten ö i norra Stockholms skärgård med begränsade båtförbindelser. Det gör den avskild och tyst — perfekt för er som söker en dag utan folkmassor.',
    stops: [
      {
        name: 'Bil till Norrtälje + båt till Husarö',
        type: 'transport',
        desc: 'Ca 1 tim bil till Norrtälje. Waxholmsbåt till Husarö därifrån.',
        tip: 'Mycket begränsade avgångar — planera i god tid och verifiera tidtabellen.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Vandring runt Husarö',
        type: 'natur',
        desc: 'Liten ö med enkel vandringsled runt hela ön. Ca 3–4 km.',
      },
      {
        name: 'Klippbad',
        type: 'bad',
        desc: 'Välbearbetade klippor med klart vatten. Förvänta dig lugn och ro.',
      },
      {
        name: 'Medtagen mat',
        type: 'mat',
        desc: 'Ingen service på ön. Ta med allt du behöver för hela dagen.',
        tip: 'Köp räkor och smörgåsar i Norrtälje innan du tar båten.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'Norrtälje turistinfo', url: 'https://www.norrtalje.se/uppleva' },
    ],
    islandSlugs: ['husaro'],
  },

  {
    slug: 'rodloga-ytterskargard-aventyr',
    title: 'Rödlöga — ytterskärgård och vind i håret',
    tagline: 'En av Stockholmsskärgårdens yttersta öar. Vild, vacker och värd varje timme det tar att ta sig dit.',
    duration: 'Heldag (tidigt start krävs)',
    startPoint: 'Norrtälje (bil + båt)',
    transport: 'Bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'krävande',
    description: 'Rödlöga ligger i ytterskärgårdens norra del. Det kräver planering att ta sig dit, men belöningen är en av de mest storslagna naturupplevelserna i hela Stockholms skärgård.',
    stops: [
      {
        name: 'Bil till Norrtälje + lång båttur',
        type: 'transport',
        desc: 'Waxholmsbåt från Norrtälje till Rödlöga. Resan kan ta 2–3 timmar.',
        tip: 'Avgångarna är mycket begränsade — planera minst en vecka i förväg och verifiera via Waxholmsbolaget.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Vandring på Rödlöga',
        type: 'natur',
        desc: 'Öppen hällmark, klippor och vyer mot öppet hav åt alla håll.',
      },
      {
        name: 'Klippbad i ytterskärgården',
        type: 'bad',
        desc: 'Öppna klippor med riktigt klart vatten. Inga turister — bara du och havet.',
      },
      {
        name: 'Medtagen mat',
        type: 'mat',
        desc: 'Ingen service på ön. Packa mat för hela dagen.',
        tip: 'Ta med rejäl matsäck — du är långt från närmaste butik.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell (norra Roslagen)', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['rodloga'],
  },

  {
    slug: 'fejan-fyr-och-havsutsikt',
    title: 'Fejan — fyr och havsutsikt i norra skärgården',
    tagline: 'Liten ö med stor utsikt — en av Stockholmsskärgårdens vackraste fyröar.',
    duration: 'Heldag',
    startPoint: 'Norrtälje (bil + båt)',
    transport: 'Bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'krävande',
    description: 'Fejan är en liten ö i norra Roslagen med en karakteristisk fyr och storslagna havsvyer. Begränsad service men stor naturupplevelse.',
    stops: [
      {
        name: 'Bil till Norrtälje + båt till Fejan',
        type: 'transport',
        desc: 'Waxholmsbåt från Norrtälje. Resan tar ca 2 timmar med stopp.',
        tip: 'Verifiera aktuell tidtabell — avgångarna är få och kan ändras.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Fejans fyr',
        type: 'kultur',
        desc: 'Karakteristisk fyr med utsikt mot Ålands hav. En av Roslagens vackraste.',
      },
      {
        name: 'Vandring och klippbad',
        type: 'natur',
        desc: 'Enkel vandring runt ön med bad från välbearbetade klippor.',
      },
      {
        name: 'Medtagen picknick',
        type: 'mat',
        desc: 'Ingen service — ta med allt. Passa på att köpa mat i Norrtälje.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
    ],
    islandSlugs: ['fejan'],
  },

  {
    slug: 'landsort-sydligaste-fyren',
    title: 'Landsort — Stockholmsskärgårdens sydligaste punkt',
    tagline: 'Fyren vid världens ände — en av landets vackraste öar och ett historiskt fyrsläge.',
    duration: 'Heldag (tidigt start)',
    startPoint: 'Nynäshamn (bil/tåg + båt)',
    transport: 'Tåg/bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'krävande',
    description: 'Landsort är den sydligaste bebodda punkten i Stockholms skärgård med en av Sveriges vackraste fyrstationer. Lång resväg men en upplevelse utöver det vanliga.',
    stops: [
      {
        name: 'Tåg till Nynäshamn + båt till Landsort',
        type: 'transport',
        desc: 'Pendeltåg från Stockholm C (ca 1 tim). Waxholmsbåt via Öja till Landsort.',
        tip: 'Mycket begränsat med avgångar — planera och verifiera tidtabellen noga. Tur-och-retur samma dag kräver tidigt start.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Landsorts fyr',
        type: 'kultur',
        desc: 'En av Östersjöns viktigaste fyrstationer sedan 1600-talet. Stilrent och historiskt.',
        tip: 'Fyren och museet kan ha begränsade öppettider — verifiera via Landsorts Fyrby.',
        bookingUrl: 'https://www.landsort.com',
      },
      {
        name: 'Vandring längs kusten',
        type: 'natur',
        desc: 'Öppen hällmark och utsikt mot Östersjön åt söder. Känslan av att vara vid jordens ände.',
      },
      {
        name: 'Bad vid Landsort',
        type: 'bad',
        desc: 'Klippbad med rent Östersjövatten. Sällan folksamlingar.',
      },
      {
        name: 'Medtagen matsäck',
        type: 'mat',
        desc: 'Begränsad service på ön. Ta med mat för hela dagen.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'SL — pendeltåg till Nynäshamn', url: 'https://sl.se' },
      { label: 'Landsorts Fyrby', url: 'https://www.landsort.com' },
    ],
    islandSlugs: ['landsort'],
  },

  {
    slug: 'grinda-paddling-och-lunch',
    title: 'Grinda — kajak, lunch och naturhamn',
    tagline: 'Paddla runt ön på förmiddagen, ät lunch på wärdshuset och ta ett dopp på eftermiddagen.',
    duration: 'Heldag',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt',
    season: 'Juni–Augusti',
    difficulty: 'medel',
    description: 'Grinda är en av de mest kompletta dagsmålen i Stockholms skärgård — kajak, vandring, lunch och bad allt på samma ö. Waxholmsbåten tar dig dit på drygt en timme.',
    stops: [
      {
        name: 'Waxholmsbåten till Grinda',
        type: 'transport',
        desc: 'Ca 1,5 timme från Strömkajen. Avgår regelbundet.',
        bookingUrl: 'https://waxholmsbolaget.se/tidtabeller',
      },
      {
        name: 'Kajaktur runt Grinda',
        type: 'aktivitet',
        desc: 'Guidning och uthyrning från Grinda Wärdshus brygga. Ca 3 timmar runt ön.',
        tip: 'Boka i förväg — kajaker tar slut tidigt på högsommar.',
        bookingUrl: 'https://grinda.se/aktiviteter',
      },
      {
        name: 'Lunch på Grinda Wärdshus',
        type: 'mat',
        desc: 'Skärgårdskök med fokus på lokala råvaror och havsutsikt.',
        tip: 'Boka bord om du är fler än 4 personer.',
        bookingUrl: 'https://grinda.se',
      },
      {
        name: 'Eftermiddagsdopp i naturhamnen',
        type: 'bad',
        desc: 'Klippor och klart vatten på östra sidan. Perfekt efter lunch.',
      },
    ],
    resources: [
      { label: 'Waxholmsbolagets tidtabell', url: 'https://waxholmsbolaget.se/tidtabeller' },
      { label: 'Grinda Wärdshus — bokning och kajak', url: 'https://grinda.se' },
    ],
    islandSlugs: ['grinda'],
  },

  {
    slug: 'morko-sodra-skargarden',
    title: 'Mörkö — södra skärgårdens dolda pärla',
    tagline: 'Stor ö i Södertälje-skärgården med fin natur och lugn stämning — nås med bil och bro.',
    duration: 'Halvdag–heldag',
    startPoint: 'Södertälje (bil)',
    transport: 'Bil',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'Mörkö nås med bil via bro och erbjuder fin natur och klippbad utan de stora turistflödena. En bra dagsutflykt för dem som bor söder om Stockholm.',
    stops: [
      {
        name: 'Bil till Mörkö via Södertälje',
        type: 'transport',
        desc: 'Ca 1 timme från Stockholm via E4 och Södertälje. Bro till ön.',
        tip: 'Parkering finns vid flera badplatser och naturområden.',
      },
      {
        name: 'Klippbad på Mörkö',
        type: 'bad',
        desc: 'Välbearbetade klippbad längs öns östra och södra kust.',
      },
      {
        name: 'Vandring i Mörkös naturreservat',
        type: 'natur',
        desc: 'Leder genom gammal ädellövskog och ut mot klippkusten.',
      },
      {
        name: 'Picknick',
        type: 'mat',
        desc: 'Begränsad servering på ön — ta med mat. Södertälje har bra matbutiker längs vägen.',
      },
    ],
    resources: [
      { label: 'Södertälje kommuninfo', url: 'https://www.sodertalje.se/uppleva-och-gora' },
    ],
    islandSlugs: ['morko'],
  },
]

export function getTrip(slug: string): Trip | undefined {
  return TRIPS.find(t => t.slug === slug)
}

export function getFeaturedTrips(): Trip[] {
  return TRIPS.filter(t => t.featured)
}

export function getTripsByDifficulty(difficulty: TripDifficulty): Trip[] {
  return TRIPS.filter(t => t.difficulty === difficulty)
}

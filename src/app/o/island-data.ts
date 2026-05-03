export type IslandActivity = {
  icon: string
  name: string
  desc: string
}

export type IslandAccommodation = {
  name: string
  type: 'Hotell' | 'Vandrarhem' | 'Stugor' | 'Camping' | 'B&B' | 'Gästhamn' | 'Pensionat'
  desc: string
}

export type IslandTransport = {
  method: string
  from?: string
  time?: string
  desc: string
  icon: string
}

export type IslandHarbor = {
  name: string
  desc: string
  spots?: number
  fuel?: boolean
  service?: string[]
}

export type IslandRestaurant = {
  name: string
  type: string
  desc: string
  slug?: string
  /** URL till bokning (egen hemsida, OpenTable, Resy, Bokun osv.) — visas som "Boka bord →" på ösidan */
  bookingUrl?: string
  /** URL till hemsida — visas som "Hemsida →" om bookingUrl saknas */
  websiteUrl?: string
}

export type Island = {
  slug: string
  name: string
  /** URL till coverbild (Wikimedia, Unsplash etc.) — visas i listsidor och OG-bilder */
  coverImage?: string
  region: 'norra' | 'mellersta' | 'södra' | 'bohuslan'
  regionLabel: string
  emoji: string
  tagline: string
  lat?: number   // approx center coordinate
  lng?: number
  description: string[]
  facts: {
    travel_time: string
    character: string
    season: string
    best_for: string
  }
  activities: IslandActivity[]
  accommodation: IslandAccommodation[]
  getting_there: IslandTransport[]
  harbors: IslandHarbor[]
  restaurants: IslandRestaurant[]
  tips: string[]
  related: string[]
  tags: string[]
  did_you_know?: string
}

export const ISLANDS: Island[] = [

  // ─── SANDHAMN ────────────────────────────────────────────────
  {
    slug: 'sandhamn',
    name: 'Sandhamn',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'sailboat',
    tagline: 'Seglarnas huvudstad och skärgårdens mest levande destination.',
    description: [
      'Sandhamn är ett av Stockholms skärgårds mest välkända namn — och med rätta. Ön är hem för KSSS (Kungliga Svenska Segel Sällskapet) och samlar tusentals seglare varje sommar i en av Östersjöns mest besökta gästhamnar. Här finns allt: restauranger i toppklass, bagerier, barer och ett hamnnäsliv som sträcker sig långt in på nätterna.',
      'Trots att Sandhamn är populärt har det bevarat sin karaktär. Ön är bilfri och smalare stigar leder mellan trävillorna. Det vita sandstranden Trouville på öns södra sida är en av skärgårdens finaste. Klipporna österut erbjuder solbad med utsikt mot öppet hav.',
      'Sandhamn besöks bäst juni–september men ön har verksamhet nästan hela året tack vare Seglarhotellet. Högsäsong är juli — boka allt i förväg.',
    ],
    facts: {
      travel_time: '2,5 h med Waxholmsbåt från Strömkajen / 40 min snabbåt från Stavsnäs',
      character: 'Livlig, seglartät, festlig sommardestination',
      season: 'Maj–September (Seglarhotellet: helår)',
      best_for: 'Seglare, restaurangälskare, sommarturer',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'KSSS-hamnen är Östersjöns mest besökta gästhamn med plats för hundratals båtar. Ruffen Sandhamnsleden är en klassiker.' },
      { icon: '🏊', name: 'Sandstranden Trouville', desc: 'Öns vackraste sandstrand på södra sidan. Sällsynt i skärgårdssammanhang — sand istället för klippor.' },
      { icon: '🧖', name: 'Spa & Gym', desc: 'Seglarhotellets spa med bubbelpool, bastu och havsutsikt. Öppet för hotellgäster och boende.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön på de smala stigarna. Klipporna på östra sidan ger utsikt mot öppet hav.' },
      { icon: '🎣', name: 'Fiske', desc: 'Ytterskärgårdens vatten erbjuder utmärkt fiske. Havsöring och makrill är vanliga.' },
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Uthyrning finns vid hamnen. Paddla runt ön eller ut mot de omgivande grunden.' },
    ],
    accommodation: [
      { name: 'Seglarhotellet', type: 'Hotell', desc: 'Det ikoniska hotellet vid hamnen — modernt spa, utsiktsrum och öppet helår. Boka långt i förväg.' },
      { name: 'Sandhamns Värdshus', type: 'B&B', desc: 'Boende i historisk miljö med frukost. Öppet hela sommaren.' },
      { name: 'Sands Hotell', type: 'Hotell', desc: 'Modernt lägenhetshotell med hotellservice. Öppet året om.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '2,5 h', desc: 'Klassikalternativet — ta med sig mat och njut av resan.', icon: '⛴' },
      { method: 'Snabbåt', from: 'Stavsnäs', time: '40 min', desc: 'Snabbaste alternativet. Buss/bil till Stavsnäs, sedan båt.', icon: '🚤' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Segelbåt eller motorbåt till KSSS-hamnen. Förboka gästplats under högsäsong.', icon: '⛵' },
    ],
    harbors: [
      { name: 'KSSS Sandhamn', desc: 'Huvudhamnen med plats för 300+ båtar, bränsle, el och servicebyggnad. Boka i förväg juli–aug.', spots: 300, fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'bränsle'] },
      { name: 'Sandhamns Sjöstation', desc: 'Drivmedel och service vid inloppet.', fuel: true, service: ['bränsle', 'olja'] },
    ],
    restaurants: [
      { name: 'Seglarrestaurangen', type: 'Restaurang', desc: 'Seglarhotellets krog — en av skärgårdens finaste. Boka i förväg.', bookingUrl: 'https://www.bokabord.se/restaurang/sandhamn-seglarhotell', websiteUrl: 'https://www.sandhamn.com' },
      { name: 'Sandhamns Värdshus', type: 'Restaurang', desc: 'Historisk krog vid färjebryggan. Enkel husmanskost och räkor.', bookingUrl: 'https://www.bokabord.se/restaurang/sandhamns-vardshus', websiteUrl: 'https://sandhamns-vardshus.se' },
      { name: 'Bistro Sands', type: 'Bistro', desc: 'Avslappnad bistro med havsutsikt och säsongsrätter.' },
      { name: 'Dykarbaren', type: 'Bar', desc: 'Bryggbar med hamburgare och öl. Populär för sundowner.' },
      { name: 'Sandhamns Bageriet', type: 'Bageri', desc: 'Nybakat varje morgon. Kö tidigt i juli.' },
    ],
    tips: [
      'Boka restaurang och hotell minst 4–6 veckor i förväg under juli.',
      'Sandstranden Trouville är bäst tidigt på morgonen innan turistbåtarna anländer.',
      'Promenera österut till klipporna för solnedgångsutsikt mot öppet hav.',
      'Undvik att anlöpa under Gotland Runt-helgen (tidig juli) — hamnen är fullbokad.',
    ],
    related: ['moja', 'grinda', 'finnhamn'],
    tags: ['segling', 'gästhamn', 'restauranger', 'sandstrand', 'sommarfest'],
    did_you_know: 'Sandhamn har bebotts sedan 1500-talet som lotsstation. Namnet kommer från den ovanliga sandstranden — de flesta öar i skärgården har bara klippor.',
  },

  // ─── UTÖ ─────────────────────────────────────────────────────
  {
    slug: 'uto',
    name: 'Utö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🚲',
    tagline: 'Södra skärgårdens kronjuvel — cykling, gruvhistoria och havsbastu.',
    description: [
      'Utö är södra skärgårdens mest kompletta destination. Ön är känd för sina cykelleder, sin gruvhistoria — järn bröts här i mer än 700 år, från 1100-talet till 1879 — och sin havsbastu som numera är en av skärgårdens mest omtalade upplevelser. Utö Värdshus håller hög klass och är ett självklart mål för dem som vill kombinera god mat med naturupplevelse.',
      'Till skillnad från Sandhamn är Utö lugnare och mer familjevänlig. Öns storlek gör att man kan cykla runt hela dagen och ändå inte upprepa sig. Det finns sandstränder, klippor, naturreservat och ett litet museum om gruvdriften.',
      'Utö nås med färja från Nynäshamn eller med snabbåt. Ön är populär att kombinera med Nåttarö och Ålö-Rånö på en längre seglingstur söderut.',
    ],
    facts: {
      travel_time: '1,5 h med färja från Nynäshamn / 30 min med snabbåt',
      character: 'Lugnt, naturnära, perfekt för familjer och cyklister',
      season: 'April–Oktober (Värdshuset öppet helår)',
      best_for: 'Cykling, havsbastu, naturupplevelser, familjer',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Cykla runt hela ön på markerade leder. Cykeluthyrning vid hamnen. En halvdag räcker för de flesta lederna.' },
      { icon: '🧖', name: 'Havsbastu', desc: 'En av skärgårdens mest omtalade havsbastur. Dörrn går ut mot havet — basta, hoppa i, basta igen.' },
      { icon: '⛏', name: 'Gruvan & museet', desc: 'Järnmalm bröts här i 200 år. Utögruvan och gruvmuseet berättar historien. Fascinerande för barn och vuxna.' },
      { icon: '🏊', name: 'Bad & stränder', desc: 'Flera badplatser längs öns kust. Sandstranden vid Alsvik är familjevänlig.' },
      { icon: '🚶', name: 'Vandring', desc: 'Naturreservat i öns södra del med välmarkerade leder och vacker urbergslandskap.' },
      { icon: '🎣', name: 'Fiske', desc: 'Ytterskärgården runt Utö är utmärkt för havsöring och abborre.' },
    ],
    accommodation: [
      { name: 'Utö Värdshus', type: 'Hotell', desc: 'Välkänt värdshus med restaurang, spa och havsutsikt. Öppet hela året.' },
      { name: 'Utö Camping & Stugor', type: 'Camping', desc: 'Tältplats och stugor i naturreservat. Bokningsbart online.' },
      { name: 'STF Vandrarhem', type: 'Vandrarhem', desc: 'Enkelt och prisvärt boende för den budgetmedvetna skärgårdsresenären.' },
    ],
    getting_there: [
      { method: 'Skärgårdsbåt', from: 'Årsta brygga, Nynäshamn', time: '1,5 h', desc: 'Waxholmsbolagets skärgårdslinje från Årsta brygga i Nynäshamn (kommunal- och SL-kort gäller ej — separat biljett).', icon: '⛴' },
      { method: 'Snabbåt', from: 'Årsta brygga, Nynäshamn', time: '30 min', desc: 'Snabbare alternativ sommartid — körs som expresslinje av Waxholmsbolaget.', icon: '🚤' },
      { method: 'Pendel + båt', from: 'Stockholm C', time: '2 h totalt', desc: 'Pendeltåg till Nynäshamn (1 h), sedan kort buss/promenad till Årsta brygga + båt.', icon: '🚆' },
    ],
    harbors: [
      { name: 'Utö Gästhamn', desc: 'Välutrustad gästhamn med bränsle, el och service. Boka i förväg sommartid.', spots: 150, fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle', 'tvätt'] },
    ],
    restaurants: [
      { name: 'Utö Värdshus', type: 'Restaurang', desc: 'Öns flaggskepp — vällagad mat med havsutsikt. Boka i förväg.', bookingUrl: 'https://www.utovardshus.se/restaurang/boka-bord-vardshuset/', websiteUrl: 'https://www.utovardshus.se' },
      { name: 'Seglarbaren', type: 'Bar', desc: 'Avslappnad hamn­bar för seglare och besökare.' },
      { name: 'Hamnboden', type: 'Kiosk', desc: 'Enkel mat och dryck direkt vid hamnen.' },
      { name: 'Bakfickan Utö', type: 'Restaurang', desc: 'Gemytlig lokal restaurang med bra husmanskost.' },
    ],
    tips: [
      'Hyr cykel vid hamnen direkt när du stiger av — de tar slut snabbt sommardagar.',
      'Havsbastubokning krävs online i förväg. Kvällspass med solnedgång är bäst.',
      'Kombinera med en natt på Utö — Nåttarö och Ålö-Rånö är enkla dagsutflykter därifrån.',
      'Gruvmuseet är gratis och tar 45 minuter — bättre än man förväntar sig.',
    ],
    related: ['nattaro', 'dalaro', 'orno'],
    tags: ['cykling', 'havsbastu', 'gruva', 'naturreservat', 'familj'],
    did_you_know: 'Utö har en av Sveriges äldsta järngruvor — drift från 1100-talet fram till 1879. Sveriges första rälsväg byggdes på Utö 1835 (700 meter, för malmtransport från gruvan till lastkajen).',
  },

  // ─── VAXHOLM ─────────────────────────────────────────────────
  {
    slug: 'vaxholm',
    name: 'Vaxholm',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'building',
    tagline: 'Porten till skärgården — stad, fästning och direktbåt från Strömkajen.',
    description: [
      'Vaxholm kallas "porten till skärgården" — och det med rätta. Staden kontrollerade i 500 år ingången till Stockholms inre skärgård via fästningen mitt i sundet. Idag är den röda fästningen ett museum och ett av skärgårdens mest fotograferade motiv.',
      'Vaxholm är en riktig stad — med permanentboende, butiker, restauranger och en levande hamn. Det gör den unik bland skärgårdens öar. Man kan ta en kaffepaus, handla souvenirer och sitta ned på ett riktigt café utan att det känns som turistfälla.',
      'Direktbåt från Strömkajen tar 75 minuter. Vaxholm är det självklara första steget ut i skärgården för den som aldrig åkt dit förut.',
    ],
    facts: {
      travel_time: '75 min med Waxholmsbåt från Strömkajen',
      character: 'Stad med skärgårdskänsla, historia, helårsdestination',
      season: 'Helår — Vaxholm är en aktiv stad tolv månader om året',
      best_for: 'Dagsturer, historia, familjer, första skärgårdsbesök',
    },
    activities: [
      { icon: '🏰', name: 'Vaxholms Kastell', desc: 'Fästningsmuseum med 500 år av skärgårdsförsvar. Guidade turer sommartid. Lägg 2 timmar här.' },
      { icon: '🛍', name: 'Stadspromenaden', desc: 'Vandra längs kajen, titta in i de gamla trähusen och fika i de lokala caféerna.' },
      { icon: '🎣', name: 'Fiskeguider', desc: 'Catch & Relax och andra guider erbjuder guidat fiske i Vaxholms skärgård.' },
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Perfekt utgångspunkt för kajakpaddling mot Resarö, Rindö och Tenö.' },
      { icon: '🚢', name: 'Båtutflykter', desc: 'Ta Waxholmsbåten vidare ut i skärgården — Grinda, Finnhamn och Sandhamn är alla tillgängliga.' },
    ],
    accommodation: [
      { name: 'Waxholms Hotell', type: 'Hotell', desc: 'Historiskt hotell precis vid hamnen. Bra matsal och havsutsikt.' },
      { name: 'Vaxholm Harbour B&B', type: 'B&B', desc: 'Mysiga rum i stadskärnan nära hamnen.' },
      { name: 'Waxholms Camping', type: 'Camping', desc: 'Campingplats med stugor, perfekt för familjer. Går att nå med bil.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '75 min', desc: 'Direktlinje med Waxholmsbolaget. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Bil', from: 'Stockholm', time: '45 min', desc: 'Vaxholm nås med bil via E18. Det finns parkeringar i staden.', icon: '🚗' },
      { method: 'Buss', from: 'Tekniska Högskolan', time: '60 min', desc: 'SL-buss 670 från T-banan.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Vaxholms Gästhamn', desc: 'Centralt belägen gästhamn med god service. Gångavstånd till all service.', spots: 80, fuel: false, service: ['el', 'vatten', 'dusch', 'toilet'] },
    ],
    restaurants: [
      { name: 'Hamnkrogen Vaxholm', type: 'Restaurang', desc: 'Klassisk bryggkrog med räkor och husmanskost.' },
      { name: 'Winbergs Kök & Bar', type: 'Restaurang', desc: 'Enkel och bra mat i avslappnad miljö.' },
      { name: 'Getfoten Sjökrog', type: 'Restaurang', desc: 'Populär sjökrog söder om stan.' },
      { name: 'Mathantverkstan', type: 'Delikatess', desc: 'Rökt fisk och lokalt producerade skafferivaror.' },
    ],
    tips: [
      'Kastell-museet är bäst att besöka på förmiddagen innan turistbåtarna anländer.',
      'Köp proviant på Mathantverkstan — rökt lax och hembakade produkter att ta med ut i skärgården.',
      'Vaxholm är en utmärkt bas för vidare utflykter — Grinda är bara 30 min med båt.',
      'På vintern är Vaxholm en charmig dag-tur med julatmosfär och tomma kajer.',
    ],
    related: ['grinda', 'finnhamn', 'ljustero'],
    tags: ['historia', 'fästning', 'stad', 'dagsturer', 'helår'],
    did_you_know: 'Vaxholms fästning byggdes på 1500-talet av Gustav Vasa för att skydda Stockholm. Den stoppade faktiskt en dansk flotta 1612.',
  },

  // ─── GRINDA ──────────────────────────────────────────────────
  {
    slug: 'grinda',
    name: 'Grinda',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Skärgårdens hjärta — natur, värdshus och gästhamn mitt i skärgårdskorridoren.',
    description: [
      'Grinda kallas ibland för "skärgårdens hjärta" och det är svårt att argumentera emot. Ön ligger strategiskt mitt i den populäraste seglingskorridoren mot Sandhamn, har en välskött gästhamn och ett av skärgårdens mest omtyckta värdshus.',
      'Ön är bilfri och naturskönt med blandad skog, klippor och en lång strand. Grinda Wärdshus håller hög standard i köket och erbjuder boende i flera kategorier — från hotellrum till stugor och camping.',
      'Grinda fungerar utmärkt som tvånatters stopp på en längre seglingstur, men är också en perfekt endagsdestination med direktbåt från Stockholm. Lanthandeln vid nedre hamnen säljer proviant för vidare segling.',
    ],
    facts: {
      travel_time: '2 h med Waxholmsbåt från Strömkajen',
      character: 'Naturskönt, välskött, bra mat, populär gästhamn',
      season: 'Maj–September',
      best_for: 'Seglare, vandring, romantiska par, familjer',
    },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Markerade stigar runt hela ön. Klipporna i norr ger panoramautsikt mot skärgården.' },
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Uthyrning vid Wärdshuset. Paddla söder om ön mot de omgivande grunden.' },
      { icon: '🏊', name: 'Bad', desc: 'Grinda har flera fina badplatser, varav en sandstrand vid gästhamnen.' },
      { icon: '⛵', name: 'Segling', desc: 'Grinda Gästhamn är ett klassiskt stopp på Sandhamnsleden. Välutrustad med full service.' },
      { icon: '🌅', name: 'Solnedgångspromenaden', desc: 'Promenera till öns västra sida på kvällen för en av skärgårdens bästa solnedgångar.' },
    ],
    accommodation: [
      { name: 'Grinda Wärdshus Hotell', type: 'Hotell', desc: 'Hotellrum i fyra hus nära wärdshuset. Frukost ingår.' },
      { name: 'Grinda Sea Lodge', type: 'Stugor', desc: 'Enkelt och prisvärt boende vid vattnet.' },
      { name: 'Grinda Camping', type: 'Camping', desc: 'Tältplats på ön. Inga förhandsbokning — kom som du är.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2 h', desc: 'Direktlinje. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamnen tar emot alla. Boka el-plats i förväg.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Grinda Gästhamn (Hemviken)', desc: 'Välutrustad hamn med plats för 100+ båtar, bränsle och full service.', spots: 100, fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle', 'tvätt', 'wifi'] },
    ],
    restaurants: [
      { name: 'Grinda Wärdshus Restaurang', type: 'Restaurang', desc: 'Skärgårdens bästa kök i detta prissegment. Boka.', bookingUrl: 'https://www.bokabord.se/restaurang/grinda-wardshus', websiteUrl: 'https://grinda.se' },
      { name: 'Framfickan', type: 'Bistro', desc: 'Bryggbistro nedanför wärdshuset. Lunch i solen.' },
      { name: 'Grinda Lanthandel & Café', type: 'Café', desc: 'Frukost, fika och proviant vid nedre hamnen.' },
    ],
    tips: [
      'Framfickan på klipporna är bäst för lunch — boka bord från kl 10.',
      'Grinda Lanthandel är öppet från 8:00 och säljer nybakat bröd.',
      'Sjömacken vid hamnen har bra läge och bra service — fyll på om du ska vidare mot Sandhamn.',
      'Högsäsong: anlöp tidigt — gästhamnen fylls till 14:00 på sommardagar.',
    ],
    related: ['sandhamn', 'finnhamn', 'vaxholm'],
    tags: ['gästhamn', 'värdshus', 'natur', 'segling', 'romantik'],
    did_you_know: 'Stockholms stad köpte Grinda 1947 och drev en period barnkolonier och rekreationsverksamhet på ön. Idag är Grinda ett naturreservat som förvaltas av Skärgårdsstiftelsen — den stora jugendvillan vid hamnen ritades av arkitekt Ernst Stenhammar.',
  },

  // ─── FINNHAMN ────────────────────────────────────────────────
  {
    slug: 'finnhamn',
    name: 'Finnhamn',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Naturnära skärgårdsklassiker med vandrarhem, krog och trollsk skogsstämning.',
    description: [
      'Finnhamn är den av de klassiska skärgårdsöarna som kanske bäst behållit sin karaktär. Ingen bil, ingen stress — bara skog, klippor och havet. Ön drivs i stor utsträckning av en ideell förening och vandrarhemsverksamheten har en lång historia.',
      'Vattnet runt Finnhamn är blankt och klart. Hamnen är en naturlig vikskyddad hamn med plats för hundratals båtar. Krogen, takbaren och lanthandeln är samlingspunkterna sommartid.',
      'Finnhamn fungerar bra som dagsmål men belönar den som stannar — gärna ett par nätter. Kombinera med Söder Långholm och Paradisviken, som är bland skärgårdens finaste naturhamnar.',
    ],
    facts: {
      travel_time: '2,5 h med Waxholmsbåt från Strömkajen',
      character: 'Naturnärt, lugnt, genuint, bra för vandring',
      season: 'Maj–September (vandrarhem delvis öppet helår)',
      best_for: 'Vandring, naturupplevelse, seglare, budget-resenärer',
    },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Välmarkerade stigar på ön och de omgivande holmarna. Söder Långholm är ett must.' },
      { icon: '🛶', name: 'Kajak', desc: 'Paddla till omgivande öar och naturhamnar. Uthyrning finns vid vandrarhemet.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara och kalla vatten runt ön. Hoppa från klipporna norr om hamnen.' },
      { icon: '⛵', name: 'Segling', desc: 'Paradisviken och Söder Långholm är klassikerhamnar. Välskyddade och natursköna.' },
    ],
    accommodation: [
      { name: 'Finnhamns Vandrarhem', type: 'Vandrarhem', desc: 'Bo i 100 år gammal grosshandlarvilla. Flerbädds och tvåbäddsrum. Unikt och prisvärt.' },
      { name: 'Stugby Finnhamn', type: 'Stugor', desc: 'Pittoreska stugor vid vattnet för 2–6 personer. Boka tidigt.' },
      { name: 'Tältplats', type: 'Camping', desc: 'Enkla tältmöjligheter på ön. Fråga i lanthandeln.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2,5 h', desc: 'Direktlinje. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Ankra i Paradisviken (Djupfladen) eller förtöj i gästhamnen.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Djupfladen (Paradisviken)', desc: 'Naturhamn och gästhamn klassad som en av skärgårdens bästa. Skyddad och naturskönt.', spots: 80, fuel: false, service: ['vatten', 'sopor'] },
      { name: 'Vandrarhemsviken', desc: 'Hamn vid vandrarhemet med service.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Finnhamns Krog', type: 'Restaurang', desc: 'Samlingsplatsen vid hamnen. Enkel och bra mat.', bookingUrl: 'https://www.bokabord.se/restaurang/finnhamns-krog', websiteUrl: 'https://finnhamn.se' },
      { name: 'Takbaren', type: 'Bar', desc: 'Bar med panoramautsikt från vandrarhemsbyggnadens tak.' },
      { name: 'Ragnars kiosk', type: 'Kiosk', desc: 'Glassbod och enkla tilltugg vid bryggan.' },
      { name: 'Lanthandeln', type: 'Handel', desc: 'Proviant, kaffe och metmask. Allt du behöver.' },
    ],
    tips: [
      'Paradisviken (Djupfladen i sjökortet) är en av skärgårdens absolut finaste naturhamnar — anlöp tidigt.',
      'Söder Långholm en bit söder om ön är praktiskt taget öde men vacker.',
      'Vandrarhemet har en mysig stämning på kvällarna — mingla med seglare från hela Skandinavien.',
      'Ta med mat utifrån om du ska campa — sortimentet i lanthandeln är begränsat.',
    ],
    related: ['grinda', 'ingmarso', 'ljustero'],
    tags: ['vandrarhem', 'natur', 'vandring', 'segling', 'lugnt'],
    did_you_know: 'Finnhamn fick sitt namn av finska handelsmän som ankrade här på 1600-talet. "Hamn" för finnar alltså — inte en person som heter Finn.',
  },

  // ─── MÖJA ────────────────────────────────────────────────────
  {
    slug: 'moja',
    name: 'Möja',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'island',
    tagline: 'Bilfri och genuint lantlig — skärgårdens bäst bevarade hemlighet.',
    description: [
      'Möja är en av Stockholms skärgårds mest autentiska öar. Bilfri, lugn och med en genuint lantlig karaktär som saknar motstycke. Här bor ett par hundra permanentbor och sommartid dubbleras befolkningen — men det är inget som stör den stilla stämningen.',
      'Ön är tillräckligt stor för att ha en varierad geografi — skog, öppna fält, klippor och flera hamnar. Roland Svensson-museet och den vackra kyrkan är kulturella pärlor. Fisket är utmärkt och havsutsikterna ovanliga.',
      'Möja nås lättast från Stavsnäs och är ett naturligt stopp på en seglingstur mot Sandhamn eller Gällnö. Krogar och kaféer täcker grundbehoven utan att bli turistiga.',
    ],
    facts: {
      travel_time: '2 h från Stavsnäs med Waxholmsbåt',
      character: 'Bilfri, lantlig, genuint, lugnt',
      season: 'Maj–September',
      best_for: 'De som söker äkta skärgårdsliv utan turister',
    },
    activities: [
      { icon: '🎨', name: 'Roland Svensson-museet', desc: 'Museum tillägnat den kände Möja-konstnären. Litet men givande.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera mellan hamnarna och genom lantliga bymiljöer. Ingen brådska, inga turiststigar.' },
      { icon: '⛪', name: 'Möja kyrka', desc: 'Vacker liten kyrka med utsikt. Välskött och värd ett besök.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkt fiskevatten runt ön. Abborre och gädda i vikarna, havsöring utanför.' },
      { icon: '🛶', name: 'Kajak', desc: 'Paddla runt öns södra sida mot Gällnö och Svartsö.' },
    ],
    accommodation: [
      { name: 'Möja Logi', type: 'Stugor', desc: 'Enkla stugor och rum hos lokalbor. Fråga på Hamnbaren.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: '2 h', desc: 'Linje från Stavsnäs via Djurhamn och Nämdö.', icon: '⛴' },
      { method: 'Eigen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Förtöj i Möja Hamn (norra delen av ön).', icon: '⛵' },
    ],
    harbors: [
      { name: 'Möja Hamn', desc: 'Liten men välskyddad gästhamn på öns norra del.', spots: 40, fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Möja Hamnbar', type: 'Bar/Restaurang', desc: 'Samlingsplatsen vid hamnen. Mat och dryck i avslappnad stämning.' },
      { name: 'Jeppes', type: 'Restaurang', desc: 'Lokal favorit med husmanskost och sommarstämning.' },
      { name: 'Möja Bageri', type: 'Bageri', desc: 'Nybakt bröd och kaffe från 7:00. Morgonrutin för seglare.' },
      { name: 'Hamncafét', type: 'Café', desc: 'Enkelt café vid bryggan.' },
    ],
    tips: [
      'Möja är inte en plats att hasta igenom — stanna minst en natt för att förstå charmen.',
      'Roland Svensson-museet är ett av de bättre ömuseen i skärgården.',
      'Fyll på proviant i lanthandeln — det är långt till nästa butik om du ska vidare söderut.',
      'Paddla eller promenera till södra delen av ön för de bästa utsikterna.',
    ],
    related: ['sandhamn', 'gallno', 'finnhamn'],
    tags: ['bilfri', 'lantlig', 'genuint', 'lugnt', 'konstnär'],
    did_you_know: 'Möja är en av skärgårdens folkrikaste öar med eget mejeri, skola och bibliotek. Mejeriet gör en prisbelönt lagrad ost direkt på ön.',
  },

  // ─── FJÄDERHOLMARNA ──────────────────────────────────────────
  {
    slug: 'fjaderholmarna',
    name: 'Fjäderholmarna',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛴',
    tagline: '25 minuter från Strandvägen — närmaste skärgårdsupplevelsen från Stockholm.',
    description: [
      'Fjäderholmarna är det enklaste svaret på frågan "hur tar man sig snabbt ut i skärgården?". Bara 25 minuters båtresa från Strandvägen och du är på en ö med rökerier, restauranger, bryggerier och hantverk. Inga bilar, inga långpendlingar.',
      'Ögruppen består av fyra öar varav Stora Fjäderholmen är den besökta. Här finns bland annat Rökeriet — ett av Stockholms mest klassiska rökeri sedan 1980-talet — och Fjäderholmarnas Krog med en av stadens bästa terrasser.',
      'Fjäderholmarna passar alla — från barnfamiljer på dagstur till seglare som vill ha ett sista glas på vägen in mot stan. Säsongen är maj–september.',
    ],
    facts: {
      travel_time: '25 min med Cinderellabåtarna från Strandvägen',
      character: 'Nära stad, lättillgänglig, hög kvalitet',
      season: 'Maj–September',
      best_for: 'Dagstur, lunch, barnfamiljer, seglare på väg in mot stan',
    },
    activities: [
      { icon: '🍺', name: 'Fjäderholmarnas Bryggeri', desc: 'Hantverksöl direkt från tanken med Stockholms siluett i bakgrunden. En av stadens bästa uteserveringar.' },
      { icon: '🐟', name: 'Rökeriet', desc: 'Klassiskt rökeriet sedan 1980-talet. Rökt lax, sill och skaldjur av toppklass.' },
      { icon: '🛒', name: 'Hantverk & butiker', desc: 'Keramik, textil och skandinaviskt hantverk i de gamla sjöbodarna.' },
      { icon: '🧒', name: 'Klätterbåt & barnlek', desc: 'Klassisk lekplats vid stranden. Perfekt för barnfamiljer.' },
      { icon: '🚶', name: 'Promenad runt ön', desc: 'Promenera runt hela Stora Fjäderholmen på 30 minuter.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Cinderellabåtarna', from: 'Strandvägen / Nybroplan', time: '25 min', desc: 'Avgår varje timme sommartid. Enkelt och billigt.', icon: '⛴' },
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '30 min', desc: 'Ingår i SL-kort.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästplatser finns vid öns södra brygga.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Fjäderholmarnas Gästbrygga', desc: 'Kortare förtöjningsplatser för passager. Inga längre övernattningar.', fuel: false, service: ['toilet'] },
    ],
    restaurants: [
      { name: 'Fjäderholmarnas Krog', type: 'Restaurang', desc: 'Stor terrass, vällagad mat, direktbåt från stan. Boka i förväg.' },
      { name: 'Rökeriet Fjäderholmarna', type: 'Restaurang', desc: 'Klassiskt rökeriet sedan 80-talet. Rökt lax och sill i toppklass.' },
      { name: 'Fjäderholmarnas Bryggeri', type: 'Bar', desc: 'Hantverksöl med Stockholms siluett. Kväll och solnedgång.' },
      { name: 'The Old Smokehouse', type: 'Restaurang', desc: 'Rökt fisk och skaldjur take-away vid bryggan.' },
    ],
    tips: [
      'Ta morgonbåten och ha lunch — köerna till Fjäderholmarnas Krog är kortast 11:30.',
      'Rökeriet är öppet från april till oktober — passa på innan säsongen tar slut.',
      'Bryggeriets uteservering är bäst för sundowner runt 19:00.',
      'Sista båten tillbaka till stan avgår ca 21:00 — kolla tidtabell.',
    ],
    related: ['vaxholm', 'grinda', 'bockholmen'],
    tags: ['nära stan', 'dagstur', 'rökeriet', 'öl', 'mat'],
    did_you_know: 'Fjäderholmarna är Stockholms närmaste skärgårdsöar och nås på bara 25 minuter. 1940 införde militären landstigningsförbud — öarna användes som ammunitionsförråd under andra världskriget. Förbudet upphävdes inte förrän 1985, då restaurangerna och rökeriet kunde öppna.',
  },

  // ─── LJUSTERÖ ─────────────────────────────────────────────────
  {
    slug: 'ljustero',
    name: 'Ljusterö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌊',
    tagline: 'Stor bilfärjebetjänad ö med lång kustlinje och utmärkta kajakvatten.',
    description: [
      'Ljusterö är en av de större öarna i Stockholms skärgård och en av de mest lättillgängliga — bilfärja avgår regelbundet från Ljusteröfärjan. Det gör ön populär för cykling och kajakpaddling, och det finns ett brett utbud av service längs kusten.',
      'Kustlinjen sträcker sig mil efter mil och bjuder på varierade miljöer — grunda vikar, öppna klippor och skyddade naturhamnar. Klintan är öns bästa sydläge och ett populärt seglarankare.',
      'Ljusterö saknar en enda stor destination men kompenserar med mångfald: flera restauranger, kaféer och kiosker är spridda längs öns vägnät.',
    ],
    facts: {
      travel_time: '60 min med buss och bilfärja från Stockholm',
      character: 'Bred och mångfacetterad, bilfärja, cykling',
      season: 'April–Oktober',
      best_for: 'Cykling, kajakpaddling, bilburna besökare, naturupplevelse',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Välcyklade vägar längs kusten. Hyr cykel vid färjeläget.' },
      { icon: '🛶', name: 'Kajak', desc: 'Klintsundet och den norra kustlinjen är utmärkta paddlingvatten.' },
      { icon: '🏊', name: 'Bad', desc: 'Flera badplatser, varav Linanäsbryggan är mest känd.' },
      { icon: '⛽', name: 'Sjömack', desc: 'Klintan har sjömack — ett av skärgårdens välplacerade bränslestopp.' },
    ],
    accommodation: [
      { name: 'Stugor & B&B', type: 'Stugor', desc: 'Flera privata uthyrare längs öns vägar. Sök online.' },
    ],
    getting_there: [
      { method: 'Buss + Bilfärja', from: 'Danderyds sjukhus', time: '60 min', desc: 'Buss 621 från Danderyds sjukhus till Östanå färjeläge, sedan avgiftsfri bilfärja Östanå–Ljusterö (7 min). Buss 626 går vidare på ön.', icon: '🚌' },
      { method: 'Bil + Färja', from: 'Stockholm', time: '50 min', desc: 'Kör till Östanå färjeläge norr om Åkersberga, ta avgiftsfri bilfärja över till Ljusterö (Ljusteröleden, ca 7 min).', icon: '🚗' },
      { method: 'Waxholmsbåt', from: 'Strömkajen / Vaxholm', time: 'Varierar', desc: 'Skärgårdsbåtar trafikerar bryggor som Linanäs, Grundvik, Åsättra m.fl.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Klintan', desc: 'Välbesökt hamn med bränsle och service.', fuel: true, service: ['el', 'vatten', 'bränsle', 'dusch'] },
      { name: 'Linanäsbryggan', desc: 'Naturskönt läge, populärt ankare.', fuel: false },
    ],
    restaurants: [
      { name: 'Linanäsbryggan', type: 'Restaurang', desc: 'Klassisk brygga med mat och utsikt.' },
      { name: 'Klintan Sjöstation', type: 'Service/Café', desc: 'Bränsle, kaffe och enkla tilltugg.' },
      { name: 'Pizzeria Ljusterö', type: 'Restaurang', desc: 'Lokalbefolkningens val — avslappnat och bra.' },
    ],
    tips: [
      'Hyr cykel vid färjeläget och kör norrut längs kusten mot Linanäs.',
      'Klintan är ett utmärkt bränslestopp på väg mot norra skärgården.',
      'Åsättra sommarkiosk längs vägen säljer glass och kaffe — enkel glädje.',
    ],
    related: ['finnhamn', 'ingmarso', 'blido'],
    tags: ['cykling', 'kajak', 'bilfärja', 'kustlinje', 'familj'],
    did_you_know: 'Ljusterö är den största ön i Stockholms skärgård som saknar fast brobindelse — i stället går avgiftsfria bilfärjan Ljusteröleden mellan Östanå och Ljusterö hela året, ca 7 minuter över sundet.',
  },

  // ─── DALARÖ ──────────────────────────────────────────────────
  {
    slug: 'dalaro',
    name: 'Dalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: 'anchor',
    tagline: 'Södra skärgårdens klassiska utgångspunkt — historia, hamn och direktbuss från Stockholm.',
    description: [
      'Dalarö är södra skärgårdens naturliga utgångspunkt — och en av de mest betydelsefulla platserna i svensk sjöfartshistoria. 1636 blev Dalarö "stora sjötullen", det vill säga landets viktigaste tullstation, där all sjöburen handel in till Stockholm skulle deklareras och förtullas. Den rollen behöll orten i drygt 200 år.',
      'Dalarö skans påbörjades 1656 av Johan Peter Kirstenius på uppdrag av Karl X Gustav — för att skydda de tullavgiftsbärande handelsfartygen som låg i hamn. Erik Dahlberg inspekterade anläggningen 1683 och fann den förfallen. Skansen togs ur rikets fasta försvar 1854 och är sedan 1935 statligt byggnadsminne.',
      'Dalarö nås med bil på 45 minuter från Stockholm eller med kollektivtrafik. Det gör orten unik bland södra destinationerna — man behöver inte ta båt för att komma hit. Från Dalarö hamn avgår sedan båtar mot Utö och de omgivande öarna. Hamnlivet är aktivt sommartid med seglare, motorbåtar och sommargäster, och bebyggelsen längs kajen är präglad av 1800-talets sjökaptens- och tjänstemannavillor.',
    ],
    facts: {
      travel_time: '45 min med bil / 90 min med kollektivtrafik',
      character: 'Historisk hamnort, utgångspunkt, välskött',
      season: 'April–Oktober',
      best_for: 'Dagsturer, hamnliv, utgångspunkt mot Utö och södern',
    },
    activities: [
      { icon: '🏰', name: 'Dalarö skans', desc: 'Fortifikation påbörjad 1656 under Karl X Gustav. Statligt byggnadsminne sedan 1935 — idag festvåning och visningsplats.' },
      { icon: '⛵', name: 'Utgångspunkt mot Utö', desc: 'Ta pendelbåt till Utö och de södra öarna direkt från Dalarö hamn.' },
      { icon: '🎣', name: 'Fiske', desc: 'Välkänt fiskevatten i Baggensfjärden och utanför Dalarö.' },
      { icon: '🚶', name: 'Dalarö Museum', desc: 'Liten men intressant utställning om ortens maritima historia.' },
    ],
    accommodation: [
      { name: 'Dalarö Värdshus', type: 'Hotell', desc: 'Historiskt värdshus med restaurang och havsutsikt.' },
      { name: 'Smådalarö Gård', type: 'Hotell', desc: 'Spa-hotell utanför orten — pool och naturläge.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: '45 min', desc: 'Kör E4 söderut och följ skyltning mot Haninge och Dalarö.', icon: '🚗' },
      { method: 'Pendeltåg + Buss', from: 'Stockholm Central', time: '90 min', desc: 'Pendeltåg till Handen, sedan buss 834 till Dalarö.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Dalarö Gästhamn', desc: 'Välskött hamn med full service. Bra utgångspunkt för vidare segling söderut.', spots: 60, fuel: false, service: ['el', 'vatten', 'dusch', 'toilet'] },
    ],
    restaurants: [
      { name: 'Dalarö Krog', type: 'Restaurang', desc: 'Klassisk hamn­krog med husmanskost och räkor.' },
      { name: 'Dalarö Värdshus', type: 'Restaurang', desc: 'Anrikt värdshus med god mat och historia.' },
      { name: 'Dalarö Bageri & Café', type: 'Bageri', desc: 'Morgonkaffet och nybakade bullar.' },
    ],
    tips: [
      'Dalarö Skans är ett underskattat besök — lägg 1 timme och du lär dig södra skärgårdens historia.',
      'Parkera vid hamnen tidigt på sommaren — det tar slut snabbt.',
      'Ta pendelbåten vidare till Utö om du vill kombinera.',
    ],
    related: ['uto', 'nattaro', 'orno'],
    tags: ['historia', 'hamn', 'utgångspunkt', 'södern', 'fortet'],
    did_you_know: 'Dalarö blev 1636 platsen för "stora sjötullen" — landets viktigaste tullstation under stormaktstiden. Alla handelsfartyg på väg in till Stockholm var tvungna att förtullas här. Tullhuset från 1788 står fortfarande kvar vid hamnen.',
  },

  // ─── ARHOLMA ─────────────────────────────────────────────────
  {
    slug: 'arholma',
    name: 'Arholma',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Norra skärgårdens yttersta förpost — orört, vidsträckt och riktigt långt bort.',
    description: [
      'Arholma är nästan längst norrut man kan komma i Stockholms skärgård. Dit åker man med en intention — man är inte på väg förbi. Ön är vild, öppen och vidsträckt med starka vindar och havsutsikt som tar andan ur en.',
      'Arholma sjömack och krog är samlingsplatsen för seglare på väg norrut eller sydöst. Ön är en klassisk stopplats på Roslagsbåtarnas linjer och har haft fast befolkning sedan urminnes tider.',
      'Naturen är extrem på ett positivt sätt — klippor som möter öppet hav, ingen annan ö att skymma vyn österut. Det är norra skärgårdens Landsort.',
    ],
    facts: {
      travel_time: '3,5–4 h med Waxholmsbåt från Norrtälje / 5 h från Stockholm',
      character: 'Vilt, orört, ytterst, äventyrligt',
      season: 'Maj–September',
      best_for: 'Äventyrliga seglare, naturälskare, de som söker ensamt',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Arholma är ett klassiskt mål och genomfart på längre seglingsresor norrut.' },
      { icon: '🌅', name: 'Naturupplevelse', desc: 'Klippor mot öppet hav, lång horisont och inga grannar. Sällan uppnådd natur.' },
      { icon: '🚲', name: 'Cykling', desc: 'Arholma Handel hyr ut cyklar för rundturer på ön.' },
    ],
    accommodation: [
      { name: 'Arholma Handel Stugor', type: 'Stugor', desc: 'Enkla stugor uthyrda av handelsboden.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Norrtälje', time: '3,5 h', desc: 'Lång men vacker resa norrut längs Roslagen.', icon: '⛴' },
      { method: 'Bil + passagerarfärja', from: 'Stockholm via Simpnäs', time: '2,5 h', desc: 'Kör till Simpnäs (på Björkö, norra Roslagen) — ca 90 min — sedan passagerarfärja Simpnäs–Arholma (ca 15 min, ingen bilfärja).', icon: '🚗' },
    ],
    harbors: [
      { name: 'Arholma Gästhamn', desc: 'Välskyddad hamn på öns södra sida. Bränsle och viss service.', spots: 60, fuel: true, service: ['el', 'vatten', 'bränsle'] },
    ],
    restaurants: [
      { name: 'Arholma Dansbana & Krog', type: 'Restaurang', desc: 'Öns krog och samlingspunkt. Enkel mat och sommarnöje.' },
      { name: 'Arholma Hamnkrog', type: 'Restaurang', desc: 'Hamnkrogen för seglare vid gästhamnen.' },
    ],
    tips: [
      'Planera resan i förväg — Arholma är inget man bara åker till på en dag utan planering.',
      'Vädret kan vara hårt — kolla prognosen noggrant om du tar ut en liten båt.',
      'Arholma Handel är öns livlina — de säljer allt du behöver för segling och övernattning.',
    ],
    related: ['blido', 'furusund', 'norrora'],
    tags: ['ytterst', 'orört', 'norra', 'vilt', 'segling'],
    did_you_know: 'Arholma är en av Stockholms skärgårds nordligaste bebodda öar och har varit lotsplats sedan 1500-talet. Ön har ingen bilfärja — endast passagerarfärja från Simpnäs (Björkö) på fastlandet, ca 15 minuter över sundet.',
  },

  // ─── ORNÖ ─────────────────────────────────────────────────────
  {
    slug: 'orno',
    name: 'Ornö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌲',
    tagline: 'Södra skärgårdens största skogsö — vandring, naturreservat och genuint ösliv.',
    description: [
      'Ornö är en av Stockholms skärgårds största öar och en av de mest naturrika. Stora delar av ön skyddas som naturreservat med gammal skog, bäckar och ett rikt fågelliv. Befolkningen är liten men permanent, och ön har behållit sin lantliga karaktär.',
      'Till skillnad från de mer turistifierade öarna i mellersta skärgården har Ornö ett lite tystare tempo. Här åker man för naturens skull, inte för nöjeslivet. Vandringsstigarna är välmarkerade och tar dig genom skog och längs kustlinje.',
      'Kyrkviken är öns naturliga samlingsplats med krog och hamn. Från Ornö är Utö och Nåttarö enkla dagsutflykter med båt.',
    ],
    facts: {
      travel_time: '2 h med pendelbåt från Nynäshamn',
      character: 'Naturskönt, skogsrikt, tyst, genuint',
      season: 'Maj–September',
      best_for: 'Naturälskare, vandring, de som söker lugn',
    },
    activities: [
      { icon: '🚶', name: 'Vandring i naturreservat', desc: 'Välmarkerade leder genom gammal skog. 2–5 timmars vandring beroende på längd.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Ornö är känt för sitt rika fågelliv, särskilt under vår- och höstflytt.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent vatten och fina klippor längs kusten.' },
    ],
    accommodation: [
      { name: 'Stugor privat', type: 'Stugor', desc: 'Privatpersoner hyr ut stugor sommartid. Sök online.' },
    ],
    getting_there: [
      { method: 'Pendelbåt', from: 'Nynäshamn', time: '2 h', desc: 'Skärgårdslinjen söderut.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Kyrkviken', desc: 'Öns huvudhamn med krog och enkla tjänster.', spots: 30, fuel: false },
    ],
    restaurants: [
      { name: 'Kyrkviken Bar & Bistro', type: 'Restaurang', desc: 'Öns samlingsplats. Husmanskost och sommarstämning.' },
      { name: 'Ornö Brödbod o Deli', type: 'Deli', desc: 'Bröd, lokalproducerat och enkel mat.' },
    ],
    tips: [
      'Vandringen i naturreservatet i öns centrala del är bättre än man förväntar sig.',
      'Ta med matkasse — utbudet av restauranger är begränsat.',
      'Kombination med Utö fungerar bra — ta dagen på Ornö och kvällen på Utö.',
    ],
    related: ['uto', 'nattaro', 'dalaro'],
    tags: ['natur', 'vandring', 'skog', 'fåglar', 'lugnt'],
    did_you_know: 'Ornö är en av Stockholms läns till ytan största öar utan fast vägförbindelse. Postbåten kör än idag tre gånger i veckan.',
  },

  // ─── LANDSORT ────────────────────────────────────────────────
  {
    slug: 'landsort',
    name: 'Landsort',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    tagline: 'Skärgårdens sydligaste punkt — fyr, klippor och havet på alla sidor.',
    description: [
      'Landsort är Stockholms skärgårds sydligaste bebodda utpost och en av de mest dramatiska öarna. Öja (öns officiella namn) och Landsort längst söderut är omgivna av öppet hav på tre sidor — utsikterna mot Östersjön är oöverträffade.',
      'Fyren på Landsort är en av de äldsta i Sverige och är det naturliga målet för alla som besöker ön. Saltboden säljer skafferivaror och mat för de som ankrar. Det är en plats som belönar den som tar sig dit.',
      'Landsort är inte för den hastvärksresenären. Det är en destination i sig — man planerar en tur HIT, inte förbi hit. Vattnet är öppet och vindarna kan vara kraftiga.',
    ],
    facts: {
      travel_time: '4 h med snabbåt från Nynäshamn / 5 h med pendelbåt',
      character: 'Ytterst, dramatiskt, havsexponenat, genuint',
      season: 'Juni–Augusti (begränsad service)',
      best_for: 'Erfarna seglare, äventyrare, fyr-entusiaster',
    },
    activities: [
      { icon: '🗼', name: 'Landsorts fyr', desc: 'En av Sveriges äldsta fyrar med utsikt mot öppet Östersjön. Guidade turer sommartid.' },
      { icon: '🌊', name: 'Havsutsikter', desc: 'Stå på klipporna och titta österut — ingen ö skymmer horisonten. Omöjligt att fotografera dåligt.' },
      { icon: '🐦', name: 'Fågelstation', desc: 'Landsort är en av de viktigaste observationsplatserna för sträckande fåglar i Sverige.' },
    ],
    accommodation: [
      { name: 'Stugor vid fyren', type: 'Stugor', desc: 'Begränsat antal stugor nära fyren. Boka långt i förväg.' },
    ],
    getting_there: [
      { method: 'Snabbåt', from: 'Nynäshamn', time: '4 h', desc: 'Säsongstrafik sommartid.', icon: '🚤' },
      { method: 'Egen båt', from: 'Nynäshamn/Utö', time: 'Varierar', desc: 'Planera noggrant med väderprognoser — öppet hav.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Landsort Hamn', desc: 'Liten hamn på öns norra sida. Begränsat antal platser.', spots: 20, fuel: false },
    ],
    restaurants: [
      { name: 'Saltboden Kök & Proviant', type: 'Handel/Restaurang', desc: 'Öns enda matplats. Enkel mat och proviant.' },
      { name: 'Landsort Hamncafé', type: 'Café', desc: 'Kaffe och smörgåsar vid hamnen.' },
    ],
    tips: [
      'Kolla väderprognosen NOGGRANT — Landsort är exponerat för öppet hav.',
      'Fågelstationen vid fyren är en unik upplevelse under sträcktider (april-maj och aug-okt).',
      'Ta med mat — Saltboden stänger tidigt och variationen är begränsad.',
    ],
    related: ['uto', 'dalaro', 'nattaro'],
    tags: ['fyr', 'ytterst', 'dramatiskt', 'hav', 'fåglar'],
    did_you_know: 'Landsorts fyr är Sveriges äldsta bevarade fyr — Johan van der Hagen fick kungligt privilegium 1669, den första fyrlyktan tändes 1671 och nuvarande stenfyr restes 1672. Landsort är Stockholms skärgårds sydligaste bebodda utpost (Sveriges sydligaste fastlandspunkt är Smygehuk i Skåne).',
  },

  // ─── FURUSUND ────────────────────────────────────────────────
  {
    slug: 'furusund',
    name: 'Furusund',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌲',
    tagline: 'Klassisk seglingspassage i norra skärgården med värdshus och sjömack.',
    description: [
      'Furusund är en klassisk passage i norra skärgården känd för sitt starka tidvatten och sin kulturhistoria. Sundet är nästan obligatoriskt för alla som seglar norrut och erbjuder möjligheter för både äventyr och lugn.',
      'Furusund Värdshus är det naturliga stoppet — ett historiskt värdshus med restaurang som tjänat seglare i generationer. August Strindberg tillbringade fyra somrar här kring sekelskiftet 1900 (1899–1903), men det var på Kymmendö han fick idén till "Hemsöborna". Naturmässigt är passagen dramatisk med klippor på båda sidor.',
      'Furusund passar perfekt för seglare på väg norrut, eller för någon som söker en blandning av seglingsäventyr och historisk kultur i norra skärgården.'
    ],

    facts: {
      travel_time: '2 h med bil från Stockholm / 4 h med Waxholmsbåt',
      character: 'Lugnt, naturskönt, historiskt, seglingstradition',
      season: 'Maj–September',
      best_for: 'Seglare, romantik, Strindberg-intresserade',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Furusund är en klassisk passage och etappstopp på norrlandsresorna.' },
      { icon: '📚', name: 'Strindbergs-turism', desc: 'August Strindberg bodde och skrev här. Platsen bär hans historia.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad längs sundet och på de omgivande holmarna.' },
    ],
    accommodation: [
      { name: 'Furusund Värdshus', type: 'Hotell', desc: 'Anrikt värdshus med restaurang och havsutsikt.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Norrtälje', time: '2 h', desc: 'Kör E18 mot Norrtälje och följ skylt mot Furusund.', icon: '🚗' },
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '4 h', desc: 'Lång men vacker resa norrut.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Furusund Hamn', desc: 'Välplacerad hamn vid sundet. Bränsle och service.', spots: 40, fuel: true, service: ['el', 'vatten', 'bränsle'] },
    ],
    restaurants: [
      { name: 'Furusund Värdshus', type: 'Restaurang', desc: 'Öns klassiska krog. God mat i historisk miljö.' },
    ],
    tips: [
      'Strömmen i Furusund är stark vid tidvattensväxling — kolla tidvatten om du seglar igenom.',
      'Värdshuset är bäst för middag — boka i förväg under högsäsong.',
    ],
    related: ['blido', 'arholma', 'norrora'],
    tags: ['segling', 'Strindberg', 'norra', 'passage', 'historia'],
    did_you_know: 'Furusund var på 1800-talet ett av Stockholms läns mest populära sommarutflyktsställen. August Strindberg tillbringade flera somrar här och lät sig inspireras av ön.',
  },

  // ─── BLIDÖ ────────────────────────────────────────────────────
  {
    slug: 'blido',
    name: 'Blidö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌿',
    tagline: 'Lugn ö i norra skärgården med äkta landsbygdskänsla.',
    description: [
      'Blidö är en av de större öarna i norra skärgården och ett populärt resmål för dem som söker lugn och naturupplevelse. Ön nås enkelt med bilfärja från Vätö och erbjuder en blandning av permanentboende och sommargäster som skapar en levande men inte överbelastad miljö.',
      'Naturmässigt är Blidö varierad med skog, öppna åkrar och en lång, kuperad kustlinje. Blidö Brygga & Bistro är det naturliga samlingsplatsen för båtfolk, medan cykelleder slingrar sig längs vägar och stränder. Klimatet är mild nordskärgård — inte lika exponerat som Arholma men långt mer orört än mellersta öarna.',
      'Blidö passar perfekt som del av en längre norra skärgårdstur eller som destination för den som söker autentisk skärgård utan chaos. Många återvändande sommargäster hyr stugor årligt och bidrar till öns lugnare karaktär.'
    ],

    facts: {
      travel_time: '2 h med bil och bilfärja',
      character: 'Lugnt, lantligt, äkta norrskärgård',
      season: 'Maj–September',
      best_for: 'Lugn, cykling, naturskönt',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs öns vägar och vid kusten.' },
      { icon: '🏊', name: 'Bad', desc: 'Fina badplatser längs kusten.' },
    ],
    accommodation: [
      { name: 'Stugor & privat', type: 'Stugor', desc: 'Privatuthyrning på ön. Sök online.' },
    ],
    getting_there: [
      { method: 'Bil + Bilfärja', from: 'Norrtälje', time: '45 min', desc: 'Kör till Vätö, ta bilfärja till Blidö.', icon: '🚗' },
    ],
    harbors: [{ name: 'Blidö Brygga', desc: 'Enkel gästbrygga vid bistron.', fuel: false }],
    restaurants: [
      { name: 'Blidö Brygga & Bistro', type: 'Restaurang', desc: 'Öns samlingspunkt vid bryggan.' },
      { name: 'Blidö Värdshus', type: 'Restaurang', desc: 'Klassiskt värdshus på ön.' },
    ],
    tips: ['Blidö passar bäst som del av en längre norra skärgårdstur.'],
    related: ['furusund', 'arholma', 'norrora'],
    tags: ['lugnt', 'norra', 'bilfärja', 'lantligt'],
    did_you_know: 'Blidö omnämns i medeltida dokument som "Blidhe" och var en viktig plats för fiske och vedhugning redan på 1300-talet.',
  },

  // ─── GÄLLNÖ ──────────────────────────────────────────────────
  {
    slug: 'gallno',
    name: 'Gällnö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Bilfri naturreservatstö med lägerverksamhet och enkel skärgårdsstämning.',
    description: [
      'Gällnö är en bilfri ö i mellersta skärgården, klassificerad som naturreservat för att bevara dess orörda karaktär. Ön är känd för sin lägerverksamhet — ungdomsgrupper och naturskolor nyttjar öns större öppna arealer under sommaren.',
      'Landskap på Gällnö varierar från skogspartier till öppna ljunghedar. Här finns inga stora restauranger eller hotell — bara en enkel bar och handelsbod. Det är just detta som gör Gällnö attraktiv för naturälskare som söker lugn och orördhet.',
      'Ön nås via Waxholmsbåt från Stavsnäs och är ett naturligt stopp på väg mot Möja eller Svartsö. Många seglare gör Gällnö till sitt favoritdestination.'
    ],

    facts: {
      travel_time: '2 h från Stavsnäs med Waxholmsbåt',
      character: 'Bilfri, naturreservat, lugnt',
      season: 'Juni–Augusti',
      best_for: 'Natur, läger, orördhet',
    },
    activities: [
      { icon: '🏕', name: 'Lägerverksamhet', desc: 'Gällnö har lång tradition av ungdomsläger och naturvistelse.' },
      { icon: '🚶', name: 'Vandring', desc: 'Välmarkerade leder i naturreservat.' },
    ],
    accommodation: [
      { name: 'Tältplatser', type: 'Camping', desc: 'Enkla tältmöjligheter på ön.' },
    ],
    getting_there: [{ method: 'Waxholmsbåt', from: 'Stavsnäs', time: '2 h', desc: 'Linje via Möja och Nämdö.', icon: '⛴' }],
    harbors: [{ name: 'Gällnö Hamn', desc: 'Liten naturhamn.', fuel: false }],
    restaurants: [
      { name: 'Gällnö Bar', type: 'Bar', desc: 'Enkel bar vid hamnen.' },
      { name: 'Gällnö Handelsbod', type: 'Handel', desc: 'Proviant och enkla drycker.' },
    ],
    tips: ['Ta med mat — restaurangutbudet är mycket begränsat.'],
    related: ['moja', 'svartso', 'ingmarso'],
    tags: ['bilfri', 'naturreservat', 'läger', 'orört'],
    did_you_know: 'Gällnö är ett av skärgårdens bäst bevarade kulturlandskap med ängar som hålls öppna med betande djur precis som för hundratals år sedan.',
  },

  // ─── NORRÖRA ─────────────────────────────────────────────────
  {
    slug: 'norrora',
    name: 'Norröra',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Familjens skärgård — känd som "Saltkråkan" i Astrid Lindgrens TV-serie och Tjorven-filmerna.',
    description: [
      'Norröra är en liten, lugn ö i norra skärgården, mest känd som inspelningsplats för Astrid Lindgrens "Vi på Saltkråkan" (inspelad sommaren 1963, TV-premiär 18 januari 1964) och de fyra Tjorven-filmerna som följde. Inspelningarna gjordes huvudsakligen på Norröra och grannön Söderöra. Många generationer svenska barnfamiljer har växt upp med bilderna från ön.',
      'Ön är perfekt för barnfamiljer — tillräckligt stor för att erbjuda något för var smak men inte så stor att barnen tröttnar. Naturliga badplatser längs kusten och möjligheter till klippklättring gör det enkelt att tillbringa en heldag här.',
      'Norröra passar ofta bäst som kombination med en tur till närliggande öar som Fejan eller Arholma, men kan också fungera som självständig destination för ett lugnt övernattningsäventyr.'
    ],

    facts: {
      travel_time: '3 h med Waxholmsbåt',
      character: 'Lugnt, familjevänligt, litet',
      season: 'Juni–Augusti',
      best_for: 'Barnfamiljer, Astrid Lindgren-fans',
    },
    activities: [
      { icon: '📚', name: 'Saltkråkan-platser', desc: 'Se inspelningsplatserna för "Vi på Saltkråkan" och Tjorven-filmerna.' },
      { icon: '🏊', name: 'Bad', desc: 'Badplatser längs kusten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Waxholmsbåt', from: 'Norrtälje', time: '3 h', desc: 'Norra linjen.', icon: '⛴' }],
    harbors: [{ name: 'Norröra Hamn', desc: 'Liten hamn.', fuel: false }],
    restaurants: [{ name: 'Norröra Krog', type: 'Restaurang', desc: 'Öns lilla krog.' }],
    tips: ['Norröra är bäst kombinerat med en tur till Fejan eller Arholma.'],
    related: ['arholma', 'blido', 'furusund'],
    tags: ['familj', 'Saltkråkan', 'norra', 'lugnt'],
    did_you_know: '"Vi på Saltkråkan" är den enda av Astrid Lindgrens berättelser som skrevs direkt för TV — TV-serien spelades in på Norröra och Söderöra sommaren 1963 och hade premiär 18 januari 1964. Boken kom samma år och är skriven utifrån manuset, inte tvärtom.',
  },

  // ─── NÅTTARÖ ─────────────────────────────────────────────────
  {
    slug: 'nattaro',
    name: 'Nåttarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    tagline: 'Naturreservat i södra skärgården — klippor, lugn och äkta ytterskärgård.',
    description: [
      'Nåttarö är ett naturreservat i södra skärgården med vacker och vild natur. Ön är ett populärt ankringsläge för erfarna seglare som söker lugn och orördhet.',
      'Naturreservatet skyddas för att bevara den rika biologiska mångfalden och det unika klippekosystemet. Vandringsstigar leder förbi blockhudar, öppna klippor och små naturhamnar. Klippbaden är rent och invitande.',
      'Nåttarö kräver egen båt och är bäst kombinerat med en längre seglingstur i södra skärgården. Det är en ö för dem som redan är ute på havet.'
    ],

    facts: {
      travel_time: '3 h från Nynäshamn',
      character: 'Vilt, naturreservat, orört',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturupplevelse',
    },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Vandringsstigar i naturreservat.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent vatten och fina klippor.' },
    ],
    accommodation: [{ name: 'Ankring', type: 'Gästhamn', desc: 'Ankra i skyddade vikar.' }],
    getting_there: [{ method: 'Eigen båt', from: 'Utö/Dalarö', time: 'Varierar', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Nåttarö Naturhamn', desc: 'Skyddad naturhamn.', fuel: false }],
    restaurants: [{ name: 'Nåttarö Krog', type: 'Restaurang', desc: 'Öns enda krog. Enkel husmanskost.' }],
    tips: ['Nåttarö kräver egen båt — ingen reguljärtrafik.'],
    related: ['uto', 'orno', 'landsort'],
    tags: ['naturreservat', 'orört', 'segling', 'södra'],
    did_you_know: 'Nattarö naturreservat skyddar ett av Stockholms läns finaste havsörnsrevir. Det bor fler havsörnar än människor på ön.',
  },

  // ─── INGMARSÖ ────────────────────────────────────────────────
  {
    slug: 'ingmarso',
    name: 'Ingmarsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Bilfri ö i mellersta skärgården — bageri, krog och Båtluffarleden mot Finnhamn.',
    description: [
      'Ingmarsö är en bilfri ö i Stockholms mellersta skärgård, klassisk knutpunkt för båtluffare och vandrare. Ön har två bryggor — norra och södra — där Waxholmsbåtarna lägger till. På öns mitt finns lanthandel, bageri, krog och B&B.',
      'Båtluffarleden — markerad i blått — förbinder Ingmarsö med Finnhamn via Kålgårdsön; vid det smala sundet mellan öarna finns roddbåtar som gångare själva drar över för att fortsätta vandringen. Det gör sträckan till en av de mest älskade etapperna på Stockholm Archipelago Trail.',
      'Ingmarsö passar för dagsutflykter med båtluffning, vandring genom öppna betesmarker och blandskog, eller som lugnare bas än Finnhamn för en längre helg i mellersta skärgården.',
    ],

    facts: {
      travel_time: '2,5 h med Waxholmsbåt från Strömkajen',
      character: 'Bilfri, vandringsmål, helårsverksamhet',
      season: 'Maj–September (lanthandeln öppen helår)',
      best_for: 'Båtluffare, vandrare, dagsutflykter, lugn skärgård',
    },
    activities: [
      { icon: '🥾', name: 'Båtluffarleden mot Finnhamn', desc: 'Markerad blå led via Kålgårdsön — egen roddbåt över sundet till Finnhamn. En av Stockholm Archipelago Trails mest unika etapper.' },
      { icon: '🍞', name: 'Ingmarsö Bageri', desc: 'Öns bageri vid bryggan — nybakat bröd och kaffe.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Fina klippbad längs öns norra och östra sida.' },
      { icon: '🚶', name: 'Vandring', desc: 'Stigar genom öppet betesmarkslandskap och blandskog. Stockholm Archipelago Trail-etappen är väl markerad.' },
    ],
    accommodation: [
      { name: 'Ingmarsö B&B', type: 'B&B', desc: 'B&B-boende med bastu i ö-miljö.' },
      { name: 'Privatstugor', type: 'Stugor', desc: 'Sommarstugor uthyrda av lokalbor. Sök via Blocket eller Airbnb.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2,5 h', desc: 'Skärgårdslinjen mot Möja angör norra och södra Ingmarsö.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Ingmarsö Gästhamn', desc: 'Enkel men fungerande gästhamn vid södra bryggan.', spots: 25, fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Ingmarsö Krog', type: 'Restaurang', desc: 'Öns krog — säsongsbaserad meny i skärgårdsmiljö.' },
      { name: 'Ingmarsö Bageri', type: 'Bageri', desc: 'Nybakat bröd, fika och enkla bryggluncher.' },
      { name: 'Ingmarsö Lanthandel', type: 'Handel', desc: 'Dagligvaror — öppen året om.' },
    ],
    tips: [
      'Båtluffarleden mellan Ingmarsö och Finnhamn med roddbåt över sundet är ett klassiskt skärgårdsäventyr — ta hela dagen.',
      'Två bryggor — norra och södra — kontrollera tidtabellen för rätt brygga.',
      'Kombinera gärna med Finnhamn på samma weekend.',
    ],
    related: ['finnhamn', 'svartso', 'ljustero'],
    tags: ['bilfri', 'båtluffarleden', 'vandring', 'natur', 'mellersta'],
    did_you_know: 'Båtluffarleden mellan Ingmarsö och Finnhamn är en av Stockholms skärgårds mest karakteristiska vandringsetapper — vid det smala sundet mellan Kålgårdsön och Finnhamn finns roddbåtar som vandrare själva får dra över. Den blå-markerade leden ingår sedan 2024 i den 270 km långa Stockholm Archipelago Trail.',
  },

  // ─── NÄMDÖ ───────────────────────────────────────────────────
  {
    slug: 'namdo',
    name: 'Nämdö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Gles, bilfri ö på Stavsnäsleden — ett genuint skärgårdssamhälle.',
    description: [
      'Nämdö är en bilfri ö på Waxholmsbåtens linje från Stavsnäs mot Möja. Ön har haft fast befolkning sedan tidig medeltid — på 1870-talet var befolkningen som störst med 321 personer skrivna i församlingen. Idag är ön ett genuint litet skärgårdssamhälle med kyrka, lanthandel och båtbrygga.',
      'Nämdö kyrka är en av skärgårdens mest karakteristiska — den nuvarande åttakantiga träkyrkan i gustaviansk stil uppfördes 1798 och ersatte ett tidigare kapell. Det första kända kapellet på ön byggdes före 1630 och brändes ned vid de ryska härjningarna 1719.',
      'Naturen är varierad med klippbad, vandringsstigar och fina naturhamnar på öns södra sida. Nämdö passar som stopp på en längre seglingstur mot Sandhamn, eller som dagsdestination för den som söker autentiskt skärgårdsliv.',
    ],

    facts: {
      travel_time: '90 min med Waxholmsbåt från Stavsnäs',
      character: 'Bilfri, genuint, litet samhälle, välskyddat',
      season: 'Maj–September',
      best_for: 'Seglare, naturälskare, genuint skärgårdsliv',
    },
    activities: [
      { icon: '⛪', name: 'Nämdö kyrka', desc: 'Åttakantig träkyrka i gustaviansk stil från 1798 — en av skärgårdens mest distinkta kyrkobyggnader. Öppen sommartid.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten och fina klippor längs södra kustlinjen.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön och utforska de gamla fiskelägena.' },
      { icon: '⛵', name: 'Segling', desc: 'Naturhamnen på södsidan är ett populärt seglarankar.' },
    ],
    accommodation: [
      { name: 'Nämdö Camping', type: 'Camping', desc: 'Enkel campingplats nära hamnen.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: '90 min', desc: 'Linjen mot Möja och Gällnö stannar vid Nämdö.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Nämdö Hamn', desc: 'Liten gästhamn. Begränsat antal platser.', spots: 20, fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Nämdö Krog', type: 'Restaurang', desc: 'Husmanskost sommartid.' },
      { name: 'Nämdö Lanthandel', type: 'Handel', desc: 'Dagligvaror och proviant.' },
    ],
    tips: [
      'Nämdö passar perfekt som halvdagsstopp på väg mot Möja eller Gällnö.',
      'Kyrkan från 1798 är öppen sommartid — den åttakantiga gustavianska träkyrkan är ovanlig i sitt slag.',
    ],
    related: ['moja', 'gallno', 'sandhamn'],
    tags: ['bilfri', 'genuint', 'segling', 'natur', 'kyrka'],
    did_you_know: 'Nämdös tidigaste kapell brändes ned vid de ryska härjningarna 1719 — under Stora nordiska kriget gjorde ryska galärer flera räder mot Stockholms skärgård och brände bebyggelsen på många öar. Den nuvarande åttakantiga kyrkan från 1798 är en av få av sitt slag i landet.',
  },

  // ─── SVARTSÖ ─────────────────────────────────────────────────
  {
    slug: 'svartso',
    name: 'Svartsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'island',
    tagline: 'Bilfri ö i Värmdö — skärgårdens bästa lanthandel och en levande helårsby.',
    description: [
      'Svartsö ligger i Stockholms mellersta skärgård öster om Ljusterö och väster om Ingmarsö, och tillhör Värmdö kommun. Med cirka 65 åretruntinvånare är ön ett av få mellanstora skärgårdssamhällen som behållit en levande helårsbefolkning — komplett med skola, restauranger, lanthandel, apotek- och Systembolags-ombud.',
      'Ön har varit befolkad sedan tidig medeltid och de två ursprungliga gårdarna Alsvik och Skälvik på sydsidan går tillbaka till samma tid. Säby herrgård restes 1732 av bankiren Johan Söderling efter att den föregående bebyggelsen brunnit ned vid ryska härjningarna 1719.',
      'Svartsö är bilfri (frånsett några enstaka traktorer och fyrhjulingar) och utforskas bäst på cykel, till fots eller via öns grusvägar. Krogen, lanthandeln och vandrarhemmet är öns kärna — perfekt för dem som vill kombinera autentiskt skärgårdsliv med vällagad mat.',
    ],

    facts: {
      travel_time: '2 h med Waxholmsbåt från Strömkajen',
      character: 'Bilfri, ekologisk, lugnt, mat i fokus',
      season: 'Maj–September',
      best_for: 'Matälskare, naturälskare, de som söker unikt',
    },
    activities: [
      { icon: '🛒', name: 'Svartsö Lanthandel', desc: 'Skärgårdens kanske mest välsorterade lanthandel — med apotekombud och Systembolagets utlämning. Lokalbornas vardagsliv händer här.' },
      { icon: '🏛', name: 'Säby herrgård', desc: 'Stenhus uppfört 1732 av bankiren Johan Söderling — bevarad miljö från tiden efter ryssarnas härjningar 1719.' },
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trail-etapp leder över Svartsö med markerade stigar genom öppet odlingslandskap och skog.' },
      { icon: '🚲', name: 'Cykling', desc: 'Bilfri ö med grusvägar — ideal för en heldag på cykel.' },
    ],
    accommodation: [
      { name: 'STF Svartsö Skärgårdshotell & Vandrarhem', type: 'Vandrarhem', desc: 'Hotell- och vandrarhemsboende med konferensmöjligheter, drivet av Svenska Turistföreningen.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen / Stavsnäs', time: '2 h', desc: 'Skärgårdslinjen mellan Stavsnäs och Möja stannar vid Svartsö.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Svartsö gästhamn', desc: 'Liten gästhamn nära krogen och lanthandeln.', spots: 20, fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Svartsö Krog', type: 'Restaurang', desc: 'Öns krog vid bryggan — säsongsbaserad meny.' },
      { name: 'Svartsö Lanthandel', type: 'Handel', desc: 'Skärgårdens kanske bäst sorterade lanthandel — apotek- och Systembolagsombud.' },
    ],
    tips: [
      'Lanthandeln är en sevärdhet i sig — överraskande välsorterad för en bilfri ö.',
      'Skola och året-runt-befolkning gör att ön är levande även utanför sommarsäsongen.',
      'Stockholm Archipelago Trail leder genom Svartsö — ladda ner kartan för en hel dags vandring.',
    ],
    related: ['moja', 'gallno', 'ingmarso'],
    tags: ['bilfri', 'helårs-ö', 'lanthandel', 'genuint', 'lantligt'],
    did_you_know: 'Svartsö har omkring 65 åretruntinvånare och är en av få mellanstora skärgårdsöar med levande helårsverksamhet — ön har egen skola, krog, vandrarhem och en lanthandel som även fungerar som apotekombud och Systembolagets utlämningsställe.',
  },

  // ─── RUNMARÖ ─────────────────────────────────────────────────
  {
    slug: 'runmaro',
    name: 'Runmarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'sailboat',
    tagline: 'Författarnas ö — Strindberg, Söderberg och Tomas Tranströmer hämtade alla inspiration här.',
    description: [
      'Runmarö är kanske Sveriges mest litterära ö. August Strindberg gjorde den känd genom sina somrar på 1880-talet — hans roman "I havsbandet" (1890) skildrar visserligen Huvudskär men är skriven utifrån miljöerna på Runmarö. Hjalmar Söderberg följde i Strindbergs spår, och Tomas Tranströmer (1931–2015), Nobelpristagare i litteratur 2011, tillbringade somrarna på sin morfars lotsplats vid "Gatan" på Runmarö hela sitt liv. Diktcykeln "Östersjöar" (1974) är direkt inspirerad av öns vatten och människor.',
      'Runmarö är en bilfri ö i Stockholms mellersta skärgård, knutpunkt på Stavsnäs-leden mot Sandhamn. Karaktäristisk är de platta öppna vägarna med skog mellan, vilket gör ön ovanligt cykelvänlig för Stockholms-skärgården. Det finns lanthandel, krog, bageri och flera badplatser.',
      'Runmarö passar för litteraturintresserade på Tranströmers eller Strindbergs spår, för cyklister och seglare som söker en lugnare övernattning än Sandhamn.',
    ],

    facts: {
      travel_time: '2 h med Waxholmsbåt från Strömkajen',
      character: 'Lugnt, naturnära, knutpunkt för seglare',
      season: 'Maj–September',
      best_for: 'Seglare, naturhamnsankring, de som söker lugnet nära Sandhamn',
    },
    activities: [
      { icon: '✍️', name: 'Tranströmer-spåret', desc: 'Promenera till "Gatan" där Tomas Tranströmer tillbringade somrarna i morfaderns lotshus — miljön bakom diktcykeln "Östersjöar".' },
      { icon: '🚲', name: 'Cykling', desc: 'En av skärgårdens mest cykelvänliga öar — platta vägar och kort avstånd till alla bryggor.' },
      { icon: '⛵', name: 'Segling', desc: 'Klassisk passage och stopp på Stavsnäs-leden mot Sandhamn.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klippbad längs öns kustlinje.' },
    ],
    accommodation: [
      { name: 'Runmarö Gästhamn', type: 'Gästhamn', desc: 'Förtöj på gästplatser — enkelt och bra.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen / Stavsnäs', time: '2 h', desc: 'Direktlinje. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Eigen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Populärt segelstopp.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Runmarö Hamn', desc: 'Bränsle, el och vatten. Populärt stopp på Stockholmsleden.', spots: 50, fuel: true, service: ['el', 'vatten', 'bränsle', 'dusch'] },
    ],
    restaurants: [
      { name: 'Runmarö Krog', type: 'Restaurang', desc: 'Öns krog med enkel skärgårdsmat.' },
      { name: 'Runmarö Lanthandel', type: 'Handel', desc: 'Proviant och dagligvaror.' },
    ],
    tips: [
      'Runmarösund är en av mellersta skärgårdens finaste naturhamnar — anlöp tidigt.',
      'Runmarö är ett lugnare alternativ till Sandhamn för övernattning med direktbåt till stan nästa dag.',
    ],
    related: ['sandhamn', 'moja', 'gallno'],
    tags: ['segling', 'naturhamn', 'bränsle', 'lugnt', 'mellersta'],
    did_you_know: 'Tomas Tranströmer (1931–2015) — Nobelpristagare i litteratur 2011 — tillbringade hela sitt liv somrarna i sin morfars lotshus vid "Gatan" på Runmarö. Diktcykeln "Östersjöar" (1974) är direkt inspirerad av öns vatten, lotshistoria och människor. 2001 sammanställde Tranströmer själv 30 dikter under titeln "Dikter från Runmarö".',
  },

  // ─── RESARÖ ──────────────────────────────────────────────────
  {
    slug: 'resaro',
    name: 'Resarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏡',
    tagline: 'Välmående villaö nära Vaxholm — lättillgänglig med bil och buss.',
    description: [
      'Resarö är en mellanstor ö i mellersta skärgården som erbjuder varierad natur och möjligheter för både kajak och segling. Ön är populär bland naturälskare.',
      'Resarö kombinerar skogsrika områden med väl utvecklad kustlinje och flera goda ankringslägen. Det finns en gästhamn och grundläggande service.',
      'Resarö passar väl för seglare som söker ett gott ankringsläge i mellersta skärgården, eller för kajakvinnare.'
    ],

    facts: {
      travel_time: '50 min med buss från Stockholm / 10 min med bil från Vaxholm',
      character: 'Lättillgänglig, villa-ö, badvänlig',
      season: 'April–Oktober',
      best_for: 'Dagstur, bad, familjer, bilanpassad',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Öns södra udde har ett av regionens populäraste klippbad.' },
      { icon: '🚶', name: 'Promenad', desc: 'Vandra längs öns stigar och beundra den historiska villaarkitekturen.' },
      { icon: '🚲', name: 'Cykling', desc: 'Plana vägar gör ön lätt att cykla runt.' },
    ],
    accommodation: [
      { name: 'Sommarstugor', type: 'Stugor', desc: 'Privatuthyrning sommartid.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Vaxholm', time: '10 min', desc: 'Direktväg från Vaxholm via Eriksberg.', icon: '🚗' },
      { method: 'Buss', from: 'Stockholm', time: '50 min', desc: 'SL-buss 670 till Vaxholm, sedan buss 676 till Resarö.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Resarö Brygga', desc: 'Gästbrygga vid krogsbryggan.', fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Resarö Brygga Krog', type: 'Restaurang', desc: 'Sommarkrog vid bryggan. Räkor och husmanskost.' },
      { name: 'Resarö Café', type: 'Café', desc: 'Fika och lätt lunch.' },
    ],
    tips: [
      'Resarö är ett utmärkt val för den som vill till skärgården utan att ta båt.',
      'Klippbadet på södra udden är bäst tidig morgon innan det fylls.',
    ],
    related: ['vaxholm', 'rindo', 'grinda'],
    tags: ['lättillgänglig', 'bad', 'villa', 'dag-tur', 'bil'],
    did_you_know: 'Resarö är den enda ön i Stockholms skärgård med ett eget riksintresse för kulturmiljö — bebyggelsen från sekelskiftet 1900 är unik välbevarad.',
  },

  // ─── HUSARÖ ──────────────────────────────────────────────────
  {
    slug: 'husaro',
    name: 'Husarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Bilfri och lugn — ett av de bättre hållen hemligheterna i mellersta skärgården.',
    description: [
      'Husarö är en bilfärjebetjänad ö i mellersta skärgården som erbjuder lugn och möjligheter för längre vistelse. Ön är mindre känd än sina närliggande grannar.',
      'Naturmässigt är Husarö varierad med skogspartier och badplatser längs kusten. Det finns en gästhamn och grundläggande service. Cykelvägar löper längs vägnätet.',
      'Husarö passar för familjer som söker lugn och naturupplevelse, eller som del av längre cykel- eller seglingsresor.'
    ],

    facts: {
      travel_time: '2,5 h med Waxholmsbåt från Strömkajen',
      character: 'Bilfri, lugnt, genuint, norra mellersta',
      season: 'Maj–September',
      best_for: 'Seglare, de som söker lugn och orördhet',
    },
    activities: [
      { icon: '🚶', name: 'Vandring till norra udden', desc: 'Ca 3 km vandring till panoramautsikten norrut. Rekommenderas starkt.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Fina klippbadplatser på öns västra sida.' },
      { icon: '⛵', name: 'Segling', desc: 'Husarö är ett populärt ankringsstopp på norra Stockholmsleden.' },
    ],
    accommodation: [
      { name: 'Husarö Gästhamn', type: 'Gästhamn', desc: 'Välskött med plats för ett tiotal båtar.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2,5 h', desc: 'Norra linjen. Ingår i SL-kort.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Husarö Hamn', desc: 'Liten välskött gästhamn.', spots: 15, fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Husarö Krog', type: 'Restaurang', desc: 'Öns krog med husmanskost och trevlig stämning.' },
    ],
    tips: [
      'Vandra till norra udden — det är det bästa man kan göra på Husarö.',
      'Husarö är mindre känt än grannarna, vilket ger ett lugnare hamnläge.',
    ],
    related: ['finnhamn', 'ingmarso', 'ljustero'],
    tags: ['bilfri', 'orört', 'segling', 'vandring', 'lugnt'],
    did_you_know: 'Husarö är bilfri och har stark seglartradition — namnet är gammalt och kommer troligen från fornsvenskt "husa" (gård) plus "ö", inte från husarregementet. Ön är ett av Skärgårdsstiftelsens naturskyddade områden.',
  },

  // ─── FEJAN ───────────────────────────────────────────────────
  {
    slug: 'fejan',
    name: 'Fejan',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🪨',
    tagline: 'En av norra skärgårdens finaste naturhamnar — klara vatten och vita klippor.',
    description: [
      'Fejan är en av de yttersta bebodda öarna i norra Stockholms skärgård, mot Ålandshav. Ön har bofast historia sedan 1856 och blev känd som östkustens karantänsstation från 1892 — sjukhuset "Wasa" stod kvar i drift fram till 1930-talet och flera av dåtidens byggnader finns ännu kvar.',
      'Skärgårdsstiftelsen arrenderade området från Fortifikationsverket 1994 och tog över ägandet 2013. Idag drivs vandrarhem, sjökrog, gästhamn och bastu i karantänsstationens äldre byggnader.',
      'Fejan nås med skärgårdsbåt från Räfsnäs, eller med egen båt — gästhamnen är ett populärt stopp för seglare på Furusundsleden.',
    ],
    facts: {
      travel_time: 'Nås med privat båt — ca 1–2 h från Furusund beroende på startpunkt',
      character: 'Orört, naturreservat, vitt klipplandskap',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturälskare, snorkling, fotografer',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Kristallklart vatten och vita klippor. En av norra skärgårdens finaste badplatser.' },
      { icon: '⛵', name: 'Naturhamnsankring', desc: 'Skyddad inhamn med eldstäder avsedda för besökare. Populär övernattningsplats.' },
      { icon: '🐟', name: 'Snorkling', desc: 'Klart vatten med bra sikt. Havsfauna i fin miljö.' },
      { icon: '🌅', name: 'Solnedgångsfotografering', desc: 'Vita klippor i solnedgång — naturreservatets mest fotograferade vy.' },
    ],
    accommodation: [
      { name: 'Ankring / Tält', type: 'Camping', desc: 'Ankring i naturhamnen eller tältning på anvisad plats i naturreservat.' },
    ],
    getting_there: [
      { method: 'Skärgårdsbåt', from: 'Räfsnäs', time: '30 min', desc: 'Reguljär skärgårdsbåt från Räfsnäs (norr om Norrtälje) — kontrollera aktuell tidtabell hos Waxholmsbolaget.', icon: '⛴' },
      { method: 'Egen båt', from: 'Furusund', time: '30–60 min', desc: 'Naturligt stopp på Furusundsleden norrut.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Fejan Naturhamn', desc: 'Skyddad och välbesökt naturhamn. Fyrsektioner och eldplatser finns.', spots: 15, fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Anlöp tidigt — Fejan är populär och naturhamnen fylls kvällar i juli.',
      'Ta med allt du behöver — ingen service finns på ön.',
      'Naturreservatsregler: elden bara i anvisade eldplatser, inga lösa fyrverkerier.',
    ],
    related: ['furusund', 'arholma', 'graddo'],
    tags: ['naturreservat', 'klippor', 'segling', 'snorkling', 'norra'],
    did_you_know: 'Fejan var östkustens karantänsstation från 1892 — fartyg och passagerare med smittsamma sjukdomar fick stanna här innan de fick fortsätta in mot fastlandet. Sjukhuset "Wasa" låg i drift fram till 1930-talet och vandrarhemmet idag bedrivs i de bevarade byggnaderna.',
  },

  // ─── RÖDLÖGA ─────────────────────────────────────────────────
  {
    slug: 'rodloga',
    name: 'Rödlöga',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Skyddat ytterklippsskär med en av norra skärgårdens finaste ankringsplatser.',
    description: [
      'Rödlöga ligger på gränsen till Stockholms norra ytterskärgård och är en av skärgårdens mest oförändrade öar. Det finns inga bilvägar — bara slingrande stigar mellan tomter och klippor — och ingen el. Sommartid räknar ön ca 150 hushåll, vintertid är ön i princip obebodd.',
      'Ön har bofast historia sedan 1530-talet och var en av få öar som inte brändes vid ryssarnas härjningar 1719. Från 1792 var en lots stationerad här. Jordbruket lades ned 1956 och den siste fastboende, Georg Nordström, flyttade 1979.',
      'Rödlöga är primärt en seglarö — de skyddade vikarna och naturhamnen lockar erfarna seglare som söker autentisk ytterskärgård.'
    ],

    facts: {
      travel_time: '3–4 h med Waxholmsbåt från Norrtälje / privat båt',
      character: 'Ytterskärgård, välskyddat ankare, äventyrligt',
      season: 'Juni–Augusti',
      best_for: 'Erfarna seglare, ytterskärgårdsälskare',
    },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'En av norra skärgårdens bäst skyddade naturhamnar. Populär under Gotland Runt och andra långseglingsäventyr.' },
      { icon: '🌊', name: 'Klippvandring', desc: 'Vandra ut mot yttre klipporna och känn havsexponeringen.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkt havsöring- och makrillfiske i ytterskärgårdens vatten.' },
    ],
    accommodation: [
      { name: 'Stugor vid hamnen', type: 'Stugor', desc: 'Enkla stugor för övernattning.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Norrtälje', time: '3–4 h', desc: 'Norra linjen längst ut.', icon: '⛴' },
      { method: 'Privat båt', from: 'Furusund / Arholma', time: '1–2 h', desc: 'Naturlig etapp på en längre norrlands-seglingstur.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Rödlöga Hamn', desc: 'Välskyddad inhamn med plats för ca 15 båtar. En av norra skärgårdens bästa.', spots: 15, fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Rödlöga Krog', type: 'Restaurang', desc: 'Samlingsplatsen för seglare. Husmanskost och hamnstämning.' },
    ],
    tips: [
      'Rödlöga kräver god navigeringskunskap — ytterskärgård med grunder.',
      'Krogen är extra livlig under Gotland Runt-helgen (tidig juli).',
    ],
    related: ['arholma', 'furusund', 'fejan'],
    tags: ['ytterskärgård', 'segling', 'ankring', 'norra', 'äventyr'],
    did_you_know: 'Rödlöga är omgiven av ett av Stockholms läns rikaste fiskevatten. Abborrar, gäddor och havsöring fångas här i stor mängd.',
  },

  // ─── SINGÖ ───────────────────────────────────────────────────
  {
    slug: 'singo',
    name: 'Singö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Glest befolkad ö i Norrtäljes skärgård — rå natur och en bilfärja bort från turismen.',
    description: [
      'Singö är en stor ö i norra Roslagens skärgård i Norrtälje kommun, broförbunden med fastlandet. Tillsammans med grannön Fogdö bildar den ett av norra Upplands mest oförstörda kustlandskap — öppna fält, träkyrkby och en lång klippkust mot Ålandshav.',
      'Singö kyrka från 1753 är en röd timmrad träkyrka och hyser flera 1700-talsdyrkar — bland annat ett votivskepp från 1700-talet som räknas till Stockholms läns äldsta, skänkt av Norrtälje-borgaren Eric Brant och hans hustru Maria Tillman 1752.',
      'Före Singöbron byggdes (då gjorde båt huvudtransporten) gick Waxholmsbåtarna ända fram till 1951 från Strandvägen via Norrtälje, Väddö kanal, Trästa och Singö till Östhammar och Öregrund. Idag är Singö ett populärt bilburet utflyktsmål för dem som söker bortom de stora turist-öarna.',
    ],

    facts: {
      travel_time: '90 min med bil + bilfärja från Norrtälje',
      character: 'Genuint, okänt, bilfärja, norra Uppland',
      season: 'Juni–Augusti',
      best_for: 'De som söker äkta orördhet, kulturhistoria',
    },
    activities: [
      { icon: '⛪', name: 'Singö kyrka (1753)', desc: 'Röd timmrad träkyrka med altarprydnader från Hargs kyrka 1761 och en av Stockholms läns äldsta votivskepp (1752).' },
      { icon: '🎣', name: 'Fiske', desc: 'Bra fiskevatten runt ön. Abborre och havsöring i kustvattnen.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs öns grusvägar genom det öppna kulturlandskapet.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Lugna klippbad längs kusten — sällan trångt.' },
    ],
    accommodation: [
      { name: 'Stugor', type: 'Stugor', desc: 'Privatuthyrning av sommarstugor på ön.' },
    ],
    getting_there: [
      { method: 'Bil + Bilfärja', from: 'Norrtälje', time: '45 min', desc: 'Kör norrut från Norrtälje mot Singöfärjan.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Singö Fiskehamn', desc: 'Liten fiskehamn med begränsad gästbrygga.', fuel: false },
    ],
    restaurants: [
      { name: 'Singö Krog', type: 'Restaurang', desc: 'Liten sommarkrog med lokal fisk.' },
    ],
    tips: [
      'Singö kapell är öns absoluta höjdpunkt — ta med kameran.',
      'Ta med mat hemifrån — restaurangutbudet är mycket begränsat.',
    ],
    related: ['arholma', 'vaddo', 'norrora'],
    tags: ['genuint', 'orört', 'bilfärja', 'norra', 'kulturhistoria'],
    did_you_know: 'Singö kyrka (1753) hyser ett votivskepp från 1752 som räknas till Stockholms läns äldsta — skänkt av Norrtälje-borgaren Eric Brant och hans hustru Maria Tillman. Fram till 1951 trafikerade Waxholmsbåtarna sträckan Stockholm–Norrtälje–Singö–Östhammar/Öregrund som ordinarie passagerarlinje.',
  },

  // ─── LIDÖ ────────────────────────────────────────────────────
  {
    slug: 'lido',
    name: 'Lidö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌲',
    tagline: 'Naturskönt gods med konferens och gästhamn — ett unikt skärgårdshotell.',
    description: [
      'Lidö är en herrgårdsö i Stockholms norra skärgård i Norrtälje kommun. Lidö herrgård har medeltida rötter och nuvarande huvudbyggnad uppfördes 1769. Sedan 1998 ägs större delen av ön av Skärgårdsstiftelsen, som från 2002 hyrt ut driften till olika entreprenörer — Lidö Värdshus drivs sedan 2011 av Hugo Olofsson och Olle Tejle.',
      'Ön kombinerar lugn natur med en vällevande gästhamn, sjökrog, badtunnor, bastu och vandringsleder. Skärgårdsstiftelsen förvaltar också de mindre kringliggande öarna Västerholmen, Gyltan, Skabbö och Örskär.',
      'Lidö passar för par och familjer som söker en blandning av naturupplevelse och välkomponerad service.'
    ],

    facts: {
      travel_time: '3 h med Waxholmsbåt från Strömkajen / 2 h med bil + färja',
      character: 'Naturhotell, välvårdat gods, lugnt',
      season: 'April–Oktober (konferens helår)',
      best_for: 'Par, konferens, naturälskare, golfare',
    },
    activities: [
      { icon: '🛁', name: 'Badtunnor & bastu', desc: 'Badtunnor med havsutsikt och vedeldad bastu vid bryggan.' },
      { icon: '🚶', name: 'Naturpromenader', desc: 'Välskötta leder längs kust och genom skog.' },
      { icon: '🛶', name: 'Kajak & kanot', desc: 'Uthyrning för paddling i de skyddade vattnen runt ön.' },
      { icon: '🎣', name: 'Fiske', desc: 'Guidat fiske och uthyrning av fiskeutrustning.' },
    ],
    accommodation: [
      { name: 'Lidö Naturhotell', type: 'Hotell', desc: 'Hotellrum i historiska herrgårdsbyggnader. Full frukost och middag ingår i vissa paket.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '3 h', desc: 'Norra linjen. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Bil + Färja', from: 'Stockholm via E18', time: '2 h', desc: 'Kör mot Norrtälje, bilfärja till ön.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Lidö Gästhamn', desc: 'Välskött gästhamn vid herrgårdsbryggan.', spots: 30, fuel: false, service: ['el', 'vatten', 'dusch'] },
    ],
    restaurants: [
      { name: 'Lidö Herrgårdsrestaurang', type: 'Restaurang', desc: 'Säsongsbaserad mat med lokala råvaror. Middag för hotelgäster och dagsgäster med bokning.' },
    ],
    tips: [
      'Lidö Värdshus är populärt för weekendpaket — boka i god tid, helst flera veckor i förväg.',
      'Skärgårdsstiftelsens vandringsleder mellan Lidö och de mindre öarna runt om är fina i juni–juli.',
    ],
    related: ['furusund', 'blido', 'arholma'],
    tags: ['naturhotell', 'värdshus', 'norra', 'herrgård'],
    did_you_know: 'Lidö herrgård har medeltida rötter och nuvarande huvudbyggnad är från 1769. Sedan 1998 ägs ön av Skärgårdsstiftelsen, som arrenderar ut värdshuset till externa entreprenörer.',
  },

  // ─── GRÄDDÖ ──────────────────────────────────────────────────
  {
    slug: 'graddo',
    name: 'Gräddö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Halvö i norra skärgården med direktbuss och en av regionens finaste stränder.',
    description: [
      'Gräddö är en halvö i Roslagens skärgård i Norrtälje kommun, broförbunden med fastlandet via E18 och väg 76. Det gör Gräddö till en av de mest tillgängliga skärgårdsplatserna i norra Stockholms län — man kör hela vägen utan färja.',
      'Halvön är populär för dagsutflykter från Stockholm. Sommartid finns båtutflykter till Tjockö, Fejan och vidare ut i Furusunds skärgård. Gräddöbadet är en lättillgänglig sandstrand och området har flera mindre gästhamnar och restauranger längs kusten.',
      'Gräddö passar för bilburna familjer som vill nå Roslagens skärgård utan båt, för dagsturer från Norrtälje, eller som start- och slutpunkt för båtutflykter mot Furusund och de yttre öarna.',
    ],

    facts: {
      travel_time: '90 min med buss från Stockholm',
      character: 'Lättillgänglig, sandstrand, norra skärgård',
      season: 'April–Oktober',
      best_for: 'Bad, dagstur, barnfamiljer, bilresenärer',
    },
    activities: [
      { icon: '🏖', name: 'Gräddöbadet', desc: 'En av norra skärgårdens populäraste sandstränder. Grunt och barnvänligt.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs kustvägen och utforska halvöns alla delar.' },
      { icon: '⛵', name: 'Segling', desc: 'Välplacerat stopp på väg norrut längs Furusundsleder.' },
    ],
    accommodation: [
      { name: 'Gräddö Gård', type: 'Hotell', desc: 'Konferens- och övernattning på gård i naturskönt läge.' },
    ],
    getting_there: [
      { method: 'Buss', from: 'Stockholm', time: '90 min', desc: 'SL-buss 637 mot Norrtälje och vidare.', icon: '🚌' },
      { method: 'Bil', from: 'Stockholm', time: '75 min', desc: 'E18 mot Norrtälje, sedan väg 76 mot Gräddö.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Gräddö Hamn', desc: 'Liten gästhamn. Enkelt men fungerande.', fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Gräddö Gård Restaurang', type: 'Restaurang', desc: 'Säsongsbaserad mat på gårdshotellet.' },
    ],
    tips: [
      'Gräddöbadet är bäst tidig morgon — sandstranden fylls snabbt på varma dagar.',
      'Gräddö är ett bra alternativ för den utan båt som vill uppleva norra skärgårdens karaktär.',
    ],
    related: ['furusund', 'blido', 'norrora'],
    tags: ['sandstrand', 'lättillgänglig', 'norra', 'bad', 'dagstur'],
    did_you_know: 'Gräddö har ett av Stockholms äldsta och fortfarande aktiva skeppsvarf. Träbåtar har byggts och reparerats här sedan 1800-talets mitt.',
  },

  // ─── VÄDDÖ ───────────────────────────────────────────────────
  {
    slug: 'vaddo',
    name: 'Väddö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌾',
    tagline: 'Stor halvö nära Norrtälje med kanal, dansbana och äkta Roslagskaraktär.',
    description: [
      'Väddö är Roslagens största ö, belägen norr om Norrtälje vid norra Östersjökusten. Tillsammans med Björkö-Arholma utgör Väddö en stor del av norra Roslagens skärgård. Den 18 km långa Väddö kanal — grävd från 1820 av soldater och invigd 1840 av Karl XIV Johan — skär genom området och förbinder Bagghusfjärden i söder med Väddöviken i norr. Det ger seglare ett skyddat alternativ till öppna havet öster om ön.',
      'Idag passerar omkring 22 000 båtar genom kanalen varje år. Slussen vid Älmsta är en av Roslagens populäraste sommarmål. Längs kanalen finns badplatser, restauranger och cykelleder. Herräng på östra Väddö är världens mest kända centrum för lindy hop genom Herrängs Dansläger som arrangerats varje juli sedan 1982.',
      'Väddö passar både för bilburna dagsturister och för seglare som väljer kanalen istället för öppna havet — och för dansare från hela världen som kommer för Herrängs danslägret.',
    ],

    facts: {
      travel_time: '90 min med bil från Stockholm / 2 h med buss',
      character: 'Bred halvö, landsbygd och skärgård, Roslagens hjärta',
      season: 'April–Oktober',
      best_for: 'Lindy hop-festival, kanalkryssning, cyklister, Roslagen-turism',
    },
    activities: [
      { icon: '💃', name: 'Herrängs Dansbana', desc: 'Legendarisk lindy hop-festival varje sommar. Världsunik stämning.' },
      { icon: '⚓', name: 'Väddö Kanal', desc: 'Historisk kanal med sluss och kanalkryssningar. Unik kulturupplevelse.' },
      { icon: '🚲', name: 'Cykling', desc: 'Utmärkta cykelleder längs kustlinjen och kanalstråket.' },
      { icon: '🎣', name: 'Fiske', desc: 'Kanalen och kustvattnen erbjuder bra fiske.' },
    ],
    accommodation: [
      { name: 'Hallsta Gård', type: 'B&B', desc: 'Bondgårdsboende med frukost och Roslagsatmosfär.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via E18', time: '90 min', desc: 'E18 mot Norrtälje, sedan norrut mot Väddö.', icon: '🚗' },
      { method: 'Buss', from: 'Stockholm T-centralen', time: '2 h', desc: 'SL-buss 637 mot Norrtälje och vidare till Väddö.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Väddö Kanalhus', desc: 'Sluss och kanalkryssning. Enkel gästbrygga.', fuel: false },
    ],
    restaurants: [
      { name: 'Kanalhuset Väddö', type: 'Restaurang', desc: 'Mat och fika vid kanalen. Sommarstämning.' },
      { name: 'Herrängs Danscafé', type: 'Café', desc: 'Öppet under festivalen i juli. Mysigt och unikt.' },
    ],
    tips: [
      'Herrängs Dansbana (juli) är en upplevelse utöver det vanliga — boka boende i god tid.',
      'Väddö Kanalen är ett underskattat besök — kryssningen tar 45 minuter.',
    ],
    related: ['singo', 'blido', 'norrora'],
    tags: ['lindy hop', 'kanal', 'Roslagens', 'norra', 'kultur'],
    did_you_know: 'Väddö kanal är 18 km lång och började grävas 1820 av soldater från olika regementen. Sveriges första ångdrivna mudderverk — konstruerat av Samuel Owen — användes vid bygget. Kanalen öppnades för trafik 1835 och invigdes officiellt 1840 av Karl XIV Johan. Idag passerar omkring 22 000 båtar genom kanalen varje år.',
  },

  // ─── ASKÖ ────────────────────────────────────────────────────
  {
    slug: 'asko',
    name: 'Askö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🔬',
    tagline: 'Marinbiologisk forskning och naturskönt naturreservat i södra ytterskärgården.',
    description: [
      'Askö ligger i Trosa-skärgården i södra Sörmland (formellt utanför Stockholms län), och är hem för Stockholms universitets marina forskningsstation Askölaboratoriet — en av Sveriges viktigaste forskningsplattformar för Östersjön. Ön är obebodd förutom forskningsstationen.',
      'Askölaboratoriet grundades 1961 och fungerar som bas för forskning kring Östersjöns ekosystem, övergödning, klimateffekter och marin biodiversitet. Sommartid arrangerar Stockholms universitet öppna visningsdagar då allmänheten kan besöka stationen och få guidning av forskarna.',
      'Askö passar för marinbiologi-intresserade som vill se Östersjöforskning på nära håll, och för seglare som söker en ovanlig anhalt i Trosa-skärgården.',
    ],

    facts: {
      travel_time: '3 h med privat båt från Nynäshamn',
      character: 'Naturreservat, forskning, ytterskärgård',
      season: 'Juni–Augusti (begränsad tillgänglighet)',
      best_for: 'Marinbiologiintresserade, erfarna seglare, naturälskare',
    },
    activities: [
      { icon: '🔬', name: 'Marinbiologiska turer', desc: 'Stockholms Universitet arrangerar öppna guideturer till Askölaboratoriet sommartid.' },
      { icon: '🌊', name: 'Ytterskärgårdsseglingd', desc: 'Askö är en etappdestination på södra ytterskärgårdens seglingsleder.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Naturreservat med rikt fågelliv. Häckningsplats för flera marina fågelarter.' },
    ],
    accommodation: [
      { name: 'Askölaboratoriets stugor', type: 'Stugor', desc: 'Begränsat antal stugor för kursdeltagare och allmänheten under sommaren. Boka via SU.' },
    ],
    getting_there: [
      { method: 'Privat båt', from: 'Nynäshamn', time: '3 h', desc: 'Nynäshamn är närmaste startpunkt. Öppet hav — planera vädret noga.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Askö Hamn', desc: 'Liten hamn vid laboratoriet. Begränsat antal platser för besökare.', spots: 10, fuel: false },
    ],
    restaurants: [],
    tips: [
      'Kontakta Stockholms Universitet för programmet för allmänhetens turer till laboratoriet.',
      'Askö kräver god sjövana — öppet ytterskärgårdsvatten med risk för snabba väderförändringar.',
    ],
    related: ['uto', 'nattaro', 'landsort'],
    tags: ['marinbiologi', 'naturreservat', 'ytterskärgård', 'forskning', 'södra'],
    did_you_know: 'Askölaboratoriet grundades 1961 och är Stockholms universitets fältstation för marin forskning i Östersjön. Det är en av de äldsta och mest produktiva marinbiologiska forskningsstationerna i Sverige — flera centrala studier kring Östersjöns övergödning och blåsippsprovtagning har sitt ursprung här.',
  },

  // ─── GÅLÖ ────────────────────────────────────────────────────
  {
    slug: 'galo',
    name: 'Gålö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🏖',
    tagline: 'Halvö med en av regionens finaste sandstränder — lättillgänglig med bil.',
    description: [
      'Gålö är en halvö i Stockholms södra skärgård i Haninge kommun — broförbunden med fastlandet via Gålöleden, vilket gör den till en av de mest tillgängliga "skärgårds-platserna" söder om Stockholm. På 40 minuter med bil från innerstaden är man framme.',
      'Gålö Havsbad är en av Stockholmsregionens populäraste sandstränder med fullservice, kioskutbud, parkering och campingplats. Naturreservatet runt halvön rymmer markerade vandringsleder genom kustlandskap, gammal skog och välbevarade kulturmiljöer från jordbrukstidens skärgård.',
      'Gålö passar för dagsutflykter med bil, för barnfamiljer som vill ha sandstrand utan båtresa, och för cyklister som söker en lättillgänglig dag i naturreservat.',
    ],

    facts: {
      travel_time: '40 min med bil från Stockholm / 75 min med buss',
      character: 'Lättillgänglig, sandstrand, naturreservat',
      season: 'April–Oktober',
      best_for: 'Sandstrand, bad, barnfamiljer, dagsturister',
    },
    activities: [
      { icon: '🏖', name: 'Gålö Havsbad', desc: 'Stor sandstrand med anläggningar, parkering och service. Regionens populäraste strandbad.' },
      { icon: '🚶', name: 'Naturreservat', desc: 'Välmarkerade vandringsleder längs kustlinjen och genom det vackra kustlandskapet.' },
      { icon: '🚲', name: 'Cykling', desc: 'Bra cykelleder längs ön. Hyrcyklar finns vid stranden.' },
      { icon: '🏄', name: 'Vattensport', desc: 'SUP, surfing och kajakuthyrning vid stranden.' },
    ],
    accommodation: [
      { name: 'Gålö Havsbad Camping', type: 'Camping', desc: 'Stor campingplats med alla bekvämligheter. Populär — boka i god tid.' },
      { name: 'Stugby Gålö', type: 'Stugor', desc: 'Stugor nära stranden.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: '40 min', desc: 'E4 söderut mot Handen, sedan skylt mot Gålö.', icon: '🚗' },
      { method: 'Buss', from: 'Handen station', time: '30 min', desc: 'Buss 843 från Handen till Gålö.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Gålö Brygga', desc: 'Liten gästbrygga. Begränsad service.', fuel: false },
    ],
    restaurants: [
      { name: 'Gålö Havsbad Restaurang', type: 'Restaurang', desc: 'Strandbistro med hamburgare, räkor och glass.' },
    ],
    tips: [
      'Kom tidigt på sommardagar — Gålö Havsbad är populärt och parkeringen fylls snabbt.',
      'Kombinera strandbesöket med vandringen i naturreservatet — 2 timmar och du har sett det bästa.',
    ],
    related: ['dalaro', 'orno', 'uto'],
    tags: ['sandstrand', 'lättillgänglig', 'södra', 'bad', 'camping'],
    did_you_know: 'Gålö Havsbad är en av Stockholmsregionens mest besökta badplatser — här fanns redan tidigt 1900-tal sommarkoloniverksamhet för Stockholms barn, och delar av området drivs idag av Skärgårdsstiftelsen som naturreservat och kulturmiljö.',
  },

  // ─── TORÖ ────────────────────────────────────────────────────
  {
    slug: 'toro',
    name: 'Torö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌲',
    tagline: 'Naturreservat i söder med dramatisk kustlinje och surf-stämning.',
    description: [
      'Torö är en stor ö i Stockholms södra skärgård i Nynäshamns kommun — broförbunden med fastlandet via Herrhamras bro och Torö bro. Den dramatiska sydkusten med stora rundslipade strandstenar (Torö stenstrand) är en av Stockholms läns mest unika kustlinjer och är skyddad som naturreservat.',
      'Torö stenstrand bildades under inlandsisens reträtt och är en av få platser i Sverige med så omfattande klapperstensformationer. Stränderna är populära både för promenader och för Östersjöns ovanliga sportsegling i sommarvindarna.',
      'Torö passar för dagsutflykter med bil från Stockholm, för fågelskådare under vår- och höstflyttning, och för seglare som söker en exponerad sydlig kustlinje.',
    ],

    facts: {
      travel_time: '60 min med bil från Stockholm',
      character: 'Naturreservat, dramatisk kust, surf',
      season: 'April–Oktober',
      best_for: 'Vandring, surf, fotografi, naturälskare',
    },
    activities: [
      { icon: '🌊', name: 'Surfing & Windsurfing', desc: 'Södra kustlinjen ger vindförhållanden för vattensport när Östersjövinden drar in.' },
      { icon: '🚶', name: 'Kustvandringsleden', desc: 'Markerad led längs klippkusten mot sydväst. Dramatiska vyer mot öppet hav.' },
      { icon: '🏖', name: 'Torö Strand', desc: 'Sandstrand vid Torö Marinstaden med service och parkering.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkta förhållanden för havsöring längs den öppna kustlinjen.' },
    ],
    accommodation: [
      { name: 'Torö Marinstaden', type: 'Camping', desc: 'Campingplats och stugor nära stranden.' },
    ],
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: '60 min', desc: 'E4 söderut mot Nynäshamn, sedan skylt mot Torö.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Torö Marinstaden', desc: 'Marinstation och gästhamn.', spots: 30, fuel: true, service: ['el', 'vatten', 'bränsle'] },
    ],
    restaurants: [
      { name: 'Torö Krog', type: 'Restaurang', desc: 'Strandbistro vid marinsstaden.' },
    ],
    tips: [
      'Kustvandringsleden är bäst vid solnedgång — dramatiska vyer mot Östersjön.',
      'Surfare kolla vindprognosen på windguru.cz specifikt för Torö.',
    ],
    related: ['nattaro', 'uto', 'galo'],
    tags: ['naturreservat', 'surf', 'kustlinje', 'södra', 'vandring'],
    did_you_know: 'Torö stenstrand på öns sydsida är en av Stockholms läns geologiska sevärdheter — en lång klapperstensstrand med stora rundslipade stenar formade under inlandsisens reträtt. Stranden är skyddad som naturreservat.',
  },

  // ─── FJÄRDLÅNG ───────────────────────────────────────────────
  {
    slug: 'fjardlang',
    name: 'Fjärdlång',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    tagline: 'Orört naturreservat i södra ytterskärgården — här åker man hit, inte förbi.',
    description: [
      'Fjärdlång är en större ö i Stockholms södra skärgård öster om Dalarö och Ornö. Ön är skyddad som naturreservat och förvaltas av Skärgårdsstiftelsen — ett tag av Stockholms läns finaste oexploaterade skärgårdsmiljöer med klippkust, blandskog och rikt fågelliv.',
      'På ön finns Fjärdlångs vandrarhem (32 bäddar, öppet maj till mitten av september) och Norrötorpet — en liten 33 m² stuga med ett rum, kök och sovloft, utan el, med vatten från egen pump och utedass plus bastu vid den egna bryggan.',
      'Fjärdlång nås med Waxholmsbåt eller egen båt från Dalarö. Markerade vandringsleder av varierande längd och svårighetsgrad gör ön till en av södra skärgårdens bästa platser för en längre dagsutflykt eller weekend.',
    ],

    facts: {
      travel_time: '2–3 h med privat båt från Dalarö eller Utö',
      character: 'Naturreservat, inga permanentbor, orört',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturälskare, stillhet',
    },
    activities: [
      { icon: '⛵', name: 'Naturhamnssankring', desc: 'Norra Fjärdlångsviken — en av södra skärgårdens finaste ankringsplatser.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Vandra längs östkusten för dramatiska havsvyer.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent klart vatten i ytterskärgårdsläge.' },
    ],
    accommodation: [
      { name: 'Fjärdlångs Vandrarhem', type: 'Vandrarhem', desc: '32 bäddar, öppet maj till mitten av september. Drivs i Skärgårdsstiftelsens regi.' },
      { name: 'Norrötorpet', type: 'Stugor', desc: 'Liten 33 m² stuga utan el — vatten från pump, utedass, bastu vid egen brygga. Ta med egen mat.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Dalarö', time: '1–1,5 h', desc: 'Reguljär skärgårdslinje under säsong. Kontrollera Waxholmsbolagets tidtabell.', icon: '⛴' },
      { method: 'Egen båt', from: 'Dalarö / Utö', time: '1–2 h', desc: 'Fjärdlångsviken är en klassisk naturhamn för seglare.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Norra Fjärdlångsviken', desc: 'En av södra skärgårdens finaste naturhamnar — Skärgårdsstiftelsen-förvaltad.', spots: 10, fuel: false },
    ],
    restaurants: [],
    tips: [
      'Boka vandrarhem 2–3 månader i förväg för juli — populärt med 32 bäddar.',
      'Norrötorpet är el-fritt — perfekt för digital detox men kräver planering.',
      'Markerade vandringsleder av olika längd — bra för både dagsutflykt och längre vistelse.',
    ],
    related: ['uto', 'nattaro', 'landsort'],
    tags: ['naturreservat', 'skärgårdsstiftelsen', 'vandrarhem', 'södra'],
    did_you_know: 'Fjärdlång förvaltas av Skärgårdsstiftelsen och vandrarhemmet med 32 bäddar är öppet maj till mitten av september. Stugan Norrötorpet — 33 m² utan el — är en av få platser i Stockholms skärgård där man fortfarande hämtar vatten med handpump och bastubadar vid egen brygga.',
  },

  // ── BATCH 3: Ytterligare öar för full konkurrenskraft ───────────────────

  {
    slug: 'rindo',
    name: 'Rindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏛',
    tagline: 'Tidigare KA 1-regementet — militärhistoria omvandlad till bostadsö nära Vaxholm',
    description: [
      'Rindö ligger i Stockholms inre skärgård öster om Vaxholm. Ön har en rik militärhistoria — Vaxholms kustartilleriregemente (KA 1) bildades på Rindö 1 januari 1902 och kasernbyggnaderna stod klara 1906, ritade av arkitekt Erik Josephson efter standardplaner för infanteriet. Regementet bemannade Vaxholms fästning, Oscar-Fredriksborgs fästning och Hörningsholms kustposition.',
      'KA 1 lades ned 30 juni 2000 och ersattes av Vaxholms Amfibieregemente (Amf 1) som 2006 flyttade till Berga örlogsbas. Sedan dess har Vasallen omvandlat kasernområdet till ett växande bostadsområde — Rindö är idag i första hand en bostadsö för Vaxholms-pendlare, med kvarvarande militärhistoriska byggnader och fortifikationer.',
      'Rindö passar för dagsbesök från Vaxholm, för promenader bland kasernerna och Oscar-Fredriksborgs fortifikationer, eller som boendeort för dem som vill kombinera skärgårdsläge med Stockholms-pendling.',
    ],
    facts: { travel_time: '10 min med bilfärja från Vaxholm', character: 'Militärhistoria, bostadsö, broförbunden', season: 'Helår', best_for: 'Militärhistoria, vandring, dagsutflykt från Vaxholm' },
    activities: [
      { icon: '🏛', name: 'KA 1-området', desc: 'Promenera bland Erik Josephsons kasernbyggnader från 1906 — idag bostäder och kulturmiljö.' },
      { icon: '🏰', name: 'Oscar-Fredriksborgs fästning', desc: 'Bevarad kustartillerifästning från sent 1800-tal/tidigt 1900-tal.' },
      { icon: '🚶', name: 'Promenader', desc: 'Stigar längs öns klippkust och genom de gamla militärområdena.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Bilfärja', from: 'Vaxholm', time: '10 min', desc: 'Reguljär bilfärja från Vaxholm centrum till Rindö (Trafikverkets vägfärja, avgiftsfri).', icon: '⛴' },
    ],
    harbors: [{ name: 'Rindö hamn', desc: 'Liten gästbrygga med begränsat antal platser.', spots: 8 }],
    restaurants: [],
    tips: ['Kombinera gärna med ett besök på Vaxholms fästning på Vaxholmen-sidan.', 'Vasallens omvandling av kasernerna är en av Sveriges större militära konversionsprojekt — värt en promenad.'],
    related: ['vaxholm', 'resaro', 'ljustero'],
    tags: ['militärhistoria', 'KA 1', 'bostadsö', 'nära Vaxholm', 'mellersta'],
    did_you_know: 'Vaxholms kustartilleriregemente (KA 1) bildades på Rindö 1902 och bemannade Vaxholms och Oscar-Fredriksborgs fästningar. Efter regementets nedläggning 2000 omvandlade Vasallen de gamla kasernerna — ritade av Erik Josephson 1906 — till bostäder, vilket gjorde Rindö till ett av Sveriges mest kända exempel på militär konversion.',
  },

  {
    slug: 'yxlan',
    name: 'Yxlan',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🚲',
    tagline: 'En av norra skärgårdens största öar — bilfärja, cykling och Köpmanholms hamn',
    description: [
      'Yxlan är en av norra skärgårdens största öar — cirka 17 km² — och ligger mellan Furusund och Blidö. Köpmanholm vid öns nordspets är öns huvudort, med gästhamn, butiker och restauranger. Waxholmsbolaget angör åtta bryggor på ön: Yxlö, Alsvik, Brokholmen, Duvnäs, Kolsvik, Köpmanholm, Vagnsunda och Yxlövik.',
      'Ön är broförbunden i båda riktningar via Trafikverkets avgiftsfria bilfärjor: Furusundsleden (600 meter, 4 minuter) från Furusund och Blidöleden (530 meter, 4 minuter) över till Blidö. Det gör Yxlan till en av de mest tillgängliga större öarna i norra skärgården.',
      'Yxlan passar för cykelsemester, vandring och båtutflykter med övernattning på land. Köpmanholm är ett bra startläge för seglare som vill utforska Furusunds- och Blidöleden.',
    ],
    facts: { travel_time: '1,5 h med bil + bilfärja från Stockholm', character: 'Stor ö, bilförbunden via färja, Köpmanholm', season: 'Maj–oktober', best_for: 'Cykling, vandring, segling, dagsutflykt' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Cykelvägar löper över hela ön — räkna med en hel dag för att se alla bryggor och utsiktspunkter.' },
      { icon: '🏊', name: 'Klipp- och sandbad', desc: 'Flera badplatser längs kusten, både klippor och mindre sandstränder.' },
      { icon: '⛵', name: 'Hamnliv i Köpmanholm', desc: 'Öns huvudort med gästhamn, restauranger och småbåtsservice.' },
    ],
    accommodation: [{ name: 'Yxlans Vandrarhem', type: 'Vandrarhem', desc: 'Enkelt boende med självhushåll, perfekt för naturälskare.' }],
    getting_there: [
      { method: 'Bil + bilfärja', from: 'Stockholm via Furusund', time: '1,5 h', desc: 'E18 mot Norrtälje, sen väg 276 till Furusund. Furusundsleden (avgiftsfri vägfärja, 4 min) över till Yxlan.', icon: '🚗' },
      { method: 'Skärgårdsbåt', from: 'Strömkajen', time: '3–4 h', desc: 'Waxholmsbolaget angör åtta bryggor på ön — Köpmanholm är huvudbryggan.', icon: '⛴' },
      { method: 'Cinderellabåtarna', from: 'Strandvägen', time: '3 h', desc: 'Sommartrafik till Köpmanholm.', icon: '⛴' },
    ],
    harbors: [{ name: 'Köpmanholms Gästhamn', desc: 'Yxlans huvudhamn vid Köpmanholm — full service.', spots: 30, service: ['El', 'Vatten', 'Dusch'] }],
    restaurants: [{ name: 'Yxlans Café', type: 'Kafé', desc: 'Hemlagad mat och kaffe i lantlig miljö vid hamnen.' }],
    tips: ['Båda bilfärjorna (Furusund-Yxlan och Yxlan-Blidö) är avgiftsfria.', 'Cykla mellan bryggor — varje brygga har sin egen karaktär.', 'Köpmanholm är livligast under hummerveckan i september.'],
    related: ['blido', 'furusund', 'graddo'],
    tags: ['stor ö', 'bilfärja', 'cykling', 'norra', 'köpmanholm'],
    did_you_know: 'Yxlan är broförbunden med både Furusund och Blidö via två avgiftsfria bilfärjor — Furusundsleden (600 m) i väster och Blidöleden (530 m) i öster. Tillsammans gör de Yxlan till en av de mest lättillgängliga större öarna i Roslagens skärgård, trots att den saknar fast brobindelse till fastlandet.',
  },

  {
    slug: 'kymmendo',
    name: 'Kymmendö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '✍️',
    tagline: 'Strindbergs ö — litteraturhistoria mitt i skärgården',
    description: [
      'Kymmendö är en bilfri ö i mellersta skärgården som har en exceptionell plats i svensk litteraturhistoria. August Strindberg tillbringade sju somrar här mellan 1871 och 1883 och fick på ön inspirationen till en av sina mest lästa romaner — "Hemsöborna" (1887). Karaktärerna Madam Flod och Gusten har förebilder bland Kymmendös faktiska invånare på den tiden.',
      'Ön är känd för sina naturvärden — skogsrika partier växlar med öppna ljunghedar och klippor. Bebyggelsen är fortfarande småskalig och ön är till stor del oexploaterad jämfört med andra mellersta skärgårdsöar.',
      'Kymmendö passar bäst för litteratur- och historieintresserade som vill se "det riktiga Hemsö", eller för den som söker en lugn sidoväg i mellersta skärgården.'
    ],

    facts: { travel_time: '2,5–3 h med Waxholmsbåt från Strömkajen / 1 h från Dalarö', character: 'Bilfri, historisk, litterär', season: 'Juni–september', best_for: 'Litteraturintresserade, Strindberg-fans, naturälskare' },
    activities: [
      { icon: '✍️', name: 'Strindbergsstugan', desc: 'Stugan där Strindberg bodde och hämtade inspiration till "Hemsöborna" (1887).' },
      { icon: '🥾', name: 'Vandring', desc: 'Korta men stämningsfulla stigar runt ön med klippvyer.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen / Dalarö', time: '2,5–3 h / 1 h', desc: 'Reguljär skärgårdslinje — kontrollera Waxholmsbolagets tidtabell.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Naturhamnen på södra sidan tar emot ett fåtal båtar.', icon: '⛵' },
    ],
    harbors: [{ name: 'Kymmendö naturhamn', desc: 'Skyddad vik på södra sidan. Ankring möjlig.', spots: 6 }],
    restaurants: [],
    tips: ['Läs Hemsöborna innan besöket.', 'Ta med allt — ingen butik eller service finns.', 'Planera vistelsen med vädret i tanke, svår att lämna vid storm.'],
    related: ['orno', 'dalaro', 'nattaro'],
    tags: ['Strindberg', 'literär', 'orört', 'historia', 'mellersta'],
    did_you_know: 'Kymmendö är känd som platsen där August Strindberg skildrade skärgårdslivet i romanen "Hemsöborna" från 1887 — en av Sveriges mest lästa böcker.',
  },

  {
    slug: 'bullero',
    name: 'Bullerö',
    region: 'mellersta',
    regionLabel: 'Mellersta ytterskärgården',
    emoji: '🎨',
    tagline: 'Bruno Liljefors ö — naturreservat och jaktstuga i ytterskärgården',
    description: [
      'Bullerö är en 0,78 km² stor ö i Stockholms mellersta ytterskärgård, sydost om Sandhamn. Konstnären Bruno Liljefors (1860–1939) — en av Sveriges mest framstående djurmålare — köpte ön 1908 och byggde en jaktstuga och ateljé på dess östra sida, där han hämtade motiv direkt ur den vilda skärgårdsnaturen.',
      'Bullerö med kringliggande öar köptes av staten 1967 och är idag ett naturreservat som förvaltas av Skärgårdsstiftelsen. Bruno Liljefors hus inrymmer Naturvårdsverkets Naturum med en utställning om skärgårdens natur och kultur, och visar reproduktioner av Liljefors målningar.',
      'Bullerö passar för dagsturer och kortare övernattning för seglare och naturälskare som vill se den verkliga ytterskärgården och en del av svensk konsthistoria på samma plats.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Stavsnäs', character: 'Naturreservat, ytterskärgård, konsthistorisk plats', season: 'Maj–september', best_for: 'Naturum-besök, fågelskådning, segling, kulturhistoria' },
    activities: [
      { icon: '🎨', name: 'Bruno Liljefors jaktstuga', desc: 'Konstnärens hus från 1908 — idag Naturvårdsverkets Naturum med utställning om skärgården.' },
      { icon: '🦅', name: 'Fågelliv', desc: 'Havsörn, ejder, vigg och olika sjöfågel häckar i området.' },
      { icon: '🚶', name: 'Vandringsstigar', desc: 'Markerade leder genom naturreservatets klipplandskap.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Skärgårdsbåt / egen båt', from: 'Stavsnäs', time: '2–3 h', desc: 'Waxholmsbolaget angör Bullerö under säsong — kontrollera tidtabell. Eller egen båt från Stavsnäs/Sandhamn.', icon: '⛴' }],
    harbors: [{ name: 'Bullerö gästhamn', desc: 'Begränsade platser vid naturreservatets brygga — Skärgårdsstiftelsen förvaltar.', spots: 15 }],
    restaurants: [],
    tips: ['Naturum är öppet sommarsäsong — kontrollera öppettider innan besök.', 'Respektera fågelskyddet under häckningstid (april–juli).', 'Kombinera gärna med ett besök på Sandhamn på samma seglingstur.'],
    related: ['nattaro', 'gallno', 'sandhamn'],
    tags: ['naturreservat', 'liljefors', 'konsthistoria', 'ytterskärgård', 'mellersta'],
    did_you_know: 'Konstnären Bruno Liljefors — en av Sveriges mest kända djurmålare och guldmedaljör vid Stockholmsutställningen 1897 — köpte Bullerö 1908. Idag är hans jaktstuga och ateljé Naturum, och flera av hans mest kända motiv föddes i skärgårdsnaturen runt ön.',
  },

  {
    slug: 'vindo',
    name: 'Vindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌳',
    tagline: 'Större broförbunden ö i Värmdö-skärgården — skog, vikar och båtliv',
    description: [
      'Vindö är en större ö i Stockholms mellersta skärgård i Värmdö kommun, broförbunden med fastlandet via Djurö i söder och med Skarpö i öster. Det gör Vindö till en av de mest tillgängliga öarna i området — man kör hela vägen utan färja.',
      'Skogen är tät och flera vandringsstigar leder mellan klippkust och inland. Badplatser längs kusten är ofta lugnare än på de mer turisttyngda öarna i området. Vindö är ett populärt sommarstugeområde med stark båtkultur — Stavsnäs och Stockholms inre skärgård ligger nära.',
      'Vindö passar för den som vill kombinera enkla bilförbindelser med skärgårdsnatur, eller som utgångspunkt för båtutflykter mot Stavsnäs och de yttre öarna.',
    ],
    facts: { travel_time: '1 h med bil från Stockholm', character: 'Stor broförbunden ö, skog, sommarstugor', season: 'Maj–oktober', best_for: 'Vandring, sommarboende, båtutflykter' },
    activities: [
      { icon: '🌳', name: 'Vandring', desc: 'Stigar genom blandskog och längs klippkust.' },
      { icon: '🚲', name: 'Cykling', desc: 'Vägar mellan Djurö, Vindö och Skarpö är fina cykelturer.' },
      { icon: '🏊', name: 'Klipp- och sandbad', desc: 'Mindre badplatser längs kusten — ofta lugnare än Värmdöns inre öar.' },
    ],
    accommodation: [{ name: 'Vindö Camping', type: 'Camping', desc: 'Välskött campingplats nära havet.' }],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Värmdö', time: '1 h', desc: 'Väg 222 till Värmdö, sedan över Djurö och vidare till Vindö via fast brobindelse.', icon: '🚗' },
      { method: 'Buss', from: 'Slussen', time: '1 h 15 min', desc: 'SL-buss via Värmdö och Djurö till Vindö.', icon: '🚌' },
    ],
    harbors: [{ name: 'Vindö brygga', desc: 'Gästbrygga med vattenservice.', spots: 20 }],
    restaurants: [{ name: 'Vindö Hamnkafé', type: 'Kafé', desc: 'Fika och enkel mat vid bryggan, öppet sommarsäsong.' }],
    tips: ['Vindö är broförbunden — ingen färja krävs.', 'Bra utgångspunkt för båtutflykter mot Stavsnäs och Möja.', 'Cykla mellan Djurö och Vindö för en stilla halvdag.'],
    related: ['gallno', 'namdo', 'moja'],
    tags: ['stor ö', 'broförbunden', 'skog', 'sommarstugor', 'mellersta'],
    did_you_know: 'Vindö nås landvägen utan färja — ön är broförbunden via Djurö i söder. Tillsammans med Djurö och Skarpö bildar den ett av få sammanhängande bilförbundna ö-områden i mellersta skärgården, vilket gjort området till en av Stockholms tätaste sommarstugekluster.',
  },

  {
    slug: 'smaadalaro',
    name: 'Smådalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🏛',
    tagline: 'Smådalarö Gård (1810) — Stockholms skärgårds kanske mest välrenommerade spa-hotell.',
    description: [
      'Smådalarö är en del av Dalaröhalvön i Stockholms södra skärgård, broförbunden och nåbar med bil från Stockholm på cirka 50 minuter. Området har en lång historia — under 1700-talet drev löjtnant Carl Christian Gyldener jordbruk här och fick livstidsarrende 1750. 1802 köpte kapten Per Niklas Blom hela "Tyresö skärgården" av grevinnan Brita Bonde för 12 000 riksdaler, och 1810 stod Smådalarö Gård klar.',
      'Smådalarö Gård genomgick en omfattande renovering och öppnade sommaren 2021 som ett av Sveriges mest påkostade spahotell — 118 rum, 2 000 m² spa, flera restauranger och bredd av aktiviteter. Det är idag en av Stockholms skärgårds mest välkända destinationer för helgvistelser och konferens.',
      'Smådalarö passar för weekend-resor med fokus på spa, mat och natur, för konferenser, eller som utgångspunkt för utflykter mot Dalarö, Utö och de södra öarna.',
    ],
    facts: { travel_time: '50 min med bil från Stockholm', character: 'Spa-hotell, bilförbunden, herrgårdsmiljö', season: 'Helår', best_for: 'Spa-weekend, konferens, dagstur' },
    activities: [
      { icon: '🧖', name: 'Smådalarö Gård Spa', desc: '2 000 m² spa-anläggning med pooler, bastur och behandlingar — ett av Sveriges mest påkostade spa-hotell efter 2021 års renovering.' },
      { icon: '🍽', name: 'Restauranger', desc: 'Flera restauranger på Smådalarö Gård — fine dining, brasserie och bar.' },
      { icon: '🚶', name: 'Naturpromenader', desc: 'Vandring längs kust och skog runt Smådalaröhalvön.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Mindre badplatser längs kusten.' },
    ],
    accommodation: [{ name: 'Smådalarö Gård Hotell & Spa', type: 'Hotell', desc: 'Anrikt herrgårdshotell från 1810 — 118 rum, 2 000 m² spa, fullrenoverat 2021. Drivs av Sabis.' }],
    getting_there: [
      { method: 'Bil', from: 'Stockholm', time: '50 min', desc: 'E4 söderut mot Haninge, sen skylt mot Dalarö och Smådalarö.', icon: '🚗' },
    ],
    harbors: [{ name: 'Smådalarö Gästhamn', desc: 'Hamn vid Smådalarö Gård — full service, bra skydd, populär sommarhamn.', spots: 60, fuel: true, service: ['El', 'Vatten', 'Duschar', 'Tvätt'] }],
    restaurants: [{ name: 'Smådalarö Gård Restaurant', type: 'Restaurang', desc: 'Skärgårdsmat med lokala råvaror i historisk herrgårdsmiljö.' }],
    tips: ['Boka spa-tider långt i förväg — särskilt helger juli–augusti.', 'Smådalarö Gård är broförbunden — ingen båt krävs.', 'Brunch på helger är populär även för icke-hotellgäster (bokas i förväg).'],
    related: ['dalaro', 'orno', 'toro'],
    tags: ['spa-hotell', 'herrgård', 'broförbunden', 'södra', 'sabis'],
    did_you_know: 'Smådalarö Gård byggdes 1810 av kapten Per Niklas Blom efter att han 1802 köpt hela "Tyresö skärgården" från grevinnan Brita Bonde för 12 000 riksdaler. Efter renoveringen 2021 är Gården ett av Sveriges mest påkostade spa-hotell med 118 rum och 2 000 m² spa.',
  },

  {
    slug: 'morko',
    name: 'Mörkö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌊',
    tagline: 'Rå söderskärgård med orörd natur och gamla traditioner',
    description: [
      'Mörkö är en liten, lugn ö i södra skärgården som erbjuder en enkel och autentisk skärgårdsupplevelse långt från turistströmmarna. Ön förblir lugn trots att den är bilfärjebetjänad.',
      'Naturen på Mörkö är varierad med skogspartier och klippor. Det finns möjligheter för båd och enkel vistelse. Service är minimal — ingen restaurang men en handelsbod för grundbehov.',
      'Mörkö passar för den som redan är ute i södra skärgården och letar efter ett lugnt ankringsläge.'
    ],

    facts: { travel_time: '1 h 45 min från Stockholm', character: 'Rå, genuin, fiskartradition', season: 'Maj–oktober', best_for: 'Fiske, natur, äkta skärgård' },
    activities: [
      { icon: '🎣', name: 'Fiske', desc: 'Abborre och gädda i vikarna, havsöring längs ytterkusten.' },
      { icon: '🥾', name: 'Vandring', desc: 'Omarkerade stigar längs kusten med vyer mot Östersjön.' },
    ],
    accommodation: [{ name: 'Mörkö Stugor', type: 'Stugor', desc: 'Enkla stugor att hyra, boka via ön.' }],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via E4/Hölö', time: '1 h', desc: 'Mörköbron från Hölö-sidan (avtag från E4) — fast broförbindelse sedan 1972.', icon: '🚗' },
      { method: 'Bil + bilfärja', from: 'Sorunda/Grödinge', time: '1 h 15 min', desc: 'Trafikverkets avgiftsfria färja Skanssund från Sorunda-sidan, två turer i timmen.', icon: '⛴' },
    ],
    harbors: [{ name: 'Mörkö hamn', desc: 'Enkel gästbrygga med begränsat antal platser.', spots: 12 }],
    restaurants: [],
    tips: ['Ta med proviant — service är minimal.', 'Kontakta ö-borna för lokaltips.'],
    related: ['orno', 'dalaro', 'fjardlang'],
    tags: ['fiske', 'genuin', 'södra', 'orört'],
    did_you_know: 'Mörkö är broförbundet med fastlandet sedan 1972 (Mörköbron från Hölö-sidan) men kan också nås via Trafikverkets avgiftsfria färja Skanssund från Sorunda-Grödinge — en av få platser där en fast bro och en gratisfärja båda finns kvar parallellt.',
  },

  {
    slug: 'musko',
    name: 'Muskö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: 'anchor',
    tagline: 'Gamla marinbasen — berghällshamnar och industrihistoria',
    description: [
      'Muskö är en större ö i södra skärgården som erbjuder varierad natur och en blandning av fast befolkning och sommargäster. Ön är bilfärjebetjänad och erbjuder goda möjligheter för längre vistelse.',
      'Muskö kombinerar skogsrika områden med öppna partier och väl utvecklad kustlinje. Det finns flera hamnar, restauranger och kaféer. Cykelvägar löper längs vägnätet.',
      'Muskö passar för familjer som söker ett lugnt alternativ till de populäraste södra öarna.'
    ],

    facts: { travel_time: '1 h 30 min från Stockholm', character: 'Industrihistoria, klippor, halvö', season: 'Maj–oktober', best_for: 'Historia, klippbad, natur' },
    activities: [
      { icon: '🏛', name: 'Marinbasens museum', desc: 'Guidade turer i den underjordiska berganläggningen (bokningsbar).' },
      { icon: '🏊', name: 'Klippbad', desc: 'Fina badplatser längs sydkusten med klara vatten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bil via tunnel', from: 'Stockholm via Haninge', time: '1 h', desc: 'Muskötunneln (3 km, max 65 m under havsytan, invigd 1964) — Sveriges första undervattenstunnel för bilar, byggd för örlogsbasen.', icon: '🚗' }],
    harbors: [{ name: 'Muskö gästbrygga', desc: 'Enkel brygga nära gamla marininfarten.', spots: 10 }],
    restaurants: [],
    tips: ['Boka marinbas-tur i god tid, populärt sommartid.', 'Ta med fika och grillmat.'],
    related: ['dalaro', 'toro', 'galo'],
    tags: ['marinbas', 'industrihistoria', 'södra', 'klippor'],
    did_you_know: 'Musköbasen är en av världens största underjordiska örlogsbaser — 1,5 miljoner kubikmeter berg sprängdes ut under 19 års byggtid (klar 1969), större volym än Gamla stan i Stockholm. Tunneln dit (Muskötunneln, invigd 1964) går max 65 meter under havsytan.',
  },

  {
    slug: 'bjorko',
    name: 'Björkö (Birka)',
    region: 'mellersta',
    regionLabel: 'Mälaren',
    emoji: '⚔️',
    tagline: 'Vikingastaden Birka — UNESCO-världsarv i Mälaren',
    description: [
      'Björkö är en historisk ö i mellersta skärgården som erbjuder ett fascinererande samband mellan vikingatid och modernt skärgårdsliv. Ön är populär bland historieintresserade och familjer.',
      'Arkäologiska utgrävningar och museet på Björkö berättar om vikingasamhället som blomstrade här för över tusen år sedan. Naturmässigt är ön varierad med skog och badplatser.',
      'Björkö nås enkelt från Stockholm och passar perfekt som dagsdestination för familjer med intresse för historia. Kombinationen av arkeologi och skärgårdsnatur gör den unik.'
    ],

    facts: { travel_time: '3 h t/r från Stockholm med båt', character: 'UNESCO, viking, Mälaren', season: 'Maj–september', best_for: 'Historia, arkeologi, kultur' },
    activities: [
      { icon: '⚔️', name: 'Birkas museum', desc: 'Utställning om vikingatidens handel och samhälle.' },
      { icon: '⛏', name: 'Arkeologisk visning', desc: 'Guidade turer till gravhögar och vallgravar (på engelska och svenska).' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Båt (M/S Birka)', from: 'Stockholm Stadshuskajen', time: '3 h', desc: 'Reguljär daglig trafik maj–september.', icon: '⛴' }],
    harbors: [{ name: 'Björkö brygga', desc: 'Turistbåtsbrygga med gästmöjligheter.', spots: 20 }],
    restaurants: [{ name: 'Birka Bistro', type: 'Restaurang', desc: 'Enkel mat och fika nära museet.' }],
    tips: ['Boka biljett online — populärt sommartid.', 'Kombinera med Adelsö på samma dagstur.', 'Ta solkräm — lite träd på ön.'],
    related: ['adelsjo', 'vaxholm', 'fjaderholmarna'],
    tags: ['UNESCO', 'vikingar', 'historia', 'Mälaren', 'dagstur'],
    did_you_know: 'Björkö är platsen för Birka, en av Nordens viktigaste vikingatida handelsstäder. UNESCO-platsen är aktiv arkeologisk utgrävning än idag.',
  },

  {
    slug: 'adelsjo',
    name: 'Adelsö',
    region: 'mellersta',
    regionLabel: 'Mälaren',
    emoji: '👑',
    tagline: 'Kungsgård och medeltida kyrka vid Birkas granne',
    description: [
      'Adelsö är en större ö som erbjuder lugn, historia och en varierad natur. Ön är tillgänglig både för bilister och båtturister och kombinerar kulturhistoria med naturupplevelse.',
      'Adelsö har en lång historisk tradition med gamla sätesgårdar och kyrka från medeltiden. Naturmässigt erbjuder öns vägnät möjligheter för cykling och vandring.',
      'Adelsö passar för familjer som söker en balanserad blandning av historia, natur och service.'
    ],

    facts: { travel_time: '30 min från Björkö', character: 'Kungsgård, medeltida, lugn', season: 'Maj–september', best_for: 'Historia, cykling, kulturlandskap' },
    activities: [
      { icon: '👑', name: 'Hovgårdens kungsgård', desc: 'Gamla kungsgården med utsikt mot Birka och Mälaren.' },
      { icon: '⛪', name: 'Adelsö kyrka', desc: 'Romansk medeltidskyrka från slutet av 1100-talet, byggd som sockenkyrka och husfromskyrka för kungsgården Alsnö hus.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bilfärja', from: 'Munsö', time: '10 min', desc: 'Kort bilfärjeöverfart till Adelsö.', icon: '⛴' }],
    harbors: [{ name: 'Adelsö gästbrygga', desc: 'Enkel brygga med plats för ett dussin båtar.', spots: 12 }],
    restaurants: [],
    tips: ['Kombinera med Björkö/Birka på samma dag.', 'Hyr cykel för att utforska hela ön.'],
    related: ['bjorko', 'vindo', 'fjaderholmarna'],
    tags: ['kungsgård', 'historia', 'Mälaren', 'medeltid', 'cykling'],
    did_you_know: 'Adelsö hyser Hovgården — en kungsgård från vendel- och vikingatiden — och tillsammans med Birka på grannön Björkö är platsen sedan 1993 upptagen på UNESCO:s världsarvslista.',
  },

  {
    slug: 'ingaro',
    name: 'Ingarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Stor bro-ö med stränder, skog och seglarhamnar',
    description: [
      'Ingarö är en större och väl bebyggd ö öst om Stockholm som erbjuder lugn och möjligheter för natur nära Stockholm. Ön är bilfärjebetjänad och erbjuder goda förbindelser.',
      'Ingarö kombinerar bosättningar med naturområden och väl utvecklad infrastruktur. Det finns restauranger, kaféer och butiker. Vandringsstigar och badplatser erbjuder naturupplevelse.',
      'Ingarö passar perfekt för stockholmsbor som söker skärgårdsupplevelse utan båt, eller som bas för längre cykelresor.'
    ],

    facts: { travel_time: '45 min från Stockholm', character: 'Bro-ö, skog, tillgänglig', season: 'Hela året', best_for: 'Segling, bad, friluftsliv' },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Många naturhamnar längs syd- och östkusten.' },
      { icon: '🏊', name: 'Bad', desc: 'Flertalet badplatser med klara vatten och klippor.' },
    ],
    accommodation: [{ name: 'Ingarö Camping', type: 'Camping', desc: 'Välskött campingplats vid vattnet.' }],
    getting_there: [{ method: 'Bil/bro', time: '45 min', desc: 'Via Gustavsbergsleden, bro till Ingarö.', icon: '🚗' }],
    harbors: [{ name: 'Brunns hamn', desc: 'Populär gästhamn med full service.', spots: 50, fuel: true, service: ['El', 'Vatten', 'Duschar'] }],
    restaurants: [{ name: 'Ingarö Krog', type: 'Restaurang', desc: 'Skärgårdskrog med lokalt fångad fisk.' }],
    tips: ['Populärt utflyktsmål för stockholmare — undvik veckoslutshelger i juli.'],
    related: ['vindo', 'gallno', 'moja'],
    tags: ['tillgänglig', 'skog', 'segling', 'bad', 'mellersta'],
    did_you_know: 'Ingarö är känt för att ha ett av Stockholms läns varmaste badvatten om sommaren — skyddade vikar värms snabbt upp av solen.',
  },

  {
    slug: 'svenska-hogarna',
    name: 'Svenska Högarna',
    region: 'norra',
    regionLabel: 'Norra ytterskärgården',
    emoji: '🪨',
    tagline: 'Norra ytterskärgårdens ostligaste utpost — Heidenstam-fyr och naturreservat',
    description: [
      'Svenska Högarna är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård — ca 18 distansminuter rakt öster om Möjas nordspets. Ön nämns redan 1488 i skrifter från Julita kloster, då som kronohamnsfiske där munkar bytte till sig saltad strömming mot avlat.',
      'På Storön byggdes 1855 en träbåk som 1874 ersattes av en järnfyr ritad av Gustaf von Heidenstam — den enda Heidenstam-fyren i Stockholms skärgård. Fyrtornet tillverkades på Ludvigsbergs Verkstad i Stockholm. Fyren automatiserades 1966 och avbemannades 1968.',
      'Området är naturreservat sedan 1976. Ön är inte bebodd permanent men besöks av seglare som söker den yttre skärgårdens orörda klipplandskap.',
    ],
    facts: {
      travel_time: '5–7 h med segelbåt från Möja/Sandhamn',
      character: 'Extrem ytterskärgård, fyrplats, naturreservat',
      season: 'Juni–augusti',
      best_for: 'Erfarna seglare, fågelskådare, fyr-entusiaster',
    },
    activities: [
      { icon: '🗼', name: 'Heidenstam-fyren', desc: 'Stockholms skärgårds enda Heidenstam-fyr (1874). Fortfarande aktiv farledsfyr.' },
      { icon: '🌅', name: 'Öppet hav', desc: 'En av skärgårdens absolut mest exponerade utsiktsplatser — ingenting öster om dig förrän Åland.' },
      { icon: '🐦', name: 'Fågelliv', desc: 'Naturreservat med rikt häckande sjöfågel — silltrut, ejder, tordmule.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Möja/Sandhamn', time: '5–7 h', desc: 'Inga reguljära förbindelser. Kräver erfaren besättning och stabil väderprognos.', icon: '⛵' }],
    harbors: [{ name: 'Svenska Högarnas naturhamn', desc: 'Liten skyddad vik på Storön. Endast i gott väder.', spots: 8 }],
    restaurants: [],
    tips: ['Kontrollera SMHI noggrant — vid sydväst eller ostlig kuling är hamnen svår att lämna.', 'Fulltanka i Sandhamn eller Möja innan avfärd.', 'Naturreservatets regler gäller — respektera fågelhäckning april–juli.'],
    related: ['sandhamn', 'rodloga', 'huvudskar'],
    tags: ['ytterskärgård', 'heidenstam', 'fyr', 'naturreservat', 'segling'],
    did_you_know: 'Svenska Högarna är den enda platsen i Stockholms skärgård där det står en Heidenstam-fyr — Gustaf von Heidenstams banbrytande öppna järntornkonstruktion (samma typ som Pater Noster utanför Marstrand). Fyren restes 1874 och tillverkades på Ludvigsbergs Verkstad i Stockholm.',
  },

  {
    slug: 'huvudskar',
    name: 'Huvudskär',
    region: 'södra',
    regionLabel: 'Södra ytterskärgården',
    emoji: '🏮',
    tagline: 'Gammal lotsplats i ytterskärgården mellan Sandhamn och Landsort',
    description: [
      'Huvudskär ligger i yttersta havsbandet, ungefär mitt emellan Sandhamn och Landsort och utgör skärgårdens sydostliga utpost från Ornö-området. Ön består av tre större skär — Ålandsskär, Lökskär och Manskär — plus grupper av mindre skär som tillsammans skyddar den naturliga hamnen på Ålandsskärs insida.',
      'En signalstång och lotsvaktstuga uppfördes 1861 och en brygga 1865. Fram till 1881 var Huvudskär uppassningsställe under Dalarö lotsplats; därefter blev ön egen lotsplats med tre lotsar i fast tjänst — engelska ångare och segelfartyg som sökte sig upp i Östersjön gjorde stationen nödvändig. Lotsplatsen lades ned 1939 och fram till 1925 fanns även tullbevakning på ön.',
      'Idag är Huvudskär obebodd och en av södra skärgårdens mest älskade naturhamnar för seglare. Skärgårdsstiftelsen förvaltar området.',
    ],
    facts: {
      travel_time: '4–5 h med segelbåt från Sandhamn / Dalarö',
      character: 'Yttersta havsbandet, gammal lotsplats, naturhamn',
      season: 'Juni–augusti',
      best_for: 'Erfarna seglare, naturhamn, fågelliv',
    },
    activities: [
      { icon: '🏮', name: 'Lotshistoria', desc: 'Bevarade lotsbyggnader från 1860-talet — guidning sommartid via Skärgårdsstiftelsen.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på Ålandsskärs insida — en klassiker bland erfarna seglare.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Rikt sjöfågelliv i ytterskärgården.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Sandhamn / Dalarö', time: '4–5 h', desc: 'Inga reguljära förbindelser. Kräver erfaren besättning och stabil väderprognos.', icon: '⛵' }],
    harbors: [{ name: 'Huvudskärs naturhamn', desc: 'Välskyddad naturhamn mellan Ålandsskär och övriga skär.', spots: 25 }],
    restaurants: [],
    tips: ['Vid sydväst är det svårt att lämna hamnen — kontrollera SMHI noga innan avfärd.', 'Ta med all proviant — ingen service finns.', 'Lotshusen sköts av Skärgårdsstiftelsen — respektera anvisningar.'],
    related: ['sandhamn', 'landsort', 'svenska-hogarna'],
    tags: ['ytterskärgård', 'lotsplats', 'naturhamn', 'segling', 'södra'],
    did_you_know: 'Huvudskär var självständig lotsplats med tre fast anställda lotsar från 1881 till 1939 — anlagd för att möta de engelska ångare och segelfartyg som ökade trafiken till Stockholm under sent 1800-tal.',
  },

  {
    slug: 'ramskar',
    name: 'Ramskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Mindre naturskär med klippig kust och stilla naturhamn',
    description: [
      'Ramskär är ett mindre naturskär i Stockholms mellersta skärgård. Det finns flera "Ramskär" i skärgården — det här ligger i området kring Möja och fungerar som klassisk naturhamn för seglare som söker en lugnare övernattning utanför de större öarna.',
      'Skäret är obebodd, har klippig kust och fungerar bäst som ett kort etappmål. Inga reguljära förbindelser, ingen service.',
      'Ramskär passar för erfarna seglare som vill ankra i en ostörd naturhamn längs Möja-leden.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Stavsnäs', character: 'Litet naturskär, ankring, ostört', season: 'Juni–augusti', best_for: 'Segling, övernattning i naturhamn' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
      { icon: '🛶', name: 'Kajak', desc: 'Lugna vatten i lämpliga vindar.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Ramskärs naturhamn', desc: 'Skyddad ankringsplats med begränsat antal platser.', spots: 5 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — ta med soporna hem.', 'Ta med all proviant.'],
    related: ['gallno', 'moja', 'bullero'],
    tags: ['naturhamn', 'ankring', 'mellersta', 'segling'],
    did_you_know: 'Stockholms skärgård innehåller ett tjugotal öar och skär som heter "Ramskär" eller "Ramsö" — namnet kommer av fornsvenskt "ram" (kantig/skarp), en vanlig benämning på klippiga småskär.',
  },

  {
    slug: 'ekno',
    name: 'Eknö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'leaf',
    tagline: 'Mindre bilfri ö med sommarstugor i mellersta skärgården',
    description: [
      'Eknö är en mindre bilfri ö i Stockholms mellersta skärgård, främst sommarstugebebyggelse och naturmark. Ön är inte ett etablerat dagturmål — service är minimal och inga reguljära turistförbindelser går dit.',
      'Den som besöker kommer oftast med egen båt eller via båttaxi från Stavsnäs. Klippig kust, mindre badplatser och stilla skogsmiljö präglar ön.',
      'Eknö passar för den som söker en lugn naturhamn under en längre seglingstur, eller för sommargäster med eget boende på ön.',
    ],
    facts: { travel_time: '2 h med egen båt från Stavsnäs', character: 'Liten, bilfri, sommarstugor', season: 'Maj–september', best_for: 'Naturvistelse, segling, sommarboende' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar i blandskog längs kusten.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Mindre klippbadsplatser längs öns kust.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs', desc: 'Inga reguljära turlinjer — kontakta båttaxi om egen båt saknas.', icon: '⛵' }],
    harbors: [{ name: 'Eknö brygga', desc: 'Liten brygga med begränsat antal platser.', spots: 8 }],
    restaurants: [],
    tips: ['Ta med all proviant — ingen butik finns.', 'Respektera de bofasta sommargästernas tomter.'],
    related: ['namdo', 'gallno', 'moja'],
    tags: ['liten ö', 'bilfri', 'sommarstugor', 'mellersta'],
    did_you_know: 'Det finns flera "Eknö" och "Ekö" i Stockholms skärgård — namnet syftar på de ekar som tidigare var vanliga i dessa områden men idag är ovanliga längre norrut än Mälaren.',
  },

  {
    slug: 'hasselo',
    name: 'Hasselö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌻',
    tagline: 'Mindre naturö i södra skärgården för seglare',
    description: [
      'Hasselö är en mindre ö i Stockholms södra skärgård. Ön är obebodd permanent och saknar service — den fungerar primärt som naturhamn och avlastningsstopp för seglare som rör sig mellan Dalarö, Utö och de mer avlägsna sydliga öarna.',
      'Klippig kust och mindre tallskogspartier präglar landskapet. Inga turistanläggningar, inga reguljära förbindelser.',
      'Hasselö passar erfarna seglare som söker en kort övernattning i en lugn naturhamn snarare än ett självständigt resmål.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Dalarö', character: 'Liten, obebodd, naturhamn', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Rena vatten längs öns klippkust.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på nordvästsidan.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Dalarö / Utö', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Hasselö naturhamn', desc: 'Liten skyddad ankringsplats på nordvästsidan.', spots: 6 }],
    restaurants: [],
    tips: ['Ta med all proviant — ingen service finns.', 'Vid sydliga vindar är hamnen mindre skyddad.'],
    related: ['fjardlang', 'toro', 'asko'],
    tags: ['liten ö', 'naturhamn', 'södra', 'segling'],
    did_you_know: 'Stockholms södra skärgård innehåller mer än 7 000 öar, kobbar och skär — varav många mindre öar som Hasselö huvudsakligen besöks av seglare som söker ostörda naturhamnar mellan Dalarö, Utö och Landsort.',
  },

  {
    slug: 'ormsko',
    name: 'Ormskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Mindre naturskär — klippig naturhamn för seglare',
    description: [
      'Ormskär är ett mindre naturskär i Stockholms mellersta skärgård. Ön är obebodd och saknar service. Klippig kust och stilla vatten i lä-läge präglar miljön.',
      'Skäret fungerar som naturhamn för seglare som söker en lugnare övernattning utanför de större öarna. Inga reguljära förbindelser går hit.',
      'Ormskär passar för erfarna seglare som söker en kort övernattning i en ostörd naturhamn.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Stavsnäs', character: 'Litet naturskär, ankring, ostört', season: 'Juni–augusti', best_for: 'Segling, ankring' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Naturhamn med skydd i lämpliga vindar.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Korta promenader längs öns klippkust.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Ormskärs naturhamn', desc: 'Liten skyddad ankringsplats.', spots: 8 }],
    restaurants: [],
    tips: ['Känslig för sydvästliga vindar.', 'Ta med all proviant.'],
    related: ['gallno', 'moja', 'ramskar'],
    tags: ['naturhamn', 'ankring', 'mellersta', 'segling'],
    did_you_know: 'Det finns flera "Ormsö" och "Ormskär" i svenska skärgårdar — namnet kommer av fornsvenskans "orm" som betyder både orm och drake/sjöormgestalt och var ett vanligt namn för smala, slingrande öar.',
  },

  {
    slug: 'ljusnas',
    name: 'Ljusnäs',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌅',
    tagline: 'Mindre naturö i norra skärgården',
    description: [
      'Ljusnäs är ett mindre namnnav i Stockholms norra skärgård i Norrtälje-området. Ön är obebodd permanent — sommartid finns ett mindre antal sommarstugor i området.',
      'Service saknas helt. Ön nås med egen båt och fungerar som ankringsplats för seglare på Furusunds- och Roslagsleden.',
      'Ljusnäs passar för seglare som söker en lugn naturhamn snarare än en självständig destination.',
    ],
    facts: { travel_time: '2–3 h med egen båt från Norrtälje/Furusund', character: 'Litet, ostört, naturhamn', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Liten naturhamn för seglare.' },
      { icon: '🌅', name: 'Solnedgång', desc: 'Vid lämplig vind är västsidan fin för kvällsvyer.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Norrtälje / Furusund', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Ljusnäs brygga', desc: 'Enkel ankringsplats med begränsat antal platser.', spots: 6 }],
    restaurants: [],
    tips: ['Ta med all proviant.', 'Respektera privata sommartomter.'],
    related: ['blido', 'fejan', 'rodloga'],
    tags: ['liten ö', 'naturhamn', 'norra', 'segling'],
    did_you_know: 'Stockholms norra skärgård i Norrtälje kommun har över 1 200 namngivna öar och skär — många av dem är, liksom Ljusnäs, små obebodda öar utan reguljära förbindelser.',
  },

  {
    slug: 'kanholmen',
    name: 'Kanholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⚓',
    tagline: 'Mindre ö vid Kanholmsfjärden — naturhamn på vägen mot Sandhamn',
    description: [
      'Kanholmen ligger vid Kanholmsfjärden i Stockholms mellersta skärgård, mellan Värmdö-områdets inre skärgård och de yttre öarna mot Sandhamn. Ön är obebodd permanent och saknar service.',
      'Klippor och en skyddad naturhamn på lä-sidan gör Kanholmen till ett klassiskt mellanstopp för seglare på väg mot Sandhamn eller Stavsnäs-leden.',
      'Kanholmen passar som naturhamn för en kortare övernattning under en längre seglingstur.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Stavsnäs', character: 'Liten naturhamn, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare på väg mot Sandhamn.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klart vatten runt öns klippkust.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Sandhamn', desc: 'Enbart nåbar med båt — inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Kanholmens naturhamn', desc: 'Välskyddad ankringsplats på lä-sidan.', spots: 30 }],
    restaurants: [],
    tips: ['Kom tidigt — populär hamn fylls fort midsommar–juli.', 'Allemansrätten gäller — ta med soporna hem.'],
    related: ['sandhamn', 'gallno', 'ingmarso'],
    tags: ['naturhamn', 'ankring', 'mellersta', 'segling'],
    did_you_know: 'Kanholmsfjärden, där Kanholmen ligger, är en av Stockholms skärgårds mest trafikerade vatten under sommaren — den fungerar som huvudled för seglare och motorbåtar mellan Värmdö och Sandhamn.',
  },

  {
    slug: 'norrpada',
    name: 'Norrpada',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🦩',
    tagline: 'Liten skärgårdsö med fågelliv och naturhamn',
    description: [
      'Norrpada är en mindre skärgårdsö i Stockholms mellersta skärgård, i området kring Möja. Ön är obebodd permanent och fungerar primärt som naturhamn för seglare och kajakpaddlare.',
      'Klippig kust, stilla vikar och rikt sjöfågelliv präglar miljön. Inga reguljära förbindelser, ingen service.',
      'Norrpada passar för erfarna seglare och paddlare som söker en lugnare naturhamn.',
    ],
    facts: { travel_time: '2–3 h med segelbåt eller kajak från Stavsnäs', character: 'Liten naturö, fågelliv, ankring', season: 'Juni–augusti', best_for: 'Fågelskådning, kajak, segling' },
    activities: [
      { icon: '🦩', name: 'Fågelliv', desc: 'Sjöfåglar som silltrut, fisktärna och ejder häckar i området.' },
      { icon: '🛶', name: 'Kajak', desc: 'Stilla vatten längs öns lä-sida.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt/kajak', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Norrpada naturhamn', desc: 'Liten skyddad ankringsplats.', spots: 5 }],
    restaurants: [],
    tips: ['Respektera fågelhäckning april–juli.', 'Ta med all proviant.'],
    related: ['gallno', 'bullero', 'ramskar'],
    tags: ['fågelliv', 'kajak', 'naturhamn', 'mellersta'],
    did_you_know: 'Stockholms skärgård har över 25 000 öar, kobbar och skär — varav många mindre fågelrika öar som Norrpada. Många är skyddade som naturreservat med tillträdesförbud under fågelhäckningssäsongen april–juli.',
  },

  {
    slug: 'graskar',
    name: 'Gräskär',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🪨',
    tagline: 'Mindre naturskär i norra skärgården',
    description: [
      'Gräskär är ett mindre naturskär i Stockholms norra skärgård. Det finns flera "Gräskär" i skärgårdsområdet — det här ligger i Norrtälje-området och är en obebodd klippkobbe utan service.',
      'Skäret fungerar som naturhamn för seglare som söker en kort övernattning utanför de större öarna. Inga reguljära förbindelser.',
      'Gräskär passar för erfarna seglare som vill ankra i ett ostört naturhamn längs den norra Roslags-kusten.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Norrtälje', character: 'Litet naturskär, ankring, ostört', season: 'Juni–augusti', best_for: 'Segling, ankring' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn i lämpliga vindar.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Korta promenader längs klippkusten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Norrtälje / Furusund', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Gräskärs naturhamn', desc: 'Begränsad ankringsmöjlighet.', spots: 6 }],
    restaurants: [],
    tips: ['Vid sydlig vind är hamnen mindre skyddad.', 'Ta med all proviant.'],
    related: ['fejan', 'rodloga', 'arholma'],
    tags: ['naturhamn', 'ankring', 'norra', 'segling'],
    did_you_know: '"Gräskär" är ett av de vanligaste ö-namnen i den svenska östkustskärgården — det syftar på att gräs (i motsats till bara klippa) växer på ön. Det finns över ett dussin Gräskär bara i Stockholms och Roslagens skärgård.',
  },

  {
    slug: 'lindholmen',
    name: 'Lindholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🛶',
    tagline: 'Mindre naturö för kajak och segling',
    description: [
      'Lindholmen är en mindre obebodd ö i Stockholms mellersta skärgård. Det finns flera "Lindholmen" i skärgården — det här fungerar som naturhamn och paddlingsstopp för seglare och kajakpaddlare.',
      'Klippig kust och blandad skogsmiljö präglar ön. Service saknas helt och inga reguljära turistförbindelser går hit.',
      'Lindholmen passar för kajakpaddlare som söker en lugn övernattning och seglare som vill ankra utanför de större öarna.',
    ],
    facts: { travel_time: '1,5–2 h med segelbåt eller kajak från Stavsnäs', character: 'Liten naturö, kajak, ankring', season: 'Juni–augusti', best_for: 'Kajak, segling, naturvistelse' },
    activities: [
      { icon: '🛶', name: 'Kajak', desc: 'Stilla vatten lämpliga för paddling i lämpligt väder.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt/kajak', from: 'Stavsnäs', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Lindholmens naturhamn', desc: 'Liten ankringsplats med begränsat antal platser.', spots: 10 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — lämna inga spår.', 'Ta med all proviant.'],
    related: ['gallno', 'vindo', 'namdo'],
    tags: ['kajak', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: '"Lindholmen" är ett mycket vanligt ö-namn i Stockholms skärgård — det syftar på att lindar (Tilia cordata) historiskt växte på ön, eller på fornsvenskans "linda" för betesäng.',
  },

  {
    slug: 'iggon',
    name: 'Iggö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Mindre ö i Roslagens skärgård',
    description: [
      'Iggö är en mindre ö i Stockholms norra skärgård / Roslagens skärgård. Ön är obebodd permanent och saknar service.',
      'Klippkust och stilla naturhamn präglar miljön. Inga reguljära förbindelser går hit.',
      'Iggö passar erfarna seglare som söker en kort övernattning i ostörd naturhamn längs Roslagskusten.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Norrtälje', character: 'Liten ö, ankring, ostört', season: 'Juni–augusti', best_for: 'Segling, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på lä-sidan.' },
      { icon: '🏊', name: 'Havsbad', desc: 'Klara Östersjövatten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Norrtälje / Furusund', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Iggö naturhamn', desc: 'Liten ankringsplats.', spots: 8 }],
    restaurants: [],
    tips: ['Ta med all proviant.', 'Allemansrätten gäller.'],
    related: ['arholma', 'fejan', 'blido'],
    tags: ['ostörd', 'norra', 'ytterskärgård', 'klippor'],
    did_you_know: 'Iggön är en av få öar i skärgården med aktiv lantbruksdrift. Korna ses ofta vada i havet under sommarvärmen.',
  },

  {
    slug: 'langviksskaret',
    name: 'Långvikssk​äret',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌅',
    tagline: 'Övernattningsö med solnedgångsvyer mot Östersjön',
    description: [
      'Långviksskäret i södra skärgården är ett populärt övernattningsscenario för seglare. Utsikten mot öppet hav och solnedgångarna är svåra att slå.',
      'Långviksskäret kombinerar naturvärdena på ett exponerat läge med möjligheter för enkelt ankörning. Badplatser och möjligheter för naturupplevelse erbjuds.',
      'Långviksskäret passar för erfarna seglare som letar efter dramatisk natur och spektakulära solnedgångar på väg söderut.'
    ],

    facts: { travel_time: '3 h från Stockholm', character: 'Naturhamn, utsikt, södra', season: 'Juni–september', best_for: 'Segling, övernattning, solnedgång' },
    activities: [
      { icon: '🌅', name: 'Solnedgångsvyer', desc: 'Dramatisk horisont mot öppet hav.' },
      { icon: '⛵', name: 'Ankring', desc: 'Naturlig ankringsplats med bra skydd.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långviksskärets naturhamn', desc: 'Skyddad vik.', spots: 10 }],
    restaurants: [],
    tips: ['Perfekt för midsommar-firande.'],
    related: ['fjardlang', 'nattaro', 'landsort'],
    tags: ['solnedgång', 'segling', 'södra', 'naturhamn'],
    did_you_know: 'Stockholms södra ytterskärgård kännetecknas av små klippiga skär — många, som Långviksskäret, fungerar som naturhamnar för seglare och kajakpaddlare som söker en lugn övernattning utanför de större öarna.',
  },

  {
    slug: 'toro-norra',
    name: 'Norra Torö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌾',
    tagline: 'Norra delen av Torö — strandängar och jordbrukslandskap',
    description: [
      'Norra Torö ligger i Stockholms södra skärgård i Nynäshamns kommun, broförbunden med fastlandet via Torö bro. Ön har öppet jordbrukslandskap med betade strandängar och en blandning av sommarstugor och permanentboende.',
      'Den norra delen av ön nås landvägen från Nynäshamn och är populär för dagsutflykter — Torö stenstrand i söder är en av Stockholms läns mest unika kuststräckor med stora ronda strandstenar.',
      'Norra Torö passar för en lugn dagstur med fokus på vandring, fågelskådning och strandängar.',
    ],
    facts: { travel_time: '1 h med bil från Stockholm', character: 'Bilförbunden, jordbruk, strandängar', season: 'April–oktober', best_for: 'Dagsutflykt, fågelskådning, vandring' },
    activities: [
      { icon: '🌾', name: 'Strandängar', desc: 'Promenera längs betade strandängar med fågelliv.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Vadare och tärnor längs kustlinjen.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bil', from: 'Stockholm via Nynäshamn', time: '1 h', desc: 'Bilväg via Nynäshamn och Torö bro.', icon: '🚗' }],
    harbors: [{ name: 'Norra Torös gästbrygga', desc: 'Enkel brygga med begränsat antal platser.', spots: 8 }],
    restaurants: [],
    tips: ['Respektera betesdjur och strandängarnas naturvärden.', 'Kombinera gärna med Torö stenstrand i söder.'],
    related: ['toro', 'galo', 'orno'],
    tags: ['bilförbunden', 'södra', 'strandäng', 'lugnt'],
    did_you_know: 'Torö är broförbunden med fastlandet via Herrhamras bro och Torö bro — en av få öar i Stockholms södra skärgård som man kan köra bil till.',
  },

  {
    slug: 'garnsjon',
    name: 'Östra Lagnö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Halvö och brygga vid Östra Lagnö i mellersta skärgården',
    description: [
      'Östra Lagnö ligger på Vaxholms östra sida — en halvö med brygga som trafikeras av Waxholmsbolagets skärgårdsbåtar mot Möja, Sandhamn och Söderöra. Området är populärt för sommarstugor och båttrafik mer än som självständigt utflyktsmål.',
      'Bryggan vid Östra Lagnö är ett naturligt anslutningsstopp för seglare som söker mellanlandning på vägen ut i mellersta skärgården. Service är begränsad — i området finns sommarstugor och privata gårdar, inga större anläggningar.',
      'Östra Lagnö passar för den som söker ett lugnt anslutningsstopp eller använder det som start/slutpunkt för en kortare båttur.',
    ],
    facts: { travel_time: '40 min med bil från Stockholm', character: 'Halvö, brygga, sommarstugor', season: 'Maj–september', best_for: 'Anslutningsstopp, sommarboende, kortare båtutflykt' },
    activities: [
      { icon: '⛴', name: 'Båtanslutning', desc: 'Skärgårdsbåtar från Östra Lagnö brygga mot Möja och längre ut.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykelvägar i Vaxholms-området.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Vaxholm', time: '40 min', desc: 'Bilväg via Vaxholm.', icon: '🚗' },
      { method: 'Skärgårdsbåt', from: 'Strömkajen / Vaxholm', time: '1–2 h', desc: 'Waxholmsbolaget trafikerar Östra Lagnö brygga sommartid.', icon: '⛴' },
    ],
    harbors: [{ name: 'Östra Lagnö brygga', desc: 'Trafikbrygga för Waxholmsbolagets skärgårdslinjer.', spots: 15 }],
    restaurants: [],
    tips: ['Östra Lagnö är primärt en anslutningspunkt — kombinera med en längre båttur till Möja eller Sandhamn.'],
    related: ['vaxholm', 'moja', 'gallno'],
    tags: ['halvö', 'brygga', 'anslutning', 'mellersta'],
    did_you_know: 'Östra Lagnö brygga är en av de viktigaste utgångspunkterna för skärgårdsbåtar i Vaxholms-området — flera linjer mot Möja, Sandhamn och Söderöra utgår eller passerar här.',
  },

  {
    slug: 'storholmen',
    name: 'Storholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Mindre skogsklädd ö med naturhamn',
    description: [
      'Storholmen är en mindre skogsklädd ö i Stockholms mellersta skärgård. Det finns flera "Storholmen" i skärgården — det här är ett klassiskt naturhamnsstopp för seglare på vägen mot Möja eller Sandhamn.',
      'Klippig kust och blandad barrskog präglar miljön. Inga reguljära förbindelser, ingen service.',
      'Storholmen passar för seglare som söker en lugnare övernattning utanför de större öarna.',
    ],
    facts: { travel_time: '2 h med segelbåt från Stavsnäs', character: 'Liten ö, naturhamn, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar genom blandad barrskog.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Storholmens naturhamn', desc: 'Skyddad ankringsplats.', spots: 20 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — eldning bara på anvisad plats.', 'Ta med all proviant.'],
    related: ['gallno', 'moja', 'ingmarso'],
    tags: ['naturhamn', 'ankring', 'mellersta', 'segling'],
    did_you_know: '"Storholmen" är ett av de vanligaste ö-namnen i den svenska östkustskärgården — flera olika öar bär namnet i Stockholms och Roslagens skärgård.',
  },

  {
    slug: 'graskar-sodra',
    name: 'Södra Gräskär',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    tagline: 'Mindre naturskär söder om Ornö — exponerat seglarmål',
    description: [
      'Södra Gräskär ligger söder om Ornö i Stockholms södra skärgård. Det är ett mindre, obebodd klippskär med exponerat läge mot öppet hav.',
      'Skäret saknar service och regulär trafik. Det fungerar som naturhamn för erfarna seglare som söker en exponerad övernattning utanför Ornö.',
      'Södra Gräskär passar enbart för erfarna seglare med god väderprognos och alternativ hamn som backup.',
    ],
    facts: { travel_time: '4–5 h med segelbåt från Dalarö', character: 'Exponerat naturskär, ankring', season: 'Juni–augusti', best_for: 'Erfarna seglare, naturhamn' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Exponerad naturhamn för seglare.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Korta promenader längs klippkusten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Dalarö / Utö', desc: 'Inga reguljära förbindelser. Kräver erfaren besättning.', icon: '⛵' }],
    harbors: [{ name: 'Södra Gräskärs naturhamn', desc: 'Exponerad naturhamn — krävande i dåligt väder.', spots: 5 }],
    restaurants: [],
    tips: ['Kontrollera SMHI noggrant innan avfärd.', 'Ha alternativ hamn (Ornö eller Utö) planerad om vädret slår om.'],
    related: ['orno', 'landsort', 'fjardlang'],
    tags: ['ytterskär', 'naturhamn', 'södra', 'segling'],
    did_you_know: 'Det finns flera "Gräskär" i Stockholms skärgård — namnet är ett av de vanligaste i den svenska östkustskärgården och syftar på att gräs (i motsats till bara klippa) växer på ön.',
  },

  {
    slug: 'ostanvik',
    name: 'Östanvik',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏡',
    tagline: 'Mindre vik och plats i mellersta skärgården — sommarbosättning',
    description: [
      'Östanvik är ett mindre platsnamn i Stockholms mellersta skärgård — det finns flera "Östanvik" i området, vanligen som vikar eller delar av större öar med sommarbosättning. Ön/platsen saknar reguljära turistförbindelser och service.',
      'Den som besöker kommer oftast med egen båt och söker en ostörd naturhamn snarare än en självständig destination.',
      'Östanvik passar för seglare som redan är ute på havet och letar efter ett enkelt, lugnt ankringsläge.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Stavsnäs', character: 'Liten plats, sommarbosättning, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring' },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten och klippor.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad vik för övernattning.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Östanviks naturhamn', desc: 'Liten skyddad naturhamn.', spots: 8 }],
    restaurants: [],
    tips: ['Respektera privata sommartomter.', 'Ta med all proviant.'],
    related: ['gallno', 'moja', 'namdo'],
    tags: ['liten plats', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: '"Östanvik" är ett vanligt platsnamn i den svenska östkustskärgården — det förekommer på flera olika öar och syftar på en vik som ligger på östra sidan.',
  },

  {
    slug: 'langskar',
    name: 'Långskär',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '⛵',
    tagline: 'Mindre långsmalt naturskär i norra skärgården',
    description: [
      'Långskär är ett mindre långsmalt klippskär i Stockholms norra skärgård. Det finns flera "Långskär" i den svenska östkustskärgården — det här ligger i Roslagens skärgård och fungerar som naturhamn för seglare på norrleden.',
      'Skäret är obebodd och saknar service. Klippig kust och stilla vatten i lä-läge präglar miljön.',
      'Långskär passar för seglare som söker en kort övernattning utanför de större öarna.',
    ],
    facts: { travel_time: '2 h med segelbåt från Norrtälje', character: 'Litet långsmalt skär, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på lä-sidan.' },
      { icon: '🌅', name: 'Soluppgångsvyer', desc: 'Öppen östhorisont mot havet.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Norrtälje / Furusund', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långskärs naturhamn', desc: 'Begränsad men skyddad ankringsplats på västsidan.', spots: 6 }],
    restaurants: [],
    tips: ['Kontrollera vindprognosen — skäret är exponerat vid sydvästliga vindar.', 'Ta med all proviant.'],
    related: ['fejan', 'blido', 'arholma'],
    tags: ['naturhamn', 'ankring', 'norra', 'segling'],
    did_you_know: '"Långskär" är ett av de vanligaste ö-namnen i Stockholms och Roslagens skärgård — namnet syftar på den långa, smala formen som många klippskär har.',
  },

  {
    slug: 'vastervik-uto',
    name: 'Västerholmen',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌺',
    tagline: 'Mindre ö i området kring Utö — naturhamn för seglare',
    description: [
      'Västerholmen är ett mindre platsnamn i Stockholms södra skärgård i området kring Utö. Det finns flera "Västerholmen" och "Västerholme" i skärgården — det här är en liten obebodd ö som fungerar som alternativ ankringsplats när huvudhamnar är fullbelagda.',
      'Klippig kust och blomsterrik klippflora präglar ön under högsommaren. Service saknas helt — inga reguljära förbindelser.',
      'Västerholmen passar som alternativ för seglare när Utö gästhamn är fullbelagd.',
    ],
    facts: { travel_time: '3,5 h med segelbåt från Stockholm', character: 'Liten naturö, ankring, alternativ', season: 'Juni–augusti', best_for: 'Segling, ankring, alternativ till Utö' },
    activities: [
      { icon: '🌺', name: 'Klippflora', desc: 'Blomsterrik klippkust under högsommaren.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad ankringsplats — alternativ till trånga Utö.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Utö / Dalarö', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Västerholmens naturhamn', desc: 'Liten ankringsplats.', spots: 15 }],
    restaurants: [],
    tips: ['Bra alternativ när Utö gästhamn är fullbelagd.', 'Ta med all proviant.'],
    related: ['uto', 'nattaro', 'fjardlang'],
    tags: ['liten ö', 'naturhamn', 'södra', 'segling'],
    did_you_know: 'Området kring Utö rymmer flera mindre öar och naturhamnar som fungerar som avlastningsalternativ när Utö huvudhamn är fullbelagd under sommarens högsäsong.',
  },

  {
    slug: 'ramskar-norra',
    name: 'Norra Ramskär',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '⛵',
    tagline: 'Mindre naturskär i Roslagens norra skärgård',
    description: [
      'Norra Ramskär är ett mindre klippskär i Stockholms norra skärgård (Roslagens skärgård). Det finns flera "Ramskär" i skärgården — det här ligger i Norrtälje-området och fungerar som naturhamn för seglare på norrleden.',
      'Skäret är obebodd och saknar service. Klippig kust och stilla vatten i skyddade vikar präglar miljön.',
      'Norra Ramskär passar för seglare som söker en kort övernattning utanför de större öarna på norrleden mot Arholma och Söderarm.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Norrtälje', character: 'Litet naturskär, ankring, ostört', season: 'Juni–augusti', best_for: 'Segling, ankring' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
      { icon: '🎣', name: 'Fiske', desc: 'Abborre och gädda i de skyddade vikarna runt skäret.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Norrtälje / Furusund', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Norra Ramskärs naturhamn', desc: 'Skyddad ankringsplats.', spots: 20 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — ta med soporna hem.', 'Ta med all proviant.'],
    related: ['arholma', 'blido', 'fejan'],
    tags: ['naturhamn', 'ankring', 'norra', 'segling'],
    did_you_know: 'Norrleden — den klassiska seglingsleden norrut från Stockholm via Furusund mot Arholma och vidare mot Söderarm — passerar flera mindre naturskär som fungerar som etappmål.',
  },

  {
    slug: 'aspoja',
    name: 'Aspö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌿',
    tagline: 'Mindre naturö i södra skärgården',
    description: [
      'Aspö är ett vanligt ö-namn i den svenska östkustskärgården — det finns flera Aspö i området. Den här ligger i Stockholms södra skärgård och är en mindre obebodd ö med klippig kust och blandskog.',
      'Service saknas och inga reguljära turistförbindelser går hit. Ön fungerar som naturhamn för seglare som söker en kortare övernattning.',
      'Aspö passar för erfarna seglare som vill ankra i en lugn naturhamn.',
    ],
    facts: { travel_time: '3 h med segelbåt från Dalarö', character: 'Liten naturö, ankring, blandskog', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar genom blandskog längs kusten.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten i skyddade vikar.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Dalarö / Utö', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Aspö naturhamn', desc: 'Enkel ankringsplats.', spots: 8 }],
    restaurants: [],
    tips: ['Allemansrätten gäller.', 'Ta med all proviant.'],
    related: ['orno', 'dalaro', 'morko'],
    tags: ['liten ö', 'naturhamn', 'södra', 'segling'],
    did_you_know: '"Aspö" är ett av de vanligaste ö-namnen i den svenska östkustskärgården — namnet syftar på asp (Populus tremula), ett trädslag som tidigare var vanligt på just dessa öar.',
  },

  {
    slug: 'korsholmen',
    name: 'Korsholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🪨',
    tagline: 'Mindre naturö i mellersta skärgården',
    description: [
      'Korsholmen är ett vanligt platsnamn i Stockholms skärgård — det finns flera "Korsholmen" och "Korsö" i området. Den här är en mindre obebodd ö som fungerar som naturhamn.',
      'Service saknas och inga reguljära förbindelser. Klippig kust präglar miljön.',
      'Korsholmen passar för seglare som söker en kortare övernattning utanför de större öarna.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Stavsnäs', character: 'Liten naturö, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
      { icon: '🌅', name: 'Kvällsvyer', desc: 'Utsikt mot västerhorisonten i lämpliga vindar.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Korsholmens naturhamn', desc: 'Liten naturhamn.', spots: 6 }],
    restaurants: [],
    tips: ['Allemansrätten gäller.', 'Ta med all proviant.'],
    related: ['gallno', 'moja', 'namdo'],
    tags: ['liten ö', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: '"Korsholmen" och "Korsö" är vanliga ö-namn i den svenska östkustskärgården — namnet syftar ofta på korsformade landmärken eller på sjömärken som tidigare restes på öarna för navigation.',
  },

  {
    slug: 'vastana',
    name: 'Västanö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🛶',
    tagline: 'Mindre naturö i norra skärgården',
    description: [
      'Västanö är en mindre obebodd ö i Stockholms norra skärgård (Roslagens skärgård). Service saknas helt och inga reguljära förbindelser går hit.',
      'Ön fungerar som naturhamn för seglare och kajakpaddlare som söker en lugnare övernattning. Klippig kust och stilla vatten präglar miljön.',
      'Västanö passar för erfarna seglare och paddlare som söker en ostörd naturhamn längs Roslagskusten.',
    ],
    facts: { travel_time: '2–3 h med segelbåt eller kajak från Norrtälje', character: 'Liten naturö, kajak, ankring', season: 'Juni–augusti', best_for: 'Kajak, segling, naturvistelse' },
    activities: [
      { icon: '🛶', name: 'Havskajak', desc: 'Stilla vatten i lämpliga vindar.' },
      { icon: '⛵', name: 'Ankring', desc: 'Naturhamn för seglare på norrleden.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt/kajak', from: 'Norrtälje / Furusund', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Västanös naturhamn', desc: 'Begränsad ankringsplats.', spots: 6 }],
    restaurants: [],
    tips: ['Vid västvind är paddling krävande — kontrollera SMHI noga.', 'Allemansrätten gäller.'],
    related: ['arholma', 'fejan', 'blido'],
    tags: ['kajak', 'naturhamn', 'norra', 'segling'],
    did_you_know: '"Västanö" syftar på en ö som ligger på västra sidan av en större ögrupp eller fjärd — ett vanligt namn i Stockholms och Roslagens skärgård.',
  },

  {
    slug: 'storskar',
    name: 'Storskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Mindre naturskär — naturhamn på vägen mot Sandhamn',
    description: [
      'Storskär är ett av flera "Storskär" i Stockholms skärgård. Det här ligger i mellersta skärgården och fungerar som naturhamn för seglare på vägen mot Sandhamn eller andra större öar i området.',
      'Skäret är obebodd och saknar service. Klippig kust och stilla vatten i skyddade vikar präglar miljön.',
      'Storskär passar för seglare som söker en kortare övernattning utanför de större hamnarna.',
    ],
    facts: { travel_time: '2–3 h med segelbåt från Stavsnäs', character: 'Litet naturskär, ankring, ostört', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på vägen mot Sandhamn.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Korta promenader längs klippkusten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Sandhamn', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Storskärs naturhamn', desc: 'Skyddad ankringsplats.', spots: 25 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — ta med soporna hem.', 'Ta med all proviant och färskvatten.'],
    related: ['sandhamn', 'kanholmen', 'norrora'],
    tags: ['naturhamn', 'ankring', 'mellersta', 'segling'],
    did_you_know: 'Östersjön har endast minimala tidvattenvariationer (några centimeter) — variationen i vattenstånd i Stockholms skärgård beror främst på lufttryck och vindar, inte tidvatten.',
  },

]

// ── Bohuslän-utvidgning (västkustens öar, sedan 2026-04) ─────────────────
import { BOHUSLAN_ISLANDS } from './bohuslan-data'

export const ALL_ISLANDS: Island[] = [...ISLANDS, ...(BOHUSLAN_ISLANDS as Island[])]

export function getIsland(slug: string): Island | undefined {
  return ALL_ISLANDS.find(i => i.slug === slug)
}

export function getIslandsByRegion(region: Island['region']): Island[] {
  return ALL_ISLANDS.filter(i => i.region === region)
}

export type IslandActivity = {
  icon: string
  name: string
  desc: string
}

export type IslandAccommodation = {
  name: string
  type: 'Hotell' | 'Vandrarhem' | 'Stugor' | 'Camping' | 'B&B' | 'Gästhamn'
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
}

export type Island = {
  slug: string
  name: string
  region: 'norra' | 'mellersta' | 'södra'
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
    emoji: '⛵',
    tagline: 'Seglarnas huvudstad och skärgårdens mest levande destination.',
    description: [
      'Sandhamn är ett av Stockholms skärgårds mest välkända namn — och med rätta. Ön är hem för KSSS (Kungliga Svenska Sällskapet) och samlar tusentals seglare varje sommar i en av Östersjöns mest besökta gästhamnar. Här finns allt: restauranger i toppklass, bagerier, barer och ett hamnnäsliv som sträcker sig långt in på nätterna.',
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
      { name: 'Seglarrestaurangen', type: 'Restaurang', desc: 'Seglarhotellets krog — en av skärgårdens finaste. Boka i förväg.' },
      { name: 'Sandhamns Värdshus', type: 'Restaurang', desc: 'Historisk krog vid färjebryggan. Enkel husmanskost och räkor.' },
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
      'Utö är södra skärgårdens mest kompletta destination. Ön är känd för sina cykelleder, sin gruvhistoria — järn bröts här under 200 år — och sin havsbastu som numera är en av skärgårdens mest omtalade upplevelser. Utö Värdshus håller hög klass och är ett självklart mål för dem som vill kombinera god mat med naturupplevelse.',
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
      { method: 'Pendelbåt', from: 'Nynäshamn', time: '1,5 h', desc: 'Direktförbindelsen med SL:s skärgårdslinjer. Inkluderas i SL-kort.', icon: '⛴' },
      { method: 'Snabbåt', from: 'Nynäshamn', time: '30 min', desc: 'Snabbare och bekvämare, men dyrare. Körs av Utö Båttaxi.', icon: '🚤' },
      { method: 'Bil + färja', from: 'Huvudskar', time: '35 min', desc: 'Bilfärja från Huvudskar. Kör till Nynäshamn och vidare.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Utö Gästhamn', desc: 'Välutrustad gästhamn med bränsle, el och service. Boka i förväg sommartid.', spots: 150, fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle', 'tvätt'] },
    ],
    restaurants: [
      { name: 'Utö Värdshus', type: 'Restaurang', desc: 'Öns flaggskepp — vällagad mat med havsutsikt. Boka i förväg.' },
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
  },

  // ─── VAXHOLM ─────────────────────────────────────────────────
  {
    slug: 'vaxholm',
    name: 'Vaxholm',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏰',
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
      { name: 'Grinda Wärdshus Restaurang', type: 'Restaurang', desc: 'Skärgårdens bästa kök i detta prissegment. Boka.' },
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
      { name: 'Finnhamns Krog', type: 'Restaurang', desc: 'Samlingsplatsen vid hamnen. Enkel och bra mat.' },
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
  },

  // ─── MÖJA ────────────────────────────────────────────────────
  {
    slug: 'moja',
    name: 'Möja',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏝',
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
      { method: 'Buss + Bilfärja', from: 'Tekniska Högskolan', time: '60 min', desc: 'Buss 676 till Ljusteröfärjan, sedan bilfärja.', icon: '🚌' },
      { method: 'Bil + Färja', from: 'Stockholm', time: '50 min', desc: 'Kör till Ljusteröfärjan och ta bilfärjan.', icon: '🚗' },
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'Varierar', desc: 'Enstaka avgångar till Klintan och Linanäs.', icon: '⛴' },
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
  },

  // ─── DALARÖ ──────────────────────────────────────────────────
  {
    slug: 'dalaro',
    name: 'Dalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '⚓',
    tagline: 'Södra skärgårdens klassiska utgångspunkt — historia, hamn och direktbuss från Stockholm.',
    description: [
      'Dalarö är södra skärgårdens naturliga utgångspunkt. Orten har en lång maritim historia — Dalarö Skans byggdes på 1600-talet och spelade en viktig roll i försvaret av Stockholms södra farvatten. Idag är det en populär hamnort med gästhamn, restauranger och goda kommunikationer.',
      'Dalarö nås med bil på 45 minuter från Stockholm eller med kollektivtrafik. Det gör orten unik bland de södra destinationerna — man behöver inte ta båt för att komma hit. Från Dalarö hamn avgår sedan båtar mot Utö och de omgivande öarna.',
      'Hamnlivet är aktivt sommartid med seglare, motorbåtar och sommargäster. Dalarö har ett charmigt bebyggelsemönster med trävillor längs kajen.',
    ],
    facts: {
      travel_time: '45 min med bil / 90 min med kollektivtrafik',
      character: 'Historisk hamnort, utgångspunkt, välskött',
      season: 'April–Oktober',
      best_for: 'Dagsturer, hamnliv, utgångspunkt mot Utö och södern',
    },
    activities: [
      { icon: '🏰', name: 'Dalarö Skans', desc: 'Fortifikation från 1600-talet med museum. Bra intro till södra skärgårdens historia.' },
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
      { method: 'Bil + Färja', from: 'Stockholm via Väddö', time: '2,5 h', desc: 'Kör till norra Väddö, ta bilfärja till Arholma.', icon: '🚗' },
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
      'Landsort är det sydligaste bebodd ön i Stockholms skärgård och en av de mest dramatiska. Öja (öns officiella namn) och Landsort landspets är omgivna av öppet hav på tre sidor — utsikterna mot Östersjön är oöverträffade.',
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
      'Furusund Värdshus är det naturliga stoppet — ett historiskt värdshus med restaurang som tjänat seglare i generationer, känt från August Strindbergs verk. Naturmässigt är passagen dramatisk med klippor på båda sidor.',
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
  },

  // ─── NORRÖRA ─────────────────────────────────────────────────
  {
    slug: 'norrora',
    name: 'Norröra',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Familjens skärgård — känd som inspelningsplats för Astrid Lindgrens Madicken.',
    description: [
      'Norröra är en liten, lugn ö i norra skärgården mest känd som inspelningsplats för Astrid Lindgrens Madicken-filmer. Många generationer svenska barnfamiljer har växt upp med bilderna från denna ö.',
      'Ön är perfekt för barnfamiljer — tillräckligt stor för att erbjuda något för var smak men inte så stor att barnen trötnar. Naturella badplatser längs kusten och möjligheter till klippklättring gör det enkelt att tillbringa en heldag här.',
      'Norröra passar ofta bäst som kombination med en tur till närliggande öar som Fejan eller Arholma, men kan också fungera som selvändig destination för ett lugnt övernattningsäventyr.'
    ],

    facts: {
      travel_time: '3 h med Waxholmsbåt',
      character: 'Lugnt, familjevänligt, litet',
      season: 'Juni–Augusti',
      best_for: 'Barnfamiljer, Astrid Lindgren-fans',
    },
    activities: [
      { icon: '📚', name: 'Madicken-platser', desc: 'Se inspelningsplatserna för Astrid Lindgrens filmer.' },
      { icon: '🏊', name: 'Bad', desc: 'Badplatser längs kusten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Waxholmsbåt', from: 'Norrtälje', time: '3 h', desc: 'Norra linjen.', icon: '⛴' }],
    harbors: [{ name: 'Norröra Hamn', desc: 'Liten hamn.', fuel: false }],
    restaurants: [{ name: 'Norröra Krog', type: 'Restaurang', desc: 'Öns lilla krog.' }],
    tips: ['Norröra är bäst kombinerat med en tur till Fejan eller Arholma.'],
    related: ['arholma', 'blido', 'furusund'],
    tags: ['familj', 'Madicken', 'norra', 'lugnt'],
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
  },

  // ─── INGMARSÖ ────────────────────────────────────────────────
  {
    slug: 'ingmarso',
    name: 'Ingmarsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Glest befolkad naturö med utmärkta paddelvatten och bilfänja från Ljusterö.',
    description: [
      'Ingmarsö är en av de mer stillsamma öarna i mellersta skärgården. Bilfärja avgår från Ljusterö vilket ger ön ett "extra steg" bort från fastlandet. Här är det lugnt, naturen är frodig och sommarfolket är en blandning av återvändande familjer och seglare.',
      'Öns norra klippor och den skyddade Ingmarsöviken är favoriter bland kajakvinnare. Gästhamnen är enkel men välfungerande. Möjligheter för klippbad och vandring gör den attraktiv för naturälskare.',
      'Ingmarsö passar bäst för den som redan är ute i mellersta skärgården och letar efter en lugn sidoväg, eller för kajakvinnare och familjer som söker orördhet.'
    ],

    facts: {
      travel_time: '75 min med buss + bilfärja från Stockholm',
      character: 'Lugnt, naturnära, bilfärja, genuint',
      season: 'Maj–September',
      best_for: 'Kajak, lugn, barnfamiljer, återvändande sommargäster',
    },
    activities: [
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Norra kustlinjen är utmärkt paddlingvatten med skyddade vikar och fina holmar.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Fina klippbad på öns norra sida. Relativt folktomt även högsäsong.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs övägen och utforska alla delar av ön.' },
      { icon: '🚶', name: 'Vandring', desc: 'Omarkerade men lättgångna stigar genom blandskog och längs kusten.' },
    ],
    accommodation: [
      { name: 'Privatstugor', type: 'Stugor', desc: 'Sommarstugor uthyrda av lokalbor. Sök via Blocket eller Airbnb.' },
    ],
    getting_there: [
      { method: 'Buss + Bilfärja', from: 'Tekniska Högskolan', time: '75 min', desc: 'Buss 676 till Ljusteröfärjan, bilfärja till Ljusterö, sedan lokal färja till Ingmarsö.', icon: '🚌' },
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2,5 h', desc: 'Enstaka avgångar via Ljusterö.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Ingmarsö Gästhamn', desc: 'Enkel men fungerande gästhamn. Servicenivå: grundläggande.', spots: 25, fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Ingmarsö Krog', type: 'Restaurang', desc: 'Öns enda krog. Enkel sommarmat i skärgårdsmiljö.' },
      { name: 'Ingmarsö Lanthandel', type: 'Handel', desc: 'Dagligvaror och kaffepaus.' },
    ],
    tips: [
      'Norra sidan av ön är bäst för klippbad och kajak.',
      'Kombination med Ljusterö samma dag fungerar bra.',
    ],
    related: ['ljustero', 'gallno', 'finnhamn'],
    tags: ['kajak', 'lugnt', 'bilfärja', 'natur', 'orört'],
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
      'Nämdö är en bilfri ö på Waxholmsbåtens linje från Stavsnäs mot Möja. Ön har haft fast befolkning sedan medeltiden och är en av de mer genuina öarna — här finns ett litet levande samhälle, en vacker kyrka och en lanthandel.',
      'Naturen på Nämdö är väl skyddad med varierad terräng. Klippbad, vandringsstigar och fina naturhamnar på öns södra sida lockar seglare och naturälskare. Den lilla kyrkan från 1600-talet är värd ett besök.',
      'Nämdö passar perfekt som stopp på en längre seglingstur mot Sandhamn eller som dagsdestination för den som söker äkta skärgårdsliv.'
    ],

    facts: {
      travel_time: '90 min med Waxholmsbåt från Stavsnäs',
      character: 'Bilfri, genuint, litet samhälle, välskyddat',
      season: 'Maj–September',
      best_for: 'Seglare, naturälskare, genuint skärgårdsliv',
    },
    activities: [
      { icon: '⛪', name: 'Nämdö kyrka', desc: 'Liten vacker kyrka med anor från 1600-talet. Öppen sommartid.' },
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
      'Kyrkan är värd ett besök — en av skärgårdens äldsta.',
    ],
    related: ['moja', 'gallno', 'sandhamn'],
    tags: ['bilfri', 'genuint', 'segling', 'natur', 'kyrka'],
  },

  // ─── SVARTSÖ ─────────────────────────────────────────────────
  {
    slug: 'svartso',
    name: 'Svartsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏝',
    tagline: 'Bilfri ö med ekologisk profil — biodynamisk odling och enkel skärgårdslyx.',
    description: [
      'Svartsö är kanske den mest unika av de bilfria öarna i mellersta skärgården. Ön har sedan decennier en stark ekologisk profil — biodynamiskt jordbruk, lokal matproduktion och ett medvetet förhållningssätt till turism.',
      'Naturen är varierad med öppna odlingslandskap, skog och en lång kustlinje. Ön är lagom stor för en heldag till fots. Känslan är lantlig snarare än marin — en skärgårdsö som också är en bondgård.',
      'Svartsö passar för matälskare, naturälskare och de som söker något unikt — kombinationen av utmärkt mat från Svartsö Krog och stark miljöprofil gör den speciell.'
    ],

    facts: {
      travel_time: '2 h med Waxholmsbåt från Strömkajen',
      character: 'Bilfri, ekologisk, lugnt, mat i fokus',
      season: 'Maj–September',
      best_for: 'Matälskare, naturälskare, de som söker unikt',
    },
    activities: [
      { icon: '🥗', name: 'Ekologisk odling', desc: 'Besök gårdens biodynamiska odlingar och lär dig om öns matproduktion.' },
      { icon: '🚶', name: 'Vandring', desc: 'Vandra längs kustlinjen och genom det öppna odlingslandskapet.' },
      { icon: '🏊', name: 'Bad', desc: 'Badplatser på öns södra sida med utsikt mot mellersta skärgården.' },
    ],
    accommodation: [
      { name: 'Svartsö Logi', type: 'Stugor', desc: 'Enkla men välskötta stugor kopplade till krogens ekologiska profil.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2 h', desc: 'Linje via Möja och Gällnö.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Svartsö Hamn', desc: 'Liten gästhamn nära krogsbryggan.', spots: 20, fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Svartsö Krog', type: 'Restaurang', desc: 'Ekologisk mat baserad på öns egna råvaror. En av skärgårdens mest unika matupplevelser. Boka.' },
    ],
    tips: [
      'Boka Svartsö Krog långt i förväg — den är välkänd och fullbokad sommartid.',
      'Svartsö kombineras bäst med en natt — öns lugn förtjänar mer än en dagstur.',
    ],
    related: ['moja', 'gallno', 'namdo'],
    tags: ['ekologisk', 'bilfri', 'matupplevelse', 'genuint', 'lantligt'],
  },

  // ─── RUNMARÖ ─────────────────────────────────────────────────
  {
    slug: 'runmaro',
    name: 'Runmarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Populär seglingsö nära Sandhamn — bränsle, krog och vackra naturhamnar.',
    description: [
      'Runmarö är en större ö i mellersta skärgården som kombinerar natur med möjligheter för längre vistelse och varierad aktivitet. Ön är populär bland familjer.',
      'Naturen på Runmarö är varierad med skogspartier, badplatser och möjligheter för vandring. Det finns hamnar och restauranger. Cykelvägar möjliggör utforskning.',
      'Runmarö passar väl för familjer som söker ett lugnt och väl etablerat alternativ.'
    ],

    facts: {
      travel_time: '2 h med Waxholmsbåt från Strömkajen',
      character: 'Lugnt, naturnära, knutpunkt för seglare',
      season: 'Maj–September',
      best_for: 'Seglare, naturhamnsankring, de som söker lugnet nära Sandhamn',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Klassisk passage och stopp på Stockholmsleden. Välplacerat för nattankring.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad på öns västra sida med fin utsikt.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera längs kustlinjen och se Sandhamn på nära håll.' },
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
      'Fejan är ett naturreservat norr om Furusund och räknas bland norra skärgårdens absolut finaste naturhamnar. Vita klippor, kristallklart vatten och en skyddad inhamn gör ön till ett av seglarnas mest omtyckta stopp längs Furusundsleder.',
      'Det finns ingen reguljärbåt till Fejan — hit tar man sig med segelbåt eller motorbåt. Det är precis det som gör ön speciell. Inga dagsturister med Waxholmsbåten, bara båtfolk som sökt sig dit med intention.',
      'Naturreservatsreglerna gäller — ta inte ved, lämna inget skräp, respektera fågelskyddet.',
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
      { method: 'Privat båt', from: 'Furusund', time: '30–60 min', desc: 'Enda sättet att nå Fejan. Planera in stoppet på en norra skärgårdstur.', icon: '⛵' },
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
      'Rödlöga är en större ö i mellersta skärgården som erbjuder lugn och möjligheter för längre vistelse. Ön kombinerar natur med väl utvecklad infrastruktur.',
      'Naturen på Rödlöga är varierad med skogspartier och badplatser längs kusten. Det finns hamnar och restauranger spridda över ön. Cykelvägar löper längs vägnätet.',
      'Rödlöga passar för familjer som söker ett lugnt alternativ till populärare öar.'
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
      'Singö är en större ö i norra skärgården som kombinerar natur med möjligheter för längre vistelse. Ön är bilfärjebetjänad och erbjuder varierad natur.',
      'Naturen på Singö är varierad med skogspartier och väl utvecklad kustlinje. Det finns hamnar och grundläggande service. Cykelvägar löper längs vägnätet.',
      'Singö passar för familjer som söker ett lugnt alternativ till de populäraste norra öarna.'
    ],

    facts: {
      travel_time: '90 min med bil + bilfärja från Norrtälje',
      character: 'Genuint, okänt, bilfärja, norra Uppland',
      season: 'Juni–Augusti',
      best_for: 'De som söker äkta orördhet, kulturhistoria',
    },
    activities: [
      { icon: '⛪', name: 'Singö kapell', desc: 'Ett av Upplands äldsta träkyrkor. Historisk pärla värd ett besök.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkta fiskevatten runt ön. Abborre och havsöring.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs öns grusvägar och utforska fiskelägena.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Orörda klippbad längs kusten utan konkurrens om platserna.' },
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
      'Lidö är en större och väl bebyggd ö i mellersta skärgården som kombinerar natur med väl utvecklad infrastruktur. Ön är populär bland både familjer och seglare.',
      'Naturen på Lidö är varierad med skogspartier och badplatser längs kusten. Det finns restauranger, kaféer och hamnar. Cykelvägar löper längs vägnätet.',
      'Lidö passar perfekt för familjer som söker ett lugnt alternativ till populärare öar.'
    ],

    facts: {
      travel_time: '3 h med Waxholmsbåt från Strömkajen / 2 h med bil + färja',
      character: 'Naturhotell, välvårdat gods, lugnt',
      season: 'April–Oktober (konferens helår)',
      best_for: 'Par, konferens, naturälskare, golfare',
    },
    activities: [
      { icon: '🏌', name: 'Golf', desc: 'Lidö har en av skärgårdens unikaste golfbanor — 9 hål på en ö.' },
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
      'Golfen på Lidö är unik i skärgårdssammanhang — boka tee-tid online i förväg.',
      'Naturhotellet är populärt för weekendpaket — boka minst 2–3 veckor i förväg.',
    ],
    related: ['furusund', 'blido', 'arholma'],
    tags: ['naturhotell', 'golf', 'konferens', 'norra', 'herrgård'],
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
      'Graddo är en liten ö i mellersta skärgården som erbjuder lugn och möjligheter för badning och enkel vistelse. Ön är mindre uppmärksammad men älskad.',
      'Graddo kombinerar naturvärdena på ett väl skyddat läge med möjligheter för enkelt ankörning. Badplatser längs kusten erbjuds. Service är minimal.',
      'Graddo passar ofta som ett sekundärt stopp för seglare som redan är ute i skärgården, eller för kajakvinnare.'
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
      'Vaddö är en större ö söder om Vaxholm som kombinerar natur med möjligheter för längre vistelse. Ön erbjuder varierad landskap och är populär bland familjer.',
      'Naturen på Vaddö är varierad med skogspartier och badplatser längs kusten. Det finns hamnar och grundläggande service. Cykelvägar möjliggör utforskning.',
      'Vaddö passar väl för familjer som söker ett lugnt alternativ nära Stockholm.'
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
      'Askö är en större och väl utvecklad ö i mellersta skärgården som kombinerar natur med etablerad infrastruktur. Ön är populär bland både familjer och långseglare.',
      'Naturen på Askö är varierad med skogspartier och badplatser längs kusten. Det finns ett antal hamnar, restauranger och kaféer spridda över ön. Cykelvägar möjliggör utforskning.',
      'Askö passar väl för familjer som söker ett etablerat men fortfarande autentiskt stopp i mellersta skärgården, eller som del av längre cykel- eller seglingsresor.'
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
      'Gålö är en större ö i södra skärgården som kombinerar natur med möjligheter för längre vistelse. Ön erbjuder varierad landskap och är populär bland seglare.',
      'Gålö har en väl utvecklad gästhamn och grundläggande service spridda över ön. Naturmässigt finns det skogspartier, badplatser och vandringsstigar.',
      'Gålö fungerar väl som del av längre seglingsresor i södra skärgården, eller som dagsdestination för den som söker något mindre besökt än större öar.'
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
      'Torö är en större ö i norra skärgården som kombinerar natur med möjligheter för längre vistelse. Ön erbjuder varierad natur och är populär bland seglare.',
      'Naturen på Torö är varierad med skogspartier och väl utvecklad kustlinje. Det finns hamnar och grundläggande service. Möjligheter för vandring och badning.',
      'Torö passar för seglare som söker ett bra ankringsläge i norra skärgården.'
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
      'Fjärdlång är ett naturskär i södra skärgården som erbjuder dramatiska utsikter och möjligheter för enkelt ankörning för erfarna seglare. Skäret är exponerat.',
      'Fjärdlång kombinerar ytterskärgårdens dramatiska natur med möjligheter för enkelt ankörning på sydsidan. Badplatser och möjligheter för naturupplevelse erbjuds.',
      'Fjärdlång passar för erfarna seglare som söker dramatisk natur och äventyr långt från populära destinationer.'
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
      { name: 'Ankring', type: 'Gästhamn', desc: 'Ankra i naturhamnen. Inga fasta faciliteter.' },
    ],
    getting_there: [
      { method: 'Privat båt', from: 'Utö / Dalarö', time: '2–3 h', desc: 'Enda alternativet. Erfaren seglare rekommenderas.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Norra Fjärdlångsviken', desc: 'En av södra skärgårdens finaste naturhamnar. Begränsat antal platser.', spots: 10, fuel: false },
    ],
    restaurants: [],
    tips: [
      'Ta med allt du behöver — ingen service finns på ön.',
      'Anlöp tidigt, viken tar slut snabbt under högsäsong.',
    ],
    related: ['uto', 'nattaro', 'landsort'],
    tags: ['naturreservat', 'orört', 'segling', 'ytterskärgård', 'södra'],
  },

  // ── BATCH 3: Ytterligare öar för full konkurrenskraft ───────────────────

  {
    slug: 'rindo',
    name: 'Rindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏰',
    tagline: 'Militärhistoria och stilla vikar nära Vaxholm',
    description: [
      'Rindö är en mellanstor ö i mellersta skärgården som erbjuder en blandning av lugn natur och möjligheter för aktiviteter för hela familjen. Ön är populär bland seglare som utgångspunkt för kajakpaddling.',
      'Naturen på Rindö är varierad med både skog och klippor. En enkel gästhamn och grundläggande service gör det enkelt att stanna ett par dagar. Ön är bilfärjebetjänad vilket gör den mer tillgänglig.',
      'Rindö fungerar väl som del av en rundtur tillsammans med närliggande öar som Resarö och Tenö, eller som självständig destination för kajak och naturupplevelse.'
    ],

    facts: { travel_time: '10 min från Vaxholm', character: 'Historisk, lugn, bostadsö', season: 'Maj–september', best_for: 'Historia, vandring, segling' },
    activities: [
      { icon: '🏰', name: 'Befästningsvandrning', desc: 'Utforska rester av gamla försvarsanläggningar längs öststranden.' },
      { icon: '⛵', name: 'Segling', desc: 'Fin passage för segelbåtar med naturliga vindförhållanden.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Färja', from: 'Vaxholm', time: '10 min', desc: 'Reguljär bilfärja från Vaxholm centrum.', icon: '⛴' }],
    harbors: [{ name: 'Rindö hamn', desc: 'Liten gästbrygga med begränsat antal platser.', spots: 8 }],
    restaurants: [],
    tips: ['Kombinera med ett besök på Vaxholms fästning.', 'Bra ankringsplats i Rindösund skyddat läge.'],
    related: ['vaxholm', 'husaro', 'ljustero'],
    tags: ['militärhistoria', 'lugnt', 'nära Vaxholm', 'vandring'],
  },

  {
    slug: 'yxlan',
    name: 'Yxlan',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🚲',
    tagline: 'Bilfri cykelö med sandstränder och lantlig charm',
    description: [
      'Yxlan är en liten ö i mellersta skärgården som erbjuder lugn natur och möjligheter för enkelt ankörning. Ön är mindre känd men älskad av lugnsökande.',
      'Yxlan kombinerar naturvärdena på ett väl skyddat läge med möjligheter för enkelt ankörning. Badplatser och möjligheter för vandring längs kusten erbjuds.',
      'Yxlan passar för kajakvinnare eller erfarna seglare som redan är ute på havet och letar efter ett enkelt ankringsläge.'
    ],

    facts: { travel_time: '45 min från Kapellskär', character: 'Bilfri, lantlig, sandstrand', season: 'Juni–september', best_for: 'Cykling, bad, avkoppling' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Hyr cykel vid bryggan och utforska hela ön på 2–3 timmar.' },
      { icon: '🏊', name: 'Bad vid Kungsudde', desc: 'Ovanlig sandstrand — sällsynt i norra skärgården.' },
    ],
    accommodation: [{ name: 'Yxlans Vandrarhem', type: 'Vandrarhem', desc: 'Enkelt boende med självhushåll, perfekt för naturälskare.' }],
    getting_there: [{ method: 'Bilfärja', from: 'Simpnäs', time: '45 min', desc: 'Waxholmsbolaget trafikerar leden sommarsäsong.', icon: '⛴' }],
    harbors: [{ name: 'Yxlans gästhamn', desc: 'Välskött hamn med el, vatten och dusch.', spots: 30, service: ['El', 'Vatten', 'Dusch'] }],
    restaurants: [{ name: 'Yxlans Café', type: 'Kafé', desc: 'Hemlagad mat och kaffe i lantlig miljö vid hamnen.' }],
    tips: ['Boka vandrarhem tidigt i juli.', 'Ta morgonbåten för en hel dag på ön.'],
    related: ['singo', 'graddo', 'fejan'],
    tags: ['bilfri', 'sandstrand', 'cykling', 'norra'],
  },

  {
    slug: 'kymmendo',
    name: 'Kymmendö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '✍️',
    tagline: 'Strindbergs ö — litteraturhistoria mitt i skärgården',
    description: [
      'Kymmendö är en bilfärjebetjänad ö i mellersta skärgården som erbjuder en balans mellan tillgänglighet och autenticitet. Bilfärjan gör den nöbar för både bilister och båtturister.',
      'Ön är känd för sina naturvärdena — skogsrika partier växlar med öppna ljunghedar och klippor. En enkel hamn och bistro täcker behoven för ett dagbesök eller kortare övernattning.',
      'Kymmendö passar bäst för den som redan är ute i mellersta skärgården och letar efter en lugn sidoväg, eller för den som kombinerar det med närliggande öar.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Historisk, orört, litterär', season: 'Juni–september', best_for: 'Litteraturintresserade, historia, natur' },
    activities: [
      { icon: '✍️', name: 'Strindbergsstugan', desc: 'Besök stugan där "Hemsöborna" fick sin inspiration.' },
      { icon: '🥾', name: 'Vandring', desc: 'Korta men stämningsfulla stigar runt ön med klippvyer.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik — nås enklast med privat båt eller charterbåt.', icon: '⛵' }],
    harbors: [{ name: 'Kymmendö naturhamn', desc: 'Skyddad vik på södra sidan. Ankring möjlig.', spots: 6 }],
    restaurants: [],
    tips: ['Läs Hemsöborna innan besöket.', 'Ta med allt — ingen butik eller service finns.', 'Planera vistelsen med vädret i tanke, svår att lämna vid storm.'],
    related: ['orno', 'dalaro', 'nattaro'],
    tags: ['Strindberg', 'literär', 'orört', 'historia', 'mellersta'],
  },

  {
    slug: 'bullero',
    name: 'Bullerö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🦅',
    tagline: 'Naturreservat med rikt fågelliv och rå skärgårdskaraktär',
    description: [
      'Bullerö är en bilfärjebetjänad ö i mellersta skärgården som erbjuder lugn, ett aktivt sommarliv och en genuin skärgårdskaraktär. Ön nås enkelt och är populär bland familjer.',
      'Naturen är varierad med både skog och badplatser längs kusten. Det finns en välskött gästhamn och restauranger som håller ön levande sommartid. Cykelvägar löper längs vägnätet.',
      'Bullerö kombineras ofta med ett besök på närliggande öar på en längre seglingstur, men kan också fungera som självständig destination för ett övernattningsbesök.'
    ],

    facts: { travel_time: '2–3 h från Stockholm', character: 'Naturreservat, vilt, fågelrikt', season: 'Maj–september (fåglar bäst i juni)', best_for: 'Fågelskådning, natur, fotografi' },
    activities: [
      { icon: '🦅', name: 'Fågelskådning', desc: 'Havsörn, sillgrissla och labb häckar på öarna.' },
      { icon: '🏛', name: 'Naturum Bullerö', desc: 'Utställning och guidade turer om ytterskärgårdens ekologi.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Båt', from: 'Stavsnäs', time: '2 h', desc: 'Waxholmsbolaget sommarsäsong eller privat båt.', icon: '⛴' }],
    harbors: [{ name: 'Bullerö gästhamn', desc: 'Begränsade platser vid naturreservatets brygga.', spots: 15 }],
    restaurants: [],
    tips: ['Binokulär ett måste.', 'Visa respekt för häckande fåglar — håll avstånd.', 'Tidig morgon ger bäst fågelupplevelse.'],
    related: ['nattaro', 'gallno', 'moja'],
    tags: ['naturreservat', 'fågelskådning', 'ytterskärgård', 'vilt'],
  },

  {
    slug: 'vindo',
    name: 'Vindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌳',
    tagline: 'Stor skogsö med bro och hästgård',
    description: [
      'Vindö är en bilfärjebetjänad ö i mellersta skärgården som kombinerar lugn med närhet till fastlandet. Ön är mindre uppmärksammad än grannarna men erbjuder hög kvalitet.',
      'Skoglövet på Vindö är tätt och det finns flera fina vandringsstigar. Badplatser längs kusten är ofta folktomt. En enkel hamn och service täcker behoven.',
      'Vindö passar för den som söker lugn utan att behöva åka långt bort, eller för den som redan är ute och letar efter nästa stopp.'
    ],

    facts: { travel_time: '1 h från Gustavsberg', character: 'Skogig, lugn, broförbunden', season: 'Maj–oktober', best_for: 'Vandring, ridning, familjeutflykt' },
    activities: [
      { icon: '🌳', name: 'Vandring', desc: 'Markerade leder genom gammal barrskog till klippvyer.' },
      { icon: '🐴', name: 'Ridning', desc: 'Hästgård med rid-möjligheter för alla nivåer.' },
    ],
    accommodation: [{ name: 'Vindö Camping', type: 'Camping', desc: 'Välskött campingplats i skogen nära havet.' }],
    getting_there: [{ method: 'Bil/bro', desc: 'Broförbindelse via Gustavsbergsleden.', icon: '🚗' }, { method: 'Båt', from: 'Stavsnäs', time: '40 min', desc: 'Sommarlinje Waxholmsbolaget.', icon: '⛴' }],
    harbors: [{ name: 'Vindö brygga', desc: 'Gästbrygga med vattenservice.', spots: 20 }],
    restaurants: [{ name: 'Vindö Hamnkafé', type: 'Kafé', desc: 'Fika och enkel mat vid bryggan, öppet sommarsäsong.' }],
    tips: ['Bra för familjer med barn.', 'Hyr cykel och utforska hela ön på halv dag.'],
    related: ['ingaro', 'gallno', 'namdo'],
    tags: ['skog', 'vandring', 'ridning', 'familj', 'mellersta'],
  },

  {
    slug: 'smaadalaro',
    name: 'Smådalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🛶',
    tagline: 'Kajakcentrum och pittoreskt gammalt fiskläge',
    description: [
      'Smådalarö är en liten ö söder om Dalarö som erbjuder lugn, utsikter och en autentisk skärgårdsupplevelse. Ön är mindre besökt än Utö men erbjuder fin naturupplevelse.',
      'Naturmässigt är Smådalarö varierad med skogspartier och klippor längs kusten. Det finns möjligheter för klippbad och vandringsstigar. Service är begränsad.',
      'Smådalarö nås bäst med egen båt från Dalarö eller som del av en längre seglingstur söderut. Det är en ö för lugnsökande seglare.'
    ],

    facts: { travel_time: '1 h 30 min från Stockholm', character: 'Kajak, pittoreskt, havsnära', season: 'Maj–september', best_for: 'Kajak, segling, fiskeby' },
    activities: [
      { icon: '🛶', name: 'Havskajak', desc: 'Hyr kajak och paddla mot Ornö eller södra skären.' },
      { icon: '📸', name: 'Fotopromenad', desc: 'Röda bodar, bryggor och gammalt fiskläge längs stranden.' },
    ],
    accommodation: [{ name: 'Smådalarö Gård', type: 'Hotell', desc: 'Välrenommerat hotell i gammalt gårdsläge med spa.' }],
    getting_there: [{ method: 'Bil', time: '1 h 30 min', desc: 'Väg 73 mot Nynäshamn, sedan skyltat till Smådalarö.', icon: '🚗' }, { method: 'Båt', from: 'Dalarö', time: '15 min', desc: 'Kort passagerarbåt från Dalarö.', icon: '⛴' }],
    harbors: [{ name: 'Smådalarö Gästhamn', desc: 'Full service, bra skydd, populär sommarhamn.', spots: 60, fuel: true, service: ['El', 'Vatten', 'Duschar', 'Tvätt'] }],
    restaurants: [{ name: 'Smådalarö Gård Restaurant', type: 'Restaurang', desc: 'Skärgårdsmat med lokala råvaror i historisk miljö.' }],
    tips: ['Boka kajak i förväg under juli.', 'Smådalarö Gård har populär brunch på helger.'],
    related: ['dalaro', 'orno', 'toro'],
    tags: ['kajak', 'fiskeby', 'södra', 'pittoreskt'],
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
    getting_there: [{ method: 'Bilfärja', from: 'Tyresta/Tullinge', time: '20 min', desc: 'Bilfärja till Mörkö sommarsäsong.', icon: '⛴' }],
    harbors: [{ name: 'Mörkö hamn', desc: 'Enkel gästbrygga med begränsat antal platser.', spots: 12 }],
    restaurants: [],
    tips: ['Ta med proviant — service är minimal.', 'Kontakta ö-borna för lokaltips.'],
    related: ['orno', 'dalaro', 'fjardlang'],
    tags: ['fiske', 'genuin', 'södra', 'orört'],
  },

  {
    slug: 'musko',
    name: 'Muskö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '⚓',
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
    getting_there: [{ method: 'Bil/bro', time: '1 h 30 min', desc: 'Broförbunden via Handen och Haninge.', icon: '🚗' }],
    harbors: [{ name: 'Muskö gästbrygga', desc: 'Enkel brygga nära gamla marininfarten.', spots: 10 }],
    restaurants: [],
    tips: ['Boka marinbas-tur i god tid, populärt sommartid.', 'Ta med fika och grillmat.'],
    related: ['dalaro', 'toro', 'galo'],
    tags: ['marinbas', 'industrihistoria', 'södra', 'klippor'],
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
      { icon: '⛪', name: 'Adelsö kyrka', desc: 'En av Sveriges äldsta kyrkor, välbevarad sedan 1100-talet.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bilfärja', from: 'Munsö', time: '10 min', desc: 'Kort bilfärjeöverfart till Adelsö.', icon: '⛴' }],
    harbors: [{ name: 'Adelsö gästbrygga', desc: 'Enkel brygga med plats för ett dussin båtar.', spots: 12 }],
    restaurants: [],
    tips: ['Kombinera med Björkö/Birka på samma dag.', 'Hyr cykel för att utforska hela ön.'],
    related: ['bjorko', 'vindo', 'fjaderholmarna'],
    tags: ['kungsgård', 'historia', 'Mälaren', 'medeltid', 'cykling'],
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
  },

  {
    slug: 'svenska-hogarna',
    name: 'Svenska Högarna',
    region: 'mellersta',
    regionLabel: 'Ytterskärgård',
    emoji: '🪨',
    tagline: 'Ytterst i skärgården — klippor, hav och ingenting annat',
    description: [
      'Svenska högarna är en grupp små holmar i södra skärgården känd för sitt fågelskyddsreservat och rikt fågelliv. Allmän besök är begränsad för att skydda fåglarna.',
      'Området är en av de viktigaste fågelskyddszonerna i Stockholms skärgård. Även om man inte kan besöka själva reservatet är det möjligt att ankra i närliggande skyddade vikar.',
      'Svenska högarna är ett måste för fågelskådare och naturälskare — en påminnelse om vikten av att skydda känsliga ekosystem.'
    ],

    facts: { travel_time: '4–6 h från Stockholm', character: 'Extrem, orört, ytterskärgård', season: 'Juni–september', best_for: 'Segling, äventyr, soluppgång' },
    activities: [
      { icon: '🌅', name: 'Soluppgång/solnedgång', desc: 'En av skärgårdens bästa platser för dramatisk soluppgång mot öppet hav.' },
      { icon: '📡', name: 'Meteorologisk station', desc: 'Aktiv station med bemanning — besök möjligt.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser. Kräver erfaret besättning och bra väder.', icon: '⛵' }],
    harbors: [{ name: 'Svenska Högarna naturhamn', desc: 'Naturlig men exponerad vik. Ankring möjlig i gott väder.', spots: 8 }],
    restaurants: [],
    tips: ['Kräver erfaret besättning.', 'Kontrollera SMHI noggrant — ingen väg tillbaka vid storm.', 'Fulltanka i Sandhamn innan avfärd.'],
    related: ['sandhamn', 'norrora', 'rodloga'],
    tags: ['ytterskärgård', 'extrem', 'äventyr', 'klippor', 'segling'],
  },

  {
    slug: 'huvudskar',
    name: 'Huvudskär',
    region: 'mellersta',
    regionLabel: 'Ytterskärgård',
    emoji: '🏮',
    tagline: 'Det klassiska fyrtornet och ankringsplatsen i ytterskärgården',
    description: [
      'Huvudskär är en större och väl bebyggd ö söder om Stockholm som fungerar både som utgångspunkt för längre seglingsresor och dagsdestination. Ön erbjuder intressant blandning av befolkning och industri.',
      'Huvudskär har gamla spår av malm- och stenkrosning som format öns historia. Idag erbjuder ön flera restauranger, hamnar och kaféer. Möjligheter för båd och vandring.',
      'Huvudskär passar väl som utgångspunkt för seglare som vill fortsätta söderut mot Utö, eller som dagsdestination.'
    ],

    facts: { travel_time: '2–3 h från Stockholm', character: 'Fyrtorn, naturhamn, klassisk', season: 'Maj–september', best_for: 'Segling, övernattning, fyrtorn' },
    activities: [
      { icon: '🏮', name: 'Fyrtornet', desc: 'Besök det klassiska fyrtornet med utsikt över ytterskärgården.' },
      { icon: '⛵', name: 'Ankring', desc: 'En av skärgårdens mest populära naturhamnar.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Nås enbart med privat båt. Ca 2–3 h från Sandhamn eller Stavsnäs.', icon: '⛵' }],
    harbors: [{ name: 'Huvudskärs naturhamn', desc: 'Skyddad naturhamn på sydsidan med staket och mulltoa.', spots: 25 }],
    restaurants: [],
    tips: ['Kom tidigt i juli — hamnen fylls till kvällen.', 'Ta med grillkol — eldar tillåtna i anvisad plats.'],
    related: ['sandhamn', 'norrora', 'svenska-hogarna'],
    tags: ['fyrtorn', 'naturhamn', 'segling', 'ytterskärgård'],
  },

  {
    slug: 'ramskar',
    name: 'Ramsö/Ramskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Ostörd naturö med rik flora och klipplandskap',
    description: [
      'Ramskär är ett klippskär i norra skärgården som fungerar som välkänd angöringsplats på seglares längre resor. Skäret är exponerat men erbjuder bra naturligt skydd.',
      'Ramskär har en lång seglartradition och är välkänt bland seglare från Stockholm och Norrtälje. Skäret erbjuder möjligheter för enkelt övernattningsankörning.',
      'Ramskär är primärt en destination för erfarna seglare och fungerar som viktig anköringsplats på nordiska seglingsleder.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Naturreservat, botanik, orört', season: 'Maj–september', best_for: 'Natur, botanik, stillhet' },
    activities: [
      { icon: '🌿', name: 'Botanik', desc: 'Ovanlig växtlighet med vilda orkidéer och strandväxter.' },
      { icon: '🛶', name: 'Kajak', desc: 'Runt ön i lugnt väder — klara vatten och klippor.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Ramskärs naturhamn', desc: 'Enkel ankringsplats, begränsad.', spots: 5 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — ta med soporna hem.', 'Kamera ett måste för blomsterfoton.'],
    related: ['gallno', 'moja', 'bullero'],
    tags: ['naturreservat', 'botanik', 'orört', 'mellersta'],
  },

  {
    slug: 'ekno',
    name: 'Eknö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌳',
    tagline: 'Ekar och sommarstugor i klassisk skärgårdsmiljö',
    description: [
      'Eknö är en bilfärjebetjänad ö i mellersta skärgården som erbjuder lugn, naturupplevelse och en autentisk skärgårdskänsla. Ön är mindre besökt än sina större grannar.',
      'Naturen på Eknö är varierad med skogspartier och badplatser längs kusten. Det finns en enkel gästhamn och grundläggande service. Cykelleder löper längs vägnätet.',
      'Eknö passar för den som redan är ute i skärgården och letar efter ett mindre uppmärksammat stopp, eller för familjer som söker lugn.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Sommarstugor, ek, lugnt', season: 'Maj–september', best_for: 'Naturvistelse, stillhet, segling' },
    activities: [
      { icon: '🌳', name: 'Ekvandrng', desc: 'Gamla jättekar längs den östra stranden.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad i kristallklart vatten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Sommarlinjer existerar — kontrollera aktuell tidtabell.', icon: '⛵' }],
    harbors: [{ name: 'Eknö naturbrygga', desc: 'Liten naturbrygga med begränsade platser.', spots: 8 }],
    restaurants: [],
    tips: ['Passa tidvattnet vid in- och utseglingen.'],
    related: ['namdo', 'gallno', 'moja'],
    tags: ['ek', 'sommarstugor', 'lugnt', 'mellersta'],
  },

  {
    slug: 'hasselo',
    name: 'Hasselö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌻',
    tagline: 'Liten söderö med sol och klippor',
    description: [
      'Hasselö är en liten ö i mellersta skärgården som erbjuder lugn natur och möjligheter för enkel vistelse. Ön är mindre uppmärksammad men älskad av dem som känner till den.',
      'Hasselö kombinerar skogsrika områden med klippor och badplatser. Service är minimal men det finns möjligheter för enkelt ankörning. Ön är perfekt för lugnsökande.',
      'Hasselö passar ofta bäst som deltagare i en längre seglingstur snarare än som självständig destination, men erbjuder hög kvalitet för den som hittar hit.'
    ],

    facts: { travel_time: '3 h från Stockholm', character: 'Liten, klippig, solig', season: 'Juni–september', best_for: 'Segling, klippbad, stillhet' },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Rena klara vatten och klippor.' },
      { icon: '⛵', name: 'Segling', desc: 'Bra skydd på nordvästsidan.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Hasselö naturhamn', desc: 'Skyddad vik på nv-sidan.', spots: 6 }],
    restaurants: [],
    tips: ['Ta med all proviant.'],
    related: ['fjardlang', 'toro', 'asko'],
    tags: ['klippor', 'segling', 'södra', 'orört'],
  },

  {
    slug: 'ormsko',
    name: 'Ormskär',
    region: 'mellersta',
    regionLabel: 'Ytterskärgård',
    emoji: '🐍',
    tagline: 'Spetsig ytterskärsgård med vind och hav',
    description: [
      'Ormskär är ett exponerat naturskär i södra skärgården som erbjuder dramatiska naturupplevelser för erfarna seglare. Skäret är välkänt bland dem som söker äkta ytterskärgård.',
      'Ormskär är vilt och exponerat, omgivet av öppet hav på flera sidor. Ankörningen kräver erfarenhet och god väderprognos. Belöningen är dramatiska utsikter.',
      'Ormskär är primärt för erfarna seglare som söker äventyr snarare än komfort, ofta som etappmål på längre sydliga seglingsresor.'
    ],

    facts: { travel_time: '3–4 h från Stockholm', character: 'Ytterskärgård, vind, klippig', season: 'Juni–september', best_for: 'Segling, äventyr, natur' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Klassisk naturhamn för seglare.' },
      { icon: '🌊', name: 'Vågbad', desc: 'Havsexponerad ytterkust med kraft.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Ormskärs naturhamn', desc: 'Naturlig vik med skydd i östliga vindar.', spots: 8 }],
    restaurants: [],
    tips: ['Känslig för sydvästliga vindar — planera avtrycket väl.'],
    related: ['norrora', 'svenska-hogarna', 'sandhamn'],
    tags: ['ytterskärgård', 'segling', 'klippor', 'äventyr'],
  },

  {
    slug: 'ljusnas',
    name: 'Ljusnäs',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '⛪',
    tagline: 'Gammal kapellö med utsikt och historia',
    description: [
      'Ljusnäs är en liten ö i södra skärgården som erbjuder lugn och naturupplevelse långt från turistströmmarna. Ön är primärt tillgänglig för båtturister med egen båt.',
      'Ljusnäs erbjuder möjligheter för enkelt ankörning och naturupplevelse. Det finns möjligheter för bad och enkel vistelse. Service är minimal.',
      'Ljusnäs passar för erfarna seglare som redan är ute på havet och letar efter ett orört ankringsläge långt från civilisationen.'
    ],

    facts: { travel_time: '2 h från Norrtälje', character: 'Liten, kapell, historisk', season: 'Maj–september', best_for: 'Historia, natur, avkoppling' },
    activities: [
      { icon: '⛪', name: 'Kapellvandring', desc: 'Litet välbevarat kapell med utsikt.' },
      { icon: '🌅', name: 'Solnedgång', desc: 'Fin utsiktsplats mot väster.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Ljusnäs naturbrygga', desc: 'Enkel brygga med begränsat antal platser.', spots: 6 }],
    restaurants: [],
    tips: ['Respektera kapellet — ibland används det för gudstjänster.'],
    related: ['blido', 'fejan', 'rodloga'],
    tags: ['kapell', 'historia', 'norra', 'lugnt'],
  },

  {
    slug: 'kanholmen',
    name: 'Kanholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⚓',
    tagline: 'Populär seglarhamn i hjärtat av skärgården',
    description: [
      'Kanholmen är en liten ö i södra skärgården som kombinerar lugn natur med möjligheter för badning och enkel vistelse. Ön är mindre besökt men högt älskad.',
      'Naturmässigt erbjuder Kanholmen klippor, badplatser och möjligheter för enkel vistelse. Det finns möjligheter för enkelt ankörning men service är minimal.',
      'Kanholmen passar ofta som deltagare i längre seglingsresor i södra skärgården, eller som närmaste skärgårdsupplevelse för den som seglar från Stockholm söderut.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Klassisk seglarhamn, skyddad', season: 'Maj–september', best_for: 'Segling, övernattning' },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Perfekt mellanlandning på Sandhamns-rutten.' },
      { icon: '🏊', name: 'Bad', desc: 'Klart vatten runt ön.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Enbart nåbar med båt.', icon: '⛵' }],
    harbors: [{ name: 'Kanholmens naturhamn', desc: 'Välskyddad hamn med staket och mulltoa.', spots: 30 }],
    restaurants: [],
    tips: ['Kom tidigt — fylls snabbt midsommar–juli.', 'Grillplatser finns, ta med kol.'],
    related: ['sandhamn', 'gallno', 'ingmarso'],
    tags: ['seglarhamn', 'naturhamn', 'mellersta', 'segling'],
  },

  {
    slug: 'norrpada',
    name: 'Norrpada',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🦩',
    tagline: 'Fågelrik ö med stilla vatten och skyddade vikar',
    description: [
      'Norrpada är en liten ö i norra skärgården som erbjuder lugn och naturupplevelse långt från de större destinationerna. Ön är mindre känd men älskad av erfarna skärgårdskännare.',
      'Norrpada kombinerar skogsrika områden med badplatser och möjligheter för enkelt ankörning. Service är minimal men detta gör ön autentisk.',
      'Norrpada passar för erfarna seglare som redan är ute i norra skärgården och letar efter ett mindre uppmärksammat ankringsläge.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Fågelrik, ostörd, kajak', season: 'Maj–september', best_for: 'Fågelskådning, kajak, natur' },
    activities: [
      { icon: '🦩', name: 'Fågelskådning', desc: 'Häger, strandskata och sjöfågel.' },
      { icon: '🛶', name: 'Kajak', desc: 'Lugna vatten längs öns östra sida.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt/kajak', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Norrpada naturhamn', desc: 'Liten naturhamn.', spots: 5 }],
    restaurants: [],
    tips: ['Kamerastativ rekommenderas för fågelfoto.'],
    related: ['gallno', 'bullero', 'ramskär'],
    tags: ['fågelskådning', 'kajak', 'naturreservat', 'lugnt'],
  },

  {
    slug: 'graskar',
    name: 'Gråskär',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🔭',
    tagline: 'Fyrlins-ö med unika klippformationer',
    description: [
      'Gräskär är ett litet naturskär i mellersta skärgården som erbjuder lugn och möjligheter för enkel vistelse. Skäret är mindre besökt och älskat av lugnsökande.',
      'Gräskär kombinerar naturvärdena på ett exponerat läge med möjligheter för enkelt ankörning. Badplatser erbjuds längs kusten. Service är minimal.',
      'Gräskär passar för erfarna seglare som redan är ute på havet och letar efter ett enkelt men autentiskt ankringsläge.'
    ],

    facts: { travel_time: '2–3 h från Norrtälje', character: 'Liten, klippig, natur', season: 'Juni–september', best_for: 'Natur, klippor, segling' },
    activities: [
      { icon: '🔭', name: 'Klippvandring', desc: 'Dramatiska klippformationer längs öns kant.' },
      { icon: '⛵', name: 'Segling', desc: 'Bra ankringsplats i lämpliga vindar.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Gråskärs naturhamn', desc: 'Begränsad ankringsmöjlighet.', spots: 6 }],
    restaurants: [],
    tips: ['Sällsynt botanik längs klippkanten.'],
    related: ['fejan', 'rodloga', 'arholma'],
    tags: ['klippor', 'norra', 'naturreservat', 'segling'],
  },

  {
    slug: 'lindholmen',
    name: 'Lindholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏕',
    tagline: 'Naturcamping och stillhet i skärgårdens mitt',
    description: [
      'Lindholmen är en liten ö i mellersta skärgården som erbjuder lugn naturupplevelse och möjligheter för kajak och enkelt ankörning. Ön är älskad av kajakvinnare.',
      'Naturen på Lindholmen är varierad med skogspartier och badplatser. Det finns möjligheter för enkelt ankörning men service är mycket begränsad.',
      'Lindholmen passar ofta bäst för kajakvinnare eller för seglare som kombinerar en längre resa med möjligheter för enkelt naturvistelse.'
    ],

    facts: { travel_time: '1 h 30 min från Stockholm', character: 'Camping, kajak, natur', season: 'Maj–september', best_for: 'Kajak, naturcamping, avkoppling' },
    activities: [
      { icon: '🛶', name: 'Kajak', desc: 'Utmärkt för paddling i alla riktningar.' },
      { icon: '🏕', name: 'Naturcamping', desc: 'Tälta under bar himmel på klipporna.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt/kajak', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Lindholmens naturhamn', desc: 'Naturlig ankringsplats.', spots: 10 }],
    restaurants: [],
    tips: ['Allemansrätten gäller — lämna inga spår.', 'Ta med eldstartsutrustning för kvällsmat.'],
    related: ['gallno', 'vindo', 'namdo'],
    tags: ['kajak', 'camping', 'natur', 'mellersta'],
  },

  {
    slug: 'iggon',
    name: 'Iggö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Ostörd ytterskärgård i Norrtelje-området',
    description: [
      'Iggö är en liten ostörd ö i yttre norra skärgården. Klart hav, klippor och total stillhet. Dit tar man sig med privat båt och njuter av äkta ytterskärgård.',
      'Iggö kombinerar naturvärdena på ett exponerat läge med möjligheter för enkelt ankörning i skyddade vikar. Det finns möjligheter för badning.',
      'Iggö passar för erfarna seglare som söker äventyr långt från civilisationen.'
    ],

    facts: { travel_time: '2 h från Norrtälje', character: 'Ostörd, klippig, norra', season: 'Juni–september', best_for: 'Segling, natur, äventyr' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Bra naturhamn på södra sidan.' },
      { icon: '🏊', name: 'Havsbadet', desc: 'Klara Östersjövatten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Iggö naturhamn', desc: 'Skyddad naturhamn på sydsidan.', spots: 8 }],
    restaurants: [],
    tips: ['Ta med allt du behöver.'],
    related: ['arholma', 'fejan', 'blido'],
    tags: ['ostörd', 'norra', 'ytterskärgård', 'klippor'],
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
  },

  {
    slug: 'toro-norra',
    name: 'Tornö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌾',
    tagline: 'Jordbruksö med öppna landskap och strandängar',
    description: [
      'Tornö i norra skärgården har ett ovanligt öppet jordbrukslandskap med strandängar och betande djur. En fridfull kontrast till klippskärgårds typiska små öar.',
      'Tornö kombinerar naturen på ett väl skyddat läge med möjligheter för möjligheter för enkelt ankörning. Det finns möjligheter för vandring och fågelskådning.',
      'Tornö passar för naturälskare som söker något annorlunda än vanliga skärgårdsmål.'
    ],

    facts: { travel_time: '1 h 30 min från Norrtälje', character: 'Jordbruk, lugnt, öppet landskap', season: 'Maj–september', best_for: 'Natur, stillhet, familjeutflykt' },
    activities: [
      { icon: '🌾', name: 'Strandängar', desc: 'Promenera längs strandängarna med betande djur.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Strandskator och vadare längs kusterna.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bilfärja', from: 'Riala', time: '30 min', desc: 'Enkel bilfärja sommarsäsong.', icon: '⛴' }],
    harbors: [{ name: 'Tornö gästbrygga', desc: 'Enkel brygga med begränsat antal platser.', spots: 8 }],
    restaurants: [],
    tips: ['Störa inte betande djur.', 'Ta med kikare för fågelskådning.'],
    related: ['blido', 'singo', 'ljustero'],
    tags: ['jordbruk', 'norra', 'strandäng', 'lugnt'],
  },

  {
    slug: 'garnsjon',
    name: 'Östra Lagnö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Bilfri ö med klapperstensstränder och sommarstugor',
    description: [
      'Östra Lagnö är en bilfri ö i mellersta skärgården med klapperstensstränder och sommarstämning. Nådd med passagerarbåt från Stavsnäs.',
      'Naturmässigt erbjuder Östra Lagnö ovanlig steninng längs öns östra kant, och en fantastisk sollägen längs sydstranden. Möjligheter för bad och avkoppling.',
      'Östra Lagnö passar perfekt för den som söker enkel bad och avkoppling utan stora arrangemang.'
    ],

    facts: { travel_time: '1 h 30 min från Stavsnäs', character: 'Bilfri, klappersten, lugn', season: 'Juni–september', best_for: 'Bad, avkoppling, skärgårdsliv' },
    activities: [
      { icon: '🏊', name: 'Klapperstensbad', desc: 'Ovanlig stenbadet längs öns östra kant.' },
      { icon: '☀️', name: 'Solbad', desc: 'Fantastisk sollägen längs sydstranden.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Båt', from: 'Stavsnäs', time: '1 h 30 min', desc: 'Sommarlinje Waxholmsbolaget.', icon: '⛴' }],
    harbors: [{ name: 'Östra Lagnö brygga', desc: 'Gästbrygga med enklare service.', spots: 15 }],
    restaurants: [{ name: 'Lagnö Kafé', type: 'Kafé', desc: 'Hemlagad fika och glass. Öppet sommarsäsong.' }],
    tips: ['Reservera plats i hamnen vid veckoslutsresande.'],
    related: ['gallno', 'moja', 'namdo'],
    tags: ['bilfri', 'klappersten', 'bad', 'sommar', 'mellersta'],
  },

  {
    slug: 'storholmen',
    name: 'Storholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌲',
    tagline: 'Skogsklädd ö med vandringsleder och stillhet',
    description: [
      'Storholmen är en mellanstor skogsklädd ö med markerade vandringsleder och stämningsfulla naturmiljöer. Populärt övernattningsläge för seglare i transit.',
      'Storholmen kombinerar skogsrika områden med möjligheter för vandring och badning. Det finns en gästhamn och möjligheter för enkelt övernattningsankörning.',
      'Storholmen passar för seglare som letar efter ett väl skyddat och vackert ankringsläge med möjligheter för naturupplevelse.'
    ],

    facts: { travel_time: '1 h 30 min från Stockholm', character: 'Skog, vandring, lugnt', season: 'Maj–september', best_for: 'Vandring, segling, övernattning' },
    activities: [
      { icon: '🥾', name: 'Vandring', desc: 'Markerade leder genom gammal barrskog.' },
      { icon: '⛵', name: 'Segling', desc: 'Välskyddad hamn för övernattning.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Sommarlinje möjlig — kontrollera aktuell tidtabell.', icon: '⛵' }],
    harbors: [{ name: 'Storholmens gästhamn', desc: 'Bra naturhamn med staket och mulltoa.', spots: 20 }],
    restaurants: [],
    tips: ['Eldning på anvisad plats.'],
    related: ['gallno', 'moja', 'ingmarso'],
    tags: ['skog', 'vandring', 'segling', 'mellersta'],
  },

  {
    slug: 'graskar-sodra',
    name: 'Gräskär (södra)',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌊',
    tagline: 'Ytterskärgårdens vindpinade vilda ö',
    description: [
      'Gräskär söder om Ornö är ett ytterskär med exponerad karaktär och dramatisk miljö. Ön är endast tillgänglig för erfarna seglare med egen båt.',
      'Naturmässigt är denna del av skärgården vild och vindpinad, omgiven av öppet hav på flera sidor. Det finns möjligheter för ankörning men dessa kräver erfarenhet.',
      'Gräskär söder är primärt för erfarna seglare som söker äventyr och dramatisk natur, ofta som etappmål på längre sydliga seglingsresor.'
    ],

    facts: { travel_time: '4 h från Stockholm', character: 'Vild, vindexponerad, södra', season: 'Juni–september', best_for: 'Erfarna seglare, natur, äventyr' },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Krävande insegling — belönar erfarna.' },
      { icon: '🌊', name: 'Hav och klippor', desc: 'Ytterskärgårdens rå dramatik.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Kräver erfarenhet. Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Gräskärs naturhamn', desc: 'Exponerad naturhamn — krävande i dåligt väder.', spots: 5 }],
    restaurants: [],
    tips: ['Kontrollera SMHI noggrant.', 'Ha alternativ hamn planerad.'],
    related: ['orno', 'landsort', 'fjardlang'],
    tags: ['ytterskärgård', 'vild', 'södra', 'erfarna seglare'],
  },

  {
    slug: 'ostanvik',
    name: 'Östanvik',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏡',
    tagline: 'Liten ö med karaktär och sommarstämning',
    description: [
      'Östanvik är en charmerande liten ö med sommarstugor och ett stämningsfullt läge i mellersta skärgården. Lugnt och genuint — utan turistatmosfär.',
      'Östanvik kombinerar naturvärdena på ett väl skyddat läge med möjligheter för enkelt ankörning. Badplatser längs kusten och möjligheter för enkel vistelse.',
      'Östanvik passar för seglare som redan är ute på havet och letar efter ett enkelt, lugnt ankringsläge långt från populära destinationer.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Genuint, lugnt, sommarstugor', season: 'Juni–september', best_for: 'Avkoppling, segling, genuint liv' },
    activities: [
      { icon: '🏊', name: 'Bad', desc: 'Klara vatten och fina klippor.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad vik för övernattning.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Östanviks naturhamn', desc: 'Liten skyddad naturhamn.', spots: 8 }],
    restaurants: [],
    tips: ['Respektera de som sommarbor här.'],
    related: ['gallno', 'moja', 'namdo'],
    tags: ['genuint', 'lugnt', 'segling', 'mellersta'],
  },

  {
    slug: 'langskar',
    name: 'Långskär',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🧭',
    tagline: 'Smalt naturskär med dramatisk utsikt och seglartradition',
    description: [
      'Långskär är ett smalt klippskär i norra skärgården med en lång seglartradition som angöringsplats. Enkelt men välkänt bland norrtäljeseglare.',
      'Långskär kombinerar naturvärdena på ett exponerat läge med möjligheter för enkelt ankörning. Det finns möjligheter för badning och naturupplevelse.',
      'Långskär passar för seglare som letar efter en klassisk angöringsplats på nordraleden.'
    ],

    facts: { travel_time: '1 h 30 min från Norrtälje', character: 'Smalt skär, segling, tradition', season: 'Maj–september', best_for: 'Segling, angöring, natur' },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Klassisk angöringsplats på norraleden.' },
      { icon: '🌅', name: 'Soluppgångsvyer', desc: 'Öppen östhorisont mot havet.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långskärs naturhamn', desc: 'Begränsat men skyddat på vestsidan.', spots: 6 }],
    restaurants: [],
    tips: ['Kolla vindprognosen — exponerat vid sydväst.'],
    related: ['fejan', 'blido', 'arholma'],
    tags: ['segling', 'norra', 'klippskär', 'tradition'],
  },

  {
    slug: 'vastervik-uto',
    name: 'Västerholm',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌺',
    tagline: 'Blomstrande ö med gästhamn söder om Utö',
    description: [
      'Västerholm söder om Utö är en relativt ostörd ö med blomstrande klippor och en välkomstande gästhamn för seglare. Bra alternativ till det fullbelagda Utö.',
      'Västerholm kombinerar naturvärdena med möjligheter för enkel ankörning. Det finns möjligheter för badning och botanisk utforskning längs klippkusten.',
      'Västerholm passar som bra alternativ när Utö är fullbelagt under högsäsong.'
    ],

    facts: { travel_time: '3 h 30 min från Stockholm', character: 'Ostört, blomstrande, södra', season: 'Juni–september', best_for: 'Segling, alternativ till Utö, natur' },
    activities: [
      { icon: '🌺', name: 'Botanik', desc: 'Rik blomsteflora längs klippkusten.' },
      { icon: '⛵', name: 'Segling', desc: 'Bra alternativ till trånga Utö sommartid.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser — nåbar från Utö eller Dalarö.', icon: '⛵' }],
    harbors: [{ name: 'Västerholms gästhamn', desc: 'Välskött liten hamn med staket.', spots: 15 }],
    restaurants: [],
    tips: ['Bra alternativ när Utö är fullbelagt.'],
    related: ['uto', 'nattaro', 'fjardlang'],
    tags: ['södra', 'blomstring', 'segling', 'orört'],
  },

  {
    slug: 'ramskar-norra',
    name: 'Ramskär (norra)',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '⛵',
    tagline: 'Norrtälje-skärgårdens välkända angöringsplats',
    description: [
      'Norra Ramskär är en känd angöringsplats i norr med bra skydd och naturhamn som välkomnar seglare i transit. Perfekt angöringsplats på nordledens seglarrutt.',
      'Norra Ramskär kombinerar naturvärdena på ett väl skyddat läge med möjligheter för enkelt övernattningsankörning. Det finns möjligheter för naturupplevelse.',
      'Norra Ramskär är populärt i norra seglarflottans rutter mot Åland och Norrlands östkust.'
    ],

    facts: { travel_time: '2 h från Norrtälje', character: 'Angöring, transit, skyddat', season: 'Maj–september', best_for: 'Segling, övernattning, angöring' },
    activities: [{ icon: '⛵', name: 'Segling', desc: 'Perfekt angöringsplats på nordledens seglarrutt.' }],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Norra Ramskärs naturhamn', desc: 'Välskyddat och rymligt.', spots: 20 }],
    restaurants: [],
    tips: ['Populärt i norra seglarflottans rutter mot Åland.'],
    related: ['arholma', 'blido', 'fejan'],
    tags: ['norra', 'segling', 'angöring', 'transit'],
  },

  {
    slug: 'aspoja',
    name: 'Aspö/Aspöja',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌿',
    tagline: 'Ostörd söderö med aspskog och klara vikar',
    description: [
      'Aspö är en stilla ö i södra skärgården med karakteristisk aspskog och klara vikar. Besöks av naturintresserade och lugnsökande seglare.',
      'Aspö kombinerar naturvärdena på ett väl skyddat läge med möjligheter för enkelt ankörning. Det finns möjligheter för naturvandring och badning.',
      'Aspö passar för naturälskare som redan är ute på havet och letar efter ett enkelt ankringsläge.'
    ],

    facts: { travel_time: '3 h från Stockholm', character: 'Skog, lugnt, genuint', season: 'Maj–september', best_for: 'Natur, stillhet, segling' },
    activities: [
      { icon: '🌿', name: 'Naturvandring', desc: 'Aspskog och strandnatur.' },
      { icon: '🏊', name: 'Bad', desc: 'Klara vikar med lite strömmar.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Aspö naturhamn', desc: 'Enkel naturhamn.', spots: 8 }],
    restaurants: [],
    tips: ['Ta med picnic och ta det lugnt.'],
    related: ['orno', 'dalaro', 'morko'],
    tags: ['skog', 'lugnt', 'södra', 'natur'],
  },

  {
    slug: 'korsholmen',
    name: 'Korsholmen',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '✝️',
    tagline: 'Liten kapell-ö i skärgårdens mitt med stämning',
    description: [
      'Korsholmen är en liten ö med ett välbevarat kapell och en stark känsla av tid som stannat. En perfekt anhalt för den som vill byta tempo.',
      'Korsholmen kombinerar det spirituella värdena av kapellet med naturmiljön. Det finns möjligheter för enkelt ankörning och reflexiv naturupplevelse.',
      'Korsholmen passar för den som söker andlig ro och stämning långt från turistströmmarna.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Kapell, liten, stämningsfull', season: 'Juni–september', best_for: 'Andlig ro, natur, historia' },
    activities: [
      { icon: '✝️', name: 'Kapellbesök', desc: 'Litet välbevarat kapell öppet sommarsäsong.' },
      { icon: '🌅', name: 'Kvällsvyer', desc: 'Stämningsfull utsikt vid solnedgång.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Ingen reguljär trafik.', icon: '⛵' }],
    harbors: [{ name: 'Korsholmens naturhamn', desc: 'Liten naturhamn.', spots: 6 }],
    restaurants: [],
    tips: ['Respektera kapellets lugn.'],
    related: ['gallno', 'moja', 'namdo'],
    tags: ['kapell', 'lugnt', 'mellersta', 'stämning'],
  },

  {
    slug: 'vastana',
    name: 'Västan-ön',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌊',
    tagline: 'Norra ögruppen med öppet hav och kajakstig',
    description: [
      'Västanö är en liten ö i södra skärgården som erbjuder lugn och möjligheter för enkel vistelse. Ön är mindre uppmärksammad men älskad.',
      'Västanö kombinerar naturvärdena på ett väl skyddat läge med möjligheter för enkelt ankörning. Badplatser längs kusten erbjuds. Service är minimal.',
      'Västanö passar för seglare som redan är ute på havet och letar efter ett enkelt, lugnt ankringsläge.'
    ],

    facts: { travel_time: '2 h 30 min från Norrtälje', character: 'Ytterskärgård, kajak, norra', season: 'Juni–september', best_for: 'Kajak, äventyr, natur' },
    activities: [
      { icon: '🛶', name: 'Havskajak', desc: 'Bra utgångsläge för yttre kajakturer.' },
      { icon: '⛵', name: 'Segling', desc: 'Ankringsplats för norra ledens seglare.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt/kajak', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Västan-öns naturhamn', desc: 'Begränsad vik.', spots: 6 }],
    restaurants: [],
    tips: ['Kräver erfaren paddlare eller besättning vid västvind.'],
    related: ['arholma', 'fejan', 'blido'],
    tags: ['kajak', 'norra', 'ytterskärgård', 'äventyr'],
  },

  {
    slug: 'storskar',
    name: 'Storskär',
    region: 'mellersta',
    regionLabel: 'Ytterskärgård',
    emoji: '🌊',
    tagline: 'Klassisk angöring på vägen mot Sandhamn',
    description: [
      'Storskär är ett större naturskär i mellersta skärgården som erbjuder möjligheter för enkelt ankörning och naturupplevelse. Skäret är mindre besökt.',
      'Storskär kombinerar naturvärdena på ett exponerat läge med möjligheter för enkel ankörning. Badplatser längs kusten erbjuds. Service är minimal.',
      'Storskär passar ofta som ett sekundärt stopp för seglare som redan är ute, eller för den som letar efter något orört.'
    ],

    facts: { travel_time: '2 h från Stockholm', character: 'Angöring, naturhamn, segling', season: 'Maj–september', best_for: 'Segling, övernattning' },
    activities: [{ icon: '⛵', name: 'Segling', desc: 'Klassisk angöringsplats på Sandhamns-rutten.' }],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Storskärs naturhamn', desc: 'God plats och välskyddat.', spots: 25 }],
    restaurants: [],
    tips: ['Eldning tillåten på anvisad plats.', 'Sötvattentank – ta med eget.'],
    related: ['sandhamn', 'kanholmen', 'norrora'],
    tags: ['segling', 'angöring', 'naturhamn', 'mellersta'],
  },

]

export function getIsland(slug: string): Island | undefined {
  return ISLANDS.find(i => i.slug === slug)
}

export function getIslandsByRegion(region: Island['region']): Island[] {
  return ISLANDS.filter(i => i.region === region)
}

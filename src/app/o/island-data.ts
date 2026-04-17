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
      'Furusund är kanske norra skärgårdens mest välkända passage. Sundets starka strömsättning och de trånga farvattnen har gjort det till en naturlig samlingsplats för seglare och båtfolk i alla år. Furusund Värdshus är det naturliga stoppet.',
      'August Strindberg tillbringade sommrar här och satte Furusund på kartan litterärt. Den stämning han beskrev finns kvar — ett sund med seglare som passerar, trävillor på klipporna och lugnet som bara Roslagen kan erbjuda.',
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
      'Blidö är en relativt stor ö i norra skärgården med en blandning av permanentboende och sommargäster. Ön nås med bilfärja från Vätö och har ett lugnare tempo än öarna i mellersta skärgården.',
      'Naturen på Blidö är varierad med skog, åkrar och en lång kustlinje. Blidö Brygga & Bistro är det naturliga stoppet för båtfolk.',
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
      'Gällnö är en bilfri ö i mellersta skärgården som är skyddad som naturreservat. Ön är känd för sin lägerverksamhet och för att vara en av de mer orörda öarna i den mellersta korridoren.',
      'Gällnö passar för den som söker natur framför nöjen. Inga restauranger av restaurangklass — men en bar och handelsbod täcker grundbehoven.',
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
      'Norröra är en liten ö i norra skärgården känd för att vara en av inspelningsplatserna för Astrid Lindgrens Madicken-filmer. Ön är liten, lugn och perfekt för barnfamiljer som söker en äkta skärgårdsupplevelse.',
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
      'Nåttarö är ett naturreservat i södra skärgården med en vacker och vild natur. Ön besöks av seglare och naturälskare som söker lugn och orördhet. Krogen är enkel men uppfyller sitt syfte.',
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
]

export function getIsland(slug: string): Island | undefined {
  return ISLANDS.find(i => i.slug === slug)
}

export function getIslandsByRegion(region: Island['region']): Island[] {
  return ISLANDS.filter(i => i.region === region)
}

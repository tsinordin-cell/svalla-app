export type StopType = 'transport' | 'mat' | 'kultur' | 'natur' | 'bad' | 'aktivitet' | 'boende'

export type TripStop = {
  name: string
  type: StopType
  desc: string
  tip?: string
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
  islandSlugs?: string[]
}

export const TRIPS: Trip[] = [
  {
    slug: 'djuro-grinda-dagstur',
    title: 'Bil, glass och båt — Djurö till Grinda',
    tagline: 'En av skärgårdens bästa dagsrutter med bil, brygga och lunchstopp på Grinda.',
    duration: 'Heldag (ca 8 timmar)',
    startPoint: 'Stockholm city',
    transport: 'Bil + båt',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'En perfekt skärgårdsdag som kombinerar det bästa av land och vatten. Du kör till Djurö, utforskar bilmuseet, hämtar glass vid Sollenkroka brygga och kliver ombord på båten till Grinda för lunch på wärdshuset. Returen går samma väg eller via Waxholmsbåten tillbaka till stan.',
    stops: [
      {
        name: 'Djurö bilmuseum',
        type: 'kultur',
        desc: 'Över 60 veteranbilar i en gammal lada mitt i skärgårdslandskapet. Oväntat bra och barnvänligt.',
        tip: 'Öppnar kl 11 — kom inte för tidigt. Beräkna 1–1,5 timme.',
      },
      {
        name: 'Glassbaren vid Sollenkroka brygga',
        type: 'mat',
        desc: 'Klassisk skärgårdsglass med utsikt mot båttrafiken. Känd för sina lokala smaker.',
        tip: 'Köp glassen och sätt dig på bryggan — det är halva upplevelsen.',
      },
      {
        name: 'Båten från Sollenkroka till Grinda',
        type: 'transport',
        desc: 'Lokalbåten går flera gånger om dagen. Turen tar ca 20 minuter genom vacker inre skärgård.',
        tip: 'Kolla Waxholmsbolagets tidtabell innan du åker hemifrån.',
      },
      {
        name: 'Lunch på Grinda Wärdshus',
        type: 'mat',
        desc: 'Skärgårdskök med fokus på lokala råvaror. Uteservering med utsikt mot vattnet och segelbåtar.',
        tip: 'Boka bord i förväg på sommaren — de blir fullsatta snabbt.',
      },
      {
        name: 'Grindas naturhamn',
        type: 'bad',
        desc: 'Ta ett dopp i den skyddade viken på östra sidan av ön. Klippor och klart vatten.',
      },
    ],
    islandSlugs: ['grinda'],
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
    description: 'Vaxholm är det närmaste du kommer äkta skärgårdskänsla utan att åka långt. Waxholmsbåten tar dig dit på 75 minuter, fästningen imponerar på alla åldrar och gamla stan bjuder på genuina träkåkar och trevliga kaféer. En utmärkt introduktion till Stockholms skärgård.',
    stops: [
      {
        name: 'Waxholmsbåten från Strömkajen',
        type: 'transport',
        desc: 'Avgår varje timme från Strömkajen. 75 minuters tur genom den inre skärgården.',
        tip: 'Sitt på däck oavsett väder — utsikten är värd det.',
      },
      {
        name: 'Vaxholms fästning',
        type: 'kultur',
        desc: 'Historisk befästning från 1500-talet med museum och guidade turer. Nås med liten färja från hamnen.',
        tip: 'Biljett till fästningen köps vid bryggan. Guidad tur tar 45 min och är väl värd pengarna.',
      },
      {
        name: 'Lunch på Waxholms Hotell',
        type: 'mat',
        desc: 'Klassiskt skärgårdshotell med uteservering i hamnen. Räkor, strömming och svenska klassiker.',
        tip: 'Räksmörgåsen är legendarisk — beställ den.',
      },
      {
        name: 'Gamla stan i Vaxholm',
        type: 'kultur',
        desc: 'Välbevarade trävillor och stenläggda gator. Promenera längs kanalen och kika in i butikerna.',
      },
      {
        name: 'Ribbåtstur från Vaxholms gästhamn',
        type: 'aktivitet',
        desc: 'Lokala aktörer erbjuder korta ribbåtsturer runt fästningen och in i skärgården.',
        tip: 'Bokas på plats vid hamnen eller via Svallas upplevelsefliken.',
      },
    ],
    islandSlugs: ['vaxholm'],
  },
  {
    slug: 'sandhamn-ytterskargard',
    title: 'Sandhamn — ytterskärgårdens pärlа',
    tagline: 'Lång båtresa, fantastisk strand och KSSS-hamnen med segelbåtar.',
    duration: 'Heldag (10 timmar)',
    startPoint: 'Strömkajen, Stockholm',
    transport: 'Båt (Cinderellabåten)',
    season: 'Juni–Augusti',
    difficulty: 'lätt',
    description: 'Sandhamn är målet om du vill känna den riktiga ytterskärgården. Cinderellabåten tar dig dit på 2,5 timmar med stopp på vägen — resan är en del av upplevelsen. Väl framme väntar Trouville-stranden, KSSS-hamnen full av segelbåtar och Sandhamns Värdshus.',
    stops: [
      {
        name: 'Cinderellabåten från Strömkajen',
        type: 'transport',
        desc: '2,5 timmar med stopp i Stavsnäs och på andra öar. Servering ombord och magnifik utsikt.',
        tip: 'Boka biljett i förväg under högsäsong. Sittplatser på däck tar slut tidigt.',
      },
      {
        name: 'KSSS-hamnen',
        type: 'kultur',
        desc: 'Kungliga Svenska Segel Sällskapets hemmahamn. Hundratals segelbåtar, en levande marina.',
        tip: 'Promenera längs bryggan och titta på riggarna — gratis och fascinerande.',
      },
      {
        name: 'Trouville-stranden',
        type: 'bad',
        desc: 'Sandhamns bästa badstrand med vit sand och relativt grunt vatten. 10 minuter promenad från hamnen.',
        tip: 'Ta med picknick — stranden är lång och det finns gott om plats.',
      },
      {
        name: 'Lunch eller middag på Sandhamns Värdshus',
        type: 'mat',
        desc: 'Det självklara matmålet på ön med skärgårdsrätter och stor uteservering.',
        tip: 'Boka bord på förhand — fullsatt nästan varje dag i juli.',
      },
      {
        name: 'Byn Sandhamn',
        type: 'kultur',
        desc: 'Små butiker, ett bageri och gamla sjömanshus. En av skärgårdens mest charmiga byar.',
      },
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
    description: 'Utö är en av de stora skärgårdsöarna med riktigt karaktär — en aktiv järngruva på 1700-talet, cykelleder genom barrskog och havsbastu som håller hög klass. Du tar färjan från Årsta havsbad eller Nynäshamn, hyr cykel och är igång.',
    stops: [
      {
        name: 'Färjan till Utö',
        type: 'transport',
        desc: 'Avgår från Årsta havsbad (45 min) eller Nynäshamn (2 tim). Pendelbåtsbiljett gäller från Nynäshamn.',
        tip: 'Från Stockholm: tåg till Nynäshamn, sedan Waxholmsbolagets båt.',
      },
      {
        name: 'Cykelhyra vid bryggan',
        type: 'aktivitet',
        desc: 'Flera uthyrare vid Utö Värdshus och vid Gruvbryggan. Elcyklar finns för de som vill ta det lugnt.',
        tip: 'Boka cykel i förväg på sommaren — de tar slut tidigt på helgerna.',
      },
      {
        name: 'Utö Gruvmuseum',
        type: 'kultur',
        desc: 'Sveriges äldsta järngruva, aktiv 1150–1879. Fascinerande historia berättad på ett lättillgängligt sätt.',
        tip: 'Det finns en gammal gruvkiosk intill — perfekt kaffekorv.',
      },
      {
        name: 'Havsbastu på Utö Värdshus',
        type: 'bad',
        desc: 'En av skärgårdens finaste havsbastuupplevelser med klippor att hoppa från. Kvällspass är bäst.',
        tip: 'Boka bastutid på utovardshus.se — kvällspassen med solnedgång är snabbt fullbokade.',
      },
      {
        name: 'Middag på Utö Värdshus',
        type: 'mat',
        desc: 'Klassiskt värdshus med lokalt skärgårdskök. Uteservering med utsikt mot vattnet.',
      },
    ],
    islandSlugs: ['uto'],
  },
  {
    slug: 'fjaderholmarna-snabbtur',
    title: 'Fjäderholmarna — skärgård på en timme från stan',
    tagline: 'Närmaste skärgårdsön från Stockholms city. Perfekt för en eftermiddag.',
    duration: 'Halvdag (3–4 timmar)',
    startPoint: 'Slussen eller Nybroplan, Stockholm',
    transport: 'Båt',
    season: 'Maj–September',
    difficulty: 'lätt',
    description: 'Fjäderholmarna är Stockholms närmaste skärgårdsö — 25 minuter med båt från Slussen. Det är den perfekta lösningen för en spontan eftermiddag i skärgården: hantverksbod, bryggerier, en hygglig restaurang och klippbad. Inget behöver bokas i förväg.',
    stops: [
      {
        name: 'Båten från Slussen eller Nybroplan',
        type: 'transport',
        desc: '25 minuters tur med Fjäderholmsbåtarna. Avgår varje halvtimme under sommaren.',
        tip: 'Inga förhandsköp nödvändiga — betala ombord med kort.',
      },
      {
        name: 'Fjäderholmarnas glasshytta',
        type: 'kultur',
        desc: 'Se glasblåsare arbeta och köp med dig ett handblåst minne från ön.',
      },
      {
        name: 'Klippbad',
        type: 'bad',
        desc: 'Välbearbetade klippor runt hela ön. Vattnet är klart och det finns stegar ner i havet.',
        tip: 'Ta med handduk och badkläder — det är värt ett dopp.',
      },
      {
        name: 'Lunch på Fjäderholmarnas Krog',
        type: 'mat',
        desc: 'Räkor, grillad fisk och skärgårdsklassiker. En av Stockholms bättre sommarkrogar.',
        tip: 'Boka bord — populärt med stockholmare på lunch.',
      },
      {
        name: 'Hantverksbutikerna',
        type: 'kultur',
        desc: 'Lokalt hantverk, smycken och souvenirer. Bra urval av svenska designprodukter.',
      },
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
    description: 'Finnhamn är ett av skärgårdens bästa naturmål — stor nok för en dags vandring, liten nog för att känna att du har ön för dig själv. Vandringsleder runt hela ön, klippbad och Finnhamnsgården som serverar enkel mat. Perfekt för er som vill bort från folkmassor.',
    stops: [
      {
        name: 'Waxholmsbåten till Finnhamn',
        type: 'transport',
        desc: 'Cirka 2,5 timmar från Strömkajen med stopp på vägen. Fantastisk utsikt längs hela rutten.',
        tip: 'Kolla tidtabellen på waxholmsbolaget.se — det är begränsat med avgångar på vardagar.',
      },
      {
        name: 'Vandring runt norra Finnhamn',
        type: 'natur',
        desc: 'Välmarkerade leder genom barrskog och ut på öppna klippor med havsvy. Totalt ca 6 km runt.',
        tip: 'Ta med karta — skyltningen är bra men det finns sidostigar som kan förvirra.',
      },
      {
        name: 'Klippbad på östra udden',
        type: 'bad',
        desc: 'Öppna klippor mot ytterskärgården. Vinden kan vara stark men vattnet är klart och friskt.',
      },
      {
        name: 'Lunch på Finnhamnsgården',
        type: 'mat',
        desc: 'Enkel husmanskost och kaffe i ett gammalt skärgårdslanderi. Stänger tidigt på eftermiddagen.',
        tip: 'De har begränsat med mat — kom senast 13.00 för lunch.',
      },
      {
        name: 'Naturhamnen på södra sidan',
        type: 'natur',
        desc: 'Skyddad vik där seglare ankrar. Perfekt för ett sista dopp innan båten tillbaka.',
      },
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
    description: 'Möja är en av de få öar i Stockholms skärgård med en levande lokal befolkning året om. Här finns en byhandel, ett bageri och vandringsleder som ingen utanför skärgården känner till. Kom hit för att uppleva hur livet faktiskt ser ut i skärgården.',
    stops: [
      {
        name: 'Waxholmsbåten till Möja',
        type: 'transport',
        desc: 'Drygt 3 timmar från Stockholm med stopp på Sandhamn och andra öar. En av de längre turerna.',
        tip: 'Ta morgonbåten för att maximera tiden på ön.',
      },
      {
        name: 'Möja byhandel',
        type: 'kultur',
        desc: 'En av skärgårdens sista riktiga lanthandlar. Här handlar lokalbefolkningen — och du kan göra detsamma.',
        tip: 'Köp med dig lokala produkter — det är sällan du hittar dem i stan.',
      },
      {
        name: 'Vandring till Möjas sydspets',
        type: 'natur',
        desc: 'Smal led genom lummig skog ut till klippor med öppen havsutsikt. Runt 4 km tur och retur.',
      },
      {
        name: 'Bad vid Möja klipporna',
        type: 'bad',
        desc: 'Välbearbetade klippor längs södra stranden. Lugnt vatten och inga folkmassor.',
      },
      {
        name: 'Möja Café och Krog',
        type: 'mat',
        desc: 'Lokalt café med hembakade bullar och enkel lunch. Öppen sommar och tidiga höstmånader.',
        tip: 'Kontrollera öppettiderna innan — de varierar beroende på säsong.',
      },
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
    description: 'Dalarö är en av de mest välbevarade skärgårdssamhällena i Stockholms skärgård. Här stannade stockholmarna sommartid redan på 1800-talet, och stockhusvillorna vittnar om det. En timmes bilresa och du är framme — utan att behöva ta båt.',
    stops: [
      {
        name: 'Körning via Handen och Haninge',
        type: 'transport',
        desc: 'Ca 1 timme bil från Stockholm city via E18/E20. Parkering vid Dalarö hamn.',
        tip: 'Kom tidigt på sommarlördagar — parkeringen vid hamnen fylls upp.',
      },
      {
        name: 'Dalarö hamn och gamla stan',
        type: 'kultur',
        desc: 'Välbevarade trävillor och en charmig hamnmiljö. Promenera längs kajen och ta in vyn.',
      },
      {
        name: 'Bad vid Dalarö klippbad',
        type: 'bad',
        desc: 'Klippor och bryggor strax utanför byn. Populärt men sällan överfyllt — ta med picknick.',
        tip: 'Det finns ett litet café vid badplatsen med glass och dryck.',
      },
      {
        name: 'Kajaktur från Dalarö',
        type: 'aktivitet',
        desc: 'Uthyrning finns vid hamnen. Paddla ut till de närmaste holmarna på en timme.',
        tip: 'Bra för nybörjare — inre skärgårdsvatten med vindskydd.',
      },
      {
        name: 'Middag på Dalarö Skärgårdskrog',
        type: 'mat',
        desc: 'Lokal krog med skärgårdsmat och havsutsikt. Populär bland stockholmare med sommarstuga i trakten.',
        tip: 'Boka bord på helger — det är en lokal favorit.',
      },
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
    description: 'Arholma är yttersta punkten i Stockholms norra skärgård — och det märks. Färre turister, vildare natur och en känsla av att vara riktigt långt borta. Perfekt för er som söker äkta ödslighet. Kom hit för fyren, havsbadets klippor och vyn mot Finland.',
    stops: [
      {
        name: 'Bil till Simpnäs och färja',
        type: 'transport',
        desc: 'Ca 1,5 tim bil norr om Stockholm till Simpnäs. Därifrån går färjan till Arholma.',
        tip: 'Kolla Arholma Båttrafiks tidtabell — avgångarna är begränsade.',
      },
      {
        name: 'Arholma fyr',
        type: 'kultur',
        desc: 'En av de äldsta fyrarna i Roslagen, byggd 1769. Klättra upp för utsikt mot öppet hav.',
        tip: 'Fyren är öppen för besökare under sommaren, utan föranmälan.',
      },
      {
        name: 'Klippbad på norra udden',
        type: 'bad',
        desc: 'Öppna klippor mot Ålands hav. Vinden är påtaglig och vattnet är svalt — men upplevelsen är oförglömlig.',
      },
      {
        name: 'Vandring runt ön',
        type: 'natur',
        desc: 'Markerade leder runt hela Arholma, ca 8 km. Passerar naturhamnar, fågelkolonier och öppna hav.',
        tip: 'Häckningssäsongen mars–juli — håll dig till lederna för att inte störa fåglarna.',
      },
      {
        name: 'Arholma Krog och Café',
        type: 'mat',
        desc: 'Enda restaurangen på ön. Enkel mat, lokalt fiske och gott kaffe med havsvy.',
        tip: 'Stänger tidigt — planera lunchen, inte middagen, som måltid här.',
      },
    ],
    islandSlugs: ['arholma'],
  },
  {
    slug: 'nattaro-vild-natur',
    title: 'Nåttarö — naturreservat och sälar',
    tagline: 'Södra skärgårdens vildaste naturreservat med sälar, klippbad och tyst ödemark.',
    duration: 'Heldag',
    startPoint: 'Nynäshamn (bil/tåg)',
    transport: 'Tåg/bil + båt',
    season: 'Juni–Augusti',
    difficulty: 'medel',
    description: 'Nåttarö är ett av de bäst bevarade naturreservaten i Stockholms skärgård. Inga bilar, inga restauranger, inga hotell. Bara klippor, barrskog, sälskådning och tystnad. Tar du med picknick och badkläder har du allt du behöver för en perfekt dag.',
    stops: [
      {
        name: 'Tåg till Nynäshamn + båt',
        type: 'transport',
        desc: 'Pendeltåg från Stockholm C till Nynäshamn (ca 1 tim). Därifrån båt till Nåttarö med Waxholmsbolaget.',
        tip: 'SL-kortet gäller till Nynäshamn. Waxholmsbolagets biljett köps separat ombord.',
      },
      {
        name: 'Sälskådning vid sydspetsen',
        type: 'natur',
        desc: 'En koloni av knubbsälar brukar sola på skären söder om ön. Ta med kikare.',
        tip: 'Håll minst 100 meters avstånd så att de inte skräms bort.',
      },
      {
        name: 'Vandring genom naturreservatet',
        type: 'natur',
        desc: 'Välmarkerade leder genom orörda skogar och ut på öppna hällmarker. Ca 5–7 km.',
      },
      {
        name: 'Klippbad på östra sidan',
        type: 'bad',
        desc: 'Öppna klippor mot ytterskärgården. Rent vatten, inga båtar — bara du och havet.',
      },
      {
        name: 'Picknick med havsutsikt',
        type: 'mat',
        desc: 'Inga restauranger på ön — ta med allt du behöver. Det finns eldplatser men ta med ved.',
        tip: 'Köp färska räkor vid Nynäshamns hamn innan du tar båten.',
      },
    ],
    islandSlugs: [],
  },
]

export function getTrip(slug: string): Trip | undefined {
  return TRIPS.find(t => t.slug === slug)
}

export function getTripsByDifficulty(difficulty: TripDifficulty): Trip[] {
  return TRIPS.filter(t => t.difficulty === difficulty)
}

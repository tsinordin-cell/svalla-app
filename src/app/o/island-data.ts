export type IslandActivity = {
  icon: string
  name: string
  desc: string
}

export type IslandAccommodation = {
  name: string
  type: string
  desc: string
  /** Boknings-URL — visas som "Boka →" på boende-undersidan */
  bookingUrl?: string
  /** Hemsida — visas som "Hemsida →" */
  websiteUrl?: string
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
  price_example?: string
  open_season?: string
  open_hours?: string
  book_required?: boolean
  book_note?: string
  phone?: string
  child_menu?: boolean
}

export type IslandBeach = {
  name: string
  /** Beskrivning som känns lokal och specifik */
  desc: string
  type: 'sandstrand' | 'klippbad' | 'grusstrand' | 'brygga' | 'trampolinbad' | 'badvik'
  child_friendly?: boolean
  depth?: string
  directions?: string
  insider_tip?: string
}

export type IslandDayCost = {
  budget_per_person: string
  includes: string
  breakdown: { item: string; price: string }[]
  tips: string[]
}

export type Island = {
  slug: string
  name: string
  /** URL till coverbild (Wikimedia, Unsplash etc.) — visas i listsidor och OG-bilder */
  coverImage?: string
  region: 'norra' | 'mellersta' | 'södra' | 'bohuslan' | 'ovriga' | 'goteborg'
  regionLabel?: string
  emoji: string
  tagline: string
  lat?: number   // approx center coordinate
  lng?: number
  description: string[]
  facts: Record<string, string>
  /**
   * Källproveniens per faktvärde i facts{}. Nyckeln matchar facts-nyckeln
   * (travel_time, season, character, best_for). 'matt' = källbelagt mot
   * myndighet/operatör, visas med ✓ 'Källbelagd'. 'bedomning' = vår egen
   * redaktionella bedömning, visas med ≈ 'Vår bedömning'. Fält som saknas
   * här visas utan märkning (nuläget). Infört varv 53 (2026-08-25).
   */
  facts_provenance?: Record<string, 'matt' | 'bedomning'>
  activities: IslandActivity[]
  accommodation: IslandAccommodation[]
  getting_there: IslandTransport[]
  harbors: IslandHarbor[]
  restaurants: IslandRestaurant[]
  day_cost?: IslandDayCost
  tips: string[]
  related: string[]
  tags: string[]
  /** 2–3 meningar om boendeutbudet på denna specifika ö — visas på /o/[slug]/boende */
  accommodationIntro?: string
  /**
   * Anpassad SEO-title som ersätter den generiska mallen.
   * Ange för högtrafik-öar för att bättre matcha sökintent.
   * Max ~60 tecken inkl. " | Svalla" (12 tecken) = 48 tecken för titeln.
   */
  seoTitle?: string
  /**
   * Anpassad meta description som ersätter den generiska mallen.
   * Ange för högtrafik-öar. Max ~155 tecken.
   */
  seoDescription?: string
  did_you_know?: string
  /**
   * Maskinläsbar transport-sammanfattning för /ta-dig-till/[slug] och BusTrip-schema.
   * Kompletterar getting_there[] som är display-fokuserad.
   */
  transport_meta?: {
    from_city_min: number       // restid i minuter från Strömkajen / central hållplats
    from_nearest_hub_min: number // restid från närmaste pendeltågs-brygga (t.ex. Stavsnäs, Nynäshamn)
    nearest_hub: string          // namn på närmaste hub, t.ex. "Stavsnäs"
    operator: string             // "Waxholmsbolaget" | "Cinderella" | "Strömma"
    line?: string                // linjenummer eller linjenamn
    frequency: string            // t.ex. "Varje timme" | "3–5 ggr/dag sommartid"
    booking_url?: string
    car_parking?: string         // parkerings-info vid avfärdsbryggan
  }
  /**
   * Strukturerade aktivitetsdetaljer för schema.org och filter-funktioner.
   * Separerat från activities[] som är display-fokuserad med ikon + beskrivning.
   */
  activity_meta?: {
    kajak?: { difficulty: string, rental: boolean, notes?: string }
    cykel?: { rental: boolean, km_track?: number, notes?: string }
    bad?: { beaches: (string | IslandBeach)[] }
    vandring?: { trails: number, max_km?: number }
    fiske?: boolean
  }
  /** Praktisk serviceinformation på ön — för schema och filter */
  amenities?: {
    toilets?: boolean
    shower?: boolean
    cafe?: boolean
    grocery?: boolean
    atm?: boolean
    restaurant?: boolean
    shop?: boolean
    accommodation?: boolean
    beach?: boolean
    camping?: boolean
  }
  /** Hundvänlighet — för /oar/hundvanliga och ö-sida */
  dog_friendly?: boolean
  dog_notes?: string
  /**
   * Specifika insiderkunskaper om ön — används av Thorkel och visas på ö-sidan.
   * Ska vara konkreta, faktakontrollerade och svåra att hitta på egen hand.
   * Undvik generaliseringar — varje tips ska gälla just denna ö.
   */
  insiderTips?: string[]
  /**
   * Blogginlägg som handlar om eller nämner denna ö.
   * Visas som "Guider om [ö]"-sektion på ö-sidan för intern länkning.
   * Använd exakta slugs från src/app/blogg/posts-data.ts.
   */
  blogLinks?: { slug: string; title: string }[]
  /**
   * Strukturerad säsongsdata — visas som månadskalender + rekommendation på ö-sidan.
   * Används också för säsongs-SEO ("Sandhamn september öppet?").
   * months[0] = januari … months[11] = december
   */
  seasonal?: {
    /** T.ex. "Maj–September" */
    open: string
    /** T.ex. "Juli–mitten av Augusti" */
    peak: string
    /** T.ex. "Juni eller September" */
    best: string
    /** Förklaring till best — visas under kalenderraden */
    bestReason: string
    /** Varning om t.ex. begränsad service utanför säsong */
    warning?: string
    /** Månader 1-12: 'off' = stängt/vinter, 'limited' = begränsad service, 'open' = öppet, 'peak' = högsäsong */
    months: ('off' | 'limited' | 'open' | 'peak')[]
  }
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
    seoTitle: 'Sandhamn 2026 – restauranger, boende & seglarkultur',
    seoDescription: 'Guide till Sandhamn: bästa restaurangerna, Trouville-stranden, Seglarhotellet och båt från Stockholm. Bilfri ö i Stockholms skärgård.',
    description: [
      'Sandhamn är ett av Stockholms skärgårds mest välkända namn, och med rätta. Ön är hem för KSSS (Kungliga Svenska Segel Sällskapet) och samlar tusentals seglare varje sommar i en av Östersjöns mest besökta gästhamnar. Här finns allt: restauranger i toppklass, bagerier, barer och ett hamnliv som sträcker sig långt in på nätterna.',
      'Trots att Sandhamn är populärt har det bevarat sin karaktär. Ön är bilfri och smalare stigar leder mellan trävillorna. Det vita sandstranden Trouville på öns södra sida är en av skärgårdens finaste. Klipporna österut erbjuder solbad med utsikt mot öppet hav.',
      'Sandhamn besöks bäst juni–september men ön har verksamhet nästan hela året tack vare Seglarhotellet. Högsäsong är juli. Boka allt i förväg.',
      'Det är lätt att glömma att Sandhamn faktiskt är ett gammalt fiskesamhälle. Gränd efter gränd kantas av röda och gula trähus, odlingsland och gamla sjöbodar. Bort från hamnen, bara hundra meter in i byn, är det tyst nog att höra fåglarna. Den kontrasten är en av Sandhamns bästa hemligheter: feststämning i hamnen och stillhet trettio sekunder bort.',
      'Trouville-stranden på öns södra sida är sällsynt i skärgårdssammanhang. Sand istället för klippor, och ett grunt strandparti som fungerar utmärkt för barn. Bäst att ta sig dit tidigt på morgonen. Efter tio börjar det bli trångt under högsäsongen. Klipporna öster om stranden är en bra plan B: utsikt mot öppet hav och ofta bara ett par personer.',
      'Matutbudet är ovanligt brett för en skärgårdsö. Dagen börjar på bageriet med nybakt och kaffe, lunchen kan bli räkor på värdshuset, kvällen på Seglarrestaurangen om du bokat bord eller en öl på Dykarbaren om du inte gjort det. Sandhamn är en av få öar där man kan äta riktigt bra utan att ha planerat i förväg, åtminstone på vardagar.',
      'För den som inte seglar kan Sandhamn vid första anblick verka som "en hamn full med seglare". Men ön är minst lika intressant för den som inte har en båt. Promenaden runt ön tar ungefär två timmar i lagom tempo. Kombinera med ett bad på Trouville, lunch och en eftermiddagspromenad ut till östudden. Det räcker gott som en hel dag.',
      'September är Sandhamns dolda guldmånad. Turisttrycket är borta, vattnet fortfarande badbart, restaurangerna öppna och utan kö. Det är i september man förstår varför folk som bott i Stockholms skärgård hela livet väljer att komma just hit, inte i juli.',
      'Sandhamn har en historia som lotsstation som sträcker sig flera hundra år tillbaka. Piloter var stationerade här för att guida handelsfartyg genom de smala ytterskärgårdspassagerna in mot Stockholm. Den praktiska sjömansmiljön formade byns karaktär: de gamla lotskojiorna och de trånga gränderna speglar en arbetskultur kopplad till havet som lever kvar i stadsbilden än i dag.',
      'Kungliga Svenska Segel Sällskapet, känt som KSSS, grundades 1830 och valde Sandhamn som sin hemmahavn. Det vita klubbhuset vid hamnen är ett av de mest fotograferade byggnaderna i skärgården. KSSS är en av de större segelsällskapen i Europa, och den status det ger Sandhamn märks i allt: gästhamnskapaciteten, utrustningsnivån och den specifika energin hos de som besöker ön.',
      'Varje sommar, normalt i slutet av juni eller början av juli, startar och slutar ÅF Offshore Race vid Sandhamn. Det är ett av världens större offshore-segeltävlingar med hundratals deltagande båtar. Tävlingsveckan förvandlar ön helt: hamnen fylls till kapacitet, restaurangerna vänder bord tre gånger per kväll och den sociala energin når en nivå som inget annat skärgårdsevenemang kan matcha.',
      'Läget spelar roll. Sandhamn ligger knappt 50 kilometer fågelvägen från centrala Stockholm — cirka 31 sjömil, drygt 57 km, sjövägen — långt ut i ytterskärgården där vattnet är saltare och klipporna lägre och jämnare. Havet beter sig annorlunda här än vid innerskärgårdsplatser: svallvågorna är längre, vindarna mer stabila och horisonten bredare. På en klar dag från de östra klipporna ser du ingenting utom öppet Östersjövatten.',
      'Byn samlas i öns västra del, nära hamnen. Men hundra meter öster om hamnarens livlighet smalnar stigarna till spår mellan gamla trästaket och köksträdgårdar. Hus från 1700- och 1800-talen, målade i rött och gult, kantar dessa gränder. Kontrasten med hamnenerginen är omedelbar och fullständig, vilket är en av Sandhamns bästa hemligheter.',
      'Ön har blivit internationellt känd genom Viveca Stens kriminalromanserie med Sandhamn som miljö. Böckerna, översatta till ett flertal språk, lockar en stadig ström av läsare som besöker ön specifikt för att promenera i de gator och vid de hamnar som beskrivs i berättelserna. Det är en ovanlig form av litterär turism som når besökare utan något specifikt intresse för segling.',
      'Östra kusten är till för dem som vill bort från hamnen. Klipporna här är jämnare än på västsidan, havet öppet och tystnaden bara bruten av sjöfåglar. På vardagar i axelsäsongen kan du promenera runt ön och möta nästan ingen. Det tar ungefär två timmar i lugnt tempo.',
      'Från oktober till maj är Sandhamn en stillsammare plats. Seglarhotellet håller öppet hela året och driver det enda spa på ön. Några lokala verksamheter fortsätter men de flesta restauranger stänger. Vinterlandskapet har sin egen kvalitet: is kan bildas i innershamnen, lotskojiorna står i tystnad och hamnen rymmer några vinterliggande båtar. Värt ett besök för den som specifikt vill ha kontrasten till sommarön.',
      'Att ta sig till Sandhamn utan båt kräver lite planering. Waxholmsbåten från Strömkajen är det klassiska alternativet, en resa på ungefär två och en halv timme genom skärgården som i sig är en del av upplevelsen. Det snabbare alternativet är buss till Stavsnäs och sedan snabbåt, vilket kortar restiden till under en timme. Den inre skärgårdspassagen ombord på den reguljära Waxholmsbåten är dock värd den extra tiden minst en gång.',
      'Sandhamn passar inte alla, och det är en del av tjusningen. Barnfamiljer bör veta att ön inte har någon strand nära hamnen: Trouville kräver tio minuters promenad och hamnen i sig är full av båttrafik. För par, segelentusiaster, restauranggäster och dem som värdesätter energin i en aktiv seglarhamn levererar ön något som få andra skärgårdsdestinationer kan matcha.',
    
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 15A/16 + Stavsnäs Båttaxi. Sommarbåt Strömkajen 19 juni–16 aug, 3 tim 45+; året runt via Stavsnäs, Sandhamnslinjen 30 min. Tidigare stod "2,5 h" — fel, se varv 49.
      travel_time: 'Via Stavsnäs 30 min (Sandhamnslinjen) · sommarbåt Strömkajen 3 tim 45 (19 juni–16 aug)',
      character: 'Livlig, seglartät, festlig sommardestination',
      season: 'Maj–September (Seglarhotellet: helår)',
      best_for: 'Seglare, restaurangälskare, sommarturer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'KSSS-hamnen är en av Östersjöns mest besökta gästhamnar med plats för hundratals båtar. Sandhamn är start- och målgång för flera klassiska kappseglingar, däribland Gotland Runt (ÅF Offshore Race).' },
      { icon: '🏊', name: 'Sandstranden Trouville', desc: 'Öns vackraste sandstrand på södra sidan. Sällsynt i skärgårdssammanhang — sand istället för klippor.' },
      { icon: '🧖', name: 'Spa & Gym', desc: 'Seglarhotellets spa med bubbelpool, bastu och havsutsikt. Öppet för hotellgäster och boende.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön på de smala stigarna. Klipporna på östra sidan ger utsikt mot öppet hav.' },
      { icon: '🎣', name: 'Fiske', desc: 'Ytterskärgårdens vatten erbjuder utmärkt fiske. Havsöring och makrill är vanliga.' },
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Uthyrning finns vid hamnen. Paddla runt ön eller ut mot de omgivande grunden.' },
    ],
    accommodationIntro: 'Sandhamn har ett koncentrerat och välkvalitativt boendeutbud kring hamnen. Seglarhotellet är flaggskeppet och håller öppet hela året med modernt spa — boka månader i förväg inför juli och Gotland Runt-helgen. Sandhamns Värdshus och Sands Hotell ger kompletterande alternativ med mer personlig prägel.',
    accommodation: [
      { name: 'Seglarhotellet', type: 'Hotell', desc: 'Det ikoniska hotellet vid hamnen — modernt spa, utsiktsrum och öppet helår. Boka långt i förväg.', websiteUrl: 'https://www.sandhamn.com' },
      { name: 'Sandhamns Värdshus', type: 'B&B', desc: 'Boende i historisk miljö med frukost. Öppet hela sommaren.', websiteUrl: 'https://sandhamns-vardshus.se' },
      { name: 'Sands Hotell', type: 'Hotell', desc: 'Modernt lägenhetshotell med hotellservice nära hamnen. Öppet året om.', websiteUrl: 'https://www.sandhamn.com' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '2,5 h', desc: 'Klassikalternativet — ta med sig mat och njut av resan.', icon: '⛴' },
      { method: 'Snabbåt', from: 'Stavsnäs', time: '40 min', desc: 'Snabbaste alternativet. Buss/bil till Stavsnäs, sedan båt.', icon: '🚤' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Segelbåt eller motorbåt till KSSS-hamnen. Förboka gästplats under högsäsong.', icon: '⛵' },
    ],
    harbors: [
      { name: 'KSSS Sandhamn', desc: 'Huvudhamnen med bränsle, el och servicebyggnad. Boka i förväg juli–aug.', fuel: true, service: ['el', 'vatten', 'dusch', 'tvätt', 'bränsle'] },
      { name: 'Sandhamns Sjöstation', desc: 'Drivmedel och service vid inloppet.', fuel: true, service: ['bränsle', 'olja'] },
    ],
    restaurants: [
      { name: 'Seglarrestaurangen', type: 'Restaurang', desc: 'Seglarhotellets krog — en av skärgårdens finaste. Boka i förväg.', bookingUrl: 'https://www.bokabord.se/restaurang/sandhamn-seglarhotell', websiteUrl: 'https://www.sandhamn.com' },
      { name: 'Sandhamns Värdshus', type: 'Restaurang', desc: 'Historisk krog vid färjebryggan. Enkel husmanskost och räkor.', bookingUrl: 'https://www.bokabord.se/restaurang/sandhamns-vardshus', websiteUrl: 'https://sandhamns-vardshus.se' },
      { name: 'Bistro Sands', type: 'Bistro', desc: 'Avslappnad bistro med havsutsikt och säsongsrätter.', slug: 'bistro-sands' },
      { name: 'Dykarbaren', type: 'Bar', desc: 'Bryggbar med hamburgare och öl. Populär för sundowner.', slug: 'dykarbaren' },
      { name: 'Sandhamns Bageriet', type: 'Bageri', desc: 'Nybakat varje morgon. Kö tidigt i juli.', slug: 'sandhamns-bageriet' },
    ],
    tips: [
      'Boka restaurang och hotell minst 4–6 veckor i förväg under juli.',
      'Sandstranden Trouville är bäst tidigt på morgonen innan turistbåtarna anländer.',
      'Promenera österut till klipporna för solnedgångsutsikt mot öppet hav.',
      'Undvik att anlöpa under Gotland Runt-helgen (tidig juli) — hamnen är fullbokad.',
    ],
    related: ['moja', 'grinda', 'finnhamn'],
    tags: ['segling', 'gästhamn', 'restauranger', 'sandstrand', 'sommarfest'],
    did_you_know: 'Sandhamn fick tullstation runt 1670 och lotsstation under slutet av 1600-talet, sedan kungens förbud mot utländsk sjöfart genom Sandöhamn upphävts. Namnet kommer från den ovanliga sandstranden — de flesta öar i skärgården har bara klippor.',
    transport_meta: {
      from_city_min: 150,
      from_nearest_hub_min: 40,
      nearest_hub: 'Stavsnäs',
      operator: 'Waxholmsbolaget',
      line: '444',
      frequency: 'Flera avgångar/dag sommartid, glesare vinter',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: Värmdö kommun — https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html (hämtad 2026-08-06)
      car_parking: 'Parkering vid Stavsnäs vinterhamn: 3 timmar fritt med p-skiva, därefter avgift som betalas i app (operatör Parkit). Cirka 1 300 platser, varav omkring hälften för besökare.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Uthyrning vid hamnen. Paddla runt ön eller ut mot omgivande grund.' },
      bad: {
        beaches: [
          {
            name: 'Trouville-stranden',
            type: 'sandstrand',
            desc: 'Sandhamns enda sandstrand och öns mest älskade badplats. Smal remsa av fin ljus sand på södra sidan, skyddad mot nordliga vindar. Heter "Trouville" efter den franska badorten — ett smeknamn seglarna gav platsen på 1800-talet.',
            child_friendly: true,
            depth: 'Grunt och sandbotten nära stranden — bra för barn. Vattnet värms upp snabbt i juli.',
            directions: 'Gå söderut från hamnen ca 10 min förbi Sandhamns Värdshus, ta sedan stigen ned mot havet.',
            insider_tip: 'Kom tidigt på morgonen eller sent på eftermiddagen — bryggan mitt på dagen fylls av dagsturister. Lokalt bad = morgon.',
          },
          {
            name: 'Klippbad vid Västerudd',
            type: 'klippbad',
            desc: 'Östra udden av Sandhamn med öppet hav och platta välslipade hällar. Populärt bland seglarna som vinterliggare och de som bor på ön. Bättre sol på eftermiddagen.',
            child_friendly: false,
            depth: 'Djupt direkt vid klippkanten — hoppa in, men håll koll på barn.',
            directions: 'Fortsätt förbi Trouville-stranden och följ klippkanten österut, ca 5 min ytterligare.',
            insider_tip: 'Bäst solnedgång på Sandhamn härifrån — ta med matsäck och vänta tills solen sjunker mot ytterskärgården.',
          },
        ],
      },
      vandring: { trails: 3, max_km: 8 },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Hundar tillåtna på de flesta delar av ön. Hundförbud vid Trouville-stranden sommartid (juni–aug). Koppeltvång i hamn- och restaurangområden.',
    insiderTips: [
      'Waxholmsbåten tar ungefär 2,5–3,5 timmar från Strömkajen beroende på antal bryggstopp. Snabbåt via Stavsnäs kortar restiden rejält.',
      'Trouville är en av få sandstränder i hela Stockholms skärgård. De flesta öar har klippor och hällmarker, inte sand.',
      'KSSS (Kungliga Svenska Sällskapet) har sin flaggskeppshamn i Sandhamn. Round Gotland Race, en av världens mest välkända offshore-seglingstävlingar, startar härifrån varje år.',
      'Byn Sandhamn ligger i öns nordöstra del. Promenaden runt hela ön tar ungefär två timmar i lugnt tempo.',
      'Sandhamn var lotsstation i hundratals år. Lotsarna här guidade handelsfartyg genom de smala passagerna in mot Stockholm, vilket formade byn och dess karaktär.',
    ],
    blogLinks: [
      { slug: 'basta-restaurangerna-sandhamn', title: 'De 5 bästa restaurangerna på Sandhamn 2026' },
      { slug: 'gasthamnar-guide', title: 'Bästa gästhamnarna i Stockholms skärgård 2026' },
      { slug: 'segling-nyborjare-guide', title: 'Segla för första gången – allt du behöver veta' },
    ],
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli–mitten av Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: allt öppet utan trängseln. September: badbart vatten, tomma restauranger och billigare boende.',
      warning: 'Seglarhotellet är öppet hela året men de flesta caféer och barer stänger oktober–april.',
      months: ['off','off','off','limited','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── UTÖ ─────────────────────────────────────────────────────
  {
    slug: 'uto',
    name: 'Utö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🚲',
    tagline: 'Södra skärgårdens kronjuvel — cykling, gruvhistoria och havsbastu.',
    seoTitle: 'Utö 2026 – cykling, havsbastu & Utö Värdshus',
    seoDescription: 'Guide till Utö: cykelleder, havsbastu och Utö Värdshus. Pendeltåg till Nynäshamn + färja. Södra skärgårdens bästa helgdestination.',
    description: [
      'Utö är södra skärgårdens mest kompletta destination. Ön är känd för sina cykelleder, sin gruvhistoria (järn bröts här i mer än 700 år, från 1100-talet till 1879) och sin havsbastu som numera är en av skärgårdens mest omtalade upplevelser. Utö Värdshus håller hög klass och är ett självklart mål för dem som vill kombinera god mat med naturupplevelse.',
      'Till skillnad från Sandhamn är Utö lugnare och mer familjevänlig. Öns storlek gör att man kan cykla runt hela dagen och ändå inte upprepa sig. Det finns sandstränder, klippor, naturreservat och ett litet museum om gruvdriften.',
      'Utö nås med färja från Nynäshamn eller med snabbåt. Ön är populär att kombinera med Nåttarö och Ålö-Rånö på en längre seglingstur söderut.',
      'Cykelrutten från Gruvbryggan ner till Ålö Storsand är en av skärgårdens verkliga pärlor. Tretton kilometer på smala grusvägar genom björkskog och öppna ljunghedar, förbi den gamla gruvgången och ut mot havets horisont. Det går ungefär en timme i lugnt tempo, och när man väl ser Ålö Storsands vita sand och turkosvattnet framför sig förstår man varför folk åker hit om och om igen.',
      'Gruvhistorien är mer fascinerande än man kan tro. På 1840-talet bodde nästan 500 människor på Utö: smeder, gruvarbetare och deras familjer. Samhället hade skola, kyrka och handelshus. När gruvan stängde 1879 var det en hel värld som upphörde. Museet bredvid schaktet är litet men välgjort, och det tar ungefär 45 minuter. Bättre än man förväntar sig.',
      'Havsbastun på Utö är en upplevelse som är svår att sätta ord på. Bastun ligger direkt mot havet. Dörren öppnas mot vattnet och det är bara några steg dit. Kontrasten mellan det heta bastuutrymmet och det kalla havsvattnet, kombinerat med den öppna horisonten, gör det till något helt annat än en vanlig bastu. Kvällspass med solnedgång är svårt att överträffa. Boka online i god tid.',
      'Utö belönar verkligen den som stannar mer än en dag. Dag ett är lätt att fylla med cykeltur och bastu. Dag två är för de lugnare upptäckterna: en kajakrunda runt öns norra spets, en fisketur eller bara en lång lunch på värdshuset utan att ha något mer planerat. Det är en annan Utö.',
      'Kombinationen Utö–Nåttarö är ett klassiskt tvådagarsprogram för seglare. Ankra vid Nåttarös naturreservat för natten, kliv upp med fåglarna på morgonen och ha hela klippmarken för dig själv. Det är ungefär vad södra skärgården erbjuder på sin allra bästa.',
      'Utös historia kretsar kring järnet. Öns gruva bearbetades från åtminstone medeltiden och bröt järnmalm ur de karakteristiska rödbrunfärgade bergformationerna som fortfarande präglar landskapet. Gruvdriften pågick under flera sekler och gjorde Utö till en av Sveriges äldsta kontinuerligt drivna gruvor innan verksamheten slutligen upphörde 1879. Schaktet och anläggningarna är nu museum och förblir en av de mer ovanliga historiska sevärdheterna i skärgården.',
      'Gruvan är värd minst en timme. Utställningen täcker både den tekniska gruvhistorien och den sociala historien bakom det gruvsamhälle som levde här. Det erbjuder ett genuint annorlunda perspektiv på skärgårdslivet: inte fiskebyar och seglarhamnar, utan industriellt arbete i en öomgivning. Att kombinera detta besök med en cykeltur runt ön ger en fullständigare bild av vad Utö faktiskt är.',
      'Cykling är hur de flesta väljer att utforska Utö. Ön har ett nätverk av stigar och mindre vägar, de flesta plana eller svagt sluttande, vilket gör det tillgängligt för alla konditionsnivåer. Cykeluthyrning finns vid hamnen från tidig sommar. En full runda av ön tar ungefär två till tre timmar i lugnt tempo, med naturliga stopp vid utsiktspunkter, stränder och gruvan.',
      'Utö ligger i den sydligaste delen av Stockholms skärgård, och läget formar karaktären. Ytterlandskapet är mer exponerat än på centrala skärgårdsöar: lägre klippor, bredare himmel, starkare vindar. Öns sydspets ser mot öppet vatten utan synliga landmarkeringar i riktning mot nästa kust. Den öppenheten är en specifik sorts vacker som skiljer sig från den slutna, skogsklädda känslan av innerskärgårdsöar.',
      'Havsbastun på Utö är en av de mest besökta i skärgården. Belägen utomhus direkt vid vattnet möjliggör den den skandinaviska ritualen av att växla mellan intensiv värme och kallt havsvatten. Temperaturkontrasten är störst på höst och vinter när upplevelsen är tillgänglig och vattnet som kallast. Förbokning är lämpligt, särskilt under högsäsong.',
      'Utö har en av de få ordentliga sandstränderna i Stockholms skärgård. För de flesta skärgårdsplatser innebär bad jämna klipphällar och öppet hav. Den strand som finns här är ett undantag som barnfamiljer i synnerhet tenderar att uppskatta, med grund instegszon och mjukare underlag än klippbadets alternativ.',
      'Utö Värdshus har drivits som restaurang och gästgiveri under lång tid. Nuvarande verksamhet upprätthåller traditionen att servera klassisk skärgårdsmat: sill, lax, säsongsbetonade svenska rätter i en miljö som ser ut över hamnen. Kvaliteten har gjort det till en av de mer besökta restaurangerna i den yttre södra skärgården. Under högsommaren krävs bordsbokning.',
      'Det exponerade läget vid Utös sydspets gör ön till en viktig observationspunkt för flyttfåglar. På hösten, i synnerhet september och oktober, koncentreras migrerande rovfåglar, vadare och tättingar här. Erfarna fågelskådare reser specifikt till Utö för höstflyttningen, och antalet arter och individer en bra septemberdag kan vara anmärkningsvärt. Även tillfälliga besökare märker ovanligt varierad fågelaktivitet under dessa perioder.',
      'Den huvudsakliga båtförbindelsen året runt går från Årsta brygga, som nås med pendeltåg till Västerhaninge och buss 846. Nynäshamnslinjen slutar på grannön Ålö, inte på Utö by. Resan från centrala Stockholm, tåg till Nynäshamn och sedan båt till Utö, tar sammanlagt ungefär två timmar. Det finns även en längre men scenisk väg med Waxholmsbåt genom mellanskärgården. Dagsutflykter till Utö är möjliga men ön belönar ett nattuppehåll eller två: de flesta av dess bästa kvaliteter kräver mer än några timmar för att uppleva ordentligt.',
      'Utö har en liten permanent befolkning och ön upprätthåller mer året-runt-karaktär än rent sommardestinationer. Gruvmuseet, värdshuset och havsbastun är öppna in i hösten och ibland genom vintern. Att besöka utanför juli förändrar upplevelsen markant: stigarna är tomma, bastun bättre utan sommarkön och landskapet tar en hårdare, mer ärlig kvalitet som passar öns gruvhistoria.',
    
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 21 Årsta–Utö. Nynäshamnslinjen (tabell 22) slutar på Ålö, inte Utö by. Årsta brygga nås med buss 846 (14–17 min). Se varv 51–52.
      travel_time: 'Buss 846 till Årsta brygga + båt 35–75 min (Gruvbryggan förbokas)',
      character: 'Lugnt, naturnära, perfekt för familjer och cyklister',
      season: 'April–Oktober (Värdshuset öppet helår)',
      best_for: 'Cykling, havsbastu, naturupplevelser, familjer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: '350 hyrcyklar (Skeppshult) vid Cykelboden. Klassiska rutten Gruvbyn–Ålö är ca 13 km enkel väg längs grusvägar genom skog och ängar till Ålö storsand med klappstrandsbad och krogen Båtshaket.' },
      { icon: '🧖', name: 'Havsbastu', desc: 'En av skärgårdens mest omtalade havsbastur. Dörren går ut mot havet — basta, hoppa i, basta igen.' },
      { icon: '⛏', name: 'Gruvan & museet', desc: 'Järnmalm bröts på Utö i mer än 700 år, från 1100-talet till 1879. Gruvdriften var som störst på 1840-talet med 16 000 ton/år och cirka 500 invånare på ön. Gruvmuseet berättar historien — fascinerande för både barn och vuxna.' },
      { icon: '🏊', name: 'Bad & stränder', desc: 'Stora Sand på Utö (cirka 10 km från Gruvbryggan, ligger inom skjutfältet — kontrollera tillgänglighet) och Ålö Storsand på grannön Ålö (broförbunden) hör till Sveriges finaste sandstränder.' },
      { icon: '🚶', name: 'Vandring', desc: 'Naturreservat i öns södra del med välmarkerade leder och vacker urbergslandskap.' },
      { icon: '🎣', name: 'Fiske', desc: 'Ytterskärgården runt Utö är utmärkt för havsöring och abborre.' },
    ],
    accommodationIntro: 'Utö erbjuder skärgårdens bredaste boendeutbud utanför de mer centrala öarna — från välrenommerade Utö Värdshus med spa, restaurang och havsutsikt till stugor och campingplatser i naturreservat. Ön passar allt från par på weekend till barnfamiljer med tält.',
    accommodation: [
      { name: 'Utö Värdshus', type: 'Hotell', desc: 'Välkänt värdshus med restaurang, spa och havsutsikt. Öppet hela året.', websiteUrl: 'https://www.utovardshus.se', bookingUrl: 'https://www.utovardshus.se/boka/' },
      { name: 'Utö Camping & Stugor', type: 'Camping', desc: 'Tältplats och stugor i naturreservat. Bokningsbart online.', websiteUrl: 'https://www.uto.se' },
      { name: 'Vandrarhem Utö', type: 'Vandrarhem', desc: 'Enkelt och prisvärt boende för den budgetmedvetna resenären. Fråga vid hamnen om tillgänglighet.' },
    ],
    getting_there: [
      { method: 'Skärgårdsbåt', from: 'Årsta brygga, Nynäshamn', time: '1,5 h', desc: 'Waxholmsbolagets skärgårdslinje från Årsta brygga i Nynäshamn (kommunal- och SL-kort gäller ej — separat biljett).', icon: '⛴' },
      { method: 'Snabbåt', from: 'Årsta brygga, Nynäshamn', time: '30 min', desc: 'Snabbare alternativ sommartid — körs som expresslinje av Waxholmsbolaget.', icon: '🚤' },
      { method: 'Pendel + buss + båt', from: 'Stockholm City', time: '2 h totalt', desc: 'Pendeltåg linje 43 till Västerhaninge, buss 846 till Årsta brygga (16 min), sedan båt till Gruvbryggan 35–75 min, beställningsbrygga på de flesta turer.', icon: '🚆' },
    ],
    harbors: [
      { name: 'Utö Gästhamn', desc: 'Välutrustad gästhamn med bränsle, el och service. Boka i förväg sommartid.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle', 'tvätt'] },
    ],
    restaurants: [
      { name: 'Utö Värdshus', type: 'Restaurang', desc: 'Öns flaggskepp — vällagad mat med havsutsikt. Boka i förväg.', bookingUrl: 'https://www.utovardshus.se/restaurang/boka-bord-vardshuset/', websiteUrl: 'https://www.utovardshus.se' },
      { name: 'Seglarbaren', type: 'Bar', desc: 'Avslappnad hamn­bar för seglare och besökare.', slug: 'seglarbaren-uto' },
      { name: 'Hamnboden', type: 'Kiosk', desc: 'Enkel mat och dryck direkt vid hamnen.', slug: 'hamnboden-uto' },
      { name: 'Bakfickan Utö', type: 'Restaurang', desc: 'Gemytlig lokal restaurang med bra husmanskost.', slug: 'bakfickan-uto' },
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
    transport_meta: {
      from_city_min: 120,
      from_nearest_hub_min: 30,
      nearest_hub: 'Nynäshamn (Årsta brygga)',
      operator: 'Waxholmsbolaget',
      line: 'Utölinje',
      frequency: 'Flera avgångar/dag sommartid, 2–3 ggr/dag vinter',
      booking_url: 'https://waxholmsbolaget.se',
      car_parking: 'Pendeltåg till Nynäshamn (SL), sedan 5 min buss/gång till Årsta brygga. Parkering vid Nynäshamns station eller Årsta brygga.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Kajakuthyrning vid hamnen. Lugnt vatten på öns västra sida, mer öppet i söder.' },
      cykel: { rental: true, km_track: 13, notes: 'Ca 350 hyrcyklar. Klassrutt: Gruvbryggan–Ålö ca 13 km enkel väg.' },
      bad: {
        beaches: [
          {
            name: 'Ålö Storsand',
            type: 'sandstrand',
            desc: 'En av Stockholms skärgårds verkligt vackra sandstränder — vit sand, turkost vatten och öppet hav mot söder. Ligger på grannön Ålö (broförbunden med Utö). Cykla dit på 20–25 min. Strandkrogen Båtshaket ligger precis intill.',
            child_friendly: true,
            depth: 'Grunt vid strandlinjen, sandbotten hela vägen ut — perfekt för barn.',
            directions: 'Hyr cykel vid Gruvbryggan. Cykla söderut längs grusvägen, passera Ålöbron och följ skyltarna till Storsand. Ca 13 km, ca 45 min i lugnt tempo.',
            insider_tip: 'Gå bort till stenrevet i norr — där är det färre folk och exakt samma vatten. Kom med morgonbåten och ha stranden för dig själv till 11.',
          },
          {
            name: 'Storsand (norra Utö)',
            type: 'sandstrand',
            desc: 'Sandstrand på Utös norra sida inom militärt övningsområde. Öppen för besökare under stora delar av sommaren men stängs vid militärövningar utan förvarning. Kolla skyltningen vid infarterna.',
            child_friendly: true,
            depth: 'Sandbotten, grunt — bra för barn när stranden är öppen.',
            directions: 'Cykla norrut från Gruvbryggan ca 3 km. Skyltar vid infarterna visar om stranden är tillgänglig.',
            insider_tip: 'Fråga alltid vid bryggan eller kolla utoinfo.se om stranden är öppen denna dag. Stängs utan förvarning.',
          },
        ],
      },
      vandring: { trails: 4, max_km: 12 },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Hundar välkomna. Naturreservat i södra delen har koppeltvång under häckningssäsong; enligt lag ska hundar dessutom hindras från att springa lösa i marker med vilt 1 mars–20 augusti, och reservatet kan ha egna perioder. Värdshuset tillåter hundar i uteserveringen.',
    insiderTips: [
      // KÄLLA: Stockholms läns museum — brytning möjligen redan på 1100-talet, nedlagd 1879 (2026-08-24)
      'Järngruvan på Utö var i drift från medeltiden — möjligen redan på 1100-talet — till 1879 och räknas till Sveriges äldsta kända järngruvor. Gruvsystemet kan besökas.',
      'Utö är den sydligaste bebodda ön i Stockholms skärgård med reguljär färjetrafik från Stockholm.',
      'Cykellederna på Utö är välmarkerade. Ön är ungefär 18 kilometer lång och en tur runt tar 3 till 4 timmar i lugnt tempo.',
      'Utö Värdshus är ett av de äldsta värdshuset i Stockholms skärgård och har serverats mat och dryck till sjöfarare under lång tid.',
      'Havsbastu finns på Utö och är populär även under vinterhalvåret. Kontrasten mot kallt hav är störst i november och mars.',
    ],
    blogLinks: [
      { slug: 'uto-guide', title: 'Utö – södra skärgårdens kronjuvel' },
      { slug: 'vandring-orno-uto', title: 'Vandring i skärgården – bästa lederna på Ornö och Utö' },
      { slug: 'havsbastu-guide', title: 'Havsbastu i skärgården – de bästa platserna 2026' },
    ],
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Sandstrand, cykel och värdshus — utan juliträngseln. Havsbastu är ett plus i september.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── VAXHOLM ─────────────────────────────────────────────────
  {
    slug: 'vaxholm',
    name: 'Vaxholm',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏛️',
    tagline: 'Porten till skärgården — stad, fästning och direktbåt från Strömkajen.',
    seoTitle: 'Vaxholm 2026 – fästning, historisk stad & dagstur',
    seoDescription: 'Guide till Vaxholm: Vaxholms fästning, restauranger och direktbåt från Strömkajen. Perfekt dagstur eller weekendresa i Stockholms skärgård.',
    description: [
      'Vaxholm kallas "porten till skärgården", och det stämmer. Staden kontrollerade i 500 år ingången till Stockholms inre skärgård via fästningen mitt i sundet. Idag är den röda fästningen ett museum och ett av skärgårdens mest fotograferade motiv.',
      'Vaxholm är en riktig stad med permanentboende, butiker, restauranger och en levande hamn. Det gör den unik bland skärgårdens öar. Man kan ta en kaffepaus, handla souvenirer och sitta ned på ett riktigt café utan att det känns som turistfälla.',
      'Direktbåt från Strömkajen tar 75 minuter. Vaxholm är det självklara första steget ut i skärgården för den som aldrig åkt dit förut.',
      'Fästningen är mer imponerande på nära håll än på bild. Platsen befästes i början av 1500-talet och den kraftigare fästningen anlades 1548 på Gustav Vasas order och har sedan dess förstärkts och byggts om — dagens kastell stod klart 1863. Fästningen har aldrig intagits: danskarnas anfall 1612 och ryssarnas härjningar 1719 slogs båda tillbaka. Idag är den ett välskött museum med utställningar om sjöförsvar och skärgårdshistoria. En bra aktivitet för en regnig dag.',
      'Det som gör Vaxholm unikt bland skärgårdens öar är att det faktiskt är en stad med ett eget liv. Invånarna handlar på ICA, hämtar paket på posten och dricker kaffe på sina stamcaféer. Den turistiga ytan vid hamnen är bara en del av bilden. Går man fem minuter inåt finns villakvarter, en gammal kyrka och en tyst karaktär som påminner om en liten kuststad var som helst längs den svenska kusten.',
      'Vaxholm fungerar utmärkt som dagsmål men är också ett bra nav för vidare utforskning. Härifrån kan man ta Waxholmsbåten vidare till Grinda, Finnhamn eller Sandhamn, eller hyra kajak och paddla mot Resarö och Rindö. Det är en smidig plats att starta från om man inte riktigt vet vart man vill.',
      'Vintertid är Vaxholm en annan upplevelse. Hamnen blir stillsam, restaurangerna lugnare och kaféerna varma. Kastell är öppet delar av vintern. Väljer man rätt dag, en kall och klar januaridag med frost på bryggan och Waxholmsbåten som enda ljud, är det ett av Mälardalsregionens mest underskattade utflyktsalternativ.',
      'Vaxholm skiljer sig från övriga öar på ett grundläggande sätt: det är en stad. Inte en by, inte ett sommarsamhälle, utan en kommun med en permanent befolkning, en huvudgata med butiker och restauranger som är öppna under vintern och ett socialt liv som inte är beroende av turistsäsongen. Det gör det till ett av de mest tillgängliga och minst säsongsbetonade skärgårdsmålen nära Stockholm.',
      'Vaxholm har en specifik plats i svensk militärhistoria. Staden kontrollerar det viktigaste farledsavsnittet från Östersjön in mot Stockholm, och detta strategiska läge ledde till bygget av en fästning på den lilla ön Kastellholmen på 1500-talet. Gustav Vasa beordrade befästningen, som sedan utvidgades och förstärktes under de följande seklen. Fästningen är anledningen till att staden existerar i sin nuvarande form.',
      'Vaxholms Kastell fungerar nu som museum. En kort färjöverresa förbinder det med stadskajen. Inne täcker museet fästningens militärhistoria och den roll som befästningen spelade för att försvara Stockholm mot havsbaserade angrepp under flera hundra år. Byggnaden i sig är en imponerande stenstruktur och utsikterna från dess vallar över det omgivande vattnet är bland de bästa i innerskärgården.',
      'Att promenera i Vaxholms gator är en lektion i svensk träarkitektur från slutet av 1800-talet och tidigt 1900-tal. Staden är ovanligt välbevarad: många av bostadsgatorna ser ut ungefär som de gjorde för hundra år sedan, med målade trähus, trädgårdsstaket och vuxna träd. Stadskärnan kring den centrala hamnplatsen är särskilt fotogen och är ett populärt motiv.',
      'Vaxholm är en av de mest lättillgängliga skärgårdsdestinationerna från Stockholm. Buss 670 från Tekniska Högskolan når staden på ungefär en timme och går under hela dagen. Waxholmsbåtsförbindelsen från Strömkajen tar ungefär en och en halv timme på den sceniska båtvägen. Den kombinationen innebär att Vaxholm fungerar som en halvdags- eller heldagsutflykt även på kort varsel.',
      'Vaxholm har större kapacitet för restauranger och kaféer öppna året runt än någon annan skärgårdsö. Flera etablissemang är verksamma under vintermånaderna, vilket ger staden en annan typ av användbarhet än enbart sommardestinationer. Hamnfronten har en koncentration av matalternativ med vattenutsikt. De lokala fiskbutikerna säljer rykfärdigt rökt sill och lax, bra för en snabb lunch eller att ta med hem.',
      'I december arrangerar Vaxholm en av de mer välbesökta julmarknaderna i Stockholmsregionen. Kombinationen av den gamla trästaden, vinterdekoration och hamnen lockar besökare specifikt under julmarknadsperioden. Det är ett av de tydligaste exemplen på att Vaxholm fungerar som en helårsdestination snarare än en enbart sommarmåste.',
      'Vaxholm har skyddat vatten för bad. De smala sunden runt staden värms upp rimligt bra under sommaren och det lugna vattnet passar barn och icke-simmare på ett sätt som mer exponerade ytterskärgårdsplatser inte gör. Närheten till fästningsön på andra sidan sundet ger en ovanlig bakgrund för ett bad.',
      'Vaxholm fungerar väl som bas för att utforska omgivande skärgård. Båtförbindelser från Vaxholm når Grinda, Sandhamn och andra destinationer, vilket innebär att besökare kan använda staden som utgångspunkt och fördela båtutflykter därifrån. Boendealternativen är mer varierade och mer tillgängliga än på öar längre ut.',
      'Hamnen är Vaxholms sociala centrum. Under sommaren fylls den med besökande båtar, lokalbefolkning och dagsbesökare, och kajen runt marinan är typiskt livlig från morgon till tidig kväll. Under vintern rymmer samma hamn ett fåtal vinterliggande båtar och staden återgår till sin lugnare lokalkaraktär. Båda versionerna av hamnen är värda att uppleva.',
      'De flesta besöker Vaxholm som dagsutflykt, och staden rymmer det väl. Allt värt att se, fästningen, de gamla gatorna, hamnen och en måltid, ryms på fyra till sex timmar. Ett övernattningsbesök erbjuder dock något annat: staden tidig morgon innan dagsbesökare anländer, och på kvällen när den sjunker in i sin egen rytm.',
    
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Vaxholm, ~55–70 min (08.15→09.17, 08.20→09.17, 12.45→13.42). Tidigare "75 min" var i överkant.
      travel_time: '~1 tim (55 min–1 tim 20) med Waxholmsbåt från Strömkajen',
      character: 'Stad med skärgårdskänsla, historia, helårsdestination',
      season: 'Helår — Vaxholm är en aktiv stad tolv månader om året',
      best_for: 'Dagsturer, historia, familjer, första skärgårdsbesök',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🏰', name: 'Vaxholms Kastell', desc: 'Fästningsmuseum med 500 år av skärgårdsförsvar. Guidade turer sommartid. Lägg 2 timmar här.' },
      { icon: '🛍', name: 'Stadspromenaden', desc: 'Vandra längs kajen, titta in i de gamla trähusen och fika i de lokala caféerna.' },
      { icon: '🎣', name: 'Fiskeguider', desc: 'Catch & Relax och andra guider erbjuder guidat fiske i Vaxholms skärgård.' },
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Perfekt utgångspunkt för kajakpaddling mot Resarö, Rindö och Tenö.' },
      { icon: '🚢', name: 'Båtutflykter', desc: 'Ta Waxholmsbåten vidare ut i skärgården — Grinda, Finnhamn och Sandhamn är alla tillgängliga.' },
    ],
    accommodationIntro: 'Vaxholm har skärgårdens mest tillgängliga boendeutbud — det historiska Waxholms Hotell vid hamnen nås med bil, buss och direktbåt från Stockholm. Till skillnad från de yttre öarna kan man boka med relativt kort varsel och checka in utan att logistiken behöver planeras i förväg.',
    accommodation: [
      { name: 'Waxholms Hotell', type: 'Hotell', desc: 'Historiskt hotell precis vid hamnen med matsal och havsutsikt. Öppet hela året.', websiteUrl: 'https://www.waxholmshotell.se' },
      { name: 'B&B i Vaxholm', type: 'B&B', desc: 'Mindre B&B och pensionat i stadskärnan. Sök på Booking.com eller Airbnb för aktuella alternativ och lediga rum.' },
      { name: 'Waxholms Camping', type: 'Camping', desc: 'Campingplats med stugor, perfekt för barnfamiljer som kör till Vaxholm. Nås enkelt med bil.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen, Stockholm', time: '75 min', desc: 'Direktlinje med Waxholmsbolaget. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Bil', from: 'Stockholm', time: '45 min', desc: 'Vaxholm nås med bil via E18. Det finns parkeringar i staden.', icon: '🚗' },
      { method: 'Buss', from: 'Tekniska Högskolan', time: '60 min', desc: 'SL-buss 670 från T-banan.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Vaxholms Gästhamn', desc: 'Centralt belägen gästhamn med god service. Gångavstånd till all service.', fuel: false, service: ['el', 'vatten', 'dusch', 'toilet'] },
    ],
    restaurants: [
      { name: 'Hamnkrogen Vaxholm', type: 'Restaurang', desc: 'Klassisk bryggkrog med räkor och husmanskost.' },
      { name: 'Winbergs Kök & Bar', type: 'Restaurang', desc: 'Enkel och bra mat i avslappnad miljö.', slug: 'winbergs-kok-bar' },
      { name: 'Getfoten Sjökrog', type: 'Restaurang', desc: 'Populär sjökrog söder om stan.', slug: 'getfoten-sjokrog' },
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
    transport_meta: {
      from_city_min: 75,
      from_nearest_hub_min: 0,
      nearest_hub: 'Strömkajen (direktbåt)',
      operator: 'Waxholmsbolaget',
      line: 'Linje 670 (buss) eller direktbåt',
      frequency: 'Buss varje timme. Båt flera gånger/dag.',
      booking_url: 'https://sl.se',
      // KÄLLA: Vaxholms stad, taxa antagen av kommunfullmäktige 2025 — https://www.vaxholm.se/trafik--infrastruktur/trafik-gator-och-parkering/parkering/taxor-och-avgifter (hämtad 2026-08-06)
      car_parking: 'Parkering i centrala Vaxholm: 40 kr/timme 1 maj–31 augusti (8–18 vardagar, 8–15 helger), avgiftsfritt 1 september–30 april. Pendling rekommenderas — buss 670 från Tekniska Högskolan tar 60 min med SL-kort.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Perfekt utgångspunkt för kajaktur mot Resarö och Rindö. Uthyrning vid hamnen.' },
      bad: {
        beaches: [
          {
            name: 'Badplats vid Kastellet',
            type: 'klippbad',
            desc: 'Klippbad på Kastellholmen precis nedanför Vaxholms Kastell — historisk omgivning och rent vatten. Populärt bland lokala Vaxholmsbor på varma sommardagar.',
            child_friendly: true,
            depth: 'Grunt nära land, djupare ut. Bra för barn om de håller sig nära.',
            directions: 'Ta färjan från Vaxholm centrum till Kastellet (5 min, kör hela sommaren). Badplatsen är skyltat.',
            insider_tip: 'Badplatsen är öppen för alla men få dagsbåtsturister hittar dit. Besök Kastellet och bada efteråt — perfekt kombination.',
          },
          {
            name: 'Rindö badplats',
            type: 'sandstrand',
            desc: 'En av de bättre sandstränderna i norra innerskärgården, på grannön Rindö. Mer undanskymd än Vaxholms hamn och med lugnt vatten i den skyddade viken.',
            child_friendly: true,
            depth: 'Grunt och sandbotten — lämplig för barn.',
            directions: 'Rindö nås med buss från Vaxholm (ca 10 min) eller egen båt. Fråga lokalt om vägbeskrivning till badet.',
            insider_tip: 'Sommargäster från Vaxholm åker hit för att undvika hamnens folksamling. Ta med matsäck.',
          },
        ],
      },
      vandring: { trails: 2, max_km: 5 },
      fiske: true,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: true },
    dog_friendly: true,
    dog_notes: 'Vaxholm är hundvänligt med gott om promenadstråk. Koppeltvång i hamn och tätort.',
    insiderTips: [
      'Vaxholm nås med SL-buss 676 från Tekniska Högskolan (tunnelbana röd linje), ett billigare alternativ till båt och ofta lika snabbt.',
      // KÄLLA: vaxholmsfastning.se/historik (läst 2026-08-25) + SFV — blockhus på Vaxholmen i början av 1500-talet (Svante Nilsson Sture), Gustav Vasas nya och kraftigare fästning 1548, nuvarande kastell 1833–1863. Tidigare stod här att 1548 var den FÖRSTA fästningen.
      'Vaxholmen befästes redan i början av 1500-talet med ett blockhus, och 1548 lät Gustav Vasa uppföra en ny och kraftigare fästning som avvisade både danska och ryska anfall. Det kastell som står här i dag byggdes 1833–1863, sedan den gamla fästningen rivits. Kastellet kan besökas sommartid.',
      'Vaxholm är en av få skärgårdsdestinationer med apotek, post och ett brett serviceutbud öppet hela året.',
      'Innerstan i Vaxholm har välbevarad trähusmiljö med byggnader från 1800-talets slut, en av de mer intakta trästadsmiljöerna i Stockholmsregionen.',
    ],
    blogLinks: [
      { slug: 'vaxholm-guide', title: 'Vaxholm – skärgårdsstadens kompletta guide' },
      { slug: 'waxholmsbolaget-guide', title: 'Waxholmsbolaget – komplett guide till båttrafiken' },
    ],
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Maj–Juni eller September',
      bestReason: 'Vaxholm är en stad med åretruntservice. Undvik högsommarens trängseln — maj och september ger samma upplevelse med halva folkligheten.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },

  // ─── GRINDA ──────────────────────────────────────────────────
  {
    slug: 'grinda',
    name: 'Grinda',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Skärgårdens hjärta — natur, värdshus och gästhamn mitt i skärgårdskorridoren.',
    seoTitle: 'Grinda 2026 – Grinda Wärdshus, natur & gästhamn',
    seoDescription: 'Guide till Grinda: Grinda Wärdshus, bilfri natur, gästhamn och direktbåt från Strömkajen. Perfekt stopp för seglare i mellersta skärgården.',
    description: [
      'Grinda kallas ibland för "skärgårdens hjärta" och det är svårt att argumentera emot. Ön ligger strategiskt mitt i den populäraste seglingskorridoren mot Sandhamn, har en välskött gästhamn och ett av skärgårdens mest omtyckta värdshus.',
      'Ön är bilfri och naturskönt med blandad skog, klippor och en lång strand. Grinda Wärdshus håller hög standard i köket och erbjuder boende i flera kategorier, från hotellrum till stugor och camping.',
      'Grinda fungerar utmärkt som tvånatters stopp på en längre seglingstur, men är också en perfekt endagsdestination med direktbåt från Stockholm. Lanthandeln vid nedre hamnen säljer proviant för vidare segling.',
      'Det som utmärker Grinda bland de populärare öarna är proportionerna. Den är tillräckligt stor för att inte kännas trång, men liten nog att man hittar runt utan karta. Skogen är tät och mörk på öns mitt, klipporna öppnar sig mot havet i norr och söder. Stranden vid gästhamnen är smal men med fin sand, och ett av de lugnaste badfästen i mellersta skärgården.',
      'Grinda Wärdshus har en lång historia som samlingsplats. Matsalen har en äldre träinredning som inte känns renoverad bort, och menyn varierar med säsongen. Det är den typ av restaurang man lägger på minnet. Inte för att den är fashionabel, utan för att den är genuin. Bryggbistrån Framfickan nedanför är rätt val för en enklare lunch i solen.',
      'Naturreservat täcker merparten av ön, vilket är anledningen till att Grinda fortfarande ser ut som den alltid gjort. Koppeltvång gäller under häckningssäsongen, men resten av året är det fritt att vandra, klättra och sitta på vilken klippa man vill. Det finns ett par markerade leder, men Grinda utforskas lika gärna utan karta.',
      'Grinda passar nästan alla: par som vill ha en lugn helg, barnfamiljer med kajak och badkläder, seglare som behöver en natts vila mitt i skärgården. Det är svårt att göra fel här. Och det är nog just det som gör att folk återvänder år efter år.',
      'Grinda förvaltas av STF, Svenska Turistföreningen, vilket formar allt på ön. STF tog över förvaltningen för decennier sedan och har upprätthållit den som en natururienterad destination med vandrarhem, begränsad kommersiell utveckling och starkt fokus på friluftsliv. Det förvaltningsfilosofin syns överallt: stigarna är välunderhållna, skyltningen tydlig och ön kommunicerar en specifik sorts organiserad utomhushospitalitet.',
      'Vandrarhemmet på Grinda, STF Vandrarhem Grinda, är en av de mer populära STF-anläggningarna i Stockholmsregionen. Det erbjuder sovsal, privata rum och stugboende, vilket gör ön tillgänglig för olika typer av resenärer utan att kräva hotellbudgetar. Frukost serveras i huvudbyggnaden och de gemensamma utrymmena skapar en social atmosfär ovanlig för en liten skärgårdsö.',
      'Bad på Grinda är bra på flera ställen runt ön. Klipporna är jämna och vattnet i de skyddade vikarna värms upp tidigare under sommaren än mer exponerade lägen. Flera naturliga badplatser är markerade på den karta som finns tillgänglig vid vandrarhemmet. Vattenklarheten här är generellt god, ön sitter tillräckligt långt från de stora farleder för att undvika grumligheten hos innerskärgårdsvikar.',
      'Grindas attraktionskraft är specifikt naturlig. Det finns inga bilar, inget nattliv och inga souvenirbutiker. Restaurangerna serverar säsongsbetonad svensk mat i en miljö som ser ut över vattnet. Denna frånvaro av kommersiellt brus är vad många besökare specifikt söker: en plats där aktiviteten är promenader, bad, god mat och att göra relativt lite annat.',
      'Ön har flera kilometers markerade leder som tar besökare genom en blandning av klippor, skog och öppna ängar. Lederna är tillräckligt kompakta för att man ska kunna gå de flesta av dem på en dag. Kustleden längs östra sidan erbjuder ohindrad utsikt över skärgården och är särskilt vacker i tidigt morgonljus.',
      'Barn trivs på Grinda. De lugna, skyddade vikarna är säkra för bad, lederna är tillräckligt korta för yngre vandrare och den allmänna atmosfären är familjeinriktad utan att vara kommersiell. Skolklasser är vanliga, vilket ibland innebär att vandrarhemmet är belagt av grupper. Värt att kontrollera om lugnare förhållanden är viktigt.',
      'Matverksamheten på Grinda drivs av STF och fokuserar på kvalitet inom ett begränsat sortiment. Lokal fisk, nybakat bröd och säsongsbetonade svenska rätter är grunden för det som serveras. Restaurangen ser ut över hamnen och borden utomhus är bland de trevligaste platserna att äta på i innerskärgården under en lugn sommarkväll.',
      'Grinda sitter i ett idealiskt läge för att utforska omgivande öar. Båtförbindelser når andra STF-förvaltade destinationer och farvattnet härifrån täcker stora delar av mellersta skärgården. Besökare som anländer med kajak kan använda Grinda som utgångspunkt för längre paddelturer.',
      'Ön känns bäst i juni och augusti. Juli drar större folkmassor och de gemensamma vandrarhemsutrymmen är mer trängda. Axelmånaderna, i synnerhet tidigt juni när vegetationen är som grönast och sent augusti när skaran glesas ut, visar Grinda på sitt bästa: frodig, lugn och med en atmosfär som rättfärdigar de två timmarnas båtresa från Stockholm.',
      'Att boka boende på Grinda i förväg är nödvändigt under hela juli och lämpligt från mitten av juni till slutet av augusti. Dagsbesökare är välkomna utan reservation, men de som planerar att övernatta bör boka via STF med god framförhållning.',
      'Grinda passar inte alla. Besökare som förväntar sig en livlig hamnmiljö, flera restaurangalternativ eller kommersiell underhållning finner det tyst till gränsen för tristess. De som specifikt vill ha natur, lugn, bra bad och en välorganiserad, lågmäld friluftsupplevelse finner det nära nog perfekt.',
      'Grindas karaktär hänger tätt samman med STF:s förvaltningsprinciper. Det innebär inga motorbåtstaxitjänster, ingen disco, inga casinobåtar ankrade i sundet. Det innebär också att de gäster som väljer Grinda i allmänhet gör det av medvetna skäl, vilket bidrar till en specifik typ av trevlig social atmosfär på kaféterassen och vid bryggan.',
      'Att bo på Grinda under ett par dagar ger tillgång till de timmar som dagsbesökare missar: tidiga morgnar när dimman hänger kvar i sunden, sena kvällar när solen går ner bakom västra klipporna och den stund på eftermiddagen när de flesta Stockholmsbåtarna har avgått och ön är som stillsammast. Det är i de tiderna som Grinda visar sin bästa version.',
      'Den historiska gårdsanläggningen på Grinda (Grinda Gård) driver jordbruk och producerar råvaror som delvis används i kök- och matverksamheten på ön. Den kopplingen, jord till bord inom öns gränser, är ovanlig för en skärgårdsö och adderar till den autenticitet som STF-förvaltningen strävar mot.',
    
    
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 11 Strömkajen–Södra Grinda, snabbast 1 tim 35, de flesta 1 tim 50–2 tim 15.
      travel_time: '~2 h med Waxholmsbåt från Strömkajen (snabbast 1 tim 35)',
      character: 'Naturskönt, välskött, bra mat, populär gästhamn',
      season: 'Maj–September',
      best_for: 'Seglare, vandring, romantiska par, familjer',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Markerade stigar runt hela ön. Klipporna i norr ger panoramautsikt mot skärgården.' },
      { icon: '🛶', name: 'Kajak & SUP', desc: 'Uthyrning vid Wärdshuset. Paddla söder om ön mot de omgivande grunden.' },
      { icon: '🏊', name: 'Bad', desc: 'Grinda har flera fina badplatser, varav en sandstrand vid gästhamnen.' },
      { icon: '⛵', name: 'Segling', desc: 'Grinda Gästhamn är ett klassiskt stopp på Sandhamnsleden. Välutrustad med full service.' },
      { icon: '🌅', name: 'Solnedgångspromenaden', desc: 'Promenera till öns västra sida på kvällen för en av skärgårdens bästa solnedgångar.' },
    ],
    accommodationIntro: 'Grinda Wärdshus driver öns hela boende och håller hög standard i alla kategorier — hotellrum med frukost i fyra hus, enkla Sea Lodge-stugor nära vattnet och en campingplats för friluftsentusiaster. Wärdshuset håller öppet maj–september och tar emot gäster utan bil.',
    accommodation: [
      { name: 'Grinda Wärdshus Hotell', type: 'Hotell', desc: 'Hotellrum i fyra hus nära wärdshuset. Frukost ingår. Boka i förväg sommartid.', websiteUrl: 'https://grinda.se' },
      { name: 'Grinda Sea Lodge', type: 'Stugor', desc: 'Enkelt och prisvärt boende vid vattnet. Självhushåll med gemensamt kök.', websiteUrl: 'https://grinda.se' },
      { name: 'Grinda Camping', type: 'Camping', desc: 'Tältplats på ön i naturskön miljö. Ingen förbokning krävs — kom som du är.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '2 h', desc: 'Direktlinje. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Gästhamnen tar emot alla. Boka el-plats i förväg.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Grinda Gästhamn (Hemviken)', desc: 'Välutrustad hamn med bränsle och full service.', fuel: true, service: ['el', 'vatten', 'dusch', 'bränsle', 'tvätt', 'wifi'] },
    ],
    restaurants: [
      { name: 'Grinda Wärdshus Restaurang', type: 'Restaurang', desc: 'Skärgårdens bästa kök i detta prissegment. Boka.', bookingUrl: 'https://www.bokabord.se/restaurang/grinda-wardshus', websiteUrl: 'https://grinda.se' },
      { name: 'Framfickan', type: 'Bistro', desc: 'Bryggbistro nedanför wärdshuset. Lunch i solen.', slug: 'framfickan-grinda' },
      { name: 'Grinda Lanthandel & Café', type: 'Café', desc: 'Frukost, fika och proviant vid nedre hamnen.', slug: 'grinda-lanthandel-cafe' },
    ],
    tips: [
      'Framfickan på klipporna är bäst för lunch — boka bord från kl 10.',
      'Grinda Lanthandel öppnar på morgonen och säljer nybakat bröd — kolla aktuella öppettider innan du planerar frukosten.',
      'Sjömacken vid hamnen har bra läge och bra service — fyll på om du ska vidare mot Sandhamn.',
      'Högsäsong: anlöp tidigt — gästhamnen fylls redan under förmiddagen på fina sommardagar.',
    ],
    related: ['sandhamn', 'finnhamn', 'vaxholm'],
    tags: ['gästhamn', 'värdshus', 'natur', 'segling', 'romantik'],
    did_you_know: 'Henrik Santesson (Nobelstiftelsens första verkställande direktör) köpte Grinda 1906 och lät arkitekten Ernst Stenhammar rita den vackra gula jugendvillan, klar 1908. Stockholms stad köpte ön 1944, och idag förvaltas Grinda som naturreservat av Skärgårdsstiftelsen. Villan är numera Grinda Wärdshus.',
    transport_meta: {
      from_city_min: 120,
      from_nearest_hub_min: 60,
      nearest_hub: 'Vaxholm',
      operator: 'Waxholmsbolaget',
      line: 'Linje mot Sandhamn',
      frequency: 'Flera avgångar/dag sommartid',
      booking_url: 'https://waxholmsbolaget.se',
      car_parking: 'Inget bilalternativ till Grinda — ta båt från Strömkajen eller Vaxholm. Parkering vid Vaxholms hamn om du kör till Vaxholm.',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Uthyrning vid Wärdshuset. Lugna vatten söder om ön.' },
      bad: {
        beaches: [
          {
            name: 'Sandstrand vid Grinda gästhamn',
            type: 'sandstrand',
            desc: 'En av de få sandstränderna i mellersta skärgården — liten men genuint fin. Direkt vid gästhamnen Hemviken med lugnt, skyddat vatten och god sikt. Populär bland barnfamiljer och de som anländer med Waxholmsbåten.',
            child_friendly: true,
            depth: 'Grunt och sandbotten, barn kan stå långt ut. Vattnet i Hemviken värms upp snabbt.',
            directions: 'Direkt vid gästhamnen — gå längs bryggan söderut, 2 min. Omklädning och toaletter vid vandrarhemmet 50 m bort.',
            insider_tip: 'Bäst tidigt på morgonen när Stockholmsbåtarna ännu inte anlänt. Efter kl 14 är det fullt med dagsbåtsturister.',
          },
          {
            name: 'Klippbad, norra Grinda',
            type: 'klippbad',
            desc: 'Öppna klipphällar på norra sidan med vid utsikt mot norra skärgårdskorridoren. Mer exponerat och vindpåverkat än sandstranden — bättre för den som gillar det öppna havet. Ensamt och vackert på kvällen.',
            child_friendly: false,
            depth: 'Djupt direkt vid klippkanten — passa yngre barn noga.',
            directions: 'Vandra norrut från vandrarhemmet längs den markerade stigen, ca 20 min.',
            insider_tip: 'Solnedgångsbad härifrån är en av mellersta skärgårdens bäst bevarade hemligheter — ta med dryck och sätt dig ner en timme innan solen går ner.',
          },
        ],
      },
      vandring: { trails: 3, max_km: 7 },
      fiske: false,
    },
    amenities: { toilets: true, shower: true, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Naturreservat — koppeltvång gäller hela ön under häckningssäsong (perioderna varierar mellan områden, vanligen någon gång mellan 1 februari och 31 augusti — datumen står på skyltarna och i länsstyrelsens föreskrifter). Hundar välkomna i övrigt.',
    insiderTips: [
      'Grinda ägs av STF och är ett naturreservat utan privat bebyggelse och utan bilar.',
      'Grinda har två hamnar: Norra Grinda (gästhamn, mer besökt) och Södra Grinda (naturhamn, lugnare). De flesta turistbåtar lägger till i norr.',
      'Vandringsslingan runt Grinda är ungefär 6 kilometer och tar 1,5–2 timmar i normalt tempo.',
      'STF-anläggningen på Grinda serverar frukost och middag. Under juli och augusti är bokning av bord starkt rekommenderat.',
    ],
    blogLinks: [
      { slug: 'kajak-stockholms-skargard-nyborjare', title: 'Kajak i skärgården – guide för nybörjaren' },
      { slug: 'barnfamilj-skargard', title: 'Skärgård med barnfamilj – 8 tips för en lyckad tur' },
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Grinda är som vackrast i juni — allt öppet, massor av blommor och bara hälften så många besökare som i juli.',
      warning: 'Grinda Wärdshus stänger normalt oktober–april. Gästhamnen har begränsad service utanför säsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
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
      'Finnhamn är den av de klassiska skärgårdsöarna som kanske bäst behållit sin karaktär. Ingen bil, ingen stress. Bara skog, klippor och havet. Ön drivs i stor utsträckning av en ideell förening och vandrarhemsverksamheten har en lång historia.',
      'Vattnet runt Finnhamn är blankt och klart. Hamnen är en naturlig vikskyddad hamn med plats för hundratals båtar. Krogen, takbaren och lanthandeln är samlingspunkterna sommartid.',
      'Finnhamn fungerar bra som dagsmål men belönar den som stannar, gärna ett par nätter. Kombinera med Söder Långholm och Paradisviken, som är bland skärgårdens finaste naturhamnar.',
      'Finnhamn drivs sedan decennier av STF, Svenska Turistföreningen, och det märks i karaktären. Det är inte ett kommersiellt projekt utan en plats som genuint vill att folk ska komma ut i skärgården. Vandrarhemsverksamheten är enkel och billig, krogen lagar mat av vad säsongen ger, och det råder en atmosfär av att alla är välkomna oavsett hur fin båt man kom med.',
      'Paradisviken, en knapp sjömils paddling söder om Finnhamn, förtjänar sitt namn. En smal passage öppnar sig till en skyddad naturhamn omgiven av klippor och skog. Det finns ingenting där. Ingen brygga, ingen kiosk, ingen annan människa om man är tidig. Det är den sortens plats man åker tillbaka till.',
      'Vandringen från hamnen upp till öns högsta punkt tar en halvtimme och lönar sig. Utsikten över de omgivande holmarna och sunden, med segelfartyg som glider förbi nedanför, är en av de bästa i mellersta skärgården. Ta med matsäck och räkna inte med café-öppettider till toppen.',
      'Finnhamn lämpar sig utmärkt för den som vill kombinera skärgård med lite äventyr. Kajak ut till de omgivande holmarna, båtluffning norrut mot Arholma eller en flerdag längs kusten med vandrarhemsövernattningar. Det är en av skärgårdens bästa basplatser för den typen av tur.',
      'Finnhamn är uppbyggt kring STF-vandrarhemmet, STF Vandrarhem Finnhamn, som är en av de mest besökta STF-anläggningarna i Sverige. Vandrarhemmet drivs i ett kluster av röda trähus på huvudön och erbjuder boende i allt från sovsal till privata stugor. Populariteten grundar sig i en kombination av verklig naturkvalitet, bra vandringsterräng och ett tillgängligt läge i norra skärgården.',
      'Resan till Finnhamn med Waxholmsbåt tar ungefär två timmar från Stockholm, vilket placerar det i ett mellanläge, inte lika direkt tillgängligt som Fjäderholmarna men märkbart kortare resväg än ytterskärgårdsdestinationerna. Båten passerar genom progressivt öppnare och mer dramatiska delar av den norra skärgården på vägen in.',
      'Vandring är Finnhamns primära friluftsaktivitet. Ön sitter inom ett naturreservat och flera markerade leder korsar både Finnhamn och de angränsande öarna i gruppen. Terrängen är klippig och skogbevuxen, typisk norr-skärgårdslandskap där berggrunden är äldre och skogsklädnaden tätare än i söder. Lederna varierar från lugna kustnära promenader till mer krävande stigar genom det inre.',
      'Kajakpaddling är ett naturligt komplement till vandringen på Finnhamn. Klustret av små öar runt Finnhamn skapar skyddade vattenrutter lämpliga för paddling. STF-vandrarhemmet har historiskt tillhandahållit eller organiserat kajakhyra under sommaren. Det omgivande vattnet är mindre exponerat än ytterskärgården, vilket gör Finnhamn lämpligt också för mindre erfarna paddlare.',
      'Kaféet och restaurangen vid vandrarhemmet serverar enkel mat under sommaren: smörgåsar, soppa, fiskrätter och fika. Verksamheten är primärt inriktad på vandrarhemsägterna men välkomnar dagsbesökare. Vänta inte ett elaborerat matutbud, maten är ärlig och passande för miljön.',
      'Fågelskådning på Finnhamn belönar besökare under vår och höst. Det norra skärgårdsläget och blandningen av biotoper lockar ett brett arturval. Ejdrar syns vanligen i de omgivande vattnen och skogarna rymmer de skogslevande arter som är typiska för den svenska boreofringe.',
      'Skolgrupper och ungdomsorganisationer nyttjar Finnhamn flitigt. Under sommaren, framför allt i juni och tidigt juli, kan vandrarhemmet hysa stora sällskap, vilket förändrar stämningen i de gemensamma utrymmena. Att besöka i augusti eller september ger vanligtvis en lugnare, mer vuxeninriktad atmosfär.',
      'De omgivande öarna, Ängsö, Yxlan och de mindre öarna i området, är nåbara från Finnhamn med båt och lägger till alternativ för dem som stannar flera nätter. Ängsö är nationalpark sedan 1909 — en av Europas äldsta — och känd för sitt ovanligt rika växtliv.',
      'Vintern på Finnhamn är mycket annorlunda. Vandrarhemmet stänger typiskt eller reducerar öppettiderna markant från oktober till april. Öarna i djupvinter har ett kargare, kallt intryck, de bara klipporna, det grå vattnet och frånvaron av sommarbesökare skapar en stämning som en del finner tvingande och andra finner enkelt kall.',
      'Finnhamn är ärlig i vad det erbjuder: bra natur, bra vandring, enkelt men bekvämt boende och den sociala atmosfären hos ett vandrarhem. Det erbjuder inte kulinarisk ambition, spa-faciliteter eller något som liknar lyx. Besökare som vill ha det bör söka sig annorstädes. De som vill ha en genuin friluftsupplevelse i den norra skärgården, inom praktiskt reseavstånd från Stockholm, finner Finnhamn svårt att förbättra.',
      'Ängsö nationalpark, belägen relativt nära Finnhamn, är ett av de mer biologiskt värdefulla naturområdena i Stockholm-närheten. Nationalparken skyddar en rik blomsteräng och ett gammalt kulturlandskap. Dagsutflykter dit från Finnhamn är möjliga för dem som planerar i förväg och sätter samman en rutt med de lokala båtförbindelserna.',
      'Finnhamns sociala atmosfär, van-drarhemmet, de gemensamma matborden, mötet med andra friluftsmänniskor, är en del av vad som gör platsen speciell. Det är en av få ställen i Stockholmsskärgården där det är naturligt att slå sig ner vid ett bord med folk man inte känner och börja prata om vart man ska härnäst.',
      'Finnhamn är en av de öar som tydligast visar vad Waxholmsbåtssystemet faktiskt möjliggör: ett genuint friluftsmål, välbeläget i norr, nåbart utan bil och utan flyg, inom ett par timmars resa från en av Nordens störst städer. Det är ett systemverk som få länder i världen kan matcha.',
      'Höststämningen på Finnhamn i september är specifik. De stora gruppsesongerna är avslutade, vandrarhemmet är lugnare och löven på de norra klipporna börjar nyanseras. Det är den perioden då ön visar sin mer stillsamma sida och det är när många stamgäster föredrar att besöka.',
    
    
    
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 12/13 Strömkajen–Finnhamn, snabbast 3 tim 05 (08.30→11.35), typiskt ~3 tim 30.
      travel_time: '~3 h med Waxholmsbåt från Strömkajen (linje 12/13)',
      character: 'Naturnärt, lugnt, genuint, bra för vandring',
      season: 'Maj–September (vandrarhem delvis öppet helår)',
      best_for: 'Vandring, naturupplevelse, seglare, budget-resenärer',
    },
    facts_provenance: { travel_time: 'matt' },
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
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '~3 h', desc: 'Direktlinje. Ingår i SL-kort.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Ankra i Paradisviken (Djupfladen) eller förtöj i gästhamnen.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Djupfladen (Paradisviken)', desc: 'Naturhamn och gästhamn klassad som en av skärgårdens bästa. Skyddad och naturskönt.', fuel: false, service: ['vatten', 'sopor'] },
      { name: 'Vandrarhemsviken', desc: 'Hamn vid vandrarhemet med service.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Finnhamns Krog', type: 'Restaurang', desc: 'Samlingsplatsen vid hamnen. Enkel och bra mat.', bookingUrl: 'https://www.bokabord.se/restaurang/finnhamns-krog', websiteUrl: 'https://finnhamn.se' },
      { name: 'Takbaren', type: 'Bar', desc: 'Bar med panoramautsikt från vandrarhemsbyggnadens tak.' },
      { name: 'Ragnars kiosk', type: 'Kiosk', desc: 'Glassbod och enkla tilltugg vid bryggan.', slug: 'ragnars-kiosk-finnhamn' },
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
    insiderTips: [
      'Finnhamn ägs av STF och är ett naturreservat. Ön har tältplatser för fri camping vid sidan av vandrarhemsboende.',
      'Namnet Finnhamn kommer av att finnar använde ön som tillfällig hamn under 1600-talet. Det är inte en person vid namn Finn.',
      'Kajakuthyrning finns på Finnhamn under sommarsäsongen. Ön är ett av de bättre utgångspunkterna för kajakpaddling i mellersta skärgården.',
      'Caféet och kiosken på Finnhamn stänger relativt tidigt under kvällen. Ta med proviant om du planerar en sen ankomst.',
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Lugn ö som sällan är fullsatt. Juni ger grönare natur och September ger svamprika skogar.',
      warning: 'Båttrafiken till Finnhamn är begränsad utanför sommarsäsongen. Kontrollera tidtabellen i förväg.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Paddla ut till Paradisviken (Djupfladen) och Söder Långholm. Uthyrning via vandrarhemet.' },
      bad: {
        beaches: [
          {
            name: 'Klippbad vid Berg',
            type: 'klippbad',
            desc: 'Klipphällar norr om hamnen med svalt, klart vatten och utsikt mot norra skärgårdskorridoren. Stillare och mer ostört än hamnfronten — morgondoppet här är en ritual för vandrarhemsgästerna.',
            child_friendly: true,
            depth: 'Hopphällar finns, men även grunt parti för barn.',
            directions: 'Följ stigen norrut från vandrarhemet ca 15 min. Fråga personalen om den exakta leden.',
            insider_tip: 'Ta med kaffe från kiosken och kom hit i gryningen — vattnet är klarare och kallare på morgonen, och du har hela klippan för dig själv.',
          },
          {
            name: 'Klippbad vid Långvik',
            type: 'klippbad',
            desc: 'Skyddad vik på södra sidan av Finnhamn med lugnare vatten och mer sol eftermiddagstid. Mer tillgänglig för de med barn än de norra klipporna.',
            child_friendly: true,
            depth: 'Litet grunt parti vid vikens inre del — bra för de yngre.',
            directions: 'Ta stigen söderut från hamnen, ca 20 min. Välmarkerat.',
            insider_tip: 'Söder Långholm (den lilla ön söder om Finnhamn) har ännu bättre klippbad — paddla dit med kajak om du hyr en.',
          },
        ],
      },
      vandring: { trails: 4, max_km: 12 },
    },
  },

  // ─── MÖJA ────────────────────────────────────────────────────
  {
    slug: 'moja',
    name: 'Möja',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: 'island',
    tagline: 'Bilfri och genuint lantlig — skärgårdens bäst bevarade hemlighet.',
    seoTitle: 'Möja 2026 – bilfri ö med krog & äkta skärgård',
    seoDescription: 'Guide till Möja: bilfri ö med Möja Krog, cykelleder och genuint lantliv. Hur du tar dig dit och vad du inte får missa.',
    description: [
      'Möja är en av Stockholms skärgårds mest autentiska öar. Bilfri, lugn och med en genuint lantlig karaktär som saknar motstycke. Här bor ett par hundra permanentbor och sommartid dubbleras befolkningen, men det är inget som stör den stilla stämningen.',
      'Ön är tillräckligt stor för att ha en varierad geografi: skog, öppna fält, klippor och flera hamnar. Roland Svensson-museet och den vackra kyrkan är kulturella pärlor. Fisket är utmärkt och havsutsikterna ovanliga.',
      'Möja nås med Waxholmsbolagets linje 14 från Sollenkroka (buss 434 från Slussen dit) eller direkt från Strömkajen via Vaxholm, och är ett naturligt stopp på en seglingstur mot Sandhamn eller Gällnö. Krogar och kaféer täcker grundbehoven utan att bli turistiga.',
      'Möja är egentligen tre öar sammanbundna av smala permar: Norra, Mellersta och Södra Möja. Det gör att man kan cykla eller vandra längs öns hela längd och uppleva tre olika karaktärer. Norra änden är öppen och stormig, mitten mer skogig och lantlig, södra änden har de bästa klipporna och den klaraste horisonten.',
      'Roland Svensson-museet är litet men oväntat gripande. Svensson var konstnär och levde hela sitt liv på Möja, och hans akvareller av skärgårdslandskapet har en precision och ett ljus som säger mer om platsen än de flesta vykort. Museet är öppet sommartid och tar ungefär en timme.',
      'Matstoppet på Möja är inte spektakulärt och det är en del av charmen. Lanthandeln säljer det man behöver, krogen lagar husmanskost med råvaror från öns egna odlingar och fiskebacken. Man äter gott, men det är inte hit man åker för gastronomin. Det är hit man åker för att äta räkor på en klippa med utsikt mot ingenting alls.',
      'Möja är för den som vill ha skärgård på allvar. Inte den paketerade, handlade varianten utan den äkta. Ön har en egen rytm, egna invånare med egna åsikter om vad som är bra och inte, och en historia som inte börjar med turistbroschyrer. Kommer man dit med den respekten och tar sig tid att lyssna, ger ön tillbaka med råge.',
      'Möja är en av de mer folkrika ytterskärgårdsöarna i Stockholms skärgård, med flera hundra permanent boende. Den befolkningsbasen ger ön en annan karaktär än rent sommardestinationer. Ön har egna butiker, skola och social infrastruktur som fungerar under hela året. Det är den basen som håller Möja vid liv som en äkta gemenskap snarare än en turistprodukt.',
      'Ön sträcker sig ungefär 12 kilometer i nord-sydlig riktning, lång för skärgårdsstandard. Flera byar är fördelade längs den längden: Möja by vid norra änden, Langvik i mitten och mindre bebyggelse längre söderut. Varje del har sin egen karaktär. Möja by, runt huvudhamnen, är den mest aktiva. Längre söderut blir ön tystare och mer lantlig.',
      'Att ta sig till Möja kräver tid. Waxholmsbåtsförbindelsen från Stockholm tar ungefär tre timmar genom en lång del av östra skärgården. Den restiden fungerar som ett filter. De som anländer till Möja har i allmänhet tagit ett medvetet beslut att vara där, vilket ger ön en lugnare atmosfär än lättillgängliga dagsutflykts-destinationer.',
      'Möjas landskap är mer varierat än många ytterskärgårdsöar. Skog, jordbruksmark, klippor och små sandiga vikar växlar längs öns längd. Kombinationen innebär olika typer av naturkontakt inom relativt korta avstånd. Ett morgonbad från klippor, en skogsrunda, en lantbruksfrukost och en eftermiddag på en häll med utsikt kan alla rymmas på samma dag.',
      'Möja Handel, öns lanthandel, är något av en kulturell institution i skärgården. Den fungerar som affär, mötesplats och utlämningsställe för den permanenta gemenskapen och som proviantshop för besökande seglare. Butiken säljer det lokalborna behöver, inte kurerade turistvaror, och den distinktionen är synlig och tillfredsställande.',
      'Cykling är ett förnuftigt sätt att utforska Möjas längd. Stigarna mellan byar är tillräckligt flata för de flesta cyklister och resan från ena änden av ön till den andra kan göras på två till tre timmar med stopp. Cykeluthyrning finns vid hamnen under sommarsäsongen.',
      'Restaurangerna och kaféerna på Möja är av blygsam skala. Det finns ingen fin-dining-anläggning, men kaféer med smörgåsar, kaffe och enkel varm mat är öppna under sommaren. För de som vill ha en ordentligare måltid kräver alternativen lite research om aktuella aktörer. Öns matscen är liten och föremål för säsongsvariation.',
      'Fågelskådning är produktivt på Möja. Öns varierade biotoper, kust, skog och jordbruksmark, skapar förhållanden för ett bredare arturval än mer enhetliga klippöar. Tidiga morgonvandrare i maj och september möter aktiv flytt, framför allt längs den östra strandlinjen.',
      'Den permanenta gemenskapen är en av anledningarna till att Möja har bevarat sin karaktär. Det finns en aktiv lokalförening, en kyrka med gudstjänster under hela året och ett etablerat socialt liv som inte försvinner i slutet av augusti. Det ger ön en motståndskraft som rent säsongsbetonade gemenskaper ofta saknar.',
      'Möja passar besökare som vill ha något nära äkta ytterskärgårdsliv som det var innan massturismen, med fungerande hamn, lokal butik och verklig gemenskap, kombinerat med det naturliga landskapet på ytterskärgårdsöar. Det passar inte besökare som förväntar sig polerad turistinfrastruktur.',
      'För rätt besökare är Möja en av de mest givande öarna i hela Stockholms skärgård. Restiden är hindret. Väl framme skapar kombinationen av naturlig skönhet, gemenskapets karaktär och relativa stillhet en upplevelsekvalitet som de lättillgängliga öarna inte kan matcha.',
      'Möja Café är en av de mer välkända mötesplatserna på ön, med en sommarverksamhet som betjänar både bofasta och besökare. Kaféets historia på ön sträcker sig tillbaka ett antal decennier och det har den typ av kontinuitet som gör det till en institution snarare än en säsongsattraktion.',
      'Ön erbjuder ett av de mer äkta alternativen till de kommersiellt drivna skärgårdsöarna. Det finns ingen stor marknadsföringsapparat bakom Möja. Ryktet sprids via dem som besökt ön och rekommenderat den till vänner, vilket skapar ett besöksflöde med ett annorlunda kvalitetssnitt än destinationer som marknadsförs aggressivt.',
      'Sjöfartskulturen är alltjämt levande på Möja. Ön har en historia som fiskesamhälle som sträcker sig tillbaka till tider när strömming och sill var de primära ekonomiska aktiviteterna. Den historien syns i bebyggelsen och i de gamla sjöbodarna längs vattnet. Att promenera runt hamnen tidigt på morgonen ger en glimt av den rytm som formade livet här i generationer.',
    
    
    ],
    facts: {
      // KÄLLA: Waxholmsbolagets tabell 14. Möja nås från SOLLENKROKA (ej Stavsnäs), ~40 min–1 tim till byns bryggor. Strömkajen–Berg ~3,5 tim (08.50→12.30).
      travel_time: '~40 min–1 tim från Sollenkroka · ~3,5 h från Strömkajen',
      character: 'Bilfri, lantlig, genuint, lugnt',
      season: 'Maj–September',
      best_for: 'De som söker äkta skärgårdsliv utan turister',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🎨', name: 'Roland Svensson-museet', desc: 'Museum tillägnat skärgårdskonstnären Roland Svensson (1910–2003). Öppnade 2014 vid Ramsmora ångbåtsbrygga — Roland Svenssons gamla ateljé från Tornö är bevarad och flyttad in i museet.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera mellan hamnarna och genom lantliga bymiljöer. Ingen brådska, inga turiststigar.' },
      { icon: '⛪', name: 'Möja kyrka', desc: 'Vacker liten kyrka med utsikt. Välskött och värd ett besök.' },
      { icon: '🎣', name: 'Fiske', desc: 'Utmärkt fiskevatten runt ön. Abborre och gädda i vikarna, havsöring utanför.' },
      { icon: '🛶', name: 'Kajak', desc: 'Paddla runt öns södra sida mot Gällnö och Svartsö.' },
    ],
    accommodationIntro: 'Möjas boende är mer sporadiskt och lokalt organiserat än på de mer turistade öarna — uthyrning sker delvis via lokalbor och digitala plattformar snarare än via hotellkomplex. Det är en del av charmen: du bor genuint, nära det verkliga ölivet och de fastboende som gör Möja till vad det är.',
    accommodation: [
      { name: 'Möja Logi', type: 'Stugor', desc: 'Enkla stugor och rum hos lokalbor. Fråga på Hamnbaren eller lanthandeln om aktuellt utbud och tillgänglighet.' },
      { name: 'Privat stuguthyrning', type: 'Stugor', desc: 'Flera privatpersoner hyr ut sommarstugor på Möja via Airbnb och liknande plattformar. Boka i god tid inför sommarsäsongen.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Sollenkroka', time: '~40 min', desc: 'Waxholmsbolagets linje 14 från Sollenkroka brygga (buss 434 från Slussen dit) — flera bryggor på Möja: Berg, Ramsmora, Långvik. Även direktbåt från Strömkajen, ~3,5 h.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Förtöj vid någon av öns gästhamnar (Berg och Långvik är huvudalternativen).', icon: '⛵' },
    ],
    harbors: [
      { name: 'Berg gästhamn', desc: 'Huvudhamnen i Berg på östra Möja. Bra service och nära till restauranger och bageri.', service: ['el', 'vatten', 'dusch'] },
      { name: 'Långvik gästhamn', desc: 'Mindre gästhamn i Långvik, lugnare och mer naturnära.', service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Möja Värdshus & Bageri', type: 'Värdshus/Bageri', desc: 'Öns hjärta i Kyrkviken sedan 1951. Nybakt bröd på morgonen och restaurang med utsikt. Öppet sommarsäsongen.', websiteUrl: 'https://mojavardshusochbageri.se' },
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
    transport_meta: {
      from_city_min: 195,
      from_nearest_hub_min: 60,
      nearest_hub: 'Sollenkroka',
      operator: 'Waxholmsbolaget',
      line: 'Linje 14 (Sollenkroka–Möja); buss 434 Slussen–Sollenkroka',
      frequency: '2–4 avgångar/dag sommartid, glesare vinter',
      booking_url: 'https://waxholmsbolaget.se',
      // KÄLLA: Värmdö kommun — https://www.varmdo.se/varmdohamnar/parkera.4.6e5e3cc318a8d4dc3f6361bf.html (hämtad 2026-08-06)
      car_parking: 'Parkering vid Sollenkroka brygga (avfärdshamn för Möja). Vid Stavsnäs vinterhamn finns ca 1 300 platser men den hamnen gäller Sandhamn/Nämdö-trafiken, inte Möja. Pendelbuss 428 från Slussen till Stavsnäs (ca 60 min med SL-kort).',
    },
    activity_meta: {
      kajak: { difficulty: 'lätt', rental: true, notes: 'Paddla söderut mot Gällnö och Svartsö. Uthyrning vid Berg.' },
      bad: {
        beaches: [
          {
            name: 'Klippbad vid Berg',
            type: 'klippbad',
            desc: 'Solexponerade klipphällar strax norr om Möja Bergs färjebrygga. Klart, svalt vatten med god sikt — man ser botten på tre meters djup. Populärt bland de fastboende på lugna augustimornar.',
            child_friendly: true,
            depth: 'Brant vid hällarna, men ett litet grunt parti i vikens södra hörn passar barn.',
            directions: 'Gå norrut längs stigen från Bergs brygga, ca 5 min. Skylt "Klippbad" vid grinden.',
            insider_tip: 'Kajakuthyrningen vid Berg tar dig till bättre klippor söderut — paddla 20 min mot Södra Möja för total avskildhet.',
          },
          {
            name: 'Klippbad vid Långvik',
            type: 'klippbad',
            desc: 'En av Möjas mer avsides badplatser, i en smal vik på den mellersta öns västsida. Lugnt vatten, fantastisk sommarkväll-stämning och inga turister — det är dit de fastboende går när de vill ha fred.',
            child_friendly: true,
            depth: 'Grunt vid vikens inre del, djupare mot öppet vatten.',
            directions: 'Cykla eller promenera från Berg norrut mot Möja by, ta av väster mot Långvik, ca 2 km. Ingen skylt — fråga i lanthandeln.',
            insider_tip: 'Kvällssolen träffar Långviks klippor perfekt mellan 18 och 20 på sommaren. Ta med mat och sätt dig — det är en av skärgårdens mest ostörda platser.',
          },
          {
            name: 'Klippbad södra Möja',
            type: 'klippbad',
            desc: 'Södra Möja har öns bästa klippor — långa, sluttande hällar mot öppet hav med bred horisontutsikt. Det är här Möjas karaktär verkligen visar sig: inga bryggor, inga skyltar, bara klippor och hav.',
            depth: 'Djupt direkt — hopphällar för den vane. Inget grunt parti.',
            directions: 'Cykla söderut från Berg hela vägen till Södra Möjas spets, ca 5 km. Stigen slutar vid klippkanten.',
            insider_tip: 'Bäst i lugnt väder — södersidan är öppen och kan vara bra blåsig. En perfekt dag här slår Sandhamn utan konkurrens.',
          },
        ],
      },
      vandring: { trails: 3, max_km: 10 },
      fiske: true,
    },
    amenities: { toilets: true, shower: false, cafe: true, grocery: true, atm: false },
    dog_friendly: true,
    dog_notes: 'Hundvänlig ö med gott om utrymme. Koppeltvång i hamnområden och på några naturreservatsdelar.',
    insiderTips: [
      'Möja har ungefär 200 fastboende och en fungerande byskola, en av de mer välbefolkade yttre öarna i Stockholms mellersta skärgård.',
      'Wikströms på Möja säljer färsk fisk och räkor direkt från fiskaren. Öppet under sommarsäsongen vid hamnen.',
      'Det finns en lanthandel på Möja med ett gott utbud för en ö utan fast vägförbindelse.',
      'Möja är bilfri för besökare men har ett internt bilsystem för de fastboende.',
    ],
    blogLinks: [
      { slug: 'dolda-parlor-moja', title: 'Möjas dolda pärlor – bilfri ö med äkta skärgårdsstämning' },
      { slug: 'cykling-moja-gallno', title: 'Cykla i skärgården – guide för Möja och Gällnö' },
    ],
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Möja är aldrig överfylld men juni och september ger lugnast stämning och de bästa ljusförhållandena för cykelturen.',
      warning: 'Caféet och mataffären håller begränsade öppettider utanför juli–aug. Ta med extra proviant.',
      months: ['off','off','off','off','limited','open','peak','open','open','limited','off','off'],
    },
  },

  // ─── FJÄDERHOLMARNA ──────────────────────────────────────────
  {
    slug: 'fjaderholmarna',
    name: 'Fjäderholmarna',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛴',
    tagline: '25 minuter från Strandvägen — närmaste skärgårdsupplevelsen från Stockholm.',
    seoTitle: 'Fjäderholmarna 2026 – dagstur 25 min från Stockholm',
    seoDescription: 'Fjäderholmarna – närmaste skärgårdsupplevelsen från Stockholm. Båt från Strandvägen, restauranger och hantverksgallerier. Guide till din dagstur.',
    description: [
      'Fjäderholmarna är det enklaste svaret på frågan "hur tar man sig snabbt ut i skärgården?". Bara 25 minuters båtresa från Strandvägen och du är på en ö med rökerier, restauranger, bryggerier och hantverk. Inga bilar, inga långpendlingar.',
      'Ögruppen består av fyra öar varav Stora Fjäderholmen är den besökta. Här finns bland annat Rökeriet, ett av Stockholms mest klassiska rökeri sedan 1980-talet, och Fjäderholmarnas Krog med en av stadens bästa terrasser.',
      'Fjäderholmarna passar alla, från barnfamiljer på dagstur till seglare som vill ha ett sista glas på vägen in mot stan. Säsongen är maj–september.',
      'Det som är unikt med Fjäderholmarna är hur lite tid det tar. Tjugofem minuter från Strandvägen och man kliver av på en ö med klippor, sjöbodar och havsdoft. Ingen planering krävs. Inga övernattningsbokningar, inga tidtabeller att memorera, ingen bil till Stavsnäs. Det är skärgård utan tröskel.',
      'Rökeriet vid hamnen finns sedan 1980-talet och röker sin fisk med samma metoder som alltid. Räkmackan därifrån, med handskalade räkor, dill och citron i en enkel pappersbåt, är ett av Stockholms bästa sommarätanden. Det spelar ingen roll att man är hundra meter från centralstaden.',
      'Fjäderholmarnas Bryggeri är en av de bättre platserna i Stockholmstrakten för att dricka hantverksöl med utsikt. Bryggeriet producerar sina öl på plats och terrasserna sitter vända mot den inre skärgårdens siluett. Kvällstid, med solen lågt och linjelösa Cinderellabåtar som glider förbi, är det svårt att tänka sig något bättre för priset.',
      'Fjäderholmarna är ett naturligt val för den som vill introducera barn eller besökare från utlandet till vad Stockholms skärgård är. Resan är kort nog att inte bli ett projekt, ön är tillräckligt vacker för att ge rätt intryck, och matkvaliteten är hög nog att det faktiskt är en bra utflykt på egna meriter.',
      'Fjäderholmarnas läge är dess definierande egenskap. De fyra lilla öarna ligger mindre än 25 minuter med båt från centrala Stockholm, vilket gör dem till det mest tillgängliga bebodda skärgårdsmålet från staden. Avgångsplatsen är Nybrokajen, en central Stockholmskaj, och båtar går regelbundet under sommaren. Den tillgängligheten formar allt på öarna: det är primärt en dagsutflykts-destination för stockholmare.',
      'Ögruppen består av fyra öar: Lilla Fjäderholmen, Stora Fjäderholmen, Libertas och Rövarns. De två större öarna är sammanlänkade och bildar det huvudsakliga besöksmålet. Den sammanlagda ytan är liten, möjlig att gå runt på under 30 minuter, vilket koncentrerar aktiviteten kring hamnfronten och den närmaste kustlinjen.',
      'Fjäderholmarnas Krog är en av de mer etablerade restaurangerna i skärgården. Den upptar ett privilegierat läge med utsikt över vattnet och serverar svenska skaldjursrätter inklusive den klassiska räksmörgåsen och olika silltillagningar. Kombinationen av matkvalitet och läge gör det genuint populärt. Bord på sommarhelger bokas upp snabbt.',
      'Rökeriet på ön producerar och säljer rökta fiskprodukter. Sortimentet inkluderar typiskt rökt lax, sill och räkor beredda på ön. Att köpa direkt från ett fungerande rökeri i en skärgårdsomgivning är ett specifikt nöje som få Stockholm-nära destinationer erbjuder.',
      'Öns akvarium täcker havslivet i Östersjön. Samlingen fokuserar på arter som faktiskt finns i de omgivande vattnen, inte tropiska fiskar utan torsk, abborre, gädda och de mindre arterna som hör hemma i just den här miljön. Det är kompakt och informativt, framför allt nyttigt för barn eller för den som vill förstå vad som lever under skärgårdsytan.',
      'Flera hantverksstudior och verkstäder är verksamma på Fjäderholmarna under sommaren. Glasblåsning, keramik och textilarbete har historiskt funnits representerade på ön. De specifika aktörerna varierar per säsong, värt att undersöka i förväg om detta är den primära anledningen till besöket.',
      'Bad är möjligt från klippor och små stegar runt öns kanter. Vattnet är rent och tillgångsplatserna välbesökta på varma dagar. Vattentemperaturen följer innerskärgårdens mönster: uppvärmning till bekväma temperaturer till mitten av juli och god badning under hela augusti.',
      'Båtförbindelsen förtjänar ett eget omnämnande. Fjäderholmarna-båten avgår från Nybrokajen under hela sommaren och kör efter ett regelbundet schema. Resan på 25 minuter följer Stockholms strandlinje, passerar under broar och rör sig genom de inre kanalerna innan öarna nås. Till och med resan i sig har en kvalitet som är svår att förklara för dem som inte har gjort den, en snabb övergång från stad till ö som få platser i världen kan matcha.',
      'Fjäderholmarna drivs inte i full kapacitet året runt. Huvudbåtservicen går från sent april till tidigt oktober. Utanför denna period är tillgången begränsad och de flesta mat- och butiksverksamheter stänger. Öarna är som bäst en fin vardag i juni eller tidigt september, när folksamlingarna glesas ut men allting fortfarande är öppet.',
      'Fjäderholmarnas skala spelar roll. Att vara liten innebär att den inte kan erbjuda flerdagarsupplevelsen hos större ytterskärgårdsöar. Men dess syfte är ett annat: det är ett andningshål för en stad med en miljon invånare som alla bor inom 25 minuter från äkta skärgård. Den specifika funktionen utför den bättre än någon annan ö i Stockholms system.',
      'Fjäderholmarna är på ett sätt ett urbant fenomen: en plats som Stockholm har behållit inom räckhåll för hela sin befolkning, inte som en lyx för få utan som en tillgång för många. Den demokratiska aspekten av en stockholmsbåt som kostar detsamma som en tunnelbaneresa och ger dig ut i riktig skärgård är en av de mer underbara egenskaperna hos den här platsen.',
      'Sommarkvällarna på Fjäderholmarna har ett eget ljus. Solen i väster träffar vattenytan runt Stockholms siluett på ett sätt som inte syns från någon annan punkt i innerskärgården. Det är dels anledningen till att restaurangens uteplatser fylls tidigt. En sen kväll i juni eller juli, med den lågt hängande solen över Stockholms torn, är en av de upplevelser som är svåra att sätta ord på utan att låta som en turistbroschyr.',
      'Historiskt var Fjäderholmarna en plats för fiske och förvaring. Fiskarna som brukade dessa vatten använde öarna som driftsbase. Den historien är nästan osynlig i dag men ger ön en djupare förankring i det maritima Stockholm än vad dagens turistprofil antyder.',
    
    
    
    ],
    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — färja 13-1 Stockholm Strömkajen
      // 08:45 → Fjäderholmarna 09:04, alltså 19 min. Stod tidigare "25 min med
      // Cinderellabåtarna från Strandvägen". Restiden var ungefär rätt, men
      // operatören och kajen var fel: Strömmas Cinderella-linje går till
      // Sandhamn, Grinda, Gällnö och Vaxholm — inte till Fjäderholmarna.
      // KÄLLA: Fjäderholmslinjen (fjaderholmslinjen.se, Slussen ~15 min) + Strömma (stromma.com, Strandvägen kajpl 13 ~30 min). Säsong maj–sep. EJ från Strömkajen.
      travel_time: '~15 min från Slussen (Fjäderholmslinjen) el. 30 min från Strandvägen (maj–sep)',
      character: 'Nära stad, lättillgänglig, hög kvalitet',
      season: 'Maj–September',
      best_for: 'Dagstur, lunch, barnfamiljer, seglare på väg in mot stan',
    },
    facts_provenance: { travel_time: 'matt' },
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
      { name: 'Fjäderholmarnas Bryggeri', type: 'Bar', desc: 'Hantverksöl med Stockholms siluett. Kväll och solnedgång.', slug: 'fjaderholmarna-bryggeri' },
      { name: 'The Old Smokehouse', type: 'Restaurang', desc: 'Rökt fisk och skaldjur take-away vid bryggan.', slug: 'old-smokehouse' },
    ],
    tips: [
      'Ta morgonbåten och ät tidig lunch — köerna till Fjäderholmarnas Krog är kortast före lunchruschen.',
      'Rökeriet är öppet från april till oktober — passa på innan säsongen tar slut.',
      'Bryggeriets uteservering är bäst för sundowner när kvällssolen ligger på.',
      'Kolla sista båten tillbaka till stan innan du planerar kvällen — avgångstiden varierar med säsong och veckodag.',
    ],
    related: ['vaxholm', 'grinda', 'bockholmen'],
    tags: ['nära stan', 'dagstur', 'rökeriet', 'öl', 'mat'],
    did_you_know: 'Fjäderholmarna är Stockholms närmaste skärgårdsöar och nås på bara 25 minuter. 1940 införde militären landstigningsförbud — öarna användes som ammunitionsförråd under andra världskriget. Förbudet upphävdes inte förrän 1985, då restaurangerna och rökeriet kunde öppna.',
    insiderTips: [
      'Fjäderholmarna är den närmaste ön från centrala Stockholm, ungefär 25 minuter med båt från Slussen.',
      'Ön var militärt förbudsområde ända fram till 1985, vilket är anledningen till att restauranger och rökeriet öppnade relativt sent.',
      'Rökeriet på Fjäderholmarna säljer rökt fisk och skaldjur och är öppet under sommarsäsongen.',
      'Fjäderholmarna trafikeras av Strömma-båtar från Slussen och ingår inte i SL-kortet.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Maj–Juni',
      bestReason: 'Maj och juni ger sommarstemning utan trängsel. Gå promenaden runt ön och lunta på rökeriet utan kö.',
      warning: 'Sommarsäsongen är kort. De flesta verksamheter är stängda november–mars.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
    activity_meta: {
      bad: {
        beaches: [
          {
            name: 'Klippbad söder om Rökeriet',
            type: 'klippbad',
            desc: 'Platta, söderexponerade klipphällar på öns södra sida — Stockholms siluett i bakgrunden hela vägen. Populärast bland stockholmarna som vet var man badar bra nära stan. Sol från 10 till solnedgång.',
            child_friendly: true,
            depth: 'Blandat — grunt vid sidan, djupare vid klippkanten. Hopphäll för den modige.',
            directions: 'Gå rakt igenom ön från bryggan mot södra stranden, ca 5 min. Stig finns skyltad.',
            insider_tip: 'Bäst baddag är en varm tisdag i juli — helgerna är fulla av dagsbåtsturister. Ankrade båtar ger lä och vattnet värms upp snabbt i vikarna.',
          },
          {
            name: 'Badbrygga vid Fjäderholmarnas Bryggeri',
            type: 'brygga',
            desc: 'Liten badbrygga med stege direkt vid bryggeriet. Perfekt för ett snabbt dopp mellan ölen och krogbesöket — lokal tradition.',
            child_friendly: true,
            depth: 'Djupt vid stegen — hoppa ner eller klättra.',
            directions: 'Direkt vid Bryggeriet på öns norra sida.',
            insider_tip: 'Ta ett dopp och gå direkt upp för en kall öl — Bryggeriets fatöl smakar 10x bättre då.',
          },
        ],
      },
    },
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
      'Ljusterö är en av de större öarna i Stockholms skärgård och en av de mest lättillgängliga. Bilfärja avgår regelbundet från Ljusteröfärjan. Det gör ön populär för cykling och kajakpaddling, och det finns ett brett utbud av service längs kusten.',
      'Kustlinjen sträcker sig mil efter mil och bjuder på varierade miljöer, grunda vikar, öppna klippor och skyddade naturhamnar. Klintan är öns bästa sydläge och ett populärt seglarankare.',
      'Ljusterö saknar en enda stor destination men kompenserar med mångfald: flera restauranger, kaféer och kiosker är spridda längs öns vägnät.',
      'Till skillnad från de flesta skärgårdsöar kan man ta bilen till Ljusterö. Bilfärjan från fastlandet avgår regelbundet och är del av det ordinarie kollektivtrafiksystemet. Det gör ön till ett naturligt val för barnfamiljer som vill ha tillgång till bilen, för husvagnssemestrar och för dem som vill cykla långa sträckor utan att behöva oroa sig för tidtabeller.',
      'Kajakpaddlingen längs Ljusterös kust håller hög klass. De skyddade vikarna på öns västra sida är lätta och lugna även för nybörjare, medan öns östra sida mot öppet vatten kräver mer erfarenhet. Det finns möjlighet att paddla hela vägen runt på en lång dag, ungefär 35 kilometer med några naturliga stopp längs vägen.',
      'Klintan i sydöst är öns naturliga samlingsplats för seglare. En välskyddad hamn med bränsle och service, och ett café som håller öppet under sommarsäsongen. Ångbåtsbryggorna längs kusten berättar om en tid då ångbåtstrafiken var öns enda förbindelse med Stockholm.',
      'Ljusterö är inte en ö man åker till för ett enskilt monument eller en specifik upplevelse. Det är en ö man åker till för att spendera tid i skärgårdsmiljö med frihet att röra sig som man vill. Den friheten, kombinerat med den korta restiden från staden, gör Ljusterö till en av Stockholms mest omtyckta vardagsflyktplatser.',
      'Ljusterö är en av de mer tillgängliga stora öarna i den norra Stockholmsskärgården. Till skillnad från många ytterskärgårdsöar som kräver Waxholmsbåtsförbindelser har Ljusterö en bilfärjeförbindelse från fastlandet, vilket väsentligt utökar de praktiska alternativen för att nå dit. Den tillgängligheten, kombinerat med öns storlek och variationen i dess landskap, gör Ljusterö till ett fungerande mål på sätt som mer isolerade öar inte kan.',
      'Öns storlek är betydelsefull. Ljusterö är en av de större bebodda öarna i Stockholms skärgård. Det innebär att det inre rymmer ett varierat landskap: jordbruksmark, skog, sjöar och klippor existerar inom relativt korta avstånd från varandra. Att gå eller cykla från en terrängtyp till en annan är möjligt under en enda dag.',
      'Den permanenta befolkningen på Ljusterö uppgår till ungefär ett tusental, stor för skärgårdsstandard. Den befolkningen upprätthåller en nivå av helårstjänster inklusive skola, lokal mataffär och kyrkor. Gemenskapen har infrastrukturen hos en liten landsortsby snarare än en ren sommarbygd.',
      'Ljusterö kyrka, öns kyrka, härstammar från medeltiden i sin ursprungliga struktur, om än modifierad och utvidgad under seklerna. Kyrkan håller fortfarande regelbundna gudstjänster och kyrkogården innehåller historiska gravmarkeringar. För besökare intresserade av svensk kyrkoarkitektur och landsbygdshistoria är kyrkan värd ett besök.',
      'Cykling passar Ljusterös relativt plana terräng och nätverket av mindre vägar och stigar. Ön kan utforskas med cykel utan betydande klattrande, och kombinationen av jordbrukslandvyer, skogsavsnitt och kustnärma delar skapar varierande sceneri. Cykeluthyrning finns under sommarsäsongen.',
      'Fiske från Ljusterös strandlinjer och de omgivande vattnen är produktivt för abborre, gädda och havsöring beroende på säsong. Ön har ett antal bra fiskeplatser tillgängliga från kusten och eventuella insjöar i det inre adderar sötvattenalternativ. Fiske utan båt är praktiskt här på ett sätt som det inte är på mindre eller mer klippkantade öar.',
      'Waxholmsbåtrutten till Ljusterö från Stockholm körs vid sidan av bilfärjeförbindelsen, vilket ger en ö-båt-infartsväg för dem som reser från staden utan bil. Båtresan tar ungefär två timmar genom den norra skärgården.',
      'Vad Ljusterö erbjuder som många skärgårdsöar inte gör är en genuin känsla av ett fungerande lantligt samhälle. Jordbruksmarken brukas, kyrkan är aktiv, skolan är öppen. Den turism som finns sitter bredvid detta samhälle snarare än att ersätta det, vilket ger ön en annan autenticitets-kvalitet än destinationer där turismen är den primära ekonomiska aktiviteten.',
      'På våren är Ljusterö särskilt bra för fågelskådning. Kombinationen av skog, jordbruksmark och kustnära biotoper lockar ett brett arturval under migrationsperioden. Jordbruksmarkerna kan i synnerhet hysa bra koncentrationer av fåglar som passerar igenom.',
      'Sensommaren, perioden från sent juli genom september, tenderar att vara den mest givande tiden att besöka Ljusterö. Sommarskarorna på de mest populära öarna har tunnats ut, vegetationen är på sin fullaste och vattnet i de skyddade vikarna är fortfarande tillräckligt varmt för bad.',
      'Norr om Ljusterö finns möjligheter att utforska den mer avlägsna nordligare skärgården i Roslagen. Ön fungerar som ett naturligt språngbräde för den som vill utöka sin skärgårdsutforskning norrut. Kombinationen av tillgänglig bilfärjeförbindelse till Ljusterö och lokala båtförbindelser vidare norrut gör det logistiskt möjligt att planera en mer ambitiös tur.',
      'Kommunikationssystemet runt Ljusterö är mer flexibelt än för de flesta ytterskärgårdsöar. Bilfärjan, Waxholmsbåten och de lokala taxibåtarna som kör i området skapar ett system med flera alternativa ingångsvinklar. Den flexibiliteten minskar det planeringstryck som många upplever med mer isolerade skärgårdsöar.',
      'Det specifika med Ljusterö i jämförelse med de flesta skärgårdsöar är kombinationen av storlek och tillgänglighet. Ön är tillräckligt stor för att erbjuda genuint varierad naturupplevelse men tillräckligt nåbar för att fungera som ett praktiskt mål. Den kombinationen är ovanligare än man kan tro i Stockholms skärgårdssystem.',
      'Ljusterö har också en funktion som förklaring för stockholmare som undrar hur det faktiskt fungerar att bo i skärgården under vinterhalvåret. Öns permanenta population, med sin skola, sina butiker och sin vardag bortom sommarsäsongen, är ett levande svar på den frågan.',
    ],
    facts: {
      travel_time: '~1 tim från Danderyds sjukhus (buss 626 + bilfärja Ljusteröleden)',
      character: 'Bred och mångfacetterad, bilfärja, cykling',
      season: 'April–Oktober',
      best_for: 'Cykling, kajakpaddling, bilburna besökare, naturupplevelse',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Välcyklade kustvägar på en av skärgårdens tillgängligaste öar — bilfärja med täta avgångar från Ljusteröfärjan. Cykla norrut mot Linanäs, ca 15–20 km tur-retur. Hela ön runt: ca 96 km asfalt med 1 000 m stigning.' },
      { icon: '🛶', name: 'Kajak', desc: 'Klintsundet och den norra kustlinjen är utmärkta paddlingvatten.' },
      { icon: '🏊', name: 'Bad', desc: 'Flera badplatser, varav Linanäsbryggan är mest känd.' },
      { icon: '⛽', name: 'Sjömack', desc: 'Klintan har sjömack — ett av skärgårdens välplacerade bränslestopp.' },
    ],
    accommodation: [
      { name: 'Stugor & B&B', type: 'Stugor', desc: 'Flera privata uthyrare längs öns vägar. Sök online.' },
    ],
    getting_there: [
      // KÄLLA: SL:s tidtabell linje 626 Danderyds sjukhus–Ljusterö (giltig dec 2025–juni 2026); linje 621 går Åkersberga–Norrtälje. Färjan avgiftsfri enligt Trafikverket (Ljusteröleden).
      { method: 'Buss + Bilfärja', from: 'Danderyds sjukhus', time: '60 min', desc: 'Buss 626 från Danderyds sjukhus till Östanå färjeläge, sedan avgiftsfri bilfärja Östanå–Ljusterö (7 min). Samma linje fortsätter ut på ön.', icon: '🚌' },
      { method: 'Bil + Färja', from: 'Stockholm', time: '50 min', desc: 'Kör till Östanå färjeläge norr om Åkersberga, ta avgiftsfri bilfärja över till Ljusterö (Ljusteröleden, ca 7 min).', icon: '🚗' },
      { method: 'Waxholmsbåt', from: 'Strömkajen / Vaxholm', time: 'Varierar', desc: 'Skärgårdsbåtar trafikerar bryggor som Linanäs, Grundvik, Åsättra m.fl.', icon: '⛴' },
    ],
    harbors: [
      // KÄLLA: klintsundetmarina.se — marina, sjömack, lanthandel, café och gästhamn vid Klintsundet ("Klintan Sjöstation" fanns inte under det namnet).
      { name: 'Klintsundet Marina', desc: 'Marina med sjömack, lanthandel, café och gästhamn vid Klintsundet.', fuel: true, service: ['el', 'vatten', 'bränsle', 'gästhamn'] },
      { name: 'Linanäsbryggan', desc: 'Naturskönt läge, populärt ankare.', fuel: false },
    ],
    restaurants: [
      // KÄLLA: linanasbryggan.se/meny — varmrätter 255–285 kr (2026), öppet dagligen 11–21.
      { name: 'Linanäsbryggan', type: 'Restaurang', desc: 'Klassisk brygga med mat och utsikt.', price_example: 'Varmrätter ca 255–285 kr (2026)', open_season: 'Juni–Augusti', open_hours: '11–21' },
      // KÄLLA: klintsundetmarina.se — café, lanthandel, sjömack och kajakuthyrning; öppet alla dagar 10–18 juni–augusti. Kajak från 370 kr/halvdag (2026).
      { name: 'Klintsundet Marina', type: 'Service/Café', desc: 'Sjömack, lanthandel och café vid Klintsundet — hyr även ut kajaker.', slug: 'klintan-sjostation', price_example: 'Kajak från 370 kr/halvdag (2026)', open_season: 'Juni–Augusti', open_hours: '10–18' },
      // KÄLLA: explorearchipelago.com (Fnaych Pizzabagaren KB, Långsjöängen 20) — öppet dagligen 10–20; priser publiceras inte, därför ingen siffra.
      { name: 'Pizzeria Ljusterö', type: 'Restaurang', desc: 'Lokalbefolkningens val — avslappnat och bra. Pizza, kebab och hamburgare.', slug: 'pizzeria-ljustero', price_example: 'Aktuella priser anslås på plats', open_season: 'Helår', open_hours: 'Mån–Sön 10–20' },
    ],
    day_cost: {
      budget_per_person: '150–420 kr',
      includes: 'Avgiftsfri bilfärja, lunch eller pizza, kaffe vid Klintsundet',
      breakdown: [
        // KÄLLA: SL:s tidtabell linje 626 Danderyds sjukhus–Ljusterö + Trafikverket, Ljusteröleden avgiftsfri (hämtad 2026-08-24)
        { item: 'Buss 626 från Danderyds sjukhus (SL-kort)', price: '0 kr' },
        { item: 'Bilfärja Östanå–Ljusterö (avgiftsfri)', price: '0 kr' },
        // KÄLLA: linanasbryggan.se/meny-4 — varmrätter 255–285 kr (hämtad 2026-08-24)
        { item: 'Lunch Linanäsbryggan', price: '255–285 kr (2026)' },
        // KÄLLA: restaurangljusterotorget.se/meny — pizza 99–145 kr (hämtad 2026-08-24)
        { item: 'Alternativ: pizza, Restaurang Torget vid Ljusterö torg', price: '99–145 kr (2026)' },
        // UPPSKATTNING: cafépriser publiceras inte av klintsundetmarina.se, normalt caféspann (2026-08)
        { item: 'Kaffe + bulle, Klintsundets café', price: '55–70 kr' },
        // KÄLLA: klintsundetmarina.se — enmanskajak 370 kr halvdag, 530 kr heldag (hämtad 2026-08-24)
        { item: 'Kajakhyra Klintsundet Marina (halvdag)', price: 'från 370 kr (2026)' },
      ],
      tips: [
        'Ljusterö är en av de billigaste öarna att nå — avgiftsfri bilfärja och SL-buss.',
        'Hyr kajak vid Klintsundet Marina eller ta buss 626 som fortsätter ut på ön mot Linanäs.',
        'Pizzerian är öppen helår — bra val för besök utanför turistsäsongen.',
      ],
    },
    tips: [
      'Hyr cykel vid färjeläget och kör norrut längs kusten mot Linanäs.',
      'Klintan är ett utmärkt bränslestopp på väg mot norra skärgården.',
      'Åsättra sommarkiosk längs vägen säljer glass och kaffe — enkel glädje.',
    ],
    related: ['finnhamn', 'ingmarso', 'blido'],
    tags: ['cykling', 'kajak', 'bilfärja', 'kustlinje', 'familj'],
    did_you_know: 'Ljusterö är den största ön i Stockholms skärgård som saknar fast brobindelse — i stället går avgiftsfria bilfärjan Ljusteröleden mellan Östanå och Ljusterö hela året, ca 7 minuter över sundet.',
    insiderTips: [
      'Ljusterö nås med bilfärja från Östanå. Färjan tar ungefär 7 minuter och går regelbundet hela dagen.',
      'Ön är en av de stora öarna i norra skärgården och har vägar som gör det möjligt att köra bil över stora delar av ön.',
      'Det finns en ICA-butik, skola och bensinstation på Ljusterö, en av de mer självförsörjande öarna i norra skärgården.',
      'Ljusterö och trakterna runt Östanå är kända för goda förutsättningar för fågelskådning, särskilt under fågelsträcket på vår och höst.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: cykellederna är tomma och kajakpaddlingen är fantastisk. September: lummig höstfärg, badbar sjö och inga köer till Klintan.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
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
      'Dalarö är södra skärgårdens naturliga utgångspunkt och en av de mest betydelsefulla platserna i svensk sjöfartshistoria. 1636 blev Dalarö "stora sjötullen", det vill säga landets viktigaste tullstation, där all sjöburen handel in till Stockholm skulle deklareras och förtullas. Den rollen behöll orten i drygt 200 år.',
      'Dalarö skans påbörjades 1656, under Karl X Gustavs tid, för att skydda de tullavgiftsbärande handelsfartygen som låg i hamn. Erik Dahlbergh inspekterade anläggningen 1683 och fann den förfallen — efter hans ritningar byggdes skansen om 1698–1724. Skansen togs ur rikets fasta försvar 1854 och är sedan 1935 statligt byggnadsminne.',
      'Dalarö nås med bil på 45 minuter från Stockholm eller med kollektivtrafik. Det gör orten unik bland södra destinationerna. Man behöver inte ta båt för att komma hit. Från Dalarö hamn avgår sedan båtar mot Utö och de omgivande öarna. Hamnlivet är aktivt sommartid med seglare, motorbåtar och sommargäster, och bebyggelsen längs kajen är präglad av 1800-talets sjökaptens- och tjänstemannavillor.',
      'Promenaden längs kajen i Dalarö är en av södra skärgårdens trevligaste. Trävillorna med sina snidade veranda-detaljer, de välskötta trädgårdarna med rabatter ned mot vattnet och de gamla sjöbodarna berättar om en tid när Dalarö var en av landets viktigaste platser för utrikeshandel. Skansen i söder är liten men välbevarad, en av få 1600-talsbefästningar i regionen som fortfarande är tillgänglig för besökare.',
      'Baggensfjärden norr om Dalarö är ett av de bästa kajakvattnen i södra skärgården. Den slingrar sig in mot fastlandet som ett labyrinth av sund och vikar, och vattnet är tillräckligt skyddat för nybörjare men tillräckligt varierat för att hålla erfarna paddlare engagerade i flera dagar. Bra startpunkt för längre kajakresor söderut.',
      'Dalarö passar den som vill ha södra skärgårdens karaktär utan att spendera en heldag på båten. Orten är enkel att nå, välskött och har tillräckligt med historia för att en dag ska kännas välspenderad. Kombinera med en tur ut till Utö om man vill ha mer. Det är en av de naturligaste kombinationerna i södra skärgården.',
      'Dalarö är ett historiskt samhälle vid den södra Stockholmsskärgårdens kust, beläget vid en punkt där land och vatten sammanflätas tätt. Till skillnad från de flesta skärgårdsmål som bara nås med båt är Dalarö tillgängligt med bil, en praktisk skillnad som gör att det fungerar som ett gateway-samhälle för de omgivande öarna lika mycket som ett eget mål. Körvägen genom Haninge-landskapet övergår gradvis i den vatomgivna atmosfären av den yttre skärgården.',
      'Dalarö Skans, en 1600-talskustfästning byggd för att försvara Stockholms södra sjöfartsvägar, är den primära historiska sevärdheten. Fästningen härstammar från 1640-talet och ingick i ett bredare system av kustbefästningar uppförda under perioden av svensk stormaktsambition. Ruinerna och bevarade strukturer erbjuder en genomgång av militärarkitekturhistoria i skärgårdsmiljö.',
      'Dalarö har länge varit ett centrum för fritidsbåtliv. Flera marinor betjänar båtgemenskapen med faciliteter för besökande seglare och motorbåtister från de omgivande vattnen. Hamnfronten under sommaren har den aktiva, praktiska atmosfären hos en fungerande båtgemenskap. Båtar kommer och går, utrustningsaffärer, varv och det sociala livet hos folk som tillbringar sina somrar på vattnet.',
      'Restaurangerna i Dalarö är inriktade mot besökare som anländer med båt och med bil. Flera etablissemang med hamn- eller vattenvy är verksamma under sommaren och en del upprätthåller reducerad service genom vintern. Maten lutar mot klassisk svensk maritim mat: sill, lax och säsongsbetonade svenska rätter i miljöer som använder sig av vattennärheten.',
      'Badmöjligheterna i Dalarö är goda. Samhället sitter på klipphällar med lugnt, skyddat vatten i flera riktningar. Vattentemperaturen i de skyddade södra vikarna når bekväma nivåer under högsommaren. Kombinationen av bilaccess, bad och en avslappnad hamnatmosfär gör Dalarö till ett praktiskt val för sommardagar utan omfattande planering.',
      'Båtgemenskapen ger Dalarö en specifik social karaktär under sommaren. Segling och motorbåtning är centrala för den lokala fritidskulturen och hamnfronten på helger speglar detta med en koncentration av båtägare och entusiaster. För dem som delar detta intresse har Dalarö en insiderkaraktär som rena turistdestinationer saknar.',
      'Dalarö fungerar också som praktisk bas för att nå den yttre södra skärgården. Båtförbindelser och vattentaxi-tjänster härifrån når öar längre ut som inte har direkta Stockholmsförbindelser. Denna hubbfunktion tillför praktiskt värde för besökare som planerar mer omfattande skärgårdsresor.',
      'Vinterstämningen i Dalarö är lugnare men samhället upprätthåller helårsfunktion. Den lokala befolkningen, skolan och de grundläggande tjänsterna hos ett fastlandsanslutet samhälle fortsätter under de kalla månaderna. Ett vinterbesök visar Dalarös mer vardagliga karaktär: båtarna i förvaring, hamnen tystare och fokus skiftat från fritid till lokalt liv.',
      'Från Dalarö ramar utsikten mot ytterskärgården in öarna Nåttarö, Ornö och de södra kedjorna på ett sätt som gör skalan av Stockholms skärgårdssystem synlig. På en klar dag rymmer horisonten flera ö-silhuetter. Denna specifika utsikt, att blicka utåt från en gateway-punkt, är en av Dalarös underutnyttjade attraktioner.',
      'För dagsbesökare från Stockholm erbjuder Dalarö en enkel kombination: kör ner, promenera kring Skans-ruinerna, bada, ät lunch och kör hem, allt inom en bekväm dag. Bilaccess gör detta möjligt på ett sätt som rent båt-bara skärgårdsdestinationer inte kan matcha. Det är inte den mest avlägsna eller dramatiska destinationen, men det är en av de mest praktiskt användbara.',
      'I skärgårdssammanhang är Dalarö ovanligt lätt att kombinera med andra aktiviteter under samma dag. En morgon i Stockholm, lunch i Dalarö med bad och en promenad kring Skansen, och hemresa till middag på samma dag är en fullt rimlig plan utan att det känns stressigt. Den kombinerbarheten är sällsynt.',
      'Dalarö demonstrerar en viktig punkt om det svenska skärgårdssystemet: det handlar inte bara om öar nåbara med Waxholmsbåten. De landbaserade infartsplatserna vid Dalarö, Nynäshamn, Stavsnäs och Vaxholm är lika viktiga som Strömkajen. De är portarna mot var sin del av skärgården och Dalarö är södra korridorens tydligaste.',
    
    
    
    ],
    facts: {
      // KÄLLA: SL buss 869 Slakthuset(Globen)–Dalarö ~47 min; med t-baneanslutning ~60 min. Tidigare '90 min' överskattade snabbaste vägen.
      travel_time: '45 min med bil / ~60 min koll (buss 869 från Slakthuset)',
      character: 'Historisk hamnort, utgångspunkt, välskött',
      season: 'April–Oktober',
      best_for: 'Dagsturer, hamnliv, utgångspunkt mot Utö och södern',
    },
    facts_provenance: { travel_time: 'matt' },
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
      { method: 'Pendeltåg + Buss', from: 'Stockholm Central', time: '90 min', desc: 'Pendeltåg till Handen, sedan buss 839 till Dalarö. Buss 869 går också från Slakthuset vid Globen.', icon: '🚌' },
    ],
    harbors: [
      { name: 'Dalarö Gästhamn', desc: 'Välskött hamn med full service. Bra utgångspunkt för vidare segling söderut.', fuel: false, service: ['el', 'vatten', 'dusch', 'toilet'] },
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
    insiderTips: [
      'Dalarö nås med bil via väg 73 och är tekniskt sett en halvö med vägförbindelse till fastlandet.',
      'Tullhuset i Dalarö från 1788 är ett av de bäst bevarade tullhusen längs Östersjökusten. Alla fartyg som passerade mot Stockholm var tvungna att förtullas här.',
      'Dalarö är ett känt mål för sportdykare med flera intressanta vrakplatser i närheten.',
      'Gästhamnen i Dalarö är en av de mer välservade i södra skärgården med dusch, el och servicebyggnad.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Dalarö är tillgängligt med bil hela året men turistlivet blommar juni–september. September ger historisk stämning utan folkmassor och gästhamnen är på topp utan köer.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
    activity_meta: {
      bad: {
        beaches: [
          {
            name: 'Klippbadet vid Skansen',
            type: 'klippbad',
            desc: 'Välskyddade klipphällar på södra sidan av Dalarö, strax söder om Dalarö Skans. Lugnt, klart vatten med lätt instegsplats. En av södra skärgårdens mest lättillgängliga klippbadsplatser — man tar bilen hit.',
            child_friendly: true,
            depth: 'Grunt vid klippkanten, djupare mot mitten av viken.',
            directions: 'Kör eller gå längs kajen söderut förbi Dalarö Värdshus, följ stigen mot Skansen ca 10 min. Parkering vid hamnen.',
            insider_tip: 'Kom dit på en tisdag i juli — på helger konkurrerar stockholmarna med bilarna om varje kvadratmeter.',
          },
          {
            name: 'Klippbad vid Baggensfjärden',
            type: 'klippbad',
            desc: 'Skyddade klippor längs Baggensfjärdens kant, norr om samhället. Vattnet är lugnare och varmare än på öppen sida — bra för längre bad. Kajakentusiasterna startar sina turer härifrån.',
            depth: 'Varierar, generellt 1–3 m vid hällarna.',
            directions: 'Kör norrut från Dalarö centrum mot Ingarö. Kolla skyltar "Baggensfjärden bad" längs vägen.',
            insider_tip: 'Baggensfjärden värms upp snabbt i juli — vattnet kan ligga på 22°C. Kombinera med kajak om du hyr en i hamnen.',
          },
        ],
      },
    },
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
      'Arholma är nästan längst norrut man kan komma i Stockholms skärgård. Dit åker man med en intention. Man är inte på väg förbi. Ön är vild, öppen och vidsträckt med starka vindar och havsutsikt som tar andan ur en.',
      'Arholma sjömack och krog är samlingsplatsen för seglare på väg norrut eller sydöst. Ön är en klassisk stopplats på Roslagsbåtarnas linjer och har haft fast befolkning sedan urminnes tider.',
      'Naturen är extrem på ett positivt sätt: klippor som möter öppet hav, ingen annan ö att skymma vyn österut. Det är norra skärgårdens Landsort.',
      'Resan dit är en del av upplevelsen. Waxholmsbåten från Norrtälje tar sig norrut längs kusten under tre och en halv timme, passerar öar som glest befolkas och hamnar som sällan ser turister. När man väl kliver av vid Arholmas brygga är man mentalt borta från vardagen på ett sätt som kortare öresor sällan ger.',
      'Fyren på öns norra udde är ett av norra skärgårdens mest fotogena motiv. Den gamla lotsstationen bredvid är välbevarad och vittnar om en tid när Arholma var ett viktigt navigationsmärke för fartyg på väg in mot Stockholm. Klipporna runt fyren är flacka och lätta att nå, en naturlig plats att sitta och se fartyg gå förbi mot horisonten.',
      'Arholma är en seglarö i grunden. Gästhamnen på öns södra sida är välskyddad och välutrustad med bränsle och service. Värdshuset och sjömacken är samlingspunkterna. Det är inte ovanligt att träffa seglare som rest norrut ända från Gotland eller Åland och väljer just Arholma som sista stopp innan de vänder mot Stockholm.',
      'Det är inte för alla, och det är precis vad som gör det rätt för dem det är för. Väljer man Arholma vet man att man vill ha det vilda, det avlägsna och det äkta. Den övertygelsen belönas.',
      'Arholma intar ett extremläge i Stockholms skärgård. Det är den nordligaste bebodda ön med reguljär Waxholmsbåtsservice och sitter vid gränsen där skärgården övergår till öppet hav. Det läget definierar allt: klipporna är lägre, vegetationen glesare, vinden starkare och horisonten vidare än någonstans i de mer skyddade delarna av systemet.',
      'Waxholmsbåtresan från Stockholm till Arholma tar ungefär fyra timmar, lång för skärgårdsstandard men inte överdrivet för vad det levererar. Båtrutten passerar genom den norra skärgården, lämnar gradvis staden bakom sig när de omgivande öarna blir mer klippiga och befolkningen tunnare. När Arholma dyker upp har landskapets karaktär förändrats fullständigt.',
      'Arholma fyr är en av de historiska navigeringspunkterna i den norra skärgården. Fyren har väglett sjötrafiken genom detta kustsnitt under lång tid och fungerar nu delvis som gästhusboende. Kombinationen av historisk funktion och dramatisk havsvy gör det till ett av de mer distinkta boendealternativen i hela skärgården.',
      'Landskapet på Arholma skiljer sig från vad de flesta besökare förväntar sig av Stockholms skärgård. Trädlinjen är låg, granitklipporna mer avrundade och urholkade, och den öppna havskänslan är mycket mer påtaglig än på öar i inner- eller mellansk ärgården. Att promenera runt öns periferi för besökare från skyddade östra vikar till helt exponerade västpunkter där Östersjön sträcker sig ohindrat till horisonten.',
      'Fisket är genuint produktivt runt Arholma. Det yttre läget och blandningen av vatten från öppet hav och skärgårdssystem skapar goda förhållanden för havsöring, torsk och makrill vid olika tider på året. Lokala fiskebåtar är fortfarande verksamma från ön, och fisketraditionen här har en kontinuitet sällan funnen i mer turistpräglade destinationer.',
      'Den permanenta gemenskapen på Arholma är liten, ett fåtal tiotal boende året runt, och ön har känslan av en plats som bebotts och brukats under lång tid. Gamla båtskjul, närtorkningsstationer och den praktiska arkitekturen hos ett fiskesamhälle sitter sida vid sida med de få sommarverksamheterna. Denna lagerning av arbetshistoria och nutida användning ger Arholma en historisk textur som rent säsongsbetonade gemenskaper saknar.',
      'Arholma passar en specifik typ av besökare: en som specifikt vill ha ett avlägset, exponerat och genuint ytterskärgårdsintryck, som är bekväm med begränsade tjänster och som är villig att resa fyra timmar i varje led för att komma dit. Dagsutflykter är teoretiskt möjliga men ger lite tid. En övernattning, framför allt i fyren, gör ön rättvisa.',
      'Det kommersiella utbudet på Arholma är minimalt. Ett litet kafé eller restaurant är öppet under sommaren och fyrgästhuset erbjuder boende. Utöver detta tillgodoser ön inte besökare med höga förväntningar. Proviant bör tas med från Stockholm eller tas på en av de större mellanöarna under båtresan.',
      'Det norra läget ger Arholma specifika säsongskvaliteter. I början av sommaren är midnattssolseffekten mer uttalad här än i den södra skärgården: kvällarna är ljusare längre och himlen håller färg långt efter klockan 23. På hösten når stormarna ön med full kraft från öppet hav, och ön är som mest dramatisk men även mest krävande. Septemberfönstret, efter högsommaren men före höststormarna, räknas av många som den bästa besökstiden.',
      'Arholma fungerar också som inkörsport till den nordligaste delen av Roslagskusten. Båtförbindelser härifrån kan nå öar längre norrut som inte är direkt tillgängliga från Stockholm. För dem som bygger mer ambitiösa skärgårdsitinerarium är Arholma mindre ett slutmål och mer en vändpunkt.',
      'Arholma Värdshus är sommarens samlingspunkt på ön. Enkelt och platsanpassat, det erbjuder mat och dryck i en miljö som ser ut över hamnen. Det är inte stans finaste matkrog, men dess funktion som gemenskapens centrum för de som anländer till Arholma ger det en dignitet utöver menyn.',
      'Arholma är en av de öar som kräver ett medvetet beslut att besöka. Det ger den en specifik grupp av besökare: folk som verkligen vill dit, som planerat resan och som sätter värde på vad avlägsenheten ger. Den selektionen märks i stämningen vid bryggan. Ingen hamnar på Arholma av misstag.',
      'Ljuset vid Arholma på sensommarkvällar, det specifika ljuset från ett hav utan hinder mot horisonten, är en av de naturupplevelser som är svåra att förutse men enkla att minnas. Det är den typen av sak man berättar om när man söker förklara varför man reste fyra timmar för att vara på en klippa i Östersjön.',
    
    
    
    ],
    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — buss 636 Norrtälje busstation
      // 10:19 → Simpnäs brygga 11:32, sedan färja 30 till Arholma 11:55. Totalt
      // 1 tim 36 min. Stod tidigare "3,5–4 h med Waxholmsbåt från Norrtälje",
      // vilket var fel om BÅDE tiden och färdsättet: det går ingen båt från
      // Norrtälje, man tar buss till Simpnäs och en kort färja därifrån.
      travel_time: '1 tim 36 min: buss till Simpnäs från Norrtälje, sedan färja',
      character: 'Vilt, orört, ytterst, äventyrligt',
      season: 'Maj–September',
      best_for: 'Äventyrliga seglare, naturälskare, de som söker ensamt',
    },
    activities: [
      { icon: '⛵', name: 'Segling', desc: 'Arholma är ett klassiskt mål och genomfart på längre seglingsresor norrut.' },
      { icon: '🌅', name: 'Naturupplevelse', desc: 'Klippor mot öppet hav, lång horisont och inga grannar. Sällan uppnådd natur.' },
      // KÄLLA: https://arholmahandel.se/cykeluthyrning/ (hämtad 2026-08-06)
      { icon: '🚲', name: 'Cykling', desc: 'Arholma Handel hyr ut cyklar: 100 kr halvdag (4 h), 150 kr heldag (8 h), 200 kr per dygn. Hämtas direkt på bryggan — boka i förväg, trycket är högt. Kort, avkopplande tur till Arholma Båk och fyren längs öns grusvägar.' },
    ],
    accommodation: [
      { name: 'Arholma Handel Stugor', type: 'Stugor', desc: 'Enkla stugor uthyrda av handelsboden.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Norrtälje', time: '3,5 h', desc: 'Lång men vacker resa norrut längs Roslagen.', icon: '⛴' },
      { method: 'Bil + passagerarfärja', from: 'Stockholm via Simpnäs', time: '2,5 h', desc: 'Kör till Simpnäs (på Björkö, norra Roslagen) — ca 90 min — sedan passagerarfärja Simpnäs–Arholma (ca 15 min, ingen bilfärja).', icon: '🚗' },
    ],
    harbors: [
      { name: 'Arholma Gästhamn', desc: 'Välskyddad hamn på öns södra sida. Bränsle och viss service.', fuel: true, service: ['el', 'vatten', 'bränsle'] },
    ],
    restaurants: [
      { name: 'Arholma Dansbana & Krog', type: 'Restaurang', desc: 'Öns krog och samlingspunkt. Enkel mat och sommarnöje.', slug: 'arholma-dansbana-krog' },
      { name: 'Arholma Hamnkrog', type: 'Restaurang', desc: 'Hamnkrogen för seglare vid gästhamnen.' },
    ],
    tips: [
      'Planera resan i förväg — Arholma är inget man bara åker till på en dag utan planering.',
      'Vädret kan vara hårt — kolla prognosen noggrant om du tar ut en liten båt.',
      'Arholma Handel är öns livlina — de säljer allt du behöver för segling och övernattning.',
    ],
    related: ['blido', 'furusund', 'norrora'],
    tags: ['ytterst', 'orört', 'norra', 'vilt', 'segling'],
    did_you_know: 'Arholma omtalas i skriftliga handlingar redan 1547 (Gustav Vasas räkenskaper). Lotshemmanen organiserades formellt 1724 då Amiralitetskollegiet antog sex bönder till arholmalotsar. Ön har ingen bilfärja — endast passbåten M/S Monsun från Simpnäs på fastlandet, ca 15 minuter över sundet, året runt.',
    insiderTips: [
      'Arholma är en av de nordligaste bebodda öarna i Stockholms skärgård och nås med M/S Monsun från Simpnäs.',
      'Den gamla lotsstationen på Arholma var aktiv under lång tid. Lotsar var stationerade här för att guida fartyg genom de norra skärgårdspassagerna.',
      // KÄLLA: Länsstyrelsen Stockholm, naturreservatet Arholma-Idö (läst 2026-08-23)
      'Arholma ligger i naturreservatet Arholma-Idö, med vandringsstigar som leder ut till klippor med utsikt mot öppet hav mot norr.',
      'Sommarsäsongen är kortare på Arholma än på öar längre söderut. Caféet och hamnen är öppna ungefär juni till mitten av september.',
    ],
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juli',
      bestReason: 'Längst ut i norra skärgården med råaste naturen — i juli är caféet öppet, hamnen välkomnar och havsörnarna cirkulerar fortfarande.',
      warning: 'Säsongen är kort. Café och hamn stänger i mitten av september. Kolla tidtabellen — Arholma kräver lång restid och planering.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
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
      // KÄLLA: Länsstyrelsen Stockholm 2024-10-02 — nytt naturreservat "Norra skogen" på Ornö
      // (Haninge kommun) bildat 2024. Skyddet UTÖKADES alltså; formuleringen "stora delar
      // skyddas" är fortsatt korrekt. Kontrollerad 2026-08-21.
      'Ornö är en av Stockholms skärgårds största öar och en av de mest naturrika. Stora delar av ön skyddas som naturreservat med gammal skog, bäckar och ett rikt fågelliv. Befolkningen är liten men permanent, och ön har behållit sin lantliga karaktär.',
      'Till skillnad från de mer turistifierade öarna i mellersta skärgården har Ornö ett lite tystare tempo. Här åker man för naturens skull, inte för nöjeslivet. Vandringsstigarna är välmarkerade och tar dig genom skog och längs kustlinje.',
      'Kyrkviken är öns naturliga samlingsplats med krog och hamn. Från Ornö är Utö och Nåttarö enkla dagsutflykter med båt.',
      'Ornö är en av södra skärgårdens bäst bevarade hemligheter. Bilfärjan från Dalarö tar trettio minuter och tar med sig bilar, cyklar och fotgängare, det gör ön tillgänglig på ett sätt som de yttre öarna aldrig kan bli. Ändå är det få som åker hit, vilket innebär att vandringsstigarna sällan är fullsatta och naturreservaten kan upplevas i relativ ensamhet.',
      'Skogen på Ornö är gammal och tät på ett sätt man sällan ser i Stockholmstrakten. Gammelgranar och björkar bildar ett tak över de smala stigarna, och om man är tyst kan man höra korsnäbb och stjärtmes i kronorna. Reservatets bäckar är klara och kalla, och på rätt ställen kan man se öring stå still i strömmen.',
      'Ornö kyrka från 1200-talet är liten och enkel, men läget på en höjd med utsikt över fjärden gör den till en av skärgårdens mer stämningsfulla. Sommargudstjänsterna samlar en blandning av bofasta och sommargäster och har en genuinitet som de mer besökta öarnas service sällan matchar.',
      'Väljer man Ornö väljer man att ta skärgården på allvar. Det är en ö för dem som förstår att det bästa ofta inte skyltas med turistbroschyrer.',
      'Ornö är en stor ö i den södra Stockholmsskärgården. Stor är det operativa ordet: ön sträcker sig över en betydande yta, vilket ger den kapaciteten för varierat landskap, flera samhällen och en mångfald av upplevelser ovanlig hos mindre öar. Det finns inga vägbroar till Ornö, den enda tillgången är med båt, vilket bevarar öns separerade karaktär trots dess storlek.',
      'Öns samhällen är fördelade över ön, med huvudhamnen typiskt tjänstgörande som primär ankomstpunkt. Ornö kyrka är en av de märkvärdiga historiska byggnaderna i den södra skärgården och upptar ett läge som kombinerar utsikt över vattnet med det typiska svenska landsortskyrkolandskapet.',
      'Cykling är det föredragna sättet att utforska Ornös längd. Stigarna och de mindre vägarna är relativt plana i öns centrala delar, vilket gör cykling tillgängligt för de flesta besökare. En fullständig runda eller en nord-till-söd-rutt kan ta en hel dag med stopp. Cykeluthyrning finns vid huvudhamnen under sommaren.',
      'Öns skogar är tätare och större än de på många mindre öar. Att promenera i Ornös inre känns mer som en fastlandsskogspromenad än typisk klippig-skärgårds-natur: träden är högre, undervegetationen rikare och inslutningskänslan mer fullständig. Den skogkaraktären kombineras med kustnära avsnitt för en varierad landskapsupplevelse inom en ö.',
      'Ornö är mindre besökt än grannöarna Utö eller de centrala skärgårdsöarna, vilket ger det en lugnare atmosfär under högsäsong. Turistinfrastrukturen är mer blygsam, färre restauranger, färre kommersiella attraktioner, men naturkvaliteten är lika hög. Besökare som specifikt söker stillhet och äkta yttre-södra skärgårdskaraktär finner Ornö ett av de bättre valen.',
      'Vattnet runt Ornös södra och östra kuster är det renare, mer öppna Östersjö-påverkade vattnet från ytterskärgården. Bad från klipphällar är bra på flera ställen runt ön. Vattentemperaturen i juli och tidigt augusti når det område där bad är bekvämt för de flesta.',
      'Fisket runt Ornö är produktivt. Öns läge i den södra skärgården, kombinerat med djupet och kvaliteten på det omgivande vattnet, gör det bra för havsöring och abborre. Fisketraditionen här har historiskt djup, samhällena på Ornö och de omgivande öarna var fiskesamhällen i sekler innan turismen ankom.',
      'Båtförbindelser till Ornö från Stockholm körs med Waxholmsbåt. Restider varierar beroende på avgångspunkt och rutt men tar typiskt två till tre timmar från centrala Stockholm. Dagsutflykter är möjliga men knappa. Öns storlek innebär att se en meningsfull del av den kräver det mesta av en dag.',
      'Den permanenta befolkningen ger Ornö en helårskaraktär bortom vad rent säsongsbetonade öar kan erbjuda. Ett litet lokalt samhälle upprätthåller öns infrastruktur under vintern. Vissa grundläggande tjänster är i drift under hela året, men den fulla sommarsäsongsöppningen är koncentrerad mellan juni och september.',
      'Ornö belönar besökare som anländer utan specifika förväntningar och helt enkelt utforskar. Kombinationen av skog, kust, historisk kyrka, samhällsliv och genuint ytterskärgårdsläge skapar en hel dags innehåll för dem som vandrar eller cyklar systematiskt. Det är inte en ändamålsinriktad ö utan en varierad, vilket är dess specifika styrka.',
      'Brevikshamnens läge på Ornös södra sida ger en annan ingång till ön än huvudhamnen och ett annorlunda perspektiv på öns landskap. Besökare som cirkulerar runt ön under sin vistelse och kombinerar de två hamnarna som orienteingspunkter får en bättre förståelse för öns geografiska skala.',
      'Ornö har spelat en roll som inspirationsmiljö för svenska konstnärer och fotografer under det tidiga 1900-talet, en tradition som hänger ihop med den specifika ljuskvaliteten i den södra skärgården och öns relativa avskildhet. Den historien är inte lika känd som öns naturgeografi men ger ytterligare ett skäl att ta ön seriöst som besöksmål.',
      'Det södra skärgårdsljuset på Ornö under hösten är något seglare och friluftsfolk specifikt talar om. Vinkeln och kvaliteten på oktoberljuset när det träffar havsytorna runt öns södra uddar ger en visuell upplevelse som sommargästerna sällan ser.',
      'Ornö är ett av de tydligaste exemplen på att skärgårdens mest givande upplevelser inte alltid finns på de mest kända öarna. Att hitta Ornö, planera resan dit och ta sig ut är en aktiv handling som belönas med en ö som ger tillbaka mer än förväntat.',
    
    
    
    ],
    facts: {
      travel_time: '~30 min med bilfärja från Dalarö',
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
      { method: 'Bilfärja', from: 'Dalarö (Hotellbryggan) → Hässelmara brygga', time: '~30 min', desc: 'Ornö Sjötrafik kör året runt och tar både bil och passagerare. Det är huvudvägen till Ornö.', icon: '⛴' },
      { method: 'Båt från Nynäshamn', from: 'Nynäshamn (sommar)', time: '~2 h', desc: 'Sommarsäsong: linje från Nynäshamn till Ornö Kyrka brygga, en avgång/dag.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Kyrkviken', desc: 'Öns huvudhamn med krog och enkla tjänster.', fuel: false },
    ],
    restaurants: [
      { name: 'Kyrkviken Bar & Bistro', type: 'Restaurang', desc: 'Öns samlingsplats. Husmanskost och sommarstämning.', slug: 'kyrkviken-bar-bistro', price_example: 'Lunch 165–225 kr, öl/vin 85–115 kr', open_season: 'Juni–Augusti', open_hours: '11–22', book_required: false },
      { name: 'Ornö Brödbod o Deli', type: 'Deli', desc: 'Bröd, lokalproducerat och enkel mat.', price_example: 'Bröd 45–75 kr, smörgås 85–115 kr, kaffe 45 kr', open_season: 'Juni–Augusti', open_hours: '08–14' },
    ],
    day_cost: {
      budget_per_person: '300–600 kr',
      includes: 'Bilfärja från Dalarö, lunch på Kyrkviken, frukost från Brödboden',
      breakdown: [
        { item: 'Pendeltåg + buss till Dalarö', price: '~50 kr (SL)' },
        { item: 'Ornö Sjötrafik bilfärja t/r (passagerare)', price: '~120 kr' },
        { item: 'Lunch Kyrkviken Bar & Bistro', price: '165–225 kr' },
        { item: 'Frukost Brödboden (bröd + kaffe)', price: '65–85 kr' },
        { item: 'Proviant medhavt', price: '50–100 kr' },
      ],
      tips: [
        'Ornö Sjötrafik tar bil — kom med cykel och utforska öns vägar.',
        'Brödboden öppnar tidigt — perfekt frukost före vandringen i naturreservatet.',
        'Kombinera Ornö med Utö (tar båt mellan öarna) för ett naturupplevelse-fokuserat veckoslut.',
      ],
    },
    tips: [
      'Vandringen i naturreservatet i öns centrala del är bättre än man förväntar sig.',
      'Ta med matkasse — utbudet av restauranger är begränsat.',
      'Kombination med Utö fungerar bra — ta dagen på Ornö och kvällen på Utö.',
    ],
    related: ['uto', 'nattaro', 'dalaro'],
    tags: ['natur', 'vandring', 'skog', 'fåglar', 'lugnt'],
    did_you_know: 'Ornö är en av Stockholms läns till ytan största öar utan fast vägförbindelse. Postbåten kör än idag tre gånger i veckan.',
    insiderTips: [
      'Ornö är en av Stockholms läns största öar utan fast vägförbindelse till fastlandet.',
      'Postbåten till Ornö kör regelbundet och räknas som en av de sista aktiva postbåtsrutterna i Stockholms skärgård.',
      'Ornö södra del erbjuder skyddade vikar och bra förutsättningar för kajakpaddling.',
      'Det finns lanthandel och kafé sommartid men utbudet är begränsat. Planera med matsäck om du ska ut på en heldagstur.',
    ],
    seasonal: {
      open: 'Hela året (bilfärja)',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Bilfärjan går året runt men turismen är låg utanför sommar. September ger höstfärger och total stillhet.',
      warning: 'Kafé och lanthandel kan ha begränsade öppettider utanför juli–aug. Kontrollera inför besöket.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
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
      'Landsort är Stockholms skärgårds sydligaste bebodda utpost och en av de mest dramatiska öarna. Öja (öns officiella namn) och Landsort längst söderut är omgivna av öppet hav på tre sidor, utsikterna mot Östersjön är oöverträffade.',
      'Fyren på Landsort är en av de äldsta i Sverige och är det naturliga målet för alla som besöker ön. Saltboden säljer skafferivaror och mat för de som ankrar. Det är en plats som belönar den som tar sig dit.',
      'Landsort är inte för den hastvärksresenären. Det är en destination i sig, man planerar en tur hit, inte förbi. Vattnet är öppet och vindarna kan vara kraftiga.',
      // KÄLLA: Sjöfartsverket (stentorn 1686, äldsta svenskbyggda fyrplatsen) + fyr.org (nuvarande form 1870: överdel i järn + linsapparat) (2026-08-23)
      'Fyren på Landsort är Sveriges äldsta svenskbyggda fyrplats och klassificeras som byggnadsminne. Stentornet restes i slutet av 1600-talet och fick sin nuvarande form 1870, då överdelen ersattes med en järnkonstruktion och spegelapparaten byttes mot lins. Lotsbostäderna runt fyren är välbevarade och bildar en liten by som levde av att pilota fartyg säkert in mot Stockholm. Det är enkelt att spendera en hel förmiddag i det området utan att tröttna.',
      'Ön är smal, knappt 300 meter bred på bredaste stället, men klipporna på östra sidan öppnar sig mot ett Östersjöhav utan land i sikte. På klara dagar ser man fartyg på väg mot Finland och de baltiska staterna. Det är ett av de få ställen längs Stockholms kust där man verkligen förstår att Sverige är ett sjöfartsland.',
      'Landsort är en av de klassiska destinationerna för de seglare som kallar sig seriösa. Man har inte gjort Stockholms skärgård förrän man ankar vid Öja på en sommarkväll med solen i väst och ingenting utanför relingen. Det är en rituell resa som folk gör om och om igen.',
      'För den som inte seglar krävs lite mer planering, buss och skärgårdsbåt, men det är görbart och lönar sig. Saltboden vid hamnen säljer mat och dryck och har öppet under besökssäsongen. Ta med mer proviant än du tror att du behöver.',
      'Landsort är egentligen inte en ö i strikt bemärkelse utan det namn som används för samhället på Öja, en lång smal ö vid den sydligaste bebodda punkten i Stockholms skärgård. Läget är geografiskt specifikt och historiskt betydelsefullt: fartyg som passerar in mot Stockholm eller ut i Östersjön har använt Landsort som navigeringsreferens i flera hundra år.',
      'Fyren vid Landsort, Landsorts fyr, uppfördes på 1660-talet och är en av de äldsta bevarade fyrarna i Stockholmsregionen. Originalstrukturen härstammar från den perioden, om än modifierad och förbättrad ett antal gånger sedan dess. Fyren fungerar nu som gästhusboende, i linje med mönstret hos flera historiska skärgårdsfyrar som konverterats från navigeringsinfrastruktur till besökarboende.',
      'Fågelskådningspotentialen vid Landsort är exceptionell. Den sydligaste punkten av skärgården fungerar som ett tratt-läge för fåglar som migrerar längs den svenska kusten. På hösten, i synnerhet september och oktober, kan koncentrationen av migrerande rovfåglar, vadare och tättingar vara mycket hög. Erfarna fågelskådare reser specifikt till Landsort för höstflyttningen.',
      'Vattnet runt Landsort förändrar karaktär jämfört med resten av Stockholms skärgård. Det är djupare, strömmarna starkare och den marina miljön mer besläktad med öppna Östersjön än med den skyddade innerskärgården. Det gör fisket produktivt för arter som inte förekommer i inre skärgårdsvatten.',
      'Ön har ett litet permanent samhälle, några tiotal boende under hela året, i ett kluster av hus nära fyren och den lilla hamnen. Gemenskapens skala och det avlägsna läget ger ön en känsla som är klart annorlunda än mer välbesökta destinationer. Det kommersiella utbudet är begränsat och besökare bör vara förberedda på en självförsörjande upplevelse.',
      // KÄLLA: landsortsvandrarhem.se + Waxholmsbolaget — båten går från Ankarudden på Torö (buss 852 från Nynäshamn), överfart ca 30 min, trafik året runt (2026-08-23)
      'Att ta sig till Landsort kräver planering. Den primära förbindelsen är Waxholmsbolagets båt från Ankarudden längst ut på Torö — dit tar du dig med buss 852 från Nynäshamn, som i sin tur nås med pendeltåg från Stockholm. Själva överfarten tar bara runt en halvtimme, men avgångarna är få, så kontrollera tidtabellen i förväg.',
      'Vattnet runt Landsort är bra för dykning. Kombinationen av klart vatten, djup och de relativt öppna havsförhållandena skapar intressanta undervattenmiljöer med klippväggar och varierat havsliv. Dykarorganisationer anordnar ibland turer specifikt till den här platsen.',
      'Landsort passar besökare med specifika intressen: fågelskådning, maritim historia, fiske, dykning eller helt enkelt upplevelsen av att befinna sig vid en genuint avlägsen och historiskt betydelsefull punkt. Det är inte en familjestrands-destination eller en restaurang-hoppande ö, men inom sin specifika nisch levererar det upplevelser otillgängliga på annat håll i skärgårdssystemet.',
      'Det södra läget innebär att havsvyerna här skiljer sig från alla andra punkter i skärgården. Att stå vid sydspetsen är att se öppet vatten i tre riktningar utan land synligt. På en klar dag har ljuset en specifik kvalitet, bredare och hårdare och med mer saltkant, som är den visuella motsvararigheten till ytterhavsbranten. Det är vad ytterskärgårdsbesökare i grunden söker, och Landsort levererar det så fullt som någon punkt i systemet.',
      'Lotshistorien är ett återkommande tema i Stockholms ytterskärgård, men Landsort är en av de platser där den historien är som mest konkret. Lotsar stationerade vid Landsort var ansvariga för en av de viktigaste navigationspunkterna i hela Östersjöinloppet. Det ansvaret formade samhällets karaktär och arkitektur på ett sätt som fortfarande märks i bebyggelsestrukturen.',
      'Båtförbindelserna till Landsort koordineras bäst via Waxholmsbolagets tidtabell för Ankarudden–Landsort. Att planera en tur dit kräver en halvtimmes research men resulterar typiskt i en resplan som fungerar utan problem. Det är den typen av planering som öns karaktär faktiskt belönar.',
      'Landsorts fyrs historia som aktiv navigeringspunkt i Östersjötrafiken ger platsen en dimension som går utöver vanlig skärgårdsturism. Att övernatta i fyren är att bo i ett verktyg som sjömän litat på under sekler. Det är en av de upplevelser som har en historisk tyngd som inte går att fejka.',
      'Kombinationen av biologisk mångfald och historisk närvaro gör Landsort till ett av de mer sammansatta besöksmålen i systemet. En dag här kan innehålla fågelskådning på morgonen, en promenad förbi historiska militärinstallationer på förmiddagen och ett besök i fyren på eftermiddagen. Det är täthet av innehåll ovanlig för en ö av denna storlek.',
    
    
    
    ],
    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — färja 29-1 Ankarudden 07:20 →
      // Landsort 07:50. Båtbenet är 30 min, inte "~1 h" som stod här.
      travel_time: 'Buss 852 från Nynäshamn till Ankarudden, sedan 30 min båt',
      character: 'Ytterst, dramatiskt, havsexponerat, genuint',
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
      { method: 'Buss + båt', from: 'Nynäshamn → Ankarudden (Torö) → Landsort', time: '~2 h totalt', desc: 'SL-buss 852 från Nynäshamn till Ankarudden, sedan skärgårdsbåt ~1 h till Landsort.', icon: '⛴' },
      { method: 'Egen båt', from: 'Nynäshamn/Utö', time: 'Varierar', desc: 'Planera noggrant med väderprognoser — Landsort ligger exponerat mot öppet hav.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Landsort Hamn', desc: 'Liten hamn på öns norra sida. Begränsat antal platser.', fuel: false },
    ],
    restaurants: [
      { name: 'Saltboden Kök & Proviant', type: 'Handel/Restaurang', desc: 'Öns enda matplats. Enkel mat och proviant.', slug: 'saltboden-kok-proviant', price_example: 'Lunch 145–185 kr, smörgås 85–115 kr', open_season: 'Juni–Augusti', open_hours: '10–16' },
      { name: 'Landsort Hamncafé', type: 'Café', desc: 'Kaffe och smörgåsar vid hamnen.', price_example: 'Kaffe 45–55 kr, smörgås 75–95 kr', open_season: 'Juni–Augusti', open_hours: '09–15' },
    ],
    day_cost: {
      budget_per_person: '400–750 kr',
      includes: 'Buss + båt från Nynäshamn, lunch på Saltboden, ev. fyrtursguide',
      breakdown: [
        { item: 'SL-pendeltåg till Nynäshamn + buss 852', price: '~50–80 kr' },
        { item: 'Skärgårdsbåt Ankarudden–Landsort t/r', price: '~160 kr' },
        { item: 'Lunch Saltboden', price: '145–185 kr' },
        { item: 'Kaffe + smörgås Hamncafé', price: '85–115 kr' },
        { item: 'Guidad fyrturstur (om tillgänglig)', price: '0–100 kr' },
      ],
      tips: [
        'Landsort är en av de dyrare dagstursöarna p.g.a. lång restid — planera en heldag.',
        'Ta med matsäck som backup — Saltboden stänger tidigt (kl 16).',
        'Fågelstationen är gratis och ger en unik upplevelse under sträcktider.',
      ],
    },
    tips: [
      'Kolla väderprognosen NOGGRANT — Landsort är exponerat för öppet hav.',
      'Fågelstationen vid fyren är en unik upplevelse under sträcktider (april-maj och aug-okt).',
      'Ta med mat — Saltboden stänger tidigt och variationen är begränsad.',
    ],
    related: ['uto', 'dalaro', 'nattaro'],
    tags: ['fyr', 'ytterst', 'dramatiskt', 'hav', 'fåglar'],
    // KÄLLA: Sjöfartsverket (äldsta svenskbyggda fyren, fyrbål 1651) + landsort.com:s kronologi (van der Hagens koncession 1658, privilegium 1669) + Hans Högmans fyrhistoria (fyren tänd 1678, tornet brann 1686, nytt torn klart 1687).
    did_you_know: 'Landsorts fyr är Sveriges äldsta bevarade fyr — ett fyrbål tändes redan 1651, Johan van der Hagen fick kungligt privilegium 1669 och det nuvarande stentornet restes efter branden 1686. Landsort är Stockholms skärgårds sydligaste bebodda utpost (Sveriges sydligaste fastlandspunkt är Smygehuk i Skåne).',
    insiderTips: [
      'Landsort har Sveriges äldsta bevarade fyrtorn i aktiv drift. Platsen har markerats med fyr sedan 1600-talets mitt, om än i olika former.',
      'Landsort nås med Waxholmsbåten från Nynäshamn och är den sydligaste bebodda platsen i Stockholms skärgård.',
      'Ön räknas som ett av de bästa fågelskådningsställena i regionen, framförallt under fågelsträcket i maj och september.',
      'Det bor ett fåtal fastboende på Landsort åretrunt. Ön är en av de mest avskilda i skärgården trots reguljär båttrafik.',
    ],
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Maj eller September',
      bestReason: 'Fågelstationen vid fyren är aktivast under sträcktiderna i maj och september. Då är Landsort på sitt allra mest dramatiska — vind, fyr och tusentals migrerande fåglar.',
      warning: 'Båten Ankarudden–Landsort går året runt, men med gles vintertidtabell — planera efter avgångarna. Enda matalternativet är Saltboden, som har kort säsong — kontrollera öppettider.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
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
      'Furusund är en klassisk seglingspassage i norra skärgården, känd för smalt sund med stark strömning och rik kulturhistoria. Sundet är nästan obligatoriskt för alla som seglar norrut längs Furusundsleden.',
      'Furusund Värdshus (idag Hotel Furusund) är det naturliga stoppet, byggnaden var ursprungligen tullhus från 1800-talet och började servera mat 1950. August Strindberg tillbringade fyra somrar här kring sekelskiftet 1900 (1899–1905), och här arbetade han bland annat med dramat Erik XIV. I "Ett drömspel" blev Furusund "Fagervik" och Köpmanholm på Yxlan "Skamsund".',
      'Furusund passar perfekt för seglare på väg norrut, eller för någon som söker en blandning av seglingsäventyr och historisk kultur i norra skärgården.',
      'Sundet vid Furusund är smalt och strömmen stark, en av de mer krävande passagerna i norra skärgården för den som seglar. Det märks i stämningen: seglare som ankrat har klarat något, och det skapar en kamratskap vid Värdshuset och på bryggorna som är svår att hitta vid mer lättillgängliga destinationer.',
      'Hotel Furusund, det gamla tullhuset från 1800-talet, är välbevarat och har en historia som berättar om en tid när Furusund var officiell in- och utfartsled för handelsfartygen till och från Stockholm. Byggnaden är vacker i sig och matsalen har ett äldre hantverk som inte renoverades bort. En bra destination även för den som inte seglar.',
      'Furusund är också utgångspunkten för utflykt mot Blidö och de omgivande öarna i norra skärgården. Tar man sig hit med bil (och det är möjligt, till skillnad från många andra öar) öppnas en hel världsdel av norra skärgårdens öar och sund. Kajakuthyrning finns vid hamnen under sommarsäsongen.',
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
      { name: 'Furusund Hamn', desc: 'Välplacerad hamn vid sundet. Bränsle och service.', fuel: true, service: ['el', 'vatten', 'bränsle'] },
    ],
    restaurants: [
      { name: 'Furusund Värdshus', type: 'Restaurang', desc: 'Öns klassiska krog. God mat i historisk miljö.', slug: 'furusund-vardshus', price_example: 'Lunch 145–195 kr, middag 225–345 kr', open_season: 'Maj–Oktober', open_hours: 'Lunch 12–15, middag 17–22', book_required: true, phone: '0176-208 90', child_menu: true },
    ],
    day_cost: {
      budget_per_person: '450–800 kr',
      includes: 'Bil/buss till Furusund, lunch + middag på Värdshuset, parkering',
      breakdown: [
        { item: 'Bil från Stockholm (bensin/parkeringsbidrag)', price: '~150–200 kr' },
        { item: 'Alternativ: Waxholmsbåt t/r', price: '~280 kr' },
        { item: 'Lunch Furusund Värdshus', price: '145–195 kr' },
        { item: 'Middag Furusund Värdshus', price: '225–345 kr' },
        { item: 'Kaffe + dryck', price: '60–100 kr' },
      ],
      tips: [
        'Boka bord på Värdshuset i förväg — högsäsong är ofta fullbokat.',
        'Kom med bil (2 h från Stockholm) och spara ner restiden jämfört med Waxholmsbåt (4 h).',
        'Strömmen i sundet gör att seglare ofta stannar kvällen — Värdshuset är bäst som middagsplats.',
      ],
    },
    tips: [
      'Strömmen i Furusund kan vara stark — gå igenom med god marginal och håll noggrann uppsikt på trafik (smal led).',
      'Värdshuset är bäst för middag — boka i förväg under högsäsong.',
    ],
    related: ['blido', 'arholma', 'norrora'],
    tags: ['segling', 'Strindberg', 'norra', 'passage', 'historia'],
    did_you_know: 'Furusund var på 1800-talet ett av Stockholms läns mest populära sommarutflyktsställen. August Strindberg tillbringade flera somrar här och lät sig inspireras av ön.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Juni: seglarlivet börjar, värdshuset öppet och inga köer. September: stilla vatten och dramatiska ljusförhållanden.',
      warning: 'Värdshuset stänger oktober–april. Begränsad service utanför högsäsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

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
      'Naturmässigt är Blidö varierad med skog, öppna åkrar och en lång, kuperad kustlinje. Blidö Brygga & Bistro är det naturliga samlingsplatsen för båtfolk, medan cykelleder slingrar sig längs vägar och stränder. Klimatet är mild nordskärgård, inte lika exponerat som Arholma men långt mer orört än mellersta öarna.',
      'Blidö passar perfekt som del av en längre norra skärgårdstur eller som destination för den som söker autentisk skärgård utan chaos. Många återvändande sommargäster hyr stugor årligt och bidrar till öns lugnare karaktär.'
    ],

    facts: {
      travel_time: '~2 h: bil + två bilfärjor via Yxlan (Furusundsleden + Blidöleden)',
      character: 'Lugnt, lantligt, äkta norrskärgård',
      season: 'Maj–September',
      best_for: 'Lugn, cykling, naturskönt',
    },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Kuperade kustvägar längs en lång, skogig kustlinje med öppna åkrar och klippor. Naturligt stopp: Blidö Brygga & Bistro vid hamnen. Räkna med heldagstur för att nå öns norra och södra delar.' },
      { icon: '🏊', name: 'Bad', desc: 'Fina badplatser längs kusten.' },
    ],
    accommodation: [
      { name: 'Stugor & privat', type: 'Stugor', desc: 'Privatuthyrning på ön. Sök online.' },
    ],
    getting_there: [
      { method: 'Bil + två bilfärjor', from: 'Furusund', time: '~2 h', desc: 'Kör mot Furusund, bilfärja till Yxlan (Furusundsleden), sedan bilfärja Yxlan–Blidö (Blidöleden). Båda avgiftsfria.', icon: '🚗' },
    ],
    harbors: [{ name: 'Blidö Brygga', desc: 'Enkel gästbrygga vid bistron.', fuel: false }],
    restaurants: [
      { name: 'Blidö Brygga & Bistro', type: 'Restaurang', desc: 'Öns samlingspunkt vid bryggan.', slug: 'blido-brygga-bistro', price_example: 'Lunch 145–215 kr, räkor och skaldjur 225–295 kr', open_season: 'Juni–Augusti', open_hours: '11–21' },
      { name: 'Blidö Värdshus', type: 'Restaurang', desc: 'Klassiskt värdshus på ön.', price_example: 'Lunch 145–185 kr, middag 195–285 kr', open_season: 'Maj–September', open_hours: 'Lunch 12–15, middag 17–21', book_required: true },
    ],
    day_cost: {
      budget_per_person: '300–600 kr',
      includes: 'Waxholmsbåt t/r (norra linjen), lunch på Brygga & Bistro, cykeltur',
      breakdown: [
        { item: 'Waxholmsbåt t/r från Strömkajen', price: '~260 kr' },
        { item: 'Lunch Blidö Brygga & Bistro', price: '145–215 kr' },
        { item: 'Kaffe + fika', price: '55–70 kr' },
        { item: 'Cykeluthyrning', price: '80–120 kr' },
      ],
      tips: [
        'Blidö är ett bra alternativ till de mer besökta norraskärgårdsöarna — färre turister, samma natur.',
        'Värdshuset kräver förbokning i högsäsong — ring i förväg.',
        'Hyr cykel och kombinera Blidö med Furusund eller Arholma på samma dag.',
      ],
    },
    tips: [
      'Blidö passar bäst som del av en längre norra skärgårdstur — kombinera gärna med Arholma eller Räfsnäs.',
      'Hyr cykel vid Blidö brygga för att utforska hela ön — vägarna är nästan bilfria och landskapet varierar från skog till kust.',
      'Blidö Brygga & Bistro är öns naturliga hjärta för båtfolk — bra lunch och enkel service utan pretentioner.',
    ],
    related: ['furusund', 'arholma', 'norrora'],
    tags: ['lugnt', 'norra', 'bilfärja', 'lantligt'],
    did_you_know: 'Blidö omnämns i medeltida dokument som "Blidhe" och var en viktig plats för fiske och vedhugning redan på 1300-talet.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: lugn norra skärgård med öppna bryggor och färre besökare. September: naturupplevelsen är som finast och vattnet fortfarande badbart.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
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
      // KÄLLA: Länsstyrelsen Stockholm 2024-10-02 — Gällnö naturreservat utökades med 64 hektar
      // 2024. Skyddet finns kvar och är större än förut. Kontrollerad 2026-08-21.
      'Gällnö är en bilfri ö i mellersta skärgården, klassificerad som naturreservat för att bevara dess orörda karaktär. Ön är känd för sin lägerverksamhet, ungdomsgrupper och naturskolor nyttjar öns större öppna arealer under sommaren.',
      'Landskap på Gällnö varierar från skogspartier till öppna ljunghedar. Här finns inga stora restauranger eller hotell, bara en enkel bar och handelsbod. Det är just detta som gör Gällnö attraktiv för naturälskare som söker lugn och orördhet.',
      'Ön nås via Waxholmsbolagets linje 14 från Strömkajen (via Vaxholm) eller Sollenkroka, EJ från Stavsnäs, och är ett naturligt stopp på väg mot Möja eller Svartsö. Många seglare gör Gällnö till sitt favoritdestination.',
      'Gällnö är en av de öar i skärgården som inte försöker imponera. Ingen stor krog, inget spa, inga bryggbarer. Det finns en hamn, lite service och ett naturreservat som täcker merparten av ytan. Det är avsiktligt, och det är exakt vad Gällnö behöver vara.',
      'Naturreservatets ljunghedar är vackrast i sensommaren när ljungen blommar lila och utsikten över det omgivande vattnet är klar. Fågellivet är rikt, havsörn häckar i reservatets yttre delar och syns regelbundet ovan hamnen under tidiga morgontimmar. Ta med kikare.',
      'Gällnö fungerar utmärkt som ett dygn på vägen, ankra för natten, gå en vandring på morgonen och fortsätt mot Möja eller Sandhamn. Det är den typen av ö som man inte åker till som slutdestination men alltid minns som ett av resans bästa ögonblick.',
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 14 (STOCKHOLM–VAXHOLM–SOLLENKROKA–MÖJA). Gällnö ligger på linje 14, EJ på Stavsnäslinjerna. Två läsningar oense om exakt tid — ingen ✓.
      travel_time: 'Waxholmsbåt via Vaxholm (linje 14) från Strömkajen — gles trafik',
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
    getting_there: [{ method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 2 h', desc: 'Waxholmsbolagets linje 14 via Vaxholm; även från Sollenkroka. Ej från Stavsnäs.', icon: '⛴' }],
    harbors: [{ name: 'Gällnö Hamn', desc: 'Liten naturhamn.', fuel: false }],
    restaurants: [
      { name: 'Gällnö Bar', type: 'Bar', desc: 'Enkel bar vid hamnen.', slug: 'gallno-bar', price_example: 'Öl 65–85 kr, vin 85–115 kr, enkel mat 95–135 kr', open_season: 'Juni–Mitten av Augusti', open_hours: '12–22' },
      { name: 'Gällnö Handelsbod', type: 'Handel', desc: 'Proviant och enkla drycker.', open_season: 'Juni–Augusti', open_hours: '09–17' },
    ],
    day_cost: {
      budget_per_person: '350–600 kr',
      includes: 'Waxholmsbåt t/r från Strömkajen, dryck på baren, medhavd matsäck',
      breakdown: [
        { item: 'Waxholmsbåt t/r Strömkajen–Gällnö (linje 14)', price: '~160 kr' },
        { item: 'Dryck på Gällnö Bar (2 öl)', price: '130–170 kr' },
        { item: 'Medhavd matsäck (lunch + snacks)', price: '100–150 kr' },
      ],
      tips: [
        'Gällnö är en av de öar där du MÅSTE ta med mat — baren serverar enkel mat men begränsat.',
        'Havsörnen häckar i reservatets yttre delar — ta med kikare och gå ut tidigt på morgonen.',
        'Utmärkt ankringsö på väg mot Möja — bra alternativ till mer trånga hamnar.',
      ],
    },
    tips: [
      'Ta med mat — restaurangutbudet är mycket begränsat. En enkel handelsbod finns vid hamnen men räkna inte med varm mat.',
      'Ljunghedarna blommar lila i sensommaren (slutet av juli–aug) — ett av de vackraste naturskådestunden på ön.',
      'Havsörn häckar i reservatets yttre delar och syns regelbundet tidiga morgnar. Ta med kikare.',
    ],
    related: ['moja', 'svartso', 'ingmarso'],
    tags: ['bilfri', 'naturreservat', 'läger', 'orört'],
    did_you_know: 'Gällnö är ett av skärgårdens bäst bevarade kulturlandskap med ängar som hålls öppna med betande djur precis som för hundratals år sedan.',
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli',
      best: 'Slutet av Juli',
      bestReason: 'Ljunghedarna blommar lila i sensommaren — en av skärgårdens vackraste naturskådespel. Havsörnen syns tidiga morgnar.',
      warning: 'Mycket begränsad service. Ta alltid med mat och vatten — baren och handelsboden kan ha stängt vid ankomst.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
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
      'Ön är perfekt för barnfamiljer, tillräckligt stor för att erbjuda något för var smak men inte så stor att barnen tröttnar. Naturliga badplatser längs kusten och möjligheter till klippklättring gör det enkelt att tillbringa en heldag här.',
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
    restaurants: [
      { name: 'Norröra Krog', type: 'Restaurang', desc: 'Öns lilla krog.', price_example: 'Lunch 125–165 kr, enkel middag 155–215 kr', open_season: 'Juni–Mitten av Augusti', open_hours: '12–19', book_required: false },
    ],
    day_cost: {
      budget_per_person: '450–750 kr',
      includes: 'Waxholmsbåt t/r från Norrtälje (3 h enkel), lunch på krogen',
      breakdown: [
        { item: 'Buss från Stockholm till Norrtälje', price: '~50–80 kr (SL)' },
        { item: 'Waxholmsbåt t/r Norrtälje–Norröra', price: '~180 kr' },
        { item: 'Lunch Norröra Krog', price: '125–165 kr' },
        { item: 'Medhavd matsäck (snacks + dryck)', price: '100–150 kr' },
      ],
      tips: [
        'Norröra är ett Astrid Lindgren-pilgrimsmål — inspelningsplatserna för Saltkråkan är välbevarade.',
        'Restiden är lång (3 h enkel) — planera en heldag eller övernattning.',
        'Kombinera gärna med grannöarna Söderöra eller Fejan för ett längre norrskärgårdsäventyr.',
      ],
    },
    tips: [
      'Norröra är bäst kombinerat med en tur till Fejan eller Arholma för en längre norrskärgårdsdag.',
      'Inspelningsplatserna från "Vi på Saltkråkan" är utmärkta på ön — Saltkråkans hus och bryggan känns igen direkt om du vuxit upp med TV-serien.',
      'Badplatserna på öns norra sida är grundare och lugnare — perfekt för barn och familjer.',
    ],
    related: ['arholma', 'blido', 'furusund'],
    tags: ['familj', 'Saltkråkan', 'norra', 'lugnt'],
    did_you_know: '"Vi på Saltkråkan" är den enda av Astrid Lindgrens berättelser som skrevs direkt för TV — TV-serien spelades in på Norröra och Söderöra sommaren 1963 och hade premiär 18 januari 1964. Boken kom samma år och är skriven utifrån manuset, inte tvärtom.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Midsommarveckan med ljusa nätter, lite folk och ännu inte högsommarträngseln.',
      warning: 'Inga reguljära förbindelser — kräver egen båt. Servicen är extremt begränsad.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

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
      // KÄLLA: Länsstyrelsen Stockholm, besöksmål naturreservat/Nåttarö (läst 2026-08-23)
      'Nåttarö är ett naturreservat i södra skärgården med vacker och vild natur. Ön är ett populärt ankringsläge för seglare som söker lugn och orördhet.',
      'Naturreservatet skyddas för att bevara den rika biologiska mångfalden och det unika klippekosystemet. Vandringsstigar leder förbi blockhudar, öppna klippor och små naturhamnar. Klippbaden är rena och inbjudande.',
      'Nåttarö nås enkelt med Waxholmsbåtens fartyg "Utö Express" från Nynäshamns fiskehamn under sommarsäsongen, ca 30 minuter. Egen båt fungerar också.',
      'Det som gör Nåttarö speciellt är kombinationen av sandstränder och naturreservat. Södra Nåttarö har sandstränder som är ovanliga i södra skärgårdssammanhang, vitt sand, grundt badvatten och ett landskap som påminner mer om västkusten än Östersjön. Naturreservatet skyddar ett rikt fågelliv och en orörd klippmark.',
      'Nåttarö är en av de bästa ankarplatserna i södra skärgården. Vikarna på öns södra och östra sida ger bra skydd och vattnet är klart. Seglare på väg mot Utö väljer ofta Nåttarö som nattankar, det är en timmes segling bort och erbjuder en helt annan lugn än Utös mer besökta hamnar.',
      'Vandringsstigarna på Nåttarö är välmarkerade och tar en timme att gå runt i lugnt tempo. Reservatets fågellivet är rikt under vår och höst, häckande alfågel, ejder och sjöorre är vanliga syn. Ta med kikare om möjligheten finns.',
      'Nåttarö intar en viktig position i den södra Stockholmsskärgården som en av de mer betydande naturreservatsöarna. Ön är skyddad som naturreservat, vilket formar både vad som finns där och vad som inte finns. Utvecklingen är minimal, den kommersiella infrastrukturen begränsad och den naturliga miljön är den primära anledningen att besöka. Den skyddsstatus har bevarat en karaktär som många mer tillgängliga öar har förlorat.',
      'Ön är känd för att ha en av de bättre sandstränderna i den södra skärgården. Sandstränder är genuint sällsynta i Stockholms klippdominerande skärgårdslandskap, och Nåttarös strand är tillräckligt stor för att vara värd att specifikt resa till. I juli lockar stranden besökare som söker en strandupplevelse i skärgårdskontext, något svårt att hitta på andra ställen i systemet.',
      'Badkvaliteten vid Nåttarö är god. Stranden möjliggör gradvis instegsväg i vattnet, framför allt nyttigt för barn och de som föredrar att inte hoppa från klippor, och den omgivande havs-temperaturen under högsommaren når det område där ett utdraget bad är bekvämt för de flesta. Vattenklarheten i den här delen av ytterskärgården är också generellt bättre än i mer slutna, inre skärgårdsvikar.',
      'Skogen på Nåttarö har gammelskogs-egenskaper i vissa avsnitt. Naturreservatsstatus har tillåtit träd att mogna bortom vad som är typiskt i skött skog. Att promenera in i öns inre rör sig från strandmiljön in i tät, tyst skogsmark där fågellivet är annorlunda från kustpartierna. Kontrasten mellan den öppna stranden och den slutna skogen är ett av de mer intressanta aspekterna av öns landskap.',
      'Nåttarö är nåbar med Waxholmsbåt från Stockholm, med resan tagande ungefär två och en halv till tre timmar beroende på rutt och säsong. Dagsutflykter är möjliga men restiden innebär att dagen kräver en tidig start och en acceptans av begränsad tid på ön. En övernattning, om boende finns tillgängligt, skapar en mer bekväm relation till öns avstånd.',
      'Det begränsade kommersiella utbudet på Nåttarö är del av dess attraktion och del av dess praktiska utmaning. Det finns ingen etablerad restaurang i konventionell mening. Besökare bör ta med mat och vatten, framför allt om de stannar för en hel dag. Öns naturreservatsstatus gör detta lämpligt: upplevelsen här handlar specifikt om den naturliga miljön snarare än en kurerad besöksupplevelse.',
      'Fågelskådning på Nåttarö är framför allt bra på våren. Öns läge i den yttre södra skärgården gör den till en naturlig hållplats för migrerande fåglar och kombinationen av strand, skogsbryn och omgivande vatten skapar varierade biotoper som lockar flera arter. Tidigt maj är typiskt den mest aktiva perioden.',
      'Stranden på Nåttarö vetter mot sydväst, vilket innebär att den fångar eftermiddags- och kvällssol. Den orienteringen gör sena eftermiddagsbesök framför allt behagliga under de långa sommardagarna. Det lågt vinklade ljuset på vattnet och sanden i den riktningen har en kvalitet som norrvettande stränder inte kan producera.',
      'Nåttarö är ärlig om vad det är: ett naturreservat med en bra strand, bra skog, begränsade tjänster och en två-till-tre-timmars båtresa från Stockholm. Inom de parametrarna är det utmärkt. Utanför dem, om någon söker restauranger, aktiviteter, flera boendealternativ eller enkel access, passar andra öar bättre. Ön är värd att känna till eftersom den fyller ett specifikt gap: kvalitets-strandupplevelse i skärgårdskontext, utan de folkskaror som dyker upp på de få andra sandstrandsöarna.',
      'För familjer med barn som gillar strandtid och enkla friluftsaktiviteter är Nåttarö ett av de mer lämpade ytterskärgårdsmålen. Stranden är trygg, naturreservats-miljön är pedagogisk i sig och kombinationen av bad, promenader och picknick ger en full och relativt lågbudget-dag.',
      'En dag på Nåttarö passar som avslutning på en längre skärgårdsresa lika väl som ett isolerat utflyktssmål. Den specifika kombinationen av strand och skog, stillhet och naturkvalitet, gör den till en bra avkopplingsdag i kontrast till mer aktivitetsfyllda öar som Sandhamn eller Vaxholm.',
      'Nåttarös naturreservatsstatus innebär att det finns regler att känna till. Tältning är tillåten på utpekade platser men inte godtyckligt. Hundar ska hållas kopplade under fågelns häckningstid. Det är rimliga regler för att bevara vad som gör ön värd att besöka, och att respektera dem är del av kontraktet med en plats av den här typen.',
      'Nåttarö illustrerar ett mönster som återkommer i skärgårdssystemet: de öar som är svårast att nå och minst kommersiellt drivna tenderar att erbjuda de renaste naturupplevelserna. Det är inte en slump. Tillgängligheten filtrerar bort en viss typ av besökare och skapar utrymme för en annan. För dem som söker den typen av upplevelse är Nåttarö ett kärnexempel.',
      'Att hitta Nåttarö i första hand, att ens veta om att den finns, är ett eget filter. Det är sällan ön dyker upp i den allmänna turistkonversationen om Stockholms skärgård. Det gör att de som tar sig dit i allmänhet gör det av informerade skäl och med rätt förväntningar.',
    
    
    
    ],

    facts: {
      travel_time: '~30 min med Utö Express från Nynäshamn (sommar)',
      character: 'Vilt, naturreservat, orört',
      season: 'Juni–Augusti',
      best_for: 'Seglare, naturupplevelse, dagsutflykt med båt',
    },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Vandringsstigar i naturreservat.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Rent vatten och fina klippor.' },
    ],
    accommodation: [{ name: 'Ankring', type: 'Gästhamn', desc: 'Ankra i skyddade vikar.' }],
    getting_there: [
      { method: 'Waxholmsbåten "Utö Express"', from: 'Nynäshamns fiskehamn', time: '~30 min', desc: 'Daglig trafik sommarsäsongen (juni–augusti). Biljett ombord.', icon: '⛴' },
      { method: 'Egen båt', from: 'Utö/Dalarö', time: 'Varierar', desc: 'Ankringsmöjligheter i flera skyddade vikar.', icon: '⛵' },
    ],
    harbors: [{ name: 'Nåttarö Naturhamn', desc: 'Skyddad naturhamn.', fuel: false }],
    restaurants: [
      { name: 'Nåttarö Krog', type: 'Restaurang', desc: 'Öns enda krog. Enkel husmanskost.', price_example: 'Lunch 115–165 kr, kvällsmeny 155–225 kr', open_season: 'Juni–Mitten av Augusti', open_hours: '12–20', book_required: false },
    ],
    day_cost: {
      budget_per_person: '350–650 kr',
      includes: 'Utö Express + buss från Nynäshamn, lunch på krogen, medhavd picknick',
      breakdown: [
        { item: 'Pendeltåg till Nynäshamn + buss', price: '~50–80 kr (SL)' },
        { item: 'Utö Express (säsongsbar) t/r', price: '~160 kr' },
        { item: 'Lunch Nåttarö Krog', price: '115–165 kr' },
        { item: 'Medhavd picknick vid sandstranden', price: '50–100 kr' },
      ],
      tips: [
        'Nåttarö är ett naturreservat — ta med allt du behöver, krogen är enda matplatsen.',
        'Sandstranden vetter mot sydväst — bäst ljus och sol på eftermiddagen.',
        'Utö Express kör bara juni–aug, kontrollera tidtabell i förväg.',
      ],
    },
    tips: [
      'Nåttarö nås bäst med egen båt — ingen reguljär Waxholmstrafik, men det är just det som gör ön lugn.',
      'Sandstranden på södra Nåttarö är en av de få riktiga sandstränderna i södra skärgården — sällsynt och värd resan.',
      'Fågelhäckning pågår april–juni på öns yttre klippor — håll avstånd, ta med kikare och njut av tärna och ejder.',
    ],
    related: ['uto', 'orno', 'landsort'],
    tags: ['naturreservat', 'orört', 'segling', 'södra'],
    did_you_know: 'Nattarö naturreservat skyddar ett av Stockholms läns finaste havsörnsrevir. Det bor fler havsörnar än människor på ön.',
    insiderTips: [
      'Nåttarö är ett naturreservat utan fastboende. Ön nås med säsongsbetonad båttrafik eller egen båt.',
      'Havsörnen häckar på Nåttarö och ön räknas som ett av Stockholms läns bästa havsörnsrevir.',
      'Ön är helt fri från bebyggelse och privata fastigheter, ett av skärgårdens mest orörda naturreservat.',
      'Det finns sandstränder på Nåttarö, vilket är ovanligt i den yttre skärgårdens annars klippdominerade landskap.',
    ],
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juli',
      bestReason: 'Sandstranden blomstrar i juli. Kombinera med ankring i naturhamnen och morgonvandring i reservatet — havsörnen flyger tidigt.',
      warning: 'Utö Express trafikerar juni–aug. Ingen reguljär trafik övrig tid. Enda matalternativet är Nåttarö Krog — ta alltid med matsäck.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },
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
      'Ingmarsö är en bilfri ö i Stockholms mellersta skärgård, klassisk knutpunkt för båtluffare och vandrare. Ön har två bryggor, norra och södra, där Waxholmsbåtarna lägger till. På öns mitt finns lanthandel, bageri, krog och B&B.',
      'Båtluffarleden, markerad i blått, förbinder Ingmarsö med Finnhamn via Kålgårdsön; vid det smala sundet mellan öarna finns roddbåtar som gångare själva drar över för att fortsätta vandringen. Det gör sträckan till en av de mest älskade etapperna på Stockholm Archipelago Trail.',
      'Ingmarsö passar för dagsutflykter med båtluffning, vandring genom öppna betesmarker och blandskog, eller som lugnare bas än Finnhamn för en längre helg i mellersta skärgården.',
      'Båtluffarleden är Ingmarsös kanske viktigaste tillgång. Den välmarkerade blå leden förbinder ön med Finnhamn via Kålgårdsön och passerar några av mellersta skärgårdens vackraste naturhamnar. Det tar ungefär en dag att gå sträckan, och det är en dag som håller i minnet, smala sund, flacka klippor och ett landskap som inte förändrats nämnvärt på hundra år.',
      'Ingmarsö är en levande ö med permanentbor, odlingsland och en social kalender som inte kretsar kring turister. Lanthandeln har öppet och krögaren lagar mat med råvaror från öns egna bönder. Det är ett välkomnande ställe men utan den anpassning mot turism som de större öarna har, och det är en skillnad man märker.',
      'Kombinationen Ingmarsö–Finnhamn är ett naturligt tvådagarsprogram för den som vill båtluffa med lätt packning. Börja på Finnhamn, paddla eller ta sig till Ingmarsö för en natt, fortsätt längs leden och ta Waxholmsbåten hem. Det är skärgård på riktigt, utan bil och utan komplicerad logistik.',
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 12/13. Nu: Strömkajen 09.00→N. Ingmarsö 12.15 = 3 h 15. Sommar: 08.30→11.05 = 2 h 35. Tidigare '2,5 h' var sommarsiffran.
      travel_time: '~3 h från Strömkajen med Waxholmsbåt (2,5 h sommartid)',
      character: 'Bilfri, vandringsmål, helårsverksamhet',
      season: 'Maj–September (lanthandeln öppen helår)',
      best_for: 'Båtluffare, vandrare, dagsutflykter, lugn skärgård',
    },
    facts_provenance: { travel_time: 'matt' },
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
      { name: 'Ingmarsö Gästhamn', desc: 'Enkel men fungerande gästhamn vid södra bryggan.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Ingmarsö Krog', type: 'Restaurang', desc: 'Öns krog — säsongsbaserad meny i skärgårdsmiljö.', slug: 'ingmarso-krog', price_example: 'Dagens rätt 145–175 kr, kvällsmeny 195–265 kr', open_season: 'Juni–Augusti', open_hours: 'Lunch 12–15, middag 17–21', book_required: true, child_menu: true },
      { name: 'Ingmarsö Bageri', type: 'Bageri', desc: 'Nybakat bröd, fika och enkla bryggluncher.', price_example: 'Kaffe + bulle 65–75 kr, smörgås 85–115 kr', open_season: 'Maj–September', open_hours: '08–14' },
      { name: 'Ingmarsö Lanthandel', type: 'Handel', desc: 'Dagligvaror — öppen året om.', open_season: 'Helår', open_hours: 'Vardagar 09–17, helg 10–15' },
    ],
    day_cost: {
      budget_per_person: '350–700 kr',
      includes: 'Båtbiljett t/r (240 kr), lunch på krogen, kaffe på bageriet, ev. proviant',
      breakdown: [
        { item: 'Waxholmsbåt t/r från Strömkajen', price: '240 kr' },
        { item: 'Lunch Ingmarsö Krog (dagens rätt)', price: '145–175 kr' },
        { item: 'Kaffe + bulle Bageriet', price: '65–75 kr' },
        { item: 'Proviant Lanthandeln', price: '50–100 kr' },
      ],
      tips: [
        'Hyr cykel vid södra bryggan — spara tid och se mer av ön.',
        'Lunch på krogen och frukost på bageriet är den naturliga kombinationen.',
        'Kombination med Finnhamn (övernattning) gör att du får ut mer av resan.',
      ],
    },
    tips: [
      'Båtluffarleden mellan Ingmarsö och Finnhamn med roddbåt över sundet är ett klassiskt skärgårdsäventyr — ta hela dagen.',
      'Två bryggor — norra och södra — kontrollera tidtabellen för rätt brygga.',
      'Kombinera gärna med Finnhamn på samma weekend.',
    ],
    related: ['finnhamn', 'svartso', 'ljustero'],
    tags: ['bilfri', 'båtluffarleden', 'vandring', 'natur', 'mellersta'],
    did_you_know: 'Båtluffarleden mellan Ingmarsö och Finnhamn är en av Stockholms skärgårds mest karakteristiska vandringsetapper — vid det smala sundet mellan Kålgårdsön och Finnhamn finns roddbåtar som vandrare själva får dra över. Den blå-markerade leden ingår sedan 2024 i den 270 km långa Stockholm Archipelago Trail.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Mitten av Augusti',
      best: 'Juni',
      bestReason: 'Bageri och krog öppna, Båtluffarleden i toppskick, och inga köer till roddbåten vid Kålgårdsön-sundet.',
      warning: 'Bageri och krog stänger efter säsongen. Vid besök utanför juni–aug — ta med mat.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
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
      'Nämdö är en bilfri ö på Waxholmsbolagets linje 17 från Stavsnäs (som går vidare mot Saltsjöbaden och Stockholm, inte till Möja). Ön har haft fast befolkning sedan tidig medeltid, på 1870-talet var befolkningen som störst med 321 personer skrivna i församlingen. Idag är ön ett genuint litet skärgårdssamhälle med kyrka, lanthandel och båtbrygga.',
      'Nämdö kyrka är en av skärgårdens mest karakteristiska — den nuvarande vita träkyrkan i nygotisk stil invigdes hösten 1876 och ersatte tidigare kapell. Det äldsta kända kapellet på ön var från omkring 1630.',
      'Naturen är varierad med klippbad, vandringsstigar och fina naturhamnar på öns södra sida. Nämdö passar som stopp på en längre seglingstur mot Sandhamn, eller som dagsdestination för den som söker autentiskt skärgårdsliv.',
      'Nämdö kyrka är en av de mest karakteristiska kyrkorna i Stockholms skärgård, en vit träkyrka i nygotisk stil invigd 1876, stående ensam på en liten höjd mitt på ön. Den byggdes för den bofasta skärgårdsbefolkningens skull, som inte kunde ta sig till fastlandets kyrkor på vintern. Inuti är den enkel och välbevarad, med en stillhet som känns ovanlig.',
      'Öns grusvägar lämpar sig väl för cykel. Det tar en halv dag att cykla runt och se de viktigaste delarna, kyrkan, de gamla gårdarna i byn, klipporna söderut och de naturhamnar som länge varit seglares hemliga viloplatser. Cyklar kan hyras på ön under sommarsäsongen.',
      'Nämdö har haft fast befolkning sedan medeltiden och det märks i bebyggelsens täthet och variation. Det är inte en öde ö med en sommarkiosk, det är ett fungerande samhälle med egna traditioner, egna invånare och en historia som inte började med turismen. Det gör det till en annan typ av skärgårdsupplevelse.',
      'Nämdö är en avsevärd ö i den södra Stockholmsskärgården som förblir märkbart mindre besökt än jämförbara öar i liknande läge. Det beror delvis på båtlogistiken, förbindelserna är färre och kräver mer planering, och delvis på öns egen karaktär, som erbjuder natur och stillhet framför kommersiell attraktion. Resultatet är en genuint avlägsen känsla kombinerad med rimlig tillgänglighet från Stockholm.',
      'Öns landskap är varierat och storskaligt. Skogar, jordbruksavsnitt, klippor och skyddade vikar existerar inom öns väsentliga yta. Att promenera hela omkretsen tar flera timmar och avslöjar olika aspekter av ön vid olika punkter. De inre skogspartierna har en autentisk svensk skogskvalitet, inte skött natur utan produktionsskog med all dess tillhörande karaktär.',
      'Nämdö kyrka är en av de äldre historiska strukturerna i den södra skärgården. Öarnas kyrkor i Stockholmsskärgården var historiskt viktiga sociala och administrativa centrum för samhällen som annars var isolerade av vatten. Kyrkan på Nämdö bar den funktionen för generationer av öbor och byggnaden bevarar sin historiska karaktär.',
      'Fisket har varit centralt för ölivet här i sekler. De omgivande vattnen är bra för havsöring och de djupare partierna rymmer abborre och andra salttoleranta sötvattensarter. Fisketraditionen här är praktisk snarare än fritidspräglad i sin ursprung, och lokalt fiske pågår fortfarande parallellt med den allt mer besökarinriktade ekonomin.',
      'Badmöjligheterna runt Nämdö är produktiva. De klipphällsrika kustpartierna ger tillgång till rent skärgårdsvatten på flera ställen och de skyddade vikarna värms upp tillräckligt till midsommaren. Bristen på trängsel innebär att hitta en privat badplats, en sällsynthet på de mest populära öarna i juli, är fullt möjligt på Nämdö även under högsäsongen.',
      'Den permanenta gemenskapen på Nämdö är liten men aktiv. Helårsbor upprätthåller öns grundläggande funktioner och vissa begränsade tjänster är i drift under vinterhalvåret. Förhållandet säsongsbesökare till permanenta invånare är mer balanserat här än på rent turistöar, vilket bevarar en mer autentisk gemenskapens karaktär.',
      'Nämdö passar besökare villiga att planera transporten noggrant och acceptera begränsade kommersiella tjänster i utbyte mot en genuint lugnare och mer naturlig upplevelse än de huvudsakliga skärgårdsmålen erbjuder. Det är specifikt bra för dem som vill ha ett flerdagsvistelse i ytterskärgården utan aktivitetsnivåerna hos Sandhamn eller den organiserade infrastrukturen hos Utö.',
      'Naturkvaliteten på Nämdö är hög. Kombinationen av kust-, skogs- och jordbrukslandskap, det renare ytterskärgårdsvattnet och frånvaron av intensiv turistutveckling innebär att ön levererar vad de flesta föreställer sig när de tänker på Sveriges ö-kust, utan de massor som de mest kända versionerna av den bilden lockar.',
      'Båttidtabeller till Nämdö kräver att de kontrolleras i förväg. Servicen är glesare än till mer besökta destinationer och att planera resan i båda riktningarna är nödvändigt. Det extra logistiska kravet är i sig en del av vad som håller ön lugnare och är inte något att behandla som ett hinder utan som ett rimligt pris för vad ön erbjuder.',
      'Sent augusti till mitten av september är möjligen den bästa perioden för Nämdö. Sommartoppen har passerat, båtförbindelserna kör fortfarande på sitt sommartidtabell och ön visar sitt landskap som mest lugnt, vegetationen full och orubbad, ljuset börjar mjukna mot höst. Besökare som gör den resan i september beskriver den ofta som den de tipsar om till andra.',
      'En av Nämdös underskattade kvaliteter är den relativa ensamhet den erbjuder vid rätt tidpunkt. Under en vanlig augustivecka, när Sandhamn och Grinda sväller av besökare, kan Nämdö erbjuda en klipphäll med utsikt och inga grannar inom synhåll. Det är ett svårt erbjudande att hitta i rimlig resväg från en storstad med en miljon invånare.',
      'Nämdö präglas av en skärgårdskaraktär som ligger nära det historiska: fisketradition, liten permanent befolkning, beroende av båtförbindelser och ett landskap som inte inrättats för turism. Det ger en äkthet som är genuint svår att finna hos öar med mer polerad turistprofil.',
      'Nämdö är ett av de tydligaste exemplen på hur reseavståndet i Stockholms skärgård fungerar som ett segreringssystem för upplevelsekvalitet. Öar som kräver planering och några timmars resa tenderar att vara fridfullare och mer autentiska. Nämdö faller tydligt i den kategorin och för dem som är villiga att göra resan är belöningen proportionerlig mot ansträngningen.',
      'Det finns också ett argument för att besöka Nämdö specifikt i det skede av livet när man söker lugnare former av semester. Det är en ö för dem som prioriterar stillhet, natur och genuinitet framför tillgång och bekvämlighet, och som förstår att de kompromisserna är en del av erbjudandet.',
    
    
    
    ],

    facts: {
      // KÄLLA: uppmätt mot ResRobot 2026-08-05 — färja 17-1 Stavsnäs vinterhamn
      // 07:37 → Östanvik (Nämdö) 08:10, utan byten. Stod tidigare "90 min",
      // nästan tre gånger för långt.
      // KÄLLA: Waxholmsbolagets tabell 17 Stavsnäs–Nämdö. ~35 min till Östanvik; andra bryggor 25–60 min.
      travel_time: '~35 min till Östanvik (Nämdö) från Stavsnäs (linje 17)',
      character: 'Bilfri, genuint, litet samhälle, välskyddat',
      season: 'Maj–September',
      best_for: 'Seglare, naturälskare, genuint skärgårdsliv',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      // KÄLLA: Svenska kyrkan (Djurö, Möja och Nämdö församling) + RAÄ bebyggelseregistret — nygotisk träkyrka, invigd hösten 1876; tidigare uppgifter om åttakantig gustaviansk kyrka 1768/1798 var fel.
      { icon: '⛪', name: 'Nämdö kyrka', desc: 'Vit träkyrka i nygotisk stil, invigd 1876 — en av skärgårdens mest distinkta kyrkobyggnader. Öppen sommartid.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten och fina klippor längs södra kustlinjen.' },
      { icon: '🚶', name: 'Vandring', desc: 'Promenera runt ön och utforska de gamla fiskelägena.' },
      { icon: '⛵', name: 'Segling', desc: 'Naturhamnen på södsidan är ett populärt seglarankar.' },
    ],
    accommodation: [
      { name: 'Nämdö Camping', type: 'Camping', desc: 'Enkel campingplats nära hamnen.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: '~35 min till Östanvik', desc: 'Waxholmsbolagets linje 17 från Stavsnäs vinterhamn. Linjen går mot Saltsjöbaden/Stockholm, inte till Möja.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Nämdö Hamn', desc: 'Liten gästhamn. Begränsat antal platser.', fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Nämdö Krog', type: 'Restaurang', desc: 'Husmanskost sommartid.', price_example: 'Lunch 135–165 kr, enkel middag 175–225 kr', open_season: 'Juni–Augusti', open_hours: '12–20', book_required: false },
      { name: 'Nämdö Lanthandel', type: 'Handel', desc: 'Dagligvaror och proviant.', open_season: 'Maj–September', open_hours: '09–17' },
    ],
    day_cost: {
      budget_per_person: '300–600 kr',
      includes: 'Båtbiljett t/r från Stavsnäs (ingår i SL), lunch på krogen, proviant',
      breakdown: [
        { item: 'SL-pendeltåg + buss till Stavsnäs', price: '~50 kr' },
        { item: 'Waxholmsbåt t/r (med SL-kort)', price: '0 kr' },
        { item: 'Lunch Nämdö Krog', price: '135–165 kr' },
        { item: 'Proviant Lanthandeln', price: '50–100 kr' },
      ],
      tips: [
        'Nämdö ligger utanför det område där SL-biljetten gäller (Strömkajen–Vaxholm med omnejd, 44 bryggor) — räkna med Waxholmsbolagets egen biljett. Undantag: 14 september–29 april gäller SL:s periodbiljetter på 30 dagar eller längre i hela trafiken.',
        'Ta med matsäck som backup — krogen har begränsade öppettider.',
        'Bra halvdagsstopp kombinerat med Gällnö eller Möja.',
      ],
    },
    tips: [
      'Nämdö passar perfekt som halvdagsstopp på väg mot Möja eller Gällnö.',
      'Kyrkan, invigd 1876, är öppen sommartid — den vita nygotiska träkyrkan med sin höga takresning är ett landmärke mitt på ön.',
    ],
    related: ['moja', 'gallno', 'sandhamn'],
    tags: ['bilfri', 'genuint', 'segling', 'natur', 'kyrka'],
    did_you_know: 'Nämdö härjades svårt vid ryssarnas anfall 1719 — under Stora nordiska kriget gjorde ryska galärer flera räder mot Stockholms skärgård och brände bebyggelsen på många öar. Kyrkan har haft minst tre föregångare, den äldsta kända från omkring 1630; den nuvarande i nygotisk stil invigdes 1876.',
    insiderTips: [
      'Nämdö kyrka, invigd 1876, är en vit nygotisk träkyrka med hög takresning och spetsbågade fönster — ett karakteristiskt inslag i skärgårdslandskapet.',
      'Nämdö har ett fåtal fastboende och nås med Waxholmsbåten från Stavsnäs.',
      'Ön är känd bland seglare för sina skyddade naturhamnar och är ett populärt ankringsställe.',
      'Det finns inget kafé eller restaurang på Nämdö. Ta med eget.',
    ],
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller Juli',
      bestReason: 'Midsommar vid den gamla kyrkan är skärgård på riktigt. Juni ger lugnet, blomstret och det tomma sundet — utan juli-trängseln.',
      warning: 'Inget kafé eller restaurang på Nämdö. Ta alltid med mat och dryck — lanthandeln har begränsade öppettider.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
  },

  // ─── SVARTSÖ ─────────────────────────────────────────────────
  {
    slug: 'svartso',
    name: 'Svartsö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🏝️',
    tagline: 'Bilfri ö i Värmdö — skärgårdens bästa lanthandel och en levande helårsby.',
    description: [
      'Svartsö ligger i Stockholms mellersta skärgård öster om Ljusterö och väster om Ingmarsö, och tillhör Värmdö kommun. Med cirka 65 åretruntinvånare är ön ett av få mellanstora skärgårdssamhällen som behållit en levande helårsbefolkning, komplett med skola, restauranger, lanthandel, apotek- och Systembolags-ombud.',
      'Ön har varit befolkad sedan tidig medeltid och de två ursprungliga gårdarna Alsvik och Skälvik på sydsidan går tillbaka till samma tid. Säby herrgård restes 1732 av bankiren Johan Söderling efter att den föregående bebyggelsen brunnit ned vid ryska härjningarna 1719.',
      'Svartsö är bilfri (frånsett några enstaka traktorer och fyrhjulingar) och utforskas bäst på cykel, till fots eller via öns grusvägar. Krogen, lanthandeln och vandrarhemmet är öns kärna, perfekt för dem som vill kombinera autentiskt skärgårdsliv med vällagad mat.',
      'Cykeln är det självklara fortskaffningsmedlet på Svartsö. Grusvägen mellan Alsvik i söder och Skälvik i norr tar ungefär en timme i lugnt tempo och leder genom en varierande skärgårdslandskap, öppen ljunghed, tät blandskog och klipphällar med havsutsikt. Cykel finns att hyra vid hamnen.',
      'Svartsö Krog är en av skärgårdens mer omtalade restauranger bland dem som verkligen söker sig bort från de stora linjerna. Köket lagar säsongsbetonad mat med tydlig lokal förankring, rotsaker från öns egna odlingar, fisk från lokala fiskare och ett vinkort som inte försöker imponera men väl lyckas med det. Boka i förväg.',
      'Ön har haft fast befolkning i hundratals år och de gamla gårdarna är fortfarande i bruk. Det syns i hur ön sköts, odlingslandskapet är öppet, hagarna hålls betade och bebyggelsen underhålls utan att moderniseras ihjäl. Det är en levande ö, inte ett museum.',
      'Svartsö är en mellanstor ö i Stockholms centrala skärgård, tillgänglig med bilfärja utöver den reguljära Waxholmsbåtrutten. Bilfärjeförbindelsen gör Svartsö mer praktisk för familjer som reser med utrustning, cyklister som anländer med egna cyklar eller besökare som föredrar att slippa navigera båttidtabeller. Den tillgängligheten är en av öns definierande praktiska egenskaper.',
      'Öns relativt plana interior gör cykling okomplicerat. Stignätverket täcker tillräckligt av ön för ett bra halvdags cykelprogram utan krävande rutter eller markanta uppförsbackar. Cykling är troligen det bästa sättet att se hela spannet av öns landskap: klipphälliga östra kust, skyddade västra vikar, jordbruksavsnitt och skogbevuxna centraldelar.',
      'Den permanenta befolkningen på Svartsö är blygsam men ger ön helårskaraktär. En lokal mataffär och grundläggande tjänster är i drift under hela året för invånarna. Under sommaren expanderar dessa tjänster för att tillgodose säsongsbesökarna som använder ön som ett lugnare alternativ till mer välbesökta centrala skärgårdsdestinationer.',
      'Bad är tillgängligt från flera punkter längs öns strandlinje. De klipphällar som är typiska för den centrala skärgården ger naturlig tillgång till havet och vattentemperaturen i de skyddade västra vikarna värms till bekväma badtemperaturer till mitten av juli. Kombinationen att cykla till ett avlägset hörn av ön och bada från klipporna därifrån är den karakteristiska Svartsö-aktiviteten.',
      'Landskapet varierar mellan den mer exponerade östra kusten och de skyddade västra vattnen. Östsidan, mot mer öppet skärgårdsvatten, tenderar att ha starkare vindar och mer dramatiska klippformationer. Den västra och norra delen är mer skyddat och lugnare, bättre för bad och mer skyddade från vind.',
      'Fågelskådning på Svartsö belönar tålamod. Blandningen av biotoper, kust, jordbruksmark och skog, lockar ett bredare arturval än enhetliga öar. Jordbruksmarkerna är framför allt bra på våren när migrerande fåglar behöver öppen mark för att äta.',
      'Matalternativen på Svartsö är blygsamma. Ett kafé eller enkel restaurang är öppen under sommarmånaderna men utbudet är begränsat. Besökare som planerar hela dagar på ön bör ta med proviant eller komplettera med det som finns tillgängligt lokalt. Betoningen här är friluftsaktivitet snarare än matdestination.',
      'Svartsö fungerar framför allt bra som bas för att utforska den omgivande gruppen av centrala skärgårdsöar. Bilfärjeförbindelsen innebär att anlända med cykel och använda ön som central punkt, med dagsutflykter med båt till grannöar, är ett praktiskt och trivsamt sätt att strukturera ett flerdagars skärgårdsbesök.',
      'Öns närhet till Stockholm, märkbart kortare än de sydligaste ytterskärgårdsöarna, kombinerat med bilfärjeaccess innebär att den kan nås utan omständlig planering. Ett beslut en fredagsmorgon att tillbringa helgen på Svartsö är mer genomförbart än ett jämförbart beslut om Utö eller Arholma. Denna spontanitets-vänlighet är underskattat som en kvalitet.',
      'I september och oktober antar Svartsö en annan karaktär. Sommarbesökarna avreser och ön återgår till sin helårs-gemenskapsrytm. Båtförbindelserna glesnar och matverksamheterna stänger. Men landskapet, nu i tidig höstfärg, och kvaliteten hos tom skärgårds-stillhet gör ett senssäsongsbesök genuint tilltalande för dem som söker det.',
      'För det praktiska skärgårdsbesöket, det spontana och det välplanerade, är Svartsö ett av de smartare valen i det centrala systemet. Det kombinerar äkta skärgårds-natur med en infrastruktur som faktiskt är anpassad till att ta emot besökare, utan att för den skull ge avkall på den karaktär som gör skärgårdsöar värda att besöka.',
      'Svartsö passar ett brett spektrum av besökare. Cyklister, barnfamiljer med bil via färjan, seglare som söker en lugn ankarplats och vandrare som vill ha en dag i tyst skogsmark finner alla vad de letar efter på ön. Den breddanpassningen är inte ett tecken på att ön saknar karaktär, utan på att den har nog av landskap för att rymma flera parallella upplevelser.',
      'Svartsö är ett bra alternativ för den som är trött på att konkurreras om strandklippor och restaurangbord med hundratals andra besökare på samma dag. Ön är tillräckligt välkänd för att ha fungerande infrastruktur men tillräckligt undanskymd för att inte dra de massor som Sandhamn eller Grinda gör under högsommaren.',
      'Den bilfria atmosfären på Svartsös stigar är en kvalitet som inte alltid uppmärksammas men som märks under besöket. Att kunna cykla utan att behöva hålla utkik efter bilar, att höra fågelljuden och havets sus istället för motorer, är en del av vad som gör en dag på en skärgårdsö till det den är.',
    
    
    
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 13 Strömkajen–Alsvik (Svartsö), snabbast ~2 tim 15, typiskt 2 tim 20–35.
      travel_time: '~2 tim 15–35 min med Waxholmsbåt från Strömkajen (linje 13)',
      character: 'Bilfri, ekologisk, lugnt, mat i fokus',
      season: 'Maj–September',
      best_for: 'Matälskare, naturälskare, de som söker unikt',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🛒', name: 'Svartsö Lanthandel', desc: 'Skärgårdens kanske mest välsorterade lanthandel — med apotekombud och Systembolagets utlämning. Lokalbornas vardagsliv händer här.' },
      { icon: '🏛', name: 'Säby herrgård', desc: 'Stenhus uppfört 1732 av bankiren Johan Söderling — bevarad miljö från tiden efter ryssarnas härjningar 1719.' },
      { icon: '🚶', name: 'Vandring', desc: 'Stockholm Archipelago Trail-etapp leder över Svartsö med markerade stigar genom öppet odlingslandskap och skog.' },
      { icon: '🚲', name: 'Cykling', desc: 'Bilfri ö med totalt 14 km grusvägar — ideal för en hel dag på cykel. Hyr cykel hos Svartsö Lanthandel vid Ahlsviks brygga. Inga bilar, bara kor, betesängar och stilla skärgårdslandskap.' },
    ],
    accommodation: [
      { name: 'STF Svartsö Skärgårdshotell & Vandrarhem', type: 'Vandrarhem', desc: 'Hotell- och vandrarhemsboende med konferensmöjligheter, drivet av Svenska Turistföreningen.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: '~2 tim 15–35 min', desc: 'Waxholmsbolagets linje 13 från Strömkajen via Vaxholm; bryggor Alsvik och Skälvik.', icon: '⛴' },
    ],
    harbors: [
      { name: 'Svartsö gästhamn', desc: 'Liten gästhamn nära krogen och lanthandeln.', fuel: false, service: ['vatten'] },
    ],
    restaurants: [
      { name: 'Svartsö Krog', type: 'Restaurang', desc: 'Öns krog vid bryggan — säsongsbaserad meny.', slug: 'svartso-krog', price_example: 'Lunch 155–195 kr, middag 225–325 kr', open_season: 'Maj–September', open_hours: 'Lunch 12–15, middag 17–21', book_required: true, phone: '08-542 480 40', child_menu: true },
      { name: 'Svartsö Lanthandel', type: 'Handel', desc: 'Skärgårdens kanske bäst sorterade lanthandel — apotek- och Systembolagsombud.', open_season: 'Helår', open_hours: 'Mån–Fre 09–18, Lör–Sön 10–15' },
    ],
    day_cost: {
      budget_per_person: '350–700 kr',
      includes: 'Båtbiljett t/r (240 kr), lunch på krogen, cykeluthyrning, ev. proviant',
      breakdown: [
        { item: 'Waxholmsbåt t/r från Strömkajen/Stavsnäs', price: '240 kr' },
        { item: 'Lunch Svartsö Krog', price: '155–195 kr' },
        { item: 'Cykeluthyrning (heldagspass)', price: '100–150 kr' },
        { item: 'Proviant Lanthandeln', price: '50–100 kr' },
      ],
      tips: [
        'Boka bord på krogen i förväg — högsäsong kan vara fullbokat.',
        'Hyr cykel vid lanthandeln och cykla hela ön runt (14 km bilfria vägar).',
        'Lanthandeln med apoteksombud och Systembolaget är ett skäl i sig att besöka.',
      ],
    },
    tips: [
      'Lanthandeln är en sevärdhet i sig — överraskande välsorterad för en bilfri ö.',
      'Skola och året-runt-befolkning gör att ön är levande även utanför sommarsäsongen.',
      'Stockholm Archipelago Trail leder genom Svartsö — ladda ner kartan för en hel dags vandring.',
    ],
    related: ['moja', 'gallno', 'ingmarso'],
    tags: ['bilfri', 'helårs-ö', 'lanthandel', 'genuint', 'lantligt'],
    did_you_know: 'Svartsö har omkring 65 åretruntinvånare och är en av få mellanstora skärgårdsöar med levande helårsverksamhet — ön har egen skola, krog, vandrarhem och en lanthandel som även fungerar som apotekombud och Systembolagets utlämningsställe.',
    insiderTips: [
      'Svartsö nås med bilfärja från Boda på Värmdö, och det är möjligt att ta med bil till ön.',
      'Lanthandeln på Svartsö fungerar även som apoteksombud och utlämningsställe för Systembolaget.',
      'Svartsö har en av skärgårdens mest välkända konstnärsmiljöer och har lockat bildkonstnärer sedan tidigt 1900-tal.',
      'Det bor ungefär 200 fastboende på Svartsö åretrunt, vilket gör ön till en av de mer välbefolkade i mellersta skärgården.',
    ],
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Genuint skärgårdsliv utan trängseln. Lanthandeln, krogen och vandrarhemmet håller öppet — men du delar ön med byborna istället för turisterna.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },

  // ─── RUNMARÖ ─────────────────────────────────────────────────
  {
    slug: 'runmaro',
    name: 'Runmarö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Författarnas ö — Strindberg, Söderberg och Tomas Tranströmer hämtade alla inspiration här.',
    description: [
      'Runmarö är kanske Sveriges mest litterära ö. August Strindberg gjorde den känd genom sina somrar på 1880-talet, hans roman "I havsbandet" (1890) skildrar visserligen Huvudskär men är skriven utifrån miljöerna på Runmarö. Hjalmar Söderberg följde i Strindbergs spår, och Tomas Tranströmer (1931–2015), Nobelpristagare i litteratur 2011, tillbringade somrarna på sin morfars lotsplats vid "Gatan" på Runmarö hela sitt liv. Diktcykeln "Östersjöar" (1974) är direkt inspirerad av öns vatten och människor.',
      'Runmarö är en bilfri ö i Stockholms mellersta skärgård, knutpunkt på Stavsnäs-leden mot Sandhamn. Karaktäristisk är de platta öppna vägarna med skog mellan, vilket gör ön ovanligt cykelvänlig för Stockholms-skärgården. Det finns lanthandel, krog, bageri och flera badplatser.',
      'Runmarö passar för litteraturintresserade på Tranströmers eller Strindbergs spår, för cyklister och seglare som söker en lugnare övernattning än Sandhamn.',
      'Tomas Tranströmer tillbringade stora delar av sitt liv på Runmarö och öns natur är direkt avläsbar i hans dikter. Den öppna klippmarken, barrskogen, det stilla vattnet i vikarna, allt det är fortfarande där, i stort sett orört. Det finns ingen officiell Tranströmer-tur på ön, vilket är en poäng i sig. Man promenerar dit på egen hand och hittar vad man hittar.',
      'Runmarö är tillräckligt stort för att en hel dag ska fyllas naturligt. Cykeln, som hyrs vid hamnen, tar dig norrut mot Bodarna och de öppna ljungfälten, eller söderut mot klipporna med utsikt mot ytterskärgården. Det finns inga stora attraktioner, men det finns ett landskap som håller.',
      'Gästhamnen på Runmarö är ett lugnt alternativ till Sandhamns fullpackade KSSS-hamn. Avståndet mellan de två öarna är bara ett par timmar med normal seglartakt, och kontrasten är enorm. Väljer man Runmarö vaknar man med fågelsång istället för grannbåtens generator.',
      'Runmarö lyfts konsekvent fram som en av Stockholms skärgårds bästa cykelöar, och beskrivningen är träffande. Terrängen är mestadels plan, stigarna och vägarna välskötta och öns storlek ger tillräckligt med sträcka för en meningsfull tur utan att kräva hög konditionsnivå. Cykeluthyrning finns vid hamnen från tidig sommar och en runda av ön tar ungefär två till tre timmar med stopp.',
      'Ön sitter i den centrala-södra delen av Stockholms skärgård och är nåbar med Waxholmsbåt från Stockholm. Resan tar ungefär två timmar. Det läget placerar den inom praktiskt räckhåll för en dagstur från staden, men öns cykelkaraktär belönar ett mer lugnt besök.',
      'Landskapet omväxlar mellan mer exponerade kustnära avsnitt, skogslandet i det inre och öppna jordbruksfläckar. Den variationen innebär att cykelupplevelsen inte är monoton: terrängen förändras frekvent och vyerna skiftar mellan öppet hav, skyddade vikar och skogsspår. Kustpartierna bjuder regelbundet in till stopp, att blicka ut över vattnet och vila på en klipphäll.',
      'Runmarö har en permanent befolkning av boende som lever på ön under hela året, vilket ger den en grad av gemenskapens infrastruktur bortom vad säsongsöar kan erbjuda. En lokal mataffär, tillgänglig under öppettiderna, betjänar både invånare och sommarbesökare. Den typen av fungerande affär tillför praktiskt värde för flerdagsboende.',
      'Badmöjligheter är goda runt Runmarö. Det omgivande vattnet är rent och de klippiga plattformarna runt ön ger naturlig tillgång till havet. Kombinationen av cykling och bad, en förmiddag på cykeln och eftermiddagar i vattnet, gör ön väl lämpad för aktiva dagsbesökare eller dem som stannar en eller två nätter.',
      'Ön har inga exklusiva restaurangalternativ. Det tillgängliga matutbudet är blygsamt, kaféstil snarare än restaurangnivå. Besökare som planerar en mer ambitiös matupplevelse bör antingen ta med proviant eller hantera förväntningarna. Öns styrka är friluftsaktivitet, inte matkulturell ambition.',
      'Runmarö hänger ihop väl med grannöarna i området. Det omgivande båtnätet kopplar det till andra cykel- och vandringsdestinationer, vilket gör det till ett möjligt stopp på ett längre skärgårdsitinerarium snarare än nödvändigtvis en slutdestination.',
      'Den bästa perioden att besöka Runmarö är från sent maj till och med september. Cykelsäsongen öppnar när stigarna torkat efter vintern och öns vegetation är på sin bästa från juni och framåt. September ser lättare folkmassor med bibehållen full cykelsäsong och acceptabla vattentemperaturer för bad.',
      'Familjer med äldre barn finner Runmarö väl lämpat: den plana cykling, badet och den allmänna tryggheten i öinneslutna aktiviteter fungerar bra för barn som klarar ett par timmar på cykel. Yngre barn i cykelsits syns också vanligen. Frånvaron av bilar på huvudöns stigar adderar till attraktionen för familjer.',
      'Runmarö är ett specifikt slags ö, bra på en specifik uppsättning aktiviteter och utan anspråk på att vara något den inte är. För dem som vill ha cykling, bad och en genuin skärgårdsmiljö utan kommersiellt brus levererar den pålitligt och utan besvikelse.',
      'Runmarö har en funktion som vältrafikerat transitläge i det centrala skärgårdslopp som Waxholmsbåtarna trafikerar. Det innebär att det faktiskt är ganska enkelt att kombinera ett Runmarö-besök med en annan ö på samma dag, resa ut på morgonen, cykla och bada, och ta kvällsbåten tillbaka med ett stopp vid en annan ö på vägen. Det är just den typ av spontan skärgårds-logistik som Waxholmsbåtssystemet möjliggör.',
      'Klippbadets tradition är stark på Runmarö. Det finns inga badvakter, inga avgränsade badplatser och inga anläggningar. Man hittar en klipphäll, lägger sin handduk och hoppar i. Det är det renaste formatet av skärgårdsupplevelse och Runmarö levererar det utan onödig omständlighet.',
      'Det finns en enkelhet i Runmarö-konceptet som är svår att argumentera emot: en ö med bra cykling, bra bad, inga bilar och Waxholmsbåt fram och tillbaka. Det täcker de grundläggande behoven för en bra dag i skärgården utan onödig komplexitet. Det är inte det mest dramatiska erbjudandet i systemet, men det är ett av de mest pålitliga.',
      'Runmarö lämpar sig ovanligt väl för första gångsbesök i skärgården. Enkelheten i logistiken, det plana cyklandet och den inbjudande strukturen med hamn, affär och klar badplats gör det till ett bra introduktionsscenario för skärgårdsnaiva besökare som sen kan ta sig vidare till mer avancerade mål.',
    
    
    
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 16/17. Runmarö nås från STAVSNÄS (ej Strömkajen), Styrsvik ~11 min, Långvik ~15–20 min.
      travel_time: '~11–20 min från Stavsnäs med Waxholmsbåt (linje 16/17)',
      character: 'Lugnt, naturnära, knutpunkt för seglare',
      season: 'Maj–September',
      best_for: 'Seglare, naturhamnsankring, de som söker lugnet nära Sandhamn',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '✍️', name: 'Tranströmer-spåret', desc: 'Promenera till "Gatan" där Tomas Tranströmer tillbringade somrarna i morfaderns lotshus — miljön bakom diktcykeln "Östersjöar".' },
      { icon: '🚲', name: 'Cykling', desc: 'En av skärgårdens mest cykelvänliga öar. Platta, öppna grusvägar med skog emellan gör alla bryggor lättillgängliga. Cykla till "Gatan" — Nobelpristagaren Tranströmers sommarmiljö och miljön bakom diktcykeln Östersjöar.' },
      { icon: '⛵', name: 'Segling', desc: 'Klassisk passage och stopp på Stavsnäs-leden mot Sandhamn.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klippbad längs öns kustlinje.' },
    ],
    accommodation: [
      { name: 'Runmarö Gästhamn', type: 'Gästhamn', desc: 'Förtöj på gästplatser — enkelt och bra.' },
    ],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Stavsnäs', time: '~11–20 min', desc: 'Waxholmsbolagets linje 16/17 från Stavsnäs; Styrsvik närmast. Runmarö nås ej från Strömkajen.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Populärt segelstopp.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Runmarö Hamn', desc: 'Bränsle, el och vatten. Populärt stopp på Stockholmsleden.', fuel: true, service: ['el', 'vatten', 'bränsle', 'dusch'] },
    ],
    restaurants: [
      { name: 'Runmarö Krog', type: 'Restaurang', desc: 'Öns krog med enkel skärgårdsmat.', price_example: 'Lunch 135–175 kr, kvällsmeny 185–255 kr', open_season: 'Juni–Augusti', open_hours: '12–21', book_required: false },
      { name: 'Runmarö Lanthandel', type: 'Handel', desc: 'Proviant och dagligvaror.', open_season: 'Juli–Mitten av Augusti', open_hours: '09–18' },
    ],
    day_cost: {
      budget_per_person: '350–650 kr',
      includes: 'Båtbiljett t/r (240 kr), lunch på krogen, cykeltur och proviant',
      breakdown: [
        { item: 'Waxholmsbåt t/r från Stavsnäs', price: '240 kr' },
        { item: 'Lunch Runmarö Krog', price: '135–175 kr' },
        { item: 'Kaffe + bulle', price: '65–80 kr' },
        { item: 'Proviant Lanthandeln', price: '50–100 kr' },
      ],
      tips: [
        'Ta cykel med på båten och cykla till Tranströmer-platsen vid "Gatan".',
        'Krogen och lanthandeln håller kort säsong — ring i förväg utanför juli.',
        'Lugnare och billigare alternativ till Sandhamn för övernattning med direktbåt hem.',
      ],
    },
    tips: [
      'Runmarösund är en av mellersta skärgårdens finaste naturhamnar — anlöp tidigt.',
      'Runmarö är ett lugnare alternativ till Sandhamn för övernattning med direktbåt till stan nästa dag.',
    ],
    related: ['sandhamn', 'moja', 'gallno'],
    tags: ['segling', 'naturhamn', 'bränsle', 'lugnt', 'mellersta'],
    did_you_know: 'Tomas Tranströmer (1931–2015) — Nobelpristagare i litteratur 2011 — tillbringade hela sitt liv somrarna i sin morfars lotshus vid "Gatan" på Runmarö. Diktcykeln "Östersjöar" (1974) är direkt inspirerad av öns vatten, lotshistoria och människor. 2001 sammanställde Tranströmer själv 30 dikter under titeln "Dikter från Runmarö".',
    insiderTips: [
      'Tomas Tranströmer och hans familj bodde på Runmarö under lång tid. Tranströmer sammanställde ett urval dikter under titeln \'Dikter från Runmarö\'.',
      'Runmarö nås med bilfärja och det är möjligt att ta med bil till ön.',
      'Ön är en av de mer lantliga och tystlåtna i mellersta skärgården med goda möjligheter för cykling och vandring.',
      'Lanthandeln och caféet på Runmarö har kort säsong. Öppettiderna är begränsade utanför juli och delar av augusti.',
    ],
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli',
      best: 'Juli',
      bestReason: 'Det är i juli som Runmarö vaknar — lanthandeln och caféet öppna, gästhamnen med liv, och Runmarösund i sitt vackraste.',
      warning: 'Lanthandeln och caféet har kort säsong — öppet i juli och delar av augusti. Ta med egna proviant om du besöker utanför den perioden.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
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
      { icon: '🚲', name: 'Cykling', desc: 'Cykla från Vaxholms hamn via bron till Engarn och vidare till Resarö. Sevärt: Ytterby gruva — sju grundämnen (yttrium, erbium m.fl.) upptäcktes här. Ca 10–15 km tur-retur med fin kustvy.' },
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
    did_you_know: 'Resarö nås landvägen från Vaxholm via Eriksberg och är en av få ”skärgårdsöar” där man når sjönära klippbad på en kort bilresa från Stockholm. Stora delar av öns äldre bebyggelse är från sekelskiftet 1900 då Resarö blev sommarö för Stockholmsfamiljer.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Nära Stockholm med bra kommunikationer — fungerar bra utanför högsäsong.',
      months: ['off','off','off','limited','open','open','peak','peak','open','open','limited','off'],
    },

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
      // KÄLLA: Waxholmsbolagets tabell 12/13 Strömkajen–Husarö, snabbast ~3 tim 15 (08.30→11.45), typiskt ~3 tim 30.
      travel_time: '~3 tim 15 min med Waxholmsbåt från Strömkajen (linje 12/13)',
      character: 'Bilfri, lugnt, genuint, norra mellersta',
      season: 'Maj–September',
      best_for: 'Seglare, de som söker lugn och orördhet',
    },
    facts_provenance: { travel_time: 'matt' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Plana kustvägar runt öns odlingslandskap. Bra etappdestination för cykel- eller seglingsresor i mellersta skärgården — kombinera med Arholmaleden.' },
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
      { name: 'Husarö Hamn', desc: 'Liten välskött gästhamn.', fuel: false, service: ['el', 'vatten'] },
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
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Lugnt vatten, öppna naturhamnar och inga turister — perfekt för segling.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

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
      'Fejan är en av de yttersta bebodda öarna i norra Stockholms skärgård, mot Ålandshav. Ön har bofast historia sedan 1856 och blev känd som östkustens karantänsstation från 1892, sjukhuset "Wasa" stod kvar i drift fram till 1930-talet och flera av dåtidens byggnader finns ännu kvar.',
      'Skärgårdsstiftelsen arrenderade området från Fortifikationsverket 1994 och tog över ägandet 2013. Idag drivs vandrarhem, sjökrog, gästhamn och bastu i karantänsstationens äldre byggnader.',
      'Fejan nås med skärgårdsbåt från Räfsnäs, eller med egen båt, gästhamnen är ett populärt stopp för seglare på Furusundsleden.',
    ],
    facts: {
      travel_time: 'Nås med skärgårdsbåt (Waxholmsbolaget) från Räfsnäs, ca 30 min — eller med privat båt från Furusund',
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
      { name: 'Fejan Naturhamn', desc: 'Skyddad och välbesökt naturhamn. Fyrsektioner och eldplatser finns.', fuel: false, service: [] },
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
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Ljusa nätter och tomt — känslan av att ha ytterskärgården för sig själv.',
      warning: 'Inga reguljära förbindelser. Kräver egen båt och god väderkunskap.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

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
      'Rödlöga ligger på gränsen till Stockholms norra ytterskärgård och är en av skärgårdens mest oförändrade öar. Det finns inga bilvägar, bara slingrande stigar mellan tomter och klippor, och ingen el. Sommartid räknar ön ca 150 hushåll, vintertid är ön i princip obebodd.',
      'Ön har bofast historia sedan 1530-talet och var en av få öar som inte brändes vid ryssarnas härjningar 1719. Från 1792 var en lots stationerad här. Jordbruket lades ned 1956 och den siste fastboende, Georg Nordström, flyttade 1979.',
      'Rödlöga är primärt en seglarö, de skyddade vikarna och naturhamnen lockar erfarna seglare som söker autentisk ytterskärgård.',
      'Byn på Rödlöga är en av norra skärgårdens mest välbevarade. Röda fiskerigårdar, bodar och bryggvakt längs den inre viken, en miljö som inte förändrats nämnvärt sedan sekelskiftet 1900. Kyrkan från 1878 är liten och enkel och öppen under sommarmånaderna. Det är den sortens plats man fotograferar och sedan inser att bilden inte fångar det.',
      'Hamnen på Rödlögas inre sida är naturligt skyddad och ett av norra skärgårdens bästa ankarplatser. Hit tar man sig efter en lång seglingsdag och stannar. Ingen anledning att skynda vidare, viken håller vad den lovar.',
      'Rödlöga belönar den som tar sig tid att gå runt ön. Östra sidan mot öppet hav är vild och klippig med dramatisk utsikt mot de yttersta holmarna. Det tar ungefär två timmar i lugnt tempo. Vattnet längs klipporna är klart och kallt även i juli, klippbad med havsutsikt av det slag man minns.',
    ],

    facts: {
      travel_time: 'ca 4 tim med Waxholmsbåt från Strömkajen (linje 26)',
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
      { method: 'Waxholmsbåt', from: 'Strömkajen', time: 'ca 4 tim', desc: 'Waxholmsbolagets linje 26 (Strömkajen–Norröra–Söderöra–Svartlöga–Rödlöga), yttersta stoppet. Ej från Norrtälje.', icon: '⛴' },
      { method: 'Privat båt', from: 'Furusund / Arholma', time: '1–2 h', desc: 'Naturlig etapp på en längre norrlands-seglingstur.', icon: '⛵' },
    ],
    harbors: [
      { name: 'Rödlöga Hamn', desc: 'Välskyddad inhamn — en av norra skärgårdens bästa.', fuel: false, service: ['vatten'] },
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
    seasonal: {
      open: 'Juni–Mitten av September',
      peak: 'Juli',
      best: 'Juli',
      bestReason: 'Rödlöga är extra livlig under Gotland Runt-helgen i tidig juli. Krogen och hamnen är öppna och norra ytterskärgårdens vildaste stämning.',
      warning: 'Kräver god navigationskunskap — ytterskärgård med grunder. Lång restid från Stockholm (3–4 h med Waxholmsbåt).',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },
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
      'Singö är en stor ö i norra Roslagens skärgård i Norrtälje kommun, broförbunden med fastlandet. Tillsammans med grannön Fogdö bildar den ett av norra Upplands mest oförstörda kustlandskap, öppna fält, träkyrkby och en lång klippkust mot Ålandshav.',
      'Singö kyrka från 1753 är en röd timmrad träkyrka och hyser flera 1700-talsdyrkar, bland annat ett votivskepp från 1700-talet som räknas till Stockholms läns äldsta, skänkt av Norrtälje-borgaren Eric Brant och hans hustru Maria Tillman 1752.',
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
      { icon: '🚲', name: 'Cykling', desc: 'Officiell cykelled: Singö runt (Röd led), 26,2 km, markerad av Levande Roslagsbygd. Vandrings- och cykelkarta säljs hos Visit Roslagen. Nås med SL-buss 637. Flera etapper går på grusväg, men några stigar kräver att cykeln leds — eller undviks helt.' },
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
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Norra skärgårdens karaktär utan Stockholmsöarnas folkmassor. Bra paddlingsvatten.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

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
      'Lidö är en herrgårdsö i Stockholms norra skärgård i Norrtälje kommun. Lidö herrgård har medeltida rötter och nuvarande huvudbyggnad uppfördes 1769. Sedan 1998 ägs större delen av ön av Skärgårdsstiftelsen, som från 2002 hyrt ut driften till olika entreprenörer. Lidö Värdshus drivs sedan 2011 av Hugo Olofsson och Olle Tejle.',
      'Ön kombinerar lugn natur med en vällevande gästhamn, sjökrog, badtunnor, bastu och vandringsleder. Skärgårdsstiftelsen förvaltar också de mindre kringliggande öarna Västerholmen, Gyltan, Skabbö och Örskär.',
      'Lidö passar för par och familjer som söker en blandning av naturupplevelse och välkomponerad service.'
    ],

    facts: {
      // KÄLLA: Waxholmsbolagets tabell 31 (RÄFSNÄS–TJOCKÖ–LIDÖ–FEJAN). Lidö nås från Räfsnäs ~25 min (06.40→07.05), EJ från Strömkajen. Ingen bilfärja till ön.
      travel_time: 'Bil till Räfsnäs, sedan Waxholmsbåt linje 31 (~25 min)',
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
      { name: 'Lidö Gästhamn', desc: 'Välskött gästhamn vid herrgårdsbryggan.', fuel: false, service: ['el', 'vatten', 'dusch'] },
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
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Gott om naturliga ankringsplatser i norra skärgården, lugnt och fint före högsäsongen.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

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
      'Gräddö är en halvö i Roslagens skärgård i Norrtälje kommun, broförbunden med fastlandet via E18 och väg 76. Det gör Gräddö till en av de mest tillgängliga skärgårdsplatserna i norra Stockholms län, man kör hela vägen utan färja.',
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
      { icon: '🚲', name: 'Cykling', desc: 'Ny gång- och cykelbana vid Gräddö hamn (1,1 km). Cykla vidare längs Rådmansölandet mot Räfsnäs och Kapellskär, ca 20 km enkel väg längs en av Roslagens vackraste kustlinjer.' },
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
    // KÄLLA: Sjöhistoriska museet/DigitaltMuseum — Gräddö båtvarv grundat 1924 av bröderna Eriksson, nedlagt 1965, 54 båtar byggda (2026-08-24)
    did_you_know: 'På Gräddö drev bröderna Eriksson ett träbåtsvarv 1924–1965 som hann bygga ett femtiotal båtar innan det lades ner — i dag lever varvstraditionen vidare i form av båtservice vid hamnen.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Gräddö är en stor norrskärgårdsö med karaktär och egna hamnar — bäst besökt utanför peak.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

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
      'Väddö är Roslagens största ö, belägen norr om Norrtälje vid norra Östersjökusten. Tillsammans med Björkö-Arholma utgör Väddö en stor del av norra Roslagens skärgård. Den 18 km långa Väddö kanal, grävd från 1820 av soldater och invigd 1840 av Karl XIV Johan, skär genom området och förbinder Bagghusfjärden i söder med Väddöviken i norr. Det ger seglare ett skyddat alternativ till öppna havet öster om ön.',
      'Idag passerar omkring 22 000 båtar genom kanalen varje år. Slussen vid Älmsta är en av Roslagens populäraste sommarmål. Längs kanalen finns badplatser, restauranger och cykelleder. Herräng på östra Väddö är världens mest kända centrum för lindy hop genom Herrängs Dansläger som arrangerats varje juli sedan 1982.',
      'Väddö passar både för bilburna dagsturister och för seglare som väljer kanalen istället för öppna havet, och för dansare från hela världen som kommer för Herrängs danslägret.',
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
      { icon: '🚲', name: 'Cykling', desc: 'Väddöleden (del av Roslagsleden), ca 30 km längs östkusten med rastplatser vid Bagghus, Sandviken och Grisslehamn. Höjdpunkten: cykla längs Väddö kanal vid Älmsta. Välj östsidovägen — rv 283 är för trafikerad.' },
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
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Juli (Herrängs Dansbana) eller Juni',
      bestReason: 'Herrängs lindy hop-festival i juli är öns stora dragplåster och en upplevelse utan like. Juni ger kanal-idyllen utan festivalmassorna för lugnsökare.',
      warning: 'Herräng-festival i juli ger fullt boende i hela Väddöområdet — boka månader i förväg om du vill vara med. Kanalens sluss är stängd utanför sommarsäsongen.',
      months: ['limited','limited','limited','limited','open','open','peak','open','open','open','limited','limited'],
    },
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
      'Askö ligger i Trosa-skärgården i södra Sörmland (formellt utanför Stockholms län), och är hem för Stockholms universitets marina forskningsstation Askölaboratoriet, en av Sveriges viktigaste forskningsplattformar för Östersjön. Ön är obebodd förutom forskningsstationen.',
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
      { name: 'Askö Hamn', desc: 'Liten hamn vid laboratoriet. Begränsat antal platser för besökare.', fuel: false },
    ],
    restaurants: [],
    tips: [
      'Kontakta Stockholms Universitet för programmet för allmänhetens turer till laboratoriet.',
      'Askö kräver god sjövana — öppet ytterskärgårdsvatten med risk för snabba väderförändringar.',
    ],
    related: ['uto', 'nattaro', 'landsort'],
    tags: ['marinbiologi', 'naturreservat', 'ytterskärgård', 'forskning', 'södra'],
    did_you_know: 'Askölaboratoriet grundades 1961 och är Stockholms universitets fältstation för marin forskning i Östersjön. Det är en av de äldsta och mest produktiva marinbiologiska forskningsstationerna i Sverige — flera centrala studier kring Östersjöns övergödning och miljöövervakning av blåstång och bottenfauna har sitt ursprung här.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Naturreservat i sydskärgården — bäst när hackfågelskyddet lyfts och turisterna inte anlänt.',
      warning: 'Fågelskydd begränsar landstigning i delar av reservatet april–mitten av juni.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },

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
      'Gålö är en halvö i Stockholms södra skärgård i Haninge kommun, broförbunden med fastlandet via Gålöleden, vilket gör den till en av de mest tillgängliga "skärgårds-platserna" söder om Stockholm. På 40 minuter med bil från innerstaden är man framme.',
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
      { icon: '🚲', name: 'Cykling', desc: 'Cykla från Horsfjärden till Gålö havsbad, ca 20–40 km tur-retur. Lätt kuperad terräng, mix av grusväg och asfalt — ta med MTB eller hybridcykel. Rekommenderat stopp: Stegsholms gård med café och eget mejeri.' },
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
      { name: 'Gålö Havsbad Restaurang', type: 'Restaurang', desc: 'Strandbistro med hamburgare, räkor och glass.', slug: 'galo-havsbad-restaurang' },
    ],
    tips: [
      'Kom tidigt på sommardagar — Gålö Havsbad är populärt och parkeringen fylls snabbt.',
      'Kombinera strandbesöket med vandringen i naturreservatet — 2 timmar och du har sett det bästa.',
    ],
    related: ['dalaro', 'orno', 'uto'],
    tags: ['sandstrand', 'lättillgänglig', 'södra', 'bad', 'camping'],
    did_you_know: 'Gålö Havsbad är en av Stockholmsregionens mest besökta badplatser — här fanns redan tidigt 1900-tal sommarkoloniverksamhet för Stockholms barn, och delar av området drivs idag av Skärgårdsstiftelsen som naturreservat och kulturmiljö.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Familjevänlig sandstrand nåbar med bil — bäst i juni och tidig juli innan parkeringen fylls och trängseln ökar.',
      warning: 'Gålö Havsbad fylls snabbt på sommardagar — kom tidigt på morgonen.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
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
      'Torö är en stor ö i Stockholms södra skärgård i Nynäshamns kommun, broförbunden med fastlandet via Herrhamras bro och Torö bro. Den dramatiska sydkusten med stora rundslipade strandstenar (Torö stenstrand) är en av Stockholms läns mest unika kustlinjer och är skyddad som naturreservat.',
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
      { name: 'Torö Marinstaden', desc: 'Marinstation och gästhamn.', fuel: true, service: ['el', 'vatten', 'bränsle'] },
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
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'September',
      bestReason: 'Dramatisk kustlinje och bäst för havsöringsfiske i september. Surfvindarna är starkast på hösten — utan juliträngseln.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
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
      'Fjärdlång är en större ö i Stockholms södra skärgård öster om Dalarö och Ornö. Ön är skyddad som naturreservat och förvaltas av Skärgårdsstiftelsen, ett tag av Stockholms läns finaste oexploaterade skärgårdsmiljöer med klippkust, blandskog och rikt fågelliv.',
      'På ön finns Fjärdlångs vandrarhem (32 bäddar, öppet maj till mitten av september) och Norrötorpet, en liten 33 m² stuga med ett rum, kök och sovloft, utan el, med vatten från egen pump och utedass plus bastu vid den egna bryggan.',
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
      { name: 'Norra Fjärdlångsviken', desc: 'En av södra skärgårdens finaste naturhamnar — Skärgårdsstiftelsen-förvaltad.', fuel: false },
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
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Naturreservat i yttre sydskärgården — bäst precis före högsäsongen när allt är öppet och tomt.',
      warning: 'Begränsad service. Inga reguljära förbindelser — kräver egen båt.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

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
      'Rindö ligger i Stockholms inre skärgård öster om Vaxholm. Ön har en rik militärhistoria. Vaxholms kustartilleriregemente (KA 1) bildades på Rindö 1 januari 1902 och kasernbyggnaderna stod klara 1906, ritade av arkitekt Erik Josephson efter standardplaner för infanteriet. Regementet bemannade Vaxholms fästning, Oscar-Fredriksborgs fästning och Hörningsholms kustposition.',
      'KA 1 lades ned 30 juni 2000 och ersattes av Vaxholms Amfibieregemente (Amf 1) som 2006 flyttade till Berga örlogsbas. Sedan dess har Vasallen omvandlat kasernområdet till ett växande bostadsområde. Rindö är idag i första hand en bostadsö för Vaxholms-pendlare, med kvarvarande militärhistoriska byggnader och fortifikationer.',
      'Rindö passar för dagsbesök från Vaxholm, för promenader bland kasernerna och Oscar-Fredriksborgs fortifikationer, eller som boendeort för dem som vill kombinera skärgårdsläge med Stockholms-pendling.',
    ],
    facts: { travel_time: '6 min med bilfärja från Vaxholm (Vaxholmsleden)', character: 'Militärhistoria, bostadsö, broförbunden', season: 'Helår', best_for: 'Militärhistoria, vandring, dagsutflykt från Vaxholm' },
    activities: [
      { icon: '🏛', name: 'KA 1-området', desc: 'Promenera bland Erik Josephsons kasernbyggnader från 1906 — idag bostäder och kulturmiljö.' },
      { icon: '🏰', name: 'Oscar-Fredriksborgs fästning', desc: 'Bevarad kustartillerifästning från sent 1800-tal/tidigt 1900-tal.' },
      { icon: '🚶', name: 'Promenader', desc: 'Stigar längs öns klippkust och genom de gamla militärområdena.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Bilfärja', from: 'Vaxholm', time: '6 min', desc: 'Reguljär bilfärja Vaxholm–Rindö (Vaxholmsleden, 970 m, Trafikverkets vägfärja, avgiftsfri).', icon: '⛴' },
    ],
    harbors: [{ name: 'Rindö hamn', desc: 'Liten gästbrygga med begränsat antal platser.' }],
    restaurants: [],
    tips: ['Kombinera gärna med ett besök på Vaxholms fästning på Vaxholmen-sidan.', 'Vasallens omvandling av kasernerna är en av Sveriges större militära konversionsprojekt — värt en promenad.'],
    related: ['vaxholm', 'resaro', 'ljustero'],
    tags: ['militärhistoria', 'KA 1', 'bostadsö', 'nära Vaxholm', 'mellersta'],
    did_you_know: 'Vaxholms kustartilleriregemente (KA 1) bildades på Rindö 1902 och bemannade Vaxholms och Oscar-Fredriksborgs fästningar. Efter regementets nedläggning 2000 omvandlade Vasallen de gamla kasernerna — ritade av Erik Josephson 1906 — till bostäder, vilket gjorde Rindö till ett av Sveriges mest kända exempel på militär konversion.',
    seasonal: {
      open: 'Helår',
      peak: 'Juni–Augusti',
      best: 'Maj–September',
      bestReason: 'Militärhistorisk ö med enkel bilfärja från Vaxholm. Kasernerna och befästningarna är intressanta hela sommarhalvåret.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
  },

  {
    slug: 'yxlan',
    name: 'Yxlan',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🚲',
    tagline: 'En av norra skärgårdens största öar — bilfärja, cykling och Köpmanholms hamn',
    description: [
      'Yxlan är en av norra skärgårdens största öar, cirka 17 km², och ligger mellan Furusund och Blidö. Köpmanholm vid öns nordspets är öns huvudort, med gästhamn, butiker och restauranger. Waxholmsbolaget angör åtta bryggor på ön: Yxlö, Alsvik, Brokholmen, Duvnäs, Kolsvik, Köpmanholm, Vagnsunda och Yxlövik.',
      'Ön är broförbunden i båda riktningar via Trafikverkets avgiftsfria bilfärjor: Furusundsleden (600 meter, 4 minuter) från Furusund och Blidöleden (530 meter, 4 minuter) över till Blidö. Det gör Yxlan till en av de mest tillgängliga större öarna i norra skärgården.',
      'Yxlan passar för cykelsemester, vandring och båtutflykter med övernattning på land. Köpmanholm är ett bra startläge för seglare som vill utforska Furusunds- och Blidöleden.',
    ],
    facts: { travel_time: '1,5 h med bil + bilfärja från Stockholm', character: 'Stor ö, bilförbunden via färja, Köpmanholm', season: 'Maj–oktober', best_for: 'Cykling, vandring, segling, dagsutflykt' },
    activities: [
      { icon: '🚲', name: 'Cykling', desc: 'Stor ö med bilfärja från Räfsnäs (Norrtälje). Cykla runt från Köpmanholm längs kustvägar — räkna med heldagstur. Bra bas för seglare och naturälskare i norra skärgårdens ytterkanter.' },
      { icon: '🏊', name: 'Klipp- och sandbad', desc: 'Flera badplatser längs kusten, både klippor och mindre sandstränder.' },
      { icon: '⛵', name: 'Hamnliv i Köpmanholm', desc: 'Öns huvudort med gästhamn, restauranger och småbåtsservice.' },
    ],
    accommodation: [{ name: 'Yxlans Vandrarhem', type: 'Vandrarhem', desc: 'Enkelt boende med självhushåll, perfekt för naturälskare.' }],
    getting_there: [
      { method: 'Bil + bilfärja', from: 'Stockholm via Furusund', time: '1,5 h', desc: 'E18 mot Norrtälje, sen väg 276 till Furusund. Furusundsleden (avgiftsfri vägfärja, 4 min) över till Yxlan.', icon: '🚗' },
      { method: 'Skärgårdsbåt', from: 'Strömkajen', time: '3–4 h', desc: 'Waxholmsbolaget angör åtta bryggor på ön — Köpmanholm är huvudbryggan.', icon: '⛴' },
      { method: 'Cinderellabåtarna', from: 'Strandvägen', time: '3 h', desc: 'Sommartrafik till Köpmanholm.', icon: '⛴' },
    ],
    harbors: [{ name: 'Köpmanholms Gästhamn', desc: 'Yxlans huvudhamn vid Köpmanholm — full service.', service: ['El', 'Vatten', 'Dusch'] }],
    restaurants: [{ name: 'Yxlans Café', type: 'Kafé', desc: 'Hemlagad mat och kaffe i lantlig miljö vid hamnen.' }],
    tips: ['Båda bilfärjorna (Furusund-Yxlan och Yxlan-Blidö) är avgiftsfria.', 'Cykla mellan bryggor — varje brygga har sin egen karaktär.', 'Köpmanholm är livligast under hummerveckan i september.'],
    related: ['blido', 'furusund', 'graddo'],
    tags: ['stor ö', 'bilfärja', 'cykling', 'norra', 'köpmanholm'],
    did_you_know: 'Yxlan är broförbunden med både Furusund och Blidö via två avgiftsfria bilfärjor — Furusundsleden (600 m) i väster och Blidöleden (530 m) i öster. Tillsammans gör de Yxlan till en av de mest lättillgängliga större öarna i Roslagens skärgård, trots att den saknar fast brobindelse till fastlandet.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Stor norrröslagens ö — cykla och segla i juni när Köpmanholm är öppet men ännu inte fullpackat.',
      months: ['off','off','off','off','open','open','peak','peak','open','limited','off','off'],
    },
  },

  {
    slug: 'kymmendo',
    name: 'Kymmendö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '✍️',
    tagline: 'Strindbergs ö — litteraturhistoria mitt i skärgården',
    description: [
      'Kymmendö är en bilfri ö i mellersta skärgården som har en exceptionell plats i svensk litteraturhistoria. August Strindberg tillbringade sju somrar här mellan 1871 och 1883 och fick på ön inspirationen till en av sina mest lästa romaner, "Hemsöborna" (1887). Karaktärerna Madam Flod och Gusten har förebilder bland Kymmendös faktiska invånare på den tiden.',
      'Ön är känd för sina naturvärden, skogsrika partier växlar med öppna ljunghedar och klippor. Bebyggelsen är fortfarande småskalig och ön är till stor del oexploaterad jämfört med andra mellersta skärgårdsöar.',
      'Kymmendö passar bäst för litteratur- och historieintresserade som vill se "det riktiga Hemsö", eller för den som söker en lugn sidoväg i mellersta skärgården.'
    ],

    facts: { travel_time: '2,5–3 h från Strömkajen · ca 15 min från Dalarö (linje 19)', character: 'Bilfri, historisk, litterär', season: 'Juni–september', best_for: 'Litteraturintresserade, Strindberg-fans, naturälskare' },
    activities: [
      { icon: '✍️', name: 'Strindbergsstugan', desc: 'Stugan där Strindberg bodde och hämtade inspiration till "Hemsöborna" (1887).' },
      { icon: '🥾', name: 'Vandring', desc: 'Korta men stämningsfulla stigar runt ön med klippvyer.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Waxholmsbåt', from: 'Strömkajen / Dalarö', time: '2,5–3 h / 1 h', desc: 'Reguljär skärgårdslinje — kontrollera Waxholmsbolagets tidtabell.', icon: '⛴' },
      { method: 'Egen båt', from: 'Valfri hamn', time: 'Varierar', desc: 'Naturhamnen på södra sidan tar emot ett fåtal båtar.', icon: '⛵' },
    ],
    harbors: [{ name: 'Kymmendö naturhamn', desc: 'Skyddad vik på södra sidan. Ankring möjlig.' }],
    restaurants: [],
    tips: ['Läs Hemsöborna innan besöket.', 'Ta med allt — ingen butik eller service finns.', 'Planera vistelsen med vädret i tanke, svår att lämna vid storm.'],
    related: ['orno', 'dalaro', 'nattaro'],
    tags: ['Strindberg', 'literär', 'orört', 'historia', 'mellersta'],
    did_you_know: 'Kymmendö är känd som platsen där August Strindberg skildrade skärgårdslivet i romanen "Hemsöborna" från 1887 — en av Sveriges mest lästa böcker.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Lugn sydskärgårdsö med bra ankring — bäst besökt utanför juli-toppet.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },

  },

  {
    slug: 'bullero',
    name: 'Bullerö',
    region: 'mellersta',
    regionLabel: 'Mellersta ytterskärgården',
    emoji: '🎨',
    tagline: 'Huvudentré till Nämdöskärgårdens nationalpark — Bruno Liljefors ö',
    description: [
      // KÄLLA: sverigesnationalparker.se/sv/upptack-nationalparkerna/namdoskargardens-nationalpark — "Huvudentrén finns på ön Bullerö", bildades 2025 (hämtad 2026-08-19)
      // Uppgifterna bekräftade per telefon med Nämdöskärgårdens nationalpark 2026-08-19.
      'Bullerö är huvudentré till Nämdöskärgårdens nationalpark — Sveriges 31:a nationalpark, invigd 2025 och den första marina nationalparken i Östersjön. Parken omfattar ett tusental öar, kobbar och skär, och 97 procent av ytan är hav.',
      // KÄLLA: samma sida — "När nationalparken bildades år 2025 fanns två naturreservat i området, Bullerö och Långviksskärs naturreservat." Bullerö naturreservat uppgick alltså i nationalparken.
      'Fram till 2025 var ön ett eget naturreservat. I dag ingår Bullerö i nationalparken, som förvaltas av Länsstyrelsen Stockholm. Konstnären Bruno Liljefors (1860–1939), en av Sveriges mest framstående djurmålare, köpte ön 1908 och byggde sin jaktstuga och ateljé här 1909.',
      'Bullerö passar för dagsturer och naturhamnsbesök för seglare och naturälskare som vill se den verkliga ytterskärgården och en del av svensk konsthistoria på samma plats.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Stavsnäs', character: 'Nationalpark, ytterskärgård, konsthistorisk plats', season: 'Maj–september', best_for: 'Jaktstugan, bastu, fågelskådning, segling' },
    activities: [
      // KÄLLA: sverigesnationalparker.se — Jaktstugan, Bastun på Bullerö ("öppen för alla och går inte att boka"), Brunos slinga (hämtad 2026-08-19)
      { icon: '🎨', name: 'Jaktstugan', desc: 'Bruno Liljefors jaktstuga från 1909 — i dag utställning om nationalparken och livet i Östersjön.' },
      { icon: '🧖', name: 'Bastun på Bullerö', desc: 'Öppen för alla och går inte att boka.' },
      { icon: '🚶', name: 'Brunos slinga', desc: 'Historisk vandringsled i konstnärens fotspår.' },
      { icon: '🦅', name: 'Fågelliv', desc: 'Havsörn, ejder, vigg och olika sjöfågel häckar i området.' },
    ],
    accommodation: [],
    // KÄLLA: bullero.se/sv/turtrafiken/ — "För att komma till Bullerö res med Bullerölinjen" (uppdaterad 2026-02-12, hämtad 2026-08-19)
    getting_there: [{ method: 'Båttaxi (Bullerölinjen)', from: 'Stavsnäs', time: 'Se battaxi.se', desc: 'Bullerö nås med Bullerölinjen, inte Waxholmsbolaget. Boka plats och se aktuell tidtabell på battaxi.se, eller res med egen båt.', icon: '⛴' }],
    // KÄLLA: Nämdöskärgårdens nationalpark per telefon 2026-08-19 — naturhamn gäller, inga gästhamnsplatser, ingen restaurang och inget café på ön.
    harbors: [{ name: 'Naturhamn', desc: 'Naturhamn gäller — inga gästhamnsplatser. Bryggan i Hemviken är reserverad för personal och entreprenörer. Ingen service, ingen restaurang, inget café.' }],
    restaurants: [],
    tips: ['Jaktstugan är öppen sommarsäsong — kontrollera öppettider innan besök.', 'Ingen restaurang, inget café och ingen affär på ön. Ta med allt du behöver.', 'Nationalparkens föreskrifter gäller — läs på sverigesnationalparker.se innan besök.'],
    related: ['nattaro', 'gallno', 'sandhamn'],
    tags: ['nationalpark', 'liljefors', 'konsthistoria', 'ytterskärgård', 'mellersta'],
    did_you_know: 'Bullerö är huvudentré till Nämdöskärgårdens nationalpark, Sveriges 31:a och första marina nationalpark i Östersjön. Den invigdes på ön i september 2025. Konstnären Bruno Liljefors köpte Bullerö 1908 och byggde sin jaktstuga året efter — i dag rymmer den parkens utställning.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Nationalpark utan fast boende — alltid lugnt. September ger havsfärger och få andra besökare.',
      warning: 'Ingen restaurang, inget café, ingen service. Naturhamn utan gästhamnsplatser. Ta med allt du behöver. Res med Bullerölinjen — kontrollera tidtabell på battaxi.se.',
      months: ['limited','limited','limited','limited','open','open','peak','open','open','limited','limited','limited'],
    },
  },

  {
    slug: 'vindo',
    name: 'Vindö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌳',
    tagline: 'Större broförbunden ö i Värmdö-skärgården — skog, vikar och båtliv',
    description: [
      'Vindö är en större ö i Stockholms mellersta skärgård i Värmdö kommun, broförbunden med fastlandet via Djurö i söder och med Skarpö i öster. Det gör Vindö till en av de mest tillgängliga öarna i området, man kör hela vägen utan färja.',
      'Skogen är tät och flera vandringsstigar leder mellan klippkust och inland. Badplatser längs kusten är ofta lugnare än på de mer turisttyngda öarna i området. Vindö är ett populärt sommarstugeområde med stark båtkultur. Stavsnäs och Stockholms inre skärgård ligger nära.',
      'Vindö passar för den som vill kombinera enkla bilförbindelser med skärgårdsnatur, eller som utgångspunkt för båtutflykter mot Stavsnäs och de yttre öarna.',
    ],
    facts: { travel_time: '1 h med bil från Stockholm', character: 'Stor broförbunden ö, skog, sommarstugor', season: 'Maj–oktober', best_for: 'Vandring, sommarboende, båtutflykter' },
    activities: [
      { icon: '🌳', name: 'Vandring', desc: 'Stigar genom blandskog och längs klippkust.' },
      { icon: '🚲', name: 'Cykling', desc: 'Cykla längs grusvägar via Djurö och vidare ut till Skarpö. Smala skogsvägar med karaktär och aldrig långt till vattnet. Del av Värmdö-öarnas sammanlänkade cykelnät — bra dagstur från Stavsnäs.' },
      { icon: '🏊', name: 'Klipp- och sandbad', desc: 'Mindre badplatser längs kusten — ofta lugnare än Värmdöns inre öar.' },
    ],
    accommodation: [{ name: 'Vindö Camping', type: 'Camping', desc: 'Välskött campingplats nära havet.' }],
    getting_there: [
      { method: 'Bil', from: 'Stockholm via Värmdö', time: '1 h', desc: 'Väg 222 till Värmdö, sedan över Djurö och vidare till Vindö via fast brobindelse.', icon: '🚗' },
      { method: 'Buss', from: 'Slussen', time: '1 h 15 min', desc: 'SL-buss via Värmdö och Djurö till Vindö.', icon: '🚌' },
    ],
    harbors: [{ name: 'Vindö brygga', desc: 'Gästbrygga med vattenservice.' }],
    restaurants: [{ name: 'Vindö Hamnkafé', type: 'Kafé', desc: 'Fika och enkel mat vid bryggan, öppet sommarsäsong.' }],
    tips: ['Vindö är broförbunden — ingen färja krävs.', 'Bra utgångspunkt för båtutflykter mot Stavsnäs och Möja.', 'Cykla mellan Djurö och Vindö för en stilla halvdag.'],
    related: ['gallno', 'namdo', 'moja'],
    tags: ['stor ö', 'broförbunden', 'skog', 'sommarstugor', 'mellersta'],
    did_you_know: 'Vindö nås landvägen utan färja — ön är broförbunden via Djurö i söder. Tillsammans med Djurö och Skarpö bildar den ett av få sammanhängande bilförbundna ö-områden i mellersta skärgården, vilket gjort området till en av Stockholms tätaste sommarstugekluster.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli',
      best: 'Juni',
      bestReason: 'Broförbunden mellanskärgårdsö — tillgänglig hela säsongen utan färja. Lugnast och grönast i juni och tidig september.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },

  {
    slug: 'smaadalaro',
    name: 'Smådalarö',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🏛',
    tagline: 'Smådalarö Gård (1810) — Stockholms skärgårds kanske mest välrenommerade spa-hotell.',
    description: [
      'Smådalarö är en del av Dalaröhalvön i Stockholms södra skärgård, broförbunden och nåbar med bil från Stockholm på cirka 50 minuter. Området har en lång historia, under 1700-talet drev löjtnant Carl Christian Gyldener jordbruk här och fick livstidsarrende 1750. 1802 köpte kapten Per Niklas Blom hela "Tyresö skärgården" av grevinnan Brita Bonde för 12 000 riksdaler, och 1810 stod Smådalarö Gård klar.',
      'Smådalarö Gård genomgick en omfattande renovering och öppnade sommaren 2021 som ett av Sveriges mest påkostade spahotell, 118 rum, 2 000 m² spa, flera restauranger och bredd av aktiviteter. Det är idag en av Stockholms skärgårds mest välkända destinationer för helgvistelser och konferens.',
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
    harbors: [{ name: 'Smådalarö Gästhamn', desc: 'Hamn vid Smådalarö Gård — full service, bra skydd, populär sommarhamn.', fuel: true, service: ['El', 'Vatten', 'Duschar', 'Tvätt'] }],
    restaurants: [{ name: 'Smådalarö Gård Restaurant', type: 'Restaurang', desc: 'Skärgårdsmat med lokala råvaror i historisk herrgårdsmiljö.' }],
    tips: ['Boka spa-tider långt i förväg — särskilt helger juli–augusti.', 'Smådalarö Gård är broförbunden — ingen båt krävs.', 'Brunch på helger är populär även för icke-hotellgäster (bokas i förväg).'],
    related: ['dalaro', 'orno', 'toro'],
    tags: ['spa-hotell', 'herrgård', 'broförbunden', 'södra', 'sabis'],
    // KÄLLA: smadalarogard.se — sjökaptenen Carl Peter Blom, köp 1802 (Brita Bonde), klart 1810; hotellets egen sida: 110 rum, 2 000 m² spa (2026-08-24)
    did_you_know: 'Smådalarö Gård byggdes 1802–1810 av sjökaptenen Carl Peter Blom efter att han 1802 köpt hela "Tyresö skärgården" från grevinnan Brita Bonde för 12 000 riksdaler. Efter renoveringen 2021 är Gården ett av Sveriges mest påkostade spa-hotell med 110 rum och 2 000 m² spa.',
    seasonal: {
      open: 'Helår',
      peak: 'Juli–Augusti',
      best: 'Maj eller September',
      bestReason: 'Smådalarö Gård är öppet helåret. Välj maj eller september för lägre pris, öppet spa och utan sommarträngseln.',
      warning: 'Spa-tider bör bokas månader i förväg för juli–augustihelger.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },
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
      'Naturen på Mörkö är varierad med skogspartier och klippor. Det finns möjligheter för båd och enkel vistelse. Service är minimal, ingen restaurang men en handelsbod för grundbehov.',
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
    harbors: [{ name: 'Mörkö hamn', desc: 'Enkel gästbrygga med begränsat antal platser.' }],
    restaurants: [],
    tips: ['Ta med proviant — service är minimal.', 'Kontakta ö-borna för lokaltips.'],
    related: ['orno', 'dalaro', 'fjardlang'],
    tags: ['fiske', 'genuin', 'södra', 'orört'],
    did_you_know: 'Mörkö är broförbundet med fastlandet sedan 1972 (Mörköbron från Hölö-sidan) men kan också nås via Trafikverkets avgiftsfria färja Skanssund från Sorunda-Grödinge — en av få platser där en fast bro och en gratisfärja båda finns kvar parallellt.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Mörkö nås med bilväg och är en stor naturö i sydskärgården. Bra vandringsterräng utan högsäsongsträngseln.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },

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
      { icon: '🚲', name: 'Cykling', desc: 'Kuperat landskap med kustängar och höga klippor mot Mysingen. Cykla längs öns strandvägar och utforska det öppna beteslandskapet. Tillgänglig med bil via bro — ingen båt behövs.' },
      { icon: '🏛', name: 'Marinbasens museum', desc: 'Guidade turer i den underjordiska berganläggningen (bokningsbar).' },
      { icon: '🏊', name: 'Klippbad', desc: 'Fina badplatser längs sydkusten med klara vatten.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bil via tunnel', from: 'Stockholm via Haninge', time: '1 h', desc: 'Muskötunneln (3 km, max 65 m under havsytan, invigd 1964) — Sveriges första undervattenstunnel för bilar, byggd för örlogsbasen.', icon: '🚗' }],
    harbors: [{ name: 'Muskö gästbrygga', desc: 'Enkel brygga nära gamla marininfarten.' }],
    restaurants: [],
    tips: ['Boka marinbas-tur i god tid, populärt sommartid.', 'Ta med fika och grillmat.'],
    related: ['dalaro', 'toro', 'galo'],
    tags: ['marinbas', 'industrihistoria', 'södra', 'klippor'],
    did_you_know: 'Musköbasen är en av världens största underjordiska örlogsbaser — 1,5 miljoner kubikmeter berg sprängdes ut under 19 års byggtid (klar 1969), större volym än Gamla stan i Stockholm. Tunneln dit (Muskötunneln, invigd 1964) går max 65 meter under havsytan.',
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Stora naturytor och marinahistoria — bäst besökt utanför juli.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },

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
    harbors: [{ name: 'Björkö brygga', desc: 'Turistbåtsbrygga med gästmöjligheter.' }],
    restaurants: [{ name: 'Birka Bistro', type: 'Restaurang', desc: 'Enkel mat och fika nära museet.' }],
    tips: ['Boka biljett online — populärt sommartid.', 'Kombinera med Adelsö på samma dagstur.', 'Ta solkräm — lite träd på ön.'],
    related: ['adelsjo', 'vaxholm', 'fjaderholmarna'],
    tags: ['UNESCO', 'vikingar', 'historia', 'Mälaren', 'dagstur'],
    did_you_know: 'Björkö är platsen för Birka, en av Nordens viktigaste vikingatida handelsstäder. UNESCO-platsen är aktiv arkeologisk utgrävning än idag.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Maj–Juni',
      bestReason: 'Museet och de arkeologiska guidningarna öppnar i maj. Välj juni för turer utan köer och med plats på M/S Birka.',
      warning: 'Museum och guidade turer är stängda oktober–april.',
      months: ['off','off','off','off','open','open','peak','peak','open','limited','off','off'],
    },
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
      { icon: '🚲', name: 'Cykling', desc: 'Cykla runt Adelsö ringväg och besök världsarvet Hovgården med utsikt mot Birka. Hyrcyklar på ön via Adelsö Rent-A-Bike. Nås med bilfärja från Sjöängen, Munsö.' },
      { icon: '👑', name: 'Hovgårdens kungsgård', desc: 'Gamla kungsgården med utsikt mot Birka och Mälaren.' },
      { icon: '⛪', name: 'Adelsö kyrka', desc: 'Romansk medeltidskyrka från slutet av 1100-talet, byggd som sockenkyrka och husfromskyrka för kungsgården Alsnö hus.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Bilfärja', from: 'Munsö', time: '10 min', desc: 'Kort bilfärjeöverfart till Adelsö.', icon: '⛴' }],
    harbors: [{ name: 'Adelsö gästbrygga', desc: 'Enkel brygga med plats för ett dussin båtar.' }],
    restaurants: [],
    tips: ['Kombinera med Björkö/Birka på samma dag.', 'Hyr cykel för att utforska hela ön.'],
    related: ['bjorko', 'vindo', 'fjaderholmarna'],
    tags: ['kungsgård', 'historia', 'Mälaren', 'medeltid', 'cykling'],
    did_you_know: 'Adelsö hyser Hovgården — en kungsgård från vendel- och vikingatiden — och tillsammans med Birka på grannön Björkö är platsen sedan 1993 upptagen på UNESCO:s världsarvslista.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Maj–Juni',
      bestReason: 'Kombinera med Björkö/Birka — bäst i maj och juni innan trängseln. Kulturlandskapet med utsikt mot Birka är vackrast när löven slår ut.',
      months: ['off','off','off','off','open','open','peak','peak','open','limited','off','off'],
    },
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
      { icon: '🚲', name: 'Cykling', desc: 'Nås med buss och bil utan båt. Värmdöleden (25 km, lätt) passerar över Ingarö. Bra cykelleder längs ön, nära Stockholm — perfekt för en cykeldag utan färja.' },
      { icon: '🏊', name: 'Bad', desc: 'Flertalet badplatser med klara vatten och klippor.' },
    ],
    accommodation: [{ name: 'Ingarö Camping', type: 'Camping', desc: 'Välskött campingplats vid vattnet.' }],
    getting_there: [{ method: 'Bil/bro', time: '45 min', desc: 'Via Gustavsbergsleden, bro till Ingarö.', icon: '🚗' }],
    harbors: [{ name: 'Brunns hamn', desc: 'Populär gästhamn med full service.', fuel: true, service: ['El', 'Vatten', 'Duschar'] }],
    restaurants: [{ name: 'Ingarö Krog', type: 'Restaurang', desc: 'Skärgårdskrog med lokalt fångad fisk.' }],
    tips: [
      'Populärt utflyktsmål för stockholmare — undvik högsommarhelger i juli om du vill ha lugn och ro.',
      'Buss 428 från Slussen (via Gustavsberg) når Ingarö — bra alternativ utan bil och ganska snabbt.',
      'Velamsunds naturreservat på Ingarö har markerade leder med fina utsiktspunkter — besök tidigt på dagen.',
    ],
    related: ['vindo', 'gallno', 'moja'],
    tags: ['tillgänglig', 'skog', 'segling', 'bad', 'mellersta'],
    did_you_know: 'Ingarö är känt för att ha ett av Stockholms läns varmaste badvatten om sommaren — skyddade vikar värms snabbt upp av solen.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Stor ö med bil- och busstillgång. Fin natur och stränder hela säsongen — utan juliträngseln.',
      months: ['limited','limited','off','limited','open','open','peak','peak','open','open','limited','off'],
    },

  },

  {
    slug: 'svenska-hogarna',
    name: 'Svenska Högarna',
    region: 'norra',
    regionLabel: 'Norra ytterskärgården',
    emoji: '🪨',
    tagline: 'Norra ytterskärgårdens ostligaste utpost — Heidenstam-fyr och naturreservat',
    description: [
      'Svenska Högarna är en ögrupp i Norrtälje kommun, längst österut i Stockholms ytterskärgård, ca 18 distansminuter rakt öster om Möjas nordspets. Ön nämns redan 1488 i skrifter från Julita kloster, då som kronohamnsfiske där munkar bytte till sig saltad strömming mot avlat.',
      'På Storön byggdes 1855 en träbåk som 1874 ersattes av en järnfyr ritad av Gustaf von Heidenstam, den enda Heidenstam-fyren i Stockholms skärgård. Fyrtornet tillverkades på Ludvigsbergs Verkstad i Stockholm. Fyren automatiserades 1966 och avbemannades 1968.',
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
    harbors: [{ name: 'Svenska Högarnas naturhamn', desc: 'Liten skyddad vik på Storön. Endast i gott väder.' }],
    restaurants: [],
    tips: ['Kontrollera SMHI noggrant — vid sydväst eller ostlig kuling är hamnen svår att lämna.', 'Fulltanka i Sandhamn eller Möja innan avfärd.', 'Naturreservatets regler gäller — respektera fågelhäckningen; perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltar och föreskrifter.'],
    related: ['sandhamn', 'rodloga', 'huvudskar'],
    tags: ['ytterskärgård', 'heidenstam', 'fyr', 'naturreservat', 'segling'],
    did_you_know: 'Svenska Högarna är den enda platsen i Stockholms skärgård där det står en Heidenstam-fyr — Gustaf von Heidenstams banbrytande öppna järntornkonstruktion (samma typ som Pater Noster utanför Marstrand). Fyren restes 1874 och tillverkades på Ludvigsbergs Verkstad i Stockholm.',
    seasonal: {
      open: 'Juni–Augusti',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Gotland Runt-perioden: seglartäthet och festivalstämning ute i ytterskärgården.',
      warning: 'Inga reguljära förbindelser. Kräver erfaren besättning och god väderprognos. Fågelskydd begränsar landstigning april–mitten av juni.',
      months: ['off','off','off','off','off','limited','peak','open','limited','off','off','off'],
    },

  },

  {
    slug: 'huvudskar',
    name: 'Huvudskär',
    region: 'södra',
    regionLabel: 'Södra ytterskärgården',
    emoji: '🏮',
    tagline: 'Gammal lotsplats i ytterskärgården mellan Sandhamn och Landsort',
    description: [
      'Huvudskär ligger i yttersta havsbandet, ungefär mitt emellan Sandhamn och Landsort och utgör skärgårdens sydostliga utpost från Ornö-området. Ön består av tre större skär, Ålandsskär, Lökskär och Manskär, plus grupper av mindre skär som tillsammans skyddar den naturliga hamnen på Ålandsskärs insida.',
      'En signalstång och lotsvaktstuga uppfördes 1861 och en brygga 1865. Fram till 1881 var Huvudskär uppassningsställe under Dalarö lotsplats; därefter blev ön egen lotsplats med tre lotsar i fast tjänst, engelska ångare och segelfartyg som sökte sig upp i Östersjön gjorde stationen nödvändig. Lotsplatsen lades ned 1939 och fram till 1925 fanns även tullbevakning på ön.',
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
    harbors: [{ name: 'Huvudskärs naturhamn', desc: 'Välskyddad naturhamn mellan Ålandsskär och övriga skär.' }],
    restaurants: [],
    tips: ['Vid sydväst är det svårt att lämna hamnen — kontrollera SMHI noga innan avfärd.', 'Ta med all proviant — ingen service finns.', 'Lotshusen sköts av Skärgårdsstiftelsen — respektera anvisningar.'],
    related: ['sandhamn', 'landsort', 'svenska-hogarna'],
    tags: ['ytterskärgård', 'lotsplats', 'naturhamn', 'segling', 'södra'],
    did_you_know: 'Huvudskär var självständig lotsplats med tre fast anställda lotsar från 1881 till 1939 — anlagd för att möta de engelska ångare och segelfartyg som ökade trafiken till Stockholm under sent 1800-tal.',
  },

  {
    slug: 'ekno',
    name: 'Eknö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌿',
    tagline: 'Liten bilfri ö i mellersta skärgården med historisk bebyggelse',
    description: [
      'Eknö är en liten bilfri ö i Stockholms mellersta skärgård, i Värmdö kommun. Bebyggelsen är främst sommarstugor och permanentboende på små gårdar, service är begränsad och det går inga reguljära turistförbindelser.',
      'Ön har lång bosättningshistoria. Redan på 1500-talet fanns det familjer som levde här på fiske, jakt och småbruk. Sommaren 1719 brände den ryska galärflottan ner samtliga sex gårdar på Eknö under "Rysshärjningarna", ett öde som drabbade flera öar i området.',
      'Eknö passar för seglare som vill ankra i en lugn naturhamn under en längre tur, eller för dem som har eget boende på ön.',
    ],
    facts: { travel_time: 'Cirka 2 h med egen båt från Stavsnäs', character: 'Liten, bilfri, sommarstugor', season: 'Maj–september', best_for: 'Naturvistelse, segling, sommarboende' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar i blandskog längs kusten.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Mindre klippbadsplatser längs öns kust.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs', desc: 'Inga reguljära turlinjer.', icon: '⛵' }],
    harbors: [{ name: 'Eknö brygga', desc: 'Liten brygga med begränsat antal platser.' }],
    restaurants: [],
    tips: ['Ta med all proviant — ingen butik finns.', 'Respektera privata sommartomter.'],
    related: ['namdo', 'gallno', 'moja'],
    tags: ['liten ö', 'bilfri', 'sommarstugor', 'mellersta'],
    did_you_know: 'Sommaren 1719 brände den ryska galärflottan ner alla sex gårdarna på Eknö under det som kallas Rysshärjningarna — en serie övergrepp i Stockholms skärgård under stora nordiska kriget.',
  },

  {
    slug: 'hasselo',
    name: 'Hasselö',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌻',
    tagline: 'Liten ö i mellersta skärgården nordväst om Sandhamn',
    description: [
      // UPPMÄTT: OSM-brygga Hasselö 59,317N 18,845E — 2,8 NM nordväst om Sandhamn; ferry_terminal enligt OSM (2026-08-23)
      'Hasselö är en cirka 1,5 km lång ö i Stockholms mellersta skärgård, belägen runt tre sjömil nordväst om Sandhamn med Kanholmsfjärden norr om sig och Eknösundet i söder. Läget gör den till ett naturligt mellansteg för seglare som rör sig mellan Sandhamn och de norra öarna.',
      'Ön har egen brygga och trafikeras av Waxholmsbolaget — en sällsynthet bland de mindre öarna i mellersta skärgården. Service är begränsad och vardagslivet här är stilla, men det är just det som gör Hasselö attraktiv för den som söker ett lugnt alternativ till Sandhamns sommarvimmel.',
      'Naturmarken dominerar öns inre med barrskog och öppna klipphällar. Ankringsplatsen på nordvästsidan ger bra skydd vid de vanligaste vindriktningarna och klipporna längs östsidan är rena och inbjudande för bad.',
      'Hasselö är ön du väljer när du vill komma bort från det du åkte till Sandhamn för att undvika. Tyst, enkel och genuint skärgård.',
    ],
    facts: { travel_time: '3–4 h med segelbåt från Dalarö', character: 'Liten, stillsam, naturhamn', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Rena vatten längs öns klippkust.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn på nordvästsidan.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Dalarö / Utö', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Hasselö naturhamn', desc: 'Liten skyddad ankringsplats på nordvästsidan.' }],
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
    tagline: 'Klippig ö söder om Nämdö — i Nämdöskärgårdens nationalpark',
    description: [
      // KÄLLA: sverigesnationalparker.se — Bullerö naturreservat uppgick i Nämdöskärgårdens nationalpark när den bildades 2025 (hämtad 2026-08-19)
      'Ormskär ligger i Skoboraden söder om Nämdö i Stockholms mellersta skärgård. Den norra delen av ön ingår i Nämdöskärgårdens nationalpark och är därmed skyddad. Ön höjer sig oväntat högt ur havet, namnet kommer av huggormarna som funnits på ön.',
      'Klippig kust och stilla vatten i lä-läge präglar miljön. Ön är obebodd och saknar service. Inga reguljära turistförbindelser går hit.',
      'Ormskär passar för seglare som söker en lugn ankringsplats i Bullerö-området. Notera att naturreservatets regler gäller för delar av ön.',
    ],
    facts: { travel_time: 'Cirka 3–4 h med segelbåt från Stavsnäs', character: 'Klippig ö, naturreservat, ankring', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Naturhamn med skydd i lämpliga vindar.' },
      { icon: '🚶', name: 'Klippvandring', desc: 'Korta promenader längs öns klippkust (utanför reservatets skyddade del).' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Ormskärs naturhamn', desc: 'Skyddad ankringsplats.' }],
    restaurants: [],
    tips: ['Norra delen ligger i Nämdöskärgårdens nationalpark — respektera nationalparkens föreskrifter.', 'Ta med all proviant.'],
    related: ['bullero', 'namdo', 'moja'],
    tags: ['naturreservat', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: 'Ormskär är en av flera öar i Skoboraden söder om Nämdö som ingår i Nämdöskärgårdens nationalpark, invigd 2025. Namnet kommer av att det fanns gott om huggormar på ön.',
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
    harbors: [{ name: 'Kanholmens naturhamn', desc: 'Välskyddad ankringsplats på lä-sidan.' }],
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
      'Norrpada är en mindre skärgårdsö i Stockholms mellersta skärgård, i området kring Möja. Ön är obebodd permanent och fungerar primärt som naturhamn för seglare och kajakpaddlare som söker ett ögonblick av stillhet.',
      'Klippig kust, stilla vikar och rikt sjöfågelliv präglar miljön. Fisktärna, silltrut och ejder häckar i området och gör Norrpada till ett tyst men levande naturrum. Inga reguljära förbindelser, ingen service — det är tanken.',
      'För kajakpaddlare är Norrpada ett naturligt mål längs den led som löper mellan Stavsnäs och Möja. Lä-sidan av ön ger skyddat vatten och ankringsplatsen på nordvästsidan rymmer ett tiotal båtar.',
      'Norrpada är inte för den som vill ha bekvämligheter. Det är för den som vill ha tystnad, klipphällar och en morgon utan mobilnät. De som hittar dit sällan glömmer det.',
    ],
    facts: { travel_time: '2–3 h med segelbåt eller kajak från Stavsnäs', character: 'Liten naturö, fågelliv, ankring', season: 'Juni–augusti', best_for: 'Fågelskådning, kajak, segling' },
    activities: [
      { icon: '🦩', name: 'Fågelliv', desc: 'Sjöfåglar som silltrut, fisktärna och ejder häckar i området.' },
      { icon: '🛶', name: 'Kajak', desc: 'Stilla vatten längs öns lä-sida.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt/kajak', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Norrpada naturhamn', desc: 'Liten skyddad ankringsplats.' }],
    restaurants: [],
    tips: ['Respektera fågelhäckningen; perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltar och föreskrifter.', 'Ta med all proviant.'],
    related: ['gallno', 'bullero'],
    tags: ['fågelliv', 'kajak', 'naturhamn', 'mellersta'],
    did_you_know: 'Stockholms skärgård har över 25 000 öar, kobbar och skär — varav många mindre fågelrika öar som Norrpada. Många är skyddade som naturreservat med tillträdesförbud under fågelhäckningen — perioderna varierar mellan områden, vanligen någon gång mellan 1 februari och 31 augusti.',
  },

  {
    slug: 'graskar',
    name: 'Gräskö',
    region: 'norra',
    regionLabel: 'Norra skärgården',
    emoji: '🌿',
    tagline: 'Bebodd skärgårdsö i Norrtälje med anor från 1400-talet',
    description: [
      'Gräskö är en bebodd ö i norra Stockholms skärgård (Roslagens skärgård) i Norrtälje kommun. Cirka 28 personer bor permanent på ön; resten är sommarstugor.',
      'Ön omtalas första gången i skriftliga handlingar 1405. Huvudbyn på ön kallas Gräsken och inkluderar några mindre öar runt omkring som Rågören, Lilla Gåsö, Gåsö och Mäskören.',
      'Gräskö passar både som dagsbesök och övernattning för seglare som söker en levande skärgårdsö med historisk prägel.',
    ],
    facts: { travel_time: 'Färja från Räfsnäs/Furusund', character: 'Bebodd ö, sommarstugor, historiska anor', season: 'Året runt med begränsad trafik vintertid', best_for: 'Skärgårdsboende, segling, ankring' },
    activities: [
      { icon: '🚶', name: 'Naturpromenader', desc: 'Stigar längs öns kustlinje.' },
      { icon: '⛵', name: 'Ankring', desc: 'Skyddade vikar runt ön.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Färja', from: 'Räfsnäs / Furusund', desc: 'Färjetrafik året runt; vintertid beställningstrafik via M/S Riddarfjärden på Rödlöga-traden via Gräskö.', icon: '⛴' }],
    harbors: [{ name: 'Gräskös brygga', desc: 'Den bebodda öns anlöpsbrygga.' }],
    restaurants: [],
    tips: ['Respektera privata tomter — många sommarstugor och permanentbo.', 'Kombinera med en tur till närliggande Rödlöga.'],
    related: ['rodloga', 'fejan', 'arholma'],
    tags: ['bebodd', 'historisk', 'norra', 'roslagen'],
    did_you_know: 'Gräskö omtalas första gången i skriftliga handlingar 1405 — en av de äldsta dokumenterade skärgårdsöarna i Norrtälje.',
  },

  {
    slug: 'langviksskaret',
    name: 'Långvikssk​äret',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🌅',
    tagline: 'Övernattningsö med solnedgångsvyer mot Östersjön',
    description: [
      'Långviksskäret i södra skärgården är ett populärt övernattningsalternativ för seglare. Utsikten mot öppet hav och solnedgångarna är svåra att slå.',
      'Långviksskäret kombinerar naturvärdena på ett exponerat läge med möjligheter för enkel ankring. Badplatser och möjligheter för naturupplevelse erbjuds.',
      'Långviksskäret passar för erfarna seglare som letar efter dramatisk natur och spektakulära solnedgångar på väg söderut.'
    ],

    facts: { travel_time: '3 h från Stockholm', character: 'Naturhamn, utsikt, södra', season: 'Juni–september', best_for: 'Segling, övernattning, solnedgång' },
    activities: [
      { icon: '🌅', name: 'Solnedgångsvyer', desc: 'Dramatisk horisont mot öppet hav.' },
      { icon: '⛵', name: 'Ankring', desc: 'Naturlig ankringsplats med bra skydd.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Privat båt', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långviksskärets naturhamn', desc: 'Skyddad vik.' }],
    restaurants: [],
    tips: ['Perfekt för midsommar-firande.'],
    related: ['fjardlang', 'nattaro', 'landsort'],
    tags: ['solnedgång', 'segling', 'södra', 'naturhamn'],
    did_you_know: 'Stockholms södra ytterskärgård kännetecknas av små klippiga skär — många, som Långviksskäret, fungerar som naturhamnar för seglare och kajakpaddlare som söker en lugn övernattning utanför de större öarna.',
  },

  {
    slug: 'storholmen',
    name: 'Storholmen',
    region: 'mellersta',
    regionLabel: 'Innerskärgården',
    emoji: '🌳',
    tagline: 'Lättillgänglig skärgårdsö med restaurang, vandringsleder och havsbad — 40 minuter från Stockholm',
    description: [
      'Storholmen är en av Lidingös mest omtyckta skärgårdsöar — bebodd, grön och lättillgänglig med reguljär skärgårdsbåt. Ön ligger i innerskärgården och är ett perfekt alternativ för stockholmare som vill ha äkta skärgårdskänsla utan lång restid.',
      'Ön har en varierad natur med lövskog, klipphällar längs kusterna och välmarkerade vandringsleder. En runda runt ön tar ca 2 timmar. Badplatserna på östra och södra sidan är populära sommartid med klart och skyddat vatten.',
      'Historiskt intressant: ön tillhörde Frösviks gård från 1780-talet och har en lång historia av fiske och kustbruk. Fram till 2011 tillhörde ön Vaxholms kommun — en ovanlig kommungränsändring i Stockholms län.',
    ],
    facts: { travel_time: 'Ca 40 min med skärgårdsbåt från Stockholm', character: 'Bebodd ö, grön och lättillgänglig, vandring och bad', season: 'Maj–september', best_for: 'Dagsutflykt, restaurangbesök, vandring, klippbad' },
    activities: [
      { icon: '🚶', name: 'Vandring', desc: 'Markerade stigar runt ön, ca 2 timmar för hela rundan.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Populära badplatser på östra och södra sidan med skyddat vatten.' },
      { icon: '🍽', name: 'Restaurang', desc: 'Säsongsöppen skärgårdsrestaurang — boka bord i förväg i juli.' },
      { icon: '🐦', name: 'Fågelskådning', desc: 'Lövskogen och strandlinjen lockar sjöfåglar och häckande fåglar.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Waxholmsbolaget', from: 'Stockholm (Strömkajen / Nybrokajen)', desc: 'Reguljär skärgårdsbåt sommartid. Kontrollera tidtabell på waxholmsbolaget.se.', icon: '⛴' },
      { method: 'Fritidsbåt', from: 'Lidingö eller valfri brygga', desc: 'Nås enkelt med egen båt. Gästbrygga finns vid huvudbryggan.', icon: '⚓' },
    ],
    harbors: [{ name: 'Storholmens brygga', desc: 'Huvudbrygga med plats för gästande båtar.' }],
    restaurants: [
      { name: 'Storholmens Restaurang', type: 'Skärgårdsmat', desc: 'Säsongsöppen restaurang med skärgårdsmat och utsikt. Populär — boka i förväg under högsäsong.' },
    ],
    tips: [
      'Ta morgonbåten och hinn med lunch på restaurangen — kvällstider är fullbokade i juli.',
      'Vandringen runt ön tar ca 2 timmar — ta med matsäck och bada halvvägs på södra sidan.',
      'Bra alternativ när Fjäderholmarna är överfulla — kortare restid än Vaxholm, färre turister.',
      'Kontrollera aktuell tidtabell på waxholmsbolaget.se — turtätheten varierar under säsongen.',
    ],
    related: ['vaxholm', 'fjaderholmarna', 'moja'],
    tags: ['bebodd', 'lidingö', 'innerskärgård', 'dagstur', 'restaurang', 'vandring', 'bad'],
    did_you_know: 'Storholmen tillhörde Vaxholms kommun fram till 2011 då ön överfördes till Lidingö stad — en av de få kommungränsändringar i Stockholms skärgård under 2000-talet.',
  },

  {
    slug: 'langskar',
    name: 'Långskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '🌅',
    tagline: 'Naturreservat med ett 50-tal öar i Bulleröskärgården',
    description: [
      // OSÄKERT — ATT VERIFIERA: officiella källan (sverigesnationalparker.se) nämner "Långviksskärs naturreservat",
      // inte "Långskärs". Kan vara samma plats eller två olika. Skyddsstatusen här är därför medvetet
      // öppet formulerad tills den är bekräftad med Länsstyrelsen/nationalparken.
      'Långskär omfattar ungefär femtio öar i Stockholms mellersta skärgård, i området kring Bullerö. Sedan 2025 ingår stora delar av den omgivande skärgården i Nämdöskärgårdens nationalpark — kontrollera vad som gäller för just Långskär innan besök.',
      'Området nås lättast med egen båt. Långskär finns bland de fiskehamnar/fiskeskär som omnämns i historiska källor från 1744. Klippig kust och stilla vatten i lä-läge präglar miljön.',
      'Långskär passar för seglare och naturvänner som söker ett ostört område utanför de stora destinationerna i Bullerö-arkipelagen.',
    ],
    facts: { travel_time: 'Cirka 3 h med segelbåt från Stavsnäs', character: 'Naturreservat, ankring, ytterskärgård', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddade ankringsmöjligheter i flera vikar.' },
      { icon: '🌅', name: 'Vyer', desc: 'Öppen horisont mot havet.' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Stavsnäs / Möja', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Långskärs naturhamn', desc: 'Skyddad ankringsplats i lä-läge.' }],
    restaurants: [],
    tips: ['Naturreservat — respektera reservatsreglerna och fågelskyddstiden.', 'Ta med all proviant och färskvatten.'],
    related: ['bullero', 'norrpada', 'moja'],
    tags: ['naturreservat', 'bulleröskärgården', 'mellersta', 'segling'],
    did_you_know: 'Långskär var en av de fiskehamnar som omnämns i historiska källor från 1744 — ett vittnesbörd om skärgårdsfiskets långa tradition i området.',
  },

  {
    slug: 'storskar',
    name: 'Storskär',
    region: 'mellersta',
    regionLabel: 'Mellersta skärgården',
    emoji: '⛵',
    tagline: 'Naturreservat 4 km norr om Möja',
    description: [
      'Storskär är ett naturreservat i Svartlögafjärden, cirka 4 km norr om Möja i Stockholms mellersta skärgård. Reservatet omfattar den södra delen av ön. Naturen är typisk för mellanskärgården, klippor, blandskog och små vikar.',
      'Ön är obebodd och saknar service. Ankringsmöjligheter finns för seglare som söker ett lugnt naturhamnsstopp utanför de större öarna.',
      'Storskär passar för seglare och kajakpaddlare som söker ostörd natur i mellanskärgården.',
    ],
    facts: { travel_time: 'Cirka 1 h med segelbåt från Möja', character: 'Naturreservat, klippor, blandskog', season: 'Juni–augusti', best_for: 'Segling, ankring, naturvistelse' },
    activities: [
      { icon: '⛵', name: 'Ankring', desc: 'Skyddad naturhamn för seglare.' },
      { icon: '🚶', name: 'Naturpromenad', desc: 'Spår genom blandskog och längs klippkust (utanför reservatets skyddade del).' },
    ],
    accommodation: [],
    getting_there: [{ method: 'Egen båt', from: 'Möja / Stavsnäs', desc: 'Inga reguljära förbindelser.', icon: '⛵' }],
    harbors: [{ name: 'Storskärs naturhamn', desc: 'Skyddad ankringsplats.' }],
    restaurants: [],
    tips: ['Södra delen av ön är naturreservat — respektera reservatsreglerna.', 'Ta med all proviant.'],
    related: ['moja', 'kanholmen', 'norrora'],
    tags: ['naturreservat', 'naturhamn', 'mellersta', 'segling'],
    did_you_know: 'Naturen i Storskärs naturreservat är representativ för mellanskärgården och förvaltas av Länsstyrelsen i Stockholms län.',
  },

  // ── Övriga Sverige — Höga Kusten, Gotland m.fl. ────────────────────────────

  {
    slug: 'ulvon',
    name: 'Ulvön',
    region: 'ovriga',
    regionLabel: 'Höga Kusten',
    emoji: '🐟',
    tagline: 'Höga Kustens hjärta — världsarv, surströmming och dramatiska klippor.',
    description: [
      'Ulvön är Höga Kustens mest välkända ö och en av Sveriges bäst bevarade fiskebyar. Två samhällen — Ulvöhamn i norr och Sörvik i söder — lever kvar med ett genuint kustliv i en miljö som inte förändrats nämnvärt på hundra år.',
      'Ön är oupplösligt förknippad med surströmming. Den jästa strömmingen produceras här och exporteras över hela landet. Surströmmingsfabriken i Ulvöhamn är öppen för besök sommartid — luktupplevelsen är garanterad oavsett avstånd.',
      'Höga Kusten är UNESCO-världsarv tack vare en av världens mest dramatiska landhöjningar sedan istiden. Klipporna stiger brant ur havet, skogarna är täta och utsikten från höjderna är enastående. Ulvön är navet i detta landskap.',
    ],
    facts: {
      travel_time: '4–5 h från Stockholm (tåg till Härnösand + buss + färja)',
      character: 'Genuint, vilt, historiskt, surströmming',
      season: 'Maj–September',
      best_for: 'Naturälskare, fiskentusiaster, de som söker äkta kustkultur',
    },
    activities: [
      { icon: '🐟', name: 'Surströmmingsupplevelse', desc: 'Besök surströmmingsfabriken i Ulvöhamn. Smaka om du törs — en klassisk svensk upplevelse.' },
      { icon: '🥾', name: 'Vandring', desc: 'Välmärkta leder längs kusten och upp till klippor med utsikt över Höga Kusten.' },
      { icon: '🏖', name: 'Sandstrand', desc: 'Sälesstranden på södra Ulvön är ovanligt lång för norrlandskusten — ett sällsynt fynd.' },
      { icon: '⛵', name: 'Båtliv', desc: 'Välskyddad gästhamn i Ulvöhamn. Populär etapp för seglare längs norrlandskusten.' },
    ],
    accommodation: [
      { name: 'Ulvö Hotell', type: 'Hotell', desc: 'Öns hotell i Ulvöhamn med havsutsikt och restaurang. Boka i god tid inför sommarsäsongen.' },
      { name: 'Ulvöhamns Camping', type: 'Camping', desc: 'Enkla camingmöjligheter i närheten av hamnen.' },
    ],
    getting_there: [
      { method: 'Tåg + buss + färja', from: 'Stockholm Central', time: '4–5 h', desc: 'SJ tåg till Härnösand, buss mot Docksta, sedan reguljärfärja (M/S Solleftea) till Ulvön (ca 1 h). Färjan går dagligen sommartid.', icon: '🚆' },
      { method: 'Flyg + hyrbil + färja', from: 'Stockholm Arlanda', time: '3 h', desc: 'Flyg till Härnösand/Kramfors Airport, hyrbil till Docksta eller Köpmanholmen, sedan färja till Ulvön.', icon: '✈️' },
      { method: 'Bil + färja', from: 'Stockholm', time: '5–6 h', desc: 'Kör E4 norrut till Docksta (ca 470 km), parkera och ta färjan till Ulvön.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Ulvöhamns Gästhamn', desc: 'Välskyddad hamn med full service. Populär etapp för seglare längs norrlandskusten.', fuel: true, service: ['el', 'vatten', 'bränsle', 'dusch'] },
    ],
    restaurants: [
      { name: 'Ulvö Hotell Restaurant', type: 'Restaurang', desc: 'Husmanskost och lokala råvaror i hamnmiljö. Surströmming serveras förstås på menyn.', slug: 'ulvo-hotell-restaurant' },
    ],
    tips: [
      'Boka färja och boende tidigt — sommarsäsongen på Ulvön är kort och populär.',
      'Ta med myggmedel. Höga Kusten-natten är vacker men myggen är på.',
      'Surströmmingspremiären sker tredje torsdagen i augusti — om du vill delta, planera i god tid.',
      'Ulvökapellet från 1622 är ett av Sveriges äldsta bevarade kustkapell — inte att missa.',
    ],
    related: ['arholma', 'sandhamn', 'landsort'],
    tags: ['höga kusten', 'naturreservat', 'surströmming', 'fiske', 'norrland', 'världsarv', 'sandstrand'],
    insiderTips: [
      'Sälesstranden på södra Ulvön är en av norrlandskustens längsta sandstränder — nästan tropiskt känslig en solig julidag.',
      'Höga Kusten-leden passerar förbi Ulvön och är en av Sveriges mest dramatiska vandringsleder.',
      'Ulvöhamn har ett fiskelägeskapell från 1622 — ett av de äldsta i Sverige.',
    ],
    did_you_know: 'Ulvön kallas "Surströmmingsön" och är hem till en av Sveriges sista aktiva surströmmingsfabriker. Ön nämns i historiska dokument redan på 1500-talet som en viktig fiskehamn längs norrlandskusten.',
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Mitten av Augusti',
      bestReason: 'Surströmmingspremiären sker tredje torsdagen i augusti — ön är livlig, färjan går tätare och det är den mest genuina tidpunkten att besöka Ulvön. Julibadare hittar Sälesstranden på bästa sätt.',
      warning: 'Höga Kusten-mynnet kan ha ojämna väderförhållanden. Kontrollera färjescheman noga — avgångarna är färre utanför högsäsongen och stoppas vid kraftig vind.',
      months: ['off','off','off','off','off','limited','peak','peak','open','limited','off','off'],
    },
  },

  {
    slug: 'gotland',
    name: 'Gotland',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🏰',
    tagline: 'Sveriges största ö — medeltida Visby, kalkstensraukar och Östersjösommar.',
    description: [
      'Gotland är Sveriges mest besökta ö och med goda skäl. Visby är en levande medeltidsstad med en välbevarad ringmur, imponerande kyrkoruiner och ett av Sveriges starkaste restaurangutbud. UNESCO-listade sedan 1995.',
      'Raukar längs kusten — de skulpturala kalkstensformationerna — sandstränder och ett klimat som är märkbart varmare än fastlandet gör Gotland till ett naturligt sommarresemål. Nästan var tredje soltimme i Sverige noteras här.',
      'Gotland är mer än Visby. Landsbygden har egna kvaliteter: vindmöllor, medeltidskyrkor i varje socken, mathantverk i världsklass och ett tempo som saktar ner av sig självt. Fårö, ön norr om Gotland, är Ingmar Bergmans landskap.',
    ],
    facts: {
      travel_time: '3 h med Destination Gotland-färja från Nynäshamn',
      character: 'Kulturellt rikt, soligt, levande, medeltida',
      season: 'April–Oktober (peak juli)',
      best_for: 'Alla — par, familjer, kulturresenärer, matälskare',
    },
    activities: [
      { icon: '🏰', name: 'Visby medeltidsstad', desc: 'Utforska UNESCO-listade ringmuren, kyrkoruin­er och det medeltida gatunätet. Bäst tidigt på morgonen eller sent på kvällen.' },
      { icon: '🪨', name: 'Raukar', desc: 'Kalkstensformationer längs kusten. Langhammar på Fårö och Hoburgen i söder är de mest spektakulära.' },
      { icon: '🏖', name: 'Stränder', desc: 'Tofta strand, Ljugarn och Sudersand på Fårö. Gotlands vatten är varmt och grunt — perfekt för barnfamiljer.' },
      { icon: '🚲', name: 'Cykling', desc: 'Platt landskap och välskyltade cykelvägar — Gotland är Sveriges bästa cykelö. Hyr i Visby och cykla ut på landsbygden.' },
      { icon: '🍷', name: 'Mat & dryck', desc: 'Gotlandslammets hemö. Världsklassrestauranger i Visby, lokala vingårdar och hantverk­sbryggerier.' },
    ],
    accommodation: [
      { name: 'Clarion Hotel Wisby', type: 'Hotell', desc: 'Mitt i Visby med pool och utsikt mot ringmuren. Klassiker för sommarvisiter.' },
      { name: 'Strandridargården', type: 'Hotell', desc: 'Spa-hotell vid stranden i Tofta — perfekt om du vill kombinera Visby med stranddagar.' },
      { name: 'Fårösund Camping & Stugby', type: 'Camping', desc: 'Välskött camping vid Fårösund med närheten till Fårö och Bergmans landskap.' },
    ],
    getting_there: [
      { method: 'Destination Gotland-färja', from: 'Nynäshamn', time: '3 h', desc: 'Avgår flera gånger per dag. Bil eller gående passagerare. Boka bil minst 2–3 månader i förväg under juli.', icon: '⛴' },
      { method: 'Destination Gotland-färja', from: 'Oskarshamn', time: '3,5 h', desc: 'Alternativ rutt söderifrån. Smidigare om du reser från Sydsverige eller Kalmar-hållet.', icon: '⛴' },
      { method: 'Flyg', from: 'Stockholm Arlanda / Bromma', time: '55 min', desc: 'BRA och SAS flyger dagligen sommartid. Snabbaste alternativet — men dyrare och utan bil.', icon: '✈️' },
    ],
    transport_meta: {
      from_city_min: 180,
      nearest_hub: 'Nynäshamn',
      from_nearest_hub_min: 180,
      operator: 'Destination Gotland',
      frequency: 'Flera avgångar dagligen',
      booking_url: 'https://www.destinationgotland.se',
      car_parking: 'Parkering finns vid Nynäshamns färjeterminal (avgift). I Visby — planera för trängsel i juli.',
    },
    harbors: [
      { name: 'Visby Gästhamn', desc: 'Stor välutrustad gästhamn direkt i Visby. Bränsle, service och gångavstånd till allt. Boka plats i förväg under högsäsong.', fuel: true, service: ['el', 'vatten', 'bränsle', 'pump-out', 'dusch', 'wi-fi'] },
      { name: 'Klintehamns Gästhamn', desc: 'Lugn hamn på Gotlands västkust. Bra alternativ till Visby om du vill undvika folkvimlet.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Gutekällaren', type: 'Restaurang', desc: 'Inne i Visby ringmur. Gotlandslamm, rödspätta och lokalt hantverk­söl i medeltida valvmiljö.', slug: 'gutekallaren-gotland' },
      { name: 'Bakfickan', type: 'Bistro', desc: 'Enkel bistro i Visby med lokala råvaror och sommarvibb. Populär för lunch.', slug: 'bakfickan-gotland' },
      { name: 'Krakas Krog', type: 'Restaurang', desc: 'Landsbygdskrog utanför Visby. Starka lokala råvaror — bokningsbar sommarupplevelse.', slug: 'krakas-krog-gotland' },
    ],
    tips: [
      'Boka Destination Gotland-färjan minst 2–3 månader i förväg om du reser i juli med bil.',
      'Almedalsveckan (tidig juli) gör Visby fullbokat och hektiskt — undvik om du inte är där för det.',
      'Hyr cykel och ta dig till Fårö för en dag. Bergmans landskap, raukar och en annan tid.',
      'Gotland har 93 medeltidskyrkor — fler än något annat landskap i Sverige. Ta en spontan av­stickare.',
    ],
    related: ['sandhamn', 'arholma', 'ulvon'],
    tags: ['gotland', 'visby', 'medeltid', 'stränder', 'raukar', 'cykling', 'mat', 'världsarv', 'färja'],
    insiderTips: [
      'Gotland har det varmaste klimatet i Sverige med flest soltimmar. Medeltemperaturen i juli är 2–3 grader högre än Stockholm.',
      'Fårö, ön norr om Gotland, är känd som Ingmar Bergmans hemö och har en av landets finaste raukmiljöer vid Langhammar.',
      'Gotlands 93 medeltidskyrkor gör landskapet unikt i Europa — de flesta är öppna och fria att besöka.',
      'Restaurangscenen i Visby är oproportionerligt stark för en stad med 25 000 invånare — sommartid håller den Stockholmsnivå.',
    ],
    activity_meta: {
      cykel: { rental: true, notes: 'Gotland är Sveriges bästa cykelö med välskyltade leder och relativt plant landskap.' },
      bad: { beaches: ['Tofta strand', 'Ljugarn', 'Sudersand (Fårö)'] },
    },
    did_you_know: 'Gotlands ringmur runt Visby är en av världens bäst bevarade medeltida stadsmurar. Den är nästan 3,4 km lång, har 44 torn och är i det närmaste komplett sedan 1100-talet.',
    seasonal: {
      open: 'April–Oktober',
      peak: 'Juli–mitten av Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: allt öppet, sommarens kvalitet utan trängseln och de skyhöga priserna. September: badbart vatten, tomma restauranger, lägre hotellpriser och ett lugnare Visby.',
      warning: 'Boka Destination Gotland-färjan minst 2–3 månader i förväg om du reser i juli med bil. Almedalsveckan (tidig juli) ger fullbokat Visby och höga priser.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },

  {
    slug: 'oland',
    name: 'Öland',
    region: 'ovriga',
    regionLabel: 'Öland',
    emoji: '🌾',
    tagline: 'Solens och vindarnas ö — UNESCO-alvaret, 400 väderkvarnar och Östersjöns längsta sandstrand.',
    description: [
      'Öland är Sveriges längsta och näst största ö och ett av landets mest omtyckta sommarmål. Den 137 km långa ön förbinds med fastlandet via Ölandsbron från Kalmar — en av Europas längsta broar. Borgholm är den lilla huvudstaden med ett sommarliv i särklass.',
      'Södra Ölands odlingslandskap är UNESCO-världsarv sedan 2000. Det så kallade Alvaret — en unik, kalkstensbaserad stäpp — är en av Europas mest sällsynta naturmiljöer och hem till hundratals växt- och fågelarter. Mer än 400 väderkvarnar ger Öland sin karaktäristiska siluett.',
      'I norr väntar Böda Sand, en av Skandinaviens längsta sandstränder, omgiven av Trollskogen — en vresig bokskog som ger en närmast magisk atmosfär. Eketorps ringborg från järnåldern och Borgholms slottsruin är välbevarade pärlor längs landsvägen.',
    ],
    facts: {
      travel_time: '3,5–4 h med bil från Stockholm (E4 + E22 via Kalmar)',
      character: 'Soligt, öppet, historiskt, naturvård',
      season: 'Maj–September (peak juli–aug)',
      best_for: 'Familjer, naturälskare, historia, cykling, strand',
    },
    activities: [
      { icon: '🌾', name: 'Alvaret', desc: 'Vandra i det UNESCO-listade odlingslandskapet i söder — en unik kalkstäpp med sällsynt flora.' },
      { icon: '🏰', name: 'Borgholms slottsruin', desc: 'En av Skandinaviens största slottsruiner, med utsikt över sundet mot fastlandet.' },
      { icon: '🏖', name: 'Böda Sand', desc: 'Norra Ölands långa sandstrand — ett av Sveriges populäraste badsställen.' },
      { icon: '🌲', name: 'Trollskogen', desc: 'Vresig bokskog på norra spetsen med knöliga, vindpinade träd och en närmast sagolik stämning.' },
      { icon: '⛺', name: 'Eketorps ringborg', desc: 'Rekonstruerad järnåldersby och fornborg från 400-talet. Levande historia för hela familjen.' },
      { icon: '🚲', name: 'Cykling', desc: 'Platt landskap och välskyltad cykelväg längs hela ön. Hyr cykel i Borgholm eller Mörbylånga.' },
    ],
    accommodation: [
      { name: 'Borgholms Stadshotell', type: 'Hotell', desc: 'Klassiskt hotell i centrum av Borgholm med terrass och sommarstämning.' },
      { name: 'Böda Sand Camping', type: 'Camping', desc: 'Stor välskött camping direkt vid stranden i norra Öland. Boka i god tid.' },
      { name: 'Halltorps Gästgiveri', type: 'Hotell', desc: 'Historisk herrgård i ek- och bokskogen nära Borgholm. Stillsamt och naturnära.' },
    ],
    getting_there: [
      { method: 'Bil via Ölandsbron', from: 'Stockholm', time: '3,5 h', desc: 'Kör E4 söderut till Södertälje, sedan E22 via Norrköping och Kalmar. Ölandsbron tar dig direkt in på ön. Kostnads- och tullfri bro.', icon: '🚗' },
      { method: 'Tåg + buss', from: 'Stockholm Central', time: '4–5 h', desc: 'SJ tåg till Kalmar (ca 3 h), sedan buss 101 mot Borgholm via Ölandsbron (45 min).', icon: '🚆' },
      { method: 'Flyg till Kalmar', from: 'Stockholm Arlanda', time: '3 h totalt', desc: 'BRA flyger Stockholm–Kalmar (55 min), sedan hyrbil eller taxi över bron (15 min).', icon: '✈️' },
    ],
    harbors: [
      { name: 'Borgholms Gästhamn', desc: 'Välutrustad gästhamn i Borgholm med el, vatten och service. Nära centrum och slottsruinen.', fuel: true, service: ['el', 'vatten', 'bränsle', 'dusch'] },
      { name: 'Köpingsvik Gästhamn', desc: 'Lugn hamn på nordvästra Öland. Populär bland seglare på väg norrut längs kusten.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Hamnkrogen Borgholm', type: 'Restaurang', desc: 'Klassisk hamnkrog med lokala råvaror — ölandslamm, abborre och rödspätta.', slug: 'hamnkrogen-borgholm' },
      { name: 'Källarporten', type: 'Restaurang', desc: 'Inne i Borgholms slottsruin. Unik atmosfär med historisk inramning.', slug: 'kallarporten-borgholm' },
    ],
    tips: [
      'Boka camping och hotell i god tid — Öland är fullbokat i juli och första halvan av augusti.',
      'Kör eller cykla landsvägarna längs östra och västra kusten — vyn över Kalmarsund är fantastisk.',
      'Solliden Palace (kungafamiljens sommarresidens) har öppna trädgårdar — värt ett besök.',
      'Besök Eketorps ringborg med barn — rekonstruktionen är imponerande och pedagogisk.',
    ],
    related: ['gotland', 'ulvon'],
    tags: ['öland', 'alvaret', 'böda sand', 'väderkvarnar', 'borgholm', 'unesco', 'strand', 'historia', 'cykling'],
    insiderTips: [
      'Alvaret blommar som vackrast i juni — orkidéer, backsippa och andra sällsynta arter täcker kalkstenen.',
      'Trollskogen på norra spetsen är allra vackrast i morgondimma eller solnedgång.',
      'Ölandsmarknaden i Borgholm (tidig juli) är en av Sveriges äldsta marknader och ett lokalt evenemang i särklass.',
    ],
    did_you_know: 'Öland har fler soltimmar per år än nästan hela övriga Sverige — och fler än många platser på kontinenten. Klimatet liknar centrala Europa mer än norra Skandinavien.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: alvaret blommar med orkidéer och backsippa, stränder är tomma och priser rimliga. September: badbart vatten fortfarande, fullständig lugn och naturen övergår i höstfärger.',
      warning: 'Juli fullbokas tidigt — camping och hotell i Borgholm ska bokas månader i förväg. Ölandsbron kan ha kö på fredag eftermiddag i juli.',
      months: ['off','off','off','limited','open','open','peak','peak','open','limited','off','off'],
    },
  },

  // ── Göteborgs södra skärgård (Styrsöbolaget) ─────────────────────────────

  {
    slug: 'branno',
    name: 'Brännö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '💃',
    tagline: 'Folkdansön — hambo på bryggan varje fredag och ett genuint Göteborgsliv utanför staden.',
    description: [
      'Brännö är känd i hela Göteborg för en sak: folkdansen på bryggan varje fredag kväll sommartid. Sedan decennier samlas hundratals människor på Brännö Brygga för att dansa hambo och polska i solnedgången — en tradition utan like i Sverige.',
      'Ön är den folkrikaste i södra skärgården utanför Donsö, med ett genuint ösamhälle och en atmosfär som är svår att beskriva utan att ha upplevt den. Ingen bil får köras på ön — transporter sker med moped och kärra.',
      'Brännö nås med Styrsöbolaget från Saltholmen (spårvagn 11 från centrum). Restid ca 30 minuter. En fullständigt annan värld, 8 km från Göteborg.',
    ],
    facts: {
      travel_time: '30 min med färja från Saltholmen (spårvagn 11 från Göteborg C)',
      character: 'Autentiskt, folkligt, levande, bilfritt',
      season: 'Maj–September (folkdansen: juni–aug)',
      best_for: 'Göteborgare som vill komma bort, dansintresserade, naturälskare',
    },
    activities: [
      { icon: '💃', name: 'Folkdans på Brännö Brygga', desc: 'Varje fredag kväll i sommar (juni–aug). Hambo, polska och glädje — kom tidigt för att få plats.' },
      { icon: '🏖', name: 'Bad', desc: 'Flera badplatser runt ön. Rävholmen på östra sidan är populärast.' },
      { icon: '🥾', name: 'Vandring', desc: 'Välskyltade stigar runt hela ön. Vacker västkustsnatur med klippor och hedar.' },
      { icon: '⛵', name: 'Gästhamn', desc: 'Välutrustad gästhamn i Rödsten på östra sidan.' },
    ],
    accommodation: [
      { name: 'Brännö Värdshus & Pensionat', type: 'Pensionat', desc: 'Öns enda övernattning — enkelt, genuint och fullt sommartid. Boka långt i förväg.' },
    ],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '50 min totalt', desc: 'Spårvagn linje 11 till Saltholmen (25 min), sedan Styrsöbolagets linje 281/283 till Brännö (25–30 min). Avgår ofta sommartid.', icon: '🚋' },
      { method: 'Bil + färja', from: 'Göteborg', time: '40 min', desc: 'Kör till Saltholmen (parkering finns), ta färjan. Bilar får ej tas med till ön.', icon: '🚗' },
    ],
    harbors: [
      { name: 'Rödstens Gästhamn', desc: 'Skyddad gästhamn på östra sidan. El och vatten. Populär sommarhamn.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Brännö Värdshus', type: 'Krog', desc: 'Klassisk ömat — räkor, sill och husmanskost i ösamhällets mitt.', slug: 'branno-vardshus' },
    ],
    tips: [
      'Folkdansen på fredag kväll är gratis — men kom 30 min tidigt för att få plats vid bryggan.',
      'Inga bilar på ön: lämna bilen i Saltholmens parkeringshus och njut av bilfrihetens lugn.',
      'Ta med picnic — det finns begränsad matservice utanför värdshuset.',
    ],
    related: ['styrso', 'vrango', 'donso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'folkdans', 'bilfritt', 'styrsöbolaget', 'västkust'],
    did_you_know: 'Folkdansen på Brännö Brygga startade på 1930-talet och har hållits nästan varje fredag sommartid sedan dess. Det är en av Göteborgs mest omtyckta sommartraditioner.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Göteborgsarkipelagen har service året om. Undvik juli — välj juni för bästa möjliga upplevelse med allt öppet.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },

  },

  {
    slug: 'styrso',
    name: 'Styrsö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🌿',
    tagline: 'Göteborgs södra skärgårds hjärta — vacker natur, topprankad restaurang och tyst ölivstempo.',
    description: [
      'Styrsö är den folkrikaste ön i södra skärgården med cirka 1 500 fast bosatta och den naturliga knutpunkten i arkipelagen. Ön har skola, bibliotek, mataffär och samhällsservice — ett komplett ösamhälle utan bilar.',
      'Restaurang Styrsö Bratten är en av Göteborgs mest hyllade — trots (eller tack vare) läget ute i skärgården. Hit reser göteborgare enbart för maten: nordisk mat gjord på råvaror från havet och trädgården.',
      'Styrsö södra spets, Tången, är ett naturreservat med fri utsikt över Kattegatt. Att sitta där i solnedgången är en av Göteborgstraktens finest.',
    ],
    facts: {
      travel_time: '25–35 min med Styrsöbolaget från Saltholmen',
      character: 'Levande, naturskön, gastronomisk, bilfritt',
      season: 'Hela året (topprestaurang öppen sommarsäsongen)',
      best_for: 'Matälskare, barnfamiljer, de som vill bo kvar i skärgården',
    },
    activities: [
      { icon: '🍽', name: 'Styrsö Bratten', desc: 'En av Göteborgs bästa restauranger. Nordisk mat, lokala råvaror, fantastisk utsikt. Boka månader i förväg.' },
      { icon: '🌿', name: 'Tångens naturreservat', desc: 'Södra spetsen med fri havsutsikt. Vandring genom ljunghed och klippor.' },
      { icon: '🏖', name: 'Bad', desc: 'Badklippor runt hela ön. Brevik på östra sidan populärast.' },
      { icon: '⛵', name: 'Gästhamn', desc: 'Gästhamn i Styrsö Tången med service sommartid.' },
    ],
    accommodation: [
      { name: 'Styrsö Seglora Pensionat', type: 'Pensionat', desc: 'Enkelt och charmigt pensionat med trädgård. Familjedrivet och mysigt.' },
    ],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '50–60 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 281/282/283. Avgångstider på styrsöbolaget.se.', icon: '🚋' },
    ],
    harbors: [
      { name: 'Styrsö Tångens Gästhamn', desc: 'Gästhamn vid södra spetsen. Bra utgångspunkt för segling längs kusten.', fuel: false, service: ['el', 'vatten'] },
    ],
    restaurants: [
      { name: 'Styrsö Bratten', type: 'Topprestaurang', desc: 'Nordens kök i skärgårdsidyll. Säsongsmeny, lokala råvaror, en av Göteborgs bästa. Boka tidigt.', slug: 'styrso-bratten' },
    ],
    tips: [
      'Styrsö Bratten bokar upp månader i förväg under sommaren — gå in på deras hemsida direkt.',
      'Tångens naturreservat är gratis och öppet dygnet runt — ta med termos och se solnedgången.',
      'Mataffären på Styrsö håller rimliga tider sommartid — handla proviant för dagen.',
    ],
    related: ['branno', 'vrango', 'donso'],
    tags: ['göteborg', 'södra skärgård', 'restaurang', 'bilfritt', 'styrsöbolaget', 'naturreservat'],
    did_you_know: 'Styrsö har haft fast befolkning sedan medeltiden. Ön var länge ett centrum för fiske och båtbyggeri längs Göteborgs kust.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Maj–Juni eller September',
      bestReason: 'Bilfri klassiker i Göteborgsskärgården med reguljär spårvagnsfärja. Funkar utmärkt utanför högsäsong.',
      months: ['limited','limited','limited','open','open','open','peak','peak','open','open','limited','limited'],
    },

  },

  {
    slug: 'vrango',
    name: 'Vrångö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🦅',
    tagline: 'Södra skärgårdens yttersta punkt — naturreservat, vild klippkust och havets ständiga närvaro.',
    description: [
      'Vrångö är den sydligaste bebodda ön i Göteborgs södra skärgård, med knappt 150 fast bosatta året om. Öns södra del är naturreservat och skyddat fågelområde — en vild, orörd klippkust med utsikt rakt ut mot Nordsjön.',
      'Känslan på Vrångö är annorlunda jämfört med Brännö och Styrsö. Lugnet är mer påtagligt, turistströmmen lättare och naturen tar mer plats. Det är hit göteborgare åker när de verkligen vill slita sig från stadens tempo.',
      'Inga bilar. Ingen kommersiell turism att tala om. En liten mataffär, ett kafé och naturens egna ljud.',
    ],
    facts: {
      travel_time: '45–55 min med Styrsöbolaget från Saltholmen',
      character: 'Vilt, stilla, natur, ytterst',
      season: 'Maj–September (fågelskydd: undvik klippreservatet under häckningen — datumen står på skyltarna)',
      best_for: 'Naturälskare, fågelskådare, de som söker verkligt lugn',
    },
    activities: [
      { icon: '🦅', name: 'Naturreservat i söder', desc: 'Vild klippkust och rikt fågelliv. Promenadstigen runt sydspetsen ger panoramautsikt mot havet.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad på östra och norra sidan. Vattnet är klart och kallt.' },
      { icon: '🚶', name: 'Vandring', desc: 'Välmärkta stigar runt ön — ca 6 km runt hela Vrångö.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '70–80 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 281/283 via Brännö och Styrsö till Vrångö. Kontrollera tidtabell på styrsöbolaget.se.', icon: '🚋' },
    ],
    harbors: [
      { name: 'Vrångö Gästhamn', desc: 'Liten gästhamn på norra sidan. Enkelt men välskyddat läge.', fuel: false, service: ['el'] },
    ],
    restaurants: [
      { name: 'Vrångö Café & Kiosk', type: 'Kafé', desc: 'Enkelt sommarcafé med glass, kaffe och enklare mat. Öppet sommartid.', slug: 'vrango-cafe' },
    ],
    tips: [
      'Gå hela vägen till sydspetsen — utsikten mot Nordsjön och de yttre skären är enastående.',
      'Fågelskyddsperioden gäller i reservatets klippzoner — datumen står på skyltarna och i föreskrifterna, vanligen någon gång mellan 1 februari och 31 augusti: håll dig till stigen.',
      'Ta med egen mat — utbudet är mycket begränsat på ön.',
    ],
    related: ['branno', 'styrso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'naturreservat', 'bilfritt', 'fågelliv', 'ytterst'],
    did_you_know: 'Vrångö naturreservats klippzoner är klassade som riksintresse för naturvård och hyser häckande skarvar, ejdrar och tärnor.',
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Juni: reservatets fågelskyddsperiod börjar avta, havet är tyst och naturupplevelsen är ostörd. September: klart höstljus, inga turistmassorna och den vilda klippkusten på sitt bästa.',
      warning: 'Fågelskyddsperiod i klippreservatet — datumen står på skyltarna och i länsstyrelsens föreskrifter, vanligen någon gång mellan 1 februari och 31 augusti; håll dig till markerade stigar. Cafét är bara öppet sommartid; ta med egen mat.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  {
    slug: 'donso',
    name: 'Donsö',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '⚓',
    tagline: 'Rederiornas ö — ett litet samhälle med stor historia inom sjöfart och en av Göteborgs finaste hamnar.',
    description: [
      'Donsö är känt som "rederiornas ö". Trots att bara 1 500 personer bor här äger donsöborna en oproportionerligt stor del av den svenska handelsflottan — en tradition som går tillbaka till 1800-talets segelsjöfart. Sjöfartshistorien är inbäddad i öns DNA.',
      'I praktiken är Donsö ett välordnat, välmående ösamhälle med bred service: mataffär, restaurang, bensinmack och en av södra skärgårdens bästa gästhamnar. Perfekt för seglare längs Bohuslänskusten.',
      'Ön är bilfri (för besökare). Invånarna kör moped och elcykel. Det ger ett lugn som gör det lätt att förstå varför folk väljer att bo här.',
    ],
    facts: {
      travel_time: '35–40 min med Styrsöbolaget från Saltholmen',
      character: 'Välordnat, maritim historia, praktisk, bilfritt',
      season: 'Hela året (gästhamnen: maj–sept)',
      best_for: 'Seglare, maritimintresserade, barnfamiljer',
    },
    activities: [
      { icon: '⚓', name: 'Maritim historia', desc: 'Vandra bland de storslagna villorna längs hamnpromenaden — byggda av sjökaptensfamiljer på 1800-talet.' },
      { icon: '⛵', name: 'Gästhamn', desc: 'En av södra skärgårdens mest välservicerade gästhamnar med fuel, el och vatten.' },
      { icon: '🏖', name: 'Bad', desc: 'Badplatser på östra sidan av ön med klart vatten och klippor.' },
    ],
    accommodation: [
      { name: 'Donsö Gästhem', type: 'Vandrarhem', desc: 'Enkelt boende nära hamnen. Sommarsäsong.' },
    ],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '60 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 281 via Köpstadsö till Donsö (35–40 min).', icon: '🚋' },
    ],
    harbors: [
      { name: 'Donsö Gästhamn', desc: 'Fullservicehamn med bränsle, el, vatten och servicebyggnader. En av södra skärgårdens bästa.', fuel: true, service: ['el', 'vatten', 'bränsle', 'dusch', 'wi-fi'] },
    ],
    restaurants: [
      { name: 'Donsö Hamnkrog', type: 'Restaurang', desc: 'Klassisk hamnkrog med räkor och säsongsmat. Populär bland seglare.', slug: 'donso-hamnkrog' },
    ],
    tips: [
      'Donsö hamn har bränsle — ovanligt i södra skärgården. Planera bunkringen hit om du seglar söderut.',
      'Gå längs hamnpromenaden och titta på de gamla kaptensfamiljernas villor — arkitektonisk historia.',
      'Mataffären är välsorterad — handla proviant inför norrlandsskärgårdens glapp.',
    ],
    related: ['branno', 'styrso', 'asperon'],
    tags: ['göteborg', 'södra skärgård', 'sjöfart', 'gästhamn', 'bilfritt', 'styrsöbolaget'],
    did_you_know: 'Donsöborna äger rederiflottor värderade till miljarder kronor. Ön producerade per capita fler sjökaptener än något annat samhälle i Sverige under 1900-talets första hälft.',
    seasonal: {
      open: 'Hela året',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Donsö har service året runt tack vare den fasta befolkningen. Juni och september ger lugnet och gästhamnens platser utan högsäsongens köer.',
      warning: 'Gästhamnen tar fullt upp i juli — boka i god tid eller kom tidigt på morgonen för att säkra en plats. Bränsle finns hela sommarsäsongen.',
      months: ['limited','limited','limited','limited','open','open','peak','peak','open','open','limited','limited'],
    },
  },

  {
    slug: 'asperon',
    name: 'Asperön',
    region: 'goteborg',
    regionLabel: 'Göteborgs södra skärgård',
    emoji: '🌊',
    tagline: 'Göteborgs södra skärgårds stillaste ö — inga bilar, ingen brådska, bara klippor och hav.',
    description: [
      'Asperön är den minsta av de bebodda öarna i södra skärgården, med ett hundratal fast bosatta. Det är öns lugn och enkelhet som lockar: inga bilar, inga turistmassor, ingen affär att tala om.',
      'Ön passar perfekt som ett steg i en längre skärgårdsdag — du tar färjan via Brännö eller Styrsö och stannar ett par timmar för att promenera, bada och ta in tystnaden. Eller stannar du längre än du planerat.',
      'Klipporna på östra sidan med utsikten mot Vrångö och ytterhavet är Asperöns bästa sida.',
    ],
    facts: {
      travel_time: '25 min med Styrsöbolaget från Saltholmen',
      character: 'Stilla, litet, okommersiellt, bilfritt',
      season: 'Maj–September',
      best_for: 'De som söker lugn, dagsturer i kombination med Brännö/Styrsö',
    },
    activities: [
      { icon: '🌊', name: 'Klippbad', desc: 'Klart vatten och klippor på östra sidan. Lugnt och oavbrutet.' },
      { icon: '🚶', name: 'Promenad runt ön', desc: 'En rund tur tar ca 45 minuter. Lätt vandring med vacker utsikt.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Spårvagn + Styrsöbolaget-färja', from: 'Göteborg C', time: '50 min totalt', desc: 'Spårvagn 11 till Saltholmen, sedan Styrsöbolagets linje 282 till Asperön (ca 25 min).', icon: '🚋' },
    ],
    harbors: [],
    restaurants: [],
    tips: [
      'Ta med all mat och dryck — det finns ingen service på ön.',
      'Kombinera gärna med Brännö under samma dag — de ligger nära varandra.',
      'Perfekt för barnfamiljer: liten, säker och promenadvänlig.',
    ],
    related: ['branno', 'styrso', 'vrango', 'donso'],
    tags: ['göteborg', 'södra skärgård', 'bilfritt', 'lugnt', 'styrsöbolaget', 'klippbad'],
    did_you_know: 'Asperön är en av de öar som historiskt hörde till Styrsö socken och ingick i det fiskelägessystem som försörjde Göteborg med fisk under 1700- och 1800-talen.',
  },

  // ─── YTTRE GÅRDEN ────────────────────────────────────────────
  {
    slug: 'yttre-garden',
    name: 'Yttre Gården',
    region: 'södra',
    regionLabel: 'Södra skärgården',
    emoji: '🪨',
    tagline: 'Naturreservat i Nynäshamns skärgård — kajakparadis med historiska fiskarspår och klart vatten.',
    lat: 58.895,
    lng: 17.925,
    description: [
      'Yttre Gården är en ö i Nynäshamns skärgård, belägen i Gårdsfjärden precis öster om Bedarön. Ön är ett populärt mål för kajakpaddlare och naturälskare som söker orördhet i den södra skärgårdens yttre delar.',
      'På öns nordöstra sida finns resterna av det historiska fiskarstället Gårdsund, uppfört 1912 och en gång i tiden ett levande arbetsläge för yrkesfiskare som försörjde sig på Gårdsfjärdens rika vatten. Idag vittnar grundmurar och stenfundament om livet som levdes här, ett stycke lokal maritim historia i naturreservatets mitt.',
      // KÄLLA: Naturvårdsverkets objektlista skyddsvärd statlig skog, objekt 3706 Yttre Gården, Nynäshamn 56 ha (läst 2026-08-23). Faktagranskning s.d.: inget bildat naturreservat och inga publicerade förbud hittades hos Länsstyrelsen eller kommunen.
      'Yttre Gården är utpekad av Naturvårdsverket som skyddsvärd statlig skog, men ön är i dag inte ett bildat naturreservat och några särskilda förbud finns inte publicerade. Kontrollera Länsstyrelsens karta över skyddad natur inför besök och visa samma hänsyn som i ett reservat inom reservatets gränser. Däremot är bad tillåtet och ön är fritt tillgänglig för besök under den tid fågelskyddsbestämmelserna tillåter.',
      'Öns östsida döljer en av södra skärgårdens mest ovanliga hemligheter: en stor sandstrand med varmt, grunt vatten. Här kan man gå barfota i sanden och bada bekymmersfritt — långt från turiststråken. Södra sidan bjuder på dramatiska klipphällar och djupare vatten för dem som föredrar att kliva i från kanten. Vattenklarheten i Gårdsfjärden är bland de bästa i södra skärgården.',
      'Yttre Gården nås enklast med kajak eller egen liten motorbåt från Nynäshamns fiskehamn eller från Lövhagen och Segersäng. Det är ingen reguljär båttrafik till ön, vilket bidrar till dess stillhet. Räkna med 30–60 minuters paddling från närmaste kajakhyrning eller startpunkt.',
    ],
    facts: {
      travel_time: '30–60 min med kajak från Nynäshamns fiskehamn',
      character: 'Skyddsvärd, orörd, bilfri, kajak',
      season: 'Maj–September',
      best_for: 'Kajakpaddlare, naturälskare, fågelskådning',
    },
    activities: [
      { icon: '🛶', name: 'Kajakpaddling', desc: 'Yttre Gården är ett av de bästa kajaktutflykterna i Nynäshamns skärgård. Klarvatten, klippor och vindskyddade vikar.' },
      { icon: '🏊', name: 'Bad', desc: 'Bad är tillåtet vid ön. Östra sidan har en stor sandstrand med varmt, grunt vatten som passar utmärkt för barfotabad. Södra sidan bjuder på klipphällar och djupare vatten.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Ön och dess omgivningar i Gårdsfjärden är rika på sjöfågel. Havsörn syns regelbundet.' },
      { icon: '🏛', name: 'Gårdsund fiskarläge', desc: 'Besök resterna av det historiska fiskarstället Gårdsund från 1912 på öns nordöstra sida.' },
    ],
    accommodation: [
      { name: 'Tältning (allemansrätten)', type: 'Camping', desc: 'Tältning är tillåtet enligt allemansrätten. Öns klipphällar och platsen nära sandstranden på östsidan fungerar bra för övernattning. Ta med allt eget och lämna inga spår. Kom ihåg att ADF-förbud gäller — ankra inte, dyk inte, fiska inte.' },
    ],
    getting_there: [
      { method: 'Kajak', from: 'Nynäshamns fiskehamn eller Lövhagen', time: '30–60 min', desc: 'Naturligaste sättet att ta sig till ön. Paddla söderut och sedan genom Gårdsund — sundet mellan Yttre Gården och Bedarön — till öns ostliga sida. Kajakhyrning finns i Nynäshamn.', icon: '🛶' },
      { method: 'Egen motorbåt', from: 'Nynäshamns gästhamn', time: '20–30 min', desc: 'Ankring EJ tillåtet inom reservatsgränserna. Lägg upp längs stranden kortvarigt och ro eller paddla iland istället.', icon: '⛵' },
    ],
    harbors: [],
    restaurants: [],
    tips: [
      'Kontrollera Länsstyrelsens karta över skyddad natur före besök — och visa samma hänsyn som i ett reservat.',
      'Ta med all mat och dryck — ingen service finns på ön.',
      'Vill du övernatta? Tältning är tillåtet enligt allemansrätten. Sandstranden på östsidan är en ypperlig plats för tält.',
      'Tidigt morgon eller sen eftermiddag ger bäst ljus och störst chans att se havsörn — två exemplar brukar kretsa över ön.',
      'Planera paddlingen efter väder — passagen genom Gårdsund och det yttre läget kan vara blåsiga.',
    ],
    related: ['landsort', 'nattaro', 'uto'],
    tags: ['skyddsvärd natur', 'kajak', 'södra', 'nynäshamn', 'sandstrand', 'orört'],
    did_you_know: 'Det historiska fiskarstället Gårdsund på Yttre Gårdens nordöstra sida uppfördes 1912. Platsen är ett av skärgårdens välbevarade fiskelämningar och visar hur yrkesfisket i den yttre skärgården bedrevs under tidigt 1900-tal.',
    insiderTips: [
      'Ön saknar brygga och service — kajak är bästa sättet att komma i land. Sjöfågellivet är känsligt, håll avstånd under häckningstid.',
      'Österstrandens sand är ovanlig i södra skärgården — ta av skorna och njut. Stranden är stor och grund, perfekt för barn.',
      'Gårdsund-lämningarna på nordöstra sidan är lätta att missa — sök upp stenfundamenten och grundmurarna nära strandkanten.',
      'Övernattning fungerar utmärkt — tälta på klipphällarna eller nära sandstranden. Ingen el, ingen service — bara stjärnhimmel.',
    ],
    transport_meta: {
      from_city_min: 90,
      from_nearest_hub_min: 40,
      nearest_hub: 'Nynäshamns fiskehamn',
      operator: 'Kajak / Egen båt',
      frequency: 'Ingen reguljär trafik',
    },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: false, notes: 'Kajakhyrning i Nynäshamn, ca 3 km från ön' },
      bad: { beaches: ['Östra sandstranden (stor och grund)', 'Södra klipphällar'] },
      fiske: false,
    },
    amenities: {
      toilets: false,
      shower: false,
      cafe: false,
      grocery: false,
    },
  },


  // ─── TYNNINGÖ ────────────────────────────────────────────────────────────
  {
    slug: 'tynningo',
    name: 'Tynningö',
    region: 'norra',
    emoji: '🌿',
    tagline: 'Bilfri idyllö nära Vaxholm — klippor, sommarstugor och skärgårdsro.',
    description: [
      'Tynningö är en liten bilfri ö strax nordöst om Vaxholm, perfekt för dem som vill ha skärgårdens lugn utan att åka långt. Ön nås med Waxholmsbolaget och välkomnar besökare med klippor, badskelett och sommarstugornas täta grönska.',
      'Det finns inga affärer, inga restauranger öppna för allmänheten, och absolut ingen stress. Tynningö är skärgården i sin renaste form: komma dit, kliva upp på en klippa och låta timmar bli till timmar.',
    ],
    facts: {
      area: 'ca 3 km²',
      population: 'ca 300 (helårsboende)',
      known_for: 'Bilfritt, nära Vaxholm, klippor och bad',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 1–1,5 tim',
      character: 'Bilfritt, sommarstugeö',
      best_for: 'Bad, barnfamiljer, skärgårdsro',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Klara vatten runt hela ön. Hoppklippor och grunda sandvikar på öns södra sida.' },
      { icon: '🚶', name: 'Promenader', desc: 'Välmärkta gångstigar runt ön. Kombinera med ett picknick­stopp vid vattnet.' },
      { icon: '⛵', name: 'Segla till', desc: 'Populärt mål för dagsseglare från Stockholm och Vaxholm. Gott ankrings­läge på öns sydöstra sida.' },
    ],
    accommodation: [
      { name: 'Sommarstugor Tynningö', type: 'Stugor', desc: 'Privata stuguthyrningar via Airbnb och lokala uthyrare. Boka tidigt.' },
    ],
    getting_there: [
      { method: 'Waxholmsbolaget', from: 'Stockholm / Vaxholm', time: 'ca 60–75 min från Stockholm', desc: 'Waxholmsbolaget trafikerar Tynningö via Vaxholm. Kolla aktuell tidtabell på waxholmsbolaget.se.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 70,
      nearest_hub: 'Vaxholm',
      from_nearest_hub_min: 20,
      operator: 'Waxholmsbolaget',
      frequency: 'Sommartid dagligen, vinter mer sällan',
    },
    harbors: [
      { name: 'Tynningö Gästbrygga', desc: 'Enkel brygga på öns södra sida. Lämplig för mindre båtar.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Ta med all mat — ingen affär på ön.',
      'Perfekt halvdagsutflykt kombinerat med Vaxholm: ta morgonbåten, bada, ta kvällsbåten tillbaka.',
    ],
    related: ['vaxholm', 'resaro', 'rindo'],
    tags: ['bilfritt', 'bad', 'norra skärgård', 'dagsutflykt', 'familjer'],
    did_you_know: 'Tynningö är en av öarna i det historiska Östersjö­archipelaget nära Vaxholm, en stad som sedan 1600-talet tjänat som Stockholm­s yttre försvarslinje.',
    amenities: { restaurant: false, shop: false, accommodation: true, beach: true, camping: false },
    activity_meta: { bad: { beaches: ['Södra klippbaden', 'Sandvik östra'] } },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller Augusti',
      bestReason: 'Bilfritt, nära Vaxholm och klippbaden är på topp. Perfekt halvdagstur kombinerat med Vaxholm.',
      warning: 'Ingen affär eller restaurang på ön. Ta alltid med mat och dryck.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── DJURÖ ───────────────────────────────────────────────────────────────
  {
    slug: 'djuro',
    name: 'Djurö',
    region: 'mellersta',
    emoji: '🦌',
    tagline: 'Naturreservat med orörd skärgård — kajakparadis i mellersta skärgården.',
    description: [
      'Djurö naturreservat skyddar ett område i Värmdö kommuns yttre skärgård med hundratals öar, skär och kobbar. Ön Djurö i reservatets centrum är välkänd bland kajakpaddlare och naturentusiaster som söker en outsliten skärgård.',
      'Här dominerar den yttre skärgårdens karaktär: skogklädda klippöar, vassbälten och ett rikt fågelliv. Reservatet är hemvist för havsörn, skarv och ett brett spektrum av vadare.',
    ],
    facts: {
      area: 'Reservatet ca 100 km²',
      population: 'Få helårsboende',
      known_for: 'Naturreservat, kajak, havsörn, orörda öar',
      season: 'Maj–September',
    
      travel_time: 'ca 1 tim',
      character: 'Naturreservat, kajak',
      best_for: 'Kajakpaddlare, naturentusiaster, fågelskådare',
    },
    activities: [
      { icon: '🚣', name: 'Kajakpaddling', desc: 'Djurö är ett av Stockholms skärgårds bästa kajakdestinationer. Lugna fjärdar, gott om ankringsplatser och naturhamnarna.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Havsörn observeras regelbundet i reservatet. Goda skådningsplatser längs reservatets klipputsikter.' },
      { icon: '⛺', name: 'Tältning', desc: 'Tältning tillåten på anvisade platser inom reservatet. Kolla Länsstyrelsens regler för aktuell säsong.' },
    ],
    accommodation: [
      { name: 'Tält i naturreservat', type: 'Camping', desc: 'Tältning på anvisade platser. Toaletter saknas på de flesta öar — ta med allt du behöver.' },
    ],
    getting_there: [
      { method: 'Waxholmsbolaget', from: 'Stavsnäs', time: 'ca 20–30 min', desc: 'Waxholmsbolaget trafikerar öarna nära Djurö från Stavsnäs brygga. Kolla aktuell tidtabell.', icon: '⛴' },
      { method: 'Kajak', from: 'Stavsnäs', time: 'varierar', desc: 'Stavsnäs Vinterhamn är bas för kajakuthyrning och -turer in i reservatet.', icon: '🚣' },
    ],
    transport_meta: {
      from_city_min: 60,
      nearest_hub: 'Stavsnäs',
      from_nearest_hub_min: 25,
      operator: 'Waxholmsbolaget / kajak',
      frequency: 'Sommarsäsong — kolla tidtabell',
    },
    harbors: [
      { name: 'Naturhamnar i reservatet', desc: 'Gott om naturliga ankrings­platser för segelbåtar och motorbåtar. Kom tidigt på helger i juli.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Kajak är överlägset det bästa sättet att utforska Djurö — ger tillgång till öar och vikar som båt inte kan nå.',
      'Havsörnen syns oftast tidigt på morgonen. Ha kikaren framme.',
      'Kolla Länsstyrelsens regler för eldning och tältning i reservatet — de varierar med brandrisken.',
    ],
    related: ['namdo', 'runmaro', 'ingmarso'],
    tags: ['naturreservat', 'kajak', 'fågelskådning', 'tält', 'mellersta skärgård'],
    did_you_know: 'Djurö naturreservat bildades för att skydda ett av Stockholms skärgårds finaste bestånd av havs­örn. Reservatet omfattar över 300 öar och skär.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: true },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: true, notes: 'Kajakhyrning i Stavsnäs Vinterhamn' },
      bad: { beaches: ['Klippbad längs reservatets öar'] },
    },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller September',
      bestReason: 'Kajakpaddlare har reservatet nästan för sig själva i juni och september. Juli är högsäsong med fler båtar men full naturhamnslista.',
      warning: 'Inga restauranger eller affärer i reservatet. Ta med all mat och vatten. Eldning förbjuden under högsommarens brandriskperioder.',
      months: ['off','off','off','off','limited','open','peak','open','limited','off','off','off'],
    },
  },

  // ─── BIRKA ───────────────────────────────────────────────────────────────
  {
    slug: 'birka',
    name: 'Birka',
    region: 'ovriga',
    regionLabel: 'Mälaren',
    emoji: '⚔️',
    tagline: 'Sveriges vikingastad — UNESCO-listat världsarv på en ö i Mälaren.',
    description: [
      'Birka på ön Björkö i Mälaren var Sveriges viktigaste handelsstad under 700–900-talen. Här möttes handelsmän från hela den kända världen — arabiska silvermynt, frankiska vapen och östliga sidenstoffer har hittats i de tusentals gravarna runt staden.',
      'I dag är Birka ett av Sveriges mest fascinerande arkeologiska platser och ett UNESCO-världsarv. Välbevarade vallar, gravfält och museet Vikingastad ger en av de klaraste bilderna av hur livet såg ut i Nordens forntid.',
      'Birka nås med dagstursbåt från Stockholm och är utmärkt för historieintresserade i alla åldrar.',
    ],
    facts: {
      area: 'Björkö ca 5 km²',
      population: 'Inga fast boende',
      known_for: 'Vikingahandelsstad, UNESCO-världsarv, arkeologi',
      season: 'Maj–September (dagstursbåtar)',
    
      travel_time: 'ca 2 tim',
      character: 'Vikingastad, UNESCO-arv',
      best_for: 'Historieintresserade, familjer, dagsutflykt',
    },
    activities: [
      { icon: '🏛', name: 'Vikingastads­museet', desc: 'Utställning om Birkas historia med original­fynd. Guidade turer sommartid ger sammanhang åt gravfälten och vallarna.' },
      { icon: '⚔️', name: 'Gravfält & vallar', desc: 'Tusentals gravar synliga på marken runt Björkö. Vandring i gravfältet med guide rekommenderas.' },
      { icon: '🚢', name: 'Dagstur med Strömma', desc: 'Strömma Kanalbolaget kör dagstursbåtar från Stadshusbron i Stockholm med guide, museiinträde och lunch ingår.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Dagstursbåt från Stockholm', from: 'Stadshusbron, Stockholm', time: 'ca 2 h', desc: 'Strömma och andra operatörer kör dagsturer till Birka sommartid. Biljetter inkluderar ofta guide och museum. Kolla aktuellt utbud på strömma.se.', icon: '⛴' },
      { method: 'Bil + lokalbåt', from: 'Adelsö / Ekerö', time: 'ca 5 min båt', desc: 'Kör via Ekerö (ca 30 min från Stockholm, väg 261). Från Adelsö går en liten lokalbåt till Björkö.', icon: '🚗' },
    ],
    transport_meta: {
      from_city_min: 120,
      nearest_hub: 'Stockholm Stadshusbron',
      from_nearest_hub_min: 120,
      operator: 'Strömma / lokal färja',
      frequency: 'Sommarsäsong dagligen',
    },
    harbors: [
      { name: 'Björkö Gästbrygga', desc: 'Brygga för båtar. Smalt inlopp — kliv av och bese Birka.', fuel: false, service: [] },
    ],
    restaurants: [
      { name: 'Birka Vikingastad Café', type: 'Café', desc: 'Enkel servering i anslutning till museet. Sommaröppen.' },
    ],
    tips: [
      'Boka dagstur med guide — det ger sammanhanget som krävs för att förstå vad man ser på gravfälten.',
      'Barn brukar gilla historien om vikingarna och det arkeologiska fynden. Bra familjeutflykt.',
      'Ta med picknick — det är vackert att äta i gräset vid gravfälten.',
    ],
    related: ['adelsjo', 'vaxholm', 'sandhamn'],
    tags: ['historia', 'UNESCO', 'vikingar', 'arkeologi', 'familjer', 'dagsutflykt', 'mälaren'],
    insiderTips: [
      'Strömmas dagstur inkluderar guide — men om du tar den lokala färjan från Adelsö kan du gå runt på egen hand i lugn och ro.',
    ],
    did_you_know: 'Birka grundades ca 750 e.Kr. och fungerade som Skandinaviens mest livliga handelscentrum i 200 år. I Birkas gravfält har arkeologer hittat fynd från England, Frankerriket, Bysans och Mellanöstern — ett bevis på hur globala vikingarna faktiskt var.',
    amenities: { restaurant: true, shop: true, accommodation: false, beach: false, camping: false },
    activity_meta: { cykel: { rental: false, notes: 'Cyklar olämpliga på det lilla Björkö' } },
  },

  // ─── LILLA KARLSÖ ────────────────────────────────────────────────────────
  {
    slug: 'lilla-karlso',
    name: 'Lilla Karlsö',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🐦',
    tagline: 'Gotlands fågelö — klippfästning med 15 000 häckande havssjöfåglar.',
    description: [
      'Lilla Karlsö är en klippö väster om Gotlands södra kust, och ett av Sveriges märkligaste naturskyddsområden. Varje sommar häckar upp till 15 000 sillgrisslor och tordmular på öns klippavsatser — ett naturspektakel utan like i Östersjön.',
      'Ön är ett naturreservat med starkt begränsad tillgång. Besök sker uteslutande med guidade turer från Klintehamn — du kan inte sätta foten på ön utan guide. Det är en av anledningarna till att upplevelsen är så stark.',
      'Lilla Karlsö är en halvdags- eller dagsturs­upplevelse, inte ett resmål att övernatta på. Men de timmar du tillbringar där är bland de mest minnesvärda i Östersjöns natur.',
    ],
    facts: {
      area: 'ca 1,5 km²',
      population: '0 (naturreservat)',
      known_for: '15 000 häckande sillgrisslor och tordmular, klippfaunan',
      season: 'Maj–Augusti (häckningssäsong)',
    
      travel_time: 'ca 4 tim',
      character: 'Naturreservat med fågelliv',
      best_for: 'Fågelskådare, fotografer, naturguider',
    },
    activities: [
      { icon: '🦅', name: 'Fågelskådning', desc: 'Sillgrisslor och tordmular på klippavsatserna. Möjlighet att se alkor, havsörn och en rik kärlväxtflora. Guide medverkar på alla turer.' },
      { icon: '🌿', name: 'Naturguidad tur', desc: 'Alla besök är guidade. Turerna tar ca 2 timmar och inkluderar promenad på öns leder med information om flora och fauna.' },
      { icon: '📸', name: 'Fotografera fåglar', desc: 'Möjlighet att komma mycket nära sillgrisslorna. En av de bästa möjligheterna för fågelfoto i norra Europa under häckningssäsongen.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Guidad tur från Klintehamn', from: 'Klintehamn (Gotland)', time: 'ca 25 min båt', desc: 'Boka tur via Lilla Karlsö Naturreservat. Alla besök är guidade — det är inte tillåtet att besöka ön på egen hand. Kolla bokningssystem och tidtabell på lillakarlso.se.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Klintehamn (Gotland)',
      from_nearest_hub_min: 25,
      operator: 'Lilla Karlsö Naturreservat',
      frequency: 'Guidade turer dagligen maj–aug, boka i förväg',
    },
    harbors: [],
    restaurants: [],
    tips: [
      'Boka tur via lillakarlso.se — platserna är begränsade och tar slut tidigt i säsongen.',
      'Havsörn syns ofta kring ön. Ta kikare.',
      'Bäst fågelupplevelse: maj–juni när ungarna är på väg ut ur äggskalen.',
      'Kombinera med Stora Karlsö samma dag — liknade tur erbjuds dit från Klintehamn.',
    ],
    related: ['gotland', 'faro', 'oland'],
    tags: ['fågelliv', 'naturreservat', 'gotland', 'dagsutflykt', 'guidad tur', 'fotografi'],
    did_you_know: 'Sillgrisslorna på Lilla Karlsö lägger sina ägg direkt på kala klippavsatser — inga bon. Äggets päronform är en evolution­är anpassning: om ägget nuddar till, rullar det i en cirkel snarare än utanför kanten.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: false },
    activity_meta: { bad: { beaches: [] } },
  },

  // ─── GOTSKA SANDÖN ───────────────────────────────────────────────────────
  {
    slug: 'gotska-sandon',
    name: 'Gotska Sandön',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🏝',
    tagline: 'Östersjöns ensliga nationalpark — sanddyner, tallar och absolut avskildhet.',
    description: [
      'Gotska Sandön är en av Sveriges mest avlägsna öar — och en av de mest fascinerande. Nationalparken i öppet Östersjövatten, cirka 37 km norr om Fårö, har inga vägar, inga butiker och ingen fast bebyggelse utöver fyrvaktarbostaden och ett antal stugor.',
      'Ön är ett geologiskt unikum: ett sandrevlande landskap format av Östersjöns vindar, med vandringsdyner, tallskogar som växer på sand och stränder som skiftar form varje år. Det är en ö som inte alls liknar någon annan i Sverige.',
      'Hit tar man sig med sommarbåt från Nynäshamn eller Fårösund under juni–september. Turen är lång, platserna begränsade och upplevelsen nästintill ogreppbar. Det är därför Gotska Sandön är en av de svenska bucket-list-destinationerna.',
    ],
    facts: {
      area: 'ca 37 km²',
      population: '0 (nationalparkspersonal sommartid)',
      known_for: 'Avlägsen nationalpark, sanddyner, unika ekosystem',
      season: 'Juni–September (sommartrafik)',
    
      travel_time: 'ca 7 tim',
      character: 'Avlägsen sandöpark',
      best_for: 'Äventyrare, naturentusiaster, bucket list',
    },
    activities: [
      { icon: '🏖', name: 'Sandstränder', desc: 'Öns hela kust är strand — vita sanddyner och relativt varmt Östersjövatten. Nästan alltid öde.' },
      { icon: '🥾', name: 'Vandring', desc: 'Markerade leder runt ön och genom nationalparken. Fullrunda ca 18 km. Sandigt underlag — gott om insekter i juli.' },
      { icon: '🔭', name: 'Mörkertidsstjärnor', desc: 'Gotska Sandön har en av Sveriges lägsta ljusföroreningar. Vintergatan syns med blotta ögat på en klar natt.' },
      { icon: '🌿', name: 'Naturstudier', desc: 'Unika sand­växter, havsörn, sälkoloni på norra stranden och ett ekosystem som saknar direkt jämförelse.' },
    ],
    accommodation: [
      { name: 'STF Stugor Gotska Sandön', type: 'Stugor', desc: 'Enklare stugor och raststugor i parken. Begränsat antal platser — boka månader i förväg via STF.' },
      { name: 'Tältning i nationalpark', type: 'Camping', desc: 'Tältning på anvisade platser i nationalparken. Koll aktuella regler hos Naturvårdsverket.' },
    ],
    getting_there: [
      { method: 'Sommarbåt från Nynäshamn', from: 'Nynäshamn', time: 'ca 5–6 h', desc: 'Gotska Sandön Trafik AB kör sommarbåt ett fåtal avgångsdagar per vecka juni–september. Boka i god tid — begränsat antal platser.', icon: '⛴' },
      { method: 'Sommarbåt från Fårösund', from: 'Fårösund (Gotland)', time: 'ca 2,5–3 h', desc: 'Kortare rutt. Kolla Gotska Sandön Trafik AB:s tidtabell för avgångsdagar.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 420,
      nearest_hub: 'Nynäshamn / Fårösund',
      from_nearest_hub_min: 300,
      operator: 'Gotska Sandön Trafik AB',
      frequency: 'Begränsade avgångsdagar juni–sept — kolla aktuell tidtabell',
    },
    harbors: [
      { name: 'Bränn­vigeln', desc: 'Öns enda angörings­plats. Ogästvänlig vid hög sjö — tur­operatörerna avgör om landstigning är möjlig.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Boka plats på båt och stuga minst 2–3 månader i förväg. Gotska Sandön är liten och fullbokad tidigt.',
      'Insekter kan vara besvärliga i juli. Ta med bra myggskydd.',
      'Ön är inte nåbar om sjön är för grov — tur­operatören kan ställa in utan förvarning.',
      'Ta med allt du behöver — ingen mat, inget vatten och ingen affär på ön.',
    ],
    related: ['gotland', 'faro', 'arholma'],
    tags: ['nationalpark', 'avlägsen', 'sanddyner', 'äventyr', 'natur', 'bucket list', 'gotland'],
    insiderTips: [
      'Prata med nationalparkspersonalen när du landar — de vet var havsörnen sitter och var sälarna vilar på stranden.',
      'Ta med handlinor och fiska längs stranden. Gotska Sandöns stränder är fria för alla.',
    ],
    did_you_know: 'Gotska Sandön blev nationalpark 1909 — ett av Sveriges allra första. Ön är ett geologiskt sällsynt sanddynlandskap mitt i Östersjön, med arter som inte förekommer på Gotland trots att de är nära grannar.',
    amenities: { restaurant: false, shop: false, accommodation: true, beach: true, camping: true },
    activity_meta: {
      bad: { beaches: ['Hela kusten är strand, ca 18 km'] },
      fiske: true,
    },
  },

  // ─── ASPÖ (BLEKINGE) ─────────────────────────────────────────────────────
  {
    slug: 'aspo-blekinge',
    name: 'Aspö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '🦀',
    tagline: 'Karlskrona-skärgårdens vackraste ö — granit, barrskog och fri natur.',
    description: [
      'Aspö är en av de mer besökta öarna i Karlskronas skärgård — en kuperad klipp­ö med barrskog, klippstränder och det typiska Blekinges möte mellan granit och hav. Ön är naturreservat till stora delar och välbesökt av seglare, kajakpaddlare och naturentusiaster.',
      'Från Aspö kan man se Karlskronas östra utkant och navigera vidare till Sturkö och skärgårdens yttre delar. Ön erbjuder camping, vandring och ett av de bättre klippbaden längs den blekingska kusten.',
    ],
    facts: {
      area: 'ca 9 km²',
      population: 'ca 100 (helårsboende)',
      known_for: 'Naturreservat, klipplandskap, Karlskrona-skärgård',
      season: 'Maj–September',
    
      travel_time: 'ca 4 tim',
      character: 'Blekinges naturreservat',
      best_for: 'Kajakpaddlare, badare, naturliv',
    },
    activities: [
      { icon: '🏊', name: 'Klippbad', desc: 'Klart Östersjövatten längs öns klippkust. Vackra badplatser på sydöst­sidan.' },
      { icon: '🥾', name: 'Vandring', desc: 'Markerade leder runt ön och in i naturreservatet. Utsikter mot Hanöbukten och Karlskrona-skärgården.' },
      { icon: '🚣', name: 'Kajak', desc: 'Aspö ingår i Blekinges kajak­rutter. Paddla vidare mot Yttre Pölsan eller mot Sturkö.' },
    ],
    accommodation: [
      { name: 'Aspö Camping', type: 'Camping', desc: 'Camping­möjligheter på ön sommartid. Kolla aktuellt utbud med Karlskrona Turism.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Karlskrona', from: 'Karlskrona (Fisktorget/Polhemspiren)', time: 'ca 30–40 min', desc: 'Lokal passagerarfärja till Aspö sommar­säsong. Kolla aktuell tidtabell hos Blekingetrafiken.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Karlskrona',
      from_nearest_hub_min: 35,
      operator: 'Blekingetrafiken',
      frequency: 'Sommarsäsong — kolla aktuell tidtabell',
    },
    harbors: [
      { name: 'Aspö Gästhamn', desc: 'Liten gästhamn i öns nordvästra del. Relativt skyddad sommartid.', fuel: false, service: ['Vatten'] },
    ],
    restaurants: [],
    tips: [
      'Kombinerbar med Sturkö: ta båten till Aspö, paddla eller ta sig vidare till Sturkö.',
      'Ta med mat — serviceutbudet på ön är begränsat.',
    ],
    related: ['hano', 'sturko', 'landsort'],
    tags: ['blekinge', 'naturreservat', 'kajak', 'bad', 'dagsutflykt'],
    did_you_know: 'Karlskronas skärgård med Aspö och omgivande öar ingår i det område som präglade den svenska örlogsflottans historia från 1680-talet. Karlskrona är sedan 1998 ett UNESCO-världsarv, och marken och vattnet runt Aspö bär fortfarande spår av den militär­strategiska historien.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: true, camping: true },
    activity_meta: {
      kajak: { difficulty: 'lätt–medel', rental: false, notes: 'Kajakhyrning i Karlskrona' },
      bad: { beaches: ['Sydöstra klippstranden', 'Västra viken'] },
    },
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni: klippbadet och naturreservatet på sitt bästa utan trängseln. September: Östersjön håller fortfarande badtemperatur och ön är nästan tom.',
      warning: 'Färjan från Karlskrona kör bara sommarsäsong — utanför juni–september krävs privat båt. Ta med all mat och dryck.',
      months: ['off','off','off','off','off','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── STURKÖ ──────────────────────────────────────────────────────────────
  {
    slug: 'sturko',
    name: 'Sturkö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '🌲',
    tagline: 'Blekinges största ö — skog, klippor och bilfri skärgårds­känsla.',
    description: [
      'Sturkö är den till ytan störst­a av de bebodda öarna i Blekinges skärgård. Ön är välkänd för sin skogiga karaktär, goda camping­möjligheter och de vackra utsikterna mot Hanöbukten och ut mot öppet Östersjövatten.',
      'Till skillnad från många skärgårdsöar kan man nå Sturkö med bil via bro­förbindelser från Karlskrona-hållet, vilket gör den tillgänglig för dem utan båt. Ön kombinerar skärgårdens frihet med den praktiska tillgängligheten.',
    ],
    facts: {
      area: 'ca 23 km²',
      population: 'ca 700 (helårsboende)',
      known_for: 'Blekinges största ö, camping, skogsmiljö',
      season: 'Maj–September',
    
      travel_time: 'ca 4 tim',
      character: 'Camping, klippkust',
      best_for: 'Barnfamiljer, campare, bad',
    },
    activities: [
      { icon: '⛺', name: 'Camping', desc: 'Sturkö är ett välkänt sommarcampingmål i Blekinge. Campingplatser med gott om utrymme.' },
      { icon: '🥾', name: 'Vandring', desc: 'Skogspartier och klippkust erbjuder varierade vandrings­möjligheter. Utsikter mot öppet hav.' },
      { icon: '🏊', name: 'Bad', desc: 'Klippbad och sandiga vikar längs östkusten. Klart Östersjövatten.' },
    ],
    accommodation: [
      { name: 'Sturkö Camping', type: 'Camping', desc: 'Camping­anläggning med gott om plats. Populär i juli — boka i förväg eller kom tidigt.' },
      { name: 'Stuguthyrning Sturkö', type: 'Stugor', desc: 'Sommarstugor via lokala uthyrare.' },
    ],
    getting_there: [
      { method: 'Bil via bro­förbindelser', from: 'Karlskrona', time: 'ca 20–30 min', desc: 'Sturkö nås med bil via broförbindelser från Karlskrona-hållet. Kör mot Lyckeby och följ skyltning mot Sturkö.', icon: '🚗' },
      { method: 'Passagerarfärja', from: 'Karlskrona', time: 'ca 25–35 min', desc: 'Blekingetrafiken trafikerar ön sommar­säsong. Kolla aktuell tidtabell.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Karlskrona',
      from_nearest_hub_min: 25,
      operator: 'Bil (broförbunden) / Blekingetrafiken',
      frequency: 'Tillgänglig med bil hela året',
    },
    harbors: [
      { name: 'Sturkö Gästhamn', desc: 'Gästhamn med grundläggande service. Populär bland seglare i Blekinges skärgård.', fuel: false, service: ['Vatten', 'El'] },
    ],
    restaurants: [
      { name: 'Sturkö Krog', type: 'Krog', desc: 'Lokal krog med husmanskost. Sommaröppen — kolla aktuella öppettider.' },
    ],
    tips: [
      'Sturkö är bra om du vill ha skärgård men inte vill vara beroende av båtturer — ta bilen dit.',
      'Kombinerbar med Aspö och Hanö om du har tillgång till båt.',
    ],
    related: ['hano', 'aspo-blekinge', 'landsort'],
    tags: ['blekinge', 'camping', 'bil', 'familjer', 'skärgård'],
    did_you_know: 'Sturkö har en av de äldsta kontinuerligt bebodda fiskebefolkningarna i Blekinges skärgård. Fisket och sjöfarten präglade ön ända fram till 1900-talets mitt.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: true },
    activity_meta: { bad: { beaches: ['Östra klippstranden', 'Sandviken'] } },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Juni ger Östersjöns kallare men klara vatten och tomma campingplatser. September: Östersjön är badvarmt, skogens höstfärger är enastående och du har ön för dig själv.',
      warning: 'Campingen är fullbokad i juli — kom tidigt eller boka i förväg. Butiken har begränsade öppettider utanför högsäsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },
  },

  // ─── BLÅ JUNGFRUN ────────────────────────────────────────────────────────
  {
    slug: 'bla-jungfrun',
    name: 'Blå Jungfrun',
    region: 'ovriga',
    regionLabel: 'Kalmarsund',
    emoji: '🪄',
    tagline: 'Förtrollad nationalpark i Kalmarsund — häxor, labyrinter och urberg.',
    description: [
      'Blå Jungfrun är en av Sveriges märkligaste platser — en rund granitö mitt i Kalmarsund som i folklig tradition ansågs vara samlings­platsen för svenska häxor varje Skärtorsdag (Blåkulla-legenden). I verkligheten är ön ett geologiskt unikum: en rundad granitklump formad av inlandsisen med stenlabyrinten Trollebo som dess mest kända inslag.',
      'Ön är nationalpark sedan 1926 och kan endast besökas med dagstur­båt från Oskarshamn eller Byxelkrok på Öland. Övernattning är inte tillåten. Varje besök är ett kortare men djupt minnesvärt möte med urbergets Sverige.',
    ],
    facts: {
      area: 'ca 0,66 km²',
      population: '0 (nationalpark)',
      known_for: 'Häxlegenden (Blåkulla), stenlabyrint Trollebo, rundad granitklump, nationalpark',
      season: 'Maj–September (dagstursbåtar)',
    
      travel_time: 'ca 4 tim',
      character: 'Nationalpark, mystik',
      best_for: 'Historieintresserade, naturentusiaster, dagsutflykt',
    },
    activities: [
      { icon: '🪄', name: 'Trollebo stenlabyrint', desc: 'Forntida stenlabyrint — liknande labyrinter finns längs hela svenska kusten men Blå Jungfruns är en av de välbevarade. Ursprunget okänt.' },
      { icon: '🥾', name: 'Vandring på ön', desc: 'Välmärkta leder runt ön (ca 3–4 km). Utsikter från öns topp mot Öland och fastlandet.' },
      { icon: '🔮', name: 'Häxhistorian', desc: 'Guider berättar om Blåkulla-legenden, varför just Blå Jungfrun valdes ut av folktron och hur påskkärrings­traditionen hänger ihop.' },
      { icon: '🌿', name: 'Naturupplevelse', desc: 'Orörda urskogspartier med gamla ekar och tallskogar. Havsörn och pilgrimsfalk observeras.' },
    ],
    accommodation: [],
    getting_there: [
      { method: 'Dagstursbåt från Oskarshamn', from: 'Oskarshamn', time: 'ca 1,5–2 h', desc: 'Sommarsäsong kör operatörer dagstursbåtar till Blå Jungfrun från Oskarshamn. Boka i förväg.', icon: '⛴' },
      { method: 'Dagstursbåt från Byxelkrok', from: 'Byxelkrok (Ölands nordspets)', time: 'ca 45 min', desc: 'Kortare rutt från Ölands nordspets. Sommaroperatörer — kolla aktuellt utbud.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Oskarshamn / Byxelkrok',
      from_nearest_hub_min: 100,
      operator: 'Lokala dagstursbåtar (sommarsäsong)',
      frequency: 'Begränsade dagar per vecka, boka i förväg',
    },
    harbors: [],
    restaurants: [],
    tips: [
      'Övernattning är INTE tillåtet — det är en dagstur utan undantag.',
      'Boka dagstur­båt i god tid — platserna är begränsade.',
      'Högt upp på ön finns de bästa utsikterna mot Öland och fastlandet — ta med kameran.',
      'Legenden säger att om man tar en sten från ön, tar man med sig olycka. Lämna stenarna kvar.',
    ],
    related: ['oland', 'gotland', 'faro'],
    tags: ['nationalpark', 'historia', 'naturreservat', 'dagsutflykt', 'mystik', 'kalmarsund'],
    insiderTips: [
      'Guidade turer inkluderas vanligen i dagstursbiljetterna — hoppa inte av guiden. Historien om häxlegenden och geologin kräver sammanhang.',
    ],
    did_you_know: 'Blå Jungfrun fick sitt namn av sjömän som fruktat ön och kallat den "Blåkulla" — the Blue Island — som i folketro var häxornas samlingsplats. Det officiella "Blå Jungfrun" (Blå Jungfru) är en eufemism för att inte nämna det fruktade namnet direkt.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: false },
    activity_meta: { bad: { beaches: [] } },
  },

  // ─── HEMSÖN ──────────────────────────────────────────────────────────────
  {
    slug: 'hemson',
    name: 'Hemsön',
    region: 'ovriga',
    regionLabel: 'Höga Kusten',
    emoji: '🏰',
    tagline: 'Höga Kustens hemliga ö — berömda fästningsverk, urskogar och klippstränder.',
    description: [
      'Hemsön är en stor ö utanför Härnösand i Ångermanland, och en av Höga Kustens mest besöksvärda men undermarknadsförda destinationer. Öns domineras av Hemsö fästning — ett skalskydds­anläggning byggd i berg under det kalla krigets era som idag är ett öppet historiskt monument.',
      'Utöver fästningen bjuder Hemsön på typisk Höga Kusten-natur: dramatiska klippor som landar rakt i havet, barrskogs­täta marker och utsikter mot Ångermanälvens mynning och de inre fjärdarna.',
      'Ön nås med passagerarfärja från Härnösand och är tillgänglig som dagsutflykt eller för övernattning via camping.',
    ],
    facts: {
      area: 'ca 30 km²',
      population: 'ca 200 (helårsboende)',
      known_for: 'Hemsö fästning, klippnatur, Höga Kusten',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 5 tim',
      character: 'Fästning, Höga Kusten',
      best_for: 'Historieintresserade, vandrare, seglare',
    },
    activities: [
      { icon: '🏰', name: 'Hemsö fästning', desc: 'Bergfästning från kalla krigets era uthuggd i klippan. Guidade turer sommartid visar kasematter, tunnel­system och pjässällningar. En av Sveriges mest unika militär­historiska platser.' },
      { icon: '🥾', name: 'Vandring i urskog', desc: 'Välmärkta leder genom Hemsöns barrskogar och längs klippkusten. Stigar med fantastisk utsikt mot Ångermans­landskapet.' },
      { icon: '🏊', name: 'Klippbad', desc: 'Klart Bottenhavsvatten längs öns stränder. Avskilt och rent.' },
    ],
    accommodation: [
      { name: 'Hemsön Camping', type: 'Camping', desc: 'Camping­möjligheter sommartid. Koll aktuellt utbud.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Härnösand', from: 'Härnösand', time: 'ca 20–30 min', desc: 'Lokal passagerarfärja till Hemsön från Härnösand hamn. Kolla aktuell tidtabell hos Länstrafiken Västernorrland.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 300,
      nearest_hub: 'Härnösand',
      from_nearest_hub_min: 25,
      operator: 'Länstrafiken Västernorrland',
      frequency: 'Sommarsäsong — kolla aktuell tidtabell',
    },
    harbors: [
      { name: 'Hemsö Gästhamn', desc: 'Gästhamn på öns norra del. Populär bland seglare som utforskar Höga Kusten.', fuel: false, service: ['Vatten', 'El'] },
    ],
    restaurants: [],
    tips: [
      'Boka guidad tur till fästningen i förväg — en av de mest häpnadsväckande platserna i norra Sverige.',
      'Kombinerbar med Ulvön och Trysunda för en längre Höga Kusten-vistelse.',
    ],
    related: ['ulvon', 'trysunda', 'arholma'],
    tags: ['höga kusten', 'historia', 'fästning', 'natur', 'vandring', 'UNESCO'],
    did_you_know: 'Hemsö fästning byggdes in i berget under 1950–60-talen som en del av Sveriges kall­krigsförsvar. Bergrum, tunnel­system och kanon­pjässällningar är bevarade och öppna för besök — ett tidskapsel från en era då Sverige tog sin militärstrategiska neutralitet på extremt allvar.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: true, camping: true },
    activity_meta: { bad: { beaches: ['Klippstränder östra sidan'] } },
  },

  // ─── FÅRÖ ────────────────────────────────────────────────────────────────
  {
    slug: 'faro',
    name: 'Fårö',
    region: 'ovriga',
    regionLabel: 'Gotland',
    emoji: '🪨',
    tagline: 'Bergmans ö — raukar, vild natur och Östersjöns tystnad.',
    description: [
      'Fårö är Gotlands nordligaste utpost — och en av Sveriges mest mytomspunna öar. Ingmar Bergman anlände hit 1960 när han sökte inspelningsplats för Såsom i en spegel, och kom aldrig riktigt tillbaka. Han bodde kvar till sin död 2007.',
      'Landskapet är radikalt annorlunda än resten av Gotland: vindpinade tallar, öppen hed och kalkstensraukar som reser sig längs stränderna som skulpterade pelarhallar. Fårö är inte en ö man passerar — den är ett resmål i sig.',
      'Via den kostnadsfria färjan från Fårösund är Fårö lätt att nå med bil. Men ön belönar dem som stannar. Sudersandstranden, rauk-vandringarna vid Langhammars och den tidlösa stämningen i fiskelägena är svåra att kombinera på ett och samma dagsutflyktsstopp.',
    ],
    facts: {
      area: '113 km²',
      population: 'ca 550 (helårsboende)',
      known_for: 'Raukar, Ingmar Bergman, Sudersandstranden',
      season: 'Maj–September',
    
      travel_time: 'ca 5 tim',
      character: 'Raukar, Bergman, Östersjö',
      best_for: 'Kulturturister, cyklister, badare',
    },
    activities: [
      { icon: '🪨', name: 'Langhammars raukar', desc: 'Fårös och Gotlands mest imponerande raukfält. Kalkstens­pelarema står tätt och höga längs den svept­öppna nordvästkusten. Bäst i morgon- eller kvällsljus.' },
      { icon: '🏖', name: 'Sudersandstranden', desc: 'Fårös populäraste strand — lång, ljus sand och Östersjöns klara vatten. Strandbar och café sommartid.' },
      { icon: '🎬', name: 'Bergmancentret', desc: 'Utställning om Ingmar Bergmans liv och arv, med fokus på åren på Fårö. Guidade turer till Hammars (hans sista hem) sommartid — boka i förväg.' },
      { icon: '🚲', name: 'Cykla Fårö', desc: 'Platt terräng och lite trafik gör ön idealisk för cykling. Runtur ca 40 km — Sudersand, Langhammars, Gamla Hamn och tillbaka.' },
      { icon: '⛵', name: 'Gamla Hamn', desc: 'Fårös gamla fiskehamn på nordostsidan. Ovanliga raukformer, praktiskt taget inga turister. Stämningsfull tidvattens­basin vid lågvatten.' },
    ],
    accommodation: [
      { name: 'Fårö Sudersand Resort', type: 'Hotell/Camping', desc: 'Strandnära anläggning med hotellrum, stugor och camping. Boka månader i förväg till juli.' },
      { name: 'Fårö Bed & Breakfast', type: 'B&B', desc: 'Enklare och charmigare alternativ i gammal gårds­miljö. Perfekt för par.' },
      { name: 'Stuguthyrning Fårö', type: 'Stugor', desc: 'Privata stugor via Airbnb och Blocket. Stor variation — boka senast mars för midsommar–juli.' },
    ],
    getting_there: [
      { method: 'Gratis färja Fårösund–Broa', from: 'Fårösund (Gotland)', time: '5 min', desc: 'Färjan går dygnet runt och kostar ingenting. Kör till Fårösund via Gotlands vägnät, ca 80 km från Visby. Köbildning väntas i juli.', icon: '⛴' },
      { method: 'Destination Gotland + hyrbil', from: 'Nynäshamn eller Oskarshamn', time: '3–3,5 h + bil', desc: 'Färja till Visby, hyr bil och kör norrut. Boka bil­platsen på färjan minst 2–3 månader i förväg under högsäsong.', icon: '🚢' },
      { method: 'Flyg + hyrbil', from: 'Stockholm Arlanda / Bromma', time: '55 min flyg + 90 min bil', desc: 'BRA och SAS flyger dagligen till Visby. Hyr bil på flygplatsen och kör till Fårösund.', icon: '✈️' },
    ],
    transport_meta: {
      from_city_min: 300,
      nearest_hub: 'Visby / Fårösund',
      from_nearest_hub_min: 5,
      operator: 'Gratis bilfärja (Region Gotland)',
      frequency: 'Dygnet runt, tät trafik',
    },
    harbors: [
      { name: 'Fårösund Gästhamn', desc: 'Hamnen ligger på Gotlands sida av sundet, strax söder om färjeläget. Bra utgångspunkt för seglare som vill utforska Fårö.', fuel: false, service: ['Vatten', 'El', 'Dusch'] },
    ],
    restaurants: [
      { name: 'Kuttersmöjan', type: 'Krog', desc: 'Öns klassiska krog i Fårösund. Husmanskost, fisk och havsutsikt. Sommaröppen.' },
      { name: 'Sudersand Strandbar', type: 'Bar/Café', desc: 'Strandbar vid campingen. Hamburgare, glass och drinkar med havsutsikt.' },
      { name: 'Broas Handelsbod', type: 'Café/Handel', desc: 'Öns enda affär och café. Öppnar tidigt, viktig knutpunkt för ön.' },
    ],
    tips: [
      'Boka boende senast mars om du åker midsommar–juli. Fårö är litet och fyllbokat.',
      'Langhammars är bäst i tidigt morgon- eller kvällsljus — turist­bubblan på eftermiddagen är påtaglig.',
      'Guidad tur till Hammars (Bergmans hem) via Bergmancentret — boka online, begränsat antal platser.',
      'Ta gärna en dag extra och cykla hela ön. Det är Fårös rätta tempo.',
    ],
    related: ['gotland', 'ulvon', 'arholma'],
    tags: ['natur', 'kultur', 'strand', 'cykling', 'romantisk', 'historia', 'raukar'],
    insiderTips: [
      'De flesta besökare stannar vid Sudersand och Langhammars. Ge dig istället till Gamla Hamn på nordostsidan — ovanliga raukformer och nästan inga turister ens i juli.',
      'Fårö-dokumentären (Bergman, 1969) och Fårö-dokument 1979 finns på streaming — titta innan du åker för att förstå varför ön fastnar i en.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten på de flesta platser. Undvikt Sudersandstrandens badbälte under badsäsongen (15/6–15/8).',
    did_you_know: 'Ingmar Bergman hittade Fårö 1960 när han sökte inspelnings­plats för Såsom i en spegel. Han köpte sin första tomt 1966, byggde ut gården Hammars och bodde kvar till sin död 2007 — varefter han begravdes på Fårö kyrka­gård.',
    amenities: {
      restaurant: true,
      shop: true,
      accommodation: true,
      beach: true,
      camping: true,
    },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyrning via Sudersand Resort och i Fårösund.' },
      bad: { beaches: ['Sudersandstranden', 'Ekeviken', 'Norsta Auren'] },
    },
    seasonal: {
      open: 'Maj–Oktober',
      peak: 'Juli–Augusti',
      best: 'Juni eller September',
      bestReason: 'Bergmans ö är vacker hela säsongen. I juni är Sudersandsstranden tom och vindskärmarna tillgängliga. September: havstemperaturen håller och Bergman Center har höst-event.',
      warning: 'Boende i juli svårt att hitta — boka månader i förväg. Fårösund-färjan har begränsad kapacitet högsäsong.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },

  // ─── TRYSUNDA ─────────────────────────────────────────────────────────────
  {
    slug: 'trysunda',
    name: 'Trysunda',
    region: 'ovriga',
    regionLabel: 'Höga Kusten',
    emoji: '🏡',
    tagline: 'Höga Kustens pärlstav — ett levande 1700-tals fiskesamhälle utan bilar.',
    description: [
      'Trysunda är en av Höga Kustens mest välbevarade öar — ett fiskesamhälle som nästan inte förändrats sedan 1700-talet. Röda stugor tätt i tätt, byssgränder utan asfaltering och ett kapell från 1654 som fortfarande håller sommargudstjänster.',
      'Ön är bilfri och nås med passagerarfärja från fastlandet. Det är avsiktligt. Trysunda är en ö för dem som vill stanna, inte passera — för kajakpaddlaren, vandrandets entusiast och den som vill förstå vad Höga Kusten egentligen är bortom vybilarna.',
      'Höga Kusten är UNESCO:s världsarv för sin landhöjning — den snabbaste i världen. Trysundas klippor, stänk av havsnäring och det omgivande vidfrämmande tystnad är ett av världsarvets finaste kapitel.',
    ],
    facts: {
      area: 'ca 2 km²',
      population: 'ca 30 (helårsboende), ca 200 (sommar)',
      // KÄLLA: RAÄ bebyggelseregistret ('sannolikt byggt 1654') + Svenska kyrkan (1600-tal, målningar 1711).
      known_for: 'Välbevarat fiskesamhälle, kapell från 1654, bilfritt',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 5 tim',
      character: 'Fiskeläge, Höga Kusten',
      best_for: 'Kajakpaddlare, fiskare, naturliv',
    },
    activities: [
      { icon: '⛵', name: 'Kajakpaddling', desc: 'Trysunda är ett nav för Höga Kustens kajak­rutter. Paddla till Ulvön (ca 45 min) eller längs klippkusten söderut.' },
      { icon: '⛪', name: 'Trysunda kapell', desc: 'Kapellet från 1654 är ett av Höga Kustens äldsta bevarade byggnader, med väggmålningar från 1711. Sommargudstjänster hålls än idag.' },
      { icon: '🥾', name: 'Vandring på ön', desc: 'Välmärkta leder runt öns klipp­kust och genom fiskesamhället. Utsikter över Ulvöfjärden.' },
      { icon: '🏊', name: 'Bad från klippor', desc: 'Klart, djupt vatten runt hela ön. Klassiska klipp­bad i skydd av vindstilla vikar.' },
      { icon: '🎣', name: 'Fiske', desc: 'Handlina, abborre och gädda i fjärdarna. Fråga på ön om rätt platser.' },
    ],
    accommodation: [
      { name: 'Trysunda Stugby', type: 'Stugor', desc: 'Enkla men charmiga stugor i fiskesamhällets hjärta. Boka tidigt — begränsat antal.' },
      { name: 'Tält på ön', type: 'Camping', desc: 'Tältning tillåten på utpekade platser. Kolla aktuella regler med länsstyrelsen.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Ullånger/Bönhamn', from: 'Nordingrå-området', time: 'ca 45 min', desc: 'Sommarsäsong kör passagerarfärja från Bönhamn och/eller Ullånger. Kolla aktuella tidtabeller med Höga Kustens Båttrafik.', icon: '⛴' },
      { method: 'Passagerarfärja från Ulvöhamn', from: 'Ulvön', time: 'ca 20 min', desc: 'Möjligt att ta sig från Ulvön till Trysunda med båt. Kombinerbar dag­utflykt.', icon: '⛴' },
      { method: 'Kajak', from: 'Nordingrå / Ulvön', time: 'varierar', desc: 'Erfarna paddlare tar sig till Trysunda med kajak från Nordingrå-halvön (ca 5–6 km) eller från Ulvöhamn.', icon: '🚣' },
    ],
    transport_meta: {
      from_city_min: 300,
      nearest_hub: 'Kramfors / Härnösand',
      from_nearest_hub_min: 45,
      operator: 'Höga Kustens Båttrafik',
      frequency: 'Sommarsäsong — begränsade avgångar, kolla tidtabell',
    },
    harbors: [
      { name: 'Trysunda Gästhamn', desc: 'Liten gästhamn i fiskeläget. Grundare inlopp — lämpligt för mindre kölbåtar och jollar.', fuel: false, service: ['Vatten'] },
    ],
    restaurants: [
      { name: 'Trysunda Värdshus', type: 'Värdshus', desc: 'Öns enda servering med husmanskost och lokal fisk. Sommaröppen — begränsade platser.' },
    ],
    tips: [
      'Boka färjebiljett och boende i god tid — Trysunda är liten och söks av många.',
      'Kombinerbar med Ulvön: ta färjan till Trysunda på förmiddagen, paddla eller ta båt till Ulvön på eftermiddagen.',
      'Ta med proviant — öns affär är minimal och stänger tidigt.',
      'Kapellet är öppet utan guide. Kliv in, det är värt fem tysta minuter.',
    ],
    related: ['ulvon', 'arholma', 'furusund'],
    tags: ['höga kusten', 'bilfritt', 'historia', 'kajak', 'UNESCO', 'natur', 'fiske'],
    insiderTips: [
      'Trysunda är inte Ulvöns surströmmings­glamour — den är stillsammare och mer autentisk. Perfekt om du vill ha Höga Kusten utan folkvimmel.',
      'De röda fiskebodarna längs hamnen fotograferas flitigt — men den egentliga pärlstaben är gränderna innanför, där husen ligger nästan axel mot axel.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten på de flesta ödeplatser. Håll koppel i fiskesamhällets tätbebyggda delar.',
    did_you_know: 'Höga Kusten är ett UNESCO-världsarv för sin land­höjning — havsytan sjunker relativt land med ca 8 mm per år, den snabbaste landhöjningen i världen. Trysundas klippor som idag är strandbred var för 10 000 år sedan havsbotten.',
    amenities: {
      restaurant: true,
      shop: false,
      accommodation: true,
      beach: false,
      camping: true,
    },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: false, notes: 'Kajakhyrning rekommenderas från fastlandet i Nordingrå' },
      bad: { beaches: ['Klippbad norra sidan', 'Skyddad vik vid hamnen'] },
    },
  },

  // ─── HANÖ ─────────────────────────────────────────────────────────────────
  {
    slug: 'hano',
    name: 'Hanö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '⚓',
    tagline: 'Blekinges klippö — engelsk kyrkogård, raukar och vild Östersjönatur.',
    description: [
      'Hanö är en av Blekinges mest besökta öar — och en av de mest ovanliga. Stora delar av ön ingår i Hanö naturreservat (bildat 2017), här finns bofasta sedan 1830-talet, och ön nås med reguljär båt från Nogersund på Listerlandet. Det är ett resmål som kräver lite ansträngning, och som belönar den ansträngningen generöst.',
      'Det mest oväntade på Hanö är dess engelska historia. Under Napoleonkrigen 1810–1812 använde brittiska Royal Navy Hanö som flottbas i Östersjön. Sjömän som dog under övervintringen begravdes på ön — kyrkogården är i dag en av de märkligaste platserna längs hela svenska kusten.',
      'Naturen är dramatisk: kuperade klippor, barrskog, strandhed och den steniga stranden vid Engelskabadet. En liten fyr markerar öns höjdpunkt.',
    ],
    facts: {
      area: '2,8 km²',
      // KÄLLA: Länsstyrelsen Blekinge — naturreservat 2017 (192 ha land), bofast befolkning sedan 1830-talet, båt från Nogersund (2026-08-23)
      population: 'Litet antal bofasta (fiskeläge sedan 1830-talet)',
      known_for: 'Engelsk kyrkogård, naturreservat, klipplandskap',
      season: 'Maj–September',
    
      travel_time: 'Kort överfart med reguljär båt från Nogersund',
      character: 'Historia, naturreservat',
      best_for: 'Historieintresserade, vandrare, fågelskådare',
    },
    activities: [
      { icon: '⚱️', name: 'Engelska kyrkogården', desc: 'Brittiska sjömän begravda 1810–1812. En av Sverige mest ovanliga historiska platser — läs inskriptionerna och unna dig ett stilla ögonblick.' },
      { icon: '🥾', name: 'Vandringsleder', desc: 'Välmärkta leder runt hela ön, ca 8 km totalt. Klippstränder, barrskog och vid utsikt över Hanöbukten.' },
      { icon: '🏊', name: 'Engelskabadet', desc: 'Öns populäraste badplats. Stenig strand med klart vatten och tillräcklig avskildheten för att kännas som en hemlighet.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Hanö är rastplats för sträckande fåglar höst och vår. Havsörn observeras regelbundet.' },
      { icon: '🏠', name: 'Fyren', desc: 'Hanös gamla fyr på öns högsta punkt. Fri att besöka — fin utsikt över Östersjön och mot fastlandet.' },
    ],
    accommodation: [
      { name: 'Tält på Hanö', type: 'Camping', desc: 'Tältning tillåten i naturreservatet på anvisad plats. Ta med allt du behöver — ingen service på ön.' },
    ],
    getting_there: [
      { method: 'Båt från Karlshamn', from: 'Karlshamn', time: 'ca 45 min', desc: 'Passagerarfärja sommarsäsong. Kolla aktuella avgångstider med Karlshamns Turism eller lokala båtoperatörer.', icon: '⛴' },
      { method: 'Privat- eller charterbåt', from: 'Karlshamn / Sölvesborg', time: '30–60 min', desc: 'Egen båt eller chartrad — Hanöbukten är öppen vatten, undvik vid kuling.', icon: '⛵' },
    ],
    transport_meta: {
      from_city_min: 240,
      nearest_hub: 'Karlshamn',
      from_nearest_hub_min: 45,
      operator: 'Lokal båtoperatör (sommarsäsong)',
      frequency: 'Begränsade avgångar, kolla tidtabell',
    },
    harbors: [
      { name: 'Hanö Gästhamn', desc: 'Liten naturhamn på öns skyddade sida. Smalare inlopp — ankra i skälet utanför om hamnen är full.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Ta med all mat, vatten och utrustning — ingenting säljs på ön.',
      'Den engelska kyrkogården är liten men djupt stämningsfull. Ta dig tid.',
      'Kolla väderprognoser noga — Hanöbukten är öppet hav och trafiken ställs in vid sämre väder.',
      'Kombinerbar med Karlskrona: ligga i Karlskrona, dagstur till Hanö.',
    ],
    related: ['gotland', 'ulvon', 'landsort'],
    tags: ['historia', 'natur', 'naturreservat', 'fågelskådning', 'blekinge', 'dagsutflykt'],
    insiderTips: [
      'De flesta besöker Hanö på dagsutflykt. Att övernatta med tält ger en helt annan upplevelse — tidig morgon på klipporna med havsörn och ingenting annat.',
      'Den engelska kyrkogårdens stenar är vittrade men läsliga. Sjömanens namn, skeppets namn, dödsdatum — det finns berättelser i varje sten.',
    ],
    dog_friendly: true,
    dog_notes: 'Hund tillåten i naturreservatet. Håll koppel nära fågelhäcknings­områden — perioderna varierar, vanligen någon gång mellan 1 februari och 31 augusti enligt skyltarna.',
    did_you_know: 'Under Napoleonkrigen blockerade brittiska flottan Napoleons allierades hamnar i Östersjön. Hanö valdes som bas för sin strategiska position och naturliga hamn. Mer än 200 brittiska sjömän avled och begravdes på ön under åren 1810–1812.',
    amenities: {
      restaurant: false,
      shop: false,
      accommodation: false,
      beach: true,
      camping: true,
    },
    activity_meta: {
      bad: { beaches: ['Engelskabadet', 'Norra klippstranden'] },
      fiske: true,
    },
  },

  // ─── SVARTLÖGA ───────────────────────────────────────────────────────────
  {
    slug: 'svartloga',
    name: 'Svartlöga',
    region: 'norra',
    emoji: '🌑',
    tagline: 'Norra skärgårdens mest avskilda ö — ytterskärgård utan bilar och affärer.',
    description: [
      'Svartlöga är en av Stockholms skärgårds mest avlägsna och orörda öar. Belägen långt ut i norra skärgården, ca 7 timmar med Waxholmsbolaget från Stockholm, är Svartlöga ett resmål för dem som söker äkta ytterskärgård utan kompromisser: inga bilar, ingen affär och mycket lite folk utanför högsäsongen.',
      'Ön är bilfri och knappt 3 km² stor med en fast befolkning om bara några tiotal helårsboende. Naturen domineras av tallskogsklippornas karaktär — lavtäckta berghällar som möter öppet Östersjövatten. Havsörn och säl syns regelbundet.',
      'Svartlöga är en av de öar i Stockholms skärgård som kräver planering och tålamod att nå — och det är precis det som gör det värt det.',
    ],
    facts: {
      area: 'ca 3 km²',
      population: 'ca 20–30 (helårsboende)',
      known_for: 'Ytterskärgård, bilfritt, havsörn, absolut avskildhet',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 4 tim från Strömkajen (linje 26)',
      character: 'Vild ytterskärgård',
      best_for: 'Seglare, naturentusiaster, havsörn',
    },
    activities: [
      { icon: '🦅', name: 'Havsörn & säl', desc: 'Norra ytterskärgården hyser en stark population av havsörn. Säl observeras på klipporna i öns yttre delar.' },
      { icon: '⛺', name: 'Tältning', desc: 'Allemansrätten gäller. Klipporna erbjuder unika tältplatser med öppet havsläge och solnedgångar österut.' },
      { icon: '🚣', name: 'Kajak', desc: 'Paddla runt ön och utforska de omgivande skären. Lugn och skyddad inre fjärd på västra sidan.' },
    ],
    accommodation: [
      { name: 'Tältning på klipporna', type: 'Camping', desc: 'Inga bokningsbara boenden. Ta med tält och allt du behöver.' },
    ],
    getting_there: [
      { method: 'Waxholmsbolaget', from: 'Stockholm (Strömkajen)', time: 'ca 4 tim', desc: 'Waxholmsbolagets linje 26 via norra skärgårdens öar; Svartlöga ligger ett stopp före Rödlöga. Kolla aktuell tidtabell på waxholmsbolaget.se — avgångarna är sällsynta.', icon: '⛴' },
      { method: 'Privat båt', from: 'Furusund / Norrtälje', time: 'ca 45–60 min', desc: 'Från Furusund eller Norrtälje är det kortare båtväg. Det naturliga sättet att besöka ön om du har tillgång till båt.', icon: '⛵' },
    ],
    transport_meta: {
      from_city_min: 400,
      nearest_hub: 'Furusund / Norrtälje',
      from_nearest_hub_min: 50,
      operator: 'Waxholmsbolaget / privat båt',
      frequency: 'Sällsynta avgångar — kolla tidtabell noggrant',
    },
    harbors: [
      { name: 'Svartlöga naturhamn', desc: 'Naturliga ankringslägen på öns västra sida. Populärt bland seglare.', fuel: false, service: [] },
    ],
    restaurants: [],
    tips: [
      'Ta med allt — mat, vatten, utrustning. Ingenting säljs på ön.',
      'Kolla Waxholmsbolagets tidtabell noga. Avgångarna är begränsade och missar du sista båten stannar du kvar.',
      'Svartlöga är bäst under veckorna, inte helgerna i juli. Lugnet är poängen.',
    ],
    related: ['arholma', 'rodloga', 'fejan'],
    tags: ['ytterskärgård', 'bilfritt', 'natur', 'avskilt', 'norra skärgård', 'havsörn'],
    insiderTips: [
      'Solnedgången sedd från Svartlögas östklippa — med inget annat land synligt på horisonten — är en av skärgårdens mest oslagbara upplevelser.',
    ],
    did_you_know: 'Svartlöga är en av de öar i norra Stockholms skärgård som kallas "svart" av historiska skäl — de yttre, karga, mörkfärgade granitöarna fick epitetet "svart" för att skilja dem från de inre, skogklädda "gröna" öarna.',
    amenities: { restaurant: false, shop: false, accommodation: false, beach: false, camping: true },
    activity_meta: {
      kajak: { difficulty: 'medel', rental: false, notes: 'Ta med egen kajak — ingen uthyrning på ön' },
      bad: { beaches: ['Klippbad östra sidan'] },
    },
    seasonal: {
      open: 'Juni–September',
      peak: 'Juli',
      best: 'Mitten av juni',
      bestReason: 'Yttre norrskärgård med dramatiska solnedgångar — bäst besökt precis före högsäsongen när öarna är tomma.',
      warning: 'Inga reguljära förbindelser. Kräver egen båt och god väderkunskap.',
      months: ['off','off','off','off','off','open','peak','open','limited','off','off','off'],
    },

  },

  // ─── VISINGSÖ ────────────────────────────────────────────────────────────
  {
    slug: 'visingo',
    name: 'Visingsö',
    region: 'ovriga',
    regionLabel: 'Vättern',
    emoji: '🏇',
    tagline: 'Vätterns sagolika ö — Brahehus, ekskog och hästskjuts i en av Europas klaraste sjöar.',
    description: [
      'Visingsö är en långsmal ö i södra Vättern, ett par kilometer utanför Gränna i Jönköpings län. Ön är 14 km lång och känd för sin dramatiska historia, märkliga natur och det faktum att man tar sig runt med häst och vagn — en tradition som lockar hundratusentals besökare varje år.',
      'Ruinerna av Brahehus (1600-tal) och Näs slott (medeltid) ger historisk tyngd, och ekskogen som planterades på 1800-talet för att ge virke till den svenska flottan täcker idag delar av ön med en urgammal karaktär.',
      // KÄLLA: Vätternvårdsförbundet (vattern.org) — näringsfattig klarvattensjö, siktdjup 15–16 m.
      'Vättern är en näringsfattig klarvattensjö med siktdjup på hela 15–16 meter, och vattnet runt Visingsö är kristallklart. Bad och fiske hör sommaren till.',
    ],
    facts: {
      area: 'ca 24 km²',
      population: 'ca 800 (helårsboende)',
      known_for: 'Brahehus ruiner, ekskogen, häst­skjuts, Vätterns klara vatten',
      season: 'Maj–September',
    
      travel_time: 'ca 3 tim',
      character: 'Historisk Vätternö',
      best_for: 'Historieintresserade, familjer, cyklister',
    },
    activities: [
      { icon: '🏇', name: 'Häst och vagn', desc: 'En av Visingsös signaturer. Ta häst­skjuts från färjeläget och åk runt ön i traditionellt stil.' },
      { icon: '🏰', name: 'Brahehus', desc: 'Ruinerna av Per Brahes slott (1600-tal) på en klippudde med fantastisk utsikt över Vättern mot Gränna och fastlandet.' },
      { icon: '🌳', name: 'Ekskogen', desc: 'En av Sveriges mest ovanliga skogar — planterad på 1800-talet för flottans framtida virkesbe­hov. En djup, urskogsaktig upplevelse.' },
      { icon: '🏊', name: 'Bad i Vättern', desc: 'Vätterns klara vatten ger ett av Sveriges renaste badsäsonger. Sandstränder på öns östra sida.' },
    ],
    accommodation: [
      { name: 'Visingsö Vandrarhem', type: 'Vandrarhem', desc: 'Vandrarhem och stuguthyrning på ön. Boka i god tid sommartid.' },
    ],
    getting_there: [
      { method: 'Bilfärja från Gränna', from: 'Gränna', time: 'ca 25 min', desc: 'Visingsöbåten trafikerar rutten Gränna–Visingsö dagligen. Bilen kan tas med sommartid. Gränna nås med bil (ca 30 min söder om Jönköping längs E4) eller buss från Jönköping.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 200,
      nearest_hub: 'Gränna',
      from_nearest_hub_min: 25,
      operator: 'Visingsöbåten',
      frequency: 'Dagligen, sommarsäsong täta avgångar',
    },
    harbors: [
      { name: 'Visingsö Hamn', desc: 'Gästhamn på öns norra del. Populär bland seglare som kryssar i Vättern.', fuel: true, service: ['Vatten', 'El', 'Dusch'] },
    ],
    restaurants: [
      { name: 'Visingsö Krögeri', type: 'Restaurang', desc: 'Lokal matservering med Vätternfisk och husmanskost. Sommarsäsong.' },
    ],
    tips: [
      'Ta häst­skjuts direkt när du kliver av färjan — det är en del av Visingsöupplevelsen.',
      'Brahehus är mest magiskt i solnedgången. Planer din dag dit mot kvällen.',
      'Cykelhyra finns på ön — perfekt för att ta sig runt på egna villkor.',
    ],
    related: ['oland', 'gotland', 'birka'],
    tags: ['historia', 'natur', 'bad', 'familjer', 'vättern', 'kulturarv'],
    insiderTips: [
      'Eken i Ekskogen är planterad specifikt för att ge mastvirke till 1800-talets örlogsfartyg. Skogen är redo att avverkas runt år 2050 — en gåva från ett sekel till nästa.',
    ],
    did_you_know: 'Visingsö var säte för den mäktiga Brahe-ätten på 1600-talet. Per Brahe d.y., riksdrots och Finlands generalguvern­ör, grundade bland annat Brahehus och Brahestads stad (nuv. Brahestad i Finland) härifrån.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: true, camping: false },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyra vid färjeläget' },
      bad: { beaches: ['Österstrand', 'Norra sandstranden'] },
    },
  },

  // ─── VEN ─────────────────────────────────────────────────────────────────
  {
    slug: 'ven',
    name: 'Ven',
    region: 'ovriga',
    regionLabel: 'Öresund',
    emoji: '🔭',
    tagline: 'Tycho Brahes ö i Öresund — observatorieruiner, vindruvor och cykelleder.',
    description: [
      'Ven (historiskt Hven) är en liten ö i Öresund mellan Landskrona och Helsingborg. Ön är globalt känd som platsen där den danske astronomen Tycho Brahe grundade Uraniborg 1576 — ett av de första observatorier som byggdes uteslutande för astronomiska observationer, och platsen därifrån han kartlade planeters rörelser med en precision som inte skulle överträffas förrän teleskopet uppfanns.',
      'I dag är Ven ett populärt utflyktsmål sommartid med cykelleder runt hela ön, Tycho Brahes museum och klipputsikter mot Öresundsbrons silhuett och danska kusten. Vingårdar har etablerats på ön de senaste decennierna — Vens mikroklimat med lång solskenstid och klarblå Öresunds-vind visar sig lämpa sig för odling.',
    ],
    facts: {
      area: 'ca 7,5 km²',
      population: 'ca 400 (helårsboende)',
      known_for: 'Tycho Brahes Uraniborg, astronomisk historia, cykelleder, vingårdar',
      season: 'April–Oktober',
    
      travel_time: 'ca 1,5 tim',
      character: 'Astronomisk öklassiker',
      best_for: 'Cyklister, historieintresserade, vingårdsbesök',
    },
    activities: [
      { icon: '🔭', name: 'Tycho Brahe Museum', desc: 'Museum om den store astronomen och hans observatorier Uraniborg och Stjärneborg. Resterna av Stjärneborg är bevarade och synliga.' },
      { icon: '🚴', name: 'Cykling runt ön', desc: 'Ca 8 km runt hela Ven. Välmarkerade leder via klipputsikter, kyrkan S:t Ibbs och lantliga vägar.' },
      { icon: '🍷', name: 'Vingårdar', desc: 'Vens vingårdar producerar vita och rosé­viner. Vingårdsbesök och provning sommartid — kolla Ven Vineyard och Backaskog.' },
    ],
    accommodation: [
      { name: 'Stuguthyrning Ven', type: 'Stugor', desc: 'Stugor och B&B via lokala uthyrare. Boka i god tid sommartid.' },
    ],
    getting_there: [
      { method: 'Passagerarfärja från Landskrona', from: 'Landskrona', time: 'ca 25 min', desc: 'Färja till Ven trafikeras av Ven Ferries och Öresundsfärjan. Avgångar dagligen, tätt sommartid. Kolla aktuella tider och priser på fergudansen.dk eller lokala operatörers sajter.', icon: '⛴' },
      { method: 'Tåg + färja', from: 'Malmö / Helsingborg → Landskrona', time: 'ca 60–80 min totalt', desc: 'Tåg till Landskrona C (Pågatågen/SJ) sedan promenad till färjeterminalen. Hela resan från Malmö/Helsingborg ca 60–80 min.', icon: '🚆' },
    ],
    transport_meta: {
      from_city_min: 75,
      nearest_hub: 'Landskrona',
      from_nearest_hub_min: 25,
      operator: 'Ven Ferries / lokala operatörer',
      frequency: 'Dagligen, sommartid täta avgångar',
    },
    harbors: [
      { name: 'Bäckviken gästhamn', desc: 'Välkänd gästhamn för seglare korsandes Öresund. Bra service och skyddat läge.', fuel: true, service: ['Vatten', 'El', 'Dusch', 'Restaurang'] },
    ],
    restaurants: [
      { name: 'Sankt Ibb Krog', type: 'Krog', desc: 'Lokal krog på Ven med säsongsbetonad mat och havsutsikt. Populär — boka.' },
    ],
    tips: [
      'Hyr cykel direkt vid färjeläget i Kyrkbacken — det är det naturliga sättet att se hela ön.',
      'Tycho Brahes museum är litet men välgjort. Kombinera med ett besök till Stjärneborg-ruinerna.',
      'Vens vingårdar har ofta drop-in provning vid besök, men ring och bekräfta på sommaren.',
    ],
    related: ['gotland', 'bornholm', 'oland'],
    tags: ['historia', 'astronomi', 'cykling', 'vingård', 'öresund', 'dagsutflykt', 'skåne'],
    insiderTips: [
      'Ta kvällsfärjan hem och se solen gå ner mot Öresundsbron på vägen tillbaka — en av Sydsveriges vackraste kvällsvyer.',
    ],
    did_you_know: 'Tycho Brahe observerade från Ven 1576–1597. Hans mätningar av Marspositionen gav Johannes Kepler det data han behövde för att formulera planetrörelsens lagar — fundamentet för modern astronomi. Allt det skedde på den lilla ön mitt i Öresund.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: false, camping: false },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyra vid Kyrkbacken färjeläge' },
      bad: { beaches: ['Klippbad östra sidan'] },
    },
  },

  // ─── TJÄRÖ ───────────────────────────────────────────────────────────────
  {
    slug: 'tjaro',
    name: 'Tjärö',
    region: 'ovriga',
    regionLabel: 'Blekinge',
    emoji: '🏕',
    tagline: 'Blekinges naturreservat med sandstränder — camping och urskogar vid Östersjön.',
    description: [
      // KÄLLA: Länsstyrelsen Blekinge, besöksmål naturreservat/Tjärö (läst 2026-08-23)
      'Tjärö är ett naturreservat och en av Blekinges vackraste öar — en skogig klippö i Ronneby kommuns ytterskärgård med vita sandstränder, tallskogsmiljöer och ett rikt maritimt fågelliv.',
      'Ön är nästan bilfri och känd för sin välordnade camping som driftas av Blekinges naturturism. Sandstranden på öns sydöstra sida är en av de finaste längs hela Blekingekusten. Tjärö är ett populärt mål för familjer, vandrare och kajakpaddlare.',
    ],
    facts: {
      area: 'ca 1,5 km²',
      population: '0 (naturreservat)',
      known_for: 'Sandstrand, naturreservat, camping, fågelskådning',
      season: 'Maj–September',
    
      travel_time: 'ca 4 tim',
      character: 'Sandstrand, naturreservat',
      best_for: 'Barnfamiljer, campare, bad',
    },
    activities: [
      { icon: '🏕', name: 'Camping på naturreservat', desc: 'Välskött camping i naturreservat med stugor, tältplatser och kanotuthyrning. Boka i god tid sommartid.' },
      { icon: '🏊', name: 'Sandstrand', desc: 'Öns sydöstra sandstrand är en av Blekinges finaste med vitt sand och klart Östersjövatten.' },
      { icon: '🚣', name: 'Kajak', desc: 'Kajakpaddling runt ön och till omgivande kobbar. Uthyrning finns via campingen.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Havsörn, fisktärna och ett rikt spektrum av kustfåglar under häckningssäsongen.' },
    ],
    accommodation: [
      { name: 'Tjärö Camping & Stugor', type: 'Camping', desc: 'Driftas av Ronneby Naturturism. Campingplatser och enklare stugor. Boka via deras hemsida i god tid.' },
    ],
    getting_there: [
      { method: 'Båt från Ronneby / Karö', from: 'Ronneby / Karö brygga', time: 'ca 20–30 min', desc: 'Sommarbåt till Tjärö från Ronneby/Karö-området. Kolla Ronneby Naturturisms aktuella tidtabell.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 250,
      nearest_hub: 'Ronneby',
      from_nearest_hub_min: 25,
      operator: 'Ronneby Naturturism',
      frequency: 'Sommarsäsong — kolla aktuell tidtabell',
    },
    harbors: [
      { name: 'Tjärö brygga', desc: 'Enkel brygga vid campingplatsen.', fuel: false, service: [] },
    ],
    restaurants: [
      { name: 'Tjärö Café', type: 'Café', desc: 'Enkelt café vid campingen. Sommarsäsong.' },
    ],
    tips: [
      'Boka campingplats/stuga tidigt — Tjärö är ett populärt Blekingemål och tar slut i juli.',
      'Sandstranden på sydöstsidan är öns finaste. Gå dit tidigt på morgonen för att ha den för dig själv.',
    ],
    related: ['hano', 'aspo-blekinge', 'sturko'],
    tags: ['blekinge', 'naturreservat', 'sandstrand', 'camping', 'kajak', 'familjer'],
    did_you_know: 'Tjärö naturreservat är ett av Blekinges mest uppskattade friluftsmål. Öns blandning av sandstrand, urskog och Östersjöklippor är ovanlig — de flesta kustöar i söder har antingen sand eller klippa, sällan båda.',
    amenities: { restaurant: true, shop: false, accommodation: true, beach: true, camping: true },
    activity_meta: {
      kajak: { difficulty: 'lätt–medel', rental: true, notes: 'Kajakhyrning via campingen' },
      bad: { beaches: ['Sydöstra sandstranden', 'Norra klippbad'] },
    },
    seasonal: {
      open: 'Maj–September',
      peak: 'Juli',
      best: 'Juni eller mitten av augusti',
      bestReason: 'Tjärö naturreservat med sandstrand och camping i Blekinge. I juni: tomt och mysigt. Mitten av aug: varmt hav utan juli-trängseln.',
      months: ['off','off','off','off','limited','open','peak','peak','open','limited','off','off'],
    },

  },

  // ─── ÖCKERÖ ──────────────────────────────────────────────────────────────
  {
    slug: 'ockero',
    name: 'Öckerö',
    region: 'goteborg',
    regionLabel: 'Göteborgs norra skärgård',
    emoji: '🚢',
    tagline: 'Göteborgs fiskeö — sjöfartens hjärta och Hönöleden utanför hamnen.',
    description: [
      'Öckerö är huvudön i Öckerö kommun — en samling öar i Göteborgs norra skärgård med djupa rötter i sjöfart och fiske. Ön är broförbunden med Öckeröarkipelagen och nås med Västtrafiks färjelinje från Hinsholmen i Göteborg.',
      'Öckerö och de omgivande öarna — Hönö, Björkö, Fotö, Kalvsund, Hyppeln — bildar en levande skärgård med genuina fiskesamhällen. Sjöfartsträditionen är stark: Öckerö är en av de kommuner i Sverige med flest sjökapten per capita.',
      'Som utflyktsmål erbjuder Öckerö klippor, fiskehamnar och en autentisk skärgårds­känsla utan turisttrycket på Bohusläns mer kända öar.',
    ],
    facts: {
      area: 'ca 3 km²',
      population: 'ca 4 500 (Öckerö ö, hela kommunen ca 13 000)',
      known_for: 'Sjöfart, fiske, Öckerö-skärgård, Hönöleden',
      season: 'Hela året (Göteborg-närheten)',
    
      travel_time: 'ca 40 min',
      character: 'Fiske, sjöfart, skaldjur',
      best_for: 'Matturister, familjer, dagsutflykt',
    },
    activities: [
      { icon: '🚢', name: 'Sjöfartshistoria', desc: 'Öckerö Sjöfartsmuseum (kolla öppettider) och de många fiskehamnarnas berättelser. En av Sveriges mest sjöfartstäta kommuner.' },
      { icon: '🥾', name: 'Hönöleden', desc: 'Vandringsleder via brofar­bunden öar — Öckerö, Hönö, Björkö. Kombinera klippor, hamnar och fiskelägen.' },
      { icon: '🦞', name: 'Hummer & räkor', desc: 'Färska räkor och hummer säljs direkt från fiskebåtarna i hamnarna. En av de äkta upplevelserna i Göteborgsskärgården.' },
    ],
    accommodation: [
      { name: 'Stuguthyrning Öckerö', type: 'Stugor', desc: 'Privata stuguthyrningar och B&B via lokala uthyrare.' },
    ],
    getting_there: [
      { method: 'Västtrafik färja från Hinsholmen', from: 'Hinsholmen, Göteborg', time: 'ca 15–20 min', desc: 'Buss 281/282 från Göteborg C till Hinsholmen (ca 20 min), sedan färja till Öckerö. Hela resan ca 35–40 min från Göteborg C.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 40,
      nearest_hub: 'Hinsholmen (Göteborg)',
      from_nearest_hub_min: 18,
      operator: 'Västtrafik',
      frequency: 'Tät trafik hela dagen med SL-liknande turtäthet',
    },
    harbors: [
      { name: 'Öckerö Gästhamn', desc: 'Gästhamn i öns södra del. Fullgod service.', fuel: true, service: ['Vatten', 'El', 'Dusch'] },
    ],
    restaurants: [
      { name: 'Fiskehamnsrestauranger', type: 'Restaurang', desc: 'Lokala restauranger i fiskehamnen med färsk sjömat. Räkor och skaldjur direkt från fiskebåtarna.' },
    ],
    tips: [
      'Räkor direkt från fiskebåtarna i hamnen — billigare och färskare än någon restaurang.',
      'Kör eller gå vidare till Hönö och Björkö via broarna — hela Öckerö-archipelagen är värd att utforska.',
      'Västtrafik-kortet/reskassan gäller på färjan — ingen extra biljett behövs.',
    ],
    related: ['branno', 'styrso', 'vinga'],
    tags: ['göteborg', 'fiske', 'sjöfart', 'familjer', 'dagsutflykt', 'skaldjur'],
    did_you_know: 'Öckerö kommun har per capita fler sjöfarare och sjökaptener än nästan någon annan svensk kommun. Sjöfartstraditionens rötter sträcker sig till 1700-talets handel och fiske — en tradition som lever kvar i de marinmålade trähusen längs hamnkajerna.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: false, camping: false },
    activity_meta: { bad: { beaches: ['Klippbad östra sidan'] } },
  },

  // ─── RÖRÖ ────────────────────────────────────────────────────────────────
  {
    slug: 'roro',
    name: 'Rörö',
    region: 'goteborg',
    regionLabel: 'Göteborgs norra skärgård',
    emoji: '🔴',
    tagline: 'Göteborgs lilla bilfria skärgårdsö — fyr, klippor och räksmörgås vid hamnen.',
    description: [
      'Rörö är en liten bilfri ö i yttre Göteborgs­skärgård, nåbar med färja via Öckerö. Ön är känd för sin pittoreska fiskehamnsmiljö, fyren Rörö fyr och de dramatiska klipporna som möter Västerhavet på öns västra sida.',
      'Turistmässigt är Rörö Göteborgs svar på Smögen: kompakt, vackert och fullt av sommarstämning kring hamnen. Det finns en restaurang, en handelsbod och en gästhamn — men annars är det klipporna, badet och tystnaden som är poängen.',
    ],
    facts: {
      area: 'ca 0,5 km²',
      population: 'ca 100 (helårsboende)',
      known_for: 'Fyr, klippor, bilfritt, fiskehamn, Göteborgs skärgård',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 50 min',
      character: 'Bilfritt, fyr, Västerhavet',
      best_for: 'Dagsutflykt, skaldjur, klippbad',
    },
    activities: [
      { icon: '🔴', name: 'Rörö fyr', desc: 'Fyren Rörö fyr är öns landmärke. Strosa längs klipporna fram till fyren och upplev den öppna Västerhavshoris­onten.' },
      { icon: '🏊', name: 'Klippbad Västerhavet', desc: 'Klart Västerhavsvatten längs öns västra och norra klippkust. Saltare och svalare än inre skärgårdsvatten.' },
      { icon: '🍤', name: 'Räksmörgås vid hamnen', desc: 'Fiskebåtarna levererar räkor direkt till hamnen. Sommarklassikern: räksmörgås och öl vid bryggkanten.' },
    ],
    accommodation: [
      { name: 'Stugor Rörö', type: 'Stugor', desc: 'Begränsat antal stuguthyrningar. Boka tidigt.' },
    ],
    getting_there: [
      { method: 'Västtrafik färja via Öckerö / Hönö', from: 'Hinsholmen, Göteborg → Öckerö → Rörö', time: 'ca 40–50 min totalt', desc: 'Ta Västtrafik-färjan från Hinsholmen till Öckerö/Hönö och byt till lokal linje mot Rörö. Kolla Västtrafiks reseplanerare för aktuella linjer och tider.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 50,
      nearest_hub: 'Öckerö / Hönö',
      from_nearest_hub_min: 15,
      operator: 'Västtrafik',
      frequency: 'Sommartid regelbundna avgångar',
    },
    harbors: [
      { name: 'Rörö Gästhamn', desc: 'Liten gästhamn med grundläggande service.', fuel: false, service: ['Vatten'] },
    ],
    restaurants: [
      { name: 'Rörö Fisk & Kök', type: 'Restaurang', desc: 'Lokal sjömatstservering vid hamnen. Räkor, musslor och fisk. Sommarsäsong.' },
    ],
    tips: [
      'Dagstur från Göteborg är perfekt — ut med morgonfärjan, lunch vid hamnen, hem till kvällen.',
      'Kombinera med Hönö eller Öckerö på samma resa.',
      'Ta med egna drycker — utbudet är begränsat.',
    ],
    related: ['ockero', 'hono', 'branno'],
    tags: ['göteborg', 'bilfritt', 'fyr', 'klippor', 'dagsutflykt', 'skaldjur'],
    did_you_know: 'Rörö fyr har väglett sjöfarten in mot Göteborg i mer än ett sekel. Ön har trots sin ringa storlek spelat en viktig roll i Västerhavet-sjöfartens historia.',
    amenities: { restaurant: true, shop: true, accommodation: true, beach: false, camping: false },
    activity_meta: { bad: { beaches: ['Norra klippbad', 'Västra klipputsprång'] } },
  },

  // ─── HOLMÖN ──────────────────────────────────────────────────────────────
  {
    slug: 'holmon',
    name: 'Holmön',
    region: 'ovriga',
    regionLabel: 'Västerbotten',
    emoji: '🦭',
    tagline: 'Nordens glömda skärgård — sälar, havsörn och öde Bottenhavsöar.',
    description: [
      'Holmön är en ö utanför Umeå i Västerbottens skärgård — en av de störst­a och vackraste öarna i norra Sverige men knappast känd utanför regionen. Det är precis det som gör den unik.',
      'Ön är ett naturreservat med dramatisk kustlinje, gammelska­lar och ett rikt djurliv. Säl, havsörn och vipa är vanliga inslag. Sommartid brusar strandängar av blomster och fågelliv — ett av norra Sveriges bäst bevarade kustnatur­landskap.',
      'Holmön nås med färja från Norrfjärden utanför Umeå. Resan tar ca 35 minuter och landar i en värld som känns som att kliva tillbaka ett sekel i tid.',
    ],
    facts: {
      area: 'ca 24 km²',
      population: 'ca 70 (helårsboende)',
      known_for: 'Naturreservat, sälar, havsörn, Bottenhavets ytterskärgård',
      season: 'Juni–Augusti',
    
      travel_time: 'ca 1 tim',
      character: 'Norrlands naturreservat',
      best_for: 'Sälskådare, fågelskådare, naturentusiaster',
    },
    activities: [
      { icon: '🦭', name: 'Sälskådning', desc: 'Gråsäl och vikare håller till på öns yttre klippor och runt Holmöar­nas skärgård. Sälsafaris arrangeras sommartid.' },
      { icon: '🦅', name: 'Fågelskådning', desc: 'Holmön är en av Bottenhavet-regionens bästa fågelskådningslokaler. Havsörn, fiskgjuse och ett brett spektrum av vadare och sjöfåglar.' },
      { icon: '🥾', name: 'Vandring i naturreservat', desc: 'Välmärkta leder genom naturreservatet. Strandängar, tallskogar och klippkust. Ca 20 km leder runt ön.' },
      { icon: '🚴', name: 'Cykling', desc: 'Ön har ett enkelt vägsy­stem — cykeln är utmärkt för att ta sig runt. Hyr cykel vid färjeläget.' },
    ],
    accommodation: [
      { name: 'Holmöns Camping & Stugor', type: 'Camping', desc: 'Camping och enklare stugor. Kolla Holmöns turistbyrå för aktuellt utbud.' },
    ],
    getting_there: [
      { method: 'Färja från Norrfjärden', from: 'Norrfjärden (nära Umeå)', time: 'ca 35 min', desc: 'Holmöfärjan trafikerar Norrfjärden–Holmön dagligen. Norrfjärden nås med bil ca 25 min från Umeå centrum, eller buss från Umeå. Kolla Länstrafiken Västernorrland / Region Västerbotten för aktuell tidtabell.', icon: '⛴' },
    ],
    transport_meta: {
      from_city_min: 60,
      nearest_hub: 'Umeå / Norrfjärden',
      from_nearest_hub_min: 35,
      operator: 'Holmöfärjan / Region Västerbotten',
      frequency: 'Dagligen, sommarsäsong täta avgångar',
    },
    harbors: [
      { name: 'Holmöns hamn', desc: 'Liten gästhamn vid öns södra del.', fuel: false, service: ['Vatten'] },
    ],
    restaurants: [
      { name: 'Holmöns Wärdshus', type: 'Wärdshus', desc: 'Sommarsäsongens krog med lokalt tillagad mat. Meny varierar med säsongens råvaror.' },
    ],
    tips: [
      'Hyr cykel på ön direkt när du landar — du hinner runt hela ön på en dag.',
      'Sälfoto: sälarna är mest synliga på morgonen när de solar på ytterskären.',
      'Holmön är glest turistad — kom med en mer öppen agenda, utan för många förväntningar.',
    ],
    related: ['ulvon', 'hemson', 'trysunda'],
    tags: ['norrland', 'naturreservat', 'säl', 'fågelskådning', 'natur', 'avskilt', 'västerbotten'],
    insiderTips: [
      'Fråga lokalborna om de bästa platserna. Holmön är liten nog att alla känner varandra — och stora nog att det finns hemligheter de inte marknadsför.',
    ],
    did_you_know: 'Holmön är en av de öar längs Norrlandskusten som drabbades hårdast av landhöjningen efter istiden — havet steg relativt sett, men landet höjer sig fortfarande med ca 8 mm per år, vilket gör att strandlinjen förändras mätbart under en mänsklig livstid.',
    amenities: { restaurant: true, shop: false, accommodation: true, beach: false, camping: true },
    activity_meta: {
      cykel: { rental: true, notes: 'Cykelhyrning vid färjeläget' },
      bad: { beaches: ['Strandäng nordvästra sidan'] },
    },
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

export type TeambuildingFAQ = { q: string; a: string }

export type TeambuildingSub = {
  slug: string
  title: string
  h1: string
  metaDescription: string
  excerpt: string
  location: string
  emoji: string
  readTime: string
  tags: string[]
  intro: string[]
  activities: { icon: string; name: string; text: string; priceRange: string }[]
  venues: { name: string; location: string; capacity: string; description: string; type: string }[]
  faqs: TeambuildingFAQ[]
}

export const TEAMBUILDING_SUBS: TeambuildingSub[] = [
  {
    slug: 'stockholm',
    title: 'Teambuilding i Stockholms skärgård 2026 – aktiviteter och konferens',
    h1: 'Teambuilding i Stockholms skärgård',
    metaDescription: 'Teambuilding och kickoff i Stockholms skärgård. Segling, kajak, konferensanläggningar och AW på öarna. Priser, aktiviteter och bokningsstips.',
    excerpt: 'Stockholms skärgård erbjuder Skandinaviens mest spektakulära teambuildingscen. Segling, kajak, öregatta och konferens på öar 45 minuter från City.',
    location: 'Stockholm',
    emoji: '⛵',
    readTime: '8 min',
    tags: ['Segling & regatta', 'Kajak', 'Konferensanläggningar', 'Dagsevent & fleranätter'],
    intro: [
      'Stockholms skärgård är Europas närmaste "expedition" från en storstad. Från Strömkajen är du på Grinda på 1h 45min, på Fjäderholmarna på 25 minuter. Det gör skärgården unik för teambuilding: du bryter helt från kontoret men behöver inte ta ut lediga dagar för restiden.',
      'Aktivitetsutbudet är bredare än någon annanstans i Sverige. Segelregatter med professionell instruktör, kajakpaddling i naturhamnar, vildmarkskök ombord på båt, orientering i skärgårdslandskap, klättring och friluftsliv. Allt anpassas för grupper från 8 till 200 personer.',
      'Konferenssidan är lika stark. Grinda Wärdshus, Fjäderholmarnas Krog och Utö Wärdshus hanterar allt från dagsevent utan boende till flerdagarskonferenser med helpension. Alla tre har fullständig AV-utrustning och dedicerad eventpersonal.',
    ],
    activities: [
      {
        icon: '⛵',
        name: 'Segelregatta',
        text: 'Tävla i lag på Stockholms skärgårds vatten med erfaret besättning och instruktörer. Inga förkunskaper krävs – allt handlar om teamwork, strategi och kommunikation ombord. Avslutas med prisudelning och middag.',
        priceRange: '600–1 200 kr/person',
      },
      {
        icon: '🛶',
        name: 'Kajakpaddling',
        text: 'Paddla i lag genom naturhamnar och sund. Tillgängligt för alla oavsett erfarenhet. Halvdagsturer (4 h) passar bäst som del av ett heldagsprogram. Guiden berättar om öarnas historia längs vägen.',
        priceRange: '400–800 kr/person',
      },
      {
        icon: '🧭',
        name: 'Skärgårdsorienteringen',
        text: 'Lag-utmaning med karta, kompass och utmaningar vid checkpoints utspridda på ön. Kombinerar rörelse med strategi – perfekt att väva in som uppvärmning eller tävlingsmoment i ett konferensprogram.',
        priceRange: '300–600 kr/person',
      },
      {
        icon: '🍳',
        name: 'Vildmarkskök ombord',
        text: 'Laga mat tillsammans på en öppen eld eller över Primus på klipphällen. Konceptet skapar naturlig samvaro och belönar grupper som samarbetar. Leverantörer tillhandahåller råvaror, redskap och recept.',
        priceRange: '400–700 kr/person',
      },
    ],
    venues: [
      {
        name: 'Grinda Wärdshus',
        location: 'Grinda, ca 1h 45min med Waxholmsbolaget',
        capacity: '8–60 personer',
        description: 'Klassisk skärgårdsmiljö med moderna konferenslokaler, helpension och egna kajakuthyrning. Populärt för 1–3-dagarskonferenser med aktivitetsprogram.',
        type: 'Konferensanläggning',
      },
      {
        name: 'Fjäderholmarnas Krog',
        location: 'Fjäderholmarna, 25 min från Slussen/Nybroplan',
        capacity: '10–200 personer',
        description: 'Närmaste konferensalternativet utanför stan. Exceptionell mat och naturlig miljö. Passar utmärkt för halvdagskonferenser och AW-event.',
        type: 'Restaurant & event',
      },
      {
        name: 'Utö Wärdshus',
        location: 'Utö, ca 2h med Waxholmsbolaget',
        capacity: '10–80 personer',
        description: 'Historisk krogmiljö på södra ytterskärgårdens pärla. Cykling, bastu, segling och lugn. Passar grupper som vill vara avskilda och fokuserade.',
        type: 'Konferensanläggning',
      },
    ],
    faqs: [
      {
        q: 'Vad kostar ett teambuildingevent i Stockholms skärgård?',
        a: 'Räkna med 1 500–4 000 kr per person för ett heldagsprogram med aktiviteter, mat och transport. Aktiviteter kostar 400–1 200 kr/person beroende på typ. Konferenspaket med övernattning och helpension tillkommer med 1 500–3 000 kr/natt/person.',
      },
      {
        q: 'Hur tidigt måste man boka teambuilding i skärgården?',
        a: 'Boka 2–4 månader i förväg för sommarsäsongen (juni–aug) och för öar med begränsad kapacitet som Grinda och Utö. Vårens konferensperiod (mars–maj) och hösten (september–oktober) är lättare att boka med 4–6 veckors framförhållning.',
      },
      {
        q: 'Vilken årstid är bäst för teambuilding i skärgården?',
        a: 'Maj–september är bäst för aktiviteter utomhus (segling, kajak, klippor). Maj och september är ofta bättre än juli: bättre väder, inga semestrar i laget och lägre priser. Oktober–november passar för inomhus-konferens med naturupplevelse runt om.',
      },
      {
        q: 'Behöver deltagarna kunna segla för en segelregatta?',
        a: 'Nej. Segelregattor för teambuilding är designade så att erfarna instruktörer driver båten – deltagarna lär sig grunderna snabbt och fokuserar på teamarbetet. De flesta aktörer tar emot grupper utan förkunskaper.',
      },
      {
        q: 'Kan man anordna teambuilding för stora grupper (50+ personer) i skärgården?',
        a: 'Ja, men planering är viktig. Dela upp i lag och kör parallella aktiviteter. Fjäderholmarna och Grinda hanterar upp till 100–200 personer med rätt upplägg. Egna charterbåtar kan anlitas för att transportera hela gruppen tillsammans.',
      },
    ],
  },

  {
    slug: 'goteborg',
    title: 'Teambuilding i Göteborg och Bohuslän 2026 – aktiviteter och event',
    h1: 'Teambuilding i Göteborg och Bohuslän',
    metaDescription: 'Teambuilding i Göteborg och Bohuslän – segling, klipphoppning, ostron och skärgårdskonferens. Allt för företagsevent på västkusten.',
    excerpt: 'Bohuslänska klippor och Västerhavet ger en vildare backdrop än Stockholms skärgård. Perfekt för event som kräver "wow-faktor" och äkta naturupplevelse.',
    location: 'Göteborg',
    emoji: '🌊',
    readTime: '7 min',
    tags: ['Klippmiljö', 'Västerhavet', 'Skaldjur & AW', 'Norrskärgård till Göteborg'],
    intro: [
      'Bohuslän erbjuder en teambuilding-upplevelse som Stockholms skärgård inte kan matcha: råa, öppna klippor mot Västerhavet, traditionella fisklägen och Nordens bästa skaldjur direkt vid kajen. Det ger event en naturlig "häftighet" utan att du behöver anstränga dig.',
      'Göteborg som utgångspunkt är ett stort plus. Med Lindholmens Tech-kluster och flera stora arbetsgivare bor ofta hela laget i stan, vilket eliminerar restid. Styrsöbolaget från Saltholmen når sydskärgårdens öar på 20–40 minuter.',
      'Skaldjursupplevelsen är unik. Att avsluta ett teambuildingevent med hummermiddag i Smögen eller ostronprovning på Grebbestad är inte möjligt någon annanstans i Sverige. Sådana minnen sätter sig och stärker lagkänslan bortom programmet.',
    ],
    activities: [
      {
        icon: '⛵',
        name: 'Segling i Bohusläns skärgård',
        text: 'Svårighetsnivån är något högre än Stockholms innerskärgård – Västerhavet ger verkliga utmaningar för lagen. Extra minnesvärt och lämpligt för grupper som söker äventyr och "off-the-path"-upplevelse.',
        priceRange: '700–1 400 kr/person',
      },
      {
        icon: '🦐',
        name: 'Skaldjurssafari och AW',
        text: 'Chartra en fiskebåt, fiskar räkor i Bohuslän och äter dem direkt på däck med majonnäs och knäckebröd. Enkel, billig och oförglömlig aktivitet. Passar utmärkt som AW-format (3–4 h).',
        priceRange: '500–900 kr/person',
      },
      {
        icon: '🧗',
        name: 'Klättring och klippäventyr',
        text: 'Bohuslänska klippmiljöer är perfekta för friluftsliv med låg tröskel. Klättring, utomhusyoga på hällen och "challenge course" – arrangerade av lokala friluftsleverantörer med utrustning och säkerhetsguider.',
        priceRange: '400–800 kr/person',
      },
    ],
    venues: [
      {
        name: 'Smögen Havsbad',
        location: 'Smögen, ca 1h 45min norr om Göteborg',
        capacity: '10–100 personer',
        description: 'Konferenshotell med havsutsikt, spa och restaurang med lokalt skaldjur. Passar 1–3-dagarskonferenser med hög servicegrad.',
        type: 'Konferenshotell',
      },
      {
        name: 'Styrsö Skäret',
        location: 'Styrsö, 35 min med Styrsöbolaget från Saltholmen',
        capacity: '8–40 personer',
        description: 'Intim konferensmiljö i Göteborgs sydskärgård. Lätt att nå utan bil, avskild natur, och serverar mat baserad på lokala råvaror.',
        type: 'Konferensanläggning',
      },
    ],
    faqs: [
      {
        q: 'Kan man arrangera teambuilding i Göteborg utan att åka till ön?',
        a: 'Ja. Göteborg har flera urbana alternativ i hamnen (Eriksberg, Frölunda). Men bästa upplevelsen får du om gruppen tar båten ut till sydskärgården – Styrsö nås på 35 minuter och ger en helt annan känsla.',
      },
      {
        q: 'Är Bohuslän bättre eller sämre än Stockholm för teambuilding?',
        a: 'Bohuslän är vildare och mer "Instagram-värdig" med sina klippor och öppet hav. Stockholm har större utbud av konferensanläggningar och fler aktivitetsleverantörer. Välj Bohuslän om du vill ha WOW-faktor och natur; Stockholm för ett mer strukturerat program med fler alternativ.',
      },
      {
        q: 'Vad kostar teambuilding i Göteborg?',
        a: 'Liknande Stockholm: 1 500–4 000 kr per person för heldagsevent med aktiviteter och mat. Skaldjursmiddag i Smögen eller Grebbestad kan tillkomma med 400–800 kr/person beroende på meny.',
      },
    ],
  },

  {
    slug: 'segling',
    title: 'Teambuilding segling – seglarregatta och offshore 2026',
    h1: 'Teambuilding segling – regatta och kappsegling för ditt team',
    metaDescription: 'Segelregatta som teambuilding. Hur funkar det, vad kostar det och vilka leverantörer erbjuder professionella seglarprogram i Sverige?',
    excerpt: 'En segelregatta kräver kommunikation, ledarskap och förtroende i realtid. Inget annat teambuilding-format triggar dessa kompetenser lika effektivt.',
    location: 'Sverige',
    emoji: '🏆',
    readTime: '7 min',
    tags: ['Ingen erfarenhet krävs', 'Ledarskap & kommunikation', 'Stockholm & Göteborg', 'Halv- och heldagsformat'],
    intro: [
      'Segling är det enda idrott där fem person på en båt måste kommunicera i realtid under press – med konsekvenser direkt synliga i farten och kursföringen. Det gör segelregattan till ett av de mest evidensbaserade formaten för teamutveckling.',
      'Upplägget är enkelt: gruppen delas i lag, varje lag får en instruktörsbåt som co-skipper och sedan kör ni ett lopp. Inga förkunskaper behövs – instruktören tar hand om säkerheten, laget tar hand om strategi och kommunikation. Vinnaren korar vid prisudelning på kvällen.',
      'Format varierar från halvdagsregatter (4 h, inga övernattningar) till flerdagsresor längs Bohuslänska kusten. Det kortare formatet passar kickoff och AW. Det längre passar ledningsgrupper och projekt-team som behöver tid utan telefonen.',
    ],
    activities: [
      {
        icon: '🏁',
        name: 'Klassisk regatta (halvdag)',
        text: 'Kurs 3–5 sjömil i skyddade vatten. 2–3 lopp med tidtagning och taktisk briefing inför varje. Avslutas med prisudelning. Passar 8–40 deltagare på 2–5 båtar.',
        priceRange: '600–1 200 kr/person',
      },
      {
        icon: '🌊',
        name: 'Offshore-regatta (2 dagar)',
        text: 'Segla från Sandhamn via naturhamnar till en slutdestination och tillbaka. Övernattning i gästhamn med middag och briefing. Kräver mer engagemang men ger djupare lagupplevelse.',
        priceRange: '3 000–5 500 kr/person (inkl. mat och hamnavgifter)',
      },
      {
        icon: '📚',
        name: 'Segling med träningsmoment',
        text: 'Kombination av segling och workshop om kommunikation, ledarskap eller beslutsfattande under stress. Facilitatorn knyter ihop beteenden på däck med situationer på jobbet. Populärt för ledningsgrupper.',
        priceRange: '1 200–2 500 kr/person',
      },
    ],
    venues: [],
    faqs: [
      {
        q: 'Behöver man ha seglat förut för en regatta?',
        a: 'Nej. Professionella instruktörer säkrar båten och lär ut grunderna på 30 minuter. Fokus ligger på teamarbete och kommunikation, inte segelkunskaper. De flesta leverantörer tar emot fullständiga nybörjargrupper.',
      },
      {
        q: 'Hur stor grupp passar en segelregatta?',
        a: 'Optimalt för 10–60 deltagare. Under 10 är det svårt att dela i mer än 2 lag; över 60 kräver många båtar och noggrann logistik. 20–40 deltagare ger bäst dynamik och är enklast att arrangera.',
      },
      {
        q: 'Hur lång tid tar en segeltävling?',
        a: 'Halvdag-format: 4 h på vattnet plus 1 h briefing/prisudelning = ca 6 h totalt. Heldagsformat med lunch ombord tar 8–9 h. Offshore-regatter sträcker sig 2–5 dagar.',
      },
      {
        q: 'Vad kostar en segelregatta för ett team?',
        a: 'Räkna med 600–1 200 kr per person för ett halvdagsformat. Heldagsregatta med mat ombord kostar 1 200–2 500 kr/person. Offshore-paket med övernattning: 3 000–5 500 kr/person.',
      },
    ],
  },

  {
    slug: 'kajak',
    title: 'Teambuilding kajak och paddling 2026 – guide för företag',
    h1: 'Teambuilding kajak – paddla i lag längs Sveriges kust',
    metaDescription: 'Teambuilding med kajak och paddling. Guidade paddelturerna passar alla erfarenhetsnivåer. Priser, upplägg och var du bokar i Stockholm och Göteborg.',
    excerpt: 'Kajakpaddling i lag kräver samordning, tålamod och kommunikation. Utan motorns buller pratas det mer – och bättre. Utmärkt format för team som behöver röra sig.',
    location: 'Sverige',
    emoji: '🛶',
    readTime: '6 min',
    tags: ['Alla erfarenhetsnivåer', 'Naturupplevelse', 'Halv- och heldagsformat', 'Grupper 6–40 pers'],
    intro: [
      'Kajakpaddling är troligen det enklaste teambuilding-formatet att genomföra logistiskt – ingen charterbåt, inga licenskrav, inga komplicerade säkerhetsbriefer. Guide och kajaker finns på plats, man paddlar iväg och är tillbaka på lunch. Trots enkelheten skapar det starka lagupplevelser.',
      'Utan motorljud försvinner möjligheten att undvika samtal. Tandemkajakens 3 knop tvingar fram lugn, lyssnande och synkronisering. Grupper som sällan pratar om något annat än projektstatus hittar sig ofta i genuint samtal ute på vattnet.',
      'Formaten är flexibla. Halvdag (4 h) passar utmärkt som aktivitetsdel i ett konferensprogram. Heldag med picknick i naturhamn ger en komplett utomhusdag. Paddlingsäventyret kan kombineras med orientering, mat på eld eller bastu i slutet.',
    ],
    activities: [
      {
        icon: '🛶',
        name: 'Guidad kajaktur (halvdag)',
        text: 'Gruppen paddlar 6–10 km med guide längs kusten eller i skyddade sund. Pausar vid naturhamn med fika. Inga förkunskaper krävs. Instruktör anpassar tempot till gruppen.',
        priceRange: '400–700 kr/person',
      },
      {
        icon: '🏁',
        name: 'Kajak-challenge (tävling)',
        text: 'Lag tävlar i slalom, snabbpaddling och samordningsövningar. Poängsystem och prisudelning. Populärt som uppvärmnings- eller tävlingsmoment. Kräver lite mer av deltagarna men ger högt engagemang.',
        priceRange: '500–900 kr/person',
      },
      {
        icon: '🔥',
        name: 'Paddling + mat på eld',
        text: 'Paddla till naturhamn, laga mat på Primus eller öppen eld och ät lunch ute i skärgården. Kombinationen av rörelse och gemensam matlagning ger en av de mest minnesvärda teambuilding-dagarna.',
        priceRange: '600–1 000 kr/person',
      },
    ],
    venues: [],
    faqs: [
      {
        q: 'Kan man paddla kajak utan erfarenhet i en teambuilding?',
        a: 'Ja. Kustkajakpaddling på lugnt vatten (innerskärgård, skyddade vikar) är lämpligt för nybörjare. Guiden ger en 20–30-minutersbriefing om paddelteknik och säkerhet. Tandemkajaker är ännu enklare och rekommenderas för grupper med blandad erfarenhet.',
      },
      {
        q: 'Hur stor grupp passar för kajakteambuilding?',
        a: 'Optimalt för grupper om 6–30 deltagare. Mindre grupper behåller sin dynamik; större grupper kan delas i parallella lag med var sin guide.',
      },
      {
        q: 'Vad kostar kajakteambuilding?',
        a: '400–1 000 kr per person beroende på format (halvdag, heldag, med mat). Lägg till eventuell transport till och från ön.',
      },
      {
        q: 'Var ordnar man kajakteambuilding i Stockholm och Göteborg?',
        a: 'I Stockholm finns leverantörer på Sandhamn, Utö, Grinda och Vaxholm. I Göteborg via Styrsöbolagets destinationer i sydskärgården eller klippiga Bohuslän. Svalla listar öar med uthyrning på respektive ö-sida.',
      },
    ],
  },

  {
    slug: 'konferens',
    title: 'Konferens och AW i skärgården 2026 – guide för företag',
    h1: 'Konferens och AW i skärgården',
    metaDescription: 'Boka konferens i skärgården. De bästa konferensanläggningarna på öarna, transport, priser och tips för en lyckad kickoff eller AW i Stockholms eller Göteborgs skärgård.',
    excerpt: 'Att mötas utanför kontoret på en ö förändrar dynamiken i rummet. Konferens i skärgården ger kreativitet, fokus och lagkänsla som ett hotell i stan aldrig kan matcha.',
    location: 'Sverige',
    emoji: '🏢',
    readTime: '7 min',
    tags: ['Dagsevent och fleranätter', 'Helpension', 'AV-utrustning', 'Transport ingår'],
    intro: [
      'Forskning visar konsekvent att konferenser utanför den vanliga kontorsmiljön ger högre kreativitet och bättre beslutsfattande. Skärgårdsöar är perfekta för det: inga bilar, inga hissar, inga avbrott från kollegor som inte är med på konferensen.',
      'Sverige har ett unikt utbud av skärgårdskonferenser – från intimt värdshus med 8 gäster till stora anläggningar för 200 deltagare. De bästa anläggningarna kombinerar modernt konferensrum med skärgårdsmat, aktiviteter och naturlig avkoppling direkt utanför dörren.',
      'AW i skärgården är en egen genre. Tar man Waxholmsbolaget ut till Fjäderholmarna efter jobbet och avslutar med middag och havsluft är det ett event som håller i minnet resten av kvartalet. Enklare än man tror att arrangera – och billigare.',
    ],
    activities: [
      {
        icon: '📋',
        name: 'Heldagskonferens med aktiviteter',
        text: 'Workshops och presentationer på förmiddagen, aktiviteter (segling, kajak, orientering) på eftermiddagen, middag och avslutning på kvällen. Det klassiska skärgårds-konferensprogrammet.',
        priceRange: '2 000–4 500 kr/person (inkl. mat, aktiviteter, transport)',
      },
      {
        icon: '🥂',
        name: 'AW och after work på ö',
        text: 'Tar man Waxholmsbolaget/Strömma direkt efter jobbet ut till Fjäderholmarna eller Grinda – middag eller havsluft i 3 timmar, sedan hem med kvällsbåten. Inget boende krävs. Enkelt och minnesvärt.',
        priceRange: '400–900 kr/person (middag exkl. transport)',
      },
      {
        icon: '🌙',
        name: 'Flerdagarskonferens med övernattning',
        text: 'Gruppen stannar 1–3 nätter på ön. Separeras effektivt från jobb och vardagsdistraktion. Djupare lagdiskussioner och relationsbyggande. Helpension med frukost, lunch, middag och aktiviteter ingår.',
        priceRange: '2 500–5 000 kr/person/natt',
      },
    ],
    venues: [
      {
        name: 'Grinda Wärdshus',
        location: 'Grinda, 1h 45min med Waxholmsbolaget',
        capacity: '8–60 personer',
        description: 'Skärgårdens mest kompletta konferensanläggning utanför stan. Helpension, eget konferensrum, kajak och segling. Bokat 4–6 månader i förväg under sommarsäsongen.',
        type: 'Konferensanläggning',
      },
      {
        name: 'Fjäderholmarnas Krog',
        location: 'Fjäderholmarna, 25 min från Slussen',
        capacity: '20–200 personer',
        description: 'Närmaste premium AW-lokalen utanför stan. Svensk matlagning i toppklass, havsutsikt, stor terrass. Perfekt för halvdagsevent och AW.',
        type: 'Restaurant & event',
      },
      {
        name: 'Utö Wärdshus',
        location: 'Utö, ca 2h med Waxholmsbolaget',
        capacity: '10–80 personer',
        description: 'Historisk anläggning på södra ytterskärgårdens mest exklusiva ö. Cykel, bastu, sjösättning och ro-båt ingår för gästerna. Mer avskilt och fokuserat än Grinda.',
        type: 'Konferensanläggning',
      },
    ],
    faqs: [
      {
        q: 'Hur bokar man konferenslokal i skärgården?',
        a: 'Kontakta anläggningarna direkt (Grinda, Fjäderholmarna, Utö) med datum, antal deltagare och ungefärligt program. Anläggningarna hanterar sedan mat, transport, aktiviteter och AV i ett paket. Boka 3–6 månader i förväg för sommaren.',
      },
      {
        q: 'Vad kostar konferens i skärgården?',
        a: 'Dagsevent utan övernattning: 1 500–3 000 kr/person inkl. mat, lokal och aktiviteter. Med övernattning (helpension): 2 500–5 000 kr/person/natt. AW-format (4–5 h, enbart middag): 500–900 kr/person exkl. transport.',
      },
      {
        q: 'Ingår transport i konferenspaketen?',
        a: 'Inte alltid – fråga alltid om biljetter till Waxholmsbolaget eller Strömma ingår. Många anläggningar erbjuder att boka transport åt gruppen till ett tillägg, vilket underlättar logistiken avsevärt.',
      },
      {
        q: 'Vad ska man tänka på vid konferens i skärgården jämfört med hotellet i stan?',
        a: 'Planera logistiken minutiöst – sista båten hem går vid en viss tid. Mobilsignalen kan vara svag (ofta en bonus för fokus). Ta med extra kläder, skärgårdsväder ändras snabbt. Boka backup-aktiviteter för dåligt väder.',
      },
    ],
  },
]

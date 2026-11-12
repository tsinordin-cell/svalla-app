export type SegelkursFAQ = { q: string; a: string }

export type SegelkursSub = {
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
  kurstyper: { name: string; length: string; level: string; certificate: string; price?: string; desc: string }[]
  faqs: SegelkursFAQ[]
  /** Seglarskolor med kontrollerade uppgifter. Inga priser (Svallas regel). */
  anordnare?: Seglarskola[]
}

export type Seglarskola = {
  namn: string
  ort: string
  url: string
  partner?: boolean
  /** Källa och datum då uppgifterna lästes på anordnarens egen sida */
  kalla: string
  last: string
  kurser: { namn: string; fakta: string[] }[]
}

export const SEGELKURS_SUBS: SegelkursSub[] = [
  {
    slug: 'stockholms-skargard',
    title: 'Segelkurs i Stockholm och skärgården: seglarskolor jämförda',
    h1: 'Segelkurs i Stockholm och skärgården',
    metaDescription: 'Seglarkurser i Stockholm och skärgården jämförda: nybörjarkurser, seglarintyg och kurser där du bor ombord. Uppgifterna är kontrollerade mot seglarskolornas egna sidor.',
    excerpt: 'Seglarskolor i Stockholmsområdet på ett ställe, från en kvälls prova på till kurser där du bor ombord. Varje uppgift är kontrollerad mot seglarskolans egen sida, med källa och datum.',
    location: 'Stockholm',
    emoji: '⛵',
    readTime: '6 min',
    tags: ['Nybörjare välkommen', 'Seglarintyg', 'Bo ombord', 'Små grupper'],
    intro: [
      'Här finns seglarkurser från Dalarö och Nynäshamn i södra skärgården till Riddarfjärden mitt i stan och Viggbyholm i Täby. Nybörjarkurserna hos alla seglarskolor nedan kräver inga förkunskaper.',
      'Vi skriver inga priser. Kontrollera alltid aktuella datum och villkor hos seglarskolan innan du bokar, och hör av dig till info@svalla.se om något inte stämmer.',
    ],
    kurstyper: [],
    anordnare: [
      {
        namn: 'Sjöbris Stockholm',
        ort: 'Dalarö, södra skärgården',
        url: 'https://sjobris-stockholm.se/?ref=svalla',
        // KÄLLA: sjobris-stockholm.se — "Du lär dig grunderna i seglingen ... under tre dagar", "max 4 deltagare"; skärgårdssegling dag "max 5 deltagare"; två dagar med "övernattning i naturhamn"; "Vi utgår från Dalarö" (läst 2026-11-10)
        kalla: 'sjobris-stockholm.se',
        last: '2026-11-10',
        kurser: [
          { namn: 'Seglarkurs för nybörjare', fakta: ['Nybörjare', '3 dagar', 'Max 4 deltagare'] },
          { namn: 'Skärgårdssegling, en dag', fakta: ['En dag', 'Max 5 deltagare'] },
          { namn: 'Skärgårdssegling, två dagar', fakta: ['Två dagar', 'Övernattning i naturhamn'] },
        ],
      },
      {
        namn: 'Vind o Vatten',
        ort: 'Dalarö (Östra Vadviken), södra skärgården',
        url: 'https://vindovatten.se/sv/seglarkurs-steg-1/',
        // KÄLLA: vindovatten.se/sv/seglarkurs-steg-1 — "Under tre dagar", "9.00-17.00 under tre dagar i följd", "ni är aldrig mer än fyra deltagare ombord", "Kursen ges som dagkurs, ej övernattning ombord", "kurser för kvinnor ... och mixade grupper", "efter kursen kan du examineras för Seglarintyg steg 1"; steg 2 "boende ombord" (läst 2026-11-12)
        kalla: 'vindovatten.se',
        last: '2026-11-12',
        kurser: [
          { namn: 'Seglarkurs steg 1, nybörjare', fakta: ['Nybörjare', '3 dagar, 9 till 17', 'Max 4 deltagare', 'Dagkurs', 'Kvinnor eller mixad grupp', 'Prov för Seglarintyg 1 efteråt'] },
          { namn: 'Seglarkurs steg 2', fakta: ['Fortsättning', 'Boende ombord'] },
        ],
      },
      {
        namn: 'Sailstar',
        ort: 'Viggbyholm, Täby',
        url: 'https://www.sailstar.se/',
        // KÄLLA: sailstar.se — Prova-på "1 kväll, 2 timmar Max 4 deltagare"; Grundkurs segling "3 dagar Max 4 deltagare per båt Seglarintyg 1"; stor båt "4 dagar, 3 nätter Max 6 deltagare Seglarintyg 1 och 2"; Kombivecka "6 dagar, 5 nätter Max 6 deltagare" (läst 2026-11-12)
        kalla: 'sailstar.se',
        last: '2026-11-12',
        kurser: [
          { namn: 'Prova på att segla', fakta: ['Nybörjare', '1 kväll, 2 timmar', 'Max 4 deltagare'] },
          { namn: 'Grundkurs segling', fakta: ['Nybörjare', '3 dagar', 'Max 4 per båt', 'Seglarintyg 1'] },
          { namn: 'Grundkurs segling, stor båt', fakta: ['4 dagar, 3 nätter', 'Bo ombord', 'Max 6 deltagare', 'Seglarintyg 1 och 2'] },
          { namn: 'Kombivecka nivå 1 och 2, stor båt', fakta: ['6 dagar, 5 nätter', 'Bo ombord', 'Max 6 deltagare'] },
        ],
      },
      {
        namn: 'Stockholms Segelsällskap (SSS)',
        ort: 'Västerbrohamnen, centrala Stockholm',
        url: 'https://www.stockholmssegelsallskap.se/traning-kappsegling/seglarskola/',
        // KÄLLA: stockholmssegelsallskap.se — "Helgkurs nybörjare C55 (ungdom/vuxen)", "lördag och söndag", "ca 9-16.30", "Västerbrohamnen", "ungefär 12 deltagare", "C55:or som seglas av 3-4 personer", "Förkunskapskrav: inga" (läst 2026-11-12)
        kalla: 'stockholmssegelsallskap.se',
        last: '2026-11-12',
        kurser: [
          { namn: 'Helgkurs nybörjare i C55', fakta: ['Ungdom och vuxen', 'Lördag och söndag', 'Ungefär 12 deltagare', '3 till 4 per båt', 'Inga förkunskaper'] },
        ],
      },
      {
        namn: 'The Green Trails',
        ort: 'Marinan i Nynäshamn, södra skärgården',
        url: 'https://www.thegreentrails.com/sv/seglingskurser-i-stockholm/',
        // KÄLLA: thegreentrails.com/sv/seglingskurser-i-stockholm — "teorikursen online + Nynäshamn", nybörjare "heldag i skärgården", PLUS "kväll + två dagar", seglarintyg 2 "två dagar med övernattning", intensiv 1+2 "tre dagar med övernattningar", "Ingen tidigare erfarenhet krävs" (läst 2026-11-12)
        kalla: 'thegreentrails.com',
        last: '2026-11-12',
        kurser: [
          { namn: 'Nybörjarkurs, seglarintyg 1', fakta: ['Nybörjare', 'Teori online och en heldag'] },
          { namn: 'Nybörjarkurs PLUS, seglarintyg 1', fakta: ['Nybörjare', 'Kväll och två dagar', 'Även navigering och sjömärken'] },
          { namn: 'Fortsättningskurs, seglarintyg 2', fakta: ['Fortsättning', 'Två dagar', 'Övernattning på båten'] },
          { namn: 'Intensivkurs, seglarintyg 1 och 2', fakta: ['Tre dagar', 'Övernattningar ombord'] },
        ],
      },
    ],
    faqs: [
      {
        q: 'Behöver jag ha seglat förut?',
        a: 'Nej. Nybörjarkurserna hos Sjöbris, Vind o Vatten, Sailstar, Stockholms Segelsällskap och The Green Trails kräver inga förkunskaper enligt seglarskolorna själva.',
      },
      {
        q: 'Vad är Seglarintyg 1?',
        // KÄLLA: vindovatten.se/sv/seglarkurs-steg-1 — "Efter kursen kan du skriva ett prov för Seglarintyg steg 1 och få intyget registrerat hos Nämnden för Båtlivsutbildning", "appen NFB Båtintyg" (läst 2026-11-12)
        a: 'Ett intyg du kan ta efter en grundkurs. Hos Vind o Vatten skriver du prov efter kursen, och intyget registreras hos Nämnden för Båtlivsutbildning i appen NFB Båtintyg.',
      },
      {
        q: 'Kan jag bo ombord under kursen?',
        a: 'Ja, hos flera. Sailstar har kurser på fyra och sex dagar på en stor båt, The Green Trails har övernattning på fortsättnings- och intensivkursen, Vind o Vatten har boende ombord på steg 2 och Sjöbris skärgårdssegling över två dagar övernattar i naturhamn.',
      },
      {
        q: 'Hur tar jag mig till Dalarö utan bil?',
        // KÄLLA: SL tidtabell 839 (se Dalarö-sidans källor) — Handens station → Hotellbryggan 33–40 min
        a: 'Med pendeltåg till Handen och sedan buss 839, 33 till 40 minuter från Handens station. Se Dalarösidan på Svalla för nästa avgångar.',
      },
    ],
  },

  {
    slug: 'goteborg',
    title: 'Segelkurs i Göteborg och Bohuslän 2026 – guide',
    h1: 'Segelkurs i Göteborg och Bohuslän',
    metaDescription: 'Hitta segelkurs i Göteborg och Bohuslän. Lär dig segla i Västerhavet och längs den bohuslänska klippkusten. Nybörjarkurser och avancerat.',
    excerpt: 'Att segla i Bohuslän är att segla i ett av Skandinaviens vackraste och mest utmanande vatten. Kurserna här formar riktiga seglare snabbare än lugna innerskärgårdar.',
    location: 'Göteborg',
    emoji: '🌊',
    readTime: '7 min',
    tags: ['Västerhavet', 'Bohuslän klippmiljö', 'Utmanande seglarvatten', 'Kustskepparintyg'],
    intro: [
      'Göteborg och Bohuslän är den perfekta platsen att ta nästa steg i seglingen. Västerhavet är mer krävande än innerskärgårdar med starkare vindbyar och vågor som faktiskt "räknas" – det formar bättre seglare på kortare tid.',
      'Göteborg har ett levande segelsällskapsliv. GKSS (Göteborgs Kungliga Segel Sällskap) i Långedrag och Marstrands Segelsällskap är bland de mest aktiva kursarrangörerna på västkusten. Med bil når du Bohuslänska kursanläggningar längs kusten norrut mot Smögen.',
      'Kurssäsongen i Göteborg är längre än många tror – maj till september med bra väder. Sommarkurser med övernattning ombord längs Bohusläns kust är populärt och ger ett komprimerat lärande mitt i naturupplevelsen.',
    ],
    kurstyper: [
      {
        name: 'Segelnybörjare – Göteborg',
        length: '1–2 dagar',
        level: 'Nybörjare',
        certificate: 'Kursbevis',
        // KÄLLA: GKSS vuxenkurser 2026 — gkss.se/sv/seglarskola/vuxenkurser (avläst 2026-08-11)
        price: '5 100–6 600 kr (weekend Långedrag 5 100, veckokurs 5 500, Marstrand med boende 5 600–6 600)',
        desc: 'Grundkurs i segling på Göteborgs skogsrika och klipprikt hav. Mindre grupper, erfarna instruktörer. Sätter fokus på manövrar i Västerhavet.',
      },
      {
        name: 'Kustskepparintyget Bohuslän',
        length: '5–7 dagar',
        level: 'Medel',
        certificate: 'Kustskepparintyget (KA)',
        // KÄLLA: Safety & Navigationsgruppen, distanskurs — sngruppen.se/kurs/kustskepparintyg-pa-distans-online (avläst 2026-08-11)
        price: 'från 2 995 kr (distans eller klassrum) + litteratur',
        desc: 'KA-kursen längs Bohusläns klippmiljöer är extra värdefull för den som vill segla Nordsjön och norska kusten. Kombinerar teori med praktik i verkliga förhållanden.',
      },
    ],
    faqs: [
      {
        q: 'Är det svårare att lära sig segla i Bohuslän jämfört med Stockholms skärgård?',
        a: 'Ja. Västerhavet och Bohuslänsk kust är mer utmanande med starkare och mer variabla vindar. Nybörjare lär sig snabbare – men det kräver mer av instruktör och båt. Kom med rätt inställning: det är en intensivare men mer givande segling.',
      },
      {
        q: 'Var i Göteborg hittar man segelkurser?',
        a: 'GKSS (Göteborgs Kungliga Segel Sällskap) i Långedrag och Marstrands Segelsällskap är välkända kursarrangörer på västkusten. Kontakta Svenska Seglarförbundets lokalföreningar via seglarforbundet.se för en heltäckande lista av klubbar med kursverksamhet.',
      },
    ],
  },

  {
    slug: 'nyborgare',
    title: 'Segelkurs nybörjare 2026 – kom igång med segling',
    h1: 'Segelkurs för nybörjare – lär dig segla från grunden',
    metaDescription: 'Segelkurs för nybörjare i Sverige. Allt du behöver veta om din första segelkurs: vad du lär dig, hur lång tid det tar och vad det kostar.',
    excerpt: 'Du behöver inga förkunskaper för att börja segla. En dag räcker för att förstå grunderna – en helg räcker för att manövrera självständigt.',
    location: 'Sverige',
    emoji: '🎓',
    readTime: '7 min',
    tags: ['Noll förkunskaper', 'Från 1 dag', 'Familjevänligt', 'Hela Sverige'],
    intro: [
      'Att lära sig segla är enklare än de flesta tror. Grunderna – hur vinden fungerar, hur man trimmar segel, hur man manövrerar i hamn – tar en dag att förstå och en helg att bli bekväm med. Det är inte raketvetenskap, det är intuitivt när man väl är ute på vattnet.',
      'De flesta segelsällskap i Sverige välkomnar nybörjare med öppna armar. Kurserna är lågtröskelliga: du behöver inga egna kläder (låna av segelsällskapet), ingen utrustning och inga förkunskaper. Ta med dig nyfikenhet och skor med vit sula.',
      'Välj en kurs som passar din ambitionsnivå. Vill du bara prova segling? Boka en introduktionskurs (1 dag). Vill du ta förarintyget och kunna hyra båt? Räkna med 2–3 helger. Vill du segla självständigt på längre turer? Kustskepparintyget tar 6–12 månader med rätt studietakt.',
    ],
    kurstyper: [
      {
        name: 'Seglarprovet / Prova-på-dag',
        length: '1 dag',
        level: 'Absolut nybörjare',
        certificate: 'Kursbevis',
        price: 'Ofta gratis eller symbolisk avgift på klubbarnas prova-på-dagar — hör med din lokala klubb',
        desc: 'Du sitter med på en segelbåt med instruktör och en liten grupp. Ingen teori, ingen press – du provar rodret och känner vinden. Perfekt för att avgöra om segling är rätt för dig.',
      },
      {
        name: 'Grön-kurs / Nybörjarkurs',
        length: '2–3 dagar eller 1 helg',
        level: 'Nybörjare',
        certificate: 'Grön flagg / Seglarbok',
        // KÄLLA: SSS helgkurs (stockholmssegelsallskap.se) och GKSS vuxenkurser (gkss.se), avlästa 2026-08-11
        price: '4 400–6 600 kr hos SSS och GKSS',
        desc: 'Systematisk genomgång av segling från grunden. Teori och praktik varvas. Du lär dig terminologi, manövrar, sjövägsregler och hur du tar dig in och ut ur hamn.',
      },
      {
        name: 'Förarintyget (SBF/SSRS)',
        length: '2–3 helger',
        level: 'Nybörjare till medel',
        certificate: 'Förarintyget',
        // KÄLLA: Safety & Navigationsgruppen — sngruppen.se/kurs/forarbevis-och-forarintyg-bat-stockholm (avläst 2026-08-11)
        price: 'från 1 995 kr + litteratur ca 400 kr',
        desc: 'Det vanligaste certifikatet i Sverige. Erkänt av hyrbåtsbolag och ger rätt att föra de flesta fritidsbåtar. Kan tas i kombination med Grön-kurs eller separat.',
      },
    ],
    faqs: [
      {
        q: 'Hur gammal måste man vara för att gå segelkurs?',
        a: 'Barn från 7–8 år kan börja i seglarskola (Optimistbåten). Vuxenkurser börjar normalt från 14–16 år. Ingen övre åldersgräns – många börjar segla i 50- och 60-årsåldern.',
      },
      {
        q: 'Vad behöver man ha med sig till en segelkurs?',
        a: 'Kläder att bli blöta i (vind- och vattentätt rekommenderas), skor med vit sula (inte märker däcket), solskydd och vatten. Segelsällskapet tillhandahåller flytväst. Fråga i förväg om du behöver ta med lunch.',
      },
      {
        q: 'Kan man lära sig segla utan att ha tillgång till en egen båt?',
        a: 'Ja, det är faktiskt normen. De flesta nybörjare lär sig segla på segelsällskapets eller segelskolans båtar. Kursavgiften täcker normalt båten. Att äga en båt är inte ett krav ens för avancerade certifikat.',
      },
      {
        q: 'Hur lång tid tar det att kunna segla självständigt?',
        a: 'Grunderna lär du dig på en dag. Att segla självständigt, kort tur i känt vatten: 1–2 helger. Förarintyget och att kunna hyra båt: 2–3 månader. Kustskepparintyget och självständig navigation: 6–18 månader beroende på studietakt.',
      },
    ],
  },

  {
    slug: 'barn-ungdomar',
    title: 'Segelkurs för barn och ungdomar 2026 – seglarskola',
    h1: 'Segelkurs för barn och ungdomar – seglarskolan',
    metaDescription: 'Segelkurs och seglarskola för barn och ungdomar i Sverige. Optimistbåten, Zoom8 och ungdomssegling. Hitta rätt kurs för ditt barn.',
    excerpt: 'Barn som seglar lär sig samarbete, naturförståelse och självförtroende. Seglarskolan är en av de bästa sommaraktiviteterna för barn 7–15 år.',
    location: 'Sverige',
    emoji: '⛵',
    readTime: '6 min',
    tags: ['7–15 år', 'Optimistbåten', 'Sommarseglarskola', 'Hela Sverige'],
    intro: [
      'Seglarskolan är en av Sveriges mest klassiska sommaraktiviteter för barn. Sedan 1960-talet har segelsällskap runt om i landet erbjudit veckolånga kurser där barn 7–15 år lär sig segla i Optimistbåten – en liten, säker enbarnsbåt designad för just denna åldersgrupp.',
      'Utöver segling lär sig barnen samarbete, naturförståelse och problemlösning. Att sköta en båt ensam, läsa vinden och navigera till en brygga ger ett genuint självförtroende som stannar kvar.',
      'De flesta segelsällskap i Sverige erbjuder seglarskola under juni, juli och augusti. Kurser är normalt 5 dagar (mån–fre) med undervisning 9–16. Äldre ungdomar (13–17 år) kan gå vidare till tävlingssegling eller kustseglarkurs.',
    ],
    kurstyper: [
      {
        name: 'Seglarskolan Optimistbåt (7–12 år)',
        length: '5 dagar (mån–fre)',
        level: 'Nybörjare',
        certificate: 'Seglarbok / Grön flagg',
        // KÄLLA: KSSS seglarskola 2026, 4–5-dagarsläger 8–12 år — ksss.se/lager/seglarskola (avläst 2026-08-11)
        price: '2 900–3 300 kr per lägervecka hos KSSS',
        desc: 'Barnet lär sig segla ensam i Optimistbåten under instruktörer i medseglingsbåt. Säker, pedagogisk och väldigt rolig. Normalt 6–10 barn per grupp.',
      },
      {
        name: 'Juniortävling och Zoom8 (11–15 år)',
        length: 'Veckolång kurs eller säsongsprogram',
        level: 'Medel – viss segling',
        certificate: 'Gul flagg / Seniorflagg',
        price: 'Terminsavgift varierar per klubb — se klubbens seglarsektion',
        desc: 'Barn som kan grunderna avancerar till tävlingsklasser som Zoom8 och 29er. Fokus på kappsegling, taktik och träning i grupp. Inträdesbiljett till ungdomssegling på riksnivå.',
      },
      {
        name: 'Kustseglarkurs för ungdomar (15–18 år)',
        length: '5–7 dagar ombord',
        level: 'Medel till avancerad',
        certificate: 'Kustseglarcertifikat',
        price: 'Varierar per klubb och kurslängd — se klubbens seglarsektion',
        desc: 'Ungdomar seglar i sällskap med instruktör längs kusten, övernattning ombord. Lär sig navigation, vakt och oceanseglingens grunder. Steg mot förarintyg och KA.',
      },
    ],
    faqs: [
      {
        q: 'Hur gammal måste barnet vara för att börja i seglarskolan?',
        a: 'De flesta seglarskolor tar emot barn från 7 år. Undre gräns sätts ofta av storlek (barnet ska kunna nå rodret i en Optimist) snarare än ålder. Fråga det lokala segelsällskapet om de har kurser för yngre.',
      },
      {
        q: 'Behöver barnet kunna simma för att gå segelkurs?',
        a: 'Ja, simkunnighet krävs i princip alltid. Barnet ska klara att simma 200 meter utan hjälpmedel. Flytväst används alltid under segling, men simkunnighet är ett säkerhetskrav.',
      },
      {
        q: 'Var hittar man seglarskola för barn i Sverige?',
        a: 'Svenska Seglarförbundets hemsida har en sökfunktion för alla lokala segelsällskap med seglarskola. Över 400 segelsällskap erbjuder seglarskola på somrarna. Boka tidigt – populära seglarskolor är fullbokade redan i mars.',
      },
      {
        q: 'Vad kostar seglarskolan?',
        // KÄLLA: KSSS seglarskola 2026 — ksss.se/lager/seglarskola (avläst 2026-08-11)
        a: 'KSSS seglarskola för 8–12-åringar kostar 2 900–3 300 kr för en lägervecka på 4–5 dagar (2026). Priser varierar mellan klubbar. Utrustning som flytväst lånas ofta av sällskapet. Fråga om familjerabatt om flera barn går kursen.',
      },
    ],
  },
]

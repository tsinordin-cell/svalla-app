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
  kurstyper: { name: string; length: string; level: string; certificate: string; price: string; desc: string }[]
  faqs: SegelkursFAQ[]
}

export const SEGELKURS_SUBS: SegelkursSub[] = [
  {
    slug: 'stockholms-skargard',
    title: 'Segelkurs i Stockholms skärgård 2026 – nybörjare och avancerad',
    h1: 'Segelkurs i Stockholms skärgård',
    metaDescription: 'Hitta segelkurs i Stockholms skärgård. Nybörjarkurser, kustskepparintyg och veckolånga segeläventyr. Priser och de bästa segelskolorna nära Stockholm.',
    excerpt: 'Stockholms skärgård kombinerar vackert vatten med en av Europas tätaste koncentrationer av segelsällskap och segelskolor. Perfekt för din första eller femtonde kurs.',
    location: 'Stockholm',
    emoji: '⛵',
    readTime: '8 min',
    tags: ['Nybörjare välkommen', 'Kustskepparintyg', 'Veckolånga kurser', 'Dagskurser'],
    intro: [
      'Stockholm har fler segelsällskap per capita än nästan någon annan stad i världen. Det ger ett exceptionellt utbud av segelkurser – från korta helgkurser för nybörjare till veckolånga kustskepparintyget (KA) och offshore-segling mot Gotland.',
      'Innerskärgårdens vatten är idealiskt för nybörjare. Smala sund och skyddade vikar gör att du kan öva manövrar utan att oroa dig för hård vind och vind. De flesta segelskolorna i Stockholm startar sina kurser från Saltsjöbaden, Lidingö eller Vaxholm.',
      'Kursutbudet är brett. Vill du bara lära dig grunderna på en dag eller helg finns det. Vill du ta förarintyget (SBF/SSRS) tar det 2–3 helger. Kustskepparintyget (KA) kräver 5–7 dagars teori och praktik ombord.',
    ],
    kurstyper: [
      {
        name: 'Introduktionskurs segeln',
        length: '1 dag (6–8 h)',
        level: 'Nybörjare',
        certificate: 'Intyg om kursdeltagande',
        price: '800–1 500 kr',
        desc: 'Grunderna i kurssegling: vind, manövrar, ankring och säkerhet. Perfekt för dig som aldrig seglat förut. Grupper om 4–6 deltagare på en segelbåt med instruktör.',
      },
      {
        name: 'Förarintyg (SBF/SSRS)',
        length: '2–3 helger',
        level: 'Nybörjare till medel',
        certificate: 'Förarintyget – erkänt av de flesta hyrbåtsbolag',
        price: '4 000–7 500 kr',
        desc: 'Teoretisk genomgång av sjövägsregler, säkerhet och navigation plus praktik ombord. Med förarintyget kan du hyra de flesta motorbåtar och lättare segelbåtar.',
      },
      {
        name: 'Kustskepparintyget (KA)',
        length: '5–7 dagar (kurs + examen)',
        level: 'Medel – kräver viss segling',
        certificate: 'Kustskepparintyget – internationellt erkänt',
        price: '9 000–16 000 kr',
        desc: 'Det mest erkända segel-certifikatet i Sverige. Täcker navigation, meteorologi, ankring, kajhantering och offshore-segling. Slutar med teoriprov och praktisk examen.',
      },
      {
        name: 'Offshore-segling och bluewater',
        length: '7–14 dagar',
        level: 'Avancerad',
        certificate: 'Offshoresegel-certifikat (SSRS/RYA)',
        price: '15 000–30 000 kr',
        desc: 'Seglar från Stockholm mot Gotland, Åland eller utomlands. Dygns-navigering, vakt-system och bluewater-teknik. Kräver KA eller likvärdig erfarenhet.',
      },
    ],
    faqs: [
      {
        q: 'Kan man lära sig segla utan förkunskaper i Stockholms skärgård?',
        a: 'Ja, absolut. Stockholms innerskärgård med sina skyddade sund är perfekta för nybörjare. Introduktionskurser och helgkurser finns hos många segelsällskap och segelskolor. Du lär dig grunderna på en dag.',
      },
      {
        q: 'Hur lång tid tar det att ta kustskepparintyget (KA) i Stockholm?',
        a: 'KA-kursen tar normalt 5–7 dagar intensivt, eller 2–4 helger uppdelade. Räkna sedan med självstudier inför teoriprovet. Totalt 3–6 månader från nybörjare till godkänd KA.',
      },
      {
        q: 'Var hittar man bra segelkurser i Stockholm?',
        a: 'Svenska Seglarförbundets hemsida listar certifierade segelsällskap med kursverksamhet. KSSS (Kungliga Svenska Segelsällskapet) i Djurgården och Stockholms Segelsällskap (SSS) är bland de mest aktiva kursarrangörerna i Stockholmsregionen.',
      },
      {
        q: 'Vad kostar en segelkurs i Stockholm?',
        a: 'Introduktionskurs: 800–1 500 kr. Förarintyg: 4 000–7 500 kr. Kustskepparintyget: 9 000–16 000 kr. Offshore-kurser: 15 000–30 000 kr. Mat och boende ombord ingår ofta i längre kurser.',
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
        price: '1 000–2 000 kr',
        desc: 'Grundkurs i segling på Göteborgs skogsrika och klipprikt hav. Mindre grupper, erfarna instruktörer. Sätter fokus på manövrar i Västerhavet.',
      },
      {
        name: 'Kustskepparintyget Bohuslän',
        length: '5–7 dagar',
        level: 'Medel',
        certificate: 'Kustskepparintyget (KA)',
        price: '9 000–15 000 kr',
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
        price: '500–1 200 kr',
        desc: 'Du sitter med på en segelbåt med instruktör och en liten grupp. Ingen teori, ingen press – du provar rodret och känner vinden. Perfekt för att avgöra om segling är rätt för dig.',
      },
      {
        name: 'Grön-kurs / Nybörjarkurs',
        length: '2–3 dagar eller 1 helg',
        level: 'Nybörjare',
        certificate: 'Grön flagg / Seglarbok',
        price: '2 000–4 000 kr',
        desc: 'Systematisk genomgång av segling från grunden. Teori och praktik varvas. Du lär dig terminologi, manövrar, sjövägsregler och hur du tar dig in och ut ur hamn.',
      },
      {
        name: 'Förarintyget (SBF/SSRS)',
        length: '2–3 helger',
        level: 'Nybörjare till medel',
        certificate: 'Förarintyget',
        price: '4 000–7 500 kr',
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
        price: '1 500–3 500 kr/vecka',
        desc: 'Barnet lär sig segla ensam i Optimistbåten under instruktörer i medseglingsbåt. Säker, pedagogisk och väldigt rolig. Normalt 6–10 barn per grupp.',
      },
      {
        name: 'Juniortävling och Zoom8 (11–15 år)',
        length: 'Veckolång kurs eller säsongsprogram',
        level: 'Medel – viss segling',
        certificate: 'Gul flagg / Seniorflagg',
        price: '2 000–4 500 kr',
        desc: 'Barn som kan grunderna avancerar till tävlingsklasser som Zoom8 och 29er. Fokus på kappsegling, taktik och träning i grupp. Inträdesbiljett till ungdomssegling på riksnivå.',
      },
      {
        name: 'Kustseglarkurs för ungdomar (15–18 år)',
        length: '5–7 dagar ombord',
        level: 'Medel till avancerad',
        certificate: 'Kustseglarcertifikat',
        price: '4 000–8 000 kr',
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
        a: '1 500–3 500 kr per vecka för de flesta seglarskolor. Lunch ingår ibland. Utrustning (flytväst, våtdräkt) lånas ofta av sällskapet. Fråga om familjerabatt om flera barn går kursen.',
      },
    ],
  },
]

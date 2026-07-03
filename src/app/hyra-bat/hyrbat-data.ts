export type HyrBatFAQ = { q: string; a: string }

export type HyrBatSub = {
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
  priceTable: { type: string; price: string; note: string }[]
  tips: { icon: string; heading: string; text: string }[]
  faqs: HyrBatFAQ[]
}

export const HYRBAT_SUBS: HyrBatSub[] = [
  {
    slug: 'stockholms-skargard',
    title: 'Hyra båt i Stockholms skärgård 2026 – priser och guide',
    h1: 'Hyra båt i Stockholms skärgård',
    metaDescription: 'Hyra motorbåt eller segelbåt i Stockholms skärgård. Licenskrav, priser, de bästa hyrbåtsbolagen nära Stockholm och vad du bör fråga innan du bokar.',
    excerpt: 'Stockholms skärgård är ett av världens mest tillgängliga vatten för båtuthyrning. Hyr vid hamnen och var bland öarna på 30 minuter.',
    location: 'Stockholm',
    emoji: '⛵',
    readTime: '8 min',
    tags: ['Motorbåt & segelbåt', 'Inget körkort krävs', 'Dagshyra', 'Övernattning ombord'],
    intro: [
      'Stockholms skärgård med sina 30 000 öar är ett av världens bästa och mest tillgängliga vatten för båtuthyrning. Du hyr en motorbåt i Djurgårdsbrunnsviken, Nacka eller Vaxholm – och om 30 minuter är du ute bland öarna. De flesta hyrbåtsbolag kräver inget båtkörkort, bara att du tar en kort introduktion om hur den specifika båten fungerar.',
      'Skärgårdens geografi är perfekt för nybörjare. Innerskärgårdens smala sund och välkartlagda farleder gör att du navigerar säkert med en vanlig sjökort-app. Välj ö efter intresse: Sandhamn för seglarstämning, Grinda för familjedag, Utö för vildmarkskänsla.',
      'Räkna alltid med bränsle utöver hyran – de flesta bolag hyr ut tomma tankar och du betalar för det du förbrukar. Boka tidigt: juli är fullbokat hos de flesta aktörer redan i april.',
    ],
    priceTable: [
      { type: 'Liten motorbåt (4–5 m)', price: '900–1 500 kr/dag', note: 'Passar 2–4 personer. Ingen erfarenhet krävs.' },
      { type: 'Mellanbåt (6–7 m, 10–20 hk)', price: '1 200–2 200 kr/dag', note: 'Bekvämt för 4–6 pers, bra fart.' },
      { type: 'Stor motorbåt (7–9 m)', price: '2 000–4 000 kr/dag', note: 'Kajut och sovplatser.' },
      { type: 'Segelbåt (28–35 fot)', price: '3 500–7 000 kr/dag', note: 'Kräver segling i bakgrunden.' },
      { type: 'Husbåt / övernattningsbåt', price: '3 000–5 500 kr/dag', note: 'Komfort på vattnet utan seglingskunskaper.' },
    ],
    tips: [
      { icon: '📋', heading: 'Kolla licenskrav i förväg', text: 'Fråga bolaget exakt vad de kräver. Vissa nöjer sig med en 30-min introduktion; andra vill se förarintyg för kraftigare båtar.' },
      { icon: '⛽', heading: 'Bränsle är separat', text: 'Tankas upp vid start och återlämnas med samma mängd. Räkna med 50–150 kr/timme för en normal motorbåt.' },
      { icon: '📱', heading: 'Ladda ned sjökortsapp', text: 'Navionics och C-MAP är de vanligaste apparna. Farleder och grund syns tydligt – nödvändigt för att navigera säkert i skärgården.' },
      { icon: '🌤', heading: 'Kolla vädret på S YR', text: 'yr.no ger tillförlitliga marinaspecifika prognoser. Undvik dagar med vind över 8–10 m/s om du är ovan.' },
    ],
    faqs: [
      {
        q: 'Behöver man båtkörkort för att hyra båt i Stockholms skärgård?',
        a: 'Det finns inget lagkrav på båtkörkort i Sverige. De flesta hyrbåtsbolag nöjer sig med en introduktionskörning (30–60 min) ombord. Förarintyget (SBF/SSRS) eller liknande ökar möjligheterna att hyra större och kraftigare båtar, men är inte alltid ett krav.',
      },
      {
        q: 'Hur tidigt bör man boka hyrbåt i Stockholm?',
        a: 'Boka 2–3 månader i förväg för högsäsongen (juni–aug). Juli är fullbokat hos de flesta aktörer redan i april. Veckodagar och tidig morgon är lättare att boka med kortare framförhållning.',
      },
      {
        q: 'Vad ingår i hyrbåtspriset?',
        a: 'Flytvästar, sjökort och grundutrustning ingår. Bränsle är separat – du betalar för det du förbrukar. Fråga alltid om försäkringsvillkoren och självrisken. Tilläggstjänster som GPS-chartermaskiner kan tillkomma.',
      },
      {
        q: 'Var är bäst att hyra båt nära Stockholm?',
        a: 'Båtbörsen i Djurgårdsbrunnsviken och Sealifecenter i Nacka är centralt belägna. Vaxholm och Stavsnäs är bra startpunkter om du vill vara ute i skärgården direkt utan att navigera länge från stan.',
      },
      {
        q: 'Kan man hyra båt och övernatta ombord i Stockholms skärgård?',
        a: 'Ja. De flesta bolag erbjuder flerdagshyra. Kajutbåtar med 4–6 sovplatser är bekvämare för övernattning. Räkna med bryggavgifter i gästhamnar (ca 100–350 kr/natt beroende på ö och säsong). Ankring i naturhamnar är gratis via allemansrätten.',
      },
    ],
  },

  {
    slug: 'goteborg',
    title: 'Hyra båt i Göteborg och Bohuslän 2026 – guide och priser',
    h1: 'Hyra båt i Göteborg och Bohuslän',
    metaDescription: 'Hyra båt i Göteborg och Bohuslän. Klippmiljöer, Västerhavet och Nordens bästa skaldjur. Priser, licenskrav och de bästa hyrbåtsbolagen i Göteborg.',
    excerpt: 'Bohuslänska klippor och öppet hav ger en unik hyrbåts-upplevelse. Paddla bland kobbar, fiska räkor och ankra i fjälliga vikar längs Norges grannkust.',
    location: 'Göteborg',
    emoji: '🌊',
    readTime: '7 min',
    tags: ['Klippmiljö', 'Västerhavet', 'Fiske & skaldjur', 'Erfaren rekommenderas'],
    intro: [
      'Bohuslän är ett mer krävande men oförglömligt vatten att hyra båt i. Västerhavet ger riktiga dyningar och vindbyar som inte Stockholms innerskärgård matchar – vilket innebär att viss erfarenhet av öppet vatten rekommenderas, särskilt om du vill ut mot ytterskärgården.',
      'Belöningen är enorm: råa klipphällar, pittoreska fisklägen, Nordens bästa skaldjur direkt från båten och en natur som ser ut som den gjordes för att fotograferas. Smögen, Kungshamn och Lysekil nås enkelt med hyrbåt från Göteborg.',
      'Från Göteborg kan du välja söderskärgården (Styrsö, Vrångö) för lugnare vatten, eller köra norrut mot Marstrand och Bohuslänska klippmiljöer. Heldagstur norrut längs kusten är en av Sveriges vackraste upplevelser på vattnet.',
    ],
    priceTable: [
      { type: 'Liten motorbåt (4–5 m)', price: '800–1 400 kr/dag', note: 'Sydskärgård och skyddade sund.' },
      { type: 'Mellanbåt (6–7 m)', price: '1 200–2 000 kr/dag', note: 'Mellanklass, passar Bohuslänsk kust.' },
      { type: 'Stor motorbåt / kabinbåt', price: '2 000–4 500 kr/dag', note: 'För Västerhavet och öppet hav.' },
      { type: 'Segelbåt (28–38 fot)', price: '3 000–7 000 kr/dag', note: 'Optimalt för Bohuslän – vind och klippor.' },
    ],
    tips: [
      { icon: '🌊', heading: 'Respektera Västerhavet', text: 'Bohuslän är mer exponerat än Stockholms skärgård. Kolla vindprognoser noga. Välj innerskärgård-rutter om du är ovan vid Västerhavet.' },
      { icon: '🦐', heading: 'Fiska räkor', text: 'Räkor fiskas med Buren eller köps direkt av fiskebåtar längs kusten. Färska räkor direkt ombord är en Bohuslänsk klassiker du inte får missa.' },
      { icon: '⚓', heading: 'Planera naturhamnsstoppar', text: 'Bohuslän har hundratals naturhamnar. Sjökort och appen Naturkartan pekar ut de bästa. Strandskyddslagen är något striktare på Västkusten – följ skyltar.' },
    ],
    faqs: [
      {
        q: 'Behöver man mer erfarenhet för att hyra båt i Bohuslän jämfört med Stockholm?',
        a: 'Ja, generellt sett. Västerhavet är mer exponerat med kraftigare dyningar och mer vindvarierande väder. Innerskärgården vid Göteborg (sydskärgården) liknar mer Stockholms skärgård och är bra för nybörjare. Vill du ut mot Smögen och Kungshamn rekommenderas viss erfarenhet.',
      },
      {
        q: 'Vad kostar hyrbåt i Göteborg?',
        a: 'Liknande Stockholm: 800–4 500 kr per dag beroende på båtstorlek. Bränsle tillkommer. Säsongsvariation finns – juni och juli är 20–30% dyrare än maj och september.',
      },
      {
        q: 'Kan man fiska räkor med hyrbåt i Bohuslän?',
        a: 'Ja – sportfiske med bur är tillåtet och inga licenser krävs för vanligt fritidsfiske. Hummerpremiären (september) kräver att du följer säsongs- och burrregler. Lokala fiskare säljer också räkor direkt från sina båtar i hamnar som Smögen och Kungshamn.',
      },
    ],
  },

  {
    slug: 'gotland',
    title: 'Hyra båt på Gotland 2026 – runt ön med egna farkosten',
    h1: 'Hyra båt på Gotland',
    metaDescription: 'Hyra båt på Gotland och segla runt ön. Raukar, blå vikar och historiska fiskelägen. Priser, hyrbåtsbolag och bästa rutter runt Gotland.',
    excerpt: 'Gotland sett från havet är ett annat Gotland. Raukar på Fårös norra sida, klara blåa vikar och historiska fiskelägen som bara nås med båt.',
    location: 'Gotland',
    emoji: '🏝',
    readTime: '7 min',
    tags: ['Segelbåt', 'Raukar', 'Sommarklassiker', 'Kräver seglingserfarenhet'],
    intro: [
      'Gotland från havet är en helt annan upplevelse än Gotland via Visby. Med hyrbåt når du raukfälten på Fårö norra sida utan den turistkö som bildas på land, anlöper historiska fiskelägen och badar i karibiskt blå vikar som inte syns från strandvägen.',
      'Gotlands kust är 800 km lång med varierande karaktär: dramatisk klipphälla i norr, långa sandstränder i söder, och Fårö med sin speciella, avskalade skönhet. En komplett omsegling tar 7–10 dagar; en kortare tur från Visby täcker höjdpunkterna på 3–4 dagar.',
      'Segelbåt rekommenderas starkt för Gotland – motorns bränsleförbrukning gör långa etapper kostsamma. De flesta hyrbåtsbolag på Gotland erbjuder segelbåtar med 4–8 sovplatser perfekta för familj eller grupp.',
    ],
    priceTable: [
      { type: 'Segelbåt 28–32 fot', price: '3 000–5 000 kr/dag', note: '4–5 bäddar. Passar familj eller litet sällskap.' },
      { type: 'Segelbåt 33–38 fot', price: '4 500–7 500 kr/dag', note: '6–8 bäddar. Bekvämt för längre resor.' },
      { type: 'Motorbåt / kabinbåt', price: '2 500–4 500 kr/dag', note: 'Kortare turer, dyrare bränsle per sjömil.' },
    ],
    tips: [
      { icon: '🗺', heading: 'Planera rutten efter vinden', text: 'Gotland har pålitliga sommarvinder (mestadels SV). Planera att starta norr och runda Fårö med vinden i ryggen söder mot Visby.' },
      { icon: '🏖', heading: 'Ankra i södra Gotlands vikar', text: 'Holmhällar, Ljugarn och Sudersand är kristallklara – men grunda. Kolla djupkartan noga innan du ankrar.' },
      { icon: '📜', heading: 'Fårös häckningsreservat', text: 'Norddelen av Fårö är stängt för landstigning april–juni p.g.a. häckning. Raukfälten nås ändå bra från sjösidan.' },
    ],
    faqs: [
      {
        q: 'Måste man ha seglingserfarenhet för att hyra båt på Gotland?',
        a: 'Ja, det krävs i princip alltid. Gotlands hyrbåtsbolag kräver normalt förarintyg eller kustskepparintyg för att hyra en segelbåt. Gotland är exponerat och det är inte ett vatten för absoluta nybörjare. Har du 5–10 dagars segelerfarenhet räcker det för en kustrutt nära land.',
      },
      {
        q: 'Vilka hamnar och gästbryggor finns runt Gotland?',
        a: 'Visby är den naturliga basen. Runt Gotland finns gästhamnar i Klintehamn, Burgsvik, Ronehamn (öst), Slite och Kappelshamnhamn. Fårösund nås via kanal. Räkna med ca 150–350 kr/natt i bryggavgifter.',
      },
      {
        q: 'Hur lång tid tar det att segla runt Gotland?',
        a: 'En klassisk Gotlandsomsegling tar 7–10 dagar beroende på etapplängd (30–50 nm/dag) och hur länge du stannar i varje hamn. Miniversion: Visby → Fårö → Visby tar 3–4 dagar och täcker höjdpunkterna.',
      },
    ],
  },

  {
    slug: 'bohuslan',
    title: 'Hyra båt i Bohuslän 2026 – guide till klippkusten',
    h1: 'Hyra båt i Bohuslän',
    metaDescription: 'Hyra båt i Bohuslän och utforska klippmiljöerna längs Norges grannkust. Smögen, Kosteröarna och Fjällbacka. Priser och tips.',
    excerpt: 'Bohuslän från havet är Sverige på sitt spektakuläraste. Kobbar, skaldjur och klipphällar från Marstrand till Strömstad.',
    location: 'Bohuslän',
    emoji: '🪨',
    readTime: '6 min',
    tags: ['Klippmiljö', 'Skaldjur', 'Kosterfjorden', 'Erfarenhet rekommenderas'],
    intro: [
      'Bohuslän är Sveriges mest dramatiska kust sett från havet. Granitklippor polerade av isen, kobbar och skär som omringar pittoreska fiskelägen – och Nordens bästa skaldjur tillgängliga direkt längs leden. Med hyrbåt kan du utforska platser som Fjällbacka, Kungshamn och Kosteröarna i din egen takt.',
      'Kosterfjorden, Nordens djupaste fjord på den skandinaviska sidan, ger ett unikt upplevelsedyk om du är dykare. De bilfria Kosteröarna nås enbart med båt och är ett naturreservat i världsklass. Planerar du till norr om Strömstad är de ett absolut stopp.',
      'Bohuslän är ett vatten för mer erfarna båtförare. Täta sjötrafikkorridorer nära Göteborg, exponerade passager och plötsliga vindförändringar kräver god situationsmedvetenhet. Välj rutter i lä vid osäkert väder.',
    ],
    priceTable: [
      { type: 'Motorbåt / kabinbåt (6–8 m)', price: '1 500–3 500 kr/dag', note: 'Lämplig för kustnavigering.' },
      { type: 'Segelbåt (28–35 fot)', price: '3 000–6 500 kr/dag', note: 'Perfekt för längre Bohuslänsturer.' },
    ],
    tips: [
      { icon: '🦐', heading: 'Köp räkor direkt av fiskare', text: 'I Smögen, Kungshamn och Lysekil säljer fiskare räkor direkt från båten vid kajen. Billigast och färskast – en Bohuslänsk klassiker.' },
      { icon: '🌊', heading: 'Respektera Ytterhavet', text: 'Utanför skärgårdskorridoren möter du Nordsjön – respektera väderrapporten. Innanför leden är det skyddat och tryggt.' },
    ],
    faqs: [
      {
        q: 'Är Bohuslän svårare att navigera med hyrbåt än Stockholms skärgård?',
        a: 'Ja. Täfterna och kobbarnas läge kräver noggrann sjökortsläsning. Vädret är mer omväxlande. Men innanför skärgårdsleden är det lugnt och väl markerat. Håll dig innanför leden tills du känner terrängen.',
      },
      {
        q: 'Kan man se Kosteröarna med hyrbåt?',
        a: 'Ja, Kosteröarna nås enbart med båt och är ett perfekt mål för hyrbåt. Ta med sjödykutrustning – Kosterfjorden har Nordens rikaste marina liv. Ankra i skyddade lägen på öns östra sida.',
      },
    ],
  },

  {
    slug: 'hoga-kusten',
    title: 'Hyra båt vid Höga Kusten 2026 – fjärdar och klippor',
    h1: 'Hyra båt vid Höga Kusten',
    metaDescription: 'Hyra båt vid Höga Kusten i Ångermanland. UNESCO-världsarv, djupa fjärdar och klippor. Priser, upplägget och varför Höga Kusten är Sveriges vackraste vatten norröver.',
    excerpt: 'Höga Kustens djupa fjärdar och dramatiska klippor bildar ett av Norrlands mäktigaste vatten. Lugnt, avsides och fantastiskt.',
    location: 'Höga Kusten',
    emoji: '🏔',
    readTime: '6 min',
    tags: ['UNESCO-världsarv', 'Djupa fjärdar', 'Lugnt vatten', 'Skuleskogen'],
    intro: [
      'Höga Kusten kallas ofta "det okända paradiset". UNESCO-klassade för världens högsta landhöjningshastighet efter istiden – klipporna stiger upp till 286 meter rakt ur havet, och de djupa fjärdarna ger en majestätisk känsla som Stockholms skärgård inte kan matcha.',
      'Vattnet är lugnt och skyddat i fjärdarna, med minimalt med båttrafik jämfört med söder. Det gör Höga Kusten till ett utmärkt mål för nybörjare och familjer – lägre risk, stort utrymme, otrolig natur.',
      'Startpunkten är Härnösand, Kramfors eller Örnsköldsvik. Härifrån når du inom en dag Skuleskogen, naturbadplatserna i Skuleberget och de pittoreska fiskelägena i Bönhamn och Barsta.',
    ],
    priceTable: [
      { type: 'Motorbåt (4–6 m)', price: '700–1 400 kr/dag', note: 'Lugna fjärdar – perfekt för nybörjare.' },
      { type: 'Kabinbåt (7–9 m)', price: '1 500–3 000 kr/dag', note: 'Övernattning ombord, komfort.' },
    ],
    tips: [
      { icon: '🌲', heading: 'Kombinera med Skuleskogen', text: 'Ta upp till Skuleskogen-nationalparken och vandra. Det tar 2 h med bil från hamn. Kombinationen båt + vandring ger en unik Höga Kusten-upplevelse.' },
      { icon: '🦅', heading: 'Fågellivet', text: 'Havsörnen är vanlig längs Höga Kusten. Sommarsäsongen (juni–aug) ger bäst chans att se örnar längs klippbrädden.' },
    ],
    faqs: [
      {
        q: 'Är det lätt att hitta hyrbåt vid Höga Kusten?',
        a: 'Utbudet är mer begränsat än Stockholm och Göteborg. Boka i god tid och leta i orterna Härnösand, Kramfors och Örnsköldsvik. Lokala turistbyråer hjälper till att hänvisa till aktörer.',
      },
      {
        q: 'Vad gör Höga Kusten speciellt för båtturism?',
        a: 'De djupa, dramatiska fjärdarna ger en storslagna naturupplevelse som inte finns söderut. Mycket lite motorbuller och turisttrafik. Skuleskogen och klippkusten är UNESCO-skyddade och imponerande från vattnet.',
      },
    ],
  },
]

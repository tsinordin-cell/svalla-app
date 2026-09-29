/**
 * hantverkare-data.ts — hantverkare och sjötjänster per ö.
 *
 * REGELN: vi påstår aldrig mer än vi vet.
 *
 * Varje post bär en källa med nivå och läsdatum, och sidan visar den. Vi
 * garanterar inte att en uppgift är aktuell — vi garanterar att den stod där
 * vi säger att den stod, den dag vi läste den. Det är ett påstående vi alltid
 * kan stå för.
 *
 * KÄLLNIVÅER, starkast först:
 *   'egen-sajt'  Företagets egen webbplats. Uppdateras av den som berörs och
 *                går att kontrollera igen. Vi länkar dit.
 *   'forening'   Öns företagarförening eller öråd. Vet vem som är verksam på
 *                ön i år, men uppdateras oregelbundet.
 *   'register'   Kommunens näringslivsregister (UC Selekt) eller motsvarande.
 *                Vet vem som har firman skriven där, inte vem som jobbar där.
 *
 * VAD KONTROLLEN AV MÖJA VISADE (2026-09-22, 13 företag mot egna sajter):
 * sju fel som annars hade publicerats — fem företag placerade på fel ö, ett
 * med två olika telefonnummer på sin egen sida, en död länk och en webbplats
 * som inte uppdaterats sedan 2014. Dessutom ett byggföretag som registret
 * klassat som båtvarv för att firmanamnet innehåller "Marin".
 * Därav: ett register får aldrig publiceras oläst.
 *
 * `verifierad` betyder något annat och starkare: en människa har ringt. Det är
 * det enda som ger grön markering. Kontroll mot egen sajt är inte samma sak.
 *
 * ARBETSGÅNG
 *   1. Kandidater samlas i Google Drive: 01_Levande/Hantverkare/
 *   2. Kontrolleras mot företagets egen sajt där en sådan finns
 *   3. Flyttas hit med kalla-fältet ifyllt
 *   4. Ringer någon senare: lägg till verifierad: { av, datum }
 *
 * KÄLLKRAV: företagets egen webbplats, företagarförening, kommunalt register,
 * Bolagsverket. Aldrig Google Maps, Eniro eller hitta.se som enda belägg.
 */

export type Yrke =
  | 'snickare' | 'elektriker' | 'rormokare' | 'malare' | 'murare'
  | 'taklaggare' | 'markarbete' | 'betong' | 'totalentreprenad'
  | 'batmekaniker' | 'dykare' | 'sjotransport' | 'brunnsborrning' | 'sotare'

export const YRKE_ETIKETT: Record<Yrke, string> = {
  snickare: 'Snickare',
  elektriker: 'Elektriker',
  rormokare: 'Rörmokare',
  malare: 'Målare',
  murare: 'Murare',
  taklaggare: 'Takläggare',
  markarbete: 'Markarbete',
  betong: 'Betong',
  totalentreprenad: 'Totalentreprenad',
  batmekaniker: 'Båtmekaniker',
  dykare: 'Dykare',
  sjotransport: 'Sjötransport',
  brunnsborrning: 'Brunnsborrning',
  sotare: 'Sotare',
}

/**
 * Sätts av en människa efter kontakt. Ger grön markering på sidan.
 * False betyder bara "ingen har ringt än" — posten visas ändå, med sin källa.
 */
export type Verifiering = false | { av: string; datum: string }

/** Hur starkt belagd posten är. Visas alltid för besökaren. */
export type Kallniva = 'egen-sajt' | 'forening' | 'register'

export type Kalla = {
  niva: Kallniva
  /** Adressen vi läste. Visas som länk när nivån är 'egen-sajt'. */
  url: string
  /** ISO-datum då någon faktiskt läste sidan. */
  last: string
  /**
   * Fritext för när källan i sig är problematisk — till exempel att företagets
   * egen sida inte uppdaterats på flera år, eller att den anger två olika
   * telefonnummer. Visas för besökaren, inte bara för oss.
   */
  reservation?: string
}

/**
 * Yrken där LAGEN kräver registrering — inte branschen.
 *
 * Skillnaden är avgörande och var nära att bli fel här:
 *
 *   elektriker → Elsäkerhetsverket är en MYNDIGHET och registrering är ett
 *                LAGKRAV. Myndigheten skriver själv att ett oregistrerat
 *                företag arbetar olagligt. Kan vi inte belägga registreringen
 *                får vi inte kalla dem elektriker.
 *
 *   rormokare  → Säker Vatten är en IDEELL, MEDLEMSÄGD branschorganisation.
 *                Auktorisationen är frivillig, man ansöker och betalar avgift.
 *                En rörmokare utan Säker Vatten-auktorisation arbetar alltså
 *                fullt lagligt. Att dölja dem hade varit orättvist mot dem och
 *                sämre för besökaren. Auktorisationen är ett PLUS, inte en grind.
 *                (Se sakervatten.se/auktorisation/, läst 2026-09-22.)
 *
 * Därför står bara elektriker här. Rörmokare hanteras med fältet sakerVatten
 * längre ner, som en positiv markering.
 */
export const KRAVER_BEHORIGHET: Yrke[] = ['elektriker']

/**
 * Registrering hos Elsäkerhetsverket — lagkrav för elinstallationsarbete.
 * Söktjänst: elsakerhetsverket.se/kollaelforetaget
 *
 * 'bekraftad'      Någon har slagit upp företaget på ORGANISATIONSNUMMER och
 *                  sett att det står i registret för rätt typ av arbete.
 *                  En namnsökning räcker INTE — namn är inte unika. Mätningen
 *                  nedan gav fyra träffar på "Ljust El" och två på "Väddö
 *                  Elektriska".
 * 'ej-bekraftad'   Vi hittar dem inte, eller bara på namn och osäkert vilket
 *                  bolag det är. Betyder INTE att de gör något fel.
 * 'ej-relevant'    Yrket kräver ingen registrering (snickare, målare, mark).
 *
 * Mätning 2026-09-22: av 29 elföretag i insamlingsregistret hittades 22 under
 * sitt firmanamn hos Elsäkerhetsverket, 7 inte alls. Två av dem var Möjas
 * enda två el-poster. Se Drive: 01_Levande/Hantverkare/behorighet-el.md
 */
export type Behorighet = 'bekraftad' | 'ej-bekraftad' | 'ej-relevant'

export type Hantverkare = {
  slug: string
  /** Registrerat firmanamn, inte smeknamn. */
  namn: string
  ort: string
  yrken: Yrke[]
  /**
   * Utelämnas hellre än gissas. Saknas numret på företagets egen sida
   * ska fältet vara undefined — inte hämtat från en katalogsajt.
   */
  telefon?: string
  epost?: string
  webb?: string
  orgnr?: string
  /**
   * Var företaget faktiskt SITTER, enligt egen uppgift. Ö-slug eller ortsnamn.
   *
   * Skilj detta från `oar`. Kontrollen 2026-09-22 visade att fem av tretton
   * "Möja-företag" hade sin bas på grannöar — Möjaskärgårdens Företagarförening
   * täcker hela skärgården runt Möja, inte ön. Ett företag som kör hit med båt
   * är inte detsamma som ett som redan är på plats, och för en husägare med ett
   * läckande tak är det hela skillnaden.
   */
  bas?: string
  /** Ö-slugs de arbetar på. Företagets egen uppgift tills annat bekräftats. */
  oar: string[]
  /** Var uppgifterna kommer ifrån, hur starkt och när. Visas för besökaren. */
  kalla: Kalla
  verifierad: Verifiering
  /**
   * Utelämnas = behandlas som 'ej-bekraftad'. Det är med flit: glömmer någon
   * fältet blir följden att yrket döljs, inte att ett obelagt behörighetspåstående
   * publiceras. Spärren ska fela åt det säkra hållet.
   */
  behorighet?: Behorighet
  /** URL till behörighetsbeviset, t.ex. träffen i Kolla elföretaget. */
  behorighetKalla?: string
  /**
   * Frivillig branschauktorisation hos Säker Vatten. Sätts BARA när företaget
   * hittats med rätt namn och ort i sakervatten.se, och bara för kategorin
   * VVS-Företag — registret innehåller även konsultföretag som projekterar men
   * inte installerar.
   *
   * Utelämnat betyder "inte auktoriserat eller inte kontrollerat", och ska
   * aldrig visas som något negativt. Auktorisationen är sällsynt i skärgården:
   * 38 företag i hela Värmdö, 20 i Norrtälje, 1 på Orust (läst 2026-09-22).
   * Just därför är den värd att visa där den finns.
   */
  sakerVatten?: { last: string }
  noteringar?: string
}

export const HANTVERKARE: Hantverkare[] = [
  {
    slug: 'ljustero-snickarn',
    namn: "Ljusterö-Snickar'n Sören Larsson AB",
    ort: 'Ljusterö',
    yrken: ['snickare'],
    telefon: '070 747 23 80',
    epost: 'soren@ljusterosnickarn.se',
    webb: 'https://ljusterosnickarn.se',
    orgnr: '556971-5906',
    oar: ['ljustero'],
    bas: 'Ljusterö',
    kalla: { niva: 'egen-sajt', url: 'https://ljusterosnickarn.se', last: '2026-09-14' },
    verifierad: false,
    noteringar: 'Litet företag. Fråga om kapacitet innan vi listar dem som förstahandsval.',
  },
  {
    slug: 'oct-entreprenad',
    namn: 'OCT-Entreprenad Trä & Betong AB',
    ort: 'Värmdö',
    yrken: ['totalentreprenad', 'snickare', 'markarbete', 'betong', 'sjotransport'],
    // Inget telefonnummer angivet på företagets kontaktsida — fältet lämnas tomt.
    epost: 'info@oct-entreprenad.com',
    webb: 'https://oct-entreprenad.com',
    orgnr: '556955-5856',
    oar: [
      'blido', 'finnhamn', 'grinda', 'gallno', 'husaro', 'ingmarso',
      'ljustero', 'yxlan', 'angso',
    ],
    bas: 'Värmdö',
    kalla: { niva: 'egen-sajt', url: 'https://oct-entreprenad.com/kontakt/', last: '2026-09-14',
      reservation: 'Kontaktsidan visar info@ som text men länkarna pekar mot andra adresser.' },
    verifierad: false,
    noteringar:
      'Egna båtar och pråmar för material och personal — ovanligt, gör dem relevanta för yttre öar. ' +
      'Kontaktsidan visar info@ som text men länkarna pekar mot andra adresser; bekräfta vilken som gäller. ' +
      'Ölistan är företagets egen uppgift, inte verifierad av oss.',
  },

  // ─── MÖJASKÄRGÅRDEN ───────────────────────────────────────────────────────
  // Samtliga kontrollerade mot företagens egna webbplatser 2026-09-22.
  // Ingen av dem är uppringd — därför verifierad: false rakt igenom.
  // Fältet `bas` skiljer de som sitter på Möja från de som kör hit.

  {
    slug: 'wallner-marin',
    namn: 'Wallner Marin AB',
    ort: 'Södermöja',
    bas: 'Södermöja, Möja',
    yrken: ['totalentreprenad', 'snickare', 'sjotransport', 'dykare'],
    telefon: '0708-406 405',
    webb: 'http://www.wallnermarin.se',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'http://www.wallnermarin.se', last: '2026-09-22' },
    verifierad: false,
    noteringar:
      // KÄLLA: http://www.wallnermarin.se/priser/ — egen prissida (läst 2026-09-22)
      'Publicerar fullständig prislista på wallnermarin.se/priser: båttaxi 1 200 kr/h ex moms, ' +
      // KÄLLA: http://www.wallnermarin.se/priser/ (läst 2026-09-22)
      'väntetid och lastning 900 kr/h, svävare 2 250 kr/h, hantverk 850 kr/h ink moms, ' +
      // KÄLLA: http://www.wallnermarin.se/priser/ (läst 2026-09-22)
      'dykarbete 2 000 kr etablering inkl en timme och 1 000 kr/h därefter, bärgning 1 350 kr/h. ' +
      // KÄLLA: http://www.wallnermarin.se/priser/ (läst 2026-09-22) — företagets egna fasta priser
      'Fast pris Möja–Sollenkroka: 1 200 kr med båt, 2 000 kr med svävare, ink 6 % moms. ' +
      // KÄLLA: http://www.wallnermarin.se/priser/ (läst 2026-09-22) — egna villkor
      'Tiden räknas från att de lämnar hemmahamn tills de är hemma igen. 50 % påslag efter 22.00 ' +
      'eller före 05.00. Upphandlad leverantör av skolskjuts med båt och ISGÅENDE FARTYG åt ' +
      'Värmdö kommun, åttonde året. Först i Sverige med helt elektrisk taxibåt, Tant Grön. ' +
      'Arbetar även med strandskyddsfrågor. Magnus: 0708-88 33 58.',
  },
  {
    slug: 'bjurmans-lastmaskiner',
    namn: 'Bjurmans Lastmaskiner AB',
    ort: 'Ramsmora, Möja',
    bas: 'Ramsmora, Möja',
    yrken: ['markarbete', 'totalentreprenad'],
    epost: 'info@bjurmans.se',
    webb: 'https://www.bjurmans.se',
    orgnr: '556527-2704',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'https://www.bjurmans.se/kontakta-oss-3874611', last: '2026-09-22' },
    verifierad: false,
    noteringar:
      'Huvudkontor Ramsmora 830, 130 43 Möja. Lager i Huddinge. Familjeföretag grundat 1995. ' +
      'Entreprenad och maskinpark, jord- och grusprodukter i skärgården, infiltration och avlopp. ' +
      'Innehar F-skattebevis enligt egen sida. Fyra direktnummer anges på kontaktsidan.',
  },
  {
    slug: 'moja-snickarna',
    namn: 'Möja Snickarna AB',
    ort: 'Långviksnäs, Möja',
    bas: 'Långviksnäs, Möja',
    yrken: ['snickare', 'totalentreprenad'],
    telefon: '0735-30 25 35',
    epost: 'patrik@mojasnickarna.se',
    webb: 'https://mojasnickarna.se',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'https://mojasnickarna.se', last: '2026-09-22' },
    verifierad: false,
    noteringar:
      'Långviksnäs 208, 130 43 Möja. Anger själva att de är bofasta på Möja och jobbar året runt. ' +
      'Stugbygge, BRYGGOR och renoveringar — en av få på ön som uttryckligen anger bryggarbete.',
  },
  {
    slug: 'kyrkvikens-sjotransport',
    namn: 'Kyrkvikens Sjötransport',
    ort: 'Bergs by, Möja',
    bas: 'Bergs by, Möja',
    yrken: ['sjotransport'],
    telefon: '070-776 68 83',
    epost: 'curre@kvst.se',
    webb: 'https://kvst.se',
    oar: ['moja', 'sandhamn', 'runmaro', 'gallno', 'namdo', 'ljustero', 'uto', 'orno'],
    kalla: { niva: 'egen-sajt', url: 'https://kvst.se', last: '2026-09-22' },
    verifierad: false,
    noteringar:
      'Upp till 10 ton. Kranlossning 500 kg med 7 meters räckvidd. Taxibåt upp till 12 passagerare. ' +
      'Transport med fyrhjuling och vagn. Kör alla dagar, alla tider på dygnet. ' +
      'Anger själva ansvars- och transportförsäkring samt F-skattsedel. Inget pris publicerat.',
  },
  {
    slug: 'kjellgren-marin',
    namn: 'Kjellgren Marin AB',
    ort: 'Löka, Möja',
    bas: 'Löka, Möja',
    yrken: ['batmekaniker'],
    telefon: '08-571 641 68',
    webb: 'https://www.kjellgrenmarin.se',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'https://www.kjellgrenmarin.se', last: '2026-09-22',
      reservation: 'Sidan anger info@kjellgrenmarin.se som text men länken pekar på info@kjellgren.se. Mejladressen är därför utelämnad.' },
    verifierad: false,
    noteringar:
      'Möja Löka 505, 130 43 Möja. Auktoriserad service, förvaring och försäljning av Yamaha ' +
      'utombordare samt YFM fyrhjulingar med vagnar. MEDLEM I SWEBOAT. ' +
      'Öppet mån–fre 08.00–17.00, stängt helger. Fler nummer på sidan: 070-656 49 49, 070-256 41 68.',
  },
  {
    slug: 'vahine',
    namn: 'Vahine AB',
    ort: 'Ramsmora, Möja',
    bas: 'Ramsmora, Möja',
    yrken: ['sjotransport'],
    // Telefon UTELÄMNAD med flit: företagets egen sida anger två olika nummer.
    epost: 'sune@vahine.se',
    webb: 'https://www.vahine.se',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'https://www.vahine.se', last: '2026-09-22',
      reservation: 'Företagets egen sida anger två olika telefonnummer — 070 538 84 48 i brödtexten och 070 539 73 23 i sidfoten. Vi publicerar inget av dem förrän någon frågat.' },
    verifierad: false,
    noteringar: 'Ramsmora 818, 130 43 Möja. Båttaxi för upp till 7 personer, båten Lisa. Inget pris publicerat.',
  },
  /*
   * SeaCab Möja AB — BORTTAGEN 2026-09-23 (Max).
   *
   * Sjötransport, Bergs by på Möja, 0708-17 47 78, info@seacab.se,
   * seacab.se. Båt- och SVÄVARTAXI; svävare går på is och är ovanligt.
   *
   * Varför borta: webbplatsen har inte uppdaterats sedan 2016, och ett
   * inlägg från 2014 meddelar att de inte kör egna reguljära turer. Vi kunde
   * inte bekräfta att verksamheten är igång. Att lista ett företag som
   * kanske lagt ner är sämre än att lista ett för lite — den som ringer ett
   * dött nummer litar inte på nästa post heller.
   *
   * Uppgifterna ligger kvar här och inte i datat: ringer någon och får svar,
   * eller hör de av sig, är posten färdigskriven och kan läggas tillbaka med
   * verifierad: { av, datum }.
   */

  // ── Verksamma i Möjaskärgården men med bas på annan ö eller fastlandet ──

  {
    slug: 'hellstrom-marin',
    namn: 'Hellström Marin AB',
    ort: 'Norra Stavsudda',
    bas: 'Norra Stavsudda',
    yrken: ['totalentreprenad', 'snickare'],
    telefon: '070-422 47 63',
    epost: 'karl@hhmarin.se',
    webb: 'https://hhmarin.se',
    orgnr: '556711-6982',
    oar: ['moja', 'runmaro', 'sandhamn'],
    kalla: { niva: 'egen-sajt', url: 'https://hhmarin.se', last: '2026-09-22' },
    verifierad: false,
    noteringar:
      'OBS: kommunens register klassar dem som båtvarv på grund av firmanamnet "Marin". Det är fel — ' +
      'de är byggentreprenörer. Bygger hus i Stockholms skärgård sedan 2007, oftast totalentreprenad ' +
      'utifrån arkitektritningar. Referenser de själva anger: Tham & Videgård i Stavsnäs 2018–20 och ' +
      'på Krokholmen 2014–15, Rönneberga Konferens på Gistholmen med 21 stugor 2017–20. ' +
      'Publicerade i El Croquis och på omslaget till Arkitektur nr 4 2017. Gustav: 070-492 50 39.',
  },
  {
    slug: 'delsholmen-entreprenad',
    namn: 'Delsholmen Entreprenad AB',
    ort: 'Stavsudda',
    bas: 'Västra Delsholmen, Stavsudda-området',
    yrken: ['snickare', 'batmekaniker'],
    telefon: '073-999 09 74',
    epost: 'micke@delsholmen.se',
    webb: 'https://delsholmen.se',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'https://delsholmen.se', last: '2026-09-22' },
    verifierad: false,
    noteringar:
      'Snickeri, renovering av altan och kök, tillbyggnad, service och underhåll av båt, trädgård och tomt. ' +
      'Registret placerade dem på Möja — deras egen sida säger Stavsudda-området.',
  },
  {
    slug: 'rb-rorteknik',
    namn: 'RB Rörteknik AB',
    ort: 'Gustavsberg',
    bas: 'Gustavsberg, Värmdö',
    yrken: ['rormokare'],
    telefon: '070-352 52 02',
    webb: 'https://rbrorteknik.se',
    oar: ['moja', 'sandhamn', 'namdo', 'runmaro'],
    kalla: { niva: 'egen-sajt', url: 'https://rbrorteknik.se', last: '2026-09-22' },
    sakerVatten: { last: '2026-09-22' },
    verifierad: false,
    noteringar:
      'Kallar sig auktoriserat VVS-företag och visar Säker Vattens märke på egen sida — bekräftat mot ' +
      'Säker Vattens eget register som VVS-Företag i Gustavsberg. Två oberoende källor. ' +
      'Erbjuder uttryckligen båttransport för VVS-tjänster till öar. Kontor: 08-570 198 80.',
  },
  {
    slug: 'jowa-elektriska',
    namn: 'Jowa Elektriska AB',
    ort: 'Rosersberg',
    bas: 'Rosersberg, filial Herräng',
    yrken: ['elektriker'],
    telefon: '08-590 727 23',
    webb: 'https://www.jowael.se',
    orgnr: '556774-1250',
    oar: ['moja', 'vaxholm', 'blido', 'yxlan'],
    kalla: { niva: 'egen-sajt', url: 'https://www.jowael.se', last: '2026-09-22' },
    behorighet: 'bekraftad',
    behorighetKalla: 'https://www.elsakerhetsverket.se/kollaelforetaget/foretagsregister/?foretag=11039774&sok=1',
    verifierad: false,
    noteringar:
      'Registrerat elinstallationsföretag hos Elsäkerhetsverket — företaget länkar själva till sin post ' +
      'i registret, vilket gör behörigheten kontrollerbar för besökaren. Verksamma sedan 2003. ' +
      'F-skatt och fullförsäkrat enligt egen sida. Ny filial i Herräng sedan augusti 2025 (0175-105 75). ' +
      'Öppet mån–tors 06.45–16.00, fre 06.45–13.30.',
  },
  {
    slug: 'anderssons-batvarv',
    namn: 'Anderssons Båtvarv AB',
    ort: 'Norra Stavsudda',
    bas: 'Norra Stavsudda',
    yrken: ['batmekaniker'],
    telefon: '08-571 650 83',
    webb: 'http://anderssonsbatvarv.se',
    oar: ['moja'],
    kalla: { niva: 'egen-sajt', url: 'http://anderssonsbatvarv.se/Kontakt.htm', last: '2026-09-22',
      reservation: 'Webbplatsen bär kvar text om att hålla avstånd på grund av smittspridning, och verkar inte ha uppdaterats sedan 2020 eller 2021.' },
    verifierad: false,
    noteringar:
      'Norra Stavsudda, 130 42 Stavsudda. Motorer, service, fyrhjulingar, båtplats, begagnat. ' +
      'Mats Andersson 070-733 07 40, Ove Andersson 070-733 07 90.',
  },
]

/**
 * Yrken som faktiskt får visas för en post.
 *
 * Saknar posten bekräftad registrering hos Elsäkerhetsverket tas elektriker
 * bort ur listan — resten av yrkena står kvar. En byggfirma som också säger
 * sig göra elarbete visas alltså som byggfirma, inte som elektriker, tills
 * någon kontrollerat dem. Rörmokare berörs INTE: Säker Vatten är frivilligt
 * och en orörmokare utan auktorisation arbetar fullt lagligt.
 *
 * Blir listan tom betyder det att postens enda yrke var ett som kräver
 * behörighet vi inte kan belägga. Då ska posten inte visas alls.
 */
export function synligaYrken(h: Hantverkare): Yrke[] {
  if (h.behorighet === 'bekraftad') return h.yrken
  return h.yrken.filter(y => !KRAVER_BEHORIGHET.includes(y))
}

/**
 * Hantverkare att visa på en ösida.
 *
 * Spärren här är EN, och den ska inte "optimeras bort": poster vars enda yrke
 * är elektriker utan bekräftad registrering visas inte. Mätningen 2026-09-22
 * visade att 7 av 29 elföretag i insamlingsregistret inte gick att hitta hos
 * Elsäkerhetsverket, varav Möjas båda. Utan den spärren hade de hamnat på
 * ösidan som elektriker.
 *
 * `verifierad` filtrerar INTE. Det var så det var byggt först, och effekten
 * blev att sidan var tom på varenda ö: ingen post är uppringd, och vi kommer
 * aldrig hinna ringa alla. Modellen är i stället den som står i källrutan
 * överst på sidan — vi visar var uppgiften kommer ifrån och när vi läste den,
 * och säger rent ut att vi inte kan garantera att den är aktuell.
 * `verifierad` styr bara den gröna bocken på kortet.
 */
export function getHantverkareForIsland(slug: string): Hantverkare[] {
  return HANTVERKARE.filter(h =>
    h.oar.includes(slug) &&
    synligaYrken(h).length > 0
  )
}

/**
 * Poster som väntar på en behörighetskontroll mot Elsäkerhetsverket.
 * För internt bruk — arbetslistan för den som ska slå upp organisationsnummer.
 */
export function getUtanBehorighetskontroll(): Hantverkare[] {
  return HANTVERKARE.filter(h =>
    h.behorighet !== 'bekraftad' &&
    h.yrken.some(y => KRAVER_BEHORIGHET.includes(y))
  )
}

/** Alla poster som väntar på att någon ringer. För internt bruk. */
export function getObekraftade(): Hantverkare[] {
  return HANTVERKARE.filter(h => h.verifierad === false)
}

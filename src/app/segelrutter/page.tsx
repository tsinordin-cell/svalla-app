import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
 title: 'Segelrutter i Sverige — Östersjöleden, Gotland Runt, Bohuslän — Svalla',
 description: 'Kompletta segelrutter i Sverige: Östersjöleden (800 sjömil), Gotland Runt (klassiker 300 sjömil), Bohusleden, Mälaren och Stockholms skärgård. Nivåer 1–3, sjökort, vindanpassningar.',
 keywords: [
 'segelrutter sverige',
 'östersjöleden',
 'gotland runt',
 'bohusleden',
 'segelrutter stockholms skärgård',
 'mälaren segling',
 'svenska segelrutter',
 'segelrutter kust',
 'kappsegling sandhamn',
 'segelturer sverige',
 ],
 openGraph: {
 title: 'Segelrutter — Svalla',
 description: 'Kompletta segelrutter i Sverige: från Östersjöleden till Gotland Runt och Bohusleden.',
 url: 'https://svalla.se/segelrutter',
 },
 alternates: { canonical: 'https://svalla.se/segelrutter' },
}

const ITEMS: LandingItem[] = [
 {
 icon: 'sailboat',
 title: 'Nybörjarsegling: Saltsjön',
 description: 'Inga öppna hav, god vind och många naturhamnar — perfekt första-seglingen med familj eller segelskola.',
 href: '/segelrutter/saltsjon',
 meta: 'Nivå 1',
 },
 {
 icon: 'wind',
 title: 'Mellanskärgården (västanvind)',
 description: 'Grinda, Finnhamn, Möja — en vecka med oftast gynnsam vind. Klassisk svensk seglarsommar.',
 href: '/segelrutter/mellanskargarden',
 meta: 'Nivå 2',
 },
 {
 icon: 'ship',
 title: 'Ytterskärgården',
 description: 'Sandhamn, Huvudskär, Rödlöga — öppna vatten, tidvattenströmmar, stora upplevelser.',
 href: '/segelrutter/ytterskargarden',
 meta: 'Nivå 3',
 },
 {
 icon: 'map',
 title: 'Östersjöleden (Stockholm–Malmö)',
 description: 'Kustens stora segelrutt: 800 sjömil längs svenska östkusten med Blekinge och Gotland. Dagsetapper, historia och skyddade farleder.',
 href: '/segelrutter/osterjosleden',
 meta: 'Nivå 2–3',
 },
 {
 icon: 'building',
 title: 'Bohusleden & västkusten',
 description: 'Hummervatten, Marstrand, Smögen, Kosterfjorden. Västkustens vildaste seglingar med tidvatten och skjärgård.',
 href: '/segelrutter/bohusleden',
 meta: 'Nivå 2–3',
 },
 {
 icon: '🏁',
 title: 'Gotland Runt (klassikern)',
 description: 'Cirka 300 sjömil runt Gotland — kappseglingsklassiker som startar i Sandhamn. Ettdygn eller mer för den beredde.',
 href: '/segelrutter/gotland-runt',
 meta: 'Nivå 3',
 },
 {
 icon: 'building',
 title: 'Mälaren — insjösegling',
 description: 'Karl Johans sluss, historiska slott (Drottningholm, Birka), skyddade vatten. Perfekt för varmare dagar och familjer.',
 href: '/segelrutter/malaren',
 meta: 'Nivå 1–2',
 },
 {
 icon: '🏁',
 title: 'Regattor 2026',
 description: 'Gotland Runt, Midsommarseglingen, Sandhamn Race Week — kappseglingskalendern.',
 href: '/evenemang?kategori=regatta',
 },
 {
 icon: '📋',
 title: 'Segelkort',
 description: 'Rekommenderade sjökort (papper + plotter), aktuella farledsnoteringar och faror.',
 href: '/tips?kategori=segelkort',
 },
 {
 icon: 'compass',
 title: 'Vind & väder',
 description: 'Så läser du SMHI:s sjöprognos och när du ska vänta på en dags-avbrott.',
 href: '/tips?kategori=vader',
 },
]

export default function SegelrutterPage() {
 const faqJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'FAQPage',
 mainEntity: [
 {
 '@type': 'Question',
 name: 'Behöver man certifikat för att segla i Sverige?',
 acceptedAnswer: { '@type': 'Answer', text: 'Nej, det finns ingen laglig seglarcertifikatskrävning för privat segling i Sverige. Många seglare tar dock en segelkurs för säkerhet och kunskapers skull. För kommersiell segling eller andras båtar måste det finnas en ansvarig person med relevant utbildning ombord.' },
 },
 {
 '@type': 'Question',
 name: 'Hur lång tid tar Östersjöleden?',
 acceptedAnswer: { '@type': 'Answer', text: 'Östersjöleden är cirka 800 sjömil. Realistisk tid är 10–15 dagar för 300–400 sjömil (exempelvis Stockholm till Visby). Många seglare gör detta som ett 2-veckors sommaräventyr eller sprider det över flera sommrar.' },
 },
 {
 '@type': 'Question',
 name: 'Vad är bästa månaden att segla i Sverige?',
 acceptedAnswer: { '@type': 'Answer', text: 'Juli och augusti är de varmaste månaderna med mest förutsägbar vind och de flesta restauranger öppna. Maj är för många den perfekta månaden — mindre trängsel, ändå mildt väder och längre dagar. September kan ge vakra höstdagar men mer oförutsägbart väder.' },
 },
 {
 '@type': 'Question',
 name: 'Vilka sjökort behöver man för segling i Sverige?',
 acceptedAnswer: { '@type': 'Answer', text: 'För Stockholms skärgård: kort 6111, 6113. För Östersjöleden: 6103, 6104, 6105, 6112. För Bohuslän: 6058, 6059. Sjöfartsverkets officiella sjökort finns i papper- och digitalt format. Många använder tabletappar som Navily men papperskort rekommenderas alltid som backup.' },
 },
 ],
 }
 const breadcrumbJsonLd = {
 '@context': 'https://schema.org',
 '@type': 'BreadcrumbList',
 itemListElement: [
 { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
 { '@type': 'ListItem', position: 2, name: 'Segelrutter', item: 'https://svalla.se/segelrutter' },
 ],
 }
 return (
 <>
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
 <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
 <CategoryLanding
 heroGradient={['#1e5c82', '#2d7d8a']}
 eyebrow="Segelrutter"
 title="Segelrutter i Sverige"
 tagline="Från Stockholms skärgård till västkusten: kurerade rutter sorterade efter nivå, distans och säsong. Östersjöleden, Gotland Runt, Bohusleden och mer."
 heroIcon={
 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
 <path d="M2 20h20" />
 <path d="M12 2v18" />
 <path d="M12 2 3 18" />
 <path d="M12 6l7 12" />
 </svg>
 }
 intro={
 <>
 <p>
 Sverige är hemmet för några av världens bästa segelrevir. Med tre långa kuster — östkusten längs Östersjön, västkusten vid Bohuslän och skärgårdarna framför Stockholm — erbjuds seglare oändliga möjligheter för allt från helgseglingar till månadslånga äventyr. Varje region har sitt unika karaktär: stockade öar i Stockholms skärgård, granitklipper på västkusten, och öppna vatten längs Gotlands österut.
 </p>
 <p>
 Vad är en segelrutt? Det är en planerad väg mellan två eller flera hamnar eller ankringsplatser, ofta med utgångspunkt i en särskild vind, säsong eller svårighetsnivå. Svenska rutterna bygger på århundraden av erfarenhet — från handelsmän som navigerade mellan Stockholm och Visby till moderna racingseglare som tävlar runt Gotland varje sommar.
 </p>
 <p>
 Sverige delas in i flera klassiska segelrevir. Stockholms skärgård domineras av tätare öar och skyddade vatten. Östersjöleden sträcker sig som en 800 sjömil lång väg från Stockholm till Malmö längs kusten. Bohusleden på västkusten möter Nordsjöns krafter och är känd för tidvatten, hummervatten och vild skönhet. Mälaren erbjuder lugna, historiska insjövatten med gamla slott och börande historia.
 </p>
 <p>
 Varje rutt i denna guide listar distans, uppskattad tid vid normal vind, rekommenderade naturhamnar, vindanpassningar och vilka sjökort du behöver. Vi sorterar efter svårighetsnivå (1–3) så du kan välja enligt din erfarenhet, båttyp och tid. Rutterna är testade av erfarna seglare och uppdateras löpande med säsongsnoteringar — farleder som är stängda, bryggor som försvunnit, nya ankringsplatser och säkerhetsfaktorer.
 </p>
 </>
 }
 itemsTitle="Alla svenska segelrutter"
 itemsDescription="Sortering efter region och svårighetsnivå (1–3). Se varje ruttsida för detaljerade förberedelseöversikter och sjökortrekommendationer."
 items={ITEMS}
 deeperContent={
 <>
 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
 Östersjöleden — kustens stora segelrutt
 </h2>
 <p>
 Östersjöleden är den klassiska vägen för den seglare som vill utforska Sveriges östra kust över långre tid. Rundan sträcker sig cirka 800 sjömil från Stockholm i norr till Malmö i söder, och kan seglas helårs med rätt förberedelser — sommaren är naturligtvis populärast för sin pålitliga vind och mildare väder.
 </p>
 <p>
 Rutten följer kustnära farleder genom arkipelager och mellan större hamnar: från Stockholm söder via Uppsala, Västerås och Väsby längs Mälaren innan man når Östersjön vid Söderhamn, sedan vidare söder genom Gävle, Sundsvall, Härnösand och Umeå längs Norrlands kust. Längre söder går du förbi Västra Götaland och ankommer så småningom vid Bornholm innan du når Blekinge-skärgården — där du möter Karlskrona och dess historiska örlogshamn — och slutligen fram till Malmö vid Öresund.
 </p>
 <p>
 Klassiska etapper på Östersjöleden är Stockholm–Sandhamn (50 sjömil, 1 dag), Sandhamn–Visby (120 sjömil, 2 dagar), Visby–Karlskrona (180 sjömil, 3 dagar), och Karlskrona–Malmö (150 sjömil, 2–3 dagar). Många seglare gör denna som två veckor långt sommaräventyr, annat ankommer längre upp norr om Stockholm för att segla bara delen från Sundsvall söder. De flesta seglare väljer juli–augusti för mest pålitlig väder och vind.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Blekinge och Gotland
 </h3>
 <p>
 Blekinge-skärgården är känd för sin granitkust, många små öar och ancienta befästningar. Gotland är världskänd bland seglare både för sin skönhet och för den årliga Gotland Runt-regattan. Området runt Visby är populärt för sin medeltidsbottenstad och många restauranger — en perfekt stopp mitt i en längre segling.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Bohusleden och västkusten
 </h2>
 <p>
 Bohusleden representerar västkustens hjärta — ett område som präglats av kraftig vind, dramatiska klippor och ett unikt ekosystem av skärgårdsöar och fiskesamhällen. Denna rutt går från Göteborgs område i söder upp mot norska gränsen, och är känd för sitt tidvatten (upp till 1,5 meter), många revraktiga grund och den speciella västkustsvällningen.
 </p>
 <p>
 Marstrand är en klassisk ankarhamn och kappseglingsplats med sin ikoniska fortet och flera restauranger. Smögen nära kusten är en charmig fiskerort som ofta besöks av seglare. Längre norrut ligger Kosterfjorden — Sveriges djupaste fjord med över 200 meters djup — där stora båtar kan ankra tryggt. Hela området är kännetecknad av höga västvindar, vilket gör detta revir populärt för seglare som söker utmaning och atmosfär.
 </p>
 <p>
 Väl värd att veta: tidvattnet på västkusten kan skapa kraftiga strömmar, särskilt nära Tjörn och Orust. Många lokalseglare använder tidvattnen strategiskt för att få ytterligare knop fart in eller ut från fjordarna. Sjökortet blir här extra viktig — varje grund och rev är noga karterat men lätt att missa i gräl.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Gotland Runt — klassikern
 </h2>
 <p>
 Gotland Runt är den mest berömda kappseglingsklassikern i Sverige — en rutt som varje allvarlig seglare drömmer om att färdas på något tillfälle. Rundan går cirka 300 sjömil runt hela Gotland och startar traditionellt från Sandhamn i Stockholms skärgård.
 </p>
 <p>
 Under den officiella Gotland Runt-regattan varje sommar deltar hundratals båtar av alla slag. Regattat är notoriskt för sitt impulsiva väder — ibland får du svag vind och behöver motorkraft, ibland möter du kraftiga östvindar som driver dig från vägen. En typisk segling tar mellan 30 timmar för snabba racingbåtar och 2–3 dygn för långsammare båtar. För privatseglare som inte tävlar rekommenderas ofta två etapper: Sandhamn–Visby (över Östersjön, cirka 120 sjömil) och sedan hela vägen runt Gotland (cirka 180 sjömil).
 </p>
 <p>
 Klassiska ankarplatser: Visby hamn (medeltidsstaden), Fårö norrut, Östergarn österut, Hallshuk södersyd och Hemse västerut innan du återvänder till Sandhamn. Denna tur kräver god navigation, läsning av väder och en erfaren besättning — den klassificeras som Nivå 3.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Mälaren — insjösegling med historia
 </h2>
 <p>
 Mälaren är Europas tredje största insjö och en favorit bland seglare som söker lugna, historiska vatten utan öppet havs utmaningar. Sjön är cirka 120 kilometer lång och 65 kilometer bred — stor nog för riktiga seglingar men skyddad från oceanens krafter.
 </p>
 <p>
 Klassisk segling på Mälaren startar vid Karl Johans sluss som förbinder Stockholm med sjön själv. Söder om slussen ligger Drottningholms slott — kungliga sommarboendet och en majestätisk syn under segling. Längre västerut nere vid Västerås finns många restauranger och hamnar. Birka — Vikingbyn och Unesco-världsarv — ligger på en ö i västra Mälaren och är ett populärt stopp för både historia och mat.
 </p>
 <p>
 Mälaren är perfekt för familjeseglingar, längre helger eller för nya seglare som vill bygga erfarenhet utan att möta öppet hav. Vinden är ofta mjuk och förutsägbar på grund av sjöns stora landmassa runt omkring. Många båtar ankrar på naturliga ankringsplatser längs vägen, och varje större stad erbjuder hamn och grundläggande faciliteter.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Välj rätt nivå för din erfarenhet
 </h2>
 <p>
 Vi kategoriserar alla rutter efter tre svårighetsnivåer. Dina val av båt, besättning och tid påverkar vilken nivå som passar dig.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Nivå 1: Nybörjare & familjer
 </h3>
 <p>
 Skyddade vatten, ofta inom ett par timmars segel från basen. Exempel: Saltsjön, inre skärgården, Mälaren. Dessa rutter passar för:
 </p>
 <ul style={{ margin: '8px 0 12px', paddingLeft: '20px' }}>
 <li>Första gången du seglar längre än en dag</li>
 <li>Familjer med barn</li>
 <li>Seglare som är nöjda med 4–8 knops vind</li>
 <li>Enkelbetjänade båtar utan komplexa manövrar</li>
 </ul>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Nivå 2: Medel & erfarna
 </h3>
 <p>
 Längre dagar, möjlig öppen vattensegling, behov av navigation och väderläsning. Exempel: Mellanskärgården, Östersjöleden norra delen, Mälaren längre sträckor. Dessa rutter passar för:
 </p>
 <ul style={{ margin: '8px 0 12px', paddingLeft: '20px' }}>
 <li>Du har flera seglingar under båtens kelar</li>
 <li>Du kan läsa ett sjökort och en väderprognos</li>
 <li>Din besättning kan hålla fokus under 8–12 timmar segling</li>
 <li>Du är bekväm med vind upp till 15–18 knop</li>
 </ul>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 Nivå 3: Erfarna & racingseglare
 </h3>
 <p>
 Långdistans, öppet hav, kräver mycket säkerhet och beslutsförmåga. Exempel: Ytterskärgården, Gotland Runt, Östersjöleden i sin helhet, Bohusleden. Dessa rutter passar för:
 </p>
 <ul style={{ margin: '8px 0 12px', paddingLeft: '20px' }}>
 <li>Du har flera längre seglingar (flera dagar) i ditt CV</li>
 <li>Din besättning är väl tränad och kan hänga med under trötta nätter</li>
 <li>Du kan hantera vind upp till 20+ knop och höga vågor</li>
 <li>Du har nödradio, livräddar och sjövärdighetskunskap</li>
 <li>Du kan ta självständiga navigationsbeslut utan GPS</li>
 </ul>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Förberedelser innan du ger dig iväg
 </h2>
 <p>
 En säker segling börjar långt innan du slår loss från bryggan. Kontrollera alltid SMHI:s sjöprognos (särskilt för längre rutter — vindshiftar kan ändra hela planeringen). Läs Sjöfartsverkets senaste farledsmeddelanden för att se om något är stängt eller förändrat. Se till att din båt har reservgas, en fungerade nödhandradio och både papperssjökort och digital navigation (sjökortsplotter eller tablet). Mobiltäckning är spöklikt i ytterskärgården — Svalla-appen har offline-kartvisning och GPS-logg så du kan navigera utan internet.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Säkerhet på sjön
 </h2>
 <p>
 Anmäl alltid din avreseplan till någon på land — med förväntad återkomst, position och annarluftä nummer. Flytväst på alla besättningsmedlemmar när ni är på däck. Håll mycket koll på trötthet — även erfarna seglare gör misstag efter 14 timmar utan sömn. Om något går fel, ring 112 och begär Sjöräddningen. De är ditt livsnät på öppet vatten och arbetar dygnet runt längs alla svenska kuster.
 </p>

 <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
 Vanliga frågor om segelrutter i Sverige
 </h2>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 <strong>Behöver man certifikat för att segla i Sverige?</strong>
 </h3>
 <p>
 Nej, det finns ingen laglig seglarcertifikatskrävning för privat segling i Sverige. Många seglare tar dock en segelkurs för säkerhet och kunskapers skull — bland annat ett DSV-certifikat eller motsvarande utbildning. För kommersiell segling eller andras båtar måste det finnas en ansvarig person med relevant utbildning ombord.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 <strong>Hur lång tid tar Östersjöleden?</strong>
 </h3>
 <p>
 Östersjöleden är cirka 800 sjömil. Vid en genomsnittshastighet på 6 knop (genomsnittlig kryss- och seglingshastighet för de flesta båtar) tar detta cirka 5–6 veckor om du seglar alla dagar utan stopp. Många seglare gör detta som ett två veckor långt sommaräventyr genom att fokusera på en del av rutten, eller de sprider det över flera sommrar. Realistisk tid är 10–15 dagar för 300–400 sjömil (exempelvis Stockholm till Visby).
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 <strong>Vad är bästa månaden att segla i Sverige?</strong>
 </h3>
 <p>
 Juli och augusti är de varmaste månaderna med mest förutsägbar vind (ofta väst) och de flesta bastupunkter/restauranger öppna. Juni kan vara underbar men kan också få nordliga kalla vindar. Maj är för många den perfekta månaden — mindre trängsel än sommaren, ändå mildt väder och längre dagar. September kan ge både vakra höstdagar och oväntade stormvindar — väder är mindre förutsägbart.
 </p>
 <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
 <strong>Vilka sjökort behöver man?</strong>
 </h3>
 <p>
 För kustsegling rekommenderas Sjöfartsverkets officiella sjökort — antingen i pappersformat (vilket är lagligen kravt för vissa kommersiella operationer) eller digitala sjökort via en plotter. För Stockholms skärgård: Kort 6111, 6113. För Östersjöleden: 6103, 6104, 6105 (norr), 6112 (Visby). För Bohuslän: 6058, 6059. Många använder tabletappar som Navily eller Naveo för praktisk planering, men papperskorten är ett måste som backup då elektroniken kan sluta fungera.
 </p>
 </>
 }
 related={[
 { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
 { label: 'Gotland', href: '/gotland' },
 { label: 'Bohuslän', href: '/bohuslan' },
 { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
 ]}
 />
 </>
 )
}

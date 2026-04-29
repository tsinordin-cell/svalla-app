import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Svenska gästhamnar och naturhamnar — Hamnar & bryggor — Svalla',
  description: 'Guide till svenska gästhamnar och naturhamnar. Från Stockholms skärgård till Bohuslän, Gotland, Blekinge och Östersjön. VHF-kommunikation, priser 2026, bokning och allemansrätt.',
  keywords: [
    'gästhamnar sverige',
    'naturhamnar sverige',
    'gästhamnar stockholms skärgård',
    'marstrand gästhamn',
    'visby hamn gotland',
    'karlskrona hamn',
    'smögen brygga bohuslän',
    'sandhamn stockholm',
    'vhf kanal 16',
    'båtförtöjning sverige',
    'besöksbryggor',
    'allemansrätt ankring',
  ],
  openGraph: {
    title: 'Svenska gästhamnar och naturhamnar — Svalla',
    description: 'Komplett guide till gästhamnar, naturhamnar och besöksbryggor i Sverige med VHF-tips, priser och bokning.',
    url: 'https://svalla.se/hamnar-och-bryggor',
  },
  alternates: { canonical: 'https://svalla.se/hamnar-och-bryggor' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⚓',
    title: 'Gästhamnar',
    description: 'Servicehamnar med el, vatten, dusch och toalett — från Stockholms skärgård till Visby, Marstrand och Karlskrona. Bokning oftast nödvändig i högsäsong.',
    href: '/platser?kategori=gasthamn',
  },
  {
    icon: '🌿',
    title: 'Naturhamnar',
    description: 'Skyddade vikar och ankringsplatser där du ankrar eller lägger tamp i berget — helt gratis och ofta helt själv enligt allemansrätten.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🛥️',
    title: 'Besöksbryggor',
    description: 'Snabba stopp utan övernattning — mat, shopping, växling på bryggor från Stockholms skärgård till Smögen och Visby.',
    href: '/platser?kategori=besoksbrygga',
  },
  {
    icon: '⛽',
    title: 'Bensinmackar (båt)',
    description: 'Sjöbensin, diesel och septiktömning på svenska hamnar — växlande öppettider mellan säsonger.',
    href: '/platser?kategori=bensin',
  },
  {
    icon: '🛠️',
    title: 'Service & varv',
    description: 'Båtslip, reparation och beställningstjänster — från Stockholm till Blekinge när något behöver fixas.',
    href: '/platser?kategori=varv',
  },
  {
    icon: '🚧',
    title: 'Naturreservat — restriktioner',
    description: 'Öar och vikar med landstigningsförbud under fågelskyddsperioden 1 april–15 juli i skärgårdarna.',
    href: '/vandring-och-natur',
  },
]

export default function HamnarOchBryggorPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Måste man boka gästhamn i förväg?',
        acceptedAnswer: { '@type': 'Answer', text: 'Nej, men det rekommenderas starkt under juli–augusti. Populära hamnar som Sandhamn kan vara fulla redan 15:00 samma dag. Boka via Skärgårdshamnar.se eller ring via VHF på förmiddagen för att säkra en plats.' },
      },
      {
        '@type': 'Question',
        name: 'Vad innebär VHF-kanal 16?',
        acceptedAnswer: { '@type': 'Answer', text: 'Kanal 16 är världens sjöradionödkanal. Alla båtar med VHF måste övervaka den. Den används för nödrop och för att etablera kontakt — aldrig för längre samtal. Så fort du har kontakt med en hamn skiftar du till arbetkanal (oftast 9–12).' },
      },
      {
        '@type': 'Question',
        name: 'Är naturhamnar alltid gratis?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja, enligt allemansrätten. Du får ankra i vilken vika som helst för kortare tid utan tillstånd. Men många naturhamnar ligger i fågelskyddsområden med landstigningsförbud 1 april–15 juli. Svalla visar dessa restriktioner på varje plats.' },
      },
      {
        '@type': 'Question',
        name: 'Vilka faciliteter finns vanligtvis i en gästhamn?',
        acceptedAnswer: { '@type': 'Answer', text: 'Standard: Vatten, el (230V), dusch, toalett. Vanligt: Tvättmaskin, septiktömning, bensinstation, krog eller café. Ibland: Proviantbutik, reparationsservice, båtslip. Läs beskrivningen för varje hamn på Svalla för att veta vad den erbjuder.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Hamnar & bryggor', item: 'https://svalla.se/hamnar-och-bryggor' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Hamnar & bryggor"
      title="Hitta rätt förtöjningsplats i Sverige"
      tagline="Gästhamnar, naturhamnar, besöksbryggor och bensinmackar — från Stockholms skärgård till Gotland, Bohuslän och Östersjön. Med VHF-tips, priser och bokning."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v13" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      }
      intro={
        <>
          <p>
            Att välja rätt hamn är halva resan. Storm från öst? Sök västligt läge. Fullt i Sandhamn? Det finns alltid en tom naturhamn inom 20 minuter. Svalla samlar alla seriösa förtöjningsalternativ i Sverige — från <strong>Stockholms skärgård</strong> till <strong>Visby, Marstrand, Karlskrona och Smögen</strong> — med <strong>djup, faciliteter, vindskyddsriktning och aktuella priser 2026</strong>.
          </p>
          <p>
            <strong>Gästhamnar</strong> erbjuder serviceplatser med el, vatten, dusch, toalett och ofta restaurang eller butik. <strong>Naturhamnar</strong> är fria ankringsplatser i skyddade vikar — gratis men utan faciliteter. Båda är viktiga delar av seglingen och motorbåtslivet, och båda finns karterade här.
          </p>
          <p>
            Data kommer från hamnoperatörer, Waxholmsbolagets depåkartor, Svenska Segelföreningens rutter, och framförallt från seglare och motorbåtsfolk som loggat sina egna turer i Svalla. Om du ser en hamn, brygga eller naturhamn som saknas, lägg till den. <strong>VHF-kanal 16</strong> är nödkanalen; använd <strong>kanal 9–12</strong> för att anropa en hamnradio innan du kommer in.
          </p>
          <p>
            Allemansrätten ger dig rätt att ankra utanför oinöjd mark för kortare tid. Observera dock lokala förbud — många vikar är <strong>fågelskyddsområden</strong> med landstigningsförbud 1 april–15 juli. Varje platssida visar aktuella restriktioner. Ankra alltid tryggt och respektera miljön.
          </p>
        </>
      }
      itemsTitle="Typ av förtöjningsplats"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Sveriges bästa gästhamnar
          </h2>
          <p>
            Här är fem klassiska gästhamnar från Sveriges bästa segelregioner — från Stockholms skärgård till Blekinge. Alla är välbesökta i högsäsong; boka i förväg juli–augusti.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Sandhamn, Stockholms skärgård
          </h3>
          <p>
            35 sjömil öst om Stockholm. <strong>Sandhamn Seglarhotell</strong> är Sveriges mest kända gästhamn — livlig sommarbefolkning, restaurang, butik, och en legend inom segling. Naturlig förstastation för många seglare från Stockholm. Bottendjup 3–4 m, boka via VHF kanal 9 eller hemsida. <strong>Sandön</strong> med Sandsborgs fästning ligger strax intill och är populär för enklare naturövernattning. Priser cirka 600 kr/natt i högsäsong.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Marstrand, Bohuslän
          </h3>
          <p>
            En helt bilfri ö vid Bohuslänkusten — ett unikum som gör Marstrand magisk. <strong>Carlstens fästning</strong> trohnar på öns högsta punkt och är en av Nordens största fästningar. Gästhamnarna är väl organiserade med modern service. Omkringliggande vikar erbjuder naturövernattning under samma vind. Marstrand är också kändis för <strong>Marstrand White Guide</strong> (segelkapp) och världsklass hummerfiske i augusti–september. Priser cirka 350–450 kr/natt.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Visby, Gotland
          </h3>
          <p>
            <strong>UNESCO-världsarv</strong> medeltida ringmur omger denna 1400-årigt gamla hansestad. Gästhamnen ligger direkt under ringmuren — en spektakulär ankomst från öppet hav. Visby är påväg för alla som seglat österut; många stannar flera dagar. Bokning är nästan obligatorisk juli–augusti (många båtar, begränsade platser). Hamnmästare talar svenska, engelska, tysk. Priser 400–600 kr/natt. Omgivande Gotland erbjuder dussintals naturhamnar — <strong>Tingstäde vik</strong>, <strong>Kyllaj</strong> och <strong>Gnisvärd</strong> är klassiker.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Karlskrona, Blekinge
          </h3>
          <p>
            <strong>Marinstad</strong> och Sveriges största örlogsmässan. Karlskrona ligger strategisk vid Östersjöns väg och är en av Europas bästa naturhamnsregioner. Ögruppen runt <strong>Stumholmen</strong> erbjuder både gästhamn (cirka 250–350 kr) och dussintals fria naturhamnar med utmärkt skydd. <strong>Östersjöns bästa gästhamn</strong> enligt många seglare. Här möter du båtar från Tyskland, Polen och Baltikum. Data från Karlskrona har ofta varit mest aktuell i Svalla.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Smögen, Bohuslän
          </h3>
          <p>
            <strong>Smögenbryggan</strong> är nästan 500 meter lång och kanske Sveriges livligaste brygga under högsäsongen. Här står fiskebåtar, segelyacht, och turister tätt i tätt. Populär för kort restaurangvisit. Gästhamnarnas fritidsövernattning är begränsad; många seglare ankrar i omgivande vikar istället. I juli–augusti kan Smögen vara fruktansvärt fullt — besök i juni eller september för lugnare dagar. Priser cirka 300–400 kr/natt för kortare stopp.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Naturhamnar — fri övernattning
          </h2>
          <p>
            Naturhamnar är ankringsplatser i skyddade vikar — många helt gratis enligt <strong>allemansrätten</strong>. En naturhamn är ofta bara ett namn på en vika där tusentals seglare över åren har lagt sig — ingen marin, ingen el, inget vatten, men ofta underbar ro.
          </p>
          <p>
            <strong>Sådan ankrar du tryggt:</strong> Välj botten av lerslick eller sand (inte sten — ankaret glider). Lägg ut dubbel ankarlina (älska din ankare — det är ofta det enda mellan dig och rev). Lämna minst 2–3 båtslängders avstånd till närmaste båt. Kontrollera ankringen var 10:e minut första timmen. Håll VHF-mottagare på (kanal 16) för nödsignaler. Respektera tysta timmar från 22–08.
          </p>
          <p>
            <strong>Vilket väder håller naturhamnen?</strong> Läs vind- och böljedata innan du ankrar. En nordvästlig vika skyddar mot östlig vind men inte västra. Många naturhamnar är bara säkra i svag vind (knop). Svalla markerar vind- och böljeriktningar på varje plats — läs dem noggrant.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            VHF och hamnkommunikation
          </h2>
          <p>
            <strong>VHF-radio är nästan obligatorisk</strong> när du ankrar eller går in i en hamnkanal. Många gästhamnar förväntar sig att du anropar per VHF innan du kommer in.
          </p>
          <p>
            <strong>Kanal 16</strong> är <strong>nödkanalen</strong> — används endast för nödrop och initial kontakt. När du har kontakt med någon, flyttar du omedelbar till en arbetkanal.
          </p>
          <p>
            <strong>Kanaler 9, 10, 11, 12</strong> är klassiska <strong>hamnradiokanaler</strong>. De flesta svenska gästhamnar övervakar en av dessa. Exempel: &quot;Sandhamn Gästhamn, detta är segelyacht Västra vinden på kanal 10, vi närmar oss från väster, kan du bekräfta?&quot; Hamnmästare svarar sedan med instruktioner — vilken kaj, vilket djup, samt priset.
          </p>
          <p>
            <strong>Hur anropar du på VHF?</strong> Säg namnet på hamnen två gånger, sedan ditt båtnamn två gånger, därefter din position eller riktning. Var tydlig och långsam. Många båtförarar är inte modersmålstalare — använd enkel svenska eller engelska. Exempel: &quot;Visby hamn, Visby hamn, detta är segelbåten Solglint, Solglint, vi är två sjömil väster om hamnen, kan du bekräfta mottagning?&quot;
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Priser och bokning 2026
          </h2>
          <p>
            <strong>Gästhamnar</strong> kostar typiskt <strong>250–700 kr/natt</strong> beroende på region, säsong och båtstorlek:
          </p>
          <ul style={{ marginLeft: '20px', lineHeight: '1.6' }}>
            <li><strong>Inlandet & små hamnar:</strong> 200–300 kr/natt</li>
            <li><strong>Stockholms skärgård, Bohuslän:</strong> 350–500 kr/natt</li>
            <li><strong>Populära hamnar (Sandhamn, Visby, Marstrand):</strong> 500–700 kr/natt i högsäsong</li>
            <li><strong>Naturhamnar:</strong> Alltid gratis</li>
          </ul>
          <p>
            <strong>Bokning:</strong> Använd <strong>Skärgårdshamnar.se</strong> för många svenska gästhamnar. Många större hamnar tillåter också VHF-bokning — anropa på lämplig kanal när du är på väg in. Rekommendation: Boka i förväg juli–augusti; juni och september är lugnare.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Vanliga frågor om gästhamnar och naturhamnar
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Måste man boka gästhamn i förväg?
          </h3>
          <p>
            <strong>Nej, men det rekommenderas starkt.</strong> Juni, september och början av oktober är ofta fina utan bokning. Juli–augusti är högsäsong; många populära hamnar är fullt redan 15:00 samma dag. Några hamnar (som Sandhamn) har så få platser att de nästan alltid är fulla från 14:00 framåt. Boka eller ring och bekräfta på förmiddagen.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vad innebär VHF-kanal 16?
          </h3>
          <p>
            <strong>Kanal 16 är världens sjöradionödkanal.</strong> Alla båtar med VHF måste övervaka den. Den används för nödrop och för att etablera kontakt — aldrig för längre samtal. Så fort du har kontakt med en hamn skiftar du till arbetkanal (oftast 9–12). Missbruk av kanal 16 kan resultera i böter.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Är naturhamnar alltid gratis?
          </h3>
          <p>
            <strong>Ja, enligt allemansrätten.</strong> Du får ankra i vilken vika som helst för kortare tid (upp till några dagar) utan tillstånd. Men många naturhamnar ligger i <strong>fågelskyddsområden</strong> eller andra naturreservat med restriktioner — landstigningsförbud under fågelskyddsperioden 1 april–15 juli. Du kan ofta ankra (ej stiga av båten), men vissa områden förbjuder även det. Svalla visar dessa restriktioner på varje plats.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vilka faciliteter finns vanligtvis i en gästhamn?
          </h3>
          <p>
            <strong>Standard:</strong> Vatten, el (230V, 16A eller 32A), dusch, toalett. <strong>Vanligt:</strong> Tvättmaskin, septiktömning, bensinstation, krog eller café. <strong>Ibland:</strong> Proviantbutik, reparationsservice, båtslip, internetåtkomst. Små hemåhamnar kan bara ha vatten och toalett. Läs beskrivningen för varje hamn på Svalla för att veta vad den erbjuder.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Allemansrätt och ankring
          </h2>
          <p>
            Allemansrätten tillåter ankring utanför tomt, utan störning och för kortare tid. Observera dock lokala förbud — många vikar i skärgårdarna är <strong>fågelskyddsområden</strong> med landstigningsförbud 1 april–15 juli. Varje platssida visar aktuella restriktioner. Ankra alltid tryggt: välj botten av lerslick eller sand, lägg dubbel ankarlina, lämna avstånd till grannar, och kontrollera ankringen regelbundet.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Seglingsregioner och populära rutter
          </h2>
          <p>
            <strong>Stockholms skärgård:</strong> Närmast för många, djupt inom många vikar, hundratals naturhamnar. Segling året runt. Huvudrutter: Stockholm — Dalarö — Sandhamn — Landsort.
          </p>
          <p>
            <strong>Bohuslän:</strong> Marstrand, Smögen, Koster — klassiska västkusteregioner med blandning av gästhamnar och naturhamnar. Kraftig väst- och sydvind. Huvudrutter: Göteborg — Marstrand — Koster — Strömstad.
          </p>
          <p>
            <strong>Gotland:</strong> Visby som nav — Östersjöns viktigaste segelstation. Omgiven av naturhamnar — Tingstäde, Kyllaj, Gnisvärd. Längre segling. Huvudrutter: Visby — Estland (Tallinn) eller Visby — Stockholm.
          </p>
          <p>
            <strong>Blekinge (Karlskrona):</strong> Örlogsmässan, Stumholmen, utmärkta naturhamnar. Väg in till Östersjön. Huvudrutter: Karlskrona — Bornholm (Danmark) eller Karlskrona — Greifswald (Tyskland).
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Säkerhet och väder
          </h2>
          <p>
            Ankra aldrig utan väderprognos. Svenska Meteorologiska och Hydrologiska Institutet (SMHI) ger uppdaterad väder- och vindinformation. Wind- och våghöjdkort är tillgängliga online och via VHF. Många gästhamnar hörs på SMHI väderradio på VHF mellan 00–23 varje tredje timme.
          </p>
          <p>
            En väl vald naturhamn med tryggt ankar är ofta säkrare än en full gästhamn där båtar ligger tätt. Läs vind- och böljeriktningar på Svalla före ankring.
          </p>
        </>
      }
      related={[
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Bohuslän', href: '/bohuslan' },
        { label: 'Gotland', href: '/gotland' },
        { label: 'Segelrutter', href: '/segelrutter' },
      ]}
    />
    </>
  )
}

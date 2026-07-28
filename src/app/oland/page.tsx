import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Öland — Solön vid Östersjön',
  description: 'Guide till Öland: Borgholm slottsruin, Alvaret, Trollskogen, Långe Jan och Ölandsbron. Utforska Solön med bil, cykel och kollektivt.',
  keywords: [
    'öland guide',
    'öland semester',
    'borgholm slott',
    'alvaret öland',
    'trollskogen öland',
    'långe jan',
    'ölandsbron',
    'öland cykel',
    'öland bil',
    'öland sommar',
    'kalmarsund',
    'öland naturreservat',
    'södra öland unesco',
    'öland sevärdheter',
    'öland äventyr',
  ],
  openGraph: {
    title: 'Öland — Solön vid Östersjön | Svalla',
    description: 'Utforska Ölands Alvaret, Borgholm, Trollskogen och Långe Jan med Svalla.',
    url: 'https://svalla.se/oland',
  },
  alternates: { canonical: 'https://svalla.se/oland' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏰',
    title: 'Borgholm — öns hjärta',
    description: 'Borgholms slottsruin dominerar stadens silhuett. Botaniska trädgården Solliden, marknaden och krogen — allt på ett ställe.',
    href: '/oland/aventyr',
    meta: 'Populärt',
  },
  {
    icon: '🌿',
    title: 'Alvaret — UNESCO-världsarv',
    description: 'Det stora alvaret är ett av Europas mest unika landskap. Kalkstenshed, ovanlig flora och ett stämningsfullt ljus som är svårt att beskriva.',
    href: '/oland/aventyr',
  },
  {
    icon: '🌲',
    title: 'Trollskogen',
    description: 'Nordölands urgamla naturreservat med knotiga tallar formade av vind och tid. En av Ölands mest fotograferade platser.',
    href: '/oland/aventyr',
  },
  {
    icon: '🔆',
    title: 'Långe Jan',
    description: 'Sveriges högsta fyr reser sig 42 meter vid öns sydspets. Klättra upp och få en panoramautsikt över Östersjön.',
    href: '/oland/aventyr',
  },
  {
    icon: '🚲',
    title: 'Cykla längs Öland',
    description: 'Öland är perfekt för cykling — platt landskap, cykelvägar längs hela ön och naturhamnar att rasta vid längs vägen.',
    href: '/oland/aventyr',
  },
  {
    icon: '📱',
    title: 'Utforska med Svalla',
    description: 'Hitta de bästa platserna, planera din rutt och logga dina utflykter på Öland med Svallas interaktiva karta.',
    href: '/logga-in',
  },
]

export default function OlandPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Hur tar man sig till Öland?',
        acceptedAnswer: { '@type': 'Answer', text: 'Öland nås enklast via Ölandsbron från Kalmar — en av Europas längsta broar på 6 km. Med bil från Stockholm tar det ca 4 timmar. Kalmar nås med tåg från Stockholm (ca 3,5 h), och därifrån går buss över bron till Borgholm och vidare söderut. Under sommaren trafikeras ön av fler lokalbussar.' },
      },
      {
        '@type': 'Question',
        name: 'Vad är Alvaret på Öland?',
        acceptedAnswer: { '@type': 'Answer', text: 'Alvaret är en av Europas största kalkstenshedar och ett UNESCO-världsarv sedan 2000. Det är ett öppet, vindpinat landskap med tunn jord direkt på kalkstensberget — ett unikt ekosystem med ovanliga växter och djur. Somliga jämför det med afrikansk savann. Bäst besökt på försommaren när blommorna slår ut.' },
      },
      {
        '@type': 'Question',
        name: 'När är bästa tid att besöka Öland?',
        acceptedAnswer: { '@type': 'Answer', text: 'Juni är Ölands bästa månad — Alvaret blommar, turisttrycket är ännu hanterbart och dagarna långa. Juli är högsäsong med sommarmarknad i Borgholm och fullt liv men också köer. Maj och september erbjuder ro, billigare priser och ett annat Öland — mer vindpinat och avsides. Undvik sista veckan i juli om du vill slippa trängsel.' },
      },
      {
        '@type': 'Question',
        name: 'Vad är Trollskogen på Öland?',
        acceptedAnswer: { '@type': 'Answer', text: 'Trollskogen är ett naturreservat i norra Öland med urgamla, knotiga tallar formade av havsvindar under hundratals år. Träden har en surrealistisk, sagolikt vriden form — därav namnet. Reservatet är också känt för sina strandängar och fågellivet. Ingång finns nära byn Byxelkrok.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Öland', item: 'https://svalla.se/oland' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
        heroGradient={['#6b3a1a', '#8b5524']}
        eyebrow="Öland"
        title="Solön vid Östersjön"
        tagline="Alvaret, Borgholms slottsruin, Trollskogen och Långe Jan — Öland är ett landskap till sig självt. Utforska ön med Svalla."
        heroIcon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        }
        intro={
          <>
            <p>
              Öland är annorlunda. <strong>En lång, smal ö</strong> vid Östersjökusten med ett landskap som ingenstans ser ut som i resten av Sverige — kalkstensheden Alvaret sträcker sig mil efter mil, Trollskogen kryper längs nordkusten och Borgholms slottsruin reser sig mot himlen som en vittring av ett mäktigt förflutet.
            </p>
            <p>
              Ölandsbron binder samman ön med fastlandet — 6 kilometer lång, en av Europas längsta. Men känslan av att vara på en ö finns kvar. Kalmarsund glittrar till väster, Östersjön öppnar sig i öster, och vinden blåser nästan alltid. Det är ett landskap som kräver tid — och belönar den som tar sig tid.
            </p>
            <p>
              Svalla hjälper dig hitta de bästa platserna på ön, planera dina utflykter och utforska Öland i din egen takt — om du reser med bil, cykel eller buss spelar ingen roll. Kartan visar vägen, och äventyren väntar.
            </p>
          </>
        }
        itemsTitle="Öland med Svalla"
        itemsDescription="Utforska Ölands bästa platser och äventyr."
        items={ITEMS}
        deeperContent={
          <>
            {/* Äventyrsbanner */}
            <a href="/oland/aventyr" style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
              <div style={{
                background: 'linear-gradient(135deg, #4a1e08 0%, #8b4513 100%)',
                borderRadius: 20,
                padding: '22px 24px',
                display: 'flex',
                alignItems: 'center',
                gap: 18,
                position: 'relative',
                overflow: 'hidden',
                boxShadow: '0 6px 28px rgba(139,69,19,0.30)',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, borderRadius: '50%', background: 'rgba(255,255,255,0.04)', pointerEvents: 'none' }} />
                <div style={{
                  width: 48, height: 48, flexShrink: 0, borderRadius: 14,
                  background: 'rgba(255,255,255,0.14)', border: '1px solid rgba(255,255,255,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" /><polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                  </svg>
                </div>
                <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>Utforska mer</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3, fontFamily: "'Playfair Display', Georgia, serif" }}>Äventyr på Öland</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.72)' }}>10 utvalda rundor – bil, cykel och kollektivt</div>
                </div>
                <div style={{ width: 34, height: 34, flexShrink: 0, borderRadius: 10, background: 'rgba(255,255,255,0.12)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width={15} height={15} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </div>
              </div>
            </a>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Ta dig till Öland
            </h2>
            <p>
              Öland nås enklast med bil via <strong>Ölandsbron</strong> från Kalmar — 6 kilometer lång, och en upplevelse i sig. Från Stockholm är det drygt 4 timmar söderut på E4:an och sedan vidare mot Kalmar. Med tåg tar det ungefär 3,5 timmar till Kalmar, och därifrån går buss över bron.
            </p>
            <p>
              Under sommarmånaderna trafikeras ön av fler lokalbussar, men Öland lämpar sig bäst för bilresande eller cykling. Ön är 137 kilometer lång och bara 16 kilometer som bredast — en perfekt cykelö om du har tid att ta det i lugn takt. Längs hela öns västra sida löper en cykelväg med utsikt över Kalmarsund.
            </p>
            <p>
              Busstrafiken på ön drivs av <strong>Kalmar Länstrafik (KLT)</strong> — linje 101 och 106 går över Ölandsbron från Kalmar till Borgholm. Sommartid körs även linjer söderut längs ön mot Mörbylånga och Ottenby (vid Långe Jan). Vill du slippa tågbyte kör <strong>Silverlinjen</strong> direktbussar Stockholm–Borgholm, restid ca 5 timmar, utan omstigning — boka på <a href="https://www.silverlinjen.se" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--teal, #1e5c82)' }}>silverlinjen.se</a>.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
              Borgholm — öns huvudort
            </h2>
            <p>
              Borgholm är Ölands centrum och sommarens hjärta. <strong>Borgholms slottsruin</strong> dominerar kullen ovanför staden — en av Sveriges mest imponerande ruiner, byggd på 1200-talet och förstörd i en brand 1806. I dag är ruinen öppen för besök och ger en fantastisk utsikt över Kalmarsund. I det intilliggande <strong>Solliden</strong> — kungafamiljens sommarresidens — finns en botanisk trädgård öppen för allmänheten under sommaren.
            </p>
            <p>
              Borgholms sommarmarknad i juli är en av Sveriges mest besökta — tiotusentals människor samlas för marknadsstånd, konserter och folkliv. Det är högsäsongens höjdpunkt, och om du vill undvika trängsel är det också en bra anledning att besöka i juni eller augusti i stället. Stadens hamn och strandpromenad erbjuder restauranger och caféer med utsikt.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
              Södra Öland — Alvaret och Långe Jan
            </h2>
            <p>
              Södra Öland och det stora Alvaret är UNESCO-världsarv sedan år 2000 — ett av Europas mest unika landskap. Kalkstensberget sticker upp i ytan, jorden är tunn och vindpinad, och en unik flora av orkidéer, backtimjan och sällsynta mossor klär marken. Det är svårt att beskriva Alvaret i ord — det måste upplevas. Ljuset är annorlunda här, himlen vidare.
            </p>
            <p>
              Vid öns sydspets reser sig <strong>Långe Jan</strong> — Sveriges högsta fyr på 42 meter. Fyren byggdes 1785 och är fortfarande aktiv. Du kan klättra upp och få en milsvid utsikt över Östersjön och Alvarets kustlinje. Området runt Långe Jan är ett naturreservat med rikt fågelliv — på höst- och vårflyttningen samlas tusentals fåglar längs kusten.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
              Norra Öland — Trollskogen och Byxelkrok
            </h2>
            <p>
              I norra Öland hittar du <strong>Trollskogen</strong>, ett naturreservat med urgamla tallar formade av havsvindar under sekler. Träden är knotiga, vridna och sagolika — det är lätt att förstå varifrån namnet kommer. Strandängarna och skogen skapar ett landskap som är fantastiskt att vandra i, och fågellivet är rikt. Reservatet nås från byn Byxelkrok vid nordspetsen.
            </p>
            <p>
              <strong>Byxelkrok</strong> är Ölands nordligaste samhälle, litet och avsides med en småbåtshamn och några restauranger. Härifrån kan du fortsätta ut till <strong>Neptuni åkrar</strong>, ett område med unika kalkstensformationer som skapades för tusentals år sedan av havet. Det är Öland vid sitt mest avsides — och sitt mest storslagna.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
              Vanliga frågor om Öland
            </h2>
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Hur tar man sig till Öland?
            </h3>
            <p>
              Öland nås enklast via Ölandsbron från Kalmar — en av Europas längsta broar på 6 km. Med bil från Stockholm tar det ca 4 timmar. Kalmar nås med tåg från Stockholm (ca 3,5 h), och därifrån går buss över bron till Borgholm och vidare söderut. Under sommaren trafikeras ön av fler lokalbussar.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är Alvaret på Öland?
            </h3>
            <p>
              Alvaret är en av Europas största kalkstenshedar och ett UNESCO-världsarv sedan 2000. Det är ett öppet, vindpinat landskap med tunn jord direkt på kalkstensberget — ett unikt ekosystem med ovanliga växter och djur. Somliga jämför det med afrikansk savann. Bäst besökt på försommaren när blommorna slår ut.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              När är bästa tid att besöka Öland?
            </h3>
            <p>
              Juni är Ölands bästa månad — Alvaret blommar, turisttrycket är ännu hanterbart och dagarna långa. Juli är högsäsong med sommarmarknad i Borgholm och fullt liv, men också köer. Maj och september erbjuder ro, billigare priser och ett annat Öland — mer vindpinat och avsides. Undvik sista veckan i juli om du vill slippa trängsel.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad är Trollskogen på Öland?
            </h3>
            <p>
              Trollskogen är ett naturreservat i norra Öland med urgamla, knotiga tallar formade av havsvindar under hundratals år. Träden har en surrealistisk, sagolikt vriden form — därav namnet. Reservatet är också känt för sina strandängar och fågellivet. Ingång finns nära byn Byxelkrok.
            </p>
          </>
        }
        cta={{ label: 'Utforska Ölands äventyr', href: '/oland/aventyr' }}
        related={[
          { label: 'Äventyr på Öland', href: '/oland/aventyr' },
          { label: 'Gotland', href: '/gotland' },
          { label: 'Åland', href: '/aland' },
          { label: 'Blekinges skärgård', href: '/blekinge-skargard' },
        ]}
      />
    </>
  )
}

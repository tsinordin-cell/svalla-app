import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Barnvänliga öar i Stockholms skärgård — Guide för familjer | Svalla',
  description: 'De bästa barnvänliga öarna i Stockholms skärgård. Sandstränder, lugnt vatten, restauranger för familjer och enkla färjeförbindelser. Grinda, Finnhamn, Möja och fler.',
  keywords: [
    'barnvänliga öar',
    'barnvänlig skärgård',
    'familjer skärgård',
    'barn stockholms skärgård',
    'sandstrand skärgård',
    'öar barn stockholm',
    'familjeresa skärgården',
    'barnfamilj stockholms skärgård',
    'enkla öar familjer',
    'grunt vatten öar',
  ],
  openGraph: {
    title: 'Barnvänliga öar i Stockholms skärgård — Guide för familjer | Svalla',
    description: 'De bästa barnvänliga öarna i Stockholms skärgård. Sandstränder, lugnt vatten, restauranger för familjer och enkla färjeförbindelser.',
    url: 'https://svalla.se/barnvanliga-oar',
  },
  alternates: { canonical: 'https://svalla.se/barnvanliga-oar' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏖️',
    title: 'Grinda',
    description: 'Populär ö med trevlig sandstrand, grunt vatten perfekt för barn och ett välskött naturhamnsbad. Restaurang och enkla färjeförbindelser.',
    href: '/o/grinda',
    meta: '30 min från Stockholm',
  },
  {
    icon: '⛵',
    title: 'Finnhamn',
    description: 'Lugn och vacker ö med naturvänlig miljö. Bra för familjer som vill kombinera vandring med bad. Mindre trångt än Grinda.',
    href: '/o/finnhamn',
    meta: 'Lugnt vatten',
  },
  {
    icon: '🚲',
    title: 'Möja',
    description: 'Bilfri ö perfekt för familjäventyr. Cykling, vandring och pittoreska fiskebyar. Något rustikare men väldigt barnvänligt.',
    href: '/o/moja',
    meta: 'Utforska cykla',
  },
  {
    icon: '🎪',
    title: 'Fjäderholmarna',
    description: 'Närmast Stockholm (15 min) och enklaste utgångspunkten för familjer. Flera restauranger, små barn välkomna.',
    href: '/o/fjaderholmarna',
    meta: 'Närmast Stockholm',
  },
  {
    icon: '🗺️',
    title: 'Utö',
    description: 'En större ö med varierad miljö — restaurang, trevliga promenader och fin strand. Längre resa men väldigt värd det.',
    href: '/o/uto',
    meta: 'Större utbud',
  },
  {
    icon: '🍽️',
    title: 'Sandhamn',
    description: 'Legendär destination med flera restauranger och blomstrande sommarliv. För äldre barn och familjäventyrare.',
    href: '/o/sandhamn',
    meta: 'Klassisk destination',
  },
]

export default function BarnvanligaOarPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Vilka öar i Stockholms skärgård har sandstrand?',
        acceptedAnswer: { '@type': 'Answer', text: 'Grinda har en av skärgårdens finaste sandstränder — perfekt för barn. Fjäderholmarna erbjuder ett naturbad med sandy bottom. Möja har flera småstränder längs kusten, och Utö erbjuder en vacker strand på södersidan.' },
      },
      {
        '@type': 'Question',
        name: 'Vilken ö passar yngre barn (1–5 år) i skärgården?',
        acceptedAnswer: { '@type': 'Answer', text: 'Fjäderholmarna är utgångspunkten för små barn — bara 15 minuter från Slussen, lugnt vatten och fin sandstrand. Om du vill något längre bort är Grinda utmärkt: 30 minuter från Stockholm, lugnt vatten och barnvänlig restaurang.' },
      },
      {
        '@type': 'Question',
        name: 'Hur reser man med barn till skärgården?',
        acceptedAnswer: { '@type': 'Answer', text: 'Från Stockholm går färjor från Strömkajen direkt till Grinda, Möja, Sandhamn och fler öar. Restider: 15 min till Fjäderholmarna, 75 min till Sandhamn. Åk när barnen är pigga — en tidig morgonfärja fungerar bättre än en sen förmiddagsfärja.' },
      },
      {
        '@type': 'Question',
        name: 'Vilka öar i skärgården har restauranger för barnfamiljer?',
        acceptedAnswer: { '@type': 'Answer', text: 'Grinda Wärdshus är legendariskt för familjer. Fjäderholmarna har flera restauranger med barnmeny. Sandhamns Värdshus är en klassiker för längre resor. Utö Värdshus erbjuder mysig middag med havet som bakgrund.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Barnvänliga öar', item: 'https://svalla.se/barnvanliga-oar' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
      heroGradient={['#1a5c3a', '#2d7d5a']}
      eyebrow="Barnvänliga öar"
      title="Skärgård för hela familjen"
      tagline="Öar med sandstränder, grunt vatten och enkla färjeförbindelser — perfekt med barn."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg>
      }
      intro={
        <>
          <p>
            Stockholms skärgård är ett drömäventyr för familjer med barn. Men vilka öar är egentligen bäst lämpade för mindre barn, och hur planerar man en familjeresa utan stress? I denna guide presenterar vi de <strong>mest barnvänliga öarna</strong> i Stockholms skärgård — ställen där grunt vatten, sandstränder och familjevänliga restauranger gör det enkelt att njuta tillsammans.
          </p>
          <p>
            Det viktigaste när man väljer ö för familjer är <strong>grunt vatten för baning</strong>, <strong>sandstränder för leksaker och lekar</strong>, och <strong>nära färjeförbindelser</strong> för att undvika långa båtturer med rastlösa barn. Många öar erbjuder också restauranger där barnmenyer finns — ett stort plus när energinivåerna börjar sjunka. Säsongen för familjäventyr löper från maj till september, med juli som högsäsong.
          </p>
          <p>
            Oavsett om ditt barn är två eller tolv år gammal, Stockholms skärgård erbjuder något speciellt för alla. Några öar passar för första gången på sjön — som Fjäderholmarna bara 15 minuter från Slussen. Andra, som Möja och Finnhamn, passar perfekt för äldre barn som vill kombinera utforskning med äventyr. Och öar som Grinda och Sandhamn är klassiker som hela familjen älskar.
          </p>
        </>
      }
      itemsTitle="De bästa barnvänliga öarna"
      itemsDescription="Testade destinationer där barn trivs och föräldrar kopplar av"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Vanliga frågor om barnfamiljer i skärgården
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vilka öar har sandstrand?
          </h3>
          <p>
            <strong>Grinda</strong> har en av skärgårdens finaste sandstränder — perfekt för barn att bygga slott och leka. <strong>Fjäderholmarna</strong> ligger närmare och erbjuder ett trevligt naturhamnsbad med sandy bottom. <strong>Möja</strong> har flera småstrander längs kusten, och <strong>Utö</strong> erbjuder en vacker strand på södersidan. För de klassiska destinationerna: <strong>Sandhamn</strong> har fina stränderna som är väl besökta men full av aktivitet.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vilken ö passar yngre barn (1–5 år)?
          </h3>
          <p>
            <strong>Fjäderholmarna</strong> är utgångspunkten för små barn — bara 15 minuter från Slussen, flera restauranger på ön, och bekvämt naturhamnsbad. Om du vill något längre bort är <strong>Grinda</strong> utmärkt: 30 minuter från Stockholm, lugnt vatten, fin strand och bra bemanning på restaurangen för små barn. <strong>Finnhamn</strong> är också mycket barnvänligt om familjen mår bra av båt — mer lugnt än Grinda med vacker natur.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Hur reser man med barn till skärgården?
          </h3>
          <p>
            Från Stockholm går färjor från Strömkajen (nära Slussen) direkt till Grinda, Möja, Sandhamn och flera andra öar. Färjeresor tar mellan 15 minuter (Fjäderholmarna) och 75 minuter (Sandhamn), beroende på destinationen. Många familjer chartrar även små båtar för flexibilitet. Det viktigaste: planera så att du åker när barnen är pigga — en tidig morgonfärja är ofta enklare än en sen förmiddagsfärja när frustration börjar byggas upp.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vilka öar har restauranger för barnfamiljer?
          </h3>
          <p>
            <strong>Grinda Wärdshus</strong> är legendariskt för familjer — barnen älskar miljön och menyn erbjuder klassiska familjerätter. <strong>Fjäderholmarna</strong> har flera restauranger alla med barnmeny. <strong>Sandhamns Värdshus</strong> är en klassiker om du orkar längre båttur. <strong>Utö Värdshus</strong> erbjuder mysig middag med en helt annan känsla än inre skärgården. De flesta större öar har någon form av kiosk eller enkel matservering under sommaren.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '28px 0 12px' }}>
            Tips för framgångsrik familjeresa i skärgården
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Packa smart
          </h3>
          <p>
            Solskydd, bad- och omklädningskläder, snacks och mycket vatten är essentiellt. Många föräldrar glömmer livsvästar för barn — dessa är ofta obligatoriska på båtar och alltid en god ide. Medbring ett par skor som tål vatten för att klättra på stenar.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Planera för vila
          </h3>
          <p>
            Små barn behöver vilotid. Många familjer tar en sen förmiddagsfärja, anländer, lunchar på restaurangen, vilar på eftermiddagen och tar hemfärjan på kvällen. Detta funkar mycket bättre än en hel dag av aktivitet utan vila.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Välj rätt tid
          </h3>
          <p>
            Juni är ofta underbar för familjer — vattnet börjar värmas, men sommartouristerna är ännu inte här. Juli är högsäsong — vackert väder men trängre. Augusti är hemligt tips: vattnet är varmat, barnfamiljer har börjat åka in, och du kan ofta få ett lugn som finns bara då.
          </p>
        </>
      }
      cta={{ label: 'Utforska barnvänliga platser', href: '/platser' }}
      related={[
        { label: 'Grinda', href: '/o/grinda' },
        { label: 'Finnhamn', href: '/o/finnhamn' },
        { label: 'Sandhamn', href: '/o/sandhamn' },
        { label: 'Aktiviteter', href: '/aktiviteter' },
        { label: 'Färjor & färjeöverbryggningar', href: '/farjor' },
      ]}
    />
    </>
  )
}

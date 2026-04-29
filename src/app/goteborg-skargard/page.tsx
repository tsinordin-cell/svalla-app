import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Göteborgs skärgård — Segla södra Bohuslän | Svalla',
  description: 'Utforska Göteborgs skärgård med Svalla. Segla från Saltholmen till Styrsö, Vrångö och Brännö — logga dina turer i Hake fjord med karta, gästhamnar och krogar.',
  keywords: [
    'göteborgs skärgård',
    'segla göteborg',
    'styrsö',
    'vrångö',
    'brännö',
    'hake fjord',
    'saltholmen',
    'göteborgs södra skärgård',
    'norra bohuslän',
    'göteborgs havsband',
    'södra bohuslän segla',
    'gbg skärgård',
    'bat göteborg',
    'göteborgsarkipelag',
    'göteborgs öar',
    'styrsö guide',
    'brännö midsommar',
    'saltholmen segling',
    'göteborgs skärgård guide',
    'hake fjord segling',
  ],
  openGraph: {
    title: 'Göteborgs skärgård — Segla södra Bohuslän | Svalla',
    description: 'Logga dina båtturer i Göteborgs skärgård med Svalla — Styrsö, Vrångö och Brännö.',
    url: 'https://svalla.se/goteborg-skargard',
  },
  alternates: { canonical: 'https://svalla.se/goteborg-skargard' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Göteborgs skärgård',
    description: 'Alla gästhamnar, naturhamnar, restauranger och bryggor i Göteborgs södra skärgård — verifierade av lokala seglare.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '⛵',
    title: 'Rutter från Saltholmen',
    description: 'Klassiska leder ut i skärgården — Vrångö, Styrsö, Brännö och vidare norrut mot Marstrand och Smögen.',
    href: '/segelrutter',
  },
  {
    icon: '🍽️',
    title: 'Krogar & sjömat',
    description: 'Västkustens sjömat är oslagbar — hitta de bästa restaurangerna på Styrsö Skäret, Vrångö och längs kusten.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🏕️',
    title: 'Naturhamnar & ankring',
    description: 'Göteborgsarkipelagets öar erbjuder dolda vikar och skyddade naturhamnar — perfekt för övernattning.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🌊',
    title: 'Dagsturer från stan',
    description: 'Nå de yttre öarna på 30–60 minuter från Saltholmen. Svalla visar vägen och loggar din tur automatiskt.',
    href: '/logga-in',
  },
  {
    icon: '📍',
    title: 'Logga & dela',
    description: 'Dokumentera dina turer med GPS och bilder. Dela med Göteborgsseglarna i Svallas community.',
    href: '/logga-in',
  },
]

export default function GoteborgSkargardPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Kan man segla till Göteborgs skärgård utan egen båt?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja, helt enkelt. Du kan hyra båt genom flera klubbar och charter-företag i Göteborg. GKSS erbjuder gästmedlemskap och möjlighet till dagsbåtar, och flera privata charter-företag tillhandahåller allt från små gummibåtar till större segelfartyg.' },
      },
      {
        '@type': 'Question',
        name: 'Vilken ö i Göteborgs skärgård är bäst för barn?',
        acceptedAnswer: { '@type': 'Answer', text: 'Styrsö och Brännö med sin etablerade service, många bryggor för badning och lugna vikar passar barnfamiljer bäst. Restaurangerna på Styrsö Skäret är barnvänliga. Vrångö är lite mer avsides men erbjuder vackrare naturupplevelse för äldre barn.' },
      },
      {
        '@type': 'Question',
        name: 'Kan man segla hela dagen till Marstrand från Göteborg?',
        acceptedAnswer: { '@type': 'Answer', text: 'Ja, det är ungefär 20 sjömil norrut. Med bra segelväder och medvind är det en klassisk dagstur som tar 3–4 timmar. Du kan också spendera dagen på vägen och ankra på någon av öarna.' },
      },
      {
        '@type': 'Question',
        name: 'Vad är Hake fjord?',
        acceptedAnswer: { '@type': 'Answer', text: 'Hake fjord är namnet på vattnet söder och väster om Göteborg. Det omfattar Älvsborgsfjorden, kanalerna genom arkipelagen och det öppna vattnet mot de yttre öarna. Det är det centrala navet för all segling från Göteborg.' },
      },
    ],
  }
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Göteborgs skärgård', item: 'https://svalla.se/goteborg-skargard' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
      heroGradient={['#2e4057', '#3d6b8e']}
      eyebrow="Göteborgs skärgård"
      title="Skärgården utanför porten"
      tagline="Vrångö, Styrsö, Brännö — Göteborgs södra skärgård är en av Sveriges mest tillgängliga och varierade kustmiljöer. Svalla hjälper dig utforska varje ö."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      }
      intro={
        <>
          <p>
            Bara en halvtimme från centrala Göteborg öppnar sig en av Sveriges vackraste skärgårdar. <strong>Styrsö, Vrångö och Brännö</strong> är välkända, men skärgårdens yttersta skär och vikar är fortfarande halvt dolda. Med spårväg eller egen båt från Saltholmen eller Lilla Bommen når du klassiska segelrutter som varit favoriter i generationer.
          </p>
          <p>
            Göteborgs skärgård är känd för sin variation — från lugna ankringplatser bland vita båtar och bryggstopp med räkcocktail till exponerade klippbad och naturreservat. Midsommar på Brännö är en institution, Styrsö Skäret är ett klassiskt restaurangbesök, och Vrångö erbjuder naturens egen ro.
          </p>
          <p>
            Med Svalla loggar du dagsturer och längre äventyr, hittar de bästa krogarna och naturhamnarna på kartan, och kan följa andra Göteborgsseglarnas favoritplatser. Vår app är byggd för Göteborgs vatten — se djupkort, gästhamn och ankringplatser på en interaktiv karta.
          </p>
          <p>
            Säsongen löper maj till september, med högsäsong kring midsommar och juli. September är älskad av erfarna seglare — färre båtar, varmaste havet och den vackraste höstlljusen över skärgården.
          </p>
        </>
      }
      itemsTitle="Göteborgs skärgård med Svalla"
      itemsDescription="Från Saltholmen till havsbandet — allt du behöver."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Göteborgs skärgård — en guide
          </h2>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Hur man tar sig ut — från Saltholmen och Lilla Bommen
          </h3>
          <p>
            <strong>Saltholmen</strong> är skärgårdens främsta startpunkt. Ta spårväg 11 från centrala Göteborg — det tar ungefär 20 minuter. Här finns båtuthyrning, gästbryggor och det klassiska folklivet. För kajseglare finns även <strong>Lilla Bommen</strong> i stadskärnan.
          </p>
          <p>
            Många börjar sin skärgårdsutflykt med en linjefartyg ut på Hake fjord — billig och lugn segling för nybörjare. Men ett eget båtsällskap ger dig friheten att välja egen väg och stanna längre på dina favoritöar. De tre huvudöarna — Styrsö, Vrångö och Brännö — är alla bilfria. Lämna bilen i stan och flytta fokus till vatten och segel.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            De tre stora — Styrsö, Vrångö och Brännö
          </h3>
          <p>
            <strong>Styrsö</strong> är skärgårdens största och mest lättillgängliga ö. Styrsö Skäret på öns västra sida är legendariskt — klassiska restauranger med västkustens bästa räksmörgås, bryggkafféer och ett lummigt fritidsliv. Öns många vikar och ankringplatser gör det enkelt att hitta sin egen lugna spot för övernattning. Nåbar på under en timme från Saltholmen.
          </p>
          <p>
            <strong>Brännö</strong> är hem för en aktiv och självständig skärgårdskultur. Här är midsommar en institution — folkmusik, dans och ett helt samhälle som vaknar till liv runt midjommarsfesten. Året om finns goda ankringplatser och en mindre men gemytlig motsvarighet till Styrsö Skäret. En timmes segling från Saltholmen.
          </p>
          <p>
            <strong>Vrångö</strong> ligger sydligast av de tre och erbjuder något mer vilsamhet och natur. Färre restauranger men mer orörd strandliv gör Vrångö populärt bland seglare som söker en lite mer stöpt ö. Också omkring en timmes segling från Saltholmen, men känns långt borta. Klippbaden och naturvikarna är oslagbara.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Yttre öarna och havsbandet
          </h3>
          <p>
            Bortom de tre stora öarna ligger <strong>skärgårdens hjärta</strong> — yttre öar som kräver lite mer seglarkunnande men bjuder på mindre tämjda miljöer. <strong>Köön</strong> är ett naturreservat med vilt klippbad och få besökare. <strong>Galterö</strong> är än vildare och ligger långt ut — exponerat läge men praktfullt för den erfarne seglaren. <strong>Rivön</strong> är en före detta militärö med historia och dramatiska stenformationer.
          </p>
          <p>
            <strong>Källö-Knippla</strong> och <strong>Hönö</strong> ligger norr om Göteborg, närmast mot Marstrand-området. Dessa öar är mer samhällspräglade än naturöarna men erbjuder långsammare, lugare segling än i närheten av Göteborg. Alla dessa yttre öar exponeras mot öppet vatten och kan få kraftig sjö i blåst — bäst för erfarna seglare med god båtkänsla.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Göteborg som seglarbas
          </h3>
          <p>
            Göteborg är Skandinaviens segelmekka. <strong>Göteborgs Kungliga Segelsällskap (GKSS)</strong> vid Långedrag är Skandinaviens största segelklubb med årtionde gamla traditioner. Här kan gäster ofta få tips om väder, rutter och ankringplatser.
          </p>
          <p>
            <strong>Klöverskärs marina</strong> och <strong>Göteborgs kajsportcentrum</strong> erbjuder båtuthyrning för dagsturer eller längre uthyrningar. Bunkring (diesel och bensin) finns i Långedrag och Lilla Bommen — viktigt att veta på längre turer norrut.
          </p>
          <p>
            <strong>Hake fjord</strong> är namnet på sundet och vattnet söder och väster om Göteborg — det är väsentligen alla kanalerna genom Älvsborgsfjorden och det öppna vattnet mot skärgården. Det är en av västkustens mest trafikerade segelvatten, och det är viktigt att hålla utkik efter färjor och andra båtar. Använd Svalla för att se båttrafiken och få råd från andra lokala seglare.
          </p>

          <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
            Vanliga frågor
          </h3>
          <p>
            <strong>Kan man segla till Göteborgs skärgård utan egen båt?</strong> Ja, helt enkelt. Du kan hyra båt genom flera klubbar och charter-företag i Göteborg. GKSS erbjuder gästmedlemskap och möjlighet till dagsbåtar, och flera privata charter-företag tillhandahåller allt från små gummibåtar till större segelfartyg.
          </p>
          <p>
            <strong>Vilken ö är bäst för barn?</strong> Styrsö och Brännö med sin etablerade service, många bryggor för badning och lugna vikar passar barnfamiljer bäst. Restaurangerna på Styrsö Skäret är barnvänliga. Vrångö är lite mer avsides men erbjuder vackrare naturupplevelse för äldre barn som gillar klippbad och äventyr.
          </p>
          <p>
            <strong>Kan man segla hela dagen till Marstrand från Göteborg?</strong> Ja, helt säkert — det är ungefär 20 sjömil norrut. Med en bra segelväder och medvind är det en klassisk dagstur som tar 3–4 timmar. Du kan också spendera dagen på vägen och ankra på någon av öarna — många gör det.
          </p>
          <p>
            <strong>Vad är Hake fjord?</strong> Hake fjord är namnet på vattnet söder och väster om Göteborg. Det omfattar Älvsborgsfjorden, kanalerna genom arkipelagen och det öppna vattnet mot de yttre öarna. Det är det centrala navet för all segling från Göteborg — det är där du startar, seglar igenom och utforskar skärgården. Svalla har kartmaterial och djupkort speciellt för Hake fjord.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Aktiviteter', href: '/aktiviteter' },
        { label: 'Bohuslän', href: '/bohuslan' },
      ]}
    />
    </>
  )
}

import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Göteborgs skärgård — Segla södra Bohuslän | Svalla',
  description: 'Utforska Göteborgs skärgård med Svalla. Logga båtturer i Hake fjord, Vrångö, Styrsö och Brännö — skärgården precis utanför Göteborg med gästhamnar, krogar och naturhamnar.',
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
  return (
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
            Bara en halvtimme från centrala Göteborg öppnar sig en av Sveriges vackraste skärgårdar. <strong>Styrsö, Vrångö och Brännö</strong> är välkända, men skärgårdens yttersta skär och vikar är fortfarande halvt dolda.
          </p>
          <p>
            Med Svalla loggar du dagsturer och längre äventyr från Saltholmen, hittar de bästa krogarna och naturhamnarna på kartan, och kan följa andra Göteborgsseglarens favoritplatser.
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
          <p>
            <strong>Södra skärgården</strong> — Styrsö, Vrångö och Brännö — är bilfria öar med fin service, restauranger och gästbryggor. Enkelt att nå från Saltholmen och perfekt för dagsturer.
          </p>
          <p>
            <strong>Norra skärgården</strong> — mot Marstrand och Orust — är mer öppen och kräver mer erfarenhet. Vindarna kan vara kraftiga i Hake fjord men belöningen är storslagna klippmiljöer och legendariska hamnar som Marstrand.
          </p>
          <p>
            <strong>Bästa säsongen</strong> är maj–september. Midsommar och juli är högsäsong — boka gästhamn tidigt eller välj naturhamn. September är fantastiskt med färre besökare och fortfarande varmt hav.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Bohuslän', href: '/bohuslan' },
        { label: 'Västerhavet', href: '/vasterhav' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Mälaren — Segla Sveriges tredje största sjö | Svalla',
  description: 'Utforska Mälaren med Svalla. Logga båtturer på Sveriges mest seglartäta insjö, hitta gästbryggor, kaféer och historiska hamnar längs Mälarens 1 140 öar.',
  keywords: [
    'mälaren segla',
    'mälaren båt',
    'segla mälaren',
    'mälarö',
    'ekerö',
    'munsö',
    'björkö birka',
    'strängnäs hamn',
    'västerås segla',
    'mariefred',
    'gripsholm',
    'stockholm mälaren',
    'mälardalen segling',
    'insjösegling sverige',
    'svealand båtliv',
  ],
  openGraph: {
    title: 'Mälaren — Segla Sveriges tredje största sjö | Svalla',
    description: 'Logga dina båtturer på Mälaren med Svalla — 1 140 öar, historiska hamnar och kafébryggor.',
    url: 'https://svalla.se/malaren',
  },
  alternates: { canonical: 'https://svalla.se/malaren' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Mälaren',
    description: 'Alla gästbryggor, kaféer, naturhamnar och sevärdheter runt Mälaren — verifierade och uppdaterade.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '⛵',
    title: 'Rutter på Mälaren',
    description: 'Klassiska leder från Stockholm västerut — Drottningholm, Birka, Mariefred och Västerås med etappinfo och djupdata.',
    href: '/segelrutter',
  },
  {
    icon: '☕',
    title: 'Kafébryggor & restauranger',
    description: 'Mälaren är känt för sina charmiga bryggkaféer. Hitta de bästa fikastoppen längs kusten med Svallas karta.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🏛️',
    title: 'Historiska platser',
    description: 'Birka, Gripsholms slott, Strängnäs domkyrka — Mälaren är omgiven av svensk historia. Logga besöken i Svalla.',
    href: '/platser',
  },
  {
    icon: '🌅',
    title: 'Solnedgångsankring',
    description: 'Mälarens lugna vatten och långa sommarkvällar gör det till en av Sveriges bästa sjöar för ankring och övernattning.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '📍',
    title: 'Logga dina turer',
    description: 'Spåra din tur med GPS, dokumentera vindförhållanden och dela med Svallas community av Mälarsseglare.',
    href: '/logga-in',
  },
]

export default function MalarenPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a6b5a', '#22a085']}
      eyebrow="Mälaren"
      title="Insjöns lugn — 1 140 öar"
      tagline="Sveriges tredje största sjö med tusen år av historia. Svalla hjälper dig utforska Mälarens kafébryggor, historiska hamnar och dolda ankringsplatser."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      }
      intro={
        <>
          <p>
            Mälaren sträcker sig 12 mil västerut från Stockholm med <strong>1 140 öar, vikar och sund</strong> att utforska. Det lugna insjövattnet gör den perfekt för familjesegling, kajak och dagsturer.
          </p>
          <p>
            Med Svalla loggar du turer från Riddarfjärden ut till Västerås, hittar kafébryggor på kartan och kan följa andra seglares favoritrutter längs de historiska Mälarstränderna.
          </p>
        </>
      }
      itemsTitle="Mälaren med Svalla"
      itemsDescription="Kafébryggor, historiska hamnar och stilla ankringsplatser."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Varför segla Mälaren?
          </h2>
          <p>
            <strong>Lugnt och förutsägbart</strong> — utan tidvatten och havsdyning är Mälaren en av Sveriges tryggaste seglarvatten. Perfekt för den som är ny på sjön eller vill ta med familjen.
          </p>
          <p>
            <strong>Historia längs stränderna</strong> — Birka (Unescos världsarv), Gripsholms slott och Strängnäs domkyrka kan alla nås med båt. Svalla låter dig logga besöken och se andras rekommendationer.
          </p>
          <p>
            <strong>Kafékultur</strong> — Mälaren är känt för sina charmiga bryggor med fika och sjömat. Från Drottningholm till Mariefred hittar du kaféerna på Svallas karta och kan boka bord direkt.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

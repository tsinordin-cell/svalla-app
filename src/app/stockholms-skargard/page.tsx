import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Stockholms skärgård — Logga turer, hitta platser | Svalla',
  description: 'Utforska Stockholms skärgård med Svalla. Logga dina båtturer, hitta restauranger, naturhamnar och bryggor bland tusentals öar. Gratis att komma igång.',
  keywords: [
    'stockholms skärgård',
    'skärgårdsapp stockholm',
    'båttur stockholms skärgård',
    'segla stockholms skärgård',
    'naturhamnar stockholm',
    'restauranger skärgården',
    'sandhamn',
    'utö',
    'grinda',
    'fjäderholmarna',
    'vaxholm',
    'norra skärgården',
    'södra skärgården',
  ],
  openGraph: {
    title: 'Stockholms skärgård — Logga turer, hitta platser | Svalla',
    description: 'Logga dina båtturer och utforska Stockholms skärgård med Svalla.',
    url: 'https://svalla.se/stockholms-skargard',
  },
  alternates: { canonical: 'https://svalla.se/stockholms-skargard' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⚓',
    title: 'Logga dina turer',
    description: 'Spåra varje tur med GPS, lägg till foton och anteckningar. Se hela din skärgårdshistorik samlad på ett ställe.',
    href: '/logga-in',
    meta: 'Gratis',
  },
  {
    icon: '🗺️',
    title: 'Skärgårdskartan',
    description: 'Interaktiv karta med över 400 verifierade platser — naturhamnar, krogar, bryggor, bastun och bensinstationer.',
    href: '/platser',
  },
  {
    icon: '🍽️',
    title: 'Skärgårdskrogar',
    description: 'Fjäderholmarna, Grinda Wärdshus, Sandhamns Värdshus, Utö Värdshus — plus hundratals mindre ställen längs kusten.',
    href: '/krogar-och-mat',
  },
  {
    icon: '⛵',
    title: 'Populära segelrutter',
    description: 'Klassiska leder från Stockholm ut till Landsort, runt Möja eller till Sandhamn — med djupinfo och ankringstips.',
    href: '/segelrutter',
  },
  {
    icon: '🏕️',
    title: 'Naturhamnar',
    description: 'Hitta lugna ankringsplatser och naturbad från Furusund i norr till Landsort i söder.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '👥',
    title: 'Följ andra seglare',
    description: 'Se vad andra gör i skärgården just nu — turer, platser och tips från det lokala seglarsällskapet.',
    href: '/logga-in',
  },
]

export default function StockholmsSkargardPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7aad']}
      eyebrow="Stockholms skärgård"
      title="30 000 öar i fickan"
      tagline="Svalla är appen för dig som älskar Stockholms skärgård — logga turer, hitta de bästa platserna och följ andra seglare."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 17l4-8 4 4 3-6 4 10" />
          <path d="M3 21h18" />
        </svg>
      }
      intro={
        <>
          <p>
            Stockholms skärgård är världsunik — <strong>30 000 öar och skär</strong>, hundratals krogar, naturhamnar och bryggor som öppnar varje sommar. Att hålla koll på allt var omöjligt. Tills nu.
          </p>
          <p>
            Svalla samlar skärgårdslivet på ett ställe. Logga dina turer med GPS, hitta restauranger och naturhamnar på kartan, och dela upplevelserna med andra som är ute på samma vatten.
          </p>
        </>
      }
      itemsTitle="Vad kan du göra med Svalla?"
      itemsDescription="Allt du behöver för skärgårdslivet — i en app."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Stockholms skärgård — från innerskärgård till ytterskärgård
          </h2>
          <p>
            <strong>Innerskärgården</strong> (Fjäderholmarna, Vaxholm, Värmdö) är perfekt för dagsutflykter och nykomlingar. Välskyddade vatten, tätt med platser och enkelt att ta sig ut från Stockholm.
          </p>
          <p>
            <strong>Mellanskärgården</strong> (Möja, Runmarö, Nämdö, Ornö) erbjuder ett steg till — längre segel, mer natur och färre turister. Svalla har detaljerade guider för alla större öar.
          </p>
          <p>
            <strong>Ytterskärgården</strong> (Sandhamn, Utö, Landsort, Huvudskär) kräver erfarenhet och väderplanering men belönar med råare natur och ikoniska krogar. Perfekt att logga med GPS.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

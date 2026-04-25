import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Blekinges skärgård — Logga turer, hitta platser | Svalla',
  description: 'Utforska Blekinges skärgård med Svalla. Logga båtturer, hitta restauranger och naturhamnar längs Blekinges kust. Karlskrona, Sölvesborg och skärgårdsöarna.',
  keywords: [
    'blekinge skärgård',
    'segla blekinge',
    'karlskrona skärgård',
    'blekinge båt',
    'naturhamn blekinge',
    'sölvesborg',
    'hanö',
    'sölvesborgs skärgård',
    'karlskrona hamn',
    'utskärgård blekinge',
    'blekinge sommar',
  ],
  openGraph: {
    title: 'Blekinges skärgård — Logga turer | Svalla',
    description: 'Logga dina båtturer i Blekinges skärgård med Svalla.',
    url: 'https://svalla.se/blekinge-skargard',
  },
  alternates: { canonical: 'https://svalla.se/blekinge-skargard' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Blekinge',
    description: 'Verifierade platser längs Blekinges kust — naturhamnar, bryggor, krogar och sjömackar.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '⚓',
    title: 'Karlskrona — marinstad',
    description: 'Världsarvsstad och Östersjöns stolthet. Gästhamnen i Stumholmen är en naturlig mötesplats för seglare.',
    href: '/platser',
  },
  {
    icon: '🏕️',
    title: 'Hanö och ytterskärgården',
    description: 'Blekinges utpostar mot öppet hav — råa öar med unik fågelrik natur och lugna ankringsplatser.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🍽️',
    title: 'Krogar längs kusten',
    description: 'Från fiskrökerier i Ronneby skärgård till vällagad mat i Karlskronas restauranger.',
    href: '/krogar-och-mat',
  },
  {
    icon: '⛵',
    title: 'Etapp på Östersjöleden',
    description: 'Blekinge är en naturlig etapp om du seglar längs kusten mot Gotland eller Danmark. Logga varje dag.',
    href: '/logga-in',
  },
  {
    icon: '📱',
    title: 'Logga dina turer',
    description: 'GPS-spårning, foton och anteckningar — spara minnen från Blekinges skärgård.',
    href: '/logga-in',
  },
]

export default function BlekingeSkargardPage() {
  return (
    <CategoryLanding
      heroGradient={['#4a3728', '#6b5040']}
      eyebrow="Blekinges skärgård"
      title="Östersjöns gröna kust"
      tagline="Välbevarad och underskattad — Svalla hjälper dig utforska Blekinges skärgård och logga varje tur längs Sveriges sydligaste kust."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
      }
      intro={
        <>
          <p>
            Blekinges skärgård är Sveriges bäst bevarade hemlighet. <strong>Frodig vegetation, lugna vatten och Karlskrona som maritimt världsarv</strong> — en region som belönar den seglare som tar sig dit.
          </p>
          <p>
            Svalla låter dig logga alla turer längs kusten, hitta naturhamnar och krogar på kartan och spara minnen från en skärgård som fortfarande känns oprövad.
          </p>
        </>
      }
      itemsTitle="Blekinge med Svalla"
      itemsDescription="Utforska Blekinges kust och skärgård."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Varför Blekinge?
          </h2>
          <p>
            <strong>Karlskrona</strong> är en av Europas bäst bevarade marinstäder — UNESCO Världsarv sedan 1998. Gästhamnen vid Stumholmen är välutrustad och centralt belägen. Logga ankomsten med GPS för ett minne för livet.
          </p>
          <p>
            <strong>Hanö</strong> ute till havs är känd för sitt fågelskyddsområde och den unika engelska kyrkogården från Napoleonkrigen. Ankring runt ön kräver erfaret öga men belönar med total avskildhet.
          </p>
          <p>
            <strong>Ronneby skärgård</strong> med sina serpentinsklippor och skogsklädda öar är perfekt för kajakpaddling och kortare dagsutflykter — ett annat sätt att logga skärgårdslivet i Svalla.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Gotland', href: '/gotland' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

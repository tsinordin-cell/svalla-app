import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Åland — Segla dit från Sverige, logga turen | Svalla',
  description: 'Planera din seglingstur till Åland med Svalla. Hitta gästhamnar i Mariehamn, naturhamnar i skärgårdshavet och krogar på öarna. Klassisk segelrutt.',
  keywords: [
    'segla åland',
    'åland båt',
    'mariehamn hamn',
    'ålands skärgård',
    'segla åland från stockholm',
    'åland gästhamn',
    'skärgårdshavet segling',
    'åland restaurang',
    'eckerö åland',
    'föglö åland',
    'åland sommar',
  ],
  openGraph: {
    title: 'Åland — Segla dit från Sverige | Svalla',
    description: 'Logga din seglingstur till Åland och utforska skärgårdshavets 6 500 öar med Svalla.',
    url: 'https://svalla.se/aland',
  },
  alternates: { canonical: 'https://svalla.se/aland' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⛵',
    title: 'Segla från Sverige till Åland',
    description: 'En av Östersjöns klassiska segelpassager. Logga hela turen med GPS — från Stockholms skärgård till Ålands hav.',
    href: '/logga-in',
    meta: 'Klassiker',
  },
  {
    icon: '⚓',
    title: 'Mariehamn',
    description: 'Ålands huvudstad och naturliga mötesplats för seglare. Välutrustad gästhamn, restauranger och tullfri handel.',
    href: '/platser',
  },
  {
    icon: '🏕️',
    title: 'Skärgårdshavets naturhamnar',
    description: '6 500 öar i skärgårdshavet erbjuder oändliga ankringsplatser — många helt orörda och tillgängliga med allemansrätten.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🍽️',
    title: 'Åländska krogar',
    description: 'Från Mariehamns restauranger till gamla handelshus ute i skärgården — unikt utbud med finsk-svensk karaktär.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🗺️',
    title: 'Skärgårdshavets karta',
    description: 'Navigera bland öar, grunder och smala sund med Svallas interaktiva karta och inbyggda GPS-spårning.',
    href: '/platser',
  },
  {
    icon: '📱',
    title: 'Logga hela resan',
    description: 'Avgång från Sverige, Åland-vistelsen och hemresan. Spara alla turer och se din totala statistik.',
    href: '/logga-in',
  },
]

export default function AlandPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a4a7a', '#2563a8']}
      eyebrow="Åland"
      title="Skärgårdshavet kallar"
      tagline="Från Stockholms skärgård till Ålands 6 500 öar — logga passagen, utforska havet och hitta de bästa platserna med Svalla."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21 4 21 4s-2 0-3.5 1.5L14 9 5.8 7.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 3.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
        </svg>
      }
      intro={
        <>
          <p>
            Åland och skärgårdshavet är Östersjöns bäst bevarade hemlighet. <strong>6 500 öar</strong>, kristallklart vatten och en unik blandning av svensk och finsk kultur — allt tillgängligt med en segletur från Stockholm.
          </p>
          <p>
            Svalla låter dig logga passagen dit, navigera bland skärgårdshavets oändliga öar och hitta de bästa gästhamnarna och restaurangerna längs vägen.
          </p>
        </>
      }
      itemsTitle="Åland med Svalla"
      itemsDescription="Planera och logga din resa till Åland."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Passagen från Sverige till Åland
          </h2>
          <p>
            <strong>Från Stockholms skärgård</strong> tar passagen vanligtvis 12–18 timmar. Utgångspunkterna är Sandhamn eller Kapellskär. Öppet hav med ostadigt väder — planera med marginal och logga med GPS hela vägen.
          </p>
          <p>
            <strong>Föglö och Kökar</strong> är perfekta första stopp i skärgårdshavet — lugna vatten, välkomna hamnar och den unika känslan av att vara halvvägs. Svalla-kartan visar djup och faciliteter för alla hamnar.
          </p>
          <p>
            <strong>Tullfritt</strong> gäller inte längre vid inresa men Åland erbjuder ändå lägre priser på många varor. Mariehamn har välutrustat varv om båten behöver service under resan.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Gotland', href: '/gotland' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

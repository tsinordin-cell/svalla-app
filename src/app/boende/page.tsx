import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'
import JsonLd from '@/components/JsonLd'

// Redirectar gamla ?typ=-URLer till de nya SEO-sidorna
const TYP_REDIRECT: Record<string, string> = {
  stugor: '/boende/stugor-stugbyar',
  hotell: '/boende/hotell-vandrarhem',
  camping: '/boende/camping-talt',
  bnb: '/boende/bb',
  bb: '/boende/bb',
}

export const metadata: Metadata = {
  title: 'Boende i Stockholms skärgård — Svalla',
  description: 'Hotell, vandrarhem, stugor, pensionat och B&B i Stockholms skärgård. Boende från Arholma i norr till Landsort i söder.',
  keywords: [
    'boende stockholms skärgård',
    'hotell skärgården',
    'stuga skärgården',
    'vandrarhem skärgård',
    'pensionat sandhamn',
    'boende utö',
  ],
  openGraph: {
    title: 'Boende i Stockholms skärgård — Svalla',
    description: 'Hotell, vandrarhem, stugor och pensionat i Stockholms skärgård.',
    url: 'https://svalla.se/boende',
  },
  alternates: { canonical: 'https://svalla.se/boende' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏨',
    title: 'Skärgårdshotell',
    description: 'Klassiska hotell och värdshus i fd lotsstationer och pensionat — Sandhamn, Utö, Vaxholm, Grinda.',
    href: '/boende/hotell-vandrarhem',
  },
  {
    icon: '🏡',
    title: 'Stugor & hus',
    description: 'Hyr hela stugan — allt från enkla sommarstugor till moderna arkitektvillor med bastu och brygga.',
    href: '/boende/stugor-stugbyar',
  },
  {
    icon: 'bed',
    title: 'Vandrarhem & hostel',
    description: 'Budgetalternativ i Stavsnäs, Finnhamn, Möja och andra noder. Ofta självhushåll med delat kök.',
    href: '/boende/hotell-vandrarhem',
  },
  {
    icon: 'pin',
    title: 'Camping',
    description: 'Campingplatser med el och dusch, samt tältning på allemansrätt — vilka öar som tillåter vadå.',
    href: '/boende/camping-talt',
  },
  {
    icon: '☕',
    title: 'B&B och pensionat',
    description: 'Familjedrivet boende med frukost — ofta det bästa sättet att möta lokalbefolkningen.',
    href: '/boende/bb',
  },
  {
    icon: '',
    title: 'Sova på båten',
    description: 'Gästhamnar med komfort eller naturhamnar utan folk — båten är Sveriges vanligaste skärgårdsboende.',
    href: '/hamnar-och-bryggor',
  },
]

export default async function BoendePage({
  searchParams,
}: {
  searchParams: Promise<{ typ?: string }>
}) {
  const { typ } = await searchParams
  if (typ && TYP_REDIRECT[typ]) {
    redirect(TYP_REDIRECT[typ])
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Boende i Stockholms skärgård',
    description: 'Hotell, vandrarhem, stugor, pensionat och B&B i Stockholms skärgård.',
    url: 'https://svalla.se/boende',
    numberOfItems: 5,
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Hotell och vandrarhem',
        url: 'https://svalla.se/boende/hotell-vandrarhem',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Stugor och stugbyar',
        url: 'https://svalla.se/boende/stugor-stugbyar',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Camping och tält',
        url: 'https://svalla.se/boende/camping-talt',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'B&B och pensionat',
        url: 'https://svalla.se/boende/bb',
      },
      {
        '@type': 'ListItem',
        position: 5,
        name: 'Hamnar och bryggor',
        url: 'https://svalla.se/hamnar-och-bryggor',
      },
    ],
  }

  return (
    <>
      <JsonLd data={jsonLd} />
      <CategoryLanding
        heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Boende"
      title="Sov i skärgården"
      tagline="Hotell, stugor, vandrarhem, pensionat och campingplatser — för en helg, en vecka eller hela sommaren."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 20h20" />
          <path d="M4 20V10l8-6 8 6v10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      }
      intro={
        <>
          <p>
            Att sova ute i skärgården är en av Sveriges starkaste reseupplevelser. Inget busbrus, inga gatlyktor — bara vågljud, måsar och sikten hela vägen till horisonten.
          </p>
          <p>
            Utbudet spänner från klassiska värdshus på öar som Sandhamn och Utö till modernt designad arkitektur och enkla självhushållsstugor. Denna sida samlar kategorierna — klicka dig vidare för att hitta specifika objekt med bilder, priser och omdömen från Svalla-användare.
          </p>
        </>
      }
      itemsTitle="Välj typ av boende"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            När bör man boka?
          </h2>
          <p>
            Juli och midsommarhelgen bokar ut sig redan i januari på de mest eftertraktade ställena — <em>Sandhamn Seglarhotell, Utö Värdshus, Grinda Wärdshus</em>. För juni eller september bokas det oftast 1–2 månader i förväg. Off-season (okt–april) är nästan alltid möjligt med några dagars varsel — och många ställen har då låga veckopriser.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Tänk på färjeturen
          </h2>
          <p>
            Välj boende nära en färjelinje du kan lita på — Waxholmsbolagets huvudlinjer går året runt, men många sommarslingor till mindre öar slutar i augusti. På varje ö-sida ser du aktuella färjetider och hur du tar dig dit från Strömkajen, Stavsnäs eller Dalarö.
          </p>
        </>
      }
      related={[
        { label: 'Alla öar', href: '/rutter?vy=oar' },
        { label: 'Färjetider', href: '/rutter?vy=farjor' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Kartan', href: '/upptack' },
      ]}
      />
    </>
  )
}

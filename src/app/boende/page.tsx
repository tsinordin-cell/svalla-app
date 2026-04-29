import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

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
    href: '/platser?kategori=hotell',
  },
  {
    icon: '🏡',
    title: 'Stugor & hus',
    description: 'Hyr hela stugan — allt från enkla sommarstugor till moderna arkitektvillor med bastu och brygga.',
    href: '/platser?kategori=stuga',
  },
  {
    icon: '🛏️',
    title: 'Vandrarhem & hostel',
    description: 'Budgetalternativ i Stavsnäs, Finnhamn, Möja och andra noder. Ofta självhushåll med delat kök.',
    href: '/platser?kategori=vandrarhem',
  },
  {
    icon: '🏕️',
    title: 'Camping',
    description: 'Campingplatser med el och dusch, samt tältning på allemansrätt — vilka öar som tillåter vadå.',
    href: '/platser?kategori=camping',
  },
  {
    icon: '☕',
    title: 'B&B och pensionat',
    description: 'Familjedrivet boende med frukost — ofta det bästa sättet att möta lokalbefolkningen.',
    href: '/platser?kategori=bnb',
  },
  {
    icon: '',
    title: 'Sova på båten',
    description: 'Gästhamnar med komfort eller naturhamnar utan folk — båten är Sveriges vanligaste skärgårdsboende.',
    href: '/hamnar-och-bryggor',
  },
]

export default function BoendePage() {
  return (
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
            Juli och midsommarhelgen bokar ut sig redan i januari på de mest eftertraktade ställena — <em>Sandhamn Seglarhotell, Utö Värdshus, Fjäderholmarnas Krog</em>. För juni eller september bokas det oftast 1–2 månader i förväg. Off-season (okt–april) är nästan alltid möjligt med några dagars varsel — och många ställen har då låga veckopriser.
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
        { label: 'Kartan', href: '/platser' },
      ]}
    />
  )
}

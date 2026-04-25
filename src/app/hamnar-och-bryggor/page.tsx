import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Hamnar & bryggor i Stockholms skärgård — Svalla',
  description: 'Gästhamnar, naturhamnar, besöksbryggor och bensinmackar i Stockholms skärgård. Djup, faciliteter, priser och väderskydd.',
  keywords: [
    'gästhamnar stockholms skärgård',
    'naturhamn stockholm',
    'besöksbrygga skärgården',
    'båtbensin skärgård',
    'gästbrygga stockholm',
    'hamn sandhamn',
  ],
  openGraph: {
    title: 'Hamnar & bryggor i Stockholms skärgård — Svalla',
    description: 'Gästhamnar, naturhamnar och besöksbryggor i skärgården.',
    url: 'https://svalla.se/hamnar-och-bryggor',
  },
  alternates: { canonical: 'https://svalla.se/hamnar-och-bryggor' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⚓',
    title: 'Gästhamnar',
    description: 'Servicehamnar med el, vatten, dusch och toalett — oftast nära krog, butik och färjeanslutning.',
    href: '/platser?kategori=gasthamn',
  },
  {
    icon: '🌿',
    title: 'Naturhamnar',
    description: 'Skyddade vikar där du lägger dig för ankare eller med tamp i berget — gratis, stilla, egna.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🛥️',
    title: 'Besöksbryggor',
    description: 'Korta stopp för att äta middag, handla eller byta folk — utan att ligga kvar över natten.',
    href: '/platser?kategori=besoksbrygga',
  },
  {
    icon: '⛽',
    title: 'Bensinmackar (båt)',
    description: 'Sjöbensin, diesel och septiktömning i skärgården — var och när har de öppet.',
    href: '/platser?kategori=bensin',
  },
  {
    icon: '🛠️',
    title: 'Service & varv',
    description: 'Båtslip, reparation, beställningstjänster — för när något händer mitt i seglingen.',
    href: '/platser?kategori=varv',
  },
  {
    icon: '🚧',
    title: 'Naturreservat — restriktioner',
    description: 'Öar och vikar med landstigningsförbud under fågelskyddsperioden 1 april–15 juli.',
    href: '/vandring-och-natur',
  },
]

export default function HamnarOchBryggorPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Hamnar & bryggor"
      title="Hitta rätt plats att förtöja"
      tagline="Gästhamnar, naturhamnar, besöksbryggor, bensinmackar och varv — med djup, faciliteter och väderskydd."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="5" r="3" />
          <path d="M12 8v13" />
          <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
        </svg>
      }
      intro={
        <>
          <p>
            Att välja rätt hamn är halva resan. Storm från öst? Sök västligt läge. Fullt i Sandhamn? Det finns alltid en tom naturhamn inom 20 minuter. Svalla samlar alla seriösa förtöjningsalternativ i Stockholms skärgård med <strong>djup, faciliteter, vindskyddsriktning och aktuella priser</strong>.
          </p>
          <p>
            Data kommer från hamnoperatörer, Waxholmsbolagets depåkartor och — framförallt — från seglare och motorbåtsfolk som loggat sina egna tur i Svalla. Om du ser en hamn som saknas, lägg till den.
          </p>
        </>
      }
      itemsTitle="Typ av förtöjningsplats"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Priser 2026 (riktpris gästhamn)
          </h2>
          <p>
            Gästhamnar i Stockholms skärgård kostar typiskt <strong>250–400 kr/natt</strong> för båt upp till 30 fot, med vatten, el och dusch ingår. Större populära hamnar (Sandhamn Seglarhotell, Utö Värdshus) ligger närmare <strong>500–700 kr</strong> i högsäsong. Naturhamnar är alltid gratis.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Allemansrätt och ankring
          </h2>
          <p>
            Allemansrätten tillåter ankring utanför tomt, utan störning och för kortare tid. Observera dock lokala förbud — många vikar i Stockholms skärgård är <strong>fågelskyddsområden</strong> med landstigningsförbud 1 april–15 juli. Varje platssida visar aktuella restriktioner.
          </p>
        </>
      }
      related={[
        { label: 'Alla öar', href: '/rutter?vy=oar' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Färjetider', href: '/rutter?vy=farjor' },
        { label: 'Kartan', href: '/platser' },
      ]}
    />
  )
}

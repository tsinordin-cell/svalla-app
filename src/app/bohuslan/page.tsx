import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Bohuslän — Segla västkusten, logga turer | Svalla',
  description: 'Utforska Bohuslän med Svalla. Logga båtturer längs västkusten, hitta hummerkrogar, naturhamnar och gästhamnar från Göteborg till Strömstad.',
  keywords: [
    'bohuslän segla',
    'västkusten båt',
    'bohuslän skärgård',
    'segla bohuslän',
    'hummer bohuslän',
    'marstrand',
    'smögen',
    'fjällbacka',
    'kungshamn',
    'strömstad',
    'hamburgsund',
    'grebbestad',
    'naturhamn bohuslän',
  ],
  openGraph: {
    title: 'Bohuslän — Segla västkusten | Svalla',
    description: 'Logga dina båtturer och hitta de bästa platserna längs Bohusläns kust.',
    url: 'https://svalla.se/bohuslan',
  },
  alternates: { canonical: 'https://svalla.se/bohuslan' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Bohuslän',
    description: 'Alla verifierade platser längs västkusten — gästhamnar, naturhamnar, hummerkrogar och sjömackar.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '🦞',
    title: 'Hummerkrogar',
    description: 'Säsong i september–oktober. Smögen, Fjällbacka, Grebbestad och Kungshamn är klassiska stoppunkter.',
    href: '/krogar-och-mat',
  },
  {
    icon: '⛵',
    title: 'Segelrutter längs kusten',
    description: 'Från Göteborgs skärgård norrut — klassiska leder med vindinfo, djupdata och ankringstips för varje etapp.',
    href: '/segelrutter',
  },
  {
    icon: '🏕️',
    title: 'Naturhamnar & ankring',
    description: 'Bohusläns granitklippor bjuder på unika ankringsplatser — från skyddade vikar till öppna fjordar.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '⚓',
    title: 'Logga dina turer',
    description: 'Spåra din färd längs kusten med GPS, lägg till bilder och dela med vänner som också seglar Bohuslän.',
    href: '/logga-in',
  },
  {
    icon: '🏰',
    title: 'Marstrand & Bohus Fästning',
    description: 'Sommarsäsongens mötesplats för seglare — logga din tur hit och se vem mer som besökt ön.',
    href: '/logga-in',
  },
]

export default function BohuslanPage() {
  return (
    <CategoryLanding
      heroGradient={['#2d6a4f', '#3a8a65']}
      eyebrow="Bohuslän"
      title="Västkustens råa skärgård"
      tagline="Granitklippor, hummer och friska västanvindar — Svalla hjälper dig logga varje tur längs Bohusläns unika kust."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z" />
          <path d="M2 12h20" />
        </svg>
      }
      intro={
        <>
          <p>
            Bohuslän är Skandinaviens mest besökta kustregion — och med god anledning. <strong>Öppen ocean, vass granit och ikoniska fisklägen</strong> ger en seglarmiljö som inte liknar något annat i Sverige.
          </p>
          <p>
            Med Svalla loggar du alla etapper från Göteborg till norska gränsen, hittar hummerkrogar och gästhamnar på kartan och kan följa andra seglares turer längs samma kust.
          </p>
        </>
      }
      itemsTitle="Bohuslän med Svalla"
      itemsDescription="Allt du behöver för en tur längs västkusten."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Bästa säsongen för Bohuslän
          </h2>
          <p>
            <strong>Juni–augusti</strong> är högsäsong med varmt vatten och öppna krogar. Juli är fullsatt — boka gästhamn i god tid eller välj naturhamn med Svallas karta.
          </p>
          <p>
            <strong>September</strong> är hummermånad. Krogarna längs kusten från Smögen till Strömstad fylls av seglare och gourmeter. Vädret är fortfarande gott och trycket lättar efter semesterperioden.
          </p>
          <p>
            <strong>Oktober–november</strong> för den erfarne — stormigare men kargare och vackrare natur. Perfekt att logga med GPS och dela med Svallagemenskapen.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Gotland — Segla dit, logga turen | Svalla',
  description: 'Planera och logga din seglingstur till Gotland med Svalla. Hitta restauranger i Visby, naturhamnar och gästhamnar runt ön. Gotlands bästa seglarmål.',
  keywords: [
    'segla gotland',
    'gotland båt',
    'visby hamn',
    'gotland segling',
    'naturhamn gotland',
    'restaurang visby',
    'fårö gotland',
    'gotland sommar',
    'östersjön segling',
    'gotland krog',
    'lummelunda',
    'hoburgen',
  ],
  openGraph: {
    title: 'Gotland — Segla dit, logga turen | Svalla',
    description: 'Planera din seglingstur till Gotland och logga varje etapp med Svalla.',
    url: 'https://svalla.se/gotland',
  },
  alternates: { canonical: 'https://svalla.se/gotland' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '⛵',
    title: 'Segla till Gotland',
    description: 'En av Östersjöns klassiska segelresor. Logga hela passagen med GPS — varje timme, varje vindskift, varje soluppgång.',
    href: '/logga-in',
    meta: 'Klassiker',
  },
  {
    icon: '🏰',
    title: 'Visby innerstad',
    description: 'Världsarv med medeltida ringmur, krogar och uteliv. Gästhamnen ligger direkt nedanför staden.',
    href: '/platser',
  },
  {
    icon: '🍽️',
    title: 'Krogar & restauranger',
    description: 'Gotland har blommat ut matmässigt — från saffranspannkaka på krogen till mat gjord på gotländska råvaror.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🏕️',
    title: 'Naturhamnar runt ön',
    description: 'Fårösund, Slite, Herrvik, Klintehamn — naturliga ankringsplatser runt hela Gotland med detaljinfo.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '🌅',
    title: 'Fårö',
    description: 'Ingmar Bergmans ö. Avsides natur, raukar och lugna vatten. Nå hit från Fårösund.',
    href: '/platser',
  },
  {
    icon: '📱',
    title: 'Logga hela säsongen',
    description: 'Resan dit, veckorna på ön, resan hem. Se din totala Gotlandssäsong i ett flöde.',
    href: '/logga-in',
  },
]

export default function GotlandPage() {
  return (
    <CategoryLanding
      heroGradient={['#8b5e3c', '#b07d52']}
      eyebrow="Gotland"
      title="Östersjöns pärlа"
      tagline="Drömresan för svenska seglare — Svalla hjälper dig planera, logga och minnas varje tur till och runt Gotland."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polygon points="3 11 22 2 13 21 11 13 3 11" />
        </svg>
      }
      intro={
        <>
          <p>
            Gotland är seglardrömmen. <strong>En passage tvärs över Östersjön</strong>, ankomsten till Visby ringmur vid gryning, veckor av sol och gotländsk mat — och sedan resan hem. Det är upplevelser värda att spara.
          </p>
          <p>
            Svalla låter dig logga hela resan med GPS, hitta de bästa platserna runt ön på kartan och dela turen med andra som gjort samma passage.
          </p>
        </>
      }
      itemsTitle="Gotland med Svalla"
      itemsDescription="Planera, logga och utforska Gotland."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Planera passagen till Gotland
          </h2>
          <p>
            <strong>Från Stockholm</strong> tar passagen normalt 24–36 timmar beroende på vind och kurs. Utgångspunkterna är Sandhamn, Landsort eller Nynäshamn. Räkna med vindskift och varierande sjö — GPS-loggning ger dig alltid tillbaka din exakta rutt.
          </p>
          <p>
            <strong>Visby gästhamn</strong> är fullsatt i juli. Boka i förväg eller ankra i alternativa hamnar som Herrvik eller Klintehamn. Svalla-kartan visar djup, faciliteter och aktuella omdömen.
          </p>
          <p>
            <strong>Fårö</strong> nås via Fårösund med en liten bilfärja. Avskilt, vackert och långt ifrån turisttrycket. Perfekt sista etapp innan hemresan.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        { label: 'Åland', href: '/aland' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

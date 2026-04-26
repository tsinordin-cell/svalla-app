import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Alla resmål i Stockholms skärgård — Svalla',
  description: 'Upptäck öar, krogar, hamnar och dolda smultronställen i Stockholms skärgård. Alla resmål samlade på ett ställe.',
  keywords: [
    'resmål stockholms skärgård',
    'skärgårdsmål',
    'stockholms skärgård öar',
    'utflyktsmål skärgård',
    'skärgårdstips stockholm',
  ],
  openGraph: {
    title: 'Alla resmål i Stockholms skärgård — Svalla',
    description: 'Upptäck öar, krogar, hamnar och smultronställen i Stockholms skärgård.',
    url: 'https://svalla.se/resmal',
  },
  alternates: { canonical: 'https://svalla.se/resmal' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏝️',
    title: 'Alla öar',
    description: 'Från Sandhamn och Utö till Finnhamn och Grinda — sök, jämför och hitta din nästa favoritö.',
    href: '/rutter?vy=oar',
    meta: '200+ öar',
  },
  {
    icon: '🗺️',
    title: 'Kartan över skärgården',
    description: 'Interaktiv karta med krogar, bryggor, bensinmackar, bastu och bad — filtrera på det du söker.',
    href: '/platser',
    meta: 'Live',
  },
  {
    icon: '🍽️',
    title: 'Krogar & mat',
    description: 'Skärgårdskrogar, caféer och sommarrestauranger — bokningsbara året runt eller bara under säsong.',
    href: '/krogar-och-mat',
  },
  {
    icon: '⚓',
    title: 'Hamnar & bryggor',
    description: 'Gästhamnar, naturhamnar och besöksbryggor med allt från dusch och el till helt orörda vikar.',
    href: '/hamnar-och-bryggor',
  },
  {
    icon: '🛁',
    title: 'Bastu & bad',
    description: 'Publika bastur, bastuflottar och klassiska badklippor — för iskalla dopp och långa vedbastur.',
    href: '/bastu-och-bad',
  },
  {
    icon: '🏕️',
    title: 'Vandring & natur',
    description: 'Naturreservat, vandringsleder och ödetomter att upptäcka till fots eller packraft.',
    href: '/vandring-och-natur',
  },
  {
    icon: '🎿',
    title: 'Aktiviteter',
    description: 'Segling, paddling, fiske, SUP, kajak och guidade turer — säsong för säsong.',
    href: '/aktiviteter',
  },
  {
    icon: '🛏️',
    title: 'Boende',
    description: 'Hotell, vandrarhem, stugor och B&B med skärgårdsläge. Allt från Sandhamn till Arholma.',
    href: '/boende',
  },
  {
    icon: '🧭',
    title: 'Populära turer',
    description: 'Kurerade turer som andra seglare loggat — från dagsutflykter till fleradagsrundor.',
    href: '/populara-turer',
  },
]

export default function ResmalPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Alla resmål"
      title="Hela Stockholms skärgård, samlad"
      tagline="Öar, krogar, hamnar, bastur, vandringsleder och aktiviteter — kurerat, sökbart och alltid uppdaterat av skärgårdsfolk själva."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="12" cy="10" r="3" />
          <path d="M12 2a8 8 0 0 0-8 8c0 7 8 12 8 12s8-5 8-12a8 8 0 0 0-8-8Z" />
        </svg>
      }
      intro={
        <>
          <p>
            Stockholms skärgård består av över 30 000 öar, kobbar och skär utspridda från Arholma i norr till Landsort i söder. Svalla samlar allt du behöver för att hitta rätt — oavsett om du söker en dagsutflykt till en krog i ytterskärgården eller planerar en tvåveckors seglats genom mellanskärgården.
          </p>
          <p>
            Under varje kategori hittar du <strong>kurerade listor</strong>, interaktiv karta och erfarenheter från andra användare. Allt är tillgängligt utan inloggning — men med konto kan du spara favoriter, logga dina turer och följa hur andra upplever skärgården.
          </p>
        </>
      }
      itemsTitle="Vad letar du efter?"
      itemsDescription="Varje kategori har sin egen sida med kurerat innehåll, karta och tips."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Varför Svalla?
          </h2>
          <p>
            Vi byggde Svalla för att skärgårdsinformation är spretig — tidtabeller hos Waxholmsbolaget, krogtips på Facebook, bryggreglement på hamnägarens hemsida, bastutider i separata appar. Svalla samlar det på ett ställe och låter dig <strong>dela, följa och upptäcka</strong> tillsammans med andra.
          </p>
          <p>
            Data kommer från Waxholmsbolaget, Cinderellabåtarna, Naturvårdsverket, öarnas föreningar och — framförallt — från våra användare. När du loggar en tur, sätter en rating på en krog eller taggar en brygga, blir skärgården lite bättre för alla.
          </p>
        </>
      }
      related={[
        { label: 'Karta över skärgården', href: '/platser' },
        { label: 'Turer & rutter', href: '/rutter' },
        { label: 'Färjetider', href: '/rutter?vy=farjor' },
        { label: 'Tips & artiklar', href: '/tips' },
      ]}
    />
  )
}

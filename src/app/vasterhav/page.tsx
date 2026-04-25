import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Västerhavet — Segla Kattegatt & Skagerrak | Svalla',
  description: 'Utforska Västerhavet med Svalla. Logga båtturer i Kattegatt och Skagerrak, hitta gästhamnar, ankringsplatser och de bästa kustrestaurangerna längs svenska västkusten.',
  keywords: [
    'västerhavet segla',
    'kattegatt segling',
    'skagerrak båt',
    'svenska västkusten',
    'segla västerhavet',
    'kustsegling sverige',
    'göteborg segla',
    'halmstad båt',
    'varberg segla',
    'lysekil',
    'fiskebäckskil',
    'orust',
    'tjörn',
    'halland kust',
    'västra götaland segling',
  ],
  openGraph: {
    title: 'Västerhavet — Segla Kattegatt & Skagerrak | Svalla',
    description: 'Logga dina båtturer längs svenska västkusten med Svalla.',
    url: 'https://svalla.se/vasterhav',
  },
  alternates: { canonical: 'https://svalla.se/vasterhav' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🗺️',
    title: 'Karta över Västerhavet',
    description: 'Alla verifierade platser längs Kattegatt och Skagerrak — gästhamnar, naturhamnar, sjömackar och kustrestauranger.',
    href: '/platser',
    meta: 'Gratis',
  },
  {
    icon: '🌊',
    title: 'Kustsegling & passager',
    description: 'Från Hallandskusten upp till norska gränsen — vindinfo, ströminformation och djupdata för varje etapp.',
    href: '/segelrutter',
  },
  {
    icon: '🦞',
    title: 'Hummerkrogar & fisk',
    description: 'Västkustens sjömat är känd i hela världen. Hitta de bästa krogarna i Lysekil, Fiskebäckskil och Hamburgsund.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🏕️',
    title: 'Ankring & naturhamnar',
    description: 'Västerhavet bjuder på dramatiska klippformationer och skyddade vikar. Hitta dolda ankringsplatser på Svallas karta.',
    href: '/platser?kategori=naturhamn',
  },
  {
    icon: '⚓',
    title: 'Logga dina turer',
    description: 'Spåra din färd med GPS, dokumentera väder och vind, och dela turen med seglare som känner Västerhavet.',
    href: '/logga-in',
  },
  {
    icon: '⛵',
    title: 'Orust & Tjörn',
    description: 'Två av Skandinaviens mest seglartäta öar — med service, varv och ett rikt seglarliv hela sommaren.',
    href: '/logga-in',
  },
]

export default function VasterhavetPage() {
  return (
    <CategoryLanding
      heroGradient={['#1a5276', '#2471a3']}
      eyebrow="Västerhavet"
      title="Kattegatt & Skagerrak"
      tagline="Öppet hav, salt vind och dramatiska klippkuster — Svalla hjälper dig logga och dela varje etapp längs svenska västkusten."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" />
          <circle cx="12" cy="12" r="10" />
        </svg>
      }
      intro={
        <>
          <p>
            Västerhavet — Kattegatt och Skagerrak — är Nordens öppna seglarvatten. <strong>Tidvatten, tydliga strömmar och friska vindar</strong> gör det mer krävande än den lugna skärgården, men också mer belönande.
          </p>
          <p>
            Med Svalla loggar du alla etapper längs kusten, från Hallands sandstränder upp till Bohusläns granitskär, och hittar de bästa hamnarna och krogarna på vägen.
          </p>
        </>
      }
      itemsTitle="Västerhavet med Svalla"
      itemsDescription="Allt du behöver för segling i Kattegatt och Skagerrak."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Att segla Västerhavet — vad du behöver veta
          </h2>
          <p>
            <strong>Tidvatten och strömmar</strong> är den stora skillnaden mot Östersjön. Vid Hake fjord och Marstrand kan strömmarna vara märkbara — planera passeringstider med Svallas rutt- och tidsplanering.
          </p>
          <p>
            <strong>Maj–september</strong> är seglarsäsongen. Sydvästvinden dominerar — perfekt för nordgående segling längs Bohuslän. Kom ihåg att boka gästhamn i Marstrand och Smögen i god tid under juli.
          </p>
          <p>
            <strong>Halland</strong> erbjuder en annan typ av kustsegling — sandstränder, långa stränder och moderna marinaer i Varberg, Falkenberg och Halmstad. Utmärkt för familjesegling.
          </p>
        </>
      }
      cta={{ label: 'Skapa gratis konto', href: '/logga-in' }}
      related={[
        { label: 'Bohuslän', href: '/bohuslan' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Alla destinationer', href: '/resmal' },
      ]}
    />
  )
}

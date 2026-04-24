import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Erbjudanden & paket i Stockholms skärgård — Svalla',
  description: 'Aktuella erbjudanden och paket för skärgårdsvistelser: hotell, restauranger, aktiviteter och båtcharter i Stockholms skärgård.',
  keywords: [
    'erbjudanden stockholms skärgård',
    'paket skärgården',
    'rabatt skärgård',
    'boende erbjudande stockholm',
    'skärgårdscharter',
  ],
  openGraph: {
    title: 'Erbjudanden & paket — Svalla',
    description: 'Aktuella erbjudanden för skärgårdsvistelser.',
    url: 'https://svalla.se/erbjudanden',
  },
  alternates: { canonical: 'https://svalla.se/erbjudanden' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏨',
    title: 'Boende-paket',
    description: 'Hotellpaket med frukost, spa och färjebiljetter — ofta tillgängliga utanför högsäsong.',
    href: '/boende',
    meta: 'Off-season',
  },
  {
    icon: '⛵',
    title: 'Seglingscharter',
    description: 'Bareboat, skeppare-med-båt eller kurser — veckopaket från maj till september.',
    href: '/segelrutter',
  },
  {
    icon: '🎒',
    title: 'Guidade upplevelser',
    description: 'Kajakturer, fågelskådning, dykning och matlagningskurser ledda av lokala experter.',
    href: '/aktiviteter',
  },
  {
    icon: '🍽️',
    title: 'Middags-paket',
    description: 'Krogkvällar med färjetransport t.o.r, ibland med övernattning — populärt för födelsedagar.',
    href: '/krogar-och-mat',
  },
  {
    icon: '🎟️',
    title: 'Evenemang',
    description: 'Kommande konserter, regattor, festivaler och marknader — bokning och biljetter.',
    href: '/evenemang',
  },
  {
    icon: '💎',
    title: 'Svalla Pro',
    description: 'Låt Svalla hjälpa dig planera och få tillgång till Pro-features som offline-karta och export.',
    href: '/pro',
  },
]

export default function ErbjudandenPage() {
  return (
    <CategoryLanding
      heroGradient={['#c96e2a', '#d98246']}
      eyebrow="Erbjudanden"
      title="Aktuella paket & erbjudanden"
      tagline="Kurerade paket från skärgårdens operatörer — boende, segelcharter, kurser och guidade turer. Uppdateras löpande."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7" />
          <path d="M22 7H2v5h20V7Z" />
          <path d="M12 22V7" />
          <path d="M12 7H7.5a2.5 2.5 0 1 1 0-5C11 2 12 7 12 7Z" />
          <path d="M12 7h4.5a2.5 2.5 0 1 0 0-5C13 2 12 7 12 7Z" />
        </svg>
      }
      intro={
        <>
          <p>
            Skärgårdens operatörer lägger upp säsongspaket, weekend-deals och lågsäsongsrabatter löpande. Svalla samlar de relevanta på ett ställe — inga spam-erbjudanden, bara sådant våra redaktörer själva skulle boka.
          </p>
          <p>
            Vi tar ingen kickback — vi länkar direkt till operatörens bokningssida. Priser och villkor gäller som angivet av operatören.
          </p>
        </>
      }
      itemsTitle="Kategorier"
      itemsDescription="Klicka på en kategori för aktuella erbjudanden."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Driver du ett ställe?
          </h2>
          <p>
            Om du driver ett hotell, en krog, en seglingsskola eller annan skärgårdsverksamhet kan du <strong>skicka in ditt erbjudande</strong> till redaktionen. Vi är selektiva men gratis — vi prioriterar erbjudanden som faktiskt gör skärgården mer tillgänglig, inte bara dyrare.
          </p>
          <p>
            Mejla <a href="mailto:partners@svalla.se" style={{ color: 'var(--sea)' }}>partners@svalla.se</a> med kort beskrivning, priser och bokningslänk. Vi återkommer inom en vecka.
          </p>
        </>
      }
      cta={{ label: 'Alla platser på kartan', href: '/kom-igang' }}
      related={[
        { label: 'Evenemang', href: '/evenemang' },
        { label: 'Boende', href: '/boende' },
        { label: 'Aktiviteter', href: '/aktiviteter' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
      ]}
    />
  )
}

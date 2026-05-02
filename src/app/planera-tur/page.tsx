import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Planera din skärgårdstur — Svalla',
  description: 'Planera din skärgårdstur i Stockholms skärgård med Svalla. Rutter, hamnar, färjor, boende och väder — allt samlat i ett verktyg.',
  keywords: [
    'planera skärgårdstur',
    'skärgårdstur stockholm',
    'båttur planerare',
    'skärgårdsrutt',
    'planera båttur',
  ],
  openGraph: {
    title: 'Planera din skärgårdstur — Svalla',
    description: 'Planera rutter, hamnar, boende och väder i Stockholms skärgård.',
    url: 'https://svalla.se/planera-tur',
  },
  alternates: { canonical: 'https://svalla.se/planera-tur' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '1',
    title: 'Välj tidsperiod',
    description: 'Dagsutflykt, helg eller vecka. Säsongen påverkar vad som är öppet — vi visar tydligt vilka ställen som är aktiva.',
    href: '/rutter',
  },
  {
    icon: '2',
    title: 'Välj färdsätt',
    description: 'Egen båt, hyrbåt, charter, reguljär färja eller kombination. Alla får anpassade förslag.',
    href: '/rutter?vy=farjor',
  },
  {
    icon: '3',
    title: 'Bygg rutten',
    description: 'Välj utgångshamn och destinationer — Svalla föreslår stopp baserat på tid, distans och erfarenheter.',
    href: '/rutter',
  },
  {
    icon: '4',
    title: 'Boka boende',
    description: 'Lägg till hotell, stuga eller naturhamn per natt. Länkar direkt till operatörens bokning.',
    href: '/boende',
  },
  {
    icon: '5',
    title: 'Spara som tur',
    description: 'Med konto sparar du rutten, exporterar GPX och får påminnelser när vädret är rätt.',
    href: '/kom-igang',
  },
  {
    icon: '6',
    title: 'Dela med sällskapet',
    description: 'Skicka länk till din tur — alla ser samma plan, kartan och bokningar.',
    href: '/bjud-in',
  },
]

export default function PlaneraTurPage() {
  return (
    <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="Planera min tur"
      title="Bygg din skärgårdstur"
      tagline="Från en dag i sol till en veckoseglats — planera rutter, boende, färjor och väder i ett verktyg."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
          <line x1="16" x2="16" y1="2" y2="6" />
          <line x1="8" x2="8" y1="2" y2="6" />
          <line x1="3" x2="21" y1="10" y2="10" />
        </svg>
      }
      intro={
        <>
          <p>
            Att planera en skärgårdstur brukar betyda att öppna fem fönster samtidigt — Waxholmsbolagets tidtabell, Booking.com, SMHI, en Facebook-grupp för tips. Svalla samlar det du behöver i <strong>ett flöde</strong>.
          </p>
          <p>
            Ny: <strong>Fråga Thorkel</strong> — vår skärgårdsguide. Berätta vad du vill (familj med barn, romantisk helg, segling från Ingarö) och få ett personligt förslag med restauranger och bokningslänkar på 10 sekunder.
          </p>
        </>
      }
      itemsTitle="Planeringen i sex steg"
      itemsDescription="Börja var du vill — alla steg är oberoende."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Det smarta med Svalla
          </h2>
          <p>
            Med konto får du <strong>live-data</strong>: aktuella färjetider från Trafiklab, väder från SMHI, och tripplaner som uppdateras om en färja ställs in. Du kan även <strong>följa andra</strong> — om en segelbåtskompis just seglat samma rutt ser du deras stopp och rekommendationer.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Utan konto
          </h2>
          <p>
            Alla kurerade sidor (krogar, hamnar, öar, turer) är fria att läsa utan inloggning. Det är bara när du vill <strong>spara</strong>, <strong>logga</strong> och <strong>dela</strong> som du behöver konto — då är det gratis och tar 30 sekunder.
          </p>
        </>
      }
      cta={{ label: 'Planera min tur nu', href: '/planera', secondaryLabel: 'Fråga Thorkel', secondaryHref: '/guide' }}
      related={[
        { label: 'Populära turer', href: '/populara-turer' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Snabbaste vägen', href: '/snabbaste-vagen' },
        { label: 'Alla resmål', href: '/resmal' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Skärgården på vintern — Julkryssning & Vinterguide | Svalla',
  description: 'Vinterskärgårdens magi — julkryssningar, isvandring och skärgårdsmat framför öppen spis. Guide till skärgården december, januari och februari.',
  keywords: ['skärgården vinter','julkryssning skärgård','skärgård december','vinter stockholm skärgård','påskkryssning skärgård','isvandring skärgård','vinter fjäderholmarna'],
  alternates: { canonical: 'https://svalla.se/vinter' },
  openGraph: {
    title: 'Skärgården på vintern | Svalla',
    description: 'Julkryssningar, isvandring och skärgårdsmat framför öppen spis.',
    url: 'https://svalla.se/vinter',
  },
}

const ITEMS: LandingItem[] = [
  { icon: '🎄', title: 'Julkryssning med Waxholmsbolaget', description: 'Adventskryssningar och julbord på Fjäderholmarna — en av Stockholms mest uppskattade decembertraditioner. Boka tidigt.', href: '/farjor', meta: 'Dec–Jan' },
  { icon: '🔥', title: 'Bastu vid havet', description: 'Finnhamns havsbastu och Utös bastuhus håller öppet vintertid — bada i isen och värm upp i bastu med havsutsikt.', href: '/bastu-och-bad', meta: 'Öppen vinter' },
  { icon: '❄️', title: 'Isvandring på fryst skärgård', description: 'Kalla vintrar fryser delar av innerskärgården — promenera på isen ut till öar som normalt bara nås med båt.', href: '/karta', meta: 'Jan–Feb' },
  { icon: '🍽️', title: 'Fjäderholmarna — öppet hela året', description: 'Fjäderholmarna är det enda stället i skärgården med helårsöppet — perfekt för en vinterdag med god mat och havsutsikt.', href: '/o/fjaderholmarna', meta: 'Helår' },
  { icon: '🚢', title: 'Vinterlinjerna går', description: 'Waxholmsbolaget trafikerar innerskärgården hela vintern. Fler avgångar kring jul och nyår.', href: '/farjor', meta: 'Helårslinje' },
  { icon: '📸', title: 'Vinterfotografi i skärgården', description: 'Rimfrost på klippor, is och det blå vinterskymningsljuset — skärgården på vintern ger unika motiv.', href: '/karta', meta: 'Fotoresor' },
]

export default function VinterPage() {
  const breadcrumb = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Skärgården på vintern', item: 'https://svalla.se/vinter' },
    ],
  }
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      <CategoryLanding
        heroGradient={['#0a1e3a', '#1a3a6a']}
        eyebrow="Säsongsguide"
        title="Skärgården på vintern"
        tagline="December, januari och februari — en tystare, magrare och på sitt sätt vackrare version av skärgården. Julkryssningar, bastu och isvandring."
        heroIcon={<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="2" x2="12" y2="22"/><path d="m17 7-5-5-5 5"/><path d="m17 17-5 5-5-5"/><path d="m2 12 5-5 5 5-5 5z"/><path d="m22 12-5-5-5 5 5 5z"/></svg>}
        intro={
          <>
            <p>Vinterskärgården är ett annat land. <strong>Tyst, vit och orörd</strong> — de öar som sommartid är överfyllda av turister tillhör nu bara de få som vet att komma hit. Fjäderholmarna håller öppet hela året, och på riktigt kalla vintrar kan du promenera på isen ut till öar utan fast färjeförbindelse.</p>
            <p>Julkryssningar med Waxholmsbolaget är en stockholmstradition — adventskryssningar med julbord och havsluft. <strong>Boka tidigt</strong>, de fylls snabbt.</p>
          </>
        }
        items={ITEMS}
        itemsTitle="Vinterns upplevelser"
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '28px 0 12px' }}>Vad är öppet på vintern?</h2>
            <p><strong>Fjäderholmarna</strong> är det enda storskaliga alternativet med helårsöppet restaurang och aktiviteter. Waxholmsbolaget kör innerskärgårdslinjer hela vintern.</p>
            <p>Bastun på <strong>Finnhamn</strong> och <strong>Utö</strong> håller säsongsöppet — kontrollera aktuella tider. Kombinationen is-bad + bastu är en upplevelse utöver det vanliga.</p>
            <h2 style={{ fontSize: 20, fontWeight: 700, margin: '28px 0 12px' }}>Vanliga frågor om vintern i skärgården</h2>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '16px 0 6px' }}>Hur kall är skärgården på vintern?</h3>
            <p>Medeltemperaturen i januari är runt −3°C i Stockholms skärgård. Klä dig i lager — havsvindar gör det kallare än termometern visar.</p>
            <h3 style={{ fontSize: 16, fontWeight: 700, margin: '16px 0 6px' }}>Är det säkert att gå på is i skärgården?</h3>
            <p>Kontrollera alltid isförhållanden lokalt. Innerskärgården fryser ibland, men isen varierar kraftigt. Gå aldrig ut på is utan att ha kontrollerat tjockleken — minst 10 cm för gång.</p>
          </>
        }
        cta={{ label: 'Planera vintertur', href: '/planera' }}
        related={[
          { label: 'Sommar i skärgården', href: '/sommar' },
          { label: 'Höst i skärgården', href: '/host' },
          { label: 'Bastu & bad', href: '/bastu-och-bad' },
          { label: 'Färjor & tider', href: '/farjor' },
        ]}
      />
    </>
  )
}

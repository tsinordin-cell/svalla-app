import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Cinderellabåten — Tidtabell, hållplatser & biljetter 2026',
  description: 'Cinderellabåten går från Strömkajen till Sandhamn via Vaxholm. Komplett tidtabell 2026, alla hållplatser, priser och tips för resan. Säsong maj–september.',
  keywords: [
    'cinderella båten',
    'cinderellabåten',
    'cinderella tidtabell',
    'cinderella tidtabell 2026',
    'cinderella skärgård',
    'cinderella sandhamn',
    'cinderella strömkajen',
    'cinderellabåten tidtabell',
    'cinderella waxholm',
    'cinderella djurgårdsbryggan',
    'båt till sandhamn',
    'waxholmsbolaget cinderella',
    'skärgårdsbåt stockholm',
    'båt sandhamn tidtabell',
  ],
  openGraph: {
    title: 'Cinderellabåten — Tidtabell, hållplatser & biljetter 2026 | Svalla',
    description: 'Komplett guide till Cinderellabåten: tidtabell 2026, alla hållplatser, priser och tips för resan till Sandhamn och Vaxholm.',
    url: 'https://svalla.se/cinderella-baaten',
  },
  alternates: { canonical: 'https://svalla.se/cinderella-baaten' },
}

export const revalidate = 600

const ITEMS: LandingItem[] = [
  {
    icon: '⚓',
    title: 'Strömkajen',
    description: 'Avgång kl 10:00. Centralt läge vid Gamla Stan — enkel att nå med tunnelbana (Gamla Stan) eller spårvagn. Biljetter köps i Waxholmsbolagets app eller ombord.',
    meta: 'Avgång 10:00',
    href: '#',
  },
  {
    icon: '🌊',
    title: 'Djurgårdsbryggan',
    description: 'Andrasytopp ca 10:20. Passar perfekt om du bor i Östermalm eller nära Djurgården. Gratis med SL-kort till Djurgårdslinjen dit.',
    meta: 'Ca 10:20',
    href: '#',
  },
  {
    icon: '🏰',
    title: 'Vaxholm',
    description: 'Mellanstopp ca 11:10. Historisk stad med Vaxholms fästning. Möjlighet att kliva av, besöka stan och ta nästa avgång.',
    meta: 'Ca 11:10',
    href: '/o/vaxholm',
  },
  {
    icon: '⛵',
    title: 'Sandhamn',
    description: 'Slutdestination ca 13:00. Skärgårdens mest kända seglarort. Sandhamns Värdshus, BSSC-marina och pittoreska trägränder. Hemfärja ca 15:30 eller 17:00.',
    meta: 'Ankomst ca 13:00',
    href: '/o/sandhamn',
  },
]

export default function CinderellaBaatenPage() {
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Vad kostar biljett med Cinderellabåten till Sandhamn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'En tur med Waxholmsbolagets linje (inkl. Cinderella) till Sandhamn kostar ca 120–150 kr per person enkel väg. Köp biljett i appen eller betala ombord. SL-månadskortet gäller inte på Cinderella — Waxholmsbolagets egna kort och pendlarkort gäller däremot.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hur lång tid tar Cinderellabåten till Sandhamn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Från Strömkajen tar det ca 3 timmar till Sandhamn med Cinderella (avgång ca 10:00, ankomst ca 13:00). Hållplatser längs vägen: Djurgårdsbryggan (~10:20) och Vaxholm (~11:10). Snabbaste alternativet är buss till Stavsnäs + snabbåt (ca 40 min från Stavsnäs).',
        },
      },
      {
        '@type': 'Question',
        name: 'Kör Cinderellabåten hela året?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cinderella är en säsongsbåt och kör primärt maj–september. Exakta datum varierar år från år. Under vintern trafikeras sträckan med andra Waxholmsbåtar men med färre avgångar. Kolla aktuell tidtabell på waxholmsbolaget.se.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan man ta med cykel på Cinderellabåten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Ja, cyklar tas med ombord mot en liten avgift — platserna är begränsade. Boka cykelbiljett i förväg i Waxholmsbolagets app för att säkra plats, särskilt under högsäsong (juli–augusti).',
        },
      },
    ],
  }

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
      { '@type': 'ListItem', position: 2, name: 'Färjor', item: 'https://svalla.se/farjor' },
      { '@type': 'ListItem', position: 3, name: 'Cinderellabåten', item: 'https://svalla.se/cinderella-baaten' },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <CategoryLanding
        heroGradient={['#0a2240', '#1a4a7a']}
        eyebrow="Cinderellabåten"
        title="Strömkajen → Sandhamn"
        tagline="Waxholmsbolagets flaggskepp — tidtabell 2026, hållplatser, priser och tips för resan."
        heroIcon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M2 20h20M5 20V9l7-6 7 6v11M9 20v-5h6v5" />
          </svg>
        }
        intro={
          <>
            <p>
              <strong>Cinderellabåten</strong> är Waxholmsbolagets stolthet och ett av Stockholms mest ikoniska transportmedel — en klassisk ångbåt (numera diesel) som går från Strömkajen i centrala Stockholm ut till Sandhamn i ytterskärgården. Resan tar ca 3 timmar och passerar Djurgårdsbryggan och Vaxholm längs vägen.
            </p>
            <p>
              Säsongen är <strong>maj–september</strong> med dagliga avgångar under högsäsong. Avgångstid från Strömkajen är vanligtvis kl 10:00, ankomst Sandhamn ca 13:00. Hemfärjan avgår ca 15:30 eller 17:00 beroende på tidtabell — kontrollera alltid aktuella tider på <a href="https://waxholmsbolaget.se" target="_blank" rel="noopener noreferrer">waxholmsbolaget.se</a> eftersom de kan variera.
            </p>
            <p>
              Cinderella trafikerar <strong>linje 89</strong> i Waxholmsbolagets nät. Biljetter köps i appen, på waxholmsbolaget.se eller ombord. Waxholmsbolagets pendlarkort gäller, men inte SL-månadskortet. Ta gärna med matsäck — det är en lång resa, och ombordservicen är begränsad.
            </p>
          </>
        }
        itemsTitle="Cinderellabåtens hållplatser"
        itemsDescription="Strömkajen → Djurgårdsbryggan → Vaxholm → Sandhamn — typisk tidtabell 2026"
        items={ITEMS}
        deeperContent={
          <>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
              Tidtabell och praktisk info
            </h2>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Typisk avgångstider 2026
            </h3>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--txt)', fontWeight: 700 }}>Hållplats</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--txt)', fontWeight: 700 }}>Avgång (ut)</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--txt)', fontWeight: 700 }}>Hemresa (retur)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Strömkajen', '10:00', '—'],
                    ['Djurgårdsbryggan', '~10:20', '~17:40'],
                    ['Vaxholm', '~11:10', '~17:00'],
                    ['Sandhamn', '~13:00', '15:30 / 17:00'],
                  ].map(([stop, dep, ret]) => (
                    <tr key={stop} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '10px 12px', color: 'var(--txt)', fontWeight: 600 }}>{stop}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--txt-secondary)' }}>{dep}</td>
                      <td style={{ padding: '10px 12px', color: 'var(--txt-secondary)' }}>{ret}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: 12, color: 'var(--txt-secondary)', marginTop: 8 }}>
              * Tider är ungefärliga och kan variera. Kontrollera alltid aktuell tidtabell på waxholmsbolaget.se.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 8px' }}>
              Priser 2026
            </h3>
            <p>
              Biljett Strömkajen–Sandhamn kostar ca <strong>120–150 kr</strong> enkel väg. Waxholmsbolagets 30-dagarskort (ca 730 kr/mån) ger obegränsat resande och betalar sig snabbt om du reser ofta. Barn under 7 år reser gratis, barn 7–19 år betalar halv taxa. Cykelbiljett tillkommer med ca 40 kr.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 8px' }}>
              Alternativa sätt att ta sig till Sandhamn
            </h3>
            <p>
              Vill du komma snabbare? <strong>Buss 428 + Sandhamnsleden</strong> från Slussen via Stavsnäs är det snabbaste alternativet — buss ca 45 min, sedan snabbåt ca 35–40 min. Totalt ca 1,5 timmar mot 3 timmar med Cinderella. Pendelbåt 89 (Waxholmsbåten) går också men är långsammare och har färre avgångar.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '28px 0 12px' }}>
              Vanliga frågor om Cinderellabåten
            </h2>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad kostar biljett till Sandhamn?
            </h3>
            <p>
              En enkel biljett Strömkajen–Sandhamn kostar ca 120–150 kr. Köp i Waxholmsbolagets app eller betala ombord. SL-kortet gäller <em>inte</em>, men Waxholmsbolagets pendlarkort och 30-dagarskort gäller fullt ut.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Hur lång tid tar resan?
            </h3>
            <p>
              Från Strömkajen till Sandhamn tar det ca <strong>3 timmar</strong> med Cinderella. Vill du ta det lugnt och njuta av skärgårdspassagen är Cinderella perfekt. Stressar du — välj buss till Stavsnäs + snabbåt (ca 1,5 timmar totalt).
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Kör Cinderella hela året?
            </h3>
            <p>
              Nej — Cinderella är en <strong>säsongsbåt maj–september</strong>. Under vintern trafikeras sträckan med reguljära Waxholmsbåtar med glesare tidtabell. Exakta sommardatum publiceras vanligtvis i mars/april på waxholmsbolaget.se.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Kan man ta med hund eller cykel?
            </h3>
            <p>
              Ja på båda. Hundar välkomnas ombord (koppel krävs). Cyklar tas med mot en avgift — boka i appen för att säkra plats, platser är begränsade. Under högsäsong (juli–aug) är det extra viktigt att boka cykelplats i förväg.
            </p>
          </>
        }
        cta={{ label: 'Planera din resa med Svalla', href: '/utflykt' }}
        related={[
          { label: 'Alla färjor & linjer', href: '/farjor' },
          { label: 'Sandhamn guide', href: '/o/sandhamn' },
          { label: 'Vaxholm guide', href: '/o/vaxholm' },
          { label: 'Dagsturer från Stockholm', href: '/dagsturer' },
          { label: 'Stockholms skärgård', href: '/stockholms-skargard' },
        ]}
      />
    </>
  )
}

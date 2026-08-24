import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Cinderellabåten — Tidtabell, hållplatser & biljetter 2026',
  description: 'Cinderellabåtarna går från Strandvägen i Stockholm till Sandhamn via Vaxholm, Grinda och Gällnö. Restider, hållplatser och säsong 2026 — enligt operatören Strömma.',
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
    title: 'Strandvägen',
    description: 'Avgångskaj i centrala Stockholm, nära Nybroplan och Östermalm. Biljetter köps hos Strömma, som driver linjen.',
    meta: 'Avgångskaj',
    href: '#',
  },
  {
    icon: '🏰',
    title: 'Vaxholm',
    description: 'Mellanstopp. Historisk stad med Vaxholms fästning. Möjlighet att kliva av, besöka stan och ta en senare avgång.',
    meta: 'Mellanstopp',
    href: '/o/vaxholm',
  },
  {
    icon: '⛵',
    title: 'Sandhamn',
    description: 'Slutdestination, 2 tim 30 min från Strandvägen enligt Strömma. Skärgårdens mest kända seglarort, med Sandhamns Värdshus och pittoreska trägränder.',
    meta: '2 tim 30 min',
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
          text: 'Cinderellabåtarna drivs av Strömma, inte av Waxholmsbolaget. Enligt Strömma kostar en resa till Sandhamn från 255 kr och till Grinda eller Gällnö från 235 kr. Biljetter köps hos Strömma. SL-kort och Waxholmsbolagets kort gäller inte.',
        },
      },
      {
        '@type': 'Question',
        name: 'Hur lång tid tar Cinderellabåten till Sandhamn?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Från Strandvägen tar det 2 timmar och 30 minuter till Sandhamn enligt Strömma. Hållplatser längs vägen är Vaxholm, Grinda och Gällnö. Ett snabbare alternativ är buss från Slussen till Stavsnäs vinterhamn och Waxholmsbolagets färja 16 därifrån.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kör Cinderellabåten hela året?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Strömma anger säsongen till slutet av april till slutet av september. Exakta datum varierar år från år — se Strömmas tidtabell. Utanför säsong nås Sandhamn via Stavsnäs med Waxholmsbolaget.',
        },
      },
      {
        '@type': 'Question',
        name: 'Kan man ta med cykel på Cinderellabåten?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Villkoren för cykel ombord anges av Strömma och kan variera mellan säsonger. Vi återger dem inte här utan hänvisar till operatörens egna villkor inför bokning.',
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
        title="Strandvägen → Sandhamn"
        tagline="Strömmas skärgårdslinje — hållplatser, restider och säsong 2026."
        heroIcon={
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M2 20h20M5 20V9l7-6 7 6v11M9 20v-5h6v5" />
          </svg>
        }
        intro={
          <>
            <p>
              <strong>Cinderellabåtarna</strong> drivs av <strong>Strömma</strong> — inte av Waxholmsbolaget, som många tror. De avgår från Strandvägen i centrala Stockholm och går ut till Sandhamn via Vaxholm, Grinda och Gällnö. Resan till Sandhamn tar 2 timmar och 30 minuter enligt operatören.
            </p>
            <p>
              Säsongen löper från <strong>slutet av april till slutet av september</strong>. Avgångstiderna varierar per datum, och vi publicerar dem inte här — en kopia skulle bli inaktuell utan att vi märkte det. Aktuella tider finns hos <a href="https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/" target="_blank" rel="noopener noreferrer">Strömma</a>.
            </p>
            <p>
              Biljetter köps hos Strömma. SL-kort och Waxholmsbolagets pendlarkort gäller inte, eftersom linjen inte ingår i den upphandlade skärgårdstrafiken. Ombord finns café och bar öppna under hela resan.
            </p>
          </>
        }
        itemsTitle="Cinderellabåtens hållplatser"
        itemsDescription="Strandvägen → Vaxholm → Grinda → Gällnö → Sandhamn"
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
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--txt)', fontWeight: 700 }}>Restid från Strandvägen</th>
                    <th style={{ textAlign: 'left', padding: '8px 12px', color: 'var(--txt)', fontWeight: 700 }}>Hemresa</th>
                  </tr>
                </thead>
                <tbody>
                  {/* KÄLLA: stromma.com/sv-se/stockholm/cinderellabatarna/ (hämtad 2026-08-05).
                      Restider, inte klockslag. Tidtabellen varierar per datum och vi kan inte
                      hålla en kopia sann — tidigare stod här "Strömkajen 10:00, Djurgårdsbryggan
                      ~10:20, Vaxholm ~11:10, Sandhamn ~13:00", vilket var påhittat rakt av. */}
                  {[
                    ['Strandvägen', 'Avgångskaj', '—'],
                    ['Vaxholm', 'Mellanstopp', 'Mellanstopp'],
                    ['Grinda', '1 tim 30 min', 'Mellanstopp'],
                    ['Gällnö', '1 tim 45 min', 'Mellanstopp'],
                    ['Sandhamn', '2 tim 30 min', 'Vändpunkt'],
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
              * Restider enligt Strömma. Avgångstiderna varierar per datum — se <a href="https://www.stromma.com/sv-se/stockholm/cinderellabatarna/tidtabeller/" target="_blank" rel="noopener noreferrer">Strömmas tidtabell</a>. Vi publicerar inga klockslag vi inte kan hålla aktuella.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 8px' }}>
              Priser 2026
            </h3>
            <p>
              Enligt Strömma kostar resan <strong>från 255 kr</strong> till Sandhamn och <strong>från 235 kr</strong> till Grinda eller Gällnö. Rabatter och barnpriser anges av operatören och varierar mellan säsonger — vi återger dem inte här.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 8px' }}>
              Alternativa sätt att ta sig till Sandhamn
            </h3>
            <p>
              Vill du komma snabbare går <strong>buss från Slussen till Stavsnäs vinterhamn</strong> och därifrån Waxholmsbolagets <strong>färja 16</strong> till Sandhamn. Uppmätt mot ResRobot 2026-08-05 tar hela resan från Stockholm ungefär 2 timmar 15 minuter med ett byte.
            </p>

            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '28px 0 12px' }}>
              Vanliga frågor om Cinderellabåten
            </h2>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Vad kostar biljett till Sandhamn?
            </h3>
            <p>
              Enligt Strömma kostar resan från 255 kr enkel väg. Biljetter köps hos Strömma. Varken SL-kort eller Waxholmsbolagets kort gäller ombord.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Hur lång tid tar resan?
            </h3>
            <p>
              Från Strandvägen till Sandhamn tar det <strong>2 timmar och 30 minuter</strong> enligt Strömma. Vill du njuta av skärgårdspassagen är Cinderella perfekt. Har du bråttom går det snabbare via Stavsnäs.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Kör Cinderella hela året?
            </h3>
            <p>
              Nej — säsongen är <strong>slutet av april till slutet av september</strong> enligt Strömma. Utanför säsong nås Sandhamn via Stavsnäs med Waxholmsbolaget.
            </p>

            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '20px 0 8px' }}>
              Kan man ta med hund eller cykel?
            </h3>
            <p>
              {/* KÄLLA: Strömmas FAQ (stromma.com) 2026-08-23: cykel i mån av plats, plats garanteras aldrig, avgift betalas vid ombordstigning, el- och lastcyklar tillåts inte; husdjur ej i restaurangdelen */}
 Ja, med begränsningar. Hundar får följa med men inte vistas i restaurang- och serveringsdelarna. Vanliga cyklar tas med i mån av plats mot en avgift som betalas vid ombordstigning — plats kan inte bokas eller garanteras, och el- och lastcyklar tillåts inte. Under högsäsong (juli–aug) är det klokt att ha en reservplan om cykelplatserna är fulla.
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

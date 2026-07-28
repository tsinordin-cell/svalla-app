import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: 'Hyr stuga i skärgården | Stugor och stugbyar nära havet',
  description: 'Hitta stugor och stugbyar i skärgården nära bad, bryggor, färjor och sommarkrogar.',
  keywords: ['hyra stuga skärgården', 'stugby skärgård', 'stuga nära havet', 'sommarstuga skärgård', 'stuga med brygga'],
  alternates: { canonical: 'https://svalla.se/boende/stugor-stugbyar' },
  openGraph: {
    title: 'Hyr stuga i skärgården | Svalla',
    description: 'Hitta stugor och stugbyar i skärgården nära bad, bryggor, färjor och sommarkrogar.',
    url: 'https://svalla.se/boende/stugor-stugbyar',
  },
}

const CHIPS = [
  'Familjevänligt', 'Nära bad', 'Egen stuga', 'Stugby',
  'Hundvänligt', 'Nära färja', 'Veckouthyrning',
]

const ITEMS: LandingItem[] = [
  {
    icon: '🏡',
    title: 'Populära öar för stugboende',
    description: 'Utö, Grinda, Möja och Sandhamn har välkänd stuguthyrning. Boka tidigt — de bästa stugorna går åt till mars för sommarsäsongen.',
    href: '/o/uto/boende',
  },
  {
    icon: '🌊',
    title: 'Stugor nära bad',
    description: 'Välj en stuga med direkt access till klippor eller sandstrand. Grinda, Nåttarö och Utö har badplatser inom gångavstånd från de flesta stugor.',
    href: '/o/grinda/boende',
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Stugor för barnfamiljer',
    description: 'Barnvänliga stugor finns på Grinda, Finnhamn och Möja — lugnt vatten, korta avstånd till bryggor och restauranger med enkla menyer.',
    href: '/o/finnhamn/boende',
  },
  {
    icon: '🗺',
    title: 'Planera en helg runt boendet',
    description: 'Låt boendet styra upplägget. Thorkel sätter ihop färjetider, aktiviteter och mat utifrån vilken ö du bor på.',
    href: '/thorkel',
  },
]

export default function StugorPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'Hyr stuga i skärgården',
      description: 'Hyr stuga i Stockholms skärgård — stugor, stugbyar och fritidshus på öar som Sandhamn, Utö och Möja.',
      url: 'https://svalla.se/boende/stugor-stugbyar',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
        { '@type': 'ListItem', position: 2, name: 'Boende', item: 'https://svalla.se/boende' },
        { '@type': 'ListItem', position: 3, name: 'Stugor och stugbyar', item: 'https://svalla.se/boende/stugor-stugbyar' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'LodgingBusiness',
      name: 'Hyr stuga i Stockholms skärgård',
      description: 'Stugor, stugbyar och fritidshus i Stockholms skärgård — på öar som Sandhamn, Utö och Möja.',
      url: 'https://svalla.se/boende/stugor-stugbyar',
      areaServed: {
        '@type': 'Place',
        name: 'Stockholms skärgård',
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Självhushåll', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Nära bad', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Nära brygga', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Husdjur tillåtna', value: true },
      ],
    },
  ]

  return (
    <>
      {jsonLd.map((schema, i) => <JsonLd key={i} data={schema} />)}
      <CategoryLanding
      heroGradient={['#1e5c82', '#2d7d8a']}
      eyebrow="BOENDE · STUGOR & STUGBYAR"
      title="Hyr stuga i skärgården"
      tagline="Från enkla sjöbodar till familjevänliga stugbyar nära bad, bryggor och sommarkrogar."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M2 20h20" />
          <path d="M4 20V10l8-6 8 6v10" />
          <path d="M9 20v-6h6v6" />
        </svg>
      }
      intro={
        <>
          <p>
            Att hyra stuga i skärgården passar dig som vill stanna lite längre, vakna nära vattnet och ha en egen plats att återvända till efter bad, båtturer och långa sommarkvällar. Här samlar vi stugor och stugbyar för familjer, par och kompisgäng som vill bo nära havet.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(30,92,130,0.08)', border: '1px solid rgba(30,92,130,0.18)',
                fontSize: 13, color: '#1e5c82', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Hitta rätt stuga"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Vad kostar en stuga i skärgården?
          </h2>
          <p>
            Priserna varierar stort beroende på ö, standard och säsong. Enkla sjöbodar utan eget bad kostar från 600–900 kr/natt, medan moderna stugor med bastu och brygga kan ligga på 2 000–5 000 kr/natt i högsäsong. Veckouthyrning är vanligast under juli — lördag till lördag — och är ofta billigare per natt än korttidsbokningar.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            När ska man boka?
          </h2>
          <p>
            De populäraste stugorna på Utö, Grinda, Möja och Sandhamn bokas ut redan i januari–februari för sommarsäsongen. Vill du ha ett specifikt alternativ för midsommar eller juli — boka så fort du vet dina datum. Juni och september är lättare, och priserna är ofta 20–40 % lägre.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Öar med bra stugutbud
          </h2>
          <p>
            <strong>Utö</strong> har ett av de mest varierade utbuden — allt från enkla rum till hela gårdar nära gruvstigarna. <strong>Grinda</strong> passar barnfamiljer med välvårdade stugor nära sandstranden. <strong>Möja</strong> är bra för den som vill ha ett autentiskt skärgårdsboende på en levande ö. <strong>Nåttarö</strong> och <strong>Arholma</strong> passar den som söker lugn och lite mer vildmark.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '40px 0 8px' }}>
            Sök och boka stuga direkt
          </h2>
          <p style={{ margin: '0 0 14px' }}>
            Hitta och boka stugor hos de stora plattformarna. Affiliate-samarbeten är på gång — klickar du nu går du direkt till sökningen.
          </p>
          {/* Airbnb: lägg till ?s_af=AFFILIATE_TOKEN | Stugknuten: kontakta dem för partnerkod */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.airbnb.com/s/Stockholms-sk%C3%A4rg%C3%A5rd/homes" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(30,92,130,0.06)', border: '1px solid rgba(30,92,130,0.18)', color: '#1e5c82', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Airbnb — Stockholms skärgård</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.stugknuten.se/hyra-stuga/stockholms-skargard/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(30,92,130,0.06)', border: '1px solid rgba(30,92,130,0.18)', color: '#1e5c82', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Stugknuten — Stockholms skärgård</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.booking.com/searchresults.sv.html?ss=Stockholms+sk%C3%A4rg%C3%A5rd" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(30,92,130,0.06)', border: '1px solid rgba(30,92,130,0.18)', color: '#1e5c82', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Booking.com — Stockholms skärgård</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
          </div>
        </>
      }
      cta={{
        label: 'Planera din vistelse med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Alla öar',
        secondaryHref: '/resmal',
      }}
      related={[
        { label: 'Hotell & vandrarhem', href: '/boende/hotell-vandrarhem' },
        { label: 'Camping & tält', href: '/boende/camping-talt' },
        { label: 'B&B', href: '/boende/bb' },
        { label: 'Allt boende', href: '/boende' },
        { label: 'Färjetider', href: '/farjor' },
      ]}
      />
    </>
  )
}

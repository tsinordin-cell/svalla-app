import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'
import JsonLd from '@/components/JsonLd'

export const metadata: Metadata = {
  title: { absolute: 'B&B och pensionat i skärgården | Personliga boenden | Svalla' },
  description: 'Hitta B&B, pensionat och små personliga boenden i skärgården för lugna helger och nära skärgårdsliv.',
  keywords: ['B&B skärgård', 'pensionat skärgård', 'bed and breakfast skärgård', 'bo personligt skärgård', 'pensionat havet'],
  alternates: { canonical: 'https://svalla.se/boende/bb' },
  openGraph: {
    title: 'B&B och pensionat i skärgården | Svalla',
    description: 'Hitta B&B, pensionat och små personliga boenden i skärgården för lugna helger och nära skärgårdsliv.',
    url: 'https://svalla.se/boende/bb',
  },
}

const CHIPS = [
  'B&B', 'Pensionat', 'Frukost', 'Personligt',
  'Lugnt läge', 'Nära hamn', 'Nära restaurang',
]

const ITEMS: LandingItem[] = [
  {
    icon: '☕',
    title: 'Charmiga boenden nära vattnet',
    description: 'Mindre B&B och pensionat längs kusterna och på öarna — ofta familjedrivna med en personlig prägel som saknar motstycke i de större hotellen.',
    href: '/resmal',
  },
  {
    icon: '🏡',
    title: 'B&B för par och weekend',
    description: 'En lugn helg med frukost serverad på verandan och havet utanför fönstret. Möja, Vaxholm och Ljusterö har välkända B&B-alternativ för parresor.',
    href: '/o/moja',
  },
  {
    icon: '🏛',
    title: 'Små pensionat i skärgården',
    description: 'Pensionat med halvpension eller frukost ingår — slipper planera alla måltider och kan lägga fokus på upplevelserna istället.',
    href: '/o/vaxholm/boende',
  },
  {
    icon: '🍽',
    title: 'Kombinera med restaurang och bad',
    description: 'Välj ett B&B nära en av skärgårdens krogar eller en bra badplats. Thorkel hjälper dig hitta kombinationen som passar.',
    href: '/thorkel',
  },
]

export default function BBPage() {
  const jsonLd = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: 'B&B och pensionat i skärgården',
      description: 'Familjedrivna B&B och pensionat i Stockholms skärgård — frukost ingår, nära havet och lokalbefolkningen.',
      url: 'https://svalla.se/boende/bb',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
        { '@type': 'ListItem', position: 2, name: 'Boende', item: 'https://svalla.se/boende' },
        { '@type': 'ListItem', position: 3, name: 'B&B och pensionat', item: 'https://svalla.se/boende/bb' },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BedAndBreakfast',
      name: 'B&B och pensionat i Stockholms skärgård',
      description: 'Familjedrivna B&B och pensionat i Stockholms skärgård — frukost ingår, nära havet och lokalbefolkningen.',
      url: 'https://svalla.se/boende/bb',
      areaServed: {
        '@type': 'Place',
        name: 'Stockholms skärgård',
      },
      amenityFeature: [
        { '@type': 'LocationFeatureSpecification', name: 'Frukost ingår', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Familjedrivet', value: true },
        { '@type': 'LocationFeatureSpecification', name: 'Nära havet', value: true },
      ],
    },
  ]

  return (
    <>
      {jsonLd.map((schema, i) => <JsonLd key={i} data={schema} />)}
      <CategoryLanding
      heroGradient={['#5c3a1e', '#8a5c2d']}
      eyebrow="BOENDE · B&B"
      title="B&B och pensionat i skärgården"
      tagline="Personliga boenden, små pensionat och frukost med havet runt hörnet."
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
            B&B och pensionat passar dig som vill bo personligt, småskaligt och nära platsen du besöker. Ofta är det just värdskapet, frukosten och känslan av att komma lite närmare skärgårdslivet som gör upplevelsen. Här hittar du charmiga boenden för lugna helger, parresor och korta avstickare.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 20 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(92,58,30,0.08)', border: '1px solid rgba(92,58,30,0.18)',
                fontSize: 13, color: '#5c3a1e', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Hitta rätt boende"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Vad skiljer B&B från hotell i skärgården?
          </h2>
          <p>
            Ett B&B i skärgården är oftast ett familjehus eller en ombyggd gård med 3–8 rum. Frukost ingår nästan alltid och serveras gemensamt — ibland på en veranda med havsutsikt. Det personliga mötet med värdparet är en del av upplevelsen, och de ger ofta de bästa lokaltipsen om bad, vandringar och restauranger.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Bästa tiderna för B&B-besök
          </h2>
          <p>
            B&B och pensionat i skärgården håller ofta öppet ett par veckor längre in på hösten jämfört med de stora värdshusena. Tidig september är en av de bästa tiderna — lugnet har lagt sig, priserna sjunker och många B&B tar emot gäster med ett par dagars varsel. Maj är också undervärderat — frisk luft, ingen folkträngsel och de flesta B&B är öppna.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Att tänka på när du bokar
          </h2>
          <p>
            Många B&B i skärgården tar inte kortbetalning — fråga i förväg. Avbokning är ofta strängare än på hotell; det är vanligt med full betalning vid bokning under högsäsong. Kolla alltid om frukost verkligen ingår och om det finns parkering eller om du måste ta sig ut med färja.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '40px 0 8px' }}>
            Sök B&amp;B och pensionat direkt
          </h2>
          <p style={{ margin: '0 0 14px' }}>
            Hitta personliga boenden med frukost i skärgården. Affiliate-samarbeten är på gång — klickar du nu går du direkt till sökningen.
          </p>
          {/* Booking.com: lägg till &aid=AFFILIATE_ID | Airbnb: lägg till ?s_af=AFFILIATE_TOKEN */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.booking.com/searchresults.sv.html?ss=Stockholms+sk%C3%A4rg%C3%A5rd&nflt=ht_id%3D21" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(92,58,30,0.06)', border: '1px solid rgba(92,58,30,0.18)', color: '#5c3a1e', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Booking.com — B&amp;B i skärgården</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.airbnb.com/s/Stockholms-sk%C3%A4rg%C3%A5rd/homes" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(92,58,30,0.06)', border: '1px solid rgba(92,58,30,0.18)', color: '#5c3a1e', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Airbnb — Stockholms skärgård</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
          </div>
        </>
      }
      cta={{
        label: 'Planera en lugn helg med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Alla resmål',
        secondaryHref: '/resmal',
      }}
      related={[
        { label: 'Stugor & stugbyar', href: '/boende/stugor-stugbyar' },
        { label: 'Hotell & vandrarhem', href: '/boende/hotell-vandrarhem' },
        { label: 'Camping & tält', href: '/boende/camping-talt' },
        { label: 'Allt boende', href: '/boende' },
        { label: 'Krogar & mat', href: '/krogar-och-mat' },
      ]}
      />
    </>
  )
}

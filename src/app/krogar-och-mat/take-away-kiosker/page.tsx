import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Take-away, kiosker och lanthandlar i skärgården',
  description: 'Glass, räksmörgåsar, hamburgare och lanthandlar i Stockholms skärgård. Enkelt och gott utan bokning — för barnfamiljen och snabbstoppen i hamnen.',
  keywords: [
    'glass skärgård',
    'kiosk skärgård',
    'räksmörgås stockholm',
    'lanthandel skärgård',
    'take away skärgård',
    'snabbmat skärgård',
    'hamburgare skärgård',
  ],
  openGraph: {
    title: 'Take-away, kiosker och lanthandlar i skärgården | Svalla',
    description: 'Glass, räksmörgåsar och lanthandlar — enkla stopp utan bokning längs skärgårdsrutten.',
    url: 'https://svalla.se/krogar-och-mat/take-away-kiosker',
  },
  alternates: { canonical: 'https://svalla.se/krogar-och-mat/take-away-kiosker' },
}

const CHIPS = [
  'Glass', 'Räksmörgås', 'Kiosk', 'Lanthandel', 'Ingen bokning',
  'Barnvänligt', 'Snabbt', 'Ta med',
]

const ITEMS: LandingItem[] = [
  {
    icon: '🍦',
    title: 'Glasskiosker i skärgården',
    description: 'De flesta populära öar har en glasskiosk eller ett ställe som säljer glass under sommarsäsongen. Fjäderholmarna, Sandhamn och Utö har alla glasset lättillgängligt nära gästhamnen.',
    href: '/o/sandhamn',
    meta: 'Flera öar · Säsong: jun–aug',
  },
  {
    icon: '🍤',
    title: 'Räksmörgåsar',
    description: 'Den klassiska svenska räksmörgåsen serveras på många hamnkaféer och kiosker. Sök framförallt i Vaxholm och Fjäderholmarna — där finns bäst utbud av hamnmat i alla prisnivåer.',
    href: '/o/vaxholm',
    meta: 'Vaxholm & Fjäderholmarna',
  },
  {
    icon: '🛒',
    title: 'Lanthandlar på öarna',
    description: 'Sandhamn, Utö, Möja och Grinda har öppna lanthandlar under sommaren. Sortiment: mjölk, bröd, lättöl, konserver, lök och i bästa fall färsk fisk. Pant fungerar men inte alltid lördagar.',
    href: '/o/uto',
    meta: 'Flera öar · Sommarsäsong',
  },
  {
    icon: '🍔',
    title: 'Hamburgare och enklare mat',
    description: 'På mer trafikerade öar som Sandhamn och Fjäderholmarna finns grillkiosker med hamburgare, korvgrill och enklare mat. Perfekt för barn eller ett snabbt mellanmål.',
    href: '/o/fjaderholmarna',
    meta: 'Fjäderholmarna · Säsong: maj–sep',
  },
]

export default function TakeAwayKioskerPage() {
  return (
    <CategoryLanding
      heroGradient={['#7a3c0a', '#b8641a']}
      eyebrow="KROGAR & MAT · TAKE-AWAY & KIOSKER"
      title="Take-away och kiosker"
      tagline="Glass vid bryggan, räksmörgåsar i hamnen och lanthandeln som räddar middagen — enkelt och gott utan bokning."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
          <line x1="3" x2="21" y1="6" y2="6" />
          <path d="M16 10a4 4 0 0 1-8 0" />
        </svg>
      }
      intro={
        <>
          <p>
            Inte varje stopp i skärgården behöver vara ett bokat middagsbord. Ibland räcker en glass i solen, en räksmörgås vid kajen eller ett snabbt inköp i lanthandeln. Den här sidan samlar det enkla — ställena utan meny och utan reservationskrav, men med maximal skärgårdsatmosfär.
          </p>
          <div style={{
            background: '#fff8e1', border: '1px solid #f59e0b',
            borderRadius: 10, padding: '12px 16px', marginTop: 16,
            fontSize: 13, color: '#92400e', lineHeight: 1.6,
          }}>
            <strong>Kom ihåg:</strong> Lanthandlar och kiosker i skärgården har begränsade öppettider och sortiment. Ta med extra proviant hemifrån om du planerar längre vistelser på öar utan butik.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(122,60,10,0.08)', border: '1px solid rgba(122,60,10,0.18)',
                fontSize: 13, color: '#7a3c0a', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Vad och var"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Lanthandeln — livbåten på ön
          </h2>
          <p>
            På öar med fast befolkning eller hög sommartraffik finns nästan alltid en lanthandel. Den säljer det nödvändigaste och öppnar ofta tidigt på morgonen — men stänger ibland mitt på dagen eller har lunchstängt. Kolla in öppettider på ö-sidorna innan du räknar med att handla.
          </p>
          <p>
            De flesta lanthandlar tar kort och Swish. Pant fungerar men hanteras ibland bara på vardagar. Ta med påse — plastpåsar är sällan tillgängliga.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Glass i skärgården
          </h2>
          <p>
            En glasskiosk med rätt utsikt är omöjlig att gå förbi. Fjäderholmarnas glasskiosk är kanske mest känd, men även Sandhamn och Utö har glass i anslutning till gästhamnar och stränder. Välj kulor före strut på blåsiga bryggor — det brukar det löna sig.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Räksmörgåsen — ett eget kapitel
          </h2>
          <p>
            Räksmörgåsen är lika mycket symbol som mat. Den äts helst sittande vid vattnet, med utsikt och utan brådska. Vaxholm är räksmörgåsens högborg i Stockholms skärgård — flera kaféer och kiosker längs hamnpromenaden serverar den under sommarsäsongen.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
            Planera proviant
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.ica.se/butiker/" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(122,60,10,0.06)', border: '1px solid rgba(122,60,10,0.18)', color: '#7a3c0a', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>ICA — hitta butiker längs skärgårdsrutten</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.waxholmsbolaget.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(122,60,10,0.06)', border: '1px solid rgba(122,60,10,0.18)', color: '#7a3c0a', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Waxholmsbolaget — färjetidtabeller för planering</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
          </div>
        </>
      }
      cta={{
        label: 'Planera din tur med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Alla krogar & mat',
        secondaryHref: '/krogar-och-mat',
      }}
      related={[
        { label: 'Värdshus & restauranger', href: '/krogar-och-mat/vardshus-restauranger' },
        { label: 'Fisk & skaldjur', href: '/krogar-och-mat/fisk-skaldjur' },
        { label: 'Fika & café', href: '/krogar-och-mat/fika-cafe' },
        { label: 'Boende', href: '/boende' },
        { label: 'Populära öar', href: '/o' },
      ]}
    />
  )
}

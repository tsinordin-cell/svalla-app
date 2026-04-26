import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Snabbaste vägen — rutter för motorbåt & RIB | Svalla',
  description: 'Snabbaste vägen till populära destinationer i Stockholms skärgård. För motorbåt, RIB och vattenskoter — med tankställen och farledstips.',
  keywords: [
    'snabbaste vägen sandhamn',
    'motorbåt skärgården',
    'rib tur stockholm',
    'båttur sandhamn',
    'farled stockholm',
  ],
  openGraph: {
    title: 'Snabbaste vägen — Svalla',
    description: 'Snabbaste rutter till skärgårdens populära destinationer.',
    url: 'https://svalla.se/snabbaste-vagen',
  },
  alternates: { canonical: 'https://svalla.se/snabbaste-vagen' },
}

const ITEMS: LandingItem[] = [
  {
    icon: '🏁',
    title: 'Stockholm → Sandhamn',
    description: 'Via Kanholmsfjärden — ca 45 min med RIB, 1,5 h med förträngare. Tankning i Stavsnäs.',
    href: '/tur/stockholm-sandhamn-snabb',
    meta: '~ 45 min',
  },
  {
    icon: '⚡',
    title: 'Stockholm → Grinda',
    description: 'Via Vaxholm och Tynningö — 30 min på rätt båt. Populär lunchutflykt.',
    href: '/tur/stockholm-grinda-snabb',
    meta: '~ 30 min',
  },
  {
    icon: '🌊',
    title: 'Stockholm → Utö',
    description: 'Söderut genom Jungfrufjärden — 50 min med RIB. Tankning i Dalarö.',
    href: '/tur/stockholm-uto-snabb',
    meta: '~ 50 min',
  },
  {
    icon: '🌅',
    title: 'Stockholm → Finnhamn',
    description: 'Nordöstra farleden via Möja — 55 min. Populär helgdestination.',
    href: '/tur/stockholm-finnhamn-snabb',
    meta: '~ 55 min',
  },
  {
    icon: '⛽',
    title: 'Tankställen på vägen',
    description: 'Alla sjöbensin-mackar längs populära rutter med öppettider och priser.',
    href: '/hamnar-och-bryggor',
  },
  {
    icon: '🚫',
    title: 'Hastighetsbegränsningar',
    description: 'Var du måste sakta ner — innanför gul boj, i hamnar, förbi badplatser.',
    href: '/tips?kategori=hastighet',
  },
]

export default function SnabbasteVagenPage() {
  return (
    <CategoryLanding
      heroGradient={['#c96e2a', '#d98246']}
      eyebrow="Snabbaste vägen"
      title="Kortaste rutten, utan strul"
      tagline="För motorbåt, RIB och vattenskoter. Snabbaste farlederna till skärgårdens populäraste destinationer — med tankställen och fartgränser."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      }
      intro={
        <>
          <p>
            Inte alla skärgårdsturer handlar om att njuta av seglingen — ibland vill du bara <strong>hinna till lunchen på Sandhamn</strong> och hem före barnens läggdags. Snabbaste vägen är för dig med motorbåt, RIB eller vattenskoter.
          </p>
          <p>
            Rutterna är optimerade för tid — men också för säkerhet: genom <strong>skyddade farleder</strong>, förbi <strong>fartbegränsade zoner</strong>, med <strong>tankställen</strong> markerade. Inget värre än att råka gå ur diesel utanför Sandhamn på söndag kväll.
          </p>
        </>
      }
      itemsTitle="Populära destinationer"
      itemsDescription="Alla tider är vid lugnt väder och 25 knop."
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Lagar & regler
          </h2>
          <p>
            Hastighetsgränser gäller: <strong>7 knop innanför gul boj</strong>, <strong>12 knop i många farleder</strong>, fullt fritt utanför. Vattenskoter är reglerat i Stockholms kommun med specifika tillåtna områden — se <a href="https://www.transportstyrelsen.se" style={{ color: 'var(--sea)' }} target="_blank" rel="noopener noreferrer">Transportstyrelsen</a>.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Säkerhet vid höga hastigheter
          </h2>
          <p>
            Bär flytväst alltid, använd döds-mans-grepp, håll uppsikt på korsande trafik. Olyckor i skärgården sker oftast där motorbåtar möter badgäster eller paddlare i grunda vikar — tänk på att du syns men de kanske inte hör dig.
          </p>
        </>
      }
      related={[
        { label: 'Populära turer', href: '/populara-turer' },
        { label: 'Segelrutter', href: '/segelrutter' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Planera min tur', href: '/planera-tur' },
      ]}
    />
  )
}

import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Fisk och skaldjur i skärgården',
  description: 'Fiskrökerier, räkförsäljning och skaldjursrestauranger i Stockholms skärgård. Rökt strömming, färska räkor och havskräftor — direkt från havet.',
  keywords: [
    'fisk skärgård',
    'räkor skärgård',
    'fiskrökeri stockholm',
    'rökt strömming skärgård',
    'skaldjur skärgård',
    'fjäderholmarna rökeri',
    'vaxholm räkor',
  ],
  openGraph: {
    title: 'Fisk och skaldjur i skärgården | Svalla',
    description: 'Rökt strömming, färska räkor och havskräftor — direkt från havet i Stockholms skärgård.',
    url: 'https://svalla.se/krogar-och-mat/fisk-skaldjur',
  },
  alternates: { canonical: 'https://svalla.se/krogar-och-mat/fisk-skaldjur' },
}

const CHIPS = [
  'Rökeri', 'Räkor', 'Strömming', 'Havskräftor', 'Säsong',
  'Lokal fångst', 'Ta med', 'Direkt från båt',
]

const ITEMS: LandingItem[] = [
  {
    icon: '🔥',
    title: 'Rökeriet på Fjäderholmarna',
    description: 'Ett av Stockholms mest välkända rökade strömmingsrösteri, med utsikt mot Baggensfjärden. Rökt strömming på träpinne är klassikern — och doften når ut på vattnet i god tid.',
    href: '/o/fjaderholmarna',
    meta: 'Fjäderholmarna · Säsong: maj–sep',
  },
  {
    icon: '🦐',
    title: 'Räkor i Vaxholm',
    description: 'Vaxholms hamn har en tradition av räkförsäljning direkt från fiskebryggan under sommarmånaderna. Köp färska räkor och ät på kajen med utsikt över Vaxholms fästning.',
    href: '/o/vaxholm',
    meta: 'Vaxholm · Sommarsäsong',
  },
  {
    icon: '🦞',
    title: 'Kräftfiske och kräftskivor',
    description: 'Kräftsäsongen i Stockholms skärgård börjar i slutet av juli och pågår in i september. Kräftskivor arrangeras på flera öar — fråga den lokala gästhamnen om bokningsbara paket.',
    href: '/o/sandhamn',
    meta: 'Säsong: jul–sep',
  },
  {
    icon: '🐟',
    title: 'Torsk och abborre',
    description: 'Skärgårdens abborre och gös hamnar på menyn i de flesta värdshus under högsäsong. Torsk förekommer men är mer ovanlig — fråga alltid om dagens fångst för bästa resultat.',
    href: '/krogar-och-mat/vardshus-restauranger',
    meta: 'Säsong: sommaren',
  },
]

export default function FiskSkaldjurPage() {
  return (
    <CategoryLanding
      heroGradient={['#a03520', '#c95a2a']}
      eyebrow="KROGAR & MAT · FISK & SKALDJUR"
      title="Fisk och skaldjur"
      tagline="Rökt strömming på träpinne, räkor från bryggan och havskräftor vid solnedgången — det bästa ur skärgårdens hav."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-.94 3.46-3.44 6-7 6s-7.56-2.54-8.5-6Z" />
          <path d="M18 12v.5" />
          <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
          <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 3.5-.8 8.5 2.27 11.5 1.23-1.25 2-3.5 2-6.33Z" />
          <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
          <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
        </svg>
      }
      intro={
        <>
          <p>
            Skärgårdens råvaror är bland de bästa du kan hitta i Sverige. Strömming, abborre, gös och räkor fångas lokalt och serveras samma dag — på ett rökeri, i en värdshuskök eller direkt från en fiskares brygga. Rökt strömming på träpinne är kanske den mest ikoniska skärgårdsupplevelsen av alla.
          </p>
          <div style={{
            background: '#fff8e1', border: '1px solid #f59e0b',
            borderRadius: 10, padding: '12px 16px', marginTop: 16,
            fontSize: 13, color: '#92400e', lineHeight: 1.6,
          }}>
            <strong>Fråga alltid om dagsfångst.</strong> Fisktillgång varierar med väder, kvoter och säsong. Det som finns på menyn idag är inte garanterat imorgon — och det som inte finns på menyn kan ofta ordnas om du frågar.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(160,53,32,0.08)', border: '1px solid rgba(160,53,32,0.18)',
                fontSize: 13, color: '#a03520', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Hitta fisk och skaldjur"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Rökt strömming — en tradition
          </h2>
          <p>
            Strömmingsrökning har en lång historia i skärgården och är en av de smaker som verkligen definierar platsen. Det bästa sättet att äta det är enkelt: stå vid bryggan, bryt loss fisken från träpinnen och ät den med fingrarna. Inget bestick behövs.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Räkköp direkt från fiskare
          </h2>
          <p>
            I hamnar som Vaxholm och Dalarö kan du ibland köpa räkor direkt från fiskebåten när den lägger till. Det är inte organiserat — du behöver helt enkelt vara på plats och ha koll. Fråga i hamnkontoret om det brukar finnas räkförsäljning, och vilket klockslag båtarna brukar komma in.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Kräftskivor i skärgården
          </h2>
          <p>
            Kräftsäsongen börjar officiellt i slutet av juli. Flera gästhamnar och värdshus arrangerar kräftskivor med fastpris — kräftor, bröd, ost och snaps ingår. Bokas i god tid då de är populära. Grinda, Sandhamn och Utö brukar ha egna arrangemang.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
            Fiskrelaterade ställen
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.fjaderholmarna.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(160,53,32,0.06)', border: '1px solid rgba(160,53,32,0.18)', color: '#a03520', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Fjäderholmarna — rökeri & restauranger</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.waxholmsbolaget.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(160,53,32,0.06)', border: '1px solid rgba(160,53,32,0.18)', color: '#a03520', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Waxholmsbolaget — tidtabeller för fiskrika destinationer</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
          </div>
        </>
      }
      cta={{
        label: 'Hitta rätt ö med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Alla krogar & mat',
        secondaryHref: '/krogar-och-mat',
      }}
      related={[
        { label: 'Värdshus & restauranger', href: '/krogar-och-mat/vardshus-restauranger' },
        { label: 'Fika & café', href: '/krogar-och-mat/fika-cafe' },
        { label: 'Take-away & kiosker', href: '/krogar-och-mat/take-away-kiosker' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
        { label: 'Populära öar', href: '/o' },
      ]}
    />
  )
}

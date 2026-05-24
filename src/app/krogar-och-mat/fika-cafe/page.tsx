import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: 'Fika och caféer i skärgården | Svalla',
  description: 'Bagerier, caféer och fikaställen i Stockholms skärgård. Sandhamns Bageriet, Möja Bageri och mer — kanelbullar och kaffe med havsutsikt.',
  keywords: [
    'café skärgård',
    'bageri skärgården',
    'sandhamns bageri',
    'möja bageri',
    'fika skärgård',
    'fjäderholmarna café',
    'kaffe skärgård',
  ],
  openGraph: {
    title: 'Fika och caféer i skärgården | Svalla',
    description: 'Kanelbullar, kaffe och havsutsikt — de bästa fikaställena i Stockholms skärgård.',
    url: 'https://svalla.se/krogar-och-mat/fika-cafe',
  },
  alternates: { canonical: 'https://svalla.se/krogar-och-mat/fika-cafe' },
}

const CHIPS = [
  'Café', 'Bageri', 'Kanelbulle', 'Morgonöppet', 'Kaffe',
  'Havsutsikt', 'Ta med ut', 'Barnvänligt',
]

const ITEMS: LandingItem[] = [
  {
    icon: '🥐',
    title: 'Sandhamns Bageriet',
    description: 'Bageri mitt i Sandhamns by som bakar färskt varje morgon. Deras kanelbullar och surdegsbröd är välkända i hela yttre skärgården. Kön bildas tidigt på sommarmorgnar.',
    href: '/o/sandhamn',
    meta: 'Sandhamn · Säsong: maj–sep',
  },
  {
    icon: '☕',
    title: 'Möja Bageri',
    description: 'Litet hantverksbageri på Möja med lokal förankring. Öppet i begränsad utsträckning — check sociala medier för aktuella tider. Värt varje paddeltag.',
    href: '/o/moja',
    meta: 'Möja · Varierade tider',
  },
  {
    icon: '🏝',
    title: 'Fjäderholmarna',
    description: 'Närmast Stockholm med café-alternativ i hantverksbyns miljö. Perfekt för en halvdagsutflykt med fika som mål — 25 minuter från Slussen.',
    href: '/o/fjaderholmarna',
    meta: 'Fjäderholmarna · Säsong: maj–sep',
  },
  {
    icon: '⚓',
    title: 'Kaféer i Vaxholm',
    description: 'Vaxholms stadskärna har flera år-runt-öppna kaféer längs strandpromenaden — ett sällsynt inslag i skärgården. Bra för en tidig säsong eller höstutflykt.',
    href: '/o/vaxholm',
    meta: 'Vaxholm · Öppet hela året',
  },
]

export default function FikaCafePage() {
  return (
    <CategoryLanding
      heroGradient={['#7a4219', '#b86a32']}
      eyebrow="KROGAR & MAT · FIKA & CAFÉ"
      title="Fika och caféer i skärgården"
      tagline="Kanelbullar bakade i gryningen, skärgårdskaffe med utsikt och bagerier som öppnar innan båten lägger loss."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
          <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
          <line x1="6" x2="6" y1="2" y2="4" />
          <line x1="10" x2="10" y1="2" y2="4" />
          <line x1="14" x2="14" y1="2" y2="4" />
        </svg>
      }
      intro={
        <>
          <p>
            En bra fikapaus hör till skärgårdsupplevelsen. Oavsett om du är på väg ut med båten och tar med en bulle, eller sitter kvar på bryggan en timme extra — de riktigt bra fikaställena i skärgården bakar på plats och öppnar tidigt. Utbudet är mer begränsat än på fastlandet, men kvaliteten på de ställen som finns håller ofta hög klass.
          </p>
          <div style={{
            background: '#fff8e1', border: '1px solid #f59e0b',
            borderRadius: 10, padding: '12px 16px', marginTop: 16,
            fontSize: 13, color: '#92400e', lineHeight: 1.6,
          }}>
            <strong>Tips:</strong> Många bagerier i skärgården säljer slut på populära bakverk redan på förmiddagen på helger i juli. Kom dit tidigt — eller beställ dagen innan om det erbjuds.
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(122,66,25,0.08)', border: '1px solid rgba(122,66,25,0.18)',
                fontSize: 13, color: '#7a4219', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Bagerier och caféer"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Den klassiska skärgårdsfrukost
          </h2>
          <p>
            Många båtfolk har ett fast ritual: hämta nybakat bröd och kaffe på morgonen innan motorn startar. På öar som Sandhamn finns detta inom gångavstånd från gästhamnen. På mer avlägsna öar är den lokala lanthandeln ofta enda alternativet — och kvaliteten på brödet varierar kraftigt.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Fika och barn i skärgården
          </h2>
          <p>
            Skärgårdskaféerna är generellt barnvänliga — det finns sällan trängsel och ofta uteservering med tillräckligt med utrymme. Glass finns på de flesta ställen med öppet kök eller kiosk, och de flesta caféer tar Swish eller kort.
          </p>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '24px 0 12px' }}>
            Ta med på utflykten
          </h2>
          <p>
            Många besökare köper med sig bröd och fika för dagen — perfekt om du ska ankra i en naturhamn utan restaurang. Packa ner i väskan på morgonen och ha med ut i kajaken eller på vandringen. Skärgårdsbröd håller sig förvånansvärt bra under en hel dag.
          </p>
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
        { label: 'Take-away & kiosker', href: '/krogar-och-mat/take-away-kiosker' },
        { label: 'Boende', href: '/boende' },
        { label: 'Populära öar', href: '/o' },
      ]}
    />
  )
}

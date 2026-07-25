import type { Metadata } from 'next'
import CategoryLanding, { type LandingItem } from '@/components/CategoryLanding'

export const metadata: Metadata = {
  title: { absolute: 'Värdshus och restauranger i skärgården | Svalla' },
  description: 'Klassiska skärgårdsvärdshus och sommarrestauranger — Sandhamns Värdshus, Utö Värdshus, Grinda Wärdshus och Fjäderholmarnas Krog. Öppettider och bokningslänkar.',
  keywords: [
    'värdshus skärgård',
    'skärgårdsrestaurang stockholm',
    'sandhamns värdshus',
    'utö värdshus',
    'grinda wärdshus',
    'fjäderholmarnas krog',
    'skärgårdskrog boka',
  ],
  openGraph: {
    title: 'Värdshus och restauranger i skärgården | Svalla',
    description: 'Klassiska skärgårdsvärdshus med sjöutsikt, sommarstämning och svensk husmanskost.',
    url: 'https://svalla.se/krogar-och-mat/vardshus-restauranger',
  },
  alternates: { canonical: 'https://svalla.se/krogar-och-mat/vardshus-restauranger' },
}

const CHIPS = [
  'Husmanskost', 'Sjöutsikt', 'Boka bord', 'Säsong maj–sep',
  'Brygga för båt', 'À la carte', 'Klassiker',
]

const ITEMS: LandingItem[] = [
  {
    icon: '⚓',
    title: 'Sandhamns Värdshus',
    description: 'Ett av skärgårdens mest välkända ställen, mitt i Sandhamns by. Brygga för gästande båtar finns alldeles intill. Bokas tidigt under midsommar och Gotlandsrunt.',
    href: '/o/sandhamn',
    meta: 'Sandhamn · Säsong: maj–sep',
  },
  {
    icon: '🌿',
    title: 'Grinda Wärdshus',
    description: 'Charmigt värdshus på en bilfri ö med fantastisk sjöutsikt. Serverar husmanskost med lokala råvaror. Mycket populärt — boka bord och brygga i förväg.',
    href: '/o/grinda',
    meta: 'Grinda · Säsong: maj–sep',
  },
  {
    icon: '🚴',
    title: 'Utö Värdshus',
    description: 'Utöns hjärta i mysiga Gruvbyn. Hållbar husmanskost med lokalt fångad fisk. Öppet längre säsong än de flesta — ibland in i oktober.',
    href: '/o/uto',
    meta: 'Utö · Säsong: maj–okt',
  },
  {
    icon: '🍽',
    title: 'Fjäderholmarnas Krog',
    description: 'Skärgårdens närmaste krog från Stockholm — 25 minuter med Waxholmsbåten. Klassisk meny med räkor, sill och säsongsrätter. Perfekt för en dag- eller kvällsutflykt.',
    href: '/o/fjaderholmarna',
    meta: 'Fjäderholmarna · Säsong: maj–sep',
  },
]

export default function VardshusRestaurangerPage() {
  return (
    <CategoryLanding
      heroGradient={['#8b2e12', '#c96e2a']}
      eyebrow="KROGAR & MAT · VÄRDSHUS"
      title="Värdshus och restauranger"
      tagline="Klassiska skärgårdsvärdshus med sjöutsikt, husmanskost och sommarstämning — från Fjäderholmarna till Sandhamn."
      heroIcon={
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 2v7a3 3 0 0 0 6 0V2" />
          <path d="M6 2v20" />
          <path d="M18 2c-2 0-3 1-3 3v6a2 2 0 0 0 2 2h1v9" />
        </svg>
      }
      intro={
        <>
          <p>
            Skärgårdsvärdshuset är en institution — ett ställe där seglar- och båtfolk landar för varm mat, ett glas och sällskap. De klassiska husen har funnits i decennier och håller en standard som kombinerar husmanskost med lokala råvaror, ofta direkt från havet. De flesta håller öppet <strong>maj–september</strong>.
          </p>
          <p>
            Vill du äta ute på en lördag i juli? <strong>Boka bord minst en vecka i förväg.</strong> Många krogar tar bokningar via sin hemsida eller Bokadirekt.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 16 }}>
            {CHIPS.map(chip => (
              <span key={chip} style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '5px 12px', borderRadius: 999,
                background: 'rgba(139,46,18,0.08)', border: '1px solid rgba(139,46,18,0.18)',
                fontSize: 13, color: '#8b2e12', fontWeight: 500,
              }}>
                {chip}
              </span>
            ))}
          </div>
        </>
      }
      itemsTitle="Klassiker att besöka"
      items={ITEMS}
      deeperContent={
        <>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '0 0 12px' }}>
            Tips inför besöket
          </h2>
          <p>
            <strong>Ring och bekräfta.</strong> Skärgårdskrogar har ofta begränsad personal. Oförutsedda stängningar händer — ring samma dag för att bekräfta att köket är öppet, särskilt i maj och september.
          </p>
          <p>
            <strong>Planera bryggan.</strong> Populära ställen som Grinda Wärdshus och Sandhamns Värdshus har full brygga från lunch på helgdagar i juli. Ankra i en naturhamn inom gångavstånd om det behövs.
          </p>
          <p>
            <strong>Fråga om dagsfångst.</strong> Fersk fisk och räkor levereras ofta på morgonen. Fråga personalen vad som kom in samma dag — det är ofta det bästa på menyn.
          </p>

          <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', margin: '32px 0 12px' }}>
            Boka bord direkt
          </h2>
          <p style={{ marginBottom: 14, fontSize: 14, color: 'var(--txt2)' }}>
            Direktlänkar till respektive värdshus hemsida och bokningssystem:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href="https://www.sandhamns-vardshus.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(139,46,18,0.06)', border: '1px solid rgba(139,46,18,0.18)', color: '#8b2e12', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Sandhamns Värdshus — hemsida & bokning</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.grinda.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(139,46,18,0.06)', border: '1px solid rgba(139,46,18,0.18)', color: '#8b2e12', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Grinda Wärdshus — hemsida & bokning</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.utowardshus.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(139,46,18,0.06)', border: '1px solid rgba(139,46,18,0.18)', color: '#8b2e12', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Utö Värdshus — hemsida & bokning</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
            <a href="https://www.fjaderholmarnaskrog.se" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 16px', borderRadius: 10, background: 'rgba(139,46,18,0.06)', border: '1px solid rgba(139,46,18,0.18)', color: '#8b2e12', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
              <span>Fjäderholmarnas Krog — hemsida & bokning</span><span style={{ opacity: 0.55 }}>↗</span>
            </a>
          </div>
        </>
      }
      cta={{
        label: 'Planera din skärgårdstur med Thorkel',
        href: '/thorkel',
        secondaryLabel: 'Alla krogar & mat',
        secondaryHref: '/krogar-och-mat',
      }}
      related={[
        { label: 'Fisk & skaldjur', href: '/krogar-och-mat/fisk-skaldjur' },
        { label: 'Fika & café', href: '/krogar-och-mat/fika-cafe' },
        { label: 'Take-away & kiosker', href: '/krogar-och-mat/take-away-kiosker' },
        { label: 'Boende', href: '/boende' },
        { label: 'Hamnar & bryggor', href: '/hamnar-och-bryggor' },
      ]}
    />
  )
}

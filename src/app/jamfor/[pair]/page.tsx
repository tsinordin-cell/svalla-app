import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getIsland, type Island } from '@/app/o/island-data'
import SvallaLogo from '@/components/SvallaLogo'

type Props = { params: Promise<{ pair: string }> }

// Pre-renderade jämförelser
const PAIRS: Array<[string, string]> = [
  ['sandhamn', 'grinda'],
  ['sandhamn', 'moja'],
  ['grinda', 'finnhamn'],
  ['uto', 'sandhamn'],
  ['moja', 'svartso'],
  ['finnhamn', 'rodloga'],
  ['arholma', 'rodloga'],
  ['vaxholm', 'fjaderholmarna'],
  ['uto', 'orno'],
  ['namdo', 'runmaro'],
]

export async function generateStaticParams() {
  return PAIRS.map(([a, b]) => ({ pair: `${a}-vs-${b}` }))
}

function parsePair(pair: string): [string, string] | null {
  const m = pair.match(/^([a-z0-9-]+)-vs-([a-z0-9-]+)$/)
  if (!m) return null
  return [m[1]!, m[2]!]
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { pair } = await params
  const parsed = parsePair(pair)
  if (!parsed) return {}
  const a = getIsland(parsed[0])
  const b = getIsland(parsed[1])
  if (!a || !b) return {}
  return {
    title: `${a.name} eller ${b.name}? Jämför öarna | Svalla`,
    description: `Sandhamn eller Grinda? Vi jämför ${a.name} och ${b.name} sida vid sida — restider, restauranger, bästa-för, fakta. Hjälper dig välja rätt skärgårdsdestination.`.replace('Sandhamn eller Grinda? ', ''),
    keywords: [`${a.name.toLowerCase()} eller ${b.name.toLowerCase()}`, `${a.name.toLowerCase()} vs ${b.name.toLowerCase()}`, 'jämför skärgårdsöar'],
    openGraph: {
      title: `${a.name} vs ${b.name} — vilken passar dig?`,
      description: `Jämför ${a.name} och ${b.name} sida vid sida.`,
      url: `https://svalla.se/jamfor/${pair}`,
    },
    alternates: { canonical: `https://svalla.se/jamfor/${pair}` },
  }
}

function IslandCol({ island, color }: { island: Island; color: string }) {
  return (
    <div style={{
      flex: 1, minWidth: 260,
      background: 'var(--white)', padding: '24px 22px', borderRadius: 16,
      border: '1px solid var(--surface-3)',
      borderTop: `4px solid ${color}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <span style={{ fontSize: 36 }}>{island.emoji}</span>
        <div>
          <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1 }}>
            {island.regionLabel}
          </div>
          <h2 style={{
            fontSize: 26, fontWeight: 700, margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            {island.name}
          </h2>
        </div>
      </div>

      <p style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--txt2)', fontStyle: 'italic', marginBottom: 16 }}>
        {island.tagline}
      </p>

      <Row label="Restid" value={island.facts.travel_time} />
      <Row label="Karaktär" value={island.facts.character} />
      <Row label="Säsong" value={island.facts.season} />
      <Row label="Bäst för" value={island.facts.best_for} />

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
          Hamnar
        </div>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
          {island.harbors.slice(0, 3).map(h => (
            <li key={h.name}>{h.name}{h.spots ? ` (${h.spots} platser)` : ''}</li>
          ))}
        </ul>
      </div>

      <div style={{ marginTop: 14 }}>
        <div style={{ fontSize: 11, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 6 }}>
          Mat
        </div>
        <ul style={{ margin: 0, paddingLeft: 16, fontSize: 13, lineHeight: 1.6 }}>
          {island.restaurants.slice(0, 3).map(r => (
            <li key={r.name}>{r.name} <span style={{ color: 'var(--txt2)' }}>· {r.type}</span></li>
          ))}
        </ul>
      </div>

      <Link href={`/o/${island.slug}`} style={{
        display: 'block', marginTop: 18, padding: '12px 16px',
        background: color, color: '#fff', textAlign: 'center',
        textDecoration: 'none', borderRadius: 999,
        fontSize: 14, fontWeight: 700,
      }}>
        Läs hela guiden om {island.name} →
      </Link>
    </div>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', gap: 8, padding: '8px 0', borderBottom: '1px solid var(--surface-3)', fontSize: 13 }}>
      <span style={{ flex: '0 0 80px', color: 'var(--txt2)', fontWeight: 600 }}>{label}</span>
      <span style={{ flex: 1, color: 'var(--txt)' }}>{value}</span>
    </div>
  )
}

export default async function ComparisonPage({ params }: Props) {
  const { pair } = await params
  const parsed = parsePair(pair)
  if (!parsed) notFound()
  const islandA = getIsland(parsed[0])
  const islandB = getIsland(parsed[1])
  if (!islandA || !islandB) notFound()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Hem', item: 'https://svalla.se' },
              { '@type': 'ListItem', position: 2, name: 'Jämför', item: 'https://svalla.se/jamfor' },
              { '@type': 'ListItem', position: 3, name: `${islandA.name} vs ${islandB.name}`, item: `https://svalla.se/jamfor/${pair}` },
            ],
          }),
        }}
      />

      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <Link href="/jamfor" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, textDecoration: 'none' }}>
            ← Alla jämförelser
          </Link>
        </div>
      </nav>

      <header style={{
        background: 'linear-gradient(170deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '40px 24px 56px', color: '#fff',
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, opacity: 0.8, letterSpacing: 1.4, textTransform: 'uppercase', marginBottom: 10 }}>
            Jämförelse
          </div>
          <h1 style={{
            fontSize: 38, fontWeight: 700, lineHeight: 1.15, margin: 0,
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            {islandA.name} eller {islandB.name}?
          </h1>
          <p style={{ fontSize: 16, opacity: 0.85, marginTop: 12, maxWidth: 540, marginLeft: 'auto', marginRight: 'auto' }}>
            Två öar, två upplevelser. Här är vad som skiljer dem — så du kan välja rätt.
          </p>
        </div>
      </header>

      <main style={{
        maxWidth: 1000, margin: '-32px auto 0', padding: '0 16px 60px',
      }}>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
          <IslandCol island={islandA} color="#1e5c82" />
          <IslandCol island={islandB} color="#c96e2a" />
        </div>

        {/* Verdict */}
        <section style={{
          marginTop: 32, padding: '24px 26px',
          background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Vilken ska jag välja?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, fontSize: 14, lineHeight: 1.6 }}>
            <div>
              <div style={{ fontWeight: 700, color: '#1e5c82', marginBottom: 4 }}>Välj {islandA.name} om…</div>
              <div style={{ color: 'var(--txt2)' }}>
                Du vill {islandA.facts.best_for.toLowerCase()}. {islandA.tagline}
              </div>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: '#c96e2a', marginBottom: 4 }}>Välj {islandB.name} om…</div>
              <div style={{ color: 'var(--txt2)' }}>
                Du vill {islandB.facts.best_for.toLowerCase()}. {islandB.tagline}
              </div>
            </div>
          </div>
        </section>

        {/* Andra jämförelser */}
        <section style={{ marginTop: 32 }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 12, fontFamily: "'Playfair Display', Georgia, serif" }}>
            Fler jämförelser
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 10 }}>
            {PAIRS.filter(([a, b]) => `${a}-vs-${b}` !== pair).slice(0, 6).map(([a, b]) => {
              const ia = getIsland(a), ib = getIsland(b)
              if (!ia || !ib) return null
              return (
                <Link key={`${a}-${b}`} href={`/jamfor/${a}-vs-${b}`} style={{
                  padding: '12px 14px', background: 'var(--white)', borderRadius: 10,
                  border: '1px solid var(--surface-3)',
                  textDecoration: 'none', fontSize: 14, fontWeight: 600,
                  color: 'var(--txt)',
                }}>
                  {ia.name} vs {ib.name} →
                </Link>
              )
            })}
          </div>
        </section>
      </main>
    </div>
  )
}

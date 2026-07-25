import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ALL_ISLANDS, getIsland } from '../../island-data'
import IslandSubPageHeader from '@/components/IslandSubPageHeader'

type Props = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ALL_ISLANDS.map(island => ({ slug: island.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) return {}
  return {
    title: `${island.name} med barn — barnvänlig guide 2026 | Svalla`,
    description: `Är ${island.name} bra för barnfamiljer? Stränder, lugnt vatten, restauranger och tips för familjer med barn. Komplett guide.`,
    keywords: [
      `${island.name.toLowerCase()} med barn`,
      `${island.name.toLowerCase()} barnfamilj`,
      `${island.name.toLowerCase()} barn`,
      `barnvänlig ${island.name.toLowerCase()}`,
      `familj ${island.name.toLowerCase()}`,
      `dagstur med barn ${island.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `${island.name} med barn — barnvänlig guide`,
      description: `Allt du behöver veta för att besöka ${island.name} med barnfamilj. Transport, bad, mat och tips.`,
      url: `https://svalla.se/o/${slug}/med-barn`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/med-barn` },
  }
}

export default async function IslandMedBarnPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const bestFor = (island.facts.best_for ?? '').toLowerCase()
  const isFamilyFriendly = bestFor.includes('barn') || bestFor.includes('familj')

  const beaches = island.activity_meta?.bad?.beaches ?? []
  const travelTime = island.facts.travel_time ?? ''
  const shortTravel = island.transport_meta
    ? island.transport_meta.from_city_min <= 90
    : travelTime.includes('20') || travelTime.includes('30') || travelTime.includes('40') || travelTime.includes('45') || travelTime.includes('1 tim')

  const kidFriendlyActivities = island.activities.filter(a =>
    ['barn', 'familj', 'bad', 'strand', 'cykel', 'lätt', 'nybörjar'].some(k =>
      a.name.toLowerCase().includes(k) || a.desc.toLowerCase().includes(k)
    )
  )

  const kidFriendlyRestaurants = island.restaurants.filter(r =>
    ['barn', 'familj', 'café', 'glass', 'lunch', 'enkel'].some(k =>
      r.desc.toLowerCase().includes(k) || r.type.toLowerCase().includes(k)
    )
  )

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Är ${island.name} bra för barnfamiljer?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: isFamilyFriendly
            ? `Ja, ${island.name} passar barnfamiljer bra. ${island.facts.best_for}. Restid: ${island.facts.travel_time}.`
            : `${island.name} kan fungera för äldre barn och familjer med vana av skärgårdsresor. ${island.facts.best_for}. Restid: ${island.facts.travel_time}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Hur tar man sig till ${island.name} med barn?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: island.getting_there.length > 0
            ? island.getting_there.map(t => `${t.method}: ${t.desc}`).join('. ')
            : `${island.name} nås med reguljärbåt. Se Waxholmsbolagets tidtabell för aktuella avgångar.`,
        },
      },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <IslandSubPageHeader
        island={island}
        tab="med-barn"
        subtitle={
          isFamilyFriendly
            ? `${island.name} är ett populärt val för barnfamiljer — ${island.facts.best_for.toLowerCase()}.`
            : `Guide för dig som planerar att besöka ${island.name} med barn.`
        }
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>

        {/* Snabbfakta för familjer */}
        <div style={{
          background: 'var(--white)', borderRadius: 16, padding: '22px 20px',
          boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
          border: '1px solid rgba(10,123,140,0.07)',
          marginBottom: 28,
        }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
            Snabbfakta — {island.name} med barn
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 14 }}>
            {[
              { icon: '⛴', label: 'Restid', value: island.facts.travel_time },
              { icon: '🏊', label: 'Badmöjligheter', value: beaches.length > 0 ? beaches.slice(0, 2).join(', ') : (island.activity_meta?.bad ? 'Klippbad och bryggor' : 'Klippor längs kusten') },
              { icon: '🍽', label: 'Restauranger', value: island.restaurants.length > 0 ? `${island.restaurants.length} krogar och caféer` : 'Begränsat utbud — ta matsäck' },
              { icon: '🚲', label: 'Cykling', value: island.activity_meta?.cykel?.rental ? 'Cykeluthyrning finns' : (island.activity_meta?.cykel ? 'Cykelleder finns' : 'Kontrollera lokalt') },
              { icon: '📅', label: 'Bäst säsong', value: island.facts.season },
              { icon: '👨‍👩‍👧', label: 'Passar', value: island.facts.best_for },
            ].map((f, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 2 }}>{f.label}</div>
                  <div style={{ fontSize: 14, color: 'var(--txt)', fontWeight: 600 }}>{f.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Aktiviteter för barn */}
        {kidFriendlyActivities.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Aktiviteter för barn på {island.name}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {kidFriendlyActivities.map((a, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                }}>
                  <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)', marginBottom: 6 }}>
                    {a.icon} {a.name}
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6 }}>{a.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mat för barnfamiljer */}
        {kidFriendlyRestaurants.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Bra restauranger för familjer
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {kidFriendlyRestaurants.map((r, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
                    <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--txt)' }}>{r.name}</div>
                    <span style={{ fontSize: 11, padding: '2px 9px', borderRadius: 999, background: 'rgba(10,123,140,0.08)', color: '#1e5c82', fontWeight: 700 }}>{r.type}</span>
                  </div>
                  <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, marginTop: 6 }}>{r.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Transport med barn */}
        {island.getting_there.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Att ta sig till {island.name} med barn
            </h2>
            <div style={{ display: 'grid', gap: 10 }}>
              {island.getting_there.map((t, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '16px 18px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.07)',
                  display: 'flex', gap: 14, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 22, flexShrink: 0 }}>{t.icon}</span>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--txt)', marginBottom: 4 }}>
                      {t.method}{t.time ? ` — ${t.time}` : ''}
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>{t.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 13, color: 'var(--txt3)', marginTop: 12 }}>
              💡 Barn under 7 år åker gratis med Waxholmsbolaget. Barn 7–19 år betalar halvpris.
            </p>
          </div>
        )}

        {/* Insidertips */}
        {island.insiderTips && island.insiderTips.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(10,123,140,0.06) 0%, rgba(26,74,107,0.04) 100%)',
            borderRadius: 16, padding: '22px 20px',
            border: '1px solid rgba(10,123,140,0.10)',
            marginBottom: 28,
          }}>
            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
              Insidertips för besök med barn
            </h3>
            <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.9 }}>
              {island.insiderTips.slice(0, 4).map((tip, i) => <li key={i}>{tip}</li>)}
            </ul>
          </div>
        )}

        {/* Thorkel CTA */}
        <div style={{
          background: 'linear-gradient(160deg, #1a4a6b 0%, #0d6e6e 100%)',
          borderRadius: 16, padding: '28px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          gap: 20, flexWrap: 'wrap' as const,
          marginBottom: 32,
        }}>
          <div>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 600, marginBottom: 6 }}>AI-planeraren</div>
            <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
              Planera familjedagen på {island.name}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              Thorkel hittar rätt båt, bästa lunchrestaurangen och ett badtips anpassat för barn.
            </div>
          </div>
          <Link href="/planera" style={{
            display: 'inline-block', background: '#e8924a', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 50, flexShrink: 0,
          }}>
            Planera med Thorkel →
          </Link>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link href={`/o/${slug}`} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: 'var(--sea)', color: '#fff',
            fontSize: 14, fontWeight: 700, textDecoration: 'none',
            padding: '12px 28px', borderRadius: 28,
          }}>
            ← Tillbaka till {island.name}
          </Link>
        </div>
      </main>
    </div>
  )
}

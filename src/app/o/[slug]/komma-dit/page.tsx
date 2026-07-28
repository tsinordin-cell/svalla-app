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
    title: `Hur tar man sig till ${island.name}? — Båt, buss, färja 2026`,
    description: `Allt om transport till ${island.name}: Waxholmsbolaget, Cinderellabåten, SL eller bil. Avgångstider, priser och tips för ${island.facts.travel_time}.`,
    keywords: [
      `hur tar man sig till ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} båt`,
      `${island.name.toLowerCase()} färja`,
      `${island.name.toLowerCase()} transport`,
      `komma till ${island.name.toLowerCase()}`,
      `resa till ${island.name.toLowerCase()}`,
      `${island.name.toLowerCase()} waxholmsbolaget`,
      `how to get to ${island.name.toLowerCase()} sweden`,
    ],
    openGraph: {
      title: `Hur tar man sig till ${island.name}? Allt om transport`,
      description: `Båt, buss och färja till ${island.name}. Avgångstider, priser, tips. Restid: ${island.facts.travel_time}.`,
      url: `https://svalla.se/o/${slug}/komma-dit`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/komma-dit` },
  }
}

export default async function IslandKommaDitPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const transportSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Hur tar man sig till ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: island.getting_there.length > 0
            ? island.getting_there.map(t => `${t.method}: ${t.desc}`).join('. ')
            : `${island.name} nås med reguljärbåt. Restid: ${island.facts.travel_time}.`,
        },
      },
      {
        '@type': 'Question',
        name: `Behöver man en egen båt för att komma till ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Nej, ingen egen båt krävs. ${island.name} nås med reguljärfärja. ${island.transport_meta ? `Restid från Stockholm: ca ${island.transport_meta.from_city_min} minuter med ${island.transport_meta.operator}.` : `Restid: ${island.facts.travel_time}.`}`,
        },
      },
      {
        '@type': 'Question',
        name: `Hur lång tid tar båten till ${island.name}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Restid till ${island.name}: ${island.facts.travel_time}. ${island.transport_meta ? `Från närmaste knutpunkt (${island.transport_meta.nearest_hub}): ca ${island.transport_meta.from_nearest_hub_min} minuter.` : ''}`,
        },
      },
    ],
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(transportSchema) }} />

      <IslandSubPageHeader
        island={island}
        tab="komma-dit"
        subtitle={`Restid: ${island.facts.travel_time}. Ingen egen båt krävs.`}
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>

        {/* Snabb restid-info */}
        {island.transport_meta && (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: '20px 22px',
            boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            border: '1px solid rgba(10,123,140,0.07)',
            marginBottom: 24,
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 16,
          }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Från Stockholm</div>
              <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--sea)' }}>{island.transport_meta.from_city_min} min</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Närmaste knutpunkt</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>{island.transport_meta.nearest_hub}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Operatör</div>
              <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>{island.transport_meta.operator}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase' as const, letterSpacing: '0.06em', marginBottom: 4 }}>Turtäthet</div>
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>{island.transport_meta.frequency}</div>
            </div>
          </div>
        )}

        {/* Transportalternativ */}
        {island.getting_there.length > 0 && (
          <div style={{ marginBottom: 28 }}>
            <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 16 }}>
              Hur tar man sig till {island.name}?
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {island.getting_there.map((t, i) => (
                <div key={i} style={{
                  background: 'var(--white)', borderRadius: 14, padding: '18px 20px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.05)',
                  border: '1px solid rgba(10,123,140,0.08)',
                  display: 'flex', gap: 16, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 26, flexShrink: 0, marginTop: 2 }}>{t.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' as const }}>
                      <span style={{ fontWeight: 700, fontSize: 16, color: 'var(--txt)' }}>{t.method}</span>
                      {t.time && (
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)', background: 'rgba(10,123,140,0.08)', padding: '2px 10px', borderRadius: 999 }}>
                          {t.time}
                        </span>
                      )}
                    </div>
                    {t.from && (
                      <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2, marginBottom: 6 }}>Från: {t.from}</div>
                    )}
                    <div style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.65 }}>{t.desc}</div>
                    {island.transport_meta?.booking_url ? (
                      <a href={island.transport_meta.booking_url} target="_blank" rel="noopener noreferrer" style={{
                        display: 'inline-block', marginTop: 10, fontSize: 13, fontWeight: 700,
                        color: 'var(--sea)', textDecoration: 'none',
                      }}>
                        Köp biljett / Se tidtabell →
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Fallback om ingen transportdata */}
        {island.getting_there.length === 0 && (
          <div style={{
            background: 'var(--white)', borderRadius: 14, padding: '20px',
            border: '1px solid rgba(10,123,140,0.08)',
            marginBottom: 28,
          }}>
            <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.7, margin: 0 }}>
              {island.name} nås med reguljärbåt från Stockholm. Restid: {island.facts.travel_time}. Se{' '}
              <a href="https://waxholmsbolaget.se" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>
                Waxholmsbolagets tidtabell
              </a>{' '}
              för aktuella avgångstider.
            </p>
          </div>
        )}

        {/* Praktisk info */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(10,123,140,0.06) 0%, rgba(26,74,107,0.04) 100%)',
          borderRadius: 16, padding: '22px 20px',
          border: '1px solid rgba(10,123,140,0.10)',
          marginBottom: 28,
        }}>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', marginBottom: 12 }}>
            Praktiska tips
          </h3>
          <ul style={{ margin: 0, padding: '0 0 0 18px', fontSize: 14, color: 'var(--txt2)', lineHeight: 1.9 }}>
            <li>Barn under 7 år åker gratis med Waxholmsbolaget. Barn 7–19 år betalar halvpris.</li>
            <li>SL-periodbiljett och SL Access-kort gäller på vissa Waxholmsbolaget-linjer (kontrollera aktuell info)</li>
            <li>Boka sittplats i förväg på populära rutter under högsäsong (juli)</li>
            <li>Kom i god tid — båtarna avgår exakt på utsatt tid</li>
            {island.transport_meta && island.transport_meta.car_parking && (
              <li>Parkering: {island.transport_meta.car_parking}</li>
            )}
          </ul>
        </div>

        {/* Planera tur med Thorkel */}
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
              Thorkel visar nästa avgång till {island.name}
            </div>
            <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)' }}>
              Berätta när du vill åka — Thorkel fixar hela planen.
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

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
    title: `Restauranger på ${island.name} — priser & öppettider 2026 | Svalla`,
    description: `Alla restauranger och caféer på ${island.name} med priser, öppettider och bokningsinfo. Vad kostar en dag? Uppdaterad guide.`,
    keywords: [`${island.name.toLowerCase()} restaurang`, `${island.name.toLowerCase()} krog`, `${island.name.toLowerCase()} café`, `mat på ${island.name.toLowerCase()}`, `priser ${island.name.toLowerCase()}`],
    openGraph: {
      title: `Restauranger på ${island.name} — priser & öppettider`,
      description: `Var äter man bäst på ${island.name}? Priser, öppettider och bokningsinfo.`,
      url: `https://svalla.se/o/${slug}/restauranger`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/restauranger` },
  }
}

export default async function IslandRestaurantsPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  const dc = island.day_cost

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader
        island={island}
        tab="restauranger"
        subtitle={
          island.restaurants.length === 0
            ? `${island.name} har begränsat utbud — ta gärna med matsäck.`
            : `${island.restaurants.length} restauranger och caféer på ${island.name} — med priser och öppettider.`
        }
      />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>

        {/* Dagskostnad-kort */}
        {dc && (
          <div style={{
            background: 'linear-gradient(135deg, rgba(10,123,140,0.07) 0%, rgba(26,74,107,0.05) 100%)',
            borderRadius: 16, padding: '22px 24px',
            border: '1px solid rgba(10,123,140,0.12)',
            marginBottom: 28,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <span style={{ fontSize: 22 }}>💰</span>
              <div>
                <div style={{ fontSize: 13, color: 'var(--txt3)', fontWeight: 600 }}>Vad kostar en dag på {island.name}?</div>
                <div style={{ fontSize: 22, fontWeight: 800, color: 'var(--txt)' }}>{dc.budget_per_person} per person</div>
              </div>
            </div>
            <div style={{ fontSize: 13, color: 'var(--txt2)', marginBottom: 14 }}>Inkluderar: {dc.includes}</div>

            <div style={{ display: 'grid', gap: 8, marginBottom: dc.tips ? 16 : 0 }}>
              {dc.breakdown.map((b, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  background: 'rgba(255,255,255,0.7)', borderRadius: 10, padding: '10px 14px',
                  fontSize: 13,
                }}>
                  <span style={{ color: 'var(--txt2)' }}>{b.item}</span>
                  <span style={{ fontWeight: 700, color: 'var(--txt)', whiteSpace: 'nowrap', marginLeft: 12 }}>{b.price}</span>
                </div>
              ))}
            </div>

            {dc.tips && dc.tips.length > 0 && (
              <div style={{ marginTop: 14, borderTop: '1px solid rgba(10,123,140,0.1)', paddingTop: 14 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Spartips</div>
                <ul style={{ margin: 0, padding: '0 0 0 16px', fontSize: 13, color: 'var(--txt2)', lineHeight: 1.8 }}>
                  {dc.tips.map((t, i) => <li key={i}>{t}</li>)}
                </ul>
              </div>
            )}
            <div style={{ marginTop: 14, fontSize: 11, color: 'var(--txt3)', fontStyle: 'italic' }}>
              Priser är ungefärliga och kan ändras. Kontrollera alltid aktuell meny hos respektive restaurang.
            </div>
          </div>
        )}

        {/* Restauranger */}
        {island.restaurants.length === 0 ? (
          <div style={{ background: 'var(--white)', padding: 24, borderRadius: 14, fontSize: 14, color: 'var(--txt2)' }}>
            Inga registrerade restauranger på {island.name}. <Link href="/partner" style={{ color: 'var(--sea)' }}>Är du krögare här? Kontakta oss</Link> så lägger vi upp.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 16 }}>
            {island.restaurants.map(r => (
              <div key={r.name} style={{
                background: 'var(--white)', borderRadius: 16,
                border: '1px solid var(--surface-3)',
                overflow: 'hidden',
              }}>
                {/* Huvud */}
                <div style={{ padding: '20px 22px 16px' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                    <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>{r.name}</h2>
                    <span style={{ fontSize: 11, padding: '3px 10px', borderRadius: 999, background: 'var(--surface-3)', color: '#1e5c82', fontWeight: 700, whiteSpace: 'nowrap' }}>
                      {r.type}
                    </span>
                  </div>
                  <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: 0 }}>
                    {r.desc}
                  </p>
                </div>

                {/* Metadata-rad — visas om minst ett fält finns */}
                {(r.price_example || r.open_season || r.open_hours || r.child_menu) && (
                  <div style={{
                    borderTop: '1px solid var(--surface-3)',
                    padding: '14px 22px',
                    display: 'grid', gap: 8,
                    background: 'rgba(10,123,140,0.02)',
                  }}>
                    {r.price_example && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
                        <span style={{ minWidth: 18 }}>🪙</span>
                        <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Priser:</strong> {r.price_example}</span>
                      </div>
                    )}
                    {r.open_season && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
                        <span style={{ minWidth: 18 }}>📅</span>
                        <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Säsong:</strong> {r.open_season}</span>
                      </div>
                    )}
                    {r.open_hours && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
                        <span style={{ minWidth: 18 }}>🕐</span>
                        <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Tider:</strong> {r.open_hours}</span>
                      </div>
                    )}
                    {r.child_menu && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
                        <span style={{ minWidth: 18 }}>👶</span>
                        <span style={{ color: 'var(--txt2)' }}><strong style={{ color: 'var(--txt)' }}>Barn:</strong> {r.child_menu}</span>
                      </div>
                    )}
                    {r.book_required && (
                      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 13 }}>
                        <span style={{ minWidth: 18 }}>⚠️</span>
                        <span style={{ color: '#b45309' }}><strong>Bordsbokning krävs</strong>{r.book_note ? ` — ${r.book_note}` : ''}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* CTA-rad */}
                {(r.bookingUrl || r.websiteUrl || r.phone) && (
                  <div style={{
                    borderTop: '1px solid var(--surface-3)',
                    padding: '12px 22px',
                    display: 'flex', gap: 10, flexWrap: 'wrap' as const,
                  }}>
                    {r.bookingUrl && (
                      <a href={r.bookingUrl} target="_blank" rel="noopener noreferrer" style={{
                        padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                        background: 'var(--sea)', color: '#fff', textDecoration: 'none',
                      }}>
                        Boka bord →
                      </a>
                    )}
                    {r.websiteUrl && !r.bookingUrl && (
                      <a href={r.websiteUrl} target="_blank" rel="noopener noreferrer" style={{
                        padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 700,
                        background: 'var(--sea)', color: '#fff', textDecoration: 'none',
                      }}>
                        Hemsida →
                      </a>
                    )}
                    {r.websiteUrl && r.bookingUrl && (
                      <a href={r.websiteUrl} target="_blank" rel="noopener noreferrer" style={{
                        padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                        background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none',
                      }}>
                        Hemsida
                      </a>
                    )}
                    {r.phone && (
                      <a href={`tel:${r.phone.replace(/\s/g, '')}`} style={{
                        padding: '7px 16px', borderRadius: 999, fontSize: 13, fontWeight: 600,
                        background: 'var(--surface-2)', color: 'var(--txt)', textDecoration: 'none',
                      }}>
                        📞 {r.phone}
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Mer om ön */}
        <div style={{ marginTop: 32, padding: '20px 22px', background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)' }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>Mer om {island.name}</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, fontSize: 14 }}>
            <Link href={`/o/${slug}`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hela ö-guiden →</Link>
            <Link href={`/o/${slug}/bad`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Badplatser →</Link>
            <Link href={`/o/${slug}/hamnar`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Hamnar →</Link>
            <Link href={`/o/${slug}/boende`} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none' }}>Boende →</Link>
          </div>
        </div>
      </main>
    </div>
  )
}

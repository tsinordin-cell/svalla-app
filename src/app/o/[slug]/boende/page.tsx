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
    title: `Boende på ${island.name} — hotell, vandrarhem och stugor | Svalla`,
    description: `Hela utbudet av boende på ${island.name}: hotell, värdshus, B&B, stugor och vandrarhem. Bokningstips inför sommaren.`,
    keywords: [
      `${island.name.toLowerCase()} hotell`,
      `${island.name.toLowerCase()} boende`,
      `${island.name.toLowerCase()} stuga`,
      `övernattning ${island.name.toLowerCase()}`,
    ],
    openGraph: {
      title: `Boende på ${island.name}`,
      description: `Hotell, vandrarhem och stugor på ${island.name}.`,
      url: `https://svalla.se/o/${slug}/boende`,
    },
    alternates: { canonical: `https://svalla.se/o/${slug}/boende` },
  }
}

const linkStyle = {
  display: 'flex' as const,
  alignItems: 'center' as const,
  justifyContent: 'space-between' as const,
  padding: '12px 16px',
  borderRadius: 10,
  background: 'rgba(30,92,130,0.06)',
  border: '1px solid rgba(30,92,130,0.18)',
  color: '#1e5c82',
  fontSize: 14,
  fontWeight: 600,
  textDecoration: 'none' as const,
}

export default async function IslandAccommodationPage({ params }: Props) {
  const { slug } = await params
  const island = getIsland(slug)
  if (!island) notFound()

  // Pre-filtrerade sök-URL:er — affiliate-IDs läggs till vid partnerskap
  // Booking.com: lägg till &aid=AFFILIATE_ID
  // Airbnb: lägg till ?s_af=AFFILIATE_TOKEN
  const bookingComUrl = `https://www.booking.com/searchresults.sv.html?ss=${encodeURIComponent(island.name)}`
  const airbnbUrl = `https://www.airbnb.com/s/${encodeURIComponent(island.name)}--Sverige/homes`

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <IslandSubPageHeader island={island} tab="boende" />

      <main style={{ maxWidth: 900, margin: '-24px auto 0', padding: '0 16px 60px' }}>

        {/* Intro — visas om ön har specifik boende-text */}
        {island.accommodationIntro && (
          <div style={{
            background: 'var(--white)', padding: '18px 22px', borderRadius: 14,
            border: '1px solid var(--surface-3)', marginBottom: 20,
            fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7,
          }}>
            {island.accommodationIntro}
          </div>
        )}

        {/* Boendekort */}
        {island.accommodation.length === 0 ? (
          <div style={{
            background: 'var(--white)', padding: 24, borderRadius: 14,
            border: '1px solid var(--surface-3)', fontSize: 14, color: 'var(--txt2)',
          }}>
            Inga registrerade boenden på {island.name}. Många öar har privat stuguthyrning — sök på Airbnb eller Booking.com nedan.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: 14 }}>
            {island.accommodation.map(a => (
              <div key={a.name} style={{
                background: 'var(--white)', padding: '20px 22px', borderRadius: 14,
                border: '1px solid var(--surface-3)',
              }}>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, marginBottom: 8 }}>
                  <h2 style={{ fontSize: 17, fontWeight: 700, margin: 0, color: 'var(--txt)' }}>{a.name}</h2>
                  <span style={{
                    fontSize: 11, padding: '3px 10px', borderRadius: 999,
                    background: 'rgba(30,92,130,0.08)', color: '#1e5c82', fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>
                    {a.type}
                  </span>
                </div>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 12px' }}>
                  {a.desc}
                </p>
                {(a.bookingUrl || a.websiteUrl) && (
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {a.bookingUrl && (
                      <a
                        href={a.bookingUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '7px 16px', borderRadius: 999,
                          background: '#1e5c82', color: '#fff',
                          fontSize: 13, fontWeight: 700, textDecoration: 'none',
                        }}
                      >
                        Boka →
                      </a>
                    )}
                    {a.websiteUrl && (
                      <a
                        href={a.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: 'inline-flex', alignItems: 'center',
                          padding: '7px 16px', borderRadius: 999,
                          background: 'transparent', color: '#1e5c82',
                          border: '1px solid rgba(30,92,130,0.4)',
                          fontSize: 13, fontWeight: 600, textDecoration: 'none',
                        }}
                      >
                        Hemsida →
                      </a>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Sök och boka direkt — alltid synlig */}
        <div style={{
          marginTop: 24, background: 'var(--white)', padding: '20px 22px',
          borderRadius: 14, border: '1px solid var(--surface-3)',
        }}>
          <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 6px', color: 'var(--txt)' }}>
            Sök och boka direkt
          </h2>
          <p style={{ fontSize: 13, color: 'var(--txt2)', margin: '0 0 14px', lineHeight: 1.55 }}>
            Jämför priser och tillgänglighet hos de stora bokningssajterna:
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <a href={bookingComUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <span>Booking.com — {island.name}</span>
              <span style={{ opacity: 0.5 }}>↗</span>
            </a>
            <a href={airbnbUrl} target="_blank" rel="noopener noreferrer" style={linkStyle}>
              <span>Airbnb — {island.name}</span>
              <span style={{ opacity: 0.5 }}>↗</span>
            </a>
          </div>
        </div>

        {/* Ta sig dit — återanvänder getting_there från island-data */}
        {island.getting_there.length > 0 && (
          <div style={{
            marginTop: 16, background: 'var(--white)', padding: '20px 22px',
            borderRadius: 14, border: '1px solid var(--surface-3)',
          }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, margin: '0 0 14px', color: 'var(--txt)' }}>
              Ta sig dit
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              {island.getting_there.map(t => (
                <div key={t.method} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{
                    minWidth: 36, height: 36, borderRadius: 10,
                    background: 'rgba(30,92,130,0.08)', color: '#1e5c82',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 18, flexShrink: 0,
                  }}>
                    {t.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center', marginBottom: 3 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--txt)' }}>{t.method}</span>
                      {t.from && (
                        <span style={{ fontSize: 12, color: 'var(--txt3)' }}>från {t.from}</span>
                      )}
                      {t.time && (
                        <span style={{
                          fontSize: 11, fontWeight: 700, color: '#1e5c82',
                          background: 'rgba(30,92,130,0.09)', padding: '2px 8px', borderRadius: 10,
                        }}>
                          ⏱ {t.time}
                        </span>
                      )}
                    </div>
                    <p style={{ margin: 0, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>
                      {t.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Navigation till andra undersidor */}
        <div style={{
          marginTop: 16, padding: '18px 22px',
          background: 'var(--white)', borderRadius: 14, border: '1px solid var(--surface-3)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 10 }}>
            Mer om {island.name}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            <Link href={`/o/${slug}`} style={{ padding: '7px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
              Hela ö-guiden →
            </Link>
            <Link href={`/o/${slug}/restauranger`} style={{ padding: '7px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
              Restauranger →
            </Link>
            <Link href={`/o/${slug}/hamnar`} style={{ padding: '7px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
              Hamnar →
            </Link>
            <Link href="/boende" style={{ padding: '7px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--sea)', textDecoration: 'none', fontSize: 13, fontWeight: 500 }}>
              Alla boendetyper →
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

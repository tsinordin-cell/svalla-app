import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { listPublishedArticles } from '@/lib/articles'

export const metadata: Metadata = {
  title: 'Sthlmare tipsar — Svalla',
  description: 'Redaktionella guider, tips och berättelser från Stockholms skärgård. Var du äter, bor, badar och lägger till.',
  keywords: ['skärgård guide', 'stockholms skärgård tips', 'sthlmare tipsar', 'skärgård artiklar'],
  openGraph: {
    title: 'Sthlmare tipsar — Svalla',
    description: 'Redaktionella guider, tips och berättelser från Stockholms skärgård.',
    url: 'https://svalla.se/tips',
  },
}

export const revalidate = 300 // 5 min ISR

export default async function TipsPage() {
  const articles = await listPublishedArticles()

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 96 }}>
      {/* HERO */}
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '56px 20px 40px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 30, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: -0.3 }}>
            Sthlmare tipsar
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.82)', fontSize: 15, margin: 0, maxWidth: 600, lineHeight: 1.5 }}>
            Redaktionella guider, tips och berättelser från Stockholms skärgård. Skrivet av lokala experter och skärgårdsbor.
          </p>
        </div>
      </div>

      {/* ARTICLES GRID */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px' }}>
        {articles.length === 0 ? (
          <EmptyState />
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: 20,
          }}>
            {articles.map((a) => (
              <Link key={a.id} href={`/tips/${a.slug}`} style={{ textDecoration: 'none' }}>
                <article style={{
                  background: 'var(--white)',
                  borderRadius: 16,
                  overflow: 'hidden',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                  transition: 'transform .2s, box-shadow .2s',
                  cursor: 'pointer',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                }}>
                  {a.cover_image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={a.cover_image}
                      alt={a.title}
                      style={{ width: '100%', height: 160, objectFit: 'cover', display: 'block' }}
                    />
                  ) : (
                    <div style={{
                      background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
                      height: 120,
                    }} />
                  )}
                  <div style={{ padding: '18px 20px 22px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 10, alignItems: 'center' }}>
                      {a.category && (
                        <span style={{
                          fontSize: 11,
                          fontWeight: 700,
                          color: 'var(--sea)',
                          background: 'rgba(30,92,130,0.08)',
                          padding: '3px 9px',
                          borderRadius: 20,
                          textTransform: 'uppercase',
                          letterSpacing: 0.4,
                        }}>{a.category}</span>
                      )}
                      {a.reading_min != null && (
                        <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{a.reading_min} min</span>
                      )}
                    </div>
                    <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', margin: '0 0 10px', lineHeight: 1.3 }}>
                      {a.title}
                    </h2>
                    {a.excerpt && (
                      <p style={{ fontSize: 13.5, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 16px', flex: 1 }}>
                        {a.excerpt}
                      </p>
                    )}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 11, color: 'var(--txt3)' }}>
                        {a.author_name || 'Svalla-redaktionen'}
                        {a.published_at && (
                          <> · {new Date(a.published_at).toLocaleDateString('sv-SE', { year: 'numeric', month: 'short', day: 'numeric' })}</>
                        )}
                      </div>
                      <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 700 }}>Läs mer →</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div style={{
      textAlign: 'center',
      padding: '64px 20px',
      background: 'var(--white)',
      borderRadius: 16,
      color: 'var(--txt2)',
    }}>
      <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', marginBottom: 8 }}>
        Inga artiklar publicerade ännu
      </div>
      <div style={{ fontSize: 13, lineHeight: 1.5, maxWidth: 400, margin: '0 auto' }}>
        Vi fyller på med guider och tips från Stockholms skärgård. Kom tillbaka snart — eller följ oss för uppdateringar.
      </div>
    </div>
  )
}

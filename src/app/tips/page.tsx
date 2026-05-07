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
        background: 'var(--grad-sea-hero)',
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
                    <ArticleCover category={a.category} title={a.title} />
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

// Category → gradient + SVG icon
const CATEGORY_STYLE: Record<string, { bg: string; iconPath: string }> = {
  'Segling': {
    bg: 'linear-gradient(135deg, #0c3a5a 0%, #1a6090 60%, #2a8ab5 100%)',
    iconPath: 'M12 3L4 20h16L12 3z M12 3v17 M4 14h16',
  },
  'Aktiviteter': {
    bg: 'linear-gradient(135deg, #064e3b 0%, #065f46 60%, #0d9488 100%)',
    iconPath: 'M13 2L3 14h9l-1 8 10-12h-9l1-8z',
  },
  'Praktiskt': {
    bg: 'linear-gradient(135deg, #1e3a5f 0%, #1d4ed8 60%, #3b82f6 100%)',
    iconPath: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2 M9 5a2 2 0 002 2h2a2 2 0 002-2 M9 5a2 2 0 012-2h2a2 2 0 012 2 M12 12h.01 M12 16h.01',
  },
  'Resmål': {
    bg: 'linear-gradient(135deg, #14532d 0%, #15803d 60%, #22c55e 100%)',
    iconPath: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z',
  },
  'Familj': {
    bg: 'linear-gradient(135deg, #78350f 0%, #b45309 60%, #f59e0b 100%)',
    iconPath: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2 M9 7a4 4 0 100 8 4 4 0 000-8z M23 21v-2a4 4 0 00-3-3.87 M16 3.13a4 4 0 010 7.75',
  },
  'Mat & dryck': {
    bg: 'linear-gradient(135deg, #7f1d1d 0%, #991b1b 60%, #ef4444 100%)',
    iconPath: 'M18 8h1a4 4 0 010 8h-1 M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z M6 1v3 M10 1v3 M14 1v3',
  },
  'default': {
    bg: 'linear-gradient(135deg, #0c2e48 0%, #175878 60%, #1e6e8a 100%)',
    iconPath: 'M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1',
  },
}

function ArticleCover({ category, title }: { category: string | null; title: string }) {
  const style = CATEGORY_STYLE[category ?? ''] ?? CATEGORY_STYLE['default']
  const label = category ?? 'Svalla'
  return (
    <div style={{
      background: style.bg,
      height: 140,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 10,
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* subtle wave pattern */}
      <svg viewBox="0 0 320 60" preserveAspectRatio="none" style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: 40, opacity: 0.18,
      }}>
        <path d="M0,30 C60,10 120,50 180,30 C240,10 300,50 320,30 L320,60 L0,60Z" fill="white" />
      </svg>
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={1.5}
        strokeLinecap="round" strokeLinejoin="round"
        style={{ width: 38, height: 38, filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))' }}
      >
        <path d={style.iconPath} />
      </svg>
      <span style={{
        fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.70)',
      }}>{label}</span>
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

import Icon from '@/components/Icon'
import type { Metadata } from 'next'
import Link from 'next/link'
import { POSTS_META } from './posts-data'
import SvallaLogo from '@/components/SvallaLogo'

export const metadata: Metadata = {
  title: 'Skärgårdsbloggen – Svalla',
  description: 'Tips, guider och inspiration för Stockholms skärgård. Bästa restaurangerna, dolda pärlor, ruttguider och säsongsuppdateringar.',
  keywords: ['stockholms skärgård guide', 'skärgård restaurang tips', 'bästa öarna stockholm', 'skärgård kajak', 'segla stockholms skärgård'],
  openGraph: {
    title: 'Skärgårdsbloggen – Svalla',
    description: 'Tips, guider och inspiration för Stockholms skärgård.',
    url: 'https://svalla.se/blogg',
  },
}

export default function BloggPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '0 20px 44px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Top bar: back + logo */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '14px 0 20px',
          }}>
            <Link href="/" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              fontSize: 13, fontWeight: 700,
              background: 'rgba(255,255,255,0.12)',
              borderRadius: 20, padding: '6px 14px 6px 10px',
              backdropFilter: 'blur(6px)',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Tillbaka
            </Link>
            <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', opacity: 0.9 }}>
              <SvallaLogo height={22} color="#ffffff" />
            </Link>
          </div>

          {/* Heading */}
          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            Skärgårdsbloggen
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, margin: '0 0 20px' }}>
            Tips, guider och inspiration för Stockholms skärgård
          </p>

          {/* Category pills */}
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {['Alla', 'Öguide', 'Aktiviteter', 'Mat & dryck', 'Praktiskt', 'Inspiration'].map(cat => (
              <span key={cat} style={{
                fontSize: 12, fontWeight: 700, padding: '5px 12px', borderRadius: 20,
                background: cat === 'Alla' ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.10)',
                color: '#fff', cursor: 'default',
              }}>{cat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <span>Bloggen</span>
        </nav>
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {POSTS_META.map(post => (
            <Link key={post.slug} href={`/blogg/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'var(--white)',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
                transition: 'transform .18s, box-shadow .18s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(10,123,140,0.06)',
              }}>
                {/* Card image area */}
                <div style={{
                  background: 'var(--grad-sea)',
                  padding: '32px 24px',
                  fontSize: 44,
                  textAlign: 'center',
                  position: 'relative',
                }}>
                  {post.emoji}
                  {/* Category badge pinned top-right */}
                  <span style={{
                    position: 'absolute', top: 10, right: 10,
                    fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: 'rgba(255,255,255,0.18)', color: '#fff',
                    padding: '3px 8px', borderRadius: 20, backdropFilter: 'blur(4px)',
                  }}>{post.category}</span>
                </div>

                <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 9 }}>
                    <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{post.readTime}</span>
                    <span style={{ fontSize: 10, color: 'var(--txt3)', opacity: 0.5 }}>·</span>
                    <span style={{ fontSize: 11, color: 'var(--txt3)' }}>
                      {new Date(post.date).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', lineHeight: 1.35 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 800 }}>Läs mer</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 13, height: 13 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{
          marginTop: 48,
          padding: '28px',
          background: 'rgba(30,92,130,0.05)',
          borderRadius: 18,
          textAlign: 'center',
          border: '1px dashed rgba(30,92,130,0.2)',
        }}>
          <Icon name="mail" style={{ fontSize: 28, marginBottom: 10 }} />
          <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>Fler artiklar är på väg</p>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 14px' }}>
            Tips på ämnen? Maila oss på{' '}
            <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 700 }}>info@svalla.se</a>
          </p>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'var(--sea)', color: '#fff',
            fontSize: 13, fontWeight: 700, textDecoration: 'none',
            padding: '9px 20px', borderRadius: 20,
          }}>
            ← Till startsidan
          </Link>
        </div>
      </div>
    </div>
  )
}

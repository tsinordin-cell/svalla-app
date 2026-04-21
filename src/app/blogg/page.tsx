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
    <div style={{ minHeight: '100vh', background: 'var(--bg, #f7fbfc)', paddingBottom: 80 }}>
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '60px 20px 40px',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <Link href="/" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 16 }}>
            <SvallaLogo height={26} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 6px' }}>Skärgårdsbloggen</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 14, margin: 0 }}>Tips, guider och inspiration för Stockholms skärgård</p>
        </div>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {POSTS_META.map(post => (
            <Link key={post.slug} href={`/blogg/${post.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'var(--white, #fff)',
                borderRadius: 16,
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                transition: 'transform .2s, box-shadow .2s',
                cursor: 'pointer',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  background: 'linear-gradient(135deg, #1e5c82 0%, #2d7d8a 100%)',
                  padding: '28px 24px',
                  fontSize: 40,
                  textAlign: 'center',
                }}>
                  {post.emoji}
                </div>
                <div style={{ padding: '20px 22px 24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
                    <span style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: 'var(--sea)',
                      background: 'rgba(30,92,130,0.08)',
                      padding: '3px 9px',
                      borderRadius: 20,
                    }}>{post.category}</span>
                    <span style={{ fontSize: 11, color: '#a0b8c4', paddingTop: 3 }}>{post.readTime}</span>
                  </div>
                  <h2 style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt, #162d3a)', margin: '0 0 10px', lineHeight: 1.3 }}>
                    {post.title}
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                    {post.excerpt}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 11, color: '#a0b8c4' }}>
                      {new Date(post.date).toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                    <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 700 }}>Läs mer →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <div style={{
          marginTop: 48,
          padding: '28px',
          background: 'rgba(30,92,130,0.06)',
          borderRadius: 16,
          textAlign: 'center',
          border: '1px dashed rgba(30,92,130,0.2)',
        }}>
          <p style={{ fontSize: 14, color: '#4a6a7a', margin: '0 0 8px' }}>Fler artiklar är på väg.</p>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
            Tips på ämnen? Maila oss på{' '}
            <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)', fontWeight: 700 }}>info@svalla.se</a>
          </p>
        </div>
      </div>
    </div>
  )
}

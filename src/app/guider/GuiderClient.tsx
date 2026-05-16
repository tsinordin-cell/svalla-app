'use client'

import { useState } from 'react'
import Link from 'next/link'
import { GUIDES, type GuideCategory } from './guides-data'

const ALL_CATEGORIES: GuideCategory[] = ['Praktisk', 'Transport', 'Aktivitet', 'Mat', 'Säsong', 'Region']

export default function GuiderClient() {
  const [active, setActive] = useState<GuideCategory | 'Alla'>('Alla')

  const filtered = active === 'Alla' ? GUIDES : GUIDES.filter(g => g.category === active)
  const featured = GUIDES.find(g => g.featured)
  const rest = active === 'Alla'
    ? filtered.filter(g => !g.featured)
    : filtered

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>

      {/* Header */}
      <div style={{
        background: 'var(--grad-sea-hero)',
        padding: '0 20px 44px',
        paddingTop: 'calc(env(safe-area-inset-top, 0px))',
      }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 20px' }}>
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
          </div>

          <h1 style={{ fontSize: 32, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.01em' }}>
            Praktiska guider till skärgården
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, margin: '0 0 20px' }}>
            Allt du behöver veta – från allemansrätten till packlistan
          </p>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['Alla', ...ALL_CATEGORIES] as const).map(cat => (
              <button
                key={cat}
                onClick={() => setActive(cat as GuideCategory | 'Alla')}
                style={{
                  fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20,
                  border: 'none', cursor: 'pointer',
                  background: active === cat ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)',
                  color: active === cat ? 'var(--sea, #0a7b8c)' : '#fff',
                  transition: 'all .18s',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--txt3)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <span>Guider</span>
        </nav>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px' }}>

        {/* Featured card – only when showing Alla */}
        {active === 'Alla' && featured && (
          <Link href={`/guider/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 28 }}>
            <article style={{
              background: 'var(--white)',
              borderRadius: 18,
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
              display: 'grid',
              gridTemplateColumns: 'minmax(160px, 240px) 1fr',
              border: '2px solid rgba(232,146,74,0.25)',
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #1a4a5e, #2a8a8a)',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                justifyContent: 'center', padding: 32, position: 'relative',
                minWidth: 160,
              }}>
                <span style={{
                  position: 'absolute', top: 12, left: 12,
                  background: '#e8924a', color: '#fff',
                  fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em',
                  padding: '3px 10px', borderRadius: 20,
                }}>Redaktionens val</span>
                <svg viewBox="0 0 48 48" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" style={{ width: 64, height: 64 }}>
                  <path d="M4 34 Q12 20 24 28 Q36 36 44 18" strokeLinecap="round"/>
                  <circle cx="10" cy="38" r="3" fill="rgba(255,255,255,0.15)" stroke="none"/>
                  <circle cx="38" cy="14" r="3" fill="rgba(255,255,255,0.15)" stroke="none"/>
                </svg>
              </div>
              <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sea)', marginBottom: 8, display: 'block' }}>
                  {featured.category} · {featured.readTime}
                </span>
                <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px', lineHeight: 1.3 }}>
                  {featured.title}
                </h2>
                <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  {featured.excerpt}
                </p>
                <span style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 700 }}>Läs guiden →</span>
              </div>
            </article>
          </Link>
        )}

        {/* Card grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
          {rest.map(guide => (
            <Link key={guide.slug} href={`/guider/${guide.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'var(--white)',
                borderRadius: 18,
                overflow: 'hidden',
                boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
                border: '1px solid rgba(10,123,140,0.06)',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
              }}>
                <div style={{
                  background: 'var(--grad-sea)',
                  padding: '16px 24px 12px',
                  minHeight: 64,
                  display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-end',
                  position: 'relative',
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
                    background: 'rgba(255,255,255,0.18)', color: '#fff',
                    padding: '3px 8px', borderRadius: 20, backdropFilter: 'blur(4px)',
                  }}>{guide.category}</span>
                </div>
                <div style={{ padding: '18px 20px 20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 8, display: 'block' }}>{guide.readTime}</span>
                  <h2 style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', lineHeight: 1.35 }}>
                    {guide.title}
                  </h2>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 16px', flex: 1 }}>
                    {guide.excerpt}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 800 }}>Läs guiden</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 13, height: 13 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

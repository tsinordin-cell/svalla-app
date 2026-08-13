'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  GUIDES,
  type GuideCategory,
  type GuideRegion,
  ALL_REGIONS,
  REGION_LABELS,
  REGION_EMOJIS,
  REGION_URL_SLUG,
  getGuideRegion,
  getGuidesByRegion,
} from './guides-data'
import { emojiToIcon } from '@/lib/iconMap'
import Icon from '@/components/Icon'

const ALL_CATEGORIES: GuideCategory[] = ['Praktisk', 'Transport', 'Aktivitet', 'Mat', 'Säsong', 'Region']

const TRANSACTIONAL_LINKS = [
  { href: '/teambuilding', emoji: '🤝', label: 'Teambuilding', sub: 'Kickoff & AW i skärgården' },
  { href: '/hyra-bat',    emoji: '⛵', label: 'Hyra båt',     sub: 'Uthyrning runt om i Sverige' },
  { href: '/segelkurs',   emoji: '🏖', label: 'Segelkurs',    sub: 'Certifikat & seglarskola' },
]

function GuideCard({ guide }: { guide: typeof GUIDES[0] }) {
  return (
    <Link href={`/guider/${guide.slug}`} style={{ textDecoration: 'none' }}>
      <article style={{
        background: 'var(--white)',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
        border: '1px solid rgba(10,123,140,0.06)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{
          background: 'var(--grad-sea)',
          padding: '14px 18px 10px',
          display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
        }}>
          <span aria-hidden><Icon name={emojiToIcon(guide.emoji)} size={24} /></span>
          <span style={{
            fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em',
            background: 'rgba(255,255,255,0.18)', color: '#fff',
            padding: '3px 8px', borderRadius: 20,
          }}>{guide.category}</span>
        </div>
        <div style={{ padding: '14px 18px 16px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: 11, color: 'var(--ink-muted)', marginBottom: 6, display: 'block' }}>{guide.readTime}</span>
          <h3 style={{ fontSize: 14, fontWeight: 700, color: 'var(--ink)', margin: '0 0 6px', lineHeight: 1.35 }}>
            {guide.title}
          </h3>
          <p style={{ fontSize: 12, color: 'var(--ink-muted)', lineHeight: 1.6, margin: '0 0 12px', flex: 1 }}>
            {guide.excerpt}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ fontSize: 12, color: 'var(--sea)', fontWeight: 800 }}>Läs guiden</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 12, height: 12 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  )
}

export default function GuiderClient() {
  const [activeCategory, setActiveCategory] = useState<GuideCategory | 'Alla'>('Alla')
  const [searchQuery, setSearchQuery] = useState('')

  const featured = GUIDES.find(g => g.featured)

  const q = searchQuery.trim().toLowerCase()
  const isSearching = q.length > 0

  // Search across all guides when query is active
  const searchResults = isSearching
    ? GUIDES.filter(g =>
        g.title.toLowerCase().includes(q) ||
        g.excerpt.toLowerCase().includes(q) ||
        g.category.toLowerCase().includes(q)
      )
    : []

  // Filtered flat view (when a specific category is selected)
  const filteredGuides = GUIDES.filter(g => g.category === activeCategory && !g.featured)

  const showGeo = activeCategory === 'Alla' && !isSearching

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
            Guider om Sveriges kust
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, margin: '0 0 20px' }}>
            {GUIDES.length} guider – från Stockholms skärgård till Bohuslän, Gotland och Höga Kusten
          </p>

          {/* Sökfält */}
          <div style={{ position: 'relative', marginBottom: 12 }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth={2} style={{
              position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
              width: 15, height: 15, pointerEvents: 'none',
            }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Sök bland guider…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', padding: '9px 14px 9px 36px',
                borderRadius: 22, border: 'none', outline: 'none',
                background: 'rgba(255,255,255,0.14)', color: '#fff',
                fontSize: 14, backdropFilter: 'blur(6px)',
                boxSizing: 'border-box',
              }}
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} style={{
                position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)',
                background: 'rgba(255,255,255,0.25)', border: 'none', borderRadius: '50%',
                width: 20, height: 20, cursor: 'pointer', color: '#fff', fontSize: 12,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>✕</button>
            )}
          </div>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {(['Alla', ...ALL_CATEGORIES] as const).map(cat => (
              <button
                key={cat}
                onClick={() => { setActiveCategory(cat as GuideCategory | 'Alla'); setSearchQuery('') }}
                style={{
                  fontSize: 12, fontWeight: 700, padding: '5px 14px', borderRadius: 20,
                  border: 'none', cursor: 'pointer',
                  background: activeCategory === cat && !isSearching ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.12)',
                  color: activeCategory === cat && !isSearching ? 'var(--sea, #0a7b8c)' : '#fff',
                  transition: 'all .18s',
                }}
              >{cat}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '14px 20px 0' }}>
        <nav style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-muted)' }}>
          <Link href="/" style={{ color: 'var(--sea)', textDecoration: 'none', fontWeight: 600 }}>Svalla</Link>
          <span>›</span>
          <span>Guider</span>
        </nav>
      </div>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '24px 20px' }}>

        {/* Sökresultat */}
        {isSearching && (
          <>
            <p style={{ fontSize: 13, color: 'var(--ink-muted)', marginBottom: 16 }}>
              {searchResults.length} {searchResults.length === 1 ? 'guide' : 'guider'} matchar &ldquo;{searchQuery}&rdquo;
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginBottom: 40 }}>
              {searchResults.map(guide => (
                <GuideCard key={guide.slug} guide={guide} />
              ))}
              {searchResults.length === 0 && (
                <p style={{ color: 'var(--ink-muted)', fontSize: 14, gridColumn: '1 / -1' }}>
                  Ingen guide matchar &ldquo;{searchQuery}&rdquo;. Prova ett annat sökord.
                </p>
              )}
            </div>
          </>
        )}

        {!isSearching && showGeo ? (
          <>
            {/* Featured card */}
            {featured && (
              <Link href={`/guider/${featured.slug}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 32 }}>
                <article style={{
                  background: 'var(--white)',
                  borderRadius: 18,
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
                  display: 'grid',
                  gridTemplateColumns: 'minmax(160px, 240px) 1fr',
                  border: '2px solid rgba(232,146,74,0.25)',
                }}>
                  <div style={{ position: 'relative', minWidth: 220, overflow: 'hidden', flexShrink: 0 }}>
                    <span style={{
                      position: 'absolute', top: 12, left: 12, zIndex: 2,
                      background: '#e8924a', color: '#fff',
                      fontSize: 10, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.07em',
                      padding: '3px 10px', borderRadius: 20,
                    }}>Redaktionens val</span>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src="https://commons.wikimedia.org/wiki/Special:FilePath/Midsommar_Pole_-_Maypole_in_Sweden.jpg?width=480"
                      alt="Midsommar i skärgården"
                      style={{ width: '100%', height: '100%', minHeight: 200, objectFit: 'cover', display: 'block' }}
                    />
                  </div>
                  <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--sea)', marginBottom: 8, display: 'block' }}>
                      {featured.category} · {featured.readTime}
                    </span>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: '0 0 10px', lineHeight: 1.3 }}>
                      {featured.title}
                    </h2>
                    <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, margin: '0 0 16px' }}>
                      {featured.excerpt}
                    </p>
                    <span style={{ fontSize: 13, color: 'var(--sea)', fontWeight: 700 }}>Läs guiden →</span>
                  </div>
                </article>
              </Link>
            )}

            {/* Transaktionella snabblänkar */}
            <div style={{ marginBottom: 40 }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
                Boka & upplev
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 12 }}>
                {TRANSACTIONAL_LINKS.map(l => (
                  <Link key={l.href} href={l.href} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    background: 'var(--white)', borderRadius: 14, padding: '14px 16px',
                    border: '1px solid rgba(10,123,140,0.10)', textDecoration: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                  }}>
                    <span aria-hidden><Icon name={emojiToIcon(l.emoji)} size={26} /></span>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)' }}>{l.label}</div>
                      <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>{l.sub}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Geografiska sektioner */}
            {ALL_REGIONS.map(region => {
              const guides = getGuidesByRegion(region).filter(g => !g.featured)
              if (guides.length === 0) return null
              const slug = REGION_URL_SLUG[region]
              return (
                <section key={region} style={{ marginBottom: 52 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <h2 style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span aria-hidden style={{ display: 'inline-flex', color: 'var(--sea)' }}><Icon name={emojiToIcon(REGION_EMOJIS[region])} size={20} /></span>
                      {REGION_LABELS[region]}
                      <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)', marginLeft: 4 }}>
                        ({guides.length} guider)
                      </span>
                    </h2>
                    <Link href={`/guider/${slug}`} style={{
                      fontSize: 13, color: 'var(--sea)', fontWeight: 700, textDecoration: 'none',
                      background: 'rgba(10,123,140,0.07)', padding: '6px 14px', borderRadius: 20,
                      whiteSpace: 'nowrap',
                    }}>
                      Visa alla →
                    </Link>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
                    {guides.slice(0, 6).map(g => (
                      <GuideCard key={g.slug} guide={g} />
                    ))}
                  </div>
                  {guides.length > 6 && (
                    <div style={{ marginTop: 14, textAlign: 'center' }}>
                      <Link href={`/guider/${slug}`} style={{
                        fontSize: 13, color: 'var(--sea)', fontWeight: 700, textDecoration: 'none',
                      }}>
                        + {guides.length - 6} fler guider om {REGION_LABELS[region]} →
                      </Link>
                    </div>
                  )}
                </section>
              )
            })}
          </>
        ) : !isSearching ? (
          /* Kategori-filtrerad flat vy */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20 }}>
            {filteredGuides.map(guide => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
            {filteredGuides.length === 0 && (
              <p style={{ color: 'var(--ink-muted)', fontSize: 14, gridColumn: '1 / -1' }}>
                Inga guider i den här kategorin ännu.
              </p>
            )}
          </div>
        ) : null}
      </div>
    </div>
  )
}

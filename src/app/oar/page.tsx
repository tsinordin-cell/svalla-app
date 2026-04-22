import Link from 'next/link'
import type { Metadata } from 'next'
import { ISLANDS } from '@/app/o/island-data'

export const metadata: Metadata = {
  title: 'Alla öar – Stockholms skärgård',
  description: 'Utforska alla 69 öar i Stockholms skärgård. Hitta din nästa destination — från Sandhamn i yttre skärgård till Arholma i norr.',
  openGraph: {
    title: 'Alla öar – Svalla',
    description: '69 öar i Stockholms skärgård, organiserade efter område.',
    url: 'https://svalla.se/oar',
  },
}

// Manually define the 4 display sections matching the nav structure
const SECTIONS = [
  {
    id: 'inner',
    label: 'Innerskärgården',
    emoji: '⚓',
    color: 'var(--sea)',
    bg: 'rgba(30,92,130,0.07)',
    description: 'De närmaste öarna — lätta att nå, perfekta för en dag.',
    slugs: ['fjaderholmarna', 'vaxholm', 'grinda', 'finnhamn', 'rindo', 'resaro'],
  },
  {
    id: 'mellersta',
    label: 'Mellersta skärgården',
    emoji: '⛵',
    color: 'var(--sea)',
    bg: 'rgba(10,123,140,0.07)',
    description: 'Det klassiska skärgårdslivet — Sandhamn, Möja och öarna däremellan.',
    slugs: [
      'sandhamn', 'moja', 'ljustero', 'gallno', 'ingmarso', 'namdo', 'svartso',
      'runmaro', 'husaro', 'kymmendo', 'bullero', 'vindo', 'ingaro', 'kanholmen',
      'svenska-hogarna', 'huvudskar', 'ramskar', 'ekno', 'ormsko', 'norrpada',
      'lindholmen', 'garnsjon', 'storholmen', 'ostanvik', 'korsholmen', 'storskar',
      'bjorko', 'adelsjo',
    ],
  },
  {
    id: 'södra',
    label: 'Södra skärgården',
    emoji: '🌊',
    color: '#2a6e50',
    bg: 'rgba(42,110,80,0.07)',
    description: 'Vilda klippor, öppet hav och Utö — den dramatiska södra skärgården.',
    slugs: [
      'uto', 'dalaro', 'orno', 'landsort', 'nattaro', 'asko', 'galo', 'toro',
      'fjardlang', 'smaadalaro', 'morko', 'musko', 'hasselo', 'langviksskaret',
      'graskar-sodra', 'vastervik-uto', 'aspoja',
    ],
  },
  {
    id: 'norra',
    label: 'Norra skärgården',
    emoji: '🧭',
    color: '#7a4e2d',
    bg: 'rgba(122,78,45,0.07)',
    description: 'Orörda öar, höga klippor och en av Europas ovanligaste mötesplatser.',
    slugs: [
      'arholma', 'furusund', 'blido', 'norrora', 'fejan', 'rodloga', 'singo',
      'lido', 'graddo', 'vaddo', 'yxlan', 'ljusnas', 'graskar', 'iggon',
      'toro-norra', 'langskar', 'ramskar-norra', 'vastana',
    ],
  },
]

// Build a lookup map for fast access
const islandBySlug = Object.fromEntries(ISLANDS.map(i => [i.slug, i]))

export default function OarPage() {
  const totalCount = ISLANDS.length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Header ── */}
      <header style={{
        background: 'linear-gradient(160deg, #0d2440 0%, #1a4a5e 50%, #1e5c72 100%)',
        padding: '56px 24px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(45,125,138,.3) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: 640, margin: '0 auto' }}>
          <Link href="/" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,.6)',
            textDecoration: 'none', marginBottom: 20,
            padding: '6px 14px', borderRadius: 20,
            border: '1px solid rgba(255,255,255,.15)',
            background: 'rgba(255,255,255,.08)',
          }}>
            ← Tillbaka till Svalla
          </Link>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(232,146,74,.9)', letterSpacing: '.12em', textTransform: 'uppercase', marginBottom: 12 }}>
            Stockholms skärgård
          </div>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: 700,
            color: '#fff', margin: '0 0 16px', lineHeight: 1.1,
            fontFamily: 'Georgia, serif',
          }}>
            Alla {totalCount} öar
          </h1>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,.7)', margin: 0, lineHeight: 1.6 }}>
            Från Fjäderholmarna precis utanför Stockholm till Arholma vid gränsen till Åland —
            varje ö har sin egen karaktär.
          </p>
        </div>
      </header>

      {/* ── Area jump links ── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 40,
        background: 'var(--header-bg, rgba(242,248,250,.97))', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,.1)',
        padding: '0 16px',
        display: 'flex', gap: 0, overflowX: 'auto', scrollbarWidth: 'none',
      }}>
        {SECTIONS.map(s => (
          <a key={s.id} href={`#${s.id}`} className="oar-tab" style={{
            flexShrink: 0, padding: '14px 16px',
            fontSize: 13, fontWeight: 600,
            color: s.color, textDecoration: 'none',
            borderBottom: `2px solid transparent`,
            transition: 'border-bottom-color .15s',
          }}>
            {s.emoji} {s.label}
          </a>
        ))}
      </div>

      {/* ── Sections ── */}
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '0 16px 80px' }}>
        {SECTIONS.map(section => {
          const islands = section.slugs.map(s => islandBySlug[s]).filter(Boolean)
          return (
            <section key={section.id} id={section.id} style={{ paddingTop: 40 }}>

              {/* Section header */}
              <div style={{
                display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between',
                flexWrap: 'wrap', gap: 8, marginBottom: 20,
                paddingBottom: 16, borderBottom: `2px solid ${section.color}22`,
              }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                    <span style={{ fontSize: 22 }}>{section.emoji}</span>
                    <h2 style={{ fontSize: 22, fontWeight: 700, color: section.color, margin: 0 }}>
                      {section.label}
                    </h2>
                    <span style={{
                      fontSize: 11, fontWeight: 700, padding: '3px 8px', borderRadius: 12,
                      background: section.bg, color: section.color,
                    }}>
                      {islands.length} öar
                    </span>
                  </div>
                  <p style={{ fontSize: 13, color: 'var(--txt2)', margin: 0 }}>{section.description}</p>
                </div>
              </div>

              {/* Island grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
                gap: 12,
              }}>
                {islands.map(island => (
                  <Link key={island.slug} href={`/o/${island.slug}`} style={{ textDecoration: 'none' }}>
                    <article className="oar-card" style={{
                      background: 'var(--white)',
                      borderRadius: 16,
                      border: '1.5px solid rgba(10,123,140,.08)',
                      padding: '16px 18px',
                      display: 'flex', alignItems: 'flex-start', gap: 14,
                      boxShadow: '0 1px 4px rgba(0,45,60,.05)',
                      cursor: 'pointer',
                    }}>
                      {/* Emoji */}
                      <div style={{
                        flexShrink: 0, width: 44, height: 44,
                        background: section.bg, borderRadius: 12,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 22,
                      }}>
                        {island.emoji}
                      </div>

                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{
                          fontSize: 15, fontWeight: 600, color: 'var(--txt)',
                          marginBottom: 3, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                        }}>
                          {island.name}
                        </div>
                        <div style={{
                          fontSize: 12, color: 'var(--txt2)', lineHeight: 1.4,
                          display: '-webkit-box', WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        }}>
                          {island.tagline}
                        </div>
                        {island.tags?.slice(0, 2).map(tag => (
                          <span key={tag} style={{
                            display: 'inline-block', marginTop: 6, marginRight: 4,
                            fontSize: 10, padding: '2px 7px', borderRadius: 10,
                            background: section.bg, color: section.color, fontWeight: 600,
                          }}>
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Arrow */}
                      <div style={{ flexShrink: 0, color: 'var(--txt3)', fontSize: 16, alignSelf: 'center' }}>›</div>
                    </article>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>

      <style>{`
        .oar-tab:hover { border-bottom-color: currentColor !important; }
        .oar-card { transition: transform .15s, box-shadow .15s; }
        .oar-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,45,60,.12) !important; }
      `}</style>
    </div>
  )
}

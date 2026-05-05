'use client'

import { useState } from 'react'
import Link from 'next/link'
import { EXPERIENCES, type ExperienceCategory } from './experiences-data'

const CATEGORY_LABELS: Record<string, string> = {
  ribbåtstur: 'Ribbåtsturer',
  fisketur: 'Fisketurer',
  kajak: 'Kajak',
  sup: 'SUP',
  dykning: 'Dykning',
  segling: 'Segling',
  naturtur: 'Naturturer',
  kulturtur: 'Kulturturer',
  övrigt: 'Övrigt',
}

const FILTER_TABS = [
  { key: 'alla', label: 'Alla' },
  { key: 'ribbåtstur', label: 'Ribbåtsturer' },
  { key: 'fisketur', label: 'Fisketurer' },
  { key: 'kajak', label: 'Kajak' },
  { key: 'naturtur', label: 'Naturtur' },
  { key: 'övrigt', label: 'Övrigt' },
]

export default function UpplevelserPage() {
  const [activeFilter, setActiveFilter] = useState<string>('alla')

  const filtered = activeFilter === 'alla'
    ? EXPERIENCES
    : EXPERIENCES.filter(e => e.category === activeFilter)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)', paddingBottom: 80 }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a4a6b 0%, #1e6c6c 100%)',
        padding: '72px 24px 56px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.6)',
          marginBottom: 12,
        }}>
          Upplevelser
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}>
          Guidade turer &amp; upplevelser
        </h1>
        <p style={{
          fontSize: 17,
          color: 'rgba(255,255,255,0.8)',
          maxWidth: 560,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Ribbåtsturer, fisketurer, kajakäventyr och mer i Stockholms skärgård — boka direkt med lokala aktörer.
        </p>
      </section>

      {/* Filter-rad */}
      <div style={{
        background: 'var(--surface, #fff)',
        borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))',
        padding: '0 16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}>
        <div style={{
          display: 'flex',
          gap: 4,
          padding: '10px 0',
          width: 'max-content',
          minWidth: '100%',
        }}>
          {FILTER_TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key)}
              style={{
                padding: '7px 16px',
                borderRadius: 20,
                border: 'none',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: activeFilter === tab.key ? 600 : 400,
                background: activeFilter === tab.key
                  ? 'var(--sea, #0a7b8c)'
                  : 'transparent',
                color: activeFilter === tab.key
                  ? '#fff'
                  : 'var(--txt2, #555)',
                transition: 'all 0.15s',
                whiteSpace: 'nowrap',
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div style={{
        maxWidth: 1100,
        margin: '0 auto',
        padding: '32px 20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
        gap: 24,
      }}>
        {filtered.length === 0 ? (
          <p style={{ color: 'var(--txt2, #555)', gridColumn: '1 / -1' }}>
            Inga upplevelser i den här kategorin än — fler kommer snart.
          </p>
        ) : filtered.map(exp => (
          <article
            key={exp.slug}
            style={{
              background: 'var(--surface, #fff)',
              borderRadius: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid var(--border, rgba(0,0,0,0.07))',
            }}
          >
            {/* Card body */}
            <div style={{ padding: '20px 20px 16px', flex: 1 }}>
              {/* Category + Island badges */}
              <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
                <span style={{
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                  color: 'var(--sea, #0a7b8c)',
                  background: 'var(--teal-10, rgba(10,123,140,0.1))',
                  padding: '3px 9px',
                  borderRadius: 20,
                }}>
                  {CATEGORY_LABELS[exp.category] ?? exp.category}
                </span>
                <Link
                  href={`/o/${exp.islandSlug}`}
                  style={{
                    fontSize: 11,
                    fontWeight: 500,
                    color: 'var(--txt3, #888)',
                    background: 'var(--bg, #f8f7f4)',
                    padding: '3px 9px',
                    borderRadius: 20,
                    textDecoration: 'none',
                  }}
                >
                  {exp.islandName}
                </Link>
              </div>

              {/* Name */}
              <h2 style={{
                fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                fontSize: 19,
                fontWeight: 700,
                color: 'var(--txt, #1a1a1a)',
                margin: '0 0 8px',
                lineHeight: 1.25,
              }}>
                {exp.name}
              </h2>

              {/* Provider */}
              <p style={{ fontSize: 13, color: 'var(--txt3, #888)', margin: '0 0 10px' }}>
                {exp.provider}
              </p>

              {/* Meta row */}
              <div style={{ display: 'flex', gap: 16, marginBottom: 12 }}>
                <span style={{ fontSize: 13, color: 'var(--txt2, #555)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                  </svg>
                  {exp.duration}
                </span>
                <span style={{ fontSize: 13, color: 'var(--txt2, #555)', display: 'flex', alignItems: 'center', gap: 4 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                    <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                  </svg>
                  {exp.price}
                </span>
              </div>

              {/* Description */}
              <p style={{
                fontSize: 14,
                color: 'var(--txt2, #555)',
                lineHeight: 1.6,
                margin: 0,
              }}>
                {exp.description}
              </p>
            </div>

            {/* Card footer */}
            <div style={{
              padding: '14px 20px 18px',
              borderTop: '1px solid var(--border, rgba(0,0,0,0.07))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}>
              <span style={{ fontSize: 12, color: 'var(--txt3, #888)' }}>
                {exp.season}
              </span>
              <a
                href={exp.bookingUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  background: 'var(--sea, #0a7b8c)',
                  color: '#fff',
                  fontWeight: 600,
                  fontSize: 14,
                  padding: '9px 18px',
                  borderRadius: 8,
                  textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
              >
                Boka nu →
              </a>
            </div>
          </article>
        ))}
      </div>

      {/* Disclaimer */}
      <p style={{
        textAlign: 'center',
        fontSize: 12,
        color: 'var(--txt3, #888)',
        maxWidth: 560,
        margin: '0 auto',
        padding: '0 24px 32px',
        lineHeight: 1.6,
      }}>
        Svalla kan få provision när du bokar via våra länkar. Det påverkar inte priset du betalar.
      </p>
    </main>
  )
}

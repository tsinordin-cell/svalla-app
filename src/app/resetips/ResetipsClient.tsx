'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TRIPS, type TripDifficulty } from './trips-data'

const DIFFICULTY_LABEL: Record<TripDifficulty, string> = {
  lätt: 'Lätt',
  medel: 'Medel',
  krävande: 'Krävande',
}

const DIFFICULTY_COLOR: Record<TripDifficulty, string> = {
  lätt: '#2a9d5c',
  medel: '#e07b2a',
  krävande: '#c0392b',
}

const STOP_ICONS: Record<string, string> = {
  transport: '⛵',
  mat: '🍽',
  kultur: '🏛',
  natur: '🌿',
  bad: '🏊',
  aktivitet: '🎯',
  boende: '🏡',
}

const FILTER_TABS = [
  { key: 'alla', label: 'Alla turer' },
  { key: 'lätt', label: 'Lätt' },
  { key: 'medel', label: 'Medel' },
  { key: 'krävande', label: 'Krävande' },
]

export default function ResetipsClient() {
  const [activeFilter, setActiveFilter] = useState<string>('alla')

  const filtered = activeFilter === 'alla'
    ? TRIPS
    : TRIPS.filter(t => t.difficulty === activeFilter)

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)', paddingBottom: 80 }}>
      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a5c 0%, #1e5c47 100%)',
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
          Resetips
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(28px, 5vw, 48px)',
          fontWeight: 700,
          color: '#fff',
          margin: '0 0 16px',
          lineHeight: 1.2,
        }}>
          Kuraterade skärgårdsrutter
        </h1>
        <p style={{
          fontSize: 17,
          color: 'rgba(255,255,255,0.8)',
          maxWidth: 580,
          margin: '0 auto',
          lineHeight: 1.6,
        }}>
          Kompletta dagsrutter med stopp, tips och praktisk info — planerade av folk som faktiskt gjort dem.
        </p>
      </section>

      {/* Filter */}
      <div style={{
        background: 'var(--surface, #fff)',
        borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))',
        padding: '0 16px',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        scrollbarWidth: 'none',
      }}>
        <div style={{ display: 'flex', gap: 4, padding: '10px 0', width: 'max-content', minWidth: '100%' }}>
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
                background: activeFilter === tab.key ? 'var(--sea, #0a7b8c)' : 'transparent',
                color: activeFilter === tab.key ? '#fff' : 'var(--txt2, #555)',
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 24,
      }}>
        {filtered.map(trip => (
          <Link
            key={trip.slug}
            href={`/resetips/${trip.slug}`}
            style={{ textDecoration: 'none' }}
          >
            <article style={{
              background: 'var(--surface, #fff)',
              borderRadius: 14,
              boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
              border: '1px solid var(--border, rgba(0,0,0,0.07))',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              height: '100%',
              transition: 'transform 0.15s, box-shadow 0.15s',
              cursor: 'pointer',
            }}>
              <div style={{ padding: '20px 20px 16px', flex: 1 }}>
                {/* Badges */}
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase',
                    color: DIFFICULTY_COLOR[trip.difficulty],
                    background: `${DIFFICULTY_COLOR[trip.difficulty]}18`,
                    padding: '3px 9px', borderRadius: 20,
                  }}>
                    {DIFFICULTY_LABEL[trip.difficulty]}
                  </span>
                  <span style={{
                    fontSize: 11, fontWeight: 500,
                    color: 'var(--txt3, #888)',
                    background: 'var(--bg, #f8f7f4)',
                    padding: '3px 9px', borderRadius: 20,
                  }}>
                    {trip.transport}
                  </span>
                </div>

                {/* Title */}
                <h2 style={{
                  fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                  fontSize: 19,
                  fontWeight: 700,
                  color: 'var(--txt, #1a1a1a)',
                  margin: '0 0 8px',
                  lineHeight: 1.25,
                }}>
                  {trip.title}
                </h2>

                <p style={{ fontSize: 14, color: 'var(--txt2, #555)', lineHeight: 1.6, margin: '0 0 16px' }}>
                  {trip.tagline}
                </p>

                {/* Stop preview */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {trip.stops.slice(0, 3).map((stop, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'var(--txt2, #555)' }}>
                      <span style={{ fontSize: 14, flexShrink: 0 }}>{STOP_ICONS[stop.type]}</span>
                      <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{stop.name}</span>
                    </div>
                  ))}
                  {trip.stops.length > 3 && (
                    <div style={{ fontSize: 13, color: 'var(--txt3, #aaa)', paddingLeft: 22 }}>
                      +{trip.stops.length - 3} stopp till
                    </div>
                  )}
                </div>
              </div>

              {/* Footer */}
              <div style={{
                padding: '12px 20px 16px',
                borderTop: '1px solid var(--border, rgba(0,0,0,0.07))',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: 12, color: 'var(--txt3, #888)' }}>
                  ⏱ {trip.duration}
                </span>
                <span style={{
                  fontSize: 14, fontWeight: 600,
                  color: 'var(--sea, #0a7b8c)',
                }}>
                  Se rutten →
                </span>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </main>
  )
}

'use client'
/**
 * AventyrClient — gemensam UI för /gotland/aventyr, /aland/aventyr,
 * /oland/aventyr. Tar emot Destination-objekt och renderar lista + filter.
 *
 * Filter via URL-state (?transport=bil) så delning av filtrerade vyer
 * fungerar. Klient-side rendering eftersom filterklick bara byter visning.
 */
import { useState, useMemo } from 'react'
import Link from 'next/link'
import type { Destination, Transport } from '@/data/aventyr'
import { TRANSPORT_LABEL, TRANSPORT_EMOJI } from '@/data/aventyr'

interface Props {
  destination: Destination
}

type Filter = Transport | 'alla'

export default function AventyrClient({ destination }: Props) {
  const [filter, setFilter] = useState<Filter>('alla')

  const visade = useMemo(() => {
    if (filter === 'alla') return destination.aventyr
    return destination.aventyr.filter(a => a.transport === filter)
  }, [destination.aventyr, filter])

  const counts = useMemo(() => ({
    alla: destination.aventyr.length,
    bil: destination.aventyr.filter(a => a.transport === 'bil').length,
    kollektivt: destination.aventyr.filter(a => a.transport === 'kollektivt').length,
    cykel: destination.aventyr.filter(a => a.transport === 'cykel').length,
  }), [destination.aventyr])

  return (
    <main style={{
      maxWidth: 1100,
      margin: '0 auto',
      padding: '32px 20px 80px',
      paddingBottom: 'calc(80px + env(safe-area-inset-bottom, 0px))',
    }}>
      {/* Hero */}
      <header style={{ marginBottom: 32 }}>
        <div style={{
          fontSize: 11, fontWeight: 700, letterSpacing: '1.5px',
          textTransform: 'uppercase', color: 'var(--accent, #c96e2a)',
          marginBottom: 10,
        }}>
          Praktiska äventyr · {destination.namn}
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: 800,
          margin: 0,
          color: 'var(--txt, #0d2440)',
          letterSpacing: '-0.5px',
          lineHeight: 1.15,
        }}>
          {destination.introTitle}
        </h1>
        <p style={{
          fontSize: 16,
          color: 'var(--txt2, #4a5568)',
          margin: '14px 0 0',
          maxWidth: 720,
          lineHeight: 1.6,
        }}>
          {destination.introDescription}
        </p>
      </header>

      {/* Filter */}
      <nav aria-label="Transportfilter" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        marginBottom: 28,
      }}>
        {([
          { value: 'alla' as Filter,        label: 'Alla',            count: counts.alla },
          { value: 'bil' as Filter,         label: 'Med bil',         count: counts.bil },
          { value: 'kollektivt' as Filter,  label: 'Kollektivt',      count: counts.kollektivt },
          { value: 'cykel' as Filter,       label: 'Med cykel',       count: counts.cykel },
        ]).map(({ value, label, count }) => {
          const aktiv = value === filter
          return (
            <button
              key={value}
              onClick={() => setFilter(value)}
              style={{
                padding: '8px 16px',
                borderRadius: 999,
                fontSize: 13,
                fontWeight: 600,
                border: '1px solid',
                borderColor: aktiv ? 'var(--sea, #1e5c82)' : 'rgba(10,123,140,0.18)',
                background: aktiv ? 'var(--sea, #1e5c82)' : 'var(--white, #fff)',
                color: aktiv ? '#fff' : 'var(--txt, #0d2440)',
                cursor: 'pointer',
                transition: 'all 120ms ease',
                fontFamily: 'inherit',
              }}
            >
              {label} <span style={{ opacity: 0.65, fontWeight: 400 }}>· {count}</span>
            </button>
          )
        })}
      </nav>

      {/* Lista */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: 18,
      }}>
        {visade.map(a => (
          <article
            key={a.slug}
            style={{
              background: 'var(--white, #fff)',
              borderRadius: 18,
              boxShadow: '0 1px 10px rgba(0,45,60,0.08)',
              border: '1px solid rgba(10,123,140,0.06)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            {/* Topp med emoji + transport-badge */}
            <div style={{
              padding: '32px 20px',
              textAlign: 'center',
              background: 'linear-gradient(135deg, rgba(30,92,130,0.10) 0%, rgba(10,123,140,0.06) 100%)',
              fontSize: 48,
              lineHeight: 1,
              position: 'relative',
              minHeight: 120,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span>{a.emoji}</span>
              <span style={{
                position: 'absolute',
                top: 10,
                right: 10,
                background: 'var(--white, #fff)',
                color: 'var(--sea, #1e5c82)',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.4px',
                padding: '4px 9px',
                borderRadius: 999,
                textTransform: 'uppercase',
                border: '1px solid rgba(10,123,140,0.15)',
              }}>
                {TRANSPORT_EMOJI[a.transport]} {TRANSPORT_LABEL[a.transport]}
              </span>
            </div>

            {/* Body */}
            <div style={{
              padding: '18px 20px 20px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1,
            }}>
              <h2 style={{
                fontSize: 17,
                fontWeight: 700,
                margin: '0 0 8px',
                color: 'var(--txt, #0d2440)',
                lineHeight: 1.3,
                letterSpacing: '-0.2px',
              }}>
                {a.title}
              </h2>
              <p style={{
                fontSize: 13.5,
                color: 'var(--txt2, #4a5568)',
                margin: '0 0 14px',
                lineHeight: 1.55,
                flex: 1,
              }}>
                {a.beskrivning}
              </p>
              {/* Praktiska detaljer */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                gap: 6,
                fontSize: 12,
                color: 'var(--txt3, #718096)',
                paddingTop: 12,
                borderTop: '1px solid rgba(10,123,140,0.08)',
              }}>
                <div><strong style={{ color: 'var(--txt2, #4a5568)' }}>Tid:</strong> {a.ungefarTid}</div>
                <div><strong style={{ color: 'var(--txt2, #4a5568)' }}>Bästa månad:</strong> {a.bastaManad}</div>
                <div><strong style={{ color: 'var(--txt2, #4a5568)' }}>Start:</strong> {a.startPunkt}</div>
              </div>
            </div>
          </article>
        ))}
      </section>

      {visade.length === 0 && (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          color: 'var(--txt3, #718096)',
        }}>
          Inga äventyr med det filtret.
        </div>
      )}

      {/* CTA — Planera-knapp */}
      <div style={{
        marginTop: 48,
        padding: '32px 24px',
        background: 'linear-gradient(135deg, #1e5c82 0%, #0a7b8c 100%)',
        borderRadius: 20,
        textAlign: 'center',
        color: '#fff',
      }}>
        <h2 style={{
          fontSize: 22, fontWeight: 800, margin: '0 0 10px',
          letterSpacing: '-0.3px',
        }}>
          Vill du ha hjälp att planera din tur?
        </h2>
        <p style={{
          fontSize: 14.5, lineHeight: 1.6, margin: '0 0 22px',
          color: 'rgba(255,255,255,0.85)',
          maxWidth: 540, marginInline: 'auto',
        }}>
          Thorkel är vår skärgårdsguide som hjälper dig att sätta ihop en
          dagstur eller helgtur baserat på vart du vill, hur du reser och
          vad du gillar att göra.
        </p>
        <Link
          href="/planera"
          style={{
            display: 'inline-block',
            padding: '14px 28px',
            background: '#fff',
            color: 'var(--sea, #1e5c82)',
            borderRadius: 999,
            fontSize: 14,
            fontWeight: 800,
            textDecoration: 'none',
            letterSpacing: '0.2px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.18)',
          }}
        >
          Planera din tur med Thorkel →
        </Link>
      </div>
    </main>
  )
}

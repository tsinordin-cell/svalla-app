'use client'

import { useState } from 'react'
import Link from 'next/link'
import { TRIPS, type TripDifficulty, type TransportTag } from './trips-data'
import Icon, { type IconName } from '@/components/Icon'

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

const STOP_ICONS: Record<string, IconName> = {
  transport: 'sailboat',
  mat: 'utensils',
  kultur: 'building',
  natur: 'leaf',
  bad: 'waves',
  aktivitet: 'target',
  boende: 'bed',
}

const TRANSPORT_OPTIONS: { key: TransportTag; label: string; icon: IconName }[] = [
  { key: 'båt',   label: 'Båt / färja', icon: 'ship' },
  { key: 'buss',  label: 'Buss',        icon: 'map' },
  { key: 'tåg',   label: 'Tåg',         icon: 'navigation' },
  { key: 'bil',   label: 'Bil',         icon: 'map' },
  { key: 'cykel', label: 'Cykel',       icon: 'navigation' },
]

const DIFFICULTY_OPTIONS: { key: TripDifficulty; label: string; color: string }[] = [
  { key: 'lätt',     label: 'Lätt',     color: '#2a9d5c' },
  { key: 'medel',    label: 'Medel',    color: '#e07b2a' },
  { key: 'krävande', label: 'Krävande', color: '#c0392b' },
]

export default function ResetipsClient() {
  const [diffFilters, setDiffFilters]      = useState<Set<TripDifficulty>>(new Set())
  const [transportFilters, setTransport]   = useState<Set<TransportTag>>(new Set())

  function toggleDiff(val: TripDifficulty) {
    setDiffFilters(prev => {
      const next = new Set(prev)
      next.has(val) ? next.delete(val) : next.add(val)
      return next
    })
  }

  function toggleTransport(val: TransportTag) {
    setTransport(prev => {
      const next = new Set(prev)
      next.has(val) ? next.delete(val) : next.add(val)
      return next
    })
  }

  function removeDiff(val: TripDifficulty) {
    setDiffFilters(prev => { const n = new Set(prev); n.delete(val); return n })
  }

  function removeTransport(val: TransportTag) {
    setTransport(prev => { const n = new Set(prev); n.delete(val); return n })
  }

  function clearAll() {
    setDiffFilters(new Set())
    setTransport(new Set())
  }

  const hasFilters = diffFilters.size > 0 || transportFilters.size > 0

  const filtered = TRIPS.filter(trip => {
    if (diffFilters.size > 0 && !diffFilters.has(trip.difficulty)) return false
    if (transportFilters.size > 0) {
      const hasMatch = trip.transportTags.some(t => transportFilters.has(t))
      if (!hasMatch) return false
    }
    return true
  })

  // chip style helper
  const chip = (active: boolean, activeColor = '#0d2440'): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 5,
    padding: '6px 14px',
    borderRadius: 20,
    border: `1px solid ${active ? activeColor : 'rgba(0,0,0,0.12)'}`,
    fontSize: 13,
    fontWeight: active ? 600 : 400,
    cursor: 'pointer',
    whiteSpace: 'nowrap' as const,
    background: active ? activeColor : 'transparent',
    color: active ? '#fff' : 'var(--txt2, #555)',
    transition: 'all 0.13s',
  })

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg, #f8f7f4)', paddingBottom: 80 }}>

      {/* Hero */}
      <section style={{
        background: 'linear-gradient(135deg, #1a3a5c 0%, #1e5c47 100%)',
        padding: '72px 24px 56px',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: 12, fontWeight: 700, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: 12,
        }}>
          Resetips
        </p>
        <h1 style={{
          fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
          fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 700,
          color: '#fff', margin: '0 0 16px', lineHeight: 1.2,
        }}>
          Kuraterade skärgårdsrutter
        </h1>
        <p style={{ fontSize: 17, color: 'rgba(255,255,255,0.8)', maxWidth: 580, margin: '0 auto', lineHeight: 1.6 }}>
          Kompletta dagsrutter med stopp, tips och praktisk info — planerade av folk som faktiskt gjort dem.
        </p>
      </section>

      {/* Filter bar */}
      <div style={{
        background: 'var(--surface, #fff)',
        borderBottom: '1px solid var(--border, rgba(0,0,0,0.08))',
        padding: '12px 20px',
      }}>

        {/* Svårighet */}
        <div style={{ marginBottom: 10 }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--txt3, #aaa)', marginBottom: 7 }}>
            Svårighet
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {DIFFICULTY_OPTIONS.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => toggleDiff(key)}
                style={chip(diffFilters.has(key), '#0d2440')}
              >
                <span style={{ color: diffFilters.has(key) ? '#fff' : color, fontSize: 10 }}>●</span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Separator */}
        <div style={{ height: 1, background: 'rgba(0,0,0,0.06)', margin: '10px 0' }} />

        {/* Transport */}
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.09em', textTransform: 'uppercase', color: 'var(--txt3, #aaa)', marginBottom: 7 }}>
            Transport — välj ett eller flera
          </p>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {TRANSPORT_OPTIONS.map(({ key, label, icon }) => (
              <button
                key={key}
                onClick={() => toggleTransport(key)}
                style={chip(transportFilters.has(key), '#0a7b8c')}
              >
                <span aria-hidden style={{ display: 'inline-flex' }}><Icon name={icon} size={13} /></span>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Active filter pills */}
        {hasFilters && (
          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 6, marginTop: 12 }}>
            {[...diffFilters].map(v => (
              <span key={v} style={{
                display: 'inline-flex', alignItems: 'center', gap: 5,
                padding: '3px 10px', borderRadius: 20,
                background: 'rgba(13,36,64,0.1)', color: '#0d2440',
                fontSize: 12, fontWeight: 500,
              }}>
                {DIFFICULTY_LABEL[v]}
                <button onClick={() => removeDiff(v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0d2440', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
              </span>
            ))}
            {[...transportFilters].map(v => {
              const opt = TRANSPORT_OPTIONS.find(o => o.key === v)!
              return (
                <span key={v} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 5,
                  padding: '3px 10px', borderRadius: 20,
                  background: 'rgba(10,123,140,0.1)', color: '#0a7b8c',
                  fontSize: 12, fontWeight: 500,
                }}>
                  <span aria-hidden style={{ display: 'inline-flex', verticalAlign: -2 }}><Icon name={opt.icon} size={12} /></span> {opt.label}
                  <button onClick={() => removeTransport(v)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#0a7b8c', fontSize: 14, lineHeight: 1, padding: 0 }}>×</button>
                </span>
              )
            })}
            <button onClick={clearAll} style={{ marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: 12, color: 'var(--txt3, #aaa)', textDecoration: 'underline', fontFamily: 'inherit' }}>
              Rensa alla
            </button>
          </div>
        )}
      </div>

      {/* Count */}
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 20px 0' }}>
        <p style={{ fontSize: 13, color: 'var(--txt3, #aaa)' }}>
          {hasFilters
            ? `Visar ${filtered.length} av ${TRIPS.length} rutter`
            : `Visar alla ${TRIPS.length} rutter`}
        </p>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--txt2, #555)' }}>
          <p style={{ fontSize: 16, marginBottom: 12 }}>Inga rutter matchar dina filter.</p>
          <button onClick={clearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--sea, #0a7b8c)', fontSize: 14, textDecoration: 'underline', fontFamily: 'inherit' }}>
            Rensa filter
          </button>
        </div>
      ) : (
        <div style={{
          maxWidth: 1100, margin: '0 auto',
          padding: '20px 20px 0',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: 24,
        }}>
          {filtered.map(trip => (
            <Link key={trip.slug} href={`/resetips/${trip.slug}`} style={{ textDecoration: 'none' }}>
              <article style={{
                background: 'var(--surface, #fff)',
                borderRadius: 14,
                boxShadow: '0 2px 12px rgba(0,0,0,0.07)',
                border: '1px solid var(--border, rgba(0,0,0,0.07))',
                overflow: 'hidden',
                display: 'flex', flexDirection: 'column', height: '100%',
                transition: 'transform 0.15s, box-shadow 0.15s',
                cursor: 'pointer',
              }}>
                <div style={{ padding: '20px 20px 16px', flex: 1 }}>

                  {/* Badges */}
                  <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                    {trip.featured && (
                      <span style={{
                        fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                        color: '#fff', background: 'var(--sea, #0a7b8c)', padding: '3px 9px', borderRadius: 20,
                      }}>★ Redaktionens val</span>
                    )}
                    <span style={{
                      fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
                      color: DIFFICULTY_COLOR[trip.difficulty],
                      background: `${DIFFICULTY_COLOR[trip.difficulty]}18`,
                      padding: '3px 9px', borderRadius: 20,
                    }}>
                      {DIFFICULTY_LABEL[trip.difficulty]}
                    </span>
                    {trip.transportTags.map(tag => {
                      const opt = TRANSPORT_OPTIONS.find(o => o.key === tag)
                      if (!opt) return null
                      const isActive = transportFilters.has(tag)
                      return (
                        <span key={tag} style={{
                          fontSize: 11, fontWeight: 500,
                          color: isActive ? '#fff' : 'var(--txt3, #888)',
                          background: isActive ? '#0a7b8c' : 'var(--bg, #f8f7f4)',
                          padding: '3px 9px', borderRadius: 20,
                          transition: 'all 0.15s',
                        }}>
                          <span aria-hidden style={{ display: 'inline-flex', verticalAlign: -2 }}><Icon name={opt.icon} size={12} /></span> {opt.label}
                        </span>
                      )
                    })}
                  </div>

                  {/* Title */}
                  <h2 style={{
                    fontFamily: 'var(--font-playfair, "Playfair Display", Georgia, serif)',
                    fontSize: 19, fontWeight: 700,
                    color: 'var(--txt, #1a1a1a)', margin: '0 0 8px', lineHeight: 1.25,
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
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  <span style={{ fontSize: 12, color: 'var(--txt3, #888)' }}>⏱ {trip.duration}</span>
                  <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea, #0a7b8c)' }}>Se rutten →</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}

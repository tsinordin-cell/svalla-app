'use client'
/**
 * SummerCampaign2026Banner
 * Stängbar banner högst upp i feeden som pumpar säsongsstart 2026.
 *
 * Visningslogik:
 *  - Visas mellan 2026-04-15 och 2026-06-30
 *  - Stängs permanent när användaren klickat X (localStorage-flagga)
 *  - Countdown till 2026-05-01 (officiell säsongsstart) innan, därefter "Säsongen är igång"
 *  - Länkar till /leaderboard?period=sommar2026 (skapas separat)
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY  = 'svalla.summer2026.dismissed.v1'
const CAMPAIGN_END = new Date('2026-07-01T00:00:00Z').getTime()
const SEASON_START = new Date('2026-05-01T00:00:00+02:00').getTime()

function fmtCountdown(ms: number): string {
  if (ms <= 0) return ''
  const days  = Math.floor(ms / 86_400_000)
  const hours = Math.floor((ms % 86_400_000) / 3_600_000)
  if (days >= 2)  return `${days} dagar kvar`
  if (days === 1) return `1 dag ${hours} h kvar`
  return `${hours} h kvar`
}

export default function SummerCampaign2026Banner() {
  const [dismissed, setDismissed] = useState(true) // default true → undvik flash innan vi läst storage
  const [now, setNow] = useState(() => Date.now())

  useEffect(() => {
    try {
      const v = localStorage.getItem(STORAGE_KEY)
      setDismissed(v === '1')
    } catch { setDismissed(false) }
  }, [])

  // Uppdatera "now" varje minut så countdown rullar utan att tvinga re-render på allt
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 60_000)
    return () => clearInterval(id)
  }, [])

  if (dismissed) return null
  if (now >= CAMPAIGN_END) return null

  const beforeStart = now < SEASON_START
  const title   = beforeStart ? 'Sommaren 2026 ⚓' : 'Sommaren är här'
  const sub     = beforeStart
    ? `Säsongen öppnar 1 maj. ${fmtCountdown(SEASON_START - now)}.`
    : 'Logga din första tur för sommarmärket ☀️'
  const cta     = beforeStart ? 'Förbered säsongen' : 'Se topplistan'
  const href    = beforeStart ? '/upptack' : '/topplista'

  function close() {
    try { localStorage.setItem(STORAGE_KEY, '1') } catch {}
    setDismissed(true)
  }

  return (
    <div
      role="region"
      aria-label="Sommaren 2026"
      style={{
        position: 'relative',
        margin: '0 12px 14px',
        padding: '14px 46px 14px 16px',
        borderRadius: 16,
        background: beforeStart
          ? 'linear-gradient(135deg,#1e5c82 0%, #2d7d8a 45%, #4a9dbf 100%)'
          : 'linear-gradient(135deg,#c96e2a 0%, #e8964e 50%, #f4b878 100%)',
        color: '#fff',
        boxShadow: '0 4px 18px rgba(30,92,130,0.28)',
        overflow: 'hidden',
      }}
    >
      {/* Dekorativ våg */}
      <span aria-hidden style={{
        position: 'absolute', right: -20, bottom: -14, fontSize: 96, opacity: 0.15,
        pointerEvents: 'none', userSelect: 'none', lineHeight: 1,
      }}>{beforeStart ? '⚓' : '☀️'}</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <strong style={{ fontSize: 15, fontWeight: 800, letterSpacing: 0.2 }}>{title}</strong>
      </div>
      <p style={{ margin: '0 0 10px', fontSize: 13, opacity: 0.94, lineHeight: 1.4, maxWidth: 320 }}>
        {sub}
      </p>
      <Link
        href={href}
        className="press-feedback"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '8px 14px', borderRadius: 10,
          background: 'rgba(255,255,255,0.18)',
          border: '1px solid rgba(255,255,255,0.3)',
          color: '#fff', fontSize: 12.5, fontWeight: 700, textDecoration: 'none',
          backdropFilter: 'blur(6px)',
        }}
      >
        {cta}
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6l6 6-6 6" />
        </svg>
      </Link>

      <button
        onClick={close}
        aria-label="Stäng banner"
        style={{
          position: 'absolute', top: 8, right: 8, width: 28, height: 28,
          borderRadius: '50%', border: 'none',
          background: 'rgba(255,255,255,0.18)', color: '#fff',
          cursor: 'pointer', fontSize: 14, lineHeight: 1,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  )
}

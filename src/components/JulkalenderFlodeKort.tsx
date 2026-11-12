'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { kalenderPagar, oppnaLuckor } from '@/lib/julkalender'
import { track } from '@/lib/analytics-events'

/**
 * Kort överst i flödet för inloggade, 1–24 december (2026-11-12).
 * Där de inloggade faktiskt är varje dag. ?julkalender=1 visar det i förväg.
 */
export default function JulkalenderFlodeKort() {
  const [dag, setDag] = useState<number | null>(null)

  useEffect(() => {
    const forhand = new URLSearchParams(window.location.search).get('julkalender') === '1'
    if (kalenderPagar()) setDag(oppnaLuckor())
    else if (forhand) setDag(1)
  }, [])

  if (dag === null) return null

  return (
    <Link
      href="/julkalender"
      onClick={() => track('julkalender_klick', { plats: 'flode', dag })}
      style={{
        display: 'flex', alignItems: 'center', gap: 14, margin: '0 0 14px', padding: '14px 16px',
        borderRadius: 16, textDecoration: 'none', color: '#0f2f40',
        background: 'linear-gradient(135deg,#eef3f8 0%,#f7ebe6 100%)', border: '1px solid rgba(192,57,43,0.25)',
      }}
    >
      <svg width="34" height="44" viewBox="0 0 44 58" aria-hidden="true" style={{ flexShrink: 0 }}>
        <rect x="6" y="22" width="32" height="30" rx="3" fill="#c0392b" />
        <rect x="4" y="16" width="36" height="9" rx="2" fill="#d94a3a" />
        <rect x="19" y="16" width="6" height="36" fill="#f2c230" />
        <path d="M22 16 C14 6 8 12 16 16 M22 16 C30 6 36 12 28 16" stroke="#f2c230" strokeWidth="3" fill="none" />
        <text x="22" y="45" textAnchor="middle" fontSize="15" fontWeight="700" fill="#fff" fontFamily="Georgia">{dag}</text>
      </svg>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: '.12em', color: '#b5591a' }}>SVALLAS JULKALENDER</div>
        <div style={{ fontSize: 16, fontWeight: 700, marginTop: 2 }}>Lucka {dag} är öppen</div>
        <div style={{ fontSize: 13, color: '#4a626e', marginTop: 2 }}>Dagens skärgårdstips väntar på dig</div>
      </div>
      <span style={{ fontSize: 20, color: '#b5591a', fontWeight: 700 }} aria-hidden="true">→</span>
    </Link>
  )
}

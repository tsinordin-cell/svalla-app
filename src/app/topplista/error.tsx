'use client'
import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => { Sentry.captureException(error) }, [error])

  return (
    <div style={{
      minHeight: '60dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <div style={{ marginBottom: 12 }}>
        <svg width={44} height={44} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" opacity={0.5}>
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/>
          <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
          <path d="M4 22h16"/>
          <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
          <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
          <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
        </svg>
      </div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: '0 0 8px' }}>
        Topplistan kunde inte laddas
      </h2>
      <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', maxWidth: 300, lineHeight: 1.5 }}>
        Rankinglistan är tillfälligt otillgänglig.
      </p>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <button
          onClick={reset}
          className="press-feedback"
          style={{
            padding: '11px 22px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'var(--grad-sea)',
            color: '#fff', fontSize: 14, fontWeight: 700,
          }}
        >
          Försök igen
        </button>
        <a
          href="/feed"
          className="press-feedback"
          style={{
            padding: '11px 22px', borderRadius: 14,
            border: '1.5px solid rgba(10,123,140,0.2)',
            background: 'var(--white)', color: 'var(--txt2)',
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center',
          }}
        >
          Till flödet
        </a>
      </div>
    </div>
  )
}

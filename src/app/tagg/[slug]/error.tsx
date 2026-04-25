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
      <div style={{ fontSize: 44, marginBottom: 12 }}>🏷️</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: '0 0 8px' }}>
        Taggen kunde inte laddas
      </h2>
      <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', maxWidth: 300, lineHeight: 1.5 }}>
        Taggssidan är tillfälligt otillgänglig.
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

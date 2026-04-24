'use client'
import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const [showDetails, setShowDetails] = useState(false)

  useEffect(() => {
    // Logga till console så vi kan se det i browsern
    console.error('[feed/error.tsx] caught:', error)
    console.error('[feed/error.tsx] message:', error.message)
    console.error('[feed/error.tsx] stack:', error.stack)
    console.error('[feed/error.tsx] digest:', error.digest)
    Sentry.captureException(error)
  }, [error])

  // Automatisk recovery vid ChunkLoadError — hårdladda sidan
  useEffect(() => {
    const isChunkError =
      error.name === 'ChunkLoadError' ||
      /Loading chunk|ChunkLoadError|Failed to fetch dynamically imported module/i.test(error.message ?? '')
    if (isChunkError && typeof window !== 'undefined') {
      // Rensa SW-cache och reload — deploy har skett sedan sidan laddades
      if ('serviceWorker' in navigator) {
        navigator.serviceWorker.getRegistrations().then(regs => {
          return Promise.all(regs.map(r => r.unregister()))
        }).finally(() => {
          window.location.reload()
        })
      } else {
        window.location.reload()
      }
    }
  }, [error])

  return (
    <div style={{
      minHeight: '60dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: '40px 24px', textAlign: 'center',
    }}>
      <div style={{ fontSize: 44, marginBottom: 12 }}>⛵</div>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)', margin: '0 0 8px' }}>
        Flödet kunde inte laddas
      </h2>
      <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', maxWidth: 320, lineHeight: 1.5 }}>
        Turfeedsen är tillfälligt otillgänglig. Försök igen om en stund.
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
        <button
          onClick={() => {
            if ('serviceWorker' in navigator) {
              navigator.serviceWorker.getRegistrations().then(regs => {
                return Promise.all(regs.map(r => r.unregister()))
              }).finally(() => window.location.reload())
            } else {
              window.location.reload()
            }
          }}
          className="press-feedback"
          style={{
            padding: '11px 22px', borderRadius: 14,
            border: '1.5px solid rgba(10,123,140,0.25)',
            background: 'var(--white)', color: 'var(--txt2)',
            fontSize: 14, fontWeight: 600, cursor: 'pointer',
          }}
        >
          Rensa cache & ladda om
        </button>
        <a
          href="/"
          className="press-feedback"
          style={{
            padding: '11px 22px', borderRadius: 14,
            border: '1.5px solid rgba(10,123,140,0.2)',
            background: 'var(--white)', color: 'var(--txt2)',
            fontSize: 14, fontWeight: 600, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center',
          }}
        >
          Startsidan
        </a>
      </div>

      {/* Debug-info — endast synligt när man klickar */}
      <button
        onClick={() => setShowDetails(v => !v)}
        style={{
          marginTop: 28, background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 11, color: 'var(--txt3)', textDecoration: 'underline',
        }}
      >
        {showDetails ? 'Dölj feldetaljer' : 'Visa feldetaljer'}
      </button>
      {showDetails && (
        <pre style={{
          marginTop: 10, padding: 12, borderRadius: 10,
          background: 'rgba(0,0,0,0.05)', color: 'var(--txt2)',
          fontSize: 11, textAlign: 'left', maxWidth: 560, width: '100%',
          overflow: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word',
          maxHeight: 240,
        }}>
{`name:    ${error.name}
message: ${error.message}
digest:  ${error.digest ?? '(none)'}
stack:
${error.stack ?? '(no stack)'}`}
        </pre>
      )}
    </div>
  )
}

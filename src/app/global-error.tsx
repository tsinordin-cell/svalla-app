'use client'
import { useEffect } from 'react'
import * as Sentry from '@sentry/nextjs'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Rapportera kritiska fel till Sentry
    Sentry.captureException(error)
  }, [error])

  return (
    <html lang="sv">
      <body style={{
        margin: 0, minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 24, textAlign: 'center', fontFamily: 'system-ui, sans-serif',
        background: 'linear-gradient(175deg, #dde9f5 0%, #e4eff8 40%, #e8f0f5 100%)',
      }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>⚓</div>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 8px' }}>
          Något gick fel
        </h1>
        <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', maxWidth: 320, lineHeight: 1.5 }}>
          Ett oväntat fel uppstod. Försök igen eller gå tillbaka till flödet.
        </p>
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={reset} style={{
            padding: '12px 24px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'var(--grad-sea)',
            color: '#fff', fontSize: 14, fontWeight: 700,
          }}>
            Försök igen
          </button>
          <a href="/feed" style={{
            padding: '12px 24px', borderRadius: 14, border: '1.5px solid rgba(10,123,140,0.2)',
            background: 'var(--white)', color: 'var(--txt2)', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
          }}>
            Till flödet
          </a>
        </div>
      </body>
    </html>
  )
}

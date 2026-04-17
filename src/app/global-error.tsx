'use client'
import { useEffect } from 'react'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Svalla global error]', error)
  }, [error])

  return (
    <html>
      <body style={{
        margin: 0, minHeight: '100vh',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: 24, textAlign: 'center', fontFamily: 'system-ui, sans-serif',
        background: 'linear-gradient(175deg, #dde9f5 0%, #e4eff8 40%, #e8f0f5 100%)',
      }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>⚓</div>
        <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1e5c82', margin: '0 0 8px' }}>
          Något gick fel
        </h1>
        <p style={{ fontSize: 14, color: '#5a8090', margin: '0 0 16px', maxWidth: 320, lineHeight: 1.5 }}>
          {error?.message || 'Ett oväntat fel uppstod.'}
        </p>
        {error?.stack && (
          <pre style={{
            fontSize: 10, color: '#9ab8c8', margin: '0 0 20px', maxWidth: 400,
            textAlign: 'left', background: 'rgba(0,0,0,0.04)', padding: '10px 14px',
            borderRadius: 10, overflow: 'auto', lineHeight: 1.4, whiteSpace: 'pre-wrap',
          }}>
            {error.stack.slice(0, 600)}
          </pre>
        )}
        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={reset} style={{
            padding: '12px 24px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            color: '#fff', fontSize: 14, fontWeight: 700,
          }}>
            Försök igen
          </button>
          <a href="/feed" style={{
            padding: '12px 24px', borderRadius: 14, border: '1.5px solid rgba(10,123,140,0.2)',
            background: '#fff', color: '#3d5865', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
          }}>
            Till flödet
          </a>
        </div>
      </body>
    </html>
  )
}

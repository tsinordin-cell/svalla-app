'use client'
import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[Svalla error]', error)
  }, [error])

  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, textAlign: 'center',
      background: 'linear-gradient(175deg, #dde9f5 0%, #e4eff8 40%, #e8f0f5 100%)',
    }}>
      <div style={{ fontSize: 52, marginBottom: 16 }}>⚓</div>
      <h1 style={{ fontSize: 22, fontWeight: 900, color: '#1e5c82', margin: '0 0 8px' }}>
        Något gick fel
      </h1>
      <p style={{ fontSize: 14, color: '#5a8090', margin: '0 0 24px', maxWidth: 320, lineHeight: 1.5 }}>
        Ett oväntat fel uppstod. Försök igen eller gå tillbaka till flödet.
      </p>
      {error?.message && (
        <p style={{ fontSize: 11, color: '#9ab8c8', fontFamily: 'monospace', margin: '0 0 20px', maxWidth: 380, wordBreak: 'break-word' }}>
          {error.message}
        </p>
      )}
      <div style={{ display: 'flex', gap: 10 }}>
        <button
          onClick={reset}
          style={{
            padding: '12px 24px', borderRadius: 14, border: 'none', cursor: 'pointer',
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            boxShadow: '0 4px 16px rgba(30,92,130,0.3)',
          }}
        >
          Försök igen
        </button>
        <a
          href="/feed"
          style={{
            padding: '12px 24px', borderRadius: 14, border: '1.5px solid rgba(10,123,140,0.2)',
            background: '#fff', color: '#3d5865', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
          }}
        >
          Till flödet
        </a>
      </div>
    </div>
  )
}

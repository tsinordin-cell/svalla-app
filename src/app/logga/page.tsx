'use client'
import { useRouter } from 'next/navigation'

export default function LoggaChoicePage() {
  const router = useRouter()

  return (
    <div style={{ minHeight: '100dvh', background: 'linear-gradient(180deg, #0e3d52 0%, #1a5570 40%, #f7fbfc 100%)' }}>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px',
      }}>
        <button
          onClick={() => router.back()}
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(255,255,255,0.12)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 14, fontWeight: 600 }}>Logga tur</span>
      </header>

      {/* Hero text */}
      <div style={{ padding: '24px 20px 32px', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>⛵</div>
        <h1 style={{
          fontSize: 28, fontWeight: 900, color: '#fff',
          margin: '0 0 8px', lineHeight: 1.15,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          Hur vill du logga?
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.5 }}>
          Spåra live för full GPS-data, eller snabb-logga en bild
        </p>
      </div>

      {/* Cards */}
      <div style={{ padding: '0 16px', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12 }}>

        {/* GPS tracking – primary */}
        <button
          onClick={() => router.push('/spara')}
          style={{
            width: '100%', borderRadius: 22, padding: '22px 20px',
            background: 'linear-gradient(135deg, rgba(255,255,255,0.18), rgba(255,255,255,0.08))',
            backdropFilter: 'blur(16px)',
            border: '1.5px solid rgba(255,255,255,0.22)',
            boxShadow: '0 8px 32px rgba(0,20,35,0.25)',
            cursor: 'pointer', textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(34,197,94,0.2)', borderRadius: 20,
                padding: '4px 10px', marginBottom: 10,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '0.5px' }}>LIVE GPS</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 6 }}>Spåra live</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.5 }}>
                GPS loggar rutten automatiskt. Se karta, hastighet och stopp när turen är klar.
              </div>
            </div>
            <div style={{ fontSize: 36, flexShrink: 0 }}>📡</div>
          </div>
          <div style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.9)', fontSize: 13, fontWeight: 700,
          }}>
            Starta spårning
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Manual quick-log */}
        <button
          onClick={() => router.push('/logga/manuell')}
          style={{
            width: '100%', borderRadius: 22, padding: '22px 20px',
            background: '#fff',
            boxShadow: '0 4px 20px rgba(0,20,35,0.12)',
            border: '1.5px solid rgba(10,123,140,0.10)',
            cursor: 'pointer', textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(201,110,42,0.1)', borderRadius: 20,
                padding: '4px 10px', marginBottom: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#c96e2a', letterSpacing: '0.5px' }}>SNABB · 15 SEK</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 900, color: '#162d3a', marginBottom: 6 }}>Snabb-logg</div>
              <div style={{ fontSize: 13, color: '#7a9dab', lineHeight: 1.5 }}>
                Ladda upp en bild och ange stats manuellt. Inget GPS behövs.
              </div>
            </div>
            <div style={{ fontSize: 36, flexShrink: 0 }}>📷</div>
          </div>
          <div style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
            color: '#1e5c82', fontSize: 13, fontWeight: 700,
          }}>
            Logga utan GPS
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Tips */}
        <p style={{
          textAlign: 'center', fontSize: 12,
          color: 'rgba(10,45,60,0.45)',
          margin: '8px 0 0', lineHeight: 1.5,
        }}>
          Turen dyker upp i flödet och på din profil direkt efter sparning.
        </p>
      </div>
    </div>
  )
}

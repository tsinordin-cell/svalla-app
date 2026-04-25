import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Svalla – Skärgårdslivet, loggat'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'flex-end',
          background: 'linear-gradient(160deg, #051422 0%, #0c2e48 35%, #175878 65%, #1e6e8a 100%)',
          padding: '0',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Sky glow — sun */}
        <div style={{
          position: 'absolute',
          top: -60,
          right: 180,
          width: 360,
          height: 360,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255,210,80,0.18) 0%, rgba(255,180,40,0.08) 40%, transparent 70%)',
          display: 'flex',
        }} />

        {/* Far island silhouettes */}
        <svg
          style={{ position: 'absolute', bottom: 220, left: 0, width: '100%' }}
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M0,85 C60,50 150,30 240,55 C300,70 340,85 380,85 L0,85 Z"
            fill="rgba(100,135,158,0.35)"
          />
          <path
            d="M380,85 C440,40 580,20 720,48 C800,62 860,80 920,85 L380,85 Z"
            fill="rgba(90,125,148,0.32)"
          />
          <path
            d="M850,85 C920,48 1020,38 1120,60 L1200,85 L850,85 Z"
            fill="rgba(95,130,152,0.30)"
          />
        </svg>

        {/* Near island / coastline */}
        <svg
          style={{ position: 'absolute', bottom: 140, left: 0, width: '100%' }}
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,80 C80,45 160,35 220,58 C270,74 310,85 360,80 L360,100 L0,100 Z"
            fill="#3d6e50"
          />
          <path
            d="M580,80 C650,35 760,25 860,52 C920,66 960,80 1010,75 L1060,80 L1060,100 L580,100 Z"
            fill="#3d6e50"
          />
          {/* Pine trees */}
          <polygon points="120,58 128,78 112,78" fill="#2a5030" />
          <polygon points="120,48 130,62 110,62" fill="#336038" />
          <polygon points="148,62 155,78 141,78" fill="#2a5030" />
          <polygon points="148,53 157,66 139,66" fill="#336038" />
          <polygon points="178,55 186,74 170,74" fill="#2a5030" />
          <polygon points="178,44 188,58 168,58" fill="#336038" />
          <polygon points="680,52 688,72 672,72" fill="#2a5030" />
          <polygon points="680,42 690,56 670,56" fill="#336038" />
          <polygon points="720,48 729,68 711,68" fill="#2a5030" />
          <polygon points="720,38 731,52 709,52" fill="#336038" />
          <polygon points="760,54 768,72 752,72" fill="#2a5030" />
          <polygon points="760,44 770,57 750,57" fill="#336038" />
          {/* Lighthouse */}
          <rect x="290" y="50" width="10" height="32" fill="#e8e0d0" />
          <rect x="288" y="56" width="14" height="4" fill="#c04040" />
          <rect x="288" y="68" width="14" height="4" fill="#c04040" />
          <circle cx="295" cy="49" r="5" fill="rgba(255,255,170,0.9)" />
        </svg>

        {/* Water surface waves */}
        <svg
          style={{ position: 'absolute', bottom: 100, left: 0, width: '100%' }}
          viewBox="0 0 1200 60"
          preserveAspectRatio="none"
        >
          <path
            d="M0,30 C100,20 200,40 300,30 C400,20 500,40 600,30 C700,20 800,40 900,30 C1000,20 1100,40 1200,30 L1200,60 L0,60 Z"
            fill="rgba(28,90,140,0.85)"
          />
          <path
            d="M0,35 C80,28 160,42 240,35 C320,28 400,42 480,35 C560,28 640,42 720,35 C800,28 880,42 960,35 C1040,28 1120,42 1200,35"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M0,42 C80,38 160,46 240,42 C320,38 400,46 480,42 C560,38 640,46 720,42 C800,38 880,46 960,42 C1040,38 1120,46 1200,42"
            stroke="rgba(255,255,255,0.10)"
            strokeWidth="1.5"
            fill="none"
          />
        </svg>

        {/* Deep water */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 110,
          background: 'linear-gradient(180deg, #1a6090 0%, #0e3860 40%, #071e3a 100%)',
          display: 'flex',
        }} />

        {/* Sailboat */}
        <svg
          style={{ position: 'absolute', bottom: 118, right: 280 }}
          width="80"
          height="90"
          viewBox="0 0 80 90"
        >
          {/* Wake */}
          <path d="M10,80 C0,82 -20,83 -40,81" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
          {/* Hull */}
          <path d="M8,78 L72,78 L64,68 L16,68 Z" fill="#e8d898" />
          <path d="M16,68 L64,68 Q62,60 16,60 Z" fill="#d0b860" />
          {/* Mast */}
          <line x1="40" y1="68" x2="40" y2="10" stroke="#7a4e28" strokeWidth="2" />
          {/* Main sail */}
          <path d="M40,12 L70,66 L40,66 Z" fill="rgba(252,248,236,0.92)" />
          {/* Jib */}
          <path d="M40,28 L18,64 L40,64 Z" fill="rgba(252,248,236,0.60)" />
          {/* Flag */}
          <path d="M40,10 L54,16 L40,22 Z" fill="#e04040" />
        </svg>

        {/* Birds */}
        <svg style={{ position: 'absolute', top: 100, left: 400 }} width="120" height="40" viewBox="0 0 120 40">
          <path d="M10,20 Q18,14 26,20" stroke="rgba(200,225,245,0.60)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M10,20 Q2,14 -6,20" stroke="rgba(200,225,245,0.60)" strokeWidth="1.8" fill="none" strokeLinecap="round" />
          <path d="M55,12 Q63,6 71,12" stroke="rgba(200,225,245,0.50)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M55,12 Q47,6 39,12" stroke="rgba(200,225,245,0.50)" strokeWidth="1.6" fill="none" strokeLinecap="round" />
          <path d="M100,22 Q108,17 116,22" stroke="rgba(200,225,245,0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          <path d="M100,22 Q92,17 84,22" stroke="rgba(200,225,245,0.45)" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        </svg>

        {/* Content overlay — left side text block */}
        <div style={{
          position: 'absolute',
          top: 0, left: 0, bottom: 0,
          width: 680,
          background: 'linear-gradient(90deg, rgba(4,18,36,0.72) 0%, rgba(4,18,36,0.45) 70%, transparent 100%)',
          display: 'flex',
        }} />

        {/* Text content */}
        <div style={{
          position: 'absolute',
          left: 72,
          bottom: 72,
          display: 'flex',
          flexDirection: 'column',
          gap: 0,
        }}>
          {/* Logo mark */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 18,
            marginBottom: 28,
          }}>
            {/* Svalla sailboat logo — matches favicon.svg */}
            <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="5" x2="16" y2="23" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16,6 L26,20 L16,20 Z" fill="white" opacity="0.95" />
              <path d="M16,10 L8,19 L16,19 Z" fill="white" opacity="0.55" />
              <path d="M7,23 Q11.5,21 16,23 Q20.5,21 25,23" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
              <path d="M8,24.5 Q16,23 24,24.5" stroke="white" strokeWidth="0.7" fill="none" opacity="0.3" strokeLinecap="round" />
            </svg>
            <span style={{
              fontSize: 52,
              fontWeight: 700,
              color: '#ffffff',
              letterSpacing: '-0.03em',
              lineHeight: 1,
            }}>
              SVALLA
            </span>
          </div>

          {/* Tagline */}
          <div style={{
            fontSize: 30,
            fontWeight: 400,
            color: 'rgba(255,255,255,0.82)',
            letterSpacing: '0.01em',
            marginBottom: 20,
            lineHeight: 1.3,
          }}>
            Skärgårdslivet, loggat.
          </div>

          {/* Feature pills */}
          <div style={{ display: 'flex', gap: 12 }}>
            {['⚓ Spåra turer', '🗺️ Hitta platser', '🤝 Community'].map(label => (
              <div key={label} style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.20)',
                borderRadius: 20,
                padding: '8px 18px',
                fontSize: 16,
                fontWeight: 600,
                color: 'rgba(255,255,255,0.80)',
                display: 'flex',
                alignItems: 'center',
              }}>
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Domain stamp */}
        <div style={{
          position: 'absolute',
          bottom: 28,
          right: 40,
          fontSize: 18,
          fontWeight: 600,
          color: 'rgba(255,255,255,0.38)',
          letterSpacing: '0.04em',
          display: 'flex',
        }}>
          svalla.se
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

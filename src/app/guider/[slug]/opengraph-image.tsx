import { ImageResponse } from 'next/og'
import { GUIDES } from '../guides-data'

export const runtime = 'edge'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// ── Kategori-teman ─────────────────────────────────────────────────────────
const THEMES: Record<string, {
  bg: string
  glow: string
  water: string
  accent: string
  accentText: string
}> = {
  Region: {
    bg:        'linear-gradient(155deg, #051422 0%, #0c2e48 40%, #175878 70%, #1e6e8a 100%)',
    glow:      'rgba(255,210,80,0.18)',
    water:     '#1a6090',
    accent:    'rgba(30,140,160,0.55)',
    accentText:'rgba(180,240,255,0.95)',
  },
  Transport: {
    bg:        'linear-gradient(155deg, #0a1828 0%, #122040 40%, #1a3a68 70%, #204880 100%)',
    glow:      'rgba(120,180,255,0.15)',
    water:     '#1a4880',
    accent:    'rgba(40,100,200,0.55)',
    accentText:'rgba(180,210,255,0.95)',
  },
  Aktivitet: {
    bg:        'linear-gradient(155deg, #071a10 0%, #0d2e1c 40%, #1a5030 70%, #226840 100%)',
    glow:      'rgba(120,220,140,0.15)',
    water:     '#1a6040',
    accent:    'rgba(30,140,80,0.55)',
    accentText:'rgba(180,255,200,0.95)',
  },
  Säsong: {
    bg:        'linear-gradient(155deg, #1a0e04 0%, #2e1a08 40%, #5a3010 70%, #7a4818 100%)',
    glow:      'rgba(255,200,60,0.25)',
    water:     '#6a4820',
    accent:    'rgba(180,100,20,0.60)',
    accentText:'rgba(255,220,150,0.95)',
  },
  Mat: {
    bg:        'linear-gradient(155deg, #1a0808 0%, #2e0e0e 40%, #581818 70%, #702020 100%)',
    glow:      'rgba(255,120,60,0.20)',
    water:     '#6a2820',
    accent:    'rgba(180,50,30,0.60)',
    accentText:'rgba(255,180,160,0.95)',
  },
  Praktisk: {
    bg:        'linear-gradient(155deg, #0e1420 0%, #1a2030 40%, #283048 70%, #304060 100%)',
    glow:      'rgba(140,180,220,0.15)',
    water:     '#284060',
    accent:    'rgba(60,100,160,0.55)',
    accentText:'rgba(180,210,240,0.95)',
  },
}

const DEFAULT_THEME = THEMES.Region

// ── Dekorativ ikon per kategori (inline SVG i JSX) ─────────────────────────
function CategoryIcon({ category, slug }: { category: string; slug: string }) {
  // Mat-guider: hummer eller räka
  if (category === 'Mat' || slug.includes('hummer') || slug.includes('raka') || slug.includes('kraft')) {
    return (
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.22 }}>
        {/* Stiliserad hummer */}
        <ellipse cx="50" cy="55" rx="18" ry="28" fill="white" />
        <ellipse cx="50" cy="30" rx="12" ry="10" fill="white" />
        {/* Klor */}
        <path d="M32,50 Q15,35 12,20 Q18,18 22,28 Q25,38 32,42 Z" fill="white" />
        <path d="M68,50 Q85,35 88,20 Q82,18 78,28 Q75,38 68,42 Z" fill="white" />
        {/* Antenner */}
        <line x1="44" y1="22" x2="28" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <line x1="56" y1="22" x2="72" y2="5" stroke="white" strokeWidth="2" strokeLinecap="round" />
        {/* Ben */}
        <line x1="38" y1="55" x2="22" y2="60" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="36" y1="63" x2="20" y2="68" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="62" y1="55" x2="78" y2="60" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="64" y1="63" x2="80" y2="68" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
        {/* Stjärt */}
        <path d="M40,78 Q50,88 60,78 Q55,72 50,75 Q45,72 40,78 Z" fill="white" />
      </svg>
    )
  }

  // Transport-guider: färja/pendelbåt
  if (category === 'Transport' || slug.includes('pendelbat') || slug.includes('bat')) {
    return (
      <svg width="200" height="140" viewBox="0 0 200 140" fill="none" style={{ opacity: 0.20 }}>
        {/* Färjans skrov */}
        <path d="M10,90 L190,90 L175,110 L25,110 Z" fill="white" />
        <rect x="30" y="55" width="140" height="38" rx="4" fill="white" />
        {/* Däckshus */}
        <rect x="55" y="30" width="90" height="28" rx="3" fill="white" opacity="0.7" />
        {/* Fönster nedre */}
        <rect x="45" y="65" width="20" height="14" rx="2" fill="rgba(0,0,0,0.3)" />
        <rect x="75" y="65" width="20" height="14" rx="2" fill="rgba(0,0,0,0.3)" />
        <rect x="105" y="65" width="20" height="14" rx="2" fill="rgba(0,0,0,0.3)" />
        <rect x="135" y="65" width="20" height="14" rx="2" fill="rgba(0,0,0,0.3)" />
        {/* Fönster övre */}
        <rect x="65" y="38" width="16" height="10" rx="2" fill="rgba(0,0,0,0.25)" />
        <rect x="92" y="38" width="16" height="10" rx="2" fill="rgba(0,0,0,0.25)" />
        <rect x="119" y="38" width="16" height="10" rx="2" fill="rgba(0,0,0,0.25)" />
        {/* Skorsten */}
        <rect x="88" y="14" width="14" height="18" rx="3" fill="white" opacity="0.8" />
        <rect x="112" y="18" width="10" height="14" rx="3" fill="white" opacity="0.8" />
        {/* Vågor */}
        <path d="M0,120 Q25,115 50,120 Q75,125 100,120 Q125,115 150,120 Q175,125 200,120" stroke="white" strokeWidth="2" fill="none" opacity="0.4" strokeLinecap="round" />
        <path d="M0,128 Q25,123 50,128 Q75,133 100,128 Q125,123 150,128 Q175,133 200,128" stroke="white" strokeWidth="1.5" fill="none" opacity="0.25" strokeLinecap="round" />
      </svg>
    )
  }

  // Aktivitet: kajak/paddleboard
  if (category === 'Aktivitet') {
    return (
      <svg width="200" height="180" viewBox="0 0 200 180" fill="none" style={{ opacity: 0.20 }}>
        {/* Kajak */}
        <ellipse cx="100" cy="100" rx="80" ry="18" fill="white" />
        <ellipse cx="100" cy="98" rx="80" ry="14" fill="white" opacity="0.5" />
        {/* Paddel */}
        <line x1="40" y1="50" x2="160" y2="148" stroke="white" strokeWidth="4" strokeLinecap="round" />
        {/* Paddel-blad vänster */}
        <ellipse cx="35" cy="44" rx="16" ry="10" fill="white" transform="rotate(-35 35 44)" />
        {/* Paddel-blad höger */}
        <ellipse cx="165" cy="154" rx="16" ry="10" fill="white" transform="rotate(-35 165 154)" />
        {/* Person */}
        <circle cx="100" cy="82" r="10" fill="white" />
        <path d="M88,95 Q100,88 112,95" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
        {/* Vattenlinje */}
        <path d="M10,108 Q30,104 50,108 Q70,112 90,108 Q110,104 130,108 Q150,112 170,108 Q190,104 200,108" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
      </svg>
    )
  }

  // Säsong med sol
  if (category === 'Säsong' && (slug.includes('sommar') || slug.includes('juni') || slug.includes('juli') || slug.includes('aug') || slug.includes('midsommar') || slug.includes('pingst'))) {
    return (
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.22 }}>
        <circle cx="50" cy="50" r="22" fill="white" />
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 50 + 28 * Math.cos(rad)
          const y1 = 50 + 28 * Math.sin(rad)
          const x2 = 50 + 40 * Math.cos(rad)
          const y2 = 50 + 40 * Math.sin(rad)
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" strokeLinecap="round" />
        })}
      </svg>
    )
  }

  // Säsong vinter/höst
  if (category === 'Säsong') {
    return (
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.20 }}>
        {/* Snöflinga */}
        {[0,60,120].map((angle) => {
          const rad = (angle * Math.PI) / 180
          const x1 = 50 - 35 * Math.cos(rad), y1 = 50 - 35 * Math.sin(rad)
          const x2 = 50 + 35 * Math.cos(rad), y2 = 50 + 35 * Math.sin(rad)
          const mx = 50 + 20 * Math.cos(rad + Math.PI/6), my = 50 + 20 * Math.sin(rad + Math.PI/6)
          return (
            <g key={angle}>
              <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="white" strokeWidth="3" strokeLinecap="round" />
              <line x1={50 + 20 * Math.cos(rad)} y1={50 + 20 * Math.sin(rad)} x2={mx} y2={my} stroke="white" strokeWidth="2" strokeLinecap="round" />
            </g>
          )
        })}
        <circle cx="50" cy="50" r="5" fill="white" />
      </svg>
    )
  }

  // Praktisk: kompassros
  if (category === 'Praktisk') {
    return (
      <svg width="180" height="180" viewBox="0 0 100 100" fill="none" style={{ opacity: 0.18 }}>
        <circle cx="50" cy="50" r="38" stroke="white" strokeWidth="2" />
        <circle cx="50" cy="50" r="28" stroke="white" strokeWidth="1" opacity="0.5" />
        {/* Nålar */}
        <path d="M50,12 L56,50 L50,44 L44,50 Z" fill="white" />
        <path d="M50,88 L56,50 L50,56 L44,50 Z" fill="white" opacity="0.5" />
        <path d="M12,50 L50,44 L56,50 L50,56 Z" fill="white" opacity="0.5" />
        <path d="M88,50 L50,56 L44,50 L50,44 Z" fill="white" />
        {/* Nordpunkt */}
        <circle cx="50" cy="15" r="3" fill="white" />
        {[45,135,225,315].map(a => {
          const r = (a * Math.PI) / 180
          const x = 50 + 34 * Math.cos(r), y = 50 + 34 * Math.sin(r)
          return <circle key={a} cx={x} cy={y} r="2" fill="white" opacity="0.4" />
        })}
      </svg>
    )
  }

  // Region / default: fyr
  return (
    <svg width="160" height="200" viewBox="0 0 80 120" fill="none" style={{ opacity: 0.20 }}>
      {/* Fyr */}
      <rect x="33" y="30" width="14" height="60" fill="white" />
      <rect x="31" y="38" width="18" height="4" fill="white" opacity="0.5" />
      <rect x="31" y="54" width="18" height="4" fill="white" opacity="0.5" />
      <rect x="31" y="70" width="18" height="4" fill="white" opacity="0.5" />
      {/* Topp */}
      <path d="M28,30 L52,30 L50,20 L30,20 Z" fill="white" />
      <circle cx="40" cy="16" r="7" fill="white" />
      <circle cx="40" cy="16" r="4" fill="rgba(255,230,100,0.8)" />
      {/* Ljusstråle */}
      <path d="M47,16 L80,5 L80,27 Z" fill="white" opacity="0.12" />
      {/* Klippa */}
      <path d="M20,90 Q40,80 60,90 L65,120 L15,120 Z" fill="white" opacity="0.7" />
      {/* Vågor */}
      <path d="M0,108 Q20,103 40,108 Q60,113 80,108" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M0,116 Q20,111 40,116 Q60,121 80,116" stroke="white" strokeWidth="1.5" fill="none" opacity="0.5" strokeLinecap="round" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────

export default async function OGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const guide = GUIDES.find(g => g.slug === slug)

  const title    = guide?.title    ?? 'Guide till skärgården'
  const excerpt  = guide?.excerpt  ?? ''
  const category = guide?.category ?? 'Region'
  const readTime = guide?.readTime ?? ''

  const theme = THEMES[category] ?? DEFAULT_THEME

  const titleSize =
    title.length < 35 ? 50 :
    title.length < 55 ? 40 :
    title.length < 75 ? 32 : 26

  // Förkorta excerpt till max 90 tecken
  const shortExcerpt = excerpt.length > 90 ? excerpt.slice(0, 88) + '…' : excerpt

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200, height: 630,
          display: 'flex',
          background: theme.bg,
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Himmelsglow */}
        <div style={{
          position: 'absolute', top: -80, right: 160,
          width: 400, height: 400, borderRadius: '50%',
          background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
          display: 'flex',
        }} />

        {/* Ösilhuetter */}
        <svg style={{ position: 'absolute', bottom: 180, left: 0, width: '100%' }} viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,85 C80,45 200,28 320,55 C400,72 450,85 500,85 L0,85 Z" fill="rgba(255,255,255,0.10)" />
          <path d="M450,85 C520,38 660,18 800,48 C880,64 940,82 1000,85 L450,85 Z" fill="rgba(255,255,255,0.08)" />
          <path d="M900,85 C960,46 1060,36 1160,60 L1200,85 L900,85 Z" fill="rgba(255,255,255,0.07)" />
        </svg>

        {/* Tallkolonier */}
        <svg style={{ position: 'absolute', bottom: 150, left: 0, width: '100%' }} viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,75 C60,42 130,32 190,55 C240,70 280,80 330,75 L330,100 L0,100 Z" fill="rgba(255,255,255,0.12)" />
          <path d="M600,78 C660,34 760,24 860,50 C920,64 960,78 1010,75 L1060,80 L1060,100 L600,100 Z" fill="rgba(255,255,255,0.10)" />
        </svg>

        {/* Vattenyta */}
        <svg style={{ position: 'absolute', bottom: 95, left: 0, width: '100%' }} viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path d="M0,30 C150,18 300,42 450,30 C600,18 750,42 900,30 C1050,18 1150,40 1200,30 L1200,60 L0,60 Z" fill={`${theme.water}cc`} />
          <path d="M0,36 C80,28 160,44 240,36 C320,28 400,44 480,36 C560,28 640,44 720,36 C800,28 880,44 960,36 C1040,28 1120,44 1200,36" stroke="rgba(255,255,255,0.25)" strokeWidth="2" fill="none" />
        </svg>

        {/* Djupvatten */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, height: 105,
          background: `linear-gradient(180deg, ${theme.water} 0%, rgba(5,15,30,0.95) 100%)`,
          display: 'flex',
        }} />

        {/* Kategori-ikon höger */}
        <div style={{
          position: 'absolute', right: 80, bottom: 120,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <CategoryIcon category={category} slug={slug} />
        </div>

        {/* Vänster text-overlay */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 860,
          background: 'linear-gradient(90deg, rgba(4,14,28,0.90) 0%, rgba(4,14,28,0.65) 65%, transparent 100%)',
          display: 'flex',
        }} />

        {/* Textinnehåll */}
        <div style={{
          position: 'absolute', left: 68, bottom: 60,
          display: 'flex', flexDirection: 'column', gap: 0, maxWidth: 740,
        }}>
          {/* Logotyp */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 22 }}>
            <svg width="36" height="36" viewBox="0 0 32 32" fill="none">
              <line x1="16" y1="5" x2="16" y2="23" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M16,6 L26,20 L16,20 Z" fill="white" opacity="0.95" />
              <path d="M16,10 L8,19 L16,19 Z" fill="white" opacity="0.55" />
              <path d="M7,23 Q11.5,21 16,23 Q20.5,21 25,23" stroke="white" strokeWidth="1.4" fill="none" strokeLinecap="round" opacity="0.8" />
            </svg>
            <span style={{ fontSize: 36, fontWeight: 700, color: '#ffffff', letterSpacing: '-0.03em', lineHeight: 1 }}>
              SVALLA
            </span>
          </div>

          {/* Kategori + lästid */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <div style={{
              background: theme.accent,
              border: `1px solid ${theme.accentText.replace('0.95', '0.30')}`,
              borderRadius: 20, padding: '6px 16px',
              fontSize: 15, fontWeight: 700,
              color: theme.accentText,
              display: 'flex', letterSpacing: '0.02em',
            }}>
              {category}
            </div>
            {readTime && (
              <div style={{
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                borderRadius: 20, padding: '6px 16px',
                fontSize: 15, fontWeight: 600,
                color: 'rgba(255,255,255,0.65)',
                display: 'flex',
              }}>
                {readTime}
              </div>
            )}
          </div>

          {/* Titel */}
          <div style={{
            fontSize: titleSize, fontWeight: 800,
            color: '#ffffff', lineHeight: 1.18,
            letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            {title}
          </div>

          {/* Excerpt */}
          {shortExcerpt && (
            <div style={{
              fontSize: 18, fontWeight: 400,
              color: 'rgba(255,255,255,0.68)',
              lineHeight: 1.45, maxWidth: 680,
            }}>
              {shortExcerpt}
            </div>
          )}
        </div>

        {/* Domänstämpel */}
        <div style={{
          position: 'absolute', bottom: 26, right: 36,
          fontSize: 15, fontWeight: 600,
          color: 'rgba(255,255,255,0.32)',
          letterSpacing: '0.05em',
          display: 'flex',
        }}>
          svalla.se/guider
        </div>
      </div>
    ),
    { ...size }
  )
}

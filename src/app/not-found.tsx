import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '100dvh', display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      padding: 24, textAlign: 'center',
      background: 'var(--bg)',
    }}>
      {/* Animated compass / anchor illustration */}
      <div style={{
        width: 96, height: 96, borderRadius: '50%',
        background: 'rgba(30,92,130,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: 24,
        boxShadow: '0 0 0 16px rgba(30,92,130,0.04)',
      }}>
        <svg aria-hidden="true" viewBox="0 0 48 48" fill="none" style={{ width: 52, height: 52 }}>
          {/* Compass rose */}
          <circle cx="24" cy="24" r="18" stroke="rgba(30,92,130,0.2)" strokeWidth="2"/>
          <circle cx="24" cy="24" r="3" fill="var(--sea)"/>
          {/* N pointer — orange (you are here but lost) */}
          <path d="M24 7 L26.5 22 L24 20 L21.5 22 Z" fill="rgba(201,110,42,0.85)"/>
          {/* S pointer — muted */}
          <path d="M24 41 L21.5 26 L24 28 L26.5 26 Z" fill="rgba(30,92,130,0.3)"/>
          {/* Cardinal marks */}
          <text x="23" y="6" fontSize="4" fill="rgba(30,92,130,0.5)" textAnchor="middle" fontWeight="700">N</text>
          <text x="23" y="46" fontSize="4" fill="rgba(30,92,130,0.35)" textAnchor="middle" fontWeight="700">S</text>
          <text x="3" y="25" fontSize="4" fill="rgba(30,92,130,0.35)" textAnchor="middle" fontWeight="700">V</text>
          <text x="44" y="25" fontSize="4" fill="rgba(30,92,130,0.35)" textAnchor="middle" fontWeight="700">Ö</text>
        </svg>
      </div>

      <div style={{
        fontSize: 11, fontWeight: 700, color: 'rgba(30,92,130,0.5)',
        letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 12,
      }}>
        404 — Borttappad till havs
      </div>

      <h1 style={{
        fontSize: 26, fontWeight: 700,
        color: 'var(--sea)',
        margin: '0 0 10px', lineHeight: 1.2,
      }}>
        Den här sidan finns inte
      </h1>

      <p style={{
        fontSize: 15, color: 'var(--txt2)',
        margin: '0 0 32px', maxWidth: 300, lineHeight: 1.6,
      }}>
        Rutten du följde leder ingenstans. Kanske har länken ändrats eller gått ut.
      </p>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          href="/feed"
          style={{
            padding: '13px 28px', borderRadius: 14, border: 'none',
            background: 'var(--grad-sea)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            boxShadow: '0 4px 16px rgba(30,92,130,0.3)',
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
          }}
          className="press-feedback"
        >
          Till flödet
        </Link>
        <Link
          href="/platser"
          style={{
            padding: '13px 28px', borderRadius: 14,
            border: '1.5px solid var(--sea)',
            background: 'transparent',
            color: 'var(--sea)', fontSize: 14, fontWeight: 600,
            textDecoration: 'none', display: 'inline-flex', alignItems: 'center',
          }}
          className="press-feedback"
        >
          Utforska platser
        </Link>
      </div>
    </div>
  )
}

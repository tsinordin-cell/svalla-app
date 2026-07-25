/**
 * not-found.tsx — Svalla-brandad 404 för plats-sidor.
 *
 * Visas när /upptack/[id] anropas med en slug/UUID som inte hittas i
 * restaurants-tabellen. Tidigare föll vi tillbaka till Next.js generiska
 * "This page could not be found" — nu en sida som drar tillbaka användaren
 * in i flödet med sökruta + länkar.
 */
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: 'Platsen kunde inte hittas — Svalla' },
  description: 'Den här platsen finns inte längre eller har bytt URL. Utforska andra hamnar, krogar och naturhamnar i skärgården.',
  robots: { index: false, follow: true },
}

export default function PlaceNotFound() {
  return (
    <main style={{
      minHeight: 'calc(100dvh - var(--nav-h, 64px))',
      background: 'var(--bg)',
      padding: '60px 20px 80px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start',
      gap: 28,
      maxWidth: 540,
      margin: '0 auto',
    }}>
      {/* Logo-emblem (kompass-ikon i Svalla-blå) */}
      <div style={{
        width: 72, height: 72,
        borderRadius: '50%',
        background: 'var(--grad-sea, linear-gradient(135deg, #1e5c82, #2d7aaa))',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 6px 20px rgba(30,92,130,0.25)',
      }}>
        <svg viewBox="0 0 24 24" width={36} height={36} fill="none" stroke="#fff" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="10"/>
          <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
        </svg>
      </div>

      <div style={{ textAlign: 'center', maxWidth: 440 }}>
        <h1 style={{
          fontSize: 28, fontWeight: 800,
          color: 'var(--txt)',
          margin: '0 0 12px',
          letterSpacing: '-0.01em',
          lineHeight: 1.2,
        }}>
          Platsen kunde inte hittas
        </h1>
        <p style={{
          fontSize: 15, color: 'var(--txt2)',
          margin: 0, lineHeight: 1.55,
        }}>
          Den här hamnen, krogen eller naturhamnen finns inte i Svalla — eller har bytt URL. Inga problem, det finns hundratals andra att upptäcka.
        </p>
      </div>

      {/* Sök-CTA */}
      <form action="/sok" method="get" style={{
        width: '100%', maxWidth: 420,
        display: 'flex', gap: 8,
      }}>
        <input
          type="search"
          name="q"
          placeholder="Sök plats, ö eller hamn…"
          autoFocus
          style={{
            flex: 1,
            padding: '13px 16px',
            fontSize: 15,
            borderRadius: 12,
            border: '1px solid rgba(10,123,140,0.18)',
            background: 'var(--white)',
            color: 'var(--txt)',
            outline: 'none',
            fontFamily: 'inherit',
          }}
        />
        <button type="submit" style={{
          padding: '13px 20px',
          background: 'var(--sea, #1e5c82)',
          color: '#fff',
          border: 'none',
          borderRadius: 12,
          fontSize: 15, fontWeight: 700,
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}>
          Sök
        </button>
      </form>

      {/* Snabblänkar */}
      <div style={{
        display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center',
      }}>
        <Link href="/upptack" style={pillStyle}>Utforska kartan</Link>
        <Link href="/upptack?vy=lista" style={pillStyle}>Lista över platser</Link>
        <Link href="/rutter" style={pillStyle}>Populära rutter</Link>
        <Link href="/" style={pillStyle}>Tillbaka till start</Link>
      </div>
    </main>
  )
}

const pillStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center',
  padding: '9px 16px',
  background: 'var(--white)',
  color: 'var(--sea, #1e5c82)',
  borderRadius: 999,
  textDecoration: 'none',
  fontSize: 13, fontWeight: 600,
  border: '1px solid rgba(10,123,140,0.12)',
  boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
}

/**
 * /helgturer — placeholder.
 *
 * Den här sidan är inte fullt byggd ännu. Routen behövs eftersom navigationen
 * länkar hit från "Dagsplaner & Resetips → Helgturer". När innehåll byggs
 * (kuraterade 2-3-dagars-turer i skärgården) ersätts den här komponenten.
 *
 * Vi väljer att INTE 404:a — då bryter det navigationen och SEO. Istället
 * en clean placeholder med samma chrome som övriga sidor.
 */
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Helgturer i skärgården – Svalla',
  description: 'Inspiration och planering för helgturer i Stockholms skärgård och längs svenska kusten. Lanseras snart.',
  robots: { index: false, follow: true },
}

export default function HelgturerPage() {
  return (
    <main style={{
      minHeight: '100dvh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '60px 24px',
      paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 60px)',
      background: 'var(--bg)',
    }}>
      <div style={{
        maxWidth: 520,
        textAlign: 'center',
        background: 'var(--white)',
        borderRadius: 20,
        padding: '40px 28px',
        border: '1px solid rgba(10,123,140,0.08)',
        boxShadow: '0 4px 24px rgba(10,30,50,0.06)',
      }}>
        <div style={{
          fontSize: 11,
          fontWeight: 700,
          color: 'var(--accent, #c96e2a)',
          textTransform: 'uppercase',
          letterSpacing: '0.12em',
          marginBottom: 14,
        }}>
          Kommer snart
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(28px, 4vw, 38px)',
          fontWeight: 700,
          color: 'var(--txt)',
          lineHeight: 1.15,
          margin: '0 0 14px',
        }}>
          Helgturer i skärgården
        </h1>
        <p style={{
          fontSize: 15.5,
          lineHeight: 1.6,
          color: 'var(--txt2)',
          margin: '0 0 24px',
        }}>
          Vi kuraterar färdiga 2–3-dagars rutter i skärgården — boende, krogar,
          hamnar och rutten knuten ihop. Kom tillbaka snart, eller börja med
          våra dagsutflykter under tiden.
        </p>
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
          <Link href="/dagsturer" style={{
            background: 'var(--sea, #1e5c82)',
            color: '#fff',
            textDecoration: 'none',
            padding: '11px 20px',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 14,
          }}>
            Se dagsutflykter
          </Link>
          <Link href="/resetips" style={{
            background: 'rgba(10,123,140,0.08)',
            color: 'var(--txt)',
            textDecoration: 'none',
            padding: '11px 20px',
            borderRadius: 12,
            fontWeight: 600,
            fontSize: 14,
          }}>
            Alla resetips
          </Link>
        </div>
      </div>
    </main>
  )
}

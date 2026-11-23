import type { Metadata } from 'next'
import { SvallaSegel } from '@/components/SvallaLogo'

export const metadata: Metadata = {
  title: 'Hej då',
  robots: { index: false, follow: false },
}

export default function GoodbyePage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '32px 16px',
      background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
    }}>
      <div style={{
        maxWidth: 480,
        textAlign: 'center',
        color: '#fff',
      }}>
        {/* Svallas segel ur loggan, utan text, centrerat (Tom 2026-11-22). */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24 }}>
          <SvallaSegel size={64} color="#ffffff" />
        </div>
        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 36, fontWeight: 800,
          margin: '0 0 14px',
          letterSpacing: '-0.5px',
        }}>
          Hej då, och tack
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.92, margin: '0 0 28px' }}>
          Ditt konto och din data är raderade. En bekräftelse skickades till din e-post.
          <br /><br />
          Om du ändrar dig är du alltid välkommen tillbaka.
        </p>
        <a href="/" style={{
          display: 'inline-block',
          padding: '12px 28px',
          background: '#fff',
          color: 'var(--sea)',
          borderRadius: 10,
          fontSize: 14,
          fontWeight: 700,
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}>
          Till startsidan
        </a>
      </div>
    </div>
  )
}

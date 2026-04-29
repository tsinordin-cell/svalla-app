import type { Metadata } from 'next'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'

export const metadata: Metadata = {
  title: 'Tack — du är nu partner | Svalla',
  description: 'Tack för att du blev Svalla-partner. Vi hör av oss inom 24 timmar.',
  robots: { index: false, follow: false },
}

export default function PartnerTackPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <nav style={{
        background: 'linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%)',
        padding: '18px 24px 16px',
      }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <Link href="/" style={{ textDecoration: 'none' }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
        </div>
      </nav>

      <main style={{ maxWidth: 700, margin: '0 auto', padding: '60px 24px' }}>
        <div style={{
          background: 'var(--white)',
          border: '1px solid var(--surface-3)',
          borderRadius: 18,
          padding: '40px 32px',
          textAlign: 'center',
        }}>
          <div style={{
            width: 64, height: 64, borderRadius: '50%',
            background: 'linear-gradient(135deg, #0a7b3c, #2d7d8a)',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 style={{
            fontSize: 28, fontWeight: 700, color: 'var(--sea)',
            margin: '0 0 12px',
            fontFamily: "'Playfair Display', Georgia, serif",
          }}>
            Välkommen som partner
          </h1>
          <p style={{ fontSize: 16, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 24px' }}>
            Tack för att du blev Svalla-partner. Din betalning är registrerad och vi hör av oss inom 24 timmar för att aktivera din profilsida.
          </p>

          <div style={{
            background: 'var(--surface-2)',
            borderRadius: 12,
            padding: '16px 20px',
            margin: '0 0 24px',
            textAlign: 'left',
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>
              Vad händer nu?
            </h2>
            <ol style={{ margin: 0, paddingLeft: 20, color: 'var(--txt2)', fontSize: 14, lineHeight: 1.7 }}>
              <li>Du får en bekräftelse på e-post inom några minuter</li>
              <li>Tom (grundare) kontaktar dig inom 24 h för att samla material (foton, beskrivning, bokningslänk)</li>
              <li>Din profil aktiveras inom 48 h från att vi fått allt material</li>
              <li>Du kan när som helst hantera ditt abonnemang via länken vi skickar i bekräftelsen</li>
            </ol>
          </div>

          <Link href="/" style={{
            display: 'inline-block',
            padding: '12px 28px',
            borderRadius: 10,
            background: 'var(--sea)',
            color: '#fff',
            textDecoration: 'none',
            fontWeight: 700,
            fontSize: 14,
          }}>
            Tillbaka till Svalla →
          </Link>
        </div>
      </main>
    </div>
  )
}

import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import DeleteAccountForm from './DeleteAccountForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radera konto — Svalla',
  robots: { index: false, follow: false },
}

export default async function RaderaKontoPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/logga-in?returnTo=/profil/installningar/radera')
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      padding: '32px 16px calc(var(--nav-h) + 32px)',
    }}>
      <div style={{ maxWidth: 560, margin: '0 auto' }}>
        <div style={{ marginBottom: 18 }}>
          <a href="/profil" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'var(--txt3)', textDecoration: 'none',
            fontSize: 13, fontWeight: 600,
          }}>
            <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 5.5L8.5 12L15 18.5" />
            </svg>
            Tillbaka till profil
          </a>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 28, fontWeight: 800,
          color: 'var(--txt)',
          margin: '0 0 12px',
          letterSpacing: '-0.5px',
        }}>
          Radera mitt konto
        </h1>

        <p style={{ fontSize: 15, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 24px' }}>
          Detta tar bort ditt konto och din personliga data permanent. Den här åtgärden kan inte ångras.
        </p>

        <div style={{
          padding: '16px 18px',
          background: 'rgba(239,68,68,0.06)',
          borderRadius: 14,
          border: '1px solid rgba(239,68,68,0.18)',
          marginBottom: 24,
        }}>
          <h2 style={{
            fontSize: 13, fontWeight: 700, color: '#dc2626',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            margin: '0 0 10px',
          }}>
            Detta raderas permanent
          </h2>
          <ul style={{
            margin: 0, padding: '0 0 0 18px',
            fontSize: 14, color: 'var(--txt2)', lineHeight: 1.7,
          }}>
            <li>Profil, profilbild, båt-info och hemmahamn</li>
            <li>Alla loggade turer (inkl. GPS-rutter och foton)</li>
            <li>Följ-relationer, bokmärken, gilla-markeringar</li>
            <li>Privata meddelanden</li>
            <li>Push-prenumerationer och notiser</li>
            <li>Aktiv prenumeration avslutas hos Stripe</li>
          </ul>
        </div>

        <div style={{
          padding: '14px 18px',
          background: 'rgba(10,123,140,0.05)',
          borderRadius: 14,
          border: '1px solid rgba(10,123,140,0.12)',
          marginBottom: 24,
        }}>
          <h2 style={{
            fontSize: 13, fontWeight: 700, color: 'var(--sea)',
            textTransform: 'uppercase', letterSpacing: '0.06em',
            margin: '0 0 8px',
          }}>
            Detta sparas anonymiserat
          </h2>
          <p style={{ margin: 0, fontSize: 13, color: 'var(--txt2)', lineHeight: 1.6 }}>
            Forum-trådar och svar du skrivit ersätts med &ldquo;[Borttaget av användare]&rdquo; så att andras
            diskussioner inte bryts. Ditt namn kopplas inte till dem.
          </p>
        </div>

        <DeleteAccountForm />
      </div>
    </main>
  )
}

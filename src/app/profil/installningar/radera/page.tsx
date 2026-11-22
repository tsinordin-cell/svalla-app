import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import DeleteAccountForm from './DeleteAccountForm'
import SvallaLogo from '@/components/SvallaLogo'
import { harLosenord, harGoogle, farskInloggning } from '@/lib/kontoBekraftelse'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Radera konto',
  robots: { index: false, follow: false },
}

const RADERAS = [
  'Profil, profilbild, båtinfo och hemmahamn',
  'Alla loggade turer, med GPS-rutter och foton',
  'Följningar, bokmärken och gillamarkeringar',
  'Privata meddelanden',
  'Pushprenumerationer och notiser',
  'En aktiv prenumeration avslutas hos Stripe',
]

/**
 * Radera konto. Utseendet gjort om 2026-11-22 (Tom: "Vi ska se premium ut",
 * med Svalla-loggan): samma sidhuvud i havsblått som mejlen, kort i stället
 * för färgade rutor, och bekräftelsen i två steg utan webbläsarens ruta.
 */
export default async function RaderaKontoPage() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/logga-in?returnTo=/profil/installningar/radera')
  }

  const leverantorer = user.app_metadata?.providers as string[] | undefined
  const medLosenord = harLosenord(user.identities, leverantorer)
  const medGoogle = harGoogle(user.identities, leverantorer)
  const { data: { session } } = await supabase.auth.getSession()
  const nyssInloggad = farskInloggning(session?.access_token)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h, 64px) + 40px)' }}>
      <header style={{
        background: 'linear-gradient(135deg, #0b3350 0%, #1e5c82 55%, #0a7b8c 100%)',
        color: '#fff',
        padding: '22px 20px 64px',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 34 }}>
            <Link href="/profil" aria-label="Tillbaka till profilen" style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              color: 'rgba(255,255,255,0.85)', textDecoration: 'none', fontSize: 13, fontWeight: 600,
            }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 5.5L8.5 12L15 18.5" />
              </svg>
              Profil
            </Link>
            <SvallaLogo height={22} color="#ffffff" />
          </div>
          <p style={{ margin: '0 0 8px', fontSize: 12, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)' }}>
            Konto
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 32, fontWeight: 700, lineHeight: 1.15,
            margin: '0 0 12px', letterSpacing: '-0.01em',
          }}>
            Radera ditt konto
          </h1>
          <p style={{ margin: 0, fontSize: 15, lineHeight: 1.6, color: 'rgba(255,255,255,0.85)', maxWidth: 460 }}>
            Vi tar bort ditt konto och din personliga data för gott. Det går inte att ångra.
          </p>
        </div>
      </header>

      <main style={{ maxWidth: 600, margin: '-40px auto 0', padding: '0 20px', display: 'grid', gap: 14, boxSizing: 'border-box' }}>
        <section style={kort}>
          <h2 style={kortRubrik}>Det här raderas</h2>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'grid', gap: 10 }}>
            {RADERAS.map(rad => (
              <li key={rad} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, lineHeight: 1.5, color: 'var(--txt2)' }}>
                <span aria-hidden="true" style={{
                  flexShrink: 0, width: 18, height: 18, marginTop: 1, borderRadius: '50%',
                  background: 'rgba(185,28,28,0.08)', color: '#b91c1c',
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
                </span>
                {rad}
              </li>
            ))}
          </ul>
        </section>

        <section style={kort}>
          <h2 style={kortRubrik}>Det här blir kvar, utan ditt namn</h2>
          <p style={{ margin: 0, fontSize: 14, lineHeight: 1.6, color: 'var(--txt2)' }}>
            Dina forumtrådar och svar visas som &ldquo;[Borttaget av användare]&rdquo;, så att andras diskussioner hänger ihop. Ditt namn kopplas inte till dem.
          </p>
        </section>

        <DeleteAccountForm
          medLosenord={medLosenord}
          medGoogle={medGoogle}
          nyssInloggad={nyssInloggad}
          epost={user.email ?? null}
        />

        <p style={{ margin: '6px 4px 0', fontSize: 12, lineHeight: 1.6, color: 'var(--txt3)', textAlign: 'center' }}>
          Frågor innan du raderar? Skriv till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a>.
        </p>
      </main>
    </div>
  )
}

const kort: React.CSSProperties = {
  background: 'var(--card-bg, #fff)',
  borderRadius: 18,
  border: '1px solid var(--border, rgba(10,31,43,0.08))',
  boxShadow: '0 8px 28px rgba(10,31,43,0.08)',
  padding: '20px 22px',
}

const kortRubrik: React.CSSProperties = {
  fontFamily: "'Playfair Display', Georgia, serif",
  fontSize: 18, fontWeight: 700, color: 'var(--txt)',
  margin: '0 0 14px',
}

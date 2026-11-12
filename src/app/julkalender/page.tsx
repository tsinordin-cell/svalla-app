import type { Metadata } from 'next'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { LUCKOR, AR, oppnaLuckor } from '@/lib/julkalender'
import { JulkalenderVisad, JulkalenderLoggaIn } from './JulkalenderMatning'

export const metadata: Metadata = {
  title: `Svallas julkalender ${AR}: 24 luckor om skärgården`,
  description: 'En lucka om dagen 1–24 december med tips om skärgården i vinter. Skapa ett gratis konto och öppna dagens lucka.',
  alternates: { canonical: 'https://svalla.se/julkalender' },
  openGraph: {
    title: `Svallas julkalender ${AR}`,
    description: 'En lucka om dagen 1–24 december med tips om skärgården i vinter.',
    url: 'https://svalla.se/julkalender',
  },
}

export const dynamic = 'force-dynamic'

type Props = { searchParams: Promise<{ testdag?: string }> }

export default async function JulkalenderPage({ searchParams }: Props) {
  const sp = await searchParams
  // Förhandsvisning: ?testdag=N fungerar bara utanför produktion
  const tillatTest = process.env.VERCEL_ENV !== 'production'
  const testdag = tillatTest && sp.testdag ? Number(sp.testdag) : undefined
  const oppna = oppnaLuckor(new Date(), testdag)

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const inloggad = !!user
  const loginUrl = '/logga-in?mode=ny&returnTo=/julkalender'

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      <JulkalenderVisad dag={oppna} inloggad={inloggad} />
      <div style={{ background: 'linear-gradient(180deg,#a9c4dd 0%,#d9dfe9 70%,#eee2e0 100%)', padding: 'calc(env(safe-area-inset-top, 0px) + 28px) 20px 40px' }}>
        <div style={{ maxWidth: 760, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.18em', color: '#b5591a', marginBottom: 10 }}>1–24 DECEMBER {AR}</div>
          <h1 style={{ fontSize: 'clamp(28px, 6vw, 44px)', fontWeight: 800, color: '#0f2f40', margin: '0 0 10px' }}>Svallas julkalender</h1>
          <p style={{ fontSize: 16, color: '#36515f', lineHeight: 1.6, margin: '0 auto', maxWidth: 520 }}>
            En lucka om dagen med tips om skärgården i vinter. Luckorna öppnas en i taget, och missade luckor går att öppna i efterhand.
          </p>
          {!inloggad && (
            <JulkalenderLoggaIn dag={oppna} href={loginUrl} style={{ display: 'inline-block', marginTop: 20, background: '#b5591a', color: '#fff', padding: '12px 22px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Skapa konto och öppna dagens lucka →
            </JulkalenderLoggaIn>
          )}
          {inloggad && oppna === 0 && (
            <p style={{ marginTop: 18, fontSize: 15, color: '#0f2f40', fontWeight: 600 }}>Första luckan öppnas 1 december.</p>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '28px 16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 12 }}>
          {Array.from({ length: 24 }, (_, i) => i + 1).map(dag => {
            const lucka = LUCKOR.find(l => l.dag === dag)
            const harOppnat = dag <= oppna
            const idag = dag === oppna
            const bas: React.CSSProperties = {
              borderRadius: 14, padding: '14px 14px 16px', minHeight: 120,
              border: idag ? '2px solid #c96e2a' : '1px solid var(--surface-3)',
              background: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 6,
            }
            const nummer = <div style={{ fontSize: 26, fontWeight: 800, color: harOppnat ? '#c0392b' : '#9aa9b3', lineHeight: 1 }}>{dag}</div>

            if (!harOppnat) {
              return (
                <div key={dag} style={{ ...bas, background: 'var(--surface-2)' }}>
                  {nummer}
                  <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Öppnas {dag} december</div>
                </div>
              )
            }
            if (!inloggad) {
              return (
                <JulkalenderLoggaIn key={dag} dag={dag} href={loginUrl} style={{ ...bas, textDecoration: 'none', color: 'inherit' }}>
                  {nummer}
                  <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Skapa konto för att öppna</div>
                  <div style={{ marginTop: 'auto', fontSize: 13, fontWeight: 700, color: '#b5591a' }}>Öppna →</div>
                </JulkalenderLoggaIn>
              )
            }
            if (!lucka) {
              return (
                <div key={dag} style={bas}>
                  {nummer}
                  <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>Kommer snart</div>
                </div>
              )
            }
            return (
              <details key={dag} open={idag} style={{ ...bas, gridColumn: idag ? '1 / -1' : undefined }}>
                <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {nummer}
                  <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{lucka.titel}</div>
                  {lucka.reklam && <span style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, background: '#fff3e6', color: '#a8501a', borderRadius: 6, padding: '2px 7px' }}>REKLAM</span>}
                </summary>
                <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.65, margin: '6px 0 0' }}>{lucka.text}</p>
                {lucka.lank && (
                  <a href={lucka.lank} style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none', marginTop: 4 }}>
                    {lucka.lankText ?? 'Läs mer'} →
                  </a>
                )}
                {lucka.kalla && <div style={{ fontSize: 12, color: 'var(--sea)', marginTop: 4 }}>Källa: {lucka.kalla}</div>}
              </details>
            )
          })}
        </div>
        <p style={{ fontSize: 13, color: 'var(--ink-muted)', textAlign: 'center', marginTop: 24 }}>
          Svalla skriver inga priser. Hittar du något som inte stämmer, skriv till <a href="mailto:info@svalla.se" style={{ color: 'var(--sea)' }}>info@svalla.se</a>.
        </p>
      </div>
    </div>
  )
}

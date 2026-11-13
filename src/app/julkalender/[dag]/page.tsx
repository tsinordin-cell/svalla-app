import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { LUCKOR, AR, oppnaLuckor, FORHANDS_KOD } from '@/lib/julkalender'
import JulkalenderLucka from '../JulkalenderLucka'
import { JulkalenderVisad, JulkalenderLoggaIn } from '../JulkalenderMatning'

export const dynamic = 'force-dynamic'

type Props = { params: Promise<{ dag: string }>; searchParams: Promise<{ testdag?: string; forhand?: string }> }

function hamta(dagStr: string) {
  const dag = Number(dagStr)
  if (!Number.isInteger(dag) || dag < 1 || dag > 24) return null
  return LUCKOR.find(l => l.dag === dag) ?? null
}

/** Delningsbar sida per lucka. Rubrik och teaser syns för alla, hela luckan för inloggade. */
export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const { dag } = await params
  const sp = await searchParams
  const lucka = hamta(dag)
  if (!lucka) return {}
  const titel = `Lucka ${lucka.dag}: ${lucka.titel} | Svallas julkalender ${AR}`
  return {
    title: titel,
    description: lucka.teaser,
    alternates: { canonical: `https://svalla.se/julkalender/${lucka.dag}` },
    openGraph: { title: titel, description: lucka.teaser, url: `https://svalla.se/julkalender/${lucka.dag}` },
    ...(sp.forhand ? { robots: { index: false, follow: false } } : {}),
  }
}

export default async function LuckSida({ params, searchParams }: Props) {
  const { dag: dagStr } = await params
  const sp = await searchParams
  const lucka = hamta(dagStr)
  if (!lucka) notFound()

  const tillatTest = process.env.VERCEL_ENV !== 'production'
  const testdag = tillatTest && sp.testdag ? Number(sp.testdag) : undefined
  const forhand = sp.forhand === FORHANDS_KOD
  const oppna = forhand ? 24 : oppnaLuckor(new Date(), testdag)
  const harOppnat = lucka.dag <= oppna

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const inloggad = forhand || !!user
  const loginUrl = `/logga-in?mode=ny&returnTo=/julkalender/${lucka.dag}`
  const kort: React.CSSProperties = {
    borderRadius: 16, padding: '18px 18px 20px', border: '1px solid var(--surface-3)',
    background: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 8,
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 80 }}>
      {!forhand && harOppnat && <JulkalenderVisad dag={lucka.dag} inloggad={!!user} />}
      <div style={{ background: 'linear-gradient(180deg,#a9c4dd 0%,#d9dfe9 70%,#eee2e0 100%)', padding: 'calc(env(safe-area-inset-top, 0px) + 24px) 20px 28px', textAlign: 'center' }}>
        <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.18em', color: '#b5591a' }}>SVALLAS JULKALENDER {AR}</div>
        <h1 style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: 800, color: '#0f2f40', margin: '8px 0 0' }}>Lucka {lucka.dag}</h1>
      </div>

      <div style={{ maxWidth: 640, margin: '0 auto', padding: '24px 16px' }}>
        {!harOppnat ? (
          <div style={kort}>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)' }}>Den här luckan öppnas {lucka.dag} december.</div>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', margin: 0 }}>Luckorna öppnas en per dag 1 till 24 december.</p>
          </div>
        ) : inloggad ? (
          <JulkalenderLucka lucka={lucka} idag={true} stil={kort} nummerFarg="#c0392b" />
        ) : (
          <div style={kort}>
            <div style={{ fontSize: 20, fontWeight: 800, color: 'var(--ink)' }}>{lucka.titel}</div>
            <p style={{ fontSize: 15, color: 'var(--ink-muted)', lineHeight: 1.6, margin: 0 }}>{lucka.teaser}</p>
            <JulkalenderLoggaIn dag={lucka.dag} plats="lucksida_logga_in" href={loginUrl} style={{ alignSelf: 'flex-start', marginTop: 8, background: '#b5591a', color: '#fff', padding: '12px 22px', borderRadius: 50, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}>
              Skapa ett gratis konto och öppna luckan →
            </JulkalenderLoggaIn>
            <div style={{ fontSize: 13, color: 'var(--ink-muted)' }}>
              Har du redan konto? <Link href={`/logga-in?returnTo=/julkalender/${lucka.dag}`} style={{ color: 'var(--sea)' }}>Logga in</Link>
            </div>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: 20 }}>
          <Link href={forhand ? `/julkalender?forhand=${FORHANDS_KOD}` : '/julkalender'} style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>← Alla luckor</Link>
        </div>
      </div>
    </div>
  )
}

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { LUCKOR, AR, oppnaLuckor, FORHANDS_KOD } from '@/lib/julkalender'
import JulkalenderLucka from '../JulkalenderLucka'
import { JulkalenderVisad, JulkalenderLoggaIn } from '../JulkalenderMatning'
import SvallaLogo from '@/components/SvallaLogo'
import { JULKALENDER_CSS, LANDSKAP_SVG, tonFor, ikonFor } from '../julkalender-stil'
import { ogSida } from '@/lib/og-standard'

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
  // Avslöja inte innehållet i förväg: titel och teaser syns i metadata först när luckan har öppnats
  const tillatTest = process.env.VERCEL_ENV !== 'production'
  const testdag = tillatTest && sp.testdag ? Number(sp.testdag) : undefined
  const oppen = sp.forhand === FORHANDS_KOD || lucka.dag <= oppnaLuckor(new Date(), testdag)
  const titel = oppen ? `Lucka ${lucka.dag}: ${lucka.titel} | Svallas julkalender ${AR}` : `Lucka ${lucka.dag} | Svallas julkalender ${AR}`
  const beskrivning = oppen ? lucka.teaser : `Lucka ${lucka.dag} öppnas ${lucka.dag} december.`
  return {
    title: titel,
    description: beskrivning,
    alternates: { canonical: `https://svalla.se/julkalender/${lucka.dag}` },
    openGraph: { images: ogSida(`https://svalla.se/julkalender/${lucka.dag}`), title: titel, description: beskrivning, url: `https://svalla.se/julkalender/${lucka.dag}` },
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
  const ton = lucka.dag === 24 ? 'rod' : tonFor(lucka.dag)
  const topp = (
    <>
      <span className="jk-ikon" dangerouslySetInnerHTML={{ __html: ikonFor(lucka.dag) }} />
      <div className="jk-nr">{lucka.dag}</div>
    </>
  )
  const alla = forhand ? `/julkalender?forhand=${FORHANDS_KOD}` : '/julkalender'

  return (
    <div className="jk">
      <style dangerouslySetInnerHTML={{ __html: JULKALENDER_CSS }} />
      {!forhand && harOppnat && <JulkalenderVisad dag={lucka.dag} inloggad={!!user} />}
      <header className="jk-hero">
        <div className="jk-stjarnor" />
        <div className="jk-sno" />
        <div className="jk-top">
          <Link href="/" aria-label="Svalla, till startsidan"><SvallaLogo height={30} /></Link>
          <Link href={alla} className="jk-hem">← Alla luckor</Link>
        </div>
        <div className="jk-inner" style={{ paddingTop: 22 }}>
          <div className="jk-eyebrow">SVALLAS JULKALENDER {AR}</div>
          <h1 className="jk-h1">Lucka <em>{lucka.dag}</em></h1>
        </div>
        <div dangerouslySetInnerHTML={{ __html: LANDSKAP_SVG }} />
      </header>

      <div className="jk-wrap" style={{ maxWidth: 720 }}>
        <div className="jk-grid" style={{ gridTemplateColumns: '1fr' }}>
          {!harOppnat ? (
            <div className="jk-dorr jk-last" data-ton={ton}>
              {topp}
              <div className="jk-titel">Den här luckan öppnas {lucka.dag} december.</div>
              <div className="jk-litet">Luckorna öppnas en per dag 1 till 24 december.</div>
            </div>
          ) : inloggad ? (
            <JulkalenderLucka lucka={lucka} idag={true} klass="jk-dorr" ton={ton} topp={topp} />
          ) : (
            <div className="jk-dorr" data-ton={ton} style={{ padding: '24px 24px 26px' }}>
              {topp}
              <div className="jk-titel" style={{ fontSize: 24 }}>{lucka.titel}</div>
              <p className="jk-text">{lucka.teaser}</p>
              <JulkalenderLoggaIn dag={lucka.dag} plats="lucksida_logga_in" href={loginUrl} className="jk-cta" style={{ alignSelf: 'flex-start' }}>
                Skapa ett gratis konto och öppna luckan →
              </JulkalenderLoggaIn>
              <div className="jk-litet" style={{ marginTop: 6 }}>
                Har du redan konto? <Link href={`/logga-in?returnTo=/julkalender/${lucka.dag}`} style={{ color: 'inherit', textDecoration: 'underline' }}>Logga in</Link>
              </div>
            </div>
          )}
        </div>
        <div className="jk-fot">
          <Link href="/" className="jk-fot-logga" aria-label="Svalla"><SvallaLogo height={26} color="#0a2540" /></Link>
          <div><Link href={alla}>← Alla luckor</Link></div>
        </div>
      </div>
    </div>
  )
}

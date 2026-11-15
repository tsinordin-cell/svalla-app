import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { LUCKOR, AR, oppnaLuckor, kalenderSlut, FORHANDS_KOD, idagSverige } from '@/lib/julkalender'
import SvallaLogo from '@/components/SvallaLogo'
import { JULKALENDER_CSS, LANDSKAP_SVG, tonFor, ikonFor } from './julkalender-stil'
import JulkalenderLucka from './JulkalenderLucka'
import JulkalenderFramsteg from './JulkalenderFramsteg'
import { JulkalenderVisad, JulkalenderLoggaIn } from './JulkalenderMatning'

const metadata: Metadata = {
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

type Props = { searchParams: Promise<{ testdag?: string; forhand?: string }> }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const sp = await searchParams
  // Förhandslänken ska aldrig indexeras
  return sp.forhand ? { ...metadata, robots: { index: false, follow: false } } : metadata
}

export default async function JulkalenderPage({ searchParams }: Props) {
  const sp = await searchParams
  // Förhandsvisning: ?testdag=N fungerar bara utanför produktion
  const tillatTest = process.env.VERCEL_ENV !== 'production'
  const testdag = tillatTest && sp.testdag ? Number(sp.testdag) : undefined
  // Förhandslänk (t.ex. till rådgivare): alla luckor öppna, som i december, utan inloggning
  const forhand = sp.forhand === FORHANDS_KOD
  const oppna = forhand ? 24 : oppnaLuckor(new Date(), testdag)

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  const inloggad = forhand || !!user
  const loginUrl = '/logga-in?mode=ny&returnTo=/julkalender'

  // Nedräkning till första luckan (svensk tid)
  const { ar, manad, dag: idagDag } = idagSverige()
  const dagarKvar = oppna === 0 && ar === AR
    ? Math.round((Date.UTC(AR, 11, 1) - Date.UTC(ar, manad - 1, idagDag)) / 86400000)
    : 0

  return (
    <div className="jk">
      <style dangerouslySetInnerHTML={{ __html: JULKALENDER_CSS }} />
      {!forhand && <JulkalenderVisad dag={oppna} inloggad={!!user} />}
      {forhand && (
        <div className="jk-forhand">
          Förhandsvisning: så här ser kalendern ut i december. Alla luckor är öppna här, på svalla.se öppnas de en per dag 1 till 24 december för inloggade.
        </div>
      )}

      <header className="jk-hero">
        <div className="jk-stjarnor" />
        <div className="jk-sno" />
        <div className="jk-sno b" />
        <div className="jk-top">
          <Link href="/" aria-label="Svalla, till startsidan"><SvallaLogo height={30} /></Link>
          <Link href="/" className="jk-hem">← Till svalla.se</Link>
        </div>
        <div className="jk-inner">
          <div className="jk-eyebrow">1 TILL 24 DECEMBER {AR}</div>
          <h1 className="jk-h1">Svallas <em>julkalender</em></h1>
          <p className="jk-ingress">
            En lucka om dagen med tips om skärgården i vinter. Luckorna öppnas en i taget, och missade luckor går att öppna i efterhand.
          </p>
          {!inloggad && (
            <JulkalenderLoggaIn dag={oppna} href={loginUrl} className="jk-cta">
              {oppna === 0 ? 'Skapa konto nu så är du redo 1 december →' : 'Skapa konto och öppna dagens lucka →'}
            </JulkalenderLoggaIn>
          )}
          {oppna === 0 && dagarKvar > 0 && (
            <div><div className="jk-nedrakning"><b>{dagarKvar}</b> {dagarKvar === 1 ? 'dag kvar till första luckan' : 'dagar kvar till första luckan'}</div></div>
          )}
        </div>
        <div dangerouslySetInnerHTML={{ __html: LANDSKAP_SVG }} />
      </header>

      <div className="jk-wrap">
        {!forhand && kalenderSlut() && (
          <div className="jk-kort">
            <div style={{ fontSize: 18, fontWeight: 800, color: 'var(--ink)' }}>Kalendern är slut. Skärgården är inte det.</div>
            <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.6, margin: '6px 0 10px' }}>Alla 24 luckor finns kvar här. Vill du vidare finns våra guider.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              <Link href="/guider/nyar-skargarden" style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)' }}>Nyår i skärgården →</Link>
              <Link href="/guider/vinter-i-skargarden" style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)' }}>Vinter i skärgården →</Link>
            </div>
          </div>
        )}
        {inloggad && !forhand && <JulkalenderFramsteg oppna={oppna} />}
        <div className="jk-grid">
          {Array.from({ length: 24 }, (_, i) => i + 1).map(dag => {
            const lucka = LUCKOR.find(l => l.dag === dag)
            const harOppnat = dag <= oppna
            const idag = dag === oppna
            const klass = `jk-dorr${dag === 24 ? ' jk-stor' : ''}${idag ? ' jk-idag' : ''}${harOppnat ? '' : ' jk-last'}`
            const ton = dag === 24 ? 'rod' : tonFor(dag)
            const topp = (
              <>
                <span className="jk-ikon" dangerouslySetInnerHTML={{ __html: ikonFor(dag) }} />
                {idag && <span className="jk-idag-etikett">IDAG</span>}
                <div className="jk-nr">{dag}</div>
              </>
            )

            if (!harOppnat) {
              return (
                <div key={dag} className={klass} data-ton={ton}>
                  {topp}
                  {dag === 24 && <div className="jk-titel">Julafton</div>}
                  <div className="jk-las">
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
                    Öppnas {dag} december
                  </div>
                  <span className="jk-rosett" />
                </div>
              )
            }
            if (!inloggad) {
              return (
                <JulkalenderLoggaIn key={dag} dag={dag} href={loginUrl} className={klass} data-ton={ton}>
                  {topp}
                  {lucka && <div className="jk-titel">{lucka.titel}</div>}
                  {lucka && <div className="jk-teaser">{lucka.teaser}</div>}
                  <div className="jk-litet">Skapa ett gratis konto för att läsa hela luckan</div>
                  <div className="jk-oppna">Öppna →</div>
                </JulkalenderLoggaIn>
              )
            }
            if (!lucka) {
              return (
                <div key={dag} className={klass} data-ton={ton}>
                  {topp}
                  <div className="jk-litet">Kommer snart</div>
                </div>
              )
            }
            return <JulkalenderLucka key={dag} lucka={lucka} idag={idag} klass={klass} ton={ton} topp={topp} />
          })}
        </div>
        <div className="jk-fot">
          <Link href="/" className="jk-fot-logga" aria-label="Svalla"><SvallaLogo height={26} color="#0a2540" /></Link>
          <div>Gjord i skärgården, för alla som längtar ut på vattnet även i vinter.</div>
          <div>Svalla skriver inga priser. Hittar du något som inte stämmer, skriv till <a href="mailto:info@svalla.se">info@svalla.se</a>.</div>
        </div>
      </div>
    </div>
  )
}

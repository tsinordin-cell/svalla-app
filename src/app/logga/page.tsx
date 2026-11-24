'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { createClient, getViewer } from '@/lib/supabase'
import Icon from '@/components/Icon'
import AppTopBar from '@/components/AppTopBar'
import { track } from '@/lib/analytics-events'

function LoggaChoice() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const plannedRouteId = searchParams.get('planned_route_id')

  // Auth gate
  const [authReady, setAuthReady] = useState(false)
  useEffect(() => {
    const supabase = createClient()
    getViewer(supabase).then(({ data }) => {
      if (!data.user) { router.push('/logga-in?returnTo=%2Flogga&mode=ny'); return }
      setAuthReady(true)
    })
  }, [router])
  if (!authReady) return null
  const suffix = plannedRouteId ? `?planned_route_id=${plannedRouteId}` : ''

  return (
    // 2026-11-24 (fixlistan nr 9, version 6, Toms styrning): samma ljusa bakgrund som övriga
    // sidor, men det levande från förra sidan är kvar: grön LIVE GPS-bricka (loggan står i toppraden sedan 2026-11-25),
    // varm SNABB-LOGG-bricka (sand/bärnsten som passar havsblått), stora ikoner och kort
    // med djup. Spåra live-kortet har förra sidans havsgradient, så det sticker ut även i
    // mörkt läge. Wifi-ikonen är en GPS-pil. All text klarar WCAG AA (4,5:1).
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)' }}>

      {/* 2026-11-25 (Tom): samma topprad som Planera (loggan, sök, meddelanden, notiser)
          i stället för tillbakapil och sidnamn. Bottenmenyn finns kvar för att gå vidare.
          Den stora loggan i sidan är borttagen: toppraden har den redan. */}
      <AppTopBar doljPaDesktop />

      {/* Hero text */}
      <div style={{ padding: '20px 20px 28px', textAlign: 'center' }}>
        <h1 style={{
          fontSize: 28, fontWeight: 700, color: 'var(--txt)',
          margin: '0 0 8px', lineHeight: 1.15,
        }}>
          Hur vill du logga?
        </h1>
        <p style={{ fontSize: 14, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>
          Spåra live för full GPS-data, eller snabblogga i efterhand
        </p>
      </div>

      {/* Cards */}
      <div style={{ padding: '0 16px', width: '100%', maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 12, boxSizing: 'border-box' }}>

        {/* GPS tracking – primary */}
        <button
          onClick={() => { track('trip_logging_started', {}); router.push(`/spara${suffix}`) }}
          className="press-feedback"
          style={{
            width: '100%', borderRadius: 22, padding: '22px 20px',
            background: 'linear-gradient(160deg, #0d3a48 0%, #0a6b7b 100%)',
            border: 'none',
            boxShadow: '0 10px 30px rgba(10,50,65,0.32)',
            cursor: 'pointer', textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 44,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'rgba(34,197,94,0.2)', borderRadius: 20,
                padding: '4px 10px', marginBottom: 10,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: '#86efac', letterSpacing: '0.5px' }}>LIVE GPS</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: '#ffffff', marginBottom: 6 }}>Spåra live</div>
              <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5 }}>
                GPS loggar rutten automatiskt. Se karta, hastighet och stopp när turen är klar.
              </div>
              {/* Bara på dator (≥1024 px): spårningen görs med telefonen ute på sjön. */}
              <div className="logga-mobiltips" style={{ fontSize: 12, color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, marginTop: 8, fontStyle: 'italic' }}>
                Gjord för mobilen. Öppna Svalla i telefonen när du ska ut på sjön.
              </div>
            </div>
            <div style={{ flexShrink: 0, color: '#ffffff', display: 'flex' }}>
              <Icon name="navigation" size={36} stroke={1.75} />
            </div>
          </div>
          <div style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
            color: '#ffffff', fontSize: 13, fontWeight: 700,
          }}>
            Starta spårning
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Manual quick-log */}
        <button
          onClick={() => router.push(`/logga/manuell${suffix}`)}
          className="press-feedback"
          style={{
            width: '100%', borderRadius: 22, padding: '22px 20px',
            background: 'var(--white)',
            border: '1.5px solid var(--sea-10)',
            boxShadow: '0 6px 22px rgba(0,30,50,0.10)',
            cursor: 'pointer', textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 44,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div className="logga-bricka-sand" style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                borderRadius: 20,
                padding: '4px 10px', marginBottom: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.5px' }}>SNABB-LOGG</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>Snabb-logg</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                Fyll i plats, distans och tid själv, med eller utan bild. Ingen GPS behövs.
              </div>
            </div>
            <div style={{ flexShrink: 0, color: 'var(--sea)', display: 'flex' }}>
              <Icon name="camera" size={36} stroke={1.75} />
            </div>
          </div>
          <div style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--sea)', fontSize: 13, fontWeight: 700,
          }}>
            Logga utan GPS
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 15, height: 15 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </button>

        {/* Tips */}
        <p style={{
          textAlign: 'center', fontSize: 12,
          color: 'var(--txt3)',
          margin: '8px 0 0', lineHeight: 1.5,
        }}>
          Turen dyker upp i flödet och på din profil direkt efter sparning.
        </p>
      </div>
    </div>
  )
}

export default function LoggaChoicePage() {
  return <Suspense><LoggaChoice /></Suspense>
}

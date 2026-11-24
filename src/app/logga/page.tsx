'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useEffect, useState } from 'react'
import { createClient, getViewer } from '@/lib/supabase'
import Icon from '@/components/Icon'
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
    // 2026-11-24 (Toms val, fixlistan nr 9): sidan hade ett eget mörkt havstema
    // (#0a1e2c → #0a7b8c) som ingen annan sida har, en andra SVALLA-logga mitt i
    // innehållet och en wifi-ikon för GPS. Inget i koden eller granskningarna
    // sade att det mörka var gjort för solljus på sjön, och nästa steg i
    // flödet (/logga/manuell) är ljust. Nu samma ytor som resten: var(--bg),
    // kort i var(--white), så sidan följer också användarens ljusa/mörka läge.
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', background: 'var(--bg)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 88px)' }}>

      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: '14px 16px',
      }}>
        <button
          onClick={() => router.back()}
          aria-label="Gå tillbaka"
          className="press-feedback"
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'var(--sea-08)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <span style={{ color: 'var(--txt2)', fontSize: 14, fontWeight: 600 }}>Logga tur</span>
      </header>

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
            background: 'var(--white)',
            border: '1.5px solid var(--sea-15)',
            boxShadow: '0 6px 24px rgba(0,45,60,0.10)',
            cursor: 'pointer', textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 44,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'var(--ok-bg)', borderRadius: 20,
                padding: '4px 10px', marginBottom: 10,
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--green)', display: 'inline-block' }} />
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--ok)', letterSpacing: '0.5px' }}>LIVE GPS</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>Spåra live</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                GPS loggar rutten automatiskt. Se karta, hastighet och stopp när turen är klar.
              </div>
              {/* Bara på dator (≥1024 px): spårningen görs med telefonen ute på sjön. */}
              <div className="logga-mobiltips" style={{ fontSize: 12, color: 'var(--txt3)', lineHeight: 1.5, marginTop: 8 }}>
                Gjord för mobilen. Öppna Svalla i telefonen när du ska ut på sjön.
              </div>
            </div>
            <div style={{
              flexShrink: 0, width: 52, height: 52, borderRadius: 16,
              background: 'var(--sea-08)', color: 'var(--sea)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="navigation" size={26} stroke={1.9} />
            </div>
          </div>
          <div style={{
            marginTop: 16, display: 'flex', alignItems: 'center', gap: 6,
            color: 'var(--sea)', fontSize: 13, fontWeight: 700,
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
            boxShadow: '0 2px 12px rgba(0,30,50,0.06)',
            cursor: 'pointer', textAlign: 'left',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 44,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                background: 'var(--acc-10)', borderRadius: 20,
                padding: '4px 10px', marginBottom: 10,
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--acc-text)', letterSpacing: '0.5px' }}>SNABB-LOGG</span>
              </div>
              <div style={{ fontSize: 20, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>Snabb-logg</div>
              <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.5 }}>
                Fyll i plats, distans och tid själv, med eller utan bild. Ingen GPS behövs.
              </div>
            </div>
            <div style={{
              flexShrink: 0, width: 52, height: 52, borderRadius: 16,
              background: 'var(--acc-10)', color: 'var(--acc-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Icon name="camera" size={26} stroke={1.9} />
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

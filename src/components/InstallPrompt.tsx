'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

// Visa bara install-prompten på app-sidor
const APP_PATHS = ['/platser', '/rutter', '/logga', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/o/']

const BESOK = 'svalla-besok'
const RAKNAD_I_SESSIONEN = 'svalla-besok-raknad'
const AVBOJT = 'svalla-install-avbojt'
/** Äldre nyckel, bara i sessionStorage. Läses fortfarande så att den som
 *  redan tryckt "Inte nu" i den här sessionen inte får rutan igen direkt. */
const AVBOJT_GAMMAL = 'svalla-install-dismissed'

/**
 * Rutan visas först vid andra besöket.
 *
 * Skälet: den låg fast i underkanten och täckte fotot på ösidan efter fem
 * sekunder — för en förstagångsbesökare innan de sett något av vad Svalla är.
 * Att be någon installera en app de inte hunnit titta på är att fråga för
 * tidigt. Andra besöket betyder att de kom tillbaka, och då är frågan rimlig.
 *
 * Besöket räknas en gång per session i localStorage. sessionStorage räcker
 * inte: det nollställs när fliken stängs, och då vore varje besök det första.
 *
 * Allt går genom try/catch. I privat läge kastar både localStorage och
 * sessionStorage, och en install-ruta får aldrig vara det som kraschar sidan.
 */
function raknaBesok(): number {
  try {
    const nu = Number(window.localStorage.getItem(BESOK)) || 0
    if (window.sessionStorage.getItem(RAKNAD_I_SESSIONEN)) return nu
    const nytt = nu + 1
    window.localStorage.setItem(BESOK, String(nytt))
    window.sessionStorage.setItem(RAKNAD_I_SESSIONEN, '1')
    return nytt
  } catch {
    // Kan inte räkna — då visar vi ingen ruta hellre än en i tid och otid.
    return 0
  }
}

function harAvbojt(): boolean {
  try {
    return !!(window.localStorage.getItem(AVBOJT) || window.sessionStorage.getItem(AVBOJT_GAMMAL))
  } catch {
    return false
  }
}

export default function InstallPrompt() {
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    if (standalone || harAvbojt()) return

    // Andra besöket, inte det första. Se raknaBesok().
    if (raknaBesok() < 2) return

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)

    if (ios) {
      const t = setTimeout(() => { setIsIOS(true); setShow(true) }, 8000)
      return () => clearTimeout(t)
    }

    // Android / Chrome — fånga beforeinstallprompt
    let timer: ReturnType<typeof setTimeout> | null = null
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      timer = setTimeout(() => setShow(true), 5000)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => {
      window.removeEventListener('beforeinstallprompt', handler)
      if (timer) clearTimeout(timer)
    }
  }, [])

  function dismiss() {
    /*
      localStorage, inte sessionStorage: ett "Inte nu" som kommer tillbaka
      nästa gång fliken öppnas är inte ett svar, det är en påminnelse. Den
      som tackat nej ska slippa frågan.
    */
    try { window.localStorage.setItem(AVBOJT, '1') } catch { /* privat läge */ }
    setShow(false)
  }

  async function installAndroid() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') { try { window.localStorage.setItem(AVBOJT, '1') } catch { /* privat läge */ } }
    setShow(false)
    setDeferredPrompt(null)
  }

  if (!show) return null
  if (!APP_PATHS.some(p => pathname?.startsWith(p))) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 12px)',
      left: 12, right: 12, zIndex: 9999,
      background: 'rgba(26,58,94,0.97)', backdropFilter: 'blur(16px)',
      borderRadius: 20, padding: '16px 18px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      display: 'flex', gap: 14, alignItems: 'flex-start',
      animation: 'slideUp 0.35s ease',
    }}>
      {/* App-ikon — exakt samma som favicon/hemskärmsikon */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/favicon.svg"
        alt="Svalla"
        width={52}
        height={52}
        style={{ borderRadius: 14, flexShrink: 0, display: 'block' }}
      />

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
          Lägg till Svalla på hemskärmen
        </p>
        {isIOS ? (
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.4 }}>
            Tryck på{' '}
            <span style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 4, padding: '1px 5px', fontSize: 13 }}>⎋</span>
            {' '}och välj <strong style={{ color: 'rgba(255,255,255,0.85)' }}>&quot;Lägg till på hemskärmen&quot;</strong>
          </p>
        ) : (
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button onClick={installAndroid} style={{
              padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
              background: 'var(--grad-acc)',
              color: '#fff', fontSize: 12, fontWeight: 600,
            }}>
              Installera
            </button>
            <button onClick={dismiss} style={{
              padding: '7px 12px', borderRadius: 20,
              border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
              background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 12,
            }}>
              Inte nu
            </button>
          </div>
        )}
      </div>

      {/* Stäng (iOS) */}
      {isIOS && (
        <button onClick={dismiss} aria-label="Stäng" style={{
          background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%',
          width: 28, height: 28, cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, flexShrink: 0,
        }}>×</button>
      )}

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Visa bara install-prompten på app-sidor
const APP_PATHS = ['/platser', '/rutter', '/logga', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/o/']

export default function InstallPrompt() {
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null)
  const pathname = usePathname()

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches
    const dismissed = sessionStorage.getItem('svalla-install-dismissed')
    if (standalone || dismissed) return

    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent)

    if (ios) {
      const t = setTimeout(() => { setIsIOS(true); setShow(true) }, 8000)
      return () => clearTimeout(t)
    }

    // Android / Chrome — fånga beforeinstallprompt
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handler = (e: any) => {
      e.preventDefault()
      setDeferredPrompt(e)
      const t = setTimeout(() => setShow(true), 5000)
      return () => clearTimeout(t)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  function dismiss() {
    sessionStorage.setItem('svalla-install-dismissed', '1')
    setShow(false)
  }

  async function installAndroid() {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === 'accepted') sessionStorage.setItem('svalla-install-dismissed', '1')
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
            {' '}och välj <strong style={{ color: 'rgba(255,255,255,0.85)' }}>"Lägg till på hemskärmen"</strong>
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
        <button onClick={dismiss} style={{
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

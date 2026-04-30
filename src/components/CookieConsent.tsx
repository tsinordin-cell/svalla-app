'use client'

import { useEffect, useState } from 'react'

const STORAGE_KEY = 'svalla_cookie_consent'

type ConsentValue = 'accepted' | 'necessary'

/**
 * GDPR-cookie-consent banner.
 *
 * - Visas tills user klickar "Acceptera alla" eller "Endast nödvändiga"
 * - Sparar val i localStorage
 * - Custom event 'svalla-consent-changed' så andra komponenter (PostHog, push) kan reagera
 *
 * Hur andra komponenter ska kolla consent:
 *   import { hasAnalyticsConsent } from '@/components/CookieConsent'
 *   if (hasAnalyticsConsent()) posthog.init(...)
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(STORAGE_KEY) === 'accepted'
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) {
      // Liten delay så bannern inte poppar upp omedelbart vid varje page-load
      const t = setTimeout(() => setVisible(true), 800)
      return () => clearTimeout(t)
    }
  }, [])

  function setConsent(value: ConsentValue) {
    window.localStorage.setItem(STORAGE_KEY, value)
    document.cookie = `${STORAGE_KEY}=${value}; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`
    window.dispatchEvent(new CustomEvent('svalla-consent-changed', { detail: { value } }))
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      role="dialog"
      aria-label="Cookie-inställningar"
      style={{
        position: 'fixed',
        bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 12px)',
        left: 12,
        right: 12,
        maxWidth: 540,
        margin: '0 auto',
        background: 'var(--card-bg, #fff)',
        borderRadius: 16,
        border: '1px solid rgba(10,123,140,0.18)',
        boxShadow: '0 12px 36px rgba(10,31,43,0.20)',
        padding: '18px 20px',
        zIndex: 1000,
        animation: 'svallaConsentSlide 280ms cubic-bezier(.2,.8,.2,1)',
      }}
    >
      <style>{`
        @keyframes svallaConsentSlide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <h3 style={{
        fontSize: 14, fontWeight: 700, color: 'var(--txt)',
        margin: '0 0 6px', letterSpacing: '0.01em',
      }}>
        Vi använder cookies
      </h3>
      <p style={{
        fontSize: 13, color: 'var(--txt2)', lineHeight: 1.55,
        margin: '0 0 14px',
      }}>
        Nödvändiga cookies behövs för att Svalla ska fungera (inloggning, förfrågningar).
        För att förbättra upplevelsen använder vi även analys-cookies (PostHog) och kan skicka
        push-notiser. Du kan ändra ditt val när som helst. <a href="/integritet" style={{ color: 'var(--sea)', textDecoration: 'underline' }}>Läs mer</a>.
      </p>

      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        <button
          onClick={() => setConsent('accepted')}
          style={{
            flex: '1 1 200px',
            padding: '11px 18px',
            background: 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
            color: '#fff',
            borderRadius: 10,
            border: 'none',
            fontSize: 13, fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            boxShadow: '0 3px 10px rgba(10,123,140,0.25)',
            fontFamily: 'inherit',
            transition: 'transform 120ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)' }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)' }}
        >
          Acceptera alla
        </button>
        <button
          onClick={() => setConsent('necessary')}
          style={{
            flex: '1 1 160px',
            padding: '11px 18px',
            background: 'rgba(10,123,140,0.06)',
            color: 'var(--sea)',
            borderRadius: 10,
            border: 'none',
            fontSize: 13, fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            fontFamily: 'inherit',
          }}
        >
          Endast nödvändiga
        </button>
      </div>
    </div>
  )
}

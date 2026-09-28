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
        /* 2026-09-28 (Toms beslut, förslag 1 i appgenomgången): en låg remsa i
           nederkant i stället för en ruta som täckte ~45 % av en telefonskärm och
           låg ovanpå öns viktigaste uppgifter och knappar. Samma två val som förut,
           samma vikt på båda knapparna. Texten är kortad; allt står i policyn. */
        position: 'fixed',
        bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 8px)',
        left: 8,
        right: 8,
        maxWidth: 640,
        margin: '0 auto',
        background: 'var(--card-bg, #fff)',
        borderRadius: 12,
        border: '1px solid rgba(10,123,140,0.18)',
        boxShadow: '0 8px 24px rgba(10,31,43,0.18)',
        padding: '10px 12px',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        flexWrap: 'wrap',
        animation: 'svallaConsentSlide 280ms cubic-bezier(.2,.8,.2,1)',
      }}
    >
      <style>{`
        @keyframes svallaConsentSlide {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <p style={{
        flex: '1 1 220px',
        fontSize: 12.5, color: 'var(--txt2)', lineHeight: 1.45,
        margin: 0,
      }}>
        <strong style={{ color: 'var(--txt)', fontWeight: 700 }}>Cookies:</strong>{' '}
        nödvändiga för inloggning, analys (PostHog) bara om du godkänner.{' '}
        <a href="/integritetspolicy" style={{ color: 'var(--sea)', textDecoration: 'underline' }}>Läs mer</a>
      </p>

      <div style={{ display: 'flex', gap: 6, flex: '0 0 auto' }}>
        <button
          onClick={() => setConsent('accepted')}
          style={{
            padding: '9px 14px',
            background: 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
            color: '#fff',
            borderRadius: 9,
            border: 'none',
            fontSize: 12.5, fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          Acceptera alla
        </button>
        <button
          onClick={() => setConsent('necessary')}
          style={{
            padding: '9px 14px',
            /* Samma vikt som "Acceptera alla" (2026-09-20, Toms delegation). */
            background: 'var(--card-bg, #fff)',
            color: 'var(--sea)',
            borderRadius: 9,
            border: '1.5px solid var(--sea)',
            fontSize: 12.5, fontWeight: 700,
            cursor: 'pointer',
            letterSpacing: '0.02em',
            fontFamily: 'inherit',
            whiteSpace: 'nowrap',
          }}
        >
          Endast nödvändiga
        </button>
      </div>
    </div>
  )
}

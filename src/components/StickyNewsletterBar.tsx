'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * Dyker upp efter 60% scroll på sidan.
 * Visas max en gång per session — dismissas med ✕.
 */
export default function StickyNewsletterBar() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Visa inte om användaren redan stängt den under sessionen
    if (sessionStorage.getItem('nl-bar-dismissed')) {
      setDismissed(true)
      return
    }

    function onScroll() {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (total > 0 && scrolled / total >= 0.6) {
        setVisible(true)
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function dismiss() {
    setDismissed(true)
    setVisible(false)
    sessionStorage.setItem('nl-bar-dismissed', '1')
  }

  if (dismissed || !visible) return null

  return (
    <div
      role="complementary"
      aria-label="Prenumerera på Svallanyheter"
      style={{
        position: 'fixed',
        bottom: 72, // above bottom nav
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 900,
        width: 'min(92vw, 520px)',
        background: 'var(--white, #fff)',
        borderRadius: 18,
        boxShadow: '0 8px 32px rgba(10,123,140,0.18), 0 2px 8px rgba(0,0,0,0.08)',
        border: '1.5px solid rgba(10,123,140,0.14)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        animation: 'nlbar-in 0.3s cubic-bezier(0.34,1.56,0.64,1) both',
      }}
    >
      <style>{`
        @keyframes nlbar-in {
          from { opacity: 0; transform: translateX(-50%) translateY(16px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0);    }
        }
      `}</style>

      {/* Ikon */}
      <div style={{
        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
        background: 'linear-gradient(135deg, #0a7b8c, #1a4a6b)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} style={{ width: 18, height: 18 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt, #1a1a1a)', margin: '0 0 2px', lineHeight: 1.3 }}>
          Fler guider som denna, varannan tisdag
        </p>
        <p style={{ fontSize: 12, color: 'var(--txt2, rgba(0,0,0,0.55))', margin: 0, lineHeight: 1.4 }}>
          Insidertips du inte hittar på TripAdvisor. Gratis.
        </p>
      </div>

      {/* CTA */}
      <Link
        href="/nyhetsbrev"
        style={{
          display: 'inline-block', flexShrink: 0,
          background: 'linear-gradient(135deg, #0a7b8c, #1a4a6b)',
          color: '#fff', fontSize: 13, fontWeight: 700,
          padding: '9px 16px', borderRadius: 22,
          textDecoration: 'none', whiteSpace: 'nowrap',
        }}
      >
        Prenumerera →
      </Link>

      {/* Stäng */}
      <button
        onClick={dismiss}
        aria-label="Stäng"
        style={{
          flexShrink: 0, background: 'none', border: 'none',
          cursor: 'pointer', padding: 4, color: 'var(--txt3, rgba(0,0,0,0.35))',
          fontSize: 16, lineHeight: 1,
        }}
      >
        ✕
      </button>
    </div>
  )
}

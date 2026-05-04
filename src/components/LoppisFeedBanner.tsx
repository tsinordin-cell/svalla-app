'use client'
/**
 * LoppisFeedBanner — diskret announcement-banner överst i flödet om
 * att Loppis-funktionen finns. Dismiss sparas i localStorage så den
 * inte återkommer.
 *
 * Visas EN gång per användare. Premium-känsla via subtle gradient,
 * inte spam-känsla.
 */
import { useEffect, useState } from 'react'
import Link from 'next/link'

const STORAGE_KEY = 'svalla-loppis-banner-dismissed-v1'

export default function LoppisFeedBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) {
        // Lite delay så den inte poppar in i första frame
        const t = setTimeout(() => setShow(true), 250)
        return () => clearTimeout(t)
      }
    } catch { /* SSR / no-storage — skippar */ }
  }, [])

  function dismiss() {
    setShow(false)
    try { localStorage.setItem(STORAGE_KEY, '1') } catch { /* ignore */ }
  }

  if (!show) return null

  return (
    <div
      role="status"
      style={{
        position: 'relative',
        margin: '0 0 14px',
        padding: '14px 16px 14px 18px',
        borderRadius: 16,
        background: 'linear-gradient(135deg, rgba(10,123,140,0.10), rgba(201,110,42,0.10))',
        border: '1px solid rgba(10,123,140,0.20)',
        display: 'flex', alignItems: 'center', gap: 14,
        animation: 'svalla-loppis-fadein 0.4s ease-out',
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: 'linear-gradient(135deg, var(--sea), var(--acc, #c96e2a))',
        color: '#fff',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(10,123,140,0.25)',
      }}>
        <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 5,
          fontSize: 10, fontWeight: 800, color: 'var(--acc, #c96e2a)',
          letterSpacing: '0.6px', textTransform: 'uppercase',
          marginBottom: 2,
        }}>
          <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--acc, #c96e2a)' }} />
          Nytt
        </div>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2, lineHeight: 1.3 }}>
          Loppis & köp/sälj är öppet
        </div>
        <Link
          href="/forum/loppis"
          style={{
            fontSize: 12, color: 'var(--sea)',
            textDecoration: 'none', fontWeight: 600,
            display: 'inline-flex', alignItems: 'center', gap: 3,
          }}
        >
          Sälj din båt eller hitta din nästa
          <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Stäng meddelande"
        style={{
          width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
          background: 'rgba(255,255,255,0.6)',
          border: 'none', color: 'var(--txt2)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: 0,
        }}
      >
        <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
      <style>{`
        @keyframes svalla-loppis-fadein {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  )
}

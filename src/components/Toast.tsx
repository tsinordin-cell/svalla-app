'use client'
import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'
type ToastItem = { id: number; message: string; type: ToastType }

// SVG-ikoner per typ — tidigare strängvärden ('check','x','info') renderades
// som text vilket bröt premium-känslan. Nu konsistent med Icon-systemet.
const ICON_PATHS: Record<ToastType, React.ReactNode> = {
  success: <polyline points="20 6 9 17 4 12" />,
  error:   <><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></>,
  info:    <><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></>,
}

const BG: Record<ToastType, string> = {
  success: 'linear-gradient(135deg,#1a5c3a,#2a8a58)',
  error:   'linear-gradient(135deg,#8b1a1a,#c03030)',
  info:    'var(--grad-sea)',
}

/** Trigger a toast from any client component */
export function toast(message: string, type: ToastType = 'success') {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('svalla-toast', { detail: { message, type } }))
}

/** Mount once in layout.tsx */
export default function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  useEffect(() => {
    function handler(e: Event) {
      const { message, type } = (e as CustomEvent<{ message: string; type: ToastType }>).detail
      const id = Date.now() + Math.random()
      setToasts(prev => [...prev, { id, message, type }])
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3200)
    }
    window.addEventListener('svalla-toast', handler)
    return () => window.removeEventListener('svalla-toast', handler)
  }, [])

  if (toasts.length === 0) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(var(--nav-h, 68px) + env(safe-area-inset-bottom, 0px) + 14px)',
      left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column-reverse', gap: 8,
      zIndex: 9999, pointerEvents: 'none',
      width: 'min(88vw, 340px)',
    }}>
      {toasts.map(t => (
        <button
          key={t.id}
          type="button"
          aria-label={`Stäng meddelande: ${t.message}`}
          onClick={() => setToasts(prev => prev.filter(x => x.id !== t.id))}
          style={{
            background: BG[t.type], color: '#fff',
            padding: '12px 16px', borderRadius: 14,
            display: 'flex', alignItems: 'center', gap: 10,
            fontSize: 13, fontWeight: 600,
            boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
            animation: 'svalla-toast-in 0.22s ease',
            pointerEvents: 'auto',
            lineHeight: 1.3,
            border: 'none', cursor: 'pointer', textAlign: 'left',
            fontFamily: 'inherit',
            transition: 'transform 100ms ease',
            WebkitTapHighlightColor: 'transparent',
          }}
          onMouseDown={(e) => { e.currentTarget.style.transform = 'scale(0.98)' }}
          onMouseUp={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
          onTouchStart={(e) => { e.currentTarget.style.transform = 'scale(0.98)' }}
          onTouchEnd={(e) => { e.currentTarget.style.transform = 'scale(1)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17, flexShrink: 0 }}>
            {ICON_PATHS[t.type]}
          </svg>
          <span style={{ flex: 1, minWidth: 0 }}>{t.message}</span>
        </button>
      ))}
      <style>{`
        @keyframes svalla-toast-in {
          from { opacity: 0; transform: translateY(10px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  )
}

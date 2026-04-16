'use client'
import { useState, useEffect } from 'react'

export type ToastType = 'success' | 'error' | 'info'
type ToastItem = { id: number; message: string; type: ToastType }

const ICONS: Record<ToastType, string> = { success: '✓', error: '✕', info: 'ℹ' }
const BG: Record<ToastType, string> = {
  success: 'linear-gradient(135deg,#1a5c3a,#2a8a58)',
  error:   'linear-gradient(135deg,#8b1a1a,#c03030)',
  info:    'linear-gradient(135deg,#1e5c82,#2d7d8a)',
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
        <div key={t.id} style={{
          background: BG[t.type], color: '#fff',
          padding: '12px 16px', borderRadius: 14,
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13, fontWeight: 600,
          boxShadow: '0 4px 24px rgba(0,0,0,0.22)',
          animation: 'svalla-toast-in 0.22s ease',
          pointerEvents: 'auto',
          lineHeight: 1.3,
        }}>
          <span style={{ fontSize: 15, fontWeight: 900, flexShrink: 0 }}>{ICONS[t.type]}</span>
          {t.message}
        </div>
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

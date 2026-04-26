'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const APP_PATHS = ['/platser', '/rutter', '/logga', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/o/']

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)))
}

export default function PushPrompt() {
  const [show, setShow] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
    if (Notification.permission !== 'default') return
    if (sessionStorage.getItem('svalla-push-dismissed')) return
    if (!VAPID_PUBLIC) return

    // Visa prompten med lite delay
    const t = setTimeout(() => setShow(true), 15000)
    return () => clearTimeout(t)
  }, [])

  function dismiss() {
    sessionStorage.setItem('svalla-push-dismissed', '1')
    setShow(false)
  }

  async function enable() {
    if (!VAPID_PUBLIC || loading) return
    setLoading(true)
    try {
      const perm = await Notification.requestPermission()
      if (perm !== 'granted') { dismiss(); return }

      const reg = await navigator.serviceWorker.ready
      const sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC),
      })

      await fetch('/api/push/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sub),
      })

      setDone(true)
      setTimeout(dismiss, 2000)
    } catch (err) {
      console.error('Push subscribe error:', err)
      dismiss()
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null
  if (!APP_PATHS.some(p => pathname?.startsWith(p))) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 12px)',
      left: 12, right: 12, zIndex: 9998,
      background: 'rgba(26,58,94,0.97)', backdropFilter: 'blur(16px)',
      borderRadius: 20, padding: '16px 18px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.3)',
      display: 'flex', gap: 14, alignItems: 'flex-start',
      animation: 'slideUp 0.35s ease',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 12, flexShrink: 0,
        background: 'var(--grad-sea)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 22, border: '1.5px solid rgba(255,255,255,0.15)',
      }}>🔔</div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
          {done ? '✓ Notiser aktiverade!' : 'Missa inga turer i närheten'}
        </p>
        {!done && (
          <>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: '0 0 10px', lineHeight: 1.4 }}>
              Få en notis när dina följare loggar nya turer.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={enable} disabled={loading} style={{
                padding: '7px 16px', borderRadius: 20, border: 'none', cursor: 'pointer',
                background: 'var(--grad-acc)',
                color: '#fff', fontSize: 12, fontWeight: 600,
                opacity: loading ? 0.7 : 1,
              }}>
                {loading ? '…' : 'Aktivera'}
              </button>
              <button onClick={dismiss} style={{
                padding: '7px 12px', borderRadius: 20,
                border: '1px solid rgba(255,255,255,0.2)', cursor: 'pointer',
                background: 'transparent', color: 'rgba(255,255,255,0.6)', fontSize: 12,
              }}>
                Inte nu
              </button>
            </div>
          </>
        )}
      </div>

      <button onClick={dismiss} style={{
        background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%',
        width: 28, height: 28, cursor: 'pointer', color: 'rgba(255,255,255,0.7)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, flexShrink: 0,
      }}>×</button>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

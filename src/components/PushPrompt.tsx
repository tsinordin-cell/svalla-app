'use client'
import Icon from '@/components/Icon'
import { useState, useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { efterCookievalOchTid } from '@/lib/forstaRutor'
import { useForstaRuta } from '@/lib/useForstaRuta'
import { createClient } from '@/lib/supabase'

const APP_PATHS = ['/platser', '/rutter', '/logga', '/feed', '/profil', '/spara', '/sok', '/tur/', '/u/', '/topplista', '/o/']

const VAPID_PUBLIC = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY ?? ''

function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)))
}

export default function PushPrompt() {
  // `redo` = villkoren uppfyllda. Om rutan faktiskt syns avgör turordningen
  // (forstaRutor.ts): efter cookievalet och aldrig samtidigt som installrutan.
  const [redo, setRedo] = useState(false)
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const pathname = usePathname()
  const dismissTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return
    if (Notification.permission !== 'default') return
    if (sessionStorage.getItem('svalla-push-dismissed')) return
    if (!VAPID_PUBLIC) return

    // Bara för inloggade: /api/push/subscribe svarar 401 utan konto, så en
    // utloggad som tryckte "Aktivera" fick webbläsarens fråga och sedan ingen
    // notis alls. Granskningen 2026-11-22.
    let avbruten = false
    let sluta: (() => void) | null = null
    createClient().auth.getSession().then(({ data }) => {
      if (avbruten || !data.session) return
      // 15 sekunder efter cookievalet, inte efter sidladdningen.
      sluta = efterCookievalOchTid(15000, () => setRedo(true))
    }).catch(() => { /* okänt läge: visa inte rutan */ })
    return () => {
      avbruten = true
      sluta?.()
      if (dismissTimerRef.current) clearTimeout(dismissTimerRef.current)
    }
  }, [])

  const [show, lamnaPlatsen] = useForstaRuta('notiser', redo, APP_PATHS.some(p => pathname?.startsWith(p)))

  function dismiss() {
    try { sessionStorage.setItem('svalla-push-dismissed', '1') } catch { /* privat läge */ }
    setRedo(false)
    lamnaPlatsen()
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
      dismissTimerRef.current = setTimeout(dismiss, 2000)
    } catch (err) {
      console.error('Push subscribe error:', err)
      dismiss()
    } finally {
      setLoading(false)
    }
  }

  if (!show) return null

  return (
    // .push-prompt: på dator (>=1024px) flyttas rutan till nedre högra hörnet
    // i globals.css. Med left: 12 låg den under sidomenyn (220px), som
    // täckte ikonen och knappen "Inte nu". Granskningen 2026-11-22.
    <div className="push-prompt" style={{
      position: 'fixed',
      bottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 12px)',
      // 2026-10-26: under modaler (delningsrutan 1200, kommentarer 1400) och navet (900).
      // Med 9998 la sig bannern ovanpå delningsrutans knappar.
      left: 12, right: 12, zIndex: 850,
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
      }}>
        <Icon name="bell" style={{ width: 20, height: 20, color: '#fff' }} />
      </div>


      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 14, fontWeight: 600, color: '#fff', margin: '0 0 4px' }}>
          {done ? 'Notiser aktiverade' : 'Slå på notiser'}
        </p>
        {!done && (
          <>
            <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', margin: '0 0 10px', lineHeight: 1.4 }}>
              {/* Tidigare: "när dina följare loggar nya turer" och "turer i närheten".
                  Ingen sådan notis skickas. Det som skickas (notisRegler.ts,
                  forum, besök): gillningar, kommentarer, omnämnanden, taggningar,
                  meddelanden, nya följare och forumsvar. Granskningen 2026-11-22. */}
              Få en notis när någon gillar eller kommenterar din tur, skriver till dig eller börjar följa dig.
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

      <button onClick={dismiss} aria-label="Stäng" style={{
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

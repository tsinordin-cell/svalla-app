'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'
import Icon from '@/components/Icon'

type Props = {
  routeId: string
  /** True om rutten redan har en ägare */
  hasOwner: boolean
  /** True om aktuell användare är inloggad */
  isLoggedIn: boolean
  /** True om aktuell användare ÄGER rutten */
  ownsRoute: boolean
}

/**
 * SaveRouteCTA — handterar tre fall:
 *
 * 1. Inloggad + äger rutten → visar "Sparad i dina rutter" (passivt)
 * 2. Inloggad + rutten är anonym (user_id = null) → claim-knapp
 * 3. Utloggad + rutten är anonym → "Skapa konto för att spara"
 * 4. Inloggad + rutten har annan ägare → visa inget (ej deras rutt)
 *
 * Plus: läser ?claim=1 från URL — om query-paramet finns OCH user är
 * inloggad → POST automatic claim (efter login-redirect).
 */
export default function SaveRouteCTA({ routeId, hasOwner, isLoggedIn, ownsRoute }: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [showToast, setShowToast] = useState(false)

  // Auto-claim om ?claim=1 + inloggad + rutten saknar ägare
  useEffect(() => {
    if (searchParams.get('claim') !== '1') return
    if (!isLoggedIn || hasOwner) return
    if (status !== 'idle') return

    setStatus('saving')
    fetch('/api/planera/claim', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ routeId }),
    })
      .then(r => r.json())
      .then(data => {
        if (data.ok) {
          setStatus('saved')
          setShowToast(true)
          // Rensa query och refresha så Mina rutter inkluderar den
          setTimeout(() => {
            router.replace(`/planera/${routeId}`)
            router.refresh()
          }, 1800)
        } else {
          setStatus('error')
        }
      })
      .catch(() => setStatus('error'))
  }, [searchParams, isLoggedIn, hasOwner, routeId, router, status])

  async function handleClaim() {
    if (status === 'saving' || status === 'saved') return
    setStatus('saving')
    try {
      const res = await fetch('/api/planera/claim', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ routeId }),
      })
      const data = await res.json()
      if (data.ok) {
        setStatus('saved')
        setShowToast(true)
        setTimeout(() => router.refresh(), 1800)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  // Fall 4: rutten ägs av någon annan
  if (hasOwner && !ownsRoute) return null

  // Toast — visas både för auto-claim och manuell
  const toast = showToast ? (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: 'fixed', bottom: 'calc(var(--nav-h, 64px) + 16px)',
        left: '50%', transform: 'translateX(-50%)',
        background: '#15803d', color: '#fff',
        padding: '12px 20px', borderRadius: 24,
        fontSize: 14, fontWeight: 700,
        boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
        display: 'flex', alignItems: 'center', gap: 8,
        zIndex: 999,
      }}
    >
      <Icon name="check" size={16} stroke={2.5} />
      Rutten sparad i dina rutter
    </div>
  ) : null

  // Fall 1: inloggad + äger rutten
  if (ownsRoute) {
    return (
      <>
        <div style={{
          marginTop: 16, padding: '10px 14px',
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.25)',
          borderRadius: 12,
          display: 'flex', alignItems: 'center', gap: 10,
          fontSize: 13, color: '#15803d',
        }}>
          <Icon name="check" size={16} stroke={2.5} />
          <span style={{ fontWeight: 600 }}>Sparad i dina rutter</span>
        </div>
        {toast}
      </>
    )
  }

  // Fall 2: inloggad + rutten är anonym → claim-knapp
  if (isLoggedIn && !hasOwner) {
    return (
      <>
        <button
          type="button"
          onClick={handleClaim}
          disabled={status === 'saving'}
          style={{
            marginTop: 16, width: '100%',
            padding: '14px', borderRadius: 12,
            border: 'none', background: 'var(--sea)',
            color: '#fff', fontSize: 14, fontWeight: 700,
            cursor: status === 'saving' ? 'default' : 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            opacity: status === 'saving' ? 0.7 : 1,
          }}
        >
          <Icon name="bookmark" size={16} stroke={2} />
          {status === 'saving' ? 'Sparar…' : status === 'error' ? 'Försök igen' : 'Spara i mina rutter'}
        </button>
        {toast}
      </>
    )
  }

  // Fall 3: utloggad → "Skapa konto"-CTA
  return (
    <>
      <div style={{
        marginTop: 16,
        background: 'var(--white)',
        borderRadius: 14,
        padding: '16px',
        border: '1.5px solid rgba(10,123,140,0.15)',
        boxShadow: '0 2px 8px rgba(10,20,35,0.04)',
      }}>
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: 12,
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 38, height: 38, borderRadius: 10,
            background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
            flexShrink: 0,
          }}>
            <Icon name="bookmark" size={18} stroke={2} />
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 3px' }}>
              Spara den här rutten
            </p>
            <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 12px', lineHeight: 1.5 }}>
              Skapa ett konto för att hitta tillbaka till rutten, dela den med vänner, eller logga turen när du gjort den.
            </p>
            <div style={{ display: 'flex', gap: 8 }}>
              <Link
                href={`/logga-in?returnTo=${encodeURIComponent(`/planera/${routeId}?claim=1`)}`}
                style={{
                  flex: 1.4, padding: '10px 14px', borderRadius: 10,
                  background: 'var(--sea)', color: '#fff',
                  fontSize: 13, fontWeight: 700, textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Skapa konto + spara
              </Link>
              <Link
                href={`/logga-in?returnTo=${encodeURIComponent(`/planera/${routeId}?claim=1`)}&existing=1`}
                style={{
                  flex: 1, padding: '10px 14px', borderRadius: 10,
                  background: 'transparent',
                  border: '1px solid rgba(10,123,140,0.2)',
                  color: 'var(--sea)',
                  fontSize: 13, fontWeight: 700, textDecoration: 'none',
                  textAlign: 'center',
                }}
              >
                Logga in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

'use client'
/**
 * LoppisSaveButton — hjärt-knapp som sparar/ångrar annonsen i wishlisten.
 * Visas på annons-sidan för inloggade besökare som inte är ägare. Utloggade
 * får en "Logga in"-version som leder dem till login-flödet.
 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Props {
  threadId: string
  initialSaved: boolean
  isLoggedIn: boolean
}

export default function LoppisSaveButton({ threadId, initialSaved, isLoggedIn }: Props) {
  const router = useRouter()
  const [saved, setSaved] = useState(initialSaved)
  const [busy, setBusy] = useState(false)

  if (!isLoggedIn) {
    return (
      <Link
        href={`/logga-in?returnTo=${encodeURIComponent(`/forum/loppis/${threadId}`)}`}
        aria-label="Logga in för att spara"
        title="Logga in för att spara"
        style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(10,123,140,0.10)',
          color: 'var(--sea)',
          border: '1px solid rgba(10,123,140,0.18)',
          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          textDecoration: 'none',
          flexShrink: 0,
        }}
      >
        <svg width={17} height={17} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      </Link>
    )
  }

  async function toggle() {
    if (busy) return
    const next = !saved
    setSaved(next)
    setBusy(true)
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/save`, {
        method: next ? 'POST' : 'DELETE',
      })
      if (!res.ok) {
        setSaved(!next) // rollback
      } else {
        router.refresh()
      }
    } catch {
      setSaved(!next)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={saved}
      aria-label={saved ? 'Ta bort från sparat' : 'Spara annons'}
      title={saved ? 'Sparad — tryck för att ta bort' : 'Spara annons'}
      style={{
        width: 38, height: 38, borderRadius: '50%',
        background: saved ? 'rgba(220,38,38,0.12)' : 'rgba(10,123,140,0.10)',
        color: saved ? '#dc2626' : 'var(--sea)',
        border: saved ? '1px solid rgba(220,38,38,0.30)' : '1px solid rgba(10,123,140,0.18)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        cursor: busy ? 'wait' : 'pointer',
        transition: 'background 0.15s, color 0.15s, border-color 0.15s, transform 0.08s',
        transform: saved ? 'scale(1.04)' : 'scale(1)',
        flexShrink: 0,
      }}
    >
      <svg width={17} height={17} viewBox="0 0 24 24" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    </button>
  )
}

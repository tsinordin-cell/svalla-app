'use client'
/**
 * ShareButton — flytande dela-knapp för plats-sidor.
 *
 * Mobile (Web Share API stöds):
 *   → öppnar systemets dela-dialog (iMessage/WhatsApp/Twitter/Mail osv).
 *
 * Desktop (ingen Web Share):
 *   → kopierar URL till clipboard + visar diskret toast "Länk kopierad".
 *
 * Designad att paras med BookmarkButton i en horisontell rad — samma
 * cirkel-form, samma mått (44×44), liknande visuella vikt.
 */
import { useState } from 'react'
import { track } from '@/lib/analytics-events'

interface Props {
  /** Plats-namn — används som titel i Web Share dialog. */
  title: string
  /** Kort beskrivning — visas under titeln i delningar (om mottagar-app stödjer). */
  description?: string
  /** Absolut URL att dela. Om undefined används window.location.href. */
  url?: string
  /** Vilken yta delningen sker från (för analytics). */
  surface?: string
  /** Entity-id för platsen/turen som delas (för analytics). */
  entityId?: string
}

export default function ShareButton({ title, description, url, surface = 'place', entityId }: Props) {
  const [toast, setToast] = useState<string | null>(null)
  const [pressed, setPressed] = useState(false)

  async function handleShare() {
    setPressed(true)
    setTimeout(() => setPressed(false), 200)

    // Analytics — fire-and-forget. Skickas innan eventuell dialog/clipboard
    // för att vi ska veta att intentet fanns även om användaren avbryter.
    track('share_clicked', { surface, entity_id: entityId })

    const shareUrl = url ?? (typeof window !== 'undefined' ? window.location.href : '')
    if (!shareUrl) return

    // Försök med Web Share API först (mobile + Safari macOS Sequoia+)
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({
          title,
          text: description,
          url: shareUrl,
        })
        return
      } catch (err) {
        // AbortError = användaren stängde dialogen, inte ett fel
        if ((err as Error)?.name === 'AbortError') return
        // Annars fall tillbaka till clipboard
      }
    }

    // Fallback: kopiera till clipboard
    try {
      await navigator.clipboard.writeText(shareUrl)
      setToast('Länk kopierad')
      setTimeout(() => setToast(null), 2400)
    } catch {
      setToast('Kunde inte kopiera')
      setTimeout(() => setToast(null), 2400)
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleShare}
        aria-label={`Dela ${title}`}
        title="Dela"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '9px 16px',
          background: 'rgba(255,255,255,0.15)',
          color: '#fff',
          borderRadius: 50,
          border: '1px solid rgba(255,255,255,0.25)',
          backdropFilter: 'blur(4px)',
          fontSize: 13,
          fontWeight: 600,
          cursor: 'pointer',
          whiteSpace: 'nowrap',
          transition: 'opacity 120ms ease',
          opacity: pressed ? 0.75 : 1,
        }}
      >
        <svg viewBox="0 0 24 24" width="14" height="14" fill="none"
          stroke="currentColor" strokeWidth={2.2}
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
        Dela
      </button>

      {/* Toast — fixed bottom center, fade in/out */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          style={{
            position: 'fixed',
            bottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 16px)',
            left: '50%',
            transform: 'translateX(-50%)',
            background: 'rgba(0, 30, 45, 0.92)',
            backdropFilter: 'blur(10px)',
            color: '#fff',
            fontSize: 14,
            fontWeight: 600,
            padding: '12px 20px',
            borderRadius: 999,
            boxShadow: '0 8px 24px rgba(0, 30, 45, 0.32)',
            zIndex: 9999,
            animation: 'shareToastIn 200ms ease-out',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none"
            stroke="#9be59c" strokeWidth={3}
            strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          {toast}
        </div>
      )}

      <style>{`
        @keyframes shareToastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(8px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}

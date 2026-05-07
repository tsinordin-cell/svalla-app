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

interface Props {
  /** Plats-namn — används som titel i Web Share dialog. */
  title: string
  /** Kort beskrivning — visas under titeln i delningar (om mottagar-app stödjer). */
  description?: string
  /** Absolut URL att dela. Om undefined används window.location.href. */
  url?: string
}

export default function ShareButton({ title, description, url }: Props) {
  const [toast, setToast] = useState<string | null>(null)
  const [pressed, setPressed] = useState(false)

  async function handleShare() {
    setPressed(true)
    setTimeout(() => setPressed(false), 200)

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
          width: 44, height: 44,
          borderRadius: '50%',
          border: 'none',
          background: 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          padding: 0,
          transition: 'transform 120ms ease',
          transform: pressed ? 'scale(0.92)' : 'scale(1)',
        }}
      >
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none"
          stroke="var(--sea, #1e5c82)" strokeWidth={2.2}
          strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/>
          <polyline points="16 6 12 2 8 6"/>
          <line x1="12" y1="2" x2="12" y2="15"/>
        </svg>
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

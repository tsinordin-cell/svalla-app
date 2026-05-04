'use client'
/**
 * ForumShareButton — knapp i thread-headern som triggar native Web Share
 * (på iOS/Android) eller faller tillbaka till copy-to-clipboard.
 *
 * Designad att se ut likt ForumSubscribeButton så raden i headern är konsekvent.
 */
import { useState } from 'react'

interface Props {
  url: string
  title: string
  /** Kort beskrivning för share-text (t.ex. "Säljes: Comfort 32 — 150 000 kr") */
  text?: string
}

export default function ForumShareButton({ url, title, text }: Props) {
  const [copied, setCopied] = useState(false)
  const [busy, setBusy] = useState(false)

  async function handleShare() {
    if (busy) return
    setBusy(true)
    try {
      // Native share först (mobil + macOS Safari + nyare Chrome)
      if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
        try {
          await navigator.share({ title, text, url })
          return
        } catch (err) {
          // User cancelled — gör inget
          if ((err as Error)?.name === 'AbortError') return
          // Annars fall through till clipboard
        }
      }
      // Fallback: kopiera till clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch {
        // Sista fallback: visa promp
        window.prompt('Kopiera länken:', url)
      }
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleShare}
      disabled={busy}
      aria-label="Dela"
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 12px',
        borderRadius: 999,
        background: copied ? 'rgba(34,197,94,0.22)' : 'rgba(255,255,255,0.12)',
        border: copied ? '1px solid rgba(187,247,208,0.4)' : '1px solid rgba(255,255,255,0.22)',
        color: '#fff',
        fontSize: 13, fontWeight: 600,
        cursor: busy ? 'wait' : 'pointer',
        transition: 'background 0.15s, border-color 0.15s',
        whiteSpace: 'nowrap',
      }}
    >
      {copied ? (
        <>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
          Kopierat
        </>
      ) : (
        <>
          <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
            <circle cx="18" cy="5" r="3" />
            <circle cx="6" cy="12" r="3" />
            <circle cx="18" cy="19" r="3" />
            <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
            <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
          </svg>
          Dela
        </>
      )}
    </button>
  )
}

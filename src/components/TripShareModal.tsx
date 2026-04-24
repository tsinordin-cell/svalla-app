'use client'
import { useState } from 'react'
import { toast } from '@/components/Toast'

interface Props {
  tripId: string
  title: string
  url: string
  variant?: 'icon' | 'pill'
}

export default function TripShareModal({ tripId, title, url, variant = 'icon' }: Props) {
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)

  const cardSrc = `/api/og/share/tur/${tripId}`

  async function shareCard() {
    setLoading(true)
    try {
      const res  = await fetch(cardSrc)
      const blob = await res.blob()
      const file = new File([blob], 'svalla-tur.png', { type: 'image/png' })

      if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `${title} – Svalla`, url })
      } else if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: `${title} – Svalla`, url, text: 'Kolla min tur på Svalla! ⛵' })
      } else {
        // Desktop fallback: download
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
        a.download = 'svalla-tur.png'
        a.click()
        URL.revokeObjectURL(a.href)
        toast('Story-bild sparad! 🖼️')
      }
    } catch {
      // User cancelled share — no-op
    } finally {
      setLoading(false)
    }
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      toast('Länk kopierad! 📋')
      setOpen(false)
    } catch {
      toast('Kunde inte kopiera länken.', 'error')
    }
  }

  return (
    <>
      {/* Trigger */}
      {variant === 'pill' ? (
        <button
          onClick={() => setOpen(true)}
          className="press-feedback"
          aria-label="Dela tur"
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
            background: 'var(--grad-sea)',
            color: '#fff', fontSize: 12, fontWeight: 700,
            WebkitTapHighlightColor: 'transparent',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={2} style={{ width: 15, height: 15, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Dela
        </button>
      ) : (
        <button
          onClick={() => setOpen(true)}
          className="press-feedback"
          aria-label="Dela tur"
          style={{
            width: 38, height: 38, borderRadius: '50%',
            background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            border: 'none', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} style={{ width: 17, height: 17 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
        </button>
      )}

      {/* Modal */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dela tur"
          style={{
            position: 'fixed', inset: 0, zIndex: 1200,
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
          }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(4px)',
              WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Sheet */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'var(--bg)',
            borderRadius: '20px 20px 0 0',
            padding: '20px 20px calc(env(safe-area-inset-bottom, 0px) + 24px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20,
          }}>
            {/* Drag handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(10,123,140,0.2)', marginBottom: 4 }} />

            {/* Card preview */}
            <div style={{
              width: '100%', maxWidth: 200,
              aspectRatio: '9/16',
              borderRadius: 16,
              overflow: 'hidden',
              boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={cardSrc}
                alt="Story-kort"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
            </div>

            <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center', margin: 0, lineHeight: 1.5 }}>
              Dela din tur som Instagram Story, WhatsApp eller ladda ner bilden.
            </p>

            {/* Primary: share with image */}
            <button
              onClick={shareCard}
              disabled={loading}
              className="press-feedback"
              style={{
                width: '100%', padding: '15px 0', borderRadius: 14, border: 'none',
                background: 'var(--grad-sea)', color: '#fff',
                fontSize: 15, fontWeight: 700, cursor: 'pointer',
                opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                boxShadow: '0 4px 18px rgba(30,92,130,0.35)',
              }}
            >
              {loading ? (
                <>
                  <span style={{ fontSize: 16 }}>⏳</span>
                  Förbereder bild…
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Dela Story-bild
                </>
              )}
            </button>

            {/* Secondary: copy link */}
            <button
              onClick={copyLink}
              className="press-feedback"
              style={{
                width: '100%', padding: '14px 0', borderRadius: 14,
                background: 'rgba(10,123,140,0.07)',
                border: '1.5px solid rgba(10,123,140,0.15)',
                color: 'var(--sea)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              Kopiera länk
            </button>

            {/* Close */}
            <button
              onClick={() => setOpen(false)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 14, color: 'var(--txt3)', fontWeight: 500, padding: '4px 0',
              }}
            >
              Stäng
            </button>
          </div>
        </div>
      )}
    </>
  )
}

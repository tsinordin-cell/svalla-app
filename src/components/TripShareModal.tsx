'use client'
import { useState } from 'react'
import { toast } from '@/components/Toast'

interface Props {
  tripId: string
  title: string
  url: string
  variant?: 'icon' | 'pill'
}

// Detect iOS — Instagram Stories requires save-to-photos flow on iOS
function isIOS() {
  if (typeof navigator === 'undefined') return false
  return /iPad|iPhone|iPod/.test(navigator.userAgent)
}

// Detect Android
function isAndroid() {
  if (typeof navigator === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

export default function TripShareModal({ tripId, title, url, variant = 'icon' }: Props) {
  const [open, setOpen]         = useState(false)
  const [loading, setLoading]   = useState(false)
  const [step, setStep]         = useState<'main' | 'instagram-saved'>('main')

  const cardSrc = `/api/og/share/tur/${tripId}`

  function handleOpen() {
    setStep('main')
    setOpen(true)
  }

  // ── Spara bild till enheten ──────────────────────────────────────
  async function saveImage(): Promise<Blob | null> {
    try {
      const res = await fetch(cardSrc)
      if (!res.ok) throw new Error('fetch failed')
      return await res.blob()
    } catch {
      toast('Kunde inte hämta bilden. Försök igen.', 'error')
      return null
    }
  }

  // ── Instagram Stories ────────────────────────────────────────────
  // On Android: Web Share API with file opens share sheet → user picks Instagram
  // On iOS: Web Share API with file may open share sheet but Instagram Stories
  //         can't receive files from browser — must save to Photos first, then
  //         open Instagram manually.
  async function shareInstagram() {
    setLoading(true)
    const blob = await saveImage()
    if (!blob) { setLoading(false); return }

    const file = new File([blob], 'svalla-tur.png', { type: 'image/png' })

    if (isAndroid() && typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
      // Android: share sheet — user picks Instagram from the list
      try {
        await navigator.share({ files: [file], title: `${title} – Svalla` })
      } catch (e: unknown) {
        // User cancelled — not an error
        if (e instanceof Error && e.name !== 'AbortError') {
          toast('Delning misslyckades. Försök igen.', 'error')
        }
      }
      setLoading(false)
      return
    }

    // iOS (or any device where file share isn't supported):
    // Save image to device, then show step-by-step guide
    const a = document.createElement('a')
    a.href  = URL.createObjectURL(blob)
    a.download = 'svalla-tur.png'
    a.click()
    URL.revokeObjectURL(a.href)
    setLoading(false)
    setStep('instagram-saved')
  }

  // ── Dela via systemdialog (WhatsApp, iMessage, etc.) ────────────
  async function shareGeneral() {
    setLoading(true)
    const blob = await saveImage()
    if (!blob) { setLoading(false); return }

    const file = new File([blob], 'svalla-tur.png', { type: 'image/png' })

    try {
      if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: `${title} – Svalla`, url })
      } else if (typeof navigator !== 'undefined' && navigator.share) {
        await navigator.share({ title: `${title} – Svalla`, url, text: 'Kolla min tur på Svalla! ⛵' })
      } else {
        // Desktop: download
        const a = document.createElement('a')
        a.href  = URL.createObjectURL(blob)
        a.download = 'svalla-tur.png'
        a.click()
        URL.revokeObjectURL(a.href)
        toast('Story-bild sparad! 🖼️')
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name !== 'AbortError') {
        toast('Delning misslyckades. Försök igen.', 'error')
      }
    } finally {
      setLoading(false)
    }
  }

  // ── Kopiera länk ─────────────────────────────────────────────────
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      toast('Länk kopierad! 📋')
      setOpen(false)
    } catch {
      toast('Kunde inte kopiera länken.', 'error')
    }
  }

  // ── Trigger button ────────────────────────────────────────────────
  const triggerBtn = variant === 'pill' ? (
    <button
      onClick={handleOpen}
      className="press-feedback"
      aria-label="Dela tur"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
        background: 'var(--grad-sea)',
        color: '#fff', fontSize: 12, fontWeight: 700,
        WebkitTapHighlightColor: 'transparent', flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={2} style={{ width: 15, height: 15, flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Dela
    </button>
  ) : (
    <button
      onClick={handleOpen}
      className="press-feedback"
      aria-label="Dela tur"
      style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} style={{ width: 17, height: 17 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
  )

  return (
    <>
      {triggerBtn}

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Dela tur"
          style={{ position: 'fixed', inset: 0, zIndex: 1200, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}
        >
          {/* Backdrop */}
          <div
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.72)',
              backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)',
            }}
          />

          {/* Sheet */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'var(--bg)',
            borderRadius: '20px 20px 0 0',
            padding: '20px 20px calc(env(safe-area-inset-bottom, 0px) + 28px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16,
          }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(10,123,140,0.2)', marginBottom: 4 }} />

            {step === 'main' && (
              <>
                {/* Card preview */}
                <div style={{
                  width: '100%', maxWidth: 160,
                  aspectRatio: '9/16',
                  borderRadius: 14,
                  overflow: 'hidden',
                  boxShadow: '0 12px 40px rgba(0,0,0,0.35)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={cardSrc} alt="Story-kort" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>

                {/* Instagram Story button */}
                <button
                  onClick={shareInstagram}
                  disabled={loading}
                  className="press-feedback"
                  style={{
                    width: '100%', padding: '15px 0', borderRadius: 14, border: 'none',
                    background: 'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                    color: '#fff', fontSize: 15, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                    boxShadow: '0 4px 18px rgba(220,39,67,0.35)',
                  }}
                >
                  {loading ? (
                    <>
                      <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', animation: 'spin .7s linear infinite', display: 'inline-block', flexShrink: 0 }} />
                      Förbereder…
                    </>
                  ) : (
                    <>
                      {/* Instagram icon */}
                      <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 19, height: 19, flexShrink: 0 }}>
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Dela som Instagram Story
                    </>
                  )}
                </button>

                {/* General share */}
                <button
                  onClick={shareGeneral}
                  disabled={loading}
                  className="press-feedback"
                  style={{
                    width: '100%', padding: '14px 0', borderRadius: 14, border: 'none',
                    background: 'var(--grad-sea)', color: '#fff',
                    fontSize: 14, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
                    opacity: loading ? 0.7 : 1,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                    boxShadow: '0 4px 14px rgba(30,92,130,0.25)',
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                  </svg>
                  Dela på annat sätt
                </button>

                {/* Copy link */}
                <button
                  onClick={copyLink}
                  className="press-feedback"
                  style={{
                    width: '100%', padding: '13px 0', borderRadius: 14,
                    background: 'rgba(10,123,140,0.07)',
                    border: '1.5px solid rgba(10,123,140,0.15)',
                    color: 'var(--sea)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                  Kopiera länk
                </button>

                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--txt3)', fontWeight: 500, padding: '4px 0' }}>
                  Stäng
                </button>
              </>
            )}

            {/* ── Step: bild sparad, guide för Instagram ── */}
            {step === 'instagram-saved' && (
              <>
                <div style={{ fontSize: 44, lineHeight: 1 }}>✅</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', textAlign: 'center' }}>
                  Bilden är sparad!
                </div>

                <div style={{ width: '100%', background: 'rgba(10,123,140,0.06)', borderRadius: 16, padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    { n: '1', text: 'Öppna Instagram' },
                    { n: '2', text: 'Tryck + längst ned och välj Story' },
                    { n: '3', text: 'Svep upp eller tryck på bildikonen nere till vänster' },
                    { n: '4', text: 'Välj "svalla-tur.png" från ditt bildbibliotek' },
                    { n: '5', text: 'Publicera din Story! ⛵' },
                  ].map(({ n, text }) => (
                    <div key={n} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                      <div style={{
                        width: 26, height: 26, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #f09433, #bc1888)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 12, fontWeight: 800, color: '#fff',
                      }}>{n}</div>
                      <div style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.4, paddingTop: 4 }}>{text}</div>
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => setStep('main')}
                  className="press-feedback"
                  style={{
                    width: '100%', padding: '14px 0', borderRadius: 14,
                    background: 'rgba(10,123,140,0.07)',
                    border: '1.5px solid rgba(10,123,140,0.15)',
                    color: 'var(--sea)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  ← Tillbaka
                </button>

                <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: 14, color: 'var(--txt3)', fontWeight: 500, padding: '4px 0' }}>
                  Stäng
                </button>
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </>
  )
}

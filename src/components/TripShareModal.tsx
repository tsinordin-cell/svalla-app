'use client'
import { useState, useEffect } from 'react'
import { toast } from '@/components/Toast'

interface Props {
  tripId: string
  title: string
  url: string
  variant?: 'icon' | 'pill'
}

// Detect Android
function isAndroid() {
  if (typeof navigator === 'undefined') return false
  return /Android/.test(navigator.userAgent)
}

export default function TripShareModal({ tripId, title, url, variant = 'icon' }: Props) {
  const [open, setOpen]       = useState(false)
  const [loading, setLoading] = useState(false)
  const [step, setStep]       = useState<'main' | 'saved'>('main')
  const [imgLoaded, setImgLoaded] = useState(false)
  const [styleMode, setStyleMode] = useState<'photo' | 'map'>('photo')

  const cardSrc = `/api/og/share/tur/${tripId}?style=${styleMode}`

  // Preload image when modal opens or style changes
  useEffect(() => {
    if (open) setImgLoaded(false)
  }, [open, styleMode])

  function handleOpen() {
    setStep('main')
    setOpen(true)
  }

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

  async function shareInstagram() {
    setLoading(true)
    const blob = await saveImage()
    if (!blob) { setLoading(false); return }

    const file = new File([blob], 'svalla-tur.png', { type: 'image/png' })

    // iOS + Android: native share sheet via Web Share API with file
    // iOS 15+: opens share sheet → Instagram → opens Stories directly
    // Android: same — user picks Instagram from sheet
    if (typeof navigator !== 'undefined' && navigator.canShare?.({ files: [file] })) {
      try {
        await navigator.share({ files: [file], title: `${title} – Svalla` })
        setLoading(false)
        return
      } catch (e: unknown) {
        if (e instanceof Error && e.name !== 'AbortError') {
          // Share API failed — fall through to download fallback
        } else {
          // User cancelled — just close
          setLoading(false)
          return
        }
      }
    }

    // Fallback: save to device + show guide (older browsers / desktop)
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = 'svalla-tur.png'
    a.click()
    URL.revokeObjectURL(a.href)
    setLoading(false)
    setStep('saved')
  }

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
        const a = document.createElement('a')
        a.href = URL.createObjectURL(blob)
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

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url)
      toast('Länk kopierad! 📋')
      setOpen(false)
    } catch {
      toast('Kunde inte kopiera länken.', 'error')
    }
  }

  // ── Trigger ──────────────────────────────────────────────────────
  const trigger = variant === 'pill' ? (
    <button onClick={handleOpen} className="press-feedback" aria-label="Dela tur" style={{
      display: 'flex', alignItems: 'center', gap: 6,
      padding: '7px 14px', borderRadius: 20, border: 'none', cursor: 'pointer',
      background: 'var(--grad-sea)', color: '#fff', fontSize: 12, fontWeight: 700,
      WebkitTapHighlightColor: 'transparent', flexShrink: 0,
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth={2} style={{ width: 15, height: 15 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
      Dela
    </button>
  ) : (
    <button onClick={handleOpen} className="press-feedback" aria-label="Dela tur" style={{
      width: 38, height: 38, borderRadius: '50%',
      background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(8px)', WebkitBackdropFilter: 'blur(8px)',
      border: 'none', cursor: 'pointer',
      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
    }}>
      <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2} style={{ width: 17, height: 17 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
      </svg>
    </button>
  )

  return (
    <>
      {trigger}

      {open && (
        <div role="dialog" aria-modal="true" aria-label="Dela tur" style={{
          position: 'fixed', inset: 0, zIndex: 1200,
          display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
        }}>
          {/* Backdrop */}
          <div onClick={() => setOpen(false)} style={{
            position: 'absolute', inset: 0,
            background: 'rgba(0,0,0,0.75)',
            backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)',
          }} />

          {/* Sheet */}
          <div style={{
            position: 'relative', zIndex: 1,
            background: 'var(--bg)',
            borderRadius: '28px 28px 0 0',
            padding: '0 0 calc(env(safe-area-inset-bottom, 0px) + 28px)',
            overflow: 'hidden',
          }}>

            {/* ── MAIN VIEW ── */}
            {step === 'main' && (
              <>
                {/* Hero — dark background, large centered card */}
                <div style={{
                  background: 'linear-gradient(170deg, #0c2030 0%, #071420 100%)',
                  padding: '16px 24px 28px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 16,
                  position: 'relative',
                  overflow: 'hidden',
                }}>
                  {/* Handle */}
                  <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', alignSelf: 'center' }} />

                  {/* Ambient glow */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'radial-gradient(ellipse 70% 60% at 50% 70%, rgba(188,24,136,0.10) 0%, transparent 70%)',
                    pointerEvents: 'none',
                  }} />

                  {/* Style toggle */}
                  <div style={{
                    display: 'flex', borderRadius: 20, overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.12)',
                    background: 'rgba(0,0,0,0.30)', position: 'relative', zIndex: 1,
                  }}>
                    {(['photo', 'map'] as const).map(mode => (
                      <button
                        key={mode}
                        onClick={() => setStyleMode(mode)}
                        style={{
                          padding: '8px 22px', border: 'none', cursor: 'pointer',
                          fontSize: 13, fontWeight: 700, letterSpacing: '0.2px',
                          background: styleMode === mode ? 'rgba(255,255,255,0.18)' : 'transparent',
                          color: styleMode === mode ? '#fff' : 'rgba(255,255,255,0.45)',
                          transition: 'background 0.15s, color 0.15s',
                          borderRadius: 20,
                        }}
                      >
                        {mode === 'photo' ? '📸 Foto' : '🗺️ Karta'}
                      </button>
                    ))}
                  </div>

                  {/* Large card preview */}
                  <div style={{ position: 'relative', width: '55%', maxWidth: 200 }}>
                    {/* Skeleton */}
                    {!imgLoaded && (
                      <div style={{
                        width: '100%', aspectRatio: '9/16', borderRadius: 18,
                        background: 'rgba(255,255,255,0.07)',
                        animation: 'pulse 1.5s ease-in-out infinite',
                      }} />
                    )}
                    <div style={{
                      width: '100%',
                      aspectRatio: '9/16',
                      borderRadius: 18,
                      overflow: 'hidden',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.07)',
                      opacity: imgLoaded ? 1 : 0,
                      transition: 'opacity 0.35s ease',
                      display: imgLoaded ? 'block' : 'none',
                    }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={cardSrc}
                        alt="Story-kort"
                        onLoad={() => setImgLoaded(true)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                      />
                    </div>
                  </div>

                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.38)', fontWeight: 500, letterSpacing: '0.2px' }}>
                    Story-bild · 9:16
                  </div>
                </div>

                {/* Action buttons */}
                <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>

                  {/* Instagram — primary */}
                  <button
                    onClick={shareInstagram}
                    disabled={loading}
                    className="press-feedback"
                    style={{
                      width: '100%', padding: '16px 0', borderRadius: 16, border: 'none',
                      background: 'linear-gradient(90deg, #f09433 0%, #e6683c 20%, #dc2743 45%, #cc2366 75%, #bc1888 100%)',
                      color: '#fff', fontSize: 16, fontWeight: 700,
                      cursor: loading ? 'default' : 'pointer',
                      opacity: loading ? 0.75 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                      boxShadow: loading ? 'none' : '0 6px 24px rgba(188,24,136,0.40)',
                      transition: 'opacity 0.15s, box-shadow 0.15s',
                      letterSpacing: '-0.2px',
                    }}
                  >
                    {loading ? (
                      <>
                        <span style={{ width: 18, height: 18, borderRadius: '50%', border: '2.5px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin .7s linear infinite', display: 'inline-block', flexShrink: 0 }} />
                        Förbereder bild…
                      </>
                    ) : (
                      <>
                        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 20, height: 20, flexShrink: 0 }}>
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                        </svg>
                        Dela som Instagram Story
                      </>
                    )}
                  </button>

                  {/* Secondary row: General share + Copy link */}
                  <div style={{ display: 'flex', gap: 10 }}>
                    <button
                      onClick={shareGeneral}
                      disabled={loading}
                      className="press-feedback"
                      style={{
                        flex: 1, padding: '14px 0', borderRadius: 14, border: 'none',
                        background: 'var(--grad-sea)', color: '#fff',
                        fontSize: 13, fontWeight: 700, cursor: loading ? 'default' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                        boxShadow: '0 4px 14px rgba(30,92,130,0.22)',
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 15, height: 15, flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                      </svg>
                      Dela mer
                    </button>

                    <button
                      onClick={copyLink}
                      className="press-feedback"
                      style={{
                        flex: 1, padding: '14px 0', borderRadius: 14,
                        background: 'rgba(10,123,140,0.08)',
                        border: '1.5px solid rgba(10,123,140,0.15)',
                        color: 'var(--sea)', fontSize: 13, fontWeight: 700, cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 15, height: 15 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                      </svg>
                      Kopiera länk
                    </button>
                  </div>

                  <button onClick={() => setOpen(false)} style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    fontSize: 14, color: 'var(--txt3)', fontWeight: 500,
                    padding: '10px 0 0',
                  }}>
                    Stäng
                  </button>
                </div>
              </>
            )}

            {/* ── SAVED VIEW ── */}
            {step === 'saved' && (
              <>
                {/* Success header */}
                <div style={{
                  background: 'linear-gradient(160deg, #0a1e2e 0%, #071420 100%)',
                  padding: '28px 24px 32px',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14,
                }}>
                  <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)' }} />

                  {/* Instagram logo in gradient ring */}
                  <div style={{
                    width: 68, height: 68, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #f09433, #dc2743, #bc1888)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 8px 28px rgba(188,24,136,0.45)',
                  }}>
                    <svg viewBox="0 0 24 24" fill="#fff" style={{ width: 34, height: 34 }}>
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </div>

                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#fff', letterSpacing: '-0.3px' }}>Bild sparad!</div>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>Lägg till den i din Instagram Story</div>
                  </div>
                </div>

                {/* Steps */}
                <div style={{ padding: '20px 20px 0' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
                    {[
                      { icon: '📱', text: 'Öppna Instagram' },
                      { icon: '＋', text: 'Tryck + och välj Story' },
                      { icon: '🖼️', text: 'Välj bilden från ditt bibliotek' },
                      { icon: '⛵', text: 'Publicera!' },
                    ].map(({ icon, text }, i, arr) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, position: 'relative' }}>
                        {/* Vertical connector line */}
                        {i < arr.length - 1 && (
                          <div style={{
                            position: 'absolute', left: 18, top: 42, width: 2, height: 20,
                            background: 'rgba(10,123,140,0.15)',
                          }} />
                        )}
                        <div style={{
                          width: 38, height: 38, borderRadius: '50%', flexShrink: 0,
                          background: 'rgba(10,123,140,0.08)',
                          border: '1.5px solid rgba(10,123,140,0.12)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 17,
                        }}>{icon}</div>
                        <div style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)', padding: '10px 0' }}>{text}</div>
                      </div>
                    ))}
                  </div>

                  <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                    <button
                      onClick={() => setStep('main')}
                      className="press-feedback"
                      style={{
                        flex: 1, padding: '14px 0', borderRadius: 14,
                        background: 'rgba(10,123,140,0.08)',
                        border: '1.5px solid rgba(10,123,140,0.15)',
                        color: 'var(--sea)', fontSize: 14, fontWeight: 600, cursor: 'pointer',
                      }}
                    >
                      ← Tillbaka
                    </button>
                    <button
                      onClick={() => setOpen(false)}
                      className="press-feedback"
                      style={{
                        flex: 1, padding: '14px 0', borderRadius: 14, border: 'none',
                        background: 'var(--grad-sea)', color: '#fff',
                        fontSize: 14, fontWeight: 700, cursor: 'pointer',
                        boxShadow: '0 4px 14px rgba(30,92,130,0.22)',
                      }}
                    >
                      Klar
                    </button>
                  </div>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      <style>{`
        @keyframes spin { to { transform: rotate(360deg) } }
        @keyframes pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 0.7 } }
      `}</style>
    </>
  )
}

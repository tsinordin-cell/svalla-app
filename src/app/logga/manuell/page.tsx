'use client'
export const dynamic = 'force-dynamic'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient, BOAT_TYPES } from '@/lib/supabase'
import TagInput from '@/components/TagInput'
import LocationSearch from '@/components/LocationSearch'

type TaggedUser = { id: string; username: string; avatar: string | null }

// ── Pinnar rating ────────────────────────────────────────────────────────────
const PINNAR = [
  { value: 1, label: 'Okej',    emoji: '⚓' },
  { value: 2, label: 'Bra tur!', emoji: '⚓⚓' },
  { value: 3, label: 'Magisk 🔥', emoji: '⚓⚓⚓' },
]

// ── Komprimera bild i webbläsaren (canvas) innan upload ─────────────────────
async function compressImage(file: File, maxPx = 1920, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      URL.revokeObjectURL(url)
      let { width, height } = img
      if (width > maxPx || height > maxPx) {
        if (width >= height) { height = Math.round(height * maxPx / width); width = maxPx }
        else                 { width = Math.round(width * maxPx / height);  height = maxPx }
      }
      const canvas = document.createElement('canvas')
      canvas.width = width; canvas.height = height
      canvas.getContext('2d')!.drawImage(img, 0, 0, width, height)
      canvas.toBlob(
        (blob) => resolve(blob ? new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }) : file),
        'image/jpeg', quality
      )
    }
    img.onerror = () => resolve(file)
    img.src = url
  })
}

function ManuellForm() {
  const router       = useRouter()
  const searchParams = useSearchParams()
  const [supabase]   = useState(() => createClient())
  const fileRef      = useRef<HTMLInputElement>(null)

  // Pre-fill location from query param (e.g. from "Jag var här" on restaurant page)
  const prefilledPlats = searchParams.get('plats') ?? ''

  const [preview, setPreview]               = useState('')
  const [file, setFile]                     = useState<File | null>(null)
  const [location, setLocation]             = useState(prefilledPlats)
  const [startLocation, setStartLocation]   = useState('')
  const [caption, setCaption]               = useState('')
  const [boatType, setBoatType]             = useState('')
  const [pinnar, setPinnar]                 = useState<number | null>(null)
  const [showMore, setShowMore]             = useState(false)
  const [distance, setDistance]             = useState('')
  const [duration, setDuration]             = useState('')
  const [loading, setLoading]               = useState(false)
  const [err, setErr]                       = useState('')
  const [posted, setPosted]                 = useState(false)
  const [tagged, setTagged]                 = useState<TaggedUser[]>([])

  // Auto-open file picker on mount (per UX brief)
  useEffect(() => {
    fileRef.current?.click()
  }, [])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setErr('')
    // Kontrollera filstorlek (max 20 MB råfil)
    if (f.size > 20 * 1024 * 1024) {
      setErr('Bilden är för stor (max 20 MB). Välj en annan bild.')
      return
    }
    // Komprimera alltid – tar bort storleksproblem och gör upload snabbare
    const compressed = await compressImage(f)
    setFile(compressed)
    setPreview(URL.createObjectURL(compressed))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!file || !location.trim()) return
    setLoading(true); setErr('')

    try {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) { router.push('/logga-in'); return }

      // Säkerställ public.users-rad (FK-skydd)
      await supabase.from('users').upsert({
        id:       user.id,
        username: user.user_metadata?.username || user.email?.split('@')[0] || 'seglare',
        email:    user.email ?? '',
      }, { onConflict: 'id', ignoreDuplicates: true })

      const ext  = file.name.split('.').pop() ?? 'jpg'
      const path = `${user.id}-${Date.now()}.${ext}`

      const { data: upload, error: upErr } = await supabase.storage
        .from('trips')
        .upload(path, file, { upsert: false })
      if (upErr || !upload) { setErr('Kunde inte ladda upp bilden. Försök igen.'); setLoading(false); return }

      const { data: { publicUrl } } = supabase.storage.from('trips').getPublicUrl(upload.path)

      const { data: trip, error: insErr } = await supabase.from('trips').insert({
        user_id:        user.id,
        image:          publicUrl,
        location_name:  location.trim().slice(0, 100),
        start_location: startLocation.trim().slice(0, 100) || null,
        caption:        caption.trim().slice(0, 280) || null,
        pinnar_rating:  pinnar,
        boat_type:      boatType || 'Annat',
        distance:       parseFloat(distance) || 0,
        duration:       parseInt(duration) || 0,
        average_speed_knots: 0,
        max_speed_knots:     0,
        started_at:     new Date().toISOString(),
        ended_at:       new Date().toISOString(),
      }).select('id').single()

      if (insErr || !trip) {
        setErr('Kunde inte spara turen. Kontrollera din anslutning och försök igen.')
        setLoading(false)
        return
      }

      // Tagga seglare + skicka notiser
      if (tagged.length > 0) {
        await supabase.from('trip_tags').insert(
          tagged.map(u => ({ trip_id: trip.id, tagged_user_id: u.id, tagged_by: user.id }))
        )
        for (const u of tagged) {
          try {
            await supabase.from('notifications').insert({
              user_id: u.id, actor_id: user.id, type: 'tag', trip_id: trip.id,
            })
          } catch { /* ignore notification errors */ }
        }
      }

      setPosted(true)
      setTimeout(() => router.push(`/tur/${trip.id}`), 800)
    } catch (e) {
      console.error('[manuell]', e)
      setErr('Något gick oväntat fel. Kontrollera anslutningen och försök igen.')
      setLoading(false)
    }
  }

  const canSubmit = !!file && !!location.trim() && !loading

  if (posted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div style={{ fontSize: 56 }}>🎉</div>
        <h2 style={{ fontSize: 20, fontWeight: 900, color: '#1e5c82' }}>Turen är loggad!</h2>
        <p style={{ fontSize: 14, color: '#7a9dab' }}>Välkommen till {location}-gänget.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f7fbfc', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 80px)' }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'rgba(250,254,255,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => router.back()} style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,123,140,0.07)', border: 'none', cursor: 'pointer',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Snabb-logg</h1>
        {/* Kasta loss always visible in header if can submit */}
        <button
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          disabled={!canSubmit}
          style={{
            padding: '8px 16px', borderRadius: 20, border: 'none', cursor: canSubmit ? 'pointer' : 'default',
            background: canSubmit ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'rgba(10,123,140,0.10)',
            color: canSubmit ? '#fff' : '#7a9dab',
            fontSize: 13, fontWeight: 700,
            boxShadow: canSubmit ? '0 2px 8px rgba(201,110,42,0.35)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {loading ? '...' : 'Kasta loss →'}
        </button>
      </header>

      <form onSubmit={handleSubmit} style={{ maxWidth: 560, margin: '0 auto', padding: '0 0 120px' }}>

        {/* ── Bild ── */}
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          style={{
            display: 'block', width: '100%', height: 260,
            background: preview ? 'transparent' : 'rgba(10,123,140,0.04)',
            border: preview ? 'none' : '2px dashed rgba(10,123,140,0.18)',
            borderRadius: preview ? 0 : 0,
            cursor: 'pointer', overflow: 'hidden', padding: 0,
            position: 'relative',
          }}
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
              <span style={{ fontSize: 48 }}>📷</span>
              <span style={{ fontSize: 14, color: '#7a9dab', fontWeight: 600 }}>Tryck för att välja bild</span>
              <span style={{ fontSize: 11, color: '#a0bec8' }}>Bild krävs för att logga</span>
            </div>
          )}
          {preview && (
            <div style={{
              position: 'absolute', bottom: 10, right: 10,
              background: 'rgba(0,0,0,0.45)', color: '#fff',
              fontSize: 11, padding: '4px 10px', borderRadius: 12, fontWeight: 600,
            }}>
              Byt bild
            </div>
          )}
        </button>
        <input ref={fileRef} type="file" accept="image/*" capture="environment" onChange={handleFile} style={{ display: 'none' }} />

        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* ── Plats (required) ── */}
          <LocationSearch
            value={location}
            onChange={(name) => setLocation(name)}
            placeholder="Grinda, Sandhamn, Utö…"
            required
            label="Plats"
            icon="📍"
          />

          {/* ── Avreste från (optional) ── */}
          <LocationSearch
            value={startLocation}
            onChange={(name) => setStartLocation(name)}
            placeholder="Stockholms ström, Nynäshamn…"
            label="Avreste från"
            icon="🛟"
          />

          {/* ── Pinnar rating ── */}
          <div>
            <label style={{ fontSize: 10, fontWeight: 800, color: '#5a8090', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 8 }}>
              Hur var turen?
            </label>
            <div style={{ display: 'flex', gap: 8 }}>
              {PINNAR.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPinnar(pinnar === p.value ? null : p.value)}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 14, border: 'none',
                    background: pinnar === p.value ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,123,140,0.07)',
                    color: pinnar === p.value ? '#fff' : '#3a6070',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    boxShadow: pinnar === p.value ? '0 2px 8px rgba(30,92,130,0.3)' : 'none',
                  }}
                >
                  <span style={{ fontSize: 16 }}>{p.emoji}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Caption (optional) ── */}
          <div>
            <label style={{ fontSize: 10, fontWeight: 800, color: '#5a8090', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 6 }}>
              Berätta kort <span style={{ fontWeight: 400, textTransform: 'none' }}>(valfritt)</span>
            </label>
            <textarea
              placeholder="Seglade hit i morgonsol, drack kaffe i solen och hoppade i…"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              maxLength={280}
              rows={3}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 14,
                border: '1.5px solid rgba(10,123,140,0.18)',
                background: '#fff', fontSize: 14, color: '#162d3a',
                outline: 'none', resize: 'none', fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ fontSize: 11, color: '#a0bec8', textAlign: 'right', marginTop: 2 }}>
              {caption.length}/280
            </div>
          </div>

          {/* ── Tagga seglare ── */}
          <div>
            <label style={{ fontSize: 10, fontWeight: 800, color: '#5a8090', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 6 }}>
              Tagga seglare <span style={{ fontWeight: 400, textTransform: 'none' }}>(valfritt)</span>
            </label>
            <TagInput tagged={tagged} onChange={setTagged} />
          </div>

          {/* ── Mer info (collapsible) ── */}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            style={{
              background: 'none', border: 'none', padding: '4px 0',
              fontSize: 12, color: '#5a8090', fontWeight: 600, cursor: 'pointer',
              display: 'flex', alignItems: 'center', gap: 4,
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 14, height: 14, transform: showMore ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
            {showMore ? 'Dölj detaljer' : '+ Lägg till detaljer (båttyp, distans)'}
          </button>

          {showMore && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '4px 0' }}>
              {/* Båttyp */}
              <div>
                <label style={{ fontSize: 10, fontWeight: 800, color: '#5a8090', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 8 }}>Båttyp</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {BOAT_TYPES.map(bt => (
                    <button key={bt} type="button" onClick={() => setBoatType(bt === boatType ? '' : bt)}
                      style={{
                        padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: boatType === bt ? '#1e5c82' : 'rgba(10,123,140,0.07)',
                        color: boatType === bt ? '#fff' : '#3d5865',
                        fontSize: 11, fontWeight: 600,
                      }}>
                      {bt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Distans + Tid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Distans (NM)', value: distance, set: setDistance, step: '0.1' },
                  { label: 'Tid (min)', value: duration, set: setDuration, step: '1' },
                ].map(({ label, value, set, step }) => (
                  <div key={label}>
                    <label style={{ fontSize: 11, color: '#7a9dab', display: 'block', marginBottom: 4 }}>{label}</label>
                    <input type="number" inputMode="decimal" step={step} min="0" placeholder="0"
                      value={value} onChange={e => set(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: 12,
                        border: '1.5px solid rgba(10,123,140,0.15)',
                        background: '#fff', fontSize: 14, textAlign: 'center',
                        outline: 'none', boxSizing: 'border-box',
                      }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {err && (
            <p style={{ fontSize: 13, color: '#cc3d3d', textAlign: 'center', background: '#fdeaea', borderRadius: 12, padding: '10px 14px', margin: 0 }}>
              {err}
            </p>
          )}
        </div>
      </form>

      {/* ── Sticky bottom CTA ── */}
      <div style={{
        position: 'fixed', bottom: 'var(--nav-h)', left: 0, right: 0,
        padding: '12px 14px',
        paddingBottom: 12,
        background: 'rgba(250,254,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(10,123,140,0.10)',
      }}>
        <button
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          disabled={!canSubmit}
          style={{
            width: '100%', padding: '15px 0', borderRadius: 16, border: 'none',
            background: canSubmit ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'rgba(10,123,140,0.10)',
            color: canSubmit ? '#fff' : '#7a9dab',
            fontSize: 16, fontWeight: 900, cursor: canSubmit ? 'pointer' : 'default',
            boxShadow: canSubmit ? '0 4px 20px rgba(201,110,42,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Sparar…' : !file ? '📷 Välj bild först' : !location.trim() ? '📍 Ange plats' : 'Kasta loss →'}
        </button>
      </div>
    </div>
  )
}

export default function ManuellPage() {
  return <Suspense><ManuellForm /></Suspense>
}

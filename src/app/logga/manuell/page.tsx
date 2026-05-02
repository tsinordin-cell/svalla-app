'use client'
export const dynamic = 'force-dynamic'
import { useState, useRef, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient, BOAT_TYPES } from '@/lib/supabase'
import { analytics } from '@/lib/analytics'
import TagInput from '@/components/TagInput'
import LocationSearch from '@/components/LocationSearch'

type TaggedUser = { id: string; username: string; avatar: string | null }

// ── Pinnar rating ────────────────────────────────────────────────────────────
const PINNAR = [
  { value: 1, label: 'Okej' },
  { value: 2, label: 'Bra tur!' },
  { value: 3, label: 'Magisk!' },
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
  const prefilledPlats   = searchParams.get('plats') ?? ''
  const plannedRouteId   = searchParams.get('planned_route_id') ?? null

  const extraFileRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview]               = useState('')
  const [file, setFile]                     = useState<File | null>(null)
  const [extraFiles,    setExtraFiles]    = useState<File[]>([])
  const [extraPreviews, setExtraPreviews] = useState<string[]>([])
  const [location, setLocation]             = useState(prefilledPlats)
  const [startLocation, setStartLocation]   = useState('')
  const [caption, setCaption]               = useState('')
  const [boatType, setBoatType]             = useState('')
  const [pinnar, setPinnar]                 = useState<number | null>(null)
  const [showMore, setShowMore]             = useState(false)
  const [distance, setDistance]             = useState('')
  const [duration, setDuration]             = useState('')
  const [authLoading, setAuthLoading]       = useState(true)
  const [loading, setLoading]               = useState(false)
  const [err, setErr]                       = useState('')
  const [posted, setPosted]                 = useState(false)
  const [tagged, setTagged]                 = useState<TaggedUser[]>([])
  const [routeId, setRouteId]               = useState<string | null>(null)
  const [routes, setRoutes]                 = useState<{ id: string; name: string }[]>([])

  // ── Thorkel AI ──
  const [aiVariants,  setAiVariants]  = useState<string[]>([])
  const [aiSummary,   setAiSummary]   = useState<string | null>(null)
  const [aiLoading,   setAiLoading]   = useState(false)
  const [aiErr,       setAiErr]       = useState(false)

  // Ladda rutter — lazy: bara när "detaljer"-panelen expanderas
  const [routesLoaded, setRoutesLoaded] = useState(false)
  useEffect(() => {
    if (!showMore || routesLoaded) return
    supabase.from('routes').select('id, name').order('name').then(({ data }) => {
      if (data) setRoutes(data)
      setRoutesLoaded(true)
    })
  }, [showMore, routesLoaded, supabase])

  // Förifyll start/slut från planerad rutt
  useEffect(() => {
    if (!plannedRouteId) return
    supabase
      .from('planned_routes')
      .select('start_name, end_name')
      .eq('id', plannedRouteId)
      .maybeSingle()
      .then(({ data }) => {
        if (!data) return
        if (data.start_name) setStartLocation(data.start_name)
        if (data.end_name)   setLocation(data.end_name)
      })
  }, [plannedRouteId, supabase])

  // Auth gate — block render until auth resolved (prevents flash + premature file picker)
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/logga-in?redirect=/logga/manuell'); return }
      setAuthLoading(false)
    })
  }, [supabase, router])

  // Auto-open file picker — only after auth confirmed
  useEffect(() => {
    if (authLoading) return
    fileRef.current?.click()
  }, [authLoading])

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    setErr('')
    if (f.size > 20 * 1024 * 1024) {
      setErr('Bilden är för stor (max 20 MB). Välj en annan bild.')
      return
    }
    const compressed = await compressImage(f)
    setFile(compressed)
    // Use FileReader for a stable base64 data-URL (avoids revoked blob URL bugs)
    const reader = new FileReader()
    reader.onload = () => setPreview(reader.result as string)
    reader.readAsDataURL(compressed)
  }

  async function handleExtraFiles(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? [])
    if (!files.length) return
    setErr('')
    const remaining = 5 - extraFiles.length
    const toAdd = files.slice(0, remaining)
    const compressed = await Promise.all(
      toAdd
        .filter(f => f.size <= 20 * 1024 * 1024)
        .map(f => compressImage(f))
    )
    // Stable base64 previews via FileReader
    const newPreviews = await Promise.all(
      compressed.map(f => new Promise<string>(resolve => {
        const r = new FileReader()
        r.onload = () => resolve(r.result as string)
        r.readAsDataURL(f)
      }))
    )
    setExtraFiles(prev => [...prev, ...compressed])
    setExtraPreviews(prev => [...prev, ...newPreviews])
    // reset input so same files can be re-added after remove
    e.target.value = ''
  }

  function removeExtraPhoto(i: number) {
    setExtraFiles(prev => prev.filter((_, j) => j !== i))
    setExtraPreviews(prev => prev.filter((_, j) => j !== i))
  }

  async function generateAiCaption() {
    if (aiLoading) return
    setAiLoading(true)
    setAiErr(false)
    setAiVariants([])
    analytics.aiAnalysisRequested({ source: 'manuell' })
    try {
      const res = await fetch('/api/trip-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distanceNM:  parseFloat(distance) || 0,
          durationMin: parseInt(duration)   || 0,
          avgSpeed:    (parseFloat(distance) > 0 && parseInt(duration) > 0)
            ? parseFloat(distance) / (parseInt(duration) / 60)
            : 0,
          maxSpeed:    0,
          boatType:    boatType || 'Okänd',
          locationName: location.trim() || undefined,
          stops:        [],
          nearbyPlaces: [],
          startTime:    new Date().toISOString(),
        }),
      })
      const { summary, summaries } = await res.json()
      if (summaries && summaries.length > 1) {
        setAiVariants(summaries)
      } else if (summary) {
        setCaption(summary)
        setAiSummary(summary)
      } else {
        setAiErr(true)
      }
    } catch { setAiErr(true) }
    setAiLoading(false)
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

      // Ladda upp extra bilder parallellt
      let extraUrls: string[] = []
      if (extraFiles.length > 0) {
        const uploads = await Promise.all(
          extraFiles.map(async (ef) => {
            const eExt  = ef.name.split('.').pop() ?? 'jpg'
            const ePath = `${user.id}-${Date.now()}-${Math.random().toString(36).slice(2)}.${eExt}`
            const { data: eUp } = await supabase.storage.from('trips').upload(ePath, ef, { upsert: false })
            if (!eUp) return null
            return supabase.storage.from('trips').getPublicUrl(eUp.path).data.publicUrl
          })
        )
        extraUrls = uploads.filter(Boolean) as string[]
      }

      const { data: trip, error: insErr } = await supabase.from('trips').insert({
        user_id:        user.id,
        image:          publicUrl,
        images:         extraUrls.length > 0 ? extraUrls : null,
        location_name:  location.trim().slice(0, 100),
        start_location: startLocation.trim().slice(0, 100) || null,
        caption:        caption.trim().slice(0, 280) || null,
        pinnar_rating:  pinnar,
        boat_type:      boatType || 'Annat',
        distance:       parseFloat(distance) || 0,
        duration:       parseInt(duration) || 0,
        average_speed_knots: 0,
        max_speed_knots:     0,
        route_id:       routeId,
        started_at:     new Date().toISOString(),
        ended_at:       new Date().toISOString(),
      }).select('id').single()

      if (insErr || !trip) {
        setErr('Kunde inte spara turen. Kontrollera din anslutning och försök igen.')
        setLoading(false)
        return
      }

      // Track event
      analytics.tripSaved({
        has_ai_analysis: false,
        has_photos: !!file,
        duration_seconds: parseInt(duration) * 60 || 0,
      })

      // Länka trip till planerad rutt
      if (plannedRouteId) {
        await supabase
          .from('planned_routes')
          .update({ trip_id: trip.id })
          .eq('id', plannedRouteId)
      }

      // Tagga seglare + skicka notiser
      if (tagged.length > 0) {
        await supabase.from('trip_tags').insert(
          tagged.map(u => ({ trip_id: trip.id, tagged_user_id: u.id, tagged_by_user_id: user.id }))
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
      fetch('/api/revalidate-feed', { method: 'POST' }).catch(() => {})
      setTimeout(() => router.push(`/tur/${trip.id}`), 800)
    } catch {
      setErr('Något gick oväntat fel. Kontrollera anslutningen och försök igen.')
      setLoading(false)
    }
  }

  const canSubmit = !!file && !!location.trim() && !loading

  // Block render until auth resolved — prevents flash + premature file picker
  if (authLoading) return null

  if (posted) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--grad-sea)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 32, height: 32 }}>
            <polyline points="20 6 9 17 4 12"/>
          </svg>
        </div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--sea)' }}>Turen är loggad!</h2>
        <p style={{ fontSize: 14, color: 'var(--txt3)' }}>Välkommen till {location}-gänget.</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 80px)' }}>
      {/* Header */}
      <header style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '12px 16px',
        background: 'var(--glass-96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button onClick={() => router.back()} className="press-feedback" style={{
          width: 36, height: 36, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'rgba(10,123,140,0.07)', border: 'none', cursor: 'pointer',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>Snabb-logg</h1>
        {/* Kasta loss always visible in header if can submit */}
        <button
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          disabled={!canSubmit}
          style={{
            padding: '8px 16px', borderRadius: 20, border: 'none', cursor: canSubmit ? 'pointer' : 'default',
            background: canSubmit ? 'var(--grad-acc)' : 'rgba(10,123,140,0.10)',
            color: canSubmit ? '#fff' : 'var(--txt3)',
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
            <img loading="lazy" decoding="async" src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: 8 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48, opacity: 0.45 }}>
                <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                <circle cx="12" cy="13" r="4"/>
              </svg>
              <span style={{ fontSize: 14, color: 'var(--txt3)', fontWeight: 600 }}>Tryck för att välja bild</span>
              <span style={{ fontSize: 11, color: 'var(--txt3)' }}>Bild krävs för att logga</span>
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
        <input ref={extraFileRef} type="file" accept="image/*" multiple onChange={handleExtraFiles} style={{ display: 'none' }} />

        {/* ── Extra foton (visas bara om huvud-bild är vald) ── */}
        {preview && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 12px',
            background: 'rgba(10,123,140,0.04)',
            borderBottom: '1px solid rgba(10,123,140,0.08)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
          } as React.CSSProperties}>
            {extraPreviews.map((src, i) => (
              <div key={i} style={{ position: 'relative', flexShrink: 0 }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img loading="lazy" decoding="async" src={src} alt="" style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 10, display: 'block' }} />
                <button
                  type="button"
                  onClick={() => removeExtraPhoto(i)}
                  aria-label={`Ta bort foto ${i + 1}`}
                  style={{
                    position: 'absolute', top: -6, right: -6,
                    width: 18, height: 18, borderRadius: '50%',
                    background: '#dc2626', border: '1.5px solid #fff',
                    color: '#fff', fontSize: 10, fontWeight: 700,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', padding: 0,
                  }}
                >×</button>
              </div>
            ))}
            {extraPreviews.length < 5 && (
              <button
                type="button"
                onClick={() => extraFileRef.current?.click()}
                style={{
                  width: 56, height: 56, borderRadius: 10, flexShrink: 0,
                  border: '2px dashed rgba(10,123,140,0.25)',
                  background: 'rgba(10,123,140,0.04)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', gap: 2,
                }}
              >
                <span style={{ fontSize: 18 }}>+</span>
                <span style={{ fontSize: 8, color: 'var(--txt3)', fontWeight: 700 }}>FOTO</span>
              </button>
            )}
            <span style={{ fontSize: 10, color: 'var(--txt3)', flexShrink: 0, paddingLeft: 4 }}>
              {extraPreviews.length}/5 extra
            </span>
          </div>
        )}

        <div style={{ padding: '16px 14px', display: 'flex', flexDirection: 'column', gap: 12 }}>

          {/* ── Plats (required) ── */}
          <LocationSearch
            value={location}
            onChange={(name) => setLocation(name)}
            placeholder="Grinda, Sandhamn, Utö…"
            required
            label="Plats"
          />

          {/* ── Avreste från (optional) ── */}
          <LocationSearch
            value={startLocation}
            onChange={(name) => setStartLocation(name)}
            placeholder="Stockholms ström, Nynäshamn…"
            label="Avreste från"
          />

          {/* ── Pinnar rating ── */}
          <div role="group" aria-labelledby="pinnar-label">
            <span id="pinnar-label" style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 8 }}>
              Hur var turen?
            </span>
            <div style={{ display: 'flex', gap: 8 }}>
              {PINNAR.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPinnar(pinnar === p.value ? null : p.value)}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 14, border: 'none',
                    background: pinnar === p.value ? 'var(--grad-sea)' : 'rgba(10,123,140,0.07)',
                    color: pinnar === p.value ? '#fff' : '#3a6070',
                    fontSize: 12, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.15s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    boxShadow: pinnar === p.value ? '0 2px 8px rgba(30,92,130,0.3)' : 'none',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, height: 18, color: pinnar === p.value ? '#fff' : 'var(--sea)', opacity: pinnar === p.value ? 1 : 0.6 }}>
                    {Array.from({ length: p.value }, (_, i) => (
                      <svg key={i} viewBox="0 0 12 14" style={{ width: 12, height: 14 }} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="6" cy="3" r="1.5"/>
                        <line x1="6" y1="4.5" x2="6" y2="12"/>
                        <line x1="2" y1="6.5" x2="10" y2="6.5"/>
                        <path d="M2 10.5 Q1 13 6 13 Q11 13 10 10.5"/>
                      </svg>
                    ))}
                  </span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* ── Caption (optional) + Thorkel ── */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
              <label htmlFor="manuell-caption" style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                Berätta kort <span style={{ fontWeight: 400, textTransform: 'none' }}>(valfritt)</span>
              </label>
              <button
                type="button"
                onClick={generateAiCaption}
                disabled={aiLoading}
                style={{
                  display: 'flex', alignItems: 'center', gap: 5,
                  padding: '5px 12px', borderRadius: 20,
                  border: '1.5px solid rgba(10,123,140,.2)',
                  background: aiSummary ? 'rgba(10,123,140,.08)' : 'var(--white)',
                  color: 'var(--sea)', fontSize: 12, fontWeight: 700,
                  cursor: aiLoading ? 'default' : 'pointer',
                  opacity: aiLoading ? 0.7 : 1,
                }}
              >
                {aiLoading ? (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
                      style={{ width: 13, height: 13, animation: 'spin .8s linear infinite' }}>
                      <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                    </svg>
                    Genererar…
                  </>
                ) : (
                  <>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                      <path d="M12 2l1.68 5.17H19l-4.42 3.21 1.68 5.17L12 12.35l-4.26 3.2 1.68-5.17L5 7.17h5.32z"/>
                    </svg>
                    {aiVariants.length > 0 ? 'Generera ny' : 'Fråga Thorkel'}
                  </>
                )}
              </button>
            </div>

            {aiErr && (
              <p style={{ margin: '0 0 6px', fontSize: 11, color: 'var(--err, #c0392b)' }}>
                Kunde inte generera — försök igen
              </p>
            )}

            {/* Thorkels tre varianter */}
            {aiVariants.length > 0 && (
              <div style={{ marginBottom: 8 }}>
                <div style={{
                  fontSize: 10, fontWeight: 700, color: 'var(--txt3)',
                  textTransform: 'uppercase', letterSpacing: '.5px', marginBottom: 6,
                }}>
                  Thorkels förslag — välj en
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {(['Poetisk', 'Rakt på', 'Social'] as const).map((label, i) => {
                    const variant = aiVariants[i]
                    if (!variant) return null
                    const isSelected = caption === variant
                    return (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setCaption(variant); setAiSummary(variant) }}
                        style={{
                          textAlign: 'left', padding: '10px 13px', borderRadius: 12,
                          border: `1.5px solid ${isSelected ? 'var(--sea)' : 'rgba(10,123,140,.14)'}`,
                          background: isSelected ? 'rgba(10,123,140,.07)' : 'var(--white)',
                          cursor: 'pointer', transition: 'all .15s',
                          WebkitTapHighlightColor: 'transparent',
                        }}
                      >
                        <div style={{
                          fontSize: 10, fontWeight: 700,
                          color: isSelected ? 'var(--sea)' : 'var(--txt3)',
                          textTransform: 'uppercase', letterSpacing: '.4px',
                          marginBottom: 4,
                          display: 'flex', alignItems: 'center', gap: 6,
                        }}>
                          {label}
                          {isSelected && (
                            <span style={{
                              background: 'var(--sea)', color: '#fff',
                              borderRadius: 10, padding: '1px 7px', fontSize: 9,
                            }}>VALD</span>
                          )}
                        </div>
                        <div style={{ fontSize: 13, color: 'var(--txt)', lineHeight: 1.55 }}>
                          {variant}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <textarea
              id="manuell-caption"
              placeholder={aiVariants.length > 0 ? 'Välj ett förslag ovan eller skriv själv…' : 'Seglade hit i morgonsol, drack kaffe i solen och hoppade i…'}
              value={caption}
              onChange={e => setCaption(e.target.value)}
              maxLength={280}
              rows={3}
              style={{
                width: '100%', padding: '12px 14px', borderRadius: 14,
                border: aiSummary && caption === aiSummary
                  ? '1.5px solid rgba(10,123,140,.35)'
                  : '1.5px solid rgba(10,123,140,0.18)',
                background: 'var(--white)', fontSize: 14, color: 'var(--txt)',
                outline: 'none', resize: 'none', fontFamily: 'inherit',
                boxSizing: 'border-box',
              }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 2 }}>
              {aiSummary && caption === aiSummary
                ? <span style={{ fontSize: 10, color: 'var(--sea)', fontWeight: 700 }}>Thorkel skrev denna — redigera fritt</span>
                : <span />}
              <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{caption.length}/280</span>
            </div>
          </div>

          {/* ── Tagga seglare ── */}
          <div role="group" aria-labelledby="tag-label">
            <span id="tag-label" style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 6 }}>
              Tagga seglare <span style={{ fontWeight: 400, textTransform: 'none' }}>(valfritt)</span>
            </span>
            <TagInput tagged={tagged} onChange={setTagged} />
          </div>

          {/* ── Mer info (collapsible) ── */}
          <button
            type="button"
            onClick={() => setShowMore(!showMore)}
            style={{
              background: 'none', border: 'none', padding: '4px 0',
              fontSize: 12, color: 'var(--txt3)', fontWeight: 600, cursor: 'pointer',
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
              <div role="group" aria-labelledby="boat-type-label">
                <span id="boat-type-label" style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 8 }}>Båttyp</span>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {BOAT_TYPES.map(bt => (
                    <button key={bt} type="button" onClick={() => setBoatType(bt === boatType ? '' : bt)}
                      style={{
                        padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer',
                        background: boatType === bt ? 'var(--sea)' : 'rgba(10,123,140,0.07)',
                        color: boatType === bt ? '#fff' : 'var(--txt2)',
                        fontSize: 11, fontWeight: 600,
                      }}>
                      {bt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Rutt */}
              {routes.length > 0 && (
                <div>
                  <label htmlFor="manuell-route" style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', display: 'block', marginBottom: 6 }}>
                    Rutt <span style={{ fontWeight: 400, textTransform: 'none' }}>(valfritt)</span>
                  </label>
                  <select
                    id="manuell-route"
                    value={routeId ?? ''}
                    onChange={e => setRouteId(e.target.value || null)}
                    style={{
                      width: '100%', padding: '10px 12px', borderRadius: 12,
                      border: '1.5px solid rgba(10,123,140,0.15)',
                      background: 'var(--white)', fontSize: 14, color: routeId ? 'var(--txt)' : 'var(--txt3)',
                      outline: 'none', appearance: 'none', WebkitAppearance: 'none',
                      boxSizing: 'border-box',
                    }}
                  >
                    <option value="">Ingen rutt vald</option>
                    {routes.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
                </div>
              )}

              {/* Distans + Tid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { label: 'Distans (NM)', value: distance, set: setDistance, step: '0.1' },
                  { label: 'Tid (min)', value: duration, set: setDuration, step: '1' },
                ].map(({ label, value, set, step }) => (
                  <div key={label}>
                    <label style={{ fontSize: 11, color: 'var(--txt3)', display: 'block', marginBottom: 4 }}>{label}</label>
                    <input type="number" inputMode="decimal" step={step} min="0" placeholder="0"
                      value={value} onChange={e => set(e.target.value)}
                      style={{
                        width: '100%', padding: '10px 12px', borderRadius: 12,
                        border: '1.5px solid rgba(10,123,140,0.15)',
                        background: 'var(--white)', fontSize: 14, textAlign: 'center',
                        outline: 'none', boxSizing: 'border-box',
                      }} />
                  </div>
                ))}
              </div>
            </div>
          )}

          {err && (
            <p style={{ fontSize: 13, color: 'var(--red)', textAlign: 'center', background: '#fdeaea', borderRadius: 12, padding: '10px 14px', margin: 0 }}>
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
        background: 'var(--glass-96)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(10,123,140,0.10)',
      }}>
        <button
          onClick={handleSubmit as unknown as React.MouseEventHandler}
          disabled={!canSubmit}
          className={canSubmit ? 'press-feedback' : undefined}
          style={{
            width: '100%', padding: '15px 0', borderRadius: 16, border: 'none',
            background: canSubmit ? 'var(--grad-acc)' : 'rgba(10,123,140,0.10)',
            color: canSubmit ? '#fff' : 'var(--txt3)',
            fontSize: 16, fontWeight: 700, cursor: canSubmit ? 'pointer' : 'default',
            boxShadow: canSubmit ? '0 4px 20px rgba(201,110,42,0.4)' : 'none',
            transition: 'all 0.2s',
          }}
        >
          {loading ? 'Sparar…' : !file ? 'Välj bild först' : !location.trim() ? 'Ange plats' : 'Kasta loss →'}
        </button>
      </div>
    </div>
  )
}

export default function ManuellPage() {
  return <Suspense><ManuellForm /></Suspense>
}

'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, BOAT_TYPES } from '@/lib/supabase'
import {
  type GpsPoint, type StopEvent,
  msToKnots, totalDistanceNM, avgSpeedKnots, maxSpeedKnots,
  detectStops, formatDuration,
} from '@/lib/gps'

type Phase = 'setup' | 'tracking' | 'paused' | 'done'

// ── Komprimera bild innan upload ─────────────────────────────────────────────
async function compressImage(file: File, maxPx = 1920, quality = 0.82): Promise<File> {
  return new Promise((resolve) => {
    const img = new window.Image()
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
        blob => resolve(blob ? new File([blob], file.name.replace(/\.\w+$/, '.jpg'), { type: 'image/jpeg' }) : file),
        'image/jpeg', quality
      )
    }
    img.onerror = () => resolve(file)
    img.src = url
  })
}

export default function SparaPage() {
  const router = useRouter()
  const supabase = createClient()

  // setup
  const [boatType, setBoatType] = useState('')
  const [phase, setPhase] = useState<Phase>('setup')

  // tracking state
  const [points, setPoints] = useState<GpsPoint[]>([])
  const [stops, setStops] = useState<StopEvent[]>([])
  const [elapsed, setElapsed] = useState(0)            // seconds
  const [currentSpeed, setCurrentSpeed] = useState(0)
  const [gpsError, setGpsError] = useState('')
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [saving, setSaving] = useState(false)
  const [tripId, setTripId] = useState<string | null>(null)
  const [err, setErr] = useState('')
  const [pinnar, setPinnar] = useState(0)
  const [caption, setCaption] = useState('')
  const [locationName, setLocationName] = useState('')

  const watchRef = useRef<number | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pauseStartRef = useRef<Date | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)
  const startTimeRef = useRef<Date | null>(null)

  // tick timer
  useEffect(() => {
    if (phase === 'tracking') {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  const startGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsError('GPS ej tillgängligt på denna enhet')
      return
    }
    setGpsError('')
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setGpsError('')
        const speedKnots = pos.coords.speed != null ? msToKnots(pos.coords.speed) : 0
        setCurrentSpeed(speedKnots)
        const pt: GpsPoint = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          speedKnots,
          heading: pos.coords.heading ?? null,
          accuracy: pos.coords.accuracy,
          recordedAt: new Date().toISOString(),
        }
        setPoints(prev => {
          const next = [...prev, pt]
          setStops(detectStops(next))
          return next
        })
      },
      (err) => {
        if (err.code === err.TIMEOUT) {
          // Timeout is normal while waiting for GPS fix — keep watching silently
          setGpsError('Söker GPS-signal…')
        } else if (err.code === err.PERMISSION_DENIED) {
          setGpsError('Tillåt platsåtkomst i telefonens inställningar')
        } else {
          setGpsError(`GPS-fel: ${err.message}`)
        }
      },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: Infinity }
    )
  }, [])

  const stopGPS = useCallback(() => {
    if (watchRef.current != null) {
      navigator.geolocation.clearWatch(watchRef.current)
      watchRef.current = null
    }
  }, [])

  function handleStart() {
    if (!boatType) return
    startTimeRef.current = new Date()
    setPhase('tracking')
    startGPS()
  }

  function handlePause() {
    pauseStartRef.current = new Date()
    stopGPS()
    setPhase('paused')
    if (points.length > 0) {
      const last = points[points.length - 1]
      setStops(prev => [...prev, {
        lat: last.lat,
        lng: last.lng,
        type: 'pause',
        startedAt: new Date().toISOString(),
        durationSeconds: 0,
      }])
    }
  }

  function handleResume() {
    if (pauseStartRef.current && stops.length > 0) {
      const dur = Math.round((Date.now() - pauseStartRef.current.getTime()) / 1000)
      setStops(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          endedAt: new Date().toISOString(),
          durationSeconds: dur,
        }
        return updated
      })
    }
    setPhase('tracking')
    startGPS()
  }

  function handleStop() {
    stopGPS()
    setPhase('done')
  }

  async function handleSave() {
    if (!file || saving) return
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/logga-in'); return }

    // Säkerställ att public.users-raden finns (FK-skydd)
    await supabase.from('users').upsert({
      id: user.id,
      username: user.user_metadata?.username || user.email?.split('@')[0] || 'seglare',
      email: user.email ?? '',
    }, { onConflict: 'id', ignoreDuplicates: true })

    const dist = totalDistanceNM(points)
    const avgSpd = avgSpeedKnots(points)
    const maxSpd = maxSpeedKnots(points)
    const startedAt = startTimeRef.current?.toISOString() ?? new Date().toISOString()
    const endedAt = new Date().toISOString()

    // upload image
    const ext = file.name.split('.').pop() ?? 'jpg'
    const filename = `${user.id}-${Date.now()}.${ext}`
    const { data: upload, error: upErr } = await supabase.storage
      .from('trips').upload(filename, file, { upsert: false })
    if (upErr || !upload) {
      setErr('Kunde inte ladda upp bilden: ' + (upErr?.message ?? 'okänt fel'))
      setSaving(false); return
    }
    const { data: { publicUrl } } = supabase.storage.from('trips').getPublicUrl(upload.path)

    // insert trip
    const { data: trip, error: tripErr } = await supabase.from('trips').insert({
      user_id: user.id,
      boat_type: boatType,
      distance: parseFloat(dist.toFixed(2)),
      duration: Math.round(elapsed / 60),
      average_speed_knots: parseFloat(avgSpd.toFixed(1)),
      max_speed_knots: parseFloat(maxSpd.toFixed(1)),
      image: publicUrl,
      started_at: startedAt,
      ended_at: endedAt,
      pinnar_rating: pinnar > 0 ? pinnar : null,
      caption: caption.trim() || null,
      location_name: locationName.trim() || null,
    }).select('id').single()

    if (tripErr || !trip) {
      setErr('Kunde inte spara turen: ' + (tripErr?.message ?? 'okänt fel'))
      setSaving(false); return
    }

    const tid = trip.id
    setTripId(tid)

    // batch insert GPS points (max 500 at a time)
    const GPS_BATCH = 500
    for (let i = 0; i < points.length; i += GPS_BATCH) {
      const batch = points.slice(i, i + GPS_BATCH).map(p => ({
        trip_id: tid,
        latitude: p.lat,
        longitude: p.lng,
        speed_knots: parseFloat(p.speedKnots.toFixed(2)),
        heading: p.heading,
        accuracy: p.accuracy,
        recorded_at: p.recordedAt,
      }))
      await supabase.from('gps_points').insert(batch)
    }

    // insert stops
    if (stops.length > 0) {
      const stopsData = stops
        .filter(s => s.durationSeconds > 0 || s.type === 'pause')
        .map(s => ({
          trip_id: tid,
          latitude: s.lat,
          longitude: s.lng,
          stop_type: s.type,
          started_at: s.startedAt,
          ended_at: s.endedAt ?? new Date().toISOString(),
          duration_seconds: s.durationSeconds,
        }))
      if (stopsData.length > 0) await supabase.from('stops').insert(stopsData)
    }

    router.push(`/tur/${tid}`)
  }

  const dist = totalDistanceNM(points)
  const avgSpd = avgSpeedKnots(points)
  const maxSpd = maxSpeedKnots(points)

  // ── SETUP ──
  if (phase === 'setup') {
    return (
      <div className="min-h-screen">
        <header className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 bg-white/96 border-b border-sea-light/40">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-full flex items-center justify-center bg-sea-xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-bold text-sea">Spåra tur live</h1>
        </header>

        <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-6">
          <div className="bg-sea-xl rounded-2xl p-4 text-sm text-sea-dark">
            <strong>GPS aktiveras</strong> när du startar. Turen loggas automatiskt med karta, stopp och hastighet.
          </div>

          <div>
            <label className="text-xs font-semibold text-svalla-text2 uppercase tracking-wide mb-2 block">
              Välj båttyp <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-4 gap-2">
              {BOAT_TYPES.map(bt => (
                <button
                  key={bt}
                  type="button"
                  onClick={() => setBoatType(bt)}
                  className="py-2 px-1 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: boatType === bt ? '#1e5c82' : 'rgba(10,123,140,0.07)',
                    color: boatType === bt ? 'white' : '#3d5865',
                  }}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={!boatType}
            onClick={handleStart}
            className="w-full py-5 rounded-2xl text-white font-black text-lg transition-all"
            style={{
              background: boatType ? 'linear-gradient(135deg,#0f9e64,#0d8554)' : 'rgba(10,123,140,0.15)',
              color: boatType ? 'white' : '#7a9dab',
              boxShadow: boatType ? '0 4px 20px rgba(15,158,100,0.4)' : 'none',
            }}
          >
            Starta spårning ⚓
          </button>
        </div>
      </div>
    )
  }

  // ── TRACKING / PAUSED ──
  if (phase === 'tracking' || phase === 'paused') {
    return (
      <div className="min-h-screen flex flex-col">
        {/* live stats — scrollable, with padding so content clears the sticky controls */}
        <div className="flex-1 overflow-y-auto flex flex-col items-center justify-center gap-6 px-6 py-10 pb-52">
          {/* status pill */}
          <div
            className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold"
            style={{
              background: phase === 'tracking' ? 'rgba(15,158,100,0.12)' : 'rgba(201,110,42,0.12)',
              color: phase === 'tracking' ? '#0f9e64' : '#c96e2a',
            }}
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{
                background: phase === 'tracking' ? '#0f9e64' : '#c96e2a',
                animation: phase === 'tracking' ? 'pulse 1.5s infinite' : 'none',
              }}
            />
            {phase === 'tracking' ? 'Spårar…' : 'Pausad'}
          </div>

          {/* timer */}
          <div className="text-center">
            <div className="text-6xl font-black text-sea tabular-nums">
              {formatDuration(elapsed)}
            </div>
            <div className="text-sm text-svalla-text3 mt-1 uppercase tracking-wide">Tid</div>
          </div>

          {/* stats grid */}
          <div className="w-full grid grid-cols-2 gap-3">
            <StatBox val={dist.toFixed(2)} unit="NM" label="Distans" />
            <StatBox val={currentSpeed.toFixed(1)} unit="kn" label="Hastighet nu" />
            <StatBox val={avgSpd.toFixed(1)} unit="kn" label="Snitt" />
            <StatBox val={maxSpd.toFixed(1)} unit="kn" label="Max" />
          </div>

          {/* paused banner */}
          {phase === 'paused' && (
            <div className="w-full bg-acc-light rounded-2xl p-4 text-center border-2 border-acc/20">
              <div className="text-2xl mb-1">⏸</div>
              <div className="font-black text-acc text-base">Spårning pausad</div>
              <div className="text-sm text-svalla-text2 mt-1">GPS-punkter sparas inte under paus</div>
            </div>
          )}

          {/* gps status */}
          {gpsError && (
            <p
              className="text-sm text-center rounded-xl px-4 py-2"
              style={{
                color: gpsError.startsWith('Söker') ? '#1e5c82' : '#dc2626',
                background: gpsError.startsWith('Söker') ? 'rgba(30,92,130,0.08)' : '#fef2f2',
              }}
            >
              {gpsError.startsWith('Söker') ? '📡 ' : '⚠️ '}{gpsError}
            </p>
          )}
          <p className="text-xs text-svalla-text3">{points.length} GPS-punkter • {stops.length} stopp</p>
        </div>

        {/* controls — sticky at bottom, always visible above nav */}
        <div className="sticky bottom-0 z-10 px-6 pt-4 flex flex-col gap-3"
          style={{
            background: 'rgba(235,243,248,0.97)',
            backdropFilter: 'blur(12px)',
            borderTop: '1px solid rgba(30,92,130,0.1)',
            paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + var(--nav-h, 64px) + 12px)',
          }}
        >
          {phase === 'tracking' ? (
            <button
              onClick={handlePause}
              className="w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3"
              style={{
                background: 'rgba(201,110,42,0.12)',
                color: '#c96e2a',
                border: '2px solid rgba(201,110,42,0.3)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <rect x="5" y="4" width="4" height="16" rx="1" />
                <rect x="15" y="4" width="4" height="16" rx="1" />
              </svg>
              Pausa spårning
            </button>
          ) : (
            <button
              onClick={handleResume}
              className="w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 text-white"
              style={{
                background: 'linear-gradient(135deg,#0f9e64,#0d8554)',
                boxShadow: '0 4px 20px rgba(15,158,100,0.4)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M8 5v14l11-7z" />
              </svg>
              Fortsätt spårning
            </button>
          )}
          <button
            onClick={handleStop}
            className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#cc3d3d,#b02f2f)', boxShadow: '0 4px 16px rgba(204,61,61,0.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <rect x="4" y="4" width="16" height="16" rx="2" />
            </svg>
            Avsluta tur
          </button>
        </div>

        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }`}</style>
      </div>
    )
  }

  // ── DONE — add photo and save ──
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 px-4 py-3 bg-white/96 border-b border-sea-light/40">
        <h1 className="text-lg font-bold text-sea">Tur avslutad 🎉</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-5" style={{ paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)' }}>
        {/* summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm grid grid-cols-2 gap-4">
          <StatRow label="Distans" val={`${dist.toFixed(2)} NM`} />
          <StatRow label="Tid" val={formatDuration(elapsed)} />
          <StatRow label="Snittfart" val={`${avgSpd.toFixed(1)} kn`} />
          <StatRow label="Toppfart" val={`${maxSpd.toFixed(1)} kn`} />
          <StatRow label="Stopp" val={`${stops.filter(s => s.type === 'stop').length} st`} />
          <StatRow label="GPS-punkter" val={`${points.length}`} />
        </div>

        {/* ── Pinnar-betyg ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 10px rgba(0,45,60,0.06)' }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.5px', margin: '0 0 12px' }}>
            Hur var turen?
          </p>
          <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
            {[
              { val: 1, label: 'Okej', emoji: '⚓' },
              { val: 2, label: 'Bra!', emoji: '⚓⚓' },
              { val: 3, label: 'Magisk 🔥', emoji: '⚓⚓⚓' },
            ].map(({ val, label, emoji }) => (
              <button
                key={val}
                type="button"
                onClick={() => setPinnar(pinnar === val ? 0 : val)}
                style={{
                  flex: 1, padding: '12px 4px', borderRadius: 14, border: 'none',
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: pinnar === val
                    ? val === 3 ? 'linear-gradient(135deg,#c96e2a,#e07828)'
                    : 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
                    : 'rgba(10,123,140,0.07)',
                  boxShadow: pinnar === val ? '0 3px 12px rgba(30,92,130,0.3)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                }}
              >
                <span style={{ fontSize: 16 }}>{emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: pinnar === val ? '#fff' : '#7a9dab' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Platsnamn ── */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
            Plats (valfritt)
          </label>
          <input
            type="text"
            placeholder="t.ex. Sandhamn, Fjäderholmarna…"
            value={locationName}
            onChange={e => setLocationName(e.target.value)}
            maxLength={80}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              border: '1.5px solid rgba(10,123,140,0.15)',
              background: '#fff', fontSize: 14, color: '#162d3a', outline: 'none',
              boxSizing: 'border-box',
            }}
          />
        </div>

        {/* ── Caption ── */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: 8 }}>
            Berätta om turen (valfritt)
          </label>
          <textarea
            placeholder="Vad hände? Vad var bäst?"
            value={caption}
            onChange={e => setCaption(e.target.value)}
            maxLength={280}
            rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              border: '1.5px solid rgba(10,123,140,0.15)',
              background: '#fff', fontSize: 14, color: '#162d3a', outline: 'none',
              resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
            }}
          />
          <div style={{ fontSize: 10, color: '#a0bec8', textAlign: 'right', marginTop: 4 }}>{caption.length}/280</div>
        </div>

        {/* photo (required) */}
        <div>
          <label className="text-xs font-semibold text-svalla-text2 uppercase tracking-wide mb-2 block">
            Bild <span className="text-red-500">*</span>
          </label>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-full h-52 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: preview ? 'transparent' : 'rgba(10,123,140,0.06)',
              border: preview ? 'none' : '2px dashed rgba(10,123,140,0.2)',
            }}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center text-svalla-text3">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm font-medium">Välj en bild från turen</div>
              </div>
            )}
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden"
            onChange={async e => {
              const f = e.target.files?.[0]
              if (f) {
                const compressed = await compressImage(f)
                setFile(compressed)
                setPreview(URL.createObjectURL(compressed))
              }
            }}
          />
        </div>

        {err && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            <strong>Fel:</strong> {err}
            <div className="mt-2 text-xs text-red-500">
              Är du inloggad? Gå till <a href="/logga-in" className="underline">svalla.se/logga-in</a> och logga in, kom sedan tillbaka.
            </div>
          </div>
        )}

        <button
          onClick={handleSave}
          disabled={!file || saving}
          className="w-full py-4 rounded-2xl text-white font-black text-base"
          style={{
            background: file && !saving ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'rgba(10,123,140,0.15)',
            color: file && !saving ? 'white' : '#7a9dab',
            boxShadow: file && !saving ? '0 4px 20px rgba(201,110,42,0.4)' : 'none',
          }}
        >
          {saving ? 'Sparar…' : 'Spara och visa tur →'}
        </button>
      </div>
    </div>
  )
}

function StatBox({ val, unit, label }: { val: string; unit: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-4 text-center shadow-sm">
      <div className="text-2xl font-black text-sea leading-none">
        {val}<span className="text-sm font-medium ml-1">{unit}</span>
      </div>
      <div className="text-[10px] text-svalla-text3 uppercase tracking-wide mt-1">{label}</div>
    </div>
  )
}

function StatRow({ label, val }: { label: string; val: string }) {
  return (
    <div>
      <div className="text-[10px] text-svalla-text3 uppercase tracking-wide">{label}</div>
      <div className="text-base font-bold text-sea">{val}</div>
    </div>
  )
}

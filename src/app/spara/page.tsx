'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { createClient, BOAT_TYPES } from '@/lib/supabase'
import { buildRoutePoints } from '@/lib/routeSmooth'
import {
  type GpsPoint, type StopEvent,
  msToKnots, totalDistanceNM, avgSpeedKnots, maxSpeedKnots,
  detectStops, formatDuration, isGpsAnomaly, reverseGeocode,
  type MovementState, computeMovementState,
  calculateBearing, bearingLabel,
  type LiveInsight, getLiveInsights,
} from '@/lib/gps'
import { GpsKalmanFilter } from '@/lib/kalman'
import { bufferPoint, getPendingPoints, clearPoints, getPendingCount } from '@/lib/offlineBuffer'
import { snapshotTrip, loadTripSnapshot, clearTripSnapshot, type TripSnapshot } from '@/lib/tripPersistence'
import { detectVisitedIslands } from '@/lib/islandCoords'
import { computeUnlocked, type TripForAch } from '@/lib/achievements'

const LiveTrackMap = dynamic(() => import('@/components/LiveTrackMap'), { ssr: false, loading: () => null })

type Phase = 'setup' | 'tracking' | 'paused' | 'done'

// ── Haptic feedback ───────────────────────────────────────────────────────────
function haptic(pattern: number | number[]) {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    navigator.vibrate(pattern)
  }
}

// ── Compress image before upload ──────────────────────────────────────────────
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

// ── Movement state label/color ────────────────────────────────────────────────
function movementMeta(state: MovementState): { label: string; color: string; bg: string } {
  switch (state) {
    case 'SEGLING':  return { label: '⛵ SEGLING',   color: '#0f9e64', bg: 'rgba(15,158,100,.12)' }
    case 'DRIFTAR':  return { label: '🌊 DRIFTAR',   color: '#1e5c82', bg: 'rgba(30,92,130,.12)' }
    case 'ANKRAT':   return { label: '⚓ ANKRAT',    color: '#c96e2a', bg: 'rgba(201,110,42,.12)' }
    case 'STILLA':   return { label: '◉ STILLA',    color: '#7a9dab', bg: 'rgba(122,157,171,.12)' }
  }
}

// ─────────────────────────────────────────────────────────────────────────────

export default function SparaPage() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  // ── Core state ──
  const [boatType,      setBoatType]      = useState('')
  const [phase,         setPhase]         = useState<Phase>('setup')
  const [points,        setPoints]        = useState<GpsPoint[]>([])
  const [stops,         setStops]         = useState<StopEvent[]>([])
  const [elapsed,       setElapsed]       = useState(0)
  const [currentSpeed,  setCurrentSpeed]  = useState(0)
  const [gpsError,      setGpsError]      = useState('')
  const [file,          setFile]          = useState<File | null>(null)
  const [preview,       setPreview]       = useState('')
  const [saving,        setSaving]        = useState(false)
  const [tripId,        setTripId]        = useState<string | null>(null)
  const [err,           setErr]           = useState('')
  const [pinnar,        setPinnar]        = useState(0)
  const [caption,       setCaption]       = useState('')
  const [locationName,  setLocationName]  = useState('')
  const [isOnline,      setIsOnline]      = useState(true)
  const [offlineBuffered, setOfflineBuffered] = useState(0)
  const [currentPos,    setCurrentPos]    = useState<{ lat: number; lng: number } | null>(null)
  const [anomalyCount,  setAnomalyCount]  = useState(0)

  // ── New GPS intelligence state ──
  const [movementState,  setMovementState]  = useState<MovementState>('STILLA')
  const [bearing,        setBearing]        = useState<number | null>(null)
  const [liveInsights,   setLiveInsights]   = useState<LiveInsight[]>([])
  const [shownInsightKeys, setShownInsightKeys] = useState<Set<string>>(new Set())
  const [flashInsight,   setFlashInsight]   = useState<LiveInsight | null>(null)

  // ── Recovery state ──
  const [recoverySnap, setRecoverySnap] = useState<TripSnapshot | null>(null)

  // ── Besökta öar ──
  const [newlyVisitedIslands, setNewlyVisitedIslands] = useState<string[]>([])

  // ── Achievement celebration ──
  const [newAchievements, setNewAchievements] = useState<{ emoji: string; label: string }[]>([])
  const [showCelebration, setShowCelebration] = useState(false)

  // ── AI analys (pre-fetched when done phase begins) ──
  const [aiSummary,       setAiSummary]       = useState<string | null>(null)
  const [aiLoading,       setAiLoading]       = useState(false)
  const [includeAnalysis, setIncludeAnalysis] = useState(true)

  // ── Refs ──
  const watchRef         = useRef<number | null>(null)
  const timerRef         = useRef<NodeJS.Timeout | null>(null)
  const heartbeatRef     = useRef<NodeJS.Timeout | null>(null)
  const insightTimerRef  = useRef<NodeJS.Timeout | null>(null)
  const pauseStartRef    = useRef<Date | null>(null)
  const fileRef          = useRef<HTMLInputElement>(null)
  const startTimeRef     = useRef<Date | null>(null)
  const lastGpsPtRef     = useRef<{ lat: number; lng: number; ts: number } | null>(null)
  const kalmanRef        = useRef<GpsKalmanFilter | null>(null)
  const anomalyCountRef  = useRef(0)
  const syncOfflineRef   = useRef<() => void>(() => {})
  const pointsRef        = useRef<GpsPoint[]>([])  // mirror for GPS callback

  // ── Keep pointsRef in sync ──
  useEffect(() => { pointsRef.current = points }, [points])

  // ── Check for crash recovery on mount ─────────────────────────────────────
  useEffect(() => {
    const snap = loadTripSnapshot()
    if (snap) setRecoverySnap(snap)
  }, [])

  // ── Online/offline detection ───────────────────────────────────────────────
  useEffect(() => {
    setIsOnline(navigator.onLine)
    function handleOnline()  { setIsOnline(true);  syncOfflineRef.current() }
    function handleOffline() { setIsOnline(false) }
    window.addEventListener('online',  handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online',  handleOnline)
      window.removeEventListener('offline', handleOffline)
      if (watchRef.current != null) navigator.geolocation.clearWatch(watchRef.current)
      if (timerRef.current)    clearInterval(timerRef.current)
      if (heartbeatRef.current) clearInterval(heartbeatRef.current)
      if (insightTimerRef.current) clearTimeout(insightTimerRef.current)
    }
  }, [])

  // ── Sync offline buffer to Supabase ───────────────────────────────────────
  const syncOfflinePoints = useCallback(async () => {
    try {
      const pending = await getPendingPoints()
      if (pending.length === 0 || !tripId) return
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      const batch = pending.map(p => ({
        trip_id: tripId,
        latitude:    p.point.lat,
        longitude:   p.point.lng,
        speed_knots: parseFloat(p.point.speedKnots.toFixed(2)),
        heading:     p.point.heading,
        accuracy:    p.point.accuracy,
        recorded_at: p.point.recordedAt,
      }))
      const { error } = await supabase.from('gps_points').insert(batch)
      if (!error) {
        await clearPoints(pending.map(p => p.key))
        setOfflineBuffered(0)
      }
    } catch { /* sync failed — data stays in buffer */ }
  }, [tripId, supabase])

  useEffect(() => { syncOfflineRef.current = syncOfflinePoints }, [syncOfflinePoints])

  // ── Elapsed timer ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase === 'tracking') {
      timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current) }
  }, [phase])

  // ── Heartbeat save every 30s (crash recovery) ─────────────────────────────
  useEffect(() => {
    if (phase !== 'tracking' && phase !== 'paused') {
      if (heartbeatRef.current) { clearInterval(heartbeatRef.current); heartbeatRef.current = null }
      return
    }
    heartbeatRef.current = setInterval(() => {
      snapshotTrip({
        boatType,
        phase: phase as 'tracking' | 'paused',
        startedAt: startTimeRef.current?.toISOString() ?? new Date().toISOString(),
        elapsed,
        tripId,
      })
    }, 30_000)
    return () => { if (heartbeatRef.current) clearInterval(heartbeatRef.current) }
  }, [phase, tripId, boatType, elapsed])

  // ── GPS tracking ───────────────────────────────────────────────────────────
  const startGPS = useCallback(() => {
    if (!navigator.geolocation) { setGpsError('GPS ej tillgängligt på denna enhet'); return }
    setGpsError('')
    watchRef.current = navigator.geolocation.watchPosition(
      (pos) => {
        setGpsError('')
        if (pos.coords.accuracy > 80) return

        const now = Date.now()

        // Anomaly detection
        if (lastGpsPtRef.current) {
          if (isGpsAnomaly(
            lastGpsPtRef.current.lat, lastGpsPtRef.current.lng, lastGpsPtRef.current.ts,
            pos.coords.latitude, pos.coords.longitude, now
          )) {
            anomalyCountRef.current += 1
            setAnomalyCount(anomalyCountRef.current)
            return
          }
        }

        // Speed calculation — prefer position-delta (consistent across devices),
        // fall back to device-reported speed only on the very first point.
        let speedKnots = 0
        if (lastGpsPtRef.current) {
          const dtHours = (now - lastGpsPtRef.current.ts) / 3_600_000
          if (dtHours > 0.0005) {
            const R = 3440.065
            const lat1 = lastGpsPtRef.current.lat * Math.PI / 180
            const lat2 = pos.coords.latitude  * Math.PI / 180
            const dLat = (pos.coords.latitude  - lastGpsPtRef.current.lat) * Math.PI / 180
            const dLng = (pos.coords.longitude - lastGpsPtRef.current.lng) * Math.PI / 180
            const a = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
            speedKnots = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) / dtHours
          }
        } else if (pos.coords.speed != null && pos.coords.speed >= 0) {
          // First point — no delta available yet, use device speed
          speedKnots = msToKnots(pos.coords.speed)
        }

        // Kalman smoothing
        if (!kalmanRef.current) kalmanRef.current = new GpsKalmanFilter()
        const smoothed = kalmanRef.current.update(pos.coords.latitude, pos.coords.longitude)

        setCurrentPos({ lat: smoothed.lat, lng: smoothed.lng })

        // Bearing — only update when meaningfully moving
        if (lastGpsPtRef.current && speedKnots > 0.5) {
          setBearing(calculateBearing(
            lastGpsPtRef.current.lat, lastGpsPtRef.current.lng,
            smoothed.lat, smoothed.lng
          ))
        }

        lastGpsPtRef.current = { lat: smoothed.lat, lng: smoothed.lng, ts: now }
        const clampedSpeed = Math.min(speedKnots, 40)
        setCurrentSpeed(clampedSpeed)

        const pt: GpsPoint = {
          lat:        smoothed.lat,
          lng:        smoothed.lng,
          speedKnots: clampedSpeed,
          heading:    pos.coords.heading ?? null,
          accuracy:   pos.coords.accuracy,
          recordedAt: new Date().toISOString(),
        }

        setPoints(prev => {
          const next = [...prev, pt]
          setStops(detectStops(next))

          // Movement state (every 5 points to avoid thrashing)
          if (next.length % 5 === 0) {
            setMovementState(computeMovementState(next))
          }

          // Live insights
          if (next.length % 30 === 0) {
            setStops(prevStops => {
              const newInsights = getLiveInsights(next, elapsed, prevStops)
              newInsights.forEach(ins => {
                setShownInsightKeys(prev => {
                  if (!prev.has(ins.key)) {
                    // Flash this insight briefly
                    setFlashInsight(ins)
                    if (insightTimerRef.current) clearTimeout(insightTimerRef.current)
                    insightTimerRef.current = setTimeout(() => setFlashInsight(null), 4000)
                    return new Set([...prev, ins.key])
                  }
                  return prev
                })
              })
              setLiveInsights(newInsights)
              return prevStops
            })
          }

          return next
        })

        // Buffer to IndexedDB for offline sync
        bufferPoint({
          lat:        smoothed.lat,
          lng:        smoothed.lng,
          speedKnots: clampedSpeed,
          heading:    pos.coords.heading ?? null,
          accuracy:   pos.coords.accuracy,
          recordedAt: new Date().toISOString(),
        })
          .then(() => getPendingCount().then(setOfflineBuffered))
          .catch(() => {})
      },
      (err) => {
        if (err.code === err.TIMEOUT)             setGpsError('Söker GPS-signal… Gå ut om du är inomhus.')
        else if (err.code === err.PERMISSION_DENIED) setGpsError('GPS-åtkomst nekad – tillåt platsdelning i inställningarna.')
        else if (err.code === err.POSITION_UNAVAILABLE) setGpsError('GPS-signal ej tillgänglig.')
        else setGpsError('GPS-fel – prova att ladda om sidan.')
      },
      { enableHighAccuracy: true, maximumAge: 3000, timeout: Infinity }
    )
  }, [elapsed])

  const stopGPS = useCallback(() => {
    if (watchRef.current != null) {
      navigator.geolocation.clearWatch(watchRef.current)
      watchRef.current = null
    }
    lastGpsPtRef.current = null
  }, [])

  // ── Phase transitions ──────────────────────────────────────────────────────
  function handleStart(overrideBoat?: string) {
    const boat = overrideBoat ?? boatType
    if (!boat) return
    haptic(200)
    startTimeRef.current = new Date()
    lastGpsPtRef.current = null
    anomalyCountRef.current = 0
    kalmanRef.current = new GpsKalmanFilter()
    setBoatType(boat)
    setPhase('tracking')
    setAnomalyCount(0)
    setMovementState('STILLA')
    setBearing(null)
    setLiveInsights([])
    setShownInsightKeys(new Set())
    setFlashInsight(null)
    startGPS()
    // Initial snapshot
    snapshotTrip({ boatType: boat, phase: 'tracking', startedAt: new Date().toISOString(), elapsed: 0, tripId: null })
  }

  function handleRecoverTrip() {
    if (!recoverySnap) return
    const snap = recoverySnap
    setRecoverySnap(null)
    // Restore elapsed time accounting for time since snapshot
    const extraSec = Math.round((Date.now() - new Date(snap.savedAt).getTime()) / 1000)
    setElapsed(snap.elapsed + extraSec)
    setTripId(snap.tripId)
    setBoatType(snap.boatType)
    startTimeRef.current = new Date(snap.startedAt)
    anomalyCountRef.current = 0
    kalmanRef.current = new GpsKalmanFilter()
    haptic(150)
    setPhase('tracking')
    startGPS()
  }

  function handleDiscardRecovery() {
    clearTripSnapshot()
    setRecoverySnap(null)
  }

  function handlePause() {
    haptic([100, 50, 100])
    pauseStartRef.current = new Date()
    stopGPS()
    kalmanRef.current?.reset()
    setPhase('paused')
    if (points.length > 0) {
      const last = points[points.length - 1]
      setStops(prev => [...prev, {
        lat: last.lat, lng: last.lng, type: 'pause',
        startedAt: new Date().toISOString(), durationSeconds: 0,
      }])
    }
  }

  function handleResume() {
    haptic(150)
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
    kalmanRef.current?.reset()
    setPhase('tracking')
    startGPS()
  }

  function handleStop() {
    haptic([50, 50, 100, 50, 200])
    stopGPS()
    kalmanRef.current?.reset()
    clearTripSnapshot()
    setPhase('done')
  }

  // ── AI caption generator ───────────────────────────────────────────────────
  async function generateAiCaption() {
    if (aiLoading) return
    setAiLoading(true)
    try {
      const dist   = totalDistanceNM(points)
      const avgSpd = avgSpeedKnots(points)
      const maxSpd = maxSpeedKnots(points)
      const res = await fetch('/api/trip-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distanceNM:  dist,
          durationMin: Math.round(elapsed / 60),
          avgSpeed:    avgSpd,
          maxSpeed:    maxSpd,
          boatType,
          locationName: locationName.trim() || undefined,
          stops: stops.map(s => ({ durationSeconds: s.durationSeconds, type: s.type })),
          nearbyPlaces: [],
        }),
      })
      const { summary } = await res.json()
      if (summary) { setCaption(summary); setAiSummary(summary) }
    } catch { /* tyst */ }
    setAiLoading(false)
  }

  // ── Save trip ──────────────────────────────────────────────────────────────
  async function handleSave() {
    if (saving) return
    setSaving(true)

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { router.push('/logga-in'); return }

    await supabase.from('users').upsert({
      id: user.id,
      username: user.user_metadata?.username || user.email?.split('@')[0] || 'seglare',
      email: user.email ?? '',
    }, { onConflict: 'id', ignoreDuplicates: true })

    const dist    = totalDistanceNM(points)
    const avgSpd  = avgSpeedKnots(points)
    const maxSpd  = maxSpeedKnots(points)
    const startedAt = startTimeRef.current?.toISOString() ?? new Date().toISOString()
    const endedAt   = new Date().toISOString()

    // Upload photo (optional — use placeholder if none provided)
    let imageUrl = ''
    if (file) {
      const ext      = file.name.split('.').pop() ?? 'jpg'
      const filename = `${user.id}-${Date.now()}.${ext}`
      const { data: upload, error: upErr } = await supabase.storage
        .from('trips').upload(filename, file, { upsert: false })
      if (upErr || !upload) {
        setErr('Kunde inte ladda upp bilden: ' + (upErr?.message ?? 'okänt fel'))
        setSaving(false); return
      }
      const { data: { publicUrl } } = supabase.storage.from('trips').getPublicUrl(upload.path)
      imageUrl = publicUrl
    }

    // Build route_points: accuracy filter → speed-outlier removal → Douglas-Peucker → dynamic cap
    // This removes GPS teleport jumps and micro-jitter before saving to DB
    const routePoints = buildRoutePoints(points)

    // Insert trip
    const { data: trip, error: tripErr } = await supabase.from('trips').insert({
      user_id:              user.id,
      boat_type:            boatType,
      distance:             parseFloat(dist.toFixed(2)),
      duration:             Math.round(elapsed / 60),
      average_speed_knots:  parseFloat(avgSpd.toFixed(1)),
      max_speed_knots:      parseFloat(maxSpd.toFixed(1)),
      image:                imageUrl || null,
      started_at:           startedAt,
      ended_at:             endedAt,
      pinnar_rating:        pinnar > 0 ? pinnar : null,
      caption:              caption.trim() || null,
      location_name:        locationName.trim() || null,
      route_points:         routePoints,
    }).select('id').single()

    if (tripErr || !trip) {
      setErr('Kunde inte spara turen: ' + (tripErr?.message ?? 'okänt fel'))
      setSaving(false); return
    }

    const tid = trip.id
    setTripId(tid)
    clearTripSnapshot()

    // Batch insert GPS points (500 at a time)
    for (let i = 0; i < points.length; i += 500) {
      await supabase.from('gps_points').insert(
        points.slice(i, i + 500).map(p => ({
          trip_id:     tid,
          latitude:    p.lat,
          longitude:   p.lng,
          speed_knots: parseFloat(p.speedKnots.toFixed(2)),
          heading:     p.heading,
          accuracy:    p.accuracy,
          recorded_at: p.recordedAt,
        }))
      )
    }

    // Insert stops
    const stopsData = stops
      .filter(s => s.durationSeconds > 0 || s.type === 'pause')
      .map(s => ({
        trip_id:          tid,
        latitude:         s.lat,
        longitude:        s.lng,
        stop_type:        s.type,
        started_at:       s.startedAt,
        ended_at:         s.endedAt ?? new Date().toISOString(),
        duration_seconds: s.durationSeconds,
      }))
    if (stopsData.length > 0) await supabase.from('stops').insert(stopsData)

    // Background: reverse geocode real stops
    const realStops = stopsData.filter(s => s.stop_type === 'stop')
    if (realStops.length > 0) {
      Promise.resolve().then(async () => {
        for (const s of realStops) {
          try {
            const placeName = await reverseGeocode(s.latitude, s.longitude)
            if (placeName) {
              await supabase.from('stops').update({ place_name: placeName })
                .eq('trip_id', tid).eq('started_at', s.started_at)
            }
          } catch { /* tyst */ }
          await new Promise(r => setTimeout(r, 1200))
        }
      }).catch(() => {})
    }

    // Check achievements: hämta tidigare turer och jämför
    Promise.resolve().then(async () => {
      try {
        const { data: prevTrips } = await supabase
          .from('trips')
          .select('distance, pinnar_rating, location_name, boat_type, started_at, ended_at, max_speed_knots, created_at')
          .eq('user_id', user.id)
          .neq('id', tid)  // exkludera just sparad tur
        const prevList = (prevTrips ?? []) as TripForAch[]
        const newList: TripForAch[] = [
          ...prevList,
          {
            distance: parseFloat(dist.toFixed(2)),
            pinnar_rating: pinnar > 0 ? pinnar : null,
            location_name: locationName.trim() || null,
            boat_type: boatType,
            started_at: startedAt,
            ended_at: endedAt,
            max_speed_knots: parseFloat(maxSpd.toFixed(1)),
            created_at: endedAt,
          }
        ]
        const before = new Set(computeUnlocked(prevList).map(a => a.id))
        const after  = computeUnlocked(newList)
        const justUnlocked = after.filter(a => !before.has(a.id))
        if (justUnlocked.length > 0) {
          setNewAchievements(justUnlocked.map(a => ({ emoji: a.emoji, label: a.label })))
          setShowCelebration(true)
        }
      } catch { /* tyst */ }
    }).catch(() => {})

    // Background: Besökta öar — detektera vilka öar GPS-rutten passerat
    Promise.resolve().then(async () => {
      try {
        const visitedSlugs = detectVisitedIslands(points.map(p => ({ lat: p.lat, lng: p.lng })))
        if (visitedSlugs.length > 0) {
          // upsert — ignorera om redan besökt
          const rows = visitedSlugs.map(slug => ({
            user_id:    user.id,
            island_slug: slug,
            trip_id:    tid,
            visited_at: endedAt,
          }))
          await supabase.from('visited_islands').upsert(rows, { onConflict: 'user_id,island_slug', ignoreDuplicates: true })
          // Visa i done-skärmen vilka nya öar som besöktes
          setNewlyVisitedIslands(visitedSlugs)
        }
      } catch { /* tyst */ }
    }).catch(() => {})

    // Background: AI trip summary — bara om användaren inte redan genererat en via knappen
    if (!aiSummary) {
      fetch('/api/trip-summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          distanceNM:  dist,
          durationMin: Math.round(elapsed / 60),
          avgSpeed:    avgSpd,
          maxSpeed:    maxSpd,
          boatType,
          locationName: locationName.trim() || undefined,
          stops: stops.map(s => ({ durationSeconds: s.durationSeconds, type: s.type })),
          nearbyPlaces: [],
          startTime:   startedAt,
          endTime:     endedAt,
          anomalyCount: anomalyCountRef.current > 0 ? anomalyCountRef.current : undefined,
        }),
      })
        .then(r => r.json())
        .then(({ summary }) => {
          if (summary && tid) {
            void (async () => {
              try { await supabase.from('trips').update({ ai_summary: summary }).eq('id', tid) }
              catch { /* tyst */ }
            })()
          }
        })
        .catch(() => {})
    } else if (aiSummary && tid) {
      // Användaren har redan genererat och ev. redigerat caption — spara den som ai_summary
      void supabase.from('trips').update({ ai_summary: aiSummary }).eq('id', tid).then(() => {})
    }

    setSaving(false)
    // Navigera till tursidan — slight delay om celebration visas
    setTimeout(() => router.push(`/tur/${tid}`), 100)
  }

  const dist   = totalDistanceNM(points)
  const avgSpd = avgSpeedKnots(points)
  const maxSpd = maxSpeedKnots(points)

  // ── SETUP ──────────────────────────────────────────────────────────────────
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

        <div className="max-w-lg mx-auto px-4 py-6 flex flex-col gap-5">

          {/* ── Crash recovery banner ── */}
          {recoverySnap && (
            <div style={{
              background: 'rgba(201,110,42,.08)',
              border: '1.5px solid rgba(201,110,42,.3)',
              borderRadius: 16, padding: '14px 16px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <span style={{ fontSize: 20 }}>⚠️</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 800, color: '#c96e2a' }}>Avbruten tur hittad</div>
                  <div style={{ fontSize: 12, color: '#8a6040', marginTop: 1 }}>
                    {recoverySnap.boatType} · {formatDuration(recoverySnap.elapsed)} · sparad{' '}
                    {Math.round((Date.now() - new Date(recoverySnap.savedAt).getTime()) / 60000)} min sedan
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button
                  onClick={handleRecoverTrip}
                  style={{
                    flex: 1, padding: '10px', borderRadius: 12, border: 'none',
                    background: '#c96e2a', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Fortsätt turen
                </button>
                <button
                  onClick={handleDiscardRecovery}
                  style={{
                    padding: '10px 14px', borderRadius: 12,
                    border: '1px solid rgba(201,110,42,.3)',
                    background: 'transparent', color: '#c96e2a',
                    fontWeight: 600, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Kasta bort
                </button>
              </div>
            </div>
          )}

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
                  key={bt} type="button" onClick={() => setBoatType(bt)}
                  className="py-2 px-1 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: boatType === bt ? '#1e5c82' : 'rgba(10,123,140,0.07)',
                    color:      boatType === bt ? 'white'   : '#3d5865',
                  }}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button" disabled={!boatType} onClick={() => handleStart()}
            className="w-full py-5 rounded-2xl text-white font-black text-lg transition-all"
            style={{
              background: boatType ? 'linear-gradient(135deg,#0f9e64,#0d8554)' : 'rgba(10,123,140,0.15)',
              color:      boatType ? 'white' : '#7a9dab',
              boxShadow:  boatType ? '0 4px 20px rgba(15,158,100,0.4)' : 'none',
            }}
          >
            Starta spårning ⚓
          </button>
        </div>
      </div>
    )
  }

  // ── TRACKING / PAUSED ──────────────────────────────────────────────────────
  if (phase === 'tracking' || phase === 'paused') {
    const mv = movementMeta(movementState)
    return (
      <div className="min-h-screen flex flex-col">
        <div className="flex-1 overflow-y-auto flex flex-col items-center gap-4 px-5 py-5 pb-52">

          {/* Offline banner */}
          {!isOnline && (
            <div style={{
              width: '100%', background: 'rgba(201,110,42,.1)',
              border: '1px solid rgba(201,110,42,.3)',
              color: '#c96e2a', padding: '10px 14px',
              borderRadius: 14, fontSize: 13, fontWeight: 600, textAlign: 'center',
            }}>
              📡 Offline – {offlineBuffered} GPS-punkter buffrade lokalt
            </div>
          )}

          {/* Live map */}
          <div style={{ width: '100%' }}>
            <LiveTrackMap
              points={points.map(p => ({ lat: p.lat, lng: p.lng }))}
              currentPos={currentPos}
              speed={currentSpeed}
              bearing={bearing}
              heading={points.length > 0 ? (points[points.length - 1].heading) : null}
              stops={stops.filter(s => s.type === 'stop').map(s => ({
                lat: s.lat, lng: s.lng, type: s.type,
                durationSeconds: s.durationSeconds,
              }))}
            />
          </div>

          {/* Movement state + bearing row */}
          <div style={{ width: '100%', display: 'flex', gap: 8, alignItems: 'center' }}>
            <div style={{
              flex: 1, display: 'flex', alignItems: 'center', gap: 6,
              background: mv.bg, borderRadius: 12, padding: '9px 14px',
            }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: mv.color }}>{mv.label}</span>
              {phase === 'tracking' && currentSpeed > 0.3 && (
                <span style={{ fontSize: 12, color: mv.color, opacity: .7, marginLeft: 'auto', fontWeight: 600 }}>
                  {currentSpeed.toFixed(1)} kn
                </span>
              )}
            </div>
            {bearing !== null && currentSpeed > 0.5 && (
              <div style={{
                background: 'rgba(10,123,140,.08)', borderRadius: 12,
                padding: '9px 14px', flexShrink: 0,
              }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: '#1e5c82' }}>
                  ↑ {bearingLabel(bearing)} {Math.round(bearing)}°
                </span>
              </div>
            )}
          </div>

          {/* Flash insight */}
          {flashInsight && (
            <div style={{
              width: '100%', background: 'rgba(30,92,130,.08)',
              border: '1px solid rgba(30,92,130,.15)',
              borderRadius: 14, padding: '10px 16px',
              display: 'flex', alignItems: 'center', gap: 10,
              animation: 'fadeIn .3s ease',
            }}>
              <span style={{ fontSize: 22 }}>{flashInsight.emoji}</span>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1e5c82' }}>{flashInsight.text}</span>
            </div>
          )}

          {/* Status pill */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '8px 18px', borderRadius: 20,
            background: phase === 'tracking' ? 'rgba(15,158,100,.1)' : 'rgba(201,110,42,.1)',
            color:      phase === 'tracking' ? '#0f9e64' : '#c96e2a',
          }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%',
              background: phase === 'tracking' ? '#0f9e64' : '#c96e2a',
              animation: phase === 'tracking' ? 'pulse-status 1.5s ease-in-out infinite' : 'none',
            }} />
            <span style={{ fontSize: 13, fontWeight: 700 }}>
              {phase === 'tracking' ? 'Spårar' : 'Pausad'}
            </span>
          </div>

          {/* Big timer */}
          <div className="text-center">
            <div className="text-6xl font-black text-sea tabular-nums">{formatDuration(elapsed)}</div>
            <div className="text-xs text-svalla-text3 mt-1 uppercase tracking-widest">Tid</div>
          </div>

          {/* Stats grid */}
          <div className="w-full grid grid-cols-2 gap-3">
            <StatBox val={dist.toFixed(2)}      unit="NM"  label="Distans"     />
            <StatBox val={currentSpeed.toFixed(1)} unit="kn" label="Nu"         />
            <StatBox val={avgSpd.toFixed(1)}    unit="kn"  label="Snitt"       />
            <StatBox val={maxSpd.toFixed(1)}    unit="kn"  label="Toppfart"    />
          </div>

          {/* Paused banner */}
          {phase === 'paused' && (
            <div className="w-full bg-acc-light rounded-2xl p-4 text-center border-2 border-acc/20">
              <div className="text-2xl mb-1">⏸</div>
              <div className="font-black text-acc text-base">Spårning pausad</div>
              <div className="text-sm text-svalla-text2 mt-1">GPS-punkter sparas inte under paus</div>
            </div>
          )}

          {/* GPS error */}
          {gpsError && (
            <p className="text-sm text-center rounded-xl px-4 py-2 w-full" style={{
              color:      gpsError.startsWith('Söker') ? '#1e5c82' : '#dc2626',
              background: gpsError.startsWith('Söker') ? 'rgba(30,92,130,.08)' : '#fef2f2',
            }}>
              {gpsError.startsWith('Söker') ? '📡 ' : '⚠️ '}{gpsError}
            </p>
          )}

          {/* Anomaly indicator */}
          {anomalyCount > 0 && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'rgba(122,157,171,.1)', borderRadius: 12,
              padding: '5px 12px', fontSize: 11, color: '#5a8090', fontWeight: 600,
            }}>
              <span>🔍</span>
              <span>{anomalyCount} GPS-anomali{anomalyCount === 1 ? '' : 'er'} exkluderade</span>
            </div>
          )}

          <p className="text-xs text-svalla-text3">{points.length} GPS-punkter · {stops.filter(s => s.type === 'stop').length} stopp</p>
        </div>

        {/* ── Sticky controls bar ── */}
        <div className="sticky bottom-0 z-10 px-5 pt-3 flex flex-col gap-3" style={{
          background:      'rgba(235,243,248,.97)',
          backdropFilter:  'blur(12px)',
          borderTop:       '1px solid rgba(30,92,130,.1)',
          paddingBottom:   'calc(env(safe-area-inset-bottom,0px) + var(--nav-h,64px) + 12px)',
        }}>
          {phase === 'tracking' ? (
            <button onClick={handlePause}
              className="w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3"
              style={{ background: 'rgba(201,110,42,.12)', color: '#c96e2a', border: '2px solid rgba(201,110,42,.3)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <rect x="5" y="4" width="4" height="16" rx="1"/><rect x="15" y="4" width="4" height="16" rx="1"/>
              </svg>
              Pausa
            </button>
          ) : (
            <button onClick={handleResume}
              className="w-full py-5 rounded-2xl font-black text-xl flex items-center justify-center gap-3 text-white"
              style={{ background: 'linear-gradient(135deg,#0f9e64,#0d8554)', boxShadow: '0 4px 20px rgba(15,158,100,.4)' }}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6"><path d="M8 5v14l11-7z"/></svg>
              Fortsätt
            </button>
          )}
          <button onClick={handleStop}
            className="w-full py-4 rounded-2xl font-bold text-base text-white flex items-center justify-center gap-2"
            style={{ background: 'linear-gradient(135deg,#cc3d3d,#b02f2f)', boxShadow: '0 4px 16px rgba(204,61,61,.3)' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
              <rect x="4" y="4" width="16" height="16" rx="2"/>
            </svg>
            Avsluta tur
          </button>
        </div>

        <style>{`
          @keyframes pulse-status{0%,100%{opacity:1}50%{opacity:.4}}
          @keyframes fadeIn{from{opacity:0;transform:translateY(-4px)}to{opacity:1;transform:translateY(0)}}
        `}</style>
      </div>
    )
  }

  // ── DONE — save screen ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen">

      {/* ── Achievement celebration overlay ── */}
      {showCelebration && newAchievements.length > 0 && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,20,40,0.88)',
          backdropFilter: 'blur(12px)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          padding: '32px 24px',
          animation: 'fadeIn .3s ease',
        }} onClick={() => setShowCelebration(false)}>
          <div style={{
            background: 'linear-gradient(170deg,#1e5c82,#2d7d8a)',
            borderRadius: 28, padding: '32px 28px',
            maxWidth: 340, width: '100%', textAlign: 'center',
            boxShadow: '0 8px 40px rgba(0,45,80,.5)',
            border: '1px solid rgba(255,255,255,.15)',
          }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🏅</div>
            <div style={{ fontSize: 20, fontWeight: 900, color: '#fff', marginBottom: 6 }}>
              {newAchievements.length === 1 ? 'Nytt märke upplåst!' : `${newAchievements.length} nya märken!`}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, margin: '20px 0' }}>
              {newAchievements.map((a, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: 'rgba(255,255,255,.12)', borderRadius: 16,
                  padding: '12px 16px',
                }}>
                  <span style={{ fontSize: 26 }}>{a.emoji}</span>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#fff' }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 1 }}>Nytt märke uppnått</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowCelebration(false)}
              style={{
                padding: '12px 32px', borderRadius: 20, border: 'none',
                background: 'rgba(255,255,255,.2)', color: '#fff',
                fontSize: 14, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Fortsätt →
            </button>
          </div>
          <style>{`@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
        </div>
      )}
      <header className="sticky top-0 z-40 px-4 py-3 bg-white/96 border-b border-sea-light/40">
        <h1 className="text-lg font-bold text-sea">Tur avslutad 🎉</h1>
      </header>

      <div className="max-w-lg mx-auto px-4 py-5 flex flex-col gap-5"
        style={{ paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 24px)' }}
      >
        {/* ── Besökta öar — nyupptäckta ── */}
        {newlyVisitedIslands.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg,rgba(15,158,100,.08),rgba(15,158,100,.03))',
            border: '1.5px solid rgba(15,158,100,.25)',
            borderRadius: 20, padding: '16px 18px',
            animation: 'fadeInUp .4s ease',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <span style={{ fontSize: 22 }}>🗺️</span>
              <div>
                <div style={{ fontSize: 14, fontWeight: 900, color: '#0f9e64' }}>
                  {newlyVisitedIslands.length === 1 ? 'Ny ö besökt!' : `${newlyVisitedIslands.length} nya öar besökta!`}
                </div>
                <div style={{ fontSize: 12, color: '#3d7a5a', marginTop: 1 }}>
                  Automatiskt inloggat via din GPS-rutt
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {newlyVisitedIslands.map(slug => {
                const name = slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
                return (
                  <span key={slug} style={{
                    padding: '5px 12px', borderRadius: 20,
                    background: 'rgba(15,158,100,.12)',
                    color: '#0a7a50', fontSize: 12, fontWeight: 700,
                    border: '1px solid rgba(15,158,100,.25)',
                  }}>
                    📍 {name}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Trip summary ── */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          {/* Overall bearing if available */}
          {bearing !== null && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 12, padding: '7px 12px',
              background: 'rgba(30,92,130,.06)', borderRadius: 10,
            }}>
              <span style={{ fontSize: 12, color: '#5a8090', fontWeight: 600 }}>
                ↑ {bearingLabel(bearing)} — rutt från start till slut
              </span>
            </div>
          )}
          <div className="grid grid-cols-2 gap-4">
            <StatRow label="Distans"    val={`${dist.toFixed(2)} NM`} />
            <StatRow label="Tid"        val={formatDuration(elapsed)} />
            <StatRow label="Snittfart"  val={`${avgSpd.toFixed(1)} kn`} />
            <StatRow label="Toppfart"   val={`${maxSpd.toFixed(1)} kn`} />
            <StatRow label="Stopp"      val={`${stops.filter(s => s.type === 'stop').length} st`} />
            <StatRow label="GPS-punkter" val={`${points.length}`} />
          </div>
        </div>

        {/* ── Rating ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 10px rgba(0,45,60,.06)' }}>
          <p style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>
            Hur var turen?
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { val: 1, label: 'Okej',   emoji: '⚓' },
              { val: 2, label: 'Bra!',   emoji: '⚓⚓' },
              { val: 3, label: 'Magisk 🔥', emoji: '⚓⚓⚓' },
            ].map(({ val, label, emoji }) => (
              <button key={val} type="button" onClick={() => setPinnar(pinnar === val ? 0 : val)}
                style={{
                  flex: 1, padding: '12px 4px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: pinnar === val
                    ? (val === 3 ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)')
                    : 'rgba(10,123,140,.07)',
                  boxShadow: pinnar === val ? '0 3px 12px rgba(30,92,130,.3)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all .15s',
                }}
              >
                <span style={{ fontSize: 16 }}>{emoji}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: pinnar === val ? '#fff' : '#7a9dab' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Location ── */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '.5px', display: 'block', marginBottom: 8 }}>
            Plats (valfritt)
          </label>
          <input
            type="text" placeholder="t.ex. Sandhamn, Fjäderholmarna…"
            value={locationName} onChange={e => setLocationName(e.target.value)} maxLength={80}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              border: '1.5px solid rgba(10,123,140,.15)',
              background: '#fff', fontSize: 14, color: '#162d3a', outline: 'none', boxSizing: 'border-box',
            }}
          />
        </div>

        {/* ── Caption ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <label style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '.5px' }}>
              Berätta om turen (valfritt)
            </label>
            <button
              type="button"
              onClick={generateAiCaption}
              disabled={aiLoading}
              style={{
                display: 'flex', alignItems: 'center', gap: 5,
                padding: '5px 12px', borderRadius: 20,
                border: '1.5px solid rgba(10,123,140,.2)',
                background: aiSummary ? 'rgba(10,123,140,.08)' : '#fff',
                color: '#0a7b8c', fontSize: 12, fontWeight: 700,
                cursor: aiLoading ? 'default' : 'pointer',
                opacity: aiLoading ? 0.7 : 1,
                transition: 'all .15s',
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
                <>✨ {aiSummary ? 'Generera ny' : 'AI-caption'}</>
              )}
            </button>
          </div>
          <textarea
            placeholder="Vad hände? Vad var bäst?"
            value={caption} onChange={e => setCaption(e.target.value)} maxLength={280} rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              border: aiSummary && caption === aiSummary
                ? '1.5px solid rgba(10,123,140,.35)'
                : '1.5px solid rgba(10,123,140,.15)',
              background: '#fff', fontSize: 14, color: '#162d3a', outline: 'none',
              resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              transition: 'border-color .2s',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            {aiSummary && caption === aiSummary
              ? <span style={{ fontSize: 10, color: '#0a7b8c', fontWeight: 700 }}>✨ AI-genererad — redigera fritt</span>
              : <span />}
            <span style={{ fontSize: 10, color: '#a0bec8' }}>{caption.length}/280</span>
          </div>
        </div>

        {/* ── Photo (optional) ── */}
        <div>
          <label style={{ fontSize: 12, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '.5px', display: 'block', marginBottom: 8 }}>
            Bild <span style={{ fontWeight: 400, textTransform: 'none', opacity: .6 }}>(valfritt)</span>
          </label>
          <button type="button" onClick={() => fileRef.current?.click()}
            className="w-full h-44 rounded-2xl overflow-hidden flex items-center justify-center"
            style={{
              background: preview ? 'transparent' : 'rgba(10,123,140,.06)',
              border:     preview ? 'none' : '2px dashed rgba(10,123,140,.2)',
            }}
          >
            {preview ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={preview} alt="preview" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center text-svalla-text3">
                <div className="text-4xl mb-2">📷</div>
                <div className="text-sm font-medium">Lägg till en bild (valfritt)</div>
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
              Är du inloggad? Gå till <a href="/logga-in" className="underline">svalla.se/logga-in</a>.
            </div>
          </div>
        )}

        <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <button
          onClick={handleSave} disabled={saving}
          className="w-full py-4 rounded-2xl text-white font-black text-base"
          style={{
            background: !saving ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'rgba(10,123,140,.15)',
            color:      !saving ? 'white' : '#7a9dab',
            boxShadow:  !saving ? '0 4px 20px rgba(201,110,42,.4)' : 'none',
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

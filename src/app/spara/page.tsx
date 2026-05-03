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
import { startTracking } from '@/lib/tracker'
import { snapshotTrip, loadTripSnapshot, clearTripSnapshot, type TripSnapshot } from '@/lib/tripPersistence'
import { detectVisitedIslands } from '@/lib/islandCoords'
import { computeUnlocked, type TripForAch } from '@/lib/achievements'
import { addTripTag } from '@/lib/tripTags'
import { analytics } from '@/lib/analytics'
import CrewPicker, { type CrewUser } from '@/components/CrewPicker'
import LocationSearch from '@/components/LocationSearch'
import Icon from '@/components/Icon'

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
    case 'SEGLING':  return { label: 'SEGLING',  color: 'var(--green)', bg: 'rgba(15,158,100,.12)' }
    case 'DRIFTAR':  return { label: 'DRIFTAR',  color: 'var(--sea)', bg: 'rgba(30,92,130,.12)' }
    case 'ANKRAT':   return { label: 'ANKRAT',   color: 'var(--acc)', bg: 'rgba(201,110,42,.12)' }
    case 'STILLA':   return { label: 'STILLA',   color: 'var(--txt3)', bg: 'rgba(122,157,171,.12)' }
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
  const [mediaFiles,    setMediaFiles]    = useState<File[]>([])
  const [mediaPreviews, setMediaPreviews] = useState<string[]>([])
  const [saving,        setSaving]        = useState(false)
  const [tripId,        setTripId]        = useState<string | null>(null)
  const [err,           setErr]           = useState('')
  const [pinnar,        setPinnar]        = useState(0)
  const [caption,       setCaption]       = useState('')
  const [locationName,  setLocationName]  = useState('')
  const [isOnline,      setIsOnline]      = useState(true)
  const [offlineBuffered, setOfflineBuffered] = useState(0)
  const [currentPos,    setCurrentPos]    = useState<{ lat: number; lng: number } | null>(null)
  const [currentAccuracy, setCurrentAccuracy] = useState<number | null>(null)
  const [, setAnomalyCount]               = useState(0) // value bara via anomalyCountRef

  // ── New GPS intelligence state ──
  const [movementState,  setMovementState]  = useState<MovementState>('STILLA')
  const [bearing,        setBearing]        = useState<number | null>(null)
  const [, setLiveInsights]                 = useState<LiveInsight[]>([]) // visas via flashInsight
  const [, setShownInsightKeys] = useState<Set<string>>(new Set()) // tracking-only via setter
  const [flashInsight,   setFlashInsight]   = useState<LiveInsight | null>(null)
  const [statsExpanded,  setStatsExpanded]  = useState(false)
  const [centerTrigger,  setCenterTrigger]  = useState(0)

  // ── Recovery state ──
  const [recoverySnap, setRecoverySnap] = useState<TripSnapshot | null>(null)

  // ── Besökta öar ──
  const [newlyVisitedIslands, setNewlyVisitedIslands] = useState<string[]>([])

  // ── Achievement celebration ──
  const [newAchievements, setNewAchievements] = useState<{ emoji: string; label: string }[]>([])
  const [showCelebration, setShowCelebration] = useState(false)
  const [taggedCrew,      setTaggedCrew]      = useState<CrewUser[]>([])
  const [currentUserId,   setCurrentUserId]   = useState('')

  // ── AI analys (pre-fetched when done phase begins) ──
  const [aiSummary,       setAiSummary]       = useState<string | null>(null)
  const [aiVariants,      setAiVariants]      = useState<string[]>([])
  const [aiLoading,       setAiLoading]       = useState(false)
  const [aiErr,           setAiErr]           = useState(false)

  // ── Refs ──
  const watchRef         = useRef<(() => Promise<void>) | null>(null)
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
  const elapsedRef       = useRef(0)               // mirror for GPS callback (aldrig stale)
  const wakeLockRef      = useRef<{ released: boolean; release(): Promise<void> } | null>(null)

  // ── Auth gate — render nothing until check completes ─────────────────────
  const [authLoading, setAuthLoading] = useState(true)

  // ── Web vs native detection (för skärm-på-banner och bakgrundsstöd) ───────
  const [isNativeApp, setIsNativeApp] = useState(false)
  useEffect(() => {
    let cancelled = false
    import('@capacitor/core').then(m => {
      if (!cancelled) setIsNativeApp(m.Capacitor.isNativePlatform())
    }).catch(() => { /* ej native */ })
    return () => { cancelled = true }
  }, [])

  // Banner: dölj-knapp persisteras i localStorage så vi inte tjatar
  const [showWebBanner, setShowWebBanner] = useState(false)
  useEffect(() => {
    if (isNativeApp) { setShowWebBanner(false); return }
    try {
      const dismissed = localStorage.getItem('svalla_web_screen_banner_dismissed')
      setShowWebBanner(!dismissed)
    } catch {
      setShowWebBanner(true)
    }
  }, [isNativeApp])
  function dismissWebBanner() {
    try { localStorage.setItem('svalla_web_screen_banner_dismissed', '1') } catch {}
    setShowWebBanner(false)
  }

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/logga-in?redirect=/spara'); return }
      setCurrentUserId(data.user.id)
      setAuthLoading(false)
    })
  }, [supabase, router])

  // ── Wake Lock — håller skärmen vaken under aktiv spårning ─────────────────
  const acquireWakeLock = useCallback(async () => {
    if (typeof navigator === 'undefined' || !('wakeLock' in navigator)) return
    if (wakeLockRef.current && !wakeLockRef.current.released) return
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sentinel = await (navigator as any).wakeLock.request('screen')
      wakeLockRef.current = sentinel
    } catch { /* tillstånd nekades eller API ej tillgängligt */ }
  }, [])

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current && !wakeLockRef.current.released) {
      wakeLockRef.current.release().catch(() => {})
    }
    wakeLockRef.current = null
  }, [])

  // Re-acquire wake lock if OS releases it (screen dim, tab switch back)
  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === 'visible' && phase === 'tracking') {
        void acquireWakeLock()
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)
    return () => document.removeEventListener('visibilitychange', handleVisibility)
  }, [phase, acquireWakeLock])

  useEffect(() => { pointsRef.current = points }, [points])
  useEffect(() => { elapsedRef.current = elapsed }, [elapsed])

  // ── Check for crash recovery on mount ─────────────────────────────────────
  useEffect(() => {
    const snap = loadTripSnapshot()
    if (snap) setRecoverySnap(snap)
  }, [])

  // ── Navigation guard — varna vid försök att lämna sidan under aktiv spårning ──
  // beforeunload fångar: sidbyte, tab-stängning, reload
  // popstate fångar: telefonens tillbaka-knapp (History API)
  useEffect(() => {
    if (phase !== 'tracking' && phase !== 'paused') return

    function handleBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault()
      // Chrome kräver returnValue för att visa dialog
      e.returnValue = 'Du har en pågående tur. Lämna sidan och förlora GPS-data?'
      return e.returnValue
    }

    function handlePopState(e: PopStateEvent) {
      // Lägg tillbaka historik-staten och visa native confirm
      window.history.pushState(e.state, '')
      const leave = window.confirm(
        'Du har en pågående tur. Lämna sidan och förlora GPS-data?'
      )
      if (leave) {
        // Användaren bekräftade — navigera bakåt manuellt
        window.history.back()
      }
    }

    // Lägg till ett "dummy"-state så popstate triggas vid tillbaka-knapp
    window.history.pushState({ sparaGuard: true }, '')
    window.addEventListener('beforeunload', handleBeforeUnload)
    window.addEventListener('popstate', handlePopState)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
      window.removeEventListener('popstate', handlePopState)
    }
  }, [phase])

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
      if (watchRef.current) { watchRef.current().catch(() => {}); watchRef.current = null }
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
  // startTracking auto-detects Capacitor (native background GPS) vs web browser.
  // On iOS native the phone can lock the screen and GPS keeps running — Strava-level.
  const startGPS = useCallback(() => {
    setGpsError('')
    startTracking(
      (point) => {
        setGpsError('')
        setCurrentAccuracy(point.accuracy)
        if (point.accuracy > 80) return

        const now = point.timestamp

        // Anomaly detection
        if (lastGpsPtRef.current) {
          if (isGpsAnomaly(
            lastGpsPtRef.current.lat, lastGpsPtRef.current.lng, lastGpsPtRef.current.ts,
            point.lat, point.lng, now
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
            const lat2 = point.lat * Math.PI / 180
            const dLat = (point.lat - lastGpsPtRef.current.lat) * Math.PI / 180
            const dLng = (point.lng - lastGpsPtRef.current.lng) * Math.PI / 180
            const a = Math.sin(dLat/2)**2 + Math.cos(lat1)*Math.cos(lat2)*Math.sin(dLng/2)**2
            speedKnots = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)) / dtHours
          }
        } else if (point.speed != null && point.speed >= 0) {
          // First point — no delta yet, use device-reported speed (m/s → knots)
          speedKnots = msToKnots(point.speed)
        }

        // Kalman smoothing
        if (!kalmanRef.current) kalmanRef.current = new GpsKalmanFilter()
        const smoothed = kalmanRef.current.update(point.lat, point.lng)

        setCurrentPos({ lat: smoothed.lat, lng: smoothed.lng })

        // Bearing — only update when meaningfully moving
        if (lastGpsPtRef.current && speedKnots > 0.5) {
          setBearing(calculateBearing(
            lastGpsPtRef.current.lat, lastGpsPtRef.current.lng,
            smoothed.lat, smoothed.lng
          ))
        }

        lastGpsPtRef.current = { lat: smoothed.lat, lng: smoothed.lng, ts: now }

        // Hastighets-rensning — GPS Doppler ger ofta skräp i kall start och tätort.
        // 1) Cap absolut tak till 30 knop (max realistiskt för segelbåt/snabb motorbåt;
        //    avgångar därifrån är troligen anomalier).
        // 2) Om accuracy är dåligt (>30m) — strunta i hastigheten, GPS är opålitlig.
        // 3) Median av senaste 3 punkter — eliminerar enstaka spikar utan att
        //    fördröja äkta accelerationer.
        let cleanSpeed = Math.min(Math.max(speedKnots, 0), 30)
        if (point.accuracy > 30) {
          cleanSpeed = 0  // dålig GPS = ingen hastighet visas, hellre tomt än fel
        } else {
          const recentSpeeds = [...pointsRef.current.slice(-2).map(p => p.speedKnots), cleanSpeed]
          if (recentSpeeds.length >= 3) {
            const sorted = [...recentSpeeds].sort((a, b) => a - b)
            cleanSpeed = sorted[Math.floor(sorted.length / 2)]!
          }
        }
        setCurrentSpeed(cleanSpeed)

        const pt: GpsPoint = {
          lat:        smoothed.lat,
          lng:        smoothed.lng,
          speedKnots: cleanSpeed,
          heading:    point.heading,
          accuracy:   point.accuracy,
          recordedAt: new Date().toISOString(),
        }

        setPoints(prev => {
          const next = [...prev, pt]
          setStops(detectStops(next))

          // Movement state (every 5 points to avoid thrashing)
          if (next.length % 5 === 0) {
            setMovementState(computeMovementState(next))
          }

          // Live insights — elapsedRef.current är alltid aktuellt (undviker stale closure)
          if (next.length % 30 === 0) {
            setStops(prevStops => {
              const newInsights = getLiveInsights(next, elapsedRef.current, prevStops)
              newInsights.forEach(ins => {
                setShownInsightKeys(prev => {
                  if (!prev.has(ins.key)) {
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
          speedKnots: cleanSpeed,
          heading:    point.heading,
          accuracy:   point.accuracy,
          recordedAt: new Date().toISOString(),
        })
          .then(() => getPendingCount().then(setOfflineBuffered))
          .catch(() => {})
      },
      (errMsg) => {
        const m = errMsg.toLowerCase()
        if (m.includes('nekad') || m.includes('denied') || m.includes('permission')) {
          setGpsError('GPS-åtkomst nekad – tillåt platsdelning i inställningarna.')
        } else if (m.includes('timeout') || m.includes('söker')) {
          setGpsError('Söker GPS-signal… Gå ut om du är inomhus.')
        } else if (m.includes('unavailable') || m.includes('ej tillgänglig')) {
          setGpsError('GPS-signal ej tillgänglig.')
        } else {
          setGpsError(errMsg || 'GPS-fel – prova att ladda om sidan.')
        }
      },
    ).then(stopFn => {
      watchRef.current = stopFn
    }).catch(() => {
      setGpsError('GPS ej tillgängligt på denna enhet.')
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) // elapsedRef används istället för elapsed — behöver inte vara dep

  const stopGPS = useCallback(() => {
    if (watchRef.current) {
      watchRef.current().catch(() => {})
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
    analytics.tripStarted({ method: 'gps' })
    startGPS()
    void acquireWakeLock()
    // Initial snapshot
    snapshotTrip({ boatType: boat, phase: 'tracking', startedAt: new Date().toISOString(), elapsed: 0, tripId: null })
  }

  async function handleRecoverTrip() {
    if (!recoverySnap) return
    const snap = recoverySnap
    setRecoverySnap(null)

    // Återställ GPS-punkter från IndexedDB offline-buffer.
    // Under aktiv tracking saknas tripId → punkter synkas aldrig till Supabase
    // → de lever kvar i bufferten efter en krasch. Ladda tillbaka dem hit.
    try {
      const pending = await getPendingPoints()
      if (pending.length > 0) {
        const restored: GpsPoint[] = pending.map(p => p.point)
        setPoints(restored)
        pointsRef.current = restored
        setStops(detectStops(restored))
        const last = restored[restored.length - 1]
        if (last) setCurrentPos({ lat: last.lat, lng: last.lng })
      }
    } catch { /* tyst */ }

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
    void acquireWakeLock()
  }

  function handleDiscardRecovery() {
    clearTripSnapshot()
    setRecoverySnap(null)
  }

  function handlePause() {
    haptic([100, 50, 100])
    pauseStartRef.current = new Date()
    stopGPS()
    releaseWakeLock()
    kalmanRef.current?.reset()
    setPhase('paused')
    if (points.length > 0) {
      const last = points[points.length - 1]!
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
          ...updated[updated.length - 1]!,
          endedAt: new Date().toISOString(),
          durationSeconds: dur,
        }
        return updated
      })
    }
    kalmanRef.current?.reset()
    setPhase('tracking')
    startGPS()
    void acquireWakeLock()
  }

  function handleStop() {
    haptic([50, 50, 100, 50, 200])
    stopGPS()
    releaseWakeLock()
    kalmanRef.current?.reset()
    clearTripSnapshot()
    setPhase('done')
  }

  // ── AI caption generator ───────────────────────────────────────────────────
  async function generateAiCaption() {
    if (aiLoading) return
    setAiLoading(true)
    setAiErr(false)
    setAiVariants([])
    analytics.aiAnalysisRequested({ source: 'spara' })
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
          startTime: startTimeRef.current?.toISOString(),
        }),
      })
      const { summary, summaries } = await res.json()
      if (summaries && summaries.length > 1) {
        // Thorkel returnerade tre varianter — visa picker, fyll inte auto
        setAiVariants(summaries)
      } else if (summary) {
        // Fallback: en enda variant — fyll direkt som tidigare
        setCaption(summary)
        setAiSummary(summary)
      } else {
        setAiErr(true)
      }
    } catch { setAiErr(true) }
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
    // Nollställ hastigheterna om rutten saknar mätbar förflyttning —
    // GPS Doppler kan rapportera hög hastighet utan att koordinaterna ändras (brus).
    const avgSpd  = dist >= 0.01 ? avgSpeedKnots(points) : 0
    const maxSpd  = dist >= 0.01 ? maxSpeedKnots(points) : 0
    const startedAt = startTimeRef.current?.toISOString() ?? new Date().toISOString()
    const endedAt   = new Date().toISOString()

    // Upload media files (images only — video/quicktime stöds ej i Storage)
    const uploadedUrls: string[] = []
    for (let i = 0; i < mediaFiles.length; i++) {
      const f   = mediaFiles[i]!
      const ext = f.name.split('.').pop() ?? 'jpg'
      const filename = `${user.id}-${Date.now()}-${i}.${ext}`
      const { data: upload, error: upErr } = await supabase.storage
        .from('trips').upload(filename, f, { upsert: false })
      if (upErr || !upload) {
        // Översätt Supabase-felmeddelanden till hjälpsam svenska — inte rå mime-text
        const raw = upErr?.message ?? 'okänt fel'
        let friendly = `Kunde inte ladda upp bild ${i + 1}.`
        if (/mime type|not supported/i.test(raw)) {
          friendly = `Bild ${i + 1} har ett format som inte stöds. Spara om som JPG eller PNG och försök igen.`
        } else if (/payload too large|exceeds the maximum/i.test(raw)) {
          friendly = `Bild ${i + 1} är för stor — max 10 MB. Komprimera och försök igen.`
        } else if (/jwt|unauthor|policy/i.test(raw)) {
          friendly = `Sessionen verkar ha gått ut. Ladda om sidan och försök igen.`
        }
        setErr(friendly)
        setSaving(false); return
      }
      const { data: { publicUrl } } = supabase.storage.from('trips').getPublicUrl(upload.path)
      uploadedUrls.push(publicUrl)
    }
    const imageUrl   = uploadedUrls[0] ?? ''
    const extraUrls  = uploadedUrls.slice(1)

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
      images:               extraUrls.length ? extraUrls : null,
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

    // Rensa offline-bufferten — GPS-punkterna sparas via in-memory points nedan,
    // inte via bufferten, så bufferten är redundant efter att trippen är sparad.
    getPendingPoints().then(pending => {
      if (pending.length > 0) clearPoints(pending.map(p => p.key)).then(() => setOfflineBuffered(0))
    }).catch(() => {})

    // Insert tagged crew
    if (taggedCrew.length > 0) {
      await Promise.all(taggedCrew.map(u => addTripTag(supabase, user.id, tid, u.id)))
    }

    // Batch insert GPS points (500 at a time) med error-check och retry
    for (let i = 0; i < points.length; i += 500) {
      const batch = points.slice(i, i + 500).map(p => ({
        trip_id:     tid,
        latitude:    p.lat,
        longitude:   p.lng,
        speed_knots: parseFloat(p.speedKnots.toFixed(2)),
        heading:     p.heading,
        accuracy:    p.accuracy,
        recorded_at: p.recordedAt,
      }))
      let batchErr = null
      for (let attempt = 0; attempt < 3; attempt++) {
        const { error } = await supabase.from('gps_points').insert(batch)
        if (!error) { batchErr = null; break }
        batchErr = error
        if (attempt < 2) await new Promise(r => setTimeout(r, 1000 * (attempt + 1)))
      }
      if (batchErr) {
        // Logga till konsolen — Sentry fångar upp detta i produktionsmiljön
        console.error('[spara] gps_points batch insert failed after retries', {
          batchIndex: i / 500,
          error: batchErr.message,
        })
      }
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

    // Check achievements synchronously — måste vara klar innan vi navigerar
    // så att celebration-overlayн hinner visas om märken låses upp.
    let achievementUnlocked = false
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
        achievementUnlocked = true
        // Persistera achievement-events för feed + notiser
        try {
          const rows = justUnlocked.map(a => ({ user_id: user.id, achievement_key: a.id }))
          await supabase.from('achievement_events').insert(rows)
        } catch { /* dup-key tyst */ }
      }
    } catch { /* tyst */ }

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
    analytics.tripSaved({
      has_ai_analysis: !!aiSummary,
      has_photos: mediaFiles.length > 0,
      duration_seconds: elapsed,
    })
    fetch('/api/revalidate-feed', { method: 'POST' }).catch(() => {})
    // Navigera direkt om inga achievements — annars hanteras navigation
    // av "Fortsätt →"-knappen i celebration-overlayn.
    if (!achievementUnlocked) {
      router.push(`/tur/${tid}`)
    }
  }

  const dist   = totalDistanceNM(points)
  const avgSpd = avgSpeedKnots(points)
  const maxSpd = maxSpeedKnots(points)

  // ── Block render until auth resolved ─────────────────────────────────────
  if (authLoading) return null

  // ── SETUP ──────────────────────────────────────────────────────────────────
  if (phase === 'setup') {
    return (
      <div className="min-h-screen">
        <header className="sticky top-0 z-40 flex items-center gap-3 px-4 py-3 bg-white/96 border-b border-sea-light/40">
          <button onClick={() => router.back()} className="w-9 h-9 rounded-full flex items-center justify-center bg-sea-xl">
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} className="w-5 h-5">
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
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--acc)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20, flexShrink: 0 }}>
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                  <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--acc)' }}>Avbruten tur hittad</div>
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
                    background: 'var(--acc)', color: '#fff', fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  }}
                >
                  Fortsätt turen
                </button>
                <button
                  onClick={handleDiscardRecovery}
                  style={{
                    padding: '10px 14px', borderRadius: 12,
                    border: '1px solid rgba(201,110,42,.3)',
                    background: 'transparent', color: 'var(--acc)',
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

          <div role="group" aria-labelledby="spara-boat-type-label">
            <span id="spara-boat-type-label" className="text-xs font-semibold text-svalla-text2 uppercase tracking-wide mb-2 block">
              Välj båttyp <span className="text-red-500">*</span>
            </span>
            <div className="grid grid-cols-4 gap-2">
              {BOAT_TYPES.map(bt => (
                <button
                  key={bt} type="button" onClick={() => setBoatType(bt)}
                  className="py-2 px-1 rounded-xl text-xs font-medium transition-all"
                  style={{
                    background: boatType === bt ? 'var(--sea)' : 'rgba(10,123,140,0.07)',
                    color: boatType === bt ? '#fff' : 'var(--txt2)',
                  }}
                >
                  {bt}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button" disabled={!boatType} onClick={() => handleStart()}
            className="w-full py-5 rounded-2xl text-white font-bold text-lg transition-all"
            style={{
              background: boatType ? 'linear-gradient(135deg,#0f9e64,#0d8554)' : 'rgba(10,123,140,0.15)',
              color: boatType ? 'white' : 'var(--txt3)',
              boxShadow:  boatType ? '0 4px 20px rgba(15,158,100,0.4)' : 'none',
            }}
          >
            Starta spårning
          </button>
        </div>
      </div>
    )
  }

  // ── TRACKING / PAUSED — Strava-inspirerad immersiv vy ────────────────────
  if (phase === 'tracking' || phase === 'paused') {
    const mv = movementMeta(movementState)
    const isTracking = phase === 'tracking'

    // ── EXPANDED STATS VIEW — overlay above map (LiveTrackMap stays mounted) ──
    // Rendered as overlay with zIndex 1001 so LiveTrackMap is never unmounted;
    // prevents Leaflet re-init (and the white-square bug) on every stats toggle.
    const statsOverlay = statsExpanded ? (
      <div style={{ position: 'fixed', inset: 0, zIndex: 1001, background: '#000', color: '#fff', display: 'flex', flexDirection: 'column' }}>

          {/* Collapse button — top right */}
          <button
            onClick={() => setStatsExpanded(false)}
            aria-label="Visa karta"
            style={{
              position: 'absolute',
              top: 'calc(env(safe-area-inset-top,0px) + 14px)',
              right: 16, zIndex: 20,
              width: 38, height: 38, borderRadius: 10,
              background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.15)',
              color: 'rgba(255,255,255,0.75)', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            {/* Collapse arrows */}
            <svg viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" style={{ width: 16, height: 16 }}>
              <path d="M15 8l-5 5-5-5M8 15l5-5 5 5" transform="rotate(45 11 11)"/>
              <path d="M3 15h4v4M15 3h4v4M3 9V5h4M15 19v-4h4"/>
            </svg>
          </button>

          {/* Giant timer — very top, dominant */}
          <div style={{
            paddingTop: 'calc(env(safe-area-inset-top,0px) + 48px)',
            textAlign: 'center',
          }}>
            <div style={{
              fontSize: 72, fontWeight: 700, color: '#ffffff',
              fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-3px',
            }}>
              {formatDuration(elapsed)}
            </div>
          </div>

          {/* Middle section — scrollable metrics */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 28px 0', gap: 0 }}>

            {/* Speed display — Garmin-style pace symbol */}
            <div style={{ textAlign: 'center', marginTop: 20 }}>
              <div style={{
                fontSize: 13, color: 'rgba(255,255,255,.35)', letterSpacing: '3px',
                textTransform: 'uppercase', fontWeight: 700, marginBottom: 6,
              }}>
                HASTIGHET
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
                <span style={{
                  fontSize: 64, fontWeight: 700, color: currentSpeed < 0.5 ? 'rgba(255,255,255,.3)' : '#fff',
                  fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-2px',
                }}>
                  {currentSpeed.toFixed(1)}
                </span>
                <span style={{ fontSize: 18, color: 'rgba(255,255,255,.4)', fontWeight: 600 }}>kn</span>
              </div>
            </div>

            {/* Big distance */}
            <div style={{ textAlign: 'center', marginTop: 24 }}>
              <div style={{
                fontSize: 13, color: 'rgba(255,255,255,.35)', letterSpacing: '3px',
                textTransform: 'uppercase', fontWeight: 700, marginBottom: 6,
              }}>
                DISTANS
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 6 }}>
                <span style={{
                  fontSize: 64, fontWeight: 700, color: dist < 0.01 ? 'rgba(255,255,255,.3)' : '#fff',
                  fontVariantNumeric: 'tabular-nums', lineHeight: 1, letterSpacing: '-2px',
                }}>
                  {dist.toFixed(2)}
                </span>
                <span style={{ fontSize: 18, color: 'rgba(255,255,255,.4)', fontWeight: 600 }}>nm</span>
              </div>
            </div>

            {/* 3-stat mini row: snitt · max · stopp */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 10, width: '100%', marginTop: 28 }}>
              {[
                { val: avgSpd.toFixed(1), unit: 'kn', label: 'Snitt' },
                { val: maxSpd.toFixed(1), unit: 'kn', label: 'Max' },
                { val: String(stops.filter(s => s.durationSeconds > 60).length), unit: 'st', label: 'Stopp' },
              ].map(({ val, unit, label }) => (
                <div key={label} style={{
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.08)',
                  borderRadius: 14, padding: '14px 8px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 26, fontWeight: 700, color: '#fff', lineHeight: 1, letterSpacing: '-0.5px', fontVariantNumeric: 'tabular-nums' }}>
                    {val}
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,.3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 700 }}>
                    {unit}
                  </div>
                  <div style={{ fontSize: 9, color: 'rgba(255,255,255,.25)', textTransform: 'uppercase', letterSpacing: '.3px', fontWeight: 600, marginTop: 2 }}>
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Flash insight */}
            {flashInsight && (
              <div style={{
                marginTop: 16, width: '100%',
                background: 'rgba(30,92,130,.2)', border: '1px solid rgba(74,184,212,.2)',
                borderRadius: 14, padding: '10px 16px',
                display: 'flex', alignItems: 'center', gap: 10,
                animation: 'strv-fade .3s ease',
              }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 22, height: 22, color: 'rgba(255,255,255,.92)' }}>
                  <Icon name={flashInsight.iconKey} size={20} stroke={2} />
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,.8)' }}>{flashInsight.text}</span>
              </div>
            )}
          </div>

          {/* Bottom controls */}
          <div style={{
            padding: '12px 16px',
            paddingBottom: 'calc(env(safe-area-inset-bottom,0px) + 12px)',
          }}>
            {isTracking ? (
              <button onClick={handlePause} style={{
                width: '100%', padding: '19px', borderRadius: 16,
                background: 'var(--grad-acc)',
                border: 'none', color: '#fff',
                fontWeight: 700, fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 4px 24px rgba(201,110,42,.45)',
              }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                  <rect x="5" y="4" width="4" height="16" rx="1.5"/><rect x="15" y="4" width="4" height="16" rx="1.5"/>
                </svg>
                Pausa
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={handleResume} style={{
                  flex: 2, padding: '19px', borderRadius: 16, border: 'none',
                  background: 'linear-gradient(135deg, #0f9e64, #0d8554)', color: '#fff',
                  fontWeight: 700, fontSize: 18, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 4px 20px rgba(15,158,100,.4)',
                }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Fortsätt
                </button>
                <button onClick={handleStop} style={{
                  flex: 1, padding: '19px', borderRadius: 16,
                  background: 'rgba(204,61,61,.18)', border: '1.5px solid rgba(204,61,61,.4)',
                  color: '#f87171', fontWeight: 700, fontSize: 16, cursor: 'pointer',
                }}>
                  Avsluta
                </button>
              </div>
            )}
          </div>

          <style>{`
            @keyframes strv-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
            @keyframes strv-fade  { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
          `}</style>
        </div>
    ) : null

    // ── MAP VIEW — always mounted so LiveTrackMap never re-inits ───────────
    return (
      <>
      <div style={{ position: 'fixed', inset: 0, zIndex: 1000, overflow: 'hidden', background: '#000' }}>

        {/* Full-screen map — isolation:isolate creates a stacking context that bounds Leaflet's z-indexes */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0, isolation: 'isolate' }}>
          <LiveTrackMap
            points={points.map(p => ({ lat: p.lat, lng: p.lng }))}
            currentPos={currentPos}
            speed={currentSpeed}
            bearing={bearing}
            accuracy={currentAccuracy}
            heading={points.length > 0 ? points[points.length - 1]!.heading : null}
            stops={stops.filter(s => s.type === 'stop').map(s => ({
              lat: s.lat, lng: s.lng, type: s.type,
              durationSeconds: s.durationSeconds,
            }))}
            centerTrigger={centerTrigger}
          />
        </div>

        {/* Movement / offline / paused badge — top left */}
        <div style={{ position: 'absolute', top: 'calc(env(safe-area-inset-top,0px) + 14px)', left: 14, zIndex: 20,
          display: 'flex', alignItems: 'center', gap: 6 }}>
          {!isTracking ? (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 7,
              background: 'rgba(201,110,42,.95)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 20, padding: '6px 14px',
              border: '1px solid rgba(255,255,255,.18)',
              boxShadow: '0 2px 10px rgba(201,110,42,.4)',
            }}>
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 11, height: 11, color: '#fff' }}>
                <rect x="6" y="4" width="4" height="16" rx="1.2"/>
                <rect x="14" y="4" width="4" height="16" rx="1.2"/>
              </svg>
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', letterSpacing: '.4px' }}>PAUSAD</span>
            </div>
          ) : (
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: 'rgba(8,18,30,.75)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
              borderRadius: 20, padding: '6px 14px',
              border: `1px solid ${mv.color}55`,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: mv.color, flexShrink: 0 }} />
              <span style={{ fontSize: 11, fontWeight: 600, color: mv.color, letterSpacing: '.3px' }}>{mv.label}</span>
              {currentSpeed > 0.3 && (
                <span style={{ fontSize: 11, color: mv.color, opacity: .7, fontWeight: 600 }}>
                  · {currentSpeed.toFixed(1)} kn
                </span>
              )}
            </div>
          )}
          {(!isOnline || offlineBuffered > 0) && (
            <div
              title={!isOnline
                ? `${offlineBuffered} GPS-punkter buffrade — synkar när nätverket är tillbaka`
                : `Synkar ${offlineBuffered} buffrade punkter…`}
              style={{
                background: !isOnline ? 'rgba(201,110,42,.92)' : 'rgba(30,92,130,.92)',
                backdropFilter: 'blur(8px)',
                borderRadius: 16, padding: '5px 11px 5px 9px',
                fontSize: 11, fontWeight: 700, color: '#fff',
                display: 'inline-flex', alignItems: 'center', gap: 6,
                boxShadow: '0 2px 8px rgba(0,0,0,.18)',
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 12, height: 12 }}>
                {!isOnline ? (
                  <>
                    <path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"/>
                    <line x1="2" y1="2" x2="22" y2="22"/>
                  </>
                ) : (
                  <>
                    <path d="M21 12a9 9 0 1 1-6.22-8.56"/>
                  </>
                )}
              </svg>
              {!isOnline ? `Offline · ${offlineBuffered} pkt buffrade` : `Synkar ${offlineBuffered}…`}
            </div>
          )}
        </div>

        {/* ── GPS center button — top right, always visible above sheet ── */}
        <button
          onClick={() => setCenterTrigger(n => n + 1)}
          disabled={!currentPos}
          aria-label="Centrera på min position"
          title="Centrera"
          style={{
            position: 'absolute',
            top: 'calc(env(safe-area-inset-top, 0px) + 14px)',
            right: 16,
            zIndex: 21,
            width: 44, height: 44, borderRadius: 22,
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(0,0,0,0.08)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.22)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: currentPos ? 'pointer' : 'not-allowed',
            opacity: currentPos ? 1 : 0.5,
            transition: 'opacity .2s, transform .15s',
            padding: 0,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 20, height: 20 }}>
            <circle cx="12" cy="12" r="3" fill="var(--sea)" stroke="none"/>
            <path d="M12 2v3M12 19v3M2 12h3M19 12h3"/>
            <circle cx="12" cy="12" r="7"/>
          </svg>
        </button>

        {/* ── Bottom sheet — floating over map ── */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 20,
          background: 'rgba(10,20,35,0.96)',
          backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
          borderRadius: '20px 20px 0 0',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingBottom: 'calc(env(safe-area-inset-bottom,0px) + 10px)',
        }}>
          {/* Drag handle */}
          <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(255,255,255,0.15)', margin: '10px auto 0' }} />

          {/* Title row: activity name + expand button */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px 0' }}>
            <span style={{ fontSize: 16, fontWeight: 600, color: '#fff', letterSpacing: '-.2px' }}>
              {boatType || 'Båttur'}
            </span>
            <button
              onClick={() => setStatsExpanded(true)}
              aria-label="Visa fullständig statistik"
              title="Expandera statistik"
              style={{
                width: 36, height: 36, borderRadius: 10,
                background: 'rgba(255,255,255,0.10)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: 'rgba(255,255,255,0.9)', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                WebkitTapHighlightColor: 'transparent',
                transition: 'background .15s, border-color .15s, transform .12s',
                padding: 0,
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.18)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.10)' }}
            >
              {/* Expand — fyra hörn-brackets */}
              <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 17, height: 17 }}>
                <path d="M3 8V3h5"/>
                <path d="M17 8V3h-5"/>
                <path d="M3 12v5h5"/>
                <path d="M17 12v5h-5"/>
              </svg>
            </button>
          </div>

          {/* 3-col stats */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 20px 14px', gap: 0 }}>
            {[
              { val: formatDuration(elapsed), label: 'Tid', align: 'left' as const },
              { val: currentSpeed.toFixed(1), unit: 'kn', label: 'Hastighet', align: 'center' as const },
              { val: dist.toFixed(2), unit: 'nm', label: 'Distans', align: 'right' as const },
            ].map(({ val, unit, label, align }) => (
              <div key={label} style={{ textAlign: align }}>
                <div style={{
                  fontSize: 28, fontWeight: 700, color: '#fff', lineHeight: 1,
                  letterSpacing: '-1px', fontVariantNumeric: 'tabular-nums',
                }}>
                  {val}
                  {unit && <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(255,255,255,.45)', marginLeft: 2 }}>{unit}</span>}
                </div>
                <div style={{ fontSize: 10, color: 'rgba(255,255,255,.38)', textTransform: 'uppercase', letterSpacing: '.5px', fontWeight: 700, marginTop: 4 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>

          {/* Web-banner: skärm måste vara på (visas bara i webbläsare, ej native, kan dismissas) */}
          {showWebBanner && !isNativeApp && (
            <div style={{
              margin: '0 20px 10px', padding: '10px 14px', borderRadius: 12,
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.18)',
              color: 'rgba(255,255,255,0.92)',
              fontSize: 12, fontWeight: 500,
              lineHeight: 1.5,
              display: 'flex', alignItems: 'flex-start', gap: 10,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16, flexShrink: 0, marginTop: 1 }}>
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              <div style={{ flex: 1 }}>
                <strong>Lås inte skärmen.</strong> Webb-version pausar GPS när telefonen sover. Lägg Svalla på hemskärmen för bästa stöd.
              </div>
              <button
                onClick={dismissWebBanner}
                aria-label="Dölj"
                style={{
                  width: 22, height: 22, padding: 0, flexShrink: 0,
                  background: 'transparent', border: 'none',
                  color: 'rgba(255,255,255,0.7)', fontSize: 16, cursor: 'pointer',
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>
          )}

          {/* Accuracy-chip: varna om GPS är dålig (bara när vi fått första fix och accuracy >25m) */}
          {currentAccuracy !== null && currentAccuracy > 25 && (phase === 'tracking' || phase === 'paused') && (
            <div style={{
              margin: '0 20px 10px', padding: '7px 12px', borderRadius: 10,
              background: 'rgba(201,110,42,0.12)',
              border: '1px solid rgba(201,110,42,0.30)',
              color: '#f0a060',
              fontSize: 11, fontWeight: 600,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13, flexShrink: 0 }}>
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              GPS-noggrannhet: {Math.round(currentAccuracy)} m — väntar på bättre signal
            </div>
          )}

          {/* GPS status — söker vs permission-fel vs annat fel */}
          {gpsError && (() => {
            const isSearching = gpsError.startsWith('Söker')
            const isPermissionDenied = gpsError.toLowerCase().includes('nekad') || gpsError.toLowerCase().includes('inställningarna')
            // Söker-state: liten subtle pill (samma som tidigare)
            if (isSearching) {
              return (
                <div style={{
                  margin: '0 20px 10px', padding: '7px 12px', borderRadius: 10,
                  background: 'rgba(74,184,212,.1)', border: '1px solid rgba(74,184,212,.25)',
                  color: '#4ab8d4', fontSize: 11, fontWeight: 600,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13, flexShrink: 0 }}>
                    <path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M5 12.55a11 11 0 0 1 14.08 0"/>
                    <path d="M10.54 16.1a6 6 0 0 1 2.92 0"/><circle cx="12" cy="20" r="1" fill="currentColor" stroke="none"/>
                  </svg>
                  {gpsError}
                </div>
              )
            }
            // Permission denied / hard error: prominent banner med action
            return (
              <div style={{
                margin: '8px 16px 14px', padding: '14px 16px', borderRadius: 14,
                background: 'rgba(220,38,38,.14)', border: '1px solid rgba(220,38,38,.35)',
                display: 'flex', flexDirection: 'column', gap: 10,
              }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <span style={{ flexShrink: 0, color: '#f87171', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 }}>
                    <Icon name="warning" size={18} stroke={2} />
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#fecaca', marginBottom: 4 }}>
                      {isPermissionDenied ? 'GPS-behörighet krävs' : 'GPS-fel'}
                    </div>
                    <div style={{ fontSize: 12.5, fontWeight: 500, color: 'rgba(254,202,202,.85)', lineHeight: 1.45 }}>
                      {isPermissionDenied
                        ? 'Tillåt platsdelning för Svalla i din webbläsares/enhetens inställningar och försök igen.'
                        : gpsError}
                    </div>
                  </div>
                </div>
                <button
                  className="press-feedback"
                  onClick={() => { setGpsError(''); startGPS() }}
                  style={{
                    alignSelf: 'flex-start',
                    padding: '8px 16px', borderRadius: 10,
                    background: 'rgba(255,255,255,.92)', color: '#1e5c82',
                    border: 'none', cursor: 'pointer',
                    fontSize: 13, fontWeight: 700,
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                  }}
                >
                  Försök igen
                </button>
              </div>
            )
          })()}

          {/* Single primary action button */}
          <div style={{ padding: '0 16px' }}>
            {isTracking ? (
              <button onClick={handlePause} style={{
                width: '100%', padding: '18px', borderRadius: 16,
                background: 'var(--grad-acc)',
                border: 'none', color: '#fff',
                fontWeight: 700, fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                boxShadow: '0 4px 20px rgba(201,110,42,.4)',
              }}>
                <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                  <rect x="5" y="4" width="4" height="16" rx="1.5"/><rect x="15" y="4" width="4" height="16" rx="1.5"/>
                </svg>
                Pausa
              </button>
            ) : (
              <div style={{ display: 'flex', gap: 10 }}>
                <button onClick={handleResume} style={{
                  flex: 2, padding: '18px', borderRadius: 16, border: 'none',
                  background: 'linear-gradient(135deg, #0f9e64, #0d8554)', color: '#fff',
                  fontWeight: 700, fontSize: 18, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                  boxShadow: '0 4px 20px rgba(15,158,100,.4)',
                }}>
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 22, height: 22 }}>
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Fortsätt
                </button>
                <button onClick={handleStop} style={{
                  flex: 1, padding: '18px', borderRadius: 16,
                  background: 'rgba(204,61,61,.2)', border: '1.5px solid rgba(204,61,61,.4)',
                  color: '#f87171', fontWeight: 700, fontSize: 16, cursor: 'pointer',
                }}>
                  Avsluta
                </button>
              </div>
            )}
          </div>
        </div>

        <style>{`
          @keyframes strv-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.75)} }
          @keyframes strv-fade  { from{opacity:0;transform:translateY(-6px)} to{opacity:1;transform:translateY(0)} }
        `}</style>
      </div>
      {statsOverlay}
      </>
    )
  }

  // ── DONE — save screen ─────────────────────────────────────────────────────
  return (
    <div className="min-h-screen spara-done">

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
            background: 'var(--grad-sea)',
            borderRadius: 28, padding: '32px 28px',
            maxWidth: 340, width: '100%', textAlign: 'center',
            boxShadow: '0 8px 40px rgba(0,45,80,.5)',
            border: '1px solid rgba(255,255,255,.15)',
          }}>
            <div style={{ marginBottom: 12 }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" style={{ width: 48, height: 48 }}>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill="rgba(255,255,255,.15)"/>
              </svg>
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 6 }}>
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
                    <div style={{ fontSize: 14, fontWeight: 600, color: '#fff' }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,.6)', marginTop: 1 }}>Nytt märke uppnått</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                setShowCelebration(false)
                if (tripId) router.push(`/tur/${tripId}`)
              }}
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
        <h1 className="text-lg font-bold text-sea">Tur avslutad</h1>
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
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--green)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 22, height: 22, flexShrink: 0 }}>
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>
                <line x1="8" y1="2" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="22"/>
              </svg>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--green)' }}>
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
                    {name}
                  </span>
                )
              })}
            </div>
          </div>
        )}

        {/* ── Trip summary ── */}
        <div style={{ background: 'var(--white)', borderRadius: 16, padding: '16px', boxShadow: '0 2px 12px rgba(0,30,50,.07)' }}>
          {/* Overall bearing if available */}
          {bearing !== null && (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
              marginBottom: 12, padding: '7px 12px',
              background: 'rgba(30,92,130,.06)', borderRadius: 10,
            }}>
              <span style={{ fontSize: 12, color: 'var(--txt2)', fontWeight: 600 }}>
                ↑ {bearingLabel(bearing)} — rutt från start till slut
              </span>
            </div>
          )}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 16 }}>
            <StatRow label="Distans"    val={`${dist.toFixed(2)} NM`} />
            <StatRow label="Tid"        val={formatDuration(elapsed)} />
            <StatRow label="Snittfart"  val={`${avgSpd.toFixed(1)} kn`} />
            <StatRow label="Toppfart"   val={`${maxSpd.toFixed(1)} kn`} />
            <StatRow label="Stopp"      val={`${stops.filter(s => s.type === 'stop').length} st`} />
            <StatRow label="GPS-punkter" val={`${points.length}`} />
          </div>
        </div>

        {/* ── Rating ── */}
        <div style={{ background: 'var(--white)', borderRadius: 20, padding: '18px 16px', boxShadow: '0 2px 10px rgba(0,45,60,.06)' }}>
          <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.5px', margin: '0 0 12px' }}>
            Hur var turen?
          </p>
          <div style={{ display: 'flex', gap: 8 }}>
            {[
              { val: 1, label: 'Okej' },
              { val: 2, label: 'Bra!' },
              { val: 3, label: 'Magisk!' },
            ].map(({ val, label }) => (
              <button key={val} type="button" onClick={() => setPinnar(pinnar === val ? 0 : val)}
                style={{
                  flex: 1, padding: '12px 4px', borderRadius: 14, border: 'none', cursor: 'pointer',
                  background: pinnar === val
                    ? (val === 3 ? 'var(--grad-acc)' : 'var(--grad-sea)')
                    : 'rgba(10,123,140,.07)',
                  boxShadow: pinnar === val ? '0 3px 12px rgba(30,92,130,.3)' : 'none',
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, transition: 'all .15s',
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', gap: 2, height: 18, color: pinnar === val ? '#fff' : 'var(--sea)', opacity: pinnar === val ? 1 : 0.6 }}>
                  {Array.from({ length: val }, (_, i) => (
                    <svg key={i} viewBox="0 0 12 14" style={{ width: 12, height: 14 }} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      {/* Anchor icon */}
                      <circle cx="6" cy="3" r="1.5"/>
                      <line x1="6" y1="4.5" x2="6" y2="12"/>
                      <line x1="2" y1="6.5" x2="10" y2="6.5"/>
                      <path d="M2 10.5 Q1 13 6 13 Q11 13 10 10.5"/>
                    </svg>
                  ))}
                </span>
                <span style={{ fontSize: 10, fontWeight: 700, color: pinnar === val ? '#fff' : 'var(--txt3)' }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Location ── */}
        <LocationSearch
          value={locationName}
          onChange={setLocationName}
          placeholder="Sandhamn, Fjäderholmarna…"
          label="Plats (valfritt)"
        />

        {/* ── Caption ── */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
            <label htmlFor="spara-caption" style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.5px' }}>
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
                background: aiSummary ? 'rgba(10,123,140,.08)' : 'var(--white)',
                color: 'var(--sea)', fontSize: 12, fontWeight: 700,
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
                <>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ width: 13, height: 13 }}>
                    <path d="M12 2l1.68 5.17H19l-4.42 3.21 1.68 5.17L12 12.35l-4.26 3.2 1.68-5.17L5 7.17h5.32z"/>
                  </svg>
                  {aiSummary ? 'Generera ny' : 'Fråga Thorkel'}
                </>
              )}
            </button>
          </div>
          {aiErr && (
            <p style={{ margin: '4px 0 0', fontSize: 11, color: 'var(--err, #c0392b)' }}>
              Kunde inte generera — försök igen
            </p>
          )}

          {/* ── Thorkels tre varianter ── */}
          {aiVariants.length > 0 && (
            <div style={{ marginBottom: 10 }}>
              <div style={{
                fontSize: 10, fontWeight: 700, color: 'var(--txt3)',
                textTransform: 'uppercase', letterSpacing: '.5px',
                marginBottom: 8,
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
                        textAlign: 'left', padding: '11px 14px', borderRadius: 14,
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
                        marginBottom: 5,
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
            id="spara-caption"
            placeholder={aiVariants.length > 0 ? 'Välj ett förslag ovan eller skriv själv…' : 'Vad hände? Vad var bäst?'}
            value={caption} onChange={e => { setCaption(e.target.value); }} maxLength={280} rows={3}
            style={{
              width: '100%', padding: '12px 14px', borderRadius: 14,
              border: aiSummary && caption === aiSummary
                ? '1.5px solid rgba(10,123,140,.35)'
                : '1.5px solid rgba(10,123,140,.15)',
              background: 'var(--white)', fontSize: 14, color: 'var(--txt)', outline: 'none',
              resize: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              transition: 'border-color .2s',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 4 }}>
            {aiSummary && caption === aiSummary
              ? <span style={{ fontSize: 10, color: 'var(--sea)', fontWeight: 700 }}>Thorkel skrev denna — redigera fritt</span>
              : <span />}
            <span style={{ fontSize: 10, color: 'var(--txt3)' }}>{caption.length}/280</span>
          </div>
        </div>

        {/* ── Media — up to 3 images or short videos ── */}
        <div role="group" aria-labelledby="spara-media-label">
          <span id="spara-media-label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.5px', display: 'block', marginBottom: 8 }}>
            Bilagor <span style={{ fontWeight: 400, textTransform: 'none', opacity: .6 }}>(valfritt · max 3)</span>
          </span>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
            {[0, 1, 2].map(i => {
              const hasFile = i < mediaPreviews.length
              const previewSrc = mediaPreviews[i]
              const isVid = hasFile && mediaFiles[i]?.type.startsWith('video/')
              const isAddSlot = !hasFile && i === mediaPreviews.length && mediaPreviews.length < 3
              return (
                <div key={i} style={{ position: 'relative', aspectRatio: '1', borderRadius: 14, overflow: 'hidden' }}>
                  {hasFile ? (
                    <>
                      {isVid ? (
                        <>
                          <video
                            src={previewSrc}
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                            muted playsInline
                          />
                          {/* ▶ overlay */}
                          <div style={{
                            position: 'absolute', inset: 0, pointerEvents: 'none',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                          }}>
                            <div style={{
                              width: 34, height: 34, borderRadius: '50%',
                              background: 'rgba(255,255,255,0.82)',
                              backdropFilter: 'blur(4px)',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              boxShadow: '0 2px 8px rgba(0,0,0,0.22)',
                            }}>
                              <span style={{ fontSize: 13, marginLeft: 3, color: '#0a7b8c' }}>▶</span>
                            </div>
                          </div>
                        </>
                      ) : (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={previewSrc}
                          alt=""
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => {
                          setMediaFiles(prev => prev.filter((_, idx) => idx !== i))
                          setMediaPreviews(prev => prev.filter((_, idx) => idx !== i))
                        }}
                        style={{
                          position: 'absolute', top: 5, right: 5,
                          width: 24, height: 24, borderRadius: '50%',
                          background: 'rgba(0,0,0,0.62)', border: 'none',
                          color: '#fff', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 700, lineHeight: 1,
                        }}
                        aria-label="Ta bort"
                      >×</button>
                    </>
                  ) : isAddSlot ? (
                    <button
                      type="button"
                      onClick={() => fileRef.current?.click()}
                      style={{
                        width: '100%', height: '100%',
                        background: 'rgba(10,123,140,.06)',
                        border: '2px dashed rgba(10,123,140,.2)',
                        borderRadius: 14, cursor: 'pointer',
                        display: 'flex', flexDirection: 'column',
                        alignItems: 'center', justifyContent: 'center', gap: 4,
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26, opacity: 0.6 }}>
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
                        <circle cx="12" cy="13" r="4"/>
                      </svg>
                      <span style={{ fontSize: 11, color: 'var(--txt3)', fontWeight: 600 }}>Bild/video</span>
                    </button>
                  ) : (
                    <div style={{
                      width: '100%', height: '100%',
                      background: 'rgba(10,123,140,.03)',
                      border: '2px dashed rgba(10,123,140,.07)',
                      borderRadius: 14,
                    }} />
                  )}
                </div>
              )
            })}
          </div>
          <input
            ref={fileRef}
            type="file"
            // Bara bilder — Supabase Storage stöder inte video/quicktime (.mov från iPhone)
            // och vi har inte transcoding på plats. Tydlig restriktion > misslyckad upload.
            accept="image/jpeg,image/png,image/webp,image/heic"
            style={{ display: 'none' }}
            onChange={async e => {
              const f = e.target.files?.[0]
              e.target.value = ''   // reset so same file can be re-selected
              if (!f || mediaFiles.length >= 3) return
              // Avvisa video tydligt — meddelande beskriver problemet och hur man fixar
              if (f.type.startsWith('video/') || /\.(mov|mp4|m4v|webm|avi)$/i.test(f.name)) {
                setErr('Videofiler stöds inte ännu — välj en bild från turen istället. iPhones .mov-format kommer i en framtida version.')
                return
              }
              if (!f.type.startsWith('image/')) {
                setErr('Endast bildfiler stöds (jpg, png, webp, heic).')
                return
              }
              // Image: compress → FileReader → stable base64 data-URL (fixes blank preview bug)
              const compressed = await compressImage(f)
              const reader = new FileReader()
              reader.onload = () => {
                setMediaFiles(prev => [...prev, compressed])
                setMediaPreviews(prev => [...prev, reader.result as string])
              }
              reader.readAsDataURL(compressed)
            }}
          />
        </div>

        {/* ── Medseglare ── */}
        <div role="group" aria-labelledby="spara-crew-label">
          <span id="spara-crew-label" style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '.5px', display: 'block', marginBottom: 8 }}>
            Medseglare <span style={{ fontWeight: 400, textTransform: 'none', opacity: .6 }}>(valfritt)</span>
          </span>
          <CrewPicker
            supabase={supabase}
            currentUserId={currentUserId}
            selected={taggedCrew}
            onSelect={u => setTaggedCrew(prev => [...prev, u])}
            onRemove={id => setTaggedCrew(prev => prev.filter(u => u.id !== id))}
          />
        </div>

        {err && (
          <div className="rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            <strong>Fel:</strong> {err}
          </div>
        )}

        <style>{`@keyframes fadeInUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}`}</style>

        <button
          onClick={handleSave} disabled={saving}
          className="w-full py-4 rounded-2xl text-white font-bold text-base press-feedback"
          style={{
            background: !saving ? 'var(--grad-acc)' : 'rgba(10,123,140,.15)',
            color:      !saving ? 'white' : 'var(--txt3)',
            boxShadow:  !saving ? '0 4px 20px rgba(201,110,42,.4)' : 'none',
          }}
        >
          {saving ? 'Sparar…' : 'Spara och visa tur →'}
        </button>
      </div>
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

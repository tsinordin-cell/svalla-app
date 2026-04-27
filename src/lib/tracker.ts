/**
 * Svalla GPS Tracker — unified interface för native (Capacitor) och web.
 * Använd alltid denna modul — aldrig navigator.geolocation direkt.
 *
 * Native (Capacitor): bakgrundsläge, skärm av, telefon i ficka ✓
 * Web: kräver skärmen på (Wake Lock), acceptabelt kompromiss
 */

export interface GpsPoint {
  lat: number
  lng: number
  accuracy: number
  timestamp: number
  heading: number | null   // grader från norr, null om ej tillgängligt
  speed: number | null     // m/s från enhetens sensor, null om ej tillgängligt
}

export type TrackCallback = (point: GpsPoint) => void
export type ErrorCallback = (message: string) => void

// NOTERA: watchId och nativeMode är INTE module-globals längre.
// De hanteras via closure i varje startTracking-anrop för att undvika
// race conditions vid dubbel mount (React StrictMode, remounts).

async function isNative(): Promise<boolean> {
  if (typeof window === 'undefined') return false
  try {
    const { Capacitor } = await import('@capacitor/core')
    return Capacitor.isNativePlatform()
  } catch {
    return false
  }
}

/**
 * Starta GPS-spårning. Returnerar en stop-funktion.
 * Varje anrop är isolerat — watchId hanteras via closure, inte module-global.
 */
export async function startTracking(
  onPoint: TrackCallback,
  onError: ErrorCallback,
): Promise<() => void> {
  const native = await isNative()

  if (native) {
    return startNativeTracking(onPoint, onError)
  } else {
    return startWebTracking(onPoint, onError)
  }
}

async function startNativeTracking(
  onPoint: TrackCallback,
  onError: ErrorCallback,
): Promise<() => void> {
  const { Geolocation } = await import('@capacitor/geolocation')

  // Begär behörighet
  const perm = await Geolocation.requestPermissions()
  if (perm.location !== 'granted') {
    onError('Platsbehörighet nekad.')
    return () => {}
  }

  // watchId är lokal variabel — isolerad per anrop
  let localWatchId: string | null = null
  localWatchId = await Geolocation.watchPosition(
    { enableHighAccuracy: true, timeout: 10_000 },
    (pos, err) => {
      if (err) { onError(err.message ?? 'GPS-fel'); return }
      if (!pos) return
      onPoint({
        lat:       pos.coords.latitude,
        lng:       pos.coords.longitude,
        accuracy:  pos.coords.accuracy,
        timestamp: pos.timestamp,
        heading:   pos.coords.heading   ?? null,
        speed:     pos.coords.speed     ?? null,
      })
    },
  )

  return async () => {
    if (localWatchId !== null) {
      await Geolocation.clearWatch({ id: localWatchId })
      localWatchId = null
    }
  }
}

function startWebTracking(
  onPoint: TrackCallback,
  onError: ErrorCallback,
): () => void {
  if (!navigator.geolocation) {
    onError('GPS stöds inte i din webbläsare.')
    return () => {}
  }

  // localWatchId är lokal variabel — isolerad per anrop
  let localWatchId: number | null = null
  localWatchId = navigator.geolocation.watchPosition(
    (pos) => onPoint({
      lat:       pos.coords.latitude,
      lng:       pos.coords.longitude,
      accuracy:  pos.coords.accuracy,
      timestamp: pos.timestamp,
      heading:   pos.coords.heading ?? null,
      speed:     pos.coords.speed   ?? null,
    }),
    (err) => onError(err.message ?? 'GPS-fel'),
    { enableHighAccuracy: true, timeout: 10_000, maximumAge: 5_000 },
  )

  return () => {
    if (localWatchId !== null) {
      navigator.geolocation.clearWatch(localWatchId)
      localWatchId = null
    }
  }
}

/**
 * Hämta nuvarande position (engångsmätning).
 */
export async function getCurrentPosition(): Promise<GpsPoint | null> {
  const native = await isNative()

  if (native) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation')
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      return {
        lat:       pos.coords.latitude,
        lng:       pos.coords.longitude,
        accuracy:  pos.coords.accuracy,
        timestamp: pos.timestamp,
        heading:   pos.coords.heading ?? null,
        speed:     pos.coords.speed   ?? null,
      }
    } catch {
      return null
    }
  }

  return new Promise((resolve) => {
    if (!navigator.geolocation) { resolve(null); return }
    navigator.geolocation.getCurrentPosition(
      (pos) => resolve({
        lat:       pos.coords.latitude,
        lng:       pos.coords.longitude,
        accuracy:  pos.coords.accuracy,
        timestamp: pos.timestamp,
        heading:   pos.coords.heading ?? null,
        speed:     pos.coords.speed   ?? null,
      }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  })
}

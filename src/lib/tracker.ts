/**
 * Svalla GPS Tracker — unified interface för native (Capacitor) och web.
 * Använd alltid denna modul — aldrig navigator.geolocation direkt.
 */

export interface GpsPoint {
  lat: number
  lng: number
  accuracy: number
  timestamp: number
}

export type TrackCallback = (point: GpsPoint) => void
export type ErrorCallback = (message: string) => void

let watchId: string | number | null = null
let nativeMode = false

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
 */
export async function startTracking(
  onPoint: TrackCallback,
  onError: ErrorCallback,
): Promise<() => void> {
  nativeMode = await isNative()

  if (nativeMode) {
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

  watchId = await Geolocation.watchPosition(
    { enableHighAccuracy: true, timeout: 10_000 },
    (pos, err) => {
      if (err) { onError(err.message ?? 'GPS-fel'); return }
      if (!pos) return
      onPoint({
        lat:       pos.coords.latitude,
        lng:       pos.coords.longitude,
        accuracy:  pos.coords.accuracy,
        timestamp: pos.timestamp,
      })
    },
  )

  return async () => {
    if (watchId !== null) {
      await Geolocation.clearWatch({ id: watchId as string })
      watchId = null
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

  watchId = navigator.geolocation.watchPosition(
    (pos) => onPoint({
      lat:       pos.coords.latitude,
      lng:       pos.coords.longitude,
      accuracy:  pos.coords.accuracy,
      timestamp: pos.timestamp,
    }),
    (err) => onError(err.message ?? 'GPS-fel'),
    { enableHighAccuracy: true, timeout: 10_000, maximumAge: 5_000 },
  )

  return () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId as number)
      watchId = null
    }
  }
}

/**
 * Hämta nuvarande position (engångsmätning).
 */
export async function getCurrentPosition(): Promise<GpsPoint | null> {
  nativeMode = await isNative()

  if (nativeMode) {
    try {
      const { Geolocation } = await import('@capacitor/geolocation')
      const pos = await Geolocation.getCurrentPosition({ enableHighAccuracy: true })
      return {
        lat:       pos.coords.latitude,
        lng:       pos.coords.longitude,
        accuracy:  pos.coords.accuracy,
        timestamp: pos.timestamp,
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
      }),
      () => resolve(null),
      { enableHighAccuracy: true, timeout: 10_000 },
    )
  })
}

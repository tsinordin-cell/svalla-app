// ── Trip state persistence — crash recovery ───────────────────────────────────
// Saves active trip metadata to localStorage every 30s.
// If the app crashes or reloads mid-trip, the user is offered to continue.
// GPS points already in Supabase are preserved; only the tracking state is lost.

export interface TripSnapshot {
  v: 3
  savedAt: string        // ISO — used to expire after 8h
  startedAt: string      // ISO — original trip start time
  boatType: string
  phase: 'tracking' | 'paused'
  elapsed: number        // seconds tracked at save time
  tripId: string | null  // Supabase trip ID if already created
}

const KEY = 'svalla_active_trip'

/**
 * Save current trip state to localStorage.
 * Called every 30s during tracking and paused phases.
 */
export function snapshotTrip(data: Omit<TripSnapshot, 'v' | 'savedAt'>): void {
  try {
    const snap: TripSnapshot = { ...data, v: 3, savedAt: new Date().toISOString() }
    localStorage.setItem(KEY, JSON.stringify(snap))
  } catch {
    // localStorage full or unavailable (private browsing) — silently ignore
  }
}

/**
 * Load a saved trip snapshot, if one exists and isn't expired.
 * Returns null if no valid snapshot is found.
 */
export function loadTripSnapshot(): TripSnapshot | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const snap = JSON.parse(raw) as TripSnapshot
    // Version guard
    if (snap.v !== 3) { clearTripSnapshot(); return null }
    // Expire after 8 hours
    if (Date.now() - new Date(snap.savedAt).getTime() > 8 * 3600_000) {
      clearTripSnapshot()
      return null
    }
    return snap
  } catch {
    return null
  }
}

/**
 * Remove the saved trip snapshot.
 * Call this when the trip is successfully saved or deliberately discarded.
 */
export function clearTripSnapshot(): void {
  try { localStorage.removeItem(KEY) } catch {}
}

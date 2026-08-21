/**
 * tripFields.ts — bygger raden som sparas i trips (utbruten ur /spara 21/8).
 *
 * Ren funktion utan React och utan Supabase, av samma skäl som tracking.ts:
 * reglerna gick inte att testa när de låg inbakade i sidan. Fälttestbugg
 * 21/8 — en tur utan foto gick inte att spara (image NOT NULL mot null) —
 * hade fångats av ett test här i stället för i en bil i Arkansas.
 */
export type TripSaveInput = {
  userId: string
  boatType: string
  distanceNM: number
  elapsedSeconds: number
  avgKnots: number
  maxKnots: number
  uploadedUrls: string[]
  startedAt: string
  endedAt: string
  pinnar: number
  caption: string
  locationName: string
  routePoints: unknown
  isPrivate: boolean
}

export function buildTripFields(i: TripSaveInput) {
  const [first, ...extra] = i.uploadedUrls
  return {
    user_id:              i.userId,
    boat_type:            i.boatType,
    distance:             parseFloat(i.distanceNM.toFixed(2)),
    // OBS: trips.duration är MINUTER (låst av test — 19/8-buggen där
    // 1127 min lästes som något annat började i otydlighet kring detta).
    duration:             Math.round(i.elapsedSeconds / 60),
    average_speed_knots:  parseFloat(i.avgKnots.toFixed(1)),
    max_speed_knots:      parseFloat(i.maxKnots.toFixed(1)),
    // null = ingen bild — kolumnen nullbar sedan 21/8, kortet visar kartan.
    image:                first ?? null,
    images:               extra.length ? extra : null,
    started_at:           i.startedAt,
    ended_at:             i.endedAt,
    pinnar_rating:        i.pinnar > 0 ? i.pinnar : null,
    caption:              i.caption.trim() || null,
    location_name:        i.locationName.trim() || null,
    route_points:         i.routePoints,
    status:               'done' as const,
    visibility:           i.isPrivate ? ('private' as const) : ('public' as const),
  }
}

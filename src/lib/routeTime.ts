/**
 * routeTime.ts — uppskatta tid för en rutt baserat på distans och båttyp.
 *
 * Realistiska genomsnitt för Svenskt skärgårdsbåtfolk:
 * - Segelbåt 30 fot: 5–6 knop kryss, 6–8 knop slör. Vi räknar 5.5 knop snitt.
 * - Motorbåt mellanstor: 18–25 knop marschfart i skyddat vatten. Vi räknar 18 knop.
 * - Kajak/SUP: 3–4 knop. Vi räknar 3.5 knop.
 *
 * 1 knop = 1.852 km/h. Vi adderar 15 % buffer för väder, ankring,
 * trafik och naturliga pauser.
 */

export type BoatProfile = 'segel' | 'motor' | 'kajak'

const SPEED_KNOTS: Record<BoatProfile, number> = {
  segel: 5.5,
  motor: 18,
  kajak: 3.5,
}

const KM_PER_KNOT = 1.852
const BUFFER_FACTOR = 1.15

export type TimeEstimate = {
  /** Hela timmar (avrundat) */
  hours: number
  /** Hela minuter, 0–59 */
  minutes: number
  /** Mänskligt format: "5 h 20 min" eller "45 min" */
  label: string
}

export function estimateTravelTime(distanceKm: number, profile: BoatProfile): TimeEstimate {
  const speedKmh = SPEED_KNOTS[profile] * KM_PER_KNOT
  const totalMinutes = Math.round((distanceKm / speedKmh) * 60 * BUFFER_FACTOR)
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  const label = hours === 0
    ? `${minutes} min`
    : minutes === 0
      ? `${hours} h`
      : `${hours} h ${minutes} min`

  return { hours, minutes, label }
}

export type RouteEstimates = {
  segelbat: string
  motorbat: string
  kajak: string
}

/** Genvägs-funktion som ger samma rutt i tre profiler. */
export function estimateAllProfiles(distanceKm: number): RouteEstimates {
  return {
    segelbat: estimateTravelTime(distanceKm, 'segel').label,
    motorbat: estimateTravelTime(distanceKm, 'motor').label,
    kajak: estimateTravelTime(distanceKm, 'kajak').label,
  }
}

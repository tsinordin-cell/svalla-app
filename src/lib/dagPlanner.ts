/**
 * dagPlanner.ts — kärnlogik för "Min dag"-feature.
 *
 * Tar en startposition (lat/lng) + starttid och returnerar 3 stopp inom rimligt
 * båt-avstånd, filtrerade på säsong och POI-typ.
 *
 * MVP-policy:
 *   - 3 stopp per dag (ej fler — beslutsförenkling)
 *   - max 30 min båtfärd mellan stopp (10 nm @ 20 knop)
 *     PRODUKTREGEL: 20 knop är vår filterparameter, inte ett påstående om
 *     användarens båt. OBS från granskningen 2026-08-16: en segelbåt i 5,5 knop
 *     gör samma 10 nm på ~110 min — "30 min" stämmer bara för snabb motorbåt.
 *     Vill vi vara ärliga mot seglare bör filtret ta båttyp som parameter.
 *   - mix: 1 sevärdhet/krog för lunch, 1 aktivitet, 1 krog för middag
 *   - filtrera bort poster med seasonality 'closed' eller där öppettider tyder på stängt
 *
 * Post-MVP (skalas av tills vi ser klick):
 *   - väder-integration
 *   - restpriser/lediga bord realtid
 *   - community-status ("är det folk där?")
 *   - push-trigger när status ändras
 */

import type { Restaurant } from './supabase'

export type DagStop = {
  id: string
  name: string
  type: string
  island: string | null
  lat: number
  lng: number
  description: string | null
  image_url: string | null
  booking_url: string | null
  arrival: string  // 'HH:MM'
  departure: string
  durationMin: number
  travelFromPrevMin: number  // minuter båtfärd från förra stoppet
  distanceFromPrevKm: number
  reason: string  // varför just denna plats föreslås
}

export type DagPlan = {
  startLat: number
  startLng: number
  startTime: string  // 'HH:MM'
  startName: string  // "Din position" eller ö-namn
  stops: DagStop[]
  totalDistanceKm: number
  totalDurationMin: number
}

// ── Geografi ──────────────────────────────────────────────────────────────

const EARTH_RADIUS_KM = 6371

export function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(a))
}

/**
 * PRODUKTREGEL: 18 knop är VÅRT planeringsantagande, inte ett påstående om
 * användarens båt. Vi är källan — ändras regeln ändras koden, så den kan inte
 * driva isär från verkligheten.
 *
 * MEN: antagandet är inte oskyldigt. 18 knop är en planande motorbåt. En
 * segelbåt går 5–6 knop, en klassisk träbåt 7–8. För dem tar sträckan två till
 * tre gånger längre tid än vad vi visar. Granskningen 2026-08-16 flaggade
 * detta, och 2026-08-21 gjordes antagandet till en exporterad konstant så att
 * gränssnittet KAN redovisa det — och så att en framtida fartväljare bara
 * behöver skicka in ett annat värde.
 *
 * Det som INTE får hända är att en restid visas som fakta utan att det framgår
 * vad den bygger på. Hellre "ca 30 min i 18 knop" än "30 min".
 */
export const ANTAGEN_FART_KNOP = 18
const KM_PER_KNOP = 1.852

/**
 * Restid i minuter för en sträcka.
 * @param distanceKm sträcka i kilometer
 * @param fartKnop   fart att räkna på — default ANTAGEN_FART_KNOP (18).
 *                   Skicka 5.5 för segelbåt, 7 för långsam motorbåt.
 */
export function travelTimeMin(distanceKm: number, fartKnop: number = ANTAGEN_FART_KNOP): number {
  const kmPerHour = fartKnop * KM_PER_KNOP
  if (kmPerHour <= 0) return 0
  return Math.round((distanceKm / kmPerHour) * 60)
}

// ── Öppettidsparsning (best-effort på fri text) ───────────────────────────

/**
 * Vi har ingen strukturerad öppettidsdata — bara en frasträng.
 * MVP: filtrera ut det som tydligt är stängt på vinterhalvåret om månaden inte
 * passar. Resten antas öppet.
 */
export function isLikelyOpenAt(opening_hours: string | null, seasonality: string | null, when: Date): boolean {
  const month = when.getMonth() + 1  // 1–12

  // Stängd för säsongen
  if (seasonality === 'summer_only' && (month < 5 || month > 9)) return false
  if (seasonality === 'closed') return false

  // Heuristik på fri text
  if (opening_hours) {
    const lower = opening_hours.toLowerCase()
    // "Endast juni–augusti"
    if (/endast.*(juni|jul|august)/i.test(lower) && (month < 6 || month > 8)) return false
    if (/(maj|juni)\s*[-–]\s*(sep|aug)/i.test(lower) && (month < 5 || month > 9)) return false
    if (/sommar|sommarsäsong|sommaren/i.test(lower) && (month < 5 || month > 9)) return false
    // "Stängd vinter"
    if (/stängd.*(vinter|jan|feb|mar|apr|nov|dec|okt)/i.test(lower) && (month < 5 || month > 9)) return false
  }

  return true
}

// ── Förslagslogik ─────────────────────────────────────────────────────────

type RestaurantLite = Pick<Restaurant,
  'id' | 'name' | 'type' | 'island' | 'latitude' | 'longitude' |
  'description' | 'image_url' | 'booking_url' | 'opening_hours' | 'seasonality' | 'categories'
>

function categoryRank(stop: RestaurantLite, slot: 'morning' | 'lunch' | 'evening'): number {
  // Lägre rank = bättre match för slot
  const cats = stop.categories ?? []
  const type = stop.type ?? ''

  if (slot === 'morning') {
    // Morgon: fika, naturhamn, sevärdhet
    if (cats.includes('cafe') || /café|kafe|bager/i.test(stop.name)) return 1
    if (type === 'anchorage' || type === 'natural_anchorage') return 2
    if (type === 'attraction' || cats.includes('nature')) return 3
    if (type === 'restaurant') return 5
    return 4
  }
  if (slot === 'lunch') {
    if (type === 'restaurant') return 1
    if (cats.includes('seafood') || cats.includes('family_stop')) return 2
    if (/krog|värdshus/i.test(stop.name)) return 2
    return 4
  }
  // evening
  if (type === 'restaurant') return 1
  if (cats.includes('seafood') || cats.includes('modern')) return 1
  if (cats.includes('bar')) return 2
  if (/krog|värdshus|restaurang/i.test(stop.name)) return 2
  return 5
}

function timeStr(d: Date): string {
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
}

function addMinutes(d: Date, min: number): Date {
  return new Date(d.getTime() + min * 60_000)
}

/**
 * Föreslår 3 stopp. Slottar:
 *   1. Morgon/förmiddag (start + 30min) — fika eller naturhamn nära start
 *   2. Lunch (~12:30) — krog eller värdshus med rimlig avstånd från stopp 1
 *   3. Eftermiddag/kväll (~16:00) — krog eller bar för middag
 *
 * @param startLat användarens position
 * @param startTime t.ex. '09:30'
 * @param pool — restauranger/hamnar redan filtrerade på lat/lng-ruta
 */
export function suggestDay(
  startLat: number,
  startLng: number,
  startTime: string,
  pool: RestaurantLite[],
  when: Date = new Date(),
): DagStop[] {
  const MAX_HOP_KM = 18  // max avstånd mellan stopp
  const valid = pool.filter(r =>
    r.latitude != null && r.longitude != null &&
    isLikelyOpenAt(r.opening_hours ?? null, r.seasonality ?? null, when)
  )
  if (valid.length === 0) return []

  const slots: Array<{ slot: 'morning' | 'lunch' | 'evening'; offsetMin: number; durationMin: number; reason: string }> = [
    { slot: 'morning', offsetMin: 30, durationMin: 60, reason: 'Mjuk start nära din position' },
    { slot: 'lunch', offsetMin: 180, durationMin: 90, reason: 'Lunch i lagom båtfärd härifrån' },
    { slot: 'evening', offsetMin: 360, durationMin: 120, reason: 'Middag att avsluta dagen med' },
  ]

  const [hStr, mStr] = startTime.split(':')
  const start = new Date(when)
  start.setHours(parseInt(hStr || '9', 10), parseInt(mStr || '30', 10), 0, 0)

  const stops: DagStop[] = []
  let prevLat = startLat
  let prevLng = startLng
  const used = new Set<string>()

  for (const s of slots) {
    // Kandidater: nära den senaste positionen, ej redan vald, max MAX_HOP_KM
    const candidates = valid
      .filter(r => !used.has(r.id))
      .map(r => {
        const dKm = haversineKm(prevLat, prevLng, r.latitude!, r.longitude!)
        return { r, dKm, rank: categoryRank(r, s.slot) }
      })
      .filter(c => c.dKm <= MAX_HOP_KM)
      .sort((a, b) => {
        // Bäst: låg rank, sen kort avstånd
        if (a.rank !== b.rank) return a.rank - b.rank
        return a.dKm - b.dKm
      })

    if (candidates.length === 0) break

    const pick = candidates[0]!
    const travelMin = travelTimeMin(pick.dKm)
    const arrival = addMinutes(start, s.offsetMin)
    const departure = addMinutes(arrival, s.durationMin)

    stops.push({
      id: pick.r.id,
      name: pick.r.name,
      type: pick.r.type ?? 'place',
      island: pick.r.island ?? null,
      lat: pick.r.latitude!,
      lng: pick.r.longitude!,
      description: pick.r.description ?? null,
      image_url: pick.r.image_url ?? null,
      booking_url: pick.r.booking_url ?? null,
      arrival: timeStr(arrival),
      departure: timeStr(departure),
      durationMin: s.durationMin,
      travelFromPrevMin: travelMin,
      distanceFromPrevKm: Math.round(pick.dKm * 10) / 10,
      reason: s.reason,
    })

    used.add(pick.r.id)
    prevLat = pick.r.latitude!
    prevLng = pick.r.longitude!
  }

  return stops
}

export function summariseDay(plan: { stops: DagStop[] }): { totalDistanceKm: number; totalDurationMin: number } {
  let totalDistanceKm = 0
  let totalDurationMin = 0
  for (const s of plan.stops) {
    totalDistanceKm += s.distanceFromPrevKm
    totalDurationMin += s.travelFromPrevMin + s.durationMin
  }
  return {
    totalDistanceKm: Math.round(totalDistanceKm * 10) / 10,
    totalDurationMin,
  }
}

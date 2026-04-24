/**
 * planner.ts — korridor-algoritm för ruttplaneraren
 *
 * Ren funktion, inga Supabase-beroenden. Testbar med Jest/Vitest.
 *
 * Algoritm:
 * 1. Beräkna korridor-bredd baserat på rutt-längd
 * 2. Filtrera platser inom vinkelrätt avstånd från linjen (cross-track distance)
 * 3. Matcha intressen mot platsens type/categories/tags
 * 4. Poängsätt: intresse-match + avstånd från linje + positions-bonus (mitten av rutt)
 * 5. Deduplicera per ö (max 2 stopp/ö), returnera top maxStops
 */

export type Interest = 'krog' | 'bastu' | 'bad' | 'brygga' | 'natur' | 'bensin'

export type PlaceInput = {
  id: string
  name: string
  lat: number
  lng: number
  type: string | null
  categories: string[] | null
  tags: string[] | null
  island: string | null
}

export type ScoredStop = PlaceInput & {
  score: number
  distance_from_line_km: number
  reason: string
}

export type PlannerOptions = {
  corridorKm?: number  // override auto-beräknad korridor
  maxStops?: number    // default 8
}

// ── Koordinat-matematik ────────────────────────────────────────────────────

const DEG_TO_RAD = Math.PI / 180
const EARTH_R_KM = 6371

function toRad(deg: number) { return deg * DEG_TO_RAD }

/** Haversine-distans i km */
export function haversineKm(
  lat1: number, lng1: number,
  lat2: number, lng2: number,
): number {
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_R_KM * Math.asin(Math.sqrt(a))
}

/**
 * Vinkelrätt avstånd (cross-track) från punkt P till linjesegmentet A→B.
 * Returnerar avstånd i km och hur långt längs linjen punkten projekteras (0–1).
 */
export function crossTrack(
  pLat: number, pLng: number,
  aLat: number, aLng: number,
  bLat: number, bLng: number,
): { distKm: number; t: number } {
  // Projicera på linjen med enkla ekvidistanta koordinater (tillräckligt för ≤200 km)
  const scale = Math.cos(toRad((aLat + bLat) / 2))
  const ax = aLng * scale, ay = aLat
  const bx = bLng * scale, by = bLat
  const px = pLng * scale, py = pLat

  const dx = bx - ax, dy = by - ay
  const lenSq = dx * dx + dy * dy

  let t = 0
  if (lenSq > 0) {
    t = ((px - ax) * dx + (py - ay) * dy) / lenSq
    t = Math.max(0, Math.min(1, t))
  }

  const closestX = ax + t * dx
  const closestY = ay + t * dy

  // Konvertera diff tillbaka till km
  // (px - closestX) är redan i skalade grader (= lng_diff * cos(lat))
  // → konvertera till km direkt utan extra *scale
  const dLat = (py - closestY) * (Math.PI / 180) * EARTH_R_KM
  const dLng = (px - closestX) * (Math.PI / 180) * EARTH_R_KM
  const distKm = Math.sqrt(dLat * dLat + dLng * dLng)

  return { distKm, t }
}

// ── Intresse-matchning ────────────────────────────────────────────────────

const INTEREST_PATTERNS: Record<Interest, {
  types: string[]
  cats: string[]
  tags: string[]
}> = {
  krog: {
    types: ['restaurant', 'bar', 'cafe', 'kafe'],
    cats: ['restaurant', 'cafe', 'bar'],
    tags: ['mat', 'krog', 'restaurang', 'café', 'bar'],
  },
  bastu: {
    types: ['sauna', 'bastu'],
    cats: ['sauna', 'bastu'],
    tags: ['bastu', 'sauna'],
  },
  bad: {
    types: ['beach', 'swimming', 'bathing'],
    cats: ['beach', 'swimming', 'bathing'],
    tags: ['bad', 'badplats', 'klippbad', 'strand'],
  },
  brygga: {
    types: ['harbor', 'marina', 'nature_harbor', 'anchorage'],
    cats: ['guest_harbor', 'harbor_stop', 'marina', 'nature_harbor', 'anchorage'],
    tags: ['hamn', 'brygga', 'gästhamn'],
  },
  natur: {
    types: ['nature', 'nature_reserve', 'hiking'],
    cats: ['nature', 'nature_reserve', 'hiking'],
    tags: ['natur', 'vandring', 'naturreservat', 'klippa'],
  },
  bensin: {
    types: ['fuel'],
    cats: ['fuel'],
    tags: ['bensin', 'diesel', 'tankning', 'sjömack'],
  },
}

// Matchar ett ord exakt i ett namn (hanterar svenska sammansatta ord)
// "hamn" matchar "Grinda Hamn" men INTE "Hamnkrogen"
function nameHasWord(name: string, word: string): boolean {
  return new RegExp(`(^|[\\s\\-&/])${word}([\\s\\-&/]|$)`).test(name)
}

export function matchesInterest(place: PlaceInput, interests: Interest[]): Interest | null {
  const t = (place.type ?? '').toLowerCase()
  const cats = (place.categories ?? []).map(c => c.toLowerCase())
  const tags = (place.tags ?? []).map(c => c.toLowerCase())
  const name = place.name.toLowerCase()

  for (const interest of interests) {
    const p = INTEREST_PATTERNS[interest]
    if (
      p.types.some(x => t.includes(x)) ||
      p.cats.some(x => cats.includes(x)) ||
      p.tags.some(x => tags.includes(x) || nameHasWord(name, x))
    ) {
      return interest
    }
  }
  return null
}

const INTEREST_LABELS: Record<Interest, string> = {
  krog:   'Krog längs rutten',
  bastu:  'Bastu längs rutten',
  bad:    'Badplats längs rutten',
  brygga: 'Brygga att lägga till vid',
  natur:  'Naturupplevelse längs rutten',
  bensin: 'Bränslestopp längs rutten',
}

// ── Huvud-export ──────────────────────────────────────────────────────────

export function suggestStops(
  start: { lat: number; lng: number },
  end:   { lat: number; lng: number },
  interests: Interest[],
  allPlaces: PlaceInput[],
  opts: PlannerOptions = {},
): ScoredStop[] {
  const totalDistKm = haversineKm(start.lat, start.lng, end.lat, end.lng)

  // Adaptiv korridor: bredare för kortare turer (man avviker mer), smalare för långa
  const corridorKm = opts.corridorKm ?? Math.max(6, Math.min(20, totalDistKm * 0.35))
  const maxStops = opts.maxStops ?? 8

  const candidates: ScoredStop[] = []

  for (const place of allPlaces) {
    // 1. Korridor-filter
    const { distKm, t } = crossTrack(
      place.lat, place.lng,
      start.lat, start.lng,
      end.lat, end.lng,
    )
    if (distKm > corridorKm) continue

    // 2. Intresse-filter
    if (interests.length > 0) {
      const matched = matchesInterest(place, interests)
      if (!matched) continue

      // 3. Poängsättning
      const distScore    = 1 - distKm / corridorKm          // 0–1, 1 = närmast linjen
      const posBonus     = 1 - Math.abs(t - 0.5) * 2        // 0–1, 1 = mitt i rutten
      const score        = distScore * 0.55 + posBonus * 0.45

      candidates.push({
        ...place,
        score,
        distance_from_line_km: Math.round(distKm * 10) / 10,
        reason: INTEREST_LABELS[matched],
      })
    }
  }

  // 4. Sortera på score
  candidates.sort((a, b) => b.score - a.score)

  // 5. Deduplicera per ö (max 2 stopp per ö)
  const islandCount: Record<string, number> = {}
  const result: ScoredStop[] = []

  for (const c of candidates) {
    if (result.length >= maxStops) break
    const key = c.island ?? '__no_island__'
    const count = islandCount[key] ?? 0
    if (count >= 2) continue
    islandCount[key] = count + 1
    result.push(c)
  }

  return result
}

// ── Predefinerade startpunkter ────────────────────────────────────────────

export type Departure = {
  id: string
  name: string
  lat: number
  lng: number
  region: string
  emoji: string
}

export const DEPARTURES: Departure[] = [
  // Stockholm / Innerskärgård
  { id: 'stromkajen',    name: 'Strömkajen',       lat: 59.3238, lng: 18.0776, region: 'Stockholm',       emoji: '🏙' },
  { id: 'nacka-strand',  name: 'Nacka Strand',     lat: 59.3195, lng: 18.1454, region: 'Stockholm',       emoji: '⚓' },
  { id: 'vaxholm',       name: 'Vaxholm',           lat: 59.4024, lng: 18.3512, region: 'Innerskärgård',  emoji: '🏰' },
  { id: 'grinda',        name: 'Grinda',            lat: 59.4602, lng: 18.7167, region: 'Innerskärgård',  emoji: '🌿' },
  { id: 'finnhamn',      name: 'Finnhamn',          lat: 59.5430, lng: 18.8240, region: 'Innerskärgård',  emoji: '🛶' },
  // Mellersta
  { id: 'stavsnäs',      name: 'Stavsnäs',          lat: 59.1895, lng: 18.6823, region: 'Mellersta',      emoji: '🚢' },
  { id: 'sandhamn',      name: 'Sandhamn',          lat: 59.2820, lng: 18.9130, region: 'Mellersta',      emoji: '⛵' },
  { id: 'möja',          name: 'Möja',              lat: 59.4545, lng: 18.9110, region: 'Mellersta',      emoji: '🏝' },
  { id: 'ingaro',        name: 'Ingarö',            lat: 59.2472, lng: 18.5861, region: 'Mellersta',      emoji: '⚓' },
  // Södra
  { id: 'nynashamn',     name: 'Nynäshamn',         lat: 58.9038, lng: 17.9475, region: 'Södra',          emoji: '⛴' },
  { id: 'dalaroe',       name: 'Dalarö',            lat: 59.1298, lng: 18.4003, region: 'Södra',          emoji: '🎣' },
  { id: 'uto',           name: 'Utö',               lat: 58.9590, lng: 18.3017, region: 'Södra',          emoji: '🏖' },
  // Norra
  { id: 'norrtälje',     name: 'Norrtälje',         lat: 59.7579, lng: 18.7077, region: 'Norra',          emoji: '🗺' },
  { id: 'furusund',      name: 'Furusund',          lat: 59.6653, lng: 18.9217, region: 'Norra',          emoji: '⚓' },
  { id: 'arholma',       name: 'Arholma',           lat: 59.8532, lng: 19.1345, region: 'Norra',          emoji: '🌊' },
]

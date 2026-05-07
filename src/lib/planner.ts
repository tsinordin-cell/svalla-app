/**
 * planner.ts — korridor-algoritm för ruttplaneraren
 *
 * Ren funktion, inga Supabase-beroenden. Testbar med Jest/Vitest.
 *
 * Algoritm:
 * 1. Beräkna sjöleds-vägen mellan start och slut
 * 2. Beräkna korridor-bredd baserat på vägens längd
 * 3. Filtrera platser inom vinkelrätt avstånd från vägen (cross-track distance längs sjöledspaten)
 * 4. Matcha intressen mot platsens type/categories/tags
 * 5. Poängsätt: intresse-match + avstånd från vägen + positions-bonus (mitten av vägen)
 * 6. Deduplicera per ö (max 2 stopp/ö), returnera top maxStops
 */

import { findSeaPath, calculatePathDistance, crossTrackDistanceToPath } from './seaPathfinder'

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
 corridorKm?: number // override auto-beräknad korridor
 maxStops?: number // default 8
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
 types: ['fuel', 'fuel_station'],
 cats: ['fuel', 'fuel_station'],
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
 krog: 'Krog längs rutten',
 bastu: 'Bastu längs rutten',
 bad: 'Badplats längs rutten',
 brygga: 'Brygga att lägga till vid',
 natur: 'Naturupplevelse längs rutten',
 bensin: 'Bränslestopp längs rutten',
}

// ── Huvud-export ──────────────────────────────────────────────────────────

export function suggestStops(
 start: { lat: number; lng: number },
 end: { lat: number; lng: number },
 interests: Interest[],
 allPlaces: PlaceInput[],
 opts: PlannerOptions = {},
): ScoredStop[] {
 // 1. Hitta sjöleds-vägen
 const seaPath = findSeaPath(start.lat, start.lng, end.lat, end.lng)
 const pathDistKm = calculatePathDistance(seaPath)

 // 2. Adaptiv korridor: max 8 km från vägen (en detour på 8 km = 16 km extra)
 const corridorKm = opts.corridorKm ?? Math.max(3, Math.min(8, pathDistKm * 0.22))
 const maxStops = opts.maxStops ?? 8

 const candidates: ScoredStop[] = []

 for (const place of allPlaces) {
 // 3. Korridor-filter (vinkelrätt avstånd från sjöleds-vägen)
 const { distKm, tAlongPath } = crossTrackDistanceToPath(place.lat, place.lng, seaPath)
 
 if (distKm > corridorKm) continue

 // 4. Intresse-filter
 if (interests.length > 0) {
 const matched = matchesInterest(place, interests)
 if (!matched) continue

 // 5. Poängsättning
 const distScore = 1 - distKm / corridorKm // 0–1, 1 = närmast vägen
 const posBonus = 1 - Math.abs(tAlongPath - 0.5) * 2 // 0–1, 1 = mitt i vägen
 const score = distScore * 0.55 + posBonus * 0.45

 candidates.push({
 ...place,
 score,
 distance_from_line_km: Math.round(distKm * 10) / 10,
 reason: INTEREST_LABELS[matched],
 })
 }
 }

 // 6. Gruppera per intresse-label (så varje aktiv kategori får representation)
 const byReason = new Map<string, ScoredStop[]>()
 for (const c of candidates) {
 const arr = byReason.get(c.reason) ?? []
 arr.push(c)
 byReason.set(c.reason, arr)
 }
 for (const arr of byReason.values()) arr.sort((a, b) => b.score - a.score)

 // 7. Round-robin: plocka topp-N från varje kategori varv för varv tills maxStops nås.
 // Behåller ö-dedup (max 2 per ö) och stoppar när inga fler kandidater finns.
 const islandCount: Record<string, number> = {}
 const result: ScoredStop[] = []
 const queues = [...byReason.values()]
 let progressed = true
 while (result.length < maxStops && progressed) {
 progressed = false
 for (const q of queues) {
 if (result.length >= maxStops) break
 while (q.length > 0) {
 const c = q.shift()!
 const key = c.island ?? '__no_island__'
 const count = islandCount[key] ?? 0
 if (count >= 2) continue
 islandCount[key] = count + 1
 result.push(c)
 progressed = true
 break
 }
 }
 }

 return result
}

// ── Predefinerade startpunkter ────────────────────────────────────────────
// Re-exporterad från planner-client.ts för att undvika dublering. När vi
// utökar listan (Mälaren-hamnar, fler skärgårdspunkter etc) räcker det att
// uppdatera planner-client.ts — server och klient ser samma data.
export type { Departure } from './planner-client'
export { DEPARTURES } from './planner-client'

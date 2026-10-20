import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { ISLAND_COORD_MAP } from '@/lib/islandCoords'

/**
 * Platser ur platsdatabasen (tabellen restaurants) som hör till en ö.
 *
 * Varför (2026-09-26): ösidornas undersidor (/o/[ö]/bad, /restauranger,
 * /hamnar, /boende) visade bara det som stod i island-data.ts. Saknades
 * uppgifter där fyllde mallen ut med generiska påståenden ("klippor och
 * bryggor längs hela kusten", "begränsat utbud — ta matsäck") som inte var
 * belagda. Platsdatabasen har däremot källbelagda texter för badplatser,
 * krogar och hamnar. Den här funktionen hämtar dem så att undersidan visar
 * verkliga platser i stället för mallfraser.
 *
 * En plats räknas som "på ön" om dess ö-fält är öns namn, eller om den ligger
 * inom öns radie (islandCoords). Platser strax utanför radien tas med som
 * "i närheten" med avstånd fågelvägen, så att besökaren ser att de inte
 * ligger på själva ön.
 */
export type IslandPlace = {
  slug: string
  name: string
  type: string
  description: string | null
  km: number | null
  onIsland: boolean
}

type IslandLike = { slug: string; name: string; lat?: number; lng?: number }

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2
    + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export async function getIslandPlaces(
  island: IslandLike,
  types: string[],
  { extraKm = 2, limit = 12 }: { extraKm?: number; limit?: number } = {},
): Promise<IslandPlace[]> {
  const coord = ISLAND_COORD_MAP[island.slug]
  const lat = island.lat ?? coord?.lat
  const lng = island.lng ?? coord?.lng
  const radius = coord?.radiusKm ?? 3
  const reach = radius + extraKm

  try {
    const supabase = createPublicSupabaseClient()
    let query = supabase
      .from('restaurants')
      .select('slug, name, type, description, island, latitude, longitude')
      .is('hidden_at', null)
      .in('type', types)
      .limit(200)

    const nameFilter = `island.ilike."${island.name.replace(/"/g, "")}"`
    if (lat != null && lng != null) {
      const dLat = reach / 111
      const dLng = reach / (111 * Math.cos(lat * Math.PI / 180))
      query = query.or(
        `${nameFilter},and(latitude.gte.${(lat - dLat).toFixed(5)},latitude.lte.${(lat + dLat).toFixed(5)},longitude.gte.${(lng - dLng).toFixed(5)},longitude.lte.${(lng + dLng).toFixed(5)})`,
      )
    } else {
      query = query.ilike('island', island.name)
    }

    const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 3_000))
    const result = await Promise.race([query, timeout])
    if (!result || result.error || !result.data) return []

    const places: IslandPlace[] = result.data
      .filter(p => p.slug && p.name)
      .map(p => {
        const km = lat != null && lng != null && p.latitude != null && p.longitude != null
          ? haversineKm(lat, lng, p.latitude, p.longitude)
          : null
        const nameMatch = (p.island ?? '').trim().toLowerCase() === island.name.toLowerCase()
        return {
          slug: p.slug as string,
          name: p.name as string,
          type: p.type as string,
          description: (p.description as string | null) ?? null,
          km,
          onIsland: nameMatch || (km != null && km <= radius),
        }
      })
      .filter(p => p.onIsland || (p.km != null && p.km <= reach))

    places.sort((a, b) => {
      if (a.onIsland !== b.onIsland) return a.onIsland ? -1 : 1
      return (a.km ?? 0) - (b.km ?? 0)
    })
    return places.slice(0, limit)
  } catch {
    return []
  }
}

/** Avstånd för visning: "0,8 km" / "3 km". */
export function formatKm(km: number): string {
  return km < 10 ? `${km.toFixed(1).replace('.', ',')} km` : `${Math.round(km)} km`
}

/**
 * Tar bort platser ur databaslistan som redan finns i öns egen källbelagda
 * lista, eller som förekommer två gånger i databasen. Granskningen 2026-10-19
 * hittade "Tenan" och "Tenan Marstrand", "Johans krog Marstrand" och
 * "Johans Krog", "Hamnkrogen Marstrand" och "Hamnkrogen" på samma sida.
 * Jämförelsen tar bort önamnet, skiljetecken och versaler, och räknar två
 * namn som samma ställe om de blir lika eller om det ena (minst fem tecken)
 * ingår i det andra.
 */
export function normaliseraPlatsnamn(namn: string, oNamn: string): string {
  const o = oNamn.toLowerCase()
  return namn
    .toLowerCase()
    .replace(new RegExp(`\\b${o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?\\b`, 'g'), ' ')
    .replace(/[^a-z0-9åäöéü]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function sammaNamn(a: string, b: string): boolean {
  if (!a || !b) return false
  if (a === b) return true
  const [kort, lang] = a.length <= b.length ? [a, b] : [b, a]
  return kort.length >= 5 && lang.includes(kort)
}

export function utanDubbletter<T extends { name: string; slug?: string }>(
  platser: T[],
  kandaNamn: string[],
  oNamn: string,
): T[] {
  const sedda = kandaNamn.map(n => normaliseraPlatsnamn(n, oNamn)).filter(Boolean)
  const ut: T[] = []
  for (const p of platser) {
    const n = normaliseraPlatsnamn(p.name, oNamn)
    if (sedda.some(s => sammaNamn(s, n))) continue
    sedda.push(n)
    ut.push(p)
  }
  return ut
}

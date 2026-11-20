import { unstable_cache } from 'next/cache'
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

type Platsrad = {
  slug: string | null
  name: string | null
  type: string | null
  description: string | null
  island: string | null
  latitude: number | null
  longitude: number | null
}

/**
 * Alla synliga platser, hämtade EN gång och delade mellan alla ösidor
 * (2026-11-20).
 *
 * Före: varje undersida ställde en egen fråga per ö, cirka 870 frågor per
 * bygge. Med 126 byggen på ett dygn drev det Supabase över kvoten. Listan är
 * liten (cirka 560 rader, 190 kB), så den hämtas hel och filtreras här.
 *
 * Svaret sparas en timme, samma takt som ösidorna byggs om i. Ett fel kastas
 * i stället för att ge en tom lista, annars hade "inga platser" legat kvar i
 * en timme för alla öar.
 */
const hamtaAllaPlatser = unstable_cache(
  async (): Promise<Platsrad[]> => {
    const supabase = createPublicSupabaseClient()
    const { data, error } = await supabase
      .from('restaurants')
      .select('slug, name, type, description, island, latitude, longitude')
      .is('hidden_at', null)
      .order('slug', { ascending: true })
      .limit(5000)
    if (error) throw new Error(`islandPlaces: ${error.message}`)
    if (!data || data.length === 0) throw new Error('islandPlaces: tom platslista')
    return data as Platsrad[]
  },
  ['island-places-alla-v1'],
  { revalidate: 3600 },
)

/**
 * Väljer ut en ös platser ur hela listan. Ren funktion, testad för sig.
 * Samma regel som den gamla databasfrågan plus efterfiltret: rätt typ, och
 * antingen bär platsen öns namn eller ligger inom räckvidden (öns radie plus
 * extraKm) från öns mittpunkt.
 */
export function platserForO(
  alla: readonly Platsrad[],
  island: IslandLike,
  types: readonly string[],
  { extraKm = 2, limit = 12 }: { extraKm?: number; limit?: number } = {},
): IslandPlace[] {
  const coord = ISLAND_COORD_MAP[island.slug]
  const lat = island.lat ?? coord?.lat
  const lng = island.lng ?? coord?.lng
  const radius = coord?.radiusKm ?? 3
  const reach = radius + extraKm
  const typer = new Set(types)
  const oNamn = island.name.toLowerCase()

  const places: IslandPlace[] = []
  for (const p of alla) {
    if (!p.slug || !p.name || !p.type || !typer.has(p.type)) continue
    const km = lat != null && lng != null && p.latitude != null && p.longitude != null
      ? haversineKm(lat, lng, p.latitude, p.longitude)
      : null
    const nameMatch = (p.island ?? '').trim().toLowerCase() === oNamn
    const onIsland = nameMatch || (km != null && km <= radius)
    if (!onIsland && !(km != null && km <= reach)) continue
    places.push({ slug: p.slug, name: p.name, type: p.type, description: p.description ?? null, km, onIsland })
  }

  places.sort((a, b) => {
    if (a.onIsland !== b.onIsland) return a.onIsland ? -1 : 1
    return (a.km ?? 0) - (b.km ?? 0)
  })
  return places.slice(0, limit)
}

export async function getIslandPlaces(
  island: IslandLike,
  types: string[],
  opts: { extraKm?: number; limit?: number } = {},
): Promise<IslandPlace[]> {
  try {
    const timeout = new Promise<null>(resolve => setTimeout(() => resolve(null), 3_000))
    const alla = await Promise.race([hamtaAllaPlatser(), timeout])
    if (!alla) return []
    return platserForO(alla, island, types, opts)
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

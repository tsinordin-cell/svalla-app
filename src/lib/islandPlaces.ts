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
 * En plats räknas som "på ön" om dess ö-fält är öns namn. Ett ifyllt ö-fält
 * med en annan ös namn gör att platsen INTE räknas som på ön, även inom radien:
 * Rånökällan (ö-fält Rånö) på Utö, krogarna på Donsö och Brännö på Styrsö,
 * Siaröfortet (Kyrkogårdsön) på Ljusterö, Teno (Bogesundslandet) och
 * fästningskaféet (Kastellet) på Vaxholm (mallarnas runda 5, 2026-11-10; Vaktens
 * lista). Bara en plats utan ö-fält räknas efter avståndet: inom platsradien
 * (islandCoords platsRadieKm, annars radiusKm) är den på ön. Platser strax
 * utanför tas med som "i närheten" med avstånd fågelvägen, så att besökaren
 * ser att de inte ligger på själva ön.
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

/**
 * Ö-fält i platsdatabasen som betyder samma ö, fast namnet skiljer sig från
 * ösidans (utöver versaler och diakritiska tecken, som "Moja" för Möja).
 * Varje rad är belagd; utan dem hade platser på ön flyttats till "i närheten".
 */
const OFALT_SOM_GALLER_ON: Record<string, string[]> = {
  // Ösidan Möja gäller båda huvudöarna. KÄLLA: https://www.varmdo.se/download/18.15c854f417f448919aea0f76/1649062023495/Mo%CC%88ja.pdf — "Huvudöarna Möja och Södermöja har cirka 250 bofasta" (läst 2026-11-10)
  moja: ['Södermöja'],
  // Birka ligger på Björkö. KÄLLA: https://www.raa.se/evenemang/upplev-kulturarvet/varldsarv-i-sverige/alla-varldsarv-i-sverige/birka-och-hovgarden/ — "Birka på Björkö i Mälaren var själva knutpunkten i det rika Mälardalen under vikingatiden." (läst 2026-11-10)
  birka: ['Björkö'],
  // Stavfel i platsdatabasen (två platser 0,3 km från Nämdös nål). Lantmäteriet har ingen ö "Nämndö", bara Nämndögatan i Helsingborg.
  // KÄLLA: https://minkarta.lantmateriet.se/api/searchservice/searchinput?&searchtext=N%C3%A4mnd%C3%B6 — "Nämndögatan 3", "Helsingborg | Rydebäck" (läst 2026-11-10). Raden tas bort när ö-fältet är rättat i databasen.
  namdo: ['Nämndö'],
}

function utanDiakrit(s: string): string {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').trim().toLowerCase()
}

/**
 * Vad platsens ö-fält säger om ön: 'samma' (öns namn eller ett belagt namn för
 * samma ö), 'annan' (en annan ö eller ort) eller 'tomt'.
 */
export function ofaltMotOn(ofalt: string | null | undefined, island: { slug: string; name: string }): 'samma' | 'annan' | 'tomt' {
  const f = utanDiakrit(ofalt ?? '')
  if (!f) return 'tomt'
  const namn = [island.name, ...(OFALT_SOM_GALLER_ON[island.slug] ?? [])].map(utanDiakrit)
  return namn.includes(f) ? 'samma' : 'annan'
}

/** Platslistans radie: platsRadieKm om ön har en, annars GPS-radien, annars 3 km. */
export function platsRadie(coord?: { radiusKm?: number; platsRadieKm?: number }): number {
  return coord?.platsRadieKm ?? coord?.radiusKm ?? 3
}

/** Är platsen på ön? Ö-fältet går före avståndet; bara en plats utan ö-fält räknas efter radien. */
export function arPaOn(ofalt: 'samma' | 'annan' | 'tomt', km: number | null, radie: number): boolean {
  if (ofalt === 'samma') return true
  if (ofalt === 'annan') return false
  return km != null && km <= radie
}

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
 * extraKm) från öns mittpunkt. Ö-fältet går före avståndet (arPaOn, se ovan),
 * och urval gäller före sortering och gränsen på antal.
 */
export function platserForO(
  alla: readonly Platsrad[],
  island: IslandLike,
  types: readonly string[],
  {
    extraKm = 2,
    limit = 12,
    urval,
  }: {
    extraKm?: number
    limit?: number
    /** Urval före sortering och gränsen på antal, t.ex. bara krogar vars namn säger att de har rum (boendesidan). */
    urval?: (p: { name: string; type: string }) => boolean
  } = {},
): IslandPlace[] {
  const coord = ISLAND_COORD_MAP[island.slug]
  const lat = island.lat ?? coord?.lat
  const lng = island.lng ?? coord?.lng
  const radius = platsRadie(coord)
  const reach = radius + extraKm
  const typer = new Set(types)

  const places: IslandPlace[] = []
  for (const p of alla) {
    if (!p.slug || !p.name || !p.type || !typer.has(p.type)) continue
    const km = lat != null && lng != null && p.latitude != null && p.longitude != null
      ? haversineKm(lat, lng, p.latitude, p.longitude)
      : null
    const onIsland = arPaOn(ofaltMotOn(p.island, island), km, radius)
    if (!onIsland && !(km != null && km <= reach)) continue
    if (urval && !urval({ name: p.name, type: p.type })) continue
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
  opts: { extraKm?: number; limit?: number; urval?: (p: { name: string; type: string }) => boolean } = {},
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
 * Jämförelsen tar bort önamnet, skiljetecken, versaler och diakritiska tecken,
 * och räknar två namn som samma ställe om de blir lika eller om det ena (minst
 * fem tecken) ingår i det andra. Diakritiska tecken räknas inte sedan mallarnas
 * runda 6 (2026-11-16, ma5014): "Nåttarö Krog" och "Nattaro Krog" stod båda i
 * FAQ-svaret, eftersom önamnet bara togs bort ur det ena.
 */
export function normaliseraPlatsnamn(namn: string, oNamn: string): string {
  const o = utanDiakrit(oNamn)
  return utanDiakrit(namn)
    .replace(new RegExp(`(?<![a-z0-9])${o.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}s?(?![a-z0-9])`, 'g'), ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

/**
 * Ord som inte skiljer ett ställe från ett annat (gästhamn, krog, vandrarhem …). Ett namn som efter att önamnet tagits
 * bort bara består av sådana ord ("Donsö gästhamn" blir "gasthamn") är generiskt, och för det gäller en snävare regel i
 * sammaStalle (mallarnas runda 6, 2026-11-16). Sjömack räknas inte hit: Utö Gästhamns sjömack är en egen post.
 */
const GENERISKA_ORD = new Set([
  'gasthamn', 'gasthamnen', 'hamn', 'hamnen', 'brygga', 'bryggan', 'batklubb', 'batklubben', 'marina', 'marinan',
  'krog', 'krogen', 'sjokrog', 'hamnkrog', 'kafe', 'cafe', 'restaurang', 'restaurangen', 'vardshus', 'vardshuset',
  'hotell', 'hotellet', 'hotel', 'camping', 'campingen', 'vandrarhem', 'vandrarhemmet', 'stf', 'bastu', 'bastun', 'badplats',
  'badplatsen', 'bageri', 'bageriet', 'kiosk', 'kiosken', 'lanthandel', 'lanthandeln', 'handelsbod', 'handelsboden', 'butik',
  'bar', 'baren', 'pub', 'bistro', 'stugor', 'stugby', 'pensionat', 'gastgiveri', 'rokeri', 'rokeriet', 'och', 'ab', 'i', 'pa',
])
const generiskt = (ord: string[]) => ord.every(o => GENERISKA_ORD.has(o))

/**
 * Är databasens namn db samma ställe som kand (ett känt namn: öns egen post eller ett tidigare ställe i listan)? Båda är
 * normaliserade. Lika namn är samma ställe. Annars måste det kortare namnet (minst fem tecken) ingå i det längre, och:
 *  - har det kortare namnet ett eget ord ("tenan" i "tenan marstrand", "bakficka" i "bakfickan") räcker det, som förut;
 *  - är det generiskt ("gasthamn") gäller det bara en plats på ön (paOn), och bara när det längre namnet är det kända
 *    ("Grinda Gästhamn" i databasen är ödatans "Grinda Gästhamn (Hemviken)") eller databasnamnets extra ord också är
 *    generiska ("STF Vandrarhem Landsort" är "Landsorts Vandrarhem"). Så står "Vrångö gästhamn" kvar på Donsös hamnsida
 *    ("i närheten"), och "Gästhamn Sandudden Utö" slås inte ihop med Utö Gästhamn.
 * kandArOdata: kand är öns egen post (inte ett tidigare ställe ur databasen).
 */
function sammaStalle(kand: string, db: string, paOn: boolean, kandArOdata: boolean): boolean {
  if (!kand || !db) return false
  if (kand === db) return true
  const [kort, lang] = kand.length <= db.length ? [kand, db] : [db, kand]
  if (kort.length < 5 || !lang.includes(kort)) return false
  const kortOrd = kort.split(' ')
  if (!generiskt(kortOrd)) return true
  if (!paOn || !kandArOdata) return false
  if (lang === kand) return true
  return generiskt(lang.split(' ').filter(o => !kortOrd.includes(o)))
}

/**
 * Platserna utan dem som redan finns bland kandaNamn eller kandaSluggar, eller tidigare i listan. Sluggen jämförs
 * också: ödatans "Bakfickan Utö" (bakfickan-uto) och databasens "Bakfickan Uto" med samma slug är samma ställe
 * (mallarnas runda 6, 2026-11-16, ma5013 och ma5014). Namnen jämförs med sammaStalle.
 */
export function utanDubbletter<T extends { name: string; slug?: string; onIsland?: boolean }>(
  platser: T[],
  kandaNamn: string[],
  oNamn: string,
  kandaSluggar: (string | undefined)[] = [],
): T[] {
  const kanda = kandaNamn.map(n => normaliseraPlatsnamn(n, oNamn)).filter(Boolean)
  const tidigare: string[] = []
  const sluggar = new Set(kandaSluggar.filter(Boolean))
  const ut: T[] = []
  for (const p of platser) {
    const n = normaliseraPlatsnamn(p.name, oNamn)
    const paOn = p.onIsland !== false
    if ((p.slug && sluggar.has(p.slug)) || kanda.some(k => sammaStalle(k, n, paOn, true)) || tidigare.some(t => sammaStalle(t, n, paOn, false))) continue
    tidigare.push(n)
    if (p.slug) sluggar.add(p.slug)
    ut.push(p)
  }
  return ut
}

/**
 * Krogar, kaféer och barer ur platsdatabasen som inte redan står i öns egen lista: restaurangsidans urval.
 * Ösidans FAQ och med barn-sidan använder samma urval, så att alla tre räknar lika (full-20 k084; mallarnas
 * runda 5, 2026-11-10; med barn-sidan i runda 6, 2026-11-16, ma5013). Samma ställe känns igen på slug och på
 * namn utan diakritiska tecken (utanDubbletter).
 */
export async function krogarIDatabasen(
  island: IslandLike & { restaurants: { name: string; slug?: string }[] },
): Promise<IslandPlace[]> {
  return utanDubbletter(
    await getIslandPlaces(island, ['restaurant', 'cafe', 'bar'], { extraKm: 0.5 }),
    island.restaurants.map(r => r.name),
    island.name,
    island.restaurants.map(r => r.slug),
  )
}

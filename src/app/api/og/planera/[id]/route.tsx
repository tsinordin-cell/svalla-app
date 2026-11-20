import { createPublicSupabaseClient } from '@/lib/supabase-server'
import { haversineKm } from '@/lib/planner'
import type { Punkt } from '@/lib/dela-klistermarken'
import { ritaOgKort, OgRutt, OgStartMal, type OgTal } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600

const INTRESSEN: Record<string, string> = {
  krog: 'Krog', bastu: 'Bastu', bad: 'Bad', brygga: 'Brygga', natur: 'Natur', bensin: 'Bränsle',
}

/**
 * Länkförhandsvisning för en planerad rutt (/planera/[id]). Gemensam mall
 * (../../_mall/kort.tsx), 2026-11-19. Gav 500 i produktion före det (mätt
 * 2026-11-19 på /api/og/planera/2ad6f0af…), så varje delad rutt saknade bild.
 *
 * Sjöleden (cached_path) ritas i högerpanelen och dess längd visas i NM. Finns
 * ingen beräknad led: rak linje mellan start och mål och avståndet fågelvägen.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createPublicSupabaseClient()

  // Genom funktionen planerad_rutt (2026-11-20): tabellen går bara att läsa för ägaren.
  const { data: ruttRad } = await supabase.rpc('planerad_rutt', { p_id: id }).maybeSingle()
  const route = ruttRad as {
    start_name: string; end_name: string
    start_lat: number; start_lng: number; end_lat: number; end_lng: number
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    interests: string[] | null; suggested_stops: any; cached_path: unknown
  } | null

  if (!route) {
    return ritaOgKort({ etikett: 'Planerad rutt', rubrik: 'Planera en tur', adress: 'svalla.se/planera' }, { status: 404 })
  }

  const led: Punkt[] = Array.isArray(route.cached_path)
    ? (route.cached_path as unknown[])
        .filter((p): p is [number, number] => Array.isArray(p) && typeof p[0] === 'number' && typeof p[1] === 'number')
        .map(([lat, lng]) => ({ lat, lng }))
    : []

  const tal: OgTal[] = []
  if (led.length >= 2) {
    let km = 0
    for (let i = 1; i < led.length; i++) km += haversineKm(led[i - 1]!.lat, led[i - 1]!.lng, led[i]!.lat, led[i]!.lng)
    tal.push({ val: (km / 1.852).toFixed(1).replace('.', ','), enhet: 'NM', etikett: 'SJÖLEDEN' })
  } else {
    tal.push({ val: String(Math.round(haversineKm(route.start_lat, route.start_lng, route.end_lat, route.end_lng))), enhet: 'km', etikett: 'FÅGELVÄGEN' })
  }
  const stopp = Array.isArray(route.suggested_stops) ? (route.suggested_stops as unknown[]).length : 0
  if (stopp > 0) tal.push({ val: String(stopp), etikett: 'STOPP' })

  const intressen = (Array.isArray(route.interests) ? route.interests as string[] : [])
    .map(i => INTRESSEN[i]).filter(Boolean).slice(0, 4) as string[]

  const rutt = led.length >= 2 ? <OgRutt pts={led} /> : null
  return ritaOgKort({
    etikett: 'Planerad rutt',
    rubrik: `${route.start_name ?? 'Start'} → ${route.end_name ?? 'Mål'}`,
    under: intressen,
    tal,
    hoger: rutt ?? <OgStartMal />,
    adress: 'svalla.se/planera',
  })
}

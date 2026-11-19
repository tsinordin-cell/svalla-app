import { createClient } from '@/lib/supabase'
import { platsRubrik, datumLang, formatTid, ruttArAnvandbar, type Punkt } from '@/lib/dela-klistermarken'
import { hamtaFoto } from '../../share/tur/[id]/rita'
import { ritaOgKort, OgRutt, OG_W, OG_H, type OgTal } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600 // 1 h: sociala medier cachar OG-bilder länge ändå

/**
 * Länkförhandsvisningen för en tur (1200×630, WhatsApp, iMessage, Facebook, X).
 * Ritas med den gemensamma mallen i ../../_mall/kort.tsx (2026-11-19).
 * Fotot fyller hela bilden (EXIF-roterat via hamtaFoto, bara egen lagring),
 * annars rutten till höger, annars seglet.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createClient()

  const { data: trip } = await supabase
    .from('trips')
    .select('user_id, location_name, start_location, distance, duration, duration_seconds, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating, image')
    .eq('id', id)
    .single()

  const { data: userRow } = trip
    ? await supabase.from('users').select('username').eq('id', trip.user_id).single()
    : { data: null }

  // Korta platsnamn: "Sollenkroka → Möja", inte "Sollenkroka ö, Stockholms län, Sverige → …"
  const plats = trip
    ? platsRubrik({ start_location: trip.start_location, location_name: trip.location_name, boat_type: trip.boat_type })
    : 'Svalla'
  // "Annat" är förvalet när ingen båttyp valts och ser ut som ett formulärsvar.
  const bat = trip?.boat_type && trip.boat_type !== 'Annat' ? trip.boat_type : null

  const sek = trip ? (trip.duration_seconds ?? (trip.duration > 0 ? trip.duration * 60 : null)) : null
  const tal: OgTal[] = []
  if (trip && trip.distance >= 0.1) tal.push({ val: trip.distance.toFixed(1).replace('.', ','), enhet: 'NM', etikett: 'DISTANS' })
  if (sek !== null && sek >= 60) tal.push({ val: formatTid(sek), etikett: 'TID' })
  if ((trip?.average_speed_knots ?? 0) >= 0.1) tal.push({ val: (trip!.average_speed_knots ?? 0).toFixed(1).replace('.', ','), enhet: 'kn', etikett: 'SNITTFART' })
  if ((trip?.max_speed_knots ?? 0) >= 0.1) tal.push({ val: (trip!.max_speed_knots ?? 0).toFixed(1).replace('.', ','), enhet: 'kn', etikett: 'TOPPFART' })

  const rutt = trip && ruttArAnvandbar(trip.route_points as Punkt[] | null) ? (trip.route_points as Punkt[]) : null
  const fotoUrl = typeof trip?.image === 'string' ? trip.image : null
  const foto = fotoUrl ? await hamtaFoto(fotoUrl, OG_W, OG_H) : null

  return ritaOgKort({
    rubrik: plats,
    under: [bat, datumLang(trip?.started_at)],
    markering: trip?.pinnar_rating === 3 ? 'Magisk tur' : null,
    tal,
    avsandare: trip ? (userRow?.username ?? 'Seglare') : null,
    foto,
    hoger: rutt ? <OgRutt pts={rutt} /> : null,
  })
}

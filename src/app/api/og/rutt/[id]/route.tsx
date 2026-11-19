import { createPublicSupabaseClient } from '@/lib/supabase-server'
import type { Punkt } from '@/lib/dela-klistermarken'
import { ritaOgKort, OgRutt } from '../../_mall/kort'

export const runtime = 'nodejs'
export const revalidate = 3600

/**
 * Länkförhandsvisning för färdiga rutter (/rutter/[id], tabellen tours). Ny
 * 2026-11-19. Före det visade delade rutter omslagsbilden, som för alla 13
 * rutter är en stockbild från Unsplash (en våg, inte platsen), och annars
 * /og-image.jpg. Nu rutten genom waypoints i högerpanelen, gemensam mall.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = createPublicSupabaseClient()
  const { data } = await supabase
    .from('tours')
    .select('title, usp, start_location, destination, duration_label, waypoints')
    .eq('id', id)
    .maybeSingle()

  if (!data) {
    return ritaOgKort({ etikett: 'Rutt', rubrik: 'Rutter i skärgården', adress: 'svalla.se/rutter' }, { status: 404 })
  }

  const pts: Punkt[] = Array.isArray(data.waypoints)
    ? (data.waypoints as { lat?: unknown; lng?: unknown }[])
        .filter(w => typeof w?.lat === 'number' && typeof w?.lng === 'number')
        .map(w => ({ lat: w.lat as number, lng: w.lng as number }))
    : []

  return ritaOgKort({
    etikett: 'Rutt',
    rubrik: data.title,
    under: [data.start_location && data.destination ? `${data.start_location} → ${data.destination}` : null, data.duration_label],
    ingress: data.usp,
    hoger: pts.length >= 2 ? <OgRutt pts={pts} /> : null,
    adress: 'svalla.se/rutter',
  })
}

import { ImageResponse } from 'next/og'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import { Buffer } from 'buffer'
import { arStil, stil } from '@/lib/dela-klistermarken'
import { ogTypsnitt } from '../../../_typsnitt/typsnitt'
import { unstable_cache } from 'next/cache'
import { createHash } from 'crypto'
import sharp from 'sharp'
import { tripCacheTag } from '@/lib/trip-cache'
import { ritaBild, BILD_VERSION, type TripRad } from './rita'
import type { StilId } from '@/lib/dela-klistermarken'
import type { GpsPoint } from '@/lib/gps'

export const runtime = 'nodejs'
export const revalidate = 0

// Själva ritandet ligger i rita.tsx (delas med scripts/dela-forhandsvisning.tsx).

// ── Route handler ──────────────────────────────────────────────────────────

/**
 * Bilden hämtas genom RLS (privata turer bara för ägaren), ritas en gång och
 * cachas per tur, mall och innehåll (2026-10-26, Thomas: korten laddade
 * långsamt). Kort utan genomskinlighet blir JPEG (kartkortet 1,7 MB → ca 0,3
 * MB); klistermärken förblir PNG. Cachen töms med samma tagg som tursidan när
 * turen ändras (/api/revalidate-feed), och nyckeln bär ett avtryck av
 * innehållet som skyddsnät. Delsträckor bygger på gps_points, som bara ägaren
 * får läsa, och cachas därför bara för ägaren.
 */
export async function GET(
 req: Request,
 { params }: { params: Promise<{ id: string }> }
) {
 const { id } = await params
 const begard = new URL(req.url).searchParams.get('style')
 const style: StilId = arStil(begard) ? begard : 'photo'

 const supabase = await createClient()

 const { data: trip } = await supabase
 .from('trips')
 .select('user_id, location_name, start_location, distance, duration, duration_seconds, max_speed_knots, average_speed_knots, boat_type, route_points, started_at, pinnar_rating, image, images')
 .eq('id', id)
 .single()
 if (!trip) return new Response('Turen finns inte', { status: 404 })

 const { data: userRow } = await supabase.from('users').select('username').eq('id', trip.user_id).single()
 const username = userRow?.username ?? 'Seglare'

 let punkter: GpsPoint[] = []
 let agare = false
 if (style === 'delstrackor') {
 const { data: { user } } = await supabase.auth.getUser()
 agare = !!user && user.id === trip.user_id
 if (!agare) return new Response('Delsträckor visas bara för den som loggade turen', { status: 404 })
 const { data: rows } = await supabase
 .from('gps_points')
 .select('latitude, longitude, speed_knots, heading, recorded_at')
 .eq('trip_id', id)
 .order('recorded_at', { ascending: true })
 .limit(20000)
 punkter = (rows ?? []).map(r => ({
 lat: r.latitude as number, lng: r.longitude as number,
 speedKnots: (r.speed_knots ?? 0) as number, heading: (r.heading ?? null) as number | null,
 accuracy: 0, recordedAt: r.recorded_at as string,
 }))
 }

 const avtryck = createHash('sha1').update(JSON.stringify([trip, username, punkter.length])).digest('hex').slice(0, 12)
 const bild = await unstable_cache(
 async () => {
 const fonts = await ogTypsnitt()
 const res = await ritaBild({ trip: trip as TripRad, username, punkter, style, fonts })
 if (!(res instanceof ImageResponse)) return { status: res.status, text: await res.text() }
 const png = Buffer.from(await res.arrayBuffer())
 const klister = stil(style).klistermarke
 const ut = klister ? png : await sharp(png).jpeg({ quality: 86, mozjpeg: true }).toBuffer()
 return { status: 200, b64: ut.toString('base64'), typ: klister ? 'image/png' : 'image/jpeg' }
 },
 ['share-bild', BILD_VERSION, id, style, avtryck, agare ? 'agare' : 'alla'],
 { tags: [tripCacheTag(id)], revalidate: 86400 },
 )()

 if (bild.status !== 200 || !bild.b64) return new Response(bild.text ?? 'Kunde inte rita bilden', { status: bild.status })
 return new Response(Buffer.from(bild.b64, 'base64'), {
 headers: { 'Content-Type': bild.typ ?? 'image/png', 'Cache-Control': 'private, max-age=3600' },
 })
}

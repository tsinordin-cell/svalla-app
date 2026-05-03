import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import webpush from 'web-push'

/**
 * POST /api/trips/[id]/highlight
 *
 * Body: {
 *   place_slug: string,
 *   place_name: string,
 *   place_type?: string,
 *   island?: string,
 *   lat?: number,
 *   lng?: number,
 *   note?: string,
 * }
 *
 * Skapar en `trip_highlights`-rad för turen + triggar push-notiser till
 * användare som sparat platsen via `place_saves` (peer-närvaro-loopen).
 *
 * Säkerhet: kräver inloggad användare som ÄGER turen (RLS).
 */
export async function POST(req: Request, ctx: { params: Promise<{ id: string }> }) {
  const { id: tripId } = await ctx.params

  let body: {
    place_slug?: string
    place_name?: string
    place_type?: string
    island?: string
    lat?: number
    lng?: number
    note?: string
  }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  if (!body.place_slug || !body.place_name) {
    return NextResponse.json({ error: 'place_slug och place_name krävs' }, { status: 400 })
  }
  if (body.note && body.note.length > 200) {
    return NextResponse.json({ error: 'Notering max 200 tecken' }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Logga in' }, { status: 401 })

  // Verifiera ägarskap (RLS skulle ändå blockera men ger bättre felmeddelande)
  const { data: trip } = await supabase
    .from('trips')
    .select('id, user_id')
    .eq('id', tripId)
    .single()
  if (!trip) return NextResponse.json({ error: 'Tur hittades inte' }, { status: 404 })
  if (trip.user_id !== user.id) return NextResponse.json({ error: 'Inte din tur' }, { status: 403 })

  // Upsert: en höjdpunkt per tur (unique index på trip_id)
  // Vi gör DELETE + INSERT för att få ren ersättning om användaren ändrar sig.
  await supabase.from('trip_highlights').delete().eq('trip_id', tripId)

  const { data: hl, error } = await supabase
    .from('trip_highlights')
    .insert({
      trip_id: tripId,
      user_id: user.id,
      place_slug: body.place_slug,
      place_name: body.place_name,
      place_type: body.place_type ?? null,
      island: body.island ?? null,
      lat: body.lat ?? null,
      lng: body.lng ?? null,
      note: body.note?.slice(0, 200) ?? null,
    })
    .select('id')
    .single()

  if (error) {
    return NextResponse.json({ error: 'Kunde inte spara: ' + error.message }, { status: 500 })
  }

  // ── Push-trigger: notifiera följare som sparat platsen ─────────────────────
  // Bästa-effort, fail-silent — användarens spara-flöde får inte blockeras.
  try {
    await notifyPlaceSavers(body.place_slug, body.place_name, user.id)
  } catch {
    /* tyst */
  }

  return NextResponse.json({ id: hl.id })
}

async function notifyPlaceSavers(placeSlug: string, placeName: string, byUserId: string) {
  const admin = getAdminClient()

  // Hitta användare som har sparat platsen (exklusive höjdpunkt-skaparen själv)
  const { data: savers } = await admin
    .from('place_saves')
    .select('user_id')
    .eq('place_slug', placeSlug)
    .neq('user_id', byUserId)

  if (!savers?.length) return

  const userIds = [...new Set(savers.map(s => s.user_id))]

  // Hämta push-subscriptions för dessa
  const { data: subs } = await admin
    .from('push_subscriptions')
    .select('user_id, endpoint, p256dh, auth')
    .in('user_id', userIds)

  if (!subs?.length) return

  // Hämta avsändarens namn för notistext
  const { data: senderRow } = await admin
    .from('users')
    .select('username')
    .eq('id', byUserId)
    .single()
  const senderName = senderRow?.username ?? 'Någon'

  webpush.setVapidDetails(
    'mailto:info@svalla.se',
    process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
    process.env.VAPID_PRIVATE_KEY!,
  )

  const payload = JSON.stringify({
    title: `${senderName} just nu på ${placeName}`,
    body: 'En plats du sparat — färska intryck i feeden.',
    url: `/plats/${placeSlug}`,
    tag: `highlight-${placeSlug}`,
  })

  await Promise.allSettled(
    subs.map(s =>
      webpush.sendNotification(
        { endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } },
        payload,
      ),
    ),
  )
}

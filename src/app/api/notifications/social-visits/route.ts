/**
 * Social-visit notifieringar — cron som körs en gång per dag.
 *
 * Hittar visited_islands skapade senaste 25 h. För varje besök:
 *  - Hitta följare av besökaren
 *  - Insert in-app notification (type='friend_visit')
 *  - Skicka push: "{username} besökte {island}"
 *
 * Idempotens: kollar att vi inte redan skapat notif för (user, actor, related_id).
 *
 * Trigger: Vercel cron (User-Agent: vercel-cron) eller Bearer ${CRON_SECRET}.
 */

import { NextResponse } from 'next/server'
import { cronBehorig } from '@/lib/cronAuth'
import { getAdminClient } from '@/lib/supabase-admin'
import { sendPushToUsers } from '@/lib/push-server'
import { notifyWithRetry } from '@/lib/notifyWithRetry'
import { oNamn } from '@/lib/oNamn'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(req: Request)  { return handle(req) }
export async function POST(req: Request) { return handle(req) }

async function handle(req: Request) {
  // Behörighet: se src/lib/cronAuth.ts (User-Agent går att förfalska).
  if (!cronBehorig(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const svc = getAdminClient()

  // Slå upp ö-namn för slugs

  // Senaste 25 timmars besök
  const since = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
  const { data: allaBesok, error: visitsError } = await svc
    .from('visited_islands')
    .select('id, user_id, island_slug, visited_at, fran_tur, trip_id')
    .gte('visited_at', since)
    .limit(1000)

  if (visitsError) {
    return NextResponse.json({ error: visitsError.message }, { status: 500 })
  }

  // INTEGRITET (2026-11-20): routen läser med service-nyckeln, som går förbi
  // RLS. Ett besök som kom från en privat eller raderad tur skickades därför
  // som "{namn} besökte {ö}" till alla följare. Nu bara besök som andra ändå
  // får se: markerade för hand, eller från en publik, klar, ej raderad tur
  // (samma villkor som RLS-policyn visited_islands_select_all och trips_select_visible).
  const turIds = [...new Set((allaBesok ?? []).filter(v => v.fran_tur && v.trip_id).map(v => v.trip_id as string))]
  const { data: synligaTurer } = turIds.length > 0
    ? await svc.from('trips').select('id').in('id', turIds).eq('visibility', 'public').eq('status', 'done').is('deleted_at', null)
    : { data: [] as { id: string }[] }
  const synliga = new Set((synligaTurer ?? []).map(t => t.id as string))
  const visits = (allaBesok ?? []).filter(v => !v.fran_tur || (v.trip_id !== null && synliga.has(v.trip_id as string)))

  if (!visits || visits.length === 0) {
    return NextResponse.json({ ok: true, processed: 0, notified: 0 })
  }

  // Slå upp aktörens username (för push)
  const visitorIds = [...new Set(visits.map(v => v.user_id))]
  const { data: visitorRows } = await svc
    .from('users')
    .select('id, username')
    .in('id', visitorIds)
  const visitorByName = new Map((visitorRows ?? []).map(u => [u.id as string, u.username as string]))

  // Batch-hämta alla follows för alla besökare — eliminerar N+1
  const { data: allFollows } = await svc
    .from('follows')
    .select('follower_id, following_id')
    .in('following_id', visitorIds)
  const followersByUserId = new Map<string, string[]>()
  for (const f of allFollows ?? []) {
    const arr = followersByUserId.get(f.following_id as string) ?? []
    arr.push(f.follower_id as string)
    followersByUserId.set(f.following_id as string, arr)
  }

  // Batch-hämta befintliga today-notiser för alla möjliga mottagare — eliminerar N+1
  const today0 = new Date()
  today0.setHours(0, 0, 0, 0)
  const allFollowerIds = [...new Set((allFollows ?? []).map(f => f.follower_id as string))]
  const { data: existingNotifs } = allFollowerIds.length > 0
    ? await svc
        .from('notifications')
        .select('user_id, actor_id')
        .eq('type', 'friend_visit')
        .in('user_id', allFollowerIds)
        .gte('created_at', today0.toISOString())
    : { data: [] }
  const alreadyNotifiedKey = new Set(
    (existingNotifs ?? []).map(r => `${r.actor_id as string}:${r.user_id as string}`)
  )

  let processed = 0
  let totalNotified = 0
  const errors: string[] = []

  for (const v of visits) {
    processed++
    const islandName = oNamn(v.island_slug)
    const username = visitorByName.get(v.user_id) ?? 'Någon du följer'

    const followerIds = followersByUserId.get(v.user_id) ?? []
    if (followerIds.length === 0) continue

    const toNotify = followerIds.filter(id => !alreadyNotifiedKey.has(`${v.user_id}:${id}`))
    if (toNotify.length === 0) continue

    // Insert in-app notifications
    const { error: insErr } = await svc.from('notifications').insert(
      toNotify.map(uid => ({
        user_id: uid,
        actor_id: v.user_id,
        type: 'friend_visit',
        related_island_slug: v.island_slug,
        read: false,
      }))
    )
    if (insErr) {
      errors.push(`notify-insert: ${insErr.message}`)
      continue
    }
    // Markera dessa som notifierade inom denna cron-körning
    toNotify.forEach(uid => alreadyNotifiedKey.add(`${v.user_id}:${uid}`))

    // Push — med retry + Sentry på slutgiltigt misslyckande
    await notifyWithRetry('social-visit-push', () =>
      sendPushToUsers(toNotify, {
        title: `${username} besökte ${islandName}`,
        body: `Har du varit där? Logga ditt besök så ser dina vänner det.`,
        url: `https://svalla.se/o/${v.island_slug}`,
      })
    ).catch(e => {
      errors.push(`push: ${e instanceof Error ? e.message : 'unknown'}`)
    })

    totalNotified += toNotify.length
  }

  return NextResponse.json({
    ok: true,
    processed,
    notified: totalNotified,
    errors: errors.slice(0, 5),
  })
}

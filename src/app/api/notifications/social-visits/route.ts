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
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendPushToUsers } from '@/lib/push-server'
import { ALL_ISLANDS } from '@/app/o/island-data'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(req: Request)  { return handle(req) }
export async function POST(req: Request) { return handle(req) }

async function handle(req: Request) {
  const ua = req.headers.get('user-agent') || ''
  const isVercelCron = ua.toLowerCase().includes('vercel-cron')
  const auth = req.headers.get('authorization') || ''
  const isBearerAuthed = !!process.env.CRON_SECRET && auth === `Bearer ${process.env.CRON_SECRET}`
  if (!isVercelCron && !isBearerAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const svc = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  // Slå upp ö-namn för slugs
  const islandNameBySlug = new Map(ALL_ISLANDS.map(i => [i.slug, i.name]))

  // Senaste 25 timmars besök
  const since = new Date(Date.now() - 25 * 60 * 60 * 1000).toISOString()
  const { data: visits, error: visitsError } = await svc
    .from('visited_islands')
    .select('id, user_id, island_slug, visited_at')
    .gte('visited_at', since)
    .limit(1000)

  if (visitsError) {
    return NextResponse.json({ error: visitsError.message }, { status: 500 })
  }

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
    const islandName = islandNameBySlug.get(v.island_slug) ?? v.island_slug
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

    // Push
    try {
      await sendPushToUsers(toNotify, {
        title: `${username} besökte ${islandName}`,
        body: `Har du varit där? Logga ditt besök så ser dina vänner det.`,
        url: `https://svalla.se/o/${v.island_slug}`,
      })
    } catch (e) {
      errors.push(`push: ${e instanceof Error ? e.message : 'unknown'}`)
    }

    totalNotified += toNotify.length
  }

  return NextResponse.json({
    ok: true,
    processed,
    notified: totalNotified,
    errors: errors.slice(0, 5),
  })
}

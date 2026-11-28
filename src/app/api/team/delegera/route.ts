export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { adminRad } from '@/lib/adminRad'
import { notifyWithRetry } from '@/lib/notifyWithRetry'
import { sendEmail } from '@/lib/email'
import {
  UPPGIFT_NOTIS_TYP, UPPGIFT_DUBBLETT_MIN, skaNotifiera, sakerTitel, uppgiftPush, uppgiftLank,
} from '@/lib/uppgiftsnotis'

// Visningsnamn i notisen. Samma som på /team (src/app/team/page.tsx), som inte
// byter användarnamnet på sajten.
const NAMN: Record<string, string> = { tsinordin: 'Tom', matte: 'Max', claes: 'Claes' }

/**
 * POST /api/team/delegera  { taskId }
 *
 * Anropas av /team efter att en uppgift fått en ny mottagare (2026-11-28, Toms ja).
 * Servern litar inte på vad webbläsaren säger om mottagaren: den läser uppgiften
 * och skickar bara om
 *  - den som anropar är i teamet (is_admin_user),
 *  - uppgiften har en mottagare som är någon annan och som också är i teamet,
 *  - samma uppgift inte gett samma person en notis de senaste 10 minuterna.
 * Då skapas en notis i klockan, en push (om mottagaren har push på) och ett mejl.
 */
export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })

  const { data: adm } = await adminRad(supabase)
  if (!adm?.is_admin) return NextResponse.json({ error: 'Bara för teamet' }, { status: 403 })

  const body = await req.json().catch(() => ({}))
  const taskId = typeof body?.taskId === 'string' ? body.taskId : ''
  if (!/^[0-9a-f-]{36}$/i.test(taskId)) return NextResponse.json({ error: 'Ogiltig uppgift' }, { status: 400 })

  const svc = getAdminClient()
  const { data: task } = await svc.from('team_tasks').select('id, title, assignee_id').eq('id', taskId).maybeSingle()
  if (!task) return NextResponse.json({ error: 'Uppgiften finns inte' }, { status: 404 })

  const mottagare = task.assignee_id as string | null
  if (!skaNotifiera(user.id, mottagare)) return NextResponse.json({ ok: true, skickat: false, orsak: 'ingen annan mottagare' })

  // Mottagaren måste vara i teamet. is_admin används bara som filter, läses aldrig ut
  // (src/lib/profilfaltGenomVyn.test.ts).
  const { data: till } = await svc.from('users').select('id').eq('id', mottagare!).eq('is_admin', true).maybeSingle()
  if (!till) return NextResponse.json({ ok: true, skickat: false, orsak: 'mottagaren är inte i teamet' })
  const { data: fran } = await svc.from('users').select('username').eq('id', user.id).maybeSingle()

  const sedan = new Date(Date.now() - UPPGIFT_DUBBLETT_MIN * 60_000).toISOString()
  const { data: nyss } = await svc.from('notifications').select('id')
    .eq('user_id', mottagare!).eq('type', UPPGIFT_NOTIS_TYP).eq('reference_id', taskId).gte('created_at', sedan).limit(1)
  if (nyss && nyss.length > 0) return NextResponse.json({ ok: true, skickat: false, orsak: 'redan notifierad' })

  const avsandare = NAMN[(fran?.username ?? '').toLowerCase()] ?? fran?.username ?? 'Någon i teamet'
  const titel = String(task.title ?? '')

  // 1. Klockan i appen
  await notifyWithRetry('uppgift-notis', async () => {
    const { error } = await svc.from('notifications').insert({
      user_id: mottagare, actor_id: user.id, type: UPPGIFT_NOTIS_TYP, reference_id: taskId,
    })
    if (error) throw error
  })

  // 2. Push, om mottagaren har slagit på det
  const { sendPushToUsers } = await import('@/lib/push-server')
  await notifyWithRetry('uppgift-push', () => sendPushToUsers([mottagare!], uppgiftPush(avsandare, titel, taskId)))

  // 3. Mejl till adressen på kontot
  let mejl: string = 'ej skickat'
  const { data: auth } = await svc.auth.admin.getUserById(mottagare!)
  const adress = auth?.user?.email
  if (adress) {
    const r = await sendEmail({
      template: 'uppgift_delegerad',
      to: adress,
      vars: { avsandare, titel: sakerTitel(titel), lank: `https://svalla.se${uppgiftLank(taskId)}` },
    })
    mejl = r.ok ? (r.error === 'unsubscribed' ? 'avregistrerad' : 'skickat') : `fel: ${r.error ?? 'okänt'}`
  }

  return NextResponse.json({ ok: true, skickat: true, mejl })
}

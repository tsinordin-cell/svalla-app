/**
 * Daglig cron — skickar:
 *   - Dag-7-mail till users som signades upp för 6–8 dagar sen
 *   - Säsongsmail (1 april) till alla bekräftade prenumeranter
 *   - Säsongsslut-mail (1 oktober) till users med trips i år
 *
 * Trigger: Vercel cron eller GitHub Actions (en gång om dagen, 09:00 UTC)
 *
 * Authorization: Bearer ${CRON_SECRET}
 */

import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'
export const maxDuration = 300

export async function GET(req: Request) {
  return handle(req)
}
export async function POST(req: Request) {
  return handle(req)
}

async function handle(req: Request) {
  // Två autentiserings-vägar:
  //  1. Vercel cron (User-Agent: 'vercel-cron/1.0') — automatiskt godkänd
  //  2. Manuell trigger med Bearer ${CRON_SECRET}
  const ua = req.headers.get('user-agent') || ''
  const isVercelCron = ua.toLowerCase().includes('vercel-cron')
  const auth = req.headers.get('authorization') || ''
  const isBearerAuthed = !!process.env.CRON_SECRET && auth === `Bearer ${process.env.CRON_SECRET}`

  if (!isVercelCron && !isBearerAuthed) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const service = getAdminClient()

  const today = new Date()
  const month = today.getMonth() + 1
  const day = today.getDate()

  const results: Record<string, { sent: number; errors: number; details?: unknown }> = {}

  // ── 1. Dag-7-mail ───────────────────────────────────────────
  const eightDaysAgo = new Date(today.getTime() - 8 * 24 * 60 * 60 * 1000).toISOString()
  const sixDaysAgo = new Date(today.getTime() - 6 * 24 * 60 * 60 * 1000).toISOString()

  const { data: dayCandidates } = await service
    .from('users')
    .select('id, username, email, created_at')
    .gte('created_at', eightDaysAgo)
    .lte('created_at', sixDaysAgo)
    .limit(500)

  let day7Sent = 0
  let day7Errors = 0
  if (dayCandidates) {
    // Filtrera bort de som redan fått dag-7
    const { data: alreadySent } = await service
      .from('email_log')
      .select('email')
      .eq('template', 'day7')
      .in('email', dayCandidates.map(u => u.email).filter(Boolean) as string[])
    const sentEmails = new Set((alreadySent ?? []).map(r => r.email))

    for (const user of dayCandidates) {
      if (!user.email || sentEmails.has(user.email)) continue
      const result = await sendEmail({
        template: 'day7',
        to: user.email,
        vars: { first_name: user.username || 'där' },
      })
      if (result.ok) {
        day7Sent++
        await service.from('email_log').insert({
          email: user.email,
          template: 'day7',
          sent_at: new Date().toISOString(),
          resend_id: result.id,
        }).then(() => {}, () => {})
      } else {
        day7Errors++
      }
    }
  }
  results.day7 = { sent: day7Sent, errors: day7Errors }

  // ── 2. Säsongs-öppning (1 april) ────────────────────────────
  if (month === 4 && day === 1) {
    const { data: subs } = await service
      .from('email_subscribers')
      .select('email')
      .eq('confirmed', true)
      .eq('unsubscribed', false)
      .limit(10000)

    let sent = 0, errors = 0
    if (subs) {
      const CHUNK = 50
      for (let i = 0; i < subs.length; i += CHUNK) {
        const chunk = subs.slice(i, i + CHUNK)
        const settled = await Promise.allSettled(
          chunk.map(s => sendEmail({ template: 'season_open', to: s.email, vars: { first_name: 'där' } }))
        )
        for (const r of settled) {
          if (r.status === 'fulfilled' && r.value.ok) sent++
          else errors++
        }
      }
    }
    results.season_open = { sent, errors }
  }

  // ── 3. Säsongs-stängning (1 oktober) ────────────────────────
  if (month === 10 && day === 1) {
    const yearStart = new Date(today.getFullYear(), 0, 1).toISOString()
    const { data: activeUsers } = await service
      .from('users')
      .select('id, username, email')
      .limit(2000)

    let sent = 0, errors = 0
    if (activeUsers) {
      const userIds = activeUsers.map(u => u.id)

      // Batch-hämta trips och visits — eliminerar N+1 (annars 2 queries per user = 4000 queries)
      const [{ data: tripRows }, { data: visitRows }] = await Promise.all([
        service.from('trips').select('user_id').in('user_id', userIds).gte('created_at', yearStart),
        service.from('visited_islands').select('user_id').in('user_id', userIds),
      ])
      const tripCountByUser = new Map<string, number>()
      for (const r of tripRows ?? []) {
        tripCountByUser.set(r.user_id as string, (tripCountByUser.get(r.user_id as string) ?? 0) + 1)
      }
      const visitCountByUser = new Map<string, number>()
      for (const r of visitRows ?? []) {
        visitCountByUser.set(r.user_id as string, (visitCountByUser.get(r.user_id as string) ?? 0) + 1)
      }

      for (const u of activeUsers) {
        if (!u.email) continue
        const tripCount = tripCountByUser.get(u.id) ?? 0
        if (tripCount === 0) continue
        const visitCount = visitCountByUser.get(u.id) ?? 0

        const result = await sendEmail({
          template: 'season_close',
          to: u.email,
          vars: {
            first_name: u.username || 'där',
            trip_count: tripCount,
            visited_count: visitCount,
            username: u.username || '',
          },
        })
        if (result.ok) sent++
        else errors++
      }
    }
    results.season_close = { sent, errors }
  }

  return NextResponse.json({ ok: true, today: today.toISOString().slice(0, 10), results })
}

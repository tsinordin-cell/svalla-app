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
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendEmail, type EmailTemplate } from '@/lib/email'

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

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

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
    const ids = dayCandidates.map(u => u.id)
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
      for (const s of subs) {
        const result = await sendEmail({
          template: 'season_open',
          to: s.email,
          vars: { first_name: 'där' },
        })
        if (result.ok) sent++
        else errors++
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
      for (const u of activeUsers) {
        if (!u.email) continue
        const { count: tripCount } = await service
          .from('trips')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', u.id)
          .gte('created_at', yearStart)
        if (!tripCount || tripCount === 0) continue

        const { count: visitCount } = await service
          .from('visited_islands')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', u.id)

        const result = await sendEmail({
          template: 'season_close',
          to: u.email,
          vars: {
            first_name: u.username || 'där',
            trip_count: tripCount,
            visited_count: visitCount ?? 0,
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

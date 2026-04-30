/**
 * Skicka välkomstmail manuellt eller via Supabase webhook efter signup.
 *
 * Authorization: Bearer ${CRON_SECRET}  ELLER  service-role auth
 *
 * POST { email, firstName?, userId? }
 */

import { NextResponse } from 'next/server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { sendEmail } from '@/lib/email'

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  // Auth: kräver CRON_SECRET för att förhindra att vem som helst spammar mail
  const auth = req.headers.get('authorization') || ''
  if (!process.env.CRON_SECRET || auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { email?: string; firstName?: string; userId?: string }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { email, firstName, userId } = body
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'email required' }, { status: 400 })
  }

  // Hämta first_name om userId angetts
  let resolvedFirstName = firstName || ''
  if (userId && !resolvedFirstName) {
    const service = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    const { data } = await service.from('users').select('username').eq('id', userId).single()
    resolvedFirstName = data?.username || ''
  }

  const result = await sendEmail({
    template: 'welcome',
    to: email,
    vars: { first_name: resolvedFirstName || 'där' },
  })

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 500 })
  }

  // Logga till email_log (valfritt, om tabellen finns)
  try {
    const service = createServiceClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
    await service.from('email_log').insert({
      email,
      template: 'welcome',
      sent_at: new Date().toISOString(),
      resend_id: result.id,
    })
  } catch {
    // ignorera om tabell saknas
  }

  return NextResponse.json({ ok: true, id: result.id })
}

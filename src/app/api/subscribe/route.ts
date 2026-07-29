import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/email'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig request' }, { status: 400 })
  }

  const { email, source, preferences } = body as {
    email?: string
    source?: string
    preferences?: Record<string, unknown>
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Ogiltig e-postadress' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()
  const supabase = await createServerSupabaseClient()

  // Knyt till user_id om inloggad
  const { data: { user } } = await supabase.auth.getUser()

  // Insert med ON CONFLICT — om e-posten redan finns, ignorera tyst
  // confirmed: true direkt (explicit opt-in via formulär, inget behov av double opt-in)
  const { error, data: insertedRows } = await supabase.from('email_subscribers').insert({
    email: normalizedEmail,
    source: source ?? 'unknown',
    preferences: preferences ?? { weekly_tips: true, season_alerts: true },
    user_id: user?.id ?? null,
    confirmed: true,
  }).select('id')

  const isDuplicate = error?.message?.toLowerCase().includes('duplicate')
    || error?.code === '23505'

  // Duplicate → returnera framgång ändå (bra UX, ingen läckage)
  if (error && !isDuplicate) {
    console.error('[subscribe] insert failed', error)
    return NextResponse.json({ error: 'Kunde inte spara — försök igen' }, { status: 500 })
  }

  // Skicka välkomstmail till NYA prenumeranter (inte vid dubbletter)
  if (!isDuplicate && insertedRows && insertedRows.length > 0) {
    try {
      const mailResult = await sendEmail({
        template: 'newsletter_welcome',
        to: normalizedEmail,
      })

      // Logga skickat mail (för att undvika duplicat via cron-jobbet)
      if (mailResult.ok) {
        const service = getAdminClient()
        await service.from('email_log').insert({
          email: normalizedEmail,
          template: 'newsletter_welcome',
          sent_at: new Date().toISOString(),
          resend_id: mailResult.id ?? null,
        }).then(() => {}, () => {})
      }
    } catch (e) {
      // Tyst fel — prenumerationen lyckades, mailet kan skickas manuellt
      console.error('[subscribe] welcome email failed', e)
    }
  }

  return NextResponse.json({ ok: true })
}

import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/email'
import { arSegment } from '@/lib/mejlsegment'
import { stadaKampanj } from '@/lib/kampanj'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig request' }, { status: 400 })
  }

  const { email, source, preferences, kampanj, segment } = body as {
    email?: string
    source?: string
    kampanj?: string
    preferences?: Record<string, unknown>
    segment?: string
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Ogiltig e-postadress' }, { status: 400 })
  }

  const normalizedEmail = email.toLowerCase().trim()
  const valtSegment = arSegment(segment) ? segment : null
  const supabase = await createServerSupabaseClient()

  // Knyt till user_id om inloggad
  const { data: { user } } = await supabase.auth.getUser()

  // Insert med ON CONFLICT — om e-posten redan finns, ignorera tyst
  // confirmed: true direkt (explicit opt-in via formulär, inget behov av double opt-in)
  // Skrivningen MÅSTE gå via service-klienten. Besökaren som prenumererar är
  // anonym och har ingen insert-policy på email_subscribers → 42501 och 500 på
  // varje prenumeration. Ändra inte tillbaka till `supabase.from(...)`.
  const service = getAdminClient()
  const { error, data: insertedRows } = await service.from('email_subscribers').insert({
    email: normalizedEmail,
    source: source ?? 'unknown',
    // Kampanjlänk (?k=) som besökaren kom via, se lib/kampanj.ts. Segment
    // bara om besökaren själv valt ett (lib/mejlsegment.ts).
    preferences: (() => {
      const bas = preferences ?? { weekly_tips: true, season_alerts: true }
      const k = stadaKampanj(kampanj)
      return {
        ...bas,
        ...(k ? { kampanj: k } : {}),
        ...(valtSegment ? { segment: valtSegment } : {}),
      }
    })(),
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

  // Segment (2026-10-02): svaret på "Vad stämmer bäst?" kommer i ett andra
  // anrop med samma adress, efter att raden redan skapats. Vi sätter bara
  // segment om raden saknar ett, så att ett anrop med någon annans adress
  // inte kan skriva över ett svar som redan finns.
  if (isDuplicate && valtSegment) {
    const { data: rad } = await service
      .from('email_subscribers')
      .select('id, preferences')
      .eq('email', normalizedEmail)
      .maybeSingle()
    const pref = (rad?.preferences ?? {}) as Record<string, unknown>
    if (rad && !arSegment(pref.segment)) {
      await service
        .from('email_subscribers')
        .update({ preferences: { ...pref, segment: valtSegment } })
        .eq('id', rad.id)
    }
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

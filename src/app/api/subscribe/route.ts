import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { sendEmail } from '@/lib/email'
import { arSegment } from '@/lib/mejlsegment'
import { stadaKampanj } from '@/lib/kampanj'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'
import {
  PRENUMERATION_PER_IP_OCH_TIMME, stadaKalla, stadaPreferenser, valkomstTillaten,
} from '@/lib/prenumeration'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: Request) {
  // Gräns per IP (granskning 2026-11-22, se lib/prenumeration.ts). Rutten är
  // öppen och varje ny adress får ett mejl.
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    ?? request.headers.get('x-real-ip')
    ?? 'unknown'
  if (!(await checkRateLimit(`subscribe:${ip}`, PRENUMERATION_PER_IP_OCH_TIMME, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'För många försök. Vänta en stund.' }, { status: 429 })
  }

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
    // Bara formulärnamn och de två kända valen sparas (lib/prenumeration.ts);
    // tidigare sparades godtycklig JSON ur anropet.
    source: stadaKalla(source),
    // Kampanjlänk (?k=) som besökaren kom via, se lib/kampanj.ts. Segment
    // bara om besökaren själv valt ett (lib/mejlsegment.ts).
    preferences: (() => {
      const bas = stadaPreferenser(preferences)
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
    return NextResponse.json({ error: 'Kunde inte spara: försök igen' }, { status: 500 })
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

  // Skicka välkomstmail till NYA prenumeranter (inte vid dubbletter), och högst
  // VALKOMST_PER_TIMME per timme för hela sajten. Resend skickar också
  // bekräftelse- och återställningsmejlen; en flod av välkomstmejl får inte
  // tömma dagskvoten för dem. Prenumerationen sparas ändå.
  let valkomstOk = true
  if (!isDuplicate && insertedRows && insertedRows.length > 0) {
    const { count, error: raknaFel } = await service
      .from('email_log')
      .select('id', { count: 'exact', head: true })
      .eq('template', 'newsletter_welcome')
      .gte('sent_at', new Date(Date.now() - 60 * 60 * 1000).toISOString())
    valkomstOk = !raknaFel && valkomstTillaten(count)
    if (!valkomstOk) logger.warn('subscribe', 'välkomstmejl hoppat över: timgränsen nådd eller räkningen misslyckades', { count, fel: raknaFel?.message })
  }
  if (valkomstOk && !isDuplicate && insertedRows && insertedRows.length > 0) {
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

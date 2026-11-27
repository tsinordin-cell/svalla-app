import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { arSegment } from '@/lib/mejlsegment'
import { stadaKampanj } from '@/lib/kampanj'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'
import {
  PRENUMERATION_PER_IP_OCH_TIMME, stadaKalla, stadaPreferenser, adressRedanBekraftad, bekraftaLank,
} from '@/lib/prenumeration'
import { skickaPrenumerationsmejl } from '@/lib/prenumerationUtskick'

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

  // Dubbel bekräftelse (Toms ja 2026-11-22, lib/prenumeration.ts): adressen
  // blir prenumerant (confirmed) först när länken i bekräftelsemejlet följts.
  // Undantag: inloggad med bekräftad kontoadress som anmäler just den.
  // Anmälan från registreringen (source 'registrering') får inget eget mejl:
  // den bekräftas när kontots adress bekräftas (/api/auth/post-signup).
  const verifierad = adressRedanBekraftad(user, normalizedEmail)
  const kalla = stadaKalla(source)

  // Skrivningen MÅSTE gå via service-klienten. Besökaren som prenumererar är
  // anonym och har ingen insert-policy på email_subscribers → 42501 och 500 på
  // varje prenumeration. Ändra inte tillbaka till `supabase.from(...)`.
  const service = getAdminClient()
  const { error, data: insertedRows } = await service.from('email_subscribers').insert({
    email: normalizedEmail,
    // Bara formulärnamn och de två kända valen sparas (lib/prenumeration.ts);
    // tidigare sparades godtycklig JSON ur anropet.
    source: kalla,
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
    confirmed: verifierad,
    // Bekräftelsedatum (2026-11-27): sätts samtidigt som confirmed, annars
    // går andelen som bekräftar inte att följa över tid.
    confirmed_at: verifierad ? new Date().toISOString() : null,
  }).select('id')

  const isDuplicate = error?.message?.toLowerCase().includes('duplicate')
    || error?.code === '23505'

  // Duplicate → returnera framgång ändå (bra UX, ingen läckage)
  if (error && !isDuplicate) {
    console.error('[subscribe] insert failed', error)
    return NextResponse.json({ error: 'Kunde inte spara: försök igen' }, { status: 500 })
  }
  const ny = !isDuplicate && !!insertedRows && insertedRows.length > 0

  let befintlig: { id: string; confirmed: boolean | null; unsubscribed: boolean | null; preferences: unknown } | null = null
  if (isDuplicate) {
    const { data: rad } = await service
      .from('email_subscribers')
      .select('id, confirmed, unsubscribed, preferences')
      .eq('email', normalizedEmail)
      .maybeSingle()
    befintlig = rad
  }

  // Segment (2026-10-02): svaret på "Vad stämmer bäst?" kommer i ett andra
  // anrop med samma adress, efter att raden redan skapats. Vi sätter bara
  // segment om raden saknar ett, så att ett anrop med någon annans adress
  // inte kan skriva över ett svar som redan finns.
  if (befintlig && valtSegment) {
    const pref = (befintlig.preferences ?? {}) as Record<string, unknown>
    if (!arSegment(pref.segment)) {
      await service
        .from('email_subscribers')
        .update({ preferences: { ...pref, segment: valtSegment } })
        .eq('id', befintlig.id)
    }
  }

  const avregistrerad = !!befintlig?.unsubscribed
  const vantarPaBekraftelse = befintlig ? !befintlig.confirmed && !avregistrerad : ny && !verifierad

  // Inloggad med bekräftad adress och en obekräftad rad: bekräfta direkt.
  if (befintlig && vantarPaBekraftelse && verifierad) {
    await service.from('email_subscribers')
      .update({ confirmed: true, confirmed_at: new Date().toISOString(), user_id: user?.id ?? null })
      .eq('id', befintlig.id)
  }

  // Mejlen har en gemensam timgräns för hela sajten (lib/prenumerationUtskick.ts).
  if (ny && verifierad) {
    await skickaPrenumerationsmejl(service, normalizedEmail, 'newsletter_welcome')
  } else if (vantarPaBekraftelse && !verifierad && kalla !== 'registrering' && !valtSegment) {
    const lank = bekraftaLank(normalizedEmail, process.env.UNSUBSCRIBE_SECRET)
    if (lank) await skickaPrenumerationsmejl(service, normalizedEmail, 'prenumeration_bekrafta', { bekrafta_url: lank })
    else logger.warn('subscribe', 'UNSUBSCRIBE_SECRET saknas: inget bekräftelsemejl')
  } else if (befintlig && vantarPaBekraftelse && verifierad) {
    await skickaPrenumerationsmejl(service, normalizedEmail, 'newsletter_welcome')
  }

  // bekrafta: formuläret ska be besökaren titta i inkorgen.
  return NextResponse.json({ ok: true, bekrafta: vantarPaBekraftelse && !verifierad })
}


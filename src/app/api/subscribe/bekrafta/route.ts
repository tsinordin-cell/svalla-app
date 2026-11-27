/**
 * POST /api/subscribe/bekrafta — formuläret på /nyhetsbrev/bekrafta.
 *
 * Dubbel bekräftelse för nyhetsbrevet (Toms ja 2026-11-22). Länken i mejlet
 * öppnar en sida med en knapp; först knappen bekräftar. Så bekräftar inte
 * mejlprogrammens länkkontroller adressen åt någon.
 */
import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { checkRateLimit } from '@/lib/rateLimit'
import { tolkaBekraftelse } from '@/lib/prenumeration'
import { skickaPrenumerationsmejl } from '@/lib/prenumerationUtskick'

export const dynamic = 'force-dynamic'

const SIDA = '/nyhetsbrev/bekrafta'

export async function POST(req: Request) {
  const tillbaka = (lage: string) => NextResponse.redirect(new URL(`${SIDA}?${lage}`, req.url), 303)

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!(await checkRateLimit(`prenum-bekrafta:${ip}`, 20, 60 * 60 * 1000))) return tillbaka('fel=1')

  let form: FormData
  try { form = await req.formData() } catch { return tillbaka('fel=1') }
  const email = tolkaBekraftelse(form.get('e'), form.get('t'), process.env.UNSUBSCRIBE_SECRET)
  if (!email) return tillbaka('fel=1')

  const service = getAdminClient()
  const { data: rader, error } = await service
    .from('email_subscribers')
    .update({ confirmed: true, confirmed_at: new Date().toISOString() })
    .eq('email', email)
    .eq('confirmed', false)
    .eq('unsubscribed', false)
    .select('id')
  if (error) return tillbaka('fel=1')

  // Välkomstmejlet bara första gången (raden var obekräftad).
  if (rader && rader.length > 0) await skickaPrenumerationsmejl(service, email, 'newsletter_welcome')
  return tillbaka('klart=1')
}

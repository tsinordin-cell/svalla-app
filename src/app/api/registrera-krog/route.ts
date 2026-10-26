import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { checkRateLimit } from '@/lib/rateLimit'
import { klientIp } from '@/lib/klientIp'
import { logger } from '@/lib/logger'

/**
 * POST /api/registrera-krog — intresseanmälan från /registrera-krog.
 *
 * Tidigare skrev sidan direkt till business_leads med den publika nyckeln och
 * en öppen insert-policy, så vem som helst kunde lägga in hur många rader som
 * helst utan validering. Nu går skrivningen bara hit (tjänsteklienten), med
 * samma kontroller som formuläret visar och en gräns per IP.
 */
const TYPER = new Set(['restaurang', 'kafe', 'hamn', 'boende', 'bar', 'annat'])
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function text(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim().slice(0, max)
  return t === '' ? null : t
}

export async function POST(req: Request) {
  if (!(await checkRateLimit(`registrera-krog:${klientIp(req)}`, 5, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'För många anmälningar. Försök igen senare.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = (await req.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Ogiltig request' }, { status: 400 })
  }

  const business_name = text(body.businessName, 200)
  const business_type = typeof body.businessType === 'string' && TYPER.has(body.businessType) ? body.businessType : null
  const location = text(body.location, 200)
  const contact_name = text(body.contactName, 200)
  const contact_email = text(body.email, 254)?.toLowerCase() ?? null

  if (!business_name || !business_type || !location || !contact_name || !contact_email || !EMAIL_REGEX.test(contact_email)) {
    return NextResponse.json({ error: 'Fyll i alla obligatoriska fält.' }, { status: 400 })
  }

  const { error } = await getAdminClient().from('business_leads').insert({
    business_name,
    business_type,
    description: text(body.description, 2000),
    location,
    contact_name,
    contact_email,
    contact_phone: text(body.phone, 40), // databasens CHECK tillåter 40
    website: text(body.website, 300),
  })

  if (error) {
    logger.error('registrera-krog', 'insert failed', { code: error.code, message: error.message })
    return NextResponse.json({ error: 'Kunde inte spara anmälan.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

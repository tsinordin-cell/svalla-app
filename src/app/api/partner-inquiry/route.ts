import { NextResponse } from 'next/server'
import { getAdminClient } from '@/lib/supabase-admin'
import { checkRateLimit } from '@/lib/rateLimit'
import { klientIp } from '@/lib/klientIp'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * POST /api/partner-inquiry — partnerförfrågan från /partner.
 *
 * Skriver med tjänsteklienten. partner_inquiries har ingen öppen
 * insert-policy (borttagen 2026-10), så längdgränserna och rate-limiten här
 * kan inte kringgås genom att skriva direkt med den publika nyckeln.
 */
function text(v: unknown, max: number): string | null {
  if (typeof v !== 'string') return null
  const t = v.trim().slice(0, max)
  return t === '' ? null : t
}

export async function POST(request: Request) {
  if (!(await checkRateLimit(`partner-inquiry:${klientIp(request)}`, 5, 60 * 60 * 1000))) {
    return NextResponse.json({ error: 'För många förfrågningar. Försök igen senare.' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = (await request.json()) as Record<string, unknown>
  } catch {
    return NextResponse.json({ error: 'Ogiltig request' }, { status: 400 })
  }

  const business_name = text(body.business_name, 200)
  const email = text(body.email, 254)?.toLowerCase() ?? null
  if (!business_name || !email || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'Verksamhetsnamn och giltig e-post krävs' }, { status: 400 })
  }

  const { error } = await getAdminClient().from('partner_inquiries').insert({
    business_name,
    contact_name: text(body.contact_name, 200),
    email,
    phone: text(body.phone, 50),
    category: text(body.category, 100),
    island_slug: text(body.island_slug, 100),
    tier: text(body.tier, 50),
    message: text(body.message, 2000),
    source: 'partner-page',
    status: 'new',
  })

  if (error) {
    console.error('[partner-inquiry] insert failed', error)
    return NextResponse.json({ error: 'Kunde inte spara — försök igen' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

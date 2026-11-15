import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'

/**
 * GET /api/subscribe/status — är den inloggade användaren prenumerant?
 *
 * Underlag för frågan i flödet (NewsletterOptInBanner, 2026-11-08). Konton
 * får inte nyhetsbrevet automatiskt (marknadsföringslagen 19 §, beslut
 * 2026-09-29); de måste själva säga ja, och då skrivs de in via
 * POST /api/subscribe med source 'app-fraga'. Den här rutten svarar bara
 * på om de redan finns i email_subscribers, på user_id eller adress.
 *
 * Svarar 401 utloggad. Läcker inget: adressen som returneras är
 * användarens egen.
 */
export const dynamic = 'force-dynamic'

export async function GET() {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const email = user.email.toLowerCase()
  const service = getAdminClient()
  const { data, error } = await service
    .from('email_subscribers')
    .select('id, confirmed, unsubscribed')
    .or(`user_id.eq.${user.id},email.eq.${email}`)
    .limit(5)

  if (error) {
    console.error('[subscribe/status]', error)
    return NextResponse.json({ error: 'Kunde inte läsa' }, { status: 500 })
  }

  const rader = data ?? []
  const prenumerant = rader.some(r => r.confirmed && !r.unsubscribed)
  // Den som avregistrerat sig ska inte få frågan igen.
  const avregistrerad = rader.some(r => r.unsubscribed)

  return NextResponse.json(
    { subscribed: prenumerant, unsubscribed: avregistrerad, email },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}

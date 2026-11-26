export const dynamic = 'force-dynamic'

/**
 * Lämna ett samtal (2026-11-26).
 *
 * Raden i conversation_participants tas bort med användarens egen session,
 * så att databasens regler avgör vad som är tillåtet. Var hen den sista i
 * ett samtal mellan två personer raderar databasen samtalet och dess
 * meddelanden. Bilderna i samtalet tas då bort här, eftersom databasen inte
 * får radera filer. Anmälda bilder ligger kvar som underlag.
 */
import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { rensaBilderForRaderadeSamtal } from '@/lib/dmBilderRensning'
import { checkRateLimit } from '@/lib/rateLimit'
import { logger } from '@/lib/logger'

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export async function POST(req: Request) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })

  if (!(await checkRateLimit(`dm-lamna:${user.id}`, 30, 60_000))) {
    return NextResponse.json({ error: 'För många försök' }, { status: 429 })
  }

  let body: { conversationId?: unknown } | null
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }
  const samtalId = typeof body?.conversationId === 'string' ? body.conversationId : ''
  if (!UUID_RE.test(samtalId)) return NextResponse.json({ error: 'Ogiltigt samtal' }, { status: 400 })

  const { count, error } = await supabase.from('conversation_participants')
    .delete({ count: 'exact' })
    .eq('conversation_id', samtalId)
    .eq('user_id', user.id)
  if (error) return NextResponse.json({ error: 'Kunde inte lämna samtalet' }, { status: 500 })
  // count saknas bara om databasen inte räknade; då har raderingen ändå gått igenom.
  if (count === 0) {
    return NextResponse.json({ error: 'Du är inte med i samtalet' }, { status: 404 })
  }

  // Användaren har lämnat oavsett hur det går med bilderna nedan.
  try {
    await rensaBilderForRaderadeSamtal(getAdminClient(), [samtalId])
  } catch (e) {
    logger.error('dm-lamna', 'bildrensning misslyckades', { e: String(e), samtalId })
  }
  return NextResponse.json({ ok: true })
}

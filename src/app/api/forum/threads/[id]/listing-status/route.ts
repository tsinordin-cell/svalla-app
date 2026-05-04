/**
 * PATCH /api/forum/threads/[id]/listing-status
 *
 * Ägaren av en Loppis-annons flippar status: aktiv ↔ reserverad ↔ sald.
 * Vi sparar bara status-fältet — övriga fält i listing_data lämnas orörda.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const ALLOWED_STATUSES = ['aktiv', 'reserverad', 'sald'] as const
type Status = typeof ALLOWED_STATUSES[number]

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  let body: { status?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }

  const status = body.status
  if (typeof status !== 'string' || !ALLOWED_STATUSES.includes(status as Status)) {
    return NextResponse.json({
      error: `Ogiltig status. Tillåtna: ${ALLOWED_STATUSES.join(', ')}.`,
    }, { status: 400 })
  }

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })
  }

  const { data: thread, error: fetchErr } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id, listing_data')
    .eq('id', id)
    .single()

  if (fetchErr || !thread) {
    return NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 })
  }
  if (thread.user_id !== user.id) {
    return NextResponse.json({ error: 'Du är inte ägare till denna annons.' }, { status: 403 })
  }
  if (thread.category_id !== 'loppis') {
    return NextResponse.json({ error: 'Endast Loppis-trådar har status.' }, { status: 400 })
  }

  const currentListing = (thread.listing_data ?? {}) as Record<string, unknown>
  const updatedListing = { ...currentListing, status }

  const { error: updateErr } = await supabase
    .from('forum_threads')
    .update({ listing_data: updatedListing })
    .eq('id', id)

  if (updateErr) {
    console.error('[listing-status] update failed:', updateErr)
    return NextResponse.json({ error: 'Kunde inte spara status.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, status })
}

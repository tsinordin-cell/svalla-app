/**
 * POST /api/forum/threads/[id]/boost
 *
 * Aktiverar boost på en Loppis-annons (visas först i grid med Sponsored-
 * badge). Body: { days: number } — defaultar till 7. Annonsens ägare
 * eller admin (info@svalla.se) får boosta. Stripe-checkout läggs till
 * separat — denna endpoint sätter bara timestampet.
 *
 * DELETE /api/forum/threads/[id]/boost — ta bort boost (admin/ägare).
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

const ADMIN_EMAIL = 'info@svalla.se'
const MAX_DAYS = 30

async function ensureOwnerOrAdmin(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { err: NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 }) }

  const { data: thread } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id, listing_data')
    .eq('id', id).single()
  if (!thread) return { err: NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 }) }
  if (thread.category_id !== 'loppis') {
    return { err: NextResponse.json({ error: 'Endast Loppis-annonser kan boostas.' }, { status: 400 }) }
  }
  const isOwner = thread.user_id === user.id
  const isAdmin = user.email === ADMIN_EMAIL
  if (!isOwner && !isAdmin) {
    return { err: NextResponse.json({ error: 'Bara ägaren eller admin får boosta.' }, { status: 403 }) }
  }
  return { user, supabase, thread }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const r = await ensureOwnerOrAdmin(id)
  if ('err' in r) return r.err

  let body: { days?: unknown } = {}
  try { body = await req.json() } catch { /* default 7 */ }
  const daysInput = typeof body.days === 'number' ? body.days : 7
  const days = Math.max(1, Math.min(MAX_DAYS, Math.round(daysInput)))

  const boostedUntil = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

  const current = (r.thread.listing_data ?? {}) as Record<string, unknown>
  const updated = { ...current, boosted_until: boostedUntil }

  const { error } = await r.supabase
    .from('forum_threads')
    .update({ listing_data: updated })
    .eq('id', id)

  if (error) {
    console.error('[boost] update failed:', error)
    return NextResponse.json({ error: 'Kunde inte boosta.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, boostedUntil, days })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const r = await ensureOwnerOrAdmin(id)
  if ('err' in r) return r.err

  const current = (r.thread.listing_data ?? {}) as Record<string, unknown>
  const updated = { ...current, boosted_until: null }

  const { error } = await r.supabase
    .from('forum_threads')
    .update({ listing_data: updated })
    .eq('id', id)

  if (error) {
    return NextResponse.json({ error: 'Kunde inte ta bort boost.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

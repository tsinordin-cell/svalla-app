/**
 * POST /api/forum/threads/[id]/report
 *
 * Rapporterar en forum-tråd (typiskt en Loppis-annons) som spam,
 * trakasserier, opassande, fake eller annat. Skapar entry i reports
 * som dyker upp på /admin/moderation.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'

const ALLOWED_REASONS = ['spam', 'harassment', 'inappropriate', 'misinformation', 'other'] as const

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params

  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })

  // Rate limit: 10 rapporter per timme per användare
  if (!(await checkRateLimit(`report:${user.id}`, 10, 60 * 60_000))) {
    return NextResponse.json({ error: 'För många rapporter. Försök igen senare.' }, { status: 429 })
  }

  let body: { reason?: unknown; note?: unknown }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }

  const reason = typeof body.reason === 'string' ? body.reason : ''
  if (!ALLOWED_REASONS.includes(reason as typeof ALLOWED_REASONS[number])) {
    return NextResponse.json({
      error: `Ogiltig anledning. Tillåtna: ${ALLOWED_REASONS.join(', ')}.`,
    }, { status: 400 })
  }
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, 500) : ''

  // Verifiera att tråden finns och inte är min egen
  const { data: thread } = await supabase
    .from('forum_threads')
    .select('id, user_id')
    .eq('id', id)
    .single()
  if (!thread) return NextResponse.json({ error: 'Tråden hittades inte.' }, { status: 404 })
  if (thread.user_id === user.id) {
    return NextResponse.json({ error: 'Du kan inte rapportera din egen tråd.' }, { status: 400 })
  }

  const { error } = await supabase
    .from('reports')
    .insert({
      reporter_id: user.id,
      target_type: 'forum_thread',
      target_id:   id,
      reason,
      note: note || null,
      status: 'pending',
    })

  if (error) {
    // Unique constraint = redan rapporterad av samma user
    if (error.code === '23505') {
      return NextResponse.json({ ok: true, alreadyReported: true })
    }
    console.error('[forum/report] insert failed:', error)
    return NextResponse.json({ error: 'Kunde inte spara rapporten.' }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}

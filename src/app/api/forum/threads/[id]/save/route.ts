/**
 * POST   /api/forum/threads/[id]/save  — spara annonsen i wishlisten
 * DELETE /api/forum/threads/[id]/save  — ta bort från wishlisten
 *
 * Bara Loppis-trådar kan sparas. Inloggning krävs.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

async function ensureLoppisAuth(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { err: NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 }) }
  }
  const { data: thread } = await supabase
    .from('forum_threads')
    .select('id, category_id')
    .eq('id', id)
    .single()
  if (!thread) {
    return { err: NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 }) }
  }
  if (thread.category_id !== 'loppis') {
    return { err: NextResponse.json({ error: 'Endast Loppis-annonser kan sparas.' }, { status: 400 }) }
  }
  return { user, supabase }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const r = await ensureLoppisAuth(id)
  if ('err' in r) return r.err
  const { user, supabase } = r

  const { error } = await supabase
    .from('loppis_saves')
    .upsert({ user_id: user.id, thread_id: id }, { onConflict: 'user_id,thread_id' })

  if (error) {
    console.error('[loppis-save] insert error:', error)
    return NextResponse.json({ error: 'Kunde inte spara.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, saved: true })
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const r = await ensureLoppisAuth(id)
  if ('err' in r) return r.err
  const { user, supabase } = r

  const { error } = await supabase
    .from('loppis_saves')
    .delete()
    .eq('user_id', user.id)
    .eq('thread_id', id)

  if (error) {
    console.error('[loppis-save] delete error:', error)
    return NextResponse.json({ error: 'Kunde inte ta bort.' }, { status: 500 })
  }
  return NextResponse.json({ ok: true, saved: false })
}

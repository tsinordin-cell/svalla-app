/**
 * POST   /api/forum/threads/[id]/save  — spara annonsen i wishlisten
 * DELETE /api/forum/threads/[id]/save  — ta bort från wishlisten
 *
 * Bara Loppis-trådar kan sparas. Inloggning krävs.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'

async function ensureLoppisAuth(id: string) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return { err: NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 }) }
  }
  const { data: thread } = await supabase
    .from('forum_threads')
    .select('id, user_id, category_id')
    .eq('id', id)
    .single()
  if (!thread) {
    return { err: NextResponse.json({ error: 'Annonsen hittades inte.' }, { status: 404 }) }
  }
  if (thread.category_id !== 'loppis') {
    return { err: NextResponse.json({ error: 'Endast Loppis-annonser kan sparas.' }, { status: 400 }) }
  }
  return { user, supabase, ownerId: thread.user_id as string }
}

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const r = await ensureLoppisAuth(id)
  if ('err' in r) return r.err
  const { user, supabase, ownerId } = r

  // Kolla om redan sparad — vi vill bara skapa notis vid första gången
  const { data: existing } = await supabase
    .from('loppis_saves')
    .select('user_id')
    .eq('user_id', user.id)
    .eq('thread_id', id)
    .maybeSingle()
  const wasNew = !existing

  const { error } = await supabase
    .from('loppis_saves')
    .upsert({ user_id: user.id, thread_id: id }, { onConflict: 'user_id,thread_id' })

  if (error) {
    console.error('[loppis-save] insert error:', error)
    return NextResponse.json({ error: 'Kunde inte spara.' }, { status: 500 })
  }

  // Notis till annonsens ägare när någon nyspara — skippa om man sparar sin egen
  if (wasNew && ownerId !== user.id) {
    try {
      await getAdminClient().from('notifications').insert({
        user_id: ownerId,
        actor_id: user.id,
        type: 'listing_saved',
        reference_id: id,
      })
    } catch (e) {
      // Notis-fel ska inte blockera spara-operationen
      console.warn('[loppis-save] notification failed:', e)
    }
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

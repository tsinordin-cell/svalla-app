import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/** PATCH /api/forum/threads/[id] — redigera egen tråd */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })

    const { title, body } = await req.json()
    const trimTitle = (title ?? '').trim()
    const trimBody  = (body  ?? '').trim()

    if (trimTitle.length < 5 || trimTitle.length > 200) {
      return NextResponse.json({ error: 'Ogiltig rubrik (5–200 tecken).' }, { status: 400 })
    }
    if (trimBody.length < 10 || trimBody.length > 10000) {
      return NextResponse.json({ error: 'Ogiltig text (10–10 000 tecken).' }, { status: 400 })
    }

    // Verifiera ägarskap
    const { data: thread } = await supabase
      .from('forum_threads')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!thread) {
      return NextResponse.json({ error: 'Tråden hittades inte.' }, { status: 404 })
    }
    if (thread.user_id !== user.id) {
      return NextResponse.json({ error: 'Inte behörig.' }, { status: 403 })
    }

    const { error } = await supabase
      .from('forum_threads')
      .update({ title: trimTitle, body: trimBody })
      .eq('id', id)

    if (error) {
      console.error('[forum/threads/[id]] patch error:', error)
      return NextResponse.json({ error: 'Kunde inte spara ändringen.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forum/threads/[id]] unexpected error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

/** DELETE /api/forum/threads/[id] — radera egen tråd (soft delete) */
export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })

    // Verifiera ägarskap
    const { data: thread } = await supabase
      .from('forum_threads')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!thread) return NextResponse.json({ error: 'Tråden hittades inte.' }, { status: 404 })
    if (thread.user_id !== user.id) return NextResponse.json({ error: 'Inte behörig.' }, { status: 403 })

    // Hard-delete: radera svar först (FK), sedan tråden
    await supabase.from('forum_posts').delete().eq('thread_id', id)
    const { error } = await supabase.from('forum_threads').delete().eq('id', id)

    if (error) return NextResponse.json({ error: 'Kunde inte radera.' }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forum/threads/[id]] delete error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

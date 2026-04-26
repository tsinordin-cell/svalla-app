import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/** PATCH /api/forum/posts/[id] — redigera eget svar */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })

    const { body } = await req.json()
    const trimBody = (body ?? '').trim()
    if (trimBody.length < 1 || trimBody.length > 10000) {
      return NextResponse.json({ error: 'Ogiltigt svar (1–10 000 tecken).' }, { status: 400 })
    }

    // Verifiera att posten tillhör inloggad användare
    const { data: post } = await supabase
      .from('forum_posts')
      .select('user_id, is_deleted')
      .eq('id', id)
      .single()

    if (!post || post.is_deleted) {
      return NextResponse.json({ error: 'Svaret hittades inte.' }, { status: 404 })
    }
    if (post.user_id !== user.id) {
      return NextResponse.json({ error: 'Inte behörig.' }, { status: 403 })
    }

    const { error } = await supabase
      .from('forum_posts')
      .update({ body: trimBody })
      .eq('id', id)

    if (error) {
      console.error('[forum/posts/[id]] patch error:', error)
      return NextResponse.json({ error: 'Kunde inte spara ändringen.' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forum/posts/[id]] unexpected error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

/** DELETE /api/forum/posts/[id] — radera eget svar (soft delete) */
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
    const { data: post } = await supabase
      .from('forum_posts')
      .select('user_id')
      .eq('id', id)
      .single()

    if (!post) return NextResponse.json({ error: 'Svaret hittades inte.' }, { status: 404 })
    if (post.user_id !== user.id) return NextResponse.json({ error: 'Inte behörig.' }, { status: 403 })

    const { error } = await supabase
      .from('forum_posts')
      .update({ is_deleted: true })
      .eq('id', id)

    if (error) return NextResponse.json({ error: 'Kunde inte radera.' }, { status: 500 })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[forum/posts/[id]] delete error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

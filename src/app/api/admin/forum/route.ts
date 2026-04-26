import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/** PATCH /api/admin/forum — godkänn eller ta bort spam-köat forum-inlägg */
export async function PATCH(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()

    // Auth + admin guard
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { data: userRow } = await supabase
      .from('users')
      .select('is_admin')
      .eq('id', user.id)
      .single()
    if (!userRow?.is_admin) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const body = await req.json()
    const { id, type, action } = body as {
      id: string
      type: 'thread' | 'post'
      action: 'approve' | 'delete'
    }

    if (!id || !type || !action) {
      return NextResponse.json({ error: 'Bad request' }, { status: 400 })
    }

    const table = type === 'thread' ? 'forum_threads' : 'forum_posts'

    if (action === 'approve') {
      const { error } = await supabase
        .from(table)
        .update({ in_spam_queue: false })
        .eq('id', id)
      if (error) {
        console.error('[admin/forum] approve error:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
      }
    } else if (action === 'delete') {
      if (type === 'post') {
        // Soft-delete svar
        const { error } = await supabase
          .from('forum_posts')
          .update({ is_deleted: true })
          .eq('id', id)
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      } else {
        // Hard-delete tråd (aldrig publicerad — spam-kö)
        // Radera svar först för att undvika FK-brott
        await supabase.from('forum_posts').delete().eq('thread_id', id)
        const { error } = await supabase.from('forum_threads').delete().eq('id', id)
        if (error) return NextResponse.json({ error: error.message }, { status: 500 })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[admin/forum] unexpected error:', err)
    return NextResponse.json({ error: 'Serverfel' }, { status: 500 })
  }
}

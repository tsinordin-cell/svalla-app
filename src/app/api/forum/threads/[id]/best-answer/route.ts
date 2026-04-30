export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { logger } from '@/lib/logger'


/**
 * POST /api/forum/threads/[id]/best-answer
 * Body: { postId: string | null }
 *
 * Endast OP (trådägaren) kan markera ett svar som bästa svar.
 * postId=null → ta bort markeringen och sätt is_solved=false
 */
export async function POST(req: NextRequest, ctx: { params: Promise<{ id: string }> }) {
  const { id: threadId } = await ctx.params
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad' }, { status: 401 })

  const body = await req.json().catch(() => ({}))
  const postId: string | null = body?.postId ?? null

  // Verifiera att användaren är trådens ägare
  const { data: thread, error: threadErr } = await supabase
    .from('forum_threads')
    .select('id, user_id, title, category_id')
    .eq('id', threadId)
    .single()
  if (threadErr || !thread) return NextResponse.json({ error: 'Tråden hittades inte' }, { status: 404 })
  if (thread.user_id !== user.id) return NextResponse.json({ error: 'Endast trådens ägare kan markera bästa svar' }, { status: 403 })

  // Om postId — verifiera att posten tillhör tråden
  if (postId) {
    const { data: post, error: postErr } = await supabase
      .from('forum_posts')
      .select('id, user_id, thread_id')
      .eq('id', postId)
      .eq('thread_id', threadId)
      .single()
    if (postErr || !post) return NextResponse.json({ error: 'Inlägget tillhör inte denna tråd' }, { status: 400 })

    const { error: upErr } = await supabase
      .from('forum_threads')
      .update({ best_post_id: postId, is_solved: true })
      .eq('id', threadId)
    if (upErr) return NextResponse.json({ error: upErr.message }, { status: 500 })

    // Notifiera den som skrev svaret (om inte OP själv)
    if (post.user_id !== user.id) {
      await getAdminClient().from('notifications').insert({
        user_id: post.user_id,
        actor_id: user.id,
        type: 'forum_best_answer',
        reference_id: threadId,
      }).then(() => null, (e: unknown) => logger.error('best-answer', 'notif failed', { e }))

      const { sendPushToUsers } = await import('@/lib/push-server')
      await sendPushToUsers([post.user_id], {
        title: 'Ditt svar markerades som bäst',
        body: `i "${(thread.title ?? '').slice(0, 60)}"`,
        url: `/forum/${thread.category_id}/${threadId}`,
      })
    }
    return NextResponse.json({ ok: true, bestPostId: postId, isSolved: true })
  }

  // Ta bort markering
  const { error: clearErr } = await supabase
    .from('forum_threads')
    .update({ best_post_id: null, is_solved: false })
    .eq('id', threadId)
  if (clearErr) return NextResponse.json({ error: clearErr.message }, { status: 500 })

  return NextResponse.json({ ok: true, bestPostId: null, isSolved: false })
}

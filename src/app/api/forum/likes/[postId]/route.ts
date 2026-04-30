import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { checkRateLimit } from '@/lib/rateLimit'


/**
 * POST /api/forum/likes/[postId]
 * Togglar en like på ett forum_post.
 * Returnerar { liked: boolean, count: number }
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ postId: string }> },
) {
  try {
    const { postId } = await params
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })
    }

    // Rate limit: 30 likes per minut per användare
    if (!(await checkRateLimit(`forum-likes:${user.id}`, 30, 60 * 1000))) {
      return NextResponse.json({ error: 'För många likes. Vänta en stund.' }, { status: 429 })
    }

    // Verifiera att post finns och inte är borttagen
    const { data: post } = await supabase
      .from('forum_posts')
      .select('id, is_deleted, in_spam_queue, user_id, thread_id')
      .eq('id', postId)
      .single()

    if (!post || post.is_deleted || post.in_spam_queue) {
      return NextResponse.json({ error: 'Inlägget hittades inte.' }, { status: 404 })
    }

    // Kolla om redan gillat
    const { data: existing } = await supabase
      .from('forum_post_likes')
      .select('user_id')
      .eq('post_id', postId)
      .eq('user_id', user.id)
      .single()

    let liked: boolean

    if (existing) {
      // Redan gillat — ta bort
      await supabase
        .from('forum_post_likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id)
      liked = false
    } else {
      // Inte gillat — lägg till
      await supabase
        .from('forum_post_likes')
        .insert({ post_id: postId, user_id: user.id })
      liked = true

      // Skicka notis till inläggets ägare (inte till sig själv)
      if (post.user_id && post.user_id !== user.id) {
        getAdminClient().from('notifications').insert({
          user_id:      post.user_id,
          actor_id:     user.id,
          type:         'forum_like',
          reference_id: post.thread_id,
        }).then(({ error }) => { if (error) console.error('[forum/likes] notis-fel:', error) })
      }
    }

    // Hämta ny räknare
    const { count } = await supabase
      .from('forum_post_likes')
      .select('user_id', { count: 'exact', head: true })
      .eq('post_id', postId)

    return NextResponse.json({ liked, count: count ?? 0 })
  } catch (err) {
    console.error('[forum/likes] error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

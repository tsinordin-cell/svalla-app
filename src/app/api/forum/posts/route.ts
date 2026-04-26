import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'
import { getUserForumPostCount } from '@/lib/forum'

/** POST /api/forum/posts — skapa svar på tråd */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })
    }

    // Rate limit: 5 forum-actions per 10 minuter per användare
    const rlKey = `forum:${user.id}`
    if (!checkRateLimit(rlKey, 5, 10 * 60 * 1000)) {
      return NextResponse.json({ error: 'Du skriver för snabbt. Vänta en stund.' }, { status: 429 })
    }

    const reqBody = await req.json()
    const { threadId, body } = reqBody

    if (!threadId || typeof threadId !== 'string') {
      return NextResponse.json({ error: 'Ogiltig tråd.' }, { status: 400 })
    }

    const trimBody = (body ?? '').trim()
    if (trimBody.length < 1 || trimBody.length > 10000) {
      return NextResponse.json({ error: 'Ogiltigt svar (1–10 000 tecken).' }, { status: 400 })
    }

    // Verifiera att tråden finns och inte är låst
    const { data: thread, error: threadError } = await supabase
      .from('forum_threads')
      .select('id, is_locked, user_id')
      .eq('id', threadId)
      .eq('in_spam_queue', false)
      .single()

    if (threadError || !thread) {
      return NextResponse.json({ error: 'Tråden hittades inte.' }, { status: 404 })
    }
    if (thread.is_locked) {
      return NextResponse.json({ error: 'Tråden är låst.' }, { status: 403 })
    }

    // Spam-kö: om användaren har färre än 3 godkända inlägg totalt
    const approvedCount = await getUserForumPostCount(user.id)
    const inSpamQueue   = approvedCount < 3

    const { data: post, error: insertError } = await supabase
      .from('forum_posts')
      .insert({
        thread_id:     threadId,
        user_id:       user.id,
        body:          trimBody,
        in_spam_queue: inSpamQueue,
      })
      .select('id')
      .single()

    if (insertError || !post) {
      console.error('[forum/posts] insert error:', insertError)
      return NextResponse.json({ error: 'Kunde inte spara svaret.' }, { status: 500 })
    }

    // Skicka forum_reply-notis till trådens skapare (om det inte är samma person)
    if (!inSpamQueue && thread.user_id && thread.user_id !== user.id) {
      await supabase.from('notifications').insert({
        user_id:      thread.user_id,
        actor_id:     user.id,
        type:         'forum_reply',
        reference_id: threadId,
      }).then(({ error }) => {
        if (error) console.error('[forum/posts] notification error:', error)
      })
    }

    return NextResponse.json({
      id:            post.id,
      in_spam_queue: inSpamQueue,
    })
  } catch (err) {
    console.error('[forum/posts] unexpected error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

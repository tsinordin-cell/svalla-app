import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rateLimit'
import { getUserForumPostCount } from '@/lib/forum'
import { sendPushToUsers } from '@/lib/push-server'
import { extractMentions } from '@/lib/forum-mentions'

function svcClient() {
  return createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false, autoRefreshToken: false },
  })
}

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
    if (!(await checkRateLimit(rlKey, 5, 10 * 60 * 1000))) {
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
      .select('id, is_locked, user_id, title, category_id')
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

    // Auto-prenumerera den som svarar
    await supabase.from('forum_subscriptions')
      .upsert({ user_id: user.id, thread_id: threadId }, { onConflict: 'user_id,thread_id', ignoreDuplicates: true })

    // Notifiera thread-ägare + prenumeranter + tidigare deltagare + mentions (fire-and-forget)
    if (!inSpamQueue) {
      // Extrahera mentions först — dessa får specifik mention-notis (prio över reply-notis)
      const mentionedUsernames = extractMentions(trimBody)
      void notifyForumParticipants({
        threadId,
        threadTitle:    thread.title,
        threadOwnerId:  thread.user_id,
        categoryId:     thread.category_id,
        posterId:       user.id,
        mentionedUsernames,
        supabase,
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

// ── Push notifications ──────────────────────────────────────────────────────

interface NotifyParams {
  threadId:           string
  threadTitle:        string
  threadOwnerId:      string
  categoryId:         string
  posterId:           string
  mentionedUsernames: string[]
  supabase:           Awaited<ReturnType<typeof createServerSupabaseClient>>
}

async function notifyForumParticipants({
  threadId, threadTitle, threadOwnerId, categoryId, posterId, mentionedUsernames, supabase,
}: NotifyParams): Promise<void> {
  try {
    // Poster's username for notification text
    const { data: posterRow } = await supabase
      .from('users')
      .select('username')
      .eq('id', posterId)
      .maybeSingle()
    const posterName = (posterRow?.username as string | undefined) ?? 'Någon'

    // Resolve mentioned usernames to user-ids (case-insensitive)
    const mentionedIds = new Set<string>()
    if (mentionedUsernames.length > 0) {
      const svc = svcClient()
      const { data: mentionRows } = await svc
        .from('users')
        .select('id, username')
        .in('username', mentionedUsernames)
      ;(mentionRows ?? []).forEach((u: { id: string; username: string }) => {
        if (u.id !== posterId) mentionedIds.add(u.id)
      })

      // Skapa mention-notis för varje + skicka specifik push
      if (mentionedIds.size > 0) {
        const shortTitleM = threadTitle.length > 55 ? threadTitle.slice(0, 55) + '…' : threadTitle
        const notifRows = [...mentionedIds].map(uid => ({
          user_id: uid,
          actor_id: posterId,
          type: 'forum_mention',
          reference_id: threadId,
        }))
        const { error: mErr } = await svc.from('notifications').insert(notifRows)
        if (mErr) console.error('[forum/posts] mention-notis-fel:', mErr)

        await sendPushToUsers([...mentionedIds], {
          title: `${posterName} taggade dig`,
          body:  `i "${shortTitleM}"`,
          url:   `/forum/${categoryId}/${threadId}`,
        })
      }
    }

    // Previous participants who replied + prenumeranter
    const [{ data: prevPosts }, { data: subscribers }] = await Promise.all([
      supabase
        .from('forum_posts')
        .select('user_id')
        .eq('thread_id', threadId)
        .eq('in_spam_queue', false)
        .neq('user_id', posterId),
      supabase
        .from('forum_subscriptions')
        .select('user_id')
        .eq('thread_id', threadId)
        .neq('user_id', posterId),
    ])

    const prevParticipants = [...new Set((prevPosts ?? []).map((p: { user_id: string }) => p.user_id))]
    const subscriberIds    = (subscribers ?? []).map((s: { user_id: string }) => s.user_id)

    // Collect recipients: thread owner + subscribers + past participants, excluding poster + mentioned
    const recipientSet = new Set<string>()
    if (threadOwnerId !== posterId && !mentionedIds.has(threadOwnerId)) recipientSet.add(threadOwnerId)
    subscriberIds.forEach(uid => { if (!mentionedIds.has(uid)) recipientSet.add(uid) })
    prevParticipants
      .filter(uid => uid !== threadOwnerId && !mentionedIds.has(uid))
      .slice(0, 19)
      .forEach(uid => recipientSet.add(uid))

    if (recipientSet.size === 0) return

    // Insert DB notification for thread owner (only if not already mentioned)
    if (threadOwnerId !== posterId && !mentionedIds.has(threadOwnerId)) {
      const { error: notifErr } = await svcClient().from('notifications').insert({
        user_id:      threadOwnerId,
        actor_id:     posterId,
        type:         'forum_reply',
        reference_id: threadId,
      })
      if (notifErr) console.error('[forum/posts] notis-fel:', notifErr)
    }

    const shortTitle = threadTitle.length > 55
      ? threadTitle.slice(0, 55) + '…'
      : threadTitle

    await sendPushToUsers([...recipientSet], {
      title: 'Nytt svar i forumet',
      body:  `${posterName} svarade i "${shortTitle}"`,
      url:   `/forum/${categoryId}/${threadId}`,
    })
  } catch (err) {
    console.error('[forum/posts] notifyForumParticipants error:', err)
  }
}

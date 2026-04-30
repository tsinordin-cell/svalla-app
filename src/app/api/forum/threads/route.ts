import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { checkRateLimit } from '@/lib/rateLimit'
import { getUserForumPostCount } from '@/lib/forum'
import { STATIC_CATEGORIES } from '@/lib/forum-categories'

/** POST /api/forum/threads — skapa ny tråd */
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

    const body = await req.json()
    const { categoryId, title, body: postBody } = body

    // Validera kategori
    const validIds = STATIC_CATEGORIES.map(c => c.id)
    if (!categoryId || !validIds.includes(categoryId)) {
      return NextResponse.json({ error: 'Ogiltig kategori.' }, { status: 400 })
    }

    // Validera title + body
    const trimTitle = (title ?? '').trim()
    const trimBody  = (postBody ?? '').trim()
    if (trimTitle.length < 5 || trimTitle.length > 200) {
      return NextResponse.json({ error: 'Ogiltig rubrik (5–200 tecken).' }, { status: 400 })
    }
    if (trimBody.length < 10 || trimBody.length > 10000) {
      return NextResponse.json({ error: 'Ogiltig text (10–10 000 tecken).' }, { status: 400 })
    }

    // Spam-kö: om användaren har färre än 3 godkända inlägg totalt
    const approvedCount = await getUserForumPostCount(user.id)
    const inSpamQueue   = approvedCount < 3

    const { data: thread, error: insertError } = await supabase
      .from('forum_threads')
      .insert({
        category_id:   categoryId,
        user_id:       user.id,
        title:         trimTitle,
        body:          trimBody,
        in_spam_queue: inSpamQueue,
      })
      .select('id')
      .single()

    if (insertError || !thread) {
      console.error('[forum/threads] insert error:', insertError)
      return NextResponse.json({ error: 'Kunde inte spara tråden.' }, { status: 500 })
    }

    return NextResponse.json({
      id:          thread.id,
      in_spam_queue: inSpamQueue,
    })
  } catch (err) {
    console.error('[forum/threads] unexpected error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

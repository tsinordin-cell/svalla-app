import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/**
 * POST /api/forum/subscribe/[threadId]
 * Togglar prenumeration på en forumtråd.
 * Returnerar { subscribed: boolean }
 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ threadId: string }> },
) {
  try {
    const { threadId } = await params
    const supabase = await createServerSupabaseClient()

    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      return NextResponse.json({ error: 'Du måste vara inloggad.' }, { status: 401 })
    }

    // Kolla befintlig prenumeration
    const { data: existing } = await supabase
      .from('forum_subscriptions')
      .select('user_id')
      .eq('user_id', user.id)
      .eq('thread_id', threadId)
      .maybeSingle()

    if (existing) {
      await supabase
        .from('forum_subscriptions')
        .delete()
        .eq('user_id', user.id)
        .eq('thread_id', threadId)
      return NextResponse.json({ subscribed: false })
    } else {
      await supabase
        .from('forum_subscriptions')
        .insert({ user_id: user.id, thread_id: threadId })
      return NextResponse.json({ subscribed: true })
    }
  } catch (err) {
    console.error('[forum/subscribe] error:', err)
    return NextResponse.json({ error: 'Serverfel.' }, { status: 500 })
  }
}

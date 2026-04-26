import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

/** GET /api/forum/search?q=... — sök i forum-trådar */
export async function GET(req: NextRequest) {
  try {
    const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''
    if (q.length < 2) {
      return NextResponse.json({ results: [] })
    }

    const supabase = await createServerSupabaseClient()
    const pattern = `%${q}%`

    const { data } = await supabase
      .from('forum_threads')
      .select('id, category_id, title, body, created_at, user_id, reply_count')
      .eq('in_spam_queue', false)
      .eq('is_deleted', false)
      .or(`title.ilike.${pattern},body.ilike.${pattern}`)
      .order('last_reply_at', { ascending: false })
      .limit(20)

    if (!data || data.length === 0) {
      return NextResponse.json({ results: [] })
    }

    // Enrich with author usernames
    const userIds = [...new Set(data.map(t => t.user_id))]
    const { data: users } = await supabase
      .from('users')
      .select('id, username')
      .in('id', userIds)
    const umap = new Map((users ?? []).map((u: { id: string; username: string }) => [u.id, u.username]))

    const results = data.map(t => ({
      id:          t.id,
      category_id: t.category_id,
      title:       t.title,
      // Snippat utdrag runt sökordet
      excerpt: snippet(t.body, q),
      reply_count: t.reply_count,
      created_at:  t.created_at,
      author:      umap.get(t.user_id) ?? null,
    }))

    return NextResponse.json({ results })
  } catch (err) {
    console.error('[forum/search] error:', err)
    return NextResponse.json({ results: [] })
  }
}

/** Returnerar ett ~120-teckens utdrag runt sökordet */
function snippet(text: string, query: string, maxLen = 120): string {
  const lower = text.toLowerCase()
  const idx   = lower.indexOf(query.toLowerCase())
  if (idx === -1) return text.slice(0, maxLen) + (text.length > maxLen ? '…' : '')
  const start = Math.max(0, idx - 40)
  const end   = Math.min(text.length, idx + query.length + 80)
  return (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '')
}

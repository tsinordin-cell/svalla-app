export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
// TODO: wrap handlers with withSentrySimple(handler, 'forum/mention-search') — se src/lib/api-handler.ts

/**
 * GET /api/forum/mention-search?q=ma
 *
 * Användarsökning för @-mention-autocomplete i forum.
 * Begränsat till 8 resultat. Endast inloggade.
 * Cache-Control: ingen — autocomplete kräver färska resultat.
 */
export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? ''

  const cookieStore = await cookies()
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) =>
          cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ users: [] }, { status: 401 })
  }

  // Om query är tom — returnera senast aktiva användare istället
  let query = supabase
    .from('users')
    .select('id, username, avatar')
    .not('username', 'is', null)
    .order('updated_at', { ascending: false, nullsFirst: false })
    .limit(8)

  if (q.length > 0) {
    // ILIKE prefix-sök på username
    query = query.ilike('username', `${q}%`)
  }

  const { data, error } = await query
  if (error) {
    return NextResponse.json({ users: [], error: error.message }, { status: 500 })
  }

  return NextResponse.json({ users: data ?? [] })
}

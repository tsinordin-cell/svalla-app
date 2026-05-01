export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { logger } from '@/lib/logger'
// TODO: wrap handlers with withSentrySimple(handler, 'route-feedback') — se src/lib/api-handler.ts

/**
 * POST /api/route-feedback
 *
 * Tar emot rapporter om felaktiga rutter i /planera. Sparas i tabellen
 * `route_feedback` (skapas via SQL-migration nedan) så Tom kan granska
 * dem från admin-vyn och förbättra waypoint-data.
 *
 * Skapa tabellen i Supabase:
 *   create table if not exists route_feedback (
 *     id uuid primary key default gen_random_uuid(),
 *     route_id text not null,
 *     start_name text,
 *     end_name text,
 *     issue_type text not null,
 *     comment text,
 *     user_id uuid references auth.users(id) on delete set null,
 *     resolved boolean not null default false,
 *     created_at timestamptz not null default now()
 *   );
 *   alter table route_feedback enable row level security;
 *   create policy "route_feedback_insert" on route_feedback for insert
 *     with check (true);
 *   create policy "route_feedback_admin_read" on route_feedback for select
 *     using (auth.uid() in (select id from users where is_admin = true));
 */

type FeedbackBody = {
  routeId?: unknown
  startName?: unknown
  endName?: unknown
  issueType?: unknown
  comment?: unknown
}

const VALID_ISSUE_TYPES = new Set(['over-land', 'wrong-distance', 'wrong-stop', 'other'])

export async function POST(req: NextRequest) {
  let body: FeedbackBody
  try {
    body = await req.json() as FeedbackBody
  } catch {
    return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 })
  }

  const routeId = typeof body.routeId === 'string' ? body.routeId.slice(0, 100) : null
  const startName = typeof body.startName === 'string' ? body.startName.slice(0, 200) : null
  const endName = typeof body.endName === 'string' ? body.endName.slice(0, 200) : null
  const issueType = typeof body.issueType === 'string' && VALID_ISSUE_TYPES.has(body.issueType) ? body.issueType : null
  const comment = typeof body.comment === 'string' ? body.comment.slice(0, 1000) : null

  if (!routeId || !issueType) {
    return NextResponse.json({ error: 'routeId och issueType krävs' }, { status: 400 })
  }

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

  // Lättviktig rate-limit per användare/IP
  const { checkRateLimit } = await import('@/lib/rateLimit')
  const rateKey = user?.id ?? req.headers.get('x-forwarded-for') ?? 'anon'
  if (!(await checkRateLimit(`route-feedback:${rateKey}`, 5, 60_000))) {
    return NextResponse.json({ error: 'För många rapporter. Vänta en stund.' }, { status: 429 })
  }

  const { error } = await supabase.from('route_feedback').insert({
    route_id: routeId,
    start_name: startName,
    end_name: endName,
    issue_type: issueType,
    comment,
    user_id: user?.id ?? null,
  })

  if (error) {
    logger.error('route-feedback', 'insert failed', { error: error.message, routeId })
    return NextResponse.json({ error: 'Kunde inte spara rapporten' }, { status: 500 })
  }

  logger.info('route-feedback', 'submitted', { routeId, issueType, hasUser: !!user })
  return NextResponse.json({ ok: true })
}

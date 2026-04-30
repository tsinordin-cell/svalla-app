export const dynamic = 'force-dynamic'

import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { logger } from '@/lib/logger'

/**
 * PATCH /api/admin/feedback/[id]
 *
 * Markerar en route_feedback-rad som löst eller olöst. Endast admin
 * (is_admin = true) får anropa.
 */
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  if (!id || typeof id !== 'string') {
    return NextResponse.json({ error: 'id krävs' }, { status: 400 })
  }

  let body: { resolved?: unknown }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }
  const resolved = body.resolved === true

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
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Verifiera admin
  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { error } = await supabase
    .from('route_feedback')
    .update({ resolved })
    .eq('id', id)

  if (error) {
    logger.error('admin/feedback', 'update failed', { id, error: error.message })
    return NextResponse.json({ error: 'Kunde inte uppdatera' }, { status: 500 })
  }

  return NextResponse.json({ ok: true, resolved })
}

export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { adminUpdateReport } from '@/lib/moderation'

export async function PATCH(req: Request) {
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
    },
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  // Admin-kontroll
  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }

  const { reportId, status, note } = body as {
    reportId?: string
    status?: string
    note?: string
  }

  if (!reportId || typeof reportId !== 'string') {
    return NextResponse.json({ error: 'reportId saknas' }, { status: 400 })
  }
  if (!status || !['reviewed', 'actioned', 'dismissed'].includes(status)) {
    return NextResponse.json({ error: 'Ogiltigt status' }, { status: 400 })
  }

  const ok = await adminUpdateReport(
    supabase,
    reportId,
    status as 'reviewed' | 'actioned' | 'dismissed',
    typeof note === 'string' ? note : undefined,
  )

  if (!ok) return NextResponse.json({ error: 'Kunde inte uppdatera' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

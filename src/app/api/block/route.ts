export const dynamic = 'force-dynamic'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { blockUser, unblockUser } from '@/lib/blocks'

export async function POST(req: Request) {
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

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }

  const { userId } = body as { userId?: string }
  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'userId saknas' }, { status: 400 })
  }
  if (userId === user.id) {
    return NextResponse.json({ error: 'Du kan inte blockera dig själv' }, { status: 400 })
  }

  const ok = await blockUser(supabase, user.id, userId)
  if (!ok) return NextResponse.json({ error: 'Kunde inte blockera' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

export async function DELETE(req: Request) {
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

  let body: Record<string, unknown>
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltigt JSON' }, { status: 400 })
  }

  const { userId } = body as { userId?: string }
  if (!userId || typeof userId !== 'string') {
    return NextResponse.json({ error: 'userId saknas' }, { status: 400 })
  }

  const ok = await unblockUser(supabase, user.id, userId)
  if (!ok) return NextResponse.json({ error: 'Kunde inte avblockera' }, { status: 500 })
  return NextResponse.json({ ok: true })
}

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'

export async function POST(req: Request) {
  // Rate limit: 10 requests per minute per user
  const cookieStore = await cookies()
  const userId = req.headers.get('x-user-id') || 'unknown'
  if (!checkRateLimit(`push-subscribe:${userId}`, 10, 60 * 1000)) {
    return NextResponse.json({ error: 'Försökt för många gånger. Vänta en minut.' }, { status: 429 })
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cs: { name: string; value: string; options?: object }[]) => cs.forEach(({ name, value, options }) => cookieStore.set(name, value, options ?? {})),
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  let sub: { endpoint?: string; keys?: { p256dh?: string; auth?: string } }
  try { sub = await req.json() } catch { return NextResponse.json({ error: 'Ogiltig JSON' }, { status: 400 }) }

  const endpoint = sub?.endpoint
  const p256dh   = sub?.keys?.p256dh
  const auth     = sub?.keys?.auth

  if (!endpoint || !p256dh || !auth ||
      typeof endpoint !== 'string' || typeof p256dh !== 'string' || typeof auth !== 'string') {
    return NextResponse.json({ error: 'Ogiltig push-subscription' }, { status: 400 })
  }

  const { error } = await supabase.from('push_subscriptions').upsert(
    { user_id: user.id, endpoint, p256dh, auth },
    { onConflict: 'user_id,endpoint' }
  )

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}

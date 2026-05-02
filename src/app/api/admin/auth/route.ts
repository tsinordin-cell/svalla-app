/**
 * Admin password gate.
 * POST /api/admin/auth { password, csrfToken } → sätter HttpOnly-cookie 'svalla_admin' i 30 dagar.
 *   Cookievärdet är ett HMAC-SHA256-token (ej statisk sträng).
 *   csrfToken valideras mot 'csrf_admin'-cookie (double-submit CSRF-skydd).
 * DELETE /api/admin/auth → loggar ut (rensar cookien).
 *
 * Lösenord läses från env ADMIN_PASSWORD. Saknas env → 503.
 * Ingen fallback. Sätt ADMIN_PASSWORD i Vercel Production + Preview + Development.
 */
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { computeAdminToken } from '@/lib/adminToken'
import { checkRateLimit } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const COOKIE_NAME = 'svalla_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 dagar

/** Konstant-tids strängjämförelse för att undvika timing-attacker. */
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

export async function POST(req: Request) {
  if (!ADMIN_PASSWORD) {
    console.error('[admin/auth] ADMIN_PASSWORD env saknas — admin är inte konfigurerad')
    return NextResponse.json({ error: 'Admin auth not configured' }, { status: 503 })
  }

  // Rate limit: max 10 inloggningsförsök per minut per IP
  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
  if (!(await checkRateLimit(`admin-login:${ip}`, 10, 60_000))) {
    return NextResponse.json({ error: 'För många försök. Vänta en minut.' }, { status: 429 })
  }

  let body: { password?: string; csrfToken?: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { password, csrfToken } = body

  // ── CSRF-validering (double-submit) ──
  // Jämför csrfToken från body mot 'csrf_admin'-cookie satt av /api/admin/csrf.
  // En cross-site angripare kan varken läsa cookien eller svaret från CSRF-endpointen (SOP).
  const cookieStore = await cookies()
  const csrfCookie = cookieStore.get('csrf_admin')?.value
  if (!csrfToken || !csrfCookie || !safeEqual(csrfToken, csrfCookie)) {
    return NextResponse.json({ error: 'Ogiltig CSRF-token' }, { status: 403 })
  }

  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  // Konstant-tids lösenordsjämförelse
  if (!safeEqual(password, ADMIN_PASSWORD)) {
    return NextResponse.json({ error: 'Fel lösenord' }, { status: 401 })
  }

  // Beräkna HMAC-token — cookievärdet kan inte förfalskas utan att känna till lösenordet
  const token = await computeAdminToken(ADMIN_PASSWORD)

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: COOKIE_MAX_AGE,
  })
  // Rensa CSRF-cookien — en-gångs-token
  res.cookies.set('csrf_admin', '', {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 0,
  })
  return res
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, '', {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 0,
  })
  return res
}

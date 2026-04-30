/**
 * Admin password gate.
 * POST /api/admin/auth { password } → sätter HttpOnly-cookie 'svalla_admin' i 30 dagar.
 *   Cookievärdet är ett HMAC-SHA256-token (ej statisk sträng).
 * DELETE /api/admin/auth → loggar ut (rensar cookien).
 *
 * Lösenord läses från env ADMIN_PASSWORD. Saknas env → 503.
 * Ingen fallback. Sätt ADMIN_PASSWORD i Vercel Production + Preview + Development.
 */
import { NextResponse } from 'next/server'
import { computeAdminToken } from '@/lib/adminToken'
import { checkRateLimit } from '@/lib/rateLimit'

export const dynamic = 'force-dynamic'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const COOKIE_NAME = 'svalla_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 dagar

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

  let body: { password?: string }
  try { body = await req.json() }
  catch { return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 }) }

  const { password } = body
  if (typeof password !== 'string' || !password) {
    return NextResponse.json({ error: 'Password required' }, { status: 400 })
  }

  // Konstant-tids jämförelse för att undvika timing-attacker
  if (password.length !== ADMIN_PASSWORD.length) {
    return NextResponse.json({ error: 'Fel lösenord' }, { status: 401 })
  }
  let mismatch = 0
  for (let i = 0; i < ADMIN_PASSWORD.length; i++) {
    mismatch |= password.charCodeAt(i) ^ ADMIN_PASSWORD.charCodeAt(i)
  }
  if (mismatch !== 0) {
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

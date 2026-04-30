/**
 * Admin password gate.
 * POST /api/admin/auth { password } → sätter HttpOnly-cookie 'svalla_admin=ok' i 30 dagar.
 * DELETE /api/admin/auth → loggar ut (rensar cookien).
 *
 * Lösenord läses från env ADMIN_PASSWORD. Saknas env → 503 (admin är inte konfigurerad).
 * Ingen fallback. Sätt ADMIN_PASSWORD i Vercel Production + Preview + Development.
 */
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD
const COOKIE_NAME = 'svalla_admin'
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 dagar

export async function POST(req: Request) {
  if (!ADMIN_PASSWORD) {
    console.error('[admin/auth] ADMIN_PASSWORD env saknas — admin är inte konfigurerad')
    return NextResponse.json({ error: 'Admin auth not configured' }, { status: 503 })
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

  const res = NextResponse.json({ ok: true })
  res.cookies.set(COOKIE_NAME, 'ok', {
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

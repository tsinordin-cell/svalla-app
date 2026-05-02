/**
 * GET /api/admin/csrf
 * Genererar ett CSRF-token för admin-login-formuläret.
 * Sätter token i httpOnly-cookie 'csrf_admin' och returnerar det i JSON.
 *
 * Formuläret inkluderar token i POST-body. /api/admin/auth verifierar
 * att body-token matchar cookie-token (double-submit pattern).
 *
 * SOP (Same-Origin Policy) skyddar: en cross-site angripare kan varken
 * läsa detta svar eller läsa cookien, och kan därför inte konstruera
 * ett giltigt POST-anrop.
 */
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Generera 32 bytes kryptografisk slumpmässighet
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  const token = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('')

  const res = NextResponse.json({ csrfToken: token })
  res.cookies.set('csrf_admin', token, {
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 15,
  })
  return res
}

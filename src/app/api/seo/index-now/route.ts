/**
 * POST /api/seo/index-now
 *
 * Triggar Google Indexing API för en URL — meddelar Google att en sida
 * har skapats eller uppdaterats. Används för Loppis-annonser så de
 * indexeras snabbt (annars kan det ta dagar).
 *
 * Körning kräver service-account JSON i env (GOOGLE_INDEXING_SA_JSON):
 *   STRINGIFIED JSON med 'client_email' + 'private_key'.
 *
 * Skickar även till IndexNow (Bing/Yandex) om INDEXNOW_KEY är satt.
 *
 * Body: { url: string, type?: 'URL_UPDATED' | 'URL_DELETED' }
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

interface ServiceAccount {
  client_email: string
  private_key: string
}

async function getGoogleAccessToken(sa: ServiceAccount): Promise<string | null> {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  const enc = (o: object) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const unsigned = `${enc(header)}.${enc(claim)}`

  // Sign med RSA-SHA256 via Node:crypto
  const { createSign } = await import('node:crypto')
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  const signature = signer.sign(sa.private_key).toString('base64url')
  const jwt = `${unsigned}.${signature}`

  const tokRes = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  if (!tokRes.ok) return null
  const tok = await tokRes.json()
  return tok.access_token ?? null
}

async function pingGoogleIndexing(url: string, type: 'URL_UPDATED' | 'URL_DELETED' = 'URL_UPDATED'): Promise<{ ok: boolean; error?: string }> {
  const saJson = process.env.GOOGLE_INDEXING_SA_JSON
  if (!saJson) return { ok: false, error: 'GOOGLE_INDEXING_SA_JSON saknas i env' }
  let sa: ServiceAccount
  try { sa = JSON.parse(saJson) }
  catch { return { ok: false, error: 'GOOGLE_INDEXING_SA_JSON är inte giltig JSON' } }
  if (!sa.client_email || !sa.private_key) return { ok: false, error: 'SA-JSON saknar client_email/private_key' }

  const token = await getGoogleAccessToken(sa)
  if (!token) return { ok: false, error: 'Kunde inte få access-token från Google' }

  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url, type }),
  })
  if (!res.ok) {
    const text = await res.text()
    return { ok: false, error: `Google Indexing API: ${res.status} ${text.slice(0, 200)}` }
  }
  return { ok: true }
}

async function pingIndexNow(url: string): Promise<{ ok: boolean; error?: string }> {
  const key = process.env.INDEXNOW_KEY
  if (!key) return { ok: true } // optional — skip om inte konfigurerad
  const res = await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}`)
  if (!res.ok) return { ok: false, error: `IndexNow: ${res.status}` }
  return { ok: true }
}

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })

  let body: { url?: unknown; type?: unknown }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }

  const url = typeof body.url === 'string' ? body.url : ''
  if (!url || !url.startsWith('https://svalla.se/')) {
    return NextResponse.json({ error: 'url måste vara svalla.se-URL.' }, { status: 400 })
  }
  const type = body.type === 'URL_DELETED' ? 'URL_DELETED' : 'URL_UPDATED'

  const [google, indexNow] = await Promise.all([
    pingGoogleIndexing(url, type),
    pingIndexNow(url),
  ])

  return NextResponse.json({
    ok: google.ok || indexNow.ok,
    google,
    indexNow,
  })
}

/**
 * POST /api/seo/index-bulk
 *
 * Bulk-skickar alla URL:er från sitemap.xml till Google Indexing API + IndexNow.
 * Skyddas av CRON_SECRET så bara ägaren kan köra (rate-limit-sensitive).
 *
 * Användning från terminal:
 *   curl -X POST https://svalla.se/api/seo/index-bulk \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * Eller från GitHub Actions cron 1 gång/månad efter större deploys.
 *
 * Begränsning: Google Indexing API tar 200 req/dag per service-account.
 * Sitemap har ~150 URL:er → klarar i ett svep. Pausen 100ms mellan calls.
 */
import { NextRequest, NextResponse } from 'next/server'
import { createSign } from 'node:crypto'

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
  const signer = createSign('RSA-SHA256')
  signer.update(unsigned)
  const signature = signer.sign(sa.private_key).toString('base64url')
  const jwt = `${unsigned}.${signature}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: jwt,
    }),
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.access_token ?? null
}

async function pingGoogle(token: string, url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  })
  if (!res.ok) {
    const text = await res.text()
    return { ok: false, status: res.status, error: text.substring(0, 150) }
  }
  return { ok: true }
}

async function pingIndexNow(url: string): Promise<{ ok: boolean }> {
  const key = process.env.INDEXNOW_KEY
  if (!key) return { ok: true } // optional
  try {
    const res = await fetch(`https://api.indexnow.org/indexnow?url=${encodeURIComponent(url)}&key=${key}`)
    return { ok: res.ok }
  } catch { return { ok: false } }
}

// Tillåt POST utan användar-auth men kräver CRON_SECRET (samma pattern som befintliga cron-endpoints)
export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? ''
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const saJson = process.env.GOOGLE_INDEXING_SA_JSON
  if (!saJson) {
    return NextResponse.json({ error: 'GOOGLE_INDEXING_SA_JSON saknas i env.' }, { status: 500 })
  }
  let sa: ServiceAccount
  try { sa = JSON.parse(saJson) }
  catch { return NextResponse.json({ error: 'SA-JSON ogiltig.' }, { status: 500 }) }

  // Hämta sitemap
  const xml = await fetch('https://svalla.se/sitemap.xml').then(r => r.text()).catch(() => '')
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
    .map(m => m[1])
    .filter((u): u is string => typeof u === 'string')
  if (urls.length === 0) {
    return NextResponse.json({ error: 'Sitemap kunde inte parsas.' }, { status: 500 })
  }

  const token = await getGoogleAccessToken(sa)
  if (!token) {
    return NextResponse.json({ error: 'Kunde inte få access-token från Google.' }, { status: 500 })
  }

  const results: Array<{ url: string; google: { ok: boolean; status?: number; error?: string }; indexNow: { ok: boolean } }> = []
  let okCount = 0
  let failCount = 0
  let rateLimited = false

  for (const url of urls) {
    const [g, n] = await Promise.all([pingGoogle(token, url), pingIndexNow(url)])
    results.push({ url, google: g, indexNow: n })
    if (g.ok) okCount++; else failCount++
    if (g.status === 429) {
      rateLimited = true
      break
    }
    await new Promise(r => setTimeout(r, 100))
  }

  return NextResponse.json({
    total: urls.length,
    processed: results.length,
    ok: okCount,
    fail: failCount,
    rateLimited,
    results: results.slice(0, 30), // max 30 i response för att inte överskrida limit
  })
}

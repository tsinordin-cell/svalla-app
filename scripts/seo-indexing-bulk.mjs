/**
 * Triggar Google Indexing API på ALLA URL:er från sitemap.xml.
 * Kör efter Schema.org + BAILOUT-fix är deployade.
 *
 * Begränsning: Google's free Indexing API tar 200 req/dag per service-account.
 * Sitemap har ~150 URL:er → klarar i ett svep. Vid >200 splittar vi över dagar.
 *
 * Körning: node scripts/seo-indexing-bulk.mjs
 */
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import path from 'path'
import { createSign } from 'node:crypto'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
dotenv.config({ path: path.join(__dirname, '../.env.local') })

const SA_JSON = process.env.GOOGLE_INDEXING_SA_JSON
if (!SA_JSON) {
  console.error('Saknar GOOGLE_INDEXING_SA_JSON i env. Se Block G för setup.')
  console.error('Du måste sätta service-account-creds i Vercel/lokal .env.local.')
  process.exit(1)
}

let sa
try { sa = JSON.parse(SA_JSON) } catch { console.error('GOOGLE_INDEXING_SA_JSON är inte giltig JSON'); process.exit(1) }
if (!sa.client_email || !sa.private_key) {
  console.error('Service-account JSON saknar client_email eller private_key')
  process.exit(1)
}

async function getAccessToken() {
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/indexing',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now,
  }
  const enc = (o) => Buffer.from(JSON.stringify(o)).toString('base64url')
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
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Token-fel: ${res.status} ${txt}`)
  }
  const data = await res.json()
  return data.access_token
}

async function pingIndexing(token, url) {
  const res = await fetch('https://indexing.googleapis.com/v3/urlNotifications:publish', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify({ url, type: 'URL_UPDATED' }),
  })
  if (!res.ok) {
    const txt = await res.text()
    return { ok: false, status: res.status, error: txt.substring(0, 200) }
  }
  return { ok: true }
}

async function main() {
  console.log('Hämtar sitemap...')
  const xml = await fetch('https://svalla.se/sitemap.xml').then(r => r.text())
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g)).map(m => m[1])
  console.log(`Hittade ${urls.length} URL:er i sitemap.xml`)

  console.log('Hämtar Google access-token...')
  const token = await getAccessToken()
  console.log('Token klar.')

  let ok = 0, fail = 0
  for (const url of urls) {
    const r = await pingIndexing(token, url)
    if (r.ok) {
      ok++
      console.log(`  ✓ ${url}`)
    } else {
      fail++
      console.error(`  ✗ ${url} — ${r.status} ${r.error}`)
      if (r.status === 429) {
        console.error('Rate limit nådd — stoppar. Återstående URL:er kan köras senare.')
        break
      }
    }
    // Liten paus för rate-limiting
    await new Promise(r => setTimeout(r, 100))
  }
  console.log(`\nKlart: ${ok} OK, ${fail} fel.`)
}

main().catch(err => { console.error(err); process.exit(1) })

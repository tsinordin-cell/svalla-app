/**
 * POST /api/seo/index-bulk
 *
 * Skickar alla URL:er i sitemap.xml till IndexNow (Bing, Yandex m.fl.) i ett
 * anrop. Skyddas av CRON_SECRET.
 *
 *   curl -X POST https://svalla.se/api/seo/index-bulk \
 *     -H "Authorization: Bearer $CRON_SECRET"
 *
 * Google Indexing API togs bort 2026-10-10: det är bara avsett för jobbannonser
 * och livesändningar. Google läser sitemap.xml, som nu har riktiga
 * ändringsdatum (src/lib/sidodatum.ts). Se src/lib/indexnow.ts.
 */
import { NextRequest, NextResponse } from 'next/server'
import { pingaIndexNow } from '@/lib/indexnow'

export async function POST(req: NextRequest) {
  const auth = req.headers.get('authorization') ?? ''
  const expected = process.env.CRON_SECRET
  if (!expected || auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const xml = await fetch('https://svalla.se/sitemap.xml').then(r => r.text()).catch(() => '')
  const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
    .map(m => m[1])
    .filter((u): u is string => typeof u === 'string')
  if (urls.length === 0) {
    return NextResponse.json({ error: 'Sitemap kunde inte parsas.' }, { status: 500 })
  }

  const indexNow = await pingaIndexNow(urls)
  return NextResponse.json({ total: urls.length, indexNow }, { status: indexNow.ok ? 200 : 502 })
}

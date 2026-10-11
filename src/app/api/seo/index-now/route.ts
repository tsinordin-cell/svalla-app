/**
 * POST /api/seo/index-now
 *
 * Meddelar sökmotorer via IndexNow (Bing, Yandex m.fl.) att en sida har
 * skapats eller uppdaterats. Används när nya forumtrådar skapas.
 *
 * Google Indexing API togs bort 2026-10-10: det är bara avsett för jobbannonser
 * och livesändningar och ignorerar vanliga sidor. Google hittar ändringar via
 * sitemap.xml, som nu har riktiga ändringsdatum. Se src/lib/indexnow.ts.
 *
 * Body: { url: string }
 */
import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { pingaIndexNow } from '@/lib/indexnow'

export async function POST(req: NextRequest) {
  const supabase = await createServerSupabaseClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Inte inloggad.' }, { status: 401 })

  let body: { url?: unknown }
  try { body = await req.json() } catch {
    return NextResponse.json({ error: 'Ogiltig JSON.' }, { status: 400 })
  }

  const url = typeof body.url === 'string' ? body.url : ''
  if (!url || !url.startsWith('https://svalla.se/')) {
    return NextResponse.json({ error: 'url måste vara svalla.se-URL.' }, { status: 400 })
  }

  const indexNow = await pingaIndexNow([url])
  return NextResponse.json({ ok: indexNow.ok, indexNow })
}

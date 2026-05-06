/**
 * Google Places Photo proxy.
 *
 * Bygg URL från Google-photo-reference + maxWidth, hämtar binär från Google
 * och streamar tillbaka. Vi får ALDRIG exponera GOOGLE_PLACES_API_KEY
 * client-side, så all foto-fetching måste gå genom denna route.
 *
 * Anrop:  /api/places/photo/{base64-encoded-ref}?w=1200
 *
 * Photo-references roterar inte men kan invalideras. Cachar 7 dagar i CDN
 * via Cache-Control så vi inte slår Google för varje page-view.
 */
import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const KEY = process.env.GOOGLE_PLACES_API_KEY

export async function GET(
  req: NextRequest,
  ctx: { params: Promise<{ ref: string }> }
) {
  if (!KEY) {
    return new Response('GOOGLE_PLACES_API_KEY missing', { status: 500 })
  }

  const { ref } = await ctx.params
  // ref kan vara base64 (om vi encodar för att slippa "/" i URL) eller plain
  let photoName: string
  try {
    // Försök base64-decode först — annars använd som den är
    photoName = ref.includes('/') ? ref : Buffer.from(ref, 'base64url').toString('utf-8')
  } catch {
    photoName = ref
  }

  // photoName format: "places/{placeId}/photos/{photoRef}"
  if (!photoName.startsWith('places/')) {
    return new Response('Invalid photo reference', { status: 400 })
  }

  const url = new URL(req.url)
  const maxWidth = clamp(parseInt(url.searchParams.get('w') || '1200', 10), 100, 4800)
  const maxHeight = url.searchParams.get('h')
    ? clamp(parseInt(url.searchParams.get('h')!, 10), 100, 4800)
    : null

  const params = new URLSearchParams({ key: KEY, maxWidthPx: String(maxWidth) })
  if (maxHeight) params.set('maxHeightPx', String(maxHeight))

  const googleUrl = `https://places.googleapis.com/v1/${photoName}/media?${params.toString()}`

  const r = await fetch(googleUrl, { redirect: 'follow' })
  if (!r.ok) {
    return new Response(`Google Photos error: ${r.status}`, { status: r.status })
  }
  const buf = await r.arrayBuffer()

  return new Response(buf, {
    status: 200,
    headers: {
      'Content-Type': r.headers.get('content-type') || 'image/jpeg',
      // 7 dagars CDN-cache, 30 dagars stale-while-revalidate
      'Cache-Control': 'public, max-age=604800, s-maxage=604800, stale-while-revalidate=2592000',
    },
  })
}

function clamp(n: number, lo: number, hi: number) {
  if (Number.isNaN(n)) return lo
  return Math.min(Math.max(n, lo), hi)
}

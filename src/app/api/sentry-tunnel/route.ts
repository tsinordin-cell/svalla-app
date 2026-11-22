/**
 * Sentry-tunnel (2026-11-22).
 *
 * Webbläsarens Sentry skickar felrapporter hit (tunnel i sentry.client.config.ts),
 * och vi skickar dem vidare till Sentry. Skäl: CSP:n släpper alltid igenom
 * vår egen adress, och annonsblockerare stoppar ofta direktanrop till sentry.io.
 *
 * - Skickar bara vidare till vårt eget projekt (värd och projekt-id ur
 *   NEXT_PUBLIC_SENTRY_DSN), allt annat får 400.
 * - Kroppar över 1 MB avvisas (felrapporter är några kB; replay
 *   är avstängt).
 * - Sparar och loggar ingenting själv. Inga cookies eller IP skickas vidare.
 */
import { forstaRaden, tolkaDsn, vidarebefordringsAdress } from '@/lib/sentryTunnel'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MAX_BYTES = 1024 * 1024

function svar(status: number) {
  return new Response(null, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: Request) {
  const mal = tolkaDsn(process.env.NEXT_PUBLIC_SENTRY_DSN)
  if (!mal) return svar(204)

  const langd = Number(req.headers.get('content-length') ?? '0')
  if (langd > MAX_BYTES) return svar(413)

  let buf: ArrayBuffer
  try {
    buf = await req.arrayBuffer()
  } catch {
    return svar(400)
  }
  const bytes = new Uint8Array(buf)
  if (bytes.byteLength === 0 || bytes.byteLength > MAX_BYTES) return svar(400)

  const adress = vidarebefordringsAdress(forstaRaden(bytes), mal)
  if (!adress) return svar(400)

  try {
    const r = await fetch(adress, {
      method: 'POST',
      body: buf,
      headers: { 'Content-Type': 'application/x-sentry-envelope' },
      signal: AbortSignal.timeout(5000),
    })
    return svar(r.status)
  } catch {
    return svar(502)
  }
}

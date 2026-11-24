/**
 * Mottagare för CSP-brott (2026-11-22).
 *
 * Webbläsaren skickar hit när Content-Security-Policy (next.config.ts)
 * blockerar något: report-to (Chrome/Safari, application/reports+json) och
 * report-uri (Firefox, application/csp-report). Varje brott skrivs som en rad
 * i Vercel-loggarna, prefix [csp], så att vi kan se om en skärpning bröt något
 * i stället för att gissa.
 *
 * - Sparar ingenting i databasen och svarar alltid 204.
 * - Kroppen kapas vid 16 kB; högst 10 rapporter per anrop loggas.
 * - Adresser loggas utan query-sträng och fragment, eftersom de kan bära
 *   inloggningskoder eller tokens. Inga cookies eller IP loggas.
 */
import { formatCspRapport, tolkaCspRapporter } from '@/lib/cspRapport'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const MAX_BYTES = 16 * 1024

function tomt() {
  return new Response(null, { status: 204, headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: Request) {
  const langd = Number(req.headers.get('content-length') ?? '0')
  if (langd > MAX_BYTES) return tomt()
  let text: string
  try {
    text = (await req.text()).slice(0, MAX_BYTES)
  } catch {
    return tomt()
  }
  for (const r of tolkaCspRapporter(text).slice(0, 10)) {
    console.warn(formatCspRapport(r))
  }
  return tomt()
}

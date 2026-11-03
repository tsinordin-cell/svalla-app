/**
 * Hälsokontroll för extern bevakning (2026-11-02).
 *
 * Bakgrund: Supabase-projektet pausades 2026-10-30 (obetald faktura) och det
 * märktes först tre dygn senare. Sidorna serverades ur cache med status 200
 * (/rutter "STALE", /api/stats cachad i en timme med nollor), så en vanlig
 * bevakning av sajten hade inte larmat. Den här rutten frågar databasen vid
 * varje anrop och svarar 503 när den inte svarar, så en bevakningstjänst
 * (t.ex. UptimeRobot, var 5:e minut) larmar inom minuter.
 *
 * - Ingen cache (force-dynamic + no-store): svaret gäller just nu.
 * - Publik nyckel och en fråga på högst en rad: billigt, inga hemligheter.
 * - Svarar aldrig med felmeddelanden från databasen, bara en kort orsak.
 * - Middleware släpper igenom /api/health utan egna databasanrop.
 */
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const runtime = 'nodejs'

const TIDSGRANS_MS = 4000

type Svar = { ok: boolean; db: 'ok' | 'fel' | 'saknar konfiguration'; ms: number }

function svara(status: number, kropp: Svar) {
  return Response.json(kropp, { status, headers: { 'Cache-Control': 'no-store' } })
}

export async function GET() {
  const t0 = Date.now()
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const nyckel = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !nyckel) return svara(503, { ok: false, db: 'saknar konfiguration', ms: 0 })

  const ctrl = new AbortController()
  let timer: ReturnType<typeof setTimeout> | undefined
  // Hård gräns: supabase-js gör egna nya försök vid nätfel, så själva frågan
  // kan ta längre än signalen; svaret kommer ändå senast efter TIDSGRANS_MS.
  const tidenUte = new Promise<'tiden ute'>(res => { timer = setTimeout(() => { ctrl.abort(); res('tiden ute') }, TIDSGRANS_MS) })
  try {
    const sb = createClient(url, nyckel, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => fetch(input, { ...init, signal: ctrl.signal, cache: 'no-store' }) },
    })
    const utfall = await Promise.race([sb.from('restaurants').select('id').limit(1), tidenUte])
    const ms = Date.now() - t0
    if (utfall === 'tiden ute' || utfall.error) return svara(503, { ok: false, db: 'fel', ms })
    return svara(200, { ok: true, db: 'ok', ms })
  } catch {
    return svara(503, { ok: false, db: 'fel', ms: Date.now() - t0 })
  } finally {
    clearTimeout(timer)
  }
}

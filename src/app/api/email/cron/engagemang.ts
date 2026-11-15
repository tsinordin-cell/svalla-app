/**
 * Hämta öppningar och klick från Resend till email_log (2026-11-08).
 *
 * VARFÖR: vi loggar vad vi skickar men inte vad som händer sen. Utan det
 * går inget brev att döma. Resend sparar senaste händelsen per mejl
 * (delivered, opened, clicked, bounced, complained ...) och den hämtas här
 * med GET /emails/{id}, med samma RESEND_API_KEY som skickar. Ingen webhook
 * och ingen ny nyckel.
 *
 * VAD: rader i email_log från de senaste 21 dagarna som har resend_id och
 * vars last_event inte är slutgiltig hämtas om, högst 150 per körning
 * (Resend tillåter 2 anrop per sekund; vi gör ett i taget med paus). Äldre
 * rader lämnas: en öppning tre veckor efter utskicket ändrar ingen slutsats.
 *
 * KRÄVER kolumnerna email_log.last_event (text) och email_log.event_at
 * (timestamptz). Saknas de returnerar steget skipped med felet och rör
 * inget annat. SQL:en står i supabase/migrations/20261108000000_email_log_engagemang.sql.
 */
import type { SupabaseClient } from '@supabase/supabase-js'

const MAX_PER_KORNING = 150
const DAGAR_BAKAT = 21
/** Händelser som inte ändras mer. Allt annat hämtas om nästa dag. */
const SLUTGILTIGA = new Set(['clicked', 'bounced', 'complained', 'failed'])

type Rad = { id: string; resend_id: string; last_event: string | null }
type ResendMail = { last_event?: string; created_at?: string }

export async function hamtaEngagemang(service: SupabaseClient): Promise<{ uppdaterade: number; errors: number; skipped?: string }> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return { uppdaterade: 0, errors: 0, skipped: 'RESEND_API_KEY saknas' }

  const sedan = new Date(Date.now() - DAGAR_BAKAT * 24 * 3600 * 1000).toISOString()
  const { data, error } = await service
    .from('email_log')
    .select('id, resend_id, last_event')
    .gte('sent_at', sedan)
    .not('resend_id', 'is', null)
    .order('sent_at', { ascending: false })
    .limit(600)

  if (error) return { uppdaterade: 0, errors: 0, skipped: `email_log: ${error.message}` }

  const kandidater = ((data ?? []) as Rad[]).filter(r => !r.last_event || !SLUTGILTIGA.has(r.last_event)).slice(0, MAX_PER_KORNING)

  let uppdaterade = 0, errors = 0
  for (const rad of kandidater) {
    try {
      const res = await fetch(`https://api.resend.com/emails/${encodeURIComponent(rad.resend_id)}`, {
        headers: { Authorization: `Bearer ${apiKey}` },
      })
      if (res.status === 429) { await paus(1500); errors++; continue }
      if (!res.ok) { errors++; continue }
      const mail = (await res.json()) as ResendMail
      const event = mail.last_event ?? null
      if (event && event !== rad.last_event) {
        const { error: upd } = await service
          .from('email_log')
          .update({ last_event: event, event_at: new Date().toISOString() })
          .eq('id', rad.id)
        if (upd) errors++
        else uppdaterade++
      }
    } catch {
      errors++
    }
    await paus(600)
  }
  return { uppdaterade, errors }
}

function paus(ms: number) {
  return new Promise(r => setTimeout(r, ms))
}

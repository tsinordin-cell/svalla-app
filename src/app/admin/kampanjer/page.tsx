/**
 * /admin/kampanjer: besök och nya mejladresser per kampanjlänk (?k=).
 *
 * Källor:
 *   - analytics_events.props.kampanj (sätts av /api/analytics/track, se lib/kampanj.ts)
 *   - email_subscribers.preferences.kampanj (sätts av /api/subscribe)
 *   - site_feedback: antal felrapporter per månad (kortet "Mät hur många som
 *     rapporterar fel via feedbackrutan")
 *
 * Besök räknas bara för dem som sagt ja till statistik i cookie-bannern.
 * Siffran är alltså ett golv, inte hela trafiken. Det står på sidan.
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { baraManniskor } from '@/lib/analytics-filter'

export const dynamic = 'force-dynamic'

const DAGAR = 90

type Rad = { session_id: string | null; event_name: string; country_code: string | null; user_agent: string | null; props: Record<string, unknown> | null }

export default async function KampanjerPage() {
  const sb = await createServerSupabaseClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/kampanjer')
  const { data: userRow } = await sb.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  const admin = getAdminClient()
  const sedan = new Date(Date.now() - DAGAR * 86400_000).toISOString()

  const [{ data: events }, { data: mejl }, { data: feedback }] = await Promise.all([
    admin.from('analytics_events')
      .select('session_id, event_name, country_code, user_agent, props')
      .gte('created_at', sedan)
      .not('props->>kampanj', 'is', null)
      .limit(50_000),
    admin.from('email_subscribers')
      .select('preferences, created_at')
      .gte('created_at', sedan)
      .not('preferences->>kampanj', 'is', null)
      .limit(10_000),
    admin.from('site_feedback')
      .select('created_at, feedback_type')
      .gte('created_at', new Date(Date.now() - 365 * 86400_000).toISOString())
      .limit(10_000),
  ])

  // Besök = unika sessioner per kampanj, efter att agenter sorterats bort.
  const manniskor = baraManniskor((events ?? []) as Rad[])
  const sessioner = new Map<string, Set<string>>()
  for (const r of manniskor) {
    const k = typeof r.props?.kampanj === 'string' ? r.props.kampanj : null
    if (!k || !r.session_id) continue
    if (!sessioner.has(k)) sessioner.set(k, new Set())
    sessioner.get(k)!.add(r.session_id)
  }
  const nyaMejl = new Map<string, number>()
  for (const m of mejl ?? []) {
    const k = (m.preferences as Record<string, unknown> | null)?.kampanj
    if (typeof k === 'string') nyaMejl.set(k, (nyaMejl.get(k) ?? 0) + 1)
  }
  const namn = [...new Set([...sessioner.keys(), ...nyaMejl.keys()])]
    .map(k => ({ k, besok: sessioner.get(k)?.size ?? 0, mejl: nyaMejl.get(k) ?? 0 }))
    .sort((a, b) => b.besok - a.besok || b.mejl - a.mejl)

  // Felrapporter per månad, senaste tolv.
  const perManad = new Map<string, number>()
  for (const f of feedback ?? []) {
    const m = String(f.created_at).slice(0, 7)
    perManad.set(m, (perManad.get(m) ?? 0) + 1)
  }
  const manader = [...perManad.entries()].sort((a, b) => b[0].localeCompare(a[0]))

  const th: React.CSSProperties = { textAlign: 'left', padding: '8px 10px', fontSize: 12, color: 'var(--txt3)', borderBottom: '1px solid var(--surface-3)' }
  const td: React.CSSProperties = { padding: '8px 10px', fontSize: 14, borderBottom: '1px solid var(--surface-3)' }

  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 16px 96px' }}>
      <Link href="/admin" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none' }}>← Admin</Link>
      <h1 style={{ fontSize: 26, fontWeight: 800, margin: '8px 0 6px' }}>Kampanjer</h1>
      <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.6, margin: '0 0 20px' }}>
        Lägg <code>?k=namn</code> på länken, till exempel <code>svalla.se/?k=tiktok-bio</code> eller{' '}
        <code>svalla.se/o/sandhamn?k=qr-stromkajen</code>. Namnet får innehålla små bokstäver, siffror och
        bindestreck. Senaste {DAGAR} dagarna.
      </p>
      <p style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.6, margin: '0 0 24px' }}>
        Besök räknas bara för dem som sagt ja till statistik, så siffran är lägre än den verkliga trafiken.
        Mejladresser räknas alltid.
      </p>

      {namn.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--txt2)' }}>Inga kampanjbesök än.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: 12 }}>
          <thead><tr><th style={th}>Kampanj</th><th style={th}>Besök</th><th style={th}>Nya mejladresser</th></tr></thead>
          <tbody>
            {namn.map(r => (
              <tr key={r.k}><td style={td}><code>{r.k}</code></td><td style={td}>{r.besok}</td><td style={td}>{r.mejl}</td></tr>
            ))}
          </tbody>
        </table>
      )}

      <h2 style={{ fontSize: 20, fontWeight: 800, margin: '40px 0 8px' }}>Felrapporter via feedbackrutan</h2>
      <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 12px' }}>
        Antal rapporter per månad. Läs dem under <Link href="/admin/site-feedback" style={{ color: 'var(--sea)' }}>Feedback</Link>.
      </p>
      {manader.length === 0 ? (
        <p style={{ fontSize: 14, color: 'var(--txt2)' }}>Inga rapporter det senaste året.</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', background: 'var(--white)', borderRadius: 12 }}>
          <thead><tr><th style={th}>Månad</th><th style={th}>Rapporter</th></tr></thead>
          <tbody>
            {manader.map(([m, n]) => (
              <tr key={m}><td style={td}>{m}</td><td style={td}>{n}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

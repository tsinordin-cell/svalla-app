/**
 * /admin/insikter — egen analytics-dashboard.
 *
 * Källa: tabellen `analytics_events` (skrivs av POST /api/analytics/track).
 * Parallellt med PostHog — denna sida är för snabba SQL-queries och egna
 * vy-aggregat. PostHog är primary för funnels och retention.
 *
 * Vad sidan visar (period: senaste 7 dagar default, togglar 24h / 30d):
 *   - Top-line counters: events totalt, unika sessioner, top-event
 *   - Top 10 mest besökta platser (place_viewed)
 *   - Klick-funnel per yta (share / directions / action_pill / bookmark)
 *   - Sökanalytics (top queries, query→klick conversion)
 *   - Senaste 50 events (debug-vy)
 */
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { getAdminClient } from '@/lib/supabase-admin'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'
export const revalidate = 0

type RangeKey = '24h' | '7d' | '30d'
const RANGE_LABEL: Record<RangeKey, string> = { '24h': 'Senaste 24h', '7d': 'Senaste 7 dygn', '30d': 'Senaste 30 dygn' }
const RANGE_HOURS: Record<RangeKey, number> = { '24h': 24, '7d': 24 * 7, '30d': 24 * 30 }

interface PageProps {
  searchParams: Promise<{ range?: string }>
}

interface RawEvent {
  event_name: string
  user_id: string | null
  session_id: string | null
  path: string | null
  props: Record<string, unknown>
  created_at: string
}

export default async function InsikterPage({ searchParams }: PageProps) {
  // ── Auth: bara admin ──────────────────────────────────────────────────
  const sb = await createServerSupabaseClient()
  const { data: { user } } = await sb.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/insikter')
  const { data: userRow } = await sb.from('users').select('is_admin').eq('id', user.id).single()
  if (!userRow?.is_admin) redirect('/feed')

  // ── Range från query (?range=24h|7d|30d) ──────────────────────────────
  const sp = await searchParams
  const range: RangeKey = (sp.range === '24h' || sp.range === '30d') ? sp.range : '7d'
  const sinceIso = new Date(Date.now() - RANGE_HOURS[range] * 3600 * 1000).toISOString()

  // ── Hämta events för perioden via service-role (RLS bypass) ──────────
  // Vi hämtar upp till 20 000 events och aggregerar i JS — billigt nog
  // för Tom + 1-2 admins och ger oss frihet att summera fritt.
  const admin = getAdminClient()
  const { data, error } = await admin
    .from('analytics_events')
    .select('event_name, user_id, session_id, path, props, created_at')
    .gte('created_at', sinceIso)
    .order('created_at', { ascending: false })
    .limit(20000)

  const events: RawEvent[] = (data as RawEvent[] | null) ?? []

  // ── Aggregera ─────────────────────────────────────────────────────────
  const total = events.length
  const sessions = new Set<string>()
  const users = new Set<string>()
  const eventCounts = new Map<string, number>()
  const placeViews = new Map<string, number>()
  const searchQueries = new Map<string, number>()
  const actionFunnel = { share: 0, directions: 0, actionPill: 0, bookmark: 0, placeView: 0 }

  for (const ev of events) {
    if (ev.session_id) sessions.add(ev.session_id)
    if (ev.user_id) users.add(ev.user_id)
    eventCounts.set(ev.event_name, (eventCounts.get(ev.event_name) ?? 0) + 1)

    if (ev.event_name === 'place_viewed') {
      const id = String(ev.props?.['place_id'] ?? '')
      if (id) placeViews.set(id, (placeViews.get(id) ?? 0) + 1)
      actionFunnel.placeView++
    }
    if (ev.event_name === 'share_clicked') actionFunnel.share++
    if (ev.event_name === 'directions_clicked') actionFunnel.directions++
    if (ev.event_name === 'action_pill_clicked') actionFunnel.actionPill++
    if (ev.event_name === 'bookmark_toggled') actionFunnel.bookmark++

    if (ev.event_name === 'search_performed') {
      const q = String(ev.props?.['query'] ?? '').toLowerCase().trim()
      if (q) searchQueries.set(q, (searchQueries.get(q) ?? 0) + 1)
    }
  }

  // ── Top 10 platser med namn-lookup ───────────────────────────────────
  const topPlaceIds = [...placeViews.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
  let placeNames = new Map<string, { name: string; slug: string | null }>()
  if (topPlaceIds.length > 0) {
    const ids = topPlaceIds.map(([id]) => id)
    const { data: places } = await admin
      .from('restaurants')
      .select('id, name, slug')
      .in('id', ids)
    placeNames = new Map(
      (places ?? []).map(p => [p.id, { name: p.name, slug: p.slug }]),
    )
  }

  const topEvents = [...eventCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  const topQueries = [...searchQueries.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)

  // ── Conversion-rates (med skydd mot div by 0) ────────────────────────
  const pct = (n: number, d: number) => (d > 0 ? Math.round((n / d) * 1000) / 10 : 0)
  const sharePct = pct(actionFunnel.share, actionFunnel.placeView)
  const directionsPct = pct(actionFunnel.directions, actionFunnel.placeView)
  const actionPillPct = pct(actionFunnel.actionPill, actionFunnel.placeView)
  const bookmarkPct = pct(actionFunnel.bookmark, actionFunnel.placeView)

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>

        {/* Back nav */}
        <Link href="/admin" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--txt3)', textDecoration: 'none',
          marginBottom: 20,
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
          Tillbaka till admin
        </Link>

        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>Insikter</h1>
          <RangeTabs current={range} />
        </div>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 24px' }}>
          {RANGE_LABEL[range]} · egen data, parallellt med PostHog
        </p>

        {error && (
          <div style={{ background: '#fee', border: '1px solid #fcc', color: '#900', padding: 12, borderRadius: 8, marginBottom: 16 }}>
            DB-fel: {error.message}
          </div>
        )}

        {/* Top-line counters */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 8, marginBottom: 20,
        }}>
          <KpiCard label="Events totalt" value={total} color="#0a7b8c" />
          <KpiCard label="Unika sessioner" value={sessions.size} color="#1d4ed8" />
          <KpiCard label="Inloggade användare" value={users.size} color="#0a7b3c" />
          <KpiCard label="Plats-visningar" value={actionFunnel.placeView} color="#c96e2a" />
        </div>

        {/* Klick-funnel */}
        <Section title="Klick-funnel på plats-sidor">
          <p style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 0, marginBottom: 14 }}>
            Andel av plats-visningar som leder till en handling. Höga värden = sidan konverterar.
          </p>
          <FunnelBar label="Vägbeskrivning" count={actionFunnel.directions} pct={directionsPct} color="#0a7b3c" />
          <FunnelBar label="Boka / Meny / Hemsida / Instagram" count={actionFunnel.actionPill} pct={actionPillPct} color="#c96e2a" />
          <FunnelBar label="Bokmärke" count={actionFunnel.bookmark} pct={bookmarkPct} color="#7c3aed" />
          <FunnelBar label="Delningar" count={actionFunnel.share} pct={sharePct} color="#1d4ed8" />
        </Section>

        {/* Topp-platser */}
        <Section title="Topp 10 — mest besökta platser">
          {topPlaceIds.length === 0 ? (
            <Empty text="Inga place_viewed-events än. Vänta tills någon besöker en plats-sida." />
          ) : (
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {topPlaceIds.map(([id, count], idx) => {
                const meta = placeNames.get(id)
                const slug = meta?.slug ?? id
                return (
                  <li key={id} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '10px 0', borderBottom: idx === topPlaceIds.length - 1 ? 'none' : '1px solid var(--border)',
                  }}>
                    <span style={{ width: 28, fontSize: 12, color: 'var(--txt3)', textAlign: 'right', fontVariantNumeric: 'tabular-nums' }}>
                      #{idx + 1}
                    </span>
                    <Link href={`/upptack/${slug}`} style={{
                      flex: 1, fontSize: 14, fontWeight: 600, color: 'var(--txt)',
                      textDecoration: 'none',
                    }}>
                      {meta?.name ?? <span style={{ color: 'var(--txt3)', fontStyle: 'italic' }}>okänd plats ({id.slice(0, 8)})</span>}
                    </Link>
                    <span style={{
                      background: 'rgba(10,123,140,0.10)', color: 'var(--sea)',
                      fontSize: 12, fontWeight: 700, padding: '4px 10px', borderRadius: 999,
                      fontVariantNumeric: 'tabular-nums',
                    }}>
                      {count} {count === 1 ? 'visning' : 'visningar'}
                    </span>
                  </li>
                )
              })}
            </ol>
          )}
        </Section>

        {/* Topp-sökningar */}
        <Section title="Topp 10 — sökningar">
          {topQueries.length === 0 ? (
            <Empty text="Inga search_performed-events än." />
          ) : (
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {topQueries.map(([q, count], idx) => (
                <li key={q} style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '8px 0', borderBottom: idx === topQueries.length - 1 ? 'none' : '1px solid var(--border)',
                }}>
                  <span style={{ flex: 1, fontSize: 14, color: 'var(--txt)' }}>{q}</span>
                  <span style={{ fontSize: 12, color: 'var(--txt3)', fontVariantNumeric: 'tabular-nums' }}>
                    {count}×
                  </span>
                </li>
              ))}
            </ol>
          )}
        </Section>

        {/* Event-fördelning */}
        <Section title="Event-fördelning">
          {topEvents.length === 0 ? (
            <Empty text="Inga events i perioden." />
          ) : (
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {topEvents.map(([name, count]) => {
                const max = topEvents[0]?.[1] ?? 1
                const barPct = (count / max) * 100
                return (
                  <li key={name} style={{ marginBottom: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 3 }}>
                      <code style={{ color: 'var(--txt)', fontSize: 12 }}>{name}</code>
                      <span style={{ color: 'var(--txt3)', fontVariantNumeric: 'tabular-nums' }}>{count}</span>
                    </div>
                    <div style={{ background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden', height: 6 }}>
                      <div style={{ background: 'var(--sea)', height: '100%', width: `${barPct}%`, transition: 'width 200ms' }} />
                    </div>
                  </li>
                )
              })}
            </ol>
          )}
        </Section>

        {/* Senaste events (debug) */}
        <Section title="Senaste 50 events (debug)">
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)' }}>
                  <th style={th}>Tid</th>
                  <th style={th}>Event</th>
                  <th style={th}>Path</th>
                  <th style={th}>Props</th>
                </tr>
              </thead>
              <tbody>
                {events.slice(0, 50).map((ev, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                    <td style={td}>{new Date(ev.created_at).toLocaleString('sv-SE', { hour12: false })}</td>
                    <td style={td}><code>{ev.event_name}</code></td>
                    <td style={{ ...td, color: 'var(--txt3)', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ev.path}</td>
                    <td style={{ ...td, color: 'var(--txt3)', maxWidth: 320, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {Object.keys(ev.props ?? {}).length > 0 ? JSON.stringify(ev.props) : '–'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

      </div>
    </div>
  )
}

// ─── Sub-komponenter ──────────────────────────────────────────────────

function RangeTabs({ current }: { current: RangeKey }) {
  const opts: RangeKey[] = ['24h', '7d', '30d']
  return (
    <div style={{ display: 'inline-flex', background: 'var(--surface-3)', borderRadius: 8, padding: 3 }}>
      {opts.map(k => (
        <Link
          key={k}
          href={`/admin/insikter?range=${k}`}
          style={{
            padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600,
            textDecoration: 'none',
            color: current === k ? '#fff' : 'var(--txt2)',
            background: current === k ? 'var(--sea)' : 'transparent',
            transition: 'all 150ms',
          }}
        >
          {k}
        </Link>
      ))}
    </div>
  )
}

function KpiCard({ label, value, color }: { label: string; value: number; color: string }) {
  return (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--surface-3)',
      borderTop: `3px solid ${color}`,
      borderRadius: 10,
      padding: '12px 14px',
    }}>
      <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>{value.toLocaleString('sv-SE')}</div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{
      background: 'var(--white)',
      border: '1px solid var(--surface-3)',
      borderRadius: 12,
      padding: '16px 18px',
      marginBottom: 16,
    }}>
      <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', margin: '0 0 12px' }}>{title}</h2>
      {children}
    </section>
  )
}

function FunnelBar({ label, count, pct, color }: { label: string; count: number; pct: number; color: string }) {
  return (
    <div style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
        <span style={{ color: 'var(--txt)' }}>{label}</span>
        <span style={{ color: 'var(--txt3)', fontVariantNumeric: 'tabular-nums' }}>
          {count} ({pct}%)
        </span>
      </div>
      <div style={{ background: 'var(--surface-3)', borderRadius: 4, overflow: 'hidden', height: 8 }}>
        <div style={{ background: color, height: '100%', width: `${Math.min(pct, 100)}%`, transition: 'width 200ms' }} />
      </div>
    </div>
  )
}

function Empty({ text }: { text: string }) {
  return (
    <div style={{
      padding: '20px 16px', textAlign: 'center',
      color: 'var(--txt3)', fontSize: 13, fontStyle: 'italic',
    }}>
      {text}
    </div>
  )
}

const th: React.CSSProperties = { textAlign: 'left', padding: '6px 8px', fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.5, fontWeight: 700 }
const td: React.CSSProperties = { padding: '6px 8px', verticalAlign: 'top' }

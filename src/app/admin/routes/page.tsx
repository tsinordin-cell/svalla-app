/**
 * /admin/routes — Kvalitets-feedback-loop för planera-rutter.
 *
 * Två tabeller:
 *  1. Aggregerad rutt-kvalitet — vilka start/slut-grids faller på grid/waypoint/straight
 *     (sorterat på antal träffar — högst på topp = nästa kandidat att precomputera)
 *  2. Användar-rapporter — fri-text-anledningar med direkt-länk till rutten
 *
 * Auth: standard admin-cookie via /admin/login (samma som övriga admin-vyer).
 */

import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient as createServiceClient } from '@supabase/supabase-js'

export const metadata: Metadata = {
  title: 'Rutt-kvalitet — Admin · Svalla',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type MetricRow = {
  start_lat: number
  start_lng: number
  end_lat: number
  end_lng: number
  quality: 'precomputed' | 'grid' | 'waypoint' | 'straight'
  ms: number
}

type ReportRow = {
  id: string
  route_id: string
  reason: string
  status: string
  created_at: string
  user_id: string | null
}

function gridKey(lat: number, lng: number) {
  // Grid 0.05° ≈ 5–6 km — matchar precomputed lookup-tolerans
  return `${(Math.round(lat * 20) / 20).toFixed(2)},${(Math.round(lng * 20) / 20).toFixed(2)}`
}

function fmtTime(iso: string) {
  const d = new Date(iso)
  return d.toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' })
}

const QUALITY_COLOR: Record<MetricRow['quality'], string> = {
  precomputed: '#157a3e',
  grid:        '#157a3e',
  waypoint:    '#a4561e',
  straight:    '#c0392b',
}
const QUALITY_LABEL: Record<MetricRow['quality'], string> = {
  precomputed: 'Precomputed',
  grid:        'Grid-A*',
  waypoint:    'Waypoint',
  straight:    'Rak linje',
}

export default async function AdminRoutesPage() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) {
    return <div style={{ padding: 32 }}>Env saknas: NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY.</div>
  }
  const admin = createServiceClient(url, key, { auth: { persistSession: false } })

  const since = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const [metricsRes, reportsRes] = await Promise.all([
    admin.from('route_metrics')
      .select('start_lat, start_lng, end_lat, end_lng, quality, ms')
      .gte('created_at', since)
      .limit(5000),
    admin.from('route_reports')
      .select('id, route_id, reason, status, created_at, user_id')
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  const metrics = (metricsRes.data ?? []) as MetricRow[]
  const reports = (reportsRes.data ?? []) as ReportRow[]

  // Kvalitet-summering
  const qualityCount: Record<MetricRow['quality'], number> = { precomputed: 0, grid: 0, waypoint: 0, straight: 0 }
  for (const m of metrics) qualityCount[m.quality]++
  const total = metrics.length || 1

  // Aggregera failing par (waypoint/straight) på grid-nyckel
  const failingPairs = new Map<string, { count: number; quality: MetricRow['quality']; sample: MetricRow }>()
  for (const m of metrics) {
    if (m.quality === 'precomputed' || m.quality === 'grid') continue
    const k = `${gridKey(m.start_lat, m.start_lng)}→${gridKey(m.end_lat, m.end_lng)}`
    const cur = failingPairs.get(k)
    if (cur) cur.count++
    else failingPairs.set(k, { count: 1, quality: m.quality, sample: m })
  }
  const topFailing = [...failingPairs.entries()]
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 30)

  return (
    <main style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 20px 80px', fontFamily: 'inherit' }}>
      <Link href="/admin" style={{ fontSize: 13, color: '#1e5c82', textDecoration: 'none' }}>← Admin-översikt</Link>
      <h1 style={{ fontSize: 28, fontWeight: 800, margin: '12px 0 6px', color: '#1a2530' }}>Rutt-kvalitet</h1>
      <p style={{ fontSize: 14, color: '#666', margin: '0 0 28px', lineHeight: 1.55 }}>
        Senaste 30 dagarnas rutt-beräkningar. {metrics.length} rutter loggade, {reports.length} rapporter inkomna.
      </p>

      {/* Kvalitet-fördelning */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a2530', marginBottom: 12 }}>Kvalitets-fördelning</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
          {(['precomputed', 'grid', 'waypoint', 'straight'] as const).map(q => {
            const n = qualityCount[q]
            const pct = total > 0 ? Math.round((n / total) * 100) : 0
            return (
              <div key={q} style={{
                background: '#fff',
                border: `1.5px solid ${QUALITY_COLOR[q]}`,
                borderRadius: 12, padding: '14px 16px',
              }}>
                <div style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: QUALITY_COLOR[q], marginBottom: 4 }}>
                  {QUALITY_LABEL[q]}
                </div>
                <div style={{ fontSize: 24, fontWeight: 800, color: '#1a2530', lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 4 }}>{pct}% av {metrics.length}</div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Topp failing-par */}
      <section style={{ marginBottom: 36 }}>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a2530', marginBottom: 4 }}>Topp 30 par som behöver precomputas</h2>
        <p style={{ fontSize: 12, color: '#888', margin: '0 0 14px' }}>
          Grid-keys (0.05° ≈ 5–6 km). Sorterat efter antal träffar — högst på topp = störst payoff.
        </p>
        {topFailing.length === 0 ? (
          <div style={{ padding: 24, background: '#fff', borderRadius: 12, color: '#888', fontSize: 14, textAlign: 'center' }}>
            Inga failing-par senaste 30 dagar — pipelinen håller.
          </div>
        ) : (
          <div style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(0,0,0,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
              <thead>
                <tr style={{ background: '#f8f9fa', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>#</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Tier</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Start (grid)</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Slut (grid)</th>
                  <th style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700 }}>Träffar</th>
                  <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700 }}>Sample-koord</th>
                </tr>
              </thead>
              <tbody>
                {topFailing.map(([key, info], i) => {
                  const [startGrid, endGrid] = key.split('→')
                  return (
                    <tr key={key} style={{ borderBottom: '1px solid rgba(0,0,0,0.05)' }}>
                      <td style={{ padding: '10px 14px', color: '#888' }}>{i + 1}</td>
                      <td style={{ padding: '10px 14px' }}>
                        <span style={{
                          fontSize: 11, fontWeight: 700,
                          padding: '3px 8px', borderRadius: 6,
                          background: `${QUALITY_COLOR[info.quality]}15`,
                          color: QUALITY_COLOR[info.quality],
                        }}>{QUALITY_LABEL[info.quality]}</span>
                      </td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12 }}>{startGrid}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12 }}>{endGrid}</td>
                      <td style={{ padding: '10px 14px', textAlign: 'right', fontWeight: 700, color: '#1a2530' }}>{info.count}</td>
                      <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 11, color: '#888' }}>
                        {info.sample.start_lat.toFixed(4)},{info.sample.start_lng.toFixed(4)} → {info.sample.end_lat.toFixed(4)},{info.sample.end_lng.toFixed(4)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Användar-rapporter */}
      <section>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#1a2530', marginBottom: 4 }}>Användar-rapporter ({reports.length})</h2>
        <p style={{ fontSize: 12, color: '#888', margin: '0 0 14px' }}>
          Fri-text-rapporter från användare. Klicka rutt-id för att inspektera rutten direkt.
        </p>
        {reports.length === 0 ? (
          <div style={{ padding: 24, background: '#fff', borderRadius: 12, color: '#888', fontSize: 14, textAlign: 'center' }}>
            Inga rapporter ännu.
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {reports.map(r => (
              <div key={r.id} style={{
                background: '#fff', borderRadius: 12, padding: '14px 16px',
                border: '1px solid rgba(0,0,0,0.08)',
                borderLeft: `3px solid ${r.status === 'open' ? '#c0392b' : '#157a3e'}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: 14, marginBottom: 6 }}>
                  <Link
                    href={`/planera/${r.route_id}`}
                    style={{ fontSize: 12, fontFamily: 'monospace', color: '#1e5c82', textDecoration: 'none' }}>
                    rutt:{r.route_id.slice(0, 8)}…
                  </Link>
                  <span style={{ fontSize: 11, color: '#888' }}>{fmtTime(r.created_at)}</span>
                </div>
                <div style={{ fontSize: 14, color: '#1a2530', lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                  {r.reason}
                </div>
                {r.user_id && (
                  <div style={{ fontSize: 11, color: '#888', marginTop: 6 }}>user: {r.user_id.slice(0, 8)}…</div>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

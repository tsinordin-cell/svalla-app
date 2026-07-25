import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import SiteFeedbackActions from './SiteFeedbackActions'

export const metadata: Metadata = {
  title: 'Feedback & Tips — Admin · Svalla',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type SiteFeedback = {
  id:            string
  feedback_type: 'fel-info' | 'saknar-info' | 'tips' | 'annat'
  message:       string
  page_url:      string | null
  user_id:       string | null
  resolved:      boolean
  created_at:    string
}

const TYPE_LABELS: Record<SiteFeedback['feedback_type'], string> = {
  'fel-info':    'Fel info',
  'saknar-info': 'Saknar info',
  'tips':        'Tips',
  'annat':       'Annat',
}

const TYPE_COLORS: Record<SiteFeedback['feedback_type'], string> = {
  'fel-info':    '#c02020',
  'saknar-info': '#c96e2a',
  'tips':        '#0a7b8c',
  'annat':       '#5a6e78',
}

const TYPE_BG: Record<SiteFeedback['feedback_type'], string> = {
  'fel-info':    'rgba(192,32,32,0.08)',
  'saknar-info': 'rgba(201,110,42,0.08)',
  'tips':        'rgba(10,123,140,0.08)',
  'annat':       'rgba(90,110,120,0.08)',
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const diffMs = Date.now() - d.getTime()
  const diffMin = Math.floor(diffMs / 60_000)
  const diffH   = Math.floor(diffMin / 60)
  const diffD   = Math.floor(diffH / 24)
  if (diffMin < 60) return `${diffMin} min sedan`
  if (diffH < 24)   return `${diffH} h sedan`
  if (diffD < 7)    return `${diffD} d sedan`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short', year: 'numeric' })
}

function pathFromUrl(url: string | null): string {
  if (!url) return '—'
  try { return new URL(url).pathname } catch { return url }
}

export default async function AdminSiteFeedbackPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('site_feedback')
    .select('id, feedback_type, message, page_url, user_id, resolved, created_at')
    .order('created_at', { ascending: false })
    .limit(300)

  const all        = (data ?? []) as SiteFeedback[]
  const unresolved = all.filter(f => !f.resolved)
  const resolved   = all.filter(f =>  f.resolved)

  function FeedbackCard({ f }: { f: SiteFeedback }) {
    return (
      <div style={{
        background:   'var(--white)',
        border:       '1px solid var(--surface-3)',
        borderRadius: 14,
        padding:      '16px 18px',
        opacity:      f.resolved ? 0.65 : 1,
        transition:   'opacity 0.15s',
      }}>
        {/* Top row: typ + tid */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, gap: 8 }}>
          <span style={{
            background: TYPE_BG[f.feedback_type],
            color:      TYPE_COLORS[f.feedback_type],
            fontWeight: 700,
            fontSize:   11,
            padding:    '3px 9px',
            borderRadius: 20,
          }}>
            {TYPE_LABELS[f.feedback_type]}
          </span>
          <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>
            {formatTime(f.created_at)}
          </span>
        </div>

        {/* Meddelande */}
        <p style={{
          margin:       '0 0 10px',
          fontSize:     14,
          lineHeight:   1.6,
          color:        'var(--ink)',
          whiteSpace:   'pre-wrap',
          wordBreak:    'break-word',
        }}>
          {f.message}
        </p>

        {/* Sida + åtgärder */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, minWidth: 0 }}>
            {f.page_url ? (
              <a
                href={f.page_url}
                target="_blank"
                rel="noopener noreferrer"
                title={f.page_url}
                style={{
                  fontSize:    12,
                  color:       'var(--sea)',
                  textDecoration: 'none',
                  fontWeight:  600,
                  overflow:    'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace:  'nowrap',
                  maxWidth:    220,
                  display:     'block',
                }}
              >
                📍 {pathFromUrl(f.page_url)}
              </a>
            ) : (
              <span style={{ fontSize: 12, color: 'var(--ink-muted)' }}>📍 Okänd sida</span>
            )}
            {f.user_id && (
              <span style={{ fontSize: 11, color: 'var(--ink-muted)', background: 'var(--surface-2)', padding: '2px 7px', borderRadius: 20 }}>
                inloggad
              </span>
            )}
          </div>
          <SiteFeedbackActions feedbackId={f.id} resolved={f.resolved} />
        </div>
      </div>
    )
  }

  return (
    <main style={{
      minHeight:    '100vh',
      background:   'var(--bg)',
      paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82, #0d8fa3)',
        padding:    'calc(env(safe-area-inset-top, 0px) + 16px) 16px 24px',
        color:      '#fff',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/admin" style={{
            display:        'inline-flex',
            alignItems:     'center',
            gap:            4,
            color:          'rgba(255,255,255,0.75)',
            fontSize:       12,
            fontWeight:     600,
            textDecoration: 'none',
            marginBottom:   12,
          }}>
            ← Admin
          </Link>
          <h1 style={{ margin: '0 0 4px', fontSize: 24, fontWeight: 800 }}>
            💬 Feedback & Tips
          </h1>
          <p style={{ margin: 0, fontSize: 14, opacity: 0.8 }}>
            {unresolved.length} olösta · {resolved.length} lösta · {all.length} totalt
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px' }}>

        {/* Statistik */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginBottom: 28 }}>
          {(Object.entries(TYPE_LABELS) as [SiteFeedback['feedback_type'], string][]).map(([type, label]) => {
            const count = all.filter(f => f.feedback_type === type).length
            return (
              <div key={type} style={{
                background:   'var(--white)',
                border:       `2px solid ${TYPE_BG[type]}`,
                borderRadius: 12,
                padding:      '12px 14px',
                textAlign:    'center',
              }}>
                <div style={{ fontSize: 22, fontWeight: 800, color: TYPE_COLORS[type] }}>{count}</div>
                <div style={{ fontSize: 11, color: 'var(--ink-muted)', marginTop: 2 }}>{label}</div>
              </div>
            )
          })}
        </div>

        {/* Olösta */}
        {unresolved.length > 0 && (
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              🔔 Olösta
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>({unresolved.length})</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {unresolved.map(f => <FeedbackCard key={f.id} f={f} />)}
            </div>
          </section>
        )}

        {/* Tom state */}
        {all.length === 0 && (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--ink-muted)' }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🤙</div>
            <div style={{ fontSize: 16, fontWeight: 600 }}>Ingen feedback ännu</div>
            <div style={{ fontSize: 14, marginTop: 6 }}>Knappen "Tipsa oss" visas för alla besökare.</div>
          </div>
        )}

        {/* Lösta */}
        {resolved.length > 0 && (
          <section>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--ink)', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
              ✓ Lösta
              <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--ink-muted)' }}>({resolved.length})</span>
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resolved.map(f => <FeedbackCard key={f.id} f={f} />)}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}

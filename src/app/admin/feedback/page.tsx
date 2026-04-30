import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import Icon from '@/components/Icon'
import FeedbackActions from './FeedbackActions'

export const metadata: Metadata = {
  title: 'Felrapporter — Admin · Svalla',
  robots: { index: false, follow: false },
}

export const dynamic = 'force-dynamic'

type Feedback = {
  id: string
  route_id: string
  start_name: string | null
  end_name: string | null
  issue_type: 'over-land' | 'wrong-distance' | 'wrong-stop' | 'other'
  comment: string | null
  user_id: string | null
  resolved: boolean
  created_at: string
}

const ISSUE_LABELS: Record<Feedback['issue_type'], string> = {
  'over-land': 'Korsar land',
  'wrong-distance': 'Fel avstånd',
  'wrong-stop': 'Fel stopp',
  'other': 'Annat',
}

const ISSUE_COLORS: Record<Feedback['issue_type'], string> = {
  'over-land': '#c02020',
  'wrong-distance': '#c05010',
  'wrong-stop': '#c96e2a',
  'other': '#666',
}

function formatTime(iso: string): string {
  const d = new Date(iso)
  const now = Date.now()
  const diffMs = now - d.getTime()
  const diffMin = Math.floor(diffMs / 60000)
  const diffH = Math.floor(diffMin / 60)
  const diffD = Math.floor(diffH / 24)
  if (diffMin < 60) return `${diffMin} min sedan`
  if (diffH < 24) return `${diffH} h sedan`
  if (diffD < 7) return `${diffD} d sedan`
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

export default async function AdminFeedbackPage() {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('route_feedback')
    .select('id, route_id, start_name, end_name, issue_type, comment, user_id, resolved, created_at')
    .order('created_at', { ascending: false })
    .limit(200)

  const feedback = (data ?? []) as Feedback[]
  const unresolved = feedback.filter(f => !f.resolved)
  const resolved = feedback.filter(f => f.resolved)

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #1e5c82, #0d8fa3)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 16px) 16px 24px',
        color: '#fff',
      }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/admin" style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: 600,
            textDecoration: 'none', marginBottom: 10,
          }}>
            <Icon name="arrowRight" size={12} stroke={2} />
            <span style={{ transform: 'scaleX(-1)', display: 'inline-block', marginRight: 4 }}>
              <Icon name="arrowRight" size={12} stroke={2} />
            </span>
            Tillbaka till admin
          </Link>
          <h1 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 6px' }}>Felrapporter</h1>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
            {unresolved.length} olösta · {resolved.length} lösta · totalt {feedback.length}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '20px 16px' }}>
        {error && (
          <div style={{
            background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)',
            borderRadius: 12, padding: '12px 14px', fontSize: 13, color: '#c02020',
            marginBottom: 16,
          }}>
            Kunde inte ladda felrapporter: {error.message}
          </div>
        )}

        {/* Olösta */}
        {unresolved.length > 0 && (
          <section style={{ marginBottom: 28 }}>
            <h2 style={{
              fontSize: 12, fontWeight: 700, color: 'var(--sea)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
            }}>
              Olösta ({unresolved.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {unresolved.map(f => (
                <FeedbackCard key={f.id} feedback={f} />
              ))}
            </div>
          </section>
        )}

        {/* Lösta */}
        {resolved.length > 0 && (
          <section>
            <h2 style={{
              fontSize: 12, fontWeight: 700, color: 'var(--txt3)',
              textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 10,
            }}>
              Lösta ({resolved.length})
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, opacity: 0.65 }}>
              {resolved.slice(0, 30).map(f => (
                <FeedbackCard key={f.id} feedback={f} />
              ))}
            </div>
          </section>
        )}

        {feedback.length === 0 && !error && (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: '40px 24px',
            border: '1px solid rgba(10,123,140,0.08)', textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 56, height: 56, borderRadius: 14,
              background: 'rgba(10,123,140,0.08)', color: 'var(--sea)', marginBottom: 14,
            }}>
              <Icon name="check" size={28} stroke={2} />
            </div>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>
              Inga felrapporter ännu
            </p>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
              När användare rapporterar felaktiga rutter dyker de upp här.
            </p>
          </div>
        )}
      </div>
    </main>
  )
}

function FeedbackCard({ feedback }: { feedback: Feedback }) {
  const issueColor = ISSUE_COLORS[feedback.issue_type]
  const issueLabel = ISSUE_LABELS[feedback.issue_type]

  return (
    <article style={{
      background: 'var(--white)', borderRadius: 14, padding: '14px 16px',
      border: '1px solid rgba(10,123,140,0.1)',
      borderLeft: `3px solid ${issueColor}`,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8, gap: 8 }}>
        <div style={{
          fontSize: 11, fontWeight: 800, color: issueColor,
          textTransform: 'uppercase', letterSpacing: '0.06em',
        }}>
          {issueLabel}
        </div>
        <div style={{ fontSize: 11, color: 'var(--txt3)' }}>
          {formatTime(feedback.created_at)}
        </div>
      </div>

      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>
        {feedback.start_name && feedback.end_name
          ? `${feedback.start_name} → ${feedback.end_name}`
          : 'Okänd rutt'}
      </div>

      {feedback.comment && (
        <p style={{
          fontSize: 13, color: 'var(--txt2)', margin: '6px 0 10px',
          lineHeight: 1.5,
          background: 'rgba(10,123,140,0.04)', padding: '8px 12px', borderRadius: 8,
        }}>
          {feedback.comment}
        </p>
      )}

      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        gap: 8, marginTop: 8, fontSize: 11, color: 'var(--txt3)',
      }}>
        <span style={{ fontFamily: 'monospace', wordBreak: 'break-all' }}>
          {feedback.route_id.slice(0, 8)}…
        </span>
        <FeedbackActions
          feedbackId={feedback.id}
          routeId={feedback.route_id}
          resolved={feedback.resolved}
        />
      </div>
    </article>
  )
}

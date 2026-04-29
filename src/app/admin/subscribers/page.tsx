import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

type Subscriber = {
  id: string
  email: string
  source: string | null
  confirmed: boolean
  unsubscribed: boolean
  user_id: string | null
  created_at: string
  confirmed_at: string | null
  unsubscribed_at: string | null
}

export default async function AdminSubscribersPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/subscribers')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: subs, error } = await service
    .from('email_subscribers')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1000)

  const list = (subs || []) as Subscriber[]

  const stats = {
    total: list.length,
    confirmed: list.filter(s => s.confirmed && !s.unsubscribed).length,
    pending: list.filter(s => !s.confirmed && !s.unsubscribed).length,
    unsubscribed: list.filter(s => s.unsubscribed).length,
  }

  // Källor
  const sourceCounts = list.reduce<Record<string, number>>((acc, s) => {
    const src = s.source || 'okänd'
    acc[src] = (acc[src] || 0) + 1
    return acc
  }, {})
  const sources = Object.entries(sourceCounts).sort((a, b) => b[1] - a[1])

  // CSV-export-data
  const csvData = list
    .filter(s => s.confirmed && !s.unsubscribed)
    .map(s => `${s.email},${s.source || ''},${s.created_at}`)
    .join('\n')
  const csvBlob = `email,source,created_at\n${csvData}`

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Link href="/admin" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--txt3)', textDecoration: 'none',
          marginBottom: 20,
        }}>
          ← Admin
        </Link>

        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>
          E-postprenumeranter
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 24px' }}>
          Nyhetsbrevslistan — synka till Resend för utskick.
        </p>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8,
          marginBottom: 24,
        }}>
          {([
            ['Totalt', stats.total, 'var(--txt2)'],
            ['Bekräftade', stats.confirmed, '#0a7b3c'],
            ['Väntar', stats.pending, '#c96e2a'],
            ['Avregistrerade', stats.unsubscribed, '#7f1d1d'],
          ] as const).map(([label, count, color]) => (
            <div key={label} style={{
              background: 'var(--white)', border: '1px solid var(--surface-3)',
              borderRadius: 10, padding: '12px 14px',
            }}>
              <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 2 }}>{count}</div>
            </div>
          ))}
        </div>

        {/* Source breakdown */}
        {sources.length > 0 && (
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '16px 18px', marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 10px' }}>Källor</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {sources.map(([src, count]) => (
                <span key={src} style={{
                  fontSize: 12, padding: '4px 10px', borderRadius: 999,
                  background: 'var(--surface-2)', color: 'var(--txt2)',
                }}>
                  {src} <strong style={{ color: 'var(--sea)' }}>{count}</strong>
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Export */}
        {stats.confirmed > 0 && (
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '16px 18px', marginBottom: 20,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px' }}>Export (bekräftade)</h2>
            <p style={{ fontSize: 12, color: 'var(--txt2)', margin: '0 0 10px' }}>
              Kopiera till Resend audience eller annan utskickstjänst.
            </p>
            <textarea
              readOnly
              value={csvBlob}
              style={{
                width: '100%', minHeight: 120, padding: 10,
                border: '1px solid var(--surface-3)', borderRadius: 8,
                background: 'var(--bg)', color: 'var(--txt)',
                fontFamily: 'monospace', fontSize: 11,
                resize: 'vertical',
              }}
            />
          </div>
        )}

        {error && (
          <div style={{ padding: 16, background: '#fee', borderRadius: 10, color: '#7f1d1d', marginBottom: 16, fontSize: 13 }}>
            Fel: {error.message}
          </div>
        )}

        {/* Lista */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {list.length === 0 && !error && (
            <div style={{
              background: 'var(--white)', border: '1px solid var(--surface-3)',
              borderRadius: 12, padding: '40px 24px', textAlign: 'center',
              color: 'var(--txt2)', fontSize: 14,
            }}>
              Inga prenumeranter än.
            </div>
          )}
          {list.map(s => (
            <div key={s.id} style={{
              background: 'var(--white)', border: '1px solid var(--surface-3)',
              borderRadius: 8, padding: '10px 14px',
              display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', flex: '1 1 200px' }}>
                {s.email}
              </span>
              {s.source && (
                <span style={{ fontSize: 11, padding: '2px 8px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)' }}>
                  {s.source}
                </span>
              )}
              <span style={{
                fontSize: 10, fontWeight: 700, padding: '2px 8px', borderRadius: 999,
                background: s.unsubscribed ? '#7f1d1d' : s.confirmed ? '#0a7b3c' : '#c96e2a',
                color: '#fff',
              }}>
                {s.unsubscribed ? 'Avreg.' : s.confirmed ? 'Bekräftad' : 'Väntar'}
              </span>
              <span style={{ fontSize: 11, color: 'var(--txt3)' }}>
                {new Date(s.created_at).toLocaleDateString('sv-SE')}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import PartnerLeadActions from './PartnerLeadActions'

export const dynamic = 'force-dynamic'

type PartnerInquiry = {
  id: string
  business_name: string
  contact_name: string | null
  email: string
  phone: string | null
  category: string | null
  island_slug: string | null
  tier: string | null
  message: string | null
  status: 'new' | 'contacted' | 'closed' | 'lost'
  source: string | null
  created_at: string
  contacted_at: string | null
}

const STATUS_LABEL: Record<PartnerInquiry['status'], string> = {
  new: 'Ny',
  contacted: 'Kontaktad',
  closed: 'Vunnen',
  lost: 'Tappad',
}

const STATUS_COLOR: Record<PartnerInquiry['status'], string> = {
  new: '#1d4ed8',
  contacted: '#c96e2a',
  closed: '#0a7b3c',
  lost: '#7f1d1d',
}

const TIER_LABEL: Record<string, string> = {
  bas: 'Bas (500 kr)',
  standard: 'Standard (1 000 kr)',
  premium: 'Premium (2 500 kr)',
}

export default async function AdminPartnersPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin/partners')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  // Service-role client behövs eftersom RLS hindrar SELECT på partner_inquiries
  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const { data: inquiries, error } = await service
    .from('partner_inquiries')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(500)

  const list = (inquiries || []) as PartnerInquiry[]

  const stats = {
    total: list.length,
    new: list.filter(i => i.status === 'new').length,
    contacted: list.filter(i => i.status === 'contacted').length,
    closed: list.filter(i => i.status === 'closed').length,
    lost: list.filter(i => i.status === 'lost').length,
  }

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
          Partner-leads
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 24px' }}>
          B2B-förfrågningar från /partner
        </p>

        {/* Stats-rad */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8,
          marginBottom: 24,
        }}>
          {([
            ['Totalt', stats.total, 'var(--txt2)'],
            ['Nya', stats.new, STATUS_COLOR.new],
            ['Kontaktade', stats.contacted, STATUS_COLOR.contacted],
            ['Vunna', stats.closed, STATUS_COLOR.closed],
            ['Tappade', stats.lost, STATUS_COLOR.lost],
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

        {error && (
          <div style={{ padding: 16, background: '#fee', borderRadius: 10, color: '#7f1d1d', marginBottom: 16, fontSize: 13 }}>
            Fel vid hämtning: {error.message}
          </div>
        )}

        {list.length === 0 && !error && (
          <div style={{
            background: 'var(--white)', border: '1px solid var(--surface-3)',
            borderRadius: 12, padding: '40px 24px', textAlign: 'center',
            color: 'var(--txt2)', fontSize: 14,
          }}>
            Inga leads än. När någon fyller i formuläret på <Link href="/partner" style={{ color: 'var(--sea)' }}>/partner</Link> dyker de upp här.
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map(lead => (
            <div key={lead.id} style={{
              background: 'var(--white)',
              border: '1px solid var(--surface-3)',
              borderLeft: `4px solid ${STATUS_COLOR[lead.status]}`,
              borderRadius: 12,
              padding: '16px 18px',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>
                    {lead.business_name}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
                    {lead.contact_name && `${lead.contact_name} · `}
                    <a href={`mailto:${lead.email}`} style={{ color: 'var(--sea)' }}>{lead.email}</a>
                    {lead.phone && ` · ${lead.phone}`}
                  </div>
                </div>
                <span style={{
                  fontSize: 10, fontWeight: 700, padding: '3px 8px',
                  borderRadius: 999, background: STATUS_COLOR[lead.status],
                  color: '#fff', flexShrink: 0,
                }}>
                  {STATUS_LABEL[lead.status]}
                </span>
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, fontSize: 11, marginBottom: 10 }}>
                {lead.category && (
                  <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)' }}>
                    {lead.category}
                  </span>
                )}
                {lead.island_slug && (
                  <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt2)' }}>
                    {lead.island_slug}
                  </span>
                )}
                {lead.tier && (
                  <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--sea)', color: '#fff', fontWeight: 700 }}>
                    {TIER_LABEL[lead.tier] || lead.tier}
                  </span>
                )}
                <span style={{ padding: '2px 8px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--txt3)', marginLeft: 'auto' }}>
                  {new Date(lead.created_at).toLocaleString('sv-SE', { dateStyle: 'short', timeStyle: 'short' })}
                </span>
              </div>

              {lead.message && (
                <p style={{
                  fontSize: 13, color: 'var(--txt2)', lineHeight: 1.55,
                  margin: '0 0 12px', padding: '8px 12px',
                  background: 'var(--surface-2)', borderRadius: 8,
                  whiteSpace: 'pre-wrap',
                }}>
                  {lead.message}
                </p>
              )}

              <PartnerLeadActions id={lead.id} status={lead.status} email={lead.email} businessName={lead.business_name} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

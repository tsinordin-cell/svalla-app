import { createServerSupabaseClient } from '@/lib/supabase-server'
import { createClient as createServiceClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

// Inline SVG-ikoner — ersätter emoji-ikoner
function IcoMapPin({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21.3C7 14.5 4.8 11 4.8 7.8a7.2 7.2 0 0 1 14.4 0c0 3.2-2.2 6.7-7.2 13.5Z" />
      <circle cx="12" cy="8" r="2.4" />
    </svg>
  )
}
function IcoUtensils({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  )
}
function IcoShield({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3 4 7v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V7Z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
function IcoChatBubbles({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 5.5A1.5 1.5 0 0 1 5 4h10a1.5 1.5 0 0 1 1.5 1.5V11A1.5 1.5 0 0 1 15 12.5H9.5L7 14.8V12.5H5A1.5 1.5 0 0 1 3.5 11Z" />
      <path d="M16.5 7.5H19a1.5 1.5 0 0 1 1.5 1.5V14.5A1.5 1.5 0 0 1 19 16h-1.5v1.8L15.5 16H12a1.5 1.5 0 0 1-1.5-1.5V12.5" />
    </svg>
  )
}
function IcoHandshake({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="m11 17 2 2a1 1 0 1 0 3-3" />
      <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-1.41-1.41l2.62-2.62a4 4 0 0 1 5.66 0l1.62 1.62" />
      <path d="m20 12-3-3" />
      <path d="M2 13a3 3 0 1 0 6 0V8a1 1 0 0 1 1-1h4" />
    </svg>
  )
}
function IcoMail({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 6 10-6" />
    </svg>
  )
}
function IcoMegaphone({ color }: { color: string }) {
  return (
    <svg width={22} height={22} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 11 18-5v12L3 14v-3z" />
      <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
    </svg>
  )
}

type AdminTool = {
  href: string
  icon: React.ReactNode
  title: string
  desc: string
  badge: string | null
  color: string
}

const ADMIN_TOOLS: AdminTool[] = [
  {
    href:  '/admin/koordinater',
    icon:  <IcoMapPin color="#1d4ed8" />,
    title: 'Koordinatkorrigering',
    desc:  'Drag-and-drop karta — rätta platser som hamnat i vattnet',
    badge: 'NY',
    color: '#1d4ed8',
  },
  {
    href:  '/admin/platser',
    icon:  <IcoUtensils color="#0e7490" />,
    title: 'Redigera platser',
    desc:  'Kontaktinfo, hemsida och bokningslänk per plats',
    badge: null,
    color: '#0e7490',
  },
  {
    href:  '/admin/moderation',
    icon:  <IcoShield color="#7c3aed" />,
    title: 'Moderering',
    desc:  'Rapporter, flaggat innehåll och blockerade konton',
    badge: null,
    color: '#7c3aed',
  },
  {
    href:  '/admin/forum',
    icon:  <IcoChatBubbles color="#0a7b8c" />,
    title: 'Forum — spam-kö',
    desc:  'Granska och godkänn nya användares trådar och svar',
    badge: null,
    color: '#0a7b8c',
  },
  {
    href:  '/admin/partners',
    icon:  <IcoHandshake color="#c96e2a" />,
    title: 'Partner-leads',
    desc:  'B2B-förfrågningar från /partner — status, mailsvar',
    badge: 'NY',
    color: '#c96e2a',
  },
  {
    href:  '/admin/subscribers',
    icon:  <IcoMail color="#0a7b3c" />,
    title: 'E-postlista',
    desc:  'Nyhetsbrevsprenumeranter — export till Resend',
    badge: 'NY',
    color: '#0a7b3c',
  },
  {
    href:  '/admin/innehall',
    icon:  <IcoMegaphone color="#9d174d" />,
    title: 'Sociala medier',
    desc:  'Färdiga inlägg för Reddit, FB-grupper och Instagram',
    badge: 'NY',
    color: '#9d174d',
  },
]

export default async function AdminPage() {
  const supabase = await createServerSupabaseClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  // ── 7-dagars stats (service-role för tabeller med RLS) ────────
  const service = createServiceClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
  const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()

  const [
    tripsWeek,
    tripsToday,
    newUsersWeek,
    totalUsers,
    newPartnersWeek,
    pendingPartners,
    newSubsWeek,
    totalSubs,
  ] = await Promise.all([
    service.from('trips').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    service.from('trips').select('*', { count: 'exact', head: true }).gte('created_at', dayAgo),
    service.from('users').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    service.from('users').select('*', { count: 'exact', head: true }),
    service.from('partner_inquiries').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    service.from('partner_inquiries').select('*', { count: 'exact', head: true }).eq('status', 'new'),
    service.from('email_subscribers').select('*', { count: 'exact', head: true }).gte('created_at', sevenDaysAgo),
    service.from('email_subscribers').select('*', { count: 'exact', head: true }).eq('unsubscribed', false),
  ])

  const stats = {
    tripsWeek: tripsWeek.count ?? 0,
    tripsToday: tripsToday.count ?? 0,
    newUsersWeek: newUsersWeek.count ?? 0,
    totalUsers: totalUsers.count ?? 0,
    newPartnersWeek: newPartnersWeek.count ?? 0,
    pendingPartners: pendingPartners.count ?? 0,
    newSubsWeek: newSubsWeek.count ?? 0,
    totalSubs: totalSubs.count ?? 0,
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '20px 16px 80px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        {/* Back navigation */}
        <Link href="/feed" style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--txt3)', textDecoration: 'none',
          marginBottom: 20,
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 5.5L8.5 12L15 18.5" />
          </svg>
          Tillbaka till appen
        </Link>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>
          Admin
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 24px' }}>
          Svalla.se — interna verktyg
        </p>

        {/* ── Stats: senaste 7 dagar ──────────────────────────── */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: 8, marginBottom: 16,
        }}>
          <StatCard label="Turer (7d)" value={stats.tripsWeek} sub={`${stats.tripsToday} idag`} color="#1d4ed8" />
          <StatCard label="Nya seglare" value={stats.newUsersWeek} sub={`${stats.totalUsers} totalt`} color="#0a7b3c" />
          <StatCard label="Partner-leads" value={stats.newPartnersWeek} sub={`${stats.pendingPartners} obesvarade`} color="#c96e2a" linkTo="/admin/partners" />
          <StatCard label="E-postnya" value={stats.newSubsWeek} sub={`${stats.totalSubs} aktiva`} color="#7c3aed" linkTo="/admin/subscribers" />
        </div>

        <div style={{ marginBottom: 24 }}>
          <h2 style={{
            fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
            textTransform: 'uppercase', letterSpacing: 1, margin: '0 0 10px',
          }}>
            Verktyg
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {ADMIN_TOOLS.map(tool => (
            <a
              key={tool.href}
              href={tool.href}
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '16px 20px',
                background: 'var(--card)',
                border: '1px solid var(--border)',
                borderLeft: `4px solid ${tool.color}`,
                borderRadius: 10,
                textDecoration: 'none',
                color: 'inherit',
                transition: 'box-shadow 0.15s',
              }}
            >
              <span style={{ fontSize: 28 }}>{tool.icon}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span style={{ fontSize: 15, fontWeight: 600, color: 'var(--txt)' }}>
                    {tool.title}
                  </span>
                  {tool.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      background: tool.color, color: 'white',
                      padding: '1px 6px', borderRadius: 4,
                    }}>
                      {tool.badge}
                    </span>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
                  {tool.desc}
                </div>
              </div>
              <span style={{ color: 'var(--txt3)', fontSize: 18 }}>→</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color, linkTo }: {
  label: string
  value: number
  sub: string
  color: string
  linkTo?: string
}) {
  const inner = (
    <div style={{
      background: 'var(--white)',
      border: '1px solid var(--surface-3)',
      borderTop: `3px solid ${color}`,
      borderRadius: 10,
      padding: '12px 14px',
      cursor: linkTo ? 'pointer' : 'default',
      transition: 'transform .12s',
    }}>
      <div style={{ fontSize: 11, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 700, color, marginTop: 2 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{sub}</div>
    </div>
  )
  if (linkTo) {
    return (
      <Link href={linkTo} style={{ textDecoration: 'none', color: 'inherit' }}>
        {inner}
      </Link>
    )
  }
  return inner
}

import { createClient } from '@/lib/supabase'
import { redirect } from 'next/navigation'

export const dynamic = 'force-dynamic'

const ADMIN_TOOLS = [
  {
    href:  '/admin/koordinater',
    icon:  '📍',
    title: 'Koordinatkorrigering',
    desc:  'Drag-and-drop karta — rätta platser som hamnat i vattnet',
    badge: 'NY',
    color: '#1d4ed8',
  },
  {
    href:  '/admin/platser',
    icon:  '🍽',
    title: 'Redigera platser',
    desc:  'Kontaktinfo, hemsida och bokningslänk per plats',
    badge: null,
    color: '#0e7490',
  },
  {
    href:  '/admin/moderation',
    icon:  '🛡',
    title: 'Moderering',
    desc:  'Rapporter, flaggat innehåll och blockerade konton',
    badge: null,
    color: '#7c3aed',
  },
]

export default async function AdminPage() {
  const supabase = createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/logga-in?next=/admin')

  const { data: userRow } = await supabase
    .from('users')
    .select('is_admin')
    .eq('id', user.id)
    .single()

  if (!userRow?.is_admin) redirect('/feed')

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--bg)', padding: '32px 16px 80px' }}>
      <div style={{ maxWidth: 600, margin: '0 auto' }}>
        <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--sea)', margin: '0 0 4px' }}>
          Admin
        </h1>
        <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 28px' }}>
          Svalla.se — interna verktyg
        </p>
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

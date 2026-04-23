import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import type { ScoredStop } from '@/lib/planner'
import MyRoutesList from './MyRoutesList'

export const metadata: Metadata = {
  title: 'Planera din skärgårdsrutt — Svalla',
  description: 'Välj start, mål och intressen. Svalla hittar de bästa stoppen längs din rutt — krogar, bastun, bryggor och naturupplevelser.',
  openGraph: {
    title: 'Planera din skärgårdsrutt — Svalla',
    description: 'Smart ruttplanerare för Stockholms skärgård.',
    url: 'https://svalla.se/planera',
  },
  alternates: { canonical: 'https://svalla.se/planera' },
}

export const dynamic = 'force-dynamic'

type PlannedRoute = {
  id: string
  start_name: string
  end_name: string
  interests: string[]
  suggested_stops: ScoredStop[]
  status: string
  created_at: string
}

export default async function PlaneraPage() {
  const supabase = await createClient()
  const { data: { session } } = await supabase.auth.getSession()

  let myRoutes: PlannedRoute[] = []
  if (session) {
    const { data } = await supabase
      .from('planned_routes')
      .select('id, start_name, end_name, interests, suggested_stops, status, created_at')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
      .limit(20)
    myRoutes = data ?? []
  }

  return (
    <div style={{
      minHeight: '100dvh', background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Delade flikar: Planera / Rutter / Öar / Färjor */}
      <div role="tablist" style={{
        display: 'flex', gap: 0, padding: '0 16px',
        background: 'var(--glass-96)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
      }}>
        {([
          { label: 'Planera', href: '/planera',          active: true },
          { label: 'Rutter',  href: '/rutter',           active: false },
          { label: 'Öar',     href: '/rutter?vy=oar',    active: false },
          { label: 'Färjor',  href: '/rutter?vy=farjor', active: false },
        ]).map(t => (
          <Link key={t.href} href={t.href} role="tab" aria-selected={t.active} style={{
            flex: 1, textAlign: 'center', padding: '12px 0 10px',
            fontSize: 14, fontWeight: t.active ? 700 : 600,
            color: t.active ? 'var(--sea)' : 'var(--txt3)',
            textDecoration: 'none',
            borderBottom: t.active ? '2.5px solid var(--sea)' : '2.5px solid transparent',
            transition: 'color 160ms ease, border-color 160ms ease',
            marginBottom: -1,
          }}>{t.label}</Link>
        ))}
      </div>

      {/* Hero */}
      <div style={{
        background: 'var(--grad-sea)',
        padding: '16px 16px 28px',
        paddingTop: 'calc(16px + env(safe-area-inset-top, 0px))',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>
            Ruttplanerare
          </div>
          <h1 style={{ fontSize: 26, fontWeight: 900, color: '#fff', margin: '0 0 8px', lineHeight: 1.15 }}>
            Planera din skärgårdsrutt
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.72)', margin: '0 0 20px', lineHeight: 1.55 }}>
            Välj start, mål och intressen — vi hittar krogar, bastun och bryggor längs vägen.
          </p>
          <Link href="/planera/ny" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '13px 24px', borderRadius: 50,
            background: '#fff', color: 'var(--sea)',
            fontSize: 14, fontWeight: 800, textDecoration: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
          }}>
            🗺 Planera ny rutt
          </Link>
        </div>
      </div>

      <div style={{ padding: '20px 16px', maxWidth: 560, margin: '0 auto' }}>

        {/* Mina rutter */}
        {session && myRoutes.length > 0 && (
          <MyRoutesList initialRoutes={myRoutes} />
        )}

        {/* Inte inloggad */}
        {!session && (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: '20px',
            border: '1px solid rgba(10,123,140,0.08)', marginBottom: 24, textAlign: 'center',
          }}>
            <div style={{ fontSize: 28, marginBottom: 10 }}>⛵</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>Spara dina rutter</p>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px' }}>
              Logga in för att spara, dela och återvända till dina planerade rutter.
            </p>
            <Link href="/logga-in" style={{
              display: 'inline-block', padding: '10px 24px', borderRadius: 50,
              background: 'var(--grad-sea)', color: '#fff', fontSize: 13, fontWeight: 700, textDecoration: 'none',
            }}>
              Logga in
            </Link>
          </div>
        )}

        {/* Tom state */}
        {session && myRoutes.length === 0 && (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: '32px 20px',
            border: '1px solid rgba(10,123,140,0.08)', textAlign: 'center',
          }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>🗺</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>Inga rutter ännu</p>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Planera din första skärgårdsrutt och se vilka stopp som passar.
            </p>
            <Link href="/planera/ny" style={{
              display: 'inline-block', padding: '12px 28px', borderRadius: 50,
              background: 'var(--grad-sea)', color: '#fff', fontSize: 14, fontWeight: 700, textDecoration: 'none',
            }}>
              🗺 Planera din första rutt
            </Link>
          </div>
        )}

        {/* Länk till Thorkel */}
        <div style={{
          background: 'rgba(10,123,140,0.05)', borderRadius: 16, padding: '14px 16px',
          border: '1px solid rgba(10,123,140,0.1)', marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 22 }}>🧭</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Fråga Thorkel</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Berätta vad du letar efter — vår skärgårdsguide svarar på sekunder.</div>
          </div>
          <Link href="/guide" style={{
            fontSize: 12, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none',
            padding: '6px 12px', borderRadius: 20, background: 'rgba(10,123,140,0.1)',
          }}>
            Testa →
          </Link>
        </div>

        {/* Länk till kurerade turer */}
        <div style={{
          background: 'rgba(10,123,140,0.05)', borderRadius: 16, padding: '14px 16px',
          border: '1px solid rgba(10,123,140,0.1)', marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 22 }}>⛵</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Utforska kurerade turer</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Redaktionella rutter med waypoints, svårighetsgrad och tips.</div>
          </div>
          <Link href="/rutter" style={{
            fontSize: 12, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none',
            padding: '6px 12px', borderRadius: 20, background: 'rgba(10,123,140,0.1)',
          }}>
            Se alla →
          </Link>
        </div>
      </div>
    </div>
  )
}

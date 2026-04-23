import type { Metadata } from 'next'
import Link from 'next/link'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import type { ScoredStop } from '@/lib/planner'

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

const INTEREST_EMOJI: Record<string, string> = {
  krog: '🍽', bastu: '🛁', bad: '🏊', brygga: '⚓', natur: '🌿', bensin: '⛽',
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
          <section style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sea)', marginBottom: 14 }}>
              Mina rutter ({myRoutes.length})
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {myRoutes.map(route => {
                const stops: ScoredStop[] = Array.isArray(route.suggested_stops) ? route.suggested_stops : []
                return (
                  <Link key={route.id} href={`/planera/${route.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
                      border: '1px solid rgba(10,123,140,0.08)',
                      boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
                    }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 6 }}>
                        {route.start_name} → {route.end_name}
                      </div>
                      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: stops.length > 0 ? 8 : 0 }}>
                        {(route.interests ?? []).map(i => (
                          <span key={i} style={{
                            fontSize: 11, padding: '3px 8px', borderRadius: 20,
                            background: 'rgba(10,123,140,0.08)', color: 'var(--sea)', fontWeight: 700,
                          }}>
                            {INTEREST_EMOJI[i] ?? '•'} {i}
                          </span>
                        ))}
                      </div>
                      {stops.length > 0 && (
                        <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
                          {stops.length} stopp · {stops[0]?.name}{stops.length > 1 ? ` + ${stops.length - 1} till` : ''}
                        </div>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
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

        {/* Länk till AI-guide */}
        <div style={{
          background: 'rgba(10,123,140,0.05)', borderRadius: 16, padding: '14px 16px',
          border: '1px solid rgba(10,123,140,0.1)', marginTop: 8,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <span style={{ fontSize: 22 }}>🧭</span>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Vill du ha ett AI-förslag?</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Berätta vad du letar efter — guiden svarar på sekunder.</div>
          </div>
          <Link href="/guide" style={{
            fontSize: 12, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none',
            padding: '6px 12px', borderRadius: 20, background: 'rgba(10,123,140,0.1)',
          }}>
            Testa →
          </Link>
        </div>
      </div>
    </div>
  )
}

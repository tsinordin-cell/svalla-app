import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'
import type { ScoredStop } from '@/lib/planner'
import PlaneraCTA from './PlaneraCTA'

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data } = await supabase
    .from('planned_routes')
    .select('start_name, end_name')
    .eq('id', id)
    .eq('status', 'published')
    .single()

  if (!data) return { title: 'Rutt — Svalla' }
  return {
    title: `${data.start_name} → ${data.end_name} — Svalla`,
    description: `Planerad skärgårdsrutt från ${data.start_name} till ${data.end_name} med stopp längs vägen.`,
    openGraph: {
      title: `${data.start_name} → ${data.end_name}`,
      description: 'Planerad skärgårdsrutt med kurerade stopp — skapad med Svalla.',
      url: `https://svalla.se/planera/${id}`,
    },
    alternates: { canonical: `https://svalla.se/planera/${id}` },
  }
}

const INTEREST_EMOJI: Record<string, string> = {
  krog: '🍽', bastu: '🛁', bad: '🏊', brygga: '⚓', natur: '🌿', bensin: '⛽',
}

export default async function PlaneraIdPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: route } = await supabase
    .from('planned_routes')
    .select('id, start_name, end_name, interests, suggested_stops, status, created_at, user_id, trip_id')
    .eq('id', id)
    .single()

  if (!route || route.status === 'draft') notFound()

  const stops: ScoredStop[] = Array.isArray(route.suggested_stops) ? route.suggested_stops : []
  const interests: string[] = Array.isArray(route.interests) ? route.interests : []

  // Om inga stopp ännu — kör algoritmen nu (lazy)
  let resolvedStops = stops
  if (stops.length === 0) {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL ?? 'https://svalla.se'}/api/planera`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ routeId: id }),
        cache: 'no-store',
      })
      if (res.ok) {
        const json = await res.json()
        resolvedStops = json.stops ?? []
      }
    } catch { /* fortsätt utan stopp */ }
  }

  return (
    <div style={{
      minHeight: '100dvh', background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 24px)',
    }}>
      {/* Header */}
      <header style={{
        background: 'var(--grad-sea)',
        padding: '14px 16px 20px',
        paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <Link href="/planera" style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Planerad rutt</div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                {route.start_name} → {route.end_name}
              </h1>
            </div>
          </div>

          {/* Intresse-chips */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {interests.map(i => (
              <span key={i} style={{
                fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 20,
                background: 'rgba(255,255,255,0.15)', color: '#fff',
              }}>
                {INTEREST_EMOJI[i] ?? '•'} {i}
              </span>
            ))}
          </div>
        </div>
      </header>

      <div style={{ padding: '20px 16px', maxWidth: 560, margin: '0 auto' }}>

        {/* Stopp-lista */}
        {resolvedStops.length > 0 ? (
          <>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sea)', marginBottom: 14 }}>
              {resolvedStops.length} stopp längs rutten
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {resolvedStops.map((stop, idx) => (
                <Link
                  key={stop.id}
                  href={`/platser/${stop.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <div style={{
                    background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
                    border: '1px solid rgba(10,123,140,0.08)',
                    boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
                    display: 'flex', alignItems: 'center', gap: 14,
                    transition: 'box-shadow 0.15s',
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
                      background: 'rgba(10,123,140,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 800, color: 'var(--sea)',
                    }}>
                      {idx + 1}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>{stop.name}</div>
                      <div style={{ fontSize: 12, color: 'var(--txt3)', display: 'flex', gap: 8 }}>
                        {stop.island && <span>{stop.island}</span>}
                        <span>· {stop.reason}</span>
                      </div>
                    </div>
                    <div style={{ fontSize: 11, color: 'var(--txt3)', flexShrink: 0 }}>
                      {stop.distance_from_line_km} km
                    </div>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: '24px 20px', textAlign: 'center',
            border: '1px solid rgba(10,123,140,0.08)',
          }}>
            <div style={{ fontSize: 36, marginBottom: 10 }}>🗺</div>
            <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>Inga stopp hittades</p>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
              Inga platser i vår databas matchar dina intressen längs den här rutten ännu.
            </p>
          </div>
        )}

        {/* CTA: Jag gjorde den här turen */}
        <PlaneraCTA routeId={route.id} hasDoneIt={!!route.trip_id} />

        {/* Dela */}
        <div style={{
          marginTop: 20, background: 'var(--white)', borderRadius: 16, padding: '16px',
          border: '1px solid rgba(10,123,140,0.08)',
        }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 8 }}>📤 Dela rutten</div>
          <div style={{
            fontSize: 12, color: 'var(--txt3)', background: 'var(--bg)',
            padding: '10px 12px', borderRadius: 10, fontFamily: 'monospace',
            wordBreak: 'break-all',
          }}>
            svalla.se/planera/{route.id}
          </div>
        </div>

        {/* Planera ny */}
        <Link href="/planera/ny" style={{ display: 'block', marginTop: 16, textAlign: 'center', fontSize: 13, color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}>
          + Planera en ny rutt
        </Link>
      </div>
    </div>
  )
}

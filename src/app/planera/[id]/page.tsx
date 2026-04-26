import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient as createClient } from '@/lib/supabase-server'
import type { ScoredStop } from '@/lib/planner'
import { haversineKm, crossTrack } from '@/lib/planner'
import PlaneraCTA from './PlaneraCTA'
import PlaneraShare from './PlaneraShare'
import PlaneraMap from './PlaneraMapDynamic'

type Props = { params: Promise<{ id: string }> }

// ── Display helpers ────────────────────────────────────────────────────────

const INTEREST_EMOJI: Record<string, string> = {
  krog: '🍽', bastu: '🛁', bad: '🏊', brygga: '⚓', natur: '🌿', bensin: '⛽',
}

const REASON_EMOJI: Record<string, string> = {
  'Krog längs rutten':          '🍽',
  'Bastu längs rutten':         '🛁',
  'Badplats längs rutten':      '🏊',
  'Brygga att lägga till vid':  '⚓',
  'Naturupplevelse längs rutten': '🌿',
  'Bränslestopp längs rutten':  '⛽',
}

const REASON_SHORT: Record<string, string> = {
  'Krog längs rutten':          'Krog',
  'Bastu längs rutten':         'Bastu',
  'Badplats längs rutten':      'Badplats',
  'Brygga att lägga till vid':  'Gästhamn',
  'Naturupplevelse längs rutten': 'Natur',
  'Bränslestopp längs rutten':  'Bränsle',
}

const REASON_COLOR: Record<string, string> = {
  'Krog längs rutten':          '#e8924a',
  'Bastu längs rutten':         '#d97706',
  'Badplats längs rutten':      '#2d7aaa',
  'Brygga att lägga till vid':  '#1a4a5e',
  'Naturupplevelse längs rutten': '#2a9d5c',
  'Bränslestopp längs rutten':  '#c96e2a',
}

const REASON_BG: Record<string, string> = {
  'Krog längs rutten':          'rgba(232,146,74,0.12)',
  'Bastu längs rutten':         'rgba(217,119,6,0.12)',
  'Badplats längs rutten':      'rgba(45,122,170,0.12)',
  'Brygga att lägga till vid':  'rgba(26,74,94,0.10)',
  'Naturupplevelse längs rutten': 'rgba(42,157,92,0.12)',
  'Bränslestopp längs rutten':  'rgba(201,110,42,0.12)',
}

// ── Metadata ───────────────────────────────────────────────────────────────

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

// ── Page ───────────────────────────────────────────────────────────────────

export default async function PlaneraIdPage({ params }: Props) {
  const { id } = await params
  const supabase = await createClient()

  const { data: route } = await supabase
    .from('planned_routes')
    .select('id, start_name, end_name, start_lat, start_lng, end_lat, end_lng, interests, suggested_stops, status, created_at, user_id, trip_id')
    .eq('id', id)
    .single()

  if (!route || route.status === 'draft') notFound()

  const stops: ScoredStop[] = Array.isArray(route.suggested_stops) ? route.suggested_stops : []
  const interests: string[] = Array.isArray(route.interests) ? route.interests : []

  // Lazy-compute stops if empty
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
        const json = await res.json() as { stops?: ScoredStop[] }
        resolvedStops = json.stops ?? []
      }
    } catch { /* fortsätt utan stopp */ }
  }

  // Sort stops geographically along the route (start → end)
  const sortedStops = [...resolvedStops].sort((a, b) => {
    const { t: ta } = crossTrack(a.lat, a.lng, route.start_lat, route.start_lng, route.end_lat, route.end_lng)
    const { t: tb } = crossTrack(b.lat, b.lng, route.start_lat, route.start_lng, route.end_lat, route.end_lng)
    return ta - tb
  })

  const totalKm = Math.round(haversineKm(route.start_lat, route.start_lng, route.end_lat, route.end_lng))

  // Map stop data (only what PlaneraMap needs)
  const mapStops = sortedStops.map(s => ({
    lat: s.lat,
    lng: s.lng,
    name: s.name,
    reason: s.reason,
    color: REASON_COLOR[s.reason] ?? '#1e5c82',
    emoji: REASON_EMOJI[s.reason] ?? '📍',
  }))

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
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Link href="/planera" style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                Planerad rutt
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: '#fff', margin: 0, lineHeight: 1.2 }}>
                {route.start_name} → {route.end_name}
              </h1>
            </div>
            {/* Total distance badge */}
            <div style={{
              flexShrink: 0, background: 'rgba(255,255,255,0.15)',
              borderRadius: 20, padding: '4px 12px',
              fontSize: 13, fontWeight: 800, color: '#fff',
            }}>
              ~{totalKm} km
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

        {/* Map */}
        <PlaneraMap
          startLat={route.start_lat}
          startLng={route.start_lng}
          startName={route.start_name}
          endLat={route.end_lat}
          endLng={route.end_lng}
          endName={route.end_name}
          stops={mapStops}
        />

        {/* Stop list */}
        {sortedStops.length > 0 ? (
          <>
            <div style={{
              fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
              color: 'var(--sea)', marginBottom: 14,
            }}>
              {sortedStops.length} stopp längs rutten
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {sortedStops.map((stop, idx) => {
                const emoji = REASON_EMOJI[stop.reason] ?? '📍'
                const short = REASON_SHORT[stop.reason] ?? stop.reason
                const color = REASON_COLOR[stop.reason] ?? '#1e5c82'
                const bg    = REASON_BG[stop.reason]    ?? 'rgba(10,123,140,0.08)'
                const isFar = stop.distance_from_line_km > 5
                const distLabel = stop.distance_from_line_km < 1
                  ? '<1 km'
                  : `${stop.distance_from_line_km} km`
                return (
                  <Link key={stop.id} href={`/platser/${stop.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
                      border: `1px solid ${isFar ? 'rgba(232,146,74,0.2)' : 'rgba(10,123,140,0.08)'}`,
                      boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
                      display: 'flex', alignItems: 'center', gap: 14,
                    }}>
                      {/* Step number + emoji */}
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', flexShrink: 0,
                        background: bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 18, position: 'relative',
                      }}>
                        {emoji}
                        <span style={{
                          position: 'absolute', top: -4, right: -4,
                          width: 16, height: 16, borderRadius: '50%',
                          background: color, color: '#fff',
                          fontSize: 9, fontWeight: 800,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          border: '1.5px solid var(--white)',
                        }}>
                          {idx + 1}
                        </span>
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {stop.name}
                        </div>
                        <div style={{ fontSize: 12, color: 'var(--txt3)', display: 'flex', gap: 6, alignItems: 'center' }}>
                          {stop.island && <span>{stop.island}</span>}
                          {stop.island && <span>·</span>}
                          <span style={{ color, fontWeight: 600 }}>{short}</span>
                        </div>
                      </div>

                      <div style={{ flexShrink: 0, textAlign: 'right' }}>
                        <div style={{ fontSize: 11, color: isFar ? '#e8924a' : 'var(--txt3)', fontWeight: isFar ? 700 : 400, whiteSpace: 'nowrap' }}>
                          {distLabel}
                        </div>
                        <div style={{ fontSize: 10, color: isFar ? '#e8924a' : 'var(--txt3)', opacity: 0.7 }}>
                          {isFar ? 'omväg' : 'från rutten'}
                        </div>
                      </div>

                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 16, height: 16, flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </Link>
                )
              })}
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

        {/* CTA */}
        <PlaneraCTA routeId={route.id} hasDoneIt={!!route.trip_id} />

        {/* Share */}
        <PlaneraShare routeId={route.id} />

        {/* Plan new route */}
        <Link href="/planera/ny" style={{
          display: 'block', marginTop: 16, textAlign: 'center',
          fontSize: 13, color: 'var(--sea)', fontWeight: 700, textDecoration: 'none',
        }}>
          + Planera en ny rutt
        </Link>
      </div>
    </div>
  )
}

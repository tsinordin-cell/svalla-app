'use client'
import { useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import type { ScoredStop } from '@/lib/planner'
import Icon, { type IconName } from '@/components/Icon'

type PlannedRoute = {
  id: string
  start_name: string
  end_name: string
  interests: string[]
  suggested_stops: ScoredStop[]
  status: string
  created_at: string
}

const INTEREST_ICON: Record<string, IconName> = {
  krog: 'utensils', bastu: 'sun', bad: 'waves', brygga: 'anchor', natur: 'leaf', bensin: 'fuel',
}

const INTEREST_COLOR: Record<string, { bg: string; text: string }> = {
  krog:   { bg: 'rgba(220,38,38,0.09)',  text: '#c02020' },
  bastu:  { bg: 'rgba(234,88,12,0.09)',  text: '#c05010' },
  bad:    { bg: 'rgba(6,182,212,0.09)',   text: '#0077aa' },
  brygga: { bg: 'rgba(37,99,235,0.09)',   text: '#1d4ed8' },
  natur:  { bg: 'rgba(22,163,74,0.09)',   text: '#15803d' },
  bensin: { bg: 'rgba(161,98,7,0.09)',    text: '#92600a' },
}

export default function MyRoutesList({ initialRoutes }: { initialRoutes: PlannedRoute[] }) {
  const [routes, setRoutes] = useState(initialRoutes)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  async function handleDelete(e: React.MouseEvent, routeId: string, label: string) {
    e.preventDefault()
    e.stopPropagation()
    if (deletingId) return
    if (!confirm(`Radera rutten "${label}"?`)) return
    setDeletingId(routeId)
    const supabase = createClient()
    const { error } = await supabase.from('planned_routes').delete().eq('id', routeId)
    setDeletingId(null)
    if (error) {
      alert('Kunde inte radera rutten. Försök igen.')
      return
    }
    setRoutes(prev => prev.filter(r => r.id !== routeId))
  }

  if (routes.length === 0) return null

  return (
    <section style={{ marginBottom: 32 }}>
      <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--sea)', marginBottom: 14 }}>
        Mina rutter ({routes.length})
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {routes.map(route => {
          const stops: ScoredStop[] = Array.isArray(route.suggested_stops) ? route.suggested_stops : []
          const label = `${route.start_name} → ${route.end_name}`
          const isDeleting = deletingId === route.id
          return (
            <Link
              key={route.id}
              href={`/planera/${route.id}`}
              style={{ textDecoration: 'none', opacity: isDeleting ? 0.4 : 1, pointerEvents: isDeleting ? 'none' : 'auto' }}
            >
              <div style={{
                background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
                border: '1px solid rgba(10,123,140,0.08)',
                boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
                display: 'flex', alignItems: 'center', gap: 12,
              }}>
                {/* Rutt-ikon */}
                <div style={{
                  width: 40, height: 40, borderRadius: 12, flexShrink: 0,
                  background: 'rgba(10,123,140,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'var(--sea)',
                }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 18, height: 18 }}>
                    <circle cx="5" cy="6" r="2"/><circle cx="19" cy="18" r="2"/>
                    <path d="M5 8c0 5 6 3 9 8"/>
                  </svg>
                </div>
                {/* Innehåll */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 6, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {label}
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {(route.interests ?? []).map(i => {
                      const col = INTEREST_COLOR[i] ?? { bg: 'rgba(10,123,140,0.08)', text: 'var(--sea)' }
                      const iconName = INTEREST_ICON[i]
                      return (
                        <span key={i} style={{
                          fontSize: 10, padding: '3px 8px', borderRadius: 20,
                          background: col.bg, color: col.text, fontWeight: 700,
                          letterSpacing: '0.02em',
                          display: 'inline-flex', alignItems: 'center', gap: 4,
                        }}>
                          {iconName ? <Icon name={iconName} size={11} stroke={2} /> : <span>•</span>}
                          {i}
                        </span>
                      )
                    })}
                    {stops.length > 0 && (
                      <span style={{
                        fontSize: 10, padding: '2px 7px', borderRadius: 20,
                        background: 'rgba(10,123,140,0.06)', color: 'var(--txt3)', fontWeight: 600,
                      }}>
                        {stops.length} stopp
                      </span>
                    )}
                  </div>
                </div>
                {/* Radera-knapp */}
                <button
                  onClick={(e) => handleDelete(e, route.id, label)}
                  aria-label={`Radera ${label}`}
                  disabled={isDeleting}
                  style={{
                    width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                    background: 'transparent',
                    border: 'none',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: isDeleting ? 'default' : 'pointer',
                    color: 'var(--txt3)',
                    transition: 'background 0.15s, color 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(220,38,38,0.08)'
                    e.currentTarget.style.color = '#dc2626'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--txt3)'
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" style={{ width: 16, height: 16 }}>
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14zM10 11v6M14 11v6"/>
                  </svg>
                </button>
              </div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

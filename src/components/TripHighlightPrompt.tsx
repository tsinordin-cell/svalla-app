'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase'

/**
 * TripHighlightPrompt — visas EFTER en GPS-tur sparats.
 *
 * Frågar "Vilken plats var höjdpunkten?" och visar 3–6 POI:er nära GPS-rutten.
 * En tap → POST /api/trips/[id]/highlight → trip_highlights-rad + push-trigger.
 *
 * Designprincip: NOLL textinput, max EN tap. Användaren kan skippa.
 *
 * Props:
 *   tripId: id på just sparad tur
 *   routePoints: GPS-punkter ([{lat,lng}, ...])
 *   onDone: callback när användaren valt eller skippat
 */

type RoutePoint = { lat: number; lng: number }

type Candidate = {
  slug: string
  name: string
  type: string | null
  island: string | null
  lat: number
  lng: number
  image_url: string | null
}

const MAX_DIST_KM = 0.8  // POI:er inom 800m från någon GPS-punkt
const MAX_CANDIDATES = 6

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * 6371 * Math.asin(Math.sqrt(a))
}

function minDistanceToRoute(p: { lat: number; lng: number }, route: RoutePoint[]): number {
  // Glesa rutten till var 5:e punkt för prestanda
  const stride = Math.max(1, Math.floor(route.length / 30))
  let min = Infinity
  for (let i = 0; i < route.length; i += stride) {
    const r = route[i]!
    const d = haversineKm(p.lat, p.lng, r.lat, r.lng)
    if (d < min) min = d
  }
  return min
}

export default function TripHighlightPrompt({
  tripId,
  routePoints,
  onDone,
}: {
  tripId: string
  routePoints: RoutePoint[]
  onDone: () => void
}) {
  const supabase = createClient()
  const [candidates, setCandidates] = useState<Candidate[] | null>(null)
  const [submitting, setSubmitting] = useState<string | null>(null) // slug under save
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      // Bounding box runt rutten för Supabase-filter
      if (!routePoints.length) { setCandidates([]); return }
      const lats = routePoints.map(p => p.lat)
      const lngs = routePoints.map(p => p.lng)
      const pad = 0.02 // ~2 km
      const minLat = Math.min(...lats) - pad
      const maxLat = Math.max(...lats) + pad
      const minLng = Math.min(...lngs) - pad
      const maxLng = Math.max(...lngs) + pad

      const { data } = await supabase
        .from('restaurants')
        .select('slug, name, type, island, latitude, longitude, image_url')
        .gte('latitude', minLat).lte('latitude', maxLat)
        .gte('longitude', minLng).lte('longitude', maxLng)
        .not('latitude', 'is', null)
        .not('longitude', 'is', null)
        .limit(60)

      if (cancelled) return

      const scored = (data ?? [])
        .filter(r => r.slug && r.latitude != null && r.longitude != null)
        .map(r => ({
          c: {
            slug: r.slug as string,
            name: r.name,
            type: r.type ?? null,
            island: r.island ?? null,
            lat: r.latitude!,
            lng: r.longitude!,
            image_url: r.image_url ?? null,
          },
          d: minDistanceToRoute({ lat: r.latitude!, lng: r.longitude! }, routePoints),
        }))
        .filter(s => s.d <= MAX_DIST_KM)
        .sort((a, b) => a.d - b.d)
        .slice(0, MAX_CANDIDATES)
        .map(s => s.c)

      setCandidates(scored)
    }
    load()
    return () => { cancelled = true }
  }, [routePoints, supabase])

  async function chooseHighlight(c: Candidate) {
    if (submitting) return
    setSubmitting(c.slug)
    setError(null)
    try {
      const res = await fetch(`/api/trips/${tripId}/highlight`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          place_slug: c.slug,
          place_name: c.name,
          place_type: c.type,
          island: c.island,
          lat: c.lat,
          lng: c.lng,
        }),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error || 'Kunde inte spara höjdpunkt.')
        setSubmitting(null)
        return
      }
      onDone()
    } catch {
      setError('Anslutningsfel — försök igen.')
      setSubmitting(null)
    }
  }

  if (candidates === null) {
    return (
      <div style={{ padding: 24, textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
        Letar efter platser längs rutten…
      </div>
    )
  }

  if (candidates.length === 0) {
    // Inga platser nära rutten — skippa direkt utan att besvära användaren
    onDone()
    return null
  }

  return (
    <div style={{ padding: '20px 16px', background: 'var(--white)', borderRadius: 16 }}>
      <h3 style={{
        fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px',
      }}>
        Vilken plats var höjdpunkten?
      </h3>
      <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px', lineHeight: 1.5 }}>
        Tryck på en plats du passerade. Det syns på platsens sida och i feeden för andra som sparat den.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 8 }}>
        {candidates.map(c => (
          <button
            key={c.slug}
            onClick={() => chooseHighlight(c)}
            disabled={!!submitting}
            style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px',
              borderRadius: 12,
              background: submitting === c.slug ? 'rgba(10,123,140,0.18)' : 'var(--bg)',
              border: '1.5px solid rgba(10,123,140,0.12)',
              cursor: submitting ? 'default' : 'pointer',
              textAlign: 'left',
              opacity: submitting && submitting !== c.slug ? 0.5 : 1,
            }}
          >
            {c.image_url && (
              <div style={{
                width: 40, height: 40, borderRadius: 8, flexShrink: 0,
                backgroundImage: `url(${c.image_url})`,
                backgroundSize: 'cover', backgroundPosition: 'center',
              }} />
            )}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>
                {c.name}
              </div>
              {c.island && (
                <div style={{ fontSize: 12, color: 'var(--txt3)' }}>
                  {c.island}
                </div>
              )}
            </div>
            {submitting === c.slug && (
              <span style={{ fontSize: 12, color: 'var(--sea)' }}>Sparar…</span>
            )}
          </button>
        ))}
      </div>

      {error && (
        <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#a01616', marginTop: 8 }}>
          {error}
        </div>
      )}

      <button
        onClick={onDone}
        disabled={!!submitting}
        style={{
          marginTop: 8, width: '100%',
          padding: '10px 16px', borderRadius: 12,
          border: '1.5px solid rgba(10,123,140,0.12)', background: 'transparent',
          color: 'var(--txt2)', fontSize: 13, fontWeight: 600,
          cursor: 'pointer',
        }}
      >
        Hoppa över
      </button>
    </div>
  )
}

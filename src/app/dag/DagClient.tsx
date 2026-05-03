'use client'

import { useEffect, useState, useMemo, useRef } from 'react'
import Link from 'next/link'
import SvallaLogo from '@/components/SvallaLogo'
import { suggestDay, summariseDay, type DagStop } from '@/lib/dagPlanner'
import { track } from '@/lib/analytics-events'
import type { Restaurant } from '@/lib/supabase'

// Pausad feature — typen lever kvar för framtida bruk om vi återupptar.
type DagPoolEntry = Pick<
  Restaurant,
  'id' | 'name' | 'type' | 'island' | 'latitude' | 'longitude' |
  'description' | 'image_url' | 'booking_url' | 'opening_hours' | 'seasonality' | 'categories'
>

type GeoStatus = 'idle' | 'loading' | 'granted' | 'denied' | 'unavailable'

type Position = {
  lat: number
  lng: number
  label: string  // visningsnamn
}

const FALLBACK_STARTS: Position[] = [
  { lat: 59.2939, lng: 18.4583, label: 'Sandhamn' },
  { lat: 59.4024, lng: 18.3512, label: 'Vaxholm' },
  { lat: 59.4602, lng: 18.7167, label: 'Grinda' },
  { lat: 59.0483, lng: 18.2833, label: 'Utö' },
  { lat: 59.4806, lng: 18.7639, label: 'Möja' },
  { lat: 57.8869, lng: 11.5808, label: 'Marstrand' },
  { lat: 58.3552, lng: 11.2361, label: 'Smögen' },
]

export default function DagClient({ pool, loadError }: { pool: DagPoolEntry[]; loadError: boolean }) {
  const [geoStatus, setGeoStatus] = useState<GeoStatus>('idle')
  const [pos, setPos] = useState<Position | null>(null)
  const [startTime, setStartTime] = useState<string>(() => {
    const d = new Date()
    return `${String(d.getHours()).padStart(2, '0')}:${String(Math.max(0, d.getMinutes())).padStart(2, '0')}`
  })
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const stops = useMemo(() => {
    if (!pos) return []
    return suggestDay(pos.lat, pos.lng, startTime, pool)
  }, [pos, startTime, pool])

  const summary = useMemo(() => summariseDay({ stops }), [stops])

  // Mätning: sidvisning vid mount
  const viewedRef = useRef(false)
  useEffect(() => {
    if (viewedRef.current) return
    viewedRef.current = true
    track('dag_page_viewed', {})
  }, [])

  // Mätning: plan genererad (track varje gång stops ändras till >0 stops)
  const lastTrackedKey = useRef<string>('')
  useEffect(() => {
    if (stops.length === 0) return
    const key = stops.map(s => s.id).join('|')
    if (key === lastTrackedKey.current) return
    lastTrackedKey.current = key
    track('dag_plan_generated', {
      stops: stops.length,
      total_km: summary.totalDistanceKm,
      total_min: summary.totalDurationMin,
    })
  }, [stops, summary.totalDistanceKm, summary.totalDurationMin])

  function requestGPS() {
    if (typeof navigator === 'undefined' || !navigator.geolocation) {
      setGeoStatus('unavailable')
      return
    }
    setGeoStatus('loading')
    navigator.geolocation.getCurrentPosition(
      (p) => {
        setPos({ lat: p.coords.latitude, lng: p.coords.longitude, label: 'Din position' })
        setGeoStatus('granted')
        track('dag_position_set', { source: 'gps' })
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) setGeoStatus('denied')
        else setGeoStatus('unavailable')
      },
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 60_000 },
    )
  }

  async function savePlan() {
    if (!pos || stops.length === 0) return
    track('dag_save_clicked', { stops: stops.length })
    setSaving(true)
    setError(null)
    try {
      const res = await fetch('/api/dag/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startLat: pos.lat,
          startLng: pos.lng,
          startName: pos.label,
          startTime,
          stops,
        }),
      })
      const json = await res.json()
      if (!res.ok) {
        if (res.status === 401) {
          setError('Logga in för att spara din dag.')
          track('dag_save_failed', { reason: 'auth' })
        } else {
          setError(json.error || 'Kunde inte spara.')
          track('dag_save_failed', { reason: 'server' })
        }
        return
      }
      setSavedId(json.id)
      track('dag_plan_saved', { plan_id: json.id, stops: stops.length })
    } catch {
      setError('Kunde inte spara — kontrollera anslutning.')
      track('dag_save_failed', { reason: 'network' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h, 64px) + 32px)' }}>
      {/* HERO */}
      <div style={{ background: 'var(--grad-sea-hero, linear-gradient(160deg, #1e5c82 0%, #2d7d8a 100%))', padding: '40px 20px 28px' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <Link href="/upptack" style={{ textDecoration: 'none', display: 'inline-block', marginBottom: 14 }}>
            <SvallaLogo height={24} color="#ffffff" />
          </Link>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#fff', margin: '0 0 6px', letterSpacing: -0.3 }}>
            Min dag
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 14, margin: 0, lineHeight: 1.55, maxWidth: 560 }}>
            En komplett skärgårdsdag på 30 sekunder. Vi föreslår tre stopp från din position — fika, lunch, middag — med tider, avstånd och boknings­länkar.
          </p>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 20px 0' }}>
        {/* Steg 1: position */}
        {!pos && (
          <section style={{ background: 'var(--white)', borderRadius: 16, padding: '24px 22px', boxShadow: '0 2px 12px rgba(0,45,60,0.06)', marginBottom: 16 }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>1. Var är du nu?</h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 16px', lineHeight: 1.5 }}>
              Vi använder din position bara här — sparar inget, skickar inget vidare.
            </p>
            <button
              onClick={requestGPS}
              disabled={geoStatus === 'loading'}
              style={{
                width: '100%', padding: '14px 18px', borderRadius: 14, border: 'none',
                background: 'var(--grad-sea, #1e5c82)', color: '#fff',
                fontWeight: 700, fontSize: 14, cursor: 'pointer',
                opacity: geoStatus === 'loading' ? 0.7 : 1,
                marginBottom: 12,
              }}
            >
              {geoStatus === 'loading' ? 'Hämtar position…' : 'Använd min GPS-position'}
            </button>

            {(geoStatus === 'denied' || geoStatus === 'unavailable') && (
              <p style={{ fontSize: 12, color: 'var(--acc, #c96e2a)', margin: '4px 0 16px', lineHeight: 1.5 }}>
                {geoStatus === 'denied'
                  ? 'GPS blockerad. Välj en startö nedan istället.'
                  : 'GPS otillgänglig. Välj en startö nedan istället.'}
              </p>
            )}

            <div style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.06em', margin: '8px 0' }}>
              Eller välj en startö
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {FALLBACK_STARTS.map(p => (
                <button
                  key={p.label}
                  onClick={() => { setPos(p); setGeoStatus('idle'); track('dag_position_set', { source: 'fallback', label: p.label }) }}
                  style={{
                    padding: '8px 14px', borderRadius: 20, border: '1.5px solid rgba(10,123,140,0.18)',
                    background: 'var(--white)', color: 'var(--sea)',
                    fontSize: 13, fontWeight: 600, cursor: 'pointer',
                  }}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Steg 2: tid + plan */}
        {pos && (
          <>
            <section style={{ background: 'var(--white)', borderRadius: 16, padding: '20px 22px', boxShadow: '0 2px 12px rgba(0,45,60,0.06)', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
              <div style={{ flex: 1, minWidth: 140 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Start</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>{pos.label}</div>
                <button
                  onClick={() => { setPos(null); setSavedId(null) }}
                  style={{ background: 'none', border: 'none', padding: 0, color: 'var(--sea)', fontSize: 12, fontWeight: 600, cursor: 'pointer', marginTop: 2 }}
                >
                  Byt startpunkt
                </button>
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 4 }}>Starttid</div>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  style={{
                    fontSize: 16, fontWeight: 700, color: 'var(--txt)',
                    background: 'var(--bg)', border: '1.5px solid rgba(10,123,140,0.12)',
                    borderRadius: 10, padding: '8px 12px', width: 110,
                  }}
                />
              </div>
            </section>

            {/* Sammanfattning */}
            {stops.length > 0 && (
              <div style={{ display: 'flex', gap: 10, marginBottom: 16, flexWrap: 'wrap' }}>
                <Pill label={`${stops.length} stopp`} />
                <Pill label={`${summary.totalDistanceKm} km båt`} />
                <Pill label={`~${Math.round(summary.totalDurationMin / 60)} h`} />
              </div>
            )}

            {/* Tidslinje */}
            {stops.length === 0 && (
              <div style={{ background: 'var(--white)', borderRadius: 16, padding: '32px 22px', textAlign: 'center', boxShadow: '0 2px 12px rgba(0,45,60,0.06)' }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', marginBottom: 6 }}>
                  Inga öppna stopp i närheten just nu
                </div>
                <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, lineHeight: 1.55 }}>
                  Prova en annan startpunkt eller kolla igen i sommarsäsong (maj–september).
                </p>
              </div>
            )}

            {stops.length > 0 && (
              <div style={{ position: 'relative', paddingLeft: 36 }}>
                {/* Vertikal linje */}
                <div style={{ position: 'absolute', left: 16, top: 14, bottom: 14, width: 2, background: 'rgba(10,123,140,0.14)' }} />

                {/* Startmarkör */}
                <div style={{ position: 'relative', marginBottom: 14 }}>
                  <div style={{ position: 'absolute', left: -32, top: 4, width: 14, height: 14, borderRadius: '50%', background: 'var(--sea, #1e5c82)', border: '3px solid var(--bg, #f4f1ea)' }} />
                  <div style={{ background: 'transparent', padding: '2px 0' }}>
                    <div style={{ fontSize: 13, color: 'var(--txt3)' }}>
                      <strong style={{ color: 'var(--txt)' }}>{startTime}</strong> · {pos.label}
                    </div>
                  </div>
                </div>

                {/* Stopp */}
                {stops.map((s, i) => (
                  <StopCard key={s.id} stop={s} idx={i + 1} />
                ))}
              </div>
            )}

            {/* Action */}
            {stops.length > 0 && (
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
                {savedId ? (
                  <div style={{ background: 'rgba(34,197,94,0.10)', border: '1px solid rgba(34,197,94,0.30)', borderRadius: 14, padding: '14px 18px', color: 'var(--txt)', fontSize: 14, lineHeight: 1.5 }}>
                    Sparad! Du hittar din dag i <Link href="/sparade" style={{ color: 'var(--sea)', fontWeight: 700 }}>Sparade</Link>.
                  </div>
                ) : (
                  <button
                    onClick={savePlan}
                    disabled={saving}
                    style={{
                      width: '100%', padding: '15px 18px', borderRadius: 14, border: 'none',
                      background: 'var(--grad-sea, #1e5c82)', color: '#fff',
                      fontWeight: 700, fontSize: 15, cursor: saving ? 'default' : 'pointer',
                      opacity: saving ? 0.7 : 1,
                    }}
                  >
                    {saving ? 'Sparar…' : 'Spara min dag'}
                  </button>
                )}

                {error && (
                  <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 12, padding: '10px 14px', fontSize: 13, color: '#a01616' }}>
                    {error}
                  </div>
                )}

                <p style={{ fontSize: 12, color: 'var(--txt3)', textAlign: 'center', margin: '4px 0 0', lineHeight: 1.5 }}>
                  Förslagen baseras på 175 verifierade krogar, hamnar och naturhamnar. Säsong kan stänga vissa platser — dubbelkolla via boknings­länken.
                </p>
              </div>
            )}
          </>
        )}

        {loadError && (
          <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 12, padding: '12px 16px', fontSize: 13, color: '#a01616', marginTop: 16 }}>
            Kunde inte hämta platsdata. Ladda om sidan.
          </div>
        )}
      </div>
    </div>
  )
}

function Pill({ label }: { label: string }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center',
      padding: '6px 12px', borderRadius: 20,
      background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
      fontSize: 12, fontWeight: 700,
    }}>
      {label}
    </span>
  )
}

function StopCard({ stop, idx }: { stop: DagStop; idx: number }) {
  return (
    <div style={{ position: 'relative', marginBottom: 14 }}>
      {/* Markör */}
      <div style={{
        position: 'absolute', left: -32, top: 14,
        width: 14, height: 14, borderRadius: '50%',
        background: 'var(--acc, #c96e2a)', border: '3px solid var(--bg, #f4f1ea)',
      }} />

      {/* Transport-segment ovanför kortet */}
      {stop.travelFromPrevMin > 0 && (
        <div style={{
          fontSize: 11, color: 'var(--txt3)',
          padding: '0 0 8px',
        }}>
          {stop.travelFromPrevMin} min båt · {stop.distanceFromPrevKm} km
        </div>
      )}

      <div style={{
        background: 'var(--white)',
        borderRadius: 14,
        padding: '14px 16px',
        boxShadow: '0 2px 8px rgba(0,45,60,0.06)',
        display: 'flex', gap: 12,
      }}>
        {stop.image_url && (
          <div style={{
            width: 64, height: 64, borderRadius: 10,
            backgroundImage: `url(${stop.image_url})`,
            backgroundSize: 'cover', backgroundPosition: 'center',
            flexShrink: 0,
          }} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            {stop.arrival}–{stop.departure} · Stopp {idx}
          </div>
          <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginTop: 2 }}>
            {stop.name}
          </div>
          {stop.island && (
            <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
              {stop.island}
            </div>
          )}
          {stop.description && (
            <div style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 6, lineHeight: 1.5 }}>
              {stop.description.length > 130 ? stop.description.slice(0, 130) + '…' : stop.description}
            </div>
          )}
          {stop.booking_url && (
            <a
              href={stop.booking_url}
              target="_blank"
              rel="noopener"
              style={{
                display: 'inline-block', marginTop: 10,
                padding: '6px 14px', borderRadius: 16,
                background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
                fontSize: 12, fontWeight: 700, textDecoration: 'none',
              }}
            >
              Boka bord →
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

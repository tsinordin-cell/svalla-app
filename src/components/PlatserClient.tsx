'use client'
import { useState, useMemo, useEffect, useRef, useCallback, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import type { Restaurant } from '@/lib/supabase'
import type { TourLine } from '@/app/platser/page'

// ── Leaflet karta (lazy-load, SSR off) ──────────────────────────────────────
const PlatserMap = dynamic(() => import('./PlatserMap'), { ssr: false, loading: () => (
  <div style={{ width: '100%', height: '100%', background: '#d4e8f0', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <span style={{ fontSize: 13, color: '#7a9dab' }}>Laddar karta…</span>
  </div>
)})

// ── Kategorier ────────────────────────────────────────────────────────────
const FILTERS = [
  { value: 'alla',       label: 'Alla' },
  { value: 'restaurang', label: '🍽 Restaurang' },
  { value: 'kafe',       label: '☕ Kafé' },
  { value: 'hamn',       label: '⚓ Hamn' },
]

function getCat(r: Restaurant): string {
  // Använd type-fältet i första hand
  const t = (r.type ?? '').toLowerCase()
  if (t === 'cafe') return 'kafe'
  if (t === 'bar' || t === 'restaurant') return 'restaurang'
  if (t === 'accommodation' || t === 'fuel') return 'hamn'
  // Fallback: textmatchning
  const d = (r.description ?? '').toLowerCase() + (r.name ?? '').toLowerCase()
  if (d.includes('kafé') || d.includes('café') || d.includes('fika') || d.includes('bak')) return 'kafe'
  if (d.includes('hamn') || d.includes('brygga') || d.includes('gästhamn')) return 'hamn'
  return 'restaurang'
}

const TRENDING = ['Sandhamn', 'Möja', 'Grinda', 'Utö', 'Vaxholm', 'Arholma']

// ── Väder-widget ────────────────────────────────────────────────────────────
interface Weather {
  temp: number
  code: number
  windSpeed: number
  windDir: number
}

const WMO: Record<number, { label: string; emoji: string }> = {
  0:  { label: 'Klart',          emoji: '☀️' },
  1:  { label: 'Mest klart',     emoji: '🌤' },
  2:  { label: 'Delvis molnigt', emoji: '⛅' },
  3:  { label: 'Mulet',          emoji: '☁️' },
  45: { label: 'Dimma',          emoji: '🌫' },
  48: { label: 'Dimma',          emoji: '🌫' },
  51: { label: 'Duggregn',       emoji: '🌦' },
  53: { label: 'Duggregn',       emoji: '🌦' },
  61: { label: 'Regn',           emoji: '🌧' },
  63: { label: 'Kraftigt regn',  emoji: '🌧' },
  71: { label: 'Snö',            emoji: '🌨' },
  80: { label: 'Regnskurar',     emoji: '🌦' },
  81: { label: 'Regnskurar',     emoji: '🌦' },
  95: { label: 'Åska',           emoji: '⛈' },
}

function wmoLabel(code: number) {
  const base = WMO[code] ?? WMO[Math.floor(code / 10) * 10] ?? { label: 'Okänt', emoji: '🌡' }
  return base
}

function windDirStr(deg: number): string {
  const dirs = ['N','NO','Ö','SO','S','SV','V','NV']
  return dirs[Math.round(deg / 45) % 8]
}

function getSeason(): string {
  const m = new Date().getMonth() + 1
  if (m >= 3 && m <= 5) return 'VÅRSKÄRGÅRD'
  if (m >= 6 && m <= 8) return 'SOMMARSKÄRGÅRD'
  if (m >= 9 && m <= 11) return 'HÖSTSKÄRGÅRD'
  return 'VINTERSKÄRGÅRD'
}

// Enkel omvänd geokodning — returnerar område-namn baserat på koordinater
function getAreaName(lat: number, lng: number): string {
  // Stockholms skärgård — grovt indelad
  if (lat > 59.9)  return 'Norra skärgården'
  if (lat > 59.55) {
    if (lng < 18.5) return 'Vaxholm'
    if (lng < 19.0) return 'Mellersta skärgården'
    return 'Ytterskärgård'
  }
  if (lat > 59.2) {
    if (lng < 18.3) return 'Stockholm'
    if (lng < 18.8) return 'Värmdö'
    return 'Sandhamn'
  }
  if (lat > 58.9) return 'Södra skärgården'
  return 'Skärgården'
}

// ms → knop (1 m/s = 1.944 knop)
function msToKnots(ms: number): number {
  return Math.round(ms * 1.944 * 10) / 10
}

function WeatherWidget({ lat, lng }: { lat: number; lng: number }) {
  const [weather, setWeather] = useState<Weather | null>(null)
  const [loading, setLoading] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const lastFetch = useRef<string>('')

  useEffect(() => {
    // Debounce 600ms — uppdatera vid zoom/pan
    const key = `${lat.toFixed(2)},${lng.toFixed(2)}`
    if (key === lastFetch.current) return
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(async () => {
      lastFetch.current = key
      setLoading(true)
      try {
        const res = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${lat.toFixed(4)}&longitude=${lng.toFixed(4)}&current=temperature_2m,weather_code,wind_speed_10m,wind_direction_10m&wind_speed_unit=ms&timezone=auto`
        )
        const json = await res.json()
        const c = json.current
        setWeather({
          temp: Math.round(c.temperature_2m),
          code: c.weather_code,
          windSpeed: Math.round(c.wind_speed_10m * 10) / 10,
          windDir: c.wind_direction_10m,
        })
      } catch { /* tyst fel */ }
      finally { setLoading(false) }
    }, 600)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [lat, lng])

  const { emoji } = weather ? wmoLabel(weather.code) : { emoji: '🌡' }
  const areaName = getAreaName(lat, lng)
  const kn = weather ? msToKnots(weather.windSpeed) : null

  return (
    <div style={{
      position: 'absolute', top: 10, right: 10, zIndex: 1100,
      background: 'rgba(250,254,255,0.95)', backdropFilter: 'blur(12px)',
      borderRadius: 22, padding: '6px 12px 6px 9px',
      boxShadow: '0 2px 12px rgba(0,45,60,0.15)',
      display: 'flex', alignItems: 'center', gap: 6,
      border: '1px solid rgba(10,123,140,0.12)',
      transition: 'opacity 0.3s',
      opacity: loading ? 0.6 : 1,
      pointerEvents: 'none',
    }}>
      <span style={{ fontSize: 15, lineHeight: 1 }}>{emoji}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          {weather ? (
            <>
              <span style={{ fontSize: 14, fontWeight: 900, color: '#1e5c82', lineHeight: 1 }}>{weather.temp}°</span>
              <span style={{ fontSize: 11, color: '#5a8090', fontWeight: 700, lineHeight: 1 }}>
                · 💨 {kn} kn {windDirStr(weather.windDir)}
              </span>
            </>
          ) : (
            <span style={{ fontSize: 11, color: '#7a9dab' }}>Hämtar väder…</span>
          )}
        </div>
        <span style={{ fontSize: 9, color: '#7a9dab', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.3px' }}>
          📍 {areaName}
        </span>
      </div>
    </div>
  )
}

// ── Main inner component ───────────────────────────────────────────────────
function PlatserInner({ restaurants, tours }: { restaurants: Restaurant[]; tours: TourLine[] }) {
  const searchParams = useSearchParams()
  const [query, setQuery]         = useState(searchParams.get('q') ?? '')
  const [filter, setFilter]       = useState('alla')
  // Deep link: ?id=xxx öppnar direkt den platsen
  const [activeId, setActiveId]   = useState<string | null>(searchParams.get('id'))
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isDesktop, setIsDesktop] = useState(false)
  // Deep link: ?lat=xx&lng=xx sätter startpositionen
  const initLat = searchParams.get('lat') ? parseFloat(searchParams.get('lat')!) : 59.35
  const initLng = searchParams.get('lng') ? parseFloat(searchParams.get('lng')!) : 18.7
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({ lat: initLat, lng: initLng })
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({})

  // Detect desktop
  useEffect(() => {
    function check() { setIsDesktop(window.innerWidth >= 768) }
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    return restaurants.filter(r => {
      const matchF = filter === 'alla' || getCat(r) === filter
      const matchQ = !q || r.name.toLowerCase().includes(q) || (r.description ?? '').toLowerCase().includes(q)
      return matchF && matchQ
    })
  }, [restaurants, query, filter])

  const featured = restaurants[0] ?? null

  function handleMarkerClick(id: string) {
    setActiveId(id)
    const el = cardRefs.current[id]
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
  }

  const handleMapMove = useCallback((lat: number, lng: number) => {
    setMapCenter({ lat, lng })
  }, [])

  // ── Desktop layout ──────────────────────────────────────────────────────
  if (isDesktop) {
    return (
      <div style={{ display: 'flex', height: 'calc(100dvh - 56px)', overflow: 'hidden', position: 'relative' }}>

        {/* MAP AREA */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
          <PlatserMap
            restaurants={filtered}
            tours={tours}
            activeId={activeId}
            onMarkerClick={handleMarkerClick}
            onMapMove={handleMapMove}
          />

          {/* Väder-widget */}
          <WeatherWidget lat={mapCenter.lat} lng={mapCenter.lng} />

          {/* Legenda */}
          <div style={{
            position: 'absolute', bottom: 12, left: 12, zIndex: 500,
            background: 'rgba(250,254,255,0.92)', backdropFilter: 'blur(8px)',
            borderRadius: 12, padding: '5px 10px',
            display: 'flex', gap: 10, alignItems: 'center',
            boxShadow: '0 2px 8px rgba(0,45,60,0.12)',
            fontSize: 10, fontWeight: 700,
          }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#1e5c82', display: 'inline-block' }} /> Restaurang
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#c96e2a', display: 'inline-block' }} /> Hamn/Kafé
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <span style={{ width: 20, height: 3, background: '#0f9e64', display: 'inline-block', borderRadius: 2 }} /> Rutt
            </span>
          </div>

          {/* Sidebar-toggle (på kartkanten) */}
          <button
            onClick={() => setSidebarOpen(o => !o)}
            style={{
              position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)',
              zIndex: 600, width: 24, height: 56,
              background: 'rgba(250,254,255,0.95)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(10,123,140,0.15)',
              borderRight: 'none', borderRadius: '10px 0 0 10px',
              cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '-2px 0 10px rgba(0,45,60,0.10)',
              color: '#1e5c82', fontSize: 12, fontWeight: 700,
            }}
            title={sidebarOpen ? 'Dölj lista' : 'Visa lista'}
          >
            {sidebarOpen ? '›' : '‹'}
          </button>
        </div>

        {/* SIDEBAR */}
        <div style={{
          width: sidebarOpen ? 380 : 0,
          flexShrink: 0,
          overflow: 'hidden',
          transition: 'width 0.28s cubic-bezier(0.4,0,0.2,1)',
          borderLeft: '1px solid rgba(10,123,140,0.10)',
          background: '#f2f8fa',
          display: 'flex', flexDirection: 'column',
        }}>
          <div style={{ width: 380, height: '100%', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Sidebar header */}
            <div style={{
              padding: '14px 16px 10px',
              background: 'rgba(250,254,255,0.97)',
              borderBottom: '1px solid rgba(10,123,140,0.09)',
              flexShrink: 0,
            }}>
              {/* Sökfält */}
              <div style={{ position: 'relative', marginBottom: 10 }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#7a9dab" strokeWidth={2}
                  style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 15, height: 15, pointerEvents: 'none' }}>
                  <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                </svg>
                <input
                  type="text"
                  placeholder="Sök ö, krog eller matstil…"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  style={{
                    width: '100%', paddingLeft: 32, paddingRight: 12, paddingTop: 9, paddingBottom: 9,
                    borderRadius: 12, border: '1.5px solid rgba(10,123,140,0.15)',
                    background: '#f2f8fa', fontSize: 16, color: '#162d3a', outline: 'none',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              {/* Filter-chips */}
              <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
                {FILTERS.map(f => (
                  <button key={f.value} onClick={() => setFilter(f.value)} style={{
                    flexShrink: 0, padding: '5px 12px', borderRadius: 18, border: 'none', cursor: 'pointer',
                    fontWeight: 700, fontSize: 11,
                    background: filter === f.value ? '#1e5c82' : '#fff',
                    color: filter === f.value ? '#fff' : '#3a6a80',
                    boxShadow: filter === f.value ? '0 2px 8px rgba(30,92,130,0.3)' : '0 1px 4px rgba(0,45,60,0.08)',
                  }}>
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollbar lista */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '12px 12px 24px' }}>

              {/* Veckans favorit */}
              {featured && filter === 'alla' && !query && (
                <Link href={`/platser/${featured.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
                  <div style={{
                    borderRadius: 16, overflow: 'hidden',
                    background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                    boxShadow: '0 3px 14px rgba(30,92,130,0.25)',
                    position: 'relative',
                  }}>
                    {featured.images?.[0] && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={featured.images[0]} alt={featured.name} style={{
                        width: '100%', height: 110, objectFit: 'cover', display: 'block', opacity: 0.4,
                      }} />
                    )}
                    <div style={{
                      position: featured.images?.[0] ? 'absolute' : 'relative',
                      inset: 0, padding: '12px 14px',
                      display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                    }}>
                      <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 3 }}>
                        ⚓ Veckans favorit
                      </div>
                      <div style={{ fontSize: 16, fontWeight: 900, color: '#fff' }}>{featured.name}</div>
                      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', marginTop: 1 }}>{featured.opening_hours ?? 'Öppettider varierar'}</div>
                    </div>
                  </div>
                </Link>
              )}

              {/* Trending */}
              {filter === 'alla' && !query && (
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 9, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>
                    Trending
                  </div>
                  <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                    {TRENDING.map(t => (
                      <button key={t} onClick={() => setQuery(t)} style={{
                        padding: '5px 11px', borderRadius: 18, border: 'none', cursor: 'pointer',
                        background: '#fff', fontSize: 11, fontWeight: 600, color: '#1e5c82',
                        boxShadow: '0 1px 4px rgba(0,45,60,0.10)',
                      }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Antal */}
              <div style={{ fontSize: 10, color: '#7a9dab', fontWeight: 700, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.4px' }}>
                ⚓ KROGAR I SKÄRGÅRDEN · {filtered.length}
              </div>

              {/* Restaurangkort */}
              {filtered.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ fontSize: 40, marginBottom: 10 }}>🏝</div>
                  <p style={{ color: '#7a9dab', fontSize: 13 }}>Inga platser matchar sökningen.</p>
                  <button onClick={() => { setQuery(''); setFilter('alla') }} style={{
                    marginTop: 10, padding: '8px 18px', borderRadius: 12, border: 'none',
                    background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer',
                  }}>Rensa filter</button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {filtered.map(r => (
                    <div key={r.id} ref={el => { cardRefs.current[r.id] = el }}>
                      <Link href={`/platser/${r.id}`} style={{ textDecoration: 'none' }}>
                        <article
                          onMouseEnter={() => setActiveId(r.id)}
                          onMouseLeave={() => setActiveId(null)}
                          style={{
                            background: '#fff', borderRadius: 16, overflow: 'hidden',
                            boxShadow: activeId === r.id
                              ? '0 0 0 2px #1e5c82, 0 4px 16px rgba(30,92,130,0.18)'
                              : '0 1px 6px rgba(0,45,60,0.07)',
                            border: activeId === r.id ? '1px solid #1e5c82' : '1px solid rgba(10,123,140,0.07)',
                            display: 'flex', transition: 'box-shadow 0.15s',
                          }}>
                          <div style={{ width: 88, flexShrink: 0, background: '#a8ccd4' }}>
                            {r.images?.[0]
                              // eslint-disable-next-line @next/next/no-img-element
                              ? <img src={r.images[0]} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                              : <div style={{ width: '100%', height: '100%', minHeight: 72, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2, background: getCat(r) === 'kafe' ? 'linear-gradient(135deg,#7c4d1e,#a06b30)' : getCat(r) === 'hamn' ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)' }}>
                                <span style={{ fontSize: 20 }}>{getCat(r) === 'kafe' ? '☕' : getCat(r) === 'hamn' ? '⚓' : '🍽'}</span>
                                <span style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.3px' }}>{r.name[0]}</span>
                              </div>
                            }
                          </div>
                          <div style={{ flex: 1, padding: '10px 12px', minWidth: 0 }}>
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 4 }}>
                              <div style={{ fontSize: 13, fontWeight: 800, color: '#162d3a', lineHeight: 1.2 }}>{r.name}</div>
                              <span style={{
                                flexShrink: 0, fontSize: 10, fontWeight: 700, padding: '2px 7px', borderRadius: 18,
                                background: getCat(r) === 'kafe' ? 'rgba(201,110,42,0.1)' : 'rgba(30,92,130,0.08)',
                                color: getCat(r) === 'kafe' ? '#c96e2a' : '#1e5c82',
                              }}>
                                {getCat(r) === 'kafe' ? '☕' : getCat(r) === 'hamn' ? '⚓' : '🍽'}
                              </span>
                            </div>
                            {r.opening_hours && (
                              <div style={{ fontSize: 10, color: '#7a9dab', marginTop: 2 }}>🕐 {r.opening_hours}</div>
                            )}
                            {r.description && (
                              <div style={{
                                fontSize: 11, color: '#5a8090', marginTop: 4, lineHeight: 1.4,
                                overflow: 'hidden', display: '-webkit-box',
                                WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                              }}>
                                {r.description}
                              </div>
                            )}
                          </div>
                        </article>
                      </Link>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  // ── Mobile layout ──────────────────────────────────────────────────────
  const mapHeight = 'min(52vw, 280px)'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100dvh - 56px)', overflow: 'hidden' }}>

      {/* Top bar */}
      <div style={{
        padding: '10px 12px 8px',
        background: 'rgba(250,254,255,0.97)',
        borderBottom: '1px solid rgba(10,123,140,0.09)',
        display: 'flex', gap: 8, alignItems: 'center',
        flexShrink: 0,
      }}>
        <div style={{ flex: 1, position: 'relative' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="#7a9dab" strokeWidth={2}
            style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, pointerEvents: 'none' }}>
            <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Sök ö, krog eller matstil…"
            value={query}
            onChange={e => setQuery(e.target.value)}
            style={{
              width: '100%', paddingLeft: 34, paddingRight: 12, paddingTop: 10, paddingBottom: 10,
              borderRadius: 14, border: '1.5px solid rgba(10,123,140,0.15)',
              background: '#f2f8fa', fontSize: 16, color: '#162d3a', outline: 'none',
            }}
          />
        </div>
      </div>

      {/* Karta */}
      <div style={{ height: mapHeight, flexShrink: 0, position: 'relative' }}>
        <PlatserMap
          restaurants={filtered}
          tours={tours}
          activeId={activeId}
          onMarkerClick={handleMarkerClick}
          onMapMove={handleMapMove}
        />
        <WeatherWidget lat={mapCenter.lat} lng={mapCenter.lng} />
        <div style={{
          position: 'absolute', bottom: 8, left: 8, zIndex: 500,
          background: 'rgba(250,254,255,0.92)', backdropFilter: 'blur(8px)',
          borderRadius: 10, padding: '4px 8px',
          display: 'flex', gap: 8, alignItems: 'center',
          boxShadow: '0 2px 8px rgba(0,45,60,0.10)',
          fontSize: 9, fontWeight: 700,
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#1e5c82', display: 'inline-block' }} /> Restaurang
          </span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#c96e2a', display: 'inline-block' }} /> Hamn/Kafé
          </span>
        </div>
      </div>

      {/* Lista */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 12px 100px' }}>
        <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none', marginBottom: 10 }}>
          {FILTERS.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)} style={{
              flexShrink: 0, padding: '6px 12px', borderRadius: 18, border: 'none', cursor: 'pointer',
              fontWeight: 700, fontSize: 11,
              background: filter === f.value ? '#1e5c82' : '#fff',
              color: filter === f.value ? '#fff' : '#3a6a80',
              boxShadow: filter === f.value ? '0 2px 8px rgba(30,92,130,0.3)' : '0 1px 4px rgba(0,45,60,0.08)',
            }}>
              {f.label}
            </button>
          ))}
        </div>

        {featured && filter === 'alla' && !query && (
          <Link href={`/platser/${featured.id}`} style={{ textDecoration: 'none', display: 'block', marginBottom: 12 }}>
            <div style={{
              borderRadius: 16, overflow: 'hidden',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              boxShadow: '0 3px 14px rgba(30,92,130,0.25)',
              position: 'relative',
            }}>
              {featured.images?.[0] && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={featured.images[0]} alt={featured.name} style={{
                  width: '100%', height: 100, objectFit: 'cover', display: 'block', opacity: 0.4,
                }} />
              )}
              <div style={{
                position: featured.images?.[0] ? 'absolute' : 'relative',
                inset: 0, padding: '12px 14px',
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
              }}>
                <div style={{ fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 2 }}>
                  ⚓ Veckans favorit
                </div>
                <div style={{ fontSize: 15, fontWeight: 900, color: '#fff' }}>{featured.name}</div>
              </div>
            </div>
          </Link>
        )}

        {filter === 'alla' && !query && (
          <div style={{ marginBottom: 10 }}>
            <div style={{ fontSize: 9, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: 6 }}>Trending</div>
            <div style={{ display: 'flex', gap: 5, overflowX: 'auto', scrollbarWidth: 'none' }}>
              {TRENDING.map(t => (
                <button key={t} onClick={() => setQuery(t)} style={{
                  flexShrink: 0, padding: '5px 10px', borderRadius: 18, border: 'none', cursor: 'pointer',
                  background: '#fff', fontSize: 11, fontWeight: 600, color: '#1e5c82',
                  boxShadow: '0 1px 4px rgba(0,45,60,0.10)',
                }}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        <div style={{ fontSize: 10, color: '#7a9dab', fontWeight: 600, marginBottom: 8 }}>
          {filtered.length} platser {query ? `för "${query}"` : 'i skärgården'}
        </div>

        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px' }}>
            <div style={{ fontSize: 40, marginBottom: 10 }}>🏝</div>
            <p style={{ color: '#7a9dab', fontSize: 13 }}>Inga platser matchar.</p>
            <button onClick={() => { setQuery(''); setFilter('alla') }} style={{
              marginTop: 10, padding: '8px 18px', borderRadius: 12, border: 'none',
              background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer',
            }}>Rensa filter</button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            {filtered.map(r => (
              <div key={r.id} ref={el => { cardRefs.current[r.id] = el }}>
                <Link href={`/platser/${r.id}`} style={{ textDecoration: 'none' }}>
                  <article style={{
                    background: '#fff', borderRadius: 16, overflow: 'hidden',
                    boxShadow: activeId === r.id ? '0 0 0 2px #1e5c82' : '0 2px 8px rgba(0,45,60,0.07)',
                    border: activeId === r.id ? '1px solid #1e5c82' : '1px solid rgba(10,123,140,0.08)',
                    display: 'flex',
                  }}>
                    <div style={{ width: 90, flexShrink: 0, background: '#a8ccd4' }}>
                      {r.images?.[0]
                        // eslint-disable-next-line @next/next/no-img-element
                        ? <img src={r.images[0]} alt={r.name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                        : <div style={{ width: '100%', height: '100%', minHeight: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>🍽</div>
                      }
                    </div>
                    <div style={{ flex: 1, padding: '11px 13px', minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 800, color: '#162d3a' }}>{r.name}</div>
                      {r.opening_hours && <div style={{ fontSize: 10, color: '#7a9dab', marginTop: 2 }}>🕐 {r.opening_hours}</div>}
                      {r.description && (
                        <div style={{
                          fontSize: 11, color: '#5a8090', marginTop: 4, lineHeight: 1.4,
                          overflow: 'hidden', display: '-webkit-box',
                          WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                        }}>
                          {r.description}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function PlatserClient({ restaurants, tours = [] }: { restaurants: Restaurant[]; tours?: TourLine[] }) {
  return (
    <Suspense>
      <PlatserInner restaurants={restaurants} tours={tours} />
    </Suspense>
  )
}

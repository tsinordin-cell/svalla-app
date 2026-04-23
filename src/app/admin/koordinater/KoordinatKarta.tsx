'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase'

type Place = {
  id: string
  name: string
  island?: string | null
  latitude?: number | null
  longitude?: number | null
  type?: string | null
}

type SaveState = 'idle' | 'saving' | 'saved' | 'error'
type AutoFixState = 'idle' | 'running' | 'done' | 'error' | 'no_key'

// Skärgårdscentrum — Stockholms skärgård
const DEFAULT_CENTER: [number, number] = [59.35, 18.85]
const DEFAULT_ZOOM = 9

export default function KoordinatKarta({ places }: { places: Place[] }) {
  const mapRef      = useRef<HTMLDivElement>(null)
  const mapInstance = useRef<import('leaflet').Map | null>(null)
  const markersRef  = useRef<Map<string, import('leaflet').Marker>>(new Map())
  const LRef        = useRef<typeof import('leaflet') | null>(null)

  const [selected, setSelected]     = useState<Place | null>(null)
  const [editLat, setEditLat]       = useState('')
  const [editLng, setEditLng]       = useState('')
  const [saveState, setSaveState]   = useState<SaveState>('idle')
  const [savedIds, setSavedIds]     = useState<Set<string>>(new Set())
  const [filter, setFilter]         = useState<'all' | 'missing' | 'changed'>('all')
  const [search, setSearch]         = useState('')
  const [localPlaces, setLocalPlaces] = useState<Place[]>(places)
  const [autoFixState, setAutoFixState] = useState<AutoFixState>('idle')
  const [autoFixResult, setAutoFixResult] = useState<{fixed: number; cantFix: number; noCoords: number; total: number} | null>(null)

  // ── Initiering av karta ──────────────────────────────────────────
  useEffect(() => {
    if (!mapRef.current || mapInstance.current) return

    import('leaflet').then(L => {
      LRef.current = L
      import('leaflet/dist/leaflet.css')

      // Fixa default ikon-paths
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconUrl:       'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        shadowUrl:     'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const map = L.map(mapRef.current!, {
        center: DEFAULT_CENTER,
        zoom: DEFAULT_ZOOM,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
        maxZoom: 19,
      }).addTo(map)

      // Sjökort-overlay (OpenSeaMap)
      L.tileLayer('https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png', {
        maxZoom: 18, opacity: 0.85, crossOrigin: '',
      }).addTo(map)

      mapInstance.current = map
      renderMarkers(L, map, places)
    })

    return () => {
      mapInstance.current?.remove()
      mapInstance.current = null
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ── Ikoner ──────────────────────────────────────────────────────
  function makeIcon(L: typeof import('leaflet'), color: string, size = 28) {
    return L.divIcon({
      html: `<div style="
        width:${size}px; height:${size}px;
        background:${color};
        border:3px solid white;
        border-radius:50% 50% 50% 0;
        transform:rotate(-45deg);
        box-shadow:0 2px 6px rgba(0,0,0,0.4);
      "></div>`,
      className: '',
      iconSize:   [size, size],
      iconAnchor: [size/2, size],
      popupAnchor:[0, -size],
    })
  }

  // ── Rendera alla markers ─────────────────────────────────────────
  const renderMarkers = useCallback((
    L: typeof import('leaflet'),
    map: import('leaflet').Map,
    ps: Place[]
  ) => {
    // Rensa gamla
    markersRef.current.forEach(m => m.remove())
    markersRef.current.clear()

    ps.forEach(p => {
      const hasMissing = !p.latitude || !p.longitude
      const color = hasMissing ? '#ef4444' : '#2563eb'

      if (hasMissing) return // kan inte placera marker utan koordinater

      const marker = L.marker([p.latitude!, p.longitude!], {
        draggable: true,
        icon: makeIcon(L, color),
        title: p.name,
      })

      marker.bindTooltip(`<b>${p.name}</b><br>${p.island ?? ''}<br><small>${p.latitude?.toFixed(5)}, ${p.longitude?.toFixed(5)}</small>`, {
        direction: 'top',
        offset: [0, -20],
      })

      // Klick → välj plats
      marker.on('click', () => {
        selectPlace(p)
      })

      // Drag → uppdatera koordinat-inputs i realtid
      marker.on('drag', (e: any) => {
        const ll = e.target.getLatLng()
        setEditLat(ll.lat.toFixed(6))
        setEditLng(ll.lng.toFixed(6))
        // Uppdatera tooltip live
        marker.setTooltipContent(
          `<b>${p.name}</b><br>${p.island ?? ''}<br><small>${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}</small>`
        )
      })

      // Dragslut → bekräfta nya koordinater
      marker.on('dragend', (e: any) => {
        const ll = e.target.getLatLng()
        setEditLat(ll.lat.toFixed(6))
        setEditLng(ll.lng.toFixed(6))
        setSelected(prev => prev?.id === p.id
          ? { ...prev, latitude: ll.lat, longitude: ll.lng }
          : prev
        )
        setSaveState('idle')
      })

      marker.addTo(map)
      markersRef.current.set(p.id, marker)
    })
  }, [])

  // ── Välj plats ───────────────────────────────────────────────────
  function selectPlace(p: Place) {
    setSelected(p)
    setEditLat(p.latitude?.toFixed(6) ?? '')
    setEditLng(p.longitude?.toFixed(6) ?? '')
    setSaveState('idle')

    // Zooma kartan
    if (mapInstance.current && p.latitude && p.longitude) {
      mapInstance.current.flyTo([p.latitude, p.longitude], 14, { duration: 0.8 })
    }
  }

  // ── Spara koordinater ────────────────────────────────────────────
  async function handleSave() {
    if (!selected) return
    const lat = parseFloat(editLat)
    const lng = parseFloat(editLng)
    if (isNaN(lat) || isNaN(lng)) return

    setSaveState('saving')
    const supabase = createClient()
    const { error } = await supabase
      .from('restaurants')
      .update({ latitude: lat, longitude: lng })
      .eq('id', selected.id)

    if (error) {
      setSaveState('error')
      return
    }

    // Uppdatera lokal state
    setLocalPlaces(prev => prev.map(p =>
      p.id === selected.id ? { ...p, latitude: lat, longitude: lng } : p
    ))
    setSavedIds(prev => new Set([...prev, selected.id]))
    setSaveState('saved')

    // Flytta marker i kartan
    const marker = markersRef.current.get(selected.id)
    if (marker && LRef.current) {
      marker.setLatLng([lat, lng])
      marker.setIcon(makeIcon(LRef.current, '#16a34a', 28)) // grön = sparad
      marker.setTooltipContent(
        `<b>${selected.name}</b><br>${selected.island ?? ''}<br><small>${lat.toFixed(5)}, ${lng.toFixed(5)}</small>`
      )
    }

    setTimeout(() => setSaveState('idle'), 2000)
  }

  // ── Auto-fix via API ─────────────────────────────────────────────
  async function handleAutoFix() {
    if (!confirm('Kör automatisk koordinatfix för alla platser i vatten? Tar ~5 min.')) return
    setAutoFixState('running')
    setAutoFixResult(null)
    try {
      const res = await fetch('/api/admin/geocode-fix', { method: 'POST' })
      const data = await res.json()
      if (!res.ok) {
        if (data.error?.includes('SERVICE_ROLE_KEY')) {
          setAutoFixState('no_key')
        } else {
          setAutoFixState('error')
        }
        return
      }
      setAutoFixResult({ fixed: data.fixed, cantFix: data.cantFix, noCoords: data.noCoords, total: data.total })
      setAutoFixState('done')
      // Reload sidan för att visa uppdaterade koordinater
      setTimeout(() => window.location.reload(), 2000)
    } catch {
      setAutoFixState('error')
    }
  }

  // ── Filtrera platslista ──────────────────────────────────────────
  const filtered = localPlaces.filter(p => {
    const matchSearch = !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.island ?? '').toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false
    if (filter === 'missing') return !p.latitude || !p.longitude
    if (filter === 'changed') return savedIds.has(p.id)
    return true
  })

  const missingCount = localPlaces.filter(p => !p.latitude || !p.longitude).length

  // ── Render ───────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', height: '100dvh', fontFamily: 'system-ui, sans-serif', background: '#0d1b2a', color: '#e2e8f0' }}>

      {/* ── Sidopanel ── */}
      <div style={{
        width: 340, minWidth: 280, background: '#0f2236',
        borderRight: '1px solid #1e3a5f',
        display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* Header */}
        <div style={{ padding: '16px 16px 12px', borderBottom: '1px solid #1e3a5f' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
            <a href="/admin" style={{ color: '#64b5f6', fontSize: 12, textDecoration: 'none' }}>← Admin</a>
          </div>
          <h1 style={{ fontSize: 16, fontWeight: 700, color: '#90caf9', margin: '0 0 2px' }}>
            Koordinatkorrigering
          </h1>
          <p style={{ fontSize: 12, color: '#64748b', margin: '0 0 10px' }}>
            {localPlaces.length} platser · {missingCount} saknar koordinater · {savedIds.size} korrigerade idag
          </p>

          {/* Auto-fix knapp */}
          {autoFixState === 'no_key' ? (
            <div style={{ background: '#7f1d1d', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#fca5a5', lineHeight: 1.5 }}>
              <b>SUPABASE_SERVICE_ROLE_KEY saknas</b><br/>
              Lägg till i Vercel → Settings → Environment Variables → Redeploy
            </div>
          ) : autoFixState === 'done' && autoFixResult ? (
            <div style={{ background: '#14532d', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#86efac' }}>
              ✓ Klart! {autoFixResult.fixed} platser fixade · {autoFixResult.cantFix} kräver manuell hantering · Laddar om...
            </div>
          ) : autoFixState === 'error' ? (
            <div style={{ background: '#7f1d1d', borderRadius: 6, padding: '8px 10px', fontSize: 11, color: '#fca5a5' }}>
              Något gick fel. Försök igen eller kolla server-loggar.
            </div>
          ) : (
            <button
              onClick={handleAutoFix}
              disabled={autoFixState === 'running'}
              style={{
                width: '100%', padding: '8px 0', borderRadius: 6,
                border: 'none', cursor: autoFixState === 'running' ? 'wait' : 'pointer',
                background: autoFixState === 'running' ? '#1e3a5f' : '#1d4ed8',
                color: 'white', fontSize: 12, fontWeight: 600,
              }}
            >
              {autoFixState === 'running'
                ? '⏳ Kör auto-fix... (~5 min)'
                : '🤖 Kör automatisk fix av alla platser'}
            </button>
          )}
        </div>

        {/* Sök */}
        <div style={{ padding: '10px 12px 8px', borderBottom: '1px solid #1e3a5f' }}>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Sök plats eller ö..."
            style={{
              width: '100%', boxSizing: 'border-box',
              background: '#0d1b2a', border: '1px solid #1e3a5f',
              borderRadius: 6, padding: '7px 10px',
              color: '#e2e8f0', fontSize: 13,
              outline: 'none',
            }}
          />
        </div>

        {/* Filter-knappar */}
        <div style={{ display: 'flex', padding: '8px 12px', gap: 6, borderBottom: '1px solid #1e3a5f' }}>
          {([
            ['all',     `Alla (${localPlaces.length})`],
            ['missing', `Saknar (${missingCount})`],
            ['changed', `Ändrade (${savedIds.size})`],
          ] as const).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              style={{
                flex: 1, fontSize: 11, padding: '5px 4px',
                borderRadius: 5, border: 'none', cursor: 'pointer',
                background: filter === key ? '#1d4ed8' : '#1e3a5f',
                color: filter === key ? 'white' : '#94a3b8',
                fontWeight: filter === key ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Platslista */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {filtered.map(p => {
            const isSelected = selected?.id === p.id
            const isMissing  = !p.latitude || !p.longitude
            const isSaved    = savedIds.has(p.id)
            return (
              <div
                key={p.id}
                onClick={() => selectPlace(p)}
                style={{
                  padding: '10px 14px',
                  borderBottom: '1px solid #1a2f4a',
                  cursor: 'pointer',
                  background: isSelected ? '#1a3a5c' : 'transparent',
                  borderLeft: `3px solid ${isSaved ? '#16a34a' : isMissing ? '#ef4444' : isSelected ? '#2563eb' : 'transparent'}`,
                  transition: 'background 0.1s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: 13, fontWeight: 500, color: isSelected ? '#90caf9' : '#e2e8f0' }}>
                    {p.name}
                  </span>
                  {isMissing && <span style={{ fontSize: 10, background: '#7f1d1d', color: '#fca5a5', padding: '1px 5px', borderRadius: 3 }}>SAKNAR</span>}
                  {isSaved  && <span style={{ fontSize: 10, background: '#14532d', color: '#86efac', padding: '1px 5px', borderRadius: 3 }}>✓ SPARAD</span>}
                </div>
                <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>
                  {p.island ?? '—'} · {p.type ?? 'restaurant'}
                </div>
                {p.latitude && (
                  <div style={{ fontSize: 10, color: '#475569', marginTop: 1, fontFamily: 'monospace' }}>
                    {p.latitude.toFixed(4)}, {p.longitude?.toFixed(4)}
                  </div>
                )}
              </div>
            )
          })}
          {filtered.length === 0 && (
            <div style={{ padding: 24, textAlign: 'center', color: '#475569', fontSize: 13 }}>
              Inga platser matchar
            </div>
          )}
        </div>

        {/* Redigeringspanel — visas när en plats är vald */}
        {selected && (
          <div style={{
            padding: 14, borderTop: '1px solid #1e3a5f',
            background: '#091828',
          }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#90caf9', marginBottom: 10 }}>
              {selected.name}
              <span style={{ fontSize: 11, color: '#64748b', fontWeight: 400, marginLeft: 6 }}>
                {selected.island ?? ''}
              </span>
            </div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 10 }}>
              <label style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>LATITUD</div>
                <input
                  value={editLat}
                  onChange={e => {
                    setEditLat(e.target.value)
                    setSaveState('idle')
                    // Flytta marker live om giltig siffra
                    const lat = parseFloat(e.target.value)
                    const lng = parseFloat(editLng)
                    if (!isNaN(lat) && !isNaN(lng)) {
                      markersRef.current.get(selected.id)?.setLatLng([lat, lng])
                    }
                  }}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: '#0d1b2a', border: '1px solid #1e3a5f',
                    borderRadius: 5, padding: '6px 8px',
                    color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace',
                  }}
                />
              </label>
              <label style={{ flex: 1 }}>
                <div style={{ fontSize: 10, color: '#64748b', marginBottom: 3 }}>LONGITUD</div>
                <input
                  value={editLng}
                  onChange={e => {
                    setEditLng(e.target.value)
                    setSaveState('idle')
                    const lat = parseFloat(editLat)
                    const lng = parseFloat(e.target.value)
                    if (!isNaN(lat) && !isNaN(lng)) {
                      markersRef.current.get(selected.id)?.setLatLng([lat, lng])
                    }
                  }}
                  style={{
                    width: '100%', boxSizing: 'border-box',
                    background: '#0d1b2a', border: '1px solid #1e3a5f',
                    borderRadius: 5, padding: '6px 8px',
                    color: '#e2e8f0', fontSize: 12, fontFamily: 'monospace',
                  }}
                />
              </label>
            </div>

            <div style={{ fontSize: 11, color: '#475569', marginBottom: 10 }}>
              💡 Dra markören på kartan eller klistra in koordinater från Google Maps
            </div>

            <button
              onClick={handleSave}
              disabled={saveState === 'saving'}
              style={{
                width: '100%', padding: '9px 0',
                borderRadius: 6, border: 'none', cursor: saveState === 'saving' ? 'wait' : 'pointer',
                background: saveState === 'saved' ? '#16a34a' : saveState === 'error' ? '#dc2626' : '#1d4ed8',
                color: 'white', fontSize: 13, fontWeight: 600,
                transition: 'background 0.2s',
              }}
            >
              {saveState === 'saving' ? 'Sparar...'
               : saveState === 'saved' ? '✓ Sparat!'
               : saveState === 'error' ? '✗ Fel — försök igen'
               : 'Spara koordinater'}
            </button>

            <div style={{ marginTop: 8, fontSize: 11, color: '#475569', textAlign: 'center' }}>
              Ctrl+klick på kartan för att sätta ny position
            </div>
          </div>
        )}
      </div>

      {/* ── Karta ── */}
      <div style={{ flex: 1, position: 'relative' }}>
        <div ref={mapRef} style={{ width: '100%', height: '100%' }} />

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: 24, right: 16,
          background: 'rgba(9,24,40,0.92)', borderRadius: 8,
          padding: '10px 14px', fontSize: 11, color: '#94a3b8',
          backdropFilter: 'blur(4px)',
          border: '1px solid #1e3a5f',
          pointerEvents: 'none',
          zIndex: 1000,
        }}>
          <div style={{ marginBottom: 5, fontWeight: 600, color: '#90caf9' }}>Förklaring</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{ width:12, height:12, background:'#2563eb', borderRadius:'50%', border:'2px solid white' }}/>
            Korrekt position
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
            <div style={{ width:12, height:12, background:'#ef4444', borderRadius:'50%', border:'2px solid white' }}/>
            Misstänkt/saknas
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{ width:12, height:12, background:'#16a34a', borderRadius:'50%', border:'2px solid white' }}/>
            Sparad idag
          </div>
        </div>

        {/* Instruktioner overlay när inget är valt */}
        {!selected && (
          <div style={{
            position: 'absolute', top: 16, left: '50%', transform: 'translateX(-50%)',
            background: 'rgba(9,24,40,0.9)', borderRadius: 8,
            padding: '10px 20px', fontSize: 12, color: '#94a3b8',
            backdropFilter: 'blur(4px)', border: '1px solid #1e3a5f',
            pointerEvents: 'none', zIndex: 1000, whiteSpace: 'nowrap',
          }}>
            Välj en plats i listan → dra markören till rätt position → Spara
          </div>
        )}
      </div>
    </div>
  )
}

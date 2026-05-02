'use client'
import Icon from '@/components/Icon'
import { useState, useRef, useEffect, useCallback } from 'react'

type Place = {
  display_name: string
  name: string
  lat: string
  lon: string
}

interface Props {
  value: string
  onChange: (name: string, lat?: number, lon?: number) => void
  placeholder?: string
  required?: boolean
  autoFocus?: boolean
  label?: string
  icon?: string
}

export default function LocationSearch({
  value, onChange,
  placeholder = 'Sök plats…',
  required = false,
  autoFocus = false,
  label,
  icon = '',
}: Props) {
  const [query,       setQuery]       = useState(value)
  const [suggestions, setSuggestions] = useState<Place[]>([])
  const [open,        setOpen]        = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [selected,    setSelected]    = useState(!!value)
  const inputRef = useRef<HTMLInputElement>(null)
  const timer    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const listRef  = useRef<HTMLDivElement>(null)

  // Sync external value changes (e.g. prefill)
  useEffect(() => {
    if (value && value !== query) { setQuery(value); setSelected(true) }
  }, [value]) // eslint-disable-line

  // Close on outside click
  useEffect(() => {
    function handle(e: MouseEvent) {
      if (listRef.current && !listRef.current.contains(e.target as Node) &&
          inputRef.current && !inputRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handle)
    return () => document.removeEventListener('mousedown', handle)
  }, [])

  const search = useCallback(async (q: string) => {
    if (q.length < 2) { setSuggestions([]); setOpen(false); return }
    setLoading(true)
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&countrycodes=se,no,dk,fi,de,gb,nl,fr,es,it,pl,gr,hr,ee,lv,lt,is&limit=6&format=json&addressdetails=1&accept-language=sv`
      const res  = await fetch(url, { headers: { 'User-Agent': 'svalla.se/1.0' } })
      const data = await res.json() as Array<{
        display_name: string; name: string; lat: string; lon: string;
        address?: { city?: string; town?: string; village?: string; island?: string; county?: string; country?: string }
      }>

      const places: Place[] = data.map(p => {
        // Use the most human-friendly name: island > village > town > city
        const a = p.address ?? {}
        const localName = a.island ?? a.village ?? a.town ?? a.city ?? p.name
        const region = a.county ?? ''
        const country = a.country ?? ''
        const parts = [localName, region, country].filter(Boolean)
        return {
          display_name: parts.join(', '),
          name: localName,
          lat: p.lat,
          lon: p.lon,
        }
      })
      // Deduplicate by name
      const seen = new Set<string>()
      const unique = places.filter(p => { if (seen.has(p.name)) return false; seen.add(p.name); return true })
      setSuggestions(unique)
      setOpen(unique.length > 0)
    } catch {
      setSuggestions([])
    } finally {
      setLoading(false)
    }
  }, [])

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const q = e.target.value
    setQuery(q)
    setSelected(false)
    onChange(q) // propagate partial typing
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => search(q), 350)
  }

  function pick(p: Place) {
    setQuery(p.display_name)
    setSelected(true)
    setOpen(false)
    onChange(p.display_name, parseFloat(p.lat), parseFloat(p.lon))
    inputRef.current?.blur()
  }

  return (
    <div style={{ position: 'relative' }}>
      {label && (
        <label style={{
          fontSize: 10, fontWeight: 600, color: 'var(--txt2)',
          textTransform: 'uppercase', letterSpacing: '0.6px',
          display: 'block', marginBottom: 6,
        }}>
          {icon} {label} {required && '*'}
        </label>
      )}

      <div style={{ position: 'relative' }}>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInput}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          placeholder={placeholder}
          required={required}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus={autoFocus}
          autoComplete="off"
          style={{
            width: '100%', padding: '13px 40px 13px 14px',
            borderRadius: 14, boxSizing: 'border-box',
            border: `1.5px solid ${selected ? 'rgba(30,92,130,0.4)' : 'rgba(10,123,140,0.18)'}`,
            background: selected ? 'rgba(30,92,130,0.04)' : '#fff',
            fontSize: 16, fontWeight: 600, color: 'var(--txt)',
            outline: 'none', fontFamily: 'inherit',
            transition: 'border-color 0.15s, background 0.15s',
          }}
        />

        {/* Pin/spinner icon */}
        <div style={{
          position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
          pointerEvents: 'none', fontSize: 16,
          color: selected ? 'var(--sea)' : 'var(--txt3)',
        }}>
          {loading ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
              style={{ width: 16, height: 16, animation: 'spin 0.8s linear infinite' }}>
              <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          ) : selected ? 'checkmark' : 'search'}
        </div>
      </div>

      {/* Dropdown */}
      {open && suggestions.length > 0 && (
        <div
          ref={listRef}
          style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0,
            background: 'var(--white)', borderRadius: 14, zIndex: 200,
            boxShadow: '0 8px 32px rgba(0,30,50,0.16)',
            border: '1px solid rgba(10,123,140,0.12)',
            overflow: 'hidden',
          }}
        >
          {suggestions.map((p, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={() => pick(p)}
              style={{
                width: '100%', padding: '11px 14px',
                background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', fontFamily: 'inherit',
                borderBottom: i < suggestions.length - 1 ? '1px solid rgba(10,123,140,0.07)' : 'none',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <Icon name="pin" style={{ width: 14, height: 14, flexShrink: 0 }} />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt3)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {p.display_name}
                </div>
              </div>
            </button>
          ))}
          <div style={{ padding: '6px 14px', fontSize: 10, color: '#b0ccd8', borderTop: '1px solid rgba(10,123,140,0.06)', textAlign: 'right' }}>
            © OpenStreetMap
          </div>
        </div>
      )}
    </div>
  )
}

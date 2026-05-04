'use client'
/**
 * LoppisFilters — filter-rad ovanför grid på /forum/loppis.
 * URL-driven (searchParams) så filter kan delas/bookmarkas.
 *
 * - Kategori-chips: Alla, Båt, Motor, Tillbehör, Säkerhet, Övrigt
 * - Pris-range: Min – Max kr (tomt = ingen gräns)
 * - Plats: fritext (substring-match)
 * - "Rensa"-knapp om något filter är aktivt
 */
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

const CATEGORIES = ['Alla', 'Båt', 'Motor', 'Tillbehör', 'Säkerhet', 'Övrigt'] as const

interface Props {
  totalCount: number
  filteredCount: number
}

export default function LoppisFilters({ totalCount, filteredCount }: Props) {
  const router = useRouter()
  const sp = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentCat      = sp.get('cat') ?? 'Alla'
  const currentMinStr   = sp.get('priceMin') ?? ''
  const currentMaxStr   = sp.get('priceMax') ?? ''
  const currentLocation = sp.get('location') ?? ''

  const [minStr, setMinStr] = useState(currentMinStr)
  const [maxStr, setMaxStr] = useState(currentMaxStr)
  const [locStr, setLocStr] = useState(currentLocation)

  // Synka lokal state om URL ändras externt
  useEffect(() => { setMinStr(currentMinStr) }, [currentMinStr])
  useEffect(() => { setMaxStr(currentMaxStr) }, [currentMaxStr])
  useEffect(() => { setLocStr(currentLocation) }, [currentLocation])

  function pushParams(updates: Record<string, string | null>) {
    const next = new URLSearchParams(sp.toString())
    for (const [k, v] of Object.entries(updates)) {
      if (v === null || v === '') next.delete(k)
      else next.set(k, v)
    }
    const qs = next.toString()
    startTransition(() => {
      router.replace(qs ? `/forum/loppis?${qs}` : '/forum/loppis', { scroll: false })
    })
  }

  function setCategory(cat: string) {
    pushParams({ cat: cat === 'Alla' ? null : cat })
  }

  function applyPriceRange() {
    const sanitize = (s: string) => {
      const cleaned = s.replace(/[^0-9]/g, '')
      return cleaned === '' ? null : cleaned
    }
    pushParams({ priceMin: sanitize(minStr), priceMax: sanitize(maxStr) })
  }

  function applyLocation() {
    const trimmed = locStr.trim()
    pushParams({ location: trimmed === '' ? null : trimmed })
  }

  function clearAll() {
    setMinStr(''); setMaxStr(''); setLocStr('')
    startTransition(() => router.replace('/forum/loppis', { scroll: false }))
  }

  const hasFilters = currentCat !== 'Alla' || currentMinStr || currentMaxStr || currentLocation

  const fieldStyle: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '8px 11px',
    borderRadius: 9,
    border: '1px solid rgba(10,123,140,0.18)',
    background: 'var(--card-bg, #fff)',
    fontSize: 13, color: 'var(--txt)',
    fontFamily: 'inherit', outline: 'none',
  }

  return (
    <div style={{
      background: 'var(--card-bg, #fff)',
      border: '1px solid var(--border, rgba(10,123,140,0.10))',
      borderRadius: 14,
      padding: 14,
      marginBottom: 14,
      display: 'flex', flexDirection: 'column', gap: 12,
      opacity: isPending ? 0.7 : 1,
      transition: 'opacity 0.12s',
    }}>
      {/* Kategori-chips */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {CATEGORIES.map(c => {
          const isActive = currentCat === c
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              style={{
                padding: '7px 13px',
                borderRadius: 999,
                border: 'none',
                background: isActive ? 'var(--sea)' : 'rgba(10,123,140,0.08)',
                color: isActive ? '#fff' : 'var(--txt)',
                fontSize: 12.5, fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.12s, color 0.12s',
              }}
            >{c}</button>
          )
        })}
      </div>

      {/* Pris + plats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1.4fr',
        gap: 8,
      }}>
        <input
          type="text"
          inputMode="numeric"
          value={minStr}
          onChange={(e) => setMinStr(e.target.value.replace(/[^0-9 ]/g, ''))}
          onBlur={applyPriceRange}
          onKeyDown={(e) => { if (e.key === 'Enter') applyPriceRange() }}
          placeholder="Min kr"
          style={fieldStyle}
        />
        <input
          type="text"
          inputMode="numeric"
          value={maxStr}
          onChange={(e) => setMaxStr(e.target.value.replace(/[^0-9 ]/g, ''))}
          onBlur={applyPriceRange}
          onKeyDown={(e) => { if (e.key === 'Enter') applyPriceRange() }}
          placeholder="Max kr"
          style={fieldStyle}
        />
        <input
          type="text"
          value={locStr}
          onChange={(e) => setLocStr(e.target.value)}
          onBlur={applyLocation}
          onKeyDown={(e) => { if (e.key === 'Enter') applyLocation() }}
          placeholder="Plats (t.ex. Halmstad)"
          maxLength={80}
          style={fieldStyle}
        />
      </div>

      {/* Resultat-rad */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        fontSize: 12, color: 'var(--txt3)',
      }}>
        <span>
          {filteredCount === totalCount
            ? `${totalCount} annonser`
            : `${filteredCount} av ${totalCount} annonser`}
        </span>
        {hasFilters && (
          <button
            type="button"
            onClick={clearAll}
            style={{
              padding: '5px 11px',
              borderRadius: 999,
              border: '1px solid rgba(10,123,140,0.18)',
              background: 'transparent',
              color: 'var(--sea)',
              fontSize: 12, fontWeight: 600,
              cursor: 'pointer',
            }}
          >
            Rensa filter
          </button>
        )}
      </div>
    </div>
  )
}

'use client'
/**
 * LoppisFilters — filter-rad ovanför grid på /forum/loppis.
 *
 * - Kategori-chips: Alla, Båt, Motor, Tillbehör, Säkerhet, Övrigt
 * - Pris-range: Min – Max kr (tomt = ingen gräns)
 * - Plats: fritext (substring-match)
 * - "Rensa"-knapp om något filter är aktivt
 *
 * Styrd komponent (rester efter revisionen, 2026-10-07): filtret ägs av
 * LoppisGrid, som också håller URL:en i synk så att filter går att dela och
 * bokmärka. Tidigare läste den här komponenten useSearchParams() och
 * navigerade med router.replace — det tvingade hela kategorisidan att
 * renderas om vid varje besök (CLAUDE.md p27). Nu läser servern aldrig
 * query-strängen, och sidan kan cachas.
 */
import { useEffect, useState } from 'react'

const CATEGORIES = ['Alla', 'Båt', 'Motor', 'Tillbehör', 'Säkerhet', 'Övrigt'] as const

export type LoppisFilter = {
  cat: string | null
  priceMin: number | null
  priceMax: number | null
  location: string | null
}

export const TOMT_FILTER: LoppisFilter = { cat: null, priceMin: null, priceMax: null, location: null }

interface Props {
  filter: LoppisFilter
  onChange: (next: LoppisFilter) => void
  totalCount: number
  filteredCount: number
}

export default function LoppisFilters({ filter, onChange, totalCount, filteredCount }: Props) {
  const currentCat      = filter.cat ?? 'Alla'
  const currentMinStr   = filter.priceMin === null ? '' : String(filter.priceMin)
  const currentMaxStr   = filter.priceMax === null ? '' : String(filter.priceMax)
  const currentLocation = filter.location ?? ''

  const [minStr, setMinStr] = useState(currentMinStr)
  const [maxStr, setMaxStr] = useState(currentMaxStr)
  const [locStr, setLocStr] = useState(currentLocation)

  // Synka lokal state om filtret ändras utifrån (t.ex. läst från URL:en)
  useEffect(() => { setMinStr(currentMinStr) }, [currentMinStr])
  useEffect(() => { setMaxStr(currentMaxStr) }, [currentMaxStr])
  useEffect(() => { setLocStr(currentLocation) }, [currentLocation])

  function setCategory(cat: string) {
    onChange({ ...filter, cat: cat === 'Alla' ? null : cat })
  }

  function applyPriceRange() {
    const sanitize = (s: string) => {
      const cleaned = s.replace(/[^0-9]/g, '')
      return cleaned === '' ? null : Number(cleaned)
    }
    onChange({ ...filter, priceMin: sanitize(minStr), priceMax: sanitize(maxStr) })
  }

  function applyLocation() {
    const trimmed = locStr.trim()
    onChange({ ...filter, location: trimmed === '' ? null : trimmed })
  }

  function clearAll() {
    setMinStr(''); setMaxStr(''); setLocStr('')
    onChange(TOMT_FILTER)
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
              aria-pressed={isActive}
              style={{
                padding: '7px 13px',
                borderRadius: 999,
                border: 'none',
                background: isActive ? 'var(--sea-knapp, var(--sea))' : 'rgba(10,123,140,0.08)',
                color: isActive ? '#fff' : 'var(--txt)',
                fontSize: 12.5, fontWeight: 600,
                cursor: 'pointer',
                transition: 'background 0.12s, color 0.12s',
              }}
            >{c}</button>
          )
        })}
      </div>

      {/* Pris (sida vid sida) + plats (full bredd) — staplade på mobil */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          <input
            type="text"
            inputMode="numeric"
            value={minStr}
            onChange={(e) => setMinStr(e.target.value.replace(/[^0-9 ]/g, ''))}
            onBlur={applyPriceRange}
            onKeyDown={(e) => { if (e.key === 'Enter') applyPriceRange() }}
            placeholder="Min kr"
            aria-label="Lägsta pris i kronor"
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
            aria-label="Högsta pris i kronor"
            style={fieldStyle}
          />
        </div>
        <input
          type="text"
          value={locStr}
          onChange={(e) => setLocStr(e.target.value)}
          onBlur={applyLocation}
          onKeyDown={(e) => { if (e.key === 'Enter') applyLocation() }}
          placeholder="Plats (t.ex. Halmstad)"
          aria-label="Plats"
          maxLength={80}
          style={fieldStyle}
        />
      </div>

      {/* Resultat-rad */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 10,
        fontSize: 12, color: 'var(--txt3)',
      }}>
        <span aria-live="polite">
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

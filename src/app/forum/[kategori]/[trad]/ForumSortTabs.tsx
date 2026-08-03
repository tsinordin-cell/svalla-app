'use client'

import type { ForumSort } from '@/lib/forum'

const TABS: { id: ForumSort; label: string }[] = [
  { id: 'aldst',      label: 'Äldst först' },
  { id: 'nyast',      label: 'Nyast först' },
  { id: 'hjalpsamma', label: 'Mest hjälpsamma' },
]

interface Props {
  current: ForumSort
  onChange: (s: ForumSort) => void
}

/**
 * Controlled — föräldern (ForumPostList) äger sorteringen och ordnar om
 * lokalt. Tidigare navigerade tabbarna till ?sort=, vilket via searchParams
 * tvingade dynamisk serverrendering av hela tråden (se ForumPostList.tsx).
 * URL:en hålls i synk med replaceState så sorteringen går att dela.
 */
export default function ForumSortTabs({ current, onChange }: Props) {
  function setSort(s: ForumSort) {
    onChange(s)
    const params = new URLSearchParams(window.location.search)
    if (s === 'aldst') params.delete('sort')
    else params.set('sort', s)
    const query = params.toString()
    window.history.replaceState(null, '', query ? `${window.location.pathname}?${query}` : window.location.pathname)
  }

  return (
    <div style={{
      display: 'flex',
      gap: 4,
      padding: 4,
      background: 'rgba(10,123,140,0.05)',
      borderRadius: 10,
      border: '1px solid rgba(10,123,140,0.08)',
    }}>
      {TABS.map(t => {
        const active = t.id === current
        return (
          <button
            key={t.id}
            onClick={() => setSort(t.id)}
            style={{
              padding: '6px 12px',
              borderRadius: 8,
              border: 'none',
              background: active ? '#fff' : 'transparent',
              color: active ? 'var(--sea)' : 'var(--txt3)',
              fontSize: 12,
              fontWeight: active ? 700 : 600,
              cursor: 'pointer',
              transition: 'all 0.15s',
              boxShadow: active ? '0 1px 3px rgba(10,31,43,0.08)' : 'none',
              fontFamily: 'inherit',
              whiteSpace: 'nowrap',
            }}
          >
            {t.label}
          </button>
        )
      })}
    </div>
  )
}

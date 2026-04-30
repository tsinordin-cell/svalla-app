'use client'

import { useEffect, useRef, useState } from 'react'

export interface MentionUser {
  id: string
  username: string
  avatar: string | null
}

interface Props {
  query: string
  anchor: { top: number; left: number } | null
  onSelect: (user: MentionUser) => void
  onDismiss: () => void
}

const MIN_QUERY_LEN = 0  // 0 = visa snabbresultat när man bara skrivit @
const MAX_RESULTS = 6

export default function MentionAutocomplete({ query, anchor, onSelect, onDismiss }: Props) {
  const [users, setUsers] = useState<MentionUser[]>([])
  const [loading, setLoading] = useState(false)
  const [activeIdx, setActiveIdx] = useState(0)
  const abortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (query.length < MIN_QUERY_LEN) {
      setUsers([])
      return
    }
    abortRef.current?.abort()
    const ac = new AbortController()
    abortRef.current = ac
    setLoading(true)
    const t = setTimeout(async () => {
      try {
        const res = await fetch(`/api/forum/mention-search?q=${encodeURIComponent(query)}`, { signal: ac.signal })
        if (!res.ok) { setUsers([]); return }
        const data = await res.json()
        setUsers(Array.isArray(data.users) ? data.users.slice(0, MAX_RESULTS) : [])
        setActiveIdx(0)
      } catch (e) {
        if ((e as Error).name !== 'AbortError') setUsers([])
      } finally {
        setLoading(false)
      }
    }, 120)
    return () => { clearTimeout(t); ac.abort() }
  }, [query])

  // Tangentbordsnavigering
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (users.length === 0) return
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx(i => (i + 1) % users.length)
      } else if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx(i => (i - 1 + users.length) % users.length)
      } else if (e.key === 'Enter' || e.key === 'Tab') {
        e.preventDefault()
        const u = users[activeIdx]
        if (u) onSelect(u)
      } else if (e.key === 'Escape') {
        e.preventDefault()
        onDismiss()
      }
    }
    window.addEventListener('keydown', onKey, true)
    return () => window.removeEventListener('keydown', onKey, true)
  }, [users, activeIdx, onSelect, onDismiss])

  if (!anchor) return null
  if (users.length === 0 && !loading) return null

  return (
    <div
      role="listbox"
      style={{
        position: 'absolute',
        top: 4,
        left: 0,
        right: 0,
        marginTop: 0,
        background: 'var(--card-bg, #fff)',
        borderRadius: 12,
        border: '1px solid rgba(10,123,140,0.18)',
        boxShadow: '0 12px 32px rgba(10,31,43,0.18)',
        overflow: 'hidden',
        zIndex: 50,
        maxHeight: 280,
        overflowY: 'auto',
      }}
    >
      <div style={{
        padding: '6px 12px',
        fontSize: 10,
        fontWeight: 700,
        color: 'var(--txt3)',
        textTransform: 'uppercase',
        letterSpacing: '0.08em',
        borderBottom: '1px solid rgba(10,123,140,0.06)',
        background: 'rgba(10,123,140,0.03)',
      }}>
        {loading ? 'Söker…' : `Tagga ${users.length === 1 ? 'användare' : 'användare'}`}
      </div>
      {users.map((u, i) => (
        <button
          key={u.id}
          type="button"
          onMouseDown={e => { e.preventDefault(); onSelect(u) }}
          onMouseEnter={() => setActiveIdx(i)}
          role="option"
          aria-selected={i === activeIdx}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            padding: '8px 12px',
            width: '100%',
            border: 'none',
            background: i === activeIdx ? 'rgba(10,123,140,0.08)' : 'transparent',
            cursor: 'pointer',
            textAlign: 'left',
            fontFamily: 'inherit',
            transition: 'background 0.1s',
          }}
        >
          {u.avatar ? (
            <img src={u.avatar} alt="" width={28} height={28} style={{
              width: 28, height: 28, aspectRatio: '1 / 1',
              borderRadius: '50%', objectFit: 'cover', flexShrink: 0,
            }} />
          ) : (
            <div style={{
              width: 28, height: 28, aspectRatio: '1 / 1',
              borderRadius: '50%', background: 'var(--grad-sea)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12, fontWeight: 700, color: '#fff', flexShrink: 0,
            }}>
              {u.username[0]?.toUpperCase()}
            </div>
          )}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              @{u.username}
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}

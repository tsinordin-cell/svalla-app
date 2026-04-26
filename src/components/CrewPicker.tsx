'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import type { SupabaseClient } from '@supabase/supabase-js'
import { searchUsersForTag } from '@/lib/tripTags'
import { avatarGradient, initialsOf } from '@/lib/utils'

export type CrewUser = { id: string; username: string; avatar: string | null }

type Props = {
  supabase: SupabaseClient
  currentUserId: string
  selected: CrewUser[]
  onSelect: (u: CrewUser) => void
  onRemove: (id: string) => void
}

export default function CrewPicker({ supabase, currentUserId, selected, onSelect, onRemove }: Props) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<CrewUser[]>([])
  const [searching, setSearching] = useState(false)

  useEffect(() => {
    if (query.trim().length === 0) { setResults([]); return }
    const t = setTimeout(async () => {
      setSearching(true)
      const excludeIds = [currentUserId, ...selected.map(u => u.id)]
      const r = await searchUsersForTag(supabase, query.trim(), excludeIds)
      setResults(r)
      setSearching(false)
    }, 220)
    return () => clearTimeout(t)
  }, [query, supabase, currentUserId, selected])

  function pick(u: CrewUser) {
    onSelect(u)
    setQuery('')
    setResults([])
  }

  return (
    <div>
      {/* Selected chips */}
      {selected.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 10 }}>
          {selected.map(u => (
            <div key={u.id} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              padding: '4px 10px 4px 6px', borderRadius: 20,
              background: 'rgba(10,123,140,0.08)',
              border: '1px solid rgba(10,123,140,0.15)',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                background: avatarGradient(u.username),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 9, flexShrink: 0,
              }}>
                {u.avatar
                  ? <Image src={u.avatar} alt="" fill sizes="20px" style={{ objectFit: 'cover' }} />
                  : initialsOf(u.username)}
              </div>
              <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt)' }}>@{u.username}</span>
              <button
                type="button"
                onClick={() => onRemove(u.id)}
                aria-label={`Ta bort ${u.username}`}
                style={{ border: 'none', background: 'transparent', color: 'var(--txt3)', cursor: 'pointer', fontSize: 13, padding: 0, lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Search input */}
      <input
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Sök användarnamn…"
        style={{
          width: '100%', padding: '10px 14px', borderRadius: 14,
          border: '1.5px solid rgba(10,123,140,0.15)',
          background: 'var(--white)', fontSize: 14, color: 'var(--txt)',
          outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
        }}
      />

      {searching && (
        <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 6 }}>Söker…</div>
      )}

      {results.length > 0 && (
        <div style={{ marginTop: 6, border: '1px solid rgba(10,123,140,0.10)', borderRadius: 12, overflow: 'hidden' }}>
          {results.map(u => (
            <button
              key={u.id}
              type="button"
              onClick={() => pick(u)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                width: '100%', padding: '10px 14px',
                border: 'none', borderBottom: '1px solid rgba(10,123,140,0.06)',
                background: 'var(--white)', cursor: 'pointer', textAlign: 'left',
                fontFamily: 'inherit',
              }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                background: avatarGradient(u.username),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: '#fff', fontWeight: 700, fontSize: 12, flexShrink: 0,
              }}>
                {u.avatar
                  ? <Image src={u.avatar} alt="" fill sizes="32px" style={{ objectFit: 'cover' }} />
                  : initialsOf(u.username)}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>@{u.username}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

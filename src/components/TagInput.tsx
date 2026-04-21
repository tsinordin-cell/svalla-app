'use client'
import { useState, useRef, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import Image from 'next/image'

type UserHit = { id: string; username: string; avatar: string | null }

interface Props {
  tagged: UserHit[]
  onChange: (users: UserHit[]) => void
}

export default function TagInput({ tagged, onChange }: Props) {
  const supabase = createClient()
  const [query,    setQuery]    = useState('')
  const [results,  setResults]  = useState<UserHit[]>([])
  const [loading,  setLoading]  = useState(false)
  const [open,     setOpen]     = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const wrapRef  = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current)
    const q = query.trim()
    if (!q) { setResults([]); setOpen(false); return }
    setLoading(true)
    timerRef.current = setTimeout(async () => {
      const { data } = await supabase
        .from('users')
        .select('id, username, avatar')
        .ilike('username', `%${q}%`)
        .limit(5)
      setResults((data ?? []).filter(u => !tagged.find(t => t.id === u.id)))
      setOpen(true)
      setLoading(false)
    }, 300)
  }, [query]) // eslint-disable-line

  // Stäng vid klick utanför
  useEffect(() => {
    function h(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  function add(u: UserHit) {
    onChange([...tagged, u])
    setQuery('')
    setResults([])
    setOpen(false)
  }

  function remove(id: string) {
    onChange(tagged.filter(u => u.id !== id))
  }

  return (
    <div ref={wrapRef}>
      {/* Taggade chips */}
      {tagged.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 8 }}>
          {tagged.map(u => (
            <div key={u.id} style={{
              display: 'flex', alignItems: 'center', gap: 5,
              background: 'rgba(30,92,130,0.10)', borderRadius: 20,
              padding: '4px 10px 4px 6px', fontSize: 12, fontWeight: 600, color: 'var(--sea)',
            }}>
              <div style={{
                width: 20, height: 20, borderRadius: '50%', overflow: 'hidden',
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 10, fontWeight: 700, color: '#fff', flexShrink: 0,
              }}>
                {u.avatar
                  ? <Image src={u.avatar} alt={u.username} width={20} height={20} style={{ objectFit: 'cover' }} />
                  : u.username[0]?.toUpperCase()}
              </div>
              @{u.username}
              <button onClick={() => remove(u.id)} style={{
                background: 'none', border: 'none', cursor: 'pointer',
                fontSize: 13, color: 'var(--txt3)', padding: '0 0 0 2px', lineHeight: 1,
              }}>✕</button>
            </div>
          ))}
        </div>
      )}

      {/* Sökfält */}
      <div style={{ position: 'relative' }}>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="@användarnamn…"
          style={{
            width: '100%', padding: '10px 14px', borderRadius: 14,
            border: '1.5px solid rgba(10,123,140,0.18)',
            background: 'var(--white, #fff)', fontSize: 14, color: 'var(--txt, #162d3a)',
            outline: 'none', boxSizing: 'border-box',
          }}
        />
        {loading && (
          <div style={{
            position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
            width: 16, height: 16, borderRadius: '50%',
            border: '2px solid rgba(30,92,130,0.2)', borderTopColor: '#1e5c82',
            animation: 'spin 0.7s linear infinite',
          }} />
        )}

        {/* Dropdown */}
        {open && results.length > 0 && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
            background: 'var(--white, #fff)', borderRadius: 14,
            boxShadow: '0 4px 20px rgba(0,30,50,0.14)',
            border: '1px solid rgba(10,123,140,0.12)', overflow: 'hidden',
          }}>
            {results.map(u => (
              <button key={u.id} onClick={() => add(u)} style={{
                width: '100%', display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 14px', background: 'none', border: 'none', cursor: 'pointer',
                textAlign: 'left', borderBottom: '1px solid rgba(10,123,140,0.06)',
              }}>
                <div style={{
                  width: 30, height: 30, borderRadius: '50%', overflow: 'hidden', flexShrink: 0,
                  background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700, color: '#fff',
                }}>
                  {u.avatar
                    ? <Image src={u.avatar} alt={u.username} width={30} height={30} style={{ objectFit: 'cover' }} />
                    : u.username[0]?.toUpperCase()}
                </div>
                <span style={{ fontSize: 14, fontWeight: 700, color: '#162d3a' }}>@{u.username}</span>
              </button>
            ))}
          </div>
        )}
        {open && results.length === 0 && !loading && query.trim() && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 4px)', left: 0, right: 0, zIndex: 200,
            background: 'var(--white, #fff)', borderRadius: 14, padding: '12px 14px',
            boxShadow: '0 4px 20px rgba(0,30,50,0.14)',
            fontSize: 13, color: 'var(--txt3)',
          }}>
            Ingen seglare hittades
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
    </div>
  )
}

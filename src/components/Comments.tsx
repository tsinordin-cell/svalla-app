'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import { timeAgoShort } from '@/lib/utils'
import Link from 'next/link'

type Comment = {
  id: string
  content: string
  created_at: string
  user_id: string
  username?: string
  optimistic?: boolean
}

export default function Comments({
  tripId,
  initialCount,
  compact = false,
}: {
  tripId: string
  initialCount?: number
  compact?: boolean
}) {
  const supabase     = useRef(createClient()).current
  const inputRef     = useRef<HTMLInputElement>(null)
  const listRef      = useRef<HTMLDivElement>(null)
  const hasLoadedRef = useRef(false)
  const channelRef   = useRef<ReturnType<typeof supabase.channel> | null>(null)

  const [comments,   setComments]   = useState<Comment[]>([])
  const [text,       setText]       = useState('')
  const [userId,     setUserId]     = useState<string | null>(null)
  const [myUsername, setMyUsername] = useState('Seglare')
  const [posting,    setPosting]    = useState(false)
  const [open,       setOpen]       = useState(false)
  const [loading,    setLoading]    = useState(false)
  const [deleting,   setDeleting]   = useState<string | null>(null)

  const displayCount = hasLoadedRef.current ? comments.length : (initialCount ?? 0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      setUserId(user.id)
      supabase.from('users').select('username').eq('id', user.id).single()
        .then(({ data }) => { if (data?.username) setMyUsername(data.username) })
    })
  }, [supabase])

  const load = useCallback(async () => {
    const { data } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true })
      .limit(100)
    const rows = (data ?? []) as Comment[]
    const uids = [...new Set(rows.map(c => c.user_id).filter(Boolean))]
    const { data: uRows } = uids.length
      ? await supabase.from('users').select('id, username').in('id', uids)
      : { data: [] }
    const umap: Record<string, string> = {}
    for (const u of uRows ?? []) umap[u.id] = u.username
    setComments(rows.map(c => ({ ...c, username: umap[c.user_id] ?? 'Seglare' })))
    hasLoadedRef.current = true
  }, [supabase, tripId])

  useEffect(() => {
    if (!open) {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
      return
    }
    if (!hasLoadedRef.current) {
      setLoading(true)
      load().finally(() => setLoading(false))
    }
    const ch = supabase
      .channel(`comments-panel:${tripId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'comments', filter: `trip_id=eq.${tripId}` },
        () => load(),
      )
      .subscribe()
    channelRef.current = ch
    return () => { supabase.removeChannel(ch); channelRef.current = null }
  }, [open, tripId, load, supabase])

  useEffect(() => {
    if (open && !loading && listRef.current) {
      listRef.current.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
    }
  }, [open, comments.length, loading])

  useEffect(() => {
    if (open && userId) {
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(t)
    }
  }, [open, userId])

  async function post(e?: React.FormEvent) {
    e?.preventDefault()
    const content = text.trim()
    if (!userId || !content || posting) return
    setPosting(true)
    setText('')
    const tempId: string = `opt-${Date.now()}`
    setComments(prev => [...prev, { id: tempId, content, created_at: new Date().toISOString(), user_id: userId, username: myUsername, optimistic: true }])
    hasLoadedRef.current = true
    const { error } = await supabase.from('comments').insert({ trip_id: tripId, user_id: userId, content })
    if (error) { setComments(prev => prev.filter(c => c.id !== tempId)); setText(content); setPosting(false); return }
    await load()
    setPosting(false)
    supabase.from('trips').select('user_id').eq('id', tripId).single().then(({ data: trip }) => {
      if (!trip?.user_id || trip.user_id === userId) return
      supabase.from('notifications').insert({ user_id: trip.user_id, actor_id: userId, type: 'comment', trip_id: tripId })
      fetch('/api/push/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ targetUserId: trip.user_id, title: 'Ny kommentar 💬', body: `${myUsername}: ${content.slice(0, 60)}`, url: `/tur/${tripId}` }) }).catch(() => {})
    })
  }

  async function deleteComment(id: string) {
    setDeleting(id)
    setComments(prev => prev.filter(c => c.id !== id))
    const { error } = await supabase.from('comments').delete().eq('id', id).eq('user_id', userId!)
    if (error) await load()
    setDeleting(null)
  }

  return (
    <div>
      {/* Toggle button — compact (icon+count) or full pill */}
      {compact ? (
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={displayCount > 0 ? `${displayCount} kommentarer` : 'Kommentera'}
          aria-expanded={open}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', border: 'none', padding: '4px 0',
            cursor: 'pointer', WebkitTapHighlightColor: 'transparent',
            minHeight: 36,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke={open ? 'var(--sea)' : 'var(--txt2)'} strokeWidth={2}
            style={{ width: 22, height: 22, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {displayCount > 0 && (
            <span style={{ fontSize: 13, fontWeight: 700, color: open ? 'var(--sea)' : 'var(--txt2)' }}>
              {displayCount}
            </span>
          )}
        </button>
      ) : (
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={displayCount > 0 ? `${displayCount} kommentarer` : 'Kommentera'}
          aria-expanded={open}
          style={{
            display: 'flex', alignItems: 'center', gap: 6,
            padding: '9px 16px', borderRadius: 22, border: 'none',
            background: open ? 'rgba(10,123,140,0.10)' : 'rgba(10,123,140,0.07)',
            color: open ? 'var(--sea)' : 'var(--txt2)',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            transition: 'background .15s, color .15s',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 42,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            style={{ width: 19, height: 19, flexShrink: 0 }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span>{displayCount > 0 ? displayCount : 'Kommentera'}</span>
        </button>
      )}

      {/* ── Comment panel ── */}
      {open && (
        <div style={{
          marginTop: 10,
          background: 'rgba(10,123,140,0.03)',
          borderRadius: 18,
          border: '1px solid rgba(10,123,140,0.09)',
          overflow: 'hidden',
        }}>
          {loading && (
            <div style={{ padding: '22px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: 22, height: 22, borderRadius: '50%', border: '2.5px solid rgba(10,123,140,0.15)', borderTopColor: 'var(--sea)', animation: 'spin .7s linear infinite' }} />
            </div>
          )}

          {!loading && (
            <div ref={listRef} style={{ maxHeight: 300, overflowY: 'auto', scrollbarWidth: 'none', padding: comments.length > 0 ? '14px 12px 6px' : 0 }}>
              {comments.length === 0 && (
                <p style={{ textAlign: 'center', padding: '20px 14px', fontSize: 13, color: 'var(--txt3)', margin: 0 }}>
                  Bli först att kommentera
                </p>
              )}
              {comments.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: 9, marginBottom: 12, alignItems: 'flex-start', opacity: c.optimistic ? 0.6 : 1, transition: 'opacity .2s' }}>
                  <Link href={`/u/${c.username}`} onClick={e => e.stopPropagation()} style={{ textDecoration: 'none', flexShrink: 0 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'linear-gradient(135deg,var(--sea),#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12, fontWeight: 800 }}>
                      {(c.username ?? '?')[0].toUpperCase()}
                    </div>
                  </Link>
                  <div style={{ flex: 1, minWidth: 0, background: 'var(--white)', borderRadius: 14, padding: '8px 12px', boxShadow: '0 1px 3px rgba(0,30,50,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 3 }}>
                      <Link href={`/u/${c.username}`} onClick={e => e.stopPropagation()} style={{ fontSize: 12, fontWeight: 800, color: 'var(--sea)', textDecoration: 'none' }}>{c.username}</Link>
                      <span style={{ fontSize: 10, color: 'var(--txt3)' }}>{c.optimistic ? 'skickar…' : timeAgoShort(c.created_at)}</span>
                    </div>
                    <div style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.45, wordBreak: 'break-word' }}>{c.content}</div>
                  </div>
                  {c.user_id === userId && !c.optimistic && (
                    <button onClick={e => { e.stopPropagation(); deleteComment(c.id) }} disabled={deleting === c.id} aria-label="Radera"
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--txt3)', padding: '4px', marginTop: 4, flexShrink: 0, opacity: deleting === c.id ? 0.3 : 0.45, display: 'flex', alignItems: 'center', WebkitTapHighlightColor: 'transparent' }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}

          {userId ? (
            <form onSubmit={post} style={{ padding: '10px 12px 12px', borderTop: !loading && comments.length > 0 ? '1px solid rgba(10,123,140,0.08)' : 'none' }}>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); post() } }}
                  placeholder="Skriv en kommentar…"
                  maxLength={500}
                  style={{ flex: 1, padding: '10px 14px', borderRadius: 22, border: '1.5px solid rgba(10,123,140,0.15)', background: 'var(--white)', fontSize: 14, color: 'var(--txt)', outline: 'none', WebkitAppearance: 'none' }}
                />
                <button type="submit" disabled={!text.trim() || posting}
                  style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', flexShrink: 0, background: text.trim() && !posting ? 'var(--sea)' : 'rgba(10,123,140,0.10)', color: text.trim() && !posting ? '#fff' : 'var(--txt3)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: text.trim() && !posting ? 'pointer' : 'default', transition: 'background .15s, color .15s', WebkitTapHighlightColor: 'transparent' }}>
                  {posting
                    ? <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', animation: 'spin .7s linear infinite' }} />
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 16, height: 16 }}><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                  }
                </button>
              </div>
              {text.length > 400 && (
                <div style={{ fontSize: 10, marginTop: 4, textAlign: 'right', color: text.length > 480 ? 'var(--red)' : 'var(--txt3)' }}>{text.length}/500</div>
              )}
            </form>
          ) : (
            <div style={{ padding: '14px', fontSize: 13, color: 'var(--txt3)', textAlign: 'center' }}>
              <a href="/logga-in" onClick={e => e.stopPropagation()} style={{ color: 'var(--sea)', fontWeight: 700 }}>Logga in</a> för att kommentera
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

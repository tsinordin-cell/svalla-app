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
    const tempId = `opt-${Date.now()}`
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

  /* ── Icon ── */
  const BubbleIcon = ({ active }: { active: boolean }) => (
    <svg viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}
      stroke="currentColor" strokeWidth={active ? 0 : 2}
      style={{ width: 18, height: 18, flexShrink: 0 }}>
      <path strokeLinecap="round" strokeLinejoin="round"
        d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    </svg>
  )

  return (
    <div>
      {/* ── Toggle button ── */}
      {compact ? (
        <button
          onClick={() => setOpen(o => !o)}
          aria-label={displayCount > 0 ? `${displayCount} kommentarer` : 'Kommentera'}
          aria-expanded={open}
          style={{
            display: 'flex', alignItems: 'center', gap: 5,
            background: 'none', border: 'none', padding: '4px 0',
            cursor: 'pointer', WebkitTapHighlightColor: 'transparent', minHeight: 36,
          }}
        >
          <BubbleIcon active={open} />
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
            display: 'inline-flex', alignItems: 'center', gap: 7,
            padding: '8px 18px 8px 14px', borderRadius: 24,
            border: 'none',
            background: open
              ? 'linear-gradient(135deg, var(--sea) 0%, #2d7d8a 100%)'
              : 'rgba(0,40,80,0.06)',
            color: open ? '#fff' : 'var(--txt2)',
            fontSize: 14, fontWeight: 700, cursor: 'pointer',
            transition: 'background .18s, color .18s, box-shadow .18s',
            boxShadow: open ? '0 4px 16px rgba(10,100,130,0.22)' : 'none',
            WebkitTapHighlightColor: 'transparent',
            minHeight: 40,
          }}
        >
          <BubbleIcon active={open} />
          <span>{displayCount > 0 ? displayCount : 'Kommentera'}</span>
        </button>
      )}

      {/* ── Comment panel ── */}
      {open && (
        <div style={{
          marginTop: 12,
          background: '#fff',
          borderRadius: 20,
          boxShadow: '0 4px 24px rgba(0,30,60,0.10), 0 1px 4px rgba(0,30,60,0.06)',
          border: '1px solid rgba(0,40,80,0.07)',
          overflow: 'hidden',
        }}>

          {/* Loading spinner */}
          {loading && (
            <div style={{ padding: '28px 0', display: 'flex', justifyContent: 'center' }}>
              <div style={{
                width: 24, height: 24, borderRadius: '50%',
                border: '2.5px solid rgba(10,123,140,0.14)',
                borderTopColor: 'var(--sea)',
                animation: 'cmt-spin .7s linear infinite',
              }} />
            </div>
          )}

          {/* Comment list */}
          {!loading && (
            <div
              ref={listRef}
              style={{
                maxHeight: 320, overflowY: 'auto', scrollbarWidth: 'none',
                padding: comments.length > 0 ? '16px 14px 8px' : '0',
              }}
            >
              {/* Empty state */}
              {comments.length === 0 && (
                <div style={{ textAlign: 'center', padding: '28px 20px 12px' }}>
                  <svg viewBox="0 0 40 40" fill="none" style={{ width: 40, height: 40, margin: '0 auto 10px', display: 'block' }}>
                    <circle cx="20" cy="20" r="19" fill="rgba(10,123,140,0.07)" stroke="rgba(10,123,140,0.12)" strokeWidth="1.5"/>
                    <path d="M28 15a2 2 0 00-2-2H14a2 2 0 00-2 2v8a2 2 0 002 2h9l4 3v-3a2 2 0 00-1-1.73V15z"
                      fill="rgba(10,123,140,0.18)" stroke="rgba(10,123,140,0.50)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p style={{ fontSize: 13, color: 'var(--txt3)', margin: 0, fontWeight: 500 }}>
                    Bli först att kommentera
                  </p>
                </div>
              )}

              {/* Comments */}
              {comments.map((c, idx) => {
                const isMe = c.user_id === userId
                const initials = (c.username ?? '?')[0].toUpperCase()
                return (
                  <div key={c.id} style={{
                    display: 'flex', gap: 10, marginBottom: idx < comments.length - 1 ? 14 : 6,
                    alignItems: 'flex-start',
                    opacity: c.optimistic ? 0.55 : 1,
                    transition: 'opacity .2s',
                  }}>
                    {/* Avatar */}
                    <Link href={`/u/${c.username}`} onClick={e => e.stopPropagation()} style={{ textDecoration: 'none', flexShrink: 0 }}>
                      <div style={{
                        width: 34, height: 34, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1a5c7a 0%, #2a8a9a 100%)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: 13, fontWeight: 800,
                        boxShadow: '0 2px 6px rgba(0,60,90,0.18)',
                        flexShrink: 0,
                      }}>
                        {initials}
                      </div>
                    </Link>

                    {/* Bubble */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        background: isMe
                          ? 'linear-gradient(135deg, #eaf6fa 0%, #ddf0f5 100%)'
                          : 'rgba(0,40,80,0.04)',
                        borderRadius: isMe ? '18px 18px 6px 18px' : '18px 18px 18px 6px',
                        padding: '10px 14px',
                        border: isMe ? '1px solid rgba(10,123,140,0.12)' : '1px solid rgba(0,40,80,0.06)',
                        boxShadow: '0 1px 4px rgba(0,30,60,0.05)',
                      }}>
                        <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                          <Link
                            href={`/u/${c.username}`}
                            onClick={e => e.stopPropagation()}
                            style={{ fontSize: 12, fontWeight: 800, color: 'var(--sea)', textDecoration: 'none' }}
                          >
                            {c.username}
                          </Link>
                          <span style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 500 }}>
                            {c.optimistic ? 'skickar…' : timeAgoShort(c.created_at)}
                          </span>
                        </div>
                        <div style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.5, wordBreak: 'break-word' }}>
                          {c.content}
                        </div>
                      </div>
                    </div>

                    {/* Delete */}
                    {isMe && !c.optimistic && (
                      <button
                        onClick={e => { e.stopPropagation(); deleteComment(c.id) }}
                        disabled={deleting === c.id}
                        aria-label="Radera kommentar"
                        style={{
                          background: 'none', border: 'none', cursor: 'pointer',
                          color: 'var(--txt3)', padding: '6px',
                          opacity: deleting === c.id ? 0.25 : 0.40,
                          flexShrink: 0, display: 'flex', alignItems: 'center',
                          WebkitTapHighlightColor: 'transparent', marginTop: 4,
                          transition: 'opacity .15s',
                        }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 14, height: 14 }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    )}
                  </div>
                )
              })}
            </div>
          )}

          {/* ── Input area ── */}
          {userId ? (
            <form onSubmit={post} style={{
              padding: '10px 12px 14px',
              background: 'rgba(0,40,80,0.02)',
              borderTop: !loading && comments.length > 0
                ? '1px solid rgba(0,40,80,0.06)'
                : 'none',
            }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#fff',
                borderRadius: 26,
                padding: '4px 4px 4px 16px',
                border: '1.5px solid rgba(0,40,80,0.10)',
                boxShadow: '0 1px 6px rgba(0,30,60,0.06)',
                transition: 'border-color .18s, box-shadow .18s',
              }}>
                <input
                  ref={inputRef}
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); post() } }}
                  placeholder="Skriv en kommentar…"
                  maxLength={500}
                  style={{
                    flex: 1, border: 'none', background: 'transparent',
                    fontSize: 14, color: 'var(--txt)', outline: 'none',
                    padding: '6px 0',
                    WebkitAppearance: 'none',
                  }}
                />
                <button
                  type="submit"
                  disabled={!text.trim() || posting}
                  style={{
                    width: 38, height: 38, borderRadius: '50%', border: 'none',
                    flexShrink: 0,
                    background: text.trim() && !posting
                      ? 'linear-gradient(135deg, var(--sea) 0%, #2a8a9a 100%)'
                      : 'rgba(0,40,80,0.08)',
                    color: text.trim() && !posting ? '#fff' : 'rgba(0,40,80,0.30)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: text.trim() && !posting ? 'pointer' : 'default',
                    transition: 'background .18s, color .18s',
                    boxShadow: text.trim() && !posting ? '0 2px 8px rgba(10,100,130,0.30)' : 'none',
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {posting
                    ? <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.35)', borderTopColor: '#fff', animation: 'cmt-spin .7s linear infinite' }} />
                    : <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                  }
                </button>
              </div>
              {text.length > 400 && (
                <div style={{ fontSize: 10, marginTop: 5, textAlign: 'right', color: text.length > 480 ? '#e53e3e' : 'var(--txt3)' }}>
                  {text.length}/500
                </div>
              )}
            </form>
          ) : (
            <div style={{ padding: '16px', fontSize: 13, color: 'var(--txt3)', textAlign: 'center', background: 'rgba(0,40,80,0.02)' }}>
              <a href="/logga-in" onClick={e => e.stopPropagation()} style={{ color: 'var(--sea)', fontWeight: 700 }}>
                Logga in
              </a>{' '}för att kommentera
            </div>
          )}
        </div>
      )}

      <style>{`@keyframes cmt-spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

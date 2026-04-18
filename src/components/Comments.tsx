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
}

export default function Comments({
  tripId,
  initialCount,
}: {
  tripId: string
  initialCount?: number
}) {
  const supabase  = useRef(createClient()).current
  const inputRef  = useRef<HTMLInputElement>(null)
  const listRef   = useRef<HTMLDivElement>(null)

  const [comments, setComments] = useState<Comment[]>([])
  const [text,     setText]     = useState('')
  const [userId,   setUserId]   = useState<string | null>(null)
  const [posting,  setPosting]  = useState(false)
  const [open,     setOpen]     = useState(false)
  const [err,      setErr]      = useState('')
  const [deleting, setDeleting] = useState<string | null>(null)
  // Shown count: use initialCount until real comments are loaded
  const displayCount = open ? comments.length : (initialCount ?? comments.length)

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
  }, [supabase, tripId])

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUserId(user?.id ?? null))
    load()

    const channel = supabase
      .channel(`comments:${tripId}`)
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'comments', filter: `trip_id=eq.${tripId}` },
        () => load(),
      )
      .subscribe()

    return () => { channel.unsubscribe().catch(() => {}) }
  }, [tripId, load, supabase])

  // Auto-scroll to bottom when comments open or new comment added
  useEffect(() => {
    if (open && listRef.current) {
      setTimeout(() => {
        listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' })
      }, 50)
    }
  }, [open, comments.length])

  // Auto-focus input when panel opens
  useEffect(() => {
    if (open && userId) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open, userId])

  async function post(e?: React.FormEvent) {
    e?.preventDefault()
    if (!userId || !text.trim() || posting) return
    setPosting(true)
    setErr('')

    const content = text.trim()
    setText('') // Clear immediately for snappy UX

    const { error: commentErr } = await supabase
      .from('comments')
      .insert({ trip_id: tripId, user_id: userId, content })

    if (commentErr) {
      setText(content) // Restore if failed
      setErr('Kunde inte skicka kommentaren. Försök igen.')
      setPosting(false)
      return
    }

    // Notis + push till tur-ägaren (fire-and-forget)
    supabase.from('trips').select('user_id').eq('id', tripId).single()
      .then(({ data: trip }) => {
        if (trip?.user_id && trip.user_id !== userId) {
          supabase.from('notifications').insert({
            user_id: trip.user_id, actor_id: userId, type: 'comment', trip_id: tripId,
          })
          supabase.from('users').select('username').eq('id', userId).single()
            .then(({ data: me }) => {
              fetch('/api/push/send', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  targetUserId: trip.user_id,
                  title: 'Ny kommentar 💬',
                  body: `${me?.username ?? 'Någon'}: ${content.slice(0, 60)}`,
                  url: `/tur/${tripId}`,
                }),
              }).catch(() => {})
            })
        }
      })

    setPosting(false)
    await load()
  }

  async function deleteComment(commentId: string) {
    setDeleting(commentId)
    const { error } = await supabase
      .from('comments')
      .delete()
      .eq('id', commentId)
      .eq('user_id', userId!) // RLS safety
    if (error) {
      setDeleting(null)
      return
    }
    setComments(prev => prev.filter(c => c.id !== commentId))
    setDeleting(null)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      post()
    }
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        aria-label={displayCount > 0 ? `${displayCount} kommentarer` : 'Lägg till kommentar'}
        aria-expanded={open}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '6px 12px', borderRadius: 20, border: 'none',
          background: open ? 'rgba(10,123,140,0.12)' : 'rgba(10,123,140,0.06)',
          color: open ? 'var(--sea)' : 'var(--txt3)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
          transition: 'all .15s',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {displayCount > 0 ? <span>{displayCount}</span> : <span>Kommentera</span>}
      </button>

      {open && (
        <div style={{
          marginTop: 10,
          background: 'var(--white)',
          borderRadius: 16,
          border: '1px solid rgba(10,123,140,0.10)',
          overflow: 'hidden',
        }}>
          {/* Comment list */}
          <div
            ref={listRef}
            style={{
              maxHeight: 260,
              overflowY: 'auto',
              padding: comments.length > 0 ? '12px 14px 6px' : 0,
              scrollbarWidth: 'none',
            }}
          >
            {comments.length === 0 && (
              <p style={{ textAlign: 'center', padding: '16px 14px', fontSize: 13, color: '#a0bec8', margin: 0 }}>
                Bli först att kommentera 💬
              </p>
            )}
            {comments.map(c => (
              <div key={c.id} style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'flex-start' }}>
                {/* Avatar */}
                <Link href={`/u/${c.username}`} onClick={e => e.stopPropagation()}
                  style={{ textDecoration: 'none', flexShrink: 0 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: 'linear-gradient(135deg,var(--sea),#2d7d8a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 11, fontWeight: 700,
                  }}>
                    {(c.username ?? '?').slice(0, 1).toUpperCase()}
                  </div>
                </Link>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)', marginBottom: 1 }}>
                    <Link href={`/u/${c.username}`} onClick={e => e.stopPropagation()}
                      style={{ color: 'inherit', textDecoration: 'none' }}>
                      {c.username}
                    </Link>
                    <span style={{ fontWeight: 400, color: 'var(--txt3)', marginLeft: 6 }}>
                      {timeAgoShort(c.created_at)}
                    </span>
                  </div>
                  <div style={{ fontSize: 13, color: 'var(--txt2)', lineHeight: 1.4 }}>{c.content}</div>
                </div>
                {/* Delete own comment */}
                {c.user_id === userId && (
                  <button
                    onClick={e => { e.stopPropagation(); deleteComment(c.id) }}
                    aria-label="Radera kommentar"
                    disabled={deleting === c.id}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'var(--txt3)', fontSize: 14, padding: '2px 4px',
                      opacity: deleting === c.id ? 0.4 : 0.6,
                      flexShrink: 0, lineHeight: 1,
                    }}
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Input */}
          {userId ? (
            <form onSubmit={post} style={{ padding: '8px 12px 10px', borderTop: comments.length > 0 ? '1px solid rgba(10,123,140,0.07)' : 'none' }}>
              {err && (
                <p style={{ fontSize: 12, color: '#cc3d3d', margin: '0 0 6px', textAlign: 'center' }}>{err}</p>
              )}
              <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
                <input
                  ref={inputRef}
                  value={text}
                  onChange={e => { setText(e.target.value); setErr('') }}
                  onKeyDown={handleKeyDown}
                  placeholder="Skriv en kommentar… (Enter för att skicka)"
                  maxLength={500}
                  style={{
                    flex: 1, padding: '9px 13px', borderRadius: 20,
                    border: '1.5px solid rgba(10,123,140,0.15)',
                    background: 'rgba(10,123,140,0.04)', fontSize: 14, outline: 'none',
                    color: 'var(--txt)',
                  }}
                />
                <button
                  type="submit"
                  disabled={!text.trim() || posting}
                  aria-label="Skicka kommentar"
                  style={{
                    padding: '9px 14px', borderRadius: 20, border: 'none',
                    background: text.trim() && !posting ? 'var(--sea)' : 'rgba(10,123,140,0.12)',
                    color: text.trim() && !posting ? '#fff' : 'var(--txt3)',
                    fontSize: 12, fontWeight: 700, cursor: text.trim() ? 'pointer' : 'default',
                    transition: 'all .15s', flexShrink: 0,
                    WebkitTapHighlightColor: 'transparent',
                  }}
                >
                  {posting ? '…' : '↑'}
                </button>
              </div>
              {text.length > 400 && (
                <div style={{ fontSize: 10, color: text.length > 480 ? '#cc3d3d' : '#a0bec8', textAlign: 'right', marginTop: 3 }}>
                  {text.length}/500
                </div>
              )}
            </form>
          ) : (
            <div style={{ padding: '10px 14px', fontSize: 12, color: 'var(--txt3)', textAlign: 'center' }}>
              <a href="/logga-in" onClick={e => e.stopPropagation()} style={{ color: 'var(--sea)', fontWeight: 600 }}>Logga in</a> för att kommentera
            </div>
          )}
        </div>
      )}
    </div>
  )
}

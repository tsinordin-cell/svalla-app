'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { timeAgoShort, absoluteDate, avatarGradient, initialsOf } from '@/lib/utils'
import { parseTokens, getActiveMention, extractMentions } from '@/lib/mentions'
import { radius, fontSize, fontWeight, shadow } from '@/lib/tokens'

type Comment = {
  id: string
  content: string
  created_at: string
  user_id: string
  username?: string
  avatar?: string | null
  optimistic?: boolean
}

type MentionHit = { id: string; username: string; avatar: string | null }

/** Render a comment/caption string with @mention and #hashtag links. */
export function renderMentions(text: string) {
  const spans = parseTokens(text)
  return spans.map((s, i) => {
    if (s.type === 'mention') {
      return (
        <Link
          key={i}
          href={`/u/${s.value}`}
          onClick={e => e.stopPropagation()}
          style={{ color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}
        >
          @{s.value}
        </Link>
      )
    }
    if (s.type === 'hashtag') {
      return (
        <Link
          key={i}
          href={`/tagg/${s.value.toLowerCase()}`}
          onClick={e => e.stopPropagation()}
          style={{ color: 'var(--sea)', fontWeight: 700, textDecoration: 'none' }}
        >
          #{s.value}
        </Link>
      )
    }
    return <span key={i}>{s.value}</span>
  })
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
  const debounceRef  = useRef<ReturnType<typeof setTimeout> | null>(null)
  const mentionBoxRef = useRef<HTMLDivElement>(null)

  const [comments,    setComments]    = useState<Comment[]>([])
  const [text,        setText]        = useState('')
  const [userId,      setUserId]      = useState<string | null>(null)
  const [myUsername,  setMyUsername]  = useState('Seglare')
  const [myAvatar,    setMyAvatar]    = useState<string | null>(null)
  const [posting,     setPosting]     = useState(false)
  const [open,        setOpen]        = useState(false)
  const [loading,     setLoading]     = useState(false)
  const [deleting,    setDeleting]    = useState<string | null>(null)
  const [confirmDel,  setConfirmDel]  = useState<string | null>(null)

  // Mention autocomplete
  const [mentionHits,    setMentionHits]    = useState<MentionHit[]>([])
  const [mentionAnchor,  setMentionAnchor]  = useState<{ word: string; start: number } | null>(null)
  const [mentionActive,  setMentionActive]  = useState(0)

  const displayCount = hasLoadedRef.current ? comments.length : (initialCount ?? 0)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) return
      setUserId(user.id)
      supabase.from('users').select('username, avatar').eq('id', user.id).single()
        .then(({ data }) => {
          if (data?.username) setMyUsername(data.username)
          if (data?.avatar) setMyAvatar(data.avatar)
        })
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
      ? await supabase.from('users').select('id, username, avatar').in('id', uids)
      : { data: [] }
    const umap: Record<string, { username: string; avatar: string | null }> = {}
    for (const u of uRows ?? []) umap[u.id] = { username: u.username, avatar: u.avatar ?? null }
    setComments(rows.map(c => ({
      ...c,
      username: umap[c.user_id]?.username ?? 'Seglare',
      avatar:   umap[c.user_id]?.avatar ?? null,
    })))
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

  // ── Mention autocomplete search ──
  function handleTextChange(val: string) {
    setText(val)
    const cursor = inputRef.current?.selectionStart ?? val.length
    const anchor = getActiveMention(val, cursor)
    if (!anchor) {
      setMentionHits([])
      setMentionAnchor(null)
      return
    }
    setMentionAnchor(anchor)
    setMentionActive(0)
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const q = anchor.word
      if (q.length === 0) {
        // Show top users on bare @
        const { data } = await supabase
          .from('users')
          .select('id, username, avatar')
          .limit(6)
        setMentionHits((data ?? []) as MentionHit[])
      } else {
        const { data } = await supabase
          .from('users')
          .select('id, username, avatar')
          .ilike('username', `${q}%`)
          .limit(6)
        setMentionHits((data ?? []) as MentionHit[])
      }
    }, 200)
  }

  function applyMention(hit: MentionHit) {
    if (!mentionAnchor) return
    const before = text.slice(0, mentionAnchor.start)
    const after  = text.slice(mentionAnchor.start + 1 + mentionAnchor.word.length) // skip @word
    const newText = `${before}@${hit.username} ${after}`
    setText(newText)
    setMentionHits([])
    setMentionAnchor(null)
    setTimeout(() => {
      inputRef.current?.focus()
      const pos = before.length + hit.username.length + 2 // after "@username "
      inputRef.current?.setSelectionRange(pos, pos)
    }, 0)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (mentionHits.length > 0) {
      if (e.key === 'ArrowDown')  { e.preventDefault(); setMentionActive(v => Math.min(v + 1, mentionHits.length - 1)); return }
      if (e.key === 'ArrowUp')    { e.preventDefault(); setMentionActive(v => Math.max(v - 1, 0)); return }
      if (e.key === 'Enter' || e.key === 'Tab') { e.preventDefault(); applyMention(mentionHits[mentionActive]); return }
      if (e.key === 'Escape')     { setMentionHits([]); setMentionAnchor(null); return }
    }
    if (e.key === 'Enter' && !e.shiftKey && mentionHits.length === 0) { e.preventDefault(); post() }
  }

  // ── Send mention notifications (dedupe 60s) ──
  async function sendMentionNotifications(content: string) {
    const mentioned = extractMentions(content)
    if (!mentioned.length || !userId) return
    const { data: mentionedUsers } = await supabase
      .from('users')
      .select('id, username')
      .in('username', mentioned)
    if (!mentionedUsers?.length) return

    const sixtySecondsAgo = new Date(Date.now() - 60_000).toISOString()
    for (const mu of mentionedUsers) {
      if (mu.id === userId) continue // don't notify self
      // Dedupe: check if we already sent a mention notification to this user in the last 60s
      const { data: recent } = await supabase
        .from('notifications')
        .select('id')
        .eq('user_id', mu.id)
        .eq('actor_id', userId)
        .eq('type', 'mention')
        .gte('created_at', sixtySecondsAgo)
        .limit(1)
        .maybeSingle()
      if (recent) continue
      await supabase.from('notifications').insert({
        user_id:  mu.id,
        actor_id: userId,
        type:     'mention',
        trip_id:  tripId,
      })
      fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: mu.id,
          title: `${myUsername} taggade dig 🏷️`,
          body:  content.slice(0, 80),
          url:   `/tur/${tripId}`,
        }),
      }).catch(() => {})
    }
  }

  async function post(e?: React.FormEvent) {
    e?.preventDefault()
    const content = text.trim()
    if (!userId || !content || posting) return
    setPosting(true)
    setText('')
    setMentionHits([])
    setMentionAnchor(null)
    const tempId = `opt-${Date.now()}`
    setComments(prev => [...prev, { id: tempId, content, created_at: new Date().toISOString(), user_id: userId, username: myUsername, avatar: myAvatar, optimistic: true }])
    hasLoadedRef.current = true
    const { error } = await supabase
      .from('comments')
      .insert({ trip_id: tripId, user_id: userId, content })
    if (error) { setComments(prev => prev.filter(c => c.id !== tempId)); setText(content); setPosting(false); return }
    await load()
    setPosting(false)
    // Trip owner notification
    supabase.from('trips').select('user_id').eq('id', tripId).single().then(({ data: trip }) => {
      if (!trip?.user_id || trip.user_id === userId) return
      supabase.from('notifications').insert({ user_id: trip.user_id, actor_id: userId, type: 'comment', trip_id: tripId })
      fetch('/api/push/send', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ targetUserId: trip.user_id, title: 'Ny kommentar 💬', body: `${myUsername}: ${content.slice(0, 60)}`, url: `/tur/${tripId}` }) }).catch(() => {})
    })
    // Mention notifications
    sendMentionNotifications(content)
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
          background: 'var(--white)',
          borderRadius: radius.lg,
          boxShadow: shadow.md,
          border: '1px solid rgba(10,123,140,0.08)',
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
                const initials = initialsOf(c.username)
                const grad = avatarGradient(c.username ?? c.user_id)
                const isConfirming = confirmDel === c.id
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
                        background: grad,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontSize: fontSize.small, fontWeight: fontWeight.semibold,
                        flexShrink: 0, overflow: 'hidden', position: 'relative',
                      }}>
                        {c.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img loading="lazy" decoding="async" src={c.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : initials}
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
                            style={{ fontSize: fontSize.small, fontWeight: fontWeight.semibold, color: 'var(--sea)', textDecoration: 'none' }}
                          >
                            {c.username}
                          </Link>
                          <span
                            title={c.optimistic ? '' : absoluteDate(c.created_at)}
                            style={{ fontSize: 10, color: 'var(--txt3)', fontWeight: 500, cursor: c.optimistic ? 'default' : 'help' }}
                          >
                            {c.optimistic ? 'skickar…' : timeAgoShort(c.created_at)}
                          </span>
                        </div>
                        <div style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.5, wordBreak: 'break-word' }}>
                          {renderMentions(c.content)}
                        </div>
                      </div>
                    </div>

                    {/* Delete — two-step inline confirm */}
                    {isMe && !c.optimistic && (
                      isConfirming ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, flexShrink: 0, marginTop: 2 }}>
                          <button
                            onClick={e => { e.stopPropagation(); deleteComment(c.id); setConfirmDel(null) }}
                            disabled={deleting === c.id}
                            aria-label="Bekräfta radera"
                            style={{
                              background: 'rgba(220,38,38,0.10)', border: '1px solid rgba(220,38,38,0.30)',
                              color: 'var(--red)', padding: '4px 8px', borderRadius: 8,
                              fontSize: 10, fontWeight: 600, cursor: 'pointer',
                              WebkitTapHighlightColor: 'transparent',
                            }}
                          >Radera</button>
                          <button
                            onClick={e => { e.stopPropagation(); setConfirmDel(null) }}
                            aria-label="Avbryt"
                            style={{
                              background: 'transparent', border: 'none',
                              color: 'var(--txt3)', padding: '2px 4px',
                              fontSize: 10, cursor: 'pointer',
                              WebkitTapHighlightColor: 'transparent',
                            }}
                          >Avbryt</button>
                        </div>
                      ) : (
                        <button
                          onClick={e => { e.stopPropagation(); setConfirmDel(c.id) }}
                          disabled={deleting === c.id}
                          aria-label="Radera kommentar"
                          title="Radera"
                          style={{
                            background: 'none', border: 'none', cursor: 'pointer',
                            color: 'var(--txt3)', padding: '6px',
                            opacity: deleting === c.id ? 0.25 : 0.45,
                            flexShrink: 0, display: 'flex', alignItems: 'center',
                            WebkitTapHighlightColor: 'transparent', marginTop: 4,
                            transition: 'opacity .15s, color .15s',
                          }}
                          onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.color = '#dc2626'; (e.currentTarget as HTMLButtonElement).style.opacity = '0.85' }}
                          onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = 'var(--txt3)'; (e.currentTarget as HTMLButtonElement).style.opacity = '0.45' }}
                        >
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 15, height: 15 }}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2m3 0v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6h14zM10 11v6M14 11v6" />
                          </svg>
                        </button>
                      )
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
              position: 'relative',
            }}>
              {/* Mention autocomplete dropdown */}
              {mentionHits.length > 0 && (
                <div
                  ref={mentionBoxRef}
                  style={{
                    position: 'absolute', bottom: '100%', left: 12, right: 12,
                    background: 'var(--white)',
                    border: '1px solid rgba(10,123,140,0.12)',
                    borderRadius: radius.sm,
                    boxShadow: shadow.md,
                    overflow: 'hidden',
                    zIndex: 100,
                    marginBottom: 4,
                  }}
                >
                  {mentionHits.map((hit, i) => (
                    <div
                      key={hit.id}
                      onMouseDown={e => { e.preventDefault(); applyMention(hit) }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        padding: '9px 14px',
                        cursor: 'pointer',
                        background: i === mentionActive ? 'rgba(10,123,140,0.07)' : 'transparent',
                        borderBottom: i < mentionHits.length - 1 ? '1px solid rgba(0,40,80,0.05)' : 'none',
                        transition: 'background .1s',
                      }}
                      onMouseEnter={() => setMentionActive(i)}
                    >
                      <div style={{
                        width: 30, height: 30, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 11, fontWeight: fontWeight.semibold, color: '#fff', overflow: 'hidden',
                      }}>
                        {hit.avatar
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img loading="lazy" decoding="async" src={hit.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : hit.username[0]?.toUpperCase()}
                      </div>
                      <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>
                        @{hit.username}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--white)',
                borderRadius: radius.full,
                padding: '4px 4px 4px 16px',
                border: '1.5px solid rgba(10,123,140,0.15)',
                boxShadow: shadow.xs,
                transition: 'border-color .18s, box-shadow .18s',
              }}>
                <input
                  ref={inputRef}
                  value={text}
                  onChange={e => handleTextChange(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Skriv en kommentar…"
                  maxLength={500}
                  style={{
                    flex: 1, border: 'none', background: 'transparent',
                    fontSize: 14, color: 'var(--txt)', outline: 'none',
                    padding: '6px 0',
                    WebkitAppearance: 'none',
                  }}
                />
                <button className="press-feedback"
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

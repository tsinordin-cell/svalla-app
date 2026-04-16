'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

type Comment = { id: string; content: string; created_at: string; user_id: string; username?: string }

export default function Comments({ tripId }: { tripId: string }) {
  const supabase = createClient()
  const [comments, setComments] = useState<Comment[]>([])
  const [text, setText] = useState('')
  const [userId, setUserId] = useState<string | null>(null)
  const [posting, setPosting] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => setUserId(user?.id ?? null))
    loadComments()
  }, [])

  async function loadComments() {
    const { data } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id')
      .eq('trip_id', tripId)
      .order('created_at', { ascending: true })
    const rows = (data ?? []) as Comment[]
    // hämta usernames separat
    const uids = [...new Set(rows.map(c => c.user_id).filter(Boolean))]
    const { data: uRows } = uids.length
      ? await supabase.from('users').select('id, username').in('id', uids)
      : { data: [] }
    const umap: Record<string, string> = {}
    for (const u of uRows ?? []) umap[u.id] = u.username
    setComments(rows.map(c => ({ ...c, username: umap[c.user_id] ?? 'Seglare' })))
  }

  async function post(e: React.FormEvent) {
    e.preventDefault()
    if (!userId || !text.trim() || posting) return
    setPosting(true)
    const { error: commentErr } = await supabase.from('comments').insert({ trip_id: tripId, user_id: userId, content: text.trim() })
    if (commentErr) { console.error('[comments] insert error:', commentErr.message); setPosting(false); return }

    // Notis + push till tur-ägaren
    const { data: trip } = await supabase.from('trips').select('user_id').eq('id', tripId).single()
    if (trip?.user_id && trip.user_id !== userId) {
      const { error: notifErr } = await supabase.from('notifications').insert({
        user_id: trip.user_id, actor_id: userId, type: 'comment', trip_id: tripId,
      })
      if (notifErr) console.error('[comments] notification error:', notifErr.message)

      const { data: me } = await supabase.from('users').select('username').eq('id', userId).single()
      fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId: trip.user_id,
          title: 'Ny kommentar 💬',
          body: `${me?.username ?? 'Någon'}: ${text.trim().slice(0, 60)}`,
          url: `/tur/${tripId}`,
        }),
      }).catch((e) => console.error('[comments] push error:', e))
    }
    setText('')
    await loadComments()
    setPosting(false)
  }

  function timeAgo(d: string) {
    const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000)
    if (m < 1) return 'Just nu'
    if (m < 60) return `${m}m`
    if (m < 1440) return `${Math.floor(m/60)}h`
    return `${Math.floor(m/1440)}d`
  }

  return (
    <div>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          padding: '6px 12px', borderRadius: 20, border: 'none',
          background: 'rgba(10,123,140,0.06)', color: 'var(--txt3)',
          fontSize: 13, fontWeight: 600, cursor: 'pointer',
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 16, height: 16 }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {comments.length > 0 ? comments.length : 'Kommentera'}
      </button>

      {open && (
        <div style={{
          marginTop: 12, background: 'var(--white)', borderRadius: 16,
          border: '1px solid rgba(10,123,140,0.10)', overflow: 'hidden',
        }}>
          {comments.length > 0 && (
            <div style={{ padding: '12px 14px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {comments.map(c => (
                <div key={c.id} style={{ display: 'flex', gap: 8 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                    background: 'linear-gradient(135deg,var(--sea),#2d7d8a)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontSize: 11, fontWeight: 700,
                  }}>
                    {c.username?.slice(0,2).toUpperCase() ?? '?'}
                  </div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--sea)' }}>
                      {c.username}
                      <span style={{ fontWeight: 400, color: 'var(--txt3)', marginLeft: 6 }}>{timeAgo(c.created_at)}</span>
                    </div>
                    <div style={{ fontSize: 13, color: 'var(--txt2)', marginTop: 2 }}>{c.content}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {userId ? (
            <form onSubmit={post} style={{ display: 'flex', gap: 8, padding: '10px 14px', borderTop: comments.length > 0 ? '1px solid rgba(10,123,140,0.08)' : 'none' }}>
              <input
                value={text}
                onChange={e => setText(e.target.value)}
                placeholder="Skriv en kommentar…"
                maxLength={500}
                style={{
                  flex: 1, padding: '8px 12px', borderRadius: 20,
                  border: '1.5px solid rgba(10,123,140,0.15)',
                  background: 'rgba(10,123,140,0.04)', fontSize: 13, outline: 'none',
                }}
              />
              <button type="submit" disabled={!text.trim() || posting}
                style={{
                  padding: '8px 14px', borderRadius: 20, border: 'none',
                  background: text.trim() ? 'var(--sea)' : 'rgba(10,123,140,0.15)',
                  color: text.trim() ? '#fff' : 'var(--txt3)',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Skicka
              </button>
            </form>
          ) : (
            <div style={{ padding: '10px 14px', fontSize: 12, color: 'var(--txt3)' }}>
              <a href="/logga-in" style={{ color: 'var(--sea)', fontWeight: 600 }}>Logga in</a> för att kommentera
            </div>
          )}
        </div>
      )}
    </div>
  )
}

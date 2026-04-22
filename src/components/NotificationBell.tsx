'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import { timeAgoShort } from '@/lib/utils'

type Notif = {
  id: string
  type: 'like' | 'comment' | 'follow' | 'tag'
  read: boolean
  created_at: string
  trip_id: string | null
  actor_username?: string
}

const TYPE_LABEL: Record<string, string> = {
  like:    'gillade din tur ❤️',
  comment: 'kommenterade din tur 💬',
  follow:  'börjar följa dig 👋',
  tag:     'taggade dig i en tur 🏷️',
}

export default function NotificationBell() {
  const supabase = useRef(createClient()).current
  const [notifs, setNotifs] = useState<Notif[]>([])
  const [open, setOpen] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)
  const ref = useRef<HTMLDivElement>(null)

  const unread = notifs.filter(n => !n.read).length

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  const load = useCallback(async (uid: string) => {
    const { data } = await supabase
      .from('notifications')
      .select('id, type, read, created_at, trip_id, actor_id')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(20)

    const rows = (data ?? []) as (Notif & { actor_id: string })[]
    const actorIds = [...new Set(rows.map(r => r.actor_id).filter(Boolean))]
    const { data: uRows } = actorIds.length
      ? await supabase.from('users').select('id, username').in('id', actorIds)
      : { data: [] }
    const umap: Record<string, string> = {}
    for (const u of uRows ?? []) umap[u.id] = u.username

    setNotifs(rows.map(r => ({ ...r, actor_username: umap[r.actor_id] ?? 'Någon' })))
  }, [supabase])

  useEffect(() => {
    let mounted = true

    // Clean up any stale channel before creating a new one
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted || !user) return
      const uid = user.id
      setUserId(uid)
      load(uid)

      // Guard: don't create a channel if already cleaned up
      if (!mounted) return

      // Realtime: ny notis → ladda om listan
      const ch = supabase
        .channel(`notifications:${uid}:${Date.now()}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${uid}` },
          () => { if (mounted) load(uid) },
        )
        .subscribe()
      channelRef.current = ch
    })

    return () => {
      mounted = false
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current)
        channelRef.current = null
      }
    }
  }, [load, supabase])



  async function markAllRead() {
    if (!userId || unread === 0) return
    await supabase.from('notifications').update({ read: true }).eq('user_id', userId).eq('read', false)
    setNotifs(prev => prev.map(n => ({ ...n, read: true })))
  }

  // Stäng vid klick utanför
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  if (!userId) return null

  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button
        onClick={() => { setOpen(o => !o); if (!open && unread > 0) markAllRead() }}
        aria-label={unread > 0 ? `${unread} olästa notiser` : 'Notiser'}
        aria-expanded={open}
        className="press-feedback"
        style={{
          width: 38, height: 38, borderRadius: '50%',
          background: 'rgba(10,123,140,0.08)',
          border: 'none', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative', flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} style={{ width: 18, height: 18 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
        {unread > 0 && (
          <div style={{
            position: 'absolute', top: 4, right: 4,
            width: 16, height: 16, borderRadius: '50%',
            background: 'var(--acc)', border: '2px solid var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 9, fontWeight: 600, color: '#fff', lineHeight: 1,
          }}>
            {unread > 9 ? '9+' : unread}
          </div>
        )}
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 46, right: 0, zIndex: 200,
          width: 300, maxHeight: 420, overflowY: 'auto',
          background: 'var(--white)', borderRadius: 18,
          boxShadow: '0 8px 40px rgba(0,30,50,0.18)',
          border: '1px solid rgba(10,123,140,0.10)',
        }}>
          <div style={{ padding: '14px 16px 10px', borderBottom: '1px solid rgba(10,123,140,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)' }}>Notiser</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              {unread > 0 && (
                <button onClick={markAllRead} className="press-feedback" style={{ fontSize: 11, color: 'var(--txt3)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  Markera lästa
                </button>
              )}
              <Link href="/notiser" onClick={() => setOpen(false)} style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none' }}>
                Visa alla →
              </Link>
            </div>
          </div>

          {notifs.length === 0 ? (
            <div style={{ padding: '32px 16px', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
              Inga notiser ännu
            </div>
          ) : (
            notifs.map(n => (
              <Link
                key={n.id}
                href={n.trip_id ? `/tur/${n.trip_id}` : '#'}
                onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'flex-start', gap: 10,
                  padding: '11px 16px',
                  background: n.read ? 'transparent' : 'rgba(10,123,140,0.04)',
                  borderBottom: '1px solid rgba(10,123,140,0.06)',
                  textDecoration: 'none',
                }}
              >
                <div style={{
                  width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 600, color: '#fff',
                }}>
                  {n.actor_username?.[0]?.toUpperCase() ?? '?'}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, color: 'var(--txt)' }}>
                    <strong>{n.actor_username}</strong> {TYPE_LABEL[n.type]}
                  </span>
                  <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{timeAgoShort(n.created_at)}</div>
                </div>
                {!n.read && (
                  <div style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--sea)', flexShrink: 0, marginTop: 5 }} />
                )}
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  )
}

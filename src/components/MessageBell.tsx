'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { countUnreadMessages } from '@/lib/dm'

/**
 * DM-ikon för header. Visar kuvert + badge med oläst-räknare.
 * Länkar direkt till /meddelanden (ingen dropdown — enklare än NotificationBell).
 * Realtime: lyssnar på INSERT i messages för att bump:a räknaren.
 */
export default function MessageBell() {
  const supabase = useRef(createClient()).current
  const [userId, setUserId] = useState<string | null>(null)
  const [unread, setUnread] = useState(0)

  const channelRef = useRef<ReturnType<typeof supabase.channel> | null>(null)

  const refresh = useCallback(async (uid: string) => {
    const n = await countUnreadMessages(supabase, uid)
    setUnread(n)
  }, [supabase])

  useEffect(() => {
    let mounted = true
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!mounted || !user) return
      const uid = user.id
      setUserId(uid)
      refresh(uid)

      // Realtime: nytt meddelande någonstans → räkna om
      const ch = supabase
        .channel(`dm-unread:${uid}`)
        .on(
          'postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'messages' },
          () => { if (mounted) refresh(uid) },
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
  }, [refresh, supabase])

  if (!userId) return null

  return (
    <Link
      href="/meddelanden"
      aria-label={unread > 0 ? `${unread} olästa meddelanden` : 'Meddelanden'}
      style={{
        width: 38, height: 38, borderRadius: '50%',
        background: 'rgba(10,123,140,0.08)',
        border: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', flexShrink: 0,
        textDecoration: 'none',
      }}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea, #1e5c82)" strokeWidth={2} style={{ width: 18, height: 18 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
      </svg>
      {unread > 0 && (
        <div style={{
          position: 'absolute', top: 4, right: 4,
          width: 16, height: 16, borderRadius: '50%',
          background: 'var(--acc, #c96e2a)', border: '2px solid var(--bg)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 9, fontWeight: 600, color: '#fff', lineHeight: 1,
        }}>
          {unread > 9 ? '9+' : unread}
        </div>
      )}
    </Link>
  )
}

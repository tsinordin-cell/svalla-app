'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { createClient, getViewer } from '@/lib/supabase'
import { countUnreadMessages } from '@/lib/dm'
import Icon from '@/components/Icon'
import { RAKNARE_STIL, TOPPKNAPP_STIL } from '@/components/toppradStil'

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

    // Clean up any stale channel before creating a new one
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current)
      channelRef.current = null
    }

    getViewer(supabase).then(({ data: { user } }) => {
      if (!mounted || !user) return
      const uid = user.id
      setUserId(uid)
      refresh(uid)

      // Guard: don't create a channel if already cleaned up
      if (!mounted) return

      // Realtime: nytt meddelande någonstans → räkna om
      const ch = supabase
        .channel(`dm-unread:${uid}:${Date.now()}`)
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
      className="press-feedback"
      style={{ ...TOPPKNAPP_STIL, textDecoration: 'none' }}
    >
      {/* 2026-11-23 (menyförslaget): ikonen från Icon.tsx (Lucide) i stället för en egen
          inritad bubbla, och 44 px tryckyta. Räknaren har 11 px text, var 9 px. */}
      <Icon name="messageCircle" size={20} stroke={2} />
      {unread > 0 && (
        <span style={RAKNARE_STIL}>
          {unread > 9 ? '9+' : unread}
        </span>
      )}
    </Link>
  )
}

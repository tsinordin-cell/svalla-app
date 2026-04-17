'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { toast } from '@/components/Toast'

export default function LikeButton({ tripId }: { tripId: string }) {
  const supabase = createClient()
  const [liked, setLiked] = useState(false)
  const [count, setCount] = useState(0)
  const [loading, setLoading] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setUserId(user?.id ?? null)

      const { count: c } = await supabase
        .from('likes').select('*', { count: 'exact', head: true })
        .eq('trip_id', tripId)
      setCount(c ?? 0)

      if (user) {
        const { data } = await supabase.from('likes')
          .select('id').eq('trip_id', tripId).eq('user_id', user.id).single()
        setLiked(!!data)
      }
    }
    load()
  }, [tripId, supabase])

  async function toggle() {
    if (!userId || loading) return
    setLoading(true)
    if (liked) {
      await supabase.from('likes').delete().eq('trip_id', tripId).eq('user_id', userId)
      setLiked(false); setCount(c => c - 1)
      toast('Gillning borttagen', 'info')
    } else {
      await supabase.from('likes').insert({ trip_id: tripId, user_id: userId })
      setLiked(true); setCount(c => c + 1)
      toast('Du gillade turen ❤️')
      // Notis + push till tur-ägaren
      const { data: trip } = await supabase.from('trips').select('user_id').eq('id', tripId).single()
      if (trip?.user_id && trip.user_id !== userId) {
        await supabase.from('notifications').insert({
          user_id: trip.user_id, actor_id: userId, type: 'like', trip_id: tripId,
        })
        // Hämta eget username för push-text
        const { data: me } = await supabase.from('users').select('username').eq('id', userId).single()
        fetch('/api/push/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            targetUserId: trip.user_id,
            title: 'Ny gillning ⚓',
            body: `${me?.username ?? 'Någon'} gillade din tur`,
            url: `/tur/${tripId}`,
          }),
        }).catch(() => {/* tyst */})
      }
    }
    setLoading(false)
  }

  return (
    <button
      onClick={toggle}
      aria-label={liked ? 'Ta bort gillning' : 'Gilla turen'}
      aria-pressed={liked}
      style={{
        display: 'flex', alignItems: 'center', gap: 5,
        padding: '6px 12px', borderRadius: 20, border: 'none',
        background: liked ? 'rgba(201,110,42,0.10)' : 'rgba(10,123,140,0.06)',
        color: liked ? 'var(--acc)' : 'var(--txt3)',
        fontSize: 13, fontWeight: 600, cursor: userId ? 'pointer' : 'default',
        transition: 'all .15s',
      }}
    >
      <svg viewBox="0 0 24 24" fill={liked ? 'currentColor' : 'none'} stroke="currentColor"
        strokeWidth={2} style={{ width: 16, height: 16 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      {count > 0 && <span>{count}</span>}
    </button>
  )
}

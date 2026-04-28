'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { toast } from '@/components/Toast'

export default function LikeButton({
  tripId,
  initialCount,
  initialLiked,
  compact = false,
}: {
  tripId: string
  initialCount?: number
  initialLiked?: boolean
  compact?: boolean
}) {
  const supabase = useRef(createClient()).current
  const [liked,   setLiked]   = useState(initialLiked ?? false)
  const [count,   setCount]   = useState(initialCount ?? 0)
  const [loading, setLoading] = useState(false)
  const [userId,  setUserId]  = useState<string | null>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancelled) return
      setUserId(user?.id ?? null)
      if (initialCount !== undefined && initialLiked !== undefined) return
      const { count: c } = await supabase
        .from('likes').select('*', { count: 'exact', head: true })
        .eq('trip_id', tripId)
      if (cancelled) return
      setCount(c ?? 0)
      if (user) {
        const { data } = await supabase.from('likes')
          .select('id').eq('trip_id', tripId).eq('user_id', user.id).maybeSingle()
        if (cancelled) return
        setLiked(!!data)
      }
    }
    load()
    return () => { cancelled = true }
  }, [tripId]) // eslint-disable-line react-hooks/exhaustive-deps

  async function toggle() {
    if (!userId || loading) return
    setLoading(true)
    if (liked) {
      setLiked(false); setCount(c => c - 1)
      const { error } = await supabase.from('likes').delete().eq('trip_id', tripId).eq('user_id', userId)
      if (error) { setLiked(true); setCount(c => c + 1); toast('Kunde inte ta bort gillning', 'error') }
      else { toast('Gillning borttagen', 'info') }
    } else {
      setLiked(true); setCount(c => c + 1)
      setAnimate(true); setTimeout(() => setAnimate(false), 600)
      const { error } = await supabase.from('likes').insert({ trip_id: tripId, user_id: userId })
      if (error) { setLiked(false); setCount(c => c - 1); toast('Kunde inte gilla turen', 'error') }
      else {
        toast('Du gillade turen ❤️')
        supabase.from('trips').select('user_id').eq('id', tripId).single()
          .then(({ data: trip }) => {
            if (trip?.user_id && trip.user_id !== userId) {
              fetch('/api/notifications/insert', {
                method: 'POST', headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ targetUserId: trip.user_id, type: 'like', tripId }),
              }).catch(() => {})
              supabase.from('users').select('username').eq('id', userId).single()
                .then(({ data: me }) => {
                  fetch('/api/push/send', {
                    method: 'POST', headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ targetUserId: trip.user_id, title: 'Ny gillning ⚓', body: `${me?.username ?? 'Någon'} gillade din tur`, url: `/tur/${tripId}` }),
                  }).catch(() => {})
                })
            }
          })
      }
    }
    setLoading(false)
  }

  if (compact) {
    return (
      <button
        onClick={toggle}
        aria-label={liked ? 'Ta bort gillning' : 'Gilla turen'}
        aria-pressed={liked}
        disabled={!userId}
        className="press-feedback"
        style={{
          display: 'flex', alignItems: 'center', gap: 5,
          background: 'none', border: 'none', padding: '4px 0',
          cursor: userId && !loading ? 'pointer' : 'default',
          opacity: loading ? 0.5 : 1,
          WebkitTapHighlightColor: 'transparent',
          minHeight: 36,
        }}
      >
        <svg
          viewBox="0 0 24 24"
          fill={liked ? '#e0454a' : 'none'}
          stroke={liked ? '#e0454a' : 'var(--txt2)'}
          strokeWidth={2}
          style={{
            width: 23, height: 23, flexShrink: 0,
            transform: animate ? 'scale(1.35)' : 'scale(1)',
            transition: 'transform 0.2s cubic-bezier(0.36,0.07,0.19,0.97)',
          }}
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        {count > 0 && (
          <span style={{ fontSize: 13, fontWeight: 700, color: liked ? '#e0454a' : 'var(--txt2)' }}>
            {count}
          </span>
        )}
      </button>
    )
  }

  return (
    <button
      onClick={toggle}
      aria-label={liked ? 'Ta bort gillning' : 'Gilla turen'}
      aria-pressed={liked}
      disabled={!userId}
      className="press-feedback"
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        padding: '9px 16px', borderRadius: 22, border: 'none',
        background: liked ? 'rgba(224,69,74,0.1)' : 'rgba(10,123,140,0.07)',
        color: liked ? '#e0454a' : 'var(--txt2)',
        fontSize: 14, fontWeight: 700,
        cursor: userId && !loading ? 'pointer' : 'default',
        opacity: loading ? 0.6 : 1,
        transition: 'background .15s, color .15s',
        WebkitTapHighlightColor: 'transparent',
        minHeight: 42,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill={liked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={2}
        style={{
          width: 19, height: 19,
          transform: animate ? 'scale(1.4)' : 'scale(1)',
          transition: 'transform 0.25s cubic-bezier(0.36, 0.07, 0.19, 0.97)',
          flexShrink: 0,
        }}
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span>{count > 0 ? count : 'Gilla'}</span>
    </button>
  )
}

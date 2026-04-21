'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'

interface Props {
  restaurantId?: string
  routeId?: string
}

export default function BookmarkButton({ restaurantId, routeId }: Props) {
  const supabase = useRef(createClient()).current
  const [saved,   setSaved]   = useState(false)
  const [userId,  setUserId]  = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return
      setUserId(user.id)

      const q = supabase.from('bookmarks').select('id')
        .eq('user_id', user.id)
      if (restaurantId) q.eq('restaurant_id', restaurantId)
      if (routeId)      q.eq('route_id', routeId)

      const { data } = await q.maybeSingle()
      setSaved(!!data)
    }
    load()
  }, [restaurantId, routeId]) // eslint-disable-line

  async function toggle() {
    if (!userId || loading) return
    setLoading(true)
    if (saved) {
      const q = supabase.from('bookmarks').delete().eq('user_id', userId)
      if (restaurantId) q.eq('restaurant_id', restaurantId)
      if (routeId)      q.eq('route_id', routeId)
      await q
      setSaved(false)
    } else {
      await supabase.from('bookmarks').insert({
        user_id:       userId,
        restaurant_id: restaurantId ?? null,
        route_id:      routeId      ?? null,
      })
      setSaved(true)
    }
    setLoading(false)
  }

  if (!userId) return null

  return (
    <button
      onClick={e => { e.preventDefault(); e.stopPropagation(); toggle() }}
      title={saved ? 'Ta bort bokmärke' : 'Spara'}
      className="press-feedback"
      style={{
        width: 36, height: 36, borderRadius: '50%', border: 'none', cursor: 'pointer',
        background: saved ? 'rgba(201,110,42,0.12)' : 'rgba(10,123,140,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        transition: 'all .15s', flexShrink: 0,
      }}
    >
      <svg viewBox="0 0 24 24" fill={saved ? '#c96e2a' : 'none'} stroke={saved ? '#c96e2a' : 'var(--txt3)'} strokeWidth={2} style={{ width: 18, height: 18 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
      </svg>
    </button>
  )
}

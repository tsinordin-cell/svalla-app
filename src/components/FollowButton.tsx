'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'

export default function FollowButton({ targetUserId }: { targetUserId: string }) {
  const supabase = createClient()
  const [myId, setMyId]         = useState<string | null>(null)
  const [following, setFollowing] = useState(false)
  const [count, setCount]       = useState(0)
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      setMyId(user?.id ?? null)

      const { count: fc } = await supabase
        .from('follows').select('*', { count: 'exact', head: true })
        .eq('following_id', targetUserId)
      setCount(fc ?? 0)

      if (user && user.id !== targetUserId) {
        const { data } = await supabase.from('follows')
          .select('id').eq('follower_id', user.id).eq('following_id', targetUserId).single()
        setFollowing(!!data)
      }
    }
    load()
  }, [targetUserId]) // eslint-disable-line

  async function toggle() {
    if (!myId || loading || myId === targetUserId) return
    setLoading(true)
    if (following) {
      await supabase.from('follows').delete()
        .eq('follower_id', myId).eq('following_id', targetUserId)
      setFollowing(false); setCount(c => Math.max(0, c - 1))
    } else {
      await supabase.from('follows').insert({ follower_id: myId, following_id: targetUserId })
      setFollowing(true); setCount(c => c + 1)
      // Notis + push till den som följs
      await supabase.from('notifications').insert({
        user_id: targetUserId, actor_id: myId, type: 'follow',
      })
      const { data: me } = await supabase.from('users').select('username').eq('id', myId).single()
      fetch('/api/push/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          targetUserId,
          title: 'Ny följare ⛵',
          body: `${me?.username ?? 'Någon'} börjar följa dig`,
          url: `/u/${me?.username ?? ''}`,
        }),
      }).catch(() => {/* tyst */})
    }
    setLoading(false)
  }

  // Dölj om det är din egen profil
  if (myId === targetUserId) return null

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        onClick={toggle}
        disabled={loading || !myId}
        style={{
          padding: '9px 22px', borderRadius: 20, border: 'none', cursor: myId ? 'pointer' : 'default',
          background: following
            ? 'rgba(10,123,140,0.08)'
            : 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
          color: following ? '#1e5c82' : '#fff',
          fontSize: 13, fontWeight: 700,
          transition: 'all .15s',
          boxShadow: following ? 'none' : '0 2px 10px rgba(30,92,130,0.3)',
        }}
      >
        {loading ? '…' : following ? 'Följer ✓' : 'Följ'}
      </button>
      {count > 0 && (
        <span style={{ fontSize: 12, color: '#7a9dab', fontWeight: 600 }}>
          {count} följare
        </span>
      )}
    </div>
  )
}

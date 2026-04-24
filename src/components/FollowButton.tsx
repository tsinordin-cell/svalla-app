'use client'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import { toast } from '@/components/Toast'

export default function FollowButton({ targetUserId, darkBg = false }: { targetUserId: string; darkBg?: boolean }) {
  const supabase = useRef(createClient()).current
  const [myId, setMyId]         = useState<string | null>(null)
  const [following, setFollowing] = useState(false)
  const [count, setCount]       = useState(0)
  const [loading, setLoading]   = useState(false)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancelled) return
      setMyId(user?.id ?? null)

      const { count: fc } = await supabase
        .from('follows').select('*', { count: 'exact', head: true })
        .eq('following_id', targetUserId)
      if (cancelled) return
      setCount(fc ?? 0)

      if (user && user.id !== targetUserId) {
        const { data } = await supabase.from('follows')
          .select('id').eq('follower_id', user.id).eq('following_id', targetUserId).single()
        if (cancelled) return
        setFollowing(!!data)
      }
    }
    load()
    return () => { cancelled = true }
  }, [targetUserId]) // eslint-disable-line

  async function toggle() {
    if (!myId || loading || myId === targetUserId) return
    setLoading(true)
    if (following) {
      const { error } = await supabase.from('follows').delete()
        .eq('follower_id', myId).eq('following_id', targetUserId)
      if (error) { toast('Kunde inte avfölja. Försök igen.', 'error'); setLoading(false); return }
      setFollowing(false); setCount(c => Math.max(0, c - 1))
      toast('Du följer inte längre den här seglaren')
    } else {
      const { error } = await supabase.from('follows').insert({ follower_id: myId, following_id: targetUserId })
      if (error) { toast('Kunde inte följa. Försök igen.', 'error'); setLoading(false); return }
      setFollowing(true); setCount(c => c + 1)
      toast('Du följer nu den här seglaren ⛵')
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
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <button
        onClick={toggle}
        disabled={loading || !myId}
        aria-label={following ? 'Sluta följa' : 'Följ'}
        aria-pressed={following}
        className="press-feedback"
        style={{
          padding: '10px 24px', borderRadius: 20, cursor: myId ? 'pointer' : 'default',
          fontSize: 13, fontWeight: 700, transition: 'all .15s',
          ...(following
            ? darkBg
              ? { background: 'rgba(255,255,255,0.18)', border: '1.5px solid rgba(255,255,255,0.35)', color: '#fff', boxShadow: 'none' }
              : { background: 'rgba(10,123,140,0.08)', border: '1.5px solid rgba(10,123,140,0.20)', color: 'var(--sea)', boxShadow: 'none' }
            : { background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', border: '1.5px solid transparent', color: '#fff', boxShadow: '0 2px 10px rgba(30,92,130,0.3)' }
          ),
        }}
      >
        {loading ? '…' : following ? 'Följer ✓' : 'Följ'}
      </button>
      {count > 0 && (
        <span style={{
          fontSize: 12, fontWeight: 600,
          color: darkBg ? 'rgba(255,255,255,0.75)' : 'var(--txt3)',
        }}>
          {count} följare
        </span>
      )}
    </div>
  )
}

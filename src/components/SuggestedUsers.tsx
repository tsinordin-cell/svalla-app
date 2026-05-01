'use client'
/**
 * SuggestedUsers — "Föreslagna att följa"
 *
 * Shows up to 5 users the current user doesn't follow yet.
 * Scoring heuristic (client-side):
 *   - trips logged in the last 30 days  ×3
 *   - total trips                        ×1
 * No RPC migration needed — uses 3 lightweight queries.
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { avatarGradient } from '@/lib/utils'
import FollowButton from './FollowButton'

type SuggestedUser = {
  id: string
  username: string
  avatar: string | null
  tripCount: number
  recentCount: number
}

const MAX_SUGGESTIONS = 5

export default function SuggestedUsers() {
  const supabase    = useRef(createClient()).current
  const [users,   setUsers]   = useState<SuggestedUser[]>([])
  const [myId,    setMyId]    = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [hidden,  setHidden]  = useState(false)
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    setMyId(user.id)

    const { data: followRows } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id)
    const alreadyFollowed = new Set((followRows ?? []).map((r: { following_id: string }) => r.following_id))
    alreadyFollowed.add(user.id)

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { data: recentTrips } = await supabase
      .from('trips').select('user_id').gte('created_at', thirtyDaysAgo).is('deleted_at', null).limit(500)
    const { data: allTrips } = await supabase
      .from('trips').select('user_id').is('deleted_at', null).limit(2000)

    const recentMap: Record<string, number> = {}
    for (const t of recentTrips ?? []) recentMap[t.user_id] = (recentMap[t.user_id] ?? 0) + 1
    const totalMap: Record<string, number> = {}
    for (const t of allTrips ?? []) totalMap[t.user_id] = (totalMap[t.user_id] ?? 0) + 1

    const scored = Object.keys(totalMap)
      .filter(uid => !alreadyFollowed.has(uid))
      .map(uid => ({ uid, score: (recentMap[uid] ?? 0) * 3 + (totalMap[uid] ?? 0), recentCount: recentMap[uid] ?? 0, tripCount: totalMap[uid] ?? 0 }))
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SUGGESTIONS * 3)

    if (scored.length === 0) { setLoading(false); return }

    const { data: profiles } = await supabase.from('users').select('id, username, avatar').in('id', scored.map(s => s.uid))
    const profileMap: Record<string, { username: string; avatar: string | null }> = {}
    for (const p of profiles ?? []) profileMap[p.id] = { username: p.username, avatar: p.avatar ?? null }

    setUsers(
      scored.filter(s => profileMap[s.uid]).slice(0, MAX_SUGGESTIONS).map(s => ({
        id: s.uid, username: profileMap[s.uid]!.username, avatar: profileMap[s.uid]!.avatar,
        tripCount: s.tripCount, recentCount: s.recentCount,
      }))
    )
    setLoading(false)
  }, [supabase])

  useEffect(() => {
    load().catch(() => { setLoading(false); setHidden(true) })
  }, [load])

  function dismiss(uid: string) {
    setDismissed(prev => new Set([...prev, uid]))
  }

  const visible = users.filter(u => !dismissed.has(u.id))
  if (loading || visible.length === 0 || hidden) return null

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--sea)',
          textTransform: 'uppercase', letterSpacing: '0.7px',
        }}>
          Föreslagna att följa
        </span>
        <button
          onClick={() => setHidden(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 11, color: 'var(--txt3)', padding: '2px 6px',
            WebkitTapHighlightColor: 'transparent',
            borderRadius: 6,
          }}
        >
          Stäng
        </button>
      </div>

      {/* Horizontal scroll row */}
      <div style={{
        display: 'flex', gap: 10,
        overflowX: 'auto', paddingBottom: 4,
        scrollbarWidth: 'none', msOverflowStyle: 'none',
      } as React.CSSProperties}>
        {visible.map(u => (
          <SuggestedUserCard key={u.id} user={u} myId={myId} onDismiss={() => dismiss(u.id)} />
        ))}
      </div>
    </div>
  )
}

function SuggestedUserCard({ user, myId, onDismiss }: { user: SuggestedUser; myId: string | null; onDismiss: () => void }) {
  const grad = avatarGradient(user.username)
  const activityLabel = user.recentCount > 0
    ? `${user.recentCount} tur${user.recentCount > 1 ? 'er' : ''} senaste månaden`
    : `${user.tripCount} tur${user.tripCount !== 1 ? 'er' : ''} totalt`

  return (
    <div style={{
      flexShrink: 0,
      width: 136,
      background: 'var(--card-bg, var(--white))',
      borderRadius: 16,
      boxShadow: '0 1px 8px rgba(0,30,50,0.07)',
      border: '1px solid var(--border)',
      padding: '14px 10px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 7,
      position: 'relative',
    }}>
      {/* Dismiss */}
      <button
        onClick={onDismiss}
        aria-label="Dölj förslag"
        style={{
          position: 'absolute', top: 6, right: 6,
          background: 'var(--surface2, rgba(10,123,140,0.07))',
          border: 'none', cursor: 'pointer',
          color: 'var(--txt3)', padding: 0,
          width: 20, height: 20, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
          transition: 'background 0.15s',
        }}
      >
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7"/>
        </svg>
      </button>

      {/* Avatar */}
      <Link href={`/u/${user.username}`} style={{ textDecoration: 'none' }}>
        <div style={{
          width: 54, height: 54, borderRadius: '50%',
          background: grad, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 700, color: '#fff',
          overflow: 'hidden',
          boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
        }}>
          {user.avatar
            ? <Image src={user.avatar} alt="" fill sizes="54px" style={{ objectFit: 'cover' }} />
            : user.username[0]?.toUpperCase()}
        </div>
      </Link>

      {/* Name */}
      <Link href={`/u/${user.username}`} style={{ textDecoration: 'none' }}>
        <div style={{
          fontSize: 13, fontWeight: 600, color: 'var(--txt)',
          textAlign: 'center', lineHeight: 1.2,
          maxWidth: 112, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {user.username}
        </div>
      </Link>

      {/* Activity */}
      <div style={{
        fontSize: 10, color: 'var(--txt3)', fontWeight: 500,
        textAlign: 'center', lineHeight: 1.3,
      }}>
        {activityLabel}
      </div>

      {/* Follow */}
      {myId && myId !== user.id && (
        <div style={{ width: '100%', marginTop: 2 }}>
          <FollowButton targetUserId={user.id} />
        </div>
      )}
    </div>
  )
}

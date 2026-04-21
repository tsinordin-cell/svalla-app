'use client'
/**
 * SuggestedUsers — "Hitta seglare"
 *
 * Shows up to 5 users the current user doesn't follow yet.
 * Scoring heuristic (client-side):
 *   - trips logged in the last 30 days  ×3
 *   - total trips                        ×1
 * No RPC migration needed — uses 3 lightweight queries.
 */
import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
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
  // Track which user IDs have been dismissed in this session
  const [dismissed, setDismissed] = useState<Set<string>>(new Set())

  const load = useCallback(async () => {
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setLoading(false); return }
    setMyId(user.id)

    // 1. Who the user already follows
    const { data: followRows } = await supabase
      .from('follows')
      .select('following_id')
      .eq('follower_id', user.id)
    const alreadyFollowed = new Set((followRows ?? []).map((r: { following_id: string }) => r.following_id))
    alreadyFollowed.add(user.id) // don't suggest self

    // 2. Recent trips (last 30 days) to count activity per user
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const { data: recentTrips } = await supabase
      .from('trips')
      .select('user_id')
      .gte('created_at', thirtyDaysAgo)
      .is('deleted_at', null)
      .limit(500)

    // 3. All trips (for total count)
    const { data: allTrips } = await supabase
      .from('trips')
      .select('user_id')
      .is('deleted_at', null)
      .limit(2000)

    // Count per user
    const recentMap: Record<string, number> = {}
    for (const t of recentTrips ?? []) {
      recentMap[t.user_id] = (recentMap[t.user_id] ?? 0) + 1
    }
    const totalMap: Record<string, number> = {}
    for (const t of allTrips ?? []) {
      totalMap[t.user_id] = (totalMap[t.user_id] ?? 0) + 1
    }

    // Score and filter
    const scored = Object.keys(totalMap)
      .filter(uid => !alreadyFollowed.has(uid))
      .map(uid => ({
        uid,
        score: (recentMap[uid] ?? 0) * 3 + (totalMap[uid] ?? 0),
        recentCount: recentMap[uid] ?? 0,
        tripCount: totalMap[uid] ?? 0,
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, MAX_SUGGESTIONS * 3) // fetch more than needed in case some have no profile

    if (scored.length === 0) { setLoading(false); return }

    // Fetch user profiles
    const { data: profiles } = await supabase
      .from('users')
      .select('id, username, avatar')
      .in('id', scored.map(s => s.uid))

    const profileMap: Record<string, { username: string; avatar: string | null }> = {}
    for (const p of profiles ?? []) {
      profileMap[p.id] = { username: p.username, avatar: p.avatar ?? null }
    }

    const result: SuggestedUser[] = scored
      .filter(s => profileMap[s.uid])
      .slice(0, MAX_SUGGESTIONS)
      .map(s => ({
        id: s.uid,
        username: profileMap[s.uid].username,
        avatar: profileMap[s.uid].avatar,
        tripCount: s.tripCount,
        recentCount: s.recentCount,
      }))

    setUsers(result)
    setLoading(false)
  }, [supabase])

  useEffect(() => { load() }, [load])

  // Dismiss a single suggestion optimistically
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
          fontSize: 10, fontWeight: 800, color: 'var(--sea)',
          textTransform: 'uppercase', letterSpacing: '0.6px',
        }}>
          ⛵ Hitta seglare att följa
        </span>
        <button
          onClick={() => setHidden(true)}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: 11, color: 'var(--txt3)', padding: '2px 4px',
            WebkitTapHighlightColor: 'transparent',
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
          <SuggestedUserCard
            key={u.id}
            user={u}
            myId={myId}
            onDismiss={() => dismiss(u.id)}
          />
        ))}
      </div>
    </div>
  )
}

function SuggestedUserCard({
  user,
  myId,
  onDismiss,
}: {
  user: SuggestedUser
  myId: string | null
  onDismiss: () => void
}) {
  const grad = avatarGradient(user.username)

  return (
    <div style={{
      flexShrink: 0,
      width: 140,
      background: 'var(--white)',
      borderRadius: 18,
      boxShadow: '0 2px 10px rgba(0,30,50,0.08)',
      border: '1px solid rgba(10,123,140,0.08)',
      padding: '14px 12px 12px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 8,
      position: 'relative',
    }}>
      {/* Dismiss × */}
      <button
        onClick={onDismiss}
        style={{
          position: 'absolute', top: 7, right: 7,
          background: 'none', border: 'none', cursor: 'pointer',
          color: 'var(--txt3)', padding: 3, lineHeight: 1,
          fontSize: 13,
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="Dölj förslag"
      >×</button>

      {/* Avatar */}
      <Link href={`/u/${user.username}`} style={{ textDecoration: 'none' }}>
        <div style={{
          width: 52, height: 52, borderRadius: '50%',
          background: grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 900, color: '#fff',
          overflow: 'hidden',
        }}>
          {user.avatar
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            : user.username[0]?.toUpperCase()}
        </div>
      </Link>

      {/* Name */}
      <Link href={`/u/${user.username}`} style={{ textDecoration: 'none' }}>
        <div style={{
          fontSize: 13, fontWeight: 800, color: 'var(--txt)',
          textAlign: 'center', lineHeight: 1.2,
          maxWidth: 116, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {user.username}
        </div>
      </Link>

      {/* Trip count badge */}
      <div style={{
        fontSize: 10, color: 'var(--txt3)', fontWeight: 600,
        textAlign: 'center',
      }}>
        {user.recentCount > 0
          ? `${user.recentCount} tur${user.recentCount > 1 ? 'er' : ''} senaste månaden`
          : `${user.tripCount} tur${user.tripCount !== 1 ? 'er' : ''} totalt`
        }
      </div>

      {/* Follow button — only show when logged in */}
      {myId && myId !== user.id && (
        <div style={{ width: '100%' }}>
          <FollowButton targetUserId={user.id} />
        </div>
      )}
    </div>
  )
}

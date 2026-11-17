'use client'
/**
 * SuggestedUsers — "Föreslagna att följa"
 *
 * Visar användare den inloggade inte följer. Poäng (klientsidan):
 *   - turer senaste 30 dagarna  ×3
 *   - turer totalt              ×1
 *   - samma hemmahamn som jag   +3
 *   - ny på Svalla (30 dagar)   +2
 *   - har profilbild            +1, har hemmahamn +1
 *
 * Till 2026-11-16 krävdes minst en loggad tur för att alls föreslås. Med tio
 * turer i hela databasen gav det tre förslag; de 129 kontona var osynliga för
 * varandra (Toms skärmdump av /sok, 16 nov). Nu är alla konton med, och
 * raden under namnet säger varför personen föreslås.
 *
 * variant 'rad' (flödet): horisontell kortrad, max 5. variant 'lista' (/sok):
 * en lista med fler rader och Följ-knapp.
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
  orsak: string
}

const MAX_SUGGESTIONS = 5

export default function SuggestedUsers({ variant = 'rad', max = variant === 'lista' ? 8 : MAX_SUGGESTIONS }: { variant?: 'rad' | 'lista'; max?: number } = {}) {
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
    const [{ data: recentTrips }, { data: allTrips }, { data: profiles }, { data: jag }] = await Promise.all([
      supabase.from('trips').select('user_id').gte('created_at', thirtyDaysAgo).is('deleted_at', null).limit(500),
      supabase.from('trips').select('user_id').is('deleted_at', null).limit(2000),
      supabase.from('users').select('id, username, avatar, home_port, created_at').not('username', 'is', null).limit(1000),
      supabase.from('users').select('home_port').eq('id', user.id).maybeSingle(),
    ])

    const recentMap: Record<string, number> = {}
    for (const t of recentTrips ?? []) recentMap[t.user_id] = (recentMap[t.user_id] ?? 0) + 1
    const totalMap: Record<string, number> = {}
    for (const t of allTrips ?? []) totalMap[t.user_id] = (totalMap[t.user_id] ?? 0) + 1

    const minHamn = (jag?.home_port ?? '').trim().toLowerCase()
    const nyGrans = Date.now() - 30 * 24 * 60 * 60 * 1000
    type Profil = { id: string; username: string; avatar: string | null; home_port: string | null; created_at: string | null }

    const scored = ((profiles ?? []) as Profil[])
      .filter(p => p.username && !alreadyFollowed.has(p.id))
      .map(p => {
        const recent = recentMap[p.id] ?? 0
        const total = totalMap[p.id] ?? 0
        const hamn = (p.home_port ?? '').trim()
        const sammaHamn = !!minHamn && hamn.toLowerCase() === minHamn
        const ny = !!p.created_at && new Date(p.created_at).getTime() > nyGrans
        const score = recent * 3 + total + (sammaHamn ? 3 : 0) + (ny ? 2 : 0) + (p.avatar ? 1 : 0) + (hamn ? 1 : 0)
        const orsak = recent > 0 ? `${recent} tur${recent > 1 ? 'er' : ''} senaste månaden`
          : sammaHamn ? `Hemmahamn ${hamn}, som du`
          : total > 0 ? `${total} tur${total !== 1 ? 'er' : ''} loggade`
          : ny ? 'Ny på Svalla'
          : hamn ? `Hemmahamn ${hamn}`
          : 'Seglare på Svalla'
        return { id: p.id, username: p.username, avatar: p.avatar ?? null, tripCount: total, recentCount: recent, score, orsak }
      })
      .sort((a, b) => b.score - a.score || a.username.localeCompare(b.username, 'sv'))
      .slice(0, max)

    setUsers(scored)
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
          {variant === 'lista' ? 'Seglare att följa' : 'Föreslagna att följa'}
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

      {variant === 'lista' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {visible.map(u => (
            <SuggestedUserRow key={u.id} user={u} myId={myId} />
          ))}
        </div>
      ) : (
        /* Horizontal scroll row */
        <div style={{
          display: 'flex', gap: 10,
          overflowX: 'auto', paddingBottom: 4,
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        } as React.CSSProperties}>
          {visible.map(u => (
            <SuggestedUserCard key={u.id} user={u} myId={myId} onDismiss={() => dismiss(u.id)} />
          ))}
        </div>
      )}
    </div>
  )
}

/** Radvarianten på /sok: avatar, namn, orsak och Följ-knapp. */
function SuggestedUserRow({ user, myId }: { user: SuggestedUser; myId: string | null }) {
  const grad = avatarGradient(user.username)
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 12,
      background: 'var(--white)', borderRadius: 16, padding: '10px 12px 10px 14px',
      border: '1px solid rgba(10,123,140,0.09)',
      boxShadow: '0 1px 4px rgba(0,45,60,0.05)',
    }}>
      <Link href={`/u/${encodeURIComponent(user.username)}`} style={{ textDecoration: 'none', flexShrink: 0 }}>
        <div style={{
          width: 42, height: 42, borderRadius: '50%', position: 'relative',
          background: grad, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, fontWeight: 600, color: '#fff', overflow: 'hidden',
        }}>
          {user.avatar
            ? <Image src={user.avatar} alt="" fill sizes="42px" style={{ objectFit: 'cover' }} />
            : user.username[0]?.toUpperCase()}
        </div>
      </Link>
      <Link href={`/u/${encodeURIComponent(user.username)}`} style={{ textDecoration: 'none', flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.username}
        </div>
        <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {user.orsak}
        </div>
      </Link>
      {myId && myId !== user.id && (
        <div style={{ flexShrink: 0 }}>
          <FollowButton targetUserId={user.id} hideCount />
        </div>
      )}
    </div>
  )
}

function SuggestedUserCard({ user, myId, onDismiss }: { user: SuggestedUser; myId: string | null; onDismiss: () => void }) {
  const grad = avatarGradient(user.username)
  const activityLabel = user.orsak

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
      <Link href={`/u/${encodeURIComponent(user.username)}`} style={{ textDecoration: 'none' }}>
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
      <Link href={`/u/${encodeURIComponent(user.username)}`} style={{ textDecoration: 'none' }}>
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

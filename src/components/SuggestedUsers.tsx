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
 *
 * 2026-11-27 (förhandsvisning, "S2"): korten i raden visar personens senaste
 * publika tur, bilden överst och "plats · datum" under namnet. Saknas bild
 * syns ett mönster; saknas tur syns skälet som förut. Vem som ser raden är
 * oförändrat.
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
  foto: string | null
  turRad: string | null
}

type SenasteTur = { user_id: string; image: string | null; images: string[] | null; location_name: string | null; created_at: string }

function isNextImageSafe(url: string): boolean {
  try {
    const u = new URL(url)
    return u.hostname.endsWith('.supabase.co') || u.hostname === 'images.unsplash.com'
  } catch { return false }
}

function kortDatum(iso: string): string {
  return new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }).replace('.', '')
}

const MAX_SUGGESTIONS = 5

export default function SuggestedUsers({ variant = 'rad', max = variant === 'lista' ? 8 : MAX_SUGGESTIONS, iBand = false }: { variant?: 'rad' | 'lista'; max?: number; iBand?: boolean } = {}) {
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
      supabase.from('users_publik').select('id, username, avatar, home_port, public_fields, created_at').not('username', 'is', null).limit(1000),
      supabase.rpc('min_profil').maybeSingle<{ home_port: string | null }>(),
    ])

    const recentMap: Record<string, number> = {}
    for (const t of recentTrips ?? []) recentMap[t.user_id] = (recentMap[t.user_id] ?? 0) + 1
    const totalMap: Record<string, number> = {}
    for (const t of allTrips ?? []) totalMap[t.user_id] = (totalMap[t.user_id] ?? 0) + 1

    const minHamn = (jag?.home_port ?? '').trim().toLowerCase()
    const nyGrans = Date.now() - 30 * 24 * 60 * 60 * 1000
    type Profil = { id: string; username: string; avatar: string | null; home_port: string | null; public_fields: string[] | null; created_at: string | null }

    const scored = ((profiles ?? []) as Profil[])
      .filter(p => p.username && !alreadyFollowed.has(p.id))
      .map(p => {
        const recent = recentMap[p.id] ?? 0
        const total = totalMap[p.id] ?? 0
        // Integritet (2026-11-20): hemmahamnen visades ("Hemmahamn X") och användes
        // för matchning även när personen valt att inte visa den. Nu bara om
        // 'home_port' finns i public_fields, samma regel som profilsidan.
        const hamn = (p.public_fields ?? []).includes('home_port') ? (p.home_port ?? '').trim() : ''
        const sammaHamn = !!minHamn && hamn.toLowerCase() === minHamn
        const ny = !!p.created_at && new Date(p.created_at).getTime() > nyGrans
        const score = recent * 3 + total + (sammaHamn ? 3 : 0) + (ny ? 2 : 0) + (p.avatar ? 1 : 0) + (hamn ? 1 : 0)
        const orsak = recent > 0 ? `${recent} tur${recent > 1 ? 'er' : ''} senaste månaden`
          : sammaHamn ? `Hemmahamn ${hamn}, som du`
          : total > 0 ? `${total} tur${total !== 1 ? 'er' : ''} loggade`
          : ny ? 'Ny på Svalla'
          : hamn ? `Hemmahamn ${hamn}`
          : 'Finns på Svalla'
        return { id: p.id, username: p.username, avatar: p.avatar ?? null, tripCount: total, recentCount: recent, score, orsak, foto: null as string | null, turRad: null as string | null }
      })
      .sort((a, b) => b.score - a.score || a.username.localeCompare(b.username, 'sv'))
      .slice(0, max)

    // Kortraden: senaste publika turen per person, helst en med bild.
    if (variant === 'rad' && scored.length > 0) {
      const { data: turer } = await supabase
        .from('trips')
        .select('user_id, image, images, location_name, created_at')
        .in('user_id', scored.map(u => u.id))
        .eq('visibility', 'public')
        .eq('status', 'done')
        .is('deleted_at', null)
        .order('created_at', { ascending: false })
        .limit(200)
      const perPerson: Record<string, SenasteTur[]> = {}
      for (const t of (turer ?? []) as SenasteTur[]) (perPerson[t.user_id] ??= []).push(t)
      for (const u of scored) {
        const lista = perPerson[u.id] ?? []
        const medBild = lista.find(t => t.image || (t.images ?? []).length > 0)
        const tur = medBild ?? lista[0]
        if (!tur) continue
        u.foto = medBild ? (medBild.image || medBild.images![0]!) : null
        u.turRad = [tur.location_name, kortDatum(tur.created_at)].filter(Boolean).join(' · ')
      }
    }

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

  if (variant === 'rad') {
    return (
      <div style={iBand
        ? { background: 'var(--surface, #fffdf8)', padding: '12px 0 14px' }
        : { background: 'var(--surface, #fffdf8)', padding: '12px 0 14px', borderRadius: 16, border: '1px solid var(--hairline)', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px 10px' }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink, #162d3a)' }}>Förslag till dig</span>
          <Link href="/sok" style={{ fontSize: 14, fontWeight: 600, color: 'var(--sea)', textDecoration: 'none' }}>Se alla</Link>
        </div>
        <div className="forslag-rad" style={{
          display: 'flex', gap: 10,
          overflowX: 'auto', padding: '0 16px',
          scrollbarWidth: 'none', msOverflowStyle: 'none',
        } as React.CSSProperties}>
          {visible.map(u => (
            <SuggestedUserCard key={u.id} user={u} myId={myId} onDismiss={() => dismiss(u.id)} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div style={{ marginBottom: 16 }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
        <span style={{
          fontSize: 10, fontWeight: 700, color: 'var(--sea)',
          textTransform: 'uppercase', letterSpacing: '0.7px',
        }}>
          Personer att följa
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

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {visible.map(u => (
          <SuggestedUserRow key={u.id} user={u} myId={myId} />
        ))}
      </div>
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
  const href = `/u/${encodeURIComponent(user.username)}`

  return (
    <div style={{
      flex: '0 0 168px',
      background: 'var(--surface, #fffdf8)',
      borderRadius: 12,
      border: '1px solid var(--hairline)',
      overflow: 'hidden',
      position: 'relative',
      textAlign: 'center',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Dölj */}
      <button
        onClick={onDismiss}
        aria-label="Dölj förslag"
        style={{
          position: 'absolute', top: 6, right: 6, zIndex: 2,
          background: 'rgba(0,0,0,0.35)', border: 'none', cursor: 'pointer',
          color: '#fff', padding: 0,
          width: 22, height: 22, borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <svg width={10} height={10} viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round">
          <path d="M1.5 1.5l7 7M8.5 1.5l-7 7"/>
        </svg>
      </button>

      {/* Senaste turens bild, eller ett mönster */}
      <Link href={href} aria-hidden tabIndex={-1} style={{ display: 'block', position: 'relative', height: 92, overflow: 'hidden',
        background: user.foto ? 'var(--teal-12)' : 'repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0 6px, transparent 6px 14px), var(--grad-sea)' }}>
        {user.foto && (isNextImageSafe(user.foto)
          ? <Image src={user.foto} alt="" fill sizes="168px" style={{ objectFit: 'cover' }} />
          /* eslint-disable-next-line @next/next/no-img-element */
          : <img src={user.foto} alt="" loading="lazy" decoding="async" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />)}
      </Link>

      {/* Avatar över bildkanten */}
      <Link href={href} style={{ textDecoration: 'none', alignSelf: 'center', marginTop: -28, position: 'relative' }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: grad, position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 20, fontWeight: 700, color: '#fff',
          overflow: 'hidden',
          border: '3px solid var(--surface, #fffdf8)',
          boxSizing: 'content-box',
        }}>
          {user.avatar
            ? <Image src={user.avatar} alt="" fill sizes="56px" style={{ objectFit: 'cover' }} />
            : user.username[0]?.toUpperCase()}
        </div>
      </Link>

      <Link href={href} style={{ textDecoration: 'none' }}>
        <div style={{
          fontSize: 14, fontWeight: 700, color: 'var(--ink, #162d3a)',
          marginTop: 8, padding: '0 8px',
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>
          {user.username}
        </div>
      </Link>

      <div style={{
        fontSize: 12, color: 'var(--ink-muted, #54737f)',
        marginTop: 2, padding: '0 8px',
        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
      }}>
        {user.turRad ?? user.orsak}
      </div>

      {myId && myId !== user.id && (
        <div style={{ padding: 10, marginTop: 'auto' }}>
          <FollowButton targetUserId={user.id} platt />
        </div>
      )}
    </div>
  )
}

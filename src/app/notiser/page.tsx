'use client'
export const dynamic = 'force-dynamic'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import EmptyState from '@/components/EmptyState'
import { radius, fontSize, fontWeight, shadow } from '@/lib/tokens'

type Notif = {
  id:             string
  type:           'like' | 'comment' | 'follow' | 'tag'
  read:           boolean
  created_at:     string
  trip_id:        string | null
  actor_id:       string
  actor_username: string
  actor_avatar:   string | null
}

const TYPE_LABEL: Record<string, string> = {
  like:    'gillade din tur',
  comment: 'kommenterade din tur',
  follow:  'börjar följa dig',
  tag:     'taggade dig i en tur',
}

const TYPE_EMOJI: Record<string, string> = {
  like:    '❤️',
  comment: '💬',
  follow:  '👋',
  tag:     '🏷️',
}

const TYPE_COLOR: Record<string, string> = {
  like:    'rgba(201,110,42,0.12)',
  comment: 'rgba(30,92,130,0.10)',
  follow:  'rgba(34,197,94,0.10)',
  tag:     'rgba(124,77,30,0.10)',
}

function groupByDate(notifs: Notif[]): { label: string; items: Notif[] }[] {
  const now  = Date.now()
  const day  = 86400 * 1000
  const groups: Record<string, Notif[]> = { 'Idag': [], 'Igår': [], 'Den här veckan': [], 'Äldre': [] }

  for (const n of notifs) {
    const age = now - new Date(n.created_at).getTime()
    if (age < day)        groups['Idag'].push(n)
    else if (age < 2*day) groups['Igår'].push(n)
    else if (age < 7*day) groups['Den här veckan'].push(n)
    else                  groups['Äldre'].push(n)
  }

  return Object.entries(groups)
    .filter(([, items]) => items.length > 0)
    .map(([label, items]) => ({ label, items }))
}

function timeAgo(iso: string): string {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (diff < 60) return 'just nu'
  if (diff < 3600) return `${Math.floor(diff/60)} min`
  if (diff < 86400) return `${Math.floor(diff/3600)} h`
  if (diff < 604800) return `${Math.floor(diff/86400)} d`
  return new Date(iso).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })
}

export default function NotiserPage() {
  const router = useRouter()
  const supabase = useRef(createClient()).current

  const [notifs,  setNotifs]  = useState<Notif[]>([])
  const [loading, setLoading] = useState(true)
  const [userId,  setUserId]  = useState<string | null>(null)

  // Track whether THIS session navigated to /notiser (vs landed directly via push/PWA)
  const wasNavigatedRef = useRef(false)
  useEffect(() => {
    // Read referrer once on mount; same-origin referrer ⇒ user came from inside the app
    if (typeof document !== 'undefined' && document.referrer) {
      try {
        const ref = new URL(document.referrer)
        if (ref.origin === window.location.origin && ref.pathname !== '/notiser') {
          wasNavigatedRef.current = true
        }
      } catch { /* ignore */ }
    }
  }, [])

  function handleBack() {
    if (wasNavigatedRef.current) {
      router.back()
    } else {
      // Direct entry (push, PWA shortcut, deep link) → safe fallback
      router.push('/feed')
    }
  }

  useEffect(() => {
    let channel: ReturnType<typeof supabase.channel> | null = null

    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      const uid = user.id
      setUserId(uid)
      load(uid)

      channel = supabase
        .channel(`notiser-page:${uid}`)
        .on('postgres_changes',
          { event: 'INSERT', schema: 'public', table: 'notifications', filter: `user_id=eq.${uid}` },
          () => load(uid),
        )
        .subscribe()
    })

    return () => { if (channel) supabase.removeChannel(channel) }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  async function load(uid: string) {
    const { data } = await supabase
      .from('notifications')
      .select('id, type, read, created_at, trip_id, actor_id')
      .eq('user_id', uid)
      .order('created_at', { ascending: false })
      .limit(100)

    const rows = (data ?? []) as (Omit<Notif, 'actor_username' | 'actor_avatar'> & { actor_id: string })[]
    const actorIds = [...new Set(rows.map(r => r.actor_id).filter(Boolean))]
    const { data: uRows } = actorIds.length
      ? await supabase.from('users').select('id, username, avatar').in('id', actorIds)
      : { data: [] }
    const umap: Record<string, { username: string; avatar: string | null }> = {}
    for (const u of uRows ?? []) umap[u.id] = { username: u.username, avatar: u.avatar ?? null }

    const enriched: Notif[] = rows.map(r => ({
      ...r,
      actor_username: umap[r.actor_id]?.username ?? 'Någon',
      actor_avatar:   umap[r.actor_id]?.avatar ?? null,
    }))
    setNotifs(enriched)
    setLoading(false)

    // Mark all unread as read
    const unreadIds = enriched.filter(n => !n.read).map(n => n.id)
    if (unreadIds.length > 0) {
      supabase.from('notifications').update({ read: true }).in('id', unreadIds).then(() => {
        setNotifs(prev => prev.map(n => ({ ...n, read: true })))
      })
    }
  }

  const groups = groupByDate(notifs)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 16px)' }}>

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <button
          onClick={handleBack}
          style={{
            width: 36, height: 36, borderRadius: '50%', background: 'rgba(10,123,140,0.08)',
            border: 'none', cursor: 'pointer', flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            WebkitTapHighlightColor: 'transparent',
          }}
          aria-label="Gå tillbaka"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h1 style={{ fontSize: 17, fontWeight: 700, color: 'var(--sea)', margin: 0 }}>Notiser</h1>
        {notifs.length > 0 && (
          <span style={{ marginLeft: 'auto', fontSize: 12, color: 'var(--txt3)' }}>
            {notifs.length} totalt
          </span>
        )}
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '12px 14px' }}>

        {/* ── Loading ── */}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
            <div style={{ width: 28, height: 28, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
          </div>
        )}

        {/* ── Not logged in ── */}
        {!loading && !userId && (
          <div style={{ textAlign: 'center', padding: '80px 24px' }}>
            <div style={{ fontSize: 52, marginBottom: 16 }}>🔔</div>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: 'var(--txt)', marginBottom: 8 }}>Logga in för notiser</h2>
            <p style={{ fontSize: 14, color: 'var(--txt3)', marginBottom: 24, lineHeight: 1.5 }}>
              Logga in för att se när folk gillar och kommenterar dina turer.
            </p>
            <Link href="/logga-in" style={{
              display: 'inline-block', padding: '12px 28px', borderRadius: 14,
              background: 'var(--grad-sea)',
              color: '#fff', fontWeight: 700, fontSize: 14, textDecoration: 'none',
            }}>
              Logga in →
            </Link>
          </div>
        )}

        {/* ── Empty state ── */}
        {!loading && userId && notifs.length === 0 && (
          <EmptyState
            icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>}
            title="Inga notiser ännu"
            body="Logga en tur — när folk gillar eller kommenterar den dyker det upp här."
            cta={{ label: 'Logga en tur', href: '/logga' }}
          />
        )}

        {/* ── Grouped notifications ── */}
        {!loading && groups.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {groups.map(({ label, items }) => (
              <section key={label}>
                <div style={{ fontSize: fontSize.caption, fontWeight: fontWeight.semibold, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 8, paddingLeft: 2 }}>
                  {label}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {items.map(n => (
                    <Link
                      key={n.id}
                      href={n.type === 'follow' ? `/u/${n.actor_username}` : n.trip_id ? `/tur/${n.trip_id}` : '#'}
                      style={{ textDecoration: 'none' }}
                    >
                      <div style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        minHeight: 64, padding: '10px 14px',
                        borderRadius: radius.md,
                        background: n.read ? 'var(--white)' : `${TYPE_COLOR[n.type]}`,
                        border: '1px solid rgba(10,123,140,0.08)',
                        boxShadow: shadow.xs,
                        WebkitTapHighlightColor: 'transparent',
                        position: 'relative',
                      }}>
                        {/* Unread bar */}
                        {!n.read && (
                          <div style={{
                            position: 'absolute', left: 0, top: 12, bottom: 12,
                            width: 3, borderRadius: '0 2px 2px 0',
                            background: 'var(--sea)',
                          }} />
                        )}

                        {/* Actor avatar */}
                        <Link href={`/u/${n.actor_username}`} onClick={e => e.stopPropagation()} style={{ textDecoration: 'none', flexShrink: 0 }}>
                          <div style={{
                            width: 44, height: 44, borderRadius: '50%',
                            background: 'var(--grad-sea)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: '#fff', overflow: 'hidden',
                          }}>
                            {n.actor_avatar
                              ? <Image src={n.actor_avatar} alt={n.actor_username} width={44} height={44} style={{ objectFit: 'cover' }} />
                              : n.actor_username[0]?.toUpperCase() ?? '?'
                            }
                          </div>
                        </Link>

                        {/* Text */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: fontSize.small, color: 'var(--txt)', lineHeight: 1.4 }}>
                            <Link href={`/u/${n.actor_username}`} onClick={e => e.stopPropagation()} style={{ color: 'var(--sea)', fontWeight: fontWeight.semibold, textDecoration: 'none' }}>
                              {n.actor_username}
                            </Link>
                            {' '}{TYPE_LABEL[n.type]} {TYPE_EMOJI[n.type]}
                          </div>
                          <div style={{ fontSize: fontSize.caption, color: 'var(--txt3)', marginTop: 3 }}>
                            {timeAgo(n.created_at)}
                          </div>
                        </div>

                        {/* Unread dot */}
                        {!n.read && (
                          <div style={{
                            width: 8, height: 8, borderRadius: '50%',
                            background: 'var(--sea)', flexShrink: 0,
                          }} />
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

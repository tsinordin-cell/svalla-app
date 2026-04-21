'use client'

import { useEffect, useState, useRef, useMemo } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { avatarGradient, initialsOf } from '@/lib/utils'
import { radius, fontWeight, fontSize, space, shadow, duration, easing } from '@/lib/tokens'

type ConvRow = {
  id: string
  is_group: boolean
  title: string | null
  status: 'active' | 'request' | 'declined'
  created_by: string | null
  last_message_at: string
  last_message_preview: string | null
  last_message_user_id: string | null
  other_username?: string
  other_avatar?: string | null
  other_id?: string
  unread?: number
}

type Tab = 'active' | 'requests'

/** Formatera tidsstämpel: nu / 5m / 2h / Igår / Mån / 15 apr */
function fmtTime(iso: string): string {
  const d = new Date(iso)
  const now = Date.now()
  const diff = now - d.getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return 'nu'
  if (mins < 60) return `${mins}m`
  if (mins < 1440) return `${Math.floor(mins / 60)}h`
  const days = Math.floor(mins / 1440)
  if (days === 1) return 'Igår'
  if (days < 7) return d.toLocaleDateString('sv-SE', { weekday: 'short' }).replace('.', '')
  return d.toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' }).replace('.', '')
}

export default function MeddelandenPage() {
  const supabase = useRef(createClient()).current
  const [me, setMe] = useState<string | null>(null)
  const [convs, setConvs] = useState<ConvRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('active')
  const [query, setQuery] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      setMe(user.id)
      load(user.id)
    })

    const ch = supabase
      .channel('inbox-feed')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        () => { supabase.auth.getUser().then(({ data: { user } }) => user && load(user.id)) }
      )
      .on('postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'conversations' },
        (payload) => {
          const upd = payload.new as Partial<ConvRow>
          setConvs(prev => {
            const updated = prev.map(c =>
              c.id === upd.id
                ? {
                    ...c,
                    last_message_preview: upd.last_message_preview ?? c.last_message_preview,
                    last_message_at: upd.last_message_at ?? c.last_message_at,
                    last_message_user_id: upd.last_message_user_id ?? c.last_message_user_id,
                    status: (upd.status as ConvRow['status']) ?? c.status,
                  }
                : c
            )
            return [...updated].sort(
              (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
            )
          })
        }
      )
      .subscribe()

    return () => { supabase.removeChannel(ch) }
  }, [supabase])

  async function load(userId: string) {
    try {
      setLoading(true)
      setError(false)

      const { data: parts, error: partsErr } = await supabase
        .from('conversation_participants')
        .select('conversation_id, last_read_at')
        .eq('user_id', userId)

      if (partsErr) { setConvs([]); setLoading(false); return }
      const ids = (parts ?? []).map(p => p.conversation_id as string)
      if (ids.length === 0) { setConvs([]); setLoading(false); return }

      const lastReadMap: Record<string, string> = {}
      for (const p of parts ?? []) lastReadMap[p.conversation_id as string] = p.last_read_at as string

      const { data: cs, error: csErr } = await supabase
        .from('conversations')
        .select('id, is_group, title, status, created_by, last_message_at, last_message_preview, last_message_user_id')
        .in('id', ids)
        .order('last_message_at', { ascending: false })

      if (csErr || !cs) { setConvs([]); setLoading(false); return }
      const filtered = cs.filter(c => (c as ConvRow).status !== 'declined')

      const oneToOneIds = filtered.filter(c => !c.is_group).map(c => c.id)
      const otherMap: Record<string, { id: string; username: string; avatar: string | null }> = {}
      if (oneToOneIds.length > 0) {
        const { data: others } = await supabase
          .from('conversation_participants')
          .select('conversation_id, user_id')
          .in('conversation_id', oneToOneIds)
          .neq('user_id', userId)
        const otherIds = [...new Set((others ?? []).map(o => o.user_id as string))]
        if (otherIds.length > 0) {
          const { data: users } = await supabase
            .from('users').select('id, username, avatar').in('id', otherIds)
          const userById: Record<string, { id: string; username: string; avatar: string | null }> = {}
          for (const u of users ?? []) userById[u.id] = { id: u.id, username: u.username, avatar: u.avatar ?? null }
          for (const o of others ?? []) {
            const u = userById[o.user_id as string]
            if (u) otherMap[o.conversation_id as string] = u
          }
        }
      }

      const enriched: ConvRow[] = []
      for (const c of filtered) {
        const lr = lastReadMap[c.id] ?? '1970-01-01T00:00:00Z'
        const { count } = await supabase
          .from('messages')
          .select('id', { count: 'exact', head: true })
          .eq('conversation_id', c.id)
          .gt('created_at', lr)
          .neq('user_id', userId)
        const o = otherMap[c.id]
        enriched.push({
          ...(c as ConvRow),
          other_username: o?.username,
          other_avatar: o?.avatar ?? null,
          other_id: o?.id,
          unread: count ?? 0,
        })
      }

      setConvs(enriched)
      setLoading(false)
    } catch {
      setConvs([])
      setError(true)
      setLoading(false)
    }
  }

  const activeConvs  = convs.filter(c => c.status === 'active' || (c.status === 'request' && c.created_by === me))
  const requestConvs = convs.filter(c => c.status === 'request' && c.created_by !== me)

  const visibleConvs = useMemo(() => {
    const base = tab === 'requests' ? requestConvs : activeConvs
    if (!query.trim()) return base
    const q = query.trim().toLowerCase()
    return base.filter(c => {
      const name = c.is_group ? (c.title ?? '') : (c.other_username ?? '')
      return name.toLowerCase().includes(q)
    })
  }, [tab, activeConvs, requestConvs, query])

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>

      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border-subtle, rgba(10,123,140,0.10))',
      }}>
        <div style={{ maxWidth: 560, margin: '0 auto', padding: `${space[3]}px ${space[4]}px ${space[2]}px` }}>

          {/* Title row */}
          <div style={{ display: 'flex', alignItems: 'center', gap: space[3] }}>
            <Link href="/feed" aria-label="Tillbaka" style={{
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginLeft: -space[3], flexShrink: 0,
              WebkitTapHighlightColor: 'transparent',
              textDecoration: 'none',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt2,#3d5865)" strokeWidth={1.75} style={{ width: 20, height: 20 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 style={{
              flex: 1, margin: 0,
              fontSize: fontSize.title, fontWeight: fontWeight.semibold,
              color: 'var(--txt)',
            }}>
              Meddelanden
            </h1>
            {/* Nytt meddelande pill */}
            <Link href="/meddelanden/ny" style={{
              display: 'flex', alignItems: 'center', gap: 6,
              height: 36, padding: `0 ${space[3]}px`,
              borderRadius: radius.sm,
              background: 'var(--sea, #1e5c82)',
              color: '#fff',
              fontSize: fontSize.small, fontWeight: fontWeight.semibold,
              textDecoration: 'none',
              flexShrink: 0,
              transition: `opacity ${duration.fast}ms ${easing}`,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.75} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
              </svg>
              Nytt
            </Link>
          </div>

          {/* Search */}
          <div style={{ position: 'relative', marginTop: space[2] }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={1.75}
              style={{ width: 16, height: 16, position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Sök i meddelanden"
              style={{
                width: '100%', boxSizing: 'border-box',
                height: 40, padding: `0 ${space[3]}px 0 36px`,
                borderRadius: radius.sm,
                border: '1px solid var(--border-subtle, rgba(10,123,140,0.12))',
                background: 'var(--surface-2, rgba(10,123,140,0.05))',
                color: 'var(--txt)',
                fontSize: fontSize.small, fontWeight: fontWeight.regular,
                outline: 'none',
                appearance: 'none',
              }}
            />
          </div>
        </div>

        {/* Segmented control tabs */}
        {!loading && me && (
          <div style={{ maxWidth: 560, margin: '0 auto', padding: `${space[2]}px ${space[4]}px 0` }}>
            <div style={{
              display: 'flex', gap: 4,
              background: 'var(--surface-2, rgba(10,123,140,0.06))',
              borderRadius: radius.sm,
              padding: 3,
              height: 36,
            }}>
              <SegTab active={tab === 'active'} onClick={() => setTab('active')}>
                Aktiva
                {activeConvs.length > 0 && (
                  <span style={{
                    marginLeft: 5,
                    background: tab === 'active' ? 'rgba(30,92,130,0.12)' : 'rgba(0,0,0,0.07)',
                    color: tab === 'active' ? 'var(--sea)' : 'var(--txt3)',
                    fontSize: 10, fontWeight: fontWeight.semibold,
                    borderRadius: radius.full, padding: '2px 6px',
                  }}>{activeConvs.length}</span>
                )}
              </SegTab>
              <SegTab active={tab === 'requests'} onClick={() => setTab('requests')}>
                Förfrågningar
                {requestConvs.length > 0 && (
                  <span style={{
                    marginLeft: 5,
                    background: '#c96e2a',
                    color: '#fff',
                    fontSize: 10, fontWeight: fontWeight.semibold,
                    borderRadius: radius.full, padding: '2px 6px',
                  }}>{requestConvs.length > 9 ? '9+' : requestConvs.length}</span>
                )}
              </SegTab>
            </div>
          </div>
        )}

        <div style={{ height: space[2] }} />
      </header>

      {/* ── Body ───────────────────────────────────────────────────────────── */}
      <div style={{ maxWidth: 560, margin: '0 auto', paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 16px)' }}>

        {/* Loading skeletons */}
        {loading && (
          <div>
            {[0,1,2,3].map(i => (
              <SkeletonRow key={i} />
            ))}
          </div>
        )}

        {/* Ej inloggad */}
        {!loading && me === null && (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: radius.md,
              background: 'var(--surface-2, rgba(10,123,140,0.06))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea,#1e5c82)" strokeWidth={1.75} style={{ width: 28, height: 28 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h2 style={{ fontSize: fontSize.subtitle, fontWeight: fontWeight.semibold, color: 'var(--txt)', margin: '0 0 8px' }}>
              Logga in för att chatta
            </h2>
            <p style={{ fontSize: fontSize.body, color: 'var(--txt3)', margin: '0 0 24px', lineHeight: 1.5, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
              Anslut med andra seglare direkt i appen.
            </p>
            <Link href="/logga-in" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: 44, padding: `0 ${space[6]}px`,
              borderRadius: radius.full,
              background: 'var(--sea,#1e5c82)', color: '#fff',
              fontSize: fontSize.bodyEmph, fontWeight: fontWeight.semibold,
              textDecoration: 'none',
            }}>
              Logga in
            </Link>
          </div>
        )}

        {/* Fel */}
        {error && (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <p style={{ fontSize: fontSize.body, color: 'var(--txt3)', marginBottom: 16 }}>
              Kunde inte ladda meddelanden.
            </p>
            <button
              onClick={() => me && load(me)}
              style={{
                height: 44, padding: `0 ${space[6]}px`,
                borderRadius: radius.full, border: 'none', cursor: 'pointer',
                background: 'var(--sea,#1e5c82)', color: '#fff',
                fontSize: fontSize.bodyEmph, fontWeight: fontWeight.semibold,
              }}
            >
              Försök igen
            </button>
          </div>
        )}

        {/* Tom inkorg */}
        {!loading && !error && me && convs.length === 0 && (
          <div style={{ padding: '64px 24px', textAlign: 'center' }}>
            <div style={{
              width: 64, height: 64, borderRadius: radius.md,
              background: 'var(--surface-2, rgba(10,123,140,0.06))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea,#1e5c82)" strokeWidth={1.75} style={{ width: 28, height: 28 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
              </svg>
            </div>
            <h2 style={{ fontSize: fontSize.subtitle, fontWeight: fontWeight.semibold, color: 'var(--txt)', margin: '0 0 8px' }}>
              Inga meddelanden än
            </h2>
            <p style={{ fontSize: fontSize.body, color: 'var(--txt3)', margin: '0 0 24px', lineHeight: 1.5, maxWidth: 280, marginLeft: 'auto', marginRight: 'auto' }}>
              Starta en konversation med en seglare du följer.
            </p>
            <Link href="/meddelanden/ny" style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              height: 44, padding: `0 ${space[6]}px`,
              borderRadius: radius.full,
              background: 'var(--sea,#1e5c82)', color: '#fff',
              fontSize: fontSize.bodyEmph, fontWeight: fontWeight.semibold,
              textDecoration: 'none',
            }}>
              Hitta seglare
            </Link>
          </div>
        )}

        {/* Tom flik */}
        {!loading && !error && me && convs.length > 0 && visibleConvs.length === 0 && (
          <div style={{ padding: '40px 24px', textAlign: 'center', fontSize: fontSize.small, color: 'var(--txt3)' }}>
            {query ? `Inga träffar för "${query}"` : tab === 'requests' ? 'Inga förfrågningar.' : 'Inga aktiva konversationer.'}
          </div>
        )}

        {/* Konversationslista */}
        {!loading && !error && me && visibleConvs.map((c, i) => (
          <ConvRow key={c.id} c={c} me={me} isLast={i === visibleConvs.length - 1} />
        ))}
      </div>
    </div>
  )
}

// ─── Conv row ────────────────────────────────────────────────────────────────

function ConvRow({ c, me, isLast }: { c: ConvRow; me: string; isLast: boolean }) {
  const display   = c.is_group ? (c.title ?? 'Gruppchatt') : (c.other_username ?? 'Seglare')
  const grad      = avatarGradient(c.is_group ? (c.title ?? c.id) : (c.other_username ?? c.other_id ?? c.id))
  const initials  = initialsOf(display)
  const isFromMe  = c.last_message_user_id === me
  const unread    = c.unread ?? 0
  const isPending = c.status === 'request' && c.created_by === me
  const isReq     = c.status === 'request' && c.created_by !== me

  const preview = (() => {
    if (!c.last_message_preview) return 'Skriv första meddelandet'
    const prefix = isFromMe ? 'Du: ' : ''
    return prefix + c.last_message_preview
  })()

  return (
    <Link href={`/meddelanden/${c.id}`} style={{ textDecoration: 'none', display: 'block' }}>
      <div style={{
        display: 'flex', alignItems: 'center',
        height: 72,
        paddingLeft: space[4], paddingRight: space[4],
        background: unread > 0 ? 'var(--unread-bg, rgba(30,92,130,0.04))' : 'transparent',
        position: 'relative',
        transition: `background ${duration.fast}ms ${easing}`,
        WebkitTapHighlightColor: 'transparent',
        cursor: 'pointer',
      }}>
        {/* Unread dot — left edge */}
        {unread > 0 && (
          <div style={{
            position: 'absolute', left: 5,
            width: 8, height: 8, borderRadius: '50%',
            background: 'var(--sea,#1e5c82)',
            top: '50%', transform: 'translateY(-50%)',
          }} />
        )}

        {/* Avatar — square 44px */}
        <div style={{
          width: 44, height: 44, flexShrink: 0,
          borderRadius: radius.sm,
          background: grad,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: '#fff', fontWeight: fontWeight.semibold,
          fontSize: fontSize.bodyEmph,
          overflow: 'hidden', position: 'relative',
          marginRight: space[3],
        }}>
          {c.other_avatar
            // eslint-disable-next-line @next/next/no-img-element
            ? <img src={c.other_avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
            : initials
          }
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
            <span style={{
              fontSize: fontSize.bodyEmph,
              fontWeight: unread > 0 ? fontWeight.semibold : fontWeight.medium,
              color: 'var(--txt)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {display}
            </span>
            <span style={{
              fontSize: fontSize.caption, fontWeight: fontWeight.medium,
              color: 'var(--txt3)', flexShrink: 0,
            }}>
              {fmtTime(c.last_message_at)}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
            {isReq && (
              <span style={{
                fontSize: 10, fontWeight: fontWeight.semibold,
                color: '#c96e2a',
                background: 'rgba(201,110,42,0.10)',
                borderRadius: radius.xs, padding: '2px 6px', flexShrink: 0,
                textTransform: 'uppercase', letterSpacing: 0.3,
              }}>Förfrågan</span>
            )}
            {isPending && (
              <span style={{
                fontSize: 10, fontWeight: fontWeight.medium,
                color: 'var(--txt3)',
                background: 'var(--surface-2,rgba(10,123,140,0.06))',
                borderRadius: radius.xs, padding: '2px 6px', flexShrink: 0,
                textTransform: 'uppercase', letterSpacing: 0.3,
              }}>Väntar</span>
            )}
            <span style={{
              flex: 1, minWidth: 0,
              fontSize: fontSize.small,
              fontWeight: unread > 0 ? fontWeight.medium : fontWeight.regular,
              color: unread > 0 ? 'var(--txt)' : 'var(--txt3)',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {preview}
            </span>
            {unread > 0 && (
              <span style={{
                fontSize: 10, fontWeight: fontWeight.semibold,
                background: '#c96e2a', color: '#fff',
                borderRadius: radius.full, padding: '2px 7px', flexShrink: 0,
                minWidth: 18, textAlign: 'center',
              }}>{unread > 99 ? '99+' : unread}</span>
            )}
          </div>
        </div>

        {/* Row separator — indented past avatar */}
        {!isLast && (
          <div style={{
            position: 'absolute', bottom: 0,
            left: space[4] + 44 + space[3],
            right: 0,
            height: 1,
            background: 'var(--border-subtle, rgba(10,123,140,0.08))',
          }} />
        )}
      </div>
    </Link>
  )
}

// ─── Segmented control tab ───────────────────────────────────────────────────

function SegTab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1, height: '100%',
        border: 'none', cursor: 'pointer',
        borderRadius: radius.xs,
        background: active ? 'var(--bg, #fff)' : 'transparent',
        boxShadow: active ? shadow.xs : 'none',
        fontSize: fontSize.small, fontWeight: active ? fontWeight.semibold : fontWeight.medium,
        color: active ? 'var(--txt)' : 'var(--txt3)',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        transition: `background ${duration.fast}ms ${easing}, box-shadow ${duration.fast}ms ${easing}`,
        WebkitTapHighlightColor: 'transparent',
        padding: '0 8px',
      }}
    >
      {children}
    </button>
  )
}

// ─── Skeleton row ────────────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', height: 72, paddingLeft: space[4], paddingRight: space[4] }}>
      <div style={{
        width: 44, height: 44, borderRadius: radius.sm, flexShrink: 0,
        background: 'var(--surface-2, rgba(10,123,140,0.06))',
        marginRight: space[3],
        animation: 'shimmer 1.6s ease-in-out infinite',
      }} />
      <div style={{ flex: 1 }}>
        <div style={{
          width: '40%', height: 14, borderRadius: radius.xs,
          background: 'var(--surface-2, rgba(10,123,140,0.06))',
          marginBottom: 8,
          animation: 'shimmer 1.6s ease-in-out infinite',
        }} />
        <div style={{
          width: '70%', height: 12, borderRadius: radius.xs,
          background: 'var(--surface-2, rgba(10,123,140,0.06))',
          animation: 'shimmer 1.6s ease-in-out infinite .2s',
        }} />
      </div>
      <style>{`
        @keyframes shimmer {
          0%,100% { opacity:.5 }
          50% { opacity:1 }
        }
      `}</style>
    </div>
  )
}

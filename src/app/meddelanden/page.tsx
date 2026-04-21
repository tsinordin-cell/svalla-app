'use client'

import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { timeAgoShort, avatarGradient, initialsOf } from '@/lib/utils'

type ConvRow = {
  id: string
  is_group: boolean
  title: string | null
  status: 'active' | 'request' | 'declined'
  created_by: string | null
  last_message_at: string
  last_message_preview: string | null
  last_message_user_id: string | null
  // härledda fält
  other_username?: string
  other_avatar?: string | null
  other_id?: string
  unread?: number
}

type Tab = 'active' | 'requests'

export default function MeddelandenPage() {
  const supabase = useRef(createClient()).current
  const [me, setMe] = useState<string | null>(null)
  const [convs, setConvs] = useState<ConvRow[]>([])
  const [loading, setLoading] = useState(true)
  const [tab, setTab] = useState<Tab>('active')

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      setMe(user.id)
      load(user.id)
    })
    // realtime — uppdatera när nya meddelanden kommer
    const ch = supabase
      .channel('inbox-feed')
      .on('postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'messages' },
        () => { supabase.auth.getUser().then(({ data: { user } }) => user && load(user.id)) }
      )
      .subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [supabase])

  async function load(userId: string) {
    setLoading(true)

    // 1. mina deltagar-rader → conv ids + last_read_at
    const { data: parts } = await supabase
      .from('conversation_participants')
      .select('conversation_id, last_read_at')
      .eq('user_id', userId)

    const ids = (parts ?? []).map(p => p.conversation_id as string)
    if (ids.length === 0) { setConvs([]); setLoading(false); return }

    const lastReadMap: Record<string, string> = {}
    for (const p of parts ?? []) lastReadMap[p.conversation_id as string] = p.last_read_at as string

    // 2. konversationer (skippa declined — de är "bortkastade")
    const { data: cs } = await supabase
      .from('conversations')
      .select('id, is_group, title, status, created_by, last_message_at, last_message_preview, last_message_user_id')
      .in('id', ids)
      .neq('status', 'declined')
      .order('last_message_at', { ascending: false })

    if (!cs) { setConvs([]); setLoading(false); return }

    // 3. för 1-till-1 — hämta motpartens info
    const oneToOneIds = cs.filter(c => !c.is_group).map(c => c.id)
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

    // 4. olästa per konversation
    const enriched: ConvRow[] = []
    for (const c of cs) {
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
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 16px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/feed" aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: 'var(--txt)', margin: 0 }}>Meddelanden</h1>
          <Link href="/meddelanden/ny" aria-label="Ny konversation" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </Link>
        </div>
      </header>

      {/* Tabs: Aktiva / Förfrågningar */}
      {!loading && me && (() => {
        const activeCount = convs.filter(c => c.status === 'active' || (c.status === 'request' && c.created_by === me)).length
        const requestCount = convs.filter(c => c.status === 'request' && c.created_by !== me).length
        return (
          <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px', borderBottom: '1px solid rgba(10,123,140,0.08)' }}>
            <div style={{ display: 'flex', gap: 4 }}>
              <TabButton active={tab === 'active'} onClick={() => setTab('active')}>
                Aktiva {activeCount > 0 && <span style={{ color: 'var(--txt3)', fontWeight: 600 }}>· {activeCount}</span>}
              </TabButton>
              <TabButton active={tab === 'requests'} onClick={() => setTab('requests')}>
                Förfrågningar
                {requestCount > 0 && (
                  <span style={{
                    background: '#c96e2a', color: '#fff',
                    fontSize: 10, fontWeight: 800,
                    borderRadius: 10, padding: '2px 7px', marginLeft: 6,
                  }}>
                    {requestCount > 9 ? '9+' : requestCount}
                  </span>
                )}
              </TabButton>
            </div>
          </div>
        )
      })()}

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '8px 0' }}>
        {loading && (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
          </div>
        )}

        {!loading && me === null && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <p style={{ color: 'var(--txt3)', fontSize: 14, marginBottom: 16 }}>Logga in för att se dina meddelanden</p>
            <Link href="/logga-in" style={{ display: 'inline-block', padding: '10px 20px', borderRadius: 12, background: '#1e5c82', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              Logga in
            </Link>
          </div>
        )}

        {!loading && me && convs.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 52, marginBottom: 12 }}>💬</div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1e5c82', marginBottom: 6 }}>Inga meddelanden ännu</h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 18, lineHeight: 1.5 }}>
              Hitta en seglare att skriva till.
            </p>
            <Link href="/meddelanden/ny" style={{ display: 'inline-block', padding: '10px 22px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none' }}>
              Hitta seglare →
            </Link>
          </div>
        )}

        {!loading && me && (() => {
          const visible = convs.filter(c => {
            if (tab === 'requests') return c.status === 'request' && c.created_by !== me
            // active-fliken: aktiva + egna skickade förfrågningar (de som väntar på svar)
            return c.status === 'active' || (c.status === 'request' && c.created_by === me)
          })

          if (convs.length > 0 && visible.length === 0) {
            return (
              <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 14 }}>
                {tab === 'requests' ? 'Inga förfrågningar just nu.' : 'Inga aktiva konversationer.'}
              </div>
            )
          }

          return visible.map(c => {
            const display = c.is_group ? (c.title ?? 'Gruppchatt') : (c.other_username ?? 'Seglare')
            const grad = avatarGradient(c.is_group ? (c.title ?? c.id) : (c.other_username ?? c.other_id ?? c.id))
            const initials = initialsOf(display)
            const isFromMe = c.last_message_user_id === me
            const unread = c.unread ?? 0
            const isPendingOut = c.status === 'request' && c.created_by === me
            const isIncomingReq = c.status === 'request' && c.created_by !== me
            return (
              <Link key={c.id} href={`/meddelanden/${c.id}`} style={{ textDecoration: 'none' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '12px 16px',
                  borderBottom: '1px solid rgba(10,123,140,0.06)',
                  background: unread > 0 ? 'rgba(30,92,130,0.03)' : 'transparent',
                  WebkitTapHighlightColor: 'transparent',
                }}>
                  <div style={{
                    width: 50, height: 50, borderRadius: '50%', flexShrink: 0, position: 'relative',
                    background: grad,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', fontWeight: 800, fontSize: 16, overflow: 'hidden',
                  }}>
                    {c.other_avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={c.other_avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : initials}
                    {c.is_group && (
                      <div style={{ position: 'absolute', bottom: -2, right: -2, background: '#c96e2a', color: '#fff', fontSize: 10, fontWeight: 800, borderRadius: 10, padding: '2px 6px', border: '2px solid var(--bg)' }}>
                        grupp
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 }}>
                      <span style={{ fontSize: 14, fontWeight: unread > 0 ? 800 : 700, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {display}
                      </span>
                      <span style={{ fontSize: 11, color: 'var(--txt3)', flexShrink: 0 }}>
                        {timeAgoShort(c.last_message_at)}
                      </span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 2 }}>
                      {isIncomingReq && (
                        <span style={{
                          background: 'rgba(201,110,42,0.12)', color: '#c96e2a',
                          fontSize: 10, fontWeight: 800, borderRadius: 6, padding: '2px 6px', flexShrink: 0,
                          textTransform: 'uppercase', letterSpacing: 0.4,
                        }}>Förfrågan</span>
                      )}
                      {isPendingOut && (
                        <span style={{
                          background: 'rgba(122,157,171,0.16)', color: '#7a9dab',
                          fontSize: 10, fontWeight: 700, borderRadius: 6, padding: '2px 6px', flexShrink: 0,
                          textTransform: 'uppercase', letterSpacing: 0.4,
                        }}>Väntar</span>
                      )}
                      <span style={{
                        flex: 1,
                        fontSize: 13, color: unread > 0 ? 'var(--txt)' : 'var(--txt3)',
                        fontWeight: unread > 0 ? 600 : 400,
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {isFromMe && 'Du: '}{c.last_message_preview ?? 'Ingen aktivitet ännu'}
                      </span>
                      {unread > 0 && (
                        <span style={{
                          background: '#c96e2a', color: '#fff', fontSize: 10, fontWeight: 800,
                          borderRadius: 12, padding: '2px 7px', flexShrink: 0,
                        }}>{unread > 99 ? '99+' : unread}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            )
          })
        })()}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: '12px 8px',
        background: 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid #1e5c82' : '2px solid transparent',
        fontSize: 13,
        fontWeight: active ? 800 : 600,
        color: active ? 'var(--sea)' : 'var(--txt3)',
        cursor: 'pointer',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        WebkitTapHighlightColor: 'transparent',
      }}
    >
      {children}
    </button>
  )
}

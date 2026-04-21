'use client'
export const dynamic = 'force-dynamic'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { setAttendance, formatEventDate, type EventRow } from '@/lib/events'
import { avatarGradient, initialsOf } from '@/lib/utils'

type Attendee = {
  user_id: string
  status: 'going' | 'maybe' | 'no'
  username: string
  avatar: string | null
}

export default function EventDetailPage() {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const params = useParams<{ slug: string }>()
  const slug = params?.slug

  const [me, setMe] = useState<string | null>(null)
  const [ev, setEv] = useState<EventRow | null>(null)
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)
  const [notFound, setNotFound] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setMe(user.id)
      load(user?.id ?? null)
    })
  }, [supabase, slug])

  async function load(userId: string | null) {
    setLoading(true)

    // slug kan vara UUID (fallback) eller faktisk slug
    let q = supabase
      .from('events')
      .select('id, slug, title, description, image, starts_at, ends_at, location_name, lat, lng, club_id, created_by, created_at')
    q = /^[0-9a-f-]{36}$/i.test(slug as string) ? q.eq('id', slug) : q.eq('slug', slug)
    const { data: e } = await q.maybeSingle()
    if (!e) { setNotFound(true); setLoading(false); return }

    // attendees
    const { data: atts } = await supabase
      .from('event_attendees')
      .select('user_id, status, joined_at')
      .eq('event_id', e.id)
      .order('joined_at', { ascending: true })
    const userIds = [...new Set((atts ?? []).map(a => a.user_id as string))]
    let userMap: Record<string, { username: string; avatar: string | null }> = {}
    if (userIds.length > 0) {
      const { data: us } = await supabase.from('users').select('id, username, avatar').in('id', userIds)
      for (const u of us ?? []) {
        userMap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
      }
    }
    const attRows: Attendee[] = (atts ?? []).map(a => ({
      user_id: a.user_id as string,
      status: a.status as 'going' | 'maybe' | 'no',
      username: userMap[a.user_id as string]?.username ?? 'okänd',
      avatar: userMap[a.user_id as string]?.avatar ?? null,
    }))

    let clubName: string | null = null
    if (e.club_id) {
      const { data: c } = await supabase.from('clubs').select('name').eq('id', e.club_id).maybeSingle()
      clubName = (c?.name as string) ?? null
    }

    const going = attRows.filter(a => a.status === 'going').length
    const maybe = attRows.filter(a => a.status === 'maybe').length
    const myStatus = userId ? attRows.find(a => a.user_id === userId)?.status ?? null : null

    setEv({
      ...(e as EventRow),
      going_count: going,
      maybe_count: maybe,
      my_status: myStatus,
      club_name: clubName,
    })
    setAttendees(attRows)
    setLoading(false)
  }

  async function rsvp(status: 'going' | 'maybe' | 'no' | null) {
    if (!me || !ev) { router.push('/logga-in'); return }
    setBusy(true)
    const ok = await setAttendance(supabase, me, ev.id, status)
    setBusy(false)
    if (ok) load(me)
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🗓️</div>
          <h2 style={{ fontSize: 18, fontWeight: 800, color: '#1e5c82', marginBottom: 6 }}>Eventet hittades inte</h2>
          <Link href="/event" style={{ color: '#c96e2a', fontWeight: 700, fontSize: 13 }}>← Alla events</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 120 }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 16px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => router.back()} aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0, border: 'none',
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 style={{ flex: 1, fontSize: 16, fontWeight: 800, color: 'var(--txt)', margin: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {ev?.title ?? ''}
          </h1>
        </div>
      </header>

      {loading && (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
        </div>
      )}

      {!loading && ev && (
        <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
          {ev.image && (
            <div style={{ borderRadius: 16, overflow: 'hidden', marginBottom: 16 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ev.image} alt="" style={{ width: '100%', display: 'block' }} />
            </div>
          )}

          <h2 style={{ fontSize: 22, fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>{ev.title}</h2>

          <div style={{ padding: 14, borderRadius: 14, background: 'rgba(30,92,130,0.06)', marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#1e5c82', marginBottom: 4 }}>
              📅 {formatEventDate(ev.starts_at, ev.ends_at)}
            </div>
            {ev.location_name && (
              <div style={{ fontSize: 13, color: 'var(--txt2)' }}>
                📍 {ev.location_name}
              </div>
            )}
            {ev.club_name && (
              <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 4 }}>
                Arrangeras av {ev.club_name}
              </div>
            )}
          </div>

          {/* RSVP */}
          <div style={{ display: 'flex', gap: 6, marginBottom: 16 }}>
            {([
              { s: 'going' as const, label: 'Jag går', color: '#228c38' },
              { s: 'maybe' as const, label: 'Kanske', color: '#c96e2a' },
              { s: 'no' as const, label: 'Avstår', color: '#6b7280' },
            ]).map(opt => (
              <button key={opt.s} onClick={() => rsvp(ev.my_status === opt.s ? null : opt.s)} disabled={busy}
                style={{
                  flex: 1, padding: '10px 8px', borderRadius: 12,
                  border: ev.my_status === opt.s ? `2px solid ${opt.color}` : '1px solid rgba(10,123,140,0.20)',
                  background: ev.my_status === opt.s ? opt.color : 'var(--white)',
                  color: ev.my_status === opt.s ? '#fff' : 'var(--txt)',
                  fontWeight: 800, fontSize: 13, cursor: 'pointer',
                  opacity: busy ? 0.6 : 1,
                }}>
                {opt.label}
              </button>
            ))}
          </div>

          {ev.description && (
            <div style={{ marginBottom: 18 }}>
              <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', margin: '0 0 8px' }}>Om eventet</h3>
              <p style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                {ev.description}
              </p>
            </div>
          )}

          <div>
            <h3 style={{ fontSize: 14, fontWeight: 800, color: 'var(--txt)', margin: '0 0 10px' }}>
              Deltagare ({ev.going_count ?? 0})
            </h3>
            {attendees.filter(a => a.status === 'going').length === 0 && (
              <p style={{ fontSize: 12, color: 'var(--txt3)', fontStyle: 'italic' }}>Ingen anmäld ännu — bli först.</p>
            )}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {attendees.filter(a => a.status === 'going').map(a => (
                <Link key={a.user_id} href={`/u/${a.username}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '4px 10px 4px 4px', borderRadius: 20,
                    background: 'rgba(10,123,140,0.06)',
                  }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: '50%', overflow: 'hidden', position: 'relative',
                      background: avatarGradient(a.username),
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontWeight: 800, fontSize: 10,
                    }}>
                      {a.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={a.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                      ) : initialsOf(a.username)}
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--txt)' }}>{a.username}</span>
                  </div>
                </Link>
              ))}
            </div>

            {attendees.filter(a => a.status === 'maybe').length > 0 && (
              <>
                <h4 style={{ fontSize: 12, fontWeight: 800, color: 'var(--txt3)', margin: '14px 0 8px' }}>
                  Kanske ({ev.maybe_count ?? 0})
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {attendees.filter(a => a.status === 'maybe').map(a => (
                    <Link key={a.user_id} href={`/u/${a.username}`} style={{ textDecoration: 'none' }}>
                      <span style={{ fontSize: 12, color: 'var(--txt3)', background: 'rgba(10,123,140,0.04)', borderRadius: 12, padding: '3px 10px' }}>
                        @{a.username}
                      </span>
                    </Link>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

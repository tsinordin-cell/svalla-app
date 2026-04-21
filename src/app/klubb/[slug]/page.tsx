'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { joinClub, leaveClub, getOrCreateClubChat, type ClubBasic } from '@/lib/clubs'
import { avatarGradient, initialsOf, timeAgo } from '@/lib/utils'

type Member = {
  user_id: string
  role: 'owner' | 'admin' | 'member'
  joined_at: string
  username: string
  avatar: string | null
}

type Tab = 'om' | 'medlemmar' | 'turer'

type TripCard = {
  id: string
  created_at: string
  image: string | null
  caption: string | null
  location_name: string | null
  distance: number | null
  username: string
}

export default function KlubbPage() {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const params = useParams()
  const slug = params?.slug as string | undefined

  const [me, setMe] = useState<string | null>(null)
  const [club, setClub] = useState<ClubBasic | null>(null)
  const [members, setMembers] = useState<Member[]>([])
  const [trips, setTrips] = useState<TripCard[]>([])
  const [tab, setTab] = useState<Tab>('om')
  const [loading, setLoading] = useState(true)
  const [actionBusy, setActionBusy] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {
    if (!slug) return
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setMe(user.id)
      load(user?.id ?? null)
    })
  }, [supabase, slug])

  async function load(userId: string | null) {
    setLoading(true)
    const { data: c } = await supabase
      .from('clubs')
      .select('id, slug, name, description, image, is_public, region, created_by, created_at')
      .eq('slug', slug)
      .maybeSingle()
    if (!c) { setNotFound(true); setLoading(false); return }

    // medlemmar + användarinfo
    const { data: mems } = await supabase
      .from('club_members')
      .select('user_id, role, joined_at')
      .eq('club_id', c.id)
      .order('joined_at', { ascending: true })
    const memberIds = (mems ?? []).map(m => m.user_id as string)
    let userMap: Record<string, { username: string; avatar: string | null }> = {}
    if (memberIds.length > 0) {
      const { data: us } = await supabase
        .from('users').select('id, username, avatar').in('id', memberIds)
      for (const u of us ?? []) {
        userMap[u.id as string] = { username: u.username as string, avatar: (u.avatar ?? null) as string | null }
      }
    }
    const memberRows: Member[] = (mems ?? []).map(m => ({
      user_id: m.user_id as string,
      role: m.role as 'owner' | 'admin' | 'member',
      joined_at: m.joined_at as string,
      username: userMap[m.user_id as string]?.username ?? 'okänd',
      avatar: userMap[m.user_id as string]?.avatar ?? null,
    }))

    const amMember = !!(userId && memberIds.includes(userId))
    const enriched: ClubBasic = {
      ...(c as ClubBasic),
      member_count: memberRows.length,
      is_member: amMember,
    }
    setClub(enriched)
    setMembers(memberRows)

    // klubbens turer = turer från medlemmar (senaste 20)
    if (memberIds.length > 0) {
      const { data: ts } = await supabase
        .from('trips')
        .select('id, user_id, created_at, image, caption, location_name, distance')
        .in('user_id', memberIds)
        .order('created_at', { ascending: false })
        .limit(20)
      const rows: TripCard[] = (ts ?? []).map(t => ({
        id: t.id as string,
        created_at: t.created_at as string,
        image: (t.image ?? null) as string | null,
        caption: (t.caption ?? null) as string | null,
        location_name: (t.location_name ?? null) as string | null,
        distance: (t.distance ?? null) as number | null,
        username: userMap[t.user_id as string]?.username ?? 'okänd',
      }))
      setTrips(rows)
    } else {
      setTrips([])
    }

    setLoading(false)
  }

  async function handleJoin() {
    if (!me || !club) { router.push('/logga-in'); return }
    setActionBusy(true)
    const ok = await joinClub(supabase, me, club.id)
    setActionBusy(false)
    if (ok) load(me)
  }
  async function handleLeave() {
    if (!me || !club) return
    if (!confirm(`Lämna ${club.name}?`)) return
    setActionBusy(true)
    const ok = await leaveClub(supabase, me, club.id)
    setActionBusy(false)
    if (ok) load(me)
    else alert('Du är ägare och kan inte lämna klubben.')
  }
  async function openChat() {
    if (!me || !club) { router.push('/logga-in'); return }
    if (!club.is_member) { alert('Gå med i klubben först.'); return }
    const convId = await getOrCreateClubChat(supabase, me, club.id, club.name)
    if (convId) router.push(`/meddelanden/${convId}`)
  }

  if (notFound) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏝️</div>
          <h2 style={{ fontSize: 18, fontWeight: 600, color: '#1e5c82', marginBottom: 6 }}>Klubben hittades inte</h2>
          <Link href="/klubbar" style={{ color: '#c96e2a', fontWeight: 700, fontSize: 13 }}>← Till alla klubbar</Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
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
          <h1 style={{ flex: 1, fontSize: 16, fontWeight: 600, color: 'var(--txt)', margin: 0,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {club?.name ?? ''}
          </h1>
          {club?.is_member && (
            <button onClick={openChat} aria-label="Öppna klubb-chatt" style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0, border: 'none',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} style={{ width: 18, height: 18 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12a8 8 0 11-16 0 8 8 0 0116 0z" />
              </svg>
            </button>
          )}
        </div>
      </header>

      {loading && (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
        </div>
      )}

      {!loading && club && (
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          {/* Hero */}
          <div style={{ padding: '20px 16px 12px', display: 'flex', gap: 14, alignItems: 'center' }}>
            <div style={{
              width: 80, height: 80, borderRadius: 18, position: 'relative', overflow: 'hidden',
              background: avatarGradient(club.slug),
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 600, fontSize: 28, flexShrink: 0,
            }}>
              {club.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={club.image} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : initialsOf(club.name)}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 20, fontWeight: 600, color: 'var(--txt)', margin: 0, lineHeight: 1.2 }}>{club.name}</h2>
              <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 12, color: 'var(--txt3)', flexWrap: 'wrap' }}>
                <span>{club.member_count ?? 0} medlemmar</span>
                {club.region && <span>· {club.region}</span>}
                <span>· {club.is_public ? 'Publik' : 'Privat'}</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ padding: '4px 16px 16px', display: 'flex', gap: 8 }}>
            {!club.is_member ? (
              <button onClick={handleJoin} disabled={actionBusy}
                style={{ flex: 1, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer', opacity: actionBusy ? 0.6 : 1 }}>
                {actionBusy ? '...' : 'Gå med'}
              </button>
            ) : (
              <>
                <button onClick={openChat}
                  style={{ flex: 2, padding: '12px 18px', borderRadius: 14, border: 'none', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  Öppna chatt
                </button>
                <button onClick={handleLeave} disabled={actionBusy}
                  style={{ flex: 1, padding: '12px 14px', borderRadius: 14, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', color: 'var(--txt)', fontWeight: 700, fontSize: 13, cursor: 'pointer', opacity: actionBusy ? 0.6 : 1 }}>
                  Lämna
                </button>
              </>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 4, padding: '0 16px', borderBottom: '1px solid rgba(10,123,140,0.10)' }}>
            {(['om', 'medlemmar', 'turer'] as Tab[]).map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{
                  flex: 1, padding: '10px 6px', border: 'none', background: 'transparent',
                  fontWeight: 700, fontSize: 13, cursor: 'pointer',
                  color: tab === t ? '#1e5c82' : 'var(--txt3)',
                  borderBottom: tab === t ? '2px solid #1e5c82' : '2px solid transparent',
                  marginBottom: -1,
                }}>
                {t === 'om' ? 'Om' : t === 'medlemmar' ? `Medlemmar (${members.length})` : `Turer (${trips.length})`}
              </button>
            ))}
          </div>

          <div style={{ padding: '16px' }}>
            {tab === 'om' && (
              <div>
                {club.description ? (
                  <p style={{ fontSize: 14, color: 'var(--txt)', lineHeight: 1.6, margin: 0, whiteSpace: 'pre-wrap' }}>
                    {club.description}
                  </p>
                ) : (
                  <p style={{ fontSize: 13, color: 'var(--txt3)', fontStyle: 'italic' }}>
                    Ingen beskrivning ännu.
                  </p>
                )}
                <div style={{ marginTop: 20, padding: 14, borderRadius: 12, background: 'rgba(10,123,140,0.04)', fontSize: 12, color: 'var(--txt3)' }}>
                  Skapad {timeAgo(club.created_at)}
                </div>
              </div>
            )}

            {tab === 'medlemmar' && (
              <div>
                {members.map(m => (
                  <Link key={m.user_id} href={`/u/${m.username}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 0', borderBottom: '1px solid rgba(10,123,140,0.06)',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', position: 'relative', overflow: 'hidden',
                        background: avatarGradient(m.username),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', fontWeight: 600, fontSize: 14, flexShrink: 0,
                      }}>
                        {m.avatar ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={m.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : initialsOf(m.username)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{m.username}</div>
                        <div style={{ fontSize: 11, color: 'var(--txt3)' }}>
                          {m.role === 'owner' ? 'Grundare' : m.role === 'admin' ? 'Admin' : 'Medlem'} · med sedan {timeAgo(m.joined_at)}
                        </div>
                      </div>
                      {m.role !== 'member' && (
                        <span style={{ fontSize: 10, fontWeight: 600, color: '#c96e2a', background: 'rgba(201,110,42,0.10)', borderRadius: 6, padding: '2px 6px' }}>
                          {m.role === 'owner' ? 'OWNER' : 'ADMIN'}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {tab === 'turer' && (
              <div>
                {trips.length === 0 && (
                  <p style={{ fontSize: 13, color: 'var(--txt3)', fontStyle: 'italic', textAlign: 'center', padding: 20 }}>
                    Inga turer från klubbens medlemmar ännu.
                  </p>
                )}
                {trips.map(t => (
                  <Link key={t.id} href={`/tur/${t.id}`} style={{ textDecoration: 'none' }}>
                    <div style={{
                      display: 'flex', gap: 12, alignItems: 'center',
                      padding: '10px 0', borderBottom: '1px solid rgba(10,123,140,0.06)',
                    }}>
                      <div style={{
                        width: 60, height: 60, borderRadius: 10, overflow: 'hidden', flexShrink: 0,
                        background: 'rgba(10,123,140,0.08)',
                      }}>
                        {t.image && (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={t.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        )}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)',
                          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.caption || t.location_name || 'Tur'}
                        </div>
                        <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>
                          @{t.username} · {timeAgo(t.created_at)}
                          {t.distance ? ` · ${t.distance.toFixed(1)} nm` : ''}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

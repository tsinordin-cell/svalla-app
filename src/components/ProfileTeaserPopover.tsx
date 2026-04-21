'use client'

/**
 * ProfileTeaserPopover — wrapper som lyssnar på long-press (~500ms) på children
 * och visar en bottom-sheet med snabbprofil. Klick (kort tryck) går vidare till
 * det normala beteendet (typiskt en Link).
 *
 * Användning:
 *   <ProfileTeaserPopover username="seglare1">
 *     <Avatar ... />
 *   </ProfileTeaserPopover>
 */
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { getProfileTeaser, type ProfileTeaser } from '@/lib/profileTeaser'

const LONG_PRESS_MS = 480
const MOVE_TOLERANCE_PX = 8

function fmt(n: number, dec = 1) {
  return n % 1 === 0 ? n.toString() : n.toFixed(dec)
}

export default function ProfileTeaserPopover({
  username,
  userId,
  children,
}: {
  username?: string
  userId?: string
  children: React.ReactNode
}) {
  const supabase = useRef(createClient()).current
  const [open, setOpen] = useState(false)
  const [data, setData] = useState<ProfileTeaser | null>(null)
  const [loading, setLoading] = useState(false)
  const [followBusy, setFollowBusy] = useState(false)
  const timer = useRef<number | null>(null)
  const startPos = useRef<{ x: number; y: number } | null>(null)
  const triggered = useRef(false)

  function clearTimer() {
    if (timer.current !== null) {
      window.clearTimeout(timer.current)
      timer.current = null
    }
  }

  async function loadAndOpen() {
    triggered.current = true
    setOpen(true)
    if (data) return
    setLoading(true)
    const { data: { user } } = await supabase.auth.getUser()
    const t = await getProfileTeaser(supabase, { username, userId }, user?.id ?? null)
    setData(t)
    setLoading(false)
  }

  function onPressStart(e: React.PointerEvent) {
    triggered.current = false
    startPos.current = { x: e.clientX, y: e.clientY }
    clearTimer()
    timer.current = window.setTimeout(() => {
      // Haptisk feedback om mobilen stödjer det
      if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
        try { (navigator as Navigator & { vibrate?: (p: number) => boolean }).vibrate?.(15) } catch { /* ignore */ }
      }
      loadAndOpen()
    }, LONG_PRESS_MS)
  }

  function onPressMove(e: React.PointerEvent) {
    if (!startPos.current) return
    const dx = Math.abs(e.clientX - startPos.current.x)
    const dy = Math.abs(e.clientY - startPos.current.y)
    if (dx > MOVE_TOLERANCE_PX || dy > MOVE_TOLERANCE_PX) clearTimer()
  }

  function onPressEnd() {
    clearTimer()
    startPos.current = null
  }

  // Förhindra click-navigering om long-press triggade
  function onClickCapture(e: React.MouseEvent) {
    if (triggered.current) {
      e.preventDefault()
      e.stopPropagation()
      triggered.current = false
    }
  }

  // Förhindra context-menu på long-press (mobil-Safari)
  function onContextMenu(e: React.MouseEvent) {
    if (open || triggered.current) e.preventDefault()
  }

  useEffect(() => {
    return () => clearTimer()
  }, [])

  async function toggleFollow() {
    if (!data || data.is_self) return
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { window.location.href = '/logga-in'; return }
    setFollowBusy(true)
    if (data.is_following) {
      await supabase.from('follows').delete().eq('follower_id', user.id).eq('following_id', data.id)
      setData({ ...data, is_following: false, followers_count: Math.max(0, data.followers_count - 1) })
    } else {
      await supabase.from('follows').insert({ follower_id: user.id, following_id: data.id })
      setData({ ...data, is_following: true, followers_count: data.followers_count + 1 })
    }
    setFollowBusy(false)
  }

  return (
    <>
      <span
        onPointerDown={onPressStart}
        onPointerMove={onPressMove}
        onPointerUp={onPressEnd}
        onPointerLeave={onPressEnd}
        onPointerCancel={onPressEnd}
        onClickCapture={onClickCapture}
        onContextMenu={onContextMenu}
        style={{
          display: 'inline-block',
          // disable iOS callout/zoom on long press
          WebkitTouchCallout: 'none',
          WebkitUserSelect: 'none',
          userSelect: 'none',
        }}
      >
        {children}
      </span>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed', inset: 0, zIndex: 200,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
            animation: 'fadeIn 0.15s ease-out',
          }}>
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%', maxWidth: 520, background: 'var(--white, #fff)',
              borderRadius: '20px 20px 0 0', padding: 20, paddingBottom: 28,
              animation: 'slideUp 0.18s cubic-bezier(0.2, 0.8, 0.3, 1)',
            }}
          >
            <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 14px' }} />

            {loading && (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
                Laddar profil…
              </div>
            )}

            {!loading && !data && (
              <div style={{ padding: '20px 0', textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
                Kunde inte ladda profil.
              </div>
            )}

            {!loading && data && (
              <>
                <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
                  <Link href={`/u/${data.username}`} onClick={() => setOpen(false)} style={{ flexShrink: 0 }}>
                    {data.avatar ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img loading="lazy" decoding="async" src={data.avatar} alt={data.username} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{
                        width: 64, height: 64, borderRadius: '50%',
                        background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 26, fontWeight: 700, color: '#fff',
                      }}>{data.username[0]?.toUpperCase() ?? '?'}</div>
                    )}
                  </Link>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Link href={`/u/${data.username}`} onClick={() => setOpen(false)} style={{ textDecoration: 'none' }}>
                      <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt, #162d3a)' }}>
                        @{data.username}
                        {data.nationality && <span style={{ marginLeft: 6, fontSize: 14 }}>{data.nationality}</span>}
                      </div>
                    </Link>
                    {(data.vessel_name || data.vessel_type) && (
                      <div style={{ fontSize: 12, color: 'var(--txt3, #7a9dab)', marginTop: 2 }}>
                        ⛵ {data.vessel_name ?? data.vessel_type}
                        {data.vessel_model ? ` · ${data.vessel_model}` : ''}
                      </div>
                    )}
                    {data.home_port && (
                      <div style={{ fontSize: 12, color: 'var(--txt3, #7a9dab)', marginTop: 2 }}>
                        ⚓ {data.home_port}
                      </div>
                    )}
                  </div>
                </div>

                {data.bio && (
                  <p style={{ fontSize: 13, color: 'var(--txt2, #4a6878)', lineHeight: 1.55, margin: '0 0 14px' }}>
                    {data.bio}
                  </p>
                )}

                <div style={{
                  display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6,
                  background: 'rgba(10,123,140,0.04)', borderRadius: 14, padding: '10px 6px',
                  marginBottom: 14,
                }}>
                  <Stat label="Turer" value={String(data.trips_count)} />
                  <Stat label="NM" value={fmt(data.total_nm)} />
                  <Stat label="Följare" value={String(data.followers_count)} />
                </div>

                <div style={{ display: 'flex', gap: 8 }}>
                  <Link href={`/u/${data.username}`} onClick={() => setOpen(false)}
                    style={{
                      flex: 1, padding: 12, borderRadius: 12,
                      border: '1px solid rgba(10,123,140,0.20)', textAlign: 'center',
                      fontWeight: 700, fontSize: 14, color: 'var(--txt, #162d3a)', textDecoration: 'none',
                    }}>
                    Visa profil
                  </Link>
                  {!data.is_self && (
                    <button onClick={toggleFollow} disabled={followBusy}
                      style={{
                        flex: 1, padding: 12, borderRadius: 12, border: 'none',
                        background: data.is_following ? 'rgba(10,123,140,0.10)' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                        color: data.is_following ? 'var(--txt, #162d3a)' : '#fff',
                        fontWeight: 600, fontSize: 14,
                        cursor: followBusy ? 'wait' : 'pointer',
                        opacity: followBusy ? 0.6 : 1,
                      }}>
                      {data.is_following ? 'Följer' : 'Följ'}
                    </button>
                  )}
                  {!data.is_self && (
                    <Link href={`/meddelanden/ny?to=${data.id}`} onClick={() => setOpen(false)}
                      aria-label="Skicka meddelande"
                      style={{
                        padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        textDecoration: 'none', color: 'var(--txt, #162d3a)',
                      }}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} style={{ width: 18, height: 18 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
                      </svg>
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>

          <style jsx global>{`
            @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
            @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
          `}</style>
        </div>
      )}
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ textAlign: 'center', padding: '4px 2px' }}>
      <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt, #162d3a)', lineHeight: 1.1 }}>{value}</div>
      <div style={{ fontSize: 9, color: 'var(--txt3, #7a9dab)', marginTop: 3, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</div>
    </div>
  )
}

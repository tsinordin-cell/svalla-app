'use client'
import { useState, useEffect, useRef, type ReactNode, type MouseEvent } from 'react'
import { createClient } from '@/lib/supabase'
import Link from 'next/link'
import Image from 'next/image'

type ListUser = {
  id:       string
  username: string
  avatar:   string | null
}

function Backdrop({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,20,35,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

function Sheet({ onClick, children, label }: { onClick?: (e: MouseEvent<HTMLDivElement>) => void; children: ReactNode; label?: string }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClick}
      style={{
        background: 'var(--white)', borderRadius: '24px 24px 0 0',
        padding: '20px 20px',
        paddingBottom: 'max(40px, env(safe-area-inset-bottom, 40px))',
        width: '100%', maxWidth: 480,
        boxShadow: '0 -4px 40px rgba(0,20,35,0.15)',
        maxHeight: '75dvh', overflowY: 'auto',
      }}
    >
      {children}
    </div>
  )
}

/** Displays follower or following count as a tappable button that opens a list sheet */
export default function FollowListButton({
  userId,
  mode,
  count,
}: {
  userId: string
  mode:   'followers' | 'following'
  count:  number
}) {
  const [open,    setOpen]    = useState(false)
  const [users,   setUsers]   = useState<ListUser[]>([])
  const [loading, setLoading] = useState(false)
  const fetched = useRef(false)

  async function openSheet() {
    setOpen(true)
    if (fetched.current) return
    fetched.current = true
    setLoading(true)
    const supabase = createClient()

    if (mode === 'followers') {
      // Who follows this user
      const { data: follows } = await supabase
        .from('follows')
        .select('follower_id')
        .eq('following_id', userId)
        .limit(100)
      const ids = (follows ?? []).map((f: { follower_id: string }) => f.follower_id)
      if (ids.length > 0) {
        const { data: rows } = await supabase.from('users').select('id, username, avatar').in('id', ids)
        setUsers((rows ?? []) as ListUser[])
      }
    } else {
      // Who this user follows
      const { data: follows } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', userId)
        .limit(100)
      const ids = (follows ?? []).map((f: { following_id: string }) => f.following_id)
      if (ids.length > 0) {
        const { data: rows } = await supabase.from('users').select('id, username, avatar').in('id', ids)
        setUsers((rows ?? []) as ListUser[])
      }
    }
    setLoading(false)
  }

  const label = mode === 'followers' ? 'följare' : 'följer'
  const title = mode === 'followers' ? 'Följare' : 'Följer'

  return (
    <>
      <button
        onClick={openSheet}
        aria-label={`Visa ${label}`}
        className="press-feedback"
        style={{
          background: 'none', border: 'none', cursor: 'pointer', padding: 0,
          fontSize: 12, color: 'rgba(255,255,255,0.8)',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        <strong style={{ color: '#fff', fontWeight: 700 }}>{count}</strong> {label}
      </button>

      {open && (
        <Backdrop onClick={() => setOpen(false)}>
          <Sheet label={title} onClick={e => e.stopPropagation()}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(10,123,140,0.15)', margin: '0 auto 18px' }} />

            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 16px', textAlign: 'center' }}>
              {title} · {count}
            </h3>

            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '24px 0' }}>
                <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid var(--sea)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
              </div>
            ) : users.length === 0 ? (
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--txt3)', padding: '24px 0' }}>
                {mode === 'followers' ? 'Inga följare ännu' : 'Följer ingen ännu'}
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {users.map(u => (
                  <Link
                    key={u.id}
                    href={`/u/${u.username}`}
                    onClick={() => setOpen(false)}
                    style={{ textDecoration: 'none' }}
                  >
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: 12,
                      padding: '10px 12px', borderRadius: 14,
                      background: 'rgba(10,123,140,0.04)',
                      transition: 'background 0.1s',
                      WebkitTapHighlightColor: 'transparent',
                    }}>
                      <div style={{
                        width: 40, height: 40, borderRadius: '50%', flexShrink: 0, overflow: 'hidden',
                        background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 15, fontWeight: 700, color: '#fff',
                      }}>
                        {u.avatar
                          ? <Image src={u.avatar} alt={u.username} width={40} height={40} style={{ objectFit: 'cover' }} />
                          : u.username[0]?.toUpperCase() ?? '?'
                        }
                      </div>
                      <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)' }}>
                        {u.username}
                      </span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} style={{ width: 14, height: 14, marginLeft: 'auto', flexShrink: 0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            <button
              onClick={() => setOpen(false)}
              className="press-feedback"
              style={{
                width: '100%', marginTop: 14, padding: '13px', borderRadius: 14,
                background: 'rgba(10,123,140,0.07)', border: 'none',
                color: 'var(--txt2)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Stäng
            </button>
          </Sheet>
        </Backdrop>
      )}

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </>
  )
}

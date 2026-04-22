'use client'

import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { findOrCreateDM } from '@/lib/dm'
import { avatarGradient, initialsOf } from '@/lib/utils'
import { toast } from '@/components/Toast'

type Candidate = {
  id: string
  username: string
  avatar: string | null
  mutual: boolean  // true = båda följer varandra
}

export default function NyKonversationPage() {
  return (
    <Suspense fallback={null}>
      <NyKonversationInner />
    </Suspense>
  )
}

function NyKonversationInner() {
  const router = useRouter()
  const search = useSearchParams()
  const autoTo = search?.get('to') ?? null
  const supabase = useRef(createClient()).current

  const [me, setMe] = useState<string | null>(null)
  const [candidates, setCandidates] = useState<Candidate[]>([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState('')
  const [starting, setStarting] = useState<string | null>(null) // user id som är under skapande

  // Bootstrap
  useEffect(() => {
    let cancel = false
    async function boot() {
      const { data: { user } } = await supabase.auth.getUser()
      if (cancel) return
      if (!user) { router.push('/logga-in'); return }
      setMe(user.id)

      // 1. Alla jag följer
      const { data: iFollow } = await supabase
        .from('follows')
        .select('following_id')
        .eq('follower_id', user.id)

      const followIds = (iFollow ?? []).map(r => r.following_id as string)
      if (followIds.length === 0) { setCandidates([]); setLoading(false); return }

      // 2. De som följer mig — för mutual-flag
      const { data: followMe } = await supabase
        .from('follows')
        .select('follower_id')
        .eq('following_id', user.id)
        .in('follower_id', followIds)
      const mutualSet = new Set((followMe ?? []).map(r => r.follower_id as string))

      // 3. Användardata
      const { data: users } = await supabase
        .from('users')
        .select('id, username, avatar')
        .in('id', followIds)

      const list: Candidate[] = (users ?? [])
        .map(u => ({
          id: u.id as string,
          username: u.username as string,
          avatar: (u.avatar as string | null) ?? null,
          mutual: mutualSet.has(u.id as string),
        }))
        .sort((a, b) => {
          // Vänner först, sen alfabetiskt
          if (a.mutual !== b.mutual) return a.mutual ? -1 : 1
          return a.username.localeCompare(b.username, 'sv')
        })

      if (cancel) return
      setCandidates(list)
      setLoading(false)

      // Auto-start om ?to=… givet
      if (autoTo && !cancel) {
        startDM(user.id, autoTo)
      }
    }
    boot()
    return () => { cancel = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function startDM(myId: string, otherId: string) {
    if (myId === otherId) return
    setStarting(otherId)
    const res = await findOrCreateDM(supabase, myId, otherId)
    if (!res) {
      toast('Kunde inte starta konversation. Försök igen.', 'error')
      setStarting(null)
      return
    }
    router.push(`/meddelanden/${res.id}`)
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return candidates
    return candidates.filter(c => c.username.toLowerCase().includes(q))
  }, [candidates, query])

  const mutuals = filtered.filter(c => c.mutual)
  const requests = filtered.filter(c => !c.mutual)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 40 }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', padding: '12px 16px 10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Link href="/meddelanden" aria-label="Tillbaka" style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(10,123,140,0.07)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea, #1e5c82)" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <h1 style={{ flex: 1, fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: 0 }}>
              Ny konversation
            </h1>
          </div>

          {/* Sökfält */}
          <div style={{ marginTop: 10, position: 'relative' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2}
              style={{ width: 16, height: 16, position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)' }}>
              <circle cx="11" cy="11" r="8" /><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Sök bland personer du följer…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '11px 14px 11px 38px', borderRadius: 14,
                border: '1px solid rgba(10,123,140,0.18)',
                background: 'var(--white)', color: 'var(--txt)',
                fontSize: 14, fontWeight: 500,
                outline: 'none',
              }}
            />
          </div>
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '8px 0' }}>
        {loading && (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '2.5px solid #1e5c82', borderTopColor: 'transparent',
              animation: 'spin .7s linear infinite', display: 'inline-block',
            }} />
          </div>
        )}

        {!loading && candidates.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>⛵</div>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--sea)', marginBottom: 6 }}>
              Du följer inte någon ännu
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 18, lineHeight: 1.5 }}>
              Hitta seglare att följa i flödet — sen kan du skriva till dem.
            </p>
            <Link href="/feed" style={{
              display: 'inline-block', padding: '10px 22px', borderRadius: 14,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              color: '#fff', fontWeight: 700, fontSize: 13, textDecoration: 'none',
            }}>
              Till flödet →
            </Link>
          </div>
        )}

        {!loading && candidates.length > 0 && filtered.length === 0 && (
          <div style={{ padding: '40px 20px', textAlign: 'center', color: 'var(--txt3)', fontSize: 14 }}>
            Inga träffar för &quot;{query}&quot;
          </div>
        )}

        {!loading && mutuals.length > 0 && (
          <Section title="Vänner" subtitle="Ni följer varandra">
            {mutuals.map(c => (
              <Row key={c.id} c={c} starting={starting === c.id} onClick={() => me && startDM(me, c.id)} />
            ))}
          </Section>
        )}

        {!loading && requests.length > 0 && (
          <Section
            title="Du följer"
            subtitle="Första meddelandet skickas som en förfrågan"
          >
            {requests.map(c => (
              <Row key={c.id} c={c} starting={starting === c.id} onClick={() => me && startDM(me, c.id)} isRequest />
            ))}
          </Section>
        )}
      </div>

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: React.ReactNode }) {
  return (
    <section style={{ marginTop: 8 }}>
      <div style={{ padding: '14px 16px 6px' }}>
        <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: 0.6 }}>
          {title}
        </div>
        {subtitle && (
          <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>{subtitle}</div>
        )}
      </div>
      <div>{children}</div>
    </section>
  )
}

function Row({ c, starting, onClick, isRequest }: {
  c: Candidate
  starting: boolean
  onClick: () => void
  isRequest?: boolean
}) {
  const grad = avatarGradient(c.username)
  const initials = initialsOf(c.username)
  return (
    <button
      onClick={onClick}
      disabled={starting}
      style={{
        display: 'flex', alignItems: 'center', gap: 12,
        width: '100%', textAlign: 'left',
        padding: '11px 16px',
        border: 'none', borderBottom: '1px solid rgba(10,123,140,0.06)',
        background: 'transparent', cursor: starting ? 'default' : 'pointer',
        WebkitTapHighlightColor: 'transparent',
        opacity: starting ? 0.6 : 1,
      }}
    >
      <div style={{
        width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
        background: grad,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: '#fff', fontWeight: 600, fontSize: 15, overflow: 'hidden',
        position: 'relative',
      }}>
        {c.avatar ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img loading="lazy" decoding="async" src={c.avatar} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : initials}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>{c.username}</div>
        {isRequest && (
          <div style={{ fontSize: 11, color: 'var(--acc)', fontWeight: 600, marginTop: 2 }}>
            Skickas som förfrågan
          </div>
        )}
      </div>
      {starting ? (
        <div style={{
          width: 16, height: 16, borderRadius: '50%',
          border: '2px solid #1e5c82', borderTopColor: 'transparent',
          animation: 'spin .7s linear infinite', flexShrink: 0,
        }} />
      ) : (
        <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2.5} style={{ width: 16, height: 16, flexShrink: 0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      )}
    </button>
  )
}

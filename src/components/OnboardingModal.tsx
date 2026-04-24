'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

// ── Typer ─────────────────────────────────────────────────────────────────────
type Step = 1 | 2 | 3

interface SuggestedUser {
  id: string
  username: string
  avatar: string | null
  trip_count: number
}

// ── Båtval-alternativ ─────────────────────────────────────────────────────────
const BOAT_OPTIONS = [
  { value: 'Segelbåt', label: 'Segelbåt',                       emoji: '⛵', desc: 'Kryss och slör' },
  { value: 'Motorbåt', label: 'Motorbåt',                       emoji: '🚤', desc: 'Gas och frihet' },
  { value: 'Kajak',    label: 'Kajak / Kanot',                  emoji: '🛶', desc: 'Nära vattnet' },
  { value: 'Charter',  label: 'Chartrar eller åker med vänner', emoji: '🤝', desc: 'Utan egen båt' },
]

// ── Stegindikator ─────────────────────────────────────────────────────────────
function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 4 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i + 1 === current ? 24 : 8,
          height: 8, borderRadius: 4,
          background: i + 1 === current ? 'rgba(255,255,255,0.90)' : 'rgba(255,255,255,0.25)',
          transition: 'all 0.3s',
        }} />
      ))}
    </div>
  )
}

// ── Overlay-wrapper ──────────────────────────────────────────────────────────
const OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 1100,
  background: 'linear-gradient(160deg, #081828 0%, #0d2a40 45%, #0e3a52 100%)',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  overflowY: 'auto',
  padding: 'env(safe-area-inset-top,16px) 20px env(safe-area-inset-bottom,32px)',
}

const SKIP_BTN: React.CSSProperties = {
  padding: '15px 20px', borderRadius: 14,
  border: '1px solid rgba(255,255,255,0.15)',
  background: 'rgba(255,255,255,0.06)',
  color: 'rgba(255,255,255,0.55)',
  fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
}

// ── Huvudkomponent ────────────────────────────────────────────────────────────
export default function OnboardingModal() {
  const router   = useRouter()
  const [supabase] = useState(() => createClient())

  const [show,         setShow]         = useState(false)
  const [mounted,      setMounted]      = useState(false)
  const [step,         setStep]         = useState<Step>(1)
  const [boatType,     setBoatType]     = useState<string | null>(null)
  const [users,        setUsers]        = useState<SuggestedUser[]>([])
  const [followed,     setFollowed]     = useState<Set<string>>(new Set())
  const [myId,         setMyId]         = useState<string | null>(null)
  const [savingBoat,   setSavingBoat]   = useState(false)
  const [loadingUsers, setLoadingUsers] = useState(false)

  // Kolla om onboarding ska visas (hanterar både email-signup och OAuth)
  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    // Om användaren explicit stängt/klarat onboarding på denna enhet → visa inte
    if (localStorage.getItem('svalla_onboarded')) return
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      setMyId(data.user.id)
      // Kolla DB: ny användare (< 10 min) eller saknar boat_type → visa onboarding
      const { data: userRow } = await supabase
        .from('users')
        .select('boat_type, created_at')
        .eq('id', data.user.id)
        .single()
      const isNewUser = userRow?.created_at
        ? Date.now() - new Date(userRow.created_at).getTime() < 10 * 60 * 1000
        : false
      if (!userRow?.boat_type || isNewUser) setShow(true)
    })
  }, [supabase])

  // Hämta föreslagna seglare (steg 2)
  useEffect(() => {
    if (step !== 2 || !myId) return
    setLoadingUsers(true)
    supabase
      .from('users')
      .select('id, username, avatar')
      .neq('id', myId)
      .limit(30)
      .then(async ({ data: allUsers }) => {
        if (!allUsers?.length) { setLoadingUsers(false); return }
        const { data: counts } = await supabase
          .from('trips')
          .select('user_id')
          .in('user_id', allUsers.map(u => u.id))
          .is('deleted_at', null)
        const countMap: Record<string, number> = {}
        counts?.forEach(r => { countMap[r.user_id] = (countMap[r.user_id] ?? 0) + 1 })
        const sorted = allUsers
          .map(u => ({ ...u, trip_count: countMap[u.id] ?? 0 }))
          .filter(u => u.trip_count > 0)
          .sort((a, b) => b.trip_count - a.trip_count)
          .slice(0, 6)
        setUsers(sorted)
        setLoadingUsers(false)
      })
  }, [step, myId, supabase])

  if (!mounted || !show) return null

  const finish = () => {
    localStorage.setItem('svalla_onboarded', '1')
    setShow(false)
  }

  const handleBoatSelect = async (value: string) => {
    setBoatType(value)
    if (!myId) return
    setSavingBoat(true)
    await supabase.from('users').update({ boat_type: value }).eq('id', myId)
    setSavingBoat(false)
  }

  const toggleFollow = async (targetId: string) => {
    if (!myId) return
    const isFollowing = followed.has(targetId)
    const next = new Set(followed)
    if (isFollowing) {
      next.delete(targetId)
      setFollowed(next)
      await supabase.from('follows').delete().eq('follower_id', myId).eq('following_id', targetId)
    } else {
      next.add(targetId)
      setFollowed(next)
      await supabase.from('follows').insert({ follower_id: myId, following_id: targetId })
    }
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEG 1 — Hur tar du dig ut?
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 1) return (
    <div style={OVERLAY} role="dialog" aria-modal="true" aria-label="Välkommen till Svalla">
      <div style={{ width: '100%', maxWidth: 440, paddingTop: 24 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>⚓</div>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
            Välkommen till Svalla
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
            Hur tar du dig ut i skärgården?
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {BOAT_OPTIONS.map(opt => {
            const active = boatType === opt.value
            return (
              <button key={opt.value} onClick={() => handleBoatSelect(opt.value)}
                className="press-feedback"
                style={{
                  display: 'flex', alignItems: 'center', gap: 16,
                  padding: '16px 20px', borderRadius: 18, border: 'none',
                  cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit',
                  background: active
                    ? 'linear-gradient(135deg, rgba(30,92,130,0.80), rgba(45,125,138,0.70))'
                    : 'rgba(255,255,255,0.07)',
                  outline: active ? '2px solid rgba(100,200,240,0.60)' : '2px solid transparent',
                  transition: 'all 0.18s',
                }}
              >
                <span style={{ fontSize: 32, flexShrink: 0 }}>{opt.emoji}</span>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                    {opt.label}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)' }}>
                    {opt.desc}
                  </div>
                </div>
                {active && (
                  <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="rgba(100,220,255,0.90)"
                      strokeWidth={2.5} style={{ width: 20, height: 20 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <StepDots current={1} total={3} />

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={() => boatType && setStep(2)} disabled={!boatType || savingBoat}
            className="press-feedback"
            style={{
              flex: 1, padding: '15px 0', borderRadius: 14, border: 'none',
              cursor: boatType ? 'pointer' : 'not-allowed', fontFamily: 'inherit',
              background: boatType
                ? 'linear-gradient(135deg, #1e5c82, #2d7d8a)'
                : 'rgba(255,255,255,0.10)',
              color: boatType ? '#fff' : 'rgba(255,255,255,0.30)',
              fontSize: 15, fontWeight: 600,
              boxShadow: boatType ? '0 4px 18px rgba(30,92,130,0.35)' : 'none',
              transition: 'all 0.2s',
            }}
          >
            {savingBoat ? '…' : 'Nästa →'}
          </button>
          <button onClick={finish} style={SKIP_BTN}>Hoppa över</button>
        </div>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // STEG 2 — Följ seglare
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 2) return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <div style={{ width: '100%', maxWidth: 440, paddingTop: 24 }}>

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>👥</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
            Följ seglare
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
            Deras turer dyker upp direkt i ditt flöde.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {loadingUsers
            ? Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '14px 18px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.05)',
                }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ width: 100, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.10)', marginBottom: 6 }} />
                    <div style={{ width: 60, height: 10, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }} />
                  </div>
                  <div style={{ width: 64, height: 34, borderRadius: 20, background: 'rgba(255,255,255,0.08)' }} />
                </div>
              ))
            : users.length === 0
              ? <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.45)', fontSize: 14, padding: '32px 0' }}>
                  Inga seglare att visa just nu.
                </p>
              : users.map(u => {
                  const isFollowing = followed.has(u.id)
                  return (
                    <div key={u.id} style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '14px 18px', borderRadius: 16,
                      background: 'rgba(255,255,255,0.06)',
                    }}>
                      <div style={{
                        width: 42, height: 42, borderRadius: '50%', flexShrink: 0,
                        background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 17, fontWeight: 700, color: '#fff', overflow: 'hidden',
                      }}>
                        {u.avatar
                          // eslint-disable-next-line @next/next/no-img-element
                          ? <img src={u.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          : u.username[0]?.toUpperCase()
                        }
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: '#fff', marginBottom: 2 }}>
                          @{u.username}
                        </div>
                        <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>
                          {u.trip_count} {u.trip_count === 1 ? 'tur' : 'turer'}
                        </div>
                      </div>
                      <button onClick={() => toggleFollow(u.id)} className="press-feedback"
                        style={{
                          padding: '8px 18px', borderRadius: 20, border: 'none',
                          cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
                          fontSize: 13, fontWeight: 600,
                          background: isFollowing ? 'rgba(100,200,240,0.15)' : 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                          color: isFollowing ? 'rgba(100,200,240,0.80)' : '#fff',
                          outline: isFollowing ? '1px solid rgba(100,200,240,0.30)' : 'none',
                          transition: 'all 0.18s',
                        }}
                      >
                        {isFollowing ? '✓ Följer' : 'Följ'}
                      </button>
                    </div>
                  )
                })
          }
        </div>

        <StepDots current={2} total={3} />

        <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
          <button onClick={() => setStep(3)} className="press-feedback"
            style={{
              flex: 1, padding: '15px 0', borderRadius: 14, border: 'none',
              cursor: 'pointer', fontFamily: 'inherit',
              background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
              color: '#fff', fontSize: 15, fontWeight: 600,
              boxShadow: '0 4px 18px rgba(30,92,130,0.35)',
            }}
          >
            {followed.size > 0 ? `Följer ${followed.size} — Nästa →` : 'Nästa →'}
          </button>
          <button onClick={finish} style={SKIP_BTN}>Hoppa över</button>
        </div>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // STEG 3 — Logga din första tur
  // ══════════════════════════════════════════════════════════════════════════
  return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <div style={{ width: '100%', maxWidth: 440, paddingTop: 24 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🗺️</div>
          <h2 style={{ fontSize: 24, fontWeight: 700, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.3px' }}>
            Logga din första tur
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.6 }}>
            Välj hur du vill börja.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {[
            { emoji: '📍', title: 'Spåra tur live',      desc: 'GPS-loggning direkt från telefonen',      href: '/logga'    },
            { emoji: '📂', title: 'Importera GPX / FIT', desc: 'Ladda upp från Garmin, Navionics m.fl.',  href: '/importera' },
            { emoji: '🌊', title: 'Utforska flödet',     desc: 'Se vad andra seglare gjort',               href: '/feed'     },
          ].map(item => (
            <button key={item.href}
              onClick={() => { finish(); router.push(item.href) }}
              className="press-feedback"
              style={{
                display: 'flex', alignItems: 'center', gap: 18,
                padding: '20px 22px', borderRadius: 18, border: 'none',
                cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit',
                background: item.href === '/logga'
                  ? 'linear-gradient(135deg, rgba(30,92,130,0.75), rgba(45,125,138,0.65))'
                  : 'rgba(255,255,255,0.07)',
                outline: item.href === '/logga'
                  ? '1px solid rgba(100,200,240,0.25)'
                  : '1px solid rgba(255,255,255,0.10)',
              }}
            >
              <span style={{ fontSize: 36, flexShrink: 0 }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 3 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.60)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
              <span style={{ fontSize: 18, color: 'rgba(255,255,255,0.40)', flexShrink: 0 }}>→</span>
            </button>
          ))}
        </div>

        <StepDots current={3} total={3} />

        <button onClick={finish}
          style={{
            display: 'block', width: '100%', marginTop: 16,
            padding: '15px 0', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
            border: '1px solid rgba(255,255,255,0.15)',
            background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.55)',
            fontSize: 14, fontWeight: 500,
          }}
        >
          Gå till flödet
        </button>
      </div>
    </div>
  )
}

'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'

// ── Typer ─────────────────────────────────────────────────────────────────────
type Step = 'welcome' | 'username' | 'boat' | 'follow' | 'done'

interface SuggestedUser {
  id: string
  username: string
  avatar: string | null
  trip_count: number
}

// ── CSS-animationer (injiceras en gång) ───────────────────────────────────────
const KEYFRAMES = `
@keyframes ob-fadeUp {
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes ob-scaleIn {
  from { opacity: 0; transform: scale(0.90); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes ob-pop {
  0%   { transform: scale(0); opacity: 0; }
  65%  { transform: scale(1.15); }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes ob-ring {
  0%   { transform: scale(0.7); opacity: 0; }
  60%  { transform: scale(1.08); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}
@keyframes ob-spin {
  to { transform: rotate(360deg); }
}
@keyframes ob-slideRight {
  from { opacity: 0; transform: translateX(-14px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes ob-pulse {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
`

// ── SVG-ikoner för båtar ──────────────────────────────────────────────────────
function SailboatSVG() {
  return (
    <svg width={40} height={40} viewBox="0 0 64 64" fill="none">
      <path d="M32 8 L32 46" stroke="rgba(100,200,240,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 10 L52 42 L14 42 Z" fill="rgba(30,92,130,0.6)" stroke="rgba(100,200,240,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M32 16 L16 34 L32 34 Z" fill="rgba(45,125,138,0.5)" stroke="rgba(100,200,240,0.5)" strokeWidth="1" strokeLinejoin="round"/>
      <path d="M10 46 Q32 54 54 46" stroke="rgba(100,200,240,0.6)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function MotorboatSVG() {
  return (
    <svg width={40} height={40} viewBox="0 0 64 64" fill="none">
      <path d="M8 38 L20 28 L52 28 L58 38 Z" fill="rgba(30,92,130,0.6)" stroke="rgba(100,200,240,0.7)" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M20 28 L24 20 L42 20 L44 28" fill="rgba(20,70,110,0.5)" stroke="rgba(100,200,240,0.5)" strokeWidth="1.5"/>
      <path d="M50 32 L56 32" stroke="rgba(100,200,240,0.8)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M4 40 Q32 50 60 40" stroke="rgba(100,200,240,0.5)" strokeWidth="2" strokeLinecap="round" fill="none"/>
    </svg>
  )
}

function KayakSVG() {
  return (
    <svg width={40} height={40} viewBox="0 0 64 64" fill="none">
      <ellipse cx="32" cy="36" rx="26" ry="7" fill="rgba(30,92,130,0.6)" stroke="rgba(100,200,240,0.7)" strokeWidth="1.5"/>
      <circle cx="32" cy="30" r="5" fill="rgba(45,125,138,0.6)" stroke="rgba(100,200,240,0.6)" strokeWidth="1.5"/>
      <path d="M18 25 L12 16" stroke="rgba(100,200,240,0.8)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M46 25 L52 16" stroke="rgba(100,200,240,0.8)" strokeWidth="2" strokeLinecap="round"/>
      <path d="M10 16 L14 12" stroke="rgba(100,200,240,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M54 16 L50 12" stroke="rgba(100,200,240,0.7)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

function CharterSVG() {
  return (
    <svg width={40} height={40} viewBox="0 0 64 64" fill="none">
      <circle cx="22" cy="26" r="9" fill="rgba(30,92,130,0.5)" stroke="rgba(100,200,240,0.7)" strokeWidth="1.5"/>
      <circle cx="42" cy="26" r="9" fill="rgba(45,125,138,0.5)" stroke="rgba(100,200,240,0.7)" strokeWidth="1.5"/>
      <path d="M22 35 C22 42 42 42 42 35" fill="rgba(25,80,120,0.5)" stroke="rgba(100,200,240,0.6)" strokeWidth="1.5"/>
      <path d="M30 27 L34 27" stroke="rgba(100,220,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M32 25 L32 29" stroke="rgba(100,220,255,0.9)" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  )
}

const BOAT_OPTIONS = [
  { value: 'Segelbåt', label: 'Segelbåt', Icon: SailboatSVG, desc: 'Kryss och slör' },
  { value: 'Motorbåt', label: 'Motorbåt', Icon: MotorboatSVG, desc: 'Gas och frihet' },
  { value: 'Kajak', label: 'Kajak / Kanot', Icon: KayakSVG, desc: 'Nära vattnet' },
  { value: 'Charter', label: 'Chartrar eller åker med vänner', Icon: CharterSVG, desc: 'Utan egen båt' },
]

// ── Generiska SVG-ikoner ──────────────────────────────────────────────────────
function CheckIcon({ size = 24, color = '#fff' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 13l4 4L19 7" />
    </svg>
  )
}

function LocationPinIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none"
      stroke="rgba(100,200,240,0.85)" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 0 1 14 0c0 3.5-3 7-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}

function FolderUploadIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none"
      stroke="rgba(100,200,240,0.85)" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <polyline points="12 11 12 17" />
      <polyline points="9 14 12 11 15 14" />
    </svg>
  )
}

function WavesIcon() {
  return (
    <svg width={32} height={32} viewBox="0 0 24 24" fill="none"
      stroke="rgba(100,200,240,0.85)" strokeWidth={1.5}
      strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 12c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
      <path d="M2 17c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
      <path d="M2 7c1.5-2 3-2 4.5 0s3 2 4.5 0 3-2 4.5 0 3 2 4.5 0" />
    </svg>
  )
}

// ── Framstegspiller ───────────────────────────────────────────────────────────
const PROGRESS_STEPS: { key: Step; label: string }[] = [
  { key: 'username', label: 'Namn' },
  { key: 'boat', label: 'Båt' },
  { key: 'follow', label: 'Följ' },
]

function ProgressPills({ current }: { current: Step }) {
  const order: Step[] = ['welcome', 'username', 'boat', 'follow', 'done']
  const currentIdx = order.indexOf(current)
  if (current === 'welcome' || current === 'done') return null
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
      {PROGRESS_STEPS.map(({ key, label }) => {
        const stepIdx = order.indexOf(key)
        const done = stepIdx < currentIdx
        const active = key === current
        return (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 5,
              padding: '5px 14px', borderRadius: 20,
              background: active
                ? 'linear-gradient(135deg, #1e5c82, #2d7d8a)'
                : done
                ? 'rgba(100,200,240,0.18)'
                : 'rgba(255,255,255,0.08)',
              border: active
                ? '1px solid rgba(100,200,240,0.4)'
                : done
                ? '1px solid rgba(100,200,240,0.25)'
                : '1px solid rgba(255,255,255,0.10)',
              transition: 'all 0.3s',
            }}>
              {done && <CheckIcon size={10} color="rgba(100,220,255,0.9)" />}
              <span style={{
                fontSize: 12, fontWeight: active ? 700 : 500,
                color: active ? '#fff' : done ? 'rgba(100,220,255,0.8)' : 'rgba(255,255,255,0.35)',
              }}>{label}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── Overlay-wrapper ──────────────────────────────────────────────────────────
const OVERLAY: React.CSSProperties = {
  position: 'fixed', inset: 0, zIndex: 1100,
  background: 'linear-gradient(160deg, #071520 0%, #0b2235 50%, #0e3348 100%)',
  display: 'flex', flexDirection: 'column', alignItems: 'center',
  overflowY: 'auto',
  padding: 'env(safe-area-inset-top,16px) 20px env(safe-area-inset-bottom,40px)',
}

const SKIP_BTN: React.CSSProperties = {
  padding: '14px 20px', borderRadius: 14,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.05)',
  color: 'rgba(255,255,255,0.40)',
  fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'inherit',
}

const PRIMARY_BTN = (disabled = false): React.CSSProperties => ({
  flex: 1, padding: '15px 0', borderRadius: 14, border: 'none',
  cursor: disabled ? 'not-allowed' : 'pointer', fontFamily: 'inherit',
  background: disabled
    ? 'rgba(255,255,255,0.08)'
    : 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
  color: disabled ? 'rgba(255,255,255,0.25)' : '#fff',
  fontSize: 15, fontWeight: 600,
  boxShadow: disabled ? 'none' : '0 4px 20px rgba(30,92,130,0.40)',
  transition: 'all 0.2s',
})

// ── Huvud-komponent ───────────────────────────────────────────────────────────
export default function OnboardingModal() {
  const router = useRouter()
  const [supabase] = useState(() => createClient())

  const [show, setShow] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [step, setStep] = useState<Step>('welcome')
  const [animKey, setAnimKey] = useState(0)

  // Användarinfo
  const [myId, setMyId] = useState<string | null>(null)
  const [displayName, setDisplayName] = useState('')
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  // Steg: username
  const [username, setUsername] = useState('')
  const [usernameStatus, setUsernameStatus] = useState<'idle' | 'checking' | 'ok' | 'taken' | 'invalid'>('idle')
  const usernameTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // Steg: boat
  const [boatType, setBoatType] = useState<string | null>(null)
  const [savingBoat, setSavingBoat] = useState(false)

  // Steg: follow
  const [users, setUsers] = useState<SuggestedUser[]>([])
  const [followed, setFollowed] = useState<Set<string>>(new Set())
  const [loadingUsers, setLoadingUsers] = useState(false)

  // Kolla om onboarding ska visas
  useEffect(() => {
    setMounted(true)
    if (typeof window === 'undefined') return
    if (localStorage.getItem('svalla_onboarded')) return
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      setMyId(data.user.id)

      // Hämta Google-metadata
      const meta = data.user.user_metadata ?? {}
      const name = meta.full_name ?? meta.name ?? ''
      const firstName = name.split(' ')[0] ?? ''
      setDisplayName(firstName)
      setAvatarUrl(meta.avatar_url ?? meta.picture ?? null)

      const { data: userRow } = await supabase
        .from('users')
        .select('boat_type, created_at, username')
        .eq('id', data.user.id)
        .single()

      // Prefyll username-fältet med befintligt värde
      if (userRow?.username) setUsername(userRow.username)

      const isNewUser = userRow?.created_at
        ? Date.now() - new Date(userRow.created_at).getTime() < 10 * 60 * 1000
        : false

      if (!userRow?.boat_type || isNewUser) setShow(true)
    })
  }, [supabase])

  // Hämta föreslagna seglare
  useEffect(() => {
    if (step !== 'follow' || !myId) return
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
          .slice(0, 8)
        setUsers(sorted)
        setLoadingUsers(false)
      })
  }, [step, myId, supabase])

  // Username-validering (debounced 400ms)
  const validateUsername = useCallback((val: string) => {
    if (usernameTimer.current) clearTimeout(usernameTimer.current)
    const trimmed = val.trim()
    if (!trimmed) { setUsernameStatus('idle'); return }
    if (!/^[a-zA-Z0-9_]{3,20}$/.test(trimmed)) { setUsernameStatus('invalid'); return }
    setUsernameStatus('checking')
    usernameTimer.current = setTimeout(async () => {
      const { data } = await supabase
        .from('users')
        .select('id')
        .eq('username', trimmed)
        .neq('id', myId ?? '')
        .maybeSingle()
      setUsernameStatus(data ? 'taken' : 'ok')
    }, 400)
  }, [supabase, myId])

  if (!mounted || !show) return null

  const goTo = (next: Step) => {
    setAnimKey(k => k + 1)
    setStep(next)
  }

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

  const handleSaveUsername = async () => {
    const trimmed = username.trim()
    if (!trimmed || !myId || usernameStatus !== 'ok') return
    await supabase.from('users').update({ username: trimmed }).eq('id', myId)
    goTo('boat')
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

  const CARD: React.CSSProperties = {
    width: '100%', maxWidth: 440, paddingTop: 32,
    animation: 'ob-fadeUp 0.38s cubic-bezier(0.22,1,0.36,1) both',
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEG: WELCOME
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'welcome') return (
    <div style={OVERLAY} role="dialog" aria-modal="true" aria-label="Välkommen till Svalla">
      <style>{KEYFRAMES}</style>
      <div key={animKey} style={{ ...CARD, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>

        {/* Avatar */}
        <div style={{
          marginBottom: 24,
          animation: 'ob-ring 0.55s cubic-bezier(0.22,1,0.36,1) 0.1s both',
        }}>
          {avatarUrl ? (
            <div style={{
              width: 88, height: 88, borderRadius: '50%',
              border: '3px solid rgba(100,200,240,0.50)',
              boxShadow: '0 0 0 6px rgba(100,200,240,0.10)',
              overflow: 'hidden',
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={avatarUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          ) : (
            <div style={{
              width: 88, height: 88, borderRadius: '50%',
              background: 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
              border: '3px solid rgba(100,200,240,0.40)',
              boxShadow: '0 0 0 6px rgba(100,200,240,0.10)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 34, fontWeight: 700, color: '#fff',
            }}>
              {displayName?.[0]?.toUpperCase() ?? '⚓'}
            </div>
          )}
        </div>

        {/* Rubrik */}
        <div style={{ textAlign: 'center', marginBottom: 40, animation: 'ob-fadeUp 0.4s 0.2s both' }}>
          <h1 style={{
            fontSize: 30, fontWeight: 800, color: '#fff',
            margin: '0 0 10px', letterSpacing: '-0.5px', lineHeight: 1.2,
          }}>
            {displayName ? `Välkommen, ${displayName}! 👋` : 'Välkommen till Svalla! 👋'}
          </h1>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.60)', margin: 0, lineHeight: 1.65, maxWidth: 320 }}>
            Vi hjälper dig logga, dela och utforska turer på havet. Det tar under en minut att komma igång.
          </p>
        </div>

        {/* Funktionslista */}
        <div style={{
          width: '100%', display: 'flex', flexDirection: 'column', gap: 10,
          marginBottom: 36, animation: 'ob-fadeUp 0.4s 0.32s both',
        }}>
          {[
            { icon: '🗺️', text: 'Spåra dina turer med GPS' },
            { icon: '👥', text: 'Följ andra seglare i flödet' },
            { icon: '📈', text: 'Se statistik och rutter' },
          ].map(({ icon, text }) => (
            <div key={text} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '14px 18px', borderRadius: 14,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              <span style={{ fontSize: 20 }}>{icon}</span>
              <span style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', fontWeight: 500 }}>{text}</span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => goTo('username')}
          className="press-feedback"
          style={{
            ...PRIMARY_BTN(false),
            width: '100%', animation: 'ob-fadeUp 0.4s 0.42s both',
            fontSize: 16, padding: '17px 0',
          }}
        >
          Kom igång →
        </button>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // STEG: USERNAME
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'username') {
    const canContinue = username.trim().length >= 3 && usernameStatus === 'ok'
    const statusColor =
      usernameStatus === 'ok' ? 'rgba(80,220,150,0.9)' :
      usernameStatus === 'taken' || usernameStatus === 'invalid' ? 'rgba(255,100,100,0.9)' :
      'transparent'
    const statusMsg =
      usernameStatus === 'ok' ? '✓ Tillgängligt' :
      usernameStatus === 'taken' ? '✗ Redan taget' :
      usernameStatus === 'invalid' ? '✗ 3–20 tecken, bara bokstäver/siffror/_' :
      usernameStatus === 'checking' ? 'Kollar…' : ''

    return (
      <div style={OVERLAY} role="dialog" aria-modal="true">
        <style>{KEYFRAMES}</style>
        <div key={animKey} style={CARD}>
          <ProgressPills current="username" />

          <div style={{ textAlign: 'center', marginBottom: 28 }}>
            <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
              Välj ditt användarnamn
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
              Så hittar andra dig på Svalla.
            </p>
          </div>

          {/* Input */}
          <div style={{ position: 'relative', marginBottom: 8 }}>
            <span style={{
              position: 'absolute', left: 18, top: '50%', transform: 'translateY(-50%)',
              fontSize: 16, color: 'rgba(255,255,255,0.35)', pointerEvents: 'none', userSelect: 'none',
            }}>@</span>
            <input
              type="text"
              value={username}
              autoFocus
              onChange={e => {
                const v = e.target.value.replace(/\s/g, '')
                setUsername(v)
                validateUsername(v)
              }}
              onKeyDown={e => { if (e.key === 'Enter' && canContinue) handleSaveUsername() }}
              placeholder="ditt_namn"
              maxLength={20}
              style={{
                width: '100%', boxSizing: 'border-box',
                padding: '16px 18px 16px 36px',
                borderRadius: 14, border: `1.5px solid ${
                  usernameStatus === 'ok' ? 'rgba(80,220,150,0.45)' :
                  usernameStatus === 'taken' || usernameStatus === 'invalid' ? 'rgba(255,100,100,0.35)' :
                  'rgba(255,255,255,0.15)'
                }`,
                background: 'rgba(255,255,255,0.07)',
                color: '#fff', fontSize: 17, fontFamily: 'inherit', fontWeight: 600,
                outline: 'none', transition: 'border-color 0.2s',
                letterSpacing: '0.2px',
              }}
            />
            {usernameStatus === 'checking' && (
              <div style={{
                position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)',
                width: 16, height: 16, borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.2)',
                borderTopColor: 'rgba(100,200,240,0.8)',
                animation: 'ob-spin 0.7s linear infinite',
              }} />
            )}
            {usernameStatus === 'ok' && (
              <div style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)' }}>
                <CheckIcon size={18} color="rgba(80,220,150,0.9)" />
              </div>
            )}
          </div>

          {/* Statusmeddelande */}
          <div style={{
            height: 20, marginBottom: 20,
            fontSize: 12, fontWeight: 500,
            color: statusColor,
            paddingLeft: 4,
            transition: 'color 0.2s',
          }}>
            {statusMsg}
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <button
              onClick={handleSaveUsername}
              disabled={!canContinue}
              className="press-feedback"
              style={PRIMARY_BTN(!canContinue)}
            >
              Nästa →
            </button>
            <button onClick={finish} style={SKIP_BTN}>Hoppa över</button>
          </div>
        </div>
      </div>
    )
  }

  // ══════════════════════════════════════════════════════════════════════════
  // STEG: BOAT
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'boat') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <div key={animKey} style={CARD}>
        <ProgressPills current="boat" />

        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
            Hur tar du dig ut?
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
            Vi anpassar upplevelsen efter din båttyp.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 28 }}>
          {BOAT_OPTIONS.map(({ value, label, Icon, desc }) => {
            const active = boatType === value
            return (
              <button key={value} onClick={() => handleBoatSelect(value)}
                className="press-feedback"
                style={{
                  display: 'flex', alignItems: 'center', gap: 18,
                  padding: '16px 20px', borderRadius: 18, border: 'none',
                  cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit',
                  background: active
                    ? 'linear-gradient(135deg, rgba(30,92,130,0.80), rgba(45,125,138,0.70))'
                    : 'rgba(255,255,255,0.06)',
                  outline: active ? '2px solid rgba(100,200,240,0.55)' : '2px solid transparent',
                  transition: 'all 0.18s',
                }}
              >
                <div style={{ flexShrink: 0, opacity: active ? 1 : 0.65, transition: 'opacity 0.18s' }}>
                  <Icon />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                    {label}
                  </div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.50)' }}>
                    {desc}
                  </div>
                </div>
                {active && (
                  <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                    <CheckIcon size={20} color="rgba(100,220,255,0.90)" />
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button
            onClick={() => boatType && goTo('follow')}
            disabled={!boatType || savingBoat}
            className="press-feedback"
            style={PRIMARY_BTN(!boatType || savingBoat)}
          >
            {savingBoat ? '…' : 'Nästa →'}
          </button>
          <button onClick={finish} style={SKIP_BTN}>Hoppa över</button>
        </div>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // STEG: FOLLOW
  // ══════════════════════════════════════════════════════════════════════════
  if (step === 'follow') return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <div key={animKey} style={CARD}>
        <ProgressPills current="follow" />

        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: 26, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
            Följ aktiva seglare
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6 }}>
            Deras turer dyker upp direkt i ditt flöde.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
          {loadingUsers
            ? Array.from({ length: 5 }).map((_, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 18px', borderRadius: 16,
                background: 'rgba(255,255,255,0.05)',
                animation: 'ob-pulse 1.4s ease-in-out infinite',
                animationDelay: `${i * 0.1}s`,
              }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.10)', flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ width: 110, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.10)', marginBottom: 6 }} />
                  <div style={{ width: 60, height: 10, borderRadius: 6, background: 'rgba(255,255,255,0.06)' }} />
                </div>
                <div style={{ width: 64, height: 34, borderRadius: 20, background: 'rgba(255,255,255,0.08)' }} />
              </div>
            ))
            : users.length === 0
            ? (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.40)', fontSize: 14, padding: '32px 0' }}>
                Inga seglare att visa just nu.
              </p>
            )
            : users.map(u => {
              const isFollowing = followed.has(u.id)
              return (
                <div key={u.id} style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  padding: '13px 18px', borderRadius: 16,
                  background: 'rgba(255,255,255,0.06)',
                  border: isFollowing ? '1px solid rgba(100,200,240,0.20)' : '1px solid transparent',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
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
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.40)' }}>
                      {u.trip_count} {u.trip_count === 1 ? 'tur' : 'turer'}
                    </div>
                  </div>
                  <button onClick={() => toggleFollow(u.id)} className="press-feedback"
                    style={{
                      padding: '8px 18px', borderRadius: 20, border: 'none',
                      cursor: 'pointer', fontFamily: 'inherit', flexShrink: 0,
                      fontSize: 13, fontWeight: 600,
                      background: isFollowing ? 'rgba(100,200,240,0.12)' : 'linear-gradient(135deg, #1e5c82, #2d7d8a)',
                      color: isFollowing ? 'rgba(100,200,240,0.80)' : '#fff',
                      outline: isFollowing ? '1px solid rgba(100,200,240,0.25)' : 'none',
                      transition: 'all 0.18s',
                      display: 'flex', alignItems: 'center', gap: 5,
                    }}
                  >
                    {isFollowing ? (
                      <>
                        <CheckIcon size={11} color="rgba(100,200,240,0.8)" />
                        Följer
                      </>
                    ) : 'Följ'}
                  </button>
                </div>
              )
            })
          }
        </div>

        <div style={{ display: 'flex', gap: 10 }}>
          <button onClick={() => goTo('done')} className="press-feedback"
            style={PRIMARY_BTN(false)}
          >
            {followed.size > 0 ? `Följer ${followed.size} — Fortsätt →` : 'Fortsätt →'}
          </button>
          <button onClick={finish} style={SKIP_BTN}>Hoppa över</button>
        </div>
      </div>
    </div>
  )

  // ══════════════════════════════════════════════════════════════════════════
  // STEG: DONE
  // ══════════════════════════════════════════════════════════════════════════
  const step5Items = [
    {
      icon: <LocationPinIcon />,
      title: 'Spåra tur live',
      desc: 'GPS-loggning direkt från telefonen',
      href: '/logga',
      primary: true,
    },
    {
      icon: <FolderUploadIcon />,
      title: 'Importera GPX / FIT',
      desc: 'Ladda upp från Garmin, Navionics m.fl.',
      href: '/importera',
      primary: false,
    },
    {
      icon: <WavesIcon />,
      title: 'Utforska flödet',
      desc: 'Se vad andra seglare gjort',
      href: '/feed',
      primary: false,
    },
  ]

  return (
    <div style={OVERLAY} role="dialog" aria-modal="true">
      <style>{KEYFRAMES}</style>
      <div key={animKey} style={{ ...CARD, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        {/* Checkmark-animation */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%', marginBottom: 20,
          background: 'linear-gradient(135deg, rgba(30,92,130,0.6), rgba(45,125,138,0.5))',
          border: '2px solid rgba(100,200,240,0.45)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'ob-ring 0.5s cubic-bezier(0.22,1,0.36,1) both',
          boxShadow: '0 0 0 8px rgba(100,200,240,0.08)',
        }}>
          <div style={{ animation: 'ob-pop 0.45s 0.2s cubic-bezier(0.22,1,0.36,1) both' }}>
            <CheckIcon size={36} color="rgba(100,220,255,0.95)" />
          </div>
        </div>

        <div style={{ textAlign: 'center', marginBottom: 32, animation: 'ob-fadeUp 0.4s 0.3s both' }}>
          <h2 style={{ fontSize: 28, fontWeight: 800, color: '#fff', margin: '0 0 8px', letterSpacing: '-0.4px' }}>
            Klart! Du är redo 🎉
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', margin: 0, lineHeight: 1.6, maxWidth: 300 }}>
            Välj hur du vill börja utforska Svalla.
          </p>
        </div>

        <div style={{
          width: '100%', display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24,
          animation: 'ob-fadeUp 0.4s 0.4s both',
        }}>
          {step5Items.map(item => (
            <button key={item.href}
              onClick={() => { finish(); router.push(item.href) }}
              className="press-feedback"
              style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '18px 20px', borderRadius: 18, border: 'none',
                cursor: 'pointer', textAlign: 'left', width: '100%', fontFamily: 'inherit',
                background: item.primary
                  ? 'linear-gradient(135deg, rgba(30,92,130,0.75), rgba(45,125,138,0.65))'
                  : 'rgba(255,255,255,0.06)',
                outline: item.primary
                  ? '1.5px solid rgba(100,200,240,0.25)'
                  : '1px solid rgba(255,255,255,0.09)',
              }}
            >
              <div style={{ flexShrink: 0 }}>{item.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: '#fff', marginBottom: 2 }}>
                  {item.title}
                </div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>
                  {item.desc}
                </div>
              </div>
              <svg width={15} height={15} viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.30)" strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                <path d="M9 5.5L15.5 12L9 18.5" />
              </svg>
            </button>
          ))}
        </div>

        <button onClick={finish}
          style={{
            display: 'block', width: '100%',
            padding: '14px 0', borderRadius: 14, cursor: 'pointer', fontFamily: 'inherit',
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.45)',
            fontSize: 13, fontWeight: 500,
            animation: 'ob-fadeUp 0.4s 0.5s both',
          }}
        >
          Gå till flödet
        </button>
      </div>
    </div>
  )
}

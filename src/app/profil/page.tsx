'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Trip, User } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from '@/components/Toast'
import NotificationBell from '@/components/NotificationBell'
import MessageBell from '@/components/MessageBell'
import { useTheme, type Theme, type Lang } from '@/components/ThemeProvider'
import { ACHIEVEMENTS, computeUnlocked, calcStreak } from '@/lib/achievements'
import EmptyState from '@/components/EmptyState'
import { radius, fontSize, fontWeight, shadow } from '@/lib/tokens'

// ── Settings ─────────────────────────────────────────────────────────────────
function SettingsSection() {
  const { theme, setTheme, lang, setLang } = useTheme()
  const pill = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: 20, cursor: 'pointer', border: 'none',
    fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 600 : 500,
    transition: 'all 0.15s',
    background: active ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,123,140,0.07)',
    color: active ? '#fff' : '#3d5865',
    boxShadow: active ? '0 2px 8px rgba(30,92,130,0.25)' : 'none',
  })
  const themes: { val: Theme; label: string; icon: string }[] = [
    { val: 'auto', label: 'Auto', icon: '🌗' },
    { val: 'light', label: 'Ljust', icon: '☀️' },
    { val: 'dark', label: 'Mörkt', icon: '🌙' },
  ]
  const langs: { val: Lang; label: string; flag: string }[] = [
    { val: 'sv', label: 'Svenska', flag: '🇸🇪' },
    { val: 'en', label: 'English', flag: '🇬🇧' },
  ]
  return (
    <div style={{ background: 'var(--white)', borderRadius: 18, padding: '18px 16px', marginTop: 12, boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>
      <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 14 }}>Inställningar</div>
      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>Tema</p>
        <div style={{ display: 'flex', gap: 6 }}>
          {themes.map(t => <button key={t.val} onClick={() => setTheme(t.val)} style={pill(theme === t.val)}>{t.icon} {t.label}</button>)}
        </div>
      </div>
      <div>
        <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--txt)', margin: '0 0 8px' }}>Språk</p>
        <div style={{ display: 'flex', gap: 6 }}>
          {langs.map(l => <button key={l.val} onClick={() => setLang(l.val)} style={pill(lang === l.val)}>{l.flag} {l.label}</button>)}
        </div>
      </div>
    </div>
  )
}

// ── Edit sheet ────────────────────────────────────────────────────────────────
const VESSEL_TYPES = ['Segelbåt', 'Motorbåt', 'RIB', 'Katamaran', 'Segeljolle', 'Kajak', 'SUP', 'Annat']
const COUNTRIES = [
  { flag: '🇸🇪', name: 'Sverige' }, { flag: '🇳🇴', name: 'Norge' },
  { flag: '🇩🇰', name: 'Danmark' }, { flag: '🇫🇮', name: 'Finland' },
  { flag: '🇩🇪', name: 'Tyskland' }, { flag: '🇬🇧', name: 'Storbritannien' },
  { flag: '🇳🇱', name: 'Nederländerna' }, { flag: '🇫🇷', name: 'Frankrike' },
  { flag: '🇪🇸', name: 'Spanien' }, { flag: '🇮🇹', name: 'Italien' },
  { flag: '🇵🇱', name: 'Polen' }, { flag: '🇺🇸', name: 'USA' },
  { flag: '🇦🇺', name: 'Australien' }, { flag: '🇨🇦', name: 'Kanada' },
  { flag: '🇭🇷', name: 'Kroatien' }, { flag: '🇮🇸', name: 'Island' },
]
const PRIVACY_FIELDS = [
  { key: 'bio', label: 'Kort om mig' },
  { key: 'nationality', label: 'Land' },
  { key: 'experience_years', label: 'År till havs' },
  { key: 'vessel_name', label: 'Båtnamn' },
  { key: 'vessel_type', label: 'Båttyp' },
  { key: 'vessel_model', label: 'Båtmodell' },
  { key: 'home_port', label: 'Hemmahamn' },
  { key: 'sailing_region', label: 'Hemmafarvatten' },
]
const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 13px', borderRadius: 13,
  border: '1.5px solid rgba(10,123,140,0.18)',
  fontSize: 14, color: 'var(--txt)', background: 'var(--bg)',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}

function EditSheet({ user, onClose, onSaved }: { user: User; onClose: () => void; onSaved: (u: User) => void }) {
  const supabase  = createClient()
  const fileRef   = useRef<HTMLInputElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = user as any

  const [username,     setUsername]     = useState(user.username)
  const [avatarPreview,setAvatarPreview]= useState<string | null>(user.avatar)
  const [avatarFile,   setAvatarFile]   = useState<File | null>(null)
  const [bio,          setBio]          = useState<string>(u.bio ?? '')
  const [nationality,  setNationality]  = useState<string>(u.nationality ?? '')
  const [expYears,     setExpYears]     = useState<string>(u.experience_years?.toString() ?? '')
  const [vesselType,   setVesselType]   = useState<string>(u.vessel_type ?? '')
  const [vesselModel,  setVesselModel]  = useState<string>(u.vessel_model ?? '')
  const [vesselName,   setVesselName]   = useState<string>(u.vessel_name ?? '')
  const [homePort,     setHomePort]     = useState<string>(u.home_port ?? '')
  const [sailingRegion,setSailingRegion]= useState<string>(u.sailing_region ?? '')
  const [publicFields, setPublicFields] = useState<string[]>(u.public_fields ?? ['vessel_name', 'nationality', 'home_port', 'sailing_region'])
  const [saving, setSaving] = useState(false)
  const [error,  setError]  = useState<string | null>(null)

  function togglePublic(key: string) {
    setPublicFields(prev => prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key])
  }

  async function handleSave() {
    const trimmed = username.trim().toLowerCase()
    if (!trimmed || trimmed.length < 3) { setError('Aliaset måste vara minst 3 tecken.'); return }
    if (trimmed.length > 20) { setError('Aliaset får max vara 20 tecken.'); return }
    if (trimmed.includes(' ')) { setError('Aliaset får inte innehålla mellanslag.'); return }
    if (!/^[a-z0-9_.-]+$/.test(trimmed)) { setError('Bara a-z, siffror och _ . - är tillåtna.'); return }
    setSaving(true); setError(null)

    let avatarUrl = user.avatar
    if (avatarFile) {
      const ext  = avatarFile.name.split('.').pop() ?? 'jpg'
      const path = `avatars/${user.id}.${ext}`
      const { error: upErr } = await supabase.storage.from('images').upload(path, avatarFile, { upsert: true })
      if (upErr) { setError(`Kunde inte ladda upp bild: ${upErr.message}`); setSaving(false); return }
      avatarUrl = supabase.storage.from('images').getPublicUrl(path).data.publicUrl
    }
    if (trimmed !== user.username) {
      const { data: existing } = await supabase.from('users').select('id').eq('username', trimmed).neq('id', user.id).single()
      if (existing) { setError('Användarnamnet är redan taget.'); setSaving(false); return }
    }
    const { data: updated, error: upErr } = await supabase.from('users').update({
      username: trimmed, avatar: avatarUrl,
      bio: bio.trim() || null, nationality: nationality.trim() || null,
      experience_years: expYears ? parseInt(expYears) : null,
      vessel_type: vesselType || null, vessel_model: vesselModel.trim() || null,
      vessel_name: vesselName.trim() || null, home_port: homePort.trim() || null,
      sailing_region: sailingRegion.trim() || null, public_fields: publicFields,
    }).eq('id', user.id).select().single()
    if (upErr || !updated) { setError('Kunde inte spara. Försök igen.'); setSaving(false); return }
    toast('Profil sparad ✓')
    onSaved(updated as User)
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,20,35,0.45)', zIndex: 800, backdropFilter: 'blur(2px)' }} />
      <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900, background: 'var(--white)', borderRadius: '24px 24px 0 0', maxWidth: 520, margin: '0 auto', boxShadow: '0 -4px 40px rgba(0,45,60,0.18)', maxHeight: '92dvh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, background: 'rgba(10,123,140,0.18)', borderRadius: 2, margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 17, fontWeight: 600, color: 'var(--txt)', margin: '0 0 4px' }}>Redigera profil</h2>
        </div>
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 20px' }}>
          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, margin: '12px 0' }}>
            <div onClick={() => fileRef.current?.click()} style={{ width: 72, height: 72, borderRadius: '50%', cursor: 'pointer', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, fontWeight: 600, color: '#fff', overflow: 'hidden', border: '2.5px dashed rgba(10,123,140,0.3)', position: 'relative' }}>
              {avatarPreview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : user.username[0]?.toUpperCase()}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <span style={{ fontSize: 18 }}>📷</span>
              </div>
            </div>
            <button onClick={() => fileRef.current?.click()} style={{ padding: '8px 16px', borderRadius: 12, border: '1.5px solid rgba(10,123,140,0.2)', background: 'var(--white)', fontSize: 13, fontWeight: 700, color: 'var(--sea)', cursor: 'pointer' }}>
              Byt profilbild
            </button>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)) } }} />
          </div>

          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>ALIAS</label>
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} maxLength={32} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>KORT OM MIG</label>
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={160} rows={3} placeholder="T.ex. Seglare sedan 1998…" style={{ ...inputStyle, resize: 'none' }} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>LAND</label>
            <select value={nationality} onChange={e => setNationality(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="">Välj land…</option>
              {COUNTRIES.map(c => <option key={c.name} value={`${c.flag} ${c.name}`}>{c.flag} {c.name}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>ÅR TILL HAVS</label>
            <input type="number" value={expYears} onChange={e => setExpYears(e.target.value)} min={0} max={80} placeholder="15" style={inputStyle} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '16px 0 10px' }}>⚓ Min båt</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>BÅTNAMN</label>
            <input type="text" value={vesselName} onChange={e => setVesselName(e.target.value)} maxLength={60} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>BÅTTYP</label>
            <select value={vesselType} onChange={e => setVesselType(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="">Välj typ…</option>
              {VESSEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>MODELL</label>
            <input type="text" value={vesselModel} onChange={e => setVesselModel(e.target.value)} maxLength={80} style={inputStyle} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '16px 0 10px' }}>🧭 Hemmafarvatten</div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>HEMMAHAMN</label>
            <input type="text" value={homePort} onChange={e => setHomePort(e.target.value)} maxLength={80} style={inputStyle} />
          </div>
          <div style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 5 }}>REGION</label>
            <input type="text" value={sailingRegion} onChange={e => setSailingRegion(e.target.value)} maxLength={80} style={inputStyle} />
          </div>
          <div style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '16px 0 10px' }}>🔒 Sekretess</div>
          <div style={{ background: 'rgba(10,123,140,0.04)', borderRadius: 16, padding: '4px 12px', marginBottom: 20 }}>
            {PRIVACY_FIELDS.map(({ key, label }) => (
              <div key={key} onClick={() => togglePublic(key)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '11px 0', borderBottom: '1px solid rgba(10,123,140,0.07)', cursor: 'pointer' }}>
                <span style={{ fontSize: 13, color: 'var(--txt)' }}>{label}</span>
                <div style={{ width: 40, height: 22, borderRadius: 11, background: publicFields.includes(key) ? '#1e5c82' : 'rgba(10,123,140,0.15)', position: 'relative', transition: 'background .2s' }}>
                  <div style={{ position: 'absolute', top: 3, left: publicFields.includes(key) ? 21 : 3, width: 16, height: 16, borderRadius: '50%', background: 'var(--white)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left .2s' }} />
                </div>
              </div>
            ))}
          </div>
          {error && <div style={{ padding: '10px 14px', background: 'rgba(220,38,38,0.07)', borderRadius: 12, fontSize: 13, color: '#dc2626', marginBottom: 12 }}>{error}</div>}
        </div>
        <div style={{ padding: '12px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))', borderTop: '1px solid rgba(10,123,140,0.08)', display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '14px', borderRadius: 16, border: '1.5px solid rgba(10,123,140,0.15)', background: 'var(--white)', fontSize: 14, fontWeight: 700, color: 'var(--txt2)', cursor: 'pointer' }}>Avbryt</button>
          <button onClick={handleSave} disabled={saving} style={{ flex: 2, padding: '14px', borderRadius: 16, border: 'none', background: saving ? '#7a9dab' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)', fontSize: 14, fontWeight: 600, color: '#fff', cursor: saving ? 'not-allowed' : 'pointer', boxShadow: saving ? 'none' : '0 3px 12px rgba(30,92,130,0.35)' }}>
            {saving ? 'Sparar…' : 'Spara'}
          </button>
        </div>
      </div>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilPage() {
  const router     = useRouter()
  const [supabase] = useState(() => createClient())
  const [user,           setUser]           = useState<User | null>(null)
  const [trips,          setTrips]          = useState<Trip[]>([])
  const [loading,        setLoading]        = useState(true)
  const [editing,        setEditing]        = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)
  const [signOutOpen,    setSignOutOpen]    = useState(false)
  const [signingOut,     setSigningOut]     = useState(false)

  useEffect(() => {
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/logga-in'); return }
      const [{ data: profile }, { data: myTrips }, { count: fwers }, { count: fwing }] = await Promise.all([
        supabase.from('users').select('id, username, email, avatar, bio, nationality, experience_years, vessel_type, vessel_model, vessel_name, home_port, sailing_region, public_fields, created_at').eq('id', authUser.id).single(),
        supabase.from('trips').select('id, user_id, boat_type, distance, duration, average_speed_knots, max_speed_knots, image, location_name, caption, pinnar_rating, started_at, ended_at, created_at, route_points').eq('user_id', authUser.id).is('deleted_at', null).order('created_at', { ascending: false }),
        supabase.from('follows').select('*', { count: 'exact', head: true }).eq('following_id', authUser.id),
        supabase.from('follows').select('*', { count: 'exact', head: true }).eq('follower_id', authUser.id),
      ])
      setUser(profile as User)
      setTrips((myTrips as Trip[]) ?? [])
      setFollowersCount(fwers ?? 0)
      setFollowingCount(fwing ?? 0)
      setLoading(false)
    }
    load()
  }, []) // eslint-disable-line

  async function performSignOut() {
    setSigningOut(true)
    await supabase.auth.signOut()
    router.push('/logga-in')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = user as any
  const totalDist   = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const streak      = calcStreak(trips)
  const uniqueLocs  = new Set(trips.map(t => t.location_name).filter(Boolean)).size
  const unlockedAch = computeUnlocked(trips, streak)
  const lockedAch   = ACHIEVEMENTS.filter(a => !unlockedAch.includes(a))
  const pinnar3     = trips.filter(t => t.pinnar_rating === 3).length

  // Monthly bars
  const MONTHS = ['Jan','Feb','Mar','Apr','Maj','Jun','Jul','Aug','Sep','Okt','Nov','Dec']
  const monthMap: Record<string, { label: string; count: number }> = {}
  for (const t of trips) {
    const d   = new Date(t.created_at)
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`
    if (!monthMap[key]) monthMap[key] = { label: MONTHS[d.getMonth()], count: 0 }
    monthMap[key].count++
  }
  const monthBars = Object.entries(monthMap).sort(([a], [b]) => a.localeCompare(b)).slice(-6)
  const maxBar    = Math.max(...monthBars.map(([, v]) => v.count), 1)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom,0px) + 24px)' }}>

      {editing && user && (
        <EditSheet user={user} onClose={() => setEditing(false)} onSaved={updated => { setUser(updated); setEditing(false) }} />
      )}

      {signOutOpen && (
        <>
          <div onClick={() => !signingOut && setSignOutOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,20,35,0.55)', zIndex: 950, backdropFilter: 'blur(3px)' }} />
          <div role="dialog" aria-modal="true" aria-labelledby="logout-title" style={{
            position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)',
            zIndex: 960, width: 'min(360px, calc(100vw - 32px))',
            background: 'var(--white)', borderRadius: 22, padding: '22px 22px 16px',
            boxShadow: '0 20px 60px rgba(0,30,60,0.35)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
              <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(220,38,38,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22 }}>👋</div>
              <div>
                <h2 id="logout-title" style={{ fontSize: 16, fontWeight: 600, color: 'var(--txt)', margin: 0 }}>Logga ut?</h2>
                <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '2px 0 0' }}>Du behöver logga in igen nästa gång.</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button onClick={() => setSignOutOpen(false)} disabled={signingOut} style={{
                flex: 1, padding: '12px', borderRadius: 14,
                border: '1.5px solid rgba(10,123,140,0.15)', background: 'var(--white)',
                fontSize: 14, fontWeight: 600, color: 'var(--txt2)', cursor: signingOut ? 'not-allowed' : 'pointer',
              }}>Avbryt</button>
              <button onClick={performSignOut} disabled={signingOut} style={{
                flex: 1.4, padding: '12px', borderRadius: 14, border: 'none',
                background: signingOut ? '#cf6b6b' : 'linear-gradient(135deg, #dc2626, #b91c1c)',
                color: '#fff', fontSize: 14, fontWeight: 600, cursor: signingOut ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 14px rgba(220,38,38,0.35)',
              }}>{signingOut ? 'Loggar ut…' : 'Logga ut'}</button>
            </div>
          </div>
        </>
      )}

      {/* ── Sticky header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px',
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <span style={{ fontSize: 17, fontWeight: 600, color: 'var(--sea)' }}>{user?.username ?? 'Profil'}</span>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <MessageBell />
          <NotificationBell />
          <button onClick={() => setEditing(true)} style={{ background: 'rgba(10,123,140,0.08)', border: 'none', fontSize: 12, color: 'var(--sea)', cursor: 'pointer', fontWeight: 600, padding: '7px 14px', borderRadius: 20 }}>
            ✏️ Redigera
          </button>
          <button onClick={() => setSignOutOpen(true)} style={{ background: 'none', border: 'none', fontSize: 12, color: 'var(--txt3)', cursor: 'pointer', fontWeight: 600, padding: '7px 8px' }}>
            Logga ut
          </button>
        </div>
      </header>

      {/* ── Cover hero ── */}
      <div style={{
        height: 140,
        background: 'linear-gradient(160deg, #0d2240 0%, #1a4a5e 50%, #0a7b8c 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 80% 80% at 60% 120%, rgba(45,125,138,0.5) 0%, transparent 60%)' }} />
        <div style={{ position: 'absolute', bottom: -1, left: 0, right: 0, height: 32, background: 'var(--bg)', clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </div>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '0 16px' }}>

        {/* ── Avatar + actions row ── */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 12, marginTop: -44, marginBottom: 14 }}>
          <div style={{
            width: 88, height: 88, borderRadius: '50%', flexShrink: 0,
            background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            border: '4px solid var(--bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 600, color: '#fff',
            overflow: 'hidden',
            boxShadow: '0 4px 20px rgba(0,45,60,0.22)',
            position: 'relative',
          }}>
            {user?.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.username ?? 'Avatar'}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
              />
            ) : (
              user?.username?.[0]?.toUpperCase() ?? '?'
            )}
          </div>
          <div style={{ display: 'flex', gap: 6, paddingBottom: 4, marginLeft: 'auto' }}>
            {streak > 0 && (
              <div style={{ background: 'linear-gradient(135deg,#ff6b35,#f7931e)', borderRadius: 12, padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 4, boxShadow: '0 2px 8px rgba(255,107,53,0.35)' }}>
                <span style={{ fontSize: 14 }}>🔥</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: '#fff' }}>{streak}</span>
                <span style={{ fontSize: 9, fontWeight: 600, color: 'rgba(255,255,255,0.75)' }}>v</span>
              </div>
            )}
            {user?.username && (
              <Link href={`/u/${user.username}`} style={{ padding: '6px 12px', borderRadius: 12, border: '1.5px solid rgba(10,123,140,0.2)', background: 'var(--white)', fontSize: 12, color: 'var(--sea)', fontWeight: 700, textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                👁 Min sida
              </Link>
            )}
          </div>
        </div>

        {/* ── Name + bio + chips ── */}
        <div style={{ marginBottom: 16 }}>
          <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px', letterSpacing: '-0.3px' }}>{user?.username}</h1>
          {u?.bio && <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 10px' }}>{u.bio}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {u?.nationality && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>{u.nationality}</span>}
            {u?.vessel_name && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>⛵ {u.vessel_name}{u.vessel_model ? ` · ${u.vessel_model}` : ''}</span>}
            {u?.home_port && <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', background: 'rgba(10,123,140,0.07)', borderRadius: 20, padding: '4px 10px' }}>🏠 {u.home_port}</span>}
          </div>
        </div>

        {/* ── Stats bar ── */}
        <div style={{ background: 'var(--white)', borderRadius: 18, display: 'flex', marginBottom: 16, boxShadow: '0 1px 8px rgba(0,45,60,0.07)', overflow: 'hidden' }}>
          {([
            { val: trips.length,              label: 'Turer',   href: undefined as string | undefined },
            { val: totalDist.toFixed(0),      label: 'NM',      href: undefined },
            { val: uniqueLocs,                label: 'Platser', href: undefined },
            ...(pinnar3 > 0 ? [{ val: pinnar3, label: 'Magiska', href: undefined }] : []),
            { val: followersCount, label: 'Följare', href: user?.username ? `/u/${user.username}#followers` : undefined },
            { val: followingCount, label: 'Följer',  href: user?.username ? `/u/${user.username}#following` : undefined },
          ]).map(({ val, label, href }, i, arr) => {
            const inner = (
              <>
                <div style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', lineHeight: 1, letterSpacing: '-0.3px' }}>{val}</div>
                <div style={{ fontSize: 9, fontWeight: 600, color: 'var(--txt3)', marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.4px' }}>{label}</div>
              </>
            )
            const cellStyle: React.CSSProperties = {
              flex: 1, padding: '14px 0', textAlign: 'center',
              borderRight: i < arr.length - 1 ? '1px solid rgba(10,123,140,0.07)' : 'none',
              textDecoration: 'none', color: 'inherit',
              display: 'block',
            }
            return href
              ? <Link key={label} href={href} style={cellStyle}>{inner}</Link>
              : <div key={label} style={cellStyle}>{inner}</div>
          })}
        </div>

        {/* ── Achievements grid ── */}
        {ACHIEVEMENTS.length > 0 && (
          <div style={{ background: 'var(--white)', borderRadius: 18, padding: '16px', marginBottom: 16, boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>🏅 Märken</div>
              <span style={{ fontSize: 12, fontWeight: 600, color: unlockedAch.length > 0 ? 'var(--sea)' : 'var(--txt3)' }}>
                {unlockedAch.length}/{ACHIEVEMENTS.length} upplåsta
              </span>
            </div>

            {/* Unlocked badges first, then locked */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              {[...unlockedAch, ...lockedAch].map(a => {
                const unlocked = unlockedAch.includes(a)
                return (
                  <div key={a.id} title={`${a.label} — ${a.desc}`} style={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    gap: 5, padding: '12px 6px 10px',
                    borderRadius: 16,
                    background: unlocked ? 'rgba(10,123,140,0.06)' : 'rgba(0,0,0,0.03)',
                    border: `1.5px solid ${unlocked ? 'rgba(10,123,140,0.16)' : 'rgba(0,0,0,0.06)'}`,
                    opacity: unlocked ? 1 : 0.38,
                    filter: unlocked ? 'none' : 'grayscale(1)',
                    boxShadow: unlocked ? '0 2px 8px rgba(0,45,60,0.07)' : 'none',
                    transition: 'all 0.2s',
                    position: 'relative',
                  }}>
                    {unlocked && (
                      <div style={{
                        position: 'absolute', top: 5, right: 5,
                        width: 7, height: 7, borderRadius: '50%',
                        background: '#22c55e',
                      }} />
                    )}
                    <span style={{ fontSize: 24 }}>{a.emoji}</span>
                    <span style={{
                      fontSize: 9, fontWeight: 600,
                      color: unlocked ? 'var(--txt)' : 'var(--txt3)',
                      textAlign: 'center', lineHeight: 1.3,
                      maxWidth: 60, overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                    } as React.CSSProperties}>{a.label}</span>
                  </div>
                )
              })}
            </div>

            {/* Next to unlock hint */}
            {lockedAch.length > 0 && (
              <div style={{ marginTop: 14, padding: '11px 14px', background: 'rgba(201,110,42,0.07)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: 22, filter: 'grayscale(0.3)', opacity: 0.8 }}>{lockedAch[0].emoji}</span>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: '#c96e2a', marginBottom: 2 }}>Nästa: {lockedAch[0].label}</div>
                  <div style={{ fontSize: 11, color: 'var(--txt3)', lineHeight: 1.4 }}>{lockedAch[0].desc}</div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── Activity chart ── */}
        {monthBars.length > 0 && (
          <div style={{ background: 'var(--white)', borderRadius: 18, padding: '16px 16px 12px', boxShadow: '0 1px 8px rgba(0,45,60,0.07)', marginBottom: 16 }}>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px', marginBottom: 14 }}>Aktivitet</div>
            <div style={{ display: 'flex', gap: 6, alignItems: 'flex-end', height: 56 }}>
              {monthBars.map(([key, v]) => (
                <div key={key} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, height: '100%', justifyContent: 'flex-end' }}>
                  <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--sea)' }}>{v.count}</span>
                  <div style={{ width: '100%', borderRadius: '4px 4px 0 0', background: 'linear-gradient(to top,#1e5c82,#2d7d8a)', height: `${Math.max(6, (v.count / maxBar) * 36)}px` }} />
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              {monthBars.map(([key, v]) => (
                <div key={key} style={{ flex: 1, textAlign: 'center', fontSize: 9, fontWeight: 600, color: 'var(--txt3)' }}>{v.label}</div>
              ))}
            </div>
          </div>
        )}

        {/* ── Trip grid ── */}
        <div style={{ background: 'var(--white)', borderRadius: 18, overflow: 'hidden', boxShadow: '0 1px 8px rgba(0,45,60,0.07)' }}>
          {trips.length === 0 ? (
            <EmptyState
              icon={<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" /></svg>}
              title="Inga turer ännu"
              body="Logga din första tur och börja bygga din historia till havs."
              cta={{ label: 'Logga en tur', href: '/logga' }}
              marginTop={0}
            />
          ) : (
            <>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '14px 16px 10px' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px' }}>Mina turer</div>
                <span style={{ fontSize: 11, color: 'var(--txt3)' }}>{trips.length} st</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 2, padding: '0 2px 2px' }}>
                {trips.map(t => (
                  <Link key={t.id} href={`/tur/${t.id}`} style={{ position: 'relative', aspectRatio: '1/1', overflow: 'hidden', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', display: 'block', borderRadius: 4 }}>
                    {t.image ? (
                      <Image src={t.image} alt={t.location_name ?? 'Tur'} fill style={{ objectFit: 'cover' }} sizes="(max-width:520px) 33vw, 160px" />
                    ) : (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, opacity: 0.4 }}>⛵</div>
                    )}
                    {t.pinnar_rating === 3 && (
                      <div style={{ position: 'absolute', top: 4, right: 4, background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '2px 5px', fontSize: 8, fontWeight: 700, color: '#fff' }}>⚓⚓⚓</div>
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top,rgba(0,20,35,0.6) 0%,transparent 100%)', padding: '12px 5px 5px' }}>
                      {t.location_name && <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{t.location_name}</p>}
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Svalla Wrapped CTA ── */}
        <Link href="/insikter" style={{ textDecoration: 'none', display: 'block', marginTop: 12 }}>
          <div style={{
            position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #0a3a5a 0%, #1e5c82 50%, #c96e2a 180%)',
            borderRadius: 18, padding: '16px 18px',
            boxShadow: '0 4px 18px rgba(10,60,90,0.18)',
            display: 'flex', alignItems: 'center', gap: 14,
            WebkitTapHighlightColor: 'transparent',
          }}>
            <div aria-hidden style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              background: 'radial-gradient(circle at 85% -20%, rgba(255,255,255,0.18) 0%, transparent 55%)',
            }} />
            <div style={{ fontSize: 28, flexShrink: 0, position: 'relative' }}>✨</div>
            <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.75)', textTransform: 'uppercase', letterSpacing: '0.7px' }}>
                Svalla Wrapped
              </div>
              <div style={{ fontSize: 15, fontWeight: 700, color: '#fff', marginTop: 2 }}>
                Se dina insights
              </div>
            </div>
            <svg viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} style={{ width: 16, height: 16, flexShrink: 0, position: 'relative' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </Link>

        {/* ── Settings ── */}
        <SettingsSection />
      </div>
    </div>
  )
}

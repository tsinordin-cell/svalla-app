'use client'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import type { Trip, User } from '@/lib/supabase'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from '@/components/Toast'
import NotificationBell from '@/components/NotificationBell'
import { useTheme, type Theme, type Lang } from '@/components/ThemeProvider'

// ── Settings section ─────────────────────────────────────────────────────────
function SettingsSection() {
  const { theme, setTheme, lang, setLang } = useTheme()

  const themes: { val: Theme; sv: string; en: string; icon: string }[] = [
    { val: 'auto',  sv: 'Auto',   en: 'Auto',  icon: '🌗' },
    { val: 'light', sv: 'Ljust',  en: 'Light', icon: '☀️' },
    { val: 'dark',  sv: 'Mörkt',  en: 'Dark',  icon: '🌙' },
  ]
  const langs: { val: Lang; label: string; flag: string }[] = [
    { val: 'sv', label: 'Svenska', flag: '🇸🇪' },
    { val: 'en', label: 'English', flag: '🇬🇧' },
  ]

  const pill = (active: boolean): React.CSSProperties => ({
    padding: '8px 16px', borderRadius: 20, cursor: 'pointer', border: 'none',
    fontFamily: 'inherit', fontSize: 13, fontWeight: active ? 700 : 500,
    transition: 'all 0.15s',
    background: active ? 'linear-gradient(135deg,#1e5c82,#2d7d8a)' : 'rgba(10,123,140,0.07)',
    color: active ? '#fff' : '#3d5865',
    boxShadow: active ? '0 2px 8px rgba(30,92,130,0.25)' : 'none',
  })

  return (
    <div style={{ background: '#fff', borderRadius: 20, padding: '18px 16px', marginBottom: 12, boxShadow: '0 2px 12px rgba(0,45,60,0.07)' }}>
      <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 14px' }}>
        {lang === 'en' ? 'Settings' : 'Inställningar'}
      </h3>

      {/* Tema */}
      <div style={{ marginBottom: 16 }}>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#162d3a', margin: '0 0 8px' }}>
          {lang === 'en' ? 'Theme' : 'Tema'}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          {themes.map(t => (
            <button key={t.val} onClick={() => setTheme(t.val)} style={pill(theme === t.val)}>
              {t.icon} {lang === 'en' ? t.en : t.sv}
            </button>
          ))}
        </div>
        <p style={{ fontSize: 11, color: '#7a9dab', margin: '6px 0 0' }}>
          {lang === 'en'
            ? 'Auto: dark between 20:00–06:00'
            : 'Auto: mörkt 20:00–06:00, ljust dagtid'}
        </p>
      </div>

      {/* Språk */}
      <div>
        <p style={{ fontSize: 13, fontWeight: 700, color: '#162d3a', margin: '0 0 8px' }}>
          {lang === 'en' ? 'Language' : 'Språk'}
        </p>
        <div style={{ display: 'flex', gap: 6 }}>
          {langs.map(l => (
            <button key={l.val} onClick={() => setLang(l.val)} style={pill(lang === l.val)}>
              {l.flag} {l.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Achievements ──────────────────────────────────────────────────────────────
const ACHIEVEMENTS = [
  {
    id: 'first',    emoji: '🏁', label: 'Första kastet',
    desc: 'Loggade sin första tur',
    check: (t: Trip[], _d: number, _s: number) => t.length >= 1,
  },
  {
    id: 'five',     emoji: '🧭', label: 'Äventyrare',
    desc: '5 loggade turer',
    check: (t: Trip[], _d: number, _s: number) => t.length >= 5,
  },
  {
    id: 'ten',      emoji: '🌊', label: 'Saltvattenblod',
    desc: '10 loggade turer',
    check: (t: Trip[], _d: number, _s: number) => t.length >= 10,
  },
  {
    id: 'dist50',   emoji: '⚓', label: '50 NM',
    desc: '50 nautiska mil totalt',
    check: (_t: Trip[], d: number, _s: number) => d >= 50,
  },
  {
    id: 'dist100',  emoji: '⛵', label: '100 NM Segrare',
    desc: '100 nautiska mil totalt',
    check: (_t: Trip[], d: number, _s: number) => d >= 100,
  },
  {
    id: 'magic',    emoji: '✨', label: 'Magisk tur',
    desc: 'Loggade en ⚓⚓⚓-upplevelse',
    check: (t: Trip[], _d: number, _s: number) => t.some(x => x.pinnar_rating === 3),
  },
  {
    id: 'explorer', emoji: '🗺️', label: 'Kartläggaren',
    desc: 'Besökt 5 unika platser',
    check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 5,
  },
  {
    id: 'boats',    emoji: '🚤', label: 'Multifarare',
    desc: 'Loggat 3 olika båttyper',
    check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.boat_type).filter(Boolean)).size >= 3,
  },
  {
    id: 'streak3',  emoji: '🔥', label: 'Veckostrejk',
    desc: '3 veckor i rad med minst en tur',
    check: (_t: Trip[], _d: number, s: number) => s >= 3,
  },
  {
    id: 'twenty',   emoji: '🏆', label: 'Havets Herre',
    desc: '20 loggade turer',
    check: (t: Trip[], _d: number, _s: number) => t.length >= 20,
  },
  {
    id: 'dist250',  emoji: '🌍', label: 'Oceansegrare',
    desc: '250 nautiska mil totalt',
    check: (_t: Trip[], d: number, _s: number) => d >= 250,
  },
  {
    id: 'dist500',  emoji: '🚀', label: 'Atlantfararen',
    desc: '500 nautiska mil totalt',
    check: (_t: Trip[], d: number, _s: number) => d >= 500,
  },
  {
    id: 'locations10', emoji: '📍', label: 'Skärgårdsvandraren',
    desc: 'Besökt 10 unika platser',
    check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 10,
  },
  {
    id: 'locations25', emoji: '🗾', label: 'Arkipelagos',
    desc: 'Besökt 25 unika platser',
    check: (t: Trip[], _d: number, _s: number) => new Set(t.map(x => x.location_name).filter(Boolean)).size >= 25,
  },
  {
    id: 'magic3',   emoji: '🌟', label: 'Magikern',
    desc: '3 magiska ⚓⚓⚓-upplevelser',
    check: (t: Trip[], _d: number, _s: number) => t.filter(x => x.pinnar_rating === 3).length >= 3,
  },
  {
    id: 'streak8',  emoji: '⚡', label: 'Veckokrigaren',
    desc: '8 veckor i rad med minst en tur',
    check: (_t: Trip[], _d: number, s: number) => s >= 8,
  },
  {
    id: 'earlybird', emoji: '🌅', label: 'Gryningsseglaren',
    desc: 'Logga en tur som startar före kl 07:00',
    check: (t: Trip[]) => t.some(x => {
      if (!x.started_at) return false
      const h = new Date(x.started_at).getHours()
      return h < 7
    }),
  },
  {
    id: 'nightsail', emoji: '🌙', label: 'Nattseglaren',
    desc: 'Logga en tur som slutar efter kl 22:00',
    check: (t: Trip[]) => t.some(x => {
      if (!x.ended_at) return false
      const h = new Date(x.ended_at).getHours()
      return h >= 22
    }),
  },
  {
    id: 'speed15',  emoji: '💨', label: 'Vindridaren',
    desc: 'Uppnå en toppfart på 15 knop',
    check: (t: Trip[]) => t.some((x: Trip & { max_speed_knots?: number }) => (x.max_speed_knots ?? 0) >= 15),
  },
  {
    id: 'fifty_trips', emoji: '👑', label: 'Skärgårdskungen',
    desc: '50 loggade turer',
    check: (t: Trip[], _d: number, _s: number) => t.length >= 50,
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function getISOWeek(d: Date): string {
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil((((d.getTime() - jan1.getTime()) / 86400000) + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${week.toString().padStart(2, '0')}`
}

function calcStreak(trips: Trip[]): number {
  if (trips.length === 0) return 0
  const weeks = new Set(trips.map(t => getISOWeek(new Date(t.created_at))))
  const sorted = [...weeks].sort((a, b) => b.localeCompare(a))

  const now = new Date()
  const currentWeek = getISOWeek(now)
  const lastWeekDate = new Date(now); lastWeekDate.setDate(lastWeekDate.getDate() - 7)
  const prevWeek = getISOWeek(lastWeekDate)

  if (!weeks.has(currentWeek) && !weeks.has(prevWeek)) return 0

  let streak = 0
  let check = weeks.has(currentWeek) ? currentWeek : prevWeek
  for (const week of sorted) {
    if (week === check) {
      streak++
      const [yr, wk] = check.split('-W').map(Number)
      const d = new Date(yr, 0, 1 + (wk - 1) * 7 - 7)
      check = getISOWeek(d)
    } else {
      break
    }
  }
  return streak
}

function favoritePlats(trips: Trip[]): string | null {
  const counts: Record<string, number> = {}
  for (const t of trips) {
    if (t.location_name) counts[t.location_name] = (counts[t.location_name] ?? 0) + 1
  }
  return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null
}

// ── Länder med flaggor ────────────────────────────────────────────────────────
const COUNTRIES = [
  { flag: '🇸🇪', name: 'Sverige' },
  { flag: '🇳🇴', name: 'Norge' },
  { flag: '🇩🇰', name: 'Danmark' },
  { flag: '🇫🇮', name: 'Finland' },
  { flag: '🇩🇪', name: 'Tyskland' },
  { flag: '🇬🇧', name: 'Storbritannien' },
  { flag: '🇳🇱', name: 'Nederländerna' },
  { flag: '🇫🇷', name: 'Frankrike' },
  { flag: '🇪🇸', name: 'Spanien' },
  { flag: '🇮🇹', name: 'Italien' },
  { flag: '🇵🇱', name: 'Polen' },
  { flag: '🇺🇸', name: 'USA' },
  { flag: '🇦🇺', name: 'Australien' },
  { flag: '🇨🇦', name: 'Kanada' },
  { flag: '🇯🇵', name: 'Japan' },
  { flag: '🇧🇷', name: 'Brasilien' },
  { flag: '🇦🇹', name: 'Österrike' },
  { flag: '🇨🇭', name: 'Schweiz' },
  { flag: '🇧🇪', name: 'Belgien' },
  { flag: '🇵🇹', name: 'Portugal' },
  { flag: '🇬🇷', name: 'Grekland' },
  { flag: '🇸🇦', name: 'Saudiarabien' },
  { flag: '🇦🇪', name: 'Förenade Arabemiraten' },
  { flag: '🇳🇿', name: 'Nya Zeeland' },
  { flag: '🇸🇬', name: 'Singapore' },
  { flag: '🇭🇷', name: 'Kroatien' },
  { flag: '🇮🇸', name: 'Island' },
  { flag: '🇪🇪', name: 'Estland' },
  { flag: '🇱🇻', name: 'Lettland' },
  { flag: '🇱🇹', name: 'Litauen' },
]

// ── Edit Sheet ────────────────────────────────────────────────────────────────
const VESSEL_TYPES = ['Segelbåt', 'Motorbåt', 'RIB', 'Katamaran', 'Segeljolle', 'Kajak', 'SUP', 'Annat']
const PRIVACY_FIELDS: { key: string; label: string }[] = [
  { key: 'bio',              label: 'Kort om mig' },
  { key: 'nationality',      label: 'Land (flagga)' },
  { key: 'experience_years', label: 'År till havs' },
  { key: 'vessel_name',      label: 'Båtnamn' },
  { key: 'vessel_type',      label: 'Båttyp' },
  { key: 'vessel_model',     label: 'Båtmodell' },
  { key: 'home_port',        label: 'Hemmahamn' },
  { key: 'sailing_region',   label: 'Hemmafarvatten' },
]

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '20px 0 10px' }}>
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 12 }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#5a8090', marginBottom: 5, letterSpacing: '0.3px' }}>
        {label}
      </label>
      {children}
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', padding: '11px 13px', borderRadius: 13,
  border: '1.5px solid rgba(10,123,140,0.18)',
  fontSize: 14, color: '#162d3a', background: '#f2f8fa',
  outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
}

function EditSheet({
  user, onClose, onSaved,
}: { user: User; onClose: () => void; onSaved: (u: User) => void }) {
  const supabase      = createClient()
  const fileRef       = useRef<HTMLInputElement>(null)

  // Basic
  const [username,      setUsername]      = useState(user.username)
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar)
  const [avatarFile,    setAvatarFile]    = useState<File | null>(null)

  // Extended — cast to any since type may not have these yet
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = user as any
  const [bio,            setBio]           = useState<string>(u.bio ?? '')
  const [nationality,    setNationality]   = useState<string>(u.nationality ?? '')
  const [expYears,       setExpYears]      = useState<string>(u.experience_years?.toString() ?? '')
  const [vesselType,     setVesselType]    = useState<string>(u.vessel_type ?? '')
  const [vesselModel,    setVesselModel]   = useState<string>(u.vessel_model ?? '')
  const [vesselName,     setVesselName]    = useState<string>(u.vessel_name ?? '')
  const [homePort,       setHomePort]      = useState<string>(u.home_port ?? '')
  const [sailingRegion,  setSailingRegion] = useState<string>(u.sailing_region ?? '')
  const [publicFields,   setPublicFields]  = useState<string[]>(
    u.public_fields ?? ['vessel_name', 'nationality', 'home_port', 'sailing_region']
  )

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
    if (!/^[a-z0-9_.-]+$/.test(trimmed)) { setError('Bara bokstäver (a-z), siffror och _ . - är tillåtna.'); return }
    setSaving(true); setError(null)

    let avatarUrl = user.avatar
    if (avatarFile) {
      const ext  = avatarFile.name.split('.').pop() ?? 'jpg'
      const path = `avatars/${user.id}.${ext}`
      const { error: upErr } = await supabase.storage.from('images').upload(path, avatarFile, { upsert: true })
      if (upErr) { setError(`Kunde inte ladda upp bild: ${upErr.message}`); setSaving(false); return }
      const { data: urlData } = supabase.storage.from('images').getPublicUrl(path)
      avatarUrl = urlData.publicUrl
    }

    if (trimmed !== user.username) {
      const { data: existing } = await supabase.from('users').select('id').eq('username', trimmed).neq('id', user.id).single()
      if (existing) { setError('Användarnamnet är redan taget.'); setSaving(false); return }
    }

    const { data: updated, error: upErr } = await supabase
      .from('users')
      .update({
        username: trimmed,
        avatar: avatarUrl,
        bio: bio.trim() || null,
        nationality: nationality.trim() || null,
        experience_years: expYears ? parseInt(expYears) : null,
        vessel_type: vesselType || null,
        vessel_model: vesselModel.trim() || null,
        vessel_name: vesselName.trim() || null,
        home_port: homePort.trim() || null,
        sailing_region: sailingRegion.trim() || null,
        public_fields: publicFields,
      })
      .eq('id', user.id)
      .select()
      .single()

    if (upErr || !updated) { setError('Kunde inte spara. Försök igen.'); setSaving(false); return }
    toast('Profil sparad ✓')
    onSaved(updated as User)
  }

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,20,35,0.45)', zIndex: 800, backdropFilter: 'blur(2px)' }} />
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 900,
        background: '#fff', borderRadius: '24px 24px 0 0',
        maxWidth: 520, margin: '0 auto',
        boxShadow: '0 -4px 40px rgba(0,45,60,0.18)',
        maxHeight: '92dvh', display: 'flex', flexDirection: 'column',
      }}>
        {/* Handle */}
        <div style={{ padding: '12px 20px 0', flexShrink: 0 }}>
          <div style={{ width: 36, height: 4, background: 'rgba(10,123,140,0.18)', borderRadius: 2, margin: '0 auto 16px' }} />
          <h2 style={{ fontSize: 17, fontWeight: 900, color: '#162d3a', margin: '0 0 4px' }}>Redigera profil</h2>
          <p style={{ fontSize: 12, color: '#7a9dab', margin: '0 0 12px' }}>Välj vad andra ska kunna se under Sekretess</p>
        </div>

        {/* Scrollable content */}
        <div style={{ overflowY: 'auto', flex: 1, padding: '0 20px' }}>

          {/* Avatar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 4 }}>
            <div onClick={() => fileRef.current?.click()} style={{
              width: 72, height: 72, borderRadius: '50%', cursor: 'pointer',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 900, color: '#fff', overflow: 'hidden',
              border: '2.5px dashed rgba(10,123,140,0.3)', position: 'relative',
            }}>
              {avatarPreview
                // eslint-disable-next-line @next/next/no-img-element
                ? <img src={avatarPreview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                : user.username[0]?.toUpperCase()}
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                <span style={{ fontSize: 18 }}>📷</span>
              </div>
            </div>
            <div>
              <button onClick={() => fileRef.current?.click()} style={{ padding: '8px 16px', borderRadius: 12, border: '1.5px solid rgba(10,123,140,0.2)', background: '#fff', fontSize: 13, fontWeight: 700, color: '#1e5c82', cursor: 'pointer' }}>
                Byt profilbild
              </button>
              <p style={{ fontSize: 11, color: '#7a9dab', margin: '4px 0 0' }}>JPG eller PNG, max 5 MB</p>
            </div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }}
              onChange={e => { const f = e.target.files?.[0]; if (f) { setAvatarFile(f); setAvatarPreview(URL.createObjectURL(f)) } }} />
          </div>

          {/* ── Grundinfo ── */}
          <SectionLabel>Grundinfo</SectionLabel>
          <Field label="ALIAS / SMEKNAMN">
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} maxLength={32}
              placeholder="Ditt alias som syns för andra"
              style={inputStyle} />
            <p style={{ fontSize: 11, color: '#7a9dab', margin: '3px 0 0' }}>Bokstäver, siffror, _ . och - tillåtna. Används i din profil-URL.</p>
          </Field>
          <Field label="KORT OM MIG">
            <textarea value={bio} onChange={e => setBio(e.target.value)} maxLength={160} rows={3}
              placeholder="T.ex. Seglare sedan 1998, älskar Stockholms skärgård…"
              style={{ ...inputStyle, resize: 'none' }} />
            <p style={{ fontSize: 11, color: '#7a9dab', margin: '3px 0 0', textAlign: 'right' }}>{bio.length}/160</p>
          </Field>
          <Field label="LAND">
            <div style={{ position: 'relative' }}>
              <select
                value={nationality}
                onChange={e => setNationality(e.target.value)}
                style={{ ...inputStyle, appearance: 'none', paddingRight: 36 }}
              >
                <option value="">Välj land…</option>
                {COUNTRIES.map(c => (
                  <option key={c.name} value={`${c.flag} ${c.name}`}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
              <span style={{
                position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                fontSize: 16, pointerEvents: 'none',
              }}>
                {COUNTRIES.find(c => `${c.flag} ${c.name}` === nationality)?.flag ?? '🌍'}
              </span>
            </div>
          </Field>
          <Field label="ÅR TILL HAVS">
            <input type="number" value={expYears} onChange={e => setExpYears(e.target.value)} min={0} max={80}
              placeholder="T.ex. 15" style={inputStyle} />
          </Field>

          {/* ── Min båt ── */}
          <SectionLabel>⚓ Min båt</SectionLabel>
          <Field label="BÅTNAMN">
            <input type="text" value={vesselName} onChange={e => setVesselName(e.target.value)} maxLength={60}
              placeholder="T.ex. Albatross, Sally…" style={inputStyle} />
          </Field>
          <Field label="BÅTTYP">
            <select value={vesselType} onChange={e => setVesselType(e.target.value)} style={{ ...inputStyle, appearance: 'none' }}>
              <option value="">Välj typ…</option>
              {VESSEL_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
          <Field label="MODELL / MÄRKE">
            <input type="text" value={vesselModel} onChange={e => setVesselModel(e.target.value)} maxLength={80}
              placeholder="T.ex. Hallberg-Rassy 34, Beneteau 40…" style={inputStyle} />
          </Field>

          {/* ── Hemmafarvatten ── */}
          <SectionLabel>🧭 Hemmafarvatten</SectionLabel>
          <Field label="HEMMAHAMN">
            <input type="text" value={homePort} onChange={e => setHomePort(e.target.value)} maxLength={80}
              placeholder="T.ex. Sandhamn, Göteborg…" style={inputStyle} />
          </Field>
          <Field label="REGION / DEL AV VÄRLDEN">
            <input type="text" value={sailingRegion} onChange={e => setSailingRegion(e.target.value)} maxLength={80}
              placeholder="T.ex. Stockholms skärgård, Medelhavet…" style={inputStyle} />
          </Field>

          {/* ── Sekretess ── */}
          <SectionLabel>🔒 Sekretess — vad syns för andra?</SectionLabel>
          <div style={{ background: 'rgba(10,123,140,0.04)', borderRadius: 16, padding: '4px 12px', marginBottom: 20 }}>
            {PRIVACY_FIELDS.map(({ key, label }) => (
              <div key={key} onClick={() => togglePublic(key)} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '11px 0', borderBottom: '1px solid rgba(10,123,140,0.07)', cursor: 'pointer',
              }}>
                <span style={{ fontSize: 13, color: '#162d3a' }}>{label}</span>
                <div style={{
                  width: 40, height: 22, borderRadius: 11,
                  background: publicFields.includes(key) ? '#1e5c82' : 'rgba(10,123,140,0.15)',
                  position: 'relative', transition: 'background .2s',
                }}>
                  <div style={{
                    position: 'absolute', top: 3, left: publicFields.includes(key) ? 21 : 3,
                    width: 16, height: 16, borderRadius: '50%', background: '#fff',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.2)', transition: 'left .2s',
                  }} />
                </div>
              </div>
            ))}
          </div>

          {error && (
            <div style={{ padding: '10px 14px', background: 'rgba(220,38,38,0.07)', borderRadius: 12, fontSize: 13, color: '#dc2626', marginBottom: 12 }}>
              {error}
            </div>
          )}
        </div>

        {/* Footer buttons */}
        <div style={{ padding: '12px 20px', paddingBottom: 'max(20px, env(safe-area-inset-bottom))', borderTop: '1px solid rgba(10,123,140,0.08)', display: 'flex', gap: 10, flexShrink: 0 }}>
          <button onClick={onClose} style={{ flex: 1, padding: '14px', borderRadius: 16, border: '1.5px solid rgba(10,123,140,0.15)', background: '#fff', fontSize: 14, fontWeight: 700, color: '#5a8090', cursor: 'pointer' }}>
            Avbryt
          </button>
          <button onClick={handleSave} disabled={saving} style={{
            flex: 2, padding: '14px', borderRadius: 16, border: 'none',
            background: saving ? '#7a9dab' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
            fontSize: 14, fontWeight: 800, color: '#fff', cursor: saving ? 'not-allowed' : 'pointer',
            boxShadow: saving ? 'none' : '0 3px 12px rgba(30,92,130,0.35)',
          }}>
            {saving ? 'Sparar…' : 'Spara ändringar'}
          </button>
        </div>
      </div>
    </>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function ProfilPage() {
  const router   = useRouter()
  const supabase = createClient()
  const [user,           setUser]           = useState<User | null>(null)
  const [trips,          setTrips]          = useState<Trip[]>([])
  const [loading,        setLoading]        = useState(true)
  const [editing,        setEditing]        = useState(false)
  const [followersCount, setFollowersCount] = useState(0)
  const [followingCount, setFollowingCount] = useState(0)

  useEffect(() => {
    async function load() {
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (!authUser) { router.push('/logga-in'); return }

      const [
        { data: profile },
        { data: myTrips },
        { count: fwers },
        { count: fwing },
      ] = await Promise.all([
        supabase.from('users').select('*').eq('id', authUser.id).single(),
        supabase.from('trips').select('*').eq('user_id', authUser.id).order('created_at', { ascending: false }),
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

  async function handleSignOut() {
    await supabase.auth.signOut()
    router.push('/logga-in')
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 32, height: 32, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }} />
      </div>
    )
  }

  // ── Computed ────────────────────────────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const u = user as any
  const totalDist  = trips.reduce((a, t) => a + (t.distance ?? 0), 0)
  const streak     = calcStreak(trips)
  const favPlats   = favoritePlats(trips)
  const pinnar1    = trips.filter(t => t.pinnar_rating === 1).length
  const pinnar2    = trips.filter(t => t.pinnar_rating === 2).length
  const pinnar3    = trips.filter(t => t.pinnar_rating === 3).length
  const ratedTrips = pinnar1 + pinnar2 + pinnar3
  const unlockedAch = ACHIEVEMENTS.filter(a => a.check(trips, totalDist, streak))
  const lockedAch   = ACHIEVEMENTS.filter(a => !a.check(trips, totalDist, streak))
  const uniqueLocs  = new Set(trips.map(t => t.location_name).filter(Boolean)).size

  return (
    <div style={{ minHeight: '100vh', background: '#f2f8fa', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 16px)' }}>

      {/* ── Edit sheet ── */}
      {editing && user && (
        <EditSheet
          user={user}
          onClose={() => setEditing(false)}
          onSaved={updated => { setUser(updated); setEditing(false) }}
        />
      )}

      {/* ── Header ── */}
      <header style={{
        display: 'flex', alignItems: 'center', padding: '12px 16px',
        background: 'rgba(250,254,255,0.96)',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        position: 'sticky', top: 0, zIndex: 50,
      }}>
        <h1 style={{ fontSize: 20, fontWeight: 900, color: '#1e5c82', margin: 0 }}>Profil</h1>
        <div style={{ marginLeft: 'auto', display: 'flex', gap: 6, alignItems: 'center' }}>
          <NotificationBell />
          {user?.username && (
            <Link href={`/u/${user.username}`} style={{
              background: 'rgba(10,123,140,0.06)', border: '1px solid rgba(10,123,140,0.15)',
              fontSize: 12, color: '#1e5c82', fontWeight: 700,
              padding: '7px 12px', borderRadius: 20, textDecoration: 'none',
              display: 'flex', alignItems: 'center', gap: 4,
            }}>
              👁 Min profil
            </Link>
          )}
          <button onClick={() => setEditing(true)} style={{
            background: 'rgba(10,123,140,0.08)', border: 'none',
            fontSize: 12, color: '#1e5c82', cursor: 'pointer', fontWeight: 700,
            padding: '7px 14px', borderRadius: 20,
          }}>
            ✏️ Redigera
          </button>
          <button onClick={handleSignOut} style={{
            background: 'none', border: 'none',
            fontSize: 12, color: '#7a9dab', cursor: 'pointer', fontWeight: 600, padding: '7px 10px',
          }}>
            Logga ut
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: '14px 14px' }}>

        {/* ── Identity card ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '20px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {/* Avatar */}
            <div style={{
              width: 68, height: 68, borderRadius: '50%', flexShrink: 0,
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 26, fontWeight: 900, color: '#fff', overflow: 'hidden',
              border: '2.5px solid rgba(10,123,140,0.12)',
            }}>
              {user?.avatar
                ? <Image src={user.avatar} alt="" width={68} height={68} style={{ objectFit: 'cover' }} />
                : user?.username?.[0]?.toUpperCase() ?? '?'
              }
            </div>
            {/* Name + meta */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <h2 style={{ fontSize: 20, fontWeight: 900, color: '#162d3a', margin: '0 0 1px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {user?.username ?? 'Okänd'}
              </h2>
              <p style={{ fontSize: 11, color: '#7a9dab', margin: '0 0 6px' }}>{user?.email}</p>
              {/* Followers / following */}
              <div style={{ display: 'flex', gap: 14 }}>
                <span style={{ fontSize: 12, color: '#5a8090' }}>
                  <strong style={{ color: '#162d3a' }}>{followersCount}</strong> följare
                </span>
                <span style={{ fontSize: 12, color: '#5a8090' }}>
                  <strong style={{ color: '#162d3a' }}>{followingCount}</strong> följer
                </span>
              </div>
            </div>
            {/* Streak flame */}
            {streak > 0 && (
              <div style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                background: 'linear-gradient(135deg,#ff6b35,#f7931e)',
                borderRadius: 14, padding: '8px 14px',
                boxShadow: '0 2px 10px rgba(255,107,53,0.4)',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: 20 }}>🔥</span>
                <span style={{ fontSize: 16, fontWeight: 900, color: '#fff', lineHeight: 1 }}>{streak}</span>
                <span style={{ fontSize: 8, fontWeight: 700, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.4px' }}>VECKOR</span>
              </div>
            )}
          </div>

          {/* Bio */}
          {u?.bio && (
            <p style={{ fontSize: 13, color: '#4a7080', lineHeight: 1.55, margin: '14px 0 0', padding: '12px 14px', background: 'rgba(10,123,140,0.04)', borderRadius: 12 }}>
              {u.bio}
            </p>
          )}

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 14 }}>
            {[
              { val: trips.length,              label: 'Turer',   emoji: '⛵' },
              { val: `${totalDist.toFixed(1)}`, label: 'NM tot',  emoji: '🧭' },
              { val: uniqueLocs,                label: 'Platser', emoji: '📍' },
            ].map(({ val, label, emoji }) => (
              <div key={label} style={{
                background: 'rgba(10,123,140,0.05)', borderRadius: 14, padding: '12px 8px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 18, marginBottom: 2 }}>{emoji}</div>
                <div style={{ fontSize: 20, fontWeight: 900, color: '#1e5c82', lineHeight: 1 }}>{val}</div>
                <div style={{ fontSize: 9, fontWeight: 700, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.4px', marginTop: 3 }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Favoritplats */}
          {favPlats && (
            <div style={{
              marginTop: 10, padding: '10px 14px',
              background: 'rgba(10,123,140,0.05)', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 18 }}>📌</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Favoritplats</div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#1e5c82' }}>{favPlats}</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Vessel / sailor info card ── */}
        {(u?.vessel_name || u?.vessel_type || u?.home_port || u?.nationality || u?.experience_years) && (
          <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 12 }}>
            <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 14px' }}>
              ⚓ Min båt &amp; bakgrund
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {u?.vessel_name && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 16 }}>⛵</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Båt</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#162d3a' }}>
                      {u.vessel_name}{u.vessel_type ? ` · ${u.vessel_type}` : ''}{u.vessel_model ? ` (${u.vessel_model})` : ''}
                    </div>
                  </div>
                </div>
              )}
              {u?.home_port && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 16 }}>🏠</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Hemmahamn</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#162d3a' }}>
                      {u.home_port}{u.sailing_region ? ` · ${u.sailing_region}` : ''}
                    </div>
                  </div>
                </div>
              )}
              {(u?.nationality || u?.experience_years) && (
                <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                  <span style={{ fontSize: 16 }}>🧭</span>
                  <div>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.4px' }}>Bakgrund</div>
                    <div style={{ fontSize: 14, fontWeight: 800, color: '#162d3a' }}>
                      {[u.nationality, u.experience_years ? `${u.experience_years} år till havs` : null].filter(Boolean).join(' · ')}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ── Pinnar-breakdown ── */}
        {ratedTrips > 0 && (
          <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 12 }}>
            <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 14px' }}>
              ⚓ Pinnar-fördelning
            </h3>
            {[
              { emoji: '⚓⚓⚓', label: 'Magisk 🔥', count: pinnar3, color: '#c96e2a' },
              { emoji: '⚓⚓',   label: 'Bra tur!',  count: pinnar2, color: '#1e5c82' },
              { emoji: '⚓',    label: 'Okej',       count: pinnar1, color: '#7a9dab' },
            ].map(({ emoji, label, count, color }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <span style={{ fontSize: 14, width: 52 }}>{emoji}</span>
                <div style={{ flex: 1, height: 8, background: 'rgba(10,123,140,0.08)', borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: 4, background: color,
                    width: `${(count / ratedTrips) * 100}%`,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
                <span style={{ fontSize: 13, fontWeight: 800, color, width: 20, textAlign: 'right' }}>{count}</span>
              </div>
            ))}
          </div>
        )}

        {/* ── Achievements ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)', marginBottom: 12 }}>
          <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: '0 0 14px' }}>
            Märken · {unlockedAch.length}/{ACHIEVEMENTS.length}
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
            {ACHIEVEMENTS.map((a) => {
              const unlocked = unlockedAch.includes(a)
              return (
                <div key={a.id} style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4,
                  padding: '10px 4px', borderRadius: 14,
                  background: unlocked ? 'rgba(10,123,140,0.07)' : 'rgba(0,0,0,0.025)',
                  border: `1.5px solid ${unlocked ? 'rgba(10,123,140,0.18)' : 'transparent'}`,
                  opacity: unlocked ? 1 : 0.35,
                }}>
                  <span style={{ fontSize: 22, filter: unlocked ? 'none' : 'grayscale(1)' }}>{a.emoji}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: unlocked ? '#1e5c82' : '#7a9dab', textAlign: 'center', lineHeight: 1.3 }}>
                    {a.label}
                  </span>
                </div>
              )
            })}
          </div>

          {/* Next badge hint */}
          {lockedAch.length > 0 && (
            <div style={{
              marginTop: 14, padding: '10px 14px',
              background: 'rgba(201,110,42,0.06)', borderRadius: 12,
              display: 'flex', alignItems: 'center', gap: 10,
            }}>
              <span style={{ fontSize: 20, filter: 'grayscale(0.5)', opacity: 0.7 }}>{lockedAch[0].emoji}</span>
              <div>
                <div style={{ fontSize: 11, fontWeight: 700, color: '#c96e2a' }}>Nästa: {lockedAch[0].label}</div>
                <div style={{ fontSize: 11, color: '#7a9dab' }}>{lockedAch[0].desc}</div>
              </div>
            </div>
          )}
        </div>

        {/* ── Trip grid ── */}
        <div style={{ background: '#fff', borderRadius: 20, padding: '18px 20px', boxShadow: '0 2px 12px rgba(0,45,60,0.07)' }}>
          {trips.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
              <div style={{ fontSize: 52, marginBottom: 12 }}>⛵</div>
              <p style={{ fontSize: 14, color: '#7a9dab', marginBottom: 20 }}>Inga turer ännu</p>
              <Link href="/logga" style={{
                display: 'inline-block', padding: '12px 28px', borderRadius: 14,
                background: 'linear-gradient(135deg,#c96e2a,#e07828)',
                color: '#fff', fontWeight: 700, fontSize: 14,
                boxShadow: '0 4px 16px rgba(201,110,42,0.4)', textDecoration: 'none',
              }}>
                Logga din första tur →
              </Link>
            </div>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                <h3 style={{ fontSize: 11, fontWeight: 800, color: '#7a9dab', textTransform: 'uppercase', letterSpacing: '0.6px', margin: 0 }}>
                  Mina turer
                </h3>
                <span style={{ fontSize: 11, color: '#7a9dab' }}>{trips.length} st</span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
                {trips.map((t) => (
                  <Link key={t.id} href={`/tur/${t.id}`} style={{
                    position: 'relative', aspectRatio: '1 / 1', borderRadius: 12,
                    overflow: 'hidden', background: '#a8ccd4', display: 'block',
                  }}>
                    <Image
                      src={t.image}
                      alt={t.location_name ?? 'Tur'}
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 520px) 33vw, 160px"
                    />
                    {t.pinnar_rating && (
                      <span style={{
                        position: 'absolute', top: 4, right: 4,
                        background: 'rgba(0,0,0,0.45)', backdropFilter: 'blur(4px)',
                        color: '#fff', fontSize: 8, padding: '2px 5px', borderRadius: 8, fontWeight: 700,
                      }}>
                        {'⚓'.repeat(t.pinnar_rating)}
                      </span>
                    )}
                    {t.location_name && (
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0,
                        background: 'linear-gradient(to top, rgba(0,20,35,0.65) 0%, transparent 100%)',
                        padding: '14px 5px 5px',
                      }}>
                        <p style={{ fontSize: 9, fontWeight: 700, color: '#fff', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {t.location_name}
                        </p>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>

        {/* ── Inställningar ── */}
        <SettingsSection />

      </div>
    </div>
  )
}

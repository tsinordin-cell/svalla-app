'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Icon, { type IconName } from '@/components/Icon'
import { track } from '@/lib/analytics-events'

interface Suggestion {
  id: string
  username: string
  avatar: string | null
  vessel_model: string | null
  home_port: string | null
}

interface Props {
  userId: string
  initialUsername: string
  suggestions: Suggestion[]
}

type VesselType = 'own' | 'charter' | 'paddle' | 'guest'
type Step = 'type' | 'vessel' | 'port' | 'follow'

interface TypeOption {
  id: VesselType
  icon: IconName
  title: string
  desc: string
}

const TYPE_OPTIONS: TypeOption[] = [
  { id: 'own',     icon: 'sailboat',  title: 'Jag har egen båt',           desc: 'Segelbåt, motorbåt, RIB eller liknande' },
  { id: 'charter', icon: 'anchor',    title: 'Jag chartrar eller hyr',     desc: 'Hyr båt vid behov' },
  { id: 'paddle',  icon: 'waves',     title: 'Kajak, SUP eller liknande',  desc: 'Paddlar i skärgården' },
  { id: 'guest',   icon: 'users',     title: 'Med vänner eller familj',    desc: 'Åker som gäst eller besättning' },
]

const COMMON_BOATS = [
  'Nimbus', 'Bavaria', 'Hallberg-Rassy', 'Najad', 'Beneteau',
  'Maxi', 'Albin', 'Linjett', 'RIB', 'Motorbåt',
]

const COMMON_PORTS = [
  'Stockholm', 'Vaxholm', 'Saltsjöbaden', 'Värmdö', 'Nynäshamn',
  'Dalarö', 'Sandhamn', 'Marstrand', 'Smögen', 'Göteborg',
  'Strömstad', 'Trosa',
]

export default function OnboardingFlow({ userId, initialUsername: _initialUsername, suggestions }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<Step>('type')
  const [vesselType, setVesselType] = useState<VesselType | null>(null)
  const [vesselModel, setVesselModel] = useState('')
  const [vesselName, setVesselName] = useState('')
  const [homePort, setHomePort] = useState('')
  const [followIds, setFollowIds] = useState<Set<string>>(new Set())
  const [startedAt] = useState(() => Date.now())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => { track('onboarding_started', { step: 1 }) }, [])

  // Step-flow: type → (vessel om own) → port → follow
  const ownsBoat = vesselType === 'own'
  const totalSteps = ownsBoat ? 4 : 3
  const stepIndex: Record<Step, number> = ownsBoat
    ? { type: 1, vessel: 2, port: 3, follow: 4 }
    : { type: 1, vessel: 2, port: 2, follow: 3 }
  const currentStepNumber = stepIndex[step]

  const canVesselContinue = vesselModel.trim().length >= 2
  const canPortContinue = homePort.trim().length >= 2
  const canFollowContinue = followIds.size >= 1

  function toggleFollow(id: string) {
    setFollowIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function pickType(t: VesselType) {
    setVesselType(t)
    track('onboarding_step', { step: 1 })
    // Båtägare → gå till vessel-steg, alla andra hoppar direkt till port
    if (t === 'own') setStep('vessel')
    else setStep('port')
  }

  function next() {
    if (step === 'vessel') { track('onboarding_step', { step: 2 }); setStep('port') }
    else if (step === 'port') { track('onboarding_step', { step: ownsBoat ? 3 : 2 }); setStep('follow') }
    else if (step === 'follow') handleSubmit()
  }

  function back() {
    if (step === 'vessel') setStep('type')
    else if (step === 'port') setStep(ownsBoat ? 'vessel' : 'type')
    else if (step === 'follow') setStep('port')
  }

  async function handleSubmit() {
    setSaving(true)
    setError('')
    try {
      const supabase = createClient()

      // Spara profil — vessel_model bara om egen båt
      const profileUpdate: Record<string, string | null> = {
        home_port: homePort.trim(),
        onboarded_at: new Date().toISOString(),
      }
      if (ownsBoat) {
        profileUpdate.vessel_model = vesselModel.trim()
        profileUpdate.vessel_name = vesselName.trim() || null
      } else {
        // Lagra typ som vessel_model för icke-ägare så feed kan filtrera
        const typeLabel: Record<Exclude<VesselType, 'own'>, string> = {
          charter: 'Charter',
          paddle: 'Kajak / SUP',
          guest: 'Gästar / besättning',
        }
        profileUpdate.vessel_model = typeLabel[vesselType as Exclude<VesselType, 'own'>]
      }

      const { error: upErr } = await supabase
        .from('users')
        .update(profileUpdate)
        .eq('id', userId)
      if (upErr) { setError(upErr.message); setSaving(false); return }

      // Skapa follows + trigga notis och push
      if (followIds.size > 0) {
        const followRows = Array.from(followIds).map(fid => ({
          follower_id: userId,
          following_id: fid,
        }))
        await supabase.from('follows').upsert(followRows, { onConflict: 'follower_id,following_id', ignoreDuplicates: true })

        const { data: me } = await supabase.from('users').select('username').eq('id', userId).single()
        const myName = me?.username ?? 'Någon'

        await Promise.allSettled(Array.from(followIds).flatMap(fid => [
          fetch('/api/notifications/insert', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ targetUserId: fid, type: 'follow' }),
          }),
          fetch('/api/push/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              targetUserId: fid,
              title: 'Ny följare',
              body: `${myName} börjar följa dig`,
              url: `/u/${myName}`,
            }),
          }),
        ]))
      }

      track('onboarding_completed', { duration_seconds: Math.round((Date.now() - startedAt) / 1000) })
      router.replace('/feed')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Något gick fel')
      setSaving(false)
    }
  }

  async function skipAll() {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('users').update({ onboarded_at: new Date().toISOString() }).eq('id', userId)
    track('onboarding_step', { step: 1, skipped: true })
    router.replace('/feed')
  }

  return (
    <div style={{
      width: '100%', maxWidth: 540,
      margin: '0 auto',
      flex: 1,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Brand mark — subtil men present */}
      <div style={{
        textAlign: 'center', marginBottom: 22,
        color: '#fff', opacity: 0.85,
      }}>
        <div style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 20, fontWeight: 800,
          letterSpacing: '0.18em',
        }}>SVALLA</div>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 24 }}>
        {Array.from({ length: totalSteps }).map((_, i) => {
          const dotIdx = i + 1
          const active = dotIdx === currentStepNumber
          const done = dotIdx < currentStepNumber
          return (
            <div key={i} style={{
              width: active ? 28 : 8,
              height: 8,
              borderRadius: 4,
              background: done ? '#fff' : active ? '#fff' : 'rgba(255,255,255,0.30)',
              transition: 'all 240ms cubic-bezier(.2,.8,.2,1)',
              boxShadow: active ? '0 2px 8px rgba(255,255,255,0.30)' : 'none',
            }}/>
          )
        })}
      </div>

      <div
        key={step}
        style={{
          background: 'var(--card-bg, #fff)',
          borderRadius: 24,
          padding: '32px 28px',
          boxShadow: '0 24px 70px rgba(10,31,43,0.35), 0 4px 12px rgba(10,31,43,0.10)',
          animation: 'svallaOnboardSlide 360ms cubic-bezier(.2,.8,.2,1)',
        }}>
        <style>{`
          @keyframes svallaOnboardSlide {
            from { opacity: 0; transform: translateY(20px) scale(0.985); }
            to   { opacity: 1; transform: translateY(0) scale(1); }
          }
          @keyframes svallaPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.04); }
          }
        `}</style>

        {/* ── STEG 1: TYP ── */}
        {step === 'type' && (
          <>
            <div style={stepBadge}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                Steg 1 av {totalSteps}
              </span>
            </div>
            <h1 style={titleStyle}>Hur tar du dig ut på vattnet?</h1>
            <p style={subtitleStyle}>
              Vi anpassar din feed och rekommendationer. Det finns inget rätt eller fel svar — alla är välkomna på Svalla.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {TYPE_OPTIONS.map(opt => {
                const selected = vesselType === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => pickType(opt.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '16px 18px', borderRadius: 16,
                      background: selected ? 'rgba(10,123,140,0.10)' : 'rgba(10,123,140,0.04)',
                      border: selected ? '1.5px solid var(--sea)' : '1.5px solid rgba(10,123,140,0.10)',
                      cursor: 'pointer', textAlign: 'left',
                      fontFamily: 'inherit',
                      transition: 'all 180ms cubic-bezier(.2,.8,.2,1)',
                      boxShadow: selected ? '0 4px 14px rgba(10,123,140,0.18)' : 'none',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform = 'translateY(-1px)'
                      e.currentTarget.style.background = 'rgba(10,123,140,0.08)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.background = selected ? 'rgba(10,123,140,0.10)' : 'rgba(10,123,140,0.04)'
                    }}
                  >
                    <div style={{
                      width: 44, height: 44, borderRadius: 14,
                      background: selected
                        ? 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))'
                        : 'rgba(10,123,140,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: selected ? '#fff' : 'var(--sea)',
                      flexShrink: 0,
                      transition: 'all 180ms ease',
                    }}>
                      <Icon name={opt.icon} size={22} stroke={1.8} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>{opt.title}</div>
                      <div style={{ fontSize: 12.5, color: 'var(--txt2)' }}>{opt.desc}</div>
                    </div>
                    {selected && (
                      <div style={{
                        width: 22, height: 22, borderRadius: 999,
                        background: 'var(--sea)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff',
                        flexShrink: 0,
                      }}>
                        <Icon name="check" size={12} stroke={3} />
                      </div>
                    )}
                  </button>
                )
              })}
            </div>
          </>
        )}

        {/* ── STEG 2: BÅT (bara för ägare) ── */}
        {step === 'vessel' && (
          <>
            <div style={stepBadge}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                Steg 2 av {totalSteps}
              </span>
            </div>
            <h1 style={titleStyle}>Berätta om båten</h1>
            <p style={subtitleStyle}>
              Hjälper oss matcha turer, rekommendera rutter och hitta likasinnade ägare.
            </p>

            <label style={{ display: 'block', marginBottom: 16 }}>
              <span style={labelStyle}>Modell</span>
              <input
                type="text"
                value={vesselModel}
                onChange={e => setVesselModel(e.target.value)}
                placeholder="t.ex. Nimbus 27"
                autoComplete="off"
                style={inputStyle}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {COMMON_BOATS.map(b => (
                  <button key={b} type="button" onClick={() => setVesselModel(b)} style={chipStyle(vesselModel === b)}>
                    {b}
                  </button>
                ))}
              </div>
            </label>

            <label style={{ display: 'block' }}>
              <span style={labelStyle}>Båtens namn <span style={{ color: 'var(--txt3)', fontWeight: 400 }}>(valfritt)</span></span>
              <input
                type="text"
                value={vesselName}
                onChange={e => setVesselName(e.target.value)}
                placeholder="t.ex. Skäggig Sjötupp"
                autoComplete="off"
                style={inputStyle}
              />
            </label>
          </>
        )}

        {/* ── STEG: PORT ── */}
        {step === 'port' && (
          <>
            <div style={stepBadge}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                Steg {currentStepNumber} av {totalSteps}
              </span>
            </div>
            <h1 style={titleStyle}>Vilken är din skärgård?</h1>
            <p style={subtitleStyle}>
              Vi anpassar feed och tipsen så du ser det som händer nära dig.
            </p>

            <label style={{ display: 'block' }}>
              <span style={labelStyle}>Hemmavatten eller utgångspunkt</span>
              <input
                type="text"
                value={homePort}
                onChange={e => setHomePort(e.target.value)}
                placeholder="t.ex. Vaxholm"
                autoComplete="off"
                style={inputStyle}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 10 }}>
                {COMMON_PORTS.map(p => (
                  <button key={p} type="button" onClick={() => setHomePort(p)} style={chipStyle(homePort === p)}>
                    {p}
                  </button>
                ))}
              </div>
            </label>
          </>
        )}

        {/* ── STEG: FÖLJ ── */}
        {step === 'follow' && (
          <>
            <div style={stepBadge}>
              <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.10em' }}>
                Sista steget
              </span>
            </div>
            <h1 style={titleStyle}>Följ några skärgårdsbor</h1>
            <p style={subtitleStyle}>
              Din feed fylls med deras turer, foton och tips. Du kan följa fler senare.
            </p>

            {suggestions.length === 0 ? (
              <div style={{
                padding: '24px 16px', textAlign: 'center',
                background: 'rgba(10,123,140,0.04)', borderRadius: 14,
                color: 'var(--txt3)', fontSize: 13,
              }}>
                Inga förslag just nu — du kan följa folk efter onboarding.
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, maxHeight: 380, overflowY: 'auto', paddingRight: 4 }}>
                {suggestions.map(s => {
                  const followed = followIds.has(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleFollow(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '12px 14px',
                        borderRadius: 14,
                        background: followed ? 'rgba(10,123,140,0.10)' : 'rgba(10,123,140,0.04)',
                        border: followed ? '1.5px solid var(--sea)' : '1.5px solid rgba(10,123,140,0.10)',
                        cursor: 'pointer', textAlign: 'left',
                        fontFamily: 'inherit',
                        transition: 'all 160ms cubic-bezier(.2,.8,.2,1)',
                        boxShadow: followed ? '0 3px 10px rgba(10,123,140,0.14)' : 'none',
                      }}
                    >
                      {s.avatar ? (
                        <img src={s.avatar} alt="" width={42} height={42} style={{
                          width: 42, height: 42, aspectRatio: '1 / 1', borderRadius: '50%',
                          objectFit: 'cover', flexShrink: 0,
                          border: followed ? '2px solid var(--sea)' : '2px solid transparent',
                          transition: 'border-color 160ms ease',
                        }}/>
                      ) : (
                        <div style={{
                          width: 42, height: 42, aspectRatio: '1 / 1', borderRadius: '50%',
                          background: 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 16, fontWeight: 700, color: '#fff',
                          flexShrink: 0,
                          border: followed ? '2px solid var(--sea)' : '2px solid transparent',
                          transition: 'border-color 160ms ease',
                        }}>{(s.username[0] ?? '?').toUpperCase()}</div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>@{s.username}</div>
                        {(s.vessel_model || s.home_port) && (
                          <div style={{ fontSize: 11.5, color: 'var(--txt3)', marginTop: 2 }}>
                            {s.vessel_model}{s.vessel_model && s.home_port ? ' · ' : ''}{s.home_port}
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: 24, height: 24, borderRadius: 999,
                        background: followed ? 'var(--sea)' : 'transparent',
                        border: followed ? 'none' : '2px solid rgba(10,123,140,0.30)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        color: '#fff',
                        transition: 'all 160ms ease',
                      }}>
                        {followed && <Icon name="check" size={13} stroke={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            <div style={{
              fontSize: 11.5, color: 'var(--txt3)', textAlign: 'center',
              marginTop: 14, marginBottom: 0,
              fontWeight: 500,
            }}>
              {followIds.size === 0 && 'Markera minst 1 person'}
              {followIds.size === 1 && '1 vald — bra start'}
              {followIds.size === 2 && '2 valda — perfekt'}
              {followIds.size >= 3 && `${followIds.size} valda — du är redo`}
            </div>
          </>
        )}

        {error && (
          <div style={{
            marginTop: 14, padding: '11px 14px',
            background: 'rgba(239,68,68,0.08)', color: '#dc2626',
            fontSize: 13, fontWeight: 600, borderRadius: 12,
            border: '1px solid rgba(239,68,68,0.18)',
          }}>
            {error}
          </div>
        )}

        {/* Actions — visa endast på steg 2-4 (typ-stegget har självständiga val) */}
        {step !== 'type' && (
          <div style={{ display: 'flex', gap: 10, marginTop: 26 }}>
            <button
              type="button"
              onClick={back}
              disabled={saving}
              style={{
                padding: '13px 18px', borderRadius: 12,
                background: 'rgba(10,123,140,0.06)',
                color: 'var(--sea)',
                border: 'none', fontSize: 14, fontWeight: 600,
                cursor: saving ? 'wait' : 'pointer', fontFamily: 'inherit',
                transition: 'background 150ms ease',
              }}
              onMouseEnter={e => { if (!saving) e.currentTarget.style.background = 'rgba(10,123,140,0.10)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(10,123,140,0.06)' }}
            >
              Tillbaka
            </button>
            <button
              type="button"
              onClick={next}
              disabled={
                saving ||
                (step === 'vessel' && !canVesselContinue) ||
                (step === 'port' && !canPortContinue) ||
                (step === 'follow' && !canFollowContinue)
              }
              style={{
                flex: 1,
                padding: '13px 18px', borderRadius: 12,
                background: (
                  saving ||
                  (step === 'vessel' && !canVesselContinue) ||
                  (step === 'port' && !canPortContinue) ||
                  (step === 'follow' && !canFollowContinue)
                ) ? 'rgba(10,123,140,0.20)' : 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
                color: '#fff',
                border: 'none', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit',
                letterSpacing: '0.02em',
                boxShadow: '0 8px 22px rgba(10,123,140,0.32)',
                transition: 'all 160ms ease',
              }}
            >
              {saving ? 'Sparar…' : step === 'follow' ? 'Klar — visa min feed' : 'Fortsätt'}
            </button>
          </div>
        )}
      </div>

      {/* Footer — subtil skip-länk */}
      <div style={{ textAlign: 'center', marginTop: 20 }}>
        <button
          type="button"
          onClick={skipAll}
          disabled={saving}
          style={{
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.62)',
            fontSize: 12.5, fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'inherit',
            padding: '8px 12px',
            transition: 'color 150ms ease',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.92)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.62)' }}
        >
          Hoppa över för nu
        </button>
      </div>
    </div>
  )
}

const titleStyle: React.CSSProperties = {
  fontFamily: "'Playfair Display', serif",
  fontSize: 30, fontWeight: 800, color: 'var(--txt)',
  margin: '0 0 10px', letterSpacing: '-0.5px',
  lineHeight: 1.15,
}

const subtitleStyle: React.CSSProperties = {
  fontSize: 14.5, color: 'var(--txt2)', lineHeight: 1.6,
  margin: '0 0 26px',
}

const stepBadge: React.CSSProperties = {
  display: 'inline-flex',
  background: 'rgba(10,123,140,0.08)',
  padding: '5px 11px',
  borderRadius: 999,
  marginBottom: 12,
}

const labelStyle: React.CSSProperties = {
  fontSize: 12.5, fontWeight: 600, color: 'var(--txt2)',
  marginBottom: 8, display: 'block',
}

const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  padding: '13px 16px', borderRadius: 12,
  border: '1.5px solid rgba(10,123,140,0.15)',
  background: 'rgba(10,123,140,0.02)',
  fontSize: 15.5, color: 'var(--txt)', outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 150ms, box-shadow 150ms',
}

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: '7px 12px', borderRadius: 18,
  background: active ? 'var(--sea)' : 'rgba(10,123,140,0.06)',
  color: active ? '#fff' : 'var(--sea)',
  border: 'none',
  fontSize: 12, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit',
  transition: 'all 140ms ease',
})

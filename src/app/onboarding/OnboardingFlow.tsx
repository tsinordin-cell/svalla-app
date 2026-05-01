'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import Icon from '@/components/Icon'
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

type Step = 1 | 2 | 3

const COMMON_BOATS = [
  'Nimbus', 'Bavaria', 'Hallberg-Rassy', 'Najad', 'Beneteau',
  'Maxi', 'Albin', 'Linjett', 'Sunseeker', 'Princess',
  'Kajak', 'SUP', 'RIB', 'Motorbåt', 'Segelbåt',
]

const COMMON_PORTS = [
  'Stockholm', 'Vaxholm', 'Saltsjöbaden', 'Värmdö', 'Nynäshamn',
  'Dalarö', 'Sandhamn', 'Marstrand', 'Smögen', 'Göteborg',
  'Strömstad', 'Orust', 'Tjörn', 'Trosa', 'Oxelösund',
]

export default function OnboardingFlow({ userId, initialUsername, suggestions }: Props) {
  const router = useRouter()
  const [step, setStep] = useState<Step>(1)
  const [startedAt] = useState(() => Date.now())
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [vesselModel, setVesselModel] = useState('')
  const [vesselName, setVesselName] = useState('')
  const [homePort, setHomePort] = useState('')
  const [followIds, setFollowIds] = useState<Set<string>>(new Set())

  useEffect(() => { track('onboarding_started', { step: 1 }) }, [])

  const canStep1Continue = vesselModel.trim().length >= 2
  const canStep2Continue = homePort.trim().length >= 2
  const canStep3Continue = followIds.size >= 1 // Minst 1, rekommenderat 3

  function toggleFollow(id: string) {
    setFollowIds(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  async function handleSubmit() {
    setSaving(true)
    setError('')
    try {
      const supabase = createClient()

      // 1. Uppdatera user-profil
      const { error: upErr } = await supabase
        .from('users')
        .update({
          vessel_model: vesselModel.trim(),
          vessel_name: vesselName.trim() || null,
          home_port: homePort.trim(),
          onboarded_at: new Date().toISOString(),
        })
        .eq('id', userId)
      if (upErr) { setError(upErr.message); setSaving(false); return }

      // 2. Skapa follows
      if (followIds.size > 0) {
        const followRows = Array.from(followIds).map(fid => ({
          follower_id: userId,
          following_id: fid,
        }))
        await supabase.from('follows').upsert(followRows, { onConflict: 'follower_id,following_id', ignoreDuplicates: true })
      }

      track('onboarding_completed', { duration_seconds: Math.round((Date.now() - startedAt) / 1000) })
      router.replace('/feed')
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Något gick fel')
      setSaving(false)
    }
  }

  function next() {
    if (step === 1) { track('onboarding_step', { step: 1 }); setStep(2) }
    else if (step === 2) { track('onboarding_step', { step: 2 }); setStep(3) }
    else handleSubmit()
  }

  return (
    <div style={{
      width: '100%', maxWidth: 540,
      margin: '0 auto',
      flex: 1,
      display: 'flex', flexDirection: 'column',
      justifyContent: 'center',
    }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginBottom: 28 }}>
        {[1, 2, 3].map(s => (
          <div key={s} style={{
            width: s === step ? 24 : 8,
            height: 8,
            borderRadius: 4,
            background: s <= step ? '#fff' : 'rgba(255,255,255,0.30)',
            transition: 'all 200ms ease',
          }}/>
        ))}
      </div>

      <div
        key={step}
        style={{
          background: 'var(--card-bg, #fff)',
          borderRadius: 20,
          padding: '28px 26px',
          boxShadow: '0 20px 60px rgba(10,31,43,0.30)',
          animation: 'svallaOnboardSlide 320ms cubic-bezier(.2,.8,.2,1)',
        }}>
        <style>{`
          @keyframes svallaOnboardSlide {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>

        {step === 1 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Steg 1 av 3
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, fontWeight: 800, color: 'var(--txt)',
              margin: '0 0 10px', letterSpacing: '-0.5px',
            }}>
              Vad har du för båt?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 22px' }}>
              Hjälper oss matcha turer, rekommendera rutter och hitta likasinnade.
            </p>

            <label style={{ display: 'block', marginBottom: 14 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6, display: 'block' }}>
                Modell *
              </span>
              <input
                type="text"
                value={vesselModel}
                onChange={e => setVesselModel(e.target.value)}
                placeholder="t.ex. Nimbus 27"
                autoComplete="off"
                style={inputStyle}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {COMMON_BOATS.slice(0, 8).map(b => (
                  <button key={b} type="button" onClick={() => setVesselModel(b)} style={chipStyle(vesselModel === b)}>
                    {b}
                  </button>
                ))}
              </div>
            </label>

            <label style={{ display: 'block' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6, display: 'block' }}>
                Båtens namn (valfritt)
              </span>
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

        {step === 2 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Steg 2 av 3
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, fontWeight: 800, color: 'var(--txt)',
              margin: '0 0 10px', letterSpacing: '-0.5px',
            }}>
              Var har du hemmahamn?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 22px' }}>
              Vi anpassar feed och tipsen efter din skärgård.
            </p>

            <label style={{ display: 'block' }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--txt2)', marginBottom: 6, display: 'block' }}>
                Hemmahamn / utgångspunkt *
              </span>
              <input
                type="text"
                value={homePort}
                onChange={e => setHomePort(e.target.value)}
                placeholder="t.ex. Vaxholm"
                autoComplete="off"
                style={inputStyle}
              />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 8 }}>
                {COMMON_PORTS.slice(0, 8).map(p => (
                  <button key={p} type="button" onClick={() => setHomePort(p)} style={chipStyle(homePort === p)}>
                    {p}
                  </button>
                ))}
              </div>
            </label>
          </>
        )}

        {step === 3 && (
          <>
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--sea)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 6 }}>
              Steg 3 av 3
            </div>
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 28, fontWeight: 800, color: 'var(--txt)',
              margin: '0 0 10px', letterSpacing: '-0.5px',
            }}>
              Följ minst 3 personer
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt2)', lineHeight: 1.55, margin: '0 0 18px' }}>
              Din feed fylls med deras turer. Du kan följa fler senare.
            </p>

            {suggestions.length === 0 ? (
              <p style={{ fontSize: 13, color: 'var(--txt3)', fontStyle: 'italic', margin: 0 }}>
                Inga förslag just nu — du kan följa folk efter onboarding.
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, maxHeight: 360, overflowY: 'auto' }}>
                {suggestions.map(s => {
                  const followed = followIds.has(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleFollow(s.id)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 12,
                        padding: '10px 12px',
                        borderRadius: 12,
                        background: followed ? 'rgba(10,123,140,0.10)' : 'rgba(10,123,140,0.04)',
                        border: followed ? '1.5px solid var(--sea)' : '1px solid rgba(10,123,140,0.10)',
                        cursor: 'pointer', textAlign: 'left',
                        fontFamily: 'inherit',
                        transition: 'all 150ms ease',
                      }}
                    >
                      {s.avatar ? (
                        <img src={s.avatar} alt="" width={36} height={36} style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}/>
                      ) : (
                        <div style={{
                          width: 36, height: 36, borderRadius: '50%',
                          background: 'var(--grad-sea)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 14, fontWeight: 700, color: '#fff',
                          flexShrink: 0,
                        }}>{(s.username[0] ?? '?').toUpperCase()}</div>
                      )}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13.5, fontWeight: 700, color: 'var(--txt)' }}>@{s.username}</div>
                        {(s.vessel_model || s.home_port) && (
                          <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
                            {s.vessel_model}{s.vessel_model && s.home_port ? ' · ' : ''}{s.home_port}
                          </div>
                        )}
                      </div>
                      <div style={{
                        width: 22, height: 22, borderRadius: 999,
                        background: followed ? 'var(--sea)' : 'transparent',
                        border: followed ? 'none' : '2px solid rgba(10,123,140,0.30)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                        color: '#fff',
                      }}>
                        {followed && <Icon name="check" size={12} stroke={3} />}
                      </div>
                    </button>
                  )
                })}
              </div>
            )}

            <p style={{ fontSize: 11, color: 'var(--txt3)', textAlign: 'center', marginTop: 14, marginBottom: 0 }}>
              {followIds.size === 0 && 'Markera minst 1 person'}
              {followIds.size === 1 && '1 vald — bra start'}
              {followIds.size === 2 && '2 valda — perfekt'}
              {followIds.size >= 3 && `${followIds.size} valda — du är redo`}
            </p>
          </>
        )}

        {error && (
          <div style={{
            marginTop: 14, padding: '10px 14px',
            background: 'rgba(239,68,68,0.08)', color: '#dc2626',
            fontSize: 13, fontWeight: 600, borderRadius: 10,
          }}>
            {error}
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: 10, marginTop: 24 }}>
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep((step - 1) as Step)}
              disabled={saving}
              style={{
                padding: '12px 18px', borderRadius: 12,
                background: 'rgba(10,123,140,0.06)',
                color: 'var(--sea)',
                border: 'none', fontSize: 14, fontWeight: 600,
                cursor: 'pointer', fontFamily: 'inherit',
              }}
            >
              Tillbaka
            </button>
          )}
          <button
            type="button"
            onClick={next}
            disabled={
              saving ||
              (step === 1 && !canStep1Continue) ||
              (step === 2 && !canStep2Continue) ||
              (step === 3 && !canStep3Continue)
            }
            style={{
              flex: 1,
              padding: '12px 18px', borderRadius: 12,
              background: (
                (step === 1 && !canStep1Continue) ||
                (step === 2 && !canStep2Continue) ||
                (step === 3 && !canStep3Continue) ||
                saving
              ) ? 'rgba(10,123,140,0.20)' : 'var(--grad-sea, linear-gradient(135deg, #0a7b8c 0%, #0d8fa3 100%))',
              color: '#fff',
              border: 'none', fontSize: 14, fontWeight: 700,
              cursor: 'pointer', fontFamily: 'inherit',
              letterSpacing: '0.02em',
              boxShadow: '0 6px 18px rgba(10,123,140,0.30)',
              transition: 'all 150ms ease',
            }}
          >
            {saving ? 'Sparar…' : step === 3 ? 'Klar — visa min feed' : 'Fortsätt'}
          </button>
        </div>
      </div>

      {/* Footer */}
      <div style={{ textAlign: 'center', marginTop: 18 }}>
        <button
          type="button"
          onClick={async () => {
            // "Hoppa över" — markera onboarded ändå men minimal data
            setSaving(true)
            const supabase = createClient()
            await supabase.from('users')
              .update({ onboarded_at: new Date().toISOString() })
              .eq('id', userId)
            track('onboarding_step', { step, skipped: true })
            router.replace('/feed')
          }}
          style={{
            background: 'transparent', border: 'none',
            color: 'rgba(255,255,255,0.65)',
            fontSize: 12, fontWeight: 500,
            cursor: 'pointer', textDecoration: 'underline',
            fontFamily: 'inherit',
          }}
        >
          Hoppa över för nu
        </button>
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box',
  padding: '11px 14px', borderRadius: 10,
  border: '1.5px solid rgba(10,123,140,0.15)',
  background: 'rgba(10,123,140,0.02)',
  fontSize: 15, color: 'var(--txt)', outline: 'none',
  fontFamily: 'inherit',
  transition: 'border-color 0.15s, box-shadow 0.15s',
}

const chipStyle = (active: boolean): React.CSSProperties => ({
  padding: '5px 10px', borderRadius: 16,
  background: active ? 'var(--sea)' : 'rgba(10,123,140,0.06)',
  color: active ? '#fff' : 'var(--sea)',
  border: 'none',
  fontSize: 11, fontWeight: 600,
  cursor: 'pointer', fontFamily: 'inherit',
  transition: 'all 120ms ease',
})

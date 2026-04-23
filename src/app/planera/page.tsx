'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

type Step = 'duration' | 'group' | 'vibe' | 'start'

const DURATIONS = [
  { value: 'dagstur',   label: 'Dagstur',     sub: '4–8 timmar',     emoji: '☀️' },
  { value: 'helgtur',   label: 'Helgtur',     sub: 'Fre–sön',        emoji: '⛺' },
  { value: 'veckotur',  label: 'Veckotur',    sub: '5–7 dagar',      emoji: '🗓️' },
  { value: 'timmar',    label: 'Kvällstur',   sub: '2–4 timmar',     emoji: '🌅' },
]

const GROUPS = [
  { value: 'solo',        label: 'Solo',          emoji: '🧘' },
  { value: 'par',         label: 'Par',            emoji: '💑' },
  { value: 'vänner',      label: 'Kompisgäng',     emoji: '🍻' },
  { value: 'familj',      label: 'Familj med barn', emoji: '👨‍👩‍👧' },
]

const VIBES = [
  { value: 'naturupplevelse', label: 'Natur & stillhet',  emoji: '🌿' },
  { value: 'mat och krog',    label: 'Mat & dryck',       emoji: '🍽' },
  { value: 'segling',         label: 'Segling & äventyr', emoji: '⛵' },
  { value: 'bad och sol',     label: 'Bad & sol',         emoji: '🏖' },
  { value: 'kultur',          label: 'Historia & kultur', emoji: '🏛' },
  { value: 'aktivitet',       label: 'Paddling & sport',  emoji: '🚣' },
]

const STARTS = [
  { value: 'Stockholm',   label: 'Stockholm',    emoji: '🏙' },
  { value: 'Ingarö',      label: 'Ingarö',       emoji: '⚓' },
  { value: 'Stavsnäs',    label: 'Stavsnäs',     emoji: '🚢' },
  { value: 'Vaxholm',     label: 'Vaxholm',      emoji: '🏰' },
  { value: 'Nynäshamn',   label: 'Nynäshamn',   emoji: '⛴' },
  { value: 'Norrtälje',   label: 'Norrtälje',    emoji: '🗺' },
]

export default function PlaneraTurPage() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('duration')
  const [duration, setDuration] = useState('')
  const [group, setGroup] = useState('')
  const [vibe, setVibe] = useState('')
  const [start, setStart] = useState('')

  const steps: Step[] = ['duration', 'group', 'vibe', 'start']
  const stepIdx = steps.indexOf(step)

  function buildQuery() {
    const d = DURATIONS.find(x => x.value === duration)?.label ?? duration
    const g = GROUPS.find(x => x.value === group)?.label ?? group
    const v = VIBES.find(x => x.value === vibe)?.label ?? vibe
    const s = start || 'Stockholm'
    return `Jag vill göra en ${d.toLowerCase()} ${g === 'Solo' ? 'ensam' : `med ${g.toLowerCase()}`} från ${s}. Intresserad av: ${v.toLowerCase()}. Föreslå en konkret tur med platser att besöka och var vi kan äta. Om det finns bokningsbara restauranger, visa gärna länkarna.`
  }

  function handleStart() {
    const q = buildQuery()
    router.push(`/guide?fråga=${encodeURIComponent(q)}`)
  }

  function pick(setter: (v: string) => void, val: string, next: Step | 'done') {
    setter(val)
    if (next === 'done') return
    setStep(next)
  }

  const progress = ((stepIdx + 1) / steps.length) * 100

  return (
    <div style={{
      minHeight: '100dvh', background: 'var(--bg)',
      display: 'flex', flexDirection: 'column',
      paddingBottom: 'calc(var(--nav-h, 64px) + env(safe-area-inset-bottom, 0px) + 16px)',
    }}>
      {/* Header */}
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--grad-sea)',
        padding: '14px 16px 10px',
        paddingTop: 'calc(14px + env(safe-area-inset-top, 0px))',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
            <Link href="/planera-tur" style={{
              width: 34, height: 34, borderRadius: '50%',
              background: 'rgba(255,255,255,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>🧭 Planera din tur</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
                Steg {stepIdx + 1} av {steps.length}
              </div>
            </div>
          </div>
          {/* Progress bar */}
          <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 2,
              background: '#fff',
              width: `${progress}%`,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      </header>

      <div style={{ flex: 1, padding: '24px 16px', maxWidth: 520, margin: '0 auto', width: '100%' }}>

        {/* STEP: Duration */}
        {step === 'duration' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
              Hur lång tid har du?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Vi anpassar turen efter din tidsram.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {DURATIONS.map(d => (
                <button key={d.value} onClick={() => pick(setDuration, d.value, 'group')}
                  style={{
                    padding: '18px 14px', borderRadius: 16, cursor: 'pointer',
                    background: duration === d.value ? 'var(--grad-sea)' : 'var(--white)',
                    boxShadow: duration === d.value
                      ? '0 4px 16px rgba(10,123,140,0.35)'
                      : '0 2px 10px rgba(0,45,60,0.07)',
                    textAlign: 'left',
                    border: duration === d.value ? 'none' : '1px solid rgba(10,123,140,0.10)',
                  } as React.CSSProperties}>
                  <div style={{ fontSize: 24, marginBottom: 6 }}>{d.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: duration === d.value ? '#fff' : 'var(--txt)', marginBottom: 2 }}>{d.label}</div>
                  <div style={{ fontSize: 11, color: duration === d.value ? 'rgba(255,255,255,0.7)' : 'var(--txt3)' }}>{d.sub}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: Group */}
        {step === 'group' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
              Vilka åker?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Turen anpassas till ditt sällskap.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {GROUPS.map(g => (
                <button key={g.value} onClick={() => pick(setGroup, g.value, 'vibe')}
                  style={{
                    padding: '18px 14px', borderRadius: 16, cursor: 'pointer',
                    background: group === g.value ? 'var(--grad-sea)' : 'var(--white)',
                    boxShadow: group === g.value
                      ? '0 4px 16px rgba(10,123,140,0.35)'
                      : '0 2px 10px rgba(0,45,60,0.07)',
                    textAlign: 'left',
                    border: group === g.value ? 'none' : '1px solid rgba(10,123,140,0.10)',
                  } as React.CSSProperties}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{g.emoji}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: group === g.value ? '#fff' : 'var(--txt)' }}>{g.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: Vibe */}
        {step === 'vibe' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
              Vad är ni ute efter?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Välj det som lockar mest.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {VIBES.map(v => (
                <button key={v.value} onClick={() => pick(setVibe, v.value, 'start')}
                  style={{
                    padding: '16px 14px', borderRadius: 16, cursor: 'pointer',
                    background: vibe === v.value ? 'var(--grad-sea)' : 'var(--white)',
                    boxShadow: vibe === v.value
                      ? '0 4px 16px rgba(10,123,140,0.35)'
                      : '0 2px 10px rgba(0,45,60,0.07)',
                    textAlign: 'left',
                    border: vibe === v.value ? 'none' : '1px solid rgba(10,123,140,0.10)',
                  } as React.CSSProperties}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{v.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: vibe === v.value ? '#fff' : 'var(--txt)' }}>{v.label}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP: Start location */}
        {step === 'start' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 6px' }}>
              Var börjar turen?
            </h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Din starthamn eller utgångspunkt.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {STARTS.map(s => (
                <button key={s.value}
                  onClick={() => { setStart(s.value) }}
                  style={{
                    padding: '16px 14px', borderRadius: 16, cursor: 'pointer',
                    background: start === s.value ? 'var(--grad-sea)' : 'var(--white)',
                    boxShadow: start === s.value
                      ? '0 4px 16px rgba(10,123,140,0.35)'
                      : '0 2px 10px rgba(0,45,60,0.07)',
                    textAlign: 'left',
                    border: start === s.value ? 'none' : '1px solid rgba(10,123,140,0.10)',
                  } as React.CSSProperties}>
                  <div style={{ fontSize: 22, marginBottom: 6 }}>{s.emoji}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, color: start === s.value ? '#fff' : 'var(--txt)' }}>{s.label}</div>
                </button>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={handleStart}
              disabled={!start}
              style={{
                width: '100%', marginTop: 20, padding: '16px',
                borderRadius: 16, border: 'none', cursor: start ? 'pointer' : 'not-allowed',
                background: start ? 'var(--grad-sea)' : 'var(--txt3)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                boxShadow: start ? '0 4px 20px rgba(10,123,140,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {start ? '🧭 Visa min tur →' : 'Välj starthamn ovan'}
            </button>
          </div>
        )}

        {/* Back button for non-first steps */}
        {stepIdx > 0 && step !== 'start' && (
          <button
            onClick={() => setStep(steps[stepIdx - 1])}
            style={{
              marginTop: 16, background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, color: 'var(--txt3)', padding: '8px 0',
            }}
          >
            ← Tillbaka
          </button>
        )}
        {step === 'start' && (
          <button
            onClick={() => setStep('vibe')}
            style={{
              marginTop: 12, background: 'none', border: 'none', cursor: 'pointer',
              fontSize: 13, color: 'var(--txt3)', padding: '8px 0',
            }}
          >
            ← Tillbaka
          </button>
        )}
      </div>
    </div>
  )
}

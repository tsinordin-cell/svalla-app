'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { DEPARTURES, type Departure, type Interest } from '@/lib/planner'

const INTERESTS: { value: Interest; label: string; emoji: string }[] = [
  { value: 'krog',   label: 'Krog & mat',      emoji: '🍽' },
  { value: 'bastu',  label: 'Bastu',            emoji: '🛁' },
  { value: 'bad',    label: 'Bad & klippor',    emoji: '🏊' },
  { value: 'brygga', label: 'Brygga & hamn',    emoji: '⚓' },
  { value: 'natur',  label: 'Natur & vandring', emoji: '🌿' },
  { value: 'bensin', label: 'Bränslestopp',     emoji: '⛽' },
]

type Step = 'start' | 'end' | 'interests' | 'saving'

export default function PlaneraNyClient() {
  const router = useRouter()
  const [step, setStep] = useState<Step>('start')
  const [startDep, setStartDep] = useState<Departure | null>(null)
  const [endDep, setEndDep] = useState<Departure | null>(null)
  const [interests, setInterests] = useState<Interest[]>([])
  const [error, setError] = useState<string | null>(null)

  const steps: Step[] = ['start', 'end', 'interests']
  const stepIdx = steps.indexOf(step === 'saving' ? 'interests' : step)
  const progress = ((stepIdx + 1) / steps.length) * 100

  function toggleInterest(v: Interest) {
    setInterests(prev =>
      prev.includes(v) ? prev.filter(x => x !== v) : [...prev, v]
    )
  }

  async function handleCreate() {
    if (!startDep || !endDep || interests.length === 0) return
    setStep('saving')
    setError(null)

    const supabase = createClient()
    const { data: { session } } = await supabase.auth.getSession()

    const { data, error: dbError } = await supabase
      .from('planned_routes')
      .insert({
        user_id:    session?.user.id ?? null,
        start_name: startDep.name,
        end_name:   endDep.name,
        start_lat:  startDep.lat,
        start_lng:  startDep.lng,
        end_lat:    endDep.lat,
        end_lng:    endDep.lng,
        interests,
        status:     'published',
      })
      .select('id')
      .single()

    if (dbError || !data) {
      setError('Kunde inte spara rutten. Försök igen.')
      setStep('interests')
      return
    }

    router.push(`/planera/${data.id}`)
  }

  // Region-gruppering
  const regions = Array.from(new Set(DEPARTURES.map(d => d.region)))

  function DepartureGrid({ onSelect, selected }: {
    onSelect: (d: Departure) => void
    selected: Departure | null
  }) {
    return (
      <div>
        {regions.map(region => (
          <div key={region} style={{ marginBottom: 20 }}>
            <div style={{ fontSize: 10, fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--sea)', marginBottom: 8 }}>
              {region}
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {DEPARTURES.filter(d => d.region === region).map(d => (
                <button
                  key={d.id}
                  onClick={() => onSelect(d)}
                  style={{
                    padding: '12px 14px', borderRadius: 14,
                    border: selected?.id === d.id ? 'none' : '1px solid rgba(10,123,140,0.12)',
                    background: selected?.id === d.id ? 'var(--grad-sea)' : 'var(--white)',
                    boxShadow: selected?.id === d.id ? '0 4px 16px rgba(10,123,140,0.3)' : '0 1px 6px rgba(0,45,60,0.06)',
                    cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: 8,
                  } as React.CSSProperties}
                >
                  <span style={{ fontSize: 18 }}>{d.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: selected?.id === d.id ? '#fff' : 'var(--txt)' }}>
                    {d.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }

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
            <button
              onClick={() => {
                if (step === 'start') router.push('/planera')
                else if (step === 'end') setStep('start')
                else if (step === 'interests') setStep('end')
              }}
              style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 16, height: 16 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: '#fff' }}>🗺 Planera rutt</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)' }}>
                Steg {stepIdx + 1} av {steps.length}
              </div>
            </div>
          </div>
          <div style={{ height: 3, background: 'rgba(255,255,255,0.2)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: 2, background: '#fff', width: `${progress}%`, transition: 'width 0.3s ease' }} />
          </div>
        </div>
      </header>

      <div style={{ flex: 1, padding: '20px 16px', maxWidth: 520, margin: '0 auto', width: '100%' }}>

        {/* Steg 1: Startpunkt */}
        {step === 'start' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>Var börjar turen?</h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>Välj din avgångshamn eller startpunkt.</p>
            <DepartureGrid
              onSelect={(d) => { setStartDep(d); setStep('end') }}
              selected={startDep}
            />
          </div>
        )}

        {/* Steg 2: Slutpunkt */}
        {step === 'end' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>Vart ska du?</h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Från <strong>{startDep?.name}</strong> — välj destination.
            </p>
            <DepartureGrid
              onSelect={(d) => {
                if (d.id === startDep?.id) return
                setEndDep(d)
                setStep('interests')
              }}
              selected={endDep}
            />
          </div>
        )}

        {/* Steg 3: Intressen */}
        {step === 'interests' && (
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 700, color: 'var(--txt)', margin: '0 0 4px' }}>Vad vill du uppleva?</h1>
            <p style={{ fontSize: 14, color: 'var(--txt3)', margin: '0 0 20px' }}>
              Välj ett eller flera intressen — vi föreslår stopp längs vägen.
            </p>

            {/* Rutt-sammanfattning */}
            <div style={{ background: 'var(--white)', borderRadius: 14, padding: '12px 16px', marginBottom: 20, border: '1px solid rgba(10,123,140,0.1)', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)' }}>{startDep?.name}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} style={{ width: 18, height: 18, flexShrink: 0 }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-7-7l7 7-7 7" />
              </svg>
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)' }}>{endDep?.name}</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 24 }}>
              {INTERESTS.map(i => (
                <button
                  key={i.value}
                  onClick={() => toggleInterest(i.value)}
                  style={{
                    padding: '14px', borderRadius: 14, cursor: 'pointer', textAlign: 'left',
                    border: interests.includes(i.value) ? 'none' : '1px solid rgba(10,123,140,0.12)',
                    background: interests.includes(i.value) ? 'var(--grad-sea)' : 'var(--white)',
                    boxShadow: interests.includes(i.value) ? '0 4px 16px rgba(10,123,140,0.3)' : '0 1px 6px rgba(0,45,60,0.06)',
                    display: 'flex', alignItems: 'center', gap: 10,
                  } as React.CSSProperties}
                >
                  <span style={{ fontSize: 20 }}>{i.emoji}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: interests.includes(i.value) ? '#fff' : 'var(--txt)' }}>
                    {i.label}
                  </span>
                </button>
              ))}
            </div>

            {error && (
              <p style={{ fontSize: 13, color: 'var(--red, #c03)', marginBottom: 12 }}>{error}</p>
            )}

            <button
              onClick={handleCreate}
              disabled={interests.length === 0}
              style={{
                width: '100%', padding: '16px', borderRadius: 16, border: 'none',
                cursor: interests.length > 0 ? 'pointer' : 'not-allowed',
                background: interests.length > 0 ? 'var(--grad-sea)' : 'var(--txt3)',
                color: '#fff', fontSize: 16, fontWeight: 700,
                boxShadow: interests.length > 0 ? '0 4px 20px rgba(10,123,140,0.4)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {interests.length > 0 ? '🗺 Hitta stopp längs rutten →' : 'Välj minst ett intresse'}
            </button>
          </div>
        )}

        {/* Sparar */}
        {step === 'saving' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 200, gap: 16 }}>
            <div style={{ fontSize: 40 }}>🗺</div>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)' }}>Planerar din rutt…</p>
            <p style={{ fontSize: 13, color: 'var(--txt3)' }}>Hittar de bästa stoppen längs vägen</p>
          </div>
        )}
      </div>
    </div>
  )
}

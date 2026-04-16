'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'

export default function OnboardingModal() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('svalla-onboarding-v1')
    if (dismissed) return

    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return // ej inloggad — visa inte
      const { count } = await supabase
        .from('trips')
        .select('id', { count: 'exact', head: true })
        .eq('user_id', user.id)
      if ((count ?? 0) === 0) setShow(true)
    })
  }, [])

  function dismiss() {
    localStorage.setItem('svalla-onboarding-v1', '1')
    setShow(false)
  }

  if (!show) return null

  const steps = [
    { emoji: '⛵', title: 'Logga din tur', desc: 'Spara GPS-spår, bilder och anteckningar från dina båtturer.' },
    { emoji: '🗺️', title: 'Utforska rutter', desc: 'Hitta inspirerande rutter och restauranger längs kusten.' },
    { emoji: '🌊', title: 'Följ andra seglare', desc: 'Se vad andra paddlar, seglar och utforskar i skärgården.' },
  ]

  return (
    <>
      {/* Backdrop */}
      <div onClick={dismiss} style={{
        position: 'fixed', inset: 0,
        background: 'rgba(0,20,35,0.55)',
        zIndex: 1000, backdropFilter: 'blur(3px)',
      }} />

      {/* Modal */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1001,
        background: '#fff',
        borderRadius: '28px 28px 0 0',
        padding: '8px 20px 48px',
        maxWidth: 520, margin: '0 auto',
        boxShadow: '0 -8px 48px rgba(0,45,60,0.22)',
        animation: 'slideUp 0.35s ease',
      }}>
        {/* Handle */}
        <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.15)', borderRadius: 2, margin: '12px auto 24px' }} />

        {/* Hero */}
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <div style={{ fontSize: 56, marginBottom: 12 }}>⚓</div>
          <h2 style={{ fontSize: 22, fontWeight: 900, color: '#162d3a', margin: '0 0 8px' }}>
            Välkommen till Svalla
          </h2>
          <p style={{ fontSize: 14, color: '#5a8090', lineHeight: 1.5, margin: 0 }}>
            Din digitala loggbok för skärgårdslivet
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 28 }}>
          {steps.map((s, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 14,
              padding: '12px 14px', borderRadius: 16,
              background: 'rgba(10,123,140,0.04)',
              border: '1px solid rgba(10,123,140,0.08)',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: '#fff', border: '1.5px solid rgba(10,123,140,0.12)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 22,
              }}>{s.emoji}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 800, color: '#162d3a' }}>{s.title}</div>
                <div style={{ fontSize: 12, color: '#7a9dab', marginTop: 2, lineHeight: 1.4 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <Link href="/logga" onClick={dismiss} style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          width: '100%', padding: '15px 0', borderRadius: 18,
          background: 'linear-gradient(135deg,#c96e2a,#e07828)',
          color: '#fff', fontWeight: 800, fontSize: 15,
          textDecoration: 'none',
          boxShadow: '0 4px 20px rgba(201,110,42,0.4)',
        }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} style={{ width: 20, height: 20 }}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Logga din första tur
        </Link>

        <button onClick={dismiss} style={{
          display: 'block', width: '100%', marginTop: 12,
          background: 'none', border: 'none', cursor: 'pointer',
          fontSize: 13, color: '#7a9dab', fontWeight: 600, padding: '8px 0',
        }}>
          Utforska först →
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(100%); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
      `}</style>
    </>
  )
}

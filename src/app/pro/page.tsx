'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { isProEnabled } from '@/lib/pro'

const PRO_FEATURES = [
  { icon: '📍', label: 'Exportera GPX-filer för alla turer' },
  { icon: '📊', label: 'Utökad statistik och årssammanfattning' },
  { icon: '🗺️', label: 'Offline-kartor i appen' },
  { icon: '⚓', label: 'Pro-märke på din profil' },
  { icon: '🔔', label: 'Prioriterade push-notiser' },
  { icon: '🎨', label: 'Profilbakgrunder och teman' },
]

export default function ProPage() {
  const router = useRouter()
  const [isProUser, setIsProUser] = useState<boolean | null>(null)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<'month' | 'year'>('year')

  useEffect(() => {
    if (!isProEnabled()) return
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setIsProUser(false); return }
      const { data } = await supabase
        .from('subscriptions')
        .select('status, current_period_end')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .maybeSingle()
      setIsProUser(!!data && new Date(data.current_period_end) > new Date())
    })
  }, [])

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plan }),
      })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  async function handlePortal() {
    setLoading(true)
    try {
      const res = await fetch('/api/stripe/portal', { method: 'POST' })
      const { url, error } = await res.json()
      if (error) throw new Error(error)
      window.location.href = url
    } catch {
      setLoading(false)
    }
  }

  if (!isProEnabled()) {
    return (
      <main style={{ maxWidth: 480, margin: '0 auto', padding: '80px 20px', textAlign: 'center' }}>
        <p style={{ color: 'var(--txt3)', fontSize: 15 }}>Svalla Pro är inte aktiverat än.</p>
      </main>
    )
  }

  const planPill = (val: 'month' | 'year') => ({
    flex: 1,
    padding: '12px 0',
    border: plan === val ? '2px solid var(--sea)' : '2px solid rgba(10,123,140,0.18)',
    borderRadius: 14,
    background: plan === val ? 'rgba(30,92,130,0.07)' : 'transparent',
    color: plan === val ? 'var(--sea)' : 'var(--txt2)',
    fontFamily: 'inherit',
    fontSize: 14,
    fontWeight: plan === val ? 700 : 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  } as React.CSSProperties)

  return (
    <main style={{ maxWidth: 480, margin: '0 auto', padding: '60px 20px 100px' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>⚓</div>
        <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--txt)', margin: '0 0 8px' }}>
          Svalla Pro
        </h1>
        <p style={{ fontSize: 15, color: 'var(--txt2)', margin: 0, lineHeight: 1.5 }}>
          Allt du behöver för ett fullt loggat skärgårdsliv.
        </p>
      </div>

      <div style={{ background: 'var(--white)', borderRadius: 20, padding: '20px 18px', marginBottom: 16, boxShadow: '0 2px 16px rgba(0,45,60,0.08)' }}>
        {PRO_FEATURES.map(f => (
          <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(10,123,140,0.08)' }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>{f.icon}</span>
            <span style={{ fontSize: 14, color: 'var(--txt)', fontWeight: 500 }}>{f.label}</span>
          </div>
        ))}
      </div>

      {isProUser === false && (
        <>
          <div style={{ display: 'flex', gap: 10, marginBottom: 16 }}>
            <button style={planPill('month')} onClick={() => setPlan('month')}>
              Månad<br />
              <span style={{ fontSize: 12, fontWeight: 400 }}>49 kr/mån</span>
            </button>
            <button style={planPill('year')} onClick={() => setPlan('year')}>
              År — spara 30%<br />
              <span style={{ fontSize: 12, fontWeight: 400 }}>399 kr/år</span>
            </button>
          </div>

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="press-feedback"
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: 16,
              border: 'none',
              background: 'var(--grad-sea)',
              color: '#fff',
              fontSize: 16,
              fontWeight: 700,
              fontFamily: 'inherit',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
              transition: 'opacity 0.15s',
            }}
          >
            {loading ? 'Laddar…' : 'Bli Pro'}
          </button>
        </>
      )}

      {isProUser === true && (
        <div style={{ textAlign: 'center' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 18px',
            background: 'rgba(30,92,130,0.08)', borderRadius: 12, marginBottom: 16,
            color: 'var(--sea)', fontSize: 14, fontWeight: 600,
          }}>
            ⚓ Du är Pro
          </div>
          <br />
          <button
            onClick={handlePortal}
            disabled={loading}
            className="press-feedback"
            style={{
              padding: '12px 28px',
              borderRadius: 14,
              border: '1.5px solid rgba(10,123,140,0.25)',
              background: 'transparent',
              color: 'var(--txt2)',
              fontSize: 14,
              fontWeight: 600,
              fontFamily: 'inherit',
              cursor: loading ? 'not-allowed' : 'pointer',
            }}
          >
            {loading ? 'Laddar…' : 'Hantera prenumeration'}
          </button>
        </div>
      )}

      {isProUser === null && (
        <div style={{ height: 52 }} />
      )}

      <p style={{ textAlign: 'center', fontSize: 12, color: 'var(--txt3)', marginTop: 20 }}>
        Säkert betalning via Stripe. Avsluta när som helst.
      </p>

      <button
        onClick={() => router.back()}
        style={{
          display: 'block', margin: '24px auto 0', background: 'none', border: 'none',
          color: 'var(--txt3)', fontSize: 13, cursor: 'pointer', fontFamily: 'inherit',
        }}
      >
        ← Tillbaka
      </button>
    </main>
  )
}

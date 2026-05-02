'use client'

import { useEffect, useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { isProEnabled } from '@/lib/pro'
import { track } from '@/lib/analytics-events'

function ProIcon({ name }: { name: string }) {
  const s = { width: 20, height: 20, flexShrink: 0 as const }
  const p = { fill: 'none' as const, stroke: 'var(--sea)', strokeWidth: 1.75, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const }
  if (name === 'gpx') return <svg viewBox="0 0 24 24" {...s}><polyline {...p} points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
  if (name === 'stats') return <svg viewBox="0 0 24 24" {...s}><line {...p} x1="18" y1="20" x2="18" y2="10"/><line {...p} x1="12" y1="20" x2="12" y2="4"/><line {...p} x1="6" y1="20" x2="6" y2="14"/></svg>
  if (name === 'map') return <svg viewBox="0 0 24 24" {...s}><polygon {...p} points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line {...p} x1="9" y1="3" x2="9" y2="18"/><line {...p} x1="15" y1="6" x2="15" y2="21"/></svg>
  if (name === 'badge') return <svg viewBox="0 0 24 24" {...s}><circle {...p} cx="12" cy="8" r="6"/><path {...p} d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
  if (name === 'bell') return <svg viewBox="0 0 24 24" {...s}><path {...p} d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path {...p} d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
  if (name === 'theme') return <svg viewBox="0 0 24 24" {...s}><circle {...p} cx="12" cy="12" r="3"/><path {...p} d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
  return null
}

const PRO_FEATURES = [
  { icon: 'gpx',   label: 'Exportera GPX-filer för alla turer' },
  { icon: 'stats', label: 'Utökad statistik och årssammanfattning' },
  { icon: 'map',   label: 'Offline-kartor i appen' },
  { icon: 'badge', label: 'Pro-märke på din profil' },
  { icon: 'bell',  label: 'Prioriterade push-notiser' },
  { icon: 'theme', label: 'Profilbakgrunder och teman' },
]

function ProPageInner() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')

  const [isProUser, setIsProUser] = useState<boolean | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState<'month' | 'year'>('year')
  const [checkoutCompletedFired, setCheckoutCompletedFired] = useState(false)

  useEffect(() => {
    if (!isProEnabled()) return
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setIsProUser(false); return }
      setUserEmail(user.email ?? null)
      const { data } = await supabase
        .from('subscriptions')
        .select('status, current_period_end, plan')
        .eq('user_id', user.id)
        .in('status', ['active', 'trialing'])
        .maybeSingle()
      const proActive = !!data && new Date((data as { current_period_end: string }).current_period_end) > new Date()
      setIsProUser(proActive)

      // Fire pricing_viewed — detect source from referrer
      const source = document.referrer.includes('/feed') ? 'feed'
        : document.referrer.includes('/profil') ? 'profil'
        : document.referrer.includes('/tur/') ? 'tur'
        : document.referrer ? 'other'
        : 'direct'
      track('pricing_viewed', { source, is_pro: proActive })

      // Fire checkout_completed if session_id present and not yet fired
      if (sessionId && !checkoutCompletedFired) {
        const subPlan = (data as { plan?: string } | null)?.plan === 'year' ? 'year' : 'month'
        track('checkout_completed', { plan: subPlan })
        setCheckoutCompletedFired(true)
      }
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  async function handleCheckout() {
    setLoading(true)
    track('checkout_started', { plan })
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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(30,92,130,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width={30} height={30} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
            </svg>
          </div>
        </div>
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
            <ProIcon name={f.icon} />
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
            <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="5" r="3"/><line x1="12" y1="22" x2="12" y2="8"/><path d="M5 12H2a10 10 0 0 0 20 0h-3"/>
            </svg>
            Du är Pro
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

export default function ProPage() {
  return (
    <Suspense fallback={null}>
      <ProPageInner />
    </Suspense>
  )
}

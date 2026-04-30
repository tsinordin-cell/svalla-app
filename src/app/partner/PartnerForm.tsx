'use client'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

const TIER_PRICES: Record<string, number> = {
  bas: 290,
  standard: 590,
  premium: 990,
}

export default function PartnerForm() {
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [tier, setTier] = useState<string>('')

  useEffect(() => {
    const tierParam = searchParams.get('tier')
    if (tierParam && ['bas', 'standard', 'premium'].includes(tierParam)) {
      setTier(tierParam)
    }
  }, [searchParams])

  /** Camel-casa kolumn-namnen: API route förväntar sig camelCase i partner-checkout */
  function payloadCamel(formData: FormData) {
    return {
      tier: (formData.get('tier') as string) || '',
      businessName: (formData.get('business_name') as string) || '',
      contactName: (formData.get('contact_name') as string) || '',
      email: (formData.get('email') as string) || '',
      phone: (formData.get('phone') as string) || '',
      category: (formData.get('category') as string) || '',
      islandSlug: (formData.get('island_slug') as string) || '',
      message: (formData.get('message') as string) || '',
    }
  }

  /** Användaren vill diskutera/förhandla — befintligt flöde */
  async function submitInquiry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (status === 'loading') return

    const formData = new FormData(e.currentTarget)
    const payload = Object.fromEntries(formData.entries())

    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/partner-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        setError(j.error || 'Något gick fel — försök igen')
        setStatus('error')
        return
      }
      setStatus('success')
    } catch {
      setError('Nätverksfel — försök igen')
      setStatus('error')
    }
  }

  /** Användaren har valt tier och vill betala direkt → Stripe checkout */
  async function checkoutNow() {
    if (status === 'loading') return
    const form = document.querySelector<HTMLFormElement>('form#partner-form')
    if (!form) return
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const formData = new FormData(form)
    const payload = payloadCamel(formData)
    if (!payload.tier) {
      setError('Välj en nivå för att gå till betalning')
      return
    }

    setStatus('loading')
    setError(null)
    try {
      const res = await fetch('/api/stripe/partner-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const j = await res.json().catch(() => ({}))
      if (!res.ok || !j.url) {
        setError(j.error || 'Kunde inte starta betalning — försök igen eller skicka förfrågan istället')
        setStatus('error')
        return
      }
      window.location.href = j.url
    } catch {
      setError('Nätverksfel — försök igen')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div style={{
        padding: 28, borderRadius: 16,
        background: 'rgba(46,160,90,0.10)',
        border: '1px solid rgba(46,160,90,0.25)',
        textAlign: 'center',
      }}>
        <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, color: 'var(--green, #2a6e50)' }}>
          Tack — vi hör av oss
        </h3>
        <p style={{ fontSize: 14, color: 'var(--txt2)', maxWidth: 400, margin: '0 auto', lineHeight: 1.55 }}>
          Vi tar gärna en kort pratstund för att skräddarsy lösningen för just din verksamhet.
          Räkna med svar inom 1–2 arbetsdagar.
        </p>
      </div>
    )
  }

  const fieldStyle: React.CSSProperties = {
    width: '100%', padding: '11px 14px',
    borderRadius: 8, border: '1px solid var(--surface-3)',
    fontSize: 14, fontFamily: 'inherit',
    background: 'var(--white)', color: 'var(--txt)',
    outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 600, color: 'var(--txt2)',
    marginBottom: 4, display: 'block', textTransform: 'uppercase', letterSpacing: 0.6,
  }

  return (
    <>
      {tier && (
        <div style={{
          background: 'rgba(45, 125, 138, 0.08)', padding: '16px 20px', borderRadius: 12,
          border: '1px solid var(--sea)', marginBottom: 20, display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
        }}>
          <div>
            <div style={{ fontSize: 12, color: 'var(--txt2)', fontWeight: 600, marginBottom: 2 }}>VALD PLAN</div>
            <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--sea)' }}>
              {tier.charAt(0).toUpperCase() + tier.slice(1)} — {TIER_PRICES[tier]} kr/månad
            </div>
          </div>
          <a href="#tiers" style={{ fontSize: 13, color: 'var(--sea)', textDecoration: 'none', fontWeight: 600, cursor: 'pointer' }}>
            Byt plan
          </a>
        </div>
      )}
      <form
        id="partner-form"
        onSubmit={submitInquiry}
        style={{
          background: 'var(--white)', padding: '28px 26px', borderRadius: 16,
          border: '1px solid var(--surface-3)',
          display: 'grid', gap: 14,
        }}
      >
      <div>
        <label style={labelStyle}>Verksamhetens namn *</label>
        <input name="business_name" required type="text" style={fieldStyle} placeholder="Sandhamns Värdshus" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Kontaktperson</label>
          <input name="contact_name" type="text" style={fieldStyle} placeholder="Namn" />
        </div>
        <div>
          <label style={labelStyle}>Telefon</label>
          <input name="phone" type="tel" style={fieldStyle} placeholder="070-..." />
        </div>
      </div>

      <div>
        <label style={labelStyle}>E-post *</label>
        <input name="email" required type="email" style={fieldStyle} placeholder="kontakt@example.se" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <label style={labelStyle}>Kategori</label>
          <select name="category" style={fieldStyle} defaultValue="">
            <option value="">Välj…</option>
            <option value="restaurang">Restaurang / café</option>
            <option value="hamn">Gästhamn / brygga</option>
            <option value="upplevelse">Upplevelse / aktivitet</option>
            <option value="boende">Boende / hotell</option>
            <option value="annat">Annat</option>
          </select>
        </div>
        <div>
          <label style={labelStyle}>Ö / område</label>
          <input name="island_slug" type="text" style={fieldStyle} placeholder="t.ex. Sandhamn" />
        </div>
      </div>

      <div>
        <label style={labelStyle}>Intresserad av nivå</label>
        <select
          name="tier"
          style={fieldStyle}
          value={tier}
          onChange={e => setTier(e.target.value)}
        >
          <option value="">Vill diskutera</option>
          <option value="bas">Bas — 290 kr/mån</option>
          <option value="standard">Standard — 590 kr/mån</option>
          <option value="premium">Premium — 990 kr/mån</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Vad vill du berätta?</label>
        <textarea
          name="message" rows={4} style={{ ...fieldStyle, resize: 'vertical' }}
          placeholder="Något specifikt vi ska veta? Säsong, mål, frågor…"
        />
      </div>

      {/* Två-knapps-CTA: betala direkt om tier vald, annars skicka förfrågan */}
      <div style={{ display: 'grid', gap: 8, marginTop: 6 }}>
        {tier && (
          <button
            type="button"
            onClick={checkoutNow}
            disabled={status === 'loading'}
            style={{
              padding: '14px 24px', borderRadius: 999,
              background: status === 'loading' ? 'var(--sea-d, #7da7be)' : 'var(--acc, #c96e2a)',
              color: '#fff', fontSize: 14, fontWeight: 700,
              border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer',
            }}
          >
            {status === 'loading' ? 'Förbereder betalning…' : `Betala ${TIER_PRICES[tier] || '0'} kr/mån — kom igång nu →`}
          </button>
        )}
        <button
          type="submit"
          disabled={status === 'loading'}
          style={{
            padding: '14px 24px', borderRadius: 999,
            background: tier
              ? 'transparent'
              : (status === 'loading' ? 'var(--sea-d, #7da7be)' : 'var(--sea, #1e5c82)'),
            color: tier ? 'var(--sea)' : '#fff',
            border: tier ? '1.5px solid var(--sea)' : 'none',
            fontSize: 14, fontWeight: 700,
            cursor: status === 'loading' ? 'wait' : 'pointer',
          }}
        >
          {status === 'loading' && !tier ? 'Skickar…' : tier ? 'Eller skicka frågor först →' : 'Skicka förfrågan'}
        </button>
      </div>

      <p style={{ fontSize: 11, color: 'var(--txt3)', margin: 0, textAlign: 'center', lineHeight: 1.5 }}>
        Säker betalning via Stripe. Avbryt när du vill, ingen bindningstid.
      </p>

      {error && (
        <div role="alert" style={{ fontSize: 13, color: 'var(--red, #d44d4d)', marginTop: -6 }}>
          {error}
        </div>
      )}
      </form>
    </>
  )
}

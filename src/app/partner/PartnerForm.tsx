'use client'
import { useState } from 'react'

export default function PartnerForm() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)

  async function submit(e: React.FormEvent<HTMLFormElement>) {
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
    <form
      onSubmit={submit}
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
        <select name="tier" style={fieldStyle} defaultValue="">
          <option value="">Vill diskutera</option>
          <option value="bas">Bas — 500 kr/mån</option>
          <option value="standard">Standard — 1 000 kr/mån</option>
          <option value="premium">Premium — 2 500 kr/mån</option>
        </select>
      </div>

      <div>
        <label style={labelStyle}>Vad vill du berätta?</label>
        <textarea
          name="message" rows={4} style={{ ...fieldStyle, resize: 'vertical' }}
          placeholder="Något specifikt vi ska veta? Säsong, mål, frågor…"
        />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          padding: '14px 24px', borderRadius: 999,
          background: status === 'loading' ? 'var(--sea-d, #7da7be)' : 'var(--sea, #1e5c82)',
          color: '#fff', fontSize: 14, fontWeight: 700,
          border: 'none', cursor: status === 'loading' ? 'wait' : 'pointer',
          marginTop: 6,
        }}
      >
        {status === 'loading' ? 'Skickar…' : 'Skicka förfrågan'}
      </button>

      {error && (
        <div role="alert" style={{ fontSize: 13, color: 'var(--red, #d44d4d)', marginTop: -6 }}>
          {error}
        </div>
      )}
    </form>
  )
}

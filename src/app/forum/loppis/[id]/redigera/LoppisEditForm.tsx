'use client'
/**
 * LoppisEditForm — client form för att uppdatera titel/pris/specs/beskrivning
 * /plats/skick/kategori/extern länk på en publicerad Loppis-annons.
 * PATCH:ar /api/forum/threads/[id]/listing och routar tillbaka till annonsen.
 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const CONDITIONS = ['Nyskick', 'Mycket bra', 'Bra', 'Acceptabelt', 'Renoveringsobjekt'] as const
const CATEGORIES = ['Båt', 'Motor', 'Tillbehör', 'Säkerhet', 'Övrigt'] as const

interface Spec { label: string; value: string }

interface Props {
  threadId: string
  initial: {
    title: string
    body: string
    price: string
    condition: string
    category: string
    location: string
    externalLink: string
    specs: Spec[]
  }
}

export default function LoppisEditForm({ threadId, initial }: Props) {
  const router = useRouter()
  const [title, setTitle]         = useState(initial.title)
  const [price, setPrice]         = useState(initial.price)
  const [condition, setCondition] = useState<typeof CONDITIONS[number]>(
    (CONDITIONS as readonly string[]).includes(initial.condition) ? initial.condition as typeof CONDITIONS[number] : 'Bra'
  )
  const [category, setCategory]   = useState<typeof CATEGORIES[number]>(
    (CATEGORIES as readonly string[]).includes(initial.category) ? initial.category as typeof CATEGORIES[number] : 'Båt'
  )
  const [location, setLocation]   = useState(initial.location)
  const [body, setBody]           = useState(initial.body)
  const [externalLink, setExternalLink] = useState(initial.externalLink)
  const [specs, setSpecs]         = useState<Spec[]>(initial.specs)
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr]             = useState('')

  function updateSpec(i: number, field: keyof Spec, val: string) {
    setSpecs(prev => prev.map((s, idx) => idx === i ? { ...s, [field]: val } : s))
  }
  function addSpec() {
    if (specs.length >= 12) return
    setSpecs(prev => [...prev, { label: '', value: '' }])
  }
  function removeSpec(i: number) {
    setSpecs(prev => prev.filter((_, idx) => idx !== i))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErr('')
    if (title.trim().length < 5)   { setErr('Rubrik minst 5 tecken.'); return }
    if (title.trim().length > 200) { setErr('Rubrik max 200 tecken.'); return }
    const priceNum = price.trim() === '' ? null : Number(price.replace(/\s/g, ''))
    if (priceNum !== null && (!Number.isFinite(priceNum) || priceNum < 0)) {
      setErr('Ogiltigt pris.'); return
    }
    if (externalLink.trim() && !/^https?:\/\//i.test(externalLink.trim())) {
      setErr('Extern länk måste börja med http:// eller https://'); return
    }

    setSubmitting(true)
    try {
      const cleanedSpecs = specs
        .map(s => ({ label: s.label.trim(), value: s.value.trim() }))
        .filter(s => s.label && s.value)

      const res = await fetch(`/api/forum/threads/${threadId}/listing`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.trim(),
          body:  body.trim(),
          listingData: {
            price:         priceNum,
            condition,
            category,
            specs:         cleanedSpecs,
            location:      location.trim() || null,
            external_link: externalLink.trim() || null,
          },
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data.error ?? 'Kunde inte spara ändringarna.')
        setSubmitting(false)
        return
      }
      router.push(`/forum/loppis/${threadId}`)
      router.refresh()
    } catch {
      setErr('Nätverksfel.')
      setSubmitting(false)
    }
  }

  // ── Stilar ──
  const fieldBase: React.CSSProperties = {
    width: '100%', boxSizing: 'border-box',
    padding: '13px 15px',
    borderRadius: 12,
    border: '1.5px solid rgba(10,123,140,0.18)',
    background: 'var(--card-bg, #fff)',
    fontSize: 15, color: 'var(--txt)',
    fontFamily: 'inherit', outline: 'none',
  }
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: 'var(--txt2, #555)',
    textTransform: 'uppercase', letterSpacing: '0.5px',
    marginBottom: 6, display: 'block',
  }
  const sectionCard: React.CSSProperties = {
    background: 'var(--card-bg, #fff)',
    border: '1px solid var(--border, rgba(10,123,140,0.10))',
    borderRadius: 16,
    padding: 18,
    marginBottom: 16,
    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
  }

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg)',
      paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 32px)',
    }}>
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 22px',
        color: '#fff',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link href={`/forum/loppis/${threadId}`} aria-label="Tillbaka" style={{
          color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(255,255,255,0.15)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 19l-7-7 7-7" />
          </svg>
        </Link>
        <div>
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.6px', textTransform: 'uppercase', fontWeight: 700 }}>Loppis</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>Redigera annons</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '16px', maxWidth: 720, margin: '0 auto' }}>
        <p style={{
          fontSize: 13, color: 'var(--txt3)', margin: '0 0 14px',
          padding: '10px 14px',
          background: 'rgba(10,123,140,0.06)',
          borderRadius: 10,
          lineHeight: 1.5,
        }}>
          Bilder, status och boost ändras direkt på annons-vyn — det här formuläret rör titel, pris, specs och beskrivning.
        </p>

        <div style={sectionCard}>
          <label style={labelStyle}>Rubrik</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={200}
            required
            style={{ ...fieldBase, marginBottom: 14 }}
          />

          <label style={labelStyle}>Pris (kr)</label>
          <input
            type="text"
            inputMode="numeric"
            value={price}
            onChange={(e) => setPrice(e.target.value.replace(/[^0-9 ]/g, ''))}
            placeholder="t.ex. 150000 — lämna tomt för 'pris på förfrågan'"
            style={fieldBase}
          />
        </div>

        <div style={sectionCard}>
          <label style={labelStyle}>Kategori</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                style={{
                  padding: '8px 14px', borderRadius: 20, border: 'none',
                  background: category === c ? 'var(--sea)' : 'rgba(10,123,140,0.08)',
                  color: category === c ? '#fff' : 'var(--txt)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >{c}</button>
            ))}
          </div>

          <label style={labelStyle}>Skick</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {CONDITIONS.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCondition(c)}
                style={{
                  padding: '8px 14px', borderRadius: 20, border: 'none',
                  background: condition === c ? 'var(--sea)' : 'rgba(10,123,140,0.08)',
                  color: condition === c ? '#fff' : 'var(--txt)',
                  fontSize: 13, fontWeight: 600, cursor: 'pointer',
                }}
              >{c}</button>
            ))}
          </div>

          <label style={labelStyle}>Plats</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="t.ex. Halmstad"
            maxLength={80}
            style={fieldBase}
          />
        </div>

        <div style={sectionCard}>
          <label style={labelStyle}>Specifikationer · {specs.length}/12</label>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {specs.map((s, i) => (
              <div key={i} style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
                <input
                  type="text"
                  value={s.label}
                  onChange={(e) => updateSpec(i, 'label', e.target.value)}
                  placeholder="Etikett"
                  maxLength={40}
                  style={{ ...fieldBase, flex: '0 0 38%', padding: '10px 12px', fontSize: 14 }}
                />
                <input
                  type="text"
                  value={s.value}
                  onChange={(e) => updateSpec(i, 'value', e.target.value)}
                  placeholder="Värde"
                  maxLength={200}
                  style={{ ...fieldBase, flex: 1, padding: '10px 12px', fontSize: 14 }}
                />
                <button type="button" onClick={() => removeSpec(i)} aria-label="Ta bort" style={{
                  width: 36, height: 36, borderRadius: 10, flexShrink: 0,
                  background: 'rgba(220,38,38,0.06)', color: '#dc2626',
                  border: '1px solid rgba(220,38,38,0.18)', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          {specs.length < 12 && (
            <button type="button" onClick={addSpec} style={{
              marginTop: 10, padding: '10px 14px',
              borderRadius: 10, border: 'none',
              background: 'rgba(10,123,140,0.08)', color: 'var(--sea)',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 6,
            }}>
              <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
              Lägg till rad
            </button>
          )}
        </div>

        <div style={sectionCard}>
          <label style={labelStyle}>Beskrivning</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            maxLength={10000}
            style={{ ...fieldBase, fontFamily: 'inherit', resize: 'vertical', minHeight: 120 }}
          />
          <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 6 }}>
            Stöd för **fet text** och listor med −. {body.length}/10 000
          </div>
        </div>

        <div style={sectionCard}>
          <label style={labelStyle}>Länk till komplett annons (valfritt)</label>
          <input
            type="url"
            value={externalLink}
            onChange={(e) => setExternalLink(e.target.value)}
            placeholder="https://www.blocket.se/..."
            maxLength={500}
            style={fieldBase}
          />
        </div>

        {err && (
          <div style={{
            padding: '12px 14px',
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 12, color: '#dc2626',
            fontSize: 14, fontWeight: 600,
            marginBottom: 16,
          }}>{err}</div>
        )}

        <div style={{ display: 'flex', gap: 8 }}>
          <Link href={`/forum/loppis/${threadId}`} style={{
            flex: '0 0 auto', padding: '16px 22px',
            borderRadius: 14,
            background: 'transparent',
            border: '1.5px solid rgba(10,123,140,0.25)',
            color: 'var(--sea)',
            fontSize: 15, fontWeight: 700,
            textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>Avbryt</Link>
          <button type="submit" disabled={submitting} style={{
            flex: 1, padding: '16px',
            borderRadius: 14, border: 'none',
            background: submitting ? 'rgba(10,123,140,0.5)' : 'var(--acc, #c96e2a)',
            color: '#fff', fontSize: 16, fontWeight: 700,
            cursor: submitting ? 'wait' : 'pointer',
            boxShadow: '0 4px 14px rgba(201,110,42,0.3)',
          }}>
            {submitting ? 'Sparar…' : 'Spara ändringar'}
          </button>
        </div>
      </form>
    </main>
  )
}

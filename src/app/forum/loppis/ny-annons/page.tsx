'use client'
/**
 * /forum/loppis/ny-annons — strukturerat annonsformulär för Loppis-kategorin.
 *
 * Bygger en `listing_data` JSONB istället för ren markdown-body. Resultatet
 * rendras av LoppisListingCard på trådsidan.
 */
import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase'
import { analytics } from '@/lib/analytics'

const CONDITIONS = ['Nyskick', 'Mycket bra', 'Bra', 'Acceptabelt', 'Renoveringsobjekt'] as const
const CATEGORIES = ['Båt', 'Motor', 'Tillbehör', 'Säkerhet', 'Övrigt'] as const

interface Spec { label: string; value: string }

export default function NyAnnonsPage() {
  const router = useRouter()

  // Auth gate
  const [authReady, setAuthReady] = useState(false)
  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) { router.push('/logga-in?returnTo=/forum/loppis/ny-annons'); return }
      setAuthReady(true)
    })
  }, [router])

  // Formulärtillstånd
  const [title, setTitle]         = useState('')
  const [price, setPrice]         = useState('')
  const [condition, setCondition] = useState<typeof CONDITIONS[number]>('Bra')
  const [category, setCategory]   = useState<typeof CATEGORIES[number]>('Båt')
  const [location, setLocation]   = useState('')
  const [body, setBody]           = useState('')
  const [externalLink, setExternalLink] = useState('')
  const [images, setImages]       = useState<string[]>([])
  const [specs, setSpecs]         = useState<Spec[]>([
    { label: 'Modell', value: '' },
    { label: 'Årsmodell', value: '' },
  ])
  const [uploading, setUploading] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [err, setErr]             = useState('')
  const fileInputRef = useRef<HTMLInputElement>(null)

  if (!authReady) {
    return <div style={{ minHeight: '60vh' }} />
  }

  async function handleImageUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    setErr('')
    if (images.length + files.length > 8) {
      setErr('Max 8 bilder per annons.')
      return
    }
    setUploading(true)
    try {
      const uploadedUrls: string[] = []
      for (const file of Array.from(files)) {
        if (file.size > 8 * 1024 * 1024) {
          setErr(`${file.name} är för stor (max 8 MB).`)
          continue
        }
        const fd = new FormData()
        fd.append('file', file)
        const res = await fetch('/api/forum/upload-image', { method: 'POST', body: fd })
        const data = await res.json()
        if (!res.ok) {
          setErr(data.error ?? 'Uppladdning misslyckades.')
          continue
        }
        uploadedUrls.push(data.url)
      }
      setImages(prev => [...prev, ...uploadedUrls])
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  function moveImage(idx: number, dir: -1 | 1) {
    setImages(prev => {
      const copy = [...prev]
      const ni = idx + dir
      if (ni < 0 || ni >= copy.length) return prev
      const tmp = copy[idx]!
      copy[idx] = copy[ni]!
      copy[ni] = tmp
      return copy
    })
  }

  function removeImage(idx: number) {
    setImages(prev => prev.filter((_, i) => i !== idx))
  }

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

    // Validering
    if (title.trim().length < 5)    { setErr('Rubrik måste vara minst 5 tecken.'); return }
    if (title.trim().length > 200)  { setErr('Rubrik är för lång (max 200 tecken).'); return }
    const priceNum = price.trim() === '' ? null : Number(price.replace(/\s/g, ''))
    if (priceNum !== null && (!Number.isFinite(priceNum) || priceNum < 0)) {
      setErr('Ogiltigt pris.'); return
    }
    if (images.length < 1) { setErr('Lägg till minst en bild.'); return }
    if (externalLink.trim() && !/^https?:\/\//i.test(externalLink.trim())) {
      setErr('Extern länk måste börja med http:// eller https://'); return
    }

    setSubmitting(true)
    try {
      const cleanedSpecs = specs
        .map(s => ({ label: s.label.trim(), value: s.value.trim() }))
        .filter(s => s.label && s.value)

      const listingData = {
        price:         priceNum,
        currency:      'SEK',
        condition,
        category,
        images,
        specs:         cleanedSpecs,
        location:      location.trim() || null,
        external_link: externalLink.trim() || null,
        status:        'aktiv',
      }

      const res = await fetch('/api/forum/threads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId: 'loppis',
          title: title.trim(),
          body: body.trim() || ' ', // tillåts vara tom; min 1 tecken för loppis
          listingData,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setErr(data.error ?? 'Kunde inte spara annonsen.'); setSubmitting(false); return }
      analytics.forumPostCreated({ category: 'loppis' })
      router.push(`/forum/loppis/${data.id}`)
    } catch {
      setErr('Nätverksfel. Försök igen.')
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
    transition: 'border-color 0.15s, box-shadow 0.15s',
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
      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, var(--sea) 0%, #0d8fa3 100%)',
        padding: 'calc(env(safe-area-inset-top, 0px) + 14px) 16px 22px',
        color: '#fff',
        display: 'flex', alignItems: 'center', gap: 10,
      }}>
        <Link href="/forum/loppis" aria-label="Tillbaka" style={{
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
          <div style={{ fontSize: 11, opacity: 0.75, letterSpacing: '0.6px', textTransform: 'uppercase', fontWeight: 700 }}>Loppis & köp/sälj</div>
          <h1 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: '-0.2px' }}>Lägg upp annons</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ padding: '16px', maxWidth: 720, margin: '0 auto' }}>

        {/* Bilder — VIKTIGAST, först */}
        <div style={sectionCard}>
          <label style={labelStyle}>Bilder · {images.length}/8</label>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 12px', lineHeight: 1.5 }}>
            Första bilden visas som hero. Lägg till minst en bra dagsljusbild.
          </p>
          {images.length > 0 && (
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(110px, 1fr))',
              gap: 10, marginBottom: 12,
            }}>
              {images.map((url, i) => (
                <div key={url} style={{
                  position: 'relative', aspectRatio: '4 / 3',
                  borderRadius: 10, overflow: 'hidden',
                  background: '#0a1e2c',
                  border: i === 0 ? '2px solid var(--acc, #c96e2a)' : '1px solid rgba(10,123,140,0.15)',
                }}>
                  <Image src={url} alt={`Bild ${i + 1}`} fill sizes="120px" style={{ objectFit: 'cover' }} />
                  {i === 0 && (
                    <span style={{
                      position: 'absolute', top: 4, left: 4,
                      background: 'var(--acc, #c96e2a)', color: '#fff',
                      fontSize: 9, fontWeight: 800, letterSpacing: '0.5px',
                      padding: '2px 6px', borderRadius: 4, textTransform: 'uppercase',
                    }}>Hero</span>
                  )}
                  <button type="button" onClick={() => removeImage(i)} aria-label="Ta bort bild" style={{
                    position: 'absolute', top: 4, right: 4,
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.6)', color: '#fff',
                    border: 'none', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                  <div style={{
                    position: 'absolute', bottom: 4, left: 4, right: 4,
                    display: 'flex', justifyContent: 'space-between',
                  }}>
                    <button type="button" onClick={() => moveImage(i, -1)} disabled={i === 0} aria-label="Flytta vänster" style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.55)', color: '#fff',
                      border: 'none', cursor: i === 0 ? 'default' : 'pointer',
                      opacity: i === 0 ? 0.3 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button type="button" onClick={() => moveImage(i, 1)} disabled={i === images.length - 1} aria-label="Flytta höger" style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: 'rgba(0,0,0,0.55)', color: '#fff',
                      border: 'none', cursor: i === images.length - 1 ? 'default' : 'pointer',
                      opacity: i === images.length - 1 ? 0.3 : 1,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {images.length < 8 && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
              style={{
                width: '100%', padding: '14px',
                borderRadius: 12,
                border: '1.5px dashed rgba(10,123,140,0.3)',
                background: 'rgba(10,123,140,0.04)',
                color: 'var(--sea)',
                fontSize: 14, fontWeight: 600,
                cursor: uploading ? 'wait' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              }}
            >
              <svg width={18} height={18} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              {uploading ? 'Laddar upp…' : images.length === 0 ? 'Lägg till bilder' : 'Lägg till fler bilder'}
            </button>
          )}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            onChange={(e) => handleImageUpload(e.target.files)}
            style={{ display: 'none' }}
          />
        </div>

        {/* Titel + pris */}
        <div style={sectionCard}>
          <label style={labelStyle}>Rubrik</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="t.ex. Comfort 32 från 1979 — välhållen klassiker"
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

        {/* Kategori + skick + plats */}
        <div style={sectionCard}>
          <label style={labelStyle}>Kategori</label>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
            {CATEGORIES.map(c => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                style={{
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: 'none',
                  background: category === c ? 'var(--sea)' : 'rgba(10,123,140,0.08)',
                  color: category === c ? '#fff' : 'var(--txt)',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
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
                  padding: '8px 14px',
                  borderRadius: 20,
                  border: 'none',
                  background: condition === c ? 'var(--sea)' : 'rgba(10,123,140,0.08)',
                  color: condition === c ? '#fff' : 'var(--txt)',
                  fontSize: 13, fontWeight: 600,
                  cursor: 'pointer',
                }}
              >{c}</button>
            ))}
          </div>

          <label style={labelStyle}>Plats</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="t.ex. Halmstad, Stockholm, Bohuslän"
            maxLength={80}
            style={fieldBase}
          />
        </div>

        {/* Specs */}
        <div style={sectionCard}>
          <label style={labelStyle}>Specifikationer · {specs.length}/12</label>
          <p style={{ fontSize: 13, color: 'var(--txt3)', margin: '0 0 12px', lineHeight: 1.5 }}>
            Lägg till tekniska detaljer — modell, årsmodell, längd, motor osv.
          </p>
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
                <button type="button" onClick={() => removeSpec(i)} aria-label="Ta bort rad" style={{
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
              marginTop: 10,
              padding: '10px 14px',
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

        {/* Beskrivning */}
        <div style={sectionCard}>
          <label style={labelStyle}>Beskrivning</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Beskriv båten/produkten, historik, varför du säljer…"
            rows={6}
            maxLength={10000}
            style={{
              ...fieldBase,
              fontFamily: 'inherit', resize: 'vertical', minHeight: 120,
            }}
          />
          <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 6 }}>
            Stöd för **fet text** och listor med −. {body.length}/10 000
          </div>
        </div>

        {/* Extern länk */}
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

        {/* Fel + submit */}
        {err && (
          <div style={{
            padding: '12px 14px',
            background: 'rgba(220,38,38,0.08)',
            border: '1px solid rgba(220,38,38,0.2)',
            borderRadius: 12,
            color: '#dc2626', fontSize: 14, fontWeight: 600,
            marginBottom: 16,
          }}>{err}</div>
        )}

        <button type="submit" disabled={submitting || uploading} style={{
          width: '100%',
          padding: '16px',
          borderRadius: 14,
          border: 'none',
          background: submitting ? 'rgba(10,123,140,0.5)' : 'var(--acc, #c96e2a)',
          color: '#fff',
          fontSize: 16, fontWeight: 700,
          cursor: submitting || uploading ? 'wait' : 'pointer',
          boxShadow: '0 4px 14px rgba(201,110,42,0.3)',
        }}>
          {submitting ? 'Publicerar…' : 'Publicera annons'}
        </button>

        <p style={{ fontSize: 12, color: 'var(--txt3)', textAlign: 'center', margin: '12px 0 0', lineHeight: 1.5 }}>
          Du ansvarar själv för innehållet. Inga bedrägerier, inga kontakta-mig-direkt-för-pris-tricks.
        </p>
      </form>
    </main>
  )
}

'use client'
/**
 * LoppisImageEditor — bild-hantering för Loppis-annonsens ägare.
 *
 * Visas inline i LoppisListingCard när isOwner=true. Låter ägaren ladda
 * upp nya bilder, ta bort befintliga och omordna. Bilder lagras i
 * listing_data.images via PATCH /api/forum/threads/[id]/listing-images.
 *
 * Återanvänder /api/forum/upload-image för uppladdning.
 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Props {
  threadId: string
  initialImages: string[]
  /** Max bilder totalt på annons. */
  maxImages?: number
}

export default function LoppisImageEditor({ threadId, initialImages, maxImages = 8 }: Props) {
  const router = useRouter()
  const [images, setImages] = useState<string[]>(initialImages)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function persist(next: string[]) {
    setBusy(true)
    setErr('')
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/listing-images`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ images: next }),
      })
      const data = await res.json()
      if (!res.ok) {
        setErr(data.error ?? 'Kunde inte spara.')
        return false
      }
      setImages(next)
      router.refresh()
      return true
    } catch {
      setErr('Nätverksfel.')
      return false
    } finally {
      setBusy(false)
    }
  }

  async function handleUpload(files: FileList | null) {
    if (!files || files.length === 0) return
    if (images.length + files.length > maxImages) {
      setErr(`Max ${maxImages} bilder per annons.`)
      return
    }
    setBusy(true)
    setErr('')
    const newUrls: string[] = []
    try {
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
          setErr(data.error ?? `Uppladdning misslyckades för ${file.name}.`)
          continue
        }
        newUrls.push(data.url)
      }
      if (newUrls.length > 0) {
        await persist([...images, ...newUrls])
      }
    } finally {
      setBusy(false)
    }
  }

  function handleRemove(idx: number) {
    if (busy) return
    if (!confirm('Ta bort bilden?')) return
    void persist(images.filter((_, i) => i !== idx))
  }

  function handleMove(idx: number, dir: -1 | 1) {
    if (busy) return
    const target = idx + dir
    if (target < 0 || target >= images.length) return
    const copy = [...images]
    const tmp = copy[idx]!
    copy[idx] = copy[target]!
    copy[target] = tmp
    void persist(copy)
  }

  function handleSetHero(idx: number) {
    if (busy) return
    if (idx === 0) return
    const picked = images[idx]!
    // Plocka ut vald bild och lägg först. Övriga behåller sin relativa ordning.
    const next = [picked, ...images.filter((_, i) => i !== idx)]
    void persist(next)
  }

  return (
    <div style={{
      background: 'rgba(10,123,140,0.04)',
      border: '1px dashed rgba(10,123,140,0.28)',
      borderRadius: 14,
      padding: 14,
      marginBottom: 18,
    }}>
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 4, gap: 8,
      }}>
        <span style={{
          fontSize: 11, fontWeight: 700, color: 'var(--sea)',
          letterSpacing: '0.6px', textTransform: 'uppercase',
        }}>
          Hantera bilder · {images.length}/{maxImages}
        </span>
        {busy && (
          <span style={{ fontSize: 12, color: 'var(--txt3)' }}>Sparar…</span>
        )}
      </div>
      {images.length > 1 && (
        <div style={{ fontSize: 12, color: 'var(--txt3)', marginBottom: 10, lineHeight: 1.4 }}>
          Tryck på stjärnan på en bild för att göra den till hero (visas först i annonsen).
        </div>
      )}

      {images.length > 0 && (
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
          gap: 8, marginBottom: 12,
        }}>
          {images.map((url, i) => (
            <div key={url} style={{
              position: 'relative', aspectRatio: '4 / 3',
              borderRadius: 8, overflow: 'hidden',
              background: '#0a1e2c',
              border: i === 0 ? '2px solid var(--acc, #c96e2a)' : '1px solid rgba(10,123,140,0.15)',
            }}>
              <Image src={url} alt={`Bild ${i + 1}`} fill sizes="100px" style={{ objectFit: 'cover' }} />
              {i === 0 ? (
                <span style={{
                  position: 'absolute', top: 3, left: 3,
                  background: 'var(--acc, #c96e2a)', color: '#fff',
                  fontSize: 9, fontWeight: 800, letterSpacing: '0.5px',
                  padding: '2px 5px', borderRadius: 3, textTransform: 'uppercase',
                  display: 'inline-flex', alignItems: 'center', gap: 3,
                }}>
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="currentColor" stroke="none">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                  Hero
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => handleSetHero(i)}
                  disabled={busy}
                  aria-label="Gör till hero-bild"
                  title="Gör till hero-bild"
                  style={{
                    position: 'absolute', top: 3, left: 3,
                    width: 22, height: 22, borderRadius: '50%',
                    background: 'rgba(0,0,0,0.55)', color: '#fff',
                    border: 'none', cursor: busy ? 'default' : 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.12s, color 0.12s',
                  }}
                  onMouseEnter={(e) => {
                    if (!busy) {
                      e.currentTarget.style.background = 'var(--acc, #c96e2a)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0,0,0,0.55)'
                  }}
                >
                  <svg width={11} height={11} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26" />
                  </svg>
                </button>
              )}
              <button type="button" onClick={() => handleRemove(i)} disabled={busy} aria-label="Ta bort" style={{
                position: 'absolute', top: 3, right: 3,
                width: 20, height: 20, borderRadius: '50%',
                background: 'rgba(0,0,0,0.65)', color: '#fff',
                border: 'none', cursor: busy ? 'default' : 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <svg width={10} height={10} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <div style={{
                position: 'absolute', bottom: 3, left: 3, right: 3,
                display: 'flex', justifyContent: 'space-between',
              }}>
                <button type="button" onClick={() => handleMove(i, -1)} disabled={busy || i === 0} aria-label="Flytta vänster" style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)', color: '#fff',
                  border: 'none', cursor: (busy || i === 0) ? 'default' : 'pointer',
                  opacity: i === 0 ? 0.3 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M15 19l-7-7 7-7" /></svg>
                </button>
                <button type="button" onClick={() => handleMove(i, 1)} disabled={busy || i === images.length - 1} aria-label="Flytta höger" style={{
                  width: 20, height: 20, borderRadius: '50%',
                  background: 'rgba(0,0,0,0.55)', color: '#fff',
                  border: 'none', cursor: (busy || i === images.length - 1) ? 'default' : 'pointer',
                  opacity: i === images.length - 1 ? 0.3 : 1,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round"><path d="M9 5l7 7-7 7" /></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {images.length < maxImages && (
        <label style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          padding: '12px 14px',
          borderRadius: 10,
          border: '1.5px dashed rgba(10,123,140,0.3)',
          background: 'rgba(10,123,140,0.04)',
          color: 'var(--sea)',
          fontSize: 13, fontWeight: 600,
          cursor: busy ? 'wait' : 'pointer',
        }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
          {busy ? 'Laddar upp…' : images.length === 0 ? 'Lägg till bilder' : 'Lägg till fler bilder'}
          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/heic"
            multiple
            disabled={busy}
            onChange={(e) => handleUpload(e.target.files)}
            style={{ display: 'none' }}
          />
        </label>
      )}

      {err && (
        <div style={{
          marginTop: 10, padding: '8px 12px',
          background: 'rgba(220,38,38,0.08)',
          border: '1px solid rgba(220,38,38,0.2)',
          borderRadius: 8,
          color: '#dc2626', fontSize: 12,
        }}>{err}</div>
      )}
    </div>
  )
}

'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { createCheckIn } from '@/lib/checkins'

type Position = { lat: number; lng: number; accuracy: number }

export default function CheckInPageWrapper() {
  return (
    <Suspense fallback={<div style={{ padding: 32, textAlign: 'center', color: 'var(--txt3)' }}>Laddar…</div>}>
      <CheckInPage />
    </Suspense>
  )
}

function CheckInPage() {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const sp = useSearchParams()
  const prefillPlaceId = sp.get('place_id')
  const prefillPlaceName = sp.get('place_name') ?? ''
  const prefillReturnTo = sp.get('return_to')
  const [me, setMe] = useState<string | null>(null)
  const [pos, setPos] = useState<Position | null>(null)
  const [geoErr, setGeoErr] = useState<string | null>(null)
  const [place, setPlace] = useState(prefillPlaceName)
  const [message, setMessage] = useState('')
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (!user) { router.replace('/logga-in?next=/check-in'); return }
      setMe(user.id)
    })
    grabPosition()
  }, [supabase, router])

  function grabPosition() {
    if (!navigator.geolocation) { setGeoErr('Position stöds inte i din webbläsare.'); return }
    setGeoErr(null)
    navigator.geolocation.getCurrentPosition(
      (p) => setPos({ lat: p.coords.latitude, lng: p.coords.longitude, accuracy: p.coords.accuracy }),
      (e) => setGeoErr(e.message || 'Kunde inte läsa position'),
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 30_000 },
    )
  }

  function onPickImage(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    if (f.size > 8 * 1024 * 1024) { setErr('Bilden är för stor (max 8 MB).'); return }
    setImage(f)
    setPreview(URL.createObjectURL(f))
  }

  async function uploadImage(file: File): Promise<string | null> {
    if (!me) return null
    const ext = (file.name.split('.').pop() ?? 'jpg').toLowerCase()
    const path = `checkin/${me}/${Date.now()}.${ext}`
    const { error } = await supabase.storage.from('trip-images').upload(path, file, {
      upsert: false, contentType: file.type,
    })
    if (error) return null
    const { data } = supabase.storage.from('trip-images').getPublicUrl(path)
    return data.publicUrl
  }

  async function submit() {
    if (!me) return
    if (!pos && !place.trim()) {
      setErr('Ange plats eller tillåt positionsdelning.')
      return
    }
    setBusy(true); setErr(null)
    try {
      let imageUrl: string | null = null
      if (image) {
        imageUrl = await uploadImage(image)
        if (!imageUrl) { setErr('Kunde inte ladda upp bild.'); setBusy(false); return }
      }
      const res = await createCheckIn(supabase, me, {
        place_id: prefillPlaceId || null,
        place_name: place.trim() || null,
        lat: pos?.lat ?? null,
        lng: pos?.lng ?? null,
        message: message.trim() || null,
        image: imageUrl,
      })
      if (!res) { setErr('Kunde inte checka in. Försök igen.'); setBusy(false); return }
      // Whitelist: tillåt bara interna sökvägar (börjar med /) för att undvika open redirect
      const safeDest = prefillReturnTo && prefillReturnTo.startsWith('/') && !prefillReturnTo.startsWith('//')
        ? prefillReturnTo
        : '/feed'
      router.push(safeDest)
    } catch (e: unknown) {
      setErr(e instanceof Error ? e.message : 'Oväntat fel')
      setBusy(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 120 }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 16px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => router.back()} aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0, border: 'none',
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 style={{ flex: 1, fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: 0 }}>Checka in</h1>
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        <p style={{ fontSize: 13, color: 'var(--txt3)', lineHeight: 1.5, margin: '0 0 16px' }}>
          Snabbt sätt att säga &quot;jag är här&quot; — utan full turlogg. Bra för krog-stopp, bryggor, uppe-på-ön-bilder.
        </p>

        {/* Position */}
        <div style={{
          padding: 14, borderRadius: 14,
          background: pos ? 'rgba(30,92,130,0.06)' : 'rgba(10,123,140,0.04)',
          border: '1px solid rgba(10,123,140,0.10)',
          marginBottom: 14,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ fontSize: 22 }}>{pos ? '📍' : '🧭'}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              {pos ? (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>Position hittad</div>
                  <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>
                    {pos.lat.toFixed(5)}, {pos.lng.toFixed(5)} · ±{Math.round(pos.accuracy)}m
                  </div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>Söker position…</div>
                  {geoErr && <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 2 }}>{geoErr}</div>}
                </>
              )}
            </div>
            <button onClick={grabPosition}
              style={{ padding: '6px 12px', borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', background: 'var(--white)', fontSize: 12, fontWeight: 700, cursor: 'pointer', color: 'var(--txt)' }}>
              Uppdatera
            </button>
          </div>
        </div>

        {/* Plats */}
        <label htmlFor="ci-place" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>
          Plats (valfritt)
        </label>
        <input id="ci-place" value={place} onChange={e => setPlace(e.target.value)} placeholder="T.ex. Sandhamn, Grinda, Möja"
          maxLength={60}
          style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 14, background: 'var(--bg)', color: 'var(--txt)' }} />

        {/* Meddelande */}
        <label htmlFor="ci-message" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>
          Vad gör du här? (valfritt)
        </label>
        <textarea id="ci-message" value={message} onChange={e => setMessage(e.target.value)} placeholder="Morronkaffe på bryggan, sol på stilla vatten…"
          maxLength={280} rows={3}
          style={{ width: '100%', padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 6, background: 'var(--bg)', color: 'var(--txt)', resize: 'vertical', fontFamily: 'inherit' }} />
        <div style={{ fontSize: 11, color: 'var(--txt3)', textAlign: 'right', marginBottom: 14 }}>
          {message.length}/280
        </div>

        {/* Bild */}
        <label htmlFor="ci-image" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 6 }}>
          Bild (valfritt)
        </label>
        {preview ? (
          <div style={{ position: 'relative', marginBottom: 14 }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img loading="lazy" decoding="async" src={preview} alt="" style={{ width: '100%', borderRadius: 14, display: 'block' }} />
            <button onClick={() => { setImage(null); setPreview(null) }}
              aria-label="Ta bort vald bild"
              className="press-feedback"
              style={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, borderRadius: '50%', border: 'none', background: 'rgba(0,0,0,0.6)', color: '#fff', fontWeight: 600, cursor: 'pointer' }}>
              ✕
            </button>
          </div>
        ) : (
          <label style={{
            display: 'block', padding: '24px 14px', borderRadius: 14,
            border: '2px dashed rgba(10,123,140,0.25)', textAlign: 'center',
            background: 'rgba(10,123,140,0.03)', cursor: 'pointer', marginBottom: 14,
          }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>📸</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>Lägg till bild</div>
            <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>JPG eller PNG, max 8 MB</div>
            <input id="ci-image" type="file" accept="image/*" onChange={onPickImage} style={{ display: 'none' }} />
          </label>
        )}

        {err && (
          <div style={{ padding: 10, borderRadius: 10, background: 'rgba(200,30,30,0.08)', color: 'var(--red)', fontSize: 12, marginBottom: 12 }}>
            {err}
          </div>
        )}

        <button onClick={submit} disabled={busy || (!pos && !place.trim())}
          style={{
            width: '100%', padding: '14px 18px', borderRadius: 14, border: 'none',
            background: 'var(--grad-sea)', color: '#fff',
            fontWeight: 600, fontSize: 15, cursor: busy ? 'wait' : 'pointer',
            opacity: (busy || (!pos && !place.trim())) ? 0.6 : 1,
          }}>
          {busy ? 'Checkar in…' : 'Checka in'}
        </button>

        <Link href="/logga" style={{ display: 'block', textAlign: 'center', marginTop: 14, fontSize: 12, color: 'var(--txt3)' }}>
          Vill du logga hela turen istället? →
        </Link>
      </div>
    </div>
  )
}

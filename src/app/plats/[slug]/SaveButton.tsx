'use client'
import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'

/**
 * SaveButton — toggle "spara plats" från /plats/[slug].
 *
 * Initialt kollar mot /api/saves om platsen redan är sparad.
 * Vid klick toggle:as via /api/saves/toggle. Optimistisk update +
 * rollback vid fel. 401 redirectar till logga-in.
 */
interface Props {
  slug: string
  name: string
  type: string | null
  lat: number
  lng: number
  imageUrl: string | null
  island: string | null
}

export default function SaveButton({ slug, name, type, lat, lng, imageUrl, island }: Props) {
  const [saved, setSaved] = useState<boolean | null>(null)
  const [busy, setBusy] = useState(false)

  // Initial check — är platsen redan sparad?
  useEffect(() => {
    let cancelled = false
    fetch('/api/saves')
      .then(r => r.ok ? r.json() : { saves: [] })
      .then((data: { saves?: Array<{ place_slug: string | null }> }) => {
        if (cancelled) return
        const isSaved = (data.saves ?? []).some(s => s.place_slug === slug)
        setSaved(isSaved)
      })
      .catch(() => { if (!cancelled) setSaved(false) })
    return () => { cancelled = true }
  }, [slug])

  async function toggle() {
    if (busy || saved === null) return
    setBusy(true)
    const wasSaved = saved
    setSaved(!wasSaved) // optimistic
    try {
      const r = await fetch('/api/saves/toggle', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          placeSlug: slug,
          placeName: name,
          placeType: type,
          lat, lng,
          imageUrl,
          island,
        }),
      })
      if (!r.ok) {
        setSaved(wasSaved) // rollback
        if (r.status === 401) {
          window.location.href = `/logga-in?returnTo=/plats/${slug}`
        }
      }
    } catch {
      setSaved(wasSaved) // rollback
    } finally {
      setBusy(false)
    }
  }

  // Loading-state — visa avstängd knapp
  if (saved === null) {
    return (
      <button disabled style={baseBtn(false, true)}>
        <Icon name="heart" size={16} />
        <span>Sparar status…</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={toggle}
      disabled={busy}
      aria-pressed={saved}
      style={baseBtn(saved, busy)}
    >
      <Icon name="heart" size={16} stroke={2} />
      <span>{saved ? 'Sparad' : 'Spara'}</span>
    </button>
  )
}

function baseBtn(saved: boolean, busy: boolean): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    padding: '11px 18px',
    borderRadius: 22,
    background: saved ? 'rgba(232,146,74,0.12)' : 'var(--white, #fff)',
    border: saved
      ? '1.5px solid rgba(232,146,74,0.45)'
      : '1.5px solid rgba(10,123,140,0.18)',
    color: saved ? 'var(--accent, #c96e2a)' : 'var(--sea, #1e5c82)',
    fontSize: 14, fontWeight: 600,
    cursor: busy ? 'wait' : 'pointer',
    fontFamily: 'inherit',
    opacity: busy ? 0.7 : 1,
    transition: 'all 0.15s',
  }
}

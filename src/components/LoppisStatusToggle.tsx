'use client'
/**
 * LoppisStatusToggle — segmented control som ägaren använder för att markera
 * sin annons som Aktiv / Reserverad / Såld. PATCH:ar listing_data.status och
 * triggar router.refresh() så badge + opacity uppdateras direkt.
 */
import { useState } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'aktiv' | 'reserverad' | 'sald'

interface Props {
  threadId: string
  initialStatus: Status
}

const OPTIONS: Array<{ value: Status; label: string; color: string; bg: string; activeBg: string; activeColor: string }> = [
  { value: 'aktiv',       label: 'Aktiv',      color: '#16a34a', bg: 'rgba(34,197,94,0.10)',  activeBg: '#16a34a', activeColor: '#fff' },
  { value: 'reserverad',  label: 'Reserverad', color: '#d97706', bg: 'rgba(245,158,11,0.10)', activeBg: '#d97706', activeColor: '#fff' },
  { value: 'sald',        label: 'Såld',       color: '#525252', bg: 'rgba(82,82,82,0.10)',   activeBg: '#1f2937', activeColor: '#fff' },
]

export default function LoppisStatusToggle({ threadId, initialStatus }: Props) {
  const router = useRouter()
  const [status, setStatus] = useState<Status>(initialStatus)
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState('')

  async function setTo(next: Status) {
    if (busy || next === status) return
    const previous = status
    setStatus(next) // optimistic
    setBusy(true)
    setErr('')
    try {
      const res = await fetch(`/api/forum/threads/${threadId}/listing-status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: next }),
      })
      const data = await res.json()
      if (!res.ok) {
        setStatus(previous) // rollback
        setErr(data.error ?? 'Kunde inte uppdatera status.')
        return
      }
      router.refresh()
    } catch {
      setStatus(previous)
      setErr('Nätverksfel.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div style={{
      background: 'var(--card-bg, #fff)',
      border: '1px solid var(--border, rgba(10,123,140,0.10))',
      borderRadius: 14,
      padding: 14,
      marginBottom: 16,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 700, color: 'var(--txt3)',
        letterSpacing: '0.6px', textTransform: 'uppercase',
        marginBottom: 10,
      }}>
        Status på annonsen
      </div>
      <div role="radiogroup" aria-label="Annons-status" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 6,
      }}>
        {OPTIONS.map(opt => {
          const isActive = status === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => setTo(opt.value)}
              disabled={busy}
              style={{
                padding: '11px 6px',
                borderRadius: 10,
                border: 'none',
                background: isActive ? opt.activeBg : opt.bg,
                color: isActive ? opt.activeColor : opt.color,
                fontSize: 13,
                fontWeight: 700,
                cursor: busy ? 'wait' : 'pointer',
                transition: 'background 0.12s, color 0.12s, transform 0.08s',
                transform: isActive ? 'scale(1.02)' : 'scale(1)',
                letterSpacing: '0.2px',
                minHeight: 44, // touch-target
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
      {err && (
        <div style={{
          marginTop: 8, fontSize: 12, color: '#dc2626',
        }}>{err}</div>
      )}
      {status !== 'aktiv' && (
        <p style={{
          fontSize: 12, color: 'var(--txt3)',
          margin: '10px 0 0', lineHeight: 1.5,
        }}>
          {status === 'sald'
            ? 'Annonsen visas som såld med dimmad bild i grid-vyn.'
            : 'En "Reserverad"-chip visas på annonsen tills du markerar den som aktiv eller såld.'}
        </p>
      )}
    </div>
  )
}

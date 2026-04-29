'use client'
import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'

type Status = 'new' | 'contacted' | 'closed' | 'lost'

interface Props {
  id: string
  status: Status
  email: string
  businessName: string
}

const TRANSITIONS: Record<Status, { to: Status; label: string; color: string }[]> = {
  new: [
    { to: 'contacted', label: 'Markera kontaktad', color: '#c96e2a' },
    { to: 'lost', label: 'Tappad', color: '#7f1d1d' },
  ],
  contacted: [
    { to: 'closed', label: 'Vunnen', color: '#0a7b3c' },
    { to: 'lost', label: 'Tappad', color: '#7f1d1d' },
    { to: 'new', label: '↩ Tillbaka till ny', color: '#1d4ed8' },
  ],
  closed: [
    { to: 'contacted', label: '↩ Tillbaka till kontaktad', color: '#c96e2a' },
  ],
  lost: [
    { to: 'new', label: '↩ Återuppta som ny', color: '#1d4ed8' },
  ],
}

export default function PartnerLeadActions({ id, status, email, businessName }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function updateStatus(to: Status) {
    setError(null)
    const res = await fetch('/api/admin/partner-status', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status: to }),
    })
    if (!res.ok) {
      const j = await res.json().catch(() => ({}))
      setError(j.error || 'Kunde inte uppdatera')
      return
    }
    startTransition(() => router.refresh())
  }

  const subject = encodeURIComponent(`Svalla.se — om er anmälan`)
  const body = encodeURIComponent(`Hej!

Tack för att ni är intresserade av ett partnerskap med Svalla.se. Jag heter Tom och är grundare här.

Jag skulle gärna ringa upp och berätta mer om hur vi kan synliggöra ${businessName} på plattformen.

Passar det att höras kring `)
  const mailto = `mailto:${email}?subject=${subject}&body=${body}`

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
      {TRANSITIONS[status].map(t => (
        <button
          key={t.to}
          onClick={() => updateStatus(t.to)}
          disabled={isPending}
          style={{
            fontSize: 12, fontWeight: 600,
            padding: '6px 12px', borderRadius: 8,
            border: `1px solid ${t.color}`,
            background: 'transparent',
            color: t.color,
            cursor: isPending ? 'wait' : 'pointer',
            opacity: isPending ? 0.6 : 1,
          }}
        >
          {t.label}
        </button>
      ))}

      <a
        href={mailto}
        style={{
          fontSize: 12, fontWeight: 600,
          padding: '6px 12px', borderRadius: 8,
          border: '1px solid var(--sea)',
          background: 'var(--sea)', color: '#fff',
          textDecoration: 'none',
          marginLeft: 'auto',
        }}
      >
        ✉ Svara via mail
      </a>

      {error && (
        <span role="alert" style={{ fontSize: 11, color: '#7f1d1d', width: '100%' }}>{error}</span>
      )}
    </div>
  )
}

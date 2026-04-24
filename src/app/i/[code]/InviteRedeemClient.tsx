'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { redeemInvite } from '@/lib/invites'

export default function InviteRedeemClient({ code }: { code: string }) {
  const supabase = useRef(createClient()).current
  const [status, setStatus] = useState<'idle' | 'working' | 'done' | 'error'>('idle')
  const [inviterName, setInviterName] = useState<string | null>(null)

  async function redeem() {
    setStatus('working')
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) { setStatus('error'); return }
    const res = await redeemInvite(supabase, user.id, code)
    if (!res) { setStatus('error'); return }
    // Hämta inviterns username för bekräftelse
    const { data: u } = await supabase.from('users').select('username').eq('id', res.inviterId).maybeSingle()
    setInviterName(u?.username ?? null)
    setStatus('done')
  }

  useEffect(() => {
    // Auto-lös in om användaren redan är inloggad
    redeem()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (status === 'working') {
    return <div style={{ padding: 12, textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>Löser in länken…</div>
  }

  if (status === 'error') {
    return (
      <div style={{ padding: 12, borderRadius: 10, background: 'rgba(200,30,30,0.08)', fontSize: 13, color: 'var(--red)', textAlign: 'center' }}>
        Länken kunde inte lösas in. Kanske har du redan använt den.
        <div style={{ marginTop: 10 }}>
          <Link href="/feed" style={{ fontSize: 13, fontWeight: 600, color: 'var(--sea)' }}>
            Till feeden →
          </Link>
        </div>
      </div>
    )
  }

  if (status === 'done') {
    return (
      <div style={{
        padding: 14, borderRadius: 14,
        background: 'rgba(34,140,56,0.08)', border: '1px solid rgba(34,140,56,0.20)',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: 22, marginBottom: 6 }}>✓</div>
        <div style={{ fontSize: 14, fontWeight: 600, color: '#228c38', marginBottom: 4 }}>Länken inlöst!</div>
        {inviterName && (
          <div style={{ fontSize: 13, color: 'var(--txt2)', marginBottom: 12 }}>
            Du följer nu <Link href={`/u/${inviterName}`} style={{ fontWeight: 600, color: 'var(--sea)' }}>@{inviterName}</Link>
          </div>
        )}
        <Link href="/feed" style={{
          display: 'inline-block', padding: '10px 18px', borderRadius: 12,
          background: 'var(--grad-sea)',
          color: '#fff', fontSize: 13, fontWeight: 600, textDecoration: 'none',
        }}>
          Till feeden →
        </Link>
      </div>
    )
  }

  return null
}

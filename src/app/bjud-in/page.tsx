'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import {
  buildInviteUrl, createInvite, deleteInvite, listMyInvites,
  type Invite,
} from '@/lib/invites'

export default function InvitePage() {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const [me, setMe] = useState<string | null>(null)
  const [invites, setInvites] = useState<Invite[]>([])
  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [showOptions, setShowOptions] = useState(false)
  const [maxUses, setMaxUses] = useState<string>('')
  const [expiresInDays, setExpiresInDays] = useState<string>('')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { router.replace('/logga-in?next=/bjud-in'); return }
      setMe(user.id)
      const list = await listMyInvites(supabase, user.id)
      setInvites(list)
      setLoading(false)
    })
  }, [supabase, router])

  async function newInvite() {
    if (!me) return
    setCreating(true)
    const expiresAt = expiresInDays.trim()
      ? new Date(Date.now() + Number(expiresInDays) * 86_400_000).toISOString()
      : null
    const max = maxUses.trim() ? Math.max(1, Number(maxUses)) : null
    const inv = await createInvite(supabase, me, { maxUses: max, expiresAt })
    setCreating(false)
    if (inv) {
      setInvites(prev => [inv, ...prev])
      setShowOptions(false)
      setMaxUses(''); setExpiresInDays('')
    }
  }

  async function copyLink(code: string) {
    const url = buildInviteUrl(code, typeof window !== 'undefined' ? window.location.origin : 'https://svalla.se')
    try {
      await navigator.clipboard.writeText(url)
      setCopiedCode(code)
      setTimeout(() => setCopiedCode(prev => prev === code ? null : prev), 1500)
    } catch { /* ignorera */ }
  }

  async function shareLink(code: string) {
    const url = buildInviteUrl(code, typeof window !== 'undefined' ? window.location.origin : 'https://svalla.se')
    if ('share' in navigator) {
      try {
        await navigator.share({
          title: 'Gå med på Svalla',
          text: 'Strava för båtfolk — här är min inbjudningslänk:',
          url,
        })
      } catch { /* användare avbröt */ }
    } else {
      copyLink(code)
    }
  }

  async function remove(id: string) {
    if (!confirm('Ta bort denna inbjudningslänk?')) return
    const ok = await deleteInvite(supabase, id)
    if (ok) setInvites(prev => prev.filter(x => x.id !== id))
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 'calc(var(--nav-h) + env(safe-area-inset-bottom, 0px) + 24px)' }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 16px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => router.back()} aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', border: 'none',
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: 'var(--txt)', margin: 0 }}>Bjud in</h1>
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        <div style={{
          padding: '18px 20px', borderRadius: 18,
          background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
          color: '#fff', marginBottom: 18,
          boxShadow: '0 4px 20px rgba(30,92,130,0.30)',
        }}>
          <div style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.15, marginBottom: 6 }}>
            Få med dina seglarpolare
          </div>
          <p style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.5, margin: 0 }}>
            Skapa en personlig länk. Den som registrerar sig via din länk följer dig automatiskt.
            Begränsa antal användningar eller låt den löpa ut när du vill.
          </p>
        </div>

        {/* Skapa-knapp + alternativ */}
        {!showOptions ? (
          <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
            <button onClick={newInvite} disabled={creating}
              style={{
                flex: 1, padding: '14px 18px', borderRadius: 14, border: 'none',
                background: 'linear-gradient(135deg,#c96e2a,#e07828)', color: '#fff',
                fontWeight: 800, fontSize: 14, cursor: creating ? 'wait' : 'pointer',
                opacity: creating ? 0.6 : 1,
              }}>
              {creating ? 'Skapar…' : '+ Skapa ny länk'}
            </button>
            <button onClick={() => setShowOptions(true)}
              style={{
                padding: '14px 16px', borderRadius: 14,
                border: '1px solid rgba(10,123,140,0.20)', background: 'var(--white)',
                fontWeight: 700, fontSize: 13, color: 'var(--txt)', cursor: 'pointer',
              }}>
              Alternativ
            </button>
          </div>
        ) : (
          <div style={{
            background: 'var(--white)', borderRadius: 16, padding: 16, marginBottom: 18,
            boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
          }}>
            <div style={{ marginBottom: 12 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>
                Max antal användningar (valfritt)
              </label>
              <input type="number" min="1" value={maxUses} onChange={e => setMaxUses(e.target.value)}
                placeholder="Tom = obegränsat"
                style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, background: 'var(--bg)', color: 'var(--txt)' }} />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>
                Löper ut om (dagar, valfritt)
              </label>
              <input type="number" min="1" value={expiresInDays} onChange={e => setExpiresInDays(e.target.value)}
                placeholder="Tom = ingen utgångstid"
                style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, background: 'var(--bg)', color: 'var(--txt)' }} />
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={() => setShowOptions(false)}
                style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
                Avbryt
              </button>
              <button onClick={newInvite} disabled={creating}
                style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#c96e2a,#e07828)', color: '#fff', fontWeight: 800, fontSize: 14, cursor: creating ? 'wait' : 'pointer', opacity: creating ? 0.6 : 1 }}>
                {creating ? 'Skapar…' : 'Skapa länk'}
              </button>
            </div>
          </div>
        )}

        {/* Lista */}
        {loading && (
          <div style={{ padding: 20, textAlign: 'center', color: 'var(--txt3)', fontSize: 13 }}>
            Laddar…
          </div>
        )}

        {!loading && invites.length === 0 && (
          <div style={{
            padding: '32px 20px', borderRadius: 14, border: '1px dashed rgba(10,123,140,0.20)',
            background: 'rgba(10,123,140,0.03)', textAlign: 'center',
          }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>🔗</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--txt)', marginBottom: 4 }}>Inga inbjudningar än</div>
            <div style={{ fontSize: 12, color: 'var(--txt3)' }}>Skapa din första länk ovan.</div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {invites.map(inv => {
            const url = buildInviteUrl(inv.code, typeof window !== 'undefined' ? window.location.origin : 'https://svalla.se')
            const expired = inv.expires_at && new Date(inv.expires_at) < new Date()
            const exhausted = inv.max_uses != null && inv.uses >= inv.max_uses
            const status = expired ? 'Utgången' : exhausted ? 'Slut' : 'Aktiv'
            const statusColor = (expired || exhausted) ? '#7a9dab' : '#228c38'
            return (
              <div key={inv.id} style={{
                background: 'var(--white)', borderRadius: 16, padding: 14,
                boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
                border: '1px solid rgba(10,123,140,0.08)',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                  <div style={{
                    fontFamily: 'ui-monospace, SF Mono, Menlo, monospace',
                    fontSize: 17, fontWeight: 900, color: 'var(--txt)', letterSpacing: '1.5px',
                  }}>{inv.code}</div>
                  <div style={{
                    padding: '2px 8px', borderRadius: 10,
                    background: 'rgba(10,123,140,0.06)',
                    fontSize: 10, fontWeight: 800, color: statusColor, textTransform: 'uppercase', letterSpacing: '0.6px',
                  }}>{status}</div>
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 10, wordBreak: 'break-all' }}>
                  {url}
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 10, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <span>👥 {inv.uses}{inv.max_uses != null ? ` / ${inv.max_uses}` : ''}</span>
                  {inv.expires_at && (
                    <span>⏳ till {new Date(inv.expires_at).toLocaleDateString('sv-SE', { day: 'numeric', month: 'short' })}</span>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 6 }}>
                  <button onClick={() => copyLink(inv.code)}
                    style={{
                      flex: 1, padding: 10, borderRadius: 10,
                      border: '1px solid rgba(10,123,140,0.20)', background: 'var(--bg)',
                      fontSize: 12, fontWeight: 700, color: 'var(--txt)', cursor: 'pointer',
                    }}>
                    {copiedCode === inv.code ? '✓ Kopierad' : '📋 Kopiera'}
                  </button>
                  <button onClick={() => shareLink(inv.code)}
                    style={{
                      flex: 1, padding: 10, borderRadius: 10, border: 'none',
                      background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                      color: '#fff', fontSize: 12, fontWeight: 800, cursor: 'pointer',
                    }}>
                    Dela
                  </button>
                  <button onClick={() => remove(inv.id)} aria-label="Ta bort"
                    style={{
                      padding: '10px 12px', borderRadius: 10,
                      border: '1px solid rgba(200,30,30,0.25)', background: 'transparent',
                      fontSize: 12, color: '#c03', cursor: 'pointer',
                    }}>
                    🗑
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        <Link href="/profil" style={{ display: 'block', textAlign: 'center', marginTop: 20, fontSize: 12, color: 'var(--txt3)' }}>
          ← Tillbaka till profil
        </Link>
      </div>
    </div>
  )
}

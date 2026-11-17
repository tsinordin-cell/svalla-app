'use client'
import { useState } from 'react'
import { createPortal } from 'react-dom'
import { Ban } from '@/components/icons/LucideIcons'
import Icon from '@/components/Icon'

interface Props {
  targetUserId: string
  targetUsername: string
  initialBlocked: boolean
  /** Renderas inline (ingen ram) — för inlining i profilmenyer */
  bare?: boolean
  /** Hel rad i turmenyn: neutral text, samma bekräftelse som annars. */
  menu?: boolean
}

export default function BlockButton({
  targetUserId, targetUsername, initialBlocked, bare = false, menu = false,
}: Props) {
  const [blocked, setBlocked] = useState(initialBlocked)
  const [confirm, setConfirm] = useState(false)
  const [busy, setBusy]       = useState(false)
  const [err, setErr]         = useState<string | null>(null)

  async function doBlock() {
    setBusy(true); setErr(null)
    try {
      const res = await fetch('/api/block', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: targetUserId }),
      })
      if (res.ok) { setBlocked(true); setConfirm(false) }
      else { const j = await res.json(); setErr(j.error ?? 'Fel') }
    } catch { setErr('Nätverksfel') }
    setBusy(false)
  }

  async function doUnblock() {
    setBusy(true); setErr(null)
    try {
      const res = await fetch('/api/block', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: targetUserId }),
      })
      if (res.ok) setBlocked(false)
      else { const j = await res.json(); setErr(j.error ?? 'Fel') }
    } catch { setErr('Nätverksfel') }
    setBusy(false)
  }

  const namn = targetUsername ? `@${targetUsername}` : 'personen'
  const radText = blocked ? `Avblockera ${namn}` : `Blockera ${namn}`

  return (
    <>
      {menu ? (
        <button
          type="button"
          onClick={() => blocked ? doUnblock() : setConfirm(true)}
          disabled={busy}
          className="press-feedback"
          aria-label={blocked ? `Avblockera ${targetUsername || 'användaren'}` : `Blockera ${targetUsername || 'användaren'}`}
          style={{
            width: '100%', minHeight: 48, padding: '8px 10px', borderRadius: 14, border: 'none',
            background: 'none', cursor: busy ? 'wait' : 'pointer',
            display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
            color: 'var(--txt)', opacity: busy ? 0.6 : 1,
          }}
        >
          <span aria-hidden style={{
            width: 36, height: 36, borderRadius: 12, flexShrink: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(10,123,140,0.05)', color: 'var(--txt3)',
          }}>
            <Ban size={18} />
          </span>
          <span style={{ fontSize: 15, fontWeight: 600, flex: 1 }}>
            {busy ? 'Vänta…' : radText}
          </span>
        </button>
      ) : bare ? (
        <button
          onClick={() => blocked ? doUnblock() : setConfirm(true)}
          disabled={busy}
          className="press-feedback"
          style={{
            background: 'none', border: 'none', cursor: busy ? 'wait' : 'pointer',
            fontSize: 13, color: blocked ? 'var(--txt3)' : '#c03',
            padding: 0, textAlign: 'left', width: '100%',
          }}
        >
          {busy ? '…' : blocked ? `Avblockera @${targetUsername}` : `Blockera @${targetUsername}`}
        </button>
      ) : (
        <button
          onClick={() => blocked ? doUnblock() : setConfirm(true)}
          disabled={busy}
          className="press-feedback"
          aria-label={blocked ? `Avblockera ${targetUsername}` : `Blockera ${targetUsername}`}
          style={{
            padding: '8px 14px', borderRadius: 10, cursor: busy ? 'wait' : 'pointer',
            border: blocked ? '1px solid rgba(10,123,140,0.20)' : '1px solid rgba(200,30,30,0.3)',
            background: blocked ? 'rgba(10,123,140,0.05)' : 'rgba(200,30,30,0.05)',
            color: blocked ? 'var(--txt3)' : '#c03',
            fontSize: 13, fontWeight: 600,
          }}
        >
          {busy ? '…' : blocked ? 'Avblockera' : 'Blockera'}
        </button>
      )}

      {err && (
        <div style={{ fontSize: 11, color: 'var(--red)', marginTop: 4 }}>{err}</div>
      )}

      {/* Bekräftelsedialog. Portal så att ett ark med overflow inte klipper den. */}
      {confirm && typeof document !== 'undefined' && createPortal(
        <div
          style={{
            position: 'fixed', inset: 0, zIndex: 1300,
            background: 'rgba(0,20,30,0.55)', backdropFilter: 'blur(4px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 24,
          }}
          onClick={e => { if (e.target === e.currentTarget) setConfirm(false) }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Blockera ${targetUsername}`}
            style={{
              width: '100%', maxWidth: 340,
              background: 'var(--bg)',
              borderRadius: 20, padding: 24,
              boxShadow: '0 8px 40px rgba(0,20,30,0.2)',
            }}
          >
            <div style={{textAlign: 'center', marginBottom: 14}} aria-hidden><Icon name="x" size={32} /></div>
            <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', textAlign: 'center', margin: '0 0 10px' }}>
              Blockera @{targetUsername}?
            </h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center', lineHeight: 1.5, margin: '0 0 20px' }}>
              De kan inte längre se dina turer eller skicka meddelanden till dig. Du kan avblockera när som helst.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => setConfirm(false)}
                className="press-feedback"
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 12,
                  border: '1px solid rgba(10,123,140,0.20)',
                  background: 'var(--white)', color: 'var(--txt)',
                  fontWeight: 600, fontSize: 14, cursor: 'pointer',
                }}
              >
                Avbryt
              </button>
              <button
                onClick={doBlock}
                disabled={busy}
                className="press-feedback"
                style={{
                  flex: 1, padding: '12px 14px', borderRadius: 12, border: 'none',
                  background: 'linear-gradient(135deg,#c03,#e03030)', color: '#fff',
                  fontWeight: 600, fontSize: 14,
                  cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.7 : 1,
                }}
              >
                {busy ? 'Blockerar…' : 'Blockera'}
              </button>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  )
}

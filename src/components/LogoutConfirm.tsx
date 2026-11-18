'use client'

import { useEffect, useRef } from 'react'
import { LogOut } from '@/components/icons/LucideIcons'

/**
 * Bekräftelse innan utloggning. Yta, kant och röd knapp kommer från tematokens
 * så samma dialog fungerar i ljust och mörkt läge.
 */
export default function LogoutConfirm({
  open,
  busy,
  onCancel,
  onConfirm,
}: {
  open: boolean
  busy: boolean
  onCancel: () => void
  onConfirm: () => void
}) {
  const cancelRef = useRef<HTMLButtonElement>(null)
  const onCancelRef = useRef(onCancel)
  const busyRef = useRef(busy)
  onCancelRef.current = onCancel
  busyRef.current = busy

  useEffect(() => {
    if (!open) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    cancelRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && !busyRef.current) onCancelRef.current()
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  if (!open) return null

  return (
    <>
      <div
        className="logout-backdrop"
        onClick={() => { if (!busy) onCancel() }}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="logout-title"
        aria-describedby="logout-body"
        className="logout-dialog"
      >
        <div className="logout-dialog-head">
          <div className="logout-dialog-icon" aria-hidden>
            <LogOut size={20} />
          </div>
          <div>
            <h2 id="logout-title">Logga ut?</h2>
            <p id="logout-body">Du behöver logga in igen nästa gång.</p>
          </div>
        </div>
        <div className="logout-dialog-actions">
          <button
            ref={cancelRef}
            type="button"
            onClick={onCancel}
            disabled={busy}
            className="logout-btn-secondary"
          >
            Avbryt
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={busy}
            className="logout-btn-danger"
          >
            {busy ? 'Loggar ut…' : 'Logga ut'}
          </button>
        </div>
      </div>
    </>
  )
}

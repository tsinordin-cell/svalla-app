'use client'
import { useState, useEffect, type ReactNode, type MouseEvent } from 'react'
import { Ban, Flag } from '@/components/icons/LucideIcons'
import { createClient } from '@/lib/supabase'
import ReportButton from '@/components/ReportButton'
import BlockButton from '@/components/BlockButton'
import { isBlocked } from '@/lib/blocks'

interface Props {
  targetUserId: string
  targetUsername: string
}

export default function ProfileMoreMenu({ targetUserId, targetUsername }: Props) {
  const [me, setMe]               = useState<string | null>(null)
  const [open, setOpen]           = useState(false)
  const [blocked, setBlocked]     = useState(false)
  const [loadedBlocked, setLoadedBlocked] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user || user.id === targetUserId) return
      setMe(user.id)
      const b = await isBlocked(supabase, user.id, targetUserId)
      setBlocked(b)
      setLoadedBlocked(true)
    })
  }, [targetUserId])

  // Visa ingenting om vi är på vår egna profil eller ej inloggad
  if (!me) return null

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Fler alternativ"
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'rgba(10,123,140,0.08)',
          border: '1px solid rgba(10,123,140,0.15)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: 'var(--sea)' }}>
          <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
        </svg>
      </button>

      {open && (
        <Backdrop onClick={() => setOpen(false)}>
          <Sheet label={`Alternativ för ${targetUsername}`} onClick={e => e.stopPropagation()}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(10,123,140,0.15)', margin: '0 auto 18px' }} />

            <h3 style={{ fontSize: 16, fontWeight: 700, color: 'var(--txt)', margin: '0 0 16px', textAlign: 'center' }}>
              @{targetUsername}
            </h3>

            {/* Block */}
            {loadedBlocked && (
              <MenuRow icon={<Ban size={18} />}>
                <BlockButton
                  targetUserId={targetUserId}
                  targetUsername={targetUsername}
                  initialBlocked={blocked}
                  bare
                />
              </MenuRow>
            )}

            <div style={{ height: 1, background: 'rgba(10,123,140,0.08)', margin: '4px 0' }} />

            {/* Report */}
            <MenuRow icon={<Flag size={18} style={{ color: '#dc2626' }} />}>
              <ReportButton
                targetType="user"
                targetId={targetUserId}
                label={`Anmäl @${targetUsername}`}
                bare
              />
            </MenuRow>

            <button
              onClick={() => setOpen(false)}
              className="press-feedback"
              style={{
                width: '100%', marginTop: 10, padding: '13px', borderRadius: 14,
                background: 'rgba(10,123,140,0.07)', border: 'none',
                color: 'var(--txt2)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Avbryt
            </button>
          </Sheet>
        </Backdrop>
      )}
    </>
  )
}

function MenuRow({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 4px' }}>
      <span style={{ width: 24, height: 24, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1 }}>{children}</div>
    </div>
  )
}

function Backdrop({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,20,35,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
      }}
    >
      {children}
    </div>
  )
}

function Sheet({ onClick, children, label }: { onClick?: (e: MouseEvent<HTMLDivElement>) => void; children: ReactNode; label?: string }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClick}
      style={{
        background: 'var(--white)', borderRadius: '24px 24px 0 0',
        padding: '20px 20px calc(24px + env(safe-area-inset-bottom, 0px))',
        width: '100%', maxWidth: 480,
        boxShadow: '0 -4px 40px rgba(0,20,35,0.15)',
        maxHeight: '70svh', overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}

'use client'
import { useState, useEffect, type CSSProperties, type ReactNode, type MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { createClient, BOAT_TYPES } from '@/lib/supabase'
import { toast } from '@/components/Toast'

const PINNAR = [
  { value: 1, emoji: '⚓',     label: 'Okej' },
  { value: 2, emoji: '⚓⚓',   label: 'Bra!' },
  { value: 3, emoji: '⚓⚓⚓', label: 'Magisk 🔥' },
]

interface TripData {
  caption: string | null
  location_name: string | null
  pinnar_rating: number | null
  boat_type: string
}

export default function TripActions({
  tripId,
  ownerId,
}: {
  tripId: string
  ownerId: string
}) {
  const [userId,   setUserId]   = useState<string | null>(null)
  const [menu,     setMenu]     = useState(false)    // ⋯ menu open
  const [editing,  setEditing]  = useState(false)   // edit sheet open
  const [deleting, setDeleting] = useState(false)
  const [confirm,  setConfirm]  = useState(false)   // delete confirm

  // edit fields
  const [caption,  setCaption]  = useState('')
  const [location, setLocation] = useState('')
  const [pinnar,   setPinnar]   = useState<number | null>(null)
  const [boatType, setBoatType] = useState('')
  const [saving,   setSaving]   = useState(false)

  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    supabase.auth.getUser().then(({ data: { user } }) => setUserId(user?.id ?? null))
  }, [])

  // Only render for the trip owner
  if (userId !== ownerId) return null

  // ── Load current trip data into edit form ────────────────────────────────────
  async function openEdit() {
    setMenu(false)
    const supabase = createClient()
    const { data } = await supabase
      .from('trips')
      .select('caption, location_name, pinnar_rating, boat_type')
      .eq('id', tripId)
      .single()
    if (data) {
      const d = data as TripData
      setCaption(d.caption ?? '')
      setLocation(d.location_name ?? '')
      setPinnar(d.pinnar_rating)
      setBoatType(d.boat_type ?? '')
    }
    setEditing(true)
  }

  // ── Save edits ───────────────────────────────────────────────────────────────
  async function handleSave() {
    setSaving(true)
    const supabase = createClient()
    const { error } = await supabase
      .from('trips')
      .update({
        caption:       caption.trim() || null,
        location_name: location.trim() || null,
        pinnar_rating: pinnar,
        boat_type:     boatType || 'Annat',
      })
      .eq('id', tripId)
    setSaving(false)
    if (error) { toast('Kunde inte spara ändringar. Försök igen.', 'error'); return }
    toast('Turen uppdaterad ✓')
    setEditing(false)
    router.refresh()
  }

  // ── Soft-delete ──────────────────────────────────────────────────────────────
  // Sätter deleted_at. Turen försvinner direkt från feed/profil men kan
  // återställas i 30 dagar. purge_old_deleted_trips() städar bort permanent.
  async function handleDelete() {
    setDeleting(true)
    const supabase = createClient()
    const { error } = await supabase.rpc('soft_delete_trip', { p_trip_id: tripId })
    if (error) { toast('Kunde inte ta bort turen. Försök igen.', 'error'); setDeleting(false); setConfirm(false); return }
    router.push('/feed')
  }

  return (
    <>
      {/* ── ⋯ trigger button ── */}
      <button
        onClick={() => setMenu(true)}
        style={{
          width: 36, height: 36, borderRadius: '50%',
          background: 'var(--glass-88)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 6px rgba(0,20,35,0.15)',
          WebkitTapHighlightColor: 'transparent',
        }}
        aria-label="Alternativ"
      >
        <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 18, height: 18, color: 'var(--sea)' }}>
          <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
        </svg>
      </button>

      {/* ── Action menu sheet ── */}
      {menu && !editing && !confirm && (
        <Backdrop onClick={() => setMenu(false)}>
          <Sheet>
            <Handle />
            <MenuItem
              icon="✏️"
              label="Redigera tur"
              onClick={openEdit}
            />
            <div style={{ height: 1, background: 'rgba(10,123,140,0.08)', margin: '4px 0' }} />
            <MenuItem
              icon="🗑"
              label="Ta bort tur"
              danger
              onClick={() => { setMenu(false); setConfirm(true) }}
            />
            <button
              onClick={() => setMenu(false)}
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

      {/* ── Edit sheet ── */}
      {editing && (
        <Backdrop onClick={() => !saving && setEditing(false)}>
          <Sheet onClick={e => e.stopPropagation()}>
            <Handle />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 18px', textAlign: 'center' }}>
              Redigera tur
            </h3>

            {/* Location */}
            <label style={labelStyle}>📍 Plats</label>
            <input
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="t.ex. Sandhamn, Grinda…"
              maxLength={100}
              style={inputStyle}
            />

            {/* Caption */}
            <label style={{ ...labelStyle, marginTop: 12 }}>💬 Berätta om turen</label>
            <textarea
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Vad hände? Vad var bäst?"
              maxLength={280}
              rows={3}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
            />
            <div style={{ fontSize: 10, color: 'var(--txt3)', textAlign: 'right', marginBottom: 12 }}>{caption.length}/280</div>

            {/* Pinnar */}
            <label style={labelStyle}>⚓ Hur var turen?</label>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {PINNAR.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPinnar(pinnar === p.value ? null : p.value)}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 12, border: 'none', cursor: 'pointer',
                    background: pinnar === p.value
                      ? p.value === 3 ? 'linear-gradient(135deg,#c96e2a,#e07828)' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)'
                      : 'rgba(10,123,140,0.07)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ fontSize: 14 }}>{p.emoji}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: pinnar === p.value ? '#fff' : 'var(--txt3)' }}>{p.label}</span>
                </button>
              ))}
            </div>

            {/* Boat type */}
            <label style={labelStyle}>🚤 Båttyp</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 18 }}>
              {BOAT_TYPES.map(bt => (
                <button
                  key={bt}
                  type="button"
                  onClick={() => setBoatType(bt === boatType ? '' : bt)}
                  style={{
                    padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    background: boatType === bt ? '#1e5c82' : 'rgba(10,123,140,0.07)',
                    color: boatType === bt ? '#fff' : 'var(--txt2)',
                  }}
                >
                  {bt}
                </button>
              ))}
            </div>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saving}
              style={{
                width: '100%', padding: '14px', borderRadius: 16, border: 'none',
                background: saving ? 'rgba(10,123,140,0.15)' : 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                color: saving ? 'var(--txt3)' : '#fff', fontSize: 15, fontWeight: 600,
                cursor: saving ? 'default' : 'pointer', marginBottom: 10,
              }}
            >
              {saving ? 'Sparar…' : 'Spara ändringar'}
            </button>
            <button
              onClick={() => setEditing(false)}
              disabled={saving}
              style={{
                width: '100%', padding: '13px', borderRadius: 16,
                background: 'rgba(10,123,140,0.07)', border: 'none',
                color: 'var(--txt2)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
              }}
            >
              Avbryt
            </button>
          </Sheet>
        </Backdrop>
      )}

      {/* ── Delete confirmation ── */}
      {confirm && (
        <Backdrop onClick={() => !deleting && setConfirm(false)}>
          <Sheet onClick={e => e.stopPropagation()}>
            <Handle />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', textAlign: 'center' }}>
              Ta bort tur?
            </h3>
            <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center', margin: '0 0 24px', lineHeight: 1.5 }}>
              Turen försvinner från flödet och din profil direkt. Den raderas permanent om 30 dagar — kontakta oss innan dess om du ångrar dig.
            </p>
            <button
              onClick={handleDelete}
              disabled={deleting}
              style={{
                width: '100%', padding: '14px', borderRadius: 16, border: 'none',
                background: '#dc2626', color: '#fff', fontSize: 15, fontWeight: 600,
                cursor: deleting ? 'default' : 'pointer', opacity: deleting ? 0.7 : 1, marginBottom: 10,
              }}
            >
              {deleting ? 'Raderar…' : '🗑 Ja, ta bort'}
            </button>
            <button
              onClick={() => setConfirm(false)}
              style={{
                width: '100%', padding: '13px', borderRadius: 16,
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

// ── Shared primitives ──────────────────────────────────────────────────────────

function Backdrop({ onClick, children }: { onClick: () => void; children: ReactNode }) {
  return (
    <div
      onClick={onClick}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,20,35,0.5)',
        backdropFilter: 'blur(4px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {children}
    </div>
  )
}

function Sheet({ onClick, children }: { onClick?: (e: MouseEvent<HTMLDivElement>) => void; children: ReactNode }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: 'var(--white)', borderRadius: '24px',
        padding: '20px 20px 24px',
        width: '100%', maxWidth: 480,
        margin: '0 16px',
        boxShadow: '0 -4px 40px rgba(0,20,35,0.15)',
        maxHeight: '88svh', overflowY: 'auto',
        boxSizing: 'border-box',
      }}
    >
      {children}
    </div>
  )
}

function Handle() {
  return <div style={{ width: 36, height: 4, borderRadius: 2, background: 'rgba(10,123,140,0.15)', margin: '0 auto 18px' }} />
}

function MenuItem({ icon, label, danger, onClick }: { icon: string; label: string; danger?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%', padding: '14px 16px', borderRadius: 14, border: 'none',
        background: 'none', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
        color: danger ? '#dc2626' : 'var(--txt)',
      }}
    >
      <span style={{ fontSize: 20 }}>{icon}</span>
      <span style={{ fontSize: 15, fontWeight: 700 }}>{label}</span>
    </button>
  )
}

const labelStyle: CSSProperties = {
  display: 'block', fontSize: 10, fontWeight: 600,
  color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.6px',
  marginBottom: 6,
}

const inputStyle: CSSProperties = {
  width: '100%', padding: '12px 14px', borderRadius: 14,
  border: '1.5px solid rgba(10,123,140,0.15)',
  background: 'var(--bg)', fontSize: 14, color: 'var(--txt)',
  outline: 'none', boxSizing: 'border-box', marginBottom: 4,
  fontFamily: 'inherit',
}

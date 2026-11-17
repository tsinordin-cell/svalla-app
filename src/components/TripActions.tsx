'use client'
import { useState, useEffect, useCallback, useRef, type CSSProperties, type ReactNode, type MouseEvent, type MutableRefObject } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Pencil, MapPin, Trash2, MessageCircle, Flag, Link2 } from '@/components/icons/LucideIcons'
import { createClient, BOAT_TYPES, getViewer } from '@/lib/supabase'
import { revalidateTrip } from '@/lib/revalidate-trip'
import { toast } from '@/components/Toast'
import ReportButton from '@/components/ReportButton'
import BlockButton from '@/components/BlockButton'
import Icon from '@/components/Icon'
import { IconAnchor, IconMotorboat } from '@/components/icons/SvallaIcons'
import { isPro, isProEnabled } from '@/lib/pro'
import { isBlocked } from '@/lib/blocks'
import { track } from '@/lib/analytics-events'

/** Samma idé som Dela på tursidan: Web Share, och urklipp om det saknas. */
function delningsPayload(tripId: string, plats: string | null | undefined) {
  const url = `https://svalla.se/tur/${tripId}`
  const namn = plats?.trim()
  return {
    url,
    title: namn ? `${namn} | Svalla` : 'Tur på Svalla',
    text: namn ? `Kolla in turen till ${namn} på Svalla` : 'Kolla in den här turen på Svalla',
  }
}

const PINNAR = [
  { value: 1, anchors: 1, label: 'Okej' },
  { value: 2, anchors: 2, label: 'Bra!' },
  { value: 3, anchors: 3, label: 'Magisk' },
]

interface TripData {
  caption: string | null
  location_name: string | null
  pinnar_rating: number | null
  boat_type: string
  visibility: 'public' | 'private' | null
}

export default function TripActions({
  tripId,
  ownerId,
  username = null,
  locationName = null,
}: {
  tripId: string
  ownerId: string
  /** För "Visa profil". Utan namn visas ingen länk. */
  username?: string | null
  /** Platsnamn, används i delningstexten. */
  locationName?: string | null
}) {
  const [userId,    setUserId]    = useState<string | null>(null)
  const [ready,     setReady]     = useState(false)
  const [isProUser, setIsProUser] = useState<boolean | null>(null)
  const [menu,      setMenu]      = useState(false)
  const [editing,   setEditing]   = useState(false)   // edit sheet open
  const [deleting,  setDeleting]  = useState(false)
  const [confirm,   setConfirm]   = useState(false)   // delete confirm
  const [paywall,   setPaywall]   = useState(false)   // GPX paywall sheet
  const [reportOpen, setReportOpen] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [blockKnown, setBlockKnown] = useState(false)
  const skipFocusRestore = useRef(false)
  const pathname = usePathname()
  const closeMenu = useCallback(() => setMenu(false), [])

  // edit fields
  const [caption,  setCaption]  = useState('')
  const [location, setLocation] = useState('')
  const [pinnar,   setPinnar]   = useState<number | null>(null)
  const [boatType, setBoatType] = useState('')
  // Synlighet i efterhand (2026-09-12): tidigare gick det bara att göra en
  // privat tur synlig (delningsmodalen), aldrig tvärtom. RLS-policyn
  // trips_select_visible döljer privata turer för alla utom ägaren.
  const [isPrivate, setIsPrivate] = useState(false)
  const [saving,   setSaving]   = useState(false)

  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()
    getViewer(supabase).then(async ({ data: { user } }) => {
      setUserId(user?.id ?? null)
      if (user && isProEnabled()) {
        const proActive = await isPro(supabase, user.id)
        setIsProUser(proActive)
      }
      setReady(true)
    })
  }, [])

  const isOwner = ready && userId === ownerId
  const isOther = ready && !!userId && userId !== ownerId

  useEffect(() => {
    if (!isOther || !userId) return
    let cancel = false
    isBlocked(createClient(), userId, ownerId).then(value => {
      if (!cancel) {
        setBlocked(value)
        setBlockKnown(true)
      }
    })
    return () => { cancel = true }
  }, [isOther, userId, ownerId])

  const profilNamn = username?.trim() || null
  const plats = locationName?.trim() || null
  const visaOppnaTur = pathname !== `/tur/${tripId}`

  async function dela() {
    const payload = delningsPayload(tripId, plats)
    setMenu(false)
    track('share_clicked', { surface: 'trip_menu', entity_id: tripId })
    if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
      try {
        await navigator.share({ title: payload.title, text: payload.text, url: payload.url })
        return
      } catch (err) {
        if ((err as Error)?.name === 'AbortError') return
      }
    }
    try {
      await navigator.clipboard.writeText(payload.url)
      toast('Länk kopierad')
    } catch {
      toast('Kunde inte kopiera', 'error')
    }
  }

  async function kopieraLank() {
    const payload = delningsPayload(tripId, plats)
    try {
      await navigator.clipboard.writeText(payload.url)
      toast('Länk kopierad!')
    } catch {
      toast('Kunde inte kopiera länken.', 'error')
    }
    setMenu(false)
  }

  function oppnaAnmalan() {
    skipFocusRestore.current = true
    setMenu(false)
    setReportOpen(true)
  }

  // ── Load current trip data into edit form ────────────────────────────────────
  async function openEdit() {
    setMenu(false)
    const supabase = createClient()
    const { data } = await supabase
      .from('trips')
      .select('caption, location_name, pinnar_rating, boat_type, visibility')
      .eq('id', tripId)
      .single()
    if (data) {
      const d = data as TripData
      setCaption(d.caption ?? '')
      setLocation(d.location_name ?? '')
      setPinnar(d.pinnar_rating)
      setBoatType(d.boat_type ?? '')
      setIsPrivate(d.visibility === 'private')
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
        visibility:    isPrivate ? 'private' : 'public',
      })
      .eq('id', tripId)
    setSaving(false)
    if (error) { toast('Kunde inte spara ändringar. Försök igen.', 'error'); return }
    toast('Turen uppdaterad')
    setEditing(false)
    // Töm tursidans datacache innan refresh — annars visar refresh den gamla
    // cachade versionen (se src/lib/trip-cache.ts).
    await revalidateTrip(tripId)
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
    await revalidateTrip(tripId)
    router.push('/feed')
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setMenu(true)}
        className="press-feedback"
        aria-label="Fler alternativ"
        aria-haspopup="dialog"
        aria-expanded={menu}
        aria-controls={menu ? 'tur-meny' : undefined}
        style={{
          width: 44, height: 44, borderRadius: '50%',
          background: 'var(--glass-88)',
          backdropFilter: 'blur(8px)',
          WebkitBackdropFilter: 'blur(8px)',
          border: '1px solid rgba(255,255,255,0.25)',
          cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 1px 6px rgba(0,20,35,0.15)',
          WebkitTapHighlightColor: 'transparent',
          flexShrink: 0,
        }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden style={{ width: 18, height: 18, color: 'var(--sea)' }}>
          <circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/>
        </svg>
      </button>

      {menu && !editing && !confirm && (
        <MenuLayer id="tur-meny" label="Alternativ för turen" onClose={closeMenu} skipFocusRestore={skipFocusRestore}>
          <Handle />
          {plats && (
            <p style={{ margin: '0 8px 8px', textAlign: 'center', fontSize: 13, fontWeight: 700, color: 'var(--txt3)' }}>
              {plats}
            </p>
          )}

          <MenuItem icon={<ShareGlyph />} label="Dela" onClick={() => { void dela() }} />
          <MenuItem icon={<Link2 size={18} />} label="Kopiera länk" onClick={() => { void kopieraLank() }} />
          {visaOppnaTur && (
            <MenuItem
              href={`/tur/${tripId}`}
              icon={<Icon name="arrowRight" size={18} />}
              label="Öppna tur"
              onClick={closeMenu}
            />
          )}
          {profilNamn && (
            <MenuItem
              href={`/u/${encodeURIComponent(profilNamn)}`}
              icon={<Icon name="user" size={18} />}
              label="Visa profil"
              onClick={closeMenu}
            />
          )}

          {isOwner && (
            <>
              <MenuItem icon={<Pencil size={18} />} label="Redigera tur" onClick={openEdit} />
              <MenuItem
                icon={<MapPin size={18} />}
                label="Exportera GPX"
                suffix={isProEnabled() && isProUser === false ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--txt3)" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ width: 15, height: 15, flexShrink: 0 }}>
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                ) : undefined}
                onClick={() => {
                  setMenu(false)
                  if (isProEnabled() && isProUser === false) {
                    track('paywall_hit', { feature: 'gpx_export' })
                    setPaywall(true)
                  } else {
                    window.location.href = `/api/gpx/${tripId}`
                  }
                }}
              />
              <MenuDivider />
              <MenuItem
                icon={<Trash2 size={18} />}
                label="Ta bort tur"
                danger
                onClick={() => { setMenu(false); setConfirm(true) }}
              />
            </>
          )}

          {isOther && (
            <>
              <MenuDivider />
              {blockKnown && (
                <BlockButton
                  menu
                  targetUserId={ownerId}
                  targetUsername={profilNamn ?? ''}
                  initialBlocked={blocked}
                />
              )}
              <MenuItem
                muted
                icon={<Flag size={18} />}
                label="Anmäl tur"
                onClick={oppnaAnmalan}
              />
            </>
          )}

          <button
            type="button"
            onClick={closeMenu}
            className="press-feedback"
            style={{
              width: '100%', minHeight: 48, marginTop: 8, padding: '13px', borderRadius: 14,
              background: 'rgba(10,123,140,0.07)', border: 'none',
              color: 'var(--txt2)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
            }}
          >
            Avbryt
          </button>
        </MenuLayer>
      )}

      {isOther && (
        <ReportButton
          targetType="trip"
          targetId={tripId}
          label="Anmäl tur"
          open={reportOpen}
          onOpenChange={setReportOpen}
        />
      )}

      {/* ── Edit sheet ── */}
      {editing && (
        <Backdrop onClick={() => !saving && setEditing(false)}>
          <Sheet label="Redigera tur" onClick={e => e.stopPropagation()}>
            <Handle />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 18px', textAlign: 'center' }}>
              Redigera tur
            </h3>

            {/* Location */}
            <label htmlFor="trip-edit-location" style={labelStyle}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <MapPin size={11} strokeWidth={2} /> Plats
              </span>
            </label>
            <input
              id="trip-edit-location"
              type="text"
              value={location}
              onChange={e => setLocation(e.target.value)}
              placeholder="t.ex. Sandhamn, Grinda…"
              maxLength={100}
              style={inputStyle}
            />

            {/* Caption */}
            <label htmlFor="trip-edit-caption" style={{ ...labelStyle, marginTop: 12 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                <MessageCircle size={11} strokeWidth={2} /> Berätta om turen
              </span>
            </label>
            <textarea
              id="trip-edit-caption"
              value={caption}
              onChange={e => setCaption(e.target.value)}
              placeholder="Vad hände? Vad var bäst?"
              maxLength={280}
              rows={3}
              style={{ ...inputStyle, resize: 'none', fontFamily: 'inherit' }}
            />
            <div style={{ fontSize: 10, color: 'var(--txt3)', textAlign: 'right', marginBottom: 12 }}>{caption.length}/280</div>

            {/* Pinnar */}
            <div role="group" aria-labelledby="trip-edit-pinnar-label">
              <span id="trip-edit-pinnar-label" style={labelStyle}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <IconAnchor size={11} strokeWidth={2} /> Hur var turen?
                </span>
              </span>
              <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {PINNAR.map(p => (
                <button
                  key={p.value}
                  type="button"
                  onClick={() => setPinnar(pinnar === p.value ? null : p.value)}
                  style={{
                    flex: 1, padding: '10px 4px', borderRadius: 12, border: 'none', cursor: 'pointer',
                    background: pinnar === p.value
                      ? p.value === 3 ? 'var(--grad-acc)' : 'var(--grad-sea)'
                      : 'rgba(10,123,140,0.07)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
                    transition: 'all 0.15s',
                  }}
                >
                  <span style={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                    {Array.from({ length: p.anchors }).map((_, i) => (
                      <IconAnchor
                        key={i}
                        size={13}
                        style={{ color: pinnar === p.value ? '#fff' : 'var(--sea)' }}
                      />
                    ))}
                  </span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: pinnar === p.value ? '#fff' : 'var(--txt3)' }}>{p.label}</span>
                </button>
              ))}
              </div>
            </div>

            {/* Boat type */}
            <div role="group" aria-labelledby="trip-edit-boat-type-label">
              <span id="trip-edit-boat-type-label" style={labelStyle}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                  <IconMotorboat size={11} strokeWidth={2} /> Båttyp
                </span>
              </span>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, marginBottom: 18 }}>
                {BOAT_TYPES.map(bt => (
                <button
                  key={bt}
                  type="button"
                  onClick={() => setBoatType(bt === boatType ? '' : bt)}
                  style={{
                    padding: '8px 4px', borderRadius: 10, border: 'none', cursor: 'pointer', fontSize: 11, fontWeight: 600,
                    background: boatType === bt ? 'var(--sea-knapp)' : 'rgba(10,123,140,0.07)',
                    color: boatType === bt ? '#fff' : 'var(--txt2)',
                  }}
                >
                  {bt}
                </button>
                ))}
              </div>
            </div>

            {/* Synlighet — samma växel som på /spara */}
            <button
              type="button"
              onClick={() => setIsPrivate(v => !v)}
              aria-pressed={isPrivate}
              className="press-feedback"
              style={{
                width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                gap: 12, padding: '12px 14px', cursor: 'pointer', textAlign: 'left', marginBottom: 18,
                background: 'var(--bg)', border: '1.5px solid rgba(10,123,140,0.15)', borderRadius: 14,
              }}
            >
              <span style={{ minWidth: 0 }}>
                <span style={{ display: 'block', fontSize: 14, fontWeight: 700, color: 'var(--txt)' }}>
                  {isPrivate ? 'Privat tur' : 'Synlig för alla'}
                </span>
                <span style={{ display: 'block', fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
                  {isPrivate
                    ? 'Bara du ser turen. Den visas inte i flödet eller på din profil för andra.'
                    : 'Turen visas i flödet och på din profil. Växla för att hålla den privat.'}
                </span>
              </span>
              <span
                aria-hidden="true"
                style={{
                  flexShrink: 0, width: 46, height: 26, borderRadius: 13, position: 'relative',
                  background: isPrivate ? 'var(--sea)' : 'rgba(10,123,140,0.18)',
                  transition: 'background 0.15s ease',
                }}
              >
                <span style={{
                  position: 'absolute', top: 3, left: isPrivate ? 23 : 3,
                  width: 20, height: 20, borderRadius: '50%', background: '#fff',
                  boxShadow: '0 1px 3px rgba(0,20,35,0.25)', transition: 'left 0.15s ease',
                }} />
              </span>
            </button>

            {/* Save */}
            <button
              onClick={handleSave}
              disabled={saving}
              className="press-feedback"
              style={{
                width: '100%', padding: '14px', borderRadius: 16, border: 'none',
                background: saving ? 'rgba(10,123,140,0.15)' : 'var(--grad-sea)',
                color: saving ? 'var(--txt3)' : '#fff', fontSize: 15, fontWeight: 600,
                cursor: saving ? 'default' : 'pointer', marginBottom: 10,
              }}
            >
              {saving ? 'Sparar…' : 'Spara ändringar'}
            </button>
            <button
              onClick={() => setEditing(false)}
              disabled={saving}
              className="press-feedback"
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

      {/* ── GPX Paywall sheet ── */}
      {paywall && (
        <Backdrop onClick={() => setPaywall(false)}>
          <Sheet label="Uppgradera till Pro" onClick={e => e.stopPropagation()}>
            <Handle />
            <div style={{ textAlign: 'center', padding: '8px 0 4px' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'rgba(30,92,130,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="var(--sea)" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" style={{ width: 26, height: 26 }}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 800, color: 'var(--txt)', margin: '0 0 8px' }}>
                GPX-export är Pro
              </h3>
              <p style={{ fontSize: 14, color: 'var(--txt2)', margin: '0 0 24px', lineHeight: 1.5 }}>
                Exportera dina turer som GPX-filer med Svalla Pro: kompatibelt med Navionics, Garmin och alla populära sjökortsappar.
              </p>
              <button
                onClick={() => { setPaywall(false); router.push('/pro') }}
                className="press-feedback"
                style={{
                  width: '100%', padding: '15px', borderRadius: 16, border: 'none',
                  background: 'var(--grad-sea)', color: '#fff',
                  fontSize: 15, fontWeight: 700, cursor: 'pointer', marginBottom: 10,
                }}
              >
                Uppgradera: 49 kr/mån
              </button>
              <button
                onClick={() => setPaywall(false)}
                className="press-feedback"
                style={{
                  width: '100%', padding: '13px', borderRadius: 16,
                  background: 'rgba(10,123,140,0.07)', border: 'none',
                  color: 'var(--txt2)', fontSize: 15, fontWeight: 700, cursor: 'pointer',
                }}
              >
                Stäng
              </button>
            </div>
          </Sheet>
        </Backdrop>
      )}

      {/* ── Delete confirmation ── */}
      {confirm && (
        <Backdrop onClick={() => !deleting && setConfirm(false)}>
          <Sheet label="Ta bort tur" onClick={e => e.stopPropagation()}>
            <Handle />
            <h3 style={{ fontSize: 17, fontWeight: 700, color: 'var(--txt)', margin: '0 0 8px', textAlign: 'center' }}>
              Ta bort tur?
            </h3>
            <p style={{ fontSize: 13, color: 'var(--txt3)', textAlign: 'center', margin: '0 0 24px', lineHeight: 1.5 }}>
              Turen försvinner från flödet och din profil direkt. Den raderas permanent om 30 dagar, kontakta oss innan dess om du ångrar dig.
            </p>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="press-feedback"
              style={{
                width: '100%', padding: '14px', borderRadius: 16, border: 'none',
                background: '#dc2626', color: '#fff', fontSize: 15, fontWeight: 600,
                cursor: deleting ? 'default' : 'pointer', opacity: deleting ? 0.7 : 1, marginBottom: 10,
              }}
            >
              {deleting ? 'Raderar…' : (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, justifyContent: 'center' }}>
                  <Trash2 size={15} /> Ja, ta bort
                </span>
              )}
            </button>
            <button
              onClick={() => setConfirm(false)}
              className="press-feedback"
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

function ShareGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  )
}

function MenuLayer({
  id, label, onClose, skipFocusRestore, children,
}: {
  id: string
  label: string
  onClose: () => void
  skipFocusRestore: MutableRefObject<boolean>
  children: ReactNode
}) {
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const panel = panelRef.current
    const previously = document.activeElement as HTMLElement | null
    const items = () =>
      panel ? [...panel.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]')] : []
    panel?.focus()

    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
        return
      }
      if (e.key !== 'Tab' || !panel) return
      const list = items()
      if (list.length === 0) return
      const first = list[0]!
      const last = list[list.length - 1]!
      const active = document.activeElement
      if (e.shiftKey && (active === first || !panel.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && active === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      if (skipFocusRestore.current) {
        skipFocusRestore.current = false
        return
      }
      previously?.focus?.()
    }
  }, [onClose, skipFocusRestore])

  if (typeof document === 'undefined') return null
  return createPortal(
    <div onClick={e => e.stopPropagation()}>
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 1000,
          background: 'rgba(0,20,35,0.5)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }}
      >
        <div
          ref={panelRef}
          id={id}
          role="dialog"
          aria-modal="true"
          aria-label={label}
          tabIndex={-1}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'var(--white)',
            outline: 'none',
            borderRadius: '24px 24px 0 0',
            padding: '14px 12px calc(14px + env(safe-area-inset-bottom, 0px))',
            width: '100%',
            maxWidth: 480,
            boxShadow: '0 -8px 40px rgba(0,20,35,0.18)',
            maxHeight: '88svh',
            overflowY: 'auto',
            boxSizing: 'border-box',
          }}
        >
          {children}
        </div>
      </div>
    </div>,
    document.body,
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

function Sheet({ onClick, children, label }: { onClick?: (e: MouseEvent<HTMLDivElement>) => void; children: ReactNode; label?: string }) {
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={label}
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

function MenuDivider() {
  return <div style={{ height: 1, background: 'rgba(10,123,140,0.10)', margin: '6px 10px' }} />
}

function MenuItem({
  icon, label, danger, muted, onClick, href, suffix,
}: {
  icon: ReactNode
  label: string
  danger?: boolean
  muted?: boolean
  onClick: () => void
  href?: string
  suffix?: ReactNode
}) {
  const style: CSSProperties = {
    width: '100%', minHeight: 48, padding: '8px 10px', borderRadius: 14, border: 'none',
    background: 'none', cursor: 'pointer',
    display: 'flex', alignItems: 'center', gap: 12, textAlign: 'left',
    textDecoration: 'none', font: 'inherit',
    color: danger ? '#dc2626' : 'var(--txt)',
  }
  const inner = (
    <>
      <span aria-hidden style={{
        width: 36, height: 36, borderRadius: 12, flexShrink: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: danger ? 'rgba(220,38,38,0.08)' : muted ? 'rgba(10,123,140,0.05)' : 'rgba(10,123,140,0.08)',
        color: danger ? '#dc2626' : muted ? 'var(--txt3)' : 'var(--sea)',
      }}>
        {icon}
      </span>
      <span style={{ fontSize: 15, fontWeight: muted || danger ? 600 : 700, flex: 1, color: danger ? '#dc2626' : 'var(--txt)' }}>{label}</span>
      {suffix}
    </>
  )
  if (href) {
    return (
      <Link href={href} onClick={onClick} className="press-feedback" style={style}>
        {inner}
      </Link>
    )
  }
  return (
    <button type="button" onClick={onClick} className="press-feedback" style={style}>
      {inner}
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

'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase'
import { listUpcomingEvents, createEvent, formatEventDate, type EventRow } from '@/lib/events'

export default function EventPage() {
  const supabase = useRef(createClient()).current
  const router = useRouter()
  const [me, setMe] = useState<string | null>(null)
  const [events, setEvents] = useState<EventRow[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setMe(user.id)
      load(user?.id ?? null)
    })
  }, [supabase])

  async function load(userId: string | null) {
    setLoading(true)
    const rows = await listUpcomingEvents(supabase, { userId, limit: 30 })
    setEvents(rows)
    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', paddingBottom: 100 }}>
      <header style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'var(--header-bg, var(--glass-96))',
        backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(10,123,140,0.10)',
        padding: '14px 16px',
      }}>
        <div style={{ maxWidth: 520, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Link href="/feed" aria-label="Tillbaka" style={{
            width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
            background: 'rgba(10,123,140,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="#1e5c82" strokeWidth={2.5} style={{ width: 17, height: 17 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </Link>
          <h1 style={{ flex: 1, fontSize: 18, fontWeight: 800, color: 'var(--txt)', margin: 0 }}>Events</h1>
          <button onClick={() => me ? setShowCreate(true) : router.push('/logga-in')}
            aria-label="Skapa event"
            style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0, border: 'none',
              background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer',
            }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} style={{ width: 18, height: 18 }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v14M5 12h14" />
            </svg>
          </button>
        </div>
      </header>

      <div style={{ maxWidth: 520, margin: '0 auto', padding: 16 }}>
        {loading && (
          <div style={{ padding: 40, textAlign: 'center' }}>
            <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2.5px solid #1e5c82', borderTopColor: 'transparent', animation: 'spin .7s linear infinite', display: 'inline-block' }} />
          </div>
        )}

        {!loading && events.length === 0 && (
          <div style={{ padding: '60px 20px', textAlign: 'center' }}>
            <div style={{ fontSize: 48, marginBottom: 10 }}>⛵</div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: '#1e5c82', marginBottom: 6 }}>Inga kommande events</h2>
            <p style={{ fontSize: 13, color: 'var(--txt3)', marginBottom: 18, lineHeight: 1.5 }}>
              Regattor, gemensamma seglingar, krogbesök. Bli först att bjuda in.
            </p>
            {me && (
              <button onClick={() => setShowCreate(true)}
                style={{ padding: '10px 22px', borderRadius: 14, background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 700, fontSize: 13, border: 'none', cursor: 'pointer' }}>
                Skapa event
              </button>
            )}
          </div>
        )}

        {!loading && events.map(ev => (
          <Link key={ev.id} href={`/event/${ev.slug ?? ev.id}`} style={{ textDecoration: 'none' }}>
            <div style={{
              display: 'flex', gap: 12,
              padding: 14, borderRadius: 16,
              background: 'var(--white)',
              border: '1px solid rgba(10,123,140,0.08)',
              marginBottom: 10,
            }}>
              <div style={{
                width: 64, flexShrink: 0, borderRadius: 12,
                background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)',
                color: '#fff', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', padding: '8px 4px',
              }}>
                <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.85, textTransform: 'uppercase' }}>
                  {new Date(ev.starts_at).toLocaleString('sv-SE', { month: 'short' })}
                </div>
                <div style={{ fontSize: 22, fontWeight: 800, lineHeight: 1 }}>
                  {new Date(ev.starts_at).getDate()}
                </div>
                <div style={{ fontSize: 10, fontWeight: 700, opacity: 0.85, marginTop: 2 }}>
                  {new Date(ev.starts_at).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--txt)',
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {ev.title}
                </div>
                {ev.location_name && (
                  <div style={{ fontSize: 12, color: 'var(--txt3)', marginTop: 2 }}>
                    📍 {ev.location_name}
                  </div>
                )}
                <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 11, color: 'var(--txt3)', flexWrap: 'wrap' }}>
                  <span>✓ {ev.going_count ?? 0} går</span>
                  {(ev.maybe_count ?? 0) > 0 && <span>? {ev.maybe_count} kanske</span>}
                  {ev.club_name && <span>· {ev.club_name}</span>}
                </div>
                {ev.my_status && (
                  <div style={{ display: 'inline-block', marginTop: 6, padding: '2px 8px', borderRadius: 8, background: ev.my_status === 'going' ? 'rgba(34,140,56,0.12)' : 'rgba(201,110,42,0.12)', color: ev.my_status === 'going' ? '#228c38' : '#c96e2a', fontSize: 10, fontWeight: 800 }}>
                    {ev.my_status === 'going' ? 'DU GÅR' : ev.my_status === 'maybe' ? 'KANSKE' : 'AVSTÅTT'}
                  </div>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {showCreate && me && (
        <CreateEventModal
          onClose={() => setShowCreate(false)}
          onCreated={(slug) => { setShowCreate(false); router.push(`/event/${slug}`) }}
          supabase={supabase}
          userId={me}
        />
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  )
}

function CreateEventModal({
  onClose, onCreated, supabase, userId,
}: {
  onClose: () => void
  onCreated: (slug: string) => void
  supabase: ReturnType<typeof createClient>
  userId: string
}) {
  const [title, setTitle] = useState('')
  const [location, setLocation] = useState('')
  const [startsAt, setStartsAt] = useState('')
  const [endsAt, setEndsAt] = useState('')
  const [description, setDescription] = useState('')
  const [busy, setBusy] = useState(false)
  const [err, setErr] = useState<string | null>(null)

  async function submit() {
    if (title.trim().length < 2) { setErr('Titel saknas.'); return }
    if (!startsAt) { setErr('Starttid saknas.'); return }
    setBusy(true); setErr(null)
    const res = await createEvent(supabase, userId, {
      title: title.trim(),
      description: description.trim() || null,
      starts_at: new Date(startsAt).toISOString(),
      ends_at: endsAt ? new Date(endsAt).toISOString() : null,
      location_name: location.trim() || null,
    })
    setBusy(false)
    if (!res) { setErr('Kunde inte skapa event. Försök igen.'); return }
    onCreated(res.slug ?? res.id)
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', maxWidth: 520, background: 'var(--white)',
        borderRadius: '20px 20px 0 0', padding: 20, paddingBottom: 30,
        maxHeight: '90vh', overflowY: 'auto',
      }}>
        <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 16px' }} />
        <h2 style={{ fontSize: 18, fontWeight: 800, color: 'var(--txt)', margin: '0 0 14px' }}>Skapa event</h2>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Titel</label>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="T.ex. Sandhamnsregatta 2026" maxLength={80}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 12, background: 'var(--bg)', color: 'var(--txt)' }} />

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Plats</label>
        <input value={location} onChange={e => setLocation(e.target.value)} placeholder="T.ex. Sandhamn KSSS" maxLength={80}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 12, background: 'var(--bg)', color: 'var(--txt)' }} />

        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Starttid</label>
            <input type="datetime-local" value={startsAt} onChange={e => setStartsAt(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 13, background: 'var(--bg)', color: 'var(--txt)' }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Sluttid (valfritt)</label>
            <input type="datetime-local" value={endsAt} onChange={e => setEndsAt(e.target.value)}
              style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 13, background: 'var(--bg)', color: 'var(--txt)' }} />
          </div>
        </div>

        <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', marginBottom: 4 }}>Beskrivning</label>
        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Vad händer? Samling? Anmälan?" maxLength={500} rows={3}
          style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, marginBottom: 12, background: 'var(--bg)', color: 'var(--txt)', resize: 'vertical', fontFamily: 'inherit' }} />

        {err && <div style={{ color: '#c03', fontSize: 12, marginBottom: 10 }}>{err}</div>}

        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={onClose} disabled={busy}
            style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
            Avbryt
          </button>
          <button onClick={submit} disabled={busy}
            style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'linear-gradient(135deg,#1e5c82,#2d7d8a)', color: '#fff', fontWeight: 800, fontSize: 14, cursor: busy ? 'wait' : 'pointer', opacity: busy ? 0.6 : 1 }}>
            {busy ? 'Skapar…' : 'Skapa event'}
          </button>
        </div>
      </div>
    </div>
  )
}

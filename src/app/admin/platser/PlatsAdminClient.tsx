'use client'
import { useState } from 'react'
import { createClient } from '@/lib/supabase'

type PlatsRow = {
  id: string
  name: string
  island?: string | null
  type?: string | null
  opening_hours?: string | null
  contact_phone?: string | null
  website?: string | null
  booking_url?: string | null
}

type EditState = {
  contact_phone: string
  website: string
  booking_url: string
}

export default function PlatsAdminClient({ restaurants }: { restaurants: PlatsRow[] }) {
  const [editing, setEditing] = useState<string | null>(null)
  const [form, setForm] = useState<EditState>({ contact_phone: '', website: '', booking_url: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState<string | null>(null)
  const [q, setQ] = useState('')

  const filtered = restaurants.filter(r =>
    !q || r.name.toLowerCase().includes(q.toLowerCase()) || (r.island ?? '').toLowerCase().includes(q.toLowerCase())
  )

  function startEdit(r: PlatsRow) {
    setEditing(r.id)
    setForm({
      contact_phone: r.contact_phone ?? '',
      website: r.website ?? '',
      booking_url: r.booking_url ?? '',
    })
    setSaved(null)
  }

  async function handleSave(id: string) {
    setSaving(true)
    const supabase = createClient()
    await supabase.from('restaurants').update({
      contact_phone: form.contact_phone.trim() || null,
      website:       form.website.trim() || null,
      booking_url:   form.booking_url.trim() || null,
    }).eq('id', id)
    setSaving(false)
    setSaved(id)
    setEditing(null)
    // Update local state so the row reflects new values without reload
    const idx = restaurants.findIndex(r => r.id === id)
    if (idx !== -1) {
      restaurants[idx].contact_phone = form.contact_phone.trim() || null
      restaurants[idx].website = form.website.trim() || null
      restaurants[idx].booking_url = form.booking_url.trim() || null
    }
  }

  return (
    <div>
      {/* Search */}
      <input
        value={q}
        onChange={e => setQ(e.target.value)}
        placeholder="Sök plats eller ö…"
        style={{
          width: '100%', padding: '12px 14px', borderRadius: 14,
          border: '1.5px solid rgba(10,123,140,0.18)', background: 'var(--white)',
          fontSize: 14, color: 'var(--txt)', outline: 'none', marginBottom: 16,
          boxSizing: 'border-box',
        }}
      />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {filtered.map(r => (
          <div key={r.id} style={{
            background: 'var(--white)', borderRadius: 16, padding: '14px 16px',
            boxShadow: '0 2px 10px rgba(0,45,60,0.06)',
            border: saved === r.id ? '1.5px solid var(--sea)' : '1px solid rgba(10,123,140,0.09)',
            transition: 'border 0.2s',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, marginBottom: editing === r.id ? 12 : 0 }}>
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--txt)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {r.name}
                </div>
                <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 1 }}>
                  {[r.island, r.type].filter(Boolean).join(' · ')}
                  {r.booking_url && <span style={{ marginLeft: 6, color: 'var(--sea)', fontWeight: 600 }}>✓ Bokning</span>}
                  {r.contact_phone && <span style={{ marginLeft: 6, color: 'var(--txt2)' }}>✓ Tel</span>}
                </div>
              </div>
              <button
                onClick={() => editing === r.id ? setEditing(null) : startEdit(r)}
                style={{
                  flexShrink: 0, padding: '6px 14px', borderRadius: 10, border: 'none',
                  background: editing === r.id ? 'rgba(10,123,140,0.08)' : 'var(--grad-sea)',
                  color: editing === r.id ? 'var(--sea)' : '#fff',
                  fontSize: 12, fontWeight: 600, cursor: 'pointer',
                }}
              >
                {editing === r.id ? 'Avbryt' : 'Redigera'}
              </button>
            </div>

            {editing === r.id && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Telefon
                  <input
                    value={form.contact_phone}
                    onChange={e => setForm(f => ({ ...f, contact_phone: e.target.value }))}
                    placeholder="+46 8 123 45 67"
                    style={inputStyle}
                  />
                </label>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Hemsida
                  <input
                    value={form.website}
                    onChange={e => setForm(f => ({ ...f, website: e.target.value }))}
                    placeholder="https://restaurangen.se"
                    style={inputStyle}
                  />
                </label>
                <label style={{ fontSize: 11, fontWeight: 600, color: 'var(--txt3)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  Bokningslänk
                  <input
                    value={form.booking_url}
                    onChange={e => setForm(f => ({ ...f, booking_url: e.target.value }))}
                    placeholder="https://bokabord.se/restaurangen"
                    style={inputStyle}
                  />
                </label>
                <button
                  onClick={() => handleSave(r.id)}
                  disabled={saving}
                  style={{
                    padding: '12px', borderRadius: 12, border: 'none',
                    background: saving ? 'var(--txt3)' : 'var(--grad-sea)',
                    color: '#fff', fontSize: 14, fontWeight: 600,
                    cursor: saving ? 'not-allowed' : 'pointer',
                    marginTop: 4,
                  }}
                >
                  {saving ? 'Sparar…' : 'Spara'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  display: 'block', width: '100%', marginTop: 5,
  padding: '10px 12px', borderRadius: 10,
  border: '1.5px solid rgba(10,123,140,0.18)',
  background: 'var(--bg)', fontSize: 13,
  color: 'var(--txt)', outline: 'none',
  boxSizing: 'border-box',
}

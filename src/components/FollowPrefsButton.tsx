'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient } from '@/lib/supabase'
import { getFollowPref, upsertFollowPref, type FollowPref } from '@/lib/followPrefs'

export default function FollowPrefsButton({
  followingId,
  followingUsername,
}: {
  followingId: string
  followingUsername: string
}) {
  const supabase = useRef(createClient()).current
  const [me, setMe] = useState<string | null>(null)
  const [pref, setPref] = useState<FollowPref | null>(null)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // local-form-state
  const [notifyAny, setNotifyAny] = useState(true)
  const [onlyMagic, setOnlyMagic] = useState(false)
  const [minDistance, setMinDistance] = useState<string>('')

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) { setLoading(false); return }
      setMe(user.id)
      const p = await getFollowPref(supabase, user.id, followingId)
      setPref(p)
      if (p) {
        setNotifyAny(p.notify_any)
        setOnlyMagic(p.only_magic)
        setMinDistance(p.min_distance != null ? String(p.min_distance) : '')
      }
      setLoading(false)
    })
  }, [supabase, followingId])

  if (!me || loading || me === followingId) return null

  async function save() {
    if (!me) return
    setSaving(true)
    const minD = minDistance.trim() === '' ? null : Math.max(0, Number(minDistance))
    const ok = await upsertFollowPref(supabase, me, followingId, {
      notify_any: notifyAny,
      only_magic: onlyMagic,
      min_distance: minD,
    })
    setSaving(false)
    if (ok) {
      setPref({
        follower_id: me, following_id: followingId,
        notify_any: notifyAny, only_magic: onlyMagic, min_distance: minD,
        updated_at: new Date().toISOString(),
      })
      setOpen(false)
    }
  }

  const customized = pref && (!pref.notify_any || pref.only_magic || pref.min_distance != null)

  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Notis-inställningar"
        title="Notiser från denna seglare"
        style={{
          padding: '6px 10px', borderRadius: 10,
          border: '1px solid rgba(10,123,140,0.20)',
          background: customized ? 'rgba(201,110,42,0.10)' : 'var(--white)',
          fontSize: 12, fontWeight: 700,
          color: customized ? '#c96e2a' : 'var(--txt2)',
          cursor: 'pointer',
          display: 'inline-flex', alignItems: 'center', gap: 4,
        }}>
        🔔 {customized ? 'Justerad' : 'Notiser'}
      </button>

      {open && (
        <div style={{
          position: 'fixed', inset: 0, zIndex: 100,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
        }} onClick={() => setOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            width: '100%', maxWidth: 520, background: 'var(--white)',
            borderRadius: '20px 20px 0 0', padding: 20, paddingBottom: 30,
          }}>
            <div style={{ width: 40, height: 4, background: 'rgba(10,123,140,0.20)', borderRadius: 2, margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: 18, fontWeight: 600, color: 'var(--txt)', margin: '0 0 4px' }}>
              Notiser från @{followingUsername}
            </h2>
            <p style={{ fontSize: 12, color: 'var(--txt3)', margin: '0 0 18px' }}>
              Filtrera vilka push-notiser du får när denna seglare loggar en tur.
            </p>

            <Toggle label="Push-notiser på" sub="Stäng av helt om du vill vara tyst"
              value={notifyAny} onChange={setNotifyAny} />

            <Toggle label="Bara magiska turer" sub="Bara ⚓⚓⚓ (pinnar=3)"
              value={onlyMagic} onChange={setOnlyMagic} disabled={!notifyAny} />

            <div style={{ padding: '12px 0', borderTop: '1px solid rgba(10,123,140,0.08)', opacity: notifyAny ? 1 : 0.4 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)', marginBottom: 2 }}>Min distans (NM)</div>
              <div style={{ fontSize: 11, color: 'var(--txt3)', marginBottom: 8 }}>Hoppa över korta turer. Tom = alla längder.</div>
              <input type="number" step="0.5" min="0" value={minDistance} onChange={e => setMinDistance(e.target.value)}
                disabled={!notifyAny}
                placeholder="ex. 5"
                style={{ width: '100%', padding: 10, borderRadius: 10, border: '1px solid rgba(10,123,140,0.20)', fontSize: 14, background: 'var(--bg)', color: 'var(--txt)' }} />
            </div>

            <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
              <button onClick={() => setOpen(false)} disabled={saving}
                style={{ flex: 1, padding: 12, borderRadius: 12, border: '1px solid rgba(10,123,140,0.20)', background: 'transparent', fontWeight: 700, fontSize: 14, color: 'var(--txt)', cursor: 'pointer' }}>
                Avbryt
              </button>
              <button onClick={save} disabled={saving}
                style={{ flex: 2, padding: 12, borderRadius: 12, border: 'none', background: 'var(--grad-sea)', color: '#fff', fontWeight: 600, fontSize: 14, cursor: saving ? 'wait' : 'pointer', opacity: saving ? 0.6 : 1 }}>
                {saving ? 'Sparar…' : 'Spara'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

function Toggle({ label, sub, value, onChange, disabled }: {
  label: string; sub?: string; value: boolean; onChange: (v: boolean) => void; disabled?: boolean
}) {
  return (
    <div style={{ padding: '12px 0', borderTop: '1px solid rgba(10,123,140,0.08)', opacity: disabled ? 0.4 : 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--txt)' }}>{label}</div>
          {sub && <div style={{ fontSize: 11, color: 'var(--txt3)', marginTop: 2 }}>{sub}</div>}
        </div>
        <button onClick={() => !disabled && onChange(!value)} disabled={disabled}
          style={{
            width: 44, height: 26, borderRadius: 13, border: 'none',
            background: value ? 'var(--sea)' : 'rgba(10,123,140,0.20)',
            position: 'relative', cursor: disabled ? 'not-allowed' : 'pointer',
            transition: 'background 0.15s',
          }}>
          <div style={{
            position: 'absolute', top: 3, left: value ? 21 : 3,
            width: 20, height: 20, borderRadius: '50%', background: '#fff',
            transition: 'left 0.15s',
            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
          }} />
        </button>
      </div>
    </div>
  )
}

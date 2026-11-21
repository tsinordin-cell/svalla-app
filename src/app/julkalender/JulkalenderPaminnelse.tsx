'use client'
import { useEffect, useState } from 'react'
import { createClient, getViewer } from '@/lib/supabase'

/**
 * "Mejla mig när en ny lucka öppnas" (2026-11-21).
 *
 * Rutan är samtycket: ikryssad = en rad i julkalender_paminnelser, och bara
 * då skickas påminnelsen (marknadsföringslagen 19 §). Inget är ikryssat från
 * början. Kontot kan själv läsa, lägga till och ta bort sin rad.
 */
export default function JulkalenderPaminnelse() {
  const [pa, setPa] = useState<boolean | null>(null)
  const [sparar, setSparar] = useState(false)
  const [fel, setFel] = useState('')

  useEffect(() => {
    let avbruten = false
    ;(async () => {
      const supabase = createClient()
      const { data: { user } } = await getViewer(supabase)
      if (!user) return
      const { data, error } = await supabase
        .from('julkalender_paminnelser').select('user_id').eq('user_id', user.id).maybeSingle()
      if (!avbruten) setPa(error ? false : !!data)
    })()
    return () => { avbruten = true }
  }, [])

  async function vaxla(ny: boolean) {
    setFel('')
    setSparar(true)
    const supabase = createClient()
    const { data: { user } } = await getViewer(supabase)
    if (!user) { setSparar(false); return }
    const { error } = ny
      ? await supabase.from('julkalender_paminnelser').insert({ user_id: user.id })
      : await supabase.from('julkalender_paminnelser').delete().eq('user_id', user.id)
    // En dubbel insert (redan påslagen i en annan flik) räknas som lyckad.
    if (error && !(ny && error.code === '23505')) setFel('Det gick inte att spara. Försök igen.')
    else setPa(ny)
    setSparar(false)
  }

  if (pa === null) return null
  return (
    <div className="jk-kort">
      <label htmlFor="jk-paminnelse" style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: sparar ? 'default' : 'pointer', minHeight: 44 }}>
        <input
          id="jk-paminnelse"
          type="checkbox"
          checked={pa}
          disabled={sparar}
          onChange={e => vaxla(e.target.checked)}
          style={{ width: 22, height: 22, marginTop: 2, flexShrink: 0, accentColor: '#c0392b' }}
        />
        <span style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>
          Mejla mig när en ny lucka öppnas
          <span style={{ display: 'block', fontSize: 13, fontWeight: 400, color: 'var(--ink-muted)', lineHeight: 1.5, marginTop: 2 }}>
            Ett kort mejl kl 10 varje dag 1 till 24 december, till e-postadressen på ditt konto. Du stänger av det här, eller via länken i mejlet.
          </span>
        </span>
      </label>
      {fel && <div role="alert" style={{ marginTop: 8, fontSize: 13, fontWeight: 600, color: '#c0392b' }}>{fel}</div>}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import Icon from '@/components/Icon'
import { normalisera } from './oar-sok'

/**
 * Snabbfilter för listan "Alla öar" på /oar (kort 2ccd3cd5, 2026-09-29).
 *
 * Listan är serverrenderad (103 kort, sexton skärmar i telefonbredd) och ska
 * förbli det: den är sidans SEO-innehåll och måste fungera utan JavaScript.
 * Den här komponenten lägger bara ett filter ovanpå: varje kort bär
 * data-o-kort + data-sok (namn, region och tagline i gemener) och varje
 * regiongrupp data-region-grupp. Vid inmatning döljs kort som inte matchar
 * (klassen .oar-dold) och regiongrupper som blivit tomma. Ingen data dubbleras till klienten och
 * utan JS syns allt precis som förut.
 */
export default function OarSnabbfilter({ total }: { total: number }) {
  const [q, setQ] = useState('')
  const [visade, setVisade] = useState(total)

  useEffect(() => {
    const needle = normalisera(q)
    const kort = document.querySelectorAll<HTMLElement>('[data-o-kort]')
    let n = 0
    kort.forEach(k => {
      const traff = needle === '' || (k.dataset.sok ?? '').includes(needle)
      // Klass i stället för hidden-attributet: korten har display:flex inline,
      // vilket slår UA-regeln [hidden]{display:none}. Regeln nedan har !important.
      k.classList.toggle('oar-dold', !traff)
      if (traff) n++
    })
    document.querySelectorAll<HTMLElement>('[data-region-grupp]').forEach(g => {
      const kvar = g.querySelectorAll('[data-o-kort]:not(.oar-dold)').length
      g.classList.toggle('oar-dold', kvar === 0)
    })
    setVisade(n)
  }, [q])

  return (
    <div style={{ marginBottom: 20 }}>
      <style>{'.oar-dold{display:none!important}'}</style>
      <label htmlFor="oar-sok" style={{ display: 'block', fontSize: 12, fontWeight: 700, color: 'var(--txt2)', textTransform: 'uppercase', letterSpacing: 0.6, marginBottom: 6 }}>
        Hitta en ö
      </label>
      <div style={{ position: 'relative', maxWidth: 420 }}>
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--txt2)', display: 'inline-flex' }} aria-hidden>
          <Icon name="compass" size={16} stroke={1.85} />
        </span>
        <input
          id="oar-sok"
          type="text"
          enterKeyHint="search"
          value={q}
          onChange={e => setQ(e.target.value)}
          placeholder="Skriv öns namn, t.ex. Grinda eller Marstrand"
          autoComplete="off"
          style={{
            width: '100%', boxSizing: 'border-box',
            padding: '11px 38px 11px 38px',
            borderRadius: 999,
            border: '1px solid var(--surface-3)',
            background: 'var(--white)',
            color: 'var(--txt)', fontSize: 15,
          }}
        />
        {q !== '' && (
          <button
            type="button"
            onClick={() => setQ('')}
            aria-label="Rensa sökningen"
            style={{
              position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
              border: 0, background: 'transparent', color: 'var(--txt2)', cursor: 'pointer',
              display: 'inline-flex', padding: 4,
            }}
          >
            <Icon name="x" size={16} stroke={2} />
          </button>
        )}
      </div>
      <p aria-live="polite" style={{ fontSize: 13, color: 'var(--txt2)', margin: '8px 0 0' }}>
        {q === ''
          ? `${total} öar — eller hoppa direkt till en region nedan.`
          : visade === 0
            ? `Ingen ö matchar "${q}". Prova ett kortare ord eller bläddra per region.`
            : `${visade} av ${total} öar matchar.`}
      </p>
    </div>
  )
}

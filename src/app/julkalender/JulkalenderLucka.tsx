'use client'
import { useCallback } from 'react'
import type { Lucka } from '@/lib/julkalender'
import { track } from '@/lib/analytics-events'

const NYCKEL = 'svalla_julkalender_oppnade'

/** Läser vilka luckor som öppnats på den här enheten (sparas bara lokalt). */
export function lasOppnade(): number[] {
  try { return JSON.parse(localStorage.getItem(NYCKEL) || '[]') as number[] } catch { return [] }
}

function markeraOppnad(dag: number) {
  try {
    const set = new Set(lasOppnade()); set.add(dag)
    localStorage.setItem(NYCKEL, JSON.stringify([...set]))
    window.dispatchEvent(new Event('julkalender-oppnad'))
  } catch { /* privat läge m.m. */ }
}

/** Dela-knapp: delningsmenyn på mobil, annars kopieras länken. */
export function DelaLucka({ dag, titel }: { dag: number; titel: string }) {
  const dela = useCallback(async () => {
    const url = `https://svalla.se/julkalender/${dag}`
    track('julkalender_delad', { dag })
    try {
      if (navigator.share) { await navigator.share({ title: `Svallas julkalender, lucka ${dag}: ${titel}`, url }); return }
      await navigator.clipboard.writeText(url)
      alert('Länken är kopierad')
    } catch { /* avbrutet */ }
  }, [dag, titel])
  return (
    <button type="button" onClick={dela} style={{ alignSelf: 'flex-start', marginTop: 6, background: 'none', border: '1px solid var(--surface-3)', borderRadius: 50, padding: '6px 12px', fontSize: 13, fontWeight: 600, color: 'var(--sea)', cursor: 'pointer' }}>
      Dela luckan
    </button>
  )
}

/** En öppningsbar lucka med text, länk och klickbara källor. Mäter när den öppnas. */
export default function JulkalenderLucka({ lucka, idag, stil, nummerFarg }: {
  lucka: Lucka; idag: boolean; stil: React.CSSProperties; nummerFarg: string
}) {
  const unika = lucka.kallor.filter((k, i, a) => a.findIndex(x => x.url === k.url) === i)
  return (
    <details
      className="julLucka"
      open={idag}
      onToggle={e => {
        if ((e.currentTarget as HTMLDetailsElement).open) {
          markeraOppnad(lucka.dag)
          track('julkalender_lucka_oppnad', { dag: lucka.dag })
        }
      }}
      style={stil}
    >
      <summary style={{ listStyle: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 6 }}>
        <div style={{ fontSize: 26, fontWeight: 800, color: nummerFarg, lineHeight: 1 }}>{lucka.dag}</div>
        <div style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)' }}>{lucka.titel}</div>
        {lucka.reklam && <span style={{ alignSelf: 'flex-start', fontSize: 11, fontWeight: 700, background: '#fff3e6', color: '#a8501a', borderRadius: 6, padding: '2px 7px' }}>REKLAM</span>}
      </summary>
      <p style={{ fontSize: 14, color: 'var(--ink-muted)', lineHeight: 1.65, margin: '6px 0 0' }}>{lucka.text}</p>
      {lucka.lank && (
        <a href={lucka.lank} {...(lucka.lank.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})} style={{ fontSize: 14, fontWeight: 700, color: 'var(--sea)', textDecoration: 'none', marginTop: 4 }}>
          {lucka.lankText ?? 'Läs mer'} →
        </a>
      )}
      {unika.length > 0 && (
        <div style={{ fontSize: 12, color: 'var(--ink-muted)', marginTop: 6, lineHeight: 1.6 }}>
          {unika.length === 1 ? 'Källa: ' : 'Källor: '}
          {unika.map((k, i) => (
            <span key={k.url}>
              {i > 0 && ', '}
              <a href={k.url} target="_blank" rel="noopener noreferrer" style={{ color: 'var(--sea)' }}>{k.namn}</a>
            </span>
          ))}
          {' '}(kontrollerad {unika[0]?.last})
        </div>
      )}
      <DelaLucka dag={lucka.dag} titel={lucka.titel} />
      <style>{`.julLucka[open]{grid-column:1 / -1}.julLucka[open] p{font-size:15px;max-width:620px}`}</style>
    </details>
  )
}

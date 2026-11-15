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
    <button type="button" onClick={dela} className="jk-dela">
      Dela luckan
    </button>
  )
}

/** En öppningsbar lucka med text, länk och klickbara källor. Mäter när den öppnas. */
export default function JulkalenderLucka({ lucka, idag, klass, ton, topp }: {
  lucka: Lucka; idag: boolean; klass: string; ton: string; topp: React.ReactNode
}) {
  const unika = lucka.kallor.filter((k, i, a) => a.findIndex(x => x.url === k.url) === i)
  return (
    <details
      className={klass}
      data-ton={ton}
      open={idag}
      onToggle={e => {
        if ((e.currentTarget as HTMLDetailsElement).open) {
          markeraOppnad(lucka.dag)
          track('julkalender_lucka_oppnad', { dag: lucka.dag })
        }
      }}
    >
      <summary>
        {topp}
        <div className="jk-titel">{lucka.titel}</div>
        {lucka.reklam && <span className="jk-reklam">REKLAM</span>}
      </summary>
      <p className="jk-text">{lucka.text}</p>
      {lucka.lank && (
        <a href={lucka.lank} className="jk-lank" {...(lucka.lank.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
          {lucka.lankText ?? 'Läs mer'} →
        </a>
      )}
      {unika.length > 0 && (
        <div className="jk-kallor">
          {unika.length === 1 ? 'Källa: ' : 'Källor: '}
          {unika.map((k, i) => (
            <span key={k.url}>
              {i > 0 && ', '}
              <a href={k.url} target="_blank" rel="noopener noreferrer">{k.namn}</a>
            </span>
          ))}
          {' '}(kontrollerad {unika[0]?.last})
        </div>
      )}
      <DelaLucka dag={lucka.dag} titel={lucka.titel} />
    </details>
  )
}

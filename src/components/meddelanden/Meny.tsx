'use client'

/**
 * Meddelandemenyn vid långt tryck (eller högerklick / knappen bredvid på dator).
 *
 * Meddelandet lyfts fram över en suddig bakgrund, med en rad reaktioner
 * ovanför och valen Svara, Kopiera och Radera (egna) eller Anmäl (andras)
 * under. Reaktioner och svar visas bara när databasen har stöd för dem.
 */

import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from 'react'
import { Ikon, IKON } from './Delar'

/**
 * Samma fasta lista som databasregeln (message_reactions_emoji_check).
 * Undantag från regeln mot emoji i src/: reaktionerna är innehåll som
 * användarna väljer, inte ikoner i gränssnittet, och ska se ut som i
 * telefonens egna meddelandeappar. All annan grafik i menyn är SVG.
 */
// eslint-disable-next-line no-restricted-syntax
export const REAKTIONER = ['❤️', '👍', '😂', '😮', '🙌', '⛵'] as const
export type ReaktionsEmoji = (typeof REAKTIONER)[number]

export type Reaktion = { id: string; message_id: string; user_id: string; emoji: string }

const KANT = 12

export function MeddelandeMeny({
  rect, mine, innehall, reaktioner, minReaktion, onReagera, onSvara, onKopiera, onRadera, onAnmal, onStang,
}: {
  rect: { top: number; left: number; right: number; height: number }
  mine: boolean
  innehall: ReactNode
  /** false när databasen saknar reaktioner (eller samtalet inte tillåter dem) */
  reaktioner: boolean
  minReaktion: string | null
  onReagera: (emoji: string) => void
  onSvara?: () => void
  onKopiera?: () => void
  onRadera?: () => void
  onAnmal?: () => void
  onStang: () => void
}) {
  const stack = useRef<HTMLDivElement>(null)
  const forsta = useRef<HTMLButtonElement>(null)
  const [top, setTop] = useState<number | null>(null)
  const [kortHojd, setKortHojd] = useState<number | null>(null)

  // Placera stapeln där meddelandet låg, men inom skärmen.
  useLayoutEffect(() => {
    const el = stack.current
    if (!el) return
    const vh = window.innerHeight
    const lyft = el.querySelector<HTMLElement>('.md-meny-lyft')
    const emoji = el.querySelector<HTMLElement>('.md-meny-emoji')
    const emojiH = emoji ? emoji.offsetHeight + 10 : 0
    const ovrigt = el.offsetHeight - (lyft?.offsetHeight ?? 0)
    // Långa meddelanden och bilder kortas så att valen alltid syns.
    const maxLyft = Math.max(80, vh - KANT * 2 - ovrigt)
    const lyftH = Math.min(lyft?.offsetHeight ?? 0, maxLyft)
    if (lyft && (lyft.offsetHeight > maxLyft)) setKortHojd(maxLyft)
    const total = ovrigt + lyftH
    const onskat = rect.top - emojiH
    setTop(Math.max(KANT, Math.min(onskat, vh - KANT - total)))
  }, [rect.top])

  useEffect(() => {
    const tangent = (e: KeyboardEvent) => { if (e.key === 'Escape') onStang() }
    window.addEventListener('keydown', tangent)
    forsta.current?.focus({ preventScroll: true })
    return () => window.removeEventListener('keydown', tangent)
  }, [onStang])

  const vw = typeof window !== 'undefined' ? window.innerWidth : 400
  const sida = mine
    ? { right: Math.max(KANT, vw - rect.right) }
    : { left: Math.max(KANT, rect.left) }

  return (
    <div className="md-meny-lager" role="dialog" aria-modal="true" aria-label="Val för meddelandet">
      <div className="md-meny-sloja" onClick={onStang} />
      <div
        ref={stack}
        className={`md-meny-stack${mine ? ' md-meny-stack--egen' : ''}`}
        style={{ top: top ?? rect.top, visibility: top === null ? 'hidden' : undefined, ...sida }}
      >
        {reaktioner && (
          <div className="md-meny-emoji" role="group" aria-label="Reagera">
            {REAKTIONER.map((e, i) => (
              <button key={e} ref={i === 0 ? forsta : undefined} type="button"
                className={minReaktion === e ? 'md-meny-emoji--vald' : undefined}
                aria-pressed={minReaktion === e}
                aria-label={minReaktion === e ? `Ta bort reaktionen ${e}` : `Reagera med ${e}`}
                onClick={() => onReagera(e)}>
                {e}
              </button>
            ))}
          </div>
        )}

        <div className={`md-meny-lyft md-rad md-rad--ny-grupp md-rad--sist${mine ? ' md-rad--egen' : ''}`}
          style={kortHojd ? { maxHeight: kortHojd } : undefined} aria-hidden="true">
          <div className="md-kol" style={{ width: Math.max(0, rect.right - rect.left) }}>{innehall}</div>
        </div>

        <div className="md-meny-val" role="menu">
          {onSvara && <MenyVal ikon={IKON.svar} label="Svara" onClick={onSvara} forstaRef={reaktioner ? undefined : forsta} />}
          {onKopiera && <MenyVal ikon={IKON.kopiera} label="Kopiera" onClick={onKopiera} forstaRef={!reaktioner && !onSvara ? forsta : undefined} />}
          {onRadera && <MenyVal ikon={IKON.soptunna} label="Radera" fara onClick={onRadera} />}
          {onAnmal && <MenyVal ikon={IKON.flagga} label="Anmäl" fara onClick={onAnmal} />}
        </div>
      </div>
    </div>
  )
}

function MenyVal({ ikon, label, fara, onClick, forstaRef }: {
  ikon: string; label: string; fara?: boolean; onClick: () => void; forstaRef?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button ref={forstaRef} type="button" role="menuitem" className={`md-meny-rad${fara ? ' md-meny-rad--fara' : ''}`} onClick={onClick}>
      <span>{label}</span>
      <Ikon d={ikon} s={20} w={1.9} />
    </button>
  )
}

/** Reaktionerna under en bubbla: en knapp per emoji, med antal när fler än en. */
export function ReaktionsRad({ lista, me, mine, onTryck }: {
  lista: Reaktion[]
  me: string | null
  mine: boolean
  onTryck: (emoji: string) => void
}) {
  if (lista.length === 0) return null
  const grupper = new Map<string, { n: number; min: boolean }>()
  for (const r of lista) {
    const g = grupper.get(r.emoji) ?? { n: 0, min: false }
    g.n += 1
    if (r.user_id === me) g.min = true
    grupper.set(r.emoji, g)
  }
  const ordning = [...grupper.entries()].sort((a, b) => REAKTIONER.indexOf(a[0] as ReaktionsEmoji) - REAKTIONER.indexOf(b[0] as ReaktionsEmoji))
  return (
    <div className={`md-reak${mine ? ' md-reak--egen' : ''}`}>
      {ordning.map(([e, g]) => (
        <button key={e} type="button" className={g.min ? 'md-reak--min' : undefined}
          aria-label={`${e}, ${g.n} ${g.n === 1 ? 'reaktion' : 'reaktioner'}${g.min ? ', din. Tryck för att ta bort' : ''}`}
          onClick={ev => { ev.stopPropagation(); onTryck(e) }}>
          <span>{e}</span>{g.n > 1 && <span className="md-reak-n">{g.n}</span>}
        </button>
      ))}
    </div>
  )
}

/** Citatet överst i ett svar. Tryck för att hoppa till originalet. */
export function Citat({ vem, text, onTryck }: { vem: string; text: string; onTryck?: () => void }) {
  return (
    <button type="button" className="md-citat" onClick={ev => { ev.stopPropagation(); onTryck?.() }} disabled={!onTryck}
      aria-label={`Svar på ${vem}: ${text}`}>
      <span className="md-citat-vem">{vem}</span>
      <span className="md-citat-text">{text}</span>
    </button>
  )
}

/** Raden ovanför skrivfältet när man svarar på något. */
export function SvarsRad({ vem, text, onAvbryt }: { vem: string; text: string; onAvbryt: () => void }) {
  return (
    <div className="md-svarsrad">
      <Ikon d={IKON.svar} s={18} w={1.9} />
      <div className="md-svarsrad-text">
        <span className="md-citat-vem">Svarar {vem}</span>
        <span className="md-citat-text">{text}</span>
      </div>
      <button type="button" className="md-rund md-rund--liten" onClick={onAvbryt} aria-label="Avbryt svaret">
        <Ikon d={IKON.stang} s={16} w={2} />
      </button>
    </div>
  )
}

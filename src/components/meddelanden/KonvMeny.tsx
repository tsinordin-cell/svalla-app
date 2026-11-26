'use client'

/**
 * Långt tryck på ett samtal i inkorgen (Toms önskan 2026-11-26, som i Messenger).
 *
 * Samtalet visas som ett kort med de senaste meddelandena över en suddig
 * bakgrund, och valen ligger under kortet. Tryck på kortet öppnar samtalet.
 * Att titta i kortet markerar inte samtalet som läst.
 *
 * iPhone: ett långt tryck på en länk visar annars Safaris egen länkmeny och
 * markerar text. Raden har därför -webkit-touch-callout: none och
 * user-select: none (meddelanden.css), och klicket som kommer när fingret
 * släpps stoppas när menyn redan har öppnats. Rör sig fingret mer än 10 px
 * räknas det som skrollning och menyn öppnas inte. På dator och Android öppnar
 * högerklick respektive webbläsarens långa tryck (contextmenu) samma meny.
 */

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Avatar, Ikon, IKON, type KonvRadData } from './Delar'

const KANT = 12
const TRYCK_MS = 450
const ROR_PX = 10

export type ForhandsRad = {
  id: string
  mine: boolean
  /** Texten, eller en etikett som "Bild" när meddelandet inte är text */
  text: string
  etikett?: boolean
  avsandare?: { namn: string; nyckel: string; bild: string | null }
}

/** Handlers för långt tryck på en länk (raden i inkorgen). */
export function useLangtTryck(oppna: (el: HTMLElement) => void) {
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const start = useRef<{ x: number; y: number } | null>(null)
  const oppnad = useRef(false)

  const avbryt = useCallback(() => {
    if (timer.current) clearTimeout(timer.current)
    timer.current = null
    start.current = null
  }, [])

  useEffect(() => avbryt, [avbryt])

  return {
    onTouchStart: (e: React.TouchEvent<HTMLElement>) => {
      oppnad.current = false
      const t = e.touches[0]
      if (!t || e.touches.length > 1) { avbryt(); return }
      start.current = { x: t.clientX, y: t.clientY }
      const el = e.currentTarget
      if (timer.current) clearTimeout(timer.current)
      timer.current = setTimeout(() => {
        timer.current = null
        oppnad.current = true
        oppna(el)
      }, TRYCK_MS)
    },
    onTouchMove: (e: React.TouchEvent<HTMLElement>) => {
      const t = e.touches[0]
      if (!t || !start.current || !timer.current) return
      if (Math.hypot(t.clientX - start.current.x, t.clientY - start.current.y) > ROR_PX) avbryt()
    },
    onTouchEnd: (e: React.TouchEvent<HTMLElement>) => {
      // Menyn öppnades: stoppa klicket som annars skulle öppna samtalet.
      if (oppnad.current && e.cancelable) e.preventDefault()
      avbryt()
    },
    onTouchCancel: avbryt,
    onContextMenu: (e: React.MouseEvent<HTMLElement>) => {
      e.preventDefault()
      if (oppnad.current) return
      // Kom det under ett pågående tryck (Android) ska klicket efteråt stoppas.
      if (timer.current) oppnad.current = true
      avbryt()
      oppna(e.currentTarget)
    },
    onClick: (e: React.MouseEvent<HTMLElement>) => {
      if (oppnad.current) { e.preventDefault(); oppnad.current = false }
    },
  }
}

export function KonvMeny({
  rad, rect, forhand, tyst, arGrupp, onOppna, onOlast, onLast, onTysta, onRadera, onBlockera, onStang,
}: {
  rad: KonvRadData
  rect: { top: number; left: number; right: number; height: number }
  forhand: ForhandsRad[] | 'laddar' | 'fel'
  tyst: boolean
  arGrupp: boolean
  onOppna: () => void
  onOlast?: () => void
  onLast?: () => void
  onTysta: () => void
  onRadera: () => void
  onBlockera?: () => void
  onStang: () => void
}) {
  const stack = useRef<HTMLDivElement>(null)
  const flode = useRef<HTMLDivElement>(null)
  const forsta = useRef<HTMLButtonElement>(null)
  const oppnadVid = useRef(Date.now())
  const [plats, setPlats] = useState<{ top: number; left: number; width: number; kortMax: number } | null>(null)

  useLayoutEffect(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    const telefon = vw < 1024
    const width = telefon ? Math.min(vw - KANT * 2, 520) : Math.min(400, vw - KANT * 2)
    const left = telefon
      ? Math.round((vw - width) / 2)
      : Math.max(KANT, Math.min(rect.left, vw - KANT - width))
    const valH = stack.current?.querySelector<HTMLElement>('.md-meny-val')?.offsetHeight ?? 0
    const kortMax = Math.max(160, Math.min(telefon ? 460 : 420, vh - KANT * 2 - valH - 10))
    const total = kortMax + 10 + valH
    // Telefon: kortet överst, som i Messenger. Dator: vid raden.
    const top = telefon
      ? KANT
      : Math.max(KANT, Math.min(rect.top - 40, vh - KANT - total))
    setPlats({ top, left, width, kortMax })
  }, [rect.top, rect.left])

  // Visa de senaste meddelandena längst ner, som i samtalet.
  useLayoutEffect(() => {
    const el = flode.current
    if (el) el.scrollTop = el.scrollHeight
  }, [forhand, plats])

  useEffect(() => {
    const tangent = (e: KeyboardEvent) => { if (e.key === 'Escape') onStang() }
    window.addEventListener('keydown', tangent)
    forsta.current?.focus({ preventScroll: true })
    return () => window.removeEventListener('keydown', tangent)
  }, [onStang])

  // Fingret släpps ofta ovanpå slöjan direkt efter att menyn öppnats.
  const stangSloja = () => { if (Date.now() - oppnadVid.current > 400) onStang() }

  return (
    <div className="md-meny-lager" role="dialog" aria-modal="true" aria-label={`Val för samtalet med ${rad.namn}`}>
      <div className="md-meny-sloja" onClick={stangSloja} />
      <div
        ref={stack}
        className="md-kmeny"
        style={{
          top: plats?.top ?? rect.top, left: plats?.left ?? KANT, width: plats?.width,
          visibility: plats ? undefined : 'hidden',
        }}
      >
        <div
          className="md-kmeny-kort"
          role="link"
          tabIndex={0}
          aria-label={`Öppna samtalet med ${rad.namn}`}
          style={plats ? { maxHeight: plats.kortMax } : undefined}
          onClick={onOppna}
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOppna() } }}
        >
          <div className="md-kmeny-huvud">
            <Avatar namn={rad.namn} nyckel={rad.nyckel} bild={rad.bild} s={28} />
            <span className="md-kmeny-namn">{rad.namn}</span>
            {tyst && <span className="md-kmeny-tyst" aria-label="Tystat"><Ikon d={IKON.klockaAv} s={15} w={1.9} /></span>}
          </div>
          <div ref={flode} className="md-kmeny-flode" aria-hidden="true">
            {forhand === 'laddar' && (
              <>
                <div className="md-skel md-kmeny-skel" style={{ width: '46%' }} />
                <div className="md-skel md-kmeny-skel md-kmeny-skel--egen" style={{ width: '58%' }} />
                <div className="md-skel md-kmeny-skel" style={{ width: '38%' }} />
              </>
            )}
            {forhand === 'fel' && <p className="md-kmeny-info">Meddelandena gick inte att visa just nu.</p>}
            {Array.isArray(forhand) && forhand.length === 0 && <p className="md-kmeny-info">Inga meddelanden än.</p>}
            {Array.isArray(forhand) && forhand.map((m, i) => {
              const fore = forhand[i - 1]
              const efter = forhand[i + 1]
              const nyGrupp = !fore || fore.mine !== m.mine || fore.avsandare?.nyckel !== m.avsandare?.nyckel
              const sist = !efter || efter.mine !== m.mine || efter.avsandare?.nyckel !== m.avsandare?.nyckel
              const av = m.avsandare ?? { namn: rad.namn, nyckel: rad.nyckel, bild: rad.bild }
              const klass = ['md-rad', m.mine && 'md-rad--egen', nyGrupp && 'md-rad--ny-grupp', sist && 'md-rad--sist'].filter(Boolean).join(' ')
              return (
                <div key={m.id} className={klass}>
                  {!m.mine && <div className="md-av-plats">{sist ? <Avatar namn={av.namn} nyckel={av.nyckel} bild={av.bild} s={28} /> : null}</div>}
                  <div className="md-kol">
                    <div className={`md-bubbla${m.etikett ? ' md-kmeny-etikett' : ''}`}>{m.text}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="md-meny-val" role="menu">
          {onLast && <Val refen={forsta} ikon={IKON.kuvertOppet} label="Markera som läst" onClick={onLast} />}
          {onOlast && <Val refen={onLast ? undefined : forsta} ikon={IKON.kuvert} label="Markera som oläst" onClick={onOlast} />}
          <Val refen={onLast || onOlast ? undefined : forsta} ikon={tyst ? IKON.klocka : IKON.klockaAv} label={tyst ? 'Slå på aviseringar' : 'Tysta'} onClick={onTysta} />
          <Val ikon={arGrupp ? IKON.lamna : IKON.soptunna} label={arGrupp ? 'Lämna gruppen' : 'Radera meddelandena'} fara onClick={onRadera} />
          {onBlockera && <Val ikon={IKON.blockera} label={`Blockera ${rad.namn}`} fara onClick={onBlockera} />}
        </div>
      </div>
    </div>
  )
}

function Val({ ikon, label, fara, onClick, refen }: {
  ikon: string; label: string; fara?: boolean; onClick: () => void; refen?: React.Ref<HTMLButtonElement>
}) {
  return (
    <button ref={refen} type="button" role="menuitem" className={`md-meny-rad${fara ? ' md-meny-rad--fara' : ''}`} onClick={onClick}>
      <span>{label}</span>
      <Ikon d={ikon} s={20} w={1.9} />
    </button>
  )
}

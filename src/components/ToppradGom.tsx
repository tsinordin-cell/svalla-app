'use client'
import { useEffect, useRef } from 'react'

/**
 * Toppraden glider undan när man skrollar ner och kommer tillbaka när man
 * skrollar upp (Tom 2026-11-25: "mindre menyer och mer app"). Samma regel som
 * de flytande klockorna i Nav.tsx: 24 px nedåt gömmer, 12 px uppåt visar, och
 * överst på sidan syns raden alltid.
 *
 * Renderas inuti <header className="app-topbar"> och sätter klassen
 * app-topbar--gomd på den (globals.css). Raden göms inte medan notisrutan är
 * öppen, och visas igen om något i den får tangentbordsfokus.
 *
 * Med `mal` (Flödet, 2026-11-25) sätts klassen i stället på närmaste element som
 * matchar väljaren, t.ex. blocket med toppraden och flikraden, som då glider
 * undan i sin helhet. Blockets höjd mäts (--flode-topp-h, på föräldern, så att
 * toningen under kan gå upp bakom blocket).
 */
export default function ToppradGom({ mal }: { mal?: string } = {}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const rad = mal
      ? ref.current?.closest<HTMLElement>(mal)
      : ref.current?.closest<HTMLElement>('header')
    if (!rad) return

    let ro: ResizeObserver | undefined
    if (mal) {
      const parent = rad.parentElement
      const mat = () => {
        parent?.style.setProperty('--flode-topp-h', `${rad.offsetHeight}px`)
      }
      mat()
      // TESTGREN: ?fore=1 visar det gamla beteendet (bara toppraden glider undan).
      if (new URLSearchParams(window.location.search).get('fore') === '1') {
        const topprad = rad.querySelector<HTMLElement>('header')
        rad.classList.add('test-fore')
        if (topprad) rad.style.setProperty('--topprad-h', `${topprad.offsetHeight}px`)
      }
      if (typeof ResizeObserver !== 'undefined') {
        ro = new ResizeObserver(mat)
        ro.observe(rad)
      }
    }

    let senast = window.scrollY, ack = 0
    const visa = () => rad.classList.remove('app-topbar--gomd')
    const onScroll = () => {
      const y = window.scrollY, d = y - senast
      senast = y
      if (y < 24) { ack = 0; visa(); return }
      ack = (ack > 0) === (d > 0) ? ack + d : d
      if (ack > 24) {
        if (!rad.querySelector('[aria-expanded="true"]')) rad.classList.add('app-topbar--gomd')
      } else if (ack < -12) visa()
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    rad.addEventListener('focusin', visa)
    return () => {
      window.removeEventListener('scroll', onScroll)
      rad.removeEventListener('focusin', visa)
      ro?.disconnect()
      visa()
    }
  }, [mal])

  return <span ref={ref} hidden />
}

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
 */
export default function ToppradGom() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const rad = ref.current?.closest<HTMLElement>('header')
    if (!rad) return

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
      visa()
    }
  }, [])

  return <span ref={ref} hidden />
}

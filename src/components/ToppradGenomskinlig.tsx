'use client'
import { useEffect, useRef } from 'react'

/**
 * Toppraden ligger genomskinlig ovanpå en mörk yta högst upp på sidan och blir
 * den vanliga ljusa raden när man skrollat förbi ytan (Tom 2026-11-25, profilsidan:
 * "tar bort top baren helt ... lämnar mer utrymme", byggt som genomskinlig rad
 * så att meddelanden, notiser och inställningar finns kvar vid skroll).
 *
 * Renderas inuti <header className="app-topbar"> och sätter klasserna
 * app-topbar--genomskinlig och mork-yta (vit tvåfärgad fokusring) på den
 * (globals.css). Den mörka ytan märks med data-topprad-mork-yta; dess undre
 * kant räknas minus den ljusa bågen (data-topprad-mork-yta="32" = 32 px båge).
 * Bara under 1024 px, där raden syns.
 */
export default function ToppradGenomskinlig() {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const rad = ref.current?.closest('header')
    if (!rad) return
    const uppdatera = () => {
      const yta = document.querySelector<HTMLElement>('[data-topprad-mork-yta]')
      if (!yta) { rad.classList.remove('app-topbar--genomskinlig', 'mork-yta'); return }
      const bage = Number(yta.dataset.toppradMorkYta) || 0
      const over = yta.getBoundingClientRect().bottom - bage > rad.getBoundingClientRect().bottom
      rad.classList.toggle('app-topbar--genomskinlig', over)
      rad.classList.toggle('mork-yta', over)
    }
    uppdatera()
    window.addEventListener('scroll', uppdatera, { passive: true })
    window.addEventListener('resize', uppdatera)
    return () => {
      window.removeEventListener('scroll', uppdatera)
      window.removeEventListener('resize', uppdatera)
      rad.classList.remove('app-topbar--genomskinlig', 'mork-yta')
    }
  }, [])

  return <span ref={ref} hidden />
}

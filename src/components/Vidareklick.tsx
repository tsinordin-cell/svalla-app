'use client'

/**
 * Vidareklick: loggar när en besökare lämnar en ösida för en verksamhet.
 *
 * VARFÖR (exitplanen, task 1 och 4, 2026-09-30): SBAB köpte Booli för att nå
 * bostadsköpare innan bolånet. Vår motsvarighet är att visa att en
 * skärgårdsresa börjar hos oss och fortsätter hos en krog, ett boende eller
 * ett båtbolag. Utan mätning kan vi inte visa det, och en 12-månadersserie
 * börjar först den dag vi börjar räkna.
 *
 * HUR: en enda lyssnare på dokumentet i stället för en onClick på varje
 * länk. Länkarna ligger utspridda i sektioner, kort och komponenter; att
 * tråda en callback genom alla hade varit skört och lätt att glömma i nästa
 * sektion. Kategorin läses från närmaste förälder med data-vidareklick.
 * En extern länk utan sådan förälder räknas som 'ovrigt', så inget klick
 * försvinner tyst.
 *
 * Integritet: bara värdnamnet sparas (dockspot.com, inte hela adressen).
 * Samtycke kontrolleras i track(), som gör ingenting utan analyssamtycke.
 */

import { useEffect } from 'react'
import { track, type Vidareklickkategori } from '@/lib/analytics-events'

const GILTIGA: ReadonlySet<string> = new Set<Vidareklickkategori>([
  'mat', 'boende', 'resa', 'hamn', 'hantverk', 'kalla', 'ovrigt',
])

/**
 * `standard` används på undersidor som bara har en sorts innehåll, till
 * exempel /o/moja/restauranger. Då behöver ingen sektion märkas.
 */
export default function Vidareklick({ islandSlug, standard = 'ovrigt' }: {
  islandSlug: string
  standard?: Vidareklickkategori
}) {
  useEffect(() => {
    function vidKlick(e: MouseEvent) {
      // auxclick fyras även för högerklick. Bara mittenklick öppnar länken.
      if (e.type === 'auxclick' && e.button !== 1) return
      const mal = e.target instanceof Element ? e.target.closest('a[href]') : null
      if (!(mal instanceof HTMLAnchorElement)) return

      let url: URL
      try { url = new URL(mal.href, window.location.href) } catch { return }
      if (url.protocol !== 'http:' && url.protocol !== 'https:') return

      const egen = window.location.hostname.replace(/^www\./, '')
      const host = url.hostname.replace(/^www\./, '')
      if (!host || host === egen) return

      const satt = mal.closest('[data-vidareklick]')?.getAttribute('data-vidareklick') ?? standard
      const kategori = (GILTIGA.has(satt) ? satt : 'ovrigt') as Vidareklickkategori

      track('outbound_clicked', { island_slug: islandSlug, kategori, mal: host.slice(0, 200) })
    }

    // Capture-fas: loggningen sker innan eventuell navigering, och en
    // komponent som stoppar propagering kan inte svälja klicket.
    document.addEventListener('click', vidKlick, true)
    // Mittenklick öppnar i ny flik utan 'click'-event i alla webbläsare.
    document.addEventListener('auxclick', vidKlick, true)
    return () => {
      document.removeEventListener('click', vidKlick, true)
      document.removeEventListener('auxclick', vidKlick, true)
    }
  }, [islandSlug, standard])

  return null
}

'use client'

/**
 * "Hoppa till innehållet" (revision 2026-10-02, WCAG 2.4.1).
 *
 * Uppmätt i revisionen: på startsidan var man fortfarande i menyn efter 30
 * tryck på Tab. Länken syns bara när den får tangentbordsfokus (CSS:
 * .skip-link i globals.css).
 *
 * Den renderas från ThemeProvider, eftersom det är den enda komponenten som
 * ligger före <main> i root-layouten (layout.tsx ändras i en annan PR). I Nav
 * hade den hamnat sist i tabbordningen, för Nav renderas efter <main>.
 *
 * href="#innehall" pekar på root-layoutens <main id="innehall"> och fungerar
 * även innan JavaScript har laddats. Med JavaScript blir målet i stället sidans
 * första synliga <h1> inuti <main>: sidornas egna menyer (startsidans meny,
 * ösidornas sidhuvud) ligger inuti <main>, så ett hopp till <main> hade inte
 * hoppat över dem. Saknas h1 blir målet <main>.
 */
export default function SkipLink() {
  function hoppa(e: React.MouseEvent<HTMLAnchorElement>) {
    const main = document.getElementById('innehall') ?? document.querySelector<HTMLElement>('main')
    const rubrik = Array.from(main?.querySelectorAll<HTMLElement>('h1') ?? [])
      .find(h => h.getClientRects().length > 0)
    const mal = rubrik ?? main
    if (!mal) return
    e.preventDefault()
    // Rubriker och <main> kan inte få fokus utan tabindex. Lägg till det
    // tillfälligt och ta bort det när fokus lämnar målet igen.
    if (!mal.hasAttribute('tabindex')) {
      mal.setAttribute('tabindex', '-1')
      mal.setAttribute('data-skip-mal', '')
      mal.addEventListener('blur', () => {
        mal.removeAttribute('tabindex')
        mal.removeAttribute('data-skip-mal')
      }, { once: true })
    }
    mal.focus()
  }

  return (
    <a href="#innehall" className="skip-link" onClick={hoppa}>
      Hoppa till innehållet
    </a>
  )
}

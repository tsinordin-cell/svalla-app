import type { KeyboardEvent } from 'react'

/**
 * Tangentbord för flikrader (role="tablist"). Granskningen 2026-11-22, punkt 27:
 * flikarna gick bara att nå med Tab, en i taget, och pilarna gjorde ingenting.
 *
 * Mönstret följer WAI-ARIA för flikar: bara den valda fliken ligger i
 * tabbordningen, vänster- och högerpil byter flik, Home och End går till första
 * och sista. Upp och ner lämnas åt sidan så att sidan fortfarande kan skrollas.
 */
export function nastaFlik(tangent: string, index: number, antal: number): number | null {
  if (antal <= 0) return null
  switch (tangent) {
    case 'ArrowRight': return (index + 1) % antal
    case 'ArrowLeft': return (index - 1 + antal) % antal
    case 'Home': return 0
    case 'End': return antal - 1
    default: return null
  }
}

/** onKeyDown för en flikknapp: byter flik och flyttar fokus till den nya. */
export function flikTangent(
  e: KeyboardEvent<HTMLElement>,
  index: number,
  antal: number,
  valj: (nytt: number) => void,
): void {
  const nytt = nastaFlik(e.key, index, antal)
  if (nytt === null) return
  e.preventDefault()
  valj(nytt)
  const flikar = e.currentTarget.closest('[role="tablist"]')?.querySelectorAll<HTMLElement>('[role="tab"]')
  flikar?.[nytt]?.focus()
}

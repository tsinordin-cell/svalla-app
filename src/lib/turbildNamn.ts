/**
 * Filnamn för en turbild i lagringshinken trips.
 *
 * Namnet är "<användar-id>-<slump>.<filändelse>".
 *
 * Prefixet med användarens id MÅSTE stå kvar: kontoraderingen
 * (api/account/delete) hittar användarens turbilder på det.
 *
 * Resten är slumpat sedan 2026-11-19. Före det var det klockslaget i
 * millisekunder. Hinken är publik (så visas bilderna), och användarens id går
 * att läsa: den som visste ungefär när en privat tur sparades kunde alltså
 * gissa sig fram till bildens adress. Ett slumpat namn går inte att gissa.
 */

function slump(): string {
  const c = globalThis.crypto
  if (c && typeof c.randomUUID === 'function') return c.randomUUID()
  if (c && typeof c.getRandomValues === 'function') {
    const b = new Uint8Array(16)
    c.getRandomValues(b)
    return Array.from(b, x => x.toString(16).padStart(2, '0')).join('')
  }
  // Sista utvägen i en miljö helt utan crypto (ingen webbläsare vi stöder).
  return `${Date.now().toString(36)}${Math.random().toString(36).slice(2)}${Math.random().toString(36).slice(2)}`
}

/** Filändelsen ur originalnamnet: bara a–z och 0–9, högst fem tecken, annars jpg. */
export function filandelse(filnamn: string): string {
  const sista = filnamn.includes('.') ? filnamn.split('.').pop() ?? '' : ''
  const ren = sista.toLowerCase()
  return /^[a-z0-9]{1,5}$/.test(ren) ? ren : 'jpg'
}

export function turbildNamn(userId: string, filnamn: string): string {
  return `${userId}-${slump()}.${filandelse(filnamn)}`
}

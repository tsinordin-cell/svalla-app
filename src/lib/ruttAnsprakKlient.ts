/**
 * Webbläsarens sida av anspråksnyckeln (se lib/ruttAnsprak.ts). Nyckeln sparas
 * per rutt i localStorage hos den som skapade rutten utloggad, och skickas med
 * när hen loggat in och sparar rutten i sitt konto.
 */
const PREFIX = 'svalla-rutt-ansprak:'

export function sparaAnsprak(routeId: string, nyckel: string): void {
  try { window.localStorage.setItem(PREFIX + routeId, nyckel) } catch { /* privat läge m.m. */ }
}

export function hamtaAnsprak(routeId: string): string | null {
  try { return window.localStorage.getItem(PREFIX + routeId) } catch { return null }
}

export function glomAnsprak(routeId: string): void {
  try { window.localStorage.removeItem(PREFIX + routeId) } catch { /* strunt samma */ }
}

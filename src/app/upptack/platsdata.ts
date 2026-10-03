/**
 * Platsdatan till /upptack, hämtad så tidigt som möjligt (revision 2026-10-02, P1-3).
 *
 * UpptackExplorer laddas som en egen chunk först efter att sidan hydrerats,
 * och hämtade sedan /api/discovery?type=poi – på en långsam telefon tre
 * sekunder in. Nu: page.tsx preloadar svaret när HTML:en läses, UpptackLoader
 * startar hämtningen vid hydreringen (medan chunken laddas) och explorern
 * tar över samma löfte. Ett anrop, tidigt.
 *
 * Löftet lämnas ut en gång (tagPlatssvar) – nästa montering hämtar på nytt,
 * som förut. Ett misslyckat svar sparas inte.
 */

export const PLATSDATA_URL = '/api/discovery?type=poi'

export interface Platssvar {
  status: number
  ok: boolean
  data: unknown
}

let pagaende: Promise<Platssvar> | null = null

async function hamta(): Promise<Platssvar> {
  const r = await fetch(PLATSDATA_URL)
  const data = r.ok ? await r.json() : null
  return { status: r.status, ok: r.ok, data }
}

/** Starta hämtningen om den inte redan pågår. */
export function startaPlatshamtning(): Promise<Platssvar> {
  if (!pagaende) {
    const p = hamta()
    pagaende = p
    p.then(
      s => { if (!s.ok && pagaende === p) pagaende = null },
      () => { if (pagaende === p) pagaende = null },
    )
  }
  return pagaende
}

/** Hämta (eller återanvänd den pågående hämtningen) och släpp den. */
export function tagPlatssvar(): Promise<Platssvar> {
  const p = startaPlatshamtning()
  pagaende = null
  return p
}

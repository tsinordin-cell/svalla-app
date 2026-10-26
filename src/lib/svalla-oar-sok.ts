/**
 * Svallas egna öar i platssökningen (2026-10-26). Nominatim visade "Lidingö" för
 * "Fjäderholmarna" (kommunen vann över namnet), och en tur till en ö måste knytas
 * till rätt ö för att räknas i Min skärgård. Öarna ur ISLAND_COORDS visas därför
 * först, med öns läge, innan Nominatims träffar.
 */
import { ISLAND_COORDS } from './islandCoords'

export type Place = {
  display_name: string
  name: string
  lat: string
  lon: string
  /** Svallas egen ö: visas först, med öns läge, så turen knyts rätt. */
  svalla?: boolean
}

export const norm = (t: string) => t.normalize('NFC').toLocaleLowerCase('sv-SE').trim()

/** Svallas öar vars namn börjar med eller innehåller sökningen, bäst träff först. */
export function svallaOar(q: string, max = 3): Place[] {
  const n = norm(q)
  if (n.length < 2) return []
  const traffar = ISLAND_COORDS
    .map(o => ({ o, k: norm(o.name) }))
    .filter(({ k }) => k.includes(n))
    .sort((a, b) => Number(b.k.startsWith(n)) - Number(a.k.startsWith(n)) || a.k.length - b.k.length)
    .slice(0, max)
  return traffar.map(({ o }) => ({ display_name: o.name, name: o.name, lat: String(o.lat), lon: String(o.lng), svalla: true }))
}

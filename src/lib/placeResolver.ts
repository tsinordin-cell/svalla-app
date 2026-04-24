/**
 * placeResolver.ts — översätter ortnamn till koordinater.
 *
 * Används av Thorkel-guidens tool calls: användaren säger "från Stavsnäs till
 * Sandhamn" och vi måste få lat/lng för att anropa planner.ts::suggestStops().
 *
 * Strategi:
 * 1. Kontrollera DEPARTURES-listan (15 kända start/mål)
 * 2. Normalisera svenska tecken (å/ä/ö) och matcha mot alias
 * 3. Returnera null om ingen match — Thorkel får då förklara att platsen inte stöds
 */

import { DEPARTURES } from './planner'

export type ResolvedPlace = {
  name: string
  lat: number
  lng: number
}

/** Normalisera: lowercase + trimmat + ta bort accenter för luddigare match */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // ta bort combining marks (å→a, ö→o)
    .replace(/\s+/g, ' ')
}

// Extra alias — vanliga sätt folk säger platser på
const ALIASES: Record<string, string> = {
  'stockholm':        'stromkajen',
  'city':             'stromkajen',
  'centrum':          'stromkajen',
  'vaxholm hamn':     'vaxholm',
  'sandhamn hamn':    'sandhamn',
  'mojaon':           'moja',
  'finnhamns brygga': 'finnhamn',
  'utön':             'uto',
  'uto':              'uto',
}

export function resolvePlaceName(name: string): ResolvedPlace | null {
  const normalized = normalize(name)
  if (!normalized) return null

  // Kolla alias först
  const aliased = ALIASES[normalized] ?? normalized

  // Sök i DEPARTURES — matcha både på `id` och `name` (båda normaliserade)
  for (const d of DEPARTURES) {
    if (normalize(d.id) === aliased || normalize(d.name) === aliased) {
      return { name: d.name, lat: d.lat, lng: d.lng }
    }
  }

  // Partial match — om användaren säger "Grinda" och id är "grinda"
  for (const d of DEPARTURES) {
    const dNorm = normalize(d.name)
    if (dNorm.startsWith(aliased) || aliased.startsWith(dNorm)) {
      return { name: d.name, lat: d.lat, lng: d.lng }
    }
  }

  return null
}

/** Lista alla platser Thorkel kan använda — för system prompt. */
export function listSupportedPlaces(): string[] {
  return DEPARTURES.map(d => d.name)
}

/**
 * MapLibre som en egen chunk, startad tidigt (ersätter leaflet.ts 2026-11-28).
 *
 * UpptackLoader anropar hamtaMaplibre() vid hydreringen, så att kartmotorn
 * laddas parallellt med explorern. Explorern får samma löfte.
 */
import type * as MapLibre from 'maplibre-gl'

let pagaende: Promise<typeof MapLibre> | null = null

export function hamtaMaplibre(): Promise<typeof MapLibre> {
  if (!pagaende) {
    pagaende = import('maplibre-gl')
      .then((m) => (m.default ?? m) as typeof MapLibre)
      .catch((e) => { pagaende = null; throw e })
  }
  return pagaende
}

/**
 * Utforska räknade zoom som Leaflet (256 px rutor). MapLibre räknar med 512 px
 * rutor och visar samma skala en nivå lägre. Regionernas zoomnivåer står kvar i
 * Leaflet-skala och översätts här.
 */
export const ZOOM_DIFF = 1
export const tillMaplibreZoom = (leafletZoom: number) => leafletZoom - ZOOM_DIFF
export const tillLeafletZoom = (maplibreZoom: number) => maplibreZoom + ZOOM_DIFF

/** Polygon (GeoJSON-ring) för en cirkel med radie i meter, för GPS-noggrannheten. */
export function cirkelRing(lat: number, lng: number, radieM: number, steg = 48): [number, number][] {
  const ring: [number, number][] = []
  const dLat = radieM / 111_320
  const dLng = radieM / (111_320 * Math.cos((lat * Math.PI) / 180))
  for (let i = 0; i <= steg; i++) {
    const v = (i / steg) * 2 * Math.PI
    ring.push([lng + dLng * Math.cos(v), lat + dLat * Math.sin(v)])
  }
  return ring
}

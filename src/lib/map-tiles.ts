/**
 * Gemensamma tile-URL:er och seamark-overlay för alla kartor i appen.
 * Sjökorts-overlay (OpenSeaMap) är Svallas visuella signatur — gör det lätt
 * för Leaflet-komponenter att lägga på den utan duplicering.
 */

export const OSM_TILE_LIGHT = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
export const OSM_TILE_DARK  = 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'

/** OpenSeaMap sjömärken, grynnor, fyrar etc. — transparent PNG, läggs ovanpå bas-lagret. */
export const SEAMARK_TILE = 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'

export const OSM_ATTR      = '&copy; OpenStreetMap contributors'
export const OSM_DARK_ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
export const SEAMARK_ATTR  = '&copy; <a href="https://www.openseamap.org">OpenSeaMap</a>'

/** Aktivt tema via data-theme på <html>. */
export function isDarkTheme(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

/** URL + attribution för bas-tiles baserat på aktuellt tema. */
export function baseTile(): { url: string; attr: string } {
  return isDarkTheme()
    ? { url: OSM_TILE_DARK, attr: OSM_DARK_ATTR }
    : { url: OSM_TILE_LIGHT, attr: OSM_ATTR }
}

/**
 * Lägg till bas + seamark-overlay på en Leaflet-karta.
 * Körs i useEffect efter init.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function addSvallaTiles(L: any, map: any): void {
  const { url, attr } = baseTile()
  L.tileLayer(url, { attribution: attr, maxZoom: 18 }).addTo(map)
  L.tileLayer(SEAMARK_TILE, {
    attribution: SEAMARK_ATTR, maxZoom: 18, opacity: 0.9,
  }).addTo(map)
}

/**
 * Gemensamma tile-URL:er och seamark-overlay för alla kartor i appen.
 * Sjökorts-overlay (OpenSeaMap) är Svallas visuella signatur — gör det lätt
 * för Leaflet-komponenter att lägga på den utan duplicering.
 */
import type { Map as LeafletMap } from 'leaflet'
type LeafletNS = typeof import('leaflet')

// UPPMÄTT 2026-09-03: CARTO:s basemaps kräver numera API-nyckel — varje tile
// från basemaps.cartocdn.com levereras med vattenstämpeln "API KEY REQUIRED"
// (carto.com/basemaps/apikey), vilket syntes på alla kartor i produktion.
// Bas-lagret är därför OpenStreetMaps standardtiles (ingen nyckel, kräver
// attribution — se OSM_ATTR nedan). OSM har ingen mörk variant; mörkt tema
// använder samma tiles. Vill vi ha tillbaka CARTO:s mörka stil krävs en
// nyckel i miljön — Toms beslut.
export const CARTO_TILE_LIGHT = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
export const CARTO_TILE_DARK  = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png'

// Bakåtkompatibilitet — gamla importer slutar fungera annars
/** @deprecated Använd CARTO_TILE_LIGHT */
export const OSM_TILE_LIGHT = CARTO_TILE_LIGHT
export const OSM_TILE_DARK  = CARTO_TILE_DARK

/** OpenSeaMap sjömärken, grynnor, fyrar etc. — transparent PNG, läggs ovanpå bas-lagret. */
export const SEAMARK_TILE = 'https://tiles.openseamap.org/seamark/{z}/{x}/{y}.png'

export const CARTO_ATTR    = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-bidragsgivare'
export const SEAMARK_ATTR  = '&copy; <a href="https://www.openseamap.org">OpenSeaMap</a>'

// Bakåtkompatibilitet
export const OSM_ATTR      = CARTO_ATTR
export const OSM_DARK_ATTR = CARTO_ATTR

/** Aktivt tema via data-theme på <html>. */
export function isDarkTheme(): boolean {
  if (typeof document === 'undefined') return false
  return document.documentElement.getAttribute('data-theme') === 'dark'
}

/** URL + attribution för bas-tiles baserat på aktuellt tema. */
export function baseTile(): { url: string; attr: string } {
  return isDarkTheme()
    ? { url: CARTO_TILE_DARK,  attr: CARTO_ATTR }
    : { url: CARTO_TILE_LIGHT, attr: CARTO_ATTR }
}

/**
 * Lägg till bas + seamark-overlay på en Leaflet-karta.
 * Körs i useEffect efter init.
 */
export function addSvallaTiles(L: LeafletNS, map: LeafletMap): void {
  const { url, attr } = baseTile()
  L.tileLayer(url, { attribution: attr, maxZoom: 18 }).addTo(map)
  L.tileLayer(SEAMARK_TILE, {
    attribution: SEAMARK_ATTR, maxZoom: 18, opacity: 0.9,
  }).addTo(map)
}

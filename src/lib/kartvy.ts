/**
 * Vad en Leaflet-karta visar innan Leaflet har laddats (revision 2026-10-02, P1-3).
 *
 * /upptack filtrerar listan på kartans synliga yta. Kartan initieras
 * asynkront, så fram till dess saknades ytan och listan renderade alla
 * ~560 platser – för att en sekund senare bytas mot de ~70 som syns.
 * Det kostade 2–3 s på en långsam telefon och gav ett hopp i layouten (CLS).
 *
 * Samma räkning som Leaflets standardprojektion (EPSG:3857, 256 px rutor):
 * världen är 256·2^zoom pixlar bred, och kartan visar containerns bredd och
 * höjd runt mittpunkten. Avvikelsen mot Leaflets getBounds() är under en pixel.
 */

export interface Kartyta {
  swLat: number
  swLng: number
  neLat: number
  neLng: number
}

const MAX_LAT = 85.0511287798 // Web Mercator slutar här

function projicera(lat: number, lng: number, varld: number): { x: number; y: number } {
  const begransad = Math.max(-MAX_LAT, Math.min(MAX_LAT, lat))
  const sinLat = Math.sin((begransad * Math.PI) / 180)
  const x = ((lng + 180) / 360) * varld
  const y = (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * varld
  return { x, y }
}

function avprojicera(x: number, y: number, varld: number): { lat: number; lng: number } {
  const lng = (x / varld) * 360 - 180
  const n = Math.PI - (2 * Math.PI * y) / varld
  const lat = (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)))
  return { lat, lng }
}

/**
 * Synlig yta för en karta med given mittpunkt, zoom och containerstorlek i px.
 * Returnerar null om containern saknar storlek (t.ex. display: none).
 */
export function kartytaFor(
  center: [number, number],
  zoom: number,
  breddPx: number,
  hojdPx: number,
): Kartyta | null {
  if (!(breddPx > 0) || !(hojdPx > 0) || !Number.isFinite(zoom)) return null
  const varld = 256 * Math.pow(2, zoom)
  const mitt = projicera(center[0], center[1], varld)
  const nv = avprojicera(mitt.x - breddPx / 2, mitt.y - hojdPx / 2, varld)
  const so = avprojicera(mitt.x + breddPx / 2, mitt.y + hojdPx / 2, varld)
  return { swLat: so.lat, swLng: nv.lng, neLat: nv.lat, neLng: so.lng }
}

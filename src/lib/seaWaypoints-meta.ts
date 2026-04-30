/**
 * seaWaypoints-meta.ts — Metadata-konstanter för sjöledsgrafen.
 *
 * Separerad från seaWaypoints.ts (765 rader, ~55KB) så att komponenter
 * som bara behöver versionsinfo (t.ex. RouteDisclaimer) inte drar in
 * hela waypointdatan i sitt bundle.
 */

export const SEA_DATA_VERSION = '2026-04-29-v2'
export const SEA_DATA_SOURCE  = 'Svalla manuell + farledsdata. Komplettera alltid med uppdaterat sjökort.'

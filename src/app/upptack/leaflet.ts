/**
 * Leaflet och markerklustret som en egen chunk (revision 2026-10-02, P1-3).
 *
 * UpptackExplorer hämtar Leaflet (145 kB) efter hydreringen, när listan redan
 * står i HTML:en (serverrenderad sedan 2026-10-10). Löftet delas så att ett
 * andra anrop återanvänder samma laddning.
 *
 * Båda ligger i leaflet-med-kluster.ts, så de kommer i en chunk och i rätt ordning.
 */
import type * as Leaflet from 'leaflet'

let pagaende: Promise<typeof Leaflet> | null = null

export function hamtaLeaflet(): Promise<typeof Leaflet> {
  if (!pagaende) {
    pagaende = import('./leaflet-med-kluster')
      .then((m) => m.default)
      .catch((e) => { pagaende = null; throw e })
  }
  return pagaende
}

/**
 * Leaflet och markerklustret som en egen chunk, startad tidigt (revision 2026-10-02, P1-3).
 *
 * UpptackExplorer hämtade Leaflet (145 kB) först när dess egen kod körts, så
 * kartan – och dess rutor, som är sidans LCP-element – kom ett steg senare än
 * nödvändigt. UpptackLoader anropar hamtaLeaflet() vid hydreringen, så att
 * chunken laddas parallellt med explorerns. Explorern får samma löfte.
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

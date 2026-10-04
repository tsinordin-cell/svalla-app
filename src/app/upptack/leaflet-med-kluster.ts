/**
 * Leaflet + markerklustret i EN chunk (revision 2026-10-02, P1-3).
 *
 * Importordningen här är allt: leaflet.markercluster hänger på window.L, som
 * sätts när leaflet laddas. Som två separata import() laddades klustret först
 * efter att Leaflet laddats och körts – ett extra steg på ~1–2 s på en långsam
 * telefon, eftersom begäran då köade bakom listans bilder.
 *
 * Importeras bara via import() från leaflet.ts, så den hamnar i en egen chunk
 * som laddas parallellt med UpptackExplorer.
 */
import L from 'leaflet'
import 'leaflet.markercluster'

export default L

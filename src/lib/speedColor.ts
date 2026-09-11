// Fartfärg och fartsegment — EN definition för tursidan och live-kartan.
//
// speedRuns slår ihop på varandra följande punkter med samma färg till ett
// segment. Före 2026-09-11 ritade tursidan en Leaflet-polyline PER PUNKT
// (14 400 lager för en fyratimmarstur vid 1 Hz) och live-kartan lade till ett
// nytt lager för "äldre spår" vid varje ny punkt utan att ta bort det gamla.

export type LatLng = [number, number]
export type SpeedRun = { color: string; latlngs: LatLng[]; kn: number }

/** Samma trösklar som legenden på /tur: < 2 grå, 2–8 sjöblå, 8–15 grön, > 15 bärnsten. */
export function speedColor(knots: number): string {
  if (knots < 2) return 'var(--txt3)'
  if (knots < 8) return '#1e5c82'
  if (knots < 15) return '#0f9e64'
  return '#c96e2a'
}

/**
 * Sammanhängande segment med samma fartfärg. Varje segment delar sin sista
 * punkt med nästa så linjen blir obruten. Fart per par = medel av ändarna.
 */
export function speedRuns(points: { lat: number; lng: number; speedKnots?: number | null }[]): SpeedRun[] {
  const out: SpeedRun[] = []
  for (let i = 1; i < points.length; i++) {
    const a = points[i - 1]!, b = points[i]!
    const kn = ((a.speedKnots ?? 0) + (b.speedKnots ?? 0)) / 2
    const color = speedColor(kn)
    const last = out[out.length - 1]
    if (last && last.color === color) {
      last.latlngs.push([b.lat, b.lng])
    } else {
      out.push({ color, latlngs: [[a.lat, a.lng], [b.lat, b.lng]], kn })
    }
  }
  return out
}

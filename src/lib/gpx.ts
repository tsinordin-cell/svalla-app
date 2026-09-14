export interface GpxPoint {
  lat: number
  lng: number
  ele?: number
  time?: string
  /** Fart i knop (sparad speedKnots). Exporteras som gpxtpx:speed i m/s. */
  speedKnots?: number
  /** Kurs i grader. Exporteras som gpxtpx:course. */
  heading?: number | null
}

/** GPX 1.1 har ingen <speed> i trkpt (det hade 1.0). Garmins
 *  TrackPointExtension v2 är det som Garmin, GPXSee, gpx.studio m.fl. läser:
 *  <gpxtpx:speed> i m/s och <gpxtpx:course> i grader. */
export const GPXTPX_NS = 'http://www.garmin.com/xmlschemas/TrackPointExtension/v2'
const KN_TO_MS = 0.514444

export interface GpxTrack {
  name: string
  points: GpxPoint[]
}

export function buildGpx(tracks: GpxTrack[]): string {
  const pts = (points: GpxPoint[]) =>
    points.map(p => {
      const ele = p.ele != null ? `\n        <ele>${p.ele.toFixed(1)}</ele>` : ''
      const time = p.time ? `\n        <time>${p.time}</time>` : ''
      const ext = extensions(p)
      return `      <trkpt lat="${p.lat.toFixed(6)}" lon="${p.lng.toFixed(6)}">${ele}${time}${ext}\n      </trkpt>`
    }).join('\n')

  const trks = tracks.map(t =>
    `  <trk>\n    <name>${escXml(t.name)}</name>\n    <trkseg>\n${pts(t.points)}\n    </trkseg>\n  </trk>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Svalla" xmlns="http://www.topografix.com/GPX/1/1" xmlns:gpxtpx="${GPXTPX_NS}">
${trks}
</gpx>`
}

function extensions(p: GpxPoint): string {
  const hasSpeed = p.speedKnots != null && Number.isFinite(p.speedKnots) && p.speedKnots >= 0
  const hasCourse = p.heading != null && Number.isFinite(p.heading)
  if (!hasSpeed && !hasCourse) return ''
  const speed = hasSpeed ? `\n            <gpxtpx:speed>${(p.speedKnots! * KN_TO_MS).toFixed(2)}</gpxtpx:speed>` : ''
  const course = hasCourse ? `\n            <gpxtpx:course>${((Math.round(p.heading!) % 360) + 360) % 360}</gpxtpx:course>` : ''
  return `\n        <extensions>\n          <gpxtpx:TrackPointExtension>${speed}${course}\n          </gpxtpx:TrackPointExtension>\n        </extensions>`
}

function escXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

export function parseGpx(xml: string): GpxTrack[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')
  const tracks: GpxTrack[] = []

  doc.querySelectorAll('trk').forEach(trk => {
    const name = trk.querySelector('name')?.textContent?.trim() ?? 'Import'
    const points: GpxPoint[] = []
    trk.querySelectorAll('trkpt').forEach(pt => {
      const lat = parseFloat(pt.getAttribute('lat') ?? '0')
      const lng = parseFloat(pt.getAttribute('lon') ?? '0')
      const ele = pt.querySelector('ele')?.textContent
      const time = pt.querySelector('time')?.textContent ?? undefined
      if (!isNaN(lat) && !isNaN(lng)) {
        points.push({ lat, lng, ele: ele ? parseFloat(ele) : undefined, time })
      }
    })
    if (points.length > 0) tracks.push({ name, points })
  })

  return tracks
}

export function gpxStats(points: GpxPoint[]): { distNm: number; durationMin: number; startTime: string | null } {
  if (points.length < 2) return { distNm: 0, durationMin: 0, startTime: points[0]?.time ?? null }

  let distNm = 0
  for (let i = 1; i < points.length; i++) {
    distNm += haversineNm(points[i - 1]!.lat, points[i - 1]!.lng, points[i]!.lat, points[i]!.lng)
  }

  let durationMin = 0
  const first = points[0]!
  const lastPt = points[points.length - 1]!
  const t0 = first.time ? new Date(first.time).getTime() : null
  const t1 = lastPt.time ? new Date(lastPt.time).getTime() : null
  if (t0 && t1) durationMin = Math.round((t1 - t0) / 60000)

  return { distNm: Math.round(distNm * 10) / 10, durationMin, startTime: first.time ?? null }
}

function haversineNm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 3440.065
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * Math.sin(dLon / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export function simplifyPoints(pts: GpxPoint[], maxCount = 300): GpxPoint[] {
  if (pts.length <= maxCount) return pts
  const step = Math.ceil(pts.length / maxCount)
  return pts.filter((_, i) => i % step === 0 || i === pts.length - 1)
}

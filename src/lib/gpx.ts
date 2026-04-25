export interface GpxPoint {
  lat: number
  lng: number
  ele?: number
  time?: string
}

export interface GpxTrack {
  name: string
  points: GpxPoint[]
}

export function buildGpx(tracks: GpxTrack[]): string {
  const pts = (points: GpxPoint[]) =>
    points.map(p => {
      const ele = p.ele != null ? `\n        <ele>${p.ele.toFixed(1)}</ele>` : ''
      const time = p.time ? `\n        <time>${p.time}</time>` : ''
      return `      <trkpt lat="${p.lat.toFixed(6)}" lon="${p.lng.toFixed(6)}">${ele}${time}\n      </trkpt>`
    }).join('\n')

  const trks = tracks.map(t =>
    `  <trk>\n    <name>${escXml(t.name)}</name>\n    <trkseg>\n${pts(t.points)}\n    </trkseg>\n  </trk>`
  ).join('\n')

  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="Svalla" xmlns="http://www.topografix.com/GPX/1/1">
${trks}
</gpx>`
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
    distNm += haversineNm(points[i - 1].lat, points[i - 1].lng, points[i].lat, points[i].lng)
  }

  let durationMin = 0
  const t0 = points[0].time ? new Date(points[0].time!).getTime() : null
  const t1 = points[points.length - 1].time ? new Date(points[points.length - 1].time!).getTime() : null
  if (t0 && t1) durationMin = Math.round((t1 - t0) / 60000)

  return { distNm: Math.round(distNm * 10) / 10, durationMin, startTime: points[0]?.time ?? null }
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

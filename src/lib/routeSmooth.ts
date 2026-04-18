/**
 * Route smoothing and anomaly removal for GPS tracks.
 *
 * Pipeline for saved route_points:
 *  1. removeSpeedOutliers  — drop points implying impossible vessel speed
 *  2. douglasPeucker       — simplify shape, remove micro-jitter
 *  3. uniform cap          — final safety clamp to maxPoints
 *
 * Used in /spara/page.tsx before persisting route_points to the DB.
 * Used in RouteMapSVG for display-time segment break detection.
 */

// ── Haversine distance in nautical miles ──────────────────────────────────────
function distNM(a: { lat: number; lng: number }, b: { lat: number; lng: number }): number {
  const R    = 3440.065
  const dLat = (b.lat - a.lat) * Math.PI / 180
  const dLng = (b.lng - a.lng) * Math.PI / 180
  const la1  = a.lat * Math.PI / 180
  const la2  = b.lat * Math.PI / 180
  const h    = Math.sin(dLat / 2) ** 2 + Math.cos(la1) * Math.cos(la2) * Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h))
}

// ── Euclidean distance in degrees (for D-P comparisons — cheap, no trig) ──────
function degDist(
  p: { lat: number; lng: number },
  a: { lat: number; lng: number },
  b: { lat: number; lng: number },
): number {
  const dx = b.lng - a.lng
  const dy = b.lat - a.lat
  if (dx === 0 && dy === 0) {
    return Math.sqrt((p.lng - a.lng) ** 2 + (p.lat - a.lat) ** 2)
  }
  const t  = ((p.lng - a.lng) * dx + (p.lat - a.lat) * dy) / (dx * dx + dy * dy)
  const tc = Math.max(0, Math.min(1, t))
  return Math.sqrt((p.lng - a.lng - tc * dx) ** 2 + (p.lat - a.lat - tc * dy) ** 2)
}

// ── 1. Speed-outlier removal ──────────────────────────────────────────────────
/**
 * Remove GPS points that would imply an impossible vessel speed between
 * consecutive accepted points.  Uses recordedAt timestamps.
 *
 * maxKnots: 30 kn is well above any real sailboat or motorboat top speed
 * in Swedish coastal waters and catches teleport ghosts that slip past
 * the live isGpsAnomaly check (45 kn threshold).
 */
export function removeSpeedOutliers<T extends { lat: number; lng: number; recordedAt: string }>(
  points: T[],
  maxKnots = 30,
): T[] {
  if (points.length < 2) return points
  const result: T[] = [points[0]]
  for (let i = 1; i < points.length; i++) {
    const prev = result[result.length - 1]
    const curr = points[i]
    const dtH  = (new Date(curr.recordedAt).getTime() - new Date(prev.recordedAt).getTime()) / 3_600_000
    if (dtH <= 0) continue
    const implied = distNM(prev, curr) / dtH
    if (implied <= maxKnots) result.push(curr)
    // else: GPS ghost — discard
  }
  return result
}

// ── 2. Douglas-Peucker simplification ────────────────────────────────────────
/**
 * Reduces point count while preserving route shape.
 * epsilon: max perpendicular deviation tolerated, in degrees (~22 m at lat 60°)
 */
export function douglasPeucker<T extends { lat: number; lng: number }>(
  points: T[],
  epsilon = 0.0002,
): T[] {
  if (points.length <= 2) return points

  let maxDist = 0
  let maxIdx  = 0
  const first = points[0]
  const last  = points[points.length - 1]

  for (let i = 1; i < points.length - 1; i++) {
    const d = degDist(points[i], first, last)
    if (d > maxDist) { maxDist = d; maxIdx = i }
  }

  if (maxDist > epsilon) {
    const left  = douglasPeucker(points.slice(0, maxIdx + 1), epsilon)
    const right = douglasPeucker(points.slice(maxIdx), epsilon)
    return [...left.slice(0, -1), ...right]
  }
  return [first, last]
}

// ── 3. Full build pipeline ────────────────────────────────────────────────────
/**
 * Converts a raw GpsPoint array (full tracking data) into a clean,
 * compact route_points array ready for DB storage.
 *
 * Steps: speed-outlier removal → Douglas-Peucker → uniform cap
 */
export function buildRoutePoints(
  raw: Array<{ lat: number; lng: number; recordedAt: string }>,
  maxPoints = 120,
): { lat: number; lng: number }[] | null {
  if (raw.length < 2) return null

  // 1. Remove speed outliers (30 kn threshold)
  const cleaned = removeSpeedOutliers(raw, 30)
  if (cleaned.length < 2) return null

  // 2. Douglas-Peucker — thin the route while preserving shape
  const simplified = douglasPeucker(cleaned, 0.0002)
  if (simplified.length < 2) return null

  const toFixed = (p: { lat: number; lng: number }) => ({
    lat: parseFloat(p.lat.toFixed(6)),
    lng: parseFloat(p.lng.toFixed(6)),
  })

  // 3. If within cap, return as-is
  if (simplified.length <= maxPoints) {
    return simplified.map(toFixed)
  }

  // 4. Uniform down-sample to maxPoints
  const step    = Math.floor(simplified.length / maxPoints)
  const sampled = simplified.filter((_, i) => i % step === 0).map(toFixed)
  const last    = toFixed(simplified[simplified.length - 1])
  if (sampled[sampled.length - 1]?.lat !== last.lat) sampled.push(last)

  return sampled
}

// ── Display: split polyline at anomalous segments ─────────────────────────────
/**
 * Splits a route into continuous sub-segments, inserting breaks wherever a
 * single step is more than `factor` times the median step length.
 *
 * This prevents rendered polylines from cutting across land/islands when a
 * stored route_points array contains occasional outlier jumps.
 *
 * Uses degree distance (cheap) — accurate enough for visual comparison.
 */
export function splitAtAnomalies(
  pts: { lat: number; lng: number }[],
  factor = 8,
): { lat: number; lng: number }[][] {
  if (pts.length < 2) return pts.length === 1 ? [[pts[0]]] : []

  // Segment lengths in degrees
  const lens: number[] = []
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].lng - pts[i - 1].lng
    const dy = pts[i].lat - pts[i - 1].lat
    lens.push(Math.sqrt(dx * dx + dy * dy))
  }

  // Median segment length
  const sorted = [...lens].sort((a, b) => a - b)
  const median = sorted[Math.floor(sorted.length / 2)]
  const threshold = median * factor

  // Split
  const segments: { lat: number; lng: number }[][] = []
  let current: { lat: number; lng: number }[] = [pts[0]]

  for (let i = 1; i < pts.length; i++) {
    if (lens[i - 1] > threshold && median > 0) {
      if (current.length >= 2) segments.push(current)
      current = [pts[i]]
    } else {
      current.push(pts[i])
    }
  }
  if (current.length >= 2) segments.push(current)
  else if (current.length === 1 && segments.length > 0) {
    segments[segments.length - 1].push(current[0])
  }

  return segments.length > 0 ? segments : [pts]
}

/**
 * Build an SVG path `d` attribute from a point array, inserting M/L breaks
 * at anomalous jumps so the rendered line never teleports across land.
 */
export function buildSvgPath(
  pts: { lat: number; lng: number }[],
  toX: (lng: number) => number,
  toY: (lat: number) => number,
  factor = 8,
): string {
  const segs = splitAtAnomalies(pts, factor)
  return segs
    .filter(s => s.length >= 2)
    .map(seg =>
      seg
        .map((p, i) => `${i === 0 ? 'M' : 'L'}${toX(p.lng).toFixed(1)},${toY(p.lat).toFixed(1)}`)
        .join(' '),
    )
    .join(' ')
}

/**
 * verify-routes.ts — Validera att alla pre-computed rutter inte korsar land
 *
 * Kör med: npx tsx scripts/verify-routes.ts
 */

import * as turf from '@turf/turf'
import coastlineData from '../src/lib/data/swedish-coastline.json'
import routesData from '../src/lib/data/precomputed-routes.json'

const EARTH_R_KM = 6371
const DEG_TO_RAD = Math.PI / 180

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number): number {
  const toRad = (deg: number) => deg * DEG_TO_RAD
  const dLat = toRad(lat2 - lat1)
  const dLng = toRad(lng2 - lng1)
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
  return 2 * EARTH_R_KM * Math.asin(Math.sqrt(a))
}

function pointOnLand(lat: number, lng: number): boolean {
  const point = turf.point([lng, lat])

  for (const feature of (coastlineData as any).features) {
    if (feature.geometry.type === 'Polygon') {
      const polygon = turf.polygon(feature.geometry.coordinates)
      if (turf.booleanPointInPolygon(point, polygon)) {
        return true
      }
    }
  }

  return false
}

function segmentCrossesLand(lat1: number, lng1: number, lat2: number, lng2: number): boolean {
  if (pointOnLand(lat1, lng1) || pointOnLand(lat2, lng2)) {
    return true
  }

  const line = turf.lineString([[lng1, lat1], [lng2, lat2]])

  for (const feature of (coastlineData as any).features) {
    if (feature.geometry.type === 'Polygon') {
      const polygon = turf.polygon(feature.geometry.coordinates)
      const intersects = turf.lineIntersect(line, polygon)
      if (intersects.features && intersects.features.length > 0) {
        return true
      }
    }
  }

  return false
}

function validatePath(path: Array<[number, number]>): {
  ok: boolean
  crossesAt?: string
} {
  for (let i = 0; i < path.length - 1; i++) {
    const [lat1, lng1] = path[i]!
    const [lat2, lng2] = path[i + 1]!

    if (segmentCrossesLand(lat1, lng1, lat2, lng2)) {
      return {
        ok: false,
        crossesAt: `segment ${i}-${i + 1}`,
      }
    }
  }

  return { ok: true }
}

async function main() {
  console.log('=== Sjöleds-ruttverifiering ===\n')
  console.log(`Coastline polygons: ${(coastlineData as any).features.length}`)
  console.log(`Pre-computed routes: ${routesData.routes.length}\n`)

  let passCount = 0
  let failCount = 0
  const failures: string[] = []

  for (const route of routesData.routes) {
    const path: Array<[number, number]> = [
      [route.from.lat, route.from.lng],
      [route.to.lat, route.to.lng],
    ]

    // Om fullständig path är definierad, använd den
    if (route.waypoints && route.waypoints.length > 0) {
      path.splice(1, 0, ...(route.waypoints as [number, number][]))
    }

    const validation = validatePath(path)

    if (validation.ok) {
      const distKm = path.length > 1
        ? path.reduce((sum, p, i) => {
            if (i === 0) return 0
            return sum + haversineKm(path[i - 1]![0], path[i - 1]![1], p[0], p[1])
          }, 0)
        : 0

      console.log(`✓ ${route.from.name} → ${route.to.name}`)
      console.log(`  Distans: ${distKm.toFixed(1)} km, Waypoints: ${path.length}`)
      passCount++
    } else {
      console.log(`✗ ${route.from.name} → ${route.to.name}`)
      console.log(`  KORSAR LAND vid ${validation.crossesAt}`)
      failCount++
      failures.push(`${route.id}: ${validation.crossesAt}`)
    }
  }

  console.log(`\n=== RESULTAT ===`)
  console.log(`Passerade: ${passCount}`)
  console.log(`Misslyckades: ${failCount}`)

  if (failCount > 0) {
    console.log(`\nFEL ROUTES:`)
    failures.forEach(f => console.log(`  - ${f}`))
    process.exit(1)
  } else {
    console.log(`\n✓ ALLA RUTTER VALIDERADE (0 land-överlap)`)
    process.exit(0)
  }
}

main().catch(err => {
  console.error('Error:', err)
  process.exit(1)
})

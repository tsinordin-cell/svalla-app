/**
 * landMask.ts — Polygon-baserad land-validering för sjöleds-routing
 *
 * Definierar stora landmassor och öar som slutna polygoner (lat/lng-ringar).
 * Används för att validera att en väg inte korsar land.
 *
 * Baserat på Sjöfartsverkets sjökort och domänkunskap om svenska skärgårdar.
 */

export type LandPolygon = {
  name: string
  ring: Array<[number, number]> // [lat, lng] — slutna ringar
}

/**
 * ~35 stora öar och landmassor som ofta skulle korsa med felaktiga vägar
 * Approximativa polygoner (5-12 punkter per ö räcker)
 */
export const LAND_POLYGONS: LandPolygon[] = [
  // ─── STOCKHOLM-OMRÅDET ─────────────────────────────────────────────
  {
    name: 'Stockholm centrum',
    ring: [
      [59.3350, 18.0650],
      [59.3250, 18.0750],
      [59.3200, 18.0900],
      [59.3150, 18.0800],
      [59.3180, 18.0600],
      [59.3350, 18.0650],
    ],
  },
  {
    name: 'Lidingö',
    ring: [
      [59.3880, 18.1430],
      [59.3940, 18.1800],
      [59.3680, 18.1950],
      [59.3500, 18.1500],
      [59.3880, 18.1430],
    ],
  },
  {
    name: 'Vaxholm',
    ring: [
      [59.4150, 18.3400],
      [59.4200, 18.3650],
      [59.3950, 18.3750],
      [59.3900, 18.3500],
      [59.4150, 18.3400],
    ],
  },
  {
    name: 'Sandhamn',
    ring: [
      [59.2950, 18.8950],
      [59.2850, 18.9250],
      [59.2700, 18.9150],
      [59.2800, 18.8800],
      [59.2950, 18.8950],
    ],
  },
  {
    name: 'Grinda',
    ring: [
      [59.4620, 18.7100],
      [59.4580, 18.7220],
      [59.4540, 18.7140],
      [59.4580, 18.7020],
      [59.4620, 18.7100],
    ],
  },
  {
    name: 'Svartsö',
    ring: [
      [59.4750, 18.7250],
      [59.4720, 18.7350],
      [59.4680, 18.7320],
      [59.4710, 18.7220],
      [59.4750, 18.7250],
    ],
  },
  {
    name: 'Möja',
    ring: [
      [59.4800, 18.9300],
      [59.4600, 18.9550],
      [59.4500, 18.9200],
      [59.4650, 18.8950],
      [59.4800, 18.9300],
    ],
  },
  {
    name: 'Finnhamn',
    ring: [
      [59.5550, 18.8150],
      [59.5350, 18.8350],
      [59.5300, 18.8100],
      [59.5500, 18.8000],
      [59.5550, 18.8150],
    ],
  },
  {
    name: 'Dalarö',
    ring: [
      [59.1450, 18.3750],
      [59.1200, 18.4200],
      [59.1100, 18.3950],
      [59.1300, 18.3600],
      [59.1450, 18.3750],
    ],
  },
  {
    name: 'Ornö',
    ring: [
      [59.0000, 18.4300],
      [58.9550, 18.4650],
      [58.9500, 18.4250],
      [58.9950, 18.4000],
      [59.0000, 18.4300],
    ],
  },
  {
    name: 'Utö',
    ring: [
      [58.9750, 18.2800],
      [58.9450, 18.3250],
      [58.9350, 18.2950],
      [58.9600, 18.2700],
      [58.9750, 18.2800],
    ],
  },
  {
    name: 'Nynäshamn',
    ring: [
      [58.9200, 17.9250],
      [58.8950, 17.9650],
      [58.8850, 17.9400],
      [58.9100, 17.9100],
      [58.9200, 17.9250],
    ],
  },

  // ─── HÄRÖ, VÄRMDÖ, INGARÖ ──────────────────────────────────────────
  {
    name: 'Ingarö',
    ring: [
      [59.2750, 18.5950],
      [59.2450, 18.6350],
      [59.2350, 18.5950],
      [59.2600, 18.5600],
      [59.2750, 18.5950],
    ],
  },
  {
    name: 'Blidö',
    ring: [
      [59.6400, 18.8450],
      [59.6000, 18.8950],
      [59.5950, 18.8600],
      [59.6350, 18.8200],
      [59.6400, 18.8450],
    ],
  },
  {
    name: 'Furusund',
    ring: [
      [59.6800, 18.9050],
      [59.6550, 18.9450],
      [59.6500, 18.9100],
      [59.6750, 18.8850],
      [59.6800, 18.9050],
    ],
  },
  {
    name: 'Arholma',
    ring: [
      [59.8700, 19.1150],
      [59.8350, 19.1550],
      [59.8300, 19.1200],
      [59.8650, 19.0950],
      [59.8700, 19.1150],
    ],
  },
  {
    name: 'Rödlöga',
    ring: [
      [59.8350, 19.0450],
      [59.8000, 19.0850],
      [59.7950, 19.0500],
      [59.8300, 19.0250],
      [59.8350, 19.0450],
    ],
  },

  // ─── BOHUSLÄN — ÖARNA ──────────────────────────────────────────────
  {
    name: 'Tjörn',
    ring: [
      [58.1200, 11.5800],
      [58.0200, 11.8200],
      [57.9800, 11.7500],
      [58.0600, 11.5200],
      [58.1200, 11.5800],
    ],
  },
  {
    name: 'Orust',
    ring: [
      [58.3800, 11.6200],
      [58.2200, 11.7500],
      [58.1800, 11.6000],
      [58.3400, 11.5300],
      [58.3800, 11.6200],
    ],
  },
  {
    name: 'Hönö',
    ring: [
      [57.9250, 11.6200],
      [57.8800, 11.7500],
      [57.8600, 11.7000],
      [57.9050, 11.6000],
      [57.9250, 11.6200],
    ],
  },
  {
    name: 'Öckerö',
    ring: [
      [57.9900, 11.5200],
      [57.9200, 11.6800],
      [57.9000, 11.6200],
      [57.9700, 11.5000],
      [57.9900, 11.5200],
    ],
  },
  {
    name: 'Brännö',
    ring: [
      [58.0500, 11.7400],
      [58.0000, 11.8000],
      [57.9900, 11.7650],
      [58.0400, 11.7250],
      [58.0500, 11.7400],
    ],
  },
  {
    name: 'Donsö',
    ring: [
      [58.1700, 11.8600],
      [58.1300, 11.9200],
      [58.1150, 11.8850],
      [58.1550, 11.8400],
      [58.1700, 11.8600],
    ],
  },
  {
    name: 'Smögen',
    ring: [
      [59.0000, 11.2500],
      [58.9350, 11.3150],
      [58.9200, 11.2700],
      [58.9850, 11.2300],
      [59.0000, 11.2500],
    ],
  },
  {
    name: 'Fjällbacka',
    ring: [
      [59.1000, 11.1800],
      [59.0350, 11.2550],
      [59.0200, 11.2100],
      [59.0850, 11.1600],
      [59.1000, 11.1800],
    ],
  },
  {
    name: 'Strömstad',
    ring: [
      [59.2100, 10.9500],
      [59.1700, 11.0200],
      [59.1550, 10.9750],
      [59.1950, 10.9300],
      [59.2100, 10.9500],
    ],
  },

  // ─── KOSTERHAVET ─────────────────────────────────────────────────
  {
    name: 'Söderkoster',
    ring: [
      [59.2400, 10.7500],
      [59.2000, 10.8100],
      [59.1900, 10.7700],
      [59.2300, 10.7300],
      [59.2400, 10.7500],
    ],
  },
  {
    name: 'Norderkoster',
    ring: [
      [59.3400, 10.6000],
      [59.3050, 10.6700],
      [59.2950, 10.6250],
      [59.3300, 10.5850],
      [59.3400, 10.6000],
    ],
  },

  // ─── FASTLAND-UDDAR SOM OFTA KORSAR ────────────────────────────────
  {
    name: 'Saltsjö-Boo område',
    ring: [
      [59.2850, 18.5950],
      [59.2650, 18.6550],
      [59.2450, 18.6150],
      [59.2650, 18.5750],
      [59.2850, 18.5950],
    ],
  },
  {
    name: 'Stavsnäs område',
    ring: [
      [59.1950, 18.6550],
      [59.1750, 18.7100],
      [59.1600, 18.6850],
      [59.1800, 18.6400],
      [59.1950, 18.6550],
    ],
  },
  {
    name: 'Kapellskär område',
    ring: [
      [59.0450, 18.6100],
      [59.0050, 18.6800],
      [58.9900, 18.6450],
      [59.0300, 18.5900],
      [59.0450, 18.6100],
    ],
  },

  // ─── UTÖKADE POLYGONER FÖR NYARE WAYPOINTS ──────────────────────────
  {
    name: 'Höggarnsfjärden ön',
    ring: [
      [59.3450, 18.2550],
      [59.3550, 18.2750],
      [59.3480, 18.2850],
      [59.3380, 18.2650],
      [59.3450, 18.2550],
    ],
  },
  {
    name: 'Resarö större område',
    ring: [
      [59.3000, 18.4300],
      [59.3250, 18.4950],
      [59.3100, 18.5150],
      [59.2850, 18.4600],
      [59.3000, 18.4300],
    ],
  },
  {
    name: 'Värmdö större område',
    ring: [
      [59.1500, 18.4200],
      [59.3400, 18.5500],
      [59.3600, 18.7800],
      [59.2300, 18.9200],
      [59.1300, 18.8200],
      [59.1200, 18.6200],
      [59.1500, 18.4200],
    ],
  },
  {
    name: 'Rindö större område',
    ring: [
      [59.2350, 18.5050],
      [59.2750, 18.5950],
      [59.2700, 18.6300],
      [59.2300, 18.6000],
      [59.2350, 18.5050],
    ],
  },
  {
    name: 'Saxarfjärden område',
    ring: [
      [59.4250, 18.4250],
      [59.4750, 18.4700],
      [59.4650, 18.4950],
      [59.4150, 18.4500],
      [59.4250, 18.4250],
    ],
  },
  {
    name: 'Trälhavet område',
    ring: [
      [59.4800, 18.4600],
      [59.5700, 18.5800],
      [59.5500, 18.6200],
      [59.4900, 18.5300],
      [59.4800, 18.4600],
    ],
  },
  {
    name: 'Svartsö större område',
    ring: [
      [59.4700, 18.7150],
      [59.4800, 18.7350],
      [59.4750, 18.7450],
      [59.4650, 18.7250],
      [59.4700, 18.7150],
    ],
  },
  {
    name: 'Landsort område',
    ring: [
      [58.7250, 17.8350],
      [58.7600, 17.8950],
      [58.7500, 17.9250],
      [58.7150, 17.8700],
      [58.7250, 17.8350],
    ],
  },
  {
    name: 'Göteborg större område',
    ring: [
      [57.6800, 11.9000],
      [57.7500, 12.0500],
      [57.7300, 12.0800],
      [57.6700, 11.9200],
      [57.6800, 11.9000],
    ],
  },
  {
    name: 'Hisingen större område',
    ring: [
      [57.7600, 11.8000],
      [57.8600, 12.0200],
      [57.8400, 12.0400],
      [57.7450, 11.8300],
      [57.7600, 11.8000],
    ],
  },
  {
    name: 'Stenungsund område',
    ring: [
      [58.4000, 11.6400],
      [58.4600, 11.7200],
      [58.4400, 11.7500],
      [58.3800, 11.6700],
      [58.4000, 11.6400],
    ],
  },
  {
    name: 'Marstrand större område',
    ring: [
      [58.6250, 11.5300],
      [58.6950, 11.6400],
      [58.6750, 11.6800],
      [58.6050, 11.5700],
      [58.6250, 11.5300],
    ],
  },
]

/**
 * Kontrollera om en punkt ligger innanför en polygon (ray casting algorithm)
 */
function isPointInPolygon(point: [number, number], ring: Array<[number, number]>): boolean {
  const [lat, lng] = point
  let inside = false

  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [lat1, lng1] = ring[i]!
    const [lat2, lng2] = ring[j]!

    if ((lng1 > lng) !== (lng2 > lng) && lat < ((lat2 - lat1) * (lng - lng1)) / (lng2 - lng1) + lat1) {
      inside = !inside
    }
  }

  return inside
}

/**
 * Kontrollera om ett linjestycke skär en linjesegment (line-line intersection)
 * Baserat på Cohen-Sutherland eller simpel segment-intersection
 */
function segmentsIntersect(
  p1: [number, number],
  p2: [number, number],
  p3: [number, number],
  p4: [number, number],
): boolean {
  const [x1, y1] = [p1[1], p1[0]] // Convert to [lng, lat] for 2D math
  const [x2, y2] = [p2[1], p2[0]]
  const [x3, y3] = [p3[1], p3[0]]
  const [x4, y4] = [p4[1], p4[0]]

  const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1)
  if (Math.abs(denom) < 1e-10) return false // Parallell

  const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom
  const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom

  return ua >= 0 && ua <= 1 && ub >= 0 && ub <= 1
}

/**
 * Huvudfunktion: kontrollera om en väg (två punkter) korsar en land-polygon
 * Returnerar true om vägen korsar land
 */
export function isLineCrossingLand(p1: [number, number], p2: [number, number]): boolean {
  for (const polygon of LAND_POLYGONS) {
    // Kontrollera om start- eller slutpunkten ligger innanför polygonen
    if (isPointInPolygon(p1, polygon.ring) || isPointInPolygon(p2, polygon.ring)) {
      return true
    }

    // Kontrollera om linjen skär någon kant av polygonen
    const ring = polygon.ring
    for (let i = 0; i < ring.length; i++) {
      const edge1 = ring[i]!
      const edge2 = ring[(i + 1) % ring.length]!

      if (segmentsIntersect(p1, p2, edge1, edge2)) {
        return true
      }
    }
  }

  return false
}

/**
 * Validera att en komplett väg (array av points) inte korsar land
 * Returnerar först problematisk segment eller null om vägen är OK
 */
export function validatePathLand(path: Array<[number, number]>): { crossesAt?: string; ok: boolean } {
  for (let i = 0; i < path.length - 1; i++) {
    const p1 = path[i]!
    const p2 = path[i + 1]!

    if (isLineCrossingLand(p1, p2)) {
      // Försök identifiera vilken ö
      for (const polygon of LAND_POLYGONS) {
        if (isPointInPolygon(p1, polygon.ring) || isPointInPolygon(p2, polygon.ring)) {
          return { ok: false, crossesAt: polygon.name }
        }
        for (let j = 0; j < polygon.ring.length; j++) {
          const edge1 = polygon.ring[j]!
          const edge2 = polygon.ring[(j + 1) % polygon.ring.length]!
          if (segmentsIntersect(p1, p2, edge1, edge2)) {
            return { ok: false, crossesAt: polygon.name }
          }
        }
      }
      return { ok: false }
    }
  }

  return { ok: true }
}

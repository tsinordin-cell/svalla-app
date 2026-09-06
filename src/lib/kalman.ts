// Kalman filter for GPS smoothing
// Reduces jitter from GPS measurements while preserving motion

/**
 * Simple 1D Kalman filter
 * Used to smooth individual latitude and longitude coordinates
 */
export class KalmanFilter {
  private q: number  // process noise (how much we expect position to change)
  private r: number  // measurement noise (GPS uncertainty)
  private p: number  // estimation error covariance
  private x: number  // estimated value
  private initialized: boolean

  constructor(q = 0.001, r = 0.5) {
    this.q = q
    this.r = r
    this.p = 1   // initial guess at covariance
    this.x = 0
    this.initialized = false
  }

  /**
   * Update filter with a new measurement
   * Returns smoothed estimate
   */
  update(measurement: number): number {
    // Predict phase
    this.p = this.p + this.q

    // Update phase
    const k = this.p / (this.p + this.r)  // Kalman gain
    if (!this.initialized) {
      this.x = measurement
      this.initialized = true
    } else {
      this.x = this.x + k * (measurement - this.x)
    }
    this.p = (1 - k) * this.p

    return this.x
  }

  reset(): void {
    this.p = 1
    this.x = 0
    this.initialized = false
  }
}

/**
 * 2D GPS Kalman filter
 * Smooths both latitude and longitude independently
 */
export class GpsKalmanFilter {
  private latFilter: KalmanFilter
  private lngFilter: KalmanFilter

  constructor(q = 0.001, r = 0.5) {
    this.latFilter = new KalmanFilter(q, r)
    this.lngFilter = new KalmanFilter(q, r)
  }

  /**
   * Update both coordinates
   * Returns smoothed lat/lng pair
   */
  update(lat: number, lng: number): { lat: number; lng: number } {
    return {
      lat: this.latFilter.update(lat),
      lng: this.lngFilter.update(lng),
    }
  }

  reset(): void {
    this.latFilter.reset()
    this.lngFilter.reset()
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Konstant-hastighets-Kalman i 2D (beslut Tom 2026-09-05, "bli bäst")
//
// VARFÖR: GpsKalmanFilter ovan filtrerar lat och lng var för sig, utan någon
// hastighet i modellen. Ett sådant filter kan bara välja mellan brus och
// släpning — och med q=0,001/r=0,5 (gain ~0,044) valde det släpning: det
// utjämnade läget ligger ~23 sampel efter. Uppmätt i simulering
// (slingrande led, gir var 150:e meter, 15 min, 1 Hz):
//   dagens filter   6 kn: 83 % av sann distans, båten visas 76 m fel
//                  12 kn: 77 % av sann distans, 141 m fel
// Det här filtret har hastighet i tillståndet (x, y, vx, vy). På konstant
// kurs och fart är det lagfritt, och i girar följer det med. Samma
// simulering: 105–115 % distans (brus ±5–15 m), 2–9 m fel.
//
// Mätbruset R tas från telefonens rapporterade accuracy per punkt — det är
// den bästa uppgift vi har om hur mycket en enskild fix får vägas.
// Processbruset styrs av hur hårt en båt rimligen accelererar (m/s²).
// ─────────────────────────────────────────────────────────────────────────────

type Mat = number[][]
const matMul = (A: Mat, B: Mat): Mat => A.map((row, i) => B[0]!.map((_, j) => row.reduce((s, _, k) => s + A[i]![k]! * B[k]![j]!, 0)))
const matT = (A: Mat): Mat => A[0]!.map((_, j) => A.map(r => r[j]!))
const matAdd = (A: Mat, B: Mat): Mat => A.map((r, i) => r.map((v, j) => v + B[i]![j]!))
const eye4: Mat = [[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]

export type CvKalmanOptions = {
  /** Std för oväntad acceleration, m/s². 1,0 täcker gir och gasförändring i fritidsbåt. */
  accelSigma?: number
  /** Golv för mätbrus i meter — telefoner rapporterar ibland orimligt låg accuracy. */
  minAccuracyM?: number
  /** Startar om filtret om det gått längre än så här mellan två fixar (s). */
  resetAfterSeconds?: number
}

export class CvGpsKalmanFilter {
  private readonly accelSigma: number
  private readonly minAccuracyM: number
  private readonly resetAfterSeconds: number
  private origin: { lat: number; lng: number; cosLat: number } | null = null
  private x: number[] = [0, 0, 0, 0]   // [x m öst, y m norr, vx, vy]
  private P: Mat = eye4.map(r => r.map(v => v * 1e4))
  private lastTs: number | null = null

  constructor(opts: CvKalmanOptions = {}) {
    this.accelSigma = opts.accelSigma ?? 1.0
    this.minAccuracyM = opts.minAccuracyM ?? 3
    this.resetAfterSeconds = opts.resetAfterSeconds ?? 30
  }

  /**
   * @param lat,lng  rå fix
   * @param accuracyM telefonens rapporterade accuracy (m)
   * @param tsMs     fixens tidsstämpel (ms) — dt räknas härifrån
   */
  update(lat: number, lng: number, accuracyM: number, tsMs: number): { lat: number; lng: number; speedMs: number } {
    const dtRaw = this.lastTs == null ? 0 : (tsMs - this.lastTs) / 1000
    if (!this.origin || dtRaw > this.resetAfterSeconds || dtRaw < 0) {
      this.reset()
      this.origin = { lat, lng, cosLat: Math.cos(lat * Math.PI / 180) }
      this.x = [0, 0, 0, 0]
      this.lastTs = tsMs
      return { lat, lng, speedMs: 0 }
    }
    const dt = Math.max(dtRaw, 0.1)
    this.lastTs = tsMs

    const [zx, zy] = this.toLocal(lat, lng)

    // Predict
    const F: Mat = [[1,0,dt,0],[0,1,0,dt],[0,0,1,0],[0,0,0,1]]
    const q = this.accelSigma * this.accelSigma
    const d4 = dt ** 4 / 4 * q, d3 = dt ** 3 / 2 * q, d2 = dt * dt * q
    const Q: Mat = [[d4,0,d3,0],[0,d4,0,d3],[d3,0,d2,0],[0,d3,0,d2]]
    const xp = [this.x[0]! + dt * this.x[2]!, this.x[1]! + dt * this.x[3]!, this.x[2]!, this.x[3]!]
    const Pp = matAdd(matMul(matMul(F, this.P), matT(F)), Q)

    // Update (H = [[1,0,0,0],[0,1,0,0]])
    const r = Math.max(accuracyM, this.minAccuracyM); const r2 = r * r
    const S: Mat = [[Pp[0]![0]! + r2, Pp[0]![1]!], [Pp[1]![0]!, Pp[1]![1]! + r2]]
    const det = S[0]![0]! * S[1]![1]! - S[0]![1]! * S[1]![0]!
    const Si: Mat = [[S[1]![1]! / det, -S[0]![1]! / det], [-S[1]![0]! / det, S[0]![0]! / det]]
    const PHt: Mat = Pp.map(row => [row[0]!, row[1]!])
    const K = matMul(PHt, Si)
    const inn = [zx - xp[0]!, zy - xp[1]!]
    this.x = xp.map((v, i) => v + K[i]![0]! * inn[0]! + K[i]![1]! * inn[1]!)
    const KH: Mat = K.map(row => [row[0]!, row[1]!, 0, 0])
    this.P = matMul(eye4.map((row, i) => row.map((v, j) => v - KH[i]![j]!)), Pp)

    const { lat: fl, lng: fg } = this.toGeo(this.x[0]!, this.x[1]!)
    return { lat: fl, lng: fg, speedMs: Math.hypot(this.x[2]!, this.x[3]!) }
  }

  reset(): void {
    this.origin = null
    this.x = [0, 0, 0, 0]
    this.P = eye4.map(r => r.map(v => v * 1e4))
    this.lastTs = null
  }

  private toLocal(lat: number, lng: number): [number, number] {
    const o = this.origin!
    return [(lng - o.lng) * 111320 * o.cosLat, (lat - o.lat) * 111320]
  }
  private toGeo(x: number, y: number): { lat: number; lng: number } {
    const o = this.origin!
    return { lat: o.lat + y / 111320, lng: o.lng + x / (111320 * o.cosLat) }
  }
}

// GpsPipeline — EN GPS-kedja för /spara (live) och gpsReplay (efterhand).
//
// Bakgrund: t.o.m. 2026-09-10 kördes kedjan i /spara:s GPS-callback och
// SPEGLADES i replayTrack. Speglingen bevisades stämma på Toms fälttest
// (tur 15b47ab2: 15,03 NM / 49,1 kn / 76,7 kn, se gpsPipeline.test.ts),
// och därefter slogs de ihop hit så att de inte kan glida isär.
//
// Stegen, per rå fix:
//   1. accuracy > maxAccuracyM         → kastas (rejectedAccuracy)
//   2. shouldRejectAsAnomaly rå→rå, tak SPEED_CEILING_KNOTS, återförankring
//      efter ANOMALY_REANCHOR_AFTER avvisade i rad → kastas / omstart
//   3. CvGpsKalmanFilter.update        → utjämnat läge + fart
//   4. fart: ur filtret; första fixen efter (om)start: enhetens fart
//   5. cleanGpsSpeed med RÅ farthistorik (två senaste)
//
// Ren klass: inga klockor, ingen React, ingen Supabase. Tid kommer med
// fixen (ts = telefonens tidsstämpel). Testad mot riktig data.

import type { GpsPoint } from './gps'
import { msToKnots } from './gps'
import { CvGpsKalmanFilter, type CvKalmanOptions } from './kalman'
import { cleanGpsSpeed, SPEED_CEILING_KNOTS, shouldRejectAsAnomaly } from './tracking'

/** En rå fix som den kom från telefonen. */
export type RawFix = {
  lat: number
  lng: number
  accuracyM: number
  /** ms sedan epoch — telefonens tidsstämpel för fixen */
  ts: number
  /** enhetens Doppler-fart i knop, null om saknas */
  deviceSpeedKn: number | null
  heading: number | null
}

export type PipelineOptions = {
  /** Kastar fixar med sämre accuracy än så här (m). Standard 80. */
  maxAccuracyM?: number
  /** Tak för anomaligrinden och fartklippningen (knop). Standard SPEED_CEILING_KNOTS. */
  ceilingKn?: number
  /** Kalman-parametrar. Standard: filtrets egna. */
  kalman?: CvKalmanOptions
}

export type PipelineStats = {
  accepted: number
  rejectedAccuracy: number
  rejectedAnomaly: number
  /** Omstarter av filtret: återförankring eller lucka > resetAfterSeconds. */
  kalmanResets: number
}

export class GpsPipeline {
  private readonly maxAccuracyM: number
  private readonly ceilingKn: number
  private readonly resetAfterSeconds: number
  private readonly kalman: CvGpsKalmanFilter
  private lastRaw: { lat: number; lng: number; ts: number } | null = null
  private lastAcceptedTs: number | null = null
  private rawSpeedHist: number[] = []
  private streak = 0
  private _stats: PipelineStats = { accepted: 0, rejectedAccuracy: 0, rejectedAnomaly: 0, kalmanResets: 0 }

  constructor(opts: PipelineOptions = {}) {
    this.maxAccuracyM = opts.maxAccuracyM ?? 80
    this.ceilingKn = opts.ceilingKn ?? SPEED_CEILING_KNOTS
    this.resetAfterSeconds = opts.kalman?.resetAfterSeconds ?? 30
    this.kalman = new CvGpsKalmanFilter(opts.kalman)
  }

  get stats(): PipelineStats { return { ...this._stats } }

  /**
   * Efter paus: glöm referenspunkt och farthistorik så att första fixen
   * efter fortsättning behandlas som en start (enhetens fart, ingen
   * anomalikontroll mot en gammal punkt). Räknarna behålls.
   */
  softReset(): void {
    this.lastRaw = null
    this.rawSpeedHist = []
    this.streak = 0
    this.kalman.reset()   // /spara nollställde filtret vid paus före 2026-09-10 — samma här
  }

  /** @returns punkten att spara/visa, eller null om fixen kastades. */
  push(f: RawFix): GpsPoint | null {
    if (f.accuracyM > this.maxAccuracyM) { this._stats.rejectedAccuracy++; return null }

    const gate = shouldRejectAsAnomaly(this.lastRaw, f.lat, f.lng, f.ts, this.streak, this.ceilingKn)
    this.streak = gate.streak
    if (gate.reject) { this._stats.rejectedAnomaly++; return null }
    if (gate.reanchored) {
      this.kalman.reset()
      this._stats.kalmanResets++
      this.rawSpeedHist = []
      this.lastRaw = null   // första fixen efter omstart: enhetens fart
    }
    // Filtret startar om självt vid lucka > resetAfterSeconds; räknas här.
    if (this.lastAcceptedTs != null && (f.ts - this.lastAcceptedTs) / 1000 > this.resetAfterSeconds) {
      this._stats.kalmanResets++
    }

    const smoothed = this.kalman.update(f.lat, f.lng, f.accuracyM, f.ts)
    let speedKn = 0
    if (this.lastRaw) speedKn = msToKnots(smoothed.speedMs)
    else if (f.deviceSpeedKn != null && f.deviceSpeedKn >= 0) speedKn = f.deviceSpeedKn

    this.lastRaw = { lat: f.lat, lng: f.lng, ts: f.ts }
    this.lastAcceptedTs = f.ts

    const clean = cleanGpsSpeed(speedKn, f.accuracyM, this.rawSpeedHist.slice(-2), this.ceilingKn)
    this.rawSpeedHist = [...this.rawSpeedHist.slice(-1), Math.min(Math.max(speedKn, 0), this.ceilingKn)]
    this._stats.accepted++

    return {
      lat: smoothed.lat, lng: smoothed.lng, speedKnots: clean,
      heading: f.heading, accuracy: f.accuracyM,
      recordedAt: new Date(f.ts).toISOString(),
      rawLat: f.lat, rawLng: f.lng, deviceSpeedKnots: f.deviceSpeedKn,
    }
  }
}

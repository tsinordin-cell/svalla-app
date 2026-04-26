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

'use client'
import { useEffect, useState } from 'react'
import {
  fetchWeatherAt, fetchPlaceName, weatherDesc, windDirLabel,
  type WeatherPoint,
} from '@/lib/weatherGrid'

const FALLBACK_LAT = 59.32
const FALLBACK_LNG = 18.50

export default function FeedWeatherRow() {
  const [data,  setData]  = useState<WeatherPoint | null>(null)
  const [place, setPlace] = useState<string | null>(null)

  useEffect(() => {
    const ctrl = new AbortController()

    function load(lat: number, lng: number) {
      fetchWeatherAt(lat, lng, ctrl.signal)
        .then(w => { if (!ctrl.signal.aborted && w) setData(w) })
        .catch(() => {})
      fetchPlaceName(lat, lng, ctrl.signal)
        .then(n => { if (!ctrl.signal.aborted && n) setPlace(n) })
        .catch(() => {})
    }

    if (typeof navigator !== 'undefined' && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => load(pos.coords.latitude, pos.coords.longitude),
        ()  => load(FALLBACK_LAT, FALLBACK_LNG),
        { timeout: 5000, maximumAge: 300_000 },
      )
    } else {
      load(FALLBACK_LAT, FALLBACK_LNG)
    }

    return () => ctrl.abort()
  }, [])

  if (!data) return null

  const desc = weatherDesc(data.weatherCode, data.isDay)

  return (
    <div style={{
      maxWidth: 640, margin: '0 auto', padding: '2px 20px 10px',
      display: 'flex', alignItems: 'center', gap: 5, flexWrap: 'nowrap', overflow: 'hidden',
      fontSize: 13, color: 'var(--txt3)', fontWeight: 500,
    }}>
      <span style={{ fontSize: 15, lineHeight: 1, flexShrink: 0 }}>{desc.emoji}</span>
      <span style={{ fontWeight: 700, color: 'var(--txt2)', flexShrink: 0 }}>{data.temp}°</span>
      <span style={{ opacity: 0.4, flexShrink: 0 }}>·</span>
      <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="var(--sea)" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ flexShrink: 0 }}>
        <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
        <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
        <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
      </svg>
      <span style={{ flexShrink: 0 }}>{data.windSpeed.toFixed(1)} m/s {windDirLabel(data.windDir)}</span>
      {place && (
        <>
          <span style={{ opacity: 0.4, flexShrink: 0 }}>·</span>
          <span style={{
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            fontWeight: 600, color: 'var(--txt2)',
          }}>{place}</span>
        </>
      )}
    </div>
  )
}

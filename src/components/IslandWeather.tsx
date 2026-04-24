'use client'
// Väderwidget för ö-sidor — hämtar data från Open-Meteo (gratis, ingen API-nyckel)
import { useEffect, useState } from 'react'

interface WeatherData {
  temp: number           // °C
  windSpeed: number      // m/s
  windDir: number        // grader
  weatherCode: number    // WMO-kod
  isDay: number
}

// WMO-kod → emoji + svensk text
function weatherDesc(code: number, isDay: number): { emoji: string; text: string } {
  if (code === 0)           return { emoji: isDay ? '☀️' : '🌙', text: isDay ? 'Klart' : 'Klar natt' }
  if (code <= 2)            return { emoji: '⛅', text: 'Delvis molnigt' }
  if (code === 3)           return { emoji: '☁️', text: 'Molnigt' }
  if (code <= 49)           return { emoji: '🌫️', text: 'Dimma' }
  if (code <= 59)           return { emoji: '🌦️', text: 'Duggregn' }
  if (code <= 69)           return { emoji: '🌧️', text: 'Regn' }
  if (code <= 79)           return { emoji: '❄️', text: 'Snö' }
  if (code <= 84)           return { emoji: '⛈️', text: 'Regnskurar' }
  if (code <= 99)           return { emoji: '⛈️', text: 'Åska' }
  return { emoji: '🌤', text: 'Varierat' }
}

// Vindriktning i grader → kompassriktning (svenska)
function windDirLabel(deg: number): string {
  const dirs = ['N', 'NNO', 'NO', 'ONO', 'O', 'OSO', 'SO', 'SSO', 'S', 'SSV', 'SV', 'VSV', 'V', 'VNV', 'NV', 'NNV']
  return dirs[Math.round(deg / 22.5) % 16]
}

// Beaufort-skala (seglare föredrar detta)
function beaufort(ms: number): string {
  if (ms < 0.3) return 'Lugnt'
  if (ms < 1.6) return 'Svag bris'
  if (ms < 3.4) return 'Lätt bris'
  if (ms < 5.5) return 'God bris'
  if (ms < 8.0) return 'Frisk bris'
  if (ms < 10.8) return 'Frisk vind'
  if (ms < 13.9) return 'Hård vind'
  if (ms < 17.2) return 'Stormvind'
  if (ms < 20.8) return 'Stormvindar'
  return 'Orkanstyrka'
}

export default function IslandWeather({ lat, lng, islandName }: { lat: number; lng: number; islandName: string }) {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error,   setError]   = useState(false)

  useEffect(() => {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day&wind_speed_unit=ms&timezone=Europe/Stockholm`

    fetch(url, { signal: AbortSignal.timeout(6000) })
      .then(r => r.json())
      .then(data => {
        const c = data?.current
        if (!c) { setError(true); return }
        setWeather({
          temp:        Math.round(c.temperature_2m),
          windSpeed:   parseFloat(c.wind_speed_10m.toFixed(1)),
          windDir:     c.wind_direction_10m,
          weatherCode: c.weather_code,
          isDay:       c.is_day,
        })
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [lat, lng])

  if (loading) {
    return (
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 6,
        padding: '6px 14px', borderRadius: 20,
        background: 'rgba(255,255,255,0.12)',
        fontSize: 12, color: 'rgba(255,255,255,0.6)',
      }}>
        <span style={{ animation: 'pulse-spin 1s linear infinite', display: 'inline-block' }}>⟳</span>
        Laddar väder…
        <style>{`@keyframes pulse-spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    )
  }

  if (error || !weather) return null

  const { emoji, text } = weatherDesc(weather.weatherCode, weather.isDay)
  const bft = beaufort(weather.windSpeed)

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 12,
      padding: '8px 16px', borderRadius: 20,
      background: 'rgba(255,255,255,0.14)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(255,255,255,0.2)',
      marginTop: 10,
    }}>
      {/* Temp + ikon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
        <span style={{ fontSize: 18 }}>{emoji}</span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{weather.temp}°</span>
      </div>

      <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.25)' }} />

      {/* Vind */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 13 }}>💨</span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>
          {weather.windSpeed} m/s {windDirLabel(weather.windDir)}
        </span>
      </div>

      <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.25)' }} />

      {/* Beaufort + väderbeskrivning */}
      <span style={{ fontSize: 11, color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
        {bft} · {text}
      </span>
    </div>
  )
}

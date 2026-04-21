'use client'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'

type Restaurant = { id: string; name: string; latitude: number; longitude: number }

type Weather = {
  temp: number
  wind: number
  windDir: number
  code: number
}

function weatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 3) return '⛅'
  if (code <= 48) return '🌫️'
  if (code <= 57) return '🌦️'
  if (code <= 67) return '🌧️'
  if (code <= 77) return '🌨️'
  if (code <= 82) return '🌦️'
  if (code <= 86) return '❄️'
  return '⛈️'
}

function windDirLabel(deg: number): string {
  const dirs = ['N', 'NÖ', 'Ö', 'SÖ', 'S', 'SV', 'V', 'NV']
  return dirs[Math.round(deg / 45) % 8]
}

export default function RestaurantMap({ restaurants }: { restaurants: Restaurant[] }) {
  const mapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const initRef = useRef(false)
  const [weather, setWeather] = useState<Weather | null>(null)

  // Hämta väder för Stockholms skärgård
  useEffect(() => {
    fetch(
      'https://api.open-meteo.com/v1/forecast?latitude=59.33&longitude=18.07' +
      '&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code' +
      '&wind_speed_unit=ms'
    )
      .then(r => r.json())
      .then(d => setWeather({
        temp: Math.round(d.current.temperature_2m),
        wind: Math.round(d.current.wind_speed_10m * 10) / 10,
        windDir: d.current.wind_direction_10m,
        code: d.current.weather_code,
      }))
      .catch(() => {})
  }, [])

  useEffect(() => {
    if (!mapRef.current || initRef.current || restaurants.length === 0) return
    initRef.current = true

    async function init() {
      const L = (await import('leaflet')).default

      const map = L.map(mapRef.current!, {
        center: [59.45, 18.6],
        zoom: 9,
        zoomControl: false,
        attributionControl: false,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 16 }).addTo(map)
      L.control.zoom({ position: 'bottomright' }).addTo(map)

      restaurants.forEach(r => {
        if (!r.latitude || !r.longitude) return

        const icon = L.divIcon({
          html: `
            <div style="
              background:white;border-radius:50%;width:36px;height:36px;
              display:flex;align-items:center;justify-content:center;font-size:16px;
              box-shadow:0 3px 12px rgba(0,45,60,0.25);
              border:2.5px solid var(--acc, #c96e2a);
              cursor:pointer;
            ">🍽</div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          className: '',
        })

        L.marker([r.latitude, r.longitude], { icon })
          .bindTooltip(`<strong style="font-size:12px">${r.name}</strong>`, {
            direction: 'top', offset: [0, -18],
            className: 'svalla-tooltip',
          })
          .addTo(map)
          .on('click', () => router.push(`/platser/${r.id}`))
      })

      const lats = restaurants.filter(r => r.latitude).map(r => r.latitude)
      const lngs = restaurants.filter(r => r.longitude).map(r => r.longitude)
      if (lats.length > 0) {
        map.fitBounds(
          [[Math.min(...lats) - 0.1, Math.min(...lngs) - 0.1],
           [Math.max(...lats) + 0.1, Math.max(...lngs) + 0.1]],
          { padding: [20, 20] }
        )
      }
    }

    init().catch(console.error)
  }, [restaurants, router])

  return (
    <>
      <style>{`
        .svalla-tooltip {
          background: white !important;
          border: 1px solid rgba(10,123,140,0.2) !important;
          border-radius: 8px !important;
          padding: 4px 8px !important;
          box-shadow: 0 2px 8px rgba(0,45,60,0.12) !important;
          color: #192830 !important;
        }
        .svalla-tooltip::before { display: none !important; }
      `}</style>

      {/* Map wrapper med position:relative för weather overlay */}
      <div style={{ position: 'relative', width: '100%', height: 260 }}>
        <div
          ref={mapRef}
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--sea-xl)',
            borderBottom: '1px solid rgba(10,123,140,0.10)',
          }}
        />

        {/* ── Väder & vind overlay (övre högra hörnet) ── */}
        {weather && (
          <div style={{
            position: 'absolute',
            top: 12,
            right: 12,
            zIndex: 1000,
            background: 'rgba(255,255,255,0.93)',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            borderRadius: 12,
            padding: '8px 12px',
            boxShadow: '0 2px 16px rgba(0,45,60,0.18)',
            border: '1px solid rgba(10,123,140,0.14)',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            pointerEvents: 'none',
            minWidth: 115,
          }}>
            {/* Väder-ikon */}
            <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0 }}>
              {weatherIcon(weather.code)}
            </span>

            {/* Temp + vind */}
            <div>
              <div style={{
                fontWeight: 600,
                color: '#1a3a5e',
                fontSize: 15,
                lineHeight: 1.1,
                letterSpacing: '-0.3px',
              }}>
                {weather.temp}°C
              </div>
              <div style={{
                color: '#5a8a9a',
                fontSize: 11,
                marginTop: 3,
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontWeight: 500,
              }}>
                {/* Vindpil roterad efter vindriktning */}
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 16,
                  height: 16,
                  borderRadius: '50%',
                  background: 'rgba(10,123,140,0.08)',
                  fontSize: 9,
                  transform: `rotate(${weather.windDir}deg)`,
                  flexShrink: 0,
                }}>
                  ↑
                </span>
                {weather.wind} m/s · {windDirLabel(weather.windDir)}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

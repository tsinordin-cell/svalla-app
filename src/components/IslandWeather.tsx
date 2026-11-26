'use client'
// Väderwidget för ö-sidor — hämtar data från Open-Meteo (gratis, ingen API-nyckel)
import { decimal } from '@/lib/gps'
import { useEffect, useState } from 'react'
import Icon from './Icon'

interface WeatherData {
 temp: number // °C
 windSpeed: number // m/s
 weatherCode: number // WMO-kod
 isDay: number
}

// WMO-kod → ikon-namn + svensk text
function weatherDesc(code: number, isDay: number): { icon: string; text: string } {
 if (code === 0) return { icon: isDay ? 'sun' : 'moon', text: isDay ? 'Klart' : 'Klar natt' }
 // Exakta koder ur Open-Meteos tabell: intervallen gav förut "Åska" för 85–86 (snöbyar) och för koder som inte finns
 // (full-22 utanför-1; mallarnas runda 5, 2026-11-10).
 // KÄLLA: https://open-meteo.com/en/docs — "1 Mainly clear", "2 Partly cloudy", "3 Overcast", "45 Fog", "51 Light drizzle", "61 Slight rain", "71 Slight snowfall", "80 Slight rain showers", "82 Violent rain showers", "85 Slight snow showers", "86 Heavy snow showers", "95 Thunderstorm", "99 Thunderstorm with heavy hail" (läst 2026-11-10)
 if (code === 1) return { icon: 'sun', text: 'Mestadels klart' }
 if (code === 2) return { icon: 'sun', text: 'Delvis molnigt' }
 if (code === 3) return { icon: 'cloud', text: 'Molnigt' }
 if (code === 45 || code === 48) return { icon: 'fog', text: 'Dimma' }
 if (code >= 51 && code <= 57) return { icon: 'rain', text: 'Duggregn' }
 if (code >= 61 && code <= 67) return { icon: 'rain', text: 'Regn' }
 if (code >= 71 && code <= 77) return { icon: 'snow', text: 'Snö' }
 if (code >= 80 && code <= 82) return { icon: 'rain', text: 'Regnskurar' }
 if (code === 85 || code === 86) return { icon: 'snow', text: 'Snöbyar' }
 if (code >= 95 && code <= 99) return { icon: 'cloud', text: 'Åska' }
 return { icon: 'cloud', text: 'Okänd väderkod' }
}

// Ingen vindriktning (mallarnas runda 7, 2026-11-17). Bokstäverna ("SV") säger enligt SMHI väderstrecket varifrån det blåser
// (https://www.smhi.se/kunskapsbanken/meteorologi/vind/vindhastighet), men att Open-Meteos wind_direction_10m räknas så är
// bara belagt i Open-Meteos egen kod, inte av en nivå 1-källa. Jämförelsen med SMHI:s observationer gick inte heller
// 2026-11-17: Open-Meteo svarade 429 ("Daily API request limit exceeded"). Utan belägg visar widgeten bara vindhastigheten
// (Kontrollantens fynd ma5022; Redaktörens punkt 9 i runda 7). Riktningen kan läggas tillbaka när en jämförelse med SMHI finns.

// SMHI:s benämningar på land (faktagranskningen 2026-11-02, mall-0023–0031).
// Tidigare blandades äldre sjöbenämningar och påhittade ord, och allt från 20,8 m/s hette Orkanstyrka.
// KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/vind/skalor-for-vindhastighet — "Tabellen visar benämning på vindstyrkor.", "Frisk vind", "8,0-10,7", "10,8-13,8", "Hård vind", "13,9-17,1" (Benämning på land, m/s; tabellens celler) (läst 2026-11-16)
// KÄLLA: https://www.smhi.se/kunskapsbanken/meteorologi/vind/vad-betyder-olika-ord-om-vind — "Ordet orkan används inom svensk meteorologi i fall då medelvindhastigheten varit minst 32,7 m/s." (läst 2026-11-02)
function beaufort(ms: number): string {
 if (ms < 0.3) return 'Lugnt'
 if (ms < 3.4) return 'Svag vind'
 if (ms < 8.0) return 'Måttlig vind'
 if (ms < 13.9) return 'Frisk vind'
 if (ms < 24.5) return 'Hård vind'
 if (ms < 32.7) return 'Storm'
 return 'Orkan'
}

export default function IslandWeather({ lat, lng }: { lat: number; lng: number; islandName?: string }) {
 const [weather, setWeather] = useState<WeatherData | null>(null)
 const [loading, setLoading] = useState(true)
 const [error, setError] = useState(false)

 useEffect(() => {
 const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code,is_day&wind_speed_unit=ms&timezone=Europe/Stockholm`

 fetch(url, { signal: AbortSignal.timeout(6000) })
 .then(r => r.json())
 .then(data => {
 const c = data?.current
 if (!c) { setError(true); return }
 setWeather({
 temp: Math.round(c.temperature_2m),
 windSpeed: parseFloat(c.wind_speed_10m.toFixed(1)),
 weatherCode: c.weather_code,
 isDay: c.is_day,
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
 <Icon name="wind" size={14} style={{ animation: 'pulse-spin 1s linear infinite', color: 'rgba(255,255,255,0.6)' }} aria-hidden />
 Laddar väder…
 <style>{`@keyframes pulse-spin{to{transform:rotate(360deg)}}`}</style>
 </div>
 )
 }

 if (error || !weather) return null

 const { icon, text } = weatherDesc(weather.weatherCode, weather.isDay)
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
 <Icon name={icon as any} size={18} style={{ color: '#fff' }} aria-label={text} />
 <span style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{weather.temp}°</span>
 </div>

 <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.25)' }} />

 {/* Vind */}
 <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
 <Icon name="wind" size={13} style={{ color: 'rgba(255,255,255,.9)' }} aria-hidden />
 <span style={{ fontSize: 12, fontWeight: 700, color: 'rgba(255,255,255,.9)' }}>
 {decimal(weather.windSpeed)} m/s
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

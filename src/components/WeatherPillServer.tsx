/**
 * WeatherPillServer — väderpill utan klientberoende.
 *
 * Serverkomponent: datan hämtas innan sidan skickas, så det finns inget
 * "Laddar…"-tillstånd som kan fastna. Se weatherServer.ts för bakgrunden.
 *
 * Går vädret inte att hämta renderas ingenting. En saknad pill är ärligare
 * än en som snurrar.
 */
import Icon from './Icon'
import {
  fetchCurrentWeather, weatherDesc, windDirLabel, beaufort,
} from '@/lib/weatherServer'

export default async function WeatherPillServer({
  lat, lng, tone = 'onDark',
}: {
  lat: number
  lng: number
  /** onDark = ljus text på mörk hero. onLight = mörk text på ljus yta. */
  tone?: 'onDark' | 'onLight'
}) {
  const v = await fetchCurrentWeather(lat, lng)
  if (!v) return null

  const { icon, text } = weatherDesc(v.weatherCode, v.isDay)
  const mörk = tone === 'onDark'
  const färg = mörk ? 'rgba(255,255,255,0.92)' : 'var(--txt)'
  const dämpad = mörk ? 'rgba(255,255,255,0.62)' : 'var(--txt3)'

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 10,
      padding: '7px 16px', borderRadius: 20,
      background: mörk ? 'rgba(255,255,255,0.14)' : 'var(--white)',
      border: mörk ? '1px solid rgba(255,255,255,0.16)' : '1px solid var(--border)',
      fontSize: 13, color: färg, whiteSpace: 'nowrap',
    }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontWeight: 700 }}>
        <Icon name={icon} size={15} aria-hidden />
        {v.tempC}°
      </span>
      <span aria-hidden style={{ color: dämpad }}>|</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Icon name="wind" size={14} aria-hidden />
        {v.windMs.toLocaleString('sv-SE')} m/s {windDirLabel(v.windDir)}
      </span>
      <span style={{ color: dämpad }}>
        {beaufort(v.windMs)} · {text}
      </span>
    </div>
  )
}

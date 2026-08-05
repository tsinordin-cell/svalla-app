/**
 * weatherServer.ts — väderhämtning på servern.
 *
 * 2026-08-05. Väderpillen på /planera satt fast i "Laddar väder…" för alltid.
 * Orsaken var inte Open-Meteo: API:t svarar 200 på ~650 ms från samma sida.
 * Orsaken var att komponentens useEffect aldrig kördes. Uppmätt i produktion:
 * pillens DOM-nod saknade React-fiber medan knappar på samma sida hade det,
 * och närmaste hydrerade förälder låg sex nivåer upp — i BODY. Hela
 * hero-delträdet hydrerades alltså aldrig, och en effekt i ett delträd som
 * inte hydreras kan inte köra.
 *
 * Ett "Laddar…" som aldrig kan bli klart är ett löfte produkten inte kan
 * hålla. Lösningen är att inte vara beroende av hydrering: hämta på servern,
 * skicka ner färdiga värden. Då finns vädret redan när sidan målas, eller så
 * ritas ingen pill alls.
 *
 * Cachas 15 minuter av Next. Open-Meteo uppdaterar var halvtimme, så tätare
 * hämtning ger inget nytt.
 */

export interface CurrentWeather {
  tempC: number
  windMs: number
  windDir: number
  weatherCode: number
  isDay: boolean
}

export async function fetchCurrentWeather(
  lat: number, lng: number,
): Promise<CurrentWeather | null> {
  const url = 'https://api.open-meteo.com/v1/forecast'
    + `?latitude=${lat}&longitude=${lng}`
    + '&current=temperature_2m,wind_speed_10m,wind_direction_10m,weather_code,is_day'
    + '&wind_speed_unit=ms&timezone=Europe/Stockholm'
  try {
    const res = await fetch(url, {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(6000),
    })
    if (!res.ok) return null
    const data = await res.json() as { current?: Record<string, number> }
    const c = data.current
    if (!c || typeof c.temperature_2m !== 'number') return null
    return {
      tempC: Math.round(c.temperature_2m),
      windMs: Math.round((c.wind_speed_10m ?? 0) * 10) / 10,
      windDir: c.wind_direction_10m ?? 0,
      weatherCode: c.weather_code ?? 3,
      isDay: c.is_day === 1,
    }
  } catch {
    // Nätverksfel eller timeout: ingen pill alls. Bättre än en som ljuger.
    return null
  }
}

/** WMO-kod → ikonnamn + svensk text. Samma tabell som klientwidgeten. */
export type WeatherIcon = 'sun' | 'moon' | 'cloud' | 'fog' | 'rain' | 'snow'

export function weatherDesc(code: number, isDay: boolean): { icon: WeatherIcon; text: string } {
  if (code === 0) return { icon: isDay ? 'sun' : 'moon', text: isDay ? 'Klart' : 'Klar natt' }
  if (code <= 2) return { icon: 'sun', text: 'Delvis molnigt' }
  if (code === 3) return { icon: 'cloud', text: 'Molnigt' }
  if (code <= 49) return { icon: 'fog', text: 'Dimma' }
  if (code <= 59) return { icon: 'rain', text: 'Duggregn' }
  if (code <= 69) return { icon: 'rain', text: 'Regn' }
  if (code <= 79) return { icon: 'snow', text: 'Snö' }
  if (code <= 84) return { icon: 'rain', text: 'Regnskurar' }
  if (code <= 99) return { icon: 'cloud', text: 'Åska' }
  return { icon: 'cloud', text: 'Varierat' }
}

const KOMPASS = ['N','NNO','NO','ONO','O','OSO','SO','SSO','S','SSV','SV','VSV','V','VNV','NV','NNV']
export function windDirLabel(deg: number): string {
  return KOMPASS[Math.round(deg / 22.5) % 16]!
}

/** Beaufort i ord — seglare läser hellre "frisk bris" än "7,2 m/s". */
export function beaufort(ms: number): string {
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

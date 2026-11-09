// Spärr: tal med enhet ska skrivas med decimalkomma i gränssnittet ("8,3 m/s", "3,6 NM"),
// som svensk text skrivs. Rättat 2026-11-08 i flödets väderrad, ruttsidans vindremsa,
// ösidornas väder, topplistan, insikterna, Wrapped, forumets turbilagor och delningsbilderna.
// Testet fäller bygget om ett tal med enhet skrivs ut med toFixed() eller som råvärde.
// Använd decimal() från src/lib/gps.ts. Koordinater, sökvägar i SVG och strukturerad data
// (JSON-LD) ska ha punkt och fångas inte av mönstren här. /admin är undantagen.

import { readdirSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'
import { describe, expect, it } from 'vitest'

const ROT = join(__dirname, '..')

function tsxFiler(dir: string, ut: string[] = []): string[] {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) {
      if (e.name === 'node_modules' || p.includes(join('app', 'admin'))) continue
      tsxFiler(p, ut)
    } else if (e.name.endsWith('.tsx')) ut.push(p)
  }
  return ut
}

// x.toFixed(1)} m/s, `${x.toFixed(1)} NM`, x.toFixed(2) km ...
const TOFIXED_MED_ENHET = /\.toFixed\([1-9]\)[}\s]*(m\/s|kn|NM|nm|km)\b/
// {data.windSpeed} m/s, ${wp.forecast.speedMs} m/s ...
const RA_VIND = /\{[\w.?!]*(windSpeed|speedMs|avgSpeedMs|maxGustMs|windMs)\}\s*m\/s/

export function hittaDecimalpunkt(kalla: string): string[] {
  const fel: string[] = []
  kalla.split('\n').forEach((rad, i) => {
    if (TOFIXED_MED_ENHET.test(rad) || RA_VIND.test(rad)) fel.push(`${i + 1}: ${rad.trim().slice(0, 120)}`)
  })
  return fel
}

describe('decimalkomma i gränssnittet', () => {
  it('mönstren fångar decimalpunkt och släpper igenom rätt skrivsätt', () => {
    expect(hittaDecimalpunkt('<span>{data.windSpeed.toFixed(1)} m/s</span>')).toHaveLength(1)
    expect(hittaDecimalpunkt('formatValue={v => `${v.toFixed(1)} NM`}')).toHaveLength(1)
    expect(hittaDecimalpunkt('<strong>{forecast.summary.avgSpeedMs} m/s</strong>')).toHaveLength(1)
    expect(hittaDecimalpunkt('<span>{decimal(data.windSpeed)} m/s</span>')).toHaveLength(0)
    expect(hittaDecimalpunkt("{`${trip.distance.toFixed(1).replace('.', ',')} NM`}")).toHaveLength(0)
    expect(hittaDecimalpunkt('`${lat.toFixed(5)}, ${lng.toFixed(5)}`')).toHaveLength(0)
    expect(hittaDecimalpunkt('{nm.toFixed(0)} NM')).toHaveLength(0)
  })

  it('inga tal med enhet skrivs med decimalpunkt i src (utom /admin)', () => {
    const fel: string[] = []
    for (const fil of tsxFiler(ROT)) {
      for (const f of hittaDecimalpunkt(readFileSync(fil, 'utf8'))) fel.push(`${relative(ROT, fil)}:${f}`)
    }
    expect(fel, `Använd decimal() från src/lib/gps.ts:\n${fel.join('\n')}`).toEqual([])
  })
})

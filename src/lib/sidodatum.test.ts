import { describe, it, expect } from 'vitest'
import { verkligtDatum } from './sidodatum'

const karta = {
  'guide:grinda': '2026-09-27',
  'o:sandhamn': '2026-09-30',
  'sida:/': '2026-10-09',
  'sida:/farjor': '2026-10-01',
  'sida:/guider/[slug]': '2026-10-05',
  'sida:/o/[slug]': '2026-09-01',
  'sida:/o/[slug]/[kategori]': '2026-08-01',
  'sida:/o/[slug]/restauranger': '2026-08-15',
  'sida:/jamfor/[pair]': '2026-10-03',
}
const d = (u: string) => verkligtDatum(`https://svalla.se${u}`, karta)?.toISOString().slice(0, 10)

describe('verkligtDatum', () => {
  it('statisk sida får sin mapps datum', () => {
    expect(d('/farjor')).toBe('2026-10-01')
    expect(d('/')).toBe('2026-10-09')
  })
  it('guide tar det senaste av innehåll och mall', () => {
    expect(d('/guider/grinda')).toBe('2026-10-05')
  })
  it('ö tar det senaste av ödata och mall', () => {
    expect(d('/o/sandhamn')).toBe('2026-09-30')
    expect(d('/o/sandhamn/restauranger')).toBe('2026-09-30')
  })
  it('statiskt segment vinner över dynamiskt', () => {
    expect(d('/o/okand/restauranger')).toBe('2026-08-15')
    expect(d('/o/okand/boende')).toBe('2026-08-01')
  })
  it('dynamisk mapp matchar', () => {
    expect(d('/jamfor/sandhamn-vs-grinda')).toBe('2026-10-03')
  })
  it('okänd sida ger inget datum', () => {
    expect(d('/finns-inte')).toBeUndefined()
  })
})

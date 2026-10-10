import { describe, it, expect } from 'vitest'
import { klientIp } from './klientIp'

const req = (h: Record<string, string>) => new Request('https://svalla.se/x', { headers: h })

describe('klientIp', () => {
  it('tar första adressen i x-forwarded-for', () => {
    expect(klientIp(req({ 'x-forwarded-for': '1.2.3.4, 10.0.0.1, 10.0.0.2' }))).toBe('1.2.3.4')
  })
  it('faller tillbaka på x-real-ip', () => {
    expect(klientIp(req({ 'x-real-ip': '5.6.7.8' }))).toBe('5.6.7.8')
  })
  it('ger okand utan rubriker', () => {
    expect(klientIp(req({}))).toBe('okand')
  })
})
